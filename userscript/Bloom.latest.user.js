// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260919] v1.4.37
// @description  Void++-style plugin host for chatgpt.com. Tab favicon, input history, recent chats, reply notify, Recents status, wider thread, message times, streamer blur, custom home greeting, hide Share, Dictation, sidebar name, Download apps, upgrade CTAs, and ads.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @icon         https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/assets/logos/app-icon/bloom-icon.svg
// @icon64       https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/assets/logos/app-icon/bloom-icon-64.png
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
// @downloadURL  https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/userscript/Bloom.latest.user.js
// @updateURL    https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/userscript/Bloom.latest.user.js
// ==/UserScript==

/* Bloom++ [20260919] v1.4.37. SPDX-License-Identifier: GPL-3.0-or-later */
"use strict";(()=>{var el=Object.defineProperty;var tl=(e,t)=>{for(var n in t)el(e,n,{get:t[n],enumerable:!0})};var Wr={};tl(Wr,{REPO_URL:()=>Si,Settings:()=>g,VERSION:()=>O,hasLateIslands:()=>he,init:()=>Vr,initSettings:()=>Ur,isDocumentInteractive:()=>Li,plugins:()=>z,requestChromeReady:()=>Dn,requestIdleReady:()=>Be,requestShellReady:()=>Bn,whenChromeReady:()=>On,whenIdleReady:()=>In,whenShellReady:()=>Hn});var te=new Map,Ln=!1;function nl(){return document.getElementById("bloom-root")?.shadowRoot??null}function ol(){return document.head??null}function He(){let e=nl();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=rl()}function Oo(e,t){if(!Ln)return;let n=ol();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),He();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,He();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,He()}function w(e,t){let n=te.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},te.set(e,n)),Ln&&Oo(e,n)}function Yr(){Ln=!0;for(let[e,t]of te)Oo(e,t);return He(),!0}function Jr(e){let t=te.get(e);t&&(t.disabled=!1,Ln&&Oo(e,t))}function Xr(e){let t=te.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),He())}function b(e){let t=te.get(e);t&&(t.el?.remove(),te.delete(e),He())}function rl(){return Array.from(te.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var S=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function h(e){return e}var Bo=new Map;function Cn(e,t){let n=Bo.get(e);return n||(n=new Set,Bo.set(e,n)),n.add(t),()=>n.delete(t)}function ge(e,t){let n=Bo.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var il="bloompp";function Zr(){return new Promise((e,t)=>{let n=indexedDB.open(il,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function Qr(e){try{let t=await Zr();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function ei(e,t){try{let n=await Zr();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function St(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ie(e,t,n){return Math.min(n,Math.max(t,e))}function ti(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function ni(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}function oi(e,t){let n;return((...o)=>{n&&clearTimeout(n),n=setTimeout(()=>e(...o),t)})}var Tn=new S("SettingsStore"),ne="BloomSettings",al=100;function Mn(e){if(St(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(St(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return St(n)?n:null}return null}catch{return null}}var kn=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[d,c]of this.defaultGetters)if(l.startsWith(d)){let u=l.slice(d.length+1);if(u&&!u.includes(".")){let f=c(u);f!==void 0&&(i[a]=f,s=f);break}}}return St(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Tn.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},al))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(ne,this.plain)}catch{try{GM_setValue(ne,t)}catch(n){Tn.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(ne,t)}catch{}ei(ne,t).catch(n=>Tn.warn("Failed to save settings to IndexedDB:",n))}catch(t){Tn.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){ti(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var sl=new S("Settings"),ll={plugins:{}},g=new kn(structuredClone(ll)),cl=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function dl(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function v(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(g.store.plugins[n]||(g.store.plugins[n]={}),g.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?g.plain.plugins[n]??{}:{}}};return t}function ul(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function ri(){let e=null;if(e=Mn(ul(ne)),e||(e=Mn(await Qr(ne))),!e)try{e=Mn(localStorage.getItem(ne))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(g.plain.plugins=t),sl.debug("Loaded settings")}}function ii(e,t){t&&(t.pluginName=e,g.plain.plugins[e]||(g.plain.plugins[e]={}),g.setDefaultGetter(cl(e),n=>{if(n!=="enabled")return dl(t.def,n)}))}function ai(){return g.plain.plugins.Settings||(g.store.plugins.Settings={}),g.store.plugins.Settings}function An(){return ai().pinnedPlugins??[]}function si(e){return An().includes(e)}function li(e){let t=An(),n=t.includes(e);return g.store.plugins.Settings={...g.plain.plugins.Settings,pinnedPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}function Rn(){return ai().starredPlugins??[]}function ci(e){return Rn().includes(e)}function di(e){let t=Rn(),n=t.includes(e);return g.store.plugins.Settings={...g.plain.plugins.Settings,starredPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}var Pn=new S("PluginManager"),z={},Lt=new Set;function fi(e){if(z[e.name]){Pn.warn("Duplicate plugin",e.name);return}z[e.name]=e,ii(e.name,e.settings)}function Oe(e){let t=z[e];if(!t)return!1;if(t.required)return!0;let n=g.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function pi(e){let t=z[e];if(!t||t.required)return;let n=!Oe(e);g.plain.plugins[e]||(g.store.plugins[e]={}),g.store.plugins[e].enabled=n,n?gi(t):ml(t),ge("pluginToggle",{name:e,enabled:n})}function gi(e,t=!1){if(!Lt.has(e.name)&&Oe(e.name))try{e.managedStyle&&Jr(e.managedStyle),e.start?.(),Lt.add(e.name),e.settings&&g.addPrefixChangeListener(`plugins.${e.name}.`,()=>{Lt.has(e.name)&&e.onSettingsChange?.()}),t||Pn.debug("Started",e.name)}catch(n){Pn.error("Failed to start",e.name,n)}}function ml(e){if(Lt.has(e.name)){try{e.stop?.()}catch(t){Pn.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(Xr(e.managedStyle),b(e.managedStyle)),Lt.delete(e.name)}}function Ct(e){for(let t of Object.values(z))(t.startAt??"DOMContentLoaded")===e&&gi(t)}var ui=2,mi="defaultsRev";function hi(){for(let t of Object.values(z))g.plain.plugins[t.name]||(g.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=g.store.plugins.Settings??(g.store.plugins.Settings={});if(e[mi]!==ui){for(let t of["NoShareLink","NoDictation"]){let n=g.store.plugins[t]??(g.store.plugins[t]={});n.enabled=!1}e[mi]=ui}}var Tt=!1,Nn=!1,Do=!1,yi=[],vi=[],xi=[];function _o(e){let t=e.splice(0);for(let n of t)n()}function kt(){Tt||(Tt=!0,_o(yi))}function $o(){Nn||(Nn=!0,Tt||kt(),_o(vi))}function wi(){Do||(Do=!0,Tt||kt(),Nn||$o(),_o(xi))}function Hn(e){Tt?e():yi.push(e)}function In(e){Nn?e():vi.push(e)}function On(e){Do?e():xi.push(e)}function Bn(){kt()}function Be(){kt(),$o()}function Dn(){wi()}function bi(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function Ei(){await bi(4e3),kt(),await bi(4e3),$o(),wi()}var y={p:"0-V-linuxdo"},O="[20260919] v1.4.37",Si="https://github.com/0-V-linuxdo/Bloom";function fl(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function pl(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function qo(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function he(){return qo()?fl()||pl():!1}function Li(){return he()}var gl=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Ci=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),hl=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),bl="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function _e(e){return e.id==="bloom-root"||!!e.closest(bl)}function Ti(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function _n(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function jo(e){if(!(e instanceof HTMLElement)||!e.isConnected||_e(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&_n(t)?!1:e.getClientRects().length>0}function De(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function yl(){let e=[];for(let t of document.querySelectorAll(gl))!(t instanceof HTMLElement)||!t.isConnected||_e(t)||e.push(t);return e}function $n(e){if(!e.isConnected||_e(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function Mt(){return yl().filter($n)[0]??null}function Fo(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||_e(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function zo(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!_e(n)&&!De(n)&&n.parentElement&&!De(n.parentElement)&&(t=n);let o=t.parentElement;if(o&&!De(o)&&!_e(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!De(o.parentElement))return o}return t}function ki(){let e=document.querySelectorAll(Ci);for(let n of e)if(jo(n)&&!_n(n)&&Ti(n))return n;let t=document.querySelectorAll(hl);for(let n of t){if(!jo(n)||!Ti(n)||_n(n))continue;let o=n.querySelector(Ci);return jo(o)&&!_n(o)?o:n}return null}function Mi(){let e=Mt();if(e){let t=zo(e),n=t.parentElement;if(n&&!De(n))return n;if(!De(t))return t}return Fo()}function Ai(e){let t=Mt();return t?e.composedPath().includes(t):!1}var Ko=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],vl={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function xl(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function wl(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function Go(e){let t=xl(e);return t?wl(t)>.55?"light":"dark":null}function El(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=Go(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=Go(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Go(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Ri(e){return e==="auto"?El():e}function Sl(e){try{let t=getComputedStyle(document.documentElement);for(let n of Ko){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function Pi(e,t,n){let o=vl[t];if(n){Sl(e);for(let r of Ko)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of Ko)e.style.setProperty(r,o[r])}function Ni(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var Uo=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
 * Rail rest is transparent like the native account row. Panel / plugin dialog
 * follow chatgpt.com Settings (\`bg-token-bg-primary\`, shadow-long, inverted switch). */

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
  background: transparent;
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
  gap: 1rem;
  min-height: 0;
}

.bloom-settings-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  margin: 0;
}

.bloom-settings-titles {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
  flex: 1;
}

.bloom-settings-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
}

.bloom-settings-mark {
  width: 20px;
  height: 20px;
  display: grid;
  place-items: center;
  color: var(--icon-primary, inherit);
  flex: 0 0 auto;
}

.bloom-settings-mark svg {
  width: 20px;
  height: 20px;
}

.bloom-settings-head h2 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.5rem;
  color: var(--text-primary, inherit);
}

.bloom-settings-sub {
  margin: 0;
  font-size: 0.75rem;
  line-height: 1rem;
  color: var(--text-secondary, #5d5d5d);
}

.bloom-section-head {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0;
}

.bloom-section-head h3 {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  color: var(--text-primary, inherit);
}

.bloom-section-head p {
  margin: 0;
  font-size: 0.75rem;
  line-height: 1rem;
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
  margin: 0;
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
  margin: 0;
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
`;var Cl="bloom-root",G="bloom-rail-item",Gn="bloom-account-item",ye="bloom-sidebar-panel",_t="bloom-plugin-dialog",Jn="bloom-plugin-layer",Kn="bloom-settings-css",Tl=2e3,kl=v({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),Oi=null,Ml=null,ae=!1,Jo=[],qn=null,Un=null,re=null,Fn=null,X=null,Ot=null,At,$e=0,Bt=0,Rt=0,Pt=null,Nt=null,Vn=null,Bi=null,Ht=null,Vo=[],Wn=!1,Al=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Rl=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],Xn="",Dt="all",se="all";function Zn(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Di(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Pl(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function Nl(e){let t='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return e?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${t}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`}function Hl(e){let t='<path d="M12 17v5"/>';return e?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var Il={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function Ol(e){return e.icon||Il[e.name]||Zn()}function Bl(){return"auto"}function Wo(e,t,n){e&&(e.setAttribute("data-bloom-scheme",t),Pi(e,t,n),e.style.removeProperty("--bloom-rail-surface"))}function _i(e){e&&(e.style.removeProperty("--bloom-rail-surface"),e.style.removeProperty("--bg-primary"))}function It(){let e=Bl(),t=Ri(e),n=e==="auto";Wo(Oi,t,n);let o=document.getElementById(ye);o instanceof HTMLElement&&Wo(o,t,n);let r=document.getElementById(_t);r instanceof HTMLElement&&Wo(r,t,n);let i=document.getElementById(G);i instanceof HTMLElement&&_i(i),ge("schemeChange",{scheme:t,pref:e})}function $i(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(e=>e.remove())}function qi(){if(w("settings",Uo),document.getElementById(Kn)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=Kn,e.textContent=Uo,document.head.appendChild(e)}function Dl(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function _l(){for(let e of Jo)e();Jo=[]}function ji(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function $l(e){return e.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,t=>t.toUpperCase())}function Qo(e){return e.settings?Object.entries(e.settings.def).filter(([,t])=>!t.hidden):[]}function ql(e){return Qo(e).length>0}function zn(e){if(e.default!==void 0)return e.default;if(e.type===3)return(e.options?.find(n=>n.default)??e.options?.[0])?.value;if(e.type===2)return!1;if(e.type===4)return e.min??0;if(e.type===0)return"";if(e.type===1)return 0}function jl(e,t){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let o=document.createElement("span");if(o.className="bloom-plugin-dialog-label-title",o.textContent=$l(e),n.appendChild(o),t.description){let r=document.createElement("span");r.className="bloom-plugin-dialog-label-desc",r.textContent=t.description,n.appendChild(r)}return n}function Fl(e,t,n){if(n.hidden)return null;let o=n.type===4||n.type===0||n.type===1||n.type===5,r=document.createElement("div");r.className=o?"bloom-field bloom-field-stack":"bloom-field",r.appendChild(jl(t,n));let i=g.store.plugins[e]??(g.store.plugins[e]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",Jo.push(n.render(a)),r.appendChild(a),r}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??zn(n)??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),r.appendChild(a),r}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??zn(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),r.appendChild(a),r}if(n.type===2){let a=ji(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),r.appendChild(a),r}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[t]??zn(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[t]=n.type===1?Number(a.value):a.value}),r.appendChild(a),r}return r}function Hi(e,t){let n=document.createElement("div");n.className=t?`bloom-plugin-dialog-field ${t}`:"bloom-plugin-dialog-field";let o=document.createElement("div");return o.className="bloom-plugin-dialog-field-label",o.textContent=e,n.appendChild(o),n}function zl(e){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let t=g.store.plugins[e.name]??(g.store.plugins[e.name]={});for(let[n,o]of Qo(e)){if(n==="enabled"||o.type===5)continue;let r=zn(o);r!==void 0&&(t[n]=r)}zi(e)}function Fi(e){e.key==="Escape"&&(!document.getElementById(Jn)&&!document.getElementById(_t)||(e.stopPropagation(),qe()))}function Gl(){Wn||(document.addEventListener("keydown",Fi),Wn=!0)}function Kl(){Wn&&(document.removeEventListener("keydown",Fi),Wn=!1)}function qe(){_l(),Kl(),document.getElementById(Jn)?.remove(),document.getElementById(_t)?.remove()}function zi(e){if(qe(),!document.body)return;let t=document.createElement("div");t.id=Jn,t.className="bloom-plugin-layer",t.addEventListener("pointerdown",ie),t.addEventListener("pointerup",ie),t.addEventListener("click",c=>{c.stopPropagation(),c.target===t&&qe()});let n=document.createElement("div");n.id=_t,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",ie),n.addEventListener("pointerup",ie),n.addEventListener("click",ie);let o=document.createElement("button");o.type="button",o.className="bloom-icon-btn bloom-plugin-dialog-close",o.setAttribute("aria-label","Close"),o.innerHTML=Di(),o.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),qe()});let r=document.createElement("div");r.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=e.name,r.appendChild(i),e.description){let c=document.createElement("p");c.className="bloom-plugin-dialog-sub",c.textContent=e.description,r.appendChild(c)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(o,r,a),e.authors?.length){let c=Hi("Authors"),u=document.createElement("p");u.className="bloom-plugin-dialog-authors",u.textContent=e.authors.join(", "),c.appendChild(u),n.appendChild(c)}let s=Hi("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let d=Qo(e);if(d.length)for(let[c,u]of d){let f=Fl(e.name,c,u);f&&l.appendChild(f)}if(!l.childElementCount){let c=document.createElement("p");c.className="bloom-dialog-empty",c.textContent="No configurable settings.",l.appendChild(c)}if(s.appendChild(l),n.appendChild(s),d.length){let c=document.createElement("div");c.className="bloom-plugin-dialog-footer";let u=document.createElement("button");u.type="button",u.className="bloom-plugin-dialog-reset",u.textContent="Reset",u.addEventListener("click",()=>zl(e)),c.appendChild(u),n.appendChild(c)}t.appendChild(n),document.body.appendChild(t),Gl(),It()}function Ul(e){let t=document.createElement("div");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Ol(e);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=e.name,a.title=e.name,r.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=ci(e.name),d=document.createElement("button");if(d.type="button",d.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,d.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),d.innerHTML=Nl(l),d.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation();let m=di(e.name);ge("pluginStar",{name:e.name,starred:m})}),s.appendChild(d),!e.required){let p=si(e.name),m=document.createElement("button");m.type="button",m.className=`bloom-icon-btn bloom-card-pin${p?" bloom-card-pin-active":""}`,m.setAttribute("aria-label",p?"Unpin from top":"Pin to top"),m.innerHTML=Hl(p),m.addEventListener("click",x=>{x.preventDefault(),x.stopPropagation();let A=li(e.name);ge("pluginPin",{name:e.name,pinned:A})}),s.appendChild(m)}if(ql(e)){let p=document.createElement("button");p.type="button",p.className="bloom-icon-btn bloom-card-settings",p.setAttribute("aria-label",`${e.name} settings`),p.innerHTML=Pl(),p.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation(),zi(e)}),s.appendChild(p)}let c=ji(e.name,Oe(e.name),!!e.required),u=c.querySelector("input");if(u?.addEventListener("click",p=>p.stopPropagation()),u?.addEventListener("change",()=>{pi(e.name)}),s.appendChild(c),o.append(r,s),n.appendChild(o),e.description){let p=document.createElement("div");p.className="bloom-card-desc",p.textContent=e.description,n.appendChild(p)}let f=document.createElement("div");f.className="bloom-card-separator";let L=document.createElement("div");L.className="bloom-card-footer";let E=document.createElement("div");return E.className="bloom-card-author",E.textContent=e.authors?.filter(Boolean).join(", ")||"\xA0",L.appendChild(E),t.append(n,f,L),t}function Gi(){return Object.values(z).filter(e=>!e.hidden&&e.name!=="Settings")}function Ki(e,t){return t==="all"||t==="favorites"?!0:(e.tags??[]).includes(t)}function Vl(e){return`${e.name} ${e.description??""} ${(e.tags??[]).join(" ")}`.toLowerCase()}function Wl(){return Xn.trim()?"No plugins match your search.":se==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function Yl(){let e=Gi();return Rl.filter(t=>t.id==="favorites"||t.id==="all"?!0:e.some(n=>Ki(n,t.id)))}function Jl(){if(Ht){Ht.replaceChildren();for(let e of Yl()){let t=document.createElement("button");t.type="button",t.className=`bloom-plugin-tab${se===e.id?" bloom-plugin-tab-active":""}`,t.textContent=e.label,t.addEventListener("click",()=>{se=e.id,be()}),Ht.appendChild(t)}}}function Xl(){let e=Gi();if(se==="favorites"){let t=new Set(Rn());e=e.filter(n=>t.has(n.name))}else se!=="all"&&(e=e.filter(t=>Ki(t,se)));return Dt==="enabled"&&(e=e.filter(t=>Oe(t.name))),Dt==="disabled"&&(e=e.filter(t=>!Oe(t.name))),e}function be(){if(!Pt)return;Jl();let e=Xl();Vn&&(Vn.placeholder=`Search ${e.length} plugins...`);let t=e,n=Xn.trim().toLowerCase();if(n&&(t=t.filter(o=>Vl(o).includes(n))),se!=="favorites"){let o=An();if(o.length){let r=new Map(o.map((i,a)=>[i,a]));t=t.slice().sort((i,a)=>{let s=r.has(i.name),l=r.has(a.name);return s!==l?s?-1:1:s?(r.get(i.name)??0)-(r.get(a.name)??0):i.name.localeCompare(a.name)})}}Pt.replaceChildren();for(let o of t)Pt.appendChild(Ul(o));Nt&&(Nt.hidden=t.length>0,Nt.textContent=Wl())}function ie(e){e.stopPropagation()}function Yo(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function er(){document.getElementById(G)?.setAttribute("aria-expanded",ae?"true":"false")}function Zl(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function tr(){qe(),Xn="",Dt="all",se="all",document.getElementById(ye)?.remove(),ae=!1,er()}function Ql(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",ie),t.addEventListener("pointerup",ie),t.addEventListener("click",ie);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-titles";let i=document.createElement("div");i.className="bloom-settings-brand";let a=document.createElement("span");a.className="bloom-settings-mark",a.innerHTML=Zn();let s=document.createElement("h2");s.textContent="Bloom++",i.append(a,s);let l=document.createElement("p");l.className="bloom-settings-sub",l.textContent="Toggle features. Some need a reload. Click the sliders icon to configure.",r.append(i,l);let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn",d.setAttribute("aria-label","Close"),d.innerHTML=Di(),d.addEventListener("click",tr),o.append(r,d),n.appendChild(o);let c=document.createElement("div");c.className="bloom-plugin-tabs",n.appendChild(c);let u=document.createElement("div");u.className="bloom-search-bar";let f=document.createElement("input");f.type="search",f.className="bloom-search-input",f.setAttribute("aria-label","Search plugins"),f.placeholder="Search plugins...",f.addEventListener("input",()=>{Xn=f.value,be()});let L=document.createElement("select");L.className="bloom-search-filter",L.setAttribute("aria-label","Filter plugins");for(let m of Al){let x=document.createElement("option");x.value=m.value,x.textContent=m.label,L.appendChild(x)}L.value=Dt,L.addEventListener("change",()=>{Dt=L.value,be()}),u.append(f,L),n.appendChild(u);let E=document.createElement("div");E.className="bloom-plugin-list",n.appendChild(E);let p=document.createElement("p");return p.className="bloom-tab-empty",p.hidden=!0,n.appendChild(p),t.appendChild(n),Pt=E,Nt=p,Vn=f,Bi=L,Ht=c,be(),t}function ec(e){e.classList.add("bloom-rail-dock")}function tc(){let e=document.getElementById(G);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&$n(e)?e:null}function nc(){if(document.getElementById(ye)?.remove(),!document.body)return;let e=Ql(ye);ec(e),document.body.appendChild(e),ae=!0,qe(),It(),er(),ge("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:O,dock:"center",rail:!!tc()})}function nr(){let e=document.getElementById(ye);if(e instanceof HTMLElement&&e.isConnected&&Zl(e)){tr();return}e?.remove(),nc()}function oc(){let e=document.createElement("button");return e.type="button",e.id=G,e.className="bloom-rail-item",e.setAttribute("aria-controls",ye),e.setAttribute("aria-expanded",ae?"true":"false"),e.innerHTML=`<span class="bloom-rail-mark">${Zn()}</span><span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),nr()}),e}function Ii(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function rc(e){let t=e.querySelector("img");if(t instanceof HTMLElement){let n=t.getBoundingClientRect();if(n.width>8&&n.height>8)return t}for(let n of e.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}return null}function ic(e,t){for(let n of e.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||t&&(n===t||n.contains(t)||t.contains(n))||(n.textContent||"").trim().length<2)continue;let r=n.getBoundingClientRect();if(r.width>16&&r.height>8&&r.height<40)return n}return null}function oe(e,t,n){let o=`${n}px`;e.style.getPropertyValue(t)!==o&&e.style.setProperty(t,o)}function Ui(e,t){if(e.classList.contains("bloom-rail-compact"))return;let n=e.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!e.isConnected||!t.isConnected)return;let o=rc(t),r=getComputedStyle(t),i=Number.parseFloat(r.paddingTop),a=Number.parseFloat(r.paddingBottom);if(Number.isFinite(i)&&oe(e,"padding-top",Math.round(i)),Number.isFinite(a)&&oe(e,"padding-bottom",Math.round(a)),o){let s=o.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));oe(n,"width",l),oe(n,"height",Math.max(20,Math.round(s.height)));let d=e.getBoundingClientRect(),c=Math.round(s.left-d.left);c>=0&&c<=40&&oe(e,"padding-left",c);let u=ic(t,o);if(u){let f=u.getBoundingClientRect(),L=n.getBoundingClientRect(),E=Math.round(f.left-L.right);E>=0&&E<=24&&oe(e,"gap",E)}}else{let s=Number.parseFloat(r.paddingLeft),l=Number.parseFloat(r.columnGap||r.gap);Number.isFinite(s)&&oe(e,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&oe(e,"gap",Math.round(l))}_i(e)}function Xo(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function ac(){if(Ot?.isConnected&&X){X.observe(Ot,{childList:!0});return}Zo()}function sc(e){if(Xo(e))return!1;try{if(e.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function lc(e,t){!t||!e||requestAnimationFrame(()=>{if(e.isConnected){Rt=0;return}Rt+=1,Bt=Date.now()+Math.min(8e3,250*2**Math.min(Rt,5))})}function cc(){$e||Date.now()<Bt||($e=requestAnimationFrame(()=>{$e=0,!(Date.now()<Bt)&&(document.getElementById(G)?.isConnected||Yn())}))}function Yn(){if(!document.body)return;X?.disconnect();let e=null,t=!1;try{let n=document.getElementById(G);e=n instanceof HTMLButtonElement?n:oc();let o=Mt(),r=Fo();if(o){let i=zo(o),a=i.parentElement;if(Xo(i)||a&&Xo(a))return;e.isConnected&&e.nextElementSibling===i||(i.before(e),t=!0),Ii(e),Ui(e,o)}else r?(e.parentElement!==r&&(r.appendChild(e),t=!0),Ii(e,!0)):e.isConnected&&!$n(e)&&(e.remove(),e=null)}finally{lc(e,t),ac(),er()}}function Zo(){let e=Mi();!e||!sc(e)||Ot===e&&X||(X?.disconnect(),Ot=e,X=new MutationObserver(()=>{document.getElementById(G)?.isConnected||cc()}),X.observe(e,{childList:!0}))}function dc(){Yn(),Zo(),At===void 0&&(At=window.setInterval(()=>{let e=document.getElementById(G);if(!(e instanceof HTMLElement)||!e.isConnected)Date.now()>=Bt&&Yn();else{Rt=0;let t=Mt();t&&Ui(e,t)}Zo()},Tl))}function uc(){At!==void 0&&(clearInterval(At),At=void 0),$e&&cancelAnimationFrame($e),$e=0,Bt=0,Rt=0,X?.disconnect(),X=null,Ot=null}function mc(e){Fn===e&&re||(re?.disconnect(),Fn=e,re=new MutationObserver(()=>{if(!e.isConnected){re?.disconnect(),re=null,Fn=null;return}Vi(e)}),re.observe(e,{childList:!0}))}function Vi(e){if(mc(e),e.querySelector(`#${Gn}`))return;let t=document.createElement("button");t.type="button",t.id=Gn,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${Zn()}<span>Bloom++</span>`,t.addEventListener("pointerdown",Yo),t.addEventListener("pointerup",Yo),t.addEventListener("click",n=>{Yo(n),nr()}),e.insertBefore(t,e.firstChild)}function jn(){let e=ki();return e?(Vi(e),!0):!1}function fc(e){Ai(e)&&(queueMicrotask(jn),requestAnimationFrame(()=>{jn()}),window.setTimeout(jn,60),window.setTimeout(jn,180))}function pc(){Un?.abort();let e=new AbortController;Un=e,document.addEventListener("click",fc,{signal:e.signal})}function gc(){Un?.abort(),Un=null,re?.disconnect(),re=null,Fn=null}function Wi(){Be(),Dl(()=>{qi(),$i(),Yn(),nr()})}var Yi=h({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[y.p],required:!0,hidden:!0,enabledByDefault:!0,settings:kl,startAt:"HostReady",cleanupSelectors:[`#${Cl}`,`#${G}`,`#${Gn}`,`#${ye}`,`#${Jn}`,`#${_t}`,`#${Kn}`,"#bloom-menu-panel"],start(){qi(),$i(),dc(),pc(),qn?.(),qn=Ni(It),It(),Vo=[Cn("pluginToggle",()=>{ae&&be()}),Cn("pluginPin",()=>{ae&&be()}),Cn("pluginStar",()=>{ae&&be()})]},stop(){uc(),gc(),qn?.(),qn=null;for(let e of Vo)e();Vo=[],tr(),document.getElementById(G)?.remove(),document.getElementById(Gn)?.remove(),document.getElementById(Kn)?.remove(),Oi=null,Ml=null,Pt=null,Nt=null,Vn=null,Bi=null,Ht=null,ae=!1},onSettingsChange:It});var Zi='form[data-type="unified-composer"], form.w-full[data-type]',je=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Qn=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Ji=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Xi=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),hc=/stop streaming|stop generating|停止生成|停止输出|停止响应/;function B(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function ve(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!B(r)))return r;return null}function Qi(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function N(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=Qi(e);return!!(hc.test(n)||/^stop$/i.test(n))}function le(){let t=Array.from(document.querySelectorAll(Zi)).find(B);if(t instanceof HTMLElement)return t;let n=ve(document,je),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function xe(){let e=Array.from(document.querySelectorAll(je));return e.find(B)??e[0]??null}function or(){let e=xe();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function bc(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function ea(e){let t=le();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!B(n))&&e(n))return n;return null}function eo(){let e=le(),t=ve(e,Qn)??ve(document,Qn);return t&&!N(t)?t:ea(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!N(n);let r=Qi(n);return/^(send|send prompt|发送)$/i.test(r)&&!N(n)})}function rr(){let e=eo();return!!e&&bc(e)}function ir(){let e=le(),t=ve(e,Ji,!0)??ve(document,Ji,!0);if(t)return t;let n=ve(e,Xi)??ve(document,Xi);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&B(o)&&N(o))return o}return ea(N)}function Fe(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}var ta="bloom-host-icon",$t="data-bloom-host-rel",ar="not all",sr=0,na=0,yc=400;function oa(e){sr+=1;try{e()}finally{sr-=1}}function to(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function ze(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function ra(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function vc(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function xc(e,t){if(e.lastElementChild===t)return;let n=Date.now();n-na<yc||(na=n,e.appendChild(t))}function wc(e,t){for(let n of e.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===t||to(n)&&(n.getAttribute($t)||n.setAttribute($t,n.rel),n.media!==ar&&(n.media=ar),n.rel!==ta&&(n.rel=ta))}function Ec(e){for(let t of e.querySelectorAll(`link[${$t}]`)){if(!(t instanceof HTMLLinkElement))continue;let n=t.getAttribute($t);n&&(t.rel=n),t.removeAttribute($t),t.media===ar&&t.removeAttribute("media")}}function lr(e,t){let{head:n}=document;!n||!t||oa(()=>{wc(n,e);let o=ra(e),{type:r,sizes:i}=vc(t);o?xc(n,o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function ia(e,t){let{head:n}=document;n&&oa(()=>{ra(e)?.remove(),Ec(n)})}function aa(e,t){let{head:n}=document;if(!n)return null;let o=0,r=new MutationObserver(i=>{if(sr)return;let a=!1,s;for(let l of i){l.type==="attributes"&&l.target instanceof HTMLLinkElement&&(l.target.id===e?a=!0:to(l.target)&&(a=!0,ze(l.target.href)&&(s=l.target.href)));for(let d of l.removedNodes)to(d)&&d.id===e&&(a=!0);for(let d of l.addedNodes)to(d)&&d.id!==e&&(a=!0,ze(d.href)&&(s=d.href))}a&&(o||(o=requestAnimationFrame(()=>{o=0,t(s)})))});return r.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),r}var sa=/\/c\/([a-zA-Z0-9_-]{8,})/i;function D(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=d=>{let c=n.indexOf(d);return c>=0&&n[c+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(d,c)=>{try{return document.querySelector(d)?.getAttribute(c)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function Ge(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function qt(e){if(!e)return"";try{return(/^https?:/i.test(e)?new URL(e,location.origin).pathname:e).match(sa)?.[1]??""}catch{return e.match(sa)?.[1]??""}}function no(){let e=qt(location.pathname);if(e)return e;let n=D().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return""}function Sc(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!B(t))&&(N(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function Lc(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&B(e))}function Cc(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&B(e))}function Tc(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function ce(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function _(){if(ir()||Sc())return!0;let e=eo();return e&&B(e)&&!N(e)?!1:!!(Lc()||Cc()||Tc())}var kc=["original","badge","dot","hole","bg"],da=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],ua={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},oo="#FCFCFC",Mc="#111111",la="#111111",Ac="#ffffff",Rc="#212121",Pc="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Nc={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},ro=32,ca=64;function ma(e){return typeof e=="string"&&kc.includes(e)}function Hc(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function io(e){let t=document.createElement("canvas");t.width=ro,t.height=ro;let n=t.getContext("2d");return n?(n.scale(ro/ca,ro/ca),e(n),t.toDataURL("image/png")):""}function Ic(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function ao(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(Pc);n&&(e.strokeStyle=Mc,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function Oc(e,t,n){let o=ua[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=la,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=la,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=Ac,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function jt(e,t){if(e==="original")return t==="wait"?io(o=>ao(o,oo)):Hc(Nc[t]);let n=t==="wait"?void 0:ua[t];return io(e==="hole"?o=>ao(o,n??oo):e==="bg"?o=>{o.fillStyle=n??Rc,Ic(o,0,0,64,64,14),o.fill(),ao(o,oo,!1)}:o=>{ao(o,oo),t!=="wait"&&Oc(o,t,e==="dot"?"dot":"badge")})}function fa(e){return{wait:jt(e,"wait"),rotate:jt(e,"rotate"),done:jt(e,"done"),ready:jt(e,"ready"),error:jt(e,"error")}}var Bc=new S("ChatStateFavicons"),Ee="bloom-chat-state-favicon",ba=v({style:{type:3,description:"Favicon overlay",options:da}}),Ue="",lo={wait:"",rotate:"",done:"",ready:"",error:""},co="wait",zt=!1,Z=!1,$=null,Gt="",Kt="",Ut=!0,Ft=null,Ve=0,Ke,so=null,we=null,cr=null,Vt=!1,pa=new WeakSet,Dc=400;function _c(){let e=ba.store.style;return ma(e)?e:"bg"}function $c(){let t=document.querySelector(`link[rel~="icon"]:not(#${Ee})`)?.href;return ze(t)?t:ze(Ue)?Ue:""}function q(e){if(co===e){let t=document.getElementById(Ee);if(t instanceof HTMLLinkElement&&t.getAttribute("href")===lo[e])return}co=e,lr(Ee,lo[e])}function ga(){lo=fa(_c()),q(co)}function qc(){let e=D(),t=e?Ge(e):Ge("");return _()?(!Gt&&t&&(Gt=t),Gt||t):(Gt="",t)}function ya(){zt=!1,Z=!1,$=null,Gt=""}function jc(e){Kt=e,ya(),Ut=!1,q("wait")}function va(){if(!Vt)return;let e=D()||location.pathname;if(Kt&&e&&Kt!==e){jc(e);return}e&&(Kt=e);let t=qc(),n=_(),o=or(),r=rr();if(ce()&&!n){q("error"),zt=!1,Z=!1,$=null;return}if(n){zt=!0,Z=!1,$=t,q("rotate");return}if(zt){let i=!!$&&!!t&&$===t;if(zt=!1,i){Z=!0,$=t,q("done");return}Z=!1,$=null}if(Z)if(!!($&&t&&$!==t))Z=!1,$=null;else if(o){q("done");return}else if(Ut){Z=!1,q("ready");return}else{Z=!1,q("wait");return}$=null,q(o?"wait":Ut?"ready":"wait")}function xa(){let e=le();if(!(we&&cr===e&&e.isConnected)){if(we?.disconnect(),cr=e,!e||e===document.body){we=null;return}we=new MutationObserver(()=>uo()),we.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function uo(){!Vt||Ve||(Ve=requestAnimationFrame(()=>{Ve=0,Vt&&(wa(),xa(),va())}))}function ha(){Ut=!0,uo()}function wa(){let e=xe();!e||pa.has(e)||(pa.add(e),e.addEventListener("input",ha,{passive:!0}),e.addEventListener("compositionend",ha,{passive:!0}))}var Ea=h({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[y.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:ba,startAt:"DOMContentLoaded",cleanupSelectors:[`#${Ee}`],start(){Vt=!0,Ue=$c()||Ue,ga(),so?.disconnect(),so=aa(Ee,e=>{ze(e)&&(Ue=e),lr(Ee,lo[co])}),Ft?.abort(),Ft=new AbortController,window.addEventListener("popstate",uo,{signal:Ft.signal}),wa(),xa(),Ke!==void 0&&clearInterval(Ke),Ke=setInterval(uo,Dc),va(),Bc.debug("favicon watch started")},stop(){Vt=!1,Ve&&cancelAnimationFrame(Ve),Ve=0,Ke!==void 0&&(clearInterval(Ke),Ke=void 0),Ft?.abort(),Ft=null,we?.disconnect(),we=null,cr=null,so?.disconnect(),so=null,ya(),Kt="",Ut=!0,ia(Ee,Ue)},onSettingsChange:ga});var Sa=`.bloom-ih-hud {
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
`;var La=new S("InputHistory"),dr=/\u200B/g,Ca=10,Ta=500,ka=100,zc=8,Gc=120,Kc=2e3,mo=10,fo=v({maxEntries:{type:4,description:"Max stored prompts",min:Ca,max:Ta,default:ka},history:{type:5,description:"Stored prompts",render:ad},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),ur=new Map,C=0,mr="",K=!1,Yt=!1,gr=0,Wt=null,fr,hr=null,Ma=!0;function j(){let e=fo.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Aa(e){let t=Ie(Number(fo.store.maxEntries??ka),Ca,Ta);return e.length>t?e.slice(e.length-t):e}function po(e){fo.store.entries=Aa(e)}function Uc(e){return e.replaceAll(dr,"").replace(/\n$/,"").trim()}function pr(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(je);return n instanceof HTMLElement?n:xe()}function Vc(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!Fe(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(dr,"").trim().length===0,last:i.toString().replaceAll(dr,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Ra(e,t){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch(i){La.debug("pm caret failed:",i)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function Pa(e){clearTimeout(fr),fr=setTimeout(()=>{if(e!==gr)return;Yt=!1;let t=hr;t&&Ra(t,Ma)},Gc)}function Na(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),Yt=!0,hr=e,Ma=n;let i=++gr;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(a){La.debug("insertText failed:",a),e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),Ra(e,n),Pa(i)}function Wc(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function We(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Yc(){document.querySelector(".bloom-ih-hud")?.remove()}function Jc(e,t){let n=Wc();n.textContent=e;let o=(t.closest("form")??le()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-zc)}px`,n.classList.add("bloom-ih-hud-on")}function br(e){let t=Uc(e);if(!t)return;let n=Date.now(),o=ur.get(t);if(o&&n-o<Kc)return;ur.set(t,n);let r=j().filter(i=>i!==t);r.push(t),po(r),C=j().length,K=!1,We()}function Xc(e,t){let n=j();if(!n.length&&e)return;C>=n.length&&(mr=Fe(t),C=n.length);let o=e?C-1:C+1;o<0||o>n.length||(C=o,K=!0,Na(t,o===n.length?mr:n[o],e),o<n.length?Jc(`${o+1} / ${n.length}`,t):We())}function Zc(e){K=!1,We(),Na(e,mr,!1),C=j().length}function Qc(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=pr(e.target)??pr(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&K&&!e.altKey&&!e.shiftKey){Zc(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){br(Fe(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=j();if(!o){let i=Vc(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||C<=0)||!n&&C>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),Xc(n,t))}function ed(e){if(pr(e.target)){if(Yt){Pa(gr);return}K&&(K=!1,We(),C=j().length)}}function td(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(je);n instanceof HTMLElement&&br(Fe(n))}function nd(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(Qn);if(!n||!(n instanceof HTMLElement)||N(n))return;let o=xe();o&&br(Fe(o))}function od(e){if(!(!K||Yt)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}K=!1,We()}}function rd(){if(Wt)return;Wt=new AbortController;let{signal:e}=Wt,t={capture:!0,signal:e};window.addEventListener("keydown",Qc,t),window.addEventListener("input",ed,t),window.addEventListener("submit",td,t),window.addEventListener("click",nd,t),window.addEventListener("pointerdown",od,t)}function id(e){let t=j().slice();t.splice(e,1),po(t),C>t.length&&(C=t.length)}function ad(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=j().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(m=>m.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/mo));n>=l&&(n=l-1);let d=s.slice(n*mo,n*mo+mo);e.replaceChildren();let c=document.createElement("input");if(c.className="bloom-ih-search",c.type="search",c.placeholder="Search history",c.autocomplete="off",c.value=t,c.addEventListener("input",()=>{t=c.value,n=0,r()}),e.appendChild(c),d.length){let m=document.createElement("div");m.className="bloom-ih-list",d.forEach((x,A)=>{let P=i.indexOf(x),wt=j().length-1-P,J=document.createElement("div");J.className="bloom-ih-item";let I=document.createElement("button");I.type="button",I.className=`bloom-ih-body${o===A?"":" bloom-ih-clamp"}`,I.textContent=x,I.addEventListener("click",()=>{o=o===A?-1:A,r()});let Et=document.createElement("div");Et.className="bloom-ih-actions";let Ne=document.createElement("button");Ne.type="button",Ne.title="Copy",Ne.textContent="C",Ne.addEventListener("click",()=>{ni(x)});let pe=document.createElement("button");pe.type="button",pe.title="Delete",pe.textContent="\xD7",pe.addEventListener("click",()=>{id(wt),r()}),Et.append(Ne,pe),J.append(I,Et),m.appendChild(J)}),e.appendChild(m)}else{let m=document.createElement("p");m.className="bloom-ih-empty",m.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(m)}let u=document.createElement("div");u.className="bloom-ih-pager";let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Prev",f.disabled=n<=0,f.addEventListener("click",()=>{n-=1,r()});let L=document.createElement("span");L.textContent=`${n+1} / ${l}`;let E=document.createElement("button");E.type="button",E.className="bloom-ih-btn",E.textContent="Next",E.disabled=n+1>=l,E.addEventListener("click",()=>{n+=1,r()});let p=document.createElement("button");p.type="button",p.className="bloom-ih-clear",p.textContent="Clear all",p.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(po([]),C=0,r())}),u.append(f,L,E,p),e.appendChild(u)};return r(),()=>{e.replaceChildren()}}var Ha=h({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[y.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:fo,startAt:"HostReady",managedStyle:"inputHistory",start(){w("inputHistory",Sa),C=j().length,K=!1,rd()},stop(){Wt?.abort(),Wt=null,We(),Yc(),ur.clear(),clearTimeout(fr),Yt=!1,hr=null,K=!1},onSettingsChange(){let e=j(),t=Aa(e);t.length!==e.length&&po(t),C>t.length&&(C=t.length)}});var yr="noShareLink",sd=['button[data-testid="share-chat-button"]'],ld=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],vr=v({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Ia(e){return`${e.join(",")}{display:none!important}`}function Oa(){let e=[];if(vr.store.hideShareChat!==!1&&e.push(Ia(sd)),vr.store.hideShareProject!==!1&&e.push(Ia(ld)),!e.length){b(yr);return}w(yr,e.join(`
`))}var Ba=h({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[y.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:vr,start:Oa,onSettingsChange:Oa,stop(){b(yr)}});var $a="noDictation",cd=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]'],dd=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],qa=v({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Da(e){return`${e.join(",")}{display:none!important}`}function _a(){let e=[Da(cd)];qa.store.hideDictationSettings!==!1&&e.push(Da(dd)),w($a,e.join(`
`))}var ja=h({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[y.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:qa,start:_a,onSettingsChange:_a,stop(){b($a)}});var xr="noSidebarIdentity",Ye=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],wr=Ye.flatMap(e=>[`${e} .min-w-0 > .truncate`,`${e} .min-w-0.flex-1 .truncate`]),Ka=Ye.flatMap(e=>[`${e} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),ud=[...wr,...Ka],Fa=[...wr,...Ye.flatMap(e=>[`${e} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],md=Ye.map(e=>`${e} a[href^="mailto:"]`),fd=Ye.flatMap(e=>[`${e} .min-w-0 > :not(.truncate)`,`${e} .min-w-0 > :not(.truncate) *`,`${e} .min-w-0 .text-xs`,`${e} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${e} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${e} .text-xs:not(.truncate)`,`${e} .text-token-text-secondary:not(.truncate)`,`${e} .text-token-text-tertiary:not(.truncate)`,`${e} .min-w-0 ~ *`,`${e} .min-w-0 ~ * *`,`${e} > .text-xs`,`${e} > .text-token-text-secondary`,`${e} > .text-token-text-tertiary`]),pd=Ye.flatMap(e=>[`${e} .min-w-0.flex-col > :not(.truncate)`,`${e} .min-w-0.flex-col > .text-xs`,`${e} .min-w-0.flex-col > .text-token-text-secondary`,`${e} .min-w-0.flex-col > .text-token-text-tertiary`,`${e} .min-w-0:not(.flex) > :not(.truncate)`,`${e} .min-w-0:not(.flex) > .text-xs`,`${e} .min-w-0:not(.flex) > .text-token-text-secondary`,`${e} .min-w-0:not(.flex) > .text-token-text-tertiary`]),Jt=v({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function za(e){return`${e.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function gd(e){return`${e.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function hd(){return`${pd.join(",")}{margin-block:auto!important}`}function bd(){return`${fd.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function Ga(){let e=Jt.store.hideUsername!==!1,t=Jt.store.hideEmail!==!1,n=e&&Jt.store.enlargePlan!==!1,o=e&&Jt.store.alignPlanWithAvatar===!0,r=[];if(e&&(o?(r.push(gd(n?Fa:[...Fa,...Ka])),r.push(hd())):r.push(za(n?wr:ud))),t&&r.push(za(md)),n&&r.push(bd()),!r.length){b(xr);return}w(xr,r.join(`
`))}var Ua=h({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[y.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Jt,start:Ga,onSettingsChange:Ga,stop(){b(xr)}});var Va=`#bloom-rt-host {
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
`;var Ja=new S("RecentTopics"),Ze="bloom-rt-host",Xa="home",Za=/^\/c\/([a-z0-9_-]{8,})/i,vd=/\/c\/([a-z0-9_-]{8,})/i,Qa=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,xd=new Set(["Backquote","IntlBackslash"]),wd=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Ed=140,Sd=[3,4,5,6,7,8,9,10,11,12].map(e=>({label:String(e),value:String(e),default:e===5})),T=v({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Sd},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),go=null,Er=null,H=!1,nn=!1,Xt=!1,U=0,Se="",Je=null,Zt=null,Xe;function Ld(){let e=Number(T.store.maxRecent??5);return Number.isFinite(e)&&e>=3&&e<=12?e:5}function Qt(){let e=T.plain.visits;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Sr(){let e=T.plain.titles;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function es(){let e=T.plain.previews;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Lr(){let e=T.plain.projects;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function bo(e){let t=Ld();return e.length>t?e.slice(0,t):e}function V(e){return e===Xa}function en(e,t=Ed){let n=e.replace(/\s+/g," ").trim();return n.length<=t?n:`${n.slice(0,t-1)}\u2026`}function Cr(e){if(!e)return"";try{return new URL(e,location.origin).pathname.match(Za)?.[1]??""}catch{return e.match(vd)?.[1]??""}}function Le(){let e=(location.pathname||"/").match(Za);if(e?.[1])return e[1];let n=D().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return Xa}function Tr(e){if(V(e))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${e}"]`);for(let o of n){if(Cr(o.getAttribute("href")||"")!==e)continue;let r=en(o.textContent||"",80);if(r)return r}}catch{}let t=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return Le()===e&&t&&!/^ChatGPT$/i.test(t)?en(t,80):""}function Cd(e){return V(e)?"New chat":Sr()[e]||Tr(e)||"Chat"}function Td(e){return Lr()[e]||""}function kd(e){return es()[e]||{}}function ts(e,t){if(!e||V(e)||!t)return;let n=Sr();n[e]!==t&&(n[e]=t,T.store.titles=n)}function Md(e,t){if(!e||V(e)||!t)return;let n=Lr();n[e]!==t&&(n[e]=t,T.store.projects=n)}function Ad(e,t){if(!e||V(e)||!t.user&&!t.assistant)return;let n=es(),o=n[e]||{},r={user:t.user||o.user,assistant:t.assistant||o.assistant};o.user===r.user&&o.assistant===r.assistant||(n[e]=r,T.store.previews=n)}function kr(e){if(!e||V(e)&&T.store.includeHome===!1)return;let t=Qt().filter(n=>n!==e);t.unshift(e),T.store.visits=bo(t)}function yo(){let e=T.store.includeHome!==!1;return bo(Qt().filter(n=>e||!V(n))).map(n=>({id:n,title:Cd(n),project:Td(n),preview:kd(n)}))}function Wa(e){try{let t=document.querySelectorAll(`[data-message-author-role="${e}"]`),n=t[t.length-1];if(!(n instanceof HTMLElement))return"";let o=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||o.push(a)}let r=o.length?o.join(" "):n.textContent||"";return en(r)}catch{return""}}function tn(e){if(!e||V(e)||e!==Le())return;let t=Tr(e);t&&ts(e,t);let n=Wa("user"),o=Wa("assistant");Ad(e,{user:n,assistant:o});let r=os(e);if(r){let i=ns(r);i&&Md(e,i)}}function Mr(){let e=Sr(),t=Lr(),n=[],o=new Set,r=!1,i=!1;try{for(let d of document.querySelectorAll('a[href*="/c/"]')){if(d.closest(`#${Ze}, #bloom-root, #bloom-sidebar-panel`))continue;let c=Cr(d.getAttribute("href")||"");if(!c||o.has(c))continue;o.add(c),n.push(c);let u=en(d.textContent||"",80);u&&!Qa.test(u)&&e[c]!==u&&(e[c]=u,r=!0);let f=ns(d);f&&t[c]!==f&&(t[c]=f,i=!0)}}catch{}r&&(T.store.titles=e),i&&(T.store.projects=t);let a=Qt(),s=new Set(a),l=n.filter(d=>!s.has(d));l.length&&(T.store.visits=bo([...a,...l]))}function ns(e){let t=e.parentElement;for(let n=0;n<10&&t;n++){if(t.id==="bloom-rt-host"||t.id==="bloom-root"){t=t.parentElement;continue}let o=t.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),r=en((o instanceof HTMLElement?o.textContent:"")||"",60);if(r&&!Qa.test(r)&&!/^20\d{2}/.test(r)&&r!==e.textContent?.trim()&&t.querySelector('a[href^="/c/"]'))return r;t=t.parentElement}return""}function os(e){if(V(e)){let t=document.querySelector('[data-testid="create-new-chat-button"]');return t instanceof HTMLAnchorElement?t:document.querySelector('a[href="/"]')}try{for(let t of document.querySelectorAll(`a[href*="/c/${e}"]`))if(Cr(t.getAttribute("href")||"")===e)return t}catch{}return null}function Rd(e){let t=os(e);if(t){t.click();return}if(V(e)){location.assign("/");return}location.assign(`/c/${e}`)}function Pd(){let e=Le();Se&&Se!==e&&tn(Se),Se=e,kr(e),Mr();let t=Tr(e);t&&ts(e,t),tn(e)}function ho(){Xe===void 0&&(Xe=window.setTimeout(()=>{Xe=void 0,Pd()},120))}function Nd(){Je||(Je=history.pushState.bind(history),Zt=history.replaceState.bind(history),history.pushState=function(...t){let n=Je(...t);return ho(),n},history.replaceState=function(...t){let n=Zt(...t);return ho(),n})}function Hd(){Je&&(history.pushState=Je),Zt&&(history.replaceState=Zt),Je=null,Zt=null}function Id(e){return xd.has(e.code)||e.keyCode===192?!0:wd.has(e.key)}function rs(e){return e.key==="Control"||e.code==="ControlLeft"||e.code==="ControlRight"}function Od(e,t){nn=t,Mr(),tn(Le()),H=!0,U=0;try{let n=Le();kr(n);let o=yo();o.length>1&&(U=e?o.length-1:1)}catch(n){Ja.error("Failed to open switcher:",n)}on()}function Ya(e){let{length:t}=yo();t&&(U=(U+(e?-1:1)+t)%t,on())}function Ar(){if(!H)return;let e=yo()[U];H=!1,nn=!1,on(),e&&Rd(e.id)}function is(){H&&(H=!1,nn=!1,on())}function Bd(e){if(rs(e)){Xt=!0;return}if((e.ctrlKey||Xt)&&!e.altKey&&!e.metaKey&&Id(e)&&!e.repeat){e.preventDefault(),e.stopImmediatePropagation();try{H?Ya(e.shiftKey):Od(e.shiftKey,!0)}catch(n){Ja.error("Hotkey failed:",n)}return}if(H){if(e.key==="Escape"){e.preventDefault(),is();return}if(e.key==="Enter"&&!e.shiftKey){e.preventDefault(),Ar();return}e.key==="Tab"&&(e.ctrlKey||Xt)&&(e.preventDefault(),Ya(e.shiftKey))}}function Dd(e){rs(e)&&(Xt=!1,H&&nn&&Ar())}function _d(e){let t=e.target instanceof Element?e.target:null;!t||!t.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(ho)}function $d(e){!H||(e.target instanceof Element?e.target:null)?.closest(`#${Ze}`)||is()}function qd(){document.visibilityState==="hidden"&&tn(Le())}function jd(){if(!document.body)return null;let e=document.getElementById(Ze);if(e instanceof HTMLElement)return Er=e,e;e=document.createElement("div"),e.id=Ze;let t=document.createElement("div");return t.className="bloom-rt-panel",t.setAttribute("role","listbox"),t.setAttribute("aria-label","Recent conversations"),t.dataset.visible="false",t.addEventListener("click",n=>n.stopPropagation()),e.append(t),document.body.append(e),Er=e,e}function on(){let e=jd();if(!e)return;let t=e.querySelector(".bloom-rt-panel");if(!t)return;if(!H){t.dataset.visible="false",t.replaceChildren();return}let n=yo();if(!n.length){t.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",t.replaceChildren(i);return}U>=n.length&&(U=0);let o=document.createElement("div");o.className="bloom-rt-list",o.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===U?"true":"false",s.setAttribute("aria-selected",a===U?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let d=document.createElement("div");d.className="bloom-rt-project",d.textContent=i.project,s.append(d)}if(i.preview.user||i.preview.assistant){let d=document.createElement("div");if(d.className="bloom-rt-preview",i.preview.user){let c=document.createElement("div");c.className="bloom-rt-line",c.dataset.role="user",c.textContent=i.preview.user,d.append(c)}if(i.preview.assistant){let c=document.createElement("div");c.className="bloom-rt-line",c.dataset.role="assistant",c.textContent=i.preview.assistant,d.append(c)}s.append(d)}s.addEventListener("click",()=>{U=a,Ar()}),o.append(s)}),t.replaceChildren(o),t.dataset.visible="true",t.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function Fd(){document.getElementById(Ze)?.remove(),Er=null}var as=h({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[y.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${Ze}`],settings:T,start(){w("recentTopics",Va),Se=Le(),kr(Se),Mr(),tn(Se),Nd(),go=new AbortController;let{signal:e}=go;window.addEventListener("keydown",Bd,{capture:!0,signal:e}),window.addEventListener("keyup",Dd,{capture:!0,signal:e}),window.addEventListener("popstate",ho,{signal:e}),document.addEventListener("click",_d,{capture:!0,signal:e}),document.addEventListener("click",$d,{signal:e}),document.addEventListener("visibilitychange",qd,{signal:e})},stop(){go?.abort(),go=null,Xe!==void 0&&(clearTimeout(Xe),Xe=void 0),Hd(),H=!1,nn=!1,Xt=!1,Fd()},onSettingsChange(){let e=bo(Qt());e.length!==Qt().length&&(T.store.visits=e),H&&on()}});var Rr="cleaner",zd=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],Gd=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],Kd=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],Ud=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],Vd=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]'],Wd=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],Ce=v({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function Qe(e){return`${e.join(",")}{display:none!important}`}function ss(){let e=[];if(Ce.store.hideDownloadApps!==!1&&e.push(Qe(zd)),Ce.store.hideDisclaimer!==!1&&e.push(Qe(Gd)),Ce.store.hideUpgrade!==!1&&e.push(Qe(Kd)),Ce.store.hideLockedModels!==!1&&e.push(Qe(Ud)),Ce.store.hideHomePromo!==!1&&e.push(Qe(Vd)),Ce.store.hideAds!==!1&&e.push(Qe(Wd)),!e.length){b(Rr);return}w(Rr,e.join(`
`))}var ls=h({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[y.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Ce,start:ss,onSettingsChange:ss,stop(){b(Rr)}});var vo=new S("ResponseNotification"),Yd=400,Jd=3,rt=v({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:ou},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Pr=!1,Me=!1,Te=0,ke="",ot=!1,rn="",et,tt=null,nt=null;function cs(){return Ge(D())}function Xd(){return document.visibilityState==="hidden"||document.hidden}function Zd(){return rt.store.onlyWhenHidden===!1?!0:Xd()}function Qd(){let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function ds(){try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!nt||nt.state==="closed")&&(nt=new e);let t=nt,n=t.currentTime,o=[523.25,659.25];for(let r=0;r<o.length;r++){let i=t.createOscillator(),a=t.createGain();i.type="sine",i.frequency.value=o[r];let s=n+r*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(t.destination),i.start(s),i.stop(s+.24)}t.resume?.()}catch(e){vo.debug("chime failed",e)}}function eu(e){try{let t=new Audio(e);t.volume=.7,t.play()}catch(t){vo.debug("custom sound failed",t),ds()}}function us(){let e=String(rt.store.soundUrl||"").trim();e?eu(e):ds()}function tu(){let e="Bloom++",t=`${Qd()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:e,text:t,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(e,{body:t,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){vo.debug("notification failed",n)}}function nu(){Zd()&&(rt.store.sound!==!1&&us(),rt.store.browserNotification!==!1&&tu())}function ou(e){let t=document.createElement("button");return t.type="button",t.textContent="Play",t.addEventListener("click",()=>us()),e.appendChild(t),()=>{t.remove()}}function ru(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest("button");n instanceof HTMLElement&&N(n)&&(ot=!0)}function iu(){if(!Pr)return;let e=D()||location.pathname;if(rn&&e&&rn!==e){Me=!1,Te=0,ke="",ot=!1,rn=e;return}rn=e;let t=_(),n=cs();if(t){Me=!0,Te=0,ke=n;return}if(!Me||(Te+=1,Te<Jd))return;let o=!!ke&&ke===n,r=ot,i=ce();Me=!1,Te=0,ot=!1,ke="",!(!o||r||i)&&nu()}var ms=h({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[y.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:rt,start(){Pr=!0,Me=_(),Te=0,ke=Me?cs():"",ot=!1,rn=D()||location.pathname,tt?.abort(),tt=new AbortController,document.addEventListener("click",ru,{capture:!0,signal:tt.signal}),et!==void 0&&clearInterval(et),et=setInterval(iu,Yd),rt.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:tt.signal}),vo.debug("watch started")},stop(){Pr=!1,et!==void 0&&(clearInterval(et),et=void 0),tt?.abort(),tt=null,Me=!1,Te=0,ke="",ot=!1;try{nt?.close()}catch{}nt=null}});var fs=`.bloom-cls {
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
`;var bs=new S("ChatListStatus"),ps="chatListStatus",Eo="bloom-cls",su="bloom-cls",lu=500,cu=1200*1e3,du="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",ue=new Map,me=!1,at="",an=!1,it,lt=0,de=null,Hr=null,st=null,ct=null,xo=null,sn=null,ln=!1;function wo(){return Date.now()}function uu(){return typeof unsafeWindow<"u"?unsafeWindow:window}function ys(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function mu(e,t){return!(t!=="POST"||!/\/backend-api\/(?:f\/)?conversation(?:\/|\?|$)/i.test(e)||/\/backend-api\/conversations(?:\/|\?|$)/i.test(e))}function fu(e){try{if(typeof e=="string")return e;if(e instanceof URL)return e.href;if(typeof Request<"u"&&e instanceof Request)return e.url}catch{}return String(e)}function vs(e){return e?e.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function pu(e){return typeof e=="string"?vs(e):""}function W(e,t,n,o=!0){if(!(!e||!me)){if(t==="idle")ue.delete(e);else{let r=ue.get(e);r&&r.kind===t&&n!=="net"?r.at=wo():ue.set(e,{kind:t,at:wo(),source:n})}o&&gu({v:1,id:e,kind:t,at:wo()}),So()}}function gu(e){try{st?.postMessage(e)}catch{}}function hu(e){let t=e.data;!t||t.v!==1||!t.id||t.kind!=="streaming"&&t.kind!=="done"&&t.kind!=="error"&&t.kind!=="idle"||W(t.id,t.kind,"bc",!1)}function bu(){let e=wo();for(let[t,n]of ue)n.kind==="streaming"&&e-n.at>cu&&ue.delete(t)}function yu(){let e=ys();if(!e)return[];let t=[],n=new Set;try{for(let o of e.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(o.closest(du))continue;let r=qt(o.getAttribute("href")||"");!r||n.has(r)||(n.add(r),t.push(o))}}catch{}return t}function gs(e){let t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),e==="streaming")t.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("cx","12"),o.setAttribute("cy","12"),o.setAttribute("r","9"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","2"),t.appendChild(o)}return t.appendChild(n),t}function Nr(e){let t=e.querySelector(`:scope > .${Eo}`);return t||null}function vu(){if(!me)return;bu();let e=no(),t=yu();de?.disconnect();try{for(let n of t){let o=qt(n.getAttribute("href")||"");if(!o||!e||o!==e){Nr(n)?.remove();continue}let i=ue.get(o)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){Nr(n)?.remove();continue}let a=Nr(n);a||(a=document.createElement("span"),a.className=Eo,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(gs("streaming")):i==="error"&&a.appendChild(gs("error")))}}catch(n){bs.debug("paint failed",n)}xs()}function So(){!me||lt||(lt=requestAnimationFrame(()=>{lt=0,me&&vu()}))}function xs(){let e=ys();if(!(de&&Hr===e&&e?.isConnected)){if(de?.disconnect(),Hr=e,!e){de=null;return}de=new MutationObserver(()=>So()),de.observe(e,{childList:!0,subtree:!0})}}async function xu(e,t){let n=t,o=!e.ok,r=e.body;if(!r){n&&W(n,o?"error":"done","net");return}let i=r.getReader(),a=new TextDecoder,s="";try{for(;me;){let{done:l,value:d}=await i.read();if(l)break;if(s+=a.decode(d,{stream:!0}),!n){let c=vs(s);c&&(n=c,ln=!1,W(n,"streaming","net"))}/\[DONE\]/.test(s)||/"error"\s*:\s*\{/.test(s)?(/"error"\s*:\s*\{/.test(s)&&(o=!0),s=s.slice(-64)):s.length>8192&&(s=s.slice(-2048))}}catch{o=!0}n&&W(n,o?"error":"done","net")}function wu(e,t,n){let o=fu(t),r=(n?.method||(typeof Request<"u"&&t instanceof Request?t.method:"GET")||"GET").toUpperCase(),i=mu(o,r),a="";return i&&(a=pu(n?.body)||qt(o)||no(),a?W(a,"streaming","net"):ln=!0),e(t,n).then(s=>{if(!i)return s;try{let l=s.clone();xu(l,a)}catch{a&&W(a,s.ok?"done":"error","net")}return s},s=>{throw i&&a&&W(a,"error","net"),s})}function Eu(){if(ct)return;let e=uu();sn=e,ct=e.fetch.bind(e);let t=(n,o)=>wu(ct,n,o);xo=t,e.fetch=t}function Su(){!ct||!sn||(xo&&sn.fetch===xo&&(sn.fetch=ct),ct=null,xo=null,sn=null)}function hs(){if(!me)return;let e=no();if(at&&e&&at!==e){let n=ue.get(at);n?.kind==="streaming"&&n.source==="local"&&W(at,ce()?"error":"done","local"),an=!1}if(at=e,_()){an=!0,e&&W(e,"streaming","local"),So();return}an&&(an=!1,e&&W(e,ce()?"error":"done","local")),ln=!1,So()}var ws=h({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[y.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Eo}`],start(){me=!0,w(ps,fs);try{st=new BroadcastChannel(su)}catch{st=null}st?.addEventListener("message",hu),Eu(),xs(),it!==void 0&&clearInterval(it),it=setInterval(hs,lu),hs(),bs.debug("sidebar status watch started")},stop(){me=!1,lt&&cancelAnimationFrame(lt),lt=0,it!==void 0&&(clearInterval(it),it=void 0),de?.disconnect(),de=null,Hr=null,Su();try{st?.close()}catch{}st=null,ue.clear(),ln=!1,an=!1,at="",document.querySelectorAll(`.${Eo}`).forEach(e=>e.remove()),b(ps)}});var Ss="widerChat",Ls=40,Cs=96,Ts=64,ks=v({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:Ls,max:Cs,default:Ts}});function Lu(){return Ie(Number(ks.store.width??Ts),Ls,Cs)}function Es(){let e=Lu();w(Ss,`:root{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important}[class*="--thread-content-max-width"]{--thread-content-max-width:${e}rem!important}[class*="thread-content-max-width"]{max-width:min(100%,${e}rem)!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"]{max-width:min(100%,${e}rem)!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:min(100%,${e}rem)!important}`)}var Ms=h({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[y.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:ks,start:Es,onSettingsChange:Es,stop(){b(Ss)}});var As=`.bloom-ts {
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
`;function Lo(e){if(typeof e=="number"&&Number.isFinite(e)&&e>0)return e>1e12?e:Math.round(e*1e3);if(typeof e=="string"){let t=e.trim();if(!t)return null;if(/^\d+(\.\d+)?$/.test(t))return Lo(Number(t));let n=Date.parse(t);return Number.isFinite(n)?n:null}return null}function Rs(e,t,n=Date.now()){let o=new Date(e);if(Number.isNaN(o.getTime()))return"";let r=new Date(n),i=o.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(o.toDateString()===r.toDateString()||!t)return i;let s=o.getFullYear()===r.getFullYear();return`${o.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Ps(e){try{return new Date(e).toISOString()}catch{return""}}var Bs=new S("MessageTimestamps"),Ns="messageTimestamps",To="bloom-ts",Hs=1500,Tu="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",ft=v({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),pt=new Map,Ae=!1,ut=0,dt,fe=null,Ir=null,mt=null,Co=null,cn=null,Is=!1;function ku(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Ds(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function Br(){let e=ft.plain.stamps;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function _s(){let e={...Br()};for(let[n,o]of pt)e[n]=o;let t=Object.keys(e);if(t.length>Hs){let n=t.slice(t.length-Hs),o={};for(let r of n)o[r]=e[r];ft.store.stamps=o;return}ft.store.stamps=e}var Mu=oi(_s,500);function Or(e,t){!e||!t||pt.get(e)===t||(pt.set(e,t),Mu(),un())}function Au(e){return e?pt.get(e)??Br()[e]??null:null}function Ru(e){try{if(typeof e=="string")return e;if(e instanceof URL)return e.href;if(typeof Request<"u"&&e instanceof Request)return e.url}catch{}return String(e)}function Pu(e,t){return t!=="GET"||/\/backend-api\/conversations(?:\/|\?|$)/i.test(e)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(e)}function Nu(e,t){return t!=="POST"||/\/backend-api\/conversations(?:\/|\?|$)/i.test(e)?!1:/\/backend-api\/(?:f\/)?conversation(?:\/|\?|$)/i.test(e)}function dn(e,t=0){if(!Ae||t>6||!e||typeof e!="object")return;if(Array.isArray(e)){for(let a of e)dn(a,t+1);return}let n=e,o=n.message;if(o&&typeof o=="object"&&!Array.isArray(o)){let a=o,s=typeof a.id=="string"?a.id:"",l=Lo(a.create_time??a.createTime??a.created_at);s&&l&&Or(s,l)}let r=typeof n.id=="string"?n.id:"",i=Lo(n.create_time??n.createTime??n.created_at);if(r&&i&&(n.author||n.content||n.role||n.create_time||n.createTime)&&Or(r,i),n.mapping&&typeof n.mapping=="object")dn(n.mapping,t+1);else if(t<3)for(let a of Object.values(n))a&&typeof a=="object"&&dn(a,t+1)}function Os(e){if(e)try{dn(JSON.parse(e))}catch{}}async function Hu(e){try{let t=await e.clone().json();dn(t)}catch{}}async function Iu(e){let t=e.body;if(!t)return;let n=t.getReader(),o=new TextDecoder,r="";try{for(;Ae;){let{done:i,value:a}=await n.read();if(i)break;r+=o.decode(a,{stream:!0});let s=r.split(`
`);r=s.pop()??"";for(let l of s){let d=l.replace(/^data:\s*/,"").trim();!d||d==="[DONE]"||Os(d)}r.length>16384&&(r=r.slice(-4096))}r&&Os(r.replace(/^data:\s*/,""))}catch{}}function Ou(e,t,n){let o=Ru(t),r=(n?.method||(typeof Request<"u"&&t instanceof Request?t.method:"GET")||"GET").toUpperCase(),i=Pu(o,r),a=Nu(o,r);return e(t,n).then(s=>{if(i)Hu(s);else if(a)try{Iu(s.clone())}catch{}return s})}function Bu(){if(mt)return;let e=ku();cn=e,mt=e.fetch.bind(e);let t=(n,o)=>Ou(mt,n,o);Co=t,e.fetch=t}function Du(){!mt||!cn||(Co&&cn.fetch===Co&&(cn.fetch=mt),mt=null,Co=null,cn=null)}function _u(e){return(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function $u(){let e=Ds();if(!e)return[];let t=[];try{for(let n of e.querySelectorAll("[data-message-id]"))n.closest(Tu)||t.push(n)}catch{}return t}function qu(e){try{return!!e.querySelector("time:not(.bloom-ts)")}catch{return!1}}function ju(){if(!Ae)return;let e=ft.store.hideOwnMessages===!0,t=ft.store.showDate!==!1,n=_(),o=$u();fe?.disconnect();try{o.forEach((r,i)=>{let a=r.getAttribute("data-message-id")||"",s=_u(r),l=r.querySelector(`:scope > .${To}`);if(e&&s==="user"){l?.remove();return}if(qu(r)){l?.remove();return}let d=Au(a);if(!d&&a&&(n||Is)&&i>=o.length-2&&(d=Date.now(),Or(a,d)),!d){l?.remove();return}let c=Rs(d,t);if(!c){l?.remove();return}let u=l;u||(u=document.createElement("time"),u.className=To,u.setAttribute("aria-hidden","true"),r.insertBefore(u,r.firstChild)),u.textContent!==c&&(u.textContent=c);let f=Ps(d);f&&u.getAttribute("datetime")!==f&&u.setAttribute("datetime",f)})}catch(r){Bs.debug("paint failed",r)}Is=n,$s()}function un(){!Ae||ut||(ut=requestAnimationFrame(()=>{ut=0,Ae&&ju()}))}function $s(){let e=Ds();if(!(fe&&Ir===e&&e?.isConnected)){if(fe?.disconnect(),Ir=e,!e||e===document.body){fe=null;return}fe=new MutationObserver(()=>un()),fe.observe(e,{childList:!0,subtree:!0})}}var qs=h({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[y.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${To}`],settings:ft,start(){Ae=!0,w(Ns,As);let e=Br();for(let[t,n]of Object.entries(e))typeof n=="number"&&n>0&&pt.set(t,n);Bu(),$s(),dt!==void 0&&clearInterval(dt),dt=setInterval(un,800),un(),Bs.debug("timestamp watch started")},stop(){Ae=!1,ut&&cancelAnimationFrame(ut),ut=0,dt!==void 0&&(clearInterval(dt),dt=void 0),fe?.disconnect(),fe=null,Ir=null,Du(),_s(),pt.clear(),document.querySelectorAll(`.${To}`).forEach(e=>e.remove()),b(Ns)},onSettingsChange:un});var Dr="streamerMode",Fu="filter:blur(6px)!important;transition:filter .2s ease",zu="filter:none!important",mn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],gt=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function F(e,t){return e.map(n=>`${n} ${t}`)}var ht=v({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0}});function fn(e,t=!0){let n=e.join(","),o=e.map(r=>`${r}:hover`).join(",");return`${n}{${Fu}}${t?`${o}{${zu}}`:""}`}function js(){let e=[];if(ht.store.conversations!==!1&&e.push(fn([...F(gt,'a[href^="/c/"]'),...F(gt,'a[href*="/c/"]')])),ht.store.projects!==!1&&e.push(fn([...F(gt,'a[href*="/project"]'),...F(gt,'a[href*="/g/g-p-"]'),...F(gt,'[data-testid="project-name"]'),...F(gt,'[data-testid="project-link"]')])),ht.store.accountAvatar!==!1&&e.push(fn([...F(mn,"img"),...F(mn,'[class*="avatar"]')],!1)),ht.store.accountName!==!1&&e.push(fn([...F(mn,".min-w-0 > .truncate"),...F(mn,".min-w-0.flex-1 .truncate")],!1)),ht.store.accountEmail!==!1&&e.push(fn([...F(mn,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),e.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),!e.length){b(Dr);return}w(Dr,e.join(`
`))}var Fs=h({name:"StreamerMode",description:"Blur Recents titles, project names, and the account chip while you stream.",authors:[y.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:ht,start:js,onSettingsChange:js,stop(){b(Dr)}});var zs=`.bloom-gc-panel {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.bloom-gc-composer {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.bloom-gc-input {
    width: 100%;
    min-height: 4.5rem;
    box-sizing: border-box;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid var(--border-medium, rgba(0, 0, 0, 0.15));
    background: var(--main-surface-primary, #ffffff);
    color: var(--text-primary, inherit);
    font: inherit;
    font-size: 0.8125rem;
    line-height: 1.45;
    resize: vertical;
}

.bloom-gc-input:focus {
    outline: 2px solid var(--text-primary, currentColor);
    outline-offset: 1px;
}

.bloom-gc-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.75rem;
    font-variant-numeric: tabular-nums;
    color: var(--text-secondary, #5d5d5d);
}

.bloom-gc-error {
    color: var(--text-error, #c4314b);
}

.bloom-gc-actions {
    display: flex;
    gap: 6px;
    margin-left: auto;
}

.bloom-gc-btn {
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

.bloom-gc-btn:hover:not(:disabled) {
    background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
}

.bloom-gc-btn:disabled {
    opacity: 0.4;
    cursor: default;
}

.bloom-gc-btn-primary {
    background: var(--bg-primary-inverted, #0d0d0d);
    color: var(--text-primary-inverted, #ffffff);
}

.bloom-gc-btn-primary:hover:not(:disabled) {
    filter: brightness(1.08);
}

.bloom-gc-empty {
    margin: 0;
    color: var(--text-secondary, #5d5d5d);
    font-size: 0.8125rem;
}

.bloom-gc-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    overflow: auto;
    max-height: min(22rem, 45vh);
}

.bloom-gc-item {
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

.bloom-gc-item:hover {
    background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.04));
}

.bloom-gc-item[data-active="true"] {
    box-shadow: inset 0 0 0 1px var(--border-medium, rgba(0, 0, 0, 0.18));
}

.bloom-gc-body {
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

.bloom-gc-clamp {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

.bloom-gc-item-actions {
    display: flex;
    gap: 2px;
}

.bloom-gc-item-actions button {
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: var(--text-secondary, inherit);
    cursor: pointer;
}

.bloom-gc-item-actions button:hover {
    background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
    color: inherit;
}
`;var Ku=new S("GreetingCustomizer"),bt="greetingCustomizer",Gs="greetingCustomizerUi",pn=100,_r=30,Uu=120,Vu=1e3,Wu=50,Yu=40,Ju=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog"].join(", "),gn=["h1.text-page-header",'h1[class*="text-page-header"]',"[data-splash-headline-option] h1",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),$r=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function Xu(e){return!!e?.closest(Ju)}function Vs(e){return!!(Xu(e)||e.closest('[data-testid="temporary-chat-label"]')||e.closest("[hidden]")||e.getAttribute("aria-hidden")==="true"||e.classList.contains("sr-only"))}function Po(e){try{for(let t of document.querySelectorAll(e))if(!Vs(t))return t}catch{}return null}var Ws=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],k=v({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:um},greetings:{type:0,description:"Greeting texts",hidden:!0,default:Ws},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),Y=!1,xt=!1,Pe=null,Mo,hn,yt,bn,Ao=0,ko=null,vt=null,yn=null,vn=null,xn=null,Ro=null;function ee(){let e=location.pathname||"/";return e==="/"||e===""}function Re(){let e=k.plain.greetings;return Array.isArray(e)?e.filter(t=>typeof t=="string"):Ws.slice()}function wn(e){return String(e??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function Ks(e){k.store.greetings=e.slice(0,_r)}function En(){let e=String(k.store.mode??"refresh");return e==="interval"||e==="manual"?e:"refresh"}function Zu(){return k.store.order==="random"?"random":"sequential"}function Qu(){return Ie(Number(k.store.intervalSec??10),1,3600)*1e3}function em(e){return String(e??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function tm(){return!!Po($r)}function No(){return!!(Po($r)||Po(gn))}function nm(e,t){let n=["font-size:0!important","line-height:0!important","visibility:hidden!important","display:block!important"].join(";"),o=[`content:"${e}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),r=tm()||!Po(gn)?$r:gn,i=t?`${gn}{cursor:pointer!important;user-select:none!important}`:"";return[`${r}{${n}}`,`${r}::before{${o}}`,i,`@media (max-width:768px){${r}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function om(e,t){if(e<=0)return 0;if(e===1)return Number(k.plain.index)!==0&&(k.store.index=0),Number(k.plain.lastRandom)!==0&&(k.store.lastRandom=0),0;let n=Number(k.plain.index),o=Number(k.plain.lastRandom);if(!t)return n>=0&&n<e?n:0;if(Zu()==="random"){let a=n>=0&&n<e?n:o,s=Math.floor(Math.random()*e),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*e);return k.store.index=s,k.store.lastRandom=s,s}let i=((n>=-1&&n<e?n:-1)+1)%e;return k.store.index=i,i}function Q(e){if(!Y)return;if(!ee()){b(bt);return}let t=Re().map(wn).filter(Boolean);if(!t.length){b(bt);return}let n=om(t.length,e),o=t[n]??t[0],r=En()==="manual"&&t.length>1;w(bt,nm(em(o),r)),Ro?.()}function qr(){Mo!==void 0&&(clearInterval(Mo),Mo=void 0)}function jr(){qr(),!(!Y||!ee())&&En()==="interval"&&(Re().filter(Boolean).length<=1||(Mo=setInterval(()=>Q(!0),Qu())))}function Fr(){bn!==void 0&&(clearTimeout(bn),bn=void 0),Ao=0}function Us(){if(Fr(),!Y||!ee())return;Ao=Yu;let e=()=>{if(bn=void 0,!(!Y||!ee())){if(No()){En()==="refresh"&&!xt?(xt=!0,Q(!0)):Q(!1),jr();return}Ao-=1,Ao>0&&(bn=setTimeout(e,Wu))}};e()}function zr(){if(Pe===!0){No()?Q(!1):Us();return}Pe=!0,xt=!1,En()==="refresh"?(xt=!0,Q(!0)):Q(!1),jr(),No()||Us()}function Gr(){Pe=!1,xt=!1,qr(),Fr(),b(bt)}function Ho(){yt===void 0&&(yt=window.setTimeout(()=>{yt=void 0,Y&&(ee()?zr():Pe!==!1&&Gr())},Uu))}function rm(){vt||(vt=history.pushState.bind(history),yn=history.replaceState.bind(history),vn=function(...t){let n=vt(...t);return Ho(),n},xn=function(...t){let n=yn(...t);return Ho(),n},history.pushState=vn,history.replaceState=xn)}function im(){vn&&history.pushState===vn&&vt&&(history.pushState=vt),xn&&history.replaceState===xn&&yn&&(history.replaceState=yn),vt=null,yn=null,vn=null,xn=null}function am(e){let t=e.target instanceof Element?e.target:null;t&&t.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(Ho)}function sm(e){if(!Y||!ee()||En()!=="manual"||Re().filter(Boolean).length<=1)return;let t=e.target instanceof Element?e.target:null;if(!t)return;let n=t.closest(gn);if(!n||Vs(n))return;let o=window.getSelection?.();o&&String(o).trim()||Q(!0)}function lm(){hn===void 0&&(hn=setInterval(()=>{if(!Y)return;let e=ee();if(e!==(Pe===!0)){e?zr():Gr();return}e&&No()&&Q(!1)},Vu))}function cm(){hn!==void 0&&(clearInterval(hn),hn=void 0)}function dm(e,t){let n=wn(e);return n?n.length>pn?`Keep it to ${pn} characters.`:Re().length+(t?1:0)>_r?`At most ${_r} greetings.`:null:"Enter a greeting."}function um(e){e.className="bloom-gc-panel";let t="",n=-1,o="",r=-1,i=()=>{let a=Re(),s=Number(k.plain.index);e.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let d=document.createElement("textarea");d.className="bloom-gc-input",d.rows=3,d.maxLength=pn,d.placeholder="New greeting (line breaks ok)",d.value=t,d.addEventListener("input",()=>{t=d.value,o="";let m=l.querySelector(".bloom-gc-count");m&&(m.textContent=`${wn(t).length}/${pn}`);let x=l.querySelector(".bloom-gc-error");x&&(x.textContent="")}),l.appendChild(d);let c=document.createElement("div");c.className="bloom-gc-meta";let u=document.createElement("span");u.className="bloom-gc-count",u.textContent=`${wn(t).length}/${pn}`;let f=document.createElement("span");f.className="bloom-gc-error",f.textContent=o;let L=document.createElement("div");if(L.className="bloom-gc-actions",n>=0){let m=document.createElement("button");m.type="button",m.className="bloom-gc-btn",m.textContent="Cancel",m.addEventListener("click",()=>{n=-1,t="",o="",i()}),L.appendChild(m)}let E=document.createElement("button");if(E.type="button",E.className="bloom-gc-btn bloom-gc-btn-primary",E.textContent=n>=0?"Update":"Add",E.addEventListener("click",()=>{let m=n<0,x=dm(t,m);if(x){o=x,i();return}let A=wn(t),P=Re().slice();n>=0&&n<P.length?P[n]=A:P.push(A),Ks(P),n=-1,t="",o="",i()}),L.appendChild(E),c.append(u,f,L),l.appendChild(c),e.appendChild(l),!a.length){let m=document.createElement("p");m.className="bloom-gc-empty",m.textContent="No greetings. The official heading stays.",e.appendChild(m);return}let p=document.createElement("div");p.className="bloom-gc-list",a.forEach((m,x)=>{let A=document.createElement("div");A.className="bloom-gc-item",x===s&&(A.dataset.active="true");let P=document.createElement("button");P.type="button",P.className=`bloom-gc-body${r===x?"":" bloom-gc-clamp"}`,P.textContent=m,P.addEventListener("click",()=>{r=r===x?-1:x,i()});let wt=document.createElement("div");wt.className="bloom-gc-item-actions";let J=document.createElement("button");J.type="button",J.title="Edit",J.textContent="E",J.addEventListener("click",()=>{n=x,t=m,o="",i()});let I=document.createElement("button");I.type="button",I.title="Delete",I.textContent="\xD7",I.addEventListener("click",()=>{let Et=Re().filter((Ne,pe)=>pe!==x);Ks(Et),n===x?(n=-1,t=""):n>x&&(n-=1),i()}),wt.append(J,I),A.append(P,wt),p.appendChild(A)}),e.appendChild(p)};return Ro=i,i(),()=>{Ro===i&&(Ro=null),e.replaceChildren()}}var Ys=h({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[y.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Gs,settings:k,start(){Y=!0,w(Gs,zs),rm(),ko=new AbortController;let{signal:e}=ko;window.addEventListener("popstate",Ho,{signal:e}),document.addEventListener("click",am,{capture:!0,signal:e}),document.addEventListener("click",sm,{signal:e}),lm(),Pe=null,ee()?zr():Gr(),Ku.debug("started")},stop(){Y=!1,ko?.abort(),ko=null,yt!==void 0&&(clearTimeout(yt),yt=void 0),qr(),Fr(),cm(),im(),b(bt),xt=!1,Pe=null},onSettingsChange(){Y&&(ee()?(Q(!1),jr()):b(bt))}});var Sn=new S("Bloom"),Js=!1,mm=Date.now(),fm=[Yi,Ea,Ha,Ba,ja,Ua,as,ls,ms,ws,Ms,qs,Fs,Ys];function Io(e){return new Promise(t=>setTimeout(t,e))}function pm(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var Zs=8e3,Xs=300,gm=250;async function hm(){if(he())return await Io(Xs),!0;for(;Date.now()-mm<Zs;)if(await Io(gm),he())return await Io(Xs),!0;return he()||qo()}function Kr(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function bm(){if(Kr())return!0;let e=Date.now()+Zs;for(;Date.now()<e;)if(await Io(100),Kr())return!0;return Kr()}function ym(){try{GM_registerMenuCommand?.("Bloom++ settings",Wi)}catch{}}function vm(){Hn(()=>{Ct("HostShell"),Sn.info("host shell",O)}),In(()=>{Sn.info("idle ready",O)}),On(()=>{Yr(),Ct("HostReady"),Sn.info("chrome ready",O)})}async function Ur(){await ri()}async function Vr(){if(Js)return;Js=!0;for(let n of fm)try{fi(n)}catch(o){Sn.error("register failed",n.name,o)}hi(),Ct("Init"),ym(),vm();let e=()=>Ct("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await pm(),bm().then(n=>{n&&Bn()}),!await hm()){Sn.warn("late islands not detected; starting default plugins",O),Be(),Dn();return}await Ei()}var Qs=typeof unsafeWindow<"u"?unsafeWindow:window,xm=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||xm){let e=Qs.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",O);try{Object.defineProperty(Qs,"Bloom",{value:Wr,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}Ur().then(()=>Vr()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
