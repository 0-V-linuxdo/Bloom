// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260919] v1.4.21
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

/* Bloom++ [20260919] v1.4.21. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Pi=Object.defineProperty;var Hi=(e,t)=>{for(var n in t)Pi(e,n,{get:t[n],enumerable:!0})};var bo={};Hi(bo,{REPO_URL:()=>Go,Settings:()=>u,VERSION:()=>M,hasLateIslands:()=>re,init:()=>go,initSettings:()=>po,isDocumentInteractive:()=>Vo,plugins:()=>N,requestChromeReady:()=>Ct,requestIdleReady:()=>ge,requestShellReady:()=>Lt,whenChromeReady:()=>St,whenIdleReady:()=>wt,whenShellReady:()=>Et});var Y=new Map,mt=!1;function Ri(){return document.getElementById("bloom-root")?.shadowRoot??null}function Ii(){return document.head??null}function fe(){let e=Ri();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=Ni()}function gn(e,t){if(!mt)return;let n=Ii();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),fe();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,fe();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,fe()}function L(e,t){let n=Y.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},Y.set(e,n)),mt&&gn(e,n)}function ho(){mt=!0;for(let[e,t]of Y)gn(e,t);return fe(),!0}function yo(e){let t=Y.get(e);t&&(t.disabled=!1,mt&&gn(e,t))}function vo(e){let t=Y.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),fe())}function C(e){let t=Y.get(e);t&&(t.el?.remove(),Y.delete(e),fe())}function Ni(){return Array.from(Y.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var v=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function y(e){return e}var bn=new Map;function ft(e,t){let n=bn.get(e);return n||(n=new Set,bn.set(e,n)),n.add(t),()=>n.delete(t)}function oe(e,t){let n=bn.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var Oi="bloompp";function xo(){return new Promise((e,t)=>{let n=indexedDB.open(Oi,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function Eo(e){try{let t=await xo();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function wo(e,t){try{let n=await xo();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function Ie(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function So(e,t,n){return Math.min(n,Math.max(t,e))}function Lo(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function Co(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}var pt=new v("SettingsStore"),J="BloomSettings",Bi=100;function bt(e){if(Ie(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(Ie(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return Ie(n)?n:null}return null}catch{return null}}var gt=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,d]of this.defaultGetters)if(l.startsWith(c)){let b=l.slice(c.length+1);if(b&&!b.includes(".")){let p=d(b);p!==void 0&&(i[a]=p,s=p);break}}}return Ie(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){pt.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Bi))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(J,this.plain)}catch{try{GM_setValue(J,t)}catch(n){pt.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(J,t)}catch{}wo(J,t).catch(n=>pt.warn("Failed to save settings to IndexedDB:",n))}catch(t){pt.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){Lo(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var Di=new v("Settings"),_i={plugins:{}},u=new gt(structuredClone(_i)),ji=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function $i(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function x(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(u.store.plugins[n]||(u.store.plugins[n]={}),u.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?u.plain.plugins[n]??{}:{}}};return t}function qi(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function To(){let e=null;if(e=bt(qi(J)),e||(e=bt(await Eo(J))),!e)try{e=bt(localStorage.getItem(J))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(u.plain.plugins=t),Di.debug("Loaded settings")}}function ko(e,t){t&&(t.pluginName=e,u.plain.plugins[e]||(u.plain.plugins[e]={}),u.setDefaultGetter(ji(e),n=>{if(n!=="enabled")return $i(t.def,n)}))}function Mo(){return u.plain.plugins.Settings||(u.store.plugins.Settings={}),u.store.plugins.Settings}function ht(){return Mo().pinnedPlugins??[]}function Ao(e){return ht().includes(e)}function Po(e){let t=ht(),n=t.includes(e);return u.store.plugins.Settings={...u.plain.plugins.Settings,pinnedPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}function yt(){return Mo().starredPlugins??[]}function Ho(e){return yt().includes(e)}function Ro(e){let t=yt(),n=t.includes(e);return u.store.plugins.Settings={...u.plain.plugins.Settings,starredPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}var vt=new v("PluginManager"),N={},Ne=new Set;function Oo(e){if(N[e.name]){vt.warn("Duplicate plugin",e.name);return}N[e.name]=e,ko(e.name,e.settings)}function pe(e){let t=N[e];if(!t)return!1;if(t.required)return!0;let n=u.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function Bo(e){let t=N[e];if(!t||t.required)return;let n=!pe(e);u.plain.plugins[e]||(u.store.plugins[e]={}),u.store.plugins[e].enabled=n,n?Do(t):Fi(t),oe("pluginToggle",{name:e,enabled:n})}function Do(e,t=!1){if(!Ne.has(e.name)&&pe(e.name))try{e.managedStyle&&yo(e.managedStyle),e.start?.(),Ne.add(e.name),e.settings&&u.addPrefixChangeListener(`plugins.${e.name}.`,()=>{Ne.has(e.name)&&e.onSettingsChange?.()}),t||vt.debug("Started",e.name)}catch(n){vt.error("Failed to start",e.name,n)}}function Fi(e){if(Ne.has(e.name)){try{e.stop?.()}catch(t){vt.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(vo(e.managedStyle),C(e.managedStyle)),Ne.delete(e.name)}}function Oe(e){for(let t of Object.values(N))(t.startAt??"DOMContentLoaded")===e&&Do(t)}var Io=2,No="defaultsRev";function _o(){for(let t of Object.values(N))u.plain.plugins[t.name]||(u.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=u.store.plugins.Settings??(u.store.plugins.Settings={});if(e[No]!==Io){for(let t of["NoShareLink","NoDictation"]){let n=u.store.plugins[t]??(u.store.plugins[t]={});n.enabled=!1}e[No]=Io}}var Be=!1,xt=!1,hn=!1,$o=[],qo=[],Fo=[];function yn(e){let t=e.splice(0);for(let n of t)n()}function De(){Be||(Be=!0,yn($o))}function vn(){xt||(xt=!0,Be||De(),yn(qo))}function zo(){hn||(hn=!0,Be||De(),xt||vn(),yn(Fo))}function Et(e){Be?e():$o.push(e)}function wt(e){xt?e():qo.push(e)}function St(e){hn?e():Fo.push(e)}function Lt(){De()}function ge(){De(),vn()}function Ct(){zo()}function jo(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function Ko(){await jo(4e3),De(),await jo(4e3),vn(),zo()}var E={p:"0-V-linuxdo"},M="[20260919] v1.4.21",Go="https://github.com/0-V-linuxdo/Bloom";function zi(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Ki(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function xn(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function re(){return xn()?zi()||Ki():!1}function Vo(){return re()}var Gi=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Uo=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Vi=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Ui="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function he(e){return e.id==="bloom-root"||!!e.closest(Ui)}function Wo(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function Tt(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function En(e){if(!(e instanceof HTMLElement)||!e.isConnected||he(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&Tt(t)?!1:e.getClientRects().length>0}function be(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Wi(){let e=[];for(let t of document.querySelectorAll(Gi))!(t instanceof HTMLElement)||!t.isConnected||he(t)||e.push(t);return e}function kt(e){if(!e.isConnected||he(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function _e(){return Wi().filter(kt)[0]??null}function wn(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||he(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function Sn(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!he(n)&&!be(n)&&n.parentElement&&!be(n.parentElement)&&(t=n);let o=t.parentElement;if(o&&!be(o)&&!he(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!be(o.parentElement))return o}return t}function Yo(){let e=document.querySelectorAll(Uo);for(let n of e)if(En(n)&&!Tt(n)&&Wo(n))return n;let t=document.querySelectorAll(Vi);for(let n of t){if(!En(n)||!Wo(n)||Tt(n))continue;let o=n.querySelector(Uo);return En(o)&&!Tt(o)?o:n}return null}function Jo(){let e=_e();if(e){let t=Sn(e),n=t.parentElement;if(n&&!be(n))return n;if(!be(t))return t}return wn()}function Xo(e){let t=_e();return t?e.composedPath().includes(t):!1}var Cn=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Yi={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#212121","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Ji(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Xi(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function Ln(e){let t=Ji(e);return t?Xi(t)>.55?"light":"dark":null}function Zi(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=Ln(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=Ln(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Ln(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Zo(e){return e==="auto"?Zi():e}function Qi(e){try{let t=getComputedStyle(document.documentElement);for(let n of Cn){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function Qo(e,t,n){let o=Yi[t];if(n){Qi(e);for(let r of Cn)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of Cn)e.style.setProperty(r,o[r])}function er(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var Tn=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
  border: 1px solid var(--border-default, var(--border-medium, rgba(0, 0, 0, 0.1)));
  background: var(--bg-primary, #fff);
  color: inherit;
  padding: 0 8px;
  font: inherit;
  font-size: 0.75rem;
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
`;var ta="bloom-root",G="bloom-rail-item",Rt="bloom-account-item",xe="bloom-sidebar-panel",It="bloom-settings-css",na=2e3,oa=x({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),Pt=null,ra=null,ye=!1,ee=!1,Hn=[],Mt=null,Nt=null,Q=null,Ht=null,K=null,Ke=null,je,ve=0,Ge=0,$e=0,$t=null,qt=null,qe=null,Ot=null,Bt=null,O=null,Fe=null,Dt=null,or=null,ze=null,kn=[],ia=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],aa=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],Ft="",Ve="all",te="all";function zt(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function tr(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function sa(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>'}function la(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function ca(e){let t='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return e?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${t}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`}function da(e){let t='<path d="M12 17v5"/>';return e?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var ua={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function ma(e){return e.icon||ua[e.name]||zt()}function fa(){return"auto"}function Mn(){let e=fa(),t=Zo(e);Pt&&(Pt.setAttribute("data-bloom-scheme",t),Qo(Pt,t,e==="auto")),oe("schemeChange",{scheme:t,pref:e})}function Ue(e,t){e&&(e.hidden=t,e.toggleAttribute("inert",t),t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden"))}function rr(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel").forEach(e=>e.remove())}function ir(){if(L("settings",Tn),document.getElementById(It)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=It,e.textContent=Tn,document.head.appendChild(e)}function pa(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function ar(){for(let e of Hn)e();Hn=[]}function sr(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function ga(e){return!!e.settings&&Object.keys(e.settings.def).length>0}function ba(e,t,n){if(n.hidden)return null;if(n.type===5&&n.render){let a=document.createElement("details");a.className="bloom-field bloom-field-block";let s=document.createElement("summary");s.textContent=n.description||t;let l=document.createElement("div");return Hn.push(n.render(l)),a.append(s,l),a}let o=document.createElement("div");o.className=n.type===4?"bloom-field bloom-field-stack":"bloom-field";let r=document.createElement("span");r.className="bloom-field-label",r.textContent=n.description||t,o.appendChild(r);let i=u.store.plugins[e]??(u.store.plugins[e]={});if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??n.options.find(s=>s.default)?.value??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=sr(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),o.appendChild(a),o}return o}function Nn(){ye=!1,ar(),O&&O.replaceChildren(),Ue(qt,!0),Ue($t,!1)}function ha(e){if(ar(),ye=!0,Ot&&(Ot.textContent=e.name),Bt&&(Bt.textContent=e.description),O){if(O.replaceChildren(),e.authors?.length){let t=document.createElement("p");t.className="bloom-plugin-authors",t.textContent=e.authors.join(", "),O.appendChild(t)}if(e.settings)for(let[t,n]of Object.entries(e.settings.def)){let o=ba(e.name,t,n);o&&O.appendChild(o)}if(!O.querySelector(".bloom-field, .bloom-dialog-empty")){let t=document.createElement("p");t.className="bloom-dialog-empty",t.textContent="No configurable settings.",O.appendChild(t)}}Ue($t,!0),Ue(qt,!1)}function ya(e){let t=document.createElement("div");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=ma(e);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=e.name,a.title=e.name,r.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=Ho(e.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=ca(l),c.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation();let f=Ro(e.name);oe("pluginStar",{name:e.name,starred:f})}),s.appendChild(c),!e.required){let m=Ao(e.name),f=document.createElement("button");f.type="button",f.className=`bloom-icon-btn bloom-card-pin${m?" bloom-card-pin-active":""}`,f.setAttribute("aria-label",m?"Unpin from top":"Pin to top"),f.innerHTML=da(m),f.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();let $=Po(e.name);oe("pluginPin",{name:e.name,pinned:$})}),s.appendChild(f)}if(ga(e)){let m=document.createElement("button");m.type="button",m.className="bloom-icon-btn bloom-card-settings",m.setAttribute("aria-label",`${e.name} settings`),m.innerHTML=la(),m.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),ha(e)}),s.appendChild(m)}let d=sr(e.name,pe(e.name),!!e.required),b=d.querySelector("input");if(b?.addEventListener("click",m=>m.stopPropagation()),b?.addEventListener("change",()=>{Bo(e.name)}),s.appendChild(d),o.append(r,s),n.appendChild(o),e.description){let m=document.createElement("div");m.className="bloom-card-desc",m.textContent=e.description,n.appendChild(m)}let p=document.createElement("div");p.className="bloom-card-separator";let h=document.createElement("div");h.className="bloom-card-footer";let g=document.createElement("div");return g.className="bloom-card-author",g.textContent=e.authors?.filter(Boolean).join(", ")||"\xA0",h.appendChild(g),t.append(n,p,h),t}function lr(){return Object.values(N).filter(e=>!e.hidden&&e.name!=="Settings")}function cr(e,t){return t==="all"||t==="favorites"?!0:(e.tags??[]).includes(t)}function va(e){return`${e.name} ${e.description??""} ${(e.tags??[]).join(" ")}`.toLowerCase()}function xa(){return Ft.trim()?"No plugins match your search.":te==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function Ea(){let e=lr();return aa.filter(t=>t.id==="favorites"||t.id==="all"?!0:e.some(n=>cr(n,t.id)))}function wa(){if(ze){ze.replaceChildren();for(let e of Ea()){let t=document.createElement("button");t.type="button",t.className=`bloom-plugin-tab${te===e.id?" bloom-plugin-tab-active":""}`,t.textContent=e.label,t.addEventListener("click",()=>{te=e.id,ie()}),ze.appendChild(t)}}}function Sa(){let e=lr();if(te==="favorites"){let t=new Set(yt());e=e.filter(n=>t.has(n.name))}else te!=="all"&&(e=e.filter(t=>cr(t,te)));return Ve==="enabled"&&(e=e.filter(t=>pe(t.name))),Ve==="disabled"&&(e=e.filter(t=>!pe(t.name))),e}function ie(){if(!qe)return;wa();let e=Sa();Dt&&(Dt.placeholder=`Search ${e.length} plugins...`);let t=e,n=Ft.trim().toLowerCase();if(n&&(t=t.filter(o=>va(o).includes(n))),te!=="favorites"){let o=ht();if(o.length){let r=new Map(o.map((i,a)=>[i,a]));t=t.slice().sort((i,a)=>{let s=r.has(i.name),l=r.has(a.name);return s!==l?s?-1:1:s?(r.get(i.name)??0)-(r.get(a.name)??0):i.name.localeCompare(a.name)})}}qe.replaceChildren();for(let o of t)qe.appendChild(ya(o));Fe&&(Fe.hidden=t.length>0,Fe.textContent=xa())}function An(e){e.stopPropagation()}function Pn(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function On(){document.getElementById(G)?.setAttribute("aria-expanded",ee?"true":"false")}function La(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function _t(){Nn(),Ft="",Ve="all",te="all",document.getElementById(xe)?.remove(),ee=!1,On()}function Ca(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",An),t.addEventListener("pointerup",An),t.addEventListener("click",An);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=zt();let a=document.createElement("h2");a.textContent="Bloom++",r.append(i,a);let s=document.createElement("button");s.type="button",s.className="bloom-icon-btn",s.setAttribute("aria-label","Close"),s.innerHTML=tr(),s.addEventListener("click",_t),o.append(r,s),n.appendChild(o);let l=document.createElement("div");l.className="bloom-section-head";let c=document.createElement("h3");c.textContent="Plugins";let d=document.createElement("p");d.textContent="Turn Bloom++ features on or off. Sliders icon opens options.",l.append(c,d),n.appendChild(l);let b=document.createElement("div");b.className="bloom-plugin-tabs",n.appendChild(b);let p=document.createElement("div");p.className="bloom-search-bar";let h=document.createElement("input");h.type="search",h.className="bloom-search-input",h.setAttribute("aria-label","Search plugins"),h.placeholder="Search plugins...",h.addEventListener("input",()=>{Ft=h.value,ie()});let g=document.createElement("select");g.className="bloom-search-filter",g.setAttribute("aria-label","Filter plugins");for(let W of ia){let pn=document.createElement("option");pn.value=W.value,pn.textContent=W.label,g.appendChild(pn)}g.value=Ve,g.addEventListener("change",()=>{Ve=g.value,ie()}),p.append(h,g),n.appendChild(p);let m=document.createElement("div");m.className="bloom-plugin-list",n.appendChild(m);let f=document.createElement("p");f.className="bloom-tab-empty",f.hidden=!0,n.appendChild(f);let T=document.createElement("div");T.className="bloom-settings-plugin",Ue(T,!0);let $=document.createElement("div");$.className="bloom-settings-head";let U=document.createElement("button");U.type="button",U.className="bloom-icon-btn",U.setAttribute("aria-label","Back"),U.innerHTML=sa(),U.addEventListener("click",Nn);let Re=document.createElement("div");Re.className="bloom-dialog-titles";let me=document.createElement("h2"),q=document.createElement("p");q.className="bloom-settings-sub",Re.append(me,q);let I=document.createElement("button");I.type="button",I.className="bloom-icon-btn",I.setAttribute("aria-label","Close"),I.innerHTML=tr(),I.addEventListener("click",_t),$.append(U,Re,I);let F=document.createElement("div");return F.className="bloom-plugin-settings",T.append($,F),t.append(n,T),$t=n,qt=T,qe=m,Ot=me,Bt=q,O=F,Fe=f,Dt=h,or=g,ze=b,ie(),t}function Ta(e){e.classList.add("bloom-rail-dock")}function ka(){let e=document.getElementById(G);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&kt(e)?e:null}function Ma(){if(document.getElementById(xe)?.remove(),!document.body)return;let e=Ca(xe);Ta(e),document.body.appendChild(e),ee=!0,Nn(),On(),oe("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:M,dock:"center",rail:!!ka()})}function Bn(){let e=document.getElementById(xe);if(e instanceof HTMLElement&&e.isConnected&&La(e)){_t();return}e?.remove(),Ma()}function Aa(){let e=document.createElement("button");return e.type="button",e.id=G,e.className="bloom-rail-item",e.setAttribute("aria-controls",xe),e.setAttribute("aria-expanded",ee?"true":"false"),e.innerHTML=`<span class="bloom-rail-mark">${zt()}</span><span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),Bn()}),e}function nr(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function Pa(e){let t=e.querySelector("img");if(t instanceof HTMLElement){let n=t.getBoundingClientRect();if(n.width>8&&n.height>8)return t}for(let n of e.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}return null}function Ha(e,t){for(let n of e.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||t&&(n===t||n.contains(t)||t.contains(n))||(n.textContent||"").trim().length<2)continue;let r=n.getBoundingClientRect();if(r.width>16&&r.height>8&&r.height<40)return n}return null}function Z(e,t,n){let o=`${n}px`;e.style.getPropertyValue(t)!==o&&e.style.setProperty(t,o)}function dr(e,t){if(e.classList.contains("bloom-rail-compact"))return;let n=e.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!e.isConnected||!t.isConnected)return;let o=Pa(t),r=getComputedStyle(t),i=Number.parseFloat(r.paddingTop),a=Number.parseFloat(r.paddingBottom);if(Number.isFinite(i)&&Z(e,"padding-top",Math.round(i)),Number.isFinite(a)&&Z(e,"padding-bottom",Math.round(a)),o){let s=o.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));Z(n,"width",l),Z(n,"height",Math.max(20,Math.round(s.height)));let c=e.getBoundingClientRect(),d=Math.round(s.left-c.left);d>=0&&d<=40&&Z(e,"padding-left",d);let b=Ha(t,o);if(b){let p=b.getBoundingClientRect(),h=n.getBoundingClientRect(),g=Math.round(p.left-h.right);g>=0&&g<=24&&Z(e,"gap",g)}}else{let s=Number.parseFloat(r.paddingLeft),l=Number.parseFloat(r.columnGap||r.gap);Number.isFinite(s)&&Z(e,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&Z(e,"gap",Math.round(l))}}function Rn(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Ra(){if(Ke?.isConnected&&K){K.observe(Ke,{childList:!0});return}In()}function Ia(e){if(Rn(e))return!1;try{if(e.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function Na(e,t){!t||!e||requestAnimationFrame(()=>{if(e.isConnected){$e=0;return}$e+=1,Ge=Date.now()+Math.min(8e3,250*2**Math.min($e,5))})}function Oa(){ve||Date.now()<Ge||(ve=requestAnimationFrame(()=>{ve=0,!(Date.now()<Ge)&&(document.getElementById(G)?.isConnected||jt())}))}function jt(){if(!document.body)return;K?.disconnect();let e=null,t=!1;try{let n=document.getElementById(G);e=n instanceof HTMLButtonElement?n:Aa();let o=_e(),r=wn();if(o){let i=Sn(o),a=i.parentElement;if(Rn(i)||a&&Rn(a))return;e.isConnected&&e.nextElementSibling===i||(i.before(e),t=!0),nr(e),dr(e,o)}else r?(e.parentElement!==r&&(r.appendChild(e),t=!0),nr(e,!0)):e.isConnected&&!kt(e)&&(e.remove(),e=null)}finally{Na(e,t),Ra(),On()}}function In(){let e=Jo();!e||!Ia(e)||Ke===e&&K||(K?.disconnect(),Ke=e,K=new MutationObserver(()=>{document.getElementById(G)?.isConnected||Oa()}),K.observe(e,{childList:!0}))}function Ba(){jt(),In(),je===void 0&&(je=window.setInterval(()=>{let e=document.getElementById(G);if(!(e instanceof HTMLElement)||!e.isConnected)Date.now()>=Ge&&jt();else{$e=0;let t=_e();t&&dr(e,t)}In()},na))}function Da(){je!==void 0&&(clearInterval(je),je=void 0),ve&&cancelAnimationFrame(ve),ve=0,Ge=0,$e=0,K?.disconnect(),K=null,Ke=null}function _a(e){Ht===e&&Q||(Q?.disconnect(),Ht=e,Q=new MutationObserver(()=>{if(!e.isConnected){Q?.disconnect(),Q=null,Ht=null;return}ur(e)}),Q.observe(e,{childList:!0}))}function ur(e){if(_a(e),e.querySelector(`#${Rt}`))return;let t=document.createElement("button");t.type="button",t.id=Rt,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${zt()}<span>Bloom++</span>`,t.addEventListener("pointerdown",Pn),t.addEventListener("pointerup",Pn),t.addEventListener("click",n=>{Pn(n),Bn()}),e.insertBefore(t,e.firstChild)}function At(){let e=Yo();return e?(ur(e),!0):!1}function ja(e){Xo(e)&&(queueMicrotask(At),requestAnimationFrame(()=>{At()}),window.setTimeout(At,60),window.setTimeout(At,180))}function $a(){Nt?.abort();let e=new AbortController;Nt=e,document.addEventListener("click",ja,{signal:e.signal})}function qa(){Nt?.abort(),Nt=null,Q?.disconnect(),Q=null,Ht=null}function mr(){ge(),pa(()=>{ir(),rr(),jt(),Bn()})}var fr=y({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[E.p],required:!0,hidden:!0,enabledByDefault:!0,settings:oa,startAt:"HostReady",cleanupSelectors:[`#${ta}`,`#${G}`,`#${Rt}`,`#${xe}`,`#${It}`,"#bloom-menu-panel"],start(){ir(),rr(),Ba(),$a(),Mt?.(),Mt=er(Mn),Mn(),kn=[ft("pluginToggle",()=>{ee&&!ye&&ie()}),ft("pluginPin",()=>{ee&&!ye&&ie()}),ft("pluginStar",()=>{ee&&!ye&&ie()})]},stop(){Da(),qa(),Mt?.(),Mt=null;for(let e of kn)e();kn=[],_t(),document.getElementById(G)?.remove(),document.getElementById(Rt)?.remove(),document.getElementById(It)?.remove(),Pt=null,ra=null,$t=null,qt=null,qe=null,Ot=null,Bt=null,O=null,Fe=null,Dt=null,or=null,ze=null,ee=!1,ye=!1},onSettingsChange:Mn});var br='form[data-type="unified-composer"], form.w-full[data-type]',Ee=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Kt=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),pr=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),gr=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Fa=/stop streaming|stop generating|停止生成|停止输出|停止响应/;function A(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function ae(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!A(r)))return r;return null}function hr(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function B(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=hr(e);return!!(Fa.test(n)||/^stop$/i.test(n))}function ne(){let t=Array.from(document.querySelectorAll(br)).find(A);if(t instanceof HTMLElement)return t;let n=ae(document,Ee),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function se(){let e=Array.from(document.querySelectorAll(Ee));return e.find(A)??e[0]??null}function Dn(){let e=se();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function za(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function yr(e){let t=ne();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!A(n))&&e(n))return n;return null}function Gt(){let e=ne(),t=ae(e,Kt)??ae(document,Kt);return t&&!B(t)?t:yr(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!B(n);let r=hr(n);return/^(send|send prompt|发送)$/i.test(r)&&!B(n)})}function _n(){let e=Gt();return!!e&&za(e)}function jn(){let e=ne(),t=ae(e,pr,!0)??ae(document,pr,!0);if(t)return t;let n=ae(e,gr)??ae(document,gr);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&A(o)&&B(o))return o}return yr(B)}function we(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}var vr="bloom-host-icon",We="data-bloom-host-rel",$n="not all",qn=0,xr=0,Ka=400;function Er(e){qn+=1;try{e()}finally{qn-=1}}function Vt(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function Se(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function wr(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function Ga(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Va(e,t){if(e.lastElementChild===t)return;let n=Date.now();n-xr<Ka||(xr=n,e.appendChild(t))}function Ua(e,t){for(let n of e.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===t||Vt(n)&&(n.getAttribute(We)||n.setAttribute(We,n.rel),n.media!==$n&&(n.media=$n),n.rel!==vr&&(n.rel=vr))}function Wa(e){for(let t of e.querySelectorAll(`link[${We}]`)){if(!(t instanceof HTMLLinkElement))continue;let n=t.getAttribute(We);n&&(t.rel=n),t.removeAttribute(We),t.media===$n&&t.removeAttribute("media")}}function Fn(e,t){let{head:n}=document;!n||!t||Er(()=>{Ua(n,e);let o=wr(e),{type:r,sizes:i}=Ga(t);o?Va(n,o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function Sr(e,t){let{head:n}=document;n&&Er(()=>{wr(e)?.remove(),Wa(n)})}function Lr(e,t){let{head:n}=document;if(!n)return null;let o=0,r=new MutationObserver(i=>{if(qn)return;let a=!1,s;for(let l of i){l.type==="attributes"&&l.target instanceof HTMLLinkElement&&(l.target.id===e?a=!0:Vt(l.target)&&(a=!0,Se(l.target.href)&&(s=l.target.href)));for(let c of l.removedNodes)Vt(c)&&c.id===e&&(a=!0);for(let c of l.addedNodes)Vt(c)&&c.id!==e&&(a=!0,Se(c.href)&&(s=c.href))}a&&(o||(o=requestAnimationFrame(()=>{o=0,t(s)})))});return r.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),r}function Le(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=c=>{let d=n.indexOf(c);return d>=0&&n[d+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,d)=>{try{return document.querySelector(c)?.getAttribute(d)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function Ut(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function Ya(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!A(t))&&(B(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function Ja(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&A(e))}function Xa(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&A(e))}function Za(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function zn(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function Wt(){if(jn()||Ya())return!0;let e=Gt();return e&&A(e)&&!B(e)?!1:!!(Ja()||Xa()||Za())}var Qa=["original","badge","dot","hole","bg"],kr=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge",default:!0},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],Mr={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Yt="#FCFCFC",es="#111111",Cr="#111111",ts="#ffffff",ns="#212121",os="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",rs={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Jt=32,Tr=64;function Ar(e){return typeof e=="string"&&Qa.includes(e)}function is(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function Xt(e){let t=document.createElement("canvas");t.width=Jt,t.height=Jt;let n=t.getContext("2d");return n?(n.scale(Jt/Tr,Jt/Tr),e(n),t.toDataURL("image/png")):""}function as(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function Zt(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(os);n&&(e.strokeStyle=es,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function ss(e,t,n){let o=Mr[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=Cr,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=Cr,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=ts,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function Ye(e,t){if(e==="original")return t==="wait"?Xt(o=>Zt(o,Yt)):is(rs[t]);let n=t==="wait"?void 0:Mr[t];return Xt(e==="hole"?o=>Zt(o,n??Yt):e==="bg"?o=>{o.fillStyle=n??ns,as(o,0,0,64,64,14),o.fill(),Zt(o,Yt,!1)}:o=>{Zt(o,Yt),t!=="wait"&&ss(o,t,e==="dot"?"dot":"badge")})}function Pr(e){return{wait:Ye(e,"wait"),rotate:Ye(e,"rotate"),done:Ye(e,"done"),ready:Ye(e,"ready"),error:Ye(e,"error")}}var ls=new v("ChatStateFavicons"),ce="bloom-chat-state-favicon",Nr=x({style:{type:3,description:"Favicon overlay",options:kr}}),Te="",en={wait:"",rotate:"",done:"",ready:"",error:""},tn="wait",Xe=!1,V=!1,P=null,Ze="",Qe="",et=!0,Je=null,ke=0,Ce,Qt=null,le=null,Kn=null,tt=!1,Hr=new WeakSet,cs=400;function ds(){let e=Nr.store.style;return Ar(e)?e:"badge"}function us(){let t=document.querySelector(`link[rel~="icon"]:not(#${ce})`)?.href;return Se(t)?t:Se(Te)?Te:""}function H(e){if(tn===e){let t=document.getElementById(ce);if(t instanceof HTMLLinkElement&&t.getAttribute("href")===en[e])return}tn=e,Fn(ce,en[e])}function Rr(){en=Pr(ds()),H(tn)}function ms(){let e=Le(),t=e?Ut(e):Ut("");return Wt()?(!Ze&&t&&(Ze=t),Ze||t):(Ze="",t)}function Or(){Xe=!1,V=!1,P=null,Ze=""}function fs(e){Qe=e,Or(),et=!1,H("wait")}function Br(){if(!tt)return;let e=Le()||location.pathname;if(Qe&&e&&Qe!==e){fs(e);return}e&&(Qe=e);let t=ms(),n=Wt(),o=Dn(),r=_n();if(zn()&&!n){H("error"),Xe=!1,V=!1,P=null;return}if(n){Xe=!0,V=!1,P=t,H("rotate");return}if(Xe){let i=!!P&&!!t&&P===t;if(Xe=!1,i){V=!0,P=t,H("done");return}V=!1,P=null}if(V)if(!!(P&&t&&P!==t))V=!1,P=null;else if(o){H("done");return}else if(et){V=!1,H("ready");return}else{V=!1,H("wait");return}P=null,H(o?"wait":et?"ready":"wait")}function Dr(){let e=ne();if(!(le&&Kn===e&&e.isConnected)){if(le?.disconnect(),Kn=e,!e||e===document.body){le=null;return}le=new MutationObserver(()=>nn()),le.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function nn(){!tt||ke||(ke=requestAnimationFrame(()=>{ke=0,tt&&(_r(),Dr(),Br())}))}function Ir(){et=!0,nn()}function _r(){let e=se();!e||Hr.has(e)||(Hr.add(e),e.addEventListener("input",Ir,{passive:!0}),e.addEventListener("compositionend",Ir,{passive:!0}))}var jr=y({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[E.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Nr,startAt:"DOMContentLoaded",cleanupSelectors:[`#${ce}`],start(){tt=!0,Te=us()||Te,Rr(),Qt?.disconnect(),Qt=Lr(ce,e=>{Se(e)&&(Te=e),Fn(ce,en[tn])}),Je?.abort(),Je=new AbortController,window.addEventListener("popstate",nn,{signal:Je.signal}),_r(),Dr(),Ce!==void 0&&clearInterval(Ce),Ce=setInterval(nn,cs),Br(),ls.debug("favicon watch started")},stop(){tt=!1,ke&&cancelAnimationFrame(ke),ke=0,Ce!==void 0&&(clearInterval(Ce),Ce=void 0),Je?.abort(),Je=null,le?.disconnect(),le=null,Kn=null,Qt?.disconnect(),Qt=null,Or(),Qe="",et=!0,Sr(ce,Te)},onSettingsChange:Rr});var $r=`.bloom-ih-hud {
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
`;var qr=new v("InputHistory"),Gn=/\u200B/g,Fr=10,zr=500,Kr=100,gs=8,bs=120,hs=2e3,on=10,rn=x({maxEntries:{type:4,description:"Max stored prompts",min:Fr,max:zr,default:Kr},history:{type:5,description:"Stored prompts",render:Rs},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Vn=new Map,w=0,Un="",D=!1,ot=!1,Jn=0,nt=null,Wn,Xn=null,Gr=!0;function R(){let e=rn.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Vr(e){let t=So(Number(rn.store.maxEntries??Kr),Fr,zr);return e.length>t?e.slice(e.length-t):e}function an(e){rn.store.entries=Vr(e)}function ys(e){return e.replaceAll(Gn,"").replace(/\n$/,"").trim()}function Yn(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(Ee);return n instanceof HTMLElement?n:se()}function vs(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!we(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(Gn,"").trim().length===0,last:i.toString().replaceAll(Gn,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Ur(e,t){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch(i){qr.debug("pm caret failed:",i)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function Wr(e){clearTimeout(Wn),Wn=setTimeout(()=>{if(e!==Jn)return;ot=!1;let t=Xn;t&&Ur(t,Gr)},bs)}function Yr(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),ot=!0,Xn=e,Gr=n;let i=++Jn;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(a){qr.debug("insertText failed:",a),e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),Ur(e,n),Wr(i)}function xs(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function Me(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Es(){document.querySelector(".bloom-ih-hud")?.remove()}function ws(e,t){let n=xs();n.textContent=e;let o=(t.closest("form")??ne()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-gs)}px`,n.classList.add("bloom-ih-hud-on")}function Zn(e){let t=ys(e);if(!t)return;let n=Date.now(),o=Vn.get(t);if(o&&n-o<hs)return;Vn.set(t,n);let r=R().filter(i=>i!==t);r.push(t),an(r),w=R().length,D=!1,Me()}function Ss(e,t){let n=R();if(!n.length&&e)return;w>=n.length&&(Un=we(t),w=n.length);let o=e?w-1:w+1;o<0||o>n.length||(w=o,D=!0,Yr(t,o===n.length?Un:n[o],e),o<n.length?ws(`${o+1} / ${n.length}`,t):Me())}function Ls(e){D=!1,Me(),Yr(e,Un,!1),w=R().length}function Cs(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=Yn(e.target)??Yn(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&D&&!e.altKey&&!e.shiftKey){Ls(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){Zn(we(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=R();if(!o){let i=vs(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||w<=0)||!n&&w>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),Ss(n,t))}function Ts(e){if(Yn(e.target)){if(ot){Wr(Jn);return}D&&(D=!1,Me(),w=R().length)}}function ks(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(Ee);n instanceof HTMLElement&&Zn(we(n))}function Ms(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(Kt);if(!n||!(n instanceof HTMLElement)||B(n))return;let o=se();o&&Zn(we(o))}function As(e){if(!(!D||ot)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}D=!1,Me()}}function Ps(){if(nt)return;nt=new AbortController;let{signal:e}=nt,t={capture:!0,signal:e};window.addEventListener("keydown",Cs,t),window.addEventListener("input",Ts,t),window.addEventListener("submit",ks,t),window.addEventListener("click",Ms,t),window.addEventListener("pointerdown",As,t)}function Hs(e){let t=R().slice();t.splice(e,1),an(t),w>t.length&&(w=t.length)}function Rs(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=R().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(f=>f.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/on));n>=l&&(n=l-1);let c=s.slice(n*on,n*on+on);e.replaceChildren();let d=document.createElement("input");if(d.className="bloom-ih-search",d.type="search",d.placeholder="Search history",d.autocomplete="off",d.value=t,d.addEventListener("input",()=>{t=d.value,n=0,r()}),e.appendChild(d),c.length){let f=document.createElement("div");f.className="bloom-ih-list",c.forEach((T,$)=>{let U=i.indexOf(T),Re=R().length-1-U,me=document.createElement("div");me.className="bloom-ih-item";let q=document.createElement("button");q.type="button",q.className=`bloom-ih-body${o===$?"":" bloom-ih-clamp"}`,q.textContent=T,q.addEventListener("click",()=>{o=o===$?-1:$,r()});let I=document.createElement("div");I.className="bloom-ih-actions";let F=document.createElement("button");F.type="button",F.title="Copy",F.textContent="C",F.addEventListener("click",()=>{Co(T)});let W=document.createElement("button");W.type="button",W.title="Delete",W.textContent="\xD7",W.addEventListener("click",()=>{Hs(Re),r()}),I.append(F,W),me.append(q,I),f.appendChild(me)}),e.appendChild(f)}else{let f=document.createElement("p");f.className="bloom-ih-empty",f.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(f)}let b=document.createElement("div");b.className="bloom-ih-pager";let p=document.createElement("button");p.type="button",p.className="bloom-ih-btn",p.textContent="Prev",p.disabled=n<=0,p.addEventListener("click",()=>{n-=1,r()});let h=document.createElement("span");h.textContent=`${n+1} / ${l}`;let g=document.createElement("button");g.type="button",g.className="bloom-ih-btn",g.textContent="Next",g.disabled=n+1>=l,g.addEventListener("click",()=>{n+=1,r()});let m=document.createElement("button");m.type="button",m.className="bloom-ih-clear",m.textContent="Clear all",m.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(an([]),w=0,r())}),b.append(p,h,g,m),e.appendChild(b)};return r(),()=>{e.replaceChildren()}}var Jr=y({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[E.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:rn,startAt:"HostReady",managedStyle:"inputHistory",start(){L("inputHistory",$r),w=R().length,D=!1,Ps()},stop(){nt?.abort(),nt=null,Me(),Es(),Vn.clear(),clearTimeout(Wn),ot=!1,Xn=null,D=!1},onSettingsChange(){let e=R(),t=Vr(e);t.length!==e.length&&an(t),w>t.length&&(w=t.length)}});var Qn="noShareLink",Is=['button[data-testid="share-chat-button"]'],Ns=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],eo=x({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Xr(e){return`${e.join(",")}{display:none!important}`}function Zr(){let e=[];if(eo.store.hideShareChat!==!1&&e.push(Xr(Is)),eo.store.hideShareProject!==!1&&e.push(Xr(Ns)),!e.length){C(Qn);return}L(Qn,e.join(`
`))}var Qr=y({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[E.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:eo,start:Zr,onSettingsChange:Zr,stop(){C(Qn)}});var ni="noDictation",Os=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]'],Bs=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],oi=x({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function ei(e){return`${e.join(",")}{display:none!important}`}function ti(){let e=[ei(Os)];oi.store.hideDictationSettings!==!1&&e.push(ei(Bs)),L(ni,e.join(`
`))}var ri=y({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[E.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:oi,start:ti,onSettingsChange:ti,stop(){C(ni)}});var to="noSidebarIdentity",ln=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],si=ln.flatMap(e=>[`${e} .min-w-0 > .truncate`,`${e} .min-w-0.flex-1 .truncate`]),Ds=ln.flatMap(e=>[`${e} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),_s=[...si,...Ds],js=ln.map(e=>`${e} a[href^="mailto:"]`),$s=ln.flatMap(e=>[`${e} .min-w-0 > :not(.truncate)`,`${e} .min-w-0 > :not(.truncate) *`,`${e} .min-w-0 .text-xs`,`${e} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${e} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${e} .text-xs:not(.truncate)`,`${e} .text-token-text-secondary:not(.truncate)`,`${e} .text-token-text-tertiary:not(.truncate)`,`${e} .min-w-0 ~ *`,`${e} .min-w-0 ~ * *`,`${e} > .text-xs`,`${e} > .text-token-text-secondary`,`${e} > .text-token-text-tertiary`]),sn=x({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0}});function ii(e){return`${e.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function qs(){return`${$s.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function ai(){let e=sn.store.hideUsername!==!1,t=sn.store.hideEmail!==!1,n=e&&sn.store.enlargePlan!==!1,o=[];if(e&&o.push(ii(n?si:_s)),t&&o.push(ii(js)),n&&o.push(qs()),!o.length){C(to);return}L(to,o.join(`
`))}var li=y({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[E.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:sn,start:ai,onSettingsChange:ai,stop(){C(to)}});var ci=`#bloom-rt-host {
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
`;var mi=new v("RecentTopics"),He="bloom-rt-host",fi="home",pi=/^\/c\/([a-z0-9_-]{8,})/i,zs=/\/c\/([a-z0-9_-]{8,})/i,gi=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Ks=new Set(["Backquote","IntlBackslash"]),Gs=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Vs=140,Us=[3,4,5,6,7,8,9,10,11,12].map(e=>({label:String(e),value:String(e),default:e===5})),S=x({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Us},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),cn=null,no=null,k=!1,ct=!1,rt=!1,_=0,de="",Ae=null,it=null,Pe;function Ws(){let e=Number(S.store.maxRecent??5);return Number.isFinite(e)&&e>=3&&e<=12?e:5}function at(){let e=S.plain.visits;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function oo(){let e=S.plain.titles;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function bi(){let e=S.plain.previews;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function ro(){let e=S.plain.projects;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function un(e){let t=Ws();return e.length>t?e.slice(0,t):e}function j(e){return e===fi}function st(e,t=Vs){let n=e.replace(/\s+/g," ").trim();return n.length<=t?n:`${n.slice(0,t-1)}\u2026`}function io(e){if(!e)return"";try{return new URL(e,location.origin).pathname.match(pi)?.[1]??""}catch{return e.match(zs)?.[1]??""}}function ue(){let e=(location.pathname||"/").match(pi);if(e?.[1])return e[1];let n=Le().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return fi}function ao(e){if(j(e))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${e}"]`);for(let o of n){if(io(o.getAttribute("href")||"")!==e)continue;let r=st(o.textContent||"",80);if(r)return r}}catch{}let t=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return ue()===e&&t&&!/^ChatGPT$/i.test(t)?st(t,80):""}function Ys(e){return j(e)?"New chat":oo()[e]||ao(e)||"Chat"}function Js(e){return ro()[e]||""}function Xs(e){return bi()[e]||{}}function hi(e,t){if(!e||j(e)||!t)return;let n=oo();n[e]!==t&&(n[e]=t,S.store.titles=n)}function Zs(e,t){if(!e||j(e)||!t)return;let n=ro();n[e]!==t&&(n[e]=t,S.store.projects=n)}function Qs(e,t){if(!e||j(e)||!t.user&&!t.assistant)return;let n=bi(),o=n[e]||{},r={user:t.user||o.user,assistant:t.assistant||o.assistant};o.user===r.user&&o.assistant===r.assistant||(n[e]=r,S.store.previews=n)}function so(e){if(!e||j(e)&&S.store.includeHome===!1)return;let t=at().filter(n=>n!==e);t.unshift(e),S.store.visits=un(t)}function mn(){let e=S.store.includeHome!==!1;return un(at().filter(n=>e||!j(n))).map(n=>({id:n,title:Ys(n),project:Js(n),preview:Xs(n)}))}function di(e){try{let t=document.querySelectorAll(`[data-message-author-role="${e}"]`),n=t[t.length-1];if(!(n instanceof HTMLElement))return"";let o=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||o.push(a)}let r=o.length?o.join(" "):n.textContent||"";return st(r)}catch{return""}}function lt(e){if(!e||j(e)||e!==ue())return;let t=ao(e);t&&hi(e,t);let n=di("user"),o=di("assistant");Qs(e,{user:n,assistant:o});let r=vi(e);if(r){let i=yi(r);i&&Zs(e,i)}}function lo(){let e=oo(),t=ro(),n=[],o=new Set,r=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${He}, #bloom-root, #bloom-sidebar-panel`))continue;let d=io(c.getAttribute("href")||"");if(!d||o.has(d))continue;o.add(d),n.push(d);let b=st(c.textContent||"",80);b&&!gi.test(b)&&e[d]!==b&&(e[d]=b,r=!0);let p=yi(c);p&&t[d]!==p&&(t[d]=p,i=!0)}}catch{}r&&(S.store.titles=e),i&&(S.store.projects=t);let a=at(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(S.store.visits=un([...a,...l]))}function yi(e){let t=e.parentElement;for(let n=0;n<10&&t;n++){if(t.id==="bloom-rt-host"||t.id==="bloom-root"){t=t.parentElement;continue}let o=t.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),r=st((o instanceof HTMLElement?o.textContent:"")||"",60);if(r&&!gi.test(r)&&!/^20\d{2}/.test(r)&&r!==e.textContent?.trim()&&t.querySelector('a[href^="/c/"]'))return r;t=t.parentElement}return""}function vi(e){if(j(e)){let t=document.querySelector('[data-testid="create-new-chat-button"]');return t instanceof HTMLAnchorElement?t:document.querySelector('a[href="/"]')}try{for(let t of document.querySelectorAll(`a[href*="/c/${e}"]`))if(io(t.getAttribute("href")||"")===e)return t}catch{}return null}function el(e){let t=vi(e);if(t){t.click();return}if(j(e)){location.assign("/");return}location.assign(`/c/${e}`)}function tl(){let e=ue();de&&de!==e&&lt(de),de=e,so(e),lo();let t=ao(e);t&&hi(e,t),lt(e)}function dn(){Pe===void 0&&(Pe=window.setTimeout(()=>{Pe=void 0,tl()},120))}function nl(){Ae||(Ae=history.pushState.bind(history),it=history.replaceState.bind(history),history.pushState=function(...t){let n=Ae(...t);return dn(),n},history.replaceState=function(...t){let n=it(...t);return dn(),n})}function ol(){Ae&&(history.pushState=Ae),it&&(history.replaceState=it),Ae=null,it=null}function rl(e){return Ks.has(e.code)||e.keyCode===192?!0:Gs.has(e.key)}function xi(e){return e.key==="Control"||e.code==="ControlLeft"||e.code==="ControlRight"}function il(e,t){ct=t,lo(),lt(ue()),k=!0,_=0;try{let n=ue();so(n);let o=mn();o.length>1&&(_=e?o.length-1:1)}catch(n){mi.error("Failed to open switcher:",n)}dt()}function ui(e){let{length:t}=mn();t&&(_=(_+(e?-1:1)+t)%t,dt())}function co(){if(!k)return;let e=mn()[_];k=!1,ct=!1,dt(),e&&el(e.id)}function Ei(){k&&(k=!1,ct=!1,dt())}function al(e){if(xi(e)){rt=!0;return}if((e.ctrlKey||rt)&&!e.altKey&&!e.metaKey&&rl(e)&&!e.repeat){e.preventDefault(),e.stopImmediatePropagation();try{k?ui(e.shiftKey):il(e.shiftKey,!0)}catch(n){mi.error("Hotkey failed:",n)}return}if(k){if(e.key==="Escape"){e.preventDefault(),Ei();return}if(e.key==="Enter"&&!e.shiftKey){e.preventDefault(),co();return}e.key==="Tab"&&(e.ctrlKey||rt)&&(e.preventDefault(),ui(e.shiftKey))}}function sl(e){xi(e)&&(rt=!1,k&&ct&&co())}function ll(e){let t=e.target instanceof Element?e.target:null;!t||!t.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(dn)}function cl(e){!k||(e.target instanceof Element?e.target:null)?.closest(`#${He}`)||Ei()}function dl(){document.visibilityState==="hidden"&&lt(ue())}function ul(){if(!document.body)return null;let e=document.getElementById(He);if(e instanceof HTMLElement)return no=e,e;e=document.createElement("div"),e.id=He;let t=document.createElement("div");return t.className="bloom-rt-panel",t.setAttribute("role","listbox"),t.setAttribute("aria-label","Recent conversations"),t.dataset.visible="false",t.addEventListener("click",n=>n.stopPropagation()),e.append(t),document.body.append(e),no=e,e}function dt(){let e=ul();if(!e)return;let t=e.querySelector(".bloom-rt-panel");if(!t)return;if(!k){t.dataset.visible="false",t.replaceChildren();return}let n=mn();if(!n.length){t.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",t.replaceChildren(i);return}_>=n.length&&(_=0);let o=document.createElement("div");o.className="bloom-rt-list",o.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===_?"true":"false",s.setAttribute("aria-selected",a===_?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="user",d.textContent=i.preview.user,c.append(d)}if(i.preview.assistant){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="assistant",d.textContent=i.preview.assistant,c.append(d)}s.append(c)}s.addEventListener("click",()=>{_=a,co()}),o.append(s)}),t.replaceChildren(o),t.dataset.visible="true",t.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function ml(){document.getElementById(He)?.remove(),no=null}var wi=y({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[E.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${He}`],settings:S,start(){L("recentTopics",ci),de=ue(),so(de),lo(),lt(de),nl(),cn=new AbortController;let{signal:e}=cn;window.addEventListener("keydown",al,{capture:!0,signal:e}),window.addEventListener("keyup",sl,{capture:!0,signal:e}),window.addEventListener("popstate",dn,{signal:e}),document.addEventListener("click",ll,{capture:!0,signal:e}),document.addEventListener("click",cl,{signal:e}),document.addEventListener("visibilitychange",dl,{signal:e})},stop(){cn?.abort(),cn=null,Pe!==void 0&&(clearTimeout(Pe),Pe=void 0),ol(),k=!1,ct=!1,rt=!1,ml()},onSettingsChange(){let e=un(at());e.length!==at().length&&(S.store.visits=e),k&&dt()}});var uo="cleaner",fl=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],pl=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],mo=x({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0}});function Si(e){return`${e.join(",")}{display:none!important}`}function Li(){let e=[];if(mo.store.hideDownloadApps!==!1&&e.push(Si(fl)),mo.store.hideDisclaimer!==!1&&e.push(Si(pl)),!e.length){C(uo);return}L(uo,e.join(`
`))}var Ci=y({name:"Cleaner",description:"Hide Download apps and the composer mistake notice.",authors:[E.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:mo,start:Li,onSettingsChange:Li,stop(){C(uo)}});var ut=new v("Bloom"),Ti=!1,gl=Date.now(),bl=[fr,jr,Jr,Qr,ri,li,wi,Ci];function fn(e){return new Promise(t=>setTimeout(t,e))}function hl(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var Mi=8e3,ki=300,yl=250;async function vl(){if(re())return await fn(ki),!0;for(;Date.now()-gl<Mi;)if(await fn(yl),re())return await fn(ki),!0;return re()||xn()}function fo(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function xl(){if(fo())return!0;let e=Date.now()+Mi;for(;Date.now()<e;)if(await fn(100),fo())return!0;return fo()}function El(){try{GM_registerMenuCommand?.("Bloom++ settings",mr)}catch{}}function wl(){Et(()=>{Oe("HostShell"),ut.info("host shell",M)}),wt(()=>{ut.info("idle ready",M)}),St(()=>{ho(),Oe("HostReady"),ut.info("chrome ready",M)})}async function po(){await To()}async function go(){if(Ti)return;Ti=!0;for(let n of bl)try{Oo(n)}catch(o){ut.error("register failed",n.name,o)}_o(),Oe("Init"),El(),wl();let e=()=>Oe("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await hl(),xl().then(n=>{n&&Lt()}),!await vl()){ut.warn("late islands not detected; starting default plugins",M),ge(),Ct();return}await Ko()}var Ai=typeof unsafeWindow<"u"?unsafeWindow:window,Sl=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||Sl){let e=Ai.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",M);try{Object.defineProperty(Ai,"Bloom",{value:bo,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}po().then(()=>go()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
