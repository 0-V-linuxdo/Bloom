// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260902] v1.4.5
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

/* Bloom++ [20260902] v1.4.5. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var nr=Object.defineProperty;var or=(e,t)=>{for(var n in t)nr(e,n,{get:t[n],enumerable:!0})};var bn={};or(bn,{REPO_URL:()=>Fn,Settings:()=>d,VERSION:()=>x,hasLateIslands:()=>K,init:()=>gn,initSettings:()=>pn,isDocumentInteractive:()=>jn,plugins:()=>M,requestChromeReady:()=>Ge,requestIdleReady:()=>J,requestShellReady:()=>Ve,whenChromeReady:()=>Ke,whenIdleReady:()=>$e,whenShellReady:()=>ze});var B=new Map,Be=!1;function rr(){return document.getElementById("bloom-root")?.shadowRoot??null}function ir(){return document.head??null}function W(){let e=rr();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=ar()}function Mt(e,t){if(!Be)return;let n=ir();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),W();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,W();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,W()}function O(e,t){let n=B.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},B.set(e,n)),Be&&Mt(e,n)}function hn(){Be=!0;for(let[e,t]of B)Mt(e,t);return W(),!0}function yn(e){let t=B.get(e);t&&(t.disabled=!1,Be&&Mt(e,t))}function vn(e){let t=B.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),W())}function $(e){let t=B.get(e);t&&(t.el?.remove(),B.delete(e),W())}function ar(){return Array.from(B.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var h=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function v(e){return e}var sr=new Map;function ue(e,t){let n=sr.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var lr="bloompp";function xn(){return new Promise((e,t)=>{let n=indexedDB.open(lr,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function En(e){try{let t=await xn();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function Sn(e,t){try{let n=await xn();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function me(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function wn(e,t,n){return Math.min(n,Math.max(t,e))}function Ln(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function Cn(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}var Oe=new h("SettingsStore"),D="BloomSettings",cr=100;function _e(e){if(me(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(me(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return me(n)?n:null}return null}catch{return null}}var De=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[g,c]of this.defaultGetters)if(l.startsWith(g)){let p=l.slice(g.length+1);if(p&&!p.includes(".")){let u=c(p);u!==void 0&&(i[a]=u,s=u);break}}}return me(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Oe.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},cr))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(D,this.plain)}catch{try{GM_setValue(D,t)}catch(n){Oe.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(D,t)}catch{}Sn(D,t).catch(n=>Oe.warn("Failed to save settings to IndexedDB:",n))}catch(t){Oe.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){Ln(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var dr=new h("Settings"),ur={plugins:{}},d=new De(structuredClone(ur)),mr=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function fr(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function T(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(d.store.plugins[n]||(d.store.plugins[n]={}),d.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?d.plain.plugins[n]??{}:{}}};return t}function pr(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function Tn(){let e=null;if(e=_e(pr(D)),e||(e=_e(await En(D))),!e)try{e=_e(localStorage.getItem(D))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(d.plain.plugins=t),dr.debug("Loaded settings")}}function Mn(e,t){t&&(t.pluginName=e,d.plain.plugins[e]||(d.plain.plugins[e]={}),d.setDefaultGetter(mr(e),n=>{if(n!=="enabled")return fr(t.def,n)}))}var qe=new h("PluginManager"),M={},pe=new Set;function Pn(e){if(M[e.name]){qe.warn("Duplicate plugin",e.name);return}M[e.name]=e,Mn(e.name,e.settings)}function Fe(e){let t=M[e];if(!t)return!1;if(t.required)return!0;let n=d.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function Rn(e){let t=M[e];if(!t||t.required)return;let n=!Fe(e);d.plain.plugins[e]||(d.store.plugins[e]={}),d.store.plugins[e].enabled=n,n?Hn(t):gr(t),ue("pluginToggle",{name:e,enabled:n})}function Hn(e,t=!1){if(!pe.has(e.name)&&Fe(e.name))try{e.managedStyle&&yn(e.managedStyle),e.start?.(),pe.add(e.name),e.settings&&d.addPrefixChangeListener(`plugins.${e.name}.`,()=>{pe.has(e.name)&&e.onSettingsChange?.()}),t||qe.debug("Started",e.name)}catch(n){qe.error("Failed to start",e.name,n)}}function gr(e){if(pe.has(e.name)){try{e.stop?.()}catch(t){qe.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(vn(e.managedStyle),$(e.managedStyle)),pe.delete(e.name)}}function ge(e){for(let t of Object.values(M))(t.startAt??"DOMContentLoaded")===e&&Hn(t)}var kn=2,An="defaultsRev";function In(){for(let t of Object.values(M))d.plain.plugins[t.name]||(d.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=d.store.plugins.Settings??(d.store.plugins.Settings={});if(e[An]!==kn){for(let t of["NoShareLink","NoDictation"]){let n=d.store.plugins[t]??(d.store.plugins[t]={});n.enabled=!1}e[An]=kn}}var be=!1,je=!1,kt=!1,Bn=[],On=[],Dn=[];function At(e){let t=e.splice(0);for(let n of t)n()}function he(){be||(be=!0,At(Bn))}function Pt(){je||(je=!0,be||he(),At(On))}function _n(){kt||(kt=!0,be||he(),je||Pt(),At(Dn))}function ze(e){be?e():Bn.push(e)}function $e(e){je?e():On.push(e)}function Ke(e){kt?e():Dn.push(e)}function Ve(){he()}function J(){he(),Pt()}function Ge(){_n()}function Nn(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function qn(){await Nn(4e3),he(),await Nn(4e3),Pt(),_n()}var k={p:"0-V-linuxdo"},x="[20260902] v1.4.5",Fn="https://github.com/0-V-linuxdo/Bloom";function br(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function hr(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function Rt(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function K(){return Rt()?br()||hr():!1}function jn(){return K()}var yr=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),zn=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),vr=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),xr="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function X(e){return e.id==="bloom-root"||!!e.closest(xr)}function $n(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function Ue(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function Ht(e){if(!(e instanceof HTMLElement)||!e.isConnected||X(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&Ue(t)?!1:e.getClientRects().length>0}function ye(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Er(){let e=[];for(let t of document.querySelectorAll(yr))!(t instanceof HTMLElement)||!t.isConnected||X(t)||e.push(t);return e}function We(e){if(!e.isConnected||X(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function ve(){return Er().filter(We)[0]??null}function It(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||X(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function Nt(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!X(n)&&!ye(n)&&(t=n);let o=t.parentElement;if(o&&!ye(o)&&!X(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!ye(o.parentElement))return o}return t}function Kn(){let e=document.querySelectorAll(zn);for(let n of e)if(Ht(n)&&!Ue(n)&&$n(n))return n;let t=document.querySelectorAll(vr);for(let n of t){if(!Ht(n)||!$n(n)||Ue(n))continue;let o=n.querySelector(zn);return Ht(o)&&!Ue(o)?o:n}return null}function Vn(){let e=ve();if(e){let t=Nt(e),n=t.parentElement;if(n&&!ye(n))return n;if(!ye(t))return t}return It()}function Gn(e){let t=ve();return t?e.composedPath().includes(t):!1}var Ot=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary"],Sr={light:{"--main-surface-primary":"#ffffff","--main-surface-secondary":"#f4f4f4","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#f9f9f9","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#b4b4b4","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.1)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.2)","--link":"#0d0d0d","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#f4f4f4","--bg-primary":"#ffffff","--bg-secondary":"#f4f4f4"},dark:{"--main-surface-primary":"#212121","--main-surface-secondary":"#2f2f2f","--main-surface-tertiary":"#424242","--sidebar-surface-primary":"#171717","--text-primary":"#ececec","--text-secondary":"#b4b4b4","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ececec","--icon-secondary":"#b4b4b4","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.1)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.2)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.06)","--interactive-label-primary-default":"#ececec","--message-surface":"#2f2f2f","--bg-primary":"#212121","--bg-secondary":"#2f2f2f"}};function wr(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Lr(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function Bt(e){let t=wr(e);return t?Lr(t)>.55?"light":"dark":null}function Cr(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=Bt(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=Bt(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Bt(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Un(e){return e==="auto"?Cr():e}function Tr(e){try{let t=getComputedStyle(document.documentElement);for(let n of Ot){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function Wn(e,t,n){let o=Sr[t];if(n){Tr(e);for(let r of Ot)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of Ot)e.style.setProperty(r,o[r])}function Yn(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var Dt=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover. */

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
  width: min(280px, calc(100vw - 16px));
  max-height: min(60vh, 420px);
  overflow: auto;
  overscroll-behavior: contain;
  margin: 0;
  padding: 12px;
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
  z-index: 10000;
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

.bloom-plugin-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.5rem;
  color: var(--text-primary, inherit);
  background: color-mix(in srgb, var(--text-primary, #0d0d0d) 10%, transparent);
  line-height: 0;
}

.bloom-card-icon svg {
  width: 0.875rem;
  height: 0.875rem;
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
  gap: 0.375rem;
  flex-shrink: 0;
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
`;var kr="bloom-root",F="bloom-rail-item",Qe="bloom-account-item",Z="bloom-sidebar-panel",et="bloom-settings-css",Ar=2e3,Pr=T({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),Xe=null,Rr=null,$t=!1,Le=!1,jt=[],Ye=null,tt=null,q=null,Ze=null,I=null,Se=null,xe,at=null,st=null,Ee=null,nt=null,ot=null,A=null;function lt(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Jn(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Hr(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>'}function Ir(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l-.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>'}var Nr={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>'};function Br(e){return e.icon||Nr[e.name]||lt()}function Or(){return"auto"}function _t(){let e=Or(),t=Un(e);Xe&&(Xe.setAttribute("data-bloom-scheme",t),Wn(Xe,t,e==="auto")),ue("schemeChange",{scheme:t,pref:e})}function we(e,t){e&&(e.hidden=t,e.toggleAttribute("inert",t),t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden"))}function Qn(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel").forEach(e=>e.remove())}function eo(){if(O("settings",Dt),document.getElementById(et)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=et,e.textContent=Dt,document.head.appendChild(e)}function Dr(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function to(){for(let e of jt)e();jt=[]}function no(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function _r(e){return!!e.settings&&Object.keys(e.settings.def).length>0}function qr(e,t,n){if(n.hidden)return null;if(n.type===5&&n.render){let a=document.createElement("details");a.className="bloom-field bloom-field-block";let s=document.createElement("summary");s.textContent=n.description||t;let l=document.createElement("div");return jt.push(n.render(l)),a.append(s,l),a}let o=document.createElement("div");o.className=n.type===4?"bloom-field bloom-field-stack":"bloom-field";let r=document.createElement("span");r.className="bloom-field-label",r.textContent=n.description||t,o.appendChild(r);let i=d.store.plugins[e]??(d.store.plugins[e]={});if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??n.options.find(s=>s.default)?.value??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=no(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),o.appendChild(a),o}return o}function Kt(){$t=!1,to(),A&&A.replaceChildren(),we(st,!0),we(at,!1)}function Fr(e){if(to(),$t=!0,nt&&(nt.textContent=e.name),ot&&(ot.textContent=e.description),A){if(A.replaceChildren(),e.authors?.length){let t=document.createElement("p");t.className="bloom-plugin-authors",t.textContent=e.authors.join(", "),A.appendChild(t)}if(e.settings)for(let[t,n]of Object.entries(e.settings.def)){let o=qr(e.name,t,n);o&&A.appendChild(o)}if(!A.querySelector(".bloom-field, .bloom-dialog-empty")){let t=document.createElement("p");t.className="bloom-dialog-empty",t.textContent="No configurable settings.",A.appendChild(t)}}we(at,!0),we(st,!1)}function jr(e){let t=document.createElement("div");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Br(e);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=e.name,a.title=e.name,r.append(i,a);let s=document.createElement("div");if(s.className="bloom-card-controls",_r(e)){let m=document.createElement("button");m.type="button",m.className="bloom-icon-btn",m.setAttribute("aria-label",`${e.name} settings`),m.innerHTML=Ir(),m.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),Fr(e)}),s.appendChild(m)}let l=no(e.name,Fe(e.name),!!e.required),g=l.querySelector("input");if(g?.addEventListener("click",m=>m.stopPropagation()),g?.addEventListener("change",()=>{Rn(e.name)}),s.appendChild(l),o.append(r,s),n.appendChild(o),e.description){let m=document.createElement("div");m.className="bloom-card-desc",m.textContent=e.description,n.appendChild(m)}let c=document.createElement("div");c.className="bloom-card-separator";let p=document.createElement("div");p.className="bloom-card-footer";let u=document.createElement("div");return u.className="bloom-card-author",u.textContent=e.authors?.filter(Boolean).join(", ")||"\xA0",p.appendChild(u),t.append(n,c,p),t}function zr(){if(Ee){Ee.replaceChildren();for(let e of Object.values(M))e.hidden||e.name==="Settings"||Ee.appendChild(jr(e))}}function qt(e){e.stopPropagation()}function Ft(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function Vt(){document.getElementById(F)?.setAttribute("aria-expanded",Le?"true":"false")}function $r(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function rt(){Kt(),document.getElementById(Z)?.remove(),Le=!1,Vt()}function Kr(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",qt),t.addEventListener("pointerup",qt),t.addEventListener("click",qt);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=lt();let a=document.createElement("h2");a.textContent="Bloom++",r.append(i,a);let s=document.createElement("button");s.type="button",s.className="bloom-icon-btn",s.setAttribute("aria-label","Close"),s.innerHTML=Jn(),s.addEventListener("click",rt),o.append(r,s),n.appendChild(o);let l=document.createElement("div");l.className="bloom-section-head";let g=document.createElement("h3");g.textContent="Plugins";let c=document.createElement("p");c.textContent="Toggle plugins. Gear opens options.",l.append(g,c),n.appendChild(l);let p=document.createElement("div");p.className="bloom-plugin-list",n.appendChild(p);let u=document.createElement("div");u.className="bloom-settings-plugin",we(u,!0);let m=document.createElement("div");m.className="bloom-settings-head";let f=document.createElement("button");f.type="button",f.className="bloom-icon-btn",f.setAttribute("aria-label","Back"),f.innerHTML=Hr(),f.addEventListener("click",Kt);let H=document.createElement("div");H.className="bloom-dialog-titles";let y=document.createElement("h2"),z=document.createElement("p");z.className="bloom-settings-sub",H.append(y,z);let C=document.createElement("button");C.type="button",C.className="bloom-icon-btn",C.setAttribute("aria-label","Close"),C.innerHTML=Jn(),C.addEventListener("click",rt),m.append(f,H,C);let se=document.createElement("div");return se.className="bloom-plugin-settings",u.append(m,se),t.append(n,u),at=n,st=u,Ee=p,nt=y,ot=z,A=se,zr(),t}function Vr(e){e.classList.add("bloom-rail-dock")}function Gr(){let e=document.getElementById(F);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&We(e)?e:null}function Ur(){if(document.getElementById(Z)?.remove(),!document.body)return;let e=Kr(Z);Vr(e),document.body.appendChild(e),Le=!0,Kt(),Vt(),ue("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:x,dock:"body",rail:!!Gr()})}function Gt(){let e=document.getElementById(Z);if(e instanceof HTMLElement&&e.isConnected&&$r(e)){rt();return}e?.remove(),Ur()}function Wr(){let e=document.createElement("button");return e.type="button",e.id=F,e.className="bloom-rail-item",e.setAttribute("aria-controls",Z),e.setAttribute("aria-expanded",Le?"true":"false"),e.innerHTML=`<span class="bloom-rail-mark">${lt()}</span><span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),Gt()}),e}function Xn(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function Yr(e){let t=e.querySelector("img");if(t instanceof HTMLElement){let n=t.getBoundingClientRect();if(n.width>8&&n.height>8)return t}for(let n of e.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}return null}function Jr(e,t){for(let n of e.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||t&&(n===t||n.contains(t)||t.contains(n))||(n.textContent||"").trim().length<2)continue;let r=n.getBoundingClientRect();if(r.width>16&&r.height>8&&r.height<40)return n}return null}function _(e,t,n){let o=`${n}px`;e.style.getPropertyValue(t)!==o&&e.style.setProperty(t,o)}function oo(e,t){if(e.classList.contains("bloom-rail-compact"))return;let n=e.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!e.isConnected||!t.isConnected)return;let o=Yr(t),r=getComputedStyle(t),i=Number.parseFloat(r.paddingTop),a=Number.parseFloat(r.paddingBottom);if(Number.isFinite(i)&&_(e,"padding-top",Math.round(i)),Number.isFinite(a)&&_(e,"padding-bottom",Math.round(a)),o){let s=o.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));_(n,"width",l),_(n,"height",Math.max(20,Math.round(s.height)));let g=e.getBoundingClientRect(),c=Math.round(s.left-g.left);c>=0&&c<=40&&_(e,"padding-left",c);let p=Jr(t,o);if(p){let u=p.getBoundingClientRect(),m=n.getBoundingClientRect(),f=Math.round(u.left-m.right);f>=0&&f<=24&&_(e,"gap",f)}}else{let s=Number.parseFloat(r.paddingLeft),l=Number.parseFloat(r.columnGap||r.gap);Number.isFinite(s)&&_(e,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&_(e,"gap",Math.round(l))}}function Zn(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Xr(){if(Se?.isConnected&&I){I.observe(Se,{childList:!0});return}zt()}function it(){if(document.body){I?.disconnect();try{let e=document.getElementById(F),t=e instanceof HTMLButtonElement?e:Wr(),n=ve(),o=It();if(n){let r=Nt(n),i=r.parentElement;if(Zn(r)||i&&Zn(i))return;t.isConnected&&t.nextElementSibling===r||r.before(t),Xn(t),oo(t,n)}else o?(t.parentElement!==o&&o.appendChild(t),Xn(t,!0)):t.isConnected&&!We(t)&&t.remove()}finally{Xr(),Vt()}}}function zt(){let e=Vn();e&&(Se===e&&I||(I?.disconnect(),Se=e,I=new MutationObserver(()=>{document.getElementById(F)?.isConnected||it()}),I.observe(e,{childList:!0})))}function Zr(){it(),zt(),xe===void 0&&(xe=window.setInterval(()=>{let e=document.getElementById(F);if(!(e instanceof HTMLElement)||!e.isConnected)it();else{let t=ve();t&&oo(e,t)}zt()},Ar))}function Qr(){xe!==void 0&&(clearInterval(xe),xe=void 0),I?.disconnect(),I=null,Se=null}function ei(e){Ze===e&&q||(q?.disconnect(),Ze=e,q=new MutationObserver(()=>{if(!e.isConnected){q?.disconnect(),q=null,Ze=null;return}ro(e)}),q.observe(e,{childList:!0}))}function ro(e){if(ei(e),e.querySelector(`#${Qe}`))return;let t=document.createElement("button");t.type="button",t.id=Qe,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${lt()}<span>Bloom++</span>`,t.addEventListener("pointerdown",Ft),t.addEventListener("pointerup",Ft),t.addEventListener("click",n=>{Ft(n),Gt()}),e.insertBefore(t,e.firstChild)}function Je(){let e=Kn();return e?(ro(e),!0):!1}function ti(e){Gn(e)&&(queueMicrotask(Je),requestAnimationFrame(()=>{Je()}),window.setTimeout(Je,60),window.setTimeout(Je,180))}function ni(){tt?.abort();let e=new AbortController;tt=e,document.addEventListener("click",ti,{signal:e.signal})}function oi(){tt?.abort(),tt=null,q?.disconnect(),q=null,Ze=null}function io(){J(),Dr(()=>{eo(),Qn(),it(),Gt()})}var ao=v({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[k.p],required:!0,hidden:!0,enabledByDefault:!0,settings:Pr,startAt:"HostReady",cleanupSelectors:[`#${kr}`,`#${F}`,`#${Qe}`,`#${Z}`,`#${et}`,"#bloom-menu-panel"],start(){eo(),Qn(),Zr(),ni(),Ye?.(),Ye=Yn(_t),_t()},stop(){Qr(),oi(),Ye?.(),Ye=null,rt(),document.getElementById(F)?.remove(),document.getElementById(Qe)?.remove(),document.getElementById(et)?.remove(),Xe=null,Rr=null,at=null,st=null,Ee=null,nt=null,ot=null,A=null,Le=!1,$t=!1},onSettingsChange:_t});var co='form[data-type="unified-composer"], form.w-full[data-type]',Q=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),ct=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),so=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),lo=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),ri=/stop streaming|stop generating|停止生成|停止输出|停止响应/;function E(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function V(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!E(r)))return r;return null}function uo(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function P(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=uo(e);return!!(ri.test(n)||/^stop$/i.test(n))}function j(){let t=Array.from(document.querySelectorAll(co)).find(E);if(t instanceof HTMLElement)return t;let n=V(document,Q),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function G(){let e=Array.from(document.querySelectorAll(Q));return e.find(E)??e[0]??null}function Ut(){let e=G();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function ii(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function mo(e){let t=j();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!E(n))&&e(n))return n;return null}function dt(){let e=j(),t=V(e,ct)??V(document,ct);return t&&!P(t)?t:mo(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!P(n);let r=uo(n);return/^(send|send prompt|发送)$/i.test(r)&&!P(n)})}function Wt(){let e=dt();return!!e&&ii(e)}function Yt(){let e=j(),t=V(e,so,!0)??V(document,so,!0);if(t)return t;let n=V(e,lo)??V(document,lo);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&E(o)&&P(o))return o}return mo(P)}function ee(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}var Jt=0;function fo(e){Jt+=1;try{e()}finally{Jt-=1}}function ut(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function te(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function po(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function ai(e){let{head:t}=document;if(t)for(let n of Array.from(t.querySelectorAll("link")))n.id!==e&&ut(n)&&n.remove()}function si(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Xt(e,t){let{head:n}=document;!n||!t||fo(()=>{ai(e);let o=po(e),{type:r,sizes:i}=si(t);o?n.lastElementChild!==o&&n.appendChild(o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function go(e,t){let{head:n}=document;n&&fo(()=>{po(e)?.remove();let o=Array.from(n.querySelectorAll("link")).filter(ut);if(o.length){te(t)&&o[0].href!==t&&(o[0].href=t);return}if(!te(t))return;let r=document.createElement("link");r.rel="icon",r.href=t,n.appendChild(r)})}function bo(e,t){let{head:n}=document;if(!n)return null;let o=new MutationObserver(r=>{if(!Jt)for(let i of r){if(i.type==="attributes"&&ut(i.target)){t(i.target.id===e?void 0:i.target.href);return}for(let a of i.addedNodes)if(ut(a)&&a.id!==e){t(a.href);return}}});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}function mt(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=g=>{let c=n.indexOf(g);return c>=0&&n[c+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(g,c)=>{try{return document.querySelector(g)?.getAttribute(c)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function ft(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function li(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!E(t))&&(P(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function ci(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&E(e))}function di(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&E(e))}function ui(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Zt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function pt(){if(Yt()||li())return!0;let e=dt();return e&&E(e)&&!P(e)?!1:!!(ci()||di()||ui())}var mi=["original","badge","dot","hole","bg"],vo=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge",default:!0},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],xo={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},gt="#FCFCFC",fi="#111111",ho="#111111",pi="#ffffff",gi="#212121",bi="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",hi={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},bt=32,yo=64;function Eo(e){return typeof e=="string"&&mi.includes(e)}function yi(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function ht(e){let t=document.createElement("canvas");t.width=bt,t.height=bt;let n=t.getContext("2d");return n?(n.scale(bt/yo,bt/yo),e(n),t.toDataURL("image/png")):""}function vi(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function yt(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(bi);n&&(e.strokeStyle=fi,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function xi(e,t,n){let o=xo[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=ho,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=ho,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=pi,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function Ce(e,t){if(e==="original")return t==="wait"?ht(o=>yt(o,gt)):yi(hi[t]);let n=t==="wait"?void 0:xo[t];return ht(e==="hole"?o=>yt(o,n??gt):e==="bg"?o=>{o.fillStyle=n??gi,vi(o,0,0,64,64,14),o.fill(),yt(o,gt,!1)}:o=>{yt(o,gt),t!=="wait"&&xi(o,t,e==="dot"?"dot":"badge")})}function So(e){return{wait:Ce(e,"wait"),rotate:Ce(e,"rotate"),done:Ce(e,"done"),ready:Ce(e,"ready"),error:Ce(e,"error")}}var Ei=new h("ChatStateFavicons"),oe="bloom-chat-state-favicon",To=T({style:{type:3,description:"Favicon overlay",options:vo}}),re="",en={wait:"",rotate:"",done:"",ready:"",error:""},tn="wait",Me=!1,N=!1,S=null,ke="",Ae="",Pe=!0,Te=null,ie=0,ne,vt=null,U=null,Qt=null,Re=!1,wo=new WeakSet,Si=400;function wi(){let e=To.store.style;return Eo(e)?e:"badge"}function Li(){let t=document.querySelector(`link[rel~="icon"]:not(#${oe})`)?.href;return te(t)?t:te(re)?re:""}function w(e){tn=e,Xt(oe,en[e])}function Lo(){en=So(wi()),w(tn)}function Ci(){let e=mt(),t=e?ft(e):ft("");return pt()?(!ke&&t&&(ke=t),ke||t):(ke="",t)}function Mo(){Me=!1,N=!1,S=null,ke=""}function Ti(e){Ae=e,Mo(),Pe=!1,w("wait")}function ko(){if(!Re)return;let e=mt()||location.pathname;if(Ae&&e&&Ae!==e){Ti(e);return}e&&(Ae=e);let t=Ci(),n=pt(),o=Ut(),r=Wt();if(Zt()&&!n){w("error"),Me=!1,N=!1,S=null;return}if(n){Me=!0,N=!1,S=t,w("rotate");return}if(Me){let i=!!S&&!!t&&S===t;if(Me=!1,i){N=!0,S=t,w("done");return}N=!1,S=null}if(N)if(!!(S&&t&&S!==t))N=!1,S=null;else if(o){w("done");return}else if(Pe){N=!1,w("ready");return}else{N=!1,w("wait");return}S=null,w(o?"wait":Pe?"ready":"wait")}function Ao(){let e=j();if(!(U&&Qt===e&&e.isConnected)){if(U?.disconnect(),Qt=e,!e||e===document.body){U=null;return}U=new MutationObserver(()=>xt()),U.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid","class"]})}}function xt(){!Re||ie||(ie=requestAnimationFrame(()=>{ie=0,Re&&(Po(),Ao(),ko())}))}function Co(){Pe=!0,xt()}function Po(){let e=G();!e||wo.has(e)||(wo.add(e),e.addEventListener("input",Co,{passive:!0}),e.addEventListener("compositionend",Co,{passive:!0}))}var Ro=v({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[k.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:To,startAt:"DOMContentLoaded",cleanupSelectors:[`#${oe}`],start(){Re=!0,re=Li()||re,Lo(),vt?.disconnect(),vt=bo(oe,e=>{te(e)&&(re=e),Xt(oe,en[tn])}),Te?.abort(),Te=new AbortController,window.addEventListener("popstate",xt,{signal:Te.signal}),Po(),Ao(),ne!==void 0&&clearInterval(ne),ne=setInterval(xt,Si),ko(),Ei.debug("favicon watch started")},stop(){Re=!1,ie&&cancelAnimationFrame(ie),ie=0,ne!==void 0&&(clearInterval(ne),ne=void 0),Te?.abort(),Te=null,U?.disconnect(),U=null,Qt=null,vt?.disconnect(),vt=null,Mo(),Ae="",Pe=!0,go(oe,re)},onSettingsChange:Lo});var Ho=`.bloom-ih-hud {
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
`;var Io=new h("InputHistory"),nn=/\u200B/g,No=10,Bo=500,Oo=100,ki=8,Ai=120,Pi=2e3,Et=10,St=T({maxEntries:{type:4,description:"Max stored prompts",min:No,max:Bo,default:Oo},history:{type:5,description:"Stored prompts",render:Vi},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),on=new Map,b=0,rn="",R=!1,Ie=!1,ln=0,He=null,an,cn=null,Do=!0;function L(){let e=St.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function _o(e){let t=wn(Number(St.store.maxEntries??Oo),No,Bo);return e.length>t?e.slice(e.length-t):e}function wt(e){St.store.entries=_o(e)}function Ri(e){return e.replaceAll(nn,"").replace(/\n$/,"").trim()}function sn(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(Q);return n instanceof HTMLElement?n:G()}function Hi(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!ee(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(nn,"").trim().length===0,last:i.toString().replaceAll(nn,"").trim().length===0}}catch{return{first:!0,last:!0}}}function qo(e,t){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch(i){Io.debug("pm caret failed:",i)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function Fo(e){clearTimeout(an),an=setTimeout(()=>{if(e!==ln)return;Ie=!1;let t=cn;t&&qo(t,Do)},Ai)}function jo(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),Ie=!0,cn=e,Do=n;let i=++ln;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(a){Io.debug("insertText failed:",a),e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),qo(e,n),Fo(i)}function Ii(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function ae(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Ni(){document.querySelector(".bloom-ih-hud")?.remove()}function Bi(e,t){let n=Ii();n.textContent=e;let o=(t.closest("form")??j()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-ki)}px`,n.classList.add("bloom-ih-hud-on")}function dn(e){let t=Ri(e);if(!t)return;let n=Date.now(),o=on.get(t);if(o&&n-o<Pi)return;on.set(t,n);let r=L().filter(i=>i!==t);r.push(t),wt(r),b=L().length,R=!1,ae()}function Oi(e,t){let n=L();if(!n.length&&e)return;b>=n.length&&(rn=ee(t),b=n.length);let o=e?b-1:b+1;o<0||o>n.length||(b=o,R=!0,jo(t,o===n.length?rn:n[o],e),o<n.length?Bi(`${o+1} / ${n.length}`,t):ae())}function Di(e){R=!1,ae(),jo(e,rn,!1),b=L().length}function _i(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=sn(e.target)??sn(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&R&&!e.altKey&&!e.shiftKey){Di(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){dn(ee(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=L();if(!o){let i=Hi(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||b<=0)||!n&&b>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),Oi(n,t))}function qi(e){if(sn(e.target)){if(Ie){Fo(ln);return}R&&(R=!1,ae(),b=L().length)}}function Fi(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(Q);n instanceof HTMLElement&&dn(ee(n))}function ji(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(ct);if(!n||!(n instanceof HTMLElement)||P(n))return;let o=G();o&&dn(ee(o))}function zi(e){if(!(!R||Ie)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}R=!1,ae()}}function $i(){if(He)return;He=new AbortController;let{signal:e}=He,t={capture:!0,signal:e};window.addEventListener("keydown",_i,t),window.addEventListener("input",qi,t),window.addEventListener("submit",Fi,t),window.addEventListener("click",ji,t),window.addEventListener("pointerdown",zi,t)}function Ki(e){let t=L().slice();t.splice(e,1),wt(t),b>t.length&&(b=t.length)}function Vi(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=L().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(y=>y.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/Et));n>=l&&(n=l-1);let g=s.slice(n*Et,n*Et+Et);e.replaceChildren();let c=document.createElement("input");if(c.className="bloom-ih-search",c.type="search",c.placeholder="Search history",c.autocomplete="off",c.value=t,c.addEventListener("input",()=>{t=c.value,n=0,r()}),e.appendChild(c),g.length){let y=document.createElement("div");y.className="bloom-ih-list",g.forEach((z,C)=>{let se=i.indexOf(z),tr=L().length-1-se,Ct=document.createElement("div");Ct.className="bloom-ih-item";let le=document.createElement("button");le.type="button",le.className=`bloom-ih-body${o===C?"":" bloom-ih-clamp"}`,le.textContent=z,le.addEventListener("click",()=>{o=o===C?-1:C,r()});let Tt=document.createElement("div");Tt.className="bloom-ih-actions";let ce=document.createElement("button");ce.type="button",ce.title="Copy",ce.textContent="C",ce.addEventListener("click",()=>{Cn(z)});let de=document.createElement("button");de.type="button",de.title="Delete",de.textContent="\xD7",de.addEventListener("click",()=>{Ki(tr),r()}),Tt.append(ce,de),Ct.append(le,Tt),y.appendChild(Ct)}),e.appendChild(y)}else{let y=document.createElement("p");y.className="bloom-ih-empty",y.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(y)}let p=document.createElement("div");p.className="bloom-ih-pager";let u=document.createElement("button");u.type="button",u.className="bloom-ih-btn",u.textContent="Prev",u.disabled=n<=0,u.addEventListener("click",()=>{n-=1,r()});let m=document.createElement("span");m.textContent=`${n+1} / ${l}`;let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Next",f.disabled=n+1>=l,f.addEventListener("click",()=>{n+=1,r()});let H=document.createElement("button");H.type="button",H.className="bloom-ih-clear",H.textContent="Clear all",H.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(wt([]),b=0,r())}),p.append(u,m,f,H),e.appendChild(p)};return r(),()=>{e.replaceChildren()}}var zo=v({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[k.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:St,startAt:"HostReady",managedStyle:"inputHistory",start(){O("inputHistory",Ho),b=L().length,R=!1,$i()},stop(){He?.abort(),He=null,ae(),Ni(),on.clear(),clearTimeout(an),Ie=!1,cn=null,R=!1},onSettingsChange(){let e=L(),t=_o(e);t.length!==e.length&&wt(t),b>t.length&&(b=t.length)}});var un="noShareLink",Gi=['button[data-testid="share-chat-button"]'],Ui=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],mn=T({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function $o(e){return`${e.join(",")}{display:none!important}`}function Ko(){let e=[];if(mn.store.hideShareChat!==!1&&e.push($o(Gi)),mn.store.hideShareProject!==!1&&e.push($o(Ui)),!e.length){$(un);return}O(un,e.join(`
`))}var Vo=v({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[k.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:mn,start:Ko,onSettingsChange:Ko,stop(){$(un)}});var Wo="noDictation",Wi=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]'],Yi=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Yo=T({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Go(e){return`${e.join(",")}{display:none!important}`}function Uo(){let e=[Go(Wi)];Yo.store.hideDictationSettings!==!1&&e.push(Go(Yi)),O(Wo,e.join(`
`))}var Jo=v({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[k.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Yo,start:Uo,onSettingsChange:Uo,stop(){$(Wo)}});var Ne=new h("Bloom"),Xo=!1,Ji=Date.now(),Xi=[ao,Ro,zo,Vo,Jo];function Lt(e){return new Promise(t=>setTimeout(t,e))}function Zi(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var Qo=8e3,Zo=300,Qi=250;async function ea(){if(K())return await Lt(Zo),!0;for(;Date.now()-Ji<Qo;)if(await Lt(Qi),K())return await Lt(Zo),!0;return K()||Rt()}function fn(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function ta(){if(fn())return!0;let e=Date.now()+Qo;for(;Date.now()<e;)if(await Lt(100),fn())return!0;return fn()}function na(){try{GM_registerMenuCommand?.("Bloom++ settings",io)}catch{}}function oa(){ze(()=>{ge("HostShell"),Ne.info("host shell",x)}),$e(()=>{Ne.info("idle ready",x)}),Ke(()=>{hn(),ge("HostReady"),Ne.info("chrome ready",x)})}async function pn(){await Tn()}async function gn(){if(Xo)return;Xo=!0;for(let n of Xi)try{Pn(n)}catch(o){Ne.error("register failed",n.name,o)}In(),ge("Init"),na(),oa();let e=()=>ge("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await Zi(),ta().then(n=>{n&&Ve()}),!await ea()){Ne.warn("late islands not detected; starting default plugins",x),J(),Ge();return}await qn()}var er=typeof unsafeWindow<"u"?unsafeWindow:window;if(window===window.top){let e=er.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",x);try{Object.defineProperty(er,"Bloom",{value:bn,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}pn().then(()=>gn()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
