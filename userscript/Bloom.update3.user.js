// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.83
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

/* Bloom++ v2.0.83. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var bu=Object.defineProperty;var Au=(e,t)=>{for(var o in t)bu(e,o,{get:t[o],enumerable:!0})};var S=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var Se=(e,t,o)=>Math.min(o,Math.max(t,e)),L=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),la=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,ae=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,h=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function Oo(e,t){return`${e} ${t}${e===1?"":"s"}`}async function ca(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function xe(e){try{return JSON.parse(e)}catch{return}}var te=typeof unsafeWindow>"u"?window:unsafeWindow;var sa={};Au(sa,{VERSION:()=>pu,init:()=>aa,plugins:()=>Ne});var yu=new S("Styles"),Ut=new Map,ua=new Set,Gt=new Map,ir=!0;function da(){let e=document.adoptedStyleSheets.filter(t=>!ua.has(t));document.adoptedStyleSheets=[...e,...Ut.values()]}function ma(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function vu(e,t){let o=Gt.get(e);o||(o=document.createElement("style"),o.id=`bloom-style-${e}`,Gt.set(e,o)),o.textContent!==t&&(o.textContent=t),ma(o)}function Po(e,t){if(ir)try{let o=Ut.get(e);o||(o=new te.CSSStyleSheet,Ut.set(e,o),ua.add(o)),o.replaceSync(t),da();return}catch(o){yu.warn("Constructed style sheets unavailable, using <style> after parsing",o),ir=!1,Ut.delete(e)}vu(e,t)}function ar(e){Ut.delete(e)&&ir&&da(),Gt.get(e)?.remove(),Gt.delete(e)}function fa(){for(let e of Gt.values())ma(e)}var x=e=>(...t)=>t.map(o=>e+o).join(" "),Ro=(...e)=>e.filter(Boolean).join(" "),st=e=>e.length?`${e.map(t=>`${t}:not([data-bloom])`).join(",")}{display:none!important}`:"";function f(e){return e}var pa=new S("Storage");function Do(e){try{return localStorage.getItem(e)??void 0}catch{return}}function Ho(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(o){pa.warn("localStorage write failed",o)}}function sr(e){try{localStorage.removeItem(e)}catch(t){pa.warn("localStorage delete failed",t)}}function ga(e,t){addEventListener("storage",o=>{o.key===e&&t(o.newValue)})}var lr="BloomSettings",qu=100,lt={plugins:{}},No=new Set,cr=new Set,Ft;function ha(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=xe(t);return!L(t)||!L(t.plugins)||!Object.keys(t.plugins).length?null:t}function ba(){let e=ha(Do(lr));e&&(lt.plugins=e.plugins)}var Aa=(e,t)=>`${e}
${t}`;function ya(){Ft=void 0,cr.clear(),Ho(lr,lt)}function wu(e){let t=ha(e);if(!t)return;let o=[];for(let n of new Set([...Object.keys(lt.plugins),...Object.keys(t.plugins)])){let r=lt.plugins[n]??={},i=L(t.plugins[n])?t.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))cr.has(Aa(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of No)i(n,r)}function Su(){Ft&&(clearTimeout(Ft),ya())}var De=(e,t)=>lt.plugins[e]?.[t];function He(e,t,o){let n=lt.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,cr.add(Aa(e,t)),clearTimeout(Ft),Ft=setTimeout(ya,qu);for(let r of No)r(e,t)}function ct(e){return No.add(e),()=>void No.delete(e)}function ur(e){return e.type==="component"?void 0:e.default}function p(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>De(t.pluginName,n)??(e[n]&&ur(e[n])),set:(o,n,r)=>(He(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&De(t.pluginName,o)!==void 0&&He(t.pluginName,o)}};return t}var va=e=>{let t=()=>{let o=De("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();He("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},Uo=va("pinnedPlugins"),Go=va("starredPlugins");addEventListener("pagehide",Su);ga(lr,wu);var Fo=new S("PluginManager"),Ne=new Map,Yt=new Set,qa=new Set,dr=new Set;function wa(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),Ne.set(t.name,t)}var Kt=e=>!!e.required||(De(e.name,"enabled")??!!e.enabledByDefault);var mr=e=>`plugin-${e.name}`;function Sa(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?Po(mr(e),t):ar(mr(e))}function xa(e){if(!Yt.has(e.name))try{Sa(e),e.start?.(),Yt.add(e.name)}catch(t){Fo.error(`Failed to start ${e.name}`,t)}}function xu(e){if(Yt.delete(e.name)){ar(mr(e));try{e.stop?.()}catch(t){Fo.error(`Failed to stop ${e.name}`,t)}}}var Ea=e=>e.startAt??"HostReady";function Yo(e){qa.add(e);for(let t of Ne.values())Ea(t)===e&&Kt(t)&&xa(t);Fo.info(`${e}: ${[...Yt].join(", ")}`)}function Ta(e,t){He(e.name,"enabled",t),t?qa.has(Ea(e))&&xa(e):xu(e);for(let o of dr)o()}function Ca(e){return dr.add(e),()=>void dr.delete(e)}ct((e,t)=>{let o=Ne.get(e);if(!(!o||t==="enabled"||!Yt.has(e)))try{Sa(o),o.onSettingsChange?.(t)}catch(n){Fo.error(`Settings change failed for ${e}`,n)}});var Ma=`/*
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
`;var Tu=new S("Dom");function s(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var La=document.createElement("template");function ka(e){return La.innerHTML=e.trim(),La.content.firstElementChild.cloneNode(!0)}var Wt=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),F=(e,t=document)=>[...t.querySelectorAll(e)].find(Wt)??null,Cu=16,Mu="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function Ia(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([Mu],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function jt(e){document.hidden?setTimeout(e,Cu):requestAnimationFrame(e)}function Ee(e){let t=!1;return()=>{t||(t=!0,jt(()=>{t=!1;try{e()}catch(o){Tu.error("Scheduled task failed",o)}}))}}var Ko=new Set,Qo=[],Qt,Lu=Ee(()=>{let e=Qo;Qo=[];for(let t of Ko)t(e)});function T(e){return Ko.add(e),Qt||(Qt=new MutationObserver(t=>{Qo.push(...t),Lu()}),Qt.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{Ko.delete(e),!Ko.size&&(Qt?.disconnect(),Qt=void 0,Qo=[])}}var ku=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),P=e=>!e.length||e.some(t=>!ku(t.target)),Iu=e=>`"${e.replaceAll("\\","\\\\").replaceAll('"','\\"').replaceAll(`
`,"\\A ")}"`;function Ue(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size"),e.style.removeProperty("--bloom-text");return}e.style.setProperty("--bloom-text",Iu(t)),e.getAttribute("data-bloom-text")!==t&&e.setAttribute("data-bloom-text",t)}var Bu=new S("Events");function Wo(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){Bu.error(`Listener for ${String(t)} failed`,r)}}}}var u={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',composerConversation:"[data-above-composer-conversation-id]",oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",modelTrigger:'[data-testid="model-switcher-dropdown-button"], button[aria-label="Model selector" i], button[aria-label="Select ChatGPT model" i]',modelItem:'[role="menu"] [data-testid^="model-switcher-"], [role="menuitem"][data-testid^="model-switcher-"], [role="menu"] [role="menuitemradio"], [role="menu"] [data-reasoning-slider]',effortSlider:'[role="menu"] [data-reasoning-slider]',homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]'};var Ba=/[​-‍﻿]/g,he=()=>F(u.composerInput),Ge=e=>e instanceof HTMLElement&&e.matches(u.composerInput),K=(e=he())=>e?.closest("form")??document.querySelector(u.oldComposerForm);function C(e=he()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(Ba,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(Ba,"").trim()}var Ou=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function ne(e,t=he()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return Ou?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function Oa(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:a,value:l}=e;return{first:!l.slice(0,i).includes(`
`),last:!l.slice(a).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var Pa=e=>{let t=K();return(t&&F(e,t))??F(e)},ut=()=>Pa(u.stopButton),Pu=()=>{let e=Pa(u.sendButton);return e&&!e.matches(u.stopButton)?e:null};function jo(){let e=Pu();if(e){e.disabled||e.click();return}he()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var Ra=()=>Wt(ut());var Na=new S("Network"),Ru=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,Du=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,Vo=1e3,Hu=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),Q=Wo(),pr=new Map,Da=new Map,Nu=1,ie=e=>e?pr.get(e)??null:null;function zo(e){let t=pr.get(e);return t||pr.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var Ua=e=>e==="user"||e==="assistant";function Ga(e){let t=e.author?.role;if(!e.id||!Ua(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(c=>typeof c=="string").join(`
`).trim(),i=n.filter(c=>L(c)&&c.content_type==="image_asset_pointer").length,a=e.metadata?.attachments,l=Array.isArray(a)&&a.length>0;return!r&&!i&&!l?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*Vo:null,text:r,hasFiles:l,imageCount:i}}var Fa=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant"),gr=e=>e.map(t=>t.createTime).filter(t=>t!=null);function Uu(e,t){let o=gr(e),n=gr(t);return!o.length||!n.length?!1:Math.max(...o)<Math.min(...n)}function Gu(e){let t=gr(e);if(t.length<2)return e;let[o]=t,n=o-e.length;return e.map((i,a)=>(i.createTime!=null&&(n=i.createTime),{message:i,index:a,time:i.createTime??n})).toSorted((i,a)=>i.time-a.time||i.index-a.index).map(i=>i.message)}function Fu(e,t){let o=t.filter(L).map(l=>L(l.message)?l.message:l);for(let l of o)l.id&&l.create_time&&e.times.set(l.id,l.create_time*Vo);let n=o.map(Ga).filter(l=>l!=null),r=new Set(n.map(l=>l.id)),i=e.chain.filter(l=>!r.has(l.id)),a=Uu(n,i)?[...n,...i]:[...i,...n];return e.chain=Fa(Gu(a)),e}function Yu(e,t){if(!L(t)||!(L(t.mapping)||Array.isArray(t.messages)))return null;let o=zo(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return Fu(o,t.messages);let n=t.mapping;for(let l of Object.values(n)){let c=l.message?.create_time;l.message?.id&&c&&o.times.set(l.message.id,c*Vo)}let r=[],i=new Set,a=typeof t.current_node=="string"?t.current_node:null;for(;a&&!i.has(a)&&n[a];){i.add(a);let l=n[a].message,c=l?Ga(l):null;c&&r.push(c),a=n[a].parent??null}return r.length&&(o.chain=Fa(r.toReversed())),o}function Ku(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}var fr=e=>typeof e=="string"?e:null;function Qu(e){let t=typeof e?.body=="string"?xe(e.body):null;if(!L(t))return{conversationId:null,parentId:null,userId:null};let[o]=Array.isArray(t.messages)?t.messages:[];return{conversationId:fr(t.conversation_id),parentId:fr(t.parent_message_id),userId:L(o)?fr(o.id):null}}function Wu(e,t){if(!L(e))return;typeof e.type=="string"&&Hu.has(e.type)&&(t.handoff=!0);let o=L(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(zo(e.conversation_id).title=e.title,Q.emit("conversation",zo(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&Ua(n.author?.role)){let r=n.create_time*Vo;t.conversationId&&zo(t.conversationId).times.set(n.id,r),Q.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function ju(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:a}=await o.read();if(i)break;r+=n.decode(a,{stream:!0});let l=r.split(`
`);r=l.pop()??"";for(let c of l){if(!c.startsWith("data:"))continue;let d=c.slice(5).trim();d&&d!=="[DONE]"&&Wu(xe(d),t)}}}async function zu(e,t,o){let{conversationId:n}=t,r={conversationId:n,error:!1,handoff:!1};Da.set(e,n),Q.emit("generate-start",{requestId:e,...t});try{let i=await o;i.ok?i.headers.get("content-type")?.includes("event-stream")&&await ju(i.clone(),r):r.error=!0}catch(i){let a=i instanceof DOMException&&i.name==="AbortError";r.handoff||=a,r.error||=!a}finally{Da.delete(e),Q.emit("generate-end",{requestId:e,...r})}}async function Vu(e,t){try{let o=await t;if(!o.ok)return;let n=Yu(e,await o.clone().json());n&&Q.emit("conversation",n)}catch(o){Na.debug("Conversation read skipped",o)}}function Ju(e,t,o){let n=Ku(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&Ru.test(n.pathname)){zu(Nu++,Qu(t),o);return}let i=r==="GET"&&n.pathname.match(Du)?.[1];i&&Vu(i,o)}var Ha=!1;function Ya(){if(Ha)return;Ha=!0;let e=te.fetch,t=function(o,n){let r=e.call(this??te,o,n);try{Ju(o,n,r)}catch(i){Na.error("Fetch tap failed",i)}return r};te.fetch=typeof exportFunction=="function"?exportFunction(t,te):t}var Zu="__reactContainer$",Ka="__reactFiber$";function Jo(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var hr=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),be=e=>!hr(document,Zu)||hr(e,Ka);function Fe(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function Qa(){await Fe();let e=Date.now()+8e3;for(;!hr(document.body,Ka)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var Xu=new S("Route"),Wa=/\/c\/(?!local-)([\w-]+)/,$u=500,yr=e=>{try{return new URL(e,location.origin).pathname.match(Wa)?.[1]??null}catch{return null}},b=()=>location.pathname.match(Wa)?.[1]??null,_o=()=>location.pathname==="/",_u=/^\/g\/g-p-[^/]+(?:\/project)?\/?$/,ja=()=>_u.test(location.pathname),se=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",Xo=new Set,$o=location.href,Ar=b(),Zo;function br(){if(location.href===$o)return;let e={prevHref:$o,href:location.href,prevId:Ar,id:b()};$o=e.href,Ar=e.id;for(let t of Xo)try{t(e)}catch(o){Xu.error("Route listener failed",o)}}function ed(){let e=new AbortController,{navigation:t}=te;t?.addEventListener("currententrychange",()=>queueMicrotask(br),{signal:e.signal}),addEventListener("popstate",br,{signal:e.signal});let o=setInterval(br,$u);return()=>{e.abort(),clearInterval(o)}}function le(e){return Xo.add(e),Zo||($o=location.href,Ar=b(),Zo=ed()),()=>{Xo.delete(e),!Xo.size&&(Zo?.(),Zo=void 0)}}var td=["data-turn","data-message-author-role"],od=/:(user|assistant)$/,vr=`${u.messageUnit}, ${u.oldMessage}`,qr=e=>e==="user"||e==="assistant",Za=()=>!!document.querySelector(u.timelineScroll),Xa=()=>!!F(u.timelineScroll),$a=()=>b()??document.querySelector(u.composerConversation)?.getAttribute("data-above-composer-conversation-id")??"",dt=()=>Za()?F(u.timelineScroll):document;function Vt(){if(Za())return F(u.timelineScroll);let e=document.querySelector(u.turn);for(let t=e?.parentElement;t;t=t.parentElement){let{overflowY:o}=getComputedStyle(t);if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight)return t}return document.scrollingElement}var mt=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(od)?.[1]??null,_a=e=>[...e.querySelectorAll(u.searchUnit)].filter(t=>mt(t)&&!t.parentElement?.closest(u.searchUnit)),za=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function zt(e){let t=za(e);return t.length?t:[...new Set([...e.querySelectorAll(vr)].flatMap(za))]}function ft(e=dt()){if(!e)return[];let t=_a(e);return t.length?t:[...e.querySelectorAll(vr)].filter(o=>!o.parentElement?.closest(vr))}function nd(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function rd(e){for(let t of td){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(qr(o))return o}return e.querySelector(u.markdown)||e.querySelector(u.generatedImage)?"assistant":null}var id=e=>!e.parentElement?.closest(u.turn);function Te(){let e=ie(b())?.chain??[];return[...dt()?.querySelectorAll(u.turn)??[]].filter(id).flatMap(o=>{let n=_a(o),r=n.length?n.map(i=>({el:i,known:mt(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=d=>!n.some(m=>m.contains(d))&&h(d.textContent??""),a=[...o.querySelectorAll(u.assistantMarkdown)].find(d=>i(d)&&!en.test(h(d.textContent??""))),l=[...o.querySelectorAll(u.activityHeader)].findLast(i),c=a??l;c&&r.push({el:c,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?zt(o):ft(o).flatMap(zt),a=n??rd(o)??nd(i,e)??(r%2?"assistant":"user"),l=o.closest(u.turn)??o,c=!o.closest(u.searchUnit)&&!!l.querySelector(u.turnBusy),d=a==="assistant"&&(o.matches(u.turnBusy)||!!o.querySelector(u.turnBusy)||c);return{el:o,role:a,messageIds:i,streaming:d}})}var ad="[data-bloom], .sr-only",es=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,en=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,Va=new WeakMap;function pt(e){let o=(e.el.closest(u.turn)??e.el).textContent?.length??0,n=Va.get(e.el);if(n?.length===o)return n.summary;let r=sd(e);return Va.set(e.el,{length:o,summary:r}),r}function Ja(e){let t=new Set,o=[];for(let n of e.querySelectorAll(u.assistantMarkdown)){if(n.closest(u.searchUnit))continue;let r=h(n.textContent??"");!r||en.test(r)||es.test(r)||t.has(r)||(t.add(r),o.push(r))}return o}function sd(e){let t=e.el.querySelectorAll(u.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.closest(u.turn);if(e.role==="assistant"&&o&&e.el.matches(u.assistantMarkdown)&&!e.el.closest(u.searchUnit)){let c=Ja(o);if(c.length)return c.join(" \xB7 ")}let n=e.el.querySelector(e.role==="assistant"?u.markdown:".whitespace-pre-wrap")??e.el,i=[...n.querySelectorAll(ad)].map(c=>h(c.textContent??"")).filter(Boolean).reduce((c,d)=>c.replace(d,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(h).filter(c=>c&&!es.test(c)&&!en.test(c));if(a.length)return a.join(" ");if(e.role==="assistant"&&o){let c=Ja(o);if(c.length)return c.join(" \xB7 ")}let l=i.split(`
`).map(h).filter(c=>en.test(c));return l.length?l.at(-1)??"":e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function tn(e){return e.text?h(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var wr=e=>e.matches(u.timelineScroll)&&getComputedStyle(e).flexDirection==="column-reverse";var ld=250,cd=400,ud=6e4,dd=5e3,md=`:is(${u.turn}) :is(${u.turnBusy})`,q=Wo(),rn=new Set,Sr=new Set,Ce=!1,os=0,gt=null,ht=!1,on=!1,Jt=0,an=!1,Zt=null,ts=!1,B=()=>({generating:Ce,conversationId:b()}),ns=()=>Ra()||!!dt()?.querySelector(md);function fd(){let e=ns();return e?on||(Jt=0,an=!0):on=!1,[...rn].some(t=>!Sr.has(t))||e&&!on||Date.now()<Jt}function pd(){return Zt?.error?"error":ht?"stopped":"done"}function gd(){gt=null,Ce=!1,an=!1,q.emit("fall",{conversationId:b(),outcome:pd()}),ht=!1,Zt=null}function rs(){let e=fd();e&&!Ce&&(Ce=!0,os=Date.now(),ht=!1,Zt=null,q.emit("rise",{conversationId:b()})),e||!Ce?gt=null:gt==null?gt=Date.now():Date.now()-gt>=cd&&gd()}function nn(){rs(),q.emit("tick",B())}function hd({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(Ce||Date.now()-os<ud);if(!o&&Ce){for(let n of rn)Sr.add(n);on=ns(),Jt=0,an=!1,gt=null,Ce=!1,ht=!1,Zt=null,q.emit("fall",{conversationId:e,outcome:"left"})}q.emit("context",{prevId:e,id:t,migrated:o}),nn()}function bd(e){e.target instanceof Element&&e.target.closest(u.stopButton)&&(ht=!0,Jt=0)}function is(){ts||(ts=!0,Q.on("generate-start",({requestId:e})=>{rn.add(e),nn()}),Q.on("generate-end",e=>{rn.delete(e.requestId),!Sr.delete(e.requestId)&&(Zt=e,Jt=e.handoff&&!e.error&&!ht&&!an?Date.now()+dd:0,nn())}),le(hd),document.addEventListener("click",bd,!0),Ia(nn,ld),Jo().then(()=>T(rs)))}var as={BetterNavigator:1792014624e3,BetterQuotes:179333264e4,ChatListStatus:179333264e4,ChatStateFavicons:1790623094e3,Cleaner:1793267811e3,ComposerOpacity:1793344667e3,Continue:1790939902e3,CustomSidebarIdentity:1790658669e3,GreetingCustomizer:1792014624e3,InputHistory:179333264e4,MessageTimestamps:1791080494e3,NoDictation:1793335268e3,NoShareLink:1790658669e3,NoSidebarIdentity:1790616549e3,PromptQueue:1793267321e3,RecentTopics:179333264e4,ResponseNotification:1790661368e3,Settings:1793335268e3,SidebarIdentityOpacity:1790682605e3,StarChats:179333264e4,StreamerMode:1793344667e3,TemporaryChat:1792014624e3,UserQuotes:179333264e4,WiderChat:179333264e4};var y=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,Ad="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",yd={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${Ad}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:y('<path d="M18 6 6 18M6 6l12 12"/>'),gear:y('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:y('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:y('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:y('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:y('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:y('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:y('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:y('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:y('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:y('<path d="m6 9 6 6 6-6"/>'),play:y('<path d="M7 4v16l13-8z"/>'),plus:y('<path d="M12 5v14M5 12h14"/>'),check:y('<path d="m5 12 5 5 9-10"/>'),alert:y('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:y('<path d="M4 5h16v11H9l-5 4z"/>'),layout:y('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:y('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:y('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:y('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:y('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:y('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:y('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:y('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:y('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:y('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:y('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:y('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:y('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:y('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:y('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:y('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),ghost:y('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},D=e=>ka(yd[e]);var Ae="data-bloom-tip",xr=6,Er=8,Ye,ss=null;function bt(e){if(e===ss)return;if(ss=e,!e){Ye?.remove();return}Ye??=s("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),Ye.textContent=e.getAttribute(Ae),document.body.append(Ye);let t=e.getBoundingClientRect(),{width:o,height:n}=Ye.getBoundingClientRect(),r=t.bottom+xr+n<=innerHeight-Er;Ye.style.left=`${Se(t.left+t.width/2-o/2,Er,innerWidth-o-Er)}px`,Ye.style.top=`${r?t.bottom+xr:t.top-xr-n}px`}var ls=e=>e instanceof Element?e.closest(`[${Ae}]`):null;function cs(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>bt(ls(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||bt(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&bt(ls(o.target)),t),document.addEventListener("focusout",()=>bt(null),t),document.addEventListener("pointerdown",()=>bt(null),t),()=>{e.abort(),bt(null)}}function Tr(e,t,o,n=!1){let r=s("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let a=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(a)),t(a)}),r}function W(e,t,o){return s("button",{class:Ro("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button","data-bloom":"control"},on:{click:t}})}function V(e,t,o,n){let r=s("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,"data-bloom":"control",[Ae]:t},on:{click:o}},D(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function sn(e,t,o,n,r,i){let a=s("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});a.value=String(e);let l=s("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{l.textContent=`${a.value}${r}`,i(Number(a.value))}),s("div",{class:"bloom-slider"},a,l)}function Cr(e,t,o){let n=s("select",{class:"bloom-select"},...t.map(r=>s("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function Xt(e,t,o="",n="text"){let r=s("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var vd=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,us=/\S+@\S+\.\S+/,qd=3,wd=/^\/g\/(g-p-[^/]+)\//,Sd=/^g-p-[0-9a-f]+-?/i,ds=e=>!!e.closest(".sr-only"),Mr=e=>!!e?.querySelector(u.menuButton);function ms(){return[...document.querySelectorAll(u.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(Mr)).filter(e=>e!=null)}function fs(){let e=[...document.querySelectorAll(u.oldProfile)];if(e.length)return e.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let t=ms().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(u.rail)){let n=[...o.children].find(Mr);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var Lr=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||bs(e).some(t=>!ds(t))),ps=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&Lr(t))??null;function gs(){let e=[...document.querySelectorAll(u.oldProfile)];return e.length?e:[...ms(),...[...document.querySelectorAll(u.rail)].map(o=>[...o.children].findLast(Mr))].map(o=>[...o?.querySelectorAll(u.menuButton)??[]].findLast(n=>Lr(n)||ps(n))).filter(o=>o!=null)}var hs=()=>gs().map(e=>Lr(e)?e:ps(e)).filter(e=>e!=null);function bs(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!h(t.textContent??"")&&!(t instanceof SVGElement))}var xd=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function ln(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function Ed(e,t){if(h(e.textContent??"").length>qd)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(xd(n))return n;return null}function kr(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=bs(e),r=o?null:n.map(m=>Ed(m,e)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");ln(e,`data-bloom-${t}-avatar`,a);let l=n.filter(m=>!a?.contains(m)&&!ds(m)),c=l.find(m=>vd.test(h(m.textContent??""))),d=l.find(m=>us.test(m.textContent??""));ln(e,`data-bloom-${t}-plan`,c),ln(e,`data-bloom-${t}-email`,d),ln(e,`data-bloom-${t}-name`,l.find(m=>m!==c&&m!==d))}function Td(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function cn(){return gs().map(Td).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(us.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var $t=e=>[...document.querySelectorAll(u.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&yr(t.href)===e);function As(e){let t=$t(e).find(o=>h(o.textContent??""));return t?h(t.textContent??""):null}function ys(e){let t=new URL(e,location.origin).pathname.match(wd)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!yr(n.href)&&h(n.textContent??""));return o?h(o.textContent??""):t.replace(Sd,"").replaceAll("-"," ")||null}var Ir=0,un;function Cd(e){if(!P(e))return;for(let o of hs())kr(o,"profile");let t=cn();t&&kr(t,"menu")}function ce(){Ir++;let e=!0;return Fe().then(()=>{e&&Ir&&!un&&(un=T(Cd))}),()=>{e&&(e=!1,!--Ir&&(un?.(),un=void 0))}}var Md=new S("SettingsPanel"),g=x("bloom-settings-"),Ld=10080*60*1e3,kd=3e3,vs="Toggle features. Some need a reload. Click the sliders icon to configure.",Id=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Bd=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],Od={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},ws=new Set(["chat","ui","privacy"]),j=null,Qe="all",Br="all",dn="",Or=[],Ss=()=>[...Ne.values()].filter(e=>!e.hidden),Pd=e=>!!e.updatedAt&&Date.now()-e.updatedAt<Ld;function Rd(e){switch(Qe){case"favorites":return Go.has(e.name);case"recent":return Pd(e);case"all":return!0;case"other":return!e.tags.some(t=>ws.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(Qe)}}function Dd(e){switch(Br){case"all":return!0;case"enabled":return Kt(e);case"disabled":return!Kt(e)}}function Hd(e){let t=dn.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function Nd(e){let t=Uo.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return Qe==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var xs=e=>e.settings?.def??{},Ud=e=>Object.values(xs(e)).some(t=>t.type!=="custom");function Gd(e,t,o){let n=De(e.name,t)??ur(o),r=i=>He(e.name,t,i);switch(o.type){case"boolean":return Tr(n,r,o.description??t);case"slider":return sn(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return Cr(n,o.options,r);case"string":return Xt(n,r,o.placeholder);case"number":return Xt(String(n),i=>r(Number(i)),"","number");case"component":{let i=s("div",{class:g("component")});return Or.push(o.render(i)),i}case"custom":return null}}var Fd=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function Es(e){if(!j)return;let t=Object.entries(xs(e)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let l=Gd(e,i,a),c=a.type==="boolean",d=a.type!=="component"&&s("div",{class:g("field-label"),text:Fd(i)}),m=a.description&&s("div",{class:g("field-desc"),text:a.description});return s("div",{class:g("field",c?"field-inline":"field-stacked")},(d||m)&&s("div",{class:g("field-text")},d,m),l)}),o,n=W("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},kd);return}clearTimeout(o),e.settings?.reset(),_t(),Es(e)},"danger"),r=s("div",{class:g("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&_t()}},s("div",{class:g("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},s("div",{class:g("popup-header")},s("div",{class:g("card-icon")},D(e.icon)),s("div",{class:g("popup-title")},s("div",{class:g("card-name"),text:e.name}),s("div",{class:g("popup-authors"),text:e.authors.join(", ")})),V("close","Close",_t)),s("p",{class:g("popup-desc"),text:e.description}),s("div",{class:g("fields")},...t),s("div",{class:g("popup-footer")},n)));j.querySelector(`.${g("modal")}`)?.append(r)}function _t(){for(let e of Or)e();Or=[],j?.querySelector(`.${g("popup-backdrop")}`)?.remove()}function qs(e){let t=Kt(e),o=Go.has(e.name),n=Uo.has(e.name),r=!!e.required;return s("div",{class:[g("card",t?"card-on":"card-off"),r?g("card-required"):""].filter(Boolean).join(" ")},s("div",{class:g("card-top")},s("div",{class:g("card-icon")},D(e.icon)),s("div",{class:g("card-actions")},V("star",o?"Unstar":"Star",()=>{Go.toggle(e.name),Ke()},o),r?null:V("pin",n?"Unpin":"Pin to top",()=>{Uo.toggle(e.name),Ke()},n),r?s("span",{class:g("required-mark"),attrs:{"aria-label":"Required",[Ae]:"This plugin is required for Bloom++ to work"}},D("alert")):null,Ud(e)&&V("gear","Settings",()=>Es(e)),Tr(t,i=>Ta(e,i),r?`${e.name} is required`:`Enable ${e.name}`,r))),s("div",{class:g("card-name"),text:e.name}),s("div",{class:g("card-desc"),text:e.description,title:e.description}),s("div",{class:g("card-footer"),text:e.authors.join(", ")}))}function Ts(){let e=Ss().some(o=>!o.tags.some(n=>ws.has(n)));j?.querySelector(`.${g("tabs")}`)?.replaceChildren(...Id.filter(o=>o.id!=="other"||e).map(o=>s("button",{class:g("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===Qe)},on:{click:()=>{Qe=o.id,Ts(),Ke()}}})))}function Ke(){if(!j)return;let e=Ss().filter(Rd),t=j.querySelector(`.${g("search")} input`);t&&(t.placeholder=`Search ${Oo(e.length,"plugin")}...`);let o=Nd(e.filter(d=>Hd(d)&&Dd(d))),n=Qe==="all",r=n?o.filter(d=>!d.required):o,i=n?o.filter(d=>d.required):[],a=[...r.map(qs),...i.length?[s("div",{class:g("required-break"),attrs:{role:"separator"}}),...i.map(qs)]:[]],l=dn.trim()?"No plugins match your search.":Od[Qe]??"No plugins available.";j.querySelector(`.${g("grid")}`)?.replaceChildren(...a.length?a:[s("div",{class:g("empty"),text:l})])}function Yd(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),j?.querySelector(`.${g("popup-backdrop")}`)?_t():At())}var Cs,Pr;function Kd(){if(j)return;let e=s("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=dn,e.addEventListener("input",()=>{dn=e.value,Ke()}),j=s("div",{class:`bloom-root ${g("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&At()}},s("div",{class:g("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},s("div",{class:g("header")},s("div",{class:g("logo")},D("bloom")),s("h2",{class:g("title"),text:"Bloom++"}),s("span",{class:g("hint"),attrs:{"aria-label":vs,tabindex:"0",[Ae]:vs}},D("info")),s("span",{class:g("version"),text:"v2.0.83"}),V("close","Close",At)),s("div",{class:g("tabs"),attrs:{role:"tablist"}}),s("div",{class:g("toolbar")},s("label",{class:g("search")},D("search"),e),Cr(Br,Bd,t=>{Br=t,Ke()})),s("div",{class:g("grid")}))),j.addEventListener("keydown",t=>t.stopPropagation()),Pr=new AbortController,document.addEventListener("keydown",Yd,{capture:!0,signal:Pr.signal}),document.body.append(j),Ts(),Ke(),Cs=Ca(Ke),e.focus(),Md.debug("Opened")}function At(){_t(),Pr?.abort(),Cs?.(),j?.remove(),j=null}var mn=()=>j?At():Kd();var Ms=`/*
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
`;var Me=x("bloom-entry-"),Wd=4,Rr="--bloom-entry-x",Dr=1,yt=p({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar. The account menu and the userscript menu always open the panel.",default:!1},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:!0},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:e=>(e.append(W("Reset position",()=>{yt.store.entryPosition=Dr})),()=>e.replaceChildren())},entryPosition:{type:"custom",default:Dr}}),We=new Map,Ls=!1,ks=[];function jd(e,t,o){let n=e.currentTarget,r=t.clientWidth-n.offsetWidth;if(e.button!==0||r<=0||!t.classList.contains(Me("hover")))return;let i=yt.store.entryPosition,a=i,l=!1,c=new AbortController;n.setPointerCapture(e.pointerId),n.addEventListener("pointermove",m=>{!l&&Math.abs(m.clientX-e.clientX)<Wd||(l=!0,o(),a=Se(i+(m.clientX-e.clientX)/r,0,Dr),t.style.setProperty(Rr,String(a)))},{signal:c.signal});let d=()=>{c.abort(),l&&(yt.store.entryPosition=a,t.style.removeProperty(Rr))};n.addEventListener("pointerup",d,{signal:c.signal}),n.addEventListener("lostpointercapture",d,{signal:c.signal})}function zd(e){let t=!1,o=s("button",{class:Me("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),t||mn(),t=!1},pointerdown:r=>{t=!1,e!=="rail"&&jd(r,n,()=>{t=!0})}}},D("bloom"),e!=="rail"&&s("span",{class:Me("label"),text:"Bloom++"})),n=s("div",{class:`bloom-root ${Me("wrap")} ${Me(e)}`,attrs:{"data-bloom":"entry"}},o);return n}function Vd(e){let t=s("div",{class:`bloom-root ${Me("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),mn()}}},D("bloom"),s("span",{text:"Bloom++"})),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function Is(){let{showSidebarEntry:e,showSidebarEntryOnHover:t}=yt.store,o=e||t?fs():[];for(let[r,i]of We)r.isConnected&&o.some(a=>a.anchor===r)||(i.remove(),We.delete(r));for(let r of o){let i=We.get(r.anchor);if(i?.isConnected||!be(r.anchor))continue;let a=i??zd(r.kind);We.set(r.anchor,a),r.insert(a)}for(let r of We.values())r.classList.toggle(Me("hover"),!e);let n=cn();n&&!n.querySelector('[data-bloom="menu-entry"]')&&Vd(n)}var Bs=f({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:yt,styles:()=>`${Ms}.${Me("hover")}{${Rr}:${yt.store.entryPosition}}`,start(){ks=[T(Is),cs(),ce()],!Ls&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",mn),Ls=!0)},stop(){for(let e of ks)e();for(let e of We.values())e.remove();We.clear(),At()},onSettingsChange:Is});var Os=`/*
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
`;var O=x("bloom-nav-"),gn=80,Zd=1200,Xd=2,Ps=3e4,$d=200,_d=.9,em=.28,tm=24,vt=8,om=80,nm=12,rm={user:"\u2753",assistant:"\u{1F916}"},im=["wheel","touchmove","pointerdown"],bn=p({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),R=null,k=[],re=-1,ze=-1,qt=null,fn="",Nr=0,Rs=[],no=null,pn=null,je,eo,Ur="",to=[],hn=null,Gr=new Set,am=e=>bn.store.showAssistant||e.role==="user",sm=e=>e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.messageIds[0]||e.role;function lm(e){return{role:e.role,summary:pt(e),ids:e.messageIds,turn:e,streaming:e.streaming}}function Gs(e,t){let o=e.entries.at(-1);if(o?.role==="assistant"&&t.role==="assistant"){e.entries[e.entries.length-1]={...t,ids:[...new Set([...o.ids,...t.ids])]};return}e.entries.push(t)}function cm(){let e=[];for(let t of Te()){let o=lm(t),n=sm(t),r=e.at(-1);r?.key===n?Gs(r,o):e.push({key:n,entries:[o]})}return e}function um(){let e=[];for(let t of ie(b())?.chain??[]){let o={role:t.role,summary:tn(t),ids:[t.id],turn:null,streaming:!1},n=e.at(-1);t.role==="assistant"&&n?Gs(n,o):e.push({key:t.id,entries:[o]})}return e}var wt=e=>e.entries.flatMap(t=>t.ids);function Fr(e,t){let o=new Set(wt(e));return wt(t).some(n=>o.has(n))}var Ve=e=>h(e.entries.find(t=>t.role==="user")?.summary??""),Hr=(e,t)=>e.filter(o=>Ve(o)===t).length,Yr=e=>({...e,turn:null,streaming:!1});function dm(e,t){let o=new Set(t.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return e.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return Yr(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?Yr(r):r})}))}function mm(e,t){let o=t.entries.map((n,r)=>{let i=e.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of e.entries.slice(o.length))o.push(Yr(n));return{key:e.key,entries:o}}function Fs(){let e=Vt();if(!e)return!1;let t=e.clientHeight-e.scrollHeight;return e.scrollTop-t<=Math.abs(e.scrollTop)}function fm(e,t){let o=dm(e,t);if(!t.length)return o;if(!o.length)return t;let n=t.findIndex(c=>o.some(d=>d.key===c.key));if(n<0)return Fs()?t.concat(o):o.concat(t);let r=t[n]?.key,i=o.findIndex(c=>c.key===r),a=o.slice(0,i).concat(t.slice(0,n),o.slice(i)),l=a.findIndex(c=>c.key===r);for(let c=n;c<t.length;c++){let d=t[c];if(!d)continue;let m=a.findIndex(v=>v.key===d.key);if(m>=0){let v=a[m];v&&(a[m]=mm(v,d)),l=m}else a.splice(l+1,0,d),l++}return a}function pm(e,t){let o=0,n=0,r=0;for(let i=1-e.length;i<t.length;i++){let a=0,l=0;for(let d=0;d<e.length;d++){let m=t[d+i],v=e[d];!m||!v||(Fr(v,m)?(a+=3,l++):Ve(v)&&Ve(v)===Ve(m)&&a++)}let c=Fs()?i<r:i>r;(a>o||a===o&&l>n||a===o&&l===n&&c)&&(o=a,n=l,r=i)}return{score:o,offset:r}}function gm(e,t){let o=e.entries.map((n,r)=>{let i=t.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of t.entries.slice(o.length))o.push({...n,turn:null});return{key:e.key,entries:o}}function hm(e){return e.map(t=>({key:t.key,entries:t.entries.map(o=>({...o}))}))}function bm(e,t){if(!t.length)return e;if(!e.length)return t;let{score:o,offset:n}=pm(e,t),r=hm(e);if(o>0)for(let l=0;l<r.length;l++){let c=t[l+n],d=r[l];if(!c||!d)continue;let m=Ve(d),v=!!m&&m===Ve(c)&&Hr(e,m)===1&&Hr(t,m)===1;(Fr(d,c)||v)&&(r[l]=gm(d,c))}let i=[],a=[];for(let l=0;l<t.length;l++){let c=t[l];if(!c)continue;let d=Ve(c);!d||Hr(r,d)>0||r.some(m=>Fr(m,c))||(o>0&&l<n?i.push(c):a.push(c))}return i.concat(r,a)}var Kr=e=>e.entries.some(t=>t.turn?.el.isConnected);function Am(e,t,o){let n=e.findIndex(i=>wt(i).includes(t));if(n>=0)return n+1;let r=e.find(Kr);return o&&r&&wt(r).includes(o)?0:e.length}function ym(e){if(hn){let{parent:t,user:o}=hn;for(let n of e.slice(Am(e,t,o))){let r=wt(n);if(!Kr(n)&&!(o&&r.includes(o)))for(let i of r)Gr.add(i)}}return e.filter(t=>Kr(t)||!wt(t).some(o=>Gr.has(o)))}function Ys(){to=[],hn=null,Gr.clear()}function vm(){let e=$a();e!==Ur&&(Ur=e,Ys());let t=cm(),o=um();return!t.length&&!o.length&&!Xa()?(to=[],[]):(to=ym(bm(fm(to,t),o)),to.flatMap(n=>n.entries).filter(am))}function qm(e){for(let o of e)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!B().generating||e.some(o=>o.streaming))return;let t=e.at(-1);t&&(t.role==="assistant"||!bn.store.showAssistant?t.streaming=!0:e.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function Ks(){let e=vm();return qm(e),e}function Qs(e){let t=e.getBoundingClientRect(),o=K()?.getBoundingClientRect().top,n=Math.min(t.bottom,o&&o>t.top?o:t.bottom);return{top:t.top,bottom:n}}function Ws(e){return((e.matches(".whitespace-pre-wrap, .markdown, .prose, [data-markdown-text-style]")?e:e.querySelector(".whitespace-pre-wrap")??e.querySelector(".markdown, .prose, [data-markdown-text-style]"))??e).getBoundingClientRect().top}function Ds(e){let t=k[e]?.turn?.el;return t?.isConnected?t:null}function wm(e){if(!k.length)return null;let t=e.scrollHeight-e.clientHeight,o=wr(e),n=Math.min(e.scrollTop,0),r=o?-n:t-e.scrollTop,i=o?t+n:e.scrollTop,a=t<=vt||r<=vt,l=t>vt&&i<=vt,{top:c,bottom:d}=Qs(e),m=Ds(0),v=m?Ws(m):Number.NaN,Y=!!m&&v>=c-vt&&v<=c+48,A=Ds(k.length-1),G=A?.getBoundingClientRect().bottom??Number.NaN,Re=!!A&&G<=d+vt&&G>=d-om;return a||Re?"bottom":l||Y?"top":null}function Sm(e){let{top:t,bottom:o}=Qs(e),n=t+Math.max(o-t,0)*em,r=[],i=-1;if(k.forEach((l,c)=>{let d=l.turn?.el;if(!d?.isConnected){r.push(Number.NaN);return}let m=Ws(d);r.push(m),i<0&&(i=c),m<=n&&(i=c)}),i<0)return Math.max(k.findIndex(l=>l.turn),0);let a=r[re];return Number.isFinite(a)?i===re?re:i>re?i:a<=n+tm?re:i:i}function xm(e){let t=wm(e);return t==="bottom"?k.length-1:t==="top"?0:Sm(e)}function Hs(e){bn.store.jumpEffect==="border"&&(e.classList.add(O("flash")),setTimeout(()=>e.classList.remove(O("flash")),Zd))}function An(e){let t=k[e],o=Vt();if(!t||!o)return;if(!t.turn&&!t.ids.length){ze=e,oo(),o.scrollTo({top:wr(o)?0:o.scrollHeight});return}ze=e,qt=e?null:{chat:b(),first:t.ids[0],until:Date.now()+Ps},oo();let n=t.turn?.el;if(n?.isConnected){let d=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:d<o.clientHeight*Xd?"smooth":"auto"}),Hs(n);return}let r=k.findIndex(d=>d.turn),i=r>=0&&e<r?-1:1,a=++Nr,l=Date.now()+Ps,c=()=>{let d=Vt();if(a!==Nr||Date.now()>l||!d)return;k=Ks();let m=k.find(Y=>Y.ids.some(A=>t.ids.includes(A)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),Hs(m),ze=k.findIndex(Y=>Y.turn?.el===m),oo();return}let v=d.scrollTop;d.scrollBy({top:i*d.clientHeight*_d,behavior:"instant"}),d.scrollTop===v?setTimeout(c,$d):requestAnimationFrame(c)};c()}function Em(e,t){return s("button",{class:O("row"),attrs:{type:"button","data-index":String(t),"data-message-id":e.ids[0]??""},on:{click:()=>An(t)}},s("span",{text:rm[e.role]}),s("span",{class:"bloom-truncate",text:ae(e.summary||"\u2026",gn)}))}function Ns(e){if(!R)return;let t=e.getBoundingClientRect(),o=K()?.getBoundingClientRect().top,r=Math.min(t.bottom,o&&o>t.top?o:t.bottom)-t.top;R.style.right=`${document.documentElement.clientWidth-t.left-e.clientLeft-e.clientWidth+nm}px`,R.style.top=`${t.top}px`,R.style.height=r>1?`${r}px`:""}function Tm(){let e=Vt();if(k=Ks(),!k.length||!e){R?.remove(),R=null,fn="";return}if(no!==e){eo?.abort(),eo=new AbortController,e.addEventListener("scroll",Ee(oo),{passive:!0,signal:eo.signal});for(let n of im)e.addEventListener(n,js,{passive:!0,signal:eo.signal});no=e,je?.disconnect(),je=new ResizeObserver(()=>{e.isConnected&&Ns(e)}),je.observe(e),pn=null}let t=K();t&&t!==pn&&je&&(je.observe(t),pn=t),R??=s("div",{class:`bloom-root ${O("root")}`,attrs:{"data-bloom":"navigator"}},s("div",{class:O("rail")}),s("div",{class:O("toc")},s("div",{class:O("toc-head")}),s("div",{class:O("toc-list")}))),R.isConnected||document.body.append(R),Ns(e);let o=JSON.stringify(k.map(n=>[n.role,n.ids]));o!==fn?(fn=o,ze=-1,Mm(),qt&&Date.now()<qt.until&&qt.chat===b()&&k[0]?.ids[0]!==qt.first&&An(0)):Cm(),oo()}function oo(){if(!R||!no)return;re=ze>=0?ze:xm(no),R.querySelectorAll(`.${O("tick")}`).forEach((t,o)=>t.classList.toggle(O("tick-current"),o===re)),R.querySelectorAll(`.${O("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===re)));let e=R.querySelector(`.${O("toc-head")}`);e&&(e.textContent=`${re+1} / ${k.length}`)}function Cm(){R?.querySelectorAll(`.${O("tick")}`).forEach((e,t)=>{let o=k[t],n=ae(o.summary,gn);e.title!==n&&(e.title=n),e.classList.toggle(O("tick-streaming"),o.streaming)}),R?.querySelectorAll(`.${O("row")}`).forEach(e=>{let t=e.lastElementChild,o=ae(k[Number(e.dataset.index)].summary||"\u2026",gn);t&&t.textContent!==o&&(t.textContent=o)})}function Mm(){R?.querySelector(`.${O("rail")}`)?.replaceChildren(...k.map((t,o)=>s("button",{class:Ro(O("tick"),O(`tick-${t.role}`),t.streaming&&O("tick-streaming"),o===re&&O("tick-current")),title:ae(t.summary,gn),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":t.ids[0]??""},on:{click:()=>An(o)}}))),R?.querySelector(`.${O("toc-list")}`)?.replaceChildren(...k.map(Em))}var ue=Ee(Tm);function js(){ze=-1,qt=null,Nr++}var Lm=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function Us(e){if(!R||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||Lm(document.activeElement)||F("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:re-1,ArrowDown:re+1,Home:0,End:k.length-1}[e.key];if(o==null){js();return}o<0||o>=k.length||(e.preventDefault(),e.stopPropagation(),An(o))}var zs=f({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:bn,styles:Os,start(){Rs=[T(e=>P(e)&&ue()),le(ue),Q.on("conversation",ue),Q.on("generate-start",({parentId:e,userId:t})=>{e&&(hn={parent:e,user:t},ue())}),q.on("rise",ue),q.on("fall",ue)],addEventListener("keydown",Us,!0),addEventListener("resize",ue,{passive:!0}),ue()},stop(){for(let e of Rs)e();eo?.abort(),je?.disconnect(),je=void 0,no=null,pn=null,removeEventListener("keydown",Us,!0),removeEventListener("resize",ue),R?.remove(),R=null,fn="",Ys(),Ur=""},onSettingsChange:ue});var Vs=`/*
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
`;var J=x("bloom-quotes-"),$r="BloomBetterQuotes",Im=40,$s=8,Bm=1800,zr=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,Js=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,Je=p({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),Qr,Wr,St,jr=!1,Vr=0,yn=null,vn=null,ye=null;function _r(){return location.pathname.match(/\/c\/(?!local-)([\w-]+)/)?.[1]??(new URLSearchParams(location.search).get("temporary-chat")==="true"?"temporary":"draft")}function wn(){try{let e=JSON.parse(sessionStorage.getItem($r)??"[]");return Array.isArray(e)?e.filter(t=>!!t&&typeof t=="object"&&typeof t.id=="string"&&typeof t.text=="string"&&!!t.text):[]}catch{return[]}}function ei(e){try{sessionStorage.setItem($r,JSON.stringify(e.slice(-Im)))}catch{}}function ro(e){return wn().find(t=>t.id===e)?.text??""}function Om(e,t){let o=wn().filter(n=>n.id!==e);o.push({id:e,text:t}),ei(o)}function Jr(e=_r()){ei(wn().filter(t=>t.id!==e)),qn()}function Pm(e){let t=ro("draft");if(!t||ro(e))return;let o=wn().filter(n=>n.id!=="draft");o.push({id:e,text:t}),ei(o)}function Zr(e){return`${e.getAttribute("aria-label")??""} ${e.getAttribute("title")??""}`}function Rm(e){let t=Zr(e);return Js.test(t)&&!/quote|引用/.test(t)?!1:/quote|引用/.test(t)&&zr.test(t)?!0:zr.test(t)&&!Js.test(t)}function _s(e){let t=e.cloneNode(!0),o=[...t.querySelectorAll("button, [role='button']")],n=new Set(o.map(r=>r.getAttribute("aria-label")).filter(Boolean));for(let r of o)r.remove();for(let r of t.querySelectorAll("*"))!r.children.length&&n.has(h(r.textContent??""))&&r.remove();return h(t.textContent??"")}function Dm(e){let t=K(),o=e.parentElement,n=0;for(;o&&o!==t&&n<5;){if(n++,o.matches(u.composerInput)||o.querySelector(u.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=_s(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function Sn(){let e=K();if(!e)return null;for(let t of e.querySelectorAll("button, [role='button']")){if(t.closest("[data-bloom]")||!Rm(t))continue;let o=Dm(t),n=o?_s(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:t}}return null}function Hm(e){let t=e.closest(u.searchUnit)??e.closest(u.oldMessage);return t&&(mt(t)??t.getAttribute("data-message-author-role"))==="user"?t:null}function ti(e){return h(e).slice(0,48)}function Nm(e,t){let o=ti(e);if(o.length<$s)return null;let n=null;for(let r of ft()){if(t&&(r===t||t.contains(r)||r.contains(t)))continue;let i=h(r.textContent??"");if(!i.includes(o))continue;let a=o.length/Math.max(i.length,1);(!n||a>n.score)&&(n={el:r,score:a})}return n?.el??null}function Um(e,t){let o=ti(t),n=e;for(let r of e.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&h(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${J("hit")}`)?.classList.remove(J("hit")),n.classList.add(J("hit")),window.clearTimeout(Vr),Vr=window.setTimeout(()=>n.classList.remove(J("hit")),Bm)}function Zs(e){let t=e.closest(u.timelineScroll)??document.scrollingElement;if(!(t instanceof HTMLElement)&&t!==document.scrollingElement)return;let o=e.getBoundingClientRect();if(o.height<1||!t)return;let n=t.getBoundingClientRect(),r=K()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,a=o.top+o.height/2-(n.top+i)/2;Math.abs(a)<8||t.scrollTo({top:t.scrollTop+a,behavior:"smooth"})}function oi(){if(!ye||!yn?.isConnected)return;let e=yn.getBoundingClientRect();e.width<1||(ye.style.top=`${Math.max(8,e.top+8)}px`,ye.style.left=`${Math.max(8,e.right-ye.offsetWidth-8)}px`)}function Gm(e,t,o){yn=e,vn=t,ye??=s("button",{class:`bloom-root ${J("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),ye.isConnected||document.body.append(ye),Um(e,o),oi()}function Xs(){ye?.remove(),ye=null,yn=null,vn=null,document.querySelector(`.${J("hit")}`)?.classList.remove(J("hit"))}function el(){return document.querySelector('[data-bloom="quote-chip"]')}function qn(){el()?.remove()}function Fm(e){let o=K()?.getBoundingClientRect();!o||o.width<8||(e.style.width=`${Math.max(120,o.width-24)}px`,e.style.left=`${o.left+12}px`,e.style.top=`${Math.max(8,o.top-e.offsetHeight-8)}px`)}function Ym(e){let t=el();t||(t=s("div",{class:`bloom-root ${J("chip")}`,attrs:{"data-bloom":"quote-chip"}},s("span",{class:J("text")}),s("button",{class:J("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(t));let o=t.querySelector(`.${J("text")}`),n=h(e);o&&o.textContent!==n&&(o.textContent=n),t.dataset.text=e,Fm(t)}function Xr(){if(!jr){jr=!0;try{let e=_r(),t=Sn();Je.store.persistAcrossChats&&t&&ro(e)!==t.text&&Om(e,t.text);let o=Je.store.persistAcrossChats?ro(e):"";!o||t&&h(t.text)===h(o)?qn():Ym(o),oi()}finally{jr=!1}}}function Km(e){let t=e.closest('[data-bloom="quote-chip"]');if(t instanceof HTMLElement&&!e.closest(`.${J("x")}`)){let i=t.dataset.text??t.querySelector(`.${J("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:t}:null}let o=e.closest("blockquote");if(o instanceof HTMLElement&&!e.closest("a, button")){let i=Hm(o),a=h(o.textContent??"");if(i&&a)return{text:a,skip:i,origin:o}}let n=K();if(!n||!n.contains(e)||Ge(e)||e.closest("button, [role='button']"))return null;let r=Sn();return!r||!r.row.contains(e)?null:{text:r.text,skip:null,origin:r.row}}function Qm(e){let{target:t}=e;if(!(t instanceof Element))return;if(t.closest('[data-bloom="quote-back"]')){e.preventDefault(),e.stopPropagation(),vn?.isConnected&&Zs(vn);return}if(t.closest(`.${J("x")}`)){e.preventDefault(),e.stopPropagation(),Jr();return}let o=Sn();if(o&&(t===o.dismiss||o.dismiss.contains(t))){Jr();return}if(Wm(t)&&tl(),!Je.store.jumpToPassage)return;let n=Km(t);if(!n)return;let r=Nm(n.text,n.skip);r&&(e.preventDefault(),e.stopPropagation(),Gm(r,n.origin,n.text),Zs(r))}function Wm(e){let t=e.closest("button, [role='button']");return!(t instanceof HTMLElement)||t.closest("[data-bloom]")||!K()?.contains(t)?!1:/send|submit|发送|提交/i.test(Zr(t))&&!zr.test(Zr(t))}function jm(e){return!(e instanceof KeyboardEvent)||e.key!=="Enter"||e.shiftKey||e.isComposing?!1:Ge(e.target)}function tl(){if(!Je.store.persistAcrossChats)return;let e=_r(),t=ro(e);if(t){if(!Sn()){let o=C(),n=ti(t);n.length>=$s&&!h(o).includes(n)&&ne(`> ${t}

${o}`.trim())}Jr(e)}}function zm(e){jm(e)&&tl()}function Vm(e){!e.prevId&&e.id&&Pm(e.id),Xr()}var ol=f({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:Je,styles:Vs,onSettingsChange(e){e==="jumpToPassage"&&!Je.store.jumpToPassage&&Xs(),e==="persistAcrossChats"&&!Je.store.persistAcrossChats&&(sessionStorage.removeItem($r),qn()),Xr()},start(){St=new AbortController,document.addEventListener("pointerdown",Qm,{capture:!0,signal:St.signal}),document.addEventListener("keydown",zm,{capture:!0,signal:St.signal}),addEventListener("scroll",oi,{capture:!0,passive:!0,signal:St.signal}),Wr=le(Vm),Qr=T(e=>P(e)&&Xr())},stop(){St?.abort(),St=void 0,Wr?.(),Wr=void 0,Qr?.(),Qr=void 0,window.clearTimeout(Vr),Xs(),qn()}});var nl=`/*
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
`;var Zm=x("bloom-cls"),Xm="bloom-cls",$m=600*1e3,ri=la("tab"),Et=new Map,ao=new Map,xt=null,rl=[],_m=e=>e==="streaming"||e==="error";function ef(){let e=new Map,t=Date.now();for(let[o,n]of ao)t-n.at>$m?ao.delete(o):e.set(o,n.status);for(let[o,n]of Et)e.set(o,n);return e}function tf(e){return s("span",{class:`bloom-root ${Zm("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&D("alert"))}function io(){let e=ef(),t=new Set;for(let[o,n]of e)for(let r of $t(o)){if(!be(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let a=tf(n);t.add(a),r.append(a)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function xn(e,t){e&&(t?Et.set(e,t):Et.delete(e),xt?.postMessage({tab:ri,id:e,status:t}),io())}function of({data:e}){!L(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===ri||(_m(e.status)?ao.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):ao.delete(e.id),io())}function ni(){for(let e of Et.keys())xt?.postMessage({tab:ri,id:e,status:null})}var il=f({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:()=>`${nl}`,start(){xt=typeof BroadcastChannel=="function"?new BroadcastChannel(Xm):null,xt?.addEventListener("message",of),addEventListener("pagehide",ni),rl=[q.on("rise",({conversationId:e})=>xn(e,"streaming")),q.on("fall",({conversationId:e,outcome:t})=>xn(e,t==="error"?"error":null)),q.on("context",({prevId:e,id:t,migrated:o})=>{o&&B().generating?xn(t,"streaming"):!o&&Et.get(e??"")==="streaming"&&xn(e,null)}),T(e=>P(e)&&io())],b()&&io()},stop(){for(let e of rl)e();ni(),xt?.close(),xt=null,removeEventListener("pagehide",ni),Et.clear(),ao.clear(),io()}});var sl=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],Cn={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},nf={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},rf="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",ii=32,Mn=64,ai="#FCFCFC",si="#111111",af=14,Ln=51.5,sf=12.5,lf=9.75,al=52,cf=10.5,uf=7.75,df={rotate:e=>e.arc(Ln,Ln,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function En(e){let t=document.createElement("canvas");t.width=t.height=ii;let o=t.getContext("2d");return o?(o.scale(ii/Mn,ii/Mn),e(o),t.toDataURL("image/png")):""}function Tn(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(rf);o&&(e.strokeStyle=si,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function kn(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function mf(e,t){kn(e,Ln,sf,si),kn(e,Ln,lf,Cn[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),df[t](e),e.stroke()}function ff(e,t){e.beginPath(),e.roundRect(0,0,Mn,Mn,af),e.fillStyle=t,e.fill()}var pf=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function ll(e,t){switch(e){case"original":return pf(nf[t]);case"hole":return En(o=>Tn(o,Cn[t],!0));case"bg":return En(o=>{ff(o,Cn[t]),Tn(o,ai,!1)});case"dot":return En(o=>{Tn(o,ai,!0),kn(o,al,cf,si),kn(o,al,uf,Cn[t])});case"badge":return En(o=>{Tn(o,ai,!0),mf(o,t)})}}var lo="bloom-chat-state-favicon",co="data-bloom-rel",ui="data-bloom-media",cl="bloom-parked-icon",gf="/favicon.ico",dl=p({style:{type:"select",description:"How the tab icon shows the chat state.",options:sl,default:"bg"}}),Le=null,ml="",In=null,fl="",ul=new Map,di,li=[],pl=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${co}]`)];function mi(){for(let e of pl())e.id!==lo&&(e.hasAttribute(co)||(fl||=e.href,e.setAttribute(co,e.rel),e.setAttribute(ui,e.getAttribute("media")??"")),e.rel!==cl&&(e.rel=cl),e.media!=="not all"&&(e.media="not all"))}function hf(){for(let e of pl()){let t=e.getAttribute(co);if(t==null)continue;e.rel=t;let o=e.getAttribute(ui);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(co),e.removeAttribute(ui)}}function gl(){let e=document.getElementById(lo);return e||(e=document.createElement("link"),e.id=lo,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function bf(e){if(e==="wait")return fl||gf;let t=dl.store.style,o=`${t}:${e}`,n=ul.get(o);return n||ul.set(o,n=ll(t,e)),n}function ci(e){if(e)return"rotate";let t=C();return Le&&t&&t!==ml&&(Le=null),Le==="error"?"error":Le==="done"?"done":t?"ready":"wait"}function so(e,t=!1){if(e===In&&!t)return;In=e;let o=gl(),n=bf(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function Af(){di=new MutationObserver(()=>{mi(),document.head.lastElementChild?.id!==lo&&gl()}),di.observe(document.head,{childList:!0})}var hl=f({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:dl,start(){mi(),so(ci(B().generating),!0),Af(),li=[q.on("rise",()=>{Le=null,so("rotate")}),q.on("fall",({outcome:e})=>{Le=e==="done"||e==="error"?e:null,ml=C(),so(ci(!1))}),q.on("context",({migrated:e})=>{e||(Le=null)}),q.on("tick",({generating:e})=>{mi(),so(ci(e))})]},stop(){for(let e of li)e();li=[],di?.disconnect(),document.getElementById(lo)?.remove(),hf(),In=null,Le=null},onSettingsChange(){so(In??"wait",!0)}});var ke="data-bloom-invite",yf=/^(?:invite team members|invite members|邀请团队成员|邀请成员)$/i,bl=':is(button, a:not([href^="/c/"])):not(main *, [role="dialog"] *)',vf={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${u.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])'],hideInvite:[`[${ke}]`,`div:has(> [${ke}]:only-child)`]},Al=p({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0},hideInvite:{type:"boolean",description:"Hide Invite team members in the sidebar.",default:!0}}),Bn,fi=!1;function qf(e){if(P(e))for(let t of document.querySelectorAll(`${bl}, [${ke}]`))!t.matches(bl)||!yf.test(h(t.textContent??""))?t.removeAttribute(ke):t.hasAttribute(ke)||t.setAttribute(ke,"")}var yl=f({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads, notices and Invite team members.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:Al,styles:()=>st(Object.entries(vf).flatMap(([e,t])=>Al.store[e]?t:[])),start(){fi=!0,Fe().then(()=>{fi&&!Bn&&(Bn=T(qf))})},stop(){fi=!1,Bn?.(),Bn=void 0;for(let e of document.querySelectorAll(`[${ke}]`))e.removeAttribute(ke)}});var Tt=`form:has(:is(${u.composerInput})), ${u.oldComposerForm}`,On='[class*="ComposerLayoutBody"]',gi='[class*="ComposerLayoutRoot"]',wf='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',Sf=`:is(${Tt}) ${On}, :is(${Tt}):not(:has(${On})) ${gi}, :is(${Tt}):not(:has(${On})):not(:has(${gi})) :is(${wf})`,xf='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',Ef='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',Tf="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))";var Cf="composer-fill",vl=p({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function Mf(){let{opacity:e,blur:t}=vl.store;if(e>=100)return"";let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${Tf} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important;-webkit-backdrop-filter:blur(${t}px)!important`;return`:is(${xf}), :is(${Tt}){${o}}:is(${Ef}){display:none!important}${Sf}{${n}}:is(${Tt}):has(${On}) ${gi}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${Tt}) :is(${u.composerInput}){background-color:transparent!important}`}function pi(){for(let e of document.querySelectorAll(`[data-bloom="${Cf}"]`))e.remove()}var ql=f({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:vl,styles:Mf,start(){pi()},stop(){pi()},onSettingsChange(){pi()}});var Lf=1200,kf=8e3,If=150,Bf=20,wl=6,Ai="continue where you left",Of=/message delivery timed out|please try again/i,Sl=/waiting for the complete answer/i,xl=p({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:Ai,placeholder:Ai}}),hi=[],Rn=0,uo=!1,mo=0,Mt="",Pn="",yi=0,Lt=!1,fo=!1,Dn=!0,Ct="",vi=0,Hn=!1,Pf=()=>xl.store.prompt.trim()||Ai;function El(){return(F(u.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function Tl(){let e=El();return!e||Sl.test(e)||!Of.test(e)?"":e}function Rf(){let e=El();return e&&Sl.test(e)?e:""}function Df(){let e=dt()?.querySelectorAll(u.turn),t=e?.[e.length-1];return`${t?.getAttribute("data-turn-key")??""}:${t?.textContent?.length??0}`}function Cl(e,t,o){if(o===Rn){if(B().generating||C()!==e||t>=Bf){Lt=!1,B().generating||(Mt="");return}jo(),setTimeout(()=>Cl(e,t+1,o),If)}}function Hf(e){let t=Rn;if(B().generating||C()&&C()!==e){Lt=!1,Mt="";return}ne(e),Hn=!0,jt(()=>{t===Rn&&Cl(e,0,t)})}function Ml(e){return e===Mt||mo>=wl||B().generating||C()?!1:(Mt=e,mo+=1,Lt=!0,Hf(Pf()),!0)}function Nf(){if(uo||Lt||fo)return;let e=Date.now(),t=Tl();if(t){if(Ct="",t!==Pn){Pn=t,yi=e;return}if(e-yi<Lf)return;Ml(`${b()??""}:${t}`);return}if(Pn="",!Rf()){Dn=!0,Ct="";return}if(!Dn||!B().generating||C())return;let n=`${b()??""}:${Df()}`;if(n!==Ct){Ct=n,vi=e;return}if(e-vi<kf||mo>=wl)return;let r=ut();r&&(fo=!0,r.click())}function bi(){Rn+=1,uo=!1,mo=0,Mt="",Pn="",yi=0,Lt=!1,fo=!1,Dn=!0,Ct="",vi=0,Hn=!1}var Ll=f({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:xl,start(){bi(),hi=[q.on("rise",()=>{uo=!1,Mt="",Lt=!1,Hn&&(Hn=!1,Dn=!1,Ct="")}),q.on("fall",({outcome:e})=>{if(fo){fo=!1,e==="left"?uo=!0:Ml(`${b()??""}:stall`);return}(e==="stopped"||e==="left")&&(uo=!0),e==="done"&&!Tl()&&(mo=0)}),q.on("context",({migrated:e})=>{e||bi()}),q.on("tick",Nf)]},stop(){for(let e of hi)e();hi=[],bi()}});var ve=x("bloom-csi-"),Uf=256,Gf=160,Nn=1,kl=4,Ff=.1,Yf=.0015,Kf=250;function Qf(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function Wf(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function jf(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:Se(t.x,n,1-n),y:Se(t.y,r,1-r)}}function Il(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function zf(e,t){let o=s("canvas");return o.width=o.height=Uf,Il(o,e,t),o.toDataURL("image/png")}function Bl(e){let t=null,o={x:H.store.cropX,y:H.store.cropY,zoom:H.store.cropZoom},n,r=s("canvas",{class:ve("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=Gf*devicePixelRatio;let i=s("div",{class:`bloom-muted ${ve("status")}`}),a=s("div",{class:ve("zoom")}),l=s("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function c(A,G=!0){t&&(o=jf(t,A),Il(r,t,o),G&&(clearTimeout(n),n=setTimeout(()=>{t&&(H.store.cropX=o.x,H.store.cropY=o.y,H.store.cropZoom=o.zoom,H.store.avatarUrl=zf(t,o))},Kf)))}function d(){a.replaceChildren(sn(o.zoom,Nn,kl,Ff,"\xD7",A=>c({...o,zoom:A})))}async function m(A,G){i.textContent="";try{t=await Wf(A),G&&(H.store.avatarSource=A,o={x:.5,y:.5,zoom:Nn}),e.classList.add(ve("has-image")),d(),c(o,G)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let v=A=>{A?.type.startsWith("image/")&&Qf(A).then(G=>m(G,!0))};l.addEventListener("change",()=>v(l.files?.[0])),r.addEventListener("wheel",A=>{t&&(A.preventDefault(),c({...o,zoom:Se(o.zoom*(1-A.deltaY*Yf),Nn,kl)}),d())},{passive:!1}),r.addEventListener("pointerdown",A=>{if(!t)return;r.setPointerCapture(A.pointerId);let G={...o},Re=r.getBoundingClientRect(),Io=Bo=>{if(!t)return;let ee=Math.max(Re.width/t.naturalWidth,Re.height/t.naturalHeight)*o.zoom;c({...o,x:G.x-(Bo.clientX-A.clientX)/(t.naturalWidth*ee),y:G.y-(Bo.clientY-A.clientY)/(t.naturalHeight*ee)})};r.addEventListener("pointermove",Io),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",Io),{once:!0})});let Y=s("div",{class:ve("cropper"),attrs:{tabindex:"0"},on:{paste:A=>v([...A.clipboardData?.files??[]].find(G=>G.type.startsWith("image/"))),dragover:A=>A.preventDefault(),drop:A=>{A.preventDefault(),v(A.dataTransfer?.files[0])}}},s("div",{class:ve("stage")},r),s("div",{class:ve("controls")},Xt("",A=>A.trim()&&void m(A.trim(),!0),"https://\u2026 or data:image/\u2026","url"),s("div",{class:ve("buttons")},W("Choose file",()=>l.click()),W("Reset crop",()=>{c({x:.5,y:.5,zoom:Nn}),d()}),W("Clear",()=>{t=null,e.classList.remove(ve("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),H.store.avatarUrl="",H.store.avatarSource=""},"danger")),a,i,l));return e.append(Y),H.store.avatarSource&&m(H.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var Ol=`/*
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
`;var po="data-bloom-csi-avatar",qi="data-bloom-csi-sized",Hl="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",Jf=32,H=p({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>Bl(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),Pl=[];function Nl(e){e.removeAttribute(po),e.removeAttribute(qi)}function Rl(e){return(H.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function Dl(e=[]){if(!P(e))return;let t=H.store.displayName.trim()||null,o=!!H.store.avatarUrl,n=new Set(t?Rl("name"):[]);for(let i of document.querySelectorAll(Hl))n.has(i)||Ue(i,null);for(let i of n)Ue(i,t);let r=new Set(o?Rl("avatar"):[]);for(let i of document.querySelectorAll(`[${po}]`))r.has(i)||Nl(i);for(let i of r)i.hasAttribute(po)||i.setAttribute(po,""),i.toggleAttribute(qi,!i.closest('[role="menu"]'))}function Zf(){let e=H.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${H.store.avatarSize}px}:is(${u.rail}, ${u.oldRail}) [${qi}]{--bloom-csi-size:${Jf}px}`:""}var Ul=f({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:H,styles:()=>`${Zf()}
${Ol}`,start(){Pl=[ce(),T(Dl)]},stop(){for(let e of Pl)e();for(let e of document.querySelectorAll(`[${po}]`))Nl(e);for(let e of document.querySelectorAll(Hl))Ue(e,null)},onSettingsChange(){Dl()}});var kt=x("bloom-greeting-"),Gl=30,Fl=100;function Yl(e){let t=-1,o=s("textarea",{class:`bloom-input ${kt("input")}`,attrs:{maxlength:String(Fl),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=W("Add",i),r=s("div",{class:kt("list")});function i(){let c=o.value.trim().slice(0,Fl);if(!c)return;let d=[...M.store.greetings];t>=0?d[t]=c:d.length<Gl&&d.push(c),M.store.greetings=d,t=-1,o.value="",a()}function a(){let{greetings:c}=M.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&c.length>=Gl,r.replaceChildren(...c.length?c.map((d,m)=>s("div",{class:kt("row",m===t?"row-editing":"row-idle")},s("div",{class:kt("text"),text:d}),V("edit","Edit",()=>{t=m,o.value=d,o.focus(),a()}),V("trash","Delete",()=>{M.store.greetings=c.filter((v,Y)=>Y!==m),t===m&&(t=-1),a()}))):[s("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",c=>{c.key==="Enter"&&(c.ctrlKey||c.metaKey)&&i()}),e.append(s("div",{class:kt("editor")},r,s("div",{class:kt("form")},o,n))),a();let l=ct((c,d)=>c==="GreetingCustomizer"&&d==="greetings"&&a());return()=>{l(),e.replaceChildren()}}var Kl=`/*
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
`;var Fn="data-bloom-greeting",$f=1e3,_f=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],M=p({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>Yl(e)},greetings:{type:"custom",default:_f},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),Un,Ql=[],wi,ho=()=>_o()&&!se(),ep=e=>e.replaceAll(/\s*\n\s*/g," ").trim(),jl=()=>M.store.greetings.filter(e=>typeof e=="string"&&e.trim());function bo(){let e=jl();if(e.length)if(M.store.order==="random"&&e.length>1){let t=M.store.lastRandom;for(;t===M.store.lastRandom;)t=Math.floor(Math.random()*e.length);M.store.lastRandom=t,M.store.index=t}else M.store.index=(M.store.index+1)%e.length}function tp(){return ho()?F(u.homeHeading):null}function Gn(){for(let e of document.querySelectorAll(`[${Fn}]`))e.removeAttribute(Fn),Ue(e,null)}function Yn(){for(let e of document.querySelectorAll("[data-bloom-placeholder]"))e.removeAttribute("data-bloom-placeholder")}function Wl(e){let t=he(),o=ep(e);if(!t||!o||C(t)){Yn();return}t.getAttribute("data-bloom-placeholder")!==o&&t.setAttribute("data-bloom-placeholder",o)}function go(){let e=jl(),t=ja(),o=ho();if(!e.length||!t&&!o){Gn(),Yn();return}if(t){Gn(),Wl(e[0]??"");return}let n=tp();n?((M.store.index<0||M.store.index>=e.length)&&bo(),n.setAttribute(Fn,""),Ue(n,e[Math.max(0,M.store.index)%e.length]??"")):Gn(),M.store.heroOnlyOutsideProject?Yn():Wl(e[Math.max(0,M.store.index)%e.length]??"")}function Si(){clearInterval(Un),Un=void 0,M.store.mode==="interval"&&ho()&&(Un=setInterval(()=>{bo(),go()},M.store.intervalSec*$f))}function op(e){M.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${Fn}]`)||getSelection()?.toString()||(bo(),go())}function np(){ho()&&M.store.mode==="refresh"&&bo(),Si(),go()}var zl=f({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:M,styles:Kl,start(){wi=new AbortController,document.addEventListener("click",op,{signal:wi.signal}),ho()&&M.store.mode==="refresh"&&bo(),Si(),Ql=[T(e=>P(e)&&go()),le(np)]},stop(){wi?.abort();for(let e of Ql)e();clearInterval(Un),Gn(),Yn()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&Si(),go()}});var Ao=x("bloom-history-"),xi=10,rp=3e3;function Vl(e){let t="",o=0,n=new Set,r=s("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=s("div",{class:Ao("list")}),a=s("div",{class:Ao("pager")}),l,c=W("Clear all",()=>{if(!l){c.textContent="Click again to clear",l=setTimeout(()=>{l=void 0,c.textContent="Clear all"},rp);return}clearTimeout(l),l=void 0,c.textContent="Clear all",yo([])},"danger");function d(){let v=[...Ze.store.entries].toReversed(),Y=t.trim().toLowerCase(),A=Y?v.filter(ee=>ee.toLowerCase().includes(Y)):v,G=Math.max(1,Math.ceil(A.length/xi));o=Math.min(o,G-1);let Re=A.slice(o*xi,(o+1)*xi).map(ee=>s("div",{class:Ao("row")},s("button",{class:Ao("text",n.has(ee)?"text-open":"text-closed"),text:ee,title:n.has(ee)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(ee)||n.add(ee),d()}}}),V("copy","Copy",()=>void ca(ee)),V("trash","Delete",()=>yo(Ze.store.entries.filter(hu=>hu!==ee)))));i.replaceChildren(...Re.length?Re:[s("div",{class:"bloom-muted",text:Y?"No matching prompts.":"No saved prompts yet."})]),a.replaceChildren(s("span",{class:"bloom-muted",text:`${A.length} ${Y?"matching":"saved"} \xB7 page ${o+1} of ${G}`}),W("Previous",()=>{o--,d()}),W("Next",()=>{o++,d()}),c);let[Io,Bo]=a.querySelectorAll("button");Io.disabled=o===0,Bo.disabled=o>=G-1,c.disabled=!v.length}r.addEventListener("input",()=>{t=r.value,o=0,d()}),e.append(s("div",{class:Ao("manager")},r,i,a)),d();let m=ct((v,Y)=>v==="InputHistory"&&Y==="entries"&&d());return()=>{m(),clearTimeout(l),e.replaceChildren()}}var Jl=`/*
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
`;var ap=x("bloom-history-"),sp=2e3,Ze=p({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>Vl(e)},entries:{type:"custom",default:[]}}),_=null,Ei={text:"",at:0},Xe=null,Ti,Kn=()=>Ze.store.entries.filter(e=>typeof e=="string");function yo(e){Ze.store.entries=e.slice(-Ze.store.maxEntries)}function Ci(e){let t=e.trim();if(!t)return;let o=Date.now();t===Ei.text&&o-Ei.at<sp||(Ei={text:t,at:o},yo([...Kn().filter(n=>n!==t),t]))}function lp(e,t){let o=he();if(!o)return;Xe??=s("div",{class:`bloom-root ${ap("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),Xe.textContent=`${e+1} / ${t}`;let n=(o.closest("form")??o).getBoundingClientRect();Xe.style.left=`${n.left+n.width/2}px`,Xe.style.top=`${n.top}px`,Xe.isConnected||document.body.append(Xe)}function vo(){_=null,Xe?.remove()}function cp(e){let t=Kn();if(!_)return;let o=t[e];_.index=e,_.shown=o,ne(o),lp(t.length-1-e,t.length)}function up(e){let t=Kn();if(!t.length)return!1;if(!_){if(e===1)return!1;_={index:t.length,draft:C(),shown:""}}let o=_.index+e;return o<0?!0:o>=t.length?(ne(_.draft),vo(),!0):(cp(o),!0)}function Zl(e){return Ge(e)?e:e instanceof HTMLElement?e.closest(u.composerInput):null}function dp(){if(he()?.closest("[data-chatgpt-composer], [data-composer-input], form")?.querySelector('[aria-expanded="true"]'))return!0;for(let t of document.querySelectorAll('[role="listbox"], [role="menu"], [data-radix-popper-content-wrapper], [cmdk-root], [cmdk-list]')){if(!(t instanceof HTMLElement)||t.closest("[data-bloom]"))continue;let o=getComputedStyle(t);if(!(o.display==="none"||o.visibility==="hidden"))return!0}return!1}function mp(e){if(e.isComposing||e.key==="Process"||e.keyCode===229)return;let t=Zl(e.target);if(!t)return;if(e.key==="Enter"&&!e.shiftKey){Ci(C(t)),vo();return}if(e.key==="Escape"&&_){ne(_.draft),vo(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey||dp())return;let o=Oa(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!_||up(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function fp(e){_&&Zl(e.target)&&C()!==_.shown.trim()&&vo()}function pp(e){e.target instanceof Element&&e.target.closest(u.sendButton)&&Ci(C())}var Xl=f({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:Ze,styles:Jl,start(){Ti=new AbortController;let{signal:e}=Ti;document.addEventListener("keydown",mp,{capture:!0,signal:e}),document.addEventListener("input",fp,{capture:!0,signal:e}),document.addEventListener("click",pp,{capture:!0,signal:e}),document.addEventListener("submit",()=>Ci(C()),{capture:!0,signal:e})},stop(){Ti?.abort(),vo()},onSettingsChange(e){e==="maxEntries"&&yo(Kn())}});var $l=`/*
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
`;var hp=1500,bp=5e3,Ap=2e3,rc=[{label:"UTC",value:"UTC"},{label:"\u7F8E\u56FD\u4E1C\u90E8",value:"America/New_York"},{label:"\u7F8E\u56FD\u4E2D\u90E8",value:"America/Chicago"},{label:"\u7F8E\u56FD\u5C71\u5730",value:"America/Denver"},{label:"\u7F8E\u56FD\u897F\u90E8",value:"America/Los_Angeles"},{label:"\u65E5\u672C",value:"Asia/Tokyo"},{label:"\u53F0\u6E7E",value:"Asia/Taipei"}],It=p({sourceTimeZone:{type:"select",description:"Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",options:rc,default:"UTC"},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),Wn=new Map,Mi=new Set,ic=0,jn,_l=[];function ac(e,t){Wn.get(e)!==t&&(Wn.set(e,t),clearTimeout(jn),jn=setTimeout(sc,Ap))}function sc(){let e={...It.store.stamps,...Object.fromEntries(Wn)};It.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,hp))}function yp(e){let t=ie(b())?.times;for(let o=e.length-1;o>=0;o--){let n=Wn.get(e[o])??t?.get(e[o])??It.store.stamps[e[o]];if(n)return n}return null}var vp=()=>B().generating||Date.now()-ic<bp;function lc(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function cc(){let e=It.store.sourceTimeZone;if(!e||e==="UTC")return"UTC";try{return Intl.DateTimeFormat(void 0,{timeZone:e}),e}catch{return"UTC"}}function uc(e,t){let o={};for(let n of new Intl.DateTimeFormat("en-US",{timeZone:t,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(e)))o[n.type]=n.value;return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour%24,mi:+o.minute,s:+o.second}}function dc(e){return Date.UTC(e.y,e.m-1,e.d,e.h,e.mi,e.s)}function ec(e,t){let o=e;for(let n=0;n<4;n++){let r=e-dc(uc(o,t));if(r===0)return o;o+=r}return o}function qp(e,t){if(t==="UTC")return e;let o=(e%1e3+1e3)%1e3,n=e-o,r=new Date(n),i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds()),a=ec(i,t),l=3600*1e3,c=Number.POSITIVE_INFINITY;for(let d of[-l,0,l]){let m=a+d;dc(uc(m,t))===i&&m<c&&(c=m)}return c!==Number.POSITIVE_INFINITY?c+o:ec(i+l,t)+o}function wp(e,t){let o=cc();return t||o==="UTC"?e:qp(e,o)}function tc(e,t){return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(e)}function Sp(e){let t=lc(),o=Date.now(),n={hour:"2-digit",minute:"2-digit",timeZone:t};if(tc(e,t)===tc(o,t))return new Intl.DateTimeFormat(void 0,n).format(e);let r=a=>new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric"}).format(a),i=r(e)===r(o)?{}:{year:"numeric"};return new Intl.DateTimeFormat(void 0,{...i,month:"short",day:"numeric",...n}).format(e)}function xp(e,t){let o=new Date(t).toLocaleString(void 0,{timeZone:lc()}),n=cc();if(n==="UTC"||t===e)return o;let r=new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"}).format(e);return`${rc.find(a=>a.value===n)?.label??n} ${r} \u2192 ${o}`}function mc(e){let t=mt(e)??e.getAttribute("data-message-author-role")??e.closest(u.turn)?.getAttribute("data-turn")??e.querySelector(u.authorRole)?.getAttribute("data-message-author-role");if(qr(t))return t;let o=zt(e).at(-1);return ie(b())?.chain.find(n=>n.id===o)?.role??null}var oc='[class*="group/activity-header"]';function Ep(e){let t=e.parentElement;if(!t)return null;let o=e.closest(u.turn);return o&&t!==o&&!o.contains(t)?null:t}function Tp(e){let t=e;for(let o=0;o<8&&t;o++){let n=Ep(t);if(!n)return null;let r=[...n.children],i=r.indexOf(t);for(let a=i-1;a>=0;a--){let l=r[a],c=l.matches(oc)?l:l.querySelector(oc);if(c)return c;if(l.matches(u.searchUnit)||l.querySelector(u.searchUnit))return null}if(n===t.closest(u.turn))return null;t=n}return null}function Cp(e){let t=e.parentElement;for(let o=0;o<4&&t;o++){if(t.classList.contains("flex-col"))return t;t=t.parentElement}return e.parentElement??e}function fc(e,t){if(t==="assistant"){let o=Tp(e);if(o)return Cp(o)}return e}function Mp(e,t){let o=ft();for(let n=o.length-1;n>=0;n--){let r=o[n];if(!(r!==e&&(mc(r)!=="assistant"||fc(r,"assistant")!==t)))return r===e}return!0}function nc(e){return e.querySelector(':scope > time[data-bloom="timestamp"]')}function Lp(e){let t=zt(e);if(!t.length||!be(e)||e.querySelector("time:not([data-bloom])"))return;let o=mc(e),n=fc(e,o);if(n!==e&&!Mp(e,n)){nc(e)?.remove();return}let r=yp(t),i=!1;if(!r&&vp()){r=Date.now();let m=t.at(-1);Mi.add(m),ac(m,r),i=!0}else r&&Mi.has(t.at(-1))&&(i=!0);let a=n.querySelector('time[data-bloom="timestamp"]')??nc(e);if(!r||It.store.hideOwnMessages&&o==="user"){a?.remove();return}let l=wp(r,i),c=Sp(l);if(a?.textContent===c&&a.parentElement===n&&a===n.firstElementChild)return;let d=s("time",{class:`bloom-timestamp bloom-timestamp-${o??"assistant"}`,text:c,title:xp(r,l),attrs:{"data-bloom":"timestamp",datetime:new Date(l).toISOString()}});a&&a.replaceWith(d),(d.parentElement!==n||d!==n.firstElementChild)&&n.prepend(d)}var Qn=Ee(()=>{for(let e of ft())Lp(e)}),pc=f({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:It,styles:$l,start(){_l=[T(e=>P(e)&&Qn()),Q.on("conversation",Qn),Q.on("message-time",({messageId:e,time:t})=>{Mi.delete(e),ac(e,t),Qn()}),q.on("fall",()=>{ic=Date.now()})]},stop(){for(let e of _l)e();jn&&(clearTimeout(jn),sc());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();Qn()}}});var kp=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])','[data-chatgpt-composer] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-composer-input] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-codex-composer-root] button[aria-label^="Dictat" i], [data-composer-placement] button[aria-label^="Dictat" i], [class*="ComposerLayout"] button[aria-label^="Dictat" i]'],Ip=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],gc=p({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),hc=f({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:gc,styles:()=>st([...kp,...gc.store.hideDictationSettings?Ip:[]])});var $e="data-bloom-share",Bp=/^\/g\/g-p-/,Op=/^(?:share|分享)$/i,Pp=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],Rp=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${$e}="project"]`],Li=p({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),zn,ki=!1;function Dp(e){if(!P(e))return;let t=Bp.test(location.pathname)&&!b();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${$e}]`))!t||!Op.test(h(o.textContent??""))?o.removeAttribute($e):o.hasAttribute($e)||o.setAttribute($e,"project")}var bc=f({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:Li,styles:()=>st([...Li.store.hideShareChat?Pp:[],...Li.store.hideShareProject?Rp:[]]),start(){ki=!0,Fe().then(()=>{ki&&!zn&&(zn=T(Dp))})},stop(){ki=!1,zn?.(),zn=void 0;for(let e of document.querySelectorAll(`[${$e}]`))e.removeAttribute($e)}});var Ac='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',Hp='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',Np="[data-bloom-profile-plan]",yc="visibility:hidden!important;user-select:none!important",qc=p({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function Up(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=qc.store,r=[];return e&&r.push(n?`:is(${Ac}){display:none!important}`:`:is(${Ac}){${yc}}`),t&&r.push(`:is(${Hp}){${yc}}`),e&&o&&r.push(`${Np}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var vc,wc=f({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:qc,styles:Up,start(){vc=ce()},stop(){vc?.()}});var Gp="model-switcher-dropdown-button",Ii="data-selected-reasoning-effort",Vn="ArrowLeft",Sc=e=>e.startsWith("model-switcher-")&&e!==Gp?e.slice(15):"",qo=(e,t)=>e.id===t.id||!!e.label&&e.label===t.label;function xc(){let e=K();return(e&&F(u.modelTrigger,e))??F(u.modelTrigger)}function de(){let e=xc();if(!e)return null;let t=e.getAttribute("aria-expanded")==="true",o=e.getAttribute(Ii),n=o&&t?"":h(e.innerText),r=o||Sc(e.getAttribute("data-testid")??"")||n;return r?{id:r,label:n||r}:null}function Fp(e){return[...document.querySelectorAll(u.modelItem)].find(t=>{let o=Sc(t.getAttribute("data-testid")??""),n=h(t.textContent??"");return o===e.id||n===e.label||n===e.id})??null}function Yp(e){let t=e.querySelector("[role=slider]"),o=Number(t?.getAttribute("aria-valuenow")),n=Number(t?.getAttribute("aria-valuemax"));o<=0?Vn="ArrowRight":o>=n&&(Vn="ArrowLeft"),e.focus(),e.dispatchEvent(new KeyboardEvent("keydown",{key:Vn,code:Vn,bubbles:!0,cancelable:!0}))}function Bi(e){let t=de(),o=xc();if(t&&qo(t,e))return o?.hasAttribute(Ii)&&o.getAttribute("aria-expanded")==="true"&&document.querySelector("[role=menu]")?.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),!0;if(o?.hasAttribute(Ii)){let r=document.querySelector(u.effortSlider);return r?Yp(r):o.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,button:0,pointerType:"mouse",isPrimary:!0})),!1}let n=Fp(e);if(n){n.click();let r=de();return!!r&&qo(r,e)}return o?.getAttribute("aria-expanded")!=="true"&&o?.click(),!1}var Ec=`/*
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
`;var N=x("bloom-queue-"),Qp=6,Wp=8,Z=null,wo="",Bt=!1,Ot=!1;function Oi(e,t,o){let n=V(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute(Ae),n.addEventListener("mouseenter",()=>Tc(t)),n.addEventListener("mouseleave",()=>Tc("")),n}function Tc(e){let t=Z?.querySelector(`.${N("tip")}`);t&&(t.textContent=e)}function jp(e,t,o,n){Ot=!0;let r=s("textarea",{class:`bloom-input ${N("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=new AbortController,a=l=>{i.abort(),Ot=!1,wo="",l?n.edit(t,r.value):r.replaceWith(s("div",{class:N("text"),text:o}))};addEventListener("keydown",l=>{if(!(l.target!==r||l.isComposing)){if(l.key==="Enter"&&!l.shiftKey)a(!0);else if(l.key==="Escape")a(!1);else return;l.preventDefault(),l.stopImmediatePropagation()}},{capture:!0,signal:i.signal}),r.addEventListener("keydown",l=>l.stopPropagation(),{signal:i.signal}),r.addEventListener("blur",()=>a(!0),{signal:i.signal}),e.querySelector(`.${N("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function zp(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,a=c=>{!i&&Math.abs(c.clientY-n.clientY)<Qp||(i||(i=Ot=!0,e.classList.add(N("dragging"))),e.style.transform=`translateY(${c.clientY-n.clientY}px)`)},l=c=>{if(removeEventListener("pointermove",a),!i)return;Ot=!1,wo="";let m=[...r.children].filter(v=>v!==e).filter(v=>v.getBoundingClientRect().top+v.getBoundingClientRect().height/2<c.clientY).length;o.move(t,m)};addEventListener("pointermove",a),addEventListener("pointerup",l,{once:!0})})}function Vp(e,t,o,n){let r=s("li",{class:N("row")},s("div",{class:N("text"),text:e.text}),n&&e.label?s("span",{class:N("model"),title:e.label,text:e.label}):null,s("div",{class:N("actions")},Oi("trash","Remove from queue",()=>o.remove(t)),Oi("edit","Edit",()=>jp(r,t,e.text,o)),Oi("send","Send now",()=>o.sendNow(t))));return zp(r,t,o),r}function Jp(e){if(!Z)return;let t=e.getBoundingClientRect();Z.style.left=`${t.left}px`,Z.style.width=`${t.width}px`,Z.style.bottom=`${innerHeight-t.top+Wp}px`}function Pi(){Z?.remove(),Z=null,wo="",Ot=!1}function _e(e,t,o=!0){let n=K();if(!e.length||!Wt(n)){Pi();return}Z||(Z=s("div",{class:`bloom-root ${N("tray")}`,attrs:{"data-bloom":"queue"}},s("div",{class:N("header")},s("button",{class:N("toggle"),attrs:{type:"button","aria-expanded":String(!Bt)},on:{click:a=>{Bt=!Bt,Z?.classList.toggle(N("collapsed"),Bt),a.currentTarget.setAttribute("aria-expanded",String(!Bt))}}},s("span",{class:N("count")}),D("chevron")),s("span",{class:N("tip")})),s("ol",{class:N("list")})),Z.classList.toggle(N("collapsed"),Bt),document.body.append(Z)),Jp(n);let r=JSON.stringify([o,...e.map(a=>[a.text,o?a.label:""])]);if(Ot||r===wo)return;wo=r;let i=Z.querySelector(`.${N("count")}`);i&&(i.textContent=Oo(e.length,"Queued message")),Z.querySelector(`.${N("list")}`)?.replaceChildren(...e.map((a,l)=>Vp(a,l,t,o)))}var $n=new S("PromptQueue"),Zp=8,xo=150,Jn=20,Xp=300,me="BloomPromptQueue",Di="BloomPromptQueueClaim",Cc="BloomPromptQueueTab",$p=4e3,z=p({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1},showQueueMode:{type:"boolean",description:"Show the model that was selected when each message was queued.",default:!0},stickyOnNavigate:{type:"boolean",description:"Keep the selected model when switching chats.",default:!0},persistAcrossRefresh:{type:"boolean",description:"Restore unsent queued messages in this browser after a refresh. Other tabs show the same queue; only one of them sends it.",default:!0}}),fe=new Map,So=!1,et=null,Pt,Mc=[],Ie=null,ot=!1,Eo,Zn="draft",To=()=>b()??Zn,X=()=>fe.get(To())??[],Hi=e=>({id:e.model||e.label,label:e.label||e.model});function _p(e){return typeof e=="string"?e.trim()?{text:e,model:"",label:""}:null:!L(e)||typeof e.text!="string"||!e.text.trim()?null:{text:e.text,model:typeof e.model=="string"?e.model:"",label:typeof e.label=="string"?e.label:""}}function Ni(){let e=sessionStorage.getItem(Cc);if(e)return e;let t=globalThis.crypto?.randomUUID?.()??`${Date.now()}-${Math.random()}`;return sessionStorage.setItem(Cc,t),t}function Ic(){let e=xe(localStorage.getItem(Di)??"");return!L(e)||typeof e.tab!="string"||typeof e.at!="number"||typeof e.key!="string"?null:{tab:e.tab,at:e.at,key:e.key}}function Bc(){let e={tab:Ni(),at:Date.now(),key:To()};try{localStorage.setItem(Di,JSON.stringify(e))}catch(t){$n.warn("Could not claim the queue",t)}}function eg(){let e=Ic();if(e?.tab===Ni())try{localStorage.setItem(Di,JSON.stringify({...e,at:Date.now()}))}catch(t){$n.warn("Could not refresh the queue claim",t)}}function tg(){let e=Ic();return!e||e.tab===Ni()||e.key!==To()?!0:Date.now()-e.at<=$p?!1:(Bc(),!0)}function og(){return Object.fromEntries([...fe].filter(([e])=>e!==Zn))}function Ri(e){let t=typeof e=="string"?xe(e):e;if(!L(t))return!1;let o=!1;for(let[n,r]of Object.entries(t)){if(!Array.isArray(r))continue;let i=r.map(_p).filter(a=>a!=null);i.length&&(fe.set(n,i),o=!0)}return o}function ng(){if(!z.store.persistAcrossRefresh){sessionStorage.removeItem(me),sr(me);return}Ri(sessionStorage.getItem(me))||Ri(Do(me))&&Xn()}function Xn(){try{if(!z.store.persistAcrossRefresh){sessionStorage.removeItem(me),sr(me);return}let e=og();sessionStorage.setItem(me,JSON.stringify(e)),Ho(me,e)}catch(e){$n.warn("Could not save the queue",e)}}function rg(e){if(!(e.key!==me||!z.store.persistAcrossRefresh||e.newValue==null)){fe.clear(),Ri(e.newValue);try{sessionStorage.setItem(me,e.newValue)}catch(t){$n.warn("Could not mirror the queue",t)}_e(X(),Rt,z.store.showQueueMode)}}function tt(e){e.length?fe.set(To(),e):fe.delete(To()),Bc(),Xn(),_e(X(),Rt,z.store.showQueueMode)}function ig(e){if(!e.model&&!e.label)return!0;let t=de();return t?qo(t,Hi(e)):!0}function Oc(e,t=0){t>=Jn||B().generating||C()!==e||(jo(),setTimeout(()=>Oc(e,t+1),xo))}function ag(e,t){let o=e??Ie;if(!o||!t.model&&!t.label||qo(o,Hi(t))){ot=!1;return}z.store.stickyOnNavigate&&(Ie=o),clearTimeout(Eo),Eo=setTimeout(()=>Rc(o),xo)}function Co(e,t=0,o=de()){if(B().generating||C()){t<Jn&&setTimeout(()=>Co(e,t+1,o),xo);return}if(!ig(e)&&t<Jn){ot=!0,Bi(Hi(e)),setTimeout(()=>Co(e,t+1,o),xo);return}ne(e.text),jt(()=>Oc(e.text)),ag(o,e)}function Lc(){if(et!=null){let o=et;et=null,Co(o);return}if(!So||B().generating||C())return;if(!tg()){So=!1;return}let[e,...t]=X();e!=null&&(So=!1,tt(t),Co(e))}function Pc(e){let t=X(),o=t[e];if(o!=null){if(tt(t.filter((n,r)=>r!==e)),!B().generating){Co(o);return}et=o,ut()?.click()}}var Rt={remove:e=>tt(X().filter((t,o)=>o!==e)),edit:(e,t)=>tt(t.trim()?X().map((o,n)=>n===e?{...o,text:t}:o):X().filter((o,n)=>n!==e)),sendNow:Pc,move(e,t){let o=[...X()],[n]=o.splice(e,1);n&&(o.splice(t,0,n),tt(o))}};function sg(e){let t=de(),o={text:e,model:t?.id??"",label:t?.label??""},n=X();return z.store.replacePending&&n.length?(tt([...n.slice(0,-1),o]),!0):n.length>=Zp?!1:(tt([...n,o]),!0)}function lg(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!Ge(e.target)||!B().generating)return;let t=C(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;let o=de();ne(""),et={text:t,model:o?.id??"",label:o?.label??""},ut()?.click();return}if(!t){X().length&&Pc(0);return}sg(t)&&ne("")}function cg(){if(ot||!z.store.stickyOnNavigate)return;let e=de();e&&(Ie=e)}function Rc(e){ot=!0;let t=0,o=()=>{if(Bi(e)||t>=Jn){ot=!1;return}t++,Eo=setTimeout(o,xo)};clearTimeout(Eo),o()}function ug(){z.store.stickyOnNavigate&&Ie&&Rc(Ie)}function kc(e){let{target:t}=e;!(t instanceof Element)||ot||t.closest(`${u.modelTrigger}, ${u.modelItem}`)&&setTimeout(cg,Xp)}var Dc=f({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:z,styles:Ec,start(){Pt=new AbortController,ng(),Ie=de(),document.addEventListener("keydown",lg,{capture:!0,signal:Pt.signal}),document.addEventListener("pointerup",kc,{signal:Pt.signal}),document.addEventListener("keyup",kc,{signal:Pt.signal}),Mc=[q.on("fall",({outcome:e})=>{So=e==="done",e==="left"&&(et=null),Lc()}),q.on("context",({prevId:e,id:t,migrated:o})=>{let n=fe.get(Zn);fe.delete(Zn),o&&!e&&t&&n&&fe.set(t,n),o||(So=!1,ug()),Xn(),_e(X(),Rt,z.store.showQueueMode)}),q.on("tick",()=>{eg(),Lc(),_e(X(),Rt,z.store.showQueueMode)})],addEventListener("storage",rg,{signal:Pt.signal}),_e(X(),Rt,z.store.showQueueMode)},stop(){Pt?.abort(),clearTimeout(Eo);for(let e of Mc)e();Pi(),fe.clear(),et=null,Ie=null,ot=!1},onSettingsChange(e){e==="persistAcrossRefresh"&&Xn(),e==="stickyOnNavigate"&&z.store.stickyOnNavigate&&(Ie=de()),_e(X(),Rt,z.store.showQueueMode)}});var dg=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function mg(){let e=h(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!dg.has(e.toLowerCase())?e:null}function Mo(e){return e?ie(e)?.title??As(e)??(e===b()?mg():null):null}var Hc=`/*
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
`;var qe=x("bloom-recent-"),we="home",pg=50,Nc=140,gg=new Set(["Backquote"]),hg=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),w=p({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),Be=null,pe=[],ge=0,Ui,Uc=[],tr=()=>se()?null:b()??(_o()?we:null);function Gc(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function Yc(e){let t=Mo(e);t&&w.store.titles[e]!==t&&(w.store.titles={...w.store.titles,[e]:t});let o=ys(location.href);o&&e===b()&&w.store.projects[e]!==o&&(w.store.projects={...w.store.projects,[e]:o})}function Fc(e){if(!e)return;let t=[e,...w.store.visits.filter(n=>n!==e)].slice(0,pg),o=new Set(t);w.store.visits=t,Object.keys(w.store.previews).some(n=>!o.has(n))&&(w.store.previews=Gc(w.store.previews,o)),Object.keys(w.store.titles).some(n=>!o.has(n))&&(w.store.titles=Gc(w.store.titles,o)),e!==we&&Yc(e)}function _n(e){if(!e||!w.store.visits.includes(e))return;let t={},o=ie(e)?.chain??[];for(let r of o)t[r.role]=ae(tn(r),Nc);if(e===b())for(let r of Te()){let i=pt(r);i&&(t[r.role]=ae(i,Nc))}let n=w.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(w.store.previews={...w.store.previews,[e]:t})}function bg(){let e=Number(w.store.maxRecent);return w.store.visits.filter(t=>t!==we||w.store.includeHome).slice(0,e)}function Gi(e){if(Lo(),e===tr())return;let t=e===we?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"], [data-sidebar-destination="builtin:home"]'):$t(e)[0];t?t.click():location.assign(e===we?"/":`/c/${e}`)}function Ag(e,t){let o=e===we?"New chat":w.store.titles[e]??Mo(e)??"Untitled chat",n=e===we?null:w.store.projects[e],r=e===we?null:w.store.previews[e];return s("button",{class:qe("item"),attrs:{type:"button",role:"option","aria-selected":String(t===ge)},on:{click:()=>Gi(e),mousemove:()=>t!==ge&&er(t)}},s("div",{class:qe("head")},s("span",{class:`${qe("title")} bloom-truncate`,text:o}),n&&s("span",{class:qe("project"),text:n})),r?.user&&s("div",{class:`${qe("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&s("div",{class:`${qe("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function er(e){ge=(e+pe.length)%pe.length,Be?.querySelectorAll(`.${qe("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===ge)))}function yg(){_n(b());let e=tr();pe=bg(),e&&(pe=[e,...pe.filter(t=>t!==e)].slice(0,Number(w.store.maxRecent))),pe.length&&(ge=pe.length>1?1:0,Be=s("div",{class:`bloom-root ${qe("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:t=>t.target===t.currentTarget&&Lo()}},s("div",{class:qe("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...pe.map(Ag))),document.body.append(Be))}function Lo(){Be?.remove(),Be=null}var vg=e=>gg.has(e.code)||hg.has(e.key);function qg(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&vg(e)){e.preventDefault(),e.stopPropagation(),Be?er(ge+(e.shiftKey?-1:1)):yg();return}if(!Be)return;let o={Escape:Lo,Enter:()=>Gi(pe[ge]),ArrowDown:()=>er(ge+1),ArrowUp:()=>er(ge-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function wg(e){Be&&e.key==="Control"&&Gi(pe[ge])}var Kc=f({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:w,styles:Hc,start(){Ui=new AbortController;let{signal:e}=Ui;addEventListener("keydown",qg,{capture:!0,signal:e}),addEventListener("keyup",wg,{capture:!0,signal:e}),addEventListener("blur",Lo,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&_n(b()),{signal:e}),Uc=[le(({prevId:i})=>{_n(i),Fc(tr())}),Q.on("conversation",({id:i})=>{w.store.visits.includes(i)&&Yc(i),_n(i)})];let{visits:t,titles:o,previews:n}=w.store,r=t.filter(i=>i!==we&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(w.store.visits=t.filter(i=>!r.includes(i))),Fc(tr())},stop(){Ui?.abort();for(let e of Uc)e();Lo()}});var Fi="data:audio/mpeg;base64,SUQzBAAAAAAAIlRTU0UAAAAOAAADTGF2ZjYxLjcuMTAwAAAAAAAAAAAAAAD/+5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABJbmZvAAAADwAAACgAAELvAAwMEhIYGBgfHyUlJSsrMTExODg+Pj5EREpKSlFRV1dXXV1jY2NqanBwcHZ2fHx8g4OJiYmPj5WVlZycoqKiqKiurq61tbu7u8HBx8fHzs7U1NTa2uDg4Ofn7e3t8/P5+fn//wAAAABMYXZjNjEuMTkAAAAAAAAAAAAAAAAkBXwAAAAAAABC75HV3zMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+5BkAAACVRhUHSTABDSjGMCkpAAV+UdIeawACK0LpksSkAAAEhOaEPa6NHqgJgmK0ewQIGLv//sYTJ34iIgmT1iAIEIWAAAQDGCAY0Qff/1gh3+CHKAgCEuCBzggCGCDv1B+CBwoCAIAh/V+UOQ9zXRtyQAmCYrR6ogQIEc5//wIATFaPYIECBATo9UFAIBgwuCAIChg5BwEHbi4f/8HAwsHwDJSk25HiBkEDmrGDRlRGDE44BKOErcpXEmnGLGAUG05WF48gSBebi1am1KjGgveDHroFZEIH+QlCyxGABCC1VCrlYQwcS/xhYcVnMtqxl77WNr5RzmHzZUqg8/U1m/KljFqTC+2AvdPax+xen21StkMqhq/RpPXb/zWWUNT3/RRXmMps9pZ3O9/63///f////ludLKoDcTe+frn/9WK////f//5///9mm3sjJlqb/oAAADADutHY8i2rvky+59Wnn/WFTxDiS2ttrIhnfxrf7Mnb/W//Qd2f//6FQAGgwIA8wGC8yEK82ysYxBF4xNBYtMMgAYMgIWAAMFABRP/+5JkEQ/EsUDLF3aABDKiOMDtPAAQMQUgD2lnyNOKJE2hNZhgBLlJIHAFEFOSmOwiZInTghEAKPAyAMLQgs8QUegDRAHQegDFRXhKYuQc4Vs6AyopETAMtC5SCl1kjKtSZmiaUjYdQ3xkiBEyasgmatRukZJoomSaa2Z3IaTxs6/SQPKqZNu/2Vrut1oFE1DJXgYfkVJ/DUDvkKlToxygu1h75KqdrK18fst/G52dizb96dnVr6AhuiQkgYmYMlRjQESsq4jt+sq7pEgDDAYAnMBcPoxGW9SoBkAgCzAPAmLppEGcIC9AsAAUWMjCR6ZgX+uMmcxYz0SyC6YUBui82kcFEwYCE74kHeVFVLkakhmmB5ICYhyax52KPWdF51FySSw9AfKi67ZzLKVh+Wk1EhSQTzKoOs3TPtlu6qRdXbL//4vdw6Euzej3qgBhvXWL31LDddiITD0UykDG3Wld90OQxTW6DaFlYKlkTE9ntf+HP7XNp+v9uvp/9nM8Mf/0qgAAWpTMLFIjAHD9M9NeQ+ewYYCiFWDIwWaP2luULS7X//uSZBAEQ7AqyJs+yAA2Yojmc08WDBDPKu6YVoDyj+OJx5Wg4votW6k/BszLpY8MCsAl24JWLAZAmadDzPUgiikv9f27mVvKrzP+f+eFXHv5Y5V5rWX813/3/953v8zn7+UsD4SH7Fg4Bj0+nfrYEXu/i/+j+QkfxWsIABAALAJSkwCNArTQceWqi5hKXoOEIaa+WkYu0/NG+pNU2j/q7rLMHW06PyLvCaKu+S57d00yBVGWbrCCoAmCw2HuVlmHwJIlOqoS9iE0wdAqnhtKmG6duLiSrOa+XU9jP8qHkYWWEADDtNT0aVkocilq5lSCXTht3M+ohle26/tQoEKDlSpiK5LXmoNR9+rT/knf///SSpgIVjoAAA/O35oqA1eRICqJxwqCAuL4Ajqy9tbROzs1Nx423n7XVgXYEt8MWxcJBZ1c//qvSo539TP+uojBJFtONfDgGDAvArNG8XwMC7DABEN0LEApdEwRAAHVRgCDvxeH1Y+nPccMHZvd5vRcZXOapV6llhp9mtaZl5p4fLbDiHK91/2b/v/QkHQNF1ytzP/7kmQqAIM8M8q7zDLkQGKIxXdsGg4orRzvaQfBNZSiye2sach/TduWyiQFZ1p72f9v/p1OH6KwIAADgeC4HgAzj6B1TOB4uuDAIOKENDAy0Jth4DZYsh15xnyjOvVb9hc/arPnYNQMmcJBj6VQiIs7txQ7+tQD1gEBQCRkDACTAxACMJQI87Bh3jESAFDgZzAQAnQfBJAEvAL9UaZSFyUUliBCD4bi0JlMr61G123YjK8nLTofOu6U6FQ8JNUwxLgYHTkI2KJURTY8tae2+F/ruHxhYw0PrEqJJQDUuzq8n/1/2qX/1e33gEgA0B+XYMEUHU2PQajZREaKTDSkMfEEJgiiddKBgDBRKEPzCLyfR2jc1WshyM7TPB6cBsf3DsOoGsW13193/9f8Q+b72X/bt8bl3UwaAAxQNpVzZIYAABmBuEQa75oZ+SRhAJhRdPPBUaf8oqOXhUKjRNQxCoDhyD6uUxAsUMEkExhQ7BKIFFbF8wHObTZGk6KlOgtmbZS1mKVkfrbsyVMuFRuxoUJNgClF3+M/9tFSPd6QgJBm0Bj/+5JkNYjjLCtJU9po8EpCiKFj3AANkKkctemAAVYK4oa88AAzAGm38T4amApEPwIXwaDU4zABeOSJUIEDrq7YrEU/4AoG8tzdHHYu79vCgxYK4jXIelk9Z5lAh0QFDhi1z7RTyVQCfFoGwYKAHBgoA4GCySObCToBhuB6GH8FYYKwBiDac4NBVMJwEgwFgBAcAACAE0GYHa2TADEPMiKF6MYQQk0z6I5YQAJgAtw5wohOGJdLYyRxSFNaVt6JfZJkj6zhiTCK0ldddkK7pJGDFakCsbvQYIYFZgcg3mBaLYauqEJhFg9mEaDWYD4M40DWCQCACDAYrIIZgSgEpFhcAuk9Q9MxLq08IkROyHRGrAsSovgGgl/JNHXBkwZ9DTBXeMt7M7S9RH/3KgABEnU2I3M4QslnQ2IxYBCQAWZIRki0OwYtGJmRuAFQk3Rk5ZxEysYxETRoWcE/kMAjEA4JqLPD8hHgb+HIBYaI6DCwYwFKC5xcAaAAcAG4BgAfghIACsyAHDEnyuXBZAuQcAAyw29YuYCpADmBv08/FjHAeTLj//uSZDuABgFfVn5mYAZeQ8nPzeAAEFVDQv24ABjKCKcrtCACBaMZBxQcsTIof+mLgJxB0GNg1aTtSSf/GYPG4lAiDEXIuT5RFtLQ6xYTXO//FwGpuQQnGLhcNEkC2gZMnZJzEx/////LpV35BIAAAMSEgFAFAHA5AYDAAABCpmriAUWTRBIACILOJ9EB1UOqtJbJMxgZZIeHJZDLiSGVxvLsceQGatzl3/48UPTuuZUlh5u3avf/n09vOWWPxoYveNZm9/4fy38+X70iAAABTgkDNgoMma5hlh7HkhU1WctaVO0ZgT6rlDAG7D5AjU6WSKmpdMWWuYmBEwFEZE1JoixZFygWRJjUomiR+s9MiLFYZ4MTOkklr+pL9aJ5NZDieSSfbX60S6fKJGC5SqyJdJ1zEZUgpdZfSNkkknZnRWYmqLf0kkkkaq/60WWYiAHAIAASQttRwClAL1AQVK1iD3KbK2FAWzjc1ayz1qt/Zop9AY/Ev/3Ld/2dn//7nf/WigACVKC4g0AZgoFxtJBp4GCQYR5gYAiCyYsJIQCd9bKCjP/7kmQQgAQEUEwbuVLyQmW6GmWCXs3A11WsMRaxUZapKYGLRoHCeFBxh8NxqjmYhGIfZ3GLHI9K3FVBUmH5l8PuEBYF1XpE8C35fbzpd297pQFRQcyZqnuYkbaqujD4uPntPWo8MMbmJNBeAiJznaitZm866XOYo6M3a3/RHnGu6tlARAIUwI2wAJukeM07FeWJrnY4utwO9YJBMcY695mbk8GgAgHDP5pSl5mW7+w4URzEcQyef3m6whG7EO+hG///Di24AQByOSVq1tyBD5oM+J6OzIrmzlijmFDVDlg29hl+Xga7Enennmq1rSJqEpUry1HRTlT6iNLZv60dA3NKlwtB8IxKPgiZdgaZtZ7a71HT0B0dfH9fJTz/Mr4rKqvzKs0BboqjxIO9cFaukq4l/SSWggs5GbIQFDnw2FRXvzFiZtQN2ck8u1Mw7Td+mtZ1alDamW6qWzFPTZbpsu/zKVQNZBSk5SzKsK7EwmbV3RVu1Utq8DYYCHKvvuYD/KAhDv/+6v+GqgBqACAJEIDBgRAwmt8NsaOx4Jg6AqGASBP/+5JkDIwDpDVJE9pCcEVDKRFzLyYOwNccL2BtgSWP5SnMoKCXFAwCQOACAzd1hHRAyhQLb4Bw+afiC1VY1DUqLzPdXkMuh5ASBjkszis1hFXBTdbNK7U0C49Md1UtLTfMDaul+ueOqQ0dZk8vvs92yb84kHDSZJIPFCTWKRiGgKCyaL4JBQPqZrWHEoLYcW8JjBGCfRj8gxQjSyOJOFe8gXPt42q21IC5g1wJaC3K95Z7GFuZoI3UZbOtzt9YIlvxreJfsBAwAwHDAsALIQnDlHKRPH8MMBGDGDMA+YB4EAhAfQfMFMC5BYqhiiQDK3ZwveazOCuGfLyQM8UZfScq09lp6wxijLJFdmZxUcaYixeYlcbhUzWp6fWe+aNKesRFI+G079hiCCmANUPW5ckyoQCFGkFn/+V//6kESAAFbd+QzQiLATNzIAb7IkPAaO0VAGpUKGwgUqHtpRLKr4MZIct41ZJccIwYXo2z1jfh57r/1i/mShMb+mf/1C3/7v+////3VUAD4Acl13U3FgFEQTnJB4HBUbGEgTrDKHJWMREp//uSZA6Ag0U1y1O5GnBOAykad0woDQzXIE9sqcE0DOMBnuxAJ0Q7pq4PszEoMo5iWsDofsQ3zndP561rXcPxqYs8cS9zZIAAwQiFT6vZsW8yJewiZ8BVj1n/tfeoCYeDhTHGLERLehWPCav/6jH/QAABABTCFrSAwFmumcYKnCrAmF4EAQyOhwoFesS3QoLZhbfjLnrYLHfhR52WFH9ezzIHX5TfqZe2ip16T8r3+oSbrbwG7/9n//9X2f0/WAsgGAeBKBgTTA1B+Mjc9U2eESzDWBMMBsBWTmASAICgAjBg+cBkWNCDozDBI2ryne5qzzXJHeubuwBem0RIpblungg1SCm7EYnCJsUOJwBIOpLXQg4qGzClLmqUyi7XR2yUNaezo3GnGNAdGZGpivHuebGKIehwiPBwNShCGmeDjUADzC285Tuw0UBbz17y25RK5DBcv7cqPvXTOp+2+YPrK3JUnGJZu9hcqw1fDlNXr1pT/+0AAjABFKwBwBUGgCGAEDSYcpXBo2hemEKAUPWl30BajRWPNDGLnVpuIsy5TWmtSv/7kmQXgJLhNkrT2SlgS6UZB3dIKgvM0SlO5WVJRIyiwY7sCKIZw2xyw1AUrqYQERMMAadR27rq6kV0ZHV009t5RBJlftT3o7HdSnUUqLb29QBAA4AACAGGalkjMQ6z4gFSIzQUWCoQwoldxihrYhTkDm0rkspaVDUvsO7kiJPxMBKDiyriRgbAJCFuNrjHT/+3NwNv+GeJvmblRRgBwIAFkgASjC4JmAQ3HDWcm11oGCgejqzSy9hclhyvBysaLkMugxT0bmqzVUCxMtd9julVGZiBMKYBQ7Ys2OTD3f/SKqTWvKIPVPna4q/ceV4ue3XP8XudVOaSFKirGaRggFx3N17aPq9zMYxOMMCAMZmcCqFAGfi2wJ3hoif1/okVg0tuwwuaWVpNHZfS7rTLdcaTC3Mzi32fqBvHnapZbnS0EtIlTStWzuB539FrFWAIglEQ7LAAmOVAAYFCZ0GNH9ISYwAiWSPAQGki04MSoB2r5HZWF/WfHTDpHfP2Tk/F17NVtU5DVXlLKXOrFO/soczOo7HeyF2TWAwxrm6+nHLt3Gv/+5JkKoGSvijM64wbalEFGPd1hWoKrNFNrSxv8TwUIwnttLDtfWwEEBwASLCF3RIHDNZAzoV2DEsITAYICECyQHIuiQ1gdHBrsTuBQD5P25TUudb57Y1NrrKdDQUjg9ZjAzYXf9DdtMiaWs5ho///////0f/1f6YA75JY3NW9CCUOjUg6IFoScLTwQFTQMYPR2JBqbNn4m6xJdBOOEsnqU6dZUOfMQqTTEJVua9S0/528Pdcksjtm5VSRuvqTxJKnOfXkWP/JNllFEpbVAGlWBgTTAlAWMOMRM1kgjAUKaZeIBiwYyXqrFxXIAs8HDFuKT63qO/LXsprF7BA0WxwYUIdzSswMRPxKhOEDcwNTY6okOnv/6bT3ZlsamioAgWlskB9oZRuPNbzGZxN2CGUv068BUsSlUlL/q/QCOE3FoTaOGtB2XKfJxH3mtQCAQdFYSAEh1H07E4QgHSkZY/FLPwe7kNug1VrzNUry9hVCjNBIAjIcFIkKbuA+Mal0mn6RSFfXoSEF4CDFUov18p3ZMNOYePBzVnjcB5eFGEhqrY0q//uSREKABEo5zUtiZw5+xzljcwhuStzRMa49q4mOnGZpyIsJqZZbOQAV2gALgZGUKjA8TazKnAHBGQAYv7F2SLDq7IAmRAprCJivILYI2NTeXw5H3XmIpMSyvL4bRPTrfBdEFOI9aRa92h17dS/UvU9yMVY3QMPO7VLi0jHGHyJ2JbGKWfqUWfGiv1FKLhQHwXsZOlJXv1wLsHALBzvowcAKCIWfCPMAACIkACZ4AUzPh0Dm6k0cQPIkFF3wQqaDWAPnMc5unIuWFigsLBqLG3jG6wG4mJYab3Iqm0kLRq2bb7pIAAmB3HWel+oyqu1jhipAxNf/+kay+UeJrbACQBBCVcAOE4A6FTby+P6JkFEwaAatjJ5VH2vEgBURiS1o86VJTV53C13lazcta9mLqy25ecJl0dVpi85jnbRpHS6WQMUNtHaZGyLJUtz6X0DB3ChhX//dgokDDOUBQpAICFRaAAKNSAL2+AFNoQAIZ1lycNmaYXgAXxVuaLEnLhtQ0iBOlaBFX8PJBwHAGtCPeo8HG57ceLAZKi5YQom0Pflfe//7kmQgAQKeJ8vrpkOyT+Z5TXHlagqg0S+uME3BHIzotPwwLty6Dq6+dfxh9YlA3msgt9fRPP50AAgKABl7MAUrPVdAEgniHEYcAbJ0/VU5lksgGQITAX7NRbmdtRKd3TFKR99/t5bWKsbuGDlRb1TuY5CW6lAUc/7dDs2ujyiLbnOqk0rbqKsACFIkLfIlKCp6mAGMa5lgBBbIGXskc13nGhkoB1A6Erhi1cu+juWjG1aRwm9WttjBkNRQ1hOprvrtnNy3U+mwI/aZ55pkbmEsrIVuFcyc+V2cd9NcAjkksb1kAAH6N6uiYdIxhAW3aLU7T2QkgibDglmwDSdrJcfoIQX40quwJTt61+XuKSq5iuFp0fYVXj4nUem1hEJPrUqm2AYAMRABLEACYAcBAEmAOCIYzxW5pfBXiQjg0B8qUtNF3kdtR4mBKliOaFfG1IdkadwVuvCkYE6kpPW8Q+ZjGIZbGFkrdXxwd6jZqxDrVh1zLYlNCxIIW13hRaZIAAABQACwIQJmJBF+TLMNgHZYsWwQDBcZPb2vWiQABoNKa7L/+5JkPwCC1ihI089bUEmkCQ11gmoKnHMfLHXhSUGMoondPJhytvQJxigg2K33nlMBRjZdnHdZRtLtYmb6k1aGcx+bb/1f////8iAAQAP4AQTC9CoQ55X/h/jZ5jaIwCAWXI3tPSrdJEIaGukOhUpmVYgI9xcIsbEei6jNh8rq+p2xyVoOE5cagTQn33v7rqbT8YtxXB3lbDAJ4b70+r9AgARgHhwEwKFRo9H53J2higLoBeIbmKCqwB0lgoXKD9GQtjkG9dkaiW9uaXn+pzjXBvQ3PcOKZTSIMa2fmbF6zRciZY82S/Lf+S///////30BgAcYDDTzAEDTCIVD37DTunBjGUQzBIGESi2CzKy/GeEQ17PT8vJUJ4gzA6kvTj6wngGeVnlGCKJINiIqzACra0lIDvKpLhQLTKAbD87e1Vh7///6wFIBDAwBgAjATAJC4yhqqF6mE4CERSzBBYYcYxYFi4wME8OEJJmA7gtxPmOR3G1W8rTOhsOPPd5AV5XPY20FrzleZ/U2j/b0ADEAApGwAiMTAAlAN5mWhaGj0B2T//uSZFkAwqodx7usE1BH4siie08mCoyfIU9kqcE9i6JJz2hACUDQHZbxV6mQcDfKow+FGnWf2e1T2qbXbPM+a5GqryfnfwtVp9R+V50OYFMzJShTs6zKIoZ1LY/SYgcBa/9OkCABEgyAQYYgEJnOMG4WMmYcIDgZRS1jT7mfBPMu4f415PIVuzVWwvP92q1q/9uHcVJW8a2ohG7ywDbQ9Vysijz6hCWlyZV5L7P//////9YMwCkAACEkwNBIwmFU+WcQ67pcxVDowEAdEdIlfBftWsZAQWD6q/RErOoE+zNr6LE3nOlCeCGZmeyS3T5VfElgFFysze4uuZWRH2Y79kcWD7BIqCyjAIFSUNjFWJzYD8jBYXSECC3icCDoKEx1UvyIzIeHBKBR5JUKUne7NZQyIxhuBdaB2EdaVjtUrwoWFgNc+xzPi9X9myz3f2gGNAACECBwEwuMh+nd56jdBiSHoIAggBFORgiazJx0BBYQrr9dFwZW6Oxw4Hff7q7mQlvvEmYzhSY2EIa5o6EFDmXJjAibpAAFXO47IfxVgrbAAv/7kmR3gAKFKMe7rytQSwLoknUvaApAoRxuvG1JHIrjadykmADABpuNs9UgJAOZbE8euMKYvAgY4ogEa8uZiM2skrqkyWhRtVxMYN7mbK2DaVT/ggOik1AwxndWV19fX/17vYj///2evjYBAFIAj8WwBINpn4HNG0cDiYZQAxgTgAgYCRRFgKEDXxAYTxxiItYVy/8LhuQS+3Wprk7VmYEdi7cprV2Q1ZYXnZrnOxYPocyTzWdaO+YzapZW3mlg82sgCF1YgP7/7spa0tEyaKjp5XDhMul+1QtKVd0SEH1owaADOdpwRKKZw6q4My8j2XI0bLm/pbu1t6f/q2//oDgBbdodEAnHCOfn0+FmLYaGAQBgUCF4KmDgHlJCARQN8Gv45Y0Au+cz5ictPtRMK0qCTp6SWWytJeQVDmSIuxcZD/mx9+qpFlXU/65BFAAQACCko1EBUAwYERoEcpghSRUDkLAh0OvBlKVERLBcPgxSbutTOYHWMbvMP9KMvOoc7OLGgJCI00DUx9XXuyf/+rVv9wy3/Z20f/RVAAgAAVkADBT/+5JknAECuChGM9k6cD3BqU1yaVAJxJ8YzrxtQTELIundMKBwKDmaQ4Idm1EYihOLEAZNK1ihMfKiqgR9Q2ytIdjCsMNbV8JCGe63XxlpuLiHXZTssct5YmNhY4ff71eJ9Me2wXg9bUk31G6BnGbZpr436evxiOkBhBQLQAAN0SURieH5xQaYGFwiOggfqH1euIm2TkjE5WYAWoioifQz9yT9irDCVWSHWyooWD4a5PKrHjek9JwCBCFoByoiYZju0AahIDkYlrrIYjodG90enmQMhxQlAFo8qVrRSQkKOw8CUrgOxFcZTlnz6+f/3fuwH0d8u/w6RLM1r4svlrVTCvHFGsSINUpHLHga////9n/I//9AQARAAAUrQKAAAC0wCW48RRUxXA4iaKgRIf8MGwUlKUwcIvVaia245ap8xPmtaMa7VpcWWSWMhx/C+cGetrfWPmvtBHpQ1QxAah0X//////////1KAG1AHw8GAFIAMMCRfPu8gO9ZTMPwwBABoyJ95oIYMEQKDwdKOj2tKJy8fFSJddr+lx1cBiXIvbLJ//uSZMMAAuAoxtO5eUBJo+j6dwwoSmB3IU6x7YFPDuLd3DygCHkdI2Kigk2M2tQ3+ETGZ0j/+1kGZ////+z9nrYAqgcMgaSi4ZPVyYr5IFxBJGgqKWgVynZYJVxNmAzlOlCme6hkiq/OX+qQ08wva0hx3qGQA0WZY3EZ8wSD2inVR9P3d6t3//+/6KaQKgGJyNuyBQBMKAeP8IJOV5mMUQnMDAORqUi1BGJ0EOQ0BU41LZ9MaYfR4mY0R3nf0sCVgavSsq8uUJxNFIB9NJG2qIVD1a7Pdbvu/1erXExv+3/6P9LhYCEUVmL8GBoWmc7PH1zMmOQECZzcFv2+FqwcMtK6VIBFOFja1a2uWkqzMFzAFzBa9V5+hSFAv91l4hygw20MAvR1adun9X9yUf1+n/6f/7YEBvgoCYwJgFzCHBIOFsXE4/AwQ4okHBjAYCyWl5TKQb8RzETd5kbws9pIkyFvZXl9rCpepHfiRugwI/tDcoY2pWHDv/TxmccBASKr3LNDLDMRD69oOvX3+QdEVFWuz0o5Vc27K6G/Y+a7kG+fSP/7kmTbgMKsKEbLrBtQTAMIcXcvJgsAgRruvE1BPQuiCdwwmO6iCYRgwAZrQFZ9+npjmBgR2TKbqmBy4MHZj4Z2MwJ1tbVPqzp7WmLwV+EG4yXgzV749kdCzLqCEdTb7qd733p8Vmmp/1F67PryOaV9CvUn932ACBlWjGLNmIwTAszW6QuM+E28wgQWDdUtepugCLOo1BQyQcDQG0KLNyi9PBV2nn6OmpKlhpCeqGVPO02VqUNZSAh6BNTVPbpb/467jasNJHOSxSYs6vv+7R1p//L/+53SPX2bGp6jNYEAgBMBQUNyTZMH4+GAlZgOAizel1oSKXGq34DA4RI8t8ajah5ww3Vw33lqQa2TI3nl5wwslFVopdo7dSNX7v2fqLf/60f6qkx9GyoBKaBsA5iYCYehqFsBmhKf4YNIMpkgIOsLRMGrOAQaWvD0gb63N5z7rym3fxtdymIzBqAGzen9RJ/XcJcL9llixLqcLPPFjhhCruzfa1Kt+Y/30O/3GcU463uORPX7fpckCmqZCyAlBM1iJQ58Psw2AIuGo8wGXJf/+5Jk9gDDbR/Dq9kacFLC+HF3DyYMxG8SzPsAQTMLIcXcPJgSIdAtOGjCEEzEp+0zvuSEtxLrT0+ospGU+CRE6Y2CrF2++h3uo/lGUhRH03eLx2vt3opL6apm3rHRQgoGCaMGaU0wB3vCWmL8Ake9iaRcRFgKDMwOXmMOhCGdtJGhRUoHvVNALtw67k9ffrCdXUyMEAICl9ijdtEZZYjSkwyCYds0dTLO9lUz7TAqeKODBwFQsYUKhMq5qRatSmRC86uOXpvDuEm8i776xX51hT7dOoIGq6SNgZKg0LFc5VLsDDUW9LhqWTbX5YSNVBNPoTTPnjWx539Nny+c7/0sreAYbAmwNpVLpvv6s0tC6LCBUS/2PKopKJlpOHEkeRvv4kuQMqqdTEFNRTMuMTAwVVVVVVVVJNBQsuYJAexkSNemvmmyYZINR3ZmSYpuhOOhUdBmhaZnDjtWdmmeuWSyWQzGNv7lVyU4a6FCvZKr1u2xBsa6FYX+lt2nnChUFyL1RVLpFKGtFzDBYdngApP5ZHmPf33MfANTH4HWKsZ9QlaY//uSZPsMQwYXxBM+wBBPwqiSdM9mDvhvCA17QEFKiqJZ3DCYejhDuBFkV8qHkoBmXxAGGkPDAQqyEoU+82vTpYypZSn5eNLwaoZpuMdl+Hscu7uZocgOPwVSB2i7zfS0qHIX6dOtOgg4kk1iB1y2k9feAlaf+9+5typj1MUkEQEV8y5vDAkSz4/Pj125jFUMwxhnWj60xLt+EXkx2WsymFXFYm1OPoMlMxdSTn+PU47gVbFauxynjH1SGJzm0CpI2Mev9qfXT26rS7QG+4wHWH2ZTchjlVjXmRSn3N9iZsAERm7jqzWTGMVHE8soQ4YLfYBDcfTYiiictvNAKG/Rn+zB3MXdpnrYQoeXJBohdy2u1bKuQ7//0VtdZo//3e//UkxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqi2xtRmA0FkdVTUZ3vAhmLIAyTqzDDQoYBwOB6UdbNq30URXVsT3it1pNmUP5MbnZ2PsnZwGBbrXn1xgxxlOhgm1iLYUlN9qlqbufyroFEwXtKJtUXAdriSJhCFJdP/7kmT1AAN+F8KL2cEAVgKoYncMJgwwXRLO4eTBBYri5cGxmOphx12xySy0o+PknoOoKpegyXSK1pVkKntYwSrJEAiKWqAgbmibMHyaNmMoIE0TGRHhW5YOkLFVNZS9ZSI04w1a279PPvDuYsUuI13jt0KY2W+H1Z0PKGPe9707FoP5SlCyyv91jdlv9Wuz9nX/06VmgAg2VWhWkkk8LIAKB5yKfRqOjZgOBCqoqATrPnEX/Q8ZBGX1VhX71V7tlfbruCyiQGo7nxqtKAwguObpsHlBgXuke79f/5Lq6P9rp7++7/6aAIFVT//3ghtbBs02YhoJSqoIc6GxGtJ+0mhyAV6jMu9RBAV5eYYKMH13o09je6y76+/9+jf//3fot0UWTIHI1zCcBhOkoJU2V1QjEBB3MEgE4iAzOEUVFUEWir5CQhgkIoATLwjMFPA88Bxifor/c5KQqAY5C/ktvyqMrAHlrWJbOXJ3lDh3HW9VN0+OH9+mxhEDivExdiQVQSAxFL0rmlgBzVGlqvoYVLjzK0WzZbRHmkj2ixcXMOB++eX/+5Jk7YAD0RxBgz7QEFQjCFF3DyYKIGEfrr0tIOmKoyWxlYiPQSYTBVyUAAaqG3dx6BEVzL5iO1I0MHC/21fefcyyQAmBoFqx+BqMADR5xOokEJ7eVNYyIIRCqQrS7/xjf7NH/pWrYdR19/6Uf9Vl/WExKmsBw2YLoWxq0ndmyoCUYawBJ+mBGKji+VhmTihSmMtbZudaagmN17dmP2dzd6Jym2oE/czfp5+ISxdsO5SW/U3qnsDzwTcUPlB0We259TvZmCan+QJkFzmw3WVM2e1tBwj0K2uamxbhtFeuxFmoSjAoGTLoijtM9zEsBiICUji+0vJWqAJky3DbtDLRbMO3b/4l+NLxMaX3JJGUwhUr3+9SdEDPD7Sy8X/t/u/Z6U6qvZ93/p8t6jMJzS7DBOGxNjCTw0gVuTCvCqNLtkpwihwSji/xA4mCt+PI7IQvRBDau098BUMzJZJqWPqvlc8xLoVFITGFFHTfaLRqNTf279VodNhoiWYI5WgMn1FR7FiSOF72k6FitYlWD6WCzjtSl28oDD2ZkDgKkm58YlKl//uSZP+MhEEgQYs+wCBGQpi5cGl0DaxlDEx7IEExDmGF14k4PQwIlrTc0VEigAgrVTxJokIQM/scyXRBGEVgK0cgCRZLZr7hAM65XcXpW5Vha4rtRiGA0V1xd7r9+/X0iYtTX6Sm1us8phkiilQlvT5pFl7bEPr3eKdJDiIIwbzAaDmMcNlU0fzaDCLBXDgJCqAKhikzB6hKOiPDLnRia91pgRRcpU4+5pyXk5KBoZvQ+dPNIZiuffiWOhQaJQpr1NtlGpvNetpFtDmcpoeR1vqFj3dJLA6RZCnLTl5uQ2G1uf9b+skBomdZOHnB1mJgCA4D3labQssh9HV9qYPBsTpTaazIM1Prokg3mTpy6JZvnmecqWrU9ydYr02SG+lfRZX9/aYq/6Ltul6dW0yqi56sYLYgZlBvUHHoCwBiMDqsTJBC/xaVUypgAGXlK2b4L5lrMIBgOGH5pZyp21NWE9GCuv2bmJfKWQAoPFXmt2sqTSeLDdX+5jLl7OtFatrX3tiyr9Fi9ODe17HJ9SMWccZo6+teH6NMeNbc9nS/NXt/3v/7kmT6jIQCGUEDXsgQTWKohnDIYg0gYQos+YGBKgrhQb6kYN/6dvyd8KVxey4EiIJ/d8MyRroGGxyU/hgiLwsrgCLTNI8MawEqNie/BQA0iKMhInPO9v06P1s+7X16f9F7vbv8WehVTL3uBdB0YKgQRrsLKmgmkiYVYKxyQmyQhPVjQhb8cOUAV9LG5JyPAy14nevS/CQxPC/L4Ahpbr2R6fp56EOCr13pPHqu5y12rmYJZ+f/WYtMo+eNKgZTwP/xP+irfkNZO3bX9up+fd72sg461udhumuhft3f/sjuWvnp4toXoFxspJKtAayBgfNB2kG3YfftV7pY8dHiEAgIgxFs3zqya07O0YNgNJIz27+d7+jq6Vf/d/1J/3L9aUf9umoOyEAR1DAtARNqs5I0VzwjBvBJMA4BIwBwEwgBFImHWqJPFwLKul+l0W5NMiu67jPsxHjy55NbRDgYY0OfhzRkth9WQhf8c/0LK9er5VX8rJJ2tmTvTB/ck9fNrPbt6meeZa/M6X7W/qx8Mvh/szsVyyI3mdk8iJyuUyf8obb/+5Bk+I9D5xhBAx7QEj0iGLlwI2YPcGMECHsgSPMK4p2xMZj/g+yrr0Asqt2EKjMPDc/sow4sJsqUYIJwlE0nS8jW01t0vHvmmG098qDotoLWnZmvcHcTs8mheLfVxXts1XLR/tU25+KV1b0UaDYEFxEzTAmAAOBA0s2uhDwwWk4UEGTLASvT6b0tQjIySAVhhI9HphFKlUu8RYjDWh6m+Ima6hWI78ehvBWEsxHezRK7z/8zkd253LarCLl+1g3Lf6tl15V4r/+t5NZ1FuWGT7+8T5HDaWCPft37dfqY9SEjtQ1P9ufIuda/GVNWLAQBmH5UcXneYdgYogqYgGIIjkKQHE1SvDdJelMdr/b/Oxbv/204FmrG2O0t766LNlMlQdveTfKI16mjvtTbpTu++znkFGxAtf3GakwA8zVUyiAzAPAkNFMQo5FYkwjBYnhAh/ulAj1AIKi19dm9HQwzKt+H88ePD6bN8Itlh3o2LC+PM8VLJSa0UQrFnvAy1HIWADxhRjHFzixS5qTZo0UrF9trYYIpawWqWk814/F7xoj/+5Jk/YzEHWbBi88bwkVCuHJxiDYPpG8EL2XlCTUK4QHOsEigACDplQUvm+HnCyGyRMccCQrMzatKMCg0B4CTl5UIz3ilGO4E7YYxlAynLaj/EXOG1n7UkMQy3hJQaNXxe7u921Uz0o2ye17H2dtKP96Pu2NR/15sKIVslT6MGAVPmCsNgWEMLQJBgBTyQC6rdEyhK2NCCKkxb1aVQ57wwnAkyH6xJO2NrxSrE+tyAGFhYoqMLUCEegePABhYgFBi0ihckPQAZCOm8kXG1Bg+meqaPYOYtUvS8ahEja4Yl2ZYdSLIR5VcYw18lNhz4ViwoCQxJaLHqD4vlF2rVHD39GCAfVJwtA9Z1HNWA6+1xnSL2/2dbWWq/dzPR/29f/YuIghAMMAgCcwYQ5jYLTNAWTphqAEjwP4kCCqkrlsCzQqgKGQDyheCqLsuhOOZMxiP4w/Vp5I/hfcOY+ssjeecORcAjUIuzted5btXd0+t8KLb6FWM6UCk9PL1l7o7TQlYwYZatNLqq6OxphLTFQyoJIbRbOakiwjSnIVSfHkbI1lu//uSZPIBw5MYQzPdeIBIYrhAcekmDYhdDM6Z7IDvCqIJxaCISVdekTndDiZZQFpsNxri7GUVAY67Yq5Swhk4onCVaEBZlrdIvZnc6F9qZQIWsrM2zbS2Btjmw5zjAJMML91EW1xd1X01RG9IXscUr7HoX1X28t7rn0JfdoZY9ymLL0ALCuDAghzjLyDc11zDEKjAIE0DZKxNqLLwrGLwkk1IVWBPXUPaR1tKEO4MQG4/RrjWwGXW/x0GBGxpMeqKipU6Pv6TxpIDLGQUHBsoc7TCQiWJLYtKgIkJkhhBj6lt6yEzwvGANr1AQeOA73NvhZqdS10jgyI5+kLxkiQIoHMHQ1cKRSvNx8fjwLBs11d0oNschL9D8qlITUmKtIezPbx4vff4kIrVTaiVf67zWdQ8ov2MemsRhQQllMAQOQweU5zKvJiMDUC8mgJHSETBhDchgYWC61qyyymsx6vTwin19aVWqdmQsCVT89VqQ5GFTxC5W7l9ulk9HuNq6V/76a9Bqr+Dan/eou1lelJLr7WgY+wVYg673ft8dFqdyJ5m5f/7kmT/jMSoY0AL2BrySQKYYXBrZg3gXQgsdYEBHAqhybSgmN22hWmvq2svZl/Pkf2NFWAEUZYbUTbrYvUa4OhK6ogBZDn1CoT7Ipkmf/OsDCnVyjtnr33/edK7+x/5nV6nIQ3f+pNnWv/u+oWA5MAoBYwTQvzONXkNSYQMOFdMBkAkdAUWcuYhqdBSqUYyGhJgvT/U+32HSPbJ4zjITcEaCLbnsli/HYd4NUf0jUxCAjKOzaZHFrI7uaQkeYdSJ2jLmp552Q7Ry39+tkkpUnUyctCZqDRWIvdsh8VA37+VyNCnigfGxcrZnwgSa1aUop385SXBnJXyMhMIUywo00tjj/HEmRvq+wJ6b6fUYBWuptvTrf7kIFh87WPkr7JWR3J/6dnkGevRjOytn2dXxo1CORp6qkaSgBcwQAZDUEO7MicYMwSwCBoCEwCwABUAIwAQEGHypIBSIxrL4CvclawoUhrXiLC/Z4hAi/Ihqa2JqXCQFmiqKMuruoufT4vzvG2zu69rFSKfVyOHzPhf5MFhRZpe5Mp6Opii17g6c8+LJxT/+5Jk9IwD1hhBCz7AEjiCGLptIyYSDaD+DzxpyN6KogmzKOC5ZTEThVSrqueh338iPWwuZU3aunbDH4TXSz+CQ+KCoQ14u104gIOjZg4HfyB3DEYJHEiqqWd7ZluMIKu75yhZQ2w+OM9M10VehP7/TsLVkBUGLgLQl2nuyLuncKdEWWRcisJgOgNGoOQ4Yl4vQJAFFAClL0e2RLrfCErPbWKLRddr0EPzG6K5925NfUcSCGPQ5MYWbETl4iADaBfmrlmtTayz/fcKf0wnPAaCNw5gLIMnHJbIxnp41DGQ5EnUoRLyeRjCA51bM5h4UW4MrdK0qP9oXuOhyEb8G45tLgAICnEkkq1lpRo24DsL9i1wWpHGJXpdjH/ZCX0aAmlaSQylL5juRfs/Q9tmXV9Xr37X/+6Lf6OiIMeAIEYAhgHATmnIG2ZEwUYYBoW6j8mTtL1MLGgDjLoex+nIZhuMLZJSPiFSrU2DlJUxtU/2qlnbPFvlEcjik4/oUJ/I083nGVtiU617SIm9/p2WmXyGkmaecZav76QHe5t9YvOqt0Iq//uSZPWNhFljQAPPGvJBQqhibMU4D8FxAi8EW0jdimK1oZTg5x11q9BxhryoK5tlLSi+xMCWtJmgMEYYeMm6e0Rgpopn08DWVaShbnxJJ43oqyHO7d+cW6q1XUM9rzNqgk0DtuOHC/u+dv/ey+KofvpvS269LdKLdvv+ubXYZGgEEdTAdBMNKsJkyEwrysBsQgDJ0KuTXLmNySoUR0p03GU8EiyRlc68CS821EqREF07UrMylekwUyHpGPUZ2Mjm5eskc+7UsoRyz/znPS0JUhlJS95kmORBzuXLl+b82LuvHPtiQ3qzna2lekq1lqhkrpEs97K5J5FZD56GRT9Cw1Kgs2Ze8BksicydJngEC5QKE7osJMdzKs9088WO61WA4tOJZcjxSxXZ+MTtFam1VVIRp/XY79+xj4xYu7YCSOSoq0tSo0YCBudgKEYuIAKgGyJ1HpdEah7oaP5OrKuOxguo4XzFljR/RRhLBCXcJgi6UylbnTl+46p/sbOxn1/ldDrFoC6UlzWr8/5kRfm+UzJpTY5Fc65Ww14dJTQ1tJyqSv/7kmTzjKQfZsCLzxriP+KYYW0iJhBdqQAPPGuI/YphlbSUmH/L+532vt4PiUWbskFO9VW8NLDEriBSTIVsBAan7/pqPjmQfxByQTtLxqjZQ4dRfeUbOi6zXs6+zb/1qsqQ3UuP/f//6PV8YFCFpVAUGioczx6bsHiYNAIj+hChOloJcuRdhF45vo0lLFCTzOsPp41axY6oLkAxJZWx4lFRGJGlnnhDUzjF2UoYpJ5eNI8OTPGM/eKTLDedKITqsaGqgu/nfI06l1YX1WY/PLUoDg06StlkUK1TUl/I3HQd78Fb0O5e6KpIQ0nrqdwQIg/7IDQs00lbWNEXcVZBhNo7H6FY65Kqc37lBQSjxCSCDKDJVj3ip0Ay+5byzS4CUoXpTWtVJJ4pKKLh1xr1kKpjJITFYSqsQ5+Hb00uaMCSAKfH3wEFWb+vmgMaIAeZuhB9ZGLByQtKFJCrEAWI5ojSia0fUbqqUTOBRvw7RguBR9hWe9gEWJGCd6DqR90m6MhgEFq0k3ECmPfQPCREmEBKquLicW3WEUg0J1NYx0HWuZb/+5Jk74wD1lhBC68aci3hOLkHJgIQTWMALrxpyVeIYMW0rOAKu1xdxG+vDjMzb4wyc8gsWggKIxI2yBIcRpO0/sURGO8WCjpk/HlHNGZO8mghZeqW0NRQuryWgZc+9b2XLWxLc7FjO9Sfm7VpJZDYSyKAIABkBRAKxipf5rExxgwEK6VM1CURB4EIKISJ8qDzXTi/QqlmHNIGYLYdZZA5VNp/RMKNGhgBdRmGUGTCtMKLWuSqaoGNxggxmFJ2Dx4MKXSMmFdNR5Lcijd+g09YOsNCRvJxDwq2YOkTUoONsWPj0A9SRAVsa9HyGCrejufBWBjD9BLfkqxy2xlW+/3K4weh+bYO8sT2BoJJrMeo31GN+47hD5AQiwALxZ3QzTMUwxW9ArXcte5FAQXopSKb63zG92wEL+yrejI98ioAPTSsX5RAKoNNd7I2AzQUBFB4w+sld+LQRTPanQYxAbPrfTVoUS8lRpPpdPHnDiWmWYtNO8UmQIjn336klIPFRuogVaQXtA0d8vO776HkD9eo9DJ3A1P/PV59H6TP70YPLfdx//uSZO4AwyAYQ8ubSJBF4phAbMMoEa1ZAE68ackAiGGFowjg4CU/XtXdoCKW3VlrtnfnwctusWFDCcUed3MGzCzjvnqziwWzc2zWNU8fYtZ/uF49Q801nASmpKvnB1N1Iylo5jP2uDtdxKo1S1aliZuaZYeT4tpcOQ9Tqw4gHCgoOoX08uAhYhIDE85TaA0JQcAXLCG4Lzw+W2ybZn7EYlAm728tIigLTZejgtgmf7kRK6x66bjBoJ02CMO4jKOxT4xj3jliUwcqMxjlfVKZAzMqfOeadzNv1o/arsL09otJKnliaa/r6/AFNkDpF8zrdqEx83J4EOKEC2kWUkFGOY4HOKWY7za+Mo6EIBCBmljQ3KasluK1P3LS7IKJFWiYWUlTmvSWlIkdY4VSxezqCDN5JYqxI3xSxhumQAHACyYeDI6JW42MTIwsAUAgFH2VypMRlIyjJjOatozV0p72w27zqzGUBiwsejAo1Q1tEfEYyCLcvThZESExWtmIeF5FLFNzPk2mmUPbzlYrkTH5yugc3OEVaNnSNnyRTTmdzaJ06v/7kmTxDINtFkIzhnsyS8KoMGzIKA8FJQZOMGnJJQihVbMIoKzMmjOj2bRe5UjLfVTvc2jHtS8MiwSlnAGxSqzEgcI8MVW+Dhh+tD+podMpOiL9jJ1sqAiiEK6cQAZeg65601uVptS5o65lHUOkfaLwzr3bZ5QoMf0qUlbqaidA8ILTBIID0YxzWJhTA4GmromsHetThp5UAZNCLZOhAGk8cFxR15b7niJconN7BpuzxnJXeBvfOpL0x2QnRQjLiuD1vm/x393bm1tjLmRw0z5MIdMenrD86j05f/PNEF5qqkudQ4SkRgqHsr2mcmrcGLsp0pWpd4aEo8qlJEGYDJId2ElTXpQDF0XBBQydOKnSm/TNbObdr0UMGAcVFDR7NDlwFoqht4peIUjhspUTUy9LYpOuYPnGE1CpTUvUdpCKBiXJxBeUJsCTWPES83A8SwlVqPCVQSOkwUOEQ+GhfYYyR/IgL5PECQhoZltbW3rUt3ccwqXtDUDEUquh/3ZNJJsvq5986f97tlPh98+0zL76JymRHSnadKeZNeNZ9T1ue7T/+5Jk8o2D9mhAC68a4kPiqGZpIiYQHaj+DrxtSUKIoMG0nKhmLwmZ/+9nkSEM2x2HcZL45bu3cQOheK/0VHCT9sDL1gENGas66nRB6GOUrKFCjKFaXfkX9kVfKsUCAVb7v/dq8X9Pf7kslert+r9Gjr3E3tipQIKzyoBB8oNRyEqBhAB6okNVDi9qRj8oFI8xuMtH8rIz1Ov4sNla7Wgx10B7iVku8c1OmUZHd0apINr6vJijaEHjHFda0RWfU/QiNkzQdoCiK5vDTVG6dHhBoSNNCRuRUx4pmRaq1BnJMKGPcQiFDJCEEZi0doS5gjSuScBsruTsiR0HIiPdQm0nj4EBLJUneajLGPk8BFwhAntoujZxz9xJm+6sCKNDSj5JNBFDetZpsypmf7BfcU7IhTsER4k2YXO9eSpqh88q1ugislKuvJjUnhZVygEBhQAZgSCRyCiZj8lZgIAiVbxNJe1vYfg9JGRtbvuZDk5JXiMIsXJlJhCNH0W59SBIazCnK+xR40REdXJulmTM1pdQmsVX17FM0hOs6h2FG3urmrji//uSZOcPg39DQIOvGnIxwpiWZGIoEYGM/A68bYknCGEFtJSg7IfW9+5wnQsqlMjGO70jrWRUi7r5lDqZcLqmw5wGx5N7/AqfMB9sRO2qocE5mLkDroluZqAGLu4jc27NTWCFx0qklWT0Oe6kvTdmr7krUzP1fr0gDmU3tddrTXFb0fGG1OuStp0hRLb4iCsEYAEp07YHJT8TDZClx2NIKKTqjUAw2fXEertYYW2K7nVroUQKefqa+AEfuYvbX+2y0yZcymIItAo8StwyvnedtDFkyHsbIbSatuGONzliREOab18w2QNnCFDdNjWU4m9fd6PMdQvrXmOEJl6XhGqv10CWfrzr/HXGBx2Kgc1VTDPSn39N/doN9ZZLivv2bNWesec0jKO3vyvQ72Sj+5T302I0blLpVRADIcB5hoWxkHRplEJ5haErlNRWIsKmEyWYg5yJdIXaAEkRhEY4yNXcBKgUDTprEbAiBMTxrLrDzKbvG70iX5VXFLrDzEzUdJQ/uZX1kZ2g2vuXN6irm2PrnqNeoaZS6Qqkmueae+6vjWUgzv/7kmTqDIPpXsADphwyQIIoQGzCKg6VIQIuMGuI1Yph4aGImOHbWFuFHSsKr9/FXQ76gdq1uORJHm5hkAuQiAlCcoCLtfazcpJdN5XZ7P94PsTtd1OCSYE8qh6YXbjmUY+9u/sVS8lSYRM3UOk3MW0WkpgVnZkmcbrpcsWvUwJJP0kLd6VNAAQIAQAQABpZI1MY4S5hBBJ6qRDAGvQwiHRomgkEKVODHTCYHX026QpmVgVcAwBSI2VOah5gDkAqYgMOUO48xecQeGRxeBygpEhpBR1JqoQvQGrQbGw9kPGZEWLMmUk1MhE6DNCwDLjRFlmiJwvGSabXQRlAbYyh4cA5ZEyZMTxNGRsTPWqy0xzyUHAQwiozZGkkQQxNSkovHZig+gpaa1WIsRAi5IkHMCXIoakQIeipJJMumLF4yeyddFVddayuT5YIITBdIuUS2RQvE4RcnSfMUTUyUkuihU6loJ1f///nCuRRH///9FFjIQCgl1GpUilI9YxSpv3ni7EE+muymlnViPHSRp7QiA/SXa8muEGPBJRWlisHCQiT0of/+5Jk9QAEJWQ/hXUAAkliGDCtiAAdUhEK2ckAAlo6oIc0sAAjTd2VuJii0tjd9ons3NT5oeNPmp1D/fVJrJ2fUY6Ns06mS71Ltip9VxyKuLnqP4VX3Ne6msafo8x7JefZzX37ZprGqMtelDmtv6Um5as469p5R0R8////Ebf///////9YLf/ii0xBTUVEjdE1FxOmIfxBiFPCVD1FydqVDUNZbCoIgiS0RCoVYRCoVItVISXVUKFnJIkQSBoOlQWgq6VOwaeDQdKgqVBU6IjwNA0sFR4KnREHCwNRL/1B2VOiUNKBpQNHip0SgrBqDT53//BXYCBWAkAYdrkkSTF1kxMT3mly60DAQoeCp0FQVLA0oGjxU6VO//+Ij0FYKuUqTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uSZIqP8z0WsAc9IAArgWWx5gwAAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqg==";var Qc=new S("ResponseNotification"),Sg=.5,xg=200,Eg=300,ko=p({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append(W("Preview",Vc)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),Wc=null,Yi=new Map,jc,Ki;function Tg(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=xg&&n<Eg?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var Cg=e=>Uint8Array.from(atob(e.slice(e.indexOf(",")+1)),t=>t.charCodeAt(0)).buffer;function Mg(e,t){let o=Yi.get(t);return o||(o=(t.startsWith("data:")?Promise.resolve(Cg(t)):Tg(t)).then(n=>e.decodeAudioData(n)),o.catch(()=>Yi.delete(t)),Yi.set(t,o)),o}async function zc(e){Wc??=new AudioContext;let t=Wc;t.state==="suspended"&&t.resume();let o=t.createBufferSource(),n=t.createGain();o.buffer=await Mg(t,e),n.gain.value=Sg,o.connect(n).connect(t.destination),o.start()}function Vc(){let e=ko.store.soundUrl.trim();zc(e||Fi).catch(t=>{Qc.warn("Sound failed",t),e&&zc(Fi).catch(o=>Qc.warn("Default chime failed",o))})}function Lg(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function kg(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(Ki=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:Ki.signal}))}var Jc=f({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:ko,start(){kg(),jc=q.on("fall",({conversationId:e,outcome:t})=>{t==="done"&&(ko.store.onlyWhenHidden&&!document.hidden||(ko.store.sound&&Vc(),ko.store.browserNotification&&Lg(Mo(e))))})},stop(){jc?.(),Ki?.abort()}});var Ig=`:is(${u.sidebarScroll}, :has(> ${u.sidebarScroll})) + :has(${u.menuButton})`,Bg=`${u.rail} > :has(${u.menuButton})`,Wi=`:is(${Ig}, ${Bg}, ${u.oldProfile}):not(:hover)`,Qi="[data-bloom-profile-avatar]",Og=`:is(${Wi}, ${Wi} :has(${Qi})) > :not(${Qi}, :has(${Qi}))`,Xc=p({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function Pg(){let{opacity:e,fadeAvatar:t}=Xc.store;return e>=100?"":`${t?Wi:Og}{opacity:${e/100}!important}`}var Zc,$c=f({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Xc,styles:Pg,start(){Zc=ce()},stop(){Zc?.()}});var _c=`/*
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
`;var U=x("bloom-star-chats"),Dg=80,Hg=60,Ng=1200,Ug=120,eu=180,Xi=p({messages:{type:"custom",default:[]}}),ji,zi=!1,Oe=!1,nt=!1,Dt=0,$=null,or="",I=null,Vi;function $i(){let e=Xi.store.messages;return Array.isArray(e)?e.filter(t=>L(t)&&typeof t.conversationId=="string"&&typeof t.messageId=="string"&&(t.role==="user"||t.role==="assistant")&&typeof t.snippet=="string"&&typeof t.starredAt=="number"):[]}function _i(){let e=b();return e?$i().filter(t=>t.conversationId===e):[]}function Gg(e,t){return $i().some(o=>o.conversationId===e&&o.messageId===t)}function tu(e){let t=$i(),o=t.some(n=>n.conversationId===e.conversationId&&n.messageId===e.messageId);Xi.store.messages=o?t.filter(n=>!(n.conversationId===e.conversationId&&n.messageId===e.messageId)):[{...e,starredAt:Date.now()},...t].slice(0,Dg)}function Ji(e){return e.messageIds[0]||e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.el.getAttribute("data-turn-key")||""}function Fg(e){return ae(pt(e)||h(e.el.textContent??""),Hg)}function Yg(e){let t=e.closest(u.turn);if(!t)return null;let o=Te().filter(n=>t.contains(n.el));return o.find(n=>n.el.contains(e)||n.el===t)??o.findLast(n=>n.el.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING)??null}function Kg(){let e=[...document.querySelectorAll(u.turnActions)].filter(t=>!t.closest(`[data-bloom], [role="dialog"], [inert], pre, ${u.sidebars}`));return e.filter(t=>!e.some(o=>o!==t&&o.contains(t)))}function Qg(e){let t=[...e.querySelectorAll("button")].filter(n=>n.dataset.bloom!=="message-star"&&!n.closest("[data-bloom]"));return t.length?[...e.children].find(n=>n instanceof HTMLElement&&n!==t[0]&&t.every(r=>n.contains(r)))??e:e}function Wg(){return[...document.querySelectorAll(u.headerMore)].filter(t=>{if(t.dataset.bloom==="message-star"||t.closest("[data-bloom], [role='dialog'], [inert]")||t.closest(u.sidebars))return!1;let o=t.getBoundingClientRect();return o.width===0&&o.height===0?!!t.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((t,o)=>o.getBoundingClientRect().left-t.getBoundingClientRect().left||(t.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function ou(e,t,o){return s("button",{class:t,attrs:{type:"button","aria-label":e},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},D("star"))}function jg(e,t){e.setAttribute("aria-pressed",String(t)),e.setAttribute("aria-label",t?"Unstar":"Star")}function Zi(){return Oe||nt}function rt(){Dt&&window.clearTimeout(Dt),Dt=0}function Ht(){Oe=!1,nt=!1,rt(),$?.remove(),$=null,or="",I?.classList.remove(U("-open")),I?.setAttribute("aria-expanded","false")}function ea(e){return e instanceof Node&&!!(I?.contains(e)||$?.contains(e))}function zg(e){e.classList.add(U("-flash")),window.setTimeout(()=>e.classList.remove(U("-flash")),Ng)}function Vg(e){let t=Te().find(n=>Ji(n)===e),o=t?.el.closest(u.turn)??t?.el;o&&(o.scrollIntoView({block:"start"}),zg(o))}function Jg(){let e=b(),t=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!e||se()){for(let n of o)n.remove();return}for(let n of Kg()){if(!be(n))continue;let r=Yg(n),i=r?Ji(r):"";if(!r||!i)continue;let a=n.querySelector('[data-place="action"]');(!a||a.dataset.id!==i)&&(a?.remove(),a=ou("Star",U("-star"),()=>{let c=b(),d=Te().find(m=>Ji(m)===i);!c||!d||tu({conversationId:c,messageId:i,role:d.role,snippet:Fg(d)})}),a.dataset.bloom="message-star",a.dataset.place="action",a.dataset.id=i),jg(a,Gg(e,i));let l=Qg(n);a.parentElement!==l&&l.append(a),t.add(a)}for(let n of o)t.has(n)||n.remove()}function Zg(){if(!$||!I)return;let e=I.getBoundingClientRect(),t=$.offsetWidth||288,o=$.offsetHeight||120,n=e.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,e.top-o-6));let r=Math.max(8,Math.min(e.right-t,window.innerWidth-t-8));$.style.left=`${Math.round(r)}px`,$.style.top=`${Math.round(n)}px`}function Xg(){if(!Zi()||!I){$?.remove(),$=null,or="",I?.classList.remove(U("-open")),I?.setAttribute("aria-expanded","false");return}let e=_i(),t=e.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!$||or!==t){$?.remove();let o=e.map(n=>s("div",{class:U("-row")},s("button",{class:U("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),Ht(),Vg(n.messageId)}}},s("span",{class:U("-role"),text:n.role==="user"?"You":"ChatGPT"}),s("span",{class:U("-snip"),text:n.snippet||"Message"})),ou("Unstar",U("-unstar"),()=>tu(n))));$=s("div",{class:`bloom-root ${U("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{rt(),nt=!0},pointerleave:n=>{ea(n.relatedTarget)||Oe||(rt(),Dt=window.setTimeout(()=>{nt=!1,it()},eu))}}},s("div",{class:U("-head"),text:"Starred"}),...o.length?o:[s("div",{class:U("-empty"),text:"No starred messages in this chat"})]),document.body.append($),or=t}Zg(),I.classList.add(U("-open")),I.setAttribute("aria-expanded","true")}function $g(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let e=Wg(),t=e?.parentElement??null,o=b();if(!e||!t||t.closest(u.sidebars)||!o||se()||!be(t)){I?.remove(),I=null,Ht();return}I||(I=s("button",{class:U("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{rt(),Dt=window.setTimeout(()=>{nt=!0,it()},Ug)},pointerleave:r=>{ea(r.relatedTarget)||(rt(),Dt=window.setTimeout(()=>{nt=!1,Oe||it()},eu))},click:r=>{r.preventDefault(),r.stopPropagation(),Oe=!Oe,nt=Oe,rt(),Oe||Ht(),it()}}},D("star"))),(I.parentElement!==t||I.nextElementSibling!==e)&&e.before(I);let n=e.getBoundingClientRect();n.width>0&&(I.style.width=`${n.width}px`,I.style.height=`${n.height}px`),I.classList.toggle(U("-here"),_i().length>0),Xg()}function _g(){let e=new Set(_i().map(t=>t.messageId));for(let t of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))t.classList.toggle(U("-mark"),!!t.dataset.messageId&&e.has(t.dataset.messageId))}function it(){if(!zi){zi=!0;try{for(let e of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();Jg(),$g(),_g()}finally{zi=!1}}}function eh(){Ht(),I?.remove(),I=null;for(let e of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();for(let e of document.querySelectorAll(`.${U("-mark")}`))e.classList.remove(U("-mark"))}var nu=f({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:Xi,styles:_c,onSettingsChange(e){e==="messages"&&it()},start(){ji=T(o=>P(o)&&it());let e=o=>{ea(o.target)||Zi()&&Ht()};document.addEventListener("pointerdown",e,!0);let t=o=>{o.key!=="Escape"||!Zi()||(o.preventDefault(),Ht())};document.addEventListener("keydown",t,!0),Vi=()=>{document.removeEventListener("pointerdown",e,!0),document.removeEventListener("keydown",t,!0)},it()},stop(){ji?.(),ji=void 0,Vi?.(),Vi=void 0,rt(),eh()}});var ru="filter:blur(6px)!important;transition:filter 0.2s ease",iu=`:is(${u.sidebars})`,at="data-bloom-streamer-open",th="[data-app-action-sidebar-thread-row], [data-app-action-sidebar-project-row], .bloom-recent-item";function oh(){return{conversations:{selectors:[`${iu} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0,row:"[data-app-action-sidebar-thread-row]"},projects:{selectors:[`${iu} a:is([href*="/project"], [href*="/g/g-p-"])`,"[data-app-action-sidebar-project-row]",".bloom-recent-project"],hover:!0,row:"[data-app-action-sidebar-project-row]"},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}}}var au=p({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function nh(e,t){let o=[`:is(${e}):hover`,`.bloom-recent-item:hover :is(${e})`,`:is(${e})[${at}]`];return t&&o.push(`${t}:hover`,`${t}:hover :is(${e})`,`${t}:is(${e}):hover`,`${t}[${at}]`,`${t}[${at}] :is(${e})`),o.join(",")}function rh(){let e=oh();return Object.entries(e).filter(([t])=>au.store[t]).map(([,t])=>{let o=t.selectors.join(",");if(!t.hover)return`:is(${o}){${ru}}`;let n="row"in t?t.row:void 0;return`:is(${o}){${ru}}${nh(o,n)}{filter:none!important}`}).join(`
`)}function ih(e,t){for(let o of document.elementsFromPoint(e,t))if(o instanceof Element){let n=o.closest(th);if(n)return n}return null}function na(e){for(let t of document.querySelectorAll(`[${at}]`))t!==e&&t.removeAttribute(at);e&&!e.hasAttribute(at)&&e.setAttribute(at,"")}var Nt,ah=Ee(()=>{Nt&&na(ih(Nt.clientX,Nt.clientY))});function ta(e){Nt=e,ah()}function sh(e){e.relatedTarget instanceof Node&&document.documentElement.contains(e.relatedTarget)||(Nt=void 0,na(null))}var oa,nr,su=f({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:au,styles:rh,start(){oa=ce(),nr=new AbortController;let e={capture:!0,signal:nr.signal,passive:!0};document.addEventListener("pointerover",ta,e),document.addEventListener("pointermove",ta,e),document.addEventListener("pointerout",ta,e),window.addEventListener("pointerleave",sh,e)},stop(){nr?.abort(),nr=void 0,Nt=void 0,na(null),oa?.(),oa=void 0}});var cu=p({openNewAsTemporary:{type:"boolean",description:"Open New chat as a temporary chat.",default:!1}}),lh=/^(?:new chat|新聊天)$/i,rr;function ch(e){return e?"/?temporary-chat=true":"/"}function uh(e){let t=ch(e);`${location.pathname}${location.search}`===t||e&&se()&&location.pathname==="/"||location.assign(t)}function dh(e){if(e.closest("[data-bloom]"))return!1;try{let t=new URL(e.href,location.origin);return t.origin===location.origin&&t.pathname==="/"}catch{return!1}}function mh(e){return e.closest("[data-bloom], [data-app-action-sidebar-project-row]")?!1:lh.test(e.getAttribute("aria-label")??h(e.textContent??""))}function fh(e){if(!cu.store.openNewAsTemporary||se())return;let{target:t}=e;if(!(t instanceof Element))return;let o=t.closest("a[href], button"),n=o instanceof HTMLAnchorElement?dh(o):!!o&&mh(o);!o||!n||o.closest(`${u.sidebarScroll}, ${u.rail}, ${u.oldSidebar}, nav`)&&(e.preventDefault(),e.stopPropagation(),uh(!0))}function lu(){for(let e of document.querySelectorAll('[data-bloom="temporary-chat"]'))e.remove()}var uu=f({name:"TemporaryChat",description:"Optionally open New chat as a temporary chat. No extra sidebar button.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"ghost",enabledByDefault:!0,settings:cu,start(){lu(),rr=new AbortController,document.addEventListener("pointerdown",fh,{capture:!0,signal:rr.signal})},stop(){rr?.abort(),rr=void 0,lu()}});var Pe=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)','[data-turn-key] [data-message-author-role="user"] blockquote:not(.twitter-tweet)','[class~="group/user-message"] blockquote:not(.twitter-tweet)'].join(","),ra=p({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function ph(){let e=[`${Pe}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${Pe}>*{margin-block:0!important}`];return ra.store.italic||e.push(`${Pe}{font-style:inherit!important}`),ra.store.quotes||(e.push(`${Pe}{quotes:none!important}`),e.push(`${Pe}::before,${Pe}::after,${Pe} p::before,${Pe} p::after{content:none!important}`)),e.join(`
`)}var du=f({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:ra,styles:ph});var gh=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],hh=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",bh='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',mu=p({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function Ah(){let e=`${mu.store.width}rem`;return`:is(${hh}){${gh.map(t=>`${t}:${e}!important`).join(";")}}:is(${bh}){max-width:min(100%, ${e})!important}`}var fu=f({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:mu,styles:Ah});var yh=[Bs,zs,ol,il,hl,yl,ql,Ll,Ul,zl,Xl,pc,hc,bc,wc,Dc,Kc,Jc,$c,nu,su,uu,du,fu],ia=yh;var vh=new S("Bloom"),pu="2.0.83";async function aa(){Ya();for(let e of ia)e.updatedAt=as[e.name];wa(ia),ba(),indexedDB.deleteDatabase("bloompp"),Po("base",Ma),is(),Yo("Init"),Jo().then(()=>{fa(),Yo("DOMContentLoaded")}),await Qa(),Yo("HostReady"),vh.info(`Bloom++ ${pu} ready`)}var gu=new S("Boot");if(window===window.top){let e=te.Bloom;e&&gu.warn("Replacing another Bloom++ instance",e.VERSION),Object.defineProperty(te,"Bloom",{value:sa,configurable:!0,writable:!0}),aa().catch(t=>gu.error("Startup failed",t))}})();
