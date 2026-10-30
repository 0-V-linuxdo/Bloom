// ==UserScript==
// @name         Bloom++ (ChatGPT app)
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.81
// @description  Bloom++ host for the official ChatGPT macOS app. Injected over loopback CDP; not a web userscript.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @match        app://*/*
// @run-at       document-start
// @grant        none
// @license      GPL-3.0-or-later
// ==/UserScript==

/* Bloom++ v2.0.81 ChatGPT app host. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Tl=Object.defineProperty;var Ml=(t,e)=>{for(var o in e)Tl(t,o,{get:e[o],enumerable:!0})};var x=class{constructor(e){this.tag=e}log(e,o){console[e](`[Bloom++] [${this.tag}]`,...o)}debug(...e){this.log("debug",e)}info(...e){this.log("info",e)}warn(...e){this.log("warn",e)}error(...e){this.log("error",e)}};var ft=(t,e,o)=>Math.min(o,Math.max(e,t)),gt=t=>typeof t=="object"&&t!==null&&!Array.isArray(t),Zr=t=>`${t}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,_=(t,e)=>t.length>e?`${t.slice(0,e-1)}\u2026`:t,A=t=>t.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function Xr(t,e){return`${t} ${e}${t===1?"":"s"}`}async function $r(t){if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}await navigator.clipboard.writeText(t)}function _r(t){try{return JSON.parse(t)}catch{return}}var Zt=typeof unsafeWindow>"u"?window:unsafeWindow;var Jr={};Ml(Jr,{VERSION:()=>wl,init:()=>Vr,plugins:()=>st});var Cl=new x("Styles"),Te=new Map,ti=new Set,Me=new Map,dn=!0;function ei(){let t=document.adoptedStyleSheets.filter(e=>!ti.has(e));document.adoptedStyleSheets=[...t,...Te.values()]}function oi(t){document.readyState==="loading"||t.parentNode===document.head||document.head.append(t)}function Ll(t,e){let o=Me.get(t);o||(o=document.createElement("style"),o.id=`bloom-style-${t}`,Me.set(t,o)),o.textContent!==e&&(o.textContent=e),oi(o)}function ao(t,e){if(dn)try{let o=Te.get(t);o||(o=new Zt.CSSStyleSheet,Te.set(t,o),ti.add(o)),o.replaceSync(e),ei();return}catch(o){Cl.warn("Constructed style sheets unavailable, using <style> after parsing",o),dn=!1,Te.delete(t)}Ll(t,e)}function mn(t){Te.delete(t)&&dn&&ei(),Me.get(t)?.remove(),Me.delete(t)}function ni(){for(let t of Me.values())oi(t)}var E=t=>(...e)=>e.map(o=>t+o).join(" "),so=(...t)=>t.filter(Boolean).join(" "),Xt=t=>t.length?`${t.map(e=>`${e}:not([data-bloom])`).join(",")}{display:none!important}`:"";function f(t){return t}var kl=new x("Storage");function ri(t){try{return localStorage.getItem(t)??void 0}catch{return}}function ii(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch(o){kl.warn("localStorage write failed",o)}}function ai(t,e){addEventListener("storage",o=>{o.key===t&&e(o.newValue)})}var pn="BloomSettings",Bl=100,$t={plugins:{}},lo=new Set,fn=new Set,Ce;function si(t){let e=t;for(let o=0;typeof e=="string"&&o<2;o++)e=_r(e);return!gt(e)||!gt(e.plugins)||!Object.keys(e.plugins).length?null:e}function li(){let t=si(ri(pn));t&&($t.plugins=t.plugins)}var ci=(t,e)=>`${t}
${e}`;function ui(){Ce=void 0,fn.clear(),ii(pn,$t)}function Il(t){let e=si(t);if(!e)return;let o=[];for(let n of new Set([...Object.keys($t.plugins),...Object.keys(e.plugins)])){let r=$t.plugins[n]??={},i=gt(e.plugins[n])?e.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))fn.has(ci(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of lo)i(n,r)}function Pl(){Ce&&(clearTimeout(Ce),ui())}var Mt=(t,e)=>$t.plugins[t]?.[e];function Ct(t,e,o){let n=$t.plugins[t]??={};o===void 0?delete n[e]:n[e]=o,fn.add(ci(t,e)),clearTimeout(Ce),Ce=setTimeout(ui,Bl);for(let r of lo)r(t,e)}function _t(t){return lo.add(t),()=>void lo.delete(t)}function gn(t){return t.type==="component"?void 0:t.default}function h(t){let e={def:t,pluginName:"",store:new Proxy({},{get:(o,n)=>Mt(e.pluginName,n)??(t[n]&&gn(t[n])),set:(o,n,r)=>(Ct(e.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(t))t[o].type!=="custom"&&Mt(e.pluginName,o)!==void 0&&Ct(e.pluginName,o)}};return e}var di=t=>{let e=()=>{let o=Mt("Settings",t);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>e().includes(o),list:e,toggle(o){let n=e();Ct("Settings",t,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},co=di("pinnedPlugins"),uo=di("starredPlugins");addEventListener("pagehide",Pl);ai(pn,Il);var mo=new x("PluginManager"),st=new Map,te=new Set,An=new Set,hn=new Set;function mi(t){for(let e of t)e.settings&&(e.settings.pluginName=e.name),st.set(e.name,e)}var ht=t=>!!t.required||(Mt(t.name,"enabled")??!!t.enabledByDefault),yn=t=>te.has(t),bn=t=>`plugin-${t.name}`;function pi(t){if(!t.styles)return;let e=typeof t.styles=="function"?t.styles():t.styles;e?ao(bn(t),e):mn(bn(t))}function vn(t){if(!te.has(t.name))try{pi(t),t.start?.(),te.add(t.name)}catch(e){mo.error(`Failed to start ${t.name}`,e)}}function fi(t){if(te.delete(t.name)){mn(bn(t));try{t.stop?.()}catch(e){mo.error(`Failed to stop ${t.name}`,e)}}}var qn=t=>t.startAt??"HostReady";function po(t){An.add(t);for(let e of st.values())qn(e)===t&&ht(e)&&vn(e);mo.info(`${t}: ${[...te].join(", ")}`)}function gi(t){fi(t)}function hi(t){ht(t)&&An.has(qn(t))&&vn(t)}function bi(t,e){Ct(t.name,"enabled",e),e?An.has(qn(t))&&vn(t):fi(t);for(let o of hn)o()}function Ai(t){return hn.add(t),()=>void hn.delete(t)}_t((t,e)=>{let o=st.get(t);if(!(!o||e==="enabled"||!te.has(t)))try{pi(o),o.onSettingsChange?.(e)}catch(n){mo.error(`Settings change failed for ${t}`,n)}});var yi=`/*
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
    content: var(--bloom-text, attr(data-bloom-text));
    font-size: var(--bloom-text-size, 1rem);
    line-height: normal;
    letter-spacing: normal;
    word-spacing: 0.25em;
    white-space: pre-wrap;
}
`;var Hl=new x("Dom");function s(t,e={},...o){let n=document.createElement(t);e.class&&(n.className=e.class),e.text!=null&&(n.textContent=e.text),e.title&&(n.title=e.title);for(let[r,i]of Object.entries(e.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(e.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var vi=document.createElement("template");function qi(t){return vi.innerHTML=t.trim(),vi.content.firstElementChild.cloneNode(!0)}var X=t=>t instanceof HTMLElement&&t.isConnected&&t.getClientRects().length>0&&!t.closest("[inert]"),tt=(t,e=document)=>[...e.querySelectorAll(t)].find(X)??null,Rl=16,Dl="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function xi(t,e){let o=setInterval(t,e),n;try{n=new Worker(URL.createObjectURL(new Blob([Dl],{type:"text/javascript"}))),n.addEventListener("message",t),n.postMessage(e)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function xn(t){document.hidden?setTimeout(t,Rl):requestAnimationFrame(t)}function ee(t){let e=!1;return()=>{e||(e=!0,xn(()=>{e=!1;try{t()}catch(o){Hl.error("Scheduled task failed",o)}}))}}var fo=new Set,go=[],Le,Nl=ee(()=>{let t=go;go=[];for(let e of fo)e(t)});function w(t){return fo.add(t),Le||(Le=new MutationObserver(e=>{go.push(...e),Nl()}),Le.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),t([]),()=>{fo.delete(t),!fo.size&&(Le?.disconnect(),Le=void 0,go=[])}}var Ul=t=>t instanceof Element&&(t.hasAttribute("data-bloom")||!!t.closest("[data-bloom]")),T=t=>!t.length||t.some(e=>!Ul(e.target)),Gl=t=>`"${t.replaceAll("\\","\\\\").replaceAll('"','\\"').replaceAll(`
`,"\\A ").replaceAll(" ","\\00a0 ")}"`;function Lt(t,e){if(e==null){t.removeAttribute("data-bloom-text"),t.style.removeProperty("--bloom-text-size"),t.style.removeProperty("--bloom-text");return}t.style.setProperty("--bloom-text",Gl(e)),t.getAttribute("data-bloom-text")!==e&&(t.hasAttribute("data-bloom-text")||t.style.setProperty("--bloom-text-size",getComputedStyle(t).fontSize),t.setAttribute("data-bloom-text",e))}var Fl=new x("Events");function oe(){let t=new Map;return{on(e,o){let n=t.get(e);return n||t.set(e,n=new Set),n.add(o),()=>void n.delete(o)},emit(e,o){for(let n of t.get(e)??[])try{n(o)}catch(r){Fl.error(`Listener for ${String(e)} failed`,r)}}}}function wi(t,e){let o=t instanceof Element?[t,...t.querySelectorAll("*")]:[...t.querySelectorAll("*")];for(let n of o){let r=n.shadowRoot;r&&(e(r),wi(r,e))}}function bt(t,e=document){let o=[...e.querySelectorAll(t)];return wi(e,n=>o.push(...n.querySelectorAll(t))),o}var $=(t,e=document)=>bt(t,e).find(X)??null;var l={rail:"[data-app-navigation-rail]",sidebarScroll:"[data-app-action-sidebar-scroll]",sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"[data-app-action-sidebar-scroll]",oldRail:"[data-app-navigation-rail]",oldProfile:'button[aria-label="Open profile menu" i]',threadRow:"[data-app-action-sidebar-thread-row]",threadSelected:"[data-app-action-sidebar-thread-row][data-app-action-sidebar-thread-selected='true']",threadTitle:"[data-app-action-sidebar-thread-title]",projectRow:"[data-app-action-sidebar-project-row]",projectLabel:"[data-app-action-sidebar-project-label]",destination:"[data-sidebar-destination]",conversationLink:"[data-app-action-sidebar-thread-row]",timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:"[data-turn-key]",turn:"[data-turn-key]",messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"[data-app-action-timeline-scroll]",turnActions:'.turn-action-controls, [class*="turn-action-controls"]',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery, [class*='recovery']",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composer:"[data-chatgpt-composer], [data-composer-input]",composerInput:'[data-composer-input] [contenteditable="true"].ProseMirror, [contenteditable="true"].ProseMirror',composerConversation:"[data-above-composer-conversation-id]",oldComposerForm:"[data-chatgpt-composer]",sendButton:'button[aria-label="Send" i], button[aria-label="Send prompt" i], button[aria-label="Send message" i]',stopButton:'button[aria-label="Stop" i], button[aria-label^="Stop " i], button[aria-label="\u505C\u6B62" i], button[aria-label^="\u505C\u6B62"]',composerFooter:"[data-chatgpt-composer]",modelTrigger:'button[aria-label="Model selector" i], button[aria-label="Select ChatGPT model" i], [data-chatgpt-composer] button[aria-haspopup="menu"]',modelItem:'[role="menu"] [role="menuitemradio"], [role="menu"] [role="menuitem"]',effortSlider:'[role="menu"] [data-reasoning-slider]',homeHeading:'main h1:not([aria-hidden="true"]), [role="main"] h1:not([aria-hidden="true"]), [data-testid="home-heading"], [data-homepage-takeover] h1, .heading-xl, [class~="heading-xl"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]',headerTitle:"[data-thread-title], [data-thread-title-trigger]",profile:'button[aria-label="Open profile menu" i]'};var Si=/[​-‍﻿]/g,lt=()=>$(l.composerInput),ke=t=>t instanceof HTMLElement&&t.matches(l.composerInput),F=(t=lt())=>t?.closest("form")??t?.closest(l.composer)??$(l.composer);function D(t=lt()){if(!t)return"";if(t instanceof HTMLTextAreaElement)return t.value.replace(Si,"").trim();let e=t.cloneNode(!0);for(let n of e.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...e.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:e.textContent??"").replace(Si,"").trim()}var Kl=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function Ei(t,e){let o=e?"insertText":"deleteContentBackward";t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:o,data:e||null})),t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:o,data:e||null}))}function At(t,e=lt()){if(!e)return!1;if(e.focus(),e instanceof HTMLTextAreaElement)return Kl?.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.setSelectionRange(t.length,t.length),!0;let o=getSelection();return o?.selectAllChildren(e),typeof document.execCommand=="function"?t?document.execCommand("insertText",!1,t):document.execCommand("delete"):Ei(e,t),D(e)!==t.trim()&&Ei(e,t),o?.selectAllChildren(e),o?.collapseToEnd(),!0}function Ti(t,e){let o=t;for(;o&&o!==e;){if(o instanceof HTMLElement&&o.parentElement===e)return o;o=o.parentNode}return null}function Mi(t,e,o){let n=document.createRange();return n.selectNodeContents(t),o?n.setEnd(e.startContainer,e.startOffset):n.setStart(e.endContainer,e.endOffset),n.toString().includes(`
`)?!0:!!n.cloneContents().querySelector("br")}function Ci(t){if(t instanceof HTMLTextAreaElement){let{selectionStart:v,selectionEnd:H,value:b}=t;return{first:!b.slice(0,v).includes(`
`),last:!b.slice(H).includes(`
`)}}let e=getSelection();if(!e?.rangeCount||!t.contains(e.anchorNode))return{first:!0,last:!0};let o=e.getRangeAt(0),n=[...t.children].filter(v=>v instanceof HTMLElement),r=Ti(o.startContainer,t),i=Ti(o.endContainer,t),a=!r||r===n[0],d=!i||i===n[n.length-1],c=o.getBoundingClientRect(),u=(r??t).getBoundingClientRect(),m=Number.parseFloat(getComputedStyle(r??t).lineHeight)||24;return c.height?{first:a&&c.top-u.top<m,last:d&&u.bottom-c.bottom<m}:{first:a&&!Mi(r??t,o,!0),last:d&&!Mi(i??t,o,!1)}}var Li=t=>{let e=F();return(e&&$(t,e))??$(t)},wn=()=>Li(l.stopButton),Yl=()=>{let t=Li(l.sendButton);return t&&!t.matches(l.stopButton)?t:null};function ki(){let t=Yl();if(t){t.disabled||t.click();return}lt()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var Bi=()=>X(wn());var ho=new x("AppProtocol"),Tn=oe();function jl(t){let e=t;if(typeof e=="string")try{e=JSON.parse(e)}catch{return null}if(Array.isArray(e)||!e||typeof e!="object")return null;let o=e,n=o.notification&&typeof o.notification=="object"?o.notification:o;if(typeof n.method!="string")return null;let r=n.params&&typeof n.params=="object"?n.params:void 0;return{method:n.method,params:r}}function Be(t){if(Array.isArray(t)){for(let o of t)Be(o);return}let e=jl(t);e&&Tn.emit("note",e)}var En=new WeakMap,Sn=new WeakMap;function Ql(t,e){let o=En.get(t);if(o)return o;let n=r=>{Be(r.data),typeof t=="function"?t.call(e,r):t.handleEvent(r)};return En.set(t,n),n}function Wl(){let t=MessagePort.prototype,e=t.addEventListener,o=t.removeEventListener;t.addEventListener=function(r,i,a){return r!=="message"?e.call(this,r,i,a):e.call(this,r,Ql(i,this),a)},t.removeEventListener=function(r,i,a){return r!=="message"?o.call(this,r,i,a):o.call(this,r,En.get(i)??i,a)};let n=Object.getOwnPropertyDescriptor(t,"onmessage");n?.set&&Object.defineProperty(t,"onmessage",{configurable:!0,enumerable:n.enumerable,get(){return Sn.has(this)?Sn.get(this):n.get?.call(this)},set(r){Sn.set(this,r),n.set.call(this,function(a){Be(a.data),r?.call(this,a)})}})}function zl(){let t=window.electronBridge,e=t?.subscribeToWorkerMessages;if(!(!t||typeof e!="function"))try{t.subscribeToWorkerMessages=(o,n)=>e.call(t,o,r=>{Be(r),n(r)})}catch(o){ho.warn("electronBridge.subscribeToWorkerMessages is not writable",o)}}function Vl(){addEventListener("message",t=>Be(t.data));try{Wl()}catch(t){ho.warn("MessagePort wrap failed",t)}try{zl()}catch(t){ho.warn("electronBridge wrap failed",t)}ho.info("Listening for app-server notifications")}Vl();var Jl=new x("AppRoute"),Zl=500,Ao=new Set,yo=null,bo;function g(){return($(l.threadSelected)??bt(l.threadSelected)[0])?.getAttribute("data-app-action-sidebar-thread-id")??null}var vo=()=>!g(),Pi=()=>!1,kt=()=>!1;function Ii(){let t=g();if(t===yo)return;let{href:e}=location,o={prevHref:e,href:e,prevId:yo,id:t};yo=t;for(let n of Ao)try{n(o)}catch(r){Jl.error("Route listener failed",r)}}function Xl(){let t=new MutationObserver(Ii);(()=>{document.body&&t.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-app-action-sidebar-thread-selected","data-app-action-sidebar-thread-id"]})})();let o=setInterval(Ii,Zl);return()=>{t.disconnect(),clearInterval(o)}}function et(t){return Ao.add(t),bo||(yo=g(),bo=Xl()),()=>{Ao.delete(t),!Ao.size&&(bo?.(),bo=void 0)}}var $l=250,_l=400,k=oe(),Bt=!1,ne=null,Ot=!1,It="done",Pt=!1,Oi=!1,j=()=>({generating:Bt,conversationId:g()}),tc=t=>{if(!t)return!0;let e=g();return e?e===t||e.endsWith(t)||t.endsWith(e.replace(/^local:/,"")):!0};function ec(t){return t==="interrupted"||t==="aborted"||t==="cancelled"?"stopped":t==="failed"||t==="error"?"error":"done"}function oc(){return Pt||Bi()}function nc(t){ne=null,Bt=!1,Pt=!1,k.emit("fall",{conversationId:g(),outcome:t}),Ot=!1,It="done"}function rc(){let t=oc();t&&!Bt&&(Bt=!0,Ot=!1,It="done",k.emit("rise",{conversationId:g()})),t||!Bt?ne=null:ne==null?ne=Date.now():Date.now()-ne>=_l&&nc(Ot?"stopped":It)}function Ie(){rc(),k.emit("tick",j())}function ic({prevId:t,id:e}){t!==e&&(Bt&&(Pt=!1,ne=null,Bt=!1,Ot=!1,It="done",k.emit("fall",{conversationId:t,outcome:"left"})),k.emit("context",{prevId:t,id:e,migrated:!t&&!!e}),Ie())}function ac(t){if(tc(t.params?.threadId)){if(t.method==="turn/started"){Pt=!0,Ie();return}if(t.method==="turn/interrupt"){Pt=!1,It="stopped",Ot=!0,Ie();return}t.method==="turn/completed"&&(Pt=!1,It=ec(t.params?.turn?.status),It==="stopped"&&(Ot=!0),Ie())}}function sc(t){t.target instanceof Element&&t.target.closest(l.stopButton)&&(Ot=!0,Pt=!1)}function Hi(){Oi||(Oi=!0,Tn.on("note",ac),et(ic),document.addEventListener("click",sc,!0),xi(Ie,$l))}var lc="__reactContainer$",Ri="__reactFiber$";function Cn(){return document.readyState!=="loading"?Promise.resolve():new Promise(t=>document.addEventListener("DOMContentLoaded",()=>t(),{once:!0}))}var Mn=(t,e)=>Object.keys(t.wrappedJSObject??t).some(o=>o.startsWith(e)),z=t=>!Mn(document,lc)||Mn(t,Ri);function ot(){return document.body?Promise.resolve():new Promise(t=>{let e=new MutationObserver(()=>{document.body&&(e.disconnect(),t())});e.observe(document,{childList:!0,subtree:!0})})}async function Ln(){await ot();let t=Date.now()+8e3;for(;!Mn(document.body,Ri)&&Date.now()<t;)await new Promise(e=>setTimeout(e,100))}var Di={BetterNavigator:1792014624e3,BetterQuotes:179333264e4,ChatListStatus:179333264e4,ChatStateFavicons:1790623094e3,Cleaner:1793267811e3,ComposerOpacity:1793335268e3,Continue:1790939902e3,CustomSidebarIdentity:1790658669e3,GreetingCustomizer:1792014624e3,InputHistory:179333264e4,MessageTimestamps:1791080494e3,NoDictation:1793335268e3,NoShareLink:1790658669e3,NoSidebarIdentity:1790616549e3,PromptQueue:1793267321e3,RecentTopics:179333264e4,ResponseNotification:1790661368e3,Settings:1793335268e3,SidebarIdentityOpacity:1790682605e3,StarChats:179333264e4,StreamerMode:1793340613e3,TemporaryChat:1792014624e3,UserQuotes:179333264e4,WiderChat:179333264e4};var y=t=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`,cc="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",uc={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${cc}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:y('<path d="M18 6 6 18M6 6l12 12"/>'),gear:y('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:y('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:y('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:y('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:y('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:y('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:y('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:y('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:y('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:y('<path d="m6 9 6 6 6-6"/>'),play:y('<path d="M7 4v16l13-8z"/>'),plus:y('<path d="M12 5v14M5 12h14"/>'),check:y('<path d="m5 12 5 5 9-10"/>'),alert:y('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:y('<path d="M4 5h16v11H9l-5 4z"/>'),layout:y('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:y('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:y('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:y('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:y('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:y('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:y('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:y('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:y('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:y('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:y('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:y('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:y('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:y('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:y('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:y('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),ghost:y('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},N=t=>qi(uc[t]);var Rt="data-bloom-tip",kn=6,Bn=8,Ht,Ni=null;function re(t){if(t===Ni)return;if(Ni=t,!t){Ht?.remove();return}Ht??=s("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),Ht.textContent=t.getAttribute(Rt),document.body.append(Ht);let e=t.getBoundingClientRect(),{width:o,height:n}=Ht.getBoundingClientRect(),r=e.bottom+kn+n<=innerHeight-Bn;Ht.style.left=`${ft(e.left+e.width/2-o/2,Bn,innerWidth-o-Bn)}px`,Ht.style.top=`${r?e.bottom+kn:e.top-kn-n}px`}var Ui=t=>t instanceof Element?t.closest(`[${Rt}]`):null;function Gi(){let t=new AbortController,e={passive:!0,signal:t.signal};return document.addEventListener("pointerover",o=>re(Ui(o.target)),e),document.addEventListener("pointerout",o=>o.relatedTarget||re(null),e),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&re(Ui(o.target)),e),document.addEventListener("focusout",()=>re(null),e),document.addEventListener("pointerdown",()=>re(null),e),()=>{t.abort(),re(null)}}function In(t,e,o,n=!1){let r=s("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(t),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let a=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(a)),e(a)}),r}function U(t,e,o){return s("button",{class:so("bloom-button",o&&`bloom-button-${o}`),text:t,attrs:{type:"button","data-bloom":"control"},on:{click:e}})}function V(t,e,o,n){let r=s("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":e,"data-bloom":"control",[Rt]:e},on:{click:o}},N(t));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function qo(t,e,o,n,r,i){let a=s("input",{attrs:{type:"range",min:String(e),max:String(o),step:String(n)}});a.value=String(t);let d=s("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{d.textContent=`${a.value}${r}`,i(Number(a.value))}),s("div",{class:"bloom-slider"},a,d)}function Pn(t,e,o){let n=s("select",{class:"bloom-select"},...e.map(r=>s("option",{text:r.label,attrs:{value:r.value}})));return n.value=t,n.addEventListener("change",()=>o(n.value)),n}function Pe(t,e,o="",n="text"){let r=s("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=t,r.addEventListener("change",()=>e(r.value)),r}var dc=new x("SettingsPanel"),p=E("bloom-settings-"),mc=10080*60*1e3,pc=3e3,Fi="Toggle features. Some need a reload. Click the sliders icon to configure.",fc=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],gc=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],hc={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},Yi=new Set(["chat","ui","privacy"]),G=null,Nt="all",On="all",xo="",Hn=[],ji=()=>[...st.values()].filter(t=>!t.hidden),bc=t=>!!t.updatedAt&&Date.now()-t.updatedAt<mc;function Ac(t){switch(Nt){case"favorites":return uo.has(t.name);case"recent":return bc(t);case"all":return!0;case"other":return!t.tags.some(e=>Yi.has(e));case"chat":case"ui":case"privacy":return t.tags.includes(Nt)}}function yc(t){switch(On){case"all":return!0;case"enabled":return ht(t);case"disabled":return!ht(t)}}function vc(t){let e=xo.trim().toLowerCase();return!e||[t.name,t.description,...t.tags].some(o=>o.toLowerCase().includes(e))}function qc(t){let e=co.list(),o=n=>e.includes(n.name)?e.indexOf(n.name):e.length;return Nt==="recent"?t.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):t.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var Qi=t=>t.settings?.def??{},xc=t=>Object.values(Qi(t)).some(e=>e.type!=="custom");function wc(t,e,o){let n=Mt(t.name,e)??gn(o),r=i=>Ct(t.name,e,i);switch(o.type){case"boolean":return In(n,r,o.description??e);case"slider":return qo(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return Pn(n,o.options,r);case"string":return Pe(n,r,o.placeholder);case"number":return Pe(String(n),i=>r(Number(i)),"","number");case"component":{let i=s("div",{class:p("component")});return Hn.push(o.render(i)),i}case"custom":return null}}var Sc=t=>t.replaceAll(/([A-Z])/g," $1").replace(/^./,e=>e.toUpperCase());function Wi(t){if(!G)return;let e=Object.entries(Qi(t)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let d=wc(t,i,a),c=a.type==="boolean",u=a.type!=="component"&&s("div",{class:p("field-label"),text:Sc(i)}),m=a.description&&s("div",{class:p("field-desc"),text:a.description});return s("div",{class:p("field",c?"field-inline":"field-stacked")},(u||m)&&s("div",{class:p("field-text")},u,m),d)}),o,n=U("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},pc);return}clearTimeout(o),t.settings?.reset(),Oe(),Wi(t)},"danger"),r=s("div",{class:p("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&Oe()}},s("div",{class:p("popup"),attrs:{role:"dialog","aria-label":`${t.name} settings`}},s("div",{class:p("popup-header")},s("div",{class:p("card-icon")},N(t.icon)),s("div",{class:p("popup-title")},s("div",{class:p("card-name"),text:t.name}),s("div",{class:p("popup-authors"),text:t.authors.join(", ")})),V("close","Close",Oe)),s("p",{class:p("popup-desc"),text:t.description}),s("div",{class:p("fields")},...e),s("div",{class:p("popup-footer")},n)));G.querySelector(`.${p("modal")}`)?.append(r)}function Oe(){for(let t of Hn)t();Hn=[],G?.querySelector(`.${p("popup-backdrop")}`)?.remove()}function Ki(t){let e=ht(t),o=uo.has(t.name),n=co.has(t.name),r=!!t.required;return s("div",{class:[p("card",e?"card-on":"card-off"),r?p("card-required"):""].filter(Boolean).join(" ")},s("div",{class:p("card-top")},s("div",{class:p("card-icon")},N(t.icon)),s("div",{class:p("card-actions")},V("star",o?"Unstar":"Star",()=>{uo.toggle(t.name),Dt()},o),r?null:V("pin",n?"Unpin":"Pin to top",()=>{co.toggle(t.name),Dt()},n),r?s("span",{class:p("required-mark"),attrs:{"aria-label":"Required",[Rt]:"This plugin is required for Bloom++ to work"}},N("alert")):null,xc(t)&&V("gear","Settings",()=>Wi(t)),In(e,i=>bi(t,i),r?`${t.name} is required`:`Enable ${t.name}`,r))),s("div",{class:p("card-name"),text:t.name}),s("div",{class:p("card-desc"),text:t.description,title:t.description}),s("div",{class:p("card-footer"),text:t.authors.join(", ")}))}function zi(){let t=ji().some(o=>!o.tags.some(n=>Yi.has(n)));G?.querySelector(`.${p("tabs")}`)?.replaceChildren(...fc.filter(o=>o.id!=="other"||t).map(o=>s("button",{class:p("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===Nt)},on:{click:()=>{Nt=o.id,zi(),Dt()}}})))}function Dt(){if(!G)return;let t=ji().filter(Ac),e=G.querySelector(`.${p("search")} input`);e&&(e.placeholder=`Search ${Xr(t.length,"plugin")}...`);let o=qc(t.filter(u=>vc(u)&&yc(u))),n=Nt==="all",r=n?o.filter(u=>!u.required):o,i=n?o.filter(u=>u.required):[],a=[...r.map(Ki),...i.length?[s("div",{class:p("required-break"),attrs:{role:"separator"}}),...i.map(Ki)]:[]],d=xo.trim()?"No plugins match your search.":hc[Nt]??"No plugins available.";G.querySelector(`.${p("grid")}`)?.replaceChildren(...a.length?a:[s("div",{class:p("empty"),text:d})])}function Ec(t){t.key==="Escape"&&(t.preventDefault(),t.stopPropagation(),G?.querySelector(`.${p("popup-backdrop")}`)?Oe():ie())}var Vi,Rn;function Tc(){if(G)return;let t=s("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});t.value=xo,t.addEventListener("input",()=>{xo=t.value,Dt()}),G=s("div",{class:`bloom-root ${p("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:e=>e.target===e.currentTarget&&ie()}},s("div",{class:p("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},s("div",{class:p("header")},s("div",{class:p("logo")},N("bloom")),s("h2",{class:p("title"),text:"Bloom++"}),s("span",{class:p("hint"),attrs:{"aria-label":Fi,tabindex:"0",[Rt]:Fi}},N("info")),s("span",{class:p("version"),text:"v2.0.81"}),V("close","Close",ie)),s("div",{class:p("tabs"),attrs:{role:"tablist"}}),s("div",{class:p("toolbar")},s("label",{class:p("search")},N("search"),t),Pn(On,gc,e=>{On=e,Dt()})),s("div",{class:p("grid")}))),G.addEventListener("keydown",e=>e.stopPropagation()),Rn=new AbortController,document.addEventListener("keydown",Ec,{capture:!0,signal:Rn.signal}),document.body.append(G),zi(),Dt(),Vi=Ai(Dt),t.focus(),dc.debug("Opened")}function ie(){Oe(),Rn?.abort(),Vi?.(),G?.remove(),G=null}var ae=()=>G?ie():Tc();var Ji=new x("AppLandmarks"),Mc={Settings:[l.rail],WiderChat:[":root"],StreamerMode:[l.sidebarScroll,l.rail],ComposerOpacity:[l.composer,l.composerInput],ResponseNotification:[l.composerInput],InputHistory:[l.composerInput],Continue:[l.composerInput],ChatListStatus:[l.sidebarScroll],StarChats:[l.turn],BetterNavigator:[l.timelineScroll,l.turn],BetterQuotes:[l.turn],MessageTimestamps:[l.turn],RecentTopics:[l.sidebarScroll]};function Zi(){for(let[t,e]of Object.entries(Mc)){let o=st.get(t);if(!o||o.required||!ht(o))continue;if(!e.some(r=>$(r))){if(!yn(o.name))continue;gi(o),Ji.warn(`${t} paused; missing ${e.join(", ")}`);continue}yn(o.name)||(hi(o),Ji.info(`${t} resumed`))}}function Xi(){return Zi(),w(()=>Zi())}var tg=new x("Route"),Cc=/\/c\/(?!local-)([\w-]+)/;var Lc=()=>location.pathname.match(Cc)?.[1]??null;var eg=location.href,og=Lc();var kc=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Bc=/\S+@\S+\.\S+/,Ic=3;var Pc=t=>!!t.closest(".sr-only");function Oc(t){return[...t.querySelectorAll("*")].filter(e=>!e.children.length&&!e.closest("[data-bloom]")&&!!A(e.textContent??"")&&!(e instanceof SVGElement))}var Hc=t=>{if(/rounded-full/.test(t.getAttribute("class")??""))return!0;if(!t.clientWidth)return!1;let{borderRadius:e}=getComputedStyle(t);return e.includes("%")||Number.parseFloat(e)>=t.clientWidth/2};function wo(t,e,o){for(let n of t.querySelectorAll(`[${e}]`))n!==o&&n.removeAttribute(e);o&&!o.hasAttribute(e)&&o.setAttribute(e,"")}function Rc(t,e){if(A(t.textContent??"").length>Ic)return null;let o=t.closest("button");for(let n=t;n&&n!==e&&n!==o;n=n.parentElement)if(Hc(n))return n;return null}function So(t,e){t.hasAttribute(`data-bloom-${e}`)||t.setAttribute(`data-bloom-${e}`,"");let o=t.querySelector("img:not([data-bloom] img)"),n=Oc(t),r=o?null:n.map(m=>Rc(m,t)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==t&&t.contains(i)?i:o??r)??t.querySelector("[class*=rounded-full]:not([data-bloom] *)");wo(t,`data-bloom-${e}-avatar`,a);let d=n.filter(m=>!a?.contains(m)&&!Pc(m)),c=d.find(m=>kc.test(A(m.textContent??""))),u=d.find(m=>Bc.test(m.textContent??""));wo(t,`data-bloom-${e}-plan`,c),wo(t,`data-bloom-${e}-email`,u),wo(t,`data-bloom-${e}-name`,d.find(m=>m!==c&&m!==u))}var $i=()=>bt(l.rail).filter(X);function _i(t){return $(l.profile,t)??[...t.querySelectorAll(l.menuButton)].findLast(X)??null}function Dc(t,e){return[...t.children].find(n=>n instanceof HTMLElement&&n!==e&&n.contains(e))??e}function ta(){return $i().flatMap(t=>{let e=_i(t);if(!e)return[{kind:"rail",anchor:t,insert:n=>t.append(n)}];let o=Dc(t,e);return[{kind:"rail",anchor:o,insert:n=>(o===e?t:o).append(n)}]})}var Dn=()=>$i().map(_i).filter(t=>t!=null);function Nc(t){let e=t.getAttribute("aria-expanded")==="true"&&t.getAttribute("aria-controls"),o=e?document.getElementById(e):null;return o?.matches('[role="menu"]')?o:null}function Eo(){return Dn().map(Nc).find(t=>t!=null)??bt('[role="menu"]').find(t=>!t.closest("[data-bloom]")&&/log ?out|sign out|退出/i.test(t.textContent??""))??null}var He=t=>bt(l.threadRow).filter(e=>e.getAttribute("data-app-action-sidebar-thread-id")===t);function ea(t){let e=He(t)[0]??bt(l.threadRow).find(n=>{let r=n.getAttribute("data-app-action-sidebar-thread-id")??"";return r.endsWith(t)||t.endsWith(r.replace(/^local:/,""))});return(e?.getAttribute("data-app-action-sidebar-thread-title")??A(e?.textContent??""))||null}function oa(t){return null}var Nn=0,To;function Uc(t){if(!T(t))return;for(let o of Dn())So(o,"profile");let e=Eo();e&&So(e,"menu")}function nt(){Nn++;let t=!0;return ot().then(()=>{t&&Nn&&!To&&(To=w(Uc))}),()=>{t&&(t=!1,!--Nn&&(To?.(),To=void 0))}}var na=`/*
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
`;var yt=E("bloom-entry-"),Fc=4,Un="--bloom-entry-x",Gn=1,se=h({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar. The account menu and the userscript menu always open the panel.",default:!1},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:!0},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:t=>(t.append(U("Reset position",()=>{se.store.entryPosition=Gn})),()=>t.replaceChildren())},entryPosition:{type:"custom",default:Gn}}),Ut=new Map,ra=!1,ia=[];function Kc(t,e,o){let n=t.currentTarget,r=e.clientWidth-n.offsetWidth;if(t.button!==0||r<=0||!e.classList.contains(yt("hover")))return;let i=se.store.entryPosition,a=i,d=!1,c=new AbortController;n.setPointerCapture(t.pointerId),n.addEventListener("pointermove",m=>{!d&&Math.abs(m.clientX-t.clientX)<Fc||(d=!0,o(),a=ft(i+(m.clientX-t.clientX)/r,0,Gn),e.style.setProperty(Un,String(a)))},{signal:c.signal});let u=()=>{c.abort(),d&&(se.store.entryPosition=a,e.style.removeProperty(Un))};n.addEventListener("pointerup",u,{signal:c.signal}),n.addEventListener("lostpointercapture",u,{signal:c.signal})}function Yc(t){let e=!1,o=s("button",{class:yt("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),e||ae(),e=!1},pointerdown:r=>{e=!1,t!=="rail"&&Kc(r,n,()=>{e=!0})}}},N("bloom"),t!=="rail"&&s("span",{class:yt("label"),text:"Bloom++"})),n=s("div",{class:`bloom-root ${yt("wrap")} ${yt(t)}`,attrs:{"data-bloom":"entry"}},o);return n}function jc(t){let e=s("div",{class:`bloom-root ${yt("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),t.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),ae()}}},N("bloom"),s("span",{text:"Bloom++"})),o=t.querySelector('[role="menuitem"]');o?.parentElement?o.before(e):t.prepend(e)}function aa(){let{showSidebarEntry:t,showSidebarEntryOnHover:e}=se.store,o=ta();for(let[r,i]of Ut)r.isConnected&&o.some(a=>a.anchor===r)||(i.remove(),Ut.delete(r));for(let r of o){let i=Ut.get(r.anchor);if(i?.isConnected||!z(r.anchor))continue;let a=i??Yc(r.kind);Ut.set(r.anchor,a),r.insert(a)}for(let r of Ut.values())r.classList.toggle(yt("hover"),!1);let n=Eo();n&&!n.querySelector('[data-bloom="menu-entry"]')&&jc(n)}var sa=f({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:se,styles:()=>`${na}[data-app-navigation-rail] [data-bloom=entry]{position:absolute;left:50%;bottom:100%;transform:translateX(-50%);width:max-content;margin:0;padding-block:0.25rem;pointer-events:none;z-index:5;display:flex;justify-content:center}[data-app-navigation-rail]>[data-bloom=entry]{bottom:2.75rem}[data-app-navigation-rail] [data-bloom=entry] .bloom-entry-button{pointer-events:auto}.${yt("hover")}{${Un}:${se.store.entryPosition}}`,start(){ia=[w(aa),Gi(),nt()],!ra&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",ae),ra=!0)},stop(){for(let t of ia)t();for(let t of Ut.values())t.remove();Ut.clear(),ie()},onSettingsChange:aa});var vt=oe(),ct=t=>null;var Qc=["data-turn","data-message-author-role"],Wc=/:(user|assistant)$/,Fn=`${l.messageUnit}, ${l.oldMessage}`,Kn=t=>t==="user"||t==="assistant",da=()=>!!document.querySelector(l.timelineScroll),ma=()=>!!tt(l.timelineScroll),pa=()=>g()??document.querySelector(l.composerConversation)?.getAttribute("data-above-composer-conversation-id")??"",Co=()=>da()?tt(l.timelineScroll):document;function De(){if(da())return tt(l.timelineScroll);let t=document.querySelector(l.turn);for(let e=t?.parentElement;e;e=e.parentElement){let{overflowY:o}=getComputedStyle(e);if((o==="auto"||o==="scroll")&&e.scrollHeight>e.clientHeight)return e}return document.scrollingElement}var le=t=>t.getAttribute("data-chatgpt-search-unit-key")?.match(Wc)?.[1]??null,fa=t=>[...t.querySelectorAll(l.searchUnit)].filter(e=>le(e)&&!e.parentElement?.closest(l.searchUnit)),la=t=>(t.getAttribute("data-chatgpt-search-message-ids")??t.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function Re(t){let e=la(t);return e.length?e:[...new Set([...t.querySelectorAll(Fn)].flatMap(la))]}function ce(t=Co()){if(!t)return[];let e=fa(t);return e.length?e:[...t.querySelectorAll(Fn)].filter(o=>!o.parentElement?.closest(Fn))}function zc(t,e){for(let o=t.length-1;o>=0;o--){let n=e.find(r=>r.id===t[o]);if(n)return n.role}return null}function Vc(t){for(let e of Qc){let o=t.getAttribute(e)??t.querySelector(`[${e}]`)?.getAttribute(e);if(Kn(o))return o}return t.querySelector(l.markdown)||t.querySelector(l.generatedImage)?"assistant":null}var Jc=t=>!t.parentElement?.closest(l.turn);function qt(){let t=ct(g())?.chain??[];return[...Co()?.querySelectorAll(l.turn)??[]].filter(Jc).flatMap(o=>{let n=fa(o),r=n.length?n.map(i=>({el:i,known:le(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=u=>!n.some(m=>m.contains(u))&&A(u.textContent??""),a=[...o.querySelectorAll(l.assistantMarkdown)].find(u=>i(u)&&!Mo.test(A(u.textContent??""))),d=[...o.querySelectorAll(l.activityHeader)].findLast(i),c=a??d;c&&r.push({el:c,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?Re(o):ce(o).flatMap(Re),a=n??Vc(o)??zc(i,t)??(r%2?"assistant":"user"),d=o.closest(l.turn)??o,c=!o.closest(l.searchUnit)&&!!d.querySelector(l.turnBusy),u=a==="assistant"&&(o.matches(l.turnBusy)||!!o.querySelector(l.turnBusy)||c);return{el:o,role:a,messageIds:i,streaming:u}})}var Zc="[data-bloom], .sr-only",ga=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,Mo=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,ca=new WeakMap;function ue(t){let o=(t.el.closest(l.turn)??t.el).textContent?.length??0,n=ca.get(t.el);if(n?.length===o)return n.summary;let r=Xc(t);return ca.set(t.el,{length:o,summary:r}),r}function ua(t){let e=new Set,o=[];for(let n of t.querySelectorAll(l.assistantMarkdown)){if(n.closest(l.searchUnit))continue;let r=A(n.textContent??"");!r||Mo.test(r)||ga.test(r)||e.has(r)||(e.add(r),o.push(r))}return o}function Xc(t){let e=t.el.querySelectorAll(l.generatedImage).length;if(t.role==="assistant"&&e)return e>1?`Image \xD7${e}`:"Image";let o=t.el.closest(l.turn);if(t.role==="assistant"&&o&&t.el.matches(l.assistantMarkdown)&&!t.el.closest(l.searchUnit)){let c=ua(o);if(c.length)return c.join(" \xB7 ")}let n=t.el.querySelector(t.role==="assistant"?l.markdown:".whitespace-pre-wrap")??t.el,i=[...n.querySelectorAll(Zc)].map(c=>A(c.textContent??"")).filter(Boolean).reduce((c,u)=>c.replace(u,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(A).filter(c=>c&&!ga.test(c)&&!Mo.test(c));if(a.length)return a.join(" ");if(t.role==="assistant"&&o){let c=ua(o);if(c.length)return c.join(" \xB7 ")}let d=i.split(`
`).map(A).filter(c=>Mo.test(c));return d.length?d.at(-1)??"":t.role==="user"&&t.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function Lo(t){return t.text?A(t.text):t.imageCount?t.imageCount>1?`Image \xD7${t.imageCount}`:"Image":t.hasFiles?"File":""}var Yn=t=>t.matches(l.timelineScroll)&&getComputedStyle(t).flexDirection==="column-reverse";var ha=`/*
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
`;var B=E("bloom-nav-"),Io=80,_c=1200,tu=2,ba=3e4,eu=200,ou=.9,nu=.28,ru=24,de=8,iu=80,au=12,su={user:"\u2753",assistant:"\u{1F916}"},lu=["wheel","touchmove","pointerdown"],Oo=h({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),I=null,M=[],J=-1,Ft=-1,me=null,ko="",Qn=0,Aa=[],Fe=null,Bo=null,Gt,Ne,Wn="",Ue=[],Po=null,zn=new Set,cu=t=>Oo.store.showAssistant||t.role==="user",uu=t=>t.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||t.messageIds[0]||t.role;function du(t){return{role:t.role,summary:ue(t),ids:t.messageIds,turn:t,streaming:t.streaming}}function wa(t,e){let o=t.entries.at(-1);if(o?.role==="assistant"&&e.role==="assistant"){t.entries[t.entries.length-1]={...e,ids:[...new Set([...o.ids,...e.ids])]};return}t.entries.push(e)}function mu(){let t=[];for(let e of qt()){let o=du(e),n=uu(e),r=t.at(-1);r?.key===n?wa(r,o):t.push({key:n,entries:[o]})}return t}function pu(){let t=[];for(let e of ct(g())?.chain??[]){let o={role:e.role,summary:Lo(e),ids:[e.id],turn:null,streaming:!1},n=t.at(-1);e.role==="assistant"&&n?wa(n,o):t.push({key:e.id,entries:[o]})}return t}var pe=t=>t.entries.flatMap(e=>e.ids);function Vn(t,e){let o=new Set(pe(t));return pe(e).some(n=>o.has(n))}var Kt=t=>A(t.entries.find(e=>e.role==="user")?.summary??""),jn=(t,e)=>t.filter(o=>Kt(o)===e).length,Jn=t=>({...t,turn:null,streaming:!1});function fu(t,e){let o=new Set(e.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return t.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return Jn(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?Jn(r):r})}))}function gu(t,e){let o=e.entries.map((n,r)=>{let i=t.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of t.entries.slice(o.length))o.push(Jn(n));return{key:t.key,entries:o}}function Sa(){let t=De();if(!t)return!1;let e=t.clientHeight-t.scrollHeight;return t.scrollTop-e<=Math.abs(t.scrollTop)}function hu(t,e){let o=fu(t,e);if(!e.length)return o;if(!o.length)return e;let n=e.findIndex(c=>o.some(u=>u.key===c.key));if(n<0)return Sa()?e.concat(o):o.concat(e);let r=e[n]?.key,i=o.findIndex(c=>c.key===r),a=o.slice(0,i).concat(e.slice(0,n),o.slice(i)),d=a.findIndex(c=>c.key===r);for(let c=n;c<e.length;c++){let u=e[c];if(!u)continue;let m=a.findIndex(v=>v.key===u.key);if(m>=0){let v=a[m];v&&(a[m]=gu(v,u)),d=m}else a.splice(d+1,0,u),d++}return a}function bu(t,e){let o=0,n=0,r=0;for(let i=1-t.length;i<e.length;i++){let a=0,d=0;for(let u=0;u<t.length;u++){let m=e[u+i],v=t[u];!m||!v||(Vn(v,m)?(a+=3,d++):Kt(v)&&Kt(v)===Kt(m)&&a++)}let c=Sa()?i<r:i>r;(a>o||a===o&&d>n||a===o&&d===n&&c)&&(o=a,n=d,r=i)}return{score:o,offset:r}}function Au(t,e){let o=t.entries.map((n,r)=>{let i=e.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of e.entries.slice(o.length))o.push({...n,turn:null});return{key:t.key,entries:o}}function yu(t){return t.map(e=>({key:e.key,entries:e.entries.map(o=>({...o}))}))}function vu(t,e){if(!e.length)return t;if(!t.length)return e;let{score:o,offset:n}=bu(t,e),r=yu(t);if(o>0)for(let d=0;d<r.length;d++){let c=e[d+n],u=r[d];if(!c||!u)continue;let m=Kt(u),v=!!m&&m===Kt(c)&&jn(t,m)===1&&jn(e,m)===1;(Vn(u,c)||v)&&(r[d]=Au(u,c))}let i=[],a=[];for(let d=0;d<e.length;d++){let c=e[d];if(!c)continue;let u=Kt(c);!u||jn(r,u)>0||r.some(m=>Vn(m,c))||(o>0&&d<n?i.push(c):a.push(c))}return i.concat(r,a)}var Zn=t=>t.entries.some(e=>e.turn?.el.isConnected);function qu(t,e,o){let n=t.findIndex(i=>pe(i).includes(e));if(n>=0)return n+1;let r=t.find(Zn);return o&&r&&pe(r).includes(o)?0:t.length}function xu(t){if(Po){let{parent:e,user:o}=Po;for(let n of t.slice(qu(t,e,o))){let r=pe(n);if(!Zn(n)&&!(o&&r.includes(o)))for(let i of r)zn.add(i)}}return t.filter(e=>Zn(e)||!pe(e).some(o=>zn.has(o)))}function Ea(){Ue=[],Po=null,zn.clear()}function wu(){let t=pa();t!==Wn&&(Wn=t,Ea());let e=mu(),o=pu();return!e.length&&!o.length&&!ma()?(Ue=[],[]):(Ue=xu(vu(hu(Ue,e),o)),Ue.flatMap(n=>n.entries).filter(cu))}function Su(t){for(let o of t)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!j().generating||t.some(o=>o.streaming))return;let e=t.at(-1);e&&(e.role==="assistant"||!Oo.store.showAssistant?e.streaming=!0:t.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function Ta(){let t=wu();return Su(t),t}function Ma(t){let e=t.getBoundingClientRect(),o=F()?.getBoundingClientRect().top,n=Math.min(e.bottom,o&&o>e.top?o:e.bottom);return{top:e.top,bottom:n}}function Ca(t){return((t.matches(".whitespace-pre-wrap, .markdown, .prose, [data-markdown-text-style]")?t:t.querySelector(".whitespace-pre-wrap")??t.querySelector(".markdown, .prose, [data-markdown-text-style]"))??t).getBoundingClientRect().top}function ya(t){let e=M[t]?.turn?.el;return e?.isConnected?e:null}function Eu(t){if(!M.length)return null;let e=t.scrollHeight-t.clientHeight,o=Yn(t),n=Math.min(t.scrollTop,0),r=o?-n:e-t.scrollTop,i=o?e+n:t.scrollTop,a=e<=de||r<=de,d=e>de&&i<=de,{top:c,bottom:u}=Ma(t),m=ya(0),v=m?Ca(m):Number.NaN,H=!!m&&v>=c-de&&v<=c+48,b=ya(M.length-1),R=b?.getBoundingClientRect().bottom??Number.NaN,Tt=!!b&&R<=u+de&&R>=u-iu;return a||Tt?"bottom":d||H?"top":null}function Tu(t){let{top:e,bottom:o}=Ma(t),n=e+Math.max(o-e,0)*nu,r=[],i=-1;if(M.forEach((d,c)=>{let u=d.turn?.el;if(!u?.isConnected){r.push(Number.NaN);return}let m=Ca(u);r.push(m),i<0&&(i=c),m<=n&&(i=c)}),i<0)return Math.max(M.findIndex(d=>d.turn),0);let a=r[J];return Number.isFinite(a)?i===J?J:i>J?i:a<=n+ru?J:i:i}function Mu(t){let e=Eu(t);return e==="bottom"?M.length-1:e==="top"?0:Tu(t)}function va(t){Oo.store.jumpEffect==="border"&&(t.classList.add(B("flash")),setTimeout(()=>t.classList.remove(B("flash")),_c))}function Ho(t){let e=M[t],o=De();if(!e||!o)return;if(!e.turn&&!e.ids.length){Ft=t,Ge(),o.scrollTo({top:Yn(o)?0:o.scrollHeight});return}Ft=t,me=t?null:{chat:g(),first:e.ids[0],until:Date.now()+ba},Ge();let n=e.turn?.el;if(n?.isConnected){let u=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:u<o.clientHeight*tu?"smooth":"auto"}),va(n);return}let r=M.findIndex(u=>u.turn),i=r>=0&&t<r?-1:1,a=++Qn,d=Date.now()+ba,c=()=>{let u=De();if(a!==Qn||Date.now()>d||!u)return;M=Ta();let m=M.find(H=>H.ids.some(b=>e.ids.includes(b)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),va(m),Ft=M.findIndex(H=>H.turn?.el===m),Ge();return}let v=u.scrollTop;u.scrollBy({top:i*u.clientHeight*ou,behavior:"instant"}),u.scrollTop===v?setTimeout(c,eu):requestAnimationFrame(c)};c()}function Cu(t,e){return s("button",{class:B("row"),attrs:{type:"button","data-index":String(e),"data-message-id":t.ids[0]??""},on:{click:()=>Ho(e)}},s("span",{text:su[t.role]}),s("span",{class:"bloom-truncate",text:_(t.summary||"\u2026",Io)}))}function qa(t){if(!I)return;let e=t.getBoundingClientRect(),o=F()?.getBoundingClientRect().top,r=Math.min(e.bottom,o&&o>e.top?o:e.bottom)-e.top;I.style.right=`${document.documentElement.clientWidth-e.left-t.clientLeft-t.clientWidth+au}px`,I.style.top=`${e.top}px`,I.style.height=r>1?`${r}px`:""}function Lu(){let t=De();if(M=Ta(),!M.length||!t){I?.remove(),I=null,ko="";return}if(Fe!==t){Ne?.abort(),Ne=new AbortController,t.addEventListener("scroll",ee(Ge),{passive:!0,signal:Ne.signal});for(let n of lu)t.addEventListener(n,La,{passive:!0,signal:Ne.signal});Fe=t,Gt?.disconnect(),Gt=new ResizeObserver(()=>{t.isConnected&&qa(t)}),Gt.observe(t),Bo=null}let e=F();e&&e!==Bo&&Gt&&(Gt.observe(e),Bo=e),I??=s("div",{class:`bloom-root ${B("root")}`,attrs:{"data-bloom":"navigator"}},s("div",{class:B("rail")}),s("div",{class:B("toc")},s("div",{class:B("toc-head")}),s("div",{class:B("toc-list")}))),I.isConnected||document.body.append(I),qa(t);let o=JSON.stringify(M.map(n=>[n.role,n.ids]));o!==ko?(ko=o,Ft=-1,Bu(),me&&Date.now()<me.until&&me.chat===g()&&M[0]?.ids[0]!==me.first&&Ho(0)):ku(),Ge()}function Ge(){if(!I||!Fe)return;J=Ft>=0?Ft:Mu(Fe),I.querySelectorAll(`.${B("tick")}`).forEach((e,o)=>e.classList.toggle(B("tick-current"),o===J)),I.querySelectorAll(`.${B("row")}`).forEach(e=>e.setAttribute("aria-current",String(Number(e.dataset.index)===J)));let t=I.querySelector(`.${B("toc-head")}`);t&&(t.textContent=`${J+1} / ${M.length}`)}function ku(){I?.querySelectorAll(`.${B("tick")}`).forEach((t,e)=>{let o=M[e],n=_(o.summary,Io);t.title!==n&&(t.title=n),t.classList.toggle(B("tick-streaming"),o.streaming)}),I?.querySelectorAll(`.${B("row")}`).forEach(t=>{let e=t.lastElementChild,o=_(M[Number(t.dataset.index)].summary||"\u2026",Io);e&&e.textContent!==o&&(e.textContent=o)})}function Bu(){I?.querySelector(`.${B("rail")}`)?.replaceChildren(...M.map((e,o)=>s("button",{class:so(B("tick"),B(`tick-${e.role}`),e.streaming&&B("tick-streaming"),o===J&&B("tick-current")),title:_(e.summary,Io),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":e.ids[0]??""},on:{click:()=>Ho(o)}}))),I?.querySelector(`.${B("toc-list")}`)?.replaceChildren(...M.map(Cu))}var rt=ee(Lu);function La(){Ft=-1,me=null,Qn++}var Iu=t=>!!t&&(t.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!t.closest("[contenteditable='true']"));function xa(t){if(!I||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey||Iu(document.activeElement)||tt("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:J-1,ArrowDown:J+1,Home:0,End:M.length-1}[t.key];if(o==null){La();return}o<0||o>=M.length||(t.preventDefault(),t.stopPropagation(),Ho(o))}var ka=f({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:Oo,styles:ha,start(){Aa=[w(t=>T(t)&&rt()),et(rt),vt.on("conversation",rt),vt.on("generate-start",({parentId:t,userId:e})=>{t&&(Po={parent:t,user:e},rt())}),k.on("rise",rt),k.on("fall",rt)],addEventListener("keydown",xa,!0),addEventListener("resize",rt,{passive:!0}),rt()},stop(){for(let t of Aa)t();Ne?.abort(),Gt?.disconnect(),Gt=void 0,Fe=null,Bo=null,removeEventListener("keydown",xa,!0),removeEventListener("resize",rt),I?.remove(),I=null,ko="",Ea(),Wn=""},onSettingsChange:rt});var Ba=`/*
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
`;var K=E("bloom-quotes-"),ir="BloomBetterQuotes",Ou=40,Ha=8,Hu=1800,tr=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,Ia=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,Yt=h({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),Xn,$n,fe,_n=!1,er=0,Ro=null,Do=null,ut=null;function ar(){return g()??"draft"}function Uo(){try{let t=JSON.parse(sessionStorage.getItem(ir)??"[]");return Array.isArray(t)?t.filter(e=>!!e&&typeof e=="object"&&typeof e.id=="string"&&typeof e.text=="string"&&!!e.text):[]}catch{return[]}}function sr(t){try{sessionStorage.setItem(ir,JSON.stringify(t.slice(-Ou)))}catch{}}function Ke(t){return Uo().find(e=>e.id===t)?.text??""}function Ru(t,e){let o=Uo().filter(n=>n.id!==t);o.push({id:t,text:e}),sr(o)}function or(t=ar()){sr(Uo().filter(e=>e.id!==t)),No()}function Du(t){let e=Ke("draft");if(!e||Ke(t))return;let o=Uo().filter(n=>n.id!=="draft");o.push({id:t,text:e}),sr(o)}function nr(t){return`${t.getAttribute("aria-label")??""} ${t.getAttribute("title")??""}`}function Nu(t){let e=nr(t);return Ia.test(e)&&!/quote|引用/.test(e)?!1:/quote|引用/.test(e)&&tr.test(e)?!0:tr.test(e)&&!Ia.test(e)}function Ra(t){let e=t.cloneNode(!0),o=[...e.querySelectorAll("button, [role='button']")],n=new Set(o.map(r=>r.getAttribute("aria-label")).filter(Boolean));for(let r of o)r.remove();for(let r of e.querySelectorAll("*"))!r.children.length&&n.has(A(r.textContent??""))&&r.remove();return A(e.textContent??"")}function Uu(t){let e=F(),o=t.parentElement,n=0;for(;o&&o!==e&&n<5;){if(n++,o.matches(l.composerInput)||o.querySelector(l.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=Ra(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function Go(){let t=F();if(!t)return null;for(let e of t.querySelectorAll("button, [role='button']")){if(e.closest("[data-bloom]")||!Nu(e))continue;let o=Uu(e),n=o?Ra(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:e}}return null}function Gu(t){let e=t.closest(l.searchUnit)??t.closest(l.oldMessage);return e&&(le(e)??e.getAttribute("data-message-author-role"))==="user"?e:null}function lr(t){return A(t).slice(0,48)}function Fu(t,e){let o=lr(t);if(o.length<Ha)return null;let n=null;for(let r of ce()){if(e&&(r===e||e.contains(r)||r.contains(e)))continue;let i=A(r.textContent??"");if(!i.includes(o))continue;let a=o.length/Math.max(i.length,1);(!n||a>n.score)&&(n={el:r,score:a})}return n?.el??null}function Ku(t,e){let o=lr(e),n=t;for(let r of t.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&A(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${K("hit")}`)?.classList.remove(K("hit")),n.classList.add(K("hit")),window.clearTimeout(er),er=window.setTimeout(()=>n.classList.remove(K("hit")),Hu)}function Pa(t){let e=t.closest(l.timelineScroll)??document.scrollingElement;if(!(e instanceof HTMLElement)&&e!==document.scrollingElement)return;let o=t.getBoundingClientRect();if(o.height<1||!e)return;let n=e.getBoundingClientRect(),r=F()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,a=o.top+o.height/2-(n.top+i)/2;Math.abs(a)<8||e.scrollTo({top:e.scrollTop+a,behavior:"smooth"})}function cr(){if(!ut||!Ro?.isConnected)return;let t=Ro.getBoundingClientRect();t.width<1||(ut.style.top=`${Math.max(8,t.top+8)}px`,ut.style.left=`${Math.max(8,t.right-ut.offsetWidth-8)}px`)}function Yu(t,e,o){Ro=t,Do=e,ut??=s("button",{class:`bloom-root ${K("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),ut.isConnected||document.body.append(ut),Ku(t,o),cr()}function Oa(){ut?.remove(),ut=null,Ro=null,Do=null,document.querySelector(`.${K("hit")}`)?.classList.remove(K("hit"))}function Da(){return document.querySelector('[data-bloom="quote-chip"]')}function No(){Da()?.remove()}function ju(t){let o=F()?.getBoundingClientRect();!o||o.width<8||(t.style.width=`${Math.max(120,o.width-24)}px`,t.style.left=`${o.left+12}px`,t.style.top=`${Math.max(8,o.top-t.offsetHeight-8)}px`)}function Qu(t){let e=Da();e||(e=s("div",{class:`bloom-root ${K("chip")}`,attrs:{"data-bloom":"quote-chip"}},s("span",{class:K("text")}),s("button",{class:K("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(e));let o=e.querySelector(`.${K("text")}`),n=A(t);o&&o.textContent!==n&&(o.textContent=n),e.dataset.text=t,ju(e)}function rr(){if(!_n){_n=!0;try{let t=ar(),e=Go();Yt.store.persistAcrossChats&&e&&Ke(t)!==e.text&&Ru(t,e.text);let o=Yt.store.persistAcrossChats?Ke(t):"";!o||e&&A(e.text)===A(o)?No():Qu(o),cr()}finally{_n=!1}}}function Wu(t){let e=t.closest('[data-bloom="quote-chip"]');if(e instanceof HTMLElement&&!t.closest(`.${K("x")}`)){let i=e.dataset.text??e.querySelector(`.${K("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:e}:null}let o=t.closest("blockquote");if(o instanceof HTMLElement&&!t.closest("a, button")){let i=Gu(o),a=A(o.textContent??"");if(i&&a)return{text:a,skip:i,origin:o}}let n=F();if(!n||!n.contains(t)||ke(t)||t.closest("button, [role='button']"))return null;let r=Go();return!r||!r.row.contains(t)?null:{text:r.text,skip:null,origin:r.row}}function zu(t){let{target:e}=t;if(!(e instanceof Element))return;if(e.closest('[data-bloom="quote-back"]')){t.preventDefault(),t.stopPropagation(),Do?.isConnected&&Pa(Do);return}if(e.closest(`.${K("x")}`)){t.preventDefault(),t.stopPropagation(),or();return}let o=Go();if(o&&(e===o.dismiss||o.dismiss.contains(e))){or();return}if(Vu(e)&&Na(),!Yt.store.jumpToPassage)return;let n=Wu(e);if(!n)return;let r=Fu(n.text,n.skip);r&&(t.preventDefault(),t.stopPropagation(),Yu(r,n.origin,n.text),Pa(r))}function Vu(t){let e=t.closest("button, [role='button']");return!(e instanceof HTMLElement)||e.closest("[data-bloom]")||!F()?.contains(e)?!1:/send|submit|发送|提交/i.test(nr(e))&&!tr.test(nr(e))}function Ju(t){return!(t instanceof KeyboardEvent)||t.key!=="Enter"||t.shiftKey||t.isComposing?!1:ke(t.target)}function Na(){if(!Yt.store.persistAcrossChats)return;let t=ar(),e=Ke(t);if(e){if(!Go()){let o=D(),n=lr(e);n.length>=Ha&&!A(o).includes(n)&&At(`> ${e}

${o}`.trim())}or(t)}}function Zu(t){Ju(t)&&Na()}function Xu(t){!t.prevId&&t.id&&Du(t.id),rr()}var Ua=f({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:Yt,styles:Ba,onSettingsChange(t){t==="jumpToPassage"&&!Yt.store.jumpToPassage&&Oa(),t==="persistAcrossChats"&&!Yt.store.persistAcrossChats&&(sessionStorage.removeItem(ir),No()),rr()},start(){fe=new AbortController,document.addEventListener("pointerdown",zu,{capture:!0,signal:fe.signal}),document.addEventListener("keydown",Zu,{capture:!0,signal:fe.signal}),addEventListener("scroll",cr,{capture:!0,passive:!0,signal:fe.signal}),$n=et(Xu),Xn=w(t=>T(t)&&rr())},stop(){fe?.abort(),fe=void 0,$n?.(),$n=void 0,Xn?.(),Xn=void 0,window.clearTimeout(er),Oa(),No()}});var Ga=`/*
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
`;var _u="[data-app-action-sidebar-thread-row]{position:relative}[data-app-action-sidebar-thread-row]>[data-bloom=cls]{position:absolute;inset-inline-end:0.25rem;top:50%;width:0.875rem;height:0.875rem;margin:0;transform:translateY(-50%);pointer-events:none}",td=E("bloom-cls"),ed="bloom-cls",od=600*1e3,dr=Zr("tab"),he=new Map,je=new Map,ge=null,Fa=[],nd=t=>t==="streaming"||t==="error";function rd(){let t=new Map,e=Date.now();for(let[o,n]of je)e-n.at>od?je.delete(o):t.set(o,n.status);for(let[o,n]of he)t.set(o,n);return t}function id(t){return s("span",{class:`bloom-root ${td("",`-${t}`)}`,attrs:{"data-bloom":"cls","data-status":t,"aria-label":t==="error"?"Error":"Generating"}},t==="error"&&N("alert"))}function Ye(){let t=rd(),e=new Set;for(let[o,n]of t)for(let r of He(o)){if(!z(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){e.add(i);continue}i?.remove();let a=id(n);e.add(a),r.append(a)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))e.has(o)||o.remove()}function Fo(t,e){t&&(e?he.set(t,e):he.delete(t),ge?.postMessage({tab:dr,id:t,status:e}),Ye())}function ad({data:t}){!gt(t)||typeof t.id!="string"||typeof t.tab!="string"||t.tab===dr||(nd(t.status)?je.set(t.id,{status:t.status,tab:t.tab,at:Date.now()}):je.delete(t.id),Ye())}function ur(){for(let t of he.keys())ge?.postMessage({tab:dr,id:t,status:null})}var Ka=f({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:()=>`${Ga}${_u}`,start(){ge=typeof BroadcastChannel=="function"?new BroadcastChannel(ed):null,ge?.addEventListener("message",ad),addEventListener("pagehide",ur),Fa=[k.on("rise",({conversationId:t})=>Fo(t,"streaming")),k.on("fall",({conversationId:t,outcome:e})=>Fo(t,e==="error"?"error":null)),k.on("context",({prevId:t,id:e,migrated:o})=>{o&&j().generating?Fo(e,"streaming"):!o&&he.get(t??"")==="streaming"&&Fo(t,null)}),w(t=>T(t)&&Ye())],g()&&Ye()},stop(){for(let t of Fa)t();ur(),ge?.close(),ge=null,removeEventListener("pagehide",ur),he.clear(),je.clear(),Ye()}});var xt="data-bloom-invite",sd=/^(?:invite team members|invite members|邀请团队成员|邀请成员)$/i,Ya=':is(button, a:not([href^="/c/"])):not(main *, [role="dialog"] *)',ld={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${l.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])'],hideInvite:[`[${xt}]`,`div:has(> [${xt}]:only-child)`]},ja=h({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0},hideInvite:{type:"boolean",description:"Hide Invite team members in the sidebar.",default:!0}}),Ko,mr=!1;function cd(t){if(T(t))for(let e of document.querySelectorAll(`${Ya}, [${xt}]`))!e.matches(Ya)||!sd.test(A(e.textContent??""))?e.removeAttribute(xt):e.hasAttribute(xt)||e.setAttribute(xt,"")}var Qa=f({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads, notices and Invite team members.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:ja,styles:()=>Xt(Object.entries(ld).flatMap(([t,e])=>ja.store[t]?e:[])),start(){mr=!0,ot().then(()=>{mr&&!Ko&&(Ko=w(cd))})},stop(){mr=!1,Ko?.(),Ko=void 0;for(let t of document.querySelectorAll(`[${xt}]`))t.removeAttribute(xt)}});var Ae=`form:has(:is(${l.composerInput})), ${l.oldComposerForm}`,jo='[class*="ComposerLayoutBody"]',Qo='[class*="ComposerLayoutRoot"]',ud='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',dd=`:is(${Ae}) ${jo}, :is(${Ae}):not(:has(${jo})) ${Qo}, :is(${Ae}):not(:has(${jo})):not(:has(${Qo})) :is(${ud})`,md='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',pd='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]';var fd='[data-chatgpt-composer], [data-composer-input], [data-composer-layout], [class*="ComposerLayoutRoot"], [class*="ComposerLayoutBody"]',be="composer-fill",fr=h({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function gd(){let{opacity:t,blur:e}=fr.store;if(t>=100)return"";let o="var(--composer-background-color, var(--color-background-composer-surface, var(--color-bg-primary, Canvas)))",n="background-color:transparent!important;background-image:none!important;box-shadow:none!important",r=`background-color:color-mix(in srgb, ${o} ${t}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${e}px)!important;-webkit-backdrop-filter:blur(${e}px)!important`;return`${fd}{${n}}[data-bloom="${be}"]{position:absolute;pointer-events:none;z-index:-1;background-color:color-mix(in srgb, ${o} ${t}%, transparent);background-image:none;backdrop-filter:blur(${e}px);-webkit-backdrop-filter:blur(${e}px)}`}function hd(){let t=[...document.querySelectorAll(Qo)].filter(X);if(t.length)return t;let e=F();return e?[e]:[]}function bd(t){let e=[...t.querySelectorAll('[class*="ComposerLayoutInput"]')].filter(a=>X(a)&&a.getBoundingClientRect().height>=8),o=1/0,n=1/0,r=-1/0,i=-1/0;for(let a of e.length?e:[t]){let d=a.getBoundingClientRect();o=Math.min(o,d.top),n=Math.min(n,d.left),r=Math.max(r,d.right),i=Math.max(i,d.bottom)}return{top:o,left:n,width:r-n,height:i-o}}function Ad(t,e){let o=e.getBoundingClientRect(),n=bd(e);t.style.top=`${n.top-o.top}px`,t.style.left=`${n.left-o.left}px`,t.style.width=`${Math.max(0,Math.min(n.width,o.width||n.width))}px`,t.style.height=`${Math.max(0,n.height)}px`;let r=yd(e);r&&(t.style.borderRadius=r)}function yd(t){let e=t.querySelector('[class*="ComposerLayoutInput"]')??t,o=getComputedStyle(e).borderRadius;return o&&o!=="0px"?o:getComputedStyle(t).borderRadius}function Wa(t=[]){if(t.length&&!T(t))return;if(fr.store.opacity>=100){for(let o of document.querySelectorAll(`[data-bloom="${be}"]`))o.remove();return}let e=new Set;for(let o of hd()){if(!z(o))continue;let n=o.querySelector(`:scope > [data-bloom="${be}"]`);n||(n=s("div",{attrs:{"data-bloom":be}}),o.prepend(n)),Ad(n,o),e.add(n)}for(let o of document.querySelectorAll(`[data-bloom="${be}"]`))e.has(o)||o.remove()}var Yo,pr=!1,za=f({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:fr,styles:gd,start(){pr=!0,ot().then(()=>{pr&&!Yo&&(Yo=w(Wa))})},stop(){pr=!1,Yo?.(),Yo=void 0;for(let t of document.querySelectorAll(`[data-bloom="${be}"]`))t.remove()},onSettingsChange(){Wa()}});var vd=1200,qd=8e3,xd=150,wd=20,Va=6,br="continue where you left",Sd=/message delivery timed out|please try again/i,Ja=/waiting for the complete answer/i,Za=h({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:br,placeholder:br}}),gr=[],zo=0,Qe=!1,We=0,ve="",Wo="",Ar=0,qe=!1,ze=!1,Vo=!0,ye="",yr=0,Jo=!1,Ed=()=>Za.store.prompt.trim()||br;function Xa(){return(tt(l.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function $a(){let t=Xa();return!t||Ja.test(t)||!Sd.test(t)?"":t}function Td(){let t=Xa();return t&&Ja.test(t)?t:""}function Md(){let t=Co()?.querySelectorAll(l.turn),e=t?.[t.length-1];return`${e?.getAttribute("data-turn-key")??""}:${e?.textContent?.length??0}`}function _a(t,e,o){if(o===zo){if(j().generating||D()!==t||e>=wd){qe=!1,j().generating||(ve="");return}ki(),setTimeout(()=>_a(t,e+1,o),xd)}}function Cd(t){let e=zo;if(j().generating||D()&&D()!==t){qe=!1,ve="";return}At(t),Jo=!0,xn(()=>{e===zo&&_a(t,0,e)})}function ts(t){return t===ve||We>=Va||j().generating||D()?!1:(ve=t,We+=1,qe=!0,Cd(Ed()),!0)}function Ld(){if(Qe||qe||ze)return;let t=Date.now(),e=$a();if(e){if(ye="",e!==Wo){Wo=e,Ar=t;return}if(t-Ar<vd)return;ts(`${g()??""}:${e}`);return}if(Wo="",!Td()){Vo=!0,ye="";return}if(!Vo||!j().generating||D())return;let n=`${g()??""}:${Md()}`;if(n!==ye){ye=n,yr=t;return}if(t-yr<qd||We>=Va)return;let r=wn();r&&(ze=!0,r.click())}function hr(){zo+=1,Qe=!1,We=0,ve="",Wo="",Ar=0,qe=!1,ze=!1,Vo=!0,ye="",yr=0,Jo=!1}var es=f({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:Za,start(){hr(),gr=[k.on("rise",()=>{Qe=!1,ve="",qe=!1,Jo&&(Jo=!1,Vo=!1,ye="")}),k.on("fall",({outcome:t})=>{if(ze){ze=!1,t==="left"?Qe=!0:ts(`${g()??""}:stall`);return}(t==="stopped"||t==="left")&&(Qe=!0),t==="done"&&!$a()&&(We=0)}),k.on("context",({migrated:t})=>{t||hr()}),k.on("tick",Ld)]},stop(){for(let t of gr)t();gr=[],hr()}});var dt=E("bloom-csi-"),kd=256,Bd=160,Zo=1,os=4,Id=.1,Pd=.0015,Od=250;function Hd(t){return new Promise((e,o)=>{let n=new FileReader;n.onload=()=>e(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(t)})}function Rd(t){return new Promise((e,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>e(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=t})}function Dd(t,e){let o=Math.max(1/t.naturalWidth,1/t.naturalHeight)*e.zoom,n=1/(2*t.naturalWidth*o),r=1/(2*t.naturalHeight*o);return{zoom:e.zoom,x:ft(e.x,n,1-n),y:ft(e.y,r,1-r)}}function ns(t,e,o){let n=t.width,r=t.getContext("2d");if(!r)return;let i=Math.max(n/e.naturalWidth,n/e.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(e,n/2-o.x*e.naturalWidth*i,n/2-o.y*e.naturalHeight*i,e.naturalWidth*i,e.naturalHeight*i)}function Nd(t,e){let o=s("canvas");return o.width=o.height=kd,ns(o,t,e),o.toDataURL("image/png")}function rs(t){let e=null,o={x:P.store.cropX,y:P.store.cropY,zoom:P.store.cropZoom},n,r=s("canvas",{class:dt("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=Bd*devicePixelRatio;let i=s("div",{class:`bloom-muted ${dt("status")}`}),a=s("div",{class:dt("zoom")}),d=s("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function c(b,R=!0){e&&(o=Dd(e,b),ns(r,e,o),R&&(clearTimeout(n),n=setTimeout(()=>{e&&(P.store.cropX=o.x,P.store.cropY=o.y,P.store.cropZoom=o.zoom,P.store.avatarUrl=Nd(e,o))},Od)))}function u(){a.replaceChildren(qo(o.zoom,Zo,os,Id,"\xD7",b=>c({...o,zoom:b})))}async function m(b,R){i.textContent="";try{e=await Rd(b),R&&(P.store.avatarSource=b,o={x:.5,y:.5,zoom:Zo}),t.classList.add(dt("has-image")),u(),c(o,R)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let v=b=>{b?.type.startsWith("image/")&&Hd(b).then(R=>m(R,!0))};d.addEventListener("change",()=>v(d.files?.[0])),r.addEventListener("wheel",b=>{e&&(b.preventDefault(),c({...o,zoom:ft(o.zoom*(1-b.deltaY*Pd),Zo,os)}),u())},{passive:!1}),r.addEventListener("pointerdown",b=>{if(!e)return;r.setPointerCapture(b.pointerId);let R={...o},Tt=r.getBoundingClientRect(),ro=io=>{if(!e)return;let W=Math.max(Tt.width/e.naturalWidth,Tt.height/e.naturalHeight)*o.zoom;c({...o,x:R.x-(io.clientX-b.clientX)/(e.naturalWidth*W),y:R.y-(io.clientY-b.clientY)/(e.naturalHeight*W)})};r.addEventListener("pointermove",ro),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",ro),{once:!0})});let H=s("div",{class:dt("cropper"),attrs:{tabindex:"0"},on:{paste:b=>v([...b.clipboardData?.files??[]].find(R=>R.type.startsWith("image/"))),dragover:b=>b.preventDefault(),drop:b=>{b.preventDefault(),v(b.dataTransfer?.files[0])}}},s("div",{class:dt("stage")},r),s("div",{class:dt("controls")},Pe("",b=>b.trim()&&void m(b.trim(),!0),"https://\u2026 or data:image/\u2026","url"),s("div",{class:dt("buttons")},U("Choose file",()=>d.click()),U("Reset crop",()=>{c({x:.5,y:.5,zoom:Zo}),u()}),U("Clear",()=>{e=null,t.classList.remove(dt("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),P.store.avatarUrl="",P.store.avatarSource=""},"danger")),a,i,d));return t.append(H),P.store.avatarSource&&m(P.store.avatarSource,!1),()=>{clearTimeout(n),t.replaceChildren()}}var is=`/*
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
`;var Ve="data-bloom-csi-avatar",vr="data-bloom-csi-sized",cs="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",Gd=32,P=h({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:t=>rs(t)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),as=[];function us(t){t.removeAttribute(Ve),t.removeAttribute(vr)}function ss(t){return(P.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${t}]`)])}function ls(t=[]){if(!T(t))return;let e=P.store.displayName.trim()||null,o=!!P.store.avatarUrl,n=new Set(e?ss("name"):[]);for(let i of document.querySelectorAll(cs))n.has(i)||Lt(i,null);for(let i of n)Lt(i,e);let r=new Set(o?ss("avatar"):[]);for(let i of document.querySelectorAll(`[${Ve}]`))r.has(i)||us(i);for(let i of r)i.hasAttribute(Ve)||i.setAttribute(Ve,""),i.toggleAttribute(vr,!i.closest('[role="menu"]'))}function Fd(){let t=P.store.avatarUrl;return t?`:root{--bloom-csi-url:url("${t.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${P.store.avatarSize}px}:is(${l.rail}, ${l.oldRail}) [${vr}]{--bloom-csi-size:${Gd}px}`:""}var ds=f({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:P,styles:()=>`${Fd()}
${is}`,start(){as=[nt(),w(ls)]},stop(){for(let t of as)t();for(let t of document.querySelectorAll(`[${Ve}]`))us(t);for(let t of document.querySelectorAll(cs))Lt(t,null)},onSettingsChange(){ls()}});var xe=E("bloom-greeting-"),ms=30,ps=100;function fs(t){let e=-1,o=s("textarea",{class:`bloom-input ${xe("input")}`,attrs:{maxlength:String(ps),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=U("Add",i),r=s("div",{class:xe("list")});function i(){let c=o.value.trim().slice(0,ps);if(!c)return;let u=[...S.store.greetings];e>=0?u[e]=c:u.length<ms&&u.push(c),S.store.greetings=u,e=-1,o.value="",a()}function a(){let{greetings:c}=S.store;n.textContent=e>=0?"Save":"Add",n.disabled=e<0&&c.length>=ms,r.replaceChildren(...c.length?c.map((u,m)=>s("div",{class:xe("row",m===e?"row-editing":"row-idle")},s("div",{class:xe("text"),text:u}),V("edit","Edit",()=>{e=m,o.value=u,o.focus(),a()}),V("trash","Delete",()=>{S.store.greetings=c.filter((v,H)=>H!==m),e===m&&(e=-1),a()}))):[s("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",c=>{c.key==="Enter"&&(c.ctrlKey||c.metaKey)&&i()}),t.append(s("div",{class:xe("editor")},r,s("div",{class:xe("form")},o,n))),a();let d=_t((c,u)=>c==="GreetingCustomizer"&&u==="greetings"&&a());return()=>{d(),t.replaceChildren()}}var gs=`/*
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
`;var _o="data-bloom-greeting",Yd=1e3,jd=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],S=h({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:t=>fs(t)},greetings:{type:"custom",default:jd},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),Xo,hs=[],qr,Ze=()=>vo()&&!kt(),Qd=t=>t.replaceAll(/\s*\n\s*/g," ").trim(),As=()=>S.store.greetings.filter(t=>typeof t=="string"&&t.trim());function Xe(){let t=As();if(t.length)if(S.store.order==="random"&&t.length>1){let e=S.store.lastRandom;for(;e===S.store.lastRandom;)e=Math.floor(Math.random()*t.length);S.store.lastRandom=e,S.store.index=e}else S.store.index=(S.store.index+1)%t.length}function Wd(){return Ze()?tt(l.homeHeading):null}function $o(){for(let t of document.querySelectorAll(`[${_o}]`))t.removeAttribute(_o),Lt(t,null)}function tn(){for(let t of document.querySelectorAll("[data-bloom-placeholder]"))t.removeAttribute("data-bloom-placeholder")}function bs(t){let e=lt(),o=Qd(t);if(!e||!o||D(e)){tn();return}e.getAttribute("data-bloom-placeholder")!==o&&e.setAttribute("data-bloom-placeholder",o)}function Je(){let t=As(),e=Pi(),o=Ze();if(!t.length||!e&&!o){$o(),tn();return}if(e){$o(),bs(t[0]??"");return}let n=Wd();n?((S.store.index<0||S.store.index>=t.length)&&Xe(),n.setAttribute(_o,""),Lt(n,t[Math.max(0,S.store.index)%t.length]??"")):$o(),S.store.heroOnlyOutsideProject?tn():bs(t[Math.max(0,S.store.index)%t.length]??"")}function xr(){clearInterval(Xo),Xo=void 0,S.store.mode==="interval"&&Ze()&&(Xo=setInterval(()=>{Xe(),Je()},S.store.intervalSec*Yd))}function zd(t){S.store.mode!=="manual"||!(t.target instanceof Element)||!t.target.closest(`[${_o}]`)||getSelection()?.toString()||(Xe(),Je())}function Vd(){Ze()&&S.store.mode==="refresh"&&Xe(),xr(),Je()}var ys=f({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:S,styles:gs,start(){qr=new AbortController,document.addEventListener("click",zd,{signal:qr.signal}),Ze()&&S.store.mode==="refresh"&&Xe(),xr(),hs=[w(t=>T(t)&&Je()),et(Vd)]},stop(){qr?.abort();for(let t of hs)t();clearInterval(Xo),$o(),tn()},onSettingsChange(t){(t==="mode"||t==="intervalSec")&&xr(),Je()}});var $e=E("bloom-history-"),wr=10,Jd=3e3;function vs(t){let e="",o=0,n=new Set,r=s("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=s("div",{class:$e("list")}),a=s("div",{class:$e("pager")}),d,c=U("Clear all",()=>{if(!d){c.textContent="Click again to clear",d=setTimeout(()=>{d=void 0,c.textContent="Clear all"},Jd);return}clearTimeout(d),d=void 0,c.textContent="Clear all",_e([])},"danger");function u(){let v=[...jt.store.entries].toReversed(),H=e.trim().toLowerCase(),b=H?v.filter(W=>W.toLowerCase().includes(H)):v,R=Math.max(1,Math.ceil(b.length/wr));o=Math.min(o,R-1);let Tt=b.slice(o*wr,(o+1)*wr).map(W=>s("div",{class:$e("row")},s("button",{class:$e("text",n.has(W)?"text-open":"text-closed"),text:W,title:n.has(W)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(W)||n.add(W),u()}}}),V("copy","Copy",()=>void $r(W)),V("trash","Delete",()=>_e(jt.store.entries.filter(El=>El!==W)))));i.replaceChildren(...Tt.length?Tt:[s("div",{class:"bloom-muted",text:H?"No matching prompts.":"No saved prompts yet."})]),a.replaceChildren(s("span",{class:"bloom-muted",text:`${b.length} ${H?"matching":"saved"} \xB7 page ${o+1} of ${R}`}),U("Previous",()=>{o--,u()}),U("Next",()=>{o++,u()}),c);let[ro,io]=a.querySelectorAll("button");ro.disabled=o===0,io.disabled=o>=R-1,c.disabled=!v.length}r.addEventListener("input",()=>{e=r.value,o=0,u()}),t.append(s("div",{class:$e("manager")},r,i,a)),u();let m=_t((v,H)=>v==="InputHistory"&&H==="entries"&&u());return()=>{m(),clearTimeout(d),t.replaceChildren()}}var qs=`/*
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
`;var Xd=E("bloom-history-"),$d=2e3,jt=h({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:t=>vs(t)},entries:{type:"custom",default:[]}}),Q=null,Sr={text:"",at:0},Qt=null,Er,en=()=>jt.store.entries.filter(t=>typeof t=="string");function _e(t){jt.store.entries=t.slice(-jt.store.maxEntries)}function Tr(t){let e=t.trim();if(!e)return;let o=Date.now();e===Sr.text&&o-Sr.at<$d||(Sr={text:e,at:o},_e([...en().filter(n=>n!==e),e]))}function _d(t,e){let o=lt();if(!o)return;Qt??=s("div",{class:`bloom-root ${Xd("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),Qt.textContent=`${t+1} / ${e}`;let n=(o.closest("form")??o).getBoundingClientRect();Qt.style.left=`${n.left+n.width/2}px`,Qt.style.top=`${n.top}px`,Qt.isConnected||document.body.append(Qt)}function to(){Q=null,Qt?.remove()}function tm(t){let e=en();if(!Q)return;let o=e[t];Q.index=t,Q.shown=o,At(o),_d(e.length-1-t,e.length)}function em(t){let e=en();if(!e.length)return!1;if(!Q){if(t===1)return!1;Q={index:e.length,draft:D(),shown:""}}let o=Q.index+t;return o<0?!0:o>=e.length?(At(Q.draft),to(),!0):(tm(o),!0)}function xs(t){return ke(t)?t:t instanceof HTMLElement?t.closest(l.composerInput):null}function om(){if(lt()?.closest("[data-chatgpt-composer], [data-composer-input], form")?.querySelector('[aria-expanded="true"]'))return!0;for(let e of document.querySelectorAll('[role="listbox"], [role="menu"], [data-radix-popper-content-wrapper], [cmdk-root], [cmdk-list]')){if(!(e instanceof HTMLElement)||e.closest("[data-bloom]"))continue;let o=getComputedStyle(e);if(!(o.display==="none"||o.visibility==="hidden"))return!0}return!1}function nm(t){if(t.isComposing||t.key==="Process"||t.keyCode===229)return;let e=xs(t.target);if(!e)return;if(t.key==="Enter"&&!t.shiftKey){Tr(D(e)),to();return}if(t.key==="Escape"&&Q){At(Q.draft),to(),t.preventDefault(),t.stopPropagation();return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.ctrlKey||t.metaKey||t.shiftKey||om())return;let o=Ci(e),n=t.key==="ArrowUp";!t.altKey&&!(n?o.first:o.last)||!n&&!Q||em(n?-1:1)&&(t.preventDefault(),t.stopPropagation())}function rm(t){Q&&xs(t.target)&&D()!==Q.shown.trim()&&to()}function im(t){t.target instanceof Element&&t.target.closest(l.sendButton)&&Tr(D())}var ws=f({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:jt,styles:qs,start(){Er=new AbortController;let{signal:t}=Er;document.addEventListener("keydown",nm,{capture:!0,signal:t}),document.addEventListener("input",rm,{capture:!0,signal:t}),document.addEventListener("click",im,{capture:!0,signal:t}),document.addEventListener("submit",()=>Tr(D()),{capture:!0,signal:t})},stop(){Er?.abort(),to()},onSettingsChange(t){t==="maxEntries"&&_e(en())}});var Ss=`/*
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
`;var sm=1500,lm=5e3,cm=2e3,ks=[{label:"UTC",value:"UTC"},{label:"\u7F8E\u56FD\u4E1C\u90E8",value:"America/New_York"},{label:"\u7F8E\u56FD\u4E2D\u90E8",value:"America/Chicago"},{label:"\u7F8E\u56FD\u5C71\u5730",value:"America/Denver"},{label:"\u7F8E\u56FD\u897F\u90E8",value:"America/Los_Angeles"},{label:"\u65E5\u672C",value:"Asia/Tokyo"},{label:"\u53F0\u6E7E",value:"Asia/Taipei"}],we=h({sourceTimeZone:{type:"select",description:"Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",options:ks,default:"UTC"},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),nn=new Map,Mr=new Set,Bs=0,rn,Es=[];function Is(t,e){nn.get(t)!==e&&(nn.set(t,e),clearTimeout(rn),rn=setTimeout(Ps,cm))}function Ps(){let t={...we.store.stamps,...Object.fromEntries(nn)};we.store.stamps=Object.fromEntries(Object.entries(t).toSorted((e,o)=>o[1]-e[1]).slice(0,sm))}function um(t){let e=ct(g())?.times;for(let o=t.length-1;o>=0;o--){let n=nn.get(t[o])??e?.get(t[o])??we.store.stamps[t[o]];if(n)return n}return null}var dm=()=>j().generating||Date.now()-Bs<lm;function Os(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function Hs(){let t=we.store.sourceTimeZone;if(!t||t==="UTC")return"UTC";try{return Intl.DateTimeFormat(void 0,{timeZone:t}),t}catch{return"UTC"}}function Rs(t,e){let o={};for(let n of new Intl.DateTimeFormat("en-US",{timeZone:e,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(t)))o[n.type]=n.value;return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour%24,mi:+o.minute,s:+o.second}}function Ds(t){return Date.UTC(t.y,t.m-1,t.d,t.h,t.mi,t.s)}function Ts(t,e){let o=t;for(let n=0;n<4;n++){let r=t-Ds(Rs(o,e));if(r===0)return o;o+=r}return o}function mm(t,e){if(e==="UTC")return t;let o=(t%1e3+1e3)%1e3,n=t-o,r=new Date(n),i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds()),a=Ts(i,e),d=3600*1e3,c=Number.POSITIVE_INFINITY;for(let u of[-d,0,d]){let m=a+u;Ds(Rs(m,e))===i&&m<c&&(c=m)}return c!==Number.POSITIVE_INFINITY?c+o:Ts(i+d,e)+o}function pm(t,e){let o=Hs();return e||o==="UTC"?t:mm(t,o)}function Ms(t,e){return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}function fm(t){let e=Os(),o=Date.now(),n={hour:"2-digit",minute:"2-digit",timeZone:e};if(Ms(t,e)===Ms(o,e))return new Intl.DateTimeFormat(void 0,n).format(t);let r=a=>new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric"}).format(a),i=r(t)===r(o)?{}:{year:"numeric"};return new Intl.DateTimeFormat(void 0,{...i,month:"short",day:"numeric",...n}).format(t)}function gm(t,e){let o=new Date(e).toLocaleString(void 0,{timeZone:Os()}),n=Hs();if(n==="UTC"||e===t)return o;let r=new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"}).format(t);return`${ks.find(a=>a.value===n)?.label??n} ${r} \u2192 ${o}`}function Ns(t){let e=le(t)??t.getAttribute("data-message-author-role")??t.closest(l.turn)?.getAttribute("data-turn")??t.querySelector(l.authorRole)?.getAttribute("data-message-author-role");if(Kn(e))return e;let o=Re(t).at(-1);return ct(g())?.chain.find(n=>n.id===o)?.role??null}var Cs='[class*="group/activity-header"]';function hm(t){let e=t.parentElement;if(!e)return null;let o=t.closest(l.turn);return o&&e!==o&&!o.contains(e)?null:e}function bm(t){let e=t;for(let o=0;o<8&&e;o++){let n=hm(e);if(!n)return null;let r=[...n.children],i=r.indexOf(e);for(let a=i-1;a>=0;a--){let d=r[a],c=d.matches(Cs)?d:d.querySelector(Cs);if(c)return c;if(d.matches(l.searchUnit)||d.querySelector(l.searchUnit))return null}if(n===e.closest(l.turn))return null;e=n}return null}function Am(t){let e=t.parentElement;for(let o=0;o<4&&e;o++){if(e.classList.contains("flex-col"))return e;e=e.parentElement}return t.parentElement??t}function Us(t,e){if(e==="assistant"){let o=bm(t);if(o)return Am(o)}return t}function ym(t,e){let o=ce();for(let n=o.length-1;n>=0;n--){let r=o[n];if(!(r!==t&&(Ns(r)!=="assistant"||Us(r,"assistant")!==e)))return r===t}return!0}function Ls(t){return t.querySelector(':scope > time[data-bloom="timestamp"]')}function vm(t){let e=Re(t);if(!e.length||!z(t)||t.querySelector("time:not([data-bloom])"))return;let o=Ns(t),n=Us(t,o);if(n!==t&&!ym(t,n)){Ls(t)?.remove();return}let r=um(e),i=!1;if(!r&&dm()){r=Date.now();let m=e.at(-1);Mr.add(m),Is(m,r),i=!0}else r&&Mr.has(e.at(-1))&&(i=!0);let a=n.querySelector('time[data-bloom="timestamp"]')??Ls(t);if(!r||we.store.hideOwnMessages&&o==="user"){a?.remove();return}let d=pm(r,i),c=fm(d);if(a?.textContent===c&&a.parentElement===n&&a===n.firstElementChild)return;let u=s("time",{class:`bloom-timestamp bloom-timestamp-${o??"assistant"}`,text:c,title:gm(r,d),attrs:{"data-bloom":"timestamp",datetime:new Date(d).toISOString()}});a&&a.replaceWith(u),(u.parentElement!==n||u!==n.firstElementChild)&&n.prepend(u)}var on=ee(()=>{for(let t of ce())vm(t)}),Gs=f({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:we,styles:Ss,start(){Es=[w(t=>T(t)&&on()),vt.on("conversation",on),vt.on("message-time",({messageId:t,time:e})=>{Mr.delete(t),Is(t,e),on()}),k.on("fall",()=>{Bs=Date.now()})]},stop(){for(let t of Es)t();rn&&(clearTimeout(rn),Ps());for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove()},onSettingsChange(t){if(t!=="stamps"){for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove();on()}}});var qm=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])','[data-chatgpt-composer] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-composer-input] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-codex-composer-root] button[aria-label^="Dictat" i], [data-composer-placement] button[aria-label^="Dictat" i], [class*="ComposerLayout"] button[aria-label^="Dictat" i]'],xm=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],Fs=h({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),Ks=f({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:Fs,styles:()=>Xt([...qm,...Fs.store.hideDictationSettings?xm:[]])});var Wt="data-bloom-share",wm=/^\/g\/g-p-/,Sm=/^(?:share|分享)$/i,Em=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],Tm=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${Wt}="project"]`],Cr=h({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),an,Lr=!1;function Mm(t){if(!T(t))return;let e=wm.test(location.pathname)&&!g();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${Wt}]`))!e||!Sm.test(A(o.textContent??""))?o.removeAttribute(Wt):o.hasAttribute(Wt)||o.setAttribute(Wt,"project")}var Ys=f({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:Cr,styles:()=>Xt([...Cr.store.hideShareChat?Em:[],...Cr.store.hideShareProject?Tm:[]]),start(){Lr=!0,ot().then(()=>{Lr&&!an&&(an=w(Mm))})},stop(){Lr=!1,an?.(),an=void 0;for(let t of document.querySelectorAll(`[${Wt}]`))t.removeAttribute(Wt)}});var js='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',Cm='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',Lm="[data-bloom-profile-plan]",Qs="visibility:hidden!important;user-select:none!important",zs=h({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function km(){let{hideUsername:t,hideEmail:e,enlargePlan:o,alignPlanWithAvatar:n}=zs.store,r=[];return t&&r.push(n?`:is(${js}){display:none!important}`:`:is(${js}){${Qs}}`),e&&r.push(`:is(${Cm}){${Qs}}`),t&&o&&r.push(`${Lm}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var Ws,Vs=f({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:zs,styles:km,start(){Ws=nt()},stop(){Ws?.()}});var Bm=new Set(["chatgpt","new chat","\u65B0\u804A\u5929","codex"]);function Im(){let t=A(document.title.replace(/\s*[|–-]\s*(?:ChatGPT|Codex)$/i,""));return t&&!Bm.has(t.toLowerCase())?t:null}function eo(t){return t?ea(t)??(t===g()?Im():null):null}var Js=`/*
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
`;var mt=E("bloom-recent-"),pt="home",Om=50,Zs=140,Hm=new Set(["Backquote"]),Rm=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),q=h({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(t=>({label:t,value:t})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),wt=null,it=[],at=0,kr,Xs=[],cn=()=>kt()?null:g()??(vo()?pt:null);function $s(t,e){return Object.fromEntries(Object.entries(t).filter(([o])=>e.has(o)))}function tl(t){let e=eo(t);e&&q.store.titles[t]!==e&&(q.store.titles={...q.store.titles,[t]:e});let o=oa(location.href);o&&t===g()&&q.store.projects[t]!==o&&(q.store.projects={...q.store.projects,[t]:o})}function _s(t){if(!t)return;let e=[t,...q.store.visits.filter(n=>n!==t)].slice(0,Om),o=new Set(e);q.store.visits=e,Object.keys(q.store.previews).some(n=>!o.has(n))&&(q.store.previews=$s(q.store.previews,o)),Object.keys(q.store.titles).some(n=>!o.has(n))&&(q.store.titles=$s(q.store.titles,o)),t!==pt&&tl(t)}function sn(t){if(!t||!q.store.visits.includes(t))return;let e={},o=ct(t)?.chain??[];for(let r of o)e[r.role]=_(Lo(r),Zs);if(t===g())for(let r of qt()){let i=ue(r);i&&(e[r.role]=_(i,Zs))}let n=q.store.previews[t];!e.user&&!e.assistant||n?.user===e.user&&n?.assistant===e.assistant||(q.store.previews={...q.store.previews,[t]:e})}function Dm(){let t=Number(q.store.maxRecent);return q.store.visits.filter(e=>e!==pt||q.store.includeHome).slice(0,t)}function Br(t){if(oo(),t===cn())return;let e=t===pt?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"], [data-sidebar-destination="builtin:home"]'):He(t)[0];e?e.click():location.assign(t===pt?"/":`/c/${t}`)}function Nm(t,e){let o=t===pt?"New chat":q.store.titles[t]??eo(t)??"Untitled chat",n=t===pt?null:q.store.projects[t],r=t===pt?null:q.store.previews[t];return s("button",{class:mt("item"),attrs:{type:"button",role:"option","aria-selected":String(e===at)},on:{click:()=>Br(t),mousemove:()=>e!==at&&ln(e)}},s("div",{class:mt("head")},s("span",{class:`${mt("title")} bloom-truncate`,text:o}),n&&s("span",{class:mt("project"),text:n})),r?.user&&s("div",{class:`${mt("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&s("div",{class:`${mt("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function ln(t){at=(t+it.length)%it.length,wt?.querySelectorAll(`.${mt("item")}`).forEach((e,o)=>e.setAttribute("aria-selected",String(o===at)))}function Um(){sn(g());let t=cn();it=Dm(),t&&(it=[t,...it.filter(e=>e!==t)].slice(0,Number(q.store.maxRecent))),it.length&&(at=it.length>1?1:0,wt=s("div",{class:`bloom-root ${mt("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:e=>e.target===e.currentTarget&&oo()}},s("div",{class:mt("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...it.map(Nm))),document.body.append(wt))}function oo(){wt?.remove(),wt=null}var Gm=t=>Hm.has(t.code)||Rm.has(t.key);function Fm(t){if(t.ctrlKey&&!t.altKey&&!t.metaKey&&Gm(t)){t.preventDefault(),t.stopPropagation(),wt?ln(at+(t.shiftKey?-1:1)):Um();return}if(!wt)return;let o={Escape:oo,Enter:()=>Br(it[at]),ArrowDown:()=>ln(at+1),ArrowUp:()=>ln(at-1)}[t.key];o&&(t.preventDefault(),t.stopPropagation(),o())}function Km(t){wt&&t.key==="Control"&&Br(it[at])}var el=f({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:q,styles:Js,start(){kr=new AbortController;let{signal:t}=kr;addEventListener("keydown",Fm,{capture:!0,signal:t}),addEventListener("keyup",Km,{capture:!0,signal:t}),addEventListener("blur",oo,{signal:t}),document.addEventListener("visibilitychange",()=>document.hidden&&sn(g()),{signal:t}),Xs=[et(({prevId:i})=>{sn(i),_s(cn())}),vt.on("conversation",({id:i})=>{q.store.visits.includes(i)&&tl(i),sn(i)})];let{visits:e,titles:o,previews:n}=q.store,r=e.filter(i=>i!==pt&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(q.store.visits=e.filter(i=>!r.includes(i))),_s(cn())},stop(){kr?.abort();for(let t of Xs)t();oo()}});var Ir="data:audio/mpeg;base64,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";var ol=new x("ResponseNotification"),Ym=.5,jm=200,Qm=300,no=h({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:t=>(t.append(U("Preview",al)),()=>t.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),nl=null,Pr=new Map,rl,Or;function Wm(t){return new Promise((e,o)=>GM_xmlhttpRequest({url:t,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=jm&&n<Qm?e(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var zm=t=>Uint8Array.from(atob(t.slice(t.indexOf(",")+1)),e=>e.charCodeAt(0)).buffer;function Vm(t,e){let o=Pr.get(e);return o||(o=(e.startsWith("data:")?Promise.resolve(zm(e)):Wm(e)).then(n=>t.decodeAudioData(n)),o.catch(()=>Pr.delete(e)),Pr.set(e,o)),o}async function il(t){nl??=new AudioContext;let e=nl;e.state==="suspended"&&e.resume();let o=e.createBufferSource(),n=e.createGain();o.buffer=await Vm(e,t),n.gain.value=Ym,o.connect(n).connect(e.destination),o.start()}function al(){let t=no.store.soundUrl.trim();il(t||Ir).catch(e=>{ol.warn("Sound failed",e),t&&il(Ir).catch(o=>ol.warn("Default chime failed",o))})}function Jm(t){let e=`${t??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:e,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:e,silent:!0});o.onclick=()=>{focus(),o.close()}}function Zm(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(Or=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:Or.signal}))}var sl=f({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:no,start(){Zm(),rl=k.on("fall",({conversationId:t,outcome:e})=>{e==="done"&&(no.store.onlyWhenHidden&&!document.hidden||(no.store.sound&&al(),no.store.browserNotification&&Jm(eo(t))))})},stop(){rl?.(),Or?.abort()}});var Xm=`:is(${l.sidebarScroll}, :has(> ${l.sidebarScroll})) + :has(${l.menuButton})`,$m=`${l.rail} > :has(${l.menuButton})`,Rr=`:is(${Xm}, ${$m}, ${l.oldProfile}):not(:hover)`,Hr="[data-bloom-profile-avatar]",_m=`:is(${Rr}, ${Rr} :has(${Hr})) > :not(${Hr}, :has(${Hr}))`,cl=h({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function tp(){let{opacity:t,fadeAvatar:e}=cl.store;return t>=100?"":`${e?Rr:_m}{opacity:${t/100}!important}`}var ll,ul=f({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:cl,styles:tp,start(){ll=nt()},stop(){ll?.()}});var dl=`/*
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
`;var O=E("bloom-star-chats"),op=80,np=60,rp=1200,ip=120,ml=180,Kr=h({messages:{type:"custom",default:[]}}),Dr,Nr=!1,St=!1,zt=!1,Se=0,Y=null,un="",C=null,Ur;function Yr(){let t=Kr.store.messages;return Array.isArray(t)?t.filter(e=>gt(e)&&typeof e.conversationId=="string"&&typeof e.messageId=="string"&&(e.role==="user"||e.role==="assistant")&&typeof e.snippet=="string"&&typeof e.starredAt=="number"):[]}function jr(){let t=g();return t?Yr().filter(e=>e.conversationId===t):[]}function ap(t,e){return Yr().some(o=>o.conversationId===t&&o.messageId===e)}function pl(t){let e=Yr(),o=e.some(n=>n.conversationId===t.conversationId&&n.messageId===t.messageId);Kr.store.messages=o?e.filter(n=>!(n.conversationId===t.conversationId&&n.messageId===t.messageId)):[{...t,starredAt:Date.now()},...e].slice(0,op)}function Gr(t){return t.messageIds[0]||t.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||t.el.getAttribute("data-turn-key")||""}function sp(t){return _(ue(t)||A(t.el.textContent??""),np)}function lp(t){let e=t.closest(l.turn);if(!e)return null;let o=qt().filter(n=>e.contains(n.el));return o.find(n=>n.el.contains(t)||n.el===e)??o.findLast(n=>n.el.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING)??null}function cp(){return[...document.querySelectorAll(l.turnActions)].filter(t=>!t.closest(`[data-bloom], [role="dialog"], [inert], pre, ${l.sidebars}`))}function up(){return[...document.querySelectorAll(l.headerMore)].filter(e=>{if(e.dataset.bloom==="message-star"||e.closest("[data-bloom], [role='dialog'], [inert]")||e.closest(l.sidebars))return!1;let o=e.getBoundingClientRect();return o.width===0&&o.height===0?!!e.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((e,o)=>o.getBoundingClientRect().left-e.getBoundingClientRect().left||(e.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function fl(t,e,o){return s("button",{class:e,attrs:{type:"button","aria-label":t},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},N("star"))}function dp(t,e){t.setAttribute("aria-pressed",String(e)),t.setAttribute("aria-label",e?"Unstar":"Star")}function Fr(){return St||zt}function Vt(){Se&&window.clearTimeout(Se),Se=0}function Ee(){St=!1,zt=!1,Vt(),Y?.remove(),Y=null,un="",C?.classList.remove(O("-open")),C?.setAttribute("aria-expanded","false")}function Qr(t){return t instanceof Node&&!!(C?.contains(t)||Y?.contains(t))}function mp(t){t.classList.add(O("-flash")),window.setTimeout(()=>t.classList.remove(O("-flash")),rp)}function pp(t){let e=qt().find(n=>Gr(n)===t),o=e?.el.closest(l.turn)??e?.el;o&&(o.scrollIntoView({block:"start"}),mp(o))}function fp(){let t=g(),e=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!t||kt()){for(let n of o)n.remove();return}for(let n of cp()){if(!z(n))continue;let r=lp(n),i=r?Gr(r):"";if(!r||!i)continue;let a=n.querySelector('[data-place="action"]');(!a||a.dataset.id!==i)&&(a?.remove(),a=fl("Star",O("-star"),()=>{let d=g(),c=qt().find(u=>Gr(u)===i);!d||!c||pl({conversationId:d,messageId:i,role:c.role,snippet:sp(c)})}),a.dataset.bloom="message-star",a.dataset.place="action",a.dataset.id=i),dp(a,ap(t,i)),a.parentElement!==n&&n.append(a),e.add(a)}for(let n of o)e.has(n)||n.remove()}function gp(){if(!Y||!C)return;let t=C.getBoundingClientRect(),e=Y.offsetWidth||288,o=Y.offsetHeight||120,n=t.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,t.top-o-6));let r=Math.max(8,Math.min(t.right-e,window.innerWidth-e-8));Y.style.left=`${Math.round(r)}px`,Y.style.top=`${Math.round(n)}px`}function hp(){if(!Fr()||!C){Y?.remove(),Y=null,un="",C?.classList.remove(O("-open")),C?.setAttribute("aria-expanded","false");return}let t=jr(),e=t.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!Y||un!==e){Y?.remove();let o=t.map(n=>s("div",{class:O("-row")},s("button",{class:O("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),Ee(),pp(n.messageId)}}},s("span",{class:O("-role"),text:n.role==="user"?"You":"ChatGPT"}),s("span",{class:O("-snip"),text:n.snippet||"Message"})),fl("Unstar",O("-unstar"),()=>pl(n))));Y=s("div",{class:`bloom-root ${O("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{Vt(),zt=!0},pointerleave:n=>{Qr(n.relatedTarget)||St||(Vt(),Se=window.setTimeout(()=>{zt=!1,Jt()},ml))}}},s("div",{class:O("-head"),text:"Starred"}),...o.length?o:[s("div",{class:O("-empty"),text:"No starred messages in this chat"})]),document.body.append(Y),un=e}gp(),C.classList.add(O("-open")),C.setAttribute("aria-expanded","true")}function bp(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let t=up(),e=t?.parentElement??null,o=g();if(!t||!e||e.closest(l.sidebars)||!o||kt()||!z(e)){C?.remove(),C=null,Ee();return}C||(C=s("button",{class:O("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{Vt(),Se=window.setTimeout(()=>{zt=!0,Jt()},ip)},pointerleave:r=>{Qr(r.relatedTarget)||(Vt(),Se=window.setTimeout(()=>{zt=!1,St||Jt()},ml))},click:r=>{r.preventDefault(),r.stopPropagation(),St=!St,zt=St,Vt(),St||Ee(),Jt()}}},N("star"))),(C.parentElement!==e||C.nextElementSibling!==t)&&t.before(C);let n=t.getBoundingClientRect();n.width>0&&(C.style.width=`${n.width}px`,C.style.height=`${n.height}px`),C.classList.toggle(O("-here"),jr().length>0),hp()}function Ap(){let t=new Set(jr().map(e=>e.messageId));for(let e of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))e.classList.toggle(O("-mark"),!!e.dataset.messageId&&t.has(e.dataset.messageId))}function Jt(){if(!Nr){Nr=!0;try{for(let t of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))t.remove();fp(),bp(),Ap()}finally{Nr=!1}}}function yp(){Ee(),C?.remove(),C=null;for(let t of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))t.remove();for(let t of document.querySelectorAll(`.${O("-mark")}`))t.classList.remove(O("-mark"))}var gl=f({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:Kr,styles:dl,onSettingsChange(t){t==="messages"&&Jt()},start(){Dr=w(o=>T(o)&&Jt());let t=o=>{Qr(o.target)||Fr()&&Ee()};document.addEventListener("pointerdown",t,!0);let e=o=>{o.key!=="Escape"||!Fr()||(o.preventDefault(),Ee())};document.addEventListener("keydown",e,!0),Ur=()=>{document.removeEventListener("pointerdown",t,!0),document.removeEventListener("keydown",e,!0)},Jt()},stop(){Dr?.(),Dr=void 0,Ur?.(),Ur=void 0,Vt(),yp()}});var hl="filter:blur(6px)!important;transition:filter 0.2s ease",py=`:is(${l.sidebars})`,vp={conversations:{selectors:["[data-app-action-sidebar-thread-title]"],hover:!0,row:"[data-app-action-sidebar-thread-row]"},projects:{selectors:["[data-app-action-sidebar-project-label]"],hover:!0,row:"[data-app-action-sidebar-project-row]"},accountAvatar:{selectors:["[data-bloom-profile] img","[data-bloom-menu] img"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["[data-thread-title]","[data-thread-title-trigger]"],hover:!1}},Al=h({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function qp(){return Object.entries(vp).filter(([t])=>Al.store[t]).map(([,t])=>{let e=t.selectors.join(",");if(!t.hover)return`:is(${e}){${hl}}`;let o="row"in t?`, ${t.row}:hover :is(${e})`:"";return`:is(${e}){${hl}}:is(${e}):hover, .bloom-recent-item:hover :is(${e})${o}{filter:none!important}`}).join(`
`)}var bl,yl=f({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:Al,styles:qp,start(){bl=nt()},stop(){bl?.()}});var Et=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)','[data-turn-key] [data-message-author-role="user"] blockquote:not(.twitter-tweet)'].join(","),Wr=h({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function xp(){let t=[`${Et}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${Et}>*{margin-block:0!important}`];return Wr.store.italic||t.push(`${Et}{font-style:inherit!important}`),Wr.store.quotes||(t.push(`${Et}{quotes:none!important}`),t.push(`${Et}::before,${Et}::after,${Et} p::before,${Et} p::after{content:none!important}`)),t.join(`
`)}var vl=f({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:Wr,styles:xp});var wp=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],Sp=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",Ep='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',ql=h({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function Tp(){let t=`${ql.store.width}rem`;return`:root,[data-app-action-timeline-scroll],[data-chatgpt-composer],[data-composer-input]{--thread-content-max-width:${t}!important;--composer-adjacent-max-width:${t}!important}`}var xl=f({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:ql,styles:Tp});var Mp=[sa,ka,Ua,Ka,Qa,za,es,ds,ys,ws,Gs,Ks,Ys,Vs,el,sl,ul,gl,yl,vl,xl],zr=Mp;var Cp=new x("Bloom"),wl="2.0.81";function Lp(t){t.isComposing||!t.shiftKey||!(t.metaKey||t.ctrlKey)||t.key!=="b"&&t.key!=="B"||(t.preventDefault(),t.stopPropagation(),ae())}async function Vr(){for(let t of zr)t.updatedAt=Di[t.name];mi(zr),li(),ao("base",yi),Hi(),document.addEventListener("keydown",Lp,!0),po("Init"),Cn().then(()=>{ni(),po("DOMContentLoaded")}),await Ln(),po("HostReady"),Xi(),Cp.info(`Bloom++ ${wl} app host ready`)}var Sl=new x("Boot");if(window===window.top){let t=Zt.Bloom;t&&Sl.warn("Replacing another Bloom++ instance",t.VERSION),Object.defineProperty(Zt,"Bloom",{value:Jr,configurable:!0,writable:!0}),Vr().catch(e=>Sl.error("Startup failed",e))}})();
