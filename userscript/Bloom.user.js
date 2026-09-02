// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260902] v1.4.3
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

/* Bloom++ [20260902] v1.4.3. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var er=Object.defineProperty;var tr=(e,t)=>{for(var n in t)er(e,n,{get:t[n],enumerable:!0})};var pn={};tr(pn,{REPO_URL:()=>_n,Settings:()=>c,VERSION:()=>y,hasLateIslands:()=>j,init:()=>fn,initSettings:()=>mn,isDocumentInteractive:()=>qn,plugins:()=>L,requestChromeReady:()=>$e,requestIdleReady:()=>W,requestShellReady:()=>je,whenChromeReady:()=>Fe,whenIdleReady:()=>qe,whenShellReady:()=>_e});var H=new Map,Ie=!1;function nr(){return document.getElementById("bloom-root")?.shadowRoot??null}function or(){return document.head??null}function G(){let e=nr();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=rr()}function Ct(e,t){if(!Ie)return;let n=or();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),G();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,G();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,G()}function O(e,t){let n=H.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},H.set(e,n)),Ie&&Ct(e,n)}function gn(){Ie=!0;for(let[e,t]of H)Ct(e,t);return G(),!0}function bn(e){let t=H.get(e);t&&(t.disabled=!1,Ie&&Ct(e,t))}function hn(e){let t=H.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),G())}function F(e){let t=H.get(e);t&&(t.el?.remove(),H.delete(e),G())}function rr(){return Array.from(H.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var p=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function h(e){return e}var ir=new Map;function le(e,t){let n=ir.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var ar="bloompp";function yn(){return new Promise((e,t)=>{let n=indexedDB.open(ar,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function vn(e){try{let t=await yn();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function En(e,t){try{let n=await yn();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function ce(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function xn(e,t,n){return Math.min(n,Math.max(t,e))}function Sn(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function wn(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}var Re=new p("SettingsStore"),N="BloomSettings",sr=100;function Oe(e){if(ce(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(ce(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return ce(n)?n:null}return null}catch{return null}}var He=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[g,u]of this.defaultGetters)if(l.startsWith(g)){let b=l.slice(g.length+1);if(b&&!b.includes(".")){let d=u(b);d!==void 0&&(i[a]=d,s=d);break}}}return ce(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Re.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},sr))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(N,this.plain)}catch{try{GM_setValue(N,t)}catch(n){Re.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(N,t)}catch{}En(N,t).catch(n=>Re.warn("Failed to save settings to IndexedDB:",n))}catch(t){Re.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){Sn(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var lr=new p("Settings"),cr={plugins:{}},c=new He(structuredClone(cr)),ur=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function dr(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function w(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(c.store.plugins[n]||(c.store.plugins[n]={}),c.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?c.plain.plugins[n]??{}:{}}};return t}function mr(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function Ln(){let e=null;if(e=Oe(mr(N)),e||(e=Oe(await vn(N))),!e)try{e=Oe(localStorage.getItem(N))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(c.plain.plugins=t),lr.debug("Loaded settings")}}function Cn(e,t){t&&(t.pluginName=e,c.plain.plugins[e]||(c.plain.plugins[e]={}),c.setDefaultGetter(ur(e),n=>{if(n!=="enabled")return dr(t.def,n)}))}var Ne=new p("PluginManager"),L={},de=new Set;function kn(e){if(L[e.name]){Ne.warn("Duplicate plugin",e.name);return}L[e.name]=e,Cn(e.name,e.settings)}function Be(e){let t=L[e];if(!t)return!1;if(t.required)return!0;let n=c.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function An(e){let t=L[e];if(!t||t.required)return;let n=!Be(e);c.plain.plugins[e]||(c.store.plugins[e]={}),c.store.plugins[e].enabled=n,n?Pn(t):fr(t),le("pluginToggle",{name:e,enabled:n})}function Pn(e,t=!1){if(!de.has(e.name)&&Be(e.name))try{e.managedStyle&&bn(e.managedStyle),e.start?.(),de.add(e.name),e.settings&&c.addPrefixChangeListener(`plugins.${e.name}.`,()=>{de.has(e.name)&&e.onSettingsChange?.()}),t||Ne.debug("Started",e.name)}catch(n){Ne.error("Failed to start",e.name,n)}}function fr(e){if(de.has(e.name)){try{e.stop?.()}catch(t){Ne.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(hn(e.managedStyle),F(e.managedStyle)),de.delete(e.name)}}function me(e){for(let t of Object.values(L))(t.startAt??"DOMContentLoaded")===e&&Pn(t)}var Tn=2,Mn="defaultsRev";function In(){for(let t of Object.values(L))c.plain.plugins[t.name]||(c.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=c.store.plugins.Settings??(c.store.plugins.Settings={});if(e[Mn]!==Tn){for(let t of["NoShareLink","NoDictation"]){let n=c.store.plugins[t]??(c.store.plugins[t]={});n.enabled=!1}e[Mn]=Tn}}var fe=!1,De=!1,Tt=!1,Hn=[],On=[],Nn=[];function Mt(e){let t=e.splice(0);for(let n of t)n()}function pe(){fe||(fe=!0,Mt(Hn))}function kt(){De||(De=!0,fe||pe(),Mt(On))}function Bn(){Tt||(Tt=!0,fe||pe(),De||kt(),Mt(Nn))}function _e(e){fe?e():Hn.push(e)}function qe(e){De?e():On.push(e)}function Fe(e){Tt?e():Nn.push(e)}function je(){pe()}function W(){pe(),kt()}function $e(){Bn()}function Rn(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function Dn(){await Rn(4e3),pe(),await Rn(4e3),kt(),Bn()}var C={p:"0-V-linuxdo"},y="[20260902] v1.4.3",_n="https://github.com/0-V-linuxdo/Bloom";function pr(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function gr(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function At(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function j(){return At()?pr()||gr():!1}function qn(){return j()}var br=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Fn=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),hr=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),yr="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function Y(e){return e.id==="bloom-root"||!!e.closest(yr)}function jn(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function ze(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function Pt(e){if(!(e instanceof HTMLElement)||!e.isConnected||Y(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&ze(t)?!1:e.getClientRects().length>0}function ge(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function vr(){let e=[];for(let t of document.querySelectorAll(br))!(t instanceof HTMLElement)||!t.isConnected||Y(t)||e.push(t);return e}function Ke(e){if(!e.isConnected||Y(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function Ve(){return vr().filter(Ke)[0]??null}function It(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||Y(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function Rt(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!Y(n)&&!ge(n)&&(t=n);let o=t.parentElement;if(o&&!ge(o)&&!Y(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!ge(o.parentElement))return o}return t}function $n(){let e=document.querySelectorAll(Fn);for(let n of e)if(Pt(n)&&!ze(n)&&jn(n))return n;let t=document.querySelectorAll(hr);for(let n of t){if(!Pt(n)||!jn(n)||ze(n))continue;let o=n.querySelector(Fn);return Pt(o)&&!ze(o)?o:n}return null}function zn(){let e=Ve();if(e){let t=Rt(e),n=t.parentElement;if(n&&!ge(n))return n;if(!ge(t))return t}return It()}function Kn(e){let t=Ve();return t?e.composedPath().includes(t):!1}var Ot=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary"],Er={light:{"--main-surface-primary":"#ffffff","--main-surface-secondary":"#f4f4f4","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#f9f9f9","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#b4b4b4","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.1)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.2)","--link":"#0d0d0d","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#f4f4f4","--bg-primary":"#ffffff","--bg-secondary":"#f4f4f4"},dark:{"--main-surface-primary":"#212121","--main-surface-secondary":"#2f2f2f","--main-surface-tertiary":"#424242","--sidebar-surface-primary":"#171717","--text-primary":"#ececec","--text-secondary":"#b4b4b4","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ececec","--icon-secondary":"#b4b4b4","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.1)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.2)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.06)","--interactive-label-primary-default":"#ececec","--message-surface":"#2f2f2f","--bg-primary":"#212121","--bg-secondary":"#2f2f2f"}};function xr(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Sr(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function Ht(e){let t=xr(e);return t?Sr(t)>.55?"light":"dark":null}function wr(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=Ht(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=Ht(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Ht(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Vn(e){return e==="auto"?wr():e}function Lr(e){try{let t=getComputedStyle(document.documentElement);for(let n of Ot){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function Gn(e,t,n){let o=Er[t];if(n){Lr(e);for(let r of Ot)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of Ot)e.style.setProperty(r,o[r])}function Un(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var Nt=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover. */

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
}

.bloom-rail-item.bloom-rail-compact > span {
  display: none;
}

#bloom-sidebar-panel {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: min(280px, calc(100vw - 16px));
  max-height: min(60vh, 420px);
  overflow: auto;
  margin: 0;
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
`;var Tr="bloom-root",D="bloom-rail-item",Je="bloom-account-item",J="bloom-sidebar-panel",Xe="bloom-settings-css",Mr=2e3,kr=w({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),We=null,Ar=null,jt=!1,Ee=!1,qt=[],Ge=null,Ze=null,B=null,Ye=null,I=null,ye=null,be,ot=null,rt=null,he=null,Qe=null,et=null,P=null;function it(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Wn(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Pr(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>'}function Ir(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l-.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>'}var Rr={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>'};function Hr(e){return Rr[e]??it()}function Or(){return"auto"}function Bt(){let e=Or(),t=Vn(e);We&&(We.setAttribute("data-bloom-scheme",t),Gn(We,t,e==="auto")),le("schemeChange",{scheme:t,pref:e})}function ve(e,t){e&&(e.hidden=t,e.toggleAttribute("inert",t),t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden"))}function Xn(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel").forEach(e=>e.remove())}function Zn(){if(O("settings",Nt),document.getElementById(Xe)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=Xe,e.textContent=Nt,document.head.appendChild(e)}function Nr(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Qn(){for(let e of qt)e();qt=[]}function eo(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function Br(e){return!!e.settings&&Object.keys(e.settings.def).length>0}function Dr(e,t,n){if(n.hidden)return null;if(n.type===5&&n.render){let a=document.createElement("details");a.className="bloom-field bloom-field-block";let s=document.createElement("summary");s.textContent=n.description||t;let l=document.createElement("div");return qt.push(n.render(l)),a.append(s,l),a}let o=document.createElement("div");o.className="bloom-field";let r=document.createElement("span");r.textContent=n.description||t,o.appendChild(r);let i=c.store.plugins[e]??(c.store.plugins[e]={});if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??n.options.find(s=>s.default)?.value??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=eo(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),o.appendChild(a),o}return o}function $t(){jt=!1,Qn(),P&&P.replaceChildren(),ve(rt,!0),ve(ot,!1)}function _r(e){if(Qn(),jt=!0,Qe&&(Qe.textContent=e.name),et&&(et.textContent=e.description),P){if(P.replaceChildren(),e.settings)for(let[t,n]of Object.entries(e.settings.def)){let o=Dr(e.name,t,n);o&&P.appendChild(o)}if(!P.childElementCount){let t=document.createElement("p");t.className="bloom-dialog-empty",t.textContent="No configurable settings.",P.appendChild(t)}}ve(ot,!0),ve(rt,!1)}function qr(e){let t=document.createElement("div");t.className="bloom-plugin-row";let n=document.createElement("span");n.className="bloom-plugin-icon",n.innerHTML=Hr(e.name);let o=document.createElement("span");if(o.className="bloom-plugin-label",o.textContent=e.name,t.append(n,o),Br(e)){let a=document.createElement("button");a.type="button",a.className="bloom-icon-btn",a.setAttribute("aria-label",`${e.name} settings`),a.innerHTML=Ir(),a.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),_r(e)}),t.appendChild(a)}let r=eo(e.name,Be(e.name),!!e.required),i=r.querySelector("input");return i?.addEventListener("click",a=>a.stopPropagation()),i?.addEventListener("change",()=>{An(e.name)}),t.appendChild(r),t}function Fr(){if(he){he.replaceChildren();for(let e of Object.values(L))e.hidden||e.name==="Settings"||he.appendChild(qr(e))}}function Dt(e){e.stopPropagation()}function _t(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function zt(){document.getElementById(D)?.setAttribute("aria-expanded",Ee?"true":"false")}function jr(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function tt(){$t(),document.getElementById(J)?.remove(),Ee=!1,zt()}function $r(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",Dt),t.addEventListener("pointerup",Dt),t.addEventListener("click",Dt);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=it();let a=document.createElement("h2");a.textContent="Bloom++",r.append(i,a);let s=document.createElement("button");s.type="button",s.className="bloom-icon-btn",s.setAttribute("aria-label","Close"),s.innerHTML=Wn(),s.addEventListener("click",tt),o.append(r,s),n.appendChild(o);let l=document.createElement("p");l.className="bloom-settings-sub",l.textContent="Plugins",n.appendChild(l);let g=document.createElement("div");g.className="bloom-plugin-list",n.appendChild(g);let u=document.createElement("div");u.className="bloom-settings-plugin",ve(u,!0);let b=document.createElement("div");b.className="bloom-settings-head";let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn",d.setAttribute("aria-label","Back"),d.innerHTML=Pr(),d.addEventListener("click",$t);let V=document.createElement("div");V.className="bloom-dialog-titles";let k=document.createElement("h2"),A=document.createElement("p");A.className="bloom-settings-sub",V.append(k,A);let m=document.createElement("button");m.type="button",m.className="bloom-icon-btn",m.setAttribute("aria-label","Close"),m.innerHTML=Wn(),m.addEventListener("click",tt),b.append(d,V,m);let q=document.createElement("div");return q.className="bloom-plugin-settings",u.append(b,q),t.append(n,u),ot=n,rt=u,he=g,Qe=k,et=A,P=q,Fr(),t}function zr(e){e.classList.add("bloom-rail-dock")}function Kr(){let e=document.getElementById(D);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&Ke(e)?e:null}function Vr(){if(document.getElementById(J)?.remove(),!document.body)return;let e=$r(J);zr(e),document.body.appendChild(e),Ee=!0,$t(),zt(),le("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:y,dock:"body",rail:!!Kr()})}function Kt(){let e=document.getElementById(J);if(e instanceof HTMLElement&&e.isConnected&&jr(e)){tt();return}e?.remove(),Vr()}function Gr(){let e=document.createElement("button");return e.type="button",e.id=D,e.className="bloom-rail-item",e.setAttribute("aria-controls",J),e.setAttribute("aria-expanded",Ee?"true":"false"),e.innerHTML=`${it()}<span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),Kt()}),e}function Yn(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function Jn(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Ur(){if(ye?.isConnected&&I){I.observe(ye,{childList:!0});return}Ft()}function nt(){if(document.body){I?.disconnect();try{let e=document.getElementById(D),t=e instanceof HTMLButtonElement?e:Gr(),n=Ve(),o=It();if(n){let r=Rt(n),i=r.parentElement;if(Jn(r)||i&&Jn(i))return;t.isConnected&&t.nextElementSibling===r||r.before(t),Yn(t)}else o?(t.parentElement!==o&&o.appendChild(t),Yn(t,!0)):t.isConnected&&!Ke(t)&&t.remove()}finally{Ur(),zt()}}}function Ft(){let e=zn();e&&(ye===e&&I||(I?.disconnect(),ye=e,I=new MutationObserver(()=>{document.getElementById(D)?.isConnected||nt()}),I.observe(e,{childList:!0})))}function Wr(){nt(),Ft(),be===void 0&&(be=window.setInterval(()=>{document.getElementById(D)?.isConnected||nt(),Ft()},Mr))}function Yr(){be!==void 0&&(clearInterval(be),be=void 0),I?.disconnect(),I=null,ye=null}function Jr(e){Ye===e&&B||(B?.disconnect(),Ye=e,B=new MutationObserver(()=>{if(!e.isConnected){B?.disconnect(),B=null,Ye=null;return}to(e)}),B.observe(e,{childList:!0}))}function to(e){if(Jr(e),e.querySelector(`#${Je}`))return;let t=document.createElement("button");t.type="button",t.id=Je,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${it()}<span>Bloom++</span>`,t.addEventListener("pointerdown",_t),t.addEventListener("pointerup",_t),t.addEventListener("click",n=>{_t(n),Kt()}),e.insertBefore(t,e.firstChild)}function Ue(){let e=$n();return e?(to(e),!0):!1}function Xr(e){Kn(e)&&(queueMicrotask(Ue),requestAnimationFrame(()=>{Ue()}),window.setTimeout(Ue,60),window.setTimeout(Ue,180))}function Zr(){Ze?.abort();let e=new AbortController;Ze=e,document.addEventListener("click",Xr,{signal:e.signal})}function Qr(){Ze?.abort(),Ze=null,B?.disconnect(),B=null,Ye=null}function no(){W(),Nr(()=>{Zn(),Xn(),nt(),Kt()})}var oo=h({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[C.p],required:!0,hidden:!0,enabledByDefault:!0,settings:kr,startAt:"HostReady",cleanupSelectors:[`#${Tr}`,`#${D}`,`#${Je}`,`#${J}`,`#${Xe}`,"#bloom-menu-panel"],start(){Zn(),Xn(),Wr(),Zr(),Ge?.(),Ge=Un(Bt),Bt()},stop(){Yr(),Qr(),Ge?.(),Ge=null,tt(),document.getElementById(D)?.remove(),document.getElementById(Je)?.remove(),document.getElementById(Xe)?.remove(),We=null,Ar=null,ot=null,rt=null,he=null,Qe=null,et=null,P=null,Ee=!1,jt=!1},onSettingsChange:Bt});var ao='form[data-type="unified-composer"], form.w-full[data-type]',X=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),at=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),ro=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),io=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),ei=/stop streaming|stop generating|停止生成|停止输出|停止响应/;function v(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function $(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!v(r)))return r;return null}function so(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function T(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=so(e);return!!(ei.test(n)||/^stop$/i.test(n))}function _(){let t=Array.from(document.querySelectorAll(ao)).find(v);if(t instanceof HTMLElement)return t;let n=$(document,X),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function z(){let e=Array.from(document.querySelectorAll(X));return e.find(v)??e[0]??null}function Vt(){let e=z();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function ti(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function lo(e){let t=_();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!v(n))&&e(n))return n;return null}function st(){let e=_(),t=$(e,at)??$(document,at);return t&&!T(t)?t:lo(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!T(n);let r=so(n);return/^(send|send prompt|发送)$/i.test(r)&&!T(n)})}function Gt(){let e=st();return!!e&&ti(e)}function Ut(){let e=_(),t=$(e,ro,!0)??$(document,ro,!0);if(t)return t;let n=$(e,io)??$(document,io);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&v(o)&&T(o))return o}return lo(T)}function Z(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}var Wt=0;function co(e){Wt+=1;try{e()}finally{Wt-=1}}function lt(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function Q(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function uo(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function ni(e){let{head:t}=document;if(t)for(let n of Array.from(t.querySelectorAll("link")))n.id!==e&&lt(n)&&n.remove()}function oi(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Yt(e,t){let{head:n}=document;!n||!t||co(()=>{ni(e);let o=uo(e),{type:r,sizes:i}=oi(t);o?n.lastElementChild!==o&&n.appendChild(o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function mo(e,t){let{head:n}=document;n&&co(()=>{uo(e)?.remove();let o=Array.from(n.querySelectorAll("link")).filter(lt);if(o.length){Q(t)&&o[0].href!==t&&(o[0].href=t);return}if(!Q(t))return;let r=document.createElement("link");r.rel="icon",r.href=t,n.appendChild(r)})}function fo(e,t){let{head:n}=document;if(!n)return null;let o=new MutationObserver(r=>{if(!Wt)for(let i of r){if(i.type==="attributes"&&lt(i.target)){t(i.target.id===e?void 0:i.target.href);return}for(let a of i.addedNodes)if(lt(a)&&a.id!==e){t(a.href);return}}});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}function ct(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=g=>{let u=n.indexOf(g);return u>=0&&n[u+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(g,u)=>{try{return document.querySelector(g)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function ut(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function ri(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!v(t))&&(T(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function ii(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&v(e))}function ai(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&v(e))}function si(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Jt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function dt(){if(Ut()||ri())return!0;let e=st();return e&&v(e)&&!T(e)?!1:!!(ii()||ai()||si())}var li=["original","badge","dot","hole","bg"],bo=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge",default:!0},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],ho={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},mt="#FCFCFC",ci="#111111",po="#111111",ui="#ffffff",di="#212121",mi="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",fi={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},ft=32,go=64;function yo(e){return typeof e=="string"&&li.includes(e)}function pi(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function pt(e){let t=document.createElement("canvas");t.width=ft,t.height=ft;let n=t.getContext("2d");return n?(n.scale(ft/go,ft/go),e(n),t.toDataURL("image/png")):""}function gi(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function gt(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(mi);n&&(e.strokeStyle=ci,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function bi(e,t,n){let o=ho[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=po,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=po,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=ui,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function xe(e,t){if(e==="original")return t==="wait"?pt(o=>gt(o,mt)):pi(fi[t]);let n=t==="wait"?void 0:ho[t];return pt(e==="hole"?o=>gt(o,n??mt):e==="bg"?o=>{o.fillStyle=n??di,gi(o,0,0,64,64,14),o.fill(),gt(o,mt,!1)}:o=>{gt(o,mt),t!=="wait"&&bi(o,t,e==="dot"?"dot":"badge")})}function vo(e){return{wait:xe(e,"wait"),rotate:xe(e,"rotate"),done:xe(e,"done"),ready:xe(e,"ready"),error:xe(e,"error")}}var hi=new p("ChatStateFavicons"),te="bloom-chat-state-favicon",wo=w({style:{type:3,description:"Favicon overlay",options:bo}}),ne="",Zt={wait:"",rotate:"",done:"",ready:"",error:""},Qt="wait",we=!1,R=!1,E=null,Le="",Ce="",Te=!0,Se=null,oe=0,ee,bt=null,K=null,Xt=null,Me=!1,Eo=new WeakSet,yi=400;function vi(){let e=wo.store.style;return yo(e)?e:"badge"}function Ei(){let t=document.querySelector(`link[rel~="icon"]:not(#${te})`)?.href;return Q(t)?t:Q(ne)?ne:""}function x(e){Qt=e,Yt(te,Zt[e])}function xo(){Zt=vo(vi()),x(Qt)}function xi(){let e=ct(),t=e?ut(e):ut("");return dt()?(!Le&&t&&(Le=t),Le||t):(Le="",t)}function Lo(){we=!1,R=!1,E=null,Le=""}function Si(e){Ce=e,Lo(),Te=!1,x("wait")}function Co(){if(!Me)return;let e=ct()||location.pathname;if(Ce&&e&&Ce!==e){Si(e);return}e&&(Ce=e);let t=xi(),n=dt(),o=Vt(),r=Gt();if(Jt()&&!n){x("error"),we=!1,R=!1,E=null;return}if(n){we=!0,R=!1,E=t,x("rotate");return}if(we){let i=!!E&&!!t&&E===t;if(we=!1,i){R=!0,E=t,x("done");return}R=!1,E=null}if(R)if(!!(E&&t&&E!==t))R=!1,E=null;else if(o){x("done");return}else if(Te){R=!1,x("ready");return}else{R=!1,x("wait");return}E=null,x(o?"wait":Te?"ready":"wait")}function To(){let e=_();if(!(K&&Xt===e&&e.isConnected)){if(K?.disconnect(),Xt=e,!e||e===document.body){K=null;return}K=new MutationObserver(()=>ht()),K.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid","class"]})}}function ht(){!Me||oe||(oe=requestAnimationFrame(()=>{oe=0,Me&&(Mo(),To(),Co())}))}function So(){Te=!0,ht()}function Mo(){let e=z();!e||Eo.has(e)||(Eo.add(e),e.addEventListener("input",So,{passive:!0}),e.addEventListener("compositionend",So,{passive:!0}))}var ko=h({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[C.p],tags:["chat","ui"],enabledByDefault:!0,settings:wo,startAt:"DOMContentLoaded",cleanupSelectors:[`#${te}`],start(){Me=!0,ne=Ei()||ne,xo(),bt?.disconnect(),bt=fo(te,e=>{Q(e)&&(ne=e),Yt(te,Zt[Qt])}),Se?.abort(),Se=new AbortController,window.addEventListener("popstate",ht,{signal:Se.signal}),Mo(),To(),ee!==void 0&&clearInterval(ee),ee=setInterval(ht,yi),Co(),hi.debug("favicon watch started")},stop(){Me=!1,oe&&cancelAnimationFrame(oe),oe=0,ee!==void 0&&(clearInterval(ee),ee=void 0),Se?.abort(),Se=null,K?.disconnect(),K=null,Xt=null,bt?.disconnect(),bt=null,Lo(),Ce="",Te=!0,mo(te,ne)},onSettingsChange:xo});var Ao=`.bloom-ih-hud {
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
`;var Po=new p("InputHistory"),en=/\u200B/g,Io=10,Ro=500,Ho=100,Li=8,Ci=120,Ti=2e3,yt=10,vt=w({maxEntries:{type:4,description:"Max stored prompts",min:Io,max:Ro,default:Ho},history:{type:5,description:"Stored prompts",render:ji},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),tn=new Map,f=0,nn="",M=!1,Ae=!1,an=0,ke=null,on,sn=null,Oo=!0;function S(){let e=vt.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function No(e){let t=xn(Number(vt.store.maxEntries??Ho),Io,Ro);return e.length>t?e.slice(e.length-t):e}function Et(e){vt.store.entries=No(e)}function Mi(e){return e.replaceAll(en,"").replace(/\n$/,"").trim()}function rn(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(X);return n instanceof HTMLElement?n:z()}function ki(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!Z(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(en,"").trim().length===0,last:i.toString().replaceAll(en,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Bo(e,t){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch(i){Po.debug("pm caret failed:",i)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function Do(e){clearTimeout(on),on=setTimeout(()=>{if(e!==an)return;Ae=!1;let t=sn;t&&Bo(t,Oo)},Ci)}function _o(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),Ae=!0,sn=e,Oo=n;let i=++an;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(a){Po.debug("insertText failed:",a),e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),Bo(e,n),Do(i)}function Ai(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function re(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Pi(){document.querySelector(".bloom-ih-hud")?.remove()}function Ii(e,t){let n=Ai();n.textContent=e;let o=(t.closest("form")??_()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-Li)}px`,n.classList.add("bloom-ih-hud-on")}function ln(e){let t=Mi(e);if(!t)return;let n=Date.now(),o=tn.get(t);if(o&&n-o<Ti)return;tn.set(t,n);let r=S().filter(i=>i!==t);r.push(t),Et(r),f=S().length,M=!1,re()}function Ri(e,t){let n=S();if(!n.length&&e)return;f>=n.length&&(nn=Z(t),f=n.length);let o=e?f-1:f+1;o<0||o>n.length||(f=o,M=!0,_o(t,o===n.length?nn:n[o],e),o<n.length?Ii(`${o+1} / ${n.length}`,t):re())}function Hi(e){M=!1,re(),_o(e,nn,!1),f=S().length}function Oi(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=rn(e.target)??rn(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&M&&!e.altKey&&!e.shiftKey){Hi(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){ln(Z(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=S();if(!o){let i=ki(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||f<=0)||!n&&f>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),Ri(n,t))}function Ni(e){if(rn(e.target)){if(Ae){Do(an);return}M&&(M=!1,re(),f=S().length)}}function Bi(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(X);n instanceof HTMLElement&&ln(Z(n))}function Di(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(at);if(!n||!(n instanceof HTMLElement)||T(n))return;let o=z();o&&ln(Z(o))}function _i(e){if(!(!M||Ae)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}M=!1,re()}}function qi(){if(ke)return;ke=new AbortController;let{signal:e}=ke,t={capture:!0,signal:e};window.addEventListener("keydown",Oi,t),window.addEventListener("input",Ni,t),window.addEventListener("submit",Bi,t),window.addEventListener("click",Di,t),window.addEventListener("pointerdown",_i,t)}function Fi(e){let t=S().slice();t.splice(e,1),Et(t),f>t.length&&(f=t.length)}function ji(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=S().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(m=>m.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/yt));n>=l&&(n=l-1);let g=s.slice(n*yt,n*yt+yt);e.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=t,u.addEventListener("input",()=>{t=u.value,n=0,r()}),e.appendChild(u),g.length){let m=document.createElement("div");m.className="bloom-ih-list",g.forEach((q,St)=>{let Zo=i.indexOf(q),Qo=S().length-1-Zo,wt=document.createElement("div");wt.className="bloom-ih-item";let ie=document.createElement("button");ie.type="button",ie.className=`bloom-ih-body${o===St?"":" bloom-ih-clamp"}`,ie.textContent=q,ie.addEventListener("click",()=>{o=o===St?-1:St,r()});let Lt=document.createElement("div");Lt.className="bloom-ih-actions";let ae=document.createElement("button");ae.type="button",ae.title="Copy",ae.textContent="C",ae.addEventListener("click",()=>{wn(q)});let se=document.createElement("button");se.type="button",se.title="Delete",se.textContent="\xD7",se.addEventListener("click",()=>{Fi(Qo),r()}),Lt.append(ae,se),wt.append(ie,Lt),m.appendChild(wt)}),e.appendChild(m)}else{let m=document.createElement("p");m.className="bloom-ih-empty",m.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(m)}let b=document.createElement("div");b.className="bloom-ih-pager";let d=document.createElement("button");d.type="button",d.className="bloom-ih-btn",d.textContent="Prev",d.disabled=n<=0,d.addEventListener("click",()=>{n-=1,r()});let V=document.createElement("span");V.textContent=`${n+1} / ${l}`;let k=document.createElement("button");k.type="button",k.className="bloom-ih-btn",k.textContent="Next",k.disabled=n+1>=l,k.addEventListener("click",()=>{n+=1,r()});let A=document.createElement("button");A.type="button",A.className="bloom-ih-clear",A.textContent="Clear all",A.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Et([]),f=0,r())}),b.append(d,V,k,A),e.appendChild(b)};return r(),()=>{e.replaceChildren()}}var qo=h({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[C.p],tags:["chat"],enabledByDefault:!0,settings:vt,startAt:"HostReady",managedStyle:"inputHistory",start(){O("inputHistory",Ao),f=S().length,M=!1,qi()},stop(){ke?.abort(),ke=null,re(),Pi(),tn.clear(),clearTimeout(on),Ae=!1,sn=null,M=!1},onSettingsChange(){let e=S(),t=No(e);t.length!==e.length&&Et(t),f>t.length&&(f=t.length)}});var cn="noShareLink",$i=['button[data-testid="share-chat-button"]'],zi=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],un=w({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Fo(e){return`${e.join(",")}{display:none!important}`}function jo(){let e=[];if(un.store.hideShareChat!==!1&&e.push(Fo($i)),un.store.hideShareProject!==!1&&e.push(Fo(zi)),!e.length){F(cn);return}O(cn,e.join(`
`))}var $o=h({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[C.p],tags:["ui","privacy"],enabledByDefault:!1,startAt:"HostReady",settings:un,start:jo,onSettingsChange:jo,stop(){F(cn)}});var Vo="noDictation",Ki=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]'],Vi=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Go=w({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function zo(e){return`${e.join(",")}{display:none!important}`}function Ko(){let e=[zo(Ki)];Go.store.hideDictationSettings!==!1&&e.push(zo(Vi)),O(Vo,e.join(`
`))}var Uo=h({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[C.p],tags:["chat","ui"],enabledByDefault:!1,startAt:"HostReady",settings:Go,start:Ko,onSettingsChange:Ko,stop(){F(Vo)}});var Pe=new p("Bloom"),Wo=!1,Gi=Date.now(),Ui=[oo,ko,qo,$o,Uo];function xt(e){return new Promise(t=>setTimeout(t,e))}function Wi(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var Jo=8e3,Yo=300,Yi=250;async function Ji(){if(j())return await xt(Yo),!0;for(;Date.now()-Gi<Jo;)if(await xt(Yi),j())return await xt(Yo),!0;return j()||At()}function dn(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function Xi(){if(dn())return!0;let e=Date.now()+Jo;for(;Date.now()<e;)if(await xt(100),dn())return!0;return dn()}function Zi(){try{GM_registerMenuCommand?.("Bloom++ settings",no)}catch{}}function Qi(){_e(()=>{me("HostShell"),Pe.info("host shell",y)}),qe(()=>{Pe.info("idle ready",y)}),Fe(()=>{gn(),me("HostReady"),Pe.info("chrome ready",y)})}async function mn(){await Ln()}async function fn(){if(Wo)return;Wo=!0;for(let n of Ui)try{kn(n)}catch(o){Pe.error("register failed",n.name,o)}In(),me("Init"),Zi(),Qi();let e=()=>me("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await Wi(),Xi().then(n=>{n&&je()}),!await Ji()){Pe.warn("late islands not detected; starting default plugins",y),W(),$e();return}await Dn()}var Xo=typeof unsafeWindow<"u"?unsafeWindow:window;if(window===window.top){let e=Xo.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",y);try{Object.defineProperty(Xo,"Bloom",{value:pn,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}mn().then(()=>fn()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
