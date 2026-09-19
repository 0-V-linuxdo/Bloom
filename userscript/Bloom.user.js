// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260919] v1.4.26
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

/* Bloom++ [20260919] v1.4.26. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var hs=Object.defineProperty;var bs=(e,t)=>{for(var n in t)hs(e,n,{get:t[n],enumerable:!0})};var xr={};bs(xr,{REPO_URL:()=>Yr,Settings:()=>u,VERSION:()=>P,hasLateIslands:()=>me,init:()=>vr,initSettings:()=>yr,isDocumentInteractive:()=>Jr,plugins:()=>$,requestChromeReady:()=>yn,requestIdleReady:()=>Re,requestShellReady:()=>bn,whenChromeReady:()=>hn,whenIdleReady:()=>gn,whenShellReady:()=>pn});var ee=new Map,on=!1;function ys(){return document.getElementById("bloom-root")?.shadowRoot??null}function vs(){return document.head??null}function Me(){let e=ys();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=xs()}function po(e,t){if(!on)return;let n=vs();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),Me();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,Me();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,Me()}function x(e,t){let n=ee.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},ee.set(e,n)),on&&po(e,n)}function wr(){on=!0;for(let[e,t]of ee)po(e,t);return Me(),!0}function Er(e){let t=ee.get(e);t&&(t.disabled=!1,on&&po(e,t))}function Sr(e){let t=ee.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),Me())}function w(e){let t=ee.get(e);t&&(t.el?.remove(),ee.delete(e),Me())}function xs(){return Array.from(ee.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var E=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function g(e){return e}var go=new Map;function rn(e,t){let n=go.get(e);return n||(n=new Set,go.set(e,n)),n.add(t),()=>n.delete(t)}function fe(e,t){let n=go.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var ws="bloompp";function Lr(){return new Promise((e,t)=>{let n=indexedDB.open(ws,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function Tr(e){try{let t=await Lr();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function Cr(e,t){try{let n=await Lr();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function ft(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function an(e,t,n){return Math.min(n,Math.max(t,e))}function kr(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function Mr(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}function Ar(e,t){let n;return((...o)=>{n&&clearTimeout(n),n=setTimeout(()=>e(...o),t)})}var sn=new E("SettingsStore"),te="BloomSettings",Es=100;function cn(e){if(ft(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(ft(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return ft(n)?n:null}return null}catch{return null}}var ln=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,d]of this.defaultGetters)if(l.startsWith(c)){let f=l.slice(c.length+1);if(f&&!f.includes(".")){let p=d(f);p!==void 0&&(i[a]=p,s=p);break}}}return ft(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){sn.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Es))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(te,this.plain)}catch{try{GM_setValue(te,t)}catch(n){sn.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(te,t)}catch{}Cr(te,t).catch(n=>sn.warn("Failed to save settings to IndexedDB:",n))}catch(t){sn.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){kr(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var Ss=new E("Settings"),Ls={plugins:{}},u=new ln(structuredClone(Ls)),Ts=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function Cs(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function y(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(u.store.plugins[n]||(u.store.plugins[n]={}),u.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?u.plain.plugins[n]??{}:{}}};return t}function ks(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function Rr(){let e=null;if(e=cn(ks(te)),e||(e=cn(await Tr(te))),!e)try{e=cn(localStorage.getItem(te))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(u.plain.plugins=t),Ss.debug("Loaded settings")}}function Pr(e,t){t&&(t.pluginName=e,u.plain.plugins[e]||(u.plain.plugins[e]={}),u.setDefaultGetter(Ts(e),n=>{if(n!=="enabled")return Cs(t.def,n)}))}function Hr(){return u.plain.plugins.Settings||(u.store.plugins.Settings={}),u.store.plugins.Settings}function dn(){return Hr().pinnedPlugins??[]}function Nr(e){return dn().includes(e)}function Ir(e){let t=dn(),n=t.includes(e);return u.store.plugins.Settings={...u.plain.plugins.Settings,pinnedPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}function un(){return Hr().starredPlugins??[]}function Or(e){return un().includes(e)}function Br(e){let t=un(),n=t.includes(e);return u.store.plugins.Settings={...u.plain.plugins.Settings,starredPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}var fn=new E("PluginManager"),$={},mt=new Set;function qr(e){if($[e.name]){fn.warn("Duplicate plugin",e.name);return}$[e.name]=e,Pr(e.name,e.settings)}function Ae(e){let t=$[e];if(!t)return!1;if(t.required)return!0;let n=u.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function $r(e){let t=$[e];if(!t||t.required)return;let n=!Ae(e);u.plain.plugins[e]||(u.store.plugins[e]={}),u.store.plugins[e].enabled=n,n?jr(t):Ms(t),fe("pluginToggle",{name:e,enabled:n})}function jr(e,t=!1){if(!mt.has(e.name)&&Ae(e.name))try{e.managedStyle&&Er(e.managedStyle),e.start?.(),mt.add(e.name),e.settings&&u.addPrefixChangeListener(`plugins.${e.name}.`,()=>{mt.has(e.name)&&e.onSettingsChange?.()}),t||fn.debug("Started",e.name)}catch(n){fn.error("Failed to start",e.name,n)}}function Ms(e){if(mt.has(e.name)){try{e.stop?.()}catch(t){fn.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(Sr(e.managedStyle),w(e.managedStyle)),mt.delete(e.name)}}function pt(e){for(let t of Object.values($))(t.startAt??"DOMContentLoaded")===e&&jr(t)}var Dr=2,_r="defaultsRev";function Fr(){for(let t of Object.values($))u.plain.plugins[t.name]||(u.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=u.store.plugins.Settings??(u.store.plugins.Settings={});if(e[_r]!==Dr){for(let t of["NoShareLink","NoDictation"]){let n=u.store.plugins[t]??(u.store.plugins[t]={});n.enabled=!1}e[_r]=Dr}}var gt=!1,mn=!1,ho=!1,zr=[],Kr=[],Ur=[];function bo(e){let t=e.splice(0);for(let n of t)n()}function ht(){gt||(gt=!0,bo(zr))}function yo(){mn||(mn=!0,gt||ht(),bo(Kr))}function Vr(){ho||(ho=!0,gt||ht(),mn||yo(),bo(Ur))}function pn(e){gt?e():zr.push(e)}function gn(e){mn?e():Kr.push(e)}function hn(e){ho?e():Ur.push(e)}function bn(){ht()}function Re(){ht(),yo()}function yn(){Vr()}function Gr(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function Wr(){await Gr(4e3),ht(),await Gr(4e3),yo(),Vr()}var b={p:"0-V-linuxdo"},P="[20260919] v1.4.26",Yr="https://github.com/0-V-linuxdo/Bloom";function As(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Rs(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function vo(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function me(){return vo()?As()||Rs():!1}function Jr(){return me()}var Ps=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Zr=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Hs=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Ns="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function He(e){return e.id==="bloom-root"||!!e.closest(Ns)}function Xr(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function vn(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function xo(e){if(!(e instanceof HTMLElement)||!e.isConnected||He(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&vn(t)?!1:e.getClientRects().length>0}function Pe(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Is(){let e=[];for(let t of document.querySelectorAll(Ps))!(t instanceof HTMLElement)||!t.isConnected||He(t)||e.push(t);return e}function xn(e){if(!e.isConnected||He(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function bt(){return Is().filter(xn)[0]??null}function wo(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||He(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function Eo(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!He(n)&&!Pe(n)&&n.parentElement&&!Pe(n.parentElement)&&(t=n);let o=t.parentElement;if(o&&!Pe(o)&&!He(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!Pe(o.parentElement))return o}return t}function Qr(){let e=document.querySelectorAll(Zr);for(let n of e)if(xo(n)&&!vn(n)&&Xr(n))return n;let t=document.querySelectorAll(Hs);for(let n of t){if(!xo(n)||!Xr(n)||vn(n))continue;let o=n.querySelector(Zr);return xo(o)&&!vn(o)?o:n}return null}function ei(){let e=bt();if(e){let t=Eo(e),n=t.parentElement;if(n&&!Pe(n))return n;if(!Pe(t))return t}return wo()}function ti(e){let t=bt();return t?e.composedPath().includes(t):!1}var Lo=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Os={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#212121","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Bs(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Ds(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function So(e){let t=Bs(e);return t?Ds(t)>.55?"light":"dark":null}function _s(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=So(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=So(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=So(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function ni(e){return e==="auto"?_s():e}function qs(e){try{let t=getComputedStyle(document.documentElement);for(let n of Lo){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function oi(e,t,n){let o=Os[t];if(n){qs(e);for(let r of Lo)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of Lo)e.style.setProperty(r,o[r])}function ri(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var To=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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

.bloom-plugin-dialog-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 12px;
}

.bloom-plugin-dialog-titles {
  min-width: 0;
  flex: 1;
}

.bloom-plugin-dialog-titles h2 {
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

.bloom-plugin-dialog-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 32rem;
  margin: 0 auto;
  min-height: 0;
  flex: 1;
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
`;var js="bloom-root",J="bloom-rail-item",Cn="bloom-account-item",Oe="bloom-sidebar-panel",kn="bloom-settings-css",Fs=2e3,Gs=y({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),Sn=null,zs=null,Ne=!1,re=!1,Ro=[],wn=null,Mn=null,oe=null,Ln=null,Y=null,Lt=null,yt,Ie=0,Tt=0,vt=0,Ct=null,kt=null,xt=null,An=null,wt=null,W=null,Nn=null,Et=null,Rn=null,li=null,St=null,Co=[],Ks=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Us=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],In="",Mt="all",ie="all";function On(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function ii(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Vs(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>'}function Ws(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function Ys(e){let t='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return e?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${t}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`}function Js(e){let t='<path d="M12 17v5"/>';return e?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var Zs={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function Xs(e){return e.icon||Zs[e.name]||On()}function Qs(){return"auto"}function ko(){let e=Qs(),t=ni(e);Sn&&(Sn.setAttribute("data-bloom-scheme",t),oi(Sn,t,e==="auto")),fe("schemeChange",{scheme:t,pref:e})}function pe(e,t){e&&(e.hidden=t,e.toggleAttribute("inert",t),t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden"))}function ci(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel").forEach(e=>e.remove())}function di(){if(x("settings",To),document.getElementById(kn)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=kn,e.textContent=To,document.head.appendChild(e)}function el(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function ui(){for(let e of Ro)e();Ro=[]}function fi(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function tl(e){return e.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,t=>t.toUpperCase())}function No(e){return e.settings?Object.entries(e.settings.def).filter(([,t])=>!t.hidden):[]}function nl(e){return No(e).length>0}function Tn(e){if(e.default!==void 0)return e.default;if(e.type===3)return(e.options?.find(n=>n.default)??e.options?.[0])?.value;if(e.type===2)return!1;if(e.type===4)return e.min??0;if(e.type===0)return"";if(e.type===1)return 0}function ol(e,t){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let o=document.createElement("span");if(o.className="bloom-plugin-dialog-label-title",o.textContent=tl(e),n.appendChild(o),t.description){let r=document.createElement("span");r.className="bloom-plugin-dialog-label-desc",r.textContent=t.description,n.appendChild(r)}return n}function rl(e,t,n){if(n.hidden)return null;let o=n.type===4||n.type===0||n.type===1||n.type===5,r=document.createElement("div");r.className=o?"bloom-field bloom-field-stack":"bloom-field",r.appendChild(ol(t,n));let i=u.store.plugins[e]??(u.store.plugins[e]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",Ro.push(n.render(a)),r.appendChild(a),r}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??Tn(n)??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),r.appendChild(a),r}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??Tn(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),r.appendChild(a),r}if(n.type===2){let a=fi(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),r.appendChild(a),r}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[t]??Tn(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[t]=n.type===1?Number(a.value):a.value}),r.appendChild(a),r}return r}function ai(e,t){let n=document.createElement("div");n.className=t?`bloom-plugin-dialog-field ${t}`:"bloom-plugin-dialog-field";let o=document.createElement("div");return o.className="bloom-plugin-dialog-field-label",o.textContent=e,n.appendChild(o),n}function il(e){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let t=u.store.plugins[e.name]??(u.store.plugins[e.name]={});for(let[n,o]of No(e)){if(n==="enabled"||o.type===5)continue;let r=Tn(o);r!==void 0&&(t[n]=r)}mi(e)}function Io(){Ne=!1,ui(),W?.replaceChildren(),Nn=null,pe(kt,!0),pe(Ct,!1)}function mi(e){if(ui(),Ne=!0,An&&(An.textContent=e.name),wt&&(wt.textContent=e.description,wt.hidden=!e.description),!W){pe(Ct,!0),pe(kt,!1);return}W.replaceChildren();let t=document.createElement("hr");if(t.className="bloom-plugin-dialog-rule",W.appendChild(t),e.authors?.length){let i=ai("Authors"),a=document.createElement("p");a.className="bloom-plugin-dialog-authors",a.textContent=e.authors.join(", "),i.appendChild(a),W.appendChild(i)}let n=ai("Settings","bloom-plugin-dialog-settings"),o=document.createElement("div");o.className="bloom-plugin-dialog-settings-list";let r=No(e);if(r.length)for(let[i,a]of r){let s=rl(e.name,i,a);s&&o.appendChild(s)}if(!o.childElementCount){let i=document.createElement("p");i.className="bloom-dialog-empty",i.textContent="No configurable settings.",o.appendChild(i)}if(n.appendChild(o),W.appendChild(n),Nn=o,r.length){let i=document.createElement("div");i.className="bloom-plugin-dialog-footer";let a=document.createElement("button");a.type="button",a.className="bloom-plugin-dialog-reset",a.textContent="Reset",a.addEventListener("click",()=>il(e)),i.appendChild(a),W.appendChild(i)}pe(Ct,!0),pe(kt,!1)}function al(e){let t=document.createElement("div");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Xs(e);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=e.name,a.title=e.name,r.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=Or(e.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=Ys(l),c.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation();let h=Br(e.name);fe("pluginStar",{name:e.name,starred:h})}),s.appendChild(c),!e.required){let m=Nr(e.name),h=document.createElement("button");h.type="button",h.className=`bloom-icon-btn bloom-card-pin${m?" bloom-card-pin-active":""}`,h.setAttribute("aria-label",m?"Unpin from top":"Pin to top"),h.innerHTML=Js(m),h.addEventListener("click",k=>{k.preventDefault(),k.stopPropagation();let K=Ir(e.name);fe("pluginPin",{name:e.name,pinned:K})}),s.appendChild(h)}if(nl(e)){let m=document.createElement("button");m.type="button",m.className="bloom-icon-btn bloom-card-settings",m.setAttribute("aria-label",`${e.name} settings`),m.innerHTML=Ws(),m.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation(),mi(e)}),s.appendChild(m)}let d=fi(e.name,Ae(e.name),!!e.required),f=d.querySelector("input");if(f?.addEventListener("click",m=>m.stopPropagation()),f?.addEventListener("change",()=>{$r(e.name)}),s.appendChild(d),o.append(r,s),n.appendChild(o),e.description){let m=document.createElement("div");m.className="bloom-card-desc",m.textContent=e.description,n.appendChild(m)}let p=document.createElement("div");p.className="bloom-card-separator";let S=document.createElement("div");S.className="bloom-card-footer";let v=document.createElement("div");return v.className="bloom-card-author",v.textContent=e.authors?.filter(Boolean).join(", ")||"\xA0",S.appendChild(v),t.append(n,p,S),t}function pi(){return Object.values($).filter(e=>!e.hidden&&e.name!=="Settings")}function gi(e,t){return t==="all"||t==="favorites"?!0:(e.tags??[]).includes(t)}function sl(e){return`${e.name} ${e.description??""} ${(e.tags??[]).join(" ")}`.toLowerCase()}function ll(){return In.trim()?"No plugins match your search.":ie==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function cl(){let e=pi();return Us.filter(t=>t.id==="favorites"||t.id==="all"?!0:e.some(n=>gi(n,t.id)))}function dl(){if(St){St.replaceChildren();for(let e of cl()){let t=document.createElement("button");t.type="button",t.className=`bloom-plugin-tab${ie===e.id?" bloom-plugin-tab-active":""}`,t.textContent=e.label,t.addEventListener("click",()=>{ie=e.id,ge()}),St.appendChild(t)}}}function ul(){let e=pi();if(ie==="favorites"){let t=new Set(un());e=e.filter(n=>t.has(n.name))}else ie!=="all"&&(e=e.filter(t=>gi(t,ie)));return Mt==="enabled"&&(e=e.filter(t=>Ae(t.name))),Mt==="disabled"&&(e=e.filter(t=>!Ae(t.name))),e}function ge(){if(!xt)return;dl();let e=ul();Rn&&(Rn.placeholder=`Search ${e.length} plugins...`);let t=e,n=In.trim().toLowerCase();if(n&&(t=t.filter(o=>sl(o).includes(n))),ie!=="favorites"){let o=dn();if(o.length){let r=new Map(o.map((i,a)=>[i,a]));t=t.slice().sort((i,a)=>{let s=r.has(i.name),l=r.has(a.name);return s!==l?s?-1:1:s?(r.get(i.name)??0)-(r.get(a.name)??0):i.name.localeCompare(a.name)})}}xt.replaceChildren();for(let o of t)xt.appendChild(al(o));Et&&(Et.hidden=t.length>0,Et.textContent=ll())}function Mo(e){e.stopPropagation()}function Ao(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function Oo(){document.getElementById(J)?.setAttribute("aria-expanded",re?"true":"false")}function fl(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function Pn(){Io(),In="",Mt="all",ie="all",document.getElementById(Oe)?.remove(),re=!1,Oo()}function ml(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",Mo),t.addEventListener("pointerup",Mo),t.addEventListener("click",Mo);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=On();let a=document.createElement("h2");a.textContent="Bloom++",r.append(i,a);let s=document.createElement("button");s.type="button",s.className="bloom-icon-btn",s.setAttribute("aria-label","Close"),s.innerHTML=ii(),s.addEventListener("click",Pn),o.append(r,s),n.appendChild(o);let l=document.createElement("div");l.className="bloom-section-head";let c=document.createElement("h3");c.textContent="Plugins";let d=document.createElement("p");d.textContent="Turn Bloom++ features on or off. Sliders icon opens options.",l.append(c,d),n.appendChild(l);let f=document.createElement("div");f.className="bloom-plugin-tabs",n.appendChild(f);let p=document.createElement("div");p.className="bloom-search-bar";let S=document.createElement("input");S.type="search",S.className="bloom-search-input",S.setAttribute("aria-label","Search plugins"),S.placeholder="Search plugins...",S.addEventListener("input",()=>{In=S.value,ge()});let v=document.createElement("select");v.className="bloom-search-filter",v.setAttribute("aria-label","Filter plugins");for(let Q of Ks){let mo=document.createElement("option");mo.value=Q.value,mo.textContent=Q.label,v.appendChild(mo)}v.value=Mt,v.addEventListener("change",()=>{Mt=v.value,ge()}),p.append(S,v),n.appendChild(p);let m=document.createElement("div");m.className="bloom-plugin-list",n.appendChild(m);let h=document.createElement("p");h.className="bloom-tab-empty",h.hidden=!0,n.appendChild(h);let k=document.createElement("div");k.className="bloom-settings-plugin",pe(k,!0);let K=document.createElement("div");K.className="bloom-plugin-dialog-head";let X=document.createElement("button");X.type="button",X.className="bloom-icon-btn",X.setAttribute("aria-label","Back"),X.innerHTML=Vs(),X.addEventListener("click",Io);let ut=document.createElement("div");ut.className="bloom-plugin-dialog-titles";let ke=document.createElement("h2"),U=document.createElement("p");U.className="bloom-plugin-dialog-sub",ut.append(ke,U);let q=document.createElement("button");q.type="button",q.className="bloom-icon-btn",q.setAttribute("aria-label","Close"),q.innerHTML=ii(),q.addEventListener("click",Pn),K.append(X,ut,q);let V=document.createElement("div");return V.className="bloom-plugin-dialog-body",k.append(K,V),t.append(n,k),Ct=n,kt=k,xt=m,An=ke,wt=U,W=V,Nn=null,Et=h,Rn=S,li=v,St=f,ge(),t}function pl(e){e.classList.add("bloom-rail-dock")}function gl(){let e=document.getElementById(J);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&xn(e)?e:null}function hl(){if(document.getElementById(Oe)?.remove(),!document.body)return;let e=ml(Oe);pl(e),document.body.appendChild(e),re=!0,Io(),Oo(),fe("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:P,dock:"center",rail:!!gl()})}function Bo(){let e=document.getElementById(Oe);if(e instanceof HTMLElement&&e.isConnected&&fl(e)){Pn();return}e?.remove(),hl()}function bl(){let e=document.createElement("button");return e.type="button",e.id=J,e.className="bloom-rail-item",e.setAttribute("aria-controls",Oe),e.setAttribute("aria-expanded",re?"true":"false"),e.innerHTML=`<span class="bloom-rail-mark">${On()}</span><span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),Bo()}),e}function si(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function yl(e){let t=e.querySelector("img");if(t instanceof HTMLElement){let n=t.getBoundingClientRect();if(n.width>8&&n.height>8)return t}for(let n of e.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}return null}function vl(e,t){for(let n of e.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||t&&(n===t||n.contains(t)||t.contains(n))||(n.textContent||"").trim().length<2)continue;let r=n.getBoundingClientRect();if(r.width>16&&r.height>8&&r.height<40)return n}return null}function ne(e,t,n){let o=`${n}px`;e.style.getPropertyValue(t)!==o&&e.style.setProperty(t,o)}function hi(e,t){if(e.classList.contains("bloom-rail-compact"))return;let n=e.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!e.isConnected||!t.isConnected)return;let o=yl(t),r=getComputedStyle(t),i=Number.parseFloat(r.paddingTop),a=Number.parseFloat(r.paddingBottom);if(Number.isFinite(i)&&ne(e,"padding-top",Math.round(i)),Number.isFinite(a)&&ne(e,"padding-bottom",Math.round(a)),o){let s=o.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));ne(n,"width",l),ne(n,"height",Math.max(20,Math.round(s.height)));let c=e.getBoundingClientRect(),d=Math.round(s.left-c.left);d>=0&&d<=40&&ne(e,"padding-left",d);let f=vl(t,o);if(f){let p=f.getBoundingClientRect(),S=n.getBoundingClientRect(),v=Math.round(p.left-S.right);v>=0&&v<=24&&ne(e,"gap",v)}}else{let s=Number.parseFloat(r.paddingLeft),l=Number.parseFloat(r.columnGap||r.gap);Number.isFinite(s)&&ne(e,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&ne(e,"gap",Math.round(l))}}function Po(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function xl(){if(Lt?.isConnected&&Y){Y.observe(Lt,{childList:!0});return}Ho()}function wl(e){if(Po(e))return!1;try{if(e.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function El(e,t){!t||!e||requestAnimationFrame(()=>{if(e.isConnected){vt=0;return}vt+=1,Tt=Date.now()+Math.min(8e3,250*2**Math.min(vt,5))})}function Sl(){Ie||Date.now()<Tt||(Ie=requestAnimationFrame(()=>{Ie=0,!(Date.now()<Tt)&&(document.getElementById(J)?.isConnected||Hn())}))}function Hn(){if(!document.body)return;Y?.disconnect();let e=null,t=!1;try{let n=document.getElementById(J);e=n instanceof HTMLButtonElement?n:bl();let o=bt(),r=wo();if(o){let i=Eo(o),a=i.parentElement;if(Po(i)||a&&Po(a))return;e.isConnected&&e.nextElementSibling===i||(i.before(e),t=!0),si(e),hi(e,o)}else r?(e.parentElement!==r&&(r.appendChild(e),t=!0),si(e,!0)):e.isConnected&&!xn(e)&&(e.remove(),e=null)}finally{El(e,t),xl(),Oo()}}function Ho(){let e=ei();!e||!wl(e)||Lt===e&&Y||(Y?.disconnect(),Lt=e,Y=new MutationObserver(()=>{document.getElementById(J)?.isConnected||Sl()}),Y.observe(e,{childList:!0}))}function Ll(){Hn(),Ho(),yt===void 0&&(yt=window.setInterval(()=>{let e=document.getElementById(J);if(!(e instanceof HTMLElement)||!e.isConnected)Date.now()>=Tt&&Hn();else{vt=0;let t=bt();t&&hi(e,t)}Ho()},Fs))}function Tl(){yt!==void 0&&(clearInterval(yt),yt=void 0),Ie&&cancelAnimationFrame(Ie),Ie=0,Tt=0,vt=0,Y?.disconnect(),Y=null,Lt=null}function Cl(e){Ln===e&&oe||(oe?.disconnect(),Ln=e,oe=new MutationObserver(()=>{if(!e.isConnected){oe?.disconnect(),oe=null,Ln=null;return}bi(e)}),oe.observe(e,{childList:!0}))}function bi(e){if(Cl(e),e.querySelector(`#${Cn}`))return;let t=document.createElement("button");t.type="button",t.id=Cn,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${On()}<span>Bloom++</span>`,t.addEventListener("pointerdown",Ao),t.addEventListener("pointerup",Ao),t.addEventListener("click",n=>{Ao(n),Bo()}),e.insertBefore(t,e.firstChild)}function En(){let e=Qr();return e?(bi(e),!0):!1}function kl(e){ti(e)&&(queueMicrotask(En),requestAnimationFrame(()=>{En()}),window.setTimeout(En,60),window.setTimeout(En,180))}function Ml(){Mn?.abort();let e=new AbortController;Mn=e,document.addEventListener("click",kl,{signal:e.signal})}function Al(){Mn?.abort(),Mn=null,oe?.disconnect(),oe=null,Ln=null}function yi(){Re(),el(()=>{di(),ci(),Hn(),Bo()})}var vi=g({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[b.p],required:!0,hidden:!0,enabledByDefault:!0,settings:Gs,startAt:"HostReady",cleanupSelectors:[`#${js}`,`#${J}`,`#${Cn}`,`#${Oe}`,`#${kn}`,"#bloom-menu-panel"],start(){di(),ci(),Ll(),Ml(),wn?.(),wn=ri(ko),ko(),Co=[rn("pluginToggle",()=>{re&&!Ne&&ge()}),rn("pluginPin",()=>{re&&!Ne&&ge()}),rn("pluginStar",()=>{re&&!Ne&&ge()})]},stop(){Tl(),Al(),wn?.(),wn=null;for(let e of Co)e();Co=[],Pn(),document.getElementById(J)?.remove(),document.getElementById(Cn)?.remove(),document.getElementById(kn)?.remove(),Sn=null,zs=null,Ct=null,kt=null,xt=null,An=null,wt=null,W=null,Nn=null,Et=null,Rn=null,li=null,St=null,re=!1,Ne=!1},onSettingsChange:ko});var Ei='form[data-type="unified-composer"], form.w-full[data-type]',Be=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Bn=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),xi=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),wi=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Rl=/stop streaming|stop generating|停止生成|停止输出|停止响应/;function H(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function he(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!H(r)))return r;return null}function Si(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function A(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=Si(e);return!!(Rl.test(n)||/^stop$/i.test(n))}function ae(){let t=Array.from(document.querySelectorAll(Ei)).find(H);if(t instanceof HTMLElement)return t;let n=he(document,Be),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function be(){let e=Array.from(document.querySelectorAll(Be));return e.find(H)??e[0]??null}function Do(){let e=be();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function Pl(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function Li(e){let t=ae();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!H(n))&&e(n))return n;return null}function Dn(){let e=ae(),t=he(e,Bn)??he(document,Bn);return t&&!A(t)?t:Li(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!A(n);let r=Si(n);return/^(send|send prompt|发送)$/i.test(r)&&!A(n)})}function _o(){let e=Dn();return!!e&&Pl(e)}function qo(){let e=ae(),t=he(e,xi,!0)??he(document,xi,!0);if(t)return t;let n=he(e,wi)??he(document,wi);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&H(o)&&A(o))return o}return Li(A)}function De(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}var Ti="bloom-host-icon",At="data-bloom-host-rel",$o="not all",jo=0,Ci=0,Hl=400;function ki(e){jo+=1;try{e()}finally{jo-=1}}function _n(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function _e(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function Mi(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function Nl(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Il(e,t){if(e.lastElementChild===t)return;let n=Date.now();n-Ci<Hl||(Ci=n,e.appendChild(t))}function Ol(e,t){for(let n of e.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===t||_n(n)&&(n.getAttribute(At)||n.setAttribute(At,n.rel),n.media!==$o&&(n.media=$o),n.rel!==Ti&&(n.rel=Ti))}function Bl(e){for(let t of e.querySelectorAll(`link[${At}]`)){if(!(t instanceof HTMLLinkElement))continue;let n=t.getAttribute(At);n&&(t.rel=n),t.removeAttribute(At),t.media===$o&&t.removeAttribute("media")}}function Fo(e,t){let{head:n}=document;!n||!t||ki(()=>{Ol(n,e);let o=Mi(e),{type:r,sizes:i}=Nl(t);o?Il(n,o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function Ai(e,t){let{head:n}=document;n&&ki(()=>{Mi(e)?.remove(),Bl(n)})}function Ri(e,t){let{head:n}=document;if(!n)return null;let o=0,r=new MutationObserver(i=>{if(jo)return;let a=!1,s;for(let l of i){l.type==="attributes"&&l.target instanceof HTMLLinkElement&&(l.target.id===e?a=!0:_n(l.target)&&(a=!0,_e(l.target.href)&&(s=l.target.href)));for(let c of l.removedNodes)_n(c)&&c.id===e&&(a=!0);for(let c of l.addedNodes)_n(c)&&c.id!==e&&(a=!0,_e(c.href)&&(s=c.href))}a&&(o||(o=requestAnimationFrame(()=>{o=0,t(s)})))});return r.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),r}var Pi=/\/c\/([a-zA-Z0-9_-]{8,})/i;function N(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=c=>{let d=n.indexOf(c);return d>=0&&n[d+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,d)=>{try{return document.querySelector(c)?.getAttribute(d)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function qe(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function Rt(e){if(!e)return"";try{return(/^https?:/i.test(e)?new URL(e,location.origin).pathname:e).match(Pi)?.[1]??""}catch{return e.match(Pi)?.[1]??""}}function qn(){let e=Rt(location.pathname);if(e)return e;let n=N().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return""}function Dl(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!H(t))&&(A(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function _l(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&H(e))}function ql(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&H(e))}function $l(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function se(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function I(){if(qo()||Dl())return!0;let e=Dn();return e&&H(e)&&!A(e)?!1:!!(_l()||ql()||$l())}var jl=["original","badge","dot","hole","bg"],Ii=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge",default:!0},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],Oi={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},$n="#FCFCFC",Fl="#111111",Hi="#111111",Gl="#ffffff",zl="#212121",Kl="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Ul={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},jn=32,Ni=64;function Bi(e){return typeof e=="string"&&jl.includes(e)}function Vl(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function Fn(e){let t=document.createElement("canvas");t.width=jn,t.height=jn;let n=t.getContext("2d");return n?(n.scale(jn/Ni,jn/Ni),e(n),t.toDataURL("image/png")):""}function Wl(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function Gn(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(Kl);n&&(e.strokeStyle=Fl,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function Yl(e,t,n){let o=Oi[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=Hi,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=Hi,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=Gl,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function Pt(e,t){if(e==="original")return t==="wait"?Fn(o=>Gn(o,$n)):Vl(Ul[t]);let n=t==="wait"?void 0:Oi[t];return Fn(e==="hole"?o=>Gn(o,n??$n):e==="bg"?o=>{o.fillStyle=n??zl,Wl(o,0,0,64,64,14),o.fill(),Gn(o,$n,!1)}:o=>{Gn(o,$n),t!=="wait"&&Yl(o,t,e==="dot"?"dot":"badge")})}function Di(e){return{wait:Pt(e,"wait"),rotate:Pt(e,"rotate"),done:Pt(e,"done"),ready:Pt(e,"ready"),error:Pt(e,"error")}}var Jl=new E("ChatStateFavicons"),ve="bloom-chat-state-favicon",ji=y({style:{type:3,description:"Favicon overlay",options:Ii}}),je="",Kn={wait:"",rotate:"",done:"",ready:"",error:""},Un="wait",Nt=!1,Z=!1,O=null,It="",Ot="",Bt=!0,Ht=null,Fe=0,$e,zn=null,ye=null,Go=null,Dt=!1,_i=new WeakSet,Zl=400;function Xl(){let e=ji.store.style;return Bi(e)?e:"badge"}function Ql(){let t=document.querySelector(`link[rel~="icon"]:not(#${ve})`)?.href;return _e(t)?t:_e(je)?je:""}function B(e){if(Un===e){let t=document.getElementById(ve);if(t instanceof HTMLLinkElement&&t.getAttribute("href")===Kn[e])return}Un=e,Fo(ve,Kn[e])}function qi(){Kn=Di(Xl()),B(Un)}function ec(){let e=N(),t=e?qe(e):qe("");return I()?(!It&&t&&(It=t),It||t):(It="",t)}function Fi(){Nt=!1,Z=!1,O=null,It=""}function tc(e){Ot=e,Fi(),Bt=!1,B("wait")}function Gi(){if(!Dt)return;let e=N()||location.pathname;if(Ot&&e&&Ot!==e){tc(e);return}e&&(Ot=e);let t=ec(),n=I(),o=Do(),r=_o();if(se()&&!n){B("error"),Nt=!1,Z=!1,O=null;return}if(n){Nt=!0,Z=!1,O=t,B("rotate");return}if(Nt){let i=!!O&&!!t&&O===t;if(Nt=!1,i){Z=!0,O=t,B("done");return}Z=!1,O=null}if(Z)if(!!(O&&t&&O!==t))Z=!1,O=null;else if(o){B("done");return}else if(Bt){Z=!1,B("ready");return}else{Z=!1,B("wait");return}O=null,B(o?"wait":Bt?"ready":"wait")}function zi(){let e=ae();if(!(ye&&Go===e&&e.isConnected)){if(ye?.disconnect(),Go=e,!e||e===document.body){ye=null;return}ye=new MutationObserver(()=>Vn()),ye.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function Vn(){!Dt||Fe||(Fe=requestAnimationFrame(()=>{Fe=0,Dt&&(Ki(),zi(),Gi())}))}function $i(){Bt=!0,Vn()}function Ki(){let e=be();!e||_i.has(e)||(_i.add(e),e.addEventListener("input",$i,{passive:!0}),e.addEventListener("compositionend",$i,{passive:!0}))}var Ui=g({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[b.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:ji,startAt:"DOMContentLoaded",cleanupSelectors:[`#${ve}`],start(){Dt=!0,je=Ql()||je,qi(),zn?.disconnect(),zn=Ri(ve,e=>{_e(e)&&(je=e),Fo(ve,Kn[Un])}),Ht?.abort(),Ht=new AbortController,window.addEventListener("popstate",Vn,{signal:Ht.signal}),Ki(),zi(),$e!==void 0&&clearInterval($e),$e=setInterval(Vn,Zl),Gi(),Jl.debug("favicon watch started")},stop(){Dt=!1,Fe&&cancelAnimationFrame(Fe),Fe=0,$e!==void 0&&(clearInterval($e),$e=void 0),Ht?.abort(),Ht=null,ye?.disconnect(),ye=null,Go=null,zn?.disconnect(),zn=null,Fi(),Ot="",Bt=!0,Ai(ve,je)},onSettingsChange:qi});var Vi=`.bloom-ih-hud {
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
`;var Wi=new E("InputHistory"),zo=/\u200B/g,Yi=10,Ji=500,Zi=100,oc=8,rc=120,ic=2e3,Wn=10,Yn=y({maxEntries:{type:4,description:"Max stored prompts",min:Yi,max:Ji,default:Zi},history:{type:5,description:"Stored prompts",render:xc},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Ko=new Map,L=0,Uo="",j=!1,qt=!1,Yo=0,_t=null,Vo,Jo=null,Xi=!0;function D(){let e=Yn.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Qi(e){let t=an(Number(Yn.store.maxEntries??Zi),Yi,Ji);return e.length>t?e.slice(e.length-t):e}function Jn(e){Yn.store.entries=Qi(e)}function ac(e){return e.replaceAll(zo,"").replace(/\n$/,"").trim()}function Wo(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(Be);return n instanceof HTMLElement?n:be()}function sc(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!De(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(zo,"").trim().length===0,last:i.toString().replaceAll(zo,"").trim().length===0}}catch{return{first:!0,last:!0}}}function ea(e,t){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch(i){Wi.debug("pm caret failed:",i)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function ta(e){clearTimeout(Vo),Vo=setTimeout(()=>{if(e!==Yo)return;qt=!1;let t=Jo;t&&ea(t,Xi)},rc)}function na(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),qt=!0,Jo=e,Xi=n;let i=++Yo;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(a){Wi.debug("insertText failed:",a),e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),ea(e,n),ta(i)}function lc(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function Ge(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function cc(){document.querySelector(".bloom-ih-hud")?.remove()}function dc(e,t){let n=lc();n.textContent=e;let o=(t.closest("form")??ae()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-oc)}px`,n.classList.add("bloom-ih-hud-on")}function Zo(e){let t=ac(e);if(!t)return;let n=Date.now(),o=Ko.get(t);if(o&&n-o<ic)return;Ko.set(t,n);let r=D().filter(i=>i!==t);r.push(t),Jn(r),L=D().length,j=!1,Ge()}function uc(e,t){let n=D();if(!n.length&&e)return;L>=n.length&&(Uo=De(t),L=n.length);let o=e?L-1:L+1;o<0||o>n.length||(L=o,j=!0,na(t,o===n.length?Uo:n[o],e),o<n.length?dc(`${o+1} / ${n.length}`,t):Ge())}function fc(e){j=!1,Ge(),na(e,Uo,!1),L=D().length}function mc(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=Wo(e.target)??Wo(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&j&&!e.altKey&&!e.shiftKey){fc(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){Zo(De(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=D();if(!o){let i=sc(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||L<=0)||!n&&L>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),uc(n,t))}function pc(e){if(Wo(e.target)){if(qt){ta(Yo);return}j&&(j=!1,Ge(),L=D().length)}}function gc(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(Be);n instanceof HTMLElement&&Zo(De(n))}function hc(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(Bn);if(!n||!(n instanceof HTMLElement)||A(n))return;let o=be();o&&Zo(De(o))}function bc(e){if(!(!j||qt)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}j=!1,Ge()}}function yc(){if(_t)return;_t=new AbortController;let{signal:e}=_t,t={capture:!0,signal:e};window.addEventListener("keydown",mc,t),window.addEventListener("input",pc,t),window.addEventListener("submit",gc,t),window.addEventListener("click",hc,t),window.addEventListener("pointerdown",bc,t)}function vc(e){let t=D().slice();t.splice(e,1),Jn(t),L>t.length&&(L=t.length)}function xc(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=D().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(h=>h.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/Wn));n>=l&&(n=l-1);let c=s.slice(n*Wn,n*Wn+Wn);e.replaceChildren();let d=document.createElement("input");if(d.className="bloom-ih-search",d.type="search",d.placeholder="Search history",d.autocomplete="off",d.value=t,d.addEventListener("input",()=>{t=d.value,n=0,r()}),e.appendChild(d),c.length){let h=document.createElement("div");h.className="bloom-ih-list",c.forEach((k,K)=>{let X=i.indexOf(k),ut=D().length-1-X,ke=document.createElement("div");ke.className="bloom-ih-item";let U=document.createElement("button");U.type="button",U.className=`bloom-ih-body${o===K?"":" bloom-ih-clamp"}`,U.textContent=k,U.addEventListener("click",()=>{o=o===K?-1:K,r()});let q=document.createElement("div");q.className="bloom-ih-actions";let V=document.createElement("button");V.type="button",V.title="Copy",V.textContent="C",V.addEventListener("click",()=>{Mr(k)});let Q=document.createElement("button");Q.type="button",Q.title="Delete",Q.textContent="\xD7",Q.addEventListener("click",()=>{vc(ut),r()}),q.append(V,Q),ke.append(U,q),h.appendChild(ke)}),e.appendChild(h)}else{let h=document.createElement("p");h.className="bloom-ih-empty",h.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(h)}let f=document.createElement("div");f.className="bloom-ih-pager";let p=document.createElement("button");p.type="button",p.className="bloom-ih-btn",p.textContent="Prev",p.disabled=n<=0,p.addEventListener("click",()=>{n-=1,r()});let S=document.createElement("span");S.textContent=`${n+1} / ${l}`;let v=document.createElement("button");v.type="button",v.className="bloom-ih-btn",v.textContent="Next",v.disabled=n+1>=l,v.addEventListener("click",()=>{n+=1,r()});let m=document.createElement("button");m.type="button",m.className="bloom-ih-clear",m.textContent="Clear all",m.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Jn([]),L=0,r())}),f.append(p,S,v,m),e.appendChild(f)};return r(),()=>{e.replaceChildren()}}var oa=g({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[b.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:Yn,startAt:"HostReady",managedStyle:"inputHistory",start(){x("inputHistory",Vi),L=D().length,j=!1,yc()},stop(){_t?.abort(),_t=null,Ge(),cc(),Ko.clear(),clearTimeout(Vo),qt=!1,Jo=null,j=!1},onSettingsChange(){let e=D(),t=Qi(e);t.length!==e.length&&Jn(t),L>t.length&&(L=t.length)}});var Xo="noShareLink",wc=['button[data-testid="share-chat-button"]'],Ec=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],Qo=y({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function ra(e){return`${e.join(",")}{display:none!important}`}function ia(){let e=[];if(Qo.store.hideShareChat!==!1&&e.push(ra(wc)),Qo.store.hideShareProject!==!1&&e.push(ra(Ec)),!e.length){w(Xo);return}x(Xo,e.join(`
`))}var aa=g({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[b.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Qo,start:ia,onSettingsChange:ia,stop(){w(Xo)}});var ca="noDictation",Sc=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]'],Lc=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],da=y({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function sa(e){return`${e.join(",")}{display:none!important}`}function la(){let e=[sa(Sc)];da.store.hideDictationSettings!==!1&&e.push(sa(Lc)),x(ca,e.join(`
`))}var ua=g({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[b.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:da,start:la,onSettingsChange:la,stop(){w(ca)}});var er="noSidebarIdentity",Xn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],pa=Xn.flatMap(e=>[`${e} .min-w-0 > .truncate`,`${e} .min-w-0.flex-1 .truncate`]),Tc=Xn.flatMap(e=>[`${e} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),Cc=[...pa,...Tc],kc=Xn.map(e=>`${e} a[href^="mailto:"]`),Mc=Xn.flatMap(e=>[`${e} .min-w-0 > :not(.truncate)`,`${e} .min-w-0 > :not(.truncate) *`,`${e} .min-w-0 .text-xs`,`${e} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${e} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${e} .text-xs:not(.truncate)`,`${e} .text-token-text-secondary:not(.truncate)`,`${e} .text-token-text-tertiary:not(.truncate)`,`${e} .min-w-0 ~ *`,`${e} .min-w-0 ~ * *`,`${e} > .text-xs`,`${e} > .text-token-text-secondary`,`${e} > .text-token-text-tertiary`]),Zn=y({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0}});function fa(e){return`${e.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Ac(){return`${Mc.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function ma(){let e=Zn.store.hideUsername!==!1,t=Zn.store.hideEmail!==!1,n=e&&Zn.store.enlargePlan!==!1,o=[];if(e&&o.push(fa(n?pa:Cc)),t&&o.push(fa(kc)),n&&o.push(Ac()),!o.length){w(er);return}x(er,o.join(`
`))}var ga=g({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[b.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Zn,start:ma,onSettingsChange:ma,stop(){w(er)}});var ha=`#bloom-rt-host {
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
`;var va=new E("RecentTopics"),Ue="bloom-rt-host",xa="home",wa=/^\/c\/([a-z0-9_-]{8,})/i,Pc=/\/c\/([a-z0-9_-]{8,})/i,Ea=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Hc=new Set(["Backquote","IntlBackslash"]),Nc=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Ic=140,Oc=[3,4,5,6,7,8,9,10,11,12].map(e=>({label:String(e),value:String(e),default:e===5})),T=y({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Oc},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),Qn=null,tr=null,R=!1,Kt=!1,$t=!1,F=0,xe="",ze=null,jt=null,Ke;function Bc(){let e=Number(T.store.maxRecent??5);return Number.isFinite(e)&&e>=3&&e<=12?e:5}function Ft(){let e=T.plain.visits;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function nr(){let e=T.plain.titles;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Sa(){let e=T.plain.previews;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function or(){let e=T.plain.projects;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function to(e){let t=Bc();return e.length>t?e.slice(0,t):e}function G(e){return e===xa}function Gt(e,t=Ic){let n=e.replace(/\s+/g," ").trim();return n.length<=t?n:`${n.slice(0,t-1)}\u2026`}function rr(e){if(!e)return"";try{return new URL(e,location.origin).pathname.match(wa)?.[1]??""}catch{return e.match(Pc)?.[1]??""}}function we(){let e=(location.pathname||"/").match(wa);if(e?.[1])return e[1];let n=N().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return xa}function ir(e){if(G(e))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${e}"]`);for(let o of n){if(rr(o.getAttribute("href")||"")!==e)continue;let r=Gt(o.textContent||"",80);if(r)return r}}catch{}let t=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return we()===e&&t&&!/^ChatGPT$/i.test(t)?Gt(t,80):""}function Dc(e){return G(e)?"New chat":nr()[e]||ir(e)||"Chat"}function _c(e){return or()[e]||""}function qc(e){return Sa()[e]||{}}function La(e,t){if(!e||G(e)||!t)return;let n=nr();n[e]!==t&&(n[e]=t,T.store.titles=n)}function $c(e,t){if(!e||G(e)||!t)return;let n=or();n[e]!==t&&(n[e]=t,T.store.projects=n)}function jc(e,t){if(!e||G(e)||!t.user&&!t.assistant)return;let n=Sa(),o=n[e]||{},r={user:t.user||o.user,assistant:t.assistant||o.assistant};o.user===r.user&&o.assistant===r.assistant||(n[e]=r,T.store.previews=n)}function ar(e){if(!e||G(e)&&T.store.includeHome===!1)return;let t=Ft().filter(n=>n!==e);t.unshift(e),T.store.visits=to(t)}function no(){let e=T.store.includeHome!==!1;return to(Ft().filter(n=>e||!G(n))).map(n=>({id:n,title:Dc(n),project:_c(n),preview:qc(n)}))}function ba(e){try{let t=document.querySelectorAll(`[data-message-author-role="${e}"]`),n=t[t.length-1];if(!(n instanceof HTMLElement))return"";let o=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||o.push(a)}let r=o.length?o.join(" "):n.textContent||"";return Gt(r)}catch{return""}}function zt(e){if(!e||G(e)||e!==we())return;let t=ir(e);t&&La(e,t);let n=ba("user"),o=ba("assistant");jc(e,{user:n,assistant:o});let r=Ca(e);if(r){let i=Ta(r);i&&$c(e,i)}}function sr(){let e=nr(),t=or(),n=[],o=new Set,r=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${Ue}, #bloom-root, #bloom-sidebar-panel`))continue;let d=rr(c.getAttribute("href")||"");if(!d||o.has(d))continue;o.add(d),n.push(d);let f=Gt(c.textContent||"",80);f&&!Ea.test(f)&&e[d]!==f&&(e[d]=f,r=!0);let p=Ta(c);p&&t[d]!==p&&(t[d]=p,i=!0)}}catch{}r&&(T.store.titles=e),i&&(T.store.projects=t);let a=Ft(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(T.store.visits=to([...a,...l]))}function Ta(e){let t=e.parentElement;for(let n=0;n<10&&t;n++){if(t.id==="bloom-rt-host"||t.id==="bloom-root"){t=t.parentElement;continue}let o=t.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),r=Gt((o instanceof HTMLElement?o.textContent:"")||"",60);if(r&&!Ea.test(r)&&!/^20\d{2}/.test(r)&&r!==e.textContent?.trim()&&t.querySelector('a[href^="/c/"]'))return r;t=t.parentElement}return""}function Ca(e){if(G(e)){let t=document.querySelector('[data-testid="create-new-chat-button"]');return t instanceof HTMLAnchorElement?t:document.querySelector('a[href="/"]')}try{for(let t of document.querySelectorAll(`a[href*="/c/${e}"]`))if(rr(t.getAttribute("href")||"")===e)return t}catch{}return null}function Fc(e){let t=Ca(e);if(t){t.click();return}if(G(e)){location.assign("/");return}location.assign(`/c/${e}`)}function Gc(){let e=we();xe&&xe!==e&&zt(xe),xe=e,ar(e),sr();let t=ir(e);t&&La(e,t),zt(e)}function eo(){Ke===void 0&&(Ke=window.setTimeout(()=>{Ke=void 0,Gc()},120))}function zc(){ze||(ze=history.pushState.bind(history),jt=history.replaceState.bind(history),history.pushState=function(...t){let n=ze(...t);return eo(),n},history.replaceState=function(...t){let n=jt(...t);return eo(),n})}function Kc(){ze&&(history.pushState=ze),jt&&(history.replaceState=jt),ze=null,jt=null}function Uc(e){return Hc.has(e.code)||e.keyCode===192?!0:Nc.has(e.key)}function ka(e){return e.key==="Control"||e.code==="ControlLeft"||e.code==="ControlRight"}function Vc(e,t){Kt=t,sr(),zt(we()),R=!0,F=0;try{let n=we();ar(n);let o=no();o.length>1&&(F=e?o.length-1:1)}catch(n){va.error("Failed to open switcher:",n)}Ut()}function ya(e){let{length:t}=no();t&&(F=(F+(e?-1:1)+t)%t,Ut())}function lr(){if(!R)return;let e=no()[F];R=!1,Kt=!1,Ut(),e&&Fc(e.id)}function Ma(){R&&(R=!1,Kt=!1,Ut())}function Wc(e){if(ka(e)){$t=!0;return}if((e.ctrlKey||$t)&&!e.altKey&&!e.metaKey&&Uc(e)&&!e.repeat){e.preventDefault(),e.stopImmediatePropagation();try{R?ya(e.shiftKey):Vc(e.shiftKey,!0)}catch(n){va.error("Hotkey failed:",n)}return}if(R){if(e.key==="Escape"){e.preventDefault(),Ma();return}if(e.key==="Enter"&&!e.shiftKey){e.preventDefault(),lr();return}e.key==="Tab"&&(e.ctrlKey||$t)&&(e.preventDefault(),ya(e.shiftKey))}}function Yc(e){ka(e)&&($t=!1,R&&Kt&&lr())}function Jc(e){let t=e.target instanceof Element?e.target:null;!t||!t.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(eo)}function Zc(e){!R||(e.target instanceof Element?e.target:null)?.closest(`#${Ue}`)||Ma()}function Xc(){document.visibilityState==="hidden"&&zt(we())}function Qc(){if(!document.body)return null;let e=document.getElementById(Ue);if(e instanceof HTMLElement)return tr=e,e;e=document.createElement("div"),e.id=Ue;let t=document.createElement("div");return t.className="bloom-rt-panel",t.setAttribute("role","listbox"),t.setAttribute("aria-label","Recent conversations"),t.dataset.visible="false",t.addEventListener("click",n=>n.stopPropagation()),e.append(t),document.body.append(e),tr=e,e}function Ut(){let e=Qc();if(!e)return;let t=e.querySelector(".bloom-rt-panel");if(!t)return;if(!R){t.dataset.visible="false",t.replaceChildren();return}let n=no();if(!n.length){t.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",t.replaceChildren(i);return}F>=n.length&&(F=0);let o=document.createElement("div");o.className="bloom-rt-list",o.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===F?"true":"false",s.setAttribute("aria-selected",a===F?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="user",d.textContent=i.preview.user,c.append(d)}if(i.preview.assistant){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="assistant",d.textContent=i.preview.assistant,c.append(d)}s.append(c)}s.addEventListener("click",()=>{F=a,lr()}),o.append(s)}),t.replaceChildren(o),t.dataset.visible="true",t.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function ed(){document.getElementById(Ue)?.remove(),tr=null}var Aa=g({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[b.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${Ue}`],settings:T,start(){x("recentTopics",ha),xe=we(),ar(xe),sr(),zt(xe),zc(),Qn=new AbortController;let{signal:e}=Qn;window.addEventListener("keydown",Wc,{capture:!0,signal:e}),window.addEventListener("keyup",Yc,{capture:!0,signal:e}),window.addEventListener("popstate",eo,{signal:e}),document.addEventListener("click",Jc,{capture:!0,signal:e}),document.addEventListener("click",Zc,{signal:e}),document.addEventListener("visibilitychange",Xc,{signal:e})},stop(){Qn?.abort(),Qn=null,Ke!==void 0&&(clearTimeout(Ke),Ke=void 0),Kc(),R=!1,Kt=!1,$t=!1,ed()},onSettingsChange(){let e=to(Ft());e.length!==Ft().length&&(T.store.visits=e),R&&Ut()}});var cr="cleaner",td=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],nd=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],od=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],rd=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],id=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]'],ad=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],Ee=y({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function Ve(e){return`${e.join(",")}{display:none!important}`}function Ra(){let e=[];if(Ee.store.hideDownloadApps!==!1&&e.push(Ve(td)),Ee.store.hideDisclaimer!==!1&&e.push(Ve(nd)),Ee.store.hideUpgrade!==!1&&e.push(Ve(od)),Ee.store.hideLockedModels!==!1&&e.push(Ve(rd)),Ee.store.hideHomePromo!==!1&&e.push(Ve(id)),Ee.store.hideAds!==!1&&e.push(Ve(ad)),!e.length){w(cr);return}x(cr,e.join(`
`))}var Pa=g({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[b.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Ee,start:Ra,onSettingsChange:Ra,stop(){w(cr)}});var oo=new E("ResponseNotification"),sd=400,ld=3,Xe=y({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:gd},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),dr=!1,Te=!1,Se=0,Le="",Ze=!1,Vt="",We,Ye=null,Je=null;function Ha(){return qe(N())}function cd(){return document.visibilityState==="hidden"||document.hidden}function dd(){return Xe.store.onlyWhenHidden===!1?!0:cd()}function ud(){let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function Na(){try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!Je||Je.state==="closed")&&(Je=new e);let t=Je,n=t.currentTime,o=[523.25,659.25];for(let r=0;r<o.length;r++){let i=t.createOscillator(),a=t.createGain();i.type="sine",i.frequency.value=o[r];let s=n+r*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(t.destination),i.start(s),i.stop(s+.24)}t.resume?.()}catch(e){oo.debug("chime failed",e)}}function fd(e){try{let t=new Audio(e);t.volume=.7,t.play()}catch(t){oo.debug("custom sound failed",t),Na()}}function Ia(){let e=String(Xe.store.soundUrl||"").trim();e?fd(e):Na()}function md(){let e="Bloom++",t=`${ud()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:e,text:t,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(e,{body:t,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){oo.debug("notification failed",n)}}function pd(){dd()&&(Xe.store.sound!==!1&&Ia(),Xe.store.browserNotification!==!1&&md())}function gd(e){let t=document.createElement("button");return t.type="button",t.textContent="Play",t.addEventListener("click",()=>Ia()),e.appendChild(t),()=>{t.remove()}}function hd(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest("button");n instanceof HTMLElement&&A(n)&&(Ze=!0)}function bd(){if(!dr)return;let e=N()||location.pathname;if(Vt&&e&&Vt!==e){Te=!1,Se=0,Le="",Ze=!1,Vt=e;return}Vt=e;let t=I(),n=Ha();if(t){Te=!0,Se=0,Le=n;return}if(!Te||(Se+=1,Se<ld))return;let o=!!Le&&Le===n,r=Ze,i=se();Te=!1,Se=0,Ze=!1,Le="",!(!o||r||i)&&pd()}var Oa=g({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[b.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Xe,start(){dr=!0,Te=I(),Se=0,Le=Te?Ha():"",Ze=!1,Vt=N()||location.pathname,Ye?.abort(),Ye=new AbortController,document.addEventListener("click",hd,{capture:!0,signal:Ye.signal}),We!==void 0&&clearInterval(We),We=setInterval(bd,sd),Xe.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:Ye.signal}),oo.debug("watch started")},stop(){dr=!1,We!==void 0&&(clearInterval(We),We=void 0),Ye?.abort(),Ye=null,Te=!1,Se=0,Le="",Ze=!1;try{Je?.close()}catch{}Je=null}});var Ba=`.bloom-cls {
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
`;var $a=new E("ChatListStatus"),Da="chatListStatus",ao="bloom-cls",vd="bloom-cls",xd=500,wd=1200*1e3,Ed="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",ce=new Map,de=!1,et="",Wt=!1,Qe,nt=0,le=null,fr=null,tt=null,ot=null,ro=null,Yt=null,Jt=!1;function io(){return Date.now()}function Sd(){return typeof unsafeWindow<"u"?unsafeWindow:window}function ja(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function Ld(e,t){return!(t!=="POST"||!/\/backend-api\/(?:f\/)?conversation(?:\/|\?|$)/i.test(e)||/\/backend-api\/conversations(?:\/|\?|$)/i.test(e))}function Td(e){try{if(typeof e=="string")return e;if(e instanceof URL)return e.href;if(typeof Request<"u"&&e instanceof Request)return e.url}catch{}return String(e)}function Fa(e){return e?e.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function Cd(e){return typeof e=="string"?Fa(e):""}function z(e,t,n,o=!0){if(!(!e||!de)){if(t==="idle")ce.delete(e);else{let r=ce.get(e);r&&r.kind===t&&n!=="net"?r.at=io():ce.set(e,{kind:t,at:io(),source:n})}o&&kd({v:1,id:e,kind:t,at:io()}),so()}}function kd(e){try{tt?.postMessage(e)}catch{}}function Md(e){let t=e.data;!t||t.v!==1||!t.id||t.kind!=="streaming"&&t.kind!=="done"&&t.kind!=="error"&&t.kind!=="idle"||z(t.id,t.kind,"bc",!1)}function Ad(){let e=io();for(let[t,n]of ce)n.kind==="streaming"&&e-n.at>wd&&ce.delete(t)}function Rd(){let e=ja();if(!e)return[];let t=[],n=new Set;try{for(let o of e.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(o.closest(Ed))continue;let r=Rt(o.getAttribute("href")||"");!r||n.has(r)||(n.add(r),t.push(o))}}catch{}return t}function _a(e){let t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),e==="streaming")t.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("cx","12"),o.setAttribute("cy","12"),o.setAttribute("r","9"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","2"),t.appendChild(o)}return t.appendChild(n),t}function ur(e){let t=e.querySelector(`:scope > .${ao}`);return t||null}function Pd(){if(!de)return;Ad();let e=qn(),t=Rd();le?.disconnect();try{for(let n of t){let o=Rt(n.getAttribute("href")||"");if(!o||!e||o!==e){ur(n)?.remove();continue}let i=ce.get(o)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){ur(n)?.remove();continue}let a=ur(n);a||(a=document.createElement("span"),a.className=ao,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(_a("streaming")):i==="error"&&a.appendChild(_a("error")))}}catch(n){$a.debug("paint failed",n)}Ga()}function so(){!de||nt||(nt=requestAnimationFrame(()=>{nt=0,de&&Pd()}))}function Ga(){let e=ja();if(!(le&&fr===e&&e?.isConnected)){if(le?.disconnect(),fr=e,!e){le=null;return}le=new MutationObserver(()=>so()),le.observe(e,{childList:!0,subtree:!0})}}async function Hd(e,t){let n=t,o=!e.ok,r=e.body;if(!r){n&&z(n,o?"error":"done","net");return}let i=r.getReader(),a=new TextDecoder,s="";try{for(;de;){let{done:l,value:c}=await i.read();if(l)break;if(s+=a.decode(c,{stream:!0}),!n){let d=Fa(s);d&&(n=d,Jt=!1,z(n,"streaming","net"))}/\[DONE\]/.test(s)||/"error"\s*:\s*\{/.test(s)?(/"error"\s*:\s*\{/.test(s)&&(o=!0),s=s.slice(-64)):s.length>8192&&(s=s.slice(-2048))}}catch{o=!0}n&&z(n,o?"error":"done","net")}function Nd(e,t,n){let o=Td(t),r=(n?.method||(typeof Request<"u"&&t instanceof Request?t.method:"GET")||"GET").toUpperCase(),i=Ld(o,r),a="";return i&&(a=Cd(n?.body)||Rt(o)||qn(),a?z(a,"streaming","net"):Jt=!0),e(t,n).then(s=>{if(!i)return s;try{let l=s.clone();Hd(l,a)}catch{a&&z(a,s.ok?"done":"error","net")}return s},s=>{throw i&&a&&z(a,"error","net"),s})}function Id(){if(ot)return;let e=Sd();Yt=e,ot=e.fetch.bind(e);let t=(n,o)=>Nd(ot,n,o);ro=t,e.fetch=t}function Od(){!ot||!Yt||(ro&&Yt.fetch===ro&&(Yt.fetch=ot),ot=null,ro=null,Yt=null)}function qa(){if(!de)return;let e=qn();if(et&&e&&et!==e){let n=ce.get(et);n?.kind==="streaming"&&n.source==="local"&&z(et,se()?"error":"done","local"),Wt=!1}if(et=e,I()){Wt=!0,e&&z(e,"streaming","local"),so();return}Wt&&(Wt=!1,e&&z(e,se()?"error":"done","local")),Jt=!1,so()}var za=g({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[b.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${ao}`],start(){de=!0,x(Da,Ba);try{tt=new BroadcastChannel(vd)}catch{tt=null}tt?.addEventListener("message",Md),Id(),Ga(),Qe!==void 0&&clearInterval(Qe),Qe=setInterval(qa,xd),qa(),$a.debug("sidebar status watch started")},stop(){de=!1,nt&&cancelAnimationFrame(nt),nt=0,Qe!==void 0&&(clearInterval(Qe),Qe=void 0),le?.disconnect(),le=null,fr=null,Od();try{tt?.close()}catch{}tt=null,ce.clear(),Jt=!1,Wt=!1,et="",document.querySelectorAll(`.${ao}`).forEach(e=>e.remove()),w(Da)}});var Ua="widerChat",Va=40,Wa=96,Ya=64,Ja=y({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:Va,max:Wa,default:Ya}});function Bd(){return an(Number(Ja.store.width??Ya),Va,Wa)}function Ka(){let e=Bd();x(Ua,`:root{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important}[class*="--thread-content-max-width"]{--thread-content-max-width:${e}rem!important}[class*="thread-content-max-width"]{max-width:min(100%,${e}rem)!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"]{max-width:min(100%,${e}rem)!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:min(100%,${e}rem)!important}`)}var Za=g({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[b.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Ja,start:Ka,onSettingsChange:Ka,stop(){w(Ua)}});var Xa=`.bloom-ts {
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
`;function lo(e){if(typeof e=="number"&&Number.isFinite(e)&&e>0)return e>1e12?e:Math.round(e*1e3);if(typeof e=="string"){let t=e.trim();if(!t)return null;if(/^\d+(\.\d+)?$/.test(t))return lo(Number(t));let n=Date.parse(t);return Number.isFinite(n)?n:null}return null}function Qa(e,t,n=Date.now()){let o=new Date(e);if(Number.isNaN(o.getTime()))return"";let r=new Date(n),i=o.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(o.toDateString()===r.toDateString()||!t)return i;let s=o.getFullYear()===r.getFullYear();return`${o.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function es(e){try{return new Date(e).toISOString()}catch{return""}}var is=new E("MessageTimestamps"),ts="messageTimestamps",uo="bloom-ts",ns=1500,_d="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",st=y({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),lt=new Map,Ce=!1,it=0,rt,ue=null,mr=null,at=null,co=null,Zt=null,os=!1;function qd(){return typeof unsafeWindow<"u"?unsafeWindow:window}function as(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function gr(){let e=st.plain.stamps;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function ss(){let e={...gr()};for(let[n,o]of lt)e[n]=o;let t=Object.keys(e);if(t.length>ns){let n=t.slice(t.length-ns),o={};for(let r of n)o[r]=e[r];st.store.stamps=o;return}st.store.stamps=e}var $d=Ar(ss,500);function pr(e,t){!e||!t||lt.get(e)===t||(lt.set(e,t),$d(),Qt())}function jd(e){return e?lt.get(e)??gr()[e]??null:null}function Fd(e){try{if(typeof e=="string")return e;if(e instanceof URL)return e.href;if(typeof Request<"u"&&e instanceof Request)return e.url}catch{}return String(e)}function Gd(e,t){return t!=="GET"||/\/backend-api\/conversations(?:\/|\?|$)/i.test(e)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(e)}function zd(e,t){return t!=="POST"||/\/backend-api\/conversations(?:\/|\?|$)/i.test(e)?!1:/\/backend-api\/(?:f\/)?conversation(?:\/|\?|$)/i.test(e)}function Xt(e,t=0){if(!Ce||t>6||!e||typeof e!="object")return;if(Array.isArray(e)){for(let a of e)Xt(a,t+1);return}let n=e,o=n.message;if(o&&typeof o=="object"&&!Array.isArray(o)){let a=o,s=typeof a.id=="string"?a.id:"",l=lo(a.create_time??a.createTime??a.created_at);s&&l&&pr(s,l)}let r=typeof n.id=="string"?n.id:"",i=lo(n.create_time??n.createTime??n.created_at);if(r&&i&&(n.author||n.content||n.role||n.create_time||n.createTime)&&pr(r,i),n.mapping&&typeof n.mapping=="object")Xt(n.mapping,t+1);else if(t<3)for(let a of Object.values(n))a&&typeof a=="object"&&Xt(a,t+1)}function rs(e){if(e)try{Xt(JSON.parse(e))}catch{}}async function Kd(e){try{let t=await e.clone().json();Xt(t)}catch{}}async function Ud(e){let t=e.body;if(!t)return;let n=t.getReader(),o=new TextDecoder,r="";try{for(;Ce;){let{done:i,value:a}=await n.read();if(i)break;r+=o.decode(a,{stream:!0});let s=r.split(`
`);r=s.pop()??"";for(let l of s){let c=l.replace(/^data:\s*/,"").trim();!c||c==="[DONE]"||rs(c)}r.length>16384&&(r=r.slice(-4096))}r&&rs(r.replace(/^data:\s*/,""))}catch{}}function Vd(e,t,n){let o=Fd(t),r=(n?.method||(typeof Request<"u"&&t instanceof Request?t.method:"GET")||"GET").toUpperCase(),i=Gd(o,r),a=zd(o,r);return e(t,n).then(s=>{if(i)Kd(s);else if(a)try{Ud(s.clone())}catch{}return s})}function Wd(){if(at)return;let e=qd();Zt=e,at=e.fetch.bind(e);let t=(n,o)=>Vd(at,n,o);co=t,e.fetch=t}function Yd(){!at||!Zt||(co&&Zt.fetch===co&&(Zt.fetch=at),at=null,co=null,Zt=null)}function Jd(e){return(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function Zd(){let e=as();if(!e)return[];let t=[];try{for(let n of e.querySelectorAll("[data-message-id]"))n.closest(_d)||t.push(n)}catch{}return t}function Xd(e){try{return!!e.querySelector("time:not(.bloom-ts)")}catch{return!1}}function Qd(){if(!Ce)return;let e=st.store.hideOwnMessages===!0,t=st.store.showDate!==!1,n=I(),o=Zd();ue?.disconnect();try{o.forEach((r,i)=>{let a=r.getAttribute("data-message-id")||"",s=Jd(r),l=r.querySelector(`:scope > .${uo}`);if(e&&s==="user"){l?.remove();return}if(Xd(r)){l?.remove();return}let c=jd(a);if(!c&&a&&(n||os)&&i>=o.length-2&&(c=Date.now(),pr(a,c)),!c){l?.remove();return}let d=Qa(c,t);if(!d){l?.remove();return}let f=l;f||(f=document.createElement("time"),f.className=uo,f.setAttribute("aria-hidden","true"),r.insertBefore(f,r.firstChild)),f.textContent!==d&&(f.textContent=d);let p=es(c);p&&f.getAttribute("datetime")!==p&&f.setAttribute("datetime",p)})}catch(r){is.debug("paint failed",r)}os=n,ls()}function Qt(){!Ce||it||(it=requestAnimationFrame(()=>{it=0,Ce&&Qd()}))}function ls(){let e=as();if(!(ue&&mr===e&&e?.isConnected)){if(ue?.disconnect(),mr=e,!e||e===document.body){ue=null;return}ue=new MutationObserver(()=>Qt()),ue.observe(e,{childList:!0,subtree:!0})}}var cs=g({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[b.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${uo}`],settings:st,start(){Ce=!0,x(ts,Xa);let e=gr();for(let[t,n]of Object.entries(e))typeof n=="number"&&n>0&&lt.set(t,n);Wd(),ls(),rt!==void 0&&clearInterval(rt),rt=setInterval(Qt,800),Qt(),is.debug("timestamp watch started")},stop(){Ce=!1,it&&cancelAnimationFrame(it),it=0,rt!==void 0&&(clearInterval(rt),rt=void 0),ue?.disconnect(),ue=null,mr=null,Yd(),ss(),lt.clear(),document.querySelectorAll(`.${uo}`).forEach(e=>e.remove()),w(ts)},onSettingsChange:Qt});var hr="streamerMode",eu="filter:blur(6px)!important;transition:filter .2s ease",tu="filter:none!important",en=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],ct=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function _(e,t){return e.map(n=>`${n} ${t}`)}var dt=y({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0}});function tn(e,t=!0){let n=e.join(","),o=e.map(r=>`${r}:hover`).join(",");return`${n}{${eu}}${t?`${o}{${tu}}`:""}`}function ds(){let e=[];if(dt.store.conversations!==!1&&e.push(tn([..._(ct,'a[href^="/c/"]'),..._(ct,'a[href*="/c/"]')])),dt.store.projects!==!1&&e.push(tn([..._(ct,'a[href*="/project"]'),..._(ct,'a[href*="/g/g-p-"]'),..._(ct,'[data-testid="project-name"]'),..._(ct,'[data-testid="project-link"]')])),dt.store.accountAvatar!==!1&&e.push(tn([..._(en,"img"),..._(en,'[class*="avatar"]')],!1)),dt.store.accountName!==!1&&e.push(tn([..._(en,".min-w-0 > .truncate"),..._(en,".min-w-0.flex-1 .truncate")],!1)),dt.store.accountEmail!==!1&&e.push(tn([..._(en,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),e.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),!e.length){w(hr);return}x(hr,e.join(`
`))}var us=g({name:"StreamerMode",description:"Blur Recents titles, project names, and the account chip while you stream.",authors:[b.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:dt,start:ds,onSettingsChange:ds,stop(){w(hr)}});var nn=new E("Bloom"),fs=!1,nu=Date.now(),ou=[vi,Ui,oa,aa,ua,ga,Aa,Pa,Oa,za,Za,cs,us];function fo(e){return new Promise(t=>setTimeout(t,e))}function ru(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var ps=8e3,ms=300,iu=250;async function au(){if(me())return await fo(ms),!0;for(;Date.now()-nu<ps;)if(await fo(iu),me())return await fo(ms),!0;return me()||vo()}function br(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function su(){if(br())return!0;let e=Date.now()+ps;for(;Date.now()<e;)if(await fo(100),br())return!0;return br()}function lu(){try{GM_registerMenuCommand?.("Bloom++ settings",yi)}catch{}}function cu(){pn(()=>{pt("HostShell"),nn.info("host shell",P)}),gn(()=>{nn.info("idle ready",P)}),hn(()=>{wr(),pt("HostReady"),nn.info("chrome ready",P)})}async function yr(){await Rr()}async function vr(){if(fs)return;fs=!0;for(let n of ou)try{qr(n)}catch(o){nn.error("register failed",n.name,o)}Fr(),pt("Init"),lu(),cu();let e=()=>pt("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await ru(),su().then(n=>{n&&bn()}),!await au()){nn.warn("late islands not detected; starting default plugins",P),Re(),yn();return}await Wr()}var gs=typeof unsafeWindow<"u"?unsafeWindow:window,du=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||du){let e=gs.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",P);try{Object.defineProperty(gs,"Bloom",{value:xr,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}yr().then(()=>vr()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
