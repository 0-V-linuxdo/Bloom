// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260920] v1.4.43
// @description  Void++-style plugin host for chatgpt.com. Tab favicon, input history, recent chats, reply notify, next-prompt queue, Recents status, wider thread, message times, streamer blur, custom home greeting, hide Share, Dictation, sidebar name, Download apps, upgrade CTAs, and ads.
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

/* Bloom++ [20260920] v1.4.43. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var tc=Object.defineProperty;var nc=(e,t)=>{for(var n in t)tc(e,n,{get:t[n],enumerable:!0})};var Bi={};nc(Bi,{REPO_URL:()=>ua,Settings:()=>g,VERSION:()=>j,contextKeyFromUrl:()=>te,conversationTitle:()=>vt,conversationToken:()=>O,currentConversationId:()=>ne,hasDraftText:()=>ee,hasLateIslands:()=>Be,init:()=>Oi,initSettings:()=>Ii,isDocumentInteractive:()=>ma,isUserDraftEmpty:()=>Se,messageCreateTime:()=>Wo,plugins:()=>X,requestChromeReady:()=>go,requestIdleReady:()=>rt,requestShellReady:()=>po,setEditorText:()=>de,subscribeHarvest:()=>Te,whenChromeReady:()=>fo,whenIdleReady:()=>mo,whenShellReady:()=>uo});var he=new Map,to=!1;function oc(){return document.getElementById("bloom-root")?.shadowRoot??null}function rc(){return document.head??null}function tt(){let e=oc();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=ic()}function mr(e,t){if(!to)return;let n=rc();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),tt();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,tt();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,tt()}function S(e,t){let n=he.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},he.set(e,n)),to&&mr(e,n)}function Di(){to=!0;for(let[e,t]of he)mr(e,t);return tt(),!0}function _i(e){let t=he.get(e);t&&(t.disabled=!1,to&&mr(e,t))}function $i(e){let t=he.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),tt())}function v(e){let t=he.get(e);t&&(t.el?.remove(),he.delete(e),tt())}function ic(){return Array.from(he.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var x=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function h(e){return e}var fr=new Map;function no(e,t){let n=fr.get(e);return n||(n=new Set,fr.set(e,n)),n.add(t),()=>n.delete(t)}function Oe(e,t){let n=fr.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var ac="bloompp";function qi(){return new Promise((e,t)=>{let n=indexedDB.open(ac,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function ji(e){try{let t=await qi();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function Fi(e,t){try{let n=await qi();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function Qt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function nt(e,t,n){return Math.min(n,Math.max(t,e))}function Gi(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function zi(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}function Ki(e,t){let n;return((...o)=>{n&&clearTimeout(n),n=setTimeout(()=>e(...o),t)})}var oo=new x("SettingsStore"),be="BloomSettings",sc=100;function io(e){if(Qt(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(Qt(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return Qt(n)?n:null}return null}catch{return null}}var ro=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let c=n?`${n}.${a}`:a;for(let[l,d]of this.defaultGetters)if(c.startsWith(l)){let u=c.slice(l.length+1);if(u&&!u.includes(".")){let m=d(u);m!==void 0&&(i[a]=m,s=m);break}}}return Qt(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let c=n?`${n}.${a}`:a;return this.notifyListeners(c),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){oo.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},sc))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(be,this.plain)}catch{try{GM_setValue(be,t)}catch(n){oo.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(be,t)}catch{}Fi(be,t).catch(n=>oo.warn("Failed to save settings to IndexedDB:",n))}catch(t){oo.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){Gi(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var lc=new x("Settings"),cc={plugins:{}},g=new ro(structuredClone(cc)),dc=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function uc(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function w(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(g.store.plugins[n]||(g.store.plugins[n]={}),g.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?g.plain.plugins[n]??{}:{}}};return t}function mc(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function Ui(){let e=null;if(e=io(mc(be)),e||(e=io(await ji(be))),!e)try{e=io(localStorage.getItem(be))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(g.plain.plugins=t),lc.debug("Loaded settings")}}function Vi(e,t){t&&(t.pluginName=e,g.plain.plugins[e]||(g.plain.plugins[e]={}),g.setDefaultGetter(dc(e),n=>{if(n!=="enabled")return uc(t.def,n)}))}function Wi(){return g.plain.plugins.Settings||(g.store.plugins.Settings={}),g.store.plugins.Settings}function ao(){return Wi().pinnedPlugins??[]}function Yi(e){return ao().includes(e)}function Xi(e){let t=ao(),n=t.includes(e);return g.store.plugins.Settings={...g.plain.plugins.Settings,pinnedPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}function so(){return Wi().starredPlugins??[]}function Ji(e){return so().includes(e)}function Zi(e){let t=so(),n=t.includes(e);return g.store.plugins.Settings={...g.plain.plugins.Settings,starredPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}var lo=new x("PluginManager"),X={},en=new Set;function ta(e){if(X[e.name]){lo.warn("Duplicate plugin",e.name);return}X[e.name]=e,Vi(e.name,e.settings)}function ot(e){let t=X[e];if(!t)return!1;if(t.required)return!0;let n=g.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function na(e){let t=X[e];if(!t||t.required)return;let n=!ot(e);g.plain.plugins[e]||(g.store.plugins[e]={}),g.store.plugins[e].enabled=n,n?oa(t):fc(t),Oe("pluginToggle",{name:e,enabled:n})}function oa(e,t=!1){if(!en.has(e.name)&&ot(e.name))try{e.managedStyle&&_i(e.managedStyle),e.start?.(),en.add(e.name),e.settings&&g.addPrefixChangeListener(`plugins.${e.name}.`,()=>{en.has(e.name)&&e.onSettingsChange?.()}),t||lo.debug("Started",e.name)}catch(n){lo.error("Failed to start",e.name,n)}}function fc(e){if(en.has(e.name)){try{e.stop?.()}catch(t){lo.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&($i(e.managedStyle),v(e.managedStyle)),en.delete(e.name)}}function tn(e){for(let t of Object.values(X))(t.startAt??"DOMContentLoaded")===e&&oa(t)}var Qi=2,ea="defaultsRev";function ra(){for(let t of Object.values(X))g.plain.plugins[t.name]||(g.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=g.store.plugins.Settings??(g.store.plugins.Settings={});if(e[ea]!==Qi){for(let t of["NoShareLink","NoDictation"]){let n=g.store.plugins[t]??(g.store.plugins[t]={});n.enabled=!1}e[ea]=Qi}}var nn=!1,co=!1,pr=!1,aa=[],sa=[],la=[];function gr(e){let t=e.splice(0);for(let n of t)n()}function on(){nn||(nn=!0,gr(aa))}function hr(){co||(co=!0,nn||on(),gr(sa))}function ca(){pr||(pr=!0,nn||on(),co||hr(),gr(la))}function uo(e){nn?e():aa.push(e)}function mo(e){co?e():sa.push(e)}function fo(e){pr?e():la.push(e)}function po(){on()}function rt(){on(),hr()}function go(){ca()}function ia(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function da(){await ia(4e3),on(),await ia(4e3),hr(),ca()}var b={p:"0-V-linuxdo"},j="[20260920] v1.4.43",ua="https://github.com/0-V-linuxdo/Bloom";function pc(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function gc(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function br(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function Be(){return br()?pc()||gc():!1}function ma(){return Be()}var hc=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),fa=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),bc=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),yc="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function at(e){return e.id==="bloom-root"||!!e.closest(yc)}function pa(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function ho(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function yr(e){if(!(e instanceof HTMLElement)||!e.isConnected||at(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&ho(t)?!1:e.getClientRects().length>0}function it(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function vc(){let e=[];for(let t of document.querySelectorAll(hc))!(t instanceof HTMLElement)||!t.isConnected||at(t)||e.push(t);return e}function bo(e){if(!e.isConnected||at(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function rn(){return vc().filter(bo)[0]??null}function vr(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||at(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function xr(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!at(n)&&!it(n)&&n.parentElement&&!it(n.parentElement)&&(t=n);let o=t.parentElement;if(o&&!it(o)&&!at(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!it(o.parentElement))return o}return t}function ga(){let e=document.querySelectorAll(fa);for(let n of e)if(yr(n)&&!ho(n)&&pa(n))return n;let t=document.querySelectorAll(bc);for(let n of t){if(!yr(n)||!pa(n)||ho(n))continue;let o=n.querySelector(fa);return yr(o)&&!ho(o)?o:n}return null}function ha(){let e=rn();if(e){let t=xr(e),n=t.parentElement;if(n&&!it(n))return n;if(!it(t))return t}return vr()}function ba(e){let t=rn();return t?e.composedPath().includes(t):!1}var Er=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],xc={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Sr(e){return e==="auto"||e==="light"||e==="dark"}function wc(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Ec(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function wr(e){let t=wc(e);return t?Ec(t)>.55?"light":"dark":null}function Sc(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=wr(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=wr(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=wr(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function ya(e){return e==="auto"?Sc():e}function Lc(e){try{let t=getComputedStyle(document.documentElement);for(let n of Er){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function va(e,t,n){let o=xc[t];if(n){Lc(e);for(let r of Er)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of Er)e.style.setProperty(r,o[r])}function xa(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var Lr=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var Cc="bloom-root",J="bloom-rail-item",Eo="bloom-account-item",_e="bloom-sidebar-panel",hn="bloom-plugin-dialog",Mo="bloom-plugin-layer",So="bloom-settings-css",kc=2e3,mn=w({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),Sa=null,Mc=null,we=!1,Mr=[],yo=null,Lo=null,ve=null,xo=null,le=null,fn=null,an,st=0,pn=0,sn=0,ln=null,cn=null,To=null,La=null,dn=null,Tr=[],Co=!1,Ac=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Pc=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],Ao="",gn="all",Ee="all";function Po(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Ta(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Hc(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function Nc(e){let t='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return e?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${t}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`}function Rc(e){let t='<path d="M12 17v5"/>';return e?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var Ic={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function Oc(e){return e.icon||Ic[e.name]||Po()}function Ca(){return Sr(mn.store.appearance)?mn.store.appearance:"auto"}function Bc(){let e=document.createElement("div");e.className="bloom-field bloom-appearance-row";let t=document.createElement("span");t.className="bloom-field-label",t.textContent="Appearance";let n=document.createElement("select");n.setAttribute("aria-label","Appearance");let o=mn.def.appearance,r=o.type===3?o.options??[]:[];for(let i of r){let a=document.createElement("option");a.value=i.value,a.textContent=i.label,n.appendChild(a)}return n.value=Ca(),n.addEventListener("change",()=>{Sr(n.value)&&(mn.store.appearance=n.value)}),e.append(t,n),e}function Cr(e,t,n){e&&(e.setAttribute("data-bloom-scheme",t),va(e,t,n),e.style.removeProperty("--bloom-rail-surface"))}function ka(e){e&&(e.style.removeProperty("--bloom-rail-surface"),e.style.removeProperty("--bg-primary"))}function un(){let e=Ca(),t=ya(e),n=e==="auto";Cr(Sa,t,n);let o=document.getElementById(_e);o instanceof HTMLElement&&Cr(o,t,n);let r=document.getElementById(hn);r instanceof HTMLElement&&Cr(r,t,n);let i=document.getElementById(J);i instanceof HTMLElement&&ka(i),Oe("schemeChange",{scheme:t,pref:e})}function Ma(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(e=>e.remove())}function Aa(){if(S("settings",Lr),document.getElementById(So)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=So,e.textContent=Lr,document.head.appendChild(e)}function Dc(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function _c(){for(let e of Mr)e();Mr=[]}function Pa(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function $c(e){return e.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,t=>t.toUpperCase())}function Hr(e){return e.settings?Object.entries(e.settings.def).filter(([,t])=>!t.hidden):[]}function qc(e){return Hr(e).length>0}function wo(e){if(e.default!==void 0)return e.default;if(e.type===3)return(e.options?.find(n=>n.default)??e.options?.[0])?.value;if(e.type===2)return!1;if(e.type===4)return e.min??0;if(e.type===0)return"";if(e.type===1)return 0}function jc(e,t){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let o=document.createElement("span");if(o.className="bloom-plugin-dialog-label-title",o.textContent=$c(e),n.appendChild(o),t.description){let r=document.createElement("span");r.className="bloom-plugin-dialog-label-desc",r.textContent=t.description,n.appendChild(r)}return n}function Fc(e,t,n){if(n.hidden)return null;let o=n.type===4||n.type===0||n.type===1||n.type===5,r=document.createElement("div");r.className=o?"bloom-field bloom-field-stack":"bloom-field",r.appendChild(jc(t,n));let i=g.store.plugins[e]??(g.store.plugins[e]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",Mr.push(n.render(a)),r.appendChild(a),r}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let c=document.createElement("option");c.value=s.value,c.textContent=s.label,a.appendChild(c)}return a.value=String(i[t]??wo(n)??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),r.appendChild(a),r}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??wo(n)??n.min??0);let c=document.createElement("span");return c.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),c.textContent=s.value}),a.append(s,c),r.appendChild(a),r}if(n.type===2){let a=Pa(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),r.appendChild(a),r}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[t]??wo(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[t]=n.type===1?Number(a.value):a.value}),r.appendChild(a),r}return r}function wa(e,t){let n=document.createElement("div");n.className=t?`bloom-plugin-dialog-field ${t}`:"bloom-plugin-dialog-field";let o=document.createElement("div");return o.className="bloom-plugin-dialog-field-label",o.textContent=e,n.appendChild(o),n}function Gc(e){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let t=g.store.plugins[e.name]??(g.store.plugins[e.name]={});for(let[n,o]of Hr(e)){if(n==="enabled"||o.type===5)continue;let r=wo(o);r!==void 0&&(t[n]=r)}Na(e)}function Ha(e){e.key==="Escape"&&(!document.getElementById(Mo)&&!document.getElementById(hn)||(e.stopPropagation(),lt()))}function zc(){Co||(document.addEventListener("keydown",Ha),Co=!0)}function Kc(){Co&&(document.removeEventListener("keydown",Ha),Co=!1)}function lt(){_c(),Kc(),document.getElementById(Mo)?.remove(),document.getElementById(hn)?.remove()}function Na(e){if(lt(),!document.body)return;let t=document.createElement("div");t.id=Mo,t.className="bloom-plugin-layer",t.addEventListener("pointerdown",xe),t.addEventListener("pointerup",xe),t.addEventListener("click",d=>{d.stopPropagation(),d.target===t&&lt()});let n=document.createElement("div");n.id=hn,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",xe),n.addEventListener("pointerup",xe),n.addEventListener("click",xe);let o=document.createElement("button");o.type="button",o.className="bloom-icon-btn bloom-plugin-dialog-close",o.setAttribute("aria-label","Close"),o.innerHTML=Ta(),o.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),lt()});let r=document.createElement("div");r.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=e.name,r.appendChild(i),e.description){let d=document.createElement("p");d.className="bloom-plugin-dialog-sub",d.textContent=e.description,r.appendChild(d)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(o,r,a),e.authors?.length){let d=wa("Authors"),u=document.createElement("p");u.className="bloom-plugin-dialog-authors",u.textContent=e.authors.join(", "),d.appendChild(u),n.appendChild(d)}let s=wa("Settings","bloom-plugin-dialog-settings"),c=document.createElement("div");c.className="bloom-plugin-dialog-settings-list";let l=Hr(e);if(l.length)for(let[d,u]of l){let m=Fc(e.name,d,u);m&&c.appendChild(m)}if(!c.childElementCount){let d=document.createElement("p");d.className="bloom-dialog-empty",d.textContent="No configurable settings.",c.appendChild(d)}if(s.appendChild(c),n.appendChild(s),l.length){let d=document.createElement("div");d.className="bloom-plugin-dialog-footer";let u=document.createElement("button");u.type="button",u.className="bloom-plugin-dialog-reset",u.textContent="Reset",u.addEventListener("click",()=>Gc(e)),d.appendChild(u),n.appendChild(d)}t.appendChild(n),document.body.appendChild(t),zc(),un()}function Uc(e){let t=document.createElement("div");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Oc(e);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=e.name,a.title=e.name,r.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let c=Ji(e.name),l=document.createElement("button");if(l.type="button",l.className=`bloom-icon-btn bloom-card-star${c?" bloom-card-star-active":""}`,l.setAttribute("aria-label",c?"Remove from favorites":"Add to favorites"),l.innerHTML=Nc(c),l.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation();let f=Zi(e.name);Oe("pluginStar",{name:e.name,starred:f})}),s.appendChild(l),!e.required){let p=Yi(e.name),f=document.createElement("button");f.type="button",f.className=`bloom-icon-btn bloom-card-pin${p?" bloom-card-pin-active":""}`,f.setAttribute("aria-label",p?"Unpin from top":"Pin to top"),f.innerHTML=Rc(p),f.addEventListener("click",L=>{L.preventDefault(),L.stopPropagation();let D=Xi(e.name);Oe("pluginPin",{name:e.name,pinned:D})}),s.appendChild(f)}if(qc(e)){let p=document.createElement("button");p.type="button",p.className="bloom-icon-btn bloom-card-settings",p.setAttribute("aria-label",`${e.name} settings`),p.innerHTML=Hc(),p.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),Na(e)}),s.appendChild(p)}let d=Pa(e.name,ot(e.name),!!e.required),u=d.querySelector("input");if(u?.addEventListener("click",p=>p.stopPropagation()),u?.addEventListener("change",()=>{na(e.name)}),s.appendChild(d),o.append(r,s),n.appendChild(o),e.description){let p=document.createElement("div");p.className="bloom-card-desc",p.textContent=e.description,n.appendChild(p)}let m=document.createElement("div");m.className="bloom-card-separator";let E=document.createElement("div");E.className="bloom-card-footer";let y=document.createElement("div");return y.className="bloom-card-author",y.textContent=e.authors?.filter(Boolean).join(", ")||"\xA0",E.appendChild(y),t.append(n,m,E),t}function Ra(){return Object.values(X).filter(e=>!e.hidden&&e.name!=="Settings")}function Ia(e,t){return t==="all"||t==="favorites"?!0:(e.tags??[]).includes(t)}function Vc(e){return`${e.name} ${e.description??""} ${(e.tags??[]).join(" ")}`.toLowerCase()}function Wc(){return Ao.trim()?"No plugins match your search.":Ee==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function Yc(){let e=Ra();return Pc.filter(t=>t.id==="favorites"||t.id==="all"?!0:e.some(n=>Ia(n,t.id)))}function Xc(){if(dn){dn.replaceChildren();for(let e of Yc()){let t=document.createElement("button");t.type="button",t.className=`bloom-plugin-tab${Ee===e.id?" bloom-plugin-tab-active":""}`,t.textContent=e.label,t.addEventListener("click",()=>{Ee=e.id,De()}),dn.appendChild(t)}}}function Jc(){let e=Ra();if(Ee==="favorites"){let t=new Set(so());e=e.filter(n=>t.has(n.name))}else Ee!=="all"&&(e=e.filter(t=>Ia(t,Ee)));return gn==="enabled"&&(e=e.filter(t=>ot(t.name))),gn==="disabled"&&(e=e.filter(t=>!ot(t.name))),e}function De(){if(!ln)return;Xc();let e=Jc();To&&(To.placeholder=`Search ${e.length} plugins...`);let t=e,n=Ao.trim().toLowerCase();if(n&&(t=t.filter(o=>Vc(o).includes(n))),Ee!=="favorites"){let o=ao();if(o.length){let r=new Map(o.map((i,a)=>[i,a]));t=t.slice().sort((i,a)=>{let s=r.has(i.name),c=r.has(a.name);return s!==c?s?-1:1:s?(r.get(i.name)??0)-(r.get(a.name)??0):i.name.localeCompare(a.name)})}}ln.replaceChildren();for(let o of t)ln.appendChild(Uc(o));cn&&(cn.hidden=t.length>0,cn.textContent=Wc())}function xe(e){e.stopPropagation()}function kr(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function Nr(){document.getElementById(J)?.setAttribute("aria-expanded",we?"true":"false")}function Zc(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function Rr(){lt(),Ao="",gn="all",Ee="all",document.getElementById(_e)?.remove(),we=!1,Nr()}function Qc(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",xe),t.addEventListener("pointerup",xe),t.addEventListener("click",xe);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-titles";let i=document.createElement("div");i.className="bloom-settings-brand";let a=document.createElement("span");a.className="bloom-settings-mark",a.innerHTML=Po();let s=document.createElement("h2");s.textContent="Bloom++",i.append(a,s);let c=document.createElement("p");c.className="bloom-settings-sub",c.textContent="Toggle features. Some need a reload. Click the sliders icon to configure.",r.append(i,c);let l=document.createElement("button");l.type="button",l.className="bloom-icon-btn",l.setAttribute("aria-label","Close"),l.innerHTML=Ta(),l.addEventListener("click",Rr),o.append(r,l),n.appendChild(o),n.appendChild(Bc());let d=document.createElement("div");d.className="bloom-plugin-tabs",n.appendChild(d);let u=document.createElement("div");u.className="bloom-search-bar";let m=document.createElement("input");m.type="search",m.className="bloom-search-input",m.setAttribute("aria-label","Search plugins"),m.placeholder="Search plugins...",m.addEventListener("input",()=>{Ao=m.value,De()});let E=document.createElement("select");E.className="bloom-search-filter",E.setAttribute("aria-label","Filter plugins");for(let f of Ac){let L=document.createElement("option");L.value=f.value,L.textContent=f.label,E.appendChild(L)}E.value=gn,E.addEventListener("change",()=>{gn=E.value,De()}),u.append(m,E),n.appendChild(u);let y=document.createElement("div");y.className="bloom-plugin-list",n.appendChild(y);let p=document.createElement("p");return p.className="bloom-tab-empty",p.hidden=!0,n.appendChild(p),t.appendChild(n),ln=y,cn=p,To=m,La=E,dn=d,De(),t}function ed(e){e.classList.add("bloom-rail-dock")}function td(){let e=document.getElementById(J);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&bo(e)?e:null}function nd(){if(document.getElementById(_e)?.remove(),!document.body)return;let e=Qc(_e);ed(e),document.body.appendChild(e),we=!0,lt(),un(),Nr(),Oe("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:j,dock:"center",rail:!!td()})}function Ir(){let e=document.getElementById(_e);if(e instanceof HTMLElement&&e.isConnected&&Zc(e)){Rr();return}e?.remove(),nd()}function od(){let e=document.createElement("button");return e.type="button",e.id=J,e.className="bloom-rail-item",e.setAttribute("aria-controls",_e),e.setAttribute("aria-expanded",we?"true":"false"),e.innerHTML=`<span class="bloom-rail-mark">${Po()}</span><span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),Ir()}),e}function Ea(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function rd(e){let t=e.querySelector("img");if(t instanceof HTMLElement){let n=t.getBoundingClientRect();if(n.width>8&&n.height>8)return t}for(let n of e.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}return null}function id(e,t){for(let n of e.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||t&&(n===t||n.contains(t)||t.contains(n))||(n.textContent||"").trim().length<2)continue;let r=n.getBoundingClientRect();if(r.width>16&&r.height>8&&r.height<40)return n}return null}function ye(e,t,n){let o=`${n}px`;e.style.getPropertyValue(t)!==o&&e.style.setProperty(t,o)}function Oa(e,t){if(e.classList.contains("bloom-rail-compact"))return;let n=e.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!e.isConnected||!t.isConnected)return;let o=rd(t),r=getComputedStyle(t),i=Number.parseFloat(r.paddingTop),a=Number.parseFloat(r.paddingBottom);if(Number.isFinite(i)&&ye(e,"padding-top",Math.round(i)),Number.isFinite(a)&&ye(e,"padding-bottom",Math.round(a)),o){let s=o.getBoundingClientRect(),c=Math.max(20,Math.round(s.width));ye(n,"width",c),ye(n,"height",Math.max(20,Math.round(s.height)));let l=e.getBoundingClientRect(),d=Math.round(s.left-l.left);d>=0&&d<=40&&ye(e,"padding-left",d);let u=id(t,o);if(u){let m=u.getBoundingClientRect(),E=n.getBoundingClientRect(),y=Math.round(m.left-E.right);y>=0&&y<=24&&ye(e,"gap",y)}}else{let s=Number.parseFloat(r.paddingLeft),c=Number.parseFloat(r.columnGap||r.gap);Number.isFinite(s)&&ye(e,"padding-left",Math.round(s)),Number.isFinite(c)&&c>0&&ye(e,"gap",Math.round(c))}ka(e)}function Ar(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function ad(){if(fn?.isConnected&&le){le.observe(fn,{childList:!0});return}Pr()}function sd(e){if(Ar(e))return!1;try{if(e.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function ld(e,t){!t||!e||requestAnimationFrame(()=>{if(e.isConnected){sn=0;return}sn+=1,pn=Date.now()+Math.min(8e3,250*2**Math.min(sn,5))})}function cd(){st||Date.now()<pn||(st=requestAnimationFrame(()=>{st=0,!(Date.now()<pn)&&(document.getElementById(J)?.isConnected||ko())}))}function ko(){if(!document.body)return;le?.disconnect();let e=null,t=!1;try{let n=document.getElementById(J);e=n instanceof HTMLButtonElement?n:od();let o=rn(),r=vr();if(o){let i=xr(o),a=i.parentElement;if(Ar(i)||a&&Ar(a))return;e.isConnected&&e.nextElementSibling===i||(i.before(e),t=!0),Ea(e),Oa(e,o)}else r?(e.parentElement!==r&&(r.appendChild(e),t=!0),Ea(e,!0)):e.isConnected&&!bo(e)&&(e.remove(),e=null)}finally{ld(e,t),ad(),Nr()}}function Pr(){let e=ha();!e||!sd(e)||fn===e&&le||(le?.disconnect(),fn=e,le=new MutationObserver(()=>{document.getElementById(J)?.isConnected||cd()}),le.observe(e,{childList:!0}))}function dd(){ko(),Pr(),an===void 0&&(an=window.setInterval(()=>{let e=document.getElementById(J);if(!(e instanceof HTMLElement)||!e.isConnected)Date.now()>=pn&&ko();else{sn=0;let t=rn();t&&Oa(e,t)}Pr()},kc))}function ud(){an!==void 0&&(clearInterval(an),an=void 0),st&&cancelAnimationFrame(st),st=0,pn=0,sn=0,le?.disconnect(),le=null,fn=null}function md(e){xo===e&&ve||(ve?.disconnect(),xo=e,ve=new MutationObserver(()=>{if(!e.isConnected){ve?.disconnect(),ve=null,xo=null;return}Ba(e)}),ve.observe(e,{childList:!0}))}function Ba(e){if(md(e),e.querySelector(`#${Eo}`))return;let t=document.createElement("button");t.type="button",t.id=Eo,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${Po()}<span>Bloom++</span>`,t.addEventListener("pointerdown",kr),t.addEventListener("pointerup",kr),t.addEventListener("click",n=>{kr(n),Ir()}),e.insertBefore(t,e.firstChild)}function vo(){let e=ga();return e?(Ba(e),!0):!1}function fd(e){ba(e)&&(queueMicrotask(vo),requestAnimationFrame(()=>{vo()}),window.setTimeout(vo,60),window.setTimeout(vo,180))}function pd(){Lo?.abort();let e=new AbortController;Lo=e,document.addEventListener("click",fd,{signal:e.signal})}function gd(){Lo?.abort(),Lo=null,ve?.disconnect(),ve=null,xo=null}function Da(){rt(),Dc(()=>{Aa(),Ma(),ko(),Ir()})}var _a=h({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[b.p],required:!0,hidden:!0,enabledByDefault:!0,settings:mn,startAt:"HostReady",cleanupSelectors:[`#${Cc}`,`#${J}`,`#${Eo}`,`#${_e}`,`#${Mo}`,`#${hn}`,`#${So}`,"#bloom-menu-panel"],start(){Aa(),Ma(),dd(),pd(),yo?.(),yo=xa(un),un(),Tr=[no("pluginToggle",()=>{we&&De()}),no("pluginPin",()=>{we&&De()}),no("pluginStar",()=>{we&&De()})]},stop(){ud(),gd(),yo?.(),yo=null;for(let e of Tr)e();Tr=[],Rr(),document.getElementById(J)?.remove(),document.getElementById(Eo)?.remove(),document.getElementById(So)?.remove(),Sa=null,Mc=null,ln=null,cn=null,To=null,La=null,dn=null,we=!1},onSettingsChange:un});var Ho='form[data-type="unified-composer"], form.w-full[data-type]',Z=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),ct=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),$a=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),qa=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),hd=/stop streaming|stop generating|停止生成|停止输出|停止响应/,bd='[contenteditable="false"], button, [role="button"]';function F(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function $e(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!F(r)))return r;return null}function ja(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function T(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=ja(e);return!!(hd.test(n)||/^stop$/i.test(n))}function Q(){let t=Array.from(document.querySelectorAll(Ho)).find(F);if(t instanceof HTMLElement)return t;let n=$e(document,Z),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function I(){let e=Array.from(document.querySelectorAll(Z));return e.find(F)??e[0]??null}function yd(e,t){if(!e||e===t||!t.contains(e))return!1;let n=e.closest(bd);return!!n&&n!==t&&t.contains(n)}function Or(e,t){let n=[];try{let o=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),r=o.nextNode();for(;r;){let i=r.parentElement;i&&yd(i,t)||n.push(r.textContent??""),r=o.nextNode()}}catch{return e.innerText??e.textContent??""}return n.join("")}function ee(e){let t=e??I();return t?Or(t,t).replaceAll("\u200B","").trim().length>0:!1}function Se(e){return!ee(e)}function bn(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function Fa(e){let t=Q();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!F(n))&&e(n))return n;return null}function ce(){let e=Q(),t=$e(e,ct)??$e(document,ct);return t&&!T(t)?t:Fa(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!T(n);let r=ja(n);return/^(send|send prompt|发送)$/i.test(r)&&!T(n)})}function Br(){let e=ce();return!!e&&bn(e)}function Dr(){let e=Q(),t=$e(e,$a,!0)??$e(document,$a,!0);if(t)return t;let n=$e(e,qa)??$e(document,qa);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&F(o)&&T(o))return o}return Fa(T)}function q(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>Or(n,e)).join(`
`):Or(e,e)}function _r(e,t=!1){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function de(e,t,n=!1){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r);try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch{e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),_r(e,n)}var Ga="bloom-host-icon",yn="data-bloom-host-rel",$r="not all",qr=0,za=0,vd=400;function Ka(e){qr+=1;try{e()}finally{qr-=1}}function No(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function dt(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function Ua(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function xd(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function wd(e,t){if(e.lastElementChild===t)return;let n=Date.now();n-za<vd||(za=n,e.appendChild(t))}function Ed(e,t){for(let n of e.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===t||No(n)&&(n.getAttribute(yn)||n.setAttribute(yn,n.rel),n.media!==$r&&(n.media=$r),n.rel!==Ga&&(n.rel=Ga))}function Sd(e){for(let t of e.querySelectorAll(`link[${yn}]`)){if(!(t instanceof HTMLLinkElement))continue;let n=t.getAttribute(yn);n&&(t.rel=n),t.removeAttribute(yn),t.media===$r&&t.removeAttribute("media")}}function jr(e,t){let{head:n}=document;!n||!t||Ka(()=>{Ed(n,e);let o=Ua(e),{type:r,sizes:i}=xd(t);o?wd(n,o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function Va(e,t){let{head:n}=document;n&&Ka(()=>{Ua(e)?.remove(),Sd(n)})}function Wa(e,t){let{head:n}=document;if(!n)return null;let o=0,r=new MutationObserver(i=>{if(qr)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===e?a=!0:No(c.target)&&(a=!0,dt(c.target.href)&&(s=c.target.href)));for(let l of c.removedNodes)No(l)&&l.id===e&&(a=!0);for(let l of c.addedNodes)No(l)&&l.id!==e&&(a=!0,dt(l.href)&&(s=l.href))}a&&(o||(o=requestAnimationFrame(()=>{o=0,t(s)})))});return r.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),r}var Ya=/\/c\/([a-zA-Z0-9_-]{8,})/i;function O(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=l=>{let d=n.indexOf(l);return d>=0&&n[d+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(l,d)=>{try{return document.querySelector(l)?.getAttribute(d)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function te(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function ut(e){if(!e)return"";try{return(/^https?:/i.test(e)?new URL(e,location.origin).pathname:e).match(Ya)?.[1]??""}catch{return e.match(Ya)?.[1]??""}}function ne(){let e=ut(location.pathname);if(e)return e;let n=O().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return""}function Ld(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!F(t))&&(T(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function Td(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&F(e))}function Cd(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&F(e))}function kd(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function G(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function C(){if(Dr()||Ld()||kd())return!0;let e=ce();return e&&F(e)&&!T(e)?!1:!!(Td()||Cd())}var Md=["original","badge","dot","hole","bg"],Za=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],Qa={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Ro="#FCFCFC",Ad="#111111",Xa="#111111",Pd="#ffffff",Hd="#212121",Nd="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Rd={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Io=32,Ja=64;function es(e){return typeof e=="string"&&Md.includes(e)}function Id(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function Oo(e){let t=document.createElement("canvas");t.width=Io,t.height=Io;let n=t.getContext("2d");return n?(n.scale(Io/Ja,Io/Ja),e(n),t.toDataURL("image/png")):""}function Od(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function Bo(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(Nd);n&&(e.strokeStyle=Ad,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function Bd(e,t,n){let o=Qa[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=Xa,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=Xa,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=Pd,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function vn(e,t){if(e==="original")return t==="wait"?Oo(o=>Bo(o,Ro)):Id(Rd[t]);let n=t==="wait"?void 0:Qa[t];return Oo(e==="hole"?o=>Bo(o,n??Ro):e==="bg"?o=>{o.fillStyle=n??Hd,Od(o,0,0,64,64,14),o.fill(),Bo(o,Ro,!1)}:o=>{Bo(o,Ro),t!=="wait"&&Bd(o,t,e==="dot"?"dot":"badge")})}function ts(e){return{wait:vn(e,"wait"),rotate:vn(e,"rotate"),done:vn(e,"done"),ready:vn(e,"ready"),error:vn(e,"error")}}var Dd=new x("ChatStateFavicons"),je="bloom-chat-state-favicon",as=w({style:{type:3,description:"Favicon overlay",options:Za}}),pt="",_o={wait:"",rotate:"",done:"",ready:"",error:""},$o="wait",ft=!1,ue=!1,z=null,wn="",En="",Ln=!0,xn=null,gt=0,mt,Do=null,qe=null,Fr=null,Sn=!1,ns=new WeakSet,_d=400;function $d(){let e=as.store.style;return es(e)?e:"bg"}function qd(){let t=document.querySelector(`link[rel~="icon"]:not(#${je})`)?.href;return dt(t)?t:dt(pt)?pt:""}function K(e){if($o===e){let t=document.getElementById(je);if(t instanceof HTMLLinkElement&&t.getAttribute("href")===_o[e])return}$o=e,jr(je,_o[e])}function os(){_o=ts($d()),K($o)}function jd(){let e=O(),t=e?te(e):te("");return C()?(!wn&&t&&(wn=t),wn||t):(wn="",t)}function ss(){ft=!1,ue=!1,z=null,wn=""}function Fd(e){En=e,ss(),Ln=!1,K("wait")}function rs(e,t){return!e&&Ln&&!t}function ls(){if(!Sn)return;let e=O()||location.pathname;if(En&&e&&En!==e){Fd(e);return}e&&(En=e);let t=jd(),n=C(),o=Se(),r=Br();if(G()&&!n){K("error"),ft=!1,ue=!1,z=null;return}if(n){ft||(Ln=!1),ft=!0,ue=!1,z=t,K("rotate");return}if(ft){let i=!!z&&!!t&&z===t;if(ft=!1,i){ue=!0,z=t,K("done");return}ue=!1,z=null}if(ue)if(!!(z&&t&&z!==t))ue=!1,z=null;else if(o){K("done");return}else if(rs(o,r)){ue=!1,K("ready");return}else{ue=!1,K("wait");return}z=null,o?K("wait"):rs(o,r)?K("ready"):K("wait")}function cs(){let e=Q();if(!(qe&&Fr===e&&e.isConnected)){if(qe?.disconnect(),Fr=e,!e||e===document.body){qe=null;return}qe=new MutationObserver(()=>qo()),qe.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function qo(){!Sn||gt||(gt=requestAnimationFrame(()=>{gt=0,Sn&&(ds(),cs(),ls())}))}function is(){ee()&&(Ln=!0),qo()}function ds(){let e=I();!e||ns.has(e)||(ns.add(e),e.addEventListener("input",is,{passive:!0}),e.addEventListener("compositionend",is,{passive:!0}))}var us=h({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[b.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:as,startAt:"DOMContentLoaded",cleanupSelectors:[`#${je}`],start(){Sn=!0,pt=qd()||pt,os(),Do?.disconnect(),Do=Wa(je,e=>{dt(e)&&(pt=e),jr(je,_o[$o])}),xn?.abort(),xn=new AbortController,window.addEventListener("popstate",qo,{signal:xn.signal}),ds(),cs(),mt!==void 0&&clearInterval(mt),mt=setInterval(qo,_d),ls(),Dd.debug("favicon watch started")},stop(){Sn=!1,gt&&cancelAnimationFrame(gt),gt=0,mt!==void 0&&(clearInterval(mt),mt=void 0),xn?.abort(),xn=null,qe?.disconnect(),qe=null,Fr=null,Do?.disconnect(),Do=null,ss(),En="",Ln=!0,Va(je,pt)},onSettingsChange:os});var ms=`.bloom-ih-hud {
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
`;var ag=new x("InputHistory"),Gr=/\u200B/g,fs=10,ps=500,gs=100,zd=8,Kd=120,Ud=2e3,jo=10,Fo=w({maxEntries:{type:4,description:"Max stored prompts",min:fs,max:ps,default:gs},history:{type:5,description:"Stored prompts",render:su},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),zr=new Map,P=0,Kr="",oe=!1,Cn=!1,Wr=0,Tn=null,Ur,Yr=null,hs=!0;function U(){let e=Fo.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function bs(e){let t=nt(Number(Fo.store.maxEntries??gs),fs,ps);return e.length>t?e.slice(e.length-t):e}function Go(e){Fo.store.entries=bs(e)}function Vd(e){return e.replaceAll(Gr,"").replace(/\n$/,"").trim()}function Vr(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(Z);return n instanceof HTMLElement?n:I()}function Wd(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!q(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(Gr,"").trim().length===0,last:i.toString().replaceAll(Gr,"").trim().length===0}}catch{return{first:!0,last:!0}}}function ys(e){clearTimeout(Ur),Ur=setTimeout(()=>{if(e!==Wr)return;Cn=!1;let t=Yr;t&&_r(t,hs)},Kd)}function vs(e,t,n){Cn=!0,Yr=e,hs=n;let o=++Wr;de(e,t,n),ys(o)}function Yd(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function ht(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Xd(){document.querySelector(".bloom-ih-hud")?.remove()}function Jd(e,t){let n=Yd();n.textContent=e;let o=(t.closest("form")??Q()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-zd)}px`,n.classList.add("bloom-ih-hud-on")}function Xr(e){let t=Vd(e);if(!t)return;let n=Date.now(),o=zr.get(t);if(o&&n-o<Ud)return;zr.set(t,n);let r=U().filter(i=>i!==t);r.push(t),Go(r),P=U().length,oe=!1,ht()}function Zd(e,t){let n=U();if(!n.length&&e)return;P>=n.length&&(Kr=q(t),P=n.length);let o=e?P-1:P+1;o<0||o>n.length||(P=o,oe=!0,vs(t,o===n.length?Kr:n[o],e),o<n.length?Jd(`${o+1} / ${n.length}`,t):ht())}function Qd(e){oe=!1,ht(),vs(e,Kr,!1),P=U().length}function eu(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=Vr(e.target)??Vr(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&oe&&!e.altKey&&!e.shiftKey){Qd(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){Xr(q(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=U();if(!o){let i=Wd(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||P<=0)||!n&&P>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),Zd(n,t))}function tu(e){if(Vr(e.target)){if(Cn){ys(Wr);return}oe&&(oe=!1,ht(),P=U().length)}}function nu(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(Z);n instanceof HTMLElement&&Xr(q(n))}function ou(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(ct);if(!n||!(n instanceof HTMLElement)||T(n))return;let o=I();o&&Xr(q(o))}function ru(e){if(!(!oe||Cn)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}oe=!1,ht()}}function iu(){if(Tn)return;Tn=new AbortController;let{signal:e}=Tn,t={capture:!0,signal:e};window.addEventListener("keydown",eu,t),window.addEventListener("input",tu,t),window.addEventListener("submit",nu,t),window.addEventListener("click",ou,t),window.addEventListener("pointerdown",ru,t)}function au(e){let t=U().slice();t.splice(e,1),Go(t),P>t.length&&(P=t.length)}function su(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=U().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(f=>f.toLowerCase().includes(a)):i,c=Math.max(1,Math.ceil(s.length/jo));n>=c&&(n=c-1);let l=s.slice(n*jo,n*jo+jo);e.replaceChildren();let d=document.createElement("input");if(d.className="bloom-ih-search",d.type="search",d.placeholder="Search history",d.autocomplete="off",d.value=t,d.addEventListener("input",()=>{t=d.value,n=0,r()}),e.appendChild(d),l.length){let f=document.createElement("div");f.className="bloom-ih-list",l.forEach((L,D)=>{let $=i.indexOf(L),Jt=U().length-1-$,Qe=document.createElement("div");Qe.className="bloom-ih-item";let ge=document.createElement("button");ge.type="button",ge.className=`bloom-ih-body${o===D?"":" bloom-ih-clamp"}`,ge.textContent=L,ge.addEventListener("click",()=>{o=o===D?-1:D,r()});let Zt=document.createElement("div");Zt.className="bloom-ih-actions";let et=document.createElement("button");et.type="button",et.title="Copy",et.textContent="C",et.addEventListener("click",()=>{zi(L)});let Ie=document.createElement("button");Ie.type="button",Ie.title="Delete",Ie.textContent="\xD7",Ie.addEventListener("click",()=>{au(Jt),r()}),Zt.append(et,Ie),Qe.append(ge,Zt),f.appendChild(Qe)}),e.appendChild(f)}else{let f=document.createElement("p");f.className="bloom-ih-empty",f.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(f)}let u=document.createElement("div");u.className="bloom-ih-pager";let m=document.createElement("button");m.type="button",m.className="bloom-ih-btn",m.textContent="Prev",m.disabled=n<=0,m.addEventListener("click",()=>{n-=1,r()});let E=document.createElement("span");E.textContent=`${n+1} / ${c}`;let y=document.createElement("button");y.type="button",y.className="bloom-ih-btn",y.textContent="Next",y.disabled=n+1>=c,y.addEventListener("click",()=>{n+=1,r()});let p=document.createElement("button");p.type="button",p.className="bloom-ih-clear",p.textContent="Clear all",p.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Go([]),P=0,r())}),u.append(m,E,y,p),e.appendChild(u)};return r(),()=>{e.replaceChildren()}}var xs=h({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[b.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:Fo,startAt:"HostReady",managedStyle:"inputHistory",start(){S("inputHistory",ms),P=U().length,oe=!1,iu()},stop(){Tn?.abort(),Tn=null,ht(),Xd(),zr.clear(),clearTimeout(Ur),Cn=!1,Yr=null,oe=!1},onSettingsChange(){let e=U(),t=bs(e);t.length!==e.length&&Go(t),P>t.length&&(P=t.length)}});var Jr="noShareLink",lu=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],cu=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],Zr=w({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function ws(e){return`${e.join(",")}{display:none!important}`}function Es(){let e=[];if(Zr.store.hideShareChat!==!1&&e.push(ws(lu)),Zr.store.hideShareProject!==!1&&e.push(ws(cu)),!e.length){v(Jr);return}S(Jr,e.join(`
`))}var Ss=h({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[b.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Zr,start:Es,onSettingsChange:Es,stop(){v(Jr)}});var Cs="noDictation",du=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],uu=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],ks=w({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Ls(e){return`${e.join(",")}{display:none!important}`}function Ts(){let e=[Ls(du)];ks.store.hideDictationSettings!==!1&&e.push(Ls(uu)),S(Cs,e.join(`
`))}var Ms=h({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[b.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:ks,start:Ts,onSettingsChange:Ts,stop(){v(Cs)}});var Qr="noSidebarIdentity",bt=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],ei=bt.flatMap(e=>[`${e} .min-w-0 > .truncate`,`${e} .min-w-0.flex-1 .truncate`]),Ns=bt.flatMap(e=>[`${e} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),mu=[...ei,...Ns],As=[...ei,...bt.flatMap(e=>[`${e} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],fu=bt.map(e=>`${e} a[href^="mailto:"]`),pu=bt.flatMap(e=>[`${e} .min-w-0 > :not(.truncate)`,`${e} .min-w-0 > :not(.truncate) *`,`${e} .min-w-0 .text-xs`,`${e} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${e} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${e} .text-xs:not(.truncate)`,`${e} .text-token-text-secondary:not(.truncate)`,`${e} .text-token-text-tertiary:not(.truncate)`,`${e} .min-w-0 ~ *`,`${e} .min-w-0 ~ * *`,`${e} > .text-xs`,`${e} > .text-token-text-secondary`,`${e} > .text-token-text-tertiary`]),gu=bt.flatMap(e=>[`${e} .min-w-0.flex-col > :not(.truncate)`,`${e} .min-w-0.flex-col > .text-xs`,`${e} .min-w-0.flex-col > .text-token-text-secondary`,`${e} .min-w-0.flex-col > .text-token-text-tertiary`,`${e} .min-w-0:not(.flex) > :not(.truncate)`,`${e} .min-w-0:not(.flex) > .text-xs`,`${e} .min-w-0:not(.flex) > .text-token-text-secondary`,`${e} .min-w-0:not(.flex) > .text-token-text-tertiary`]),kn=w({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function Ps(e){return`${e.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function hu(e){return`${e.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function bu(){return`${gu.join(",")}{margin-block:auto!important}`}function yu(){return`${pu.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function Hs(){let e=kn.store.hideUsername!==!1,t=kn.store.hideEmail!==!1,n=e&&kn.store.enlargePlan!==!1,o=e&&kn.store.alignPlanWithAvatar===!0,r=[];if(e&&(o?(r.push(hu(n?As:[...As,...Ns])),r.push(bu())):r.push(Ps(n?ei:mu))),t&&r.push(Ps(fu)),n&&r.push(yu()),!r.length){v(Qr);return}S(Qr,r.join(`
`))}var Rs=h({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[b.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:kn,start:Hs,onSettingsChange:Hs,stop(){v(Qr)}});var Ds=new x("Harvest"),vu=1500,xu=200,zo=new Set,Ko=new Map,Uo=new Map,yt=null,Vo=null,Mn=null,re=0;function wu(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Eu(e){try{if(typeof e=="string")return e;if(e instanceof URL)return e.href;if(typeof Request<"u"&&e instanceof Request)return e.url}catch{}return String(e)}function Su(e,t){let n=t?.method,o=typeof Request<"u"&&e instanceof Request?e.method:"";return(n||o||"GET").toUpperCase()}function _s(e){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(e)}function Lu(e,t){return t!=="POST"||_s(e)?!1:/\/backend-api\/(?:f\/)?conversation(?:\/|\?|$)/i.test(e)}function Tu(e,t){return t!=="GET"||_s(e)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(e)}function Is(e){return e.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function $s(e){return e?e.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function Cu(e){return typeof e=="string"?$s(e):""}function ti(e){if(typeof e=="number"&&Number.isFinite(e)&&e>0)return e>1e12?e:Math.round(e*1e3);if(typeof e=="string"){let t=e.trim();if(!t)return null;if(/^\d+(\.\d+)?$/.test(t))return ti(Number(t));let n=Date.parse(t);return Number.isFinite(n)?n:null}return null}function qs(e,t){if(e.size<=t)return;let n=e.size-t,o=0;for(let r of e.keys())if(e.delete(r),++o>=n)break}function Os(e,t,n){!e||!t||Uo.get(e)!==t&&(Uo.set(e,t),qs(Uo,vu),Le({type:"message-time",messageId:e,createTime:t,conversationId:n}))}function ku(e,t){let n=t.trim();!e||!n||Ko.get(e)!==n&&(Ko.set(e,n),qs(Ko,xu),Le({type:"conversation-meta",conversationId:e,title:n}))}function An(e,t,n=0){if(n>6||!e||typeof e!="object")return;if(Array.isArray(e)){for(let c of e)An(c,t,n+1);return}let o=e,r=typeof o.conversation_id=="string"&&o.conversation_id||typeof o.conversationId=="string"&&o.conversationId||t;typeof o.title=="string"&&r&&!o.author&&!o.content&&!o.role&&ku(r,o.title);let i=o.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let c=i,l=typeof c.id=="string"?c.id:"",d=ti(c.create_time??c.createTime??c.created_at);l&&d&&Os(l,d,r)}let a=typeof o.id=="string"?o.id:"",s=ti(o.create_time??o.createTime??o.created_at);if(a&&s&&(o.author||o.content||o.role||o.create_time||o.createTime)&&Os(a,s,r),o.mapping&&typeof o.mapping=="object")An(o.mapping,r,n+1);else if(n<3)for(let c of Object.values(o))c&&typeof c=="object"&&An(c,r,n+1)}function Bs(e,t){if(e)try{An(JSON.parse(e),t)}catch{}}function Le(e){for(let t of Array.from(zo))try{t(e)}catch{}}async function Mu(e,t,n){if(n===re)try{let o=await e.json();if(n!==re)return;An(o,t)}catch{}}async function Au(e,t,n,o){let r=t,i=n,a=e.body;if(!a){o===re&&Le({type:"post-end",conversationId:r,error:i});return}let s=a.getReader(),c=new TextDecoder,l="";try{for(;o===re;){let{done:d,value:u}=await s.read();if(d)break;if(l+=c.decode(u,{stream:!0}),!r){let E=$s(l);E&&(r=E,Le({type:"post-start",conversationId:r,url:""}))}let m=l.split(`
`);l=m.pop()??"";for(let E of m){let y=E.replace(/^data:\s*/,"").trim();!y||y==="[DONE]"||Bs(y,r)}/\[DONE\]/.test(l)||/"error"\s*:\s*\{/.test(l)?(/"error"\s*:\s*\{/.test(l)&&(i=!0),l=l.slice(-64)):l.length>16384&&(l=l.slice(-4096))}l&&o===re&&Bs(l.replace(/^data:\s*/,""),r)}catch{i=!0}finally{try{s.cancel()}catch{}}o===re&&Le({type:"post-end",conversationId:r,error:i})}function Pu(e,t,n){let o=Eu(t),r=Su(t,n),i=Tu(o,r),a=Lu(o,r),s=re,c="";return a&&(c=Cu(n?.body)||Is(o)||ut(o)||ne(),Le({type:"post-start",conversationId:c,url:o})),e(t,n).then(l=>{if(s!==re||!i&&!a)return l;try{let d=l.clone();i?Mu(d,Is(o)||ne(),s):Au(d,c,!l.ok,s)}catch{a&&Le({type:"post-end",conversationId:c,error:!l.ok})}return l},l=>{throw a&&s===re&&Le({type:"post-end",conversationId:c,error:!0}),l})}function Hu(){if(yt)return;let e=wu();Mn=e,yt=e.fetch.bind(e);let t=(n,o)=>Pu(yt,n,o);Vo=t,e.fetch=t,Ds.debug("conversation fetch harvest hooked")}function Nu(){re+=1,!(!yt||!Mn)&&(Vo&&Mn.fetch===Vo&&(Mn.fetch=yt),yt=null,Vo=null,Mn=null,Ds.debug("conversation fetch harvest unhooked"))}function Te(e){return zo.add(e),Hu(),()=>{zo.delete(e),zo.size===0&&Nu()}}function vt(e){return e?Ko.get(e)??"":""}function Wo(e){return e?Uo.get(e)??null:null}var js=`#bloom-rt-host {
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
`;var zs=new x("RecentTopics"),Et="bloom-rt-host",Ks="home",Us=/^\/c\/([a-z0-9_-]{8,})/i,Iu=/\/c\/([a-z0-9_-]{8,})/i,Vs=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Ou=new Set(["Backquote","IntlBackslash"]),Bu=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Du=140,_u=[3,4,5,6,7,8,9,10,11,12].map(e=>({label:String(e),value:String(e),default:e===5})),H=w({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:_u},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),Yo=null,oi=null,_=!1,On=!1,Pn=!1,ie=0,Fe="",xt=null,Hn=null,wt,ni=null;function $u(){let e=Number(H.store.maxRecent??5);return Number.isFinite(e)&&e>=3&&e<=12?e:5}function Nn(){let e=H.plain.visits;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ri(){let e=H.plain.titles;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Ws(){let e=H.plain.previews;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function ii(){let e=H.plain.projects;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Jo(e){let t=$u();return e.length>t?e.slice(0,t):e}function ae(e){return e===Ks}function Rn(e,t=Du){let n=e.replace(/\s+/g," ").trim();return n.length<=t?n:`${n.slice(0,t-1)}\u2026`}function ai(e){if(!e)return"";try{return new URL(e,location.origin).pathname.match(Us)?.[1]??""}catch{return e.match(Iu)?.[1]??""}}function Ge(){let e=(location.pathname||"/").match(Us);if(e?.[1])return e[1];let n=O().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return Ks}function si(e){if(ae(e))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${e}"]`);for(let o of n){if(ai(o.getAttribute("href")||"")!==e)continue;let r=Rn(o.textContent||"",80);if(r)return r}}catch{}let t=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return Ge()===e&&t&&!/^ChatGPT$/i.test(t)?Rn(t,80):""}function qu(e){if(ae(e))return"New chat";let t=ri()[e];if(t)return t;let n=vt(e);return n||si(e)||"Chat"}function ju(e){return ii()[e]||""}function Fu(e){return Ws()[e]||{}}function li(e,t){if(!e||ae(e)||!t||/^new chat$/i.test(t.trim()))return;let n=ri();n[e]!==t&&(n[e]=t,H.store.titles=n)}function Gu(e){e.type==="conversation-meta"&&(li(e.conversationId,e.title),_&&St())}function zu(e,t){if(!e||ae(e)||!t)return;let n=ii();n[e]!==t&&(n[e]=t,H.store.projects=n)}function Ku(e,t){if(!e||ae(e)||!t.user&&!t.assistant)return;let n=Ws(),o=n[e]||{},r={user:t.user||o.user,assistant:t.assistant||o.assistant};o.user===r.user&&o.assistant===r.assistant||(n[e]=r,H.store.previews=n)}function ci(e){if(!e||ae(e)&&H.store.includeHome===!1)return;let t=Nn().filter(n=>n!==e);t.unshift(e),H.store.visits=Jo(t)}function Zo(){let e=H.store.includeHome!==!1;return Jo(Nn().filter(n=>e||!ae(n))).map(n=>({id:n,title:qu(n),project:ju(n),preview:Fu(n)}))}function Fs(e){try{let t=document.querySelectorAll(`[data-message-author-role="${e}"]`),n=t[t.length-1];if(!(n instanceof HTMLElement))return"";let o=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||o.push(a)}let r=o.length?o.join(" "):n.textContent||"";return Rn(r)}catch{return""}}function In(e){if(!e||ae(e)||e!==Ge())return;let t=si(e);t&&li(e,t);let n=Fs("user"),o=Fs("assistant");Ku(e,{user:n,assistant:o});let r=Xs(e);if(r){let i=Ys(r);i&&zu(e,i)}}function di(){let e=ri(),t=ii(),n=[],o=new Set,r=!1,i=!1;try{for(let l of document.querySelectorAll('a[href*="/c/"]')){if(l.closest(`#${Et}, #bloom-root, #bloom-sidebar-panel`))continue;let d=ai(l.getAttribute("href")||"");if(!d||o.has(d))continue;o.add(d),n.push(d);let u=Rn(l.textContent||"",80);u&&!Vs.test(u)&&e[d]!==u&&(e[d]=u,r=!0);let m=Ys(l);m&&t[d]!==m&&(t[d]=m,i=!0)}}catch{}r&&(H.store.titles=e),i&&(H.store.projects=t);let a=Nn(),s=new Set(a),c=n.filter(l=>!s.has(l));c.length&&(H.store.visits=Jo([...a,...c]))}function Ys(e){let t=e.parentElement;for(let n=0;n<10&&t;n++){if(t.id==="bloom-rt-host"||t.id==="bloom-root"){t=t.parentElement;continue}let o=t.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),r=Rn((o instanceof HTMLElement?o.textContent:"")||"",60);if(r&&!Vs.test(r)&&!/^20\d{2}/.test(r)&&r!==e.textContent?.trim()&&t.querySelector('a[href^="/c/"]'))return r;t=t.parentElement}return""}function Xs(e){if(ae(e)){let t=document.querySelector('[data-testid="create-new-chat-button"]');return t instanceof HTMLAnchorElement?t:document.querySelector('a[href="/"]')}try{for(let t of document.querySelectorAll(`a[href*="/c/${e}"]`))if(ai(t.getAttribute("href")||"")===e)return t}catch{}return null}function Uu(e){let t=Xs(e);if(t){t.click();return}if(ae(e)){location.assign("/");return}location.assign(`/c/${e}`)}function Vu(){let e=Ge();Fe&&Fe!==e&&In(Fe),Fe=e,ci(e),di();let t=si(e);t&&li(e,t),In(e)}function Xo(){wt===void 0&&(wt=window.setTimeout(()=>{wt=void 0,Vu()},120))}function Wu(){xt||(xt=history.pushState.bind(history),Hn=history.replaceState.bind(history),history.pushState=function(...t){let n=xt(...t);return Xo(),n},history.replaceState=function(...t){let n=Hn(...t);return Xo(),n})}function Yu(){xt&&(history.pushState=xt),Hn&&(history.replaceState=Hn),xt=null,Hn=null}function Xu(e){return Ou.has(e.code)||e.keyCode===192?!0:Bu.has(e.key)}function Js(e){return e.key==="Control"||e.code==="ControlLeft"||e.code==="ControlRight"}function Ju(e,t){On=t,di(),In(Ge()),_=!0,ie=0;try{let n=Ge();ci(n);let o=Zo();o.length>1&&(ie=e?o.length-1:1)}catch(n){zs.error("Failed to open switcher:",n)}St()}function Gs(e){let{length:t}=Zo();t&&(ie=(ie+(e?-1:1)+t)%t,St())}function ui(){if(!_)return;let e=Zo()[ie];_=!1,On=!1,St(),e&&Uu(e.id)}function Zs(){_&&(_=!1,On=!1,St())}function Zu(e){if(Js(e)){Pn=!0;return}if((e.ctrlKey||Pn)&&!e.altKey&&!e.metaKey&&Xu(e)&&!e.repeat){e.preventDefault(),e.stopImmediatePropagation();try{_?Gs(e.shiftKey):Ju(e.shiftKey,!0)}catch(n){zs.error("Hotkey failed:",n)}return}if(_){if(e.key==="Escape"){e.preventDefault(),Zs();return}if(e.key==="Enter"&&!e.shiftKey){e.preventDefault(),ui();return}e.key==="Tab"&&(e.ctrlKey||Pn)&&(e.preventDefault(),Gs(e.shiftKey))}}function Qu(e){Js(e)&&(Pn=!1,_&&On&&ui())}function em(e){let t=e.target instanceof Element?e.target:null;!t||!t.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(Xo)}function tm(e){!_||(e.target instanceof Element?e.target:null)?.closest(`#${Et}`)||Zs()}function nm(){document.visibilityState==="hidden"&&In(Ge())}function om(){if(!document.body)return null;let e=document.getElementById(Et);if(e instanceof HTMLElement)return oi=e,e;e=document.createElement("div"),e.id=Et;let t=document.createElement("div");return t.className="bloom-rt-panel",t.setAttribute("role","listbox"),t.setAttribute("aria-label","Recent conversations"),t.dataset.visible="false",t.addEventListener("click",n=>n.stopPropagation()),e.append(t),document.body.append(e),oi=e,e}function St(){let e=om();if(!e)return;let t=e.querySelector(".bloom-rt-panel");if(!t)return;if(!_){t.dataset.visible="false",t.replaceChildren();return}let n=Zo();if(!n.length){t.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",t.replaceChildren(i);return}ie>=n.length&&(ie=0);let o=document.createElement("div");o.className="bloom-rt-list",o.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===ie?"true":"false",s.setAttribute("aria-selected",a===ie?"true":"false");let c=document.createElement("div");if(c.className="bloom-rt-name",c.textContent=i.title,s.append(c),i.project){let l=document.createElement("div");l.className="bloom-rt-project",l.textContent=i.project,s.append(l)}if(i.preview.user||i.preview.assistant){let l=document.createElement("div");if(l.className="bloom-rt-preview",i.preview.user){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="user",d.textContent=i.preview.user,l.append(d)}if(i.preview.assistant){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="assistant",d.textContent=i.preview.assistant,l.append(d)}s.append(l)}s.addEventListener("click",()=>{ie=a,ui()}),o.append(s)}),t.replaceChildren(o),t.dataset.visible="true",t.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function rm(){document.getElementById(Et)?.remove(),oi=null}var Qs=h({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[b.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${Et}`],settings:H,start(){S("recentTopics",js),Fe=Ge(),ci(Fe),di(),In(Fe),ni=Te(Gu),Wu(),Yo=new AbortController;let{signal:e}=Yo;window.addEventListener("keydown",Zu,{capture:!0,signal:e}),window.addEventListener("keyup",Qu,{capture:!0,signal:e}),window.addEventListener("popstate",Xo,{signal:e}),document.addEventListener("click",em,{capture:!0,signal:e}),document.addEventListener("click",tm,{signal:e}),document.addEventListener("visibilitychange",nm,{signal:e})},stop(){Yo?.abort(),Yo=null,wt!==void 0&&(clearTimeout(wt),wt=void 0),Yu(),ni?.(),ni=null,_=!1,On=!1,Pn=!1,rm()},onSettingsChange(){let e=Jo(Nn());e.length!==Nn().length&&(H.store.visits=e),_&&St()}});var mi="cleaner",im=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],am=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],sm=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],lm=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],cm=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],dm=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],ze=w({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function Lt(e){return`${e.join(",")}{display:none!important}`}function el(){let e=[];if(ze.store.hideDownloadApps!==!1&&e.push(Lt(im)),ze.store.hideDisclaimer!==!1&&e.push(Lt(am)),ze.store.hideUpgrade!==!1&&e.push(Lt(sm)),ze.store.hideLockedModels!==!1&&e.push(Lt(lm)),ze.store.hideHomePromo!==!1&&e.push(Lt(cm)),ze.store.hideAds!==!1&&e.push(Lt(dm)),!e.length){v(mi);return}S(mi,e.join(`
`))}var tl=h({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[b.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:ze,start:el,onSettingsChange:el,stop(){v(mi)}});var Qo=new x("ResponseNotification"),um=400,mm=3,At=w({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:vm},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),fi=!1,Ve=!1,Ke=0,Ue="",Mt=!1,Bn="",Tt,Ct=null,kt=null;function nl(){return te(O())}function fm(){return document.visibilityState==="hidden"||document.hidden}function pm(){return At.store.onlyWhenHidden===!1?!0:fm()}function gm(){let e=vt(ne());if(e)return e;let t=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return t&&!/^ChatGPT$/i.test(t)?t:"Chat"}function ol(){try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!kt||kt.state==="closed")&&(kt=new e);let t=kt,n=t.currentTime,o=[523.25,659.25];for(let r=0;r<o.length;r++){let i=t.createOscillator(),a=t.createGain();i.type="sine",i.frequency.value=o[r];let s=n+r*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(t.destination),i.start(s),i.stop(s+.24)}t.resume?.()}catch(e){Qo.debug("chime failed",e)}}function hm(e){try{let t=new Audio(e);t.volume=.7,t.play()}catch(t){Qo.debug("custom sound failed",t),ol()}}function rl(){let e=String(At.store.soundUrl||"").trim();e?hm(e):ol()}function bm(){let e="Bloom++",t=`${gm()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:e,text:t,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(e,{body:t,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){Qo.debug("notification failed",n)}}function ym(){pm()&&(At.store.sound!==!1&&rl(),At.store.browserNotification!==!1&&bm())}function vm(e){let t=document.createElement("button");return t.type="button",t.textContent="Play",t.addEventListener("click",()=>rl()),e.appendChild(t),()=>{t.remove()}}function xm(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest("button");n instanceof HTMLElement&&T(n)&&(Mt=!0)}function wm(){if(!fi)return;let e=O()||location.pathname;if(Bn&&e&&Bn!==e){Ve=!1,Ke=0,Ue="",Mt=!1,Bn=e;return}Bn=e;let t=C(),n=nl();if(t){Ve=!0,Ke=0,Ue=n;return}if(!Ve||(Ke+=1,Ke<mm))return;let o=!!Ue&&Ue===n,r=Mt,i=G();Ve=!1,Ke=0,Mt=!1,Ue="",!(!o||r||i)&&ym()}var il=h({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[b.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:At,start(){fi=!0,Ve=C(),Ke=0,Ue=Ve?nl():"",Mt=!1,Bn=O()||location.pathname,Ct?.abort(),Ct=new AbortController,document.addEventListener("click",xm,{capture:!0,signal:Ct.signal}),Tt!==void 0&&clearInterval(Tt),Tt=setInterval(wm,um),At.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:Ct.signal}),Qo.debug("watch started")},stop(){fi=!1,Tt!==void 0&&(clearInterval(Tt),Tt=void 0),Ct?.abort(),Ct=null,Ve=!1,Ke=0,Ue="",Mt=!1;try{kt?.close()}catch{}kt=null}});var al=`#bloom-pq-chip {
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
`;var qn=new x("PromptQueue"),hi="bloom-pq-chip",sl="promptQueue",Sm=400,Lm=3,ll=80,Tm=50,Cm=2e3,ul=w({replacePending:{type:2,description:"Replace the queued prompt if you Enter again while one is waiting.",default:!0}}),N=new Map,me=!1,We=!1,Ht=0,Ce="",Nt=!1,V="",M="",Me=!1,W=!1,k=null,Dn=null,Pt,$n,_n,ke=null;function Ae(){return te(O())}function Rt(e){return e.replaceAll("\u200B","").replace(/\n$/,"").trim()}function cl(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(Z);return n instanceof HTMLElement?n:I()}function bi(e){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation()}function ml(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function km(){try{let e=document.querySelectorAll('[data-message-author-role="user"]'),t=e[e.length-1];return t instanceof HTMLElement?Rt(t.innerText||t.textContent||""):""}catch{return""}}function Mm(e,t){if(!e||e===t)return!1;if(e.endsWith("|draft")&&!t.endsWith("|draft"))return!0;try{let n=e.split("|")[0],o=t.split("|")[0],r=new URL(n).pathname.replace(/\/$/,"")||"/",i=new URL(o).pathname.replace(/\/$/,"")||"/";if((r==="/"||r==="")&&i.startsWith("/c/"))return!0}catch{}return!1}function Am(e){if(!V||V===e)return;let t=N.get(V);!t||N.has(e)||Mm(V,e)&&(N.delete(V),N.set(e,t),Ce===V&&(Ce=e),M===V&&(M=e),k?.key===V&&(k.key=e),qn.debug("migrated pending",V,"\u2192",e))}function yi(e){let t=Ae();if(N.get(t)&&ul.store.replacePending===!1)return;N.set(t,{text:e,at:Date.now()}),k={key:t,text:e,turns:ml(),ticks:3};let o=I();o&&de(o,""),Ye(),qn.debug("queued",t,e.length)}function Pm(e){N.delete(e),M===e&&(M=""),k?.key===e&&(k=null),Ye()}function Hm(){W=!0,clearTimeout(_n),_n=setTimeout(()=>{W=!1,_n=void 0},Cm)}function Nm(){let e=Ae(),t=N.get(e);if(!t)return;let n=I();if(!n)return;N.delete(e),M="",Ye(),Hm(),de(n,t.text);let o=ce();o&&!T(o)&&!bn(o)&&(o.click(),W=!1)}function dl(e){if(!me||Me||C()||Ae()!==e)return;let t=N.get(e);if(!t){M="";return}if(G())return;let n=I();if(!n)return;if(!Se(n)){let r=Rt(q(n));if(r&&r!==t.text)return}let o=ce();!o||T(o)||bn(o)||(Me=!0,de(n,t.text),clearTimeout($n),$n=setTimeout(()=>Rm(e,t.text),Tm))}function Rm(e,t){$n=void 0;try{if(!me)return;let n=N.get(e);if(!n||n.text!==t||C()||Ae()!==e)return;let o=I();if(!o)return;let r=Rt(q(o));if(r&&r!==t&&!Se(o))return;r!==t&&de(o,t);let i=ce();if(!i||T(i)||bn(i))return;i.click(),N.delete(e),M="",Ye(),qn.debug("drained",e)}finally{Me=!1}}function pi(e){let t=Q();if(!t||t===document.body){e.style.left="50%",e.style.bottom="6.5rem";return}let n=t.getBoundingClientRect();e.style.left=`${Math.round(n.left+n.width/2)}px`,e.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`;let o=Math.min(512,Math.max(160,n.width-24));e.style.maxWidth=`${Math.round(o)}px`}function gi(){ke?.remove(),ke=null}function Ye(){if(!me||!document.body){gi();return}let e=Ae(),t=N.get(e);if(!t){gi();return}let n=ke;n?.isConnected||(n=document.createElement("div"),n.id=hi,document.body.appendChild(n),ke=n),n.replaceChildren();let o=document.createElement("span");o.className="bloom-pq-kicker",o.textContent="Next";let r=document.createElement("span");r.className="bloom-pq-text";let i=t.text.length>ll?`${t.text.slice(0,ll)}\u2026`:t.text;r.textContent=i,r.title=t.text;let a=document.createElement("div");a.className="bloom-pq-actions";let s=document.createElement("button");s.type="button",s.className="bloom-pq-btn bloom-pq-send",s.textContent="Send now",s.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),Nm()});let c=document.createElement("button");c.type="button",c.className="bloom-pq-btn bloom-pq-x",c.setAttribute("aria-label","Dismiss queued prompt"),c.textContent="\xD7",c.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),Pm(e)}),a.append(s,c),n.append(o,r,a),pi(n)}function Im(){if(!k)return;if(k.ticks-=1,N.get(k.key)&&ml()>k.turns){let t=km();if(t&&t===k.text){qn.debug("native send leaked; dropping pending"),N.delete(k.key),M===k.key&&(M=""),k=null,Ye();return}}k.ticks<=0&&(k=null)}function Om(){if(!me)return;let e=Ae();if(Am(e),V=e,Im(),C()){We||(Nt=!1),We=!0,Ht=0,Ce=e,M="",ke&&pi(ke);return}if(!We){M&&M===e&&dl(M),ke&&pi(ke);return}if(Ht+=1,Ht<Lm)return;let n=!!Ce&&Ce===e,o=Nt,r=G();if(We=!1,Ht=0,Nt=!1,Ce="",!n||o||r){M="",Ye();return}M=e,dl(e)}function Bm(e){if(!me||e.isComposing||e.keyCode===229||e.key!=="Enter"||e.shiftKey||e.ctrlKey||e.metaKey||Me)return;let t=cl(e.target)??cl(document.activeElement);if(!t||!C())return;if(e.altKey||W){W=!1;return}if(!ee(t))return;let n=Rt(q(t));n&&(bi(e),yi(n))}function Dm(e){let t=e.closest("button");if(!(t instanceof HTMLElement)||T(t))return null;let n=e.closest(ct);if(n instanceof HTMLElement&&!T(n))return n;let o=ce();return o&&(t===o||o.contains(t)||t.contains(o))?o:null}function _m(e){if(!me)return;let t=e.target;if(!(t instanceof Element)||t.closest(`#${hi}`))return;let n=t.closest("button");if(n instanceof HTMLElement&&T(n)){Nt=!0;return}if(Me||!C()||!Dm(t))return;if(W){W=!1;return}let o=I();if(!o||!ee(o))return;let r=Rt(q(o));r&&(bi(e),yi(r))}function $m(e){if(!me)return;let t=e.target;if(!(t instanceof HTMLFormElement)||!t.matches(Ho)&&!t.querySelector(Z)||Me||!C())return;if(W){W=!1;return}let n=I()??t.querySelector(Z);if(!n||!ee(n))return;let o=Rt(q(n));o&&(bi(e),yi(o))}var fl=h({name:"PromptQueue",description:"Queue the next prompt while a reply is streaming. Enter/Send waits for this turn instead of interrupting.",authors:[b.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:sl,cleanupSelectors:[`#${hi}`],settings:ul,start(){me=!0,We=C(),Ht=0,Ce=We?Ae():"",Nt=!1,V=Ae(),M="",Me=!1,W=!1,k=null,S(sl,al),Dn?.abort(),Dn=new AbortController;let{signal:e}=Dn;window.addEventListener("keydown",Bm,{capture:!0,signal:e}),document.addEventListener("click",_m,{capture:!0,signal:e}),document.addEventListener("submit",$m,{capture:!0,signal:e}),Pt!==void 0&&clearInterval(Pt),Pt=setInterval(Om,Sm),Ye(),qn.debug("watch started")},stop(){me=!1,Dn?.abort(),Dn=null,Pt!==void 0&&(clearInterval(Pt),Pt=void 0),clearTimeout($n),$n=void 0,clearTimeout(_n),_n=void 0,N.clear(),k=null,M="",Me=!1,W=!1,We=!1,Ht=0,Ce="",Nt=!1,gi()}});var pl=`.bloom-cls {
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
`;var yl=new x("ChatListStatus"),gl="chatListStatus",tr="bloom-cls",jm="bloom-cls",Fm=500,Gm=1200*1e3,zm="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",He=new Map,Ne=!1,Ot="",jn=!1,It,Dt=0,Pe=null,wi=null,Bt=null,vi=null,_t=!1;function er(){return Date.now()}function vl(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function $t(e,t,n,o=!0){if(!(!e||!Ne)){if(t==="idle")He.delete(e);else{let r=He.get(e);r&&r.kind===t&&n!=="net"?r.at=er():He.set(e,{kind:t,at:er(),source:n})}o&&Km({v:1,id:e,kind:t,at:er()}),nr()}}function Km(e){try{Bt?.postMessage(e)}catch{}}function Um(e){let t=e.data;!t||t.v!==1||!t.id||t.kind!=="streaming"&&t.kind!=="done"&&t.kind!=="error"&&t.kind!=="idle"||$t(t.id,t.kind,"bc",!1)}function Vm(){let e=er();for(let[t,n]of He)n.kind==="streaming"&&e-n.at>Gm&&He.delete(t)}function Wm(){let e=vl();if(!e)return[];let t=[],n=new Set;try{for(let o of e.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(o.closest(zm))continue;let r=ut(o.getAttribute("href")||"");!r||n.has(r)||(n.add(r),t.push(o))}}catch{}return t}function hl(e){let t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),e==="streaming")t.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("cx","12"),o.setAttribute("cy","12"),o.setAttribute("r","9"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","2"),t.appendChild(o)}return t.appendChild(n),t}function xi(e){let t=e.querySelector(`:scope > .${tr}`);return t||null}function Ym(){if(!Ne)return;Vm();let e=ne(),t=Wm();Pe?.disconnect();try{for(let n of t){let o=ut(n.getAttribute("href")||"");if(!o||!e||o!==e){xi(n)?.remove();continue}let i=He.get(o)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){xi(n)?.remove();continue}let a=xi(n);a||(a=document.createElement("span"),a.className=tr,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(hl("streaming")):i==="error"&&a.appendChild(hl("error")))}}catch(n){yl.debug("paint failed",n)}xl()}function nr(){!Ne||Dt||(Dt=requestAnimationFrame(()=>{Dt=0,Ne&&Ym()}))}function xl(){let e=vl();if(!(Pe&&wi===e&&e?.isConnected)){if(Pe?.disconnect(),wi=e,!e){Pe=null;return}Pe=new MutationObserver(()=>nr()),Pe.observe(e,{childList:!0,subtree:!0})}}function Xm(e){if(Ne){if(e.type==="post-start"){e.conversationId?(_t=!1,$t(e.conversationId,"streaming","net")):_t=!0;return}e.type==="post-end"&&(_t=!1,e.conversationId&&$t(e.conversationId,e.error?"error":"done","net"))}}function bl(){if(!Ne)return;let e=ne();if(Ot&&e&&Ot!==e){let n=He.get(Ot);n?.kind==="streaming"&&n.source==="local"&&$t(Ot,G()?"error":"done","local"),jn=!1}if(Ot=e,C()){jn=!0,e&&$t(e,"streaming","local"),nr();return}jn&&(jn=!1,e&&$t(e,G()?"error":"done","local")),_t=!1,nr()}var wl=h({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[b.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${tr}`],start(){Ne=!0,S(gl,pl);try{Bt=new BroadcastChannel(jm)}catch{Bt=null}Bt?.addEventListener("message",Um),vi=Te(Xm),xl(),It!==void 0&&clearInterval(It),It=setInterval(bl,Fm),bl(),yl.debug("sidebar status watch started")},stop(){Ne=!1,Dt&&cancelAnimationFrame(Dt),Dt=0,It!==void 0&&(clearInterval(It),It=void 0),Pe?.disconnect(),Pe=null,wi=null,vi?.(),vi=null;try{Bt?.close()}catch{}Bt=null,He.clear(),_t=!1,jn=!1,Ot="",document.querySelectorAll(`.${tr}`).forEach(e=>e.remove()),v(gl)}});var Sl="widerChat",Ll=40,Tl=96,Cl=64,kl=w({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:Ll,max:Tl,default:Cl}});function Jm(){return nt(Number(kl.store.width??Cl),Ll,Tl)}function El(){let e=Jm(),t=`min(100%,${e}rem)`;S(Sl,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important;--user-chat-width:${e}rem!important;--composer-container-max-width:${e}rem!important;--thread-xl-max-width:${e}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${t}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${t}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${t}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${t}!important}`)}var Ml=h({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[b.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:kl,start:El,onSettingsChange:El,stop(){v(Sl)}});var Al=`.bloom-ts {
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
`;function Pl(e,t,n=Date.now()){let o=new Date(e);if(Number.isNaN(o.getTime()))return"";let r=new Date(n),i=o.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(o.toDateString()===r.toDateString()||!t)return i;let s=o.getFullYear()===r.getFullYear();return`${o.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Hl(e){try{return new Date(e).toISOString()}catch{return""}}var Ol=new x("MessageTimestamps"),Nl="messageTimestamps",or="bloom-ts",Rl=1500,Qm="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",Ft=w({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),Gt=new Map,zt=!1,jt=0,qt,Re=null,Si=null,Ei=null,Il=!1;function Bl(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function Li(){let e=Ft.plain.stamps;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Dl(){let e={...Li()};for(let[n,o]of Gt)e[n]=o;let t=Object.keys(e);if(t.length>Rl){let n=t.slice(t.length-Rl),o={};for(let r of n)o[r]=e[r];Ft.store.stamps=o;return}Ft.store.stamps=e}var ef=Ki(Dl,500);function _l(e,t){!e||!t||Gt.get(e)===t||(Gt.set(e,t),ef(),Fn())}function tf(e){return e?Gt.get(e)??Li()[e]??Wo(e)??null:null}function nf(e){zt&&e.type==="message-time"&&_l(e.messageId,e.createTime)}function of(e){return(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function rf(){let e=Bl();if(!e)return[];let t=[];try{for(let n of e.querySelectorAll("[data-message-id]"))n.closest(Qm)||t.push(n)}catch{}return t}function af(e){try{return!!e.querySelector("time:not(.bloom-ts)")}catch{return!1}}function sf(){if(!zt)return;let e=Ft.store.hideOwnMessages===!0,t=Ft.store.showDate!==!1,n=C(),o=rf();Re?.disconnect();try{o.forEach((r,i)=>{let a=r.getAttribute("data-message-id")||"",s=of(r),c=r.querySelector(`:scope > .${or}`);if(e&&s==="user"){c?.remove();return}if(af(r)){c?.remove();return}let l=tf(a);if(!l&&a&&(n||Il)&&i>=o.length-2&&(l=Date.now(),_l(a,l)),!l){c?.remove();return}let d=Pl(l,t);if(!d){c?.remove();return}let u=c;u||(u=document.createElement("time"),u.className=or,u.setAttribute("aria-hidden","true"),r.insertBefore(u,r.firstChild)),u.textContent!==d&&(u.textContent=d);let m=Hl(l);m&&u.getAttribute("datetime")!==m&&u.setAttribute("datetime",m)})}catch(r){Ol.debug("paint failed",r)}Il=n,$l()}function Fn(){!zt||jt||(jt=requestAnimationFrame(()=>{jt=0,zt&&sf()}))}function $l(){let e=Bl();if(!(Re&&Si===e&&e?.isConnected)){if(Re?.disconnect(),Si=e,!e||e===document.body){Re=null;return}Re=new MutationObserver(()=>Fn()),Re.observe(e,{childList:!0,subtree:!0})}}var ql=h({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[b.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${or}`],settings:Ft,start(){zt=!0,S(Nl,Al);let e=Li();for(let[t,n]of Object.entries(e))typeof n=="number"&&n>0&&Gt.set(t,n);Ei=Te(nf),$l(),qt!==void 0&&clearInterval(qt),qt=setInterval(Fn,800),Fn(),Ol.debug("timestamp watch started")},stop(){zt=!1,jt&&cancelAnimationFrame(jt),jt=0,qt!==void 0&&(clearInterval(qt),qt=void 0),Re?.disconnect(),Re=null,Si=null,Ei?.(),Ei=null,Dl(),Gt.clear(),document.querySelectorAll(`.${or}`).forEach(e=>e.remove()),v(Nl)},onSettingsChange:Fn});var Ti="streamerMode",lf="filter:blur(6px)!important;transition:filter .2s ease",cf="filter:none!important",Gn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],Kt=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function Y(e,t){return e.map(n=>`${n} ${t}`)}var Xe=w({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function Ut(e,t=!0){let n=e.join(","),o=e.map(r=>`${r}:hover`).join(",");return`${n}{${lf}}${t?`${o}{${cf}}`:""}`}function jl(){let e=[];if(Xe.store.conversations!==!1&&(e.push(Ut([...Y(Kt,'a[href^="/c/"]'),...Y(Kt,'a[href*="/c/"]')])),e.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),Xe.store.projects!==!1&&(e.push(Ut([...Y(Kt,'a[href*="/project"]'),...Y(Kt,'a[href*="/g/g-p-"]'),...Y(Kt,'[data-testid="project-name"]'),...Y(Kt,'[data-testid="project-link"]')])),e.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),Xe.store.headerTitle!==!1&&e.push(Ut(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),Xe.store.accountAvatar!==!1&&e.push(Ut([...Y(Gn,"img"),...Y(Gn,'[class*="avatar"]')],!1)),Xe.store.accountName!==!1&&e.push(Ut([...Y(Gn,".min-w-0 > .truncate"),...Y(Gn,".min-w-0.flex-1 .truncate")],!1)),Xe.store.accountEmail!==!1&&e.push(Ut([...Y(Gn,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),e.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),e.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!e.length){v(Ti);return}S(Ti,e.join(`
`))}var Fl=h({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[b.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Xe,start:jl,onSettingsChange:jl,stop(){v(Ti)}});var Gl=`.bloom-gc-panel {
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
}`;var uf=new x("GreetingCustomizer"),Vt="greetingCustomizer",zl="greetingCustomizerUi",zn=100,ki=30,mf=120,ff=1e3,pf=50,gf=40,hf=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),Kn=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),lr=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function bf(e){return!!e?.closest(hf)}function Wl(e){return!!(bf(e)||e.closest('[data-testid="temporary-chat-label"]')||e.closest("[hidden]")||e.getAttribute("aria-hidden")==="true"||e.classList.contains("sr-only"))}function Zn(e){try{for(let t of document.querySelectorAll(e))if(!Wl(t))return t}catch{}return null}function Ci(e){for(let t of e.split(",").map(n=>n.trim()).filter(Boolean))if(Zn(t))return t;return e}var Yl=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],R=w({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:Rf},greetings:{type:0,description:"Greeting texts",hidden:!0,default:Yl},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),se=!1,Xt=!1,Ze=null,ir,Un,Wt,Vn,ar=0,rr=null,Yt=null,Wn=null,Yn=null,Xn=null,sr=null;function pe(){let e=location.pathname||"/";return e==="/"||e===""}function Je(){let e=R.plain.greetings;return Array.isArray(e)?e.filter(t=>typeof t=="string"):Yl.slice()}function Jn(e){return String(e??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function Kl(e){R.store.greetings=e.slice(0,ki)}function Qn(){let e=String(R.store.mode??"refresh");return e==="interval"||e==="manual"?e:"refresh"}function yf(){return R.store.order==="random"?"random":"sequential"}function vf(){return nt(Number(R.store.intervalSec??10),1,3600)*1e3}function xf(e){return String(e??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function wf(){return!!Zn(lr)}function cr(){return!!(Zn(lr)||Zn(Kn))}function Ef(e,t){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),o=[`content:"${e}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),r=wf()?Ci(lr):Zn(Kn)?Ci(Kn):Ci(lr),i=t?`${Kn}{cursor:pointer!important;user-select:none!important}`:"";return[`${r}{${n}}`,`${r}::before{${o}}`,i,`@media (max-width:768px){${r}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function Sf(e,t){if(e<=0)return 0;if(e===1)return Number(R.plain.index)!==0&&(R.store.index=0),Number(R.plain.lastRandom)!==0&&(R.store.lastRandom=0),0;let n=Number(R.plain.index),o=Number(R.plain.lastRandom);if(!t)return n>=0&&n<e?n:0;if(yf()==="random"){let a=n>=0&&n<e?n:o,s=Math.floor(Math.random()*e),c=0;for(;s===a&&c++<10;)s=Math.floor(Math.random()*e);return R.store.index=s,R.store.lastRandom=s,s}let i=((n>=-1&&n<e?n:-1)+1)%e;return R.store.index=i,i}function fe(e){if(!se)return;if(!pe()){v(Vt);return}let t=Je().map(Jn).filter(Boolean);if(!t.length){v(Vt);return}let n=Sf(t.length,e),o=t[n]??t[0],r=Qn()==="manual"&&t.length>1;S(Vt,Ef(xf(o),r)),sr?.()}function Mi(){ir!==void 0&&(clearInterval(ir),ir=void 0)}function Ai(){Mi(),!(!se||!pe())&&Qn()==="interval"&&(Je().filter(Boolean).length<=1||(ir=setInterval(()=>fe(!0),vf())))}function Pi(){Vn!==void 0&&(clearTimeout(Vn),Vn=void 0),ar=0}function Ul(){if(Pi(),!se||!pe())return;ar=gf;let e=()=>{if(Vn=void 0,!(!se||!pe())){if(cr()){Qn()==="refresh"&&!Xt?(Xt=!0,fe(!0)):fe(!1),Ai();return}ar-=1,ar>0&&(Vn=setTimeout(e,pf))}};e()}function Hi(){if(Ze===!0){cr()?fe(!1):Ul();return}Ze=!0,Xt=!1,Qn()==="refresh"?(Xt=!0,fe(!0)):fe(!1),Ai(),cr()||Ul()}function Ni(){Ze=!1,Xt=!1,Mi(),Pi(),v(Vt)}function dr(){Wt===void 0&&(Wt=window.setTimeout(()=>{Wt=void 0,se&&(pe()?Hi():Ze!==!1&&Ni())},mf))}function Lf(){Yt||(Yt=history.pushState.bind(history),Wn=history.replaceState.bind(history),Yn=function(...t){let n=Yt(...t);return dr(),n},Xn=function(...t){let n=Wn(...t);return dr(),n},history.pushState=Yn,history.replaceState=Xn)}function Tf(){Yn&&history.pushState===Yn&&Yt&&(history.pushState=Yt),Xn&&history.replaceState===Xn&&Wn&&(history.replaceState=Wn),Yt=null,Wn=null,Yn=null,Xn=null}function Cf(e){let t=e.target instanceof Element?e.target:null;t&&t.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(dr)}function kf(e){if(!se||!pe()||Qn()!=="manual"||Je().filter(Boolean).length<=1)return;let t=e.target instanceof Element?e.target:null;if(!t)return;let n=t.closest(Kn);if(!n||Wl(n))return;let o=window.getSelection?.();o&&String(o).trim()||fe(!0)}function Mf(){Un===void 0&&(Un=setInterval(()=>{if(!se)return;let e=pe();if(e!==(Ze===!0)){e?Hi():Ni();return}e&&cr()&&fe(!1)},ff))}function Af(){Un!==void 0&&(clearInterval(Un),Un=void 0)}function Vl(e,t){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=e,n.setAttribute("aria-label",e);let o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.75"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),o.setAttribute("aria-hidden","true");for(let r of t.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",r),o.appendChild(i)}return n.appendChild(o),n}var Pf="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",Hf="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function Nf(e,t){let n=Jn(e);return n?n.length>zn?`Keep it to ${zn} characters.`:Je().length+(t?1:0)>ki?`At most ${ki} greetings.`:null:"Enter a greeting."}function Rf(e){e.className="bloom-gc-panel";let t="",n=-1,o="",r=-1,i=()=>{let a=Je(),s=Number(R.plain.index);e.replaceChildren();let c=document.createElement("div");c.className="bloom-gc-composer";let l=document.createElement("textarea");l.className="bloom-gc-input",l.rows=3,l.maxLength=zn,l.placeholder="New greeting (line breaks ok)",l.value=t,l.addEventListener("input",()=>{t=l.value,o="";let f=c.querySelector(".bloom-gc-count");f&&(f.textContent=`${Jn(t).length}/${zn}`);let L=c.querySelector(".bloom-gc-error");L&&(L.textContent="")}),c.appendChild(l);let d=document.createElement("div");d.className="bloom-gc-meta";let u=document.createElement("span");u.className="bloom-gc-count",u.textContent=`${Jn(t).length}/${zn}`;let m=document.createElement("span");m.className="bloom-gc-error",m.textContent=o;let E=document.createElement("div");if(E.className="bloom-gc-actions",n>=0){let f=document.createElement("button");f.type="button",f.className="bloom-gc-btn",f.textContent="Cancel",f.addEventListener("click",()=>{n=-1,t="",o="",i()}),E.appendChild(f)}let y=document.createElement("button");if(y.type="button",y.className="bloom-gc-btn bloom-gc-btn-primary",y.textContent=n>=0?"Update":"Add",y.addEventListener("click",()=>{let f=n<0,L=Nf(t,f);if(L){o=L,i();return}let D=Jn(t),$=Je().slice();n>=0&&n<$.length?$[n]=D:$.push(D),Kl($),n=-1,t="",o="",i()}),E.appendChild(y),d.append(u,m,E),c.appendChild(d),e.appendChild(c),!a.length){let f=document.createElement("p");f.className="bloom-gc-empty",f.textContent="No greetings. The official heading stays.",e.appendChild(f);return}let p=document.createElement("div");p.className="bloom-gc-list",a.forEach((f,L)=>{let D=document.createElement("div");D.className="bloom-gc-item",L===s&&(D.dataset.active="true");let $=document.createElement("button");$.type="button",$.className=`bloom-gc-body${r===L?"":" bloom-gc-clamp"}`,$.textContent=f,$.addEventListener("click",()=>{r=r===L?-1:L,i()});let Jt=document.createElement("div");Jt.className="bloom-gc-item-actions";let Qe=Vl("Edit",Pf);Qe.addEventListener("click",()=>{n=L,t=f,o="",i()});let ge=Vl("Delete",Hf);ge.addEventListener("click",()=>{let Zt=Je().filter((et,Ie)=>Ie!==L);Kl(Zt),n===L?(n=-1,t=""):n>L&&(n-=1),i()}),Jt.append(Qe,ge),D.append($,Jt),p.appendChild(D)}),e.appendChild(p)};return sr=i,i(),()=>{sr===i&&(sr=null),e.replaceChildren()}}var Xl=h({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[b.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:zl,settings:R,start(){se=!0,S(zl,Gl),Lf(),rr=new AbortController;let{signal:e}=rr;window.addEventListener("popstate",dr,{signal:e}),document.addEventListener("click",Cf,{capture:!0,signal:e}),document.addEventListener("click",kf,{signal:e}),Mf(),Ze=null,pe()?Hi():Ni(),uf.debug("started")},stop(){se=!1,rr?.abort(),rr=null,Wt!==void 0&&(clearTimeout(Wt),Wt=void 0),Mi(),Pi(),Af(),Tf(),v(Vt),Xt=!1,Ze=null},onSettingsChange(){se&&(pe()?(fe(!1),Ai()):v(Vt))}});var eo=new x("Bloom"),Jl=!1,If=Date.now(),Of=[_a,us,xs,Ss,Ms,Rs,Qs,tl,il,fl,wl,Ml,ql,Fl,Xl];function ur(e){return new Promise(t=>setTimeout(t,e))}function Bf(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var Ql=8e3,Zl=300,Df=250;async function _f(){if(Be())return await ur(Zl),!0;for(;Date.now()-If<Ql;)if(await ur(Df),Be())return await ur(Zl),!0;return Be()||br()}function Ri(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function $f(){if(Ri())return!0;let e=Date.now()+Ql;for(;Date.now()<e;)if(await ur(100),Ri())return!0;return Ri()}function qf(){try{GM_registerMenuCommand?.("Bloom++ settings",Da)}catch{}}function jf(){uo(()=>{tn("HostShell"),eo.info("host shell",j)}),mo(()=>{eo.info("idle ready",j)}),fo(()=>{Di(),tn("HostReady"),eo.info("chrome ready",j)})}async function Ii(){await Ui()}async function Oi(){if(Jl)return;Jl=!0;for(let n of Of)try{ta(n)}catch(o){eo.error("register failed",n.name,o)}ra(),tn("Init"),qf(),jf();let e=()=>tn("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await Bf(),$f().then(n=>{n&&po()}),!await _f()){eo.warn("late islands not detected; starting default plugins",j),rt(),go();return}await da()}var ec=typeof unsafeWindow<"u"?unsafeWindow:window,Ff=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||Ff){let e=ec.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",j);try{Object.defineProperty(ec,"Bloom",{value:Bi,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}Ii().then(()=>Oi()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
