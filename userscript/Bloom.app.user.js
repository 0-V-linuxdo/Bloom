// ==UserScript==
// @name         Bloom++ (ChatGPT app)
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.83
// @description  Bloom++ host for the official ChatGPT macOS app. Injected over loopback CDP; not a web userscript.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @match        app://*/*
// @run-at       document-start
// @grant        none
// @license      GPL-3.0-or-later
// ==/UserScript==

/* Bloom++ v2.0.83 ChatGPT app host. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Ul=Object.defineProperty;var Fl=(t,e)=>{for(var o in e)Ul(t,o,{get:e[o],enumerable:!0})};var q=class{constructor(e){this.tag=e}log(e,o){console[e](`[Bloom++] [${this.tag}]`,...o)}debug(...e){this.log("debug",e)}info(...e){this.log("info",e)}warn(...e){this.log("warn",e)}error(...e){this.log("error",e)}};var ft=(t,e,o)=>Math.min(o,Math.max(e,t)),B=t=>typeof t=="object"&&t!==null&&!Array.isArray(t),ai=t=>`${t}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,$=(t,e)=>t.length>e?`${t.slice(0,e-1)}\u2026`:t,h=t=>t.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function si(t,e){return`${t} ${e}${t===1?"":"s"}`}async function li(t){if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}await navigator.clipboard.writeText(t)}function ci(t){try{return JSON.parse(t)}catch{return}}var _t=typeof unsafeWindow>"u"?window:unsafeWindow;var ii={};Fl(ii,{VERSION:()=>Hl,init:()=>ri,plugins:()=>at});var Gl=new q("Styles"),Me=new Map,ui=new Set,Ce=new Map,gn=!0;function di(){let t=document.adoptedStyleSheets.filter(e=>!ui.has(e));document.adoptedStyleSheets=[...t,...Me.values()]}function mi(t){document.readyState==="loading"||t.parentNode===document.head||document.head.append(t)}function Kl(t,e){let o=Ce.get(t);o||(o=document.createElement("style"),o.id=`bloom-style-${t}`,Ce.set(t,o)),o.textContent!==e&&(o.textContent=e),mi(o)}function co(t,e){if(gn)try{let o=Me.get(t);o||(o=new _t.CSSStyleSheet,Me.set(t,o),ui.add(o)),o.replaceSync(e),di();return}catch(o){Gl.warn("Constructed style sheets unavailable, using <style> after parsing",o),gn=!1,Me.delete(t)}Kl(t,e)}function hn(t){Me.delete(t)&&gn&&di(),Ce.get(t)?.remove(),Ce.delete(t)}function pi(){for(let t of Ce.values())mi(t)}var E=t=>(...e)=>e.map(o=>t+o).join(" "),uo=(...t)=>t.filter(Boolean).join(" "),te=t=>t.length?`${t.map(e=>`${e}:not([data-bloom])`).join(",")}{display:none!important}`:"";function g(t){return t}var Yl=new q("Storage");function fi(t){try{return localStorage.getItem(t)??void 0}catch{return}}function gi(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch(o){Yl.warn("localStorage write failed",o)}}function hi(t,e){addEventListener("storage",o=>{o.key===t&&e(o.newValue)})}var bn="BloomSettings",jl=100,ee={plugins:{}},mo=new Set,An=new Set,Le;function bi(t){let e=t;for(let o=0;typeof e=="string"&&o<2;o++)e=ci(e);return!B(e)||!B(e.plugins)||!Object.keys(e.plugins).length?null:e}function Ai(){let t=bi(fi(bn));t&&(ee.plugins=t.plugins)}var yi=(t,e)=>`${t}
${e}`;function vi(){Le=void 0,An.clear(),gi(bn,ee)}function Ql(t){let e=bi(t);if(!e)return;let o=[];for(let n of new Set([...Object.keys(ee.plugins),...Object.keys(e.plugins)])){let r=ee.plugins[n]??={},i=B(e.plugins[n])?e.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))An.has(yi(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of mo)i(n,r)}function Wl(){Le&&(clearTimeout(Le),vi())}var Lt=(t,e)=>ee.plugins[t]?.[e];function kt(t,e,o){let n=ee.plugins[t]??={};o===void 0?delete n[e]:n[e]=o,An.add(yi(t,e)),clearTimeout(Le),Le=setTimeout(vi,jl);for(let r of mo)r(t,e)}function oe(t){return mo.add(t),()=>void mo.delete(t)}function yn(t){return t.type==="component"?void 0:t.default}function A(t){let e={def:t,pluginName:"",store:new Proxy({},{get:(o,n)=>Lt(e.pluginName,n)??(t[n]&&yn(t[n])),set:(o,n,r)=>(kt(e.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(t))t[o].type!=="custom"&&Lt(e.pluginName,o)!==void 0&&kt(e.pluginName,o)}};return e}var qi=t=>{let e=()=>{let o=Lt("Settings",t);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>e().includes(o),list:e,toggle(o){let n=e();kt("Settings",t,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},po=qi("pinnedPlugins"),fo=qi("starredPlugins");addEventListener("pagehide",Wl);hi(bn,Ql);var go=new q("PluginManager"),at=new Map,ne=new Set,wn=new Set,vn=new Set;function wi(t){for(let e of t)e.settings&&(e.settings.pluginName=e.name),at.set(e.name,e)}var gt=t=>!!t.required||(Lt(t.name,"enabled")??!!t.enabledByDefault),xn=t=>ne.has(t),qn=t=>`plugin-${t.name}`;function xi(t){if(!t.styles)return;let e=typeof t.styles=="function"?t.styles():t.styles;e?co(qn(t),e):hn(qn(t))}function Sn(t){if(!ne.has(t.name))try{xi(t),t.start?.(),ne.add(t.name)}catch(e){go.error(`Failed to start ${t.name}`,e)}}function Si(t){if(ne.delete(t.name)){hn(qn(t));try{t.stop?.()}catch(e){go.error(`Failed to stop ${t.name}`,e)}}}var En=t=>t.startAt??"HostReady";function ho(t){wn.add(t);for(let e of at.values())En(e)===t&&gt(e)&&Sn(e);go.info(`${t}: ${[...ne].join(", ")}`)}function Ei(t){Si(t)}function Ti(t){gt(t)&&wn.has(En(t))&&Sn(t)}function Mi(t,e){kt(t.name,"enabled",e),e?wn.has(En(t))&&Sn(t):Si(t);for(let o of vn)o()}function Ci(t){return vn.add(t),()=>void vn.delete(t)}oe((t,e)=>{let o=at.get(t);if(!(!o||e==="enabled"||!ne.has(t)))try{xi(o),o.onSettingsChange?.(e)}catch(n){go.error(`Settings change failed for ${t}`,n)}});var Li=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

html {
    --bloom-fg: var(--color-text-primary, var(--text-primary, #0d0d0d));
    --bloom-fg-2: var(--color-text-secondary, var(--text-secondary, #5d5d5d));
    --bloom-fg-3: var(--color-text-tertiary, var(--text-tertiary, #8f8f8f));
    --bloom-border: var(--color-token-border-default, var(--border-medium, #0000001a));
    --bloom-border-light: var(--color-token-border-light, var(--border-light, #0000000d));
    --bloom-hover: var(--color-token-list-hover-background, #0000000d);
    --bloom-accent: var(--color-chart-blue, #3a83f7);
    --bloom-surface: #fff;
    --bloom-surface-2: #f3f3f3;
    --bloom-input: #fafafa;
    --bloom-card: #fff;
    --bloom-shadow: 0 1rem 3rem #00000026, 0 0 0 1px #0000000d;
    --bloom-danger: #ef4444;
}

:is(.dark, [data-theme="dark"]) {
    --bloom-fg: var(--color-text-primary, var(--text-primary, #ededed));
    --bloom-fg-2: var(--color-text-secondary, var(--text-secondary, #cdcdcd));
    --bloom-fg-3: var(--color-text-tertiary, var(--text-tertiary, #afafaf));
    --bloom-border: var(--color-token-border-default, var(--border-medium, #ffffff26));
    --bloom-border-light: var(--color-token-border-light, var(--border-light, #ffffff0d));
    --bloom-hover: var(--color-token-list-hover-background, #ffffff1a);
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
`;var Vl=new q("Dom");function s(t,e={},...o){let n=document.createElement(t);e.class&&(n.className=e.class),e.text!=null&&(n.textContent=e.text),e.title&&(n.title=e.title);for(let[r,i]of Object.entries(e.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(e.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var ki=document.createElement("template");function Ii(t){return ki.innerHTML=t.trim(),ki.content.firstElementChild.cloneNode(!0)}var ht=t=>t instanceof HTMLElement&&t.isConnected&&t.getClientRects().length>0&&!t.closest("[inert]"),_=(t,e=document)=>[...e.querySelectorAll(t)].find(ht)??null,Jl=16,Zl="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function Bi(t,e){let o=setInterval(t,e),n;try{n=new Worker(URL.createObjectURL(new Blob([Zl],{type:"text/javascript"}))),n.addEventListener("message",t),n.postMessage(e)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function Tn(t){document.hidden?setTimeout(t,Jl):requestAnimationFrame(t)}function bt(t){let e=!1;return()=>{e||(e=!0,Tn(()=>{e=!1;try{t()}catch(o){Vl.error("Scheduled task failed",o)}}))}}var bo=new Set,Ao=[],ke,Xl=bt(()=>{let t=Ao;Ao=[];for(let e of bo)e(t)});function x(t){return bo.add(t),ke||(ke=new MutationObserver(e=>{Ao.push(...e),Xl()}),ke.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),t([]),()=>{bo.delete(t),!bo.size&&(ke?.disconnect(),ke=void 0,Ao=[])}}var $l=t=>t instanceof Element&&(t.hasAttribute("data-bloom")||!!t.closest("[data-bloom]")),P=t=>!t.length||t.some(e=>!$l(e.target)),_l=t=>`"${t.replaceAll("\\","\\\\").replaceAll('"','\\"').replaceAll(`
`,"\\A ")}"`;function It(t,e){if(e==null){t.removeAttribute("data-bloom-text"),t.style.removeProperty("--bloom-text-size"),t.style.removeProperty("--bloom-text");return}t.style.setProperty("--bloom-text",_l(e)),t.getAttribute("data-bloom-text")!==e&&t.setAttribute("data-bloom-text",e)}var tc=new q("Events");function re(){let t=new Map;return{on(e,o){let n=t.get(e);return n||t.set(e,n=new Set),n.add(o),()=>void n.delete(o)},emit(e,o){for(let n of t.get(e)??[])try{n(o)}catch(r){tc.error(`Listener for ${String(e)} failed`,r)}}}}function Pi(t,e){let o=t instanceof Element?[t,...t.querySelectorAll("*")]:[...t.querySelectorAll("*")];for(let n of o){let r=n.shadowRoot;r&&(e(r),Pi(r,e))}}function At(t,e=document){let o=[...e.querySelectorAll(t)];return Pi(e,n=>o.push(...n.querySelectorAll(t))),o}var X=(t,e=document)=>At(t,e).find(ht)??null;var l={rail:"[data-app-navigation-rail]",sidebarScroll:"[data-app-action-sidebar-scroll]",sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"[data-app-action-sidebar-scroll]",oldRail:"[data-app-navigation-rail]",oldProfile:'button[aria-label="Open profile menu" i]',threadRow:"[data-app-action-sidebar-thread-row]",threadSelected:"[data-app-action-sidebar-thread-row][data-app-action-sidebar-thread-selected='true']",threadTitle:"[data-app-action-sidebar-thread-title]",projectRow:"[data-app-action-sidebar-project-row]",projectLabel:"[data-app-action-sidebar-project-label]",destination:"[data-sidebar-destination]",conversationLink:"[data-app-action-sidebar-thread-row]",timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:"[data-turn-key]",turn:"[data-turn-key]",messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",userBubble:'[class~="group/user-message"]',assistantReply:"[data-response-annotation-target]",oldThread:"[data-app-action-timeline-scroll]",turnActions:'.turn-action-controls, [class*="turn-action-controls"]',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery, [class*='recovery']",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composer:"[data-chatgpt-composer], [data-composer-input]",composerInput:'[data-composer-input] [contenteditable="true"].ProseMirror, [contenteditable="true"].ProseMirror',composerConversation:"[data-above-composer-conversation-id]",oldComposerForm:"[data-chatgpt-composer]",sendButton:'button[aria-label="Send" i], button[aria-label="Send prompt" i], button[aria-label="Send message" i]',stopButton:'button[aria-label="Stop" i], button[aria-label^="Stop " i], button[aria-label="\u505C\u6B62" i], button[aria-label^="\u505C\u6B62"]',composerFooter:"[data-chatgpt-composer]",modelTrigger:'button[aria-label="Model selector" i], button[aria-label="Select ChatGPT model" i], [data-chatgpt-composer] button[aria-haspopup="menu"]',modelItem:'[role="menu"] [role="menuitemradio"], [role="menu"] [role="menuitem"]',effortSlider:'[role="menu"] [data-reasoning-slider]',homeHeading:'main h1:not([aria-hidden="true"]), [role="main"] h1:not([aria-hidden="true"]), [data-testid="home-heading"], [data-homepage-takeover] h1, .heading-xl, [class~="heading-xl"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]',headerTitle:"[data-thread-title], [data-thread-title-trigger]",profile:'button[aria-label="Open profile menu" i]'};var Oi=/[​-‍﻿]/g,st=()=>X(l.composerInput),Ie=t=>t instanceof HTMLElement&&t.matches(l.composerInput),z=(t=st())=>t?.closest("form")??t?.closest(l.composer)??X(l.composer);function N(t=st()){if(!t)return"";if(t instanceof HTMLTextAreaElement)return t.value.replace(Oi,"").trim();let e=t.cloneNode(!0);for(let n of e.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...e.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:e.textContent??"").replace(Oi,"").trim()}var ec=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function Ri(t,e){let o=e?"insertText":"deleteContentBackward";t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:o,data:e||null})),t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:o,data:e||null}))}function yt(t,e=st()){if(!e)return!1;if(e.focus(),e instanceof HTMLTextAreaElement)return ec?.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.setSelectionRange(t.length,t.length),!0;let o=getSelection();return o?.selectAllChildren(e),typeof document.execCommand=="function"?t?document.execCommand("insertText",!1,t):document.execCommand("delete"):Ri(e,t),N(e)!==t.trim()&&Ri(e,t),o?.selectAllChildren(e),o?.collapseToEnd(),!0}function Hi(t,e){let o=t;for(;o&&o!==e;){if(o instanceof HTMLElement&&o.parentElement===e)return o;o=o.parentNode}return null}function Di(t,e,o){let n=document.createRange();return n.selectNodeContents(t),o?n.setEnd(e.startContainer,e.startOffset):n.setStart(e.endContainer,e.endOffset),n.toString().includes(`
`)?!0:!!n.cloneContents().querySelector("br")}function Ni(t){if(t instanceof HTMLTextAreaElement){let{selectionStart:y,selectionEnd:C,value:f}=t;return{first:!f.slice(0,y).includes(`
`),last:!f.slice(C).includes(`
`)}}let e=getSelection();if(!e?.rangeCount||!t.contains(e.anchorNode))return{first:!0,last:!0};let o=e.getRangeAt(0),n=[...t.children].filter(y=>y instanceof HTMLElement),r=Hi(o.startContainer,t),i=Hi(o.endContainer,t),a=!r||r===n[0],d=!i||i===n[n.length-1],c=o.getBoundingClientRect(),u=(r??t).getBoundingClientRect(),m=Number.parseFloat(getComputedStyle(r??t).lineHeight)||24;return c.height?{first:a&&c.top-u.top<m,last:d&&u.bottom-c.bottom<m}:{first:a&&!Di(r??t,o,!0),last:d&&!Di(i??t,o,!1)}}var Ui=t=>{let e=z();return(e&&X(t,e))??X(t)},Mn=()=>Ui(l.stopButton),oc=()=>{let t=Ui(l.sendButton);return t&&!t.matches(l.stopButton)?t:null};function Fi(){let t=oc();if(t){t.disabled||t.click();return}st()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var Gi=()=>ht(Mn());var yo=new q("AppProtocol"),Be=re();function nc(t){let e=t;if(typeof e=="string")try{e=JSON.parse(e)}catch{return null}if(Array.isArray(e)||!e||typeof e!="object")return null;let o=e,n=o.notification&&typeof o.notification=="object"?o.notification:o;if(typeof n.method!="string")return null;let r=n.params&&typeof n.params=="object"?n.params:void 0;return{method:n.method,params:r}}function Pe(t){if(Array.isArray(t)){for(let o of t)Pe(o);return}let e=nc(t);e&&Be.emit("note",e)}var Ln=new WeakMap,Cn=new WeakMap;function rc(t,e){let o=Ln.get(t);if(o)return o;let n=r=>{Pe(r.data),typeof t=="function"?t.call(e,r):t.handleEvent(r)};return Ln.set(t,n),n}function ic(){let t=MessagePort.prototype,e=t.addEventListener,o=t.removeEventListener;t.addEventListener=function(r,i,a){return r!=="message"?e.call(this,r,i,a):e.call(this,r,rc(i,this),a)},t.removeEventListener=function(r,i,a){return r!=="message"?o.call(this,r,i,a):o.call(this,r,Ln.get(i)??i,a)};let n=Object.getOwnPropertyDescriptor(t,"onmessage");n?.set&&Object.defineProperty(t,"onmessage",{configurable:!0,enumerable:n.enumerable,get(){return Cn.has(this)?Cn.get(this):n.get?.call(this)},set(r){Cn.set(this,r),n.set.call(this,function(a){Pe(a.data),r?.call(this,a)})}})}function ac(){let t=window.electronBridge,e=t?.subscribeToWorkerMessages;if(!(!t||typeof e!="function"))try{t.subscribeToWorkerMessages=(o,n)=>e.call(t,o,r=>{Pe(r),n(r)})}catch(o){yo.warn("electronBridge.subscribeToWorkerMessages is not writable",o)}}function sc(){addEventListener("message",t=>Pe(t.data));try{ic()}catch(t){yo.warn("MessagePort wrap failed",t)}try{ac()}catch(t){yo.warn("electronBridge wrap failed",t)}yo.info("Listening for app-server notifications")}sc();var lc=new q("AppRoute"),cc=500,qo=new Set,wo=null,vo;function b(){return(X(l.threadSelected)??At(l.threadSelected)[0])?.getAttribute("data-app-action-sidebar-thread-id")??null}var xo=()=>!b(),Yi=()=>!1,Bt=()=>!1;function Ki(){let t=b();if(t===wo)return;let{href:e}=location,o={prevHref:e,href:e,prevId:wo,id:t};wo=t;for(let n of qo)try{n(o)}catch(r){lc.error("Route listener failed",r)}}function uc(){let t=new MutationObserver(Ki);(()=>{document.body&&t.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-app-action-sidebar-thread-selected","data-app-action-sidebar-thread-id"]})})();let o=setInterval(Ki,cc);return()=>{t.disconnect(),clearInterval(o)}}function tt(t){return qo.add(t),vo||(wo=b(),vo=uc()),()=>{qo.delete(t),!qo.size&&(vo?.(),vo=void 0)}}var dc=250,mc=400,k=re(),Pt=!1,ie=null,Ht=!1,Ot="done",Rt=!1,ji=!1,j=()=>({generating:Pt,conversationId:b()}),pc=t=>{if(!t)return!0;let e=b();return e?e===t||e.endsWith(t)||t.endsWith(e.replace(/^local:/,"")):!0};function fc(t){return t==="interrupted"||t==="aborted"||t==="cancelled"?"stopped":t==="failed"||t==="error"?"error":"done"}function gc(){return Rt||Gi()}function hc(t){ie=null,Pt=!1,Rt=!1,k.emit("fall",{conversationId:b(),outcome:t}),Ht=!1,Ot="done"}function bc(){let t=gc();t&&!Pt&&(Pt=!0,Ht=!1,Ot="done",k.emit("rise",{conversationId:b()})),t||!Pt?ie=null:ie==null?ie=Date.now():Date.now()-ie>=mc&&hc(Ht?"stopped":Ot)}function Oe(){bc(),k.emit("tick",j())}function Ac({prevId:t,id:e}){t!==e&&(Pt&&(Rt=!1,ie=null,Pt=!1,Ht=!1,Ot="done",k.emit("fall",{conversationId:t,outcome:"left"})),k.emit("context",{prevId:t,id:e,migrated:!t&&!!e}),Oe())}function yc(t){if(pc(t.params?.threadId)){if(t.method==="turn/started"){Rt=!0,Oe();return}if(t.method==="turn/interrupt"){Rt=!1,Ot="stopped",Ht=!0,Oe();return}t.method==="turn/completed"&&(Rt=!1,Ot=fc(t.params?.turn?.status),Ot==="stopped"&&(Ht=!0),Oe())}}function vc(t){t.target instanceof Element&&t.target.closest(l.stopButton)&&(Ht=!0,Rt=!1)}function Qi(){ji||(ji=!0,Be.on("note",yc),tt(Ac),document.addEventListener("click",vc,!0),Bi(Oe,dc))}var qc="__reactContainer$",Wi="__reactFiber$";function In(){return document.readyState!=="loading"?Promise.resolve():new Promise(t=>document.addEventListener("DOMContentLoaded",()=>t(),{once:!0}))}var kn=(t,e)=>Object.keys(t.wrappedJSObject??t).some(o=>o.startsWith(e)),et=t=>!kn(document,qc)||kn(t,Wi);function vt(){return document.body?Promise.resolve():new Promise(t=>{let e=new MutationObserver(()=>{document.body&&(e.disconnect(),t())});e.observe(document,{childList:!0,subtree:!0})})}async function Bn(){await vt();let t=Date.now()+8e3;for(;!kn(document.body,Wi)&&Date.now()<t;)await new Promise(e=>setTimeout(e,100))}var zi={BetterNavigator:1792014624e3,BetterQuotes:179333264e4,ChatListStatus:179333264e4,ChatStateFavicons:1790623094e3,Cleaner:1793267811e3,ComposerOpacity:1793344667e3,Continue:1790939902e3,CustomSidebarIdentity:1790658669e3,GreetingCustomizer:1792014624e3,InputHistory:179333264e4,MessageTimestamps:1791080494e3,NoDictation:1793335268e3,NoShareLink:1790658669e3,NoSidebarIdentity:1790616549e3,PromptQueue:1793267321e3,RecentTopics:179333264e4,ResponseNotification:1790661368e3,Settings:1793335268e3,SidebarIdentityOpacity:1790682605e3,StarChats:179333264e4,StreamerMode:1793344667e3,TemporaryChat:1792014624e3,UserQuotes:179333264e4,WiderChat:179333264e4};var v=t=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`,wc="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",xc={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${wc}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:v('<path d="M18 6 6 18M6 6l12 12"/>'),gear:v('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:v('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:v('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:v('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:v('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:v('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:v('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:v('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:v('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:v('<path d="m6 9 6 6 6-6"/>'),play:v('<path d="M7 4v16l13-8z"/>'),plus:v('<path d="M12 5v14M5 12h14"/>'),check:v('<path d="m5 12 5 5 9-10"/>'),alert:v('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:v('<path d="M4 5h16v11H9l-5 4z"/>'),layout:v('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:v('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:v('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:v('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:v('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:v('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:v('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:v('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:v('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:v('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:v('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:v('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:v('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:v('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:v('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:v('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),ghost:v('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},U=t=>Ii(xc[t]);var Nt="data-bloom-tip",Pn=6,On=8,Dt,Vi=null;function ae(t){if(t===Vi)return;if(Vi=t,!t){Dt?.remove();return}Dt??=s("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),Dt.textContent=t.getAttribute(Nt),document.body.append(Dt);let e=t.getBoundingClientRect(),{width:o,height:n}=Dt.getBoundingClientRect(),r=e.bottom+Pn+n<=innerHeight-On;Dt.style.left=`${ft(e.left+e.width/2-o/2,On,innerWidth-o-On)}px`,Dt.style.top=`${r?e.bottom+Pn:e.top-Pn-n}px`}var Ji=t=>t instanceof Element?t.closest(`[${Nt}]`):null;function Zi(){let t=new AbortController,e={passive:!0,signal:t.signal};return document.addEventListener("pointerover",o=>ae(Ji(o.target)),e),document.addEventListener("pointerout",o=>o.relatedTarget||ae(null),e),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&ae(Ji(o.target)),e),document.addEventListener("focusout",()=>ae(null),e),document.addEventListener("pointerdown",()=>ae(null),e),()=>{t.abort(),ae(null)}}function Rn(t,e,o,n=!1){let r=s("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(t),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let a=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(a)),e(a)}),r}function F(t,e,o){return s("button",{class:uo("bloom-button",o&&`bloom-button-${o}`),text:t,attrs:{type:"button","data-bloom":"control"},on:{click:e}})}function V(t,e,o,n){let r=s("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":e,"data-bloom":"control",[Nt]:e},on:{click:o}},U(t));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function So(t,e,o,n,r,i){let a=s("input",{attrs:{type:"range",min:String(e),max:String(o),step:String(n)}});a.value=String(t);let d=s("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{d.textContent=`${a.value}${r}`,i(Number(a.value))}),s("div",{class:"bloom-slider"},a,d)}function Hn(t,e,o){let n=s("select",{class:"bloom-select"},...e.map(r=>s("option",{text:r.label,attrs:{value:r.value}})));return n.value=t,n.addEventListener("change",()=>o(n.value)),n}function Re(t,e,o="",n="text"){let r=s("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=t,r.addEventListener("change",()=>e(r.value)),r}var Sc=new q("SettingsPanel"),p=E("bloom-settings-"),Ec=10080*60*1e3,Tc=3e3,Xi="Toggle features. Some need a reload. Click the sliders icon to configure.",Mc=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Cc=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],Lc={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},_i=new Set(["chat","ui","privacy"]),G=null,Ft="all",Dn="all",Eo="",Nn=[],ta=()=>[...at.values()].filter(t=>!t.hidden),kc=t=>!!t.updatedAt&&Date.now()-t.updatedAt<Ec;function Ic(t){switch(Ft){case"favorites":return fo.has(t.name);case"recent":return kc(t);case"all":return!0;case"other":return!t.tags.some(e=>_i.has(e));case"chat":case"ui":case"privacy":return t.tags.includes(Ft)}}function Bc(t){switch(Dn){case"all":return!0;case"enabled":return gt(t);case"disabled":return!gt(t)}}function Pc(t){let e=Eo.trim().toLowerCase();return!e||[t.name,t.description,...t.tags].some(o=>o.toLowerCase().includes(e))}function Oc(t){let e=po.list(),o=n=>e.includes(n.name)?e.indexOf(n.name):e.length;return Ft==="recent"?t.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):t.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var ea=t=>t.settings?.def??{},Rc=t=>Object.values(ea(t)).some(e=>e.type!=="custom");function Hc(t,e,o){let n=Lt(t.name,e)??yn(o),r=i=>kt(t.name,e,i);switch(o.type){case"boolean":return Rn(n,r,o.description??e);case"slider":return So(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return Hn(n,o.options,r);case"string":return Re(n,r,o.placeholder);case"number":return Re(String(n),i=>r(Number(i)),"","number");case"component":{let i=s("div",{class:p("component")});return Nn.push(o.render(i)),i}case"custom":return null}}var Dc=t=>t.replaceAll(/([A-Z])/g," $1").replace(/^./,e=>e.toUpperCase());function oa(t){if(!G)return;let e=Object.entries(ea(t)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let d=Hc(t,i,a),c=a.type==="boolean",u=a.type!=="component"&&s("div",{class:p("field-label"),text:Dc(i)}),m=a.description&&s("div",{class:p("field-desc"),text:a.description});return s("div",{class:p("field",c?"field-inline":"field-stacked")},(u||m)&&s("div",{class:p("field-text")},u,m),d)}),o,n=F("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},Tc);return}clearTimeout(o),t.settings?.reset(),He(),oa(t)},"danger"),r=s("div",{class:p("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&He()}},s("div",{class:p("popup"),attrs:{role:"dialog","aria-label":`${t.name} settings`}},s("div",{class:p("popup-header")},s("div",{class:p("card-icon")},U(t.icon)),s("div",{class:p("popup-title")},s("div",{class:p("card-name"),text:t.name}),s("div",{class:p("popup-authors"),text:t.authors.join(", ")})),V("close","Close",He)),s("p",{class:p("popup-desc"),text:t.description}),s("div",{class:p("fields")},...e),s("div",{class:p("popup-footer")},n)));G.querySelector(`.${p("modal")}`)?.append(r)}function He(){for(let t of Nn)t();Nn=[],G?.querySelector(`.${p("popup-backdrop")}`)?.remove()}function $i(t){let e=gt(t),o=fo.has(t.name),n=po.has(t.name),r=!!t.required;return s("div",{class:[p("card",e?"card-on":"card-off"),r?p("card-required"):""].filter(Boolean).join(" ")},s("div",{class:p("card-top")},s("div",{class:p("card-icon")},U(t.icon)),s("div",{class:p("card-actions")},V("star",o?"Unstar":"Star",()=>{fo.toggle(t.name),Ut()},o),r?null:V("pin",n?"Unpin":"Pin to top",()=>{po.toggle(t.name),Ut()},n),r?s("span",{class:p("required-mark"),attrs:{"aria-label":"Required",[Nt]:"This plugin is required for Bloom++ to work"}},U("alert")):null,Rc(t)&&V("gear","Settings",()=>oa(t)),Rn(e,i=>Mi(t,i),r?`${t.name} is required`:`Enable ${t.name}`,r))),s("div",{class:p("card-name"),text:t.name}),s("div",{class:p("card-desc"),text:t.description,title:t.description}),s("div",{class:p("card-footer"),text:t.authors.join(", ")}))}function na(){let t=ta().some(o=>!o.tags.some(n=>_i.has(n)));G?.querySelector(`.${p("tabs")}`)?.replaceChildren(...Mc.filter(o=>o.id!=="other"||t).map(o=>s("button",{class:p("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===Ft)},on:{click:()=>{Ft=o.id,na(),Ut()}}})))}function Ut(){if(!G)return;let t=ta().filter(Ic),e=G.querySelector(`.${p("search")} input`);e&&(e.placeholder=`Search ${si(t.length,"plugin")}...`);let o=Oc(t.filter(u=>Pc(u)&&Bc(u))),n=Ft==="all",r=n?o.filter(u=>!u.required):o,i=n?o.filter(u=>u.required):[],a=[...r.map($i),...i.length?[s("div",{class:p("required-break"),attrs:{role:"separator"}}),...i.map($i)]:[]],d=Eo.trim()?"No plugins match your search.":Lc[Ft]??"No plugins available.";G.querySelector(`.${p("grid")}`)?.replaceChildren(...a.length?a:[s("div",{class:p("empty"),text:d})])}function Nc(t){t.key==="Escape"&&(t.preventDefault(),t.stopPropagation(),G?.querySelector(`.${p("popup-backdrop")}`)?He():se())}var ra,Un;function Uc(){if(G)return;let t=s("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});t.value=Eo,t.addEventListener("input",()=>{Eo=t.value,Ut()}),G=s("div",{class:`bloom-root ${p("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:e=>e.target===e.currentTarget&&se()}},s("div",{class:p("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},s("div",{class:p("header")},s("div",{class:p("logo")},U("bloom")),s("h2",{class:p("title"),text:"Bloom++"}),s("span",{class:p("hint"),attrs:{"aria-label":Xi,tabindex:"0",[Nt]:Xi}},U("info")),s("span",{class:p("version"),text:"v2.0.83"}),V("close","Close",se)),s("div",{class:p("tabs"),attrs:{role:"tablist"}}),s("div",{class:p("toolbar")},s("label",{class:p("search")},U("search"),t),Hn(Dn,Cc,e=>{Dn=e,Ut()})),s("div",{class:p("grid")}))),G.addEventListener("keydown",e=>e.stopPropagation()),Un=new AbortController,document.addEventListener("keydown",Nc,{capture:!0,signal:Un.signal}),document.body.append(G),na(),Ut(),ra=Ci(Ut),t.focus(),Sc.debug("Opened")}function se(){He(),Un?.abort(),ra?.(),G?.remove(),G=null}var le=()=>G?se():Uc();var ia=new q("AppLandmarks"),Fc={Settings:[l.rail],WiderChat:[":root"],StreamerMode:[l.sidebarScroll,l.rail],ComposerOpacity:[l.composer,l.composerInput],ResponseNotification:[l.composerInput],InputHistory:[l.composerInput],Continue:[l.composerInput],ChatListStatus:[l.sidebarScroll],StarChats:[l.turn],BetterNavigator:[l.timelineScroll,l.turn],BetterQuotes:[l.turn],MessageTimestamps:[l.turn],RecentTopics:[l.sidebarScroll]};function aa(){for(let[t,e]of Object.entries(Fc)){let o=at.get(t);if(!o||o.required||!gt(o))continue;if(!e.some(r=>X(r))){if(!xn(o.name))continue;Ei(o),ia.warn(`${t} paused; missing ${e.join(", ")}`);continue}xn(o.name)||(Ti(o),ia.info(`${t} resumed`))}}function sa(){return aa(),x(()=>aa())}var Tg=new q("Route"),Gc=/\/c\/(?!local-)([\w-]+)/;var Kc=()=>location.pathname.match(Gc)?.[1]??null;var Mg=location.href,Cg=Kc();var Yc=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,jc=/\S+@\S+\.\S+/,Qc=3;var Wc=t=>!!t.closest(".sr-only");function zc(t){return[...t.querySelectorAll("*")].filter(e=>!e.children.length&&!e.closest("[data-bloom]")&&!!h(e.textContent??"")&&!(e instanceof SVGElement))}var Vc=t=>{if(/rounded-full/.test(t.getAttribute("class")??""))return!0;if(!t.clientWidth)return!1;let{borderRadius:e}=getComputedStyle(t);return e.includes("%")||Number.parseFloat(e)>=t.clientWidth/2};function To(t,e,o){for(let n of t.querySelectorAll(`[${e}]`))n!==o&&n.removeAttribute(e);o&&!o.hasAttribute(e)&&o.setAttribute(e,"")}function Jc(t,e){if(h(t.textContent??"").length>Qc)return null;let o=t.closest("button");for(let n=t;n&&n!==e&&n!==o;n=n.parentElement)if(Vc(n))return n;return null}function Mo(t,e){t.hasAttribute(`data-bloom-${e}`)||t.setAttribute(`data-bloom-${e}`,"");let o=t.querySelector("img:not([data-bloom] img)"),n=zc(t),r=o?null:n.map(m=>Jc(m,t)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==t&&t.contains(i)?i:o??r)??t.querySelector("[class*=rounded-full]:not([data-bloom] *)");To(t,`data-bloom-${e}-avatar`,a);let d=n.filter(m=>!a?.contains(m)&&!Wc(m)),c=d.find(m=>Yc.test(h(m.textContent??""))),u=d.find(m=>jc.test(m.textContent??""));To(t,`data-bloom-${e}-plan`,c),To(t,`data-bloom-${e}-email`,u),To(t,`data-bloom-${e}-name`,d.find(m=>m!==c&&m!==u))}var la=()=>At(l.rail).filter(ht);function ca(t){return X(l.profile,t)??[...t.querySelectorAll(l.menuButton)].findLast(ht)??null}function Zc(t,e){return[...t.children].find(n=>n instanceof HTMLElement&&n!==e&&n.contains(e))??e}function ua(){return la().flatMap(t=>{let e=ca(t);if(!e)return[{kind:"rail",anchor:t,insert:n=>t.append(n)}];let o=Zc(t,e);return[{kind:"rail",anchor:o,insert:n=>(o===e?t:o).append(n)}]})}var Fn=()=>la().map(ca).filter(t=>t!=null);function Xc(t){let e=t.getAttribute("aria-expanded")==="true"&&t.getAttribute("aria-controls"),o=e?document.getElementById(e):null;return o?.matches('[role="menu"]')?o:null}function Co(){return Fn().map(Xc).find(t=>t!=null)??At('[role="menu"]').find(t=>!t.closest("[data-bloom]")&&/log ?out|sign out|退出/i.test(t.textContent??""))??null}var De=t=>At(l.threadRow).filter(e=>e.getAttribute("data-app-action-sidebar-thread-id")===t);function Ne(t){let e=De(t)[0]??At(l.threadRow).find(n=>{let r=n.getAttribute("data-app-action-sidebar-thread-id")??"";return r.endsWith(t)||t.endsWith(r.replace(/^local:/,""))});return(e?.getAttribute("data-app-action-sidebar-thread-title")??h(e?.textContent??""))||null}function da(t){return null}var Gn=0,Lo;function $c(t){if(!P(t))return;for(let o of Fn())Mo(o,"profile");let e=Co();e&&Mo(e,"menu")}function ot(){Gn++;let t=!0;return vt().then(()=>{t&&Gn&&!Lo&&(Lo=x($c))}),()=>{t&&(t=!1,!--Gn&&(Lo?.(),Lo=void 0))}}var ma=`/*
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
`;var qt=E("bloom-entry-"),tu=4,Kn="--bloom-entry-x",Yn=1,ce=A({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar. The account menu and the userscript menu always open the panel.",default:!1},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:!0},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:t=>(t.append(F("Reset position",()=>{ce.store.entryPosition=Yn})),()=>t.replaceChildren())},entryPosition:{type:"custom",default:Yn}}),Gt=new Map,pa=!1,fa=[];function eu(t,e,o){let n=t.currentTarget,r=e.clientWidth-n.offsetWidth;if(t.button!==0||r<=0||!e.classList.contains(qt("hover")))return;let i=ce.store.entryPosition,a=i,d=!1,c=new AbortController;n.setPointerCapture(t.pointerId),n.addEventListener("pointermove",m=>{!d&&Math.abs(m.clientX-t.clientX)<tu||(d=!0,o(),a=ft(i+(m.clientX-t.clientX)/r,0,Yn),e.style.setProperty(Kn,String(a)))},{signal:c.signal});let u=()=>{c.abort(),d&&(ce.store.entryPosition=a,e.style.removeProperty(Kn))};n.addEventListener("pointerup",u,{signal:c.signal}),n.addEventListener("lostpointercapture",u,{signal:c.signal})}function ou(t){let e=!1,o=s("button",{class:qt("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),e||le(),e=!1},pointerdown:r=>{e=!1,t!=="rail"&&eu(r,n,()=>{e=!0})}}},U("bloom"),t!=="rail"&&s("span",{class:qt("label"),text:"Bloom++"})),n=s("div",{class:`bloom-root ${qt("wrap")} ${qt(t)}`,attrs:{"data-bloom":"entry"}},o);return n}function nu(t){let e=s("div",{class:`bloom-root ${qt("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),t.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),le()}}},U("bloom"),s("span",{text:"Bloom++"})),o=t.querySelector('[role="menuitem"]');o?.parentElement?o.before(e):t.prepend(e)}function ga(){let{showSidebarEntry:t,showSidebarEntryOnHover:e}=ce.store,o=ua();for(let[r,i]of Gt)r.isConnected&&o.some(a=>a.anchor===r)||(i.remove(),Gt.delete(r));for(let r of o){let i=Gt.get(r.anchor);if(i?.isConnected||!et(r.anchor))continue;let a=i??ou(r.kind);Gt.set(r.anchor,a),r.insert(a)}for(let r of Gt.values())r.classList.toggle(qt("hover"),!1);let n=Co();n&&!n.querySelector('[data-bloom="menu-entry"]')&&nu(n)}var ha=g({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:ce,styles:()=>`${ma}[data-app-navigation-rail] [data-bloom=entry]{position:absolute;left:50%;bottom:100%;transform:translateX(-50%);width:max-content;margin:0;padding-block:0.25rem;pointer-events:none;z-index:5;display:flex;justify-content:center}[data-app-navigation-rail]>[data-bloom=entry]{bottom:2.75rem}[data-app-navigation-rail] [data-bloom=entry] .bloom-entry-button{pointer-events:auto}.${qt("hover")}{${Kn}:${ce.store.entryPosition}}`,start(){fa=[x(ga),Zi(),ot()],!pa&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",le),pa=!0)},stop(){for(let t of fa)t();for(let t of Gt.values())t.remove();Gt.clear(),se()},onSettingsChange:ga});var Vn=new q("AppNetwork"),lt=re(),ko=new Map,ba=new Map;var ru=t=>t==="user"||t==="assistant";function Aa(t){let e=t.replace(/^local:/,"");return[...new Set([t,e,`local:${e}`])]}function ya(t){let e=Aa(t);for(let n of e){let r=ko.get(n);if(r)return r}let o={id:e[0]??t,title:null,chain:[],times:new Map};for(let n of e)ko.set(n,o);return o}function ct(t){if(!t)return null;cu(t);let e=Aa(t);return e.map(o=>ko.get(o)).find(o=>o&&(o.chain.length||o.title))??ko.get(e[0]??t)??null}function Qn(t,e,o,n=null){return{id:t,role:e,createTime:n,text:h(o),hasFiles:!1,imageCount:0}}function Wn(t,e){let o=t.chain.find(r=>r.id===e.id);if(o){e.text&&(o.text=e.text),e.createTime!=null&&(o.createTime=e.createTime);return}if(t.chain.find(r=>r.role===e.role&&r.text&&r.text===e.text)){!t.times.has(e.id)&&e.createTime!=null&&t.times.set(e.id,e.createTime);return}t.chain.push(e)}function va(t){let e=t.chain.map(o=>`${o.id}	${o.role}	${o.text}`).join(`
`);ba.get(t.id)!==e&&(ba.set(t.id,e),lt.emit("conversation",t))}function iu(t){if(typeof t=="function")try{return h(String(t()??""))}catch(e){return Vn.warn("Turn label failed",e),""}return typeof t=="string"?h(t):""}function au(t){if(typeof t!="function")return"";try{let e=t();return typeof e=="string"?h(e):B(e)&&typeof e.response=="string"?h(e.response):""}catch(e){return Vn.warn("Turn preview failed",e),""}}function su(t){let e=Object.keys(t).find(o=>o.startsWith("__reactFiber$")||o.startsWith("__reactInternalInstance$"));return e?t[e]??null:null}function zn(t,e,o,n){if(!t||e>24)return;let r=(B(t.memoizedProps)?t.memoizedProps:null)??(B(t.pendingProps)?t.pendingProps:null);r&&(Array.isArray(r.items)&&B(r.items[0])&&typeof r.items[0].turnKey=="string"&&!o.length&&o.push(...r.items.filter(B)),Array.isArray(r.entries)&&B(r.entries[0])&&typeof(r.entries[0].historyEntityKey??r.entries[0].turnId)=="string"&&!n.length&&n.push(...r.entries.filter(B))),zn(t.child??null,e+1,o,n),zn(t.sibling??null,e,o,n)}function lu(t,e){let o=typeof e.turnId=="string"?e.turnId:"",n=typeof e.turnKey=="string"?e.turnKey:"";return t.find(r=>{let i=typeof r.turnKey=="string"?r.turnKey:"";return!!i&&(o===i||n.endsWith(i)||n.includes(i))})??null}function cu(t){let e=document.querySelector("[data-thread-find-target='conversation']")??document.querySelector(l.timelineScroll);if(!e)return;let o=[],n=[];try{zn(su(e),0,o,n)}catch(d){Vn.warn("Fiber walk failed",d);return}if(!n.length&&!o.length)return;let r=n.length?n:o,i=typeof r[0]?.conversationId=="string"?r[0].conversationId:t,a=ya(i);a.title=Ne(t)??Ne(i)??a.title;for(let d of r){let c="";typeof d.turnId=="string"?c=d.turnId:typeof d.turnKey=="string"&&(c=d.turnKey.replace(/^.*turn:/,""));let u=typeof d.historyEntityKey=="string"?d.historyEntityKey:c?`turn:${c}`:"",m=lu(o,d),y=iu(m?.getLabel??d.getLabel),C=au(m?.getPreview??d.getPreview),f=typeof d.timestampSeparatorAtMs=="number"?d.timestampSeparatorAtMs:null;u&&y&&(Wn(a,Qn(u,"user",y,f)),f&&a.times.set(u,f)),c&&C&&Wn(a,Qn(`${c}:assistant`,"assistant",C,f))}va(a)}function uu(t){if(ru(t.role))return t.role;let e=typeof t.type=="string"?t.type:typeof t.itemType=="string"?t.itemType:"";return/user/i.test(e)?"user":/agent|assistant/i.test(e)?"assistant":null}function du(t){return typeof t.text=="string"?t.text:typeof t.content=="string"?t.content:B(t.content)&&typeof t.content.text=="string"?t.content.text:""}function jn(t,e){if(!t||!B(e))return;let o=typeof e.id=="string"?e.id:typeof e.itemId=="string"?e.itemId:"",n=uu(e),r=du(e);if(!o||!n)return;let i=ya(t);Wn(i,Qn(o,n,r)),va(i)}function mu(t){let e=t.params?.thread,o=t.params?.threadId??(B(e)&&typeof e.id=="string"?e.id:void 0);t.params?.item&&jn(o,t.params.item);for(let n of t.params?.items??[])jn(o,n);if(B(e)&&Array.isArray(e.items))for(let n of e.items)jn(o,n)}Be.on("note",mu);var pu=["data-turn","data-message-author-role"],fu=/:(user|assistant)$/,Jn=`${l.messageUnit}, ${l.oldMessage}`,Bo=t=>t==="user"||t==="assistant",Sa=()=>!!document.querySelector(l.timelineScroll),Ea=()=>!!_(l.timelineScroll),Ta=()=>b()??document.querySelector(l.composerConversation)?.getAttribute("data-above-composer-conversation-id")??"",Po=()=>Sa()?_(l.timelineScroll):document;function Fe(){if(Sa())return _(l.timelineScroll);let t=document.querySelector(l.turn);for(let e=t?.parentElement;e;e=e.parentElement){let{overflowY:o}=getComputedStyle(e);if((o==="auto"||o==="scroll")&&e.scrollHeight>e.clientHeight)return e}return document.scrollingElement}var wt=t=>{let e=t.getAttribute("data-chatgpt-search-unit-key")?.match(fu)?.[1];return Bo(e)?e:t.matches(l.userBubble)?"user":t.matches(l.assistantReply)||t.matches(l.assistantMarkdown)?"assistant":null},Ma=t=>{let e=[...t.querySelectorAll(l.searchUnit)].filter(n=>wt(n)&&!n.parentElement?.closest(l.searchUnit));return e.length?e:[...t.querySelectorAll(`${l.userBubble}, ${l.assistantReply}`)].filter(n=>wt(n)&&!n.parentElement?.closest(`${l.userBubble}, ${l.assistantReply}`))},qa=t=>(t.getAttribute("data-chatgpt-search-message-ids")??t.getAttribute("data-message-id")??t.getAttribute("data-response-annotation-target"))?.split(/\s+/).filter(Boolean)??[];function Ue(t){let e=qa(t);if(e.length)return e;let o=[...new Set([...t.querySelectorAll(Jn)].flatMap(qa))];if(o.length)return o;let n=t.closest("[data-turn-key]")?.getAttribute("data-turn-key")?.replace(/^history-content:/,"");return n&&wt(t)==="user"?[n]:[]}function ue(t=Po()){if(!t)return[];let e=Ma(t);return e.length?e:[...t.querySelectorAll(Jn)].filter(o=>!o.parentElement?.closest(Jn))}function gu(t,e){for(let o=t.length-1;o>=0;o--){let n=e.find(r=>r.id===t[o]);if(n)return n.role}return null}function hu(t){for(let e of pu){let o=t.getAttribute(e)??t.querySelector(`[${e}]`)?.getAttribute(e);if(Bo(o))return o}return t.querySelector(l.markdown)||t.querySelector(l.generatedImage)?"assistant":null}var bu=t=>!t.parentElement?.closest(l.turn);function xt(){let t=ct(b())?.chain??[];return[...Po()?.querySelectorAll(l.turn)??[]].filter(bu).flatMap(o=>{let n=Ma(o),r=n.length?n.map(i=>({el:i,known:wt(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=u=>!n.some(m=>m.contains(u))&&h(u.textContent??""),a=[...o.querySelectorAll(l.assistantMarkdown)].find(u=>i(u)&&!Io.test(h(u.textContent??""))),d=[...o.querySelectorAll(l.activityHeader)].findLast(i),c=a??d;c&&r.push({el:c,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?Ue(o):ue(o).flatMap(Ue),a=n??hu(o)??gu(i,t)??(r%2?"assistant":"user"),d=o.closest(l.turn)??o,c=!o.closest(l.searchUnit)&&!!d.querySelector(l.turnBusy),u=a==="assistant"&&(o.matches(l.turnBusy)||!!o.querySelector(l.turnBusy)||c);return{el:o,role:a,messageIds:i,streaming:u}})}var Au="[data-bloom], .sr-only",Ca=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,Io=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,wa=new WeakMap;function de(t){let o=(t.el.closest(l.turn)??t.el).textContent?.length??0,n=wa.get(t.el);if(n?.length===o)return n.summary;let r=yu(t);return wa.set(t.el,{length:o,summary:r}),r}function xa(t){let e=new Set,o=[];for(let n of t.querySelectorAll(l.assistantMarkdown)){if(n.closest(l.searchUnit))continue;let r=h(n.textContent??"");!r||Io.test(r)||Ca.test(r)||e.has(r)||(e.add(r),o.push(r))}return o}function yu(t){let e=t.el.querySelectorAll(l.generatedImage).length;if(t.role==="assistant"&&e)return e>1?`Image \xD7${e}`:"Image";let o=t.el.closest(l.turn);if(t.role==="assistant"&&o&&t.el.matches(l.assistantMarkdown)&&!t.el.closest(l.searchUnit)){let c=xa(o);if(c.length)return c.join(" \xB7 ")}let n=t.el.querySelector(t.role==="assistant"?`${l.markdown}, ${l.assistantMarkdown}`:".whitespace-pre-wrap")??t.el,i=[...n.querySelectorAll(Au)].map(c=>h(c.textContent??"")).filter(Boolean).reduce((c,u)=>c.replace(u,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(h).filter(c=>c&&!Ca.test(c)&&!Io.test(c));if(a.length)return a.join(" ");if(t.role==="assistant"&&o){let c=xa(o);if(c.length)return c.join(" \xB7 ")}let d=i.split(`
`).map(h).filter(c=>Io.test(c));return d.length?d.at(-1)??"":t.role==="user"&&t.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function Oo(t){return t.text?h(t.text):t.imageCount?t.imageCount>1?`Image \xD7${t.imageCount}`:"Image":t.hasFiles?"File":""}var Zn=t=>t.matches(l.timelineScroll)&&getComputedStyle(t).flexDirection==="column-reverse";var La=`/*
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

.bloom-nav-root:hover .bloom-nav-toc {
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
`;var I=E("bloom-nav-"),Do=80,qu=1200,wu=2,ka=3e4,xu=200,Su=.9,Eu=.28,Tu=24,me=8,Mu=80,Cu=12,Lu={user:"\u2753",assistant:"\u{1F916}"},ku=["wheel","touchmove","pointerdown"],Uo=A({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),O=null,T=[],J=-1,Yt=-1,pe=null,Ro="",$n=0,Ia=[],je=null,Ho=null,Kt,Ge,_n="",Ke=[],No=null,tr=new Set,Iu=t=>Uo.store.showAssistant||t.role==="user",Bu=t=>t.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||t.messageIds[0]||t.role;function Pu(t){return{role:t.role,summary:de(t),ids:t.messageIds,turn:t,streaming:t.streaming}}function Ha(t,e){let o=t.entries.at(-1);if(o?.role==="assistant"&&e.role==="assistant"){t.entries[t.entries.length-1]={...e,ids:[...new Set([...o.ids,...e.ids])]};return}t.entries.push(e)}function Ou(){let t=[];for(let e of xt()){let o=Pu(e),n=Bu(e),r=t.at(-1);r?.key===n?Ha(r,o):t.push({key:n,entries:[o]})}return t}function Ru(){let t=[];for(let e of ct(b())?.chain??[]){let o={role:e.role,summary:Oo(e),ids:[e.id],turn:null,streaming:!1},n=t.at(-1);e.role==="assistant"&&n?Ha(n,o):t.push({key:e.id,entries:[o]})}return t}var fe=t=>t.entries.flatMap(e=>e.ids);function er(t,e){let o=new Set(fe(t));return fe(e).some(n=>o.has(n))}var jt=t=>h(t.entries.find(e=>e.role==="user")?.summary??""),Xn=(t,e)=>t.filter(o=>jt(o)===e).length,or=t=>({...t,turn:null,streaming:!1});function Hu(t,e){let o=new Set(e.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return t.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return or(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?or(r):r})}))}function Du(t,e){let o=e.entries.map((n,r)=>{let i=t.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of t.entries.slice(o.length))o.push(or(n));return{key:t.key,entries:o}}function Da(){let t=Fe();if(!t)return!1;let e=t.clientHeight-t.scrollHeight;return t.scrollTop-e<=Math.abs(t.scrollTop)}function Nu(t,e){let o=Hu(t,e);if(!e.length)return o;if(!o.length)return e;let n=e.findIndex(c=>o.some(u=>u.key===c.key));if(n<0)return Da()?e.concat(o):o.concat(e);let r=e[n]?.key,i=o.findIndex(c=>c.key===r),a=o.slice(0,i).concat(e.slice(0,n),o.slice(i)),d=a.findIndex(c=>c.key===r);for(let c=n;c<e.length;c++){let u=e[c];if(!u)continue;let m=a.findIndex(y=>y.key===u.key);if(m>=0){let y=a[m];y&&(a[m]=Du(y,u)),d=m}else a.splice(d+1,0,u),d++}return a}function Uu(t,e){let o=0,n=0,r=0;for(let i=1-t.length;i<e.length;i++){let a=0,d=0;for(let u=0;u<t.length;u++){let m=e[u+i],y=t[u];!m||!y||(er(y,m)?(a+=3,d++):jt(y)&&jt(y)===jt(m)&&a++)}let c=Da()?i<r:i>r;(a>o||a===o&&d>n||a===o&&d===n&&c)&&(o=a,n=d,r=i)}return{score:o,offset:r}}function Fu(t,e){let o=t.entries.map((n,r)=>{let i=e.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of e.entries.slice(o.length))o.push({...n,turn:null});return{key:t.key,entries:o}}function Gu(t){return t.map(e=>({key:e.key,entries:e.entries.map(o=>({...o}))}))}function Ku(t,e){if(!e.length)return t;if(!t.length)return e;let{score:o,offset:n}=Uu(t,e),r=Gu(t);if(o>0)for(let d=0;d<r.length;d++){let c=e[d+n],u=r[d];if(!c||!u)continue;let m=jt(u),y=!!m&&m===jt(c)&&Xn(t,m)===1&&Xn(e,m)===1;(er(u,c)||y)&&(r[d]=Fu(u,c))}let i=[],a=[];for(let d=0;d<e.length;d++){let c=e[d];if(!c)continue;let u=jt(c);!u||Xn(r,u)>0||r.some(m=>er(m,c))||(o>0&&d<n?i.push(c):a.push(c))}return i.concat(r,a)}var nr=t=>t.entries.some(e=>e.turn?.el.isConnected);function Yu(t,e,o){let n=t.findIndex(i=>fe(i).includes(e));if(n>=0)return n+1;let r=t.find(nr);return o&&r&&fe(r).includes(o)?0:t.length}function ju(t){if(No){let{parent:e,user:o}=No;for(let n of t.slice(Yu(t,e,o))){let r=fe(n);if(!nr(n)&&!(o&&r.includes(o)))for(let i of r)tr.add(i)}}return t.filter(e=>nr(e)||!fe(e).some(o=>tr.has(o)))}function Na(){Ke=[],No=null,tr.clear()}function Qu(){let t=Ta();t!==_n&&(_n=t,Na());let e=Ou(),o=Ru();return!e.length&&!o.length&&!Ea()?(Ke=[],[]):(Ke=ju(Ku(Nu(Ke,e),o)),Ke.flatMap(n=>n.entries).filter(Iu))}function Wu(t){for(let o of t)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!j().generating||t.some(o=>o.streaming))return;let e=t.at(-1);e&&(e.role==="assistant"||!Uo.store.showAssistant?e.streaming=!0:t.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function Ua(){let t=Qu();return Wu(t),t}function Fa(t){let e=t.getBoundingClientRect(),o=z()?.getBoundingClientRect().top,n=Math.min(e.bottom,o&&o>e.top?o:e.bottom);return{top:e.top,bottom:n}}function Ga(t){return((t.matches(".whitespace-pre-wrap, .markdown, .prose, [data-markdown-text-style]")?t:t.querySelector(".whitespace-pre-wrap")??t.querySelector(".markdown, .prose, [data-markdown-text-style]"))??t).getBoundingClientRect().top}function Ba(t){let e=T[t]?.turn?.el;return e?.isConnected?e:null}function zu(t){if(!T.length)return null;let e=t.scrollHeight-t.clientHeight,o=Zn(t),n=Math.min(t.scrollTop,0),r=o?-n:e-t.scrollTop,i=o?e+n:t.scrollTop,a=e<=me||r<=me,d=e>me&&i<=me,{top:c,bottom:u}=Fa(t),m=Ba(0),y=m?Ga(m):Number.NaN,C=!!m&&y>=c-me&&y<=c+48,f=Ba(T.length-1),D=f?.getBoundingClientRect().bottom??Number.NaN,Ct=!!f&&D<=u+me&&D>=u-Mu;return a||Ct?"bottom":d||C?"top":null}function Vu(t){let{top:e,bottom:o}=Fa(t),n=e+Math.max(o-e,0)*Eu,r=[],i=-1;if(T.forEach((d,c)=>{let u=d.turn?.el;if(!u?.isConnected){r.push(Number.NaN);return}let m=Ga(u);r.push(m),i<0&&(i=c),m<=n&&(i=c)}),i<0)return Math.max(T.findIndex(d=>d.turn),0);let a=r[J];return Number.isFinite(a)?i===J?J:i>J?i:a<=n+Tu?J:i:i}function Ju(t){let e=zu(t);return e==="bottom"?T.length-1:e==="top"?0:Vu(t)}function Pa(t){Uo.store.jumpEffect==="border"&&(t.classList.add(I("flash")),setTimeout(()=>t.classList.remove(I("flash")),qu))}function Fo(t){let e=T[t],o=Fe();if(!e||!o)return;if(!e.turn&&!e.ids.length){Yt=t,Ye(),o.scrollTo({top:Zn(o)?0:o.scrollHeight});return}Yt=t,pe=t?null:{chat:b(),first:e.ids[0],until:Date.now()+ka},Ye();let n=e.turn?.el;if(n?.isConnected){let u=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:u<o.clientHeight*wu?"smooth":"auto"}),Pa(n);return}let r=T.findIndex(u=>u.turn),i=r>=0&&t<r?-1:1,a=++$n,d=Date.now()+ka,c=()=>{let u=Fe();if(a!==$n||Date.now()>d||!u)return;T=Ua();let m=T.find(C=>C.ids.some(f=>e.ids.includes(f)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),Pa(m),Yt=T.findIndex(C=>C.turn?.el===m),Ye();return}let y=u.scrollTop;u.scrollBy({top:i*u.clientHeight*Su,behavior:"instant"}),u.scrollTop===y?setTimeout(c,xu):requestAnimationFrame(c)};c()}function Zu(t,e){return s("button",{class:I("row"),attrs:{type:"button","data-index":String(e),"data-message-id":t.ids[0]??""},on:{click:()=>Fo(e)}},s("span",{text:Lu[t.role]}),s("span",{class:"bloom-truncate",text:$(t.summary||"\u2026",Do)}))}function Oa(t){if(!O)return;let e=t.getBoundingClientRect(),o=z()?.getBoundingClientRect().top,r=Math.min(e.bottom,o&&o>e.top?o:e.bottom)-e.top;O.style.right=`${document.documentElement.clientWidth-e.left-t.clientLeft-t.clientWidth+Cu}px`,O.style.top=`${e.top}px`,O.style.height=r>1?`${r}px`:""}function Xu(){let t=Fe();if(T=Ua(),!T.length||!t){O?.remove(),O=null,Ro="";return}if(je!==t){Ge?.abort(),Ge=new AbortController,t.addEventListener("scroll",bt(Ye),{passive:!0,signal:Ge.signal});for(let n of ku)t.addEventListener(n,Ka,{passive:!0,signal:Ge.signal});je=t,Kt?.disconnect(),Kt=new ResizeObserver(()=>{t.isConnected&&Oa(t)}),Kt.observe(t),Ho=null}let e=z();e&&e!==Ho&&Kt&&(Kt.observe(e),Ho=e),O??=s("div",{class:`bloom-root ${I("root")}`,attrs:{"data-bloom":"navigator"}},s("div",{class:I("rail")}),s("div",{class:I("toc")},s("div",{class:I("toc-head")}),s("div",{class:I("toc-list")}))),O.isConnected||document.body.append(O),Oa(t);let o=JSON.stringify(T.map(n=>[n.role,n.ids]));o!==Ro?(Ro=o,Yt=-1,_u(),pe&&Date.now()<pe.until&&pe.chat===b()&&T[0]?.ids[0]!==pe.first&&Fo(0)):$u(),Ye()}function Ye(){if(!O||!je)return;J=Yt>=0?Yt:Ju(je),O.querySelectorAll(`.${I("tick")}`).forEach((e,o)=>e.classList.toggle(I("tick-current"),o===J)),O.querySelectorAll(`.${I("row")}`).forEach(e=>e.setAttribute("aria-current",String(Number(e.dataset.index)===J)));let t=O.querySelector(`.${I("toc-head")}`);t&&(t.textContent=`${J+1} / ${T.length}`)}function $u(){O?.querySelectorAll(`.${I("tick")}`).forEach((t,e)=>{let o=T[e],n=$(o.summary,Do);t.title!==n&&(t.title=n),t.classList.toggle(I("tick-streaming"),o.streaming)}),O?.querySelectorAll(`.${I("row")}`).forEach(t=>{let e=t.lastElementChild,o=$(T[Number(t.dataset.index)].summary||"\u2026",Do);e&&e.textContent!==o&&(e.textContent=o)})}function _u(){O?.querySelector(`.${I("rail")}`)?.replaceChildren(...T.map((e,o)=>s("button",{class:uo(I("tick"),I(`tick-${e.role}`),e.streaming&&I("tick-streaming"),o===J&&I("tick-current")),title:$(e.summary,Do),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":e.ids[0]??""},on:{click:()=>Fo(o)}}))),O?.querySelector(`.${I("toc-list")}`)?.replaceChildren(...T.map(Zu))}var nt=bt(Xu);function Ka(){Yt=-1,pe=null,$n++}var td=t=>!!t&&(t.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!t.closest("[contenteditable='true']"));function Ra(t){if(!O||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey||td(document.activeElement)||_("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:J-1,ArrowDown:J+1,Home:0,End:T.length-1}[t.key];if(o==null){Ka();return}o<0||o>=T.length||(t.preventDefault(),t.stopPropagation(),Fo(o))}var Ya=g({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:Uo,styles:La,start(){Ia=[x(t=>P(t)&&nt()),tt(nt),lt.on("conversation",nt),lt.on("generate-start",({parentId:t,userId:e})=>{t&&(No={parent:t,user:e},nt())}),k.on("rise",nt),k.on("fall",nt)],addEventListener("keydown",Ra,!0),addEventListener("resize",nt,{passive:!0}),nt()},stop(){for(let t of Ia)t();Ge?.abort(),Kt?.disconnect(),Kt=void 0,je=null,Ho=null,removeEventListener("keydown",Ra,!0),removeEventListener("resize",nt),O?.remove(),O=null,Ro="",Na(),_n=""},onSettingsChange:nt});var ja=`/*
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
`;var K=E("bloom-quotes-"),mr="BloomBetterQuotes",od=40,Va=8,nd=1800,sr=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,Qa=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,Qt=A({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),rr,ir,ge,ar=!1,lr=0,Go=null,Ko=null,ut=null;function pr(){return b()??"draft"}function jo(){try{let t=JSON.parse(sessionStorage.getItem(mr)??"[]");return Array.isArray(t)?t.filter(e=>!!e&&typeof e=="object"&&typeof e.id=="string"&&typeof e.text=="string"&&!!e.text):[]}catch{return[]}}function fr(t){try{sessionStorage.setItem(mr,JSON.stringify(t.slice(-od)))}catch{}}function Qe(t){return jo().find(e=>e.id===t)?.text??""}function rd(t,e){let o=jo().filter(n=>n.id!==t);o.push({id:t,text:e}),fr(o)}function cr(t=pr()){fr(jo().filter(e=>e.id!==t)),Yo()}function id(t){let e=Qe("draft");if(!e||Qe(t))return;let o=jo().filter(n=>n.id!=="draft");o.push({id:t,text:e}),fr(o)}function ur(t){return`${t.getAttribute("aria-label")??""} ${t.getAttribute("title")??""}`}function ad(t){let e=ur(t);return Qa.test(e)&&!/quote|引用/.test(e)?!1:/quote|引用/.test(e)&&sr.test(e)?!0:sr.test(e)&&!Qa.test(e)}function Ja(t){let e=t.cloneNode(!0),o=[...e.querySelectorAll("button, [role='button']")],n=new Set(o.map(r=>r.getAttribute("aria-label")).filter(Boolean));for(let r of o)r.remove();for(let r of e.querySelectorAll("*"))!r.children.length&&n.has(h(r.textContent??""))&&r.remove();return h(e.textContent??"")}function sd(t){let e=z(),o=t.parentElement,n=0;for(;o&&o!==e&&n<5;){if(n++,o.matches(l.composerInput)||o.querySelector(l.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=Ja(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function Qo(){let t=z();if(!t)return null;for(let e of t.querySelectorAll("button, [role='button']")){if(e.closest("[data-bloom]")||!ad(e))continue;let o=sd(e),n=o?Ja(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:e}}return null}function ld(t){let e=t.closest(l.searchUnit)??t.closest(l.oldMessage);return e&&(wt(e)??e.getAttribute("data-message-author-role"))==="user"?e:null}function gr(t){return h(t).slice(0,48)}function cd(t,e){let o=gr(t);if(o.length<Va)return null;let n=null;for(let r of ue()){if(e&&(r===e||e.contains(r)||r.contains(e)))continue;let i=h(r.textContent??"");if(!i.includes(o))continue;let a=o.length/Math.max(i.length,1);(!n||a>n.score)&&(n={el:r,score:a})}return n?.el??null}function ud(t,e){let o=gr(e),n=t;for(let r of t.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&h(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${K("hit")}`)?.classList.remove(K("hit")),n.classList.add(K("hit")),window.clearTimeout(lr),lr=window.setTimeout(()=>n.classList.remove(K("hit")),nd)}function Wa(t){let e=t.closest(l.timelineScroll)??document.scrollingElement;if(!(e instanceof HTMLElement)&&e!==document.scrollingElement)return;let o=t.getBoundingClientRect();if(o.height<1||!e)return;let n=e.getBoundingClientRect(),r=z()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,a=o.top+o.height/2-(n.top+i)/2;Math.abs(a)<8||e.scrollTo({top:e.scrollTop+a,behavior:"smooth"})}function hr(){if(!ut||!Go?.isConnected)return;let t=Go.getBoundingClientRect();t.width<1||(ut.style.top=`${Math.max(8,t.top+8)}px`,ut.style.left=`${Math.max(8,t.right-ut.offsetWidth-8)}px`)}function dd(t,e,o){Go=t,Ko=e,ut??=s("button",{class:`bloom-root ${K("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),ut.isConnected||document.body.append(ut),ud(t,o),hr()}function za(){ut?.remove(),ut=null,Go=null,Ko=null,document.querySelector(`.${K("hit")}`)?.classList.remove(K("hit"))}function Za(){return document.querySelector('[data-bloom="quote-chip"]')}function Yo(){Za()?.remove()}function md(t){let o=z()?.getBoundingClientRect();!o||o.width<8||(t.style.width=`${Math.max(120,o.width-24)}px`,t.style.left=`${o.left+12}px`,t.style.top=`${Math.max(8,o.top-t.offsetHeight-8)}px`)}function pd(t){let e=Za();e||(e=s("div",{class:`bloom-root ${K("chip")}`,attrs:{"data-bloom":"quote-chip"}},s("span",{class:K("text")}),s("button",{class:K("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(e));let o=e.querySelector(`.${K("text")}`),n=h(t);o&&o.textContent!==n&&(o.textContent=n),e.dataset.text=t,md(e)}function dr(){if(!ar){ar=!0;try{let t=pr(),e=Qo();Qt.store.persistAcrossChats&&e&&Qe(t)!==e.text&&rd(t,e.text);let o=Qt.store.persistAcrossChats?Qe(t):"";!o||e&&h(e.text)===h(o)?Yo():pd(o),hr()}finally{ar=!1}}}function fd(t){let e=t.closest('[data-bloom="quote-chip"]');if(e instanceof HTMLElement&&!t.closest(`.${K("x")}`)){let i=e.dataset.text??e.querySelector(`.${K("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:e}:null}let o=t.closest("blockquote");if(o instanceof HTMLElement&&!t.closest("a, button")){let i=ld(o),a=h(o.textContent??"");if(i&&a)return{text:a,skip:i,origin:o}}let n=z();if(!n||!n.contains(t)||Ie(t)||t.closest("button, [role='button']"))return null;let r=Qo();return!r||!r.row.contains(t)?null:{text:r.text,skip:null,origin:r.row}}function gd(t){let{target:e}=t;if(!(e instanceof Element))return;if(e.closest('[data-bloom="quote-back"]')){t.preventDefault(),t.stopPropagation(),Ko?.isConnected&&Wa(Ko);return}if(e.closest(`.${K("x")}`)){t.preventDefault(),t.stopPropagation(),cr();return}let o=Qo();if(o&&(e===o.dismiss||o.dismiss.contains(e))){cr();return}if(hd(e)&&Xa(),!Qt.store.jumpToPassage)return;let n=fd(e);if(!n)return;let r=cd(n.text,n.skip);r&&(t.preventDefault(),t.stopPropagation(),dd(r,n.origin,n.text),Wa(r))}function hd(t){let e=t.closest("button, [role='button']");return!(e instanceof HTMLElement)||e.closest("[data-bloom]")||!z()?.contains(e)?!1:/send|submit|发送|提交/i.test(ur(e))&&!sr.test(ur(e))}function bd(t){return!(t instanceof KeyboardEvent)||t.key!=="Enter"||t.shiftKey||t.isComposing?!1:Ie(t.target)}function Xa(){if(!Qt.store.persistAcrossChats)return;let t=pr(),e=Qe(t);if(e){if(!Qo()){let o=N(),n=gr(e);n.length>=Va&&!h(o).includes(n)&&yt(`> ${e}

${o}`.trim())}cr(t)}}function Ad(t){bd(t)&&Xa()}function yd(t){!t.prevId&&t.id&&id(t.id),dr()}var $a=g({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:Qt,styles:ja,onSettingsChange(t){t==="jumpToPassage"&&!Qt.store.jumpToPassage&&za(),t==="persistAcrossChats"&&!Qt.store.persistAcrossChats&&(sessionStorage.removeItem(mr),Yo()),dr()},start(){ge=new AbortController,document.addEventListener("pointerdown",gd,{capture:!0,signal:ge.signal}),document.addEventListener("keydown",Ad,{capture:!0,signal:ge.signal}),addEventListener("scroll",hr,{capture:!0,passive:!0,signal:ge.signal}),ir=tt(yd),rr=x(t=>P(t)&&dr())},stop(){ge?.abort(),ge=void 0,ir?.(),ir=void 0,rr?.(),rr=void 0,window.clearTimeout(lr),za(),Yo()}});var _a=`/*
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
`;var qd="[data-app-action-sidebar-thread-row]{position:relative}[data-app-action-sidebar-thread-row]>[data-bloom=cls]{position:absolute;inset-inline-end:0.25rem;top:50%;width:0.875rem;height:0.875rem;margin:0;transform:translateY(-50%);pointer-events:none}",wd=E("bloom-cls"),xd="bloom-cls",Sd=600*1e3,Ar=ai("tab"),be=new Map,ze=new Map,he=null,ts=[],Ed=t=>t==="streaming"||t==="error";function Td(){let t=new Map,e=Date.now();for(let[o,n]of ze)e-n.at>Sd?ze.delete(o):t.set(o,n.status);for(let[o,n]of be)t.set(o,n);return t}function Md(t){return s("span",{class:`bloom-root ${wd("",`-${t}`)}`,attrs:{"data-bloom":"cls","data-status":t,"aria-label":t==="error"?"Error":"Generating"}},t==="error"&&U("alert"))}function We(){let t=Td(),e=new Set;for(let[o,n]of t)for(let r of De(o)){if(!et(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){e.add(i);continue}i?.remove();let a=Md(n);e.add(a),r.append(a)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))e.has(o)||o.remove()}function Wo(t,e){t&&(e?be.set(t,e):be.delete(t),he?.postMessage({tab:Ar,id:t,status:e}),We())}function Cd({data:t}){!B(t)||typeof t.id!="string"||typeof t.tab!="string"||t.tab===Ar||(Ed(t.status)?ze.set(t.id,{status:t.status,tab:t.tab,at:Date.now()}):ze.delete(t.id),We())}function br(){for(let t of be.keys())he?.postMessage({tab:Ar,id:t,status:null})}var es=g({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:()=>`${_a}${qd}`,start(){he=typeof BroadcastChannel=="function"?new BroadcastChannel(xd):null,he?.addEventListener("message",Cd),addEventListener("pagehide",br),ts=[k.on("rise",({conversationId:t})=>Wo(t,"streaming")),k.on("fall",({conversationId:t,outcome:e})=>Wo(t,e==="error"?"error":null)),k.on("context",({prevId:t,id:e,migrated:o})=>{o&&j().generating?Wo(e,"streaming"):!o&&be.get(t??"")==="streaming"&&Wo(t,null)}),x(t=>P(t)&&We())],b()&&We()},stop(){for(let t of ts)t();br(),he?.close(),he=null,removeEventListener("pagehide",br),be.clear(),ze.clear(),We()}});var St="data-bloom-invite",Ld=/^(?:invite team members|invite members|邀请团队成员|邀请成员)$/i,os=':is(button, a:not([href^="/c/"])):not(main *, [role="dialog"] *)',kd={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${l.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])'],hideInvite:[`[${St}]`,`div:has(> [${St}]:only-child)`]},ns=A({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0},hideInvite:{type:"boolean",description:"Hide Invite team members in the sidebar.",default:!0}}),zo,yr=!1;function Id(t){if(P(t))for(let e of document.querySelectorAll(`${os}, [${St}]`))!e.matches(os)||!Ld.test(h(e.textContent??""))?e.removeAttribute(St):e.hasAttribute(St)||e.setAttribute(St,"")}var rs=g({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads, notices and Invite team members.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:ns,styles:()=>te(Object.entries(kd).flatMap(([t,e])=>ns.store[t]?e:[])),start(){yr=!0,vt().then(()=>{yr&&!zo&&(zo=x(Id))})},stop(){yr=!1,zo?.(),zo=void 0;for(let t of document.querySelectorAll(`[${St}]`))t.removeAttribute(St)}});var Ae=`form:has(:is(${l.composerInput})), ${l.oldComposerForm}`,Vo='[class*="ComposerLayoutBody"]',qr='[class*="ComposerLayoutRoot"]',Bd='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',Pd=`:is(${Ae}) ${Vo}, :is(${Ae}):not(:has(${Vo})) ${qr}, :is(${Ae}):not(:has(${Vo})):not(:has(${qr})) :is(${Bd})`,Od='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',Rd='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',Hd="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))",Dd="var(--color-background-composer-surface, var(--composer-background-color, var(--color-bg-primary, Canvas)))",Nd="composer-fill",is=A({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function Ud(){let{opacity:t,blur:e}=is.store;if(t>=100)return"";{let i=`color-mix(in srgb, ${Dd} ${t}%, transparent)`;return`[class*="ComposerLayoutRoot"], [data-composer-layout], [data-chatgpt-composer]{--composer-layout-surface-background:${i}!important;--composer-background-color:${i}!important;--composer-layout-surface-backdrop-filter:blur(${e}px)!important}`}let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${Hd} ${t}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${e}px)!important;-webkit-backdrop-filter:blur(${e}px)!important`;return`:is(${Od}), :is(${Ae}){${o}}:is(${Rd}){display:none!important}${Pd}{${n}}:is(${Ae}):has(${Vo}) ${qr}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${Ae}) :is(${l.composerInput}){background-color:transparent!important}`}function vr(){for(let t of document.querySelectorAll(`[data-bloom="${Nd}"]`))t.remove()}var as=g({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:is,styles:Ud,start(){vr()},stop(){vr()},onSettingsChange(){vr()}});var Fd=1200,Gd=8e3,Kd=150,Yd=20,ss=6,Sr="continue where you left",jd=/message delivery timed out|please try again/i,ls=/waiting for the complete answer/i,cs=A({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:Sr,placeholder:Sr}}),wr=[],Zo=0,Ve=!1,Je=0,ve="",Jo="",Er=0,qe=!1,Ze=!1,Xo=!0,ye="",Tr=0,$o=!1,Qd=()=>cs.store.prompt.trim()||Sr;function us(){return(_(l.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function ds(){let t=us();return!t||ls.test(t)||!jd.test(t)?"":t}function Wd(){let t=us();return t&&ls.test(t)?t:""}function zd(){let t=Po()?.querySelectorAll(l.turn),e=t?.[t.length-1];return`${e?.getAttribute("data-turn-key")??""}:${e?.textContent?.length??0}`}function ms(t,e,o){if(o===Zo){if(j().generating||N()!==t||e>=Yd){qe=!1,j().generating||(ve="");return}Fi(),setTimeout(()=>ms(t,e+1,o),Kd)}}function Vd(t){let e=Zo;if(j().generating||N()&&N()!==t){qe=!1,ve="";return}yt(t),$o=!0,Tn(()=>{e===Zo&&ms(t,0,e)})}function ps(t){return t===ve||Je>=ss||j().generating||N()?!1:(ve=t,Je+=1,qe=!0,Vd(Qd()),!0)}function Jd(){if(Ve||qe||Ze)return;let t=Date.now(),e=ds();if(e){if(ye="",e!==Jo){Jo=e,Er=t;return}if(t-Er<Fd)return;ps(`${b()??""}:${e}`);return}if(Jo="",!Wd()){Xo=!0,ye="";return}if(!Xo||!j().generating||N())return;let n=`${b()??""}:${zd()}`;if(n!==ye){ye=n,Tr=t;return}if(t-Tr<Gd||Je>=ss)return;let r=Mn();r&&(Ze=!0,r.click())}function xr(){Zo+=1,Ve=!1,Je=0,ve="",Jo="",Er=0,qe=!1,Ze=!1,Xo=!0,ye="",Tr=0,$o=!1}var fs=g({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:cs,start(){xr(),wr=[k.on("rise",()=>{Ve=!1,ve="",qe=!1,$o&&($o=!1,Xo=!1,ye="")}),k.on("fall",({outcome:t})=>{if(Ze){Ze=!1,t==="left"?Ve=!0:ps(`${b()??""}:stall`);return}(t==="stopped"||t==="left")&&(Ve=!0),t==="done"&&!ds()&&(Je=0)}),k.on("context",({migrated:t})=>{t||xr()}),k.on("tick",Jd)]},stop(){for(let t of wr)t();wr=[],xr()}});var dt=E("bloom-csi-"),Zd=256,Xd=160,_o=1,gs=4,$d=.1,_d=.0015,tm=250;function em(t){return new Promise((e,o)=>{let n=new FileReader;n.onload=()=>e(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(t)})}function om(t){return new Promise((e,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>e(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=t})}function nm(t,e){let o=Math.max(1/t.naturalWidth,1/t.naturalHeight)*e.zoom,n=1/(2*t.naturalWidth*o),r=1/(2*t.naturalHeight*o);return{zoom:e.zoom,x:ft(e.x,n,1-n),y:ft(e.y,r,1-r)}}function hs(t,e,o){let n=t.width,r=t.getContext("2d");if(!r)return;let i=Math.max(n/e.naturalWidth,n/e.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(e,n/2-o.x*e.naturalWidth*i,n/2-o.y*e.naturalHeight*i,e.naturalWidth*i,e.naturalHeight*i)}function rm(t,e){let o=s("canvas");return o.width=o.height=Zd,hs(o,t,e),o.toDataURL("image/png")}function bs(t){let e=null,o={x:R.store.cropX,y:R.store.cropY,zoom:R.store.cropZoom},n,r=s("canvas",{class:dt("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=Xd*devicePixelRatio;let i=s("div",{class:`bloom-muted ${dt("status")}`}),a=s("div",{class:dt("zoom")}),d=s("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function c(f,D=!0){e&&(o=nm(e,f),hs(r,e,o),D&&(clearTimeout(n),n=setTimeout(()=>{e&&(R.store.cropX=o.x,R.store.cropY=o.y,R.store.cropZoom=o.zoom,R.store.avatarUrl=rm(e,o))},tm)))}function u(){a.replaceChildren(So(o.zoom,_o,gs,$d,"\xD7",f=>c({...o,zoom:f})))}async function m(f,D){i.textContent="";try{e=await om(f),D&&(R.store.avatarSource=f,o={x:.5,y:.5,zoom:_o}),t.classList.add(dt("has-image")),u(),c(o,D)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let y=f=>{f?.type.startsWith("image/")&&em(f).then(D=>m(D,!0))};d.addEventListener("change",()=>y(d.files?.[0])),r.addEventListener("wheel",f=>{e&&(f.preventDefault(),c({...o,zoom:ft(o.zoom*(1-f.deltaY*_d),_o,gs)}),u())},{passive:!1}),r.addEventListener("pointerdown",f=>{if(!e)return;r.setPointerCapture(f.pointerId);let D={...o},Ct=r.getBoundingClientRect(),so=lo=>{if(!e)return;let W=Math.max(Ct.width/e.naturalWidth,Ct.height/e.naturalHeight)*o.zoom;c({...o,x:D.x-(lo.clientX-f.clientX)/(e.naturalWidth*W),y:D.y-(lo.clientY-f.clientY)/(e.naturalHeight*W)})};r.addEventListener("pointermove",so),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",so),{once:!0})});let C=s("div",{class:dt("cropper"),attrs:{tabindex:"0"},on:{paste:f=>y([...f.clipboardData?.files??[]].find(D=>D.type.startsWith("image/"))),dragover:f=>f.preventDefault(),drop:f=>{f.preventDefault(),y(f.dataTransfer?.files[0])}}},s("div",{class:dt("stage")},r),s("div",{class:dt("controls")},Re("",f=>f.trim()&&void m(f.trim(),!0),"https://\u2026 or data:image/\u2026","url"),s("div",{class:dt("buttons")},F("Choose file",()=>d.click()),F("Reset crop",()=>{c({x:.5,y:.5,zoom:_o}),u()}),F("Clear",()=>{e=null,t.classList.remove(dt("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),R.store.avatarUrl="",R.store.avatarSource=""},"danger")),a,i,d));return t.append(C),R.store.avatarSource&&m(R.store.avatarSource,!1),()=>{clearTimeout(n),t.replaceChildren()}}var As=`/*
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
`;var Xe="data-bloom-csi-avatar",Mr="data-bloom-csi-sized",ws="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",am=32,R=A({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:t=>bs(t)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),ys=[];function xs(t){t.removeAttribute(Xe),t.removeAttribute(Mr)}function vs(t){return(R.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${t}]`)])}function qs(t=[]){if(!P(t))return;let e=R.store.displayName.trim()||null,o=!!R.store.avatarUrl,n=new Set(e?vs("name"):[]);for(let i of document.querySelectorAll(ws))n.has(i)||It(i,null);for(let i of n)It(i,e);let r=new Set(o?vs("avatar"):[]);for(let i of document.querySelectorAll(`[${Xe}]`))r.has(i)||xs(i);for(let i of r)i.hasAttribute(Xe)||i.setAttribute(Xe,""),i.toggleAttribute(Mr,!i.closest('[role="menu"]'))}function sm(){let t=R.store.avatarUrl;return t?`:root{--bloom-csi-url:url("${t.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${R.store.avatarSize}px}:is(${l.rail}, ${l.oldRail}) [${Mr}]{--bloom-csi-size:${am}px}`:""}var Ss=g({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:R,styles:()=>`${sm()}
${As}`,start(){ys=[ot(),x(qs)]},stop(){for(let t of ys)t();for(let t of document.querySelectorAll(`[${Xe}]`))xs(t);for(let t of document.querySelectorAll(ws))It(t,null)},onSettingsChange(){qs()}});var we=E("bloom-greeting-"),Es=30,Ts=100;function Ms(t){let e=-1,o=s("textarea",{class:`bloom-input ${we("input")}`,attrs:{maxlength:String(Ts),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=F("Add",i),r=s("div",{class:we("list")});function i(){let c=o.value.trim().slice(0,Ts);if(!c)return;let u=[...S.store.greetings];e>=0?u[e]=c:u.length<Es&&u.push(c),S.store.greetings=u,e=-1,o.value="",a()}function a(){let{greetings:c}=S.store;n.textContent=e>=0?"Save":"Add",n.disabled=e<0&&c.length>=Es,r.replaceChildren(...c.length?c.map((u,m)=>s("div",{class:we("row",m===e?"row-editing":"row-idle")},s("div",{class:we("text"),text:u}),V("edit","Edit",()=>{e=m,o.value=u,o.focus(),a()}),V("trash","Delete",()=>{S.store.greetings=c.filter((y,C)=>C!==m),e===m&&(e=-1),a()}))):[s("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",c=>{c.key==="Enter"&&(c.ctrlKey||c.metaKey)&&i()}),t.append(s("div",{class:we("editor")},r,s("div",{class:we("form")},o,n))),a();let d=oe((c,u)=>c==="GreetingCustomizer"&&u==="greetings"&&a());return()=>{d(),t.replaceChildren()}}var Cs=`/*
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
`;var on="data-bloom-greeting",cm=1e3,um=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],S=A({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:t=>Ms(t)},greetings:{type:"custom",default:um},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),tn,Ls=[],Cr,_e=()=>xo()&&!Bt(),dm=t=>t.replaceAll(/\s*\n\s*/g," ").trim(),Is=()=>S.store.greetings.filter(t=>typeof t=="string"&&t.trim());function to(){let t=Is();if(t.length)if(S.store.order==="random"&&t.length>1){let e=S.store.lastRandom;for(;e===S.store.lastRandom;)e=Math.floor(Math.random()*t.length);S.store.lastRandom=e,S.store.index=e}else S.store.index=(S.store.index+1)%t.length}function mm(){return _e()?_(l.homeHeading):null}function en(){for(let t of document.querySelectorAll(`[${on}]`))t.removeAttribute(on),It(t,null)}function nn(){for(let t of document.querySelectorAll("[data-bloom-placeholder]"))t.removeAttribute("data-bloom-placeholder")}function ks(t){let e=st(),o=dm(t);if(!e||!o||N(e)){nn();return}e.getAttribute("data-bloom-placeholder")!==o&&e.setAttribute("data-bloom-placeholder",o)}function $e(){let t=Is(),e=Yi(),o=_e();if(!t.length||!e&&!o){en(),nn();return}if(e){en(),ks(t[0]??"");return}let n=mm();n?((S.store.index<0||S.store.index>=t.length)&&to(),n.setAttribute(on,""),It(n,t[Math.max(0,S.store.index)%t.length]??"")):en(),S.store.heroOnlyOutsideProject?nn():ks(t[Math.max(0,S.store.index)%t.length]??"")}function Lr(){clearInterval(tn),tn=void 0,S.store.mode==="interval"&&_e()&&(tn=setInterval(()=>{to(),$e()},S.store.intervalSec*cm))}function pm(t){S.store.mode!=="manual"||!(t.target instanceof Element)||!t.target.closest(`[${on}]`)||getSelection()?.toString()||(to(),$e())}function fm(){_e()&&S.store.mode==="refresh"&&to(),Lr(),$e()}var Bs=g({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:S,styles:Cs,start(){Cr=new AbortController,document.addEventListener("click",pm,{signal:Cr.signal}),_e()&&S.store.mode==="refresh"&&to(),Lr(),Ls=[x(t=>P(t)&&$e()),tt(fm)]},stop(){Cr?.abort();for(let t of Ls)t();clearInterval(tn),en(),nn()},onSettingsChange(t){(t==="mode"||t==="intervalSec")&&Lr(),$e()}});var eo=E("bloom-history-"),kr=10,gm=3e3;function Ps(t){let e="",o=0,n=new Set,r=s("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=s("div",{class:eo("list")}),a=s("div",{class:eo("pager")}),d,c=F("Clear all",()=>{if(!d){c.textContent="Click again to clear",d=setTimeout(()=>{d=void 0,c.textContent="Clear all"},gm);return}clearTimeout(d),d=void 0,c.textContent="Clear all",oo([])},"danger");function u(){let y=[...Wt.store.entries].toReversed(),C=e.trim().toLowerCase(),f=C?y.filter(W=>W.toLowerCase().includes(C)):y,D=Math.max(1,Math.ceil(f.length/kr));o=Math.min(o,D-1);let Ct=f.slice(o*kr,(o+1)*kr).map(W=>s("div",{class:eo("row")},s("button",{class:eo("text",n.has(W)?"text-open":"text-closed"),text:W,title:n.has(W)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(W)||n.add(W),u()}}}),V("copy","Copy",()=>void li(W)),V("trash","Delete",()=>oo(Wt.store.entries.filter(Nl=>Nl!==W)))));i.replaceChildren(...Ct.length?Ct:[s("div",{class:"bloom-muted",text:C?"No matching prompts.":"No saved prompts yet."})]),a.replaceChildren(s("span",{class:"bloom-muted",text:`${f.length} ${C?"matching":"saved"} \xB7 page ${o+1} of ${D}`}),F("Previous",()=>{o--,u()}),F("Next",()=>{o++,u()}),c);let[so,lo]=a.querySelectorAll("button");so.disabled=o===0,lo.disabled=o>=D-1,c.disabled=!y.length}r.addEventListener("input",()=>{e=r.value,o=0,u()}),t.append(s("div",{class:eo("manager")},r,i,a)),u();let m=oe((y,C)=>y==="InputHistory"&&C==="entries"&&u());return()=>{m(),clearTimeout(d),t.replaceChildren()}}var Os=`/*
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
`;var bm=E("bloom-history-"),Am=2e3,Wt=A({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:t=>Ps(t)},entries:{type:"custom",default:[]}}),Q=null,Ir={text:"",at:0},zt=null,Br,rn=()=>Wt.store.entries.filter(t=>typeof t=="string");function oo(t){Wt.store.entries=t.slice(-Wt.store.maxEntries)}function Pr(t){let e=t.trim();if(!e)return;let o=Date.now();e===Ir.text&&o-Ir.at<Am||(Ir={text:e,at:o},oo([...rn().filter(n=>n!==e),e]))}function ym(t,e){let o=st();if(!o)return;zt??=s("div",{class:`bloom-root ${bm("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),zt.textContent=`${t+1} / ${e}`;let n=(o.closest("form")??o).getBoundingClientRect();zt.style.left=`${n.left+n.width/2}px`,zt.style.top=`${n.top}px`,zt.isConnected||document.body.append(zt)}function no(){Q=null,zt?.remove()}function vm(t){let e=rn();if(!Q)return;let o=e[t];Q.index=t,Q.shown=o,yt(o),ym(e.length-1-t,e.length)}function qm(t){let e=rn();if(!e.length)return!1;if(!Q){if(t===1)return!1;Q={index:e.length,draft:N(),shown:""}}let o=Q.index+t;return o<0?!0:o>=e.length?(yt(Q.draft),no(),!0):(vm(o),!0)}function Rs(t){return Ie(t)?t:t instanceof HTMLElement?t.closest(l.composerInput):null}function wm(){if(st()?.closest("[data-chatgpt-composer], [data-composer-input], form")?.querySelector('[aria-expanded="true"]'))return!0;for(let e of document.querySelectorAll('[role="listbox"], [role="menu"], [data-radix-popper-content-wrapper], [cmdk-root], [cmdk-list]')){if(!(e instanceof HTMLElement)||e.closest("[data-bloom]"))continue;let o=getComputedStyle(e);if(!(o.display==="none"||o.visibility==="hidden"))return!0}return!1}function xm(t){if(t.isComposing||t.key==="Process"||t.keyCode===229)return;let e=Rs(t.target);if(!e)return;if(t.key==="Enter"&&!t.shiftKey){Pr(N(e)),no();return}if(t.key==="Escape"&&Q){yt(Q.draft),no(),t.preventDefault(),t.stopPropagation();return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.ctrlKey||t.metaKey||t.shiftKey||wm())return;let o=Ni(e),n=t.key==="ArrowUp";!t.altKey&&!(n?o.first:o.last)||!n&&!Q||qm(n?-1:1)&&(t.preventDefault(),t.stopPropagation())}function Sm(t){Q&&Rs(t.target)&&N()!==Q.shown.trim()&&no()}function Em(t){t.target instanceof Element&&t.target.closest(l.sendButton)&&Pr(N())}var Hs=g({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:Wt,styles:Os,start(){Br=new AbortController;let{signal:t}=Br;document.addEventListener("keydown",xm,{capture:!0,signal:t}),document.addEventListener("input",Sm,{capture:!0,signal:t}),document.addEventListener("click",Em,{capture:!0,signal:t}),document.addEventListener("submit",()=>Pr(N()),{capture:!0,signal:t})},stop(){Br?.abort(),no()},onSettingsChange(t){t==="maxEntries"&&oo(rn())}});var Ds=`/*
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
`;var Mm=1500,Cm=5e3,Lm=2e3,Ys=[{label:"UTC",value:"UTC"},{label:"\u7F8E\u56FD\u4E1C\u90E8",value:"America/New_York"},{label:"\u7F8E\u56FD\u4E2D\u90E8",value:"America/Chicago"},{label:"\u7F8E\u56FD\u5C71\u5730",value:"America/Denver"},{label:"\u7F8E\u56FD\u897F\u90E8",value:"America/Los_Angeles"},{label:"\u65E5\u672C",value:"Asia/Tokyo"},{label:"\u53F0\u6E7E",value:"Asia/Taipei"}],xe=A({sourceTimeZone:{type:"select",description:"Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",options:Ys,default:"UTC"},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),sn=new Map,Or=new Set,js=0,ln,Ns=[];function Qs(t,e){sn.get(t)!==e&&(sn.set(t,e),clearTimeout(ln),ln=setTimeout(Ws,Lm))}function Ws(){let t={...xe.store.stamps,...Object.fromEntries(sn)};xe.store.stamps=Object.fromEntries(Object.entries(t).toSorted((e,o)=>o[1]-e[1]).slice(0,Mm))}function km(t){let e=ct(b())?.times;for(let o=t.length-1;o>=0;o--){let n=sn.get(t[o])??e?.get(t[o])??xe.store.stamps[t[o]];if(n)return n}return null}var Im=()=>j().generating||Date.now()-js<Cm;function zs(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function Vs(){let t=xe.store.sourceTimeZone;if(!t||t==="UTC")return"UTC";try{return Intl.DateTimeFormat(void 0,{timeZone:t}),t}catch{return"UTC"}}function Js(t,e){let o={};for(let n of new Intl.DateTimeFormat("en-US",{timeZone:e,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(t)))o[n.type]=n.value;return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour%24,mi:+o.minute,s:+o.second}}function Zs(t){return Date.UTC(t.y,t.m-1,t.d,t.h,t.mi,t.s)}function Us(t,e){let o=t;for(let n=0;n<4;n++){let r=t-Zs(Js(o,e));if(r===0)return o;o+=r}return o}function Bm(t,e){if(e==="UTC")return t;let o=(t%1e3+1e3)%1e3,n=t-o,r=new Date(n),i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds()),a=Us(i,e),d=3600*1e3,c=Number.POSITIVE_INFINITY;for(let u of[-d,0,d]){let m=a+u;Zs(Js(m,e))===i&&m<c&&(c=m)}return c!==Number.POSITIVE_INFINITY?c+o:Us(i+d,e)+o}function Pm(t,e){let o=Vs();return e||o==="UTC"?t:Bm(t,o)}function Fs(t,e){return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}function Om(t){let e=zs(),o=Date.now(),n={hour:"2-digit",minute:"2-digit",timeZone:e};if(Fs(t,e)===Fs(o,e))return new Intl.DateTimeFormat(void 0,n).format(t);let r=a=>new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric"}).format(a),i=r(t)===r(o)?{}:{year:"numeric"};return new Intl.DateTimeFormat(void 0,{...i,month:"short",day:"numeric",...n}).format(t)}function Rm(t,e){let o=new Date(e).toLocaleString(void 0,{timeZone:zs()}),n=Vs();if(n==="UTC"||e===t)return o;let r=new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"}).format(t);return`${Ys.find(a=>a.value===n)?.label??n} ${r} \u2192 ${o}`}function Xs(t){let e=wt(t)??t.getAttribute("data-message-author-role")??t.closest(l.turn)?.getAttribute("data-turn")??t.querySelector(l.authorRole)?.getAttribute("data-message-author-role");if(Bo(e))return e;let o=Ue(t).at(-1);return ct(b())?.chain.find(n=>n.id===o)?.role??null}var Gs='[class*="group/activity-header"]';function Hm(t){let e=t.parentElement;if(!e)return null;let o=t.closest(l.turn);return o&&e!==o&&!o.contains(e)?null:e}function Dm(t){let e=t;for(let o=0;o<8&&e;o++){let n=Hm(e);if(!n)return null;let r=[...n.children],i=r.indexOf(e);for(let a=i-1;a>=0;a--){let d=r[a],c=d.matches(Gs)?d:d.querySelector(Gs);if(c)return c;if(d.matches(l.searchUnit)||d.querySelector(l.searchUnit))return null}if(n===e.closest(l.turn))return null;e=n}return null}function Nm(t){let e=t.parentElement;for(let o=0;o<4&&e;o++){if(e.classList.contains("flex-col"))return e;e=e.parentElement}return t.parentElement??t}function $s(t,e){if(e==="assistant"){let o=Dm(t);if(o)return Nm(o)}return t}function Um(t,e){let o=ue();for(let n=o.length-1;n>=0;n--){let r=o[n];if(!(r!==t&&(Xs(r)!=="assistant"||$s(r,"assistant")!==e)))return r===t}return!0}function Ks(t){return t.querySelector(':scope > time[data-bloom="timestamp"]')}function Fm(t){let e=Ue(t);if(!e.length||!et(t)||t.querySelector("time:not([data-bloom])"))return;let o=Xs(t),n=$s(t,o);if(n!==t&&!Um(t,n)){Ks(t)?.remove();return}let r=km(e),i=!1;if(!r&&Im()){r=Date.now();let m=e.at(-1);Or.add(m),Qs(m,r),i=!0}else r&&Or.has(e.at(-1))&&(i=!0);let a=n.querySelector('time[data-bloom="timestamp"]')??Ks(t);if(!r||xe.store.hideOwnMessages&&o==="user"){a?.remove();return}let d=Pm(r,i),c=Om(d);if(a?.textContent===c&&a.parentElement===n&&a===n.firstElementChild)return;let u=s("time",{class:`bloom-timestamp bloom-timestamp-${o??"assistant"}`,text:c,title:Rm(r,d),attrs:{"data-bloom":"timestamp",datetime:new Date(d).toISOString()}});a&&a.replaceWith(u),(u.parentElement!==n||u!==n.firstElementChild)&&n.prepend(u)}var an=bt(()=>{for(let t of ue())Fm(t)}),_s=g({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:xe,styles:Ds,start(){Ns=[x(t=>P(t)&&an()),lt.on("conversation",an),lt.on("message-time",({messageId:t,time:e})=>{Or.delete(t),Qs(t,e),an()}),k.on("fall",()=>{js=Date.now()})]},stop(){for(let t of Ns)t();ln&&(clearTimeout(ln),Ws());for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove()},onSettingsChange(t){if(t!=="stamps"){for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove();an()}}});var Gm=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])','[data-chatgpt-composer] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-composer-input] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-codex-composer-root] button[aria-label^="Dictat" i], [data-composer-placement] button[aria-label^="Dictat" i], [class*="ComposerLayout"] button[aria-label^="Dictat" i]'],Km=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],tl=A({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),el=g({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:tl,styles:()=>te([...Gm,...tl.store.hideDictationSettings?Km:[]])});var Vt="data-bloom-share",Ym=/^\/g\/g-p-/,jm=/^(?:share|分享)$/i,Qm=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],Wm=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${Vt}="project"]`],Rr=A({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),cn,Hr=!1;function zm(t){if(!P(t))return;let e=Ym.test(location.pathname)&&!b();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${Vt}]`))!e||!jm.test(h(o.textContent??""))?o.removeAttribute(Vt):o.hasAttribute(Vt)||o.setAttribute(Vt,"project")}var ol=g({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:Rr,styles:()=>te([...Rr.store.hideShareChat?Qm:[],...Rr.store.hideShareProject?Wm:[]]),start(){Hr=!0,vt().then(()=>{Hr&&!cn&&(cn=x(zm))})},stop(){Hr=!1,cn?.(),cn=void 0;for(let t of document.querySelectorAll(`[${Vt}]`))t.removeAttribute(Vt)}});var nl='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',Vm='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',Jm="[data-bloom-profile-plan]",rl="visibility:hidden!important;user-select:none!important",al=A({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function Zm(){let{hideUsername:t,hideEmail:e,enlargePlan:o,alignPlanWithAvatar:n}=al.store,r=[];return t&&r.push(n?`:is(${nl}){display:none!important}`:`:is(${nl}){${rl}}`),e&&r.push(`:is(${Vm}){${rl}}`),t&&o&&r.push(`${Jm}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var il,sl=g({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:al,styles:Zm,start(){il=ot()},stop(){il?.()}});var Xm=new Set(["chatgpt","new chat","\u65B0\u804A\u5929","codex"]);function $m(){let t=h(document.title.replace(/\s*[|–-]\s*(?:ChatGPT|Codex)$/i,""));return t&&!Xm.has(t.toLowerCase())?t:null}function ro(t){return t?Ne(t)??(t===b()?$m():null):null}var ll=`/*
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
`;var mt=E("bloom-recent-"),pt="home",tp=50,cl=140,ep=new Set(["Backquote"]),op=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),w=A({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(t=>({label:t,value:t})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),Et=null,rt=[],it=0,Dr,ul=[],mn=()=>Bt()?null:b()??(xo()?pt:null);function dl(t,e){return Object.fromEntries(Object.entries(t).filter(([o])=>e.has(o)))}function pl(t){let e=ro(t);e&&w.store.titles[t]!==e&&(w.store.titles={...w.store.titles,[t]:e});let o=da(location.href);o&&t===b()&&w.store.projects[t]!==o&&(w.store.projects={...w.store.projects,[t]:o})}function ml(t){if(!t)return;let e=[t,...w.store.visits.filter(n=>n!==t)].slice(0,tp),o=new Set(e);w.store.visits=e,Object.keys(w.store.previews).some(n=>!o.has(n))&&(w.store.previews=dl(w.store.previews,o)),Object.keys(w.store.titles).some(n=>!o.has(n))&&(w.store.titles=dl(w.store.titles,o)),t!==pt&&pl(t)}function un(t){if(!t||!w.store.visits.includes(t))return;let e={},o=ct(t)?.chain??[];for(let r of o)e[r.role]=$(Oo(r),cl);if(t===b())for(let r of xt()){let i=de(r);i&&(e[r.role]=$(i,cl))}let n=w.store.previews[t];!e.user&&!e.assistant||n?.user===e.user&&n?.assistant===e.assistant||(w.store.previews={...w.store.previews,[t]:e})}function np(){let t=Number(w.store.maxRecent);return w.store.visits.filter(e=>e!==pt||w.store.includeHome).slice(0,t)}function Nr(t){if(io(),t===mn())return;let e=t===pt?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"], [data-sidebar-destination="builtin:home"]'):De(t)[0];e?e.click():location.assign(t===pt?"/":`/c/${t}`)}function rp(t,e){let o=t===pt?"New chat":w.store.titles[t]??ro(t)??"Untitled chat",n=t===pt?null:w.store.projects[t],r=t===pt?null:w.store.previews[t];return s("button",{class:mt("item"),attrs:{type:"button",role:"option","aria-selected":String(e===it)},on:{click:()=>Nr(t),mousemove:()=>e!==it&&dn(e)}},s("div",{class:mt("head")},s("span",{class:`${mt("title")} bloom-truncate`,text:o}),n&&s("span",{class:mt("project"),text:n})),r?.user&&s("div",{class:`${mt("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&s("div",{class:`${mt("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function dn(t){it=(t+rt.length)%rt.length,Et?.querySelectorAll(`.${mt("item")}`).forEach((e,o)=>e.setAttribute("aria-selected",String(o===it)))}function ip(){un(b());let t=mn();rt=np(),t&&(rt=[t,...rt.filter(e=>e!==t)].slice(0,Number(w.store.maxRecent))),rt.length&&(it=rt.length>1?1:0,Et=s("div",{class:`bloom-root ${mt("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:e=>e.target===e.currentTarget&&io()}},s("div",{class:mt("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...rt.map(rp))),document.body.append(Et))}function io(){Et?.remove(),Et=null}var ap=t=>ep.has(t.code)||op.has(t.key);function sp(t){if(t.ctrlKey&&!t.altKey&&!t.metaKey&&ap(t)){t.preventDefault(),t.stopPropagation(),Et?dn(it+(t.shiftKey?-1:1)):ip();return}if(!Et)return;let o={Escape:io,Enter:()=>Nr(rt[it]),ArrowDown:()=>dn(it+1),ArrowUp:()=>dn(it-1)}[t.key];o&&(t.preventDefault(),t.stopPropagation(),o())}function lp(t){Et&&t.key==="Control"&&Nr(rt[it])}var fl=g({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:w,styles:ll,start(){Dr=new AbortController;let{signal:t}=Dr;addEventListener("keydown",sp,{capture:!0,signal:t}),addEventListener("keyup",lp,{capture:!0,signal:t}),addEventListener("blur",io,{signal:t}),document.addEventListener("visibilitychange",()=>document.hidden&&un(b()),{signal:t}),ul=[tt(({prevId:i})=>{un(i),ml(mn())}),lt.on("conversation",({id:i})=>{w.store.visits.includes(i)&&pl(i),un(i)})];let{visits:e,titles:o,previews:n}=w.store,r=e.filter(i=>i!==pt&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(w.store.visits=e.filter(i=>!r.includes(i))),ml(mn())},stop(){Dr?.abort();for(let t of ul)t();io()}});var Ur="data:audio/mpeg;base64,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";var gl=new q("ResponseNotification"),cp=.5,up=200,dp=300,ao=A({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:t=>(t.append(F("Preview",yl)),()=>t.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),hl=null,Fr=new Map,bl,Gr;function mp(t){return new Promise((e,o)=>GM_xmlhttpRequest({url:t,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=up&&n<dp?e(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var pp=t=>Uint8Array.from(atob(t.slice(t.indexOf(",")+1)),e=>e.charCodeAt(0)).buffer;function fp(t,e){let o=Fr.get(e);return o||(o=(e.startsWith("data:")?Promise.resolve(pp(e)):mp(e)).then(n=>t.decodeAudioData(n)),o.catch(()=>Fr.delete(e)),Fr.set(e,o)),o}async function Al(t){hl??=new AudioContext;let e=hl;e.state==="suspended"&&e.resume();let o=e.createBufferSource(),n=e.createGain();o.buffer=await fp(e,t),n.gain.value=cp,o.connect(n).connect(e.destination),o.start()}function yl(){let t=ao.store.soundUrl.trim();Al(t||Ur).catch(e=>{gl.warn("Sound failed",e),t&&Al(Ur).catch(o=>gl.warn("Default chime failed",o))})}function gp(t){let e=`${t??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:e,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:e,silent:!0});o.onclick=()=>{focus(),o.close()}}function hp(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(Gr=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:Gr.signal}))}var vl=g({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:ao,start(){hp(),bl=k.on("fall",({conversationId:t,outcome:e})=>{e==="done"&&(ao.store.onlyWhenHidden&&!document.hidden||(ao.store.sound&&yl(),ao.store.browserNotification&&gp(ro(t))))})},stop(){bl?.(),Gr?.abort()}});var bp=`:is(${l.sidebarScroll}, :has(> ${l.sidebarScroll})) + :has(${l.menuButton})`,Ap=`${l.rail} > :has(${l.menuButton})`,Yr=`:is(${bp}, ${Ap}, ${l.oldProfile}):not(:hover)`,Kr="[data-bloom-profile-avatar]",yp=`:is(${Yr}, ${Yr} :has(${Kr})) > :not(${Kr}, :has(${Kr}))`,wl=A({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function vp(){let{opacity:t,fadeAvatar:e}=wl.store;return t>=100?"":`${e?Yr:yp}{opacity:${t/100}!important}`}var ql,xl=g({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:wl,styles:vp,start(){ql=ot()},stop(){ql?.()}});var Sl=`/*
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
    width: 2rem;
    height: 2rem;
    border-radius: 0.5rem;
    color: inherit;
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
    overflow: auto;
    padding: 0.375rem;
    border: 1px solid var(--bloom-border);
    border-radius: 0.75rem;
    background: var(--bloom-surface);
    color: var(--bloom-fg);
    box-shadow: var(--bloom-shadow);
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
`;var H=E("bloom-star-chats"),wp=80,xp=60,Sp=1200,Ep=120,El=180,Jr=A({messages:{type:"custom",default:[]}}),jr,Qr=!1,Tt=!1,Jt=!1,Se=0,Y=null,pn="",M=null,Wr;function Zr(){let t=Jr.store.messages;return Array.isArray(t)?t.filter(e=>B(e)&&typeof e.conversationId=="string"&&typeof e.messageId=="string"&&(e.role==="user"||e.role==="assistant")&&typeof e.snippet=="string"&&typeof e.starredAt=="number"):[]}function Xr(){let t=b();return t?Zr().filter(e=>e.conversationId===t):[]}function Tp(t,e){return Zr().some(o=>o.conversationId===t&&o.messageId===e)}function Tl(t){let e=Zr(),o=e.some(n=>n.conversationId===t.conversationId&&n.messageId===t.messageId);Jr.store.messages=o?e.filter(n=>!(n.conversationId===t.conversationId&&n.messageId===t.messageId)):[{...t,starredAt:Date.now()},...e].slice(0,wp)}function zr(t){return t.messageIds[0]||t.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||t.el.getAttribute("data-turn-key")||""}function Mp(t){return $(de(t)||h(t.el.textContent??""),xp)}function Cp(t){let e=t.closest(l.turn);if(!e)return null;let o=xt().filter(n=>e.contains(n.el));return o.find(n=>n.el.contains(t)||n.el===e)??o.findLast(n=>n.el.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING)??null}function Lp(){let t=[...document.querySelectorAll(l.turnActions)].filter(e=>!e.closest(`[data-bloom], [role="dialog"], [inert], pre, ${l.sidebars}`));return t.filter(e=>!t.some(o=>o!==e&&o.contains(e)))}function kp(t){let e=[...t.querySelectorAll("button")].filter(n=>n.dataset.bloom!=="message-star"&&!n.closest("[data-bloom]"));return e.length?[...t.children].find(n=>n instanceof HTMLElement&&n!==e[0]&&e.every(r=>n.contains(r)))??t:t}function Ip(){return[...document.querySelectorAll(l.headerMore)].filter(e=>{if(e.dataset.bloom==="message-star"||e.closest("[data-bloom], [role='dialog'], [inert]")||e.closest(l.sidebars))return!1;let o=e.getBoundingClientRect();return o.width===0&&o.height===0?!!e.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((e,o)=>o.getBoundingClientRect().left-e.getBoundingClientRect().left||(e.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function Ml(t,e,o){return s("button",{class:e,attrs:{type:"button","aria-label":t},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},U("star"))}function Bp(t,e){t.setAttribute("aria-pressed",String(e)),t.setAttribute("aria-label",e?"Unstar":"Star")}function Vr(){return Tt||Jt}function Zt(){Se&&window.clearTimeout(Se),Se=0}function Ee(){Tt=!1,Jt=!1,Zt(),Y?.remove(),Y=null,pn="",M?.classList.remove(H("-open")),M?.setAttribute("aria-expanded","false")}function $r(t){return t instanceof Node&&!!(M?.contains(t)||Y?.contains(t))}function Pp(t){t.classList.add(H("-flash")),window.setTimeout(()=>t.classList.remove(H("-flash")),Sp)}function Op(t){let e=xt().find(n=>zr(n)===t),o=e?.el.closest(l.turn)??e?.el;o&&(o.scrollIntoView({block:"start"}),Pp(o))}function Rp(){let t=b(),e=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!t||Bt()){for(let n of o)n.remove();return}for(let n of Lp()){if(!et(n))continue;let r=Cp(n),i=r?zr(r):"";if(!r||!i)continue;let a=n.querySelector('[data-place="action"]');(!a||a.dataset.id!==i)&&(a?.remove(),a=Ml("Star",H("-star"),()=>{let c=b(),u=xt().find(m=>zr(m)===i);!c||!u||Tl({conversationId:c,messageId:i,role:u.role,snippet:Mp(u)})}),a.dataset.bloom="message-star",a.dataset.place="action",a.dataset.id=i),Bp(a,Tp(t,i));let d=kp(n);a.parentElement!==d&&d.append(a),e.add(a)}for(let n of o)e.has(n)||n.remove()}function Hp(){if(!Y||!M)return;let t=M.getBoundingClientRect(),e=Y.offsetWidth||288,o=Y.offsetHeight||120,n=t.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,t.top-o-6));let r=Math.max(8,Math.min(t.right-e,window.innerWidth-e-8));Y.style.left=`${Math.round(r)}px`,Y.style.top=`${Math.round(n)}px`}function Dp(){if(!Vr()||!M){Y?.remove(),Y=null,pn="",M?.classList.remove(H("-open")),M?.setAttribute("aria-expanded","false");return}let t=Xr(),e=t.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!Y||pn!==e){Y?.remove();let o=t.map(n=>s("div",{class:H("-row")},s("button",{class:H("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),Ee(),Op(n.messageId)}}},s("span",{class:H("-role"),text:n.role==="user"?"You":"ChatGPT"}),s("span",{class:H("-snip"),text:n.snippet||"Message"})),Ml("Unstar",H("-unstar"),()=>Tl(n))));Y=s("div",{class:`bloom-root ${H("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{Zt(),Jt=!0},pointerleave:n=>{$r(n.relatedTarget)||Tt||(Zt(),Se=window.setTimeout(()=>{Jt=!1,Xt()},El))}}},s("div",{class:H("-head"),text:"Starred"}),...o.length?o:[s("div",{class:H("-empty"),text:"No starred messages in this chat"})]),document.body.append(Y),pn=e}Hp(),M.classList.add(H("-open")),M.setAttribute("aria-expanded","true")}function Np(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let t=Ip(),e=t?.parentElement??null,o=b();if(!t||!e||e.closest(l.sidebars)||!o||Bt()||!et(e)){M?.remove(),M=null,Ee();return}M||(M=s("button",{class:H("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{Zt(),Se=window.setTimeout(()=>{Jt=!0,Xt()},Ep)},pointerleave:r=>{$r(r.relatedTarget)||(Zt(),Se=window.setTimeout(()=>{Jt=!1,Tt||Xt()},El))},click:r=>{r.preventDefault(),r.stopPropagation(),Tt=!Tt,Jt=Tt,Zt(),Tt||Ee(),Xt()}}},U("star"))),(M.parentElement!==e||M.nextElementSibling!==t)&&t.before(M);let n=t.getBoundingClientRect();n.width>0&&(M.style.width=`${n.width}px`,M.style.height=`${n.height}px`),M.classList.toggle(H("-here"),Xr().length>0),Dp()}function Up(){let t=new Set(Xr().map(e=>e.messageId));for(let e of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))e.classList.toggle(H("-mark"),!!e.dataset.messageId&&t.has(e.dataset.messageId))}function Xt(){if(!Qr){Qr=!0;try{for(let t of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))t.remove();Rp(),Np(),Up()}finally{Qr=!1}}}function Fp(){Ee(),M?.remove(),M=null;for(let t of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))t.remove();for(let t of document.querySelectorAll(`.${H("-mark")}`))t.classList.remove(H("-mark"))}var Cl=g({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:Jr,styles:Sl,onSettingsChange(t){t==="messages"&&Xt()},start(){jr=x(o=>P(o)&&Xt());let t=o=>{$r(o.target)||Vr()&&Ee()};document.addEventListener("pointerdown",t,!0);let e=o=>{o.key!=="Escape"||!Vr()||(o.preventDefault(),Ee())};document.addEventListener("keydown",e,!0),Wr=()=>{document.removeEventListener("pointerdown",t,!0),document.removeEventListener("keydown",e,!0)},Xt()},stop(){jr?.(),jr=void 0,Wr?.(),Wr=void 0,Zt(),Fp()}});var Ll="filter:blur(6px)!important;transition:filter 0.2s ease",Ky=`:is(${l.sidebars})`,$t="data-bloom-streamer-open",Gp="[data-app-action-sidebar-thread-row], [data-app-action-sidebar-project-row], .bloom-recent-item",kl=":not([data-app-action-sidebar-thread-row] *, [data-app-action-sidebar-project-row] *)";function Kp(){return{conversations:{selectors:["[data-app-action-sidebar-thread-title]"],hover:!0,row:"[data-app-action-sidebar-thread-row]"},projects:{selectors:["[data-app-action-sidebar-project-label]"],hover:!0,row:"[data-app-action-sidebar-project-row]"},accountAvatar:{selectors:["[data-bloom-profile] img","[data-bloom-menu] img"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:[`[data-thread-title]${kl}`,`[data-thread-title-trigger]${kl}`],hover:!1}}}var Il=A({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function Yp(t,e){let o=[`:is(${t}):hover`,`.bloom-recent-item:hover :is(${t})`,`:is(${t})[${$t}]`];return e&&o.push(`${e}:hover`,`${e}:hover :is(${t})`,`${e}:is(${t}):hover`,`${e}[${$t}]`,`${e}[${$t}] :is(${t})`),o.join(",")}function jp(){let t=Kp();return Object.entries(t).filter(([e])=>Il.store[e]).map(([,e])=>{let o=e.selectors.join(",");if(!e.hover)return`:is(${o}){${Ll}}`;let n="row"in e?e.row:void 0;return`:is(${o}){${Ll}}${Yp(o,n)}{filter:none!important}`}).join(`
`)}function Qp(t,e){for(let o of document.elementsFromPoint(t,e))if(o instanceof Element){let n=o.closest(Gp);if(n)return n}return null}function ei(t){for(let e of document.querySelectorAll(`[${$t}]`))e!==t&&e.removeAttribute($t);t&&!t.hasAttribute($t)&&t.setAttribute($t,"")}var Te,Wp=bt(()=>{Te&&ei(Qp(Te.clientX,Te.clientY))});function _r(t){Te=t,Wp()}function zp(t){t.relatedTarget instanceof Node&&document.documentElement.contains(t.relatedTarget)||(Te=void 0,ei(null))}var ti,fn,Bl=g({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:Il,styles:jp,start(){ti=ot(),fn=new AbortController;let t={capture:!0,signal:fn.signal,passive:!0};document.addEventListener("pointerover",_r,t),document.addEventListener("pointermove",_r,t),document.addEventListener("pointerout",_r,t),window.addEventListener("pointerleave",zp,t)},stop(){fn?.abort(),fn=void 0,Te=void 0,ei(null),ti?.(),ti=void 0}});var Mt=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)','[data-turn-key] [data-message-author-role="user"] blockquote:not(.twitter-tweet)','[class~="group/user-message"] blockquote:not(.twitter-tweet)'].join(","),oi=A({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function Vp(){let t=[`${Mt}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${Mt}>*{margin-block:0!important}`];return oi.store.italic||t.push(`${Mt}{font-style:inherit!important}`),oi.store.quotes||(t.push(`${Mt}{quotes:none!important}`),t.push(`${Mt}::before,${Mt}::after,${Mt} p::before,${Mt} p::after{content:none!important}`)),t.join(`
`)}var Pl=g({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:oi,styles:Vp});var Jp=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],Zp=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",Xp='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',Ol=A({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function $p(){let t=`${Ol.store.width}rem`;return`:root,[data-app-action-timeline-scroll],[data-chatgpt-composer],[data-composer-input]{--thread-content-max-width:${t}!important;--composer-adjacent-max-width:${t}!important}`}var Rl=g({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:Ol,styles:$p});var _p=[ha,Ya,$a,es,rs,as,fs,Ss,Bs,Hs,_s,el,ol,sl,fl,vl,xl,Cl,Bl,Pl,Rl],ni=_p;var tf=new q("Bloom"),Hl="2.0.83";function ef(t){t.isComposing||!t.shiftKey||!(t.metaKey||t.ctrlKey)||t.key!=="b"&&t.key!=="B"||(t.preventDefault(),t.stopPropagation(),le())}async function ri(){for(let t of ni)t.updatedAt=zi[t.name];wi(ni),Ai(),co("base",Li),Qi(),document.addEventListener("keydown",ef,!0),ho("Init"),In().then(()=>{pi(),ho("DOMContentLoaded")}),await Bn(),ho("HostReady"),sa(),tf.info(`Bloom++ ${Hl} app host ready`)}var Dl=new q("Boot");if(window===window.top){let t=_t.Bloom;t&&Dl.warn("Replacing another Bloom++ instance",t.VERSION),Object.defineProperty(_t,"Bloom",{value:ii,configurable:!0,writable:!0}),ri().catch(e=>Dl.error("Startup failed",e))}})();
