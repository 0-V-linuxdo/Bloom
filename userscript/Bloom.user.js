// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260902] v1.3.7
// @description  Void++-style plugin host for chatgpt.com. Tab favicon, input history, hide Share and Dictation.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @icon         https://raw.githubusercontent.com/0-V-linuxdo/Bloom/main/assets/logos/bloom-icon.svg
// @match        https://chatgpt.com/*
// @match        https://*.chatgpt.com/*
// @match        https://chat.openai.com/*
// @match        https://free.share-ai.top/*
// @match        https://chatgpt.aicnm.cc/*
// @run-at       document-idle
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
// @downloadURL  https://raw.githubusercontent.com/0-V-linuxdo/Bloom/main/userscript/Bloom.user.js
// @updateURL    https://raw.githubusercontent.com/0-V-linuxdo/Bloom/main/userscript/Bloom.user.js
// ==/UserScript==

/* Bloom++ [20260902] v1.3.7. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var ko=Object.defineProperty;var Mo=(e,t)=>{for(var n in t)ko(e,n,{get:t[n],enumerable:!0})};var Gt={};Mo(Gt,{REPO_URL:()=>yn,Settings:()=>d,VERSION:()=>j,hasLateIslands:()=>K,init:()=>$t,initSettings:()=>zt,isDocumentInteractive:()=>vn,plugins:()=>T,requestChromeReady:()=>gn,requestIdleReady:()=>Y,whenChromeReady:()=>Fe,whenIdleReady:()=>_e,whenShellReady:()=>W});var N=new Map,Pe=!1;function Ao(){return document.getElementById("bloom-root")?.shadowRoot??null}function Po(){return document.head??null}function F(){let e=Ao();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=Ro()}function dt(e,t){if(!Pe)return;let n=Po();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),F();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,F();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,F()}function V(e,t){let n=N.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},N.set(e,n)),Pe&&dt(e,n)}function Vt(){Pe=!0;for(let[e,t]of N)dt(e,t);return F(),!0}function Ut(e){let t=N.get(e);t&&(t.disabled=!1,Pe&&dt(e,t))}function Wt(e){let t=N.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),F())}function q(e){let t=N.get(e);t&&(t.el?.remove(),N.delete(e),F())}function Ro(){return Array.from(N.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}function Yt(){F()}var h=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function v(e){return e}var Io=new Map;function ce(e,t){let n=Io.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var No="bloompp";function Jt(){return new Promise((e,t)=>{let n=indexedDB.open(No,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function Xt(e){try{let t=await Jt();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function Zt(e,t){try{let n=await Jt();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function de(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Qt(e,t,n){return Math.min(n,Math.max(t,e))}function en(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function tn(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}var Re=new h("SettingsStore"),H="BloomSettings",Ho=100;function Ne(e){if(de(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(de(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return de(n)?n:null}return null}catch{return null}}var Ie=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[b,c]of this.defaultGetters)if(l.startsWith(b)){let g=l.slice(b.length+1);if(g&&!g.includes(".")){let u=c(g);u!==void 0&&(i[a]=u,s=u);break}}}return de(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Re.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Ho))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(H,this.plain)}catch{try{GM_setValue(H,t)}catch(n){Re.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(H,t)}catch{}Zt(H,t).catch(n=>Re.warn("Failed to save settings to IndexedDB:",n))}catch(t){Re.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){en(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var Oo=new h("Settings"),Do={plugins:{}},d=new Ie(structuredClone(Do)),Bo=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function _o(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function C(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(d.store.plugins[n]||(d.store.plugins[n]={}),d.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?d.plain.plugins[n]??{}:{}}};return t}function Fo(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function nn(){let e=null;if(e=Ne(Fo(H)),e||(e=Ne(await Xt(H))),!e)try{e=Ne(localStorage.getItem(H))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(d.plain.plugins=t),Oo.debug("Loaded settings")}}function on(e,t){t&&(t.pluginName=e,d.plain.plugins[e]||(d.plain.plugins[e]={}),d.setDefaultGetter(Bo(e),n=>{if(n!=="enabled")return _o(t.def,n)}))}var He=new h("PluginManager"),T={},me=new Set;function sn(e){if(T[e.name]){He.warn("Duplicate plugin",e.name);return}T[e.name]=e,on(e.name,e.settings)}function Oe(e){let t=T[e];if(!t)return!1;if(t.required)return!0;let n=d.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function ln(e){let t=T[e];if(!t||t.required)return;let n=!Oe(e);d.plain.plugins[e]||(d.store.plugins[e]={}),d.store.plugins[e].enabled=n,n?cn(t):qo(t),ce("pluginToggle",{name:e,enabled:n})}function cn(e,t=!1){if(!me.has(e.name)&&Oe(e.name))try{e.managedStyle&&Ut(e.managedStyle),e.start?.(),me.add(e.name),e.settings&&d.addPrefixChangeListener(`plugins.${e.name}.`,()=>{me.has(e.name)&&e.onSettingsChange?.()}),t||He.debug("Started",e.name)}catch(n){He.error("Failed to start",e.name,n)}}function qo(e){if(me.has(e.name)){try{e.stop?.()}catch(t){He.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(Wt(e.managedStyle),q(e.managedStyle)),me.delete(e.name)}}function fe(e){for(let t of Object.values(T))(t.startAt??"DOMContentLoaded")===e&&cn(t)}var rn=2,an="defaultsRev";function dn(){for(let t of Object.values(T))d.plain.plugins[t.name]||(d.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=d.store.plugins.Settings??(d.store.plugins.Settings={});if(e[an]!==rn){for(let t of["NoShareLink","NoDictation"]){let n=d.store.plugins[t]??(d.store.plugins[t]={});n.enabled=!1}e[an]=rn}}var pe=!1,De=!1,ut=!1,mn=[],fn=[],pn=[];function mt(e){let t=e.splice(0);for(let n of t)n()}function Be(){pe||(pe=!0,mt(mn))}function ft(){De||(De=!0,pe||Be(),mt(fn))}function bn(){ut||(ut=!0,pe||Be(),De||ft(),mt(pn))}function W(e){pe?e():mn.push(e)}function _e(e){De?e():fn.push(e)}function Fe(e){ut?e():pn.push(e)}function Y(){Be(),ft()}function gn(){bn()}function un(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function hn(){await un(4e3),Be(),await un(4e3),ft(),bn()}var k={p:"0-V-linuxdo"},j="[20260902] v1.3.7",yn="https://github.com/0-V-linuxdo/Bloom";function jo(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Ko(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function pt(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function K(){return pt()?jo()||Ko():!1}function vn(){return K()}var gt=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary"],zo={light:{"--main-surface-primary":"#ffffff","--main-surface-secondary":"#f4f4f4","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#f9f9f9","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#b4b4b4","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.1)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.2)","--link":"#0d0d0d","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#f4f4f4","--bg-primary":"#ffffff","--bg-secondary":"#f4f4f4"},dark:{"--main-surface-primary":"#212121","--main-surface-secondary":"#2f2f2f","--main-surface-tertiary":"#424242","--sidebar-surface-primary":"#171717","--text-primary":"#ececec","--text-secondary":"#b4b4b4","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ececec","--icon-secondary":"#b4b4b4","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.1)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.2)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.06)","--interactive-label-primary-default":"#ececec","--message-surface":"#2f2f2f","--bg-primary":"#212121","--bg-secondary":"#2f2f2f"}};function $o(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Go(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function bt(e){let t=$o(e);return t?Go(t)>.55?"light":"dark":null}function Vo(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=bt(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=bt(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=bt(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function xn(e){return e==="auto"?Vo():e}function Uo(e){try{let t=getComputedStyle(document.documentElement);for(let n of gt){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function Sn(e,t,n){let o=zo[t];if(n){Uo(e);for(let r of gt)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of gt)e.style.setProperty(r,o[r])}function En(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var wn=`/* Void++ BaseCard / PluginCard chrome. Tokens from chatgpt.com via :host.
   Fixed 36\xD736 cluster above the composer. Panel is an absolute child.
   Never a full-viewport backdrop. Never JS pixel layout. */

:host {
  position: fixed;
  top: auto;
  left: auto;
  right: 12px;
  bottom: 96px;
  width: 36px;
  height: 36px;
  overflow: visible;
  pointer-events: none;
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
  --bloom-accent: var(--text-accent, #10a37f);
  --bloom-shadow: 0 0 0 1px var(--bloom-border), 0 8px 24px rgba(0, 0, 0, 0.12);
  --bloom-fab-shadow: 0 0 0 1px var(--bloom-border), 0 2px 8px rgba(0, 0, 0, 0.08);
  --bloom-ease: cubic-bezier(0.32, 0.72, 0, 1);
  color-scheme: light;
  font: 14px/1.45 ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
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
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 36px;
  height: 36px;
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
    box-shadow 160ms var(--bloom-ease);
}

.bloom-settings-fab:hover {
  background: var(--bloom-elevated);
}

.bloom-settings-fab:active {
  transform: scale(0.96);
}

.bloom-settings-fab:focus-visible {
  outline: 2px solid var(--bloom-fg);
  outline-offset: 2px;
}

.bloom-settings-fab svg {
  width: 22px;
  height: 22px;
  display: block;
  pointer-events: none;
}

.bloom-settings-panel {
  position: absolute;
  z-index: 2;
  right: 0;
  bottom: calc(100% + 8px);
  top: auto;
  left: auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: min(360px, calc(100vw - 24px));
  max-height: min(60vh, 480px);
  padding: 20px;
  border: 0;
  border-radius: 16px;
  background: var(--bloom-bg);
  color: var(--bloom-fg);
  box-shadow: var(--bloom-shadow);
  pointer-events: auto;
}

.bloom-settings-list,
.bloom-settings-plugin {
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1;
  pointer-events: auto;
}

.bloom-settings-panel[hidden],
.bloom-settings-list[hidden],
.bloom-settings-plugin[hidden] {
  display: none !important;
  pointer-events: none !important;
}

.bloom-settings-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 0 0 4px;
}

.bloom-settings-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.bloom-settings-mark {
  width: 22px;
  height: 22px;
  color: var(--bloom-icon);
  display: grid;
  place-items: center;
  flex: 0 0 auto;
}

.bloom-settings-mark svg {
  width: 22px;
  height: 22px;
}

.bloom-settings-head h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.bloom-settings-sub {
  margin: 0 0 14px;
  font-size: 0.8125rem;
  color: var(--bloom-muted);
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
  pointer-events: auto;
}

.bloom-icon-btn:hover {
  color: var(--bloom-fg);
  background: var(--bloom-hover);
}

.bloom-icon-btn svg {
  width: 16px;
  height: 16px;
  pointer-events: none;
}

.bloom-plugin-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  overflow: auto;
  min-height: 0;
  flex: 1;
}

.bloom-plugin-card {
  padding: 0;
  border-radius: 8px;
  background: var(--bloom-elevated);
  border: 1px solid var(--bloom-border);
  min-height: 7.5rem;
  min-width: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.bloom-card-body {
  padding: 0.625rem 0.75rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.bloom-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.bloom-card-name {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  min-width: 0;
  flex: 1;
  overflow: hidden;
}

.bloom-card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  color: var(--bloom-fg);
  line-height: 0;
}

.bloom-card-icon svg {
  width: 1.125rem;
  height: 1.125rem;
}

.bloom-plugin-card h3 {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.bloom-card-controls {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-shrink: 0;
}

.bloom-card-gear {
  width: 28px;
  height: 28px;
  color: var(--bloom-faint);
  pointer-events: auto;
}

.bloom-card-desc {
  margin: 0.25rem 0 0;
  color: var(--bloom-muted);
  font-size: 0.8125rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bloom-card-sep {
  height: 1px;
  background: var(--bloom-border);
}

.bloom-card-footer {
  display: flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  font-size: 0.7rem;
  color: var(--bloom-faint);
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bloom-dialog-titles {
  min-width: 0;
  flex: 1;
}

.bloom-dialog-titles h2,
.bloom-dialog-titles h3 {
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 600;
}

.bloom-dialog-titles p {
  margin: 4px 0 0;
  font-size: 0.8125rem;
  color: var(--bloom-muted);
  line-height: 1.4;
}

.bloom-dialog-empty {
  margin: 0;
  color: var(--bloom-muted);
  font-size: 0.875rem;
}

.bloom-toggle {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  flex: 0 0 auto;
  pointer-events: auto;
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
  background: var(--bloom-accent, #10a37f);
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

.bloom-plugin-settings {
  display: flex;
  flex-direction: column;
  overflow: auto;
  min-height: 0;
  flex: 1;
}

.bloom-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin: 0;
  padding: 10px 0;
  border-bottom: 1px solid var(--bloom-border);
}

.bloom-field:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.bloom-field > span:first-child,
.bloom-field > summary {
  font-size: 0.875rem;
  color: var(--bloom-fg);
  line-height: 1.35;
  min-width: 0;
  flex: 1;
}

.bloom-field-block {
  display: block;
  padding-top: 12px;
}

.bloom-field-block > summary {
  cursor: pointer;
  list-style: none;
  font-weight: 500;
}

.bloom-field-block > summary::-webkit-details-marker {
  display: none;
}

.bloom-field-block > summary::before {
  content: "\u25B8 ";
  color: var(--bloom-muted);
}

.bloom-field-block[open] > summary::before {
  content: "\u25BE ";
}

.bloom-field select,
.bloom-field input[type="range"] {
  pointer-events: auto;
}

.bloom-field select {
  height: 32px;
  min-width: 148px;
  max-width: 52%;
  border-radius: 6px;
  border: 1px solid var(--bloom-border-strong);
  background: var(--bloom-surface);
  color: inherit;
  padding: 0 10px;
  font: inherit;
  font-size: 0.8125rem;
}

.bloom-field select:hover {
  border-color: var(--bloom-fg);
}

.bloom-field select:focus {
  outline: 2px solid var(--bloom-fg);
  outline-offset: 1px;
}

.bloom-field input[type="range"] {
  width: 140px;
  accent-color: var(--bloom-accent, #10a37f);
  height: 24px;
}

.bloom-field-slider {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
}

.bloom-field-slider > span {
  min-width: 2ch;
  font-size: 0.75rem;
  color: var(--bloom-muted);
  font-variant-numeric: tabular-nums;
}

@media (prefers-reduced-motion: reduce) {
  .bloom-settings-fab,
  .bloom-settings-panel,
  .bloom-switch span,
  .bloom-switch span::after {
    transition: none;
  }
}
`;var ht="bloom-root",Yo="10000",Jo=C({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),p=null,J=null,ve=!1,xt=!1,yt=[],qe=null,vt=null,be=null,O=null,ge=null,he=null,X=null,Ke=null,ze=null,R=null;function St(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Ln(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Xo(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>'}function Zo(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>'}var Qo={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>'};function er(e){return Qo[e]??St()}function tr(){return"auto"}function je(){if(!p)return;let e=tr(),t=xn(e);p.setAttribute("data-bloom-scheme",t),Sn(p,t,e==="auto"),ce("schemeChange",{scheme:t,pref:e})}function nr(){Yt()}function D(e,t){e&&(e.hidden=t,e.toggleAttribute("inert",t),t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden"),e.style.pointerEvents=t?"none":"auto")}function or(e){e.style.position="fixed",e.style.top="auto",e.style.left="auto",e.style.right="12px",e.style.bottom="96px",e.style.width="36px",e.style.height="36px",e.style.margin="0",e.style.padding="0",e.style.border="0",e.style.overflow="visible",e.style.pointerEvents="none",e.style.zIndex=Yo}function Cn(e){e.querySelectorAll(".bloom-settings-backdrop, .bloom-plugin-backdrop").forEach(t=>t.remove())}function $e(){p=document.getElementById(ht),p||(p=document.createElement("div"),p.id=ht),or(p);let e=document.body;if(e&&p.parentNode!==e&&e.appendChild(p),J=p.shadowRoot??p.attachShadow({mode:"open"}),Cn(p),Cn(J),!J.querySelector("style[data-bloom]")){let t=document.createElement("style");t.dataset.bloom="1",t.textContent=wn,J.appendChild(t)}return je(),nr(),J}function Tn(){for(let e of yt)e();yt=[]}function kn(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function rr(e){return!!e.settings&&Object.keys(e.settings.def).length>0}function ir(e,t,n){if(n.hidden)return null;if(n.type===5&&n.render){let a=document.createElement("details");a.className="bloom-field bloom-field-block";let s=document.createElement("summary");s.textContent=n.description||t;let l=document.createElement("div");return yt.push(n.render(l)),a.append(s,l),a}let o=document.createElement("div");o.className="bloom-field";let r=document.createElement("span");r.textContent=n.description||t,o.appendChild(r);let i=d.store.plugins[e]??(d.store.plugins[e]={});if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??n.options.find(s=>s.default)?.value??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=kn(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),o.appendChild(a),o}return o}function Ge(){xt=!1,Tn(),R&&R.replaceChildren(),D(he,!0),D(ge,!1)}function ar(e){if(Tn(),xt=!0,Ke&&(Ke.textContent=e.name),ze&&(ze.textContent=e.description),R){if(R.replaceChildren(),e.settings)for(let[t,n]of Object.entries(e.settings.def)){let o=ir(e.name,t,n);o&&R.appendChild(o)}if(!R.childElementCount){let t=document.createElement("p");t.className="bloom-dialog-empty",t.textContent="No configurable settings.",R.appendChild(t)}}D(ge,!0),D(he,!1)}function sr(e){let t=document.createElement("section");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=er(e.name);let a=document.createElement("h3");a.textContent=e.name,r.append(i,a);let s=document.createElement("div");if(s.className="bloom-card-controls",rr(e)){let y=document.createElement("button");y.type="button",y.className="bloom-icon-btn bloom-card-gear",y.setAttribute("aria-label",`${e.name} settings`),y.innerHTML=Zo(),y.addEventListener("click",()=>ar(e)),s.appendChild(y)}let l=kn(e.name,Oe(e.name),!!e.required);l.querySelector("input")?.addEventListener("change",()=>{ln(e.name)}),s.appendChild(l),o.append(r,s);let c=document.createElement("p");c.className="bloom-card-desc",c.textContent=e.description,n.append(o,c);let g=document.createElement("div");g.className="bloom-card-sep";let u=document.createElement("div");return u.className="bloom-card-footer",u.textContent=e.authors?.join(", ")||"\xA0",t.append(n,g,u),t}function lr(){if(X){X.replaceChildren();for(let e of Object.values(T))e.hidden||e.name==="Settings"||X.appendChild(sr(e))}}function cr(e){if(O&&ge&&he&&X&&O.isConnected)return;O?.remove();let t=document.createElement("div");t.className="bloom-settings-panel",t.setAttribute("role","menu"),t.setAttribute("aria-labelledby","bloom-settings-title"),D(t,!0);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=St();let a=document.createElement("h2");a.id="bloom-settings-title",a.textContent="Bloom++",r.append(i,a);let s=document.createElement("button");s.type="button",s.className="bloom-icon-btn",s.setAttribute("aria-label","Close"),s.innerHTML=Ln(),s.addEventListener("click",ye),o.append(r,s),n.appendChild(o);let l=document.createElement("p");l.className="bloom-settings-sub",l.textContent="Plugins",n.appendChild(l);let b=document.createElement("div");b.className="bloom-plugin-grid",n.appendChild(b);let c=document.createElement("div");c.className="bloom-settings-plugin",D(c,!0);let g=document.createElement("div");g.className="bloom-settings-head";let u=document.createElement("button");u.type="button",u.className="bloom-icon-btn",u.setAttribute("aria-label","Back"),u.innerHTML=Xo(),u.addEventListener("click",Ge);let y=document.createElement("div");y.className="bloom-dialog-titles";let L=document.createElement("h2");L.textContent="";let P=document.createElement("p");P.className="bloom-settings-sub",y.append(L,P);let m=document.createElement("button");m.type="button",m.className="bloom-icon-btn",m.setAttribute("aria-label","Close"),m.innerHTML=Ln(),m.addEventListener("click",ye),g.append(u,y,m);let _=document.createElement("div");_.className="bloom-plugin-settings",c.append(g,_),t.append(n,c),e.append(t),O=t,ge=n,he=c,X=b,Ke=L,ze=P,R=_,lr()}function ye(){ve=!1,D(O,!0),be?.setAttribute("aria-expanded","false"),Ge(),Et()}function Mn(){(!be?.isConnected||!O?.isConnected)&&An(),Ge(),ve=!0,be?.setAttribute("aria-expanded","true"),D(O,!1),mr(),ce("settingsOpen",void 0)}function dr(){ve?ye():Mn()}function ur(e){if(e.key==="Escape"&&ve){if(e.preventDefault(),xt){Ge();return}ye()}}function Et(){vt?.abort(),vt=null}function mr(){if(Et(),!ve)return;let e=new AbortController;vt=e,window.addEventListener("keydown",ur,{signal:e.signal})}function An(){let e=$e();e.querySelector(".bloom-settings-fab")?.remove();let t=document.createElement("button");t.type="button",t.className="bloom-settings-fab",t.setAttribute("aria-label","Bloom++ settings"),t.setAttribute("aria-expanded","false"),t.setAttribute("aria-haspopup","menu"),t.innerHTML=St(),t.addEventListener("click",dr),e.appendChild(t),be=t,cr(e)}function Pn(){Y(),W(()=>Mn())}var Rn=v({name:"Settings",description:"Bloom++ settings, a bottom-right cluster above the composer.",authors:[k.p],required:!0,hidden:!0,enabledByDefault:!0,settings:Jo,startAt:"HostShell",cleanupSelectors:[`#${ht}`],start(){An(),je(),qe?.(),qe=En(je)},stop(){Et(),qe?.(),qe=null,ye(),p?.remove(),p=null,J=null,be=null,O=null,ge=null,he=null,X=null,Ke=null,ze=null,R=null},onSettingsChange:je});var Hn='form[data-type="unified-composer"], form.w-full[data-type]',Z=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Ve=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),In=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Nn=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),fr=/stop streaming|stop generating|停止生成|停止输出|停止响应/;function x(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function z(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!x(r)))return r;return null}function On(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function M(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=On(e);return!!(fr.test(n)||/^stop$/i.test(n))}function B(){let t=Array.from(document.querySelectorAll(Hn)).find(x);if(t instanceof HTMLElement)return t;let n=z(document,Z),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function $(){let e=Array.from(document.querySelectorAll(Z));return e.find(x)??e[0]??null}function wt(){let e=$();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function pr(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function Dn(e){let t=B();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!x(n))&&e(n))return n;return null}function Ue(){let e=B(),t=z(e,Ve)??z(document,Ve);return t&&!M(t)?t:Dn(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!M(n);let r=On(n);return/^(send|send prompt|发送)$/i.test(r)&&!M(n)})}function Lt(){let e=Ue();return!!e&&pr(e)}function Ct(){let e=B(),t=z(e,In,!0)??z(document,In,!0);if(t)return t;let n=z(e,Nn)??z(document,Nn);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&x(o)&&M(o))return o}return Dn(M)}function Q(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}var Tt=0;function Bn(e){Tt+=1;try{e()}finally{Tt-=1}}function We(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function ee(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function _n(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function br(e){let{head:t}=document;if(t)for(let n of Array.from(t.querySelectorAll("link")))n.id!==e&&We(n)&&n.remove()}function gr(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function kt(e,t){let{head:n}=document;!n||!t||Bn(()=>{br(e);let o=_n(e),{type:r,sizes:i}=gr(t);o?n.lastElementChild!==o&&n.appendChild(o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function Fn(e,t){let{head:n}=document;n&&Bn(()=>{_n(e)?.remove();let o=Array.from(n.querySelectorAll("link")).filter(We);if(o.length){ee(t)&&o[0].href!==t&&(o[0].href=t);return}if(!ee(t))return;let r=document.createElement("link");r.rel="icon",r.href=t,n.appendChild(r)})}function qn(e,t){let{head:n}=document;if(!n)return null;let o=new MutationObserver(r=>{if(!Tt)for(let i of r){if(i.type==="attributes"&&We(i.target)){t(i.target.id===e?void 0:i.target.href);return}for(let a of i.addedNodes)if(We(a)&&a.id!==e){t(a.href);return}}});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}function Ye(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=b=>{let c=n.indexOf(b);return c>=0&&n[c+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(b,c)=>{try{return document.querySelector(b)?.getAttribute(c)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function Je(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function hr(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!x(t))&&(M(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function yr(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&x(e))}function vr(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&x(e))}function xr(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Mt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function Xe(){if(Ct()||hr())return!0;let e=Ue();return e&&x(e)&&!M(e)?!1:!!(yr()||vr()||xr())}var Sr=["original","badge","dot","hole","bg"],zn=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge",default:!0},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],$n={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Ze="#FCFCFC",Er="#111111",jn="#111111",wr="#ffffff",Lr="#212121",Cr="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Tr={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Qe=32,Kn=64;function Gn(e){return typeof e=="string"&&Sr.includes(e)}function kr(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function et(e){let t=document.createElement("canvas");t.width=Qe,t.height=Qe;let n=t.getContext("2d");return n?(n.scale(Qe/Kn,Qe/Kn),e(n),t.toDataURL("image/png")):""}function Mr(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function tt(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(Cr);n&&(e.strokeStyle=Er,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function Ar(e,t,n){let o=$n[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=jn,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=jn,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=wr,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function xe(e,t){if(e==="original")return t==="wait"?et(o=>tt(o,Ze)):kr(Tr[t]);let n=t==="wait"?void 0:$n[t];return et(e==="hole"?o=>tt(o,n??Ze):e==="bg"?o=>{o.fillStyle=n??Lr,Mr(o,0,0,64,64,14),o.fill(),tt(o,Ze,!1)}:o=>{tt(o,Ze),t!=="wait"&&Ar(o,t,e==="dot"?"dot":"badge")})}function Vn(e){return{wait:xe(e,"wait"),rotate:xe(e,"rotate"),done:xe(e,"done"),ready:xe(e,"ready"),error:xe(e,"error")}}var Pr=new h("ChatStateFavicons"),ne="bloom-chat-state-favicon",Jn=C({style:{type:3,description:"Favicon overlay",options:zn}}),oe="",Pt={wait:"",rotate:"",done:"",ready:"",error:""},Rt="wait",Ee=!1,I=!1,S=null,we="",Le="",Ce=!0,Se=null,re=0,te,nt=null,G=null,At=null,Te=!1,Un=new WeakSet,Rr=400;function Ir(){let e=Jn.store.style;return Gn(e)?e:"badge"}function Nr(){let t=document.querySelector(`link[rel~="icon"]:not(#${ne})`)?.href;return ee(t)?t:ee(oe)?oe:""}function E(e){Rt=e,kt(ne,Pt[e])}function Wn(){Pt=Vn(Ir()),E(Rt)}function Hr(){let e=Ye(),t=e?Je(e):Je("");return Xe()?(!we&&t&&(we=t),we||t):(we="",t)}function Xn(){Ee=!1,I=!1,S=null,we=""}function Or(e){Le=e,Xn(),Ce=!1,E("wait")}function Zn(){if(!Te)return;let e=Ye()||location.pathname;if(Le&&e&&Le!==e){Or(e);return}e&&(Le=e);let t=Hr(),n=Xe(),o=wt(),r=Lt();if(Mt()&&!n){E("error"),Ee=!1,I=!1,S=null;return}if(n){Ee=!0,I=!1,S=t,E("rotate");return}if(Ee){let i=!!S&&!!t&&S===t;if(Ee=!1,i){I=!0,S=t,E("done");return}I=!1,S=null}if(I)if(!!(S&&t&&S!==t))I=!1,S=null;else if(o){E("done");return}else if(Ce){I=!1,E("ready");return}else{I=!1,E("wait");return}S=null,E(o?"wait":Ce?"ready":"wait")}function Qn(){let e=B();if(!(G&&At===e&&e.isConnected)){if(G?.disconnect(),At=e,!e||e===document.body){G=null;return}G=new MutationObserver(()=>ot()),G.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid","class"]})}}function ot(){!Te||re||(re=requestAnimationFrame(()=>{re=0,Te&&(eo(),Qn(),Zn())}))}function Yn(){Ce=!0,ot()}function eo(){let e=$();!e||Un.has(e)||(Un.add(e),e.addEventListener("input",Yn,{passive:!0}),e.addEventListener("compositionend",Yn,{passive:!0}))}var to=v({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[k.p],tags:["chat","ui"],enabledByDefault:!0,settings:Jn,startAt:"DOMContentLoaded",cleanupSelectors:[`#${ne}`],start(){Te=!0,oe=Nr()||oe,Wn(),nt?.disconnect(),nt=qn(ne,e=>{ee(e)&&(oe=e),kt(ne,Pt[Rt])}),Se?.abort(),Se=new AbortController,window.addEventListener("popstate",ot,{signal:Se.signal}),eo(),Qn(),te!==void 0&&clearInterval(te),te=setInterval(ot,Rr),Zn(),Pr.debug("favicon watch started")},stop(){Te=!1,re&&cancelAnimationFrame(re),re=0,te!==void 0&&(clearInterval(te),te=void 0),Se?.abort(),Se=null,G?.disconnect(),G=null,At=null,nt?.disconnect(),nt=null,Xn(),Le="",Ce=!0,Fn(ne,oe)},onSettingsChange:Wn});var no=`.bloom-ih-hud {
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
`;var oo=new h("InputHistory"),It=/\u200B/g,ro=10,io=500,ao=100,Br=8,_r=120,Fr=2e3,rt=10,it=C({maxEntries:{type:4,description:"Max stored prompts",min:ro,max:io,default:ao},history:{type:5,description:"Stored prompts",render:Qr},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Nt=new Map,f=0,Ht="",A=!1,Me=!1,Bt=0,ke=null,Ot,_t=null,so=!0;function w(){let e=it.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function lo(e){let t=Qt(Number(it.store.maxEntries??ao),ro,io);return e.length>t?e.slice(e.length-t):e}function at(e){it.store.entries=lo(e)}function qr(e){return e.replaceAll(It,"").replace(/\n$/,"").trim()}function Dt(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(Z);return n instanceof HTMLElement?n:$()}function jr(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!Q(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(It,"").trim().length===0,last:i.toString().replaceAll(It,"").trim().length===0}}catch{return{first:!0,last:!0}}}function co(e,t){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch(i){oo.debug("pm caret failed:",i)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function uo(e){clearTimeout(Ot),Ot=setTimeout(()=>{if(e!==Bt)return;Me=!1;let t=_t;t&&co(t,so)},_r)}function mo(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),Me=!0,_t=e,so=n;let i=++Bt;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(a){oo.debug("insertText failed:",a),e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),co(e,n),uo(i)}function Kr(){let e=$e(),t=e.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",e.appendChild(t)),t}function ie(){document.getElementById("bloom-root")?.shadowRoot?.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function zr(e,t){let n=Kr();n.textContent=e;let o=(t.closest("form")??B()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-Br)}px`,n.classList.add("bloom-ih-hud-on")}function Ft(e){let t=qr(e);if(!t)return;let n=Date.now(),o=Nt.get(t);if(o&&n-o<Fr)return;Nt.set(t,n);let r=w().filter(i=>i!==t);r.push(t),at(r),f=w().length,A=!1,ie()}function $r(e,t){let n=w();if(!n.length&&e)return;f>=n.length&&(Ht=Q(t),f=n.length);let o=e?f-1:f+1;o<0||o>n.length||(f=o,A=!0,mo(t,o===n.length?Ht:n[o],e),o<n.length?zr(`${o+1} / ${n.length}`,t):ie())}function Gr(e){A=!1,ie(),mo(e,Ht,!1),f=w().length}function Vr(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=Dt(e.target)??Dt(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&A&&!e.altKey&&!e.shiftKey){Gr(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){Ft(Q(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=w();if(!o){let i=jr(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||f<=0)||!n&&f>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),$r(n,t))}function Ur(e){if(Dt(e.target)){if(Me){uo(Bt);return}A&&(A=!1,ie(),f=w().length)}}function Wr(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(Z);n instanceof HTMLElement&&Ft(Q(n))}function Yr(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(Ve);if(!n||!(n instanceof HTMLElement)||M(n))return;let o=$();o&&Ft(Q(o))}function Jr(e){if(!(!A||Me)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}A=!1,ie()}}function Xr(){if(ke)return;ke=new AbortController;let{signal:e}=ke,t={capture:!0,signal:e};window.addEventListener("keydown",Vr,t),window.addEventListener("input",Ur,t),window.addEventListener("submit",Wr,t),window.addEventListener("click",Yr,t),window.addEventListener("pointerdown",Jr,t)}function Zr(e){let t=w().slice();t.splice(e,1),at(t),f>t.length&&(f=t.length)}function Qr(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=w().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(m=>m.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/rt));n>=l&&(n=l-1);let b=s.slice(n*rt,n*rt+rt);e.replaceChildren();let c=document.createElement("input");if(c.className="bloom-ih-search",c.type="search",c.placeholder="Search history",c.autocomplete="off",c.value=t,c.addEventListener("input",()=>{t=c.value,n=0,r()}),e.appendChild(c),b.length){let m=document.createElement("div");m.className="bloom-ih-list",b.forEach((_,st)=>{let Co=i.indexOf(_),To=w().length-1-Co,lt=document.createElement("div");lt.className="bloom-ih-item";let ae=document.createElement("button");ae.type="button",ae.className=`bloom-ih-body${o===st?"":" bloom-ih-clamp"}`,ae.textContent=_,ae.addEventListener("click",()=>{o=o===st?-1:st,r()});let ct=document.createElement("div");ct.className="bloom-ih-actions";let se=document.createElement("button");se.type="button",se.title="Copy",se.textContent="C",se.addEventListener("click",()=>{tn(_)});let le=document.createElement("button");le.type="button",le.title="Delete",le.textContent="\xD7",le.addEventListener("click",()=>{Zr(To),r()}),ct.append(se,le),lt.append(ae,ct),m.appendChild(lt)}),e.appendChild(m)}else{let m=document.createElement("p");m.className="bloom-ih-empty",m.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(m)}let g=document.createElement("div");g.className="bloom-ih-pager";let u=document.createElement("button");u.type="button",u.className="bloom-ih-btn",u.textContent="Prev",u.disabled=n<=0,u.addEventListener("click",()=>{n-=1,r()});let y=document.createElement("span");y.textContent=`${n+1} / ${l}`;let L=document.createElement("button");L.type="button",L.className="bloom-ih-btn",L.textContent="Next",L.disabled=n+1>=l,L.addEventListener("click",()=>{n+=1,r()});let P=document.createElement("button");P.type="button",P.className="bloom-ih-clear",P.textContent="Clear all",P.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(at([]),f=0,r())}),g.append(u,y,L,P),e.appendChild(g)};return r(),()=>{e.replaceChildren()}}var fo=v({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[k.p],tags:["chat"],enabledByDefault:!0,settings:it,startAt:"HostReady",managedStyle:"inputHistory",start(){V("inputHistory",no),$e(),f=w().length,A=!1,Xr()},stop(){ke?.abort(),ke=null,ie(),Nt.clear(),clearTimeout(Ot),Me=!1,_t=null,A=!1},onSettingsChange(){let e=w(),t=lo(e);t.length!==e.length&&at(t),f>t.length&&(f=t.length)}});var qt="noShareLink",ei=['button[data-testid="share-chat-button"]'],ti=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],jt=C({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function po(e){return`${e.join(",")}{display:none!important}`}function bo(){let e=[];if(jt.store.hideShareChat!==!1&&e.push(po(ei)),jt.store.hideShareProject!==!1&&e.push(po(ti)),!e.length){q(qt);return}V(qt,e.join(`
`))}var go=v({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[k.p],tags:["ui","privacy"],enabledByDefault:!1,startAt:"HostReady",settings:jt,start:bo,onSettingsChange:bo,stop(){q(qt)}});var vo="noDictation",ni=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]'],oi=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],xo=C({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function ho(e){return`${e.join(",")}{display:none!important}`}function yo(){let e=[ho(ni)];xo.store.hideDictationSettings!==!1&&e.push(ho(oi)),V(vo,e.join(`
`))}var So=v({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[k.p],tags:["chat","ui"],enabledByDefault:!1,startAt:"HostReady",settings:xo,start:yo,onSettingsChange:yo,stop(){q(vo)}});var Ae=new h("Bloom"),Eo=!1,ri=Date.now(),ii=[Rn,to,fo,go,So];function Kt(e){return new Promise(t=>setTimeout(t,e))}function ai(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var si=8e3,wo=300,li=250;async function ci(){if(K())return await Kt(wo),!0;for(;Date.now()-ri<si;)if(await Kt(li),K())return await Kt(wo),!0;return K()||pt()}function di(){try{GM_registerMenuCommand?.("Bloom++ settings",Pn)}catch{}}function ui(){W(()=>{fe("HostShell"),Ae.info("host shell",j)}),_e(()=>{Ae.info("idle ready",j)}),Fe(()=>{Vt(),fe("HostReady"),Ae.info("chrome ready",j)})}async function zt(){await nn()}async function $t(){if(Eo)return;Eo=!0;for(let n of ii)try{sn(n)}catch(o){Ae.error("register failed",n.name,o)}dn(),fe("Init"),di(),ui();let e=()=>fe("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await ai(),!await ci()){Ae.warn("late islands not detected; shell only",j),Y();return}await hn()}var Lo=typeof unsafeWindow<"u"?unsafeWindow:window;window===window.top&&!Lo.Bloom&&(Object.defineProperty(Lo,"Bloom",{value:Gt,writable:!1,configurable:!0}),zt().then(()=>$t()).catch(e=>console.error("[Bloom++] Fatal init error:",e)));})();
