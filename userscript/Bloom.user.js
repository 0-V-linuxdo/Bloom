// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260902] v1.4.4
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

/* Bloom++ [20260902] v1.4.4. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var nr=Object.defineProperty;var or=(e,t)=>{for(var n in t)nr(e,n,{get:t[n],enumerable:!0})};var gn={};or(gn,{REPO_URL:()=>qn,Settings:()=>u,VERSION:()=>v,hasLateIslands:()=>z,init:()=>pn,initSettings:()=>fn,isDocumentInteractive:()=>Fn,plugins:()=>C,requestChromeReady:()=>Ke,requestIdleReady:()=>Y,requestShellReady:()=>ze,whenChromeReady:()=>$e,whenIdleReady:()=>je,whenShellReady:()=>Fe});var N=new Map,Ie=!1;function rr(){return document.getElementById("bloom-root")?.shadowRoot??null}function ir(){return document.head??null}function U(){let e=rr();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=ar()}function Tt(e,t){if(!Ie)return;let n=ir();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),U();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,U();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,U()}function B(e,t){let n=N.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},N.set(e,n)),Ie&&Tt(e,n)}function bn(){Ie=!0;for(let[e,t]of N)Tt(e,t);return U(),!0}function hn(e){let t=N.get(e);t&&(t.disabled=!1,Ie&&Tt(e,t))}function yn(e){let t=N.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),U())}function $(e){let t=N.get(e);t&&(t.el?.remove(),N.delete(e),U())}function ar(){return Array.from(N.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var b=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function y(e){return e}var sr=new Map;function ce(e,t){let n=sr.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var lr="bloompp";function vn(){return new Promise((e,t)=>{let n=indexedDB.open(lr,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function En(e){try{let t=await vn();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function xn(e,t){try{let n=await vn();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function ue(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Sn(e,t,n){return Math.min(n,Math.max(t,e))}function wn(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function Ln(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}var Ne=new b("SettingsStore"),O="BloomSettings",cr=100;function Oe(e){if(ue(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(ue(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return ue(n)?n:null}return null}catch{return null}}var Be=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[p,c]of this.defaultGetters)if(l.startsWith(p)){let g=l.slice(p.length+1);if(g&&!g.includes(".")){let d=c(g);d!==void 0&&(i[a]=d,s=d);break}}}return ue(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Ne.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},cr))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(O,this.plain)}catch{try{GM_setValue(O,t)}catch(n){Ne.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(O,t)}catch{}xn(O,t).catch(n=>Ne.warn("Failed to save settings to IndexedDB:",n))}catch(t){Ne.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){wn(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var ur=new b("Settings"),dr={plugins:{}},u=new Be(structuredClone(dr)),mr=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function fr(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function L(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(u.store.plugins[n]||(u.store.plugins[n]={}),u.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?u.plain.plugins[n]??{}:{}}};return t}function pr(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function Cn(){let e=null;if(e=Oe(pr(O)),e||(e=Oe(await En(O))),!e)try{e=Oe(localStorage.getItem(O))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(u.plain.plugins=t),ur.debug("Loaded settings")}}function Tn(e,t){t&&(t.pluginName=e,u.plain.plugins[e]||(u.plain.plugins[e]={}),u.setDefaultGetter(mr(e),n=>{if(n!=="enabled")return fr(t.def,n)}))}var De=new b("PluginManager"),C={},me=new Set;function An(e){if(C[e.name]){De.warn("Duplicate plugin",e.name);return}C[e.name]=e,Tn(e.name,e.settings)}function _e(e){let t=C[e];if(!t)return!1;if(t.required)return!0;let n=u.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function Pn(e){let t=C[e];if(!t||t.required)return;let n=!_e(e);u.plain.plugins[e]||(u.store.plugins[e]={}),u.store.plugins[e].enabled=n,n?Rn(t):gr(t),ce("pluginToggle",{name:e,enabled:n})}function Rn(e,t=!1){if(!me.has(e.name)&&_e(e.name))try{e.managedStyle&&hn(e.managedStyle),e.start?.(),me.add(e.name),e.settings&&u.addPrefixChangeListener(`plugins.${e.name}.`,()=>{me.has(e.name)&&e.onSettingsChange?.()}),t||De.debug("Started",e.name)}catch(n){De.error("Failed to start",e.name,n)}}function gr(e){if(me.has(e.name)){try{e.stop?.()}catch(t){De.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(yn(e.managedStyle),$(e.managedStyle)),me.delete(e.name)}}function fe(e){for(let t of Object.values(C))(t.startAt??"DOMContentLoaded")===e&&Rn(t)}var Mn=2,kn="defaultsRev";function Hn(){for(let t of Object.values(C))u.plain.plugins[t.name]||(u.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=u.store.plugins.Settings??(u.store.plugins.Settings={});if(e[kn]!==Mn){for(let t of["NoShareLink","NoDictation"]){let n=u.store.plugins[t]??(u.store.plugins[t]={});n.enabled=!1}e[kn]=Mn}}var pe=!1,qe=!1,Mt=!1,Nn=[],Bn=[],On=[];function kt(e){let t=e.splice(0);for(let n of t)n()}function ge(){pe||(pe=!0,kt(Nn))}function At(){qe||(qe=!0,pe||ge(),kt(Bn))}function Dn(){Mt||(Mt=!0,pe||ge(),qe||At(),kt(On))}function Fe(e){pe?e():Nn.push(e)}function je(e){qe?e():Bn.push(e)}function $e(e){Mt?e():On.push(e)}function ze(){ge()}function Y(){ge(),At()}function Ke(){Dn()}function In(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function _n(){await In(4e3),ge(),await In(4e3),At(),Dn()}var T={p:"0-V-linuxdo"},v="[20260902] v1.4.4",qn="https://github.com/0-V-linuxdo/Bloom";function br(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function hr(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function Pt(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function z(){return Pt()?br()||hr():!1}function Fn(){return z()}var yr=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),jn=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),vr=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Er="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function J(e){return e.id==="bloom-root"||!!e.closest(Er)}function $n(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function Ve(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function Rt(e){if(!(e instanceof HTMLElement)||!e.isConnected||J(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&Ve(t)?!1:e.getClientRects().length>0}function be(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function xr(){let e=[];for(let t of document.querySelectorAll(yr))!(t instanceof HTMLElement)||!t.isConnected||J(t)||e.push(t);return e}function Ge(e){if(!e.isConnected||J(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function he(){return xr().filter(Ge)[0]??null}function Ht(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||J(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function It(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!J(n)&&!be(n)&&(t=n);let o=t.parentElement;if(o&&!be(o)&&!J(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!be(o.parentElement))return o}return t}function zn(){let e=document.querySelectorAll(jn);for(let n of e)if(Rt(n)&&!Ve(n)&&$n(n))return n;let t=document.querySelectorAll(vr);for(let n of t){if(!Rt(n)||!$n(n)||Ve(n))continue;let o=n.querySelector(jn);return Rt(o)&&!Ve(o)?o:n}return null}function Kn(){let e=he();if(e){let t=It(e),n=t.parentElement;if(n&&!be(n))return n;if(!be(t))return t}return Ht()}function Vn(e){let t=he();return t?e.composedPath().includes(t):!1}var Bt=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary"],Sr={light:{"--main-surface-primary":"#ffffff","--main-surface-secondary":"#f4f4f4","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#f9f9f9","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#b4b4b4","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.1)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.2)","--link":"#0d0d0d","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#f4f4f4","--bg-primary":"#ffffff","--bg-secondary":"#f4f4f4"},dark:{"--main-surface-primary":"#212121","--main-surface-secondary":"#2f2f2f","--main-surface-tertiary":"#424242","--sidebar-surface-primary":"#171717","--text-primary":"#ececec","--text-secondary":"#b4b4b4","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ececec","--icon-secondary":"#b4b4b4","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.1)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.2)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.06)","--interactive-label-primary-default":"#ececec","--message-surface":"#2f2f2f","--bg-primary":"#212121","--bg-secondary":"#2f2f2f"}};function wr(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Lr(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function Nt(e){let t=wr(e);return t?Lr(t)>.55?"light":"dark":null}function Cr(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=Nt(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=Nt(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Nt(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Gn(e){return e==="auto"?Cr():e}function Tr(e){try{let t=getComputedStyle(document.documentElement);for(let n of Bt){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function Un(e,t,n){let o=Sr[t];if(n){Tr(e);for(let r of Bt)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of Bt)e.style.setProperty(r,o[r])}function Wn(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var Ot=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover. */

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
`;var kr="bloom-root",q="bloom-rail-item",Xe="bloom-account-item",X="bloom-sidebar-panel",Ze="bloom-settings-css",Ar=2e3,Pr=L({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),Ye=null,Rr=null,$t=!1,Se=!1,Ft=[],Ue=null,Qe=null,_=null,Je=null,R=null,Ee=null,ye,rt=null,it=null,ve=null,et=null,tt=null,P=null;function at(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Yn(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Hr(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>'}function Ir(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l-.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>'}var Nr={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>'};function Br(e){return Nr[e]??at()}function Or(){return"auto"}function Dt(){let e=Or(),t=Gn(e);Ye&&(Ye.setAttribute("data-bloom-scheme",t),Un(Ye,t,e==="auto")),ce("schemeChange",{scheme:t,pref:e})}function xe(e,t){e&&(e.hidden=t,e.toggleAttribute("inert",t),t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden"))}function Zn(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel").forEach(e=>e.remove())}function Qn(){if(B("settings",Ot),document.getElementById(Ze)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=Ze,e.textContent=Ot,document.head.appendChild(e)}function Dr(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function eo(){for(let e of Ft)e();Ft=[]}function to(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function _r(e){return!!e.settings&&Object.keys(e.settings.def).length>0}function qr(e,t,n){if(n.hidden)return null;if(n.type===5&&n.render){let a=document.createElement("details");a.className="bloom-field bloom-field-block";let s=document.createElement("summary");s.textContent=n.description||t;let l=document.createElement("div");return Ft.push(n.render(l)),a.append(s,l),a}let o=document.createElement("div");o.className="bloom-field";let r=document.createElement("span");r.textContent=n.description||t,o.appendChild(r);let i=u.store.plugins[e]??(u.store.plugins[e]={});if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??n.options.find(s=>s.default)?.value??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=to(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),o.appendChild(a),o}return o}function zt(){$t=!1,eo(),P&&P.replaceChildren(),xe(it,!0),xe(rt,!1)}function Fr(e){if(eo(),$t=!0,et&&(et.textContent=e.name),tt&&(tt.textContent=e.description),P){if(P.replaceChildren(),e.settings)for(let[t,n]of Object.entries(e.settings.def)){let o=qr(e.name,t,n);o&&P.appendChild(o)}if(!P.childElementCount){let t=document.createElement("p");t.className="bloom-dialog-empty",t.textContent="No configurable settings.",P.appendChild(t)}}xe(rt,!0),xe(it,!1)}function jr(e){let t=document.createElement("div");t.className="bloom-plugin-row";let n=document.createElement("span");n.className="bloom-plugin-icon",n.innerHTML=Br(e.name);let o=document.createElement("span");if(o.className="bloom-plugin-label",o.textContent=e.name,t.append(n,o),_r(e)){let a=document.createElement("button");a.type="button",a.className="bloom-icon-btn",a.setAttribute("aria-label",`${e.name} settings`),a.innerHTML=Ir(),a.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),Fr(e)}),t.appendChild(a)}let r=to(e.name,_e(e.name),!!e.required),i=r.querySelector("input");return i?.addEventListener("click",a=>a.stopPropagation()),i?.addEventListener("change",()=>{Pn(e.name)}),t.appendChild(r),t}function $r(){if(ve){ve.replaceChildren();for(let e of Object.values(C))e.hidden||e.name==="Settings"||ve.appendChild(jr(e))}}function _t(e){e.stopPropagation()}function qt(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function Kt(){document.getElementById(q)?.setAttribute("aria-expanded",Se?"true":"false")}function zr(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function nt(){zt(),document.getElementById(X)?.remove(),Se=!1,Kt()}function Kr(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",_t),t.addEventListener("pointerup",_t),t.addEventListener("click",_t);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=at();let a=document.createElement("h2");a.textContent="Bloom++",r.append(i,a);let s=document.createElement("button");s.type="button",s.className="bloom-icon-btn",s.setAttribute("aria-label","Close"),s.innerHTML=Yn(),s.addEventListener("click",nt),o.append(r,s),n.appendChild(o);let l=document.createElement("p");l.className="bloom-settings-sub",l.textContent="Plugins",n.appendChild(l);let p=document.createElement("div");p.className="bloom-plugin-list",n.appendChild(p);let c=document.createElement("div");c.className="bloom-settings-plugin",xe(c,!0);let g=document.createElement("div");g.className="bloom-settings-head";let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn",d.setAttribute("aria-label","Back"),d.innerHTML=Hr(),d.addEventListener("click",zt);let I=document.createElement("div");I.className="bloom-dialog-titles";let h=document.createElement("h2"),A=document.createElement("p");A.className="bloom-settings-sub",I.append(h,A);let m=document.createElement("button");m.type="button",m.className="bloom-icon-btn",m.setAttribute("aria-label","Close"),m.innerHTML=Yn(),m.addEventListener("click",nt),g.append(d,I,m);let j=document.createElement("div");return j.className="bloom-plugin-settings",c.append(g,j),t.append(n,c),rt=n,it=c,ve=p,et=h,tt=A,P=j,$r(),t}function Vr(e){e.classList.add("bloom-rail-dock")}function Gr(){let e=document.getElementById(q);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&Ge(e)?e:null}function Ur(){if(document.getElementById(X)?.remove(),!document.body)return;let e=Kr(X);Vr(e),document.body.appendChild(e),Se=!0,zt(),Kt(),ce("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:v,dock:"body",rail:!!Gr()})}function Vt(){let e=document.getElementById(X);if(e instanceof HTMLElement&&e.isConnected&&zr(e)){nt();return}e?.remove(),Ur()}function Wr(){let e=document.createElement("button");return e.type="button",e.id=q,e.className="bloom-rail-item",e.setAttribute("aria-controls",X),e.setAttribute("aria-expanded",Se?"true":"false"),e.innerHTML=`<span class="bloom-rail-mark">${at()}</span><span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),Vt()}),e}function Jn(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function Yr(e){let t=e.querySelector("img");if(t instanceof HTMLElement){let n=t.getBoundingClientRect();if(n.width>8&&n.height>8)return t}for(let n of e.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}return null}function Jr(e,t){for(let n of e.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||t&&(n===t||n.contains(t)||t.contains(n))||(n.textContent||"").trim().length<2)continue;let r=n.getBoundingClientRect();if(r.width>16&&r.height>8&&r.height<40)return n}return null}function D(e,t,n){let o=`${n}px`;e.style.getPropertyValue(t)!==o&&e.style.setProperty(t,o)}function no(e,t){if(e.classList.contains("bloom-rail-compact"))return;let n=e.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!e.isConnected||!t.isConnected)return;let o=Yr(t),r=getComputedStyle(t),i=Number.parseFloat(r.paddingTop),a=Number.parseFloat(r.paddingBottom);if(Number.isFinite(i)&&D(e,"padding-top",Math.round(i)),Number.isFinite(a)&&D(e,"padding-bottom",Math.round(a)),o){let s=o.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));D(n,"width",l),D(n,"height",Math.max(20,Math.round(s.height)));let p=e.getBoundingClientRect(),c=Math.round(s.left-p.left);c>=0&&c<=40&&D(e,"padding-left",c);let g=Jr(t,o);if(g){let d=g.getBoundingClientRect(),I=n.getBoundingClientRect(),h=Math.round(d.left-I.right);h>=0&&h<=24&&D(e,"gap",h)}}else{let s=Number.parseFloat(r.paddingLeft),l=Number.parseFloat(r.columnGap||r.gap);Number.isFinite(s)&&D(e,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&D(e,"gap",Math.round(l))}}function Xn(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Xr(){if(Ee?.isConnected&&R){R.observe(Ee,{childList:!0});return}jt()}function ot(){if(document.body){R?.disconnect();try{let e=document.getElementById(q),t=e instanceof HTMLButtonElement?e:Wr(),n=he(),o=Ht();if(n){let r=It(n),i=r.parentElement;if(Xn(r)||i&&Xn(i))return;t.isConnected&&t.nextElementSibling===r||r.before(t),Jn(t),no(t,n)}else o?(t.parentElement!==o&&o.appendChild(t),Jn(t,!0)):t.isConnected&&!Ge(t)&&t.remove()}finally{Xr(),Kt()}}}function jt(){let e=Kn();e&&(Ee===e&&R||(R?.disconnect(),Ee=e,R=new MutationObserver(()=>{document.getElementById(q)?.isConnected||ot()}),R.observe(e,{childList:!0})))}function Zr(){ot(),jt(),ye===void 0&&(ye=window.setInterval(()=>{let e=document.getElementById(q);if(!(e instanceof HTMLElement)||!e.isConnected)ot();else{let t=he();t&&no(e,t)}jt()},Ar))}function Qr(){ye!==void 0&&(clearInterval(ye),ye=void 0),R?.disconnect(),R=null,Ee=null}function ei(e){Je===e&&_||(_?.disconnect(),Je=e,_=new MutationObserver(()=>{if(!e.isConnected){_?.disconnect(),_=null,Je=null;return}oo(e)}),_.observe(e,{childList:!0}))}function oo(e){if(ei(e),e.querySelector(`#${Xe}`))return;let t=document.createElement("button");t.type="button",t.id=Xe,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${at()}<span>Bloom++</span>`,t.addEventListener("pointerdown",qt),t.addEventListener("pointerup",qt),t.addEventListener("click",n=>{qt(n),Vt()}),e.insertBefore(t,e.firstChild)}function We(){let e=zn();return e?(oo(e),!0):!1}function ti(e){Vn(e)&&(queueMicrotask(We),requestAnimationFrame(()=>{We()}),window.setTimeout(We,60),window.setTimeout(We,180))}function ni(){Qe?.abort();let e=new AbortController;Qe=e,document.addEventListener("click",ti,{signal:e.signal})}function oi(){Qe?.abort(),Qe=null,_?.disconnect(),_=null,Je=null}function ro(){Y(),Dr(()=>{Qn(),Zn(),ot(),Vt()})}var io=y({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[T.p],required:!0,hidden:!0,enabledByDefault:!0,settings:Pr,startAt:"HostReady",cleanupSelectors:[`#${kr}`,`#${q}`,`#${Xe}`,`#${X}`,`#${Ze}`,"#bloom-menu-panel"],start(){Qn(),Zn(),Zr(),ni(),Ue?.(),Ue=Wn(Dt),Dt()},stop(){Qr(),oi(),Ue?.(),Ue=null,nt(),document.getElementById(q)?.remove(),document.getElementById(Xe)?.remove(),document.getElementById(Ze)?.remove(),Ye=null,Rr=null,rt=null,it=null,ve=null,et=null,tt=null,P=null,Se=!1,$t=!1},onSettingsChange:Dt});var lo='form[data-type="unified-composer"], form.w-full[data-type]',Z=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),st=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),ao=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),so=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),ri=/stop streaming|stop generating|停止生成|停止输出|停止响应/;function E(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function K(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!E(r)))return r;return null}function co(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function M(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=co(e);return!!(ri.test(n)||/^stop$/i.test(n))}function F(){let t=Array.from(document.querySelectorAll(lo)).find(E);if(t instanceof HTMLElement)return t;let n=K(document,Z),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function V(){let e=Array.from(document.querySelectorAll(Z));return e.find(E)??e[0]??null}function Gt(){let e=V();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function ii(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function uo(e){let t=F();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!E(n))&&e(n))return n;return null}function lt(){let e=F(),t=K(e,st)??K(document,st);return t&&!M(t)?t:uo(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!M(n);let r=co(n);return/^(send|send prompt|发送)$/i.test(r)&&!M(n)})}function Ut(){let e=lt();return!!e&&ii(e)}function Wt(){let e=F(),t=K(e,ao,!0)??K(document,ao,!0);if(t)return t;let n=K(e,so)??K(document,so);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&E(o)&&M(o))return o}return uo(M)}function Q(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}var Yt=0;function mo(e){Yt+=1;try{e()}finally{Yt-=1}}function ct(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function ee(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function fo(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function ai(e){let{head:t}=document;if(t)for(let n of Array.from(t.querySelectorAll("link")))n.id!==e&&ct(n)&&n.remove()}function si(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Jt(e,t){let{head:n}=document;!n||!t||mo(()=>{ai(e);let o=fo(e),{type:r,sizes:i}=si(t);o?n.lastElementChild!==o&&n.appendChild(o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function po(e,t){let{head:n}=document;n&&mo(()=>{fo(e)?.remove();let o=Array.from(n.querySelectorAll("link")).filter(ct);if(o.length){ee(t)&&o[0].href!==t&&(o[0].href=t);return}if(!ee(t))return;let r=document.createElement("link");r.rel="icon",r.href=t,n.appendChild(r)})}function go(e,t){let{head:n}=document;if(!n)return null;let o=new MutationObserver(r=>{if(!Yt)for(let i of r){if(i.type==="attributes"&&ct(i.target)){t(i.target.id===e?void 0:i.target.href);return}for(let a of i.addedNodes)if(ct(a)&&a.id!==e){t(a.href);return}}});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}function ut(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=p=>{let c=n.indexOf(p);return c>=0&&n[c+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(p,c)=>{try{return document.querySelector(p)?.getAttribute(c)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function dt(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function li(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!E(t))&&(M(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function ci(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&E(e))}function ui(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&E(e))}function di(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Xt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function mt(){if(Wt()||li())return!0;let e=lt();return e&&E(e)&&!M(e)?!1:!!(ci()||ui()||di())}var mi=["original","badge","dot","hole","bg"],yo=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge",default:!0},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],vo={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},ft="#FCFCFC",fi="#111111",bo="#111111",pi="#ffffff",gi="#212121",bi="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",hi={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},pt=32,ho=64;function Eo(e){return typeof e=="string"&&mi.includes(e)}function yi(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function gt(e){let t=document.createElement("canvas");t.width=pt,t.height=pt;let n=t.getContext("2d");return n?(n.scale(pt/ho,pt/ho),e(n),t.toDataURL("image/png")):""}function vi(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function bt(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(bi);n&&(e.strokeStyle=fi,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function Ei(e,t,n){let o=vo[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=bo,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=bo,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=pi,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function we(e,t){if(e==="original")return t==="wait"?gt(o=>bt(o,ft)):yi(hi[t]);let n=t==="wait"?void 0:vo[t];return gt(e==="hole"?o=>bt(o,n??ft):e==="bg"?o=>{o.fillStyle=n??gi,vi(o,0,0,64,64,14),o.fill(),bt(o,ft,!1)}:o=>{bt(o,ft),t!=="wait"&&Ei(o,t,e==="dot"?"dot":"badge")})}function xo(e){return{wait:we(e,"wait"),rotate:we(e,"rotate"),done:we(e,"done"),ready:we(e,"ready"),error:we(e,"error")}}var xi=new b("ChatStateFavicons"),ne="bloom-chat-state-favicon",Co=L({style:{type:3,description:"Favicon overlay",options:yo}}),oe="",Qt={wait:"",rotate:"",done:"",ready:"",error:""},en="wait",Ce=!1,H=!1,x=null,Te="",Me="",ke=!0,Le=null,re=0,te,ht=null,G=null,Zt=null,Ae=!1,So=new WeakSet,Si=400;function wi(){let e=Co.store.style;return Eo(e)?e:"badge"}function Li(){let t=document.querySelector(`link[rel~="icon"]:not(#${ne})`)?.href;return ee(t)?t:ee(oe)?oe:""}function S(e){en=e,Jt(ne,Qt[e])}function wo(){Qt=xo(wi()),S(en)}function Ci(){let e=ut(),t=e?dt(e):dt("");return mt()?(!Te&&t&&(Te=t),Te||t):(Te="",t)}function To(){Ce=!1,H=!1,x=null,Te=""}function Ti(e){Me=e,To(),ke=!1,S("wait")}function Mo(){if(!Ae)return;let e=ut()||location.pathname;if(Me&&e&&Me!==e){Ti(e);return}e&&(Me=e);let t=Ci(),n=mt(),o=Gt(),r=Ut();if(Xt()&&!n){S("error"),Ce=!1,H=!1,x=null;return}if(n){Ce=!0,H=!1,x=t,S("rotate");return}if(Ce){let i=!!x&&!!t&&x===t;if(Ce=!1,i){H=!0,x=t,S("done");return}H=!1,x=null}if(H)if(!!(x&&t&&x!==t))H=!1,x=null;else if(o){S("done");return}else if(ke){H=!1,S("ready");return}else{H=!1,S("wait");return}x=null,S(o?"wait":ke?"ready":"wait")}function ko(){let e=F();if(!(G&&Zt===e&&e.isConnected)){if(G?.disconnect(),Zt=e,!e||e===document.body){G=null;return}G=new MutationObserver(()=>yt()),G.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid","class"]})}}function yt(){!Ae||re||(re=requestAnimationFrame(()=>{re=0,Ae&&(Ao(),ko(),Mo())}))}function Lo(){ke=!0,yt()}function Ao(){let e=V();!e||So.has(e)||(So.add(e),e.addEventListener("input",Lo,{passive:!0}),e.addEventListener("compositionend",Lo,{passive:!0}))}var Po=y({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[T.p],tags:["chat","ui"],enabledByDefault:!0,settings:Co,startAt:"DOMContentLoaded",cleanupSelectors:[`#${ne}`],start(){Ae=!0,oe=Li()||oe,wo(),ht?.disconnect(),ht=go(ne,e=>{ee(e)&&(oe=e),Jt(ne,Qt[en])}),Le?.abort(),Le=new AbortController,window.addEventListener("popstate",yt,{signal:Le.signal}),Ao(),ko(),te!==void 0&&clearInterval(te),te=setInterval(yt,Si),Mo(),xi.debug("favicon watch started")},stop(){Ae=!1,re&&cancelAnimationFrame(re),re=0,te!==void 0&&(clearInterval(te),te=void 0),Le?.abort(),Le=null,G?.disconnect(),G=null,Zt=null,ht?.disconnect(),ht=null,To(),Me="",ke=!0,po(ne,oe)},onSettingsChange:wo});var Ro=`.bloom-ih-hud {
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
`;var Ho=new b("InputHistory"),tn=/\u200B/g,Io=10,No=500,Bo=100,ki=8,Ai=120,Pi=2e3,vt=10,Et=L({maxEntries:{type:4,description:"Max stored prompts",min:Io,max:No,default:Bo},history:{type:5,description:"Stored prompts",render:Vi},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),nn=new Map,f=0,on="",k=!1,Re=!1,sn=0,Pe=null,rn,ln=null,Oo=!0;function w(){let e=Et.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Do(e){let t=Sn(Number(Et.store.maxEntries??Bo),Io,No);return e.length>t?e.slice(e.length-t):e}function xt(e){Et.store.entries=Do(e)}function Ri(e){return e.replaceAll(tn,"").replace(/\n$/,"").trim()}function an(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(Z);return n instanceof HTMLElement?n:V()}function Hi(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!Q(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(tn,"").trim().length===0,last:i.toString().replaceAll(tn,"").trim().length===0}}catch{return{first:!0,last:!0}}}function _o(e,t){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch(i){Ho.debug("pm caret failed:",i)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function qo(e){clearTimeout(rn),rn=setTimeout(()=>{if(e!==sn)return;Re=!1;let t=ln;t&&_o(t,Oo)},Ai)}function Fo(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),Re=!0,ln=e,Oo=n;let i=++sn;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(a){Ho.debug("insertText failed:",a),e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),_o(e,n),qo(i)}function Ii(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function ie(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Ni(){document.querySelector(".bloom-ih-hud")?.remove()}function Bi(e,t){let n=Ii();n.textContent=e;let o=(t.closest("form")??F()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-ki)}px`,n.classList.add("bloom-ih-hud-on")}function cn(e){let t=Ri(e);if(!t)return;let n=Date.now(),o=nn.get(t);if(o&&n-o<Pi)return;nn.set(t,n);let r=w().filter(i=>i!==t);r.push(t),xt(r),f=w().length,k=!1,ie()}function Oi(e,t){let n=w();if(!n.length&&e)return;f>=n.length&&(on=Q(t),f=n.length);let o=e?f-1:f+1;o<0||o>n.length||(f=o,k=!0,Fo(t,o===n.length?on:n[o],e),o<n.length?Bi(`${o+1} / ${n.length}`,t):ie())}function Di(e){k=!1,ie(),Fo(e,on,!1),f=w().length}function _i(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=an(e.target)??an(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&k&&!e.altKey&&!e.shiftKey){Di(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){cn(Q(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=w();if(!o){let i=Hi(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||f<=0)||!n&&f>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),Oi(n,t))}function qi(e){if(an(e.target)){if(Re){qo(sn);return}k&&(k=!1,ie(),f=w().length)}}function Fi(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(Z);n instanceof HTMLElement&&cn(Q(n))}function ji(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(st);if(!n||!(n instanceof HTMLElement)||M(n))return;let o=V();o&&cn(Q(o))}function $i(e){if(!(!k||Re)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}k=!1,ie()}}function zi(){if(Pe)return;Pe=new AbortController;let{signal:e}=Pe,t={capture:!0,signal:e};window.addEventListener("keydown",_i,t),window.addEventListener("input",qi,t),window.addEventListener("submit",Fi,t),window.addEventListener("click",ji,t),window.addEventListener("pointerdown",$i,t)}function Ki(e){let t=w().slice();t.splice(e,1),xt(t),f>t.length&&(f=t.length)}function Vi(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=w().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(m=>m.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/vt));n>=l&&(n=l-1);let p=s.slice(n*vt,n*vt+vt);e.replaceChildren();let c=document.createElement("input");if(c.className="bloom-ih-search",c.type="search",c.placeholder="Search history",c.autocomplete="off",c.value=t,c.addEventListener("input",()=>{t=c.value,n=0,r()}),e.appendChild(c),p.length){let m=document.createElement("div");m.className="bloom-ih-list",p.forEach((j,wt)=>{let er=i.indexOf(j),tr=w().length-1-er,Lt=document.createElement("div");Lt.className="bloom-ih-item";let ae=document.createElement("button");ae.type="button",ae.className=`bloom-ih-body${o===wt?"":" bloom-ih-clamp"}`,ae.textContent=j,ae.addEventListener("click",()=>{o=o===wt?-1:wt,r()});let Ct=document.createElement("div");Ct.className="bloom-ih-actions";let se=document.createElement("button");se.type="button",se.title="Copy",se.textContent="C",se.addEventListener("click",()=>{Ln(j)});let le=document.createElement("button");le.type="button",le.title="Delete",le.textContent="\xD7",le.addEventListener("click",()=>{Ki(tr),r()}),Ct.append(se,le),Lt.append(ae,Ct),m.appendChild(Lt)}),e.appendChild(m)}else{let m=document.createElement("p");m.className="bloom-ih-empty",m.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(m)}let g=document.createElement("div");g.className="bloom-ih-pager";let d=document.createElement("button");d.type="button",d.className="bloom-ih-btn",d.textContent="Prev",d.disabled=n<=0,d.addEventListener("click",()=>{n-=1,r()});let I=document.createElement("span");I.textContent=`${n+1} / ${l}`;let h=document.createElement("button");h.type="button",h.className="bloom-ih-btn",h.textContent="Next",h.disabled=n+1>=l,h.addEventListener("click",()=>{n+=1,r()});let A=document.createElement("button");A.type="button",A.className="bloom-ih-clear",A.textContent="Clear all",A.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(xt([]),f=0,r())}),g.append(d,I,h,A),e.appendChild(g)};return r(),()=>{e.replaceChildren()}}var jo=y({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[T.p],tags:["chat"],enabledByDefault:!0,settings:Et,startAt:"HostReady",managedStyle:"inputHistory",start(){B("inputHistory",Ro),f=w().length,k=!1,zi()},stop(){Pe?.abort(),Pe=null,ie(),Ni(),nn.clear(),clearTimeout(rn),Re=!1,ln=null,k=!1},onSettingsChange(){let e=w(),t=Do(e);t.length!==e.length&&xt(t),f>t.length&&(f=t.length)}});var un="noShareLink",Gi=['button[data-testid="share-chat-button"]'],Ui=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],dn=L({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function $o(e){return`${e.join(",")}{display:none!important}`}function zo(){let e=[];if(dn.store.hideShareChat!==!1&&e.push($o(Gi)),dn.store.hideShareProject!==!1&&e.push($o(Ui)),!e.length){$(un);return}B(un,e.join(`
`))}var Ko=y({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[T.p],tags:["ui","privacy"],enabledByDefault:!1,startAt:"HostReady",settings:dn,start:zo,onSettingsChange:zo,stop(){$(un)}});var Uo="noDictation",Wi=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]'],Yi=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Wo=L({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Vo(e){return`${e.join(",")}{display:none!important}`}function Go(){let e=[Vo(Wi)];Wo.store.hideDictationSettings!==!1&&e.push(Vo(Yi)),B(Uo,e.join(`
`))}var Yo=y({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[T.p],tags:["chat","ui"],enabledByDefault:!1,startAt:"HostReady",settings:Wo,start:Go,onSettingsChange:Go,stop(){$(Uo)}});var He=new b("Bloom"),Jo=!1,Ji=Date.now(),Xi=[io,Po,jo,Ko,Yo];function St(e){return new Promise(t=>setTimeout(t,e))}function Zi(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var Zo=8e3,Xo=300,Qi=250;async function ea(){if(z())return await St(Xo),!0;for(;Date.now()-Ji<Zo;)if(await St(Qi),z())return await St(Xo),!0;return z()||Pt()}function mn(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function ta(){if(mn())return!0;let e=Date.now()+Zo;for(;Date.now()<e;)if(await St(100),mn())return!0;return mn()}function na(){try{GM_registerMenuCommand?.("Bloom++ settings",ro)}catch{}}function oa(){Fe(()=>{fe("HostShell"),He.info("host shell",v)}),je(()=>{He.info("idle ready",v)}),$e(()=>{bn(),fe("HostReady"),He.info("chrome ready",v)})}async function fn(){await Cn()}async function pn(){if(Jo)return;Jo=!0;for(let n of Xi)try{An(n)}catch(o){He.error("register failed",n.name,o)}Hn(),fe("Init"),na(),oa();let e=()=>fe("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await Zi(),ta().then(n=>{n&&ze()}),!await ea()){He.warn("late islands not detected; starting default plugins",v),Y(),Ke();return}await _n()}var Qo=typeof unsafeWindow<"u"?unsafeWindow:window;if(window===window.top){let e=Qo.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",v);try{Object.defineProperty(Qo,"Bloom",{value:gn,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}fn().then(()=>pn()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
