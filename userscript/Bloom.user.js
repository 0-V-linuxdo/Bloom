// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260902] v1.1.8
// @description  Void++-style plugin host for chatgpt.com. Tab favicon, input history, hide Share and Dictation.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @icon         https://cdn.jsdelivr.net/gh/0-V-linuxdo/Bloom@heads/main/assets/logos/bloom-icon.svg
// @match        https://chatgpt.com/*
// @match        https://*.chatgpt.com/*
// @match        https://chat.openai.com/*
// @match        https://free.share-ai.top/*
// @match        https://chatgpt.aicnm.cc/*
// @run-at       document-start
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_setClipboard
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// @connect      cdn.jsdelivr.net
// @compatible   chrome
// @compatible   firefox
// @compatible   edge
// @license      GPL-3.0-or-later
// @downloadURL  https://cdn.jsdelivr.net/gh/0-V-linuxdo/Bloom@heads/main/userscript/Bloom.user.js
// @updateURL    https://cdn.jsdelivr.net/gh/0-V-linuxdo/Bloom@heads/main/userscript/Bloom.user.js
// ==/UserScript==

/* Bloom++ [20260902] v1.1.8. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Jn=Object.defineProperty;var Zn=(e,t)=>{for(var n in t)Jn(e,n,{get:t[n],enumerable:!0})};var Mt={};Zn(Mt,{REPO_URL:()=>Zt,Settings:()=>c,VERSION:()=>q,hasLateIslands:()=>se,init:()=>kt,initSettings:()=>Ct,isDocumentInteractive:()=>Qt,plugins:()=>T,requestPageTouch:()=>Re,whenPageTouched:()=>K});var I=new Map,Te=!1;function Je(e,t){if(!Te)return;if(t.disabled){t.el&&(t.el.disabled=!0);return}if(t.el){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1;return}if(typeof GM_addStyle!="function")return;let n=GM_addStyle(t.css);n instanceof HTMLStyleElement&&(n.dataset.bloomStyle=e,t.el=n)}function $(e,t){let n=I.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},I.set(e,n)),Te&&Je(e,n)}function Pt(){Te=!0;for(let[e,t]of I)Je(e,t);return!0}function At(e){let t=I.get(e);t&&(t.disabled=!1,Te&&Je(e,t))}function Ot(e){let t=I.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0))}function H(e){let t=I.get(e);t&&(t.el?.remove(),I.delete(e))}function It(){return Array.from(I.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var p=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function y(e){return e}var Ze=new Map;function Rt(e,t){let n=Ze.get(e);return n||(n=new Set,Ze.set(e,n)),n.add(t),()=>n.delete(t)}function ne(e,t){let n=Ze.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var Qn="bloompp";function Nt(){return new Promise((e,t)=>{let n=indexedDB.open(Qn,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function Dt(e){try{let t=await Nt();return await new Promise((n,o)=>{let a=t.transaction("kv","readonly").objectStore("kv").get(e);a.onsuccess=()=>n(a.result),a.onerror=()=>o(a.error)})}catch{return}}async function Bt(e,t){try{let n=await Nt();await new Promise((o,r)=>{let i=n.transaction("kv","readwrite").objectStore("kv").put(t,e);i.onsuccess=()=>o(),i.onerror=()=>r(i.error)})}catch{}}function oe(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ht(e,t,n){return Math.min(n,Math.max(t,e))}function _t(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function $t(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}var Ce=new p("SettingsStore"),R="BloomSettings",eo=100;function Me(e){if(oe(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(oe(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return oe(n)?n:null}return null}catch{return null}}var ke=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(a,i)=>{let s=a[i];if(s===void 0&&i!=="__proto__"){let l=n?`${n}.${i}`:i;for(let[u,d]of this.defaultGetters)if(l.startsWith(u)){let E=l.slice(u.length+1);if(E&&!E.includes(".")){let b=d(E);b!==void 0&&(a[i]=b,s=b);break}}}return oe(s)?this.makeProxy(s,n?`${n}.${i}`:i):s},set:(a,i,s)=>{if(a[i]===s)return!0;a[i]=s;let l=n?`${n}.${i}`:i;return this.notifyListeners(l),!0},deleteProperty:(a,i)=>{if(!(i in a))return!0;delete a[i];let s=n?`${n}.${i}`:i;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Ce.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},eo))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(R,this.plain)}catch{try{GM_setValue(R,t)}catch(n){Ce.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(R,t)}catch{}Bt(R,t).catch(n=>Ce.warn("Failed to save settings to IndexedDB:",n))}catch(t){Ce.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){_t(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var to=new p("Settings"),no={plugins:{}},c=new ke(structuredClone(no)),oo=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function ro(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function L(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(c.store.plugins[n]||(c.store.plugins[n]={}),c.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?c.plain.plugins[n]??{}:{}}};return t}function io(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function Ft(){let e=null;if(e=Me(io(R)),e||(e=Me(await Dt(R))),!e)try{e=Me(localStorage.getItem(R))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(c.plain.plugins=t),to.debug("Loaded settings")}}function Kt(e,t){t&&(t.pluginName=e,c.plain.plugins[e]||(c.plain.plugins[e]={}),c.setDefaultGetter(oo(e),n=>{if(n!=="enabled")return ro(t.def,n)}))}var Pe=new p("PluginManager"),T={},ie=new Set;function Gt(e){if(T[e.name]){Pe.warn("Duplicate plugin",e.name);return}T[e.name]=e,Kt(e.name,e.settings)}function ae(e){let t=T[e];if(!t)return!1;if(t.required)return!0;let n=c.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function Vt(e){let t=T[e];if(!t||t.required)return;let n=!ae(e);c.plain.plugins[e]||(c.store.plugins[e]={}),c.store.plugins[e].enabled=n,n?zt(t):ao(t),ne("pluginToggle",{name:e,enabled:n})}function zt(e,t=!1){if(!ie.has(e.name)&&ae(e.name))try{e.managedStyle&&At(e.managedStyle),e.start?.(),ie.add(e.name),e.settings&&c.addPrefixChangeListener(`plugins.${e.name}.`,()=>{ie.has(e.name)&&e.onSettingsChange?.()}),t||Pe.debug("Started",e.name)}catch(n){Pe.error("Failed to start",e.name,n)}}function ao(e){if(ie.has(e.name)){try{e.stop?.()}catch(t){Pe.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(Ot(e.managedStyle),H(e.managedStyle)),ie.delete(e.name)}}function Ae(e){for(let t of Object.values(T))(t.startAt??"DOMContentLoaded")===e&&zt(t)}var qt=2,jt="defaultsRev";function Ut(){for(let t of Object.values(T))c.plain.plugins[t.name]||(c.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=c.store.plugins.Settings??(c.store.plugins.Settings={});if(e[jt]!==qt){for(let t of["NoShareLink","NoDictation"]){let n=c.store.plugins[t]??(c.store.plugins[t]={});n.enabled=!1}e[jt]=qt}}var Qe=!1,Oe=!1,Ie=!1,Yt=!1,Wt=[];function so(e){if(!(e instanceof Node))return!1;let t=e.getRootNode();if(t instanceof ShadowRoot){let n=t.host;if(n instanceof Element&&n.id==="bloom-root")return!0}return e instanceof Element&&!!e.closest("#bloom-root")}function et(){if(Oe)return;if(!Qe){Ie=!0;return}Oe=!0;let e=Wt.splice(0);for(let t of e)t()}function Xt(){Qe=!0,Ie&&(Ie=!1,et())}function K(e){Oe?e():Wt.push(e)}function Re(){Ie=!0,Qe&&setTimeout(et,0)}function Jt(){if(Yt||Oe)return;Yt=!0;let e=t=>{t.isTrusted&&(so(t.target)||(window.removeEventListener("pointerdown",e,!0),setTimeout(et,0)))};window.addEventListener("pointerdown",e,{capture:!0,passive:!0})}var C={p:"0-V-linuxdo"},q="[20260902] v1.1.8",Zt="https://github.com/0-V-linuxdo/Bloom";function lo(){try{return!!document.querySelector('a[href^="/c/"]')}catch{return!1}}function co(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function uo(){try{let t=(document.querySelector("h1")?.textContent??"").replace(/\s+/g," ").trim();return!t||/what's on the agenda/i.test(t)?!1:/^(hey|hello|good\s)/i.test(t)}catch{return!1}}function se(){return lo()||co()||uo()}function Qt(){return se()}var nt=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary"],fo={light:{"--main-surface-primary":"#ffffff","--main-surface-secondary":"#f4f4f4","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#f9f9f9","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#b4b4b4","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.1)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.2)","--link":"#0d0d0d","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#f4f4f4","--bg-primary":"#ffffff","--bg-secondary":"#f4f4f4"},dark:{"--main-surface-primary":"#212121","--main-surface-secondary":"#2f2f2f","--main-surface-tertiary":"#424242","--sidebar-surface-primary":"#171717","--text-primary":"#ececec","--text-secondary":"#b4b4b4","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ececec","--icon-secondary":"#b4b4b4","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.1)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.2)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.06)","--interactive-label-primary-default":"#ececec","--message-surface":"#2f2f2f","--bg-primary":"#212121","--bg-secondary":"#2f2f2f"}};function mo(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(i=>i+i).join("").slice(0,6):r=r.slice(0,6);let a=Number.parseInt(r,16);return Number.isNaN(a)?null:{r:a>>16&255,g:a>>8&255,b:a&255}}function po(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function tt(e){let t=mo(e);return t?po(t)>.55?"light":"dark":null}function go(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=tt(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=tt(n.backgroundColor);if(r)return r;let a=document.body?getComputedStyle(document.body).backgroundColor:"",i=tt(a);if(i)return i;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Ne(e){return e==="auto"?go():e}function bo(e){try{let t=getComputedStyle(document.documentElement);for(let n of nt){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function en(e,t,n){let o=fo[t];if(n){bo(e);for(let r of nt)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of nt)e.style.setProperty(r,o[r])}function tn(e){let t=new MutationObserver(e);return t.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","data-color-scheme","style"]}),document.body&&t.observe(document.body,{attributes:!0,attributeFilter:["class","style"]}),()=>t.disconnect()}var nn=`/* ChatGPT-native shell. Tokens come from :host (copied from chatgpt.com).
   No \`all: initial\` \u2014 that blocked --main-surface-* inheritance. */

:host {
  --bloom-bg: var(--main-surface-primary, #ffffff);
  --bloom-surface: var(--main-surface-primary, #ffffff);
  --bloom-elevated: var(--main-surface-secondary, #f4f4f4);
  --bloom-tertiary: var(--main-surface-tertiary, #ececec);
  --bloom-fg: var(--text-primary, #0d0d0d);
  --bloom-muted: var(--text-secondary, #5d5d5d);
  --bloom-faint: var(--text-tertiary, #8f8f8f);
  --bloom-border: var(--border-light, rgba(0, 0, 0, 0.1));
  --bloom-border-strong: var(--border-medium, rgba(0, 0, 0, 0.15));
  --bloom-hover: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
  --bloom-icon: var(--icon-primary, #0d0d0d);
  --bloom-shadow: 0 0 0 1px var(--bloom-border), 0 8px 24px rgba(0, 0, 0, 0.12);
  --bloom-fab-shadow: 0 0 0 1px var(--bloom-border), 0 2px 8px rgba(0, 0, 0, 0.08);
  --bloom-ease: cubic-bezier(0.32, 0.72, 0, 1);
  color-scheme: light;
  font: 14px/1.5 ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
  color: var(--bloom-fg);
  -webkit-font-smoothing: antialiased;
  pointer-events: none;
}

:host([data-bloom-scheme="dark"]) {
  color-scheme: dark;
  --bloom-bg: var(--main-surface-primary, #212121);
  --bloom-surface: var(--main-surface-primary, #212121);
  --bloom-elevated: var(--main-surface-secondary, #2f2f2f);
  --bloom-tertiary: var(--main-surface-tertiary, #424242);
  --bloom-fg: var(--text-primary, #ececec);
  --bloom-muted: var(--text-secondary, #b4b4b4);
  --bloom-faint: var(--text-tertiary, #8f8f8f);
  --bloom-border: var(--border-light, rgba(255, 255, 255, 0.1));
  --bloom-border-strong: var(--border-medium, rgba(255, 255, 255, 0.15));
  --bloom-hover: var(--interactive-bg-secondary-hover, rgba(255, 255, 255, 0.06));
  --bloom-icon: var(--icon-primary, #ececec);
  --bloom-shadow: 0 0 0 1px var(--bloom-border), 0 16px 40px rgba(0, 0, 0, 0.48);
  --bloom-fab-shadow: 0 0 0 1px var(--bloom-border), 0 2px 8px rgba(0, 0, 0, 0.4);
}

:host *,
:host *::before,
:host *::after {
  box-sizing: border-box;
}

:host button,
:host input,
:host select {
  font: inherit;
  color: inherit;
}

.bloom-settings-fab {
  position: fixed;
  z-index: 2147483645;
  right: 16px;
  bottom: 16px;
  width: 40px;
  height: 40px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: var(--bloom-surface);
  color: var(--bloom-icon);
  box-shadow: var(--bloom-fab-shadow);
  cursor: pointer;
  display: grid;
  place-items: center;
  pointer-events: auto;
  transition:
    transform 160ms var(--bloom-ease),
    background-color 160ms var(--bloom-ease),
    box-shadow 160ms var(--bloom-ease),
    color 160ms var(--bloom-ease);
}

.bloom-settings-fab:hover {
  background: var(--bloom-elevated);
}

.bloom-settings-fab:active,
.bloom-settings-fab.is-dragging {
  cursor: grabbing;
  transform: scale(0.96);
}

.bloom-settings-fab:focus-visible {
  outline: 2px solid var(--bloom-fg);
  outline-offset: 2px;
}

.bloom-settings-fab svg {
  width: 18px;
  height: 18px;
  display: block;
}

.bloom-settings-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2147483646;
  border: 0;
  padding: 0;
  margin: 0;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  pointer-events: auto;
}

.bloom-settings-modal {
  position: fixed;
  z-index: 2147483647;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: min(512px, calc(100vw - 32px));
  max-height: min(80vh, 720px);
  overflow: auto;
  padding: 16px 16px 20px;
  border: 0;
  border-radius: 16px;
  background: var(--bloom-surface);
  color: var(--bloom-fg);
  box-shadow: var(--bloom-shadow);
  pointer-events: auto;
}

.bloom-settings-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 0 4px 12px;
}

.bloom-settings-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.bloom-settings-mark {
  width: 20px;
  height: 20px;
  color: var(--bloom-icon);
  display: grid;
  place-items: center;
  flex: 0 0 auto;
}

.bloom-settings-mark svg {
  width: 20px;
  height: 20px;
}

.bloom-settings-head h2 {
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.bloom-icon-btn {
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--bloom-muted);
  display: grid;
  place-items: center;
  cursor: pointer;
  flex: 0 0 auto;
}

.bloom-icon-btn:hover {
  color: var(--bloom-fg);
  background: var(--bloom-hover);
}

.bloom-icon-btn svg {
  width: 16px;
  height: 16px;
}

.bloom-plugin-card {
  padding: 14px 14px 12px;
  border-radius: 16px;
  background: var(--bloom-elevated);
  margin-bottom: 8px;
}

.bloom-plugin-card:last-child {
  margin-bottom: 0;
}

.bloom-plugin-card header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.bloom-plugin-card h3 {
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.bloom-plugin-card p {
  margin: 4px 0 0;
  color: var(--bloom-muted);
  font-size: 0.8125rem;
  line-height: 1.45;
}

.bloom-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  color: var(--bloom-muted);
  cursor: pointer;
  user-select: none;
}

.bloom-switch {
  position: relative;
  width: 40px;
  height: 24px;
  flex: 0 0 auto;
}

.bloom-switch input {
  position: absolute;
  inset: 0;
  opacity: 0;
  margin: 0;
  cursor: pointer;
}

.bloom-switch span {
  display: block;
  width: 40px;
  height: 24px;
  border-radius: 999px;
  background: var(--bloom-tertiary);
  transition: background-color 150ms var(--bloom-ease);
}

.bloom-switch span::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
  transition: transform 150ms var(--bloom-ease);
}

.bloom-switch input:checked + span {
  background: var(--bloom-fg);
}

.bloom-switch input:checked + span::after {
  transform: translateX(16px);
}

.bloom-switch input:focus-visible + span {
  outline: 2px solid var(--bloom-fg);
  outline-offset: 2px;
}

.bloom-switch input:disabled + span {
  opacity: 0.45;
}

.bloom-field {
  display: grid;
  gap: 6px;
  margin-top: 12px;
}

.bloom-field > span:first-child {
  font-size: 0.75rem;
  color: var(--bloom-muted);
}

.bloom-field select,
.bloom-field input[type="range"] {
  width: 100%;
}

.bloom-field select {
  height: 40px;
  border-radius: 10px;
  border: 1px solid var(--bloom-border-strong);
  background: var(--bloom-surface);
  color: inherit;
  padding: 0 12px;
  font: inherit;
}

.bloom-field select:hover {
  border-color: var(--bloom-fg);
}

.bloom-field select:focus {
  outline: 2px solid var(--bloom-fg);
  outline-offset: 1px;
}

.bloom-field input[type="range"] {
  accent-color: var(--bloom-fg);
  height: 24px;
}

@media (prefers-reduced-motion: reduce) {
  .bloom-settings-fab,
  .bloom-settings-modal,
  .bloom-switch span,
  .bloom-switch span::after {
    transition: none;
  }
}
`;var ot="bloom-root",rn="bloom-fab-pos",on=40,yo=L({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),g=null,h=null,Be=!1,rt=[],De=null,it=!1;function an(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function vo(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function xo(){return"auto"}function le(){if(!g)return;let e=xo(),t=Ne(e);g.setAttribute("data-bloom-scheme",t),en(g,t,e==="auto"),ne("schemeChange",{scheme:t,pref:e})}function at(){if(!h)return;let e=h.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",h.appendChild(e)),e.textContent=It()}function So(){try{let e=localStorage.getItem(rn);if(!e)return null;let t=JSON.parse(e);if(typeof t.x=="number"&&typeof t.y=="number")return{x:t.x,y:t.y}}catch{}return null}function Eo(e,t){try{localStorage.setItem(rn,JSON.stringify({x:e,y:t}))}catch{}}function ce(){if(h)return le(),at(),h;if(g=document.getElementById(ot),g||(g=document.createElement("div"),g.id=ot,g.style.pointerEvents="none"),document.body&&g.parentNode!==document.body&&document.body.appendChild(g),h=g.shadowRoot??g.attachShadow({mode:"open"}),!h.querySelector("style[data-bloom]")){let e=document.createElement("style");e.dataset.bloom="1",e.textContent=nn,h.appendChild(e)}return le(),at(),it||(h.addEventListener("keydown",To),it=!0),h}function j(){Be=!1;for(let e of rt)e();rt=[],h?.querySelector(".bloom-settings-backdrop")?.remove(),h?.querySelector(".bloom-settings-modal")?.remove()}function wo(e,t,n){if(n.type===5&&n.render){let i=document.createElement("div");return i.className="bloom-field",rt.push(n.render(i)),i}let o=document.createElement("label");o.className="bloom-field";let r=document.createElement("span");r.textContent=n.description||t,o.appendChild(r);let a=c.store.plugins[e]??(c.store.plugins[e]={});if(n.type===3&&n.options){let i=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,i.appendChild(l)}return i.value=String(a[t]??n.options.find(s=>s.default)?.value??n.options[0].value),i.addEventListener("change",()=>{a[t]=i.value}),o.appendChild(i),o}if(n.type===4){let i=document.createElement("input");i.type="range",i.min=String(n.min??0),i.max=String(n.max??100),i.value=String(a[t]??n.min??0);let s=document.createElement("span");return s.textContent=i.value,i.addEventListener("input",()=>{a[t]=Number(i.value),s.textContent=i.value}),o.append(i,s),o}if(n.type===2){let i=document.createElement("label");i.className="bloom-toggle";let s=document.createElement("span");s.className="bloom-switch";let l=document.createElement("input");l.type="checkbox",l.checked=!!a[t],l.addEventListener("change",()=>{a[t]=l.checked});let u=document.createElement("span");return s.append(l,u),i.append(s),o.appendChild(i),o}return o}function st(e){j(),at(),Be=!0;let t=document.createElement("button");t.type="button",t.className="bloom-settings-backdrop",t.setAttribute("aria-label","Close settings"),t.addEventListener("click",j);let n=document.createElement("div");n.className="bloom-settings-modal",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.setAttribute("aria-labelledby","bloom-settings-title"),n.tabIndex=-1,n.addEventListener("click",l=>l.stopPropagation());let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let a=document.createElement("span");a.className="bloom-settings-mark",a.innerHTML=an();let i=document.createElement("h2");i.id="bloom-settings-title",i.textContent="Bloom++",r.append(a,i);let s=document.createElement("button");s.type="button",s.className="bloom-icon-btn",s.setAttribute("aria-label","Close"),s.innerHTML=vo(),s.addEventListener("click",j),o.append(r,s),n.appendChild(o);for(let l of Object.values(T)){if(l.hidden||l.name==="Settings")continue;let u=document.createElement("section");u.className="bloom-plugin-card";let d=document.createElement("header"),E=document.createElement("div"),b=document.createElement("h3");b.textContent=l.name;let X=document.createElement("p");X.textContent=l.description,E.append(b,X);let w=document.createElement("label");w.className="bloom-toggle";let M=document.createElement("span");M.className="bloom-switch";let f=document.createElement("input");f.type="checkbox",f.checked=ae(l.name),f.disabled=!!l.required,f.setAttribute("aria-label",`${l.name} enabled`),f.addEventListener("change",()=>{Vt(l.name),st(e)});let J=document.createElement("span");if(M.append(f,J),w.append(M),d.append(E,w),u.appendChild(d),ae(l.name)&&l.settings)for(let[Z,Ye]of Object.entries(l.settings.def)){let Le=wo(l.name,Z,Ye);Le&&u.appendChild(Le)}n.appendChild(u)}e.append(t,n),n.focus(),ne("settingsOpen",void 0)}function Lo(){let e=ce();e.querySelector(".bloom-settings-fab")?.remove();let t=document.createElement("button");t.type="button",t.className="bloom-settings-fab",t.setAttribute("aria-label","Bloom++ settings"),t.innerHTML=an();let n=So();n&&(t.style.left=`${n.x}px`,t.style.top=`${n.y}px`,t.style.right="auto",t.style.bottom="auto");let o=!1,r=!1,a=0,i=0;t.addEventListener("pointerdown",s=>{o=!0,r=!1,a=s.clientX-t.getBoundingClientRect().left,i=s.clientY-t.getBoundingClientRect().top,t.classList.add("is-dragging"),t.setPointerCapture(s.pointerId)}),t.addEventListener("pointermove",s=>{if(!o)return;r=!0;let l=Math.max(8,Math.min(window.innerWidth-on-8,s.clientX-a)),u=Math.max(8,Math.min(window.innerHeight-on-8,s.clientY-i));t.style.left=`${l}px`,t.style.top=`${u}px`,t.style.right="auto",t.style.bottom="auto"}),t.addEventListener("pointerup",()=>{if(t.classList.remove("is-dragging"),o&&r){let s=t.getBoundingClientRect();Eo(s.left,s.top)}o=!1}),t.addEventListener("click",()=>{r||(Be?j():st(e))}),e.appendChild(t)}function To(e){e.key==="Escape"&&Be&&(j(),e.stopPropagation())}function sn(){Re(),K(()=>st(ce()))}var ln=y({name:"Settings",description:"Floating Bloom++ settings button.",authors:[C.p],required:!0,hidden:!0,enabledByDefault:!0,settings:yo,startAt:"HostReady",cleanupSelectors:[`#${ot}`],start(){Lo(),le(),De?.(),De=tn(le)},stop(){De?.(),De=null,j(),g?.remove(),g=null,h=null,it=!1},onSettingsChange:le});function Co(e){return e instanceof HTMLLinkElement&&(e.relList.contains("icon")||/\bicon\b/i.test(e.rel))}function He(e){return!!e&&!e.startsWith("data:")&&e!=="undefined"}function cn(){let{head:e}=document;if(!e)return null;for(let t of e.querySelectorAll("link"))if(Co(t))return t;return null}function un(e,t){let n=cn();n&&n.getAttribute("href")!==t&&n.setAttribute("href",t)}function lt(e,t){if(!He(t))return;let n=cn();n&&n.href!==t&&(n.href=t)}var fn='form[data-type="unified-composer"], form.w-full[data-type]',N="#prompt-textarea",_e='button[data-testid="send-button"]',dn='button[data-testid="stop-button"]';function P(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function ue(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!P(r)))return r;return null}function D(){let t=Array.from(document.querySelectorAll(fn)).find(P);if(t instanceof HTMLElement)return t;let n=ue(document,N),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function _(){let e=Array.from(document.querySelectorAll(N));return e.find(P)??e[0]??null}function ct(){let e=_();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function ko(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function de(){let e=D();return ue(e,_e)??ue(document,_e)}function ut(){let e=de();return!!e&&ko(e)}function dt(){let e=D();return ue(e,dn,!0)??ue(document,dn,!0)}function G(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}function $e(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=u=>{let d=n.indexOf(u);return d>=0&&n[d+1]||""},r=o("c")||o("chat")||o("conversation")||"",a=n.slice(-1)[0]||"",i=/^[a-z0-9_-]{8,}$/i.test(a)?a:"",s=(u,d)=>{try{return document.querySelector(u)?.getAttribute(d)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||i].filter(Boolean).join("|")}function Fe(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function Mo(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(P(t)&&/\bStop\b/i.test(t.textContent||""))return t;return null}function Po(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&P(e))}function Ao(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&P(e))}function ft(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function Ke(){return dt()||Mo()?!0:de()&&P(de())?!1:!!(Po()||Ao())}var Oo=["original","badge","dot","hole","bg"],mn=[{label:"only emoji",value:"original"},{label:"Badge + glyph",value:"badge",default:!0},{label:"Color dot",value:"dot"},{label:"Mark tint",value:"hole"},{label:"Background tint",value:"bg"}],Io={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Ro={dark:{plate:"#212121",mark:"#ececec",ring:"#212121",glyph:"#ffffff"},light:{plate:"#ffffff",mark:"#0d0d0d",ring:"#ffffff",glyph:"#ffffff"}},No="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Do={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"};function pn(e){return typeof e=="string"&&Oo.includes(e)}function gn(e){return e==="original"||e==="badge"||e==="dot"}function Bo(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function fe(e,t="0 0 64 64"){let n=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${t}" width="64" height="64">${e}</svg>`;return`data:image/svg+xml;charset=utf-8,${encodeURIComponent(n)}`}function Ho(e){return`<g transform="translate(8 8) scale(2)" fill="${e}" fill-rule="evenodd"><path d="${No}"/></g>`}function me(e,t){return`<rect width="64" height="64" rx="14" fill="${t}"/>${Ho(e)}`}function _o(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function $o(e){return`<image href="${_o(e)}" width="64" height="64" preserveAspectRatio="xMidYMid meet"/>`}function Fo(e,t){return e==="rotate"?['<g transform="translate(51.5 51.5)"><g>',`<path d="M0-6.1 A6.1 6.1 0 1 1 -5.3 3.05" fill="none" stroke="${t}" stroke-width="2.15" stroke-linecap="round"/>`,'<animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.85s" repeatCount="indefinite"/>',"</g></g>"].join(""):e==="done"?`<path d="M46.6 51.7 L50.1 55.3 L56.8 47.4" fill="none" stroke="${t}" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>`:e==="ready"?[`<path d="M51.5 56.4 V46.8" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round"/>`,`<path d="M46.6 51.2 L51.5 46.2 L56.4 51.2" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`].join(""):[`<path d="M47.2 47.2 L55.8 55.8" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round"/>`,`<path d="M55.8 47.2 L47.2 55.8" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round"/>`].join("")}function pe(e,t,n,o="dark"){let r=Ro[o],a=n&&!n.startsWith("data:")?n:"";if(e==="original")return t==="wait"?a||fe(me(r.mark,r.plate)):Bo(Do[t]);let i=t==="wait"?void 0:Io[t];if(e==="hole")return fe(me(i??r.mark,r.plate));if(e==="bg")return fe(me(r.mark,i??r.plate));if(!i||t==="wait")return a||fe(me(r.mark,r.plate));let s=e==="dot"?[`<circle cx="52.2" cy="52.2" r="10.4" fill="${r.ring}"/>`,`<circle cx="52.2" cy="52.2" r="7.7" fill="${i}"/>`].join(""):[`<circle cx="51.5" cy="51.5" r="12.15" fill="${r.ring}"/>`,`<circle cx="51.5" cy="51.5" r="9.55" fill="${i}"/>`,Fo(t,r.glyph)].join(""),l=a?$o(a):me(r.mark,r.plate);return fe(l+s)}function mt(e,t,n="dark"){return{wait:pe(e,"wait",t,n),rotate:pe(e,"rotate",t,n),done:pe(e,"done",t,n),ready:pe(e,"ready",t,n),error:pe(e,"error",t,n)}}var Ko=new p("ChatStateFavicons"),ve="bloom-chat-state-favicon",vn=L({style:{type:3,description:"How the blossom mark is overlaid with chat state.",options:mn}}),B="",qe="light",xn=mt("badge","",qe),Sn="wait",be=!1,A=!1,v=null,he="",ye="",xe=!0,O=null,ge=null,pt=null,z=0,V,Se=!1,bn=new WeakSet;function En(){let e=vn.store.style;return pn(e)?e:"badge"}function qo(){return"auto"}function wn(){return Ne(qo())}function hn(){let t=document.querySelector(`link[rel~="icon"]:not(#${ve})`)?.href;return He(t)?t:He(B)?B:""}function x(e){Sn=e;let t=En();if(e==="wait"&&gn(t)){lt(ve,B);return}un(ve,xn[e])}function gt(){qe=wn(),xn=mt(En(),B,qe),x(Sn)}function jo(){let e=$e(),t=e?Fe(e):Fe("");return Ke()?(!he&&t&&(he=t),he||t):(he="",t)}function Ln(){be=!1,A=!1,v=null,he=""}function Go(e){ye=e,Ln(),xe=!1,O?.disconnect(),O=null,x("wait")}function Tn(){if(!Se)return;let e=$e()||location.pathname;if(ye&&e&&ye!==e){Go(e);return}e&&(ye=e);let t=jo(),n=Ke(),o=ct(),r=ut();if(ft()&&!n){x("error"),be=!1,A=!1,v=null;return}if(n){be=!0,A=!1,v=t,x("rotate");return}if(be){let a=!!v&&!!t&&v===t;if(be=!1,a){A=!0,v=t,x("done");return}A=!1,v=null}if(A)if(!!(v&&t&&v!==t))A=!1,v=null;else if(o){x("done");return}else if(xe){A=!1,x("ready");return}else{A=!1,x("wait");return}v=null,x(o?"wait":xe?"ready":"wait")}function je(){!Se||z||(z=requestAnimationFrame(()=>{if(z=0,!Se)return;Cn();let e=D();e!==document.body&&(!O||!e.isConnected)&&kn(),Tn()}))}function yn(){xe=!0,je()}function Cn(){let e=_();!e||bn.has(e)||(bn.add(e),e.addEventListener("input",yn,{passive:!0}),e.addEventListener("compositionend",yn,{passive:!0}))}function kn(){O?.disconnect(),O=null;let e=D();!e||e===document.body||(O=new MutationObserver(()=>je()),O.observe(e,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid","class"]}))}var Mn=y({name:"ChatStateFavicons",description:"Show streaming, done, ready, and error states on the tab favicon.",authors:[C.p],tags:["chat","ui"],enabledByDefault:!0,settings:vn,startAt:"HostReady",cleanupSelectors:[`#${ve}`],start(){Se=!0,qe=wn(),B=hn()||B,gt(),pt=Rt("schemeChange",()=>{let e=hn();e&&(B=e),gt()}),ge?.abort(),ge=new AbortController,window.addEventListener("popstate",je,{signal:ge.signal}),Cn(),kn(),V!==void 0&&clearInterval(V),V=setInterval(je,1500),Tn(),Ko.debug("favicon watch started")},stop(){Se=!1,z&&cancelAnimationFrame(z),z=0,V!==void 0&&(clearInterval(V),V=void 0),ge?.abort(),ge=null,pt?.(),pt=null,O?.disconnect(),O=null,Ln(),ye="",xe=!0,lt(ve,B)},onSettingsChange:gt});var Pn=`.bloom-ih-hud {
    contain: content;
    position: fixed;
    z-index: 2147483646;
    padding: 4px 10px;
    border: 0;
    border-radius: 999px;
    background: var(--main-surface-primary, #ffffff);
    color: var(--text-secondary, #5d5d5d);
    box-shadow: 0 0 0 1px var(--border-light, rgba(0, 0, 0, 0.1)), 0 2px 8px rgba(0, 0, 0, 0.08);
    font: 12px/1.2 ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
    font-variant-numeric: tabular-nums;
    pointer-events: none;
    opacity: 0;
    transform: translate(-50%, -100%);
    transition: opacity 0.12s ease;
}

.bloom-ih-hud-on {
    opacity: 1;
}

.bloom-ih-panel {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.bloom-ih-search {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    padding: 0 12px;
    border-radius: 10px;
    border: 1px solid var(--border-medium, rgba(0, 0, 0, 0.15));
    background: var(--main-surface-primary, #ffffff);
    color: var(--text-primary, inherit);
    font: inherit;
}

.bloom-ih-search::placeholder {
    color: var(--text-tertiary, #8f8f8f);
}

.bloom-ih-search:focus {
    outline: 2px solid var(--text-primary, currentColor);
    outline-offset: 1px;
}

.bloom-ih-empty {
    margin: 0;
    color: var(--text-secondary, #5d5d5d);
    font-size: 0.8125rem;
}

.bloom-ih-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    overflow: auto;
    max-height: min(22rem, 45vh);
}

.bloom-ih-item {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 8px;
    width: 100%;
    padding: 10px 12px;
    border: 0;
    border-radius: 12px;
    background: var(--main-surface-primary, #ffffff);
    text-align: left;
}

.bloom-ih-item:hover {
    background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.04));
}

.bloom-ih-body {
    display: block;
    width: 100%;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    font: inherit;
    font-size: 0.8125rem;
    line-height: 1.45;
    text-align: left;
    cursor: pointer;
}

.bloom-ih-clamp {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

.bloom-ih-actions {
    display: flex;
    gap: 2px;
}

.bloom-ih-actions button {
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: var(--text-secondary, inherit);
    cursor: pointer;
}

.bloom-ih-actions button:hover {
    background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
    color: inherit;
}

.bloom-ih-pager {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8125rem;
    font-variant-numeric: tabular-nums;
    color: var(--text-secondary, inherit);
}

.bloom-ih-btn {
    height: 32px;
    padding: 0 12px;
    border: 0;
    border-radius: 999px;
    background: var(--main-surface-primary, #ffffff);
    color: var(--text-primary, inherit);
    font: inherit;
    font-size: 0.8125rem;
    cursor: pointer;
}

.bloom-ih-btn:hover:not(:disabled) {
    background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
}

.bloom-ih-btn:disabled {
    opacity: 0.4;
    cursor: default;
}

.bloom-ih-clear {
    margin-left: auto;
    height: 32px;
    padding: 0 12px;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: var(--text-secondary, inherit);
    cursor: pointer;
    font: inherit;
    font-size: 0.8125rem;
}

.bloom-ih-clear:hover {
    color: var(--text-primary, inherit);
    background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
}

@media (prefers-reduced-motion: reduce) {
    .bloom-ih-hud { transition: none; }
}
`;var On=new p("InputHistory"),bt=/\u200B/g,In=10,Rn=500,Nn=100,zo=8,Uo=120,Yo=2e3,Ge=10,Ve=L({maxEntries:{type:4,description:"Maximum stored prompts.",min:In,max:Rn,default:Nn},history:{type:5,description:"Stored prompts.",render:sr}}),ht=new Map,m=0,yt="",k=!1,we=!1,St=0,Y=null,vt=null,U,xt,Et=null,Dn=!0;function S(){let e=Ve.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Bn(e){let t=Ht(Number(Ve.store.maxEntries??Nn),In,Rn);return e.length>t?e.slice(e.length-t):e}function ze(e){Ve.store.entries=Bn(e)}function Wo(e){return e.replaceAll(bt,"").replace(/\n$/,"").trim()}function Ee(e){let n=(e instanceof Element?e:null)?.closest?.(N);return n instanceof HTMLElement?n:_()}function Xo(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!G(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let a=document.createRange();return a.selectNodeContents(e),a.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(bt,"").trim().length===0,last:a.toString().replaceAll(bt,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Hn(e,t){let n=e.pmViewDesc?.view;if(n)try{let a=n.state.selection.constructor,i=t?a.atStart(n.state.doc):a.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(i).scrollIntoView());return}catch(a){On.debug("pm caret failed:",a)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function _n(e){clearTimeout(xt),xt=setTimeout(()=>{if(e!==St)return;we=!1;let t=Et;t&&Hn(t,Dn)},Uo)}function $n(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),we=!0,Et=e,Dn=n;let a=++St;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(i){On.debug("insertText failed:",i),e.textContent=t,e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:"insertText"}))}Hn(e,n),_n(a)}function Jo(){let e=ce(),t=e.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",e.appendChild(t)),t}function W(){document.getElementById("bloom-root")?.shadowRoot?.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Zo(e,t){let n=Jo();n.textContent=e;let o=(t.closest("form")??D()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-zo)}px`,n.classList.add("bloom-ih-hud-on")}function wt(e){let t=Wo(e);if(!t)return;let n=Date.now(),o=ht.get(t);if(o&&n-o<Yo)return;ht.set(t,n);let r=S().filter(a=>a!==t);r.push(t),ze(r),m=S().length,k=!1,W()}function Qo(e,t){let n=S();if(!n.length&&e)return;m>=n.length&&(yt=G(t),m=n.length);let o=e?m-1:m+1;o<0||o>n.length||(m=o,k=!0,$n(t,o===n.length?yt:n[o],e),o<n.length?Zo(`${o+1} / ${n.length}`,t):W())}function er(e){k=!1,W(),$n(e,yt,!1),m=S().length}function tr(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=Ee(e.target);if((!t||!t.contains(e.target)&&e.target!==t)&&(!Ee(document.activeElement)||e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"))return;let n=Ee(e.target)??Ee(document.activeElement);if(!n)return;if(e.key==="Escape"&&k&&!e.altKey&&!e.shiftKey){er(n),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){wt(G(n));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let o=e.key==="ArrowUp",r=e.altKey,a=S();if(!r){let i=Xo(n);if(o&&!i.first||!o&&!i.last)return}o&&(!a.length||m<=0)||!o&&m>=a.length||(e.preventDefault(),e.stopImmediatePropagation(),Qo(o,n))}function nr(e){if(Ee(e.target)){if(we){_n(St);return}k&&(k=!1,W(),m=S().length)}}function or(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(N);n instanceof HTMLElement&&wt(G(n))}function rr(e){let t=e.target;if(!(t instanceof Element)||!t.closest(_e))return;let o=_();o&&wt(G(o))}function ir(){!k||we||(k=!1,W())}function An(){let e=document.querySelector('form[data-type="unified-composer"]');if(!(e instanceof HTMLElement))return!1;if(vt===e&&Y)return!0;Y?.abort(),Y=new AbortController,vt=e;let{signal:t}=Y;return e.addEventListener("keydown",tr,{capture:!0,signal:t}),e.addEventListener("input",nr,{capture:!0,signal:t}),e.addEventListener("submit",or,{capture:!0,signal:t}),e.addEventListener("click",rr,{capture:!0,signal:t}),e.addEventListener("pointerdown",ir,{capture:!0,signal:t}),!0}function ar(e){let t=S().slice();t.splice(e,1),ze(t),m>t.length&&(m=t.length)}function sr(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let a=S().slice().reverse(),i=t.trim().toLowerCase(),s=i?a.filter(f=>f.toLowerCase().includes(i)):a,l=Math.max(1,Math.ceil(s.length/Ge));n>=l&&(n=l-1);let u=s.slice(n*Ge,n*Ge+Ge);e.replaceChildren();let d=document.createElement("input");if(d.className="bloom-ih-search",d.type="search",d.placeholder="Search history",d.autocomplete="off",d.value=t,d.addEventListener("input",()=>{t=d.value,n=0,r()}),e.appendChild(d),u.length){let f=document.createElement("div");f.className="bloom-ih-list",u.forEach((J,Z)=>{let Ye=a.indexOf(J),Le=S().length-1-Ye,We=document.createElement("div");We.className="bloom-ih-item";let Q=document.createElement("button");Q.type="button",Q.className=`bloom-ih-body${o===Z?"":" bloom-ih-clamp"}`,Q.textContent=J,Q.addEventListener("click",()=>{o=o===Z?-1:Z,r()});let Xe=document.createElement("div");Xe.className="bloom-ih-actions";let ee=document.createElement("button");ee.type="button",ee.title="Copy",ee.textContent="C",ee.addEventListener("click",()=>{$t(J)});let te=document.createElement("button");te.type="button",te.title="Delete",te.textContent="\xD7",te.addEventListener("click",()=>{ar(Le),r()}),Xe.append(ee,te),We.append(Q,Xe),f.appendChild(We)}),e.appendChild(f)}else{let f=document.createElement("p");f.className="bloom-ih-empty",f.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(f)}let E=document.createElement("div");E.className="bloom-ih-pager";let b=document.createElement("button");b.type="button",b.className="bloom-ih-btn",b.textContent="Prev",b.disabled=n<=0,b.addEventListener("click",()=>{n-=1,r()});let X=document.createElement("span");X.textContent=`${n+1} / ${l}`;let w=document.createElement("button");w.type="button",w.className="bloom-ih-btn",w.textContent="Next",w.disabled=n+1>=l,w.addEventListener("click",()=>{n+=1,r()});let M=document.createElement("button");M.type="button",M.className="bloom-ih-clear",M.textContent="Clear all",M.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(ze([]),m=0,r())}),E.append(b,X,w,M),e.appendChild(E)};return r(),()=>{e.replaceChildren()}}var Fn=y({name:"InputHistory",description:"Recall previous chat prompts with Arrow Up and Arrow Down, like a shell.",authors:[C.p],tags:["chat"],enabledByDefault:!0,settings:Ve,startAt:"HostReady",managedStyle:"inputHistory",start(){$("inputHistory",Pn),ce(),m=S().length,k=!1,An(),U!==void 0&&clearInterval(U),U=setInterval(An,1500)},stop(){Y?.abort(),Y=null,vt=null,U!==void 0&&(clearInterval(U),U=void 0),W(),ht.clear(),clearTimeout(xt),we=!1,Et=null,k=!1},onSettingsChange(){let e=S(),t=Bn(e);t.length!==e.length&&ze(t),m>t.length&&(m=t.length)}});var Lt="noShareLink",lr=['button[data-testid="share-chat-button"]'],cr=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],Tt=L({hideShareChat:{type:2,description:"Hide the header Share button on conversations.",default:!0},hideShareProject:{type:2,description:"Inside a project: hide the Share / Share project button.",default:!0}});function Kn(e){return`${e.join(",")}{display:none!important}`}function qn(){let e=[];if(Tt.store.hideShareChat!==!1&&e.push(Kn(lr)),Tt.store.hideShareProject!==!1&&e.push(Kn(cr)),!e.length){H(Lt);return}$(Lt,e.join(`
`))}var jn=y({name:"NoShareLink",description:"Hide share buttons: conversation Share (header) and Share project.",authors:[C.p],tags:["ui","privacy"],enabledByDefault:!1,startAt:"HostReady",settings:Tt,start:qn,onSettingsChange:qn,stop(){H(Lt)}});var zn="noDictation",ur=['button[data-testid="composer-speech-button"]'],dr=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]'],Un=L({hideDictationSettings:{type:2,description:"Hide dictation / speech-to-text rows in chatgpt.com Settings.",default:!0}});function Gn(e){return`${e.join(",")}{display:none!important}`}function Vn(){let e=[Gn(ur)];Un.store.hideDictationSettings!==!1&&e.push(Gn(dr)),$(zn,e.join(`
`))}var Yn=y({name:"NoDictation",description:"Hide the Dictation (speech-to-text) button from the composer. Optional: hide dictation rows in Settings.",authors:[C.p],tags:["chat","ui"],enabledByDefault:!1,startAt:"HostReady",settings:Un,start:Vn,onSettingsChange:Vn,stop(){H(zn)}});var Ue=new p("Bloom"),Wn=!1,fr=Date.now(),mr=[ln,Mn,Fn,jn,Yn];function pr(e){return new Promise(t=>setTimeout(t,e))}function gr(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var br=8e3,hr=2e4,yr=300,vr=100;function xr(){return new Promise(e=>{let t=!1,n=a=>{t||(t=!0,clearInterval(r),a?pr(yr).then(()=>e(!0)):e(!1))},o=()=>{let a=Date.now()-fr;if(!(a<br)){if(se()){n(!0);return}a>=hr&&n(!1)}},r=setInterval(o,vr);o()})}function Sr(){try{GM_registerMenuCommand?.("Bloom++ settings",sn)}catch{}}function Er(){K(()=>{Pt(),Ae("HostReady"),Ue.info("page touch",q)})}async function Ct(){await Ft()}async function kt(){if(Wn)return;Wn=!0;for(let n of mr)try{Gt(n)}catch(o){Ue.error("register failed",n.name,o)}Ut(),Ae("Init"),Sr();let e=()=>Ae("DOMContentLoaded");document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await gr();let t=await xr();if(Xt(),Er(),!t){Ue.warn("late islands not detected; waiting for menu",q);return}Jt(),Ue.info("script ready",q)}var Xn=typeof unsafeWindow<"u"?unsafeWindow:window;window===window.top&&!Xn.Bloom&&(Object.defineProperty(Xn,"Bloom",{value:Mt,writable:!1,configurable:!0}),Ct().then(()=>kt()).catch(e=>console.error("[Bloom++] Fatal init error:",e)));})();
