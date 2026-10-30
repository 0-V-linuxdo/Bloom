// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      2.0.86
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

/* Bloom++ v2.0.86. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Bu=Object.defineProperty;var Pu=(e,t)=>{for(var o in t)Bu(e,o,{get:t[o],enumerable:!0})};var S=class{constructor(t){this.tag=t}log(t,o){console[t](`[Bloom++] [${this.tag}]`,...o)}debug(...t){this.log("debug",t)}info(...t){this.log("info",t)}warn(...t){this.log("warn",t)}error(...t){this.log("error",t)}};var se=(e,t,o)=>Math.min(o,Math.max(t,e)),P=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),va=e=>`${e}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,ce=(e,t)=>e.length>t?`${e.slice(0,t-1)}\u2026`:e,h=e=>e.replaceAll(/[​-‍﻿]/g,"").replaceAll(/\s+/g," ").trim();function Uo(e,t){return`${e} ${t}${e===1?"":"s"}`}async function qa(e){if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}await navigator.clipboard.writeText(e)}function Ce(e){try{return JSON.parse(e)}catch{return}}var ne=typeof unsafeWindow>"u"?window:unsafeWindow;var Ou=new S("Styles"),Me=new Map,jt=new Set,Ye=new Map,br=!0,xa=e=>e.replaceAll(/[^A-Za-z0-9_-]/g,"_"),Ru=e=>`:where(:root){--bloom-sheet-${xa(e)}:1}`,Du=(e,t)=>`${Ru(e)}${t}`,wa=e=>`bloom-style-${e}`;function Sa(e){try{return[...e.cssRules].map(t=>t.cssText).join(`
`)}catch{return""}}function Hu(e,t){let o=Sa(e);return o?o.includes(`--bloom-sheet-${xa(t)}`)?!0:t==="plugin-StreamerMode"?o.includes("blur(6px)")&&(o.includes("data-app-action-sidebar-thread-title")||o.includes("data-bloom-streamer-open")):t==="plugin-WiderChat"?o.includes("--composer-adjacent-max-width")&&o.includes("--thread-content-max-width"):t==="plugin-ComposerOpacity"?o.includes("--composer-layout-surface-backdrop-filter")||o.includes("--composer-layout-surface-background")&&o.includes("color-mix"):!1:!1}function Ea(e){let t=Sa(e);return t?!!(t.includes("--bloom-")||t.includes(".bloom-")||t.includes("[data-bloom")||t.includes("--bloom-sheet-")||t.includes("blur(6px)")&&t.includes("data-app-action-sidebar-thread-title")||t.includes("--composer-adjacent-max-width")&&t.includes("--thread-content-max-width")||t.includes("--composer-layout-surface-backdrop-filter")):!1}function Ta(){let e=document.adoptedStyleSheets.filter(t=>!jt.has(t)&&!Ea(t));document.adoptedStyleSheets=[...e,...Me.values()]}function Ca(e){document.readyState==="loading"||e.parentNode===document.head||document.head.append(e)}function Nu(e,t){let o=Ye.get(e);o||(o=document.createElement("style"),o.id=wa(e),Ye.set(e,o)),o.textContent!==t&&(o.textContent=t),Ca(o)}function Go(e,t){let o=Du(e,t);if(br)try{let n=Me.get(e);n||(n=new ne.CSSStyleSheet,Me.set(e,n),jt.add(n)),n.replaceSync(o),Ta();return}catch(n){Ou.warn("Constructed style sheets unavailable, using <style> after parsing",n),br=!1;let r=Me.get(e);r&&jt.delete(r),Me.delete(e)}Nu(e,o)}function zt(e){let t=Me.get(e);t&&(jt.delete(t),Me.delete(e)),Ye.get(e)?.remove(),Ye.delete(e);for(let o of document.querySelectorAll(`style[id="${wa(e)}"]`))o.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(o=>o!==t&&!Hu(o,e)),br&&Ta()}catch{}}function Vt(){Me.clear(),jt.clear();for(let e of Ye.values())e.remove();Ye.clear();for(let e of document.querySelectorAll("style[id^='bloom-style-']"))e.remove();try{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(e=>!Ea(e))}catch{}}function Ma(){for(let e of Ye.values())Ca(e)}var M=e=>(...t)=>t.map(o=>e+o).join(" "),Fo=(...e)=>e.filter(Boolean).join(" "),Le=e=>e.length?`${e.map(t=>`${t}:not([data-bloom])`).join(",")}{display:none!important}`:"";var ya={};Pu(ya,{VERSION:()=>ku,destroy:()=>Wh,init:()=>ba,plugins:()=>Ae});var Uu=new S("Dom");function s(e,t={},...o){let n=document.createElement(e);t.class&&(n.className=t.class),t.text!=null&&(n.textContent=t.text),t.title&&(n.title=t.title);for(let[r,i]of Object.entries(t.attrs??{}))n.setAttribute(r,i);for(let[r,i]of Object.entries(t.on??{}))n.addEventListener(r,i);for(let r of o)r&&n.append(r);return n}var La=document.createElement("template");function ka(e){return La.innerHTML=e.trim(),La.content.firstElementChild.cloneNode(!0)}var Zt=e=>e instanceof HTMLElement&&e.isConnected&&e.getClientRects().length>0&&!e.closest("[inert]"),K=(e,t=document)=>[...t.querySelectorAll(e)].find(Zt)??null,Gu=16,Fu="onmessage=event=>setInterval(()=>postMessage(0),event.data)";function Ia(e,t){let o=setInterval(e,t),n;try{n=new Worker(URL.createObjectURL(new Blob([Fu],{type:"text/javascript"}))),n.addEventListener("message",e),n.postMessage(t)}catch{n=void 0}return()=>{clearInterval(o),n?.terminate()}}function Xt(e){document.hidden?setTimeout(e,Gu):requestAnimationFrame(e)}function ke(e){let t=!1;return()=>{t||(t=!0,Xt(()=>{t=!1;try{e()}catch(o){Uu.error("Scheduled task failed",o)}}))}}var Yo=new Set,Ko=[],Jt,Yu=ke(()=>{let e=Ko;Ko=[];for(let t of Yo)t(e)});function E(e){return Yo.add(e),Jt||(Jt=new MutationObserver(t=>{Ko.push(...t),Yu()}),Jt.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["inert","src","aria-busy","data-testid","aria-label","data-state","hidden"]})),e([]),()=>{Yo.delete(e),!Yo.size&&(Jt?.disconnect(),Jt=void 0,Ko=[])}}var Ku=e=>e instanceof Element&&(e.hasAttribute("data-bloom")||!!e.closest("[data-bloom]")),H=e=>!e.length||e.some(t=>!Ku(t.target)),Qu=e=>`"${e.replaceAll("\\","\\\\").replaceAll('"','\\"').replaceAll(`
`,"\\A ")}"`;function Ke(e,t){if(t==null){e.removeAttribute("data-bloom-text"),e.style.removeProperty("--bloom-text-size"),e.style.removeProperty("--bloom-text");return}e.style.setProperty("--bloom-text",Qu(t)),e.getAttribute("data-bloom-text")!==t&&e.setAttribute("data-bloom-text",t)}function f(e){return e}var Ba=new S("Storage");function Qo(e){try{return localStorage.getItem(e)??void 0}catch{return}}function Wo(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(o){Ba.warn("localStorage write failed",o)}}function yr(e){try{localStorage.removeItem(e)}catch(t){Ba.warn("localStorage delete failed",t)}}function Pa(e,t){addEventListener("storage",o=>{o.key===e&&t(o.newValue)})}var Ar="BloomSettings",Wu=100,pt={plugins:{}},jo=new Set,vr=new Set,$t;function Oa(e){let t=e;for(let o=0;typeof t=="string"&&o<2;o++)t=Ce(t);return!P(t)||!P(t.plugins)||!Object.keys(t.plugins).length?null:t}function Ra(){let e=Oa(Qo(Ar));e&&(pt.plugins=e.plugins)}var Da=(e,t)=>`${e}
${t}`;function Ha(){$t=void 0,vr.clear(),Wo(Ar,pt)}function ju(e){let t=Oa(e);if(!t)return;let o=[];for(let n of new Set([...Object.keys(pt.plugins),...Object.keys(t.plugins)])){let r=pt.plugins[n]??={},i=P(t.plugins[n])?t.plugins[n]:{};for(let a of new Set([...Object.keys(r),...Object.keys(i)]))vr.has(Da(n,a))||JSON.stringify(r[a])===JSON.stringify(i[a])||(i[a]===void 0?delete r[a]:r[a]=i[a],o.push([n,a]))}for(let[n,r]of o)for(let i of jo)i(n,r)}function qr(){$t&&(clearTimeout($t),Ha())}var Ie=(e,t)=>pt.plugins[e]?.[t];function Qe(e,t,o){let n=pt.plugins[e]??={};o===void 0?delete n[t]:n[t]=o,vr.add(Da(e,t)),clearTimeout($t),$t=setTimeout(Ha,Wu);for(let r of jo)r(e,t)}function gt(e){return jo.add(e),()=>void jo.delete(e)}function xr(e){return e.type==="component"?void 0:e.default}function p(e){let t={def:e,pluginName:"",store:new Proxy({},{get:(o,n)=>Ie(t.pluginName,n)??(e[n]&&xr(e[n])),set:(o,n,r)=>(Qe(t.pluginName,n,r),!0)}),reset(){for(let o of Object.keys(e))e[o].type!=="custom"&&Ie(t.pluginName,o)!==void 0&&Qe(t.pluginName,o)}};return t}var Na=e=>{let t=()=>{let o=Ie("Settings",e);return Array.isArray(o)?o.filter(n=>typeof n=="string"):[]};return{has:o=>t().includes(o),list:t,toggle(o){let n=t();Qe("Settings",e,n.includes(o)?n.filter(r=>r!==o):[o,...n])}}},zo=Na("pinnedPlugins"),Vo=Na("starredPlugins");addEventListener("pagehide",qr);Pa(Ar,ju);var Zo=new S("PluginManager"),Ae=new Map,We=new Set,Sr=new Set,wr=new Set;function Ua(e){for(let t of e)t.settings&&(t.settings.pluginName=t.name),Ae.set(t.name,t)}var ht=e=>!!e.required||(Ie(e.name,"enabled")??!!e.enabledByDefault);var _t=e=>`plugin-${e.name}`;function Ga(e){if(!e.styles)return;let t=typeof e.styles=="function"?e.styles():e.styles;t?Go(_t(e),t):zt(_t(e))}function zu(e){if(!We.has(e.name))try{Ga(e),e.start?.(),We.add(e.name)}catch(t){zt(_t(e)),Zo.error(`Failed to start ${e.name}`,t)}}function Er(e){We.delete(e.name),zt(_t(e));try{e.stop?.()}catch(t){Zo.error(`Failed to stop ${e.name}`,t)}}var Fa=e=>e.startAt??"HostReady";function Ya(e){if(ht(e)){Sr.has(Fa(e))&&zu(e);return}Er(e)}function Xo(e){Sr.add(e);for(let t of Ae.values())Fa(t)===e&&Ya(t);Zo.info(`${e}: ${[...We].join(", ")}`)}function Ka(e,t){Qe(e.name,"enabled",t),qr()}function Vu(){for(let e of Ae.values())e.required||ht(e)||(We.has(e.name)?Er(e):zt(_t(e)))}var Jo;function Qa(){Jo?.(),Jo=E(()=>Vu())}function Wa(){Jo?.(),Jo=void 0;for(let e of Ae.values())Er(e);We.clear(),Sr.clear()}function ja(e){return wr.add(e),()=>void wr.delete(e)}gt((e,t)=>{let o=Ae.get(e);if(o){if(t==="enabled"){typeof Ie(e,"enabled")=="boolean"&&Ya(o);for(let n of wr)n();return}if(We.has(e))try{Ga(o),o.onSettingsChange?.(t)}catch(n){Zo.error(`Settings change failed for ${e}`,n)}}});var za=`/*
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
`;var Zu=new S("Events");function $o(){let e=new Map;return{on(t,o){let n=e.get(t);return n||e.set(t,n=new Set),n.add(o),()=>void n.delete(o)},emit(t,o){for(let n of e.get(t)??[])try{n(o)}catch(r){Zu.error(`Listener for ${String(t)} failed`,r)}}}}var u={sidebarScroll:"[data-app-action-sidebar-scroll]",rail:"[data-app-navigation-rail]",menuButton:'button[aria-haspopup="menu"]',oldSidebar:"#stage-slideover-sidebar",oldRail:"#stage-sidebar-tiny-bar",oldProfile:'[data-testid="accounts-profile-button"]',sidebars:"[data-app-action-sidebar-scroll], [data-app-navigation-rail], #stage-slideover-sidebar, #stage-sidebar-tiny-bar, nav",conversationLink:'a[href*="/c/"]',timelineScroll:"[data-app-action-timeline-scroll]",conversationTarget:"[data-chatgpt-conversation-selection-target]",newTurn:"[data-turn-key]",oldTurn:'section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',turn:'[data-turn-key], section[data-testid^="conversation-turn-"], article[data-testid^="conversation-turn-"]',messageUnit:"[data-chatgpt-search-message-ids]",oldMessage:"[data-message-id]",authorRole:"[data-message-author-role]",oldThread:"#thread",turnActions:'.turn-action-controls, [data-testid="copy-turn-action-button"], [data-testid="good-response-turn-action-button"]',readAloud:'button:is([aria-label="Read aloud" i], [aria-label^="Read aloud" i], [aria-label="Stop reading" i], [aria-label^="Stop reading" i], [aria-label="\u6717\u8BFB"], [aria-label^="\u6717\u8BFB"], [aria-label="\u505C\u6B62\u6717\u8BFB"], [data-testid*="read-aloud" i])',generatedImage:'[class~="group/generated-image-preview"], img[alt="Generated image"]',markdown:".markdown, .prose",searchUnit:"[data-chatgpt-search-unit-key]",assistantMarkdown:"[data-markdown-text-style='assistant-message']",activityHeader:'[class*="group/activity-header"]',recovery:".text-chatgpt-recovery",turnBusy:'[role="status"][aria-busy="true"], .result-streaming',composerInput:'textarea[name="prompt"], #mobile-composer-prompt, #prompt-textarea, form [contenteditable="true"].ProseMirror',composerConversation:"[data-above-composer-conversation-id]",oldComposerForm:'form[data-type="unified-composer"]',sendButton:'[data-testid="send-button"], [data-testid="composer-submit-button"]:not([aria-label*="top" i]), button[aria-label="Send prompt" i], button[aria-label="Send message" i], form button[aria-label="Send" i], button[aria-label^="\u53D1\u9001"]',stopButton:'[data-testid="stop-button"], button[aria-label^="Stop stream" i], button[aria-label^="Stop generat" i], button[aria-label^="Stop answer" i], form button[aria-label="Stop" i], form button[aria-label="\u505C\u6B62"], button[aria-label^="\u505C\u6B62\u751F\u6210"], button[aria-label^="\u505C\u6B62\u56DE\u7B54"]',composerFooter:"#thread-bottom-container",modelTrigger:'[data-testid="model-switcher-dropdown-button"], button[aria-label="Model selector" i], button[aria-label="Select ChatGPT model" i]',modelItem:'[role="menu"] [data-testid^="model-switcher-"], [role="menuitem"][data-testid^="model-switcher-"], [role="menu"] [role="menuitemradio"], [role="menu"] [data-reasoning-slider]',effortSlider:'[role="menu"] [data-reasoning-slider]',homeHeading:'main h1:not([aria-hidden="true"]), [data-testid="home-heading"]',headerMore:'button[aria-label="More" i], button[aria-label="\u66F4\u591A"]'};var Va=/[​-‍﻿]/g,ve=()=>K(u.composerInput),je=e=>e instanceof HTMLElement&&e.matches(u.composerInput),Q=(e=ve())=>e?.closest("form")??document.querySelector(u.oldComposerForm);function k(e=ve()){if(!e)return"";if(e instanceof HTMLTextAreaElement)return e.value.replace(Va,"").trim();let t=e.cloneNode(!0);for(let n of t.querySelectorAll('[contenteditable="false"], button'))n.remove();let o=[...t.querySelectorAll("p")].map(n=>n.textContent??"").join(`
`);return(o.trim()?o:t.textContent??"").replace(Va,"").trim()}var Xu=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set;function ie(e,t=ve()){if(!t)return!1;if(t.focus(),t instanceof HTMLTextAreaElement)return Xu?.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.setSelectionRange(e.length,e.length),!0;let o=getSelection();return o?.selectAllChildren(t),(e?document.execCommand("insertText",!1,e):document.execCommand("delete"))||(t.textContent=e,t.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e}))),o?.selectAllChildren(t),o?.collapseToEnd(),!0}function Ja(e){if(e instanceof HTMLTextAreaElement){let{selectionStart:i,selectionEnd:a,value:c}=e;return{first:!c.slice(0,i).includes(`
`),last:!c.slice(a).includes(`
`)}}let t=getSelection();if(!t?.rangeCount)return{first:!0,last:!0};let o=t.getRangeAt(0).getBoundingClientRect(),n=e.getBoundingClientRect(),r=Number.parseFloat(getComputedStyle(e).lineHeight)||24;return o.height?{first:o.top-n.top<r,last:n.bottom-o.bottom<r}:{first:!0,last:!0}}var Za=e=>{let t=Q();return(t&&K(e,t))??K(e)},bt=()=>Za(u.stopButton),$u=()=>{let e=Za(u.sendButton);return e&&!e.matches(u.stopButton)?e:null};function _o(){let e=$u();if(e){e.disabled||e.click();return}ve()?.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}var Xa=()=>Zt(bt());var es=new S("Network"),_u=/^\/backend-api\/(?:f\/)?conversation(?:\/resume)?\/?$/,ed=/^\/backend-api\/conversations?\/([0-9a-f]{8}-[0-9a-f-]{20,})\/?$/i,tn=1e3,td=new Set(["stream_handoff","resume_sse_endpoint","subscribe_ws_topic"]),W=$o(),Cr=new Map,$a=new Map,od=1,le=e=>e?Cr.get(e)??null:null;function en(e){let t=Cr.get(e);return t||Cr.set(e,t={id:e,title:null,chain:[],times:new Map}),t}var ts=e=>e==="user"||e==="assistant";function os(e){let t=e.author?.role;if(!e.id||!ts(t)||e.metadata?.is_visually_hidden_from_conversation)return null;let o=e.content?.content_type;if(o!=="text"&&o!=="multimodal_text")return null;let n=e.content?.parts??[],r=n.filter(l=>typeof l=="string").join(`
`).trim(),i=n.filter(l=>P(l)&&l.content_type==="image_asset_pointer").length,a=e.metadata?.attachments,c=Array.isArray(a)&&a.length>0;return!r&&!i&&!c?null:{id:e.id,role:t,createTime:e.create_time?e.create_time*tn:null,text:r,hasFiles:c,imageCount:i}}var ns=e=>e.filter((t,o)=>t.role==="user"||e[o+1]?.role!=="assistant"),Mr=e=>e.map(t=>t.createTime).filter(t=>t!=null);function nd(e,t){let o=Mr(e),n=Mr(t);return!o.length||!n.length?!1:Math.max(...o)<Math.min(...n)}function rd(e){let t=Mr(e);if(t.length<2)return e;let[o]=t,n=o-e.length;return e.map((i,a)=>(i.createTime!=null&&(n=i.createTime),{message:i,index:a,time:i.createTime??n})).toSorted((i,a)=>i.time-a.time||i.index-a.index).map(i=>i.message)}function id(e,t){let o=t.filter(P).map(c=>P(c.message)?c.message:c);for(let c of o)c.id&&c.create_time&&e.times.set(c.id,c.create_time*tn);let n=o.map(os).filter(c=>c!=null),r=new Set(n.map(c=>c.id)),i=e.chain.filter(c=>!r.has(c.id)),a=nd(n,i)?[...n,...i]:[...i,...n];return e.chain=ns(rd(a)),e}function ad(e,t){if(!P(t)||!(P(t.mapping)||Array.isArray(t.messages)))return null;let o=en(e);if(typeof t.title=="string"&&t.title&&(o.title=t.title),Array.isArray(t.messages))return id(o,t.messages);let n=t.mapping;for(let c of Object.values(n)){let l=c.message?.create_time;c.message?.id&&l&&o.times.set(c.message.id,l*tn)}let r=[],i=new Set,a=typeof t.current_node=="string"?t.current_node:null;for(;a&&!i.has(a)&&n[a];){i.add(a);let c=n[a].message,l=c?os(c):null;l&&r.push(l),a=n[a].parent??null}return r.length&&(o.chain=ns(r.toReversed())),o}function sd(e){try{return new URL(e instanceof Request?e.url:String(e),location.origin)}catch{return null}}var Tr=e=>typeof e=="string"?e:null;function ld(e){let t=typeof e?.body=="string"?Ce(e.body):null;if(!P(t))return{conversationId:null,parentId:null,userId:null};let[o]=Array.isArray(t.messages)?t.messages:[];return{conversationId:Tr(t.conversation_id),parentId:Tr(t.parent_message_id),userId:P(o)?Tr(o.id):null}}function cd(e,t){if(!P(e))return;typeof e.type=="string"&&td.has(e.type)&&(t.handoff=!0);let o=P(e.v)&&(e.v.message||e.v.conversation_id)?e.v:e;typeof o.conversation_id=="string"&&(t.conversationId=o.conversation_id),(e.error||o.error||e.type==="error")&&(t.error=!0),e.type==="title_generation"&&typeof e.title=="string"&&typeof e.conversation_id=="string"&&(en(e.conversation_id).title=e.title,W.emit("conversation",en(e.conversation_id)));let n=o.message;if(n?.id&&n.create_time&&ts(n.author?.role)){let r=n.create_time*tn;t.conversationId&&en(t.conversationId).times.set(n.id,r),W.emit("message-time",{conversationId:t.conversationId,messageId:n.id,time:r})}}async function ud(e,t){let o=e.body?.getReader();if(!o)return;let n=new TextDecoder,r="";for(;;){let{done:i,value:a}=await o.read();if(i)break;r+=n.decode(a,{stream:!0});let c=r.split(`
`);r=c.pop()??"";for(let l of c){if(!l.startsWith("data:"))continue;let d=l.slice(5).trim();d&&d!=="[DONE]"&&cd(Ce(d),t)}}}async function dd(e,t,o){let{conversationId:n}=t,r={conversationId:n,error:!1,handoff:!1};$a.set(e,n),W.emit("generate-start",{requestId:e,...t});try{let i=await o;i.ok?i.headers.get("content-type")?.includes("event-stream")&&await ud(i.clone(),r):r.error=!0}catch(i){let a=i instanceof DOMException&&i.name==="AbortError";r.handoff||=a,r.error||=!a}finally{$a.delete(e),W.emit("generate-end",{requestId:e,...r})}}async function md(e,t){try{let o=await t;if(!o.ok)return;let n=ad(e,await o.clone().json());n&&W.emit("conversation",n)}catch(o){es.debug("Conversation read skipped",o)}}function fd(e,t,o){let n=sd(e);if(!n||n.origin!==location.origin)return;let r=(t?.method??(e instanceof Request?e.method:"GET")).toUpperCase();if(r==="POST"&&_u.test(n.pathname)){dd(od++,ld(t),o);return}let i=r==="GET"&&n.pathname.match(ed)?.[1];i&&md(i,o)}var _a=!1;function rs(){if(_a)return;_a=!0;let e=ne.fetch,t=function(o,n){let r=e.call(this??ne,o,n);try{fd(o,n,r)}catch(i){es.error("Fetch tap failed",i)}return r};ne.fetch=typeof exportFunction=="function"?exportFunction(t,ne):t}var pd="__reactContainer$",is="__reactFiber$";function on(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>document.addEventListener("DOMContentLoaded",()=>e(),{once:!0}))}var Lr=(e,t)=>Object.keys(e.wrappedJSObject??e).some(o=>o.startsWith(t)),qe=e=>!Lr(document,pd)||Lr(e,is);function ze(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document,{childList:!0,subtree:!0})})}async function as(){await ze();let e=Date.now()+8e3;for(;!Lr(document.body,is)&&Date.now()<e;)await new Promise(t=>setTimeout(t,100))}var gd=new S("Route"),ss=/\/c\/(?!local-)([\w-]+)/,hd=500,Br=e=>{try{return new URL(e,location.origin).pathname.match(ss)?.[1]??null}catch{return null}},b=()=>location.pathname.match(ss)?.[1]??null,sn=()=>location.pathname==="/",bd=/^\/g\/g-p-[^/]+(?:\/project)?\/?$/,ls=()=>bd.test(location.pathname),ue=()=>new URLSearchParams(location.search).get("temporary-chat")==="true",rn=new Set,an=location.href,Ir=b(),nn;function kr(){if(location.href===an)return;let e={prevHref:an,href:location.href,prevId:Ir,id:b()};an=e.href,Ir=e.id;for(let t of rn)try{t(e)}catch(o){gd.error("Route listener failed",o)}}function yd(){let e=new AbortController,{navigation:t}=ne;t?.addEventListener("currententrychange",()=>queueMicrotask(kr),{signal:e.signal}),addEventListener("popstate",kr,{signal:e.signal});let o=setInterval(kr,hd);return()=>{e.abort(),clearInterval(o)}}function de(e){return rn.add(e),nn||(an=location.href,Ir=b(),nn=yd()),()=>{rn.delete(e),!rn.size&&(nn?.(),nn=void 0)}}var Ad=["data-turn","data-message-author-role"],vd=/:(user|assistant)$/,Pr=`${u.messageUnit}, ${u.oldMessage}`,Or=e=>e==="user"||e==="assistant",ms=()=>!!document.querySelector(u.timelineScroll),fs=()=>!!K(u.timelineScroll),ps=()=>b()??document.querySelector(u.composerConversation)?.getAttribute("data-above-composer-conversation-id")??"",yt=()=>ms()?K(u.timelineScroll):document;function to(){if(ms())return K(u.timelineScroll);let e=document.querySelector(u.turn);for(let t=e?.parentElement;t;t=t.parentElement){let{overflowY:o}=getComputedStyle(t);if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight)return t}return document.scrollingElement}var At=e=>e.getAttribute("data-chatgpt-search-unit-key")?.match(vd)?.[1]??null,gs=e=>[...e.querySelectorAll(u.searchUnit)].filter(t=>At(t)&&!t.parentElement?.closest(u.searchUnit)),cs=e=>(e.getAttribute("data-chatgpt-search-message-ids")??e.getAttribute("data-message-id"))?.split(/\s+/).filter(Boolean)??[];function eo(e){let t=cs(e);return t.length?t:[...new Set([...e.querySelectorAll(Pr)].flatMap(cs))]}function vt(e=yt()){if(!e)return[];let t=gs(e);return t.length?t:[...e.querySelectorAll(Pr)].filter(o=>!o.parentElement?.closest(Pr))}function qd(e,t){for(let o=e.length-1;o>=0;o--){let n=t.find(r=>r.id===e[o]);if(n)return n.role}return null}function xd(e){for(let t of Ad){let o=e.getAttribute(t)??e.querySelector(`[${t}]`)?.getAttribute(t);if(Or(o))return o}return e.querySelector(u.markdown)||e.querySelector(u.generatedImage)?"assistant":null}var wd=e=>!e.parentElement?.closest(u.turn);function Be(){let e=le(b())?.chain??[];return[...yt()?.querySelectorAll(u.turn)??[]].filter(wd).flatMap(o=>{let n=gs(o),r=n.length?n.map(i=>({el:i,known:At(i)})):[{el:o,known:null}];if(n.length&&!r.some(i=>i.known==="assistant")){let i=d=>!n.some(m=>m.contains(d))&&h(d.textContent??""),a=[...o.querySelectorAll(u.assistantMarkdown)].find(d=>i(d)&&!ln.test(h(d.textContent??""))),c=[...o.querySelectorAll(u.activityHeader)].findLast(i),l=a??c;l&&r.push({el:l,known:"assistant"})}return r}).map(({el:o,known:n},r)=>{let i=n?eo(o):vt(o).flatMap(eo),a=n??xd(o)??qd(i,e)??(r%2?"assistant":"user"),c=o.closest(u.turn)??o,l=!o.closest(u.searchUnit)&&!!c.querySelector(u.turnBusy),d=a==="assistant"&&(o.matches(u.turnBusy)||!!o.querySelector(u.turnBusy)||l);return{el:o,role:a,messageIds:i,streaming:d}})}var Sd="[data-bloom], .sr-only",hs=/^(?:\d+\s+sources?|web search|searched|thought for|worked for|reasoned|thinking)\b/i,ln=/^(?:analyzed|analyzing|analysis paused|analysis errored|analysis error)$/i,us=new WeakMap;function qt(e){let o=(e.el.closest(u.turn)??e.el).textContent?.length??0,n=us.get(e.el);if(n?.length===o)return n.summary;let r=Ed(e);return us.set(e.el,{length:o,summary:r}),r}function ds(e){let t=new Set,o=[];for(let n of e.querySelectorAll(u.assistantMarkdown)){if(n.closest(u.searchUnit))continue;let r=h(n.textContent??"");!r||ln.test(r)||hs.test(r)||t.has(r)||(t.add(r),o.push(r))}return o}function Ed(e){let t=e.el.querySelectorAll(u.generatedImage).length;if(e.role==="assistant"&&t)return t>1?`Image \xD7${t}`:"Image";let o=e.el.closest(u.turn);if(e.role==="assistant"&&o&&e.el.matches(u.assistantMarkdown)&&!e.el.closest(u.searchUnit)){let l=ds(o);if(l.length)return l.join(" \xB7 ")}let n=e.el.querySelector(e.role==="assistant"?u.markdown:".whitespace-pre-wrap")??e.el,i=[...n.querySelectorAll(Sd)].map(l=>h(l.textContent??"")).filter(Boolean).reduce((l,d)=>l.replace(d,`
`),n.innerText||n.textContent||""),a=i.split(`
`).map(h).filter(l=>l&&!hs.test(l)&&!ln.test(l));if(a.length)return a.join(" ");if(e.role==="assistant"&&o){let l=ds(o);if(l.length)return l.join(" \xB7 ")}let c=i.split(`
`).map(h).filter(l=>ln.test(l));return c.length?c.at(-1)??"":e.role==="user"&&e.el.querySelector("img, a[download], [data-testid*=file]")?"File":""}function cn(e){return e.text?h(e.text):e.imageCount?e.imageCount>1?`Image \xD7${e.imageCount}`:"Image":e.hasFiles?"File":""}var Rr=e=>e.matches(u.timelineScroll)&&getComputedStyle(e).flexDirection==="column-reverse";var Td=250,Cd=400,Md=6e4,Ld=5e3,kd=`:is(${u.turn}) :is(${u.turnBusy})`,x=$o(),mn=new Set,Dr=new Set,Pe=!1,ys=0,xt=null,wt=!1,un=!1,oo=0,fn=!1,no=null,bs=!1,R=()=>({generating:Pe,conversationId:b()}),As=()=>Xa()||!!yt()?.querySelector(kd);function Id(){let e=As();return e?un||(oo=0,fn=!0):un=!1,[...mn].some(t=>!Dr.has(t))||e&&!un||Date.now()<oo}function Bd(){return no?.error?"error":wt?"stopped":"done"}function Pd(){xt=null,Pe=!1,fn=!1,x.emit("fall",{conversationId:b(),outcome:Bd()}),wt=!1,no=null}function vs(){let e=Id();e&&!Pe&&(Pe=!0,ys=Date.now(),wt=!1,no=null,x.emit("rise",{conversationId:b()})),e||!Pe?xt=null:xt==null?xt=Date.now():Date.now()-xt>=Cd&&Pd()}function dn(){vs(),x.emit("tick",R())}function Od({prevId:e,id:t}){if(e===t)return;let o=!e&&!!t&&(Pe||Date.now()-ys<Md);if(!o&&Pe){for(let n of mn)Dr.add(n);un=As(),oo=0,fn=!1,xt=null,Pe=!1,wt=!1,no=null,x.emit("fall",{conversationId:e,outcome:"left"})}x.emit("context",{prevId:e,id:t,migrated:o}),dn()}function Rd(e){e.target instanceof Element&&e.target.closest(u.stopButton)&&(wt=!0,oo=0)}function qs(){bs||(bs=!0,W.on("generate-start",({requestId:e})=>{mn.add(e),dn()}),W.on("generate-end",e=>{mn.delete(e.requestId),!Dr.delete(e.requestId)&&(no=e,oo=e.handoff&&!e.error&&!wt&&!fn?Date.now()+Ld:0,dn())}),de(Od),document.addEventListener("click",Rd,!0),Ia(dn,Td),on().then(()=>E(vs)))}var xs={BetterNavigator:1793347117e3,BetterQuotes:179333264e4,ChatListStatus:179333264e4,ChatStateFavicons:1790623094e3,Cleaner:1793267811e3,ComposerOpacity:1793344667e3,Continue:1790939902e3,CustomSidebarIdentity:1790658669e3,GreetingCustomizer:1792014624e3,InputHistory:179333264e4,MessageTimestamps:1791080494e3,NoDictation:1793335268e3,NoShareLink:1790658669e3,NoSidebarIdentity:1790616549e3,PromptQueue:1793267321e3,RecentTopics:179333264e4,ResponseNotification:1790661368e3,Settings:1793347117e3,SidebarIdentityOpacity:1790682605e3,StarChats:1793347117e3,StreamerMode:1793344667e3,TemporaryChat:1792014624e3,UserQuotes:1793345744e3,WiderChat:179333264e4};var v=e=>`<svg class="bloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,Dd="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z",Hd={bloom:`<svg class="bloom-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${Dd}"/><circle cx="12" cy="12" r="3" fill="var(--bloom-surface, #fff)"/></svg>`,close:v('<path d="M18 6 6 18M6 6l12 12"/>'),gear:v('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),star:v('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),pin:v('<path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z"/>'),info:v('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h0"/>'),search:v('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),trash:v('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),edit:v('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),send:v('<path d="M12 19V5M5 12l7-7 7 7"/>'),copy:v('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),chevron:v('<path d="m6 9 6 6 6-6"/>'),play:v('<path d="M7 4v16l13-8z"/>'),plus:v('<path d="M12 5v14M5 12h14"/>'),check:v('<path d="m5 12 5 5 9-10"/>'),alert:v('<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16h0"/>'),bubble:v('<path d="M4 5h16v11H9l-5 4z"/>'),layout:v('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),eye:v('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeOff:v('<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.1 3.6M6.6 6.6A17 17 0 0 0 2 12s4 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/>'),clock:v('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),list:v('<path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/>'),bell:v('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>'),history:v('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v4l3 2"/>'),broom:v('<path d="m14 4 6 6M4 20l6-1 7-7-4-4-7 7z"/>'),width:v('<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>'),user:v('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),share:v('<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>'),mic:v('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),queue:v('<path d="M4 6h16M4 12h16M4 18h10"/>'),favicon:v('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/>'),spark:v('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),quote:v('<path d="M7 17a4 4 0 0 1-4-4V7h4M17 17a4 4 0 0 1-4-4V7h4"/>'),ghost:v('<path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>')},N=e=>ka(Hd[e]);var xe="data-bloom-tip",Hr=6,Nr=8,Ve,ws=null;function St(e){if(e===ws)return;if(ws=e,!e){Ve?.remove();return}Ve??=s("div",{class:"bloom-root bloom-tooltip",attrs:{role:"tooltip","data-bloom":"tooltip"}}),Ve.textContent=e.getAttribute(xe),document.body.append(Ve);let t=e.getBoundingClientRect(),{width:o,height:n}=Ve.getBoundingClientRect(),r=t.bottom+Hr+n<=innerHeight-Nr;Ve.style.left=`${se(t.left+t.width/2-o/2,Nr,innerWidth-o-Nr)}px`,Ve.style.top=`${r?t.bottom+Hr:t.top-Hr-n}px`}var Ss=e=>e instanceof Element?e.closest(`[${xe}]`):null;function Es(){let e=new AbortController,t={passive:!0,signal:e.signal};return document.addEventListener("pointerover",o=>St(Ss(o.target)),t),document.addEventListener("pointerout",o=>o.relatedTarget||St(null),t),document.addEventListener("focusin",o=>o.target instanceof Element&&o.target.matches(":focus-visible")&&St(Ss(o.target)),t),document.addEventListener("focusout",()=>St(null),t),document.addEventListener("pointerdown",()=>St(null),t),()=>{e.abort(),St(null)}}function Ur(e,t,o,n=!1){let r=s("button",{class:"bloom-switch",attrs:{type:"button",role:"switch","aria-checked":String(e),"aria-label":o,"data-bloom":"control",...n?{"aria-disabled":"true"}:{}}});return n||r.addEventListener("click",i=>{i.stopPropagation();let a=r.getAttribute("aria-checked")!=="true";r.setAttribute("aria-checked",String(a)),t(a)}),r}function j(e,t,o){return s("button",{class:Fo("bloom-button",o&&`bloom-button-${o}`),text:e,attrs:{type:"button","data-bloom":"control"},on:{click:t}})}function X(e,t,o,n){let r=s("button",{class:"bloom-icon-button",attrs:{type:"button","aria-label":t,"data-bloom":"control",[xe]:t},on:{click:o}},N(e));return n!=null&&r.setAttribute("aria-pressed",String(n)),r}function pn(e,t,o,n,r,i){let a=s("input",{attrs:{type:"range",min:String(t),max:String(o),step:String(n)}});a.value=String(e);let c=s("output",{text:`${a.value}${r}`});return a.addEventListener("input",()=>{c.textContent=`${a.value}${r}`,i(Number(a.value))}),s("div",{class:"bloom-slider"},a,c)}function Gr(e,t,o){let n=s("select",{class:"bloom-select"},...t.map(r=>s("option",{text:r.label,attrs:{value:r.value}})));return n.value=e,n.addEventListener("change",()=>o(n.value)),n}function ro(e,t,o="",n="text"){let r=s("input",{class:"bloom-input",attrs:{type:n,placeholder:o}});return r.value=e,r.addEventListener("change",()=>t(r.value)),r}var Nd=/^(?:free|plus|pro|team|business|enterprise|go|edu|免费版|免费)(?:\s+plan)?$/i,Ts=/\S+@\S+\.\S+/,Ud=3,Gd=/^\/g\/(g-p-[^/]+)\//,Fd=/^g-p-[0-9a-f]+-?/i,Cs=e=>!!e.closest(".sr-only"),Fr=e=>!!e?.querySelector(u.menuButton);function Ms(){return[...document.querySelectorAll(u.sidebarScroll)].map(e=>[e.nextElementSibling,e.parentElement?.nextElementSibling].find(Fr)).filter(e=>e!=null)}function Ls(){let e=[...document.querySelectorAll(u.oldProfile)];if(e.length)return e.map(o=>{let n=o.parentElement?.children.length===1?o.parentElement:o;return{kind:"profile",anchor:n,insert:r=>n.before(r)}});let t=Ms().map(o=>({kind:"expanded",anchor:o,insert:n=>o.prepend(n)}));for(let o of document.querySelectorAll(u.rail)){let n=[...o.children].find(Fr);n&&t.push({kind:"rail",anchor:n,insert:r=>n.before(r)})}return t}var Yr=e=>!e.closest("[data-bloom]")&&(!!e.querySelector("img, [class*=rounded-full]")||Ps(e).some(t=>!Cs(t))),ks=e=>[...e.parentElement?.children??[]].find(t=>t!==e&&t instanceof HTMLElement&&Yr(t))??null;function Is(){let e=[...document.querySelectorAll(u.oldProfile)];return e.length?e:[...Ms(),...[...document.querySelectorAll(u.rail)].map(o=>[...o.children].findLast(Fr))].map(o=>[...o?.querySelectorAll(u.menuButton)??[]].findLast(n=>Yr(n)||ks(n))).filter(o=>o!=null)}var Bs=()=>Is().map(e=>Yr(e)?e:ks(e)).filter(e=>e!=null);function Ps(e){return[...e.querySelectorAll("*")].filter(t=>!t.children.length&&!t.closest("[data-bloom]")&&!!h(t.textContent??"")&&!(t instanceof SVGElement))}var Yd=e=>{if(/rounded-full/.test(e.getAttribute("class")??""))return!0;if(!e.clientWidth)return!1;let{borderRadius:t}=getComputedStyle(e);return t.includes("%")||Number.parseFloat(t)>=e.clientWidth/2};function gn(e,t,o){for(let n of e.querySelectorAll(`[${t}]`))n!==o&&n.removeAttribute(t);o&&!o.hasAttribute(t)&&o.setAttribute(t,"")}function Kd(e,t){if(h(e.textContent??"").length>Ud)return null;let o=e.closest("button");for(let n=e;n&&n!==t&&n!==o;n=n.parentElement)if(Yd(n))return n;return null}function Kr(e,t){e.hasAttribute(`data-bloom-${t}`)||e.setAttribute(`data-bloom-${t}`,"");let o=e.querySelector("img:not([data-bloom] img)"),n=Ps(e),r=o?null:n.map(m=>Kd(m,e)).find(m=>m!=null),i=o?.closest("[class*=rounded-full]"),a=(i&&i!==e&&e.contains(i)?i:o??r)??e.querySelector("[class*=rounded-full]:not([data-bloom] *)");gn(e,`data-bloom-${t}-avatar`,a);let c=n.filter(m=>!a?.contains(m)&&!Cs(m)),l=c.find(m=>Nd.test(h(m.textContent??""))),d=c.find(m=>Ts.test(m.textContent??""));gn(e,`data-bloom-${t}-plan`,l),gn(e,`data-bloom-${t}-email`,d),gn(e,`data-bloom-${t}-name`,c.find(m=>m!==l&&m!==d))}function Qd(e){let t=e.getAttribute("aria-expanded")==="true"&&e.getAttribute("aria-controls"),o=t?document.getElementById(t):null;return o?.matches('[role="menu"]')?o:null}function hn(){return Is().map(Qd).find(e=>e!=null)??[...document.querySelectorAll('[role="menu"]')].find(e=>!e.closest("[data-bloom]")&&(Ts.test(e.textContent??"")||e.querySelector('[data-testid*="log-out" i], [data-testid*="logout" i]')))??null}var io=e=>[...document.querySelectorAll(u.conversationLink)].filter(t=>!t.closest("[data-bloom]")&&Br(t.href)===e);function Os(e){let t=io(e).find(o=>h(o.textContent??""));return t?h(t.textContent??""):null}function Rs(e){let t=new URL(e,location.origin).pathname.match(Gd)?.[1];if(!t)return null;let o=[...document.querySelectorAll(`a[href*="/g/${CSS.escape(t)}"]`)].find(n=>!Br(n.href)&&h(n.textContent??""));return o?h(o.textContent??""):t.replace(Fd,"").replaceAll("-"," ")||null}var Qr=0,bn;function Wd(e){if(!H(e))return;for(let o of Bs())Kr(o,"profile");let t=hn();t&&Kr(t,"menu")}function me(){Qr++;let e=!0;return ze().then(()=>{e&&Qr&&!bn&&(bn=E(Wd))}),()=>{e&&(e=!1,!--Qr&&(bn?.(),bn=void 0))}}var jd=new S("SettingsPanel"),g=M("bloom-settings-"),zd=10080*60*1e3,Vd=3e3,Ds="Toggle features. Some need a reload. Click the sliders icon to configure.",Jd=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Zd=[{label:"All",value:"all"},{label:"Enabled",value:"enabled"},{label:"Disabled",value:"disabled"}],Xd={favorites:"No favorites yet. Star a plugin to see it here.",recent:"No plugins updated in the last 7 days."},Ns=new Set(["chat","ui","privacy"]),V=null,Ze="all",Wr="all",yn="",jr=[],Us=()=>[...Ae.values()].filter(e=>!e.hidden),$d=e=>!!e.updatedAt&&Date.now()-e.updatedAt<zd;function _d(e){switch(Ze){case"favorites":return Vo.has(e.name);case"recent":return $d(e);case"all":return!0;case"other":return!e.tags.some(t=>Ns.has(t));case"chat":case"ui":case"privacy":return e.tags.includes(Ze)}}function em(e){switch(Wr){case"all":return!0;case"enabled":return ht(e);case"disabled":return!ht(e)}}function tm(e){let t=yn.trim().toLowerCase();return!t||[e.name,e.description,...e.tags].some(o=>o.toLowerCase().includes(t))}function om(e){let t=zo.list(),o=n=>t.includes(n.name)?t.indexOf(n.name):t.length;return Ze==="recent"?e.toSorted((n,r)=>(r.updatedAt??0)-(n.updatedAt??0)):e.toSorted((n,r)=>o(n)-o(r)||n.name.localeCompare(r.name))}var Gs=e=>e.settings?.def??{},nm=e=>Object.values(Gs(e)).some(t=>t.type!=="custom");function rm(e,t,o){let n=Ie(e.name,t)??xr(o),r=i=>Qe(e.name,t,i);switch(o.type){case"boolean":return Ur(n,r,o.description??t);case"slider":return pn(n,o.min,o.max,o.step??1,o.unit??"",r);case"select":return Gr(n,o.options,r);case"string":return ro(n,r,o.placeholder);case"number":return ro(String(n),i=>r(Number(i)),"","number");case"component":{let i=s("div",{class:g("component")});return jr.push(o.render(i)),i}case"custom":return null}}var im=e=>e.replaceAll(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());function Fs(e){if(!V)return;let t=Object.entries(Gs(e)).filter(([,i])=>i.type!=="custom").map(([i,a])=>{let c=rm(e,i,a),l=a.type==="boolean",d=a.type!=="component"&&s("div",{class:g("field-label"),text:im(i)}),m=a.description&&s("div",{class:g("field-desc"),text:a.description});return s("div",{class:g("field",l?"field-inline":"field-stacked")},(d||m)&&s("div",{class:g("field-text")},d,m),c)}),o,n=j("Reset",()=>{if(!o){n.textContent="Click again to reset",o=setTimeout(()=>{o=void 0,n.textContent="Reset"},Vd);return}clearTimeout(o),e.settings?.reset(),ao(),Fs(e)},"danger"),r=s("div",{class:g("popup-backdrop"),on:{click:i=>i.target===i.currentTarget&&ao()}},s("div",{class:g("popup"),attrs:{role:"dialog","aria-label":`${e.name} settings`}},s("div",{class:g("popup-header")},s("div",{class:g("card-icon")},N(e.icon)),s("div",{class:g("popup-title")},s("div",{class:g("card-name"),text:e.name}),s("div",{class:g("popup-authors"),text:e.authors.join(", ")})),X("close","Close",ao)),s("p",{class:g("popup-desc"),text:e.description}),s("div",{class:g("fields")},...t),s("div",{class:g("popup-footer")},n)));V.querySelector(`.${g("modal")}`)?.append(r)}function ao(){for(let e of jr)e();jr=[],V?.querySelector(`.${g("popup-backdrop")}`)?.remove()}function Hs(e){let t=ht(e),o=Vo.has(e.name),n=zo.has(e.name),r=!!e.required;return s("div",{class:[g("card",t?"card-on":"card-off"),r?g("card-required"):""].filter(Boolean).join(" ")},s("div",{class:g("card-top")},s("div",{class:g("card-icon")},N(e.icon)),s("div",{class:g("card-actions")},X("star",o?"Unstar":"Star",()=>{Vo.toggle(e.name),Je()},o),r?null:X("pin",n?"Unpin":"Pin to top",()=>{zo.toggle(e.name),Je()},n),r?s("span",{class:g("required-mark"),attrs:{"aria-label":"Required",[xe]:"This plugin is required for Bloom++ to work"}},N("alert")):null,nm(e)&&X("gear","Settings",()=>Fs(e)),Ur(t,i=>Ka(e,i),r?`${e.name} is required`:`Enable ${e.name}`,r))),s("div",{class:g("card-name"),text:e.name}),s("div",{class:g("card-desc"),text:e.description,title:e.description}),s("div",{class:g("card-footer"),text:e.authors.join(", ")}))}function Ys(){let e=Us().some(o=>!o.tags.some(n=>Ns.has(n)));V?.querySelector(`.${g("tabs")}`)?.replaceChildren(...Jd.filter(o=>o.id!=="other"||e).map(o=>s("button",{class:g("tab"),text:o.label,attrs:{type:"button",role:"tab","aria-selected":String(o.id===Ze)},on:{click:()=>{Ze=o.id,Ys(),Je()}}})))}function Je(){if(!V)return;let e=Us().filter(_d),t=V.querySelector(`.${g("search")} input`);t&&(t.placeholder=`Search ${Uo(e.length,"plugin")}...`);let o=om(e.filter(d=>tm(d)&&em(d))),n=Ze==="all",r=n?o.filter(d=>!d.required):o,i=n?o.filter(d=>d.required):[],a=[...r.map(Hs),...i.length?[s("div",{class:g("required-break"),attrs:{role:"separator"}}),...i.map(Hs)]:[]],c=yn.trim()?"No plugins match your search.":Xd[Ze]??"No plugins available.";V.querySelector(`.${g("grid")}`)?.replaceChildren(...a.length?a:[s("div",{class:g("empty"),text:c})])}function am(e){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),V?.querySelector(`.${g("popup-backdrop")}`)?ao():Et())}var Ks,zr;function sm(){if(V)return;let e=s("input",{class:"bloom-input",attrs:{type:"search","aria-label":"Search plugins"}});e.value=yn,e.addEventListener("input",()=>{yn=e.value,Je()}),V=s("div",{class:`bloom-root ${g("backdrop")}`,attrs:{"data-bloom":"settings"},on:{click:t=>t.target===t.currentTarget&&Et()}},s("div",{class:g("modal"),attrs:{role:"dialog","aria-modal":"true","aria-label":"Bloom++ settings"}},s("div",{class:g("header")},s("div",{class:g("logo")},N("bloom")),s("h2",{class:g("title"),text:"Bloom++"}),s("span",{class:g("hint"),attrs:{"aria-label":Ds,tabindex:"0",[xe]:Ds}},N("info")),s("span",{class:g("version"),text:"v2.0.86"}),X("close","Close",Et)),s("div",{class:g("tabs"),attrs:{role:"tablist"}}),s("div",{class:g("toolbar")},s("label",{class:g("search")},N("search"),e),Gr(Wr,Zd,t=>{Wr=t,Je()})),s("div",{class:g("grid")}))),V.addEventListener("keydown",t=>t.stopPropagation()),zr=new AbortController,document.addEventListener("keydown",am,{capture:!0,signal:zr.signal}),document.body.append(V),Ys(),Je(),Ks=ja(Je),e.focus(),jd.debug("Opened")}function Et(){ao(),zr?.abort(),Ks?.(),V?.remove(),V=null}var An=()=>V?Et():sm();var Qs=`/*
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
`;var Oe=M("bloom-entry-"),cm=4,Vr="--bloom-entry-x",Jr=1,Tt=p({showSidebarEntry:{type:"boolean",description:"Always show the Bloom++ button above the account row in the sidebar. The account menu and the userscript menu always open the panel.",default:!1},showSidebarEntryOnHover:{type:"boolean",description:"Show the Bloom++ button while the pointer is over the account row in the sidebar.",default:!0},resetEntryPosition:{type:"component",description:"Drag the hover button sideways to move it. Reset puts it back on the right.",render:e=>(e.append(j("Reset position",()=>{Tt.store.entryPosition=Jr})),()=>e.replaceChildren())},entryPosition:{type:"custom",default:Jr}}),Xe=new Map,Ws=!1,js=[];function um(e,t,o){let n=e.currentTarget,r=t.clientWidth-n.offsetWidth;if(e.button!==0||r<=0||!t.classList.contains(Oe("hover")))return;let i=Tt.store.entryPosition,a=i,c=!1,l=new AbortController;n.setPointerCapture(e.pointerId),n.addEventListener("pointermove",m=>{!c&&Math.abs(m.clientX-e.clientX)<cm||(c=!0,o(),a=se(i+(m.clientX-e.clientX)/r,0,Jr),t.style.setProperty(Vr,String(a)))},{signal:l.signal});let d=()=>{l.abort(),c&&(Tt.store.entryPosition=a,t.style.removeProperty(Vr))};n.addEventListener("pointerup",d,{signal:l.signal}),n.addEventListener("lostpointercapture",d,{signal:l.signal})}function dm(e){let t=!1,o=s("button",{class:Oe("button"),title:"Bloom++ settings",attrs:{type:"button","aria-label":"Bloom++ settings"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),t||An(),t=!1},pointerdown:r=>{t=!1,e!=="rail"&&um(r,n,()=>{t=!0})}}},N("bloom"),e!=="rail"&&s("span",{class:Oe("label"),text:"Bloom++"})),n=s("div",{class:`bloom-root ${Oe("wrap")} ${Oe(e)}`,attrs:{"data-bloom":"entry"}},o);return n}function mm(e){let t=s("div",{class:`bloom-root ${Oe("menu-item")}`,attrs:{role:"menuitem",tabindex:"-1","data-bloom":"menu-entry"},on:{click:n=>{n.preventDefault(),n.stopPropagation(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),An()}}},N("bloom"),s("span",{text:"Bloom++"})),o=e.querySelector('[role="menuitem"]');o?.parentElement?o.before(t):e.prepend(t)}function zs(){let{showSidebarEntry:e,showSidebarEntryOnHover:t}=Tt.store,o=e||t?Ls():[];for(let[r,i]of Xe)r.isConnected&&o.some(a=>a.anchor===r)||(i.remove(),Xe.delete(r));for(let r of o){let i=Xe.get(r.anchor);if(i?.isConnected||!qe(r.anchor))continue;let a=i??dm(r.kind);Xe.set(r.anchor,a),r.insert(a)}for(let r of Xe.values())r.classList.toggle(Oe("hover"),!e);let n=hn();n&&!n.querySelector('[data-bloom="menu-entry"]')&&mm(n)}var Vs=f({name:"Settings",description:"Bloom++ settings panel and its entries in the account menu and sidebar.",authors:["Bloom contributors"],tags:[],icon:"bloom",required:!0,startAt:"HostReady",settings:Tt,styles:()=>`${Qs}.${Oe("hover")}{${Vr}:${Tt.store.entryPosition}}`,start(){js=[E(zs),Es(),me()],!Ws&&typeof GM_registerMenuCommand=="function"&&(GM_registerMenuCommand("Bloom++ settings",An),Ws=!0)},stop(){for(let e of js)e();for(let e of Xe.values())e.remove();Xe.clear(),Et()},onSettingsChange:zs});var fm=80,pm=420;function Zr(e,t,o){return(e.x-o.x)*(t.y-o.y)-(t.x-o.x)*(e.y-o.y)}function gm(e,t,o,n){let r=Zr(e,t,o),i=Zr(e,o,n),a=Zr(e,n,t);return!((r<0||i<0||a<0)&&(r>0||i>0||a>0))}function hm(e,t){let o=(t.left+t.right)/2-(e.left+e.right)/2,n=(t.top+t.bottom)/2-(e.top+e.bottom)/2;if(Math.abs(o)>=Math.abs(n)){let i=o<0?t.right:t.left;return[{x:i,y:t.top},{x:i,y:t.bottom}]}let r=n<0?t.bottom:t.top;return[{x:t.left,y:r},{x:t.right,y:r}]}function Js(e,t){let o=se(e.x,t.left,t.right),n=se(e.y,t.top,t.bottom);return Math.hypot(e.x-o,e.y-n)}function vn(e){let t=e.closeDelay??fm,o=e.towardDelay??pm,n=0,r=!1,i=null,a=null,c=()=>{document.removeEventListener("pointermove",y,!0)},l=()=>{n&&window.clearTimeout(n),n=0,c(),i=null,a=null},d=()=>{l(),r&&(r=!1,e.setHeld(!1))},m=()=>{r||(r=!0,e.setHeld(!0))},A=q=>{n&&window.clearTimeout(n),n=window.setTimeout(d,q)},F=q=>{let te=e.panel(),ft=e.trigger();if(!te||!i)return!1;let Z=te.getBoundingClientRect();if(Z.width<=0&&Z.height<=0)return!1;let Y=ft?.getBoundingClientRect(),[hr,Iu]=Y&&(Y.width||Y.height)?hm(Y,Z):[{x:Z.left,y:Z.top},{x:Z.right,y:Z.bottom}];return gm(q,i,hr,Iu)?!0:a!=null&&Js(q,Z)<Js(a,Z)-.25},y=q=>{let te={x:q.clientX,y:q.clientY};if(e.over(q.target)){l();return}F(te)?A(o):d(),a=te};return{enter(){l()},leave(q){if(e.over(q.relatedTarget)){l();return}i={x:q.clientX,y:q.clientY},a=i,m(),document.addEventListener("pointermove",y,!0),A(t)},dispose(){l(),r=!1}}}var Zs=`/*
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
`;var C=M("bloom-nav-"),wn=80,ym=1200,Am=2,Xs=3e4,vm=200,qm=.9,xm=.28,wm=24,Ct=8,Sm=80,Em=12,Tm={user:"\u2753",assistant:"\u{1F916}"},Cm=["wheel","touchmove","pointerdown"],En=p({showAssistant:{type:"boolean",description:"List ChatGPT's replies in the navigator too, not only your messages.",default:!0},jumpEffect:{type:"select",description:"Effect on the message you jump to.",options:[{label:"Border",value:"border"},{label:"None",value:"none"}],default:"border"}}),T=null,O=[],ae=-1,et=-1,Mt=null,qn="",$r=0,$s=[],uo=null,xn=null,$e,so,_e,_r="",lo=[],Sn=null,ei=new Set,Mm=e=>En.store.showAssistant||e.role==="user",Lm=e=>e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.messageIds[0]||e.role;function km(e){return{role:e.role,summary:qt(e),ids:e.messageIds,turn:e,streaming:e.streaming}}function nl(e,t){let o=e.entries.at(-1);if(o?.role==="assistant"&&t.role==="assistant"){e.entries[e.entries.length-1]={...t,ids:[...new Set([...o.ids,...t.ids])]};return}e.entries.push(t)}function Im(){let e=[];for(let t of Be()){let o=km(t),n=Lm(t),r=e.at(-1);r?.key===n?nl(r,o):e.push({key:n,entries:[o]})}return e}function Bm(){let e=[];for(let t of le(b())?.chain??[]){let o={role:t.role,summary:cn(t),ids:[t.id],turn:null,streaming:!1},n=e.at(-1);t.role==="assistant"&&n?nl(n,o):e.push({key:t.id,entries:[o]})}return e}var Lt=e=>e.entries.flatMap(t=>t.ids);function ti(e,t){let o=new Set(Lt(e));return Lt(t).some(n=>o.has(n))}var tt=e=>h(e.entries.find(t=>t.role==="user")?.summary??""),Xr=(e,t)=>e.filter(o=>tt(o)===t).length,oi=e=>({...e,turn:null,streaming:!1});function Pm(e,t){let o=new Set(t.flatMap(n=>n.entries.map(r=>r.turn?.el)).filter(n=>n!=null));return e.map(n=>({key:n.key,entries:n.entries.map(r=>{let i=r.turn?.el;if(!i||!i.isConnected||o.has(i))return oi(r);let a=i.closest("[data-turn-key]")?.getAttribute("data-turn-key");return a&&a!==n.key?oi(r):r})}))}function Om(e,t){let o=t.entries.map((n,r)=>{let i=e.entries[r];if(!i)return n;let a=[...new Set([...n.ids,...i.ids])];return{...n,ids:a,summary:n.summary||i.summary}});for(let n of e.entries.slice(o.length))o.push(oi(n));return{key:e.key,entries:o}}function rl(){let e=to();if(!e)return!1;let t=e.clientHeight-e.scrollHeight;return e.scrollTop-t<=Math.abs(e.scrollTop)}function Rm(e,t){let o=Pm(e,t);if(!t.length)return o;if(!o.length)return t;let n=t.findIndex(l=>o.some(d=>d.key===l.key));if(n<0)return rl()?t.concat(o):o.concat(t);let r=t[n]?.key,i=o.findIndex(l=>l.key===r),a=o.slice(0,i).concat(t.slice(0,n),o.slice(i)),c=a.findIndex(l=>l.key===r);for(let l=n;l<t.length;l++){let d=t[l];if(!d)continue;let m=a.findIndex(A=>A.key===d.key);if(m>=0){let A=a[m];A&&(a[m]=Om(A,d)),c=m}else a.splice(c+1,0,d),c++}return a}function Dm(e,t){let o=0,n=0,r=0;for(let i=1-e.length;i<t.length;i++){let a=0,c=0;for(let d=0;d<e.length;d++){let m=t[d+i],A=e[d];!m||!A||(ti(A,m)?(a+=3,c++):tt(A)&&tt(A)===tt(m)&&a++)}let l=rl()?i<r:i>r;(a>o||a===o&&c>n||a===o&&c===n&&l)&&(o=a,n=c,r=i)}return{score:o,offset:r}}function Hm(e,t){let o=e.entries.map((n,r)=>{let i=t.entries[r];return i?{...n,ids:[...new Set([...n.ids,...i.ids])],summary:n.summary||i.summary}:n});for(let n of t.entries.slice(o.length))o.push({...n,turn:null});return{key:e.key,entries:o}}function Nm(e){return e.map(t=>({key:t.key,entries:t.entries.map(o=>({...o}))}))}function Um(e,t){if(!t.length)return e;if(!e.length)return t;let{score:o,offset:n}=Dm(e,t),r=Nm(e);if(o>0)for(let c=0;c<r.length;c++){let l=t[c+n],d=r[c];if(!l||!d)continue;let m=tt(d),A=!!m&&m===tt(l)&&Xr(e,m)===1&&Xr(t,m)===1;(ti(d,l)||A)&&(r[c]=Hm(d,l))}let i=[],a=[];for(let c=0;c<t.length;c++){let l=t[c];if(!l)continue;let d=tt(l);!d||Xr(r,d)>0||r.some(m=>ti(m,l))||(o>0&&c<n?i.push(l):a.push(l))}return i.concat(r,a)}var ni=e=>e.entries.some(t=>t.turn?.el.isConnected);function Gm(e,t,o){let n=e.findIndex(i=>Lt(i).includes(t));if(n>=0)return n+1;let r=e.find(ni);return o&&r&&Lt(r).includes(o)?0:e.length}function Fm(e){if(Sn){let{parent:t,user:o}=Sn;for(let n of e.slice(Gm(e,t,o))){let r=Lt(n);if(!ni(n)&&!(o&&r.includes(o)))for(let i of r)ei.add(i)}}return e.filter(t=>ni(t)||!Lt(t).some(o=>ei.has(o)))}function il(){lo=[],Sn=null,ei.clear()}function Ym(){let e=ps();e!==_r&&(_r=e,il());let t=Im(),o=Bm();return!t.length&&!o.length&&!fs()?(lo=[],[]):(lo=Fm(Um(Rm(lo,t),o)),lo.flatMap(n=>n.entries).filter(Mm))}function Km(e){for(let o of e)o.streaming=!!o.turn?.el.isConnected&&!!o.turn.streaming;if(!R().generating||e.some(o=>o.streaming))return;let t=e.at(-1);t&&(t.role==="assistant"||!En.store.showAssistant?t.streaming=!0:e.push({role:"assistant",summary:"",ids:[],turn:null,streaming:!0}))}function al(){let e=Ym();return Km(e),e}function sl(e){let t=e.getBoundingClientRect(),o=Q()?.getBoundingClientRect().top,n=Math.min(t.bottom,o&&o>t.top?o:t.bottom);return{top:t.top,bottom:n}}function ll(e){return((e.matches(".whitespace-pre-wrap, .markdown, .prose, [data-markdown-text-style]")?e:e.querySelector(".whitespace-pre-wrap")??e.querySelector(".markdown, .prose, [data-markdown-text-style]"))??e).getBoundingClientRect().top}function _s(e){let t=O[e]?.turn?.el;return t?.isConnected?t:null}function Qm(e){if(!O.length)return null;let t=e.scrollHeight-e.clientHeight,o=Rr(e),n=Math.min(e.scrollTop,0),r=o?-n:t-e.scrollTop,i=o?t+n:e.scrollTop,a=t<=Ct||r<=Ct,c=t>Ct&&i<=Ct,{top:l,bottom:d}=sl(e),m=_s(0),A=m?ll(m):Number.NaN,F=!!m&&A>=l-Ct&&A<=l+48,y=_s(O.length-1),q=y?.getBoundingClientRect().bottom??Number.NaN,te=!!y&&q<=d+Ct&&q>=d-Sm;return a||te?"bottom":c||F?"top":null}function Wm(e){let{top:t,bottom:o}=sl(e),n=t+Math.max(o-t,0)*xm,r=[],i=-1;if(O.forEach((c,l)=>{let d=c.turn?.el;if(!d?.isConnected){r.push(Number.NaN);return}let m=ll(d);r.push(m),i<0&&(i=l),m<=n&&(i=l)}),i<0)return Math.max(O.findIndex(c=>c.turn),0);let a=r[ae];return Number.isFinite(a)?i===ae?ae:i>ae?i:a<=n+wm?ae:i:i}function jm(e){let t=Qm(e);return t==="bottom"?O.length-1:t==="top"?0:Wm(e)}function el(e){En.store.jumpEffect==="border"&&(e.classList.add(C("flash")),setTimeout(()=>e.classList.remove(C("flash")),ym))}function Tn(e){let t=O[e],o=to();if(!t||!o)return;if(!t.turn&&!t.ids.length){et=e,co(),o.scrollTo({top:Rr(o)?0:o.scrollHeight});return}et=e,Mt=e?null:{chat:b(),first:t.ids[0],until:Date.now()+Xs},co();let n=t.turn?.el;if(n?.isConnected){let d=Math.abs(n.getBoundingClientRect().top-o.getBoundingClientRect().top);n.scrollIntoView({block:"start",behavior:d<o.clientHeight*Am?"smooth":"auto"}),el(n);return}let r=O.findIndex(d=>d.turn),i=r>=0&&e<r?-1:1,a=++$r,c=Date.now()+Xs,l=()=>{let d=to();if(a!==$r||Date.now()>c||!d)return;O=al();let m=O.find(F=>F.ids.some(y=>t.ids.includes(y)))?.turn?.el;if(m){m.scrollIntoView({block:"start"}),el(m),et=O.findIndex(F=>F.turn?.el===m),co();return}let A=d.scrollTop;d.scrollBy({top:i*d.clientHeight*qm,behavior:"instant"}),d.scrollTop===A?setTimeout(l,vm):requestAnimationFrame(l)};l()}function zm(e,t){return s("button",{class:C("row"),attrs:{type:"button","data-index":String(t),"data-message-id":e.ids[0]??""},on:{click:()=>Tn(t)}},s("span",{text:Tm[e.role]}),s("span",{class:"bloom-truncate",text:ce(e.summary||"\u2026",wn)}))}function tl(e){if(!T)return;let t=e.getBoundingClientRect(),o=Q()?.getBoundingClientRect().top,r=Math.min(t.bottom,o&&o>t.top?o:t.bottom)-t.top;T.style.right=`${document.documentElement.clientWidth-t.left-e.clientLeft-e.clientWidth+Em}px`,T.style.top=`${t.top}px`,T.style.height=r>1?`${r}px`:""}function Vm(){let e=to();if(O=al(),!O.length||!e){_e?.dispose(),_e=void 0,T?.remove(),T=null,qn="";return}if(uo!==e){so?.abort(),so=new AbortController,e.addEventListener("scroll",ke(co),{passive:!0,signal:so.signal});for(let n of Cm)e.addEventListener(n,cl,{passive:!0,signal:so.signal});uo=e,$e?.disconnect(),$e=new ResizeObserver(()=>{e.isConnected&&tl(e)}),$e.observe(e),xn=null}let t=Q();t&&t!==xn&&$e&&($e.observe(t),xn=t),T||(T=s("div",{class:`bloom-root ${C("root")}`,attrs:{"data-bloom":"navigator"},on:{pointerenter:()=>_e?.enter(),pointerleave:n=>_e?.leave(n)}},s("div",{class:C("rail")}),s("div",{class:C("bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:C("toc")},s("div",{class:C("toc-head")}),s("div",{class:C("toc-list")}))),_e=vn({over:n=>n instanceof Node&&!!T?.contains(n),trigger:()=>T?.querySelector(`.${C("rail")}`),panel:()=>T?.querySelector(`.${C("toc")}`),setHeld:n=>T?.classList.toggle(C("open"),n)})),T.isConnected||document.body.append(T),tl(e);let o=JSON.stringify(O.map(n=>[n.role,n.ids]));o!==qn?(qn=o,et=-1,Zm(),Mt&&Date.now()<Mt.until&&Mt.chat===b()&&O[0]?.ids[0]!==Mt.first&&Tn(0)):Jm(),co()}function co(){if(!T||!uo)return;ae=et>=0?et:jm(uo),T.querySelectorAll(`.${C("tick")}`).forEach((t,o)=>t.classList.toggle(C("tick-current"),o===ae)),T.querySelectorAll(`.${C("row")}`).forEach(t=>t.setAttribute("aria-current",String(Number(t.dataset.index)===ae)));let e=T.querySelector(`.${C("toc-head")}`);e&&(e.textContent=`${ae+1} / ${O.length}`)}function Jm(){T?.querySelectorAll(`.${C("tick")}`).forEach((e,t)=>{let o=O[t],n=ce(o.summary,wn);e.title!==n&&(e.title=n),e.classList.toggle(C("tick-streaming"),o.streaming)}),T?.querySelectorAll(`.${C("row")}`).forEach(e=>{let t=e.lastElementChild,o=ce(O[Number(e.dataset.index)].summary||"\u2026",wn);t&&t.textContent!==o&&(t.textContent=o)})}function Zm(){T?.querySelector(`.${C("rail")}`)?.replaceChildren(...O.map((t,o)=>s("button",{class:Fo(C("tick"),C(`tick-${t.role}`),t.streaming&&C("tick-streaming"),o===ae&&C("tick-current")),title:ce(t.summary,wn),attrs:{type:"button","aria-label":`Jump to message ${o+1}`,"data-message-id":t.ids[0]??""},on:{click:()=>Tn(o)}}))),T?.querySelector(`.${C("toc-list")}`)?.replaceChildren(...O.map(zm))}var fe=ke(Vm);function cl(){et=-1,Mt=null,$r++}var Xm=e=>!!e&&(e.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']")||!!e.closest("[contenteditable='true']"));function ol(e){if(!T||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||Xm(document.activeElement)||K("[data-bloom='settings'], [role='dialog']"))return;let o={ArrowUp:ae-1,ArrowDown:ae+1,Home:0,End:O.length-1}[e.key];if(o==null){cl();return}o<0||o>=O.length||(e.preventDefault(),e.stopPropagation(),Tn(o))}var ul=f({name:"BetterNavigator",description:"An outline beside the thread: one tick per message, hover for the list, click to jump.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",enabledByDefault:!0,settings:En,styles:Zs,start(){$s=[E(e=>H(e)&&fe()),de(fe),W.on("conversation",fe),W.on("generate-start",({parentId:e,userId:t})=>{e&&(Sn={parent:e,user:t},fe())}),x.on("rise",fe),x.on("fall",fe)],addEventListener("keydown",ol,!0),addEventListener("resize",fe,{passive:!0}),fe()},stop(){for(let e of $s)e();so?.abort(),$e?.disconnect(),$e=void 0,uo=null,xn=null,removeEventListener("keydown",ol,!0),removeEventListener("resize",fe),_e?.dispose(),_e=void 0,T?.remove(),T=null,qn="",il(),_r=""},onSettingsChange:fe});var dl=`/*
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
`;var $=M("bloom-quotes-"),mi="BloomBetterQuotes",_m=40,gl=8,ef=1800,si=/close|remove|dismiss|clear|delete|取消|关闭|删除|移除/i,ml=/submit|send|attach|dictat|stop|voice|mic|model|file|发送|听写|停止/i,ot=p({jumpToPassage:{type:"boolean",description:"Click a quote to jump to the passage, and the badge to jump back.",default:!0},persistAcrossChats:{type:"boolean",description:"Keep the composer quote card when switching chats and coming back.",default:!0}}),ri,ii,kt,ai=!1,li=0,Cn=null,Mn=null,we=null;function fi(){return location.pathname.match(/\/c\/(?!local-)([\w-]+)/)?.[1]??(new URLSearchParams(location.search).get("temporary-chat")==="true"?"temporary":"draft")}function kn(){try{let e=JSON.parse(sessionStorage.getItem(mi)??"[]");return Array.isArray(e)?e.filter(t=>!!t&&typeof t=="object"&&typeof t.id=="string"&&typeof t.text=="string"&&!!t.text):[]}catch{return[]}}function pi(e){try{sessionStorage.setItem(mi,JSON.stringify(e.slice(-_m)))}catch{}}function mo(e){return kn().find(t=>t.id===e)?.text??""}function tf(e,t){let o=kn().filter(n=>n.id!==e);o.push({id:e,text:t}),pi(o)}function ci(e=fi()){pi(kn().filter(t=>t.id!==e)),Ln()}function of(e){let t=mo("draft");if(!t||mo(e))return;let o=kn().filter(n=>n.id!=="draft");o.push({id:e,text:t}),pi(o)}function ui(e){return`${e.getAttribute("aria-label")??""} ${e.getAttribute("title")??""}`}function nf(e){let t=ui(e);return ml.test(t)&&!/quote|引用/.test(t)?!1:/quote|引用/.test(t)&&si.test(t)?!0:si.test(t)&&!ml.test(t)}function hl(e){let t=e.cloneNode(!0),o=[...t.querySelectorAll("button, [role='button']")],n=new Set(o.map(r=>r.getAttribute("aria-label")).filter(Boolean));for(let r of o)r.remove();for(let r of t.querySelectorAll("*"))!r.children.length&&n.has(h(r.textContent??""))&&r.remove();return h(t.textContent??"")}function rf(e){let t=Q(),o=e.parentElement,n=0;for(;o&&o!==t&&n<5;){if(n++,o.matches(u.composerInput)||o.querySelector(u.composerInput)||o.closest("aside, [role='status'], [role='alert']")||o.querySelector("h1, h2, h3, h4, h5, h6"))return null;let r=hl(o);if(r.length>=2&&r.length<=240)return o;o=o.parentElement}return null}function In(){let e=Q();if(!e)return null;for(let t of e.querySelectorAll("button, [role='button']")){if(t.closest("[data-bloom]")||!nf(t))continue;let o=rf(t),n=o?hl(o):"";if(o&&n.length>=2)return{row:o,text:n,dismiss:t}}return null}function af(e){let t=e.closest(u.searchUnit)??e.closest(u.oldMessage);return t&&(At(t)??t.getAttribute("data-message-author-role"))==="user"?t:null}function gi(e){return h(e).slice(0,48)}function sf(e,t){let o=gi(e);if(o.length<gl)return null;let n=null;for(let r of vt()){if(t&&(r===t||t.contains(r)||r.contains(t)))continue;let i=h(r.textContent??"");if(!i.includes(o))continue;let a=o.length/Math.max(i.length,1);(!n||a>n.score)&&(n={el:r,score:a})}return n?.el??null}function lf(e,t){let o=gi(t),n=e;for(let r of e.querySelectorAll("p, li, blockquote, pre, h1, h2, h3"))if(!r.closest("[data-bloom]")&&h(r.textContent??"").includes(o)){n=r;break}document.querySelector(`.${$("hit")}`)?.classList.remove($("hit")),n.classList.add($("hit")),window.clearTimeout(li),li=window.setTimeout(()=>n.classList.remove($("hit")),ef)}function fl(e){let t=e.closest(u.timelineScroll)??document.scrollingElement;if(!(t instanceof HTMLElement)&&t!==document.scrollingElement)return;let o=e.getBoundingClientRect();if(o.height<1||!t)return;let n=t.getBoundingClientRect(),r=Q()?.getBoundingClientRect(),i=r&&r.top>n.top?r.top:n.bottom,a=o.top+o.height/2-(n.top+i)/2;Math.abs(a)<8||t.scrollTo({top:t.scrollTop+a,behavior:"smooth"})}function hi(){if(!we||!Cn?.isConnected)return;let e=Cn.getBoundingClientRect();e.width<1||(we.style.top=`${Math.max(8,e.top+8)}px`,we.style.left=`${Math.max(8,e.right-we.offsetWidth-8)}px`)}function cf(e,t,o){Cn=e,Mn=t,we??=s("button",{class:`bloom-root ${$("back")}`,attrs:{type:"button","data-bloom":"quote-back","aria-label":"Back to quote"},text:"Back"}),we.isConnected||document.body.append(we),lf(e,o),hi()}function pl(){we?.remove(),we=null,Cn=null,Mn=null,document.querySelector(`.${$("hit")}`)?.classList.remove($("hit"))}function bl(){return document.querySelector('[data-bloom="quote-chip"]')}function Ln(){bl()?.remove()}function uf(e){let o=Q()?.getBoundingClientRect();!o||o.width<8||(e.style.width=`${Math.max(120,o.width-24)}px`,e.style.left=`${o.left+12}px`,e.style.top=`${Math.max(8,o.top-e.offsetHeight-8)}px`)}function df(e){let t=bl();t||(t=s("div",{class:`bloom-root ${$("chip")}`,attrs:{"data-bloom":"quote-chip"}},s("span",{class:$("text")}),s("button",{class:$("x"),attrs:{type:"button","aria-label":"Remove quote"},text:"\xD7"})),document.body.append(t));let o=t.querySelector(`.${$("text")}`),n=h(e);o&&o.textContent!==n&&(o.textContent=n),t.dataset.text=e,uf(t)}function di(){if(!ai){ai=!0;try{let e=fi(),t=In();ot.store.persistAcrossChats&&t&&mo(e)!==t.text&&tf(e,t.text);let o=ot.store.persistAcrossChats?mo(e):"";!o||t&&h(t.text)===h(o)?Ln():df(o),hi()}finally{ai=!1}}}function mf(e){let t=e.closest('[data-bloom="quote-chip"]');if(t instanceof HTMLElement&&!e.closest(`.${$("x")}`)){let i=t.dataset.text??t.querySelector(`.${$("text")}`)?.textContent??"";return i?{text:i,skip:null,origin:t}:null}let o=e.closest("blockquote");if(o instanceof HTMLElement&&!e.closest("a, button")){let i=af(o),a=h(o.textContent??"");if(i&&a)return{text:a,skip:i,origin:o}}let n=Q();if(!n||!n.contains(e)||je(e)||e.closest("button, [role='button']"))return null;let r=In();return!r||!r.row.contains(e)?null:{text:r.text,skip:null,origin:r.row}}function ff(e){let{target:t}=e;if(!(t instanceof Element))return;if(t.closest('[data-bloom="quote-back"]')){e.preventDefault(),e.stopPropagation(),Mn?.isConnected&&fl(Mn);return}if(t.closest(`.${$("x")}`)){e.preventDefault(),e.stopPropagation(),ci();return}let o=In();if(o&&(t===o.dismiss||o.dismiss.contains(t))){ci();return}if(pf(t)&&yl(),!ot.store.jumpToPassage)return;let n=mf(t);if(!n)return;let r=sf(n.text,n.skip);r&&(e.preventDefault(),e.stopPropagation(),cf(r,n.origin,n.text),fl(r))}function pf(e){let t=e.closest("button, [role='button']");return!(t instanceof HTMLElement)||t.closest("[data-bloom]")||!Q()?.contains(t)?!1:/send|submit|发送|提交/i.test(ui(t))&&!si.test(ui(t))}function gf(e){return!(e instanceof KeyboardEvent)||e.key!=="Enter"||e.shiftKey||e.isComposing?!1:je(e.target)}function yl(){if(!ot.store.persistAcrossChats)return;let e=fi(),t=mo(e);if(t){if(!In()){let o=k(),n=gi(t);n.length>=gl&&!h(o).includes(n)&&ie(`> ${t}

${o}`.trim())}ci(e)}}function hf(e){gf(e)&&yl()}function bf(e){!e.prevId&&e.id&&of(e.id),di()}var Al=f({name:"BetterQuotes",description:"Jump between a quote and its source, and keep the composer quote card when switching chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,settings:ot,styles:dl,onSettingsChange(e){e==="jumpToPassage"&&!ot.store.jumpToPassage&&pl(),e==="persistAcrossChats"&&!ot.store.persistAcrossChats&&(sessionStorage.removeItem(mi),Ln()),di()},start(){kt=new AbortController,document.addEventListener("pointerdown",ff,{capture:!0,signal:kt.signal}),document.addEventListener("keydown",hf,{capture:!0,signal:kt.signal}),addEventListener("scroll",hi,{capture:!0,passive:!0,signal:kt.signal}),ii=de(bf),ri=E(e=>H(e)&&di())},stop(){kt?.abort(),kt=void 0,ii?.(),ii=void 0,ri?.(),ri=void 0,window.clearTimeout(li),pl(),Ln()}});var vl=`/*
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
`;var Af=M("bloom-cls"),vf="bloom-cls",qf=600*1e3,yi=va("tab"),Bt=new Map,po=new Map,It=null,ql=[],xf=e=>e==="streaming"||e==="error";function wf(){let e=new Map,t=Date.now();for(let[o,n]of po)t-n.at>qf?po.delete(o):e.set(o,n.status);for(let[o,n]of Bt)e.set(o,n);return e}function Sf(e){return s("span",{class:`bloom-root ${Af("",`-${e}`)}`,attrs:{"data-bloom":"cls","data-status":e,"aria-label":e==="error"?"Error":"Generating"}},e==="error"&&N("alert"))}function fo(){let e=wf(),t=new Set;for(let[o,n]of e)for(let r of io(o)){if(!qe(r))continue;let i=r.querySelector(':scope > [data-bloom="cls"]');if(i?.dataset.status===n){t.add(i);continue}i?.remove();let a=Sf(n);t.add(a),r.append(a)}for(let o of document.querySelectorAll('[data-bloom="cls"]'))t.has(o)||o.remove()}function Bn(e,t){e&&(t?Bt.set(e,t):Bt.delete(e),It?.postMessage({tab:yi,id:e,status:t}),fo())}function Ef({data:e}){!P(e)||typeof e.id!="string"||typeof e.tab!="string"||e.tab===yi||(xf(e.status)?po.set(e.id,{status:e.status,tab:e.tab,at:Date.now()}):po.delete(e.id),fo())}function bi(){for(let e of Bt.keys())It?.postMessage({tab:yi,id:e,status:null})}var xl=f({name:"ChatListStatus",description:"Show a spinner or an error mark on the open conversation in the sidebar.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"list",styles:()=>`${vl}`,start(){It=typeof BroadcastChannel=="function"?new BroadcastChannel(vf):null,It?.addEventListener("message",Ef),addEventListener("pagehide",bi),ql=[x.on("rise",({conversationId:e})=>Bn(e,"streaming")),x.on("fall",({conversationId:e,outcome:t})=>Bn(e,t==="error"?"error":null)),x.on("context",({prevId:e,id:t,migrated:o})=>{o&&R().generating?Bn(t,"streaming"):!o&&Bt.get(e??"")==="streaming"&&Bn(e,null)}),E(e=>H(e)&&fo())],b()&&fo()},stop(){for(let e of ql)e();bi(),It?.close(),It=null,removeEventListener("pagehide",bi),Bt.clear(),po.clear(),fo()}});var Sl=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],Rn={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Tf={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Cf="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Ai=32,Dn=64,vi="#FCFCFC",qi="#111111",Mf=14,Hn=51.5,Lf=12.5,kf=9.75,wl=52,If=10.5,Bf=7.75,Pf={rotate:e=>e.arc(Hn,Hn,6,-Math.PI/2,Math.PI*.7),done:e=>{e.moveTo(46.5,51.75),e.lineTo(50,55.25),e.lineTo(56.75,47.5)},ready:e=>{e.moveTo(51.5,56.5),e.lineTo(51.5,46.5),e.moveTo(46.5,51.25),e.lineTo(51.5,46.25),e.lineTo(56.5,51.25)},error:e=>{e.moveTo(47.25,47.25),e.lineTo(55.75,55.75),e.moveTo(55.75,47.25),e.lineTo(47.25,55.75)}};function Pn(e){let t=document.createElement("canvas");t.width=t.height=Ai;let o=t.getContext("2d");return o?(o.scale(Ai/Dn,Ai/Dn),e(o),t.toDataURL("image/png")):""}function On(e,t,o){e.save(),e.translate(8,8),e.scale(2,2);let n=new Path2D(Cf);o&&(e.strokeStyle=qi,e.lineWidth=1.35,e.lineJoin="round",e.stroke(n)),e.fillStyle=t,e.fill(n,"evenodd"),e.restore()}function Nn(e,t,o,n){e.beginPath(),e.arc(t,t,o,0,Math.PI*2),e.fillStyle=n,e.fill()}function Of(e,t){Nn(e,Hn,Lf,qi),Nn(e,Hn,kf,Rn[t]),e.strokeStyle="#fff",e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",e.beginPath(),Pf[t](e),e.stroke()}function Rf(e,t){e.beginPath(),e.roundRect(0,0,Dn,Dn,Mf),e.fillStyle=t,e.fill()}var Df=e=>`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`;function El(e,t){switch(e){case"original":return Df(Tf[t]);case"hole":return Pn(o=>On(o,Rn[t],!0));case"bg":return Pn(o=>{Rf(o,Rn[t]),On(o,vi,!1)});case"dot":return Pn(o=>{On(o,vi,!0),Nn(o,wl,If,qi),Nn(o,wl,Bf,Rn[t])});case"badge":return Pn(o=>{On(o,vi,!0),Of(o,t)})}}var ho="bloom-chat-state-favicon",bo="data-bloom-rel",Si="data-bloom-media",Tl="bloom-parked-icon",Hf="/favicon.ico",Ml=p({style:{type:"select",description:"How the tab icon shows the chat state.",options:Sl,default:"bg"}}),Re=null,Ll="",Un=null,kl="",Cl=new Map,Ei,xi=[],Il=()=>[...document.head.querySelectorAll(`link[rel~="icon"], link[${bo}]`)];function Ti(){for(let e of Il())e.id!==ho&&(e.hasAttribute(bo)||(kl||=e.href,e.setAttribute(bo,e.rel),e.setAttribute(Si,e.getAttribute("media")??"")),e.rel!==Tl&&(e.rel=Tl),e.media!=="not all"&&(e.media="not all"))}function Nf(){for(let e of Il()){let t=e.getAttribute(bo);if(t==null)continue;e.rel=t;let o=e.getAttribute(Si);o?e.media=o:e.removeAttribute("media"),e.removeAttribute(bo),e.removeAttribute(Si)}}function Bl(){let e=document.getElementById(ho);return e||(e=document.createElement("link"),e.id=ho,e.rel="icon"),document.head.lastElementChild!==e&&document.head.append(e),e}function Uf(e){if(e==="wait")return kl||Hf;let t=Ml.store.style,o=`${t}:${e}`,n=Cl.get(o);return n||Cl.set(o,n=El(t,e)),n}function wi(e){if(e)return"rotate";let t=k();return Re&&t&&t!==Ll&&(Re=null),Re==="error"?"error":Re==="done"?"done":t?"ready":"wait"}function go(e,t=!1){if(e===Un&&!t)return;Un=e;let o=Bl(),n=Uf(e);o.type=n.startsWith("data:image/png")?"image/png":"",o.href!==n&&(o.href=n)}function Gf(){Ei=new MutationObserver(()=>{Ti(),document.head.lastElementChild?.id!==ho&&Bl()}),Ei.observe(document.head,{childList:!0})}var Pl=f({name:"ChatStateFavicons",description:"Show the chat state in the tab icon: generating, done, draft ready or error.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"favicon",enabledByDefault:!0,startAt:"HostReady",settings:Ml,start(){Ti(),go(wi(R().generating),!0),Gf(),xi=[x.on("rise",()=>{Re=null,go("rotate")}),x.on("fall",({outcome:e})=>{Re=e==="done"||e==="error"?e:null,Ll=k(),go(wi(!1))}),x.on("context",({migrated:e})=>{e||(Re=null)}),x.on("tick",({generating:e})=>{Ti(),go(wi(e))})]},stop(){for(let e of xi)e();xi=[],Ei?.disconnect(),document.getElementById(ho)?.remove(),Nf(),Un=null,Re=null},onSettingsChange(){go(Un??"wait",!0)}});var De="data-bloom-invite",Ff=/^(?:invite team members|invite members|邀请团队成员|邀请成员)$/i,Ol=':is(button, a:not([href^="/c/"])):not(main *, [role="dialog"] *)',Yf={hideDownloadApps:['a:is([href^="/download"], [href^="https://chatgpt.com/download"], [href^="https://openai.com/chatgpt/download"])',':is(a, button):is([data-testid*="download-app" i], [data-testid="get-app-button"], [data-testid="mobile-app-cta"], [data-testid="sidebar-download-app"])',':is(a, button):is([aria-label^="Download apps" i], [aria-label^="Download the ChatGPT app" i], [aria-label^="Download ChatGPT" i], [aria-label^="Get the app" i], [aria-label^="Get the ChatGPT app" i], [aria-label^="\u4E0B\u8F7D"])'],hideDisclaimer:['[data-testid*="disclaimer" i]','[class*="vt-disclaimer"]',`${u.timelineScroll} [class~="sticky"] [data-markdown-copy][class~="select-none"]`],hideUpgrade:['[data-testid*="upgrade" i]:not([data-testid*="model" i])',':is([data-testid*="upsell" i], [data-testid^="get-plus"], [data-testid^="get-pro"], [data-testid^="get-go"], [data-testid^="get-business"], [data-testid^="get-team"])','a:is([href*="/upgrade"], [href*="/pricing"], [href*="/checkout"], [href*="pay.openai.com"])',':is(a, button):is([aria-label^="Upgrade" i], [aria-label^="Get Plus" i], [aria-label^="Get Pro" i], [aria-label^="Get Go" i], [aria-label^="Try Plus" i], [aria-label^="Try ChatGPT Go" i], [aria-label^="Try Go" i], [aria-label^="\u5347\u7EA7"])'],hideLockedModels:['[data-testid="model-lock-icon"]',':is([data-testid="locked-model"], [data-testid="model-unavailable"], [data-testid="upsell-model"])','[role="menu"] [role="menuitem"]:is([aria-disabled="true"], [data-disabled]):has([data-testid*="model" i], [data-testid="model-lock-icon"])','[data-testid^="model-switcher-"]:is([aria-disabled="true"], [data-disabled="true"], [data-state="locked"])'],hideHomePromo:[':is([data-testid*="promo" i], [data-testid*="marketing-banner" i], [data-testid="welcome-banner"], [data-testid*="app-banner" i], [data-testid="try-codex"])'],hideNotices:['aside:has(button[aria-label="Dismiss migration notice"])','div:is(:has(> aside:only-child), :has(> div:only-child > aside:only-child)):has(button[aria-label="Dismiss migration notice"])','main aside[role="status"][aria-live="polite"][class~="select-none"]:has([class~="text-warning"]):has(button[class~="bg-primary-solid"])','main div[class~="shrink-0"]:has(> aside[role="status"][aria-live="polite"][class~="select-none"]:only-child):has([class~="text-warning"]):has(button[class~="bg-primary-solid"])'],hideAds:[':is([data-testid="ad"], [data-testid^="ad-"], [data-testid*="ad-slot"], [data-testid*="sponsored" i], [data-ad-slot])',':is([aria-label="Sponsored" i], [aria-label="Advertisement" i], [aria-label="\u8D5E\u52A9"], [aria-label="\u5E7F\u544A"])','iframe:is([src*="doubleclick"], [src*="/ads/"])'],hideInvite:[`[${De}]`,`div:has(> [${De}]:only-child)`]},Rl=p({hideDownloadApps:{type:"boolean",description:"Hide Download apps and Get the app.",default:!0},hideDisclaimer:{type:"boolean",description:"Hide the \u201CChatGPT can make mistakes\u201D notice.",default:!0},hideUpgrade:{type:"boolean",description:"Hide Upgrade, Get Plus, Get Pro and Try Go prompts.",default:!0},hideLockedModels:{type:"boolean",description:"Hide locked models in the model picker.",default:!0},hideHomePromo:{type:"boolean",description:"Hide promo banners on the home page.",default:!0},hideAds:{type:"boolean",description:"Hide ads and sponsored slots.",default:!0},hideNotices:{type:"boolean",description:"Hide the \u201CMigrate your GPTs to plugins\u201D notice and the Team \u201CTurn on auto-reload\u201D banner.",default:!0},hideInvite:{type:"boolean",description:"Hide Invite team members in the sidebar.",default:!0}}),Gn,Ci=!1;function Kf(e){if(H(e))for(let t of document.querySelectorAll(`${Ol}, [${De}]`))!t.matches(Ol)||!Ff.test(h(t.textContent??""))?t.removeAttribute(De):t.hasAttribute(De)||t.setAttribute(De,"")}var Dl=f({name:"Cleaner",description:"Hide Download apps, the mistakes notice, upgrade prompts, locked models, home promos, ads, notices and Invite team members.",authors:["Bloom contributors"],tags:["ui"],icon:"broom",enabledByDefault:!0,startAt:"Init",settings:Rl,styles:()=>Le(Object.entries(Yf).flatMap(([e,t])=>Rl.store[e]?t:[])),start(){Ci=!0,ze().then(()=>{Ci&&!Gn&&(Gn=E(Kf))})},stop(){Ci=!1,Gn?.(),Gn=void 0;for(let e of document.querySelectorAll(`[${De}]`))e.removeAttribute(De)}});var Pt=`form:has(:is(${u.composerInput})), ${u.oldComposerForm}`,Fn='[class*="ComposerLayoutBody"]',Li='[class*="ComposerLayoutRoot"]',Qf='[class*="corner-superellipse"], [class*="bg-token-bg-primary"], [class*="bg-token-main-surface"], [class*="shadow-short"]',Wf=`:is(${Pt}) ${Fn}, :is(${Pt}):not(:has(${Fn})) ${Li}, :is(${Pt}):not(:has(${Fn})):not(:has(${Li})) :is(${Qf})`,jf='#thread-bottom-container, #thread-bottom, :has(> form textarea[name="prompt"])',zf='#thread-bottom-container::after, #thread-bottom::after, [class*="content-fade"]',Vf="var(--composer-layout-surface-background, var(--color-bg-primary, var(--bg-primary, var(--main-surface-primary, Canvas))))";var Jf="composer-fill",Hl=p({opacity:{type:"slider",description:"Composer background opacity. 100 keeps ChatGPT's own fill.",min:0,max:100,default:100,unit:"%"},blur:{type:"slider",description:"Backdrop blur, used when opacity is below 100.",min:0,max:40,default:16,unit:"px"}});function Zf(){let{opacity:e,blur:t}=Hl.store;if(e>=100)return"";let o="background-color:transparent!important;background-image:none!important;box-shadow:none!important",n=`background-color:color-mix(in srgb, ${Vf} ${e}%, transparent)!important;background-image:none!important;backdrop-filter:blur(${t}px)!important;-webkit-backdrop-filter:blur(${t}px)!important`;return`:is(${jf}), :is(${Pt}){${o}}:is(${zf}){display:none!important}${Wf}{${n}}:is(${Pt}):has(${Fn}) ${Li}{background-color:transparent!important;background-image:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:clip!important}:is(${Pt}) :is(${u.composerInput}){background-color:transparent!important}`}function Mi(){for(let e of document.querySelectorAll(`[data-bloom="${Jf}"]`))e.remove()}var Nl=f({name:"ComposerOpacity",description:"Make the composer see-through with a blur, so the thread shows behind it.",authors:["Bloom contributors"],tags:["ui","chat"],icon:"layout",enabledByDefault:!0,startAt:"Init",settings:Hl,styles:Zf,start(){Mi()},stop(){Mi()},onSettingsChange(){Mi()}});var Xf=1200,$f=8e3,_f=150,ep=20,Ul=6,Bi="continue where you left",tp=/message delivery timed out|please try again/i,Gl=/waiting for the complete answer/i,Fl=p({prompt:{type:"string",description:"Sent when a reply stops on a delivery error.",default:Bi,placeholder:Bi}}),ki=[],Kn=0,yo=!1,Ao=0,Rt="",Yn="",Pi=0,Dt=!1,vo=!1,Qn=!0,Ot="",Oi=0,Wn=!1,op=()=>Fl.store.prompt.trim()||Bi;function Yl(){return(K(u.recovery)?.textContent??"").replaceAll(/\s+/g," ").trim()}function Kl(){let e=Yl();return!e||Gl.test(e)||!tp.test(e)?"":e}function np(){let e=Yl();return e&&Gl.test(e)?e:""}function rp(){let e=yt()?.querySelectorAll(u.turn),t=e?.[e.length-1];return`${t?.getAttribute("data-turn-key")??""}:${t?.textContent?.length??0}`}function Ql(e,t,o){if(o===Kn){if(R().generating||k()!==e||t>=ep){Dt=!1,R().generating||(Rt="");return}_o(),setTimeout(()=>Ql(e,t+1,o),_f)}}function ip(e){let t=Kn;if(R().generating||k()&&k()!==e){Dt=!1,Rt="";return}ie(e),Wn=!0,Xt(()=>{t===Kn&&Ql(e,0,t)})}function Wl(e){return e===Rt||Ao>=Ul||R().generating||k()?!1:(Rt=e,Ao+=1,Dt=!0,ip(op()),!0)}function ap(){if(yo||Dt||vo)return;let e=Date.now(),t=Kl();if(t){if(Ot="",t!==Yn){Yn=t,Pi=e;return}if(e-Pi<Xf)return;Wl(`${b()??""}:${t}`);return}if(Yn="",!np()){Qn=!0,Ot="";return}if(!Qn||!R().generating||k())return;let n=`${b()??""}:${rp()}`;if(n!==Ot){Ot=n,Oi=e;return}if(e-Oi<$f||Ao>=Ul)return;let r=bt();r&&(vo=!0,r.click())}function Ii(){Kn+=1,yo=!1,Ao=0,Rt="",Yn="",Pi=0,Dt=!1,vo=!1,Qn=!0,Ot="",Oi=0,Wn=!1}var jl=f({name:"Continue",description:"Send a continue prompt when a reply stops on a delivery error.",authors:["Bloom contributors"],tags:["chat"],icon:"play",enabledByDefault:!0,settings:Fl,start(){Ii(),ki=[x.on("rise",()=>{yo=!1,Rt="",Dt=!1,Wn&&(Wn=!1,Qn=!1,Ot="")}),x.on("fall",({outcome:e})=>{if(vo){vo=!1,e==="left"?yo=!0:Wl(`${b()??""}:stall`);return}(e==="stopped"||e==="left")&&(yo=!0),e==="done"&&!Kl()&&(Ao=0)}),x.on("context",({migrated:e})=>{e||Ii()}),x.on("tick",ap)]},stop(){for(let e of ki)e();ki=[],Ii()}});var Se=M("bloom-csi-"),sp=256,lp=160,jn=1,zl=4,cp=.1,up=.0015,dp=250;function mp(e){return new Promise((t,o)=>{let n=new FileReader;n.onload=()=>t(String(n.result)),n.onerror=()=>o(n.error),n.readAsDataURL(e)})}function fp(e){return new Promise((t,o)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>o(new Error("Image failed to load")),n.src=e})}function pp(e,t){let o=Math.max(1/e.naturalWidth,1/e.naturalHeight)*t.zoom,n=1/(2*e.naturalWidth*o),r=1/(2*e.naturalHeight*o);return{zoom:t.zoom,x:se(t.x,n,1-n),y:se(t.y,r,1-r)}}function Vl(e,t,o){let n=e.width,r=e.getContext("2d");if(!r)return;let i=Math.max(n/t.naturalWidth,n/t.naturalHeight)*o.zoom;r.clearRect(0,0,n,n),r.drawImage(t,n/2-o.x*t.naturalWidth*i,n/2-o.y*t.naturalHeight*i,t.naturalWidth*i,t.naturalHeight*i)}function gp(e,t){let o=s("canvas");return o.width=o.height=sp,Vl(o,e,t),o.toDataURL("image/png")}function Jl(e){let t=null,o={x:U.store.cropX,y:U.store.cropY,zoom:U.store.cropZoom},n,r=s("canvas",{class:Se("canvas"),attrs:{"aria-label":"Avatar crop. Drag to move, scroll to zoom."}});r.width=r.height=lp*devicePixelRatio;let i=s("div",{class:`bloom-muted ${Se("status")}`}),a=s("div",{class:Se("zoom")}),c=s("input",{attrs:{type:"file",accept:"image/*",hidden:""}});function l(y,q=!0){t&&(o=pp(t,y),Vl(r,t,o),q&&(clearTimeout(n),n=setTimeout(()=>{t&&(U.store.cropX=o.x,U.store.cropY=o.y,U.store.cropZoom=o.zoom,U.store.avatarUrl=gp(t,o))},dp)))}function d(){a.replaceChildren(pn(o.zoom,jn,zl,cp,"\xD7",y=>l({...o,zoom:y})))}async function m(y,q){i.textContent="";try{t=await fp(y),q&&(U.store.avatarSource=y,o={x:.5,y:.5,zoom:jn}),e.classList.add(Se("has-image")),d(),l(o,q)}catch{i.textContent="Couldn't load that image. Download it and choose the file instead."}}let A=y=>{y?.type.startsWith("image/")&&mp(y).then(q=>m(q,!0))};c.addEventListener("change",()=>A(c.files?.[0])),r.addEventListener("wheel",y=>{t&&(y.preventDefault(),l({...o,zoom:se(o.zoom*(1-y.deltaY*up),jn,zl)}),d())},{passive:!1}),r.addEventListener("pointerdown",y=>{if(!t)return;r.setPointerCapture(y.pointerId);let q={...o},te=r.getBoundingClientRect(),ft=Z=>{if(!t)return;let Y=Math.max(te.width/t.naturalWidth,te.height/t.naturalHeight)*o.zoom;l({...o,x:q.x-(Z.clientX-y.clientX)/(t.naturalWidth*Y),y:q.y-(Z.clientY-y.clientY)/(t.naturalHeight*Y)})};r.addEventListener("pointermove",ft),r.addEventListener("pointerup",()=>r.removeEventListener("pointermove",ft),{once:!0})});let F=s("div",{class:Se("cropper"),attrs:{tabindex:"0"},on:{paste:y=>A([...y.clipboardData?.files??[]].find(q=>q.type.startsWith("image/"))),dragover:y=>y.preventDefault(),drop:y=>{y.preventDefault(),A(y.dataTransfer?.files[0])}}},s("div",{class:Se("stage")},r),s("div",{class:Se("controls")},ro("",y=>y.trim()&&void m(y.trim(),!0),"https://\u2026 or data:image/\u2026","url"),s("div",{class:Se("buttons")},j("Choose file",()=>c.click()),j("Reset crop",()=>{l({x:.5,y:.5,zoom:jn}),d()}),j("Clear",()=>{t=null,e.classList.remove(Se("has-image")),r.getContext("2d")?.clearRect(0,0,r.width,r.height),a.replaceChildren(),U.store.avatarUrl="",U.store.avatarSource=""},"danger")),a,i,c));return e.append(F),U.store.avatarSource&&m(U.store.avatarSource,!1),()=>{clearTimeout(n),e.replaceChildren()}}var Zl=`/*
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
`;var qo="data-bloom-csi-avatar",Ri="data-bloom-csi-sized",ec="[data-bloom-text]:is([data-bloom-profile-name], [data-bloom-menu-name])",bp=32,U=p({displayName:{type:"string",description:"Name shown in the sidebar. Leave empty to keep yours.",default:"",placeholder:"Display name"},avatarSize:{type:"slider",description:"Avatar size in the expanded sidebar.",min:24,max:64,default:40,unit:"px"},applyToMenu:{type:"boolean",description:"Also use them at the top of the account menu.",default:!0},cropper:{type:"component",description:"Paste, drop or choose an image, then drag and zoom to crop it.",render:e=>Jl(e)},avatarUrl:{type:"custom",default:""},avatarSource:{type:"custom",default:""},cropX:{type:"custom",default:.5},cropY:{type:"custom",default:.5},cropZoom:{type:"custom",default:1}}),Xl=[];function tc(e){e.removeAttribute(qo),e.removeAttribute(Ri)}function $l(e){return(U.store.applyToMenu?["profile","menu"]:["profile"]).flatMap(o=>[...document.querySelectorAll(`[data-bloom-${o}-${e}]`)])}function _l(e=[]){if(!H(e))return;let t=U.store.displayName.trim()||null,o=!!U.store.avatarUrl,n=new Set(t?$l("name"):[]);for(let i of document.querySelectorAll(ec))n.has(i)||Ke(i,null);for(let i of n)Ke(i,t);let r=new Set(o?$l("avatar"):[]);for(let i of document.querySelectorAll(`[${qo}]`))r.has(i)||tc(i);for(let i of r)i.hasAttribute(qo)||i.setAttribute(qo,""),i.toggleAttribute(Ri,!i.closest('[role="menu"]'))}function yp(){let e=U.store.avatarUrl;return e?`:root{--bloom-csi-url:url("${e.replaceAll(/["\\\n]/g,"")}");--bloom-csi-size:${U.store.avatarSize}px}:is(${u.rail}, ${u.oldRail}) [${Ri}]{--bloom-csi-size:${bp}px}`:""}var oc=f({name:"CustomSidebarIdentity",description:"Use your own avatar and display name in the sidebar. Only you see it.",authors:["Bloom contributors"],tags:["ui"],icon:"user",settings:U,styles:()=>`${yp()}
${Zl}`,start(){Xl=[me(),E(_l)]},stop(){for(let e of Xl)e();for(let e of document.querySelectorAll(`[${qo}]`))tc(e);for(let e of document.querySelectorAll(ec))Ke(e,null)},onSettingsChange(){_l()}});var Ht=M("bloom-greeting-"),nc=30,rc=100;function ic(e){let t=-1,o=s("textarea",{class:`bloom-input ${Ht("input")}`,attrs:{maxlength:String(rc),rows:"2",placeholder:"New greeting","aria-label":"Greeting text"}}),n=j("Add",i),r=s("div",{class:Ht("list")});function i(){let l=o.value.trim().slice(0,rc);if(!l)return;let d=[...I.store.greetings];t>=0?d[t]=l:d.length<nc&&d.push(l),I.store.greetings=d,t=-1,o.value="",a()}function a(){let{greetings:l}=I.store;n.textContent=t>=0?"Save":"Add",n.disabled=t<0&&l.length>=nc,r.replaceChildren(...l.length?l.map((d,m)=>s("div",{class:Ht("row",m===t?"row-editing":"row-idle")},s("div",{class:Ht("text"),text:d}),X("edit","Edit",()=>{t=m,o.value=d,o.focus(),a()}),X("trash","Delete",()=>{I.store.greetings=l.filter((A,F)=>F!==m),t===m&&(t=-1),a()}))):[s("div",{class:"bloom-muted",text:"No greetings. The official heading stays."})])}o.addEventListener("keydown",l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&i()}),e.append(s("div",{class:Ht("editor")},r,s("div",{class:Ht("form")},o,n))),a();let c=gt((l,d)=>l==="GreetingCustomizer"&&d==="greetings"&&a());return()=>{c(),e.replaceChildren()}}var ac=`/*
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
`;var Jn="data-bloom-greeting",vp=1e3,qp=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],I=p({mode:{type:"select",description:"When the greeting changes.",options:[{label:"Each visit to home",value:"refresh"},{label:"Timer while on home",value:"interval"},{label:"Click the greeting",value:"manual"}],default:"refresh"},order:{type:"select",description:"Which greeting comes next.",options:[{label:"Sequential",value:"sequential"},{label:"Random",value:"random"}],default:"sequential"},intervalSec:{type:"slider",description:"Seconds between changes in timer mode.",min:1,max:3600,default:10,unit:"s"},heroOnlyOutsideProject:{type:"boolean",description:"Outside projects, only replace the home heading. The composer keeps ChatGPT's placeholder.",default:!0},editor:{type:"component",description:"Up to 30 greetings, 100 characters each.",render:e=>ic(e)},greetings:{type:"custom",default:qp},index:{type:"custom",default:-1},lastRandom:{type:"custom",default:-1}}),zn,sc=[],Di,wo=()=>sn()&&!ue(),xp=e=>e.replaceAll(/\s*\n\s*/g," ").trim(),cc=()=>I.store.greetings.filter(e=>typeof e=="string"&&e.trim());function So(){let e=cc();if(e.length)if(I.store.order==="random"&&e.length>1){let t=I.store.lastRandom;for(;t===I.store.lastRandom;)t=Math.floor(Math.random()*e.length);I.store.lastRandom=t,I.store.index=t}else I.store.index=(I.store.index+1)%e.length}function wp(){return wo()?K(u.homeHeading):null}function Vn(){for(let e of document.querySelectorAll(`[${Jn}]`))e.removeAttribute(Jn),Ke(e,null)}function Zn(){for(let e of document.querySelectorAll("[data-bloom-placeholder]"))e.removeAttribute("data-bloom-placeholder")}function lc(e){let t=ve(),o=xp(e);if(!t||!o||k(t)){Zn();return}t.getAttribute("data-bloom-placeholder")!==o&&t.setAttribute("data-bloom-placeholder",o)}function xo(){let e=cc(),t=ls(),o=wo();if(!e.length||!t&&!o){Vn(),Zn();return}if(t){Vn(),lc(e[0]??"");return}let n=wp();n?((I.store.index<0||I.store.index>=e.length)&&So(),n.setAttribute(Jn,""),Ke(n,e[Math.max(0,I.store.index)%e.length]??"")):Vn(),I.store.heroOnlyOutsideProject?Zn():lc(e[Math.max(0,I.store.index)%e.length]??"")}function Hi(){clearInterval(zn),zn=void 0,I.store.mode==="interval"&&wo()&&(zn=setInterval(()=>{So(),xo()},I.store.intervalSec*vp))}function Sp(e){I.store.mode!=="manual"||!(e.target instanceof Element)||!e.target.closest(`[${Jn}]`)||getSelection()?.toString()||(So(),xo())}function Ep(){wo()&&I.store.mode==="refresh"&&So(),Hi(),xo()}var uc=f({name:"GreetingCustomizer",description:"Replace the home heading with your own lines. A project composer shows the first line.",authors:["Bloom contributors"],tags:["ui"],icon:"bubble",settings:I,styles:ac,start(){Di=new AbortController,document.addEventListener("click",Sp,{signal:Di.signal}),wo()&&I.store.mode==="refresh"&&So(),Hi(),sc=[E(e=>H(e)&&xo()),de(Ep)]},stop(){Di?.abort();for(let e of sc)e();clearInterval(zn),Vn(),Zn()},onSettingsChange(e){(e==="mode"||e==="intervalSec")&&Hi(),xo()}});var Eo=M("bloom-history-"),Ni=10,Tp=3e3;function dc(e){let t="",o=0,n=new Set,r=s("input",{class:"bloom-input",attrs:{type:"search",placeholder:"Search history...","aria-label":"Search history"}}),i=s("div",{class:Eo("list")}),a=s("div",{class:Eo("pager")}),c,l=j("Clear all",()=>{if(!c){l.textContent="Click again to clear",c=setTimeout(()=>{c=void 0,l.textContent="Clear all"},Tp);return}clearTimeout(c),c=void 0,l.textContent="Clear all",To([])},"danger");function d(){let A=[...nt.store.entries].toReversed(),F=t.trim().toLowerCase(),y=F?A.filter(Y=>Y.toLowerCase().includes(F)):A,q=Math.max(1,Math.ceil(y.length/Ni));o=Math.min(o,q-1);let te=y.slice(o*Ni,(o+1)*Ni).map(Y=>s("div",{class:Eo("row")},s("button",{class:Eo("text",n.has(Y)?"text-open":"text-closed"),text:Y,title:n.has(Y)?"Collapse":"Expand",attrs:{type:"button"},on:{click:()=>{n.delete(Y)||n.add(Y),d()}}}),X("copy","Copy",()=>void qa(Y)),X("trash","Delete",()=>To(nt.store.entries.filter(hr=>hr!==Y)))));i.replaceChildren(...te.length?te:[s("div",{class:"bloom-muted",text:F?"No matching prompts.":"No saved prompts yet."})]),a.replaceChildren(s("span",{class:"bloom-muted",text:`${y.length} ${F?"matching":"saved"} \xB7 page ${o+1} of ${q}`}),j("Previous",()=>{o--,d()}),j("Next",()=>{o++,d()}),l);let[ft,Z]=a.querySelectorAll("button");ft.disabled=o===0,Z.disabled=o>=q-1,l.disabled=!A.length}r.addEventListener("input",()=>{t=r.value,o=0,d()}),e.append(s("div",{class:Eo("manager")},r,i,a)),d();let m=gt((A,F)=>A==="InputHistory"&&F==="entries"&&d());return()=>{m(),clearTimeout(c),e.replaceChildren()}}var mc=`/*
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
`;var Mp=M("bloom-history-"),Lp=2e3,nt=p({maxEntries:{type:"slider",description:"How many sent prompts to keep.",min:10,max:500,step:10,default:100},manager:{type:"component",description:"Search, copy or delete saved prompts.",render:e=>dc(e)},entries:{type:"custom",default:[]}}),oe=null,Ui={text:"",at:0},rt=null,Gi,Xn=()=>nt.store.entries.filter(e=>typeof e=="string");function To(e){nt.store.entries=e.slice(-nt.store.maxEntries)}function Fi(e){let t=e.trim();if(!t)return;let o=Date.now();t===Ui.text&&o-Ui.at<Lp||(Ui={text:t,at:o},To([...Xn().filter(n=>n!==t),t]))}function kp(e,t){let o=ve();if(!o)return;rt??=s("div",{class:`bloom-root ${Mp("hud")}`,attrs:{"data-bloom":"history-hud","aria-live":"polite"}}),rt.textContent=`${e+1} / ${t}`;let n=(o.closest("form")??o).getBoundingClientRect();rt.style.left=`${n.left+n.width/2}px`,rt.style.top=`${n.top}px`,rt.isConnected||document.body.append(rt)}function Co(){oe=null,rt?.remove()}function Ip(e){let t=Xn();if(!oe)return;let o=t[e];oe.index=e,oe.shown=o,ie(o),kp(t.length-1-e,t.length)}function Bp(e){let t=Xn();if(!t.length)return!1;if(!oe){if(e===1)return!1;oe={index:t.length,draft:k(),shown:""}}let o=oe.index+e;return o<0?!0:o>=t.length?(ie(oe.draft),Co(),!0):(Ip(o),!0)}function fc(e){return je(e)?e:e instanceof HTMLElement?e.closest(u.composerInput):null}function Pp(){if(ve()?.closest("[data-chatgpt-composer], [data-composer-input], form")?.querySelector('[aria-expanded="true"]'))return!0;for(let t of document.querySelectorAll('[role="listbox"], [role="menu"], [data-radix-popper-content-wrapper], [cmdk-root], [cmdk-list]')){if(!(t instanceof HTMLElement)||t.closest("[data-bloom]"))continue;let o=getComputedStyle(t);if(!(o.display==="none"||o.visibility==="hidden"))return!0}return!1}function Op(e){if(e.isComposing||e.key==="Process"||e.keyCode===229)return;let t=fc(e.target);if(!t)return;if(e.key==="Enter"&&!e.shiftKey){Fi(k(t)),Co();return}if(e.key==="Escape"&&oe){ie(oe.draft),Co(),e.preventDefault(),e.stopPropagation();return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.ctrlKey||e.metaKey||e.shiftKey||Pp())return;let o=Ja(t),n=e.key==="ArrowUp";!e.altKey&&!(n?o.first:o.last)||!n&&!oe||Bp(n?-1:1)&&(e.preventDefault(),e.stopPropagation())}function Rp(e){oe&&fc(e.target)&&k()!==oe.shown.trim()&&Co()}function Dp(e){e.target instanceof Element&&e.target.closest(u.sendButton)&&Fi(k())}var pc=f({name:"InputHistory",description:"Press \u2191 and \u2193 in the composer to bring back prompts you sent before.",authors:["Bloom contributors"],tags:["chat"],icon:"history",enabledByDefault:!0,settings:nt,styles:mc,start(){Gi=new AbortController;let{signal:e}=Gi;document.addEventListener("keydown",Op,{capture:!0,signal:e}),document.addEventListener("input",Rp,{capture:!0,signal:e}),document.addEventListener("click",Dp,{capture:!0,signal:e}),document.addEventListener("submit",()=>Fi(k()),{capture:!0,signal:e})},stop(){Gi?.abort(),Co()},onSettingsChange(e){e==="maxEntries"&&To(Xn())}});var gc=`/*
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
`;var Np=1500,Up=5e3,Gp=2e3,qc=[{label:"UTC",value:"UTC"},{label:"\u7F8E\u56FD\u4E1C\u90E8",value:"America/New_York"},{label:"\u7F8E\u56FD\u4E2D\u90E8",value:"America/Chicago"},{label:"\u7F8E\u56FD\u5C71\u5730",value:"America/Denver"},{label:"\u7F8E\u56FD\u897F\u90E8",value:"America/Los_Angeles"},{label:"\u65E5\u672C",value:"Asia/Tokyo"},{label:"\u53F0\u6E7E",value:"Asia/Taipei"}],Nt=p({sourceTimeZone:{type:"select",description:"Zone the stored clock was written in. Leave UTC for ChatGPT create_time. Pick the same zone as the Shit GPT plugin only when that clock is a wall time in that zone; it is then shown in the system timezone.",options:qc,default:"UTC"},hideOwnMessages:{type:"boolean",description:"Don't add times to your own messages.",default:!1},stamps:{type:"custom",default:{}}}),_n=new Map,Yi=new Set,xc=0,er,hc=[];function wc(e,t){_n.get(e)!==t&&(_n.set(e,t),clearTimeout(er),er=setTimeout(Sc,Gp))}function Sc(){let e={...Nt.store.stamps,...Object.fromEntries(_n)};Nt.store.stamps=Object.fromEntries(Object.entries(e).toSorted((t,o)=>o[1]-t[1]).slice(0,Np))}function Fp(e){let t=le(b())?.times;for(let o=e.length-1;o>=0;o--){let n=_n.get(e[o])??t?.get(e[o])??Nt.store.stamps[e[o]];if(n)return n}return null}var Yp=()=>R().generating||Date.now()-xc<Up;function Ec(){return Intl.DateTimeFormat().resolvedOptions().timeZone}function Tc(){let e=Nt.store.sourceTimeZone;if(!e||e==="UTC")return"UTC";try{return Intl.DateTimeFormat(void 0,{timeZone:e}),e}catch{return"UTC"}}function Cc(e,t){let o={};for(let n of new Intl.DateTimeFormat("en-US",{timeZone:t,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(e)))o[n.type]=n.value;return{y:+o.year,m:+o.month,d:+o.day,h:+o.hour%24,mi:+o.minute,s:+o.second}}function Mc(e){return Date.UTC(e.y,e.m-1,e.d,e.h,e.mi,e.s)}function bc(e,t){let o=e;for(let n=0;n<4;n++){let r=e-Mc(Cc(o,t));if(r===0)return o;o+=r}return o}function Kp(e,t){if(t==="UTC")return e;let o=(e%1e3+1e3)%1e3,n=e-o,r=new Date(n),i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),r.getUTCHours(),r.getUTCMinutes(),r.getUTCSeconds()),a=bc(i,t),c=3600*1e3,l=Number.POSITIVE_INFINITY;for(let d of[-c,0,c]){let m=a+d;Mc(Cc(m,t))===i&&m<l&&(l=m)}return l!==Number.POSITIVE_INFINITY?l+o:bc(i+c,t)+o}function Qp(e,t){let o=Tc();return t||o==="UTC"?e:Kp(e,o)}function yc(e,t){return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(e)}function Wp(e){let t=Ec(),o=Date.now(),n={hour:"2-digit",minute:"2-digit",timeZone:t};if(yc(e,t)===yc(o,t))return new Intl.DateTimeFormat(void 0,n).format(e);let r=a=>new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric"}).format(a),i=r(e)===r(o)?{}:{year:"numeric"};return new Intl.DateTimeFormat(void 0,{...i,month:"short",day:"numeric",...n}).format(e)}function jp(e,t){let o=new Date(t).toLocaleString(void 0,{timeZone:Ec()}),n=Tc();if(n==="UTC"||t===e)return o;let r=new Intl.DateTimeFormat(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"UTC"}).format(e);return`${qc.find(a=>a.value===n)?.label??n} ${r} \u2192 ${o}`}function Lc(e){let t=At(e)??e.getAttribute("data-message-author-role")??e.closest(u.turn)?.getAttribute("data-turn")??e.querySelector(u.authorRole)?.getAttribute("data-message-author-role");if(Or(t))return t;let o=eo(e).at(-1);return le(b())?.chain.find(n=>n.id===o)?.role??null}var Ac='[class*="group/activity-header"]';function zp(e){let t=e.parentElement;if(!t)return null;let o=e.closest(u.turn);return o&&t!==o&&!o.contains(t)?null:t}function Vp(e){let t=e;for(let o=0;o<8&&t;o++){let n=zp(t);if(!n)return null;let r=[...n.children],i=r.indexOf(t);for(let a=i-1;a>=0;a--){let c=r[a],l=c.matches(Ac)?c:c.querySelector(Ac);if(l)return l;if(c.matches(u.searchUnit)||c.querySelector(u.searchUnit))return null}if(n===t.closest(u.turn))return null;t=n}return null}function Jp(e){let t=e.parentElement;for(let o=0;o<4&&t;o++){if(t.classList.contains("flex-col"))return t;t=t.parentElement}return e.parentElement??e}function kc(e,t){if(t==="assistant"){let o=Vp(e);if(o)return Jp(o)}return e}function Zp(e,t){let o=vt();for(let n=o.length-1;n>=0;n--){let r=o[n];if(!(r!==e&&(Lc(r)!=="assistant"||kc(r,"assistant")!==t)))return r===e}return!0}function vc(e){return e.querySelector(':scope > time[data-bloom="timestamp"]')}function Xp(e){let t=eo(e);if(!t.length||!qe(e)||e.querySelector("time:not([data-bloom])"))return;let o=Lc(e),n=kc(e,o);if(n!==e&&!Zp(e,n)){vc(e)?.remove();return}let r=Fp(t),i=!1;if(!r&&Yp()){r=Date.now();let m=t.at(-1);Yi.add(m),wc(m,r),i=!0}else r&&Yi.has(t.at(-1))&&(i=!0);let a=n.querySelector('time[data-bloom="timestamp"]')??vc(e);if(!r||Nt.store.hideOwnMessages&&o==="user"){a?.remove();return}let c=Qp(r,i),l=Wp(c);if(a?.textContent===l&&a.parentElement===n&&a===n.firstElementChild)return;let d=s("time",{class:`bloom-timestamp bloom-timestamp-${o??"assistant"}`,text:l,title:jp(r,c),attrs:{"data-bloom":"timestamp",datetime:new Date(c).toISOString()}});a&&a.replaceWith(d),(d.parentElement!==n||d!==n.firstElementChild)&&n.prepend(d)}var $n=ke(()=>{for(let e of vt())Xp(e)}),Ic=f({name:"MessageTimestamps",description:"Show when each message was sent.",authors:["Bloom contributors"],tags:["chat"],icon:"clock",enabledByDefault:!0,settings:Nt,styles:gc,start(){hc=[E(e=>H(e)&&$n()),W.on("conversation",$n),W.on("message-time",({messageId:e,time:t})=>{Yi.delete(e),wc(e,t),$n()}),x.on("fall",()=>{xc=Date.now()})]},stop(){for(let e of hc)e();er&&(clearTimeout(er),Sc());for(let e of document.querySelectorAll('time[data-bloom="timestamp"]'))e.remove()},onSettingsChange(e){if(e!=="stamps"){for(let t of document.querySelectorAll('time[data-bloom="timestamp"]'))t.remove();$n()}}});var $p=['form button:is([aria-label^="Dictat" i], [aria-label*="dictation" i], [aria-label^="\u542C\u5199"], [aria-label*="\u542C\u5199"], [aria-label="\u8BED\u97F3\u8F93\u5165"])','button:is([data-testid*="dictat" i], [data-testid="composer-speech-to-text-button"])','[data-chatgpt-composer] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-composer-input] button:is([aria-label*="voice" i], [aria-label*="dictat" i], [aria-label*="mic" i], [aria-label*="\u8BED\u97F3"])','[data-codex-composer-root] button[aria-label^="Dictat" i], [data-composer-placement] button[aria-label^="Dictat" i], [class*="ComposerLayout"] button[aria-label^="Dictat" i]'],_p=['[class*="settings-row"]:has([role="switch"]:is([aria-label*="Dictation" i], [aria-label*="\u542C\u5199"]))','[role="dialog"] :is([data-testid*="dictation" i], [data-testid*="speech-to-text" i], [aria-label*="Dictation" i], [aria-label*="\u542C\u5199"])'],Bc=p({hideDictationSettings:{type:"boolean",description:"Also hide dictation rows in ChatGPT settings.",default:!0}}),Pc=f({name:"NoDictation",description:"Hide the composer Dictation button. Voice mode stays.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"mic",startAt:"Init",settings:Bc,styles:()=>Le([...$p,...Bc.store.hideDictationSettings?_p:[]])});var it="data-bloom-share",eg=/^\/g\/g-p-/,tg=/^(?:share|分享)$/i,og=['[data-testid="share-chat-button"]','[data-testid="share-button"]','[data-testid="conversation-share-button"]','button:is([aria-label="Share" i], [aria-label="Share chat" i], [aria-label="Share conversation" i], [aria-label="Share prompt" i], [aria-label="\u5206\u4EAB"], [aria-label="\u5206\u4EAB\u5BF9\u8BDD"])'],ng=['[data-testid="share-project-button"]','[data-testid="project-share-button"]','button:is([aria-label="Share project" i], [aria-label="\u5206\u4EAB\u9879\u76EE"])',`[${it}="project"]`],Ki=p({hideShareChat:{type:"boolean",description:"Hide Share on conversations.",default:!0},hideShareProject:{type:"boolean",description:"Hide Share inside projects.",default:!0}}),tr,Qi=!1;function rg(e){if(!H(e))return;let t=eg.test(location.pathname)&&!b();for(let o of document.querySelectorAll(`button[aria-haspopup="dialog"], [${it}]`))!t||!tg.test(h(o.textContent??""))?o.removeAttribute(it):o.hasAttribute(it)||o.setAttribute(it,"project")}var Oc=f({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"share",startAt:"Init",settings:Ki,styles:()=>Le([...Ki.store.hideShareChat?og:[],...Ki.store.hideShareProject?ng:[]]),start(){Qi=!0,ze().then(()=>{Qi&&!tr&&(tr=E(rg))})},stop(){Qi=!1,tr?.(),tr=void 0;for(let e of document.querySelectorAll(`[${it}]`))e.removeAttribute(it)}});var Rc='[data-bloom-profile-name], [data-testid="accounts-profile-button"] .min-w-0 > .truncate:first-child',ig='[data-bloom-profile-email], [data-bloom-profile] a[href^="mailto:"]',ag="[data-bloom-profile-plan]",Dc="visibility:hidden!important;user-select:none!important",Nc=p({hideUsername:{type:"boolean",description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:"boolean",description:"Hide an email address on the account chip.",default:!0},enlargePlan:{type:"boolean",description:"When the name is hidden, show the plan label at 14px.",default:!0},alignPlanWithAvatar:{type:"boolean",description:"When the name is hidden, drop its line so the plan sits level with the avatar.",default:!1}});function sg(){let{hideUsername:e,hideEmail:t,enlargePlan:o,alignPlanWithAvatar:n}=Nc.store,r=[];return e&&r.push(n?`:is(${Rc}){display:none!important}`:`:is(${Rc}){${Dc}}`),t&&r.push(`:is(${ig}){${Dc}}`),e&&o&&r.push(`${ag}{font-size:14px!important;line-height:1.25!important}`),r.join(`
`)}var Hc,Uc=f({name:"NoSidebarIdentity",description:"Hide the sidebar display name. The avatar stays clickable.",authors:["Bloom contributors"],tags:["ui","privacy"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:Nc,styles:sg,start(){Hc=me()},stop(){Hc?.()}});var lg="model-switcher-dropdown-button",Wi="data-selected-reasoning-effort",or="ArrowLeft",Gc=e=>e.startsWith("model-switcher-")&&e!==lg?e.slice(15):"",Mo=(e,t)=>e.id===t.id||!!e.label&&e.label===t.label;function Fc(){let e=Q();return(e&&K(u.modelTrigger,e))??K(u.modelTrigger)}function pe(){let e=Fc();if(!e)return null;let t=e.getAttribute("aria-expanded")==="true",o=e.getAttribute(Wi),n=o&&t?"":h(e.innerText),r=o||Gc(e.getAttribute("data-testid")??"")||n;return r?{id:r,label:n||r}:null}function cg(e){return[...document.querySelectorAll(u.modelItem)].find(t=>{let o=Gc(t.getAttribute("data-testid")??""),n=h(t.textContent??"");return o===e.id||n===e.label||n===e.id})??null}function ug(e){let t=e.querySelector("[role=slider]"),o=Number(t?.getAttribute("aria-valuenow")),n=Number(t?.getAttribute("aria-valuemax"));o<=0?or="ArrowRight":o>=n&&(or="ArrowLeft"),e.focus(),e.dispatchEvent(new KeyboardEvent("keydown",{key:or,code:or,bubbles:!0,cancelable:!0}))}function ji(e){let t=pe(),o=Fc();if(t&&Mo(t,e))return o?.hasAttribute(Wi)&&o.getAttribute("aria-expanded")==="true"&&document.querySelector("[role=menu]")?.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),!0;if(o?.hasAttribute(Wi)){let r=document.querySelector(u.effortSlider);return r?ug(r):o.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0,button:0,pointerType:"mouse",isPrimary:!0})),!1}let n=cg(e);if(n){n.click();let r=pe();return!!r&&Mo(r,e)}return o?.getAttribute("aria-expanded")!=="true"&&o?.click(),!1}var Yc=`/*
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
`;var G=M("bloom-queue-"),mg=6,fg=8,_=null,Lo="",Ut=!1,Gt=!1;function zi(e,t,o){let n=X(e,t,r=>{r.stopPropagation(),o()});return n.removeAttribute(xe),n.addEventListener("mouseenter",()=>Kc(t)),n.addEventListener("mouseleave",()=>Kc("")),n}function Kc(e){let t=_?.querySelector(`.${G("tip")}`);t&&(t.textContent=e)}function pg(e,t,o,n){Gt=!0;let r=s("textarea",{class:`bloom-input ${G("editor")}`,attrs:{"aria-label":"Edit queued message"}});r.value=o;let i=new AbortController,a=c=>{i.abort(),Gt=!1,Lo="",c?n.edit(t,r.value):r.replaceWith(s("div",{class:G("text"),text:o}))};addEventListener("keydown",c=>{if(!(c.target!==r||c.isComposing)){if(c.key==="Enter"&&!c.shiftKey)a(!0);else if(c.key==="Escape")a(!1);else return;c.preventDefault(),c.stopImmediatePropagation()}},{capture:!0,signal:i.signal}),r.addEventListener("keydown",c=>c.stopPropagation(),{signal:i.signal}),r.addEventListener("blur",()=>a(!0),{signal:i.signal}),e.querySelector(`.${G("text")}`)?.replaceWith(r),r.focus(),r.setSelectionRange(r.value.length,r.value.length)}function gg(e,t,o){e.addEventListener("pointerdown",n=>{if(n.button!==0||n.target.closest("button, textarea"))return;let r=e.parentElement;if(!r)return;let i=!1,a=l=>{!i&&Math.abs(l.clientY-n.clientY)<mg||(i||(i=Gt=!0,e.classList.add(G("dragging"))),e.style.transform=`translateY(${l.clientY-n.clientY}px)`)},c=l=>{if(removeEventListener("pointermove",a),!i)return;Gt=!1,Lo="";let m=[...r.children].filter(A=>A!==e).filter(A=>A.getBoundingClientRect().top+A.getBoundingClientRect().height/2<l.clientY).length;o.move(t,m)};addEventListener("pointermove",a),addEventListener("pointerup",c,{once:!0})})}function hg(e,t,o,n){let r=s("li",{class:G("row")},s("div",{class:G("text"),text:e.text}),n&&e.label?s("span",{class:G("model"),title:e.label,text:e.label}):null,s("div",{class:G("actions")},zi("trash","Remove from queue",()=>o.remove(t)),zi("edit","Edit",()=>pg(r,t,e.text,o)),zi("send","Send now",()=>o.sendNow(t))));return gg(r,t,o),r}function bg(e){if(!_)return;let t=e.getBoundingClientRect();_.style.left=`${t.left}px`,_.style.width=`${t.width}px`,_.style.bottom=`${innerHeight-t.top+fg}px`}function Vi(){_?.remove(),_=null,Lo="",Gt=!1}function at(e,t,o=!0){let n=Q();if(!e.length||!Zt(n)){Vi();return}_||(_=s("div",{class:`bloom-root ${G("tray")}`,attrs:{"data-bloom":"queue"}},s("div",{class:G("header")},s("button",{class:G("toggle"),attrs:{type:"button","aria-expanded":String(!Ut)},on:{click:a=>{Ut=!Ut,_?.classList.toggle(G("collapsed"),Ut),a.currentTarget.setAttribute("aria-expanded",String(!Ut))}}},s("span",{class:G("count")}),N("chevron")),s("span",{class:G("tip")})),s("ol",{class:G("list")})),_.classList.toggle(G("collapsed"),Ut),document.body.append(_)),bg(n);let r=JSON.stringify([o,...e.map(a=>[a.text,o?a.label:""])]);if(Gt||r===Lo)return;Lo=r;let i=_.querySelector(`.${G("count")}`);i&&(i.textContent=Uo(e.length,"Queued message")),_.querySelector(`.${G("list")}`)?.replaceChildren(...e.map((a,c)=>hg(a,c,t,o)))}var ar=new S("PromptQueue"),yg=8,Io=150,nr=20,Ag=300,ge="BloomPromptQueue",Zi="BloomPromptQueueClaim",Qc="BloomPromptQueueTab",vg=4e3,J=p({replacePending:{type:"boolean",description:"Enter replaces the last queued message instead of adding another.",default:!1},showQueueMode:{type:"boolean",description:"Show the model that was selected when each message was queued.",default:!0},stickyOnNavigate:{type:"boolean",description:"Keep the selected model when switching chats.",default:!0},persistAcrossRefresh:{type:"boolean",description:"Restore unsent queued messages in this browser after a refresh. Other tabs show the same queue; only one of them sends it.",default:!0}}),he=new Map,ko=!1,st=null,Ft,Wc=[],He=null,ct=!1,Bo,rr="draft",Po=()=>b()??rr,ee=()=>he.get(Po())??[],Xi=e=>({id:e.model||e.label,label:e.label||e.model});function qg(e){return typeof e=="string"?e.trim()?{text:e,model:"",label:""}:null:!P(e)||typeof e.text!="string"||!e.text.trim()?null:{text:e.text,model:typeof e.model=="string"?e.model:"",label:typeof e.label=="string"?e.label:""}}function $i(){let e=sessionStorage.getItem(Qc);if(e)return e;let t=globalThis.crypto?.randomUUID?.()??`${Date.now()}-${Math.random()}`;return sessionStorage.setItem(Qc,t),t}function Vc(){let e=Ce(localStorage.getItem(Zi)??"");return!P(e)||typeof e.tab!="string"||typeof e.at!="number"||typeof e.key!="string"?null:{tab:e.tab,at:e.at,key:e.key}}function Jc(){let e={tab:$i(),at:Date.now(),key:Po()};try{localStorage.setItem(Zi,JSON.stringify(e))}catch(t){ar.warn("Could not claim the queue",t)}}function xg(){let e=Vc();if(e?.tab===$i())try{localStorage.setItem(Zi,JSON.stringify({...e,at:Date.now()}))}catch(t){ar.warn("Could not refresh the queue claim",t)}}function wg(){let e=Vc();return!e||e.tab===$i()||e.key!==Po()?!0:Date.now()-e.at<=vg?!1:(Jc(),!0)}function Sg(){return Object.fromEntries([...he].filter(([e])=>e!==rr))}function Ji(e){let t=typeof e=="string"?Ce(e):e;if(!P(t))return!1;let o=!1;for(let[n,r]of Object.entries(t)){if(!Array.isArray(r))continue;let i=r.map(qg).filter(a=>a!=null);i.length&&(he.set(n,i),o=!0)}return o}function Eg(){if(!J.store.persistAcrossRefresh){sessionStorage.removeItem(ge),yr(ge);return}Ji(sessionStorage.getItem(ge))||Ji(Qo(ge))&&ir()}function ir(){try{if(!J.store.persistAcrossRefresh){sessionStorage.removeItem(ge),yr(ge);return}let e=Sg();sessionStorage.setItem(ge,JSON.stringify(e)),Wo(ge,e)}catch(e){ar.warn("Could not save the queue",e)}}function Tg(e){if(!(e.key!==ge||!J.store.persistAcrossRefresh||e.newValue==null)){he.clear(),Ji(e.newValue);try{sessionStorage.setItem(ge,e.newValue)}catch(t){ar.warn("Could not mirror the queue",t)}at(ee(),Yt,J.store.showQueueMode)}}function lt(e){e.length?he.set(Po(),e):he.delete(Po()),Jc(),ir(),at(ee(),Yt,J.store.showQueueMode)}function Cg(e){if(!e.model&&!e.label)return!0;let t=pe();return t?Mo(t,Xi(e)):!0}function Zc(e,t=0){t>=nr||R().generating||k()!==e||(_o(),setTimeout(()=>Zc(e,t+1),Io))}function Mg(e,t){let o=e??He;if(!o||!t.model&&!t.label||Mo(o,Xi(t))){ct=!1;return}J.store.stickyOnNavigate&&(He=o),clearTimeout(Bo),Bo=setTimeout(()=>$c(o),Io)}function Oo(e,t=0,o=pe()){if(R().generating||k()){t<nr&&setTimeout(()=>Oo(e,t+1,o),Io);return}if(!Cg(e)&&t<nr){ct=!0,ji(Xi(e)),setTimeout(()=>Oo(e,t+1,o),Io);return}ie(e.text),Xt(()=>Zc(e.text)),Mg(o,e)}function jc(){if(st!=null){let o=st;st=null,Oo(o);return}if(!ko||R().generating||k())return;if(!wg()){ko=!1;return}let[e,...t]=ee();e!=null&&(ko=!1,lt(t),Oo(e))}function Xc(e){let t=ee(),o=t[e];if(o!=null){if(lt(t.filter((n,r)=>r!==e)),!R().generating){Oo(o);return}st=o,bt()?.click()}}var Yt={remove:e=>lt(ee().filter((t,o)=>o!==e)),edit:(e,t)=>lt(t.trim()?ee().map((o,n)=>n===e?{...o,text:t}:o):ee().filter((o,n)=>n!==e)),sendNow:Xc,move(e,t){let o=[...ee()],[n]=o.splice(e,1);n&&(o.splice(t,0,n),lt(o))}};function Lg(e){let t=pe(),o={text:e,model:t?.id??"",label:t?.label??""},n=ee();return J.store.replacePending&&n.length?(lt([...n.slice(0,-1),o]),!0):n.length>=yg?!1:(lt([...n,o]),!0)}function kg(e){if(e.key!=="Enter"||e.shiftKey||e.isComposing||!je(e.target)||!R().generating)return;let t=k(e.target);if(e.preventDefault(),e.stopImmediatePropagation(),e.altKey){if(!t)return;let o=pe();ie(""),st={text:t,model:o?.id??"",label:o?.label??""},bt()?.click();return}if(!t){ee().length&&Xc(0);return}Lg(t)&&ie("")}function Ig(){if(ct||!J.store.stickyOnNavigate)return;let e=pe();e&&(He=e)}function $c(e){ct=!0;let t=0,o=()=>{if(ji(e)||t>=nr){ct=!1;return}t++,Bo=setTimeout(o,Io)};clearTimeout(Bo),o()}function Bg(){J.store.stickyOnNavigate&&He&&$c(He)}function zc(e){let{target:t}=e;!(t instanceof Element)||ct||t.closest(`${u.modelTrigger}, ${u.modelItem}`)&&setTimeout(Ig,Ag)}var _c=f({name:"PromptQueue",description:"Press Enter while ChatGPT is answering to queue your next message. Queued messages send one by one.",authors:["Bloom contributors"],tags:["chat"],icon:"queue",settings:J,styles:Yc,start(){Ft=new AbortController,Eg(),He=pe(),document.addEventListener("keydown",kg,{capture:!0,signal:Ft.signal}),document.addEventListener("pointerup",zc,{signal:Ft.signal}),document.addEventListener("keyup",zc,{signal:Ft.signal}),Wc=[x.on("fall",({outcome:e})=>{ko=e==="done",e==="left"&&(st=null),jc()}),x.on("context",({prevId:e,id:t,migrated:o})=>{let n=he.get(rr);he.delete(rr),o&&!e&&t&&n&&he.set(t,n),o||(ko=!1,Bg()),ir(),at(ee(),Yt,J.store.showQueueMode)}),x.on("tick",()=>{xg(),jc(),at(ee(),Yt,J.store.showQueueMode)})],addEventListener("storage",Tg,{signal:Ft.signal}),at(ee(),Yt,J.store.showQueueMode)},stop(){Ft?.abort(),clearTimeout(Bo);for(let e of Wc)e();Vi(),he.clear(),st=null,He=null,ct=!1},onSettingsChange(e){e==="persistAcrossRefresh"&&ir(),e==="stickyOnNavigate"&&J.store.stickyOnNavigate&&(He=pe()),at(ee(),Yt,J.store.showQueueMode)}});var Pg=new Set(["chatgpt","new chat","\u65B0\u804A\u5929"]);function Og(){let e=h(document.title.replace(/\s*[|–-]\s*ChatGPT$/i,""));return e&&!Pg.has(e.toLowerCase())?e:null}function Ro(e){return e?le(e)?.title??Os(e)??(e===b()?Og():null):null}var eu=`/*
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
`;var Ee=M("bloom-recent-"),Te="home",Dg=50,tu=140,Hg=new Set(["Backquote"]),Ng=new Set(["`","~","\xB7","\uFF40","\uFF5E"]),w=p({maxRecent:{type:"select",description:"How many chats the switcher lists.",options:["3","4","5","6","7","8","9","10","11","12"].map(e=>({label:e,value:e})),default:"5"},includeHome:{type:"boolean",description:"List the New chat page as well.",default:!0},visits:{type:"custom",default:[]},titles:{type:"custom",default:{}},previews:{type:"custom",default:{}},projects:{type:"custom",default:{}}}),Ne=null,be=[],ye=0,_i,ou=[],cr=()=>ue()?null:b()??(sn()?Te:null);function nu(e,t){return Object.fromEntries(Object.entries(e).filter(([o])=>t.has(o)))}function iu(e){let t=Ro(e);t&&w.store.titles[e]!==t&&(w.store.titles={...w.store.titles,[e]:t});let o=Rs(location.href);o&&e===b()&&w.store.projects[e]!==o&&(w.store.projects={...w.store.projects,[e]:o})}function ru(e){if(!e)return;let t=[e,...w.store.visits.filter(n=>n!==e)].slice(0,Dg),o=new Set(t);w.store.visits=t,Object.keys(w.store.previews).some(n=>!o.has(n))&&(w.store.previews=nu(w.store.previews,o)),Object.keys(w.store.titles).some(n=>!o.has(n))&&(w.store.titles=nu(w.store.titles,o)),e!==Te&&iu(e)}function sr(e){if(!e||!w.store.visits.includes(e))return;let t={},o=le(e)?.chain??[];for(let r of o)t[r.role]=ce(cn(r),tu);if(e===b())for(let r of Be()){let i=qt(r);i&&(t[r.role]=ce(i,tu))}let n=w.store.previews[e];!t.user&&!t.assistant||n?.user===t.user&&n?.assistant===t.assistant||(w.store.previews={...w.store.previews,[e]:t})}function Ug(){let e=Number(w.store.maxRecent);return w.store.visits.filter(t=>t!==Te||w.store.includeHome).slice(0,e)}function ea(e){if(Do(),e===cr())return;let t=e===Te?document.querySelector('[data-testid="create-new-chat-button"], nav a[href="/"], [data-sidebar-destination="builtin:home"]'):io(e)[0];t?t.click():location.assign(e===Te?"/":`/c/${e}`)}function Gg(e,t){let o=e===Te?"New chat":w.store.titles[e]??Ro(e)??"Untitled chat",n=e===Te?null:w.store.projects[e],r=e===Te?null:w.store.previews[e];return s("button",{class:Ee("item"),attrs:{type:"button",role:"option","aria-selected":String(t===ye)},on:{click:()=>ea(e),mousemove:()=>t!==ye&&lr(t)}},s("div",{class:Ee("head")},s("span",{class:`${Ee("title")} bloom-truncate`,text:o}),n&&s("span",{class:Ee("project"),text:n})),r?.user&&s("div",{class:`${Ee("preview")} bloom-truncate`,text:`You: ${r.user}`}),r?.assistant&&s("div",{class:`${Ee("preview")} bloom-truncate`,text:`ChatGPT: ${r.assistant}`}))}function lr(e){ye=(e+be.length)%be.length,Ne?.querySelectorAll(`.${Ee("item")}`).forEach((t,o)=>t.setAttribute("aria-selected",String(o===ye)))}function Fg(){sr(b());let e=cr();be=Ug(),e&&(be=[e,...be.filter(t=>t!==e)].slice(0,Number(w.store.maxRecent))),be.length&&(ye=be.length>1?1:0,Ne=s("div",{class:`bloom-root ${Ee("backdrop")}`,attrs:{"data-bloom":"recent"},on:{mousedown:t=>t.target===t.currentTarget&&Do()}},s("div",{class:Ee("panel"),attrs:{role:"listbox","aria-label":"Recent chats"}},...be.map(Gg))),document.body.append(Ne))}function Do(){Ne?.remove(),Ne=null}var Yg=e=>Hg.has(e.code)||Ng.has(e.key);function Kg(e){if(e.ctrlKey&&!e.altKey&&!e.metaKey&&Yg(e)){e.preventDefault(),e.stopPropagation(),Ne?lr(ye+(e.shiftKey?-1:1)):Fg();return}if(!Ne)return;let o={Escape:Do,Enter:()=>ea(be[ye]),ArrowDown:()=>lr(ye+1),ArrowUp:()=>lr(ye-1)}[e.key];o&&(e.preventDefault(),e.stopPropagation(),o())}function Qg(e){Ne&&e.key==="Control"&&ea(be[ye])}var au=f({name:"RecentTopics",description:"Hold Ctrl and press ` to switch between recently opened chats.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"clock",enabledByDefault:!0,settings:w,styles:eu,start(){_i=new AbortController;let{signal:e}=_i;addEventListener("keydown",Kg,{capture:!0,signal:e}),addEventListener("keyup",Qg,{capture:!0,signal:e}),addEventListener("blur",Do,{signal:e}),document.addEventListener("visibilitychange",()=>document.hidden&&sr(b()),{signal:e}),ou=[de(({prevId:i})=>{sr(i),ru(cr())}),W.on("conversation",({id:i})=>{w.store.visits.includes(i)&&iu(i),sr(i)})];let{visits:t,titles:o,previews:n}=w.store,r=t.filter(i=>i!==Te&&(i.startsWith("local-")||!(o[i]||n[i])));r.length&&(w.store.visits=t.filter(i=>!r.includes(i))),ru(cr())},stop(){_i?.abort();for(let e of ou)e();Do()}});var ta="data:audio/mpeg;base64,SUQzBAAAAAAAIlRTU0UAAAAOAAADTGF2ZjYxLjcuMTAwAAAAAAAAAAAAAAD/+5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABJbmZvAAAADwAAACgAAELvAAwMEhIYGBgfHyUlJSsrMTExODg+Pj5EREpKSlFRV1dXXV1jY2NqanBwcHZ2fHx8g4OJiYmPj5WVlZycoqKiqKiurq61tbu7u8HBx8fHzs7U1NTa2uDg4Ofn7e3t8/P5+fn//wAAAABMYXZjNjEuMTkAAAAAAAAAAAAAAAAkBXwAAAAAAABC75HV3zMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+5BkAAACVRhUHSTABDSjGMCkpAAV+UdIeawACK0LpksSkAAAEhOaEPa6NHqgJgmK0ewQIGLv//sYTJ34iIgmT1iAIEIWAAAQDGCAY0Qff/1gh3+CHKAgCEuCBzggCGCDv1B+CBwoCAIAh/V+UOQ9zXRtyQAmCYrR6ogQIEc5//wIATFaPYIECBATo9UFAIBgwuCAIChg5BwEHbi4f/8HAwsHwDJSk25HiBkEDmrGDRlRGDE44BKOErcpXEmnGLGAUG05WF48gSBebi1am1KjGgveDHroFZEIH+QlCyxGABCC1VCrlYQwcS/xhYcVnMtqxl77WNr5RzmHzZUqg8/U1m/KljFqTC+2AvdPax+xen21StkMqhq/RpPXb/zWWUNT3/RRXmMps9pZ3O9/63///f////ludLKoDcTe+frn/9WK////f//5///9mm3sjJlqb/oAAADADutHY8i2rvky+59Wnn/WFTxDiS2ttrIhnfxrf7Mnb/W//Qd2f//6FQAGgwIA8wGC8yEK82ysYxBF4xNBYtMMgAYMgIWAAMFABRP/+5JkEQ/EsUDLF3aABDKiOMDtPAAQMQUgD2lnyNOKJE2hNZhgBLlJIHAFEFOSmOwiZInTghEAKPAyAMLQgs8QUegDRAHQegDFRXhKYuQc4Vs6AyopETAMtC5SCl1kjKtSZmiaUjYdQ3xkiBEyasgmatRukZJoomSaa2Z3IaTxs6/SQPKqZNu/2Vrut1oFE1DJXgYfkVJ/DUDvkKlToxygu1h75KqdrK18fst/G52dizb96dnVr6AhuiQkgYmYMlRjQESsq4jt+sq7pEgDDAYAnMBcPoxGW9SoBkAgCzAPAmLppEGcIC9AsAAUWMjCR6ZgX+uMmcxYz0SyC6YUBui82kcFEwYCE74kHeVFVLkakhmmB5ICYhyax52KPWdF51FySSw9AfKi67ZzLKVh+Wk1EhSQTzKoOs3TPtlu6qRdXbL//4vdw6Euzej3qgBhvXWL31LDddiITD0UykDG3Wld90OQxTW6DaFlYKlkTE9ntf+HP7XNp+v9uvp/9nM8Mf/0qgAAWpTMLFIjAHD9M9NeQ+ewYYCiFWDIwWaP2luULS7X//uSZBAEQ7AqyJs+yAA2Yojmc08WDBDPKu6YVoDyj+OJx5Wg4votW6k/BszLpY8MCsAl24JWLAZAmadDzPUgiikv9f27mVvKrzP+f+eFXHv5Y5V5rWX813/3/953v8zn7+UsD4SH7Fg4Bj0+nfrYEXu/i/+j+QkfxWsIABAALAJSkwCNArTQceWqi5hKXoOEIaa+WkYu0/NG+pNU2j/q7rLMHW06PyLvCaKu+S57d00yBVGWbrCCoAmCw2HuVlmHwJIlOqoS9iE0wdAqnhtKmG6duLiSrOa+XU9jP8qHkYWWEADDtNT0aVkocilq5lSCXTht3M+ohle26/tQoEKDlSpiK5LXmoNR9+rT/knf///SSpgIVjoAAA/O35oqA1eRICqJxwqCAuL4Ajqy9tbROzs1Nx423n7XVgXYEt8MWxcJBZ1c//qvSo539TP+uojBJFtONfDgGDAvArNG8XwMC7DABEN0LEApdEwRAAHVRgCDvxeH1Y+nPccMHZvd5vRcZXOapV6llhp9mtaZl5p4fLbDiHK91/2b/v/QkHQNF1ytzP/7kmQqAIM8M8q7zDLkQGKIxXdsGg4orRzvaQfBNZSiye2sach/TduWyiQFZ1p72f9v/p1OH6KwIAADgeC4HgAzj6B1TOB4uuDAIOKENDAy0Jth4DZYsh15xnyjOvVb9hc/arPnYNQMmcJBj6VQiIs7txQ7+tQD1gEBQCRkDACTAxACMJQI87Bh3jESAFDgZzAQAnQfBJAEvAL9UaZSFyUUliBCD4bi0JlMr61G123YjK8nLTofOu6U6FQ8JNUwxLgYHTkI2KJURTY8tae2+F/ruHxhYw0PrEqJJQDUuzq8n/1/2qX/1e33gEgA0B+XYMEUHU2PQajZREaKTDSkMfEEJgiiddKBgDBRKEPzCLyfR2jc1WshyM7TPB6cBsf3DsOoGsW13193/9f8Q+b72X/bt8bl3UwaAAxQNpVzZIYAABmBuEQa75oZ+SRhAJhRdPPBUaf8oqOXhUKjRNQxCoDhyD6uUxAsUMEkExhQ7BKIFFbF8wHObTZGk6KlOgtmbZS1mKVkfrbsyVMuFRuxoUJNgClF3+M/9tFSPd6QgJBm0Bj/+5JkNYjjLCtJU9po8EpCiKFj3AANkKkctemAAVYK4oa88AAzAGm38T4amApEPwIXwaDU4zABeOSJUIEDrq7YrEU/4AoG8tzdHHYu79vCgxYK4jXIelk9Z5lAh0QFDhi1z7RTyVQCfFoGwYKAHBgoA4GCySObCToBhuB6GH8FYYKwBiDac4NBVMJwEgwFgBAcAACAE0GYHa2TADEPMiKF6MYQQk0z6I5YQAJgAtw5wohOGJdLYyRxSFNaVt6JfZJkj6zhiTCK0ldddkK7pJGDFakCsbvQYIYFZgcg3mBaLYauqEJhFg9mEaDWYD4M40DWCQCACDAYrIIZgSgEpFhcAuk9Q9MxLq08IkROyHRGrAsSovgGgl/JNHXBkwZ9DTBXeMt7M7S9RH/3KgABEnU2I3M4QslnQ2IxYBCQAWZIRki0OwYtGJmRuAFQk3Rk5ZxEysYxETRoWcE/kMAjEA4JqLPD8hHgb+HIBYaI6DCwYwFKC5xcAaAAcAG4BgAfghIACsyAHDEnyuXBZAuQcAAyw29YuYCpADmBv08/FjHAeTLj//uSZDuABgFfVn5mYAZeQ8nPzeAAEFVDQv24ABjKCKcrtCACBaMZBxQcsTIof+mLgJxB0GNg1aTtSSf/GYPG4lAiDEXIuT5RFtLQ6xYTXO//FwGpuQQnGLhcNEkC2gZMnZJzEx/////LpV35BIAAAMSEgFAFAHA5AYDAAABCpmriAUWTRBIACILOJ9EB1UOqtJbJMxgZZIeHJZDLiSGVxvLsceQGatzl3/48UPTuuZUlh5u3avf/n09vOWWPxoYveNZm9/4fy38+X70iAAABTgkDNgoMma5hlh7HkhU1WctaVO0ZgT6rlDAG7D5AjU6WSKmpdMWWuYmBEwFEZE1JoixZFygWRJjUomiR+s9MiLFYZ4MTOkklr+pL9aJ5NZDieSSfbX60S6fKJGC5SqyJdJ1zEZUgpdZfSNkkknZnRWYmqLf0kkkkaq/60WWYiAHAIAASQttRwClAL1AQVK1iD3KbK2FAWzjc1ayz1qt/Zop9AY/Ev/3Ld/2dn//7nf/WigACVKC4g0AZgoFxtJBp4GCQYR5gYAiCyYsJIQCd9bKCjP/7kmQQgAQEUEwbuVLyQmW6GmWCXs3A11WsMRaxUZapKYGLRoHCeFBxh8NxqjmYhGIfZ3GLHI9K3FVBUmH5l8PuEBYF1XpE8C35fbzpd297pQFRQcyZqnuYkbaqujD4uPntPWo8MMbmJNBeAiJznaitZm866XOYo6M3a3/RHnGu6tlARAIUwI2wAJukeM07FeWJrnY4utwO9YJBMcY695mbk8GgAgHDP5pSl5mW7+w4URzEcQyef3m6whG7EO+hG///Di24AQByOSVq1tyBD5oM+J6OzIrmzlijmFDVDlg29hl+Xga7Enennmq1rSJqEpUry1HRTlT6iNLZv60dA3NKlwtB8IxKPgiZdgaZtZ7a71HT0B0dfH9fJTz/Mr4rKqvzKs0BboqjxIO9cFaukq4l/SSWggs5GbIQFDnw2FRXvzFiZtQN2ck8u1Mw7Td+mtZ1alDamW6qWzFPTZbpsu/zKVQNZBSk5SzKsK7EwmbV3RVu1Utq8DYYCHKvvuYD/KAhDv/+6v+GqgBqACAJEIDBgRAwmt8NsaOx4Jg6AqGASBP/+5JkDIwDpDVJE9pCcEVDKRFzLyYOwNccL2BtgSWP5SnMoKCXFAwCQOACAzd1hHRAyhQLb4Bw+afiC1VY1DUqLzPdXkMuh5ASBjkszis1hFXBTdbNK7U0C49Md1UtLTfMDaul+ueOqQ0dZk8vvs92yb84kHDSZJIPFCTWKRiGgKCyaL4JBQPqZrWHEoLYcW8JjBGCfRj8gxQjSyOJOFe8gXPt42q21IC5g1wJaC3K95Z7GFuZoI3UZbOtzt9YIlvxreJfsBAwAwHDAsALIQnDlHKRPH8MMBGDGDMA+YB4EAhAfQfMFMC5BYqhiiQDK3ZwveazOCuGfLyQM8UZfScq09lp6wxijLJFdmZxUcaYixeYlcbhUzWp6fWe+aNKesRFI+G079hiCCmANUPW5ckyoQCFGkFn/+V//6kESAAFbd+QzQiLATNzIAb7IkPAaO0VAGpUKGwgUqHtpRLKr4MZIct41ZJccIwYXo2z1jfh57r/1i/mShMb+mf/1C3/7v+////3VUAD4Acl13U3FgFEQTnJB4HBUbGEgTrDKHJWMREp//uSZA6Ag0U1y1O5GnBOAykad0woDQzXIE9sqcE0DOMBnuxAJ0Q7pq4PszEoMo5iWsDofsQ3zndP561rXcPxqYs8cS9zZIAAwQiFT6vZsW8yJewiZ8BVj1n/tfeoCYeDhTHGLERLehWPCav/6jH/QAABABTCFrSAwFmumcYKnCrAmF4EAQyOhwoFesS3QoLZhbfjLnrYLHfhR52WFH9ezzIHX5TfqZe2ip16T8r3+oSbrbwG7/9n//9X2f0/WAsgGAeBKBgTTA1B+Mjc9U2eESzDWBMMBsBWTmASAICgAjBg+cBkWNCDozDBI2ryne5qzzXJHeubuwBem0RIpblungg1SCm7EYnCJsUOJwBIOpLXQg4qGzClLmqUyi7XR2yUNaezo3GnGNAdGZGpivHuebGKIehwiPBwNShCGmeDjUADzC285Tuw0UBbz17y25RK5DBcv7cqPvXTOp+2+YPrK3JUnGJZu9hcqw1fDlNXr1pT/+0AAjABFKwBwBUGgCGAEDSYcpXBo2hemEKAUPWl30BajRWPNDGLnVpuIsy5TWmtSv/7kmQXgJLhNkrT2SlgS6UZB3dIKgvM0SlO5WVJRIyiwY7sCKIZw2xyw1AUrqYQERMMAadR27rq6kV0ZHV009t5RBJlftT3o7HdSnUUqLb29QBAA4AACAGGalkjMQ6z4gFSIzQUWCoQwoldxihrYhTkDm0rkspaVDUvsO7kiJPxMBKDiyriRgbAJCFuNrjHT/+3NwNv+GeJvmblRRgBwIAFkgASjC4JmAQ3HDWcm11oGCgejqzSy9hclhyvBysaLkMugxT0bmqzVUCxMtd9julVGZiBMKYBQ7Ys2OTD3f/SKqTWvKIPVPna4q/ceV4ue3XP8XudVOaSFKirGaRggFx3N17aPq9zMYxOMMCAMZmcCqFAGfi2wJ3hoif1/okVg0tuwwuaWVpNHZfS7rTLdcaTC3Mzi32fqBvHnapZbnS0EtIlTStWzuB539FrFWAIglEQ7LAAmOVAAYFCZ0GNH9ISYwAiWSPAQGki04MSoB2r5HZWF/WfHTDpHfP2Tk/F17NVtU5DVXlLKXOrFO/soczOo7HeyF2TWAwxrm6+nHLt3Gv/+5JkKoGSvijM64wbalEFGPd1hWoKrNFNrSxv8TwUIwnttLDtfWwEEBwASLCF3RIHDNZAzoV2DEsITAYICECyQHIuiQ1gdHBrsTuBQD5P25TUudb57Y1NrrKdDQUjg9ZjAzYXf9DdtMiaWs5ho///////0f/1f6YA75JY3NW9CCUOjUg6IFoScLTwQFTQMYPR2JBqbNn4m6xJdBOOEsnqU6dZUOfMQqTTEJVua9S0/528Pdcksjtm5VSRuvqTxJKnOfXkWP/JNllFEpbVAGlWBgTTAlAWMOMRM1kgjAUKaZeIBiwYyXqrFxXIAs8HDFuKT63qO/LXsprF7BA0WxwYUIdzSswMRPxKhOEDcwNTY6okOnv/6bT3ZlsamioAgWlskB9oZRuPNbzGZxN2CGUv068BUsSlUlL/q/QCOE3FoTaOGtB2XKfJxH3mtQCAQdFYSAEh1H07E4QgHSkZY/FLPwe7kNug1VrzNUry9hVCjNBIAjIcFIkKbuA+Mal0mn6RSFfXoSEF4CDFUov18p3ZMNOYePBzVnjcB5eFGEhqrY0q//uSREKABEo5zUtiZw5+xzljcwhuStzRMa49q4mOnGZpyIsJqZZbOQAV2gALgZGUKjA8TazKnAHBGQAYv7F2SLDq7IAmRAprCJivILYI2NTeXw5H3XmIpMSyvL4bRPTrfBdEFOI9aRa92h17dS/UvU9yMVY3QMPO7VLi0jHGHyJ2JbGKWfqUWfGiv1FKLhQHwXsZOlJXv1wLsHALBzvowcAKCIWfCPMAACIkACZ4AUzPh0Dm6k0cQPIkFF3wQqaDWAPnMc5unIuWFigsLBqLG3jG6wG4mJYab3Iqm0kLRq2bb7pIAAmB3HWel+oyqu1jhipAxNf/+kay+UeJrbACQBBCVcAOE4A6FTby+P6JkFEwaAatjJ5VH2vEgBURiS1o86VJTV53C13lazcta9mLqy25ecJl0dVpi85jnbRpHS6WQMUNtHaZGyLJUtz6X0DB3ChhX//dgokDDOUBQpAICFRaAAKNSAL2+AFNoQAIZ1lycNmaYXgAXxVuaLEnLhtQ0iBOlaBFX8PJBwHAGtCPeo8HG57ceLAZKi5YQom0Pflfe//7kmQgAQKeJ8vrpkOyT+Z5TXHlagqg0S+uME3BHIzotPwwLty6Dq6+dfxh9YlA3msgt9fRPP50AAgKABl7MAUrPVdAEgniHEYcAbJ0/VU5lksgGQITAX7NRbmdtRKd3TFKR99/t5bWKsbuGDlRb1TuY5CW6lAUc/7dDs2ujyiLbnOqk0rbqKsACFIkLfIlKCp6mAGMa5lgBBbIGXskc13nGhkoB1A6Erhi1cu+juWjG1aRwm9WttjBkNRQ1hOprvrtnNy3U+mwI/aZ55pkbmEsrIVuFcyc+V2cd9NcAjkksb1kAAH6N6uiYdIxhAW3aLU7T2QkgibDglmwDSdrJcfoIQX40quwJTt61+XuKSq5iuFp0fYVXj4nUem1hEJPrUqm2AYAMRABLEACYAcBAEmAOCIYzxW5pfBXiQjg0B8qUtNF3kdtR4mBKliOaFfG1IdkadwVuvCkYE6kpPW8Q+ZjGIZbGFkrdXxwd6jZqxDrVh1zLYlNCxIIW13hRaZIAAABQACwIQJmJBF+TLMNgHZYsWwQDBcZPb2vWiQABoNKa7L/+5JkPwCC1ihI089bUEmkCQ11gmoKnHMfLHXhSUGMoondPJhytvQJxigg2K33nlMBRjZdnHdZRtLtYmb6k1aGcx+bb/1f////8iAAQAP4AQTC9CoQ55X/h/jZ5jaIwCAWXI3tPSrdJEIaGukOhUpmVYgI9xcIsbEei6jNh8rq+p2xyVoOE5cagTQn33v7rqbT8YtxXB3lbDAJ4b70+r9AgARgHhwEwKFRo9H53J2higLoBeIbmKCqwB0lgoXKD9GQtjkG9dkaiW9uaXn+pzjXBvQ3PcOKZTSIMa2fmbF6zRciZY82S/Lf+S///////30BgAcYDDTzAEDTCIVD37DTunBjGUQzBIGESi2CzKy/GeEQ17PT8vJUJ4gzA6kvTj6wngGeVnlGCKJINiIqzACra0lIDvKpLhQLTKAbD87e1Vh7///6wFIBDAwBgAjATAJC4yhqqF6mE4CERSzBBYYcYxYFi4wME8OEJJmA7gtxPmOR3G1W8rTOhsOPPd5AV5XPY20FrzleZ/U2j/b0ADEAApGwAiMTAAlAN5mWhaGj0B2T//uSZFkAwqodx7usE1BH4siie08mCoyfIU9kqcE9i6JJz2hACUDQHZbxV6mQcDfKow+FGnWf2e1T2qbXbPM+a5GqryfnfwtVp9R+V50OYFMzJShTs6zKIoZ1LY/SYgcBa/9OkCABEgyAQYYgEJnOMG4WMmYcIDgZRS1jT7mfBPMu4f415PIVuzVWwvP92q1q/9uHcVJW8a2ohG7ywDbQ9Vysijz6hCWlyZV5L7P//////9YMwCkAACEkwNBIwmFU+WcQ67pcxVDowEAdEdIlfBftWsZAQWD6q/RErOoE+zNr6LE3nOlCeCGZmeyS3T5VfElgFFysze4uuZWRH2Y79kcWD7BIqCyjAIFSUNjFWJzYD8jBYXSECC3icCDoKEx1UvyIzIeHBKBR5JUKUne7NZQyIxhuBdaB2EdaVjtUrwoWFgNc+xzPi9X9myz3f2gGNAACECBwEwuMh+nd56jdBiSHoIAggBFORgiazJx0BBYQrr9dFwZW6Oxw4Hff7q7mQlvvEmYzhSY2EIa5o6EFDmXJjAibpAAFXO47IfxVgrbAAv/7kmR3gAKFKMe7rytQSwLoknUvaApAoRxuvG1JHIrjadykmADABpuNs9UgJAOZbE8euMKYvAgY4ogEa8uZiM2skrqkyWhRtVxMYN7mbK2DaVT/ggOik1AwxndWV19fX/17vYj///2evjYBAFIAj8WwBINpn4HNG0cDiYZQAxgTgAgYCRRFgKEDXxAYTxxiItYVy/8LhuQS+3Wprk7VmYEdi7cprV2Q1ZYXnZrnOxYPocyTzWdaO+YzapZW3mlg82sgCF1YgP7/7spa0tEyaKjp5XDhMul+1QtKVd0SEH1owaADOdpwRKKZw6q4My8j2XI0bLm/pbu1t6f/q2//oDgBbdodEAnHCOfn0+FmLYaGAQBgUCF4KmDgHlJCARQN8Gv45Y0Au+cz5ictPtRMK0qCTp6SWWytJeQVDmSIuxcZD/mx9+qpFlXU/65BFAAQACCko1EBUAwYERoEcpghSRUDkLAh0OvBlKVERLBcPgxSbutTOYHWMbvMP9KMvOoc7OLGgJCI00DUx9XXuyf/+rVv9wy3/Z20f/RVAAgAAVkADBT/+5JknAECuChGM9k6cD3BqU1yaVAJxJ8YzrxtQTELIundMKBwKDmaQ4Idm1EYihOLEAZNK1ihMfKiqgR9Q2ytIdjCsMNbV8JCGe63XxlpuLiHXZTssct5YmNhY4ff71eJ9Me2wXg9bUk31G6BnGbZpr436evxiOkBhBQLQAAN0SURieH5xQaYGFwiOggfqH1euIm2TkjE5WYAWoioifQz9yT9irDCVWSHWyooWD4a5PKrHjek9JwCBCFoByoiYZju0AahIDkYlrrIYjodG90enmQMhxQlAFo8qVrRSQkKOw8CUrgOxFcZTlnz6+f/3fuwH0d8u/w6RLM1r4svlrVTCvHFGsSINUpHLHga////9n/I//9AQARAAAUrQKAAAC0wCW48RRUxXA4iaKgRIf8MGwUlKUwcIvVaia245ap8xPmtaMa7VpcWWSWMhx/C+cGetrfWPmvtBHpQ1QxAah0X//////////1KAG1AHw8GAFIAMMCRfPu8gO9ZTMPwwBABoyJ95oIYMEQKDwdKOj2tKJy8fFSJddr+lx1cBiXIvbLJ//uSZMMAAuAoxtO5eUBJo+j6dwwoSmB3IU6x7YFPDuLd3DygCHkdI2Kigk2M2tQ3+ETGZ0j/+1kGZ////+z9nrYAqgcMgaSi4ZPVyYr5IFxBJGgqKWgVynZYJVxNmAzlOlCme6hkiq/OX+qQ08wva0hx3qGQA0WZY3EZ8wSD2inVR9P3d6t3//+/6KaQKgGJyNuyBQBMKAeP8IJOV5mMUQnMDAORqUi1BGJ0EOQ0BU41LZ9MaYfR4mY0R3nf0sCVgavSsq8uUJxNFIB9NJG2qIVD1a7Pdbvu/1erXExv+3/6P9LhYCEUVmL8GBoWmc7PH1zMmOQECZzcFv2+FqwcMtK6VIBFOFja1a2uWkqzMFzAFzBa9V5+hSFAv91l4hygw20MAvR1adun9X9yUf1+n/6f/7YEBvgoCYwJgFzCHBIOFsXE4/AwQ4okHBjAYCyWl5TKQb8RzETd5kbws9pIkyFvZXl9rCpepHfiRugwI/tDcoY2pWHDv/TxmccBASKr3LNDLDMRD69oOvX3+QdEVFWuz0o5Vc27K6G/Y+a7kG+fSP/7kmTbgMKsKEbLrBtQTAMIcXcvJgsAgRruvE1BPQuiCdwwmO6iCYRgwAZrQFZ9+npjmBgR2TKbqmBy4MHZj4Z2MwJ1tbVPqzp7WmLwV+EG4yXgzV749kdCzLqCEdTb7qd733p8Vmmp/1F67PryOaV9CvUn932ACBlWjGLNmIwTAszW6QuM+E28wgQWDdUtepugCLOo1BQyQcDQG0KLNyi9PBV2nn6OmpKlhpCeqGVPO02VqUNZSAh6BNTVPbpb/467jasNJHOSxSYs6vv+7R1p//L/+53SPX2bGp6jNYEAgBMBQUNyTZMH4+GAlZgOAizel1oSKXGq34DA4RI8t8ajah5ww3Vw33lqQa2TI3nl5wwslFVopdo7dSNX7v2fqLf/60f6qkx9GyoBKaBsA5iYCYehqFsBmhKf4YNIMpkgIOsLRMGrOAQaWvD0gb63N5z7rym3fxtdymIzBqAGzen9RJ/XcJcL9llixLqcLPPFjhhCruzfa1Kt+Y/30O/3GcU463uORPX7fpckCmqZCyAlBM1iJQ58Psw2AIuGo8wGXJf/+5Jk9gDDbR/Dq9kacFLC+HF3DyYMxG8SzPsAQTMLIcXcPJgSIdAtOGjCEEzEp+0zvuSEtxLrT0+ospGU+CRE6Y2CrF2++h3uo/lGUhRH03eLx2vt3opL6apm3rHRQgoGCaMGaU0wB3vCWmL8Ake9iaRcRFgKDMwOXmMOhCGdtJGhRUoHvVNALtw67k9ffrCdXUyMEAICl9ijdtEZZYjSkwyCYds0dTLO9lUz7TAqeKODBwFQsYUKhMq5qRatSmRC86uOXpvDuEm8i776xX51hT7dOoIGq6SNgZKg0LFc5VLsDDUW9LhqWTbX5YSNVBNPoTTPnjWx539Nny+c7/0sreAYbAmwNpVLpvv6s0tC6LCBUS/2PKopKJlpOHEkeRvv4kuQMqqdTEFNRTMuMTAwVVVVVVVVJNBQsuYJAexkSNemvmmyYZINR3ZmSYpuhOOhUdBmhaZnDjtWdmmeuWSyWQzGNv7lVyU4a6FCvZKr1u2xBsa6FYX+lt2nnChUFyL1RVLpFKGtFzDBYdngApP5ZHmPf33MfANTH4HWKsZ9QlaY//uSZPsMQwYXxBM+wBBPwqiSdM9mDvhvCA17QEFKiqJZ3DCYejhDuBFkV8qHkoBmXxAGGkPDAQqyEoU+82vTpYypZSn5eNLwaoZpuMdl+Hscu7uZocgOPwVSB2i7zfS0qHIX6dOtOgg4kk1iB1y2k9feAlaf+9+5typj1MUkEQEV8y5vDAkSz4/Pj125jFUMwxhnWj60xLt+EXkx2WsymFXFYm1OPoMlMxdSTn+PU47gVbFauxynjH1SGJzm0CpI2Mev9qfXT26rS7QG+4wHWH2ZTchjlVjXmRSn3N9iZsAERm7jqzWTGMVHE8soQ4YLfYBDcfTYiiictvNAKG/Rn+zB3MXdpnrYQoeXJBohdy2u1bKuQ7//0VtdZo//3e//UkxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqi2xtRmA0FkdVTUZ3vAhmLIAyTqzDDQoYBwOB6UdbNq30URXVsT3it1pNmUP5MbnZ2PsnZwGBbrXn1xgxxlOhgm1iLYUlN9qlqbufyroFEwXtKJtUXAdriSJhCFJdP/7kmT1AAN+F8KL2cEAVgKoYncMJgwwXRLO4eTBBYri5cGxmOphx12xySy0o+PknoOoKpegyXSK1pVkKntYwSrJEAiKWqAgbmibMHyaNmMoIE0TGRHhW5YOkLFVNZS9ZSI04w1a279PPvDuYsUuI13jt0KY2W+H1Z0PKGPe9707FoP5SlCyyv91jdlv9Wuz9nX/06VmgAg2VWhWkkk8LIAKB5yKfRqOjZgOBCqoqATrPnEX/Q8ZBGX1VhX71V7tlfbruCyiQGo7nxqtKAwguObpsHlBgXuke79f/5Lq6P9rp7++7/6aAIFVT//3ghtbBs02YhoJSqoIc6GxGtJ+0mhyAV6jMu9RBAV5eYYKMH13o09je6y76+/9+jf//3fot0UWTIHI1zCcBhOkoJU2V1QjEBB3MEgE4iAzOEUVFUEWir5CQhgkIoATLwjMFPA88Bxifor/c5KQqAY5C/ktvyqMrAHlrWJbOXJ3lDh3HW9VN0+OH9+mxhEDivExdiQVQSAxFL0rmlgBzVGlqvoYVLjzK0WzZbRHmkj2ixcXMOB++eX/+5Jk7YAD0RxBgz7QEFQjCFF3DyYKIGEfrr0tIOmKoyWxlYiPQSYTBVyUAAaqG3dx6BEVzL5iO1I0MHC/21fefcyyQAmBoFqx+BqMADR5xOokEJ7eVNYyIIRCqQrS7/xjf7NH/pWrYdR19/6Uf9Vl/WExKmsBw2YLoWxq0ndmyoCUYawBJ+mBGKji+VhmTihSmMtbZudaagmN17dmP2dzd6Jym2oE/czfp5+ISxdsO5SW/U3qnsDzwTcUPlB0We259TvZmCan+QJkFzmw3WVM2e1tBwj0K2uamxbhtFeuxFmoSjAoGTLoijtM9zEsBiICUji+0vJWqAJky3DbtDLRbMO3b/4l+NLxMaX3JJGUwhUr3+9SdEDPD7Sy8X/t/u/Z6U6qvZ93/p8t6jMJzS7DBOGxNjCTw0gVuTCvCqNLtkpwihwSji/xA4mCt+PI7IQvRBDau098BUMzJZJqWPqvlc8xLoVFITGFFHTfaLRqNTf279VodNhoiWYI5WgMn1FR7FiSOF72k6FitYlWD6WCzjtSl28oDD2ZkDgKkm58YlKl//uSZP+MhEEgQYs+wCBGQpi5cGl0DaxlDEx7IEExDmGF14k4PQwIlrTc0VEigAgrVTxJokIQM/scyXRBGEVgK0cgCRZLZr7hAM65XcXpW5Vha4rtRiGA0V1xd7r9+/X0iYtTX6Sm1us8phkiilQlvT5pFl7bEPr3eKdJDiIIwbzAaDmMcNlU0fzaDCLBXDgJCqAKhikzB6hKOiPDLnRia91pgRRcpU4+5pyXk5KBoZvQ+dPNIZiuffiWOhQaJQpr1NtlGpvNetpFtDmcpoeR1vqFj3dJLA6RZCnLTl5uQ2G1uf9b+skBomdZOHnB1mJgCA4D3labQssh9HV9qYPBsTpTaazIM1Prokg3mTpy6JZvnmecqWrU9ydYr02SG+lfRZX9/aYq/6Ltul6dW0yqi56sYLYgZlBvUHHoCwBiMDqsTJBC/xaVUypgAGXlK2b4L5lrMIBgOGH5pZyp21NWE9GCuv2bmJfKWQAoPFXmt2sqTSeLDdX+5jLl7OtFatrX3tiyr9Fi9ODe17HJ9SMWccZo6+teH6NMeNbc9nS/NXt/3v/7kmT6jIQCGUEDXsgQTWKohnDIYg0gYQos+YGBKgrhQb6kYN/6dvyd8KVxey4EiIJ/d8MyRroGGxyU/hgiLwsrgCLTNI8MawEqNie/BQA0iKMhInPO9v06P1s+7X16f9F7vbv8WehVTL3uBdB0YKgQRrsLKmgmkiYVYKxyQmyQhPVjQhb8cOUAV9LG5JyPAy14nevS/CQxPC/L4Ahpbr2R6fp56EOCr13pPHqu5y12rmYJZ+f/WYtMo+eNKgZTwP/xP+irfkNZO3bX9up+fd72sg461udhumuhft3f/sjuWvnp4toXoFxspJKtAayBgfNB2kG3YfftV7pY8dHiEAgIgxFs3zqya07O0YNgNJIz27+d7+jq6Vf/d/1J/3L9aUf9umoOyEAR1DAtARNqs5I0VzwjBvBJMA4BIwBwEwgBFImHWqJPFwLKul+l0W5NMiu67jPsxHjy55NbRDgYY0OfhzRkth9WQhf8c/0LK9er5VX8rJJ2tmTvTB/ck9fNrPbt6meeZa/M6X7W/qx8Mvh/szsVyyI3mdk8iJyuUyf8obb/+5Bk+I9D5xhBAx7QEj0iGLlwI2YPcGMECHsgSPMK4p2xMZj/g+yrr0Asqt2EKjMPDc/sow4sJsqUYIJwlE0nS8jW01t0vHvmmG098qDotoLWnZmvcHcTs8mheLfVxXts1XLR/tU25+KV1b0UaDYEFxEzTAmAAOBA0s2uhDwwWk4UEGTLASvT6b0tQjIySAVhhI9HphFKlUu8RYjDWh6m+Ima6hWI78ehvBWEsxHezRK7z/8zkd253LarCLl+1g3Lf6tl15V4r/+t5NZ1FuWGT7+8T5HDaWCPft37dfqY9SEjtQ1P9ufIuda/GVNWLAQBmH5UcXneYdgYogqYgGIIjkKQHE1SvDdJelMdr/b/Oxbv/204FmrG2O0t766LNlMlQdveTfKI16mjvtTbpTu++znkFGxAtf3GakwA8zVUyiAzAPAkNFMQo5FYkwjBYnhAh/ulAj1AIKi19dm9HQwzKt+H88ePD6bN8Itlh3o2LC+PM8VLJSa0UQrFnvAy1HIWADxhRjHFzixS5qTZo0UrF9trYYIpawWqWk814/F7xoj/+5Jk/YzEHWbBi88bwkVCuHJxiDYPpG8EL2XlCTUK4QHOsEigACDplQUvm+HnCyGyRMccCQrMzatKMCg0B4CTl5UIz3ilGO4E7YYxlAynLaj/EXOG1n7UkMQy3hJQaNXxe7u921Uz0o2ye17H2dtKP96Pu2NR/15sKIVslT6MGAVPmCsNgWEMLQJBgBTyQC6rdEyhK2NCCKkxb1aVQ57wwnAkyH6xJO2NrxSrE+tyAGFhYoqMLUCEegePABhYgFBi0ihckPQAZCOm8kXG1Bg+meqaPYOYtUvS8ahEja4Yl2ZYdSLIR5VcYw18lNhz4ViwoCQxJaLHqD4vlF2rVHD39GCAfVJwtA9Z1HNWA6+1xnSL2/2dbWWq/dzPR/29f/YuIghAMMAgCcwYQ5jYLTNAWTphqAEjwP4kCCqkrlsCzQqgKGQDyheCqLsuhOOZMxiP4w/Vp5I/hfcOY+ssjeecORcAjUIuzted5btXd0+t8KLb6FWM6UCk9PL1l7o7TQlYwYZatNLqq6OxphLTFQyoJIbRbOakiwjSnIVSfHkbI1lu//uSZPIBw5MYQzPdeIBIYrhAcekmDYhdDM6Z7IDvCqIJxaCISVdekTndDiZZQFpsNxri7GUVAY67Yq5Swhk4onCVaEBZlrdIvZnc6F9qZQIWsrM2zbS2Btjmw5zjAJMML91EW1xd1X01RG9IXscUr7HoX1X28t7rn0JfdoZY9ymLL0ALCuDAghzjLyDc11zDEKjAIE0DZKxNqLLwrGLwkk1IVWBPXUPaR1tKEO4MQG4/RrjWwGXW/x0GBGxpMeqKipU6Pv6TxpIDLGQUHBsoc7TCQiWJLYtKgIkJkhhBj6lt6yEzwvGANr1AQeOA73NvhZqdS10jgyI5+kLxkiQIoHMHQ1cKRSvNx8fjwLBs11d0oNschL9D8qlITUmKtIezPbx4vff4kIrVTaiVf67zWdQ8ov2MemsRhQQllMAQOQweU5zKvJiMDUC8mgJHSETBhDchgYWC61qyyymsx6vTwin19aVWqdmQsCVT89VqQ5GFTxC5W7l9ulk9HuNq6V/76a9Bqr+Dan/eou1lelJLr7WgY+wVYg673ft8dFqdyJ5m5f/7kmT/jMSoY0AL2BrySQKYYXBrZg3gXQgsdYEBHAqhybSgmN22hWmvq2svZl/Pkf2NFWAEUZYbUTbrYvUa4OhK6ogBZDn1CoT7Ipkmf/OsDCnVyjtnr33/edK7+x/5nV6nIQ3f+pNnWv/u+oWA5MAoBYwTQvzONXkNSYQMOFdMBkAkdAUWcuYhqdBSqUYyGhJgvT/U+32HSPbJ4zjITcEaCLbnsli/HYd4NUf0jUxCAjKOzaZHFrI7uaQkeYdSJ2jLmp552Q7Ry39+tkkpUnUyctCZqDRWIvdsh8VA37+VyNCnigfGxcrZnwgSa1aUop385SXBnJXyMhMIUywo00tjj/HEmRvq+wJ6b6fUYBWuptvTrf7kIFh87WPkr7JWR3J/6dnkGevRjOytn2dXxo1CORp6qkaSgBcwQAZDUEO7MicYMwSwCBoCEwCwABUAIwAQEGHypIBSIxrL4CvclawoUhrXiLC/Z4hAi/Ihqa2JqXCQFmiqKMuruoufT4vzvG2zu69rFSKfVyOHzPhf5MFhRZpe5Mp6Opii17g6c8+LJxT/+5Jk9IwD1hhBCz7AEjiCGLptIyYSDaD+DzxpyN6KogmzKOC5ZTEThVSrqueh338iPWwuZU3aunbDH4TXSz+CQ+KCoQ14u104gIOjZg4HfyB3DEYJHEiqqWd7ZluMIKu75yhZQ2w+OM9M10VehP7/TsLVkBUGLgLQl2nuyLuncKdEWWRcisJgOgNGoOQ4Yl4vQJAFFAClL0e2RLrfCErPbWKLRddr0EPzG6K5925NfUcSCGPQ5MYWbETl4iADaBfmrlmtTayz/fcKf0wnPAaCNw5gLIMnHJbIxnp41DGQ5EnUoRLyeRjCA51bM5h4UW4MrdK0qP9oXuOhyEb8G45tLgAICnEkkq1lpRo24DsL9i1wWpHGJXpdjH/ZCX0aAmlaSQylL5juRfs/Q9tmXV9Xr37X/+6Lf6OiIMeAIEYAhgHATmnIG2ZEwUYYBoW6j8mTtL1MLGgDjLoex+nIZhuMLZJSPiFSrU2DlJUxtU/2qlnbPFvlEcjik4/oUJ/I083nGVtiU617SIm9/p2WmXyGkmaecZav76QHe5t9YvOqt0Iq//uSZPWNhFljQAPPGvJBQqhibMU4D8FxAi8EW0jdimK1oZTg5x11q9BxhryoK5tlLSi+xMCWtJmgMEYYeMm6e0Rgpopn08DWVaShbnxJJ43oqyHO7d+cW6q1XUM9rzNqgk0DtuOHC/u+dv/ey+KofvpvS269LdKLdvv+ubXYZGgEEdTAdBMNKsJkyEwrysBsQgDJ0KuTXLmNySoUR0p03GU8EiyRlc68CS821EqREF07UrMylekwUyHpGPUZ2Mjm5eskc+7UsoRyz/znPS0JUhlJS95kmORBzuXLl+b82LuvHPtiQ3qzna2lekq1lqhkrpEs97K5J5FZD56GRT9Cw1Kgs2Ze8BksicydJngEC5QKE7osJMdzKs9088WO61WA4tOJZcjxSxXZ+MTtFam1VVIRp/XY79+xj4xYu7YCSOSoq0tSo0YCBudgKEYuIAKgGyJ1HpdEah7oaP5OrKuOxguo4XzFljR/RRhLBCXcJgi6UylbnTl+46p/sbOxn1/ldDrFoC6UlzWr8/5kRfm+UzJpTY5Fc65Ww14dJTQ1tJyqSv/7kmTzjKQfZsCLzxriP+KYYW0iJhBdqQAPPGuI/YphlbSUmH/L+532vt4PiUWbskFO9VW8NLDEriBSTIVsBAan7/pqPjmQfxByQTtLxqjZQ4dRfeUbOi6zXs6+zb/1qsqQ3UuP/f//6PV8YFCFpVAUGioczx6bsHiYNAIj+hChOloJcuRdhF45vo0lLFCTzOsPp41axY6oLkAxJZWx4lFRGJGlnnhDUzjF2UoYpJ5eNI8OTPGM/eKTLDedKITqsaGqgu/nfI06l1YX1WY/PLUoDg06StlkUK1TUl/I3HQd78Fb0O5e6KpIQ0nrqdwQIg/7IDQs00lbWNEXcVZBhNo7H6FY65Kqc37lBQSjxCSCDKDJVj3ip0Ay+5byzS4CUoXpTWtVJJ4pKKLh1xr1kKpjJITFYSqsQ5+Hb00uaMCSAKfH3wEFWb+vmgMaIAeZuhB9ZGLByQtKFJCrEAWI5ojSia0fUbqqUTOBRvw7RguBR9hWe9gEWJGCd6DqR90m6MhgEFq0k3ECmPfQPCREmEBKquLicW3WEUg0J1NYx0HWuZb/+5Jk74wD1lhBC68aci3hOLkHJgIQTWMALrxpyVeIYMW0rOAKu1xdxG+vDjMzb4wyc8gsWggKIxI2yBIcRpO0/sURGO8WCjpk/HlHNGZO8mghZeqW0NRQuryWgZc+9b2XLWxLc7FjO9Sfm7VpJZDYSyKAIABkBRAKxipf5rExxgwEK6VM1CURB4EIKISJ8qDzXTi/QqlmHNIGYLYdZZA5VNp/RMKNGhgBdRmGUGTCtMKLWuSqaoGNxggxmFJ2Dx4MKXSMmFdNR5Lcijd+g09YOsNCRvJxDwq2YOkTUoONsWPj0A9SRAVsa9HyGCrejufBWBjD9BLfkqxy2xlW+/3K4weh+bYO8sT2BoJJrMeo31GN+47hD5AQiwALxZ3QzTMUwxW9ArXcte5FAQXopSKb63zG92wEL+yrejI98ioAPTSsX5RAKoNNd7I2AzQUBFB4w+sld+LQRTPanQYxAbPrfTVoUS8lRpPpdPHnDiWmWYtNO8UmQIjn336klIPFRuogVaQXtA0d8vO776HkD9eo9DJ3A1P/PV59H6TP70YPLfdx//uSZO4AwyAYQ8ubSJBF4phAbMMoEa1ZAE68ackAiGGFowjg4CU/XtXdoCKW3VlrtnfnwctusWFDCcUed3MGzCzjvnqziwWzc2zWNU8fYtZ/uF49Q801nASmpKvnB1N1Iylo5jP2uDtdxKo1S1aliZuaZYeT4tpcOQ9Tqw4gHCgoOoX08uAhYhIDE85TaA0JQcAXLCG4Lzw+W2ybZn7EYlAm728tIigLTZejgtgmf7kRK6x66bjBoJ02CMO4jKOxT4xj3jliUwcqMxjlfVKZAzMqfOeadzNv1o/arsL09otJKnliaa/r6/AFNkDpF8zrdqEx83J4EOKEC2kWUkFGOY4HOKWY7za+Mo6EIBCBmljQ3KasluK1P3LS7IKJFWiYWUlTmvSWlIkdY4VSxezqCDN5JYqxI3xSxhumQAHACyYeDI6JW42MTIwsAUAgFH2VypMRlIyjJjOatozV0p72w27zqzGUBiwsejAo1Q1tEfEYyCLcvThZESExWtmIeF5FLFNzPk2mmUPbzlYrkTH5yugc3OEVaNnSNnyRTTmdzaJ06v/7kmTxDINtFkIzhnsyS8KoMGzIKA8FJQZOMGnJJQihVbMIoKzMmjOj2bRe5UjLfVTvc2jHtS8MiwSlnAGxSqzEgcI8MVW+Dhh+tD+podMpOiL9jJ1sqAiiEK6cQAZeg65601uVptS5o65lHUOkfaLwzr3bZ5QoMf0qUlbqaidA8ILTBIID0YxzWJhTA4GmromsHetThp5UAZNCLZOhAGk8cFxR15b7niJconN7BpuzxnJXeBvfOpL0x2QnRQjLiuD1vm/x393bm1tjLmRw0z5MIdMenrD86j05f/PNEF5qqkudQ4SkRgqHsr2mcmrcGLsp0pWpd4aEo8qlJEGYDJId2ElTXpQDF0XBBQydOKnSm/TNbObdr0UMGAcVFDR7NDlwFoqht4peIUjhspUTUy9LYpOuYPnGE1CpTUvUdpCKBiXJxBeUJsCTWPES83A8SwlVqPCVQSOkwUOEQ+GhfYYyR/IgL5PECQhoZltbW3rUt3ccwqXtDUDEUquh/3ZNJJsvq5986f97tlPh98+0zL76JymRHSnadKeZNeNZ9T1ue7T/+5Jk8o2D9mhAC68a4kPiqGZpIiYQHaj+DrxtSUKIoMG0nKhmLwmZ/+9nkSEM2x2HcZL45bu3cQOheK/0VHCT9sDL1gENGas66nRB6GOUrKFCjKFaXfkX9kVfKsUCAVb7v/dq8X9Pf7kslert+r9Gjr3E3tipQIKzyoBB8oNRyEqBhAB6okNVDi9qRj8oFI8xuMtH8rIz1Ov4sNla7Wgx10B7iVku8c1OmUZHd0apINr6vJijaEHjHFda0RWfU/QiNkzQdoCiK5vDTVG6dHhBoSNNCRuRUx4pmRaq1BnJMKGPcQiFDJCEEZi0doS5gjSuScBsruTsiR0HIiPdQm0nj4EBLJUneajLGPk8BFwhAntoujZxz9xJm+6sCKNDSj5JNBFDetZpsypmf7BfcU7IhTsER4k2YXO9eSpqh88q1ugislKuvJjUnhZVygEBhQAZgSCRyCiZj8lZgIAiVbxNJe1vYfg9JGRtbvuZDk5JXiMIsXJlJhCNH0W59SBIazCnK+xR40REdXJulmTM1pdQmsVX17FM0hOs6h2FG3urmrji//uSZOcPg39DQIOvGnIxwpiWZGIoEYGM/A68bYknCGEFtJSg7IfW9+5wnQsqlMjGO70jrWRUi7r5lDqZcLqmw5wGx5N7/AqfMB9sRO2qocE5mLkDroluZqAGLu4jc27NTWCFx0qklWT0Oe6kvTdmr7krUzP1fr0gDmU3tddrTXFb0fGG1OuStp0hRLb4iCsEYAEp07YHJT8TDZClx2NIKKTqjUAw2fXEertYYW2K7nVroUQKefqa+AEfuYvbX+2y0yZcymIItAo8StwyvnedtDFkyHsbIbSatuGONzliREOab18w2QNnCFDdNjWU4m9fd6PMdQvrXmOEJl6XhGqv10CWfrzr/HXGBx2Kgc1VTDPSn39N/doN9ZZLivv2bNWesec0jKO3vyvQ72Sj+5T302I0blLpVRADIcB5hoWxkHRplEJ5haErlNRWIsKmEyWYg5yJdIXaAEkRhEY4yNXcBKgUDTprEbAiBMTxrLrDzKbvG70iX5VXFLrDzEzUdJQ/uZX1kZ2g2vuXN6irm2PrnqNeoaZS6Qqkmueae+6vjWUgzv/7kmTqDIPpXsADphwyQIIoQGzCKg6VIQIuMGuI1Yph4aGImOHbWFuFHSsKr9/FXQ76gdq1uORJHm5hkAuQiAlCcoCLtfazcpJdN5XZ7P94PsTtd1OCSYE8qh6YXbjmUY+9u/sVS8lSYRM3UOk3MW0WkpgVnZkmcbrpcsWvUwJJP0kLd6VNAAQIAQAQABpZI1MY4S5hBBJ6qRDAGvQwiHRomgkEKVODHTCYHX026QpmVgVcAwBSI2VOah5gDkAqYgMOUO48xecQeGRxeBygpEhpBR1JqoQvQGrQbGw9kPGZEWLMmUk1MhE6DNCwDLjRFlmiJwvGSabXQRlAbYyh4cA5ZEyZMTxNGRsTPWqy0xzyUHAQwiozZGkkQQxNSkovHZig+gpaa1WIsRAi5IkHMCXIoakQIeipJJMumLF4yeyddFVddayuT5YIITBdIuUS2RQvE4RcnSfMUTUyUkuihU6loJ1f///nCuRRH///9FFjIQCgl1GpUilI9YxSpv3ni7EE+muymlnViPHSRp7QiA/SXa8muEGPBJRWlisHCQiT0of/+5Jk9QAEJWQ/hXUAAkliGDCtiAAdUhEK2ckAAlo6oIc0sAAjTd2VuJii0tjd9ons3NT5oeNPmp1D/fVJrJ2fUY6Ns06mS71Ltip9VxyKuLnqP4VX3Ne6msafo8x7JefZzX37ZprGqMtelDmtv6Um5as469p5R0R8////Ebf///////9YLf/ii0xBTUVEjdE1FxOmIfxBiFPCVD1FydqVDUNZbCoIgiS0RCoVYRCoVItVISXVUKFnJIkQSBoOlQWgq6VOwaeDQdKgqVBU6IjwNA0sFR4KnREHCwNRL/1B2VOiUNKBpQNHip0SgrBqDT53//BXYCBWAkAYdrkkSTF1kxMT3mly60DAQoeCp0FQVLA0oGjxU6VO//+Ij0FYKuUqTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uSZIqP8z0WsAc9IAArgWWx5gwAAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqg==";var su=new S("ResponseNotification"),Wg=.5,jg=200,zg=300,Ho=p({sound:{type:"boolean",description:"Play a sound when a reply finishes.",default:!0},soundUrl:{type:"string",description:"Custom sound URL. Leave empty for the default done chime.",default:"",placeholder:"https://\u2026/sound.mp3"},preview:{type:"component",render:e=>(e.append(j("Preview",du)),()=>e.replaceChildren())},browserNotification:{type:"boolean",description:"Show a browser notification when a reply finishes.",default:!0},onlyWhenHidden:{type:"boolean",description:"Only notify when this tab is in the background.",default:!0}}),lu=null,oa=new Map,cu,na;function Vg(e){return new Promise((t,o)=>GM_xmlhttpRequest({url:e,responseType:"arraybuffer",onload:({status:n,response:r})=>n>=jg&&n<zg?t(r):o(new Error(`HTTP ${n}`)),onerror:()=>o(new Error("Request failed")),ontimeout:()=>o(new Error("Request timed out"))}))}var Jg=e=>Uint8Array.from(atob(e.slice(e.indexOf(",")+1)),t=>t.charCodeAt(0)).buffer;function Zg(e,t){let o=oa.get(t);return o||(o=(t.startsWith("data:")?Promise.resolve(Jg(t)):Vg(t)).then(n=>e.decodeAudioData(n)),o.catch(()=>oa.delete(t)),oa.set(t,o)),o}async function uu(e){lu??=new AudioContext;let t=lu;t.state==="suspended"&&t.resume();let o=t.createBufferSource(),n=t.createGain();o.buffer=await Zg(t,e),n.gain.value=Wg,o.connect(n).connect(t.destination),o.start()}function du(){let e=Ho.store.soundUrl.trim();uu(e||ta).catch(t=>{su.warn("Sound failed",t),e&&uu(ta).catch(o=>su.warn("Default chime failed",o))})}function Xg(e){let t=`${e??"ChatGPT"} finished answering.`;if(typeof GM_notification=="function"){GM_notification({title:"Bloom++",text:t,silent:!0,onclick:()=>focus()});return}if(typeof Notification>"u"||Notification.permission!=="granted")return;let o=new Notification("Bloom++",{body:t,silent:!0});o.onclick=()=>{focus(),o.close()}}function $g(){typeof GM_notification=="function"||typeof Notification>"u"||Notification.permission!=="default"||(na=new AbortController,document.addEventListener("pointerdown",()=>void Notification.requestPermission(),{once:!0,signal:na.signal}))}var mu=f({name:"ResponseNotification",description:"Play a sound and show a notification when ChatGPT finishes a reply.",authors:["Bloom contributors"],tags:["chat"],icon:"bell",enabledByDefault:!0,settings:Ho,start(){$g(),cu=x.on("fall",({conversationId:e,outcome:t})=>{t==="done"&&(Ho.store.onlyWhenHidden&&!document.hidden||(Ho.store.sound&&du(),Ho.store.browserNotification&&Xg(Ro(e))))})},stop(){cu?.(),na?.abort()}});var _g=`:is(${u.sidebarScroll}, :has(> ${u.sidebarScroll})) + :has(${u.menuButton})`,eh=`${u.rail} > :has(${u.menuButton})`,ia=`:is(${_g}, ${eh}, ${u.oldProfile}):not(:hover)`,ra="[data-bloom-profile-avatar]",th=`:is(${ia}, ${ia} :has(${ra})) > :not(${ra}, :has(${ra}))`,pu=p({opacity:{type:"slider",description:"Opacity of the account row in the bottom-left of the sidebar. It returns to full opacity on hover.",min:0,max:100,default:50,unit:"%"},fadeAvatar:{type:"boolean",description:"Fade the avatar too, including a custom one.",default:!1}});function oh(){let{opacity:e,fadeAvatar:t}=pu.store;return e>=100?"":`${t?ia:th}{opacity:${e/100}!important}`}var fu,gu=f({name:"SidebarIdentityOpacity",description:"Fade the account row in the bottom-left of the sidebar, avatar excluded. Hover brings it back to full opacity.",authors:["Bloom contributors"],tags:["ui"],icon:"user",enabledByDefault:!0,startAt:"Init",settings:pu,styles:oh,start(){fu=me()},stop(){fu?.()}});var hu=`/*
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
`;var D=M("bloom-star-chats"),rh=80,ih=60,ah=1200,sh=120,No=p({replaceReadAloud:{type:"boolean",description:"Put the star where the reply's Read aloud button is, and hide that button.",default:!0},messages:{type:"custom",default:[]}}),lh=`:is(${u.turnActions}) ${u.readAloud}`,aa,sa=!1,Ue=!1,dt=!1,ur=0,z=null,dr="",B=null,la,Ge;function ua(){let e=No.store.messages;return Array.isArray(e)?e.filter(t=>P(t)&&typeof t.conversationId=="string"&&typeof t.messageId=="string"&&(t.role==="user"||t.role==="assistant")&&typeof t.snippet=="string"&&typeof t.starredAt=="number"):[]}function da(){let e=b();return e?ua().filter(t=>t.conversationId===e):[]}function ch(e,t){return ua().some(o=>o.conversationId===e&&o.messageId===t)}function bu(e){let t=ua(),o=t.some(n=>n.conversationId===e.conversationId&&n.messageId===e.messageId);No.store.messages=o?t.filter(n=>!(n.conversationId===e.conversationId&&n.messageId===e.messageId)):[{...e,starredAt:Date.now()},...t].slice(0,rh)}function ca(e){return e.messageIds[0]||e.el.closest("[data-turn-key]")?.getAttribute("data-turn-key")||e.el.getAttribute("data-turn-key")||""}function uh(e){return ce(qt(e)||h(e.el.textContent??""),ih)}function dh(e){let t=e.closest(u.turn);if(!t)return null;let o=Be().filter(n=>t.contains(n.el));return o.find(n=>n.el.contains(e)||n.el===t)??o.findLast(n=>n.el.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING)??null}function mh(){let e=[...document.querySelectorAll(u.turnActions)].filter(t=>!t.closest(`[data-bloom], [role="dialog"], [inert], pre, ${u.sidebars}`));return e.filter(t=>!e.some(o=>o!==t&&o.contains(t)))}function fh(e,t){let o=No.store.replaceReadAloud?t.querySelector(u.readAloud):null;if(o&&!o.closest("[data-bloom]")){e.nextElementSibling!==o&&o.before(e);return}let n=ph(t);(e.parentElement!==n||n.lastElementChild!==e)&&n.append(e)}function ph(e){let t=[...e.querySelectorAll("button")].filter(n=>n.dataset.bloom!=="message-star"&&!n.closest("[data-bloom]"));return t.length?[...e.children].find(n=>n instanceof HTMLElement&&n!==t[0]&&t.every(r=>n.contains(r)))??e:e}function gh(){return[...document.querySelectorAll(u.headerMore)].filter(t=>{if(t.dataset.bloom==="message-star"||t.closest("[data-bloom], [role='dialog'], [inert]")||t.closest(u.sidebars))return!1;let o=t.getBoundingClientRect();return o.width===0&&o.height===0?!!t.closest("header, #page-header"):o.top>=0&&o.top<96&&o.left>window.innerWidth*.5}).toSorted((t,o)=>o.getBoundingClientRect().left-t.getBoundingClientRect().left||(t.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1))[0]??null}function yu(e,t,o){return s("button",{class:t,attrs:{type:"button","aria-label":e},on:{pointerdown:n=>n.stopPropagation(),mousedown:n=>n.stopPropagation(),click:n=>{n.preventDefault(),n.stopPropagation(),o(n)}}},N("star"))}function hh(e,t){e.setAttribute("aria-pressed",String(t)),e.setAttribute("aria-label",t?"Unstar":"Star")}function mr(){return Ue||dt}function Kt(){ur&&window.clearTimeout(ur),ur=0}function Qt(){Ue=!1,dt=!1,Kt(),Ge?.enter(),z?.remove(),z=null,dr="",B?.classList.remove(D("-open")),B?.setAttribute("aria-expanded","false")}function fr(e){return e instanceof Node&&!!(B?.contains(e)||z?.contains(e))}function bh(e){e.classList.add(D("-flash")),window.setTimeout(()=>e.classList.remove(D("-flash")),ah)}function yh(e){let t=Be().find(n=>ca(n)===e),o=t?.el.closest(u.turn)??t?.el;o&&(o.scrollIntoView({block:"start"}),bh(o))}function Ah(){let e=b(),t=new Set,o=[...document.querySelectorAll('[data-bloom="message-star"][data-place="action"]')];if(!e||ue()){for(let n of o)n.remove();return}for(let n of mh()){if(!qe(n))continue;let r=dh(n),i=r?ca(r):"";if(!r||!i)continue;let a=n.querySelector('[data-place="action"]');(!a||a.dataset.id!==i)&&(a?.remove(),a=yu("Star",D("-star"),()=>{let c=b(),l=Be().find(d=>ca(d)===i);!c||!l||bu({conversationId:c,messageId:i,role:l.role,snippet:uh(l)})}),a.dataset.bloom="message-star",a.dataset.place="action",a.dataset.id=i),hh(a,ch(e,i)),fh(a,n),t.add(a)}for(let n of o)t.has(n)||n.remove()}function vh(){if(!z||!B)return;let e=B.getBoundingClientRect(),t=z.offsetWidth||288,o=z.offsetHeight||120,n=e.bottom+6;n+o>window.innerHeight-8&&(n=Math.max(8,e.top-o-6));let r=Math.max(8,Math.min(e.right-t,window.innerWidth-t-8));z.dataset.place=n>=e.bottom?"below":"above",z.style.left=`${Math.round(r)}px`,z.style.top=`${Math.round(n)}px`}function qh(){if(!mr()||!B){z?.remove(),z=null,dr="",B?.classList.remove(D("-open")),B?.setAttribute("aria-expanded","false");return}let e=da(),t=e.map(o=>`${o.messageId}	${o.snippet}`).join(`
`);if(!z||dr!==t){z?.remove();let o=e.map(n=>s("div",{class:D("-row")},s("button",{class:D("-jump"),attrs:{type:"button"},on:{click:r=>{r.preventDefault(),r.stopPropagation(),Qt(),yh(n.messageId)}}},s("span",{class:D("-role"),text:n.role==="user"?"You":"ChatGPT"}),s("span",{class:D("-snip"),text:n.snippet||"Message"})),yu("Unstar",D("-unstar"),()=>bu(n))));z=s("div",{class:`bloom-root ${D("-panel")}`,attrs:{"data-bloom":"star-list"},on:{pointerenter:()=>{Kt(),Ge?.enter(),dt=!0},pointerleave:n=>{fr(n.relatedTarget)||Ue||Ge?.leave(n)}}},s("div",{class:D("-bridge"),attrs:{"aria-hidden":"true"}}),s("div",{class:D("-head"),text:"Starred"}),s("div",{class:D("-body")},...o.length?o:[s("div",{class:D("-empty"),text:"No starred messages in this chat"})])),document.body.append(z),dr=t}vh(),B.classList.add(D("-open")),B.setAttribute("aria-expanded","true")}function xh(){for(let r of document.querySelectorAll('[data-bloom="starred"]'))r.remove();let e=gh(),t=e?.parentElement??null,o=b();if(!e||!t||t.closest(u.sidebars)||!o||ue()||!qe(t)){B?.remove(),B=null,Qt();return}B||(B=s("button",{class:D("-toggle"),attrs:{type:"button","data-bloom":"message-star","data-place":"header","aria-label":"Starred messages","aria-expanded":"false"},on:{pointerdown:r=>r.stopPropagation(),pointerenter:()=>{Kt(),Ge?.enter(),ur=window.setTimeout(()=>{dt=!0,ut()},sh)},pointerleave:r=>{fr(r.relatedTarget)||(Kt(),mr()&&Ge?.leave(r))},click:r=>{r.preventDefault(),r.stopPropagation(),Ue=!Ue,dt=Ue,Kt(),Ue||Qt(),ut()}}},N("star"))),(B.parentElement!==t||B.nextElementSibling!==e)&&e.before(B);let n=e.getBoundingClientRect();n.width>0&&(B.style.width=`${n.width}px`,B.style.height=`${n.height}px`),B.classList.toggle(D("-here"),da().length>0),qh()}function wh(){let e=new Set(da().map(t=>t.messageId));for(let t of document.querySelectorAll('[data-bloom="navigator"] .bloom-nav-tick, [data-bloom="navigator"] .bloom-nav-row'))t.classList.toggle(D("-mark"),!!t.dataset.messageId&&e.has(t.dataset.messageId))}function ut(){if(!sa){sa=!0;try{for(let e of document.querySelectorAll('[data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();Ah(),xh(),wh()}finally{sa=!1}}}function Sh(){Qt(),B?.remove(),B=null;for(let e of document.querySelectorAll('[data-bloom="message-star"], [data-bloom="star-list"], [data-bloom="starred"], [data-bloom="chat-star"]'))e.remove();for(let e of document.querySelectorAll(`.${D("-mark")}`))e.classList.remove(D("-mark"))}var Au=f({name:"StarChats",description:"Star a message from its toolbar. The star left of the top-right menu opens this chat's list.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"star",enabledByDefault:!0,settings:No,styles:()=>`${hu}${No.store.replaceReadAloud?Le([lh]):""}`,onSettingsChange(e){(e==="messages"||e==="replaceReadAloud")&&ut()},start(){Ge=vn({over:fr,trigger:()=>B,panel:()=>z,setHeld(o){if(o){dt=!0,ut();return}Ue||(dt=!1,ut())}}),aa=E(o=>H(o)&&ut());let e=o=>{fr(o.target)||mr()&&Qt()};document.addEventListener("pointerdown",e,!0);let t=o=>{o.key!=="Escape"||!mr()||(o.preventDefault(),Qt())};document.addEventListener("keydown",t,!0),la=()=>{document.removeEventListener("pointerdown",e,!0),document.removeEventListener("keydown",t,!0)},ut()},stop(){aa?.(),aa=void 0,la?.(),la=void 0,Kt(),Ge?.dispose(),Ge=void 0,Sh()}});var vu="filter:blur(6px)!important;transition:filter 0.2s ease",qu=`:is(${u.sidebars})`,mt="data-bloom-streamer-open",Eh="[data-app-action-sidebar-thread-row], [data-app-action-sidebar-project-row], .bloom-recent-item";function Th(){return{conversations:{selectors:[`${qu} a[href*="/c/"]`,".bloom-recent-title",".bloom-recent-preview"],hover:!0,row:"[data-app-action-sidebar-thread-row]"},projects:{selectors:[`${qu} a:is([href*="/project"], [href*="/g/g-p-"])`,"[data-app-action-sidebar-project-row]",".bloom-recent-project"],hover:!0,row:"[data-app-action-sidebar-project-row]"},accountAvatar:{selectors:["[data-bloom-profile-avatar]","[data-bloom-menu-avatar]","[data-bloom-profile] img","[data-bloom-csi-avatar]"],hover:!1},accountName:{selectors:["[data-bloom-profile-name]","[data-bloom-menu-name]"],hover:!1},accountEmail:{selectors:["[data-bloom-profile-email]","[data-bloom-menu-email]",'[role="menu"] a[href^="mailto:"]'],hover:!1},headerTitle:{selectors:["#page-header h1",'[data-testid="conversation-title"]','[data-testid="thread-title"]',"header [data-conversation-title]"],hover:!1}}}var xu=p({conversations:{type:"boolean",description:"Blur conversation titles in the sidebar and the recent chats switcher.",default:!0},projects:{type:"boolean",description:"Blur project names.",default:!0},accountAvatar:{type:"boolean",description:"Blur the account avatar.",default:!0},accountName:{type:"boolean",description:"Blur the account name.",default:!0},accountEmail:{type:"boolean",description:"Blur the account email.",default:!0},headerTitle:{type:"boolean",description:"Blur the conversation title at the top of the page.",default:!0}});function Ch(e,t){let o=[`:is(${e}):hover`,`.bloom-recent-item:hover :is(${e})`,`:is(${e})[${mt}]`];return t&&o.push(`${t}:hover`,`${t}:hover :is(${e})`,`${t}:is(${e}):hover`,`${t}[${mt}]`,`${t}[${mt}] :is(${e})`),o.join(",")}function Mh(){let e=Th();return Object.entries(e).filter(([t])=>xu.store[t]).map(([,t])=>{let o=t.selectors.join(",");if(!t.hover)return`:is(${o}){${vu}}`;let n="row"in t?t.row:void 0;return`:is(${o}){${vu}}${Ch(o,n)}{filter:none!important}`}).join(`
`)}function Lh(e,t){for(let o of document.elementsFromPoint(e,t))if(o instanceof Element){let n=o.closest(Eh);if(n)return n}return null}function pa(e){for(let t of document.querySelectorAll(`[${mt}]`))t!==e&&t.removeAttribute(mt);e&&!e.hasAttribute(mt)&&e.setAttribute(mt,"")}var Wt,kh=ke(()=>{Wt&&pa(Lh(Wt.clientX,Wt.clientY))});function ma(e){Wt=e,kh()}function Ih(e){e.relatedTarget instanceof Node&&document.documentElement.contains(e.relatedTarget)||(Wt=void 0,pa(null))}var fa,pr,wu=f({name:"StreamerMode",description:"Blur conversation titles, project names and your account details while you stream.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"eyeOff",startAt:"Init",settings:xu,styles:Mh,start(){fa=me(),pr=new AbortController;let e={capture:!0,signal:pr.signal,passive:!0};document.addEventListener("pointerover",ma,e),document.addEventListener("pointermove",ma,e),document.addEventListener("pointerout",ma,e),window.addEventListener("pointerleave",Ih,e)},stop(){pr?.abort(),pr=void 0,Wt=void 0,pa(null),fa?.(),fa=void 0}});var Eu=p({openNewAsTemporary:{type:"boolean",description:"Open New chat as a temporary chat.",default:!1}}),Bh=/^(?:new chat|新聊天)$/i,gr;function Ph(e){return e?"/?temporary-chat=true":"/"}function Oh(e){let t=Ph(e);`${location.pathname}${location.search}`===t||e&&ue()&&location.pathname==="/"||location.assign(t)}function Rh(e){if(e.closest("[data-bloom]"))return!1;try{let t=new URL(e.href,location.origin);return t.origin===location.origin&&t.pathname==="/"}catch{return!1}}function Dh(e){return e.closest("[data-bloom], [data-app-action-sidebar-project-row]")?!1:Bh.test(e.getAttribute("aria-label")??h(e.textContent??""))}function Hh(e){if(!Eu.store.openNewAsTemporary||ue())return;let{target:t}=e;if(!(t instanceof Element))return;let o=t.closest("a[href], button"),n=o instanceof HTMLAnchorElement?Rh(o):!!o&&Dh(o);!o||!n||o.closest(`${u.sidebarScroll}, ${u.rail}, ${u.oldSidebar}, nav`)&&(e.preventDefault(),e.stopPropagation(),Oh(!0))}function Su(){for(let e of document.querySelectorAll('[data-bloom="temporary-chat"]'))e.remove()}var Tu=f({name:"TemporaryChat",description:"Optionally open New chat as a temporary chat. No extra sidebar button.",authors:["Bloom contributors"],tags:["privacy","ui"],icon:"ghost",enabledByDefault:!0,settings:Eu,start(){Su(),gr=new AbortController,document.addEventListener("pointerdown",Hh,{capture:!0,signal:gr.signal})},stop(){gr?.abort(),gr=void 0,Su()}});var Fe=['[data-chatgpt-search-unit-key$=":user"] blockquote:not(.twitter-tweet)','[data-message-author-role="user"] blockquote:not(.twitter-tweet)','[data-turn-key] [data-message-author-role="user"] blockquote:not(.twitter-tweet)','[class~="group/user-message"] blockquote:not(.twitter-tweet)'].join(","),ga=p({italic:{type:"boolean",description:"Render quoted lines in italic.",default:!0},quotes:{type:"boolean",description:"Wrap quoted lines in decorative quotation marks.",default:!1}});function Nh(){let e=[`${Fe}{margin:0!important;border-inline-start:0.25rem solid var(--bloom-fg-2)!important;padding-inline-start:0.75rem!important}`,`${Fe}>*{margin-block:0!important}`];return ga.store.italic||e.push(`${Fe}{font-style:inherit!important}`),ga.store.quotes||(e.push(`${Fe}{quotes:none!important}`),e.push(`${Fe}::before,${Fe}::after,${Fe} p::before,${Fe} p::after{content:none!important}`)),e.join(`
`)}var Cu=f({name:"UserQuotes",description:"Show a left bar on quoted lines in your own messages.",authors:["Bloom contributors"],tags:["chat","ui"],icon:"quote",enabledByDefault:!0,startAt:"Init",settings:ga,styles:Nh});var Uh=["--thread-content-max-width","--thread-content-width","--user-chat-width","--composer-container-max-width","--thread-xl-max-width"],Gh=":root, [data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, [data-app-action-timeline-scroll]",Fh='[class*="thread-content-max-width"], :is([data-chatgpt-conversation-selection-target], #thread, #thread-bottom-container, form:has(textarea[name="prompt"])) :is([class*="max-w-[40rem]"], [class*="max-w-[48rem]"], [class*="max-w-3xl"], [class*="max-w-(--thread"])',Mu=p({width:{type:"slider",description:"Maximum width of the thread and composer. ChatGPT uses about 40\u201348rem.",min:40,max:96,default:64,unit:"rem"}});function Yh(){let e=`${Mu.store.width}rem`;return`:is(${Gh}){${Uh.map(t=>`${t}:${e}!important`).join(";")}}:is(${Fh}){max-width:min(100%, ${e})!important}`}var Lu=f({name:"WiderChat",description:"Widen the thread and the composer.",authors:["Bloom contributors"],tags:["ui"],icon:"width",enabledByDefault:!0,startAt:"Init",settings:Mu,styles:Yh});var Kh=[Vs,ul,Al,xl,Pl,Dl,Nl,jl,oc,uc,pc,Ic,Pc,Oc,Uc,_c,au,mu,gu,Au,wu,Tu,Cu,Lu],ha=Kh;var Qh=new S("Bloom"),ku="2.0.86";function Wh(){Wa(),Vt()}async function ba(){Vt();for(let e of document.querySelectorAll("[data-bloom='settings']"))e.remove();rs();for(let e of ha)e.updatedAt=xs[e.name];Ua(ha),Ra(),indexedDB.deleteDatabase("bloompp"),Go("base",za),qs(),Xo("Init"),on().then(()=>{Ma(),Xo("DOMContentLoaded")}),await as(),Xo("HostReady"),Qa(),Qh.info(`Bloom++ ${ku} ready`)}var Aa=new S("Boot");function jh(e){if(e){if(Aa.warn("Replacing another Bloom++ instance",e.VERSION),e.destroy){e.destroy();return}for(let t of e.plugins?.values()??[]){try{t.stop?.()}catch(o){Aa.error("Failed to stop previous plugin",o)}t.styles="",t.start=void 0}Vt()}}window===window.top&&(jh(ne.Bloom),Object.defineProperty(ne,"Bloom",{value:ya,configurable:!0,writable:!0}),ba().catch(e=>Aa.error("Startup failed",e)));})();
