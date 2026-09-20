// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260920] v1.4.51
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

/* Bloom++ [20260920] v1.4.51. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var dd=Object.defineProperty;var ud=(e,t)=>{for(var n in t)dd(e,n,{get:t[n],enumerable:!0})};var Ha={};ud(Ha,{REPO_URL:()=>is,Settings:()=>b,VERSION:()=>G,contextKeyFromUrl:()=>re,conversationTitle:()=>Lt,conversationToken:()=>_,currentConversationId:()=>L,hasDraftText:()=>oe,hasErrorToast:()=>U,hasLateIslands:()=>ze,init:()=>Aa,initSettings:()=>Ma,isDocumentInteractive:()=>as,isStreaming:()=>H,isUserDraftEmpty:()=>Pe,messageCreateTime:()=>lr,plugins:()=>Q,requestChromeReady:()=>qo,requestIdleReady:()=>bt,requestShellReady:()=>_o,setEditorText:()=>he,subscribeHarvest:()=>z,watchStreamingEdge:()=>se,whenChromeReady:()=>$o,whenIdleReady:()=>Do,whenShellReady:()=>Bo});var ke=new Map,Co=!1;function md(){return document.getElementById("bloom-root")?.shadowRoot??null}function fd(){return document.head??null}function pt(){let e=md();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=pd()}function Kr(e,t){if(!Co)return;let n=fd();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),pt();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,pt();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,pt()}function E(e,t){let n=ke.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},ke.set(e,n)),Co&&Kr(e,n)}function Na(){Co=!0;for(let[e,t]of ke)Kr(e,t);return pt(),!0}function Ra(e){let t=ke.get(e);t&&(t.disabled=!1,Co&&Kr(e,t))}function Pa(e){let t=ke.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),pt())}function y(e){let t=ke.get(e);t&&(t.el?.remove(),ke.delete(e),pt())}function pd(){return Array.from(ke.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var v=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function p(e){return e}var Ur=new Map;function Mo(e,t){let n=Ur.get(e);return n||(n=new Set,Ur.set(e,n)),n.add(t),()=>n.delete(t)}function Fe(e,t){let n=Ur.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var gd="bloompp";function Ia(){return new Promise((e,t)=>{let n=indexedDB.open(gd,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function Oa(e){try{let t=await Ia();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function Ba(e,t){try{let n=await Ia();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function fn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function pe(e,t,n){return Math.min(n,Math.max(t,e))}function Da(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function $a(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}function _a(e,t){let n;return((...o)=>{n&&clearTimeout(n),n=setTimeout(()=>e(...o),t)})}var Ao=new v("SettingsStore"),Ce="BloomSettings",bd=100;function No(e){if(fn(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(fn(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return fn(n)?n:null}return null}catch{return null}}var Ho=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,d]of this.defaultGetters)if(l.startsWith(c)){let u=l.slice(c.length+1);if(u&&!u.includes(".")){let m=d(u);m!==void 0&&(i[a]=m,s=m);break}}}return fn(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Ao.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},bd))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(Ce,this.plain)}catch{try{GM_setValue(Ce,t)}catch(n){Ao.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(Ce,t)}catch{}Ba(Ce,t).catch(n=>Ao.warn("Failed to save settings to IndexedDB:",n))}catch(t){Ao.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){Da(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var hd=new v("Settings"),yd={plugins:{}},b=new Ho(structuredClone(yd)),vd=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function xd(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function x(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(b.store.plugins[n]||(b.store.plugins[n]={}),b.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?b.plain.plugins[n]??{}:{}}};return t}function Ed(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function qa(){let e=null;if(e=No(Ed(Ce)),e||(e=No(await Oa(Ce))),!e)try{e=No(localStorage.getItem(Ce))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(b.plain.plugins=t),hd.debug("Loaded settings")}}function ja(e,t){t&&(t.pluginName=e,b.plain.plugins[e]||(b.plain.plugins[e]={}),b.setDefaultGetter(vd(e),n=>{if(n!=="enabled")return xd(t.def,n)}))}function Fa(){return b.plain.plugins.Settings||(b.store.plugins.Settings={}),b.store.plugins.Settings}function Ro(){return Fa().pinnedPlugins??[]}function za(e){return Ro().includes(e)}function Ga(e){let t=Ro(),n=t.includes(e);return b.store.plugins.Settings={...b.plain.plugins.Settings,pinnedPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}function Po(){return Fa().starredPlugins??[]}function Ka(e){return Po().includes(e)}function Ua(e){let t=Po(),n=t.includes(e);return b.store.plugins.Settings={...b.plain.plugins.Settings,starredPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}var Io=new v("PluginManager"),Q={},pn=new Set;function Ya(e){if(Q[e.name]){Io.warn("Duplicate plugin",e.name);return}Q[e.name]=e,ja(e.name,e.settings)}function gt(e){let t=Q[e];if(!t)return!1;if(t.required)return!0;let n=b.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function Xa(e){let t=Q[e];if(!t||t.required)return;let n=!gt(e);b.plain.plugins[e]||(b.store.plugins[e]={}),b.store.plugins[e].enabled=n,n?Ja(t):wd(t),Fe("pluginToggle",{name:e,enabled:n})}function Ja(e,t=!1){if(!pn.has(e.name)&&gt(e.name))try{e.managedStyle&&Ra(e.managedStyle),e.start?.(),pn.add(e.name),e.settings&&b.addPrefixChangeListener(`plugins.${e.name}.`,()=>{pn.has(e.name)&&e.onSettingsChange?.()}),t||Io.debug("Started",e.name)}catch(n){Io.error("Failed to start",e.name,n)}}function wd(e){if(pn.has(e.name)){try{e.stop?.()}catch(t){Io.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(Pa(e.managedStyle),y(e.managedStyle)),pn.delete(e.name)}}function gn(e){for(let t of Object.values(Q))(t.startAt??"DOMContentLoaded")===e&&Ja(t)}var Va=2,Wa="defaultsRev";function Za(){for(let t of Object.values(Q))b.plain.plugins[t.name]||(b.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=b.store.plugins.Settings??(b.store.plugins.Settings={});if(e[Wa]!==Va){for(let t of["NoShareLink","NoDictation"]){let n=b.store.plugins[t]??(b.store.plugins[t]={});n.enabled=!1}e[Wa]=Va}}var bn=!1,Oo=!1,Vr=!1,es=[],ts=[],ns=[];function Wr(e){let t=e.splice(0);for(let n of t)n()}function hn(){bn||(bn=!0,Wr(es))}function Yr(){Oo||(Oo=!0,bn||hn(),Wr(ts))}function os(){Vr||(Vr=!0,bn||hn(),Oo||Yr(),Wr(ns))}function Bo(e){bn?e():es.push(e)}function Do(e){Oo?e():ts.push(e)}function $o(e){Vr?e():ns.push(e)}function _o(){hn()}function bt(){hn(),Yr()}function qo(){os()}function Qa(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function rs(){await Qa(4e3),hn(),await Qa(4e3),Yr(),os()}var h={p:"0-V-linuxdo"},G="[20260920] v1.4.51",is="https://github.com/0-V-linuxdo/Bloom";function Sd(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Td(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function Xr(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function ze(){return Xr()?Sd()||Td():!1}function as(){return ze()}var Ld=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),ss=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),kd=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Cd="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function yt(e){return e.id==="bloom-root"||!!e.closest(Cd)}function ls(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function jo(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function Jr(e){if(!(e instanceof HTMLElement)||!e.isConnected||yt(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&jo(t)?!1:e.getClientRects().length>0}function ht(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Md(){let e=[];for(let t of document.querySelectorAll(Ld))!(t instanceof HTMLElement)||!t.isConnected||yt(t)||e.push(t);return e}function Fo(e){if(!e.isConnected||yt(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function yn(){return Md().filter(Fo)[0]??null}function Zr(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||yt(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function Qr(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!yt(n)&&!ht(n)&&n.parentElement&&!ht(n.parentElement)&&(t=n);let o=t.parentElement;if(o&&!ht(o)&&!yt(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!ht(o.parentElement))return o}return t}function cs(){let e=document.querySelectorAll(ss);for(let n of e)if(Jr(n)&&!jo(n)&&ls(n))return n;let t=document.querySelectorAll(kd);for(let n of t){if(!Jr(n)||!ls(n)||jo(n))continue;let o=n.querySelector(ss);return Jr(o)&&!jo(o)?o:n}return null}function ds(){let e=yn();if(e){let t=Qr(e),n=t.parentElement;if(n&&!ht(n))return n;if(!ht(t))return t}return Zr()}function us(e){let t=yn();return t?e.composedPath().includes(t):!1}var ti=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Ad={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function ni(e){return e==="auto"||e==="light"||e==="dark"}function Hd(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Nd(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function ei(e){let t=Hd(e);return t?Nd(t)>.55?"light":"dark":null}function Rd(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=ei(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=ei(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=ei(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function ms(e){return e==="auto"?Rd():e}function Pd(e){try{let t=getComputedStyle(document.documentElement);for(let n of ti){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function fs(e,t,n){let o=Ad[t];if(n){Pd(e);for(let r of ti)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of ti)e.style.setProperty(r,o[r])}function ps(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var oi=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var Od="bloom-root",ee="bloom-rail-item",Vo="bloom-account-item",Ke="bloom-sidebar-panel",An="bloom-plugin-dialog",Qo="bloom-plugin-layer",Wo="bloom-settings-css",Bd=2e3,Ln=x({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),hs=null,Dd=null,Ne=!1,si=[],zo=null,Yo=null,Ae=null,Ko=null,ge=null,kn=null,vn,vt=0,Cn=0,xn=0,En=null,wn=null,Xo=null,ys=null,Sn=null,ri=[],Jo=!1,$d=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],_d=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],er="",Mn="all",Re="all";function tr(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function vs(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function qd(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function jd(e){let t='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return e?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${t}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`}function Fd(e){let t='<path d="M12 17v5"/>';return e?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var zd={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function Gd(e){return e.icon||zd[e.name]||tr()}function xs(){return ni(Ln.store.appearance)?Ln.store.appearance:"auto"}function Kd(){let e=document.createElement("div");e.className="bloom-field bloom-appearance-row";let t=document.createElement("span");t.className="bloom-field-label",t.textContent="Appearance";let n=document.createElement("select");n.setAttribute("aria-label","Appearance");let o=Ln.def.appearance,r=o.type===3?o.options??[]:[];for(let i of r){let a=document.createElement("option");a.value=i.value,a.textContent=i.label,n.appendChild(a)}return n.value=xs(),n.addEventListener("change",()=>{ni(n.value)&&(Ln.store.appearance=n.value)}),e.append(t,n),e}function ii(e,t,n){e&&(e.setAttribute("data-bloom-scheme",t),fs(e,t,n),e.style.removeProperty("--bloom-rail-surface"))}function Es(e){e&&(e.style.removeProperty("--bloom-rail-surface"),e.style.removeProperty("--bg-primary"))}function Tn(){let e=xs(),t=ms(e),n=e==="auto";ii(hs,t,n);let o=document.getElementById(Ke);o instanceof HTMLElement&&ii(o,t,n);let r=document.getElementById(An);r instanceof HTMLElement&&ii(r,t,n);let i=document.getElementById(ee);i instanceof HTMLElement&&Es(i),Fe("schemeChange",{scheme:t,pref:e})}function ws(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(e=>e.remove())}function Ss(){if(E("settings",oi),document.getElementById(Wo)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=Wo,e.textContent=oi,document.head.appendChild(e)}function Ud(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Vd(){for(let e of si)e();si=[]}function Ts(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function Wd(e){return e.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,t=>t.toUpperCase())}function di(e){return e.settings?Object.entries(e.settings.def).filter(([,t])=>!t.hidden):[]}function Yd(e){return di(e).length>0}function Uo(e){if(e.default!==void 0)return e.default;if(e.type===3)return(e.options?.find(n=>n.default)??e.options?.[0])?.value;if(e.type===2)return!1;if(e.type===4)return e.min??0;if(e.type===0)return"";if(e.type===1)return 0}function Xd(e,t){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let o=document.createElement("span");if(o.className="bloom-plugin-dialog-label-title",o.textContent=Wd(e),n.appendChild(o),t.description){let r=document.createElement("span");r.className="bloom-plugin-dialog-label-desc",r.textContent=t.description,n.appendChild(r)}return n}function Jd(e,t,n){if(n.hidden)return null;let o=n.type===4||n.type===0||n.type===1||n.type===5,r=document.createElement("div");r.className=o?"bloom-field bloom-field-stack":"bloom-field",r.appendChild(Xd(t,n));let i=b.store.plugins[e]??(b.store.plugins[e]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",si.push(n.render(a)),r.appendChild(a),r}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??Uo(n)??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),r.appendChild(a),r}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??Uo(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),r.appendChild(a),r}if(n.type===2){let a=Ts(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),r.appendChild(a),r}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[t]??Uo(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[t]=n.type===1?Number(a.value):a.value}),r.appendChild(a),r}return r}function gs(e,t){let n=document.createElement("div");n.className=t?`bloom-plugin-dialog-field ${t}`:"bloom-plugin-dialog-field";let o=document.createElement("div");return o.className="bloom-plugin-dialog-field-label",o.textContent=e,n.appendChild(o),n}function Zd(e){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let t=b.store.plugins[e.name]??(b.store.plugins[e.name]={});for(let[n,o]of di(e)){if(n==="enabled"||o.type===5)continue;let r=Uo(o);r!==void 0&&(t[n]=r)}ks(e)}function Ls(e){e.key==="Escape"&&(!document.getElementById(Qo)&&!document.getElementById(An)||(e.stopPropagation(),xt()))}function Qd(){Jo||(document.addEventListener("keydown",Ls),Jo=!0)}function eu(){Jo&&(document.removeEventListener("keydown",Ls),Jo=!1)}function xt(){Vd(),eu(),document.getElementById(Qo)?.remove(),document.getElementById(An)?.remove()}function ks(e){if(xt(),!document.body)return;let t=document.createElement("div");t.id=Qo,t.className="bloom-plugin-layer",t.addEventListener("pointerdown",He),t.addEventListener("pointerup",He),t.addEventListener("click",d=>{d.stopPropagation(),d.target===t&&xt()});let n=document.createElement("div");n.id=An,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",He),n.addEventListener("pointerup",He),n.addEventListener("click",He);let o=document.createElement("button");o.type="button",o.className="bloom-icon-btn bloom-plugin-dialog-close",o.setAttribute("aria-label","Close"),o.innerHTML=vs(),o.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),xt()});let r=document.createElement("div");r.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=e.name,r.appendChild(i),e.description){let d=document.createElement("p");d.className="bloom-plugin-dialog-sub",d.textContent=e.description,r.appendChild(d)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(o,r,a),e.authors?.length){let d=gs("Authors"),u=document.createElement("p");u.className="bloom-plugin-dialog-authors",u.textContent=e.authors.join(", "),d.appendChild(u),n.appendChild(d)}let s=gs("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=di(e);if(c.length)for(let[d,u]of c){let m=Jd(e.name,d,u);m&&l.appendChild(m)}if(!l.childElementCount){let d=document.createElement("p");d.className="bloom-dialog-empty",d.textContent="No configurable settings.",l.appendChild(d)}if(s.appendChild(l),n.appendChild(s),c.length){let d=document.createElement("div");d.className="bloom-plugin-dialog-footer";let u=document.createElement("button");u.type="button",u.className="bloom-plugin-dialog-reset",u.textContent="Reset",u.addEventListener("click",()=>Zd(e)),d.appendChild(u),n.appendChild(d)}t.appendChild(n),document.body.appendChild(t),Qd(),Tn()}function tu(e){let t=document.createElement("div");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Gd(e);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=e.name,a.title=e.name,r.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=Ka(e.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=jd(l),c.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation();let f=Ua(e.name);Fe("pluginStar",{name:e.name,starred:f})}),s.appendChild(c),!e.required){let g=za(e.name),f=document.createElement("button");f.type="button",f.className=`bloom-icon-btn bloom-card-pin${g?" bloom-card-pin-active":""}`,f.setAttribute("aria-label",g?"Unpin from top":"Pin to top"),f.innerHTML=Fd(g),f.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();let $=Ga(e.name);Fe("pluginPin",{name:e.name,pinned:$})}),s.appendChild(f)}if(Yd(e)){let g=document.createElement("button");g.type="button",g.className="bloom-icon-btn bloom-card-settings",g.setAttribute("aria-label",`${e.name} settings`),g.innerHTML=qd(),g.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),ks(e)}),s.appendChild(g)}let d=Ts(e.name,gt(e.name),!!e.required),u=d.querySelector("input");if(u?.addEventListener("click",g=>g.stopPropagation()),u?.addEventListener("change",()=>{Xa(e.name)}),s.appendChild(d),o.append(r,s),n.appendChild(o),e.description){let g=document.createElement("div");g.className="bloom-card-desc",g.textContent=e.description,n.appendChild(g)}let m=document.createElement("div");m.className="bloom-card-separator";let S=document.createElement("div");S.className="bloom-card-footer";let w=document.createElement("div");return w.className="bloom-card-author",w.textContent=e.authors?.filter(Boolean).join(", ")||"\xA0",S.appendChild(w),t.append(n,m,S),t}function Cs(){return Object.values(Q).filter(e=>!e.hidden&&e.name!=="Settings")}function Ms(e,t){return t==="all"||t==="favorites"?!0:(e.tags??[]).includes(t)}function nu(e){return`${e.name} ${e.description??""} ${(e.tags??[]).join(" ")}`.toLowerCase()}function ou(){return er.trim()?"No plugins match your search.":Re==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function ru(){let e=Cs();return _d.filter(t=>t.id==="favorites"||t.id==="all"?!0:e.some(n=>Ms(n,t.id)))}function iu(){if(Sn){Sn.replaceChildren();for(let e of ru()){let t=document.createElement("button");t.type="button",t.className=`bloom-plugin-tab${Re===e.id?" bloom-plugin-tab-active":""}`,t.textContent=e.label,t.addEventListener("click",()=>{Re=e.id,Ge()}),Sn.appendChild(t)}}}function au(){let e=Cs();if(Re==="favorites"){let t=new Set(Po());e=e.filter(n=>t.has(n.name))}else Re!=="all"&&(e=e.filter(t=>Ms(t,Re)));return Mn==="enabled"&&(e=e.filter(t=>gt(t.name))),Mn==="disabled"&&(e=e.filter(t=>!gt(t.name))),e}function Ge(){if(!En)return;iu();let e=au();Xo&&(Xo.placeholder=`Search ${e.length} plugins...`);let t=e,n=er.trim().toLowerCase();if(n&&(t=t.filter(o=>nu(o).includes(n))),Re!=="favorites"){let o=Ro();if(o.length){let r=new Map(o.map((i,a)=>[i,a]));t=t.slice().sort((i,a)=>{let s=r.has(i.name),l=r.has(a.name);return s!==l?s?-1:1:s?(r.get(i.name)??0)-(r.get(a.name)??0):i.name.localeCompare(a.name)})}}En.replaceChildren();for(let o of t)En.appendChild(tu(o));wn&&(wn.hidden=t.length>0,wn.textContent=ou())}function He(e){e.stopPropagation()}function ai(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function ui(){document.getElementById(ee)?.setAttribute("aria-expanded",Ne?"true":"false")}function su(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function mi(){xt(),er="",Mn="all",Re="all",document.getElementById(Ke)?.remove(),Ne=!1,ui()}function lu(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",He),t.addEventListener("pointerup",He),t.addEventListener("click",He);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-titles";let i=document.createElement("div");i.className="bloom-settings-brand";let a=document.createElement("span");a.className="bloom-settings-mark",a.innerHTML=tr();let s=document.createElement("h2");s.textContent="Bloom++",i.append(a,s);let l=document.createElement("p");l.className="bloom-settings-sub",l.textContent="Toggle features. Some need a reload. Click the sliders icon to configure.",r.append(i,l);let c=document.createElement("button");c.type="button",c.className="bloom-icon-btn",c.setAttribute("aria-label","Close"),c.innerHTML=vs(),c.addEventListener("click",mi),o.append(r,c),n.appendChild(o),n.appendChild(Kd());let d=document.createElement("div");d.className="bloom-plugin-tabs",n.appendChild(d);let u=document.createElement("div");u.className="bloom-search-bar";let m=document.createElement("input");m.type="search",m.className="bloom-search-input",m.setAttribute("aria-label","Search plugins"),m.placeholder="Search plugins...",m.addEventListener("input",()=>{er=m.value,Ge()});let S=document.createElement("select");S.className="bloom-search-filter",S.setAttribute("aria-label","Filter plugins");for(let f of $d){let T=document.createElement("option");T.value=f.value,T.textContent=f.label,S.appendChild(T)}S.value=Mn,S.addEventListener("change",()=>{Mn=S.value,Ge()}),u.append(m,S),n.appendChild(u);let w=document.createElement("div");w.className="bloom-plugin-list",n.appendChild(w);let g=document.createElement("p");return g.className="bloom-tab-empty",g.hidden=!0,n.appendChild(g),t.appendChild(n),En=w,wn=g,Xo=m,ys=S,Sn=d,Ge(),t}function cu(e){e.classList.add("bloom-rail-dock")}function du(){let e=document.getElementById(ee);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&Fo(e)?e:null}function uu(){if(document.getElementById(Ke)?.remove(),!document.body)return;let e=lu(Ke);cu(e),document.body.appendChild(e),Ne=!0,xt(),Tn(),ui(),Fe("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:G,dock:"center",rail:!!du()})}function fi(){let e=document.getElementById(Ke);if(e instanceof HTMLElement&&e.isConnected&&su(e)){mi();return}e?.remove(),uu()}function mu(){let e=document.createElement("button");return e.type="button",e.id=ee,e.className="bloom-rail-item",e.setAttribute("aria-controls",Ke),e.setAttribute("aria-expanded",Ne?"true":"false"),e.innerHTML=`<span class="bloom-rail-mark">${tr()}</span><span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),fi()}),e}function bs(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function fu(e){let t=e.querySelector("img");if(t instanceof HTMLElement){let n=t.getBoundingClientRect();if(n.width>8&&n.height>8)return t}for(let n of e.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}return null}function pu(e,t){for(let n of e.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||t&&(n===t||n.contains(t)||t.contains(n))||(n.textContent||"").trim().length<2)continue;let r=n.getBoundingClientRect();if(r.width>16&&r.height>8&&r.height<40)return n}return null}function Me(e,t,n){let o=`${n}px`;e.style.getPropertyValue(t)!==o&&e.style.setProperty(t,o)}function As(e,t){if(e.classList.contains("bloom-rail-compact"))return;let n=e.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!e.isConnected||!t.isConnected)return;let o=fu(t),r=getComputedStyle(t),i=Number.parseFloat(r.paddingTop),a=Number.parseFloat(r.paddingBottom);if(Number.isFinite(i)&&Me(e,"padding-top",Math.round(i)),Number.isFinite(a)&&Me(e,"padding-bottom",Math.round(a)),o){let s=o.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));Me(n,"width",l),Me(n,"height",Math.max(20,Math.round(s.height)));let c=e.getBoundingClientRect(),d=Math.round(s.left-c.left);d>=0&&d<=40&&Me(e,"padding-left",d);let u=pu(t,o);if(u){let m=u.getBoundingClientRect(),S=n.getBoundingClientRect(),w=Math.round(m.left-S.right);w>=0&&w<=24&&Me(e,"gap",w)}}else{let s=Number.parseFloat(r.paddingLeft),l=Number.parseFloat(r.columnGap||r.gap);Number.isFinite(s)&&Me(e,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&Me(e,"gap",Math.round(l))}Es(e)}function li(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function gu(){if(kn?.isConnected&&ge){ge.observe(kn,{childList:!0});return}ci()}function bu(e){if(li(e))return!1;try{if(e.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function hu(e,t){!t||!e||requestAnimationFrame(()=>{if(e.isConnected){xn=0;return}xn+=1,Cn=Date.now()+Math.min(8e3,250*2**Math.min(xn,5))})}function yu(){vt||Date.now()<Cn||(vt=requestAnimationFrame(()=>{vt=0,!(Date.now()<Cn)&&(document.getElementById(ee)?.isConnected||Zo())}))}function Zo(){if(!document.body)return;ge?.disconnect();let e=null,t=!1;try{let n=document.getElementById(ee);e=n instanceof HTMLButtonElement?n:mu();let o=yn(),r=Zr();if(o){let i=Qr(o),a=i.parentElement;if(li(i)||a&&li(a))return;e.isConnected&&e.nextElementSibling===i||(i.before(e),t=!0),bs(e),As(e,o)}else r?(e.parentElement!==r&&(r.appendChild(e),t=!0),bs(e,!0)):e.isConnected&&!Fo(e)&&(e.remove(),e=null)}finally{hu(e,t),gu(),ui()}}function ci(){let e=ds();!e||!bu(e)||kn===e&&ge||(ge?.disconnect(),kn=e,ge=new MutationObserver(()=>{document.getElementById(ee)?.isConnected||yu()}),ge.observe(e,{childList:!0}))}function vu(){Zo(),ci(),vn===void 0&&(vn=window.setInterval(()=>{let e=document.getElementById(ee);if(!(e instanceof HTMLElement)||!e.isConnected)Date.now()>=Cn&&Zo();else{xn=0;let t=yn();t&&As(e,t)}ci()},Bd))}function xu(){vn!==void 0&&(clearInterval(vn),vn=void 0),vt&&cancelAnimationFrame(vt),vt=0,Cn=0,xn=0,ge?.disconnect(),ge=null,kn=null}function Eu(e){Ko===e&&Ae||(Ae?.disconnect(),Ko=e,Ae=new MutationObserver(()=>{if(!e.isConnected){Ae?.disconnect(),Ae=null,Ko=null;return}Hs(e)}),Ae.observe(e,{childList:!0}))}function Hs(e){if(Eu(e),e.querySelector(`#${Vo}`))return;let t=document.createElement("button");t.type="button",t.id=Vo,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${tr()}<span>Bloom++</span>`,t.addEventListener("pointerdown",ai),t.addEventListener("pointerup",ai),t.addEventListener("click",n=>{ai(n),fi()}),e.insertBefore(t,e.firstChild)}function Go(){let e=cs();return e?(Hs(e),!0):!1}function wu(e){us(e)&&(queueMicrotask(Go),requestAnimationFrame(()=>{Go()}),window.setTimeout(Go,60),window.setTimeout(Go,180))}function Su(){Yo?.abort();let e=new AbortController;Yo=e,document.addEventListener("click",wu,{signal:e.signal})}function Tu(){Yo?.abort(),Yo=null,Ae?.disconnect(),Ae=null,Ko=null}function Ns(){bt(),Ud(()=>{Ss(),ws(),Zo(),fi()})}var Rs=p({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[h.p],required:!0,hidden:!0,enabledByDefault:!0,settings:Ln,startAt:"HostReady",cleanupSelectors:[`#${Od}`,`#${ee}`,`#${Vo}`,`#${Ke}`,`#${Qo}`,`#${An}`,`#${Wo}`,"#bloom-menu-panel"],start(){Ss(),ws(),vu(),Su(),zo?.(),zo=ps(Tn),Tn(),ri=[Mo("pluginToggle",()=>{Ne&&Ge()}),Mo("pluginPin",()=>{Ne&&Ge()}),Mo("pluginStar",()=>{Ne&&Ge()})]},stop(){xu(),Tu(),zo?.(),zo=null;for(let e of ri)e();ri=[],mi(),document.getElementById(ee)?.remove(),document.getElementById(Vo)?.remove(),document.getElementById(Wo)?.remove(),hs=null,Dd=null,En=null,wn=null,Xo=null,ys=null,Sn=null,Ne=!1},onSettingsChange:Tn});var nr='form[data-type="unified-composer"], form.w-full[data-type]',te=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Et=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Ps=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Is=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Lu=/stop streaming|stop generating|停止生成|停止输出|停止响应/,ku='[contenteditable="false"], button, [role="button"]';function K(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function Ue(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!K(r)))return r;return null}function Os(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function C(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=Os(e);return!!(Lu.test(n)||/^stop$/i.test(n))}function ne(){let t=Array.from(document.querySelectorAll(nr)).find(K);if(t instanceof HTMLElement)return t;let n=Ue(document,te),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function D(){let e=Array.from(document.querySelectorAll(te));return e.find(K)??e[0]??null}function Cu(e,t){if(!e||e===t||!t.contains(e))return!1;let n=e.closest(ku);return!!n&&n!==t&&t.contains(n)}function pi(e,t){let n=[];try{let o=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),r=o.nextNode();for(;r;){let i=r.parentElement;i&&Cu(i,t)||n.push(r.textContent??""),r=o.nextNode()}}catch{return e.innerText??e.textContent??""}return n.join("")}function oe(e){let t=e??D();return t?pi(t,t).replaceAll("\u200B","").trim().length>0:!1}function Pe(e){return!oe(e)}function Hn(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function Bs(e){let t=ne();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!K(n))&&e(n))return n;return null}function be(){let e=ne(),t=Ue(e,Et)??Ue(document,Et);return t&&!C(t)?t:Bs(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!C(n);let r=Os(n);return/^(send|send prompt|发送)$/i.test(r)&&!C(n)})}function gi(){let e=be();return!!e&&Hn(e)}function Ve(){let e=ne(),t=Ue(e,Ps,!0)??Ue(document,Ps,!0);if(t)return t;let n=Ue(e,Is)??Ue(document,Is);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&K(o)&&C(o))return o}return Bs(C)}function F(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>pi(n,e)).join(`
`):pi(e,e)}function bi(e,t=!1){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function he(e,t,n=!1){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r);try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch{e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),bi(e,n)}var Ds="bloom-host-icon",Nn="data-bloom-host-rel",hi="not all",yi=0,$s=0,Mu=400;function _s(e){yi+=1;try{e()}finally{yi-=1}}function or(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function wt(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function qs(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function Au(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Hu(e,t){if(e.lastElementChild===t)return;let n=Date.now();n-$s<Mu||($s=n,e.appendChild(t))}function Nu(e,t){for(let n of e.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===t||or(n)&&(n.getAttribute(Nn)||n.setAttribute(Nn,n.rel),n.media!==hi&&(n.media=hi),n.rel!==Ds&&(n.rel=Ds))}function Ru(e){for(let t of e.querySelectorAll(`link[${Nn}]`)){if(!(t instanceof HTMLLinkElement))continue;let n=t.getAttribute(Nn);n&&(t.rel=n),t.removeAttribute(Nn),t.media===hi&&t.removeAttribute("media")}}function js(e,t){let{head:n}=document;!n||!t||_s(()=>{Nu(n,e);let o=qs(e),{type:r,sizes:i}=Au(t);o?Hu(n,o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function vi(e,t){let{head:n}=document;n&&_s(()=>{qs(e)?.remove(),Ru(n)})}function Fs(e,t){let{head:n}=document;if(!n)return null;let o=0,r=new MutationObserver(i=>{if(yi)return;let a=!1,s;for(let l of i){l.type==="attributes"&&l.target instanceof HTMLLinkElement&&(l.target.id===e?a=!0:or(l.target)&&(a=!0,wt(l.target.href)&&(s=l.target.href)));for(let c of l.removedNodes)or(c)&&c.id===e&&(a=!0);for(let c of l.addedNodes)or(c)&&c.id!==e&&(a=!0,wt(c.href)&&(s=c.href))}a&&(o||(o=requestAnimationFrame(()=>{o=0,t(s)})))});return r.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),r}var zs=/\/c\/([a-zA-Z0-9_-]{8,})/i;function _(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=c=>{let d=n.indexOf(c);return d>=0&&n[d+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,d)=>{try{return document.querySelector(c)?.getAttribute(d)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function re(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function St(e){if(!e)return"";try{return(/^https?:/i.test(e)?new URL(e,location.origin).pathname:e).match(zs)?.[1]??""}catch{return e.match(zs)?.[1]??""}}function L(){let e=St(location.pathname);if(e)return e;let n=_().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return""}var Vs=new v("Harvest"),Pu=1500,Iu=200,rr=new Set,ir=new Map,ar=new Map,Tt=null,sr=null,Rn=null,ie=0;function Ou(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Bu(e){try{if(typeof e=="string")return e;if(e instanceof URL)return e.href;if(typeof Request<"u"&&e instanceof Request)return e.url}catch{}return String(e)}function Du(e,t){let n=t?.method,o=typeof Request<"u"&&e instanceof Request?e.method:"";return(n||o||"GET").toUpperCase()}function Ws(e){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(e)}var $u=/"action"\s*:\s*"(next|continue|variant)"/i;function _u(e,t,n){return!(t!=="POST"||Ws(e)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(e)||typeof n=="string"&&/"action"\s*:/.test(n)&&!$u.test(n))}function qu(e,t){return t!=="GET"||Ws(e)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(e)}function Gs(e){return e.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function Ys(e){return e?e.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function ju(e){return typeof e=="string"?Ys(e):""}function xi(e){if(typeof e=="number"&&Number.isFinite(e)&&e>0)return e>1e12?e:Math.round(e*1e3);if(typeof e=="string"){let t=e.trim();if(!t)return null;if(/^\d+(\.\d+)?$/.test(t))return xi(Number(t));let n=Date.parse(t);return Number.isFinite(n)?n:null}return null}function Xs(e,t){if(e.size<=t)return;let n=e.size-t,o=0;for(let r of e.keys())if(e.delete(r),++o>=n)break}function Ks(e,t,n){!e||!t||ar.get(e)!==t&&(ar.set(e,t),Xs(ar,Pu),Ie({type:"message-time",messageId:e,createTime:t,conversationId:n}))}function Fu(e,t){let n=t.trim();!e||!n||ir.get(e)!==n&&(ir.set(e,n),Xs(ir,Iu),Ie({type:"conversation-meta",conversationId:e,title:n}))}function Pn(e,t,n=0){if(n>6||!e||typeof e!="object")return;if(Array.isArray(e)){for(let l of e)Pn(l,t,n+1);return}let o=e,r=typeof o.conversation_id=="string"&&o.conversation_id||typeof o.conversationId=="string"&&o.conversationId||t;typeof o.title=="string"&&r&&!o.author&&!o.content&&!o.role&&Fu(r,o.title);let i=o.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",d=xi(l.create_time??l.createTime??l.created_at);c&&d&&Ks(c,d,r)}let a=typeof o.id=="string"?o.id:"",s=xi(o.create_time??o.createTime??o.created_at);if(a&&s&&(o.author||o.content||o.role||o.create_time||o.createTime)&&Ks(a,s,r),o.mapping&&typeof o.mapping=="object")Pn(o.mapping,r,n+1);else if(n<3)for(let l of Object.values(o))l&&typeof l=="object"&&Pn(l,r,n+1)}function Us(e,t){if(e)try{Pn(JSON.parse(e),t)}catch{}}function Ie(e){for(let t of Array.from(rr))try{t(e)}catch{}}async function zu(e,t,n){if(n===ie)try{let o=await e.json();if(n!==ie)return;Pn(o,t)}catch{}}async function Gu(e,t,n,o){let r=t,i=n,a=e.body;if(!a){o===ie&&Ie({type:"post-end",conversationId:r,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;o===ie;){let{done:d,value:u}=await s.read();if(d)break;if(c+=l.decode(u,{stream:!0}),!r){let S=Ys(c);S&&(r=S,Ie({type:"post-start",conversationId:r,url:""}))}let m=c.split(`
`);c=m.pop()??"";for(let S of m){let w=S.replace(/^data:\s*/,"").trim();!w||w==="[DONE]"||Us(w,r)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&o===ie&&Us(c.replace(/^data:\s*/,""),r)}catch{i=!0}finally{try{s.cancel()}catch{}}o===ie&&Ie({type:"post-end",conversationId:r,error:i})}function Ku(e,t,n){let o=Bu(t),r=Du(t,n),i=qu(o,r),a=_u(o,r,n?.body),s=ie,l="";return a&&(l=ju(n?.body)||Gs(o)||St(o)||L(),Ie({type:"post-start",conversationId:l,url:o})),e(t,n).then(c=>{if(s!==ie||!i&&!a)return c;try{let d=c.clone();i?zu(d,Gs(o)||L(),s):Gu(d,l,!c.ok,s)}catch{a&&Ie({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===ie&&Ie({type:"post-end",conversationId:l,error:!0}),c})}function Uu(){if(Tt)return;let e=Ou();Rn=e,Tt=e.fetch.bind(e);let t=(n,o)=>Ku(Tt,n,o);sr=t,e.fetch=t,Vs.debug("conversation fetch harvest hooked")}function Vu(){ie+=1,!(!Tt||!Rn)&&(sr&&Rn.fetch===sr&&(Rn.fetch=Tt),Tt=null,sr=null,Rn=null,Vs.debug("conversation fetch harvest unhooked"))}function z(e){return rr.add(e),Uu(),()=>{rr.delete(e),rr.size===0&&Vu()}}function Lt(e){return e?ir.get(e)??"":""}function lr(e){return e?ar.get(e)??null:null}var Qs=new v("Streaming");function qn(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!K(t))&&(C(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function Wu(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&K(e))}function Yu(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&K(e))}function Xu(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function U(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function H(){if(Ve()||qn()||Xu())return!0;let e=be();return e&&K(e)&&!C(e)?!1:!!(Wu()||Yu())}var Ju=400,Js=3,Xe=new Set,On,Bn=null,Ei=null,Ye=!1,We=0,Oe="",ae="",Dn=!1,$n=!1,_n=!1;function el(){return re(_())}function Zs(e,t){return{streaming:e,contextKey:t,conversationId:L()}}function Zu(e,t){if(!e||e===t)return!1;if(e.endsWith("|draft")&&!t.endsWith("|draft"))return!0;try{let n=e.split("|")[0],o=t.split("|")[0],r=new URL(n).pathname.replace(/\/$/,"")||"/",i=new URL(o).pathname.replace(/\/$/,"")||"/";if((r==="/"||r==="")&&i.startsWith("/c/"))return!0}catch{}return!1}function wi(){Ye=!1,We=0,Oe="",Dn=!1,$n=!1,_n=!1}function Qu(e){for(let t of Array.from(Xe))try{t.onFall?.(e)}catch{}}function em(e){for(let t of Array.from(Xe))try{t.onRise?.(e)}catch{}}function In(e){for(let t of Array.from(Xe))try{t.onTick?.(e)}catch{}}function tm(e,t){for(let n of Array.from(Xe))try{n.onContext?.(e,t)}catch{}}function nm(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest("button");n instanceof HTMLElement&&C(n)&&(Dn=!0)}function om(e){e.type==="post-end"&&Ye&&(_n=!0,e.error&&($n=!0))}function rm(){let e=el(),t=H();if(ae&&e&&ae!==e){if(tm(e,ae),!Zu(ae,e)){wi(),ae=e,In(Zs(t,e));return}Oe===ae&&(Oe=e)}ae=e;let n=Zs(t,e);if(t){let i=!Ye;i&&(Dn=!1,$n=!1,_n=!1),Ye=!0,We=0,Oe=e,i&&em(n),In(n);return}if(!Ye){In(n);return}if(We+=1,_n&&(We=Math.max(We,Js)),We<Js){In(n);return}let o=!!Oe&&Oe===e,r={contextKey:Oe||e,conversationId:L(),userStopped:Dn,error:$n||U()};wi(),o&&Qu(r),In(n)}function im(){On===void 0&&(Ye=H(),ae=el(),Oe=Ye?ae:"",We=0,Dn=!1,$n=!1,_n=!1,Bn?.abort(),Bn=new AbortController,document.addEventListener("click",nm,{capture:!0,signal:Bn.signal}),Ei=z(om),On=setInterval(rm,Ju),Qs.debug("watchStreamingEdge started"))}function am(){Xe.size||(On!==void 0&&(clearInterval(On),On=void 0),Bn?.abort(),Bn=null,Ei?.(),Ei=null,wi(),ae="",Qs.debug("watchStreamingEdge stopped"))}function se(e){let t=typeof e=="function"?{onFall:e}:e;return Xe.add(t),im(),()=>{Xe.delete(t),am()}}var sm=["original","badge","dot","hole","bg"],ol=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],rl={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},cr="#FCFCFC",lm="#111111",tl="#111111",cm="#ffffff",dm="#212121",um="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",mm={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},dr=32,nl=64;function il(e){return typeof e=="string"&&sm.includes(e)}function fm(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function ur(e){let t=document.createElement("canvas");t.width=dr,t.height=dr;let n=t.getContext("2d");return n?(n.scale(dr/nl,dr/nl),e(n),t.toDataURL("image/png")):""}function pm(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function mr(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(um);n&&(e.strokeStyle=lm,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function gm(e,t,n){let o=rl[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=tl,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=tl,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=cm,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function jn(e,t){if(e==="original")return t==="wait"?ur(o=>mr(o,cr)):fm(mm[t]);let n=t==="wait"?void 0:rl[t];return ur(e==="hole"?o=>mr(o,n??cr):e==="bg"?o=>{o.fillStyle=n??dm,pm(o,0,0,64,64,14),o.fill(),mr(o,cr,!1)}:o=>{mr(o,cr),t!=="wait"&&gm(o,t,e==="dot"?"dot":"badge")})}function al(e){return{wait:jn(e,"wait"),rotate:jn(e,"rotate"),done:jn(e,"done"),ready:jn(e,"ready"),error:jn(e,"error")}}var bm=new v("ChatStateFavicons"),Qe="bloom-chat-state-favicon",ml=x({style:{type:3,description:"Favicon overlay",options:ol}}),Ze="",Ti={wait:"",rotate:"",done:"",ready:"",error:""},At="wait",Ct=!1,ye=!1,V=null,zn="",Gn="",Un=!0,Fn=null,Mt=0,kt,fr=null,Je=null,Si=null,Kn=!1,sl=new WeakSet,hm=400;function ym(){let e=ml.store.style;return il(e)?e:"bg"}function vm(){let t=document.querySelector(`link[rel~="icon"]:not(#${Qe})`)?.href;return wt(t)?t:wt(Ze)?Ze:""}function ll(){let e=document.getElementById(Qe);return e instanceof HTMLLinkElement?e:null}function fl(){if(At==="wait"){vi(Qe,Ze);return}js(Qe,Ti[At])}function W(e){if(At===e)if(e==="wait"){if(!ll())return}else{let t=ll();if(t&&t.getAttribute("href")===Ti[e])return}At=e,fl()}function cl(){Ti=al(ym()),W(At)}function xm(){let e=_(),t=e?re(e):re("");return H()?(!zn&&t&&(zn=t),zn||t):(zn="",t)}function pl(){Ct=!1,ye=!1,V=null,zn=""}function Em(e){Gn=e,pl(),Un=!1,W("wait")}function dl(e,t){return!e&&Un&&!t}function gl(){if(!Kn)return;let e=_()||location.pathname;if(Gn&&e&&Gn!==e){Em(e);return}e&&(Gn=e);let t=xm(),n=H(),o=Pe(),r=gi();if(U()&&!n){W("error"),Ct=!1,ye=!1,V=null;return}if(n){Ct||(Un=!1),Ct=!0,ye=!1,V=t,W("rotate");return}if(Ct){let i=!!V&&!!t&&V===t;if(Ct=!1,i){ye=!0,V=t,W("done");return}ye=!1,V=null}if(ye)if(!!(V&&t&&V!==t))ye=!1,V=null;else if(o){W("done");return}else if(dl(o,r)){ye=!1,W("ready");return}else{ye=!1,W("wait");return}V=null,o?W("wait"):dl(o,r)?W("ready"):W("wait")}function bl(){let e=ne();if(!(Je&&Si===e&&e.isConnected)){if(Je?.disconnect(),Si=e,!e||e===document.body){Je=null;return}Je=new MutationObserver(()=>pr()),Je.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function pr(){!Kn||Mt||(Mt=requestAnimationFrame(()=>{Mt=0,Kn&&(hl(),bl(),gl())}))}function ul(){oe()&&(Un=!0),pr()}function hl(){let e=D();!e||sl.has(e)||(sl.add(e),e.addEventListener("input",ul,{passive:!0}),e.addEventListener("compositionend",ul,{passive:!0}))}var yl=p({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:ml,startAt:"DOMContentLoaded",cleanupSelectors:[`#${Qe}`],start(){Kn=!0,Ze=vm()||Ze,cl(),fr?.disconnect(),fr=Fs(Qe,e=>{wt(e)&&(Ze=e),fl()}),Fn?.abort(),Fn=new AbortController,window.addEventListener("popstate",pr,{signal:Fn.signal}),hl(),bl(),kt!==void 0&&clearInterval(kt),kt=setInterval(pr,hm),gl(),bm.debug("favicon watch started")},stop(){Kn=!1,Mt&&cancelAnimationFrame(Mt),Mt=0,kt!==void 0&&(clearInterval(kt),kt=void 0),Fn?.abort(),Fn=null,Je?.disconnect(),Je=null,Si=null,fr?.disconnect(),fr=null,pl(),Gn="",Un=!0,At="wait",vi(Qe,Ze)},onSettingsChange:cl});var vl=`.bloom-ih-hud {
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
`;var mh=new v("InputHistory"),Li=/\u200B/g,xl=10,El=500,wl=100,Sm=8,Tm=120,Lm=2e3,gr=10,br=x({maxEntries:{type:4,description:"Max stored prompts",min:xl,max:El,default:wl},history:{type:5,description:"Stored prompts",render:qm},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),ki=new Map,N=0,Ci="",le=!1,Wn=!1,Hi=0,Vn=null,Mi,Ni=null,Sl=!0;function Y(){let e=br.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Tl(e){let t=pe(Number(br.store.maxEntries??wl),xl,El);return e.length>t?e.slice(e.length-t):e}function hr(e){br.store.entries=Tl(e)}function km(e){return e.replaceAll(Li,"").replace(/\n$/,"").trim()}function Ai(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(te);return n instanceof HTMLElement?n:D()}function Cm(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!F(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(Li,"").trim().length===0,last:i.toString().replaceAll(Li,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Ll(e){clearTimeout(Mi),Mi=setTimeout(()=>{if(e!==Hi)return;Wn=!1;let t=Ni;t&&bi(t,Sl)},Tm)}function kl(e,t,n){Wn=!0,Ni=e,Sl=n;let o=++Hi;he(e,t,n),Ll(o)}function Mm(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function Ht(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Am(){document.querySelector(".bloom-ih-hud")?.remove()}function Hm(e,t){let n=Mm();n.textContent=e;let o=(t.closest("form")??ne()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-Sm)}px`,n.classList.add("bloom-ih-hud-on")}function Ri(e){let t=km(e);if(!t)return;let n=Date.now(),o=ki.get(t);if(o&&n-o<Lm)return;ki.set(t,n);let r=Y().filter(i=>i!==t);r.push(t),hr(r),N=Y().length,le=!1,Ht()}function Nm(e,t){let n=Y();if(!n.length&&e)return;N>=n.length&&(Ci=F(t),N=n.length);let o=e?N-1:N+1;o<0||o>n.length||(N=o,le=!0,kl(t,o===n.length?Ci:n[o],e),o<n.length?Hm(`${o+1} / ${n.length}`,t):Ht())}function Rm(e){le=!1,Ht(),kl(e,Ci,!1),N=Y().length}function Pm(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=Ai(e.target)??Ai(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&le&&!e.altKey&&!e.shiftKey){Rm(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){Ri(F(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=Y();if(!o){let i=Cm(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||N<=0)||!n&&N>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),Nm(n,t))}function Im(e){if(Ai(e.target)){if(Wn){Ll(Hi);return}le&&(le=!1,Ht(),N=Y().length)}}function Om(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(te);n instanceof HTMLElement&&Ri(F(n))}function Bm(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(Et);if(!n||!(n instanceof HTMLElement)||C(n))return;let o=D();o&&Ri(F(o))}function Dm(e){if(!(!le||Wn)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}le=!1,Ht()}}function $m(){if(Vn)return;Vn=new AbortController;let{signal:e}=Vn,t={capture:!0,signal:e};window.addEventListener("keydown",Pm,t),window.addEventListener("input",Im,t),window.addEventListener("submit",Om,t),window.addEventListener("click",Bm,t),window.addEventListener("pointerdown",Dm,t)}function _m(e){let t=Y().slice();t.splice(e,1),hr(t),N>t.length&&(N=t.length)}function qm(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=Y().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(f=>f.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/gr));n>=l&&(n=l-1);let c=s.slice(n*gr,n*gr+gr);e.replaceChildren();let d=document.createElement("input");if(d.className="bloom-ih-search",d.type="search",d.placeholder="Search history",d.autocomplete="off",d.value=t,d.addEventListener("input",()=>{t=d.value,n=0,r()}),e.appendChild(d),c.length){let f=document.createElement("div");f.className="bloom-ih-list",c.forEach((T,$)=>{let j=i.indexOf(T),un=Y().length-1-j,mt=document.createElement("div");mt.className="bloom-ih-item";let Le=document.createElement("button");Le.type="button",Le.className=`bloom-ih-body${o===$?"":" bloom-ih-clamp"}`,Le.textContent=T,Le.addEventListener("click",()=>{o=o===$?-1:$,r()});let mn=document.createElement("div");mn.className="bloom-ih-actions";let ft=document.createElement("button");ft.type="button",ft.title="Copy",ft.textContent="C",ft.addEventListener("click",()=>{$a(T)});let je=document.createElement("button");je.type="button",je.title="Delete",je.textContent="\xD7",je.addEventListener("click",()=>{_m(un),r()}),mn.append(ft,je),mt.append(Le,mn),f.appendChild(mt)}),e.appendChild(f)}else{let f=document.createElement("p");f.className="bloom-ih-empty",f.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(f)}let u=document.createElement("div");u.className="bloom-ih-pager";let m=document.createElement("button");m.type="button",m.className="bloom-ih-btn",m.textContent="Prev",m.disabled=n<=0,m.addEventListener("click",()=>{n-=1,r()});let S=document.createElement("span");S.textContent=`${n+1} / ${l}`;let w=document.createElement("button");w.type="button",w.className="bloom-ih-btn",w.textContent="Next",w.disabled=n+1>=l,w.addEventListener("click",()=>{n+=1,r()});let g=document.createElement("button");g.type="button",g.className="bloom-ih-clear",g.textContent="Clear all",g.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(hr([]),N=0,r())}),u.append(m,S,w,g),e.appendChild(u)};return r(),()=>{e.replaceChildren()}}var Cl=p({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:br,startAt:"HostReady",managedStyle:"inputHistory",start(){E("inputHistory",vl),N=Y().length,le=!1,$m()},stop(){Vn?.abort(),Vn=null,Ht(),Am(),ki.clear(),clearTimeout(Mi),Wn=!1,Ni=null,le=!1},onSettingsChange(){let e=Y(),t=Tl(e);t.length!==e.length&&hr(t),N>t.length&&(N=t.length)}});var Pi="noShareLink",jm=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],Fm=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],Ii=x({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Ml(e){return`${e.join(",")}{display:none!important}`}function Al(){let e=[];if(Ii.store.hideShareChat!==!1&&e.push(Ml(jm)),Ii.store.hideShareProject!==!1&&e.push(Ml(Fm)),!e.length){y(Pi);return}E(Pi,e.join(`
`))}var Hl=p({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[h.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Ii,start:Al,onSettingsChange:Al,stop(){y(Pi)}});var Pl="noDictation",zm=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],Gm=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Il=x({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Nl(e){return`${e.join(",")}{display:none!important}`}function Rl(){let e=[Nl(zm)];Il.store.hideDictationSettings!==!1&&e.push(Nl(Gm)),E(Pl,e.join(`
`))}var Ol=p({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Il,start:Rl,onSettingsChange:Rl,stop(){y(Pl)}});var Oi="noSidebarIdentity",Nt=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Bi=Nt.flatMap(e=>[`${e} .min-w-0 > .truncate`,`${e} .min-w-0.flex-1 .truncate`]),_l=Nt.flatMap(e=>[`${e} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),Km=[...Bi,..._l],Bl=[...Bi,...Nt.flatMap(e=>[`${e} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],Um=Nt.map(e=>`${e} a[href^="mailto:"]`),Vm=Nt.flatMap(e=>[`${e} .min-w-0 > :not(.truncate)`,`${e} .min-w-0 > :not(.truncate) *`,`${e} .min-w-0 .text-xs`,`${e} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${e} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${e} .text-xs:not(.truncate)`,`${e} .text-token-text-secondary:not(.truncate)`,`${e} .text-token-text-tertiary:not(.truncate)`,`${e} .min-w-0 ~ *`,`${e} .min-w-0 ~ * *`,`${e} > .text-xs`,`${e} > .text-token-text-secondary`,`${e} > .text-token-text-tertiary`]),Wm=Nt.flatMap(e=>[`${e} .min-w-0.flex-col > :not(.truncate)`,`${e} .min-w-0.flex-col > .text-xs`,`${e} .min-w-0.flex-col > .text-token-text-secondary`,`${e} .min-w-0.flex-col > .text-token-text-tertiary`,`${e} .min-w-0:not(.flex) > :not(.truncate)`,`${e} .min-w-0:not(.flex) > .text-xs`,`${e} .min-w-0:not(.flex) > .text-token-text-secondary`,`${e} .min-w-0:not(.flex) > .text-token-text-tertiary`]),Yn=x({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function Dl(e){return`${e.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Ym(e){return`${e.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function Xm(){return`${Wm.join(",")}{margin-block:auto!important}`}function Jm(){return`${Vm.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function $l(){let e=Yn.store.hideUsername!==!1,t=Yn.store.hideEmail!==!1,n=e&&Yn.store.enlargePlan!==!1,o=e&&Yn.store.alignPlanWithAvatar===!0,r=[];if(e&&(o?(r.push(Ym(n?Bl:[...Bl,..._l])),r.push(Xm())):r.push(Dl(n?Bi:Km))),t&&r.push(Dl(Um)),n&&r.push(Jm()),!r.length){y(Oi);return}E(Oi,r.join(`
`))}var ql=p({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[h.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Yn,start:$l,onSettingsChange:$l,stop(){y(Oi)}});var jl=`#bloom-rt-host {
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
`;var Gl=new v("RecentTopics"),It="bloom-rt-host",Kl="home",Ul=/^\/c\/([a-z0-9_-]{8,})/i,Qm=/\/c\/([a-z0-9_-]{8,})/i,Vl=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,ef=new Set(["Backquote","IntlBackslash"]),tf=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),nf=140,of=[3,4,5,6,7,8,9,10,11,12].map(e=>({label:String(e),value:String(e),default:e===5})),R=x({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:of},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),yr=null,$i=null,q=!1,to=!1,Xn=!1,ce=0,et="",Rt=null,Jn=null,Pt,Di=null;function rf(){let e=Number(R.store.maxRecent??5);return Number.isFinite(e)&&e>=3&&e<=12?e:5}function Zn(){let e=R.plain.visits;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function _i(){let e=R.plain.titles;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Wl(){let e=R.plain.previews;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function qi(){let e=R.plain.projects;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function xr(e){let t=rf();return e.length>t?e.slice(0,t):e}function de(e){return e===Kl}function Qn(e,t=nf){let n=e.replace(/\s+/g," ").trim();return n.length<=t?n:`${n.slice(0,t-1)}\u2026`}function ji(e){if(!e)return"";try{return new URL(e,location.origin).pathname.match(Ul)?.[1]??""}catch{return e.match(Qm)?.[1]??""}}function tt(){let e=(location.pathname||"/").match(Ul);if(e?.[1])return e[1];let n=_().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return Kl}function Fi(e){if(de(e))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${e}"]`);for(let o of n){if(ji(o.getAttribute("href")||"")!==e)continue;let r=Qn(o.textContent||"",80);if(r)return r}}catch{}let t=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return tt()===e&&t&&!/^ChatGPT$/i.test(t)?Qn(t,80):""}function af(e){if(de(e))return"New chat";let t=_i()[e];if(t)return t;let n=Lt(e);return n||Fi(e)||"Chat"}function sf(e){return qi()[e]||""}function lf(e){return Wl()[e]||{}}function zi(e,t){if(!e||de(e)||!t||/^new chat$/i.test(t.trim()))return;let n=_i();n[e]!==t&&(n[e]=t,R.store.titles=n)}function cf(e){e.type==="conversation-meta"&&(zi(e.conversationId,e.title),q&&Ot())}function df(e,t){if(!e||de(e)||!t)return;let n=qi();n[e]!==t&&(n[e]=t,R.store.projects=n)}function uf(e,t){if(!e||de(e)||!t.user&&!t.assistant)return;let n=Wl(),o=n[e]||{},r={user:t.user||o.user,assistant:t.assistant||o.assistant};o.user===r.user&&o.assistant===r.assistant||(n[e]=r,R.store.previews=n)}function Gi(e){if(!e||de(e)&&R.store.includeHome===!1)return;let t=Zn().filter(n=>n!==e);t.unshift(e),R.store.visits=xr(t)}function Er(){let e=R.store.includeHome!==!1;return xr(Zn().filter(n=>e||!de(n))).map(n=>({id:n,title:af(n),project:sf(n),preview:lf(n)}))}function Fl(e){try{let t=document.querySelectorAll(`[data-message-author-role="${e}"]`),n=t[t.length-1];if(!(n instanceof HTMLElement))return"";let o=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||o.push(a)}let r=o.length?o.join(" "):n.textContent||"";return Qn(r)}catch{return""}}function eo(e){if(!e||de(e)||e!==tt())return;let t=Fi(e);t&&zi(e,t);let n=Fl("user"),o=Fl("assistant");uf(e,{user:n,assistant:o});let r=Xl(e);if(r){let i=Yl(r);i&&df(e,i)}}function Ki(){let e=_i(),t=qi(),n=[],o=new Set,r=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${It}, #bloom-root, #bloom-sidebar-panel`))continue;let d=ji(c.getAttribute("href")||"");if(!d||o.has(d))continue;o.add(d),n.push(d);let u=Qn(c.textContent||"",80);u&&!Vl.test(u)&&e[d]!==u&&(e[d]=u,r=!0);let m=Yl(c);m&&t[d]!==m&&(t[d]=m,i=!0)}}catch{}r&&(R.store.titles=e),i&&(R.store.projects=t);let a=Zn(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(R.store.visits=xr([...a,...l]))}function Yl(e){let t=e.parentElement;for(let n=0;n<10&&t;n++){if(t.id==="bloom-rt-host"||t.id==="bloom-root"){t=t.parentElement;continue}let o=t.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),r=Qn((o instanceof HTMLElement?o.textContent:"")||"",60);if(r&&!Vl.test(r)&&!/^20\d{2}/.test(r)&&r!==e.textContent?.trim()&&t.querySelector('a[href^="/c/"]'))return r;t=t.parentElement}return""}function Xl(e){if(de(e)){let t=document.querySelector('[data-testid="create-new-chat-button"]');return t instanceof HTMLAnchorElement?t:document.querySelector('a[href="/"]')}try{for(let t of document.querySelectorAll(`a[href*="/c/${e}"]`))if(ji(t.getAttribute("href")||"")===e)return t}catch{}return null}function mf(e){let t=Xl(e);if(t){t.click();return}if(de(e)){location.assign("/");return}location.assign(`/c/${e}`)}function ff(){let e=tt();et&&et!==e&&eo(et),et=e,Gi(e),Ki();let t=Fi(e);t&&zi(e,t),eo(e)}function vr(){Pt===void 0&&(Pt=window.setTimeout(()=>{Pt=void 0,ff()},120))}function pf(){Rt||(Rt=history.pushState.bind(history),Jn=history.replaceState.bind(history),history.pushState=function(...t){let n=Rt(...t);return vr(),n},history.replaceState=function(...t){let n=Jn(...t);return vr(),n})}function gf(){Rt&&(history.pushState=Rt),Jn&&(history.replaceState=Jn),Rt=null,Jn=null}function bf(e){return ef.has(e.code)||e.keyCode===192?!0:tf.has(e.key)}function Jl(e){return e.key==="Control"||e.code==="ControlLeft"||e.code==="ControlRight"}function hf(e,t){to=t,Ki(),eo(tt()),q=!0,ce=0;try{let n=tt();Gi(n);let o=Er();o.length>1&&(ce=e?o.length-1:1)}catch(n){Gl.error("Failed to open switcher:",n)}Ot()}function zl(e){let{length:t}=Er();t&&(ce=(ce+(e?-1:1)+t)%t,Ot())}function Ui(){if(!q)return;let e=Er()[ce];q=!1,to=!1,Ot(),e&&mf(e.id)}function Zl(){q&&(q=!1,to=!1,Ot())}function yf(e){if(Jl(e)){Xn=!0;return}if((e.ctrlKey||Xn)&&!e.altKey&&!e.metaKey&&bf(e)&&!e.repeat){e.preventDefault(),e.stopImmediatePropagation();try{q?zl(e.shiftKey):hf(e.shiftKey,!0)}catch(n){Gl.error("Hotkey failed:",n)}return}if(q){if(e.key==="Escape"){e.preventDefault(),Zl();return}if(e.key==="Enter"&&!e.shiftKey){e.preventDefault(),Ui();return}e.key==="Tab"&&(e.ctrlKey||Xn)&&(e.preventDefault(),zl(e.shiftKey))}}function vf(e){Jl(e)&&(Xn=!1,q&&to&&Ui())}function xf(e){let t=e.target instanceof Element?e.target:null;!t||!t.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(vr)}function Ef(e){!q||(e.target instanceof Element?e.target:null)?.closest(`#${It}`)||Zl()}function wf(){document.visibilityState==="hidden"&&eo(tt())}function Sf(){if(!document.body)return null;let e=document.getElementById(It);if(e instanceof HTMLElement)return $i=e,e;e=document.createElement("div"),e.id=It;let t=document.createElement("div");return t.className="bloom-rt-panel",t.setAttribute("role","listbox"),t.setAttribute("aria-label","Recent conversations"),t.dataset.visible="false",t.addEventListener("click",n=>n.stopPropagation()),e.append(t),document.body.append(e),$i=e,e}function Ot(){let e=Sf();if(!e)return;let t=e.querySelector(".bloom-rt-panel");if(!t)return;if(!q){t.dataset.visible="false",t.replaceChildren();return}let n=Er();if(!n.length){t.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",t.replaceChildren(i);return}ce>=n.length&&(ce=0);let o=document.createElement("div");o.className="bloom-rt-list",o.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===ce?"true":"false",s.setAttribute("aria-selected",a===ce?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="user",d.textContent=i.preview.user,c.append(d)}if(i.preview.assistant){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="assistant",d.textContent=i.preview.assistant,c.append(d)}s.append(c)}s.addEventListener("click",()=>{ce=a,Ui()}),o.append(s)}),t.replaceChildren(o),t.dataset.visible="true",t.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function Tf(){document.getElementById(It)?.remove(),$i=null}var Ql=p({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${It}`],settings:R,start(){E("recentTopics",jl),et=tt(),Gi(et),Ki(),eo(et),Di=z(cf),pf(),yr=new AbortController;let{signal:e}=yr;window.addEventListener("keydown",yf,{capture:!0,signal:e}),window.addEventListener("keyup",vf,{capture:!0,signal:e}),window.addEventListener("popstate",vr,{signal:e}),document.addEventListener("click",xf,{capture:!0,signal:e}),document.addEventListener("click",Ef,{signal:e}),document.addEventListener("visibilitychange",wf,{signal:e})},stop(){yr?.abort(),yr=null,Pt!==void 0&&(clearTimeout(Pt),Pt=void 0),gf(),Di?.(),Di=null,q=!1,to=!1,Xn=!1,Tf()},onSettingsChange(){let e=xr(Zn());e.length!==Zn().length&&(R.store.visits=e),q&&Ot()}});var Vi="cleaner",Lf=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],kf=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],Cf=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],Mf=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],Af=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],Hf=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],nt=x({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function Bt(e){return`${e.join(",")}{display:none!important}`}function ec(){let e=[];if(nt.store.hideDownloadApps!==!1&&e.push(Bt(Lf)),nt.store.hideDisclaimer!==!1&&e.push(Bt(kf)),nt.store.hideUpgrade!==!1&&e.push(Bt(Cf)),nt.store.hideLockedModels!==!1&&e.push(Bt(Mf)),nt.store.hideHomePromo!==!1&&e.push(Bt(Af)),nt.store.hideAds!==!1&&e.push(Bt(Hf)),!e.length){y(Vi);return}E(Vi,e.join(`
`))}var tc=p({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[h.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:nt,start:ec,onSettingsChange:ec,stop(){y(Vi)}});var Sr=new v("ResponseNotification"),$t=x({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:Df},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Wi=!1,wr=null,Dt=null,no=null;function Nf(){return document.visibilityState==="hidden"||document.hidden}function Rf(){return $t.store.onlyWhenHidden===!1?!0:Nf()}function Pf(){let e=Lt(L());if(e)return e;let t=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return t&&!/^ChatGPT$/i.test(t)?t:"Chat"}function nc(){try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!Dt||Dt.state==="closed")&&(Dt=new e);let t=Dt,n=t.currentTime,o=[523.25,659.25];for(let r=0;r<o.length;r++){let i=t.createOscillator(),a=t.createGain();i.type="sine",i.frequency.value=o[r];let s=n+r*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(t.destination),i.start(s),i.stop(s+.24)}t.resume?.()}catch(e){Sr.debug("chime failed",e)}}function If(e){try{let t=new Audio(e);t.volume=.7,t.play()}catch(t){Sr.debug("custom sound failed",t),nc()}}function oc(){let e=String($t.store.soundUrl||"").trim();e?If(e):nc()}function Of(){let e="Bloom++",t=`${Pf()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:e,text:t,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(e,{body:t,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){Sr.debug("notification failed",n)}}function Bf(){Rf()&&($t.store.sound!==!1&&oc(),$t.store.browserNotification!==!1&&Of())}function Df(e){let t=document.createElement("button");return t.type="button",t.textContent="Play",t.addEventListener("click",()=>oc()),e.appendChild(t),()=>{t.remove()}}var rc=p({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:$t,start(){Wi=!0,wr?.(),wr=se(e=>{Wi&&(e.userStopped||e.error||Bf())}),no?.abort(),no=new AbortController,$t.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:no.signal}),Sr.debug("watch started")},stop(){Wi=!1,wr?.(),wr=null,no?.abort(),no=null;try{Dt?.close()}catch{}Dt=null}});var ic=`#bloom-pq-chip {
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
`;var ao=new v("PromptQueue"),Xi="bloom-pq-chip",ac="promptQueue",sc=80,_f=50,qf=2e3,uc=x({replacePending:{type:2,description:"Replace the queued prompt if you Enter again while one is waiting.",default:!0}}),I=new Map,ve=!1,X="",P="",De=!1,J=!1,M=null,oo=null,Tr=null,io,ro,_t=null;function qt(){return re(_())}function jt(e){return e.replaceAll("\u200B","").replace(/\n$/,"").trim()}function lc(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(te);return n instanceof HTMLElement?n:D()}function Ji(e){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation()}function mc(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function jf(){try{let e=document.querySelectorAll('[data-message-author-role="user"]'),t=e[e.length-1];return t instanceof HTMLElement?jt(t.innerText||t.textContent||""):""}catch{return""}}function Ff(e,t){if(!e||e===t)return!1;if(e.endsWith("|draft")&&!t.endsWith("|draft"))return!0;try{let n=e.split("|")[0],o=t.split("|")[0],r=new URL(n).pathname.replace(/\/$/,"")||"/",i=new URL(o).pathname.replace(/\/$/,"")||"/";if((r==="/"||r==="")&&i.startsWith("/c/"))return!0}catch{}return!1}function cc(e){if(!X||X===e)return;let t=I.get(X);!t||I.has(e)||Ff(X,e)&&(I.delete(X),I.set(e,t),P===X&&(P=e),M?.key===X&&(M.key=e),ao.debug("migrated pending",X,"\u2192",e))}function Zi(e){let t=qt();if(I.get(t)&&uc.store.replacePending===!1)return;I.set(t,{text:e,at:Date.now()}),M={key:t,text:e,turns:mc(),ticks:3};let o=D();o&&he(o,""),Be(),ao.debug("queued",t,e.length)}function zf(e){I.delete(e),P===e&&(P=""),M?.key===e&&(M=null),Be()}function Gf(){J=!0,clearTimeout(ro),ro=setTimeout(()=>{J=!1,ro=void 0},qf)}function Kf(){let e=qt(),t=I.get(e);if(!t)return;let n=D();if(!n)return;I.delete(e),P="",Be(),Gf(),he(n,t.text);let o=be();o&&!C(o)&&!Hn(o)&&(o.click(),J=!1)}function dc(e){if(!ve||De||H()||qt()!==e)return;let t=I.get(e);if(!t){P="";return}if(U())return;let n=D();if(!n)return;if(!Pe(n)){let r=jt(F(n));if(r&&r!==t.text)return}let o=be();!o||C(o)||Hn(o)||(De=!0,he(n,t.text),clearTimeout(io),io=setTimeout(()=>Uf(e,t.text),_f))}function Uf(e,t){io=void 0;try{if(!ve)return;let n=I.get(e);if(!n||n.text!==t||H()||qt()!==e)return;let o=D();if(!o)return;let r=jt(F(o));if(r&&r!==t&&!Pe(o))return;r!==t&&he(o,t);let i=be();if(!i||C(i)||Hn(i))return;i.click(),I.delete(e),P="",Be(),ao.debug("drained",e)}finally{De=!1}}function fc(e){let t=ne();if(!t||t===document.body){e.style.left="50%",e.style.bottom="6.5rem";return}let n=t.getBoundingClientRect();e.style.left=`${Math.round(n.left+n.width/2)}px`,e.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`;let o=Math.min(512,Math.max(160,n.width-24));e.style.maxWidth=`${Math.round(o)}px`}function Yi(){_t?.remove(),_t=null}function Be(){if(!ve||!document.body){Yi();return}let e=qt(),t=I.get(e);if(!t){Yi();return}let n=_t;n?.isConnected||(n=document.createElement("div"),n.id=Xi,document.body.appendChild(n),_t=n),n.replaceChildren();let o=document.createElement("span");o.className="bloom-pq-kicker",o.textContent="Next";let r=document.createElement("span");r.className="bloom-pq-text";let i=t.text.length>sc?`${t.text.slice(0,sc)}\u2026`:t.text;r.textContent=i,r.title=t.text;let a=document.createElement("div");a.className="bloom-pq-actions";let s=document.createElement("button");s.type="button",s.className="bloom-pq-btn bloom-pq-send",s.textContent="Send now",s.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),Kf()});let l=document.createElement("button");l.type="button",l.className="bloom-pq-btn bloom-pq-x",l.setAttribute("aria-label","Dismiss queued prompt"),l.textContent="\xD7",l.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),zf(e)}),a.append(s,l),n.append(o,r,a),fc(n)}function Vf(){if(!M)return;if(M.ticks-=1,I.get(M.key)&&mc()>M.turns){let t=jf();if(t&&t===M.text){ao.debug("native send leaked; dropping pending"),I.delete(M.key),P===M.key&&(P=""),M=null,Be();return}}M.ticks<=0&&(M=null)}function Wf(e){if(!ve||e.isComposing||e.keyCode===229||e.key!=="Enter"||e.shiftKey||e.ctrlKey||e.metaKey||De)return;let t=lc(e.target)??lc(document.activeElement);if(!t||!H())return;if(e.altKey||J){J=!1;return}if(!oe(t))return;let n=jt(F(t));n&&(Ji(e),Zi(n))}function Yf(e){let t=e.closest("button");if(!(t instanceof HTMLElement)||C(t))return null;let n=e.closest(Et);if(n instanceof HTMLElement&&!C(n))return n;let o=be();return o&&(t===o||o.contains(t)||t.contains(o))?o:null}function Xf(e){if(!ve)return;let t=e.target;if(!(t instanceof Element)||t.closest(`#${Xi}`))return;let n=t.closest("button");if(n instanceof HTMLElement&&C(n)||De||!H()||!Yf(t))return;if(J){J=!1;return}let o=D();if(!o||!oe(o))return;let r=jt(F(o));r&&(Ji(e),Zi(r))}function Jf(e){if(!ve)return;let t=e.target;if(!(t instanceof HTMLFormElement)||!t.matches(nr)&&!t.querySelector(te)||De||!H())return;if(J){J=!1;return}let n=D()??t.querySelector(te);if(!n||!oe(n))return;let o=jt(F(n));o&&(Ji(e),Zi(o))}var pc=p({name:"PromptQueue",description:"Queue the next prompt while a reply is streaming. Enter/Send waits for this turn instead of interrupting.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:ac,cleanupSelectors:[`#${Xi}`],settings:uc,start(){ve=!0,X=qt(),P="",De=!1,J=!1,M=null,E(ac,ic),oo?.abort(),oo=new AbortController;let{signal:e}=oo;window.addEventListener("keydown",Wf,{capture:!0,signal:e}),document.addEventListener("click",Xf,{capture:!0,signal:e}),document.addEventListener("submit",Jf,{capture:!0,signal:e}),Tr?.(),Tr=se({onFall(t){if(ve){if(t.userStopped||t.error){P="",Be();return}P=t.contextKey,dc(t.contextKey)}},onContext(t){cc(t),X=t,Be()},onTick(t){cc(t.contextKey),X=t.contextKey,Vf(),P&&P===t.contextKey&&dc(P),_t&&fc(_t)}}),Be(),ao.debug("watch started")},stop(){ve=!1,Tr?.(),Tr=null,oo?.abort(),oo=null,clearTimeout(io),io=void 0,clearTimeout(ro),ro=void 0,I.clear(),M=null,P="",De=!1,J=!1,Yi()}});var gc=`.bloom-cls {
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
`;var yc=new v("ChatListStatus"),bc="chatListStatus",Cr="bloom-cls",Qf="bloom-cls",ep=1200*1e3,tp="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",ue=new Map,Ee=!1,Ft="",xe=!1,Gt=0,$e=null,ta=null,zt=null,Qi=null,Lr=null,Kt=!1,Ut=new Set;function kr(){return Date.now()}function vc(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function ot(e,t,n,o=!0){if(!(!e||!Ee)){if(t==="idle")ue.delete(e);else{let r=ue.get(e);r&&r.kind===t&&n!=="net"?r.at=kr():ue.set(e,{kind:t,at:kr(),source:n})}o&&np({v:1,id:e,kind:t,at:kr()}),so()}}function np(e){try{zt?.postMessage(e)}catch{}}function op(e){let t=e.data;!t||t.v!==1||!t.id||t.kind!=="streaming"&&t.kind!=="done"&&t.kind!=="error"&&t.kind!=="idle"||ot(t.id,t.kind,"bc",!1)}function rp(){let e=kr();for(let[t,n]of ue)n.kind==="streaming"&&e-n.at>ep&&ue.delete(t)}function ip(){let e=vc();if(!e)return[];let t=[],n=new Set;try{for(let o of e.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(o.closest(tp))continue;let r=St(o.getAttribute("href")||"");!r||n.has(r)||(n.add(r),t.push(o))}}catch{}return t}function hc(e){let t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),e==="streaming")t.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("cx","12"),o.setAttribute("cy","12"),o.setAttribute("r","9"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","2"),t.appendChild(o)}return t.appendChild(n),t}function ea(e){let t=e.querySelector(`:scope > .${Cr}`);return t||null}function ap(){if(!Ee)return;rp();let e=L(),t=ip();$e?.disconnect();try{for(let n of t){let o=St(n.getAttribute("href")||"");if(!o||!e||o!==e){ea(n)?.remove();continue}let i=ue.get(o)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){ea(n)?.remove();continue}let a=ea(n);a||(a=document.createElement("span"),a.className=Cr,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(hc("streaming")):i==="error"&&a.appendChild(hc("error")))}}catch(n){yc.debug("paint failed",n)}xc()}function so(){!Ee||Gt||(Gt=requestAnimationFrame(()=>{Gt=0,Ee&&ap()}))}function xc(){let e=vc();if(!($e&&ta===e&&e?.isConnected)){if($e?.disconnect(),ta=e,!e){$e=null;return}$e=new MutationObserver(()=>so()),$e.observe(e,{childList:!0,subtree:!0})}}function na(){return!!(Ve()||qn())}function sp(e){return!!(Kt||e&&Ut.has(e)||na())}function lp(e){if(Ee){if(e.type==="post-start"){e.conversationId?(Kt=!1,Ut.add(e.conversationId),xe=!0,ot(e.conversationId,"streaming","net")):(Kt=!0,xe=!0);return}e.type==="post-end"&&(Kt=!1,e.conversationId&&(Ut.delete(e.conversationId),ot(e.conversationId,e.error?"error":"done","net")),na()||(xe=!1))}}function cp(){if(!Ee)return;let e=L();if(!(Kt||e&&Ut.has(e))){if(xe=!1,e&&ue.get(e)?.kind==="streaming"&&ue.get(e)?.source==="local"){ot(e,"idle","local");return}so()}}function dp(e){if(!Ee)return;let t=e.conversationId||L();if(Ft&&t&&Ft!==t){let o=ue.get(Ft);o?.kind==="streaming"&&o.source==="local"&&ot(Ft,U()?"error":"done","local"),xe=!!(t&&Ut.has(t))}if(Ft=t,sp(t)&&(e.streaming||na())){xe=!0,t&&ot(t,"streaming","local"),so();return}xe&&(xe=!1,t&&ot(t,U()?"error":"done","local")),so()}var Ec=p({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Cr}`],start(){Ee=!0,E(bc,gc);try{zt=new BroadcastChannel(Qf)}catch{zt=null}zt?.addEventListener("message",op),Qi=z(lp),Lr?.(),Lr=se({onTick:dp,onContext:cp}),xc(),yc.debug("sidebar status watch started")},stop(){Ee=!1,Gt&&cancelAnimationFrame(Gt),Gt=0,$e?.disconnect(),$e=null,ta=null,Lr?.(),Lr=null,Qi?.(),Qi=null;try{zt?.close()}catch{}zt=null,ue.clear(),Ut.clear(),Kt=!1,xe=!1,Ft="",document.querySelectorAll(`.${Cr}`).forEach(e=>e.remove()),y(bc)}});var Sc="widerChat",Tc=40,Lc=96,kc=64,Cc=x({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:Tc,max:Lc,default:kc}});function up(){return pe(Number(Cc.store.width??kc),Tc,Lc)}function wc(){let e=up(),t=`min(100%,${e}rem)`;E(Sc,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important;--user-chat-width:${e}rem!important;--composer-container-max-width:${e}rem!important;--thread-xl-max-width:${e}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${t}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${t}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${t}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${t}!important}`)}var Mc=p({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[h.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Cc,start:wc,onSettingsChange:wc,stop(){y(Sc)}});var oa="composerOpacity",Vt='form[data-type="unified-composer"],form.w-full[data-type]',mp=[`${Vt} [class*="corner-superellipse"]`,`${Vt} [class*="bg-token-bg-primary"]`,`${Vt} [class*="bg-token-main-surface"]`].join(","),fp=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),pp="#thread-bottom-container,#thread-bottom",gp=`${Vt} #prompt-textarea,${Vt} [contenteditable="true"]`,bp="var(--bg-primary,var(--main-surface-primary,#ffffff))",ra=x({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function hp(){return pe(Number(ra.store.opacity??100),0,100)}function yp(){return pe(Number(ra.store.blur??16),0,40)}function Ac(){let e=hp();if(e>=100){y(oa);return}let t=yp(),n=`color-mix(in srgb,${bp} ${e}%,transparent)`,o=t>0?`-webkit-backdrop-filter:blur(${t}px)!important;backdrop-filter:blur(${t}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";E(oa,`${pp}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${fp}{display:none!important}${Vt}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${mp}{background-color:${n}!important;background-image:none!important;${o}}${gp}{background-color:transparent!important;background-image:none!important}`)}var Hc=p({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[h.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:ra,start:Ac,onSettingsChange:Ac,stop(){y(oa)}});var Nc=`#bloom-bn-host {
    position: fixed;
    z-index: 4200;
    width: 18px;
    box-sizing: border-box;
    pointer-events: none;
    transform: translateY(-50%);
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
    justify-content: center;
    align-items: flex-end;
    gap: 4px;
    width: 18px;
    max-height: var(--bloom-bn-cap, min(70vh, 28rem));
    padding: 8px 0;
    box-sizing: border-box;
    overflow: hidden;
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

.bloom-bn-dense {
    gap: 2px;
}

.bloom-bn-dense .bloom-bn-tick {
    height: 4px;
}

.bloom-bn-dense .bloom-bn-tick::after {
    height: 1px;
}

.bloom-bn-tick-live::after {
    height: 0;
    background: none;
    border-radius: 0;
    border-top: 1px dashed var(--text-tertiary, #8f8f8f);
    opacity: 0.7;
}

.bloom-bn-tick-live.bloom-bn-current::after {
    height: 0;
    background: none;
    border-top-color: var(--text-primary, #0d0d0d);
    opacity: 1;
}

.bloom-bn-dense .bloom-bn-tick-live::after {
    height: 0;
    background: none;
}

.bloom-bn-menu {
    position: absolute;
    top: 50%;
    right: 100%;
    display: flex;
    flex-direction: column;
    width: min(16.5rem, calc(100vw - 4rem));
    max-height: min(70vh, 28rem, var(--bloom-bn-cap, 28rem));
    padding: 8px 10px 8px 0;
    box-sizing: border-box;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translate(6px, -50%);
    transition: opacity 0.12s ease, transform 0.12s ease, visibility 0s linear 0.12s;
}

#bloom-bn-host:hover .bloom-bn-menu,
#bloom-bn-host:focus-within .bloom-bn-menu {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translate(0, -50%);
    transition-delay: 0s;
}

.bloom-bn-card {
    display: flex;
    flex-direction: column;
    min-height: 0;
    max-height: inherit;
    overflow: hidden;
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
        transform: translate(0, -50%);
    }
    #bloom-bn-host:hover .bloom-bn-menu,
    #bloom-bn-host:focus-within .bloom-bn-menu {
        transform: translate(0, -50%);
    }
    .bloom-bn-flash {
        outline-width: 1px;
    }
    .bloom-bn-tick::after {
        transition: none;
    }
}
`;var xp=new v("BetterNavigator"),ia="betterNavigator",Rc="bloom-bn-host",la=60,Ep=16,wp=1e3,Sp=2.5,Tp=.4,Ar="\u6B63\u5728\u8F93\u51FA\u2026",Lp=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),kp=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='thinking']","[class*='reasoning']","[class*='footnote']",".sr-only"].join(", "),Cp=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),Ir=x({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),Wt=new Map,Yt=new Set,me=!1,at=!1,_e=null,fo=null,st=null,Hr=null,O=[],lt="",Nr=0,Rr=-1,fa=0,Pr="",Xt=0,Jt=0,lo,co=null,Mr=null,aa=null,sa=null,rt=null,ca=null,uo=null,it=null,Zt=null,mo=null;function Or(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function Mp(e){try{return!!e.closest(Lp)}catch{return!0}}function Ap(e){let t=(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||e.getAttribute("data-turn")||"").toLowerCase();if(t==="user"||t==="assistant")return t;let n=(e.getAttribute("aria-label")||"").toLowerCase();return n.includes("you said")?"user":n.includes("chatgpt said")||n.includes("assistant said")?"assistant":null}function Pc(e){let t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode(r){let i=r.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(i.closest(kp))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return(r.textContent||"").replace(/\s+/g," ").trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),o;for(;(o=n.nextNode())&&t.join(" ").length<la+20;)t.push((o.textContent||"").replace(/\s+/g," ").trim());return t.join(" ").replace(/\s+/g," ").trim()}function Hp(e,t){try{if(e.querySelector("img, picture, video, canvas"))return"Image";if(e.querySelector("a[download], [class*='attachment']"))return"File";if(e.querySelector("pre, code"))return"Code"}catch{}return`Message ${t+1}`}function Np(e,t){let n=t==="user"?e.querySelector(".whitespace-pre-wrap")??e:e.querySelector(".markdown")??e;return Pc(n)}function Rp(e){return e.length>la?`${e.slice(0,la).trimEnd()}\u2026`:e}function Pp(e,t,n,o){let r=Np(e,t);return r?Rp(r):o?Ar:Hp(e,n)}function Ip(){if(at)return!0;let e=L();return!!(e&&Yt.has(e)||Ve()||qn())}function Op(e){try{if(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")||e.querySelector("[aria-busy='true'], .result-streaming"))return!0;let t=e.querySelector(".markdown");if((!t||t instanceof HTMLElement&&!Pc(t))&&e.querySelector("[class*='thinking'], [class*='reasoning'], details"))return!0}catch{}return!1}function Bp(){let e=Or();if(!e||e===document.body)return[];let t=Ir.store.showAssistant!==!1,n=t&&Ip(),o=[];try{for(let r of e.querySelectorAll("[data-message-id]")){if(Mp(r))continue;let i=r.getAttribute("data-message-id")||"";if(!i)continue;let a=Ap(r);if(a!=="user"&&a!=="assistant"||a==="assistant"&&!t)continue;let s=a==="assistant"&&n&&Op(r),l=Pp(r,a,o.length,s);l&&l!==Ar&&l!==Wt.get(i)&&Wt.set(i,l);let c=s&&l===Ar?Ar:Wt.get(i)||l;o.push({id:i,el:r,role:a,text:c,live:s})}}catch{}return o}function Dp(){let t=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(t,48),88)}function Ic(e){let t=e;for(;t&&t!==document.body&&t!==document.documentElement;){let o=getComputedStyle(t).overflowY;if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight+8)return t;t=t.parentElement}return window}function $p(e){return e===window?window.innerHeight:e.clientHeight}function _p(e){let t=e instanceof Element?e:e instanceof Node?e.parentElement:null;if(!t)return!1;try{return!!t.closest(Cp)}catch{return!1}}function Oc(){lo!==void 0&&(clearTimeout(lo),lo=void 0),co?.classList.remove("bloom-bn-flash"),co=null}function qp(e){Oc(),e.classList.add("bloom-bn-flash"),co=e,lo=setTimeout(()=>{e.classList.remove("bloom-bn-flash"),co===e&&(co=null),lo=void 0},800)}function da(e){if(!O.length)return;let t=Math.max(0,Math.min(e,O.length-1));Nr=t,fo?.querySelectorAll(".bloom-bn-tick").forEach((o,r)=>{o.classList.toggle("bloom-bn-current",r===t)}),st?.querySelectorAll(".bloom-bn-item").forEach((o,r)=>{o.classList.toggle("bloom-bn-active",r===t)}),Hr&&(Hr.textContent=`${t+1} / ${O.length}`);let n=st?.children[t];if(n instanceof HTMLElement){let o=st;if(o){let r=n.offsetTop-o.clientHeight/2+n.offsetHeight/2;o.scrollTop=Math.max(0,r)}}}function ua(e){let t=O[e];if(!t?.el.isConnected)return;Rr=e,fa=Date.now()+wp,da(e);let n=Zt??Ic(t.el),r=Math.abs(t.el.getBoundingClientRect().top-Dp())>Sp*$p(n);t.el.scrollIntoView({behavior:r?"auto":"smooth",block:"start"}),Ir.store.jumpEffect!=="none"&&qp(t.el)}function pa(){if(!me||!O.length)return;if(Date.now()<fa&&Rr>=0){da(Rr);return}let e=window.innerHeight*Tp,t=0;for(let n=0;n<O.length;n++){let o=O[n].el;o.isConnected&&o.getBoundingClientRect().top<=e&&(t=n)}da(t)}function jp(e){let t=Ic(e);if(Zt===t&&mo)return;mo?.(),Zt=t;let n=t===window?document:t,o=()=>{pa(),ga()};n.addEventListener("scroll",o,{passive:!0}),mo=()=>n.removeEventListener("scroll",o)}function Fp(e){it?.disconnect(),it=null;let t=Zt instanceof HTMLElement?Zt:null;it=new IntersectionObserver(()=>pa(),{root:t,threshold:[0,.15,.4,.75,1]});for(let n of e)n.el.isConnected&&it.observe(n.el)}function zp(){if(!document.body)return null;let e=_e;if(e?.isConnected)return e;e=document.createElement("div"),e.id=Rc,e.className="bloom-bn-host",e.setAttribute("role","navigation"),e.setAttribute("aria-label","Conversation outline"),e.hidden=!0;let t=document.createElement("div");t.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let o=document.createElement("div");o.className="bloom-bn-card";let r=document.createElement("div");r.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",o.append(r,i),n.appendChild(o),e.append(t,n),document.body.appendChild(e),_e=e,fo=t,st=i,Hr=r,e}function Bc(){let e=_e,t=Or();if(!e||!t||!t.isConnected||O.length<1){e&&(e.hidden=!0);return}let n=t.getBoundingClientRect(),o=document.getElementById("thread-bottom-container"),r=document.getElementById("page-header"),i=Math.max(n.top+8,r?.getBoundingClientRect().bottom??0,8),a=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),s=a-i;if(s<96||n.width<160){e.hidden=!0;return}let l=window.innerWidth-n.right,c=l>=22?Math.max(8,l-16):8;e.hidden=!1,e.style.top=`${Math.round((i+a)/2)}px`,e.style.height="auto",e.style.maxHeight=`${Math.round(s)}px`,e.style.right=`${Math.round(c)}px`,e.style.setProperty("--bloom-bn-cap",`${Math.round(s)}px`)}function ga(){!me||Jt||(Jt=requestAnimationFrame(()=>{Jt=0,me&&Bc()}))}function Gp(e){let t=["bloom-bn-tick"];return e.role==="assistant"&&t.push("bloom-bn-tick-asst"),e.live&&t.push("bloom-bn-tick-live"),t.join(" ")}function Kp(e){let t=fo,n=st;!t||!n||(t.replaceChildren(),n.replaceChildren(),t.classList.toggle("bloom-bn-dense",e.length>Ep),e.forEach((o,r)=>{let i=document.createElement("button");i.type="button",i.className=Gp(o),i.setAttribute("aria-label",`Go to message ${r+1} of ${e.length}`),i.addEventListener("click",c=>{c.preventDefault(),ua(r)}),t.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${o.role}`;let s=document.createElement("span");s.className="bloom-bn-mark",s.textContent=o.role==="user"?"You":"GPT";let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=o.text,l.title=o.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),ua(r)}),n.appendChild(a)}))}function Up(e){fo?.querySelectorAll(".bloom-bn-tick").forEach((t,n)=>{t.classList.toggle("bloom-bn-tick-live",!!e[n]?.live)}),e.forEach((t,n)=>{let r=st?.children[n]?.querySelector(".bloom-bn-label");r&&r.textContent!==t.text&&(r.textContent=t.text,r instanceof HTMLElement&&(r.title=t.text))})}function Vp(){let e=L();return e===Pr?!1:(Pr=e,Wt.clear(),O=[],lt="",Nr=0,Rr=-1,fa=0,at&&e&&(Yt.add(e),at=!1),!0)}function Wp(e){let t=Ir.store.showAssistant!==!1?"1":"0";return`${Pr}|${t}|${e.map(n=>n.id).join(",")}`}function Yp(){if(!me)return;Vp();let e=Bp(),t=Or();if(!t||e.length<1){O=e,lt="",_e&&(_e.hidden=!0),it?.disconnect(),ma();return}zp();let n=Wp(e);n!==lt?(O=e,lt=n,Kp(e),jp(t),Fp(e)):(O=e,Up(e)),Bc(),pa(),ma()}function we(){!me||Xt||(Xt=requestAnimationFrame(()=>{Xt=0,me&&Yp()}))}function ma(){let e=Or();if(!(rt&&ca===e&&e?.isConnected)){if(rt?.disconnect(),uo?.disconnect(),ca=e,!e||e===document.body){rt=null;return}rt=new MutationObserver(()=>we()),rt.observe(e,{childList:!0,subtree:!0}),uo=new ResizeObserver(()=>ga()),uo.observe(e)}}function Xp(e){if(me){if(e.type==="post-start"){e.conversationId?(at=!1,Yt.add(e.conversationId)):at=!0,we();return}if(e.type==="post-end"){if(at=!1,e.conversationId)Yt.delete(e.conversationId);else{let t=L();t&&Yt.delete(t)}we()}}}function Jp(e){if(!me||!O.length||_e?.hidden||e.altKey||e.ctrlKey||e.metaKey||_p(e.target))return;let t=-1;if(e.key==="ArrowDown")t=Nr+1;else if(e.key==="ArrowUp")t=Nr-1;else if(e.key==="Home")t=0;else if(e.key==="End")t=O.length-1;else if(e.key==="Escape"){document.activeElement?.blur?.();return}else return;e.preventDefault(),ua(Math.max(0,Math.min(t,O.length-1)))}function Zp(){Oc(),it?.disconnect(),it=null,rt?.disconnect(),rt=null,ca=null,uo?.disconnect(),uo=null,mo?.(),mo=null,Zt=null,_e?.remove(),_e=null,fo=null,st=null,Hr=null}var Dc=p({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:ia,cleanupSelectors:[`#${Rc}`],settings:Ir,start(){me=!0,Pr=L(),E(ia,Nc),Mr=new AbortController;let{signal:e}=Mr;window.addEventListener("keydown",Jp,{signal:e}),window.addEventListener("popstate",we,{signal:e}),window.visualViewport?.addEventListener("resize",ga,{signal:e}),sa=z(Xp),aa=se({onTick(){we()},onFall(){we()},onContext(){Wt.clear(),lt="",we()}}),ma(),we(),xp.debug("navigator started")},stop(){me=!1,Xt&&cancelAnimationFrame(Xt),Xt=0,Jt&&cancelAnimationFrame(Jt),Jt=0,Mr?.abort(),Mr=null,aa?.(),aa=null,sa?.(),sa=null,Yt.clear(),at=!1,Zp(),Wt.clear(),O=[],lt="",y(ia)},onSettingsChange(){lt="",we()}});var $c=`.bloom-ts {
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
`;function _c(e,t,n=Date.now()){let o=new Date(e);if(Number.isNaN(o.getTime()))return"";let r=new Date(n),i=o.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(o.toDateString()===r.toDateString()||!t)return i;let s=o.getFullYear()===r.getFullYear();return`${o.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function qc(e){try{return new Date(e).toISOString()}catch{return""}}var Gc=new v("MessageTimestamps"),jc="messageTimestamps",Br="bloom-ts",Fc=1500,eg="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",tn=x({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),nn=new Map,on=!1,en=0,Qt,qe=null,ha=null,ba=null,zc=!1;function Kc(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function ya(){let e=tn.plain.stamps;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Uc(){let e={...ya()};for(let[n,o]of nn)e[n]=o;let t=Object.keys(e);if(t.length>Fc){let n=t.slice(t.length-Fc),o={};for(let r of n)o[r]=e[r];tn.store.stamps=o;return}tn.store.stamps=e}var tg=_a(Uc,500);function Vc(e,t){!e||!t||nn.get(e)===t||(nn.set(e,t),tg(),po())}function ng(e){return e?nn.get(e)??ya()[e]??lr(e)??null:null}function og(e){on&&e.type==="message-time"&&Vc(e.messageId,e.createTime)}function rg(e){return(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function ig(){let e=Kc();if(!e)return[];let t=[];try{for(let n of e.querySelectorAll("[data-message-id]"))n.closest(eg)||t.push(n)}catch{}return t}function ag(e){try{return!!e.querySelector("time:not(.bloom-ts)")}catch{return!1}}function sg(){if(!on)return;let e=tn.store.hideOwnMessages===!0,t=tn.store.showDate!==!1,n=H(),o=ig();qe?.disconnect();try{o.forEach((r,i)=>{let a=r.getAttribute("data-message-id")||"",s=rg(r),l=r.querySelector(`:scope > .${Br}`);if(e&&s==="user"){l?.remove();return}if(ag(r)){l?.remove();return}let c=ng(a);if(!c&&a&&(n||zc)&&i>=o.length-2&&(c=Date.now(),Vc(a,c)),!c){l?.remove();return}let d=_c(c,t);if(!d){l?.remove();return}let u=l;u||(u=document.createElement("time"),u.className=Br,u.setAttribute("aria-hidden","true"),r.insertBefore(u,r.firstChild)),u.textContent!==d&&(u.textContent=d);let m=qc(c);m&&u.getAttribute("datetime")!==m&&u.setAttribute("datetime",m)})}catch(r){Gc.debug("paint failed",r)}zc=n,Wc()}function po(){!on||en||(en=requestAnimationFrame(()=>{en=0,on&&sg()}))}function Wc(){let e=Kc();if(!(qe&&ha===e&&e?.isConnected)){if(qe?.disconnect(),ha=e,!e||e===document.body){qe=null;return}qe=new MutationObserver(()=>po()),qe.observe(e,{childList:!0,subtree:!0})}}var Yc=p({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Br}`],settings:tn,start(){on=!0,E(jc,$c);let e=ya();for(let[t,n]of Object.entries(e))typeof n=="number"&&n>0&&nn.set(t,n);ba=z(og),Wc(),Qt!==void 0&&clearInterval(Qt),Qt=setInterval(po,800),po(),Gc.debug("timestamp watch started")},stop(){on=!1,en&&cancelAnimationFrame(en),en=0,Qt!==void 0&&(clearInterval(Qt),Qt=void 0),qe?.disconnect(),qe=null,ha=null,ba?.(),ba=null,Uc(),nn.clear(),document.querySelectorAll(`.${Br}`).forEach(e=>e.remove()),y(jc)},onSettingsChange:po});var va="streamerMode",lg="filter:blur(6px)!important;transition:filter .2s ease",cg="filter:none!important",go=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],rn=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function Z(e,t){return e.map(n=>`${n} ${t}`)}var ct=x({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function an(e,t=!0){let n=e.join(","),o=e.map(r=>`${r}:hover`).join(",");return`${n}{${lg}}${t?`${o}{${cg}}`:""}`}function Xc(){let e=[];if(ct.store.conversations!==!1&&(e.push(an([...Z(rn,'a[href^="/c/"]'),...Z(rn,'a[href*="/c/"]')])),e.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),ct.store.projects!==!1&&(e.push(an([...Z(rn,'a[href*="/project"]'),...Z(rn,'a[href*="/g/g-p-"]'),...Z(rn,'[data-testid="project-name"]'),...Z(rn,'[data-testid="project-link"]')])),e.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),ct.store.headerTitle!==!1&&e.push(an(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),ct.store.accountAvatar!==!1&&e.push(an([...Z(go,"img"),...Z(go,'[class*="avatar"]')],!1)),ct.store.accountName!==!1&&e.push(an([...Z(go,".min-w-0 > .truncate"),...Z(go,".min-w-0.flex-1 .truncate")],!1)),ct.store.accountEmail!==!1&&e.push(an([...Z(go,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),e.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),e.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!e.length){y(va);return}E(va,e.join(`
`))}var Jc=p({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[h.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:ct,start:Xc,onSettingsChange:Xc,stop(){y(va)}});var Zc=`.bloom-gc-panel {
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
}`;var ug=new v("GreetingCustomizer"),sn="greetingCustomizer",Qc="greetingCustomizerUi",bo=100,Ea=30,mg=120,fg=1e3,pg=50,gg=40,bg=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),ho=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),jr=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function hg(e){return!!e?.closest(bg)}function od(e){return!!(hg(e)||e.closest('[data-testid="temporary-chat-label"]')||e.closest("[hidden]")||e.getAttribute("aria-hidden")==="true"||e.classList.contains("sr-only"))}function To(e){try{for(let t of document.querySelectorAll(e))if(!od(t))return t}catch{}return null}function xa(e){for(let t of e.split(",").map(n=>n.trim()).filter(Boolean))if(To(t))return t;return e}var rd=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],B=x({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:Pg},greetings:{type:0,description:"Greeting texts",hidden:!0,default:rd},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),fe=!1,dn=!1,ut=null,$r,yo,ln,vo,_r=0,Dr=null,cn=null,xo=null,Eo=null,wo=null,qr=null;function Te(){let e=location.pathname||"/";return e==="/"||e===""}function dt(){let e=B.plain.greetings;return Array.isArray(e)?e.filter(t=>typeof t=="string"):rd.slice()}function So(e){return String(e??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function ed(e){B.store.greetings=e.slice(0,Ea)}function Lo(){let e=String(B.store.mode??"refresh");return e==="interval"||e==="manual"?e:"refresh"}function yg(){return B.store.order==="random"?"random":"sequential"}function vg(){return pe(Number(B.store.intervalSec??10),1,3600)*1e3}function xg(e){return String(e??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Eg(){return!!To(jr)}function Fr(){return!!(To(jr)||To(ho))}function wg(e,t){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),o=[`content:"${e}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),r=Eg()?xa(jr):To(ho)?xa(ho):xa(jr),i=t?`${ho}{cursor:pointer!important;user-select:none!important}`:"";return[`${r}{${n}}`,`${r}::before{${o}}`,i,`@media (max-width:768px){${r}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function Sg(e,t){if(e<=0)return 0;if(e===1)return Number(B.plain.index)!==0&&(B.store.index=0),Number(B.plain.lastRandom)!==0&&(B.store.lastRandom=0),0;let n=Number(B.plain.index),o=Number(B.plain.lastRandom);if(!t)return n>=0&&n<e?n:0;if(yg()==="random"){let a=n>=0&&n<e?n:o,s=Math.floor(Math.random()*e),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*e);return B.store.index=s,B.store.lastRandom=s,s}let i=((n>=-1&&n<e?n:-1)+1)%e;return B.store.index=i,i}function Se(e){if(!fe)return;if(!Te()){y(sn);return}let t=dt().map(So).filter(Boolean);if(!t.length){y(sn);return}let n=Sg(t.length,e),o=t[n]??t[0],r=Lo()==="manual"&&t.length>1;E(sn,wg(xg(o),r)),qr?.()}function wa(){$r!==void 0&&(clearInterval($r),$r=void 0)}function Sa(){wa(),!(!fe||!Te())&&Lo()==="interval"&&(dt().filter(Boolean).length<=1||($r=setInterval(()=>Se(!0),vg())))}function Ta(){vo!==void 0&&(clearTimeout(vo),vo=void 0),_r=0}function td(){if(Ta(),!fe||!Te())return;_r=gg;let e=()=>{if(vo=void 0,!(!fe||!Te())){if(Fr()){Lo()==="refresh"&&!dn?(dn=!0,Se(!0)):Se(!1),Sa();return}_r-=1,_r>0&&(vo=setTimeout(e,pg))}};e()}function La(){if(ut===!0){Fr()?Se(!1):td();return}ut=!0,dn=!1,Lo()==="refresh"?(dn=!0,Se(!0)):Se(!1),Sa(),Fr()||td()}function ka(){ut=!1,dn=!1,wa(),Ta(),y(sn)}function zr(){ln===void 0&&(ln=window.setTimeout(()=>{ln=void 0,fe&&(Te()?La():ut!==!1&&ka())},mg))}function Tg(){cn||(cn=history.pushState.bind(history),xo=history.replaceState.bind(history),Eo=function(...t){let n=cn(...t);return zr(),n},wo=function(...t){let n=xo(...t);return zr(),n},history.pushState=Eo,history.replaceState=wo)}function Lg(){Eo&&history.pushState===Eo&&cn&&(history.pushState=cn),wo&&history.replaceState===wo&&xo&&(history.replaceState=xo),cn=null,xo=null,Eo=null,wo=null}function kg(e){let t=e.target instanceof Element?e.target:null;t&&t.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(zr)}function Cg(e){if(!fe||!Te()||Lo()!=="manual"||dt().filter(Boolean).length<=1)return;let t=e.target instanceof Element?e.target:null;if(!t)return;let n=t.closest(ho);if(!n||od(n))return;let o=window.getSelection?.();o&&String(o).trim()||Se(!0)}function Mg(){yo===void 0&&(yo=setInterval(()=>{if(!fe)return;let e=Te();if(e!==(ut===!0)){e?La():ka();return}e&&Fr()&&Se(!1)},fg))}function Ag(){yo!==void 0&&(clearInterval(yo),yo=void 0)}function nd(e,t){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=e,n.setAttribute("aria-label",e);let o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.75"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),o.setAttribute("aria-hidden","true");for(let r of t.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",r),o.appendChild(i)}return n.appendChild(o),n}var Hg="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",Ng="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function Rg(e,t){let n=So(e);return n?n.length>bo?`Keep it to ${bo} characters.`:dt().length+(t?1:0)>Ea?`At most ${Ea} greetings.`:null:"Enter a greeting."}function Pg(e){e.className="bloom-gc-panel";let t="",n=-1,o="",r=-1,i=()=>{let a=dt(),s=Number(B.plain.index);e.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=bo,c.placeholder="New greeting (line breaks ok)",c.value=t,c.addEventListener("input",()=>{t=c.value,o="";let f=l.querySelector(".bloom-gc-count");f&&(f.textContent=`${So(t).length}/${bo}`);let T=l.querySelector(".bloom-gc-error");T&&(T.textContent="")}),l.appendChild(c);let d=document.createElement("div");d.className="bloom-gc-meta";let u=document.createElement("span");u.className="bloom-gc-count",u.textContent=`${So(t).length}/${bo}`;let m=document.createElement("span");m.className="bloom-gc-error",m.textContent=o;let S=document.createElement("div");if(S.className="bloom-gc-actions",n>=0){let f=document.createElement("button");f.type="button",f.className="bloom-gc-btn",f.textContent="Cancel",f.addEventListener("click",()=>{n=-1,t="",o="",i()}),S.appendChild(f)}let w=document.createElement("button");if(w.type="button",w.className="bloom-gc-btn bloom-gc-btn-primary",w.textContent=n>=0?"Update":"Add",w.addEventListener("click",()=>{let f=n<0,T=Rg(t,f);if(T){o=T,i();return}let $=So(t),j=dt().slice();n>=0&&n<j.length?j[n]=$:j.push($),ed(j),n=-1,t="",o="",i()}),S.appendChild(w),d.append(u,m,S),l.appendChild(d),e.appendChild(l),!a.length){let f=document.createElement("p");f.className="bloom-gc-empty",f.textContent="No greetings. The official heading stays.",e.appendChild(f);return}let g=document.createElement("div");g.className="bloom-gc-list",a.forEach((f,T)=>{let $=document.createElement("div");$.className="bloom-gc-item",T===s&&($.dataset.active="true");let j=document.createElement("button");j.type="button",j.className=`bloom-gc-body${r===T?"":" bloom-gc-clamp"}`,j.textContent=f,j.addEventListener("click",()=>{r=r===T?-1:T,i()});let un=document.createElement("div");un.className="bloom-gc-item-actions";let mt=nd("Edit",Hg);mt.addEventListener("click",()=>{n=T,t=f,o="",i()});let Le=nd("Delete",Ng);Le.addEventListener("click",()=>{let mn=dt().filter((ft,je)=>je!==T);ed(mn),n===T?(n=-1,t=""):n>T&&(n-=1),i()}),un.append(mt,Le),$.append(j,un),g.appendChild($)}),e.appendChild(g)};return qr=i,i(),()=>{qr===i&&(qr=null),e.replaceChildren()}}var id=p({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[h.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Qc,settings:B,start(){fe=!0,E(Qc,Zc),Tg(),Dr=new AbortController;let{signal:e}=Dr;window.addEventListener("popstate",zr,{signal:e}),document.addEventListener("click",kg,{capture:!0,signal:e}),document.addEventListener("click",Cg,{signal:e}),Mg(),ut=null,Te()?La():ka(),ug.debug("started")},stop(){fe=!1,Dr?.abort(),Dr=null,ln!==void 0&&(clearTimeout(ln),ln=void 0),wa(),Ta(),Ag(),Lg(),y(sn),dn=!1,ut=null},onSettingsChange(){fe&&(Te()?(Se(!1),Sa()):y(sn))}});var ko=new v("Bloom"),ad=!1,Ig=Date.now(),Og=[Rs,yl,Cl,Hl,Ol,ql,Ql,tc,rc,pc,Ec,Mc,Hc,Dc,Yc,Jc,id];function Gr(e){return new Promise(t=>setTimeout(t,e))}function Bg(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var ld=8e3,sd=300,Dg=250;async function $g(){if(ze())return await Gr(sd),!0;for(;Date.now()-Ig<ld;)if(await Gr(Dg),ze())return await Gr(sd),!0;return ze()||Xr()}function Ca(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function _g(){if(Ca())return!0;let e=Date.now()+ld;for(;Date.now()<e;)if(await Gr(100),Ca())return!0;return Ca()}function qg(){try{GM_registerMenuCommand?.("Bloom++ settings",Ns)}catch{}}function jg(){Bo(()=>{gn("HostShell"),ko.info("host shell",G)}),Do(()=>{ko.info("idle ready",G)}),$o(()=>{Na(),gn("HostReady"),ko.info("chrome ready",G)})}async function Ma(){await qa()}async function Aa(){if(ad)return;ad=!0;for(let n of Og)try{Ya(n)}catch(o){ko.error("register failed",n.name,o)}Za(),gn("Init"),qg(),jg();let e=()=>gn("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await Bg(),_g().then(n=>{n&&_o()}),!await $g()){ko.warn("late islands not detected; starting default plugins",G),bt(),qo();return}await rs()}var cd=typeof unsafeWindow<"u"?unsafeWindow:window,Fg=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||Fg){let e=cd.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",G);try{Object.defineProperty(cd,"Bloom",{value:Ha,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}Ma().then(()=>Aa()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
