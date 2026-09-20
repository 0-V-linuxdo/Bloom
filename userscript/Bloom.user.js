// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260920] v1.4.53
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

/* Bloom++ [20260920] v1.4.53. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var pd=Object.defineProperty;var gd=(e,t)=>{for(var n in t)pd(e,n,{get:t[n],enumerable:!0})};var Ha={};gd(Ha,{REPO_URL:()=>is,Settings:()=>b,VERSION:()=>F,contextKeyFromUrl:()=>re,conversationTitle:()=>kt,conversationToken:()=>_,currentConversationId:()=>L,hasDraftText:()=>z,hasErrorToast:()=>W,hasLateIslands:()=>ze,init:()=>Aa,initSettings:()=>Ma,isDocumentInteractive:()=>as,isStreaming:()=>H,isUserDraftEmpty:()=>Pe,messageCreateTime:()=>dr,plugins:()=>te,requestChromeReady:()=>jo,requestIdleReady:()=>ht,requestShellReady:()=>qo,setEditorText:()=>be,subscribeHarvest:()=>K,watchStreamingEdge:()=>se,whenChromeReady:()=>_o,whenIdleReady:()=>$o,whenShellReady:()=>Do});var Le=new Map,Mo=!1;function bd(){return document.getElementById("bloom-root")?.shadowRoot??null}function Na(){return document.head??null}function gt(){let e=bd();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=hd()}function Ur(e,t){if(!Mo)return;let n=Na();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),gt();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,gt();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,gt()}function E(e,t){let n=Le.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},Le.set(e,n)),Mo&&Ur(e,n)}function Vr(){if(!Na())return!1;Mo=!0;for(let[t,n]of Le)Ur(t,n);return gt(),!0}function Pa(e){let t=Le.get(e);t&&(t.disabled=!1,Mo&&Ur(e,t))}function Ra(e){let t=Le.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),gt())}function y(e){let t=Le.get(e);t&&(t.el?.remove(),Le.delete(e),gt())}function hd(){return Array.from(Le.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var v=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function p(e){return e}var Wr=new Map;function Ao(e,t){let n=Wr.get(e);return n||(n=new Set,Wr.set(e,n)),n.add(t),()=>n.delete(t)}function Fe(e,t){let n=Wr.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var yd="bloompp";function Ia(){return new Promise((e,t)=>{let n=indexedDB.open(yd,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function Oa(e){try{let t=await Ia();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function Ba(e,t){try{let n=await Ia();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function bn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function pe(e,t,n){return Math.min(n,Math.max(t,e))}function Da(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function $a(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}function _a(e,t){let n;return((...o)=>{n&&clearTimeout(n),n=setTimeout(()=>e(...o),t)})}var Ho=new v("SettingsStore"),ke="BloomSettings",vd=100;function Po(e){if(bn(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(bn(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return bn(n)?n:null}return null}catch{return null}}var No=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,d]of this.defaultGetters)if(l.startsWith(c)){let u=l.slice(c.length+1);if(u&&!u.includes(".")){let m=d(u);m!==void 0&&(i[a]=m,s=m);break}}}return bn(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Ho.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},vd))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(ke,this.plain)}catch{try{GM_setValue(ke,t)}catch(n){Ho.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(ke,t)}catch{}Ba(ke,t).catch(n=>Ho.warn("Failed to save settings to IndexedDB:",n))}catch(t){Ho.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){Da(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var xd=new v("Settings"),Ed={plugins:{}},b=new No(structuredClone(Ed)),wd=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function Sd(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function x(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(b.store.plugins[n]||(b.store.plugins[n]={}),b.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?b.plain.plugins[n]??{}:{}}};return t}function Td(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function qa(){let e=null;if(e=Po(Td(ke)),e||(e=Po(await Oa(ke))),!e)try{e=Po(localStorage.getItem(ke))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(b.plain.plugins=t),xd.debug("Loaded settings")}}function ja(e,t){t&&(t.pluginName=e,b.plain.plugins[e]||(b.plain.plugins[e]={}),b.setDefaultGetter(wd(e),n=>{if(n!=="enabled")return Sd(t.def,n)}))}function Fa(){return b.plain.plugins.Settings||(b.store.plugins.Settings={}),b.store.plugins.Settings}function Ro(){return Fa().pinnedPlugins??[]}function za(e){return Ro().includes(e)}function Ga(e){let t=Ro(),n=t.includes(e);return b.store.plugins.Settings={...b.plain.plugins.Settings,pinnedPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}function Io(){return Fa().starredPlugins??[]}function Ka(e){return Io().includes(e)}function Ua(e){let t=Io(),n=t.includes(e);return b.store.plugins.Settings={...b.plain.plugins.Settings,starredPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}var Oo=new v("PluginManager"),te={},hn=new Set;function Ya(e){if(te[e.name]){Oo.warn("Duplicate plugin",e.name);return}te[e.name]=e,ja(e.name,e.settings)}function bt(e){let t=te[e];if(!t)return!1;if(t.required)return!0;let n=b.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function Xa(e){let t=te[e];if(!t||t.required)return;let n=!bt(e);b.plain.plugins[e]||(b.store.plugins[e]={}),b.store.plugins[e].enabled=n,n?Ja(t):Ld(t),Fe("pluginToggle",{name:e,enabled:n})}function Ja(e,t=!1){if(!hn.has(e.name)&&bt(e.name))try{e.managedStyle&&Pa(e.managedStyle),e.start?.(),hn.add(e.name),e.settings&&b.addPrefixChangeListener(`plugins.${e.name}.`,()=>{hn.has(e.name)&&e.onSettingsChange?.()}),t||Oo.debug("Started",e.name)}catch(n){Oo.error("Failed to start",e.name,n)}}function Ld(e){if(hn.has(e.name)){try{e.stop?.()}catch(t){Oo.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(Ra(e.managedStyle),y(e.managedStyle)),hn.delete(e.name)}}function yn(e){for(let t of Object.values(te))(t.startAt??"DOMContentLoaded")===e&&Ja(t)}var Va=2,Wa="defaultsRev";function Za(){for(let t of Object.values(te))b.plain.plugins[t.name]||(b.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=b.store.plugins.Settings??(b.store.plugins.Settings={});if(e[Wa]!==Va){for(let t of["NoShareLink","NoDictation"]){let n=b.store.plugins[t]??(b.store.plugins[t]={});n.enabled=!1}e[Wa]=Va}}var vn=!1,Bo=!1,Yr=!1,es=[],ts=[],ns=[];function Xr(e){let t=e.splice(0);for(let n of t)n()}function xn(){vn||(vn=!0,Xr(es))}function Jr(){Bo||(Bo=!0,vn||xn(),Xr(ts))}function os(){Yr||(Yr=!0,vn||xn(),Bo||Jr(),Xr(ns))}function Do(e){vn?e():es.push(e)}function $o(e){Bo?e():ts.push(e)}function _o(e){Yr?e():ns.push(e)}function qo(){xn()}function ht(){xn(),Jr()}function jo(){os()}function Qa(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function rs(){await Qa(4e3),xn(),await Qa(4e3),Jr(),os()}var h={p:"0-V-linuxdo"},F="[20260920] v1.4.53",is="https://github.com/0-V-linuxdo/Bloom";function kd(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Cd(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function Zr(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function ze(){return Zr()?kd()||Cd():!1}function as(){return ze()}var Md=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),ss=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Ad=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Hd="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function vt(e){return e.id==="bloom-root"||!!e.closest(Hd)}function ls(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function Fo(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function Qr(e){if(!(e instanceof HTMLElement)||!e.isConnected||vt(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&Fo(t)?!1:e.getClientRects().length>0}function yt(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Nd(){let e=[];for(let t of document.querySelectorAll(Md))!(t instanceof HTMLElement)||!t.isConnected||vt(t)||e.push(t);return e}function zo(e){if(!e.isConnected||vt(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function En(){return Nd().filter(zo)[0]??null}function ei(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||vt(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function ti(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!vt(n)&&!yt(n)&&n.parentElement&&!yt(n.parentElement)&&(t=n);let o=t.parentElement;if(o&&!yt(o)&&!vt(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!yt(o.parentElement))return o}return t}function cs(){let e=document.querySelectorAll(ss);for(let n of e)if(Qr(n)&&!Fo(n)&&ls(n))return n;let t=document.querySelectorAll(Ad);for(let n of t){if(!Qr(n)||!ls(n)||Fo(n))continue;let o=n.querySelector(ss);return Qr(o)&&!Fo(o)?o:n}return null}function ds(){let e=En();if(e){let t=ti(e),n=t.parentElement;if(n&&!yt(n))return n;if(!yt(t))return t}return ei()}function us(e){let t=En();return t?e.composedPath().includes(t):!1}var oi=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Pd={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function ri(e){return e==="auto"||e==="light"||e==="dark"}function Rd(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Id(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function ni(e){let t=Rd(e);return t?Id(t)>.55?"light":"dark":null}function Od(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=ni(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=ni(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=ni(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function ms(e){return e==="auto"?Od():e}function Bd(e){try{let t=getComputedStyle(document.documentElement);for(let n of oi){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function fs(e,t,n){let o=Pd[t];if(n){Bd(e);for(let r of oi)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of oi)e.style.setProperty(r,o[r])}function ps(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var ii=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var $d="bloom-root",ne="bloom-rail-item",Wo="bloom-account-item",Ke="bloom-sidebar-panel",Pn="bloom-plugin-dialog",er="bloom-plugin-layer",Yo="bloom-settings-css",_d=2e3,Mn=x({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),hs=null,qd=null,He=!1,ci=[],Go=null,Xo=null,Me=null,Uo=null,ge=null,An=null,wn,xt=0,Hn=0,Sn=0,Tn=null,Ln=null,Jo=null,ys=null,kn=null,ai=[],Zo=!1,jd=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Fd=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],tr="",Nn="all",Ne="all";function nr(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function vs(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function zd(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function Gd(e){let t='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return e?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${t}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`}function Kd(e){let t='<path d="M12 17v5"/>';return e?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var Ud={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function Vd(e){return e.icon||Ud[e.name]||nr()}function xs(){return ri(Mn.store.appearance)?Mn.store.appearance:"auto"}function Wd(){let e=document.createElement("div");e.className="bloom-field bloom-appearance-row";let t=document.createElement("span");t.className="bloom-field-label",t.textContent="Appearance";let n=document.createElement("select");n.setAttribute("aria-label","Appearance");let o=Mn.def.appearance,r=o.type===3?o.options??[]:[];for(let i of r){let a=document.createElement("option");a.value=i.value,a.textContent=i.label,n.appendChild(a)}return n.value=xs(),n.addEventListener("change",()=>{ri(n.value)&&(Mn.store.appearance=n.value)}),e.append(t,n),e}function si(e,t,n){e&&(e.setAttribute("data-bloom-scheme",t),fs(e,t,n),e.style.removeProperty("--bloom-rail-surface"))}function Es(e){e&&(e.style.removeProperty("--bloom-rail-surface"),e.style.removeProperty("--bg-primary"))}function Cn(){let e=xs(),t=ms(e),n=e==="auto";si(hs,t,n);let o=document.getElementById(Ke);o instanceof HTMLElement&&si(o,t,n);let r=document.getElementById(Pn);r instanceof HTMLElement&&si(r,t,n);let i=document.getElementById(ne);i instanceof HTMLElement&&Es(i),Fe("schemeChange",{scheme:t,pref:e})}function ws(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(e=>e.remove())}function Ss(){if(E("settings",ii),document.getElementById(Yo)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=Yo,e.textContent=ii,document.head.appendChild(e)}function Yd(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Xd(){for(let e of ci)e();ci=[]}function Ts(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function Jd(e){return e.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,t=>t.toUpperCase())}function mi(e){return e.settings?Object.entries(e.settings.def).filter(([,t])=>!t.hidden):[]}function Zd(e){return mi(e).length>0}function Vo(e){if(e.default!==void 0)return e.default;if(e.type===3)return(e.options?.find(n=>n.default)??e.options?.[0])?.value;if(e.type===2)return!1;if(e.type===4)return e.min??0;if(e.type===0)return"";if(e.type===1)return 0}function Qd(e,t){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let o=document.createElement("span");if(o.className="bloom-plugin-dialog-label-title",o.textContent=Jd(e),n.appendChild(o),t.description){let r=document.createElement("span");r.className="bloom-plugin-dialog-label-desc",r.textContent=t.description,n.appendChild(r)}return n}function eu(e,t,n){if(n.hidden)return null;let o=n.type===4||n.type===0||n.type===1||n.type===5,r=document.createElement("div");r.className=o?"bloom-field bloom-field-stack":"bloom-field",r.appendChild(Qd(t,n));let i=b.store.plugins[e]??(b.store.plugins[e]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",ci.push(n.render(a)),r.appendChild(a),r}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??Vo(n)??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),r.appendChild(a),r}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??Vo(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),r.appendChild(a),r}if(n.type===2){let a=Ts(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),r.appendChild(a),r}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[t]??Vo(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[t]=n.type===1?Number(a.value):a.value}),r.appendChild(a),r}return r}function gs(e,t){let n=document.createElement("div");n.className=t?`bloom-plugin-dialog-field ${t}`:"bloom-plugin-dialog-field";let o=document.createElement("div");return o.className="bloom-plugin-dialog-field-label",o.textContent=e,n.appendChild(o),n}function tu(e){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let t=b.store.plugins[e.name]??(b.store.plugins[e.name]={});for(let[n,o]of mi(e)){if(n==="enabled"||o.type===5)continue;let r=Vo(o);r!==void 0&&(t[n]=r)}ks(e)}function Ls(e){e.key==="Escape"&&(!document.getElementById(er)&&!document.getElementById(Pn)||(e.stopPropagation(),Et()))}function nu(){Zo||(document.addEventListener("keydown",Ls),Zo=!0)}function ou(){Zo&&(document.removeEventListener("keydown",Ls),Zo=!1)}function Et(){Xd(),ou(),document.getElementById(er)?.remove(),document.getElementById(Pn)?.remove()}function ks(e){if(Et(),!document.body)return;let t=document.createElement("div");t.id=er,t.className="bloom-plugin-layer",t.addEventListener("pointerdown",Ae),t.addEventListener("pointerup",Ae),t.addEventListener("click",d=>{d.stopPropagation(),d.target===t&&Et()});let n=document.createElement("div");n.id=Pn,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",Ae),n.addEventListener("pointerup",Ae),n.addEventListener("click",Ae);let o=document.createElement("button");o.type="button",o.className="bloom-icon-btn bloom-plugin-dialog-close",o.setAttribute("aria-label","Close"),o.innerHTML=vs(),o.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),Et()});let r=document.createElement("div");r.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=e.name,r.appendChild(i),e.description){let d=document.createElement("p");d.className="bloom-plugin-dialog-sub",d.textContent=e.description,r.appendChild(d)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(o,r,a),e.authors?.length){let d=gs("Authors"),u=document.createElement("p");u.className="bloom-plugin-dialog-authors",u.textContent=e.authors.join(", "),d.appendChild(u),n.appendChild(d)}let s=gs("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=mi(e);if(c.length)for(let[d,u]of c){let m=eu(e.name,d,u);m&&l.appendChild(m)}if(!l.childElementCount){let d=document.createElement("p");d.className="bloom-dialog-empty",d.textContent="No configurable settings.",l.appendChild(d)}if(s.appendChild(l),n.appendChild(s),c.length){let d=document.createElement("div");d.className="bloom-plugin-dialog-footer";let u=document.createElement("button");u.type="button",u.className="bloom-plugin-dialog-reset",u.textContent="Reset",u.addEventListener("click",()=>tu(e)),d.appendChild(u),n.appendChild(d)}t.appendChild(n),document.body.appendChild(t),nu(),Cn()}function ru(e){let t=document.createElement("div");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Vd(e);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=e.name,a.title=e.name,r.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=Ka(e.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=Gd(l),c.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation();let f=Ua(e.name);Fe("pluginStar",{name:e.name,starred:f})}),s.appendChild(c),!e.required){let g=za(e.name),f=document.createElement("button");f.type="button",f.className=`bloom-icon-btn bloom-card-pin${g?" bloom-card-pin-active":""}`,f.setAttribute("aria-label",g?"Unpin from top":"Pin to top"),f.innerHTML=Kd(g),f.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();let $=Ga(e.name);Fe("pluginPin",{name:e.name,pinned:$})}),s.appendChild(f)}if(Zd(e)){let g=document.createElement("button");g.type="button",g.className="bloom-icon-btn bloom-card-settings",g.setAttribute("aria-label",`${e.name} settings`),g.innerHTML=zd(),g.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),ks(e)}),s.appendChild(g)}let d=Ts(e.name,bt(e.name),!!e.required),u=d.querySelector("input");if(u?.addEventListener("click",g=>g.stopPropagation()),u?.addEventListener("change",()=>{Xa(e.name)}),s.appendChild(d),o.append(r,s),n.appendChild(o),e.description){let g=document.createElement("div");g.className="bloom-card-desc",g.textContent=e.description,n.appendChild(g)}let m=document.createElement("div");m.className="bloom-card-separator";let S=document.createElement("div");S.className="bloom-card-footer";let w=document.createElement("div");return w.className="bloom-card-author",w.textContent=e.authors?.filter(Boolean).join(", ")||"\xA0",S.appendChild(w),t.append(n,m,S),t}function Cs(){return Object.values(te).filter(e=>!e.hidden&&e.name!=="Settings")}function Ms(e,t){return t==="all"||t==="favorites"?!0:(e.tags??[]).includes(t)}function iu(e){return`${e.name} ${e.description??""} ${(e.tags??[]).join(" ")}`.toLowerCase()}function au(){return tr.trim()?"No plugins match your search.":Ne==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function su(){let e=Cs();return Fd.filter(t=>t.id==="favorites"||t.id==="all"?!0:e.some(n=>Ms(n,t.id)))}function lu(){if(kn){kn.replaceChildren();for(let e of su()){let t=document.createElement("button");t.type="button",t.className=`bloom-plugin-tab${Ne===e.id?" bloom-plugin-tab-active":""}`,t.textContent=e.label,t.addEventListener("click",()=>{Ne=e.id,Ge()}),kn.appendChild(t)}}}function cu(){let e=Cs();if(Ne==="favorites"){let t=new Set(Io());e=e.filter(n=>t.has(n.name))}else Ne!=="all"&&(e=e.filter(t=>Ms(t,Ne)));return Nn==="enabled"&&(e=e.filter(t=>bt(t.name))),Nn==="disabled"&&(e=e.filter(t=>!bt(t.name))),e}function Ge(){if(!Tn)return;lu();let e=cu();Jo&&(Jo.placeholder=`Search ${e.length} plugins...`);let t=e,n=tr.trim().toLowerCase();if(n&&(t=t.filter(o=>iu(o).includes(n))),Ne!=="favorites"){let o=Ro();if(o.length){let r=new Map(o.map((i,a)=>[i,a]));t=t.slice().sort((i,a)=>{let s=r.has(i.name),l=r.has(a.name);return s!==l?s?-1:1:s?(r.get(i.name)??0)-(r.get(a.name)??0):i.name.localeCompare(a.name)})}}Tn.replaceChildren();for(let o of t)Tn.appendChild(ru(o));Ln&&(Ln.hidden=t.length>0,Ln.textContent=au())}function Ae(e){e.stopPropagation()}function li(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function fi(){document.getElementById(ne)?.setAttribute("aria-expanded",He?"true":"false")}function du(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function pi(){Et(),tr="",Nn="all",Ne="all",document.getElementById(Ke)?.remove(),He=!1,fi()}function uu(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",Ae),t.addEventListener("pointerup",Ae),t.addEventListener("click",Ae);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-titles";let i=document.createElement("div");i.className="bloom-settings-brand";let a=document.createElement("span");a.className="bloom-settings-mark",a.innerHTML=nr();let s=document.createElement("h2");s.textContent="Bloom++",i.append(a,s);let l=document.createElement("p");l.className="bloom-settings-sub",l.textContent="Toggle features. Some need a reload. Click the sliders icon to configure.",r.append(i,l);let c=document.createElement("button");c.type="button",c.className="bloom-icon-btn",c.setAttribute("aria-label","Close"),c.innerHTML=vs(),c.addEventListener("click",pi),o.append(r,c),n.appendChild(o),n.appendChild(Wd());let d=document.createElement("div");d.className="bloom-plugin-tabs",n.appendChild(d);let u=document.createElement("div");u.className="bloom-search-bar";let m=document.createElement("input");m.type="search",m.className="bloom-search-input",m.setAttribute("aria-label","Search plugins"),m.placeholder="Search plugins...",m.addEventListener("input",()=>{tr=m.value,Ge()});let S=document.createElement("select");S.className="bloom-search-filter",S.setAttribute("aria-label","Filter plugins");for(let f of jd){let T=document.createElement("option");T.value=f.value,T.textContent=f.label,S.appendChild(T)}S.value=Nn,S.addEventListener("change",()=>{Nn=S.value,Ge()}),u.append(m,S),n.appendChild(u);let w=document.createElement("div");w.className="bloom-plugin-list",n.appendChild(w);let g=document.createElement("p");return g.className="bloom-tab-empty",g.hidden=!0,n.appendChild(g),t.appendChild(n),Tn=w,Ln=g,Jo=m,ys=S,kn=d,Ge(),t}function mu(e){e.classList.add("bloom-rail-dock")}function fu(){let e=document.getElementById(ne);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&zo(e)?e:null}function pu(){if(document.getElementById(Ke)?.remove(),!document.body)return;let e=uu(Ke);mu(e),document.body.appendChild(e),He=!0,Et(),Cn(),fi(),Fe("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:F,dock:"center",rail:!!fu()})}function gi(){let e=document.getElementById(Ke);if(e instanceof HTMLElement&&e.isConnected&&du(e)){pi();return}e?.remove(),pu()}function gu(){let e=document.createElement("button");return e.type="button",e.id=ne,e.className="bloom-rail-item",e.setAttribute("aria-controls",Ke),e.setAttribute("aria-expanded",He?"true":"false"),e.innerHTML=`<span class="bloom-rail-mark">${nr()}</span><span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),gi()}),e}function bs(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function bu(e){let t=e.querySelector("img");if(t instanceof HTMLElement){let n=t.getBoundingClientRect();if(n.width>8&&n.height>8)return t}for(let n of e.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}return null}function hu(e,t){for(let n of e.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||t&&(n===t||n.contains(t)||t.contains(n))||(n.textContent||"").trim().length<2)continue;let r=n.getBoundingClientRect();if(r.width>16&&r.height>8&&r.height<40)return n}return null}function Ce(e,t,n){let o=`${n}px`;e.style.getPropertyValue(t)!==o&&e.style.setProperty(t,o)}function As(e,t){if(e.classList.contains("bloom-rail-compact"))return;let n=e.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!e.isConnected||!t.isConnected)return;let o=bu(t),r=getComputedStyle(t),i=Number.parseFloat(r.paddingTop),a=Number.parseFloat(r.paddingBottom);if(Number.isFinite(i)&&Ce(e,"padding-top",Math.round(i)),Number.isFinite(a)&&Ce(e,"padding-bottom",Math.round(a)),o){let s=o.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));Ce(n,"width",l),Ce(n,"height",Math.max(20,Math.round(s.height)));let c=e.getBoundingClientRect(),d=Math.round(s.left-c.left);d>=0&&d<=40&&Ce(e,"padding-left",d);let u=hu(t,o);if(u){let m=u.getBoundingClientRect(),S=n.getBoundingClientRect(),w=Math.round(m.left-S.right);w>=0&&w<=24&&Ce(e,"gap",w)}}else{let s=Number.parseFloat(r.paddingLeft),l=Number.parseFloat(r.columnGap||r.gap);Number.isFinite(s)&&Ce(e,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&Ce(e,"gap",Math.round(l))}Es(e)}function di(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function yu(){if(An?.isConnected&&ge){ge.observe(An,{childList:!0});return}ui()}function vu(e){if(di(e))return!1;try{if(e.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function xu(e,t){!t||!e||requestAnimationFrame(()=>{if(e.isConnected){Sn=0;return}Sn+=1,Hn=Date.now()+Math.min(8e3,250*2**Math.min(Sn,5))})}function Eu(){xt||Date.now()<Hn||(xt=requestAnimationFrame(()=>{xt=0,!(Date.now()<Hn)&&(document.getElementById(ne)?.isConnected||Qo())}))}function Qo(){if(!document.body)return;ge?.disconnect();let e=null,t=!1;try{let n=document.getElementById(ne);e=n instanceof HTMLButtonElement?n:gu();let o=En(),r=ei();if(o){let i=ti(o),a=i.parentElement;if(di(i)||a&&di(a))return;e.isConnected&&e.nextElementSibling===i||(i.before(e),t=!0),bs(e),As(e,o)}else r?(e.parentElement!==r&&(r.appendChild(e),t=!0),bs(e,!0)):e.isConnected&&!zo(e)&&(e.remove(),e=null)}finally{xu(e,t),yu(),fi()}}function ui(){let e=ds();!e||!vu(e)||An===e&&ge||(ge?.disconnect(),An=e,ge=new MutationObserver(()=>{document.getElementById(ne)?.isConnected||Eu()}),ge.observe(e,{childList:!0}))}function wu(){Qo(),ui(),wn===void 0&&(wn=window.setInterval(()=>{let e=document.getElementById(ne);if(!(e instanceof HTMLElement)||!e.isConnected)Date.now()>=Hn&&Qo();else{Sn=0;let t=En();t&&As(e,t)}ui()},_d))}function Su(){wn!==void 0&&(clearInterval(wn),wn=void 0),xt&&cancelAnimationFrame(xt),xt=0,Hn=0,Sn=0,ge?.disconnect(),ge=null,An=null}function Tu(e){Uo===e&&Me||(Me?.disconnect(),Uo=e,Me=new MutationObserver(()=>{if(!e.isConnected){Me?.disconnect(),Me=null,Uo=null;return}Hs(e)}),Me.observe(e,{childList:!0}))}function Hs(e){if(Tu(e),e.querySelector(`#${Wo}`))return;let t=document.createElement("button");t.type="button",t.id=Wo,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${nr()}<span>Bloom++</span>`,t.addEventListener("pointerdown",li),t.addEventListener("pointerup",li),t.addEventListener("click",n=>{li(n),gi()}),e.insertBefore(t,e.firstChild)}function Ko(){let e=cs();return e?(Hs(e),!0):!1}function Lu(e){us(e)&&(queueMicrotask(Ko),requestAnimationFrame(()=>{Ko()}),window.setTimeout(Ko,60),window.setTimeout(Ko,180))}function ku(){Xo?.abort();let e=new AbortController;Xo=e,document.addEventListener("click",Lu,{signal:e.signal})}function Cu(){Xo?.abort(),Xo=null,Me?.disconnect(),Me=null,Uo=null}function Ns(){ht(),Yd(()=>{Ss(),ws(),Qo(),gi()})}var Ps=p({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[h.p],required:!0,hidden:!0,enabledByDefault:!0,settings:Mn,startAt:"HostReady",cleanupSelectors:[`#${$d}`,`#${ne}`,`#${Wo}`,`#${Ke}`,`#${er}`,`#${Pn}`,`#${Yo}`,"#bloom-menu-panel"],start(){Ss(),ws(),wu(),ku(),Go?.(),Go=ps(Cn),Cn(),ai=[Ao("pluginToggle",()=>{He&&Ge()}),Ao("pluginPin",()=>{He&&Ge()}),Ao("pluginStar",()=>{He&&Ge()})]},stop(){Su(),Cu(),Go?.(),Go=null;for(let e of ai)e();ai=[],pi(),document.getElementById(ne)?.remove(),document.getElementById(Wo)?.remove(),document.getElementById(Yo)?.remove(),hs=null,qd=null,Tn=null,Ln=null,Jo=null,ys=null,kn=null,He=!1},onSettingsChange:Cn});var or='form[data-type="unified-composer"], form.w-full[data-type]',oe=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),wt=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Rs=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Is=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Mu=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Au='[contenteditable="false"], button, [role="button"]';function U(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function Ue(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!U(r)))return r;return null}function Os(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function C(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=Os(e);return!!(Mu.test(n)||/^stop$/i.test(n))}function V(){let t=Array.from(document.querySelectorAll(or)).find(U);if(t instanceof HTMLElement)return t;let n=Ue(document,oe),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function D(){let e=Array.from(document.querySelectorAll(oe));return e.find(U)??e[0]??null}function Hu(e,t){if(!e||e===t||!t.contains(e))return!1;let n=e.closest(Au);return!!n&&n!==t&&t.contains(n)}function bi(e,t){let n=[];try{let o=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),r=o.nextNode();for(;r;){let i=r.parentElement;i&&Hu(i,t)||n.push(r.textContent??""),r=o.nextNode()}}catch{return e.innerText??e.textContent??""}return n.join("")}function z(e){let t=e??D();return t?bi(t,t).replaceAll("\u200B","").trim().length>0:!1}function Pe(e){return!z(e)}function rr(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function Bs(e){let t=V();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!U(n))&&e(n))return n;return null}function Re(){let e=V(),t=Ue(e,wt)??Ue(document,wt);return t&&!C(t)?t:Bs(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!C(n);let r=Os(n);return/^(send|send prompt|发送)$/i.test(r)&&!C(n)})}function Ve(){let e=V(),t=Ue(e,Rs,!0)??Ue(document,Rs,!0);if(t)return t;let n=Ue(e,Is)??Ue(document,Is);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&U(o)&&C(o))return o}return Bs(C)}function G(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>bi(n,e)).join(`
`):bi(e,e)}function hi(e,t=!1){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function be(e,t,n=!1){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r);try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch{e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),hi(e,n)}var Ds="bloom-host-icon",Rn="data-bloom-host-rel",yi="not all",vi=0,$s=0,Nu=400;function _s(e){vi+=1;try{e()}finally{vi-=1}}function ir(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function St(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function qs(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function Pu(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Ru(e,t){if(e.lastElementChild===t)return;let n=Date.now();n-$s<Nu||($s=n,e.appendChild(t))}function Iu(e,t){for(let n of e.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===t||ir(n)&&(n.getAttribute(Rn)||n.setAttribute(Rn,n.rel),n.media!==yi&&(n.media=yi),n.rel!==Ds&&(n.rel=Ds))}function Ou(e){for(let t of e.querySelectorAll(`link[${Rn}]`)){if(!(t instanceof HTMLLinkElement))continue;let n=t.getAttribute(Rn);n&&(t.rel=n),t.removeAttribute(Rn),t.media===yi&&t.removeAttribute("media")}}function js(e,t){let{head:n}=document;!n||!t||_s(()=>{Iu(n,e);let o=qs(e),{type:r,sizes:i}=Pu(t);o?Ru(n,o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function xi(e,t){let{head:n}=document;n&&_s(()=>{qs(e)?.remove(),Ou(n)})}function Fs(e,t){let{head:n}=document;if(!n)return null;let o=0,r=new MutationObserver(i=>{if(vi)return;let a=!1,s;for(let l of i){l.type==="attributes"&&l.target instanceof HTMLLinkElement&&(l.target.id===e?a=!0:ir(l.target)&&(a=!0,St(l.target.href)&&(s=l.target.href)));for(let c of l.removedNodes)ir(c)&&c.id===e&&(a=!0);for(let c of l.addedNodes)ir(c)&&c.id!==e&&(a=!0,St(c.href)&&(s=c.href))}a&&(o||(o=requestAnimationFrame(()=>{o=0,t(s)})))});return r.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),r}var zs=/\/c\/([a-zA-Z0-9_-]{8,})/i;function _(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=c=>{let d=n.indexOf(c);return d>=0&&n[d+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,d)=>{try{return document.querySelector(c)?.getAttribute(d)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function re(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function Tt(e){if(!e)return"";try{return(/^https?:/i.test(e)?new URL(e,location.origin).pathname:e).match(zs)?.[1]??""}catch{return e.match(zs)?.[1]??""}}function L(){let e=Tt(location.pathname);if(e)return e;let n=_().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return""}var Vs=new v("Harvest"),Bu=1500,Du=200,ar=new Set,sr=new Map,lr=new Map,Lt=null,cr=null,In=null,ie=0;function $u(){return typeof unsafeWindow<"u"?unsafeWindow:window}function _u(e){try{if(typeof e=="string")return e;if(e instanceof URL)return e.href;if(typeof Request<"u"&&e instanceof Request)return e.url}catch{}return String(e)}function qu(e,t){let n=t?.method,o=typeof Request<"u"&&e instanceof Request?e.method:"";return(n||o||"GET").toUpperCase()}function Ws(e){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(e)}var ju=/"action"\s*:\s*"(next|continue|variant)"/i;function Fu(e,t,n){return!(t!=="POST"||Ws(e)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(e)||typeof n=="string"&&/"action"\s*:/.test(n)&&!ju.test(n))}function zu(e,t){return t!=="GET"||Ws(e)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(e)}function Gs(e){return e.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function Ys(e){return e?e.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function Gu(e){return typeof e=="string"?Ys(e):""}function Ei(e){if(typeof e=="number"&&Number.isFinite(e)&&e>0)return e>1e12?e:Math.round(e*1e3);if(typeof e=="string"){let t=e.trim();if(!t)return null;if(/^\d+(\.\d+)?$/.test(t))return Ei(Number(t));let n=Date.parse(t);return Number.isFinite(n)?n:null}return null}function Xs(e,t){if(e.size<=t)return;let n=e.size-t,o=0;for(let r of e.keys())if(e.delete(r),++o>=n)break}function Ks(e,t,n){!e||!t||lr.get(e)!==t&&(lr.set(e,t),Xs(lr,Bu),Ie({type:"message-time",messageId:e,createTime:t,conversationId:n}))}function Ku(e,t){let n=t.trim();!e||!n||sr.get(e)!==n&&(sr.set(e,n),Xs(sr,Du),Ie({type:"conversation-meta",conversationId:e,title:n}))}function On(e,t,n=0){if(n>6||!e||typeof e!="object")return;if(Array.isArray(e)){for(let l of e)On(l,t,n+1);return}let o=e,r=typeof o.conversation_id=="string"&&o.conversation_id||typeof o.conversationId=="string"&&o.conversationId||t;typeof o.title=="string"&&r&&!o.author&&!o.content&&!o.role&&Ku(r,o.title);let i=o.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",d=Ei(l.create_time??l.createTime??l.created_at);c&&d&&Ks(c,d,r)}let a=typeof o.id=="string"?o.id:"",s=Ei(o.create_time??o.createTime??o.created_at);if(a&&s&&(o.author||o.content||o.role||o.create_time||o.createTime)&&Ks(a,s,r),o.mapping&&typeof o.mapping=="object")On(o.mapping,r,n+1);else if(n<3)for(let l of Object.values(o))l&&typeof l=="object"&&On(l,r,n+1)}function Us(e,t){if(e)try{On(JSON.parse(e),t)}catch{}}function Ie(e){for(let t of Array.from(ar))try{t(e)}catch{}}async function Uu(e,t,n){if(n===ie)try{let o=await e.json();if(n!==ie)return;On(o,t)}catch{}}async function Vu(e,t,n,o){let r=t,i=n,a=e.body;if(!a){o===ie&&Ie({type:"post-end",conversationId:r,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;o===ie;){let{done:d,value:u}=await s.read();if(d)break;if(c+=l.decode(u,{stream:!0}),!r){let S=Ys(c);S&&(r=S,Ie({type:"post-start",conversationId:r,url:""}))}let m=c.split(`
`);c=m.pop()??"";for(let S of m){let w=S.replace(/^data:\s*/,"").trim();!w||w==="[DONE]"||Us(w,r)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&o===ie&&Us(c.replace(/^data:\s*/,""),r)}catch{i=!0}finally{try{s.cancel()}catch{}}o===ie&&Ie({type:"post-end",conversationId:r,error:i})}function Wu(e,t,n){let o=_u(t),r=qu(t,n),i=zu(o,r),a=Fu(o,r,n?.body),s=ie,l="";return a&&(l=Gu(n?.body)||Gs(o)||Tt(o)||L(),Ie({type:"post-start",conversationId:l,url:o})),e(t,n).then(c=>{if(s!==ie||!i&&!a)return c;try{let d=c.clone();i?Uu(d,Gs(o)||L(),s):Vu(d,l,!c.ok,s)}catch{a&&Ie({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===ie&&Ie({type:"post-end",conversationId:l,error:!0}),c})}function Yu(){if(Lt)return;let e=$u();In=e,Lt=e.fetch.bind(e);let t=(n,o)=>Wu(Lt,n,o);cr=t,e.fetch=t,Vs.debug("conversation fetch harvest hooked")}function Xu(){ie+=1,!(!Lt||!In)&&(cr&&In.fetch===cr&&(In.fetch=Lt),Lt=null,cr=null,In=null,Vs.debug("conversation fetch harvest unhooked"))}function K(e){return ar.add(e),Yu(),()=>{ar.delete(e),ar.size===0&&Xu()}}function kt(e){return e?sr.get(e)??"":""}function dr(e){return e?lr.get(e)??null:null}var Qs=new v("Streaming");function Fn(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!U(t))&&(C(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function Ju(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&U(e))}function Zu(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&U(e))}function Qu(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function W(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function H(){if(Ve()||Fn()||Qu())return!0;let e=Re();return e&&U(e)&&!C(e)?!1:!!(Ju()||Zu())}var em=400,Js=3,Xe=new Set,Dn,$n=null,wi=null,Ye=!1,We=0,Oe="",ae="",_n=!1,qn=!1,jn=!1;function el(){return re(_())}function Zs(e,t){return{streaming:e,contextKey:t,conversationId:L()}}function tm(e,t){if(!e||e===t)return!1;if(e.endsWith("|draft")&&!t.endsWith("|draft"))return!0;try{let n=e.split("|")[0],o=t.split("|")[0],r=new URL(n).pathname.replace(/\/$/,"")||"/",i=new URL(o).pathname.replace(/\/$/,"")||"/";if((r==="/"||r==="")&&i.startsWith("/c/"))return!0}catch{}return!1}function Si(){Ye=!1,We=0,Oe="",_n=!1,qn=!1,jn=!1}function nm(e){for(let t of Array.from(Xe))try{t.onFall?.(e)}catch{}}function om(e){for(let t of Array.from(Xe))try{t.onRise?.(e)}catch{}}function Bn(e){for(let t of Array.from(Xe))try{t.onTick?.(e)}catch{}}function rm(e,t){for(let n of Array.from(Xe))try{n.onContext?.(e,t)}catch{}}function im(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest("button");n instanceof HTMLElement&&C(n)&&(_n=!0)}function am(e){e.type==="post-end"&&Ye&&(jn=!0,e.error&&(qn=!0))}function sm(){let e=el(),t=H();if(ae&&e&&ae!==e){if(rm(e,ae),!tm(ae,e)){Si(),ae=e,Bn(Zs(t,e));return}Oe===ae&&(Oe=e)}ae=e;let n=Zs(t,e);if(t){let i=!Ye;i&&(_n=!1,qn=!1,jn=!1),Ye=!0,We=0,Oe=e,i&&om(n),Bn(n);return}if(!Ye){Bn(n);return}if(We+=1,jn&&(We=Math.max(We,Js)),We<Js){Bn(n);return}let o=!!Oe&&Oe===e,r={contextKey:Oe||e,conversationId:L(),userStopped:_n,error:qn||W()};Si(),o&&nm(r),Bn(n)}function lm(){Dn===void 0&&(Ye=H(),ae=el(),Oe=Ye?ae:"",We=0,_n=!1,qn=!1,jn=!1,$n?.abort(),$n=new AbortController,document.addEventListener("click",im,{capture:!0,signal:$n.signal}),wi=K(am),Dn=setInterval(sm,em),Qs.debug("watchStreamingEdge started"))}function cm(){Xe.size||(Dn!==void 0&&(clearInterval(Dn),Dn=void 0),$n?.abort(),$n=null,wi?.(),wi=null,Si(),ae="",Qs.debug("watchStreamingEdge stopped"))}function se(e){let t=typeof e=="function"?{onFall:e}:e;return Xe.add(t),lm(),()=>{Xe.delete(t),cm()}}var dm=["original","badge","dot","hole","bg"],ol=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],rl={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},ur="#FCFCFC",um="#111111",tl="#111111",mm="#ffffff",fm="#212121",pm="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",gm={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},mr=32,nl=64;function il(e){return typeof e=="string"&&dm.includes(e)}function bm(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function fr(e){let t=document.createElement("canvas");t.width=mr,t.height=mr;let n=t.getContext("2d");return n?(n.scale(mr/nl,mr/nl),e(n),t.toDataURL("image/png")):""}function hm(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function pr(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(pm);n&&(e.strokeStyle=um,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function ym(e,t,n){let o=rl[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=tl,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=tl,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=mm,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function zn(e,t){if(e==="original")return t==="wait"?fr(o=>pr(o,ur)):bm(gm[t]);let n=t==="wait"?void 0:rl[t];return fr(e==="hole"?o=>pr(o,n??ur):e==="bg"?o=>{o.fillStyle=n??fm,hm(o,0,0,64,64,14),o.fill(),pr(o,ur,!1)}:o=>{pr(o,ur),t!=="wait"&&ym(o,t,e==="dot"?"dot":"badge")})}function al(e){return{wait:zn(e,"wait"),rotate:zn(e,"rotate"),done:zn(e,"done"),ready:zn(e,"ready"),error:zn(e,"error")}}var vm=new v("ChatStateFavicons"),Qe="bloom-chat-state-favicon",ml=["input","beforeinput","cut","paste","compositionend"],fl=x({style:{type:3,description:"Favicon overlay",options:ol}}),Ze="",Li={wait:"",rotate:"",done:"",ready:"",error:""},Nt="wait",Mt=!1,he=!1,Y=null,Kn="",Un="",et=!0,Gn=null,At=0,Ct,gr=null,Je=null,Ti=null,Ht=null,Vn=!1,sl=new WeakSet,xm=400;function Em(){let e=fl.store.style;return il(e)?e:"bg"}function wm(){let t=document.querySelector(`link[rel~="icon"]:not(#${Qe})`)?.href;return St(t)?t:St(Ze)?Ze:""}function ll(){let e=document.getElementById(Qe);return e instanceof HTMLLinkElement?e:null}function pl(){if(Nt==="wait"){xi(Qe,Ze);return}js(Qe,Li[Nt])}function X(e){if(Nt===e)if(e==="wait"){if(!ll())return}else{let t=ll();if(t&&t.getAttribute("href")===Li[e])return}Nt=e,pl()}function cl(){Li=al(Em()),X(Nt)}function Sm(){let e=_(),t=e?re(e):re("");return H()?(!Kn&&t&&(Kn=t),Kn||t):(Kn="",t)}function gl(){Mt=!1,he=!1,Y=null,Kn=""}function Tm(e){Un=e,gl(),et=!1,X("wait")}function dl(e){return!e&&et}function bl(){if(!Vn)return;let e=_()||location.pathname;if(Un&&e&&Un!==e){Tm(e);return}e&&(Un=e);let t=Sm(),n=H(),o=Pe();if(W()&&!n){X("error"),Mt=!1,he=!1,Y=null;return}if(n){Mt||(et=!1),Mt=!0,he=!1,Y=t,X("rotate");return}if(Mt){let r=!!Y&&!!t&&Y===t;if(Mt=!1,r){he=!0,Y=t,X("done");return}he=!1,Y=null}if(he)if(!!(Y&&t&&Y!==t))he=!1,Y=null;else if(o){X("done");return}else if(dl(o)){he=!1,X("ready");return}else{he=!1,X("wait");return}Y=null,o?X("wait"):dl(o)?X("ready"):X("wait")}function hl(){if(Ht){for(let e of ml)Ht.removeEventListener(e,xl,!0);Ht=null}}function yl(){let e=V(),t=e&&e!==document.body?e:null;if(!(Ht===t&&t?.isConnected)&&(hl(),!!t)){Ht=t;for(let n of ml)Ht.addEventListener(n,xl,{capture:!0,passive:!0})}}function vl(){let e=V();if(!(Je&&Ti===e&&e.isConnected)){if(Je?.disconnect(),Ti=e,!e||e===document.body){Je=null;return}Je=new MutationObserver(()=>Wn()),Je.observe(e,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function Wn(){!Vn||At||(At=requestAnimationFrame(()=>{At=0,Vn&&(El(),yl(),vl(),z()&&(et=!0),bl())}))}function xl(){z()&&(et=!0),Wn()}function ul(){z()&&(et=!0),Wn()}function El(){let e=D();!e||sl.has(e)||(sl.add(e),e.addEventListener("input",ul,{capture:!0,passive:!0}),e.addEventListener("compositionend",ul,{capture:!0,passive:!0}))}var wl=p({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:fl,startAt:"DOMContentLoaded",cleanupSelectors:[`#${Qe}`],start(){Vn=!0,Ze=wm()||Ze,cl(),gr?.disconnect(),gr=Fs(Qe,e=>{St(e)&&(Ze=e),pl()}),Gn?.abort(),Gn=new AbortController,window.addEventListener("popstate",Wn,{signal:Gn.signal}),El(),yl(),vl(),Ct!==void 0&&clearInterval(Ct),Ct=setInterval(Wn,xm),bl(),vm.debug("favicon watch started")},stop(){Vn=!1,At&&cancelAnimationFrame(At),At=0,Ct!==void 0&&(clearInterval(Ct),Ct=void 0),Gn?.abort(),Gn=null,hl(),Je?.disconnect(),Je=null,Ti=null,gr?.disconnect(),gr=null,gl(),Un="",et=!0,Nt="wait",xi(Qe,Ze)},onSettingsChange:cl});var Sl=`.bloom-ih-hud {
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
`;var yh=new v("InputHistory"),ki=/\u200B/g,Tl=10,Ll=500,kl=100,km=8,Cm=120,Mm=2e3,br=10,hr=x({maxEntries:{type:4,description:"Max stored prompts",min:Tl,max:Ll,default:kl},history:{type:5,description:"Stored prompts",render:zm},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Ci=new Map,N=0,Mi="",le=!1,Xn=!1,Ni=0,Yn=null,Ai,Pi=null,Cl=!0;function J(){let e=hr.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ml(e){let t=pe(Number(hr.store.maxEntries??kl),Tl,Ll);return e.length>t?e.slice(e.length-t):e}function yr(e){hr.store.entries=Ml(e)}function Am(e){return e.replaceAll(ki,"").replace(/\n$/,"").trim()}function Hi(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(oe);return n instanceof HTMLElement?n:D()}function Hm(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!G(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(ki,"").trim().length===0,last:i.toString().replaceAll(ki,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Al(e){clearTimeout(Ai),Ai=setTimeout(()=>{if(e!==Ni)return;Xn=!1;let t=Pi;t&&hi(t,Cl)},Cm)}function Hl(e,t,n){Xn=!0,Pi=e,Cl=n;let o=++Ni;be(e,t,n),Al(o)}function Nm(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function Pt(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Pm(){document.querySelector(".bloom-ih-hud")?.remove()}function Rm(e,t){let n=Nm();n.textContent=e;let o=(t.closest("form")??V()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-km)}px`,n.classList.add("bloom-ih-hud-on")}function Ri(e){let t=Am(e);if(!t)return;let n=Date.now(),o=Ci.get(t);if(o&&n-o<Mm)return;Ci.set(t,n);let r=J().filter(i=>i!==t);r.push(t),yr(r),N=J().length,le=!1,Pt()}function Im(e,t){let n=J();if(!n.length&&e)return;N>=n.length&&(Mi=G(t),N=n.length);let o=e?N-1:N+1;o<0||o>n.length||(N=o,le=!0,Hl(t,o===n.length?Mi:n[o],e),o<n.length?Rm(`${o+1} / ${n.length}`,t):Pt())}function Om(e){le=!1,Pt(),Hl(e,Mi,!1),N=J().length}function Bm(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=Hi(e.target)??Hi(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&le&&!e.altKey&&!e.shiftKey){Om(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){Ri(G(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=J();if(!o){let i=Hm(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||N<=0)||!n&&N>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),Im(n,t))}function Dm(e){if(Hi(e.target)){if(Xn){Al(Ni);return}le&&(le=!1,Pt(),N=J().length)}}function $m(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(oe);n instanceof HTMLElement&&Ri(G(n))}function _m(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(wt);if(!n||!(n instanceof HTMLElement)||C(n))return;let o=D();o&&Ri(G(o))}function qm(e){if(!(!le||Xn)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}le=!1,Pt()}}function jm(){if(Yn)return;Yn=new AbortController;let{signal:e}=Yn,t={capture:!0,signal:e};window.addEventListener("keydown",Bm,t),window.addEventListener("input",Dm,t),window.addEventListener("submit",$m,t),window.addEventListener("click",_m,t),window.addEventListener("pointerdown",qm,t)}function Fm(e){let t=J().slice();t.splice(e,1),yr(t),N>t.length&&(N=t.length)}function zm(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=J().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(f=>f.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/br));n>=l&&(n=l-1);let c=s.slice(n*br,n*br+br);e.replaceChildren();let d=document.createElement("input");if(d.className="bloom-ih-search",d.type="search",d.placeholder="Search history",d.autocomplete="off",d.value=t,d.addEventListener("input",()=>{t=d.value,n=0,r()}),e.appendChild(d),c.length){let f=document.createElement("div");f.className="bloom-ih-list",c.forEach((T,$)=>{let j=i.indexOf(T),pn=J().length-1-j,ft=document.createElement("div");ft.className="bloom-ih-item";let Te=document.createElement("button");Te.type="button",Te.className=`bloom-ih-body${o===$?"":" bloom-ih-clamp"}`,Te.textContent=T,Te.addEventListener("click",()=>{o=o===$?-1:$,r()});let gn=document.createElement("div");gn.className="bloom-ih-actions";let pt=document.createElement("button");pt.type="button",pt.title="Copy",pt.textContent="C",pt.addEventListener("click",()=>{$a(T)});let je=document.createElement("button");je.type="button",je.title="Delete",je.textContent="\xD7",je.addEventListener("click",()=>{Fm(pn),r()}),gn.append(pt,je),ft.append(Te,gn),f.appendChild(ft)}),e.appendChild(f)}else{let f=document.createElement("p");f.className="bloom-ih-empty",f.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(f)}let u=document.createElement("div");u.className="bloom-ih-pager";let m=document.createElement("button");m.type="button",m.className="bloom-ih-btn",m.textContent="Prev",m.disabled=n<=0,m.addEventListener("click",()=>{n-=1,r()});let S=document.createElement("span");S.textContent=`${n+1} / ${l}`;let w=document.createElement("button");w.type="button",w.className="bloom-ih-btn",w.textContent="Next",w.disabled=n+1>=l,w.addEventListener("click",()=>{n+=1,r()});let g=document.createElement("button");g.type="button",g.className="bloom-ih-clear",g.textContent="Clear all",g.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(yr([]),N=0,r())}),u.append(m,S,w,g),e.appendChild(u)};return r(),()=>{e.replaceChildren()}}var Nl=p({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:hr,startAt:"HostReady",managedStyle:"inputHistory",start(){E("inputHistory",Sl),N=J().length,le=!1,jm()},stop(){Yn?.abort(),Yn=null,Pt(),Pm(),Ci.clear(),clearTimeout(Ai),Xn=!1,Pi=null,le=!1},onSettingsChange(){let e=J(),t=Ml(e);t.length!==e.length&&yr(t),N>t.length&&(N=t.length)}});var Ii="noShareLink",Gm=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],Km=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],Oi=x({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Pl(e){return`${e.join(",")}{display:none!important}`}function Rl(){let e=[];if(Oi.store.hideShareChat!==!1&&e.push(Pl(Gm)),Oi.store.hideShareProject!==!1&&e.push(Pl(Km)),!e.length){y(Ii);return}E(Ii,e.join(`
`))}var Il=p({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[h.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Oi,start:Rl,onSettingsChange:Rl,stop(){y(Ii)}});var Dl="noDictation",Um=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],Vm=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],$l=x({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Ol(e){return`${e.join(",")}{display:none!important}`}function Bl(){let e=[Ol(Um)];$l.store.hideDictationSettings!==!1&&e.push(Ol(Vm)),E(Dl,e.join(`
`))}var _l=p({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:$l,start:Bl,onSettingsChange:Bl,stop(){y(Dl)}});var Bi="noSidebarIdentity",Rt=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Fl=Rt.flatMap(e=>[`${e} .min-w-0 > .truncate`,`${e} .min-w-0.flex-1 .truncate`]),zl=Rt.flatMap(e=>[`${e} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),Wm=[...Fl,...zl],Ym=[...Fl,...Rt.flatMap(e=>[`${e} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],Xm=Rt.map(e=>`${e} a[href^="mailto:"]`),Jm=Rt.flatMap(e=>[`${e} .min-w-0 > :not(.truncate)`,`${e} .min-w-0 > :not(.truncate) *`,`${e} .min-w-0 .text-xs`,`${e} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${e} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${e} .text-xs:not(.truncate)`,`${e} .text-token-text-secondary:not(.truncate)`,`${e} .text-token-text-tertiary:not(.truncate)`,`${e} .min-w-0 ~ *`,`${e} .min-w-0 ~ * *`,`${e} > .text-xs`,`${e} > .text-token-text-secondary`,`${e} > .text-token-text-tertiary`]),Zm=Rt.flatMap(e=>[`${e} .min-w-0.flex-col > :not(.truncate)`,`${e} .min-w-0.flex-col > .text-xs`,`${e} .min-w-0.flex-col > .text-token-text-secondary`,`${e} .min-w-0.flex-col > .text-token-text-tertiary`,`${e} .min-w-0:not(.flex) > :not(.truncate)`,`${e} .min-w-0:not(.flex) > .text-xs`,`${e} .min-w-0:not(.flex) > .text-token-text-secondary`,`${e} .min-w-0:not(.flex) > .text-token-text-tertiary`]),Jn=x({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function ql(e){return`${e.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Qm(e){return`${e.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function ef(){return`${Zm.join(",")}{margin-block:auto!important}`}function tf(){return`${Jm.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function jl(){let e=Jn.store.hideUsername!==!1,t=Jn.store.hideEmail!==!1,n=e&&Jn.store.enlargePlan!==!1,o=e&&Jn.store.alignPlanWithAvatar===!0,r=[];if(e&&(o?(r.push(Qm([...Ym,...zl])),r.push(ef())):r.push(ql(Wm))),t&&r.push(ql(Xm)),n&&r.push(tf()),!r.length){y(Bi);return}E(Bi,r.join(`
`))}var Gl=p({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[h.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Jn,start:jl,onSettingsChange:jl,stop(){y(Bi)}});var Kl=`#bloom-rt-host {
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
`;var Wl=new v("RecentTopics"),Bt="bloom-rt-host",Yl="home",Xl=/^\/c\/([a-z0-9_-]{8,})/i,of=/\/c\/([a-z0-9_-]{8,})/i,Jl=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,rf=new Set(["Backquote","IntlBackslash"]),af=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),sf=140,lf=[3,4,5,6,7,8,9,10,11,12].map(e=>({label:String(e),value:String(e),default:e===5})),P=x({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:lf},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),vr=null,$i=null,q=!1,oo=!1,Zn=!1,ce=0,tt="",It=null,Qn=null,Ot,Di=null;function cf(){let e=Number(P.store.maxRecent??5);return Number.isFinite(e)&&e>=3&&e<=12?e:5}function eo(){let e=P.plain.visits;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function _i(){let e=P.plain.titles;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Zl(){let e=P.plain.previews;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function qi(){let e=P.plain.projects;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Er(e){let t=cf();return e.length>t?e.slice(0,t):e}function de(e){return e===Yl}function to(e,t=sf){let n=e.replace(/\s+/g," ").trim();return n.length<=t?n:`${n.slice(0,t-1)}\u2026`}function ji(e){if(!e)return"";try{return new URL(e,location.origin).pathname.match(Xl)?.[1]??""}catch{return e.match(of)?.[1]??""}}function nt(){let e=(location.pathname||"/").match(Xl);if(e?.[1])return e[1];let n=_().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return Yl}function Fi(e){if(de(e))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${e}"]`);for(let o of n){if(ji(o.getAttribute("href")||"")!==e)continue;let r=to(o.textContent||"",80);if(r)return r}}catch{}let t=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return nt()===e&&t&&!/^ChatGPT$/i.test(t)?to(t,80):""}function df(e){if(de(e))return"New chat";let t=_i()[e];if(t)return t;let n=kt(e);return n||Fi(e)||"Chat"}function uf(e){return qi()[e]||""}function mf(e){return Zl()[e]||{}}function zi(e,t){if(!e||de(e)||!t||/^new chat$/i.test(t.trim()))return;let n=_i();n[e]!==t&&(n[e]=t,P.store.titles=n)}function ff(e){e.type==="conversation-meta"&&(zi(e.conversationId,e.title),q&&Dt())}function pf(e,t){if(!e||de(e)||!t)return;let n=qi();n[e]!==t&&(n[e]=t,P.store.projects=n)}function gf(e,t){if(!e||de(e)||!t.user&&!t.assistant)return;let n=Zl(),o=n[e]||{},r={user:t.user||o.user,assistant:t.assistant||o.assistant};o.user===r.user&&o.assistant===r.assistant||(n[e]=r,P.store.previews=n)}function Gi(e){if(!e||de(e)&&P.store.includeHome===!1)return;let t=eo().filter(n=>n!==e);t.unshift(e),P.store.visits=Er(t)}function wr(){let e=P.store.includeHome!==!1;return Er(eo().filter(n=>e||!de(n))).map(n=>({id:n,title:df(n),project:uf(n),preview:mf(n)}))}function Ul(e){try{let t=document.querySelectorAll(`[data-message-author-role="${e}"]`),n=t[t.length-1];if(!(n instanceof HTMLElement))return"";let o=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||o.push(a)}let r=o.length?o.join(" "):n.textContent||"";return to(r)}catch{return""}}function no(e){if(!e||de(e)||e!==nt())return;let t=Fi(e);t&&zi(e,t);let n=Ul("user"),o=Ul("assistant");gf(e,{user:n,assistant:o});let r=ec(e);if(r){let i=Ql(r);i&&pf(e,i)}}function Ki(){let e=_i(),t=qi(),n=[],o=new Set,r=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${Bt}, #bloom-root, #bloom-sidebar-panel`))continue;let d=ji(c.getAttribute("href")||"");if(!d||o.has(d))continue;o.add(d),n.push(d);let u=to(c.textContent||"",80);u&&!Jl.test(u)&&e[d]!==u&&(e[d]=u,r=!0);let m=Ql(c);m&&t[d]!==m&&(t[d]=m,i=!0)}}catch{}r&&(P.store.titles=e),i&&(P.store.projects=t);let a=eo(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(P.store.visits=Er([...a,...l]))}function Ql(e){let t=e.parentElement;for(let n=0;n<10&&t;n++){if(t.id==="bloom-rt-host"||t.id==="bloom-root"){t=t.parentElement;continue}let o=t.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),r=to((o instanceof HTMLElement?o.textContent:"")||"",60);if(r&&!Jl.test(r)&&!/^20\d{2}/.test(r)&&r!==e.textContent?.trim()&&t.querySelector('a[href^="/c/"]'))return r;t=t.parentElement}return""}function ec(e){if(de(e)){let t=document.querySelector('[data-testid="create-new-chat-button"]');return t instanceof HTMLAnchorElement?t:document.querySelector('a[href="/"]')}try{for(let t of document.querySelectorAll(`a[href*="/c/${e}"]`))if(ji(t.getAttribute("href")||"")===e)return t}catch{}return null}function bf(e){let t=ec(e);if(t){t.click();return}if(de(e)){location.assign("/");return}location.assign(`/c/${e}`)}function hf(){let e=nt();tt&&tt!==e&&no(tt),tt=e,Gi(e),Ki();let t=Fi(e);t&&zi(e,t),no(e)}function xr(){Ot===void 0&&(Ot=window.setTimeout(()=>{Ot=void 0,hf()},120))}function yf(){It||(It=history.pushState.bind(history),Qn=history.replaceState.bind(history),history.pushState=function(...t){let n=It(...t);return xr(),n},history.replaceState=function(...t){let n=Qn(...t);return xr(),n})}function vf(){It&&(history.pushState=It),Qn&&(history.replaceState=Qn),It=null,Qn=null}function xf(e){return rf.has(e.code)||e.keyCode===192?!0:af.has(e.key)}function tc(e){return e.key==="Control"||e.code==="ControlLeft"||e.code==="ControlRight"}function Ef(e,t){oo=t,Ki(),no(nt()),q=!0,ce=0;try{let n=nt();Gi(n);let o=wr();o.length>1&&(ce=e?o.length-1:1)}catch(n){Wl.error("Failed to open switcher:",n)}Dt()}function Vl(e){let{length:t}=wr();t&&(ce=(ce+(e?-1:1)+t)%t,Dt())}function Ui(){if(!q)return;let e=wr()[ce];q=!1,oo=!1,Dt(),e&&bf(e.id)}function nc(){q&&(q=!1,oo=!1,Dt())}function wf(e){if(tc(e)){Zn=!0;return}if((e.ctrlKey||Zn)&&!e.altKey&&!e.metaKey&&xf(e)&&!e.repeat){e.preventDefault(),e.stopImmediatePropagation();try{q?Vl(e.shiftKey):Ef(e.shiftKey,!0)}catch(n){Wl.error("Hotkey failed:",n)}return}if(q){if(e.key==="Escape"){e.preventDefault(),nc();return}if(e.key==="Enter"&&!e.shiftKey){e.preventDefault(),Ui();return}e.key==="Tab"&&(e.ctrlKey||Zn)&&(e.preventDefault(),Vl(e.shiftKey))}}function Sf(e){tc(e)&&(Zn=!1,q&&oo&&Ui())}function Tf(e){let t=e.target instanceof Element?e.target:null;!t||!t.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(xr)}function Lf(e){!q||(e.target instanceof Element?e.target:null)?.closest(`#${Bt}`)||nc()}function kf(){document.visibilityState==="hidden"&&no(nt())}function Cf(){if(!document.body)return null;let e=document.getElementById(Bt);if(e instanceof HTMLElement)return $i=e,e;e=document.createElement("div"),e.id=Bt;let t=document.createElement("div");return t.className="bloom-rt-panel",t.setAttribute("role","listbox"),t.setAttribute("aria-label","Recent conversations"),t.dataset.visible="false",t.addEventListener("click",n=>n.stopPropagation()),e.append(t),document.body.append(e),$i=e,e}function Dt(){let e=Cf();if(!e)return;let t=e.querySelector(".bloom-rt-panel");if(!t)return;if(!q){t.dataset.visible="false",t.replaceChildren();return}let n=wr();if(!n.length){t.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",t.replaceChildren(i);return}ce>=n.length&&(ce=0);let o=document.createElement("div");o.className="bloom-rt-list",o.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===ce?"true":"false",s.setAttribute("aria-selected",a===ce?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="user",d.textContent=i.preview.user,c.append(d)}if(i.preview.assistant){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="assistant",d.textContent=i.preview.assistant,c.append(d)}s.append(c)}s.addEventListener("click",()=>{ce=a,Ui()}),o.append(s)}),t.replaceChildren(o),t.dataset.visible="true",t.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function Mf(){document.getElementById(Bt)?.remove(),$i=null}var oc=p({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${Bt}`],settings:P,start(){E("recentTopics",Kl),tt=nt(),Gi(tt),Ki(),no(tt),Di=K(ff),yf(),vr=new AbortController;let{signal:e}=vr;window.addEventListener("keydown",wf,{capture:!0,signal:e}),window.addEventListener("keyup",Sf,{capture:!0,signal:e}),window.addEventListener("popstate",xr,{signal:e}),document.addEventListener("click",Tf,{capture:!0,signal:e}),document.addEventListener("click",Lf,{signal:e}),document.addEventListener("visibilitychange",kf,{signal:e})},stop(){vr?.abort(),vr=null,Ot!==void 0&&(clearTimeout(Ot),Ot=void 0),vf(),Di?.(),Di=null,q=!1,oo=!1,Zn=!1,Mf()},onSettingsChange(){let e=Er(eo());e.length!==eo().length&&(P.store.visits=e),q&&Dt()}});var Vi="cleaner",Af=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],Hf=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],Nf=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],Pf=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],Rf=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],If=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],ot=x({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function $t(e){return`${e.join(",")}{display:none!important}`}function rc(){let e=[];if(ot.store.hideDownloadApps!==!1&&e.push($t(Af)),ot.store.hideDisclaimer!==!1&&e.push($t(Hf)),ot.store.hideUpgrade!==!1&&e.push($t(Nf)),ot.store.hideLockedModels!==!1&&e.push($t(Pf)),ot.store.hideHomePromo!==!1&&e.push($t(Rf)),ot.store.hideAds!==!1&&e.push($t(If)),!e.length){y(Vi);return}E(Vi,e.join(`
`))}var ic=p({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[h.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:ot,start:rc,onSettingsChange:rc,stop(){y(Vi)}});var Tr=new v("ResponseNotification"),qt=x({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:jf},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Wi=!1,Sr=null,_t=null,ro=null;function Of(){return document.visibilityState==="hidden"||document.hidden}function Bf(){return qt.store.onlyWhenHidden===!1?!0:Of()}function Df(){let e=kt(L());if(e)return e;let t=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return t&&!/^ChatGPT$/i.test(t)?t:"Chat"}function ac(){try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!_t||_t.state==="closed")&&(_t=new e);let t=_t,n=t.currentTime,o=[523.25,659.25];for(let r=0;r<o.length;r++){let i=t.createOscillator(),a=t.createGain();i.type="sine",i.frequency.value=o[r];let s=n+r*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(t.destination),i.start(s),i.stop(s+.24)}t.resume?.()}catch(e){Tr.debug("chime failed",e)}}function $f(e){try{let t=new Audio(e);t.volume=.7,t.play()}catch(t){Tr.debug("custom sound failed",t),ac()}}function sc(){let e=String(qt.store.soundUrl||"").trim();e?$f(e):ac()}function _f(){let e="Bloom++",t=`${Df()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:e,text:t,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(e,{body:t,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){Tr.debug("notification failed",n)}}function qf(){Bf()&&(qt.store.sound!==!1&&sc(),qt.store.browserNotification!==!1&&_f())}function jf(e){let t=document.createElement("button");return t.type="button",t.textContent="Play",t.addEventListener("click",()=>sc()),e.appendChild(t),()=>{t.remove()}}var lc=p({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:qt,start(){Wi=!0,Sr?.(),Sr=se(e=>{Wi&&(e.userStopped||e.error||qf())}),ro?.abort(),ro=new AbortController,qt.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:ro.signal}),Tr.debug("watch started")},stop(){Wi=!1,Sr?.(),Sr=null,ro?.abort(),ro=null;try{_t?.close()}catch{}_t=null}});var cc=`#bloom-pq-chip {
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
`;var lo=new v("PromptQueue"),Xi="bloom-pq-chip",dc="promptQueue",uc=80,zf=50,Gf=2e3,gc=x({replacePending:{type:2,description:"Replace the queued prompt if you Enter again while one is waiting.",default:!0}}),I=new Map,ye=!1,Z="",R="",De=!1,Q=!1,M=null,io=null,Lr=null,so,ao,jt=null;function Ft(){return re(_())}function zt(e){return e.replaceAll("\u200B","").replace(/\n$/,"").trim()}function mc(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(oe);return n instanceof HTMLElement?n:D()}function Ji(e){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation()}function bc(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function Kf(){try{let e=document.querySelectorAll('[data-message-author-role="user"]'),t=e[e.length-1];return t instanceof HTMLElement?zt(t.innerText||t.textContent||""):""}catch{return""}}function Uf(e,t){if(!e||e===t)return!1;if(e.endsWith("|draft")&&!t.endsWith("|draft"))return!0;try{let n=e.split("|")[0],o=t.split("|")[0],r=new URL(n).pathname.replace(/\/$/,"")||"/",i=new URL(o).pathname.replace(/\/$/,"")||"/";if((r==="/"||r==="")&&i.startsWith("/c/"))return!0}catch{}return!1}function fc(e){if(!Z||Z===e)return;let t=I.get(Z);!t||I.has(e)||Uf(Z,e)&&(I.delete(Z),I.set(e,t),R===Z&&(R=e),M?.key===Z&&(M.key=e),lo.debug("migrated pending",Z,"\u2192",e))}function Zi(e){let t=Ft();if(I.get(t)&&gc.store.replacePending===!1)return;I.set(t,{text:e,at:Date.now()}),M={key:t,text:e,turns:bc(),ticks:3};let o=D();o&&be(o,""),Be(),lo.debug("queued",t,e.length)}function Vf(e){I.delete(e),R===e&&(R=""),M?.key===e&&(M=null),Be()}function Wf(){Q=!0,clearTimeout(ao),ao=setTimeout(()=>{Q=!1,ao=void 0},Gf)}function Yf(){let e=Ft(),t=I.get(e);if(!t)return;let n=D();if(!n)return;I.delete(e),R="",Be(),Wf(),be(n,t.text);let o=Re();o&&!C(o)&&!rr(o)&&(o.click(),Q=!1)}function pc(e){if(!ye||De||H()||Ft()!==e)return;let t=I.get(e);if(!t){R="";return}if(W())return;let n=D();if(!n)return;if(!Pe(n)){let r=zt(G(n));if(r&&r!==t.text)return}let o=Re();!o||C(o)||rr(o)||(De=!0,be(n,t.text),clearTimeout(so),so=setTimeout(()=>Xf(e,t.text),zf))}function Xf(e,t){so=void 0;try{if(!ye)return;let n=I.get(e);if(!n||n.text!==t||H()||Ft()!==e)return;let o=D();if(!o)return;let r=zt(G(o));if(r&&r!==t&&!Pe(o))return;r!==t&&be(o,t);let i=Re();if(!i||C(i)||rr(i))return;i.click(),I.delete(e),R="",Be(),lo.debug("drained",e)}finally{De=!1}}function hc(e){let t=V();if(!t||t===document.body){e.style.left="50%",e.style.bottom="6.5rem";return}let n=t.getBoundingClientRect();e.style.left=`${Math.round(n.left+n.width/2)}px`,e.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`;let o=Math.min(512,Math.max(160,n.width-24));e.style.maxWidth=`${Math.round(o)}px`}function Yi(){jt?.remove(),jt=null}function Be(){if(!ye||!document.body){Yi();return}let e=Ft(),t=I.get(e);if(!t){Yi();return}let n=jt;n?.isConnected||(n=document.createElement("div"),n.id=Xi,document.body.appendChild(n),jt=n),n.replaceChildren();let o=document.createElement("span");o.className="bloom-pq-kicker",o.textContent="Next";let r=document.createElement("span");r.className="bloom-pq-text";let i=t.text.length>uc?`${t.text.slice(0,uc)}\u2026`:t.text;r.textContent=i,r.title=t.text;let a=document.createElement("div");a.className="bloom-pq-actions";let s=document.createElement("button");s.type="button",s.className="bloom-pq-btn bloom-pq-send",s.textContent="Send now",s.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),Yf()});let l=document.createElement("button");l.type="button",l.className="bloom-pq-btn bloom-pq-x",l.setAttribute("aria-label","Dismiss queued prompt"),l.textContent="\xD7",l.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),Vf(e)}),a.append(s,l),n.append(o,r,a),hc(n)}function Jf(){if(!M)return;if(M.ticks-=1,I.get(M.key)&&bc()>M.turns){let t=Kf();if(t&&t===M.text){lo.debug("native send leaked; dropping pending"),I.delete(M.key),R===M.key&&(R=""),M=null,Be();return}}M.ticks<=0&&(M=null)}function Zf(e){if(!ye||e.isComposing||e.keyCode===229||e.key!=="Enter"||e.shiftKey||e.ctrlKey||e.metaKey||De)return;let t=mc(e.target)??mc(document.activeElement);if(!t||!H())return;if(e.altKey||Q){Q=!1;return}if(!z(t))return;let n=zt(G(t));n&&(Ji(e),Zi(n))}function Qf(e){let t=e.closest("button");if(!(t instanceof HTMLElement)||C(t))return null;let n=e.closest(wt);if(n instanceof HTMLElement&&!C(n))return n;let o=Re();return o&&(t===o||o.contains(t)||t.contains(o))?o:null}function ep(e){if(!ye)return;let t=e.target;if(!(t instanceof Element)||t.closest(`#${Xi}`))return;let n=t.closest("button");if(n instanceof HTMLElement&&C(n)||De||!H()||!Qf(t))return;if(Q){Q=!1;return}let o=D();if(!o||!z(o))return;let r=zt(G(o));r&&(Ji(e),Zi(r))}function tp(e){if(!ye)return;let t=e.target;if(!(t instanceof HTMLFormElement)||!t.matches(or)&&!t.querySelector(oe)||De||!H())return;if(Q){Q=!1;return}let n=D()??t.querySelector(oe);if(!n||!z(n))return;let o=zt(G(n));o&&(Ji(e),Zi(o))}var yc=p({name:"PromptQueue",description:"Queue the next prompt while a reply is streaming. Enter/Send waits for this turn instead of interrupting.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:dc,cleanupSelectors:[`#${Xi}`],settings:gc,start(){ye=!0,Z=Ft(),R="",De=!1,Q=!1,M=null,E(dc,cc),io?.abort(),io=new AbortController;let{signal:e}=io;window.addEventListener("keydown",Zf,{capture:!0,signal:e}),document.addEventListener("click",ep,{capture:!0,signal:e}),document.addEventListener("submit",tp,{capture:!0,signal:e}),Lr?.(),Lr=se({onFall(t){if(ye){if(t.userStopped||t.error){R="",Be();return}R=t.contextKey,pc(t.contextKey)}},onContext(t){fc(t),Z=t,Be()},onTick(t){fc(t.contextKey),Z=t.contextKey,Jf(),R&&R===t.contextKey&&pc(R),jt&&hc(jt)}}),Be(),lo.debug("watch started")},stop(){ye=!1,Lr?.(),Lr=null,io?.abort(),io=null,clearTimeout(so),so=void 0,clearTimeout(ao),ao=void 0,I.clear(),M=null,R="",De=!1,Q=!1,Yi()}});var vc=`.bloom-cls {
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
`;var wc=new v("ChatListStatus"),xc="chatListStatus",Mr="bloom-cls",op="bloom-cls",rp=1200*1e3,ip="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",ue=new Map,xe=!1,Gt="",ve=!1,Ut=0,$e=null,ta=null,Kt=null,Qi=null,kr=null,Vt=!1,Wt=new Set;function Cr(){return Date.now()}function Sc(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function rt(e,t,n,o=!0){if(!(!e||!xe)){if(t==="idle")ue.delete(e);else{let r=ue.get(e);r&&r.kind===t&&n!=="net"?r.at=Cr():ue.set(e,{kind:t,at:Cr(),source:n})}o&&ap({v:1,id:e,kind:t,at:Cr()}),co()}}function ap(e){try{Kt?.postMessage(e)}catch{}}function sp(e){let t=e.data;!t||t.v!==1||!t.id||t.kind!=="streaming"&&t.kind!=="done"&&t.kind!=="error"&&t.kind!=="idle"||rt(t.id,t.kind,"bc",!1)}function lp(){let e=Cr();for(let[t,n]of ue)n.kind==="streaming"&&e-n.at>rp&&ue.delete(t)}function cp(){let e=Sc();if(!e)return[];let t=[],n=new Set;try{for(let o of e.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(o.closest(ip))continue;let r=Tt(o.getAttribute("href")||"");!r||n.has(r)||(n.add(r),t.push(o))}}catch{}return t}function Ec(e){let t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),e==="streaming")t.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("cx","12"),o.setAttribute("cy","12"),o.setAttribute("r","9"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","2"),t.appendChild(o)}return t.appendChild(n),t}function ea(e){let t=e.querySelector(`:scope > .${Mr}`);return t||null}function dp(){if(!xe)return;lp();let e=L(),t=cp();$e?.disconnect();try{for(let n of t){let o=Tt(n.getAttribute("href")||"");if(!o||!e||o!==e){ea(n)?.remove();continue}let i=ue.get(o)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){ea(n)?.remove();continue}let a=ea(n);a||(a=document.createElement("span"),a.className=Mr,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(Ec("streaming")):i==="error"&&a.appendChild(Ec("error")))}}catch(n){wc.debug("paint failed",n)}Tc()}function co(){!xe||Ut||(Ut=requestAnimationFrame(()=>{Ut=0,xe&&dp()}))}function Tc(){let e=Sc();if(!($e&&ta===e&&e?.isConnected)){if($e?.disconnect(),ta=e,!e){$e=null;return}$e=new MutationObserver(()=>co()),$e.observe(e,{childList:!0,subtree:!0})}}function na(){return!!(Ve()||Fn())}function up(e){return!!(Vt||e&&Wt.has(e)||na())}function mp(e){if(xe){if(e.type==="post-start"){e.conversationId?(Vt=!1,Wt.add(e.conversationId),ve=!0,rt(e.conversationId,"streaming","net")):(Vt=!0,ve=!0);return}e.type==="post-end"&&(Vt=!1,e.conversationId&&(Wt.delete(e.conversationId),rt(e.conversationId,e.error?"error":"done","net")),na()||(ve=!1))}}function fp(){if(!xe)return;let e=L();if(!(Vt||e&&Wt.has(e))){if(ve=!1,e&&ue.get(e)?.kind==="streaming"&&ue.get(e)?.source==="local"){rt(e,"idle","local");return}co()}}function pp(e){if(!xe)return;let t=e.conversationId||L();if(Gt&&t&&Gt!==t){let o=ue.get(Gt);o?.kind==="streaming"&&o.source==="local"&&rt(Gt,W()?"error":"done","local"),ve=!!(t&&Wt.has(t))}if(Gt=t,up(t)&&(e.streaming||na())){ve=!0,t&&rt(t,"streaming","local"),co();return}ve&&(ve=!1,t&&rt(t,W()?"error":"done","local")),co()}var Lc=p({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Mr}`],start(){xe=!0,E(xc,vc);try{Kt=new BroadcastChannel(op)}catch{Kt=null}Kt?.addEventListener("message",sp),Qi=K(mp),kr?.(),kr=se({onTick:pp,onContext:fp}),Tc(),wc.debug("sidebar status watch started")},stop(){xe=!1,Ut&&cancelAnimationFrame(Ut),Ut=0,$e?.disconnect(),$e=null,ta=null,kr?.(),kr=null,Qi?.(),Qi=null;try{Kt?.close()}catch{}Kt=null,ue.clear(),Wt.clear(),Vt=!1,ve=!1,Gt="",document.querySelectorAll(`.${Mr}`).forEach(e=>e.remove()),y(xc)}});var Cc="widerChat",Mc=40,Ac=96,Hc=64,Nc=x({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:Mc,max:Ac,default:Hc}});function gp(){return pe(Number(Nc.store.width??Hc),Mc,Ac)}function kc(){let e=gp(),t=`min(100%,${e}rem)`;E(Cc,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important;--user-chat-width:${e}rem!important;--composer-container-max-width:${e}rem!important;--thread-xl-max-width:${e}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${t}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${t}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${t}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${t}!important}`)}var Pc=p({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[h.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Nc,start:kc,onSettingsChange:kc,stop(){y(Cc)}});var oa="composerOpacity",Yt='form[data-type="unified-composer"],form.w-full[data-type]',bp=[`${Yt} [class*="corner-superellipse"]`,`${Yt} [class*="bg-token-bg-primary"]`,`${Yt} [class*="bg-token-main-surface"]`].join(","),hp=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),yp="#thread-bottom-container,#thread-bottom",vp=`${Yt} #prompt-textarea,${Yt} [contenteditable="true"]`,xp="var(--bg-primary,var(--main-surface-primary,#ffffff))",ra=x({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function Ep(){return pe(Number(ra.store.opacity??100),0,100)}function wp(){return pe(Number(ra.store.blur??16),0,40)}function Rc(){let e=Ep();if(e>=100){y(oa);return}let t=wp(),n=`color-mix(in srgb,${xp} ${e}%,transparent)`,o=t>0?`-webkit-backdrop-filter:blur(${t}px)!important;backdrop-filter:blur(${t}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";E(oa,`${yp}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${hp}{display:none!important}${Yt}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${bp}{background-color:${n}!important;background-image:none!important;${o}}${vp}{background-color:transparent!important;background-image:none!important}`)}var Ic=p({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[h.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:ra,start:Rc,onSettingsChange:Rc,stop(){y(oa)}});var Oc=`#bloom-bn-host {
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
`;var Tp=new v("BetterNavigator"),ia="betterNavigator",Bc="bloom-bn-host",la=60,Lp=16,kp=1e3,Cp=2.5,Mp=.4,Hr="\u6B63\u5728\u8F93\u51FA\u2026",Ap=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),Hp=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='thinking']","[class*='reasoning']","[class*='footnote']",".sr-only"].join(", "),Np=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),Or=x({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),Xt=new Map,Jt=new Set,me=!1,st=!1,_e=null,go=null,lt=null,Nr=null,O=[],ct="",Pr=0,Rr=-1,fa=0,Ir="",Zt=0,Qt=0,uo,mo=null,Ar=null,aa=null,sa=null,it=null,ca=null,fo=null,at=null,en=null,po=null;function Br(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function Pp(e){try{return!!e.closest(Ap)}catch{return!0}}function Rp(e){let t=(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||e.getAttribute("data-turn")||"").toLowerCase();if(t==="user"||t==="assistant")return t;let n=(e.getAttribute("aria-label")||"").toLowerCase();return n.includes("you said")?"user":n.includes("chatgpt said")||n.includes("assistant said")?"assistant":null}function Dc(e){let t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode(r){let i=r.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(i.closest(Hp))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return(r.textContent||"").replace(/\s+/g," ").trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),o;for(;(o=n.nextNode())&&t.join(" ").length<la+20;)t.push((o.textContent||"").replace(/\s+/g," ").trim());return t.join(" ").replace(/\s+/g," ").trim()}function Ip(e,t){try{if(e.querySelector("img, picture, video, canvas"))return"Image";if(e.querySelector("a[download], [class*='attachment']"))return"File";if(e.querySelector("pre, code"))return"Code"}catch{}return`Message ${t+1}`}function Op(e,t){let n=t==="user"?e.querySelector(".whitespace-pre-wrap")??e:e.querySelector(".markdown")??e;return Dc(n)}function Bp(e){return e.length>la?`${e.slice(0,la).trimEnd()}\u2026`:e}function Dp(e,t,n,o){let r=Op(e,t);return r?Bp(r):o?Hr:Ip(e,n)}function $p(){if(st)return!0;let e=L();return!!(e&&Jt.has(e)||Ve()||Fn())}function _p(e){try{if(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")||e.querySelector("[aria-busy='true'], .result-streaming"))return!0;let t=e.querySelector(".markdown");if((!t||t instanceof HTMLElement&&!Dc(t))&&e.querySelector("[class*='thinking'], [class*='reasoning'], details"))return!0}catch{}return!1}function qp(){let e=Br();if(!e||e===document.body)return[];let t=Or.store.showAssistant!==!1,n=t&&$p(),o=[];try{for(let r of e.querySelectorAll("[data-message-id]")){if(Pp(r))continue;let i=r.getAttribute("data-message-id")||"";if(!i)continue;let a=Rp(r);if(a!=="user"&&a!=="assistant"||a==="assistant"&&!t)continue;let s=a==="assistant"&&n&&_p(r),l=Dp(r,a,o.length,s);l&&l!==Hr&&l!==Xt.get(i)&&Xt.set(i,l);let c=s&&l===Hr?Hr:Xt.get(i)||l;o.push({id:i,el:r,role:a,text:c,live:s})}}catch{}return o}function jp(){let t=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(t,48),88)}function $c(e){let t=e;for(;t&&t!==document.body&&t!==document.documentElement;){let o=getComputedStyle(t).overflowY;if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight+8)return t;t=t.parentElement}return window}function Fp(e){return e===window?window.innerHeight:e.clientHeight}function zp(e){let t=e instanceof Element?e:e instanceof Node?e.parentElement:null;if(!t)return!1;try{return!!t.closest(Np)}catch{return!1}}function _c(){uo!==void 0&&(clearTimeout(uo),uo=void 0),mo?.classList.remove("bloom-bn-flash"),mo=null}function Gp(e){_c(),e.classList.add("bloom-bn-flash"),mo=e,uo=setTimeout(()=>{e.classList.remove("bloom-bn-flash"),mo===e&&(mo=null),uo=void 0},800)}function da(e){if(!O.length)return;let t=Math.max(0,Math.min(e,O.length-1));Pr=t,go?.querySelectorAll(".bloom-bn-tick").forEach((o,r)=>{o.classList.toggle("bloom-bn-current",r===t)}),lt?.querySelectorAll(".bloom-bn-item").forEach((o,r)=>{o.classList.toggle("bloom-bn-active",r===t)}),Nr&&(Nr.textContent=`${t+1} / ${O.length}`);let n=lt?.children[t];if(n instanceof HTMLElement){let o=lt;if(o){let r=n.offsetTop-o.clientHeight/2+n.offsetHeight/2;o.scrollTop=Math.max(0,r)}}}function ua(e){let t=O[e];if(!t?.el.isConnected)return;Rr=e,fa=Date.now()+kp,da(e);let n=en??$c(t.el),r=Math.abs(t.el.getBoundingClientRect().top-jp())>Cp*Fp(n);t.el.scrollIntoView({behavior:r?"auto":"smooth",block:"start"}),Or.store.jumpEffect!=="none"&&Gp(t.el)}function pa(){if(!me||!O.length)return;if(Date.now()<fa&&Rr>=0){da(Rr);return}let e=window.innerHeight*Mp,t=0;for(let n=0;n<O.length;n++){let o=O[n].el;o.isConnected&&o.getBoundingClientRect().top<=e&&(t=n)}da(t)}function Kp(e){let t=$c(e);if(en===t&&po)return;po?.(),en=t;let n=t===window?document:t,o=()=>{pa(),ga()};n.addEventListener("scroll",o,{passive:!0}),po=()=>n.removeEventListener("scroll",o)}function Up(e){at?.disconnect(),at=null;let t=en instanceof HTMLElement?en:null;at=new IntersectionObserver(()=>pa(),{root:t,threshold:[0,.15,.4,.75,1]});for(let n of e)n.el.isConnected&&at.observe(n.el)}function Vp(){if(!document.body)return null;let e=_e;if(e?.isConnected)return e;e=document.createElement("div"),e.id=Bc,e.className="bloom-bn-host",e.setAttribute("role","navigation"),e.setAttribute("aria-label","Conversation outline"),e.hidden=!0;let t=document.createElement("div");t.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let o=document.createElement("div");o.className="bloom-bn-card";let r=document.createElement("div");r.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",o.append(r,i),n.appendChild(o),e.append(t,n),document.body.appendChild(e),_e=e,go=t,lt=i,Nr=r,e}function qc(){let e=_e,t=Br();if(!e||!t||!t.isConnected||O.length<1){e&&(e.hidden=!0);return}let n=t.getBoundingClientRect(),o=document.getElementById("thread-bottom-container"),r=document.getElementById("page-header"),i=Math.max(n.top+8,r?.getBoundingClientRect().bottom??0,8),a=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),s=a-i;if(s<96||n.width<160){e.hidden=!0;return}let l=window.innerWidth-n.right,c=l>=22?Math.max(8,l-16):8;e.hidden=!1,e.style.top=`${Math.round((i+a)/2)}px`,e.style.height="auto",e.style.maxHeight=`${Math.round(s)}px`,e.style.right=`${Math.round(c)}px`,e.style.setProperty("--bloom-bn-cap",`${Math.round(s)}px`)}function ga(){!me||Qt||(Qt=requestAnimationFrame(()=>{Qt=0,me&&qc()}))}function Wp(e){let t=["bloom-bn-tick"];return e.role==="assistant"&&t.push("bloom-bn-tick-asst"),e.live&&t.push("bloom-bn-tick-live"),t.join(" ")}function Yp(e){let t=go,n=lt;!t||!n||(t.replaceChildren(),n.replaceChildren(),t.classList.toggle("bloom-bn-dense",e.length>Lp),e.forEach((o,r)=>{let i=document.createElement("button");i.type="button",i.className=Wp(o),i.setAttribute("aria-label",`Go to message ${r+1} of ${e.length}`),i.addEventListener("click",c=>{c.preventDefault(),ua(r)}),t.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${o.role}`;let s=document.createElement("span");s.className="bloom-bn-mark",s.textContent=o.role==="user"?"You":"GPT";let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=o.text,l.title=o.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),ua(r)}),n.appendChild(a)}))}function Xp(e){go?.querySelectorAll(".bloom-bn-tick").forEach((t,n)=>{t.classList.toggle("bloom-bn-tick-live",!!e[n]?.live)}),e.forEach((t,n)=>{let r=lt?.children[n]?.querySelector(".bloom-bn-label");r&&r.textContent!==t.text&&(r.textContent=t.text,r instanceof HTMLElement&&(r.title=t.text))})}function Jp(){let e=L();return e===Ir?!1:(Ir=e,Xt.clear(),O=[],ct="",Pr=0,Rr=-1,fa=0,st&&e&&(Jt.add(e),st=!1),!0)}function Zp(e){let t=Or.store.showAssistant!==!1?"1":"0";return`${Ir}|${t}|${e.map(n=>n.id).join(",")}`}function Qp(){if(!me)return;Jp();let e=qp(),t=Br();if(!t||e.length<1){O=e,ct="",_e&&(_e.hidden=!0),at?.disconnect(),ma();return}Vp();let n=Zp(e);n!==ct?(O=e,ct=n,Yp(e),Kp(t),Up(e)):(O=e,Xp(e)),qc(),pa(),ma()}function Ee(){!me||Zt||(Zt=requestAnimationFrame(()=>{Zt=0,me&&Qp()}))}function ma(){let e=Br();if(!(it&&ca===e&&e?.isConnected)){if(it?.disconnect(),fo?.disconnect(),ca=e,!e||e===document.body){it=null;return}it=new MutationObserver(()=>Ee()),it.observe(e,{childList:!0,subtree:!0}),fo=new ResizeObserver(()=>ga()),fo.observe(e)}}function eg(e){if(me){if(e.type==="post-start"){e.conversationId?(st=!1,Jt.add(e.conversationId)):st=!0,Ee();return}if(e.type==="post-end"){if(st=!1,e.conversationId)Jt.delete(e.conversationId);else{let t=L();t&&Jt.delete(t)}Ee()}}}function tg(e){if(!me||!O.length||_e?.hidden||e.altKey||e.ctrlKey||e.metaKey||zp(e.target))return;let t=-1;if(e.key==="ArrowDown")t=Pr+1;else if(e.key==="ArrowUp")t=Pr-1;else if(e.key==="Home")t=0;else if(e.key==="End")t=O.length-1;else if(e.key==="Escape"){document.activeElement?.blur?.();return}else return;e.preventDefault(),ua(Math.max(0,Math.min(t,O.length-1)))}function ng(){_c(),at?.disconnect(),at=null,it?.disconnect(),it=null,ca=null,fo?.disconnect(),fo=null,po?.(),po=null,en=null,_e?.remove(),_e=null,go=null,lt=null,Nr=null}var jc=p({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:ia,cleanupSelectors:[`#${Bc}`],settings:Or,start(){me=!0,Ir=L(),E(ia,Oc),Ar=new AbortController;let{signal:e}=Ar;window.addEventListener("keydown",tg,{signal:e}),window.addEventListener("popstate",Ee,{signal:e}),window.visualViewport?.addEventListener("resize",ga,{signal:e}),sa=K(eg),aa=se({onTick(){Ee()},onFall(){Ee()},onContext(){Xt.clear(),ct="",Ee()}}),ma(),Ee(),Tp.debug("navigator started")},stop(){me=!1,Zt&&cancelAnimationFrame(Zt),Zt=0,Qt&&cancelAnimationFrame(Qt),Qt=0,Ar?.abort(),Ar=null,aa?.(),aa=null,sa?.(),sa=null,Jt.clear(),st=!1,ng(),Xt.clear(),O=[],ct="",y(ia)},onSettingsChange(){ct="",Ee()}});var Fc=`.bloom-ts {
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
`;function zc(e,t,n=Date.now()){let o=new Date(e);if(Number.isNaN(o.getTime()))return"";let r=new Date(n),i=o.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(o.toDateString()===r.toDateString()||!t)return i;let s=o.getFullYear()===r.getFullYear();return`${o.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Gc(e){try{return new Date(e).toISOString()}catch{return""}}var Wc=new v("MessageTimestamps"),Kc="messageTimestamps",Dr="bloom-ts",Uc=1500,rg="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",on=x({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),rn=new Map,an=!1,nn=0,tn,qe=null,ha=null,ba=null,Vc=!1;function Yc(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function ya(){let e=on.plain.stamps;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Xc(){let e={...ya()};for(let[n,o]of rn)e[n]=o;let t=Object.keys(e);if(t.length>Uc){let n=t.slice(t.length-Uc),o={};for(let r of n)o[r]=e[r];on.store.stamps=o;return}on.store.stamps=e}var ig=_a(Xc,500);function Jc(e,t){!e||!t||rn.get(e)===t||(rn.set(e,t),ig(),bo())}function ag(e){return e?rn.get(e)??ya()[e]??dr(e)??null:null}function sg(e){an&&e.type==="message-time"&&Jc(e.messageId,e.createTime)}function lg(e){return(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function cg(){let e=Yc();if(!e)return[];let t=[];try{for(let n of e.querySelectorAll("[data-message-id]"))n.closest(rg)||t.push(n)}catch{}return t}function dg(e){try{return!!e.querySelector("time:not(.bloom-ts)")}catch{return!1}}function ug(){if(!an)return;let e=on.store.hideOwnMessages===!0,t=on.store.showDate!==!1,n=H(),o=cg();qe?.disconnect();try{o.forEach((r,i)=>{let a=r.getAttribute("data-message-id")||"",s=lg(r),l=r.querySelector(`:scope > .${Dr}`);if(e&&s==="user"){l?.remove();return}if(dg(r)){l?.remove();return}let c=ag(a);if(!c&&a&&(n||Vc)&&i>=o.length-2&&(c=Date.now(),Jc(a,c)),!c){l?.remove();return}let d=zc(c,t);if(!d){l?.remove();return}let u=l;u||(u=document.createElement("time"),u.className=Dr,u.setAttribute("aria-hidden","true"),r.insertBefore(u,r.firstChild)),u.textContent!==d&&(u.textContent=d);let m=Gc(c);m&&u.getAttribute("datetime")!==m&&u.setAttribute("datetime",m)})}catch(r){Wc.debug("paint failed",r)}Vc=n,Zc()}function bo(){!an||nn||(nn=requestAnimationFrame(()=>{nn=0,an&&ug()}))}function Zc(){let e=Yc();if(!(qe&&ha===e&&e?.isConnected)){if(qe?.disconnect(),ha=e,!e||e===document.body){qe=null;return}qe=new MutationObserver(()=>bo()),qe.observe(e,{childList:!0,subtree:!0})}}var Qc=p({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Dr}`],settings:on,start(){an=!0,E(Kc,Fc);let e=ya();for(let[t,n]of Object.entries(e))typeof n=="number"&&n>0&&rn.set(t,n);ba=K(sg),Zc(),tn!==void 0&&clearInterval(tn),tn=setInterval(bo,800),bo(),Wc.debug("timestamp watch started")},stop(){an=!1,nn&&cancelAnimationFrame(nn),nn=0,tn!==void 0&&(clearInterval(tn),tn=void 0),qe?.disconnect(),qe=null,ha=null,ba?.(),ba=null,Xc(),rn.clear(),document.querySelectorAll(`.${Dr}`).forEach(e=>e.remove()),y(Kc)},onSettingsChange:bo});var va="streamerMode",mg="filter:blur(6px)!important;transition:filter .2s ease",fg="filter:none!important",ho=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],sn=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function ee(e,t){return e.map(n=>`${n} ${t}`)}var dt=x({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function ln(e,t=!0){let n=e.join(","),o=e.map(r=>`${r}:hover`).join(",");return`${n}{${mg}}${t?`${o}{${fg}}`:""}`}function ed(){let e=[];if(dt.store.conversations!==!1&&(e.push(ln([...ee(sn,'a[href^="/c/"]'),...ee(sn,'a[href*="/c/"]')])),e.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),dt.store.projects!==!1&&(e.push(ln([...ee(sn,'a[href*="/project"]'),...ee(sn,'a[href*="/g/g-p-"]'),...ee(sn,'[data-testid="project-name"]'),...ee(sn,'[data-testid="project-link"]')])),e.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),dt.store.headerTitle!==!1&&e.push(ln(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),dt.store.accountAvatar!==!1&&e.push(ln([...ee(ho,"img"),...ee(ho,'[class*="avatar"]')],!1)),dt.store.accountName!==!1&&e.push(ln([...ee(ho,".min-w-0 > .truncate"),...ee(ho,".min-w-0.flex-1 .truncate")],!1)),dt.store.accountEmail!==!1&&e.push(ln([...ee(ho,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),e.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),e.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!e.length){y(va);return}E(va,e.join(`
`))}var td=p({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[h.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:dt,start:ed,onSettingsChange:ed,stop(){y(va)}});var nd=`.bloom-gc-panel {
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
}`;var gg=new v("GreetingCustomizer"),cn="greetingCustomizer",od="greetingCustomizerUi",yo=100,Ea=30,bg=120,hg=1e3,yg=50,vg=40,xg=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),vo=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),Fr=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function Eg(e){return!!e?.closest(xg)}function sd(e){return!!(Eg(e)||e.closest('[data-testid="temporary-chat-label"]')||e.closest("[hidden]")||e.getAttribute("aria-hidden")==="true"||e.classList.contains("sr-only"))}function ko(e){try{for(let t of document.querySelectorAll(e))if(!sd(t))return t}catch{}return null}function xa(e){for(let t of e.split(",").map(n=>n.trim()).filter(Boolean))if(ko(t))return t;return e}var ld=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],B=x({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:Dg},greetings:{type:0,description:"Greeting texts",hidden:!0,default:ld},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),fe=!1,mn=!1,mt=null,_r,xo,dn,Eo,qr=0,$r=null,un=null,wo=null,So=null,To=null,jr=null;function Se(){let e=location.pathname||"/";return e==="/"||e===""}function ut(){let e=B.plain.greetings;return Array.isArray(e)?e.filter(t=>typeof t=="string"):ld.slice()}function Lo(e){return String(e??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function rd(e){B.store.greetings=e.slice(0,Ea)}function Co(){let e=String(B.store.mode??"refresh");return e==="interval"||e==="manual"?e:"refresh"}function wg(){return B.store.order==="random"?"random":"sequential"}function Sg(){return pe(Number(B.store.intervalSec??10),1,3600)*1e3}function Tg(e){return String(e??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Lg(){return!!ko(Fr)}function zr(){return!!(ko(Fr)||ko(vo))}function kg(e,t){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),o=[`content:"${e}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),r=Lg()?xa(Fr):ko(vo)?xa(vo):xa(Fr),i=t?`${vo}{cursor:pointer!important;user-select:none!important}`:"";return[`${r}{${n}}`,`${r}::before{${o}}`,i,`@media (max-width:768px){${r}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function Cg(e,t){if(e<=0)return 0;if(e===1)return Number(B.plain.index)!==0&&(B.store.index=0),Number(B.plain.lastRandom)!==0&&(B.store.lastRandom=0),0;let n=Number(B.plain.index),o=Number(B.plain.lastRandom);if(!t)return n>=0&&n<e?n:0;if(wg()==="random"){let a=n>=0&&n<e?n:o,s=Math.floor(Math.random()*e),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*e);return B.store.index=s,B.store.lastRandom=s,s}let i=((n>=-1&&n<e?n:-1)+1)%e;return B.store.index=i,i}function we(e){if(!fe)return;if(!Se()){y(cn);return}let t=ut().map(Lo).filter(Boolean);if(!t.length){y(cn);return}let n=Cg(t.length,e),o=t[n]??t[0],r=Co()==="manual"&&t.length>1;E(cn,kg(Tg(o),r)),jr?.()}function wa(){_r!==void 0&&(clearInterval(_r),_r=void 0)}function Sa(){wa(),!(!fe||!Se())&&Co()==="interval"&&(ut().filter(Boolean).length<=1||(_r=setInterval(()=>we(!0),Sg())))}function Ta(){Eo!==void 0&&(clearTimeout(Eo),Eo=void 0),qr=0}function id(){if(Ta(),!fe||!Se())return;qr=vg;let e=()=>{if(Eo=void 0,!(!fe||!Se())){if(zr()){Co()==="refresh"&&!mn?(mn=!0,we(!0)):we(!1),Sa();return}qr-=1,qr>0&&(Eo=setTimeout(e,yg))}};e()}function La(){if(mt===!0){zr()?we(!1):id();return}mt=!0,mn=!1,Co()==="refresh"?(mn=!0,we(!0)):we(!1),Sa(),zr()||id()}function ka(){mt=!1,mn=!1,wa(),Ta(),y(cn)}function Gr(){dn===void 0&&(dn=window.setTimeout(()=>{dn=void 0,fe&&(Se()?La():mt!==!1&&ka())},bg))}function Mg(){un||(un=history.pushState.bind(history),wo=history.replaceState.bind(history),So=function(...t){let n=un(...t);return Gr(),n},To=function(...t){let n=wo(...t);return Gr(),n},history.pushState=So,history.replaceState=To)}function Ag(){So&&history.pushState===So&&un&&(history.pushState=un),To&&history.replaceState===To&&wo&&(history.replaceState=wo),un=null,wo=null,So=null,To=null}function Hg(e){let t=e.target instanceof Element?e.target:null;t&&t.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(Gr)}function Ng(e){if(!fe||!Se()||Co()!=="manual"||ut().filter(Boolean).length<=1)return;let t=e.target instanceof Element?e.target:null;if(!t)return;let n=t.closest(vo);if(!n||sd(n))return;let o=window.getSelection?.();o&&String(o).trim()||we(!0)}function Pg(){xo===void 0&&(xo=setInterval(()=>{if(!fe)return;let e=Se();if(e!==(mt===!0)){e?La():ka();return}e&&zr()&&we(!1)},hg))}function Rg(){xo!==void 0&&(clearInterval(xo),xo=void 0)}function ad(e,t){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=e,n.setAttribute("aria-label",e);let o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.75"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),o.setAttribute("aria-hidden","true");for(let r of t.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",r),o.appendChild(i)}return n.appendChild(o),n}var Ig="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",Og="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function Bg(e,t){let n=Lo(e);return n?n.length>yo?`Keep it to ${yo} characters.`:ut().length+(t?1:0)>Ea?`At most ${Ea} greetings.`:null:"Enter a greeting."}function Dg(e){e.className="bloom-gc-panel";let t="",n=-1,o="",r=-1,i=()=>{let a=ut(),s=Number(B.plain.index);e.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=yo,c.placeholder="New greeting (line breaks ok)",c.value=t,c.addEventListener("input",()=>{t=c.value,o="";let f=l.querySelector(".bloom-gc-count");f&&(f.textContent=`${Lo(t).length}/${yo}`);let T=l.querySelector(".bloom-gc-error");T&&(T.textContent="")}),l.appendChild(c);let d=document.createElement("div");d.className="bloom-gc-meta";let u=document.createElement("span");u.className="bloom-gc-count",u.textContent=`${Lo(t).length}/${yo}`;let m=document.createElement("span");m.className="bloom-gc-error",m.textContent=o;let S=document.createElement("div");if(S.className="bloom-gc-actions",n>=0){let f=document.createElement("button");f.type="button",f.className="bloom-gc-btn",f.textContent="Cancel",f.addEventListener("click",()=>{n=-1,t="",o="",i()}),S.appendChild(f)}let w=document.createElement("button");if(w.type="button",w.className="bloom-gc-btn bloom-gc-btn-primary",w.textContent=n>=0?"Update":"Add",w.addEventListener("click",()=>{let f=n<0,T=Bg(t,f);if(T){o=T,i();return}let $=Lo(t),j=ut().slice();n>=0&&n<j.length?j[n]=$:j.push($),rd(j),n=-1,t="",o="",i()}),S.appendChild(w),d.append(u,m,S),l.appendChild(d),e.appendChild(l),!a.length){let f=document.createElement("p");f.className="bloom-gc-empty",f.textContent="No greetings. The official heading stays.",e.appendChild(f);return}let g=document.createElement("div");g.className="bloom-gc-list",a.forEach((f,T)=>{let $=document.createElement("div");$.className="bloom-gc-item",T===s&&($.dataset.active="true");let j=document.createElement("button");j.type="button",j.className=`bloom-gc-body${r===T?"":" bloom-gc-clamp"}`,j.textContent=f,j.addEventListener("click",()=>{r=r===T?-1:T,i()});let pn=document.createElement("div");pn.className="bloom-gc-item-actions";let ft=ad("Edit",Ig);ft.addEventListener("click",()=>{n=T,t=f,o="",i()});let Te=ad("Delete",Og);Te.addEventListener("click",()=>{let gn=ut().filter((pt,je)=>je!==T);rd(gn),n===T?(n=-1,t=""):n>T&&(n-=1),i()}),pn.append(ft,Te),$.append(j,pn),g.appendChild($)}),e.appendChild(g)};return jr=i,i(),()=>{jr===i&&(jr=null),e.replaceChildren()}}var cd=p({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[h.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:od,settings:B,start(){fe=!0,E(od,nd),Mg(),$r=new AbortController;let{signal:e}=$r;window.addEventListener("popstate",Gr,{signal:e}),document.addEventListener("click",Hg,{capture:!0,signal:e}),document.addEventListener("click",Ng,{signal:e}),Pg(),mt=null,Se()?La():ka(),gg.debug("started")},stop(){fe=!1,$r?.abort(),$r=null,dn!==void 0&&(clearTimeout(dn),dn=void 0),wa(),Ta(),Rg(),Ag(),y(cn),mn=!1,mt=null},onSettingsChange(){fe&&(Se()?(we(!1),Sa()):y(cn))}});var fn=new v("Bloom"),dd=!1,$g=Date.now(),_g=[Ps,wl,Nl,Il,_l,Gl,oc,ic,lc,yc,Lc,Pc,Ic,jc,Qc,td,cd];function Kr(e){return new Promise(t=>setTimeout(t,e))}function qg(){return document.head?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.head&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}function jg(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var md=8e3,ud=300,Fg=250;async function zg(){if(ze())return await Kr(ud),!0;for(;Date.now()-$g<md;)if(await Kr(Fg),ze())return await Kr(ud),!0;return ze()||Zr()}function Ca(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function Gg(){if(Ca())return!0;let e=Date.now()+md;for(;Date.now()<e;)if(await Kr(100),Ca())return!0;return Ca()}function Kg(){try{GM_registerMenuCommand?.("Bloom++ settings",Ns)}catch{}}function Ug(){Do(()=>{yn("HostShell"),fn.info("host shell",F)}),$o(()=>{fn.info("idle ready",F)}),_o(()=>{Vr(),yn("HostReady"),fn.info("chrome ready",F)})}async function Ma(){await qa()}async function Aa(){if(dd)return;dd=!0;for(let n of _g)try{Ya(n)}catch(o){fn.error("register failed",n.name,o)}Za(),yn("Init"),Kg(),Ug();let e=()=>yn("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await qg(),Vr(),fn.info("styles ready",F),await jg(),Gg().then(n=>{n&&qo()}),!await zg()){fn.warn("late islands not detected; starting default plugins",F),ht(),jo();return}await rs()}var fd=typeof unsafeWindow<"u"?unsafeWindow:window,Vg=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||Vg){let e=fd.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",F);try{Object.defineProperty(fd,"Bloom",{value:Ha,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}Ma().then(()=>Aa()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
