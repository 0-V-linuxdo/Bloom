// ==UserScript==
// @name         Bloom++ (ChatGPT app)
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.79
// @description  Bloom++ host for the official ChatGPT macOS app. Injected over loopback CDP; not a web userscript.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @match        app://*/*
// @run-at       document-start
// @grant        none
// @license      GPL-3.0-or-later
// ==/UserScript==

/* Bloom++ v2.0.79 ChatGPT app host. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var ql=Object.defineProperty;var xl=(t,e)=>{for(var o in e)ql(t,o,{get:e[o],enumerable:!0})};var x=class{constructor(e){this.tag=e}log(e,o){console[e](`[Bloom++] [${this.tag}]`,...o)}debug(...e){this.log("debug",e)}info(...e){this.log("info",e)}warn(...e){this.log("warn",e)}error(...e){this.log("error",e)}};var mt=(t,e,o)=>Math.min(o,Math.max(e,t)),pt=t=>typeof t=="object"&&t!==null&&!Array.isArray(t),Wr=t=>`${t}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,X=(t,e)=>t.length>e?`${t.slice(0,e-1)}\u2026`:t,A=t=>t.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function zr(t,e){return`${t} ${e}${t===1?"":"s"}`}async function Vr(t){if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}await navigator.clipboard.writeText(t)}function Jr(t){try{return JSON.parse(t)}catch{return}}var Zt=typeof unsafeWindow>"u"?window:unsafeWindow;var Qr={};xl(Qr,{VERSION:()=>Al,init:()=>jr,plugins:()=>it});var wl=new x("Styles"),Ee=new Map,Zr=new Set,Te=new Map,ln=!0;function Xr(){let t=document.adoptedStyleSheets.filter(e=>!Zr.has(e));document.adoptedStyleSheets=[...t,...Ee.values()]}function $r(t){document.readyState==="loading"||t.parentNode===document.head||document.head.append(t)}function Sl(t,e){let o=Te.get(t);o||(o=document.createElement("style"),o.id=`bloom-style-${t}`,Te.set(t,o)),o.textContent!==e&&(o.textContent=e),$r(o)}function io(t,e){if(ln)try{let o=Ee.get(t);o||(o=new Zt.CSSStyleSheet,Ee.set(t,o),Zr.add(o)),o.replaceSync(e),Xr();return}catch(o){wl.warn("Constructed style sheets unavailable, using <style> after parsing",o),ln=!1,Ee.delete(t)}Sl(t,e)}function cn(t){Ee.delete(t)&&ln&&Xr(),Te.get(t)?.remove(),Te.delete(t)}function _r(){for(let t of Te.values())$r(t)}var E=t=>(...e)=>e.map(o=>t+o).join(" "),ao=(...t)=>t.filter(Boolean).join(" "),Xt=t=>t.length?`${t.map(e=>`${e}:not([data-bloom])`).join(",")}{display:none!important}`:"";function f(t){return t}var El=new x("Storage");function ti(t){try{return localStorage.getItem(t)??void 0}catch{return}}function ei(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch(o){El.warn("localStorage write failed",o)}}function oi(t,e){addEventListener("storage",o=>{o.key===t&&e(o.newValue)})}var un="BloomSettings",Tl=100,$t={plugins:{}},so=new Set,dn=new Set,Me;function ni(t){let e=t;for(let o=0;typeof e=="string"&&o<2;o++)e=Jr(e);return!pt(e)||!pt(e.plugins)||!Object.keys(e.plugins).length?null:e}function ri(){let t=ni(ti(un));t&&($t.plugins=t.plugins)}var ii=(t,e)=>`${t}
${e}`;function ai(){Me=void 0,dn.clear(),ei(un,$t)}function Ml(t){let e=ni(t);if(!e)return;let o=[];for(let n of new Set([...Object.keys($t.plugins),...Object.keys(e.plugins)])){let r=$t.plugins[n]??={},i=pt(e.plugins[n])?e.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))dn.has(ii(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of so)i(n,r)}function Cl(){Me&&(clearTimeout(Me),ai())}var Mt=(t,e)=>$t.plugins[t]?.[e];function Ct(t,e,o){let n=$t.plugins[t]??={};o===void 0?delete n[e]:n[e]=o,dn.add(ii(t,e)),clearTimeout(Me),Me=setTimeout(ai,Tl);for(let r of so)r(t,e)}function _t(t){return so.add(t),()=>void so.delete(t)}function mn(t){return t.type==="component"?void 0:t.default}function h(t){let e={def:t,pluginName:"",store:new Proxy({},{get:(o,n)=>Mt(e.pluginName,n)??(t[n]&&mn(t[n])),set:(o,n,r)=>(Ct(e.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(t))t[o].type!=="custom"&&Mt(e.pluginName,o)!==void 0&&Ct(e.pluginName,o)}};return e}var si=t=>{let e=()=>{let o=Mt("Settings",t);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>e().includes(o),list:e,toggle(o){let n=e();Ct("Settings",t,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},lo=si("pinnedPlugins"),co=si("starredPlugins");addEventListener("pagehide",Cl);oi(un,Ml);var uo=new x("PluginManager"),it=new Map,te=new Set,gn=new Set,pn=new Set;function li(t){for(let e of t)e.settings&&(e.settings.pluginName=e.name),it.set(e.name,e)}var ft=t=>!!t.required||(Mt(t.name,"enabled")??!!t.enabledByDefault),hn=t=>te.has(t),fn=t=>`plugin-${t.name}`;function ci(t){if(!t.styles)return;let e=typeof t.styles=="function"?t.styles():t.styles;e?io(fn(t),e):cn(fn(t))}function bn(t){if(!te.has(t.name))try{ci(t),t.start?.(),te.add(t.name)}catch(e){uo.error(`Failed to start ${t.name}`,e)}}function ui(t){if(te.delete(t.name)){cn(fn(t));try{t.stop?.()}catch(e){uo.error(`Failed to stop ${t.name}`,e)}}}var An=t=>t.startAt??"HostReady";function mo(t){gn.add(t);for(let e of it.values())An(e)===t&&ft(e)&&bn(e);uo.info(`${t}: ${[...te].join(", ")}`)}function di(t){ui(t)}function mi(t){ft(t)&&gn.has(An(t))&&bn(t)}function pi(t,e){Ct(t.name,"enabled",e),e?gn.has(An(t))&&bn(t):ui(t);for(let o of pn)o()}function fi(t){return pn.add(t),()=>void pn.delete(t)}_t((t,e)=>{let o=it.get(t);if(!(!o||e==="enabled"||!te.has(t)))try{ci(o),o.onSettingsChange?.(e)}catch(n){uo.error(`Settings change failed for ${t}`,n)}});var gi=`/*
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

[data-bloom-text] {
    font-size: 0 !important;
}

[data-bloom-text] > * {
    display: none !important;
}

[data-bloom-text]::before {
    content: attr(data-bloom-text);
    font-size: var(--bloom-text-size, 1rem);
    white-space: pre-wrap;
}
`;var kl=new x("Dom");function s(t,e={},...o){let n=document.createElement(t);e.class&&(n.className=e.class),e.text!=null&&(n.textContent=e.text),e.title&&(n.title=e.title);for(let[r,i]of Object.entries(e.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(e.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var hi=document.createElement("template");function bi(t){return hi.innerHTML=t.trim(),hi.content.firstElementChild.cloneNode(!0)}var gt=t=>t instanceof HTMLElement&&t.isConnected&&t.getClientRects().length>0&&!t.closest("[inert]"),$=(t,e=document)=>[...e.querySelectorAll(t)].find(gt)??null,Bl=16,Il="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function Ai(t,e){let o=setInterval(t,e),n;try{n=new Worker(URL.createObjectURL(new Blob([Il],{type:"text/javascript"}))),n.addEventListener("message",t),n.postMessage(e)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function yn(t){document.hidden?setTimeout(t,Bl):requestAnimationFrame(t)}function ee(t){let e=!1;return()=>{e||(e=!0,yn(()=>{e=!1;try{t()}catch(o){kl.error("Scheduled task failed",o)}}))}}var po=new Set,fo=[],Ce,Pl=ee(()=>{let t=fo;fo=[];for(let e of po)e(t)});function w(t){return po.add(t),Ce||(Ce=new MutationObserver(e=>{fo.push(...e),Pl()}),Ce.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),t([]),()=>{po.delete(t),!po.size&&(Ce?.disconnect(),Ce=void 0,fo=[])}}var Ol=t=>t instanceof Element&&(t.hasAttribute("data-bloom")||!!t.closest("[data-bloom]")),B=t=>!t.length||t.some(e=>!Ol(e.target));function Lt(t,e){if(e==null){t.removeAttribute("data-bloom-text"),t.style.removeProperty("--bloom-text-size");return}t.getAttribute("data-bloom-text")!==e&&(t.hasAttribute("data-bloom-text")||t.style.setProperty("--bloom-text-size",getComputedStyle(t).fontSize),t.setAttribute("data-bloom-text",e))}var Rl=new x("Events");function oe(){let t=new Map;return{on(e,o){let n=t.get(e);return n||t.set(e,n=new Set),n.add(o),()=>void n.delete(o)},emit(e,o){for(let n of t.get(e)??[])try{n(o)}catch(r){Rl.error(`Listener for ${String(e)} failed`,r)}}}}function yi(t,e){let o=t instanceof Element?[t,...t.querySelectorAll("*")]:[...t.querySelectorAll("*")];for(let n of o){let r=n.shadowRoot;r&&(e(r),yi(r,e))}}function ht(t,e=document){let o=[...e.querySelectorAll(t)];return yi(e,n=>o.push(...n.querySelectorAll(t))),o}var Z=(t,e=document)=>ht(t,e).find(gt)??null;var l={rail:"[data-app-navigation-rail]",sidebarScroll:"[data-app-action-sidebar-scroll]",sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"[data-app-action-sidebar-scroll]",oldRail:"[data-app-navigation-rail]",oldProfile:'button[aria-label="Open profile menu" i]',threadRow:"[data-app-action-sidebar-thread-row]",threadSelected:"[data-app-action-sidebar-thread-row][data-app-action-sidebar-thread-selected='true']",threadTitle:"[data-app-action-sidebar-thread-title]",projectRow:"[data-app-action-sidebar-project-row]",projectLabel:"[data-app-action-sidebar-project-label]",destination:"[data-sidebar-destination]",conversationLink:"[data-app-action-sidebar-thread-row]",timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:"[data-turn-key]",turn:"[data-turn-key]",messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"[data-app-action-timeline-scroll]",turnActions:'.turn-action-controls, [class*="turn-action-controls"]',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery, [class*='recovery']",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composer:"[data-chatgpt-composer], [data-composer-input]",composerInput:'[data-composer-input] [contenteditable="true"].ProseMirror, [contenteditable="true"].ProseMirror',composerConversation:"[data-above-composer-conversation-id]",oldComposerForm:"[data-chatgpt-composer]",sendButton:'button[aria-label="Send" i], button[aria-label="Send prompt" i], button[aria-label="Send message" i]',stopButton:'button[aria-label="Stop" i], button[aria-label^="Stop " i], button[aria-label="\u505C\u6B62" i], button[aria-label^="\u505C\u6B62"]',composerFooter:"[data-chatgpt-composer]",modelTrigger:'button[aria-label="Model selector" i], button[aria-label="Select ChatGPT model" i], [data-chatgpt-composer] button[aria-haspopup="menu"]',modelItem:'[role="menu"] [role="menuitemradio"], [role="menu"] [role="menuitem"]',effortSlider:'[role="menu"] [data-reasoning-slider]',homeHeading:'main h1:not([aria-hidden="true"]), [role="main"] h1:not([aria-hidden="true"]), [data-testid="home-heading"], [data-homepage-takeover] h1, .heading-xl, [class~="heading-xl"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]',headerTitle:"[data-thread-title], [data-thread-title-trigger]",profile:'button[aria-label="Open profile menu" i]'};var vi=/[​-‍﻿]/g,at=()=>Z(l.composerInput),Le=t=>t instanceof HTMLElement&&t.matches(l.composerInput),W=(t=at())=>t?.closest("form")??t?.closest(l.composer)??Z(l.composer);function D(t=at()){if(!t)return"";if(t instanceof HTMLTextAreaElement)return t.value.replace(vi,"").trim();let e=t.cloneNode(!0);for(let n of e.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...e.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:e.textContent??"").replace(vi,"").trim()}var Hl=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function qi(t,e){let o=e?"insertText":"deleteContentBackward";t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:o,data:e||null})),t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:o,data:e||null}))}function bt(t,e=at()){if(!e)return!1;if(e.focus(),e instanceof HTMLTextAreaElement)return Hl?.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.setSelectionRange(t.length,t.length),!0;let o=getSelection();return o?.selectAllChildren(e),typeof document.execCommand=="function"?t?document.execCommand("insertText",!1,t):document.execCommand("delete"):qi(e,t),D(e)!==t.trim()&&qi(e,t),o?.selectAllChildren(e),o?.collapseToEnd(),!0}function xi(t,e){let o=t;for(;o&&o!==e;){if(o instanceof HTMLElement&&o.parentElement===e)return o;o=o.parentNode}return null}function wi(t,e,o){let n=document.createRange();return n.selectNodeContents(t),o?n.setEnd(e.startContainer,e.startOffset):n.setStart(e.endContainer,e.endOffset),n.toString().includes(`
`)?!0:!!n.cloneContents().querySelector("br")}function Si(t){if(t instanceof HTMLTextAreaElement){let{selectionStart:v,selectionEnd:R,value:b}=t;return{first:!b.slice(0,v).includes(`
`),last:!b.slice(R).includes(`
`)}}let e=getSelection();if(!e?.rangeCount||!t.contains(e.anchorNode))return{first:!0,last:!0};let o=e.getRangeAt(0),n=[...t.children].filter(v=>v instanceof HTMLElement),r=xi(o.startContainer,t),i=xi(o.endContainer,t),a=!r||r===n[0],d=!i||i===n[n.length-1],c=o.getBoundingClientRect(),u=(r??t).getBoundingClientRect(),m=Number.parseFloat(getComputedStyle(r??t).lineHeight)||24;return c.height?{first:a&&c.top-u.top<m,last:d&&u.bottom-c.bottom<m}:{first:a&&!wi(r??t,o,!0),last:d&&!wi(i??t,o,!1)}}var Ei=t=>{let e=W();return(e&&Z(t,e))??Z(t)},vn=()=>Ei(l.stopButton),Dl=()=>{let t=Ei(l.sendButton);return t&&!t.matches(l.stopButton)?t:null};function Ti(){let t=Dl();if(t){t.disabled||t.click();return}at()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var Mi=()=>gt(vn());var go=new x("AppProtocol"),wn=oe();function Nl(t){let e=t;if(typeof e=="string")try{e=JSON.parse(e)}catch{return null}if(Array.isArray(e)||!e||typeof e!="object")return null;let o=e,n=o.notification&&typeof o.notification=="object"?o.notification:o;if(typeof n.method!="string")return null;let r=n.params&&typeof n.params=="object"?n.params:void 0;return{method:n.method,params:r}}function ke(t){if(Array.isArray(t)){for(let o of t)ke(o);return}let e=Nl(t);e&&wn.emit("note",e)}var xn=new WeakMap,qn=new WeakMap;function Ul(t,e){let o=xn.get(t);if(o)return o;let n=r=>{ke(r.data),typeof t=="function"?t.call(e,r):t.handleEvent(r)};return xn.set(t,n),n}function Gl(){let t=MessagePort.prototype,e=t.addEventListener,o=t.removeEventListener;t.addEventListener=function(r,i,a){return r!=="message"?e.call(this,r,i,a):e.call(this,r,Ul(i,this),a)},t.removeEventListener=function(r,i,a){return r!=="message"?o.call(this,r,i,a):o.call(this,r,xn.get(i)??i,a)};let n=Object.getOwnPropertyDescriptor(t,"onmessage");n?.set&&Object.defineProperty(t,"onmessage",{configurable:!0,enumerable:n.enumerable,get(){return qn.has(this)?qn.get(this):n.get?.call(this)},set(r){qn.set(this,r),n.set.call(this,function(a){ke(a.data),r?.call(this,a)})}})}function Fl(){let t=window.electronBridge,e=t?.subscribeToWorkerMessages;if(!(!t||typeof e!="function"))try{t.subscribeToWorkerMessages=(o,n)=>e.call(t,o,r=>{ke(r),n(r)})}catch(o){go.warn("electronBridge.subscribeToWorkerMessages is not writable",o)}}function Kl(){addEventListener("message",t=>ke(t.data));try{Gl()}catch(t){go.warn("MessagePort wrap failed",t)}try{Fl()}catch(t){go.warn("electronBridge wrap failed",t)}go.info("Listening for app-server notifications")}Kl();var Yl=new x("AppRoute"),jl=500,bo=new Set,Ao=null,ho;function g(){return(Z(l.threadSelected)??ht(l.threadSelected)[0])?.getAttribute("data-app-action-sidebar-thread-id")??null}var yo=()=>!g(),Li=()=>!1,kt=()=>!1;function Ci(){let t=g();if(t===Ao)return;let{href:e}=location,o={prevHref:e,href:e,prevId:Ao,id:t};Ao=t;for(let n of bo)try{n(o)}catch(r){Yl.error("Route listener failed",r)}}function Ql(){let t=new MutationObserver(Ci);(()=>{document.body&&t.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-app-action-sidebar-thread-selected","data-app-action-sidebar-thread-id"]})})();let o=setInterval(Ci,jl);return()=>{t.disconnect(),clearInterval(o)}}function _(t){return bo.add(t),ho||(Ao=g(),ho=Ql()),()=>{bo.delete(t),!bo.size&&(ho?.(),ho=void 0)}}var Wl=250,zl=400,L=oe(),Bt=!1,ne=null,Ot=!1,It="done",Pt=!1,ki=!1,Y=()=>({generating:Bt,conversationId:g()}),Vl=t=>{if(!t)return!0;let e=g();return e?e===t||e.endsWith(t)||t.endsWith(e.replace(/^local:/,"")):!0};function Jl(t){return t==="interrupted"||t==="aborted"||t==="cancelled"?"stopped":t==="failed"||t==="error"?"error":"done"}function Zl(){return Pt||Mi()}function Xl(t){ne=null,Bt=!1,Pt=!1,L.emit("fall",{conversationId:g(),outcome:t}),Ot=!1,It="done"}function $l(){let t=Zl();t&&!Bt&&(Bt=!0,Ot=!1,It="done",L.emit("rise",{conversationId:g()})),t||!Bt?ne=null:ne==null?ne=Date.now():Date.now()-ne>=zl&&Xl(Ot?"stopped":It)}function Be(){$l(),L.emit("tick",Y())}function _l({prevId:t,id:e}){t!==e&&(Bt&&(Pt=!1,ne=null,Bt=!1,Ot=!1,It="done",L.emit("fall",{conversationId:t,outcome:"left"})),L.emit("context",{prevId:t,id:e,migrated:!t&&!!e}),Be())}function tc(t){if(Vl(t.params?.threadId)){if(t.method==="turn/started"){Pt=!0,Be();return}if(t.method==="turn/interrupt"){Pt=!1,It="stopped",Ot=!0,Be();return}t.method==="turn/completed"&&(Pt=!1,It=Jl(t.params?.turn?.status),It==="stopped"&&(Ot=!0),Be())}}function ec(t){t.target instanceof Element&&t.target.closest(l.stopButton)&&(Ot=!0,Pt=!1)}function Bi(){ki||(ki=!0,wn.on("note",tc),_(_l),document.addEventListener("click",ec,!0),Ai(Be,Wl))}var oc="__reactContainer$",Ii="__reactFiber$";function En(){return document.readyState!=="loading"?Promise.resolve():new Promise(t=>document.addEventListener("DOMContentLoaded",()=>t(),{once:!0}))}var Sn=(t,e)=>Object.keys(t.wrappedJSObject??t).some(o=>o.startsWith(e)),tt=t=>!Sn(document,oc)||Sn(t,Ii);function At(){return document.body?Promise.resolve():new Promise(t=>{let e=new MutationObserver(()=>{document.body&&(e.disconnect(),t())});e.observe(document,{childList:!0,subtree:!0})})}async function Tn(){await At();let t=Date.now()+8e3;for(;!Sn(document.body,Ii)&&Date.now()<t;)await new Promise(e=>setTimeout(e,100))}var Pi={BetterNavigator:1792014624e3,BetterQuotes:179333264e4,ChatListStatus:179333264e4,ChatStateFavicons:1790623094e3,Cleaner:1793267811e3,ComposerOpacity:179333264e4,Continue:1790939902e3,CustomSidebarIdentity:1790658669e3,GreetingCustomizer:1792014624e3,InputHistory:179333264e4,MessageTimestamps:1791080494e3,NoDictation:179333264e4,NoShareLink:1790658669e3,NoSidebarIdentity:1790616549e3,PromptQueue:1793267321e3,RecentTopics:179333264e4,ResponseNotification:1790661368e3,Settings:179333264e4,SidebarIdentityOpacity:1790682605e3,StarChats:179333264e4,StreamerMode:179333264e4,TemporaryChat:1792014624e3,UserQuotes:179333264e4,WiderChat:179333264e4};var y=t=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`,nc="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",rc={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${nc}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:y('<path d="M18 6 6 18M6 6l12 12"/>'),gear:y('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:y('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:y('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:y('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:y('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:y('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:y('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:y('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:y('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:y('<path d="m6 9 6 6 6-6"/>'),play:y('<path d="M7 4v16l13-8z"/>'),plus:y('<path d="M12 5v14M5 12h14"/>'),check:y('<path d="m5 12 5 5 9-10"/>'),alert:y('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:y('<path d="M4 5h16v11H9l-5 4z"/>'),layout:y('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:y('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:y('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:y('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:y('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:y('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:y('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:y('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:y('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:y('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:y('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:y('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:y('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:y('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:y('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:y('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),ghost:y('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},N=t=>bi(rc[t]);var Ht="data-bloom-tip",Mn=6,Cn=8,Rt,Oi=null;function re(t){if(t===Oi)return;if(Oi=t,!t){Rt?.remove();return}Rt??=s("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),Rt.textContent=t.getAttribute(Ht),document.body.append(Rt);let e=t.getBoundingClientRect(),{width:o,height:n}=Rt.getBoundingClientRect(),r=e.bottom+Mn+n<=innerHeight-Cn;Rt.style.left=`${mt(e.left+e.width/2-o/2,Cn,innerWidth-o-Cn)}px`,Rt.style.top=`${r?e.bottom+Mn:e.top-Mn-n}px`}var Ri=t=>t instanceof Element?t.closest(`[${Ht}]`):null;function Hi(){let t=new AbortController,e={passive:!0,signal:t.signal};return document.addEventListener("pointerover",o=>re(Ri(o.target)),e),document.addEventListener("pointerout",o=>o.relatedTarget||re(null),e),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&re(Ri(o.target)),e),document.addEventListener("focusout",()=>re(null),e),document.addEventListener("pointerdown",()=>re(null),e),()=>{t.abort(),re(null)}}function Ln(t,e,o,n=!1){let r=s("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(t),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let a=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(a)),e(a)}),r}function U(t,e,o){return s("button",{class:ao("bloom-button",o&&`bloom-button-${o}`),text:t,attrs:{type:"button","data-bloom":"control"},on:{click:e}})}function z(t,e,o,n){let r=s("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":e,"data-bloom":"control",[Ht]:e},on:{click:o}},N(t));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function vo(t,e,o,n,r,i){let a=s("input",{attrs:{type:"range",min:String(e),max:String(o),step:String(n)}});a.value=String(t);let d=s("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{d.textContent=`${a.value}${r}`,i(Number(a.value))}),s("div",{class:"bloom-slider"},a,d)}function kn(t,e,o){let n=s("select",{class:"bloom-select"},...e.map(r=>s("option",{text:r.label,attrs:{value:r.value}})));return n.value=t,n.addEventListener("change",()=>o(n.value)),n}function Ie(t,e,o="",n="text"){let r=s("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=t,r.addEventListener("change",()=>e(r.value)),r}var ic=new x("SettingsPanel"),p=E("bloom-settings-"),ac=10080*60*1e3,sc=3e3,Di="Toggle features. Some need a reload. Click the sliders icon to configure.",lc=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],cc=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],uc={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},Ui=new Set(["chat","ui","privacy"]),G=null,Nt="all",Bn="all",qo="",In=[],Gi=()=>[...it.values()].filter(t=>!t.hidden),dc=t=>!!t.updatedAt&&Date.now()-t.updatedAt<ac;function mc(t){switch(Nt){case"favorites":return co.has(t.name);case"recent":return dc(t);case"all":return!0;case"other":return!t.tags.some(e=>Ui.has(e));case"chat":case"ui":case"privacy":return t.tags.includes(Nt)}}function pc(t){switch(Bn){case"all":return!0;case"enabled":return ft(t);case"disabled":return!ft(t)}}function fc(t){let e=qo.trim().toLowerCase();return!e||[t.name,t.description,...t.tags].some(o=>o.toLowerCase().includes(e))}function gc(t){let e=lo.list(),o=n=>e.includes(n.name)?e.indexOf(n.name):e.length;return Nt==="recent"?t.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):t.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var Fi=t=>t.settings?.def??{},hc=t=>Object.values(Fi(t)).some(e=>e.type!=="custom");function bc(t,e,o){let n=Mt(t.name,e)??mn(o),r=i=>Ct(t.name,e,i);switch(o.type){case"boolean":return Ln(n,r,o.description??e);case"slider":return vo(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return kn(n,o.options,r);case"string":return Ie(n,r,o.placeholder);case"number":return Ie(String(n),i=>r(Number(i)),"","number");case"component":{let i=s("div",{class:p("component")});return In.push(o.render(i)),i}case"custom":return null}}var Ac=t=>t.replaceAll(/([A-Z])/g," $1").replace(/^./,e=>e.toUpperCase());function Ki(t){if(!G)return;let e=Object.entries(Fi(t)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let d=bc(t,i,a),c=a.type==="boolean",u=a.type!=="component"&&s("div",{class:p("field-label"),text:Ac(i)}),m=a.description&&s("div",{class:p("field-desc"),text:a.description});return s("div",{class:p("field",c?"field-inline":"field-stacked")},(u||m)&&s("div",{class:p("field-text")},u,m),d)}),o,n=U("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},sc);return}clearTimeout(o),t.settings?.reset(),Pe(),Ki(t)},"danger"),r=s("div",{class:p("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&Pe()}},s("div",{class:p("popup"),attrs:{role:"dialog","aria-label":`${t.name} settings`}},s("div",{class:p("popup-header")},s("div",{class:p("card-icon")},N(t.icon)),s("div",{class:p("popup-title")},s("div",{class:p("card-name"),text:t.name}),s("div",{class:p("popup-authors"),text:t.authors.join(", ")})),z("close","Close",Pe)),s("p",{class:p("popup-desc"),text:t.description}),s("div",{class:p("fields")},...e),s("div",{class:p("popup-footer")},n)));G.querySelector(`.${p("modal")}`)?.append(r)}function Pe(){for(let t of In)t();In=[],G?.querySelector(`.${p("popup-backdrop")}`)?.remove()}function Ni(t){let e=ft(t),o=co.has(t.name),n=lo.has(t.name),r=!!t.required;return s("div",{class:[p("card",e?"card-on":"card-off"),r?p("card-required"):""].filter(Boolean).join(" ")},s("div",{class:p("card-top")},s("div",{class:p("card-icon")},N(t.icon)),s("div",{class:p("card-actions")},z("star",o?"Unstar":"Star",()=>{co.toggle(t.name),Dt()},o),r?null:z("pin",n?"Unpin":"Pin to top",()=>{lo.toggle(t.name),Dt()},n),r?s("span",{class:p("required-mark"),attrs:{"aria-label":"Required",[Ht]:"This plugin is required for Bloom++ to work"}},N("alert")):null,hc(t)&&z("gear","Settings",()=>Ki(t)),Ln(e,i=>pi(t,i),r?`${t.name} is required`:`Enable ${t.name}`,r))),s("div",{class:p("card-name"),text:t.name}),s("div",{class:p("card-desc"),text:t.description,title:t.description}),s("div",{class:p("card-footer"),text:t.authors.join(", ")}))}function Yi(){let t=Gi().some(o=>!o.tags.some(n=>Ui.has(n)));G?.querySelector(`.${p("tabs")}`)?.replaceChildren(...lc.filter(o=>o.id!=="other"||t).map(o=>s("button",{class:p("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===Nt)},on:{click:()=>{Nt=o.id,Yi(),Dt()}}})))}function Dt(){if(!G)return;let t=Gi().filter(mc),e=G.querySelector(`.${p("search")} input`);e&&(e.placeholder=`Search ${zr(t.length,"plugin")}...`);let o=gc(t.filter(u=>fc(u)&&pc(u))),n=Nt==="all",r=n?o.filter(u=>!u.required):o,i=n?o.filter(u=>u.required):[],a=[...r.map(Ni),...i.length?[s("div",{class:p("required-break"),attrs:{role:"separator"}}),...i.map(Ni)]:[]],d=qo.trim()?"No plugins match your search.":uc[Nt]??"No plugins available.";G.querySelector(`.${p("grid")}`)?.replaceChildren(...a.length?a:[s("div",{class:p("empty"),text:d})])}function yc(t){t.key==="Escape"&&(t.preventDefault(),t.stopPropagation(),G?.querySelector(`.${p("popup-backdrop")}`)?Pe():ie())}var ji,Pn;function vc(){if(G)return;let t=s("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});t.value=qo,t.addEventListener("input",()=>{qo=t.value,Dt()}),G=s("div",{class:`bloom-root ${p("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:e=>e.target===e.currentTarget&&ie()}},s("div",{class:p("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},s("div",{class:p("header")},s("div",{class:p("logo")},N("bloom")),s("h2",{class:p("title"),text:"Bloom++"}),s("span",{class:p("hint"),attrs:{"aria-label":Di,tabindex:"0",[Ht]:Di}},N("info")),s("span",{class:p("version"),text:"v2.0.79"}),z("close","Close",ie)),s("div",{class:p("tabs"),attrs:{role:"tablist"}}),s("div",{class:p("toolbar")},s("label",{class:p("search")},N("search"),t),kn(Bn,cc,e=>{Bn=e,Dt()})),s("div",{class:p("grid")}))),G.addEventListener("keydown",e=>e.stopPropagation()),Pn=new AbortController,document.addEventListener("keydown",yc,{capture:!0,signal:Pn.signal}),document.body.append(G),Yi(),Dt(),ji=fi(Dt),t.focus(),ic.debug("Opened")}function ie(){Pe(),Pn?.abort(),ji?.(),G?.remove(),G=null}var ae=()=>G?ie():vc();var Qi=new x("AppLandmarks"),qc={Settings:[l.rail],WiderChat:[":root"],StreamerMode:[l.sidebarScroll,l.rail],ComposerOpacity:[l.composer,l.composerInput],ResponseNotification:[l.composerInput],InputHistory:[l.composerInput],Continue:[l.composerInput],ChatListStatus:[l.sidebarScroll],StarChats:[l.turn],BetterNavigator:[l.timelineScroll,l.turn],BetterQuotes:[l.turn],MessageTimestamps:[l.turn],RecentTopics:[l.sidebarScroll]};function Wi(){for(let[t,e]of Object.entries(qc)){let o=it.get(t);if(!o||o.required||!ft(o))continue;if(!e.some(r=>Z(r))){if(!hn(o.name))continue;di(o),Qi.warn(`${t} paused; missing ${e.join(", ")}`);continue}hn(o.name)||(mi(o),Qi.info(`${t} resumed`))}}function zi(){return Wi(),w(()=>Wi())}var jf=new x("Route"),xc=/\/c\/(?!local-)([\w-]+)/;var wc=()=>location.pathname.match(xc)?.[1]??null;var Qf=location.href,Wf=wc();var Sc=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Ec=/\S+@\S+\.\S+/,Tc=3;var Mc=t=>!!t.closest(".sr-only");function Cc(t){return[...t.querySelectorAll("*")].filter(e=>!e.children.length&&!e.closest("[data-bloom]")&&!!A(e.textContent??"")&&!(e instanceof SVGElement))}var Lc=t=>{if(/rounded-full/.test(t.getAttribute("class")??""))return!0;if(!t.clientWidth)return!1;let{borderRadius:e}=getComputedStyle(t);return e.includes("%")||Number.parseFloat(e)>=t.clientWidth/2};function xo(t,e,o){for(let n of t.querySelectorAll(`[${e}]`))n!==o&&n.removeAttribute(e);o&&!o.hasAttribute(e)&&o.setAttribute(e,"")}function kc(t,e){if(A(t.textContent??"").length>Tc)return null;let o=t.closest("button");for(let n=t;n&&n!==e&&n!==o;n=n.parentElement)if(Lc(n))return n;return null}function wo(t,e){t.hasAttribute(`data-bloom-${e}`)||t.setAttribute(`data-bloom-${e}`,"");let o=t.querySelector("img:not([data-bloom] img)"),n=Cc(t),r=o?null:n.map(m=>kc(m,t)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==t&&t.contains(i)?i:o??r)??t.querySelector("[class*=rounded-full]:not([data-bloom] *)");xo(t,`data-bloom-${e}-avatar`,a);let d=n.filter(m=>!a?.contains(m)&&!Mc(m)),c=d.find(m=>Sc.test(A(m.textContent??""))),u=d.find(m=>Ec.test(m.textContent??""));xo(t,`data-bloom-${e}-plan`,c),xo(t,`data-bloom-${e}-email`,u),xo(t,`data-bloom-${e}-name`,d.find(m=>m!==c&&m!==u))}var Vi=()=>ht(l.rail).filter(gt);function Ji(t){return Z(l.profile,t)??[...t.querySelectorAll(l.menuButton)].findLast(gt)??null}function Bc(t,e){return[...t.children].find(n=>n instanceof HTMLElement&&n!==e&&n.contains(e))??e}function Zi(){return Vi().flatMap(t=>{let e=Ji(t);if(!e)return[{kind:"rail",anchor:t,insert:n=>t.append(n)}];let o=Bc(t,e);return[{kind:"rail",anchor:o,insert:n=>(o===e?t:o).append(n)}]})}var On=()=>Vi().map(Ji).filter(t=>t!=null);function Ic(t){let e=t.getAttribute("aria-expanded")==="true"&&t.getAttribute("aria-controls"),o=e?document.getElementById(e):null;return o?.matches('[role="menu"]')?o:null}function So(){return On().map(Ic).find(t=>t!=null)??ht('[role="menu"]').find(t=>!t.closest("[data-bloom]")&&/log ?out|sign out|退出/i.test(t.textContent??""))??null}var Oe=t=>ht(l.threadRow).filter(e=>e.getAttribute("data-app-action-sidebar-thread-id")===t);function Xi(t){let e=Oe(t)[0]??ht(l.threadRow).find(n=>{let r=n.getAttribute("data-app-action-sidebar-thread-id")??"";return r.endsWith(t)||t.endsWith(r.replace(/^local:/,""))});return(e?.getAttribute("data-app-action-sidebar-thread-title")??A(e?.textContent??""))||null}function $i(t){return null}var Rn=0,Eo;function Pc(t){if(!B(t))return;for(let o of On())wo(o,"profile");let e=So();e&&wo(e,"menu")}function et(){Rn++;let t=!0;return At().then(()=>{t&&Rn&&!Eo&&(Eo=w(Pc))}),()=>{t&&(t=!1,!--Rn&&(Eo?.(),Eo=void 0))}}var _i=`/*
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
`;var yt=E("bloom-entry-"),Rc=4,Hn="--bloom-entry-x",Dn=1,se=h({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar. The account menu and the userscript menu always open the panel.",default:!1},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:!0},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:t=>(t.append(U("Reset position",()=>{se.store.entryPosition=Dn})),()=>t.replaceChildren())},entryPosition:{type:"custom",default:Dn}}),Ut=new Map,ta=!1,ea=[];function Hc(t,e,o){let n=t.currentTarget,r=e.clientWidth-n.offsetWidth;if(t.button!==0||r<=0||!e.classList.contains(yt("hover")))return;let i=se.store.entryPosition,a=i,d=!1,c=new AbortController;n.setPointerCapture(t.pointerId),n.addEventListener("pointermove",m=>{!d&&Math.abs(m.clientX-t.clientX)<Rc||(d=!0,o(),a=mt(i+(m.clientX-t.clientX)/r,0,Dn),e.style.setProperty(Hn,String(a)))},{signal:c.signal});let u=()=>{c.abort(),d&&(se.store.entryPosition=a,e.style.removeProperty(Hn))};n.addEventListener("pointerup",u,{signal:c.signal}),n.addEventListener("lostpointercapture",u,{signal:c.signal})}function Dc(t){let e=!1,o=s("button",{class:yt("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),e||ae(),e=!1},pointerdown:r=>{e=!1,t!=="rail"&&Hc(r,n,()=>{e=!0})}}},N("bloom"),t!=="rail"&&s("span",{class:yt("label"),text:"Bloom++"})),n=s("div",{class:`bloom-root ${yt("wrap")} ${yt(t)}`,attrs:{"data-bloom":"entry"}},o);return n}function Nc(t){let e=s("div",{class:`bloom-root ${yt("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),t.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),ae()}}},N("bloom"),s("span",{text:"Bloom++"})),o=t.querySelector('[role="menuitem"]');o?.parentElement?o.before(e):t.prepend(e)}function oa(){let{showSidebarEntry:t,showSidebarEntryOnHover:e}=se.store,o=Zi();for(let[r,i]of Ut)r.isConnected&&o.some(a=>a.anchor===r)||(i.remove(),Ut.delete(r));for(let r of o){let i=Ut.get(r.anchor);if(i?.isConnected||!tt(r.anchor))continue;let a=i??Dc(r.kind);Ut.set(r.anchor,a),r.insert(a)}for(let r of Ut.values())r.classList.toggle(yt("hover"),!1);let n=So();n&&!n.querySelector('[data-bloom="menu-entry"]')&&Nc(n)}var na=f({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:se,styles:()=>`${_i}[data-app-navigation-rail] [data-bloom=entry]{position:absolute;left:50%;bottom:100%;transform:translateX(-50%);width:max-content;margin:0;padding-block:0.25rem;pointer-events:none;z-index:5;display:flex;justify-content:center}[data-app-navigation-rail]>[data-bloom=entry]{bottom:2.75rem}[data-app-navigation-rail] [data-bloom=entry] .bloom-entry-button{pointer-events:auto}.${yt("hover")}{${Hn}:${se.store.entryPosition}}`,start(){ea=[w(oa),Hi(),et()],!ta&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",ae),ta=!0)},stop(){for(let t of ea)t();for(let t of Ut.values())t.remove();Ut.clear(),ie()},onSettingsChange:oa});var vt=oe(),st=t=>null;var Uc=["data-turn","data-message-author-role"],Gc=/:(user|assistant)$/,Nn=`${l.messageUnit}, ${l.oldMessage}`,Un=t=>t==="user"||t==="assistant",sa=()=>!!document.querySelector(l.timelineScroll),la=()=>!!$(l.timelineScroll),ca=()=>g()??document.querySelector(l.composerConversation)?.getAttribute("data-above-composer-conversation-id")??"",Mo=()=>sa()?$(l.timelineScroll):document;function He(){if(sa())return $(l.timelineScroll);let t=document.querySelector(l.turn);for(let e=t?.parentElement;e;e=e.parentElement){let{overflowY:o}=getComputedStyle(e);if((o==="auto"||o==="scroll")&&e.scrollHeight>e.clientHeight)return e}return document.scrollingElement}var le=t=>t.getAttribute("data-chatgpt-search-unit-key")?.match(Gc)?.[1]??null,ua=t=>[...t.querySelectorAll(l.searchUnit)].filter(e=>le(e)&&!e.parentElement?.closest(l.searchUnit)),ra=t=>(t.getAttribute("data-chatgpt-search-message-ids")??t.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function Re(t){let e=ra(t);return e.length?e:[...new Set([...t.querySelectorAll(Nn)].flatMap(ra))]}function ce(t=Mo()){if(!t)return[];let e=ua(t);return e.length?e:[...t.querySelectorAll(Nn)].filter(o=>!o.parentElement?.closest(Nn))}function Fc(t,e){for(let o=t.length-1;o>=0;o--){let n=e.find(r=>r.id===t[o]);if(n)return n.role}return null}function Kc(t){for(let e of Uc){let o=t.getAttribute(e)??t.querySelector(`[${e}]`)?.getAttribute(e);if(Un(o))return o}return t.querySelector(l.markdown)||t.querySelector(l.generatedImage)?"assistant":null}var Yc=t=>!t.parentElement?.closest(l.turn);function qt(){let t=st(g())?.chain??[];return[...Mo()?.querySelectorAll(l.turn)??[]].filter(Yc).flatMap(o=>{let n=ua(o),r=n.length?n.map(i=>({el:i,known:le(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=u=>!n.some(m=>m.contains(u))&&A(u.textContent??""),a=[...o.querySelectorAll(l.assistantMarkdown)].find(u=>i(u)&&!To.test(A(u.textContent??""))),d=[...o.querySelectorAll(l.activityHeader)].findLast(i),c=a??d;c&&r.push({el:c,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?Re(o):ce(o).flatMap(Re),a=n??Kc(o)??Fc(i,t)??(r%2?"assistant":"user"),d=o.closest(l.turn)??o,c=!o.closest(l.searchUnit)&&!!d.querySelector(l.turnBusy),u=a==="assistant"&&(o.matches(l.turnBusy)||!!o.querySelector(l.turnBusy)||c);return{el:o,role:a,messageIds:i,streaming:u}})}var jc="[data-bloom], .sr-only",da=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,To=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,ia=new WeakMap;function ue(t){let o=(t.el.closest(l.turn)??t.el).textContent?.length??0,n=ia.get(t.el);if(n?.length===o)return n.summary;let r=Qc(t);return ia.set(t.el,{length:o,summary:r}),r}function aa(t){let e=new Set,o=[];for(let n of t.querySelectorAll(l.assistantMarkdown)){if(n.closest(l.searchUnit))continue;let r=A(n.textContent??"");!r||To.test(r)||da.test(r)||e.has(r)||(e.add(r),o.push(r))}return o}function Qc(t){let e=t.el.querySelectorAll(l.generatedImage).length;if(t.role==="assistant"&&e)return e>1?`Image \xD7${e}`:"Image";let o=t.el.closest(l.turn);if(t.role==="assistant"&&o&&t.el.matches(l.assistantMarkdown)&&!t.el.closest(l.searchUnit)){let c=aa(o);if(c.length)return c.join(" \xB7 ")}let n=t.el.querySelector(t.role==="assistant"?l.markdown:".whitespace-pre-wrap")??t.el,i=[...n.querySelectorAll(jc)].map(c=>A(c.textContent??"")).filter(Boolean).reduce((c,u)=>c.replace(u,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(A).filter(c=>c&&!da.test(c)&&!To.test(c));if(a.length)return a.join(" ");if(t.role==="assistant"&&o){let c=aa(o);if(c.length)return c.join(" \xB7 ")}let d=i.split(`
`).map(A).filter(c=>To.test(c));return d.length?d.at(-1)??"":t.role==="user"&&t.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function Co(t){return t.text?A(t.text):t.imageCount?t.imageCount>1?`Image \xD7${t.imageCount}`:"Image":t.hasFiles?"File":""}var Gn=t=>t.matches(l.timelineScroll)&&getComputedStyle(t).flexDirection==="column-reverse";var ma=`/*
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
`;var k=E("bloom-nav-"),Bo=80,zc=1200,Vc=2,pa=3e4,Jc=200,Zc=.9,Xc=.28,$c=24,de=8,_c=80,tu=12,eu={user:"\u2753",assistant:"\u{1F916}"},ou=["wheel","touchmove","pointerdown"],Po=h({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),I=null,T=[],V=-1,Ft=-1,me=null,Lo="",Kn=0,fa=[],Ge=null,ko=null,Gt,De,Yn="",Ne=[],Io=null,jn=new Set,nu=t=>Po.store.showAssistant||t.role==="user",ru=t=>t.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||t.messageIds[0]||t.role;function iu(t){return{role:t.role,summary:ue(t),ids:t.messageIds,turn:t,streaming:t.streaming}}function ya(t,e){let o=t.entries.at(-1);if(o?.role==="assistant"&&e.role==="assistant"){t.entries[t.entries.length-1]={...e,ids:[...new Set([...o.ids,...e.ids])]};return}t.entries.push(e)}function au(){let t=[];for(let e of qt()){let o=iu(e),n=ru(e),r=t.at(-1);r?.key===n?ya(r,o):t.push({key:n,entries:[o]})}return t}function su(){let t=[];for(let e of st(g())?.chain??[]){let o={role:e.role,summary:Co(e),ids:[e.id],turn:null,streaming:!1},n=t.at(-1);e.role==="assistant"&&n?ya(n,o):t.push({key:e.id,entries:[o]})}return t}var pe=t=>t.entries.flatMap(e=>e.ids);function Qn(t,e){let o=new Set(pe(t));return pe(e).some(n=>o.has(n))}var Kt=t=>A(t.entries.find(e=>e.role==="user")?.summary??""),Fn=(t,e)=>t.filter(o=>Kt(o)===e).length,Wn=t=>({...t,turn:null,streaming:!1});function lu(t,e){let o=new Set(e.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return t.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return Wn(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?Wn(r):r})}))}function cu(t,e){let o=e.entries.map((n,r)=>{let i=t.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of t.entries.slice(o.length))o.push(Wn(n));return{key:t.key,entries:o}}function va(){let t=He();if(!t)return!1;let e=t.clientHeight-t.scrollHeight;return t.scrollTop-e<=Math.abs(t.scrollTop)}function uu(t,e){let o=lu(t,e);if(!e.length)return o;if(!o.length)return e;let n=e.findIndex(c=>o.some(u=>u.key===c.key));if(n<0)return va()?e.concat(o):o.concat(e);let r=e[n]?.key,i=o.findIndex(c=>c.key===r),a=o.slice(0,i).concat(e.slice(0,n),o.slice(i)),d=a.findIndex(c=>c.key===r);for(let c=n;c<e.length;c++){let u=e[c];if(!u)continue;let m=a.findIndex(v=>v.key===u.key);if(m>=0){let v=a[m];v&&(a[m]=cu(v,u)),d=m}else a.splice(d+1,0,u),d++}return a}function du(t,e){let o=0,n=0,r=0;for(let i=1-t.length;i<e.length;i++){let a=0,d=0;for(let u=0;u<t.length;u++){let m=e[u+i],v=t[u];!m||!v||(Qn(v,m)?(a+=3,d++):Kt(v)&&Kt(v)===Kt(m)&&a++)}let c=va()?i<r:i>r;(a>o||a===o&&d>n||a===o&&d===n&&c)&&(o=a,n=d,r=i)}return{score:o,offset:r}}function mu(t,e){let o=t.entries.map((n,r)=>{let i=e.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of e.entries.slice(o.length))o.push({...n,turn:null});return{key:t.key,entries:o}}function pu(t){return t.map(e=>({key:e.key,entries:e.entries.map(o=>({...o}))}))}function fu(t,e){if(!e.length)return t;if(!t.length)return e;let{score:o,offset:n}=du(t,e),r=pu(t);if(o>0)for(let d=0;d<r.length;d++){let c=e[d+n],u=r[d];if(!c||!u)continue;let m=Kt(u),v=!!m&&m===Kt(c)&&Fn(t,m)===1&&Fn(e,m)===1;(Qn(u,c)||v)&&(r[d]=mu(u,c))}let i=[],a=[];for(let d=0;d<e.length;d++){let c=e[d];if(!c)continue;let u=Kt(c);!u||Fn(r,u)>0||r.some(m=>Qn(m,c))||(o>0&&d<n?i.push(c):a.push(c))}return i.concat(r,a)}var zn=t=>t.entries.some(e=>e.turn?.el.isConnected);function gu(t,e,o){let n=t.findIndex(i=>pe(i).includes(e));if(n>=0)return n+1;let r=t.find(zn);return o&&r&&pe(r).includes(o)?0:t.length}function hu(t){if(Io){let{parent:e,user:o}=Io;for(let n of t.slice(gu(t,e,o))){let r=pe(n);if(!zn(n)&&!(o&&r.includes(o)))for(let i of r)jn.add(i)}}return t.filter(e=>zn(e)||!pe(e).some(o=>jn.has(o)))}function qa(){Ne=[],Io=null,jn.clear()}function bu(){let t=ca();t!==Yn&&(Yn=t,qa());let e=au(),o=su();return!e.length&&!o.length&&!la()?(Ne=[],[]):(Ne=hu(fu(uu(Ne,e),o)),Ne.flatMap(n=>n.entries).filter(nu))}function Au(t){for(let o of t)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!Y().generating||t.some(o=>o.streaming))return;let e=t.at(-1);e&&(e.role==="assistant"||!Po.store.showAssistant?e.streaming=!0:t.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function xa(){let t=bu();return Au(t),t}function wa(t){let e=t.getBoundingClientRect(),o=W()?.getBoundingClientRect().top,n=Math.min(e.bottom,o&&o>e.top?o:e.bottom);return{top:e.top,bottom:n}}function Sa(t){return((t.matches(".whitespace-pre-wrap, .markdown, .prose, [data-markdown-text-style]")?t:t.querySelector(".whitespace-pre-wrap")??t.querySelector(".markdown, .prose, [data-markdown-text-style]"))??t).getBoundingClientRect().top}function ga(t){let e=T[t]?.turn?.el;return e?.isConnected?e:null}function yu(t){if(!T.length)return null;let e=t.scrollHeight-t.clientHeight,o=Gn(t),n=Math.min(t.scrollTop,0),r=o?-n:e-t.scrollTop,i=o?e+n:t.scrollTop,a=e<=de||r<=de,d=e>de&&i<=de,{top:c,bottom:u}=wa(t),m=ga(0),v=m?Sa(m):Number.NaN,R=!!m&&v>=c-de&&v<=c+48,b=ga(T.length-1),H=b?.getBoundingClientRect().bottom??Number.NaN,Tt=!!b&&H<=u+de&&H>=u-_c;return a||Tt?"bottom":d||R?"top":null}function vu(t){let{top:e,bottom:o}=wa(t),n=e+Math.max(o-e,0)*Xc,r=[],i=-1;if(T.forEach((d,c)=>{let u=d.turn?.el;if(!u?.isConnected){r.push(Number.NaN);return}let m=Sa(u);r.push(m),i<0&&(i=c),m<=n&&(i=c)}),i<0)return Math.max(T.findIndex(d=>d.turn),0);let a=r[V];return Number.isFinite(a)?i===V?V:i>V?i:a<=n+$c?V:i:i}function qu(t){let e=yu(t);return e==="bottom"?T.length-1:e==="top"?0:vu(t)}function ha(t){Po.store.jumpEffect==="border"&&(t.classList.add(k("flash")),setTimeout(()=>t.classList.remove(k("flash")),zc))}function Oo(t){let e=T[t],o=He();if(!e||!o)return;if(!e.turn&&!e.ids.length){Ft=t,Ue(),o.scrollTo({top:Gn(o)?0:o.scrollHeight});return}Ft=t,me=t?null:{chat:g(),first:e.ids[0],until:Date.now()+pa},Ue();let n=e.turn?.el;if(n?.isConnected){let u=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:u<o.clientHeight*Vc?"smooth":"auto"}),ha(n);return}let r=T.findIndex(u=>u.turn),i=r>=0&&t<r?-1:1,a=++Kn,d=Date.now()+pa,c=()=>{let u=He();if(a!==Kn||Date.now()>d||!u)return;T=xa();let m=T.find(R=>R.ids.some(b=>e.ids.includes(b)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),ha(m),Ft=T.findIndex(R=>R.turn?.el===m),Ue();return}let v=u.scrollTop;u.scrollBy({top:i*u.clientHeight*Zc,behavior:"instant"}),u.scrollTop===v?setTimeout(c,Jc):requestAnimationFrame(c)};c()}function xu(t,e){return s("button",{class:k("row"),attrs:{type:"button","data-index":String(e),"data-message-id":t.ids[0]??""},on:{click:()=>Oo(e)}},s("span",{text:eu[t.role]}),s("span",{class:"bloom-truncate",text:X(t.summary||"\u2026",Bo)}))}function ba(t){if(!I)return;let e=t.getBoundingClientRect(),o=W()?.getBoundingClientRect().top,r=Math.min(e.bottom,o&&o>e.top?o:e.bottom)-e.top;I.style.right=`${document.documentElement.clientWidth-e.left-t.clientLeft-t.clientWidth+tu}px`,I.style.top=`${e.top}px`,I.style.height=r>1?`${r}px`:""}function wu(){let t=He();if(T=xa(),!T.length||!t){I?.remove(),I=null,Lo="";return}if(Ge!==t){De?.abort(),De=new AbortController,t.addEventListener("scroll",ee(Ue),{passive:!0,signal:De.signal});for(let n of ou)t.addEventListener(n,Ea,{passive:!0,signal:De.signal});Ge=t,Gt?.disconnect(),Gt=new ResizeObserver(()=>{t.isConnected&&ba(t)}),Gt.observe(t),ko=null}let e=W();e&&e!==ko&&Gt&&(Gt.observe(e),ko=e),I??=s("div",{class:`bloom-root ${k("root")}`,attrs:{"data-bloom":"navigator"}},s("div",{class:k("rail")}),s("div",{class:k("toc")},s("div",{class:k("toc-head")}),s("div",{class:k("toc-list")}))),I.isConnected||document.body.append(I),ba(t);let o=JSON.stringify(T.map(n=>[n.role,n.ids]));o!==Lo?(Lo=o,Ft=-1,Eu(),me&&Date.now()<me.until&&me.chat===g()&&T[0]?.ids[0]!==me.first&&Oo(0)):Su(),Ue()}function Ue(){if(!I||!Ge)return;V=Ft>=0?Ft:qu(Ge),I.querySelectorAll(`.${k("tick")}`).forEach((e,o)=>e.classList.toggle(k("tick-current"),o===V)),I.querySelectorAll(`.${k("row")}`).forEach(e=>e.setAttribute("aria-current",String(Number(e.dataset.index)===V)));let t=I.querySelector(`.${k("toc-head")}`);t&&(t.textContent=`${V+1} / ${T.length}`)}function Su(){I?.querySelectorAll(`.${k("tick")}`).forEach((t,e)=>{let o=T[e],n=X(o.summary,Bo);t.title!==n&&(t.title=n),t.classList.toggle(k("tick-streaming"),o.streaming)}),I?.querySelectorAll(`.${k("row")}`).forEach(t=>{let e=t.lastElementChild,o=X(T[Number(t.dataset.index)].summary||"\u2026",Bo);e&&e.textContent!==o&&(e.textContent=o)})}function Eu(){I?.querySelector(`.${k("rail")}`)?.replaceChildren(...T.map((e,o)=>s("button",{class:ao(k("tick"),k(`tick-${e.role}`),e.streaming&&k("tick-streaming"),o===V&&k("tick-current")),title:X(e.summary,Bo),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":e.ids[0]??""},on:{click:()=>Oo(o)}}))),I?.querySelector(`.${k("toc-list")}`)?.replaceChildren(...T.map(xu))}var ot=ee(wu);function Ea(){Ft=-1,me=null,Kn++}var Tu=t=>!!t&&(t.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!t.closest("[contenteditable='true']"));function Aa(t){if(!I||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey||Tu(document.activeElement)||$("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:V-1,ArrowDown:V+1,Home:0,End:T.length-1}[t.key];if(o==null){Ea();return}o<0||o>=T.length||(t.preventDefault(),t.stopPropagation(),Oo(o))}var Ta=f({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:Po,styles:ma,start(){fa=[w(t=>B(t)&&ot()),_(ot),vt.on("conversation",ot),vt.on("generate-start",({parentId:t,userId:e})=>{t&&(Io={parent:t,user:e},ot())}),L.on("rise",ot),L.on("fall",ot)],addEventListener("keydown",Aa,!0),addEventListener("resize",ot,{passive:!0}),ot()},stop(){for(let t of fa)t();De?.abort(),Gt?.disconnect(),Gt=void 0,Ge=null,ko=null,removeEventListener("keydown",Aa,!0),removeEventListener("resize",ot),I?.remove(),I=null,Lo="",qa(),Yn=""},onSettingsChange:ot});var Ma=`/*
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
`;var F=E("bloom-quotes-"),or="BloomBetterQuotes",Cu=40,Ba=8,Lu=1800,Xn=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,Ca=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,Yt=h({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),Vn,Jn,fe,Zn=!1,$n=0,Ro=null,Ho=null,lt=null;function nr(){return g()??"draft"}function No(){try{let t=JSON.parse(sessionStorage.getItem(or)??"[]");return Array.isArray(t)?t.filter(e=>!!e&&typeof e=="object"&&typeof e.id=="string"&&typeof e.text=="string"&&!!e.text):[]}catch{return[]}}function rr(t){try{sessionStorage.setItem(or,JSON.stringify(t.slice(-Cu)))}catch{}}function Fe(t){return No().find(e=>e.id===t)?.text??""}function ku(t,e){let o=No().filter(n=>n.id!==t);o.push({id:t,text:e}),rr(o)}function _n(t=nr()){rr(No().filter(e=>e.id!==t)),Do()}function Bu(t){let e=Fe("draft");if(!e||Fe(t))return;let o=No().filter(n=>n.id!=="draft");o.push({id:t,text:e}),rr(o)}function tr(t){return`${t.getAttribute("aria-label")??""} ${t.getAttribute("title")??""}`}function Iu(t){let e=tr(t);return Ca.test(e)&&!/quote|引用/.test(e)?!1:/quote|引用/.test(e)&&Xn.test(e)?!0:Xn.test(e)&&!Ca.test(e)}function Ia(t){let e=t.cloneNode(!0),o=[...e.querySelectorAll("button, [role='button']")],n=new Set(o.map(r=>r.getAttribute("aria-label")).filter(Boolean));for(let r of o)r.remove();for(let r of e.querySelectorAll("*"))!r.children.length&&n.has(A(r.textContent??""))&&r.remove();return A(e.textContent??"")}function Pu(t){let e=W(),o=t.parentElement,n=0;for(;o&&o!==e&&n<5;){if(n++,o.matches(l.composerInput)||o.querySelector(l.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=Ia(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function Uo(){let t=W();if(!t)return null;for(let e of t.querySelectorAll("button, [role='button']")){if(e.closest("[data-bloom]")||!Iu(e))continue;let o=Pu(e),n=o?Ia(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:e}}return null}function Ou(t){let e=t.closest(l.searchUnit)??t.closest(l.oldMessage);return e&&(le(e)??e.getAttribute("data-message-author-role"))==="user"?e:null}function ir(t){return A(t).slice(0,48)}function Ru(t,e){let o=ir(t);if(o.length<Ba)return null;let n=null;for(let r of ce()){if(e&&(r===e||e.contains(r)||r.contains(e)))continue;let i=A(r.textContent??"");if(!i.includes(o))continue;let a=o.length/Math.max(i.length,1);(!n||a>n.score)&&(n={el:r,score:a})}return n?.el??null}function Hu(t,e){let o=ir(e),n=t;for(let r of t.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&A(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${F("hit")}`)?.classList.remove(F("hit")),n.classList.add(F("hit")),window.clearTimeout($n),$n=window.setTimeout(()=>n.classList.remove(F("hit")),Lu)}function La(t){let e=t.closest(l.timelineScroll)??document.scrollingElement;if(!(e instanceof HTMLElement)&&e!==document.scrollingElement)return;let o=t.getBoundingClientRect();if(o.height<1||!e)return;let n=e.getBoundingClientRect(),r=W()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,a=o.top+o.height/2-(n.top+i)/2;Math.abs(a)<8||e.scrollTo({top:e.scrollTop+a,behavior:"smooth"})}function ar(){if(!lt||!Ro?.isConnected)return;let t=Ro.getBoundingClientRect();t.width<1||(lt.style.top=`${Math.max(8,t.top+8)}px`,lt.style.left=`${Math.max(8,t.right-lt.offsetWidth-8)}px`)}function Du(t,e,o){Ro=t,Ho=e,lt??=s("button",{class:`bloom-root ${F("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),lt.isConnected||document.body.append(lt),Hu(t,o),ar()}function ka(){lt?.remove(),lt=null,Ro=null,Ho=null,document.querySelector(`.${F("hit")}`)?.classList.remove(F("hit"))}function Pa(){return document.querySelector('[data-bloom="quote-chip"]')}function Do(){Pa()?.remove()}function Nu(t){let o=W()?.getBoundingClientRect();!o||o.width<8||(t.style.width=`${Math.max(120,o.width-24)}px`,t.style.left=`${o.left+12}px`,t.style.top=`${Math.max(8,o.top-t.offsetHeight-8)}px`)}function Uu(t){let e=Pa();e||(e=s("div",{class:`bloom-root ${F("chip")}`,attrs:{"data-bloom":"quote-chip"}},s("span",{class:F("text")}),s("button",{class:F("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(e));let o=e.querySelector(`.${F("text")}`),n=A(t);o&&o.textContent!==n&&(o.textContent=n),e.dataset.text=t,Nu(e)}function er(){if(!Zn){Zn=!0;try{let t=nr(),e=Uo();Yt.store.persistAcrossChats&&e&&Fe(t)!==e.text&&ku(t,e.text);let o=Yt.store.persistAcrossChats?Fe(t):"";!o||e&&A(e.text)===A(o)?Do():Uu(o),ar()}finally{Zn=!1}}}function Gu(t){let e=t.closest('[data-bloom="quote-chip"]');if(e instanceof HTMLElement&&!t.closest(`.${F("x")}`)){let i=e.dataset.text??e.querySelector(`.${F("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:e}:null}let o=t.closest("blockquote");if(o instanceof HTMLElement&&!t.closest("a, button")){let i=Ou(o),a=A(o.textContent??"");if(i&&a)return{text:a,skip:i,origin:o}}let n=W();if(!n||!n.contains(t)||Le(t)||t.closest("button, [role='button']"))return null;let r=Uo();return!r||!r.row.contains(t)?null:{text:r.text,skip:null,origin:r.row}}function Fu(t){let{target:e}=t;if(!(e instanceof Element))return;if(e.closest('[data-bloom="quote-back"]')){t.preventDefault(),t.stopPropagation(),Ho?.isConnected&&La(Ho);return}if(e.closest(`.${F("x")}`)){t.preventDefault(),t.stopPropagation(),_n();return}let o=Uo();if(o&&(e===o.dismiss||o.dismiss.contains(e))){_n();return}if(Ku(e)&&Oa(),!Yt.store.jumpToPassage)return;let n=Gu(e);if(!n)return;let r=Ru(n.text,n.skip);r&&(t.preventDefault(),t.stopPropagation(),Du(r,n.origin,n.text),La(r))}function Ku(t){let e=t.closest("button, [role='button']");return!(e instanceof HTMLElement)||e.closest("[data-bloom]")||!W()?.contains(e)?!1:/send|submit|发送|提交/i.test(tr(e))&&!Xn.test(tr(e))}function Yu(t){return!(t instanceof KeyboardEvent)||t.key!=="Enter"||t.shiftKey||t.isComposing?!1:Le(t.target)}function Oa(){if(!Yt.store.persistAcrossChats)return;let t=nr(),e=Fe(t);if(e){if(!Uo()){let o=D(),n=ir(e);n.length>=Ba&&!A(o).includes(n)&&bt(`> ${e}

${o}`.trim())}_n(t)}}function ju(t){Yu(t)&&Oa()}function Qu(t){!t.prevId&&t.id&&Bu(t.id),er()}var Ra=f({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:Yt,styles:Ma,onSettingsChange(t){t==="jumpToPassage"&&!Yt.store.jumpToPassage&&ka(),t==="persistAcrossChats"&&!Yt.store.persistAcrossChats&&(sessionStorage.removeItem(or),Do()),er()},start(){fe=new AbortController,document.addEventListener("pointerdown",Fu,{capture:!0,signal:fe.signal}),document.addEventListener("keydown",ju,{capture:!0,signal:fe.signal}),addEventListener("scroll",ar,{capture:!0,passive:!0,signal:fe.signal}),Jn=_(Qu),Vn=w(t=>B(t)&&er())},stop(){fe?.abort(),fe=void 0,Jn?.(),Jn=void 0,Vn?.(),Vn=void 0,window.clearTimeout($n),ka(),Do()}});var Ha=`/*
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
`;var zu="[data-app-action-sidebar-thread-row]{position:relative}[data-app-action-sidebar-thread-row]>[data-bloom=cls]{position:absolute;inset-inline-end:0.25rem;top:50%;width:0.875rem;height:0.875rem;margin:0;transform:translateY(-50%);pointer-events:none}",Vu=E("bloom-cls"),Ju="bloom-cls",Zu=600*1e3,lr=Wr("tab"),he=new Map,Ye=new Map,ge=null,Da=[],Xu=t=>t==="streaming"||t==="error";function $u(){let t=new Map,e=Date.now();for(let[o,n]of Ye)e-n.at>Zu?Ye.delete(o):t.set(o,n.status);for(let[o,n]of he)t.set(o,n);return t}function _u(t){return s("span",{class:`bloom-root ${Vu("",`-${t}`)}`,attrs:{"data-bloom":"cls","data-status":t,"aria-label":t==="error"?"Error":"Generating"}},t==="error"&&N("alert"))}function Ke(){let t=$u(),e=new Set;for(let[o,n]of t)for(let r of Oe(o)){if(!tt(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){e.add(i);continue}i?.remove();let a=_u(n);e.add(a),r.append(a)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))e.has(o)||o.remove()}function Go(t,e){t&&(e?he.set(t,e):he.delete(t),ge?.postMessage({tab:lr,id:t,status:e}),Ke())}function td({data:t}){!pt(t)||typeof t.id!="string"||typeof t.tab!="string"||t.tab===lr||(Xu(t.status)?Ye.set(t.id,{status:t.status,tab:t.tab,at:Date.now()}):Ye.delete(t.id),Ke())}function sr(){for(let t of he.keys())ge?.postMessage({tab:lr,id:t,status:null})}var Na=f({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:()=>`${Ha}${zu}`,start(){ge=typeof BroadcastChannel=="function"?new BroadcastChannel(Ju):null,ge?.addEventListener("message",td),addEventListener("pagehide",sr),Da=[L.on("rise",({conversationId:t})=>Go(t,"streaming")),L.on("fall",({conversationId:t,outcome:e})=>Go(t,e==="error"?"error":null)),L.on("context",({prevId:t,id:e,migrated:o})=>{o&&Y().generating?Go(e,"streaming"):!o&&he.get(t??"")==="streaming"&&Go(t,null)}),w(t=>B(t)&&Ke())],g()&&Ke()},stop(){for(let t of Da)t();sr(),ge?.close(),ge=null,removeEventListener("pagehide",sr),he.clear(),Ye.clear(),Ke()}});var xt="data-bloom-invite",ed=/^(?:invite team members|invite members|邀请团队成员|邀请成员)$/i,Ua=':is(button, a:not([href^="/c/"])):not(main *, [role="dialog"] *)',od={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${l.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])'],hideInvite:[`[${xt}]`,`div:has(> [${xt}]:only-child)`]},Ga=h({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0},hideInvite:{type:"boolean",description:"Hide Invite team members in the sidebar.",default:!0}}),Fo,cr=!1;function nd(t){if(B(t))for(let e of document.querySelectorAll(`${Ua}, [${xt}]`))!e.matches(Ua)||!ed.test(A(e.textContent??""))?e.removeAttribute(xt):e.hasAttribute(xt)||e.setAttribute(xt,"")}var Fa=f({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads, notices and Invite team members.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:Ga,styles:()=>Xt(Object.entries(od).flatMap(([t,e])=>Ga.store[t]?e:[])),start(){cr=!0,At().then(()=>{cr&&!Fo&&(Fo=w(nd))})},stop(){cr=!1,Fo?.(),Fo=void 0;for(let t of document.querySelectorAll(`[${xt}]`))t.removeAttribute(xt)}});var be=`form:has(:is(${l.composerInput})), ${l.oldComposerForm}`,Ko='[class*="ComposerLayoutBody"]',ur='[class*="ComposerLayoutRoot"]',rd='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',id=`:is(${be}) ${Ko}, :is(${be}):not(:has(${Ko})) ${ur}, :is(${be}):not(:has(${Ko})):not(:has(${ur})) :is(${rd})`,ad='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',sd='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]';var Ka=h({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function ld(){let{opacity:t,blur:e}=Ka.store;if(t>=100)return"";let o="var(--composer-background-color, var(--color-background-composer-surface, var(--color-bg-primary, Canvas)))",n="background-color:transparent!important;background-image:none!important;box-shadow:none!important",r=`background-color:color-mix(in srgb, ${o} ${t}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${e}px)!important;-webkit-backdrop-filter:blur(${e}px)!important`;{let a='[data-composer-layout][data-composer-body], [class*="ComposerLayoutBody"]';return`[data-chatgpt-composer], [data-composer-input], [class*="ComposerLayoutRoot"]{${n};backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:visible!important}${a}{position:relative;z-index:0;${n};backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:visible!important}${a}::before{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:-1;background-color:color-mix(in srgb, ${o} ${t}%, transparent);background-image:none;backdrop-filter:blur(${e}px);-webkit-backdrop-filter:blur(${e}px)}[data-composer-input] [contenteditable="true"].ProseMirror{background-color:transparent!important}`}return`:is(${ad}), :is(${be}){${n}}:is(${sd}){display:none!important}${id}{${r}}:is(${be}):has(${Ko}) ${ur}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${be}) :is(${l.composerInput}){background-color:transparent!important}`}var Ya=f({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:Ka,styles:ld});var cd=1200,ud=8e3,dd=150,md=20,ja=6,pr="continue where you left",pd=/message delivery timed out|please try again/i,Qa=/waiting for the complete answer/i,Wa=h({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:pr,placeholder:pr}}),dr=[],jo=0,je=!1,Qe=0,ye="",Yo="",fr=0,ve=!1,We=!1,Qo=!0,Ae="",gr=0,Wo=!1,fd=()=>Wa.store.prompt.trim()||pr;function za(){return($(l.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function Va(){let t=za();return!t||Qa.test(t)||!pd.test(t)?"":t}function gd(){let t=za();return t&&Qa.test(t)?t:""}function hd(){let t=Mo()?.querySelectorAll(l.turn),e=t?.[t.length-1];return`${e?.getAttribute("data-turn-key")??""}:${e?.textContent?.length??0}`}function Ja(t,e,o){if(o===jo){if(Y().generating||D()!==t||e>=md){ve=!1,Y().generating||(ye="");return}Ti(),setTimeout(()=>Ja(t,e+1,o),dd)}}function bd(t){let e=jo;if(Y().generating||D()&&D()!==t){ve=!1,ye="";return}bt(t),Wo=!0,yn(()=>{e===jo&&Ja(t,0,e)})}function Za(t){return t===ye||Qe>=ja||Y().generating||D()?!1:(ye=t,Qe+=1,ve=!0,bd(fd()),!0)}function Ad(){if(je||ve||We)return;let t=Date.now(),e=Va();if(e){if(Ae="",e!==Yo){Yo=e,fr=t;return}if(t-fr<cd)return;Za(`${g()??""}:${e}`);return}if(Yo="",!gd()){Qo=!0,Ae="";return}if(!Qo||!Y().generating||D())return;let n=`${g()??""}:${hd()}`;if(n!==Ae){Ae=n,gr=t;return}if(t-gr<ud||Qe>=ja)return;let r=vn();r&&(We=!0,r.click())}function mr(){jo+=1,je=!1,Qe=0,ye="",Yo="",fr=0,ve=!1,We=!1,Qo=!0,Ae="",gr=0,Wo=!1}var Xa=f({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:Wa,start(){mr(),dr=[L.on("rise",()=>{je=!1,ye="",ve=!1,Wo&&(Wo=!1,Qo=!1,Ae="")}),L.on("fall",({outcome:t})=>{if(We){We=!1,t==="left"?je=!0:Za(`${g()??""}:stall`);return}(t==="stopped"||t==="left")&&(je=!0),t==="done"&&!Va()&&(Qe=0)}),L.on("context",({migrated:t})=>{t||mr()}),L.on("tick",Ad)]},stop(){for(let t of dr)t();dr=[],mr()}});var ct=E("bloom-csi-"),yd=256,vd=160,zo=1,$a=4,qd=.1,xd=.0015,wd=250;function Sd(t){return new Promise((e,o)=>{let n=new FileReader;n.onload=()=>e(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(t)})}function Ed(t){return new Promise((e,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>e(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=t})}function Td(t,e){let o=Math.max(1/t.naturalWidth,1/t.naturalHeight)*e.zoom,n=1/(2*t.naturalWidth*o),r=1/(2*t.naturalHeight*o);return{zoom:e.zoom,x:mt(e.x,n,1-n),y:mt(e.y,r,1-r)}}function _a(t,e,o){let n=t.width,r=t.getContext("2d");if(!r)return;let i=Math.max(n/e.naturalWidth,n/e.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(e,n/2-o.x*e.naturalWidth*i,n/2-o.y*e.naturalHeight*i,e.naturalWidth*i,e.naturalHeight*i)}function Md(t,e){let o=s("canvas");return o.width=o.height=yd,_a(o,t,e),o.toDataURL("image/png")}function ts(t){let e=null,o={x:P.store.cropX,y:P.store.cropY,zoom:P.store.cropZoom},n,r=s("canvas",{class:ct("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=vd*devicePixelRatio;let i=s("div",{class:`bloom-muted ${ct("status")}`}),a=s("div",{class:ct("zoom")}),d=s("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function c(b,H=!0){e&&(o=Td(e,b),_a(r,e,o),H&&(clearTimeout(n),n=setTimeout(()=>{e&&(P.store.cropX=o.x,P.store.cropY=o.y,P.store.cropZoom=o.zoom,P.store.avatarUrl=Md(e,o))},wd)))}function u(){a.replaceChildren(vo(o.zoom,zo,$a,qd,"\xD7",b=>c({...o,zoom:b})))}async function m(b,H){i.textContent="";try{e=await Ed(b),H&&(P.store.avatarSource=b,o={x:.5,y:.5,zoom:zo}),t.classList.add(ct("has-image")),u(),c(o,H)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let v=b=>{b?.type.startsWith("image/")&&Sd(b).then(H=>m(H,!0))};d.addEventListener("change",()=>v(d.files?.[0])),r.addEventListener("wheel",b=>{e&&(b.preventDefault(),c({...o,zoom:mt(o.zoom*(1-b.deltaY*xd),zo,$a)}),u())},{passive:!1}),r.addEventListener("pointerdown",b=>{if(!e)return;r.setPointerCapture(b.pointerId);let H={...o},Tt=r.getBoundingClientRect(),no=ro=>{if(!e)return;let Q=Math.max(Tt.width/e.naturalWidth,Tt.height/e.naturalHeight)*o.zoom;c({...o,x:H.x-(ro.clientX-b.clientX)/(e.naturalWidth*Q),y:H.y-(ro.clientY-b.clientY)/(e.naturalHeight*Q)})};r.addEventListener("pointermove",no),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",no),{once:!0})});let R=s("div",{class:ct("cropper"),attrs:{tabindex:"0"},on:{paste:b=>v([...b.clipboardData?.files??[]].find(H=>H.type.startsWith("image/"))),dragover:b=>b.preventDefault(),drop:b=>{b.preventDefault(),v(b.dataTransfer?.files[0])}}},s("div",{class:ct("stage")},r),s("div",{class:ct("controls")},Ie("",b=>b.trim()&&void m(b.trim(),!0),"https://\u2026 or data:image/\u2026","url"),s("div",{class:ct("buttons")},U("Choose file",()=>d.click()),U("Reset crop",()=>{c({x:.5,y:.5,zoom:zo}),u()}),U("Clear",()=>{e=null,t.classList.remove(ct("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),P.store.avatarUrl="",P.store.avatarSource=""},"danger")),a,i,d));return t.append(R),P.store.avatarSource&&m(P.store.avatarSource,!1),()=>{clearTimeout(n),t.replaceChildren()}}var es=`/*
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
`;var ze="data-bloom-csi-avatar",hr="data-bloom-csi-sized",is="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",Ld=32,P=h({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:t=>ts(t)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),os=[];function as(t){t.removeAttribute(ze),t.removeAttribute(hr)}function ns(t){return(P.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${t}]`)])}function rs(t=[]){if(!B(t))return;let e=P.store.displayName.trim()||null,o=!!P.store.avatarUrl,n=new Set(e?ns("name"):[]);for(let i of document.querySelectorAll(is))n.has(i)||Lt(i,null);for(let i of n)Lt(i,e);let r=new Set(o?ns("avatar"):[]);for(let i of document.querySelectorAll(`[${ze}]`))r.has(i)||as(i);for(let i of r)i.hasAttribute(ze)||i.setAttribute(ze,""),i.toggleAttribute(hr,!i.closest('[role="menu"]'))}function kd(){let t=P.store.avatarUrl;return t?`:root{--bloom-csi-url:url("${t.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${P.store.avatarSize}px}:is(${l.rail}, ${l.oldRail}) [${hr}]{--bloom-csi-size:${Ld}px}`:""}var ss=f({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:P,styles:()=>`${kd()}
${es}`,start(){os=[et(),w(rs)]},stop(){for(let t of os)t();for(let t of document.querySelectorAll(`[${ze}]`))as(t);for(let t of document.querySelectorAll(is))Lt(t,null)},onSettingsChange(){rs()}});var qe=E("bloom-greeting-"),ls=30,cs=100;function us(t){let e=-1,o=s("textarea",{class:`bloom-input ${qe("input")}`,attrs:{maxlength:String(cs),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=U("Add",i),r=s("div",{class:qe("list")});function i(){let c=o.value.trim().slice(0,cs);if(!c)return;let u=[...S.store.greetings];e>=0?u[e]=c:u.length<ls&&u.push(c),S.store.greetings=u,e=-1,o.value="",a()}function a(){let{greetings:c}=S.store;n.textContent=e>=0?"Save":"Add",n.disabled=e<0&&c.length>=ls,r.replaceChildren(...c.length?c.map((u,m)=>s("div",{class:qe("row",m===e?"row-editing":"row-idle")},s("div",{class:qe("text"),text:u}),z("edit","Edit",()=>{e=m,o.value=u,o.focus(),a()}),z("trash","Delete",()=>{S.store.greetings=c.filter((v,R)=>R!==m),e===m&&(e=-1),a()}))):[s("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",c=>{c.key==="Enter"&&(c.ctrlKey||c.metaKey)&&i()}),t.append(s("div",{class:qe("editor")},r,s("div",{class:qe("form")},o,n))),a();let d=_t((c,u)=>c==="GreetingCustomizer"&&u==="greetings"&&a());return()=>{d(),t.replaceChildren()}}var ds=`/*
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
`;var Zo="data-bloom-greeting",Id=1e3,Pd=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],S=h({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:t=>us(t)},greetings:{type:"custom",default:Pd},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),Vo,ms=[],br,Je=()=>yo()&&!kt(),Od=t=>t.replaceAll(/\s*\n\s*/g," ").trim(),fs=()=>S.store.greetings.filter(t=>typeof t=="string"&&t.trim());function Ze(){let t=fs();if(t.length)if(S.store.order==="random"&&t.length>1){let e=S.store.lastRandom;for(;e===S.store.lastRandom;)e=Math.floor(Math.random()*t.length);S.store.lastRandom=e,S.store.index=e}else S.store.index=(S.store.index+1)%t.length}function Rd(){return Je()?$(l.homeHeading):null}function Jo(){for(let t of document.querySelectorAll(`[${Zo}]`))t.removeAttribute(Zo),Lt(t,null)}function Xo(){for(let t of document.querySelectorAll("[data-bloom-placeholder]"))t.removeAttribute("data-bloom-placeholder")}function ps(t){let e=at(),o=Od(t);if(!e||!o||D(e)){Xo();return}e.getAttribute("data-bloom-placeholder")!==o&&e.setAttribute("data-bloom-placeholder",o)}function Ve(){let t=fs(),e=Li(),o=Je();if(!t.length||!e&&!o){Jo(),Xo();return}if(e){Jo(),ps(t[0]??"");return}let n=Rd();n?((S.store.index<0||S.store.index>=t.length)&&Ze(),n.setAttribute(Zo,""),Lt(n,t[Math.max(0,S.store.index)%t.length]??"")):Jo(),S.store.heroOnlyOutsideProject?Xo():ps(t[Math.max(0,S.store.index)%t.length]??"")}function Ar(){clearInterval(Vo),Vo=void 0,S.store.mode==="interval"&&Je()&&(Vo=setInterval(()=>{Ze(),Ve()},S.store.intervalSec*Id))}function Hd(t){S.store.mode!=="manual"||!(t.target instanceof Element)||!t.target.closest(`[${Zo}]`)||getSelection()?.toString()||(Ze(),Ve())}function Dd(){Je()&&S.store.mode==="refresh"&&Ze(),Ar(),Ve()}var gs=f({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:S,styles:ds,start(){br=new AbortController,document.addEventListener("click",Hd,{signal:br.signal}),Je()&&S.store.mode==="refresh"&&Ze(),Ar(),ms=[w(t=>B(t)&&Ve()),_(Dd)]},stop(){br?.abort();for(let t of ms)t();clearInterval(Vo),Jo(),Xo()},onSettingsChange(t){(t==="mode"||t==="intervalSec")&&Ar(),Ve()}});var Xe=E("bloom-history-"),yr=10,Nd=3e3;function hs(t){let e="",o=0,n=new Set,r=s("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=s("div",{class:Xe("list")}),a=s("div",{class:Xe("pager")}),d,c=U("Clear all",()=>{if(!d){c.textContent="Click again to clear",d=setTimeout(()=>{d=void 0,c.textContent="Clear all"},Nd);return}clearTimeout(d),d=void 0,c.textContent="Clear all",$e([])},"danger");function u(){let v=[...jt.store.entries].toReversed(),R=e.trim().toLowerCase(),b=R?v.filter(Q=>Q.toLowerCase().includes(R)):v,H=Math.max(1,Math.ceil(b.length/yr));o=Math.min(o,H-1);let Tt=b.slice(o*yr,(o+1)*yr).map(Q=>s("div",{class:Xe("row")},s("button",{class:Xe("text",n.has(Q)?"text-open":"text-closed"),text:Q,title:n.has(Q)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(Q)||n.add(Q),u()}}}),z("copy","Copy",()=>void Vr(Q)),z("trash","Delete",()=>$e(jt.store.entries.filter(vl=>vl!==Q)))));i.replaceChildren(...Tt.length?Tt:[s("div",{class:"bloom-muted",text:R?"No matching prompts.":"No saved prompts yet."})]),a.replaceChildren(s("span",{class:"bloom-muted",text:`${b.length} ${R?"matching":"saved"} \xB7 page ${o+1} of ${H}`}),U("Previous",()=>{o--,u()}),U("Next",()=>{o++,u()}),c);let[no,ro]=a.querySelectorAll("button");no.disabled=o===0,ro.disabled=o>=H-1,c.disabled=!v.length}r.addEventListener("input",()=>{e=r.value,o=0,u()}),t.append(s("div",{class:Xe("manager")},r,i,a)),u();let m=_t((v,R)=>v==="InputHistory"&&R==="entries"&&u());return()=>{m(),clearTimeout(d),t.replaceChildren()}}var bs=`/*
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
`;var Gd=E("bloom-history-"),Fd=2e3,jt=h({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:t=>hs(t)},entries:{type:"custom",default:[]}}),j=null,vr={text:"",at:0},Qt=null,qr,$o=()=>jt.store.entries.filter(t=>typeof t=="string");function $e(t){jt.store.entries=t.slice(-jt.store.maxEntries)}function xr(t){let e=t.trim();if(!e)return;let o=Date.now();e===vr.text&&o-vr.at<Fd||(vr={text:e,at:o},$e([...$o().filter(n=>n!==e),e]))}function Kd(t,e){let o=at();if(!o)return;Qt??=s("div",{class:`bloom-root ${Gd("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),Qt.textContent=`${t+1} / ${e}`;let n=(o.closest("form")??o).getBoundingClientRect();Qt.style.left=`${n.left+n.width/2}px`,Qt.style.top=`${n.top}px`,Qt.isConnected||document.body.append(Qt)}function _e(){j=null,Qt?.remove()}function Yd(t){let e=$o();if(!j)return;let o=e[t];j.index=t,j.shown=o,bt(o),Kd(e.length-1-t,e.length)}function jd(t){let e=$o();if(!e.length)return!1;if(!j){if(t===1)return!1;j={index:e.length,draft:D(),shown:""}}let o=j.index+t;return o<0?!0:o>=e.length?(bt(j.draft),_e(),!0):(Yd(o),!0)}function As(t){return Le(t)?t:t instanceof HTMLElement?t.closest(l.composerInput):null}function Qd(){if(at()?.closest("[data-chatgpt-composer], [data-composer-input], form")?.querySelector('[aria-expanded="true"]'))return!0;for(let e of document.querySelectorAll('[role="listbox"], [role="menu"], [data-radix-popper-content-wrapper], [cmdk-root], [cmdk-list]')){if(!(e instanceof HTMLElement)||e.closest("[data-bloom]"))continue;let o=getComputedStyle(e);if(!(o.display==="none"||o.visibility==="hidden"))return!0}return!1}function Wd(t){if(t.isComposing||t.key==="Process"||t.keyCode===229)return;let e=As(t.target);if(!e)return;if(t.key==="Enter"&&!t.shiftKey){xr(D(e)),_e();return}if(t.key==="Escape"&&j){bt(j.draft),_e(),t.preventDefault(),t.stopPropagation();return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.ctrlKey||t.metaKey||t.shiftKey||Qd())return;let o=Si(e),n=t.key==="ArrowUp";!t.altKey&&!(n?o.first:o.last)||!n&&!j||jd(n?-1:1)&&(t.preventDefault(),t.stopPropagation())}function zd(t){j&&As(t.target)&&D()!==j.shown.trim()&&_e()}function Vd(t){t.target instanceof Element&&t.target.closest(l.sendButton)&&xr(D())}var ys=f({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:jt,styles:bs,start(){qr=new AbortController;let{signal:t}=qr;document.addEventListener("keydown",Wd,{capture:!0,signal:t}),document.addEventListener("input",zd,{capture:!0,signal:t}),document.addEventListener("click",Vd,{capture:!0,signal:t}),document.addEventListener("submit",()=>xr(D()),{capture:!0,signal:t})},stop(){qr?.abort(),_e()},onSettingsChange(t){t==="maxEntries"&&$e($o())}});var vs=`/*
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
`;var Zd=1500,Xd=5e3,$d=2e3,Ts=[{label:"UTC",value:"UTC"},{label:"\u7F8E\u56FD\u4E1C\u90E8",value:"America/New_York"},{label:"\u7F8E\u56FD\u4E2D\u90E8",value:"America/Chicago"},{label:"\u7F8E\u56FD\u5C71\u5730",value:"America/Denver"},{label:"\u7F8E\u56FD\u897F\u90E8",value:"America/Los_Angeles"},{label:"\u65E5\u672C",value:"Asia/Tokyo"},{label:"\u53F0\u6E7E",value:"Asia/Taipei"}],xe=h({sourceTimeZone:{type:"select",description:"Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",options:Ts,default:"UTC"},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),tn=new Map,wr=new Set,Ms=0,en,qs=[];function Cs(t,e){tn.get(t)!==e&&(tn.set(t,e),clearTimeout(en),en=setTimeout(Ls,$d))}function Ls(){let t={...xe.store.stamps,...Object.fromEntries(tn)};xe.store.stamps=Object.fromEntries(Object.entries(t).toSorted((e,o)=>o[1]-e[1]).slice(0,Zd))}function _d(t){let e=st(g())?.times;for(let o=t.length-1;o>=0;o--){let n=tn.get(t[o])??e?.get(t[o])??xe.store.stamps[t[o]];if(n)return n}return null}var tm=()=>Y().generating||Date.now()-Ms<Xd;function ks(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function Bs(){let t=xe.store.sourceTimeZone;if(!t||t==="UTC")return"UTC";try{return Intl.DateTimeFormat(void 0,{timeZone:t}),t}catch{return"UTC"}}function Is(t,e){let o={};for(let n of new Intl.DateTimeFormat("en-US",{timeZone:e,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(t)))o[n.type]=n.value;return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour%24,mi:+o.minute,s:+o.second}}function Ps(t){return Date.UTC(t.y,t.m-1,t.d,t.h,t.mi,t.s)}function xs(t,e){let o=t;for(let n=0;n<4;n++){let r=t-Ps(Is(o,e));if(r===0)return o;o+=r}return o}function em(t,e){if(e==="UTC")return t;let o=(t%1e3+1e3)%1e3,n=t-o,r=new Date(n),i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds()),a=xs(i,e),d=3600*1e3,c=Number.POSITIVE_INFINITY;for(let u of[-d,0,d]){let m=a+u;Ps(Is(m,e))===i&&m<c&&(c=m)}return c!==Number.POSITIVE_INFINITY?c+o:xs(i+d,e)+o}function om(t,e){let o=Bs();return e||o==="UTC"?t:em(t,o)}function ws(t,e){return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}function nm(t){let e=ks(),o=Date.now(),n={hour:"2-digit",minute:"2-digit",timeZone:e};if(ws(t,e)===ws(o,e))return new Intl.DateTimeFormat(void 0,n).format(t);let r=a=>new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric"}).format(a),i=r(t)===r(o)?{}:{year:"numeric"};return new Intl.DateTimeFormat(void 0,{...i,month:"short",day:"numeric",...n}).format(t)}function rm(t,e){let o=new Date(e).toLocaleString(void 0,{timeZone:ks()}),n=Bs();if(n==="UTC"||e===t)return o;let r=new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"}).format(t);return`${Ts.find(a=>a.value===n)?.label??n} ${r} \u2192 ${o}`}function Os(t){let e=le(t)??t.getAttribute("data-message-author-role")??t.closest(l.turn)?.getAttribute("data-turn")??t.querySelector(l.authorRole)?.getAttribute("data-message-author-role");if(Un(e))return e;let o=Re(t).at(-1);return st(g())?.chain.find(n=>n.id===o)?.role??null}var Ss='[class*="group/activity-header"]';function im(t){let e=t.parentElement;if(!e)return null;let o=t.closest(l.turn);return o&&e!==o&&!o.contains(e)?null:e}function am(t){let e=t;for(let o=0;o<8&&e;o++){let n=im(e);if(!n)return null;let r=[...n.children],i=r.indexOf(e);for(let a=i-1;a>=0;a--){let d=r[a],c=d.matches(Ss)?d:d.querySelector(Ss);if(c)return c;if(d.matches(l.searchUnit)||d.querySelector(l.searchUnit))return null}if(n===e.closest(l.turn))return null;e=n}return null}function sm(t){let e=t.parentElement;for(let o=0;o<4&&e;o++){if(e.classList.contains("flex-col"))return e;e=e.parentElement}return t.parentElement??t}function Rs(t,e){if(e==="assistant"){let o=am(t);if(o)return sm(o)}return t}function lm(t,e){let o=ce();for(let n=o.length-1;n>=0;n--){let r=o[n];if(!(r!==t&&(Os(r)!=="assistant"||Rs(r,"assistant")!==e)))return r===t}return!0}function Es(t){return t.querySelector(':scope > time[data-bloom="timestamp"]')}function cm(t){let e=Re(t);if(!e.length||!tt(t)||t.querySelector("time:not([data-bloom])"))return;let o=Os(t),n=Rs(t,o);if(n!==t&&!lm(t,n)){Es(t)?.remove();return}let r=_d(e),i=!1;if(!r&&tm()){r=Date.now();let m=e.at(-1);wr.add(m),Cs(m,r),i=!0}else r&&wr.has(e.at(-1))&&(i=!0);let a=n.querySelector('time[data-bloom="timestamp"]')??Es(t);if(!r||xe.store.hideOwnMessages&&o==="user"){a?.remove();return}let d=om(r,i),c=nm(d);if(a?.textContent===c&&a.parentElement===n&&a===n.firstElementChild)return;let u=s("time",{class:`bloom-timestamp bloom-timestamp-${o??"assistant"}`,text:c,title:rm(r,d),attrs:{"data-bloom":"timestamp",datetime:new Date(d).toISOString()}});a&&a.replaceWith(u),(u.parentElement!==n||u!==n.firstElementChild)&&n.prepend(u)}var _o=ee(()=>{for(let t of ce())cm(t)}),Hs=f({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:xe,styles:vs,start(){qs=[w(t=>B(t)&&_o()),vt.on("conversation",_o),vt.on("message-time",({messageId:t,time:e})=>{wr.delete(t),Cs(t,e),_o()}),L.on("fall",()=>{Ms=Date.now()})]},stop(){for(let t of qs)t();en&&(clearTimeout(en),Ls());for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove()},onSettingsChange(t){if(t!=="stamps"){for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove();_o()}}});var um=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])','[data-chatgpt-composer] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-composer-input] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-codex-composer-root] button[aria-label^="Dictat" i], [data-composer-placement] button[aria-label^="Dictat" i], [class*="ComposerLayout"] button[aria-label^="Dictat" i]'],dm=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],Ds=h({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),Ns=f({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:Ds,styles:()=>Xt([...um,...Ds.store.hideDictationSettings?dm:[]])});var Wt="data-bloom-share",mm=/^\/g\/g-p-/,pm=/^(?:share|分享)$/i,fm=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],gm=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${Wt}="project"]`],Sr=h({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),on,Er=!1;function hm(t){if(!B(t))return;let e=mm.test(location.pathname)&&!g();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${Wt}]`))!e||!pm.test(A(o.textContent??""))?o.removeAttribute(Wt):o.hasAttribute(Wt)||o.setAttribute(Wt,"project")}var Us=f({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:Sr,styles:()=>Xt([...Sr.store.hideShareChat?fm:[],...Sr.store.hideShareProject?gm:[]]),start(){Er=!0,At().then(()=>{Er&&!on&&(on=w(hm))})},stop(){Er=!1,on?.(),on=void 0;for(let t of document.querySelectorAll(`[${Wt}]`))t.removeAttribute(Wt)}});var Gs='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',bm='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',Am="[data-bloom-profile-plan]",Fs="visibility:hidden!important;user-select:none!important",Ys=h({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function ym(){let{hideUsername:t,hideEmail:e,enlargePlan:o,alignPlanWithAvatar:n}=Ys.store,r=[];return t&&r.push(n?`:is(${Gs}){display:none!important}`:`:is(${Gs}){${Fs}}`),e&&r.push(`:is(${bm}){${Fs}}`),t&&o&&r.push(`${Am}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var Ks,js=f({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Ys,styles:ym,start(){Ks=et()},stop(){Ks?.()}});var vm=new Set(["chatgpt","new chat","\u65B0\u804A\u5929","codex"]);function qm(){let t=A(document.title.replace(/\s*[|–-]\s*(?:ChatGPT|Codex)$/i,""));return t&&!vm.has(t.toLowerCase())?t:null}function to(t){return t?Xi(t)??(t===g()?qm():null):null}var Qs=`/*
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
`;var ut=E("bloom-recent-"),dt="home",wm=50,Ws=140,Sm=new Set(["Backquote"]),Em=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),q=h({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(t=>({label:t,value:t})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),wt=null,nt=[],rt=0,Tr,zs=[],an=()=>kt()?null:g()??(yo()?dt:null);function Vs(t,e){return Object.fromEntries(Object.entries(t).filter(([o])=>e.has(o)))}function Zs(t){let e=to(t);e&&q.store.titles[t]!==e&&(q.store.titles={...q.store.titles,[t]:e});let o=$i(location.href);o&&t===g()&&q.store.projects[t]!==o&&(q.store.projects={...q.store.projects,[t]:o})}function Js(t){if(!t)return;let e=[t,...q.store.visits.filter(n=>n!==t)].slice(0,wm),o=new Set(e);q.store.visits=e,Object.keys(q.store.previews).some(n=>!o.has(n))&&(q.store.previews=Vs(q.store.previews,o)),Object.keys(q.store.titles).some(n=>!o.has(n))&&(q.store.titles=Vs(q.store.titles,o)),t!==dt&&Zs(t)}function nn(t){if(!t||!q.store.visits.includes(t))return;let e={},o=st(t)?.chain??[];for(let r of o)e[r.role]=X(Co(r),Ws);if(t===g())for(let r of qt()){let i=ue(r);i&&(e[r.role]=X(i,Ws))}let n=q.store.previews[t];!e.user&&!e.assistant||n?.user===e.user&&n?.assistant===e.assistant||(q.store.previews={...q.store.previews,[t]:e})}function Tm(){let t=Number(q.store.maxRecent);return q.store.visits.filter(e=>e!==dt||q.store.includeHome).slice(0,t)}function Mr(t){if(eo(),t===an())return;let e=t===dt?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"], [data-sidebar-destination="builtin:home"]'):Oe(t)[0];e?e.click():location.assign(t===dt?"/":`/c/${t}`)}function Mm(t,e){let o=t===dt?"New chat":q.store.titles[t]??to(t)??"Untitled chat",n=t===dt?null:q.store.projects[t],r=t===dt?null:q.store.previews[t];return s("button",{class:ut("item"),attrs:{type:"button",role:"option","aria-selected":String(e===rt)},on:{click:()=>Mr(t),mousemove:()=>e!==rt&&rn(e)}},s("div",{class:ut("head")},s("span",{class:`${ut("title")} bloom-truncate`,text:o}),n&&s("span",{class:ut("project"),text:n})),r?.user&&s("div",{class:`${ut("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&s("div",{class:`${ut("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function rn(t){rt=(t+nt.length)%nt.length,wt?.querySelectorAll(`.${ut("item")}`).forEach((e,o)=>e.setAttribute("aria-selected",String(o===rt)))}function Cm(){nn(g());let t=an();nt=Tm(),t&&(nt=[t,...nt.filter(e=>e!==t)].slice(0,Number(q.store.maxRecent))),nt.length&&(rt=nt.length>1?1:0,wt=s("div",{class:`bloom-root ${ut("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:e=>e.target===e.currentTarget&&eo()}},s("div",{class:ut("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...nt.map(Mm))),document.body.append(wt))}function eo(){wt?.remove(),wt=null}var Lm=t=>Sm.has(t.code)||Em.has(t.key);function km(t){if(t.ctrlKey&&!t.altKey&&!t.metaKey&&Lm(t)){t.preventDefault(),t.stopPropagation(),wt?rn(rt+(t.shiftKey?-1:1)):Cm();return}if(!wt)return;let o={Escape:eo,Enter:()=>Mr(nt[rt]),ArrowDown:()=>rn(rt+1),ArrowUp:()=>rn(rt-1)}[t.key];o&&(t.preventDefault(),t.stopPropagation(),o())}function Bm(t){wt&&t.key==="Control"&&Mr(nt[rt])}var Xs=f({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:q,styles:Qs,start(){Tr=new AbortController;let{signal:t}=Tr;addEventListener("keydown",km,{capture:!0,signal:t}),addEventListener("keyup",Bm,{capture:!0,signal:t}),addEventListener("blur",eo,{signal:t}),document.addEventListener("visibilitychange",()=>document.hidden&&nn(g()),{signal:t}),zs=[_(({prevId:i})=>{nn(i),Js(an())}),vt.on("conversation",({id:i})=>{q.store.visits.includes(i)&&Zs(i),nn(i)})];let{visits:e,titles:o,previews:n}=q.store,r=e.filter(i=>i!==dt&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(q.store.visits=e.filter(i=>!r.includes(i))),Js(an())},stop(){Tr?.abort();for(let t of zs)t();eo()}});var Cr="data:audio/mpeg;base64,SUQzBAAAAAAAIlRTU0UAAAAOAAADTGF2ZjYxLjcuMTAwAAAAAAAAAAAAAAD/+5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABJbmZvAAAADwAAACgAAELvAAwMEhIYGBgfHyUlJSsrMTExODg+Pj5EREpKSlFRV1dXXV1jY2NqanBwcHZ2fHx8g4OJiYmPj5WVlZycoqKiqKiurq61tbu7u8HBx8fHzs7U1NTa2uDg4Ofn7e3t8/P5+fn//wAAAABMYXZjNjEuMTkAAAAAAAAAAAAAAAAkBXwAAAAAAABC75HV3zMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+5BkAAACVRhUHSTABDSjGMCkpAAV+UdIeawACK0LpksSkAAAEhOaEPa6NHqgJgmK0ewQIGLv//sYTJ34iIgmT1iAIEIWAAAQDGCAY0Qff/1gh3+CHKAgCEuCBzggCGCDv1B+CBwoCAIAh/V+UOQ9zXRtyQAmCYrR6ogQIEc5//wIATFaPYIECBATo9UFAIBgwuCAIChg5BwEHbi4f/8HAwsHwDJSk25HiBkEDmrGDRlRGDE44BKOErcpXEmnGLGAUG05WF48gSBebi1am1KjGgveDHroFZEIH+QlCyxGABCC1VCrlYQwcS/xhYcVnMtqxl77WNr5RzmHzZUqg8/U1m/KljFqTC+2AvdPax+xen21StkMqhq/RpPXb/zWWUNT3/RRXmMps9pZ3O9/63///f////ludLKoDcTe+frn/9WK////f//5///9mm3sjJlqb/oAAADADutHY8i2rvky+59Wnn/WFTxDiS2ttrIhnfxrf7Mnb/W//Qd2f//6FQAGgwIA8wGC8yEK82ysYxBF4xNBYtMMgAYMgIWAAMFABRP/+5JkEQ/EsUDLF3aABDKiOMDtPAAQMQUgD2lnyNOKJE2hNZhgBLlJIHAFEFOSmOwiZInTghEAKPAyAMLQgs8QUegDRAHQegDFRXhKYuQc4Vs6AyopETAMtC5SCl1kjKtSZmiaUjYdQ3xkiBEyasgmatRukZJoomSaa2Z3IaTxs6/SQPKqZNu/2Vrut1oFE1DJXgYfkVJ/DUDvkKlToxygu1h75KqdrK18fst/G52dizb96dnVr6AhuiQkgYmYMlRjQESsq4jt+sq7pEgDDAYAnMBcPoxGW9SoBkAgCzAPAmLppEGcIC9AsAAUWMjCR6ZgX+uMmcxYz0SyC6YUBui82kcFEwYCE74kHeVFVLkakhmmB5ICYhyax52KPWdF51FySSw9AfKi67ZzLKVh+Wk1EhSQTzKoOs3TPtlu6qRdXbL//4vdw6Euzej3qgBhvXWL31LDddiITD0UykDG3Wld90OQxTW6DaFlYKlkTE9ntf+HP7XNp+v9uvp/9nM8Mf/0qgAAWpTMLFIjAHD9M9NeQ+ewYYCiFWDIwWaP2luULS7X//uSZBAEQ7AqyJs+yAA2Yojmc08WDBDPKu6YVoDyj+OJx5Wg4votW6k/BszLpY8MCsAl24JWLAZAmadDzPUgiikv9f27mVvKrzP+f+eFXHv5Y5V5rWX813/3/953v8zn7+UsD4SH7Fg4Bj0+nfrYEXu/i/+j+QkfxWsIABAALAJSkwCNArTQceWqi5hKXoOEIaa+WkYu0/NG+pNU2j/q7rLMHW06PyLvCaKu+S57d00yBVGWbrCCoAmCw2HuVlmHwJIlOqoS9iE0wdAqnhtKmG6duLiSrOa+XU9jP8qHkYWWEADDtNT0aVkocilq5lSCXTht3M+ohle26/tQoEKDlSpiK5LXmoNR9+rT/knf///SSpgIVjoAAA/O35oqA1eRICqJxwqCAuL4Ajqy9tbROzs1Nx423n7XVgXYEt8MWxcJBZ1c//qvSo539TP+uojBJFtONfDgGDAvArNG8XwMC7DABEN0LEApdEwRAAHVRgCDvxeH1Y+nPccMHZvd5vRcZXOapV6llhp9mtaZl5p4fLbDiHK91/2b/v/QkHQNF1ytzP/7kmQqAIM8M8q7zDLkQGKIxXdsGg4orRzvaQfBNZSiye2sach/TduWyiQFZ1p72f9v/p1OH6KwIAADgeC4HgAzj6B1TOB4uuDAIOKENDAy0Jth4DZYsh15xnyjOvVb9hc/arPnYNQMmcJBj6VQiIs7txQ7+tQD1gEBQCRkDACTAxACMJQI87Bh3jESAFDgZzAQAnQfBJAEvAL9UaZSFyUUliBCD4bi0JlMr61G123YjK8nLTofOu6U6FQ8JNUwxLgYHTkI2KJURTY8tae2+F/ruHxhYw0PrEqJJQDUuzq8n/1/2qX/1e33gEgA0B+XYMEUHU2PQajZREaKTDSkMfEEJgiiddKBgDBRKEPzCLyfR2jc1WshyM7TPB6cBsf3DsOoGsW13193/9f8Q+b72X/bt8bl3UwaAAxQNpVzZIYAABmBuEQa75oZ+SRhAJhRdPPBUaf8oqOXhUKjRNQxCoDhyD6uUxAsUMEkExhQ7BKIFFbF8wHObTZGk6KlOgtmbZS1mKVkfrbsyVMuFRuxoUJNgClF3+M/9tFSPd6QgJBm0Bj/+5JkNYjjLCtJU9po8EpCiKFj3AANkKkctemAAVYK4oa88AAzAGm38T4amApEPwIXwaDU4zABeOSJUIEDrq7YrEU/4AoG8tzdHHYu79vCgxYK4jXIelk9Z5lAh0QFDhi1z7RTyVQCfFoGwYKAHBgoA4GCySObCToBhuB6GH8FYYKwBiDac4NBVMJwEgwFgBAcAACAE0GYHa2TADEPMiKF6MYQQk0z6I5YQAJgAtw5wohOGJdLYyRxSFNaVt6JfZJkj6zhiTCK0ldddkK7pJGDFakCsbvQYIYFZgcg3mBaLYauqEJhFg9mEaDWYD4M40DWCQCACDAYrIIZgSgEpFhcAuk9Q9MxLq08IkROyHRGrAsSovgGgl/JNHXBkwZ9DTBXeMt7M7S9RH/3KgABEnU2I3M4QslnQ2IxYBCQAWZIRki0OwYtGJmRuAFQk3Rk5ZxEysYxETRoWcE/kMAjEA4JqLPD8hHgb+HIBYaI6DCwYwFKC5xcAaAAcAG4BgAfghIACsyAHDEnyuXBZAuQcAAyw29YuYCpADmBv08/FjHAeTLj//uSZDuABgFfVn5mYAZeQ8nPzeAAEFVDQv24ABjKCKcrtCACBaMZBxQcsTIof+mLgJxB0GNg1aTtSSf/GYPG4lAiDEXIuT5RFtLQ6xYTXO//FwGpuQQnGLhcNEkC2gZMnZJzEx/////LpV35BIAAAMSEgFAFAHA5AYDAAABCpmriAUWTRBIACILOJ9EB1UOqtJbJMxgZZIeHJZDLiSGVxvLsceQGatzl3/48UPTuuZUlh5u3avf/n09vOWWPxoYveNZm9/4fy38+X70iAAABTgkDNgoMma5hlh7HkhU1WctaVO0ZgT6rlDAG7D5AjU6WSKmpdMWWuYmBEwFEZE1JoixZFygWRJjUomiR+s9MiLFYZ4MTOkklr+pL9aJ5NZDieSSfbX60S6fKJGC5SqyJdJ1zEZUgpdZfSNkkknZnRWYmqLf0kkkkaq/60WWYiAHAIAASQttRwClAL1AQVK1iD3KbK2FAWzjc1ayz1qt/Zop9AY/Ev/3Ld/2dn//7nf/WigACVKC4g0AZgoFxtJBp4GCQYR5gYAiCyYsJIQCd9bKCjP/7kmQQgAQEUEwbuVLyQmW6GmWCXs3A11WsMRaxUZapKYGLRoHCeFBxh8NxqjmYhGIfZ3GLHI9K3FVBUmH5l8PuEBYF1XpE8C35fbzpd297pQFRQcyZqnuYkbaqujD4uPntPWo8MMbmJNBeAiJznaitZm866XOYo6M3a3/RHnGu6tlARAIUwI2wAJukeM07FeWJrnY4utwO9YJBMcY695mbk8GgAgHDP5pSl5mW7+w4URzEcQyef3m6whG7EO+hG///Di24AQByOSVq1tyBD5oM+J6OzIrmzlijmFDVDlg29hl+Xga7Enennmq1rSJqEpUry1HRTlT6iNLZv60dA3NKlwtB8IxKPgiZdgaZtZ7a71HT0B0dfH9fJTz/Mr4rKqvzKs0BboqjxIO9cFaukq4l/SSWggs5GbIQFDnw2FRXvzFiZtQN2ck8u1Mw7Td+mtZ1alDamW6qWzFPTZbpsu/zKVQNZBSk5SzKsK7EwmbV3RVu1Utq8DYYCHKvvuYD/KAhDv/+6v+GqgBqACAJEIDBgRAwmt8NsaOx4Jg6AqGASBP/+5JkDIwDpDVJE9pCcEVDKRFzLyYOwNccL2BtgSWP5SnMoKCXFAwCQOACAzd1hHRAyhQLb4Bw+afiC1VY1DUqLzPdXkMuh5ASBjkszis1hFXBTdbNK7U0C49Md1UtLTfMDaul+ueOqQ0dZk8vvs92yb84kHDSZJIPFCTWKRiGgKCyaL4JBQPqZrWHEoLYcW8JjBGCfRj8gxQjSyOJOFe8gXPt42q21IC5g1wJaC3K95Z7GFuZoI3UZbOtzt9YIlvxreJfsBAwAwHDAsALIQnDlHKRPH8MMBGDGDMA+YB4EAhAfQfMFMC5BYqhiiQDK3ZwveazOCuGfLyQM8UZfScq09lp6wxijLJFdmZxUcaYixeYlcbhUzWp6fWe+aNKesRFI+G079hiCCmANUPW5ckyoQCFGkFn/+V//6kESAAFbd+QzQiLATNzIAb7IkPAaO0VAGpUKGwgUqHtpRLKr4MZIct41ZJccIwYXo2z1jfh57r/1i/mShMb+mf/1C3/7v+////3VUAD4Acl13U3FgFEQTnJB4HBUbGEgTrDKHJWMREp//uSZA6Ag0U1y1O5GnBOAykad0woDQzXIE9sqcE0DOMBnuxAJ0Q7pq4PszEoMo5iWsDofsQ3zndP561rXcPxqYs8cS9zZIAAwQiFT6vZsW8yJewiZ8BVj1n/tfeoCYeDhTHGLERLehWPCav/6jH/QAABABTCFrSAwFmumcYKnCrAmF4EAQyOhwoFesS3QoLZhbfjLnrYLHfhR52WFH9ezzIHX5TfqZe2ip16T8r3+oSbrbwG7/9n//9X2f0/WAsgGAeBKBgTTA1B+Mjc9U2eESzDWBMMBsBWTmASAICgAjBg+cBkWNCDozDBI2ryne5qzzXJHeubuwBem0RIpblungg1SCm7EYnCJsUOJwBIOpLXQg4qGzClLmqUyi7XR2yUNaezo3GnGNAdGZGpivHuebGKIehwiPBwNShCGmeDjUADzC285Tuw0UBbz17y25RK5DBcv7cqPvXTOp+2+YPrK3JUnGJZu9hcqw1fDlNXr1pT/+0AAjABFKwBwBUGgCGAEDSYcpXBo2hemEKAUPWl30BajRWPNDGLnVpuIsy5TWmtSv/7kmQXgJLhNkrT2SlgS6UZB3dIKgvM0SlO5WVJRIyiwY7sCKIZw2xyw1AUrqYQERMMAadR27rq6kV0ZHV009t5RBJlftT3o7HdSnUUqLb29QBAA4AACAGGalkjMQ6z4gFSIzQUWCoQwoldxihrYhTkDm0rkspaVDUvsO7kiJPxMBKDiyriRgbAJCFuNrjHT/+3NwNv+GeJvmblRRgBwIAFkgASjC4JmAQ3HDWcm11oGCgejqzSy9hclhyvBysaLkMugxT0bmqzVUCxMtd9julVGZiBMKYBQ7Ys2OTD3f/SKqTWvKIPVPna4q/ceV4ue3XP8XudVOaSFKirGaRggFx3N17aPq9zMYxOMMCAMZmcCqFAGfi2wJ3hoif1/okVg0tuwwuaWVpNHZfS7rTLdcaTC3Mzi32fqBvHnapZbnS0EtIlTStWzuB539FrFWAIglEQ7LAAmOVAAYFCZ0GNH9ISYwAiWSPAQGki04MSoB2r5HZWF/WfHTDpHfP2Tk/F17NVtU5DVXlLKXOrFO/soczOo7HeyF2TWAwxrm6+nHLt3Gv/+5JkKoGSvijM64wbalEFGPd1hWoKrNFNrSxv8TwUIwnttLDtfWwEEBwASLCF3RIHDNZAzoV2DEsITAYICECyQHIuiQ1gdHBrsTuBQD5P25TUudb57Y1NrrKdDQUjg9ZjAzYXf9DdtMiaWs5ho///////0f/1f6YA75JY3NW9CCUOjUg6IFoScLTwQFTQMYPR2JBqbNn4m6xJdBOOEsnqU6dZUOfMQqTTEJVua9S0/528Pdcksjtm5VSRuvqTxJKnOfXkWP/JNllFEpbVAGlWBgTTAlAWMOMRM1kgjAUKaZeIBiwYyXqrFxXIAs8HDFuKT63qO/LXsprF7BA0WxwYUIdzSswMRPxKhOEDcwNTY6okOnv/6bT3ZlsamioAgWlskB9oZRuPNbzGZxN2CGUv068BUsSlUlL/q/QCOE3FoTaOGtB2XKfJxH3mtQCAQdFYSAEh1H07E4QgHSkZY/FLPwe7kNug1VrzNUry9hVCjNBIAjIcFIkKbuA+Mal0mn6RSFfXoSEF4CDFUov18p3ZMNOYePBzVnjcB5eFGEhqrY0q//uSREKABEo5zUtiZw5+xzljcwhuStzRMa49q4mOnGZpyIsJqZZbOQAV2gALgZGUKjA8TazKnAHBGQAYv7F2SLDq7IAmRAprCJivILYI2NTeXw5H3XmIpMSyvL4bRPTrfBdEFOI9aRa92h17dS/UvU9yMVY3QMPO7VLi0jHGHyJ2JbGKWfqUWfGiv1FKLhQHwXsZOlJXv1wLsHALBzvowcAKCIWfCPMAACIkACZ4AUzPh0Dm6k0cQPIkFF3wQqaDWAPnMc5unIuWFigsLBqLG3jG6wG4mJYab3Iqm0kLRq2bb7pIAAmB3HWel+oyqu1jhipAxNf/+kay+UeJrbACQBBCVcAOE4A6FTby+P6JkFEwaAatjJ5VH2vEgBURiS1o86VJTV53C13lazcta9mLqy25ecJl0dVpi85jnbRpHS6WQMUNtHaZGyLJUtz6X0DB3ChhX//dgokDDOUBQpAICFRaAAKNSAL2+AFNoQAIZ1lycNmaYXgAXxVuaLEnLhtQ0iBOlaBFX8PJBwHAGtCPeo8HG57ceLAZKi5YQom0Pflfe//7kmQgAQKeJ8vrpkOyT+Z5TXHlagqg0S+uME3BHIzotPwwLty6Dq6+dfxh9YlA3msgt9fRPP50AAgKABl7MAUrPVdAEgniHEYcAbJ0/VU5lksgGQITAX7NRbmdtRKd3TFKR99/t5bWKsbuGDlRb1TuY5CW6lAUc/7dDs2ujyiLbnOqk0rbqKsACFIkLfIlKCp6mAGMa5lgBBbIGXskc13nGhkoB1A6Erhi1cu+juWjG1aRwm9WttjBkNRQ1hOprvrtnNy3U+mwI/aZ55pkbmEsrIVuFcyc+V2cd9NcAjkksb1kAAH6N6uiYdIxhAW3aLU7T2QkgibDglmwDSdrJcfoIQX40quwJTt61+XuKSq5iuFp0fYVXj4nUem1hEJPrUqm2AYAMRABLEACYAcBAEmAOCIYzxW5pfBXiQjg0B8qUtNF3kdtR4mBKliOaFfG1IdkadwVuvCkYE6kpPW8Q+ZjGIZbGFkrdXxwd6jZqxDrVh1zLYlNCxIIW13hRaZIAAABQACwIQJmJBF+TLMNgHZYsWwQDBcZPb2vWiQABoNKa7L/+5JkPwCC1ihI089bUEmkCQ11gmoKnHMfLHXhSUGMoondPJhytvQJxigg2K33nlMBRjZdnHdZRtLtYmb6k1aGcx+bb/1f////8iAAQAP4AQTC9CoQ55X/h/jZ5jaIwCAWXI3tPSrdJEIaGukOhUpmVYgI9xcIsbEei6jNh8rq+p2xyVoOE5cagTQn33v7rqbT8YtxXB3lbDAJ4b70+r9AgARgHhwEwKFRo9H53J2higLoBeIbmKCqwB0lgoXKD9GQtjkG9dkaiW9uaXn+pzjXBvQ3PcOKZTSIMa2fmbF6zRciZY82S/Lf+S///////30BgAcYDDTzAEDTCIVD37DTunBjGUQzBIGESi2CzKy/GeEQ17PT8vJUJ4gzA6kvTj6wngGeVnlGCKJINiIqzACra0lIDvKpLhQLTKAbD87e1Vh7///6wFIBDAwBgAjATAJC4yhqqF6mE4CERSzBBYYcYxYFi4wME8OEJJmA7gtxPmOR3G1W8rTOhsOPPd5AV5XPY20FrzleZ/U2j/b0ADEAApGwAiMTAAlAN5mWhaGj0B2T//uSZFkAwqodx7usE1BH4siie08mCoyfIU9kqcE9i6JJz2hACUDQHZbxV6mQcDfKow+FGnWf2e1T2qbXbPM+a5GqryfnfwtVp9R+V50OYFMzJShTs6zKIoZ1LY/SYgcBa/9OkCABEgyAQYYgEJnOMG4WMmYcIDgZRS1jT7mfBPMu4f415PIVuzVWwvP92q1q/9uHcVJW8a2ohG7ywDbQ9Vysijz6hCWlyZV5L7P//////9YMwCkAACEkwNBIwmFU+WcQ67pcxVDowEAdEdIlfBftWsZAQWD6q/RErOoE+zNr6LE3nOlCeCGZmeyS3T5VfElgFFysze4uuZWRH2Y79kcWD7BIqCyjAIFSUNjFWJzYD8jBYXSECC3icCDoKEx1UvyIzIeHBKBR5JUKUne7NZQyIxhuBdaB2EdaVjtUrwoWFgNc+xzPi9X9myz3f2gGNAACECBwEwuMh+nd56jdBiSHoIAggBFORgiazJx0BBYQrr9dFwZW6Oxw4Hff7q7mQlvvEmYzhSY2EIa5o6EFDmXJjAibpAAFXO47IfxVgrbAAv/7kmR3gAKFKMe7rytQSwLoknUvaApAoRxuvG1JHIrjadykmADABpuNs9UgJAOZbE8euMKYvAgY4ogEa8uZiM2skrqkyWhRtVxMYN7mbK2DaVT/ggOik1AwxndWV19fX/17vYj///2evjYBAFIAj8WwBINpn4HNG0cDiYZQAxgTgAgYCRRFgKEDXxAYTxxiItYVy/8LhuQS+3Wprk7VmYEdi7cprV2Q1ZYXnZrnOxYPocyTzWdaO+YzapZW3mlg82sgCF1YgP7/7spa0tEyaKjp5XDhMul+1QtKVd0SEH1owaADOdpwRKKZw6q4My8j2XI0bLm/pbu1t6f/q2//oDgBbdodEAnHCOfn0+FmLYaGAQBgUCF4KmDgHlJCARQN8Gv45Y0Au+cz5ictPtRMK0qCTp6SWWytJeQVDmSIuxcZD/mx9+qpFlXU/65BFAAQACCko1EBUAwYERoEcpghSRUDkLAh0OvBlKVERLBcPgxSbutTOYHWMbvMP9KMvOoc7OLGgJCI00DUx9XXuyf/+rVv9wy3/Z20f/RVAAgAAVkADBT/+5JknAECuChGM9k6cD3BqU1yaVAJxJ8YzrxtQTELIundMKBwKDmaQ4Idm1EYihOLEAZNK1ihMfKiqgR9Q2ytIdjCsMNbV8JCGe63XxlpuLiHXZTssct5YmNhY4ff71eJ9Me2wXg9bUk31G6BnGbZpr436evxiOkBhBQLQAAN0SURieH5xQaYGFwiOggfqH1euIm2TkjE5WYAWoioifQz9yT9irDCVWSHWyooWD4a5PKrHjek9JwCBCFoByoiYZju0AahIDkYlrrIYjodG90enmQMhxQlAFo8qVrRSQkKOw8CUrgOxFcZTlnz6+f/3fuwH0d8u/w6RLM1r4svlrVTCvHFGsSINUpHLHga////9n/I//9AQARAAAUrQKAAAC0wCW48RRUxXA4iaKgRIf8MGwUlKUwcIvVaia245ap8xPmtaMa7VpcWWSWMhx/C+cGetrfWPmvtBHpQ1QxAah0X//////////1KAG1AHw8GAFIAMMCRfPu8gO9ZTMPwwBABoyJ95oIYMEQKDwdKOj2tKJy8fFSJddr+lx1cBiXIvbLJ//uSZMMAAuAoxtO5eUBJo+j6dwwoSmB3IU6x7YFPDuLd3DygCHkdI2Kigk2M2tQ3+ETGZ0j/+1kGZ////+z9nrYAqgcMgaSi4ZPVyYr5IFxBJGgqKWgVynZYJVxNmAzlOlCme6hkiq/OX+qQ08wva0hx3qGQA0WZY3EZ8wSD2inVR9P3d6t3//+/6KaQKgGJyNuyBQBMKAeP8IJOV5mMUQnMDAORqUi1BGJ0EOQ0BU41LZ9MaYfR4mY0R3nf0sCVgavSsq8uUJxNFIB9NJG2qIVD1a7Pdbvu/1erXExv+3/6P9LhYCEUVmL8GBoWmc7PH1zMmOQECZzcFv2+FqwcMtK6VIBFOFja1a2uWkqzMFzAFzBa9V5+hSFAv91l4hygw20MAvR1adun9X9yUf1+n/6f/7YEBvgoCYwJgFzCHBIOFsXE4/AwQ4okHBjAYCyWl5TKQb8RzETd5kbws9pIkyFvZXl9rCpepHfiRugwI/tDcoY2pWHDv/TxmccBASKr3LNDLDMRD69oOvX3+QdEVFWuz0o5Vc27K6G/Y+a7kG+fSP/7kmTbgMKsKEbLrBtQTAMIcXcvJgsAgRruvE1BPQuiCdwwmO6iCYRgwAZrQFZ9+npjmBgR2TKbqmBy4MHZj4Z2MwJ1tbVPqzp7WmLwV+EG4yXgzV749kdCzLqCEdTb7qd733p8Vmmp/1F67PryOaV9CvUn932ACBlWjGLNmIwTAszW6QuM+E28wgQWDdUtepugCLOo1BQyQcDQG0KLNyi9PBV2nn6OmpKlhpCeqGVPO02VqUNZSAh6BNTVPbpb/467jasNJHOSxSYs6vv+7R1p//L/+53SPX2bGp6jNYEAgBMBQUNyTZMH4+GAlZgOAizel1oSKXGq34DA4RI8t8ajah5ww3Vw33lqQa2TI3nl5wwslFVopdo7dSNX7v2fqLf/60f6qkx9GyoBKaBsA5iYCYehqFsBmhKf4YNIMpkgIOsLRMGrOAQaWvD0gb63N5z7rym3fxtdymIzBqAGzen9RJ/XcJcL9llixLqcLPPFjhhCruzfa1Kt+Y/30O/3GcU463uORPX7fpckCmqZCyAlBM1iJQ58Psw2AIuGo8wGXJf/+5Jk9gDDbR/Dq9kacFLC+HF3DyYMxG8SzPsAQTMLIcXcPJgSIdAtOGjCEEzEp+0zvuSEtxLrT0+ospGU+CRE6Y2CrF2++h3uo/lGUhRH03eLx2vt3opL6apm3rHRQgoGCaMGaU0wB3vCWmL8Ake9iaRcRFgKDMwOXmMOhCGdtJGhRUoHvVNALtw67k9ffrCdXUyMEAICl9ijdtEZZYjSkwyCYds0dTLO9lUz7TAqeKODBwFQsYUKhMq5qRatSmRC86uOXpvDuEm8i776xX51hT7dOoIGq6SNgZKg0LFc5VLsDDUW9LhqWTbX5YSNVBNPoTTPnjWx539Nny+c7/0sreAYbAmwNpVLpvv6s0tC6LCBUS/2PKopKJlpOHEkeRvv4kuQMqqdTEFNRTMuMTAwVVVVVVVVJNBQsuYJAexkSNemvmmyYZINR3ZmSYpuhOOhUdBmhaZnDjtWdmmeuWSyWQzGNv7lVyU4a6FCvZKr1u2xBsa6FYX+lt2nnChUFyL1RVLpFKGtFzDBYdngApP5ZHmPf33MfANTH4HWKsZ9QlaY//uSZPsMQwYXxBM+wBBPwqiSdM9mDvhvCA17QEFKiqJZ3DCYejhDuBFkV8qHkoBmXxAGGkPDAQqyEoU+82vTpYypZSn5eNLwaoZpuMdl+Hscu7uZocgOPwVSB2i7zfS0qHIX6dOtOgg4kk1iB1y2k9feAlaf+9+5typj1MUkEQEV8y5vDAkSz4/Pj125jFUMwxhnWj60xLt+EXkx2WsymFXFYm1OPoMlMxdSTn+PU47gVbFauxynjH1SGJzm0CpI2Mev9qfXT26rS7QG+4wHWH2ZTchjlVjXmRSn3N9iZsAERm7jqzWTGMVHE8soQ4YLfYBDcfTYiiictvNAKG/Rn+zB3MXdpnrYQoeXJBohdy2u1bKuQ7//0VtdZo//3e//UkxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqi2xtRmA0FkdVTUZ3vAhmLIAyTqzDDQoYBwOB6UdbNq30URXVsT3it1pNmUP5MbnZ2PsnZwGBbrXn1xgxxlOhgm1iLYUlN9qlqbufyroFEwXtKJtUXAdriSJhCFJdP/7kmT1AAN+F8KL2cEAVgKoYncMJgwwXRLO4eTBBYri5cGxmOphx12xySy0o+PknoOoKpegyXSK1pVkKntYwSrJEAiKWqAgbmibMHyaNmMoIE0TGRHhW5YOkLFVNZS9ZSI04w1a279PPvDuYsUuI13jt0KY2W+H1Z0PKGPe9707FoP5SlCyyv91jdlv9Wuz9nX/06VmgAg2VWhWkkk8LIAKB5yKfRqOjZgOBCqoqATrPnEX/Q8ZBGX1VhX71V7tlfbruCyiQGo7nxqtKAwguObpsHlBgXuke79f/5Lq6P9rp7++7/6aAIFVT//3ghtbBs02YhoJSqoIc6GxGtJ+0mhyAV6jMu9RBAV5eYYKMH13o09je6y76+/9+jf//3fot0UWTIHI1zCcBhOkoJU2V1QjEBB3MEgE4iAzOEUVFUEWir5CQhgkIoATLwjMFPA88Bxifor/c5KQqAY5C/ktvyqMrAHlrWJbOXJ3lDh3HW9VN0+OH9+mxhEDivExdiQVQSAxFL0rmlgBzVGlqvoYVLjzK0WzZbRHmkj2ixcXMOB++eX/+5Jk7YAD0RxBgz7QEFQjCFF3DyYKIGEfrr0tIOmKoyWxlYiPQSYTBVyUAAaqG3dx6BEVzL5iO1I0MHC/21fefcyyQAmBoFqx+BqMADR5xOokEJ7eVNYyIIRCqQrS7/xjf7NH/pWrYdR19/6Uf9Vl/WExKmsBw2YLoWxq0ndmyoCUYawBJ+mBGKji+VhmTihSmMtbZudaagmN17dmP2dzd6Jym2oE/czfp5+ISxdsO5SW/U3qnsDzwTcUPlB0We259TvZmCan+QJkFzmw3WVM2e1tBwj0K2uamxbhtFeuxFmoSjAoGTLoijtM9zEsBiICUji+0vJWqAJky3DbtDLRbMO3b/4l+NLxMaX3JJGUwhUr3+9SdEDPD7Sy8X/t/u/Z6U6qvZ93/p8t6jMJzS7DBOGxNjCTw0gVuTCvCqNLtkpwihwSji/xA4mCt+PI7IQvRBDau098BUMzJZJqWPqvlc8xLoVFITGFFHTfaLRqNTf279VodNhoiWYI5WgMn1FR7FiSOF72k6FitYlWD6WCzjtSl28oDD2ZkDgKkm58YlKl//uSZP+MhEEgQYs+wCBGQpi5cGl0DaxlDEx7IEExDmGF14k4PQwIlrTc0VEigAgrVTxJokIQM/scyXRBGEVgK0cgCRZLZr7hAM65XcXpW5Vha4rtRiGA0V1xd7r9+/X0iYtTX6Sm1us8phkiilQlvT5pFl7bEPr3eKdJDiIIwbzAaDmMcNlU0fzaDCLBXDgJCqAKhikzB6hKOiPDLnRia91pgRRcpU4+5pyXk5KBoZvQ+dPNIZiuffiWOhQaJQpr1NtlGpvNetpFtDmcpoeR1vqFj3dJLA6RZCnLTl5uQ2G1uf9b+skBomdZOHnB1mJgCA4D3labQssh9HV9qYPBsTpTaazIM1Prokg3mTpy6JZvnmecqWrU9ydYr02SG+lfRZX9/aYq/6Ltul6dW0yqi56sYLYgZlBvUHHoCwBiMDqsTJBC/xaVUypgAGXlK2b4L5lrMIBgOGH5pZyp21NWE9GCuv2bmJfKWQAoPFXmt2sqTSeLDdX+5jLl7OtFatrX3tiyr9Fi9ODe17HJ9SMWccZo6+teH6NMeNbc9nS/NXt/3v/7kmT6jIQCGUEDXsgQTWKohnDIYg0gYQos+YGBKgrhQb6kYN/6dvyd8KVxey4EiIJ/d8MyRroGGxyU/hgiLwsrgCLTNI8MawEqNie/BQA0iKMhInPO9v06P1s+7X16f9F7vbv8WehVTL3uBdB0YKgQRrsLKmgmkiYVYKxyQmyQhPVjQhb8cOUAV9LG5JyPAy14nevS/CQxPC/L4Ahpbr2R6fp56EOCr13pPHqu5y12rmYJZ+f/WYtMo+eNKgZTwP/xP+irfkNZO3bX9up+fd72sg461udhumuhft3f/sjuWvnp4toXoFxspJKtAayBgfNB2kG3YfftV7pY8dHiEAgIgxFs3zqya07O0YNgNJIz27+d7+jq6Vf/d/1J/3L9aUf9umoOyEAR1DAtARNqs5I0VzwjBvBJMA4BIwBwEwgBFImHWqJPFwLKul+l0W5NMiu67jPsxHjy55NbRDgYY0OfhzRkth9WQhf8c/0LK9er5VX8rJJ2tmTvTB/ck9fNrPbt6meeZa/M6X7W/qx8Mvh/szsVyyI3mdk8iJyuUyf8obb/+5Bk+I9D5xhBAx7QEj0iGLlwI2YPcGMECHsgSPMK4p2xMZj/g+yrr0Asqt2EKjMPDc/sow4sJsqUYIJwlE0nS8jW01t0vHvmmG098qDotoLWnZmvcHcTs8mheLfVxXts1XLR/tU25+KV1b0UaDYEFxEzTAmAAOBA0s2uhDwwWk4UEGTLASvT6b0tQjIySAVhhI9HphFKlUu8RYjDWh6m+Ima6hWI78ehvBWEsxHezRK7z/8zkd253LarCLl+1g3Lf6tl15V4r/+t5NZ1FuWGT7+8T5HDaWCPft37dfqY9SEjtQ1P9ufIuda/GVNWLAQBmH5UcXneYdgYogqYgGIIjkKQHE1SvDdJelMdr/b/Oxbv/204FmrG2O0t766LNlMlQdveTfKI16mjvtTbpTu++znkFGxAtf3GakwA8zVUyiAzAPAkNFMQo5FYkwjBYnhAh/ulAj1AIKi19dm9HQwzKt+H88ePD6bN8Itlh3o2LC+PM8VLJSa0UQrFnvAy1HIWADxhRjHFzixS5qTZo0UrF9trYYIpawWqWk814/F7xoj/+5Jk/YzEHWbBi88bwkVCuHJxiDYPpG8EL2XlCTUK4QHOsEigACDplQUvm+HnCyGyRMccCQrMzatKMCg0B4CTl5UIz3ilGO4E7YYxlAynLaj/EXOG1n7UkMQy3hJQaNXxe7u921Uz0o2ye17H2dtKP96Pu2NR/15sKIVslT6MGAVPmCsNgWEMLQJBgBTyQC6rdEyhK2NCCKkxb1aVQ57wwnAkyH6xJO2NrxSrE+tyAGFhYoqMLUCEegePABhYgFBi0ihckPQAZCOm8kXG1Bg+meqaPYOYtUvS8ahEja4Yl2ZYdSLIR5VcYw18lNhz4ViwoCQxJaLHqD4vlF2rVHD39GCAfVJwtA9Z1HNWA6+1xnSL2/2dbWWq/dzPR/29f/YuIghAMMAgCcwYQ5jYLTNAWTphqAEjwP4kCCqkrlsCzQqgKGQDyheCqLsuhOOZMxiP4w/Vp5I/hfcOY+ssjeecORcAjUIuzted5btXd0+t8KLb6FWM6UCk9PL1l7o7TQlYwYZatNLqq6OxphLTFQyoJIbRbOakiwjSnIVSfHkbI1lu//uSZPIBw5MYQzPdeIBIYrhAcekmDYhdDM6Z7IDvCqIJxaCISVdekTndDiZZQFpsNxri7GUVAY67Yq5Swhk4onCVaEBZlrdIvZnc6F9qZQIWsrM2zbS2Btjmw5zjAJMML91EW1xd1X01RG9IXscUr7HoX1X28t7rn0JfdoZY9ymLL0ALCuDAghzjLyDc11zDEKjAIE0DZKxNqLLwrGLwkk1IVWBPXUPaR1tKEO4MQG4/RrjWwGXW/x0GBGxpMeqKipU6Pv6TxpIDLGQUHBsoc7TCQiWJLYtKgIkJkhhBj6lt6yEzwvGANr1AQeOA73NvhZqdS10jgyI5+kLxkiQIoHMHQ1cKRSvNx8fjwLBs11d0oNschL9D8qlITUmKtIezPbx4vff4kIrVTaiVf67zWdQ8ov2MemsRhQQllMAQOQweU5zKvJiMDUC8mgJHSETBhDchgYWC61qyyymsx6vTwin19aVWqdmQsCVT89VqQ5GFTxC5W7l9ulk9HuNq6V/76a9Bqr+Dan/eou1lelJLr7WgY+wVYg673ft8dFqdyJ5m5f/7kmT/jMSoY0AL2BrySQKYYXBrZg3gXQgsdYEBHAqhybSgmN22hWmvq2svZl/Pkf2NFWAEUZYbUTbrYvUa4OhK6ogBZDn1CoT7Ipkmf/OsDCnVyjtnr33/edK7+x/5nV6nIQ3f+pNnWv/u+oWA5MAoBYwTQvzONXkNSYQMOFdMBkAkdAUWcuYhqdBSqUYyGhJgvT/U+32HSPbJ4zjITcEaCLbnsli/HYd4NUf0jUxCAjKOzaZHFrI7uaQkeYdSJ2jLmp552Q7Ry39+tkkpUnUyctCZqDRWIvdsh8VA37+VyNCnigfGxcrZnwgSa1aUop385SXBnJXyMhMIUywo00tjj/HEmRvq+wJ6b6fUYBWuptvTrf7kIFh87WPkr7JWR3J/6dnkGevRjOytn2dXxo1CORp6qkaSgBcwQAZDUEO7MicYMwSwCBoCEwCwABUAIwAQEGHypIBSIxrL4CvclawoUhrXiLC/Z4hAi/Ihqa2JqXCQFmiqKMuruoufT4vzvG2zu69rFSKfVyOHzPhf5MFhRZpe5Mp6Opii17g6c8+LJxT/+5Jk9IwD1hhBCz7AEjiCGLptIyYSDaD+DzxpyN6KogmzKOC5ZTEThVSrqueh338iPWwuZU3aunbDH4TXSz+CQ+KCoQ14u104gIOjZg4HfyB3DEYJHEiqqWd7ZluMIKu75yhZQ2w+OM9M10VehP7/TsLVkBUGLgLQl2nuyLuncKdEWWRcisJgOgNGoOQ4Yl4vQJAFFAClL0e2RLrfCErPbWKLRddr0EPzG6K5925NfUcSCGPQ5MYWbETl4iADaBfmrlmtTayz/fcKf0wnPAaCNw5gLIMnHJbIxnp41DGQ5EnUoRLyeRjCA51bM5h4UW4MrdK0qP9oXuOhyEb8G45tLgAICnEkkq1lpRo24DsL9i1wWpHGJXpdjH/ZCX0aAmlaSQylL5juRfs/Q9tmXV9Xr37X/+6Lf6OiIMeAIEYAhgHATmnIG2ZEwUYYBoW6j8mTtL1MLGgDjLoex+nIZhuMLZJSPiFSrU2DlJUxtU/2qlnbPFvlEcjik4/oUJ/I083nGVtiU617SIm9/p2WmXyGkmaecZav76QHe5t9YvOqt0Iq//uSZPWNhFljQAPPGvJBQqhibMU4D8FxAi8EW0jdimK1oZTg5x11q9BxhryoK5tlLSi+xMCWtJmgMEYYeMm6e0Rgpopn08DWVaShbnxJJ43oqyHO7d+cW6q1XUM9rzNqgk0DtuOHC/u+dv/ey+KofvpvS269LdKLdvv+ubXYZGgEEdTAdBMNKsJkyEwrysBsQgDJ0KuTXLmNySoUR0p03GU8EiyRlc68CS821EqREF07UrMylekwUyHpGPUZ2Mjm5eskc+7UsoRyz/znPS0JUhlJS95kmORBzuXLl+b82LuvHPtiQ3qzna2lekq1lqhkrpEs97K5J5FZD56GRT9Cw1Kgs2Ze8BksicydJngEC5QKE7osJMdzKs9088WO61WA4tOJZcjxSxXZ+MTtFam1VVIRp/XY79+xj4xYu7YCSOSoq0tSo0YCBudgKEYuIAKgGyJ1HpdEah7oaP5OrKuOxguo4XzFljR/RRhLBCXcJgi6UylbnTl+46p/sbOxn1/ldDrFoC6UlzWr8/5kRfm+UzJpTY5Fc65Ww14dJTQ1tJyqSv/7kmTzjKQfZsCLzxriP+KYYW0iJhBdqQAPPGuI/YphlbSUmH/L+532vt4PiUWbskFO9VW8NLDEriBSTIVsBAan7/pqPjmQfxByQTtLxqjZQ4dRfeUbOi6zXs6+zb/1qsqQ3UuP/f//6PV8YFCFpVAUGioczx6bsHiYNAIj+hChOloJcuRdhF45vo0lLFCTzOsPp41axY6oLkAxJZWx4lFRGJGlnnhDUzjF2UoYpJ5eNI8OTPGM/eKTLDedKITqsaGqgu/nfI06l1YX1WY/PLUoDg06StlkUK1TUl/I3HQd78Fb0O5e6KpIQ0nrqdwQIg/7IDQs00lbWNEXcVZBhNo7H6FY65Kqc37lBQSjxCSCDKDJVj3ip0Ay+5byzS4CUoXpTWtVJJ4pKKLh1xr1kKpjJITFYSqsQ5+Hb00uaMCSAKfH3wEFWb+vmgMaIAeZuhB9ZGLByQtKFJCrEAWI5ojSia0fUbqqUTOBRvw7RguBR9hWe9gEWJGCd6DqR90m6MhgEFq0k3ECmPfQPCREmEBKquLicW3WEUg0J1NYx0HWuZb/+5Jk74wD1lhBC68aci3hOLkHJgIQTWMALrxpyVeIYMW0rOAKu1xdxG+vDjMzb4wyc8gsWggKIxI2yBIcRpO0/sURGO8WCjpk/HlHNGZO8mghZeqW0NRQuryWgZc+9b2XLWxLc7FjO9Sfm7VpJZDYSyKAIABkBRAKxipf5rExxgwEK6VM1CURB4EIKISJ8qDzXTi/QqlmHNIGYLYdZZA5VNp/RMKNGhgBdRmGUGTCtMKLWuSqaoGNxggxmFJ2Dx4MKXSMmFdNR5Lcijd+g09YOsNCRvJxDwq2YOkTUoONsWPj0A9SRAVsa9HyGCrejufBWBjD9BLfkqxy2xlW+/3K4weh+bYO8sT2BoJJrMeo31GN+47hD5AQiwALxZ3QzTMUwxW9ArXcte5FAQXopSKb63zG92wEL+yrejI98ioAPTSsX5RAKoNNd7I2AzQUBFB4w+sld+LQRTPanQYxAbPrfTVoUS8lRpPpdPHnDiWmWYtNO8UmQIjn336klIPFRuogVaQXtA0d8vO776HkD9eo9DJ3A1P/PV59H6TP70YPLfdx//uSZO4AwyAYQ8ubSJBF4phAbMMoEa1ZAE68ackAiGGFowjg4CU/XtXdoCKW3VlrtnfnwctusWFDCcUed3MGzCzjvnqziwWzc2zWNU8fYtZ/uF49Q801nASmpKvnB1N1Iylo5jP2uDtdxKo1S1aliZuaZYeT4tpcOQ9Tqw4gHCgoOoX08uAhYhIDE85TaA0JQcAXLCG4Lzw+W2ybZn7EYlAm728tIigLTZejgtgmf7kRK6x66bjBoJ02CMO4jKOxT4xj3jliUwcqMxjlfVKZAzMqfOeadzNv1o/arsL09otJKnliaa/r6/AFNkDpF8zrdqEx83J4EOKEC2kWUkFGOY4HOKWY7za+Mo6EIBCBmljQ3KasluK1P3LS7IKJFWiYWUlTmvSWlIkdY4VSxezqCDN5JYqxI3xSxhumQAHACyYeDI6JW42MTIwsAUAgFH2VypMRlIyjJjOatozV0p72w27zqzGUBiwsejAo1Q1tEfEYyCLcvThZESExWtmIeF5FLFNzPk2mmUPbzlYrkTH5yugc3OEVaNnSNnyRTTmdzaJ06v/7kmTxDINtFkIzhnsyS8KoMGzIKA8FJQZOMGnJJQihVbMIoKzMmjOj2bRe5UjLfVTvc2jHtS8MiwSlnAGxSqzEgcI8MVW+Dhh+tD+podMpOiL9jJ1sqAiiEK6cQAZeg65601uVptS5o65lHUOkfaLwzr3bZ5QoMf0qUlbqaidA8ILTBIID0YxzWJhTA4GmromsHetThp5UAZNCLZOhAGk8cFxR15b7niJconN7BpuzxnJXeBvfOpL0x2QnRQjLiuD1vm/x393bm1tjLmRw0z5MIdMenrD86j05f/PNEF5qqkudQ4SkRgqHsr2mcmrcGLsp0pWpd4aEo8qlJEGYDJId2ElTXpQDF0XBBQydOKnSm/TNbObdr0UMGAcVFDR7NDlwFoqht4peIUjhspUTUy9LYpOuYPnGE1CpTUvUdpCKBiXJxBeUJsCTWPES83A8SwlVqPCVQSOkwUOEQ+GhfYYyR/IgL5PECQhoZltbW3rUt3ccwqXtDUDEUquh/3ZNJJsvq5986f97tlPh98+0zL76JymRHSnadKeZNeNZ9T1ue7T/+5Jk8o2D9mhAC68a4kPiqGZpIiYQHaj+DrxtSUKIoMG0nKhmLwmZ/+9nkSEM2x2HcZL45bu3cQOheK/0VHCT9sDL1gENGas66nRB6GOUrKFCjKFaXfkX9kVfKsUCAVb7v/dq8X9Pf7kslert+r9Gjr3E3tipQIKzyoBB8oNRyEqBhAB6okNVDi9qRj8oFI8xuMtH8rIz1Ov4sNla7Wgx10B7iVku8c1OmUZHd0apINr6vJijaEHjHFda0RWfU/QiNkzQdoCiK5vDTVG6dHhBoSNNCRuRUx4pmRaq1BnJMKGPcQiFDJCEEZi0doS5gjSuScBsruTsiR0HIiPdQm0nj4EBLJUneajLGPk8BFwhAntoujZxz9xJm+6sCKNDSj5JNBFDetZpsypmf7BfcU7IhTsER4k2YXO9eSpqh88q1ugislKuvJjUnhZVygEBhQAZgSCRyCiZj8lZgIAiVbxNJe1vYfg9JGRtbvuZDk5JXiMIsXJlJhCNH0W59SBIazCnK+xR40REdXJulmTM1pdQmsVX17FM0hOs6h2FG3urmrji//uSZOcPg39DQIOvGnIxwpiWZGIoEYGM/A68bYknCGEFtJSg7IfW9+5wnQsqlMjGO70jrWRUi7r5lDqZcLqmw5wGx5N7/AqfMB9sRO2qocE5mLkDroluZqAGLu4jc27NTWCFx0qklWT0Oe6kvTdmr7krUzP1fr0gDmU3tddrTXFb0fGG1OuStp0hRLb4iCsEYAEp07YHJT8TDZClx2NIKKTqjUAw2fXEertYYW2K7nVroUQKefqa+AEfuYvbX+2y0yZcymIItAo8StwyvnedtDFkyHsbIbSatuGONzliREOab18w2QNnCFDdNjWU4m9fd6PMdQvrXmOEJl6XhGqv10CWfrzr/HXGBx2Kgc1VTDPSn39N/doN9ZZLivv2bNWesec0jKO3vyvQ72Sj+5T302I0blLpVRADIcB5hoWxkHRplEJ5haErlNRWIsKmEyWYg5yJdIXaAEkRhEY4yNXcBKgUDTprEbAiBMTxrLrDzKbvG70iX5VXFLrDzEzUdJQ/uZX1kZ2g2vuXN6irm2PrnqNeoaZS6Qqkmueae+6vjWUgzv/7kmTqDIPpXsADphwyQIIoQGzCKg6VIQIuMGuI1Yph4aGImOHbWFuFHSsKr9/FXQ76gdq1uORJHm5hkAuQiAlCcoCLtfazcpJdN5XZ7P94PsTtd1OCSYE8qh6YXbjmUY+9u/sVS8lSYRM3UOk3MW0WkpgVnZkmcbrpcsWvUwJJP0kLd6VNAAQIAQAQABpZI1MY4S5hBBJ6qRDAGvQwiHRomgkEKVODHTCYHX026QpmVgVcAwBSI2VOah5gDkAqYgMOUO48xecQeGRxeBygpEhpBR1JqoQvQGrQbGw9kPGZEWLMmUk1MhE6DNCwDLjRFlmiJwvGSabXQRlAbYyh4cA5ZEyZMTxNGRsTPWqy0xzyUHAQwiozZGkkQQxNSkovHZig+gpaa1WIsRAi5IkHMCXIoakQIeipJJMumLF4yeyddFVddayuT5YIITBdIuUS2RQvE4RcnSfMUTUyUkuihU6loJ1f///nCuRRH///9FFjIQCgl1GpUilI9YxSpv3ni7EE+muymlnViPHSRp7QiA/SXa8muEGPBJRWlisHCQiT0of/+5Jk9QAEJWQ/hXUAAkliGDCtiAAdUhEK2ckAAlo6oIc0sAAjTd2VuJii0tjd9ons3NT5oeNPmp1D/fVJrJ2fUY6Ns06mS71Ltip9VxyKuLnqP4VX3Ne6msafo8x7JefZzX37ZprGqMtelDmtv6Um5as469p5R0R8////Ebf///////9YLf/ii0xBTUVEjdE1FxOmIfxBiFPCVD1FydqVDUNZbCoIgiS0RCoVYRCoVItVISXVUKFnJIkQSBoOlQWgq6VOwaeDQdKgqVBU6IjwNA0sFR4KnREHCwNRL/1B2VOiUNKBpQNHip0SgrBqDT53//BXYCBWAkAYdrkkSTF1kxMT3mly60DAQoeCp0FQVLA0oGjxU6VO//+Ij0FYKuUqTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uSZIqP8z0WsAc9IAArgWWx5gwAAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqg==";var $s=new x("ResponseNotification"),Im=.5,Pm=200,Om=300,oo=h({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:t=>(t.append(U("Preview",ol)),()=>t.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),_s=null,Lr=new Map,tl,kr;function Rm(t){return new Promise((e,o)=>GM_xmlhttpRequest({url:t,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=Pm&&n<Om?e(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var Hm=t=>Uint8Array.from(atob(t.slice(t.indexOf(",")+1)),e=>e.charCodeAt(0)).buffer;function Dm(t,e){let o=Lr.get(e);return o||(o=(e.startsWith("data:")?Promise.resolve(Hm(e)):Rm(e)).then(n=>t.decodeAudioData(n)),o.catch(()=>Lr.delete(e)),Lr.set(e,o)),o}async function el(t){_s??=new AudioContext;let e=_s;e.state==="suspended"&&e.resume();let o=e.createBufferSource(),n=e.createGain();o.buffer=await Dm(e,t),n.gain.value=Im,o.connect(n).connect(e.destination),o.start()}function ol(){let t=oo.store.soundUrl.trim();el(t||Cr).catch(e=>{$s.warn("Sound failed",e),t&&el(Cr).catch(o=>$s.warn("Default chime failed",o))})}function Nm(t){let e=`${t??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:e,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:e,silent:!0});o.onclick=()=>{focus(),o.close()}}function Um(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(kr=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:kr.signal}))}var nl=f({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:oo,start(){Um(),tl=L.on("fall",({conversationId:t,outcome:e})=>{e==="done"&&(oo.store.onlyWhenHidden&&!document.hidden||(oo.store.sound&&ol(),oo.store.browserNotification&&Nm(to(t))))})},stop(){tl?.(),kr?.abort()}});var Gm=`:is(${l.sidebarScroll}, :has(> ${l.sidebarScroll})) + :has(${l.menuButton})`,Fm=`${l.rail} > :has(${l.menuButton})`,Ir=`:is(${Gm}, ${Fm}, ${l.oldProfile}):not(:hover)`,Br="[data-bloom-profile-avatar]",Km=`:is(${Ir}, ${Ir} :has(${Br})) > :not(${Br}, :has(${Br}))`,il=h({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function Ym(){let{opacity:t,fadeAvatar:e}=il.store;return t>=100?"":`${e?Ir:Km}{opacity:${t/100}!important}`}var rl,al=f({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:il,styles:Ym,start(){rl=et()},stop(){rl?.()}});var sl=`/*
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
`;var O=E("bloom-star-chats"),Qm=80,Wm=60,zm=1200,Vm=120,ll=180,Nr=h({messages:{type:"custom",default:[]}}),Pr,Or=!1,St=!1,zt=!1,we=0,K=null,sn="",M=null,Rr;function Ur(){let t=Nr.store.messages;return Array.isArray(t)?t.filter(e=>pt(e)&&typeof e.conversationId=="string"&&typeof e.messageId=="string"&&(e.role==="user"||e.role==="assistant")&&typeof e.snippet=="string"&&typeof e.starredAt=="number"):[]}function Gr(){let t=g();return t?Ur().filter(e=>e.conversationId===t):[]}function Jm(t,e){return Ur().some(o=>o.conversationId===t&&o.messageId===e)}function cl(t){let e=Ur(),o=e.some(n=>n.conversationId===t.conversationId&&n.messageId===t.messageId);Nr.store.messages=o?e.filter(n=>!(n.conversationId===t.conversationId&&n.messageId===t.messageId)):[{...t,starredAt:Date.now()},...e].slice(0,Qm)}function Hr(t){return t.messageIds[0]||t.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||t.el.getAttribute("data-turn-key")||""}function Zm(t){return X(ue(t)||A(t.el.textContent??""),Wm)}function Xm(t){let e=t.closest(l.turn);if(!e)return null;let o=qt().filter(n=>e.contains(n.el));return o.find(n=>n.el.contains(t)||n.el===e)??o.findLast(n=>n.el.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING)??null}function $m(){return[...document.querySelectorAll(l.turnActions)].filter(t=>!t.closest(`[data-bloom], [role="dialog"], [inert], pre, ${l.sidebars}`))}function _m(){return[...document.querySelectorAll(l.headerMore)].filter(e=>{if(e.dataset.bloom==="message-star"||e.closest("[data-bloom], [role='dialog'], [inert]")||e.closest(l.sidebars))return!1;let o=e.getBoundingClientRect();return o.width===0&&o.height===0?!!e.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((e,o)=>o.getBoundingClientRect().left-e.getBoundingClientRect().left||(e.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function ul(t,e,o){return s("button",{class:e,attrs:{type:"button","aria-label":t},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},N("star"))}function tp(t,e){t.setAttribute("aria-pressed",String(e)),t.setAttribute("aria-label",e?"Unstar":"Star")}function Dr(){return St||zt}function Vt(){we&&window.clearTimeout(we),we=0}function Se(){St=!1,zt=!1,Vt(),K?.remove(),K=null,sn="",M?.classList.remove(O("-open")),M?.setAttribute("aria-expanded","false")}function Fr(t){return t instanceof Node&&!!(M?.contains(t)||K?.contains(t))}function ep(t){t.classList.add(O("-flash")),window.setTimeout(()=>t.classList.remove(O("-flash")),zm)}function op(t){let e=qt().find(n=>Hr(n)===t),o=e?.el.closest(l.turn)??e?.el;o&&(o.scrollIntoView({block:"start"}),ep(o))}function np(){let t=g(),e=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!t||kt()){for(let n of o)n.remove();return}for(let n of $m()){if(!tt(n))continue;let r=Xm(n),i=r?Hr(r):"";if(!r||!i)continue;let a=n.querySelector('[data-place="action"]');(!a||a.dataset.id!==i)&&(a?.remove(),a=ul("Star",O("-star"),()=>{let d=g(),c=qt().find(u=>Hr(u)===i);!d||!c||cl({conversationId:d,messageId:i,role:c.role,snippet:Zm(c)})}),a.dataset.bloom="message-star",a.dataset.place="action",a.dataset.id=i),tp(a,Jm(t,i)),a.parentElement!==n&&n.append(a),e.add(a)}for(let n of o)e.has(n)||n.remove()}function rp(){if(!K||!M)return;let t=M.getBoundingClientRect(),e=K.offsetWidth||288,o=K.offsetHeight||120,n=t.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,t.top-o-6));let r=Math.max(8,Math.min(t.right-e,window.innerWidth-e-8));K.style.left=`${Math.round(r)}px`,K.style.top=`${Math.round(n)}px`}function ip(){if(!Dr()||!M){K?.remove(),K=null,sn="",M?.classList.remove(O("-open")),M?.setAttribute("aria-expanded","false");return}let t=Gr(),e=t.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!K||sn!==e){K?.remove();let o=t.map(n=>s("div",{class:O("-row")},s("button",{class:O("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),Se(),op(n.messageId)}}},s("span",{class:O("-role"),text:n.role==="user"?"You":"ChatGPT"}),s("span",{class:O("-snip"),text:n.snippet||"Message"})),ul("Unstar",O("-unstar"),()=>cl(n))));K=s("div",{class:`bloom-root ${O("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{Vt(),zt=!0},pointerleave:n=>{Fr(n.relatedTarget)||St||(Vt(),we=window.setTimeout(()=>{zt=!1,Jt()},ll))}}},s("div",{class:O("-head"),text:"Starred"}),...o.length?o:[s("div",{class:O("-empty"),text:"No starred messages in this chat"})]),document.body.append(K),sn=e}rp(),M.classList.add(O("-open")),M.setAttribute("aria-expanded","true")}function ap(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let t=_m(),e=t?.parentElement??null,o=g();if(!t||!e||e.closest(l.sidebars)||!o||kt()||!tt(e)){M?.remove(),M=null,Se();return}M||(M=s("button",{class:O("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{Vt(),we=window.setTimeout(()=>{zt=!0,Jt()},Vm)},pointerleave:r=>{Fr(r.relatedTarget)||(Vt(),we=window.setTimeout(()=>{zt=!1,St||Jt()},ll))},click:r=>{r.preventDefault(),r.stopPropagation(),St=!St,zt=St,Vt(),St||Se(),Jt()}}},N("star"))),(M.parentElement!==e||M.nextElementSibling!==t)&&t.before(M);let n=t.getBoundingClientRect();n.width>0&&(M.style.width=`${n.width}px`,M.style.height=`${n.height}px`),M.classList.toggle(O("-here"),Gr().length>0),ip()}function sp(){let t=new Set(Gr().map(e=>e.messageId));for(let e of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))e.classList.toggle(O("-mark"),!!e.dataset.messageId&&t.has(e.dataset.messageId))}function Jt(){if(!Or){Or=!0;try{for(let t of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))t.remove();np(),ap(),sp()}finally{Or=!1}}}function lp(){Se(),M?.remove(),M=null;for(let t of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))t.remove();for(let t of document.querySelectorAll(`.${O("-mark")}`))t.classList.remove(O("-mark"))}var dl=f({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:Nr,styles:sl,onSettingsChange(t){t==="messages"&&Jt()},start(){Pr=w(o=>B(o)&&Jt());let t=o=>{Fr(o.target)||Dr()&&Se()};document.addEventListener("pointerdown",t,!0);let e=o=>{o.key!=="Escape"||!Dr()||(o.preventDefault(),Se())};document.addEventListener("keydown",e,!0),Rr=()=>{document.removeEventListener("pointerdown",t,!0),document.removeEventListener("keydown",e,!0)},Jt()},stop(){Pr?.(),Pr=void 0,Rr?.(),Rr=void 0,Vt(),lp()}});var cp="filter:blur(6px)!important;transition:filter 0.2s ease",ty=`:is(${l.sidebars})`,up={conversations:{selectors:["[data-app-action-sidebar-thread-title]"],hover:!0},projects:{selectors:["[data-app-action-sidebar-project-label]"],hover:!0},accountAvatar:{selectors:["[data-bloom-profile] img","[data-bloom-menu] img"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["[data-thread-title]","[data-thread-title-trigger]"],hover:!1}},pl=h({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function dp(){return Object.entries(up).filter(([t])=>pl.store[t]).map(([,{selectors:t,hover:e}])=>{let o=t.join(",");return`:is(${o}){${cp}}`+(e?`:is(${o}):hover, .bloom-recent-item:hover :is(${o}){filter:none!important}`:"")}).join(`
`)}var ml,fl=f({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:pl,styles:dp,start(){ml=et()},stop(){ml?.()}});var Et=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)','[data-turn-key] [data-message-author-role="user"] blockquote:not(.twitter-tweet)'].join(","),Kr=h({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function mp(){let t=[`${Et}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${Et}>*{margin-block:0!important}`];return Kr.store.italic||t.push(`${Et}{font-style:inherit!important}`),Kr.store.quotes||(t.push(`${Et}{quotes:none!important}`),t.push(`${Et}::before,${Et}::after,${Et} p::before,${Et} p::after{content:none!important}`)),t.join(`
`)}var gl=f({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:Kr,styles:mp});var pp=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],fp=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",gp='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',hl=h({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function hp(){let t=`${hl.store.width}rem`;return`:root,[data-app-action-timeline-scroll],[data-chatgpt-composer],[data-composer-input]{--thread-content-max-width:${t}!important;--composer-adjacent-max-width:${t}!important}`}var bl=f({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:hl,styles:hp});var bp=[na,Ta,Ra,Na,Fa,Ya,Xa,ss,gs,ys,Hs,Ns,Us,js,Xs,nl,al,dl,fl,gl,bl],Yr=bp;var Ap=new x("Bloom"),Al="2.0.79";function yp(t){t.isComposing||!t.shiftKey||!(t.metaKey||t.ctrlKey)||t.key!=="b"&&t.key!=="B"||(t.preventDefault(),t.stopPropagation(),ae())}async function jr(){for(let t of Yr)t.updatedAt=Pi[t.name];li(Yr),ri(),io("base",gi),Bi(),document.addEventListener("keydown",yp,!0),mo("Init"),En().then(()=>{_r(),mo("DOMContentLoaded")}),await Tn(),mo("HostReady"),zi(),Ap.info(`Bloom++ ${Al} app host ready`)}var yl=new x("Boot");if(window===window.top){let t=Zt.Bloom;t&&yl.warn("Replacing another Bloom++ instance",t.VERSION),Object.defineProperty(Zt,"Bloom",{value:Qr,configurable:!0,writable:!0}),jr().catch(e=>yl.error("Startup failed",e))}})();
