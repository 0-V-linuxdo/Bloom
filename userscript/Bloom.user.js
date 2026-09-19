// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260919] v1.4.22
// @description  Void++-style plugin host for chatgpt.com. Tab favicon, input history, recent chats, reply notify, Recents status, hide Share, Dictation, sidebar name, Download apps, upgrade CTAs, and ads.
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

/* Bloom++ [20260919] v1.4.22. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Ea=Object.defineProperty;var Sa=(e,t)=>{for(var n in t)Ea(e,n,{get:t[n],enumerable:!0})};var Wo={};Sa(Wo,{REPO_URL:()=>Sr,Settings:()=>u,VERSION:()=>P,hasLateIslands:()=>ue,init:()=>Uo,initSettings:()=>Vo,isDocumentInteractive:()=>Lr,plugins:()=>D,requestChromeReady:()=>Qt,requestIdleReady:()=>Te,requestShellReady:()=>Zt,whenChromeReady:()=>Xt,whenIdleReady:()=>Jt,whenShellReady:()=>Yt});var Q=new Map,Ft=!1;function La(){return document.getElementById("bloom-root")?.shadowRoot??null}function Ca(){return document.head??null}function Le(){let e=La();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=Ta()}function Un(e,t){if(!Ft)return;let n=Ca();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),Le();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,Le();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,Le()}function E(e,t){let n=Q.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},Q.set(e,n)),Ft&&Un(e,n)}function Yo(){Ft=!0;for(let[e,t]of Q)Un(e,t);return Le(),!0}function Jo(e){let t=Q.get(e);t&&(t.disabled=!1,Ft&&Un(e,t))}function Xo(e){let t=Q.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),Le())}function C(e){let t=Q.get(e);t&&(t.el?.remove(),Q.delete(e),Le())}function Ta(){return Array.from(Q.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var y=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function h(e){return e}var Wn=new Map;function jt(e,t){let n=Wn.get(e);return n||(n=new Set,Wn.set(e,n)),n.add(t),()=>n.delete(t)}function de(e,t){let n=Wn.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var ka="bloompp";function Zo(){return new Promise((e,t)=>{let n=indexedDB.open(ka,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function Qo(e){try{let t=await Zo();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function er(e,t){try{let n=await Zo();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function tt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function tr(e,t,n){return Math.min(n,Math.max(t,e))}function nr(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function or(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}var $t=new y("SettingsStore"),ee="BloomSettings",Ma=100;function zt(e){if(tt(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(tt(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return tt(n)?n:null}return null}catch{return null}}var Gt=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,d]of this.defaultGetters)if(l.startsWith(c)){let b=l.slice(c.length+1);if(b&&!b.includes(".")){let p=d(b);p!==void 0&&(i[a]=p,s=p);break}}}return tt(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){$t.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Ma))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(ee,this.plain)}catch{try{GM_setValue(ee,t)}catch(n){$t.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(ee,t)}catch{}er(ee,t).catch(n=>$t.warn("Failed to save settings to IndexedDB:",n))}catch(t){$t.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){nr(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var Aa=new y("Settings"),Pa={plugins:{}},u=new Gt(structuredClone(Pa)),Ra=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function Ha(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function x(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(u.store.plugins[n]||(u.store.plugins[n]={}),u.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?u.plain.plugins[n]??{}:{}}};return t}function Na(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function rr(){let e=null;if(e=zt(Na(ee)),e||(e=zt(await Qo(ee))),!e)try{e=zt(localStorage.getItem(ee))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(u.plain.plugins=t),Aa.debug("Loaded settings")}}function ir(e,t){t&&(t.pluginName=e,u.plain.plugins[e]||(u.plain.plugins[e]={}),u.setDefaultGetter(Ra(e),n=>{if(n!=="enabled")return Ha(t.def,n)}))}function ar(){return u.plain.plugins.Settings||(u.store.plugins.Settings={}),u.store.plugins.Settings}function Kt(){return ar().pinnedPlugins??[]}function sr(e){return Kt().includes(e)}function lr(e){let t=Kt(),n=t.includes(e);return u.store.plugins.Settings={...u.plain.plugins.Settings,pinnedPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}function Vt(){return ar().starredPlugins??[]}function cr(e){return Vt().includes(e)}function dr(e){let t=Vt(),n=t.includes(e);return u.store.plugins.Settings={...u.plain.plugins.Settings,starredPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}var Ut=new y("PluginManager"),D={},nt=new Set;function mr(e){if(D[e.name]){Ut.warn("Duplicate plugin",e.name);return}D[e.name]=e,ir(e.name,e.settings)}function Ce(e){let t=D[e];if(!t)return!1;if(t.required)return!0;let n=u.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function pr(e){let t=D[e];if(!t||t.required)return;let n=!Ce(e);u.plain.plugins[e]||(u.store.plugins[e]={}),u.store.plugins[e].enabled=n,n?gr(t):Ia(t),de("pluginToggle",{name:e,enabled:n})}function gr(e,t=!1){if(!nt.has(e.name)&&Ce(e.name))try{e.managedStyle&&Jo(e.managedStyle),e.start?.(),nt.add(e.name),e.settings&&u.addPrefixChangeListener(`plugins.${e.name}.`,()=>{nt.has(e.name)&&e.onSettingsChange?.()}),t||Ut.debug("Started",e.name)}catch(n){Ut.error("Failed to start",e.name,n)}}function Ia(e){if(nt.has(e.name)){try{e.stop?.()}catch(t){Ut.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(Xo(e.managedStyle),C(e.managedStyle)),nt.delete(e.name)}}function ot(e){for(let t of Object.values(D))(t.startAt??"DOMContentLoaded")===e&&gr(t)}var ur=2,fr="defaultsRev";function br(){for(let t of Object.values(D))u.plain.plugins[t.name]||(u.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=u.store.plugins.Settings??(u.store.plugins.Settings={});if(e[fr]!==ur){for(let t of["NoShareLink","NoDictation"]){let n=u.store.plugins[t]??(u.store.plugins[t]={});n.enabled=!1}e[fr]=ur}}var rt=!1,Wt=!1,Yn=!1,yr=[],vr=[],xr=[];function Jn(e){let t=e.splice(0);for(let n of t)n()}function it(){rt||(rt=!0,Jn(yr))}function Xn(){Wt||(Wt=!0,rt||it(),Jn(vr))}function wr(){Yn||(Yn=!0,rt||it(),Wt||Xn(),Jn(xr))}function Yt(e){rt?e():yr.push(e)}function Jt(e){Wt?e():vr.push(e)}function Xt(e){Yn?e():xr.push(e)}function Zt(){it()}function Te(){it(),Xn()}function Qt(){wr()}function hr(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function Er(){await hr(4e3),it(),await hr(4e3),Xn(),wr()}var v={p:"0-V-linuxdo"},P="[20260919] v1.4.22",Sr="https://github.com/0-V-linuxdo/Bloom";function Oa(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Ba(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function Zn(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function ue(){return Zn()?Oa()||Ba():!1}function Lr(){return ue()}var Da=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Cr=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),_a=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),qa="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function Me(e){return e.id==="bloom-root"||!!e.closest(qa)}function Tr(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function en(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function Qn(e){if(!(e instanceof HTMLElement)||!e.isConnected||Me(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&en(t)?!1:e.getClientRects().length>0}function ke(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Fa(){let e=[];for(let t of document.querySelectorAll(Da))!(t instanceof HTMLElement)||!t.isConnected||Me(t)||e.push(t);return e}function tn(e){if(!e.isConnected||Me(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function at(){return Fa().filter(tn)[0]??null}function eo(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||Me(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function to(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!Me(n)&&!ke(n)&&n.parentElement&&!ke(n.parentElement)&&(t=n);let o=t.parentElement;if(o&&!ke(o)&&!Me(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!ke(o.parentElement))return o}return t}function kr(){let e=document.querySelectorAll(Cr);for(let n of e)if(Qn(n)&&!en(n)&&Tr(n))return n;let t=document.querySelectorAll(_a);for(let n of t){if(!Qn(n)||!Tr(n)||en(n))continue;let o=n.querySelector(Cr);return Qn(o)&&!en(o)?o:n}return null}function Mr(){let e=at();if(e){let t=to(e),n=t.parentElement;if(n&&!ke(n))return n;if(!ke(t))return t}return eo()}function Ar(e){let t=at();return t?e.composedPath().includes(t):!1}var oo=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],ja={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#212121","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function $a(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Ga(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function no(e){let t=$a(e);return t?Ga(t)>.55?"light":"dark":null}function za(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=no(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=no(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=no(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Pr(e){return e==="auto"?za():e}function Ka(e){try{let t=getComputedStyle(document.documentElement);for(let n of oo){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function Rr(e,t,n){let o=ja[t];if(n){Ka(e);for(let r of oo)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of oo)e.style.setProperty(r,o[r])}function Hr(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var ro=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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

.bloom-field select,
.bloom-field input[type="text"] {
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

.bloom-field.bloom-field-stack input[type="text"] {
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
`;var Ua="bloom-root",W="bloom-rail-item",sn="bloom-account-item",Re="bloom-sidebar-panel",ln="bloom-settings-css",Wa=2e3,Ya=x({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),rn=null,Ja=null,Ae=!1,oe=!1,co=[],nn=null,cn=null,ne=null,an=null,U=null,ft=null,st,Pe=0,mt=0,lt=0,gn=null,bn=null,ct=null,dn=null,un=null,_=null,dt=null,fn=null,Or=null,ut=null,io=[],Xa=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Za=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],hn="",pt="all",re="all";function yn(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Nr(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Qa(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>'}function es(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function ts(e){let t='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return e?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${t}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`}function ns(e){let t='<path d="M12 17v5"/>';return e?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var os={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function rs(e){return e.icon||os[e.name]||yn()}function is(){return"auto"}function ao(){let e=is(),t=Pr(e);rn&&(rn.setAttribute("data-bloom-scheme",t),Rr(rn,t,e==="auto")),de("schemeChange",{scheme:t,pref:e})}function gt(e,t){e&&(e.hidden=t,e.toggleAttribute("inert",t),t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden"))}function Br(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel").forEach(e=>e.remove())}function Dr(){if(E("settings",ro),document.getElementById(ln)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=ln,e.textContent=ro,document.head.appendChild(e)}function as(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function _r(){for(let e of co)e();co=[]}function qr(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function ss(e){return!!e.settings&&Object.keys(e.settings.def).length>0}function ls(e,t,n){if(n.hidden)return null;if(n.type===5&&n.render){let a=document.createElement("details");a.className="bloom-field bloom-field-block";let s=document.createElement("summary");s.textContent=n.description||t;let l=document.createElement("div");return co.push(n.render(l)),a.append(s,l),a}let o=document.createElement("div");o.className=n.type===4||n.type===0?"bloom-field bloom-field-stack":"bloom-field";let r=document.createElement("span");r.className="bloom-field-label",r.textContent=n.description||t,o.appendChild(r);let i=u.store.plugins[e]??(u.store.plugins[e]={});if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??n.options.find(s=>s.default)?.value??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=qr(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),o.appendChild(a),o}if(n.type===0){let a=document.createElement("input");return a.type="text",a.value=String(i[t]??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[t]=a.value}),o.appendChild(a),o}return o}function mo(){Ae=!1,_r(),_&&_.replaceChildren(),gt(bn,!0),gt(gn,!1)}function cs(e){if(_r(),Ae=!0,dn&&(dn.textContent=e.name),un&&(un.textContent=e.description),_){if(_.replaceChildren(),e.authors?.length){let t=document.createElement("p");t.className="bloom-plugin-authors",t.textContent=e.authors.join(", "),_.appendChild(t)}if(e.settings)for(let[t,n]of Object.entries(e.settings.def)){let o=ls(e.name,t,n);o&&_.appendChild(o)}if(!_.querySelector(".bloom-field, .bloom-dialog-empty")){let t=document.createElement("p");t.className="bloom-dialog-empty",t.textContent="No configurable settings.",_.appendChild(t)}}gt(gn,!0),gt(bn,!1)}function ds(e){let t=document.createElement("div");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=rs(e);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=e.name,a.title=e.name,r.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=cr(e.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=ts(l),c.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation();let m=dr(e.name);de("pluginStar",{name:e.name,starred:m})}),s.appendChild(c),!e.required){let f=sr(e.name),m=document.createElement("button");m.type="button",m.className=`bloom-icon-btn bloom-card-pin${f?" bloom-card-pin-active":""}`,m.setAttribute("aria-label",f?"Unpin from top":"Pin to top"),m.innerHTML=ns(f),m.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();let G=lr(e.name);de("pluginPin",{name:e.name,pinned:G})}),s.appendChild(m)}if(ss(e)){let f=document.createElement("button");f.type="button",f.className="bloom-icon-btn bloom-card-settings",f.setAttribute("aria-label",`${e.name} settings`),f.innerHTML=es(),f.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation(),cs(e)}),s.appendChild(f)}let d=qr(e.name,Ce(e.name),!!e.required),b=d.querySelector("input");if(b?.addEventListener("click",f=>f.stopPropagation()),b?.addEventListener("change",()=>{pr(e.name)}),s.appendChild(d),o.append(r,s),n.appendChild(o),e.description){let f=document.createElement("div");f.className="bloom-card-desc",f.textContent=e.description,n.appendChild(f)}let p=document.createElement("div");p.className="bloom-card-separator";let w=document.createElement("div");w.className="bloom-card-footer";let g=document.createElement("div");return g.className="bloom-card-author",g.textContent=e.authors?.filter(Boolean).join(", ")||"\xA0",w.appendChild(g),t.append(n,p,w),t}function Fr(){return Object.values(D).filter(e=>!e.hidden&&e.name!=="Settings")}function jr(e,t){return t==="all"||t==="favorites"?!0:(e.tags??[]).includes(t)}function us(e){return`${e.name} ${e.description??""} ${(e.tags??[]).join(" ")}`.toLowerCase()}function fs(){return hn.trim()?"No plugins match your search.":re==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function ms(){let e=Fr();return Za.filter(t=>t.id==="favorites"||t.id==="all"?!0:e.some(n=>jr(n,t.id)))}function ps(){if(ut){ut.replaceChildren();for(let e of ms()){let t=document.createElement("button");t.type="button",t.className=`bloom-plugin-tab${re===e.id?" bloom-plugin-tab-active":""}`,t.textContent=e.label,t.addEventListener("click",()=>{re=e.id,fe()}),ut.appendChild(t)}}}function gs(){let e=Fr();if(re==="favorites"){let t=new Set(Vt());e=e.filter(n=>t.has(n.name))}else re!=="all"&&(e=e.filter(t=>jr(t,re)));return pt==="enabled"&&(e=e.filter(t=>Ce(t.name))),pt==="disabled"&&(e=e.filter(t=>!Ce(t.name))),e}function fe(){if(!ct)return;ps();let e=gs();fn&&(fn.placeholder=`Search ${e.length} plugins...`);let t=e,n=hn.trim().toLowerCase();if(n&&(t=t.filter(o=>us(o).includes(n))),re!=="favorites"){let o=Kt();if(o.length){let r=new Map(o.map((i,a)=>[i,a]));t=t.slice().sort((i,a)=>{let s=r.has(i.name),l=r.has(a.name);return s!==l?s?-1:1:s?(r.get(i.name)??0)-(r.get(a.name)??0):i.name.localeCompare(a.name)})}}ct.replaceChildren();for(let o of t)ct.appendChild(ds(o));dt&&(dt.hidden=t.length>0,dt.textContent=fs())}function so(e){e.stopPropagation()}function lo(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function po(){document.getElementById(W)?.setAttribute("aria-expanded",oe?"true":"false")}function bs(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function mn(){mo(),hn="",pt="all",re="all",document.getElementById(Re)?.remove(),oe=!1,po()}function hs(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",so),t.addEventListener("pointerup",so),t.addEventListener("click",so);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=yn();let a=document.createElement("h2");a.textContent="Bloom++",r.append(i,a);let s=document.createElement("button");s.type="button",s.className="bloom-icon-btn",s.setAttribute("aria-label","Close"),s.innerHTML=Nr(),s.addEventListener("click",mn),o.append(r,s),n.appendChild(o);let l=document.createElement("div");l.className="bloom-section-head";let c=document.createElement("h3");c.textContent="Plugins";let d=document.createElement("p");d.textContent="Turn Bloom++ features on or off. Sliders icon opens options.",l.append(c,d),n.appendChild(l);let b=document.createElement("div");b.className="bloom-plugin-tabs",n.appendChild(b);let p=document.createElement("div");p.className="bloom-search-bar";let w=document.createElement("input");w.type="search",w.className="bloom-search-input",w.setAttribute("aria-label","Search plugins"),w.placeholder="Search plugins...",w.addEventListener("input",()=>{hn=w.value,fe()});let g=document.createElement("select");g.className="bloom-search-filter",g.setAttribute("aria-label","Filter plugins");for(let Z of Xa){let Vn=document.createElement("option");Vn.value=Z.value,Vn.textContent=Z.label,g.appendChild(Vn)}g.value=pt,g.addEventListener("change",()=>{pt=g.value,fe()}),p.append(w,g),n.appendChild(p);let f=document.createElement("div");f.className="bloom-plugin-list",n.appendChild(f);let m=document.createElement("p");m.className="bloom-tab-empty",m.hidden=!0,n.appendChild(m);let T=document.createElement("div");T.className="bloom-settings-plugin",gt(T,!0);let G=document.createElement("div");G.className="bloom-settings-head";let X=document.createElement("button");X.type="button",X.className="bloom-icon-btn",X.setAttribute("aria-label","Back"),X.innerHTML=Qa(),X.addEventListener("click",mo);let et=document.createElement("div");et.className="bloom-dialog-titles";let Se=document.createElement("h2"),z=document.createElement("p");z.className="bloom-settings-sub",et.append(Se,z);let B=document.createElement("button");B.type="button",B.className="bloom-icon-btn",B.setAttribute("aria-label","Close"),B.innerHTML=Nr(),B.addEventListener("click",mn),G.append(X,et,B);let K=document.createElement("div");return K.className="bloom-plugin-settings",T.append(G,K),t.append(n,T),gn=n,bn=T,ct=f,dn=Se,un=z,_=K,dt=m,fn=w,Or=g,ut=b,fe(),t}function ys(e){e.classList.add("bloom-rail-dock")}function vs(){let e=document.getElementById(W);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&tn(e)?e:null}function xs(){if(document.getElementById(Re)?.remove(),!document.body)return;let e=hs(Re);ys(e),document.body.appendChild(e),oe=!0,mo(),po(),de("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:P,dock:"center",rail:!!vs()})}function go(){let e=document.getElementById(Re);if(e instanceof HTMLElement&&e.isConnected&&bs(e)){mn();return}e?.remove(),xs()}function ws(){let e=document.createElement("button");return e.type="button",e.id=W,e.className="bloom-rail-item",e.setAttribute("aria-controls",Re),e.setAttribute("aria-expanded",oe?"true":"false"),e.innerHTML=`<span class="bloom-rail-mark">${yn()}</span><span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),go()}),e}function Ir(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function Es(e){let t=e.querySelector("img");if(t instanceof HTMLElement){let n=t.getBoundingClientRect();if(n.width>8&&n.height>8)return t}for(let n of e.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}return null}function Ss(e,t){for(let n of e.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||t&&(n===t||n.contains(t)||t.contains(n))||(n.textContent||"").trim().length<2)continue;let r=n.getBoundingClientRect();if(r.width>16&&r.height>8&&r.height<40)return n}return null}function te(e,t,n){let o=`${n}px`;e.style.getPropertyValue(t)!==o&&e.style.setProperty(t,o)}function $r(e,t){if(e.classList.contains("bloom-rail-compact"))return;let n=e.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!e.isConnected||!t.isConnected)return;let o=Es(t),r=getComputedStyle(t),i=Number.parseFloat(r.paddingTop),a=Number.parseFloat(r.paddingBottom);if(Number.isFinite(i)&&te(e,"padding-top",Math.round(i)),Number.isFinite(a)&&te(e,"padding-bottom",Math.round(a)),o){let s=o.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));te(n,"width",l),te(n,"height",Math.max(20,Math.round(s.height)));let c=e.getBoundingClientRect(),d=Math.round(s.left-c.left);d>=0&&d<=40&&te(e,"padding-left",d);let b=Ss(t,o);if(b){let p=b.getBoundingClientRect(),w=n.getBoundingClientRect(),g=Math.round(p.left-w.right);g>=0&&g<=24&&te(e,"gap",g)}}else{let s=Number.parseFloat(r.paddingLeft),l=Number.parseFloat(r.columnGap||r.gap);Number.isFinite(s)&&te(e,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&te(e,"gap",Math.round(l))}}function uo(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Ls(){if(ft?.isConnected&&U){U.observe(ft,{childList:!0});return}fo()}function Cs(e){if(uo(e))return!1;try{if(e.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function Ts(e,t){!t||!e||requestAnimationFrame(()=>{if(e.isConnected){lt=0;return}lt+=1,mt=Date.now()+Math.min(8e3,250*2**Math.min(lt,5))})}function ks(){Pe||Date.now()<mt||(Pe=requestAnimationFrame(()=>{Pe=0,!(Date.now()<mt)&&(document.getElementById(W)?.isConnected||pn())}))}function pn(){if(!document.body)return;U?.disconnect();let e=null,t=!1;try{let n=document.getElementById(W);e=n instanceof HTMLButtonElement?n:ws();let o=at(),r=eo();if(o){let i=to(o),a=i.parentElement;if(uo(i)||a&&uo(a))return;e.isConnected&&e.nextElementSibling===i||(i.before(e),t=!0),Ir(e),$r(e,o)}else r?(e.parentElement!==r&&(r.appendChild(e),t=!0),Ir(e,!0)):e.isConnected&&!tn(e)&&(e.remove(),e=null)}finally{Ts(e,t),Ls(),po()}}function fo(){let e=Mr();!e||!Cs(e)||ft===e&&U||(U?.disconnect(),ft=e,U=new MutationObserver(()=>{document.getElementById(W)?.isConnected||ks()}),U.observe(e,{childList:!0}))}function Ms(){pn(),fo(),st===void 0&&(st=window.setInterval(()=>{let e=document.getElementById(W);if(!(e instanceof HTMLElement)||!e.isConnected)Date.now()>=mt&&pn();else{lt=0;let t=at();t&&$r(e,t)}fo()},Wa))}function As(){st!==void 0&&(clearInterval(st),st=void 0),Pe&&cancelAnimationFrame(Pe),Pe=0,mt=0,lt=0,U?.disconnect(),U=null,ft=null}function Ps(e){an===e&&ne||(ne?.disconnect(),an=e,ne=new MutationObserver(()=>{if(!e.isConnected){ne?.disconnect(),ne=null,an=null;return}Gr(e)}),ne.observe(e,{childList:!0}))}function Gr(e){if(Ps(e),e.querySelector(`#${sn}`))return;let t=document.createElement("button");t.type="button",t.id=sn,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${yn()}<span>Bloom++</span>`,t.addEventListener("pointerdown",lo),t.addEventListener("pointerup",lo),t.addEventListener("click",n=>{lo(n),go()}),e.insertBefore(t,e.firstChild)}function on(){let e=kr();return e?(Gr(e),!0):!1}function Rs(e){Ar(e)&&(queueMicrotask(on),requestAnimationFrame(()=>{on()}),window.setTimeout(on,60),window.setTimeout(on,180))}function Hs(){cn?.abort();let e=new AbortController;cn=e,document.addEventListener("click",Rs,{signal:e.signal})}function Ns(){cn?.abort(),cn=null,ne?.disconnect(),ne=null,an=null}function zr(){Te(),as(()=>{Dr(),Br(),pn(),go()})}var Kr=h({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[v.p],required:!0,hidden:!0,enabledByDefault:!0,settings:Ya,startAt:"HostReady",cleanupSelectors:[`#${Ua}`,`#${W}`,`#${sn}`,`#${Re}`,`#${ln}`,"#bloom-menu-panel"],start(){Dr(),Br(),Ms(),Hs(),nn?.(),nn=Hr(ao),ao(),io=[jt("pluginToggle",()=>{oe&&!Ae&&fe()}),jt("pluginPin",()=>{oe&&!Ae&&fe()}),jt("pluginStar",()=>{oe&&!Ae&&fe()})]},stop(){As(),Ns(),nn?.(),nn=null;for(let e of io)e();io=[],mn(),document.getElementById(W)?.remove(),document.getElementById(sn)?.remove(),document.getElementById(ln)?.remove(),rn=null,Ja=null,gn=null,bn=null,ct=null,dn=null,un=null,_=null,dt=null,fn=null,Or=null,ut=null,oe=!1,Ae=!1},onSettingsChange:ao});var Wr='form[data-type="unified-composer"], form.w-full[data-type]',He=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),vn=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Vr=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Ur=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Is=/stop streaming|stop generating|停止生成|停止输出|停止响应/;function R(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function me(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!R(r)))return r;return null}function Yr(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function k(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=Yr(e);return!!(Is.test(n)||/^stop$/i.test(n))}function ie(){let t=Array.from(document.querySelectorAll(Wr)).find(R);if(t instanceof HTMLElement)return t;let n=me(document,He),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function pe(){let e=Array.from(document.querySelectorAll(He));return e.find(R)??e[0]??null}function bo(){let e=pe();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function Os(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function Jr(e){let t=ie();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!R(n))&&e(n))return n;return null}function xn(){let e=ie(),t=me(e,vn)??me(document,vn);return t&&!k(t)?t:Jr(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!k(n);let r=Yr(n);return/^(send|send prompt|发送)$/i.test(r)&&!k(n)})}function ho(){let e=xn();return!!e&&Os(e)}function yo(){let e=ie(),t=me(e,Vr,!0)??me(document,Vr,!0);if(t)return t;let n=me(e,Ur)??me(document,Ur);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&R(o)&&k(o))return o}return Jr(k)}function Ne(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}var Xr="bloom-host-icon",bt="data-bloom-host-rel",vo="not all",xo=0,Zr=0,Bs=400;function Qr(e){xo+=1;try{e()}finally{xo-=1}}function wn(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function Ie(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function ei(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function Ds(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function _s(e,t){if(e.lastElementChild===t)return;let n=Date.now();n-Zr<Bs||(Zr=n,e.appendChild(t))}function qs(e,t){for(let n of e.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===t||wn(n)&&(n.getAttribute(bt)||n.setAttribute(bt,n.rel),n.media!==vo&&(n.media=vo),n.rel!==Xr&&(n.rel=Xr))}function Fs(e){for(let t of e.querySelectorAll(`link[${bt}]`)){if(!(t instanceof HTMLLinkElement))continue;let n=t.getAttribute(bt);n&&(t.rel=n),t.removeAttribute(bt),t.media===vo&&t.removeAttribute("media")}}function wo(e,t){let{head:n}=document;!n||!t||Qr(()=>{qs(n,e);let o=ei(e),{type:r,sizes:i}=Ds(t);o?_s(n,o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function ti(e,t){let{head:n}=document;n&&Qr(()=>{ei(e)?.remove(),Fs(n)})}function ni(e,t){let{head:n}=document;if(!n)return null;let o=0,r=new MutationObserver(i=>{if(xo)return;let a=!1,s;for(let l of i){l.type==="attributes"&&l.target instanceof HTMLLinkElement&&(l.target.id===e?a=!0:wn(l.target)&&(a=!0,Ie(l.target.href)&&(s=l.target.href)));for(let c of l.removedNodes)wn(c)&&c.id===e&&(a=!0);for(let c of l.addedNodes)wn(c)&&c.id!==e&&(a=!0,Ie(c.href)&&(s=c.href))}a&&(o||(o=requestAnimationFrame(()=>{o=0,t(s)})))});return r.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),r}var oi=/\/c\/([a-zA-Z0-9_-]{8,})/i;function H(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=c=>{let d=n.indexOf(c);return d>=0&&n[d+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,d)=>{try{return document.querySelector(c)?.getAttribute(d)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function Oe(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function ht(e){if(!e)return"";try{return(/^https?:/i.test(e)?new URL(e,location.origin).pathname:e).match(oi)?.[1]??""}catch{return e.match(oi)?.[1]??""}}function En(){let e=ht(location.pathname);if(e)return e;let n=H().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return""}function js(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!R(t))&&(k(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function $s(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&R(e))}function Gs(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&R(e))}function zs(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function ae(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function Y(){if(yo()||js())return!0;let e=xn();return e&&R(e)&&!k(e)?!1:!!($s()||Gs()||zs())}var Ks=["original","badge","dot","hole","bg"],ai=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge",default:!0},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],si={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Sn="#FCFCFC",Vs="#111111",ri="#111111",Us="#ffffff",Ws="#212121",Ys="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Js={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Ln=32,ii=64;function li(e){return typeof e=="string"&&Ks.includes(e)}function Xs(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function Cn(e){let t=document.createElement("canvas");t.width=Ln,t.height=Ln;let n=t.getContext("2d");return n?(n.scale(Ln/ii,Ln/ii),e(n),t.toDataURL("image/png")):""}function Zs(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function Tn(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(Ys);n&&(e.strokeStyle=Vs,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function Qs(e,t,n){let o=si[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=ri,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=ri,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=Us,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function yt(e,t){if(e==="original")return t==="wait"?Cn(o=>Tn(o,Sn)):Xs(Js[t]);let n=t==="wait"?void 0:si[t];return Cn(e==="hole"?o=>Tn(o,n??Sn):e==="bg"?o=>{o.fillStyle=n??Ws,Zs(o,0,0,64,64,14),o.fill(),Tn(o,Sn,!1)}:o=>{Tn(o,Sn),t!=="wait"&&Qs(o,t,e==="dot"?"dot":"badge")})}function ci(e){return{wait:yt(e,"wait"),rotate:yt(e,"rotate"),done:yt(e,"done"),ready:yt(e,"ready"),error:yt(e,"error")}}var el=new y("ChatStateFavicons"),be="bloom-chat-state-favicon",mi=x({style:{type:3,description:"Favicon overlay",options:ai}}),De="",Mn={wait:"",rotate:"",done:"",ready:"",error:""},An="wait",xt=!1,J=!1,N=null,wt="",Et="",St=!0,vt=null,_e=0,Be,kn=null,ge=null,Eo=null,Lt=!1,di=new WeakSet,tl=400;function nl(){let e=mi.store.style;return li(e)?e:"badge"}function ol(){let t=document.querySelector(`link[rel~="icon"]:not(#${be})`)?.href;return Ie(t)?t:Ie(De)?De:""}function I(e){if(An===e){let t=document.getElementById(be);if(t instanceof HTMLLinkElement&&t.getAttribute("href")===Mn[e])return}An=e,wo(be,Mn[e])}function ui(){Mn=ci(nl()),I(An)}function rl(){let e=H(),t=e?Oe(e):Oe("");return Y()?(!wt&&t&&(wt=t),wt||t):(wt="",t)}function pi(){xt=!1,J=!1,N=null,wt=""}function il(e){Et=e,pi(),St=!1,I("wait")}function gi(){if(!Lt)return;let e=H()||location.pathname;if(Et&&e&&Et!==e){il(e);return}e&&(Et=e);let t=rl(),n=Y(),o=bo(),r=ho();if(ae()&&!n){I("error"),xt=!1,J=!1,N=null;return}if(n){xt=!0,J=!1,N=t,I("rotate");return}if(xt){let i=!!N&&!!t&&N===t;if(xt=!1,i){J=!0,N=t,I("done");return}J=!1,N=null}if(J)if(!!(N&&t&&N!==t))J=!1,N=null;else if(o){I("done");return}else if(St){J=!1,I("ready");return}else{J=!1,I("wait");return}N=null,I(o?"wait":St?"ready":"wait")}function bi(){let e=ie();if(!(ge&&Eo===e&&e.isConnected)){if(ge?.disconnect(),Eo=e,!e||e===document.body){ge=null;return}ge=new MutationObserver(()=>Pn()),ge.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function Pn(){!Lt||_e||(_e=requestAnimationFrame(()=>{_e=0,Lt&&(hi(),bi(),gi())}))}function fi(){St=!0,Pn()}function hi(){let e=pe();!e||di.has(e)||(di.add(e),e.addEventListener("input",fi,{passive:!0}),e.addEventListener("compositionend",fi,{passive:!0}))}var yi=h({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:mi,startAt:"DOMContentLoaded",cleanupSelectors:[`#${be}`],start(){Lt=!0,De=ol()||De,ui(),kn?.disconnect(),kn=ni(be,e=>{Ie(e)&&(De=e),wo(be,Mn[An])}),vt?.abort(),vt=new AbortController,window.addEventListener("popstate",Pn,{signal:vt.signal}),hi(),bi(),Be!==void 0&&clearInterval(Be),Be=setInterval(Pn,tl),gi(),el.debug("favicon watch started")},stop(){Lt=!1,_e&&cancelAnimationFrame(_e),_e=0,Be!==void 0&&(clearInterval(Be),Be=void 0),vt?.abort(),vt=null,ge?.disconnect(),ge=null,Eo=null,kn?.disconnect(),kn=null,pi(),Et="",St=!0,ti(be,De)},onSettingsChange:ui});var vi=`.bloom-ih-hud {
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
`;var xi=new y("InputHistory"),So=/\u200B/g,wi=10,Ei=500,Si=100,sl=8,ll=120,cl=2e3,Rn=10,Hn=x({maxEntries:{type:4,description:"Max stored prompts",min:wi,max:Ei,default:Si},history:{type:5,description:"Stored prompts",render:Ll},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Lo=new Map,S=0,Co="",q=!1,Tt=!1,Mo=0,Ct=null,To,Ao=null,Li=!0;function O(){let e=Hn.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ci(e){let t=tr(Number(Hn.store.maxEntries??Si),wi,Ei);return e.length>t?e.slice(e.length-t):e}function Nn(e){Hn.store.entries=Ci(e)}function dl(e){return e.replaceAll(So,"").replace(/\n$/,"").trim()}function ko(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(He);return n instanceof HTMLElement?n:pe()}function ul(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!Ne(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(So,"").trim().length===0,last:i.toString().replaceAll(So,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Ti(e,t){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch(i){xi.debug("pm caret failed:",i)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function ki(e){clearTimeout(To),To=setTimeout(()=>{if(e!==Mo)return;Tt=!1;let t=Ao;t&&Ti(t,Li)},ll)}function Mi(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),Tt=!0,Ao=e,Li=n;let i=++Mo;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(a){xi.debug("insertText failed:",a),e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),Ti(e,n),ki(i)}function fl(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function qe(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function ml(){document.querySelector(".bloom-ih-hud")?.remove()}function pl(e,t){let n=fl();n.textContent=e;let o=(t.closest("form")??ie()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-sl)}px`,n.classList.add("bloom-ih-hud-on")}function Po(e){let t=dl(e);if(!t)return;let n=Date.now(),o=Lo.get(t);if(o&&n-o<cl)return;Lo.set(t,n);let r=O().filter(i=>i!==t);r.push(t),Nn(r),S=O().length,q=!1,qe()}function gl(e,t){let n=O();if(!n.length&&e)return;S>=n.length&&(Co=Ne(t),S=n.length);let o=e?S-1:S+1;o<0||o>n.length||(S=o,q=!0,Mi(t,o===n.length?Co:n[o],e),o<n.length?pl(`${o+1} / ${n.length}`,t):qe())}function bl(e){q=!1,qe(),Mi(e,Co,!1),S=O().length}function hl(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=ko(e.target)??ko(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&q&&!e.altKey&&!e.shiftKey){bl(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){Po(Ne(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=O();if(!o){let i=ul(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||S<=0)||!n&&S>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),gl(n,t))}function yl(e){if(ko(e.target)){if(Tt){ki(Mo);return}q&&(q=!1,qe(),S=O().length)}}function vl(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(He);n instanceof HTMLElement&&Po(Ne(n))}function xl(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(vn);if(!n||!(n instanceof HTMLElement)||k(n))return;let o=pe();o&&Po(Ne(o))}function wl(e){if(!(!q||Tt)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}q=!1,qe()}}function El(){if(Ct)return;Ct=new AbortController;let{signal:e}=Ct,t={capture:!0,signal:e};window.addEventListener("keydown",hl,t),window.addEventListener("input",yl,t),window.addEventListener("submit",vl,t),window.addEventListener("click",xl,t),window.addEventListener("pointerdown",wl,t)}function Sl(e){let t=O().slice();t.splice(e,1),Nn(t),S>t.length&&(S=t.length)}function Ll(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=O().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(m=>m.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/Rn));n>=l&&(n=l-1);let c=s.slice(n*Rn,n*Rn+Rn);e.replaceChildren();let d=document.createElement("input");if(d.className="bloom-ih-search",d.type="search",d.placeholder="Search history",d.autocomplete="off",d.value=t,d.addEventListener("input",()=>{t=d.value,n=0,r()}),e.appendChild(d),c.length){let m=document.createElement("div");m.className="bloom-ih-list",c.forEach((T,G)=>{let X=i.indexOf(T),et=O().length-1-X,Se=document.createElement("div");Se.className="bloom-ih-item";let z=document.createElement("button");z.type="button",z.className=`bloom-ih-body${o===G?"":" bloom-ih-clamp"}`,z.textContent=T,z.addEventListener("click",()=>{o=o===G?-1:G,r()});let B=document.createElement("div");B.className="bloom-ih-actions";let K=document.createElement("button");K.type="button",K.title="Copy",K.textContent="C",K.addEventListener("click",()=>{or(T)});let Z=document.createElement("button");Z.type="button",Z.title="Delete",Z.textContent="\xD7",Z.addEventListener("click",()=>{Sl(et),r()}),B.append(K,Z),Se.append(z,B),m.appendChild(Se)}),e.appendChild(m)}else{let m=document.createElement("p");m.className="bloom-ih-empty",m.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(m)}let b=document.createElement("div");b.className="bloom-ih-pager";let p=document.createElement("button");p.type="button",p.className="bloom-ih-btn",p.textContent="Prev",p.disabled=n<=0,p.addEventListener("click",()=>{n-=1,r()});let w=document.createElement("span");w.textContent=`${n+1} / ${l}`;let g=document.createElement("button");g.type="button",g.className="bloom-ih-btn",g.textContent="Next",g.disabled=n+1>=l,g.addEventListener("click",()=>{n+=1,r()});let f=document.createElement("button");f.type="button",f.className="bloom-ih-clear",f.textContent="Clear all",f.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Nn([]),S=0,r())}),b.append(p,w,g,f),e.appendChild(b)};return r(),()=>{e.replaceChildren()}}var Ai=h({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:Hn,startAt:"HostReady",managedStyle:"inputHistory",start(){E("inputHistory",vi),S=O().length,q=!1,El()},stop(){Ct?.abort(),Ct=null,qe(),ml(),Lo.clear(),clearTimeout(To),Tt=!1,Ao=null,q=!1},onSettingsChange(){let e=O(),t=Ci(e);t.length!==e.length&&Nn(t),S>t.length&&(S=t.length)}});var Ro="noShareLink",Cl=['button[data-testid="share-chat-button"]'],Tl=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],Ho=x({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Pi(e){return`${e.join(",")}{display:none!important}`}function Ri(){let e=[];if(Ho.store.hideShareChat!==!1&&e.push(Pi(Cl)),Ho.store.hideShareProject!==!1&&e.push(Pi(Tl)),!e.length){C(Ro);return}E(Ro,e.join(`
`))}var Hi=h({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Ho,start:Ri,onSettingsChange:Ri,stop(){C(Ro)}});var Oi="noDictation",kl=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]'],Ml=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Bi=x({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Ni(e){return`${e.join(",")}{display:none!important}`}function Ii(){let e=[Ni(kl)];Bi.store.hideDictationSettings!==!1&&e.push(Ni(Ml)),E(Oi,e.join(`
`))}var Di=h({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Bi,start:Ii,onSettingsChange:Ii,stop(){C(Oi)}});var No="noSidebarIdentity",On=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Fi=On.flatMap(e=>[`${e} .min-w-0 > .truncate`,`${e} .min-w-0.flex-1 .truncate`]),Al=On.flatMap(e=>[`${e} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),Pl=[...Fi,...Al],Rl=On.map(e=>`${e} a[href^="mailto:"]`),Hl=On.flatMap(e=>[`${e} .min-w-0 > :not(.truncate)`,`${e} .min-w-0 > :not(.truncate) *`,`${e} .min-w-0 .text-xs`,`${e} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${e} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${e} .text-xs:not(.truncate)`,`${e} .text-token-text-secondary:not(.truncate)`,`${e} .text-token-text-tertiary:not(.truncate)`,`${e} .min-w-0 ~ *`,`${e} .min-w-0 ~ * *`,`${e} > .text-xs`,`${e} > .text-token-text-secondary`,`${e} > .text-token-text-tertiary`]),In=x({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0}});function _i(e){return`${e.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Nl(){return`${Hl.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function qi(){let e=In.store.hideUsername!==!1,t=In.store.hideEmail!==!1,n=e&&In.store.enlargePlan!==!1,o=[];if(e&&o.push(_i(n?Fi:Pl)),t&&o.push(_i(Rl)),n&&o.push(Nl()),!o.length){C(No);return}E(No,o.join(`
`))}var ji=h({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:In,start:qi,onSettingsChange:qi,stop(){C(No)}});var $i=`#bloom-rt-host {
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
`;var Ki=new y("RecentTopics"),$e="bloom-rt-host",Vi="home",Ui=/^\/c\/([a-z0-9_-]{8,})/i,Ol=/\/c\/([a-z0-9_-]{8,})/i,Wi=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Bl=new Set(["Backquote","IntlBackslash"]),Dl=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),_l=140,ql=[3,4,5,6,7,8,9,10,11,12].map(e=>({label:String(e),value:String(e),default:e===5})),L=x({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:ql},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),Bn=null,Io=null,M=!1,Ht=!1,kt=!1,F=0,he="",Fe=null,Mt=null,je;function Fl(){let e=Number(L.store.maxRecent??5);return Number.isFinite(e)&&e>=3&&e<=12?e:5}function At(){let e=L.plain.visits;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Oo(){let e=L.plain.titles;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Yi(){let e=L.plain.previews;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Bo(){let e=L.plain.projects;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function _n(e){let t=Fl();return e.length>t?e.slice(0,t):e}function j(e){return e===Vi}function Pt(e,t=_l){let n=e.replace(/\s+/g," ").trim();return n.length<=t?n:`${n.slice(0,t-1)}\u2026`}function Do(e){if(!e)return"";try{return new URL(e,location.origin).pathname.match(Ui)?.[1]??""}catch{return e.match(Ol)?.[1]??""}}function ye(){let e=(location.pathname||"/").match(Ui);if(e?.[1])return e[1];let n=H().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return Vi}function _o(e){if(j(e))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${e}"]`);for(let o of n){if(Do(o.getAttribute("href")||"")!==e)continue;let r=Pt(o.textContent||"",80);if(r)return r}}catch{}let t=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return ye()===e&&t&&!/^ChatGPT$/i.test(t)?Pt(t,80):""}function jl(e){return j(e)?"New chat":Oo()[e]||_o(e)||"Chat"}function $l(e){return Bo()[e]||""}function Gl(e){return Yi()[e]||{}}function Ji(e,t){if(!e||j(e)||!t)return;let n=Oo();n[e]!==t&&(n[e]=t,L.store.titles=n)}function zl(e,t){if(!e||j(e)||!t)return;let n=Bo();n[e]!==t&&(n[e]=t,L.store.projects=n)}function Kl(e,t){if(!e||j(e)||!t.user&&!t.assistant)return;let n=Yi(),o=n[e]||{},r={user:t.user||o.user,assistant:t.assistant||o.assistant};o.user===r.user&&o.assistant===r.assistant||(n[e]=r,L.store.previews=n)}function qo(e){if(!e||j(e)&&L.store.includeHome===!1)return;let t=At().filter(n=>n!==e);t.unshift(e),L.store.visits=_n(t)}function qn(){let e=L.store.includeHome!==!1;return _n(At().filter(n=>e||!j(n))).map(n=>({id:n,title:jl(n),project:$l(n),preview:Gl(n)}))}function Gi(e){try{let t=document.querySelectorAll(`[data-message-author-role="${e}"]`),n=t[t.length-1];if(!(n instanceof HTMLElement))return"";let o=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||o.push(a)}let r=o.length?o.join(" "):n.textContent||"";return Pt(r)}catch{return""}}function Rt(e){if(!e||j(e)||e!==ye())return;let t=_o(e);t&&Ji(e,t);let n=Gi("user"),o=Gi("assistant");Kl(e,{user:n,assistant:o});let r=Zi(e);if(r){let i=Xi(r);i&&zl(e,i)}}function Fo(){let e=Oo(),t=Bo(),n=[],o=new Set,r=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${$e}, #bloom-root, #bloom-sidebar-panel`))continue;let d=Do(c.getAttribute("href")||"");if(!d||o.has(d))continue;o.add(d),n.push(d);let b=Pt(c.textContent||"",80);b&&!Wi.test(b)&&e[d]!==b&&(e[d]=b,r=!0);let p=Xi(c);p&&t[d]!==p&&(t[d]=p,i=!0)}}catch{}r&&(L.store.titles=e),i&&(L.store.projects=t);let a=At(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(L.store.visits=_n([...a,...l]))}function Xi(e){let t=e.parentElement;for(let n=0;n<10&&t;n++){if(t.id==="bloom-rt-host"||t.id==="bloom-root"){t=t.parentElement;continue}let o=t.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),r=Pt((o instanceof HTMLElement?o.textContent:"")||"",60);if(r&&!Wi.test(r)&&!/^20\d{2}/.test(r)&&r!==e.textContent?.trim()&&t.querySelector('a[href^="/c/"]'))return r;t=t.parentElement}return""}function Zi(e){if(j(e)){let t=document.querySelector('[data-testid="create-new-chat-button"]');return t instanceof HTMLAnchorElement?t:document.querySelector('a[href="/"]')}try{for(let t of document.querySelectorAll(`a[href*="/c/${e}"]`))if(Do(t.getAttribute("href")||"")===e)return t}catch{}return null}function Vl(e){let t=Zi(e);if(t){t.click();return}if(j(e)){location.assign("/");return}location.assign(`/c/${e}`)}function Ul(){let e=ye();he&&he!==e&&Rt(he),he=e,qo(e),Fo();let t=_o(e);t&&Ji(e,t),Rt(e)}function Dn(){je===void 0&&(je=window.setTimeout(()=>{je=void 0,Ul()},120))}function Wl(){Fe||(Fe=history.pushState.bind(history),Mt=history.replaceState.bind(history),history.pushState=function(...t){let n=Fe(...t);return Dn(),n},history.replaceState=function(...t){let n=Mt(...t);return Dn(),n})}function Yl(){Fe&&(history.pushState=Fe),Mt&&(history.replaceState=Mt),Fe=null,Mt=null}function Jl(e){return Bl.has(e.code)||e.keyCode===192?!0:Dl.has(e.key)}function Qi(e){return e.key==="Control"||e.code==="ControlLeft"||e.code==="ControlRight"}function Xl(e,t){Ht=t,Fo(),Rt(ye()),M=!0,F=0;try{let n=ye();qo(n);let o=qn();o.length>1&&(F=e?o.length-1:1)}catch(n){Ki.error("Failed to open switcher:",n)}Nt()}function zi(e){let{length:t}=qn();t&&(F=(F+(e?-1:1)+t)%t,Nt())}function jo(){if(!M)return;let e=qn()[F];M=!1,Ht=!1,Nt(),e&&Vl(e.id)}function ea(){M&&(M=!1,Ht=!1,Nt())}function Zl(e){if(Qi(e)){kt=!0;return}if((e.ctrlKey||kt)&&!e.altKey&&!e.metaKey&&Jl(e)&&!e.repeat){e.preventDefault(),e.stopImmediatePropagation();try{M?zi(e.shiftKey):Xl(e.shiftKey,!0)}catch(n){Ki.error("Hotkey failed:",n)}return}if(M){if(e.key==="Escape"){e.preventDefault(),ea();return}if(e.key==="Enter"&&!e.shiftKey){e.preventDefault(),jo();return}e.key==="Tab"&&(e.ctrlKey||kt)&&(e.preventDefault(),zi(e.shiftKey))}}function Ql(e){Qi(e)&&(kt=!1,M&&Ht&&jo())}function ec(e){let t=e.target instanceof Element?e.target:null;!t||!t.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(Dn)}function tc(e){!M||(e.target instanceof Element?e.target:null)?.closest(`#${$e}`)||ea()}function nc(){document.visibilityState==="hidden"&&Rt(ye())}function oc(){if(!document.body)return null;let e=document.getElementById($e);if(e instanceof HTMLElement)return Io=e,e;e=document.createElement("div"),e.id=$e;let t=document.createElement("div");return t.className="bloom-rt-panel",t.setAttribute("role","listbox"),t.setAttribute("aria-label","Recent conversations"),t.dataset.visible="false",t.addEventListener("click",n=>n.stopPropagation()),e.append(t),document.body.append(e),Io=e,e}function Nt(){let e=oc();if(!e)return;let t=e.querySelector(".bloom-rt-panel");if(!t)return;if(!M){t.dataset.visible="false",t.replaceChildren();return}let n=qn();if(!n.length){t.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",t.replaceChildren(i);return}F>=n.length&&(F=0);let o=document.createElement("div");o.className="bloom-rt-list",o.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===F?"true":"false",s.setAttribute("aria-selected",a===F?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="user",d.textContent=i.preview.user,c.append(d)}if(i.preview.assistant){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="assistant",d.textContent=i.preview.assistant,c.append(d)}s.append(c)}s.addEventListener("click",()=>{F=a,jo()}),o.append(s)}),t.replaceChildren(o),t.dataset.visible="true",t.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function rc(){document.getElementById($e)?.remove(),Io=null}var ta=h({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${$e}`],settings:L,start(){E("recentTopics",$i),he=ye(),qo(he),Fo(),Rt(he),Wl(),Bn=new AbortController;let{signal:e}=Bn;window.addEventListener("keydown",Zl,{capture:!0,signal:e}),window.addEventListener("keyup",Ql,{capture:!0,signal:e}),window.addEventListener("popstate",Dn,{signal:e}),document.addEventListener("click",ec,{capture:!0,signal:e}),document.addEventListener("click",tc,{signal:e}),document.addEventListener("visibilitychange",nc,{signal:e})},stop(){Bn?.abort(),Bn=null,je!==void 0&&(clearTimeout(je),je=void 0),Yl(),M=!1,Ht=!1,kt=!1,rc()},onSettingsChange(){let e=_n(At());e.length!==At().length&&(L.store.visits=e),M&&Nt()}});var $o="cleaner",ic=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],ac=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],sc=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],lc=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],cc=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]'],dc=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],ve=x({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function Ge(e){return`${e.join(",")}{display:none!important}`}function na(){let e=[];if(ve.store.hideDownloadApps!==!1&&e.push(Ge(ic)),ve.store.hideDisclaimer!==!1&&e.push(Ge(ac)),ve.store.hideUpgrade!==!1&&e.push(Ge(sc)),ve.store.hideLockedModels!==!1&&e.push(Ge(lc)),ve.store.hideHomePromo!==!1&&e.push(Ge(cc)),ve.store.hideAds!==!1&&e.push(Ge(dc)),!e.length){C($o);return}E($o,e.join(`
`))}var oa=h({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:ve,start:na,onSettingsChange:na,stop(){C($o)}});var Fn=new y("ResponseNotification"),uc=400,fc=3,We=x({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:vc},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Go=!1,Ee=!1,xe=0,we="",Ue=!1,It="",ze,Ke=null,Ve=null;function ra(){return Oe(H())}function mc(){return document.visibilityState==="hidden"||document.hidden}function pc(){return We.store.onlyWhenHidden===!1?!0:mc()}function gc(){let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function ia(){try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!Ve||Ve.state==="closed")&&(Ve=new e);let t=Ve,n=t.currentTime,o=[523.25,659.25];for(let r=0;r<o.length;r++){let i=t.createOscillator(),a=t.createGain();i.type="sine",i.frequency.value=o[r];let s=n+r*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(t.destination),i.start(s),i.stop(s+.24)}t.resume?.()}catch(e){Fn.debug("chime failed",e)}}function bc(e){try{let t=new Audio(e);t.volume=.7,t.play()}catch(t){Fn.debug("custom sound failed",t),ia()}}function aa(){let e=String(We.store.soundUrl||"").trim();e?bc(e):ia()}function hc(){let e="Bloom++",t=`${gc()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:e,text:t,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(e,{body:t,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){Fn.debug("notification failed",n)}}function yc(){pc()&&(We.store.sound!==!1&&aa(),We.store.browserNotification!==!1&&hc())}function vc(e){let t=document.createElement("button");return t.type="button",t.textContent="Play",t.addEventListener("click",()=>aa()),e.appendChild(t),()=>{t.remove()}}function xc(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest("button");n instanceof HTMLElement&&k(n)&&(Ue=!0)}function wc(){if(!Go)return;let e=H()||location.pathname;if(It&&e&&It!==e){Ee=!1,xe=0,we="",Ue=!1,It=e;return}It=e;let t=Y(),n=ra();if(t){Ee=!0,xe=0,we=n;return}if(!Ee||(xe+=1,xe<fc))return;let o=!!we&&we===n,r=Ue,i=ae();Ee=!1,xe=0,Ue=!1,we="",!(!o||r||i)&&yc()}var sa=h({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:We,start(){Go=!0,Ee=Y(),xe=0,we=Ee?ra():"",Ue=!1,It=H()||location.pathname,Ke?.abort(),Ke=new AbortController,document.addEventListener("click",xc,{capture:!0,signal:Ke.signal}),ze!==void 0&&clearInterval(ze),ze=setInterval(wc,uc),We.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:Ke.signal}),Fn.debug("watch started")},stop(){Go=!1,ze!==void 0&&(clearInterval(ze),ze=void 0),Ke?.abort(),Ke=null,Ee=!1,xe=0,we="",Ue=!1;try{Ve?.close()}catch{}Ve=null}});var la=`.bloom-cls {
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
`;var ma=new y("ChatListStatus"),ca="chatListStatus",Gn="bloom-cls",Sc="bloom-cls",Lc=500,Cc=1200*1e3,Tc="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",le=new Map,Dt=new Set,ce=!1,Je="",Ot=!1,Ye,Ze=0,se=null,zo=null,Xe=null,Qe=null,jn=null,Bt=null,_t=!1;function $n(){return Date.now()}function kc(){return typeof unsafeWindow<"u"?unsafeWindow:window}function pa(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function Mc(e,t){return!(t!=="POST"||!/\/backend-api\/(?:f\/)?conversation(?:\/|\?|$)/i.test(e)||/\/backend-api\/conversations(?:\/|\?|$)/i.test(e))}function Ac(e){try{if(typeof e=="string")return e;if(e instanceof URL)return e.href;if(typeof Request<"u"&&e instanceof Request)return e.url}catch{}return String(e)}function ga(e){return e?e.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function Pc(e){return typeof e=="string"?ga(e):""}function $(e,t,n,o=!0){if(!(!e||!ce)){if(t==="idle")le.delete(e);else{let r=le.get(e);r&&r.kind===t&&n!=="net"?r.at=$n():le.set(e,{kind:t,at:$n(),source:n})}(t==="streaming"||t==="error")&&Dt.delete(e),o&&Rc({v:1,id:e,kind:t,at:$n()}),zn()}}function Rc(e){try{Xe?.postMessage(e)}catch{}}function Hc(e){let t=e.data;!t||t.v!==1||!t.id||t.kind!=="streaming"&&t.kind!=="done"&&t.kind!=="error"&&t.kind!=="idle"||$(t.id,t.kind,"bc",!1)}function Nc(){let e=$n();for(let[t,n]of le)n.kind==="streaming"&&e-n.at>Cc&&le.delete(t)}function Ic(){let e=pa();if(!e)return[];let t=[],n=new Set;try{for(let o of e.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(o.closest(Tc))continue;let r=ht(o.getAttribute("href")||"");!r||n.has(r)||(n.add(r),t.push(o))}}catch{}return t}function da(e){let t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),e==="streaming")t.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("cx","12"),o.setAttribute("cy","12"),o.setAttribute("r","9"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","2"),t.appendChild(o)}return t.appendChild(n),t}function ua(e){let t=e.querySelector(`:scope > .${Gn}`);return t||null}function Oc(){if(!ce)return;Nc();let e=En();e&&Dt.add(e);let t=Ic();se?.disconnect();try{for(let n of t){let o=ht(n.getAttribute("href")||""),i=(o?le.get(o):void 0)?.kind??"idle";if(i==="done"&&(Dt.has(o)||o===e)&&(i="idle"),i==="idle"||i===void 0){ua(n)?.remove();continue}let a=ua(n);a||(a=document.createElement("span"),a.className=Gn,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(da("streaming")):i==="error"&&a.appendChild(da("error")))}}catch(n){ma.debug("paint failed",n)}ba()}function zn(){!ce||Ze||(Ze=requestAnimationFrame(()=>{Ze=0,ce&&Oc()}))}function ba(){let e=pa();if(!(se&&zo===e&&e?.isConnected)){if(se?.disconnect(),zo=e,!e){se=null;return}se=new MutationObserver(()=>zn()),se.observe(e,{childList:!0,subtree:!0})}}async function Bc(e,t){let n=t,o=!e.ok,r=e.body;if(!r){n&&$(n,o?"error":"done","net");return}let i=r.getReader(),a=new TextDecoder,s="";try{for(;ce;){let{done:l,value:c}=await i.read();if(l)break;if(s+=a.decode(c,{stream:!0}),!n){let d=ga(s);d&&(n=d,_t=!1,$(n,"streaming","net"))}/\[DONE\]/.test(s)||/"error"\s*:\s*\{/.test(s)?(/"error"\s*:\s*\{/.test(s)&&(o=!0),s=s.slice(-64)):s.length>8192&&(s=s.slice(-2048))}}catch{o=!0}n&&$(n,o?"error":"done","net")}function Dc(e,t,n){let o=Ac(t),r=(n?.method||(typeof Request<"u"&&t instanceof Request?t.method:"GET")||"GET").toUpperCase(),i=Mc(o,r),a="";return i&&(a=Pc(n?.body)||ht(o)||En(),a?$(a,"streaming","net"):_t=!0),e(t,n).then(s=>{if(!i)return s;try{let l=s.clone();Bc(l,a)}catch{a&&$(a,s.ok?"done":"error","net")}return s},s=>{throw i&&a&&$(a,"error","net"),s})}function _c(){if(Qe)return;let e=kc();Bt=e,Qe=e.fetch.bind(e);let t=(n,o)=>Dc(Qe,n,o);jn=t,e.fetch=t}function qc(){!Qe||!Bt||(jn&&Bt.fetch===jn&&(Bt.fetch=Qe),Qe=null,jn=null,Bt=null)}function fa(){if(!ce)return;let e=En();if(e&&Dt.add(e),Je&&e&&Je!==e){let n=le.get(Je);n?.kind==="streaming"&&n.source==="local"&&$(Je,ae()?"error":"done","local"),Ot=!1}if(Je=e,Y()){Ot=!0,e&&$(e,"streaming","local"),zn();return}Ot&&(Ot=!1,e&&$(e,ae()?"error":"done","local")),_t=!1,zn()}var ha=h({name:"ChatListStatus",description:"Show reply status on Recents: spinner while streaming, blue dot when done in another chat, error mark on failure.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Gn}`],start(){ce=!0,E(ca,la);try{Xe=new BroadcastChannel(Sc)}catch{Xe=null}Xe?.addEventListener("message",Hc),_c(),ba(),Ye!==void 0&&clearInterval(Ye),Ye=setInterval(fa,Lc),fa(),ma.debug("sidebar status watch started")},stop(){ce=!1,Ze&&cancelAnimationFrame(Ze),Ze=0,Ye!==void 0&&(clearInterval(Ye),Ye=void 0),se?.disconnect(),se=null,zo=null,qc();try{Xe?.close()}catch{}Xe=null,le.clear(),Dt.clear(),_t=!1,Ot=!1,Je="",document.querySelectorAll(`.${Gn}`).forEach(e=>e.remove()),C(ca)}});var qt=new y("Bloom"),ya=!1,Fc=Date.now(),jc=[Kr,yi,Ai,Hi,Di,ji,ta,oa,sa,ha];function Kn(e){return new Promise(t=>setTimeout(t,e))}function $c(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var xa=8e3,va=300,Gc=250;async function zc(){if(ue())return await Kn(va),!0;for(;Date.now()-Fc<xa;)if(await Kn(Gc),ue())return await Kn(va),!0;return ue()||Zn()}function Ko(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function Kc(){if(Ko())return!0;let e=Date.now()+xa;for(;Date.now()<e;)if(await Kn(100),Ko())return!0;return Ko()}function Vc(){try{GM_registerMenuCommand?.("Bloom++ settings",zr)}catch{}}function Uc(){Yt(()=>{ot("HostShell"),qt.info("host shell",P)}),Jt(()=>{qt.info("idle ready",P)}),Xt(()=>{Yo(),ot("HostReady"),qt.info("chrome ready",P)})}async function Vo(){await rr()}async function Uo(){if(ya)return;ya=!0;for(let n of jc)try{mr(n)}catch(o){qt.error("register failed",n.name,o)}br(),ot("Init"),Vc(),Uc();let e=()=>ot("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await $c(),Kc().then(n=>{n&&Zt()}),!await zc()){qt.warn("late islands not detected; starting default plugins",P),Te(),Qt();return}await Er()}var wa=typeof unsafeWindow<"u"?unsafeWindow:window,Wc=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||Wc){let e=wa.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",P);try{Object.defineProperty(wa,"Bloom",{value:Wo,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}Vo().then(()=>Uo()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
