// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260902] v1.1.2
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

/* Bloom++ [20260902] v1.1.2. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var _n=Object.defineProperty;var $n=(e,t)=>{for(var n in t)_n(e,n,{get:t[n],enumerable:!0})};var vt={};$n(vt,{REPO_URL:()=>Kt,Settings:()=>c,VERSION:()=>jt,init:()=>yt,initSettings:()=>ht,plugins:()=>C});var N=new Map,F=null;function St(e){let t=document.head;return t?(e.parentNode!==t&&t.appendChild(e),!0):!1}function xt(){if(!document.head)return!1;F&&(F.disconnect(),F=null);for(let e of N.values())St(e);return!0}function Fn(){if(F||document.head)return;let e=document.documentElement;e&&(F=new MutationObserver(()=>{xt()}),F.observe(e,{childList:!0})),document.addEventListener("DOMContentLoaded",()=>{xt()},{once:!0})}function D(e,t){let n=N.get(e);n||(n=document.createElement("style"),n.dataset.bloomStyle=e,N.set(e,n)),n.textContent=t,St(n)||Fn()}function Et(e){let t=N.get(e);t&&(t.disabled=!1)}function wt(e){let t=N.get(e);t&&(t.disabled=!0)}function j(e){N.get(e)?.remove(),N.delete(e)}function Lt(){return Array.from(N.values()).map(e=>e.textContent||"").join(`
`)}var p=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function y(e){return e}var Ve=new Map;function Ct(e,t){let n=Ve.get(e);return n||(n=new Set,Ve.set(e,n)),n.add(t),()=>n.delete(t)}function ee(e,t){let n=Ve.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var jn="bloompp";function kt(){return new Promise((e,t)=>{let n=indexedDB.open(jn,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function Tt(e){try{let t=await kt();return await new Promise((n,o)=>{let a=t.transaction("kv","readonly").objectStore("kv").get(e);a.onsuccess=()=>n(a.result),a.onerror=()=>o(a.error)})}catch{return}}async function Mt(e,t){try{let n=await kt();await new Promise((o,r)=>{let i=n.transaction("kv","readwrite").objectStore("kv").put(t,e);i.onsuccess=()=>o(),i.onerror=()=>r(i.error)})}catch{}}function te(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Pt(e,t,n){return Math.min(n,Math.max(t,e))}function At(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function Ot(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}var Ee=new p("SettingsStore"),R="BloomSettings",Kn=100;function Le(e){if(te(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(te(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return te(n)?n:null}return null}catch{return null}}var we=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(a,i)=>{let s=a[i];if(s===void 0&&i!=="__proto__"){let l=n?`${n}.${i}`:i;for(let[u,d]of this.defaultGetters)if(l.startsWith(u)){let E=l.slice(u.length+1);if(E&&!E.includes(".")){let b=d(E);b!==void 0&&(a[i]=b,s=b);break}}}return te(s)?this.makeProxy(s,n?`${n}.${i}`:i):s},set:(a,i,s)=>{if(a[i]===s)return!0;a[i]=s;let l=n?`${n}.${i}`:i;return this.notifyListeners(l),!0},deleteProperty:(a,i)=>{if(!(i in a))return!0;delete a[i];let s=n?`${n}.${i}`:i;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Ee.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Kn))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(R,this.plain)}catch{try{GM_setValue(R,t)}catch(n){Ee.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(R,t)}catch{}Mt(R,t).catch(n=>Ee.warn("Failed to save settings to IndexedDB:",n))}catch(t){Ee.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){At(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var Gn=new p("Settings"),qn={plugins:{}},c=new we(structuredClone(qn)),zn=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function Vn(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function L(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(c.store.plugins[n]||(c.store.plugins[n]={}),c.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?c.plain.plugins[n]??{}:{}}};return t}function Un(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function Nt(){let e=null;if(e=Le(Un(R)),e||(e=Le(await Tt(R))),!e)try{e=Le(localStorage.getItem(R))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(c.plain.plugins=t),Gn.debug("Loaded settings")}}function Dt(e,t){t&&(t.pluginName=e,c.plain.plugins[e]||(c.plain.plugins[e]={}),c.setDefaultGetter(zn(e),n=>{if(n!=="enabled")return Vn(t.def,n)}))}var Ce=new p("PluginManager"),C={},oe=new Set;function Rt(e){if(C[e.name]){Ce.warn("Duplicate plugin",e.name);return}C[e.name]=e,Dt(e.name,e.settings)}function ie(e){let t=C[e];if(!t)return!1;if(t.required)return!0;let n=c.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function It(e){let t=C[e];if(!t||t.required)return;let n=!ie(e);c.plain.plugins[e]||(c.store.plugins[e]={}),c.store.plugins[e].enabled=n,n?Bt(t):Yn(t),ee("pluginToggle",{name:e,enabled:n})}function Bt(e,t=!1){if(!oe.has(e.name)&&ie(e.name))try{e.managedStyle&&Et(e.managedStyle),e.start?.(),oe.add(e.name),e.settings&&c.addPrefixChangeListener(`plugins.${e.name}.`,()=>{oe.has(e.name)&&e.onSettingsChange?.()}),t||Ce.debug("Started",e.name)}catch(n){Ce.error("Failed to start",e.name,n)}}function Yn(e){if(oe.has(e.name)){try{e.stop?.()}catch(t){Ce.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(wt(e.managedStyle),j(e.managedStyle)),oe.delete(e.name)}}function ke(e){for(let t of Object.values(C))(t.startAt??"DOMContentLoaded")===e&&Bt(t)}function Ht(){for(let e of Object.values(C))c.plain.plugins[e.name]||(c.store.plugins[e.name]={enabled:e.enabledByDefault!==!1})}var Ye=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary"],Wn={light:{"--main-surface-primary":"#ffffff","--main-surface-secondary":"#f4f4f4","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#f9f9f9","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#b4b4b4","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.1)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.2)","--link":"#0d0d0d","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#f4f4f4","--bg-primary":"#ffffff","--bg-secondary":"#f4f4f4"},dark:{"--main-surface-primary":"#212121","--main-surface-secondary":"#2f2f2f","--main-surface-tertiary":"#424242","--sidebar-surface-primary":"#171717","--text-primary":"#ececec","--text-secondary":"#b4b4b4","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ececec","--icon-secondary":"#b4b4b4","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.1)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.2)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.06)","--interactive-label-primary-default":"#ececec","--message-surface":"#2f2f2f","--bg-primary":"#212121","--bg-secondary":"#2f2f2f"}};function _t(e){return e==="auto"||e==="light"||e==="dark"}function Xn(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(i=>i+i).join("").slice(0,6):r=r.slice(0,6);let a=Number.parseInt(r,16);return Number.isNaN(a)?null:{r:a>>16&255,g:a>>8&255,b:a&255}}function Jn(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function Ue(e){let t=Xn(e);return t?Jn(t)>.55?"light":"dark":null}function Zn(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=Ue(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=Ue(n.backgroundColor);if(r)return r;let a=document.body?getComputedStyle(document.body).backgroundColor:"",i=Ue(a);if(i)return i;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Te(e){return e==="auto"?Zn():e}function Qn(e){try{let t=getComputedStyle(document.documentElement);for(let n of Ye){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function $t(e,t,n){let o=Wn[t];if(n){Qn(e);for(let r of Ye)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of Ye)e.style.setProperty(r,o[r])}function Ft(e){let t=new MutationObserver(e);return t.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","data-color-scheme","style"]}),document.body&&t.observe(document.body,{attributes:!0,attributeFilter:["class","style"]}),()=>t.disconnect()}var k={p:"0-V-linuxdo"},jt="[20260902] v1.1.2",Kt="https://github.com/0-V-linuxdo/Bloom";var Gt=`/* ChatGPT-native shell. Tokens come from :host (copied from chatgpt.com).
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

.bloom-seg {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  margin: 0 0 12px;
  padding: 3px;
  border-radius: 999px;
  background: var(--bloom-elevated);
}

.bloom-seg button {
  height: 32px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--bloom-muted);
  font: inherit;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
}

.bloom-seg button:hover {
  color: var(--bloom-fg);
}

.bloom-seg button[aria-pressed="true"] {
  background: var(--bloom-surface);
  color: var(--bloom-fg);
  font-weight: 600;
  box-shadow: 0 0 0 1px var(--bloom-border), 0 1px 2px rgba(0, 0, 0, 0.06);
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
`;var We="bloom-root",Vt="bloom-fab-pos",qt=40,Ze=L({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),h=null,g=null,Pe=!1,Xe=[],Me=null;function Ut(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function to(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Yt(){let e=Ze.store.appearance;return _t(e)?e:"auto"}function K(){if(!h)return;let e=Yt(),t=Te(e);h.setAttribute("data-bloom-scheme",t),$t(h,t,e==="auto"),ee("schemeChange",{scheme:t,pref:e})}function Je(){if(!g)return;let e=g.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",g.appendChild(e)),e.textContent=Lt()}function no(){try{let e=localStorage.getItem(Vt);if(!e)return null;let t=JSON.parse(e);if(typeof t.x=="number"&&typeof t.y=="number")return{x:t.x,y:t.y}}catch{}return null}function oo(e,t){try{localStorage.setItem(Vt,JSON.stringify({x:e,y:t}))}catch{}}function Wt(){if(g)return K(),Je(),g;if(h=document.getElementById(We),h||(h=document.createElement("div"),h.id=We,document.documentElement.appendChild(h)),g=h.shadowRoot??h.attachShadow({mode:"open"}),!g.querySelector("style[data-bloom]")){let e=document.createElement("style");e.dataset.bloom="1",e.textContent=Gt,g.appendChild(e)}return K(),Je(),g}function G(){Pe=!1;for(let e of Xe)e();Xe=[],g?.querySelector(".bloom-settings-backdrop")?.remove(),g?.querySelector(".bloom-settings-modal")?.remove()}function ro(e,t,n){if(n.type===5&&n.render){let i=document.createElement("div");return i.className="bloom-field",Xe.push(n.render(i)),i}let o=document.createElement("label");o.className="bloom-field";let r=document.createElement("span");r.textContent=n.description||t,o.appendChild(r);let a=c.store.plugins[e]??(c.store.plugins[e]={});if(n.type===3&&n.options){let i=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,i.appendChild(l)}return i.value=String(a[t]??n.options.find(s=>s.default)?.value??n.options[0].value),i.addEventListener("change",()=>{a[t]=i.value}),o.appendChild(i),o}if(n.type===4){let i=document.createElement("input");i.type="range",i.min=String(n.min??0),i.max=String(n.max??100),i.value=String(a[t]??n.min??0);let s=document.createElement("span");return s.textContent=i.value,i.addEventListener("input",()=>{a[t]=Number(i.value),s.textContent=i.value}),o.append(i,s),o}if(n.type===2){let i=document.createElement("label");i.className="bloom-toggle";let s=document.createElement("span");s.className="bloom-switch";let l=document.createElement("input");l.type="checkbox",l.checked=!!a[t],l.addEventListener("change",()=>{a[t]=l.checked});let u=document.createElement("span");return s.append(l,u),i.append(s),o.appendChild(i),o}return o}function io(e){let t=Yt(),n=document.createElement("div");n.className="bloom-seg",n.setAttribute("role","radiogroup"),n.setAttribute("aria-label","Appearance");let o=[{value:"auto",label:"\u81EA\u52A8"},{value:"light",label:"\u6D45\u8272"},{value:"dark",label:"\u6DF1\u8272"}];for(let r of o){let a=document.createElement("button");a.type="button",a.textContent=r.label,a.setAttribute("aria-pressed",String(t===r.value)),a.addEventListener("click",()=>{Ze.store.appearance=r.value,K(),g&&Ae(g)}),n.appendChild(a)}e.appendChild(n)}function Ae(e){G(),Je(),Pe=!0;let t=document.createElement("button");t.type="button",t.className="bloom-settings-backdrop",t.setAttribute("aria-label","Close settings"),t.addEventListener("click",G);let n=document.createElement("div");n.className="bloom-settings-modal",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.setAttribute("aria-labelledby","bloom-settings-title"),n.tabIndex=-1,n.addEventListener("click",l=>l.stopPropagation());let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let a=document.createElement("span");a.className="bloom-settings-mark",a.innerHTML=Ut();let i=document.createElement("h2");i.id="bloom-settings-title",i.textContent="Bloom++",r.append(a,i);let s=document.createElement("button");s.type="button",s.className="bloom-icon-btn",s.setAttribute("aria-label","Close"),s.innerHTML=to(),s.addEventListener("click",G),o.append(r,s),n.appendChild(o),io(n);for(let l of Object.values(C)){if(l.hidden||l.name==="Settings")continue;let u=document.createElement("section");u.className="bloom-plugin-card";let d=document.createElement("header"),E=document.createElement("div"),b=document.createElement("h3");b.textContent=l.name;let Y=document.createElement("p");Y.textContent=l.description,E.append(b,Y);let w=document.createElement("label");w.className="bloom-toggle";let P=document.createElement("span");P.className="bloom-switch";let m=document.createElement("input");m.type="checkbox",m.checked=ie(l.name),m.disabled=!!l.required,m.setAttribute("aria-label",`${l.name} enabled`),m.addEventListener("change",()=>{It(l.name),Ae(e)});let W=document.createElement("span");if(P.append(m,W),w.append(P),d.append(E,w),u.appendChild(d),ie(l.name)&&l.settings)for(let[X,Ge]of Object.entries(l.settings.def)){let Se=ro(l.name,X,Ge);Se&&u.appendChild(Se)}n.appendChild(u)}e.append(t,n),n.focus(),ee("settingsOpen",void 0)}function ao(){let e=Wt();e.querySelector(".bloom-settings-fab")?.remove();let t=document.createElement("button");t.type="button",t.className="bloom-settings-fab",t.setAttribute("aria-label","Bloom++ settings"),t.innerHTML=Ut();let n=no();n&&(t.style.left=`${n.x}px`,t.style.top=`${n.y}px`,t.style.right="auto",t.style.bottom="auto");let o=!1,r=!1,a=0,i=0;t.addEventListener("pointerdown",s=>{o=!0,r=!1,a=s.clientX-t.getBoundingClientRect().left,i=s.clientY-t.getBoundingClientRect().top,t.classList.add("is-dragging"),t.setPointerCapture(s.pointerId)}),t.addEventListener("pointermove",s=>{if(!o)return;r=!0;let l=Math.max(8,Math.min(window.innerWidth-qt-8,s.clientX-a)),u=Math.max(8,Math.min(window.innerHeight-qt-8,s.clientY-i));t.style.left=`${l}px`,t.style.top=`${u}px`,t.style.right="auto",t.style.bottom="auto"}),t.addEventListener("pointerup",()=>{if(t.classList.remove("is-dragging"),o&&r){let s=t.getBoundingClientRect();oo(s.left,s.top)}o=!1}),t.addEventListener("click",()=>{r||(Pe?G():Ae(e))}),e.appendChild(t)}function zt(e){e.key==="Escape"&&Pe&&(G(),e.stopPropagation())}function so(){Ae(Wt())}var Xt=y({name:"Settings",description:"Floating Bloom++ settings button.",authors:[k.p],required:!0,hidden:!0,enabledByDefault:!0,settings:Ze,startAt:"HostReady",cleanupSelectors:[`#${We}`],start(){D("settings",""),ao(),K(),Me?.(),Me=Ft(K),document.addEventListener("keydown",zt,!0);try{GM_registerMenuCommand?.("Bloom++ settings",so)}catch{}},stop(){document.removeEventListener("keydown",zt,!0),Me?.(),Me=null,G(),h?.remove(),h=null,g=null},onSettingsChange:K});function Oe(e){return e instanceof HTMLLinkElement&&(e.relList.contains("icon")||/\bicon\b/i.test(e.rel))}function q(e){return!!e&&!e.startsWith("data:")&&e!=="undefined"}function lo(e){let{head:t}=document;if(t)for(let n of t.querySelectorAll("link"))n.id!==e&&Oe(n)&&n.remove()}function Jt(e,t,n="image/svg+xml"){let{head:o}=document;if(!o)return;lo(e);let r=document.getElementById(e);r?o.firstChild!==r&&o.prepend(r):(r=document.createElement("link"),r.id=e,r.rel="icon shortcut icon",r.type=t.startsWith("data:image/svg")||t.endsWith(".svg")?n:"",r.setAttribute("sizes","any"),o.prepend(r)),r.getAttribute("href")!==t&&r.setAttribute("href",t)}function Ne(e,t){let{head:n}=document;if(!n)return;document.getElementById(e)?.remove();let o=Array.from(n.querySelectorAll("link")).filter(Oe);if(o.length){q(t)&&(o[0].href=t);return}if(!q(t))return;let r=document.createElement("link");r.rel="icon",r.href=t,n.prepend(r)}function Zt(e,t){let{head:n}=document;if(!n)return null;let o=new MutationObserver(r=>{for(let a of r){if(a.type==="attributes"&&Oe(a.target)&&a.target.id!==e){t(a.target.href);return}for(let i of a.addedNodes)if(Oe(i)&&i.id!==e){t(i.href);return}}});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel"]}),o}var en='form[data-type="unified-composer"], form.w-full[data-type]',I="#prompt-textarea",De='button[data-testid="send-button"]',Qt='button[data-testid="stop-button"]';function A(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function ae(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!A(r)))return r;return null}function B(){let t=Array.from(document.querySelectorAll(en)).find(A);if(t instanceof HTMLElement)return t;let n=ae(document,I),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function _(){let e=Array.from(document.querySelectorAll(I));return e.find(A)??e[0]??null}function Qe(){let e=_();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function co(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function se(){let e=B();return ae(e,De)??ae(document,De)}function et(){let e=se();return!!e&&co(e)}function tt(){let e=B();return ae(e,Qt,!0)??ae(document,Qt,!0)}function z(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}function Re(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=u=>{let d=n.indexOf(u);return d>=0&&n[d+1]||""},r=o("c")||o("chat")||o("conversation")||"",a=n.slice(-1)[0]||"",i=/^[a-z0-9_-]{8,}$/i.test(a)?a:"",s=(u,d)=>{try{return document.querySelector(u)?.getAttribute(d)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||i].filter(Boolean).join("|")}function Ie(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function uo(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(A(t)&&/\bStop\b/i.test(t.textContent||""))return t;return null}function mo(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&A(e))}function fo(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&A(e))}function nt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function Be(){return tt()||uo()?!0:se()&&A(se())?!1:!!(mo()||fo())}var po=["original","badge","dot","hole","bg"],tn=[{label:"only emoji",value:"original"},{label:"Badge + glyph",value:"badge",default:!0},{label:"Color dot",value:"dot"},{label:"Mark tint",value:"hole"},{label:"Background tint",value:"bg"}],go={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},bo={dark:{plate:"#212121",mark:"#ececec",ring:"#212121",glyph:"#ffffff"},light:{plate:"#ffffff",mark:"#0d0d0d",ring:"#ffffff",glyph:"#ffffff"}},ho="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",yo={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"};function nn(e){return typeof e=="string"&&po.includes(e)}function ot(e){return e==="original"||e==="badge"||e==="dot"}function vo(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function le(e,t="0 0 64 64"){let n=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${t}" width="64" height="64">${e}</svg>`;return`data:image/svg+xml;charset=utf-8,${encodeURIComponent(n)}`}function xo(e){return`<g transform="translate(8 8) scale(2)" fill="${e}" fill-rule="evenodd"><path d="${ho}"/></g>`}function ce(e,t){return`<rect width="64" height="64" rx="14" fill="${t}"/>${xo(e)}`}function So(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function Eo(e){return`<image href="${So(e)}" width="64" height="64" preserveAspectRatio="xMidYMid meet"/>`}function wo(e,t){return e==="rotate"?['<g transform="translate(51.5 51.5)"><g>',`<path d="M0-6.1 A6.1 6.1 0 1 1 -5.3 3.05" fill="none" stroke="${t}" stroke-width="2.15" stroke-linecap="round"/>`,'<animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.85s" repeatCount="indefinite"/>',"</g></g>"].join(""):e==="done"?`<path d="M46.6 51.7 L50.1 55.3 L56.8 47.4" fill="none" stroke="${t}" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>`:e==="ready"?[`<path d="M51.5 56.4 V46.8" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round"/>`,`<path d="M46.6 51.2 L51.5 46.2 L56.4 51.2" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`].join(""):[`<path d="M47.2 47.2 L55.8 55.8" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round"/>`,`<path d="M55.8 47.2 L47.2 55.8" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round"/>`].join("")}function ue(e,t,n,o="dark"){let r=bo[o],a=n&&!n.startsWith("data:")?n:"";if(e==="original")return t==="wait"?a||le(ce(r.mark,r.plate)):vo(yo[t]);let i=t==="wait"?void 0:go[t];if(e==="hole")return le(ce(i??r.mark,r.plate));if(e==="bg")return le(ce(r.mark,i??r.plate));if(!i||t==="wait")return a||le(ce(r.mark,r.plate));let s=e==="dot"?[`<circle cx="52.2" cy="52.2" r="10.4" fill="${r.ring}"/>`,`<circle cx="52.2" cy="52.2" r="7.7" fill="${i}"/>`].join(""):[`<circle cx="51.5" cy="51.5" r="12.15" fill="${r.ring}"/>`,`<circle cx="51.5" cy="51.5" r="9.55" fill="${i}"/>`,wo(t,r.glyph)].join(""),l=a?Eo(a):ce(r.mark,r.plate);return le(l+s)}function rt(e,t,n="dark"){return{wait:ue(e,"wait",t,n),rotate:ue(e,"rotate",t,n),done:ue(e,"done",t,n),ready:ue(e,"ready",t,n),error:ue(e,"error",t,n)}}var Lo=new p("ChatStateFavicons"),$="bloom-chat-state-favicon",an=L({style:{type:3,description:"How the blossom mark is overlaid with chat state.",options:tn}}),T="",_e="light",sn=rt("badge","",_e),st="wait",fe=!1,O=!1,v=null,pe="",ge="",be=!0,it=null,de=null,H=null,me=null,at=null,V=0,he=!1;function lt(){let e=an.store.style;return nn(e)?e:"badge"}function Co(){let e=c.plain.plugins.Settings?.appearance;return e==="light"||e==="dark"?e:"auto"}function ln(){return Te(Co())}function on(){let t=document.querySelector(`link[rel~="icon"]:not(#${$})`)?.href;return q(t)?t:q(T)?T:""}function x(e){st=e;let t=lt();if(e==="wait"&&ot(t)){Ne($,T);return}Jt($,sn[e])}function He(){_e=ln(),sn=rt(lt(),T,_e),x(st)}function ko(){let e=Re(),t=e?Ie(e):Ie("");return Be()?(!pe&&t&&(pe=t),pe||t):(pe="",t)}function cn(){fe=!1,O=!1,v=null,pe=""}function To(e){ge=e,cn(),be=!1,H?.disconnect(),H=null,x("wait")}function un(){if(!he)return;let e=Re()||location.pathname;if(ge&&e&&ge!==e){To(e);return}e&&(ge=e);let t=ko(),n=Be(),o=Qe(),r=et();if(nt()&&!n){x("error"),fe=!1,O=!1,v=null;return}if(n){fe=!0,O=!1,v=t,x("rotate");return}if(fe){let a=!!v&&!!t&&v===t;if(fe=!1,a){O=!0,v=t,x("done");return}O=!1,v=null}if(O)if(!!(v&&t&&v!==t))O=!1,v=null;else if(o){x("done");return}else if(be){O=!1,x("ready");return}else{O=!1,x("wait");return}v=null,x(o?"wait":be?"ready":"wait")}function $e(){!he||V||(V=requestAnimationFrame(()=>{if(V=0,!he)return;dn();let e=B();(!H||!e.isConnected)&&mn(),un()}))}function rn(){be=!0,$e()}function dn(){let e=_();!e||e.dataset.bloomCsfBound==="1"||(e.dataset.bloomCsfBound="1",e.addEventListener("input",rn,{passive:!0}),e.addEventListener("compositionend",rn,{passive:!0}))}function mn(){H?.disconnect();let e=B();H=new MutationObserver(()=>$e()),H.observe(e,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid","class"]})}var fn=y({name:"ChatStateFavicons",description:"Show streaming, done, ready, and error states on the tab favicon.",authors:[k.p],tags:["chat","ui"],enabledByDefault:!0,settings:an,startAt:"HostReady",cleanupSelectors:[`#${$}`],start(){he=!0,_e=ln(),T=on()||T,He(),it=Zt($,e=>{if(q(e)&&(T=e),st==="wait"&&ot(lt())){Ne($,T);return}He()}),at=Ct("schemeChange",()=>{let e=on();e&&(T=e),He()}),me?.abort(),me=new AbortController,window.addEventListener("popstate",$e,{signal:me.signal}),de?.disconnect(),de=new MutationObserver(()=>$e()),document.body&&de.observe(document.body,{childList:!0,subtree:!0}),dn(),mn(),un(),Lo.debug("favicon watch started")},stop(){he=!1,V&&cancelAnimationFrame(V),V=0,me?.abort(),me=null,at?.(),at=null,de?.disconnect(),de=null,H?.disconnect(),H=null,it?.disconnect(),it=null,cn(),ge="",be=!0,Ne($,T)},onSettingsChange:He});var pn=`.bloom-ih-hud {
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
`;var gn=new p("InputHistory"),ct=/\u200B/g,bn=10,hn=500,yn=100,Po=8,Ao=120,Oo=2e3,Fe=10,je=L({maxEntries:{type:4,description:"Maximum stored prompts.",min:bn,max:hn,default:yn},history:{type:5,description:"Stored prompts.",render:Go}}),ut=new Map,f=0,dt="",M=!1,xe=!1,ft=0,ye=null,mt,pt=null,vn=!0;function S(){let e=je.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function xn(e){let t=Pt(Number(je.store.maxEntries??yn),bn,hn);return e.length>t?e.slice(e.length-t):e}function Ke(e){je.store.entries=xn(e)}function No(e){return e.replaceAll(ct,"").replace(/\n$/,"").trim()}function ve(e){let n=(e instanceof Element?e:null)?.closest?.(I);return n instanceof HTMLElement?n:_()}function Do(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!z(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let a=document.createRange();return a.selectNodeContents(e),a.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(ct,"").trim().length===0,last:a.toString().replaceAll(ct,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Sn(e,t){let n=e.pmViewDesc?.view;if(n)try{let a=n.state.selection.constructor,i=t?a.atStart(n.state.doc):a.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(i).scrollIntoView());return}catch(a){gn.debug("pm caret failed:",a)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function En(e){clearTimeout(mt),mt=setTimeout(()=>{if(e!==ft)return;xe=!1;let t=pt;t&&Sn(t,vn)},Ao)}function wn(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),xe=!0,pt=e,vn=n;let a=++ft;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(i){gn.debug("insertText failed:",i),e.textContent=t,e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:"insertText"}))}Sn(e,n),En(a)}function Ln(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.documentElement.appendChild(e)),e}function U(){Ln().classList.remove("bloom-ih-hud-on")}function Ro(e,t){let n=Ln();n.textContent=e;let o=(t.closest("form")??B()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-Po)}px`,n.classList.add("bloom-ih-hud-on")}function gt(e){let t=No(e);if(!t)return;let n=Date.now(),o=ut.get(t);if(o&&n-o<Oo)return;ut.set(t,n);let r=S().filter(a=>a!==t);r.push(t),Ke(r),f=S().length,M=!1,U()}function Io(e,t){let n=S();if(!n.length&&e)return;f>=n.length&&(dt=z(t),f=n.length);let o=e?f-1:f+1;o<0||o>n.length||(f=o,M=!0,wn(t,o===n.length?dt:n[o],e),o<n.length?Ro(`${o+1} / ${n.length}`,t):U())}function Bo(e){M=!1,U(),wn(e,dt,!1),f=S().length}function Ho(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=ve(e.target);if((!t||!t.contains(e.target)&&e.target!==t)&&(!ve(document.activeElement)||e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"))return;let n=ve(e.target)??ve(document.activeElement);if(!n)return;if(e.key==="Escape"&&M&&!e.altKey&&!e.shiftKey){Bo(n),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){gt(z(n));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let o=e.key==="ArrowUp",r=e.altKey,a=S();if(!r){let i=Do(n);if(o&&!i.first||!o&&!i.last)return}o&&(!a.length||f<=0)||!o&&f>=a.length||(e.preventDefault(),e.stopImmediatePropagation(),Io(o,n))}function _o(e){if(ve(e.target)){if(xe){En(ft);return}M&&(M=!1,U(),f=S().length)}}function $o(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(I);n instanceof HTMLElement&&gt(z(n))}function Fo(e){let t=e.target;if(!(t instanceof Element)||!t.closest(De))return;let o=_();o&&gt(z(o))}function jo(){!M||xe||(M=!1,U())}function Ko(e){let t=S().slice();t.splice(e,1),Ke(t),f>t.length&&(f=t.length)}function Go(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let a=S().slice().reverse(),i=t.trim().toLowerCase(),s=i?a.filter(m=>m.toLowerCase().includes(i)):a,l=Math.max(1,Math.ceil(s.length/Fe));n>=l&&(n=l-1);let u=s.slice(n*Fe,n*Fe+Fe);e.replaceChildren();let d=document.createElement("input");if(d.className="bloom-ih-search",d.type="search",d.placeholder="Search history",d.autocomplete="off",d.value=t,d.addEventListener("input",()=>{t=d.value,n=0,r()}),e.appendChild(d),u.length){let m=document.createElement("div");m.className="bloom-ih-list",u.forEach((W,X)=>{let Ge=a.indexOf(W),Se=S().length-1-Ge,qe=document.createElement("div");qe.className="bloom-ih-item";let J=document.createElement("button");J.type="button",J.className=`bloom-ih-body${o===X?"":" bloom-ih-clamp"}`,J.textContent=W,J.addEventListener("click",()=>{o=o===X?-1:X,r()});let ze=document.createElement("div");ze.className="bloom-ih-actions";let Z=document.createElement("button");Z.type="button",Z.title="Copy",Z.textContent="C",Z.addEventListener("click",()=>{Ot(W)});let Q=document.createElement("button");Q.type="button",Q.title="Delete",Q.textContent="\xD7",Q.addEventListener("click",()=>{Ko(Se),r()}),ze.append(Z,Q),qe.append(J,ze),m.appendChild(qe)}),e.appendChild(m)}else{let m=document.createElement("p");m.className="bloom-ih-empty",m.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(m)}let E=document.createElement("div");E.className="bloom-ih-pager";let b=document.createElement("button");b.type="button",b.className="bloom-ih-btn",b.textContent="Prev",b.disabled=n<=0,b.addEventListener("click",()=>{n-=1,r()});let Y=document.createElement("span");Y.textContent=`${n+1} / ${l}`;let w=document.createElement("button");w.type="button",w.className="bloom-ih-btn",w.textContent="Next",w.disabled=n+1>=l,w.addEventListener("click",()=>{n+=1,r()});let P=document.createElement("button");P.type="button",P.className="bloom-ih-clear",P.textContent="Clear all",P.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Ke([]),f=0,r())}),E.append(b,Y,w,P),e.appendChild(E)};return r(),()=>{e.replaceChildren()}}var Cn=y({name:"InputHistory",description:"Recall previous chat prompts with Arrow Up and Arrow Down, like a shell.",authors:[k.p],tags:["chat"],enabledByDefault:!0,settings:je,managedStyle:"inputHistory",cleanupSelectors:[".bloom-ih-hud"],start(){if(D("inputHistory",pn),ye)return;f=S().length,M=!1,ye=new AbortController;let{signal:e}=ye;document.addEventListener("keydown",Ho,{capture:!0,signal:e}),document.addEventListener("input",_o,{capture:!0,signal:e}),document.addEventListener("submit",$o,{capture:!0,signal:e}),document.addEventListener("click",Fo,{capture:!0,signal:e}),document.addEventListener("pointerdown",jo,{capture:!0,signal:e})},stop(){ye?.abort(),ye=null,U(),ut.clear(),clearTimeout(mt),xe=!1,pt=null,M=!1},onSettingsChange(){let e=S(),t=xn(e);t.length!==e.length&&Ke(t),f>t.length&&(f=t.length)}});var Mn="noShareLink",qo=['button[data-testid="share-chat-button"]','#conversation-header-actions button[aria-label="Share"]','#conversation-header-actions button[aria-label="Share chat"]','#conversation-header-actions button[aria-label="Share Chat"]','#conversation-header-actions button[aria-label="Create share link"]','#conversation-header-actions button[aria-label="\u5206\u4EAB"]','#conversation-header-actions button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','#conversation-header-actions button[aria-label="\u5206\u4EAB\u804A\u5929"]','#conversation-header-actions button[aria-label="\u521B\u5EFA\u5206\u4EAB\u94FE\u63A5"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share Chat"]','#page-header button[aria-label="Create share link"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','#page-header button[aria-label="\u5206\u4EAB\u804A\u5929"]','#page-header button[aria-label="\u521B\u5EFA\u5206\u4EAB\u94FE\u63A5"]','[data-testid="conversation-header-actions"] button[aria-label="Share"]','[data-testid="conversation-header-actions"] button[aria-label="\u5206\u4EAB"]','[data-testid="conversation-header-actions"] button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],zo=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="Share Project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]','[data-testid="project-header"] button[aria-label="Share"]','[data-testid="project-header"] button[aria-label="\u5206\u4EAB"]','[data-testid="project-page"] button[aria-label="Share"]','[data-testid="project-page"] button[aria-label="\u5206\u4EAB"]'],bt=L({hideShareChat:{type:2,description:"Hide the header Share button on conversations.",default:!0},hideShareProject:{type:2,description:"Inside a project: hide the Share / Share project button.",default:!0}});function kn(e){return`${e.join(`,
`)}{display:none!important}`}function Tn(){let e=[];bt.store.hideShareChat!==!1&&e.push(kn(qo)),bt.store.hideShareProject!==!1&&e.push(kn(zo)),D(Mn,e.join(`
`))}var Pn=y({name:"NoShareLink",description:"Hide share buttons: conversation Share (header) and Share project.",authors:[k.p],tags:["ui","privacy"],enabledByDefault:!0,startAt:"Init",settings:bt,start:Tn,onSettingsChange:Tn,stop(){j(Mn)}});var Nn="noDictation",Vo=['button[data-testid="composer-speech-button"]','form[data-type="unified-composer"] button[data-testid="composer-speech-button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate"]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]'],Uo=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Dn=L({hideDictationSettings:{type:2,description:"Hide dictation / speech-to-text rows in chatgpt.com Settings.",default:!0}});function An(e){return`${e.join(`,
`)}{display:none!important}`}function On(){let e=[An(Vo)];Dn.store.hideDictationSettings!==!1&&e.push(An(Uo)),D(Nn,e.join(`
`))}var Rn=y({name:"NoDictation",description:"Hide the Dictation (speech-to-text) button from the composer. Optional: hide dictation rows in Settings.",authors:[k.p],tags:["chat","ui"],enabledByDefault:!0,startAt:"Init",settings:Dn,start:On,onSettingsChange:On,stop(){j(Nn)}});var In=new p("Bloom"),Bn=!1,Yo=[Xt,fn,Cn,Pn,Rn];function Wo(){return new Promise(e=>{if(document.body){e();return}let t=()=>{n.disconnect(),e()},n=new MutationObserver(()=>{document.body&&t()}),o=document.documentElement;o&&n.observe(o,{childList:!0}),document.addEventListener("DOMContentLoaded",t,{once:!0}),setTimeout(t,15e3)})}function Xo(){return document.readyState!=="loading"?Promise.resolve():new Promise(e=>{document.addEventListener("DOMContentLoaded",()=>e(),{once:!0})})}async function ht(){await Nt()}async function yt(){if(Bn)return;Bn=!0;for(let t of Yo)try{Rt(t)}catch(n){In.error("register failed",t.name,n)}Ht(),ke("Init");let e=()=>ke("DOMContentLoaded");document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await Wo(),await Xo(),ke("HostReady"),In.info("ready")}var Hn=typeof unsafeWindow<"u"?unsafeWindow:window;window===window.top&&!Hn.Bloom&&(Object.defineProperty(Hn,"Bloom",{value:vt,writable:!1,configurable:!0}),ht().then(()=>yt()).catch(e=>console.error("[Bloom++] Fatal init error:",e)));})();
