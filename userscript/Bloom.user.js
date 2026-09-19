// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260919] v1.4.27
// @description  Void++-style plugin host for chatgpt.com. Tab favicon, input history, recent chats, reply notify, Recents status, wider thread, message times, streamer blur, hide Share, Dictation, sidebar name, Download apps, upgrade CTAs, and ads.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @icon         https://raw.githubusercontent.com/0-V-linuxdo/Bloom/main/assets/logos/app-icon/bloom-icon.svg
// @icon64       https://raw.githubusercontent.com/0-V-linuxdo/Bloom/main/assets/logos/app-icon/bloom-icon-64.png
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
// @grant        GM_notification
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

/* Bloom++ [20260919] v1.4.27. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var ds=Object.defineProperty;var us=(e,t)=>{for(var n in t)ds(e,n,{get:t[n],enumerable:!0})};var fr={};us(fr,{REPO_URL:()=>jr,Settings:()=>f,VERSION:()=>R,hasLateIslands:()=>le,init:()=>ur,initSettings:()=>dr,isDocumentInteractive:()=>Fr,plugins:()=>_,requestChromeReady:()=>dn,requestIdleReady:()=>Se,requestShellReady:()=>cn,whenChromeReady:()=>ln,whenIdleReady:()=>sn,whenShellReady:()=>an});var W=new Map,Yt=!1;function fs(){return document.getElementById("bloom-root")?.shadowRoot??null}function ms(){return document.head??null}function we(){let e=fs();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=ps()}function ao(e,t){if(!Yt)return;let n=ms();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),we();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,we();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,we()}function x(e,t){let n=W.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},W.set(e,n)),Yt&&ao(e,n)}function mr(){Yt=!0;for(let[e,t]of W)ao(e,t);return we(),!0}function pr(e){let t=W.get(e);t&&(t.disabled=!1,Yt&&ao(e,t))}function gr(e){let t=W.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),we())}function w(e){let t=W.get(e);t&&(t.el?.remove(),W.delete(e),we())}function ps(){return Array.from(W.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var E=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function g(e){return e}var so=new Map;function Jt(e,t){let n=so.get(e);return n||(n=new Set,so.set(e,n)),n.add(t),()=>n.delete(t)}function se(e,t){let n=so.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var gs="bloompp";function hr(){return new Promise((e,t)=>{let n=indexedDB.open(gs,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function br(e){try{let t=await hr();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function yr(e,t){try{let n=await hr();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function st(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Zt(e,t,n){return Math.min(n,Math.max(t,e))}function vr(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function xr(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}function wr(e,t){let n;return((...o)=>{n&&clearTimeout(n),n=setTimeout(()=>e(...o),t)})}var Xt=new E("SettingsStore"),Y="BloomSettings",hs=100;function en(e){if(st(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(st(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return st(n)?n:null}return null}catch{return null}}var Qt=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let c=n?`${n}.${a}`:a;for(let[d,l]of this.defaultGetters)if(c.startsWith(d)){let u=c.slice(d.length+1);if(u&&!u.includes(".")){let m=l(u);m!==void 0&&(i[a]=m,s=m);break}}}return st(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let c=n?`${n}.${a}`:a;return this.notifyListeners(c),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Xt.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},hs))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(Y,this.plain)}catch{try{GM_setValue(Y,t)}catch(n){Xt.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(Y,t)}catch{}yr(Y,t).catch(n=>Xt.warn("Failed to save settings to IndexedDB:",n))}catch(t){Xt.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){vr(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var bs=new E("Settings"),ys={plugins:{}},f=new Qt(structuredClone(ys)),vs=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function xs(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function y(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(f.store.plugins[n]||(f.store.plugins[n]={}),f.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?f.plain.plugins[n]??{}:{}}};return t}function ws(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function Er(){let e=null;if(e=en(ws(Y)),e||(e=en(await br(Y))),!e)try{e=en(localStorage.getItem(Y))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(f.plain.plugins=t),bs.debug("Loaded settings")}}function Sr(e,t){t&&(t.pluginName=e,f.plain.plugins[e]||(f.plain.plugins[e]={}),f.setDefaultGetter(vs(e),n=>{if(n!=="enabled")return xs(t.def,n)}))}function Lr(){return f.plain.plugins.Settings||(f.store.plugins.Settings={}),f.store.plugins.Settings}function tn(){return Lr().pinnedPlugins??[]}function Cr(e){return tn().includes(e)}function Tr(e){let t=tn(),n=t.includes(e);return f.store.plugins.Settings={...f.plain.plugins.Settings,pinnedPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}function nn(){return Lr().starredPlugins??[]}function kr(e){return nn().includes(e)}function Mr(e){let t=nn(),n=t.includes(e);return f.store.plugins.Settings={...f.plain.plugins.Settings,starredPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}var on=new E("PluginManager"),_={},lt=new Set;function Pr(e){if(_[e.name]){on.warn("Duplicate plugin",e.name);return}_[e.name]=e,Sr(e.name,e.settings)}function Ee(e){let t=_[e];if(!t)return!1;if(t.required)return!0;let n=f.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function Nr(e){let t=_[e];if(!t||t.required)return;let n=!Ee(e);f.plain.plugins[e]||(f.store.plugins[e]={}),f.store.plugins[e].enabled=n,n?Hr(t):Es(t),se("pluginToggle",{name:e,enabled:n})}function Hr(e,t=!1){if(!lt.has(e.name)&&Ee(e.name))try{e.managedStyle&&pr(e.managedStyle),e.start?.(),lt.add(e.name),e.settings&&f.addPrefixChangeListener(`plugins.${e.name}.`,()=>{lt.has(e.name)&&e.onSettingsChange?.()}),t||on.debug("Started",e.name)}catch(n){on.error("Failed to start",e.name,n)}}function Es(e){if(lt.has(e.name)){try{e.stop?.()}catch(t){on.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(gr(e.managedStyle),w(e.managedStyle)),lt.delete(e.name)}}function ct(e){for(let t of Object.values(_))(t.startAt??"DOMContentLoaded")===e&&Hr(t)}var Ar=2,Rr="defaultsRev";function Ir(){for(let t of Object.values(_))f.plain.plugins[t.name]||(f.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=f.store.plugins.Settings??(f.store.plugins.Settings={});if(e[Rr]!==Ar){for(let t of["NoShareLink","NoDictation"]){let n=f.store.plugins[t]??(f.store.plugins[t]={});n.enabled=!1}e[Rr]=Ar}}var dt=!1,rn=!1,lo=!1,Br=[],Dr=[],_r=[];function co(e){let t=e.splice(0);for(let n of t)n()}function ut(){dt||(dt=!0,co(Br))}function uo(){rn||(rn=!0,dt||ut(),co(Dr))}function qr(){lo||(lo=!0,dt||ut(),rn||uo(),co(_r))}function an(e){dt?e():Br.push(e)}function sn(e){rn?e():Dr.push(e)}function ln(e){lo?e():_r.push(e)}function cn(){ut()}function Se(){ut(),uo()}function dn(){qr()}function Or(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function $r(){await Or(4e3),ut(),await Or(4e3),uo(),qr()}var b={p:"0-V-linuxdo"},R="[20260919] v1.4.27",jr="https://github.com/0-V-linuxdo/Bloom";function Ss(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Ls(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function fo(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function le(){return fo()?Ss()||Ls():!1}function Fr(){return le()}var Cs=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Gr=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Ts=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),ks="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function Ce(e){return e.id==="bloom-root"||!!e.closest(ks)}function zr(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function un(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function mo(e){if(!(e instanceof HTMLElement)||!e.isConnected||Ce(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&un(t)?!1:e.getClientRects().length>0}function Le(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Ms(){let e=[];for(let t of document.querySelectorAll(Cs))!(t instanceof HTMLElement)||!t.isConnected||Ce(t)||e.push(t);return e}function fn(e){if(!e.isConnected||Ce(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function ft(){return Ms().filter(fn)[0]??null}function po(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||Ce(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function go(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!Ce(n)&&!Le(n)&&n.parentElement&&!Le(n.parentElement)&&(t=n);let o=t.parentElement;if(o&&!Le(o)&&!Ce(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!Le(o.parentElement))return o}return t}function Kr(){let e=document.querySelectorAll(Gr);for(let n of e)if(mo(n)&&!un(n)&&zr(n))return n;let t=document.querySelectorAll(Ts);for(let n of t){if(!mo(n)||!zr(n)||un(n))continue;let o=n.querySelector(Gr);return mo(o)&&!un(o)?o:n}return null}function Ur(){let e=ft();if(e){let t=go(e),n=t.parentElement;if(n&&!Le(n))return n;if(!Le(t))return t}return po()}function Vr(e){let t=ft();return t?e.composedPath().includes(t):!1}var bo=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],As={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#212121","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Rs(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Ps(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function ho(e){let t=Rs(e);return t?Ps(t)>.55?"light":"dark":null}function Ns(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=ho(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=ho(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=ho(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Wr(e){return e==="auto"?Ns():e}function Hs(e){try{let t=getComputedStyle(document.documentElement);for(let n of bo){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function Yr(e,t,n){let o=As[t];if(n){Hs(e);for(let r of bo)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of bo)e.style.setProperty(r,o[r])}function Jr(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var yo=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
 * Colors follow chatgpt.com Settings (\`bg-token-bg-primary\`, shadow-long, inverted switch). */

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
  background: var(--bg-primary, #fff);
  border: 1px solid var(--border-xlight, rgba(0, 0, 0, 0.05));
  box-shadow: var(--shadow-long, 0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62));
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
  box-shadow: var(--shadow-long, 0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62));
}

.bloom-settings-list[hidden],
#bloom-sidebar-panel[hidden] {
  display: none !important;
}

.bloom-settings-list {
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
  gap: 0.25rem;
  margin: 0 0 10px;
  border-bottom: 0;
}

.bloom-plugin-tab {
  position: relative;
  margin: 0;
  padding: 0.375rem 0.75rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--text-secondary, #5d5d5d);
  font: inherit;
  font-size: 0.8125rem;
  cursor: pointer;
}

.bloom-plugin-tab:hover {
  background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
}

.bloom-plugin-tab-active {
  color: var(--text-primary, inherit);
  background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
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
  border: 1px solid var(--border-default, var(--border-medium, rgba(0, 0, 0, 0.1)));
  background: var(--bg-primary, #fff);
  color: inherit;
  font: inherit;
  font-size: 0.8125rem;
}

.bloom-search-input:focus {
  outline: 2px solid color-mix(in srgb, var(--text-primary, #0d0d0d) 28%, transparent);
  outline-offset: 1px;
}

.bloom-search-filter {
  width: 7.5rem;
  height: 32px;
  flex: 0 0 auto;
  border-radius: 8px;
  border: 1px solid var(--border-default, var(--border-medium, rgba(0, 0, 0, 0.1)));
  background: var(--bg-primary, #fff);
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
  border: 1px solid var(--border-light, rgba(0, 0, 0, 0.05));
  background: var(--bg-primary, #fff);
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

#bloom-plugin-layer {
  position: fixed;
  inset: 0;
  z-index: 10001;
  pointer-events: auto;
  background: transparent;
}

#bloom-plugin-dialog {
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: min(32rem, calc(100vw - 2rem));
  max-height: min(80vh, calc(100vh - 2rem));
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
  padding: 1.5rem;
  overflow: hidden;
  color: var(--text-primary, inherit);
  font: 14px/1.4 ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
  background: var(--bg-primary, #fff);
  border: 1px solid var(--border-xlight, rgba(0, 0, 0, 0.05));
  border-radius: 16px;
  box-shadow: var(--shadow-long, 0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62));
  pointer-events: auto;
}

.bloom-plugin-dialog-close {
  position: absolute;
  right: 1rem;
  top: 1rem;
  z-index: 1;
}

.bloom-plugin-dialog-header {
  text-align: left;
  padding-right: 2.5rem;
}

.bloom-plugin-dialog-header h2 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.bloom-plugin-dialog-sub {
  margin: 2px 0 0;
  font-size: 0.8125rem;
  line-height: 1.25rem;
  color: var(--text-secondary, #5d5d5d);
}

.bloom-plugin-dialog-rule {
  height: 1px;
  width: 100%;
  margin: 0;
  border: 0;
  background: var(--border-light, rgba(0, 0, 0, 0.1));
}

.bloom-plugin-dialog-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-height: 0;
}

.bloom-plugin-dialog-field-label {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-primary, inherit);
}

.bloom-plugin-dialog-authors {
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.25rem;
  color: var(--text-secondary, #5d5d5d);
}

.bloom-plugin-dialog-settings {
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
}

.bloom-plugin-dialog-settings-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
  overflow: auto;
  min-height: 0;
  overscroll-behavior: contain;
}

.bloom-plugin-dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
}

.bloom-plugin-dialog-reset {
  height: 28px;
  margin: 0;
  padding: 0 10px;
  border-radius: 6px;
  border: 1px solid var(--border-default, var(--border-medium, rgba(0, 0, 0, 0.1)));
  background: var(--bg-primary, #fff);
  color: inherit;
  font: inherit;
  font-size: 0.75rem;
  cursor: pointer;
}

.bloom-plugin-dialog-reset:hover {
  background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
}

.bloom-plugin-dialog-label {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 0;
  flex: 1;
}

.bloom-plugin-dialog-label-title {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-primary, inherit);
}

.bloom-plugin-dialog-label-desc {
  font-size: 0.75rem;
  line-height: 1.25rem;
  font-weight: 400;
  color: var(--text-secondary, #5d5d5d);
}

.bloom-plugin-dialog-component {
  min-width: 0;
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
  background: var(--bg-tertiary, var(--main-surface-tertiary, #ececec));
}

.bloom-switch span::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 999px;
  background: var(--bg-primary, #fff);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
}

.bloom-switch input:checked + span {
  background: var(--bg-primary-inverted, #0d0d0d);
}

.bloom-switch input:checked + span::after {
  transform: translateX(16px);
}

.bloom-switch input:disabled + span {
  opacity: 0.45;
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

.bloom-field select,
.bloom-field input[type="text"],
.bloom-field input[type="number"] {
  height: 28px;
  min-width: 7.5rem;
  max-width: 52%;
  border-radius: 6px;
  border: 1px solid var(--border-default, var(--border-medium, rgba(0, 0, 0, 0.1)));
  background: var(--bg-primary, #fff);
  color: inherit;
  padding: 0 8px;
  font: inherit;
  font-size: 0.75rem;
}

.bloom-field.bloom-field-stack input[type="text"],
.bloom-field.bloom-field-stack input[type="number"] {
  max-width: none;
  width: 100%;
}

.bloom-field-block button {
  height: 28px;
  border-radius: 6px;
  border: 1px solid var(--border-default, var(--border-medium, rgba(0, 0, 0, 0.1)));
  background: var(--bg-primary, #fff);
  color: inherit;
  padding: 0 10px;
  font: inherit;
  font-size: 0.75rem;
  cursor: pointer;
}

.bloom-field input[type="range"] {
  flex: 1;
  min-width: 0;
  width: 100%;
  accent-color: var(--bg-primary-inverted, #0d0d0d);
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
`;var Os="bloom-root",U="bloom-rail-item",yn="bloom-account-item",Me="bloom-sidebar-panel",Ln="bloom-plugin-dialog",Cn="bloom-plugin-layer",vn="bloom-settings-css",Bs=2e3,Ds=y({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),gn=null,_s=null,Q=!1,Eo=[],mn=null,xn=null,Z=null,hn=null,K=null,yt=null,mt,Te=0,vt=0,pt=0,gt=null,ht=null,wn=null,Qr=null,bt=null,vo=[],En=!1,qs=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],$s=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],Tn="",xt="all",ee="all";function kn(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function ei(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function js(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function Fs(e){let t='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return e?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${t}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`}function Gs(e){let t='<path d="M12 17v5"/>';return e?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var zs={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function Ks(e){return e.icon||zs[e.name]||kn()}function Us(){return"auto"}function xo(){let e=Us(),t=Wr(e);gn&&(gn.setAttribute("data-bloom-scheme",t),Yr(gn,t,e==="auto")),se("schemeChange",{scheme:t,pref:e})}function ti(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(e=>e.remove())}function ni(){if(x("settings",yo),document.getElementById(vn)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=vn,e.textContent=yo,document.head.appendChild(e)}function Vs(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Ws(){for(let e of Eo)e();Eo=[]}function oi(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function Ys(e){return e.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,t=>t.toUpperCase())}function Co(e){return e.settings?Object.entries(e.settings.def).filter(([,t])=>!t.hidden):[]}function Js(e){return Co(e).length>0}function bn(e){if(e.default!==void 0)return e.default;if(e.type===3)return(e.options?.find(n=>n.default)??e.options?.[0])?.value;if(e.type===2)return!1;if(e.type===4)return e.min??0;if(e.type===0)return"";if(e.type===1)return 0}function Zs(e,t){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let o=document.createElement("span");if(o.className="bloom-plugin-dialog-label-title",o.textContent=Ys(e),n.appendChild(o),t.description){let r=document.createElement("span");r.className="bloom-plugin-dialog-label-desc",r.textContent=t.description,n.appendChild(r)}return n}function Xs(e,t,n){if(n.hidden)return null;let o=n.type===4||n.type===0||n.type===1||n.type===5,r=document.createElement("div");r.className=o?"bloom-field bloom-field-stack":"bloom-field",r.appendChild(Zs(t,n));let i=f.store.plugins[e]??(f.store.plugins[e]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",Eo.push(n.render(a)),r.appendChild(a),r}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let c=document.createElement("option");c.value=s.value,c.textContent=s.label,a.appendChild(c)}return a.value=String(i[t]??bn(n)??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),r.appendChild(a),r}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??bn(n)??n.min??0);let c=document.createElement("span");return c.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),c.textContent=s.value}),a.append(s,c),r.appendChild(a),r}if(n.type===2){let a=oi(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),r.appendChild(a),r}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[t]??bn(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[t]=n.type===1?Number(a.value):a.value}),r.appendChild(a),r}return r}function Zr(e,t){let n=document.createElement("div");n.className=t?`bloom-plugin-dialog-field ${t}`:"bloom-plugin-dialog-field";let o=document.createElement("div");return o.className="bloom-plugin-dialog-field-label",o.textContent=e,n.appendChild(o),n}function Qs(e){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let t=f.store.plugins[e.name]??(f.store.plugins[e.name]={});for(let[n,o]of Co(e)){if(n==="enabled"||o.type===5)continue;let r=bn(o);r!==void 0&&(t[n]=r)}ii(e)}function ri(e){e.key==="Escape"&&(!document.getElementById(Cn)&&!document.getElementById(Ln)||(e.stopPropagation(),ke()))}function el(){En||(document.addEventListener("keydown",ri),En=!0)}function tl(){En&&(document.removeEventListener("keydown",ri),En=!1)}function ke(){Ws(),tl(),document.getElementById(Cn)?.remove(),document.getElementById(Ln)?.remove()}function ii(e){if(ke(),!document.body)return;let t=document.createElement("div");t.id=Cn,t.className="bloom-plugin-layer",t.addEventListener("pointerdown",X),t.addEventListener("pointerup",X),t.addEventListener("click",l=>{l.stopPropagation(),l.target===t&&ke()});let n=document.createElement("div");n.id=Ln,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",X),n.addEventListener("pointerup",X),n.addEventListener("click",X);let o=document.createElement("button");o.type="button",o.className="bloom-icon-btn bloom-plugin-dialog-close",o.setAttribute("aria-label","Close"),o.innerHTML=ei(),o.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),ke()});let r=document.createElement("div");r.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=e.name,r.appendChild(i),e.description){let l=document.createElement("p");l.className="bloom-plugin-dialog-sub",l.textContent=e.description,r.appendChild(l)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(o,r,a),e.authors?.length){let l=Zr("Authors"),u=document.createElement("p");u.className="bloom-plugin-dialog-authors",u.textContent=e.authors.join(", "),l.appendChild(u),n.appendChild(l)}let s=Zr("Settings","bloom-plugin-dialog-settings"),c=document.createElement("div");c.className="bloom-plugin-dialog-settings-list";let d=Co(e);if(d.length)for(let[l,u]of d){let m=Xs(e.name,l,u);m&&c.appendChild(m)}if(!c.childElementCount){let l=document.createElement("p");l.className="bloom-dialog-empty",l.textContent="No configurable settings.",c.appendChild(l)}if(s.appendChild(c),n.appendChild(s),d.length){let l=document.createElement("div");l.className="bloom-plugin-dialog-footer";let u=document.createElement("button");u.type="button",u.className="bloom-plugin-dialog-reset",u.textContent="Reset",u.addEventListener("click",()=>Qs(e)),l.appendChild(u),n.appendChild(l)}t.appendChild(n),document.body.appendChild(t),el()}function nl(e){let t=document.createElement("div");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Ks(e);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=e.name,a.title=e.name,r.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let c=kr(e.name),d=document.createElement("button");if(d.type="button",d.className=`bloom-icon-btn bloom-card-star${c?" bloom-card-star-active":""}`,d.setAttribute("aria-label",c?"Remove from favorites":"Add to favorites"),d.innerHTML=Fs(c),d.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation();let h=Mr(e.name);se("pluginStar",{name:e.name,starred:h})}),s.appendChild(d),!e.required){let p=Cr(e.name),h=document.createElement("button");h.type="button",h.className=`bloom-icon-btn bloom-card-pin${p?" bloom-card-pin-active":""}`,h.setAttribute("aria-label",p?"Unpin from top":"Pin to top"),h.innerHTML=Gs(p),h.addEventListener("click",G=>{G.preventDefault(),G.stopPropagation();let z=Tr(e.name);se("pluginPin",{name:e.name,pinned:z})}),s.appendChild(h)}if(Js(e)){let p=document.createElement("button");p.type="button",p.className="bloom-icon-btn bloom-card-settings",p.setAttribute("aria-label",`${e.name} settings`),p.innerHTML=js(),p.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation(),ii(e)}),s.appendChild(p)}let l=oi(e.name,Ee(e.name),!!e.required),u=l.querySelector("input");if(u?.addEventListener("click",p=>p.stopPropagation()),u?.addEventListener("change",()=>{Nr(e.name)}),s.appendChild(l),o.append(r,s),n.appendChild(o),e.description){let p=document.createElement("div");p.className="bloom-card-desc",p.textContent=e.description,n.appendChild(p)}let m=document.createElement("div");m.className="bloom-card-separator";let S=document.createElement("div");S.className="bloom-card-footer";let v=document.createElement("div");return v.className="bloom-card-author",v.textContent=e.authors?.filter(Boolean).join(", ")||"\xA0",S.appendChild(v),t.append(n,m,S),t}function ai(){return Object.values(_).filter(e=>!e.hidden&&e.name!=="Settings")}function si(e,t){return t==="all"||t==="favorites"?!0:(e.tags??[]).includes(t)}function ol(e){return`${e.name} ${e.description??""} ${(e.tags??[]).join(" ")}`.toLowerCase()}function rl(){return Tn.trim()?"No plugins match your search.":ee==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function il(){let e=ai();return $s.filter(t=>t.id==="favorites"||t.id==="all"?!0:e.some(n=>si(n,t.id)))}function al(){if(bt){bt.replaceChildren();for(let e of il()){let t=document.createElement("button");t.type="button",t.className=`bloom-plugin-tab${ee===e.id?" bloom-plugin-tab-active":""}`,t.textContent=e.label,t.addEventListener("click",()=>{ee=e.id,ce()}),bt.appendChild(t)}}}function sl(){let e=ai();if(ee==="favorites"){let t=new Set(nn());e=e.filter(n=>t.has(n.name))}else ee!=="all"&&(e=e.filter(t=>si(t,ee)));return xt==="enabled"&&(e=e.filter(t=>Ee(t.name))),xt==="disabled"&&(e=e.filter(t=>!Ee(t.name))),e}function ce(){if(!gt)return;al();let e=sl();wn&&(wn.placeholder=`Search ${e.length} plugins...`);let t=e,n=Tn.trim().toLowerCase();if(n&&(t=t.filter(o=>ol(o).includes(n))),ee!=="favorites"){let o=tn();if(o.length){let r=new Map(o.map((i,a)=>[i,a]));t=t.slice().sort((i,a)=>{let s=r.has(i.name),c=r.has(a.name);return s!==c?s?-1:1:s?(r.get(i.name)??0)-(r.get(a.name)??0):i.name.localeCompare(a.name)})}}gt.replaceChildren();for(let o of t)gt.appendChild(nl(o));ht&&(ht.hidden=t.length>0,ht.textContent=rl())}function X(e){e.stopPropagation()}function wo(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function To(){document.getElementById(U)?.setAttribute("aria-expanded",Q?"true":"false")}function ll(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function ko(){ke(),Tn="",xt="all",ee="all",document.getElementById(Me)?.remove(),Q=!1,To()}function cl(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",X),t.addEventListener("pointerup",X),t.addEventListener("click",X);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=kn();let a=document.createElement("h2");a.textContent="Bloom++",r.append(i,a);let s=document.createElement("button");s.type="button",s.className="bloom-icon-btn",s.setAttribute("aria-label","Close"),s.innerHTML=ei(),s.addEventListener("click",ko),o.append(r,s),n.appendChild(o);let c=document.createElement("div");c.className="bloom-section-head";let d=document.createElement("h3");d.textContent="Plugins";let l=document.createElement("p");l.textContent="Turn Bloom++ features on or off. Sliders icon opens options.",c.append(d,l),n.appendChild(c);let u=document.createElement("div");u.className="bloom-plugin-tabs",n.appendChild(u);let m=document.createElement("div");m.className="bloom-search-bar";let S=document.createElement("input");S.type="search",S.className="bloom-search-input",S.setAttribute("aria-label","Search plugins"),S.placeholder="Search plugins...",S.addEventListener("input",()=>{Tn=S.value,ce()});let v=document.createElement("select");v.className="bloom-search-filter",v.setAttribute("aria-label","Filter plugins");for(let G of qs){let z=document.createElement("option");z.value=G.value,z.textContent=G.label,v.appendChild(z)}v.value=xt,v.addEventListener("change",()=>{xt=v.value,ce()}),m.append(S,v),n.appendChild(m);let p=document.createElement("div");p.className="bloom-plugin-list",n.appendChild(p);let h=document.createElement("p");return h.className="bloom-tab-empty",h.hidden=!0,n.appendChild(h),t.appendChild(n),gt=p,ht=h,wn=S,Qr=v,bt=u,ce(),t}function dl(e){e.classList.add("bloom-rail-dock")}function ul(){let e=document.getElementById(U);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&fn(e)?e:null}function fl(){if(document.getElementById(Me)?.remove(),!document.body)return;let e=cl(Me);dl(e),document.body.appendChild(e),Q=!0,ke(),To(),se("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:R,dock:"center",rail:!!ul()})}function Mo(){let e=document.getElementById(Me);if(e instanceof HTMLElement&&e.isConnected&&ll(e)){ko();return}e?.remove(),fl()}function ml(){let e=document.createElement("button");return e.type="button",e.id=U,e.className="bloom-rail-item",e.setAttribute("aria-controls",Me),e.setAttribute("aria-expanded",Q?"true":"false"),e.innerHTML=`<span class="bloom-rail-mark">${kn()}</span><span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),Mo()}),e}function Xr(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function pl(e){let t=e.querySelector("img");if(t instanceof HTMLElement){let n=t.getBoundingClientRect();if(n.width>8&&n.height>8)return t}for(let n of e.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}return null}function gl(e,t){for(let n of e.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||t&&(n===t||n.contains(t)||t.contains(n))||(n.textContent||"").trim().length<2)continue;let r=n.getBoundingClientRect();if(r.width>16&&r.height>8&&r.height<40)return n}return null}function J(e,t,n){let o=`${n}px`;e.style.getPropertyValue(t)!==o&&e.style.setProperty(t,o)}function li(e,t){if(e.classList.contains("bloom-rail-compact"))return;let n=e.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!e.isConnected||!t.isConnected)return;let o=pl(t),r=getComputedStyle(t),i=Number.parseFloat(r.paddingTop),a=Number.parseFloat(r.paddingBottom);if(Number.isFinite(i)&&J(e,"padding-top",Math.round(i)),Number.isFinite(a)&&J(e,"padding-bottom",Math.round(a)),o){let s=o.getBoundingClientRect(),c=Math.max(20,Math.round(s.width));J(n,"width",c),J(n,"height",Math.max(20,Math.round(s.height)));let d=e.getBoundingClientRect(),l=Math.round(s.left-d.left);l>=0&&l<=40&&J(e,"padding-left",l);let u=gl(t,o);if(u){let m=u.getBoundingClientRect(),S=n.getBoundingClientRect(),v=Math.round(m.left-S.right);v>=0&&v<=24&&J(e,"gap",v)}}else{let s=Number.parseFloat(r.paddingLeft),c=Number.parseFloat(r.columnGap||r.gap);Number.isFinite(s)&&J(e,"padding-left",Math.round(s)),Number.isFinite(c)&&c>0&&J(e,"gap",Math.round(c))}}function So(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function hl(){if(yt?.isConnected&&K){K.observe(yt,{childList:!0});return}Lo()}function bl(e){if(So(e))return!1;try{if(e.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function yl(e,t){!t||!e||requestAnimationFrame(()=>{if(e.isConnected){pt=0;return}pt+=1,vt=Date.now()+Math.min(8e3,250*2**Math.min(pt,5))})}function vl(){Te||Date.now()<vt||(Te=requestAnimationFrame(()=>{Te=0,!(Date.now()<vt)&&(document.getElementById(U)?.isConnected||Sn())}))}function Sn(){if(!document.body)return;K?.disconnect();let e=null,t=!1;try{let n=document.getElementById(U);e=n instanceof HTMLButtonElement?n:ml();let o=ft(),r=po();if(o){let i=go(o),a=i.parentElement;if(So(i)||a&&So(a))return;e.isConnected&&e.nextElementSibling===i||(i.before(e),t=!0),Xr(e),li(e,o)}else r?(e.parentElement!==r&&(r.appendChild(e),t=!0),Xr(e,!0)):e.isConnected&&!fn(e)&&(e.remove(),e=null)}finally{yl(e,t),hl(),To()}}function Lo(){let e=Ur();!e||!bl(e)||yt===e&&K||(K?.disconnect(),yt=e,K=new MutationObserver(()=>{document.getElementById(U)?.isConnected||vl()}),K.observe(e,{childList:!0}))}function xl(){Sn(),Lo(),mt===void 0&&(mt=window.setInterval(()=>{let e=document.getElementById(U);if(!(e instanceof HTMLElement)||!e.isConnected)Date.now()>=vt&&Sn();else{pt=0;let t=ft();t&&li(e,t)}Lo()},Bs))}function wl(){mt!==void 0&&(clearInterval(mt),mt=void 0),Te&&cancelAnimationFrame(Te),Te=0,vt=0,pt=0,K?.disconnect(),K=null,yt=null}function El(e){hn===e&&Z||(Z?.disconnect(),hn=e,Z=new MutationObserver(()=>{if(!e.isConnected){Z?.disconnect(),Z=null,hn=null;return}ci(e)}),Z.observe(e,{childList:!0}))}function ci(e){if(El(e),e.querySelector(`#${yn}`))return;let t=document.createElement("button");t.type="button",t.id=yn,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${kn()}<span>Bloom++</span>`,t.addEventListener("pointerdown",wo),t.addEventListener("pointerup",wo),t.addEventListener("click",n=>{wo(n),Mo()}),e.insertBefore(t,e.firstChild)}function pn(){let e=Kr();return e?(ci(e),!0):!1}function Sl(e){Vr(e)&&(queueMicrotask(pn),requestAnimationFrame(()=>{pn()}),window.setTimeout(pn,60),window.setTimeout(pn,180))}function Ll(){xn?.abort();let e=new AbortController;xn=e,document.addEventListener("click",Sl,{signal:e.signal})}function Cl(){xn?.abort(),xn=null,Z?.disconnect(),Z=null,hn=null}function di(){Se(),Vs(()=>{ni(),ti(),Sn(),Mo()})}var ui=g({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[b.p],required:!0,hidden:!0,enabledByDefault:!0,settings:Ds,startAt:"HostReady",cleanupSelectors:[`#${Os}`,`#${U}`,`#${yn}`,`#${Me}`,`#${Cn}`,`#${Ln}`,`#${vn}`,"#bloom-menu-panel"],start(){ni(),ti(),xl(),Ll(),mn?.(),mn=Jr(xo),xo(),vo=[Jt("pluginToggle",()=>{Q&&ce()}),Jt("pluginPin",()=>{Q&&ce()}),Jt("pluginStar",()=>{Q&&ce()})]},stop(){wl(),Cl(),mn?.(),mn=null;for(let e of vo)e();vo=[],ko(),document.getElementById(U)?.remove(),document.getElementById(yn)?.remove(),document.getElementById(vn)?.remove(),gn=null,_s=null,gt=null,ht=null,wn=null,Qr=null,bt=null,Q=!1},onSettingsChange:xo});var pi='form[data-type="unified-composer"], form.w-full[data-type]',Ae=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Mn=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),fi=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),mi=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Tl=/stop streaming|stop generating|停止生成|停止输出|停止响应/;function P(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function de(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!P(r)))return r;return null}function gi(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function M(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=gi(e);return!!(Tl.test(n)||/^stop$/i.test(n))}function te(){let t=Array.from(document.querySelectorAll(pi)).find(P);if(t instanceof HTMLElement)return t;let n=de(document,Ae),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function ue(){let e=Array.from(document.querySelectorAll(Ae));return e.find(P)??e[0]??null}function Ao(){let e=ue();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function kl(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function hi(e){let t=te();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!P(n))&&e(n))return n;return null}function An(){let e=te(),t=de(e,Mn)??de(document,Mn);return t&&!M(t)?t:hi(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!M(n);let r=gi(n);return/^(send|send prompt|发送)$/i.test(r)&&!M(n)})}function Ro(){let e=An();return!!e&&kl(e)}function Po(){let e=te(),t=de(e,fi,!0)??de(document,fi,!0);if(t)return t;let n=de(e,mi)??de(document,mi);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&P(o)&&M(o))return o}return hi(M)}function Re(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}var bi="bloom-host-icon",wt="data-bloom-host-rel",No="not all",Ho=0,yi=0,Ml=400;function vi(e){Ho+=1;try{e()}finally{Ho-=1}}function Rn(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function Pe(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function xi(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function Al(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Rl(e,t){if(e.lastElementChild===t)return;let n=Date.now();n-yi<Ml||(yi=n,e.appendChild(t))}function Pl(e,t){for(let n of e.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===t||Rn(n)&&(n.getAttribute(wt)||n.setAttribute(wt,n.rel),n.media!==No&&(n.media=No),n.rel!==bi&&(n.rel=bi))}function Nl(e){for(let t of e.querySelectorAll(`link[${wt}]`)){if(!(t instanceof HTMLLinkElement))continue;let n=t.getAttribute(wt);n&&(t.rel=n),t.removeAttribute(wt),t.media===No&&t.removeAttribute("media")}}function Io(e,t){let{head:n}=document;!n||!t||vi(()=>{Pl(n,e);let o=xi(e),{type:r,sizes:i}=Al(t);o?Rl(n,o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function wi(e,t){let{head:n}=document;n&&vi(()=>{xi(e)?.remove(),Nl(n)})}function Ei(e,t){let{head:n}=document;if(!n)return null;let o=0,r=new MutationObserver(i=>{if(Ho)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===e?a=!0:Rn(c.target)&&(a=!0,Pe(c.target.href)&&(s=c.target.href)));for(let d of c.removedNodes)Rn(d)&&d.id===e&&(a=!0);for(let d of c.addedNodes)Rn(d)&&d.id!==e&&(a=!0,Pe(d.href)&&(s=d.href))}a&&(o||(o=requestAnimationFrame(()=>{o=0,t(s)})))});return r.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),r}var Si=/\/c\/([a-zA-Z0-9_-]{8,})/i;function N(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=d=>{let l=n.indexOf(d);return l>=0&&n[l+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(d,l)=>{try{return document.querySelector(d)?.getAttribute(l)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function Ne(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function Et(e){if(!e)return"";try{return(/^https?:/i.test(e)?new URL(e,location.origin).pathname:e).match(Si)?.[1]??""}catch{return e.match(Si)?.[1]??""}}function Pn(){let e=Et(location.pathname);if(e)return e;let n=N().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return""}function Hl(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!P(t))&&(M(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function Il(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&P(e))}function Ol(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&P(e))}function Bl(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function ne(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function H(){if(Po()||Hl())return!0;let e=An();return e&&P(e)&&!M(e)?!1:!!(Il()||Ol()||Bl())}var Dl=["original","badge","dot","hole","bg"],Ti=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge",default:!0},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],ki={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Nn="#FCFCFC",_l="#111111",Li="#111111",ql="#ffffff",$l="#212121",jl="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Fl={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Hn=32,Ci=64;function Mi(e){return typeof e=="string"&&Dl.includes(e)}function Gl(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function In(e){let t=document.createElement("canvas");t.width=Hn,t.height=Hn;let n=t.getContext("2d");return n?(n.scale(Hn/Ci,Hn/Ci),e(n),t.toDataURL("image/png")):""}function zl(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function On(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(jl);n&&(e.strokeStyle=_l,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function Kl(e,t,n){let o=ki[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=Li,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=Li,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=ql,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function St(e,t){if(e==="original")return t==="wait"?In(o=>On(o,Nn)):Gl(Fl[t]);let n=t==="wait"?void 0:ki[t];return In(e==="hole"?o=>On(o,n??Nn):e==="bg"?o=>{o.fillStyle=n??$l,zl(o,0,0,64,64,14),o.fill(),On(o,Nn,!1)}:o=>{On(o,Nn),t!=="wait"&&Kl(o,t,e==="dot"?"dot":"badge")})}function Ai(e){return{wait:St(e,"wait"),rotate:St(e,"rotate"),done:St(e,"done"),ready:St(e,"ready"),error:St(e,"error")}}var Ul=new E("ChatStateFavicons"),me="bloom-chat-state-favicon",Hi=y({style:{type:3,description:"Favicon overlay",options:Ti}}),Ie="",Dn={wait:"",rotate:"",done:"",ready:"",error:""},_n="wait",Ct=!1,V=!1,I=null,Tt="",kt="",Mt=!0,Lt=null,Oe=0,He,Bn=null,fe=null,Oo=null,At=!1,Ri=new WeakSet,Vl=400;function Wl(){let e=Hi.store.style;return Mi(e)?e:"badge"}function Yl(){let t=document.querySelector(`link[rel~="icon"]:not(#${me})`)?.href;return Pe(t)?t:Pe(Ie)?Ie:""}function O(e){if(_n===e){let t=document.getElementById(me);if(t instanceof HTMLLinkElement&&t.getAttribute("href")===Dn[e])return}_n=e,Io(me,Dn[e])}function Pi(){Dn=Ai(Wl()),O(_n)}function Jl(){let e=N(),t=e?Ne(e):Ne("");return H()?(!Tt&&t&&(Tt=t),Tt||t):(Tt="",t)}function Ii(){Ct=!1,V=!1,I=null,Tt=""}function Zl(e){kt=e,Ii(),Mt=!1,O("wait")}function Oi(){if(!At)return;let e=N()||location.pathname;if(kt&&e&&kt!==e){Zl(e);return}e&&(kt=e);let t=Jl(),n=H(),o=Ao(),r=Ro();if(ne()&&!n){O("error"),Ct=!1,V=!1,I=null;return}if(n){Ct=!0,V=!1,I=t,O("rotate");return}if(Ct){let i=!!I&&!!t&&I===t;if(Ct=!1,i){V=!0,I=t,O("done");return}V=!1,I=null}if(V)if(!!(I&&t&&I!==t))V=!1,I=null;else if(o){O("done");return}else if(Mt){V=!1,O("ready");return}else{V=!1,O("wait");return}I=null,O(o?"wait":Mt?"ready":"wait")}function Bi(){let e=te();if(!(fe&&Oo===e&&e.isConnected)){if(fe?.disconnect(),Oo=e,!e||e===document.body){fe=null;return}fe=new MutationObserver(()=>qn()),fe.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function qn(){!At||Oe||(Oe=requestAnimationFrame(()=>{Oe=0,At&&(Di(),Bi(),Oi())}))}function Ni(){Mt=!0,qn()}function Di(){let e=ue();!e||Ri.has(e)||(Ri.add(e),e.addEventListener("input",Ni,{passive:!0}),e.addEventListener("compositionend",Ni,{passive:!0}))}var _i=g({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[b.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Hi,startAt:"DOMContentLoaded",cleanupSelectors:[`#${me}`],start(){At=!0,Ie=Yl()||Ie,Pi(),Bn?.disconnect(),Bn=Ei(me,e=>{Pe(e)&&(Ie=e),Io(me,Dn[_n])}),Lt?.abort(),Lt=new AbortController,window.addEventListener("popstate",qn,{signal:Lt.signal}),Di(),Bi(),He!==void 0&&clearInterval(He),He=setInterval(qn,Vl),Oi(),Ul.debug("favicon watch started")},stop(){At=!1,Oe&&cancelAnimationFrame(Oe),Oe=0,He!==void 0&&(clearInterval(He),He=void 0),Lt?.abort(),Lt=null,fe?.disconnect(),fe=null,Oo=null,Bn?.disconnect(),Bn=null,Ii(),kt="",Mt=!0,wi(me,Ie)},onSettingsChange:Pi});var qi=`.bloom-ih-hud {
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
`;var $i=new E("InputHistory"),Bo=/\u200B/g,ji=10,Fi=500,Gi=100,Ql=8,ec=120,tc=2e3,$n=10,jn=y({maxEntries:{type:4,description:"Max stored prompts",min:ji,max:Fi,default:Gi},history:{type:5,description:"Stored prompts",render:hc},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Do=new Map,L=0,_o="",q=!1,Pt=!1,jo=0,Rt=null,qo,Fo=null,zi=!0;function B(){let e=jn.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ki(e){let t=Zt(Number(jn.store.maxEntries??Gi),ji,Fi);return e.length>t?e.slice(e.length-t):e}function Fn(e){jn.store.entries=Ki(e)}function nc(e){return e.replaceAll(Bo,"").replace(/\n$/,"").trim()}function $o(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(Ae);return n instanceof HTMLElement?n:ue()}function oc(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!Re(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(Bo,"").trim().length===0,last:i.toString().replaceAll(Bo,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Ui(e,t){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch(i){$i.debug("pm caret failed:",i)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function Vi(e){clearTimeout(qo),qo=setTimeout(()=>{if(e!==jo)return;Pt=!1;let t=Fo;t&&Ui(t,zi)},ec)}function Wi(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),Pt=!0,Fo=e,zi=n;let i=++jo;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(a){$i.debug("insertText failed:",a),e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),Ui(e,n),Vi(i)}function rc(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function Be(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function ic(){document.querySelector(".bloom-ih-hud")?.remove()}function ac(e,t){let n=rc();n.textContent=e;let o=(t.closest("form")??te()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-Ql)}px`,n.classList.add("bloom-ih-hud-on")}function Go(e){let t=nc(e);if(!t)return;let n=Date.now(),o=Do.get(t);if(o&&n-o<tc)return;Do.set(t,n);let r=B().filter(i=>i!==t);r.push(t),Fn(r),L=B().length,q=!1,Be()}function sc(e,t){let n=B();if(!n.length&&e)return;L>=n.length&&(_o=Re(t),L=n.length);let o=e?L-1:L+1;o<0||o>n.length||(L=o,q=!0,Wi(t,o===n.length?_o:n[o],e),o<n.length?ac(`${o+1} / ${n.length}`,t):Be())}function lc(e){q=!1,Be(),Wi(e,_o,!1),L=B().length}function cc(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=$o(e.target)??$o(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&q&&!e.altKey&&!e.shiftKey){lc(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){Go(Re(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=B();if(!o){let i=oc(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||L<=0)||!n&&L>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),sc(n,t))}function dc(e){if($o(e.target)){if(Pt){Vi(jo);return}q&&(q=!1,Be(),L=B().length)}}function uc(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(Ae);n instanceof HTMLElement&&Go(Re(n))}function fc(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(Mn);if(!n||!(n instanceof HTMLElement)||M(n))return;let o=ue();o&&Go(Re(o))}function mc(e){if(!(!q||Pt)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}q=!1,Be()}}function pc(){if(Rt)return;Rt=new AbortController;let{signal:e}=Rt,t={capture:!0,signal:e};window.addEventListener("keydown",cc,t),window.addEventListener("input",dc,t),window.addEventListener("submit",uc,t),window.addEventListener("click",fc,t),window.addEventListener("pointerdown",mc,t)}function gc(e){let t=B().slice();t.splice(e,1),Fn(t),L>t.length&&(L=t.length)}function hc(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=B().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(h=>h.toLowerCase().includes(a)):i,c=Math.max(1,Math.ceil(s.length/$n));n>=c&&(n=c-1);let d=s.slice(n*$n,n*$n+$n);e.replaceChildren();let l=document.createElement("input");if(l.className="bloom-ih-search",l.type="search",l.placeholder="Search history",l.autocomplete="off",l.value=t,l.addEventListener("input",()=>{t=l.value,n=0,r()}),e.appendChild(l),d.length){let h=document.createElement("div");h.className="bloom-ih-list",d.forEach((G,z)=>{let ls=i.indexOf(G),cs=B().length-1-ls,ro=document.createElement("div");ro.className="bloom-ih-item";let rt=document.createElement("button");rt.type="button",rt.className=`bloom-ih-body${o===z?"":" bloom-ih-clamp"}`,rt.textContent=G,rt.addEventListener("click",()=>{o=o===z?-1:z,r()});let io=document.createElement("div");io.className="bloom-ih-actions";let it=document.createElement("button");it.type="button",it.title="Copy",it.textContent="C",it.addEventListener("click",()=>{xr(G)});let at=document.createElement("button");at.type="button",at.title="Delete",at.textContent="\xD7",at.addEventListener("click",()=>{gc(cs),r()}),io.append(it,at),ro.append(rt,io),h.appendChild(ro)}),e.appendChild(h)}else{let h=document.createElement("p");h.className="bloom-ih-empty",h.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(h)}let u=document.createElement("div");u.className="bloom-ih-pager";let m=document.createElement("button");m.type="button",m.className="bloom-ih-btn",m.textContent="Prev",m.disabled=n<=0,m.addEventListener("click",()=>{n-=1,r()});let S=document.createElement("span");S.textContent=`${n+1} / ${c}`;let v=document.createElement("button");v.type="button",v.className="bloom-ih-btn",v.textContent="Next",v.disabled=n+1>=c,v.addEventListener("click",()=>{n+=1,r()});let p=document.createElement("button");p.type="button",p.className="bloom-ih-clear",p.textContent="Clear all",p.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Fn([]),L=0,r())}),u.append(m,S,v,p),e.appendChild(u)};return r(),()=>{e.replaceChildren()}}var Yi=g({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[b.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:jn,startAt:"HostReady",managedStyle:"inputHistory",start(){x("inputHistory",qi),L=B().length,q=!1,pc()},stop(){Rt?.abort(),Rt=null,Be(),ic(),Do.clear(),clearTimeout(qo),Pt=!1,Fo=null,q=!1},onSettingsChange(){let e=B(),t=Ki(e);t.length!==e.length&&Fn(t),L>t.length&&(L=t.length)}});var zo="noShareLink",bc=['button[data-testid="share-chat-button"]'],yc=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],Ko=y({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Ji(e){return`${e.join(",")}{display:none!important}`}function Zi(){let e=[];if(Ko.store.hideShareChat!==!1&&e.push(Ji(bc)),Ko.store.hideShareProject!==!1&&e.push(Ji(yc)),!e.length){w(zo);return}x(zo,e.join(`
`))}var Xi=g({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[b.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Ko,start:Zi,onSettingsChange:Zi,stop(){w(zo)}});var ta="noDictation",vc=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]'],xc=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],na=y({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Qi(e){return`${e.join(",")}{display:none!important}`}function ea(){let e=[Qi(vc)];na.store.hideDictationSettings!==!1&&e.push(Qi(xc)),x(ta,e.join(`
`))}var oa=g({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[b.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:na,start:ea,onSettingsChange:ea,stop(){w(ta)}});var Uo="noSidebarIdentity",zn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],aa=zn.flatMap(e=>[`${e} .min-w-0 > .truncate`,`${e} .min-w-0.flex-1 .truncate`]),wc=zn.flatMap(e=>[`${e} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),Ec=[...aa,...wc],Sc=zn.map(e=>`${e} a[href^="mailto:"]`),Lc=zn.flatMap(e=>[`${e} .min-w-0 > :not(.truncate)`,`${e} .min-w-0 > :not(.truncate) *`,`${e} .min-w-0 .text-xs`,`${e} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${e} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${e} .text-xs:not(.truncate)`,`${e} .text-token-text-secondary:not(.truncate)`,`${e} .text-token-text-tertiary:not(.truncate)`,`${e} .min-w-0 ~ *`,`${e} .min-w-0 ~ * *`,`${e} > .text-xs`,`${e} > .text-token-text-secondary`,`${e} > .text-token-text-tertiary`]),Gn=y({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0}});function ra(e){return`${e.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Cc(){return`${Lc.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function ia(){let e=Gn.store.hideUsername!==!1,t=Gn.store.hideEmail!==!1,n=e&&Gn.store.enlargePlan!==!1,o=[];if(e&&o.push(ra(n?aa:Ec)),t&&o.push(ra(Sc)),n&&o.push(Cc()),!o.length){w(Uo);return}x(Uo,o.join(`
`))}var sa=g({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[b.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Gn,start:ia,onSettingsChange:ia,stop(){w(Uo)}});var la=`#bloom-rt-host {
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
`;var ua=new E("RecentTopics"),qe="bloom-rt-host",fa="home",ma=/^\/c\/([a-z0-9_-]{8,})/i,kc=/\/c\/([a-z0-9_-]{8,})/i,pa=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Mc=new Set(["Backquote","IntlBackslash"]),Ac=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Rc=140,Pc=[3,4,5,6,7,8,9,10,11,12].map(e=>({label:String(e),value:String(e),default:e===5})),C=y({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Pc},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),Kn=null,Vo=null,A=!1,Dt=!1,Nt=!1,$=0,pe="",De=null,Ht=null,_e;function Nc(){let e=Number(C.store.maxRecent??5);return Number.isFinite(e)&&e>=3&&e<=12?e:5}function It(){let e=C.plain.visits;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Wo(){let e=C.plain.titles;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function ga(){let e=C.plain.previews;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Yo(){let e=C.plain.projects;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Vn(e){let t=Nc();return e.length>t?e.slice(0,t):e}function j(e){return e===fa}function Ot(e,t=Rc){let n=e.replace(/\s+/g," ").trim();return n.length<=t?n:`${n.slice(0,t-1)}\u2026`}function Jo(e){if(!e)return"";try{return new URL(e,location.origin).pathname.match(ma)?.[1]??""}catch{return e.match(kc)?.[1]??""}}function ge(){let e=(location.pathname||"/").match(ma);if(e?.[1])return e[1];let n=N().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return fa}function Zo(e){if(j(e))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${e}"]`);for(let o of n){if(Jo(o.getAttribute("href")||"")!==e)continue;let r=Ot(o.textContent||"",80);if(r)return r}}catch{}let t=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return ge()===e&&t&&!/^ChatGPT$/i.test(t)?Ot(t,80):""}function Hc(e){return j(e)?"New chat":Wo()[e]||Zo(e)||"Chat"}function Ic(e){return Yo()[e]||""}function Oc(e){return ga()[e]||{}}function ha(e,t){if(!e||j(e)||!t)return;let n=Wo();n[e]!==t&&(n[e]=t,C.store.titles=n)}function Bc(e,t){if(!e||j(e)||!t)return;let n=Yo();n[e]!==t&&(n[e]=t,C.store.projects=n)}function Dc(e,t){if(!e||j(e)||!t.user&&!t.assistant)return;let n=ga(),o=n[e]||{},r={user:t.user||o.user,assistant:t.assistant||o.assistant};o.user===r.user&&o.assistant===r.assistant||(n[e]=r,C.store.previews=n)}function Xo(e){if(!e||j(e)&&C.store.includeHome===!1)return;let t=It().filter(n=>n!==e);t.unshift(e),C.store.visits=Vn(t)}function Wn(){let e=C.store.includeHome!==!1;return Vn(It().filter(n=>e||!j(n))).map(n=>({id:n,title:Hc(n),project:Ic(n),preview:Oc(n)}))}function ca(e){try{let t=document.querySelectorAll(`[data-message-author-role="${e}"]`),n=t[t.length-1];if(!(n instanceof HTMLElement))return"";let o=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||o.push(a)}let r=o.length?o.join(" "):n.textContent||"";return Ot(r)}catch{return""}}function Bt(e){if(!e||j(e)||e!==ge())return;let t=Zo(e);t&&ha(e,t);let n=ca("user"),o=ca("assistant");Dc(e,{user:n,assistant:o});let r=ya(e);if(r){let i=ba(r);i&&Bc(e,i)}}function Qo(){let e=Wo(),t=Yo(),n=[],o=new Set,r=!1,i=!1;try{for(let d of document.querySelectorAll('a[href*="/c/"]')){if(d.closest(`#${qe}, #bloom-root, #bloom-sidebar-panel`))continue;let l=Jo(d.getAttribute("href")||"");if(!l||o.has(l))continue;o.add(l),n.push(l);let u=Ot(d.textContent||"",80);u&&!pa.test(u)&&e[l]!==u&&(e[l]=u,r=!0);let m=ba(d);m&&t[l]!==m&&(t[l]=m,i=!0)}}catch{}r&&(C.store.titles=e),i&&(C.store.projects=t);let a=It(),s=new Set(a),c=n.filter(d=>!s.has(d));c.length&&(C.store.visits=Vn([...a,...c]))}function ba(e){let t=e.parentElement;for(let n=0;n<10&&t;n++){if(t.id==="bloom-rt-host"||t.id==="bloom-root"){t=t.parentElement;continue}let o=t.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),r=Ot((o instanceof HTMLElement?o.textContent:"")||"",60);if(r&&!pa.test(r)&&!/^20\d{2}/.test(r)&&r!==e.textContent?.trim()&&t.querySelector('a[href^="/c/"]'))return r;t=t.parentElement}return""}function ya(e){if(j(e)){let t=document.querySelector('[data-testid="create-new-chat-button"]');return t instanceof HTMLAnchorElement?t:document.querySelector('a[href="/"]')}try{for(let t of document.querySelectorAll(`a[href*="/c/${e}"]`))if(Jo(t.getAttribute("href")||"")===e)return t}catch{}return null}function _c(e){let t=ya(e);if(t){t.click();return}if(j(e)){location.assign("/");return}location.assign(`/c/${e}`)}function qc(){let e=ge();pe&&pe!==e&&Bt(pe),pe=e,Xo(e),Qo();let t=Zo(e);t&&ha(e,t),Bt(e)}function Un(){_e===void 0&&(_e=window.setTimeout(()=>{_e=void 0,qc()},120))}function $c(){De||(De=history.pushState.bind(history),Ht=history.replaceState.bind(history),history.pushState=function(...t){let n=De(...t);return Un(),n},history.replaceState=function(...t){let n=Ht(...t);return Un(),n})}function jc(){De&&(history.pushState=De),Ht&&(history.replaceState=Ht),De=null,Ht=null}function Fc(e){return Mc.has(e.code)||e.keyCode===192?!0:Ac.has(e.key)}function va(e){return e.key==="Control"||e.code==="ControlLeft"||e.code==="ControlRight"}function Gc(e,t){Dt=t,Qo(),Bt(ge()),A=!0,$=0;try{let n=ge();Xo(n);let o=Wn();o.length>1&&($=e?o.length-1:1)}catch(n){ua.error("Failed to open switcher:",n)}_t()}function da(e){let{length:t}=Wn();t&&($=($+(e?-1:1)+t)%t,_t())}function er(){if(!A)return;let e=Wn()[$];A=!1,Dt=!1,_t(),e&&_c(e.id)}function xa(){A&&(A=!1,Dt=!1,_t())}function zc(e){if(va(e)){Nt=!0;return}if((e.ctrlKey||Nt)&&!e.altKey&&!e.metaKey&&Fc(e)&&!e.repeat){e.preventDefault(),e.stopImmediatePropagation();try{A?da(e.shiftKey):Gc(e.shiftKey,!0)}catch(n){ua.error("Hotkey failed:",n)}return}if(A){if(e.key==="Escape"){e.preventDefault(),xa();return}if(e.key==="Enter"&&!e.shiftKey){e.preventDefault(),er();return}e.key==="Tab"&&(e.ctrlKey||Nt)&&(e.preventDefault(),da(e.shiftKey))}}function Kc(e){va(e)&&(Nt=!1,A&&Dt&&er())}function Uc(e){let t=e.target instanceof Element?e.target:null;!t||!t.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(Un)}function Vc(e){!A||(e.target instanceof Element?e.target:null)?.closest(`#${qe}`)||xa()}function Wc(){document.visibilityState==="hidden"&&Bt(ge())}function Yc(){if(!document.body)return null;let e=document.getElementById(qe);if(e instanceof HTMLElement)return Vo=e,e;e=document.createElement("div"),e.id=qe;let t=document.createElement("div");return t.className="bloom-rt-panel",t.setAttribute("role","listbox"),t.setAttribute("aria-label","Recent conversations"),t.dataset.visible="false",t.addEventListener("click",n=>n.stopPropagation()),e.append(t),document.body.append(e),Vo=e,e}function _t(){let e=Yc();if(!e)return;let t=e.querySelector(".bloom-rt-panel");if(!t)return;if(!A){t.dataset.visible="false",t.replaceChildren();return}let n=Wn();if(!n.length){t.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",t.replaceChildren(i);return}$>=n.length&&($=0);let o=document.createElement("div");o.className="bloom-rt-list",o.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===$?"true":"false",s.setAttribute("aria-selected",a===$?"true":"false");let c=document.createElement("div");if(c.className="bloom-rt-name",c.textContent=i.title,s.append(c),i.project){let d=document.createElement("div");d.className="bloom-rt-project",d.textContent=i.project,s.append(d)}if(i.preview.user||i.preview.assistant){let d=document.createElement("div");if(d.className="bloom-rt-preview",i.preview.user){let l=document.createElement("div");l.className="bloom-rt-line",l.dataset.role="user",l.textContent=i.preview.user,d.append(l)}if(i.preview.assistant){let l=document.createElement("div");l.className="bloom-rt-line",l.dataset.role="assistant",l.textContent=i.preview.assistant,d.append(l)}s.append(d)}s.addEventListener("click",()=>{$=a,er()}),o.append(s)}),t.replaceChildren(o),t.dataset.visible="true",t.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function Jc(){document.getElementById(qe)?.remove(),Vo=null}var wa=g({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[b.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${qe}`],settings:C,start(){x("recentTopics",la),pe=ge(),Xo(pe),Qo(),Bt(pe),$c(),Kn=new AbortController;let{signal:e}=Kn;window.addEventListener("keydown",zc,{capture:!0,signal:e}),window.addEventListener("keyup",Kc,{capture:!0,signal:e}),window.addEventListener("popstate",Un,{signal:e}),document.addEventListener("click",Uc,{capture:!0,signal:e}),document.addEventListener("click",Vc,{signal:e}),document.addEventListener("visibilitychange",Wc,{signal:e})},stop(){Kn?.abort(),Kn=null,_e!==void 0&&(clearTimeout(_e),_e=void 0),jc(),A=!1,Dt=!1,Nt=!1,Jc()},onSettingsChange(){let e=Vn(It());e.length!==It().length&&(C.store.visits=e),A&&_t()}});var tr="cleaner",Zc=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],Xc=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],Qc=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],ed=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],td=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]'],nd=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],he=y({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function $e(e){return`${e.join(",")}{display:none!important}`}function Ea(){let e=[];if(he.store.hideDownloadApps!==!1&&e.push($e(Zc)),he.store.hideDisclaimer!==!1&&e.push($e(Xc)),he.store.hideUpgrade!==!1&&e.push($e(Qc)),he.store.hideLockedModels!==!1&&e.push($e(ed)),he.store.hideHomePromo!==!1&&e.push($e(td)),he.store.hideAds!==!1&&e.push($e(nd)),!e.length){w(tr);return}x(tr,e.join(`
`))}var Sa=g({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[b.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:he,start:Ea,onSettingsChange:Ea,stop(){w(tr)}});var Yn=new E("ResponseNotification"),od=400,rd=3,Ke=y({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:ud},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),nr=!1,ve=!1,be=0,ye="",ze=!1,qt="",je,Fe=null,Ge=null;function La(){return Ne(N())}function id(){return document.visibilityState==="hidden"||document.hidden}function ad(){return Ke.store.onlyWhenHidden===!1?!0:id()}function sd(){let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function Ca(){try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!Ge||Ge.state==="closed")&&(Ge=new e);let t=Ge,n=t.currentTime,o=[523.25,659.25];for(let r=0;r<o.length;r++){let i=t.createOscillator(),a=t.createGain();i.type="sine",i.frequency.value=o[r];let s=n+r*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(t.destination),i.start(s),i.stop(s+.24)}t.resume?.()}catch(e){Yn.debug("chime failed",e)}}function ld(e){try{let t=new Audio(e);t.volume=.7,t.play()}catch(t){Yn.debug("custom sound failed",t),Ca()}}function Ta(){let e=String(Ke.store.soundUrl||"").trim();e?ld(e):Ca()}function cd(){let e="Bloom++",t=`${sd()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:e,text:t,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(e,{body:t,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){Yn.debug("notification failed",n)}}function dd(){ad()&&(Ke.store.sound!==!1&&Ta(),Ke.store.browserNotification!==!1&&cd())}function ud(e){let t=document.createElement("button");return t.type="button",t.textContent="Play",t.addEventListener("click",()=>Ta()),e.appendChild(t),()=>{t.remove()}}function fd(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest("button");n instanceof HTMLElement&&M(n)&&(ze=!0)}function md(){if(!nr)return;let e=N()||location.pathname;if(qt&&e&&qt!==e){ve=!1,be=0,ye="",ze=!1,qt=e;return}qt=e;let t=H(),n=La();if(t){ve=!0,be=0,ye=n;return}if(!ve||(be+=1,be<rd))return;let o=!!ye&&ye===n,r=ze,i=ne();ve=!1,be=0,ze=!1,ye="",!(!o||r||i)&&dd()}var ka=g({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[b.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Ke,start(){nr=!0,ve=H(),be=0,ye=ve?La():"",ze=!1,qt=N()||location.pathname,Fe?.abort(),Fe=new AbortController,document.addEventListener("click",fd,{capture:!0,signal:Fe.signal}),je!==void 0&&clearInterval(je),je=setInterval(md,od),Ke.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:Fe.signal}),Yn.debug("watch started")},stop(){nr=!1,je!==void 0&&(clearInterval(je),je=void 0),Fe?.abort(),Fe=null,ve=!1,be=0,ye="",ze=!1;try{Ge?.close()}catch{}Ge=null}});var Ma=`.bloom-cls {
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    margin-inline-start: auto;
    pointer-events: none;
    color: var(--text-accent, #10a37f);
}

.bloom-cls[data-kind="done"] {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #0ea5e9;
    color: transparent;
}

.bloom-cls[data-kind="error"] {
    color: var(--text-danger, #ef4444);
}

.bloom-cls-spin {
    width: 14px;
    height: 14px;
    animation: bloom-cls-spin 0.8s linear infinite;
}

@keyframes bloom-cls-spin {
    to { transform: rotate(360deg); }
}
`;var Na=new E("ChatListStatus"),Aa="chatListStatus",Xn="bloom-cls",gd="bloom-cls",hd=500,bd=1200*1e3,yd="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",re=new Map,ie=!1,Ve="",$t=!1,Ue,Ye=0,oe=null,rr=null,We=null,Je=null,Jn=null,jt=null,Ft=!1;function Zn(){return Date.now()}function vd(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Ha(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function xd(e,t){return!(t!=="POST"||!/\/backend-api\/(?:f\/)?conversation(?:\/|\?|$)/i.test(e)||/\/backend-api\/conversations(?:\/|\?|$)/i.test(e))}function wd(e){try{if(typeof e=="string")return e;if(e instanceof URL)return e.href;if(typeof Request<"u"&&e instanceof Request)return e.url}catch{}return String(e)}function Ia(e){return e?e.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function Ed(e){return typeof e=="string"?Ia(e):""}function F(e,t,n,o=!0){if(!(!e||!ie)){if(t==="idle")re.delete(e);else{let r=re.get(e);r&&r.kind===t&&n!=="net"?r.at=Zn():re.set(e,{kind:t,at:Zn(),source:n})}o&&Sd({v:1,id:e,kind:t,at:Zn()}),Qn()}}function Sd(e){try{We?.postMessage(e)}catch{}}function Ld(e){let t=e.data;!t||t.v!==1||!t.id||t.kind!=="streaming"&&t.kind!=="done"&&t.kind!=="error"&&t.kind!=="idle"||F(t.id,t.kind,"bc",!1)}function Cd(){let e=Zn();for(let[t,n]of re)n.kind==="streaming"&&e-n.at>bd&&re.delete(t)}function Td(){let e=Ha();if(!e)return[];let t=[],n=new Set;try{for(let o of e.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(o.closest(yd))continue;let r=Et(o.getAttribute("href")||"");!r||n.has(r)||(n.add(r),t.push(o))}}catch{}return t}function Ra(e){let t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),e==="streaming")t.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("cx","12"),o.setAttribute("cy","12"),o.setAttribute("r","9"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","2"),t.appendChild(o)}return t.appendChild(n),t}function or(e){let t=e.querySelector(`:scope > .${Xn}`);return t||null}function kd(){if(!ie)return;Cd();let e=Pn(),t=Td();oe?.disconnect();try{for(let n of t){let o=Et(n.getAttribute("href")||"");if(!o||!e||o!==e){or(n)?.remove();continue}let i=re.get(o)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){or(n)?.remove();continue}let a=or(n);a||(a=document.createElement("span"),a.className=Xn,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(Ra("streaming")):i==="error"&&a.appendChild(Ra("error")))}}catch(n){Na.debug("paint failed",n)}Oa()}function Qn(){!ie||Ye||(Ye=requestAnimationFrame(()=>{Ye=0,ie&&kd()}))}function Oa(){let e=Ha();if(!(oe&&rr===e&&e?.isConnected)){if(oe?.disconnect(),rr=e,!e){oe=null;return}oe=new MutationObserver(()=>Qn()),oe.observe(e,{childList:!0,subtree:!0})}}async function Md(e,t){let n=t,o=!e.ok,r=e.body;if(!r){n&&F(n,o?"error":"done","net");return}let i=r.getReader(),a=new TextDecoder,s="";try{for(;ie;){let{done:c,value:d}=await i.read();if(c)break;if(s+=a.decode(d,{stream:!0}),!n){let l=Ia(s);l&&(n=l,Ft=!1,F(n,"streaming","net"))}/\[DONE\]/.test(s)||/"error"\s*:\s*\{/.test(s)?(/"error"\s*:\s*\{/.test(s)&&(o=!0),s=s.slice(-64)):s.length>8192&&(s=s.slice(-2048))}}catch{o=!0}n&&F(n,o?"error":"done","net")}function Ad(e,t,n){let o=wd(t),r=(n?.method||(typeof Request<"u"&&t instanceof Request?t.method:"GET")||"GET").toUpperCase(),i=xd(o,r),a="";return i&&(a=Ed(n?.body)||Et(o)||Pn(),a?F(a,"streaming","net"):Ft=!0),e(t,n).then(s=>{if(!i)return s;try{let c=s.clone();Md(c,a)}catch{a&&F(a,s.ok?"done":"error","net")}return s},s=>{throw i&&a&&F(a,"error","net"),s})}function Rd(){if(Je)return;let e=vd();jt=e,Je=e.fetch.bind(e);let t=(n,o)=>Ad(Je,n,o);Jn=t,e.fetch=t}function Pd(){!Je||!jt||(Jn&&jt.fetch===Jn&&(jt.fetch=Je),Je=null,Jn=null,jt=null)}function Pa(){if(!ie)return;let e=Pn();if(Ve&&e&&Ve!==e){let n=re.get(Ve);n?.kind==="streaming"&&n.source==="local"&&F(Ve,ne()?"error":"done","local"),$t=!1}if(Ve=e,H()){$t=!0,e&&F(e,"streaming","local"),Qn();return}$t&&($t=!1,e&&F(e,ne()?"error":"done","local")),Ft=!1,Qn()}var Ba=g({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[b.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Xn}`],start(){ie=!0,x(Aa,Ma);try{We=new BroadcastChannel(gd)}catch{We=null}We?.addEventListener("message",Ld),Rd(),Oa(),Ue!==void 0&&clearInterval(Ue),Ue=setInterval(Pa,hd),Pa(),Na.debug("sidebar status watch started")},stop(){ie=!1,Ye&&cancelAnimationFrame(Ye),Ye=0,Ue!==void 0&&(clearInterval(Ue),Ue=void 0),oe?.disconnect(),oe=null,rr=null,Pd();try{We?.close()}catch{}We=null,re.clear(),Ft=!1,$t=!1,Ve="",document.querySelectorAll(`.${Xn}`).forEach(e=>e.remove()),w(Aa)}});var _a="widerChat",qa=40,$a=96,ja=64,Fa=y({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:qa,max:$a,default:ja}});function Nd(){return Zt(Number(Fa.store.width??ja),qa,$a)}function Da(){let e=Nd();x(_a,`:root{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important}[class*="--thread-content-max-width"]{--thread-content-max-width:${e}rem!important}[class*="thread-content-max-width"]{max-width:min(100%,${e}rem)!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"]{max-width:min(100%,${e}rem)!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:min(100%,${e}rem)!important}`)}var Ga=g({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[b.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Fa,start:Da,onSettingsChange:Da,stop(){w(_a)}});var za=`.bloom-ts {
    display: block;
    margin: 0 0 0.25rem;
    padding: 0;
    font-size: 12px;
    line-height: 1.25;
    font-weight: 400;
    color: var(--text-tertiary, #8f8f8f);
    user-select: none;
    pointer-events: none;
}

[data-message-author-role="user"] > .bloom-ts,
[data-message-author-role="user"] .bloom-ts:first-child {
    text-align: right;
}

@media print {
    .bloom-ts { display: none; }
}
`;function eo(e){if(typeof e=="number"&&Number.isFinite(e)&&e>0)return e>1e12?e:Math.round(e*1e3);if(typeof e=="string"){let t=e.trim();if(!t)return null;if(/^\d+(\.\d+)?$/.test(t))return eo(Number(t));let n=Date.parse(t);return Number.isFinite(n)?n:null}return null}function Ka(e,t,n=Date.now()){let o=new Date(e);if(Number.isNaN(o.getTime()))return"";let r=new Date(n),i=o.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(o.toDateString()===r.toDateString()||!t)return i;let s=o.getFullYear()===r.getFullYear();return`${o.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Ua(e){try{return new Date(e).toISOString()}catch{return""}}var Za=new E("MessageTimestamps"),Va="messageTimestamps",no="bloom-ts",Wa=1500,Id="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",et=y({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),tt=new Map,xe=!1,Xe=0,Ze,ae=null,ir=null,Qe=null,to=null,Gt=null,Ya=!1;function Od(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Xa(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function sr(){let e=et.plain.stamps;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Qa(){let e={...sr()};for(let[n,o]of tt)e[n]=o;let t=Object.keys(e);if(t.length>Wa){let n=t.slice(t.length-Wa),o={};for(let r of n)o[r]=e[r];et.store.stamps=o;return}et.store.stamps=e}var Bd=wr(Qa,500);function ar(e,t){!e||!t||tt.get(e)===t||(tt.set(e,t),Bd(),Kt())}function Dd(e){return e?tt.get(e)??sr()[e]??null:null}function _d(e){try{if(typeof e=="string")return e;if(e instanceof URL)return e.href;if(typeof Request<"u"&&e instanceof Request)return e.url}catch{}return String(e)}function qd(e,t){return t!=="GET"||/\/backend-api\/conversations(?:\/|\?|$)/i.test(e)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(e)}function $d(e,t){return t!=="POST"||/\/backend-api\/conversations(?:\/|\?|$)/i.test(e)?!1:/\/backend-api\/(?:f\/)?conversation(?:\/|\?|$)/i.test(e)}function zt(e,t=0){if(!xe||t>6||!e||typeof e!="object")return;if(Array.isArray(e)){for(let a of e)zt(a,t+1);return}let n=e,o=n.message;if(o&&typeof o=="object"&&!Array.isArray(o)){let a=o,s=typeof a.id=="string"?a.id:"",c=eo(a.create_time??a.createTime??a.created_at);s&&c&&ar(s,c)}let r=typeof n.id=="string"?n.id:"",i=eo(n.create_time??n.createTime??n.created_at);if(r&&i&&(n.author||n.content||n.role||n.create_time||n.createTime)&&ar(r,i),n.mapping&&typeof n.mapping=="object")zt(n.mapping,t+1);else if(t<3)for(let a of Object.values(n))a&&typeof a=="object"&&zt(a,t+1)}function Ja(e){if(e)try{zt(JSON.parse(e))}catch{}}async function jd(e){try{let t=await e.clone().json();zt(t)}catch{}}async function Fd(e){let t=e.body;if(!t)return;let n=t.getReader(),o=new TextDecoder,r="";try{for(;xe;){let{done:i,value:a}=await n.read();if(i)break;r+=o.decode(a,{stream:!0});let s=r.split(`
`);r=s.pop()??"";for(let c of s){let d=c.replace(/^data:\s*/,"").trim();!d||d==="[DONE]"||Ja(d)}r.length>16384&&(r=r.slice(-4096))}r&&Ja(r.replace(/^data:\s*/,""))}catch{}}function Gd(e,t,n){let o=_d(t),r=(n?.method||(typeof Request<"u"&&t instanceof Request?t.method:"GET")||"GET").toUpperCase(),i=qd(o,r),a=$d(o,r);return e(t,n).then(s=>{if(i)jd(s);else if(a)try{Fd(s.clone())}catch{}return s})}function zd(){if(Qe)return;let e=Od();Gt=e,Qe=e.fetch.bind(e);let t=(n,o)=>Gd(Qe,n,o);to=t,e.fetch=t}function Kd(){!Qe||!Gt||(to&&Gt.fetch===to&&(Gt.fetch=Qe),Qe=null,to=null,Gt=null)}function Ud(e){return(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function Vd(){let e=Xa();if(!e)return[];let t=[];try{for(let n of e.querySelectorAll("[data-message-id]"))n.closest(Id)||t.push(n)}catch{}return t}function Wd(e){try{return!!e.querySelector("time:not(.bloom-ts)")}catch{return!1}}function Yd(){if(!xe)return;let e=et.store.hideOwnMessages===!0,t=et.store.showDate!==!1,n=H(),o=Vd();ae?.disconnect();try{o.forEach((r,i)=>{let a=r.getAttribute("data-message-id")||"",s=Ud(r),c=r.querySelector(`:scope > .${no}`);if(e&&s==="user"){c?.remove();return}if(Wd(r)){c?.remove();return}let d=Dd(a);if(!d&&a&&(n||Ya)&&i>=o.length-2&&(d=Date.now(),ar(a,d)),!d){c?.remove();return}let l=Ka(d,t);if(!l){c?.remove();return}let u=c;u||(u=document.createElement("time"),u.className=no,u.setAttribute("aria-hidden","true"),r.insertBefore(u,r.firstChild)),u.textContent!==l&&(u.textContent=l);let m=Ua(d);m&&u.getAttribute("datetime")!==m&&u.setAttribute("datetime",m)})}catch(r){Za.debug("paint failed",r)}Ya=n,es()}function Kt(){!xe||Xe||(Xe=requestAnimationFrame(()=>{Xe=0,xe&&Yd()}))}function es(){let e=Xa();if(!(ae&&ir===e&&e?.isConnected)){if(ae?.disconnect(),ir=e,!e||e===document.body){ae=null;return}ae=new MutationObserver(()=>Kt()),ae.observe(e,{childList:!0,subtree:!0})}}var ts=g({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[b.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${no}`],settings:et,start(){xe=!0,x(Va,za);let e=sr();for(let[t,n]of Object.entries(e))typeof n=="number"&&n>0&&tt.set(t,n);zd(),es(),Ze!==void 0&&clearInterval(Ze),Ze=setInterval(Kt,800),Kt(),Za.debug("timestamp watch started")},stop(){xe=!1,Xe&&cancelAnimationFrame(Xe),Xe=0,Ze!==void 0&&(clearInterval(Ze),Ze=void 0),ae?.disconnect(),ae=null,ir=null,Kd(),Qa(),tt.clear(),document.querySelectorAll(`.${no}`).forEach(e=>e.remove()),w(Va)},onSettingsChange:Kt});var lr="streamerMode",Jd="filter:blur(6px)!important;transition:filter .2s ease",Zd="filter:none!important",Ut=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],nt=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function D(e,t){return e.map(n=>`${n} ${t}`)}var ot=y({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0}});function Vt(e,t=!0){let n=e.join(","),o=e.map(r=>`${r}:hover`).join(",");return`${n}{${Jd}}${t?`${o}{${Zd}}`:""}`}function ns(){let e=[];if(ot.store.conversations!==!1&&e.push(Vt([...D(nt,'a[href^="/c/"]'),...D(nt,'a[href*="/c/"]')])),ot.store.projects!==!1&&e.push(Vt([...D(nt,'a[href*="/project"]'),...D(nt,'a[href*="/g/g-p-"]'),...D(nt,'[data-testid="project-name"]'),...D(nt,'[data-testid="project-link"]')])),ot.store.accountAvatar!==!1&&e.push(Vt([...D(Ut,"img"),...D(Ut,'[class*="avatar"]')],!1)),ot.store.accountName!==!1&&e.push(Vt([...D(Ut,".min-w-0 > .truncate"),...D(Ut,".min-w-0.flex-1 .truncate")],!1)),ot.store.accountEmail!==!1&&e.push(Vt([...D(Ut,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),e.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),!e.length){w(lr);return}x(lr,e.join(`
`))}var os=g({name:"StreamerMode",description:"Blur Recents titles, project names, and the account chip while you stream.",authors:[b.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:ot,start:ns,onSettingsChange:ns,stop(){w(lr)}});var Wt=new E("Bloom"),rs=!1,Xd=Date.now(),Qd=[ui,_i,Yi,Xi,oa,sa,wa,Sa,ka,Ba,Ga,ts,os];function oo(e){return new Promise(t=>setTimeout(t,e))}function eu(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var as=8e3,is=300,tu=250;async function nu(){if(le())return await oo(is),!0;for(;Date.now()-Xd<as;)if(await oo(tu),le())return await oo(is),!0;return le()||fo()}function cr(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function ou(){if(cr())return!0;let e=Date.now()+as;for(;Date.now()<e;)if(await oo(100),cr())return!0;return cr()}function ru(){try{GM_registerMenuCommand?.("Bloom++ settings",di)}catch{}}function iu(){an(()=>{ct("HostShell"),Wt.info("host shell",R)}),sn(()=>{Wt.info("idle ready",R)}),ln(()=>{mr(),ct("HostReady"),Wt.info("chrome ready",R)})}async function dr(){await Er()}async function ur(){if(rs)return;rs=!0;for(let n of Qd)try{Pr(n)}catch(o){Wt.error("register failed",n.name,o)}Ir(),ct("Init"),ru(),iu();let e=()=>ct("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await eu(),ou().then(n=>{n&&cn()}),!await nu()){Wt.warn("late islands not detected; starting default plugins",R),Se(),dn();return}await $r()}var ss=typeof unsafeWindow<"u"?unsafeWindow:window,au=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||au){let e=ss.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",R);try{Object.defineProperty(ss,"Bloom",{value:fr,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}dr().then(()=>ur()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
