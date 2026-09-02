// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260902] v1.4.1
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

/* Bloom++ [20260902] v1.4.1. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Jo=Object.defineProperty;var Xo=(e,t)=>{for(var n in t)Jo(e,n,{get:t[n],enumerable:!0})};var un={};Xo(un,{REPO_URL:()=>Nn,Settings:()=>c,VERSION:()=>A,hasLateIslands:()=>q,init:()=>cn,initSettings:()=>ln,isDocumentInteractive:()=>On,plugins:()=>w,requestChromeReady:()=>qe,requestIdleReady:()=>J,requestShellReady:()=>_e,whenChromeReady:()=>De,whenIdleReady:()=>Be,whenShellReady:()=>Y});var R=new Map,Ae=!1;function Zo(){return document.getElementById("bloom-root")?.shadowRoot??null}function Qo(){return document.head??null}function U(){let e=Zo();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=er()}function wt(e,t){if(!Ae)return;let n=Qo();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),U();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,U();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,U()}function H(e,t){let n=R.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},R.set(e,n)),Ae&&wt(e,n)}function dn(){Ae=!0;for(let[e,t]of R)wt(e,t);return U(),!0}function mn(e){let t=R.get(e);t&&(t.disabled=!1,Ae&&wt(e,t))}function fn(e){let t=R.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),U())}function _(e){let t=R.get(e);t&&(t.el?.remove(),R.delete(e),U())}function er(){return Array.from(R.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var p=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function h(e){return e}var tr=new Map;function ce(e,t){let n=tr.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var nr="bloompp";function pn(){return new Promise((e,t)=>{let n=indexedDB.open(nr,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function gn(e){try{let t=await pn();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function bn(e,t){try{let n=await pn();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function ue(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function hn(e,t,n){return Math.min(n,Math.max(t,e))}function yn(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function vn(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}var Pe=new p("SettingsStore"),N="BloomSettings",or=100;function Re(e){if(ue(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(ue(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return ue(n)?n:null}return null}catch{return null}}var Ie=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[g,u]of this.defaultGetters)if(l.startsWith(g)){let b=l.slice(g.length+1);if(b&&!b.includes(".")){let d=u(b);d!==void 0&&(i[a]=d,s=d);break}}}return ue(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Pe.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},or))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(N,this.plain)}catch{try{GM_setValue(N,t)}catch(n){Pe.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(N,t)}catch{}bn(N,t).catch(n=>Pe.warn("Failed to save settings to IndexedDB:",n))}catch(t){Pe.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){yn(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var rr=new p("Settings"),ir={plugins:{}},c=new Ie(structuredClone(ir)),ar=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function sr(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function S(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(c.store.plugins[n]||(c.store.plugins[n]={}),c.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?c.plain.plugins[n]??{}:{}}};return t}function lr(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function En(){let e=null;if(e=Re(lr(N)),e||(e=Re(await gn(N))),!e)try{e=Re(localStorage.getItem(N))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(c.plain.plugins=t),rr.debug("Loaded settings")}}function xn(e,t){t&&(t.pluginName=e,c.plain.plugins[e]||(c.plain.plugins[e]={}),c.setDefaultGetter(ar(e),n=>{if(n!=="enabled")return sr(t.def,n)}))}var He=new p("PluginManager"),w={},me=new Set;function Ln(e){if(w[e.name]){He.warn("Duplicate plugin",e.name);return}w[e.name]=e,xn(e.name,e.settings)}function Ne(e){let t=w[e];if(!t)return!1;if(t.required)return!0;let n=c.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function Cn(e){let t=w[e];if(!t||t.required)return;let n=!Ne(e);c.plain.plugins[e]||(c.store.plugins[e]={}),c.store.plugins[e].enabled=n,n?Tn(t):cr(t),ce("pluginToggle",{name:e,enabled:n})}function Tn(e,t=!1){if(!me.has(e.name)&&Ne(e.name))try{e.managedStyle&&mn(e.managedStyle),e.start?.(),me.add(e.name),e.settings&&c.addPrefixChangeListener(`plugins.${e.name}.`,()=>{me.has(e.name)&&e.onSettingsChange?.()}),t||He.debug("Started",e.name)}catch(n){He.error("Failed to start",e.name,n)}}function cr(e){if(me.has(e.name)){try{e.stop?.()}catch(t){He.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(fn(e.managedStyle),_(e.managedStyle)),me.delete(e.name)}}function fe(e){for(let t of Object.values(w))(t.startAt??"DOMContentLoaded")===e&&Tn(t)}var Sn=2,wn="defaultsRev";function Mn(){for(let t of Object.values(w))c.plain.plugins[t.name]||(c.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=c.store.plugins.Settings??(c.store.plugins.Settings={});if(e[wn]!==Sn){for(let t of["NoShareLink","NoDictation"]){let n=c.store.plugins[t]??(c.store.plugins[t]={});n.enabled=!1}e[wn]=Sn}}var pe=!1,Oe=!1,Lt=!1,An=[],Pn=[],In=[];function Ct(e){let t=e.splice(0);for(let n of t)n()}function ge(){pe||(pe=!0,Ct(An))}function Tt(){Oe||(Oe=!0,pe||ge(),Ct(Pn))}function Rn(){Lt||(Lt=!0,pe||ge(),Oe||Tt(),Ct(In))}function Y(e){pe?e():An.push(e)}function Be(e){Oe?e():Pn.push(e)}function De(e){Lt?e():In.push(e)}function _e(){ge()}function J(){ge(),Tt()}function qe(){Rn()}function kn(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function Hn(){await kn(4e3),ge(),await kn(4e3),Tt(),Rn()}var L={p:"0-V-linuxdo"},A="[20260902] v1.4.1",Nn="https://github.com/0-V-linuxdo/Bloom";function ur(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function dr(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function Mt(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function q(){return Mt()?ur()||dr():!1}function On(){return q()}var mr=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Bn=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),fr=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),pr="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function je(e){return e.id==="bloom-root"||!!e.closest(pr)}function Dn(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function Fe(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function kt(e){if(!(e instanceof HTMLElement)||!e.isConnected||je(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&Fe(t)?!1:e.getClientRects().length>0}function gr(){let e=[];for(let t of document.querySelectorAll(mr))!(t instanceof HTMLElement)||!t.isConnected||je(t)||e.push(t);return e}function br(e){let t=e.getBoundingClientRect();return t.width>2&&t.height>2&&t.left>=0&&t.left<window.innerWidth/3&&t.bottom>0&&t.top<window.innerHeight}function $e(){let e=gr(),t=e.filter(br);return t.length?t[0]:e[0]??null}function At(e){let t=e.closest(".sticky.bottom-0");if(t?.parentElement&&!je(t.parentElement))return t;let n=e.closest("nav");if(n?.parentElement){let r=n.nextElementSibling;if(r instanceof HTMLElement&&r.contains(e)&&!je(r))return r}let o=e;for(;o.parentElement&&o.parentElement!==document.body;){let r=o.parentElement;if(r.id==="stage-slideover-sidebar"||r.tagName==="NAV")return o;o=r}return o}function _n(){let e=document.querySelectorAll(Bn);for(let n of e)if(kt(n)&&!Fe(n)&&Dn(n))return n;let t=document.querySelectorAll(fr);for(let n of t){if(!kt(n)||!Dn(n)||Fe(n))continue;let o=n.querySelector(Bn);return kt(o)&&!Fe(o)?o:n}return null}function qn(){let e=document.getElementById("stage-slideover-sidebar");if(e instanceof HTMLElement&&e.isConnected)return e;for(let t of document.querySelectorAll("nav"))if(t instanceof HTMLElement&&t.isConnected)return t;return null}function Fn(e){let t=$e();return t?e.composedPath().includes(t):!1}var It=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary"],hr={light:{"--main-surface-primary":"#ffffff","--main-surface-secondary":"#f4f4f4","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#f9f9f9","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#b4b4b4","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.1)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.2)","--link":"#0d0d0d","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#f4f4f4","--bg-primary":"#ffffff","--bg-secondary":"#f4f4f4"},dark:{"--main-surface-primary":"#212121","--main-surface-secondary":"#2f2f2f","--main-surface-tertiary":"#424242","--sidebar-surface-primary":"#171717","--text-primary":"#ececec","--text-secondary":"#b4b4b4","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ececec","--icon-secondary":"#b4b4b4","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.1)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.2)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.06)","--interactive-label-primary-default":"#ececec","--message-surface":"#2f2f2f","--bg-primary":"#212121","--bg-secondary":"#2f2f2f"}};function yr(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function vr(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function Pt(e){let t=yr(e);return t?vr(t)>.55?"light":"dark":null}function Er(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=Pt(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=Pt(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Pt(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function jn(e){return e==="auto"?Er():e}function xr(e){try{let t=getComputedStyle(document.documentElement);for(let n of It){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function $n(e,t,n){let o=hr[t];if(n){xr(e);for(let r of It)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of It)e.style.setProperty(r,o[r])}function Kn(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var Rt=`/* Sidebar rail row + in-flow panel. No overlay, no FAB, no popover. */

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

.bloom-rail-item {
  flex: 0 0 auto;
  position: sticky;
  bottom: 3.5rem;
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

.bloom-rail-item.bloom-rail-compact {
  width: auto;
  padding: 8px;
  justify-content: center;
  bottom: auto;
}

.bloom-rail-item.bloom-rail-compact > span {
  display: none;
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
`;var wr="bloom-root",F="bloom-rail-item",Ue="bloom-account-item",j="bloom-sidebar-panel",We="bloom-settings-css",Lr=S({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),Ge=null,Cr=null,_t=!1,$=!1,Bt=[],Ke=null,Ye=null,O=null,Ve=null,X=null,Dt=null,be,tt=null,nt=null,he=null,Je=null,Xe=null,P=null;function ot(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function zn(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Tr(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>'}function Mr(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l-.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>'}var kr={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>'};function Ar(e){return kr[e]??ot()}function Pr(){return"auto"}function Ht(){let e=Pr(),t=jn(e);Ge&&(Ge.setAttribute("data-bloom-scheme",t),$n(Ge,t,e==="auto")),ce("schemeChange",{scheme:t,pref:e})}function ye(e,t){e&&(e.hidden=t,e.toggleAttribute("inert",t),t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden"))}function Vn(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel").forEach(e=>e.remove())}function Un(){if(H("settings",Rt),document.getElementById(We)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=We,e.textContent=Rt,document.head.appendChild(e)}function Ir(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Wn(){for(let e of Bt)e();Bt=[]}function Yn(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function Rr(e){return!!e.settings&&Object.keys(e.settings.def).length>0}function Hr(e,t,n){if(n.hidden)return null;if(n.type===5&&n.render){let a=document.createElement("details");a.className="bloom-field bloom-field-block";let s=document.createElement("summary");s.textContent=n.description||t;let l=document.createElement("div");return Bt.push(n.render(l)),a.append(s,l),a}let o=document.createElement("div");o.className="bloom-field";let r=document.createElement("span");r.textContent=n.description||t,o.appendChild(r);let i=c.store.plugins[e]??(c.store.plugins[e]={});if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??n.options.find(s=>s.default)?.value??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=Yn(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),o.appendChild(a),o}return o}function qt(){_t=!1,Wn(),P&&P.replaceChildren(),ye(nt,!0),ye(tt,!1)}function Nr(e){if(Wn(),_t=!0,Je&&(Je.textContent=e.name),Xe&&(Xe.textContent=e.description),P){if(P.replaceChildren(),e.settings)for(let[t,n]of Object.entries(e.settings.def)){let o=Hr(e.name,t,n);o&&P.appendChild(o)}if(!P.childElementCount){let t=document.createElement("p");t.className="bloom-dialog-empty",t.textContent="No configurable settings.",P.appendChild(t)}}ye(tt,!0),ye(nt,!1)}function Or(e){let t=document.createElement("div");t.className="bloom-plugin-row";let n=document.createElement("span");n.className="bloom-plugin-icon",n.innerHTML=Ar(e.name);let o=document.createElement("span");if(o.className="bloom-plugin-label",o.textContent=e.name,t.append(n,o),Rr(e)){let a=document.createElement("button");a.type="button",a.className="bloom-icon-btn",a.setAttribute("aria-label",`${e.name} settings`),a.innerHTML=Mr(),a.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),Nr(e)}),t.appendChild(a)}let r=Yn(e.name,Ne(e.name),!!e.required),i=r.querySelector("input");return i?.addEventListener("click",a=>a.stopPropagation()),i?.addEventListener("change",()=>{Cn(e.name)}),t.appendChild(r),t}function Br(){if(he){he.replaceChildren();for(let e of Object.values(w))e.hidden||e.name==="Settings"||he.appendChild(Or(e))}}function Nt(e){e.stopPropagation()}function Ot(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function Ze(){document.getElementById(F)?.setAttribute("aria-expanded",$?"true":"false")}function Qe(){qt(),document.getElementById(j)?.remove(),$=!1,Ze()}function Dr(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",Nt),t.addEventListener("pointerup",Nt),t.addEventListener("click",Nt);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=ot();let a=document.createElement("h2");a.textContent="Bloom++",r.append(i,a);let s=document.createElement("button");s.type="button",s.className="bloom-icon-btn",s.setAttribute("aria-label","Close"),s.innerHTML=zn(),s.addEventListener("click",Qe),o.append(r,s),n.appendChild(o);let l=document.createElement("p");l.className="bloom-settings-sub",l.textContent="Plugins",n.appendChild(l);let g=document.createElement("div");g.className="bloom-plugin-list",n.appendChild(g);let u=document.createElement("div");u.className="bloom-settings-plugin",ye(u,!0);let b=document.createElement("div");b.className="bloom-settings-head";let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn",d.setAttribute("aria-label","Back"),d.innerHTML=Tr(),d.addEventListener("click",qt);let V=document.createElement("div");V.className="bloom-dialog-titles";let M=document.createElement("h2"),k=document.createElement("p");k.className="bloom-settings-sub",V.append(M,k);let m=document.createElement("button");m.type="button",m.className="bloom-icon-btn",m.setAttribute("aria-label","Close"),m.innerHTML=zn(),m.addEventListener("click",Qe),b.append(d,V,m);let D=document.createElement("div");return D.className="bloom-plugin-settings",u.append(b,D),t.append(n,u),tt=n,nt=u,he=g,Je=M,Xe=k,P=D,Br(),t}function _r(e){e.classList.add("bloom-rail-dock")}function Jn(){document.getElementById(j)?.remove();let e=Dr(j),t=document.getElementById(F),n=t?.isConnected?t.getBoundingClientRect():null;if(t?.isConnected&&t.parentElement&&n&&n.width>2&&n.height>2)t.before(e);else{let o=$e();if(o)At(o).before(e);else if(document.body)_r(e),document.body.appendChild(e);else return}$=!0,qt(),Ze(),ce("settingsOpen",void 0)}function Ft(){if(document.getElementById(j)?.isConnected){Qe();return}Jn()}function qr(){let e=document.createElement("button");return e.type="button",e.id=F,e.className="bloom-rail-item",e.setAttribute("aria-controls",j),e.setAttribute("aria-expanded",$?"true":"false"),e.innerHTML=`${ot()}<span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),Ft()}),e}function Fr(e){let n=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",n>0&&n<80)}function et(){if(!document.body)return;let e=document.getElementById(F),t=$e();if(!t){Ze();return}let n=At(t),o=e instanceof HTMLButtonElement?e:qr();o.isConnected&&o.nextElementSibling===n||n.before(o),Fr(o);let r=document.getElementById(j);$&&r?.isConnected?r.nextElementSibling!==o&&o.before(r):$&&r&&!r.isConnected&&Jn(),Ze()}function Gn(){let e=qn();e&&(Dt===e&&X||(X?.disconnect(),Dt=e,X=new MutationObserver(()=>{document.getElementById(F)?.isConnected||et()}),X.observe(e,{childList:!0,subtree:!0})))}function jr(){et(),Gn(),be===void 0&&(be=window.setInterval(()=>{et(),Gn()},1e3))}function $r(){be!==void 0&&(clearInterval(be),be=void 0),X?.disconnect(),X=null,Dt=null}function Kr(e){Ve===e&&O||(O?.disconnect(),Ve=e,O=new MutationObserver(()=>{if(!e.isConnected){O?.disconnect(),O=null,Ve=null;return}Xn(e)}),O.observe(e,{childList:!0}))}function Xn(e){if(Kr(e),e.querySelector(`#${Ue}`))return;let t=document.createElement("button");t.type="button",t.id=Ue,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${ot()}<span>Bloom++</span>`,t.addEventListener("pointerdown",Ot),t.addEventListener("pointerup",Ot),t.addEventListener("click",n=>{Ot(n),Ft()}),e.insertBefore(t,e.firstChild)}function ze(){let e=_n();return e?(Xn(e),!0):!1}function zr(e){Fn(e)&&(queueMicrotask(ze),requestAnimationFrame(()=>{ze()}),window.setTimeout(ze,60),window.setTimeout(ze,180))}function Gr(){Ye?.abort();let e=new AbortController;Ye=e,document.addEventListener("click",zr,{signal:e.signal})}function Vr(){Ye?.abort(),Ye=null,O?.disconnect(),O=null,Ve=null}function Zn(){J(),Y(()=>{Ir(()=>{Un(),Vn(),et(),Ft()})})}var Qn=h({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[L.p],required:!0,hidden:!0,enabledByDefault:!0,settings:Lr,startAt:"HostShell",cleanupSelectors:[`#${wr}`,`#${F}`,`#${Ue}`,`#${j}`,`#${We}`,"#bloom-menu-panel"],start(){Un(),Vn(),jr(),Gr(),Ke?.(),Ke=Kn(Ht),Ht()},stop(){$r(),Vr(),Ke?.(),Ke=null,Qe(),document.getElementById(F)?.remove(),document.getElementById(Ue)?.remove(),document.getElementById(We)?.remove(),Ge=null,Cr=null,tt=null,nt=null,he=null,Je=null,Xe=null,P=null,$=!1,_t=!1},onSettingsChange:Ht});var no='form[data-type="unified-composer"], form.w-full[data-type]',Z=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),rt=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),eo=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),to=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Ur=/stop streaming|stop generating|停止生成|停止输出|停止响应/;function y(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function K(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!y(r)))return r;return null}function oo(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function C(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=oo(e);return!!(Ur.test(n)||/^stop$/i.test(n))}function B(){let t=Array.from(document.querySelectorAll(no)).find(y);if(t instanceof HTMLElement)return t;let n=K(document,Z),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function z(){let e=Array.from(document.querySelectorAll(Z));return e.find(y)??e[0]??null}function jt(){let e=z();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function Wr(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function ro(e){let t=B();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!y(n))&&e(n))return n;return null}function it(){let e=B(),t=K(e,rt)??K(document,rt);return t&&!C(t)?t:ro(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!C(n);let r=oo(n);return/^(send|send prompt|发送)$/i.test(r)&&!C(n)})}function $t(){let e=it();return!!e&&Wr(e)}function Kt(){let e=B(),t=K(e,eo,!0)??K(document,eo,!0);if(t)return t;let n=K(e,to)??K(document,to);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&y(o)&&C(o))return o}return ro(C)}function Q(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}var zt=0;function io(e){zt+=1;try{e()}finally{zt-=1}}function at(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function ee(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function ao(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function Yr(e){let{head:t}=document;if(t)for(let n of Array.from(t.querySelectorAll("link")))n.id!==e&&at(n)&&n.remove()}function Jr(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Gt(e,t){let{head:n}=document;!n||!t||io(()=>{Yr(e);let o=ao(e),{type:r,sizes:i}=Jr(t);o?n.lastElementChild!==o&&n.appendChild(o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function so(e,t){let{head:n}=document;n&&io(()=>{ao(e)?.remove();let o=Array.from(n.querySelectorAll("link")).filter(at);if(o.length){ee(t)&&o[0].href!==t&&(o[0].href=t);return}if(!ee(t))return;let r=document.createElement("link");r.rel="icon",r.href=t,n.appendChild(r)})}function lo(e,t){let{head:n}=document;if(!n)return null;let o=new MutationObserver(r=>{if(!zt)for(let i of r){if(i.type==="attributes"&&at(i.target)){t(i.target.id===e?void 0:i.target.href);return}for(let a of i.addedNodes)if(at(a)&&a.id!==e){t(a.href);return}}});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}function st(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=g=>{let u=n.indexOf(g);return u>=0&&n[u+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(g,u)=>{try{return document.querySelector(g)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function lt(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function Xr(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!y(t))&&(C(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function Zr(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&y(e))}function Qr(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&y(e))}function ei(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Vt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function ct(){if(Kt()||Xr())return!0;let e=it();return e&&y(e)&&!C(e)?!1:!!(Zr()||Qr()||ei())}var ti=["original","badge","dot","hole","bg"],mo=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge",default:!0},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],fo={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},ut="#FCFCFC",ni="#111111",co="#111111",oi="#ffffff",ri="#212121",ii="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",ai={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},dt=32,uo=64;function po(e){return typeof e=="string"&&ti.includes(e)}function si(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function mt(e){let t=document.createElement("canvas");t.width=dt,t.height=dt;let n=t.getContext("2d");return n?(n.scale(dt/uo,dt/uo),e(n),t.toDataURL("image/png")):""}function li(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function ft(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(ii);n&&(e.strokeStyle=ni,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function ci(e,t,n){let o=fo[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=co,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=co,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=oi,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function ve(e,t){if(e==="original")return t==="wait"?mt(o=>ft(o,ut)):si(ai[t]);let n=t==="wait"?void 0:fo[t];return mt(e==="hole"?o=>ft(o,n??ut):e==="bg"?o=>{o.fillStyle=n??ri,li(o,0,0,64,64,14),o.fill(),ft(o,ut,!1)}:o=>{ft(o,ut),t!=="wait"&&ci(o,t,e==="dot"?"dot":"badge")})}function go(e){return{wait:ve(e,"wait"),rotate:ve(e,"rotate"),done:ve(e,"done"),ready:ve(e,"ready"),error:ve(e,"error")}}var ui=new p("ChatStateFavicons"),ne="bloom-chat-state-favicon",vo=S({style:{type:3,description:"Favicon overlay",options:mo}}),oe="",Wt={wait:"",rotate:"",done:"",ready:"",error:""},Yt="wait",xe=!1,I=!1,v=null,Se="",we="",Le=!0,Ee=null,re=0,te,pt=null,G=null,Ut=null,Ce=!1,bo=new WeakSet,di=400;function mi(){let e=vo.store.style;return po(e)?e:"badge"}function fi(){let t=document.querySelector(`link[rel~="icon"]:not(#${ne})`)?.href;return ee(t)?t:ee(oe)?oe:""}function E(e){Yt=e,Gt(ne,Wt[e])}function ho(){Wt=go(mi()),E(Yt)}function pi(){let e=st(),t=e?lt(e):lt("");return ct()?(!Se&&t&&(Se=t),Se||t):(Se="",t)}function Eo(){xe=!1,I=!1,v=null,Se=""}function gi(e){we=e,Eo(),Le=!1,E("wait")}function xo(){if(!Ce)return;let e=st()||location.pathname;if(we&&e&&we!==e){gi(e);return}e&&(we=e);let t=pi(),n=ct(),o=jt(),r=$t();if(Vt()&&!n){E("error"),xe=!1,I=!1,v=null;return}if(n){xe=!0,I=!1,v=t,E("rotate");return}if(xe){let i=!!v&&!!t&&v===t;if(xe=!1,i){I=!0,v=t,E("done");return}I=!1,v=null}if(I)if(!!(v&&t&&v!==t))I=!1,v=null;else if(o){E("done");return}else if(Le){I=!1,E("ready");return}else{I=!1,E("wait");return}v=null,E(o?"wait":Le?"ready":"wait")}function So(){let e=B();if(!(G&&Ut===e&&e.isConnected)){if(G?.disconnect(),Ut=e,!e||e===document.body){G=null;return}G=new MutationObserver(()=>gt()),G.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid","class"]})}}function gt(){!Ce||re||(re=requestAnimationFrame(()=>{re=0,Ce&&(wo(),So(),xo())}))}function yo(){Le=!0,gt()}function wo(){let e=z();!e||bo.has(e)||(bo.add(e),e.addEventListener("input",yo,{passive:!0}),e.addEventListener("compositionend",yo,{passive:!0}))}var Lo=h({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[L.p],tags:["chat","ui"],enabledByDefault:!0,settings:vo,startAt:"DOMContentLoaded",cleanupSelectors:[`#${ne}`],start(){Ce=!0,oe=fi()||oe,ho(),pt?.disconnect(),pt=lo(ne,e=>{ee(e)&&(oe=e),Gt(ne,Wt[Yt])}),Ee?.abort(),Ee=new AbortController,window.addEventListener("popstate",gt,{signal:Ee.signal}),wo(),So(),te!==void 0&&clearInterval(te),te=setInterval(gt,di),xo(),ui.debug("favicon watch started")},stop(){Ce=!1,re&&cancelAnimationFrame(re),re=0,te!==void 0&&(clearInterval(te),te=void 0),Ee?.abort(),Ee=null,G?.disconnect(),G=null,Ut=null,pt?.disconnect(),pt=null,Eo(),we="",Le=!0,so(ne,oe)},onSettingsChange:ho});var Co=`.bloom-ih-hud {
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
`;var To=new p("InputHistory"),Jt=/\u200B/g,Mo=10,ko=500,Ao=100,hi=8,yi=120,vi=2e3,bt=10,ht=S({maxEntries:{type:4,description:"Max stored prompts",min:Mo,max:ko,default:Ao},history:{type:5,description:"Stored prompts",render:Ni},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Xt=new Map,f=0,Zt="",T=!1,Me=!1,tn=0,Te=null,Qt,nn=null,Po=!0;function x(){let e=ht.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Io(e){let t=hn(Number(ht.store.maxEntries??Ao),Mo,ko);return e.length>t?e.slice(e.length-t):e}function yt(e){ht.store.entries=Io(e)}function Ei(e){return e.replaceAll(Jt,"").replace(/\n$/,"").trim()}function en(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(Z);return n instanceof HTMLElement?n:z()}function xi(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!Q(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(Jt,"").trim().length===0,last:i.toString().replaceAll(Jt,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Ro(e,t){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch(i){To.debug("pm caret failed:",i)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function Ho(e){clearTimeout(Qt),Qt=setTimeout(()=>{if(e!==tn)return;Me=!1;let t=nn;t&&Ro(t,Po)},yi)}function No(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),Me=!0,nn=e,Po=n;let i=++tn;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(a){To.debug("insertText failed:",a),e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),Ro(e,n),Ho(i)}function Si(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function ie(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function wi(){document.querySelector(".bloom-ih-hud")?.remove()}function Li(e,t){let n=Si();n.textContent=e;let o=(t.closest("form")??B()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-hi)}px`,n.classList.add("bloom-ih-hud-on")}function on(e){let t=Ei(e);if(!t)return;let n=Date.now(),o=Xt.get(t);if(o&&n-o<vi)return;Xt.set(t,n);let r=x().filter(i=>i!==t);r.push(t),yt(r),f=x().length,T=!1,ie()}function Ci(e,t){let n=x();if(!n.length&&e)return;f>=n.length&&(Zt=Q(t),f=n.length);let o=e?f-1:f+1;o<0||o>n.length||(f=o,T=!0,No(t,o===n.length?Zt:n[o],e),o<n.length?Li(`${o+1} / ${n.length}`,t):ie())}function Ti(e){T=!1,ie(),No(e,Zt,!1),f=x().length}function Mi(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=en(e.target)??en(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&T&&!e.altKey&&!e.shiftKey){Ti(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){on(Q(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=x();if(!o){let i=xi(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||f<=0)||!n&&f>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),Ci(n,t))}function ki(e){if(en(e.target)){if(Me){Ho(tn);return}T&&(T=!1,ie(),f=x().length)}}function Ai(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(Z);n instanceof HTMLElement&&on(Q(n))}function Pi(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(rt);if(!n||!(n instanceof HTMLElement)||C(n))return;let o=z();o&&on(Q(o))}function Ii(e){if(!(!T||Me)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}T=!1,ie()}}function Ri(){if(Te)return;Te=new AbortController;let{signal:e}=Te,t={capture:!0,signal:e};window.addEventListener("keydown",Mi,t),window.addEventListener("input",ki,t),window.addEventListener("submit",Ai,t),window.addEventListener("click",Pi,t),window.addEventListener("pointerdown",Ii,t)}function Hi(e){let t=x().slice();t.splice(e,1),yt(t),f>t.length&&(f=t.length)}function Ni(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=x().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(m=>m.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/bt));n>=l&&(n=l-1);let g=s.slice(n*bt,n*bt+bt);e.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=t,u.addEventListener("input",()=>{t=u.value,n=0,r()}),e.appendChild(u),g.length){let m=document.createElement("div");m.className="bloom-ih-list",g.forEach((D,Et)=>{let Wo=i.indexOf(D),Yo=x().length-1-Wo,xt=document.createElement("div");xt.className="bloom-ih-item";let ae=document.createElement("button");ae.type="button",ae.className=`bloom-ih-body${o===Et?"":" bloom-ih-clamp"}`,ae.textContent=D,ae.addEventListener("click",()=>{o=o===Et?-1:Et,r()});let St=document.createElement("div");St.className="bloom-ih-actions";let se=document.createElement("button");se.type="button",se.title="Copy",se.textContent="C",se.addEventListener("click",()=>{vn(D)});let le=document.createElement("button");le.type="button",le.title="Delete",le.textContent="\xD7",le.addEventListener("click",()=>{Hi(Yo),r()}),St.append(se,le),xt.append(ae,St),m.appendChild(xt)}),e.appendChild(m)}else{let m=document.createElement("p");m.className="bloom-ih-empty",m.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(m)}let b=document.createElement("div");b.className="bloom-ih-pager";let d=document.createElement("button");d.type="button",d.className="bloom-ih-btn",d.textContent="Prev",d.disabled=n<=0,d.addEventListener("click",()=>{n-=1,r()});let V=document.createElement("span");V.textContent=`${n+1} / ${l}`;let M=document.createElement("button");M.type="button",M.className="bloom-ih-btn",M.textContent="Next",M.disabled=n+1>=l,M.addEventListener("click",()=>{n+=1,r()});let k=document.createElement("button");k.type="button",k.className="bloom-ih-clear",k.textContent="Clear all",k.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(yt([]),f=0,r())}),b.append(d,V,M,k),e.appendChild(b)};return r(),()=>{e.replaceChildren()}}var Oo=h({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[L.p],tags:["chat"],enabledByDefault:!0,settings:ht,startAt:"HostReady",managedStyle:"inputHistory",start(){H("inputHistory",Co),f=x().length,T=!1,Ri()},stop(){Te?.abort(),Te=null,ie(),wi(),Xt.clear(),clearTimeout(Qt),Me=!1,nn=null,T=!1},onSettingsChange(){let e=x(),t=Io(e);t.length!==e.length&&yt(t),f>t.length&&(f=t.length)}});var rn="noShareLink",Oi=['button[data-testid="share-chat-button"]'],Bi=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],an=S({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Bo(e){return`${e.join(",")}{display:none!important}`}function Do(){let e=[];if(an.store.hideShareChat!==!1&&e.push(Bo(Oi)),an.store.hideShareProject!==!1&&e.push(Bo(Bi)),!e.length){_(rn);return}H(rn,e.join(`
`))}var _o=h({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[L.p],tags:["ui","privacy"],enabledByDefault:!1,startAt:"HostReady",settings:an,start:Do,onSettingsChange:Do,stop(){_(rn)}});var jo="noDictation",Di=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]'],_i=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],$o=S({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function qo(e){return`${e.join(",")}{display:none!important}`}function Fo(){let e=[qo(Di)];$o.store.hideDictationSettings!==!1&&e.push(qo(_i)),H(jo,e.join(`
`))}var Ko=h({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[L.p],tags:["chat","ui"],enabledByDefault:!1,startAt:"HostReady",settings:$o,start:Fo,onSettingsChange:Fo,stop(){_(jo)}});var ke=new p("Bloom"),zo=!1,qi=Date.now(),Fi=[Qn,Lo,Oo,_o,Ko];function vt(e){return new Promise(t=>setTimeout(t,e))}function ji(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var Vo=8e3,Go=300,$i=250;async function Ki(){if(q())return await vt(Go),!0;for(;Date.now()-qi<Vo;)if(await vt($i),q())return await vt(Go),!0;return q()||Mt()}function sn(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function zi(){if(sn())return!0;let e=Date.now()+Vo;for(;Date.now()<e;)if(await vt(100),sn())return!0;return sn()}function Gi(){try{GM_registerMenuCommand?.("Bloom++ settings",Zn)}catch{}}function Vi(){Y(()=>{fe("HostShell"),ke.info("host shell",A)}),Be(()=>{ke.info("idle ready",A)}),De(()=>{dn(),fe("HostReady"),ke.info("chrome ready",A)})}async function ln(){await En()}async function cn(){if(zo)return;zo=!0;for(let n of Fi)try{Ln(n)}catch(o){ke.error("register failed",n.name,o)}Mn(),fe("Init"),Gi(),Vi();let e=()=>fe("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await ji(),zi().then(n=>{n&&_e()}),!await Ki()){ke.warn("late islands not detected; starting default plugins",A),J(),qe();return}await Hn()}var Uo=typeof unsafeWindow<"u"?unsafeWindow:window;if(window===window.top){let e=Uo.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",A);try{Object.defineProperty(Uo,"Bloom",{value:un,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}ln().then(()=>cn()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
