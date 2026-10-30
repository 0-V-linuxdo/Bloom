// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.80
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

/* Bloom++ v2.0.80. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var du=Object.defineProperty;var mu=(e,t)=>{for(var o in t)du(e,o,{get:t[o],enumerable:!0})};var x=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var xe=(e,t,o)=>Math.min(o,Math.max(t,e)),L=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ta=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,ae=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,h=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function Io(e,t){return`${e} ${t}${e===1?"":"s"}`}async function oa(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function Se(e){try{return JSON.parse(e)}catch{return}}var te=typeof unsafeWindow>"u"?window:unsafeWindow;var ea={};mu(ea,{VERSION:()=>lu,init:()=>_i,plugins:()=>He});var fu=new x("Styles"),Ht=new Map,na=new Set,Nt=new Map,or=!0;function ra(){let e=document.adoptedStyleSheets.filter(t=>!na.has(t));document.adoptedStyleSheets=[...e,...Ht.values()]}function ia(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function pu(e,t){let o=Nt.get(e);o||(o=document.createElement("style"),o.id=`bloom-style-${e}`,Nt.set(e,o)),o.textContent!==t&&(o.textContent=t),ia(o)}function Bo(e,t){if(or)try{let o=Ht.get(e);o||(o=new te.CSSStyleSheet,Ht.set(e,o),na.add(o)),o.replaceSync(t),ra();return}catch(o){fu.warn("Constructed style sheets unavailable, using <style> after parsing",o),or=!1,Ht.delete(e)}pu(e,t)}function nr(e){Ht.delete(e)&&or&&ra(),Nt.get(e)?.remove(),Nt.delete(e)}function aa(){for(let e of Nt.values())ia(e)}var S=e=>(...t)=>t.map(o=>e+o).join(" "),Oo=(...e)=>e.filter(Boolean).join(" "),it=e=>e.length?`${e.map(t=>`${t}:not([data-bloom])`).join(",")}{display:none!important}`:"";function f(e){return e}var sa=new x("Storage");function Po(e){try{return localStorage.getItem(e)??void 0}catch{return}}function Ro(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(o){sa.warn("localStorage write failed",o)}}function rr(e){try{localStorage.removeItem(e)}catch(t){sa.warn("localStorage delete failed",t)}}function la(e,t){addEventListener("storage",o=>{o.key===e&&t(o.newValue)})}var ir="BloomSettings",gu=100,at={plugins:{}},Do=new Set,ar=new Set,Ut;function ca(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=Se(t);return!L(t)||!L(t.plugins)||!Object.keys(t.plugins).length?null:t}function ua(){let e=ca(Po(ir));e&&(at.plugins=e.plugins)}var da=(e,t)=>`${e}
${t}`;function ma(){Ut=void 0,ar.clear(),Ro(ir,at)}function hu(e){let t=ca(e);if(!t)return;let o=[];for(let n of new Set([...Object.keys(at.plugins),...Object.keys(t.plugins)])){let r=at.plugins[n]??={},i=L(t.plugins[n])?t.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))ar.has(da(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of Do)i(n,r)}function bu(){Ut&&(clearTimeout(Ut),ma())}var Re=(e,t)=>at.plugins[e]?.[t];function De(e,t,o){let n=at.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,ar.add(da(e,t)),clearTimeout(Ut),Ut=setTimeout(ma,gu);for(let r of Do)r(e,t)}function st(e){return Do.add(e),()=>void Do.delete(e)}function sr(e){return e.type==="component"?void 0:e.default}function p(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>Re(t.pluginName,n)??(e[n]&&sr(e[n])),set:(o,n,r)=>(De(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&Re(t.pluginName,o)!==void 0&&De(t.pluginName,o)}};return t}var fa=e=>{let t=()=>{let o=Re("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();De("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},Ho=fa("pinnedPlugins"),No=fa("starredPlugins");addEventListener("pagehide",bu);la(ir,hu);var Uo=new x("PluginManager"),He=new Map,Gt=new Set,pa=new Set,lr=new Set;function ga(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),He.set(t.name,t)}var Ft=e=>!!e.required||(Re(e.name,"enabled")??!!e.enabledByDefault);var cr=e=>`plugin-${e.name}`;function ha(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?Bo(cr(e),t):nr(cr(e))}function ba(e){if(!Gt.has(e.name))try{ha(e),e.start?.(),Gt.add(e.name)}catch(t){Uo.error(`Failed to start ${e.name}`,t)}}function Au(e){if(Gt.delete(e.name)){nr(cr(e));try{e.stop?.()}catch(t){Uo.error(`Failed to stop ${e.name}`,t)}}}var Aa=e=>e.startAt??"HostReady";function Go(e){pa.add(e);for(let t of He.values())Aa(t)===e&&Ft(t)&&ba(t);Uo.info(`${e}: ${[...Gt].join(", ")}`)}function ya(e,t){De(e.name,"enabled",t),t?pa.has(Aa(e))&&ba(e):Au(e);for(let o of lr)o()}function va(e){return lr.add(e),()=>void lr.delete(e)}st((e,t)=>{let o=He.get(e);if(!(!o||t==="enabled"||!Gt.has(e)))try{ha(o),o.onSettingsChange?.(t)}catch(n){Uo.error(`Settings change failed for ${e}`,n)}});var qa=`/*
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
`;var vu=new x("Dom");function s(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var wa=document.createElement("template");function xa(e){return wa.innerHTML=e.trim(),wa.content.firstElementChild.cloneNode(!0)}var Kt=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),F=(e,t=document)=>[...t.querySelectorAll(e)].find(Kt)??null,qu=16,wu="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function Sa(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([wu],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function Qt(e){document.hidden?setTimeout(e,qu):requestAnimationFrame(e)}function lt(e){let t=!1;return()=>{t||(t=!0,Qt(()=>{t=!1;try{e()}catch(o){vu.error("Scheduled task failed",o)}}))}}var Fo=new Set,Yo=[],Yt,xu=lt(()=>{let e=Yo;Yo=[];for(let t of Fo)t(e)});function T(e){return Fo.add(e),Yt||(Yt=new MutationObserver(t=>{Yo.push(...t),xu()}),Yt.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{Fo.delete(e),!Fo.size&&(Yt?.disconnect(),Yt=void 0,Yo=[])}}var Su=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),P=e=>!e.length||e.some(t=>!Su(t.target));function Ne(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size");return}e.getAttribute("data-bloom-text")!==t&&(e.hasAttribute("data-bloom-text")||e.style.setProperty("--bloom-text-size",getComputedStyle(e).fontSize),e.setAttribute("data-bloom-text",t))}var Eu=new x("Events");function Ko(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){Eu.error(`Listener for ${String(t)} failed`,r)}}}}var u={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',composerConversation:"[data-above-composer-conversation-id]",oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",modelTrigger:'[data-testid="model-switcher-dropdown-button"], button[aria-label="Model selector" i], button[aria-label="Select ChatGPT model" i]',modelItem:'[role="menu"] [data-testid^="model-switcher-"], [role="menuitem"][data-testid^="model-switcher-"], [role="menu"] [role="menuitemradio"], [role="menu"] [data-reasoning-slider]',effortSlider:'[role="menu"] [data-reasoning-slider]',homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]'};var Ea=/[​-‍﻿]/g,he=()=>F(u.composerInput),Ue=e=>e instanceof HTMLElement&&e.matches(u.composerInput),K=(e=he())=>e?.closest("form")??document.querySelector(u.oldComposerForm);function C(e=he()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(Ea,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(Ea,"").trim()}var Tu=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function ne(e,t=he()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return Tu?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function Ta(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:a,value:l}=e;return{first:!l.slice(0,i).includes(`
`),last:!l.slice(a).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var Ca=e=>{let t=K();return(t&&F(e,t))??F(e)},ct=()=>Ca(u.stopButton),Cu=()=>{let e=Ca(u.sendButton);return e&&!e.matches(u.stopButton)?e:null};function Qo(){let e=Cu();if(e){e.disabled||e.click();return}he()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var Ma=()=>Kt(ct());var Ia=new x("Network"),Mu=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,Lu=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,jo=1e3,ku=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),Q=Ko(),dr=new Map,La=new Map,Iu=1,ie=e=>e?dr.get(e)??null:null;function Wo(e){let t=dr.get(e);return t||dr.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var Ba=e=>e==="user"||e==="assistant";function Oa(e){let t=e.author?.role;if(!e.id||!Ba(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(c=>typeof c=="string").join(`
`).trim(),i=n.filter(c=>L(c)&&c.content_type==="image_asset_pointer").length,a=e.metadata?.attachments,l=Array.isArray(a)&&a.length>0;return!r&&!i&&!l?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*jo:null,text:r,hasFiles:l,imageCount:i}}var Pa=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant"),mr=e=>e.map(t=>t.createTime).filter(t=>t!=null);function Bu(e,t){let o=mr(e),n=mr(t);return!o.length||!n.length?!1:Math.max(...o)<Math.min(...n)}function Ou(e){let t=mr(e);if(t.length<2)return e;let[o]=t,n=o-e.length;return e.map((i,a)=>(i.createTime!=null&&(n=i.createTime),{message:i,index:a,time:i.createTime??n})).toSorted((i,a)=>i.time-a.time||i.index-a.index).map(i=>i.message)}function Pu(e,t){let o=t.filter(L).map(l=>L(l.message)?l.message:l);for(let l of o)l.id&&l.create_time&&e.times.set(l.id,l.create_time*jo);let n=o.map(Oa).filter(l=>l!=null),r=new Set(n.map(l=>l.id)),i=e.chain.filter(l=>!r.has(l.id)),a=Bu(n,i)?[...n,...i]:[...i,...n];return e.chain=Pa(Ou(a)),e}function Ru(e,t){if(!L(t)||!(L(t.mapping)||Array.isArray(t.messages)))return null;let o=Wo(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return Pu(o,t.messages);let n=t.mapping;for(let l of Object.values(n)){let c=l.message?.create_time;l.message?.id&&c&&o.times.set(l.message.id,c*jo)}let r=[],i=new Set,a=typeof t.current_node=="string"?t.current_node:null;for(;a&&!i.has(a)&&n[a];){i.add(a);let l=n[a].message,c=l?Oa(l):null;c&&r.push(c),a=n[a].parent??null}return r.length&&(o.chain=Pa(r.toReversed())),o}function Du(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}var ur=e=>typeof e=="string"?e:null;function Hu(e){let t=typeof e?.body=="string"?Se(e.body):null;if(!L(t))return{conversationId:null,parentId:null,userId:null};let[o]=Array.isArray(t.messages)?t.messages:[];return{conversationId:ur(t.conversation_id),parentId:ur(t.parent_message_id),userId:L(o)?ur(o.id):null}}function Nu(e,t){if(!L(e))return;typeof e.type=="string"&&ku.has(e.type)&&(t.handoff=!0);let o=L(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(Wo(e.conversation_id).title=e.title,Q.emit("conversation",Wo(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&Ba(n.author?.role)){let r=n.create_time*jo;t.conversationId&&Wo(t.conversationId).times.set(n.id,r),Q.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function Uu(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:a}=await o.read();if(i)break;r+=n.decode(a,{stream:!0});let l=r.split(`
`);r=l.pop()??"";for(let c of l){if(!c.startsWith("data:"))continue;let d=c.slice(5).trim();d&&d!=="[DONE]"&&Nu(Se(d),t)}}}async function Gu(e,t,o){let{conversationId:n}=t,r={conversationId:n,error:!1,handoff:!1};La.set(e,n),Q.emit("generate-start",{requestId:e,...t});try{let i=await o;i.ok?i.headers.get("content-type")?.includes("event-stream")&&await Uu(i.clone(),r):r.error=!0}catch(i){let a=i instanceof DOMException&&i.name==="AbortError";r.handoff||=a,r.error||=!a}finally{La.delete(e),Q.emit("generate-end",{requestId:e,...r})}}async function Fu(e,t){try{let o=await t;if(!o.ok)return;let n=Ru(e,await o.clone().json());n&&Q.emit("conversation",n)}catch(o){Ia.debug("Conversation read skipped",o)}}function Yu(e,t,o){let n=Du(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&Mu.test(n.pathname)){Gu(Iu++,Hu(t),o);return}let i=r==="GET"&&n.pathname.match(Lu)?.[1];i&&Fu(i,o)}var ka=!1;function Ra(){if(ka)return;ka=!0;let e=te.fetch,t=function(o,n){let r=e.call(this??te,o,n);try{Yu(o,n,r)}catch(i){Ia.error("Fetch tap failed",i)}return r};te.fetch=typeof exportFunction=="function"?exportFunction(t,te):t}var Ku="__reactContainer$",Da="__reactFiber$";function zo(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var fr=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),be=e=>!fr(document,Ku)||fr(e,Da);function Ge(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function Ha(){await Ge();let e=Date.now()+8e3;for(;!fr(document.body,Da)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var Qu=new x("Route"),Na=/\/c\/(?!local-)([\w-]+)/,Wu=500,hr=e=>{try{return new URL(e,location.origin).pathname.match(Na)?.[1]??null}catch{return null}},b=()=>location.pathname.match(Na)?.[1]??null,Xo=()=>location.pathname==="/",ju=/^\/g\/g-p-[^/]+(?:\/project)?\/?$/,Ua=()=>ju.test(location.pathname),se=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",Vo=new Set,Zo=location.href,gr=b(),Jo;function pr(){if(location.href===Zo)return;let e={prevHref:Zo,href:location.href,prevId:gr,id:b()};Zo=e.href,gr=e.id;for(let t of Vo)try{t(e)}catch(o){Qu.error("Route listener failed",o)}}function zu(){let e=new AbortController,{navigation:t}=te;t?.addEventListener("currententrychange",()=>queueMicrotask(pr),{signal:e.signal}),addEventListener("popstate",pr,{signal:e.signal});let o=setInterval(pr,Wu);return()=>{e.abort(),clearInterval(o)}}function le(e){return Vo.add(e),Jo||(Zo=location.href,gr=b(),Jo=zu()),()=>{Vo.delete(e),!Vo.size&&(Jo?.(),Jo=void 0)}}var Ju=["data-turn","data-message-author-role"],Vu=/:(user|assistant)$/,br=`${u.messageUnit}, ${u.oldMessage}`,Ar=e=>e==="user"||e==="assistant",Ka=()=>!!document.querySelector(u.timelineScroll),Qa=()=>!!F(u.timelineScroll),Wa=()=>b()??document.querySelector(u.composerConversation)?.getAttribute("data-above-composer-conversation-id")??"",ut=()=>Ka()?F(u.timelineScroll):document;function jt(){if(Ka())return F(u.timelineScroll);let e=document.querySelector(u.turn);for(let t=e?.parentElement;t;t=t.parentElement){let{overflowY:o}=getComputedStyle(t);if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight)return t}return document.scrollingElement}var dt=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(Vu)?.[1]??null,ja=e=>[...e.querySelectorAll(u.searchUnit)].filter(t=>dt(t)&&!t.parentElement?.closest(u.searchUnit)),Ga=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function Wt(e){let t=Ga(e);return t.length?t:[...new Set([...e.querySelectorAll(br)].flatMap(Ga))]}function mt(e=ut()){if(!e)return[];let t=ja(e);return t.length?t:[...e.querySelectorAll(br)].filter(o=>!o.parentElement?.closest(br))}function Zu(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function Xu(e){for(let t of Ju){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(Ar(o))return o}return e.querySelector(u.markdown)||e.querySelector(u.generatedImage)?"assistant":null}var $u=e=>!e.parentElement?.closest(u.turn);function Ee(){let e=ie(b())?.chain??[];return[...ut()?.querySelectorAll(u.turn)??[]].filter($u).flatMap(o=>{let n=ja(o),r=n.length?n.map(i=>({el:i,known:dt(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=d=>!n.some(m=>m.contains(d))&&h(d.textContent??""),a=[...o.querySelectorAll(u.assistantMarkdown)].find(d=>i(d)&&!$o.test(h(d.textContent??""))),l=[...o.querySelectorAll(u.activityHeader)].findLast(i),c=a??l;c&&r.push({el:c,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?Wt(o):mt(o).flatMap(Wt),a=n??Xu(o)??Zu(i,e)??(r%2?"assistant":"user"),l=o.closest(u.turn)??o,c=!o.closest(u.searchUnit)&&!!l.querySelector(u.turnBusy),d=a==="assistant"&&(o.matches(u.turnBusy)||!!o.querySelector(u.turnBusy)||c);return{el:o,role:a,messageIds:i,streaming:d}})}var _u="[data-bloom], .sr-only",za=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,$o=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,Fa=new WeakMap;function ft(e){let o=(e.el.closest(u.turn)??e.el).textContent?.length??0,n=Fa.get(e.el);if(n?.length===o)return n.summary;let r=ed(e);return Fa.set(e.el,{length:o,summary:r}),r}function Ya(e){let t=new Set,o=[];for(let n of e.querySelectorAll(u.assistantMarkdown)){if(n.closest(u.searchUnit))continue;let r=h(n.textContent??"");!r||$o.test(r)||za.test(r)||t.has(r)||(t.add(r),o.push(r))}return o}function ed(e){let t=e.el.querySelectorAll(u.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.closest(u.turn);if(e.role==="assistant"&&o&&e.el.matches(u.assistantMarkdown)&&!e.el.closest(u.searchUnit)){let c=Ya(o);if(c.length)return c.join(" \xB7 ")}let n=e.el.querySelector(e.role==="assistant"?u.markdown:".whitespace-pre-wrap")??e.el,i=[...n.querySelectorAll(_u)].map(c=>h(c.textContent??"")).filter(Boolean).reduce((c,d)=>c.replace(d,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(h).filter(c=>c&&!za.test(c)&&!$o.test(c));if(a.length)return a.join(" ");if(e.role==="assistant"&&o){let c=Ya(o);if(c.length)return c.join(" \xB7 ")}let l=i.split(`
`).map(h).filter(c=>$o.test(c));return l.length?l.at(-1)??"":e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function _o(e){return e.text?h(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var yr=e=>e.matches(u.timelineScroll)&&getComputedStyle(e).flexDirection==="column-reverse";var td=250,od=400,nd=6e4,rd=5e3,id=`:is(${u.turn}) :is(${u.turnBusy})`,q=Ko(),on=new Set,vr=new Set,Te=!1,Va=0,pt=null,gt=!1,en=!1,zt=0,nn=!1,Jt=null,Ja=!1,B=()=>({generating:Te,conversationId:b()}),Za=()=>Ma()||!!ut()?.querySelector(id);function ad(){let e=Za();return e?en||(zt=0,nn=!0):en=!1,[...on].some(t=>!vr.has(t))||e&&!en||Date.now()<zt}function sd(){return Jt?.error?"error":gt?"stopped":"done"}function ld(){pt=null,Te=!1,nn=!1,q.emit("fall",{conversationId:b(),outcome:sd()}),gt=!1,Jt=null}function Xa(){let e=ad();e&&!Te&&(Te=!0,Va=Date.now(),gt=!1,Jt=null,q.emit("rise",{conversationId:b()})),e||!Te?pt=null:pt==null?pt=Date.now():Date.now()-pt>=od&&ld()}function tn(){Xa(),q.emit("tick",B())}function cd({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(Te||Date.now()-Va<nd);if(!o&&Te){for(let n of on)vr.add(n);en=Za(),zt=0,nn=!1,pt=null,Te=!1,gt=!1,Jt=null,q.emit("fall",{conversationId:e,outcome:"left"})}q.emit("context",{prevId:e,id:t,migrated:o}),tn()}function ud(e){e.target instanceof Element&&e.target.closest(u.stopButton)&&(gt=!0,zt=0)}function $a(){Ja||(Ja=!0,Q.on("generate-start",({requestId:e})=>{on.add(e),tn()}),Q.on("generate-end",e=>{on.delete(e.requestId),!vr.delete(e.requestId)&&(Jt=e,zt=e.handoff&&!e.error&&!gt&&!nn?Date.now()+rd:0,tn())}),le(cd),document.addEventListener("click",ud,!0),Sa(tn,td),zo().then(()=>T(Xa)))}var _a={BetterNavigator:1792014624e3,BetterQuotes:179333264e4,ChatListStatus:179333264e4,ChatStateFavicons:179069068e4,Cleaner:1793267811e3,ComposerOpacity:1793335268e3,Continue:1790939902e3,CustomSidebarIdentity:179069068e4,GreetingCustomizer:1792014624e3,InputHistory:179333264e4,MessageTimestamps:1791080494e3,NoDictation:1793335268e3,NoShareLink:179069068e4,NoSidebarIdentity:179069068e4,PromptQueue:1793267321e3,RecentTopics:179333264e4,ResponseNotification:179069068e4,Settings:1793335268e3,SidebarIdentityOpacity:179069068e4,StarChats:179333264e4,StreamerMode:179333264e4,TemporaryChat:1792014624e3,UserQuotes:179333264e4,WiderChat:179333264e4};var y=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,dd="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",md={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${dd}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:y('<path d="M18 6 6 18M6 6l12 12"/>'),gear:y('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:y('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:y('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:y('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:y('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:y('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:y('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:y('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:y('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:y('<path d="m6 9 6 6 6-6"/>'),play:y('<path d="M7 4v16l13-8z"/>'),plus:y('<path d="M12 5v14M5 12h14"/>'),check:y('<path d="m5 12 5 5 9-10"/>'),alert:y('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:y('<path d="M4 5h16v11H9l-5 4z"/>'),layout:y('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:y('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:y('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:y('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:y('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:y('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:y('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:y('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:y('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:y('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:y('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:y('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:y('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:y('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:y('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:y('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),ghost:y('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},D=e=>xa(md[e]);var Ae="data-bloom-tip",qr=6,wr=8,Fe,es=null;function ht(e){if(e===es)return;if(es=e,!e){Fe?.remove();return}Fe??=s("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),Fe.textContent=e.getAttribute(Ae),document.body.append(Fe);let t=e.getBoundingClientRect(),{width:o,height:n}=Fe.getBoundingClientRect(),r=t.bottom+qr+n<=innerHeight-wr;Fe.style.left=`${xe(t.left+t.width/2-o/2,wr,innerWidth-o-wr)}px`,Fe.style.top=`${r?t.bottom+qr:t.top-qr-n}px`}var ts=e=>e instanceof Element?e.closest(`[${Ae}]`):null;function os(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>ht(ts(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||ht(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&ht(ts(o.target)),t),document.addEventListener("focusout",()=>ht(null),t),document.addEventListener("pointerdown",()=>ht(null),t),()=>{e.abort(),ht(null)}}function xr(e,t,o,n=!1){let r=s("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let a=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(a)),t(a)}),r}function W(e,t,o){return s("button",{class:Oo("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button","data-bloom":"control"},on:{click:t}})}function J(e,t,o,n){let r=s("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,"data-bloom":"control",[Ae]:t},on:{click:o}},D(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function rn(e,t,o,n,r,i){let a=s("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});a.value=String(e);let l=s("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{l.textContent=`${a.value}${r}`,i(Number(a.value))}),s("div",{class:"bloom-slider"},a,l)}function Sr(e,t,o){let n=s("select",{class:"bloom-select"},...t.map(r=>s("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function Vt(e,t,o="",n="text"){let r=s("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var fd=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,ns=/\S+@\S+\.\S+/,pd=3,gd=/^\/g\/(g-p-[^/]+)\//,hd=/^g-p-[0-9a-f]+-?/i,rs=e=>!!e.closest(".sr-only"),Er=e=>!!e?.querySelector(u.menuButton);function is(){return[...document.querySelectorAll(u.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(Er)).filter(e=>e!=null)}function as(){let e=[...document.querySelectorAll(u.oldProfile)];if(e.length)return e.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let t=is().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(u.rail)){let n=[...o.children].find(Er);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var Tr=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||us(e).some(t=>!rs(t))),ss=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&Tr(t))??null;function ls(){let e=[...document.querySelectorAll(u.oldProfile)];return e.length?e:[...is(),...[...document.querySelectorAll(u.rail)].map(o=>[...o.children].findLast(Er))].map(o=>[...o?.querySelectorAll(u.menuButton)??[]].findLast(n=>Tr(n)||ss(n))).filter(o=>o!=null)}var cs=()=>ls().map(e=>Tr(e)?e:ss(e)).filter(e=>e!=null);function us(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!h(t.textContent??"")&&!(t instanceof SVGElement))}var bd=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function an(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function Ad(e,t){if(h(e.textContent??"").length>pd)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(bd(n))return n;return null}function Cr(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=us(e),r=o?null:n.map(m=>Ad(m,e)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");an(e,`data-bloom-${t}-avatar`,a);let l=n.filter(m=>!a?.contains(m)&&!rs(m)),c=l.find(m=>fd.test(h(m.textContent??""))),d=l.find(m=>ns.test(m.textContent??""));an(e,`data-bloom-${t}-plan`,c),an(e,`data-bloom-${t}-email`,d),an(e,`data-bloom-${t}-name`,l.find(m=>m!==c&&m!==d))}function yd(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function sn(){return ls().map(yd).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(ns.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var Zt=e=>[...document.querySelectorAll(u.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&hr(t.href)===e);function ds(e){let t=Zt(e).find(o=>h(o.textContent??""));return t?h(t.textContent??""):null}function ms(e){let t=new URL(e,location.origin).pathname.match(gd)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!hr(n.href)&&h(n.textContent??""));return o?h(o.textContent??""):t.replace(hd,"").replaceAll("-"," ")||null}var Mr=0,ln;function vd(e){if(!P(e))return;for(let o of cs())Cr(o,"profile");let t=sn();t&&Cr(t,"menu")}function ce(){Mr++;let e=!0;return Ge().then(()=>{e&&Mr&&!ln&&(ln=T(vd))}),()=>{e&&(e=!1,!--Mr&&(ln?.(),ln=void 0))}}var qd=new x("SettingsPanel"),g=S("bloom-settings-"),wd=10080*60*1e3,xd=3e3,fs="Toggle features. Some need a reload. Click the sliders icon to configure.",Sd=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Ed=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],Td={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},gs=new Set(["chat","ui","privacy"]),j=null,Ke="all",Lr="all",cn="",kr=[],hs=()=>[...He.values()].filter(e=>!e.hidden),Cd=e=>!!e.updatedAt&&Date.now()-e.updatedAt<wd;function Md(e){switch(Ke){case"favorites":return No.has(e.name);case"recent":return Cd(e);case"all":return!0;case"other":return!e.tags.some(t=>gs.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(Ke)}}function Ld(e){switch(Lr){case"all":return!0;case"enabled":return Ft(e);case"disabled":return!Ft(e)}}function kd(e){let t=cn.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function Id(e){let t=Ho.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return Ke==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var bs=e=>e.settings?.def??{},Bd=e=>Object.values(bs(e)).some(t=>t.type!=="custom");function Od(e,t,o){let n=Re(e.name,t)??sr(o),r=i=>De(e.name,t,i);switch(o.type){case"boolean":return xr(n,r,o.description??t);case"slider":return rn(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return Sr(n,o.options,r);case"string":return Vt(n,r,o.placeholder);case"number":return Vt(String(n),i=>r(Number(i)),"","number");case"component":{let i=s("div",{class:g("component")});return kr.push(o.render(i)),i}case"custom":return null}}var Pd=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function As(e){if(!j)return;let t=Object.entries(bs(e)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let l=Od(e,i,a),c=a.type==="boolean",d=a.type!=="component"&&s("div",{class:g("field-label"),text:Pd(i)}),m=a.description&&s("div",{class:g("field-desc"),text:a.description});return s("div",{class:g("field",c?"field-inline":"field-stacked")},(d||m)&&s("div",{class:g("field-text")},d,m),l)}),o,n=W("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},xd);return}clearTimeout(o),e.settings?.reset(),Xt(),As(e)},"danger"),r=s("div",{class:g("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&Xt()}},s("div",{class:g("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},s("div",{class:g("popup-header")},s("div",{class:g("card-icon")},D(e.icon)),s("div",{class:g("popup-title")},s("div",{class:g("card-name"),text:e.name}),s("div",{class:g("popup-authors"),text:e.authors.join(", ")})),J("close","Close",Xt)),s("p",{class:g("popup-desc"),text:e.description}),s("div",{class:g("fields")},...t),s("div",{class:g("popup-footer")},n)));j.querySelector(`.${g("modal")}`)?.append(r)}function Xt(){for(let e of kr)e();kr=[],j?.querySelector(`.${g("popup-backdrop")}`)?.remove()}function ps(e){let t=Ft(e),o=No.has(e.name),n=Ho.has(e.name),r=!!e.required;return s("div",{class:[g("card",t?"card-on":"card-off"),r?g("card-required"):""].filter(Boolean).join(" ")},s("div",{class:g("card-top")},s("div",{class:g("card-icon")},D(e.icon)),s("div",{class:g("card-actions")},J("star",o?"Unstar":"Star",()=>{No.toggle(e.name),Ye()},o),r?null:J("pin",n?"Unpin":"Pin to top",()=>{Ho.toggle(e.name),Ye()},n),r?s("span",{class:g("required-mark"),attrs:{"aria-label":"Required",[Ae]:"This plugin is required for Bloom++ to work"}},D("alert")):null,Bd(e)&&J("gear","Settings",()=>As(e)),xr(t,i=>ya(e,i),r?`${e.name} is required`:`Enable ${e.name}`,r))),s("div",{class:g("card-name"),text:e.name}),s("div",{class:g("card-desc"),text:e.description,title:e.description}),s("div",{class:g("card-footer"),text:e.authors.join(", ")}))}function ys(){let e=hs().some(o=>!o.tags.some(n=>gs.has(n)));j?.querySelector(`.${g("tabs")}`)?.replaceChildren(...Sd.filter(o=>o.id!=="other"||e).map(o=>s("button",{class:g("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===Ke)},on:{click:()=>{Ke=o.id,ys(),Ye()}}})))}function Ye(){if(!j)return;let e=hs().filter(Md),t=j.querySelector(`.${g("search")} input`);t&&(t.placeholder=`Search ${Io(e.length,"plugin")}...`);let o=Id(e.filter(d=>kd(d)&&Ld(d))),n=Ke==="all",r=n?o.filter(d=>!d.required):o,i=n?o.filter(d=>d.required):[],a=[...r.map(ps),...i.length?[s("div",{class:g("required-break"),attrs:{role:"separator"}}),...i.map(ps)]:[]],l=cn.trim()?"No plugins match your search.":Td[Ke]??"No plugins available.";j.querySelector(`.${g("grid")}`)?.replaceChildren(...a.length?a:[s("div",{class:g("empty"),text:l})])}function Rd(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),j?.querySelector(`.${g("popup-backdrop")}`)?Xt():bt())}var vs,Ir;function Dd(){if(j)return;let e=s("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=cn,e.addEventListener("input",()=>{cn=e.value,Ye()}),j=s("div",{class:`bloom-root ${g("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&bt()}},s("div",{class:g("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},s("div",{class:g("header")},s("div",{class:g("logo")},D("bloom")),s("h2",{class:g("title"),text:"Bloom++"}),s("span",{class:g("hint"),attrs:{"aria-label":fs,tabindex:"0",[Ae]:fs}},D("info")),s("span",{class:g("version"),text:"v2.0.80"}),J("close","Close",bt)),s("div",{class:g("tabs"),attrs:{role:"tablist"}}),s("div",{class:g("toolbar")},s("label",{class:g("search")},D("search"),e),Sr(Lr,Ed,t=>{Lr=t,Ye()})),s("div",{class:g("grid")}))),j.addEventListener("keydown",t=>t.stopPropagation()),Ir=new AbortController,document.addEventListener("keydown",Rd,{capture:!0,signal:Ir.signal}),document.body.append(j),ys(),Ye(),vs=va(Ye),e.focus(),qd.debug("Opened")}function bt(){Xt(),Ir?.abort(),vs?.(),j?.remove(),j=null}var un=()=>j?bt():Dd();var qs=`/*
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
`;var Ce=S("bloom-entry-"),Nd=4,Br="--bloom-entry-x",Or=1,At=p({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar. The account menu and the userscript menu always open the panel.",default:!1},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:!0},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:e=>(e.append(W("Reset position",()=>{At.store.entryPosition=Or})),()=>e.replaceChildren())},entryPosition:{type:"custom",default:Or}}),Qe=new Map,ws=!1,xs=[];function Ud(e,t,o){let n=e.currentTarget,r=t.clientWidth-n.offsetWidth;if(e.button!==0||r<=0||!t.classList.contains(Ce("hover")))return;let i=At.store.entryPosition,a=i,l=!1,c=new AbortController;n.setPointerCapture(e.pointerId),n.addEventListener("pointermove",m=>{!l&&Math.abs(m.clientX-e.clientX)<Nd||(l=!0,o(),a=xe(i+(m.clientX-e.clientX)/r,0,Or),t.style.setProperty(Br,String(a)))},{signal:c.signal});let d=()=>{c.abort(),l&&(At.store.entryPosition=a,t.style.removeProperty(Br))};n.addEventListener("pointerup",d,{signal:c.signal}),n.addEventListener("lostpointercapture",d,{signal:c.signal})}function Gd(e){let t=!1,o=s("button",{class:Ce("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),t||un(),t=!1},pointerdown:r=>{t=!1,e!=="rail"&&Ud(r,n,()=>{t=!0})}}},D("bloom"),e!=="rail"&&s("span",{class:Ce("label"),text:"Bloom++"})),n=s("div",{class:`bloom-root ${Ce("wrap")} ${Ce(e)}`,attrs:{"data-bloom":"entry"}},o);return n}function Fd(e){let t=s("div",{class:`bloom-root ${Ce("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),un()}}},D("bloom"),s("span",{text:"Bloom++"})),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function Ss(){let{showSidebarEntry:e,showSidebarEntryOnHover:t}=At.store,o=e||t?as():[];for(let[r,i]of Qe)r.isConnected&&o.some(a=>a.anchor===r)||(i.remove(),Qe.delete(r));for(let r of o){let i=Qe.get(r.anchor);if(i?.isConnected||!be(r.anchor))continue;let a=i??Gd(r.kind);Qe.set(r.anchor,a),r.insert(a)}for(let r of Qe.values())r.classList.toggle(Ce("hover"),!e);let n=sn();n&&!n.querySelector('[data-bloom="menu-entry"]')&&Fd(n)}var Es=f({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:At,styles:()=>`${qs}.${Ce("hover")}{${Br}:${At.store.entryPosition}}`,start(){xs=[T(Ss),os(),ce()],!ws&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",un),ws=!0)},stop(){for(let e of xs)e();for(let e of Qe.values())e.remove();Qe.clear(),bt()},onSettingsChange:Ss});var Ts=`/*
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
`;var O=S("bloom-nav-"),fn=80,Kd=1200,Qd=2,Cs=3e4,Wd=200,jd=.9,zd=.28,Jd=24,yt=8,Vd=80,Zd=12,Xd={user:"\u2753",assistant:"\u{1F916}"},$d=["wheel","touchmove","pointerdown"],gn=p({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),R=null,k=[],re=-1,je=-1,vt=null,dn="",Rr=0,Ms=[],to=null,mn=null,We,$t,Dr="",_t=[],pn=null,Hr=new Set,_d=e=>gn.store.showAssistant||e.role==="user",em=e=>e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.messageIds[0]||e.role;function tm(e){return{role:e.role,summary:ft(e),ids:e.messageIds,turn:e,streaming:e.streaming}}function Os(e,t){let o=e.entries.at(-1);if(o?.role==="assistant"&&t.role==="assistant"){e.entries[e.entries.length-1]={...t,ids:[...new Set([...o.ids,...t.ids])]};return}e.entries.push(t)}function om(){let e=[];for(let t of Ee()){let o=tm(t),n=em(t),r=e.at(-1);r?.key===n?Os(r,o):e.push({key:n,entries:[o]})}return e}function nm(){let e=[];for(let t of ie(b())?.chain??[]){let o={role:t.role,summary:_o(t),ids:[t.id],turn:null,streaming:!1},n=e.at(-1);t.role==="assistant"&&n?Os(n,o):e.push({key:t.id,entries:[o]})}return e}var qt=e=>e.entries.flatMap(t=>t.ids);function Nr(e,t){let o=new Set(qt(e));return qt(t).some(n=>o.has(n))}var ze=e=>h(e.entries.find(t=>t.role==="user")?.summary??""),Pr=(e,t)=>e.filter(o=>ze(o)===t).length,Ur=e=>({...e,turn:null,streaming:!1});function rm(e,t){let o=new Set(t.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return e.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return Ur(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?Ur(r):r})}))}function im(e,t){let o=t.entries.map((n,r)=>{let i=e.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of e.entries.slice(o.length))o.push(Ur(n));return{key:e.key,entries:o}}function Ps(){let e=jt();if(!e)return!1;let t=e.clientHeight-e.scrollHeight;return e.scrollTop-t<=Math.abs(e.scrollTop)}function am(e,t){let o=rm(e,t);if(!t.length)return o;if(!o.length)return t;let n=t.findIndex(c=>o.some(d=>d.key===c.key));if(n<0)return Ps()?t.concat(o):o.concat(t);let r=t[n]?.key,i=o.findIndex(c=>c.key===r),a=o.slice(0,i).concat(t.slice(0,n),o.slice(i)),l=a.findIndex(c=>c.key===r);for(let c=n;c<t.length;c++){let d=t[c];if(!d)continue;let m=a.findIndex(v=>v.key===d.key);if(m>=0){let v=a[m];v&&(a[m]=im(v,d)),l=m}else a.splice(l+1,0,d),l++}return a}function sm(e,t){let o=0,n=0,r=0;for(let i=1-e.length;i<t.length;i++){let a=0,l=0;for(let d=0;d<e.length;d++){let m=t[d+i],v=e[d];!m||!v||(Nr(v,m)?(a+=3,l++):ze(v)&&ze(v)===ze(m)&&a++)}let c=Ps()?i<r:i>r;(a>o||a===o&&l>n||a===o&&l===n&&c)&&(o=a,n=l,r=i)}return{score:o,offset:r}}function lm(e,t){let o=e.entries.map((n,r)=>{let i=t.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of t.entries.slice(o.length))o.push({...n,turn:null});return{key:e.key,entries:o}}function cm(e){return e.map(t=>({key:t.key,entries:t.entries.map(o=>({...o}))}))}function um(e,t){if(!t.length)return e;if(!e.length)return t;let{score:o,offset:n}=sm(e,t),r=cm(e);if(o>0)for(let l=0;l<r.length;l++){let c=t[l+n],d=r[l];if(!c||!d)continue;let m=ze(d),v=!!m&&m===ze(c)&&Pr(e,m)===1&&Pr(t,m)===1;(Nr(d,c)||v)&&(r[l]=lm(d,c))}let i=[],a=[];for(let l=0;l<t.length;l++){let c=t[l];if(!c)continue;let d=ze(c);!d||Pr(r,d)>0||r.some(m=>Nr(m,c))||(o>0&&l<n?i.push(c):a.push(c))}return i.concat(r,a)}var Gr=e=>e.entries.some(t=>t.turn?.el.isConnected);function dm(e,t,o){let n=e.findIndex(i=>qt(i).includes(t));if(n>=0)return n+1;let r=e.find(Gr);return o&&r&&qt(r).includes(o)?0:e.length}function mm(e){if(pn){let{parent:t,user:o}=pn;for(let n of e.slice(dm(e,t,o))){let r=qt(n);if(!Gr(n)&&!(o&&r.includes(o)))for(let i of r)Hr.add(i)}}return e.filter(t=>Gr(t)||!qt(t).some(o=>Hr.has(o)))}function Rs(){_t=[],pn=null,Hr.clear()}function fm(){let e=Wa();e!==Dr&&(Dr=e,Rs());let t=om(),o=nm();return!t.length&&!o.length&&!Qa()?(_t=[],[]):(_t=mm(um(am(_t,t),o)),_t.flatMap(n=>n.entries).filter(_d))}function pm(e){for(let o of e)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!B().generating||e.some(o=>o.streaming))return;let t=e.at(-1);t&&(t.role==="assistant"||!gn.store.showAssistant?t.streaming=!0:e.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function Ds(){let e=fm();return pm(e),e}function Hs(e){let t=e.getBoundingClientRect(),o=K()?.getBoundingClientRect().top,n=Math.min(t.bottom,o&&o>t.top?o:t.bottom);return{top:t.top,bottom:n}}function Ns(e){return((e.matches(".whitespace-pre-wrap, .markdown, .prose, [data-markdown-text-style]")?e:e.querySelector(".whitespace-pre-wrap")??e.querySelector(".markdown, .prose, [data-markdown-text-style]"))??e).getBoundingClientRect().top}function Ls(e){let t=k[e]?.turn?.el;return t?.isConnected?t:null}function gm(e){if(!k.length)return null;let t=e.scrollHeight-e.clientHeight,o=yr(e),n=Math.min(e.scrollTop,0),r=o?-n:t-e.scrollTop,i=o?t+n:e.scrollTop,a=t<=yt||r<=yt,l=t>yt&&i<=yt,{top:c,bottom:d}=Hs(e),m=Ls(0),v=m?Ns(m):Number.NaN,Y=!!m&&v>=c-yt&&v<=c+48,A=Ls(k.length-1),G=A?.getBoundingClientRect().bottom??Number.NaN,Pe=!!A&&G<=d+yt&&G>=d-Vd;return a||Pe?"bottom":l||Y?"top":null}function hm(e){let{top:t,bottom:o}=Hs(e),n=t+Math.max(o-t,0)*zd,r=[],i=-1;if(k.forEach((l,c)=>{let d=l.turn?.el;if(!d?.isConnected){r.push(Number.NaN);return}let m=Ns(d);r.push(m),i<0&&(i=c),m<=n&&(i=c)}),i<0)return Math.max(k.findIndex(l=>l.turn),0);let a=r[re];return Number.isFinite(a)?i===re?re:i>re?i:a<=n+Jd?re:i:i}function bm(e){let t=gm(e);return t==="bottom"?k.length-1:t==="top"?0:hm(e)}function ks(e){gn.store.jumpEffect==="border"&&(e.classList.add(O("flash")),setTimeout(()=>e.classList.remove(O("flash")),Kd))}function hn(e){let t=k[e],o=jt();if(!t||!o)return;if(!t.turn&&!t.ids.length){je=e,eo(),o.scrollTo({top:yr(o)?0:o.scrollHeight});return}je=e,vt=e?null:{chat:b(),first:t.ids[0],until:Date.now()+Cs},eo();let n=t.turn?.el;if(n?.isConnected){let d=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:d<o.clientHeight*Qd?"smooth":"auto"}),ks(n);return}let r=k.findIndex(d=>d.turn),i=r>=0&&e<r?-1:1,a=++Rr,l=Date.now()+Cs,c=()=>{let d=jt();if(a!==Rr||Date.now()>l||!d)return;k=Ds();let m=k.find(Y=>Y.ids.some(A=>t.ids.includes(A)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),ks(m),je=k.findIndex(Y=>Y.turn?.el===m),eo();return}let v=d.scrollTop;d.scrollBy({top:i*d.clientHeight*jd,behavior:"instant"}),d.scrollTop===v?setTimeout(c,Wd):requestAnimationFrame(c)};c()}function Am(e,t){return s("button",{class:O("row"),attrs:{type:"button","data-index":String(t),"data-message-id":e.ids[0]??""},on:{click:()=>hn(t)}},s("span",{text:Xd[e.role]}),s("span",{class:"bloom-truncate",text:ae(e.summary||"\u2026",fn)}))}function Is(e){if(!R)return;let t=e.getBoundingClientRect(),o=K()?.getBoundingClientRect().top,r=Math.min(t.bottom,o&&o>t.top?o:t.bottom)-t.top;R.style.right=`${document.documentElement.clientWidth-t.left-e.clientLeft-e.clientWidth+Zd}px`,R.style.top=`${t.top}px`,R.style.height=r>1?`${r}px`:""}function ym(){let e=jt();if(k=Ds(),!k.length||!e){R?.remove(),R=null,dn="";return}if(to!==e){$t?.abort(),$t=new AbortController,e.addEventListener("scroll",lt(eo),{passive:!0,signal:$t.signal});for(let n of $d)e.addEventListener(n,Us,{passive:!0,signal:$t.signal});to=e,We?.disconnect(),We=new ResizeObserver(()=>{e.isConnected&&Is(e)}),We.observe(e),mn=null}let t=K();t&&t!==mn&&We&&(We.observe(t),mn=t),R??=s("div",{class:`bloom-root ${O("root")}`,attrs:{"data-bloom":"navigator"}},s("div",{class:O("rail")}),s("div",{class:O("toc")},s("div",{class:O("toc-head")}),s("div",{class:O("toc-list")}))),R.isConnected||document.body.append(R),Is(e);let o=JSON.stringify(k.map(n=>[n.role,n.ids]));o!==dn?(dn=o,je=-1,qm(),vt&&Date.now()<vt.until&&vt.chat===b()&&k[0]?.ids[0]!==vt.first&&hn(0)):vm(),eo()}function eo(){if(!R||!to)return;re=je>=0?je:bm(to),R.querySelectorAll(`.${O("tick")}`).forEach((t,o)=>t.classList.toggle(O("tick-current"),o===re)),R.querySelectorAll(`.${O("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===re)));let e=R.querySelector(`.${O("toc-head")}`);e&&(e.textContent=`${re+1} / ${k.length}`)}function vm(){R?.querySelectorAll(`.${O("tick")}`).forEach((e,t)=>{let o=k[t],n=ae(o.summary,fn);e.title!==n&&(e.title=n),e.classList.toggle(O("tick-streaming"),o.streaming)}),R?.querySelectorAll(`.${O("row")}`).forEach(e=>{let t=e.lastElementChild,o=ae(k[Number(e.dataset.index)].summary||"\u2026",fn);t&&t.textContent!==o&&(t.textContent=o)})}function qm(){R?.querySelector(`.${O("rail")}`)?.replaceChildren(...k.map((t,o)=>s("button",{class:Oo(O("tick"),O(`tick-${t.role}`),t.streaming&&O("tick-streaming"),o===re&&O("tick-current")),title:ae(t.summary,fn),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":t.ids[0]??""},on:{click:()=>hn(o)}}))),R?.querySelector(`.${O("toc-list")}`)?.replaceChildren(...k.map(Am))}var ue=lt(ym);function Us(){je=-1,vt=null,Rr++}var wm=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function Bs(e){if(!R||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||wm(document.activeElement)||F("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:re-1,ArrowDown:re+1,Home:0,End:k.length-1}[e.key];if(o==null){Us();return}o<0||o>=k.length||(e.preventDefault(),e.stopPropagation(),hn(o))}var Gs=f({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:gn,styles:Ts,start(){Ms=[T(e=>P(e)&&ue()),le(ue),Q.on("conversation",ue),Q.on("generate-start",({parentId:e,userId:t})=>{e&&(pn={parent:e,user:t},ue())}),q.on("rise",ue),q.on("fall",ue)],addEventListener("keydown",Bs,!0),addEventListener("resize",ue,{passive:!0}),ue()},stop(){for(let e of Ms)e();$t?.abort(),We?.disconnect(),We=void 0,to=null,mn=null,removeEventListener("keydown",Bs,!0),removeEventListener("resize",ue),R?.remove(),R=null,dn="",Rs(),Dr=""},onSettingsChange:ue});var Fs=`/*
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
`;var V=S("bloom-quotes-"),Vr="BloomBetterQuotes",Sm=40,Ws=8,Em=1800,Qr=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,Ys=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,Je=p({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),Fr,Yr,wt,Kr=!1,Wr=0,bn=null,An=null,ye=null;function Zr(){return location.pathname.match(/\/c\/(?!local-)([\w-]+)/)?.[1]??(new URLSearchParams(location.search).get("temporary-chat")==="true"?"temporary":"draft")}function vn(){try{let e=JSON.parse(sessionStorage.getItem(Vr)??"[]");return Array.isArray(e)?e.filter(t=>!!t&&typeof t=="object"&&typeof t.id=="string"&&typeof t.text=="string"&&!!t.text):[]}catch{return[]}}function Xr(e){try{sessionStorage.setItem(Vr,JSON.stringify(e.slice(-Sm)))}catch{}}function oo(e){return vn().find(t=>t.id===e)?.text??""}function Tm(e,t){let o=vn().filter(n=>n.id!==e);o.push({id:e,text:t}),Xr(o)}function jr(e=Zr()){Xr(vn().filter(t=>t.id!==e)),yn()}function Cm(e){let t=oo("draft");if(!t||oo(e))return;let o=vn().filter(n=>n.id!=="draft");o.push({id:e,text:t}),Xr(o)}function zr(e){return`${e.getAttribute("aria-label")??""} ${e.getAttribute("title")??""}`}function Mm(e){let t=zr(e);return Ys.test(t)&&!/quote|引用/.test(t)?!1:/quote|引用/.test(t)&&Qr.test(t)?!0:Qr.test(t)&&!Ys.test(t)}function js(e){let t=e.cloneNode(!0),o=[...t.querySelectorAll("button, [role='button']")],n=new Set(o.map(r=>r.getAttribute("aria-label")).filter(Boolean));for(let r of o)r.remove();for(let r of t.querySelectorAll("*"))!r.children.length&&n.has(h(r.textContent??""))&&r.remove();return h(t.textContent??"")}function Lm(e){let t=K(),o=e.parentElement,n=0;for(;o&&o!==t&&n<5;){if(n++,o.matches(u.composerInput)||o.querySelector(u.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=js(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function qn(){let e=K();if(!e)return null;for(let t of e.querySelectorAll("button, [role='button']")){if(t.closest("[data-bloom]")||!Mm(t))continue;let o=Lm(t),n=o?js(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:t}}return null}function km(e){let t=e.closest(u.searchUnit)??e.closest(u.oldMessage);return t&&(dt(t)??t.getAttribute("data-message-author-role"))==="user"?t:null}function $r(e){return h(e).slice(0,48)}function Im(e,t){let o=$r(e);if(o.length<Ws)return null;let n=null;for(let r of mt()){if(t&&(r===t||t.contains(r)||r.contains(t)))continue;let i=h(r.textContent??"");if(!i.includes(o))continue;let a=o.length/Math.max(i.length,1);(!n||a>n.score)&&(n={el:r,score:a})}return n?.el??null}function Bm(e,t){let o=$r(t),n=e;for(let r of e.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&h(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${V("hit")}`)?.classList.remove(V("hit")),n.classList.add(V("hit")),window.clearTimeout(Wr),Wr=window.setTimeout(()=>n.classList.remove(V("hit")),Em)}function Ks(e){let t=e.closest(u.timelineScroll)??document.scrollingElement;if(!(t instanceof HTMLElement)&&t!==document.scrollingElement)return;let o=e.getBoundingClientRect();if(o.height<1||!t)return;let n=t.getBoundingClientRect(),r=K()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,a=o.top+o.height/2-(n.top+i)/2;Math.abs(a)<8||t.scrollTo({top:t.scrollTop+a,behavior:"smooth"})}function _r(){if(!ye||!bn?.isConnected)return;let e=bn.getBoundingClientRect();e.width<1||(ye.style.top=`${Math.max(8,e.top+8)}px`,ye.style.left=`${Math.max(8,e.right-ye.offsetWidth-8)}px`)}function Om(e,t,o){bn=e,An=t,ye??=s("button",{class:`bloom-root ${V("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),ye.isConnected||document.body.append(ye),Bm(e,o),_r()}function Qs(){ye?.remove(),ye=null,bn=null,An=null,document.querySelector(`.${V("hit")}`)?.classList.remove(V("hit"))}function zs(){return document.querySelector('[data-bloom="quote-chip"]')}function yn(){zs()?.remove()}function Pm(e){let o=K()?.getBoundingClientRect();!o||o.width<8||(e.style.width=`${Math.max(120,o.width-24)}px`,e.style.left=`${o.left+12}px`,e.style.top=`${Math.max(8,o.top-e.offsetHeight-8)}px`)}function Rm(e){let t=zs();t||(t=s("div",{class:`bloom-root ${V("chip")}`,attrs:{"data-bloom":"quote-chip"}},s("span",{class:V("text")}),s("button",{class:V("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(t));let o=t.querySelector(`.${V("text")}`),n=h(e);o&&o.textContent!==n&&(o.textContent=n),t.dataset.text=e,Pm(t)}function Jr(){if(!Kr){Kr=!0;try{let e=Zr(),t=qn();Je.store.persistAcrossChats&&t&&oo(e)!==t.text&&Tm(e,t.text);let o=Je.store.persistAcrossChats?oo(e):"";!o||t&&h(t.text)===h(o)?yn():Rm(o),_r()}finally{Kr=!1}}}function Dm(e){let t=e.closest('[data-bloom="quote-chip"]');if(t instanceof HTMLElement&&!e.closest(`.${V("x")}`)){let i=t.dataset.text??t.querySelector(`.${V("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:t}:null}let o=e.closest("blockquote");if(o instanceof HTMLElement&&!e.closest("a, button")){let i=km(o),a=h(o.textContent??"");if(i&&a)return{text:a,skip:i,origin:o}}let n=K();if(!n||!n.contains(e)||Ue(e)||e.closest("button, [role='button']"))return null;let r=qn();return!r||!r.row.contains(e)?null:{text:r.text,skip:null,origin:r.row}}function Hm(e){let{target:t}=e;if(!(t instanceof Element))return;if(t.closest('[data-bloom="quote-back"]')){e.preventDefault(),e.stopPropagation(),An?.isConnected&&Ks(An);return}if(t.closest(`.${V("x")}`)){e.preventDefault(),e.stopPropagation(),jr();return}let o=qn();if(o&&(t===o.dismiss||o.dismiss.contains(t))){jr();return}if(Nm(t)&&Js(),!Je.store.jumpToPassage)return;let n=Dm(t);if(!n)return;let r=Im(n.text,n.skip);r&&(e.preventDefault(),e.stopPropagation(),Om(r,n.origin,n.text),Ks(r))}function Nm(e){let t=e.closest("button, [role='button']");return!(t instanceof HTMLElement)||t.closest("[data-bloom]")||!K()?.contains(t)?!1:/send|submit|发送|提交/i.test(zr(t))&&!Qr.test(zr(t))}function Um(e){return!(e instanceof KeyboardEvent)||e.key!=="Enter"||e.shiftKey||e.isComposing?!1:Ue(e.target)}function Js(){if(!Je.store.persistAcrossChats)return;let e=Zr(),t=oo(e);if(t){if(!qn()){let o=C(),n=$r(t);n.length>=Ws&&!h(o).includes(n)&&ne(`> ${t}

${o}`.trim())}jr(e)}}function Gm(e){Um(e)&&Js()}function Fm(e){!e.prevId&&e.id&&Cm(e.id),Jr()}var Vs=f({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:Je,styles:Fs,onSettingsChange(e){e==="jumpToPassage"&&!Je.store.jumpToPassage&&Qs(),e==="persistAcrossChats"&&!Je.store.persistAcrossChats&&(sessionStorage.removeItem(Vr),yn()),Jr()},start(){wt=new AbortController,document.addEventListener("pointerdown",Hm,{capture:!0,signal:wt.signal}),document.addEventListener("keydown",Gm,{capture:!0,signal:wt.signal}),addEventListener("scroll",_r,{capture:!0,passive:!0,signal:wt.signal}),Yr=le(Fm),Fr=T(e=>P(e)&&Jr())},stop(){wt?.abort(),wt=void 0,Yr?.(),Yr=void 0,Fr?.(),Fr=void 0,window.clearTimeout(Wr),Qs(),yn()}});var Zs=`/*
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
`;var Km=S("bloom-cls"),Qm="bloom-cls",Wm=600*1e3,ti=ta("tab"),St=new Map,ro=new Map,xt=null,Xs=[],jm=e=>e==="streaming"||e==="error";function zm(){let e=new Map,t=Date.now();for(let[o,n]of ro)t-n.at>Wm?ro.delete(o):e.set(o,n.status);for(let[o,n]of St)e.set(o,n);return e}function Jm(e){return s("span",{class:`bloom-root ${Km("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&D("alert"))}function no(){let e=zm(),t=new Set;for(let[o,n]of e)for(let r of Zt(o)){if(!be(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let a=Jm(n);t.add(a),r.append(a)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function wn(e,t){e&&(t?St.set(e,t):St.delete(e),xt?.postMessage({tab:ti,id:e,status:t}),no())}function Vm({data:e}){!L(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===ti||(jm(e.status)?ro.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):ro.delete(e.id),no())}function ei(){for(let e of St.keys())xt?.postMessage({tab:ti,id:e,status:null})}var $s=f({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:()=>`${Zs}`,start(){xt=typeof BroadcastChannel=="function"?new BroadcastChannel(Qm):null,xt?.addEventListener("message",Vm),addEventListener("pagehide",ei),Xs=[q.on("rise",({conversationId:e})=>wn(e,"streaming")),q.on("fall",({conversationId:e,outcome:t})=>wn(e,t==="error"?"error":null)),q.on("context",({prevId:e,id:t,migrated:o})=>{o&&B().generating?wn(t,"streaming"):!o&&St.get(e??"")==="streaming"&&wn(e,null)}),T(e=>P(e)&&no())],b()&&no()},stop(){for(let e of Xs)e();ei(),xt?.close(),xt=null,removeEventListener("pagehide",ei),St.clear(),ro.clear(),no()}});var el=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],En={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Zm={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Xm="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",oi=32,Tn=64,ni="#FCFCFC",ri="#111111",$m=14,Cn=51.5,_m=12.5,ef=9.75,_s=52,tf=10.5,of=7.75,nf={rotate:e=>e.arc(Cn,Cn,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function xn(e){let t=document.createElement("canvas");t.width=t.height=oi;let o=t.getContext("2d");return o?(o.scale(oi/Tn,oi/Tn),e(o),t.toDataURL("image/png")):""}function Sn(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(Xm);o&&(e.strokeStyle=ri,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function Mn(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function rf(e,t){Mn(e,Cn,_m,ri),Mn(e,Cn,ef,En[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),nf[t](e),e.stroke()}function af(e,t){e.beginPath(),e.roundRect(0,0,Tn,Tn,$m),e.fillStyle=t,e.fill()}var sf=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function tl(e,t){switch(e){case"original":return sf(Zm[t]);case"hole":return xn(o=>Sn(o,En[t],!0));case"bg":return xn(o=>{af(o,En[t]),Sn(o,ni,!1)});case"dot":return xn(o=>{Sn(o,ni,!0),Mn(o,_s,tf,ri),Mn(o,_s,of,En[t])});case"badge":return xn(o=>{Sn(o,ni,!0),rf(o,t)})}}var ao="bloom-chat-state-favicon",so="data-bloom-rel",si="data-bloom-media",ol="bloom-parked-icon",lf="/favicon.ico",rl=p({style:{type:"select",description:"How the tab icon shows the chat state.",options:el,default:"bg"}}),Me=null,il="",Ln=null,al="",nl=new Map,li,ii=[],sl=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${so}]`)];function ci(){for(let e of sl())e.id!==ao&&(e.hasAttribute(so)||(al||=e.href,e.setAttribute(so,e.rel),e.setAttribute(si,e.getAttribute("media")??"")),e.rel!==ol&&(e.rel=ol),e.media!=="not all"&&(e.media="not all"))}function cf(){for(let e of sl()){let t=e.getAttribute(so);if(t==null)continue;e.rel=t;let o=e.getAttribute(si);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(so),e.removeAttribute(si)}}function ll(){let e=document.getElementById(ao);return e||(e=document.createElement("link"),e.id=ao,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function uf(e){if(e==="wait")return al||lf;let t=rl.store.style,o=`${t}:${e}`,n=nl.get(o);return n||nl.set(o,n=tl(t,e)),n}function ai(e){if(e)return"rotate";let t=C();return Me&&t&&t!==il&&(Me=null),Me==="error"?"error":Me==="done"?"done":t?"ready":"wait"}function io(e,t=!1){if(e===Ln&&!t)return;Ln=e;let o=ll(),n=uf(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function df(){li=new MutationObserver(()=>{ci(),document.head.lastElementChild?.id!==ao&&ll()}),li.observe(document.head,{childList:!0})}var cl=f({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:rl,start(){ci(),io(ai(B().generating),!0),df(),ii=[q.on("rise",()=>{Me=null,io("rotate")}),q.on("fall",({outcome:e})=>{Me=e==="done"||e==="error"?e:null,il=C(),io(ai(!1))}),q.on("context",({migrated:e})=>{e||(Me=null)}),q.on("tick",({generating:e})=>{ci(),io(ai(e))})]},stop(){for(let e of ii)e();ii=[],li?.disconnect(),document.getElementById(ao)?.remove(),cf(),Ln=null,Me=null},onSettingsChange(){io(Ln??"wait",!0)}});var Le="data-bloom-invite",mf=/^(?:invite team members|invite members|邀请团队成员|邀请成员)$/i,ul=':is(button, a:not([href^="/c/"])):not(main *, [role="dialog"] *)',ff={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${u.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])'],hideInvite:[`[${Le}]`,`div:has(> [${Le}]:only-child)`]},dl=p({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0},hideInvite:{type:"boolean",description:"Hide Invite team members in the sidebar.",default:!0}}),kn,ui=!1;function pf(e){if(P(e))for(let t of document.querySelectorAll(`${ul}, [${Le}]`))!t.matches(ul)||!mf.test(h(t.textContent??""))?t.removeAttribute(Le):t.hasAttribute(Le)||t.setAttribute(Le,"")}var ml=f({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads, notices and Invite team members.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:dl,styles:()=>it(Object.entries(ff).flatMap(([e,t])=>dl.store[e]?t:[])),start(){ui=!0,Ge().then(()=>{ui&&!kn&&(kn=T(pf))})},stop(){ui=!1,kn?.(),kn=void 0;for(let e of document.querySelectorAll(`[${Le}]`))e.removeAttribute(Le)}});var Et=`form:has(:is(${u.composerInput})), ${u.oldComposerForm}`,In='[class*="ComposerLayoutBody"]',di='[class*="ComposerLayoutRoot"]',gf='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',hf=`:is(${Et}) ${In}, :is(${Et}):not(:has(${In})) ${di}, :is(${Et}):not(:has(${In})):not(:has(${di})) :is(${gf})`,bf='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',Af='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',yf="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))",fl=p({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function vf(){let{opacity:e,blur:t}=fl.store;if(e>=100)return"";let o=yf,n="background-color:transparent!important;background-image:none!important;box-shadow:none!important",r=`background-color:color-mix(in srgb, ${o} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important;-webkit-backdrop-filter:blur(${t}px)!important`;return`:is(${bf}), :is(${Et}){${n}}:is(${Af}){display:none!important}${hf}{${r}}:is(${Et}):has(${In}) ${di}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${Et}) :is(${u.composerInput}){background-color:transparent!important}`}var pl=f({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:fl,styles:vf});var qf=1200,wf=8e3,xf=150,Sf=20,gl=6,pi="continue where you left",Ef=/message delivery timed out|please try again/i,hl=/waiting for the complete answer/i,bl=p({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:pi,placeholder:pi}}),mi=[],On=0,lo=!1,co=0,Ct="",Bn="",gi=0,Mt=!1,uo=!1,Pn=!0,Tt="",hi=0,Rn=!1,Tf=()=>bl.store.prompt.trim()||pi;function Al(){return(F(u.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function yl(){let e=Al();return!e||hl.test(e)||!Ef.test(e)?"":e}function Cf(){let e=Al();return e&&hl.test(e)?e:""}function Mf(){let e=ut()?.querySelectorAll(u.turn),t=e?.[e.length-1];return`${t?.getAttribute("data-turn-key")??""}:${t?.textContent?.length??0}`}function vl(e,t,o){if(o===On){if(B().generating||C()!==e||t>=Sf){Mt=!1,B().generating||(Ct="");return}Qo(),setTimeout(()=>vl(e,t+1,o),xf)}}function Lf(e){let t=On;if(B().generating||C()&&C()!==e){Mt=!1,Ct="";return}ne(e),Rn=!0,Qt(()=>{t===On&&vl(e,0,t)})}function ql(e){return e===Ct||co>=gl||B().generating||C()?!1:(Ct=e,co+=1,Mt=!0,Lf(Tf()),!0)}function kf(){if(lo||Mt||uo)return;let e=Date.now(),t=yl();if(t){if(Tt="",t!==Bn){Bn=t,gi=e;return}if(e-gi<qf)return;ql(`${b()??""}:${t}`);return}if(Bn="",!Cf()){Pn=!0,Tt="";return}if(!Pn||!B().generating||C())return;let n=`${b()??""}:${Mf()}`;if(n!==Tt){Tt=n,hi=e;return}if(e-hi<wf||co>=gl)return;let r=ct();r&&(uo=!0,r.click())}function fi(){On+=1,lo=!1,co=0,Ct="",Bn="",gi=0,Mt=!1,uo=!1,Pn=!0,Tt="",hi=0,Rn=!1}var wl=f({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:bl,start(){fi(),mi=[q.on("rise",()=>{lo=!1,Ct="",Mt=!1,Rn&&(Rn=!1,Pn=!1,Tt="")}),q.on("fall",({outcome:e})=>{if(uo){uo=!1,e==="left"?lo=!0:ql(`${b()??""}:stall`);return}(e==="stopped"||e==="left")&&(lo=!0),e==="done"&&!yl()&&(co=0)}),q.on("context",({migrated:e})=>{e||fi()}),q.on("tick",kf)]},stop(){for(let e of mi)e();mi=[],fi()}});var ve=S("bloom-csi-"),If=256,Bf=160,Dn=1,xl=4,Of=.1,Pf=.0015,Rf=250;function Df(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function Hf(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function Nf(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:xe(t.x,n,1-n),y:xe(t.y,r,1-r)}}function Sl(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function Uf(e,t){let o=s("canvas");return o.width=o.height=If,Sl(o,e,t),o.toDataURL("image/png")}function El(e){let t=null,o={x:H.store.cropX,y:H.store.cropY,zoom:H.store.cropZoom},n,r=s("canvas",{class:ve("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=Bf*devicePixelRatio;let i=s("div",{class:`bloom-muted ${ve("status")}`}),a=s("div",{class:ve("zoom")}),l=s("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function c(A,G=!0){t&&(o=Nf(t,A),Sl(r,t,o),G&&(clearTimeout(n),n=setTimeout(()=>{t&&(H.store.cropX=o.x,H.store.cropY=o.y,H.store.cropZoom=o.zoom,H.store.avatarUrl=Uf(t,o))},Rf)))}function d(){a.replaceChildren(rn(o.zoom,Dn,xl,Of,"\xD7",A=>c({...o,zoom:A})))}async function m(A,G){i.textContent="";try{t=await Hf(A),G&&(H.store.avatarSource=A,o={x:.5,y:.5,zoom:Dn}),e.classList.add(ve("has-image")),d(),c(o,G)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let v=A=>{A?.type.startsWith("image/")&&Df(A).then(G=>m(G,!0))};l.addEventListener("change",()=>v(l.files?.[0])),r.addEventListener("wheel",A=>{t&&(A.preventDefault(),c({...o,zoom:xe(o.zoom*(1-A.deltaY*Pf),Dn,xl)}),d())},{passive:!1}),r.addEventListener("pointerdown",A=>{if(!t)return;r.setPointerCapture(A.pointerId);let G={...o},Pe=r.getBoundingClientRect(),Lo=ko=>{if(!t)return;let ee=Math.max(Pe.width/t.naturalWidth,Pe.height/t.naturalHeight)*o.zoom;c({...o,x:G.x-(ko.clientX-A.clientX)/(t.naturalWidth*ee),y:G.y-(ko.clientY-A.clientY)/(t.naturalHeight*ee)})};r.addEventListener("pointermove",Lo),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",Lo),{once:!0})});let Y=s("div",{class:ve("cropper"),attrs:{tabindex:"0"},on:{paste:A=>v([...A.clipboardData?.files??[]].find(G=>G.type.startsWith("image/"))),dragover:A=>A.preventDefault(),drop:A=>{A.preventDefault(),v(A.dataTransfer?.files[0])}}},s("div",{class:ve("stage")},r),s("div",{class:ve("controls")},Vt("",A=>A.trim()&&void m(A.trim(),!0),"https://\u2026 or data:image/\u2026","url"),s("div",{class:ve("buttons")},W("Choose file",()=>l.click()),W("Reset crop",()=>{c({x:.5,y:.5,zoom:Dn}),d()}),W("Clear",()=>{t=null,e.classList.remove(ve("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),H.store.avatarUrl="",H.store.avatarSource=""},"danger")),a,i,l));return e.append(Y),H.store.avatarSource&&m(H.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var Tl=`/*
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
`;var mo="data-bloom-csi-avatar",bi="data-bloom-csi-sized",kl="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",Ff=32,H=p({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>El(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),Cl=[];function Il(e){e.removeAttribute(mo),e.removeAttribute(bi)}function Ml(e){return(H.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function Ll(e=[]){if(!P(e))return;let t=H.store.displayName.trim()||null,o=!!H.store.avatarUrl,n=new Set(t?Ml("name"):[]);for(let i of document.querySelectorAll(kl))n.has(i)||Ne(i,null);for(let i of n)Ne(i,t);let r=new Set(o?Ml("avatar"):[]);for(let i of document.querySelectorAll(`[${mo}]`))r.has(i)||Il(i);for(let i of r)i.hasAttribute(mo)||i.setAttribute(mo,""),i.toggleAttribute(bi,!i.closest('[role="menu"]'))}function Yf(){let e=H.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${H.store.avatarSize}px}:is(${u.rail}, ${u.oldRail}) [${bi}]{--bloom-csi-size:${Ff}px}`:""}var Bl=f({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:H,styles:()=>`${Yf()}
${Tl}`,start(){Cl=[ce(),T(Ll)]},stop(){for(let e of Cl)e();for(let e of document.querySelectorAll(`[${mo}]`))Il(e);for(let e of document.querySelectorAll(kl))Ne(e,null)},onSettingsChange(){Ll()}});var Lt=S("bloom-greeting-"),Ol=30,Pl=100;function Rl(e){let t=-1,o=s("textarea",{class:`bloom-input ${Lt("input")}`,attrs:{maxlength:String(Pl),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=W("Add",i),r=s("div",{class:Lt("list")});function i(){let c=o.value.trim().slice(0,Pl);if(!c)return;let d=[...M.store.greetings];t>=0?d[t]=c:d.length<Ol&&d.push(c),M.store.greetings=d,t=-1,o.value="",a()}function a(){let{greetings:c}=M.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&c.length>=Ol,r.replaceChildren(...c.length?c.map((d,m)=>s("div",{class:Lt("row",m===t?"row-editing":"row-idle")},s("div",{class:Lt("text"),text:d}),J("edit","Edit",()=>{t=m,o.value=d,o.focus(),a()}),J("trash","Delete",()=>{M.store.greetings=c.filter((v,Y)=>Y!==m),t===m&&(t=-1),a()}))):[s("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",c=>{c.key==="Enter"&&(c.ctrlKey||c.metaKey)&&i()}),e.append(s("div",{class:Lt("editor")},r,s("div",{class:Lt("form")},o,n))),a();let l=st((c,d)=>c==="GreetingCustomizer"&&d==="greetings"&&a());return()=>{l(),e.replaceChildren()}}var Dl=`/*
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
`;var Un="data-bloom-greeting",Qf=1e3,Wf=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],M=p({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>Rl(e)},greetings:{type:"custom",default:Wf},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),Hn,Hl=[],Ai,po=()=>Xo()&&!se(),jf=e=>e.replaceAll(/\s*\n\s*/g," ").trim(),Ul=()=>M.store.greetings.filter(e=>typeof e=="string"&&e.trim());function go(){let e=Ul();if(e.length)if(M.store.order==="random"&&e.length>1){let t=M.store.lastRandom;for(;t===M.store.lastRandom;)t=Math.floor(Math.random()*e.length);M.store.lastRandom=t,M.store.index=t}else M.store.index=(M.store.index+1)%e.length}function zf(){return po()?F(u.homeHeading):null}function Nn(){for(let e of document.querySelectorAll(`[${Un}]`))e.removeAttribute(Un),Ne(e,null)}function Gn(){for(let e of document.querySelectorAll("[data-bloom-placeholder]"))e.removeAttribute("data-bloom-placeholder")}function Nl(e){let t=he(),o=jf(e);if(!t||!o||C(t)){Gn();return}t.getAttribute("data-bloom-placeholder")!==o&&t.setAttribute("data-bloom-placeholder",o)}function fo(){let e=Ul(),t=Ua(),o=po();if(!e.length||!t&&!o){Nn(),Gn();return}if(t){Nn(),Nl(e[0]??"");return}let n=zf();n?((M.store.index<0||M.store.index>=e.length)&&go(),n.setAttribute(Un,""),Ne(n,e[Math.max(0,M.store.index)%e.length]??"")):Nn(),M.store.heroOnlyOutsideProject?Gn():Nl(e[Math.max(0,M.store.index)%e.length]??"")}function yi(){clearInterval(Hn),Hn=void 0,M.store.mode==="interval"&&po()&&(Hn=setInterval(()=>{go(),fo()},M.store.intervalSec*Qf))}function Jf(e){M.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${Un}]`)||getSelection()?.toString()||(go(),fo())}function Vf(){po()&&M.store.mode==="refresh"&&go(),yi(),fo()}var Gl=f({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:M,styles:Dl,start(){Ai=new AbortController,document.addEventListener("click",Jf,{signal:Ai.signal}),po()&&M.store.mode==="refresh"&&go(),yi(),Hl=[T(e=>P(e)&&fo()),le(Vf)]},stop(){Ai?.abort();for(let e of Hl)e();clearInterval(Hn),Nn(),Gn()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&yi(),fo()}});var ho=S("bloom-history-"),vi=10,Zf=3e3;function Fl(e){let t="",o=0,n=new Set,r=s("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=s("div",{class:ho("list")}),a=s("div",{class:ho("pager")}),l,c=W("Clear all",()=>{if(!l){c.textContent="Click again to clear",l=setTimeout(()=>{l=void 0,c.textContent="Clear all"},Zf);return}clearTimeout(l),l=void 0,c.textContent="Clear all",bo([])},"danger");function d(){let v=[...Ve.store.entries].toReversed(),Y=t.trim().toLowerCase(),A=Y?v.filter(ee=>ee.toLowerCase().includes(Y)):v,G=Math.max(1,Math.ceil(A.length/vi));o=Math.min(o,G-1);let Pe=A.slice(o*vi,(o+1)*vi).map(ee=>s("div",{class:ho("row")},s("button",{class:ho("text",n.has(ee)?"text-open":"text-closed"),text:ee,title:n.has(ee)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(ee)||n.add(ee),d()}}}),J("copy","Copy",()=>void oa(ee)),J("trash","Delete",()=>bo(Ve.store.entries.filter(uu=>uu!==ee)))));i.replaceChildren(...Pe.length?Pe:[s("div",{class:"bloom-muted",text:Y?"No matching prompts.":"No saved prompts yet."})]),a.replaceChildren(s("span",{class:"bloom-muted",text:`${A.length} ${Y?"matching":"saved"} \xB7 page ${o+1} of ${G}`}),W("Previous",()=>{o--,d()}),W("Next",()=>{o++,d()}),c);let[Lo,ko]=a.querySelectorAll("button");Lo.disabled=o===0,ko.disabled=o>=G-1,c.disabled=!v.length}r.addEventListener("input",()=>{t=r.value,o=0,d()}),e.append(s("div",{class:ho("manager")},r,i,a)),d();let m=st((v,Y)=>v==="InputHistory"&&Y==="entries"&&d());return()=>{m(),clearTimeout(l),e.replaceChildren()}}var Yl=`/*
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
`;var $f=S("bloom-history-"),_f=2e3,Ve=p({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>Fl(e)},entries:{type:"custom",default:[]}}),_=null,qi={text:"",at:0},Ze=null,wi,Fn=()=>Ve.store.entries.filter(e=>typeof e=="string");function bo(e){Ve.store.entries=e.slice(-Ve.store.maxEntries)}function xi(e){let t=e.trim();if(!t)return;let o=Date.now();t===qi.text&&o-qi.at<_f||(qi={text:t,at:o},bo([...Fn().filter(n=>n!==t),t]))}function ep(e,t){let o=he();if(!o)return;Ze??=s("div",{class:`bloom-root ${$f("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),Ze.textContent=`${e+1} / ${t}`;let n=(o.closest("form")??o).getBoundingClientRect();Ze.style.left=`${n.left+n.width/2}px`,Ze.style.top=`${n.top}px`,Ze.isConnected||document.body.append(Ze)}function Ao(){_=null,Ze?.remove()}function tp(e){let t=Fn();if(!_)return;let o=t[e];_.index=e,_.shown=o,ne(o),ep(t.length-1-e,t.length)}function op(e){let t=Fn();if(!t.length)return!1;if(!_){if(e===1)return!1;_={index:t.length,draft:C(),shown:""}}let o=_.index+e;return o<0?!0:o>=t.length?(ne(_.draft),Ao(),!0):(tp(o),!0)}function Kl(e){return Ue(e)?e:e instanceof HTMLElement?e.closest(u.composerInput):null}function np(){if(he()?.closest("[data-chatgpt-composer], [data-composer-input], form")?.querySelector('[aria-expanded="true"]'))return!0;for(let t of document.querySelectorAll('[role="listbox"], [role="menu"], [data-radix-popper-content-wrapper], [cmdk-root], [cmdk-list]')){if(!(t instanceof HTMLElement)||t.closest("[data-bloom]"))continue;let o=getComputedStyle(t);if(!(o.display==="none"||o.visibility==="hidden"))return!0}return!1}function rp(e){if(e.isComposing||e.key==="Process"||e.keyCode===229)return;let t=Kl(e.target);if(!t)return;if(e.key==="Enter"&&!e.shiftKey){xi(C(t)),Ao();return}if(e.key==="Escape"&&_){ne(_.draft),Ao(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey||np())return;let o=Ta(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!_||op(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function ip(e){_&&Kl(e.target)&&C()!==_.shown.trim()&&Ao()}function ap(e){e.target instanceof Element&&e.target.closest(u.sendButton)&&xi(C())}var Ql=f({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:Ve,styles:Yl,start(){wi=new AbortController;let{signal:e}=wi;document.addEventListener("keydown",rp,{capture:!0,signal:e}),document.addEventListener("input",ip,{capture:!0,signal:e}),document.addEventListener("click",ap,{capture:!0,signal:e}),document.addEventListener("submit",()=>xi(C()),{capture:!0,signal:e})},stop(){wi?.abort(),Ao()},onSettingsChange(e){e==="maxEntries"&&bo(Fn())}});var Wl=`/*
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
`;var lp=1500,cp=5e3,up=2e3,Xl=[{label:"UTC",value:"UTC"},{label:"\u7F8E\u56FD\u4E1C\u90E8",value:"America/New_York"},{label:"\u7F8E\u56FD\u4E2D\u90E8",value:"America/Chicago"},{label:"\u7F8E\u56FD\u5C71\u5730",value:"America/Denver"},{label:"\u7F8E\u56FD\u897F\u90E8",value:"America/Los_Angeles"},{label:"\u65E5\u672C",value:"Asia/Tokyo"},{label:"\u53F0\u6E7E",value:"Asia/Taipei"}],kt=p({sourceTimeZone:{type:"select",description:"Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",options:Xl,default:"UTC"},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),Kn=new Map,Si=new Set,$l=0,Qn,jl=[];function _l(e,t){Kn.get(e)!==t&&(Kn.set(e,t),clearTimeout(Qn),Qn=setTimeout(ec,up))}function ec(){let e={...kt.store.stamps,...Object.fromEntries(Kn)};kt.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,lp))}function dp(e){let t=ie(b())?.times;for(let o=e.length-1;o>=0;o--){let n=Kn.get(e[o])??t?.get(e[o])??kt.store.stamps[e[o]];if(n)return n}return null}var mp=()=>B().generating||Date.now()-$l<cp;function tc(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function oc(){let e=kt.store.sourceTimeZone;if(!e||e==="UTC")return"UTC";try{return Intl.DateTimeFormat(void 0,{timeZone:e}),e}catch{return"UTC"}}function nc(e,t){let o={};for(let n of new Intl.DateTimeFormat("en-US",{timeZone:t,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(e)))o[n.type]=n.value;return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour%24,mi:+o.minute,s:+o.second}}function rc(e){return Date.UTC(e.y,e.m-1,e.d,e.h,e.mi,e.s)}function zl(e,t){let o=e;for(let n=0;n<4;n++){let r=e-rc(nc(o,t));if(r===0)return o;o+=r}return o}function fp(e,t){if(t==="UTC")return e;let o=(e%1e3+1e3)%1e3,n=e-o,r=new Date(n),i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds()),a=zl(i,t),l=3600*1e3,c=Number.POSITIVE_INFINITY;for(let d of[-l,0,l]){let m=a+d;rc(nc(m,t))===i&&m<c&&(c=m)}return c!==Number.POSITIVE_INFINITY?c+o:zl(i+l,t)+o}function pp(e,t){let o=oc();return t||o==="UTC"?e:fp(e,o)}function Jl(e,t){return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(e)}function gp(e){let t=tc(),o=Date.now(),n={hour:"2-digit",minute:"2-digit",timeZone:t};if(Jl(e,t)===Jl(o,t))return new Intl.DateTimeFormat(void 0,n).format(e);let r=a=>new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric"}).format(a),i=r(e)===r(o)?{}:{year:"numeric"};return new Intl.DateTimeFormat(void 0,{...i,month:"short",day:"numeric",...n}).format(e)}function hp(e,t){let o=new Date(t).toLocaleString(void 0,{timeZone:tc()}),n=oc();if(n==="UTC"||t===e)return o;let r=new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"}).format(e);return`${Xl.find(a=>a.value===n)?.label??n} ${r} \u2192 ${o}`}function ic(e){let t=dt(e)??e.getAttribute("data-message-author-role")??e.closest(u.turn)?.getAttribute("data-turn")??e.querySelector(u.authorRole)?.getAttribute("data-message-author-role");if(Ar(t))return t;let o=Wt(e).at(-1);return ie(b())?.chain.find(n=>n.id===o)?.role??null}var Vl='[class*="group/activity-header"]';function bp(e){let t=e.parentElement;if(!t)return null;let o=e.closest(u.turn);return o&&t!==o&&!o.contains(t)?null:t}function Ap(e){let t=e;for(let o=0;o<8&&t;o++){let n=bp(t);if(!n)return null;let r=[...n.children],i=r.indexOf(t);for(let a=i-1;a>=0;a--){let l=r[a],c=l.matches(Vl)?l:l.querySelector(Vl);if(c)return c;if(l.matches(u.searchUnit)||l.querySelector(u.searchUnit))return null}if(n===t.closest(u.turn))return null;t=n}return null}function yp(e){let t=e.parentElement;for(let o=0;o<4&&t;o++){if(t.classList.contains("flex-col"))return t;t=t.parentElement}return e.parentElement??e}function ac(e,t){if(t==="assistant"){let o=Ap(e);if(o)return yp(o)}return e}function vp(e,t){let o=mt();for(let n=o.length-1;n>=0;n--){let r=o[n];if(!(r!==e&&(ic(r)!=="assistant"||ac(r,"assistant")!==t)))return r===e}return!0}function Zl(e){return e.querySelector(':scope > time[data-bloom="timestamp"]')}function qp(e){let t=Wt(e);if(!t.length||!be(e)||e.querySelector("time:not([data-bloom])"))return;let o=ic(e),n=ac(e,o);if(n!==e&&!vp(e,n)){Zl(e)?.remove();return}let r=dp(t),i=!1;if(!r&&mp()){r=Date.now();let m=t.at(-1);Si.add(m),_l(m,r),i=!0}else r&&Si.has(t.at(-1))&&(i=!0);let a=n.querySelector('time[data-bloom="timestamp"]')??Zl(e);if(!r||kt.store.hideOwnMessages&&o==="user"){a?.remove();return}let l=pp(r,i),c=gp(l);if(a?.textContent===c&&a.parentElement===n&&a===n.firstElementChild)return;let d=s("time",{class:`bloom-timestamp bloom-timestamp-${o??"assistant"}`,text:c,title:hp(r,l),attrs:{"data-bloom":"timestamp",datetime:new Date(l).toISOString()}});a&&a.replaceWith(d),(d.parentElement!==n||d!==n.firstElementChild)&&n.prepend(d)}var Yn=lt(()=>{for(let e of mt())qp(e)}),sc=f({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:kt,styles:Wl,start(){jl=[T(e=>P(e)&&Yn()),Q.on("conversation",Yn),Q.on("message-time",({messageId:e,time:t})=>{Si.delete(e),_l(e,t),Yn()}),q.on("fall",()=>{$l=Date.now()})]},stop(){for(let e of jl)e();Qn&&(clearTimeout(Qn),ec());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();Yn()}}});var wp=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])','[data-chatgpt-composer] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-composer-input] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-codex-composer-root] button[aria-label^="Dictat" i], [data-composer-placement] button[aria-label^="Dictat" i], [class*="ComposerLayout"] button[aria-label^="Dictat" i]'],xp=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],lc=p({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),cc=f({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:lc,styles:()=>it([...wp,...lc.store.hideDictationSettings?xp:[]])});var Xe="data-bloom-share",Sp=/^\/g\/g-p-/,Ep=/^(?:share|分享)$/i,Tp=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],Cp=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${Xe}="project"]`],Ei=p({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),Wn,Ti=!1;function Mp(e){if(!P(e))return;let t=Sp.test(location.pathname)&&!b();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${Xe}]`))!t||!Ep.test(h(o.textContent??""))?o.removeAttribute(Xe):o.hasAttribute(Xe)||o.setAttribute(Xe,"project")}var uc=f({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:Ei,styles:()=>it([...Ei.store.hideShareChat?Tp:[],...Ei.store.hideShareProject?Cp:[]]),start(){Ti=!0,Ge().then(()=>{Ti&&!Wn&&(Wn=T(Mp))})},stop(){Ti=!1,Wn?.(),Wn=void 0;for(let e of document.querySelectorAll(`[${Xe}]`))e.removeAttribute(Xe)}});var dc='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',Lp='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',kp="[data-bloom-profile-plan]",mc="visibility:hidden!important;user-select:none!important",pc=p({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function Ip(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=pc.store,r=[];return e&&r.push(n?`:is(${dc}){display:none!important}`:`:is(${dc}){${mc}}`),t&&r.push(`:is(${Lp}){${mc}}`),e&&o&&r.push(`${kp}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var fc,gc=f({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:pc,styles:Ip,start(){fc=ce()},stop(){fc?.()}});var Bp="model-switcher-dropdown-button",Ci="data-selected-reasoning-effort",jn="ArrowLeft",hc=e=>e.startsWith("model-switcher-")&&e!==Bp?e.slice(15):"",yo=(e,t)=>e.id===t.id||!!e.label&&e.label===t.label;function bc(){let e=K();return(e&&F(u.modelTrigger,e))??F(u.modelTrigger)}function de(){let e=bc();if(!e)return null;let t=e.getAttribute("aria-expanded")==="true",o=e.getAttribute(Ci),n=o&&t?"":h(e.innerText),r=o||hc(e.getAttribute("data-testid")??"")||n;return r?{id:r,label:n||r}:null}function Op(e){return[...document.querySelectorAll(u.modelItem)].find(t=>{let o=hc(t.getAttribute("data-testid")??""),n=h(t.textContent??"");return o===e.id||n===e.label||n===e.id})??null}function Pp(e){let t=e.querySelector("[role=slider]"),o=Number(t?.getAttribute("aria-valuenow")),n=Number(t?.getAttribute("aria-valuemax"));o<=0?jn="ArrowRight":o>=n&&(jn="ArrowLeft"),e.focus(),e.dispatchEvent(new KeyboardEvent("keydown",{key:jn,code:jn,bubbles:!0,cancelable:!0}))}function Mi(e){let t=de(),o=bc();if(t&&yo(t,e))return o?.hasAttribute(Ci)&&o.getAttribute("aria-expanded")==="true"&&document.querySelector("[role=menu]")?.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),!0;if(o?.hasAttribute(Ci)){let r=document.querySelector(u.effortSlider);return r?Pp(r):o.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,button:0,pointerType:"mouse",isPrimary:!0})),!1}let n=Op(e);if(n){n.click();let r=de();return!!r&&yo(r,e)}return o?.getAttribute("aria-expanded")!=="true"&&o?.click(),!1}var Ac=`/*
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
`;var N=S("bloom-queue-"),Dp=6,Hp=8,Z=null,vo="",It=!1,Bt=!1;function Li(e,t,o){let n=J(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute(Ae),n.addEventListener("mouseenter",()=>yc(t)),n.addEventListener("mouseleave",()=>yc("")),n}function yc(e){let t=Z?.querySelector(`.${N("tip")}`);t&&(t.textContent=e)}function Np(e,t,o,n){Bt=!0;let r=s("textarea",{class:`bloom-input ${N("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=new AbortController,a=l=>{i.abort(),Bt=!1,vo="",l?n.edit(t,r.value):r.replaceWith(s("div",{class:N("text"),text:o}))};addEventListener("keydown",l=>{if(!(l.target!==r||l.isComposing)){if(l.key==="Enter"&&!l.shiftKey)a(!0);else if(l.key==="Escape")a(!1);else return;l.preventDefault(),l.stopImmediatePropagation()}},{capture:!0,signal:i.signal}),r.addEventListener("keydown",l=>l.stopPropagation(),{signal:i.signal}),r.addEventListener("blur",()=>a(!0),{signal:i.signal}),e.querySelector(`.${N("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function Up(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,a=c=>{!i&&Math.abs(c.clientY-n.clientY)<Dp||(i||(i=Bt=!0,e.classList.add(N("dragging"))),e.style.transform=`translateY(${c.clientY-n.clientY}px)`)},l=c=>{if(removeEventListener("pointermove",a),!i)return;Bt=!1,vo="";let m=[...r.children].filter(v=>v!==e).filter(v=>v.getBoundingClientRect().top+v.getBoundingClientRect().height/2<c.clientY).length;o.move(t,m)};addEventListener("pointermove",a),addEventListener("pointerup",l,{once:!0})})}function Gp(e,t,o,n){let r=s("li",{class:N("row")},s("div",{class:N("text"),text:e.text}),n&&e.label?s("span",{class:N("model"),title:e.label,text:e.label}):null,s("div",{class:N("actions")},Li("trash","Remove from queue",()=>o.remove(t)),Li("edit","Edit",()=>Np(r,t,e.text,o)),Li("send","Send now",()=>o.sendNow(t))));return Up(r,t,o),r}function Fp(e){if(!Z)return;let t=e.getBoundingClientRect();Z.style.left=`${t.left}px`,Z.style.width=`${t.width}px`,Z.style.bottom=`${innerHeight-t.top+Hp}px`}function ki(){Z?.remove(),Z=null,vo="",Bt=!1}function $e(e,t,o=!0){let n=K();if(!e.length||!Kt(n)){ki();return}Z||(Z=s("div",{class:`bloom-root ${N("tray")}`,attrs:{"data-bloom":"queue"}},s("div",{class:N("header")},s("button",{class:N("toggle"),attrs:{type:"button","aria-expanded":String(!It)},on:{click:a=>{It=!It,Z?.classList.toggle(N("collapsed"),It),a.currentTarget.setAttribute("aria-expanded",String(!It))}}},s("span",{class:N("count")}),D("chevron")),s("span",{class:N("tip")})),s("ol",{class:N("list")})),Z.classList.toggle(N("collapsed"),It),document.body.append(Z)),Fp(n);let r=JSON.stringify([o,...e.map(a=>[a.text,o?a.label:""])]);if(Bt||r===vo)return;vo=r;let i=Z.querySelector(`.${N("count")}`);i&&(i.textContent=Io(e.length,"Queued message")),Z.querySelector(`.${N("list")}`)?.replaceChildren(...e.map((a,l)=>Gp(a,l,t,o)))}var Zn=new x("PromptQueue"),Yp=8,wo=150,zn=20,Kp=300,me="BloomPromptQueue",Bi="BloomPromptQueueClaim",vc="BloomPromptQueueTab",Qp=4e3,z=p({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1},showQueueMode:{type:"boolean",description:"Show the model that was selected when each message was queued.",default:!0},stickyOnNavigate:{type:"boolean",description:"Keep the selected model when switching chats.",default:!0},persistAcrossRefresh:{type:"boolean",description:"Restore unsent queued messages in this browser after a refresh. Other tabs show the same queue; only one of them sends it.",default:!0}}),fe=new Map,qo=!1,_e=null,Ot,qc=[],ke=null,tt=!1,xo,Jn="draft",So=()=>b()??Jn,X=()=>fe.get(So())??[],Oi=e=>({id:e.model||e.label,label:e.label||e.model});function Wp(e){return typeof e=="string"?e.trim()?{text:e,model:"",label:""}:null:!L(e)||typeof e.text!="string"||!e.text.trim()?null:{text:e.text,model:typeof e.model=="string"?e.model:"",label:typeof e.label=="string"?e.label:""}}function Pi(){let e=sessionStorage.getItem(vc);if(e)return e;let t=globalThis.crypto?.randomUUID?.()??`${Date.now()}-${Math.random()}`;return sessionStorage.setItem(vc,t),t}function Sc(){let e=Se(localStorage.getItem(Bi)??"");return!L(e)||typeof e.tab!="string"||typeof e.at!="number"||typeof e.key!="string"?null:{tab:e.tab,at:e.at,key:e.key}}function Ec(){let e={tab:Pi(),at:Date.now(),key:So()};try{localStorage.setItem(Bi,JSON.stringify(e))}catch(t){Zn.warn("Could not claim the queue",t)}}function jp(){let e=Sc();if(e?.tab===Pi())try{localStorage.setItem(Bi,JSON.stringify({...e,at:Date.now()}))}catch(t){Zn.warn("Could not refresh the queue claim",t)}}function zp(){let e=Sc();return!e||e.tab===Pi()||e.key!==So()?!0:Date.now()-e.at<=Qp?!1:(Ec(),!0)}function Jp(){return Object.fromEntries([...fe].filter(([e])=>e!==Jn))}function Ii(e){let t=typeof e=="string"?Se(e):e;if(!L(t))return!1;let o=!1;for(let[n,r]of Object.entries(t)){if(!Array.isArray(r))continue;let i=r.map(Wp).filter(a=>a!=null);i.length&&(fe.set(n,i),o=!0)}return o}function Vp(){if(!z.store.persistAcrossRefresh){sessionStorage.removeItem(me),rr(me);return}Ii(sessionStorage.getItem(me))||Ii(Po(me))&&Vn()}function Vn(){try{if(!z.store.persistAcrossRefresh){sessionStorage.removeItem(me),rr(me);return}let e=Jp();sessionStorage.setItem(me,JSON.stringify(e)),Ro(me,e)}catch(e){Zn.warn("Could not save the queue",e)}}function Zp(e){if(!(e.key!==me||!z.store.persistAcrossRefresh||e.newValue==null)){fe.clear(),Ii(e.newValue);try{sessionStorage.setItem(me,e.newValue)}catch(t){Zn.warn("Could not mirror the queue",t)}$e(X(),Pt,z.store.showQueueMode)}}function et(e){e.length?fe.set(So(),e):fe.delete(So()),Ec(),Vn(),$e(X(),Pt,z.store.showQueueMode)}function Xp(e){if(!e.model&&!e.label)return!0;let t=de();return t?yo(t,Oi(e)):!0}function Tc(e,t=0){t>=zn||B().generating||C()!==e||(Qo(),setTimeout(()=>Tc(e,t+1),wo))}function $p(e,t){let o=e??ke;if(!o||!t.model&&!t.label||yo(o,Oi(t))){tt=!1;return}z.store.stickyOnNavigate&&(ke=o),clearTimeout(xo),xo=setTimeout(()=>Mc(o),wo)}function Eo(e,t=0,o=de()){if(B().generating||C()){t<zn&&setTimeout(()=>Eo(e,t+1,o),wo);return}if(!Xp(e)&&t<zn){tt=!0,Mi(Oi(e)),setTimeout(()=>Eo(e,t+1,o),wo);return}ne(e.text),Qt(()=>Tc(e.text)),$p(o,e)}function wc(){if(_e!=null){let o=_e;_e=null,Eo(o);return}if(!qo||B().generating||C())return;if(!zp()){qo=!1;return}let[e,...t]=X();e!=null&&(qo=!1,et(t),Eo(e))}function Cc(e){let t=X(),o=t[e];if(o!=null){if(et(t.filter((n,r)=>r!==e)),!B().generating){Eo(o);return}_e=o,ct()?.click()}}var Pt={remove:e=>et(X().filter((t,o)=>o!==e)),edit:(e,t)=>et(t.trim()?X().map((o,n)=>n===e?{...o,text:t}:o):X().filter((o,n)=>n!==e)),sendNow:Cc,move(e,t){let o=[...X()],[n]=o.splice(e,1);n&&(o.splice(t,0,n),et(o))}};function _p(e){let t=de(),o={text:e,model:t?.id??"",label:t?.label??""},n=X();return z.store.replacePending&&n.length?(et([...n.slice(0,-1),o]),!0):n.length>=Yp?!1:(et([...n,o]),!0)}function eg(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!Ue(e.target)||!B().generating)return;let t=C(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;let o=de();ne(""),_e={text:t,model:o?.id??"",label:o?.label??""},ct()?.click();return}if(!t){X().length&&Cc(0);return}_p(t)&&ne("")}function tg(){if(tt||!z.store.stickyOnNavigate)return;let e=de();e&&(ke=e)}function Mc(e){tt=!0;let t=0,o=()=>{if(Mi(e)||t>=zn){tt=!1;return}t++,xo=setTimeout(o,wo)};clearTimeout(xo),o()}function og(){z.store.stickyOnNavigate&&ke&&Mc(ke)}function xc(e){let{target:t}=e;!(t instanceof Element)||tt||t.closest(`${u.modelTrigger}, ${u.modelItem}`)&&setTimeout(tg,Kp)}var Lc=f({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:z,styles:Ac,start(){Ot=new AbortController,Vp(),ke=de(),document.addEventListener("keydown",eg,{capture:!0,signal:Ot.signal}),document.addEventListener("pointerup",xc,{signal:Ot.signal}),document.addEventListener("keyup",xc,{signal:Ot.signal}),qc=[q.on("fall",({outcome:e})=>{qo=e==="done",e==="left"&&(_e=null),wc()}),q.on("context",({prevId:e,id:t,migrated:o})=>{let n=fe.get(Jn);fe.delete(Jn),o&&!e&&t&&n&&fe.set(t,n),o||(qo=!1,og()),Vn(),$e(X(),Pt,z.store.showQueueMode)}),q.on("tick",()=>{jp(),wc(),$e(X(),Pt,z.store.showQueueMode)})],addEventListener("storage",Zp,{signal:Ot.signal}),$e(X(),Pt,z.store.showQueueMode)},stop(){Ot?.abort(),clearTimeout(xo);for(let e of qc)e();ki(),fe.clear(),_e=null,ke=null,tt=!1},onSettingsChange(e){e==="persistAcrossRefresh"&&Vn(),e==="stickyOnNavigate"&&z.store.stickyOnNavigate&&(ke=de()),$e(X(),Pt,z.store.showQueueMode)}});var ng=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function rg(){let e=h(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!ng.has(e.toLowerCase())?e:null}function To(e){return e?ie(e)?.title??ds(e)??(e===b()?rg():null):null}var kc=`/*
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
`;var qe=S("bloom-recent-"),we="home",ag=50,Ic=140,sg=new Set(["Backquote"]),lg=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),w=p({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),Ie=null,pe=[],ge=0,Ri,Bc=[],_n=()=>se()?null:b()??(Xo()?we:null);function Oc(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function Rc(e){let t=To(e);t&&w.store.titles[e]!==t&&(w.store.titles={...w.store.titles,[e]:t});let o=ms(location.href);o&&e===b()&&w.store.projects[e]!==o&&(w.store.projects={...w.store.projects,[e]:o})}function Pc(e){if(!e)return;let t=[e,...w.store.visits.filter(n=>n!==e)].slice(0,ag),o=new Set(t);w.store.visits=t,Object.keys(w.store.previews).some(n=>!o.has(n))&&(w.store.previews=Oc(w.store.previews,o)),Object.keys(w.store.titles).some(n=>!o.has(n))&&(w.store.titles=Oc(w.store.titles,o)),e!==we&&Rc(e)}function Xn(e){if(!e||!w.store.visits.includes(e))return;let t={},o=ie(e)?.chain??[];for(let r of o)t[r.role]=ae(_o(r),Ic);if(e===b())for(let r of Ee()){let i=ft(r);i&&(t[r.role]=ae(i,Ic))}let n=w.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(w.store.previews={...w.store.previews,[e]:t})}function cg(){let e=Number(w.store.maxRecent);return w.store.visits.filter(t=>t!==we||w.store.includeHome).slice(0,e)}function Di(e){if(Co(),e===_n())return;let t=e===we?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"], [data-sidebar-destination="builtin:home"]'):Zt(e)[0];t?t.click():location.assign(e===we?"/":`/c/${e}`)}function ug(e,t){let o=e===we?"New chat":w.store.titles[e]??To(e)??"Untitled chat",n=e===we?null:w.store.projects[e],r=e===we?null:w.store.previews[e];return s("button",{class:qe("item"),attrs:{type:"button",role:"option","aria-selected":String(t===ge)},on:{click:()=>Di(e),mousemove:()=>t!==ge&&$n(t)}},s("div",{class:qe("head")},s("span",{class:`${qe("title")} bloom-truncate`,text:o}),n&&s("span",{class:qe("project"),text:n})),r?.user&&s("div",{class:`${qe("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&s("div",{class:`${qe("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function $n(e){ge=(e+pe.length)%pe.length,Ie?.querySelectorAll(`.${qe("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===ge)))}function dg(){Xn(b());let e=_n();pe=cg(),e&&(pe=[e,...pe.filter(t=>t!==e)].slice(0,Number(w.store.maxRecent))),pe.length&&(ge=pe.length>1?1:0,Ie=s("div",{class:`bloom-root ${qe("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:t=>t.target===t.currentTarget&&Co()}},s("div",{class:qe("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...pe.map(ug))),document.body.append(Ie))}function Co(){Ie?.remove(),Ie=null}var mg=e=>sg.has(e.code)||lg.has(e.key);function fg(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&mg(e)){e.preventDefault(),e.stopPropagation(),Ie?$n(ge+(e.shiftKey?-1:1)):dg();return}if(!Ie)return;let o={Escape:Co,Enter:()=>Di(pe[ge]),ArrowDown:()=>$n(ge+1),ArrowUp:()=>$n(ge-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function pg(e){Ie&&e.key==="Control"&&Di(pe[ge])}var Dc=f({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:w,styles:kc,start(){Ri=new AbortController;let{signal:e}=Ri;addEventListener("keydown",fg,{capture:!0,signal:e}),addEventListener("keyup",pg,{capture:!0,signal:e}),addEventListener("blur",Co,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&Xn(b()),{signal:e}),Bc=[le(({prevId:i})=>{Xn(i),Pc(_n())}),Q.on("conversation",({id:i})=>{w.store.visits.includes(i)&&Rc(i),Xn(i)})];let{visits:t,titles:o,previews:n}=w.store,r=t.filter(i=>i!==we&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(w.store.visits=t.filter(i=>!r.includes(i))),Pc(_n())},stop(){Ri?.abort();for(let e of Bc)e();Co()}});var Hi="data:audio/mpeg;base64,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";var Hc=new x("ResponseNotification"),gg=.5,hg=200,bg=300,Mo=p({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append(W("Preview",Fc)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),Nc=null,Ni=new Map,Uc,Ui;function Ag(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=hg&&n<bg?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var yg=e=>Uint8Array.from(atob(e.slice(e.indexOf(",")+1)),t=>t.charCodeAt(0)).buffer;function vg(e,t){let o=Ni.get(t);return o||(o=(t.startsWith("data:")?Promise.resolve(yg(t)):Ag(t)).then(n=>e.decodeAudioData(n)),o.catch(()=>Ni.delete(t)),Ni.set(t,o)),o}async function Gc(e){Nc??=new AudioContext;let t=Nc;t.state==="suspended"&&t.resume();let o=t.createBufferSource(),n=t.createGain();o.buffer=await vg(t,e),n.gain.value=gg,o.connect(n).connect(t.destination),o.start()}function Fc(){let e=Mo.store.soundUrl.trim();Gc(e||Hi).catch(t=>{Hc.warn("Sound failed",t),e&&Gc(Hi).catch(o=>Hc.warn("Default chime failed",o))})}function qg(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function wg(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(Ui=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:Ui.signal}))}var Yc=f({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:Mo,start(){wg(),Uc=q.on("fall",({conversationId:e,outcome:t})=>{t==="done"&&(Mo.store.onlyWhenHidden&&!document.hidden||(Mo.store.sound&&Fc(),Mo.store.browserNotification&&qg(To(e))))})},stop(){Uc?.(),Ui?.abort()}});var xg=`:is(${u.sidebarScroll}, :has(> ${u.sidebarScroll})) + :has(${u.menuButton})`,Sg=`${u.rail} > :has(${u.menuButton})`,Fi=`:is(${xg}, ${Sg}, ${u.oldProfile}):not(:hover)`,Gi="[data-bloom-profile-avatar]",Eg=`:is(${Fi}, ${Fi} :has(${Gi})) > :not(${Gi}, :has(${Gi}))`,Qc=p({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function Tg(){let{opacity:e,fadeAvatar:t}=Qc.store;return e>=100?"":`${t?Fi:Eg}{opacity:${e/100}!important}`}var Kc,Wc=f({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Qc,styles:Tg,start(){Kc=ce()},stop(){Kc?.()}});var jc=`/*
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
`;var U=S("bloom-star-chats"),Mg=80,Lg=60,kg=1200,Ig=120,zc=180,zi=p({messages:{type:"custom",default:[]}}),Yi,Ki=!1,Be=!1,ot=!1,Rt=0,$=null,er="",I=null,Qi;function Ji(){let e=zi.store.messages;return Array.isArray(e)?e.filter(t=>L(t)&&typeof t.conversationId=="string"&&typeof t.messageId=="string"&&(t.role==="user"||t.role==="assistant")&&typeof t.snippet=="string"&&typeof t.starredAt=="number"):[]}function Vi(){let e=b();return e?Ji().filter(t=>t.conversationId===e):[]}function Bg(e,t){return Ji().some(o=>o.conversationId===e&&o.messageId===t)}function Jc(e){let t=Ji(),o=t.some(n=>n.conversationId===e.conversationId&&n.messageId===e.messageId);zi.store.messages=o?t.filter(n=>!(n.conversationId===e.conversationId&&n.messageId===e.messageId)):[{...e,starredAt:Date.now()},...t].slice(0,Mg)}function Wi(e){return e.messageIds[0]||e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.el.getAttribute("data-turn-key")||""}function Og(e){return ae(ft(e)||h(e.el.textContent??""),Lg)}function Pg(e){let t=e.closest(u.turn);if(!t)return null;let o=Ee().filter(n=>t.contains(n.el));return o.find(n=>n.el.contains(e)||n.el===t)??o.findLast(n=>n.el.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING)??null}function Rg(){return[...document.querySelectorAll(u.turnActions)].filter(e=>!e.closest(`[data-bloom], [role="dialog"], [inert], pre, ${u.sidebars}`))}function Dg(){return[...document.querySelectorAll(u.headerMore)].filter(t=>{if(t.dataset.bloom==="message-star"||t.closest("[data-bloom], [role='dialog'], [inert]")||t.closest(u.sidebars))return!1;let o=t.getBoundingClientRect();return o.width===0&&o.height===0?!!t.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((t,o)=>o.getBoundingClientRect().left-t.getBoundingClientRect().left||(t.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function Vc(e,t,o){return s("button",{class:t,attrs:{type:"button","aria-label":e},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},D("star"))}function Hg(e,t){e.setAttribute("aria-pressed",String(t)),e.setAttribute("aria-label",t?"Unstar":"Star")}function ji(){return Be||ot}function nt(){Rt&&window.clearTimeout(Rt),Rt=0}function Dt(){Be=!1,ot=!1,nt(),$?.remove(),$=null,er="",I?.classList.remove(U("-open")),I?.setAttribute("aria-expanded","false")}function Zi(e){return e instanceof Node&&!!(I?.contains(e)||$?.contains(e))}function Ng(e){e.classList.add(U("-flash")),window.setTimeout(()=>e.classList.remove(U("-flash")),kg)}function Ug(e){let t=Ee().find(n=>Wi(n)===e),o=t?.el.closest(u.turn)??t?.el;o&&(o.scrollIntoView({block:"start"}),Ng(o))}function Gg(){let e=b(),t=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!e||se()){for(let n of o)n.remove();return}for(let n of Rg()){if(!be(n))continue;let r=Pg(n),i=r?Wi(r):"";if(!r||!i)continue;let a=n.querySelector('[data-place="action"]');(!a||a.dataset.id!==i)&&(a?.remove(),a=Vc("Star",U("-star"),()=>{let l=b(),c=Ee().find(d=>Wi(d)===i);!l||!c||Jc({conversationId:l,messageId:i,role:c.role,snippet:Og(c)})}),a.dataset.bloom="message-star",a.dataset.place="action",a.dataset.id=i),Hg(a,Bg(e,i)),a.parentElement!==n&&n.append(a),t.add(a)}for(let n of o)t.has(n)||n.remove()}function Fg(){if(!$||!I)return;let e=I.getBoundingClientRect(),t=$.offsetWidth||288,o=$.offsetHeight||120,n=e.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,e.top-o-6));let r=Math.max(8,Math.min(e.right-t,window.innerWidth-t-8));$.style.left=`${Math.round(r)}px`,$.style.top=`${Math.round(n)}px`}function Yg(){if(!ji()||!I){$?.remove(),$=null,er="",I?.classList.remove(U("-open")),I?.setAttribute("aria-expanded","false");return}let e=Vi(),t=e.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!$||er!==t){$?.remove();let o=e.map(n=>s("div",{class:U("-row")},s("button",{class:U("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),Dt(),Ug(n.messageId)}}},s("span",{class:U("-role"),text:n.role==="user"?"You":"ChatGPT"}),s("span",{class:U("-snip"),text:n.snippet||"Message"})),Vc("Unstar",U("-unstar"),()=>Jc(n))));$=s("div",{class:`bloom-root ${U("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{nt(),ot=!0},pointerleave:n=>{Zi(n.relatedTarget)||Be||(nt(),Rt=window.setTimeout(()=>{ot=!1,rt()},zc))}}},s("div",{class:U("-head"),text:"Starred"}),...o.length?o:[s("div",{class:U("-empty"),text:"No starred messages in this chat"})]),document.body.append($),er=t}Fg(),I.classList.add(U("-open")),I.setAttribute("aria-expanded","true")}function Kg(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let e=Dg(),t=e?.parentElement??null,o=b();if(!e||!t||t.closest(u.sidebars)||!o||se()||!be(t)){I?.remove(),I=null,Dt();return}I||(I=s("button",{class:U("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{nt(),Rt=window.setTimeout(()=>{ot=!0,rt()},Ig)},pointerleave:r=>{Zi(r.relatedTarget)||(nt(),Rt=window.setTimeout(()=>{ot=!1,Be||rt()},zc))},click:r=>{r.preventDefault(),r.stopPropagation(),Be=!Be,ot=Be,nt(),Be||Dt(),rt()}}},D("star"))),(I.parentElement!==t||I.nextElementSibling!==e)&&e.before(I);let n=e.getBoundingClientRect();n.width>0&&(I.style.width=`${n.width}px`,I.style.height=`${n.height}px`),I.classList.toggle(U("-here"),Vi().length>0),Yg()}function Qg(){let e=new Set(Vi().map(t=>t.messageId));for(let t of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))t.classList.toggle(U("-mark"),!!t.dataset.messageId&&e.has(t.dataset.messageId))}function rt(){if(!Ki){Ki=!0;try{for(let e of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();Gg(),Kg(),Qg()}finally{Ki=!1}}}function Wg(){Dt(),I?.remove(),I=null;for(let e of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();for(let e of document.querySelectorAll(`.${U("-mark")}`))e.classList.remove(U("-mark"))}var Zc=f({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:zi,styles:jc,onSettingsChange(e){e==="messages"&&rt()},start(){Yi=T(o=>P(o)&&rt());let e=o=>{Zi(o.target)||ji()&&Dt()};document.addEventListener("pointerdown",e,!0);let t=o=>{o.key!=="Escape"||!ji()||(o.preventDefault(),Dt())};document.addEventListener("keydown",t,!0),Qi=()=>{document.removeEventListener("pointerdown",e,!0),document.removeEventListener("keydown",t,!0)},rt()},stop(){Yi?.(),Yi=void 0,Qi?.(),Qi=void 0,nt(),Wg()}});var Xc="filter:blur(6px)!important;transition:filter 0.2s ease",$c=`:is(${u.sidebars})`,jg={conversations:{selectors:[`${$c} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0,row:"[data-app-action-sidebar-thread-row]"},projects:{selectors:[`${$c} a:is([href*="/project"], [href*="/g/g-p-"])`,"[data-app-action-sidebar-project-row]",".bloom-recent-project"],hover:!0,row:"[data-app-action-sidebar-project-row]"},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}},eu=p({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function zg(){return Object.entries(jg).filter(([e])=>eu.store[e]).map(([,e])=>{let t=e.selectors.join(",");if(!e.hover)return`:is(${t}){${Xc}}`;let o="row"in e?`, ${e.row}:hover :is(${t})`:"";return`:is(${t}){${Xc}}:is(${t}):hover, .bloom-recent-item:hover :is(${t})${o}{filter:none!important}`}).join(`
`)}var _c,tu=f({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:eu,styles:zg,start(){_c=ce()},stop(){_c?.()}});var nu=p({openNewAsTemporary:{type:"boolean",description:"Open New chat as a temporary chat.",default:!1}}),Jg=/^(?:new chat|新聊天)$/i,tr;function Vg(e){return e?"/?temporary-chat=true":"/"}function Zg(e){let t=Vg(e);`${location.pathname}${location.search}`===t||e&&se()&&location.pathname==="/"||location.assign(t)}function Xg(e){if(e.closest("[data-bloom]"))return!1;try{let t=new URL(e.href,location.origin);return t.origin===location.origin&&t.pathname==="/"}catch{return!1}}function $g(e){return e.closest("[data-bloom], [data-app-action-sidebar-project-row]")?!1:Jg.test(e.getAttribute("aria-label")??h(e.textContent??""))}function _g(e){if(!nu.store.openNewAsTemporary||se())return;let{target:t}=e;if(!(t instanceof Element))return;let o=t.closest("a[href], button"),n=o instanceof HTMLAnchorElement?Xg(o):!!o&&$g(o);!o||!n||o.closest(`${u.sidebarScroll}, ${u.rail}, ${u.oldSidebar}, nav`)&&(e.preventDefault(),e.stopPropagation(),Zg(!0))}function ou(){for(let e of document.querySelectorAll('[data-bloom="temporary-chat"]'))e.remove()}var ru=f({name:"TemporaryChat",description:"Optionally open New chat as a temporary chat. No extra sidebar button.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"ghost",enabledByDefault:!0,settings:nu,start(){ou(),tr=new AbortController,document.addEventListener("pointerdown",_g,{capture:!0,signal:tr.signal})},stop(){tr?.abort(),tr=void 0,ou()}});var Oe=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)','[data-turn-key] [data-message-author-role="user"] blockquote:not(.twitter-tweet)'].join(","),Xi=p({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function eh(){let e=[`${Oe}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${Oe}>*{margin-block:0!important}`];return Xi.store.italic||e.push(`${Oe}{font-style:inherit!important}`),Xi.store.quotes||(e.push(`${Oe}{quotes:none!important}`),e.push(`${Oe}::before,${Oe}::after,${Oe} p::before,${Oe} p::after{content:none!important}`)),e.join(`
`)}var iu=f({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:Xi,styles:eh});var th=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],oh=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",nh='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',au=p({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function rh(){let e=`${au.store.width}rem`;return`:is(${oh}){${th.map(t=>`${t}:${e}!important`).join(";")}}:is(${nh}){max-width:min(100%, ${e})!important}`}var su=f({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:au,styles:rh});var ih=[Es,Gs,Vs,$s,cl,ml,pl,wl,Bl,Gl,Ql,sc,cc,uc,gc,Lc,Dc,Yc,Wc,Zc,tu,ru,iu,su],$i=ih;var ah=new x("Bloom"),lu="2.0.80";async function _i(){Ra();for(let e of $i)e.updatedAt=_a[e.name];ga($i),ua(),indexedDB.deleteDatabase("bloompp"),Bo("base",qa),$a(),Go("Init"),zo().then(()=>{aa(),Go("DOMContentLoaded")}),await Ha(),Go("HostReady"),ah.info(`Bloom++ ${lu} ready`)}var cu=new x("Boot");if(window===window.top){let e=te.Bloom;e&&cu.warn("Replacing another Bloom++ instance",e.VERSION),Object.defineProperty(te,"Bloom",{value:ea,configurable:!0,writable:!0}),_i().catch(t=>cu.error("Startup failed",t))}})();
