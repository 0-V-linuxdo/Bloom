// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260902] v1.4.0
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

/* Bloom++ [20260902] v1.4.0. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Wo=Object.defineProperty;var Yo=(e,t)=>{for(var n in t)Wo(e,n,{get:t[n],enumerable:!0})};var ln={};Yo(ln,{REPO_URL:()=>Rn,Settings:()=>c,VERSION:()=>P,hasLateIslands:()=>F,init:()=>sn,initSettings:()=>an,isDocumentInteractive:()=>Hn,plugins:()=>w,requestChromeReady:()=>Fe,requestIdleReady:()=>J,whenChromeReady:()=>qe,whenIdleReady:()=>_e,whenShellReady:()=>Y});var H=new Map,Pe=!1;function Jo(){return document.getElementById("bloom-root")?.shadowRoot??null}function Xo(){return document.head??null}function U(){let e=Jo();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=Zo()}function Et(e,t){if(!Pe)return;let n=Xo();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),U();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,U();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,U()}function O(e,t){let n=H.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},H.set(e,n)),Pe&&Et(e,n)}function cn(){Pe=!0;for(let[e,t]of H)Et(e,t);return U(),!0}function un(e){let t=H.get(e);t&&(t.disabled=!1,Pe&&Et(e,t))}function dn(e){let t=H.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),U())}function q(e){let t=H.get(e);t&&(t.el?.remove(),H.delete(e),U())}function Zo(){return Array.from(H.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var p=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function h(e){return e}var Qo=new Map;function ue(e,t){let n=Qo.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var er="bloompp";function mn(){return new Promise((e,t)=>{let n=indexedDB.open(er,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function fn(e){try{let t=await mn();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function pn(e,t){try{let n=await mn();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function de(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function gn(e,t,n){return Math.min(n,Math.max(t,e))}function bn(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function hn(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}var Ie=new p("SettingsStore"),N="BloomSettings",tr=100;function He(e){if(de(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(de(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return de(n)?n:null}return null}catch{return null}}var Re=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[g,u]of this.defaultGetters)if(l.startsWith(g)){let b=l.slice(g.length+1);if(b&&!b.includes(".")){let d=u(b);d!==void 0&&(i[a]=d,s=d);break}}}return de(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Ie.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},tr))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(N,this.plain)}catch{try{GM_setValue(N,t)}catch(n){Ie.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(N,t)}catch{}pn(N,t).catch(n=>Ie.warn("Failed to save settings to IndexedDB:",n))}catch(t){Ie.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){bn(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var nr=new p("Settings"),or={plugins:{}},c=new Re(structuredClone(or)),rr=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function ir(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function S(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(c.store.plugins[n]||(c.store.plugins[n]={}),c.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?c.plain.plugins[n]??{}:{}}};return t}function ar(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function yn(){let e=null;if(e=He(ar(N)),e||(e=He(await fn(N))),!e)try{e=He(localStorage.getItem(N))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(c.plain.plugins=t),nr.debug("Loaded settings")}}function vn(e,t){t&&(t.pluginName=e,c.plain.plugins[e]||(c.plain.plugins[e]={}),c.setDefaultGetter(rr(e),n=>{if(n!=="enabled")return ir(t.def,n)}))}var Oe=new p("PluginManager"),w={},fe=new Set;function Sn(e){if(w[e.name]){Oe.warn("Duplicate plugin",e.name);return}w[e.name]=e,vn(e.name,e.settings)}function Ne(e){let t=w[e];if(!t)return!1;if(t.required)return!0;let n=c.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function wn(e){let t=w[e];if(!t||t.required)return;let n=!Ne(e);c.plain.plugins[e]||(c.store.plugins[e]={}),c.store.plugins[e].enabled=n,n?Ln(t):sr(t),ue("pluginToggle",{name:e,enabled:n})}function Ln(e,t=!1){if(!fe.has(e.name)&&Ne(e.name))try{e.managedStyle&&un(e.managedStyle),e.start?.(),fe.add(e.name),e.settings&&c.addPrefixChangeListener(`plugins.${e.name}.`,()=>{fe.has(e.name)&&e.onSettingsChange?.()}),t||Oe.debug("Started",e.name)}catch(n){Oe.error("Failed to start",e.name,n)}}function sr(e){if(fe.has(e.name)){try{e.stop?.()}catch(t){Oe.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(dn(e.managedStyle),q(e.managedStyle)),fe.delete(e.name)}}function pe(e){for(let t of Object.values(w))(t.startAt??"DOMContentLoaded")===e&&Ln(t)}var En=2,xn="defaultsRev";function Cn(){for(let t of Object.values(w))c.plain.plugins[t.name]||(c.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=c.store.plugins.Settings??(c.store.plugins.Settings={});if(e[xn]!==En){for(let t of["NoShareLink","NoDictation"]){let n=c.store.plugins[t]??(c.store.plugins[t]={});n.enabled=!1}e[xn]=En}}var ge=!1,De=!1,xt=!1,Mn=[],kn=[],An=[];function St(e){let t=e.splice(0);for(let n of t)n()}function Be(){ge||(ge=!0,St(Mn))}function wt(){De||(De=!0,ge||Be(),St(kn))}function Pn(){xt||(xt=!0,ge||Be(),De||wt(),St(An))}function Y(e){ge?e():Mn.push(e)}function _e(e){De?e():kn.push(e)}function qe(e){xt?e():An.push(e)}function J(){Be(),wt()}function Fe(){Pn()}function Tn(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function In(){await Tn(4e3),Be(),await Tn(4e3),wt(),Pn()}var L={p:"0-V-linuxdo"},P="[20260902] v1.4.0",Rn="https://github.com/0-V-linuxdo/Bloom";function lr(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function cr(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function Lt(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function F(){return Lt()?lr()||cr():!1}function Hn(){return F()}var ur=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),On=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),dr=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),mr="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function Nn(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function je(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function C(e){if(!(e instanceof HTMLElement)||!e.isConnected||e.id==="bloom-root"||e.closest(mr))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&je(t)?!1:e.getClientRects().length>0}function be(){for(let n of document.querySelectorAll(ur))if(C(n))return n;let e=[],t=document.getElementById("stage-slideover-sidebar");t&&e.push(t);for(let n of document.querySelectorAll("nav"))e.push(n);for(let n of e){let o=n.querySelector(".sticky.bottom-0")??n,r=o.querySelector("[aria-haspopup='menu']");if(C(r))return r;let i=[...o.querySelectorAll("button")].at(-1)??null;if(C(i))return i}return null}function Ct(e){let t=e.parentElement;return!t||t.id==="bloom-rail-item"||t.id==="bloom-sidebar-panel"?e:t.children.length===1?t:e}function Dn(){let e=document.querySelectorAll(On);for(let n of e)if(C(n)&&!je(n)&&Nn(n))return n;let t=document.querySelectorAll(dr);for(let n of t){if(!C(n)||!Nn(n)||je(n))continue;let o=n.querySelector(On);return C(o)&&!je(o)?o:n}return null}function Tt(){let e=document.getElementById("stage-slideover-sidebar");if(e instanceof HTMLElement&&e.isConnected)return e;for(let t of document.querySelectorAll("nav"))if(t instanceof HTMLElement&&t.isConnected)return t;return null}function Bn(){let e=document.getElementById("stage-slideover-sidebar");if(e instanceof HTMLElement){let n=e.querySelector(".sticky.bottom-0");return C(n)?n:e}let t=be();if(t){let n=t.closest(".sticky.bottom-0");if(C(n))return n;if(t.parentElement)return t.parentElement}for(let n of document.querySelectorAll("nav")){if(!(n instanceof HTMLElement)||!C(n))continue;let o=n.querySelector(":scope .sticky.bottom-0");return C(o)?o:n}return null}function _n(e){let t=be();return t?e.composedPath().includes(t):!1}var kt=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary"],fr={light:{"--main-surface-primary":"#ffffff","--main-surface-secondary":"#f4f4f4","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#f9f9f9","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#b4b4b4","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.1)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.2)","--link":"#0d0d0d","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#f4f4f4","--bg-primary":"#ffffff","--bg-secondary":"#f4f4f4"},dark:{"--main-surface-primary":"#212121","--main-surface-secondary":"#2f2f2f","--main-surface-tertiary":"#424242","--sidebar-surface-primary":"#171717","--text-primary":"#ececec","--text-secondary":"#b4b4b4","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ececec","--icon-secondary":"#b4b4b4","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.1)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.2)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.06)","--interactive-label-primary-default":"#ececec","--message-surface":"#2f2f2f","--bg-primary":"#212121","--bg-secondary":"#2f2f2f"}};function pr(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function gr(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function Mt(e){let t=pr(e);return t?gr(t)>.55?"light":"dark":null}function br(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=Mt(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=Mt(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Mt(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function qn(e){return e==="auto"?br():e}function hr(e){try{let t=getComputedStyle(document.documentElement);for(let n of kt){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function Fn(e,t,n){let o=fr[t];if(n){hr(e);for(let r of kt)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of kt)e.style.setProperty(r,o[r])}function jn(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var At=`/* Sidebar rail row + in-flow panel. No overlay, no FAB, no popover. */

.bloom-rail-item,
.bloom-account-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin: 0;
  padding: 10px 12px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: var(--text-primary, inherit);
  font: inherit;
  font-size: 14px;
  line-height: 1.3;
  cursor: pointer;
  text-align: left;
  box-sizing: border-box;
  min-width: 0;
}

.bloom-rail-item:hover,
.bloom-rail-item:focus-visible,
.bloom-account-item:hover,
.bloom-account-item:focus-visible {
  background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
  outline: none;
}

.bloom-rail-item svg,
.bloom-account-item svg {
  width: 18px;
  height: 18px;
  flex: 0 0 auto;
  color: var(--icon-primary, currentColor);
}

.bloom-rail-item > span,
.bloom-account-item > span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#bloom-sidebar-panel {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
  max-height: min(60vh, 420px);
  overflow: auto;
  margin: 8px 8px 4px;
  padding: 10px;
  border-radius: 12px;
  color: var(--text-primary, inherit);
  font: 14px/1.4 ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
  background: var(--main-surface-primary, #fff);
  border: 1px solid var(--border-light, rgba(0, 0, 0, 0.1));
}

#bloom-sidebar-panel.bloom-rail-dock {
  position: fixed;
  left: 8px;
  right: auto;
  top: auto;
  bottom: 72px;
  width: min(280px, calc(100vw - 16px));
  max-height: min(60vh, 420px);
  margin: 0;
  z-index: 80;
  pointer-events: auto;
}

.bloom-settings-list[hidden],
.bloom-settings-plugin[hidden],
#bloom-sidebar-panel[hidden] {
  display: none !important;
}

.bloom-settings-list,
.bloom-settings-plugin {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.bloom-settings-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin: 0 0 6px;
}

.bloom-settings-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.bloom-settings-mark {
  width: 16px;
  height: 16px;
  display: grid;
  place-items: center;
  color: var(--icon-primary, inherit);
}

.bloom-settings-mark svg {
  width: 16px;
  height: 16px;
}

.bloom-settings-head h2 {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
}

.bloom-settings-sub {
  margin: 0 0 6px;
  font-size: 0.75rem;
  color: var(--text-secondary, #5d5d5d);
}

.bloom-icon-btn {
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--text-secondary, #5d5d5d);
  display: grid;
  place-items: center;
  cursor: pointer;
  flex: 0 0 auto;
}

.bloom-icon-btn:hover {
  color: var(--text-primary, inherit);
  background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
}

.bloom-icon-btn svg {
  width: 16px;
  height: 16px;
  pointer-events: none;
}

.bloom-plugin-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.bloom-plugin-row {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 0 4px 0 6px;
  border-radius: 8px;
  min-width: 0;
}

.bloom-plugin-row:hover {
  background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
}

.bloom-plugin-icon {
  display: inline-flex;
  width: 1.125rem;
  height: 1.125rem;
  flex-shrink: 0;
  color: var(--icon-primary, inherit);
}

.bloom-plugin-icon svg {
  width: 1.125rem;
  height: 1.125rem;
}

.bloom-plugin-label {
  margin: 0;
  flex: 1;
  min-width: 0;
  font-size: 0.8125rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bloom-dialog-titles {
  min-width: 0;
  flex: 1;
}

.bloom-dialog-titles h2 {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
}

.bloom-dialog-titles p {
  margin: 2px 0 0;
  font-size: 0.75rem;
  color: var(--text-secondary, #5d5d5d);
}

.bloom-dialog-empty {
  margin: 0;
  color: var(--text-secondary, #5d5d5d);
  font-size: 0.8125rem;
}

.bloom-toggle {
  display: inline-flex;
  cursor: pointer;
  user-select: none;
  flex: 0 0 auto;
}

.bloom-switch {
  position: relative;
  width: 36px;
  height: 20px;
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
  width: 36px;
  height: 20px;
  border-radius: 999px;
  background: var(--main-surface-tertiary, #ececec);
}

.bloom-switch span::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
}

.bloom-switch input:checked + span {
  background: var(--text-accent, #10a37f);
}

.bloom-switch input:checked + span::after {
  transform: translateX(16px);
}

.bloom-switch input:disabled + span {
  opacity: 0.45;
}

.bloom-plugin-settings {
  display: flex;
  flex-direction: column;
  overflow: auto;
  min-height: 0;
}

.bloom-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 0;
  padding: 8px 0;
  border-bottom: 1px solid var(--border-light, rgba(0, 0, 0, 0.1));
}

.bloom-field:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.bloom-field > span:first-child,
.bloom-field > summary {
  font-size: 0.8125rem;
  min-width: 0;
  flex: 1;
}

.bloom-field-block {
  display: block;
  padding-top: 10px;
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
  color: var(--text-secondary, #5d5d5d);
}

.bloom-field-block[open] > summary::before {
  content: "\u25BE ";
}

.bloom-field select {
  height: 28px;
  min-width: 120px;
  max-width: 52%;
  border-radius: 6px;
  border: 1px solid var(--border-medium, rgba(0, 0, 0, 0.15));
  background: var(--main-surface-primary, #fff);
  color: inherit;
  padding: 0 8px;
  font: inherit;
  font-size: 0.75rem;
}

.bloom-field input[type="range"] {
  width: 120px;
  accent-color: var(--text-accent, #10a37f);
}

.bloom-field-slider {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bloom-field-slider > span {
  min-width: 2ch;
  font-size: 0.75rem;
  color: var(--text-secondary, #5d5d5d);
  font-variant-numeric: tabular-nums;
}
`;var vr="bloom-root",j="bloom-rail-item",Ve="bloom-account-item",$="bloom-sidebar-panel",Ue="bloom-settings-css",Er=S({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),ze=null,xr=null,Nt=!1,Z=!1,Ht=[],$e=null,We=null,D=null,Ge=null,X=null,Ot=null,he,Qe=null,et=null,ye=null,Ye=null,Je=null,I=null;function tt(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function $n(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Sr(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>'}function wr(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l-.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>'}var Lr={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>'};function Cr(e){return Lr[e]??tt()}function Tr(){return"auto"}function Pt(){let e=Tr(),t=qn(e);ze&&(ze.setAttribute("data-bloom-scheme",t),Fn(ze,t,e==="auto")),ue("schemeChange",{scheme:t,pref:e})}function ve(e,t){e&&(e.hidden=t,e.toggleAttribute("inert",t),t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden"))}function Gn(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel").forEach(e=>e.remove())}function Vn(){if(O("settings",At),document.getElementById(Ue)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=Ue,e.textContent=At,document.head.appendChild(e)}function Mr(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Un(){for(let e of Ht)e();Ht=[]}function Wn(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function kr(e){return!!e.settings&&Object.keys(e.settings.def).length>0}function Ar(e,t,n){if(n.hidden)return null;if(n.type===5&&n.render){let a=document.createElement("details");a.className="bloom-field bloom-field-block";let s=document.createElement("summary");s.textContent=n.description||t;let l=document.createElement("div");return Ht.push(n.render(l)),a.append(s,l),a}let o=document.createElement("div");o.className="bloom-field";let r=document.createElement("span");r.textContent=n.description||t,o.appendChild(r);let i=c.store.plugins[e]??(c.store.plugins[e]={});if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??n.options.find(s=>s.default)?.value??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=Wn(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),o.appendChild(a),o}return o}function Dt(){Nt=!1,Un(),I&&I.replaceChildren(),ve(et,!0),ve(Qe,!1)}function Pr(e){if(Un(),Nt=!0,Ye&&(Ye.textContent=e.name),Je&&(Je.textContent=e.description),I){if(I.replaceChildren(),e.settings)for(let[t,n]of Object.entries(e.settings.def)){let o=Ar(e.name,t,n);o&&I.appendChild(o)}if(!I.childElementCount){let t=document.createElement("p");t.className="bloom-dialog-empty",t.textContent="No configurable settings.",I.appendChild(t)}}ve(Qe,!0),ve(et,!1)}function Ir(e){let t=document.createElement("div");t.className="bloom-plugin-row";let n=document.createElement("span");n.className="bloom-plugin-icon",n.innerHTML=Cr(e.name);let o=document.createElement("span");if(o.className="bloom-plugin-label",o.textContent=e.name,t.append(n,o),kr(e)){let a=document.createElement("button");a.type="button",a.className="bloom-icon-btn",a.setAttribute("aria-label",`${e.name} settings`),a.innerHTML=wr(),a.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),Pr(e)}),t.appendChild(a)}let r=Wn(e.name,Ne(e.name),!!e.required),i=r.querySelector("input");return i?.addEventListener("click",a=>a.stopPropagation()),i?.addEventListener("change",()=>{wn(e.name)}),t.appendChild(r),t}function Rr(){if(ye){ye.replaceChildren();for(let e of Object.values(w))e.hidden||e.name==="Settings"||ye.appendChild(Ir(e))}}function It(e){e.stopPropagation()}function Rt(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function Bt(){document.getElementById(j)?.setAttribute("aria-expanded",Z?"true":"false")}function Xe(){Dt(),document.getElementById($)?.remove(),Z=!1,Bt()}function Hr(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",It),t.addEventListener("pointerup",It),t.addEventListener("click",It);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=tt();let a=document.createElement("h2");a.textContent="Bloom++",r.append(i,a);let s=document.createElement("button");s.type="button",s.className="bloom-icon-btn",s.setAttribute("aria-label","Close"),s.innerHTML=$n(),s.addEventListener("click",Xe),o.append(r,s),n.appendChild(o);let l=document.createElement("p");l.className="bloom-settings-sub",l.textContent="Plugins",n.appendChild(l);let g=document.createElement("div");g.className="bloom-plugin-list",n.appendChild(g);let u=document.createElement("div");u.className="bloom-settings-plugin",ve(u,!0);let b=document.createElement("div");b.className="bloom-settings-head";let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn",d.setAttribute("aria-label","Back"),d.innerHTML=Sr(),d.addEventListener("click",Dt);let V=document.createElement("div");V.className="bloom-dialog-titles";let k=document.createElement("h2"),A=document.createElement("p");A.className="bloom-settings-sub",V.append(k,A);let m=document.createElement("button");m.type="button",m.className="bloom-icon-btn",m.setAttribute("aria-label","Close"),m.innerHTML=$n(),m.addEventListener("click",Xe),b.append(d,V,m);let _=document.createElement("div");return _.className="bloom-plugin-settings",u.append(b,_),t.append(n,u),Qe=n,et=u,ye=g,Ye=k,Je=A,I=_,Rr(),t}function Or(e){e.classList.add("bloom-rail-dock")}function Yn(){document.getElementById($)?.remove();let e=Hr($),t=document.getElementById(j);if(t?.isConnected&&t.parentElement)t.before(e);else{let n=Bn();if(n){let o=be();o&&n.contains(o)?Ct(o).before(e):n.appendChild(e)}else if(document.body)Or(e),document.body.appendChild(e);else return}Z=!0,Dt(),Bt(),ue("settingsOpen",void 0)}function _t(){if(document.getElementById($)?.isConnected){Xe();return}Yn()}function Kn(){let e=document.createElement("button");return e.type="button",e.id=j,e.className="bloom-rail-item",e.setAttribute("aria-controls",$),e.setAttribute("aria-expanded",Z?"true":"false"),e.innerHTML=`${tt()}<span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),_t()}),e}function Ze(){if(!document.body)return;let e=document.getElementById(j),t=be();if(t){let o=Ct(t);if(!(e?.isConnected&&e.nextElementSibling===o)){let r=e instanceof HTMLButtonElement?e:Kn();o.before(r)}}else{let o=Tt();if(o){let r=o.querySelector(".sticky.bottom-0")??o;if(!(e?.isConnected&&e.parentElement===r)){let i=e instanceof HTMLButtonElement?e:Kn();r.appendChild(i)}}}let n=document.getElementById($);Z&&n&&!n.isConnected&&Yn(),Bt()}function zn(){let e=Tt();e&&(Ot===e&&X||(X?.disconnect(),Ot=e,X=new MutationObserver(()=>{document.getElementById(j)?.isConnected||Ze()}),X.observe(e,{childList:!0,subtree:!0})))}function Nr(){Ze(),zn(),he===void 0&&(he=window.setInterval(()=>{Ze(),zn()},1e3))}function Dr(){he!==void 0&&(clearInterval(he),he=void 0),X?.disconnect(),X=null,Ot=null}function Br(e){Ge===e&&D||(D?.disconnect(),Ge=e,D=new MutationObserver(()=>{if(!e.isConnected){D?.disconnect(),D=null,Ge=null;return}Jn(e)}),D.observe(e,{childList:!0}))}function Jn(e){if(Br(e),e.querySelector(`#${Ve}`))return;let t=document.createElement("button");t.type="button",t.id=Ve,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${tt()}<span>Bloom++</span>`,t.addEventListener("pointerdown",Rt),t.addEventListener("pointerup",Rt),t.addEventListener("click",n=>{Rt(n),_t()}),e.insertBefore(t,e.firstChild)}function Ke(){let e=Dn();return e?(Jn(e),!0):!1}function _r(e){_n(e)&&(queueMicrotask(Ke),requestAnimationFrame(()=>{Ke()}),window.setTimeout(Ke,60),window.setTimeout(Ke,180))}function qr(){We?.abort();let e=new AbortController;We=e,document.addEventListener("click",_r,{signal:e.signal})}function Fr(){We?.abort(),We=null,D?.disconnect(),D=null,Ge=null}function Xn(){J(),Y(()=>{Mr(()=>{Vn(),Gn(),Ze(),_t()})})}var Zn=h({name:"Settings",description:"Bloom++ settings, pinned next to the account row.",authors:[L.p],required:!0,hidden:!0,enabledByDefault:!0,settings:Er,startAt:"HostShell",cleanupSelectors:[`#${vr}`,`#${j}`,`#${Ve}`,`#${$}`,`#${Ue}`,"#bloom-menu-panel"],start(){Vn(),Gn(),Nr(),qr(),$e?.(),$e=jn(Pt),Pt()},stop(){Dr(),Fr(),$e?.(),$e=null,Xe(),document.getElementById(j)?.remove(),document.getElementById(Ve)?.remove(),document.getElementById(Ue)?.remove(),ze=null,xr=null,Qe=null,et=null,ye=null,Ye=null,Je=null,I=null,Z=!1,Nt=!1},onSettingsChange:Pt});var to='form[data-type="unified-composer"], form.w-full[data-type]',Q=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),nt=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Qn=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),eo=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),jr=/stop streaming|stop generating|停止生成|停止输出|停止响应/;function y(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function K(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!y(r)))return r;return null}function no(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function T(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=no(e);return!!(jr.test(n)||/^stop$/i.test(n))}function B(){let t=Array.from(document.querySelectorAll(to)).find(y);if(t instanceof HTMLElement)return t;let n=K(document,Q),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function z(){let e=Array.from(document.querySelectorAll(Q));return e.find(y)??e[0]??null}function qt(){let e=z();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function $r(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function oo(e){let t=B();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!y(n))&&e(n))return n;return null}function ot(){let e=B(),t=K(e,nt)??K(document,nt);return t&&!T(t)?t:oo(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!T(n);let r=no(n);return/^(send|send prompt|发送)$/i.test(r)&&!T(n)})}function Ft(){let e=ot();return!!e&&$r(e)}function jt(){let e=B(),t=K(e,Qn,!0)??K(document,Qn,!0);if(t)return t;let n=K(e,eo)??K(document,eo);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&y(o)&&T(o))return o}return oo(T)}function ee(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}var $t=0;function ro(e){$t+=1;try{e()}finally{$t-=1}}function rt(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function te(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function io(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function Kr(e){let{head:t}=document;if(t)for(let n of Array.from(t.querySelectorAll("link")))n.id!==e&&rt(n)&&n.remove()}function zr(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Kt(e,t){let{head:n}=document;!n||!t||ro(()=>{Kr(e);let o=io(e),{type:r,sizes:i}=zr(t);o?n.lastElementChild!==o&&n.appendChild(o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function ao(e,t){let{head:n}=document;n&&ro(()=>{io(e)?.remove();let o=Array.from(n.querySelectorAll("link")).filter(rt);if(o.length){te(t)&&o[0].href!==t&&(o[0].href=t);return}if(!te(t))return;let r=document.createElement("link");r.rel="icon",r.href=t,n.appendChild(r)})}function so(e,t){let{head:n}=document;if(!n)return null;let o=new MutationObserver(r=>{if(!$t)for(let i of r){if(i.type==="attributes"&&rt(i.target)){t(i.target.id===e?void 0:i.target.href);return}for(let a of i.addedNodes)if(rt(a)&&a.id!==e){t(a.href);return}}});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}function it(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=g=>{let u=n.indexOf(g);return u>=0&&n[u+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(g,u)=>{try{return document.querySelector(g)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function at(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function Gr(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!y(t))&&(T(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function Vr(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&y(e))}function Ur(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&y(e))}function Wr(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function zt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function st(){if(jt()||Gr())return!0;let e=ot();return e&&y(e)&&!T(e)?!1:!!(Vr()||Ur()||Wr())}var Yr=["original","badge","dot","hole","bg"],uo=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge",default:!0},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],mo={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},lt="#FCFCFC",Jr="#111111",lo="#111111",Xr="#ffffff",Zr="#212121",Qr="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",ei={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},ct=32,co=64;function fo(e){return typeof e=="string"&&Yr.includes(e)}function ti(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function ut(e){let t=document.createElement("canvas");t.width=ct,t.height=ct;let n=t.getContext("2d");return n?(n.scale(ct/co,ct/co),e(n),t.toDataURL("image/png")):""}function ni(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function dt(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(Qr);n&&(e.strokeStyle=Jr,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function oi(e,t,n){let o=mo[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=lo,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=lo,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=Xr,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function Ee(e,t){if(e==="original")return t==="wait"?ut(o=>dt(o,lt)):ti(ei[t]);let n=t==="wait"?void 0:mo[t];return ut(e==="hole"?o=>dt(o,n??lt):e==="bg"?o=>{o.fillStyle=n??Zr,ni(o,0,0,64,64,14),o.fill(),dt(o,lt,!1)}:o=>{dt(o,lt),t!=="wait"&&oi(o,t,e==="dot"?"dot":"badge")})}function po(e){return{wait:Ee(e,"wait"),rotate:Ee(e,"rotate"),done:Ee(e,"done"),ready:Ee(e,"ready"),error:Ee(e,"error")}}var ri=new p("ChatStateFavicons"),oe="bloom-chat-state-favicon",yo=S({style:{type:3,description:"Favicon overlay",options:uo}}),re="",Vt={wait:"",rotate:"",done:"",ready:"",error:""},Ut="wait",Se=!1,R=!1,v=null,we="",Le="",Ce=!0,xe=null,ie=0,ne,mt=null,G=null,Gt=null,Te=!1,go=new WeakSet,ii=400;function ai(){let e=yo.store.style;return fo(e)?e:"badge"}function si(){let t=document.querySelector(`link[rel~="icon"]:not(#${oe})`)?.href;return te(t)?t:te(re)?re:""}function E(e){Ut=e,Kt(oe,Vt[e])}function bo(){Vt=po(ai()),E(Ut)}function li(){let e=it(),t=e?at(e):at("");return st()?(!we&&t&&(we=t),we||t):(we="",t)}function vo(){Se=!1,R=!1,v=null,we=""}function ci(e){Le=e,vo(),Ce=!1,E("wait")}function Eo(){if(!Te)return;let e=it()||location.pathname;if(Le&&e&&Le!==e){ci(e);return}e&&(Le=e);let t=li(),n=st(),o=qt(),r=Ft();if(zt()&&!n){E("error"),Se=!1,R=!1,v=null;return}if(n){Se=!0,R=!1,v=t,E("rotate");return}if(Se){let i=!!v&&!!t&&v===t;if(Se=!1,i){R=!0,v=t,E("done");return}R=!1,v=null}if(R)if(!!(v&&t&&v!==t))R=!1,v=null;else if(o){E("done");return}else if(Ce){R=!1,E("ready");return}else{R=!1,E("wait");return}v=null,E(o?"wait":Ce?"ready":"wait")}function xo(){let e=B();if(!(G&&Gt===e&&e.isConnected)){if(G?.disconnect(),Gt=e,!e||e===document.body){G=null;return}G=new MutationObserver(()=>ft()),G.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid","class"]})}}function ft(){!Te||ie||(ie=requestAnimationFrame(()=>{ie=0,Te&&(So(),xo(),Eo())}))}function ho(){Ce=!0,ft()}function So(){let e=z();!e||go.has(e)||(go.add(e),e.addEventListener("input",ho,{passive:!0}),e.addEventListener("compositionend",ho,{passive:!0}))}var wo=h({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[L.p],tags:["chat","ui"],enabledByDefault:!0,settings:yo,startAt:"DOMContentLoaded",cleanupSelectors:[`#${oe}`],start(){Te=!0,re=si()||re,bo(),mt?.disconnect(),mt=so(oe,e=>{te(e)&&(re=e),Kt(oe,Vt[Ut])}),xe?.abort(),xe=new AbortController,window.addEventListener("popstate",ft,{signal:xe.signal}),So(),xo(),ne!==void 0&&clearInterval(ne),ne=setInterval(ft,ii),Eo(),ri.debug("favicon watch started")},stop(){Te=!1,ie&&cancelAnimationFrame(ie),ie=0,ne!==void 0&&(clearInterval(ne),ne=void 0),xe?.abort(),xe=null,G?.disconnect(),G=null,Gt=null,mt?.disconnect(),mt=null,vo(),Le="",Ce=!0,ao(oe,re)},onSettingsChange:bo});var Lo=`.bloom-ih-hud {
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
`;var Co=new p("InputHistory"),Wt=/\u200B/g,To=10,Mo=500,ko=100,di=8,mi=120,fi=2e3,pt=10,gt=S({maxEntries:{type:4,description:"Max stored prompts",min:To,max:Mo,default:ko},history:{type:5,description:"Stored prompts",render:ki},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Yt=new Map,f=0,Jt="",M=!1,ke=!1,Qt=0,Me=null,Xt,en=null,Ao=!0;function x(){let e=gt.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Po(e){let t=gn(Number(gt.store.maxEntries??ko),To,Mo);return e.length>t?e.slice(e.length-t):e}function bt(e){gt.store.entries=Po(e)}function pi(e){return e.replaceAll(Wt,"").replace(/\n$/,"").trim()}function Zt(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(Q);return n instanceof HTMLElement?n:z()}function gi(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!ee(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(Wt,"").trim().length===0,last:i.toString().replaceAll(Wt,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Io(e,t){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch(i){Co.debug("pm caret failed:",i)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function Ro(e){clearTimeout(Xt),Xt=setTimeout(()=>{if(e!==Qt)return;ke=!1;let t=en;t&&Io(t,Ao)},mi)}function Ho(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),ke=!0,en=e,Ao=n;let i=++Qt;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(a){Co.debug("insertText failed:",a),e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),Io(e,n),Ro(i)}function bi(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function ae(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function hi(){document.querySelector(".bloom-ih-hud")?.remove()}function yi(e,t){let n=bi();n.textContent=e;let o=(t.closest("form")??B()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-di)}px`,n.classList.add("bloom-ih-hud-on")}function tn(e){let t=pi(e);if(!t)return;let n=Date.now(),o=Yt.get(t);if(o&&n-o<fi)return;Yt.set(t,n);let r=x().filter(i=>i!==t);r.push(t),bt(r),f=x().length,M=!1,ae()}function vi(e,t){let n=x();if(!n.length&&e)return;f>=n.length&&(Jt=ee(t),f=n.length);let o=e?f-1:f+1;o<0||o>n.length||(f=o,M=!0,Ho(t,o===n.length?Jt:n[o],e),o<n.length?yi(`${o+1} / ${n.length}`,t):ae())}function Ei(e){M=!1,ae(),Ho(e,Jt,!1),f=x().length}function xi(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=Zt(e.target)??Zt(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&M&&!e.altKey&&!e.shiftKey){Ei(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){tn(ee(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=x();if(!o){let i=gi(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||f<=0)||!n&&f>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),vi(n,t))}function Si(e){if(Zt(e.target)){if(ke){Ro(Qt);return}M&&(M=!1,ae(),f=x().length)}}function wi(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(Q);n instanceof HTMLElement&&tn(ee(n))}function Li(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(nt);if(!n||!(n instanceof HTMLElement)||T(n))return;let o=z();o&&tn(ee(o))}function Ci(e){if(!(!M||ke)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}M=!1,ae()}}function Ti(){if(Me)return;Me=new AbortController;let{signal:e}=Me,t={capture:!0,signal:e};window.addEventListener("keydown",xi,t),window.addEventListener("input",Si,t),window.addEventListener("submit",wi,t),window.addEventListener("click",Li,t),window.addEventListener("pointerdown",Ci,t)}function Mi(e){let t=x().slice();t.splice(e,1),bt(t),f>t.length&&(f=t.length)}function ki(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=x().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(m=>m.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/pt));n>=l&&(n=l-1);let g=s.slice(n*pt,n*pt+pt);e.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=t,u.addEventListener("input",()=>{t=u.value,n=0,r()}),e.appendChild(u),g.length){let m=document.createElement("div");m.className="bloom-ih-list",g.forEach((_,ht)=>{let Vo=i.indexOf(_),Uo=x().length-1-Vo,yt=document.createElement("div");yt.className="bloom-ih-item";let se=document.createElement("button");se.type="button",se.className=`bloom-ih-body${o===ht?"":" bloom-ih-clamp"}`,se.textContent=_,se.addEventListener("click",()=>{o=o===ht?-1:ht,r()});let vt=document.createElement("div");vt.className="bloom-ih-actions";let le=document.createElement("button");le.type="button",le.title="Copy",le.textContent="C",le.addEventListener("click",()=>{hn(_)});let ce=document.createElement("button");ce.type="button",ce.title="Delete",ce.textContent="\xD7",ce.addEventListener("click",()=>{Mi(Uo),r()}),vt.append(le,ce),yt.append(se,vt),m.appendChild(yt)}),e.appendChild(m)}else{let m=document.createElement("p");m.className="bloom-ih-empty",m.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(m)}let b=document.createElement("div");b.className="bloom-ih-pager";let d=document.createElement("button");d.type="button",d.className="bloom-ih-btn",d.textContent="Prev",d.disabled=n<=0,d.addEventListener("click",()=>{n-=1,r()});let V=document.createElement("span");V.textContent=`${n+1} / ${l}`;let k=document.createElement("button");k.type="button",k.className="bloom-ih-btn",k.textContent="Next",k.disabled=n+1>=l,k.addEventListener("click",()=>{n+=1,r()});let A=document.createElement("button");A.type="button",A.className="bloom-ih-clear",A.textContent="Clear all",A.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(bt([]),f=0,r())}),b.append(d,V,k,A),e.appendChild(b)};return r(),()=>{e.replaceChildren()}}var Oo=h({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[L.p],tags:["chat"],enabledByDefault:!0,settings:gt,startAt:"HostReady",managedStyle:"inputHistory",start(){O("inputHistory",Lo),f=x().length,M=!1,Ti()},stop(){Me?.abort(),Me=null,ae(),hi(),Yt.clear(),clearTimeout(Xt),ke=!1,en=null,M=!1},onSettingsChange(){let e=x(),t=Po(e);t.length!==e.length&&bt(t),f>t.length&&(f=t.length)}});var nn="noShareLink",Ai=['button[data-testid="share-chat-button"]'],Pi=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],on=S({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function No(e){return`${e.join(",")}{display:none!important}`}function Do(){let e=[];if(on.store.hideShareChat!==!1&&e.push(No(Ai)),on.store.hideShareProject!==!1&&e.push(No(Pi)),!e.length){q(nn);return}O(nn,e.join(`
`))}var Bo=h({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[L.p],tags:["ui","privacy"],enabledByDefault:!1,startAt:"HostReady",settings:on,start:Do,onSettingsChange:Do,stop(){q(nn)}});var Fo="noDictation",Ii=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]'],Ri=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],jo=S({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function _o(e){return`${e.join(",")}{display:none!important}`}function qo(){let e=[_o(Ii)];jo.store.hideDictationSettings!==!1&&e.push(_o(Ri)),O(Fo,e.join(`
`))}var $o=h({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[L.p],tags:["chat","ui"],enabledByDefault:!1,startAt:"HostReady",settings:jo,start:qo,onSettingsChange:qo,stop(){q(Fo)}});var Ae=new p("Bloom"),Ko=!1,Hi=Date.now(),Oi=[Zn,wo,Oo,Bo,$o];function rn(e){return new Promise(t=>setTimeout(t,e))}function Ni(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var Di=8e3,zo=300,Bi=250;async function _i(){if(F())return await rn(zo),!0;for(;Date.now()-Hi<Di;)if(await rn(Bi),F())return await rn(zo),!0;return F()||Lt()}function qi(){try{GM_registerMenuCommand?.("Bloom++ settings",Xn)}catch{}}function Fi(){Y(()=>{pe("HostShell"),Ae.info("host shell",P)}),_e(()=>{Ae.info("idle ready",P)}),qe(()=>{cn(),pe("HostReady"),Ae.info("chrome ready",P)})}async function an(){await yn()}async function sn(){if(Ko)return;Ko=!0;for(let n of Oi)try{Sn(n)}catch(o){Ae.error("register failed",n.name,o)}Cn(),pe("Init"),qi(),Fi();let e=()=>pe("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await Ni(),!await _i()){Ae.warn("late islands not detected; starting default plugins",P),J(),Fe();return}await In()}var Go=typeof unsafeWindow<"u"?unsafeWindow:window;if(window===window.top){let e=Go.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",P);try{Object.defineProperty(Go,"Bloom",{value:ln,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}an().then(()=>sn()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
