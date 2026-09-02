// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260902] v1.0.0
// @description  Void++-style plugin host for chatgpt.com. Tab favicon reflects chat state; recall prompts with Arrow Up / Down.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @icon         https://github.com/0-V-linuxdo/Bloom/raw/refs/heads/main/assets/logos/bloom-icon.svg
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
// @compatible   chrome
// @compatible   firefox
// @compatible   edge
// @license      GPL-3.0-or-later
// @downloadURL  https://github.com/0-V-linuxdo/Bloom/raw/refs/heads/main/userscript/Bloom.user.js
// @updateURL    https://github.com/0-V-linuxdo/Bloom/raw/refs/heads/main/userscript/Bloom.user.js
// ==/UserScript==

/* Bloom++ [20260902] v1.0.0. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var kn=Object.defineProperty;var Cn=(e,t)=>{for(var n in t)kn(e,n,{get:t[n],enumerable:!0})};var bt={};Cn(bt,{REPO_URL:()=>_t,Settings:()=>c,VERSION:()=>Ht,init:()=>gt,initSettings:()=>pt,plugins:()=>w});var R=new Map;function he(e,t){let n=R.get(e);n||(n=document.createElement("style"),n.dataset.bloomStyle=e,(document.head??document.documentElement).appendChild(n),R.set(e,n)),n.textContent=t}function ht(e){let t=R.get(e);t&&(t.disabled=!1)}function yt(e){let t=R.get(e);t&&(t.disabled=!0)}function vt(e){R.get(e)?.remove(),R.delete(e)}function xt(){return Array.from(R.values()).map(e=>e.textContent||"").join(`
`)}var p=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function I(e){return e}var qe=new Map;function St(e,t){let n=qe.get(e);return n||(n=new Set,qe.set(e,n)),n.add(t),()=>n.delete(t)}function J(e,t){let n=qe.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var Tn="bloompp";function Et(){return new Promise((e,t)=>{let n=indexedDB.open(Tn,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function wt(e){try{let t=await Et();return await new Promise((n,o)=>{let a=t.transaction("kv","readonly").objectStore("kv").get(e);a.onsuccess=()=>n(a.result),a.onerror=()=>o(a.error)})}catch{return}}async function Lt(e,t){try{let n=await Et();await new Promise((o,r)=>{let i=n.transaction("kv","readwrite").objectStore("kv").put(t,e);i.onsuccess=()=>o(),i.onerror=()=>r(i.error)})}catch{}}function Z(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function kt(e,t,n){return Math.min(n,Math.max(t,e))}function Ct(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function Tt(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}var ye=new p("SettingsStore"),P="BloomSettings",Mn=100;function xe(e){if(Z(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(Z(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return Z(n)?n:null}return null}catch{return null}}var ve=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(a,i)=>{let s=a[i];if(s===void 0&&i!=="__proto__"){let l=n?`${n}.${i}`:i;for(let[u,d]of this.defaultGetters)if(l.startsWith(u)){let S=l.slice(u.length+1);if(S&&!S.includes(".")){let b=d(S);b!==void 0&&(a[i]=b,s=b);break}}}return Z(s)?this.makeProxy(s,n?`${n}.${i}`:i):s},set:(a,i,s)=>{if(a[i]===s)return!0;a[i]=s;let l=n?`${n}.${i}`:i;return this.notifyListeners(l),!0},deleteProperty:(a,i)=>{if(!(i in a))return!0;delete a[i];let s=n?`${n}.${i}`:i;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){ye.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Mn))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(P,this.plain)}catch{try{GM_setValue(P,t)}catch(n){ye.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(P,t)}catch{}Lt(P,t).catch(n=>ye.warn("Failed to save settings to IndexedDB:",n))}catch(t){ye.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){Ct(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var Pn=new p("Settings"),An={plugins:{}},c=new ve(structuredClone(An)),On=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function Nn(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function H(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(c.store.plugins[n]||(c.store.plugins[n]={}),c.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?c.plain.plugins[n]??{}:{}}};return t}function Rn(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function Mt(){let e=null;if(e=xe(Rn(P)),e||(e=xe(await wt(P))),!e)try{e=xe(localStorage.getItem(P))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(c.plain.plugins=t),Pn.debug("Loaded settings")}}function Pt(e,t){t&&(t.pluginName=e,c.plain.plugins[e]||(c.plain.plugins[e]={}),c.setDefaultGetter(On(e),n=>{if(n!=="enabled")return Nn(t.def,n)}))}var Se=new p("PluginManager"),w={},Q=new Set;function At(e){if(w[e.name]){Se.warn("Duplicate plugin",e.name);return}w[e.name]=e,Pt(e.name,e.settings)}function ee(e){let t=w[e];if(!t)return!1;if(t.required)return!0;let n=c.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function Ot(e){let t=w[e];if(!t||t.required)return;let n=!ee(e);c.plain.plugins[e]||(c.store.plugins[e]={}),c.store.plugins[e].enabled=n,n?Nt(t):In(t),J("pluginToggle",{name:e,enabled:n})}function Nt(e,t=!1){if(!Q.has(e.name)&&ee(e.name))try{e.managedStyle&&ht(e.managedStyle),e.start?.(),Q.add(e.name),e.settings&&c.addPrefixChangeListener(`plugins.${e.name}.`,()=>{Q.has(e.name)&&e.onSettingsChange?.()}),t||Se.debug("Started",e.name)}catch(n){Se.error("Failed to start",e.name,n)}}function In(e){if(Q.has(e.name)){try{e.stop?.()}catch(t){Se.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(yt(e.managedStyle),vt(e.managedStyle)),Q.delete(e.name)}}function Ee(e){for(let t of Object.values(w))(t.startAt??"DOMContentLoaded")===e&&Nt(t)}function Rt(){for(let e of Object.values(w))c.plain.plugins[e.name]||(c.store.plugins[e.name]={enabled:e.enabledByDefault!==!1})}var Ve=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary"],Bn={light:{"--main-surface-primary":"#ffffff","--main-surface-secondary":"#f4f4f4","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#f9f9f9","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#b4b4b4","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.1)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.2)","--link":"#0d0d0d","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#f4f4f4","--bg-primary":"#ffffff","--bg-secondary":"#f4f4f4"},dark:{"--main-surface-primary":"#212121","--main-surface-secondary":"#2f2f2f","--main-surface-tertiary":"#424242","--sidebar-surface-primary":"#171717","--text-primary":"#ececec","--text-secondary":"#b4b4b4","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ececec","--icon-secondary":"#b4b4b4","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.1)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.2)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.06)","--interactive-label-primary-default":"#ececec","--message-surface":"#2f2f2f","--bg-primary":"#212121","--bg-secondary":"#2f2f2f"}};function It(e){return e==="auto"||e==="light"||e==="dark"}function Dn(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(i=>i+i).join("").slice(0,6):r=r.slice(0,6);let a=Number.parseInt(r,16);return Number.isNaN(a)?null:{r:a>>16&255,g:a>>8&255,b:a&255}}function Hn(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function ze(e){let t=Dn(e);return t?Hn(t)>.55?"light":"dark":null}function _n(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=ze(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=ze(n.backgroundColor);if(r)return r;let a=document.body?getComputedStyle(document.body).backgroundColor:"",i=ze(a);if(i)return i;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function we(e){return e==="auto"?_n():e}function $n(e){try{let t=getComputedStyle(document.documentElement);for(let n of Ve){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function Bt(e,t,n){let o=Bn[t];if(n){$n(e);for(let r of Ve)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of Ve)e.style.setProperty(r,o[r])}function Dt(e){let t=new MutationObserver(e);return t.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","data-color-scheme","style"]}),document.body&&t.observe(document.body,{attributes:!0,attributeFilter:["class","style"]}),()=>t.disconnect()}var _={p:"0-V-linuxdo"},Ht="[20260901] v1.0.0",_t="https://github.com/0-V-linuxdo/Bloom";var $t=`/* ChatGPT-native shell. Tokens come from :host (copied from chatgpt.com).
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
`;var Ue="bloom-root",qt="bloom-fab-pos",Ft=40,Xe=H({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),h=null,g=null,ke=!1,We=[],Le=null;function Gt(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Kn(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function jt(){let e=Xe.store.appearance;return It(e)?e:"auto"}function $(){if(!h)return;let e=jt(),t=we(e);h.setAttribute("data-bloom-scheme",t),Bt(h,t,e==="auto"),J("schemeChange",{scheme:t,pref:e})}function Ye(){if(!g)return;let e=g.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",g.appendChild(e)),e.textContent=xt()}function qn(){try{let e=localStorage.getItem(qt);if(!e)return null;let t=JSON.parse(e);if(typeof t.x=="number"&&typeof t.y=="number")return{x:t.x,y:t.y}}catch{}return null}function Gn(e,t){try{localStorage.setItem(qt,JSON.stringify({x:e,y:t}))}catch{}}function zt(){if(g)return $(),Ye(),g;if(h=document.getElementById(Ue),h||(h=document.createElement("div"),h.id=Ue,document.documentElement.appendChild(h)),g=h.shadowRoot??h.attachShadow({mode:"open"}),!g.querySelector("style[data-bloom]")){let e=document.createElement("style");e.dataset.bloom="1",e.textContent=$t,g.appendChild(e)}return $(),Ye(),g}function F(){ke=!1;for(let e of We)e();We=[],g?.querySelector(".bloom-settings-backdrop")?.remove(),g?.querySelector(".bloom-settings-modal")?.remove()}function jn(e,t,n){if(n.type===5&&n.render){let i=document.createElement("div");return i.className="bloom-field",We.push(n.render(i)),i}let o=document.createElement("label");o.className="bloom-field";let r=document.createElement("span");r.textContent=n.description||t,o.appendChild(r);let a=c.store.plugins[e]??(c.store.plugins[e]={});if(n.type===3&&n.options){let i=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,i.appendChild(l)}return i.value=String(a[t]??n.options.find(s=>s.default)?.value??n.options[0].value),i.addEventListener("change",()=>{a[t]=i.value}),o.appendChild(i),o}if(n.type===4){let i=document.createElement("input");i.type="range",i.min=String(n.min??0),i.max=String(n.max??100),i.value=String(a[t]??n.min??0);let s=document.createElement("span");return s.textContent=i.value,i.addEventListener("input",()=>{a[t]=Number(i.value),s.textContent=i.value}),o.append(i,s),o}if(n.type===2){let i=document.createElement("label");i.className="bloom-toggle";let s=document.createElement("span");s.className="bloom-switch";let l=document.createElement("input");l.type="checkbox",l.checked=!!a[t],l.addEventListener("change",()=>{a[t]=l.checked});let u=document.createElement("span");return s.append(l,u),i.append(s),o.appendChild(i),o}return o}function zn(e){let t=jt(),n=document.createElement("div");n.className="bloom-seg",n.setAttribute("role","radiogroup"),n.setAttribute("aria-label","Appearance");let o=[{value:"auto",label:"\u81EA\u52A8"},{value:"light",label:"\u6D45\u8272"},{value:"dark",label:"\u6DF1\u8272"}];for(let r of o){let a=document.createElement("button");a.type="button",a.textContent=r.label,a.setAttribute("aria-pressed",String(t===r.value)),a.addEventListener("click",()=>{Xe.store.appearance=r.value,$(),g&&Ce(g)}),n.appendChild(a)}e.appendChild(n)}function Ce(e){F(),Ye(),ke=!0;let t=document.createElement("button");t.type="button",t.className="bloom-settings-backdrop",t.setAttribute("aria-label","Close settings"),t.addEventListener("click",F);let n=document.createElement("div");n.className="bloom-settings-modal",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.setAttribute("aria-labelledby","bloom-settings-title"),n.tabIndex=-1,n.addEventListener("click",l=>l.stopPropagation());let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let a=document.createElement("span");a.className="bloom-settings-mark",a.innerHTML=Gt();let i=document.createElement("h2");i.id="bloom-settings-title",i.textContent="Bloom++",r.append(a,i);let s=document.createElement("button");s.type="button",s.className="bloom-icon-btn",s.setAttribute("aria-label","Close"),s.innerHTML=Kn(),s.addEventListener("click",F),o.append(r,s),n.appendChild(o),zn(n);for(let l of Object.values(w)){if(l.hidden||l.name==="Settings")continue;let u=document.createElement("section");u.className="bloom-plugin-card";let d=document.createElement("header"),S=document.createElement("div"),b=document.createElement("h3");b.textContent=l.name;let z=document.createElement("p");z.textContent=l.description,S.append(b,z);let E=document.createElement("label");E.className="bloom-toggle";let C=document.createElement("span");C.className="bloom-switch";let m=document.createElement("input");m.type="checkbox",m.checked=ee(l.name),m.disabled=!!l.required,m.setAttribute("aria-label",`${l.name} enabled`),m.addEventListener("change",()=>{Ot(l.name),Ce(e)});let V=document.createElement("span");if(C.append(m,V),E.append(C),d.append(S,E),u.appendChild(d),ee(l.name)&&l.settings)for(let[U,$e]of Object.entries(l.settings.def)){let be=jn(l.name,U,$e);be&&u.appendChild(be)}n.appendChild(u)}e.append(t,n),n.focus(),J("settingsOpen",void 0)}function Vn(){let e=zt();e.querySelector(".bloom-settings-fab")?.remove();let t=document.createElement("button");t.type="button",t.className="bloom-settings-fab",t.setAttribute("aria-label","Bloom++ settings"),t.innerHTML=Gt();let n=qn();n&&(t.style.left=`${n.x}px`,t.style.top=`${n.y}px`,t.style.right="auto",t.style.bottom="auto");let o=!1,r=!1,a=0,i=0;t.addEventListener("pointerdown",s=>{o=!0,r=!1,a=s.clientX-t.getBoundingClientRect().left,i=s.clientY-t.getBoundingClientRect().top,t.classList.add("is-dragging"),t.setPointerCapture(s.pointerId)}),t.addEventListener("pointermove",s=>{if(!o)return;r=!0;let l=Math.max(8,Math.min(window.innerWidth-Ft-8,s.clientX-a)),u=Math.max(8,Math.min(window.innerHeight-Ft-8,s.clientY-i));t.style.left=`${l}px`,t.style.top=`${u}px`,t.style.right="auto",t.style.bottom="auto"}),t.addEventListener("pointerup",()=>{if(t.classList.remove("is-dragging"),o&&r){let s=t.getBoundingClientRect();Gn(s.left,s.top)}o=!1}),t.addEventListener("click",()=>{r||(ke?F():Ce(e))}),e.appendChild(t)}function Kt(e){e.key==="Escape"&&ke&&(F(),e.stopPropagation())}function Un(){Ce(zt())}var Vt=I({name:"Settings",description:"Floating Bloom++ settings button.",authors:[_.p],required:!0,hidden:!0,enabledByDefault:!0,settings:Xe,startAt:"HostReady",cleanupSelectors:[`#${Ue}`],start(){he("settings",""),Vn(),$(),Le?.(),Le=Dt($),document.addEventListener("keydown",Kt,!0);try{GM_registerMenuCommand?.("Bloom++ settings",Un)}catch{}},stop(){document.removeEventListener("keydown",Kt,!0),Le?.(),Le=null,F(),h?.remove(),h=null,g=null},onSettingsChange:$});function Te(e){return e instanceof HTMLLinkElement&&(e.relList.contains("icon")||/\bicon\b/i.test(e.rel))}function K(e){return!!e&&!e.startsWith("data:")&&e!=="undefined"}function Wn(e){let{head:t}=document;if(t)for(let n of t.querySelectorAll("link"))n.id!==e&&Te(n)&&n.remove()}function Ut(e,t,n="image/svg+xml"){let{head:o}=document;if(!o)return;Wn(e);let r=document.getElementById(e);r?o.firstChild!==r&&o.prepend(r):(r=document.createElement("link"),r.id=e,r.rel="icon shortcut icon",r.type=t.startsWith("data:image/svg")||t.endsWith(".svg")?n:"",r.setAttribute("sizes","any"),o.prepend(r)),r.getAttribute("href")!==t&&r.setAttribute("href",t)}function Me(e,t){let{head:n}=document;if(!n)return;document.getElementById(e)?.remove();let o=Array.from(n.querySelectorAll("link")).filter(Te);if(o.length){K(t)&&(o[0].href=t);return}if(!K(t))return;let r=document.createElement("link");r.rel="icon",r.href=t,n.prepend(r)}function Wt(e,t){let{head:n}=document;if(!n)return null;let o=new MutationObserver(r=>{for(let a of r){if(a.type==="attributes"&&Te(a.target)&&a.target.id!==e){t(a.target.href);return}for(let i of a.addedNodes)if(Te(i)&&i.id!==e){t(i.href);return}}});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel"]}),o}var Xt='form[data-type="unified-composer"], form.w-full[data-type]',A="#prompt-textarea",Pe='button[data-testid="send-button"]',Yt='button[data-testid="stop-button"]';function T(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function te(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!T(r)))return r;return null}function O(){let t=Array.from(document.querySelectorAll(Xt)).find(T);if(t instanceof HTMLElement)return t;let n=te(document,A),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function B(){let e=Array.from(document.querySelectorAll(A));return e.find(T)??e[0]??null}function Je(){let e=B();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function Yn(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function ne(){let e=O();return te(e,Pe)??te(document,Pe)}function Ze(){let e=ne();return!!e&&Yn(e)}function Qe(){let e=O();return te(e,Yt,!0)??te(document,Yt,!0)}function q(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}function Ae(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=u=>{let d=n.indexOf(u);return d>=0&&n[d+1]||""},r=o("c")||o("chat")||o("conversation")||"",a=n.slice(-1)[0]||"",i=/^[a-z0-9_-]{8,}$/i.test(a)?a:"",s=(u,d)=>{try{return document.querySelector(u)?.getAttribute(d)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||i].filter(Boolean).join("|")}function Oe(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function Xn(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(T(t)&&/\bStop\b/i.test(t.textContent||""))return t;return null}function Jn(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&T(e))}function Zn(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&T(e))}function et(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function Ne(){return Qe()||Xn()?!0:ne()&&T(ne())?!1:!!(Jn()||Zn())}var Qn=["original","badge","dot","hole","bg"],Jt=[{label:"only emoji",value:"original"},{label:"Badge + glyph",value:"badge",default:!0},{label:"Color dot",value:"dot"},{label:"Mark tint",value:"hole"},{label:"Background tint",value:"bg"}],eo={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},to={dark:{plate:"#212121",mark:"#ececec",ring:"#212121",glyph:"#ffffff"},light:{plate:"#ffffff",mark:"#0d0d0d",ring:"#ffffff",glyph:"#ffffff"}},no="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",oo={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"};function Zt(e){return typeof e=="string"&&Qn.includes(e)}function tt(e){return e==="original"||e==="badge"||e==="dot"}function ro(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function oe(e,t="0 0 64 64"){let n=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${t}" width="64" height="64">${e}</svg>`;return`data:image/svg+xml;charset=utf-8,${encodeURIComponent(n)}`}function io(e){return`<g transform="translate(8 8) scale(2)" fill="${e}" fill-rule="evenodd"><path d="${no}"/></g>`}function re(e,t){return`<rect width="64" height="64" rx="14" fill="${t}"/>${io(e)}`}function ao(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function so(e){return`<image href="${ao(e)}" width="64" height="64" preserveAspectRatio="xMidYMid meet"/>`}function lo(e,t){return e==="rotate"?['<g transform="translate(51.5 51.5)"><g>',`<path d="M0-6.1 A6.1 6.1 0 1 1 -5.3 3.05" fill="none" stroke="${t}" stroke-width="2.15" stroke-linecap="round"/>`,'<animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.85s" repeatCount="indefinite"/>',"</g></g>"].join(""):e==="done"?`<path d="M46.6 51.7 L50.1 55.3 L56.8 47.4" fill="none" stroke="${t}" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>`:e==="ready"?[`<path d="M51.5 56.4 V46.8" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round"/>`,`<path d="M46.6 51.2 L51.5 46.2 L56.4 51.2" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`].join(""):[`<path d="M47.2 47.2 L55.8 55.8" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round"/>`,`<path d="M55.8 47.2 L47.2 55.8" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round"/>`].join("")}function ie(e,t,n,o="dark"){let r=to[o],a=n&&!n.startsWith("data:")?n:"";if(e==="original")return t==="wait"?a||oe(re(r.mark,r.plate)):ro(oo[t]);let i=t==="wait"?void 0:eo[t];if(e==="hole")return oe(re(i??r.mark,r.plate));if(e==="bg")return oe(re(r.mark,i??r.plate));if(!i||t==="wait")return a||oe(re(r.mark,r.plate));let s=e==="dot"?[`<circle cx="52.2" cy="52.2" r="10.4" fill="${r.ring}"/>`,`<circle cx="52.2" cy="52.2" r="7.7" fill="${i}"/>`].join(""):[`<circle cx="51.5" cy="51.5" r="12.15" fill="${r.ring}"/>`,`<circle cx="51.5" cy="51.5" r="9.55" fill="${i}"/>`,lo(t,r.glyph)].join(""),l=a?so(a):re(r.mark,r.plate);return oe(l+s)}function nt(e,t,n="dark"){return{wait:ie(e,"wait",t,n),rotate:ie(e,"rotate",t,n),done:ie(e,"done",t,n),ready:ie(e,"ready",t,n),error:ie(e,"error",t,n)}}var co=new p("ChatStateFavicons"),D="bloom-chat-state-favicon",tn=H({style:{type:3,description:"How the blossom mark is overlaid with chat state.",options:Jt}}),L="",Ie="light",nn=nt("badge","",Ie),it="wait",le=!1,M=!1,y=null,ce="",ue="",de=!0,ot=null,ae=null,N=null,se=null,rt=null,G=0,me=!1;function at(){let e=tn.store.style;return Zt(e)?e:"badge"}function uo(){let e=c.plain.plugins.Settings?.appearance;return e==="light"||e==="dark"?e:"auto"}function on(){return we(uo())}function Qt(){let t=document.querySelector(`link[rel~="icon"]:not(#${D})`)?.href;return K(t)?t:K(L)?L:""}function v(e){it=e;let t=at();if(e==="wait"&&tt(t)){Me(D,L);return}Ut(D,nn[e])}function Re(){Ie=on(),nn=nt(at(),L,Ie),v(it)}function mo(){let e=Ae(),t=e?Oe(e):Oe("");return Ne()?(!ce&&t&&(ce=t),ce||t):(ce="",t)}function rn(){le=!1,M=!1,y=null,ce=""}function fo(e){ue=e,rn(),de=!1,N?.disconnect(),N=null,v("wait")}function an(){if(!me)return;let e=Ae()||location.pathname;if(ue&&e&&ue!==e){fo(e);return}e&&(ue=e);let t=mo(),n=Ne(),o=Je(),r=Ze();if(et()&&!n){v("error"),le=!1,M=!1,y=null;return}if(n){le=!0,M=!1,y=t,v("rotate");return}if(le){let a=!!y&&!!t&&y===t;if(le=!1,a){M=!0,y=t,v("done");return}M=!1,y=null}if(M)if(!!(y&&t&&y!==t))M=!1,y=null;else if(o){v("done");return}else if(de){M=!1,v("ready");return}else{M=!1,v("wait");return}y=null,v(o?"wait":de?"ready":"wait")}function Be(){!me||G||(G=requestAnimationFrame(()=>{if(G=0,!me)return;sn();let e=O();(!N||!e.isConnected)&&ln(),an()}))}function en(){de=!0,Be()}function sn(){let e=B();!e||e.dataset.bloomCsfBound==="1"||(e.dataset.bloomCsfBound="1",e.addEventListener("input",en,{passive:!0}),e.addEventListener("compositionend",en,{passive:!0}))}function ln(){N?.disconnect();let e=O();N=new MutationObserver(()=>Be()),N.observe(e,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid","class"]})}var cn=I({name:"ChatStateFavicons",description:"Show streaming, done, ready, and error states on the tab favicon.",authors:[_.p],tags:["chat","ui"],enabledByDefault:!0,settings:tn,startAt:"HostReady",cleanupSelectors:[`#${D}`],start(){me=!0,Ie=on(),L=Qt()||L,Re(),ot=Wt(D,e=>{if(K(e)&&(L=e),it==="wait"&&tt(at())){Me(D,L);return}Re()}),rt=St("schemeChange",()=>{let e=Qt();e&&(L=e),Re()}),se?.abort(),se=new AbortController,window.addEventListener("popstate",Be,{signal:se.signal}),ae?.disconnect(),ae=new MutationObserver(()=>Be()),document.body&&ae.observe(document.body,{childList:!0,subtree:!0}),sn(),ln(),an(),co.debug("favicon watch started")},stop(){me=!1,G&&cancelAnimationFrame(G),G=0,se?.abort(),se=null,rt?.(),rt=null,ae?.disconnect(),ae=null,N?.disconnect(),N=null,ot?.disconnect(),ot=null,rn(),ue="",de=!0,Me(D,L)},onSettingsChange:Re});var un=`.bloom-ih-hud {
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
`;var dn=new p("InputHistory"),st=/\u200B/g,mn=10,fn=500,pn=100,go=8,bo=120,ho=2e3,De=10,He=H({maxEntries:{type:4,description:"Maximum stored prompts.",min:mn,max:fn,default:pn},history:{type:5,description:"Stored prompts.",render:Po}}),lt=new Map,f=0,ct="",k=!1,ge=!1,dt=0,fe=null,ut,mt=null,gn=!0;function x(){let e=He.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function bn(e){let t=kt(Number(He.store.maxEntries??pn),mn,fn);return e.length>t?e.slice(e.length-t):e}function _e(e){He.store.entries=bn(e)}function yo(e){return e.replaceAll(st,"").replace(/\n$/,"").trim()}function pe(e){let n=(e instanceof Element?e:null)?.closest?.(A);return n instanceof HTMLElement?n:B()}function vo(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!q(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let a=document.createRange();return a.selectNodeContents(e),a.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(st,"").trim().length===0,last:a.toString().replaceAll(st,"").trim().length===0}}catch{return{first:!0,last:!0}}}function hn(e,t){let n=e.pmViewDesc?.view;if(n)try{let a=n.state.selection.constructor,i=t?a.atStart(n.state.doc):a.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(i).scrollIntoView());return}catch(a){dn.debug("pm caret failed:",a)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function yn(e){clearTimeout(ut),ut=setTimeout(()=>{if(e!==dt)return;ge=!1;let t=mt;t&&hn(t,gn)},bo)}function vn(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),ge=!0,mt=e,gn=n;let a=++dt;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(i){dn.debug("insertText failed:",i),e.textContent=t,e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:"insertText"}))}hn(e,n),yn(a)}function xn(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.documentElement.appendChild(e)),e}function j(){xn().classList.remove("bloom-ih-hud-on")}function xo(e,t){let n=xn();n.textContent=e;let o=(t.closest("form")??O()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-go)}px`,n.classList.add("bloom-ih-hud-on")}function ft(e){let t=yo(e);if(!t)return;let n=Date.now(),o=lt.get(t);if(o&&n-o<ho)return;lt.set(t,n);let r=x().filter(a=>a!==t);r.push(t),_e(r),f=x().length,k=!1,j()}function So(e,t){let n=x();if(!n.length&&e)return;f>=n.length&&(ct=q(t),f=n.length);let o=e?f-1:f+1;o<0||o>n.length||(f=o,k=!0,vn(t,o===n.length?ct:n[o],e),o<n.length?xo(`${o+1} / ${n.length}`,t):j())}function Eo(e){k=!1,j(),vn(e,ct,!1),f=x().length}function wo(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=pe(e.target);if((!t||!t.contains(e.target)&&e.target!==t)&&(!pe(document.activeElement)||e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"))return;let n=pe(e.target)??pe(document.activeElement);if(!n)return;if(e.key==="Escape"&&k&&!e.altKey&&!e.shiftKey){Eo(n),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){ft(q(n));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let o=e.key==="ArrowUp",r=e.altKey,a=x();if(!r){let i=vo(n);if(o&&!i.first||!o&&!i.last)return}o&&(!a.length||f<=0)||!o&&f>=a.length||(e.preventDefault(),e.stopImmediatePropagation(),So(o,n))}function Lo(e){if(pe(e.target)){if(ge){yn(dt);return}k&&(k=!1,j(),f=x().length)}}function ko(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(A);n instanceof HTMLElement&&ft(q(n))}function Co(e){let t=e.target;if(!(t instanceof Element)||!t.closest(Pe))return;let o=B();o&&ft(q(o))}function To(){!k||ge||(k=!1,j())}function Mo(e){let t=x().slice();t.splice(e,1),_e(t),f>t.length&&(f=t.length)}function Po(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let a=x().slice().reverse(),i=t.trim().toLowerCase(),s=i?a.filter(m=>m.toLowerCase().includes(i)):a,l=Math.max(1,Math.ceil(s.length/De));n>=l&&(n=l-1);let u=s.slice(n*De,n*De+De);e.replaceChildren();let d=document.createElement("input");if(d.className="bloom-ih-search",d.type="search",d.placeholder="Search history",d.autocomplete="off",d.value=t,d.addEventListener("input",()=>{t=d.value,n=0,r()}),e.appendChild(d),u.length){let m=document.createElement("div");m.className="bloom-ih-list",u.forEach((V,U)=>{let $e=a.indexOf(V),be=x().length-1-$e,Fe=document.createElement("div");Fe.className="bloom-ih-item";let W=document.createElement("button");W.type="button",W.className=`bloom-ih-body${o===U?"":" bloom-ih-clamp"}`,W.textContent=V,W.addEventListener("click",()=>{o=o===U?-1:U,r()});let Ke=document.createElement("div");Ke.className="bloom-ih-actions";let Y=document.createElement("button");Y.type="button",Y.title="Copy",Y.textContent="C",Y.addEventListener("click",()=>{Tt(V)});let X=document.createElement("button");X.type="button",X.title="Delete",X.textContent="\xD7",X.addEventListener("click",()=>{Mo(be),r()}),Ke.append(Y,X),Fe.append(W,Ke),m.appendChild(Fe)}),e.appendChild(m)}else{let m=document.createElement("p");m.className="bloom-ih-empty",m.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(m)}let S=document.createElement("div");S.className="bloom-ih-pager";let b=document.createElement("button");b.type="button",b.className="bloom-ih-btn",b.textContent="Prev",b.disabled=n<=0,b.addEventListener("click",()=>{n-=1,r()});let z=document.createElement("span");z.textContent=`${n+1} / ${l}`;let E=document.createElement("button");E.type="button",E.className="bloom-ih-btn",E.textContent="Next",E.disabled=n+1>=l,E.addEventListener("click",()=>{n+=1,r()});let C=document.createElement("button");C.type="button",C.className="bloom-ih-clear",C.textContent="Clear all",C.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(_e([]),f=0,r())}),S.append(b,z,E,C),e.appendChild(S)};return r(),()=>{e.replaceChildren()}}var Sn=I({name:"InputHistory",description:"Recall previous chat prompts with Arrow Up and Arrow Down, like a shell.",authors:[_.p],tags:["chat"],enabledByDefault:!0,settings:He,managedStyle:"inputHistory",cleanupSelectors:[".bloom-ih-hud"],start(){if(he("inputHistory",un),fe)return;f=x().length,k=!1,fe=new AbortController;let{signal:e}=fe;document.addEventListener("keydown",wo,{capture:!0,signal:e}),document.addEventListener("input",Lo,{capture:!0,signal:e}),document.addEventListener("submit",ko,{capture:!0,signal:e}),document.addEventListener("click",Co,{capture:!0,signal:e}),document.addEventListener("pointerdown",To,{capture:!0,signal:e})},stop(){fe?.abort(),fe=null,j(),lt.clear(),clearTimeout(ut),ge=!1,mt=null,k=!1},onSettingsChange(){let e=x(),t=bn(e);t.length!==e.length&&_e(t),f>t.length&&(f=t.length)}});var En=new p("Bloom"),wn=!1,Ao=[Vt,cn,Sn];function Oo(){return new Promise(e=>{let t=()=>document.body?(e(),!0):!1;if(t())return;let n=new MutationObserver(()=>{t()&&n.disconnect()});n.observe(document.documentElement,{childList:!0,subtree:!0}),setTimeout(()=>{n.disconnect(),e()},15e3)})}async function pt(){await Mt()}async function gt(){if(wn)return;wn=!0;for(let t of Ao)try{At(t)}catch(n){En.error("register failed",t.name,n)}Rt(),Ee("Init");let e=()=>Ee("DOMContentLoaded");document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await Oo(),Ee("HostReady"),En.info("ready")}var Ln=typeof unsafeWindow<"u"?unsafeWindow:window;window===window.top&&!Ln.Bloom&&(Object.defineProperty(Ln,"Bloom",{value:bt,writable:!1,configurable:!0}),pt().then(()=>gt()).catch(e=>console.error("[Bloom++] Fatal init error:",e)));})();
