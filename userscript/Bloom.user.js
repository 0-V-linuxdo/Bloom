// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260902] v1.4.7
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

/* Bloom++ [20260902] v1.4.7. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var wr=Object.defineProperty;var Lr=(e,t)=>{for(var n in t)wr(e,n,{get:t[n],enumerable:!0})};var An={};Lr(An,{REPO_URL:()=>io,Settings:()=>c,VERSION:()=>S,hasLateIslands:()=>Z,init:()=>Pn,initSettings:()=>kn,isDocumentInteractive:()=>ao,plugins:()=>P,requestChromeReady:()=>rt,requestIdleReady:()=>le,requestShellReady:()=>ot,whenChromeReady:()=>nt,whenIdleReady:()=>tt,whenShellReady:()=>et});var j=new Map,Ke=!1;function Cr(){return document.getElementById("bloom-root")?.shadowRoot??null}function Tr(){return document.head??null}function re(){let e=Cr();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=Mr()}function qt(e,t){if(!Ke)return;let n=Tr();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),re();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,re();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,re()}function $(e,t){let n=j.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},j.set(e,n)),Ke&&qt(e,n)}function Hn(){Ke=!0;for(let[e,t]of j)qt(e,t);return re(),!0}function Rn(e){let t=j.get(e);t&&(t.disabled=!1,Ke&&qt(e,t))}function In(e){let t=j.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),re())}function J(e){let t=j.get(e);t&&(t.el?.remove(),j.delete(e),re())}function Mr(){return Array.from(j.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var v=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function E(e){return e}var jt=new Map;function Ge(e,t){let n=jt.get(e);return n||(n=new Set,jt.set(e,n)),n.add(t),()=>n.delete(t)}function X(e,t){let n=jt.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var kr="bloompp";function Nn(){return new Promise((e,t)=>{let n=indexedDB.open(kr,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function Bn(e){try{let t=await Nn();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function On(e,t){try{let n=await Nn();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function xe(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Dn(e,t,n){return Math.min(n,Math.max(t,e))}function _n(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function Fn(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}var Ue=new v("SettingsStore"),z="BloomSettings",Pr=100;function Ye(e){if(xe(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(xe(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return xe(n)?n:null}return null}catch{return null}}var We=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let l=i[a];if(l===void 0&&a!=="__proto__"){let s=n?`${n}.${a}`:a;for(let[p,m]of this.defaultGetters)if(s.startsWith(p)){let b=s.slice(p.length+1);if(b&&!b.includes(".")){let g=m(b);g!==void 0&&(i[a]=g,l=g);break}}}return xe(l)?this.makeProxy(l,n?`${n}.${a}`:a):l},set:(i,a,l)=>{if(i[a]===l)return!0;i[a]=l;let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Ue.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Pr))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(z,this.plain)}catch{try{GM_setValue(z,t)}catch(n){Ue.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(z,t)}catch{}On(z,t).catch(n=>Ue.warn("Failed to save settings to IndexedDB:",n))}catch(t){Ue.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){_n(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var Ar=new v("Settings"),Hr={plugins:{}},c=new We(structuredClone(Hr)),Rr=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function Ir(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function k(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(c.store.plugins[n]||(c.store.plugins[n]={}),c.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?c.plain.plugins[n]??{}:{}}};return t}function Nr(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function qn(){let e=null;if(e=Ye(Nr(z)),e||(e=Ye(await Bn(z))),!e)try{e=Ye(localStorage.getItem(z))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(c.plain.plugins=t),Ar.debug("Loaded settings")}}function jn(e,t){t&&(t.pluginName=e,c.plain.plugins[e]||(c.plain.plugins[e]={}),c.setDefaultGetter(Rr(e),n=>{if(n!=="enabled")return Ir(t.def,n)}))}function $n(){return c.plain.plugins.Settings||(c.store.plugins.Settings={}),c.store.plugins.Settings}function Je(){return $n().pinnedPlugins??[]}function zn(e){return Je().includes(e)}function Vn(e){let t=Je(),n=t.includes(e);return c.store.plugins.Settings={...c.plain.plugins.Settings,pinnedPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}function Xe(){return $n().starredPlugins??[]}function Kn(e){return Xe().includes(e)}function Gn(e){let t=Xe(),n=t.includes(e);return c.store.plugins.Settings={...c.plain.plugins.Settings,starredPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}var Ze=new v("PluginManager"),P={},Se=new Set;function Yn(e){if(P[e.name]){Ze.warn("Duplicate plugin",e.name);return}P[e.name]=e,jn(e.name,e.settings)}function ae(e){let t=P[e];if(!t)return!1;if(t.required)return!0;let n=c.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function Jn(e){let t=P[e];if(!t||t.required)return;let n=!ae(e);c.plain.plugins[e]||(c.store.plugins[e]={}),c.store.plugins[e].enabled=n,n?Xn(t):Br(t),X("pluginToggle",{name:e,enabled:n})}function Xn(e,t=!1){if(!Se.has(e.name)&&ae(e.name))try{e.managedStyle&&Rn(e.managedStyle),e.start?.(),Se.add(e.name),e.settings&&c.addPrefixChangeListener(`plugins.${e.name}.`,()=>{Se.has(e.name)&&e.onSettingsChange?.()}),t||Ze.debug("Started",e.name)}catch(n){Ze.error("Failed to start",e.name,n)}}function Br(e){if(Se.has(e.name)){try{e.stop?.()}catch(t){Ze.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(In(e.managedStyle),J(e.managedStyle)),Se.delete(e.name)}}function we(e){for(let t of Object.values(P))(t.startAt??"DOMContentLoaded")===e&&Xn(t)}var Un=2,Wn="defaultsRev";function Zn(){for(let t of Object.values(P))c.plain.plugins[t.name]||(c.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=c.store.plugins.Settings??(c.store.plugins.Settings={});if(e[Wn]!==Un){for(let t of["NoShareLink","NoDictation"]){let n=c.store.plugins[t]??(c.store.plugins[t]={});n.enabled=!1}e[Wn]=Un}}var Le=!1,Qe=!1,$t=!1,eo=[],to=[],no=[];function zt(e){let t=e.splice(0);for(let n of t)n()}function Ce(){Le||(Le=!0,zt(eo))}function Vt(){Qe||(Qe=!0,Le||Ce(),zt(to))}function oo(){$t||($t=!0,Le||Ce(),Qe||Vt(),zt(no))}function et(e){Le?e():eo.push(e)}function tt(e){Qe?e():to.push(e)}function nt(e){$t?e():no.push(e)}function ot(){Ce()}function le(){Ce(),Vt()}function rt(){oo()}function Qn(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function ro(){await Qn(4e3),Ce(),await Qn(4e3),Vt(),oo()}var A={p:"0-V-linuxdo"},S="[20260902] v1.4.7",io="https://github.com/0-V-linuxdo/Bloom";function Or(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Dr(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function Kt(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function Z(){return Kt()?Or()||Dr():!1}function ao(){return Z()}var _r=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),lo=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Fr=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),qr="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function se(e){return e.id==="bloom-root"||!!e.closest(qr)}function so(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function it(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function Gt(e){if(!(e instanceof HTMLElement)||!e.isConnected||se(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&it(t)?!1:e.getClientRects().length>0}function Te(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function jr(){let e=[];for(let t of document.querySelectorAll(_r))!(t instanceof HTMLElement)||!t.isConnected||se(t)||e.push(t);return e}function at(e){if(!e.isConnected||se(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function Me(){return jr().filter(at)[0]??null}function Ut(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||se(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function Wt(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!se(n)&&!Te(n)&&(t=n);let o=t.parentElement;if(o&&!Te(o)&&!se(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!Te(o.parentElement))return o}return t}function co(){let e=document.querySelectorAll(lo);for(let n of e)if(Gt(n)&&!it(n)&&so(n))return n;let t=document.querySelectorAll(Fr);for(let n of t){if(!Gt(n)||!so(n)||it(n))continue;let o=n.querySelector(lo);return Gt(o)&&!it(o)?o:n}return null}function uo(){let e=Me();if(e){let t=Wt(e),n=t.parentElement;if(n&&!Te(n))return n;if(!Te(t))return t}return Ut()}function mo(e){let t=Me();return t?e.composedPath().includes(t):!1}var Jt=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary"],$r={light:{"--main-surface-primary":"#ffffff","--main-surface-secondary":"#f4f4f4","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#f9f9f9","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#b4b4b4","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.1)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.2)","--link":"#0d0d0d","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#f4f4f4","--bg-primary":"#ffffff","--bg-secondary":"#f4f4f4"},dark:{"--main-surface-primary":"#212121","--main-surface-secondary":"#2f2f2f","--main-surface-tertiary":"#424242","--sidebar-surface-primary":"#171717","--text-primary":"#ececec","--text-secondary":"#b4b4b4","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ececec","--icon-secondary":"#b4b4b4","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.1)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.2)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.06)","--interactive-label-primary-default":"#ececec","--message-surface":"#2f2f2f","--bg-primary":"#212121","--bg-secondary":"#2f2f2f"}};function zr(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Vr(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function Yt(e){let t=zr(e);return t?Vr(t)>.55?"light":"dark":null}function Kr(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=Yt(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=Yt(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Yt(i);if(a)return a;let l=n.colorScheme||"";if(/\blight\b/.test(l)&&!/\bdark\b/.test(l))return"light";if(/\bdark\b/.test(l)&&!/\blight\b/.test(l))return"dark"}catch{}return"light"}function fo(e){return e==="auto"?Kr():e}function Gr(e){try{let t=getComputedStyle(document.documentElement);for(let n of Jt){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function po(e,t,n){let o=$r[t];if(n){Gr(e);for(let r of Jt)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of Jt)e.style.setProperty(r,o[r])}function go(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var Xt=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover. */

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
`;var Wr="bloom-root",W="bloom-rail-item",ut="bloom-account-item",de="bloom-sidebar-panel",mt="bloom-settings-css",Yr=2e3,Jr=k({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),ct=null,Xr=null,ce=!1,G=!1,nn=[],lt=null,ft=null,K=null,dt=null,D=null,Re=null,ke,vt=null,xt=null,Pe=null,pt=null,gt=null,H=null,Ae=null,bt=null,vo=null,He=null,Zt=[],Zr=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Qr=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],Et="",Ie="all",U="all";function St(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function bo(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function ei(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>'}function ti(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function ni(e){let t='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return e?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${t}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`}function oi(e){let t='<path d="M12 17v5"/>';return e?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var ri={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>'};function ii(e){return e.icon||ri[e.name]||St()}function ai(){return"auto"}function Qt(){let e=ai(),t=fo(e);ct&&(ct.setAttribute("data-bloom-scheme",t),po(ct,t,e==="auto")),X("schemeChange",{scheme:t,pref:e})}function Ne(e,t){e&&(e.hidden=t,e.toggleAttribute("inert",t),t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden"))}function xo(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel").forEach(e=>e.remove())}function Eo(){if($("settings",Xt),document.getElementById(mt)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=mt,e.textContent=Xt,document.head.appendChild(e)}function li(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function So(){for(let e of nn)e();nn=[]}function wo(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function si(e){return!!e.settings&&Object.keys(e.settings.def).length>0}function ci(e,t,n){if(n.hidden)return null;if(n.type===5&&n.render){let a=document.createElement("details");a.className="bloom-field bloom-field-block";let l=document.createElement("summary");l.textContent=n.description||t;let s=document.createElement("div");return nn.push(n.render(s)),a.append(l,s),a}let o=document.createElement("div");o.className=n.type===4?"bloom-field bloom-field-stack":"bloom-field";let r=document.createElement("span");r.className="bloom-field-label",r.textContent=n.description||t,o.appendChild(r);let i=c.store.plugins[e]??(c.store.plugins[e]={});if(n.type===3&&n.options){let a=document.createElement("select");for(let l of n.options){let s=document.createElement("option");s.value=l.value,s.textContent=l.label,a.appendChild(s)}return a.value=String(i[t]??n.options.find(l=>l.default)?.value??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let l=document.createElement("input");l.type="range",l.min=String(n.min??0),l.max=String(n.max??100),l.value=String(i[t]??n.min??0);let s=document.createElement("span");return s.textContent=l.value,l.addEventListener("input",()=>{i[t]=Number(l.value),s.textContent=l.value}),a.append(l,s),o.appendChild(a),o}if(n.type===2){let a=wo(t,!!i[t],!1),l=a.querySelector("input");return l?.addEventListener("change",()=>{l&&(i[t]=l.checked)}),o.appendChild(a),o}return o}function rn(){ce=!1,So(),H&&H.replaceChildren(),Ne(xt,!0),Ne(vt,!1)}function di(e){if(So(),ce=!0,pt&&(pt.textContent=e.name),gt&&(gt.textContent=e.description),H){if(H.replaceChildren(),e.authors?.length){let t=document.createElement("p");t.className="bloom-plugin-authors",t.textContent=e.authors.join(", "),H.appendChild(t)}if(e.settings)for(let[t,n]of Object.entries(e.settings.def)){let o=ci(e.name,t,n);o&&H.appendChild(o)}if(!H.querySelector(".bloom-field, .bloom-dialog-empty")){let t=document.createElement("p");t.className="bloom-dialog-empty",t.textContent="No configurable settings.",H.appendChild(t)}}Ne(vt,!0),Ne(xt,!1)}function ui(e){let t=document.createElement("div");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=ii(e);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=e.name,a.title=e.name,r.append(i,a);let l=document.createElement("div");l.className="bloom-card-controls";let s=Kn(e.name),p=document.createElement("button");if(p.type="button",p.className=`bloom-icon-btn bloom-card-star${s?" bloom-card-star-active":""}`,p.setAttribute("aria-label",s?"Remove from favorites":"Add to favorites"),p.innerHTML=ni(s),p.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation();let u=Gn(e.name);X("pluginStar",{name:e.name,starred:u})}),l.appendChild(p),!e.required){let d=zn(e.name),u=document.createElement("button");u.type="button",u.className=`bloom-icon-btn bloom-card-pin${d?" bloom-card-pin-active":""}`,u.setAttribute("aria-label",d?"Unpin from top":"Pin to top"),u.innerHTML=oi(d),u.addEventListener("click",x=>{x.preventDefault(),x.stopPropagation();let N=Vn(e.name);X("pluginPin",{name:e.name,pinned:N})}),l.appendChild(u)}if(si(e)){let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn bloom-card-settings",d.setAttribute("aria-label",`${e.name} settings`),d.innerHTML=ti(),d.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),di(e)}),l.appendChild(d)}let m=wo(e.name,ae(e.name),!!e.required),b=m.querySelector("input");if(b?.addEventListener("click",d=>d.stopPropagation()),b?.addEventListener("change",()=>{Jn(e.name)}),l.appendChild(m),o.append(r,l),n.appendChild(o),e.description){let d=document.createElement("div");d.className="bloom-card-desc",d.textContent=e.description,n.appendChild(d)}let g=document.createElement("div");g.className="bloom-card-separator";let h=document.createElement("div");h.className="bloom-card-footer";let f=document.createElement("div");return f.className="bloom-card-author",f.textContent=e.authors?.filter(Boolean).join(", ")||"\xA0",h.appendChild(f),t.append(n,g,h),t}function Lo(){return Object.values(P).filter(e=>!e.hidden&&e.name!=="Settings")}function Co(e,t){return t==="all"||t==="favorites"?!0:(e.tags??[]).includes(t)}function mi(e){return`${e.name} ${e.description??""} ${(e.tags??[]).join(" ")}`.toLowerCase()}function fi(){return Et.trim()?"No plugins match your search.":U==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function pi(){let e=Lo();return Qr.filter(t=>t.id==="favorites"||t.id==="all"?!0:e.some(n=>Co(n,t.id)))}function gi(){if(He){He.replaceChildren();for(let e of pi()){let t=document.createElement("button");t.type="button",t.className=`bloom-plugin-tab${U===e.id?" bloom-plugin-tab-active":""}`,t.textContent=e.label,t.addEventListener("click",()=>{U=e.id,Q()}),He.appendChild(t)}}}function bi(){let e=Lo();if(U==="favorites"){let t=new Set(Xe());e=e.filter(n=>t.has(n.name))}else U!=="all"&&(e=e.filter(t=>Co(t,U)));return Ie==="enabled"&&(e=e.filter(t=>ae(t.name))),Ie==="disabled"&&(e=e.filter(t=>!ae(t.name))),e}function Q(){if(!Pe)return;gi();let e=bi();bt&&(bt.placeholder=`Search ${e.length} plugins...`);let t=e,n=Et.trim().toLowerCase();if(n&&(t=t.filter(o=>mi(o).includes(n))),U!=="favorites"){let o=Je();if(o.length){let r=new Map(o.map((i,a)=>[i,a]));t=t.slice().sort((i,a)=>{let l=r.has(i.name),s=r.has(a.name);return l!==s?l?-1:1:l?(r.get(i.name)??0)-(r.get(a.name)??0):i.name.localeCompare(a.name)})}}Pe.replaceChildren();for(let o of t)Pe.appendChild(ui(o));Ae&&(Ae.hidden=t.length>0,Ae.textContent=fi())}function en(e){e.stopPropagation()}function tn(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function an(){document.getElementById(W)?.setAttribute("aria-expanded",G?"true":"false")}function hi(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function ht(){rn(),Et="",Ie="all",U="all",document.getElementById(de)?.remove(),G=!1,an()}function yi(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",en),t.addEventListener("pointerup",en),t.addEventListener("click",en);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=St();let a=document.createElement("h2");a.textContent="Bloom++",r.append(i,a);let l=document.createElement("button");l.type="button",l.className="bloom-icon-btn",l.setAttribute("aria-label","Close"),l.innerHTML=bo(),l.addEventListener("click",ht),o.append(r,l),n.appendChild(o);let s=document.createElement("div");s.className="bloom-section-head";let p=document.createElement("h3");p.textContent="Plugins";let m=document.createElement("p");m.textContent="Turn Bloom++ features on or off. Sliders icon opens options.",s.append(p,m),n.appendChild(s);let b=document.createElement("div");b.className="bloom-plugin-tabs",n.appendChild(b);let g=document.createElement("div");g.className="bloom-search-bar";let h=document.createElement("input");h.type="search",h.className="bloom-search-input",h.setAttribute("aria-label","Search plugins"),h.placeholder="Search plugins...",h.addEventListener("input",()=>{Et=h.value,Q()});let f=document.createElement("select");f.className="bloom-search-filter",f.setAttribute("aria-label","Filter plugins");for(let q of Zr){let Ft=document.createElement("option");Ft.value=q.value,Ft.textContent=q.label,f.appendChild(Ft)}f.value=Ie,f.addEventListener("change",()=>{Ie=f.value,Q()}),g.append(h,f),n.appendChild(g);let d=document.createElement("div");d.className="bloom-plugin-list",n.appendChild(d);let u=document.createElement("p");u.className="bloom-tab-empty",u.hidden=!0,n.appendChild(u);let x=document.createElement("div");x.className="bloom-settings-plugin",Ne(x,!0);let N=document.createElement("div");N.className="bloom-settings-head";let F=document.createElement("button");F.type="button",F.className="bloom-icon-btn",F.setAttribute("aria-label","Back"),F.innerHTML=ei(),F.addEventListener("click",rn);let ve=document.createElement("div");ve.className="bloom-dialog-titles";let oe=document.createElement("h2"),B=document.createElement("p");B.className="bloom-settings-sub",ve.append(oe,B);let M=document.createElement("button");M.type="button",M.className="bloom-icon-btn",M.setAttribute("aria-label","Close"),M.innerHTML=bo(),M.addEventListener("click",ht),N.append(F,ve,M);let O=document.createElement("div");return O.className="bloom-plugin-settings",x.append(N,O),t.append(n,x),vt=n,xt=x,Pe=d,pt=oe,gt=B,H=O,Ae=u,bt=h,vo=f,He=b,Q(),t}function vi(e){e.classList.add("bloom-rail-dock")}function xi(){let e=document.getElementById(W);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&at(e)?e:null}function Ei(){if(document.getElementById(de)?.remove(),!document.body)return;let e=yi(de);vi(e),document.body.appendChild(e),G=!0,rn(),an(),X("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:S,dock:"center",rail:!!xi()})}function ln(){let e=document.getElementById(de);if(e instanceof HTMLElement&&e.isConnected&&hi(e)){ht();return}e?.remove(),Ei()}function Si(){let e=document.createElement("button");return e.type="button",e.id=W,e.className="bloom-rail-item",e.setAttribute("aria-controls",de),e.setAttribute("aria-expanded",G?"true":"false"),e.innerHTML=`<span class="bloom-rail-mark">${St()}</span><span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),ln()}),e}function ho(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function wi(e){let t=e.querySelector("img");if(t instanceof HTMLElement){let n=t.getBoundingClientRect();if(n.width>8&&n.height>8)return t}for(let n of e.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}return null}function Li(e,t){for(let n of e.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||t&&(n===t||n.contains(t)||t.contains(n))||(n.textContent||"").trim().length<2)continue;let r=n.getBoundingClientRect();if(r.width>16&&r.height>8&&r.height<40)return n}return null}function V(e,t,n){let o=`${n}px`;e.style.getPropertyValue(t)!==o&&e.style.setProperty(t,o)}function To(e,t){if(e.classList.contains("bloom-rail-compact"))return;let n=e.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!e.isConnected||!t.isConnected)return;let o=wi(t),r=getComputedStyle(t),i=Number.parseFloat(r.paddingTop),a=Number.parseFloat(r.paddingBottom);if(Number.isFinite(i)&&V(e,"padding-top",Math.round(i)),Number.isFinite(a)&&V(e,"padding-bottom",Math.round(a)),o){let l=o.getBoundingClientRect(),s=Math.max(20,Math.round(l.width));V(n,"width",s),V(n,"height",Math.max(20,Math.round(l.height)));let p=e.getBoundingClientRect(),m=Math.round(l.left-p.left);m>=0&&m<=40&&V(e,"padding-left",m);let b=Li(t,o);if(b){let g=b.getBoundingClientRect(),h=n.getBoundingClientRect(),f=Math.round(g.left-h.right);f>=0&&f<=24&&V(e,"gap",f)}}else{let l=Number.parseFloat(r.paddingLeft),s=Number.parseFloat(r.columnGap||r.gap);Number.isFinite(l)&&V(e,"padding-left",Math.round(l)),Number.isFinite(s)&&s>0&&V(e,"gap",Math.round(s))}}function yo(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Ci(){if(Re?.isConnected&&D){D.observe(Re,{childList:!0});return}on()}function yt(){if(document.body){D?.disconnect();try{let e=document.getElementById(W),t=e instanceof HTMLButtonElement?e:Si(),n=Me(),o=Ut();if(n){let r=Wt(n),i=r.parentElement;if(yo(r)||i&&yo(i))return;t.isConnected&&t.nextElementSibling===r||r.before(t),ho(t),To(t,n)}else o?(t.parentElement!==o&&o.appendChild(t),ho(t,!0)):t.isConnected&&!at(t)&&t.remove()}finally{Ci(),an()}}}function on(){let e=uo();e&&(Re===e&&D||(D?.disconnect(),Re=e,D=new MutationObserver(()=>{document.getElementById(W)?.isConnected||yt()}),D.observe(e,{childList:!0})))}function Ti(){yt(),on(),ke===void 0&&(ke=window.setInterval(()=>{let e=document.getElementById(W);if(!(e instanceof HTMLElement)||!e.isConnected)yt();else{let t=Me();t&&To(e,t)}on()},Yr))}function Mi(){ke!==void 0&&(clearInterval(ke),ke=void 0),D?.disconnect(),D=null,Re=null}function ki(e){dt===e&&K||(K?.disconnect(),dt=e,K=new MutationObserver(()=>{if(!e.isConnected){K?.disconnect(),K=null,dt=null;return}Mo(e)}),K.observe(e,{childList:!0}))}function Mo(e){if(ki(e),e.querySelector(`#${ut}`))return;let t=document.createElement("button");t.type="button",t.id=ut,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${St()}<span>Bloom++</span>`,t.addEventListener("pointerdown",tn),t.addEventListener("pointerup",tn),t.addEventListener("click",n=>{tn(n),ln()}),e.insertBefore(t,e.firstChild)}function st(){let e=co();return e?(Mo(e),!0):!1}function Pi(e){mo(e)&&(queueMicrotask(st),requestAnimationFrame(()=>{st()}),window.setTimeout(st,60),window.setTimeout(st,180))}function Ai(){ft?.abort();let e=new AbortController;ft=e,document.addEventListener("click",Pi,{signal:e.signal})}function Hi(){ft?.abort(),ft=null,K?.disconnect(),K=null,dt=null}function ko(){le(),li(()=>{Eo(),xo(),yt(),ln()})}var Po=E({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[A.p],required:!0,hidden:!0,enabledByDefault:!0,settings:Jr,startAt:"HostReady",cleanupSelectors:[`#${Wr}`,`#${W}`,`#${ut}`,`#${de}`,`#${mt}`,"#bloom-menu-panel"],start(){Eo(),xo(),Ti(),Ai(),lt?.(),lt=go(Qt),Qt(),Zt=[Ge("pluginToggle",()=>{G&&!ce&&Q()}),Ge("pluginPin",()=>{G&&!ce&&Q()}),Ge("pluginStar",()=>{G&&!ce&&Q()})]},stop(){Mi(),Hi(),lt?.(),lt=null;for(let e of Zt)e();Zt=[],ht(),document.getElementById(W)?.remove(),document.getElementById(ut)?.remove(),document.getElementById(mt)?.remove(),ct=null,Xr=null,vt=null,xt=null,Pe=null,pt=null,gt=null,H=null,Ae=null,bt=null,vo=null,He=null,G=!1,ce=!1},onSettingsChange:Qt});var Ro='form[data-type="unified-composer"], form.w-full[data-type]',ue=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),wt=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Ao=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Ho=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Ri=/stop streaming|stop generating|停止生成|停止输出|停止响应/;function w(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function ee(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!w(r)))return r;return null}function Io(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function R(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=Io(e);return!!(Ri.test(n)||/^stop$/i.test(n))}function Y(){let t=Array.from(document.querySelectorAll(Ro)).find(w);if(t instanceof HTMLElement)return t;let n=ee(document,ue),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function te(){let e=Array.from(document.querySelectorAll(ue));return e.find(w)??e[0]??null}function sn(){let e=te();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function Ii(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function No(e){let t=Y();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!w(n))&&e(n))return n;return null}function Lt(){let e=Y(),t=ee(e,wt)??ee(document,wt);return t&&!R(t)?t:No(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!R(n);let r=Io(n);return/^(send|send prompt|发送)$/i.test(r)&&!R(n)})}function cn(){let e=Lt();return!!e&&Ii(e)}function dn(){let e=Y(),t=ee(e,Ao,!0)??ee(document,Ao,!0);if(t)return t;let n=ee(e,Ho)??ee(document,Ho);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&w(o)&&R(o))return o}return No(R)}function me(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}var un=0;function Bo(e){un+=1;try{e()}finally{un-=1}}function Ct(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function fe(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function Oo(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function Ni(e){let{head:t}=document;if(t)for(let n of Array.from(t.querySelectorAll("link")))n.id!==e&&Ct(n)&&n.remove()}function Bi(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function mn(e,t){let{head:n}=document;!n||!t||Bo(()=>{Ni(e);let o=Oo(e),{type:r,sizes:i}=Bi(t);o?n.lastElementChild!==o&&n.appendChild(o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function Do(e,t){let{head:n}=document;n&&Bo(()=>{Oo(e)?.remove();let o=Array.from(n.querySelectorAll("link")).filter(Ct);if(o.length){fe(t)&&o[0].href!==t&&(o[0].href=t);return}if(!fe(t))return;let r=document.createElement("link");r.rel="icon",r.href=t,n.appendChild(r)})}function _o(e,t){let{head:n}=document;if(!n)return null;let o=new MutationObserver(r=>{if(!un)for(let i of r){if(i.type==="attributes"&&Ct(i.target)){t(i.target.id===e?void 0:i.target.href);return}for(let a of i.addedNodes)if(Ct(a)&&a.id!==e){t(a.href);return}}});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}function Tt(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=p=>{let m=n.indexOf(p);return m>=0&&n[m+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",l=(p,m)=>{try{return document.querySelector(p)?.getAttribute(m)||""}catch{return""}};return[l("[data-conversation-id]","data-conversation-id")||l("[data-thread-id]","data-thread-id")||l("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function Mt(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function Oi(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!w(t))&&(R(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function Di(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&w(e))}function _i(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&w(e))}function Fi(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function fn(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function kt(){if(dn()||Oi())return!0;let e=Lt();return e&&w(e)&&!R(e)?!1:!!(Di()||_i()||Fi())}var qi=["original","badge","dot","hole","bg"],jo=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge",default:!0},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],$o={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Pt="#FCFCFC",ji="#111111",Fo="#111111",$i="#ffffff",zi="#212121",Vi="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Ki={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},At=32,qo=64;function zo(e){return typeof e=="string"&&qi.includes(e)}function Gi(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function Ht(e){let t=document.createElement("canvas");t.width=At,t.height=At;let n=t.getContext("2d");return n?(n.scale(At/qo,At/qo),e(n),t.toDataURL("image/png")):""}function Ui(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function Rt(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(Vi);n&&(e.strokeStyle=ji,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function Wi(e,t,n){let o=$o[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=Fo,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=Fo,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=$i,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function Be(e,t){if(e==="original")return t==="wait"?Ht(o=>Rt(o,Pt)):Gi(Ki[t]);let n=t==="wait"?void 0:$o[t];return Ht(e==="hole"?o=>Rt(o,n??Pt):e==="bg"?o=>{o.fillStyle=n??zi,Ui(o,0,0,64,64,14),o.fill(),Rt(o,Pt,!1)}:o=>{Rt(o,Pt),t!=="wait"&&Wi(o,t,e==="dot"?"dot":"badge")})}function Vo(e){return{wait:Be(e,"wait"),rotate:Be(e,"rotate"),done:Be(e,"done"),ready:Be(e,"ready"),error:Be(e,"error")}}var Yi=new v("ChatStateFavicons"),ge="bloom-chat-state-favicon",Wo=k({style:{type:3,description:"Favicon overlay",options:jo}}),be="",gn={wait:"",rotate:"",done:"",ready:"",error:""},bn="wait",De=!1,_=!1,L=null,_e="",Fe="",qe=!0,Oe=null,he=0,pe,It=null,ne=null,pn=null,je=!1,Ko=new WeakSet,Ji=400;function Xi(){let e=Wo.store.style;return zo(e)?e:"badge"}function Zi(){let t=document.querySelector(`link[rel~="icon"]:not(#${ge})`)?.href;return fe(t)?t:fe(be)?be:""}function C(e){bn=e,mn(ge,gn[e])}function Go(){gn=Vo(Xi()),C(bn)}function Qi(){let e=Tt(),t=e?Mt(e):Mt("");return kt()?(!_e&&t&&(_e=t),_e||t):(_e="",t)}function Yo(){De=!1,_=!1,L=null,_e=""}function ea(e){Fe=e,Yo(),qe=!1,C("wait")}function Jo(){if(!je)return;let e=Tt()||location.pathname;if(Fe&&e&&Fe!==e){ea(e);return}e&&(Fe=e);let t=Qi(),n=kt(),o=sn(),r=cn();if(fn()&&!n){C("error"),De=!1,_=!1,L=null;return}if(n){De=!0,_=!1,L=t,C("rotate");return}if(De){let i=!!L&&!!t&&L===t;if(De=!1,i){_=!0,L=t,C("done");return}_=!1,L=null}if(_)if(!!(L&&t&&L!==t))_=!1,L=null;else if(o){C("done");return}else if(qe){_=!1,C("ready");return}else{_=!1,C("wait");return}L=null,C(o?"wait":qe?"ready":"wait")}function Xo(){let e=Y();if(!(ne&&pn===e&&e.isConnected)){if(ne?.disconnect(),pn=e,!e||e===document.body){ne=null;return}ne=new MutationObserver(()=>Nt()),ne.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid","class"]})}}function Nt(){!je||he||(he=requestAnimationFrame(()=>{he=0,je&&(Zo(),Xo(),Jo())}))}function Uo(){qe=!0,Nt()}function Zo(){let e=te();!e||Ko.has(e)||(Ko.add(e),e.addEventListener("input",Uo,{passive:!0}),e.addEventListener("compositionend",Uo,{passive:!0}))}var Qo=E({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[A.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Wo,startAt:"DOMContentLoaded",cleanupSelectors:[`#${ge}`],start(){je=!0,be=Zi()||be,Go(),It?.disconnect(),It=_o(ge,e=>{fe(e)&&(be=e),mn(ge,gn[bn])}),Oe?.abort(),Oe=new AbortController,window.addEventListener("popstate",Nt,{signal:Oe.signal}),Zo(),Xo(),pe!==void 0&&clearInterval(pe),pe=setInterval(Nt,Ji),Jo(),Yi.debug("favicon watch started")},stop(){je=!1,he&&cancelAnimationFrame(he),he=0,pe!==void 0&&(clearInterval(pe),pe=void 0),Oe?.abort(),Oe=null,ne?.disconnect(),ne=null,pn=null,It?.disconnect(),It=null,Yo(),Fe="",qe=!0,Do(ge,be)},onSettingsChange:Go});var er=`.bloom-ih-hud {
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
`;var tr=new v("InputHistory"),hn=/\u200B/g,nr=10,or=500,rr=100,na=8,oa=120,ra=2e3,Bt=10,Ot=k({maxEntries:{type:4,description:"Max stored prompts",min:nr,max:or,default:rr},history:{type:5,description:"Stored prompts",render:va},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),yn=new Map,y=0,vn="",I=!1,ze=!1,Sn=0,$e=null,xn,wn=null,ir=!0;function T(){let e=Ot.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ar(e){let t=Dn(Number(Ot.store.maxEntries??rr),nr,or);return e.length>t?e.slice(e.length-t):e}function Dt(e){Ot.store.entries=ar(e)}function ia(e){return e.replaceAll(hn,"").replace(/\n$/,"").trim()}function En(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(ue);return n instanceof HTMLElement?n:te()}function aa(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!me(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(hn,"").trim().length===0,last:i.toString().replaceAll(hn,"").trim().length===0}}catch{return{first:!0,last:!0}}}function lr(e,t){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch(i){tr.debug("pm caret failed:",i)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function sr(e){clearTimeout(xn),xn=setTimeout(()=>{if(e!==Sn)return;ze=!1;let t=wn;t&&lr(t,ir)},oa)}function cr(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),ze=!0,wn=e,ir=n;let i=++Sn;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(a){tr.debug("insertText failed:",a),e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),lr(e,n),sr(i)}function la(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function ye(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function sa(){document.querySelector(".bloom-ih-hud")?.remove()}function ca(e,t){let n=la();n.textContent=e;let o=(t.closest("form")??Y()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-na)}px`,n.classList.add("bloom-ih-hud-on")}function Ln(e){let t=ia(e);if(!t)return;let n=Date.now(),o=yn.get(t);if(o&&n-o<ra)return;yn.set(t,n);let r=T().filter(i=>i!==t);r.push(t),Dt(r),y=T().length,I=!1,ye()}function da(e,t){let n=T();if(!n.length&&e)return;y>=n.length&&(vn=me(t),y=n.length);let o=e?y-1:y+1;o<0||o>n.length||(y=o,I=!0,cr(t,o===n.length?vn:n[o],e),o<n.length?ca(`${o+1} / ${n.length}`,t):ye())}function ua(e){I=!1,ye(),cr(e,vn,!1),y=T().length}function ma(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=En(e.target)??En(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&I&&!e.altKey&&!e.shiftKey){ua(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){Ln(me(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=T();if(!o){let i=aa(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||y<=0)||!n&&y>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),da(n,t))}function fa(e){if(En(e.target)){if(ze){sr(Sn);return}I&&(I=!1,ye(),y=T().length)}}function pa(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(ue);n instanceof HTMLElement&&Ln(me(n))}function ga(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(wt);if(!n||!(n instanceof HTMLElement)||R(n))return;let o=te();o&&Ln(me(o))}function ba(e){if(!(!I||ze)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}I=!1,ye()}}function ha(){if($e)return;$e=new AbortController;let{signal:e}=$e,t={capture:!0,signal:e};window.addEventListener("keydown",ma,t),window.addEventListener("input",fa,t),window.addEventListener("submit",pa,t),window.addEventListener("click",ga,t),window.addEventListener("pointerdown",ba,t)}function ya(e){let t=T().slice();t.splice(e,1),Dt(t),y>t.length&&(y=t.length)}function va(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=T().slice().reverse(),a=t.trim().toLowerCase(),l=a?i.filter(u=>u.toLowerCase().includes(a)):i,s=Math.max(1,Math.ceil(l.length/Bt));n>=s&&(n=s-1);let p=l.slice(n*Bt,n*Bt+Bt);e.replaceChildren();let m=document.createElement("input");if(m.className="bloom-ih-search",m.type="search",m.placeholder="Search history",m.autocomplete="off",m.value=t,m.addEventListener("input",()=>{t=m.value,n=0,r()}),e.appendChild(m),p.length){let u=document.createElement("div");u.className="bloom-ih-list",p.forEach((x,N)=>{let F=i.indexOf(x),ve=T().length-1-F,oe=document.createElement("div");oe.className="bloom-ih-item";let B=document.createElement("button");B.type="button",B.className=`bloom-ih-body${o===N?"":" bloom-ih-clamp"}`,B.textContent=x,B.addEventListener("click",()=>{o=o===N?-1:N,r()});let M=document.createElement("div");M.className="bloom-ih-actions";let O=document.createElement("button");O.type="button",O.title="Copy",O.textContent="C",O.addEventListener("click",()=>{Fn(x)});let q=document.createElement("button");q.type="button",q.title="Delete",q.textContent="\xD7",q.addEventListener("click",()=>{ya(ve),r()}),M.append(O,q),oe.append(B,M),u.appendChild(oe)}),e.appendChild(u)}else{let u=document.createElement("p");u.className="bloom-ih-empty",u.textContent=l.length?"No matches.":"No stored prompts yet.",e.appendChild(u)}let b=document.createElement("div");b.className="bloom-ih-pager";let g=document.createElement("button");g.type="button",g.className="bloom-ih-btn",g.textContent="Prev",g.disabled=n<=0,g.addEventListener("click",()=>{n-=1,r()});let h=document.createElement("span");h.textContent=`${n+1} / ${s}`;let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Next",f.disabled=n+1>=s,f.addEventListener("click",()=>{n+=1,r()});let d=document.createElement("button");d.type="button",d.className="bloom-ih-clear",d.textContent="Clear all",d.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Dt([]),y=0,r())}),b.append(g,h,f,d),e.appendChild(b)};return r(),()=>{e.replaceChildren()}}var dr=E({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[A.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:Ot,startAt:"HostReady",managedStyle:"inputHistory",start(){$("inputHistory",er),y=T().length,I=!1,ha()},stop(){$e?.abort(),$e=null,ye(),sa(),yn.clear(),clearTimeout(xn),ze=!1,wn=null,I=!1},onSettingsChange(){let e=T(),t=ar(e);t.length!==e.length&&Dt(t),y>t.length&&(y=t.length)}});var Cn="noShareLink",xa=['button[data-testid="share-chat-button"]'],Ea=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],Tn=k({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function ur(e){return`${e.join(",")}{display:none!important}`}function mr(){let e=[];if(Tn.store.hideShareChat!==!1&&e.push(ur(xa)),Tn.store.hideShareProject!==!1&&e.push(ur(Ea)),!e.length){J(Cn);return}$(Cn,e.join(`
`))}var fr=E({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[A.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Tn,start:mr,onSettingsChange:mr,stop(){J(Cn)}});var br="noDictation",Sa=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]'],wa=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],hr=k({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function pr(e){return`${e.join(",")}{display:none!important}`}function gr(){let e=[pr(Sa)];hr.store.hideDictationSettings!==!1&&e.push(pr(wa)),$(br,e.join(`
`))}var yr=E({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[A.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:hr,start:gr,onSettingsChange:gr,stop(){J(br)}});var Ve=new v("Bloom"),vr=!1,La=Date.now(),Ca=[Po,Qo,dr,fr,yr];function _t(e){return new Promise(t=>setTimeout(t,e))}function Ta(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var Er=8e3,xr=300,Ma=250;async function ka(){if(Z())return await _t(xr),!0;for(;Date.now()-La<Er;)if(await _t(Ma),Z())return await _t(xr),!0;return Z()||Kt()}function Mn(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function Pa(){if(Mn())return!0;let e=Date.now()+Er;for(;Date.now()<e;)if(await _t(100),Mn())return!0;return Mn()}function Aa(){try{GM_registerMenuCommand?.("Bloom++ settings",ko)}catch{}}function Ha(){et(()=>{we("HostShell"),Ve.info("host shell",S)}),tt(()=>{Ve.info("idle ready",S)}),nt(()=>{Hn(),we("HostReady"),Ve.info("chrome ready",S)})}async function kn(){await qn()}async function Pn(){if(vr)return;vr=!0;for(let n of Ca)try{Yn(n)}catch(o){Ve.error("register failed",n.name,o)}Zn(),we("Init"),Aa(),Ha();let e=()=>we("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await Ta(),Pa().then(n=>{n&&ot()}),!await ka()){Ve.warn("late islands not detected; starting default plugins",S),le(),rt();return}await ro()}var Sr=typeof unsafeWindow<"u"?unsafeWindow:window;if(window===window.top){let e=Sr.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",S);try{Object.defineProperty(Sr,"Bloom",{value:An,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}kn().then(()=>Pn()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
