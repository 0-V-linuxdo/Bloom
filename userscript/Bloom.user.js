// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260920] v1.4.47
// @description  Void++-style plugin host for chatgpt.com. Tab favicon, input history, recent chats, reply notify, next-prompt queue, Recents status, wider thread, thread outline, message times, streamer blur, custom home greeting, hide Share, Dictation, sidebar name, Download apps, upgrade CTAs, and ads.
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

/* Bloom++ [20260920] v1.4.47. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var nd=Object.defineProperty;var od=(e,t)=>{for(var n in t)nd(e,n,{get:t[n],enumerable:!0})};var Sa={};od(Sa,{REPO_URL:()=>Za,Settings:()=>b,VERSION:()=>z,contextKeyFromUrl:()=>oe,conversationTitle:()=>xt,conversationToken:()=>_,currentConversationId:()=>M,hasDraftText:()=>ne,hasErrorToast:()=>K,hasLateIslands:()=>Fe,init:()=>Ea,initSettings:()=>wa,isDocumentInteractive:()=>Qa,isStreaming:()=>N,isUserDraftEmpty:()=>Ae,messageCreateTime:()=>tr,plugins:()=>Z,requestChromeReady:()=>Po,requestIdleReady:()=>ut,requestShellReady:()=>Ro,setEditorText:()=>ge,subscribeHarvest:()=>ie,watchStreamingEdge:()=>se,whenChromeReady:()=>No,whenIdleReady:()=>Ho,whenShellReady:()=>Ao});var Ee=new Map,xo=!1;function rd(){return document.getElementById("bloom-root")?.shadowRoot??null}function id(){return document.head??null}function ct(){let e=rd();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=ad()}function qr(e,t){if(!xo)return;let n=id();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),ct();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,ct();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,ct()}function w(e,t){let n=Ee.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},Ee.set(e,n)),xo&&qr(e,n)}function Ta(){xo=!0;for(let[e,t]of Ee)qr(e,t);return ct(),!0}function La(e){let t=Ee.get(e);t&&(t.disabled=!1,xo&&qr(e,t))}function ka(e){let t=Ee.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),ct())}function y(e){let t=Ee.get(e);t&&(t.el?.remove(),Ee.delete(e),ct())}function ad(){return Array.from(Ee.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var v=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function p(e){return e}var jr=new Map;function wo(e,t){let n=jr.get(e);return n||(n=new Set,jr.set(e,n)),n.add(t),()=>n.delete(t)}function je(e,t){let n=jr.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var sd="bloompp";function Ca(){return new Promise((e,t)=>{let n=indexedDB.open(sd,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function Ma(e){try{let t=await Ca();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function Aa(e,t){try{let n=await Ca();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function sn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function me(e,t,n){return Math.min(n,Math.max(t,e))}function Ha(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function Na(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}function Ra(e,t){let n;return((...o)=>{n&&clearTimeout(n),n=setTimeout(()=>e(...o),t)})}var Eo=new v("SettingsStore"),Se="BloomSettings",ld=100;function To(e){if(sn(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(sn(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return sn(n)?n:null}return null}catch{return null}}var So=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let c=n?`${n}.${a}`:a;for(let[l,d]of this.defaultGetters)if(c.startsWith(l)){let u=c.slice(l.length+1);if(u&&!u.includes(".")){let m=d(u);m!==void 0&&(i[a]=m,s=m);break}}}return sn(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let c=n?`${n}.${a}`:a;return this.notifyListeners(c),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Eo.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},ld))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(Se,this.plain)}catch{try{GM_setValue(Se,t)}catch(n){Eo.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(Se,t)}catch{}Aa(Se,t).catch(n=>Eo.warn("Failed to save settings to IndexedDB:",n))}catch(t){Eo.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){Ha(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var cd=new v("Settings"),dd={plugins:{}},b=new So(structuredClone(dd)),ud=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function md(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function x(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(b.store.plugins[n]||(b.store.plugins[n]={}),b.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?b.plain.plugins[n]??{}:{}}};return t}function fd(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function Pa(){let e=null;if(e=To(fd(Se)),e||(e=To(await Ma(Se))),!e)try{e=To(localStorage.getItem(Se))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(b.plain.plugins=t),cd.debug("Loaded settings")}}function Ia(e,t){t&&(t.pluginName=e,b.plain.plugins[e]||(b.plain.plugins[e]={}),b.setDefaultGetter(ud(e),n=>{if(n!=="enabled")return md(t.def,n)}))}function Oa(){return b.plain.plugins.Settings||(b.store.plugins.Settings={}),b.store.plugins.Settings}function Lo(){return Oa().pinnedPlugins??[]}function Ba(e){return Lo().includes(e)}function Da(e){let t=Lo(),n=t.includes(e);return b.store.plugins.Settings={...b.plain.plugins.Settings,pinnedPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}function ko(){return Oa().starredPlugins??[]}function $a(e){return ko().includes(e)}function _a(e){let t=ko(),n=t.includes(e);return b.store.plugins.Settings={...b.plain.plugins.Settings,starredPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}var Co=new v("PluginManager"),Z={},ln=new Set;function Fa(e){if(Z[e.name]){Co.warn("Duplicate plugin",e.name);return}Z[e.name]=e,Ia(e.name,e.settings)}function dt(e){let t=Z[e];if(!t)return!1;if(t.required)return!0;let n=b.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function za(e){let t=Z[e];if(!t||t.required)return;let n=!dt(e);b.plain.plugins[e]||(b.store.plugins[e]={}),b.store.plugins[e].enabled=n,n?Ga(t):pd(t),je("pluginToggle",{name:e,enabled:n})}function Ga(e,t=!1){if(!ln.has(e.name)&&dt(e.name))try{e.managedStyle&&La(e.managedStyle),e.start?.(),ln.add(e.name),e.settings&&b.addPrefixChangeListener(`plugins.${e.name}.`,()=>{ln.has(e.name)&&e.onSettingsChange?.()}),t||Co.debug("Started",e.name)}catch(n){Co.error("Failed to start",e.name,n)}}function pd(e){if(ln.has(e.name)){try{e.stop?.()}catch(t){Co.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(ka(e.managedStyle),y(e.managedStyle)),ln.delete(e.name)}}function cn(e){for(let t of Object.values(Z))(t.startAt??"DOMContentLoaded")===e&&Ga(t)}var qa=2,ja="defaultsRev";function Ka(){for(let t of Object.values(Z))b.plain.plugins[t.name]||(b.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=b.store.plugins.Settings??(b.store.plugins.Settings={});if(e[ja]!==qa){for(let t of["NoShareLink","NoDictation"]){let n=b.store.plugins[t]??(b.store.plugins[t]={});n.enabled=!1}e[ja]=qa}}var dn=!1,Mo=!1,Fr=!1,Va=[],Wa=[],Ya=[];function zr(e){let t=e.splice(0);for(let n of t)n()}function un(){dn||(dn=!0,zr(Va))}function Gr(){Mo||(Mo=!0,dn||un(),zr(Wa))}function Xa(){Fr||(Fr=!0,dn||un(),Mo||Gr(),zr(Ya))}function Ao(e){dn?e():Va.push(e)}function Ho(e){Mo?e():Wa.push(e)}function No(e){Fr?e():Ya.push(e)}function Ro(){un()}function ut(){un(),Gr()}function Po(){Xa()}function Ua(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function Ja(){await Ua(4e3),un(),await Ua(4e3),Gr(),Xa()}var h={p:"0-V-linuxdo"},z="[20260920] v1.4.47",Za="https://github.com/0-V-linuxdo/Bloom";function gd(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function bd(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function Kr(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function Fe(){return Kr()?gd()||bd():!1}function Qa(){return Fe()}var hd=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),es=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),yd=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),vd="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function ft(e){return e.id==="bloom-root"||!!e.closest(vd)}function ts(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function Io(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function Ur(e){if(!(e instanceof HTMLElement)||!e.isConnected||ft(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&Io(t)?!1:e.getClientRects().length>0}function mt(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function xd(){let e=[];for(let t of document.querySelectorAll(hd))!(t instanceof HTMLElement)||!t.isConnected||ft(t)||e.push(t);return e}function Oo(e){if(!e.isConnected||ft(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function mn(){return xd().filter(Oo)[0]??null}function Vr(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||ft(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function Wr(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!ft(n)&&!mt(n)&&n.parentElement&&!mt(n.parentElement)&&(t=n);let o=t.parentElement;if(o&&!mt(o)&&!ft(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!mt(o.parentElement))return o}return t}function ns(){let e=document.querySelectorAll(es);for(let n of e)if(Ur(n)&&!Io(n)&&ts(n))return n;let t=document.querySelectorAll(yd);for(let n of t){if(!Ur(n)||!ts(n)||Io(n))continue;let o=n.querySelector(es);return Ur(o)&&!Io(o)?o:n}return null}function os(){let e=mn();if(e){let t=Wr(e),n=t.parentElement;if(n&&!mt(n))return n;if(!mt(t))return t}return Vr()}function rs(e){let t=mn();return t?e.composedPath().includes(t):!1}var Xr=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],wd={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Jr(e){return e==="auto"||e==="light"||e==="dark"}function Ed(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Sd(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function Yr(e){let t=Ed(e);return t?Sd(t)>.55?"light":"dark":null}function Td(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=Yr(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=Yr(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Yr(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function is(e){return e==="auto"?Td():e}function Ld(e){try{let t=getComputedStyle(document.documentElement);for(let n of Xr){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function as(e,t,n){let o=wd[t];if(n){Ld(e);for(let r of Xr)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of Xr)e.style.setProperty(r,o[r])}function ss(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var Zr=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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

.bloom-appearance-row {
  padding: 0 0 0.25rem;
}

.bloom-appearance-row select {
  max-width: 9rem;
}
`;var Cd="bloom-root",Q="bloom-rail-item",qo="bloom-account-item",Ge="bloom-sidebar-panel",Sn="bloom-plugin-dialog",Uo="bloom-plugin-layer",jo="bloom-settings-css",Md=2e3,vn=x({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),ds=null,Ad=null,Ce=!1,ni=[],Bo=null,Fo=null,Le=null,$o=null,fe=null,xn=null,fn,pt=0,wn=0,pn=0,gn=null,bn=null,zo=null,us=null,hn=null,Qr=[],Go=!1,Hd=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Nd=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],Vo="",En="all",Me="all";function Wo(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function ms(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Rd(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function Pd(e){let t='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return e?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${t}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`}function Id(e){let t='<path d="M12 17v5"/>';return e?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var Od={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function Bd(e){return e.icon||Od[e.name]||Wo()}function fs(){return Jr(vn.store.appearance)?vn.store.appearance:"auto"}function Dd(){let e=document.createElement("div");e.className="bloom-field bloom-appearance-row";let t=document.createElement("span");t.className="bloom-field-label",t.textContent="Appearance";let n=document.createElement("select");n.setAttribute("aria-label","Appearance");let o=vn.def.appearance,r=o.type===3?o.options??[]:[];for(let i of r){let a=document.createElement("option");a.value=i.value,a.textContent=i.label,n.appendChild(a)}return n.value=fs(),n.addEventListener("change",()=>{Jr(n.value)&&(vn.store.appearance=n.value)}),e.append(t,n),e}function ei(e,t,n){e&&(e.setAttribute("data-bloom-scheme",t),as(e,t,n),e.style.removeProperty("--bloom-rail-surface"))}function ps(e){e&&(e.style.removeProperty("--bloom-rail-surface"),e.style.removeProperty("--bg-primary"))}function yn(){let e=fs(),t=is(e),n=e==="auto";ei(ds,t,n);let o=document.getElementById(Ge);o instanceof HTMLElement&&ei(o,t,n);let r=document.getElementById(Sn);r instanceof HTMLElement&&ei(r,t,n);let i=document.getElementById(Q);i instanceof HTMLElement&&ps(i),je("schemeChange",{scheme:t,pref:e})}function gs(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(e=>e.remove())}function bs(){if(w("settings",Zr),document.getElementById(jo)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=jo,e.textContent=Zr,document.head.appendChild(e)}function $d(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function _d(){for(let e of ni)e();ni=[]}function hs(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function qd(e){return e.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,t=>t.toUpperCase())}function ii(e){return e.settings?Object.entries(e.settings.def).filter(([,t])=>!t.hidden):[]}function jd(e){return ii(e).length>0}function _o(e){if(e.default!==void 0)return e.default;if(e.type===3)return(e.options?.find(n=>n.default)??e.options?.[0])?.value;if(e.type===2)return!1;if(e.type===4)return e.min??0;if(e.type===0)return"";if(e.type===1)return 0}function Fd(e,t){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let o=document.createElement("span");if(o.className="bloom-plugin-dialog-label-title",o.textContent=qd(e),n.appendChild(o),t.description){let r=document.createElement("span");r.className="bloom-plugin-dialog-label-desc",r.textContent=t.description,n.appendChild(r)}return n}function zd(e,t,n){if(n.hidden)return null;let o=n.type===4||n.type===0||n.type===1||n.type===5,r=document.createElement("div");r.className=o?"bloom-field bloom-field-stack":"bloom-field",r.appendChild(Fd(t,n));let i=b.store.plugins[e]??(b.store.plugins[e]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",ni.push(n.render(a)),r.appendChild(a),r}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let c=document.createElement("option");c.value=s.value,c.textContent=s.label,a.appendChild(c)}return a.value=String(i[t]??_o(n)??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),r.appendChild(a),r}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??_o(n)??n.min??0);let c=document.createElement("span");return c.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),c.textContent=s.value}),a.append(s,c),r.appendChild(a),r}if(n.type===2){let a=hs(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),r.appendChild(a),r}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[t]??_o(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[t]=n.type===1?Number(a.value):a.value}),r.appendChild(a),r}return r}function ls(e,t){let n=document.createElement("div");n.className=t?`bloom-plugin-dialog-field ${t}`:"bloom-plugin-dialog-field";let o=document.createElement("div");return o.className="bloom-plugin-dialog-field-label",o.textContent=e,n.appendChild(o),n}function Gd(e){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let t=b.store.plugins[e.name]??(b.store.plugins[e.name]={});for(let[n,o]of ii(e)){if(n==="enabled"||o.type===5)continue;let r=_o(o);r!==void 0&&(t[n]=r)}vs(e)}function ys(e){e.key==="Escape"&&(!document.getElementById(Uo)&&!document.getElementById(Sn)||(e.stopPropagation(),gt()))}function Kd(){Go||(document.addEventListener("keydown",ys),Go=!0)}function Ud(){Go&&(document.removeEventListener("keydown",ys),Go=!1)}function gt(){_d(),Ud(),document.getElementById(Uo)?.remove(),document.getElementById(Sn)?.remove()}function vs(e){if(gt(),!document.body)return;let t=document.createElement("div");t.id=Uo,t.className="bloom-plugin-layer",t.addEventListener("pointerdown",ke),t.addEventListener("pointerup",ke),t.addEventListener("click",d=>{d.stopPropagation(),d.target===t&&gt()});let n=document.createElement("div");n.id=Sn,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",ke),n.addEventListener("pointerup",ke),n.addEventListener("click",ke);let o=document.createElement("button");o.type="button",o.className="bloom-icon-btn bloom-plugin-dialog-close",o.setAttribute("aria-label","Close"),o.innerHTML=ms(),o.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),gt()});let r=document.createElement("div");r.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=e.name,r.appendChild(i),e.description){let d=document.createElement("p");d.className="bloom-plugin-dialog-sub",d.textContent=e.description,r.appendChild(d)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(o,r,a),e.authors?.length){let d=ls("Authors"),u=document.createElement("p");u.className="bloom-plugin-dialog-authors",u.textContent=e.authors.join(", "),d.appendChild(u),n.appendChild(d)}let s=ls("Settings","bloom-plugin-dialog-settings"),c=document.createElement("div");c.className="bloom-plugin-dialog-settings-list";let l=ii(e);if(l.length)for(let[d,u]of l){let m=zd(e.name,d,u);m&&c.appendChild(m)}if(!c.childElementCount){let d=document.createElement("p");d.className="bloom-dialog-empty",d.textContent="No configurable settings.",c.appendChild(d)}if(s.appendChild(c),n.appendChild(s),l.length){let d=document.createElement("div");d.className="bloom-plugin-dialog-footer";let u=document.createElement("button");u.type="button",u.className="bloom-plugin-dialog-reset",u.textContent="Reset",u.addEventListener("click",()=>Gd(e)),d.appendChild(u),n.appendChild(d)}t.appendChild(n),document.body.appendChild(t),Kd(),yn()}function Vd(e){let t=document.createElement("div");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Bd(e);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=e.name,a.title=e.name,r.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let c=$a(e.name),l=document.createElement("button");if(l.type="button",l.className=`bloom-icon-btn bloom-card-star${c?" bloom-card-star-active":""}`,l.setAttribute("aria-label",c?"Remove from favorites":"Add to favorites"),l.innerHTML=Pd(c),l.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation();let f=_a(e.name);je("pluginStar",{name:e.name,starred:f})}),s.appendChild(l),!e.required){let g=Ba(e.name),f=document.createElement("button");f.type="button",f.className=`bloom-icon-btn bloom-card-pin${g?" bloom-card-pin-active":""}`,f.setAttribute("aria-label",g?"Unpin from top":"Pin to top"),f.innerHTML=Id(g),f.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();let $=Da(e.name);je("pluginPin",{name:e.name,pinned:$})}),s.appendChild(f)}if(jd(e)){let g=document.createElement("button");g.type="button",g.className="bloom-icon-btn bloom-card-settings",g.setAttribute("aria-label",`${e.name} settings`),g.innerHTML=Rd(),g.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),vs(e)}),s.appendChild(g)}let d=hs(e.name,dt(e.name),!!e.required),u=d.querySelector("input");if(u?.addEventListener("click",g=>g.stopPropagation()),u?.addEventListener("change",()=>{za(e.name)}),s.appendChild(d),o.append(r,s),n.appendChild(o),e.description){let g=document.createElement("div");g.className="bloom-card-desc",g.textContent=e.description,n.appendChild(g)}let m=document.createElement("div");m.className="bloom-card-separator";let S=document.createElement("div");S.className="bloom-card-footer";let E=document.createElement("div");return E.className="bloom-card-author",E.textContent=e.authors?.filter(Boolean).join(", ")||"\xA0",S.appendChild(E),t.append(n,m,S),t}function xs(){return Object.values(Z).filter(e=>!e.hidden&&e.name!=="Settings")}function ws(e,t){return t==="all"||t==="favorites"?!0:(e.tags??[]).includes(t)}function Wd(e){return`${e.name} ${e.description??""} ${(e.tags??[]).join(" ")}`.toLowerCase()}function Yd(){return Vo.trim()?"No plugins match your search.":Me==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function Xd(){let e=xs();return Nd.filter(t=>t.id==="favorites"||t.id==="all"?!0:e.some(n=>ws(n,t.id)))}function Jd(){if(hn){hn.replaceChildren();for(let e of Xd()){let t=document.createElement("button");t.type="button",t.className=`bloom-plugin-tab${Me===e.id?" bloom-plugin-tab-active":""}`,t.textContent=e.label,t.addEventListener("click",()=>{Me=e.id,ze()}),hn.appendChild(t)}}}function Zd(){let e=xs();if(Me==="favorites"){let t=new Set(ko());e=e.filter(n=>t.has(n.name))}else Me!=="all"&&(e=e.filter(t=>ws(t,Me)));return En==="enabled"&&(e=e.filter(t=>dt(t.name))),En==="disabled"&&(e=e.filter(t=>!dt(t.name))),e}function ze(){if(!gn)return;Jd();let e=Zd();zo&&(zo.placeholder=`Search ${e.length} plugins...`);let t=e,n=Vo.trim().toLowerCase();if(n&&(t=t.filter(o=>Wd(o).includes(n))),Me!=="favorites"){let o=Lo();if(o.length){let r=new Map(o.map((i,a)=>[i,a]));t=t.slice().sort((i,a)=>{let s=r.has(i.name),c=r.has(a.name);return s!==c?s?-1:1:s?(r.get(i.name)??0)-(r.get(a.name)??0):i.name.localeCompare(a.name)})}}gn.replaceChildren();for(let o of t)gn.appendChild(Vd(o));bn&&(bn.hidden=t.length>0,bn.textContent=Yd())}function ke(e){e.stopPropagation()}function ti(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function ai(){document.getElementById(Q)?.setAttribute("aria-expanded",Ce?"true":"false")}function Qd(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function si(){gt(),Vo="",En="all",Me="all",document.getElementById(Ge)?.remove(),Ce=!1,ai()}function eu(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",ke),t.addEventListener("pointerup",ke),t.addEventListener("click",ke);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-titles";let i=document.createElement("div");i.className="bloom-settings-brand";let a=document.createElement("span");a.className="bloom-settings-mark",a.innerHTML=Wo();let s=document.createElement("h2");s.textContent="Bloom++",i.append(a,s);let c=document.createElement("p");c.className="bloom-settings-sub",c.textContent="Toggle features. Some need a reload. Click the sliders icon to configure.",r.append(i,c);let l=document.createElement("button");l.type="button",l.className="bloom-icon-btn",l.setAttribute("aria-label","Close"),l.innerHTML=ms(),l.addEventListener("click",si),o.append(r,l),n.appendChild(o),n.appendChild(Dd());let d=document.createElement("div");d.className="bloom-plugin-tabs",n.appendChild(d);let u=document.createElement("div");u.className="bloom-search-bar";let m=document.createElement("input");m.type="search",m.className="bloom-search-input",m.setAttribute("aria-label","Search plugins"),m.placeholder="Search plugins...",m.addEventListener("input",()=>{Vo=m.value,ze()});let S=document.createElement("select");S.className="bloom-search-filter",S.setAttribute("aria-label","Filter plugins");for(let f of Hd){let T=document.createElement("option");T.value=f.value,T.textContent=f.label,S.appendChild(T)}S.value=En,S.addEventListener("change",()=>{En=S.value,ze()}),u.append(m,S),n.appendChild(u);let E=document.createElement("div");E.className="bloom-plugin-list",n.appendChild(E);let g=document.createElement("p");return g.className="bloom-tab-empty",g.hidden=!0,n.appendChild(g),t.appendChild(n),gn=E,bn=g,zo=m,us=S,hn=d,ze(),t}function tu(e){e.classList.add("bloom-rail-dock")}function nu(){let e=document.getElementById(Q);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&Oo(e)?e:null}function ou(){if(document.getElementById(Ge)?.remove(),!document.body)return;let e=eu(Ge);tu(e),document.body.appendChild(e),Ce=!0,gt(),yn(),ai(),je("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:z,dock:"center",rail:!!nu()})}function li(){let e=document.getElementById(Ge);if(e instanceof HTMLElement&&e.isConnected&&Qd(e)){si();return}e?.remove(),ou()}function ru(){let e=document.createElement("button");return e.type="button",e.id=Q,e.className="bloom-rail-item",e.setAttribute("aria-controls",Ge),e.setAttribute("aria-expanded",Ce?"true":"false"),e.innerHTML=`<span class="bloom-rail-mark">${Wo()}</span><span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),li()}),e}function cs(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function iu(e){let t=e.querySelector("img");if(t instanceof HTMLElement){let n=t.getBoundingClientRect();if(n.width>8&&n.height>8)return t}for(let n of e.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}return null}function au(e,t){for(let n of e.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||t&&(n===t||n.contains(t)||t.contains(n))||(n.textContent||"").trim().length<2)continue;let r=n.getBoundingClientRect();if(r.width>16&&r.height>8&&r.height<40)return n}return null}function Te(e,t,n){let o=`${n}px`;e.style.getPropertyValue(t)!==o&&e.style.setProperty(t,o)}function Es(e,t){if(e.classList.contains("bloom-rail-compact"))return;let n=e.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!e.isConnected||!t.isConnected)return;let o=iu(t),r=getComputedStyle(t),i=Number.parseFloat(r.paddingTop),a=Number.parseFloat(r.paddingBottom);if(Number.isFinite(i)&&Te(e,"padding-top",Math.round(i)),Number.isFinite(a)&&Te(e,"padding-bottom",Math.round(a)),o){let s=o.getBoundingClientRect(),c=Math.max(20,Math.round(s.width));Te(n,"width",c),Te(n,"height",Math.max(20,Math.round(s.height)));let l=e.getBoundingClientRect(),d=Math.round(s.left-l.left);d>=0&&d<=40&&Te(e,"padding-left",d);let u=au(t,o);if(u){let m=u.getBoundingClientRect(),S=n.getBoundingClientRect(),E=Math.round(m.left-S.right);E>=0&&E<=24&&Te(e,"gap",E)}}else{let s=Number.parseFloat(r.paddingLeft),c=Number.parseFloat(r.columnGap||r.gap);Number.isFinite(s)&&Te(e,"padding-left",Math.round(s)),Number.isFinite(c)&&c>0&&Te(e,"gap",Math.round(c))}ps(e)}function oi(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function su(){if(xn?.isConnected&&fe){fe.observe(xn,{childList:!0});return}ri()}function lu(e){if(oi(e))return!1;try{if(e.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function cu(e,t){!t||!e||requestAnimationFrame(()=>{if(e.isConnected){pn=0;return}pn+=1,wn=Date.now()+Math.min(8e3,250*2**Math.min(pn,5))})}function du(){pt||Date.now()<wn||(pt=requestAnimationFrame(()=>{pt=0,!(Date.now()<wn)&&(document.getElementById(Q)?.isConnected||Ko())}))}function Ko(){if(!document.body)return;fe?.disconnect();let e=null,t=!1;try{let n=document.getElementById(Q);e=n instanceof HTMLButtonElement?n:ru();let o=mn(),r=Vr();if(o){let i=Wr(o),a=i.parentElement;if(oi(i)||a&&oi(a))return;e.isConnected&&e.nextElementSibling===i||(i.before(e),t=!0),cs(e),Es(e,o)}else r?(e.parentElement!==r&&(r.appendChild(e),t=!0),cs(e,!0)):e.isConnected&&!Oo(e)&&(e.remove(),e=null)}finally{cu(e,t),su(),ai()}}function ri(){let e=os();!e||!lu(e)||xn===e&&fe||(fe?.disconnect(),xn=e,fe=new MutationObserver(()=>{document.getElementById(Q)?.isConnected||du()}),fe.observe(e,{childList:!0}))}function uu(){Ko(),ri(),fn===void 0&&(fn=window.setInterval(()=>{let e=document.getElementById(Q);if(!(e instanceof HTMLElement)||!e.isConnected)Date.now()>=wn&&Ko();else{pn=0;let t=mn();t&&Es(e,t)}ri()},Md))}function mu(){fn!==void 0&&(clearInterval(fn),fn=void 0),pt&&cancelAnimationFrame(pt),pt=0,wn=0,pn=0,fe?.disconnect(),fe=null,xn=null}function fu(e){$o===e&&Le||(Le?.disconnect(),$o=e,Le=new MutationObserver(()=>{if(!e.isConnected){Le?.disconnect(),Le=null,$o=null;return}Ss(e)}),Le.observe(e,{childList:!0}))}function Ss(e){if(fu(e),e.querySelector(`#${qo}`))return;let t=document.createElement("button");t.type="button",t.id=qo,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${Wo()}<span>Bloom++</span>`,t.addEventListener("pointerdown",ti),t.addEventListener("pointerup",ti),t.addEventListener("click",n=>{ti(n),li()}),e.insertBefore(t,e.firstChild)}function Do(){let e=ns();return e?(Ss(e),!0):!1}function pu(e){rs(e)&&(queueMicrotask(Do),requestAnimationFrame(()=>{Do()}),window.setTimeout(Do,60),window.setTimeout(Do,180))}function gu(){Fo?.abort();let e=new AbortController;Fo=e,document.addEventListener("click",pu,{signal:e.signal})}function bu(){Fo?.abort(),Fo=null,Le?.disconnect(),Le=null,$o=null}function Ts(){ut(),$d(()=>{bs(),gs(),Ko(),li()})}var Ls=p({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[h.p],required:!0,hidden:!0,enabledByDefault:!0,settings:vn,startAt:"HostReady",cleanupSelectors:[`#${Cd}`,`#${Q}`,`#${qo}`,`#${Ge}`,`#${Uo}`,`#${Sn}`,`#${jo}`,"#bloom-menu-panel"],start(){bs(),gs(),uu(),gu(),Bo?.(),Bo=ss(yn),yn(),Qr=[wo("pluginToggle",()=>{Ce&&ze()}),wo("pluginPin",()=>{Ce&&ze()}),wo("pluginStar",()=>{Ce&&ze()})]},stop(){mu(),bu(),Bo?.(),Bo=null;for(let e of Qr)e();Qr=[],si(),document.getElementById(Q)?.remove(),document.getElementById(qo)?.remove(),document.getElementById(jo)?.remove(),ds=null,Ad=null,gn=null,bn=null,zo=null,us=null,hn=null,Ce=!1},onSettingsChange:yn});var Yo='form[data-type="unified-composer"], form.w-full[data-type]',ee=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),bt=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),ks=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Cs=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),hu=/stop streaming|stop generating|停止生成|停止输出|停止响应/,yu='[contenteditable="false"], button, [role="button"]';function G(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function Ke(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!G(r)))return r;return null}function Ms(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function C(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=Ms(e);return!!(hu.test(n)||/^stop$/i.test(n))}function te(){let t=Array.from(document.querySelectorAll(Yo)).find(G);if(t instanceof HTMLElement)return t;let n=Ke(document,ee),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function D(){let e=Array.from(document.querySelectorAll(ee));return e.find(G)??e[0]??null}function vu(e,t){if(!e||e===t||!t.contains(e))return!1;let n=e.closest(yu);return!!n&&n!==t&&t.contains(n)}function ci(e,t){let n=[];try{let o=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),r=o.nextNode();for(;r;){let i=r.parentElement;i&&vu(i,t)||n.push(r.textContent??""),r=o.nextNode()}}catch{return e.innerText??e.textContent??""}return n.join("")}function ne(e){let t=e??D();return t?ci(t,t).replaceAll("\u200B","").trim().length>0:!1}function Ae(e){return!ne(e)}function Tn(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function As(e){let t=te();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!G(n))&&e(n))return n;return null}function pe(){let e=te(),t=Ke(e,bt)??Ke(document,bt);return t&&!C(t)?t:As(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!C(n);let r=Ms(n);return/^(send|send prompt|发送)$/i.test(r)&&!C(n)})}function di(){let e=pe();return!!e&&Tn(e)}function ui(){let e=te(),t=Ke(e,ks,!0)??Ke(document,ks,!0);if(t)return t;let n=Ke(e,Cs)??Ke(document,Cs);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&G(o)&&C(o))return o}return As(C)}function F(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>ci(n,e)).join(`
`):ci(e,e)}function mi(e,t=!1){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function ge(e,t,n=!1){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r);try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch{e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),mi(e,n)}var Hs="bloom-host-icon",Ln="data-bloom-host-rel",fi="not all",pi=0,Ns=0,xu=400;function Rs(e){pi+=1;try{e()}finally{pi-=1}}function Xo(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function ht(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function Ps(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function wu(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Eu(e,t){if(e.lastElementChild===t)return;let n=Date.now();n-Ns<xu||(Ns=n,e.appendChild(t))}function Su(e,t){for(let n of e.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===t||Xo(n)&&(n.getAttribute(Ln)||n.setAttribute(Ln,n.rel),n.media!==fi&&(n.media=fi),n.rel!==Hs&&(n.rel=Hs))}function Tu(e){for(let t of e.querySelectorAll(`link[${Ln}]`)){if(!(t instanceof HTMLLinkElement))continue;let n=t.getAttribute(Ln);n&&(t.rel=n),t.removeAttribute(Ln),t.media===fi&&t.removeAttribute("media")}}function gi(e,t){let{head:n}=document;!n||!t||Rs(()=>{Su(n,e);let o=Ps(e),{type:r,sizes:i}=wu(t);o?Eu(n,o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function Is(e,t){let{head:n}=document;n&&Rs(()=>{Ps(e)?.remove(),Tu(n)})}function Os(e,t){let{head:n}=document;if(!n)return null;let o=0,r=new MutationObserver(i=>{if(pi)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===e?a=!0:Xo(c.target)&&(a=!0,ht(c.target.href)&&(s=c.target.href)));for(let l of c.removedNodes)Xo(l)&&l.id===e&&(a=!0);for(let l of c.addedNodes)Xo(l)&&l.id!==e&&(a=!0,ht(l.href)&&(s=l.href))}a&&(o||(o=requestAnimationFrame(()=>{o=0,t(s)})))});return r.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),r}var Bs=/\/c\/([a-zA-Z0-9_-]{8,})/i;function _(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=l=>{let d=n.indexOf(l);return d>=0&&n[d+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(l,d)=>{try{return document.querySelector(l)?.getAttribute(d)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function oe(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function yt(e){if(!e)return"";try{return(/^https?:/i.test(e)?new URL(e,location.origin).pathname:e).match(Bs)?.[1]??""}catch{return e.match(Bs)?.[1]??""}}function M(){let e=yt(location.pathname);if(e)return e;let n=_().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return""}var qs=new v("Harvest"),Lu=1500,ku=200,Jo=new Set,Zo=new Map,Qo=new Map,vt=null,er=null,kn=null,re=0;function Cu(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Mu(e){try{if(typeof e=="string")return e;if(e instanceof URL)return e.href;if(typeof Request<"u"&&e instanceof Request)return e.url}catch{}return String(e)}function Au(e,t){let n=t?.method,o=typeof Request<"u"&&e instanceof Request?e.method:"";return(n||o||"GET").toUpperCase()}function js(e){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(e)}function Hu(e,t){return t!=="POST"||js(e)?!1:/\/backend-api\/(?:f\/)?conversation(?:\/|\?|$)/i.test(e)}function Nu(e,t){return t!=="GET"||js(e)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(e)}function Ds(e){return e.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function Fs(e){return e?e.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function Ru(e){return typeof e=="string"?Fs(e):""}function bi(e){if(typeof e=="number"&&Number.isFinite(e)&&e>0)return e>1e12?e:Math.round(e*1e3);if(typeof e=="string"){let t=e.trim();if(!t)return null;if(/^\d+(\.\d+)?$/.test(t))return bi(Number(t));let n=Date.parse(t);return Number.isFinite(n)?n:null}return null}function zs(e,t){if(e.size<=t)return;let n=e.size-t,o=0;for(let r of e.keys())if(e.delete(r),++o>=n)break}function $s(e,t,n){!e||!t||Qo.get(e)!==t&&(Qo.set(e,t),zs(Qo,Lu),He({type:"message-time",messageId:e,createTime:t,conversationId:n}))}function Pu(e,t){let n=t.trim();!e||!n||Zo.get(e)!==n&&(Zo.set(e,n),zs(Zo,ku),He({type:"conversation-meta",conversationId:e,title:n}))}function Cn(e,t,n=0){if(n>6||!e||typeof e!="object")return;if(Array.isArray(e)){for(let c of e)Cn(c,t,n+1);return}let o=e,r=typeof o.conversation_id=="string"&&o.conversation_id||typeof o.conversationId=="string"&&o.conversationId||t;typeof o.title=="string"&&r&&!o.author&&!o.content&&!o.role&&Pu(r,o.title);let i=o.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let c=i,l=typeof c.id=="string"?c.id:"",d=bi(c.create_time??c.createTime??c.created_at);l&&d&&$s(l,d,r)}let a=typeof o.id=="string"?o.id:"",s=bi(o.create_time??o.createTime??o.created_at);if(a&&s&&(o.author||o.content||o.role||o.create_time||o.createTime)&&$s(a,s,r),o.mapping&&typeof o.mapping=="object")Cn(o.mapping,r,n+1);else if(n<3)for(let c of Object.values(o))c&&typeof c=="object"&&Cn(c,r,n+1)}function _s(e,t){if(e)try{Cn(JSON.parse(e),t)}catch{}}function He(e){for(let t of Array.from(Jo))try{t(e)}catch{}}async function Iu(e,t,n){if(n===re)try{let o=await e.json();if(n!==re)return;Cn(o,t)}catch{}}async function Ou(e,t,n,o){let r=t,i=n,a=e.body;if(!a){o===re&&He({type:"post-end",conversationId:r,error:i});return}let s=a.getReader(),c=new TextDecoder,l="";try{for(;o===re;){let{done:d,value:u}=await s.read();if(d)break;if(l+=c.decode(u,{stream:!0}),!r){let S=Fs(l);S&&(r=S,He({type:"post-start",conversationId:r,url:""}))}let m=l.split(`
`);l=m.pop()??"";for(let S of m){let E=S.replace(/^data:\s*/,"").trim();!E||E==="[DONE]"||_s(E,r)}/\[DONE\]/.test(l)||/"error"\s*:\s*\{/.test(l)?(/"error"\s*:\s*\{/.test(l)&&(i=!0),l=l.slice(-64)):l.length>16384&&(l=l.slice(-4096))}l&&o===re&&_s(l.replace(/^data:\s*/,""),r)}catch{i=!0}finally{try{s.cancel()}catch{}}o===re&&He({type:"post-end",conversationId:r,error:i})}function Bu(e,t,n){let o=Mu(t),r=Au(t,n),i=Nu(o,r),a=Hu(o,r),s=re,c="";return a&&(c=Ru(n?.body)||Ds(o)||yt(o)||M(),He({type:"post-start",conversationId:c,url:o})),e(t,n).then(l=>{if(s!==re||!i&&!a)return l;try{let d=l.clone();i?Iu(d,Ds(o)||M(),s):Ou(d,c,!l.ok,s)}catch{a&&He({type:"post-end",conversationId:c,error:!l.ok})}return l},l=>{throw a&&s===re&&He({type:"post-end",conversationId:c,error:!0}),l})}function Du(){if(vt)return;let e=Cu();kn=e,vt=e.fetch.bind(e);let t=(n,o)=>Bu(vt,n,o);er=t,e.fetch=t,qs.debug("conversation fetch harvest hooked")}function $u(){re+=1,!(!vt||!kn)&&(er&&kn.fetch===er&&(kn.fetch=vt),vt=null,er=null,kn=null,qs.debug("conversation fetch harvest unhooked"))}function ie(e){return Jo.add(e),Du(),()=>{Jo.delete(e),Jo.size===0&&$u()}}function xt(e){return e?Zo.get(e)??"":""}function tr(e){return e?Qo.get(e)??null:null}var Us=new v("Streaming");function _u(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!G(t))&&(C(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function qu(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&G(e))}function ju(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&G(e))}function Fu(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function K(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function N(){if(ui()||_u()||Fu())return!0;let e=pe();return e&&G(e)&&!C(e)?!1:!!(qu()||ju())}var zu=400,Gs=3,We=new Set,An,Hn=null,hi=null,Ve=!1,Ue=0,Ne="",ae="",Nn=!1,Rn=!1,Pn=!1;function Vs(){return oe(_())}function Ks(e,t){return{streaming:e,contextKey:t,conversationId:M()}}function Gu(e,t){if(!e||e===t)return!1;if(e.endsWith("|draft")&&!t.endsWith("|draft"))return!0;try{let n=e.split("|")[0],o=t.split("|")[0],r=new URL(n).pathname.replace(/\/$/,"")||"/",i=new URL(o).pathname.replace(/\/$/,"")||"/";if((r==="/"||r==="")&&i.startsWith("/c/"))return!0}catch{}return!1}function yi(){Ve=!1,Ue=0,Ne="",Nn=!1,Rn=!1,Pn=!1}function Ku(e){for(let t of Array.from(We))try{t.onFall?.(e)}catch{}}function Uu(e){for(let t of Array.from(We))try{t.onRise?.(e)}catch{}}function Mn(e){for(let t of Array.from(We))try{t.onTick?.(e)}catch{}}function Vu(e,t){for(let n of Array.from(We))try{n.onContext?.(e,t)}catch{}}function Wu(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest("button");n instanceof HTMLElement&&C(n)&&(Nn=!0)}function Yu(e){e.type==="post-end"&&Ve&&(Pn=!0,e.error&&(Rn=!0))}function Xu(){let e=Vs(),t=N();if(ae&&e&&ae!==e){if(Vu(e,ae),!Gu(ae,e)){yi(),ae=e,Mn(Ks(t,e));return}Ne===ae&&(Ne=e)}ae=e;let n=Ks(t,e);if(t){let i=!Ve;i&&(Nn=!1,Rn=!1,Pn=!1),Ve=!0,Ue=0,Ne=e,i&&Uu(n),Mn(n);return}if(!Ve){Mn(n);return}if(Ue+=1,Pn&&(Ue=Math.max(Ue,Gs)),Ue<Gs){Mn(n);return}let o=!!Ne&&Ne===e,r={contextKey:Ne||e,conversationId:M(),userStopped:Nn,error:Rn||K()};yi(),o&&Ku(r),Mn(n)}function Ju(){An===void 0&&(Ve=N(),ae=Vs(),Ne=Ve?ae:"",Ue=0,Nn=!1,Rn=!1,Pn=!1,Hn?.abort(),Hn=new AbortController,document.addEventListener("click",Wu,{capture:!0,signal:Hn.signal}),hi=ie(Yu),An=setInterval(Xu,zu),Us.debug("watchStreamingEdge started"))}function Zu(){We.size||(An!==void 0&&(clearInterval(An),An=void 0),Hn?.abort(),Hn=null,hi?.(),hi=null,yi(),ae="",Us.debug("watchStreamingEdge stopped"))}function se(e){let t=typeof e=="function"?{onFall:e}:e;return We.add(t),Ju(),()=>{We.delete(t),Zu()}}var Qu=["original","badge","dot","hole","bg"],Xs=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],Js={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},nr="#FCFCFC",em="#111111",Ws="#111111",tm="#ffffff",nm="#212121",om="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",rm={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},or=32,Ys=64;function Zs(e){return typeof e=="string"&&Qu.includes(e)}function im(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function rr(e){let t=document.createElement("canvas");t.width=or,t.height=or;let n=t.getContext("2d");return n?(n.scale(or/Ys,or/Ys),e(n),t.toDataURL("image/png")):""}function am(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function ir(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(om);n&&(e.strokeStyle=em,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function sm(e,t,n){let o=Js[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=Ws,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=Ws,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=tm,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function In(e,t){if(e==="original")return t==="wait"?rr(o=>ir(o,nr)):im(rm[t]);let n=t==="wait"?void 0:Js[t];return rr(e==="hole"?o=>ir(o,n??nr):e==="bg"?o=>{o.fillStyle=n??nm,am(o,0,0,64,64,14),o.fill(),ir(o,nr,!1)}:o=>{ir(o,nr),t!=="wait"&&sm(o,t,e==="dot"?"dot":"badge")})}function Qs(e){return{wait:In(e,"wait"),rotate:In(e,"rotate"),done:In(e,"done"),ready:In(e,"ready"),error:In(e,"error")}}var lm=new v("ChatStateFavicons"),Xe="bloom-chat-state-favicon",rl=x({style:{type:3,description:"Favicon overlay",options:Xs}}),St="",sr={wait:"",rotate:"",done:"",ready:"",error:""},lr="wait",Et=!1,be=!1,U=null,Bn="",Dn="",_n=!0,On=null,Tt=0,wt,ar=null,Ye=null,vi=null,$n=!1,el=new WeakSet,cm=400;function dm(){let e=rl.store.style;return Zs(e)?e:"bg"}function um(){let t=document.querySelector(`link[rel~="icon"]:not(#${Xe})`)?.href;return ht(t)?t:ht(St)?St:""}function V(e){if(lr===e){let t=document.getElementById(Xe);if(t instanceof HTMLLinkElement&&t.getAttribute("href")===sr[e])return}lr=e,gi(Xe,sr[e])}function tl(){sr=Qs(dm()),V(lr)}function mm(){let e=_(),t=e?oe(e):oe("");return N()?(!Bn&&t&&(Bn=t),Bn||t):(Bn="",t)}function il(){Et=!1,be=!1,U=null,Bn=""}function fm(e){Dn=e,il(),_n=!1,V("wait")}function nl(e,t){return!e&&_n&&!t}function al(){if(!$n)return;let e=_()||location.pathname;if(Dn&&e&&Dn!==e){fm(e);return}e&&(Dn=e);let t=mm(),n=N(),o=Ae(),r=di();if(K()&&!n){V("error"),Et=!1,be=!1,U=null;return}if(n){Et||(_n=!1),Et=!0,be=!1,U=t,V("rotate");return}if(Et){let i=!!U&&!!t&&U===t;if(Et=!1,i){be=!0,U=t,V("done");return}be=!1,U=null}if(be)if(!!(U&&t&&U!==t))be=!1,U=null;else if(o){V("done");return}else if(nl(o,r)){be=!1,V("ready");return}else{be=!1,V("wait");return}U=null,o?V("wait"):nl(o,r)?V("ready"):V("wait")}function sl(){let e=te();if(!(Ye&&vi===e&&e.isConnected)){if(Ye?.disconnect(),vi=e,!e||e===document.body){Ye=null;return}Ye=new MutationObserver(()=>cr()),Ye.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function cr(){!$n||Tt||(Tt=requestAnimationFrame(()=>{Tt=0,$n&&(ll(),sl(),al())}))}function ol(){ne()&&(_n=!0),cr()}function ll(){let e=D();!e||el.has(e)||(el.add(e),e.addEventListener("input",ol,{passive:!0}),e.addEventListener("compositionend",ol,{passive:!0}))}var cl=p({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:rl,startAt:"DOMContentLoaded",cleanupSelectors:[`#${Xe}`],start(){$n=!0,St=um()||St,tl(),ar?.disconnect(),ar=Os(Xe,e=>{ht(e)&&(St=e),gi(Xe,sr[lr])}),On?.abort(),On=new AbortController,window.addEventListener("popstate",cr,{signal:On.signal}),ll(),sl(),wt!==void 0&&clearInterval(wt),wt=setInterval(cr,cm),al(),lm.debug("favicon watch started")},stop(){$n=!1,Tt&&cancelAnimationFrame(Tt),Tt=0,wt!==void 0&&(clearInterval(wt),wt=void 0),On?.abort(),On=null,Ye?.disconnect(),Ye=null,vi=null,ar?.disconnect(),ar=null,il(),Dn="",_n=!0,Is(Xe,St)},onSettingsChange:tl});var dl=`.bloom-ih-hud {
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
`;var Yb=new v("InputHistory"),xi=/\u200B/g,ul=10,ml=500,fl=100,gm=8,bm=120,hm=2e3,dr=10,ur=x({maxEntries:{type:4,description:"Max stored prompts",min:ul,max:ml,default:fl},history:{type:5,description:"Stored prompts",render:Rm},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),wi=new Map,R=0,Ei="",le=!1,jn=!1,Li=0,qn=null,Si,ki=null,pl=!0;function W(){let e=ur.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function gl(e){let t=me(Number(ur.store.maxEntries??fl),ul,ml);return e.length>t?e.slice(e.length-t):e}function mr(e){ur.store.entries=gl(e)}function ym(e){return e.replaceAll(xi,"").replace(/\n$/,"").trim()}function Ti(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(ee);return n instanceof HTMLElement?n:D()}function vm(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!F(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(xi,"").trim().length===0,last:i.toString().replaceAll(xi,"").trim().length===0}}catch{return{first:!0,last:!0}}}function bl(e){clearTimeout(Si),Si=setTimeout(()=>{if(e!==Li)return;jn=!1;let t=ki;t&&mi(t,pl)},bm)}function hl(e,t,n){jn=!0,ki=e,pl=n;let o=++Li;ge(e,t,n),bl(o)}function xm(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function Lt(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function wm(){document.querySelector(".bloom-ih-hud")?.remove()}function Em(e,t){let n=xm();n.textContent=e;let o=(t.closest("form")??te()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-gm)}px`,n.classList.add("bloom-ih-hud-on")}function Ci(e){let t=ym(e);if(!t)return;let n=Date.now(),o=wi.get(t);if(o&&n-o<hm)return;wi.set(t,n);let r=W().filter(i=>i!==t);r.push(t),mr(r),R=W().length,le=!1,Lt()}function Sm(e,t){let n=W();if(!n.length&&e)return;R>=n.length&&(Ei=F(t),R=n.length);let o=e?R-1:R+1;o<0||o>n.length||(R=o,le=!0,hl(t,o===n.length?Ei:n[o],e),o<n.length?Em(`${o+1} / ${n.length}`,t):Lt())}function Tm(e){le=!1,Lt(),hl(e,Ei,!1),R=W().length}function Lm(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=Ti(e.target)??Ti(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&le&&!e.altKey&&!e.shiftKey){Tm(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){Ci(F(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=W();if(!o){let i=vm(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||R<=0)||!n&&R>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),Sm(n,t))}function km(e){if(Ti(e.target)){if(jn){bl(Li);return}le&&(le=!1,Lt(),R=W().length)}}function Cm(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(ee);n instanceof HTMLElement&&Ci(F(n))}function Mm(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(bt);if(!n||!(n instanceof HTMLElement)||C(n))return;let o=D();o&&Ci(F(o))}function Am(e){if(!(!le||jn)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}le=!1,Lt()}}function Hm(){if(qn)return;qn=new AbortController;let{signal:e}=qn,t={capture:!0,signal:e};window.addEventListener("keydown",Lm,t),window.addEventListener("input",km,t),window.addEventListener("submit",Cm,t),window.addEventListener("click",Mm,t),window.addEventListener("pointerdown",Am,t)}function Nm(e){let t=W().slice();t.splice(e,1),mr(t),R>t.length&&(R=t.length)}function Rm(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=W().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(f=>f.toLowerCase().includes(a)):i,c=Math.max(1,Math.ceil(s.length/dr));n>=c&&(n=c-1);let l=s.slice(n*dr,n*dr+dr);e.replaceChildren();let d=document.createElement("input");if(d.className="bloom-ih-search",d.type="search",d.placeholder="Search history",d.autocomplete="off",d.value=t,d.addEventListener("input",()=>{t=d.value,n=0,r()}),e.appendChild(d),l.length){let f=document.createElement("div");f.className="bloom-ih-list",l.forEach((T,$)=>{let j=i.indexOf(T),rn=W().length-1-j,st=document.createElement("div");st.className="bloom-ih-item";let we=document.createElement("button");we.type="button",we.className=`bloom-ih-body${o===$?"":" bloom-ih-clamp"}`,we.textContent=T,we.addEventListener("click",()=>{o=o===$?-1:$,r()});let an=document.createElement("div");an.className="bloom-ih-actions";let lt=document.createElement("button");lt.type="button",lt.title="Copy",lt.textContent="C",lt.addEventListener("click",()=>{Na(T)});let qe=document.createElement("button");qe.type="button",qe.title="Delete",qe.textContent="\xD7",qe.addEventListener("click",()=>{Nm(rn),r()}),an.append(lt,qe),st.append(we,an),f.appendChild(st)}),e.appendChild(f)}else{let f=document.createElement("p");f.className="bloom-ih-empty",f.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(f)}let u=document.createElement("div");u.className="bloom-ih-pager";let m=document.createElement("button");m.type="button",m.className="bloom-ih-btn",m.textContent="Prev",m.disabled=n<=0,m.addEventListener("click",()=>{n-=1,r()});let S=document.createElement("span");S.textContent=`${n+1} / ${c}`;let E=document.createElement("button");E.type="button",E.className="bloom-ih-btn",E.textContent="Next",E.disabled=n+1>=c,E.addEventListener("click",()=>{n+=1,r()});let g=document.createElement("button");g.type="button",g.className="bloom-ih-clear",g.textContent="Clear all",g.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(mr([]),R=0,r())}),u.append(m,S,E,g),e.appendChild(u)};return r(),()=>{e.replaceChildren()}}var yl=p({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:ur,startAt:"HostReady",managedStyle:"inputHistory",start(){w("inputHistory",dl),R=W().length,le=!1,Hm()},stop(){qn?.abort(),qn=null,Lt(),wm(),wi.clear(),clearTimeout(Si),jn=!1,ki=null,le=!1},onSettingsChange(){let e=W(),t=gl(e);t.length!==e.length&&mr(t),R>t.length&&(R=t.length)}});var Mi="noShareLink",Pm=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],Im=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],Ai=x({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function vl(e){return`${e.join(",")}{display:none!important}`}function xl(){let e=[];if(Ai.store.hideShareChat!==!1&&e.push(vl(Pm)),Ai.store.hideShareProject!==!1&&e.push(vl(Im)),!e.length){y(Mi);return}w(Mi,e.join(`
`))}var wl=p({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[h.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Ai,start:xl,onSettingsChange:xl,stop(){y(Mi)}});var Tl="noDictation",Om=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],Bm=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Ll=x({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function El(e){return`${e.join(",")}{display:none!important}`}function Sl(){let e=[El(Om)];Ll.store.hideDictationSettings!==!1&&e.push(El(Bm)),w(Tl,e.join(`
`))}var kl=p({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Ll,start:Sl,onSettingsChange:Sl,stop(){y(Tl)}});var Hi="noSidebarIdentity",kt=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Ni=kt.flatMap(e=>[`${e} .min-w-0 > .truncate`,`${e} .min-w-0.flex-1 .truncate`]),Hl=kt.flatMap(e=>[`${e} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),Dm=[...Ni,...Hl],Cl=[...Ni,...kt.flatMap(e=>[`${e} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],$m=kt.map(e=>`${e} a[href^="mailto:"]`),_m=kt.flatMap(e=>[`${e} .min-w-0 > :not(.truncate)`,`${e} .min-w-0 > :not(.truncate) *`,`${e} .min-w-0 .text-xs`,`${e} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${e} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${e} .text-xs:not(.truncate)`,`${e} .text-token-text-secondary:not(.truncate)`,`${e} .text-token-text-tertiary:not(.truncate)`,`${e} .min-w-0 ~ *`,`${e} .min-w-0 ~ * *`,`${e} > .text-xs`,`${e} > .text-token-text-secondary`,`${e} > .text-token-text-tertiary`]),qm=kt.flatMap(e=>[`${e} .min-w-0.flex-col > :not(.truncate)`,`${e} .min-w-0.flex-col > .text-xs`,`${e} .min-w-0.flex-col > .text-token-text-secondary`,`${e} .min-w-0.flex-col > .text-token-text-tertiary`,`${e} .min-w-0:not(.flex) > :not(.truncate)`,`${e} .min-w-0:not(.flex) > .text-xs`,`${e} .min-w-0:not(.flex) > .text-token-text-secondary`,`${e} .min-w-0:not(.flex) > .text-token-text-tertiary`]),Fn=x({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function Ml(e){return`${e.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function jm(e){return`${e.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function Fm(){return`${qm.join(",")}{margin-block:auto!important}`}function zm(){return`${_m.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function Al(){let e=Fn.store.hideUsername!==!1,t=Fn.store.hideEmail!==!1,n=e&&Fn.store.enlargePlan!==!1,o=e&&Fn.store.alignPlanWithAvatar===!0,r=[];if(e&&(o?(r.push(jm(n?Cl:[...Cl,...Hl])),r.push(Fm())):r.push(Ml(n?Ni:Dm))),t&&r.push(Ml($m)),n&&r.push(zm()),!r.length){y(Hi);return}w(Hi,r.join(`
`))}var Nl=p({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[h.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Fn,start:Al,onSettingsChange:Al,stop(){y(Hi)}});var Rl=`#bloom-rt-host {
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
`;var Ol=new v("RecentTopics"),At="bloom-rt-host",Bl="home",Dl=/^\/c\/([a-z0-9_-]{8,})/i,Km=/\/c\/([a-z0-9_-]{8,})/i,$l=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Um=new Set(["Backquote","IntlBackslash"]),Vm=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Wm=140,Ym=[3,4,5,6,7,8,9,10,11,12].map(e=>({label:String(e),value:String(e),default:e===5})),P=x({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Ym},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),fr=null,Pi=null,q=!1,Wn=!1,zn=!1,ce=0,Je="",Ct=null,Gn=null,Mt,Ri=null;function Xm(){let e=Number(P.store.maxRecent??5);return Number.isFinite(e)&&e>=3&&e<=12?e:5}function Kn(){let e=P.plain.visits;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ii(){let e=P.plain.titles;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function _l(){let e=P.plain.previews;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Oi(){let e=P.plain.projects;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function gr(e){let t=Xm();return e.length>t?e.slice(0,t):e}function de(e){return e===Bl}function Un(e,t=Wm){let n=e.replace(/\s+/g," ").trim();return n.length<=t?n:`${n.slice(0,t-1)}\u2026`}function Bi(e){if(!e)return"";try{return new URL(e,location.origin).pathname.match(Dl)?.[1]??""}catch{return e.match(Km)?.[1]??""}}function Ze(){let e=(location.pathname||"/").match(Dl);if(e?.[1])return e[1];let n=_().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return Bl}function Di(e){if(de(e))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${e}"]`);for(let o of n){if(Bi(o.getAttribute("href")||"")!==e)continue;let r=Un(o.textContent||"",80);if(r)return r}}catch{}let t=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return Ze()===e&&t&&!/^ChatGPT$/i.test(t)?Un(t,80):""}function Jm(e){if(de(e))return"New chat";let t=Ii()[e];if(t)return t;let n=xt(e);return n||Di(e)||"Chat"}function Zm(e){return Oi()[e]||""}function Qm(e){return _l()[e]||{}}function $i(e,t){if(!e||de(e)||!t||/^new chat$/i.test(t.trim()))return;let n=Ii();n[e]!==t&&(n[e]=t,P.store.titles=n)}function ef(e){e.type==="conversation-meta"&&($i(e.conversationId,e.title),q&&Ht())}function tf(e,t){if(!e||de(e)||!t)return;let n=Oi();n[e]!==t&&(n[e]=t,P.store.projects=n)}function nf(e,t){if(!e||de(e)||!t.user&&!t.assistant)return;let n=_l(),o=n[e]||{},r={user:t.user||o.user,assistant:t.assistant||o.assistant};o.user===r.user&&o.assistant===r.assistant||(n[e]=r,P.store.previews=n)}function _i(e){if(!e||de(e)&&P.store.includeHome===!1)return;let t=Kn().filter(n=>n!==e);t.unshift(e),P.store.visits=gr(t)}function br(){let e=P.store.includeHome!==!1;return gr(Kn().filter(n=>e||!de(n))).map(n=>({id:n,title:Jm(n),project:Zm(n),preview:Qm(n)}))}function Pl(e){try{let t=document.querySelectorAll(`[data-message-author-role="${e}"]`),n=t[t.length-1];if(!(n instanceof HTMLElement))return"";let o=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||o.push(a)}let r=o.length?o.join(" "):n.textContent||"";return Un(r)}catch{return""}}function Vn(e){if(!e||de(e)||e!==Ze())return;let t=Di(e);t&&$i(e,t);let n=Pl("user"),o=Pl("assistant");nf(e,{user:n,assistant:o});let r=jl(e);if(r){let i=ql(r);i&&tf(e,i)}}function qi(){let e=Ii(),t=Oi(),n=[],o=new Set,r=!1,i=!1;try{for(let l of document.querySelectorAll('a[href*="/c/"]')){if(l.closest(`#${At}, #bloom-root, #bloom-sidebar-panel`))continue;let d=Bi(l.getAttribute("href")||"");if(!d||o.has(d))continue;o.add(d),n.push(d);let u=Un(l.textContent||"",80);u&&!$l.test(u)&&e[d]!==u&&(e[d]=u,r=!0);let m=ql(l);m&&t[d]!==m&&(t[d]=m,i=!0)}}catch{}r&&(P.store.titles=e),i&&(P.store.projects=t);let a=Kn(),s=new Set(a),c=n.filter(l=>!s.has(l));c.length&&(P.store.visits=gr([...a,...c]))}function ql(e){let t=e.parentElement;for(let n=0;n<10&&t;n++){if(t.id==="bloom-rt-host"||t.id==="bloom-root"){t=t.parentElement;continue}let o=t.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),r=Un((o instanceof HTMLElement?o.textContent:"")||"",60);if(r&&!$l.test(r)&&!/^20\d{2}/.test(r)&&r!==e.textContent?.trim()&&t.querySelector('a[href^="/c/"]'))return r;t=t.parentElement}return""}function jl(e){if(de(e)){let t=document.querySelector('[data-testid="create-new-chat-button"]');return t instanceof HTMLAnchorElement?t:document.querySelector('a[href="/"]')}try{for(let t of document.querySelectorAll(`a[href*="/c/${e}"]`))if(Bi(t.getAttribute("href")||"")===e)return t}catch{}return null}function of(e){let t=jl(e);if(t){t.click();return}if(de(e)){location.assign("/");return}location.assign(`/c/${e}`)}function rf(){let e=Ze();Je&&Je!==e&&Vn(Je),Je=e,_i(e),qi();let t=Di(e);t&&$i(e,t),Vn(e)}function pr(){Mt===void 0&&(Mt=window.setTimeout(()=>{Mt=void 0,rf()},120))}function af(){Ct||(Ct=history.pushState.bind(history),Gn=history.replaceState.bind(history),history.pushState=function(...t){let n=Ct(...t);return pr(),n},history.replaceState=function(...t){let n=Gn(...t);return pr(),n})}function sf(){Ct&&(history.pushState=Ct),Gn&&(history.replaceState=Gn),Ct=null,Gn=null}function lf(e){return Um.has(e.code)||e.keyCode===192?!0:Vm.has(e.key)}function Fl(e){return e.key==="Control"||e.code==="ControlLeft"||e.code==="ControlRight"}function cf(e,t){Wn=t,qi(),Vn(Ze()),q=!0,ce=0;try{let n=Ze();_i(n);let o=br();o.length>1&&(ce=e?o.length-1:1)}catch(n){Ol.error("Failed to open switcher:",n)}Ht()}function Il(e){let{length:t}=br();t&&(ce=(ce+(e?-1:1)+t)%t,Ht())}function ji(){if(!q)return;let e=br()[ce];q=!1,Wn=!1,Ht(),e&&of(e.id)}function zl(){q&&(q=!1,Wn=!1,Ht())}function df(e){if(Fl(e)){zn=!0;return}if((e.ctrlKey||zn)&&!e.altKey&&!e.metaKey&&lf(e)&&!e.repeat){e.preventDefault(),e.stopImmediatePropagation();try{q?Il(e.shiftKey):cf(e.shiftKey,!0)}catch(n){Ol.error("Hotkey failed:",n)}return}if(q){if(e.key==="Escape"){e.preventDefault(),zl();return}if(e.key==="Enter"&&!e.shiftKey){e.preventDefault(),ji();return}e.key==="Tab"&&(e.ctrlKey||zn)&&(e.preventDefault(),Il(e.shiftKey))}}function uf(e){Fl(e)&&(zn=!1,q&&Wn&&ji())}function mf(e){let t=e.target instanceof Element?e.target:null;!t||!t.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(pr)}function ff(e){!q||(e.target instanceof Element?e.target:null)?.closest(`#${At}`)||zl()}function pf(){document.visibilityState==="hidden"&&Vn(Ze())}function gf(){if(!document.body)return null;let e=document.getElementById(At);if(e instanceof HTMLElement)return Pi=e,e;e=document.createElement("div"),e.id=At;let t=document.createElement("div");return t.className="bloom-rt-panel",t.setAttribute("role","listbox"),t.setAttribute("aria-label","Recent conversations"),t.dataset.visible="false",t.addEventListener("click",n=>n.stopPropagation()),e.append(t),document.body.append(e),Pi=e,e}function Ht(){let e=gf();if(!e)return;let t=e.querySelector(".bloom-rt-panel");if(!t)return;if(!q){t.dataset.visible="false",t.replaceChildren();return}let n=br();if(!n.length){t.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",t.replaceChildren(i);return}ce>=n.length&&(ce=0);let o=document.createElement("div");o.className="bloom-rt-list",o.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===ce?"true":"false",s.setAttribute("aria-selected",a===ce?"true":"false");let c=document.createElement("div");if(c.className="bloom-rt-name",c.textContent=i.title,s.append(c),i.project){let l=document.createElement("div");l.className="bloom-rt-project",l.textContent=i.project,s.append(l)}if(i.preview.user||i.preview.assistant){let l=document.createElement("div");if(l.className="bloom-rt-preview",i.preview.user){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="user",d.textContent=i.preview.user,l.append(d)}if(i.preview.assistant){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="assistant",d.textContent=i.preview.assistant,l.append(d)}s.append(l)}s.addEventListener("click",()=>{ce=a,ji()}),o.append(s)}),t.replaceChildren(o),t.dataset.visible="true",t.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function bf(){document.getElementById(At)?.remove(),Pi=null}var Gl=p({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${At}`],settings:P,start(){w("recentTopics",Rl),Je=Ze(),_i(Je),qi(),Vn(Je),Ri=ie(ef),af(),fr=new AbortController;let{signal:e}=fr;window.addEventListener("keydown",df,{capture:!0,signal:e}),window.addEventListener("keyup",uf,{capture:!0,signal:e}),window.addEventListener("popstate",pr,{signal:e}),document.addEventListener("click",mf,{capture:!0,signal:e}),document.addEventListener("click",ff,{signal:e}),document.addEventListener("visibilitychange",pf,{signal:e})},stop(){fr?.abort(),fr=null,Mt!==void 0&&(clearTimeout(Mt),Mt=void 0),sf(),Ri?.(),Ri=null,q=!1,Wn=!1,zn=!1,bf()},onSettingsChange(){let e=gr(Kn());e.length!==Kn().length&&(P.store.visits=e),q&&Ht()}});var Fi="cleaner",hf=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],yf=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],vf=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],xf=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],wf=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],Ef=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],Qe=x({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function Nt(e){return`${e.join(",")}{display:none!important}`}function Kl(){let e=[];if(Qe.store.hideDownloadApps!==!1&&e.push(Nt(hf)),Qe.store.hideDisclaimer!==!1&&e.push(Nt(yf)),Qe.store.hideUpgrade!==!1&&e.push(Nt(vf)),Qe.store.hideLockedModels!==!1&&e.push(Nt(xf)),Qe.store.hideHomePromo!==!1&&e.push(Nt(wf)),Qe.store.hideAds!==!1&&e.push(Nt(Ef)),!e.length){y(Fi);return}w(Fi,e.join(`
`))}var Ul=p({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[h.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Qe,start:Kl,onSettingsChange:Kl,stop(){y(Fi)}});var yr=new v("ResponseNotification"),Pt=x({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:Af},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),zi=!1,hr=null,Rt=null,Yn=null;function Sf(){return document.visibilityState==="hidden"||document.hidden}function Tf(){return Pt.store.onlyWhenHidden===!1?!0:Sf()}function Lf(){let e=xt(M());if(e)return e;let t=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return t&&!/^ChatGPT$/i.test(t)?t:"Chat"}function Vl(){try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!Rt||Rt.state==="closed")&&(Rt=new e);let t=Rt,n=t.currentTime,o=[523.25,659.25];for(let r=0;r<o.length;r++){let i=t.createOscillator(),a=t.createGain();i.type="sine",i.frequency.value=o[r];let s=n+r*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(t.destination),i.start(s),i.stop(s+.24)}t.resume?.()}catch(e){yr.debug("chime failed",e)}}function kf(e){try{let t=new Audio(e);t.volume=.7,t.play()}catch(t){yr.debug("custom sound failed",t),Vl()}}function Wl(){let e=String(Pt.store.soundUrl||"").trim();e?kf(e):Vl()}function Cf(){let e="Bloom++",t=`${Lf()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:e,text:t,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(e,{body:t,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){yr.debug("notification failed",n)}}function Mf(){Tf()&&(Pt.store.sound!==!1&&Wl(),Pt.store.browserNotification!==!1&&Cf())}function Af(e){let t=document.createElement("button");return t.type="button",t.textContent="Play",t.addEventListener("click",()=>Wl()),e.appendChild(t),()=>{t.remove()}}var Yl=p({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Pt,start(){zi=!0,hr?.(),hr=se(e=>{zi&&(e.userStopped||e.error||Mf())}),Yn?.abort(),Yn=new AbortController,Pt.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:Yn.signal}),yr.debug("watch started")},stop(){zi=!1,hr?.(),hr=null,Yn?.abort(),Yn=null;try{Rt?.close()}catch{}Rt=null}});var Xl=`#bloom-pq-chip {
    position: fixed;
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 8px;
    max-width: min(32rem, calc(100vw - 2rem));
    padding: 6px 8px 6px 12px;
    border-radius: 999px;
    border: 1px solid var(--border-light, rgba(0, 0, 0, 0.1));
    background: var(--bg-primary, var(--main-surface-primary, #fff));
    color: var(--text-primary, inherit);
    box-shadow: var(--shadow-long, 0 4px 16px rgba(0, 0, 0, 0.12));
    font: 13px/1.3 ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
    transform: translateX(-50%);
    pointer-events: auto;
}

.bloom-pq-kicker {
    flex: none;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--text-secondary, #5d5d5d);
}

.bloom-pq-text {
    min-width: 0;
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.bloom-pq-actions {
    display: flex;
    flex: none;
    gap: 2px;
}

.bloom-pq-btn {
    appearance: none;
    height: 28px;
    padding: 0 10px;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: inherit;
    font: inherit;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
}

.bloom-pq-btn:hover {
    background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.06));
}

.bloom-pq-send {
    color: var(--text-primary, inherit);
}

.bloom-pq-x {
    width: 28px;
    padding: 0;
    font-size: 16px;
    line-height: 1;
    color: var(--text-secondary, #5d5d5d);
}

@media (prefers-reduced-motion: reduce) {
    #bloom-pq-chip { transition: none; }
}
`;var Qn=new v("PromptQueue"),Ki="bloom-pq-chip",Jl="promptQueue",Zl=80,Nf=50,Rf=2e3,nc=x({replacePending:{type:2,description:"Replace the queued prompt if you Enter again while one is waiting.",default:!0}}),O=new Map,he=!1,Y="",I="",Pe=!1,X=!1,A=null,Xn=null,vr=null,Zn,Jn,It=null;function Ot(){return oe(_())}function Bt(e){return e.replaceAll("\u200B","").replace(/\n$/,"").trim()}function Ql(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(ee);return n instanceof HTMLElement?n:D()}function Ui(e){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation()}function oc(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function Pf(){try{let e=document.querySelectorAll('[data-message-author-role="user"]'),t=e[e.length-1];return t instanceof HTMLElement?Bt(t.innerText||t.textContent||""):""}catch{return""}}function If(e,t){if(!e||e===t)return!1;if(e.endsWith("|draft")&&!t.endsWith("|draft"))return!0;try{let n=e.split("|")[0],o=t.split("|")[0],r=new URL(n).pathname.replace(/\/$/,"")||"/",i=new URL(o).pathname.replace(/\/$/,"")||"/";if((r==="/"||r==="")&&i.startsWith("/c/"))return!0}catch{}return!1}function ec(e){if(!Y||Y===e)return;let t=O.get(Y);!t||O.has(e)||If(Y,e)&&(O.delete(Y),O.set(e,t),I===Y&&(I=e),A?.key===Y&&(A.key=e),Qn.debug("migrated pending",Y,"\u2192",e))}function Vi(e){let t=Ot();if(O.get(t)&&nc.store.replacePending===!1)return;O.set(t,{text:e,at:Date.now()}),A={key:t,text:e,turns:oc(),ticks:3};let o=D();o&&ge(o,""),Re(),Qn.debug("queued",t,e.length)}function Of(e){O.delete(e),I===e&&(I=""),A?.key===e&&(A=null),Re()}function Bf(){X=!0,clearTimeout(Jn),Jn=setTimeout(()=>{X=!1,Jn=void 0},Rf)}function Df(){let e=Ot(),t=O.get(e);if(!t)return;let n=D();if(!n)return;O.delete(e),I="",Re(),Bf(),ge(n,t.text);let o=pe();o&&!C(o)&&!Tn(o)&&(o.click(),X=!1)}function tc(e){if(!he||Pe||N()||Ot()!==e)return;let t=O.get(e);if(!t){I="";return}if(K())return;let n=D();if(!n)return;if(!Ae(n)){let r=Bt(F(n));if(r&&r!==t.text)return}let o=pe();!o||C(o)||Tn(o)||(Pe=!0,ge(n,t.text),clearTimeout(Zn),Zn=setTimeout(()=>$f(e,t.text),Nf))}function $f(e,t){Zn=void 0;try{if(!he)return;let n=O.get(e);if(!n||n.text!==t||N()||Ot()!==e)return;let o=D();if(!o)return;let r=Bt(F(o));if(r&&r!==t&&!Ae(o))return;r!==t&&ge(o,t);let i=pe();if(!i||C(i)||Tn(i))return;i.click(),O.delete(e),I="",Re(),Qn.debug("drained",e)}finally{Pe=!1}}function rc(e){let t=te();if(!t||t===document.body){e.style.left="50%",e.style.bottom="6.5rem";return}let n=t.getBoundingClientRect();e.style.left=`${Math.round(n.left+n.width/2)}px`,e.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`;let o=Math.min(512,Math.max(160,n.width-24));e.style.maxWidth=`${Math.round(o)}px`}function Gi(){It?.remove(),It=null}function Re(){if(!he||!document.body){Gi();return}let e=Ot(),t=O.get(e);if(!t){Gi();return}let n=It;n?.isConnected||(n=document.createElement("div"),n.id=Ki,document.body.appendChild(n),It=n),n.replaceChildren();let o=document.createElement("span");o.className="bloom-pq-kicker",o.textContent="Next";let r=document.createElement("span");r.className="bloom-pq-text";let i=t.text.length>Zl?`${t.text.slice(0,Zl)}\u2026`:t.text;r.textContent=i,r.title=t.text;let a=document.createElement("div");a.className="bloom-pq-actions";let s=document.createElement("button");s.type="button",s.className="bloom-pq-btn bloom-pq-send",s.textContent="Send now",s.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),Df()});let c=document.createElement("button");c.type="button",c.className="bloom-pq-btn bloom-pq-x",c.setAttribute("aria-label","Dismiss queued prompt"),c.textContent="\xD7",c.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),Of(e)}),a.append(s,c),n.append(o,r,a),rc(n)}function _f(){if(!A)return;if(A.ticks-=1,O.get(A.key)&&oc()>A.turns){let t=Pf();if(t&&t===A.text){Qn.debug("native send leaked; dropping pending"),O.delete(A.key),I===A.key&&(I=""),A=null,Re();return}}A.ticks<=0&&(A=null)}function qf(e){if(!he||e.isComposing||e.keyCode===229||e.key!=="Enter"||e.shiftKey||e.ctrlKey||e.metaKey||Pe)return;let t=Ql(e.target)??Ql(document.activeElement);if(!t||!N())return;if(e.altKey||X){X=!1;return}if(!ne(t))return;let n=Bt(F(t));n&&(Ui(e),Vi(n))}function jf(e){let t=e.closest("button");if(!(t instanceof HTMLElement)||C(t))return null;let n=e.closest(bt);if(n instanceof HTMLElement&&!C(n))return n;let o=pe();return o&&(t===o||o.contains(t)||t.contains(o))?o:null}function Ff(e){if(!he)return;let t=e.target;if(!(t instanceof Element)||t.closest(`#${Ki}`))return;let n=t.closest("button");if(n instanceof HTMLElement&&C(n)||Pe||!N()||!jf(t))return;if(X){X=!1;return}let o=D();if(!o||!ne(o))return;let r=Bt(F(o));r&&(Ui(e),Vi(r))}function zf(e){if(!he)return;let t=e.target;if(!(t instanceof HTMLFormElement)||!t.matches(Yo)&&!t.querySelector(ee)||Pe||!N())return;if(X){X=!1;return}let n=D()??t.querySelector(ee);if(!n||!ne(n))return;let o=Bt(F(n));o&&(Ui(e),Vi(o))}var ic=p({name:"PromptQueue",description:"Queue the next prompt while a reply is streaming. Enter/Send waits for this turn instead of interrupting.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Jl,cleanupSelectors:[`#${Ki}`],settings:nc,start(){he=!0,Y=Ot(),I="",Pe=!1,X=!1,A=null,w(Jl,Xl),Xn?.abort(),Xn=new AbortController;let{signal:e}=Xn;window.addEventListener("keydown",qf,{capture:!0,signal:e}),document.addEventListener("click",Ff,{capture:!0,signal:e}),document.addEventListener("submit",zf,{capture:!0,signal:e}),vr?.(),vr=se({onFall(t){if(he){if(t.userStopped||t.error){I="",Re();return}I=t.contextKey,tc(t.contextKey)}},onContext(t){ec(t),Y=t,Re()},onTick(t){ec(t.contextKey),Y=t.contextKey,_f(),I&&I===t.contextKey&&tc(I),It&&rc(It)}}),Re(),Qn.debug("watch started")},stop(){he=!1,vr?.(),vr=null,Xn?.abort(),Xn=null,clearTimeout(Zn),Zn=void 0,clearTimeout(Jn),Jn=void 0,O.clear(),A=null,I="",Pe=!1,X=!1,Gi()}});var ac=`.bloom-cls {
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
`;var cc=new v("ChatListStatus"),sc="chatListStatus",Er="bloom-cls",Kf="bloom-cls",Uf=1200*1e3,Vf="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",Oe=new Map,Be=!1,Dt="",eo=!1,_t=0,Ie=null,Xi=null,$t=null,Wi=null,xr=null,qt=!1;function wr(){return Date.now()}function dc(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function jt(e,t,n,o=!0){if(!(!e||!Be)){if(t==="idle")Oe.delete(e);else{let r=Oe.get(e);r&&r.kind===t&&n!=="net"?r.at=wr():Oe.set(e,{kind:t,at:wr(),source:n})}o&&Wf({v:1,id:e,kind:t,at:wr()}),Sr()}}function Wf(e){try{$t?.postMessage(e)}catch{}}function Yf(e){let t=e.data;!t||t.v!==1||!t.id||t.kind!=="streaming"&&t.kind!=="done"&&t.kind!=="error"&&t.kind!=="idle"||jt(t.id,t.kind,"bc",!1)}function Xf(){let e=wr();for(let[t,n]of Oe)n.kind==="streaming"&&e-n.at>Uf&&Oe.delete(t)}function Jf(){let e=dc();if(!e)return[];let t=[],n=new Set;try{for(let o of e.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(o.closest(Vf))continue;let r=yt(o.getAttribute("href")||"");!r||n.has(r)||(n.add(r),t.push(o))}}catch{}return t}function lc(e){let t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),e==="streaming")t.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("cx","12"),o.setAttribute("cy","12"),o.setAttribute("r","9"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","2"),t.appendChild(o)}return t.appendChild(n),t}function Yi(e){let t=e.querySelector(`:scope > .${Er}`);return t||null}function Zf(){if(!Be)return;Xf();let e=M(),t=Jf();Ie?.disconnect();try{for(let n of t){let o=yt(n.getAttribute("href")||"");if(!o||!e||o!==e){Yi(n)?.remove();continue}let i=Oe.get(o)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){Yi(n)?.remove();continue}let a=Yi(n);a||(a=document.createElement("span"),a.className=Er,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(lc("streaming")):i==="error"&&a.appendChild(lc("error")))}}catch(n){cc.debug("paint failed",n)}uc()}function Sr(){!Be||_t||(_t=requestAnimationFrame(()=>{_t=0,Be&&Zf()}))}function uc(){let e=dc();if(!(Ie&&Xi===e&&e?.isConnected)){if(Ie?.disconnect(),Xi=e,!e){Ie=null;return}Ie=new MutationObserver(()=>Sr()),Ie.observe(e,{childList:!0,subtree:!0})}}function Qf(e){if(Be){if(e.type==="post-start"){e.conversationId?(qt=!1,jt(e.conversationId,"streaming","net")):qt=!0;return}e.type==="post-end"&&(qt=!1,e.conversationId&&jt(e.conversationId,e.error?"error":"done","net"))}}function ep(e){if(!Be)return;let t=e.conversationId||M();if(Dt&&t&&Dt!==t){let n=Oe.get(Dt);n?.kind==="streaming"&&n.source==="local"&&jt(Dt,K()?"error":"done","local"),eo=!1}if(Dt=t,e.streaming){eo=!0,t&&jt(t,"streaming","local"),Sr();return}eo&&(eo=!1,t&&jt(t,K()?"error":"done","local")),qt=!1,Sr()}var mc=p({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Er}`],start(){Be=!0,w(sc,ac);try{$t=new BroadcastChannel(Kf)}catch{$t=null}$t?.addEventListener("message",Yf),Wi=ie(Qf),xr?.(),xr=se({onTick:ep}),uc(),cc.debug("sidebar status watch started")},stop(){Be=!1,_t&&cancelAnimationFrame(_t),_t=0,Ie?.disconnect(),Ie=null,Xi=null,xr?.(),xr=null,Wi?.(),Wi=null;try{$t?.close()}catch{}$t=null,Oe.clear(),qt=!1,eo=!1,Dt="",document.querySelectorAll(`.${Er}`).forEach(e=>e.remove()),y(sc)}});var pc="widerChat",gc=40,bc=96,hc=64,yc=x({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:gc,max:bc,default:hc}});function tp(){return me(Number(yc.store.width??hc),gc,bc)}function fc(){let e=tp(),t=`min(100%,${e}rem)`;w(pc,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important;--user-chat-width:${e}rem!important;--composer-container-max-width:${e}rem!important;--thread-xl-max-width:${e}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${t}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${t}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${t}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${t}!important}`)}var vc=p({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[h.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:yc,start:fc,onSettingsChange:fc,stop(){y(pc)}});var Ji="composerOpacity",Ft='form[data-type="unified-composer"],form.w-full[data-type]',np=[`${Ft} [class*="corner-superellipse"]`,`${Ft} [class*="bg-token-bg-primary"]`,`${Ft} [class*="bg-token-main-surface"]`].join(","),op=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),rp="#thread-bottom-container,#thread-bottom",ip=`${Ft} #prompt-textarea,${Ft} [contenteditable="true"]`,ap="var(--bg-primary,var(--main-surface-primary,#ffffff))",Zi=x({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function sp(){return me(Number(Zi.store.opacity??100),0,100)}function lp(){return me(Number(Zi.store.blur??16),0,40)}function xc(){let e=sp();if(e>=100){y(Ji);return}let t=lp(),n=`color-mix(in srgb,${ap} ${e}%,transparent)`,o=t>0?`-webkit-backdrop-filter:blur(${t}px)!important;backdrop-filter:blur(${t}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";w(Ji,`${rp}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${op}{display:none!important}${Ft}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${np}{background-color:${n}!important;background-image:none!important;${o}}${ip}{background-color:transparent!important;background-image:none!important}`)}var wc=p({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[h.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Zi,start:xc,onSettingsChange:xc,stop(){y(Ji)}});var Ec=`#bloom-bn-host {
    position: fixed;
    z-index: 4200;
    width: 18px;
    box-sizing: border-box;
    pointer-events: none;
    font: 13px/1.35 ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
    color: var(--text-primary, #0d0d0d);
}

#bloom-bn-host[hidden] {
    display: none !important;
}

.bloom-bn-ticks {
    pointer-events: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-end;
    height: 100%;
    width: 18px;
    padding: 6px 0;
    box-sizing: border-box;
}

.bloom-bn-tick {
    appearance: none;
    flex: 0 0 auto;
    width: 10px;
    height: 8px;
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
}

.bloom-bn-tick::after {
    content: "";
    display: block;
    width: 6px;
    height: 2px;
    margin-left: auto;
    border-radius: 999px;
    background: var(--text-tertiary, #8f8f8f);
    opacity: 0.7;
}

.bloom-bn-tick-asst::after {
    width: 10px;
    opacity: 0.45;
}

.bloom-bn-tick.bloom-bn-current::after {
    width: 14px;
    height: 3px;
    background: var(--text-primary, #0d0d0d);
    opacity: 1;
}

.bloom-bn-dense .bloom-bn-tick {
    height: 4px;
}

.bloom-bn-dense .bloom-bn-tick::after {
    height: 1px;
}

.bloom-bn-menu {
    position: absolute;
    top: 0;
    right: 100%;
    bottom: 0;
    display: flex;
    flex-direction: column;
    width: min(16.5rem, calc(100vw - 4rem));
    max-height: 100%;
    padding: 8px 10px 8px 0;
    box-sizing: border-box;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateX(6px);
    transition: opacity 0.12s ease, transform 0.12s ease, visibility 0s linear 0.12s;
}

#bloom-bn-host:hover .bloom-bn-menu,
#bloom-bn-host:focus-within .bloom-bn-menu {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateX(0);
    transition-delay: 0s;
}

.bloom-bn-card {
    display: flex;
    flex-direction: column;
    min-height: 0;
    max-height: 100%;
    padding: 8px;
    border-radius: 12px;
    border: 1px solid var(--border-light, rgba(0, 0, 0, 0.1));
    background: var(--bg-primary, var(--main-surface-primary, #fff));
    box-shadow: var(--shadow-long, 0 8px 24px rgba(0, 0, 0, 0.12));
}

.bloom-bn-meta {
    flex: none;
    margin: 0 0 6px;
    padding: 0 6px;
    font-size: 11px;
    letter-spacing: -0.1px;
    color: var(--text-secondary, #5d5d5d);
}

.bloom-bn-list {
    display: flex;
    flex-direction: column;
    gap: 1px;
    min-height: 0;
    overflow: auto;
    margin: 0;
    padding: 0;
    list-style: none;
}

.bloom-bn-item {
    appearance: none;
    display: flex;
    align-items: baseline;
    gap: 8px;
    width: 100%;
    margin: 0;
    padding: 5px 8px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: inherit;
    text-align: start;
    cursor: pointer;
}

.bloom-bn-item:hover,
.bloom-bn-item:focus-visible {
    background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
    outline: none;
}

.bloom-bn-item.bloom-bn-active {
    background: var(--main-surface-secondary, #f4f4f4);
}

.bloom-bn-mark {
    flex: none;
    width: 1.1rem;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--text-tertiary, #8f8f8f);
}

.bloom-bn-item.bloom-bn-user .bloom-bn-mark {
    color: var(--text-secondary, #5d5d5d);
}

.bloom-bn-label {
    min-width: 0;
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
    letter-spacing: -0.2px;
}

#thread [data-message-id] {
    scroll-margin-top: 72px;
}

.bloom-bn-flash {
    outline: 2px solid var(--text-primary, #0d0d0d);
    outline-offset: 4px;
    border-radius: 14px;
}

@media (max-width: 720px) {
    #bloom-bn-host { display: none !important; }
}

@media (prefers-reduced-motion: reduce) {
    .bloom-bn-menu {
        transition: none;
        transform: none;
    }
    .bloom-bn-flash {
        outline-width: 1px;
    }
}
`;var dp=new v("BetterNavigator"),Qi="betterNavigator",Tc="bloom-bn-host",ta=60,up=16,mp=1e3,fp=2.5,pp=.4,gp=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),bp=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='thinking']","[class*='reasoning']","[class*='footnote']",".sr-only"].join(", "),hp=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),Mr=x({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),nt=new Map,ye=!1,$e=null,Ar=null,De=null,Lr=null,L=[],ot="",kr=0,Cr=-1,aa=0,io="",Gt=0,Kt=0,to,no=null,Tr=null,ea=null,et=null,na=null,oo=null,tt=null,Ut=null,ro=null;function Hr(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function yp(e){try{return!!e.closest(gp)}catch{return!0}}function vp(e){let t=(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||e.getAttribute("data-turn")||"").toLowerCase();if(t==="user"||t==="assistant")return t;let n=(e.getAttribute("aria-label")||"").toLowerCase();return n.includes("you said")?"user":n.includes("chatgpt said")||n.includes("assistant said")?"assistant":null}function xp(e){let t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode(r){let i=r.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(i.closest(bp))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return(r.textContent||"").replace(/\s+/g," ").trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),o;for(;(o=n.nextNode())&&t.join(" ").length<ta+20;)t.push((o.textContent||"").replace(/\s+/g," ").trim());return t.join(" ").replace(/\s+/g," ").trim()}function wp(e,t){try{if(e.querySelector("img, picture, video, canvas"))return"Image";if(e.querySelector("a[download], [class*='attachment']"))return"File";if(e.querySelector("pre, code"))return"Code"}catch{}return`Message ${t+1}`}function Lc(e,t,n){let o=t==="user"?e.querySelector(".whitespace-pre-wrap")??e:e.querySelector(".markdown")??e,r=xp(o);return r?r.length>ta?`${r.slice(0,ta).trimEnd()}\u2026`:r:wp(e,n)}function Ep(){let e=Hr();if(!e||e===document.body)return[];let t=Mr.store.showAssistant!==!1,n=[];try{for(let o of e.querySelectorAll("[data-message-id]")){if(yp(o))continue;let r=o.getAttribute("data-message-id")||"";if(!r)continue;let i=vp(o);if(i!=="user"&&i!=="assistant"||i==="assistant"&&!t)continue;let a=Lc(o,i,n.length);a&&a!==nt.get(r)&&nt.set(r,a),n.push({id:r,el:o,role:i,text:nt.get(r)||a})}}catch{}return n}function Sp(){let t=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(t,48),88)}function kc(e){let t=e;for(;t&&t!==document.body&&t!==document.documentElement;){let o=getComputedStyle(t).overflowY;if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight+8)return t;t=t.parentElement}return window}function Tp(e){return e===window?window.innerHeight:e.clientHeight}function Lp(e){let t=e instanceof Element?e:e instanceof Node?e.parentElement:null;if(!t)return!1;try{return!!t.closest(hp)}catch{return!1}}function Cc(){to!==void 0&&(clearTimeout(to),to=void 0),no?.classList.remove("bloom-bn-flash"),no=null}function kp(e){Cc(),e.classList.add("bloom-bn-flash"),no=e,to=setTimeout(()=>{e.classList.remove("bloom-bn-flash"),no===e&&(no=null),to=void 0},800)}function oa(e){if(!L.length)return;let t=Math.max(0,Math.min(e,L.length-1));kr=t,Ar?.querySelectorAll(".bloom-bn-tick").forEach((o,r)=>{o.classList.toggle("bloom-bn-current",r===t)}),De?.querySelectorAll(".bloom-bn-item").forEach((o,r)=>{o.classList.toggle("bloom-bn-active",r===t)}),Lr&&(Lr.textContent=`${t+1} / ${L.length}`);let n=De?.children[t];if(n instanceof HTMLElement){let o=De;if(o){let r=n.offsetTop-o.clientHeight/2+n.offsetHeight/2;o.scrollTop=Math.max(0,r)}}}function ra(e){let t=L[e];if(!t?.el.isConnected)return;Cr=e,aa=Date.now()+mp,oa(e);let n=Ut??kc(t.el),r=Math.abs(t.el.getBoundingClientRect().top-Sp())>fp*Tp(n);t.el.scrollIntoView({behavior:r?"auto":"smooth",block:"start"}),Mr.store.jumpEffect!=="none"&&kp(t.el)}function sa(){if(!ye||!L.length)return;if(Date.now()<aa&&Cr>=0){oa(Cr);return}let e=window.innerHeight*pp,t=0;for(let n=0;n<L.length;n++){let o=L[n].el;o.isConnected&&o.getBoundingClientRect().top<=e&&(t=n)}oa(t)}function Cp(e){let t=kc(e);if(Ut===t&&ro)return;ro?.(),Ut=t;let n=t===window?document:t,o=()=>{sa(),la()};n.addEventListener("scroll",o,{passive:!0}),ro=()=>n.removeEventListener("scroll",o)}function Mp(e){tt?.disconnect(),tt=null;let t=Ut instanceof HTMLElement?Ut:null;tt=new IntersectionObserver(()=>sa(),{root:t,threshold:[0,.15,.4,.75,1]});for(let n of e)n.el.isConnected&&tt.observe(n.el)}function Ap(){if(!document.body)return null;let e=$e;if(e?.isConnected)return e;e=document.createElement("div"),e.id=Tc,e.className="bloom-bn-host",e.setAttribute("role","navigation"),e.setAttribute("aria-label","Conversation outline"),e.hidden=!0;let t=document.createElement("div");t.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let o=document.createElement("div");o.className="bloom-bn-card";let r=document.createElement("div");r.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",o.append(r,i),n.appendChild(o),e.append(t,n),document.body.appendChild(e),$e=e,Ar=t,De=i,Lr=r,e}function Mc(){let e=$e,t=Hr();if(!e||!t||!t.isConnected||L.length<1){e&&(e.hidden=!0);return}let n=t.getBoundingClientRect(),o=document.getElementById("thread-bottom-container"),r=document.getElementById("page-header"),i=Math.max(n.top+8,r?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8)-i;if(s<96||n.width<160){e.hidden=!0;return}let c=window.innerWidth-n.right,l=c>=22?Math.max(8,c-16):8;e.hidden=!1,e.style.top=`${Math.round(i)}px`,e.style.height=`${Math.round(s)}px`,e.style.right=`${Math.round(l)}px`}function la(){!ye||Kt||(Kt=requestAnimationFrame(()=>{Kt=0,ye&&Mc()}))}function Hp(e){let t=Ar,n=De;!t||!n||(t.replaceChildren(),n.replaceChildren(),t.classList.toggle("bloom-bn-dense",e.length>up),e.forEach((o,r)=>{let i=document.createElement("button");i.type="button",i.className=`bloom-bn-tick${o.role==="assistant"?" bloom-bn-tick-asst":""}`,i.setAttribute("aria-label",`Go to message ${r+1} of ${e.length}`),i.addEventListener("click",l=>{l.preventDefault(),ra(r)}),t.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${o.role}`;let s=document.createElement("span");s.className="bloom-bn-mark",s.textContent=o.role==="user"?"You":"GPT";let c=document.createElement("span");c.className="bloom-bn-label",c.textContent=o.text,c.title=o.text,a.append(s,c),a.addEventListener("click",l=>{l.preventDefault(),ra(r)}),n.appendChild(a)}))}function Sc(){if(!L.length)return;let e=L[L.length-1];if(!e.el.isConnected)return;let t=Lc(e.el,e.role,L.length-1);if(t===e.text)return;e.text=t,nt.set(e.id,t);let o=De?.children[L.length-1]?.querySelector(".bloom-bn-label");o&&(o.textContent=t,o instanceof HTMLElement&&(o.title=t))}function Np(){let e=M();return e===io?!1:(io=e,nt.clear(),L=[],ot="",kr=0,Cr=-1,aa=0,!0)}function Rp(e){let t=Mr.store.showAssistant!==!1?"1":"0";return`${io}|${t}|${e.map(n=>n.id).join(",")}`}function Pp(){if(!ye)return;Np();let e=Ep(),t=Hr();if(!t||e.length<1){L=e,ot="",$e&&($e.hidden=!0),tt?.disconnect(),ia();return}Ap();let n=Rp(e);n!==ot?(L=e,ot=n,Hp(e),Cp(t),Mp(e)):(L=e,L.forEach((o,r)=>{let a=De?.children[r]?.querySelector(".bloom-bn-label");a&&a.textContent!==o.text&&(a.textContent=o.text,a instanceof HTMLElement&&(a.title=o.text))})),Mc(),sa(),ia()}function zt(){!ye||Gt||(Gt=requestAnimationFrame(()=>{Gt=0,ye&&Pp()}))}function ia(){let e=Hr();if(!(et&&na===e&&e?.isConnected)){if(et?.disconnect(),oo?.disconnect(),na=e,!e||e===document.body){et=null;return}et=new MutationObserver(()=>zt()),et.observe(e,{childList:!0,subtree:!0}),oo=new ResizeObserver(()=>la()),oo.observe(e)}}function Ip(e){if(!ye||!L.length||$e?.hidden||e.altKey||e.ctrlKey||e.metaKey||Lp(e.target))return;let t=-1;if(e.key==="ArrowDown")t=kr+1;else if(e.key==="ArrowUp")t=kr-1;else if(e.key==="Home")t=0;else if(e.key==="End")t=L.length-1;else if(e.key==="Escape"){document.activeElement?.blur?.();return}else return;e.preventDefault(),ra(Math.max(0,Math.min(t,L.length-1)))}function Op(){Cc(),tt?.disconnect(),tt=null,et?.disconnect(),et=null,na=null,oo?.disconnect(),oo=null,ro?.(),ro=null,Ut=null,$e?.remove(),$e=null,Ar=null,De=null,Lr=null}var Ac=p({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:Qi,cleanupSelectors:[`#${Tc}`],settings:Mr,start(){ye=!0,io=M(),w(Qi,Ec),Tr=new AbortController;let{signal:e}=Tr;window.addEventListener("keydown",Ip,{signal:e}),window.addEventListener("popstate",zt,{signal:e}),window.visualViewport?.addEventListener("resize",la,{signal:e}),ea=se({onTick(t){t.streaming&&Sc()},onFall(){Sc(),zt()},onContext(){nt.clear(),io=M(),ot="",zt()}}),ia(),zt(),dp.debug("navigator started")},stop(){ye=!1,Gt&&cancelAnimationFrame(Gt),Gt=0,Kt&&cancelAnimationFrame(Kt),Kt=0,Tr?.abort(),Tr=null,ea?.(),ea=null,Op(),nt.clear(),L=[],ot="",y(Qi)},onSettingsChange(){ot="",zt()}});var Hc=`.bloom-ts {
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
`;function Nc(e,t,n=Date.now()){let o=new Date(e);if(Number.isNaN(o.getTime()))return"";let r=new Date(n),i=o.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(o.toDateString()===r.toDateString()||!t)return i;let s=o.getFullYear()===r.getFullYear();return`${o.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Rc(e){try{return new Date(e).toISOString()}catch{return""}}var Bc=new v("MessageTimestamps"),Pc="messageTimestamps",Nr="bloom-ts",Ic=1500,Dp="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",Yt=x({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),Xt=new Map,Jt=!1,Wt=0,Vt,_e=null,da=null,ca=null,Oc=!1;function Dc(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function ua(){let e=Yt.plain.stamps;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function $c(){let e={...ua()};for(let[n,o]of Xt)e[n]=o;let t=Object.keys(e);if(t.length>Ic){let n=t.slice(t.length-Ic),o={};for(let r of n)o[r]=e[r];Yt.store.stamps=o;return}Yt.store.stamps=e}var $p=Ra($c,500);function _c(e,t){!e||!t||Xt.get(e)===t||(Xt.set(e,t),$p(),ao())}function _p(e){return e?Xt.get(e)??ua()[e]??tr(e)??null:null}function qp(e){Jt&&e.type==="message-time"&&_c(e.messageId,e.createTime)}function jp(e){return(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function Fp(){let e=Dc();if(!e)return[];let t=[];try{for(let n of e.querySelectorAll("[data-message-id]"))n.closest(Dp)||t.push(n)}catch{}return t}function zp(e){try{return!!e.querySelector("time:not(.bloom-ts)")}catch{return!1}}function Gp(){if(!Jt)return;let e=Yt.store.hideOwnMessages===!0,t=Yt.store.showDate!==!1,n=N(),o=Fp();_e?.disconnect();try{o.forEach((r,i)=>{let a=r.getAttribute("data-message-id")||"",s=jp(r),c=r.querySelector(`:scope > .${Nr}`);if(e&&s==="user"){c?.remove();return}if(zp(r)){c?.remove();return}let l=_p(a);if(!l&&a&&(n||Oc)&&i>=o.length-2&&(l=Date.now(),_c(a,l)),!l){c?.remove();return}let d=Nc(l,t);if(!d){c?.remove();return}let u=c;u||(u=document.createElement("time"),u.className=Nr,u.setAttribute("aria-hidden","true"),r.insertBefore(u,r.firstChild)),u.textContent!==d&&(u.textContent=d);let m=Rc(l);m&&u.getAttribute("datetime")!==m&&u.setAttribute("datetime",m)})}catch(r){Bc.debug("paint failed",r)}Oc=n,qc()}function ao(){!Jt||Wt||(Wt=requestAnimationFrame(()=>{Wt=0,Jt&&Gp()}))}function qc(){let e=Dc();if(!(_e&&da===e&&e?.isConnected)){if(_e?.disconnect(),da=e,!e||e===document.body){_e=null;return}_e=new MutationObserver(()=>ao()),_e.observe(e,{childList:!0,subtree:!0})}}var jc=p({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Nr}`],settings:Yt,start(){Jt=!0,w(Pc,Hc);let e=ua();for(let[t,n]of Object.entries(e))typeof n=="number"&&n>0&&Xt.set(t,n);ca=ie(qp),qc(),Vt!==void 0&&clearInterval(Vt),Vt=setInterval(ao,800),ao(),Bc.debug("timestamp watch started")},stop(){Jt=!1,Wt&&cancelAnimationFrame(Wt),Wt=0,Vt!==void 0&&(clearInterval(Vt),Vt=void 0),_e?.disconnect(),_e=null,da=null,ca?.(),ca=null,$c(),Xt.clear(),document.querySelectorAll(`.${Nr}`).forEach(e=>e.remove()),y(Pc)},onSettingsChange:ao});var ma="streamerMode",Kp="filter:blur(6px)!important;transition:filter .2s ease",Up="filter:none!important",so=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],Zt=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function J(e,t){return e.map(n=>`${n} ${t}`)}var rt=x({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function Qt(e,t=!0){let n=e.join(","),o=e.map(r=>`${r}:hover`).join(",");return`${n}{${Kp}}${t?`${o}{${Up}}`:""}`}function Fc(){let e=[];if(rt.store.conversations!==!1&&(e.push(Qt([...J(Zt,'a[href^="/c/"]'),...J(Zt,'a[href*="/c/"]')])),e.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),rt.store.projects!==!1&&(e.push(Qt([...J(Zt,'a[href*="/project"]'),...J(Zt,'a[href*="/g/g-p-"]'),...J(Zt,'[data-testid="project-name"]'),...J(Zt,'[data-testid="project-link"]')])),e.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),rt.store.headerTitle!==!1&&e.push(Qt(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),rt.store.accountAvatar!==!1&&e.push(Qt([...J(so,"img"),...J(so,'[class*="avatar"]')],!1)),rt.store.accountName!==!1&&e.push(Qt([...J(so,".min-w-0 > .truncate"),...J(so,".min-w-0.flex-1 .truncate")],!1)),rt.store.accountEmail!==!1&&e.push(Qt([...J(so,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),e.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),e.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!e.length){y(ma);return}w(ma,e.join(`
`))}var zc=p({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[h.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:rt,start:Fc,onSettingsChange:Fc,stop(){y(ma)}});var Gc=`.bloom-gc-panel {
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

.bloom-gc-panel .bloom-gc-input {
    width: 100%;
    min-height: 4.5rem;
    box-sizing: border-box;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid var(--border-default, var(--border-medium, rgba(0, 0, 0, 0.15)));
    background: var(--bg-secondary, var(--main-surface-secondary, #f9f9f9));
    color: var(--text-primary, inherit);
    font: inherit;
    font-size: 0.8125rem;
    line-height: 1.45;
    resize: vertical;
}

.bloom-gc-panel .bloom-gc-input::placeholder {
    color: var(--text-tertiary, #8f8f8f);
}

.bloom-gc-panel .bloom-gc-input:focus {
    outline: 2px solid color-mix(in srgb, var(--text-primary, currentColor) 28%, transparent);
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

.bloom-gc-panel .bloom-gc-btn {
    height: 32px;
    padding: 0 12px;
    border: 1px solid var(--border-default, var(--border-medium, rgba(0, 0, 0, 0.1)));
    border-radius: 999px;
    background: var(--bg-secondary, var(--main-surface-tertiary, #e8e8e8));
    color: var(--text-primary, inherit);
    font: inherit;
    font-size: 0.8125rem;
    font-weight: 500;
    cursor: pointer;
}

.bloom-gc-panel .bloom-gc-btn:hover:not(:disabled) {
    background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
}

.bloom-gc-panel .bloom-gc-btn:disabled {
    opacity: 0.4;
    cursor: default;
}

.bloom-gc-panel .bloom-gc-btn-primary {
    border-color: transparent;
    background: var(--bg-primary-inverted, #0d0d0d);
    color: var(--interactive-label-primary-default, var(--bg-primary, #ffffff));
}

.bloom-gc-panel .bloom-gc-btn-primary:hover:not(:disabled) {
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

.bloom-gc-panel .bloom-gc-item {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 8px;
    width: 100%;
    padding: 10px 12px;
    border: 0;
    border-radius: 12px;
    background: var(--bg-secondary, var(--main-surface-secondary, #f9f9f9));
    color: var(--text-primary, inherit);
    text-align: left;
}

.bloom-gc-panel .bloom-gc-item:hover {
    background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.04));
}

.bloom-gc-panel .bloom-gc-item[data-active="true"] {
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
    align-items: flex-start;
    gap: 2px;
}

.bloom-gc-panel .bloom-gc-icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: var(--icon-secondary, var(--text-secondary, inherit));
    cursor: pointer;
}

.bloom-gc-panel .bloom-gc-icon-btn svg {
    width: 16px;
    height: 16px;
    display: block;
}

.bloom-gc-panel .bloom-gc-icon-btn:hover {
    background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
    color: var(--icon-primary, var(--text-primary, inherit));
}`;var Wp=new v("GreetingCustomizer"),en="greetingCustomizer",Kc="greetingCustomizerUi",lo=100,pa=30,Yp=120,Xp=1e3,Jp=50,Zp=40,Qp=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),co=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),Br=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function eg(e){return!!e?.closest(Qp)}function Yc(e){return!!(eg(e)||e.closest('[data-testid="temporary-chat-label"]')||e.closest("[hidden]")||e.getAttribute("aria-hidden")==="true"||e.classList.contains("sr-only"))}function ho(e){try{for(let t of document.querySelectorAll(e))if(!Yc(t))return t}catch{}return null}function fa(e){for(let t of e.split(",").map(n=>n.trim()).filter(Boolean))if(ho(t))return t;return e}var Xc=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],B=x({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:bg},greetings:{type:0,description:"Greeting texts",hidden:!0,default:Xc},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),ue=!1,on=!1,at=null,Pr,uo,tn,mo,Ir=0,Rr=null,nn=null,fo=null,po=null,go=null,Or=null;function xe(){let e=location.pathname||"/";return e==="/"||e===""}function it(){let e=B.plain.greetings;return Array.isArray(e)?e.filter(t=>typeof t=="string"):Xc.slice()}function bo(e){return String(e??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function Uc(e){B.store.greetings=e.slice(0,pa)}function yo(){let e=String(B.store.mode??"refresh");return e==="interval"||e==="manual"?e:"refresh"}function tg(){return B.store.order==="random"?"random":"sequential"}function ng(){return me(Number(B.store.intervalSec??10),1,3600)*1e3}function og(e){return String(e??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function rg(){return!!ho(Br)}function Dr(){return!!(ho(Br)||ho(co))}function ig(e,t){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),o=[`content:"${e}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),r=rg()?fa(Br):ho(co)?fa(co):fa(Br),i=t?`${co}{cursor:pointer!important;user-select:none!important}`:"";return[`${r}{${n}}`,`${r}::before{${o}}`,i,`@media (max-width:768px){${r}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function ag(e,t){if(e<=0)return 0;if(e===1)return Number(B.plain.index)!==0&&(B.store.index=0),Number(B.plain.lastRandom)!==0&&(B.store.lastRandom=0),0;let n=Number(B.plain.index),o=Number(B.plain.lastRandom);if(!t)return n>=0&&n<e?n:0;if(tg()==="random"){let a=n>=0&&n<e?n:o,s=Math.floor(Math.random()*e),c=0;for(;s===a&&c++<10;)s=Math.floor(Math.random()*e);return B.store.index=s,B.store.lastRandom=s,s}let i=((n>=-1&&n<e?n:-1)+1)%e;return B.store.index=i,i}function ve(e){if(!ue)return;if(!xe()){y(en);return}let t=it().map(bo).filter(Boolean);if(!t.length){y(en);return}let n=ag(t.length,e),o=t[n]??t[0],r=yo()==="manual"&&t.length>1;w(en,ig(og(o),r)),Or?.()}function ga(){Pr!==void 0&&(clearInterval(Pr),Pr=void 0)}function ba(){ga(),!(!ue||!xe())&&yo()==="interval"&&(it().filter(Boolean).length<=1||(Pr=setInterval(()=>ve(!0),ng())))}function ha(){mo!==void 0&&(clearTimeout(mo),mo=void 0),Ir=0}function Vc(){if(ha(),!ue||!xe())return;Ir=Zp;let e=()=>{if(mo=void 0,!(!ue||!xe())){if(Dr()){yo()==="refresh"&&!on?(on=!0,ve(!0)):ve(!1),ba();return}Ir-=1,Ir>0&&(mo=setTimeout(e,Jp))}};e()}function ya(){if(at===!0){Dr()?ve(!1):Vc();return}at=!0,on=!1,yo()==="refresh"?(on=!0,ve(!0)):ve(!1),ba(),Dr()||Vc()}function va(){at=!1,on=!1,ga(),ha(),y(en)}function $r(){tn===void 0&&(tn=window.setTimeout(()=>{tn=void 0,ue&&(xe()?ya():at!==!1&&va())},Yp))}function sg(){nn||(nn=history.pushState.bind(history),fo=history.replaceState.bind(history),po=function(...t){let n=nn(...t);return $r(),n},go=function(...t){let n=fo(...t);return $r(),n},history.pushState=po,history.replaceState=go)}function lg(){po&&history.pushState===po&&nn&&(history.pushState=nn),go&&history.replaceState===go&&fo&&(history.replaceState=fo),nn=null,fo=null,po=null,go=null}function cg(e){let t=e.target instanceof Element?e.target:null;t&&t.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame($r)}function dg(e){if(!ue||!xe()||yo()!=="manual"||it().filter(Boolean).length<=1)return;let t=e.target instanceof Element?e.target:null;if(!t)return;let n=t.closest(co);if(!n||Yc(n))return;let o=window.getSelection?.();o&&String(o).trim()||ve(!0)}function ug(){uo===void 0&&(uo=setInterval(()=>{if(!ue)return;let e=xe();if(e!==(at===!0)){e?ya():va();return}e&&Dr()&&ve(!1)},Xp))}function mg(){uo!==void 0&&(clearInterval(uo),uo=void 0)}function Wc(e,t){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=e,n.setAttribute("aria-label",e);let o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.75"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),o.setAttribute("aria-hidden","true");for(let r of t.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",r),o.appendChild(i)}return n.appendChild(o),n}var fg="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",pg="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function gg(e,t){let n=bo(e);return n?n.length>lo?`Keep it to ${lo} characters.`:it().length+(t?1:0)>pa?`At most ${pa} greetings.`:null:"Enter a greeting."}function bg(e){e.className="bloom-gc-panel";let t="",n=-1,o="",r=-1,i=()=>{let a=it(),s=Number(B.plain.index);e.replaceChildren();let c=document.createElement("div");c.className="bloom-gc-composer";let l=document.createElement("textarea");l.className="bloom-gc-input",l.rows=3,l.maxLength=lo,l.placeholder="New greeting (line breaks ok)",l.value=t,l.addEventListener("input",()=>{t=l.value,o="";let f=c.querySelector(".bloom-gc-count");f&&(f.textContent=`${bo(t).length}/${lo}`);let T=c.querySelector(".bloom-gc-error");T&&(T.textContent="")}),c.appendChild(l);let d=document.createElement("div");d.className="bloom-gc-meta";let u=document.createElement("span");u.className="bloom-gc-count",u.textContent=`${bo(t).length}/${lo}`;let m=document.createElement("span");m.className="bloom-gc-error",m.textContent=o;let S=document.createElement("div");if(S.className="bloom-gc-actions",n>=0){let f=document.createElement("button");f.type="button",f.className="bloom-gc-btn",f.textContent="Cancel",f.addEventListener("click",()=>{n=-1,t="",o="",i()}),S.appendChild(f)}let E=document.createElement("button");if(E.type="button",E.className="bloom-gc-btn bloom-gc-btn-primary",E.textContent=n>=0?"Update":"Add",E.addEventListener("click",()=>{let f=n<0,T=gg(t,f);if(T){o=T,i();return}let $=bo(t),j=it().slice();n>=0&&n<j.length?j[n]=$:j.push($),Uc(j),n=-1,t="",o="",i()}),S.appendChild(E),d.append(u,m,S),c.appendChild(d),e.appendChild(c),!a.length){let f=document.createElement("p");f.className="bloom-gc-empty",f.textContent="No greetings. The official heading stays.",e.appendChild(f);return}let g=document.createElement("div");g.className="bloom-gc-list",a.forEach((f,T)=>{let $=document.createElement("div");$.className="bloom-gc-item",T===s&&($.dataset.active="true");let j=document.createElement("button");j.type="button",j.className=`bloom-gc-body${r===T?"":" bloom-gc-clamp"}`,j.textContent=f,j.addEventListener("click",()=>{r=r===T?-1:T,i()});let rn=document.createElement("div");rn.className="bloom-gc-item-actions";let st=Wc("Edit",fg);st.addEventListener("click",()=>{n=T,t=f,o="",i()});let we=Wc("Delete",pg);we.addEventListener("click",()=>{let an=it().filter((lt,qe)=>qe!==T);Uc(an),n===T?(n=-1,t=""):n>T&&(n-=1),i()}),rn.append(st,we),$.append(j,rn),g.appendChild($)}),e.appendChild(g)};return Or=i,i(),()=>{Or===i&&(Or=null),e.replaceChildren()}}var Jc=p({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[h.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Kc,settings:B,start(){ue=!0,w(Kc,Gc),sg(),Rr=new AbortController;let{signal:e}=Rr;window.addEventListener("popstate",$r,{signal:e}),document.addEventListener("click",cg,{capture:!0,signal:e}),document.addEventListener("click",dg,{signal:e}),ug(),at=null,xe()?ya():va(),Wp.debug("started")},stop(){ue=!1,Rr?.abort(),Rr=null,tn!==void 0&&(clearTimeout(tn),tn=void 0),ga(),ha(),mg(),lg(),y(en),on=!1,at=null},onSettingsChange(){ue&&(xe()?(ve(!1),ba()):y(en))}});var vo=new v("Bloom"),Zc=!1,hg=Date.now(),yg=[Ls,cl,yl,wl,kl,Nl,Gl,Ul,Yl,ic,mc,vc,wc,Ac,jc,zc,Jc];function _r(e){return new Promise(t=>setTimeout(t,e))}function vg(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var ed=8e3,Qc=300,xg=250;async function wg(){if(Fe())return await _r(Qc),!0;for(;Date.now()-hg<ed;)if(await _r(xg),Fe())return await _r(Qc),!0;return Fe()||Kr()}function xa(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function Eg(){if(xa())return!0;let e=Date.now()+ed;for(;Date.now()<e;)if(await _r(100),xa())return!0;return xa()}function Sg(){try{GM_registerMenuCommand?.("Bloom++ settings",Ts)}catch{}}function Tg(){Ao(()=>{cn("HostShell"),vo.info("host shell",z)}),Ho(()=>{vo.info("idle ready",z)}),No(()=>{Ta(),cn("HostReady"),vo.info("chrome ready",z)})}async function wa(){await Pa()}async function Ea(){if(Zc)return;Zc=!0;for(let n of yg)try{Fa(n)}catch(o){vo.error("register failed",n.name,o)}Ka(),cn("Init"),Sg(),Tg();let e=()=>cn("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await vg(),Eg().then(n=>{n&&Ro()}),!await wg()){vo.warn("late islands not detected; starting default plugins",z),ut(),Po();return}await Ja()}var td=typeof unsafeWindow<"u"?unsafeWindow:window,Lg=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||Lg){let e=td.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",z);try{Object.defineProperty(td,"Bloom",{value:Sa,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}wa().then(()=>Ea()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
