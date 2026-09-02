// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260902] v1.4.8
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

/* Bloom++ [20260902] v1.4.8. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Wr=Object.defineProperty;var Yr=(e,t)=>{for(var n in t)Wr(e,n,{get:t[n],enumerable:!0})};var Vn={};Yr(Vn,{REPO_URL:()=>ho,Settings:()=>m,VERSION:()=>C,hasLateIslands:()=>J,init:()=>Gn,initSettings:()=>$n,isDocumentInteractive:()=>yo,plugins:()=>P,requestChromeReady:()=>lt,requestIdleReady:()=>oe,requestShellReady:()=>st,whenChromeReady:()=>at,whenIdleReady:()=>it,whenShellReady:()=>rt});var F=new Map,Xe=!1;function Jr(){return document.getElementById("bloom-root")?.shadowRoot??null}function Xr(){return document.head??null}function ne(){let e=Jr();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=Zr()}function Vt(e,t){if(!Xe)return;let n=Xr();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),ne();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,ne();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,ne()}function S(e,t){let n=F.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},F.set(e,n)),Xe&&Vt(e,n)}function Un(){Xe=!0;for(let[e,t]of F)Vt(e,t);return ne(),!0}function Wn(e){let t=F.get(e);t&&(t.disabled=!1,Xe&&Vt(e,t))}function Yn(e){let t=F.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),ne())}function R(e){let t=F.get(e);t&&(t.el?.remove(),F.delete(e),ne())}function Zr(){return Array.from(F.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var b=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function v(e){return e}var Qr=new Map;function we(e,t){let n=Qr.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var ei="bloompp";function Jn(){return new Promise((e,t)=>{let n=indexedDB.open(ei,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function Xn(e){try{let t=await Jn();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function Zn(e,t){try{let n=await Jn();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function Se(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Qn(e,t,n){return Math.min(n,Math.max(t,e))}function eo(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function to(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}var Ze=new b("SettingsStore"),z="BloomSettings",ti=100;function et(e){if(Se(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(Se(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return Se(n)?n:null}return null}catch{return null}}var Qe=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let c=n?`${n}.${a}`:a;for(let[u,l]of this.defaultGetters)if(c.startsWith(u)){let f=c.slice(u.length+1);if(f&&!f.includes(".")){let d=l(f);d!==void 0&&(i[a]=d,s=d);break}}}return Se(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let c=n?`${n}.${a}`:a;return this.notifyListeners(c),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Ze.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},ti))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(z,this.plain)}catch{try{GM_setValue(z,t)}catch(n){Ze.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(z,t)}catch{}Zn(z,t).catch(n=>Ze.warn("Failed to save settings to IndexedDB:",n))}catch(t){Ze.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){eo(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var ni=new b("Settings"),oi={plugins:{}},m=new Qe(structuredClone(oi)),ri=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function ii(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function x(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(m.store.plugins[n]||(m.store.plugins[n]={}),m.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?m.plain.plugins[n]??{}:{}}};return t}function ai(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function no(){let e=null;if(e=et(ai(z)),e||(e=et(await Xn(z))),!e)try{e=et(localStorage.getItem(z))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(m.plain.plugins=t),ni.debug("Loaded settings")}}function oo(e,t){t&&(t.pluginName=e,m.plain.plugins[e]||(m.plain.plugins[e]={}),m.setDefaultGetter(ri(e),n=>{if(n!=="enabled")return ii(t.def,n)}))}var tt=new b("PluginManager"),P={},Le=new Set;function ao(e){if(P[e.name]){tt.warn("Duplicate plugin",e.name);return}P[e.name]=e,oo(e.name,e.settings)}function nt(e){let t=P[e];if(!t)return!1;if(t.required)return!0;let n=m.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function so(e){let t=P[e];if(!t||t.required)return;let n=!nt(e);m.plain.plugins[e]||(m.store.plugins[e]={}),m.store.plugins[e].enabled=n,n?lo(t):si(t),we("pluginToggle",{name:e,enabled:n})}function lo(e,t=!1){if(!Le.has(e.name)&&nt(e.name))try{e.managedStyle&&Wn(e.managedStyle),e.start?.(),Le.add(e.name),e.settings&&m.addPrefixChangeListener(`plugins.${e.name}.`,()=>{Le.has(e.name)&&e.onSettingsChange?.()}),t||tt.debug("Started",e.name)}catch(n){tt.error("Failed to start",e.name,n)}}function si(e){if(Le.has(e.name)){try{e.stop?.()}catch(t){tt.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(Yn(e.managedStyle),R(e.managedStyle)),Le.delete(e.name)}}function Ce(e){for(let t of Object.values(P))(t.startAt??"DOMContentLoaded")===e&&lo(t)}var ro=2,io="defaultsRev";function co(){for(let t of Object.values(P))m.plain.plugins[t.name]||(m.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=m.store.plugins.Settings??(m.store.plugins.Settings={});if(e[io]!==ro){for(let t of["NoShareLink","NoDictation"]){let n=m.store.plugins[t]??(m.store.plugins[t]={});n.enabled=!1}e[io]=ro}}var Te=!1,ot=!1,Ut=!1,mo=[],fo=[],po=[];function Wt(e){let t=e.splice(0);for(let n of t)n()}function Me(){Te||(Te=!0,Wt(mo))}function Yt(){ot||(ot=!0,Te||Me(),Wt(fo))}function go(){Ut||(Ut=!0,Te||Me(),ot||Yt(),Wt(po))}function rt(e){Te?e():mo.push(e)}function it(e){ot?e():fo.push(e)}function at(e){Ut?e():po.push(e)}function st(){Me()}function oe(){Me(),Yt()}function lt(){go()}function uo(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function bo(){await uo(4e3),Me(),await uo(4e3),Yt(),go()}var E={p:"0-V-linuxdo"},C="[20260902] v1.4.8",ho="https://github.com/0-V-linuxdo/Bloom";function li(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function ci(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function Jt(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function J(){return Jt()?li()||ci():!1}function yo(){return J()}var ui=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),vo=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),di=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),mi="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function ie(e){return e.id==="bloom-root"||!!e.closest(mi)}function xo(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function ct(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function Xt(e){if(!(e instanceof HTMLElement)||!e.isConnected||ie(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&ct(t)?!1:e.getClientRects().length>0}function re(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function fi(){let e=[];for(let t of document.querySelectorAll(ui))!(t instanceof HTMLElement)||!t.isConnected||ie(t)||e.push(t);return e}function ut(e){if(!e.isConnected||ie(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function ke(){return fi().filter(ut)[0]??null}function Zt(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||ie(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function Qt(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!ie(n)&&!re(n)&&n.parentElement&&!re(n.parentElement)&&(t=n);let o=t.parentElement;if(o&&!re(o)&&!ie(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!re(o.parentElement))return o}return t}function Eo(){let e=document.querySelectorAll(vo);for(let n of e)if(Xt(n)&&!ct(n)&&xo(n))return n;let t=document.querySelectorAll(di);for(let n of t){if(!Xt(n)||!xo(n)||ct(n))continue;let o=n.querySelector(vo);return Xt(o)&&!ct(o)?o:n}return null}function wo(){let e=ke();if(e){let t=Qt(e),n=t.parentElement;if(n&&!re(n))return n;if(!re(t))return t}return Zt()}function So(e){let t=ke();return t?e.composedPath().includes(t):!1}var tn=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary"],pi={light:{"--main-surface-primary":"#ffffff","--main-surface-secondary":"#f4f4f4","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#f9f9f9","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#b4b4b4","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.1)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.2)","--link":"#0d0d0d","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#f4f4f4","--bg-primary":"#ffffff","--bg-secondary":"#f4f4f4"},dark:{"--main-surface-primary":"#212121","--main-surface-secondary":"#2f2f2f","--main-surface-tertiary":"#424242","--sidebar-surface-primary":"#171717","--text-primary":"#ececec","--text-secondary":"#b4b4b4","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ececec","--icon-secondary":"#b4b4b4","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.1)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.2)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.06)","--interactive-label-primary-default":"#ececec","--message-surface":"#2f2f2f","--bg-primary":"#212121","--bg-secondary":"#2f2f2f"}};function gi(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function bi(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function en(e){let t=gi(e);return t?bi(t)>.55?"light":"dark":null}function hi(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=en(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=en(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=en(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Lo(e){return e==="auto"?hi():e}function yi(e){try{let t=getComputedStyle(document.documentElement);for(let n of tn){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function Co(e,t,n){let o=pi[t];if(n){yi(e);for(let r of tn)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of tn)e.style.setProperty(r,o[r])}function To(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var nn=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover. */

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
`;var xi="bloom-root",V="bloom-rail-item",gt="bloom-account-item",ae="bloom-sidebar-panel",bt="bloom-settings-css",Ei=2e3,wi=x({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),ft=null,Si=null,cn=!1,Ie=!1,sn=[],dt=null,ht=null,G=null,pt=null,j=null,Re=null,Ae,wt=null,St=null,He=null,yt=null,vt=null,I=null;function Lt(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Mo(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Li(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>'}function Ci(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l-.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>'}var Ti={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>'};function Mi(e){return e.icon||Ti[e.name]||Lt()}function ki(){return"auto"}function on(){let e=ki(),t=Lo(e);ft&&(ft.setAttribute("data-bloom-scheme",t),Co(ft,t,e==="auto")),we("schemeChange",{scheme:t,pref:e})}function Pe(e,t){e&&(e.hidden=t,e.toggleAttribute("inert",t),t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden"))}function Ho(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel").forEach(e=>e.remove())}function Ro(){if(S("settings",nn),document.getElementById(bt)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=bt,e.textContent=nn,document.head.appendChild(e)}function Ai(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Po(){for(let e of sn)e();sn=[]}function Io(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function Hi(e){return!!e.settings&&Object.keys(e.settings.def).length>0}function Ri(e,t,n){if(n.hidden)return null;if(n.type===5&&n.render){let a=document.createElement("details");a.className="bloom-field bloom-field-block";let s=document.createElement("summary");s.textContent=n.description||t;let c=document.createElement("div");return sn.push(n.render(c)),a.append(s,c),a}let o=document.createElement("div");o.className=n.type===4?"bloom-field bloom-field-stack":"bloom-field";let r=document.createElement("span");r.className="bloom-field-label",r.textContent=n.description||t,o.appendChild(r);let i=m.store.plugins[e]??(m.store.plugins[e]={});if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let c=document.createElement("option");c.value=s.value,c.textContent=s.label,a.appendChild(c)}return a.value=String(i[t]??n.options.find(s=>s.default)?.value??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??n.min??0);let c=document.createElement("span");return c.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),c.textContent=s.value}),a.append(s,c),o.appendChild(a),o}if(n.type===2){let a=Io(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),o.appendChild(a),o}return o}function un(){cn=!1,Po(),I&&I.replaceChildren(),Pe(St,!0),Pe(wt,!1)}function Pi(e){if(Po(),cn=!0,yt&&(yt.textContent=e.name),vt&&(vt.textContent=e.description),I){if(I.replaceChildren(),e.authors?.length){let t=document.createElement("p");t.className="bloom-plugin-authors",t.textContent=e.authors.join(", "),I.appendChild(t)}if(e.settings)for(let[t,n]of Object.entries(e.settings.def)){let o=Ri(e.name,t,n);o&&I.appendChild(o)}if(!I.querySelector(".bloom-field, .bloom-dialog-empty")){let t=document.createElement("p");t.className="bloom-dialog-empty",t.textContent="No configurable settings.",I.appendChild(t)}}Pe(wt,!0),Pe(St,!1)}function Ii(e){let t=document.createElement("div");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Mi(e);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=e.name,a.title=e.name,r.append(i,a);let s=document.createElement("div");if(s.className="bloom-card-controls",Hi(e)){let p=document.createElement("button");p.type="button",p.className="bloom-icon-btn",p.setAttribute("aria-label",`${e.name} settings`),p.innerHTML=Ci(),p.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation(),Pi(e)}),s.appendChild(p)}let c=Io(e.name,nt(e.name),!!e.required),u=c.querySelector("input");if(u?.addEventListener("click",p=>p.stopPropagation()),u?.addEventListener("change",()=>{so(e.name)}),s.appendChild(c),o.append(r,s),n.appendChild(o),e.description){let p=document.createElement("div");p.className="bloom-card-desc",p.textContent=e.description,n.appendChild(p)}let l=document.createElement("div");l.className="bloom-card-separator";let f=document.createElement("div");f.className="bloom-card-footer";let d=document.createElement("div");return d.className="bloom-card-author",d.textContent=e.authors?.filter(Boolean).join(", ")||"\xA0",f.appendChild(d),t.append(n,l,f),t}function Ni(){if(He){He.replaceChildren();for(let e of Object.values(P))e.hidden||e.name==="Settings"||He.appendChild(Ii(e))}}function rn(e){e.stopPropagation()}function an(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function dn(){document.getElementById(V)?.setAttribute("aria-expanded",Ie?"true":"false")}function Bi(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function xt(){un(),document.getElementById(ae)?.remove(),Ie=!1,dn()}function Oi(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",rn),t.addEventListener("pointerup",rn),t.addEventListener("click",rn);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=Lt();let a=document.createElement("h2");a.textContent="Bloom++",r.append(i,a);let s=document.createElement("button");s.type="button",s.className="bloom-icon-btn",s.setAttribute("aria-label","Close"),s.innerHTML=Mo(),s.addEventListener("click",xt),o.append(r,s),n.appendChild(o);let c=document.createElement("div");c.className="bloom-section-head";let u=document.createElement("h3");u.textContent="Plugins";let l=document.createElement("p");l.textContent="Toggle plugins. Gear opens options.",c.append(u,l),n.appendChild(c);let f=document.createElement("div");f.className="bloom-plugin-list",n.appendChild(f);let d=document.createElement("div");d.className="bloom-settings-plugin",Pe(d,!0);let p=document.createElement("div");p.className="bloom-settings-head";let g=document.createElement("button");g.type="button",g.className="bloom-icon-btn",g.setAttribute("aria-label","Back"),g.innerHTML=Li(),g.addEventListener("click",un);let _=document.createElement("div");_.className="bloom-dialog-titles";let w=document.createElement("h2"),W=document.createElement("p");W.className="bloom-settings-sub",_.append(w,W);let H=document.createElement("button");H.type="button",H.className="bloom-icon-btn",H.setAttribute("aria-label","Close"),H.innerHTML=Mo(),H.addEventListener("click",xt),p.append(g,_,H);let ye=document.createElement("div");return ye.className="bloom-plugin-settings",d.append(p,ye),t.append(n,d),wt=n,St=d,He=f,yt=w,vt=W,I=ye,Ni(),t}function Di(e){e.classList.add("bloom-rail-dock")}function _i(){let e=document.getElementById(V);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&ut(e)?e:null}function ji(){if(document.getElementById(ae)?.remove(),!document.body)return;let e=Oi(ae);Di(e),document.body.appendChild(e),Ie=!0,un(),dn(),we("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:C,dock:"body",rail:!!_i()})}function mn(){let e=document.getElementById(ae);if(e instanceof HTMLElement&&e.isConnected&&Bi(e)){xt();return}e?.remove(),ji()}function qi(){let e=document.createElement("button");return e.type="button",e.id=V,e.className="bloom-rail-item",e.setAttribute("aria-controls",ae),e.setAttribute("aria-expanded",Ie?"true":"false"),e.innerHTML=`<span class="bloom-rail-mark">${Lt()}</span><span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),mn()}),e}function ko(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function Fi(e){let t=e.querySelector("img");if(t instanceof HTMLElement){let n=t.getBoundingClientRect();if(n.width>8&&n.height>8)return t}for(let n of e.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}return null}function zi(e,t){for(let n of e.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||t&&(n===t||n.contains(t)||t.contains(n))||(n.textContent||"").trim().length<2)continue;let r=n.getBoundingClientRect();if(r.width>16&&r.height>8&&r.height<40)return n}return null}function $(e,t,n){let o=`${n}px`;e.style.getPropertyValue(t)!==o&&e.style.setProperty(t,o)}function No(e,t){if(e.classList.contains("bloom-rail-compact"))return;let n=e.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!e.isConnected||!t.isConnected)return;let o=Fi(t),r=getComputedStyle(t),i=Number.parseFloat(r.paddingTop),a=Number.parseFloat(r.paddingBottom);if(Number.isFinite(i)&&$(e,"padding-top",Math.round(i)),Number.isFinite(a)&&$(e,"padding-bottom",Math.round(a)),o){let s=o.getBoundingClientRect(),c=Math.max(20,Math.round(s.width));$(n,"width",c),$(n,"height",Math.max(20,Math.round(s.height)));let u=e.getBoundingClientRect(),l=Math.round(s.left-u.left);l>=0&&l<=40&&$(e,"padding-left",l);let f=zi(t,o);if(f){let d=f.getBoundingClientRect(),p=n.getBoundingClientRect(),g=Math.round(d.left-p.right);g>=0&&g<=24&&$(e,"gap",g)}}else{let s=Number.parseFloat(r.paddingLeft),c=Number.parseFloat(r.columnGap||r.gap);Number.isFinite(s)&&$(e,"padding-left",Math.round(s)),Number.isFinite(c)&&c>0&&$(e,"gap",Math.round(c))}}function Ao(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Ki(){if(Re?.isConnected&&j){j.observe(Re,{childList:!0});return}ln()}function Et(){if(document.body){j?.disconnect();try{let e=document.getElementById(V),t=e instanceof HTMLButtonElement?e:qi(),n=ke(),o=Zt();if(n){let r=Qt(n),i=r.parentElement;if(Ao(r)||i&&Ao(i))return;t.isConnected&&t.nextElementSibling===r||r.before(t),ko(t),No(t,n)}else o?(t.parentElement!==o&&o.appendChild(t),ko(t,!0)):t.isConnected&&!ut(t)&&t.remove()}finally{Ki(),dn()}}}function ln(){let e=wo();e&&(Re===e&&j||(j?.disconnect(),Re=e,j=new MutationObserver(()=>{document.getElementById(V)?.isConnected||Et()}),j.observe(e,{childList:!0})))}function $i(){Et(),ln(),Ae===void 0&&(Ae=window.setInterval(()=>{let e=document.getElementById(V);if(!(e instanceof HTMLElement)||!e.isConnected)Et();else{let t=ke();t&&No(e,t)}ln()},Ei))}function Gi(){Ae!==void 0&&(clearInterval(Ae),Ae=void 0),j?.disconnect(),j=null,Re=null}function Vi(e){pt===e&&G||(G?.disconnect(),pt=e,G=new MutationObserver(()=>{if(!e.isConnected){G?.disconnect(),G=null,pt=null;return}Bo(e)}),G.observe(e,{childList:!0}))}function Bo(e){if(Vi(e),e.querySelector(`#${gt}`))return;let t=document.createElement("button");t.type="button",t.id=gt,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${Lt()}<span>Bloom++</span>`,t.addEventListener("pointerdown",an),t.addEventListener("pointerup",an),t.addEventListener("click",n=>{an(n),mn()}),e.insertBefore(t,e.firstChild)}function mt(){let e=Eo();return e?(Bo(e),!0):!1}function Ui(e){So(e)&&(queueMicrotask(mt),requestAnimationFrame(()=>{mt()}),window.setTimeout(mt,60),window.setTimeout(mt,180))}function Wi(){ht?.abort();let e=new AbortController;ht=e,document.addEventListener("click",Ui,{signal:e.signal})}function Yi(){ht?.abort(),ht=null,G?.disconnect(),G=null,pt=null}function Oo(){oe(),Ai(()=>{Ro(),Ho(),Et(),mn()})}var Do=v({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[E.p],required:!0,hidden:!0,enabledByDefault:!0,settings:wi,startAt:"HostReady",cleanupSelectors:[`#${xi}`,`#${V}`,`#${gt}`,`#${ae}`,`#${bt}`,"#bloom-menu-panel"],start(){Ro(),Ho(),$i(),Wi(),dt?.(),dt=To(on),on()},stop(){Gi(),Yi(),dt?.(),dt=null,xt(),document.getElementById(V)?.remove(),document.getElementById(gt)?.remove(),document.getElementById(bt)?.remove(),ft=null,Si=null,wt=null,St=null,He=null,yt=null,vt=null,I=null,Ie=!1,cn=!1},onSettingsChange:on});var qo='form[data-type="unified-composer"], form.w-full[data-type]',se=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Ct=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),_o=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),jo=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Ji=/stop streaming|stop generating|停止生成|停止输出|停止响应/;function T(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function X(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!T(r)))return r;return null}function Fo(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function N(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=Fo(e);return!!(Ji.test(n)||/^stop$/i.test(n))}function U(){let t=Array.from(document.querySelectorAll(qo)).find(T);if(t instanceof HTMLElement)return t;let n=X(document,se),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function Z(){let e=Array.from(document.querySelectorAll(se));return e.find(T)??e[0]??null}function fn(){let e=Z();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function Xi(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function zo(e){let t=U();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!T(n))&&e(n))return n;return null}function Tt(){let e=U(),t=X(e,Ct)??X(document,Ct);return t&&!N(t)?t:zo(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!N(n);let r=Fo(n);return/^(send|send prompt|发送)$/i.test(r)&&!N(n)})}function pn(){let e=Tt();return!!e&&Xi(e)}function gn(){let e=U(),t=X(e,_o,!0)??X(document,_o,!0);if(t)return t;let n=X(e,jo)??X(document,jo);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&T(o)&&N(o))return o}return zo(N)}function le(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}var bn=0;function Ko(e){bn+=1;try{e()}finally{bn-=1}}function Mt(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function ce(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function $o(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function Zi(e){let{head:t}=document;if(t)for(let n of Array.from(t.querySelectorAll("link")))n.id!==e&&Mt(n)&&n.remove()}function Qi(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function hn(e,t){let{head:n}=document;!n||!t||Ko(()=>{Zi(e);let o=$o(e),{type:r,sizes:i}=Qi(t);o?n.lastElementChild!==o&&n.appendChild(o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function Go(e,t){let{head:n}=document;n&&Ko(()=>{$o(e)?.remove();let o=Array.from(n.querySelectorAll("link")).filter(Mt);if(o.length){ce(t)&&o[0].href!==t&&(o[0].href=t);return}if(!ce(t))return;let r=document.createElement("link");r.rel="icon",r.href=t,n.appendChild(r)})}function Vo(e,t){let{head:n}=document;if(!n)return null;let o=new MutationObserver(r=>{if(!bn)for(let i of r){if(i.type==="attributes"&&Mt(i.target)){t(i.target.id===e?void 0:i.target.href);return}for(let a of i.addedNodes)if(Mt(a)&&a.id!==e){t(a.href);return}}});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}function ue(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=u=>{let l=n.indexOf(u);return l>=0&&n[l+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(u,l)=>{try{return document.querySelector(u)?.getAttribute(l)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function kt(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function ea(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!T(t))&&(N(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function ta(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&T(e))}function na(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&T(e))}function oa(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function yn(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function At(){if(gn()||ea())return!0;let e=Tt();return e&&T(e)&&!N(e)?!1:!!(ta()||na()||oa())}var ra=["original","badge","dot","hole","bg"],Yo=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge",default:!0},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],Jo={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Ht="#FCFCFC",ia="#111111",Uo="#111111",aa="#ffffff",sa="#212121",la="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",ca={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Rt=32,Wo=64;function Xo(e){return typeof e=="string"&&ra.includes(e)}function ua(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function Pt(e){let t=document.createElement("canvas");t.width=Rt,t.height=Rt;let n=t.getContext("2d");return n?(n.scale(Rt/Wo,Rt/Wo),e(n),t.toDataURL("image/png")):""}function da(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function It(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(la);n&&(e.strokeStyle=ia,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function ma(e,t,n){let o=Jo[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=Uo,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=Uo,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=aa,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function Ne(e,t){if(e==="original")return t==="wait"?Pt(o=>It(o,Ht)):ua(ca[t]);let n=t==="wait"?void 0:Jo[t];return Pt(e==="hole"?o=>It(o,n??Ht):e==="bg"?o=>{o.fillStyle=n??sa,da(o,0,0,64,64,14),o.fill(),It(o,Ht,!1)}:o=>{It(o,Ht),t!=="wait"&&ma(o,t,e==="dot"?"dot":"badge")})}function Zo(e){return{wait:Ne(e,"wait"),rotate:Ne(e,"rotate"),done:Ne(e,"done"),ready:Ne(e,"ready"),error:Ne(e,"error")}}var fa=new b("ChatStateFavicons"),me="bloom-chat-state-favicon",nr=x({style:{type:3,description:"Favicon overlay",options:Yo}}),fe="",xn={wait:"",rotate:"",done:"",ready:"",error:""},En="wait",Oe=!1,q=!1,M=null,De="",_e="",je=!0,Be=null,pe=0,de,Nt=null,Q=null,vn=null,qe=!1,Qo=new WeakSet,pa=400;function ga(){let e=nr.store.style;return Xo(e)?e:"badge"}function ba(){let t=document.querySelector(`link[rel~="icon"]:not(#${me})`)?.href;return ce(t)?t:ce(fe)?fe:""}function k(e){En=e,hn(me,xn[e])}function er(){xn=Zo(ga()),k(En)}function ha(){let e=ue(),t=e?kt(e):kt("");return At()?(!De&&t&&(De=t),De||t):(De="",t)}function or(){Oe=!1,q=!1,M=null,De=""}function ya(e){_e=e,or(),je=!1,k("wait")}function rr(){if(!qe)return;let e=ue()||location.pathname;if(_e&&e&&_e!==e){ya(e);return}e&&(_e=e);let t=ha(),n=At(),o=fn(),r=pn();if(yn()&&!n){k("error"),Oe=!1,q=!1,M=null;return}if(n){Oe=!0,q=!1,M=t,k("rotate");return}if(Oe){let i=!!M&&!!t&&M===t;if(Oe=!1,i){q=!0,M=t,k("done");return}q=!1,M=null}if(q)if(!!(M&&t&&M!==t))q=!1,M=null;else if(o){k("done");return}else if(je){q=!1,k("ready");return}else{q=!1,k("wait");return}M=null,k(o?"wait":je?"ready":"wait")}function ir(){let e=U();if(!(Q&&vn===e&&e.isConnected)){if(Q?.disconnect(),vn=e,!e||e===document.body){Q=null;return}Q=new MutationObserver(()=>Bt()),Q.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid","class"]})}}function Bt(){!qe||pe||(pe=requestAnimationFrame(()=>{pe=0,qe&&(ar(),ir(),rr())}))}function tr(){je=!0,Bt()}function ar(){let e=Z();!e||Qo.has(e)||(Qo.add(e),e.addEventListener("input",tr,{passive:!0}),e.addEventListener("compositionend",tr,{passive:!0}))}var sr=v({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[E.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:nr,startAt:"DOMContentLoaded",cleanupSelectors:[`#${me}`],start(){qe=!0,fe=ba()||fe,er(),Nt?.disconnect(),Nt=Vo(me,e=>{ce(e)&&(fe=e),hn(me,xn[En])}),Be?.abort(),Be=new AbortController,window.addEventListener("popstate",Bt,{signal:Be.signal}),ar(),ir(),de!==void 0&&clearInterval(de),de=setInterval(Bt,pa),rr(),fa.debug("favicon watch started")},stop(){qe=!1,pe&&cancelAnimationFrame(pe),pe=0,de!==void 0&&(clearInterval(de),de=void 0),Be?.abort(),Be=null,Q?.disconnect(),Q=null,vn=null,Nt?.disconnect(),Nt=null,or(),_e="",je=!0,Go(me,fe)},onSettingsChange:er});var lr=`.bloom-ih-hud {
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
`;var cr=new b("InputHistory"),wn=/\u200B/g,ur=10,dr=500,mr=100,xa=8,Ea=120,wa=2e3,Ot=10,Dt=x({maxEntries:{type:4,description:"Max stored prompts",min:ur,max:dr,default:mr},history:{type:5,description:"Stored prompts",render:Da},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Sn=new Map,h=0,Ln="",B=!1,ze=!1,Mn=0,Fe=null,Cn,kn=null,fr=!0;function A(){let e=Dt.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function pr(e){let t=Qn(Number(Dt.store.maxEntries??mr),ur,dr);return e.length>t?e.slice(e.length-t):e}function _t(e){Dt.store.entries=pr(e)}function Sa(e){return e.replaceAll(wn,"").replace(/\n$/,"").trim()}function Tn(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(se);return n instanceof HTMLElement?n:Z()}function La(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!le(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(wn,"").trim().length===0,last:i.toString().replaceAll(wn,"").trim().length===0}}catch{return{first:!0,last:!0}}}function gr(e,t){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch(i){cr.debug("pm caret failed:",i)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function br(e){clearTimeout(Cn),Cn=setTimeout(()=>{if(e!==Mn)return;ze=!1;let t=kn;t&&gr(t,fr)},Ea)}function hr(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),ze=!0,kn=e,fr=n;let i=++Mn;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(a){cr.debug("insertText failed:",a),e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),gr(e,n),br(i)}function Ca(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function ge(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Ta(){document.querySelector(".bloom-ih-hud")?.remove()}function Ma(e,t){let n=Ca();n.textContent=e;let o=(t.closest("form")??U()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-xa)}px`,n.classList.add("bloom-ih-hud-on")}function An(e){let t=Sa(e);if(!t)return;let n=Date.now(),o=Sn.get(t);if(o&&n-o<wa)return;Sn.set(t,n);let r=A().filter(i=>i!==t);r.push(t),_t(r),h=A().length,B=!1,ge()}function ka(e,t){let n=A();if(!n.length&&e)return;h>=n.length&&(Ln=le(t),h=n.length);let o=e?h-1:h+1;o<0||o>n.length||(h=o,B=!0,hr(t,o===n.length?Ln:n[o],e),o<n.length?Ma(`${o+1} / ${n.length}`,t):ge())}function Aa(e){B=!1,ge(),hr(e,Ln,!1),h=A().length}function Ha(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=Tn(e.target)??Tn(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&B&&!e.altKey&&!e.shiftKey){Aa(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){An(le(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=A();if(!o){let i=La(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||h<=0)||!n&&h>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),ka(n,t))}function Ra(e){if(Tn(e.target)){if(ze){br(Mn);return}B&&(B=!1,ge(),h=A().length)}}function Pa(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(se);n instanceof HTMLElement&&An(le(n))}function Ia(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(Ct);if(!n||!(n instanceof HTMLElement)||N(n))return;let o=Z();o&&An(le(o))}function Na(e){if(!(!B||ze)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}B=!1,ge()}}function Ba(){if(Fe)return;Fe=new AbortController;let{signal:e}=Fe,t={capture:!0,signal:e};window.addEventListener("keydown",Ha,t),window.addEventListener("input",Ra,t),window.addEventListener("submit",Pa,t),window.addEventListener("click",Ia,t),window.addEventListener("pointerdown",Na,t)}function Oa(e){let t=A().slice();t.splice(e,1),_t(t),h>t.length&&(h=t.length)}function Da(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=A().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(w=>w.toLowerCase().includes(a)):i,c=Math.max(1,Math.ceil(s.length/Ot));n>=c&&(n=c-1);let u=s.slice(n*Ot,n*Ot+Ot);e.replaceChildren();let l=document.createElement("input");if(l.className="bloom-ih-search",l.type="search",l.placeholder="Search history",l.autocomplete="off",l.value=t,l.addEventListener("input",()=>{t=l.value,n=0,r()}),e.appendChild(l),u.length){let w=document.createElement("div");w.className="bloom-ih-list",u.forEach((W,H)=>{let ye=i.indexOf(W),Ur=A().length-1-ye,$t=document.createElement("div");$t.className="bloom-ih-item";let ve=document.createElement("button");ve.type="button",ve.className=`bloom-ih-body${o===H?"":" bloom-ih-clamp"}`,ve.textContent=W,ve.addEventListener("click",()=>{o=o===H?-1:H,r()});let Gt=document.createElement("div");Gt.className="bloom-ih-actions";let xe=document.createElement("button");xe.type="button",xe.title="Copy",xe.textContent="C",xe.addEventListener("click",()=>{to(W)});let Ee=document.createElement("button");Ee.type="button",Ee.title="Delete",Ee.textContent="\xD7",Ee.addEventListener("click",()=>{Oa(Ur),r()}),Gt.append(xe,Ee),$t.append(ve,Gt),w.appendChild($t)}),e.appendChild(w)}else{let w=document.createElement("p");w.className="bloom-ih-empty",w.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(w)}let f=document.createElement("div");f.className="bloom-ih-pager";let d=document.createElement("button");d.type="button",d.className="bloom-ih-btn",d.textContent="Prev",d.disabled=n<=0,d.addEventListener("click",()=>{n-=1,r()});let p=document.createElement("span");p.textContent=`${n+1} / ${c}`;let g=document.createElement("button");g.type="button",g.className="bloom-ih-btn",g.textContent="Next",g.disabled=n+1>=c,g.addEventListener("click",()=>{n+=1,r()});let _=document.createElement("button");_.type="button",_.className="bloom-ih-clear",_.textContent="Clear all",_.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(_t([]),h=0,r())}),f.append(d,p,g,_),e.appendChild(f)};return r(),()=>{e.replaceChildren()}}var yr=v({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[E.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:Dt,startAt:"HostReady",managedStyle:"inputHistory",start(){S("inputHistory",lr),h=A().length,B=!1,Ba()},stop(){Fe?.abort(),Fe=null,ge(),Ta(),Sn.clear(),clearTimeout(Cn),ze=!1,kn=null,B=!1},onSettingsChange(){let e=A(),t=pr(e);t.length!==e.length&&_t(t),h>t.length&&(h=t.length)}});var Hn="noShareLink",_a=['button[data-testid="share-chat-button"]'],ja=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],Rn=x({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function vr(e){return`${e.join(",")}{display:none!important}`}function xr(){let e=[];if(Rn.store.hideShareChat!==!1&&e.push(vr(_a)),Rn.store.hideShareProject!==!1&&e.push(vr(ja)),!e.length){R(Hn);return}S(Hn,e.join(`
`))}var Er=v({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[E.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Rn,start:xr,onSettingsChange:xr,stop(){R(Hn)}});var Lr="noDictation",qa=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]'],Fa=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Cr=x({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function wr(e){return`${e.join(",")}{display:none!important}`}function Sr(){let e=[wr(qa)];Cr.store.hideDictationSettings!==!1&&e.push(wr(Fa)),S(Lr,e.join(`
`))}var Tr=v({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[E.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Cr,start:Sr,onSettingsChange:Sr,stop(){R(Lr)}});var In="noSidebarIdentity",za=['[data-testid="accounts-profile-button"] .min-w-0 > .truncate','[data-testid="profile-button"] .min-w-0 > .truncate','[data-testid="user-menu-button"] .min-w-0 > .truncate','[data-testid="account-menu-button"] .min-w-0 > .truncate','[data-testid="accounts-profile-button"] .min-w-0.flex-1 .truncate','[data-testid="profile-button"] .min-w-0.flex-1 .truncate','[data-testid="accounts-profile-button"] .min-w-0 > span','[data-testid="profile-button"] .min-w-0 > span','[data-testid="accounts-profile-button"] .min-w-0 > p','[data-testid="profile-button"] .min-w-0 > p'],Ka=['[data-testid="accounts-profile-button"] a[href^="mailto:"]','[data-testid="profile-button"] a[href^="mailto:"]','[data-testid="user-menu-button"] a[href^="mailto:"]','[data-testid="account-menu-button"] a[href^="mailto:"]'],$a=['[data-testid="accounts-profile-button"] > .flex.min-w-0','[data-testid="profile-button"] > .flex.min-w-0','[data-testid="user-menu-button"] > .flex.min-w-0','[data-testid="account-menu-button"] > .flex.min-w-0','[data-testid="accounts-profile-button"] > .min-w-0','[data-testid="profile-button"] > .min-w-0','[data-testid="accounts-profile-button"] .min-w-0.flex-1','[data-testid="profile-button"] .min-w-0.flex-1','[data-testid="accounts-profile-button"] .min-w-0.flex-col','[data-testid="profile-button"] .min-w-0.flex-col'],Nn=x({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0}});function Pn(e){return`${e.join(",")}{display:none!important}`}function Mr(){let e=Nn.store.hideUsername!==!1,t=Nn.store.hideEmail!==!1,n=[];if(e&&n.push(Pn(za)),t&&n.push(Pn(Ka)),e&&t&&n.push(Pn($a)),!n.length){R(In);return}S(In,n.join(`
`))}var kr=v({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[E.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Nn,start:Mr,onSettingsChange:Mr,stop(){R(In)}});var Ar=`#bloom-rt-host {
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
`;var Pr=new b("RecentTopics"),he="bloom-rt-host",Ir="home",Nr=/^\/c\/([a-z0-9_-]{8,})/i,Va=/\/c\/([a-z0-9_-]{8,})/i,Br=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Ua=new Set(["Backquote","IntlBackslash"]),Wa=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Ya=140,Ja=[3,4,5,6,7,8,9,10,11,12].map(e=>({label:String(e),value:String(e),default:e===5})),y=x({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Ja},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),jt=null,Bn=null,L=!1,We=!1,Ke=!1,O=0,ee="",be=null,$e=null;function Xa(){let e=Number(y.store.maxRecent??5);return Number.isFinite(e)&&e>=3&&e<=12?e:5}function Ge(){let e=y.plain.visits;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function On(){let e=y.plain.titles;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Or(){let e=y.plain.previews;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Dn(){let e=y.plain.projects;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Ft(e){let t=Xa();return e.length>t?e.slice(0,t):e}function D(e){return e===Ir}function Ve(e,t=Ya){let n=e.replace(/\s+/g," ").trim();return n.length<=t?n:`${n.slice(0,t-1)}\u2026`}function _n(e){if(!e)return"";try{return new URL(e,location.origin).pathname.match(Nr)?.[1]??""}catch{return e.match(Va)?.[1]??""}}function te(){let e=(location.pathname||"/").match(Nr);if(e?.[1])return e[1];let n=ue().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return Ir}function jn(e){if(D(e))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${e}"]`);for(let o of n){if(_n(o.getAttribute("href")||"")!==e)continue;let r=Ve(o.textContent||"",80);if(r)return r}}catch{}let t=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return te()===e&&t&&!/^ChatGPT$/i.test(t)?Ve(t,80):""}function Za(e){return D(e)?"New chat":On()[e]||jn(e)||"Chat"}function Qa(e){return Dn()[e]||""}function es(e){return Or()[e]||{}}function Dr(e,t){if(!e||D(e)||!t)return;let n=On();n[e]!==t&&(n[e]=t,y.store.titles=n)}function ts(e,t){if(!e||D(e)||!t)return;let n=Dn();n[e]!==t&&(n[e]=t,y.store.projects=n)}function ns(e,t){if(!e||D(e)||!t.user&&!t.assistant)return;let n=Or(),o=n[e]||{},r={user:t.user||o.user,assistant:t.assistant||o.assistant};o.user===r.user&&o.assistant===r.assistant||(n[e]=r,y.store.previews=n)}function qn(e){if(!e||D(e)&&y.store.includeHome===!1)return;let t=Ge().filter(n=>n!==e);t.unshift(e),y.store.visits=Ft(t)}function zt(){let e=y.store.includeHome!==!1;return Ft(Ge().filter(n=>e||!D(n))).map(n=>({id:n,title:Za(n),project:Qa(n),preview:es(n)}))}function Hr(e){try{let t=document.querySelectorAll(`[data-message-author-role="${e}"]`),n=t[t.length-1];if(!(n instanceof HTMLElement))return"";let o=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||o.push(a)}let r=o.length?o.join(" "):n.textContent||"";return Ve(r)}catch{return""}}function Ue(e){if(!e||D(e)||e!==te())return;let t=jn(e);t&&Dr(e,t);let n=Hr("user"),o=Hr("assistant");ns(e,{user:n,assistant:o});let r=jr(e);if(r){let i=_r(r);i&&ts(e,i)}}function Fn(){let e=On(),t=Dn(),n=[],o=new Set,r=!1,i=!1;try{for(let u of document.querySelectorAll('a[href*="/c/"]')){if(u.closest(`#${he}, #bloom-root, #bloom-sidebar-panel`))continue;let l=_n(u.getAttribute("href")||"");if(!l||o.has(l))continue;o.add(l),n.push(l);let f=Ve(u.textContent||"",80);f&&!Br.test(f)&&e[l]!==f&&(e[l]=f,r=!0);let d=_r(u);d&&t[l]!==d&&(t[l]=d,i=!0)}}catch{}r&&(y.store.titles=e),i&&(y.store.projects=t);let a=Ge(),s=new Set(a),c=n.filter(u=>!s.has(u));c.length&&(y.store.visits=Ft([...a,...c]))}function _r(e){let t=e.parentElement;for(let n=0;n<10&&t;n++){if(t.id==="bloom-rt-host"||t.id==="bloom-root"){t=t.parentElement;continue}let o=t.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),r=Ve((o instanceof HTMLElement?o.textContent:"")||"",60);if(r&&!Br.test(r)&&!/^20\d{2}/.test(r)&&r!==e.textContent?.trim()&&t.querySelector('a[href^="/c/"]'))return r;t=t.parentElement}return""}function jr(e){if(D(e)){let t=document.querySelector('[data-testid="create-new-chat-button"]');return t instanceof HTMLAnchorElement?t:document.querySelector('a[href="/"]')}try{for(let t of document.querySelectorAll(`a[href*="/c/${e}"]`))if(_n(t.getAttribute("href")||"")===e)return t}catch{}return null}function os(e){let t=jr(e);if(t){t.click();return}if(D(e)){location.assign("/");return}location.assign(`/c/${e}`)}function qt(){let e=te();ee&&ee!==e&&Ue(ee),ee=e,qn(e),Fn();let t=jn(e);t&&Dr(e,t),Ue(e)}function rs(){be||(be=history.pushState.bind(history),$e=history.replaceState.bind(history),history.pushState=function(...t){let n=be(...t);return qt(),n},history.replaceState=function(...t){let n=$e(...t);return qt(),n})}function is(){be&&(history.pushState=be),$e&&(history.replaceState=$e),be=null,$e=null}function as(e){return Ua.has(e.code)||e.keyCode===192?!0:Wa.has(e.key)}function qr(e){return e.key==="Control"||e.code==="ControlLeft"||e.code==="ControlRight"}function ss(e,t){We=t,Fn(),Ue(te()),L=!0,O=0;try{let n=te();qn(n);let o=zt();o.length>1&&(O=e?o.length-1:1)}catch(n){Pr.error("Failed to open switcher:",n)}Ye()}function Rr(e){let{length:t}=zt();t&&(O=(O+(e?-1:1)+t)%t,Ye())}function zn(){if(!L)return;let e=zt()[O];L=!1,We=!1,Ye(),e&&os(e.id)}function Fr(){L&&(L=!1,We=!1,Ye())}function ls(e){if(qr(e)){Ke=!0;return}if((e.ctrlKey||Ke)&&!e.altKey&&!e.metaKey&&as(e)&&!e.repeat){e.preventDefault(),e.stopImmediatePropagation();try{L?Rr(e.shiftKey):ss(e.shiftKey,!0)}catch(n){Pr.error("Hotkey failed:",n)}return}if(L){if(e.key==="Escape"){e.preventDefault(),Fr();return}if(e.key==="Enter"&&!e.shiftKey){e.preventDefault(),zn();return}e.key==="Tab"&&(e.ctrlKey||Ke)&&(e.preventDefault(),Rr(e.shiftKey))}}function cs(e){qr(e)&&(Ke=!1,L&&We&&zn())}function us(e){let t=e.target instanceof Element?e.target:null;!t||!t.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(qt)}function ds(e){!L||(e.target instanceof Element?e.target:null)?.closest(`#${he}`)||Fr()}function ms(){document.visibilityState==="hidden"&&Ue(te())}function fs(){if(!document.body)return null;let e=document.getElementById(he);if(e instanceof HTMLElement)return Bn=e,e;e=document.createElement("div"),e.id=he;let t=document.createElement("div");return t.className="bloom-rt-panel",t.setAttribute("role","listbox"),t.setAttribute("aria-label","Recent conversations"),t.dataset.visible="false",t.addEventListener("click",n=>n.stopPropagation()),e.append(t),document.body.append(e),Bn=e,e}function Ye(){let e=fs();if(!e)return;let t=e.querySelector(".bloom-rt-panel");if(!t)return;if(!L){t.dataset.visible="false",t.replaceChildren();return}let n=zt();if(!n.length){t.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",t.replaceChildren(i);return}O>=n.length&&(O=0);let o=document.createElement("div");o.className="bloom-rt-list",o.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===O?"true":"false",s.setAttribute("aria-selected",a===O?"true":"false");let c=document.createElement("div");if(c.className="bloom-rt-name",c.textContent=i.title,s.append(c),i.project){let u=document.createElement("div");u.className="bloom-rt-project",u.textContent=i.project,s.append(u)}if(i.preview.user||i.preview.assistant){let u=document.createElement("div");if(u.className="bloom-rt-preview",i.preview.user){let l=document.createElement("div");l.className="bloom-rt-line",l.dataset.role="user",l.textContent=i.preview.user,u.append(l)}if(i.preview.assistant){let l=document.createElement("div");l.className="bloom-rt-line",l.dataset.role="assistant",l.textContent=i.preview.assistant,u.append(l)}s.append(u)}s.addEventListener("click",()=>{O=a,zn()}),o.append(s)}),t.replaceChildren(o),t.dataset.visible="true",t.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function ps(){document.getElementById(he)?.remove(),Bn=null}var zr=v({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[E.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${he}`],settings:y,start(){S("recentTopics",Ar),ee=te(),qn(ee),Fn(),Ue(ee),rs(),jt=new AbortController;let{signal:e}=jt;window.addEventListener("keydown",ls,{capture:!0,signal:e}),window.addEventListener("keyup",cs,{capture:!0,signal:e}),window.addEventListener("popstate",qt,{signal:e}),document.addEventListener("click",us,{capture:!0,signal:e}),document.addEventListener("click",ds,{signal:e}),document.addEventListener("visibilitychange",ms,{signal:e})},stop(){jt?.abort(),jt=null,is(),L=!1,We=!1,Ke=!1,ps()},onSettingsChange(){let e=Ft(Ge());e.length!==Ge().length&&(y.store.visits=e),L&&Ye()}});var Je=new b("Bloom"),Kr=!1,gs=Date.now(),bs=[Do,sr,yr,Er,Tr,kr,zr];function Kt(e){return new Promise(t=>setTimeout(t,e))}function hs(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var Gr=8e3,$r=300,ys=250;async function vs(){if(J())return await Kt($r),!0;for(;Date.now()-gs<Gr;)if(await Kt(ys),J())return await Kt($r),!0;return J()||Jt()}function Kn(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function xs(){if(Kn())return!0;let e=Date.now()+Gr;for(;Date.now()<e;)if(await Kt(100),Kn())return!0;return Kn()}function Es(){try{GM_registerMenuCommand?.("Bloom++ settings",Oo)}catch{}}function ws(){rt(()=>{Ce("HostShell"),Je.info("host shell",C)}),it(()=>{Je.info("idle ready",C)}),at(()=>{Un(),Ce("HostReady"),Je.info("chrome ready",C)})}async function $n(){await no()}async function Gn(){if(Kr)return;Kr=!0;for(let n of bs)try{ao(n)}catch(o){Je.error("register failed",n.name,o)}co(),Ce("Init"),Es(),ws();let e=()=>Ce("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await hs(),xs().then(n=>{n&&st()}),!await vs()){Je.warn("late islands not detected; starting default plugins",C),oe(),lt();return}await bo()}var Vr=typeof unsafeWindow<"u"?unsafeWindow:window,Ss=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||Ss){let e=Vr.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",C);try{Object.defineProperty(Vr,"Bloom",{value:Vn,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}$n().then(()=>Gn()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
