// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260902] v1.4.15
// @description  Void++-style plugin host for chatgpt.com. Tab favicon, input history, recent chats, hide Share, Dictation, sidebar name, Download apps, and the mistake notice.
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

/* Bloom++ [20260902] v1.4.15. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var wi=Object.defineProperty;var Si=(e,t)=>{for(var n in t)wi(e,n,{get:t[n],enumerable:!0})};var lo={};Si(lo,{REPO_URL:()=>_o,Settings:()=>u,VERSION:()=>M,hasLateIslands:()=>re,init:()=>so,initSettings:()=>ao,isDocumentInteractive:()=>jo,plugins:()=>N,requestChromeReady:()=>xt,requestIdleReady:()=>pe,requestShellReady:()=>vt,whenChromeReady:()=>yt,whenIdleReady:()=>ht,whenShellReady:()=>bt});var W=new Map,st=!1;function Li(){return document.getElementById("bloom-root")?.shadowRoot??null}function Ci(){return document.head??null}function me(){let e=Li();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=Ti()}function ln(e,t){if(!st)return;let n=Ci();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),me();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,me();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,me()}function L(e,t){let n=W.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},W.set(e,n)),st&&ln(e,n)}function co(){st=!0;for(let[e,t]of W)ln(e,t);return me(),!0}function uo(e){let t=W.get(e);t&&(t.disabled=!1,st&&ln(e,t))}function mo(e){let t=W.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),me())}function C(e){let t=W.get(e);t&&(t.el?.remove(),W.delete(e),me())}function Ti(){return Array.from(W.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var v=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function y(e){return e}var cn=new Map;function lt(e,t){let n=cn.get(e);return n||(n=new Set,cn.set(e,n)),n.add(t),()=>n.delete(t)}function oe(e,t){let n=cn.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var ki="bloompp";function fo(){return new Promise((e,t)=>{let n=indexedDB.open(ki,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function po(e){try{let t=await fo();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function go(e,t){try{let n=await fo();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function He(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function bo(e,t,n){return Math.min(n,Math.max(t,e))}function ho(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function yo(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}var ct=new v("SettingsStore"),Y="BloomSettings",Mi=100;function ut(e){if(He(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(He(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return He(n)?n:null}return null}catch{return null}}var dt=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[d,c]of this.defaultGetters)if(l.startsWith(d)){let b=l.slice(d.length+1);if(b&&!b.includes(".")){let p=c(b);p!==void 0&&(i[a]=p,s=p);break}}}return He(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){ct.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Mi))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(Y,this.plain)}catch{try{GM_setValue(Y,t)}catch(n){ct.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(Y,t)}catch{}go(Y,t).catch(n=>ct.warn("Failed to save settings to IndexedDB:",n))}catch(t){ct.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){ho(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var Pi=new v("Settings"),Ai={plugins:{}},u=new dt(structuredClone(Ai)),Hi=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function Ri(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function x(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(u.store.plugins[n]||(u.store.plugins[n]={}),u.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?u.plain.plugins[n]??{}:{}}};return t}function Ii(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function vo(){let e=null;if(e=ut(Ii(Y)),e||(e=ut(await po(Y))),!e)try{e=ut(localStorage.getItem(Y))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(u.plain.plugins=t),Pi.debug("Loaded settings")}}function xo(e,t){t&&(t.pluginName=e,u.plain.plugins[e]||(u.plain.plugins[e]={}),u.setDefaultGetter(Hi(e),n=>{if(n!=="enabled")return Ri(t.def,n)}))}function Eo(){return u.plain.plugins.Settings||(u.store.plugins.Settings={}),u.store.plugins.Settings}function mt(){return Eo().pinnedPlugins??[]}function wo(e){return mt().includes(e)}function So(e){let t=mt(),n=t.includes(e);return u.store.plugins.Settings={...u.plain.plugins.Settings,pinnedPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}function ft(){return Eo().starredPlugins??[]}function Lo(e){return ft().includes(e)}function Co(e){let t=ft(),n=t.includes(e);return u.store.plugins.Settings={...u.plain.plugins.Settings,starredPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}var pt=new v("PluginManager"),N={},Re=new Set;function Mo(e){if(N[e.name]){pt.warn("Duplicate plugin",e.name);return}N[e.name]=e,xo(e.name,e.settings)}function fe(e){let t=N[e];if(!t)return!1;if(t.required)return!0;let n=u.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function Po(e){let t=N[e];if(!t||t.required)return;let n=!fe(e);u.plain.plugins[e]||(u.store.plugins[e]={}),u.store.plugins[e].enabled=n,n?Ao(t):Ni(t),oe("pluginToggle",{name:e,enabled:n})}function Ao(e,t=!1){if(!Re.has(e.name)&&fe(e.name))try{e.managedStyle&&uo(e.managedStyle),e.start?.(),Re.add(e.name),e.settings&&u.addPrefixChangeListener(`plugins.${e.name}.`,()=>{Re.has(e.name)&&e.onSettingsChange?.()}),t||pt.debug("Started",e.name)}catch(n){pt.error("Failed to start",e.name,n)}}function Ni(e){if(Re.has(e.name)){try{e.stop?.()}catch(t){pt.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(mo(e.managedStyle),C(e.managedStyle)),Re.delete(e.name)}}function Ie(e){for(let t of Object.values(N))(t.startAt??"DOMContentLoaded")===e&&Ao(t)}var To=2,ko="defaultsRev";function Ho(){for(let t of Object.values(N))u.plain.plugins[t.name]||(u.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=u.store.plugins.Settings??(u.store.plugins.Settings={});if(e[ko]!==To){for(let t of["NoShareLink","NoDictation"]){let n=u.store.plugins[t]??(u.store.plugins[t]={});n.enabled=!1}e[ko]=To}}var Ne=!1,gt=!1,dn=!1,Io=[],No=[],Bo=[];function un(e){let t=e.splice(0);for(let n of t)n()}function Be(){Ne||(Ne=!0,un(Io))}function mn(){gt||(gt=!0,Ne||Be(),un(No))}function Oo(){dn||(dn=!0,Ne||Be(),gt||mn(),un(Bo))}function bt(e){Ne?e():Io.push(e)}function ht(e){gt?e():No.push(e)}function yt(e){dn?e():Bo.push(e)}function vt(){Be()}function pe(){Be(),mn()}function xt(){Oo()}function Ro(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function Do(){await Ro(4e3),Be(),await Ro(4e3),mn(),Oo()}var E={p:"0-V-linuxdo"},M="[20260902] v1.4.15",_o="https://github.com/0-V-linuxdo/Bloom";function Bi(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Oi(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function fn(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function re(){return fn()?Bi()||Oi():!1}function jo(){return re()}var Di=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),qo=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),_i=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),ji="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function be(e){return e.id==="bloom-root"||!!e.closest(ji)}function Fo(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function Et(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function pn(e){if(!(e instanceof HTMLElement)||!e.isConnected||be(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&Et(t)?!1:e.getClientRects().length>0}function ge(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function qi(){let e=[];for(let t of document.querySelectorAll(Di))!(t instanceof HTMLElement)||!t.isConnected||be(t)||e.push(t);return e}function wt(e){if(!e.isConnected||be(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function Oe(){return qi().filter(wt)[0]??null}function gn(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||be(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function bn(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!be(n)&&!ge(n)&&n.parentElement&&!ge(n.parentElement)&&(t=n);let o=t.parentElement;if(o&&!ge(o)&&!be(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!ge(o.parentElement))return o}return t}function $o(){let e=document.querySelectorAll(qo);for(let n of e)if(pn(n)&&!Et(n)&&Fo(n))return n;let t=document.querySelectorAll(_i);for(let n of t){if(!pn(n)||!Fo(n)||Et(n))continue;let o=n.querySelector(qo);return pn(o)&&!Et(o)?o:n}return null}function zo(){let e=Oe();if(e){let t=bn(e),n=t.parentElement;if(n&&!ge(n))return n;if(!ge(t))return t}return gn()}function Ko(e){let t=Oe();return t?e.composedPath().includes(t):!1}var yn=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary"],Fi={light:{"--main-surface-primary":"#ffffff","--main-surface-secondary":"#f4f4f4","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#f9f9f9","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#b4b4b4","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.1)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.2)","--link":"#0d0d0d","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#f4f4f4","--bg-primary":"#ffffff","--bg-secondary":"#f4f4f4"},dark:{"--main-surface-primary":"#212121","--main-surface-secondary":"#2f2f2f","--main-surface-tertiary":"#424242","--sidebar-surface-primary":"#171717","--text-primary":"#ececec","--text-secondary":"#b4b4b4","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ececec","--icon-secondary":"#b4b4b4","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.1)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.2)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.06)","--interactive-label-primary-default":"#ececec","--message-surface":"#2f2f2f","--bg-primary":"#212121","--bg-secondary":"#2f2f2f"}};function $i(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function zi(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function hn(e){let t=$i(e);return t?zi(t)>.55?"light":"dark":null}function Ki(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=hn(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=hn(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=hn(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Go(e){return e==="auto"?Ki():e}function Gi(e){try{let t=getComputedStyle(document.documentElement);for(let n of yn){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function Vo(e,t,n){let o=Fi[t];if(n){Gi(e);for(let r of yn)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of yn)e.style.setProperty(r,o[r])}function Uo(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var vn=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover. */

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
`;var Ui="bloom-root",te="bloom-rail-item",kt="bloom-account-item",ye="bloom-sidebar-panel",Mt="bloom-settings-css",Wi=2e3,Yi=x({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),Ct=null,Ji=null,he=!1,Q=!1,Ln=[],St=null,Pt=null,Z=null,Tt=null,K=null,Fe=null,De,Bt=null,Ot=null,_e=null,At=null,Ht=null,B=null,je=null,Rt=null,Xo=null,qe=null,xn=[],Xi=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Zi=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],Dt="",$e="all",ee="all";function _t(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Wo(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Qi(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>'}function ea(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function ta(e){let t='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return e?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${t}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`}function na(e){let t='<path d="M12 17v5"/>';return e?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var oa={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function ra(e){return e.icon||oa[e.name]||_t()}function ia(){return"auto"}function En(){let e=ia(),t=Go(e);Ct&&(Ct.setAttribute("data-bloom-scheme",t),Vo(Ct,t,e==="auto")),oe("schemeChange",{scheme:t,pref:e})}function ze(e,t){e&&(e.hidden=t,e.toggleAttribute("inert",t),t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden"))}function Zo(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel").forEach(e=>e.remove())}function Qo(){if(L("settings",vn),document.getElementById(Mt)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=Mt,e.textContent=vn,document.head.appendChild(e)}function aa(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function er(){for(let e of Ln)e();Ln=[]}function tr(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function sa(e){return!!e.settings&&Object.keys(e.settings.def).length>0}function la(e,t,n){if(n.hidden)return null;if(n.type===5&&n.render){let a=document.createElement("details");a.className="bloom-field bloom-field-block";let s=document.createElement("summary");s.textContent=n.description||t;let l=document.createElement("div");return Ln.push(n.render(l)),a.append(s,l),a}let o=document.createElement("div");o.className=n.type===4?"bloom-field bloom-field-stack":"bloom-field";let r=document.createElement("span");r.className="bloom-field-label",r.textContent=n.description||t,o.appendChild(r);let i=u.store.plugins[e]??(u.store.plugins[e]={});if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??n.options.find(s=>s.default)?.value??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=tr(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),o.appendChild(a),o}return o}function Tn(){he=!1,er(),B&&B.replaceChildren(),ze(Ot,!0),ze(Bt,!1)}function ca(e){if(er(),he=!0,At&&(At.textContent=e.name),Ht&&(Ht.textContent=e.description),B){if(B.replaceChildren(),e.authors?.length){let t=document.createElement("p");t.className="bloom-plugin-authors",t.textContent=e.authors.join(", "),B.appendChild(t)}if(e.settings)for(let[t,n]of Object.entries(e.settings.def)){let o=la(e.name,t,n);o&&B.appendChild(o)}if(!B.querySelector(".bloom-field, .bloom-dialog-empty")){let t=document.createElement("p");t.className="bloom-dialog-empty",t.textContent="No configurable settings.",B.appendChild(t)}}ze(Bt,!0),ze(Ot,!1)}function da(e){let t=document.createElement("div");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=ra(e);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=e.name,a.title=e.name,r.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=Lo(e.name),d=document.createElement("button");if(d.type="button",d.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,d.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),d.innerHTML=ta(l),d.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation();let f=Co(e.name);oe("pluginStar",{name:e.name,starred:f})}),s.appendChild(d),!e.required){let m=wo(e.name),f=document.createElement("button");f.type="button",f.className=`bloom-icon-btn bloom-card-pin${m?" bloom-card-pin-active":""}`,f.setAttribute("aria-label",m?"Unpin from top":"Pin to top"),f.innerHTML=na(m),f.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();let q=So(e.name);oe("pluginPin",{name:e.name,pinned:q})}),s.appendChild(f)}if(sa(e)){let m=document.createElement("button");m.type="button",m.className="bloom-icon-btn bloom-card-settings",m.setAttribute("aria-label",`${e.name} settings`),m.innerHTML=ea(),m.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),ca(e)}),s.appendChild(m)}let c=tr(e.name,fe(e.name),!!e.required),b=c.querySelector("input");if(b?.addEventListener("click",m=>m.stopPropagation()),b?.addEventListener("change",()=>{Po(e.name)}),s.appendChild(c),o.append(r,s),n.appendChild(o),e.description){let m=document.createElement("div");m.className="bloom-card-desc",m.textContent=e.description,n.appendChild(m)}let p=document.createElement("div");p.className="bloom-card-separator";let h=document.createElement("div");h.className="bloom-card-footer";let g=document.createElement("div");return g.className="bloom-card-author",g.textContent=e.authors?.filter(Boolean).join(", ")||"\xA0",h.appendChild(g),t.append(n,p,h),t}function nr(){return Object.values(N).filter(e=>!e.hidden&&e.name!=="Settings")}function or(e,t){return t==="all"||t==="favorites"?!0:(e.tags??[]).includes(t)}function ua(e){return`${e.name} ${e.description??""} ${(e.tags??[]).join(" ")}`.toLowerCase()}function ma(){return Dt.trim()?"No plugins match your search.":ee==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function fa(){let e=nr();return Zi.filter(t=>t.id==="favorites"||t.id==="all"?!0:e.some(n=>or(n,t.id)))}function pa(){if(qe){qe.replaceChildren();for(let e of fa()){let t=document.createElement("button");t.type="button",t.className=`bloom-plugin-tab${ee===e.id?" bloom-plugin-tab-active":""}`,t.textContent=e.label,t.addEventListener("click",()=>{ee=e.id,ie()}),qe.appendChild(t)}}}function ga(){let e=nr();if(ee==="favorites"){let t=new Set(ft());e=e.filter(n=>t.has(n.name))}else ee!=="all"&&(e=e.filter(t=>or(t,ee)));return $e==="enabled"&&(e=e.filter(t=>fe(t.name))),$e==="disabled"&&(e=e.filter(t=>!fe(t.name))),e}function ie(){if(!_e)return;pa();let e=ga();Rt&&(Rt.placeholder=`Search ${e.length} plugins...`);let t=e,n=Dt.trim().toLowerCase();if(n&&(t=t.filter(o=>ua(o).includes(n))),ee!=="favorites"){let o=mt();if(o.length){let r=new Map(o.map((i,a)=>[i,a]));t=t.slice().sort((i,a)=>{let s=r.has(i.name),l=r.has(a.name);return s!==l?s?-1:1:s?(r.get(i.name)??0)-(r.get(a.name)??0):i.name.localeCompare(a.name)})}}_e.replaceChildren();for(let o of t)_e.appendChild(da(o));je&&(je.hidden=t.length>0,je.textContent=ma())}function wn(e){e.stopPropagation()}function Sn(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function kn(){document.getElementById(te)?.setAttribute("aria-expanded",Q?"true":"false")}function ba(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function It(){Tn(),Dt="",$e="all",ee="all",document.getElementById(ye)?.remove(),Q=!1,kn()}function ha(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",wn),t.addEventListener("pointerup",wn),t.addEventListener("click",wn);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=_t();let a=document.createElement("h2");a.textContent="Bloom++",r.append(i,a);let s=document.createElement("button");s.type="button",s.className="bloom-icon-btn",s.setAttribute("aria-label","Close"),s.innerHTML=Wo(),s.addEventListener("click",It),o.append(r,s),n.appendChild(o);let l=document.createElement("div");l.className="bloom-section-head";let d=document.createElement("h3");d.textContent="Plugins";let c=document.createElement("p");c.textContent="Turn Bloom++ features on or off. Sliders icon opens options.",l.append(d,c),n.appendChild(l);let b=document.createElement("div");b.className="bloom-plugin-tabs",n.appendChild(b);let p=document.createElement("div");p.className="bloom-search-bar";let h=document.createElement("input");h.type="search",h.className="bloom-search-input",h.setAttribute("aria-label","Search plugins"),h.placeholder="Search plugins...",h.addEventListener("input",()=>{Dt=h.value,ie()});let g=document.createElement("select");g.className="bloom-search-filter",g.setAttribute("aria-label","Filter plugins");for(let U of Xi){let sn=document.createElement("option");sn.value=U.value,sn.textContent=U.label,g.appendChild(sn)}g.value=$e,g.addEventListener("change",()=>{$e=g.value,ie()}),p.append(h,g),n.appendChild(p);let m=document.createElement("div");m.className="bloom-plugin-list",n.appendChild(m);let f=document.createElement("p");f.className="bloom-tab-empty",f.hidden=!0,n.appendChild(f);let T=document.createElement("div");T.className="bloom-settings-plugin",ze(T,!0);let q=document.createElement("div");q.className="bloom-settings-head";let V=document.createElement("button");V.type="button",V.className="bloom-icon-btn",V.setAttribute("aria-label","Back"),V.innerHTML=Qi(),V.addEventListener("click",Tn);let Ae=document.createElement("div");Ae.className="bloom-dialog-titles";let ue=document.createElement("h2"),F=document.createElement("p");F.className="bloom-settings-sub",Ae.append(ue,F);let I=document.createElement("button");I.type="button",I.className="bloom-icon-btn",I.setAttribute("aria-label","Close"),I.innerHTML=Wo(),I.addEventListener("click",It),q.append(V,Ae,I);let $=document.createElement("div");return $.className="bloom-plugin-settings",T.append(q,$),t.append(n,T),Bt=n,Ot=T,_e=m,At=ue,Ht=F,B=$,je=f,Rt=h,Xo=g,qe=b,ie(),t}function ya(e){e.classList.add("bloom-rail-dock")}function va(){let e=document.getElementById(te);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&wt(e)?e:null}function xa(){if(document.getElementById(ye)?.remove(),!document.body)return;let e=ha(ye);ya(e),document.body.appendChild(e),Q=!0,Tn(),kn(),oe("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:M,dock:"center",rail:!!va()})}function Mn(){let e=document.getElementById(ye);if(e instanceof HTMLElement&&e.isConnected&&ba(e)){It();return}e?.remove(),xa()}function Ea(){let e=document.createElement("button");return e.type="button",e.id=te,e.className="bloom-rail-item",e.setAttribute("aria-controls",ye),e.setAttribute("aria-expanded",Q?"true":"false"),e.innerHTML=`<span class="bloom-rail-mark">${_t()}</span><span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),Mn()}),e}function Yo(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function wa(e){let t=e.querySelector("img");if(t instanceof HTMLElement){let n=t.getBoundingClientRect();if(n.width>8&&n.height>8)return t}for(let n of e.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}return null}function Sa(e,t){for(let n of e.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||t&&(n===t||n.contains(t)||t.contains(n))||(n.textContent||"").trim().length<2)continue;let r=n.getBoundingClientRect();if(r.width>16&&r.height>8&&r.height<40)return n}return null}function X(e,t,n){let o=`${n}px`;e.style.getPropertyValue(t)!==o&&e.style.setProperty(t,o)}function rr(e,t){if(e.classList.contains("bloom-rail-compact"))return;let n=e.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!e.isConnected||!t.isConnected)return;let o=wa(t),r=getComputedStyle(t),i=Number.parseFloat(r.paddingTop),a=Number.parseFloat(r.paddingBottom);if(Number.isFinite(i)&&X(e,"padding-top",Math.round(i)),Number.isFinite(a)&&X(e,"padding-bottom",Math.round(a)),o){let s=o.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));X(n,"width",l),X(n,"height",Math.max(20,Math.round(s.height)));let d=e.getBoundingClientRect(),c=Math.round(s.left-d.left);c>=0&&c<=40&&X(e,"padding-left",c);let b=Sa(t,o);if(b){let p=b.getBoundingClientRect(),h=n.getBoundingClientRect(),g=Math.round(p.left-h.right);g>=0&&g<=24&&X(e,"gap",g)}}else{let s=Number.parseFloat(r.paddingLeft),l=Number.parseFloat(r.columnGap||r.gap);Number.isFinite(s)&&X(e,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&X(e,"gap",Math.round(l))}}function Jo(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function La(){if(Fe?.isConnected&&K){K.observe(Fe,{childList:!0});return}Cn()}function Nt(){if(document.body){K?.disconnect();try{let e=document.getElementById(te),t=e instanceof HTMLButtonElement?e:Ea(),n=Oe(),o=gn();if(n){let r=bn(n),i=r.parentElement;if(Jo(r)||i&&Jo(i))return;t.isConnected&&t.nextElementSibling===r||r.before(t),Yo(t),rr(t,n)}else o?(t.parentElement!==o&&o.appendChild(t),Yo(t,!0)):t.isConnected&&!wt(t)&&t.remove()}finally{La(),kn()}}}function Cn(){let e=zo();e&&(Fe===e&&K||(K?.disconnect(),Fe=e,K=new MutationObserver(()=>{document.getElementById(te)?.isConnected||Nt()}),K.observe(e,{childList:!0})))}function Ca(){Nt(),Cn(),De===void 0&&(De=window.setInterval(()=>{let e=document.getElementById(te);if(!(e instanceof HTMLElement)||!e.isConnected)Nt();else{let t=Oe();t&&rr(e,t)}Cn()},Wi))}function Ta(){De!==void 0&&(clearInterval(De),De=void 0),K?.disconnect(),K=null,Fe=null}function ka(e){Tt===e&&Z||(Z?.disconnect(),Tt=e,Z=new MutationObserver(()=>{if(!e.isConnected){Z?.disconnect(),Z=null,Tt=null;return}ir(e)}),Z.observe(e,{childList:!0}))}function ir(e){if(ka(e),e.querySelector(`#${kt}`))return;let t=document.createElement("button");t.type="button",t.id=kt,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${_t()}<span>Bloom++</span>`,t.addEventListener("pointerdown",Sn),t.addEventListener("pointerup",Sn),t.addEventListener("click",n=>{Sn(n),Mn()}),e.insertBefore(t,e.firstChild)}function Lt(){let e=$o();return e?(ir(e),!0):!1}function Ma(e){Ko(e)&&(queueMicrotask(Lt),requestAnimationFrame(()=>{Lt()}),window.setTimeout(Lt,60),window.setTimeout(Lt,180))}function Pa(){Pt?.abort();let e=new AbortController;Pt=e,document.addEventListener("click",Ma,{signal:e.signal})}function Aa(){Pt?.abort(),Pt=null,Z?.disconnect(),Z=null,Tt=null}function ar(){pe(),aa(()=>{Qo(),Zo(),Nt(),Mn()})}var sr=y({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[E.p],required:!0,hidden:!0,enabledByDefault:!0,settings:Yi,startAt:"HostReady",cleanupSelectors:[`#${Ui}`,`#${te}`,`#${kt}`,`#${ye}`,`#${Mt}`,"#bloom-menu-panel"],start(){Qo(),Zo(),Ca(),Pa(),St?.(),St=Uo(En),En(),xn=[lt("pluginToggle",()=>{Q&&!he&&ie()}),lt("pluginPin",()=>{Q&&!he&&ie()}),lt("pluginStar",()=>{Q&&!he&&ie()})]},stop(){Ta(),Aa(),St?.(),St=null;for(let e of xn)e();xn=[],It(),document.getElementById(te)?.remove(),document.getElementById(kt)?.remove(),document.getElementById(Mt)?.remove(),Ct=null,Ji=null,Bt=null,Ot=null,_e=null,At=null,Ht=null,B=null,je=null,Rt=null,Xo=null,qe=null,Q=!1,he=!1},onSettingsChange:En});var dr='form[data-type="unified-composer"], form.w-full[data-type]',ve=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),jt=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),lr=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),cr=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Ha=/stop streaming|stop generating|停止生成|停止输出|停止响应/;function P(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function ae(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!P(r)))return r;return null}function ur(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function O(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=ur(e);return!!(Ha.test(n)||/^stop$/i.test(n))}function ne(){let t=Array.from(document.querySelectorAll(dr)).find(P);if(t instanceof HTMLElement)return t;let n=ae(document,ve),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function se(){let e=Array.from(document.querySelectorAll(ve));return e.find(P)??e[0]??null}function Pn(){let e=se();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function Ra(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function mr(e){let t=ne();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!P(n))&&e(n))return n;return null}function qt(){let e=ne(),t=ae(e,jt)??ae(document,jt);return t&&!O(t)?t:mr(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!O(n);let r=ur(n);return/^(send|send prompt|发送)$/i.test(r)&&!O(n)})}function An(){let e=qt();return!!e&&Ra(e)}function Hn(){let e=ne(),t=ae(e,lr,!0)??ae(document,lr,!0);if(t)return t;let n=ae(e,cr)??ae(document,cr);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&P(o)&&O(o))return o}return mr(O)}function xe(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}var Rn=0;function fr(e){Rn+=1;try{e()}finally{Rn-=1}}function Ft(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function Ee(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function pr(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function Ia(e){let{head:t}=document;if(t)for(let n of Array.from(t.querySelectorAll("link")))n.id!==e&&Ft(n)&&n.remove()}function Na(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function In(e,t){let{head:n}=document;!n||!t||fr(()=>{Ia(e);let o=pr(e),{type:r,sizes:i}=Na(t);o?n.lastElementChild!==o&&n.appendChild(o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function gr(e,t){let{head:n}=document;n&&fr(()=>{pr(e)?.remove();let o=Array.from(n.querySelectorAll("link")).filter(Ft);if(o.length){Ee(t)&&o[0].href!==t&&(o[0].href=t);return}if(!Ee(t))return;let r=document.createElement("link");r.rel="icon",r.href=t,n.appendChild(r)})}function br(e,t){let{head:n}=document;if(!n)return null;let o=new MutationObserver(r=>{if(!Rn)for(let i of r){if(i.type==="attributes"&&Ft(i.target)){t(i.target.id===e?void 0:i.target.href);return}for(let a of i.addedNodes)if(Ft(a)&&a.id!==e){t(a.href);return}}});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}function we(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=d=>{let c=n.indexOf(d);return c>=0&&n[c+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(d,c)=>{try{return document.querySelector(d)?.getAttribute(c)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function $t(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function Ba(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!P(t))&&(O(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function Oa(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&P(e))}function Da(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&P(e))}function _a(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Nn(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function zt(){if(Hn()||Ba())return!0;let e=qt();return e&&P(e)&&!O(e)?!1:!!(Oa()||Da()||_a())}var ja=["original","badge","dot","hole","bg"],vr=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge",default:!0},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],xr={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Kt="#FCFCFC",qa="#111111",hr="#111111",Fa="#ffffff",$a="#212121",za="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Ka={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Gt=32,yr=64;function Er(e){return typeof e=="string"&&ja.includes(e)}function Ga(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function Vt(e){let t=document.createElement("canvas");t.width=Gt,t.height=Gt;let n=t.getContext("2d");return n?(n.scale(Gt/yr,Gt/yr),e(n),t.toDataURL("image/png")):""}function Va(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function Ut(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(za);n&&(e.strokeStyle=qa,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function Ua(e,t,n){let o=xr[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=hr,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=hr,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=Fa,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function Ke(e,t){if(e==="original")return t==="wait"?Vt(o=>Ut(o,Kt)):Ga(Ka[t]);let n=t==="wait"?void 0:xr[t];return Vt(e==="hole"?o=>Ut(o,n??Kt):e==="bg"?o=>{o.fillStyle=n??$a,Va(o,0,0,64,64,14),o.fill(),Ut(o,Kt,!1)}:o=>{Ut(o,Kt),t!=="wait"&&Ua(o,t,e==="dot"?"dot":"badge")})}function wr(e){return{wait:Ke(e,"wait"),rotate:Ke(e,"rotate"),done:Ke(e,"done"),ready:Ke(e,"ready"),error:Ke(e,"error")}}var Wa=new v("ChatStateFavicons"),Le="bloom-chat-state-favicon",Tr=x({style:{type:3,description:"Favicon overlay",options:vr}}),Ce="",On={wait:"",rotate:"",done:"",ready:"",error:""},Dn="wait",Ve=!1,G=!1,A=null,Ue="",We="",Ye=!0,Ge=null,Te=0,Se,Wt=null,le=null,Bn=null,Je=!1,Sr=new WeakSet,Ya=400;function Ja(){let e=Tr.store.style;return Er(e)?e:"badge"}function Xa(){let t=document.querySelector(`link[rel~="icon"]:not(#${Le})`)?.href;return Ee(t)?t:Ee(Ce)?Ce:""}function H(e){Dn=e,In(Le,On[e])}function Lr(){On=wr(Ja()),H(Dn)}function Za(){let e=we(),t=e?$t(e):$t("");return zt()?(!Ue&&t&&(Ue=t),Ue||t):(Ue="",t)}function kr(){Ve=!1,G=!1,A=null,Ue=""}function Qa(e){We=e,kr(),Ye=!1,H("wait")}function Mr(){if(!Je)return;let e=we()||location.pathname;if(We&&e&&We!==e){Qa(e);return}e&&(We=e);let t=Za(),n=zt(),o=Pn(),r=An();if(Nn()&&!n){H("error"),Ve=!1,G=!1,A=null;return}if(n){Ve=!0,G=!1,A=t,H("rotate");return}if(Ve){let i=!!A&&!!t&&A===t;if(Ve=!1,i){G=!0,A=t,H("done");return}G=!1,A=null}if(G)if(!!(A&&t&&A!==t))G=!1,A=null;else if(o){H("done");return}else if(Ye){G=!1,H("ready");return}else{G=!1,H("wait");return}A=null,H(o?"wait":Ye?"ready":"wait")}function Pr(){let e=ne();if(!(le&&Bn===e&&e.isConnected)){if(le?.disconnect(),Bn=e,!e||e===document.body){le=null;return}le=new MutationObserver(()=>Yt()),le.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid","class"]})}}function Yt(){!Je||Te||(Te=requestAnimationFrame(()=>{Te=0,Je&&(Ar(),Pr(),Mr())}))}function Cr(){Ye=!0,Yt()}function Ar(){let e=se();!e||Sr.has(e)||(Sr.add(e),e.addEventListener("input",Cr,{passive:!0}),e.addEventListener("compositionend",Cr,{passive:!0}))}var Hr=y({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[E.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Tr,startAt:"DOMContentLoaded",cleanupSelectors:[`#${Le}`],start(){Je=!0,Ce=Xa()||Ce,Lr(),Wt?.disconnect(),Wt=br(Le,e=>{Ee(e)&&(Ce=e),In(Le,On[Dn])}),Ge?.abort(),Ge=new AbortController,window.addEventListener("popstate",Yt,{signal:Ge.signal}),Ar(),Pr(),Se!==void 0&&clearInterval(Se),Se=setInterval(Yt,Ya),Mr(),Wa.debug("favicon watch started")},stop(){Je=!1,Te&&cancelAnimationFrame(Te),Te=0,Se!==void 0&&(clearInterval(Se),Se=void 0),Ge?.abort(),Ge=null,le?.disconnect(),le=null,Bn=null,Wt?.disconnect(),Wt=null,kr(),We="",Ye=!0,gr(Le,Ce)},onSettingsChange:Lr});var Rr=`.bloom-ih-hud {
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
`;var Ir=new v("InputHistory"),_n=/\u200B/g,Nr=10,Br=500,Or=100,ts=8,ns=120,os=2e3,Jt=10,Xt=x({maxEntries:{type:4,description:"Max stored prompts",min:Nr,max:Br,default:Or},history:{type:5,description:"Stored prompts",render:ys},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),jn=new Map,w=0,qn="",D=!1,Ze=!1,zn=0,Xe=null,Fn,Kn=null,Dr=!0;function R(){let e=Xt.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function _r(e){let t=bo(Number(Xt.store.maxEntries??Or),Nr,Br);return e.length>t?e.slice(e.length-t):e}function Zt(e){Xt.store.entries=_r(e)}function rs(e){return e.replaceAll(_n,"").replace(/\n$/,"").trim()}function $n(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(ve);return n instanceof HTMLElement?n:se()}function is(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!xe(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(_n,"").trim().length===0,last:i.toString().replaceAll(_n,"").trim().length===0}}catch{return{first:!0,last:!0}}}function jr(e,t){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch(i){Ir.debug("pm caret failed:",i)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function qr(e){clearTimeout(Fn),Fn=setTimeout(()=>{if(e!==zn)return;Ze=!1;let t=Kn;t&&jr(t,Dr)},ns)}function Fr(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),Ze=!0,Kn=e,Dr=n;let i=++zn;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(a){Ir.debug("insertText failed:",a),e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),jr(e,n),qr(i)}function as(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function ke(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function ss(){document.querySelector(".bloom-ih-hud")?.remove()}function ls(e,t){let n=as();n.textContent=e;let o=(t.closest("form")??ne()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-ts)}px`,n.classList.add("bloom-ih-hud-on")}function Gn(e){let t=rs(e);if(!t)return;let n=Date.now(),o=jn.get(t);if(o&&n-o<os)return;jn.set(t,n);let r=R().filter(i=>i!==t);r.push(t),Zt(r),w=R().length,D=!1,ke()}function cs(e,t){let n=R();if(!n.length&&e)return;w>=n.length&&(qn=xe(t),w=n.length);let o=e?w-1:w+1;o<0||o>n.length||(w=o,D=!0,Fr(t,o===n.length?qn:n[o],e),o<n.length?ls(`${o+1} / ${n.length}`,t):ke())}function ds(e){D=!1,ke(),Fr(e,qn,!1),w=R().length}function us(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=$n(e.target)??$n(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&D&&!e.altKey&&!e.shiftKey){ds(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){Gn(xe(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=R();if(!o){let i=is(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||w<=0)||!n&&w>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),cs(n,t))}function ms(e){if($n(e.target)){if(Ze){qr(zn);return}D&&(D=!1,ke(),w=R().length)}}function fs(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(ve);n instanceof HTMLElement&&Gn(xe(n))}function ps(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(jt);if(!n||!(n instanceof HTMLElement)||O(n))return;let o=se();o&&Gn(xe(o))}function gs(e){if(!(!D||Ze)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}D=!1,ke()}}function bs(){if(Xe)return;Xe=new AbortController;let{signal:e}=Xe,t={capture:!0,signal:e};window.addEventListener("keydown",us,t),window.addEventListener("input",ms,t),window.addEventListener("submit",fs,t),window.addEventListener("click",ps,t),window.addEventListener("pointerdown",gs,t)}function hs(e){let t=R().slice();t.splice(e,1),Zt(t),w>t.length&&(w=t.length)}function ys(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=R().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(f=>f.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/Jt));n>=l&&(n=l-1);let d=s.slice(n*Jt,n*Jt+Jt);e.replaceChildren();let c=document.createElement("input");if(c.className="bloom-ih-search",c.type="search",c.placeholder="Search history",c.autocomplete="off",c.value=t,c.addEventListener("input",()=>{t=c.value,n=0,r()}),e.appendChild(c),d.length){let f=document.createElement("div");f.className="bloom-ih-list",d.forEach((T,q)=>{let V=i.indexOf(T),Ae=R().length-1-V,ue=document.createElement("div");ue.className="bloom-ih-item";let F=document.createElement("button");F.type="button",F.className=`bloom-ih-body${o===q?"":" bloom-ih-clamp"}`,F.textContent=T,F.addEventListener("click",()=>{o=o===q?-1:q,r()});let I=document.createElement("div");I.className="bloom-ih-actions";let $=document.createElement("button");$.type="button",$.title="Copy",$.textContent="C",$.addEventListener("click",()=>{yo(T)});let U=document.createElement("button");U.type="button",U.title="Delete",U.textContent="\xD7",U.addEventListener("click",()=>{hs(Ae),r()}),I.append($,U),ue.append(F,I),f.appendChild(ue)}),e.appendChild(f)}else{let f=document.createElement("p");f.className="bloom-ih-empty",f.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(f)}let b=document.createElement("div");b.className="bloom-ih-pager";let p=document.createElement("button");p.type="button",p.className="bloom-ih-btn",p.textContent="Prev",p.disabled=n<=0,p.addEventListener("click",()=>{n-=1,r()});let h=document.createElement("span");h.textContent=`${n+1} / ${l}`;let g=document.createElement("button");g.type="button",g.className="bloom-ih-btn",g.textContent="Next",g.disabled=n+1>=l,g.addEventListener("click",()=>{n+=1,r()});let m=document.createElement("button");m.type="button",m.className="bloom-ih-clear",m.textContent="Clear all",m.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Zt([]),w=0,r())}),b.append(p,h,g,m),e.appendChild(b)};return r(),()=>{e.replaceChildren()}}var $r=y({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[E.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:Xt,startAt:"HostReady",managedStyle:"inputHistory",start(){L("inputHistory",Rr),w=R().length,D=!1,bs()},stop(){Xe?.abort(),Xe=null,ke(),ss(),jn.clear(),clearTimeout(Fn),Ze=!1,Kn=null,D=!1},onSettingsChange(){let e=R(),t=_r(e);t.length!==e.length&&Zt(t),w>t.length&&(w=t.length)}});var Vn="noShareLink",vs=['button[data-testid="share-chat-button"]'],xs=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],Un=x({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function zr(e){return`${e.join(",")}{display:none!important}`}function Kr(){let e=[];if(Un.store.hideShareChat!==!1&&e.push(zr(vs)),Un.store.hideShareProject!==!1&&e.push(zr(xs)),!e.length){C(Vn);return}L(Vn,e.join(`
`))}var Gr=y({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[E.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Un,start:Kr,onSettingsChange:Kr,stop(){C(Vn)}});var Wr="noDictation",Es=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]'],ws=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Yr=x({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Vr(e){return`${e.join(",")}{display:none!important}`}function Ur(){let e=[Vr(Es)];Yr.store.hideDictationSettings!==!1&&e.push(Vr(ws)),L(Wr,e.join(`
`))}var Jr=y({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[E.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Yr,start:Ur,onSettingsChange:Ur,stop(){C(Wr)}});var Wn="noSidebarIdentity",en=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],Qr=en.flatMap(e=>[`${e} .min-w-0 > .truncate`,`${e} .min-w-0.flex-1 .truncate`]),Ss=en.flatMap(e=>[`${e} .min-w-0 > span`,`${e} .min-w-0 > p`]),Ls=[...Qr,...Ss],Cs=en.map(e=>`${e} a[href^="mailto:"]`),Ts=en.flatMap(e=>[`${e} .min-w-0 > :not(.truncate)`,`${e} .min-w-0 > :not(.truncate) *`]),Qt=x({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0}});function Xr(e){return`${e.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function ks(){return`${Ts.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function Zr(){let e=Qt.store.hideUsername!==!1,t=Qt.store.hideEmail!==!1,n=e&&Qt.store.enlargePlan!==!1,o=[];if(e&&o.push(Xr(n?Qr:Ls)),t&&o.push(Xr(Cs)),n&&o.push(ks()),!o.length){C(Wn);return}L(Wn,o.join(`
`))}var ei=y({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[E.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Qt,start:Zr,onSettingsChange:Zr,stop(){C(Wn)}});var ti=`#bloom-rt-host {
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
`;var ri=new v("RecentTopics"),Pe="bloom-rt-host",ii="home",ai=/^\/c\/([a-z0-9_-]{8,})/i,Ps=/\/c\/([a-z0-9_-]{8,})/i,si=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,As=new Set(["Backquote","IntlBackslash"]),Hs=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Rs=140,Is=[3,4,5,6,7,8,9,10,11,12].map(e=>({label:String(e),value:String(e),default:e===5})),S=x({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Is},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),tn=null,Yn=null,k=!1,rt=!1,Qe=!1,_=0,ce="",Me=null,et=null;function Ns(){let e=Number(S.store.maxRecent??5);return Number.isFinite(e)&&e>=3&&e<=12?e:5}function tt(){let e=S.plain.visits;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Jn(){let e=S.plain.titles;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function li(){let e=S.plain.previews;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Xn(){let e=S.plain.projects;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function on(e){let t=Ns();return e.length>t?e.slice(0,t):e}function j(e){return e===ii}function nt(e,t=Rs){let n=e.replace(/\s+/g," ").trim();return n.length<=t?n:`${n.slice(0,t-1)}\u2026`}function Zn(e){if(!e)return"";try{return new URL(e,location.origin).pathname.match(ai)?.[1]??""}catch{return e.match(Ps)?.[1]??""}}function de(){let e=(location.pathname||"/").match(ai);if(e?.[1])return e[1];let n=we().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return ii}function Qn(e){if(j(e))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${e}"]`);for(let o of n){if(Zn(o.getAttribute("href")||"")!==e)continue;let r=nt(o.textContent||"",80);if(r)return r}}catch{}let t=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return de()===e&&t&&!/^ChatGPT$/i.test(t)?nt(t,80):""}function Bs(e){return j(e)?"New chat":Jn()[e]||Qn(e)||"Chat"}function Os(e){return Xn()[e]||""}function Ds(e){return li()[e]||{}}function ci(e,t){if(!e||j(e)||!t)return;let n=Jn();n[e]!==t&&(n[e]=t,S.store.titles=n)}function _s(e,t){if(!e||j(e)||!t)return;let n=Xn();n[e]!==t&&(n[e]=t,S.store.projects=n)}function js(e,t){if(!e||j(e)||!t.user&&!t.assistant)return;let n=li(),o=n[e]||{},r={user:t.user||o.user,assistant:t.assistant||o.assistant};o.user===r.user&&o.assistant===r.assistant||(n[e]=r,S.store.previews=n)}function eo(e){if(!e||j(e)&&S.store.includeHome===!1)return;let t=tt().filter(n=>n!==e);t.unshift(e),S.store.visits=on(t)}function rn(){let e=S.store.includeHome!==!1;return on(tt().filter(n=>e||!j(n))).map(n=>({id:n,title:Bs(n),project:Os(n),preview:Ds(n)}))}function ni(e){try{let t=document.querySelectorAll(`[data-message-author-role="${e}"]`),n=t[t.length-1];if(!(n instanceof HTMLElement))return"";let o=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||o.push(a)}let r=o.length?o.join(" "):n.textContent||"";return nt(r)}catch{return""}}function ot(e){if(!e||j(e)||e!==de())return;let t=Qn(e);t&&ci(e,t);let n=ni("user"),o=ni("assistant");js(e,{user:n,assistant:o});let r=ui(e);if(r){let i=di(r);i&&_s(e,i)}}function to(){let e=Jn(),t=Xn(),n=[],o=new Set,r=!1,i=!1;try{for(let d of document.querySelectorAll('a[href*="/c/"]')){if(d.closest(`#${Pe}, #bloom-root, #bloom-sidebar-panel`))continue;let c=Zn(d.getAttribute("href")||"");if(!c||o.has(c))continue;o.add(c),n.push(c);let b=nt(d.textContent||"",80);b&&!si.test(b)&&e[c]!==b&&(e[c]=b,r=!0);let p=di(d);p&&t[c]!==p&&(t[c]=p,i=!0)}}catch{}r&&(S.store.titles=e),i&&(S.store.projects=t);let a=tt(),s=new Set(a),l=n.filter(d=>!s.has(d));l.length&&(S.store.visits=on([...a,...l]))}function di(e){let t=e.parentElement;for(let n=0;n<10&&t;n++){if(t.id==="bloom-rt-host"||t.id==="bloom-root"){t=t.parentElement;continue}let o=t.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),r=nt((o instanceof HTMLElement?o.textContent:"")||"",60);if(r&&!si.test(r)&&!/^20\d{2}/.test(r)&&r!==e.textContent?.trim()&&t.querySelector('a[href^="/c/"]'))return r;t=t.parentElement}return""}function ui(e){if(j(e)){let t=document.querySelector('[data-testid="create-new-chat-button"]');return t instanceof HTMLAnchorElement?t:document.querySelector('a[href="/"]')}try{for(let t of document.querySelectorAll(`a[href*="/c/${e}"]`))if(Zn(t.getAttribute("href")||"")===e)return t}catch{}return null}function qs(e){let t=ui(e);if(t){t.click();return}if(j(e)){location.assign("/");return}location.assign(`/c/${e}`)}function nn(){let e=de();ce&&ce!==e&&ot(ce),ce=e,eo(e),to();let t=Qn(e);t&&ci(e,t),ot(e)}function Fs(){Me||(Me=history.pushState.bind(history),et=history.replaceState.bind(history),history.pushState=function(...t){let n=Me(...t);return nn(),n},history.replaceState=function(...t){let n=et(...t);return nn(),n})}function $s(){Me&&(history.pushState=Me),et&&(history.replaceState=et),Me=null,et=null}function zs(e){return As.has(e.code)||e.keyCode===192?!0:Hs.has(e.key)}function mi(e){return e.key==="Control"||e.code==="ControlLeft"||e.code==="ControlRight"}function Ks(e,t){rt=t,to(),ot(de()),k=!0,_=0;try{let n=de();eo(n);let o=rn();o.length>1&&(_=e?o.length-1:1)}catch(n){ri.error("Failed to open switcher:",n)}it()}function oi(e){let{length:t}=rn();t&&(_=(_+(e?-1:1)+t)%t,it())}function no(){if(!k)return;let e=rn()[_];k=!1,rt=!1,it(),e&&qs(e.id)}function fi(){k&&(k=!1,rt=!1,it())}function Gs(e){if(mi(e)){Qe=!0;return}if((e.ctrlKey||Qe)&&!e.altKey&&!e.metaKey&&zs(e)&&!e.repeat){e.preventDefault(),e.stopImmediatePropagation();try{k?oi(e.shiftKey):Ks(e.shiftKey,!0)}catch(n){ri.error("Hotkey failed:",n)}return}if(k){if(e.key==="Escape"){e.preventDefault(),fi();return}if(e.key==="Enter"&&!e.shiftKey){e.preventDefault(),no();return}e.key==="Tab"&&(e.ctrlKey||Qe)&&(e.preventDefault(),oi(e.shiftKey))}}function Vs(e){mi(e)&&(Qe=!1,k&&rt&&no())}function Us(e){let t=e.target instanceof Element?e.target:null;!t||!t.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(nn)}function Ws(e){!k||(e.target instanceof Element?e.target:null)?.closest(`#${Pe}`)||fi()}function Ys(){document.visibilityState==="hidden"&&ot(de())}function Js(){if(!document.body)return null;let e=document.getElementById(Pe);if(e instanceof HTMLElement)return Yn=e,e;e=document.createElement("div"),e.id=Pe;let t=document.createElement("div");return t.className="bloom-rt-panel",t.setAttribute("role","listbox"),t.setAttribute("aria-label","Recent conversations"),t.dataset.visible="false",t.addEventListener("click",n=>n.stopPropagation()),e.append(t),document.body.append(e),Yn=e,e}function it(){let e=Js();if(!e)return;let t=e.querySelector(".bloom-rt-panel");if(!t)return;if(!k){t.dataset.visible="false",t.replaceChildren();return}let n=rn();if(!n.length){t.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",t.replaceChildren(i);return}_>=n.length&&(_=0);let o=document.createElement("div");o.className="bloom-rt-list",o.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===_?"true":"false",s.setAttribute("aria-selected",a===_?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let d=document.createElement("div");d.className="bloom-rt-project",d.textContent=i.project,s.append(d)}if(i.preview.user||i.preview.assistant){let d=document.createElement("div");if(d.className="bloom-rt-preview",i.preview.user){let c=document.createElement("div");c.className="bloom-rt-line",c.dataset.role="user",c.textContent=i.preview.user,d.append(c)}if(i.preview.assistant){let c=document.createElement("div");c.className="bloom-rt-line",c.dataset.role="assistant",c.textContent=i.preview.assistant,d.append(c)}s.append(d)}s.addEventListener("click",()=>{_=a,no()}),o.append(s)}),t.replaceChildren(o),t.dataset.visible="true",t.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function Xs(){document.getElementById(Pe)?.remove(),Yn=null}var pi=y({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[E.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${Pe}`],settings:S,start(){L("recentTopics",ti),ce=de(),eo(ce),to(),ot(ce),Fs(),tn=new AbortController;let{signal:e}=tn;window.addEventListener("keydown",Gs,{capture:!0,signal:e}),window.addEventListener("keyup",Vs,{capture:!0,signal:e}),window.addEventListener("popstate",nn,{signal:e}),document.addEventListener("click",Us,{capture:!0,signal:e}),document.addEventListener("click",Ws,{signal:e}),document.addEventListener("visibilitychange",Ys,{signal:e})},stop(){tn?.abort(),tn=null,$s(),k=!1,rt=!1,Qe=!1,Xs()},onSettingsChange(){let e=on(tt());e.length!==tt().length&&(S.store.visits=e),k&&it()}});var oo="cleaner",Zs=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],Qs=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],ro=x({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0}});function gi(e){return`${e.join(",")}{display:none!important}`}function bi(){let e=[];if(ro.store.hideDownloadApps!==!1&&e.push(gi(Zs)),ro.store.hideDisclaimer!==!1&&e.push(gi(Qs)),!e.length){C(oo);return}L(oo,e.join(`
`))}var hi=y({name:"Cleaner",description:"Hide Download apps and the composer mistake notice.",authors:[E.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:ro,start:bi,onSettingsChange:bi,stop(){C(oo)}});var at=new v("Bloom"),yi=!1,el=Date.now(),tl=[sr,Hr,$r,Gr,Jr,ei,pi,hi];function an(e){return new Promise(t=>setTimeout(t,e))}function nl(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var xi=8e3,vi=300,ol=250;async function rl(){if(re())return await an(vi),!0;for(;Date.now()-el<xi;)if(await an(ol),re())return await an(vi),!0;return re()||fn()}function io(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function il(){if(io())return!0;let e=Date.now()+xi;for(;Date.now()<e;)if(await an(100),io())return!0;return io()}function al(){try{GM_registerMenuCommand?.("Bloom++ settings",ar)}catch{}}function sl(){bt(()=>{Ie("HostShell"),at.info("host shell",M)}),ht(()=>{at.info("idle ready",M)}),yt(()=>{co(),Ie("HostReady"),at.info("chrome ready",M)})}async function ao(){await vo()}async function so(){if(yi)return;yi=!0;for(let n of tl)try{Mo(n)}catch(o){at.error("register failed",n.name,o)}Ho(),Ie("Init"),al(),sl();let e=()=>Ie("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await nl(),il().then(n=>{n&&vt()}),!await rl()){at.warn("late islands not detected; starting default plugins",M),pe(),xt();return}await Do()}var Ei=typeof unsafeWindow<"u"?unsafeWindow:window,ll=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||ll){let e=Ei.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",M);try{Object.defineProperty(Ei,"Bloom",{value:lo,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}ao().then(()=>so()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
