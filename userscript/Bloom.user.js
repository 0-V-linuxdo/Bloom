// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260920] v1.4.54
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

/* Bloom++ [20260920] v1.4.54. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var gd=Object.defineProperty;var bd=(e,t)=>{for(var n in t)gd(e,n,{get:t[n],enumerable:!0})};var Aa={};bd(Aa,{REPO_URL:()=>rs,Settings:()=>b,VERSION:()=>F,contextKeyFromUrl:()=>re,conversationTitle:()=>kt,conversationToken:()=>_,currentConversationId:()=>L,hasDraftText:()=>z,hasErrorToast:()=>W,hasLateIslands:()=>Ke,init:()=>Ma,initSettings:()=>Ca,isDocumentInteractive:()=>is,isStreaming:()=>H,isUserDraftEmpty:()=>Re,messageCreateTime:()=>dr,plugins:()=>te,requestChromeReady:()=>jo,requestIdleReady:()=>yt,requestShellReady:()=>qo,setEditorText:()=>he,subscribeHarvest:()=>K,watchStreamingEdge:()=>se,whenChromeReady:()=>_o,whenIdleReady:()=>$o,whenShellReady:()=>Do});var ke=new Map,Mo=!1;function hd(){return document.getElementById("bloom-root")?.shadowRoot??null}function Ha(){return document.head??null}function bt(){let e=hd();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=yd()}function Ur(e,t){if(!Mo)return;let n=Ha();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),bt();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,bt();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,bt()}function E(e,t){let n=ke.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},ke.set(e,n)),Mo&&Ur(e,n)}function Vr(){if(!Ha())return!1;Mo=!0;for(let[t,n]of ke)Ur(t,n);return bt(),!0}function Na(e){let t=ke.get(e);t&&(t.disabled=!1,Mo&&Ur(e,t))}function Pa(e){let t=ke.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),bt())}function y(e){let t=ke.get(e);t&&(t.el?.remove(),ke.delete(e),bt())}function yd(){return Array.from(ke.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var v=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function p(e){return e}var Wr=new Map;function Ao(e,t){let n=Wr.get(e);return n||(n=new Set,Wr.set(e,n)),n.add(t),()=>n.delete(t)}function Ge(e,t){let n=Wr.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var vd="bloompp";function Ra(){return new Promise((e,t)=>{let n=indexedDB.open(vd,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function Ia(e){try{let t=await Ra();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function Oa(e,t){try{let n=await Ra();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function gn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function ge(e,t,n){return Math.min(n,Math.max(t,e))}function Ba(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function Da(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}function $a(e,t){let n;return((...o)=>{n&&clearTimeout(n),n=setTimeout(()=>e(...o),t)})}var Ho=new v("SettingsStore"),Ce="BloomSettings",xd=100;function Po(e){if(gn(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(gn(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return gn(n)?n:null}return null}catch{return null}}var No=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,d]of this.defaultGetters)if(l.startsWith(c)){let u=l.slice(c.length+1);if(u&&!u.includes(".")){let m=d(u);m!==void 0&&(i[a]=m,s=m);break}}}return gn(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Ho.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},xd))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(Ce,this.plain)}catch{try{GM_setValue(Ce,t)}catch(n){Ho.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(Ce,t)}catch{}Oa(Ce,t).catch(n=>Ho.warn("Failed to save settings to IndexedDB:",n))}catch(t){Ho.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){Ba(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var Ed=new v("Settings"),wd={plugins:{}},b=new No(structuredClone(wd)),Sd=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function Td(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function x(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(b.store.plugins[n]||(b.store.plugins[n]={}),b.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?b.plain.plugins[n]??{}:{}}};return t}function Ld(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function _a(){let e=null;if(e=Po(Ld(Ce)),e||(e=Po(await Ia(Ce))),!e)try{e=Po(localStorage.getItem(Ce))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(b.plain.plugins=t),Ed.debug("Loaded settings")}}function qa(e,t){t&&(t.pluginName=e,b.plain.plugins[e]||(b.plain.plugins[e]={}),b.setDefaultGetter(Sd(e),n=>{if(n!=="enabled")return Td(t.def,n)}))}function ja(){return b.plain.plugins.Settings||(b.store.plugins.Settings={}),b.store.plugins.Settings}function Ro(){return ja().pinnedPlugins??[]}function Fa(e){return Ro().includes(e)}function za(e){let t=Ro(),n=t.includes(e);return b.store.plugins.Settings={...b.plain.plugins.Settings,pinnedPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}function Io(){return ja().starredPlugins??[]}function Ga(e){return Io().includes(e)}function Ka(e){let t=Io(),n=t.includes(e);return b.store.plugins.Settings={...b.plain.plugins.Settings,starredPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}var Oo=new v("PluginManager"),te={},bn=new Set;function Wa(e){if(te[e.name]){Oo.warn("Duplicate plugin",e.name);return}te[e.name]=e,qa(e.name,e.settings)}function ht(e){let t=te[e];if(!t)return!1;if(t.required)return!0;let n=b.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function Ya(e){let t=te[e];if(!t||t.required)return;let n=!ht(e);b.plain.plugins[e]||(b.store.plugins[e]={}),b.store.plugins[e].enabled=n,n?Xa(t):kd(t),Ge("pluginToggle",{name:e,enabled:n})}function Xa(e,t=!1){if(!bn.has(e.name)&&ht(e.name))try{e.managedStyle&&Na(e.managedStyle),e.start?.(),bn.add(e.name),e.settings&&b.addPrefixChangeListener(`plugins.${e.name}.`,()=>{bn.has(e.name)&&e.onSettingsChange?.()}),t||Oo.debug("Started",e.name)}catch(n){Oo.error("Failed to start",e.name,n)}}function kd(e){if(bn.has(e.name)){try{e.stop?.()}catch(t){Oo.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(Pa(e.managedStyle),y(e.managedStyle)),bn.delete(e.name)}}function hn(e){for(let t of Object.values(te))(t.startAt??"DOMContentLoaded")===e&&Xa(t)}var Ua=2,Va="defaultsRev";function Ja(){for(let t of Object.values(te))b.plain.plugins[t.name]||(b.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=b.store.plugins.Settings??(b.store.plugins.Settings={});if(e[Va]!==Ua){for(let t of["NoShareLink","NoDictation"]){let n=b.store.plugins[t]??(b.store.plugins[t]={});n.enabled=!1}e[Va]=Ua}}var yn=!1,Bo=!1,Yr=!1,Qa=[],es=[],ts=[];function Xr(e){let t=e.splice(0);for(let n of t)n()}function vn(){yn||(yn=!0,Xr(Qa))}function Jr(){Bo||(Bo=!0,yn||vn(),Xr(es))}function ns(){Yr||(Yr=!0,yn||vn(),Bo||Jr(),Xr(ts))}function Do(e){yn?e():Qa.push(e)}function $o(e){Bo?e():es.push(e)}function _o(e){Yr?e():ts.push(e)}function qo(){vn()}function yt(){vn(),Jr()}function jo(){ns()}function Za(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function os(){await Za(4e3),vn(),await Za(4e3),Jr(),ns()}var h={p:"0-V-linuxdo"},F="[20260920] v1.4.54",rs="https://github.com/0-V-linuxdo/Bloom";function Cd(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Md(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function Zr(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function Ke(){return Zr()?Cd()||Md():!1}function is(){return Ke()}var Ad=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),as=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Hd=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Nd="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function xt(e){return e.id==="bloom-root"||!!e.closest(Nd)}function ss(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function Fo(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function Qr(e){if(!(e instanceof HTMLElement)||!e.isConnected||xt(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&Fo(t)?!1:e.getClientRects().length>0}function vt(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Pd(){let e=[];for(let t of document.querySelectorAll(Ad))!(t instanceof HTMLElement)||!t.isConnected||xt(t)||e.push(t);return e}function zo(e){if(!e.isConnected||xt(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function xn(){return Pd().filter(zo)[0]??null}function ei(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||xt(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function ti(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!xt(n)&&!vt(n)&&n.parentElement&&!vt(n.parentElement)&&(t=n);let o=t.parentElement;if(o&&!vt(o)&&!xt(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!vt(o.parentElement))return o}return t}function ls(){let e=document.querySelectorAll(as);for(let n of e)if(Qr(n)&&!Fo(n)&&ss(n))return n;let t=document.querySelectorAll(Hd);for(let n of t){if(!Qr(n)||!ss(n)||Fo(n))continue;let o=n.querySelector(as);return Qr(o)&&!Fo(o)?o:n}return null}function cs(){let e=xn();if(e){let t=ti(e),n=t.parentElement;if(n&&!vt(n))return n;if(!vt(t))return t}return ei()}function ds(e){let t=xn();return t?e.composedPath().includes(t):!1}var oi=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Rd={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function ri(e){return e==="auto"||e==="light"||e==="dark"}function Id(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Od(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function ni(e){let t=Id(e);return t?Od(t)>.55?"light":"dark":null}function Bd(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=ni(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=ni(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=ni(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function us(e){return e==="auto"?Bd():e}function Dd(e){try{let t=getComputedStyle(document.documentElement);for(let n of oi){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function ms(e,t,n){let o=Rd[t];if(n){Dd(e);for(let r of oi)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of oi)e.style.setProperty(r,o[r])}function fs(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var ii=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var _d="bloom-root",ne="bloom-rail-item",Wo="bloom-account-item",Ve="bloom-sidebar-panel",Nn="bloom-plugin-dialog",er="bloom-plugin-layer",Yo="bloom-settings-css",qd=2e3,Cn=x({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),bs=null,jd=null,Ne=!1,ci=[],Go=null,Xo=null,Ae=null,Uo=null,be=null,Mn=null,En,Et=0,An=0,wn=0,Sn=null,Tn=null,Jo=null,hs=null,Ln=null,ai=[],Zo=!1,Fd=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],zd=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],tr="",Hn="all",Pe="all";function nr(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function ys(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Gd(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function Kd(e){let t='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return e?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${t}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`}function Ud(e){let t='<path d="M12 17v5"/>';return e?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var Vd={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function Wd(e){return e.icon||Vd[e.name]||nr()}function vs(){return ri(Cn.store.appearance)?Cn.store.appearance:"auto"}function Yd(){let e=document.createElement("div");e.className="bloom-field bloom-appearance-row";let t=document.createElement("span");t.className="bloom-field-label",t.textContent="Appearance";let n=document.createElement("select");n.setAttribute("aria-label","Appearance");let o=Cn.def.appearance,r=o.type===3?o.options??[]:[];for(let i of r){let a=document.createElement("option");a.value=i.value,a.textContent=i.label,n.appendChild(a)}return n.value=vs(),n.addEventListener("change",()=>{ri(n.value)&&(Cn.store.appearance=n.value)}),e.append(t,n),e}function si(e,t,n){e&&(e.setAttribute("data-bloom-scheme",t),ms(e,t,n),e.style.removeProperty("--bloom-rail-surface"))}function xs(e){e&&(e.style.removeProperty("--bloom-rail-surface"),e.style.removeProperty("--bg-primary"))}function kn(){let e=vs(),t=us(e),n=e==="auto";si(bs,t,n);let o=document.getElementById(Ve);o instanceof HTMLElement&&si(o,t,n);let r=document.getElementById(Nn);r instanceof HTMLElement&&si(r,t,n);let i=document.getElementById(ne);i instanceof HTMLElement&&xs(i),Ge("schemeChange",{scheme:t,pref:e})}function Es(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(e=>e.remove())}function ws(){if(E("settings",ii),document.getElementById(Yo)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=Yo,e.textContent=ii,document.head.appendChild(e)}function Xd(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Jd(){for(let e of ci)e();ci=[]}function Ss(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function Zd(e){return e.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,t=>t.toUpperCase())}function mi(e){return e.settings?Object.entries(e.settings.def).filter(([,t])=>!t.hidden):[]}function Qd(e){return mi(e).length>0}function Vo(e){if(e.default!==void 0)return e.default;if(e.type===3)return(e.options?.find(n=>n.default)??e.options?.[0])?.value;if(e.type===2)return!1;if(e.type===4)return e.min??0;if(e.type===0)return"";if(e.type===1)return 0}function eu(e,t){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let o=document.createElement("span");if(o.className="bloom-plugin-dialog-label-title",o.textContent=Zd(e),n.appendChild(o),t.description){let r=document.createElement("span");r.className="bloom-plugin-dialog-label-desc",r.textContent=t.description,n.appendChild(r)}return n}function tu(e,t,n){if(n.hidden)return null;let o=n.type===4||n.type===0||n.type===1||n.type===5,r=document.createElement("div");r.className=o?"bloom-field bloom-field-stack":"bloom-field",r.appendChild(eu(t,n));let i=b.store.plugins[e]??(b.store.plugins[e]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",ci.push(n.render(a)),r.appendChild(a),r}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??Vo(n)??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),r.appendChild(a),r}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??Vo(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),r.appendChild(a),r}if(n.type===2){let a=Ss(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),r.appendChild(a),r}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[t]??Vo(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[t]=n.type===1?Number(a.value):a.value}),r.appendChild(a),r}return r}function ps(e,t){let n=document.createElement("div");n.className=t?`bloom-plugin-dialog-field ${t}`:"bloom-plugin-dialog-field";let o=document.createElement("div");return o.className="bloom-plugin-dialog-field-label",o.textContent=e,n.appendChild(o),n}function nu(e){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let t=b.store.plugins[e.name]??(b.store.plugins[e.name]={});for(let[n,o]of mi(e)){if(n==="enabled"||o.type===5)continue;let r=Vo(o);r!==void 0&&(t[n]=r)}Ls(e)}function Ts(e){e.key==="Escape"&&(!document.getElementById(er)&&!document.getElementById(Nn)||(e.stopPropagation(),wt()))}function ou(){Zo||(document.addEventListener("keydown",Ts),Zo=!0)}function ru(){Zo&&(document.removeEventListener("keydown",Ts),Zo=!1)}function wt(){Jd(),ru(),document.getElementById(er)?.remove(),document.getElementById(Nn)?.remove()}function Ls(e){if(wt(),!document.body)return;let t=document.createElement("div");t.id=er,t.className="bloom-plugin-layer",t.addEventListener("pointerdown",He),t.addEventListener("pointerup",He),t.addEventListener("click",d=>{d.stopPropagation(),d.target===t&&wt()});let n=document.createElement("div");n.id=Nn,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",He),n.addEventListener("pointerup",He),n.addEventListener("click",He);let o=document.createElement("button");o.type="button",o.className="bloom-icon-btn bloom-plugin-dialog-close",o.setAttribute("aria-label","Close"),o.innerHTML=ys(),o.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),wt()});let r=document.createElement("div");r.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=e.name,r.appendChild(i),e.description){let d=document.createElement("p");d.className="bloom-plugin-dialog-sub",d.textContent=e.description,r.appendChild(d)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(o,r,a),e.authors?.length){let d=ps("Authors"),u=document.createElement("p");u.className="bloom-plugin-dialog-authors",u.textContent=e.authors.join(", "),d.appendChild(u),n.appendChild(d)}let s=ps("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=mi(e);if(c.length)for(let[d,u]of c){let m=tu(e.name,d,u);m&&l.appendChild(m)}if(!l.childElementCount){let d=document.createElement("p");d.className="bloom-dialog-empty",d.textContent="No configurable settings.",l.appendChild(d)}if(s.appendChild(l),n.appendChild(s),c.length){let d=document.createElement("div");d.className="bloom-plugin-dialog-footer";let u=document.createElement("button");u.type="button",u.className="bloom-plugin-dialog-reset",u.textContent="Reset",u.addEventListener("click",()=>nu(e)),d.appendChild(u),n.appendChild(d)}t.appendChild(n),document.body.appendChild(t),ou(),kn()}function iu(e){let t=document.createElement("div");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Wd(e);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=e.name,a.title=e.name,r.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=Ga(e.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=Kd(l),c.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation();let f=Ka(e.name);Ge("pluginStar",{name:e.name,starred:f})}),s.appendChild(c),!e.required){let g=Fa(e.name),f=document.createElement("button");f.type="button",f.className=`bloom-icon-btn bloom-card-pin${g?" bloom-card-pin-active":""}`,f.setAttribute("aria-label",g?"Unpin from top":"Pin to top"),f.innerHTML=Ud(g),f.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();let $=za(e.name);Ge("pluginPin",{name:e.name,pinned:$})}),s.appendChild(f)}if(Qd(e)){let g=document.createElement("button");g.type="button",g.className="bloom-icon-btn bloom-card-settings",g.setAttribute("aria-label",`${e.name} settings`),g.innerHTML=Gd(),g.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),Ls(e)}),s.appendChild(g)}let d=Ss(e.name,ht(e.name),!!e.required),u=d.querySelector("input");if(u?.addEventListener("click",g=>g.stopPropagation()),u?.addEventListener("change",()=>{Ya(e.name)}),s.appendChild(d),o.append(r,s),n.appendChild(o),e.description){let g=document.createElement("div");g.className="bloom-card-desc",g.textContent=e.description,n.appendChild(g)}let m=document.createElement("div");m.className="bloom-card-separator";let S=document.createElement("div");S.className="bloom-card-footer";let w=document.createElement("div");return w.className="bloom-card-author",w.textContent=e.authors?.filter(Boolean).join(", ")||"\xA0",S.appendChild(w),t.append(n,m,S),t}function ks(){return Object.values(te).filter(e=>!e.hidden&&e.name!=="Settings")}function Cs(e,t){return t==="all"||t==="favorites"?!0:(e.tags??[]).includes(t)}function au(e){return`${e.name} ${e.description??""} ${(e.tags??[]).join(" ")}`.toLowerCase()}function su(){return tr.trim()?"No plugins match your search.":Pe==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function lu(){let e=ks();return zd.filter(t=>t.id==="favorites"||t.id==="all"?!0:e.some(n=>Cs(n,t.id)))}function cu(){if(Ln){Ln.replaceChildren();for(let e of lu()){let t=document.createElement("button");t.type="button",t.className=`bloom-plugin-tab${Pe===e.id?" bloom-plugin-tab-active":""}`,t.textContent=e.label,t.addEventListener("click",()=>{Pe=e.id,Ue()}),Ln.appendChild(t)}}}function du(){let e=ks();if(Pe==="favorites"){let t=new Set(Io());e=e.filter(n=>t.has(n.name))}else Pe!=="all"&&(e=e.filter(t=>Cs(t,Pe)));return Hn==="enabled"&&(e=e.filter(t=>ht(t.name))),Hn==="disabled"&&(e=e.filter(t=>!ht(t.name))),e}function Ue(){if(!Sn)return;cu();let e=du();Jo&&(Jo.placeholder=`Search ${e.length} plugins...`);let t=e,n=tr.trim().toLowerCase();if(n&&(t=t.filter(o=>au(o).includes(n))),Pe!=="favorites"){let o=Ro();if(o.length){let r=new Map(o.map((i,a)=>[i,a]));t=t.slice().sort((i,a)=>{let s=r.has(i.name),l=r.has(a.name);return s!==l?s?-1:1:s?(r.get(i.name)??0)-(r.get(a.name)??0):i.name.localeCompare(a.name)})}}Sn.replaceChildren();for(let o of t)Sn.appendChild(iu(o));Tn&&(Tn.hidden=t.length>0,Tn.textContent=su())}function He(e){e.stopPropagation()}function li(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function fi(){document.getElementById(ne)?.setAttribute("aria-expanded",Ne?"true":"false")}function uu(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function pi(){wt(),tr="",Hn="all",Pe="all",document.getElementById(Ve)?.remove(),Ne=!1,fi()}function mu(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",He),t.addEventListener("pointerup",He),t.addEventListener("click",He);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-titles";let i=document.createElement("div");i.className="bloom-settings-brand";let a=document.createElement("span");a.className="bloom-settings-mark",a.innerHTML=nr();let s=document.createElement("h2");s.textContent="Bloom++",i.append(a,s);let l=document.createElement("p");l.className="bloom-settings-sub",l.textContent="Toggle features. Some need a reload. Click the sliders icon to configure.",r.append(i,l);let c=document.createElement("button");c.type="button",c.className="bloom-icon-btn",c.setAttribute("aria-label","Close"),c.innerHTML=ys(),c.addEventListener("click",pi),o.append(r,c),n.appendChild(o),n.appendChild(Yd());let d=document.createElement("div");d.className="bloom-plugin-tabs",n.appendChild(d);let u=document.createElement("div");u.className="bloom-search-bar";let m=document.createElement("input");m.type="search",m.className="bloom-search-input",m.setAttribute("aria-label","Search plugins"),m.placeholder="Search plugins...",m.addEventListener("input",()=>{tr=m.value,Ue()});let S=document.createElement("select");S.className="bloom-search-filter",S.setAttribute("aria-label","Filter plugins");for(let f of Fd){let T=document.createElement("option");T.value=f.value,T.textContent=f.label,S.appendChild(T)}S.value=Hn,S.addEventListener("change",()=>{Hn=S.value,Ue()}),u.append(m,S),n.appendChild(u);let w=document.createElement("div");w.className="bloom-plugin-list",n.appendChild(w);let g=document.createElement("p");return g.className="bloom-tab-empty",g.hidden=!0,n.appendChild(g),t.appendChild(n),Sn=w,Tn=g,Jo=m,hs=S,Ln=d,Ue(),t}function fu(e){e.classList.add("bloom-rail-dock")}function pu(){let e=document.getElementById(ne);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&zo(e)?e:null}function gu(){if(document.getElementById(Ve)?.remove(),!document.body)return;let e=mu(Ve);fu(e),document.body.appendChild(e),Ne=!0,wt(),kn(),fi(),Ge("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:F,dock:"center",rail:!!pu()})}function gi(){let e=document.getElementById(Ve);if(e instanceof HTMLElement&&e.isConnected&&uu(e)){pi();return}e?.remove(),gu()}function bu(){let e=document.createElement("button");return e.type="button",e.id=ne,e.className="bloom-rail-item",e.setAttribute("aria-controls",Ve),e.setAttribute("aria-expanded",Ne?"true":"false"),e.innerHTML=`<span class="bloom-rail-mark">${nr()}</span><span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),gi()}),e}function gs(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function hu(e){let t=e.querySelector("img");if(t instanceof HTMLElement){let n=t.getBoundingClientRect();if(n.width>8&&n.height>8)return t}for(let n of e.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}return null}function yu(e,t){for(let n of e.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||t&&(n===t||n.contains(t)||t.contains(n))||(n.textContent||"").trim().length<2)continue;let r=n.getBoundingClientRect();if(r.width>16&&r.height>8&&r.height<40)return n}return null}function Me(e,t,n){let o=`${n}px`;e.style.getPropertyValue(t)!==o&&e.style.setProperty(t,o)}function Ms(e,t){if(e.classList.contains("bloom-rail-compact"))return;let n=e.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!e.isConnected||!t.isConnected)return;let o=hu(t),r=getComputedStyle(t),i=Number.parseFloat(r.paddingTop),a=Number.parseFloat(r.paddingBottom);if(Number.isFinite(i)&&Me(e,"padding-top",Math.round(i)),Number.isFinite(a)&&Me(e,"padding-bottom",Math.round(a)),o){let s=o.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));Me(n,"width",l),Me(n,"height",Math.max(20,Math.round(s.height)));let c=e.getBoundingClientRect(),d=Math.round(s.left-c.left);d>=0&&d<=40&&Me(e,"padding-left",d);let u=yu(t,o);if(u){let m=u.getBoundingClientRect(),S=n.getBoundingClientRect(),w=Math.round(m.left-S.right);w>=0&&w<=24&&Me(e,"gap",w)}}else{let s=Number.parseFloat(r.paddingLeft),l=Number.parseFloat(r.columnGap||r.gap);Number.isFinite(s)&&Me(e,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&Me(e,"gap",Math.round(l))}xs(e)}function di(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function vu(){if(Mn?.isConnected&&be){be.observe(Mn,{childList:!0});return}ui()}function xu(e){if(di(e))return!1;try{if(e.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function Eu(e,t){!t||!e||requestAnimationFrame(()=>{if(e.isConnected){wn=0;return}wn+=1,An=Date.now()+Math.min(8e3,250*2**Math.min(wn,5))})}function wu(){Et||Date.now()<An||(Et=requestAnimationFrame(()=>{Et=0,!(Date.now()<An)&&(document.getElementById(ne)?.isConnected||Qo())}))}function Qo(){if(!document.body)return;be?.disconnect();let e=null,t=!1;try{let n=document.getElementById(ne);e=n instanceof HTMLButtonElement?n:bu();let o=xn(),r=ei();if(o){let i=ti(o),a=i.parentElement;if(di(i)||a&&di(a))return;e.isConnected&&e.nextElementSibling===i||(i.before(e),t=!0),gs(e),Ms(e,o)}else r?(e.parentElement!==r&&(r.appendChild(e),t=!0),gs(e,!0)):e.isConnected&&!zo(e)&&(e.remove(),e=null)}finally{Eu(e,t),vu(),fi()}}function ui(){let e=cs();!e||!xu(e)||Mn===e&&be||(be?.disconnect(),Mn=e,be=new MutationObserver(()=>{document.getElementById(ne)?.isConnected||wu()}),be.observe(e,{childList:!0}))}function Su(){Qo(),ui(),En===void 0&&(En=window.setInterval(()=>{let e=document.getElementById(ne);if(!(e instanceof HTMLElement)||!e.isConnected)Date.now()>=An&&Qo();else{wn=0;let t=xn();t&&Ms(e,t)}ui()},qd))}function Tu(){En!==void 0&&(clearInterval(En),En=void 0),Et&&cancelAnimationFrame(Et),Et=0,An=0,wn=0,be?.disconnect(),be=null,Mn=null}function Lu(e){Uo===e&&Ae||(Ae?.disconnect(),Uo=e,Ae=new MutationObserver(()=>{if(!e.isConnected){Ae?.disconnect(),Ae=null,Uo=null;return}As(e)}),Ae.observe(e,{childList:!0}))}function As(e){if(Lu(e),e.querySelector(`#${Wo}`))return;let t=document.createElement("button");t.type="button",t.id=Wo,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${nr()}<span>Bloom++</span>`,t.addEventListener("pointerdown",li),t.addEventListener("pointerup",li),t.addEventListener("click",n=>{li(n),gi()}),e.insertBefore(t,e.firstChild)}function Ko(){let e=ls();return e?(As(e),!0):!1}function ku(e){ds(e)&&(queueMicrotask(Ko),requestAnimationFrame(()=>{Ko()}),window.setTimeout(Ko,60),window.setTimeout(Ko,180))}function Cu(){Xo?.abort();let e=new AbortController;Xo=e,document.addEventListener("click",ku,{signal:e.signal})}function Mu(){Xo?.abort(),Xo=null,Ae?.disconnect(),Ae=null,Uo=null}function Hs(){yt(),Xd(()=>{ws(),Es(),Qo(),gi()})}var Ns=p({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[h.p],required:!0,hidden:!0,enabledByDefault:!0,settings:Cn,startAt:"HostReady",cleanupSelectors:[`#${_d}`,`#${ne}`,`#${Wo}`,`#${Ve}`,`#${er}`,`#${Nn}`,`#${Yo}`,"#bloom-menu-panel"],start(){ws(),Es(),Su(),Cu(),Go?.(),Go=fs(kn),kn(),ai=[Ao("pluginToggle",()=>{Ne&&Ue()}),Ao("pluginPin",()=>{Ne&&Ue()}),Ao("pluginStar",()=>{Ne&&Ue()})]},stop(){Tu(),Mu(),Go?.(),Go=null;for(let e of ai)e();ai=[],pi(),document.getElementById(ne)?.remove(),document.getElementById(Wo)?.remove(),document.getElementById(Yo)?.remove(),bs=null,jd=null,Sn=null,Tn=null,Jo=null,hs=null,Ln=null,Ne=!1},onSettingsChange:kn});var or='form[data-type="unified-composer"], form.w-full[data-type]',oe=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),St=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Ps=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Rs=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Au=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Hu='[contenteditable="false"], button, [role="button"]';function U(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function We(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!U(r)))return r;return null}function Is(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function C(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=Is(e);return!!(Au.test(n)||/^stop$/i.test(n))}function V(){let t=Array.from(document.querySelectorAll(or)).find(U);if(t instanceof HTMLElement)return t;let n=We(document,oe),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function D(){let e=Array.from(document.querySelectorAll(oe));return e.find(U)??e[0]??null}function Nu(e,t){if(!e||e===t||!t.contains(e))return!1;let n=e.closest(Hu);return!!n&&n!==t&&t.contains(n)}function bi(e,t){let n=[];try{let o=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),r=o.nextNode();for(;r;){let i=r.parentElement;i&&Nu(i,t)||n.push(r.textContent??""),r=o.nextNode()}}catch{return e.innerText??e.textContent??""}return n.join("")}function z(e){let t=e??D();return t?bi(t,t).replaceAll("\u200B","").trim().length>0:!1}function Re(e){return!z(e)}function rr(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function Os(e){let t=V();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!U(n))&&e(n))return n;return null}function Ie(){let e=V(),t=We(e,St)??We(document,St);return t&&!C(t)?t:Os(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!C(n);let r=Is(n);return/^(send|send prompt|发送)$/i.test(r)&&!C(n)})}function Ye(){let e=V(),t=We(e,Ps,!0)??We(document,Ps,!0);if(t)return t;let n=We(e,Rs)??We(document,Rs);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&U(o)&&C(o))return o}return Os(C)}function G(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>bi(n,e)).join(`
`):bi(e,e)}function hi(e,t=!1){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function he(e,t,n=!1){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r);try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch{e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),hi(e,n)}var Bs="bloom-host-icon",Pn="data-bloom-host-rel",yi="not all",vi=0,Ds=0,Pu=400;function $s(e){vi+=1;try{e()}finally{vi-=1}}function ir(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function Oe(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function _s(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function Ru(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Iu(e,t){if(e.lastElementChild===t)return;let n=Date.now();n-Ds<Pu||(Ds=n,e.appendChild(t))}function Ou(e,t){for(let n of e.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===t||ir(n)&&(n.getAttribute(Pn)||n.setAttribute(Pn,n.rel),n.media!==yi&&(n.media=yi),n.rel!==Bs&&(n.rel=Bs))}function Bu(e){for(let t of e.querySelectorAll(`link[${Pn}]`)){if(!(t instanceof HTMLLinkElement))continue;let n=t.getAttribute(Pn);n&&(t.rel=n),t.removeAttribute(Pn),t.media===yi&&t.removeAttribute("media")}}function qs(e,t){let{head:n}=document;!n||!t||$s(()=>{Ou(n,e);let o=_s(e),{type:r,sizes:i}=Ru(t);o?Iu(n,o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function js(e,t){let{head:n}=document;n&&$s(()=>{_s(e)?.remove(),Bu(n)})}function Fs(e,t){let{head:n}=document;if(!n)return null;let o=0,r=new MutationObserver(i=>{if(vi)return;let a=!1,s;for(let l of i){l.type==="attributes"&&l.target instanceof HTMLLinkElement&&(l.target.id===e?a=!0:ir(l.target)&&(a=!0,Oe(l.target.href)&&(s=l.target.href)));for(let c of l.removedNodes)ir(c)&&c.id===e&&(a=!0);for(let c of l.addedNodes)ir(c)&&c.id!==e&&(a=!0,Oe(c.href)&&(s=c.href))}a&&(o||(o=requestAnimationFrame(()=>{o=0,t(s)})))});return r.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),r}var zs=/\/c\/([a-zA-Z0-9_-]{8,})/i;function _(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=c=>{let d=n.indexOf(c);return d>=0&&n[d+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,d)=>{try{return document.querySelector(c)?.getAttribute(d)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function re(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function Tt(e){if(!e)return"";try{return(/^https?:/i.test(e)?new URL(e,location.origin).pathname:e).match(zs)?.[1]??""}catch{return e.match(zs)?.[1]??""}}function L(){let e=Tt(location.pathname);if(e)return e;let n=_().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return""}var Vs=new v("Harvest"),Du=1500,$u=200,ar=new Set,sr=new Map,lr=new Map,Lt=null,cr=null,Rn=null,ie=0;function _u(){return typeof unsafeWindow<"u"?unsafeWindow:window}function qu(e){try{if(typeof e=="string")return e;if(e instanceof URL)return e.href;if(typeof Request<"u"&&e instanceof Request)return e.url}catch{}return String(e)}function ju(e,t){let n=t?.method,o=typeof Request<"u"&&e instanceof Request?e.method:"";return(n||o||"GET").toUpperCase()}function Ws(e){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(e)}var Fu=/"action"\s*:\s*"(next|continue|variant)"/i;function zu(e,t,n){return!(t!=="POST"||Ws(e)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(e)||typeof n=="string"&&/"action"\s*:/.test(n)&&!Fu.test(n))}function Gu(e,t){return t!=="GET"||Ws(e)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(e)}function Gs(e){return e.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function Ys(e){return e?e.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function Ku(e){return typeof e=="string"?Ys(e):""}function xi(e){if(typeof e=="number"&&Number.isFinite(e)&&e>0)return e>1e12?e:Math.round(e*1e3);if(typeof e=="string"){let t=e.trim();if(!t)return null;if(/^\d+(\.\d+)?$/.test(t))return xi(Number(t));let n=Date.parse(t);return Number.isFinite(n)?n:null}return null}function Xs(e,t){if(e.size<=t)return;let n=e.size-t,o=0;for(let r of e.keys())if(e.delete(r),++o>=n)break}function Ks(e,t,n){!e||!t||lr.get(e)!==t&&(lr.set(e,t),Xs(lr,Du),Be({type:"message-time",messageId:e,createTime:t,conversationId:n}))}function Uu(e,t){let n=t.trim();!e||!n||sr.get(e)!==n&&(sr.set(e,n),Xs(sr,$u),Be({type:"conversation-meta",conversationId:e,title:n}))}function In(e,t,n=0){if(n>6||!e||typeof e!="object")return;if(Array.isArray(e)){for(let l of e)In(l,t,n+1);return}let o=e,r=typeof o.conversation_id=="string"&&o.conversation_id||typeof o.conversationId=="string"&&o.conversationId||t;typeof o.title=="string"&&r&&!o.author&&!o.content&&!o.role&&Uu(r,o.title);let i=o.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",d=xi(l.create_time??l.createTime??l.created_at);c&&d&&Ks(c,d,r)}let a=typeof o.id=="string"?o.id:"",s=xi(o.create_time??o.createTime??o.created_at);if(a&&s&&(o.author||o.content||o.role||o.create_time||o.createTime)&&Ks(a,s,r),o.mapping&&typeof o.mapping=="object")In(o.mapping,r,n+1);else if(n<3)for(let l of Object.values(o))l&&typeof l=="object"&&In(l,r,n+1)}function Us(e,t){if(e)try{In(JSON.parse(e),t)}catch{}}function Be(e){for(let t of Array.from(ar))try{t(e)}catch{}}async function Vu(e,t,n){if(n===ie)try{let o=await e.json();if(n!==ie)return;In(o,t)}catch{}}async function Wu(e,t,n,o){let r=t,i=n,a=e.body;if(!a){o===ie&&Be({type:"post-end",conversationId:r,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;o===ie;){let{done:d,value:u}=await s.read();if(d)break;if(c+=l.decode(u,{stream:!0}),!r){let S=Ys(c);S&&(r=S,Be({type:"post-start",conversationId:r,url:""}))}let m=c.split(`
`);c=m.pop()??"";for(let S of m){let w=S.replace(/^data:\s*/,"").trim();!w||w==="[DONE]"||Us(w,r)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&o===ie&&Us(c.replace(/^data:\s*/,""),r)}catch{i=!0}finally{try{s.cancel()}catch{}}o===ie&&Be({type:"post-end",conversationId:r,error:i})}function Yu(e,t,n){let o=qu(t),r=ju(t,n),i=Gu(o,r),a=zu(o,r,n?.body),s=ie,l="";return a&&(l=Ku(n?.body)||Gs(o)||Tt(o)||L(),Be({type:"post-start",conversationId:l,url:o})),e(t,n).then(c=>{if(s!==ie||!i&&!a)return c;try{let d=c.clone();i?Vu(d,Gs(o)||L(),s):Wu(d,l,!c.ok,s)}catch{a&&Be({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===ie&&Be({type:"post-end",conversationId:l,error:!0}),c})}function Xu(){if(Lt)return;let e=_u();Rn=e,Lt=e.fetch.bind(e);let t=(n,o)=>Yu(Lt,n,o);cr=t,e.fetch=t,Vs.debug("conversation fetch harvest hooked")}function Ju(){ie+=1,!(!Lt||!Rn)&&(cr&&Rn.fetch===cr&&(Rn.fetch=Lt),Lt=null,cr=null,Rn=null,Vs.debug("conversation fetch harvest unhooked"))}function K(e){return ar.add(e),Xu(),()=>{ar.delete(e),ar.size===0&&Ju()}}function kt(e){return e?sr.get(e)??"":""}function dr(e){return e?lr.get(e)??null:null}var Qs=new v("Streaming");function jn(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!U(t))&&(C(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function Zu(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&U(e))}function Qu(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&U(e))}function em(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function W(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function H(){if(Ye()||jn()||em())return!0;let e=Ie();return e&&U(e)&&!C(e)?!1:!!(Zu()||Qu())}var tm=400,Js=3,Ze=new Set,Bn,Dn=null,Ei=null,Je=!1,Xe=0,De="",ae="",$n=!1,_n=!1,qn=!1;function el(){return re(_())}function Zs(e,t){return{streaming:e,contextKey:t,conversationId:L()}}function nm(e,t){if(!e||e===t)return!1;if(e.endsWith("|draft")&&!t.endsWith("|draft"))return!0;try{let n=e.split("|")[0],o=t.split("|")[0],r=new URL(n).pathname.replace(/\/$/,"")||"/",i=new URL(o).pathname.replace(/\/$/,"")||"/";if((r==="/"||r==="")&&i.startsWith("/c/"))return!0}catch{}return!1}function wi(){Je=!1,Xe=0,De="",$n=!1,_n=!1,qn=!1}function om(e){for(let t of Array.from(Ze))try{t.onFall?.(e)}catch{}}function rm(e){for(let t of Array.from(Ze))try{t.onRise?.(e)}catch{}}function On(e){for(let t of Array.from(Ze))try{t.onTick?.(e)}catch{}}function im(e,t){for(let n of Array.from(Ze))try{n.onContext?.(e,t)}catch{}}function am(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest("button");n instanceof HTMLElement&&C(n)&&($n=!0)}function sm(e){e.type==="post-end"&&Je&&(qn=!0,e.error&&(_n=!0))}function lm(){let e=el(),t=H();if(ae&&e&&ae!==e){if(im(e,ae),!nm(ae,e)){wi(),ae=e,On(Zs(t,e));return}De===ae&&(De=e)}ae=e;let n=Zs(t,e);if(t){let i=!Je;i&&($n=!1,_n=!1,qn=!1),Je=!0,Xe=0,De=e,i&&rm(n),On(n);return}if(!Je){On(n);return}if(Xe+=1,qn&&(Xe=Math.max(Xe,Js)),Xe<Js){On(n);return}let o=!!De&&De===e,r={contextKey:De||e,conversationId:L(),userStopped:$n,error:_n||W()};wi(),o&&om(r),On(n)}function cm(){Bn===void 0&&(Je=H(),ae=el(),De=Je?ae:"",Xe=0,$n=!1,_n=!1,qn=!1,Dn?.abort(),Dn=new AbortController,document.addEventListener("click",am,{capture:!0,signal:Dn.signal}),Ei=K(sm),Bn=setInterval(lm,tm),Qs.debug("watchStreamingEdge started"))}function dm(){Ze.size||(Bn!==void 0&&(clearInterval(Bn),Bn=void 0),Dn?.abort(),Dn=null,Ei?.(),Ei=null,wi(),ae="",Qs.debug("watchStreamingEdge stopped"))}function se(e){let t=typeof e=="function"?{onFall:e}:e;return Ze.add(t),cm(),()=>{Ze.delete(t),dm()}}var um=["original","badge","dot","hole","bg"],ol=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],rl={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},ur="#FCFCFC",mm="#111111",tl="#111111",fm="#ffffff",pm="#212121",gm="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",bm={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},mr=32,nl=64;function il(e){return typeof e=="string"&&um.includes(e)}function hm(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function fr(e){let t=document.createElement("canvas");t.width=mr,t.height=mr;let n=t.getContext("2d");return n?(n.scale(mr/nl,mr/nl),e(n),t.toDataURL("image/png")):""}function ym(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function pr(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(gm);n&&(e.strokeStyle=mm,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function vm(e,t,n){let o=rl[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=tl,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=tl,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=fm,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function Fn(e,t){if(e==="original")return t==="wait"?fr(o=>pr(o,ur)):hm(bm[t]);let n=t==="wait"?void 0:rl[t];return fr(e==="hole"?o=>pr(o,n??ur):e==="bg"?o=>{o.fillStyle=n??pm,ym(o,0,0,64,64,14),o.fill(),pr(o,ur,!1)}:o=>{pr(o,ur),t!=="wait"&&vm(o,t,e==="dot"?"dot":"badge")})}function al(e){return{wait:Fn(e,"wait"),rotate:Fn(e,"rotate"),done:Fn(e,"done"),ready:Fn(e,"ready"),error:Fn(e,"error")}}var xm=new v("ChatStateFavicons"),et="bloom-chat-state-favicon",ul=["input","beforeinput","cut","paste","compositionend"],ml=x({style:{type:3,description:"Favicon overlay",options:ol}}),le="",Ti={wait:"",rotate:"",done:"",ready:"",error:""},Un="wait",Mt=!1,ye=!1,Y=null,Gn="",Kn="",tt=!0,zn=null,At=0,Ct,gr=null,Qe=null,Si=null,Ht=null,Vn=!1,sl=new WeakSet,Em=400;function wm(){let e=ml.store.style;return il(e)?e:"bg"}function fl(){let t=document.querySelector(`link[rel~="icon"]:not(#${et}), link[data-bloom-host-rel]:not(#${et})`)?.href;return Oe(t)?t:Oe(le)?le:""}function Sm(){let e=document.getElementById(et);return e instanceof HTMLLinkElement?e:null}function Tm(){if(!Oe(le)){let e=fl();e&&(le=e)}return Oe(le)?le:Ti.wait}function pl(e){return e==="wait"?Tm():Ti[e]}function gl(){qs(et,pl(Un))}function X(e){let t=pl(e);if(Un===e){let n=Sm();if(n&&n.getAttribute("href")===t)return}Un=e,gl()}function ll(){Ti=al(wm()),X(Un)}function Lm(){let e=_(),t=e?re(e):re("");return H()?(!Gn&&t&&(Gn=t),Gn||t):(Gn="",t)}function bl(){Mt=!1,ye=!1,Y=null,Gn=""}function km(e){Kn=e,bl(),tt=!1,X("wait")}function cl(e){return!e&&tt}function hl(){if(!Vn)return;let e=_()||location.pathname;if(Kn&&e&&Kn!==e){km(e);return}e&&(Kn=e);let t=Lm(),n=H(),o=Re();if(W()&&!n){X("error"),Mt=!1,ye=!1,Y=null;return}if(n){Mt||(tt=!1),Mt=!0,ye=!1,Y=t,X("rotate");return}if(Mt){let r=!!Y&&!!t&&Y===t;if(Mt=!1,r){ye=!0,Y=t,X("done");return}ye=!1,Y=null}if(ye)if(!!(Y&&t&&Y!==t))ye=!1,Y=null;else if(o){X("done");return}else if(cl(o)){ye=!1,X("ready");return}else{ye=!1,X("wait");return}Y=null,o?X("wait"):cl(o)?X("ready"):X("wait")}function yl(){if(Ht){for(let e of ul)Ht.removeEventListener(e,El,!0);Ht=null}}function vl(){let e=V(),t=e&&e!==document.body?e:null;if(!(Ht===t&&t?.isConnected)&&(yl(),!!t)){Ht=t;for(let n of ul)Ht.addEventListener(n,El,{capture:!0,passive:!0})}}function xl(){let e=V();if(!(Qe&&Si===e&&e.isConnected)){if(Qe?.disconnect(),Si=e,!e||e===document.body){Qe=null;return}Qe=new MutationObserver(()=>Wn()),Qe.observe(e,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function Wn(){!Vn||At||(At=requestAnimationFrame(()=>{At=0,Vn&&(wl(),vl(),xl(),z()&&(tt=!0),hl())}))}function El(){z()&&(tt=!0),Wn()}function dl(){z()&&(tt=!0),Wn()}function wl(){let e=D();!e||sl.has(e)||(sl.add(e),e.addEventListener("input",dl,{capture:!0,passive:!0}),e.addEventListener("compositionend",dl,{capture:!0,passive:!0}))}var Sl=p({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:ml,startAt:"DOMContentLoaded",cleanupSelectors:[`#${et}`],start(){Vn=!0,le=fl()||le,ll(),gr?.disconnect(),gr=Fs(et,e=>{Oe(e)&&(le=e),gl()}),zn?.abort(),zn=new AbortController,window.addEventListener("popstate",Wn,{signal:zn.signal}),wl(),vl(),xl(),Ct!==void 0&&clearInterval(Ct),Ct=setInterval(Wn,Em),hl(),xm.debug("favicon watch started")},stop(){Vn=!1,At&&cancelAnimationFrame(At),At=0,Ct!==void 0&&(clearInterval(Ct),Ct=void 0),zn?.abort(),zn=null,yl(),Qe?.disconnect(),Qe=null,Si=null,gr?.disconnect(),gr=null,bl(),Kn="",tt=!0,Un="wait",js(et,le)},onSettingsChange:ll});var Tl=`.bloom-ih-hud {
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
`;var xh=new v("InputHistory"),Li=/\u200B/g,Ll=10,kl=500,Cl=100,Mm=8,Am=120,Hm=2e3,br=10,hr=x({maxEntries:{type:4,description:"Max stored prompts",min:Ll,max:kl,default:Cl},history:{type:5,description:"Stored prompts",render:Km},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),ki=new Map,N=0,Ci="",ce=!1,Xn=!1,Hi=0,Yn=null,Mi,Ni=null,Ml=!0;function J(){let e=hr.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Al(e){let t=ge(Number(hr.store.maxEntries??Cl),Ll,kl);return e.length>t?e.slice(e.length-t):e}function yr(e){hr.store.entries=Al(e)}function Nm(e){return e.replaceAll(Li,"").replace(/\n$/,"").trim()}function Ai(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(oe);return n instanceof HTMLElement?n:D()}function Pm(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!G(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(Li,"").trim().length===0,last:i.toString().replaceAll(Li,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Hl(e){clearTimeout(Mi),Mi=setTimeout(()=>{if(e!==Hi)return;Xn=!1;let t=Ni;t&&hi(t,Ml)},Am)}function Nl(e,t,n){Xn=!0,Ni=e,Ml=n;let o=++Hi;he(e,t,n),Hl(o)}function Rm(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function Nt(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Im(){document.querySelector(".bloom-ih-hud")?.remove()}function Om(e,t){let n=Rm();n.textContent=e;let o=(t.closest("form")??V()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-Mm)}px`,n.classList.add("bloom-ih-hud-on")}function Pi(e){let t=Nm(e);if(!t)return;let n=Date.now(),o=ki.get(t);if(o&&n-o<Hm)return;ki.set(t,n);let r=J().filter(i=>i!==t);r.push(t),yr(r),N=J().length,ce=!1,Nt()}function Bm(e,t){let n=J();if(!n.length&&e)return;N>=n.length&&(Ci=G(t),N=n.length);let o=e?N-1:N+1;o<0||o>n.length||(N=o,ce=!0,Nl(t,o===n.length?Ci:n[o],e),o<n.length?Om(`${o+1} / ${n.length}`,t):Nt())}function Dm(e){ce=!1,Nt(),Nl(e,Ci,!1),N=J().length}function $m(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=Ai(e.target)??Ai(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&ce&&!e.altKey&&!e.shiftKey){Dm(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){Pi(G(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=J();if(!o){let i=Pm(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||N<=0)||!n&&N>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),Bm(n,t))}function _m(e){if(Ai(e.target)){if(Xn){Hl(Hi);return}ce&&(ce=!1,Nt(),N=J().length)}}function qm(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(oe);n instanceof HTMLElement&&Pi(G(n))}function jm(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(St);if(!n||!(n instanceof HTMLElement)||C(n))return;let o=D();o&&Pi(G(o))}function Fm(e){if(!(!ce||Xn)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}ce=!1,Nt()}}function zm(){if(Yn)return;Yn=new AbortController;let{signal:e}=Yn,t={capture:!0,signal:e};window.addEventListener("keydown",$m,t),window.addEventListener("input",_m,t),window.addEventListener("submit",qm,t),window.addEventListener("click",jm,t),window.addEventListener("pointerdown",Fm,t)}function Gm(e){let t=J().slice();t.splice(e,1),yr(t),N>t.length&&(N=t.length)}function Km(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=J().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(f=>f.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/br));n>=l&&(n=l-1);let c=s.slice(n*br,n*br+br);e.replaceChildren();let d=document.createElement("input");if(d.className="bloom-ih-search",d.type="search",d.placeholder="Search history",d.autocomplete="off",d.value=t,d.addEventListener("input",()=>{t=d.value,n=0,r()}),e.appendChild(d),c.length){let f=document.createElement("div");f.className="bloom-ih-list",c.forEach((T,$)=>{let j=i.indexOf(T),fn=J().length-1-j,pt=document.createElement("div");pt.className="bloom-ih-item";let Le=document.createElement("button");Le.type="button",Le.className=`bloom-ih-body${o===$?"":" bloom-ih-clamp"}`,Le.textContent=T,Le.addEventListener("click",()=>{o=o===$?-1:$,r()});let pn=document.createElement("div");pn.className="bloom-ih-actions";let gt=document.createElement("button");gt.type="button",gt.title="Copy",gt.textContent="C",gt.addEventListener("click",()=>{Da(T)});let ze=document.createElement("button");ze.type="button",ze.title="Delete",ze.textContent="\xD7",ze.addEventListener("click",()=>{Gm(fn),r()}),pn.append(gt,ze),pt.append(Le,pn),f.appendChild(pt)}),e.appendChild(f)}else{let f=document.createElement("p");f.className="bloom-ih-empty",f.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(f)}let u=document.createElement("div");u.className="bloom-ih-pager";let m=document.createElement("button");m.type="button",m.className="bloom-ih-btn",m.textContent="Prev",m.disabled=n<=0,m.addEventListener("click",()=>{n-=1,r()});let S=document.createElement("span");S.textContent=`${n+1} / ${l}`;let w=document.createElement("button");w.type="button",w.className="bloom-ih-btn",w.textContent="Next",w.disabled=n+1>=l,w.addEventListener("click",()=>{n+=1,r()});let g=document.createElement("button");g.type="button",g.className="bloom-ih-clear",g.textContent="Clear all",g.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(yr([]),N=0,r())}),u.append(m,S,w,g),e.appendChild(u)};return r(),()=>{e.replaceChildren()}}var Pl=p({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:hr,startAt:"HostReady",managedStyle:"inputHistory",start(){E("inputHistory",Tl),N=J().length,ce=!1,zm()},stop(){Yn?.abort(),Yn=null,Nt(),Im(),ki.clear(),clearTimeout(Mi),Xn=!1,Ni=null,ce=!1},onSettingsChange(){let e=J(),t=Al(e);t.length!==e.length&&yr(t),N>t.length&&(N=t.length)}});var Ri="noShareLink",Um=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],Vm=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],Ii=x({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Rl(e){return`${e.join(",")}{display:none!important}`}function Il(){let e=[];if(Ii.store.hideShareChat!==!1&&e.push(Rl(Um)),Ii.store.hideShareProject!==!1&&e.push(Rl(Vm)),!e.length){y(Ri);return}E(Ri,e.join(`
`))}var Ol=p({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[h.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Ii,start:Il,onSettingsChange:Il,stop(){y(Ri)}});var $l="noDictation",Wm=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],Ym=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],_l=x({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Bl(e){return`${e.join(",")}{display:none!important}`}function Dl(){let e=[Bl(Wm)];_l.store.hideDictationSettings!==!1&&e.push(Bl(Ym)),E($l,e.join(`
`))}var ql=p({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:_l,start:Dl,onSettingsChange:Dl,stop(){y($l)}});var Oi="noSidebarIdentity",Pt=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],zl=Pt.flatMap(e=>[`${e} .min-w-0 > .truncate`,`${e} .min-w-0.flex-1 .truncate`]),Gl=Pt.flatMap(e=>[`${e} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),Xm=[...zl,...Gl],Jm=[...zl,...Pt.flatMap(e=>[`${e} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],Zm=Pt.map(e=>`${e} a[href^="mailto:"]`),Qm=Pt.flatMap(e=>[`${e} .min-w-0 > :not(.truncate)`,`${e} .min-w-0 > :not(.truncate) *`,`${e} .min-w-0 .text-xs`,`${e} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${e} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${e} .text-xs:not(.truncate)`,`${e} .text-token-text-secondary:not(.truncate)`,`${e} .text-token-text-tertiary:not(.truncate)`,`${e} .min-w-0 ~ *`,`${e} .min-w-0 ~ * *`,`${e} > .text-xs`,`${e} > .text-token-text-secondary`,`${e} > .text-token-text-tertiary`]),ef=Pt.flatMap(e=>[`${e} .min-w-0.flex-col > :not(.truncate)`,`${e} .min-w-0.flex-col > .text-xs`,`${e} .min-w-0.flex-col > .text-token-text-secondary`,`${e} .min-w-0.flex-col > .text-token-text-tertiary`,`${e} .min-w-0:not(.flex) > :not(.truncate)`,`${e} .min-w-0:not(.flex) > .text-xs`,`${e} .min-w-0:not(.flex) > .text-token-text-secondary`,`${e} .min-w-0:not(.flex) > .text-token-text-tertiary`]),Jn=x({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function jl(e){return`${e.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function tf(e){return`${e.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function nf(){return`${ef.join(",")}{margin-block:auto!important}`}function of(){return`${Qm.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function Fl(){let e=Jn.store.hideUsername!==!1,t=Jn.store.hideEmail!==!1,n=e&&Jn.store.enlargePlan!==!1,o=e&&Jn.store.alignPlanWithAvatar===!0,r=[];if(e&&(o?(r.push(tf([...Jm,...Gl])),r.push(nf())):r.push(jl(Xm))),t&&r.push(jl(Zm)),n&&r.push(of()),!r.length){y(Oi);return}E(Oi,r.join(`
`))}var Kl=p({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[h.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Jn,start:Fl,onSettingsChange:Fl,stop(){y(Oi)}});var Ul=`#bloom-rt-host {
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
`;var Yl=new v("RecentTopics"),Ot="bloom-rt-host",Xl="home",Jl=/^\/c\/([a-z0-9_-]{8,})/i,af=/\/c\/([a-z0-9_-]{8,})/i,Zl=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,sf=new Set(["Backquote","IntlBackslash"]),lf=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),cf=140,df=[3,4,5,6,7,8,9,10,11,12].map(e=>({label:String(e),value:String(e),default:e===5})),P=x({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:df},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),vr=null,Di=null,q=!1,oo=!1,Zn=!1,de=0,nt="",Rt=null,Qn=null,It,Bi=null;function uf(){let e=Number(P.store.maxRecent??5);return Number.isFinite(e)&&e>=3&&e<=12?e:5}function eo(){let e=P.plain.visits;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function $i(){let e=P.plain.titles;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Ql(){let e=P.plain.previews;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function _i(){let e=P.plain.projects;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Er(e){let t=uf();return e.length>t?e.slice(0,t):e}function ue(e){return e===Xl}function to(e,t=cf){let n=e.replace(/\s+/g," ").trim();return n.length<=t?n:`${n.slice(0,t-1)}\u2026`}function qi(e){if(!e)return"";try{return new URL(e,location.origin).pathname.match(Jl)?.[1]??""}catch{return e.match(af)?.[1]??""}}function ot(){let e=(location.pathname||"/").match(Jl);if(e?.[1])return e[1];let n=_().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return Xl}function ji(e){if(ue(e))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${e}"]`);for(let o of n){if(qi(o.getAttribute("href")||"")!==e)continue;let r=to(o.textContent||"",80);if(r)return r}}catch{}let t=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return ot()===e&&t&&!/^ChatGPT$/i.test(t)?to(t,80):""}function mf(e){if(ue(e))return"New chat";let t=$i()[e];if(t)return t;let n=kt(e);return n||ji(e)||"Chat"}function ff(e){return _i()[e]||""}function pf(e){return Ql()[e]||{}}function Fi(e,t){if(!e||ue(e)||!t||/^new chat$/i.test(t.trim()))return;let n=$i();n[e]!==t&&(n[e]=t,P.store.titles=n)}function gf(e){e.type==="conversation-meta"&&(Fi(e.conversationId,e.title),q&&Bt())}function bf(e,t){if(!e||ue(e)||!t)return;let n=_i();n[e]!==t&&(n[e]=t,P.store.projects=n)}function hf(e,t){if(!e||ue(e)||!t.user&&!t.assistant)return;let n=Ql(),o=n[e]||{},r={user:t.user||o.user,assistant:t.assistant||o.assistant};o.user===r.user&&o.assistant===r.assistant||(n[e]=r,P.store.previews=n)}function zi(e){if(!e||ue(e)&&P.store.includeHome===!1)return;let t=eo().filter(n=>n!==e);t.unshift(e),P.store.visits=Er(t)}function wr(){let e=P.store.includeHome!==!1;return Er(eo().filter(n=>e||!ue(n))).map(n=>({id:n,title:mf(n),project:ff(n),preview:pf(n)}))}function Vl(e){try{let t=document.querySelectorAll(`[data-message-author-role="${e}"]`),n=t[t.length-1];if(!(n instanceof HTMLElement))return"";let o=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||o.push(a)}let r=o.length?o.join(" "):n.textContent||"";return to(r)}catch{return""}}function no(e){if(!e||ue(e)||e!==ot())return;let t=ji(e);t&&Fi(e,t);let n=Vl("user"),o=Vl("assistant");hf(e,{user:n,assistant:o});let r=tc(e);if(r){let i=ec(r);i&&bf(e,i)}}function Gi(){let e=$i(),t=_i(),n=[],o=new Set,r=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${Ot}, #bloom-root, #bloom-sidebar-panel`))continue;let d=qi(c.getAttribute("href")||"");if(!d||o.has(d))continue;o.add(d),n.push(d);let u=to(c.textContent||"",80);u&&!Zl.test(u)&&e[d]!==u&&(e[d]=u,r=!0);let m=ec(c);m&&t[d]!==m&&(t[d]=m,i=!0)}}catch{}r&&(P.store.titles=e),i&&(P.store.projects=t);let a=eo(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(P.store.visits=Er([...a,...l]))}function ec(e){let t=e.parentElement;for(let n=0;n<10&&t;n++){if(t.id==="bloom-rt-host"||t.id==="bloom-root"){t=t.parentElement;continue}let o=t.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),r=to((o instanceof HTMLElement?o.textContent:"")||"",60);if(r&&!Zl.test(r)&&!/^20\d{2}/.test(r)&&r!==e.textContent?.trim()&&t.querySelector('a[href^="/c/"]'))return r;t=t.parentElement}return""}function tc(e){if(ue(e)){let t=document.querySelector('[data-testid="create-new-chat-button"]');return t instanceof HTMLAnchorElement?t:document.querySelector('a[href="/"]')}try{for(let t of document.querySelectorAll(`a[href*="/c/${e}"]`))if(qi(t.getAttribute("href")||"")===e)return t}catch{}return null}function yf(e){let t=tc(e);if(t){t.click();return}if(ue(e)){location.assign("/");return}location.assign(`/c/${e}`)}function vf(){let e=ot();nt&&nt!==e&&no(nt),nt=e,zi(e),Gi();let t=ji(e);t&&Fi(e,t),no(e)}function xr(){It===void 0&&(It=window.setTimeout(()=>{It=void 0,vf()},120))}function xf(){Rt||(Rt=history.pushState.bind(history),Qn=history.replaceState.bind(history),history.pushState=function(...t){let n=Rt(...t);return xr(),n},history.replaceState=function(...t){let n=Qn(...t);return xr(),n})}function Ef(){Rt&&(history.pushState=Rt),Qn&&(history.replaceState=Qn),Rt=null,Qn=null}function wf(e){return sf.has(e.code)||e.keyCode===192?!0:lf.has(e.key)}function nc(e){return e.key==="Control"||e.code==="ControlLeft"||e.code==="ControlRight"}function Sf(e,t){oo=t,Gi(),no(ot()),q=!0,de=0;try{let n=ot();zi(n);let o=wr();o.length>1&&(de=e?o.length-1:1)}catch(n){Yl.error("Failed to open switcher:",n)}Bt()}function Wl(e){let{length:t}=wr();t&&(de=(de+(e?-1:1)+t)%t,Bt())}function Ki(){if(!q)return;let e=wr()[de];q=!1,oo=!1,Bt(),e&&yf(e.id)}function oc(){q&&(q=!1,oo=!1,Bt())}function Tf(e){if(nc(e)){Zn=!0;return}if((e.ctrlKey||Zn)&&!e.altKey&&!e.metaKey&&wf(e)&&!e.repeat){e.preventDefault(),e.stopImmediatePropagation();try{q?Wl(e.shiftKey):Sf(e.shiftKey,!0)}catch(n){Yl.error("Hotkey failed:",n)}return}if(q){if(e.key==="Escape"){e.preventDefault(),oc();return}if(e.key==="Enter"&&!e.shiftKey){e.preventDefault(),Ki();return}e.key==="Tab"&&(e.ctrlKey||Zn)&&(e.preventDefault(),Wl(e.shiftKey))}}function Lf(e){nc(e)&&(Zn=!1,q&&oo&&Ki())}function kf(e){let t=e.target instanceof Element?e.target:null;!t||!t.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(xr)}function Cf(e){!q||(e.target instanceof Element?e.target:null)?.closest(`#${Ot}`)||oc()}function Mf(){document.visibilityState==="hidden"&&no(ot())}function Af(){if(!document.body)return null;let e=document.getElementById(Ot);if(e instanceof HTMLElement)return Di=e,e;e=document.createElement("div"),e.id=Ot;let t=document.createElement("div");return t.className="bloom-rt-panel",t.setAttribute("role","listbox"),t.setAttribute("aria-label","Recent conversations"),t.dataset.visible="false",t.addEventListener("click",n=>n.stopPropagation()),e.append(t),document.body.append(e),Di=e,e}function Bt(){let e=Af();if(!e)return;let t=e.querySelector(".bloom-rt-panel");if(!t)return;if(!q){t.dataset.visible="false",t.replaceChildren();return}let n=wr();if(!n.length){t.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",t.replaceChildren(i);return}de>=n.length&&(de=0);let o=document.createElement("div");o.className="bloom-rt-list",o.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===de?"true":"false",s.setAttribute("aria-selected",a===de?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="user",d.textContent=i.preview.user,c.append(d)}if(i.preview.assistant){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="assistant",d.textContent=i.preview.assistant,c.append(d)}s.append(c)}s.addEventListener("click",()=>{de=a,Ki()}),o.append(s)}),t.replaceChildren(o),t.dataset.visible="true",t.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function Hf(){document.getElementById(Ot)?.remove(),Di=null}var rc=p({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${Ot}`],settings:P,start(){E("recentTopics",Ul),nt=ot(),zi(nt),Gi(),no(nt),Bi=K(gf),xf(),vr=new AbortController;let{signal:e}=vr;window.addEventListener("keydown",Tf,{capture:!0,signal:e}),window.addEventListener("keyup",Lf,{capture:!0,signal:e}),window.addEventListener("popstate",xr,{signal:e}),document.addEventListener("click",kf,{capture:!0,signal:e}),document.addEventListener("click",Cf,{signal:e}),document.addEventListener("visibilitychange",Mf,{signal:e})},stop(){vr?.abort(),vr=null,It!==void 0&&(clearTimeout(It),It=void 0),Ef(),Bi?.(),Bi=null,q=!1,oo=!1,Zn=!1,Hf()},onSettingsChange(){let e=Er(eo());e.length!==eo().length&&(P.store.visits=e),q&&Bt()}});var Ui="cleaner",Nf=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],Pf=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],Rf=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],If=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],Of=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],Bf=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],rt=x({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function Dt(e){return`${e.join(",")}{display:none!important}`}function ic(){let e=[];if(rt.store.hideDownloadApps!==!1&&e.push(Dt(Nf)),rt.store.hideDisclaimer!==!1&&e.push(Dt(Pf)),rt.store.hideUpgrade!==!1&&e.push(Dt(Rf)),rt.store.hideLockedModels!==!1&&e.push(Dt(If)),rt.store.hideHomePromo!==!1&&e.push(Dt(Of)),rt.store.hideAds!==!1&&e.push(Dt(Bf)),!e.length){y(Ui);return}E(Ui,e.join(`
`))}var ac=p({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[h.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:rt,start:ic,onSettingsChange:ic,stop(){y(Ui)}});var Tr=new v("ResponseNotification"),_t=x({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:zf},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Vi=!1,Sr=null,$t=null,ro=null;function Df(){return document.visibilityState==="hidden"||document.hidden}function $f(){return _t.store.onlyWhenHidden===!1?!0:Df()}function _f(){let e=kt(L());if(e)return e;let t=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return t&&!/^ChatGPT$/i.test(t)?t:"Chat"}function sc(){try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!$t||$t.state==="closed")&&($t=new e);let t=$t,n=t.currentTime,o=[523.25,659.25];for(let r=0;r<o.length;r++){let i=t.createOscillator(),a=t.createGain();i.type="sine",i.frequency.value=o[r];let s=n+r*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(t.destination),i.start(s),i.stop(s+.24)}t.resume?.()}catch(e){Tr.debug("chime failed",e)}}function qf(e){try{let t=new Audio(e);t.volume=.7,t.play()}catch(t){Tr.debug("custom sound failed",t),sc()}}function lc(){let e=String(_t.store.soundUrl||"").trim();e?qf(e):sc()}function jf(){let e="Bloom++",t=`${_f()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:e,text:t,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(e,{body:t,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){Tr.debug("notification failed",n)}}function Ff(){$f()&&(_t.store.sound!==!1&&lc(),_t.store.browserNotification!==!1&&jf())}function zf(e){let t=document.createElement("button");return t.type="button",t.textContent="Play",t.addEventListener("click",()=>lc()),e.appendChild(t),()=>{t.remove()}}var cc=p({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:_t,start(){Vi=!0,Sr?.(),Sr=se(e=>{Vi&&(e.userStopped||e.error||Ff())}),ro?.abort(),ro=new AbortController,_t.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:ro.signal}),Tr.debug("watch started")},stop(){Vi=!1,Sr?.(),Sr=null,ro?.abort(),ro=null;try{$t?.close()}catch{}$t=null}});var dc=`#bloom-pq-chip {
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
`;var lo=new v("PromptQueue"),Yi="bloom-pq-chip",uc="promptQueue",mc=80,Kf=50,Uf=2e3,bc=x({replacePending:{type:2,description:"Replace the queued prompt if you Enter again while one is waiting.",default:!0}}),I=new Map,ve=!1,Z="",R="",_e=!1,Q=!1,M=null,io=null,Lr=null,so,ao,qt=null;function jt(){return re(_())}function Ft(e){return e.replaceAll("\u200B","").replace(/\n$/,"").trim()}function fc(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(oe);return n instanceof HTMLElement?n:D()}function Xi(e){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation()}function hc(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function Vf(){try{let e=document.querySelectorAll('[data-message-author-role="user"]'),t=e[e.length-1];return t instanceof HTMLElement?Ft(t.innerText||t.textContent||""):""}catch{return""}}function Wf(e,t){if(!e||e===t)return!1;if(e.endsWith("|draft")&&!t.endsWith("|draft"))return!0;try{let n=e.split("|")[0],o=t.split("|")[0],r=new URL(n).pathname.replace(/\/$/,"")||"/",i=new URL(o).pathname.replace(/\/$/,"")||"/";if((r==="/"||r==="")&&i.startsWith("/c/"))return!0}catch{}return!1}function pc(e){if(!Z||Z===e)return;let t=I.get(Z);!t||I.has(e)||Wf(Z,e)&&(I.delete(Z),I.set(e,t),R===Z&&(R=e),M?.key===Z&&(M.key=e),lo.debug("migrated pending",Z,"\u2192",e))}function Ji(e){let t=jt();if(I.get(t)&&bc.store.replacePending===!1)return;I.set(t,{text:e,at:Date.now()}),M={key:t,text:e,turns:hc(),ticks:3};let o=D();o&&he(o,""),$e(),lo.debug("queued",t,e.length)}function Yf(e){I.delete(e),R===e&&(R=""),M?.key===e&&(M=null),$e()}function Xf(){Q=!0,clearTimeout(ao),ao=setTimeout(()=>{Q=!1,ao=void 0},Uf)}function Jf(){let e=jt(),t=I.get(e);if(!t)return;let n=D();if(!n)return;I.delete(e),R="",$e(),Xf(),he(n,t.text);let o=Ie();o&&!C(o)&&!rr(o)&&(o.click(),Q=!1)}function gc(e){if(!ve||_e||H()||jt()!==e)return;let t=I.get(e);if(!t){R="";return}if(W())return;let n=D();if(!n)return;if(!Re(n)){let r=Ft(G(n));if(r&&r!==t.text)return}let o=Ie();!o||C(o)||rr(o)||(_e=!0,he(n,t.text),clearTimeout(so),so=setTimeout(()=>Zf(e,t.text),Kf))}function Zf(e,t){so=void 0;try{if(!ve)return;let n=I.get(e);if(!n||n.text!==t||H()||jt()!==e)return;let o=D();if(!o)return;let r=Ft(G(o));if(r&&r!==t&&!Re(o))return;r!==t&&he(o,t);let i=Ie();if(!i||C(i)||rr(i))return;i.click(),I.delete(e),R="",$e(),lo.debug("drained",e)}finally{_e=!1}}function yc(e){let t=V();if(!t||t===document.body){e.style.left="50%",e.style.bottom="6.5rem";return}let n=t.getBoundingClientRect();e.style.left=`${Math.round(n.left+n.width/2)}px`,e.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`;let o=Math.min(512,Math.max(160,n.width-24));e.style.maxWidth=`${Math.round(o)}px`}function Wi(){qt?.remove(),qt=null}function $e(){if(!ve||!document.body){Wi();return}let e=jt(),t=I.get(e);if(!t){Wi();return}let n=qt;n?.isConnected||(n=document.createElement("div"),n.id=Yi,document.body.appendChild(n),qt=n),n.replaceChildren();let o=document.createElement("span");o.className="bloom-pq-kicker",o.textContent="Next";let r=document.createElement("span");r.className="bloom-pq-text";let i=t.text.length>mc?`${t.text.slice(0,mc)}\u2026`:t.text;r.textContent=i,r.title=t.text;let a=document.createElement("div");a.className="bloom-pq-actions";let s=document.createElement("button");s.type="button",s.className="bloom-pq-btn bloom-pq-send",s.textContent="Send now",s.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),Jf()});let l=document.createElement("button");l.type="button",l.className="bloom-pq-btn bloom-pq-x",l.setAttribute("aria-label","Dismiss queued prompt"),l.textContent="\xD7",l.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),Yf(e)}),a.append(s,l),n.append(o,r,a),yc(n)}function Qf(){if(!M)return;if(M.ticks-=1,I.get(M.key)&&hc()>M.turns){let t=Vf();if(t&&t===M.text){lo.debug("native send leaked; dropping pending"),I.delete(M.key),R===M.key&&(R=""),M=null,$e();return}}M.ticks<=0&&(M=null)}function ep(e){if(!ve||e.isComposing||e.keyCode===229||e.key!=="Enter"||e.shiftKey||e.ctrlKey||e.metaKey||_e)return;let t=fc(e.target)??fc(document.activeElement);if(!t||!H())return;if(e.altKey||Q){Q=!1;return}if(!z(t))return;let n=Ft(G(t));n&&(Xi(e),Ji(n))}function tp(e){let t=e.closest("button");if(!(t instanceof HTMLElement)||C(t))return null;let n=e.closest(St);if(n instanceof HTMLElement&&!C(n))return n;let o=Ie();return o&&(t===o||o.contains(t)||t.contains(o))?o:null}function np(e){if(!ve)return;let t=e.target;if(!(t instanceof Element)||t.closest(`#${Yi}`))return;let n=t.closest("button");if(n instanceof HTMLElement&&C(n)||_e||!H()||!tp(t))return;if(Q){Q=!1;return}let o=D();if(!o||!z(o))return;let r=Ft(G(o));r&&(Xi(e),Ji(r))}function op(e){if(!ve)return;let t=e.target;if(!(t instanceof HTMLFormElement)||!t.matches(or)&&!t.querySelector(oe)||_e||!H())return;if(Q){Q=!1;return}let n=D()??t.querySelector(oe);if(!n||!z(n))return;let o=Ft(G(n));o&&(Xi(e),Ji(o))}var vc=p({name:"PromptQueue",description:"Queue the next prompt while a reply is streaming. Enter/Send waits for this turn instead of interrupting.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:uc,cleanupSelectors:[`#${Yi}`],settings:bc,start(){ve=!0,Z=jt(),R="",_e=!1,Q=!1,M=null,E(uc,dc),io?.abort(),io=new AbortController;let{signal:e}=io;window.addEventListener("keydown",ep,{capture:!0,signal:e}),document.addEventListener("click",np,{capture:!0,signal:e}),document.addEventListener("submit",op,{capture:!0,signal:e}),Lr?.(),Lr=se({onFall(t){if(ve){if(t.userStopped||t.error){R="",$e();return}R=t.contextKey,gc(t.contextKey)}},onContext(t){pc(t),Z=t,$e()},onTick(t){pc(t.contextKey),Z=t.contextKey,Qf(),R&&R===t.contextKey&&gc(R),qt&&yc(qt)}}),$e(),lo.debug("watch started")},stop(){ve=!1,Lr?.(),Lr=null,io?.abort(),io=null,clearTimeout(so),so=void 0,clearTimeout(ao),ao=void 0,I.clear(),M=null,R="",_e=!1,Q=!1,Wi()}});var xc=`.bloom-cls {
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
`;var Sc=new v("ChatListStatus"),Ec="chatListStatus",Mr="bloom-cls",ip="bloom-cls",ap=1200*1e3,sp="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",me=new Map,Ee=!1,zt="",xe=!1,Kt=0,qe=null,ea=null,Gt=null,Zi=null,kr=null,Ut=!1,Vt=new Set;function Cr(){return Date.now()}function Tc(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function it(e,t,n,o=!0){if(!(!e||!Ee)){if(t==="idle")me.delete(e);else{let r=me.get(e);r&&r.kind===t&&n!=="net"?r.at=Cr():me.set(e,{kind:t,at:Cr(),source:n})}o&&lp({v:1,id:e,kind:t,at:Cr()}),co()}}function lp(e){try{Gt?.postMessage(e)}catch{}}function cp(e){let t=e.data;!t||t.v!==1||!t.id||t.kind!=="streaming"&&t.kind!=="done"&&t.kind!=="error"&&t.kind!=="idle"||it(t.id,t.kind,"bc",!1)}function dp(){let e=Cr();for(let[t,n]of me)n.kind==="streaming"&&e-n.at>ap&&me.delete(t)}function up(){let e=Tc();if(!e)return[];let t=[],n=new Set;try{for(let o of e.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(o.closest(sp))continue;let r=Tt(o.getAttribute("href")||"");!r||n.has(r)||(n.add(r),t.push(o))}}catch{}return t}function wc(e){let t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),e==="streaming")t.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("cx","12"),o.setAttribute("cy","12"),o.setAttribute("r","9"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","2"),t.appendChild(o)}return t.appendChild(n),t}function Qi(e){let t=e.querySelector(`:scope > .${Mr}`);return t||null}function mp(){if(!Ee)return;dp();let e=L(),t=up();qe?.disconnect();try{for(let n of t){let o=Tt(n.getAttribute("href")||"");if(!o||!e||o!==e){Qi(n)?.remove();continue}let i=me.get(o)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){Qi(n)?.remove();continue}let a=Qi(n);a||(a=document.createElement("span"),a.className=Mr,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(wc("streaming")):i==="error"&&a.appendChild(wc("error")))}}catch(n){Sc.debug("paint failed",n)}Lc()}function co(){!Ee||Kt||(Kt=requestAnimationFrame(()=>{Kt=0,Ee&&mp()}))}function Lc(){let e=Tc();if(!(qe&&ea===e&&e?.isConnected)){if(qe?.disconnect(),ea=e,!e){qe=null;return}qe=new MutationObserver(()=>co()),qe.observe(e,{childList:!0,subtree:!0})}}function ta(){return!!(Ye()||jn())}function fp(e){return!!(Ut||e&&Vt.has(e)||ta())}function pp(e){if(Ee){if(e.type==="post-start"){e.conversationId?(Ut=!1,Vt.add(e.conversationId),xe=!0,it(e.conversationId,"streaming","net")):(Ut=!0,xe=!0);return}e.type==="post-end"&&(Ut=!1,e.conversationId&&(Vt.delete(e.conversationId),it(e.conversationId,e.error?"error":"done","net")),ta()||(xe=!1))}}function gp(){if(!Ee)return;let e=L();if(!(Ut||e&&Vt.has(e))){if(xe=!1,e&&me.get(e)?.kind==="streaming"&&me.get(e)?.source==="local"){it(e,"idle","local");return}co()}}function bp(e){if(!Ee)return;let t=e.conversationId||L();if(zt&&t&&zt!==t){let o=me.get(zt);o?.kind==="streaming"&&o.source==="local"&&it(zt,W()?"error":"done","local"),xe=!!(t&&Vt.has(t))}if(zt=t,fp(t)&&(e.streaming||ta())){xe=!0,t&&it(t,"streaming","local"),co();return}xe&&(xe=!1,t&&it(t,W()?"error":"done","local")),co()}var kc=p({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Mr}`],start(){Ee=!0,E(Ec,xc);try{Gt=new BroadcastChannel(ip)}catch{Gt=null}Gt?.addEventListener("message",cp),Zi=K(pp),kr?.(),kr=se({onTick:bp,onContext:gp}),Lc(),Sc.debug("sidebar status watch started")},stop(){Ee=!1,Kt&&cancelAnimationFrame(Kt),Kt=0,qe?.disconnect(),qe=null,ea=null,kr?.(),kr=null,Zi?.(),Zi=null;try{Gt?.close()}catch{}Gt=null,me.clear(),Vt.clear(),Ut=!1,xe=!1,zt="",document.querySelectorAll(`.${Mr}`).forEach(e=>e.remove()),y(Ec)}});var Mc="widerChat",Ac=40,Hc=96,Nc=64,Pc=x({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:Ac,max:Hc,default:Nc}});function hp(){return ge(Number(Pc.store.width??Nc),Ac,Hc)}function Cc(){let e=hp(),t=`min(100%,${e}rem)`;E(Mc,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important;--user-chat-width:${e}rem!important;--composer-container-max-width:${e}rem!important;--thread-xl-max-width:${e}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${t}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${t}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${t}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${t}!important}`)}var Rc=p({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[h.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Pc,start:Cc,onSettingsChange:Cc,stop(){y(Mc)}});var na="composerOpacity",Wt='form[data-type="unified-composer"],form.w-full[data-type]',yp=[`${Wt} [class*="corner-superellipse"]`,`${Wt} [class*="bg-token-bg-primary"]`,`${Wt} [class*="bg-token-main-surface"]`].join(","),vp=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),xp="#thread-bottom-container,#thread-bottom",Ep=`${Wt} #prompt-textarea,${Wt} [contenteditable="true"]`,wp="var(--bg-primary,var(--main-surface-primary,#ffffff))",oa=x({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function Sp(){return ge(Number(oa.store.opacity??100),0,100)}function Tp(){return ge(Number(oa.store.blur??16),0,40)}function Ic(){let e=Sp();if(e>=100){y(na);return}let t=Tp(),n=`color-mix(in srgb,${wp} ${e}%,transparent)`,o=t>0?`-webkit-backdrop-filter:blur(${t}px)!important;backdrop-filter:blur(${t}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";E(na,`${xp}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${vp}{display:none!important}${Wt}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${yp}{background-color:${n}!important;background-image:none!important;${o}}${Ep}{background-color:transparent!important;background-image:none!important}`)}var Oc=p({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[h.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:oa,start:Ic,onSettingsChange:Ic,stop(){y(na)}});var Bc=`#bloom-bn-host {
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
`;var kp=new v("BetterNavigator"),ra="betterNavigator",Dc="bloom-bn-host",sa=60,Cp=16,Mp=1e3,Ap=2.5,Hp=.4,Hr="\u6B63\u5728\u8F93\u51FA\u2026",Np=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),Pp=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='thinking']","[class*='reasoning']","[class*='footnote']",".sr-only"].join(", "),Rp=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),Or=x({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),Yt=new Map,Xt=new Set,fe=!1,lt=!1,je=null,go=null,ct=null,Nr=null,O=[],dt="",Pr=0,Rr=-1,ma=0,Ir="",Jt=0,Zt=0,uo,mo=null,Ar=null,ia=null,aa=null,at=null,la=null,fo=null,st=null,Qt=null,po=null;function Br(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function Ip(e){try{return!!e.closest(Np)}catch{return!0}}function Op(e){let t=(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||e.getAttribute("data-turn")||"").toLowerCase();if(t==="user"||t==="assistant")return t;let n=(e.getAttribute("aria-label")||"").toLowerCase();return n.includes("you said")?"user":n.includes("chatgpt said")||n.includes("assistant said")?"assistant":null}function $c(e){let t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode(r){let i=r.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(i.closest(Pp))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return(r.textContent||"").replace(/\s+/g," ").trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),o;for(;(o=n.nextNode())&&t.join(" ").length<sa+20;)t.push((o.textContent||"").replace(/\s+/g," ").trim());return t.join(" ").replace(/\s+/g," ").trim()}function Bp(e,t){try{if(e.querySelector("img, picture, video, canvas"))return"Image";if(e.querySelector("a[download], [class*='attachment']"))return"File";if(e.querySelector("pre, code"))return"Code"}catch{}return`Message ${t+1}`}function Dp(e,t){let n=t==="user"?e.querySelector(".whitespace-pre-wrap")??e:e.querySelector(".markdown")??e;return $c(n)}function $p(e){return e.length>sa?`${e.slice(0,sa).trimEnd()}\u2026`:e}function _p(e,t,n,o){let r=Dp(e,t);return r?$p(r):o?Hr:Bp(e,n)}function qp(){if(lt)return!0;let e=L();return!!(e&&Xt.has(e)||Ye()||jn())}function jp(e){try{if(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")||e.querySelector("[aria-busy='true'], .result-streaming"))return!0;let t=e.querySelector(".markdown");if((!t||t instanceof HTMLElement&&!$c(t))&&e.querySelector("[class*='thinking'], [class*='reasoning'], details"))return!0}catch{}return!1}function Fp(){let e=Br();if(!e||e===document.body)return[];let t=Or.store.showAssistant!==!1,n=t&&qp(),o=[];try{for(let r of e.querySelectorAll("[data-message-id]")){if(Ip(r))continue;let i=r.getAttribute("data-message-id")||"";if(!i)continue;let a=Op(r);if(a!=="user"&&a!=="assistant"||a==="assistant"&&!t)continue;let s=a==="assistant"&&n&&jp(r),l=_p(r,a,o.length,s);l&&l!==Hr&&l!==Yt.get(i)&&Yt.set(i,l);let c=s&&l===Hr?Hr:Yt.get(i)||l;o.push({id:i,el:r,role:a,text:c,live:s})}}catch{}return o}function zp(){let t=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(t,48),88)}function _c(e){let t=e;for(;t&&t!==document.body&&t!==document.documentElement;){let o=getComputedStyle(t).overflowY;if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight+8)return t;t=t.parentElement}return window}function Gp(e){return e===window?window.innerHeight:e.clientHeight}function Kp(e){let t=e instanceof Element?e:e instanceof Node?e.parentElement:null;if(!t)return!1;try{return!!t.closest(Rp)}catch{return!1}}function qc(){uo!==void 0&&(clearTimeout(uo),uo=void 0),mo?.classList.remove("bloom-bn-flash"),mo=null}function Up(e){qc(),e.classList.add("bloom-bn-flash"),mo=e,uo=setTimeout(()=>{e.classList.remove("bloom-bn-flash"),mo===e&&(mo=null),uo=void 0},800)}function ca(e){if(!O.length)return;let t=Math.max(0,Math.min(e,O.length-1));Pr=t,go?.querySelectorAll(".bloom-bn-tick").forEach((o,r)=>{o.classList.toggle("bloom-bn-current",r===t)}),ct?.querySelectorAll(".bloom-bn-item").forEach((o,r)=>{o.classList.toggle("bloom-bn-active",r===t)}),Nr&&(Nr.textContent=`${t+1} / ${O.length}`);let n=ct?.children[t];if(n instanceof HTMLElement){let o=ct;if(o){let r=n.offsetTop-o.clientHeight/2+n.offsetHeight/2;o.scrollTop=Math.max(0,r)}}}function da(e){let t=O[e];if(!t?.el.isConnected)return;Rr=e,ma=Date.now()+Mp,ca(e);let n=Qt??_c(t.el),r=Math.abs(t.el.getBoundingClientRect().top-zp())>Ap*Gp(n);t.el.scrollIntoView({behavior:r?"auto":"smooth",block:"start"}),Or.store.jumpEffect!=="none"&&Up(t.el)}function fa(){if(!fe||!O.length)return;if(Date.now()<ma&&Rr>=0){ca(Rr);return}let e=window.innerHeight*Hp,t=0;for(let n=0;n<O.length;n++){let o=O[n].el;o.isConnected&&o.getBoundingClientRect().top<=e&&(t=n)}ca(t)}function Vp(e){let t=_c(e);if(Qt===t&&po)return;po?.(),Qt=t;let n=t===window?document:t,o=()=>{fa(),pa()};n.addEventListener("scroll",o,{passive:!0}),po=()=>n.removeEventListener("scroll",o)}function Wp(e){st?.disconnect(),st=null;let t=Qt instanceof HTMLElement?Qt:null;st=new IntersectionObserver(()=>fa(),{root:t,threshold:[0,.15,.4,.75,1]});for(let n of e)n.el.isConnected&&st.observe(n.el)}function Yp(){if(!document.body)return null;let e=je;if(e?.isConnected)return e;e=document.createElement("div"),e.id=Dc,e.className="bloom-bn-host",e.setAttribute("role","navigation"),e.setAttribute("aria-label","Conversation outline"),e.hidden=!0;let t=document.createElement("div");t.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let o=document.createElement("div");o.className="bloom-bn-card";let r=document.createElement("div");r.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",o.append(r,i),n.appendChild(o),e.append(t,n),document.body.appendChild(e),je=e,go=t,ct=i,Nr=r,e}function jc(){let e=je,t=Br();if(!e||!t||!t.isConnected||O.length<1){e&&(e.hidden=!0);return}let n=t.getBoundingClientRect(),o=document.getElementById("thread-bottom-container"),r=document.getElementById("page-header"),i=Math.max(n.top+8,r?.getBoundingClientRect().bottom??0,8),a=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),s=a-i;if(s<96||n.width<160){e.hidden=!0;return}let l=window.innerWidth-n.right,c=l>=22?Math.max(8,l-16):8;e.hidden=!1,e.style.top=`${Math.round((i+a)/2)}px`,e.style.height="auto",e.style.maxHeight=`${Math.round(s)}px`,e.style.right=`${Math.round(c)}px`,e.style.setProperty("--bloom-bn-cap",`${Math.round(s)}px`)}function pa(){!fe||Zt||(Zt=requestAnimationFrame(()=>{Zt=0,fe&&jc()}))}function Xp(e){let t=["bloom-bn-tick"];return e.role==="assistant"&&t.push("bloom-bn-tick-asst"),e.live&&t.push("bloom-bn-tick-live"),t.join(" ")}function Jp(e){let t=go,n=ct;!t||!n||(t.replaceChildren(),n.replaceChildren(),t.classList.toggle("bloom-bn-dense",e.length>Cp),e.forEach((o,r)=>{let i=document.createElement("button");i.type="button",i.className=Xp(o),i.setAttribute("aria-label",`Go to message ${r+1} of ${e.length}`),i.addEventListener("click",c=>{c.preventDefault(),da(r)}),t.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${o.role}`;let s=document.createElement("span");s.className="bloom-bn-mark",s.textContent=o.role==="user"?"You":"GPT";let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=o.text,l.title=o.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),da(r)}),n.appendChild(a)}))}function Zp(e){go?.querySelectorAll(".bloom-bn-tick").forEach((t,n)=>{t.classList.toggle("bloom-bn-tick-live",!!e[n]?.live)}),e.forEach((t,n)=>{let r=ct?.children[n]?.querySelector(".bloom-bn-label");r&&r.textContent!==t.text&&(r.textContent=t.text,r instanceof HTMLElement&&(r.title=t.text))})}function Qp(){let e=L();return e===Ir?!1:(Ir=e,Yt.clear(),O=[],dt="",Pr=0,Rr=-1,ma=0,lt&&e&&(Xt.add(e),lt=!1),!0)}function eg(e){let t=Or.store.showAssistant!==!1?"1":"0";return`${Ir}|${t}|${e.map(n=>n.id).join(",")}`}function tg(){if(!fe)return;Qp();let e=Fp(),t=Br();if(!t||e.length<1){O=e,dt="",je&&(je.hidden=!0),st?.disconnect(),ua();return}Yp();let n=eg(e);n!==dt?(O=e,dt=n,Jp(e),Vp(t),Wp(e)):(O=e,Zp(e)),jc(),fa(),ua()}function we(){!fe||Jt||(Jt=requestAnimationFrame(()=>{Jt=0,fe&&tg()}))}function ua(){let e=Br();if(!(at&&la===e&&e?.isConnected)){if(at?.disconnect(),fo?.disconnect(),la=e,!e||e===document.body){at=null;return}at=new MutationObserver(()=>we()),at.observe(e,{childList:!0,subtree:!0}),fo=new ResizeObserver(()=>pa()),fo.observe(e)}}function ng(e){if(fe){if(e.type==="post-start"){e.conversationId?(lt=!1,Xt.add(e.conversationId)):lt=!0,we();return}if(e.type==="post-end"){if(lt=!1,e.conversationId)Xt.delete(e.conversationId);else{let t=L();t&&Xt.delete(t)}we()}}}function og(e){if(!fe||!O.length||je?.hidden||e.altKey||e.ctrlKey||e.metaKey||Kp(e.target))return;let t=-1;if(e.key==="ArrowDown")t=Pr+1;else if(e.key==="ArrowUp")t=Pr-1;else if(e.key==="Home")t=0;else if(e.key==="End")t=O.length-1;else if(e.key==="Escape"){document.activeElement?.blur?.();return}else return;e.preventDefault(),da(Math.max(0,Math.min(t,O.length-1)))}function rg(){qc(),st?.disconnect(),st=null,at?.disconnect(),at=null,la=null,fo?.disconnect(),fo=null,po?.(),po=null,Qt=null,je?.remove(),je=null,go=null,ct=null,Nr=null}var Fc=p({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:ra,cleanupSelectors:[`#${Dc}`],settings:Or,start(){fe=!0,Ir=L(),E(ra,Bc),Ar=new AbortController;let{signal:e}=Ar;window.addEventListener("keydown",og,{signal:e}),window.addEventListener("popstate",we,{signal:e}),window.visualViewport?.addEventListener("resize",pa,{signal:e}),aa=K(ng),ia=se({onTick(){we()},onFall(){we()},onContext(){Yt.clear(),dt="",we()}}),ua(),we(),kp.debug("navigator started")},stop(){fe=!1,Jt&&cancelAnimationFrame(Jt),Jt=0,Zt&&cancelAnimationFrame(Zt),Zt=0,Ar?.abort(),Ar=null,ia?.(),ia=null,aa?.(),aa=null,Xt.clear(),lt=!1,rg(),Yt.clear(),O=[],dt="",y(ra)},onSettingsChange(){dt="",we()}});var zc=`.bloom-ts {
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
`;function Gc(e,t,n=Date.now()){let o=new Date(e);if(Number.isNaN(o.getTime()))return"";let r=new Date(n),i=o.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(o.toDateString()===r.toDateString()||!t)return i;let s=o.getFullYear()===r.getFullYear();return`${o.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Kc(e){try{return new Date(e).toISOString()}catch{return""}}var Yc=new v("MessageTimestamps"),Uc="messageTimestamps",Dr="bloom-ts",Vc=1500,ag="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",nn=x({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),on=new Map,rn=!1,tn=0,en,Fe=null,ba=null,ga=null,Wc=!1;function Xc(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function ha(){let e=nn.plain.stamps;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Jc(){let e={...ha()};for(let[n,o]of on)e[n]=o;let t=Object.keys(e);if(t.length>Vc){let n=t.slice(t.length-Vc),o={};for(let r of n)o[r]=e[r];nn.store.stamps=o;return}nn.store.stamps=e}var sg=$a(Jc,500);function Zc(e,t){!e||!t||on.get(e)===t||(on.set(e,t),sg(),bo())}function lg(e){return e?on.get(e)??ha()[e]??dr(e)??null:null}function cg(e){rn&&e.type==="message-time"&&Zc(e.messageId,e.createTime)}function dg(e){return(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function ug(){let e=Xc();if(!e)return[];let t=[];try{for(let n of e.querySelectorAll("[data-message-id]"))n.closest(ag)||t.push(n)}catch{}return t}function mg(e){try{return!!e.querySelector("time:not(.bloom-ts)")}catch{return!1}}function fg(){if(!rn)return;let e=nn.store.hideOwnMessages===!0,t=nn.store.showDate!==!1,n=H(),o=ug();Fe?.disconnect();try{o.forEach((r,i)=>{let a=r.getAttribute("data-message-id")||"",s=dg(r),l=r.querySelector(`:scope > .${Dr}`);if(e&&s==="user"){l?.remove();return}if(mg(r)){l?.remove();return}let c=lg(a);if(!c&&a&&(n||Wc)&&i>=o.length-2&&(c=Date.now(),Zc(a,c)),!c){l?.remove();return}let d=Gc(c,t);if(!d){l?.remove();return}let u=l;u||(u=document.createElement("time"),u.className=Dr,u.setAttribute("aria-hidden","true"),r.insertBefore(u,r.firstChild)),u.textContent!==d&&(u.textContent=d);let m=Kc(c);m&&u.getAttribute("datetime")!==m&&u.setAttribute("datetime",m)})}catch(r){Yc.debug("paint failed",r)}Wc=n,Qc()}function bo(){!rn||tn||(tn=requestAnimationFrame(()=>{tn=0,rn&&fg()}))}function Qc(){let e=Xc();if(!(Fe&&ba===e&&e?.isConnected)){if(Fe?.disconnect(),ba=e,!e||e===document.body){Fe=null;return}Fe=new MutationObserver(()=>bo()),Fe.observe(e,{childList:!0,subtree:!0})}}var ed=p({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Dr}`],settings:nn,start(){rn=!0,E(Uc,zc);let e=ha();for(let[t,n]of Object.entries(e))typeof n=="number"&&n>0&&on.set(t,n);ga=K(cg),Qc(),en!==void 0&&clearInterval(en),en=setInterval(bo,800),bo(),Yc.debug("timestamp watch started")},stop(){rn=!1,tn&&cancelAnimationFrame(tn),tn=0,en!==void 0&&(clearInterval(en),en=void 0),Fe?.disconnect(),Fe=null,ba=null,ga?.(),ga=null,Jc(),on.clear(),document.querySelectorAll(`.${Dr}`).forEach(e=>e.remove()),y(Uc)},onSettingsChange:bo});var ya="streamerMode",pg="filter:blur(6px)!important;transition:filter .2s ease",gg="filter:none!important",ho=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],an=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function ee(e,t){return e.map(n=>`${n} ${t}`)}var ut=x({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function sn(e,t=!0){let n=e.join(","),o=e.map(r=>`${r}:hover`).join(",");return`${n}{${pg}}${t?`${o}{${gg}}`:""}`}function td(){let e=[];if(ut.store.conversations!==!1&&(e.push(sn([...ee(an,'a[href^="/c/"]'),...ee(an,'a[href*="/c/"]')])),e.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),ut.store.projects!==!1&&(e.push(sn([...ee(an,'a[href*="/project"]'),...ee(an,'a[href*="/g/g-p-"]'),...ee(an,'[data-testid="project-name"]'),...ee(an,'[data-testid="project-link"]')])),e.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),ut.store.headerTitle!==!1&&e.push(sn(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),ut.store.accountAvatar!==!1&&e.push(sn([...ee(ho,"img"),...ee(ho,'[class*="avatar"]')],!1)),ut.store.accountName!==!1&&e.push(sn([...ee(ho,".min-w-0 > .truncate"),...ee(ho,".min-w-0.flex-1 .truncate")],!1)),ut.store.accountEmail!==!1&&e.push(sn([...ee(ho,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),e.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),e.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!e.length){y(ya);return}E(ya,e.join(`
`))}var nd=p({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[h.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:ut,start:td,onSettingsChange:td,stop(){y(ya)}});var od=`.bloom-gc-panel {
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
}`;var hg=new v("GreetingCustomizer"),ln="greetingCustomizer",rd="greetingCustomizerUi",yo=100,xa=30,yg=120,vg=1e3,xg=50,Eg=40,wg=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),vo=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),Fr=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function Sg(e){return!!e?.closest(wg)}function ld(e){return!!(Sg(e)||e.closest('[data-testid="temporary-chat-label"]')||e.closest("[hidden]")||e.getAttribute("aria-hidden")==="true"||e.classList.contains("sr-only"))}function ko(e){try{for(let t of document.querySelectorAll(e))if(!ld(t))return t}catch{}return null}function va(e){for(let t of e.split(",").map(n=>n.trim()).filter(Boolean))if(ko(t))return t;return e}var cd=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],B=x({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:_g},greetings:{type:0,description:"Greeting texts",hidden:!0,default:cd},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),pe=!1,un=!1,ft=null,_r,xo,cn,Eo,qr=0,$r=null,dn=null,wo=null,So=null,To=null,jr=null;function Te(){let e=location.pathname||"/";return e==="/"||e===""}function mt(){let e=B.plain.greetings;return Array.isArray(e)?e.filter(t=>typeof t=="string"):cd.slice()}function Lo(e){return String(e??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function id(e){B.store.greetings=e.slice(0,xa)}function Co(){let e=String(B.store.mode??"refresh");return e==="interval"||e==="manual"?e:"refresh"}function Tg(){return B.store.order==="random"?"random":"sequential"}function Lg(){return ge(Number(B.store.intervalSec??10),1,3600)*1e3}function kg(e){return String(e??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Cg(){return!!ko(Fr)}function zr(){return!!(ko(Fr)||ko(vo))}function Mg(e,t){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),o=[`content:"${e}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),r=Cg()?va(Fr):ko(vo)?va(vo):va(Fr),i=t?`${vo}{cursor:pointer!important;user-select:none!important}`:"";return[`${r}{${n}}`,`${r}::before{${o}}`,i,`@media (max-width:768px){${r}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function Ag(e,t){if(e<=0)return 0;if(e===1)return Number(B.plain.index)!==0&&(B.store.index=0),Number(B.plain.lastRandom)!==0&&(B.store.lastRandom=0),0;let n=Number(B.plain.index),o=Number(B.plain.lastRandom);if(!t)return n>=0&&n<e?n:0;if(Tg()==="random"){let a=n>=0&&n<e?n:o,s=Math.floor(Math.random()*e),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*e);return B.store.index=s,B.store.lastRandom=s,s}let i=((n>=-1&&n<e?n:-1)+1)%e;return B.store.index=i,i}function Se(e){if(!pe)return;if(!Te()){y(ln);return}let t=mt().map(Lo).filter(Boolean);if(!t.length){y(ln);return}let n=Ag(t.length,e),o=t[n]??t[0],r=Co()==="manual"&&t.length>1;E(ln,Mg(kg(o),r)),jr?.()}function Ea(){_r!==void 0&&(clearInterval(_r),_r=void 0)}function wa(){Ea(),!(!pe||!Te())&&Co()==="interval"&&(mt().filter(Boolean).length<=1||(_r=setInterval(()=>Se(!0),Lg())))}function Sa(){Eo!==void 0&&(clearTimeout(Eo),Eo=void 0),qr=0}function ad(){if(Sa(),!pe||!Te())return;qr=Eg;let e=()=>{if(Eo=void 0,!(!pe||!Te())){if(zr()){Co()==="refresh"&&!un?(un=!0,Se(!0)):Se(!1),wa();return}qr-=1,qr>0&&(Eo=setTimeout(e,xg))}};e()}function Ta(){if(ft===!0){zr()?Se(!1):ad();return}ft=!0,un=!1,Co()==="refresh"?(un=!0,Se(!0)):Se(!1),wa(),zr()||ad()}function La(){ft=!1,un=!1,Ea(),Sa(),y(ln)}function Gr(){cn===void 0&&(cn=window.setTimeout(()=>{cn=void 0,pe&&(Te()?Ta():ft!==!1&&La())},yg))}function Hg(){dn||(dn=history.pushState.bind(history),wo=history.replaceState.bind(history),So=function(...t){let n=dn(...t);return Gr(),n},To=function(...t){let n=wo(...t);return Gr(),n},history.pushState=So,history.replaceState=To)}function Ng(){So&&history.pushState===So&&dn&&(history.pushState=dn),To&&history.replaceState===To&&wo&&(history.replaceState=wo),dn=null,wo=null,So=null,To=null}function Pg(e){let t=e.target instanceof Element?e.target:null;t&&t.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(Gr)}function Rg(e){if(!pe||!Te()||Co()!=="manual"||mt().filter(Boolean).length<=1)return;let t=e.target instanceof Element?e.target:null;if(!t)return;let n=t.closest(vo);if(!n||ld(n))return;let o=window.getSelection?.();o&&String(o).trim()||Se(!0)}function Ig(){xo===void 0&&(xo=setInterval(()=>{if(!pe)return;let e=Te();if(e!==(ft===!0)){e?Ta():La();return}e&&zr()&&Se(!1)},vg))}function Og(){xo!==void 0&&(clearInterval(xo),xo=void 0)}function sd(e,t){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=e,n.setAttribute("aria-label",e);let o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.75"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),o.setAttribute("aria-hidden","true");for(let r of t.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",r),o.appendChild(i)}return n.appendChild(o),n}var Bg="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",Dg="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function $g(e,t){let n=Lo(e);return n?n.length>yo?`Keep it to ${yo} characters.`:mt().length+(t?1:0)>xa?`At most ${xa} greetings.`:null:"Enter a greeting."}function _g(e){e.className="bloom-gc-panel";let t="",n=-1,o="",r=-1,i=()=>{let a=mt(),s=Number(B.plain.index);e.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=yo,c.placeholder="New greeting (line breaks ok)",c.value=t,c.addEventListener("input",()=>{t=c.value,o="";let f=l.querySelector(".bloom-gc-count");f&&(f.textContent=`${Lo(t).length}/${yo}`);let T=l.querySelector(".bloom-gc-error");T&&(T.textContent="")}),l.appendChild(c);let d=document.createElement("div");d.className="bloom-gc-meta";let u=document.createElement("span");u.className="bloom-gc-count",u.textContent=`${Lo(t).length}/${yo}`;let m=document.createElement("span");m.className="bloom-gc-error",m.textContent=o;let S=document.createElement("div");if(S.className="bloom-gc-actions",n>=0){let f=document.createElement("button");f.type="button",f.className="bloom-gc-btn",f.textContent="Cancel",f.addEventListener("click",()=>{n=-1,t="",o="",i()}),S.appendChild(f)}let w=document.createElement("button");if(w.type="button",w.className="bloom-gc-btn bloom-gc-btn-primary",w.textContent=n>=0?"Update":"Add",w.addEventListener("click",()=>{let f=n<0,T=$g(t,f);if(T){o=T,i();return}let $=Lo(t),j=mt().slice();n>=0&&n<j.length?j[n]=$:j.push($),id(j),n=-1,t="",o="",i()}),S.appendChild(w),d.append(u,m,S),l.appendChild(d),e.appendChild(l),!a.length){let f=document.createElement("p");f.className="bloom-gc-empty",f.textContent="No greetings. The official heading stays.",e.appendChild(f);return}let g=document.createElement("div");g.className="bloom-gc-list",a.forEach((f,T)=>{let $=document.createElement("div");$.className="bloom-gc-item",T===s&&($.dataset.active="true");let j=document.createElement("button");j.type="button",j.className=`bloom-gc-body${r===T?"":" bloom-gc-clamp"}`,j.textContent=f,j.addEventListener("click",()=>{r=r===T?-1:T,i()});let fn=document.createElement("div");fn.className="bloom-gc-item-actions";let pt=sd("Edit",Bg);pt.addEventListener("click",()=>{n=T,t=f,o="",i()});let Le=sd("Delete",Dg);Le.addEventListener("click",()=>{let pn=mt().filter((gt,ze)=>ze!==T);id(pn),n===T?(n=-1,t=""):n>T&&(n-=1),i()}),fn.append(pt,Le),$.append(j,fn),g.appendChild($)}),e.appendChild(g)};return jr=i,i(),()=>{jr===i&&(jr=null),e.replaceChildren()}}var dd=p({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[h.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:rd,settings:B,start(){pe=!0,E(rd,od),Hg(),$r=new AbortController;let{signal:e}=$r;window.addEventListener("popstate",Gr,{signal:e}),document.addEventListener("click",Pg,{capture:!0,signal:e}),document.addEventListener("click",Rg,{signal:e}),Ig(),ft=null,Te()?Ta():La(),hg.debug("started")},stop(){pe=!1,$r?.abort(),$r=null,cn!==void 0&&(clearTimeout(cn),cn=void 0),Ea(),Sa(),Og(),Ng(),y(ln),un=!1,ft=null},onSettingsChange(){pe&&(Te()?(Se(!1),wa()):y(ln))}});var mn=new v("Bloom"),ud=!1,qg=Date.now(),jg=[Ns,Sl,Pl,Ol,ql,Kl,rc,ac,cc,vc,kc,Rc,Oc,Fc,ed,nd,dd];function Kr(e){return new Promise(t=>setTimeout(t,e))}function Fg(){return document.head?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.head&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}function zg(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var fd=8e3,md=300,Gg=250;async function Kg(){if(Ke())return await Kr(md),!0;for(;Date.now()-qg<fd;)if(await Kr(Gg),Ke())return await Kr(md),!0;return Ke()||Zr()}function ka(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function Ug(){if(ka())return!0;let e=Date.now()+fd;for(;Date.now()<e;)if(await Kr(100),ka())return!0;return ka()}function Vg(){try{GM_registerMenuCommand?.("Bloom++ settings",Hs)}catch{}}function Wg(){Do(()=>{hn("HostShell"),mn.info("host shell",F)}),$o(()=>{mn.info("idle ready",F)}),_o(()=>{Vr(),hn("HostReady"),mn.info("chrome ready",F)})}async function Ca(){await _a()}async function Ma(){if(ud)return;ud=!0;for(let n of jg)try{Wa(n)}catch(o){mn.error("register failed",n.name,o)}Ja(),hn("Init"),Vg(),Wg();let e=()=>hn("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await Fg(),Vr(),mn.info("styles ready",F),await zg(),Ug().then(n=>{n&&qo()}),!await Kg()){mn.warn("late islands not detected; starting default plugins",F),yt(),jo();return}await os()}var pd=typeof unsafeWindow<"u"?unsafeWindow:window,Yg=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||Yg){let e=pd.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",F);try{Object.defineProperty(pd,"Bloom",{value:Aa,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}Ca().then(()=>Ma()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
