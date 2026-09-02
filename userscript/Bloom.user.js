// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260902] v1.4.10
// @description  Void++-style plugin host for chatgpt.com. Tab favicon, input history, recent chats, hide Share, Dictation, and sidebar name.
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

/* Bloom++ [20260902] v1.4.10. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var gi=Object.defineProperty;var bi=(e,t)=>{for(var n in t)gi(e,n,{get:t[n],enumerable:!0})};var io={};bi(io,{REPO_URL:()=>Bo,Settings:()=>d,VERSION:()=>k,hasLateIslands:()=>re,init:()=>ro,initSettings:()=>oo,isDocumentInteractive:()=>Oo,plugins:()=>N,requestChromeReady:()=>xt,requestIdleReady:()=>pe,requestShellReady:()=>vt,whenChromeReady:()=>yt,whenIdleReady:()=>ht,whenShellReady:()=>bt});var U=new Map,st=!1;function hi(){return document.getElementById("bloom-root")?.shadowRoot??null}function yi(){return document.head??null}function me(){let e=hi();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=vi()}function an(e,t){if(!st)return;let n=yi();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),me();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,me();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,me()}function C(e,t){let n=U.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},U.set(e,n)),st&&an(e,n)}function ao(){st=!0;for(let[e,t]of U)an(e,t);return me(),!0}function so(e){let t=U.get(e);t&&(t.disabled=!1,st&&an(e,t))}function lo(e){let t=U.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),me())}function I(e){let t=U.get(e);t&&(t.el?.remove(),U.delete(e),me())}function vi(){return Array.from(U.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var y=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function E(e){return e}var sn=new Map;function lt(e,t){let n=sn.get(e);return n||(n=new Set,sn.set(e,n)),n.add(t),()=>n.delete(t)}function ne(e,t){let n=sn.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var xi="bloompp";function co(){return new Promise((e,t)=>{let n=indexedDB.open(xi,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function uo(e){try{let t=await co();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function mo(e,t){try{let n=await co();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function He(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function fo(e,t,n){return Math.min(n,Math.max(t,e))}function po(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function go(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}var ct=new y("SettingsStore"),W="BloomSettings",Ei=100;function dt(e){if(He(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(He(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return He(n)?n:null}return null}catch{return null}}var ut=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[u,c]of this.defaultGetters)if(l.startsWith(u)){let b=l.slice(u.length+1);if(b&&!b.includes(".")){let p=c(b);p!==void 0&&(i[a]=p,s=p);break}}}return He(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){ct.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Ei))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(W,this.plain)}catch{try{GM_setValue(W,t)}catch(n){ct.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(W,t)}catch{}mo(W,t).catch(n=>ct.warn("Failed to save settings to IndexedDB:",n))}catch(t){ct.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){po(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var Si=new y("Settings"),wi={plugins:{}},d=new ut(structuredClone(wi)),Li=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function Ci(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function S(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(d.store.plugins[n]||(d.store.plugins[n]={}),d.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?d.plain.plugins[n]??{}:{}}};return t}function Ti(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function bo(){let e=null;if(e=dt(Ti(W)),e||(e=dt(await uo(W))),!e)try{e=dt(localStorage.getItem(W))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(d.plain.plugins=t),Si.debug("Loaded settings")}}function ho(e,t){t&&(t.pluginName=e,d.plain.plugins[e]||(d.plain.plugins[e]={}),d.setDefaultGetter(Li(e),n=>{if(n!=="enabled")return Ci(t.def,n)}))}function yo(){return d.plain.plugins.Settings||(d.store.plugins.Settings={}),d.store.plugins.Settings}function mt(){return yo().pinnedPlugins??[]}function vo(e){return mt().includes(e)}function xo(e){let t=mt(),n=t.includes(e);return d.store.plugins.Settings={...d.plain.plugins.Settings,pinnedPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}function ft(){return yo().starredPlugins??[]}function Eo(e){return ft().includes(e)}function So(e){let t=ft(),n=t.includes(e);return d.store.plugins.Settings={...d.plain.plugins.Settings,starredPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}var pt=new y("PluginManager"),N={},Re=new Set;function Co(e){if(N[e.name]){pt.warn("Duplicate plugin",e.name);return}N[e.name]=e,ho(e.name,e.settings)}function fe(e){let t=N[e];if(!t)return!1;if(t.required)return!0;let n=d.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function To(e){let t=N[e];if(!t||t.required)return;let n=!fe(e);d.plain.plugins[e]||(d.store.plugins[e]={}),d.store.plugins[e].enabled=n,n?ko(t):ki(t),ne("pluginToggle",{name:e,enabled:n})}function ko(e,t=!1){if(!Re.has(e.name)&&fe(e.name))try{e.managedStyle&&so(e.managedStyle),e.start?.(),Re.add(e.name),e.settings&&d.addPrefixChangeListener(`plugins.${e.name}.`,()=>{Re.has(e.name)&&e.onSettingsChange?.()}),t||pt.debug("Started",e.name)}catch(n){pt.error("Failed to start",e.name,n)}}function ki(e){if(Re.has(e.name)){try{e.stop?.()}catch(t){pt.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(lo(e.managedStyle),I(e.managedStyle)),Re.delete(e.name)}}function Ie(e){for(let t of Object.values(N))(t.startAt??"DOMContentLoaded")===e&&ko(t)}var wo=2,Lo="defaultsRev";function Mo(){for(let t of Object.values(N))d.plain.plugins[t.name]||(d.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=d.store.plugins.Settings??(d.store.plugins.Settings={});if(e[Lo]!==wo){for(let t of["NoShareLink","NoDictation"]){let n=d.store.plugins[t]??(d.store.plugins[t]={});n.enabled=!1}e[Lo]=wo}}var Ne=!1,gt=!1,ln=!1,Ao=[],Ho=[],Ro=[];function cn(e){let t=e.splice(0);for(let n of t)n()}function Be(){Ne||(Ne=!0,cn(Ao))}function un(){gt||(gt=!0,Ne||Be(),cn(Ho))}function Io(){ln||(ln=!0,Ne||Be(),gt||un(),cn(Ro))}function bt(e){Ne?e():Ao.push(e)}function ht(e){gt?e():Ho.push(e)}function yt(e){ln?e():Ro.push(e)}function vt(){Be()}function pe(){Be(),un()}function xt(){Io()}function Po(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function No(){await Po(4e3),Be(),await Po(4e3),un(),Io()}var w={p:"0-V-linuxdo"},k="[20260902] v1.4.10",Bo="https://github.com/0-V-linuxdo/Bloom";function Mi(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Pi(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function dn(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function re(){return dn()?Mi()||Pi():!1}function Oo(){return re()}var Ai=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Do=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Hi=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Ri="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function be(e){return e.id==="bloom-root"||!!e.closest(Ri)}function _o(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function Et(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function mn(e){if(!(e instanceof HTMLElement)||!e.isConnected||be(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&Et(t)?!1:e.getClientRects().length>0}function ge(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Ii(){let e=[];for(let t of document.querySelectorAll(Ai))!(t instanceof HTMLElement)||!t.isConnected||be(t)||e.push(t);return e}function St(e){if(!e.isConnected||be(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function Oe(){return Ii().filter(St)[0]??null}function fn(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||be(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function pn(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!be(n)&&!ge(n)&&n.parentElement&&!ge(n.parentElement)&&(t=n);let o=t.parentElement;if(o&&!ge(o)&&!be(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!ge(o.parentElement))return o}return t}function jo(){let e=document.querySelectorAll(Do);for(let n of e)if(mn(n)&&!Et(n)&&_o(n))return n;let t=document.querySelectorAll(Hi);for(let n of t){if(!mn(n)||!_o(n)||Et(n))continue;let o=n.querySelector(Do);return mn(o)&&!Et(o)?o:n}return null}function qo(){let e=Oe();if(e){let t=pn(e),n=t.parentElement;if(n&&!ge(n))return n;if(!ge(t))return t}return fn()}function Fo(e){let t=Oe();return t?e.composedPath().includes(t):!1}var bn=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary"],Ni={light:{"--main-surface-primary":"#ffffff","--main-surface-secondary":"#f4f4f4","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#f9f9f9","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#b4b4b4","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.1)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.2)","--link":"#0d0d0d","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#f4f4f4","--bg-primary":"#ffffff","--bg-secondary":"#f4f4f4"},dark:{"--main-surface-primary":"#212121","--main-surface-secondary":"#2f2f2f","--main-surface-tertiary":"#424242","--sidebar-surface-primary":"#171717","--text-primary":"#ececec","--text-secondary":"#b4b4b4","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ececec","--icon-secondary":"#b4b4b4","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.1)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.2)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.06)","--interactive-label-primary-default":"#ececec","--message-surface":"#2f2f2f","--bg-primary":"#212121","--bg-secondary":"#2f2f2f"}};function Bi(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Oi(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function gn(e){let t=Bi(e);return t?Oi(t)>.55?"light":"dark":null}function Di(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=gn(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=gn(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=gn(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function $o(e){return e==="auto"?Di():e}function _i(e){try{let t=getComputedStyle(document.documentElement);for(let n of bn){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function zo(e,t,n){let o=Ni[t];if(n){_i(e);for(let r of bn)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of bn)e.style.setProperty(r,o[r])}function Ko(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var hn=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover. */

.bloom-rail-item,
.bloom-account-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin: 0;
  padding: 8px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--text-primary, inherit);
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.25;
  cursor: pointer;
  text-align: left;
  box-sizing: border-box;
  min-width: 0;
}

.bloom-rail-item {
  flex: 0 0 auto;
  z-index: 2;
  background: var(--sidebar-surface-primary, var(--main-surface-primary, transparent));
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
  width: 20px;
  height: 20px;
  flex: 0 0 auto;
  color: var(--icon-primary, currentColor);
}

.bloom-rail-mark {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  flex: 0 0 auto;
  border-radius: 999px;
}

.bloom-rail-mark svg {
  width: 20px;
  height: 20px;
}

.bloom-rail-item > span,
.bloom-account-item > span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bloom-rail-item.bloom-rail-compact {
  width: auto;
  padding: 8px;
  justify-content: center;
}

.bloom-rail-item.bloom-rail-compact > span:not(.bloom-rail-mark) {
  display: none;
}

.bloom-rail-item.bloom-rail-compact .bloom-rail-mark {
  width: 24px;
  height: 24px;
}

#bloom-sidebar-panel {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: min(56rem, calc(100vw - 2rem));
  max-height: min(80vh, 40rem);
  overflow: auto;
  overscroll-behavior: contain;
  margin: 0;
  padding: 1.5rem;
  border-radius: 16px;
  color: var(--text-primary, inherit);
  font: 14px/1.4 ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
  background: var(--main-surface-primary, #fff);
  border: 1px solid var(--border-light, rgba(0, 0, 0, 0.1));
}

#bloom-sidebar-panel.bloom-rail-dock {
  position: fixed;
  left: 50%;
  top: 50%;
  right: auto;
  bottom: auto;
  transform: translate(-50%, -50%);
  width: min(56rem, calc(100vw - 2rem));
  max-height: min(80vh, 40rem);
  margin: 0;
  z-index: 10000;
  pointer-events: auto;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.18);
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

.bloom-section-head {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  margin: 0 0 8px;
}

.bloom-section-head h3 {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary, inherit);
}

.bloom-section-head p {
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.25rem;
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

.bloom-plugin-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.125rem;
  margin: 0 0 10px;
  border-bottom: 1px solid var(--border-light, rgba(0, 0, 0, 0.1));
}

.bloom-plugin-tab {
  position: relative;
  margin: 0;
  padding: 0.375rem 0.625rem;
  border: 0;
  background: transparent;
  color: var(--text-secondary, #5d5d5d);
  font: inherit;
  font-size: 0.8125rem;
  cursor: pointer;
}

.bloom-plugin-tab-active {
  color: var(--text-primary, inherit);
}

.bloom-plugin-tab-active::after {
  content: "";
  position: absolute;
  inset-inline: 0.5rem;
  bottom: -1px;
  height: 2px;
  border-radius: 1px;
  background: var(--text-primary, inherit);
}

.bloom-search-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0 0 10px;
}

.bloom-search-input {
  flex: 1;
  min-width: 0;
  height: 32px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid var(--border-medium, rgba(0, 0, 0, 0.15));
  background: var(--main-surface-primary, #fff);
  color: inherit;
  font: inherit;
  font-size: 0.8125rem;
}

.bloom-search-input:focus {
  outline: 2px solid color-mix(in srgb, var(--text-accent, #10a37f) 40%, transparent);
  outline-offset: 1px;
}

.bloom-search-filter {
  width: 7.5rem;
  height: 32px;
  flex: 0 0 auto;
  border-radius: 8px;
  border: 1px solid var(--border-medium, rgba(0, 0, 0, 0.15));
  background: var(--main-surface-primary, #fff);
  color: inherit;
  font: inherit;
  font-size: 0.75rem;
  padding: 0 8px;
}

.bloom-tab-empty {
  margin: 0;
  padding: 2rem 0;
  text-align: center;
  font-size: 0.8125rem;
  color: var(--text-secondary, #5d5d5d);
}

.bloom-plugin-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

@media (max-width: 720px) {
  .bloom-plugin-list {
    grid-template-columns: 1fr;
  }
}

.bloom-plugin-card {
  display: flex;
  flex-direction: column;
  padding: 0;
  min-width: 0;
  overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid var(--border-light, rgba(0, 0, 0, 0.1));
  background: var(--main-surface-primary, #fff);
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
  min-width: 0;
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
  width: 14px;
  height: 14px;
  padding: 0;
  margin: 0;
  border: 0;
  border-radius: 0;
  color: var(--text-primary, inherit);
  background: transparent;
  line-height: 0;
}

.bloom-card-icon svg {
  width: 14px;
  height: 14px;
  display: block;
}

.bloom-card-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.875rem;
  font-weight: 500;
  min-width: 0;
}

.bloom-card-controls {
  display: flex;
  align-items: center;
  gap: 0.125rem;
  flex-shrink: 0;
}

.bloom-card-star,
.bloom-card-pin,
.bloom-card-settings {
  color: var(--text-tertiary, var(--text-secondary, #8e8e8e));
}

.bloom-card-star-active,
.bloom-card-pin-active {
  color: var(--text-primary, inherit);
}

.bloom-card-controls .bloom-icon-btn {
  width: 22px;
  height: 22px;
}

.bloom-card-controls .bloom-icon-btn svg {
  width: 14px;
  height: 14px;
}

.bloom-icon-btn.bloom-card-star,
.bloom-icon-btn.bloom-card-pin,
.bloom-icon-btn.bloom-card-settings {
  width: 22px;
  height: 22px;
}

.bloom-icon-btn.bloom-card-star svg,
.bloom-icon-btn.bloom-card-pin svg,
.bloom-icon-btn.bloom-card-settings svg {
  width: 14px;
  height: 14px;
}

.bloom-card-desc {
  font-size: 0.8125rem;
  color: var(--text-secondary, #5d5d5d);
  line-height: 1.5;
  margin-top: 0.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bloom-card-separator {
  height: 1px;
  background: var(--border-light, rgba(0, 0, 0, 0.1));
}

.bloom-card-footer {
  display: flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  gap: 0.375rem;
}

.bloom-card-author {
  font-size: 0.7rem;
  color: var(--text-tertiary, var(--text-secondary, #8e8e8e));
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  background: var(--text-accent, var(--interactive-label-primary-default, #10a37f));
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
  gap: 0.75rem;
}

.bloom-plugin-authors {
  margin: 0;
  font-size: 0.75rem;
  line-height: 1rem;
  color: var(--text-secondary, #5d5d5d);
}

.bloom-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 0;
  padding: 0;
}

.bloom-field-stack {
  flex-direction: column;
  align-items: stretch;
  gap: 0.375rem;
}

.bloom-field-label,
.bloom-field > span:first-child,
.bloom-field > summary {
  font-size: 0.8125rem;
  font-weight: 500;
  min-width: 0;
  flex: 1;
}

.bloom-field-block {
  display: block;
  padding-top: 2px;
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
  min-width: 7.5rem;
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
  flex: 1;
  min-width: 0;
  width: 100%;
  accent-color: var(--text-accent, var(--interactive-label-primary-default, #10a37f));
}

.bloom-field-slider {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.bloom-field-slider > span {
  min-width: 3ch;
  font-size: 0.75rem;
  color: var(--text-secondary, #5d5d5d);
  font-variant-numeric: tabular-nums;
  text-align: right;
  flex-shrink: 0;
}
`;var qi="bloom-root",ee="bloom-rail-item",kt="bloom-account-item",ye="bloom-sidebar-panel",Mt="bloom-settings-css",Fi=2e3,$i=S({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),Ct=null,zi=null,he=!1,Z=!1,Sn=[],wt=null,Pt=null,X=null,Tt=null,z=null,Fe=null,De,Bt=null,Ot=null,_e=null,At=null,Ht=null,B=null,je=null,Rt=null,Wo=null,qe=null,yn=[],Ki=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Vi=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],Dt="",$e="all",Q="all";function _t(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Vo(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Gi(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>'}function Ui(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function Wi(e){let t='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return e?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${t}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`}function Yi(e){let t='<path d="M12 17v5"/>';return e?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var Ji={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>'};function Xi(e){return e.icon||Ji[e.name]||_t()}function Zi(){return"auto"}function vn(){let e=Zi(),t=$o(e);Ct&&(Ct.setAttribute("data-bloom-scheme",t),zo(Ct,t,e==="auto")),ne("schemeChange",{scheme:t,pref:e})}function ze(e,t){e&&(e.hidden=t,e.toggleAttribute("inert",t),t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden"))}function Yo(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel").forEach(e=>e.remove())}function Jo(){if(C("settings",hn),document.getElementById(Mt)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=Mt,e.textContent=hn,document.head.appendChild(e)}function Qi(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Xo(){for(let e of Sn)e();Sn=[]}function Zo(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function ea(e){return!!e.settings&&Object.keys(e.settings.def).length>0}function ta(e,t,n){if(n.hidden)return null;if(n.type===5&&n.render){let a=document.createElement("details");a.className="bloom-field bloom-field-block";let s=document.createElement("summary");s.textContent=n.description||t;let l=document.createElement("div");return Sn.push(n.render(l)),a.append(s,l),a}let o=document.createElement("div");o.className=n.type===4?"bloom-field bloom-field-stack":"bloom-field";let r=document.createElement("span");r.className="bloom-field-label",r.textContent=n.description||t,o.appendChild(r);let i=d.store.plugins[e]??(d.store.plugins[e]={});if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??n.options.find(s=>s.default)?.value??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=Zo(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),o.appendChild(a),o}return o}function Ln(){he=!1,Xo(),B&&B.replaceChildren(),ze(Ot,!0),ze(Bt,!1)}function na(e){if(Xo(),he=!0,At&&(At.textContent=e.name),Ht&&(Ht.textContent=e.description),B){if(B.replaceChildren(),e.authors?.length){let t=document.createElement("p");t.className="bloom-plugin-authors",t.textContent=e.authors.join(", "),B.appendChild(t)}if(e.settings)for(let[t,n]of Object.entries(e.settings.def)){let o=ta(e.name,t,n);o&&B.appendChild(o)}if(!B.querySelector(".bloom-field, .bloom-dialog-empty")){let t=document.createElement("p");t.className="bloom-dialog-empty",t.textContent="No configurable settings.",B.appendChild(t)}}ze(Bt,!0),ze(Ot,!1)}function oa(e){let t=document.createElement("div");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Xi(e);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=e.name,a.title=e.name,r.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=Eo(e.name),u=document.createElement("button");if(u.type="button",u.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,u.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),u.innerHTML=Wi(l),u.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation();let f=So(e.name);ne("pluginStar",{name:e.name,starred:f})}),s.appendChild(u),!e.required){let m=vo(e.name),f=document.createElement("button");f.type="button",f.className=`bloom-icon-btn bloom-card-pin${m?" bloom-card-pin-active":""}`,f.setAttribute("aria-label",m?"Unpin from top":"Pin to top"),f.innerHTML=Yi(m),f.addEventListener("click",L=>{L.preventDefault(),L.stopPropagation();let q=xo(e.name);ne("pluginPin",{name:e.name,pinned:q})}),s.appendChild(f)}if(ea(e)){let m=document.createElement("button");m.type="button",m.className="bloom-icon-btn bloom-card-settings",m.setAttribute("aria-label",`${e.name} settings`),m.innerHTML=Ui(),m.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),na(e)}),s.appendChild(m)}let c=Zo(e.name,fe(e.name),!!e.required),b=c.querySelector("input");if(b?.addEventListener("click",m=>m.stopPropagation()),b?.addEventListener("change",()=>{To(e.name)}),s.appendChild(c),o.append(r,s),n.appendChild(o),e.description){let m=document.createElement("div");m.className="bloom-card-desc",m.textContent=e.description,n.appendChild(m)}let p=document.createElement("div");p.className="bloom-card-separator";let h=document.createElement("div");h.className="bloom-card-footer";let g=document.createElement("div");return g.className="bloom-card-author",g.textContent=e.authors?.filter(Boolean).join(", ")||"\xA0",h.appendChild(g),t.append(n,p,h),t}function Qo(){return Object.values(N).filter(e=>!e.hidden&&e.name!=="Settings")}function er(e,t){return t==="all"||t==="favorites"?!0:(e.tags??[]).includes(t)}function ra(e){return`${e.name} ${e.description??""} ${(e.tags??[]).join(" ")}`.toLowerCase()}function ia(){return Dt.trim()?"No plugins match your search.":Q==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function aa(){let e=Qo();return Vi.filter(t=>t.id==="favorites"||t.id==="all"?!0:e.some(n=>er(n,t.id)))}function sa(){if(qe){qe.replaceChildren();for(let e of aa()){let t=document.createElement("button");t.type="button",t.className=`bloom-plugin-tab${Q===e.id?" bloom-plugin-tab-active":""}`,t.textContent=e.label,t.addEventListener("click",()=>{Q=e.id,ie()}),qe.appendChild(t)}}}function la(){let e=Qo();if(Q==="favorites"){let t=new Set(ft());e=e.filter(n=>t.has(n.name))}else Q!=="all"&&(e=e.filter(t=>er(t,Q)));return $e==="enabled"&&(e=e.filter(t=>fe(t.name))),$e==="disabled"&&(e=e.filter(t=>!fe(t.name))),e}function ie(){if(!_e)return;sa();let e=la();Rt&&(Rt.placeholder=`Search ${e.length} plugins...`);let t=e,n=Dt.trim().toLowerCase();if(n&&(t=t.filter(o=>ra(o).includes(n))),Q!=="favorites"){let o=mt();if(o.length){let r=new Map(o.map((i,a)=>[i,a]));t=t.slice().sort((i,a)=>{let s=r.has(i.name),l=r.has(a.name);return s!==l?s?-1:1:s?(r.get(i.name)??0)-(r.get(a.name)??0):i.name.localeCompare(a.name)})}}_e.replaceChildren();for(let o of t)_e.appendChild(oa(o));je&&(je.hidden=t.length>0,je.textContent=ia())}function xn(e){e.stopPropagation()}function En(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function Cn(){document.getElementById(ee)?.setAttribute("aria-expanded",Z?"true":"false")}function ca(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function It(){Ln(),Dt="",$e="all",Q="all",document.getElementById(ye)?.remove(),Z=!1,Cn()}function ua(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",xn),t.addEventListener("pointerup",xn),t.addEventListener("click",xn);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=_t();let a=document.createElement("h2");a.textContent="Bloom++",r.append(i,a);let s=document.createElement("button");s.type="button",s.className="bloom-icon-btn",s.setAttribute("aria-label","Close"),s.innerHTML=Vo(),s.addEventListener("click",It),o.append(r,s),n.appendChild(o);let l=document.createElement("div");l.className="bloom-section-head";let u=document.createElement("h3");u.textContent="Plugins";let c=document.createElement("p");c.textContent="Turn Bloom++ features on or off. Sliders icon opens options.",l.append(u,c),n.appendChild(l);let b=document.createElement("div");b.className="bloom-plugin-tabs",n.appendChild(b);let p=document.createElement("div");p.className="bloom-search-bar";let h=document.createElement("input");h.type="search",h.className="bloom-search-input",h.setAttribute("aria-label","Search plugins"),h.placeholder="Search plugins...",h.addEventListener("input",()=>{Dt=h.value,ie()});let g=document.createElement("select");g.className="bloom-search-filter",g.setAttribute("aria-label","Filter plugins");for(let G of Ki){let rn=document.createElement("option");rn.value=G.value,rn.textContent=G.label,g.appendChild(rn)}g.value=$e,g.addEventListener("change",()=>{$e=g.value,ie()}),p.append(h,g),n.appendChild(p);let m=document.createElement("div");m.className="bloom-plugin-list",n.appendChild(m);let f=document.createElement("p");f.className="bloom-tab-empty",f.hidden=!0,n.appendChild(f);let L=document.createElement("div");L.className="bloom-settings-plugin",ze(L,!0);let q=document.createElement("div");q.className="bloom-settings-head";let V=document.createElement("button");V.type="button",V.className="bloom-icon-btn",V.setAttribute("aria-label","Back"),V.innerHTML=Gi(),V.addEventListener("click",Ln);let Ae=document.createElement("div");Ae.className="bloom-dialog-titles";let de=document.createElement("h2"),F=document.createElement("p");F.className="bloom-settings-sub",Ae.append(de,F);let R=document.createElement("button");R.type="button",R.className="bloom-icon-btn",R.setAttribute("aria-label","Close"),R.innerHTML=Vo(),R.addEventListener("click",It),q.append(V,Ae,R);let $=document.createElement("div");return $.className="bloom-plugin-settings",L.append(q,$),t.append(n,L),Bt=n,Ot=L,_e=m,At=de,Ht=F,B=$,je=f,Rt=h,Wo=g,qe=b,ie(),t}function da(e){e.classList.add("bloom-rail-dock")}function ma(){let e=document.getElementById(ee);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&St(e)?e:null}function fa(){if(document.getElementById(ye)?.remove(),!document.body)return;let e=ua(ye);da(e),document.body.appendChild(e),Z=!0,Ln(),Cn(),ne("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:k,dock:"center",rail:!!ma()})}function Tn(){let e=document.getElementById(ye);if(e instanceof HTMLElement&&e.isConnected&&ca(e)){It();return}e?.remove(),fa()}function pa(){let e=document.createElement("button");return e.type="button",e.id=ee,e.className="bloom-rail-item",e.setAttribute("aria-controls",ye),e.setAttribute("aria-expanded",Z?"true":"false"),e.innerHTML=`<span class="bloom-rail-mark">${_t()}</span><span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),Tn()}),e}function Go(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function ga(e){let t=e.querySelector("img");if(t instanceof HTMLElement){let n=t.getBoundingClientRect();if(n.width>8&&n.height>8)return t}for(let n of e.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}return null}function ba(e,t){for(let n of e.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||t&&(n===t||n.contains(t)||t.contains(n))||(n.textContent||"").trim().length<2)continue;let r=n.getBoundingClientRect();if(r.width>16&&r.height>8&&r.height<40)return n}return null}function J(e,t,n){let o=`${n}px`;e.style.getPropertyValue(t)!==o&&e.style.setProperty(t,o)}function tr(e,t){if(e.classList.contains("bloom-rail-compact"))return;let n=e.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!e.isConnected||!t.isConnected)return;let o=ga(t),r=getComputedStyle(t),i=Number.parseFloat(r.paddingTop),a=Number.parseFloat(r.paddingBottom);if(Number.isFinite(i)&&J(e,"padding-top",Math.round(i)),Number.isFinite(a)&&J(e,"padding-bottom",Math.round(a)),o){let s=o.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));J(n,"width",l),J(n,"height",Math.max(20,Math.round(s.height)));let u=e.getBoundingClientRect(),c=Math.round(s.left-u.left);c>=0&&c<=40&&J(e,"padding-left",c);let b=ba(t,o);if(b){let p=b.getBoundingClientRect(),h=n.getBoundingClientRect(),g=Math.round(p.left-h.right);g>=0&&g<=24&&J(e,"gap",g)}}else{let s=Number.parseFloat(r.paddingLeft),l=Number.parseFloat(r.columnGap||r.gap);Number.isFinite(s)&&J(e,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&J(e,"gap",Math.round(l))}}function Uo(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function ha(){if(Fe?.isConnected&&z){z.observe(Fe,{childList:!0});return}wn()}function Nt(){if(document.body){z?.disconnect();try{let e=document.getElementById(ee),t=e instanceof HTMLButtonElement?e:pa(),n=Oe(),o=fn();if(n){let r=pn(n),i=r.parentElement;if(Uo(r)||i&&Uo(i))return;t.isConnected&&t.nextElementSibling===r||r.before(t),Go(t),tr(t,n)}else o?(t.parentElement!==o&&o.appendChild(t),Go(t,!0)):t.isConnected&&!St(t)&&t.remove()}finally{ha(),Cn()}}}function wn(){let e=qo();e&&(Fe===e&&z||(z?.disconnect(),Fe=e,z=new MutationObserver(()=>{document.getElementById(ee)?.isConnected||Nt()}),z.observe(e,{childList:!0})))}function ya(){Nt(),wn(),De===void 0&&(De=window.setInterval(()=>{let e=document.getElementById(ee);if(!(e instanceof HTMLElement)||!e.isConnected)Nt();else{let t=Oe();t&&tr(e,t)}wn()},Fi))}function va(){De!==void 0&&(clearInterval(De),De=void 0),z?.disconnect(),z=null,Fe=null}function xa(e){Tt===e&&X||(X?.disconnect(),Tt=e,X=new MutationObserver(()=>{if(!e.isConnected){X?.disconnect(),X=null,Tt=null;return}nr(e)}),X.observe(e,{childList:!0}))}function nr(e){if(xa(e),e.querySelector(`#${kt}`))return;let t=document.createElement("button");t.type="button",t.id=kt,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${_t()}<span>Bloom++</span>`,t.addEventListener("pointerdown",En),t.addEventListener("pointerup",En),t.addEventListener("click",n=>{En(n),Tn()}),e.insertBefore(t,e.firstChild)}function Lt(){let e=jo();return e?(nr(e),!0):!1}function Ea(e){Fo(e)&&(queueMicrotask(Lt),requestAnimationFrame(()=>{Lt()}),window.setTimeout(Lt,60),window.setTimeout(Lt,180))}function Sa(){Pt?.abort();let e=new AbortController;Pt=e,document.addEventListener("click",Ea,{signal:e.signal})}function wa(){Pt?.abort(),Pt=null,X?.disconnect(),X=null,Tt=null}function or(){pe(),Qi(()=>{Jo(),Yo(),Nt(),Tn()})}var rr=E({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[w.p],required:!0,hidden:!0,enabledByDefault:!0,settings:$i,startAt:"HostReady",cleanupSelectors:[`#${qi}`,`#${ee}`,`#${kt}`,`#${ye}`,`#${Mt}`,"#bloom-menu-panel"],start(){Jo(),Yo(),ya(),Sa(),wt?.(),wt=Ko(vn),vn(),yn=[lt("pluginToggle",()=>{Z&&!he&&ie()}),lt("pluginPin",()=>{Z&&!he&&ie()}),lt("pluginStar",()=>{Z&&!he&&ie()})]},stop(){va(),wa(),wt?.(),wt=null;for(let e of yn)e();yn=[],It(),document.getElementById(ee)?.remove(),document.getElementById(kt)?.remove(),document.getElementById(Mt)?.remove(),Ct=null,zi=null,Bt=null,Ot=null,_e=null,At=null,Ht=null,B=null,je=null,Rt=null,Wo=null,qe=null,Z=!1,he=!1},onSettingsChange:vn});var sr='form[data-type="unified-composer"], form.w-full[data-type]',ve=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),jt=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),ir=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),ar=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),La=/stop streaming|stop generating|停止生成|停止输出|停止响应/;function M(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function ae(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!M(r)))return r;return null}function lr(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function O(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=lr(e);return!!(La.test(n)||/^stop$/i.test(n))}function te(){let t=Array.from(document.querySelectorAll(sr)).find(M);if(t instanceof HTMLElement)return t;let n=ae(document,ve),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function se(){let e=Array.from(document.querySelectorAll(ve));return e.find(M)??e[0]??null}function kn(){let e=se();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function Ca(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function cr(e){let t=te();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!M(n))&&e(n))return n;return null}function qt(){let e=te(),t=ae(e,jt)??ae(document,jt);return t&&!O(t)?t:cr(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!O(n);let r=lr(n);return/^(send|send prompt|发送)$/i.test(r)&&!O(n)})}function Mn(){let e=qt();return!!e&&Ca(e)}function Pn(){let e=te(),t=ae(e,ir,!0)??ae(document,ir,!0);if(t)return t;let n=ae(e,ar)??ae(document,ar);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&M(o)&&O(o))return o}return cr(O)}function xe(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}var An=0;function ur(e){An+=1;try{e()}finally{An-=1}}function Ft(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function Ee(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function dr(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function Ta(e){let{head:t}=document;if(t)for(let n of Array.from(t.querySelectorAll("link")))n.id!==e&&Ft(n)&&n.remove()}function ka(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Hn(e,t){let{head:n}=document;!n||!t||ur(()=>{Ta(e);let o=dr(e),{type:r,sizes:i}=ka(t);o?n.lastElementChild!==o&&n.appendChild(o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function mr(e,t){let{head:n}=document;n&&ur(()=>{dr(e)?.remove();let o=Array.from(n.querySelectorAll("link")).filter(Ft);if(o.length){Ee(t)&&o[0].href!==t&&(o[0].href=t);return}if(!Ee(t))return;let r=document.createElement("link");r.rel="icon",r.href=t,n.appendChild(r)})}function fr(e,t){let{head:n}=document;if(!n)return null;let o=new MutationObserver(r=>{if(!An)for(let i of r){if(i.type==="attributes"&&Ft(i.target)){t(i.target.id===e?void 0:i.target.href);return}for(let a of i.addedNodes)if(Ft(a)&&a.id!==e){t(a.href);return}}});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}function Se(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=u=>{let c=n.indexOf(u);return c>=0&&n[c+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(u,c)=>{try{return document.querySelector(u)?.getAttribute(c)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function $t(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function Ma(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!M(t))&&(O(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function Pa(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&M(e))}function Aa(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&M(e))}function Ha(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Rn(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function zt(){if(Pn()||Ma())return!0;let e=qt();return e&&M(e)&&!O(e)?!1:!!(Pa()||Aa()||Ha())}var Ra=["original","badge","dot","hole","bg"],br=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge",default:!0},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],hr={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Kt="#FCFCFC",Ia="#111111",pr="#111111",Na="#ffffff",Ba="#212121",Oa="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Da={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Vt=32,gr=64;function yr(e){return typeof e=="string"&&Ra.includes(e)}function _a(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function Gt(e){let t=document.createElement("canvas");t.width=Vt,t.height=Vt;let n=t.getContext("2d");return n?(n.scale(Vt/gr,Vt/gr),e(n),t.toDataURL("image/png")):""}function ja(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function Ut(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(Oa);n&&(e.strokeStyle=Ia,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function qa(e,t,n){let o=hr[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=pr,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=pr,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=Na,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function Ke(e,t){if(e==="original")return t==="wait"?Gt(o=>Ut(o,Kt)):_a(Da[t]);let n=t==="wait"?void 0:hr[t];return Gt(e==="hole"?o=>Ut(o,n??Kt):e==="bg"?o=>{o.fillStyle=n??Ba,ja(o,0,0,64,64,14),o.fill(),Ut(o,Kt,!1)}:o=>{Ut(o,Kt),t!=="wait"&&qa(o,t,e==="dot"?"dot":"badge")})}function vr(e){return{wait:Ke(e,"wait"),rotate:Ke(e,"rotate"),done:Ke(e,"done"),ready:Ke(e,"ready"),error:Ke(e,"error")}}var Fa=new y("ChatStateFavicons"),Le="bloom-chat-state-favicon",wr=S({style:{type:3,description:"Favicon overlay",options:br}}),Ce="",Nn={wait:"",rotate:"",done:"",ready:"",error:""},Bn="wait",Ge=!1,K=!1,P=null,Ue="",We="",Ye=!0,Ve=null,Te=0,we,Wt=null,le=null,In=null,Je=!1,xr=new WeakSet,$a=400;function za(){let e=wr.store.style;return yr(e)?e:"badge"}function Ka(){let t=document.querySelector(`link[rel~="icon"]:not(#${Le})`)?.href;return Ee(t)?t:Ee(Ce)?Ce:""}function A(e){Bn=e,Hn(Le,Nn[e])}function Er(){Nn=vr(za()),A(Bn)}function Va(){let e=Se(),t=e?$t(e):$t("");return zt()?(!Ue&&t&&(Ue=t),Ue||t):(Ue="",t)}function Lr(){Ge=!1,K=!1,P=null,Ue=""}function Ga(e){We=e,Lr(),Ye=!1,A("wait")}function Cr(){if(!Je)return;let e=Se()||location.pathname;if(We&&e&&We!==e){Ga(e);return}e&&(We=e);let t=Va(),n=zt(),o=kn(),r=Mn();if(Rn()&&!n){A("error"),Ge=!1,K=!1,P=null;return}if(n){Ge=!0,K=!1,P=t,A("rotate");return}if(Ge){let i=!!P&&!!t&&P===t;if(Ge=!1,i){K=!0,P=t,A("done");return}K=!1,P=null}if(K)if(!!(P&&t&&P!==t))K=!1,P=null;else if(o){A("done");return}else if(Ye){K=!1,A("ready");return}else{K=!1,A("wait");return}P=null,A(o?"wait":Ye?"ready":"wait")}function Tr(){let e=te();if(!(le&&In===e&&e.isConnected)){if(le?.disconnect(),In=e,!e||e===document.body){le=null;return}le=new MutationObserver(()=>Yt()),le.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid","class"]})}}function Yt(){!Je||Te||(Te=requestAnimationFrame(()=>{Te=0,Je&&(kr(),Tr(),Cr())}))}function Sr(){Ye=!0,Yt()}function kr(){let e=se();!e||xr.has(e)||(xr.add(e),e.addEventListener("input",Sr,{passive:!0}),e.addEventListener("compositionend",Sr,{passive:!0}))}var Mr=E({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[w.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:wr,startAt:"DOMContentLoaded",cleanupSelectors:[`#${Le}`],start(){Je=!0,Ce=Ka()||Ce,Er(),Wt?.disconnect(),Wt=fr(Le,e=>{Ee(e)&&(Ce=e),Hn(Le,Nn[Bn])}),Ve?.abort(),Ve=new AbortController,window.addEventListener("popstate",Yt,{signal:Ve.signal}),kr(),Tr(),we!==void 0&&clearInterval(we),we=setInterval(Yt,$a),Cr(),Fa.debug("favicon watch started")},stop(){Je=!1,Te&&cancelAnimationFrame(Te),Te=0,we!==void 0&&(clearInterval(we),we=void 0),Ve?.abort(),Ve=null,le?.disconnect(),le=null,In=null,Wt?.disconnect(),Wt=null,Lr(),We="",Ye=!0,mr(Le,Ce)},onSettingsChange:Er});var Pr=`.bloom-ih-hud {
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
`;var Ar=new y("InputHistory"),On=/\u200B/g,Hr=10,Rr=500,Ir=100,Wa=8,Ya=120,Ja=2e3,Jt=10,Xt=S({maxEntries:{type:4,description:"Max stored prompts",min:Hr,max:Rr,default:Ir},history:{type:5,description:"Stored prompts",render:ds},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Dn=new Map,v=0,_n="",D=!1,Ze=!1,Fn=0,Xe=null,jn,$n=null,Nr=!0;function H(){let e=Xt.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Br(e){let t=fo(Number(Xt.store.maxEntries??Ir),Hr,Rr);return e.length>t?e.slice(e.length-t):e}function Zt(e){Xt.store.entries=Br(e)}function Xa(e){return e.replaceAll(On,"").replace(/\n$/,"").trim()}function qn(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(ve);return n instanceof HTMLElement?n:se()}function Za(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!xe(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(On,"").trim().length===0,last:i.toString().replaceAll(On,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Or(e,t){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch(i){Ar.debug("pm caret failed:",i)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function Dr(e){clearTimeout(jn),jn=setTimeout(()=>{if(e!==Fn)return;Ze=!1;let t=$n;t&&Or(t,Nr)},Ya)}function _r(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),Ze=!0,$n=e,Nr=n;let i=++Fn;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(a){Ar.debug("insertText failed:",a),e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),Or(e,n),Dr(i)}function Qa(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function ke(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function es(){document.querySelector(".bloom-ih-hud")?.remove()}function ts(e,t){let n=Qa();n.textContent=e;let o=(t.closest("form")??te()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-Wa)}px`,n.classList.add("bloom-ih-hud-on")}function zn(e){let t=Xa(e);if(!t)return;let n=Date.now(),o=Dn.get(t);if(o&&n-o<Ja)return;Dn.set(t,n);let r=H().filter(i=>i!==t);r.push(t),Zt(r),v=H().length,D=!1,ke()}function ns(e,t){let n=H();if(!n.length&&e)return;v>=n.length&&(_n=xe(t),v=n.length);let o=e?v-1:v+1;o<0||o>n.length||(v=o,D=!0,_r(t,o===n.length?_n:n[o],e),o<n.length?ts(`${o+1} / ${n.length}`,t):ke())}function os(e){D=!1,ke(),_r(e,_n,!1),v=H().length}function rs(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=qn(e.target)??qn(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&D&&!e.altKey&&!e.shiftKey){os(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){zn(xe(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=H();if(!o){let i=Za(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||v<=0)||!n&&v>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),ns(n,t))}function is(e){if(qn(e.target)){if(Ze){Dr(Fn);return}D&&(D=!1,ke(),v=H().length)}}function as(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(ve);n instanceof HTMLElement&&zn(xe(n))}function ss(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(jt);if(!n||!(n instanceof HTMLElement)||O(n))return;let o=se();o&&zn(xe(o))}function ls(e){if(!(!D||Ze)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}D=!1,ke()}}function cs(){if(Xe)return;Xe=new AbortController;let{signal:e}=Xe,t={capture:!0,signal:e};window.addEventListener("keydown",rs,t),window.addEventListener("input",is,t),window.addEventListener("submit",as,t),window.addEventListener("click",ss,t),window.addEventListener("pointerdown",ls,t)}function us(e){let t=H().slice();t.splice(e,1),Zt(t),v>t.length&&(v=t.length)}function ds(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=H().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(f=>f.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/Jt));n>=l&&(n=l-1);let u=s.slice(n*Jt,n*Jt+Jt);e.replaceChildren();let c=document.createElement("input");if(c.className="bloom-ih-search",c.type="search",c.placeholder="Search history",c.autocomplete="off",c.value=t,c.addEventListener("input",()=>{t=c.value,n=0,r()}),e.appendChild(c),u.length){let f=document.createElement("div");f.className="bloom-ih-list",u.forEach((L,q)=>{let V=i.indexOf(L),Ae=H().length-1-V,de=document.createElement("div");de.className="bloom-ih-item";let F=document.createElement("button");F.type="button",F.className=`bloom-ih-body${o===q?"":" bloom-ih-clamp"}`,F.textContent=L,F.addEventListener("click",()=>{o=o===q?-1:q,r()});let R=document.createElement("div");R.className="bloom-ih-actions";let $=document.createElement("button");$.type="button",$.title="Copy",$.textContent="C",$.addEventListener("click",()=>{go(L)});let G=document.createElement("button");G.type="button",G.title="Delete",G.textContent="\xD7",G.addEventListener("click",()=>{us(Ae),r()}),R.append($,G),de.append(F,R),f.appendChild(de)}),e.appendChild(f)}else{let f=document.createElement("p");f.className="bloom-ih-empty",f.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(f)}let b=document.createElement("div");b.className="bloom-ih-pager";let p=document.createElement("button");p.type="button",p.className="bloom-ih-btn",p.textContent="Prev",p.disabled=n<=0,p.addEventListener("click",()=>{n-=1,r()});let h=document.createElement("span");h.textContent=`${n+1} / ${l}`;let g=document.createElement("button");g.type="button",g.className="bloom-ih-btn",g.textContent="Next",g.disabled=n+1>=l,g.addEventListener("click",()=>{n+=1,r()});let m=document.createElement("button");m.type="button",m.className="bloom-ih-clear",m.textContent="Clear all",m.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Zt([]),v=0,r())}),b.append(p,h,g,m),e.appendChild(b)};return r(),()=>{e.replaceChildren()}}var jr=E({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[w.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:Xt,startAt:"HostReady",managedStyle:"inputHistory",start(){C("inputHistory",Pr),v=H().length,D=!1,cs()},stop(){Xe?.abort(),Xe=null,ke(),es(),Dn.clear(),clearTimeout(jn),Ze=!1,$n=null,D=!1},onSettingsChange(){let e=H(),t=Br(e);t.length!==e.length&&Zt(t),v>t.length&&(v=t.length)}});var Kn="noShareLink",ms=['button[data-testid="share-chat-button"]'],fs=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],Vn=S({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function qr(e){return`${e.join(",")}{display:none!important}`}function Fr(){let e=[];if(Vn.store.hideShareChat!==!1&&e.push(qr(ms)),Vn.store.hideShareProject!==!1&&e.push(qr(fs)),!e.length){I(Kn);return}C(Kn,e.join(`
`))}var $r=E({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[w.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Vn,start:Fr,onSettingsChange:Fr,stop(){I(Kn)}});var Vr="noDictation",ps=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]'],gs=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Gr=S({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function zr(e){return`${e.join(",")}{display:none!important}`}function Kr(){let e=[zr(ps)];Gr.store.hideDictationSettings!==!1&&e.push(zr(gs)),C(Vr,e.join(`
`))}var Ur=E({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[w.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Gr,start:Kr,onSettingsChange:Kr,stop(){I(Vr)}});var Gn="noSidebarIdentity",bs=['[data-testid="accounts-profile-button"] .min-w-0 > .truncate','[data-testid="profile-button"] .min-w-0 > .truncate','[data-testid="user-menu-button"] .min-w-0 > .truncate','[data-testid="account-menu-button"] .min-w-0 > .truncate','[data-testid="accounts-profile-button"] .min-w-0.flex-1 .truncate','[data-testid="profile-button"] .min-w-0.flex-1 .truncate','[data-testid="accounts-profile-button"] .min-w-0 > span','[data-testid="profile-button"] .min-w-0 > span','[data-testid="accounts-profile-button"] .min-w-0 > p','[data-testid="profile-button"] .min-w-0 > p'],hs=['[data-testid="accounts-profile-button"] a[href^="mailto:"]','[data-testid="profile-button"] a[href^="mailto:"]','[data-testid="user-menu-button"] a[href^="mailto:"]','[data-testid="account-menu-button"] a[href^="mailto:"]'],Un=S({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0}});function Wr(e){return`${e.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Yr(){let e=Un.store.hideUsername!==!1,t=Un.store.hideEmail!==!1,n=[];if(e&&n.push(Wr(bs)),t&&n.push(Wr(hs)),!n.length){I(Gn);return}C(Gn,n.join(`
`))}var Jr=E({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[w.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Un,start:Yr,onSettingsChange:Yr,stop(){I(Gn)}});var Xr=`#bloom-rt-host {
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    overflow: visible;
    pointer-events: none;
    z-index: 10001;
}

.bloom-rt-panel {
    pointer-events: auto;
    position: fixed;
    left: 50%;
    top: 42%;
    transform: translate(-50%, -50%);
    width: min(440px, calc(100vw - 24px));
    max-height: min(70vh, 560px);
    overflow: auto;
    margin: 0;
    padding: 8px;
    border: 0;
    border-radius: 16px;
    background: var(--main-surface-primary, #ffffff);
    color: var(--text-primary, #0d0d0d);
    box-shadow:
        0 0 0 1px var(--border-light, rgba(0, 0, 0, 0.1)),
        0 18px 48px rgba(0, 0, 0, 0.22);
    font: 14px/1.35 ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
    z-index: 10001;
}

.bloom-rt-panel[data-visible="false"] {
    display: none;
}

.bloom-rt-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin: 0;
    padding: 0;
    list-style: none;
}

.bloom-rt-card {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    margin: 0;
    padding: 10px 12px;
    border: 0;
    border-radius: 12px;
    background: transparent;
    color: inherit;
    text-align: left;
    cursor: pointer;
    box-sizing: border-box;
}

.bloom-rt-card:hover,
.bloom-rt-card:focus-visible {
    background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
    outline: none;
}

.bloom-rt-card[data-active="true"] {
    background: var(--main-surface-secondary, #f4f4f4);
    box-shadow: inset 0 0 0 1px var(--border-medium, rgba(0, 0, 0, 0.15));
}

.bloom-rt-name {
    font-weight: 600;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.bloom-rt-project {
    font-size: 12px;
    color: var(--text-secondary, #5d5d5d);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.bloom-rt-preview {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 12px;
    color: var(--text-tertiary, #8f8f8f);
}

.bloom-rt-line {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.bloom-rt-line[data-role="user"] {
    color: var(--text-secondary, #5d5d5d);
}

.bloom-rt-empty {
    margin: 0;
    padding: 18px 12px;
    color: var(--text-tertiary, #8f8f8f);
    font-size: 13px;
    text-align: center;
}

@media (prefers-reduced-motion: reduce) {
    .bloom-rt-panel {
        transition: none;
    }
}
`;var ei=new y("RecentTopics"),Pe="bloom-rt-host",ti="home",ni=/^\/c\/([a-z0-9_-]{8,})/i,vs=/\/c\/([a-z0-9_-]{8,})/i,oi=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,xs=new Set(["Backquote","IntlBackslash"]),Es=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Ss=140,ws=[3,4,5,6,7,8,9,10,11,12].map(e=>({label:String(e),value:String(e),default:e===5})),x=S({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:ws},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),Qt=null,Wn=null,T=!1,rt=!1,Qe=!1,_=0,ce="",Me=null,et=null;function Ls(){let e=Number(x.store.maxRecent??5);return Number.isFinite(e)&&e>=3&&e<=12?e:5}function tt(){let e=x.plain.visits;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Yn(){let e=x.plain.titles;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function ri(){let e=x.plain.previews;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Jn(){let e=x.plain.projects;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function tn(e){let t=Ls();return e.length>t?e.slice(0,t):e}function j(e){return e===ti}function nt(e,t=Ss){let n=e.replace(/\s+/g," ").trim();return n.length<=t?n:`${n.slice(0,t-1)}\u2026`}function Xn(e){if(!e)return"";try{return new URL(e,location.origin).pathname.match(ni)?.[1]??""}catch{return e.match(vs)?.[1]??""}}function ue(){let e=(location.pathname||"/").match(ni);if(e?.[1])return e[1];let n=Se().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return ti}function Zn(e){if(j(e))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${e}"]`);for(let o of n){if(Xn(o.getAttribute("href")||"")!==e)continue;let r=nt(o.textContent||"",80);if(r)return r}}catch{}let t=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return ue()===e&&t&&!/^ChatGPT$/i.test(t)?nt(t,80):""}function Cs(e){return j(e)?"New chat":Yn()[e]||Zn(e)||"Chat"}function Ts(e){return Jn()[e]||""}function ks(e){return ri()[e]||{}}function ii(e,t){if(!e||j(e)||!t)return;let n=Yn();n[e]!==t&&(n[e]=t,x.store.titles=n)}function Ms(e,t){if(!e||j(e)||!t)return;let n=Jn();n[e]!==t&&(n[e]=t,x.store.projects=n)}function Ps(e,t){if(!e||j(e)||!t.user&&!t.assistant)return;let n=ri(),o=n[e]||{},r={user:t.user||o.user,assistant:t.assistant||o.assistant};o.user===r.user&&o.assistant===r.assistant||(n[e]=r,x.store.previews=n)}function Qn(e){if(!e||j(e)&&x.store.includeHome===!1)return;let t=tt().filter(n=>n!==e);t.unshift(e),x.store.visits=tn(t)}function nn(){let e=x.store.includeHome!==!1;return tn(tt().filter(n=>e||!j(n))).map(n=>({id:n,title:Cs(n),project:Ts(n),preview:ks(n)}))}function Zr(e){try{let t=document.querySelectorAll(`[data-message-author-role="${e}"]`),n=t[t.length-1];if(!(n instanceof HTMLElement))return"";let o=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||o.push(a)}let r=o.length?o.join(" "):n.textContent||"";return nt(r)}catch{return""}}function ot(e){if(!e||j(e)||e!==ue())return;let t=Zn(e);t&&ii(e,t);let n=Zr("user"),o=Zr("assistant");Ps(e,{user:n,assistant:o});let r=si(e);if(r){let i=ai(r);i&&Ms(e,i)}}function eo(){let e=Yn(),t=Jn(),n=[],o=new Set,r=!1,i=!1;try{for(let u of document.querySelectorAll('a[href*="/c/"]')){if(u.closest(`#${Pe}, #bloom-root, #bloom-sidebar-panel`))continue;let c=Xn(u.getAttribute("href")||"");if(!c||o.has(c))continue;o.add(c),n.push(c);let b=nt(u.textContent||"",80);b&&!oi.test(b)&&e[c]!==b&&(e[c]=b,r=!0);let p=ai(u);p&&t[c]!==p&&(t[c]=p,i=!0)}}catch{}r&&(x.store.titles=e),i&&(x.store.projects=t);let a=tt(),s=new Set(a),l=n.filter(u=>!s.has(u));l.length&&(x.store.visits=tn([...a,...l]))}function ai(e){let t=e.parentElement;for(let n=0;n<10&&t;n++){if(t.id==="bloom-rt-host"||t.id==="bloom-root"){t=t.parentElement;continue}let o=t.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),r=nt((o instanceof HTMLElement?o.textContent:"")||"",60);if(r&&!oi.test(r)&&!/^20\d{2}/.test(r)&&r!==e.textContent?.trim()&&t.querySelector('a[href^="/c/"]'))return r;t=t.parentElement}return""}function si(e){if(j(e)){let t=document.querySelector('[data-testid="create-new-chat-button"]');return t instanceof HTMLAnchorElement?t:document.querySelector('a[href="/"]')}try{for(let t of document.querySelectorAll(`a[href*="/c/${e}"]`))if(Xn(t.getAttribute("href")||"")===e)return t}catch{}return null}function As(e){let t=si(e);if(t){t.click();return}if(j(e)){location.assign("/");return}location.assign(`/c/${e}`)}function en(){let e=ue();ce&&ce!==e&&ot(ce),ce=e,Qn(e),eo();let t=Zn(e);t&&ii(e,t),ot(e)}function Hs(){Me||(Me=history.pushState.bind(history),et=history.replaceState.bind(history),history.pushState=function(...t){let n=Me(...t);return en(),n},history.replaceState=function(...t){let n=et(...t);return en(),n})}function Rs(){Me&&(history.pushState=Me),et&&(history.replaceState=et),Me=null,et=null}function Is(e){return xs.has(e.code)||e.keyCode===192?!0:Es.has(e.key)}function li(e){return e.key==="Control"||e.code==="ControlLeft"||e.code==="ControlRight"}function Ns(e,t){rt=t,eo(),ot(ue()),T=!0,_=0;try{let n=ue();Qn(n);let o=nn();o.length>1&&(_=e?o.length-1:1)}catch(n){ei.error("Failed to open switcher:",n)}it()}function Qr(e){let{length:t}=nn();t&&(_=(_+(e?-1:1)+t)%t,it())}function to(){if(!T)return;let e=nn()[_];T=!1,rt=!1,it(),e&&As(e.id)}function ci(){T&&(T=!1,rt=!1,it())}function Bs(e){if(li(e)){Qe=!0;return}if((e.ctrlKey||Qe)&&!e.altKey&&!e.metaKey&&Is(e)&&!e.repeat){e.preventDefault(),e.stopImmediatePropagation();try{T?Qr(e.shiftKey):Ns(e.shiftKey,!0)}catch(n){ei.error("Hotkey failed:",n)}return}if(T){if(e.key==="Escape"){e.preventDefault(),ci();return}if(e.key==="Enter"&&!e.shiftKey){e.preventDefault(),to();return}e.key==="Tab"&&(e.ctrlKey||Qe)&&(e.preventDefault(),Qr(e.shiftKey))}}function Os(e){li(e)&&(Qe=!1,T&&rt&&to())}function Ds(e){let t=e.target instanceof Element?e.target:null;!t||!t.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(en)}function _s(e){!T||(e.target instanceof Element?e.target:null)?.closest(`#${Pe}`)||ci()}function js(){document.visibilityState==="hidden"&&ot(ue())}function qs(){if(!document.body)return null;let e=document.getElementById(Pe);if(e instanceof HTMLElement)return Wn=e,e;e=document.createElement("div"),e.id=Pe;let t=document.createElement("div");return t.className="bloom-rt-panel",t.setAttribute("role","listbox"),t.setAttribute("aria-label","Recent conversations"),t.dataset.visible="false",t.addEventListener("click",n=>n.stopPropagation()),e.append(t),document.body.append(e),Wn=e,e}function it(){let e=qs();if(!e)return;let t=e.querySelector(".bloom-rt-panel");if(!t)return;if(!T){t.dataset.visible="false",t.replaceChildren();return}let n=nn();if(!n.length){t.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",t.replaceChildren(i);return}_>=n.length&&(_=0);let o=document.createElement("div");o.className="bloom-rt-list",o.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===_?"true":"false",s.setAttribute("aria-selected",a===_?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let u=document.createElement("div");u.className="bloom-rt-project",u.textContent=i.project,s.append(u)}if(i.preview.user||i.preview.assistant){let u=document.createElement("div");if(u.className="bloom-rt-preview",i.preview.user){let c=document.createElement("div");c.className="bloom-rt-line",c.dataset.role="user",c.textContent=i.preview.user,u.append(c)}if(i.preview.assistant){let c=document.createElement("div");c.className="bloom-rt-line",c.dataset.role="assistant",c.textContent=i.preview.assistant,u.append(c)}s.append(u)}s.addEventListener("click",()=>{_=a,to()}),o.append(s)}),t.replaceChildren(o),t.dataset.visible="true",t.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function Fs(){document.getElementById(Pe)?.remove(),Wn=null}var ui=E({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[w.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${Pe}`],settings:x,start(){C("recentTopics",Xr),ce=ue(),Qn(ce),eo(),ot(ce),Hs(),Qt=new AbortController;let{signal:e}=Qt;window.addEventListener("keydown",Bs,{capture:!0,signal:e}),window.addEventListener("keyup",Os,{capture:!0,signal:e}),window.addEventListener("popstate",en,{signal:e}),document.addEventListener("click",Ds,{capture:!0,signal:e}),document.addEventListener("click",_s,{signal:e}),document.addEventListener("visibilitychange",js,{signal:e})},stop(){Qt?.abort(),Qt=null,Rs(),T=!1,rt=!1,Qe=!1,Fs()},onSettingsChange(){let e=tn(tt());e.length!==tt().length&&(x.store.visits=e),T&&it()}});var at=new y("Bloom"),di=!1,$s=Date.now(),zs=[rr,Mr,jr,$r,Ur,Jr,ui];function on(e){return new Promise(t=>setTimeout(t,e))}function Ks(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var fi=8e3,mi=300,Vs=250;async function Gs(){if(re())return await on(mi),!0;for(;Date.now()-$s<fi;)if(await on(Vs),re())return await on(mi),!0;return re()||dn()}function no(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function Us(){if(no())return!0;let e=Date.now()+fi;for(;Date.now()<e;)if(await on(100),no())return!0;return no()}function Ws(){try{GM_registerMenuCommand?.("Bloom++ settings",or)}catch{}}function Ys(){bt(()=>{Ie("HostShell"),at.info("host shell",k)}),ht(()=>{at.info("idle ready",k)}),yt(()=>{ao(),Ie("HostReady"),at.info("chrome ready",k)})}async function oo(){await bo()}async function ro(){if(di)return;di=!0;for(let n of zs)try{Co(n)}catch(o){at.error("register failed",n.name,o)}Mo(),Ie("Init"),Ws(),Ys();let e=()=>Ie("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await Ks(),Us().then(n=>{n&&vt()}),!await Gs()){at.warn("late islands not detected; starting default plugins",k),pe(),xt();return}await No()}var pi=typeof unsafeWindow<"u"?unsafeWindow:window,Js=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||Js){let e=pi.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",k);try{Object.defineProperty(pi,"Bloom",{value:io,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}oo().then(()=>ro()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
