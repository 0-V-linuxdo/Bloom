// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260920] v1.4.49
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

/* Bloom++ [20260920] v1.4.49. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var id=Object.defineProperty;var ad=(e,t)=>{for(var n in t)id(e,n,{get:t[n],enumerable:!0})};var ka={};ad(ka,{REPO_URL:()=>ts,Settings:()=>b,VERSION:()=>z,contextKeyFromUrl:()=>oe,conversationTitle:()=>Et,conversationToken:()=>_,currentConversationId:()=>M,hasDraftText:()=>ne,hasErrorToast:()=>K,hasLateIslands:()=>ze,init:()=>La,initSettings:()=>Ta,isDocumentInteractive:()=>ns,isStreaming:()=>N,isUserDraftEmpty:()=>Re,messageCreateTime:()=>rr,plugins:()=>Z,requestChromeReady:()=>Bo,requestIdleReady:()=>ft,requestShellReady:()=>Oo,setEditorText:()=>be,subscribeHarvest:()=>ie,watchStreamingEdge:()=>se,whenChromeReady:()=>Io,whenIdleReady:()=>Po,whenShellReady:()=>Ro});var Le=new Map,So=!1;function sd(){return document.getElementById("bloom-root")?.shadowRoot??null}function ld(){return document.head??null}function ut(){let e=sd();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=cd()}function Fr(e,t){if(!So)return;let n=ld();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),ut();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,ut();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,ut()}function w(e,t){let n=Le.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},Le.set(e,n)),So&&Fr(e,n)}function Ca(){So=!0;for(let[e,t]of Le)Fr(e,t);return ut(),!0}function Ma(e){let t=Le.get(e);t&&(t.disabled=!1,So&&Fr(e,t))}function Aa(e){let t=Le.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),ut())}function y(e){let t=Le.get(e);t&&(t.el?.remove(),Le.delete(e),ut())}function cd(){return Array.from(Le.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var v=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function p(e){return e}var zr=new Map;function To(e,t){let n=zr.get(e);return n||(n=new Set,zr.set(e,n)),n.add(t),()=>n.delete(t)}function Fe(e,t){let n=zr.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var dd="bloompp";function Ha(){return new Promise((e,t)=>{let n=indexedDB.open(dd,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function Na(e){try{let t=await Ha();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function Ra(e,t){try{let n=await Ha();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function cn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function fe(e,t,n){return Math.min(n,Math.max(t,e))}function Pa(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function Ia(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}function Oa(e,t){let n;return((...o)=>{n&&clearTimeout(n),n=setTimeout(()=>e(...o),t)})}var Lo=new v("SettingsStore"),ke="BloomSettings",ud=100;function Co(e){if(cn(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(cn(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return cn(n)?n:null}return null}catch{return null}}var ko=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let c=n?`${n}.${a}`:a;for(let[l,d]of this.defaultGetters)if(c.startsWith(l)){let u=c.slice(l.length+1);if(u&&!u.includes(".")){let m=d(u);m!==void 0&&(i[a]=m,s=m);break}}}return cn(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let c=n?`${n}.${a}`:a;return this.notifyListeners(c),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Lo.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},ud))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(ke,this.plain)}catch{try{GM_setValue(ke,t)}catch(n){Lo.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(ke,t)}catch{}Ra(ke,t).catch(n=>Lo.warn("Failed to save settings to IndexedDB:",n))}catch(t){Lo.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){Pa(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var md=new v("Settings"),fd={plugins:{}},b=new ko(structuredClone(fd)),pd=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function gd(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function x(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(b.store.plugins[n]||(b.store.plugins[n]={}),b.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?b.plain.plugins[n]??{}:{}}};return t}function bd(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function Ba(){let e=null;if(e=Co(bd(ke)),e||(e=Co(await Na(ke))),!e)try{e=Co(localStorage.getItem(ke))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(b.plain.plugins=t),md.debug("Loaded settings")}}function Da(e,t){t&&(t.pluginName=e,b.plain.plugins[e]||(b.plain.plugins[e]={}),b.setDefaultGetter(pd(e),n=>{if(n!=="enabled")return gd(t.def,n)}))}function $a(){return b.plain.plugins.Settings||(b.store.plugins.Settings={}),b.store.plugins.Settings}function Mo(){return $a().pinnedPlugins??[]}function _a(e){return Mo().includes(e)}function qa(e){let t=Mo(),n=t.includes(e);return b.store.plugins.Settings={...b.plain.plugins.Settings,pinnedPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}function Ao(){return $a().starredPlugins??[]}function ja(e){return Ao().includes(e)}function Fa(e){let t=Ao(),n=t.includes(e);return b.store.plugins.Settings={...b.plain.plugins.Settings,starredPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}var Ho=new v("PluginManager"),Z={},dn=new Set;function Ka(e){if(Z[e.name]){Ho.warn("Duplicate plugin",e.name);return}Z[e.name]=e,Da(e.name,e.settings)}function mt(e){let t=Z[e];if(!t)return!1;if(t.required)return!0;let n=b.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function Ua(e){let t=Z[e];if(!t||t.required)return;let n=!mt(e);b.plain.plugins[e]||(b.store.plugins[e]={}),b.store.plugins[e].enabled=n,n?Va(t):hd(t),Fe("pluginToggle",{name:e,enabled:n})}function Va(e,t=!1){if(!dn.has(e.name)&&mt(e.name))try{e.managedStyle&&Ma(e.managedStyle),e.start?.(),dn.add(e.name),e.settings&&b.addPrefixChangeListener(`plugins.${e.name}.`,()=>{dn.has(e.name)&&e.onSettingsChange?.()}),t||Ho.debug("Started",e.name)}catch(n){Ho.error("Failed to start",e.name,n)}}function hd(e){if(dn.has(e.name)){try{e.stop?.()}catch(t){Ho.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(Aa(e.managedStyle),y(e.managedStyle)),dn.delete(e.name)}}function un(e){for(let t of Object.values(Z))(t.startAt??"DOMContentLoaded")===e&&Va(t)}var za=2,Ga="defaultsRev";function Wa(){for(let t of Object.values(Z))b.plain.plugins[t.name]||(b.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=b.store.plugins.Settings??(b.store.plugins.Settings={});if(e[Ga]!==za){for(let t of["NoShareLink","NoDictation"]){let n=b.store.plugins[t]??(b.store.plugins[t]={});n.enabled=!1}e[Ga]=za}}var mn=!1,No=!1,Gr=!1,Xa=[],Ja=[],Za=[];function Kr(e){let t=e.splice(0);for(let n of t)n()}function fn(){mn||(mn=!0,Kr(Xa))}function Ur(){No||(No=!0,mn||fn(),Kr(Ja))}function Qa(){Gr||(Gr=!0,mn||fn(),No||Ur(),Kr(Za))}function Ro(e){mn?e():Xa.push(e)}function Po(e){No?e():Ja.push(e)}function Io(e){Gr?e():Za.push(e)}function Oo(){fn()}function ft(){fn(),Ur()}function Bo(){Qa()}function Ya(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function es(){await Ya(4e3),fn(),await Ya(4e3),Ur(),Qa()}var h={p:"0-V-linuxdo"},z="[20260920] v1.4.49",ts="https://github.com/0-V-linuxdo/Bloom";function yd(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function vd(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function Vr(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function ze(){return Vr()?yd()||vd():!1}function ns(){return ze()}var xd=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),os=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),wd=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Ed="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function gt(e){return e.id==="bloom-root"||!!e.closest(Ed)}function rs(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function Do(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function Wr(e){if(!(e instanceof HTMLElement)||!e.isConnected||gt(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&Do(t)?!1:e.getClientRects().length>0}function pt(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Sd(){let e=[];for(let t of document.querySelectorAll(xd))!(t instanceof HTMLElement)||!t.isConnected||gt(t)||e.push(t);return e}function $o(e){if(!e.isConnected||gt(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function pn(){return Sd().filter($o)[0]??null}function Yr(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||gt(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function Xr(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!gt(n)&&!pt(n)&&n.parentElement&&!pt(n.parentElement)&&(t=n);let o=t.parentElement;if(o&&!pt(o)&&!gt(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!pt(o.parentElement))return o}return t}function is(){let e=document.querySelectorAll(os);for(let n of e)if(Wr(n)&&!Do(n)&&rs(n))return n;let t=document.querySelectorAll(wd);for(let n of t){if(!Wr(n)||!rs(n)||Do(n))continue;let o=n.querySelector(os);return Wr(o)&&!Do(o)?o:n}return null}function as(){let e=pn();if(e){let t=Xr(e),n=t.parentElement;if(n&&!pt(n))return n;if(!pt(t))return t}return Yr()}function ss(e){let t=pn();return t?e.composedPath().includes(t):!1}var Zr=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Td={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Qr(e){return e==="auto"||e==="light"||e==="dark"}function Ld(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function kd(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function Jr(e){let t=Ld(e);return t?kd(t)>.55?"light":"dark":null}function Cd(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=Jr(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=Jr(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Jr(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function ls(e){return e==="auto"?Cd():e}function Md(e){try{let t=getComputedStyle(document.documentElement);for(let n of Zr){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function cs(e,t,n){let o=Td[t];if(n){Md(e);for(let r of Zr)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of Zr)e.style.setProperty(r,o[r])}function ds(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var ei=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var Hd="bloom-root",Q="bloom-rail-item",zo="bloom-account-item",Ke="bloom-sidebar-panel",Ln="bloom-plugin-dialog",Yo="bloom-plugin-layer",Go="bloom-settings-css",Nd=2e3,wn=x({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),fs=null,Rd=null,He=!1,ri=[],_o=null,Ko=null,Me=null,jo=null,pe=null,En=null,gn,bt=0,Sn=0,bn=0,hn=null,yn=null,Uo=null,ps=null,vn=null,ti=[],Vo=!1,Pd=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Id=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],Xo="",Tn="all",Ne="all";function Jo(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function gs(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Od(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function Bd(e){let t='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return e?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${t}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`}function Dd(e){let t='<path d="M12 17v5"/>';return e?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var $d={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function _d(e){return e.icon||$d[e.name]||Jo()}function bs(){return Qr(wn.store.appearance)?wn.store.appearance:"auto"}function qd(){let e=document.createElement("div");e.className="bloom-field bloom-appearance-row";let t=document.createElement("span");t.className="bloom-field-label",t.textContent="Appearance";let n=document.createElement("select");n.setAttribute("aria-label","Appearance");let o=wn.def.appearance,r=o.type===3?o.options??[]:[];for(let i of r){let a=document.createElement("option");a.value=i.value,a.textContent=i.label,n.appendChild(a)}return n.value=bs(),n.addEventListener("change",()=>{Qr(n.value)&&(wn.store.appearance=n.value)}),e.append(t,n),e}function ni(e,t,n){e&&(e.setAttribute("data-bloom-scheme",t),cs(e,t,n),e.style.removeProperty("--bloom-rail-surface"))}function hs(e){e&&(e.style.removeProperty("--bloom-rail-surface"),e.style.removeProperty("--bg-primary"))}function xn(){let e=bs(),t=ls(e),n=e==="auto";ni(fs,t,n);let o=document.getElementById(Ke);o instanceof HTMLElement&&ni(o,t,n);let r=document.getElementById(Ln);r instanceof HTMLElement&&ni(r,t,n);let i=document.getElementById(Q);i instanceof HTMLElement&&hs(i),Fe("schemeChange",{scheme:t,pref:e})}function ys(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(e=>e.remove())}function vs(){if(w("settings",ei),document.getElementById(Go)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=Go,e.textContent=ei,document.head.appendChild(e)}function jd(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Fd(){for(let e of ri)e();ri=[]}function xs(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function zd(e){return e.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,t=>t.toUpperCase())}function si(e){return e.settings?Object.entries(e.settings.def).filter(([,t])=>!t.hidden):[]}function Gd(e){return si(e).length>0}function Fo(e){if(e.default!==void 0)return e.default;if(e.type===3)return(e.options?.find(n=>n.default)??e.options?.[0])?.value;if(e.type===2)return!1;if(e.type===4)return e.min??0;if(e.type===0)return"";if(e.type===1)return 0}function Kd(e,t){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let o=document.createElement("span");if(o.className="bloom-plugin-dialog-label-title",o.textContent=zd(e),n.appendChild(o),t.description){let r=document.createElement("span");r.className="bloom-plugin-dialog-label-desc",r.textContent=t.description,n.appendChild(r)}return n}function Ud(e,t,n){if(n.hidden)return null;let o=n.type===4||n.type===0||n.type===1||n.type===5,r=document.createElement("div");r.className=o?"bloom-field bloom-field-stack":"bloom-field",r.appendChild(Kd(t,n));let i=b.store.plugins[e]??(b.store.plugins[e]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",ri.push(n.render(a)),r.appendChild(a),r}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let c=document.createElement("option");c.value=s.value,c.textContent=s.label,a.appendChild(c)}return a.value=String(i[t]??Fo(n)??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),r.appendChild(a),r}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??Fo(n)??n.min??0);let c=document.createElement("span");return c.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),c.textContent=s.value}),a.append(s,c),r.appendChild(a),r}if(n.type===2){let a=xs(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),r.appendChild(a),r}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[t]??Fo(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[t]=n.type===1?Number(a.value):a.value}),r.appendChild(a),r}return r}function us(e,t){let n=document.createElement("div");n.className=t?`bloom-plugin-dialog-field ${t}`:"bloom-plugin-dialog-field";let o=document.createElement("div");return o.className="bloom-plugin-dialog-field-label",o.textContent=e,n.appendChild(o),n}function Vd(e){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let t=b.store.plugins[e.name]??(b.store.plugins[e.name]={});for(let[n,o]of si(e)){if(n==="enabled"||o.type===5)continue;let r=Fo(o);r!==void 0&&(t[n]=r)}Es(e)}function ws(e){e.key==="Escape"&&(!document.getElementById(Yo)&&!document.getElementById(Ln)||(e.stopPropagation(),ht()))}function Wd(){Vo||(document.addEventListener("keydown",ws),Vo=!0)}function Yd(){Vo&&(document.removeEventListener("keydown",ws),Vo=!1)}function ht(){Fd(),Yd(),document.getElementById(Yo)?.remove(),document.getElementById(Ln)?.remove()}function Es(e){if(ht(),!document.body)return;let t=document.createElement("div");t.id=Yo,t.className="bloom-plugin-layer",t.addEventListener("pointerdown",Ae),t.addEventListener("pointerup",Ae),t.addEventListener("click",d=>{d.stopPropagation(),d.target===t&&ht()});let n=document.createElement("div");n.id=Ln,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",Ae),n.addEventListener("pointerup",Ae),n.addEventListener("click",Ae);let o=document.createElement("button");o.type="button",o.className="bloom-icon-btn bloom-plugin-dialog-close",o.setAttribute("aria-label","Close"),o.innerHTML=gs(),o.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),ht()});let r=document.createElement("div");r.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=e.name,r.appendChild(i),e.description){let d=document.createElement("p");d.className="bloom-plugin-dialog-sub",d.textContent=e.description,r.appendChild(d)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(o,r,a),e.authors?.length){let d=us("Authors"),u=document.createElement("p");u.className="bloom-plugin-dialog-authors",u.textContent=e.authors.join(", "),d.appendChild(u),n.appendChild(d)}let s=us("Settings","bloom-plugin-dialog-settings"),c=document.createElement("div");c.className="bloom-plugin-dialog-settings-list";let l=si(e);if(l.length)for(let[d,u]of l){let m=Ud(e.name,d,u);m&&c.appendChild(m)}if(!c.childElementCount){let d=document.createElement("p");d.className="bloom-dialog-empty",d.textContent="No configurable settings.",c.appendChild(d)}if(s.appendChild(c),n.appendChild(s),l.length){let d=document.createElement("div");d.className="bloom-plugin-dialog-footer";let u=document.createElement("button");u.type="button",u.className="bloom-plugin-dialog-reset",u.textContent="Reset",u.addEventListener("click",()=>Vd(e)),d.appendChild(u),n.appendChild(d)}t.appendChild(n),document.body.appendChild(t),Wd(),xn()}function Xd(e){let t=document.createElement("div");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=_d(e);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=e.name,a.title=e.name,r.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let c=ja(e.name),l=document.createElement("button");if(l.type="button",l.className=`bloom-icon-btn bloom-card-star${c?" bloom-card-star-active":""}`,l.setAttribute("aria-label",c?"Remove from favorites":"Add to favorites"),l.innerHTML=Bd(c),l.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation();let f=Fa(e.name);Fe("pluginStar",{name:e.name,starred:f})}),s.appendChild(l),!e.required){let g=_a(e.name),f=document.createElement("button");f.type="button",f.className=`bloom-icon-btn bloom-card-pin${g?" bloom-card-pin-active":""}`,f.setAttribute("aria-label",g?"Unpin from top":"Pin to top"),f.innerHTML=Dd(g),f.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();let $=qa(e.name);Fe("pluginPin",{name:e.name,pinned:$})}),s.appendChild(f)}if(Gd(e)){let g=document.createElement("button");g.type="button",g.className="bloom-icon-btn bloom-card-settings",g.setAttribute("aria-label",`${e.name} settings`),g.innerHTML=Od(),g.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),Es(e)}),s.appendChild(g)}let d=xs(e.name,mt(e.name),!!e.required),u=d.querySelector("input");if(u?.addEventListener("click",g=>g.stopPropagation()),u?.addEventListener("change",()=>{Ua(e.name)}),s.appendChild(d),o.append(r,s),n.appendChild(o),e.description){let g=document.createElement("div");g.className="bloom-card-desc",g.textContent=e.description,n.appendChild(g)}let m=document.createElement("div");m.className="bloom-card-separator";let S=document.createElement("div");S.className="bloom-card-footer";let E=document.createElement("div");return E.className="bloom-card-author",E.textContent=e.authors?.filter(Boolean).join(", ")||"\xA0",S.appendChild(E),t.append(n,m,S),t}function Ss(){return Object.values(Z).filter(e=>!e.hidden&&e.name!=="Settings")}function Ts(e,t){return t==="all"||t==="favorites"?!0:(e.tags??[]).includes(t)}function Jd(e){return`${e.name} ${e.description??""} ${(e.tags??[]).join(" ")}`.toLowerCase()}function Zd(){return Xo.trim()?"No plugins match your search.":Ne==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function Qd(){let e=Ss();return Id.filter(t=>t.id==="favorites"||t.id==="all"?!0:e.some(n=>Ts(n,t.id)))}function eu(){if(vn){vn.replaceChildren();for(let e of Qd()){let t=document.createElement("button");t.type="button",t.className=`bloom-plugin-tab${Ne===e.id?" bloom-plugin-tab-active":""}`,t.textContent=e.label,t.addEventListener("click",()=>{Ne=e.id,Ge()}),vn.appendChild(t)}}}function tu(){let e=Ss();if(Ne==="favorites"){let t=new Set(Ao());e=e.filter(n=>t.has(n.name))}else Ne!=="all"&&(e=e.filter(t=>Ts(t,Ne)));return Tn==="enabled"&&(e=e.filter(t=>mt(t.name))),Tn==="disabled"&&(e=e.filter(t=>!mt(t.name))),e}function Ge(){if(!hn)return;eu();let e=tu();Uo&&(Uo.placeholder=`Search ${e.length} plugins...`);let t=e,n=Xo.trim().toLowerCase();if(n&&(t=t.filter(o=>Jd(o).includes(n))),Ne!=="favorites"){let o=Mo();if(o.length){let r=new Map(o.map((i,a)=>[i,a]));t=t.slice().sort((i,a)=>{let s=r.has(i.name),c=r.has(a.name);return s!==c?s?-1:1:s?(r.get(i.name)??0)-(r.get(a.name)??0):i.name.localeCompare(a.name)})}}hn.replaceChildren();for(let o of t)hn.appendChild(Xd(o));yn&&(yn.hidden=t.length>0,yn.textContent=Zd())}function Ae(e){e.stopPropagation()}function oi(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function li(){document.getElementById(Q)?.setAttribute("aria-expanded",He?"true":"false")}function nu(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function ci(){ht(),Xo="",Tn="all",Ne="all",document.getElementById(Ke)?.remove(),He=!1,li()}function ou(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",Ae),t.addEventListener("pointerup",Ae),t.addEventListener("click",Ae);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-titles";let i=document.createElement("div");i.className="bloom-settings-brand";let a=document.createElement("span");a.className="bloom-settings-mark",a.innerHTML=Jo();let s=document.createElement("h2");s.textContent="Bloom++",i.append(a,s);let c=document.createElement("p");c.className="bloom-settings-sub",c.textContent="Toggle features. Some need a reload. Click the sliders icon to configure.",r.append(i,c);let l=document.createElement("button");l.type="button",l.className="bloom-icon-btn",l.setAttribute("aria-label","Close"),l.innerHTML=gs(),l.addEventListener("click",ci),o.append(r,l),n.appendChild(o),n.appendChild(qd());let d=document.createElement("div");d.className="bloom-plugin-tabs",n.appendChild(d);let u=document.createElement("div");u.className="bloom-search-bar";let m=document.createElement("input");m.type="search",m.className="bloom-search-input",m.setAttribute("aria-label","Search plugins"),m.placeholder="Search plugins...",m.addEventListener("input",()=>{Xo=m.value,Ge()});let S=document.createElement("select");S.className="bloom-search-filter",S.setAttribute("aria-label","Filter plugins");for(let f of Pd){let T=document.createElement("option");T.value=f.value,T.textContent=f.label,S.appendChild(T)}S.value=Tn,S.addEventListener("change",()=>{Tn=S.value,Ge()}),u.append(m,S),n.appendChild(u);let E=document.createElement("div");E.className="bloom-plugin-list",n.appendChild(E);let g=document.createElement("p");return g.className="bloom-tab-empty",g.hidden=!0,n.appendChild(g),t.appendChild(n),hn=E,yn=g,Uo=m,ps=S,vn=d,Ge(),t}function ru(e){e.classList.add("bloom-rail-dock")}function iu(){let e=document.getElementById(Q);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&$o(e)?e:null}function au(){if(document.getElementById(Ke)?.remove(),!document.body)return;let e=ou(Ke);ru(e),document.body.appendChild(e),He=!0,ht(),xn(),li(),Fe("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:z,dock:"center",rail:!!iu()})}function di(){let e=document.getElementById(Ke);if(e instanceof HTMLElement&&e.isConnected&&nu(e)){ci();return}e?.remove(),au()}function su(){let e=document.createElement("button");return e.type="button",e.id=Q,e.className="bloom-rail-item",e.setAttribute("aria-controls",Ke),e.setAttribute("aria-expanded",He?"true":"false"),e.innerHTML=`<span class="bloom-rail-mark">${Jo()}</span><span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),di()}),e}function ms(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function lu(e){let t=e.querySelector("img");if(t instanceof HTMLElement){let n=t.getBoundingClientRect();if(n.width>8&&n.height>8)return t}for(let n of e.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}return null}function cu(e,t){for(let n of e.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||t&&(n===t||n.contains(t)||t.contains(n))||(n.textContent||"").trim().length<2)continue;let r=n.getBoundingClientRect();if(r.width>16&&r.height>8&&r.height<40)return n}return null}function Ce(e,t,n){let o=`${n}px`;e.style.getPropertyValue(t)!==o&&e.style.setProperty(t,o)}function Ls(e,t){if(e.classList.contains("bloom-rail-compact"))return;let n=e.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!e.isConnected||!t.isConnected)return;let o=lu(t),r=getComputedStyle(t),i=Number.parseFloat(r.paddingTop),a=Number.parseFloat(r.paddingBottom);if(Number.isFinite(i)&&Ce(e,"padding-top",Math.round(i)),Number.isFinite(a)&&Ce(e,"padding-bottom",Math.round(a)),o){let s=o.getBoundingClientRect(),c=Math.max(20,Math.round(s.width));Ce(n,"width",c),Ce(n,"height",Math.max(20,Math.round(s.height)));let l=e.getBoundingClientRect(),d=Math.round(s.left-l.left);d>=0&&d<=40&&Ce(e,"padding-left",d);let u=cu(t,o);if(u){let m=u.getBoundingClientRect(),S=n.getBoundingClientRect(),E=Math.round(m.left-S.right);E>=0&&E<=24&&Ce(e,"gap",E)}}else{let s=Number.parseFloat(r.paddingLeft),c=Number.parseFloat(r.columnGap||r.gap);Number.isFinite(s)&&Ce(e,"padding-left",Math.round(s)),Number.isFinite(c)&&c>0&&Ce(e,"gap",Math.round(c))}hs(e)}function ii(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function du(){if(En?.isConnected&&pe){pe.observe(En,{childList:!0});return}ai()}function uu(e){if(ii(e))return!1;try{if(e.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function mu(e,t){!t||!e||requestAnimationFrame(()=>{if(e.isConnected){bn=0;return}bn+=1,Sn=Date.now()+Math.min(8e3,250*2**Math.min(bn,5))})}function fu(){bt||Date.now()<Sn||(bt=requestAnimationFrame(()=>{bt=0,!(Date.now()<Sn)&&(document.getElementById(Q)?.isConnected||Wo())}))}function Wo(){if(!document.body)return;pe?.disconnect();let e=null,t=!1;try{let n=document.getElementById(Q);e=n instanceof HTMLButtonElement?n:su();let o=pn(),r=Yr();if(o){let i=Xr(o),a=i.parentElement;if(ii(i)||a&&ii(a))return;e.isConnected&&e.nextElementSibling===i||(i.before(e),t=!0),ms(e),Ls(e,o)}else r?(e.parentElement!==r&&(r.appendChild(e),t=!0),ms(e,!0)):e.isConnected&&!$o(e)&&(e.remove(),e=null)}finally{mu(e,t),du(),li()}}function ai(){let e=as();!e||!uu(e)||En===e&&pe||(pe?.disconnect(),En=e,pe=new MutationObserver(()=>{document.getElementById(Q)?.isConnected||fu()}),pe.observe(e,{childList:!0}))}function pu(){Wo(),ai(),gn===void 0&&(gn=window.setInterval(()=>{let e=document.getElementById(Q);if(!(e instanceof HTMLElement)||!e.isConnected)Date.now()>=Sn&&Wo();else{bn=0;let t=pn();t&&Ls(e,t)}ai()},Nd))}function gu(){gn!==void 0&&(clearInterval(gn),gn=void 0),bt&&cancelAnimationFrame(bt),bt=0,Sn=0,bn=0,pe?.disconnect(),pe=null,En=null}function bu(e){jo===e&&Me||(Me?.disconnect(),jo=e,Me=new MutationObserver(()=>{if(!e.isConnected){Me?.disconnect(),Me=null,jo=null;return}ks(e)}),Me.observe(e,{childList:!0}))}function ks(e){if(bu(e),e.querySelector(`#${zo}`))return;let t=document.createElement("button");t.type="button",t.id=zo,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${Jo()}<span>Bloom++</span>`,t.addEventListener("pointerdown",oi),t.addEventListener("pointerup",oi),t.addEventListener("click",n=>{oi(n),di()}),e.insertBefore(t,e.firstChild)}function qo(){let e=is();return e?(ks(e),!0):!1}function hu(e){ss(e)&&(queueMicrotask(qo),requestAnimationFrame(()=>{qo()}),window.setTimeout(qo,60),window.setTimeout(qo,180))}function yu(){Ko?.abort();let e=new AbortController;Ko=e,document.addEventListener("click",hu,{signal:e.signal})}function vu(){Ko?.abort(),Ko=null,Me?.disconnect(),Me=null,jo=null}function Cs(){ft(),jd(()=>{vs(),ys(),Wo(),di()})}var Ms=p({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[h.p],required:!0,hidden:!0,enabledByDefault:!0,settings:wn,startAt:"HostReady",cleanupSelectors:[`#${Hd}`,`#${Q}`,`#${zo}`,`#${Ke}`,`#${Yo}`,`#${Ln}`,`#${Go}`,"#bloom-menu-panel"],start(){vs(),ys(),pu(),yu(),_o?.(),_o=ds(xn),xn(),ti=[To("pluginToggle",()=>{He&&Ge()}),To("pluginPin",()=>{He&&Ge()}),To("pluginStar",()=>{He&&Ge()})]},stop(){gu(),vu(),_o?.(),_o=null;for(let e of ti)e();ti=[],ci(),document.getElementById(Q)?.remove(),document.getElementById(zo)?.remove(),document.getElementById(Go)?.remove(),fs=null,Rd=null,hn=null,yn=null,Uo=null,ps=null,vn=null,He=!1},onSettingsChange:xn});var Zo='form[data-type="unified-composer"], form.w-full[data-type]',ee=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),yt=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),As=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Hs=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),xu=/stop streaming|stop generating|停止生成|停止输出|停止响应/,wu='[contenteditable="false"], button, [role="button"]';function G(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function Ue(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!G(r)))return r;return null}function Ns(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function C(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=Ns(e);return!!(xu.test(n)||/^stop$/i.test(n))}function te(){let t=Array.from(document.querySelectorAll(Zo)).find(G);if(t instanceof HTMLElement)return t;let n=Ue(document,ee),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function D(){let e=Array.from(document.querySelectorAll(ee));return e.find(G)??e[0]??null}function Eu(e,t){if(!e||e===t||!t.contains(e))return!1;let n=e.closest(wu);return!!n&&n!==t&&t.contains(n)}function ui(e,t){let n=[];try{let o=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),r=o.nextNode();for(;r;){let i=r.parentElement;i&&Eu(i,t)||n.push(r.textContent??""),r=o.nextNode()}}catch{return e.innerText??e.textContent??""}return n.join("")}function ne(e){let t=e??D();return t?ui(t,t).replaceAll("\u200B","").trim().length>0:!1}function Re(e){return!ne(e)}function kn(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function Rs(e){let t=te();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!G(n))&&e(n))return n;return null}function ge(){let e=te(),t=Ue(e,yt)??Ue(document,yt);return t&&!C(t)?t:Rs(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!C(n);let r=Ns(n);return/^(send|send prompt|发送)$/i.test(r)&&!C(n)})}function mi(){let e=ge();return!!e&&kn(e)}function Cn(){let e=te(),t=Ue(e,As,!0)??Ue(document,As,!0);if(t)return t;let n=Ue(e,Hs)??Ue(document,Hs);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&G(o)&&C(o))return o}return Rs(C)}function F(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>ui(n,e)).join(`
`):ui(e,e)}function fi(e,t=!1){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function be(e,t,n=!1){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r);try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch{e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),fi(e,n)}var Ps="bloom-host-icon",Mn="data-bloom-host-rel",pi="not all",gi=0,Is=0,Su=400;function Os(e){gi+=1;try{e()}finally{gi-=1}}function Qo(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function vt(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function Bs(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function Tu(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Lu(e,t){if(e.lastElementChild===t)return;let n=Date.now();n-Is<Su||(Is=n,e.appendChild(t))}function ku(e,t){for(let n of e.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===t||Qo(n)&&(n.getAttribute(Mn)||n.setAttribute(Mn,n.rel),n.media!==pi&&(n.media=pi),n.rel!==Ps&&(n.rel=Ps))}function Cu(e){for(let t of e.querySelectorAll(`link[${Mn}]`)){if(!(t instanceof HTMLLinkElement))continue;let n=t.getAttribute(Mn);n&&(t.rel=n),t.removeAttribute(Mn),t.media===pi&&t.removeAttribute("media")}}function bi(e,t){let{head:n}=document;!n||!t||Os(()=>{ku(n,e);let o=Bs(e),{type:r,sizes:i}=Tu(t);o?Lu(n,o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function Ds(e,t){let{head:n}=document;n&&Os(()=>{Bs(e)?.remove(),Cu(n)})}function $s(e,t){let{head:n}=document;if(!n)return null;let o=0,r=new MutationObserver(i=>{if(gi)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===e?a=!0:Qo(c.target)&&(a=!0,vt(c.target.href)&&(s=c.target.href)));for(let l of c.removedNodes)Qo(l)&&l.id===e&&(a=!0);for(let l of c.addedNodes)Qo(l)&&l.id!==e&&(a=!0,vt(l.href)&&(s=l.href))}a&&(o||(o=requestAnimationFrame(()=>{o=0,t(s)})))});return r.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),r}var _s=/\/c\/([a-zA-Z0-9_-]{8,})/i;function _(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=l=>{let d=n.indexOf(l);return d>=0&&n[d+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(l,d)=>{try{return document.querySelector(l)?.getAttribute(d)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function oe(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function xt(e){if(!e)return"";try{return(/^https?:/i.test(e)?new URL(e,location.origin).pathname:e).match(_s)?.[1]??""}catch{return e.match(_s)?.[1]??""}}function M(){let e=xt(location.pathname);if(e)return e;let n=_().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return""}var zs=new v("Harvest"),Mu=1500,Au=200,er=new Set,tr=new Map,nr=new Map,wt=null,or=null,An=null,re=0;function Hu(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Nu(e){try{if(typeof e=="string")return e;if(e instanceof URL)return e.href;if(typeof Request<"u"&&e instanceof Request)return e.url}catch{}return String(e)}function Ru(e,t){let n=t?.method,o=typeof Request<"u"&&e instanceof Request?e.method:"";return(n||o||"GET").toUpperCase()}function Gs(e){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(e)}var Pu=/"action"\s*:\s*"(next|continue|variant)"/i;function Iu(e,t,n){return!(t!=="POST"||Gs(e)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(e)||typeof n=="string"&&/"action"\s*:/.test(n)&&!Pu.test(n))}function Ou(e,t){return t!=="GET"||Gs(e)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(e)}function qs(e){return e.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function Ks(e){return e?e.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function Bu(e){return typeof e=="string"?Ks(e):""}function hi(e){if(typeof e=="number"&&Number.isFinite(e)&&e>0)return e>1e12?e:Math.round(e*1e3);if(typeof e=="string"){let t=e.trim();if(!t)return null;if(/^\d+(\.\d+)?$/.test(t))return hi(Number(t));let n=Date.parse(t);return Number.isFinite(n)?n:null}return null}function Us(e,t){if(e.size<=t)return;let n=e.size-t,o=0;for(let r of e.keys())if(e.delete(r),++o>=n)break}function js(e,t,n){!e||!t||nr.get(e)!==t&&(nr.set(e,t),Us(nr,Mu),Pe({type:"message-time",messageId:e,createTime:t,conversationId:n}))}function Du(e,t){let n=t.trim();!e||!n||tr.get(e)!==n&&(tr.set(e,n),Us(tr,Au),Pe({type:"conversation-meta",conversationId:e,title:n}))}function Hn(e,t,n=0){if(n>6||!e||typeof e!="object")return;if(Array.isArray(e)){for(let c of e)Hn(c,t,n+1);return}let o=e,r=typeof o.conversation_id=="string"&&o.conversation_id||typeof o.conversationId=="string"&&o.conversationId||t;typeof o.title=="string"&&r&&!o.author&&!o.content&&!o.role&&Du(r,o.title);let i=o.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let c=i,l=typeof c.id=="string"?c.id:"",d=hi(c.create_time??c.createTime??c.created_at);l&&d&&js(l,d,r)}let a=typeof o.id=="string"?o.id:"",s=hi(o.create_time??o.createTime??o.created_at);if(a&&s&&(o.author||o.content||o.role||o.create_time||o.createTime)&&js(a,s,r),o.mapping&&typeof o.mapping=="object")Hn(o.mapping,r,n+1);else if(n<3)for(let c of Object.values(o))c&&typeof c=="object"&&Hn(c,r,n+1)}function Fs(e,t){if(e)try{Hn(JSON.parse(e),t)}catch{}}function Pe(e){for(let t of Array.from(er))try{t(e)}catch{}}async function $u(e,t,n){if(n===re)try{let o=await e.json();if(n!==re)return;Hn(o,t)}catch{}}async function _u(e,t,n,o){let r=t,i=n,a=e.body;if(!a){o===re&&Pe({type:"post-end",conversationId:r,error:i});return}let s=a.getReader(),c=new TextDecoder,l="";try{for(;o===re;){let{done:d,value:u}=await s.read();if(d)break;if(l+=c.decode(u,{stream:!0}),!r){let S=Ks(l);S&&(r=S,Pe({type:"post-start",conversationId:r,url:""}))}let m=l.split(`
`);l=m.pop()??"";for(let S of m){let E=S.replace(/^data:\s*/,"").trim();!E||E==="[DONE]"||Fs(E,r)}/\[DONE\]/.test(l)||/"error"\s*:\s*\{/.test(l)?(/"error"\s*:\s*\{/.test(l)&&(i=!0),l=l.slice(-64)):l.length>16384&&(l=l.slice(-4096))}l&&o===re&&Fs(l.replace(/^data:\s*/,""),r)}catch{i=!0}finally{try{s.cancel()}catch{}}o===re&&Pe({type:"post-end",conversationId:r,error:i})}function qu(e,t,n){let o=Nu(t),r=Ru(t,n),i=Ou(o,r),a=Iu(o,r,n?.body),s=re,c="";return a&&(c=Bu(n?.body)||qs(o)||xt(o)||M(),Pe({type:"post-start",conversationId:c,url:o})),e(t,n).then(l=>{if(s!==re||!i&&!a)return l;try{let d=l.clone();i?$u(d,qs(o)||M(),s):_u(d,c,!l.ok,s)}catch{a&&Pe({type:"post-end",conversationId:c,error:!l.ok})}return l},l=>{throw a&&s===re&&Pe({type:"post-end",conversationId:c,error:!0}),l})}function ju(){if(wt)return;let e=Hu();An=e,wt=e.fetch.bind(e);let t=(n,o)=>qu(wt,n,o);or=t,e.fetch=t,zs.debug("conversation fetch harvest hooked")}function Fu(){re+=1,!(!wt||!An)&&(or&&An.fetch===or&&(An.fetch=wt),wt=null,or=null,An=null,zs.debug("conversation fetch harvest unhooked"))}function ie(e){return er.add(e),ju(),()=>{er.delete(e),er.size===0&&Fu()}}function Et(e){return e?tr.get(e)??"":""}function rr(e){return e?nr.get(e)??null:null}var Ys=new v("Streaming");function xi(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!G(t))&&(C(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function zu(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&G(e))}function Gu(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&G(e))}function Ku(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function K(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function N(){if(Cn()||xi()||Ku())return!0;let e=ge();return e&&G(e)&&!C(e)?!1:!!(zu()||Gu())}var Uu=400,Vs=3,Ye=new Set,Rn,Pn=null,yi=null,We=!1,Ve=0,Ie="",ae="",In=!1,On=!1,Bn=!1;function Xs(){return oe(_())}function Ws(e,t){return{streaming:e,contextKey:t,conversationId:M()}}function Vu(e,t){if(!e||e===t)return!1;if(e.endsWith("|draft")&&!t.endsWith("|draft"))return!0;try{let n=e.split("|")[0],o=t.split("|")[0],r=new URL(n).pathname.replace(/\/$/,"")||"/",i=new URL(o).pathname.replace(/\/$/,"")||"/";if((r==="/"||r==="")&&i.startsWith("/c/"))return!0}catch{}return!1}function vi(){We=!1,Ve=0,Ie="",In=!1,On=!1,Bn=!1}function Wu(e){for(let t of Array.from(Ye))try{t.onFall?.(e)}catch{}}function Yu(e){for(let t of Array.from(Ye))try{t.onRise?.(e)}catch{}}function Nn(e){for(let t of Array.from(Ye))try{t.onTick?.(e)}catch{}}function Xu(e,t){for(let n of Array.from(Ye))try{n.onContext?.(e,t)}catch{}}function Ju(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest("button");n instanceof HTMLElement&&C(n)&&(In=!0)}function Zu(e){e.type==="post-end"&&We&&(Bn=!0,e.error&&(On=!0))}function Qu(){let e=Xs(),t=N();if(ae&&e&&ae!==e){if(Xu(e,ae),!Vu(ae,e)){vi(),ae=e,Nn(Ws(t,e));return}Ie===ae&&(Ie=e)}ae=e;let n=Ws(t,e);if(t){let i=!We;i&&(In=!1,On=!1,Bn=!1),We=!0,Ve=0,Ie=e,i&&Yu(n),Nn(n);return}if(!We){Nn(n);return}if(Ve+=1,Bn&&(Ve=Math.max(Ve,Vs)),Ve<Vs){Nn(n);return}let o=!!Ie&&Ie===e,r={contextKey:Ie||e,conversationId:M(),userStopped:In,error:On||K()};vi(),o&&Wu(r),Nn(n)}function em(){Rn===void 0&&(We=N(),ae=Xs(),Ie=We?ae:"",Ve=0,In=!1,On=!1,Bn=!1,Pn?.abort(),Pn=new AbortController,document.addEventListener("click",Ju,{capture:!0,signal:Pn.signal}),yi=ie(Zu),Rn=setInterval(Qu,Uu),Ys.debug("watchStreamingEdge started"))}function tm(){Ye.size||(Rn!==void 0&&(clearInterval(Rn),Rn=void 0),Pn?.abort(),Pn=null,yi?.(),yi=null,vi(),ae="",Ys.debug("watchStreamingEdge stopped"))}function se(e){let t=typeof e=="function"?{onFall:e}:e;return Ye.add(t),em(),()=>{Ye.delete(t),tm()}}var nm=["original","badge","dot","hole","bg"],Qs=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],el={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},ir="#FCFCFC",om="#111111",Js="#111111",rm="#ffffff",im="#212121",am="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",sm={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},ar=32,Zs=64;function tl(e){return typeof e=="string"&&nm.includes(e)}function lm(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function sr(e){let t=document.createElement("canvas");t.width=ar,t.height=ar;let n=t.getContext("2d");return n?(n.scale(ar/Zs,ar/Zs),e(n),t.toDataURL("image/png")):""}function cm(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function lr(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(am);n&&(e.strokeStyle=om,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function dm(e,t,n){let o=el[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=Js,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=Js,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=rm,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function Dn(e,t){if(e==="original")return t==="wait"?sr(o=>lr(o,ir)):lm(sm[t]);let n=t==="wait"?void 0:el[t];return sr(e==="hole"?o=>lr(o,n??ir):e==="bg"?o=>{o.fillStyle=n??im,cm(o,0,0,64,64,14),o.fill(),lr(o,ir,!1)}:o=>{lr(o,ir),t!=="wait"&&dm(o,t,e==="dot"?"dot":"badge")})}function nl(e){return{wait:Dn(e,"wait"),rotate:Dn(e,"rotate"),done:Dn(e,"done"),ready:Dn(e,"ready"),error:Dn(e,"error")}}var um=new v("ChatStateFavicons"),Je="bloom-chat-state-favicon",sl=x({style:{type:3,description:"Favicon overlay",options:Qs}}),Lt="",dr={wait:"",rotate:"",done:"",ready:"",error:""},ur="wait",Tt=!1,he=!1,U=null,_n="",qn="",Fn=!0,$n=null,kt=0,St,cr=null,Xe=null,wi=null,jn=!1,ol=new WeakSet,mm=400;function fm(){let e=sl.store.style;return tl(e)?e:"bg"}function pm(){let t=document.querySelector(`link[rel~="icon"]:not(#${Je})`)?.href;return vt(t)?t:vt(Lt)?Lt:""}function V(e){if(ur===e){let t=document.getElementById(Je);if(t instanceof HTMLLinkElement&&t.getAttribute("href")===dr[e])return}ur=e,bi(Je,dr[e])}function rl(){dr=nl(fm()),V(ur)}function gm(){let e=_(),t=e?oe(e):oe("");return N()?(!_n&&t&&(_n=t),_n||t):(_n="",t)}function ll(){Tt=!1,he=!1,U=null,_n=""}function bm(e){qn=e,ll(),Fn=!1,V("wait")}function il(e,t){return!e&&Fn&&!t}function cl(){if(!jn)return;let e=_()||location.pathname;if(qn&&e&&qn!==e){bm(e);return}e&&(qn=e);let t=gm(),n=N(),o=Re(),r=mi();if(K()&&!n){V("error"),Tt=!1,he=!1,U=null;return}if(n){Tt||(Fn=!1),Tt=!0,he=!1,U=t,V("rotate");return}if(Tt){let i=!!U&&!!t&&U===t;if(Tt=!1,i){he=!0,U=t,V("done");return}he=!1,U=null}if(he)if(!!(U&&t&&U!==t))he=!1,U=null;else if(o){V("done");return}else if(il(o,r)){he=!1,V("ready");return}else{he=!1,V("wait");return}U=null,o?V("wait"):il(o,r)?V("ready"):V("wait")}function dl(){let e=te();if(!(Xe&&wi===e&&e.isConnected)){if(Xe?.disconnect(),wi=e,!e||e===document.body){Xe=null;return}Xe=new MutationObserver(()=>mr()),Xe.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function mr(){!jn||kt||(kt=requestAnimationFrame(()=>{kt=0,jn&&(ul(),dl(),cl())}))}function al(){ne()&&(Fn=!0),mr()}function ul(){let e=D();!e||ol.has(e)||(ol.add(e),e.addEventListener("input",al,{passive:!0}),e.addEventListener("compositionend",al,{passive:!0}))}var ml=p({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:sl,startAt:"DOMContentLoaded",cleanupSelectors:[`#${Je}`],start(){jn=!0,Lt=pm()||Lt,rl(),cr?.disconnect(),cr=$s(Je,e=>{vt(e)&&(Lt=e),bi(Je,dr[ur])}),$n?.abort(),$n=new AbortController,window.addEventListener("popstate",mr,{signal:$n.signal}),ul(),dl(),St!==void 0&&clearInterval(St),St=setInterval(mr,mm),cl(),um.debug("favicon watch started")},stop(){jn=!1,kt&&cancelAnimationFrame(kt),kt=0,St!==void 0&&(clearInterval(St),St=void 0),$n?.abort(),$n=null,Xe?.disconnect(),Xe=null,wi=null,cr?.disconnect(),cr=null,ll(),qn="",Fn=!0,Ds(Je,Lt)},onSettingsChange:rl});var fl=`.bloom-ih-hud {
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
`;var eh=new v("InputHistory"),Ei=/\u200B/g,pl=10,gl=500,bl=100,ym=8,vm=120,xm=2e3,fr=10,pr=x({maxEntries:{type:4,description:"Max stored prompts",min:pl,max:gl,default:bl},history:{type:5,description:"Stored prompts",render:Om},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Si=new Map,R=0,Ti="",le=!1,Gn=!1,Ci=0,zn=null,Li,Mi=null,hl=!0;function W(){let e=pr.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function yl(e){let t=fe(Number(pr.store.maxEntries??bl),pl,gl);return e.length>t?e.slice(e.length-t):e}function gr(e){pr.store.entries=yl(e)}function wm(e){return e.replaceAll(Ei,"").replace(/\n$/,"").trim()}function ki(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(ee);return n instanceof HTMLElement?n:D()}function Em(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!F(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(Ei,"").trim().length===0,last:i.toString().replaceAll(Ei,"").trim().length===0}}catch{return{first:!0,last:!0}}}function vl(e){clearTimeout(Li),Li=setTimeout(()=>{if(e!==Ci)return;Gn=!1;let t=Mi;t&&fi(t,hl)},vm)}function xl(e,t,n){Gn=!0,Mi=e,hl=n;let o=++Ci;be(e,t,n),vl(o)}function Sm(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function Ct(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Tm(){document.querySelector(".bloom-ih-hud")?.remove()}function Lm(e,t){let n=Sm();n.textContent=e;let o=(t.closest("form")??te()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-ym)}px`,n.classList.add("bloom-ih-hud-on")}function Ai(e){let t=wm(e);if(!t)return;let n=Date.now(),o=Si.get(t);if(o&&n-o<xm)return;Si.set(t,n);let r=W().filter(i=>i!==t);r.push(t),gr(r),R=W().length,le=!1,Ct()}function km(e,t){let n=W();if(!n.length&&e)return;R>=n.length&&(Ti=F(t),R=n.length);let o=e?R-1:R+1;o<0||o>n.length||(R=o,le=!0,xl(t,o===n.length?Ti:n[o],e),o<n.length?Lm(`${o+1} / ${n.length}`,t):Ct())}function Cm(e){le=!1,Ct(),xl(e,Ti,!1),R=W().length}function Mm(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=ki(e.target)??ki(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&le&&!e.altKey&&!e.shiftKey){Cm(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){Ai(F(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=W();if(!o){let i=Em(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||R<=0)||!n&&R>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),km(n,t))}function Am(e){if(ki(e.target)){if(Gn){vl(Ci);return}le&&(le=!1,Ct(),R=W().length)}}function Hm(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(ee);n instanceof HTMLElement&&Ai(F(n))}function Nm(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(yt);if(!n||!(n instanceof HTMLElement)||C(n))return;let o=D();o&&Ai(F(o))}function Rm(e){if(!(!le||Gn)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}le=!1,Ct()}}function Pm(){if(zn)return;zn=new AbortController;let{signal:e}=zn,t={capture:!0,signal:e};window.addEventListener("keydown",Mm,t),window.addEventListener("input",Am,t),window.addEventListener("submit",Hm,t),window.addEventListener("click",Nm,t),window.addEventListener("pointerdown",Rm,t)}function Im(e){let t=W().slice();t.splice(e,1),gr(t),R>t.length&&(R=t.length)}function Om(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=W().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(f=>f.toLowerCase().includes(a)):i,c=Math.max(1,Math.ceil(s.length/fr));n>=c&&(n=c-1);let l=s.slice(n*fr,n*fr+fr);e.replaceChildren();let d=document.createElement("input");if(d.className="bloom-ih-search",d.type="search",d.placeholder="Search history",d.autocomplete="off",d.value=t,d.addEventListener("input",()=>{t=d.value,n=0,r()}),e.appendChild(d),l.length){let f=document.createElement("div");f.className="bloom-ih-list",l.forEach((T,$)=>{let j=i.indexOf(T),sn=W().length-1-j,ct=document.createElement("div");ct.className="bloom-ih-item";let Te=document.createElement("button");Te.type="button",Te.className=`bloom-ih-body${o===$?"":" bloom-ih-clamp"}`,Te.textContent=T,Te.addEventListener("click",()=>{o=o===$?-1:$,r()});let ln=document.createElement("div");ln.className="bloom-ih-actions";let dt=document.createElement("button");dt.type="button",dt.title="Copy",dt.textContent="C",dt.addEventListener("click",()=>{Ia(T)});let je=document.createElement("button");je.type="button",je.title="Delete",je.textContent="\xD7",je.addEventListener("click",()=>{Im(sn),r()}),ln.append(dt,je),ct.append(Te,ln),f.appendChild(ct)}),e.appendChild(f)}else{let f=document.createElement("p");f.className="bloom-ih-empty",f.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(f)}let u=document.createElement("div");u.className="bloom-ih-pager";let m=document.createElement("button");m.type="button",m.className="bloom-ih-btn",m.textContent="Prev",m.disabled=n<=0,m.addEventListener("click",()=>{n-=1,r()});let S=document.createElement("span");S.textContent=`${n+1} / ${c}`;let E=document.createElement("button");E.type="button",E.className="bloom-ih-btn",E.textContent="Next",E.disabled=n+1>=c,E.addEventListener("click",()=>{n+=1,r()});let g=document.createElement("button");g.type="button",g.className="bloom-ih-clear",g.textContent="Clear all",g.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(gr([]),R=0,r())}),u.append(m,S,E,g),e.appendChild(u)};return r(),()=>{e.replaceChildren()}}var wl=p({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:pr,startAt:"HostReady",managedStyle:"inputHistory",start(){w("inputHistory",fl),R=W().length,le=!1,Pm()},stop(){zn?.abort(),zn=null,Ct(),Tm(),Si.clear(),clearTimeout(Li),Gn=!1,Mi=null,le=!1},onSettingsChange(){let e=W(),t=yl(e);t.length!==e.length&&gr(t),R>t.length&&(R=t.length)}});var Hi="noShareLink",Bm=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],Dm=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],Ni=x({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function El(e){return`${e.join(",")}{display:none!important}`}function Sl(){let e=[];if(Ni.store.hideShareChat!==!1&&e.push(El(Bm)),Ni.store.hideShareProject!==!1&&e.push(El(Dm)),!e.length){y(Hi);return}w(Hi,e.join(`
`))}var Tl=p({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[h.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Ni,start:Sl,onSettingsChange:Sl,stop(){y(Hi)}});var Cl="noDictation",$m=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],_m=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Ml=x({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Ll(e){return`${e.join(",")}{display:none!important}`}function kl(){let e=[Ll($m)];Ml.store.hideDictationSettings!==!1&&e.push(Ll(_m)),w(Cl,e.join(`
`))}var Al=p({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Ml,start:kl,onSettingsChange:kl,stop(){y(Cl)}});var Ri="noSidebarIdentity",Mt=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Pi=Mt.flatMap(e=>[`${e} .min-w-0 > .truncate`,`${e} .min-w-0.flex-1 .truncate`]),Pl=Mt.flatMap(e=>[`${e} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),qm=[...Pi,...Pl],Hl=[...Pi,...Mt.flatMap(e=>[`${e} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],jm=Mt.map(e=>`${e} a[href^="mailto:"]`),Fm=Mt.flatMap(e=>[`${e} .min-w-0 > :not(.truncate)`,`${e} .min-w-0 > :not(.truncate) *`,`${e} .min-w-0 .text-xs`,`${e} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${e} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${e} .text-xs:not(.truncate)`,`${e} .text-token-text-secondary:not(.truncate)`,`${e} .text-token-text-tertiary:not(.truncate)`,`${e} .min-w-0 ~ *`,`${e} .min-w-0 ~ * *`,`${e} > .text-xs`,`${e} > .text-token-text-secondary`,`${e} > .text-token-text-tertiary`]),zm=Mt.flatMap(e=>[`${e} .min-w-0.flex-col > :not(.truncate)`,`${e} .min-w-0.flex-col > .text-xs`,`${e} .min-w-0.flex-col > .text-token-text-secondary`,`${e} .min-w-0.flex-col > .text-token-text-tertiary`,`${e} .min-w-0:not(.flex) > :not(.truncate)`,`${e} .min-w-0:not(.flex) > .text-xs`,`${e} .min-w-0:not(.flex) > .text-token-text-secondary`,`${e} .min-w-0:not(.flex) > .text-token-text-tertiary`]),Kn=x({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function Nl(e){return`${e.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Gm(e){return`${e.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function Km(){return`${zm.join(",")}{margin-block:auto!important}`}function Um(){return`${Fm.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function Rl(){let e=Kn.store.hideUsername!==!1,t=Kn.store.hideEmail!==!1,n=e&&Kn.store.enlargePlan!==!1,o=e&&Kn.store.alignPlanWithAvatar===!0,r=[];if(e&&(o?(r.push(Gm(n?Hl:[...Hl,...Pl])),r.push(Km())):r.push(Nl(n?Pi:qm))),t&&r.push(Nl(jm)),n&&r.push(Um()),!r.length){y(Ri);return}w(Ri,r.join(`
`))}var Il=p({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[h.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Kn,start:Rl,onSettingsChange:Rl,stop(){y(Ri)}});var Ol=`#bloom-rt-host {
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
`;var $l=new v("RecentTopics"),Nt="bloom-rt-host",_l="home",ql=/^\/c\/([a-z0-9_-]{8,})/i,Wm=/\/c\/([a-z0-9_-]{8,})/i,jl=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Ym=new Set(["Backquote","IntlBackslash"]),Xm=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Jm=140,Zm=[3,4,5,6,7,8,9,10,11,12].map(e=>({label:String(e),value:String(e),default:e===5})),P=x({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Zm},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),br=null,Oi=null,q=!1,Jn=!1,Un=!1,ce=0,Ze="",At=null,Vn=null,Ht,Ii=null;function Qm(){let e=Number(P.store.maxRecent??5);return Number.isFinite(e)&&e>=3&&e<=12?e:5}function Wn(){let e=P.plain.visits;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Bi(){let e=P.plain.titles;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Fl(){let e=P.plain.previews;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Di(){let e=P.plain.projects;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function yr(e){let t=Qm();return e.length>t?e.slice(0,t):e}function de(e){return e===_l}function Yn(e,t=Jm){let n=e.replace(/\s+/g," ").trim();return n.length<=t?n:`${n.slice(0,t-1)}\u2026`}function $i(e){if(!e)return"";try{return new URL(e,location.origin).pathname.match(ql)?.[1]??""}catch{return e.match(Wm)?.[1]??""}}function Qe(){let e=(location.pathname||"/").match(ql);if(e?.[1])return e[1];let n=_().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return _l}function _i(e){if(de(e))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${e}"]`);for(let o of n){if($i(o.getAttribute("href")||"")!==e)continue;let r=Yn(o.textContent||"",80);if(r)return r}}catch{}let t=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return Qe()===e&&t&&!/^ChatGPT$/i.test(t)?Yn(t,80):""}function ef(e){if(de(e))return"New chat";let t=Bi()[e];if(t)return t;let n=Et(e);return n||_i(e)||"Chat"}function tf(e){return Di()[e]||""}function nf(e){return Fl()[e]||{}}function qi(e,t){if(!e||de(e)||!t||/^new chat$/i.test(t.trim()))return;let n=Bi();n[e]!==t&&(n[e]=t,P.store.titles=n)}function of(e){e.type==="conversation-meta"&&(qi(e.conversationId,e.title),q&&Rt())}function rf(e,t){if(!e||de(e)||!t)return;let n=Di();n[e]!==t&&(n[e]=t,P.store.projects=n)}function af(e,t){if(!e||de(e)||!t.user&&!t.assistant)return;let n=Fl(),o=n[e]||{},r={user:t.user||o.user,assistant:t.assistant||o.assistant};o.user===r.user&&o.assistant===r.assistant||(n[e]=r,P.store.previews=n)}function ji(e){if(!e||de(e)&&P.store.includeHome===!1)return;let t=Wn().filter(n=>n!==e);t.unshift(e),P.store.visits=yr(t)}function vr(){let e=P.store.includeHome!==!1;return yr(Wn().filter(n=>e||!de(n))).map(n=>({id:n,title:ef(n),project:tf(n),preview:nf(n)}))}function Bl(e){try{let t=document.querySelectorAll(`[data-message-author-role="${e}"]`),n=t[t.length-1];if(!(n instanceof HTMLElement))return"";let o=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||o.push(a)}let r=o.length?o.join(" "):n.textContent||"";return Yn(r)}catch{return""}}function Xn(e){if(!e||de(e)||e!==Qe())return;let t=_i(e);t&&qi(e,t);let n=Bl("user"),o=Bl("assistant");af(e,{user:n,assistant:o});let r=Gl(e);if(r){let i=zl(r);i&&rf(e,i)}}function Fi(){let e=Bi(),t=Di(),n=[],o=new Set,r=!1,i=!1;try{for(let l of document.querySelectorAll('a[href*="/c/"]')){if(l.closest(`#${Nt}, #bloom-root, #bloom-sidebar-panel`))continue;let d=$i(l.getAttribute("href")||"");if(!d||o.has(d))continue;o.add(d),n.push(d);let u=Yn(l.textContent||"",80);u&&!jl.test(u)&&e[d]!==u&&(e[d]=u,r=!0);let m=zl(l);m&&t[d]!==m&&(t[d]=m,i=!0)}}catch{}r&&(P.store.titles=e),i&&(P.store.projects=t);let a=Wn(),s=new Set(a),c=n.filter(l=>!s.has(l));c.length&&(P.store.visits=yr([...a,...c]))}function zl(e){let t=e.parentElement;for(let n=0;n<10&&t;n++){if(t.id==="bloom-rt-host"||t.id==="bloom-root"){t=t.parentElement;continue}let o=t.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),r=Yn((o instanceof HTMLElement?o.textContent:"")||"",60);if(r&&!jl.test(r)&&!/^20\d{2}/.test(r)&&r!==e.textContent?.trim()&&t.querySelector('a[href^="/c/"]'))return r;t=t.parentElement}return""}function Gl(e){if(de(e)){let t=document.querySelector('[data-testid="create-new-chat-button"]');return t instanceof HTMLAnchorElement?t:document.querySelector('a[href="/"]')}try{for(let t of document.querySelectorAll(`a[href*="/c/${e}"]`))if($i(t.getAttribute("href")||"")===e)return t}catch{}return null}function sf(e){let t=Gl(e);if(t){t.click();return}if(de(e)){location.assign("/");return}location.assign(`/c/${e}`)}function lf(){let e=Qe();Ze&&Ze!==e&&Xn(Ze),Ze=e,ji(e),Fi();let t=_i(e);t&&qi(e,t),Xn(e)}function hr(){Ht===void 0&&(Ht=window.setTimeout(()=>{Ht=void 0,lf()},120))}function cf(){At||(At=history.pushState.bind(history),Vn=history.replaceState.bind(history),history.pushState=function(...t){let n=At(...t);return hr(),n},history.replaceState=function(...t){let n=Vn(...t);return hr(),n})}function df(){At&&(history.pushState=At),Vn&&(history.replaceState=Vn),At=null,Vn=null}function uf(e){return Ym.has(e.code)||e.keyCode===192?!0:Xm.has(e.key)}function Kl(e){return e.key==="Control"||e.code==="ControlLeft"||e.code==="ControlRight"}function mf(e,t){Jn=t,Fi(),Xn(Qe()),q=!0,ce=0;try{let n=Qe();ji(n);let o=vr();o.length>1&&(ce=e?o.length-1:1)}catch(n){$l.error("Failed to open switcher:",n)}Rt()}function Dl(e){let{length:t}=vr();t&&(ce=(ce+(e?-1:1)+t)%t,Rt())}function zi(){if(!q)return;let e=vr()[ce];q=!1,Jn=!1,Rt(),e&&sf(e.id)}function Ul(){q&&(q=!1,Jn=!1,Rt())}function ff(e){if(Kl(e)){Un=!0;return}if((e.ctrlKey||Un)&&!e.altKey&&!e.metaKey&&uf(e)&&!e.repeat){e.preventDefault(),e.stopImmediatePropagation();try{q?Dl(e.shiftKey):mf(e.shiftKey,!0)}catch(n){$l.error("Hotkey failed:",n)}return}if(q){if(e.key==="Escape"){e.preventDefault(),Ul();return}if(e.key==="Enter"&&!e.shiftKey){e.preventDefault(),zi();return}e.key==="Tab"&&(e.ctrlKey||Un)&&(e.preventDefault(),Dl(e.shiftKey))}}function pf(e){Kl(e)&&(Un=!1,q&&Jn&&zi())}function gf(e){let t=e.target instanceof Element?e.target:null;!t||!t.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(hr)}function bf(e){!q||(e.target instanceof Element?e.target:null)?.closest(`#${Nt}`)||Ul()}function hf(){document.visibilityState==="hidden"&&Xn(Qe())}function yf(){if(!document.body)return null;let e=document.getElementById(Nt);if(e instanceof HTMLElement)return Oi=e,e;e=document.createElement("div"),e.id=Nt;let t=document.createElement("div");return t.className="bloom-rt-panel",t.setAttribute("role","listbox"),t.setAttribute("aria-label","Recent conversations"),t.dataset.visible="false",t.addEventListener("click",n=>n.stopPropagation()),e.append(t),document.body.append(e),Oi=e,e}function Rt(){let e=yf();if(!e)return;let t=e.querySelector(".bloom-rt-panel");if(!t)return;if(!q){t.dataset.visible="false",t.replaceChildren();return}let n=vr();if(!n.length){t.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",t.replaceChildren(i);return}ce>=n.length&&(ce=0);let o=document.createElement("div");o.className="bloom-rt-list",o.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===ce?"true":"false",s.setAttribute("aria-selected",a===ce?"true":"false");let c=document.createElement("div");if(c.className="bloom-rt-name",c.textContent=i.title,s.append(c),i.project){let l=document.createElement("div");l.className="bloom-rt-project",l.textContent=i.project,s.append(l)}if(i.preview.user||i.preview.assistant){let l=document.createElement("div");if(l.className="bloom-rt-preview",i.preview.user){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="user",d.textContent=i.preview.user,l.append(d)}if(i.preview.assistant){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="assistant",d.textContent=i.preview.assistant,l.append(d)}s.append(l)}s.addEventListener("click",()=>{ce=a,zi()}),o.append(s)}),t.replaceChildren(o),t.dataset.visible="true",t.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function vf(){document.getElementById(Nt)?.remove(),Oi=null}var Vl=p({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${Nt}`],settings:P,start(){w("recentTopics",Ol),Ze=Qe(),ji(Ze),Fi(),Xn(Ze),Ii=ie(of),cf(),br=new AbortController;let{signal:e}=br;window.addEventListener("keydown",ff,{capture:!0,signal:e}),window.addEventListener("keyup",pf,{capture:!0,signal:e}),window.addEventListener("popstate",hr,{signal:e}),document.addEventListener("click",gf,{capture:!0,signal:e}),document.addEventListener("click",bf,{signal:e}),document.addEventListener("visibilitychange",hf,{signal:e})},stop(){br?.abort(),br=null,Ht!==void 0&&(clearTimeout(Ht),Ht=void 0),df(),Ii?.(),Ii=null,q=!1,Jn=!1,Un=!1,vf()},onSettingsChange(){let e=yr(Wn());e.length!==Wn().length&&(P.store.visits=e),q&&Rt()}});var Gi="cleaner",xf=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],wf=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],Ef=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],Sf=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],Tf=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],Lf=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],et=x({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function Pt(e){return`${e.join(",")}{display:none!important}`}function Wl(){let e=[];if(et.store.hideDownloadApps!==!1&&e.push(Pt(xf)),et.store.hideDisclaimer!==!1&&e.push(Pt(wf)),et.store.hideUpgrade!==!1&&e.push(Pt(Ef)),et.store.hideLockedModels!==!1&&e.push(Pt(Sf)),et.store.hideHomePromo!==!1&&e.push(Pt(Tf)),et.store.hideAds!==!1&&e.push(Pt(Lf)),!e.length){y(Gi);return}w(Gi,e.join(`
`))}var Yl=p({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[h.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:et,start:Wl,onSettingsChange:Wl,stop(){y(Gi)}});var wr=new v("ResponseNotification"),Ot=x({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:Rf},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Ki=!1,xr=null,It=null,Zn=null;function kf(){return document.visibilityState==="hidden"||document.hidden}function Cf(){return Ot.store.onlyWhenHidden===!1?!0:kf()}function Mf(){let e=Et(M());if(e)return e;let t=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return t&&!/^ChatGPT$/i.test(t)?t:"Chat"}function Xl(){try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!It||It.state==="closed")&&(It=new e);let t=It,n=t.currentTime,o=[523.25,659.25];for(let r=0;r<o.length;r++){let i=t.createOscillator(),a=t.createGain();i.type="sine",i.frequency.value=o[r];let s=n+r*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(t.destination),i.start(s),i.stop(s+.24)}t.resume?.()}catch(e){wr.debug("chime failed",e)}}function Af(e){try{let t=new Audio(e);t.volume=.7,t.play()}catch(t){wr.debug("custom sound failed",t),Xl()}}function Jl(){let e=String(Ot.store.soundUrl||"").trim();e?Af(e):Xl()}function Hf(){let e="Bloom++",t=`${Mf()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:e,text:t,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(e,{body:t,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){wr.debug("notification failed",n)}}function Nf(){Cf()&&(Ot.store.sound!==!1&&Jl(),Ot.store.browserNotification!==!1&&Hf())}function Rf(e){let t=document.createElement("button");return t.type="button",t.textContent="Play",t.addEventListener("click",()=>Jl()),e.appendChild(t),()=>{t.remove()}}var Zl=p({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Ot,start(){Ki=!0,xr?.(),xr=se(e=>{Ki&&(e.userStopped||e.error||Nf())}),Zn?.abort(),Zn=new AbortController,Ot.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:Zn.signal}),wr.debug("watch started")},stop(){Ki=!1,xr?.(),xr=null,Zn?.abort(),Zn=null;try{It?.close()}catch{}It=null}});var Ql=`#bloom-pq-chip {
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
`;var no=new v("PromptQueue"),Vi="bloom-pq-chip",ec="promptQueue",tc=80,If=50,Of=2e3,ic=x({replacePending:{type:2,description:"Replace the queued prompt if you Enter again while one is waiting.",default:!0}}),O=new Map,ye=!1,Y="",I="",Be=!1,X=!1,A=null,Qn=null,Er=null,to,eo,Bt=null;function Dt(){return oe(_())}function $t(e){return e.replaceAll("\u200B","").replace(/\n$/,"").trim()}function nc(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(ee);return n instanceof HTMLElement?n:D()}function Wi(e){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation()}function ac(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function Bf(){try{let e=document.querySelectorAll('[data-message-author-role="user"]'),t=e[e.length-1];return t instanceof HTMLElement?$t(t.innerText||t.textContent||""):""}catch{return""}}function Df(e,t){if(!e||e===t)return!1;if(e.endsWith("|draft")&&!t.endsWith("|draft"))return!0;try{let n=e.split("|")[0],o=t.split("|")[0],r=new URL(n).pathname.replace(/\/$/,"")||"/",i=new URL(o).pathname.replace(/\/$/,"")||"/";if((r==="/"||r==="")&&i.startsWith("/c/"))return!0}catch{}return!1}function oc(e){if(!Y||Y===e)return;let t=O.get(Y);!t||O.has(e)||Df(Y,e)&&(O.delete(Y),O.set(e,t),I===Y&&(I=e),A?.key===Y&&(A.key=e),no.debug("migrated pending",Y,"\u2192",e))}function Yi(e){let t=Dt();if(O.get(t)&&ic.store.replacePending===!1)return;O.set(t,{text:e,at:Date.now()}),A={key:t,text:e,turns:ac(),ticks:3};let o=D();o&&be(o,""),Oe(),no.debug("queued",t,e.length)}function $f(e){O.delete(e),I===e&&(I=""),A?.key===e&&(A=null),Oe()}function _f(){X=!0,clearTimeout(eo),eo=setTimeout(()=>{X=!1,eo=void 0},Of)}function qf(){let e=Dt(),t=O.get(e);if(!t)return;let n=D();if(!n)return;O.delete(e),I="",Oe(),_f(),be(n,t.text);let o=ge();o&&!C(o)&&!kn(o)&&(o.click(),X=!1)}function rc(e){if(!ye||Be||N()||Dt()!==e)return;let t=O.get(e);if(!t){I="";return}if(K())return;let n=D();if(!n)return;if(!Re(n)){let r=$t(F(n));if(r&&r!==t.text)return}let o=ge();!o||C(o)||kn(o)||(Be=!0,be(n,t.text),clearTimeout(to),to=setTimeout(()=>jf(e,t.text),If))}function jf(e,t){to=void 0;try{if(!ye)return;let n=O.get(e);if(!n||n.text!==t||N()||Dt()!==e)return;let o=D();if(!o)return;let r=$t(F(o));if(r&&r!==t&&!Re(o))return;r!==t&&be(o,t);let i=ge();if(!i||C(i)||kn(i))return;i.click(),O.delete(e),I="",Oe(),no.debug("drained",e)}finally{Be=!1}}function sc(e){let t=te();if(!t||t===document.body){e.style.left="50%",e.style.bottom="6.5rem";return}let n=t.getBoundingClientRect();e.style.left=`${Math.round(n.left+n.width/2)}px`,e.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`;let o=Math.min(512,Math.max(160,n.width-24));e.style.maxWidth=`${Math.round(o)}px`}function Ui(){Bt?.remove(),Bt=null}function Oe(){if(!ye||!document.body){Ui();return}let e=Dt(),t=O.get(e);if(!t){Ui();return}let n=Bt;n?.isConnected||(n=document.createElement("div"),n.id=Vi,document.body.appendChild(n),Bt=n),n.replaceChildren();let o=document.createElement("span");o.className="bloom-pq-kicker",o.textContent="Next";let r=document.createElement("span");r.className="bloom-pq-text";let i=t.text.length>tc?`${t.text.slice(0,tc)}\u2026`:t.text;r.textContent=i,r.title=t.text;let a=document.createElement("div");a.className="bloom-pq-actions";let s=document.createElement("button");s.type="button",s.className="bloom-pq-btn bloom-pq-send",s.textContent="Send now",s.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),qf()});let c=document.createElement("button");c.type="button",c.className="bloom-pq-btn bloom-pq-x",c.setAttribute("aria-label","Dismiss queued prompt"),c.textContent="\xD7",c.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),$f(e)}),a.append(s,c),n.append(o,r,a),sc(n)}function Ff(){if(!A)return;if(A.ticks-=1,O.get(A.key)&&ac()>A.turns){let t=Bf();if(t&&t===A.text){no.debug("native send leaked; dropping pending"),O.delete(A.key),I===A.key&&(I=""),A=null,Oe();return}}A.ticks<=0&&(A=null)}function zf(e){if(!ye||e.isComposing||e.keyCode===229||e.key!=="Enter"||e.shiftKey||e.ctrlKey||e.metaKey||Be)return;let t=nc(e.target)??nc(document.activeElement);if(!t||!N())return;if(e.altKey||X){X=!1;return}if(!ne(t))return;let n=$t(F(t));n&&(Wi(e),Yi(n))}function Gf(e){let t=e.closest("button");if(!(t instanceof HTMLElement)||C(t))return null;let n=e.closest(yt);if(n instanceof HTMLElement&&!C(n))return n;let o=ge();return o&&(t===o||o.contains(t)||t.contains(o))?o:null}function Kf(e){if(!ye)return;let t=e.target;if(!(t instanceof Element)||t.closest(`#${Vi}`))return;let n=t.closest("button");if(n instanceof HTMLElement&&C(n)||Be||!N()||!Gf(t))return;if(X){X=!1;return}let o=D();if(!o||!ne(o))return;let r=$t(F(o));r&&(Wi(e),Yi(r))}function Uf(e){if(!ye)return;let t=e.target;if(!(t instanceof HTMLFormElement)||!t.matches(Zo)&&!t.querySelector(ee)||Be||!N())return;if(X){X=!1;return}let n=D()??t.querySelector(ee);if(!n||!ne(n))return;let o=$t(F(n));o&&(Wi(e),Yi(o))}var lc=p({name:"PromptQueue",description:"Queue the next prompt while a reply is streaming. Enter/Send waits for this turn instead of interrupting.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:ec,cleanupSelectors:[`#${Vi}`],settings:ic,start(){ye=!0,Y=Dt(),I="",Be=!1,X=!1,A=null,w(ec,Ql),Qn?.abort(),Qn=new AbortController;let{signal:e}=Qn;window.addEventListener("keydown",zf,{capture:!0,signal:e}),document.addEventListener("click",Kf,{capture:!0,signal:e}),document.addEventListener("submit",Uf,{capture:!0,signal:e}),Er?.(),Er=se({onFall(t){if(ye){if(t.userStopped||t.error){I="",Oe();return}I=t.contextKey,rc(t.contextKey)}},onContext(t){oc(t),Y=t,Oe()},onTick(t){oc(t.contextKey),Y=t.contextKey,Ff(),I&&I===t.contextKey&&rc(I),Bt&&sc(Bt)}}),Oe(),no.debug("watch started")},stop(){ye=!1,Er?.(),Er=null,Qn?.abort(),Qn=null,clearTimeout(to),to=void 0,clearTimeout(eo),eo=void 0,O.clear(),A=null,I="",Be=!1,X=!1,Ui()}});var cc=`.bloom-cls {
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
`;var mc=new v("ChatListStatus"),dc="chatListStatus",Lr="bloom-cls",Wf="bloom-cls",Yf=1200*1e3,Xf="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",ue=new Map,xe=!1,_t="",ve=!1,jt=0,De=null,Zi=null,qt=null,Xi=null,Sr=null,Ft=!1,zt=new Set;function Tr(){return Date.now()}function fc(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function tt(e,t,n,o=!0){if(!(!e||!xe)){if(t==="idle")ue.delete(e);else{let r=ue.get(e);r&&r.kind===t&&n!=="net"?r.at=Tr():ue.set(e,{kind:t,at:Tr(),source:n})}o&&Jf({v:1,id:e,kind:t,at:Tr()}),oo()}}function Jf(e){try{qt?.postMessage(e)}catch{}}function Zf(e){let t=e.data;!t||t.v!==1||!t.id||t.kind!=="streaming"&&t.kind!=="done"&&t.kind!=="error"&&t.kind!=="idle"||tt(t.id,t.kind,"bc",!1)}function Qf(){let e=Tr();for(let[t,n]of ue)n.kind==="streaming"&&e-n.at>Yf&&ue.delete(t)}function ep(){let e=fc();if(!e)return[];let t=[],n=new Set;try{for(let o of e.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(o.closest(Xf))continue;let r=xt(o.getAttribute("href")||"");!r||n.has(r)||(n.add(r),t.push(o))}}catch{}return t}function uc(e){let t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),e==="streaming")t.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("cx","12"),o.setAttribute("cy","12"),o.setAttribute("r","9"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","2"),t.appendChild(o)}return t.appendChild(n),t}function Ji(e){let t=e.querySelector(`:scope > .${Lr}`);return t||null}function tp(){if(!xe)return;Qf();let e=M(),t=ep();De?.disconnect();try{for(let n of t){let o=xt(n.getAttribute("href")||"");if(!o||!e||o!==e){Ji(n)?.remove();continue}let i=ue.get(o)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){Ji(n)?.remove();continue}let a=Ji(n);a||(a=document.createElement("span"),a.className=Lr,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(uc("streaming")):i==="error"&&a.appendChild(uc("error")))}}catch(n){mc.debug("paint failed",n)}pc()}function oo(){!xe||jt||(jt=requestAnimationFrame(()=>{jt=0,xe&&tp()}))}function pc(){let e=fc();if(!(De&&Zi===e&&e?.isConnected)){if(De?.disconnect(),Zi=e,!e){De=null;return}De=new MutationObserver(()=>oo()),De.observe(e,{childList:!0,subtree:!0})}}function Qi(){return!!(Cn()||xi())}function np(e){return!!(Ft||e&&zt.has(e)||Qi())}function op(e){if(xe){if(e.type==="post-start"){e.conversationId?(Ft=!1,zt.add(e.conversationId),ve=!0,tt(e.conversationId,"streaming","net")):(Ft=!0,ve=!0);return}e.type==="post-end"&&(Ft=!1,e.conversationId&&(zt.delete(e.conversationId),tt(e.conversationId,e.error?"error":"done","net")),Qi()||(ve=!1))}}function rp(){if(!xe)return;let e=M();if(!(Ft||e&&zt.has(e))){if(ve=!1,e&&ue.get(e)?.kind==="streaming"&&ue.get(e)?.source==="local"){tt(e,"idle","local");return}oo()}}function ip(e){if(!xe)return;let t=e.conversationId||M();if(_t&&t&&_t!==t){let o=ue.get(_t);o?.kind==="streaming"&&o.source==="local"&&tt(_t,K()?"error":"done","local"),ve=!!(t&&zt.has(t))}if(_t=t,np(t)&&(e.streaming||Qi())){ve=!0,t&&tt(t,"streaming","local"),oo();return}ve&&(ve=!1,t&&tt(t,K()?"error":"done","local")),oo()}var gc=p({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Lr}`],start(){xe=!0,w(dc,cc);try{qt=new BroadcastChannel(Wf)}catch{qt=null}qt?.addEventListener("message",Zf),Xi=ie(op),Sr?.(),Sr=se({onTick:ip,onContext:rp}),pc(),mc.debug("sidebar status watch started")},stop(){xe=!1,jt&&cancelAnimationFrame(jt),jt=0,De?.disconnect(),De=null,Zi=null,Sr?.(),Sr=null,Xi?.(),Xi=null;try{qt?.close()}catch{}qt=null,ue.clear(),zt.clear(),Ft=!1,ve=!1,_t="",document.querySelectorAll(`.${Lr}`).forEach(e=>e.remove()),y(dc)}});var hc="widerChat",yc=40,vc=96,xc=64,wc=x({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:yc,max:vc,default:xc}});function ap(){return fe(Number(wc.store.width??xc),yc,vc)}function bc(){let e=ap(),t=`min(100%,${e}rem)`;w(hc,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important;--user-chat-width:${e}rem!important;--composer-container-max-width:${e}rem!important;--thread-xl-max-width:${e}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${t}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${t}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${t}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${t}!important}`)}var Ec=p({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[h.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:wc,start:bc,onSettingsChange:bc,stop(){y(hc)}});var ea="composerOpacity",Gt='form[data-type="unified-composer"],form.w-full[data-type]',sp=[`${Gt} [class*="corner-superellipse"]`,`${Gt} [class*="bg-token-bg-primary"]`,`${Gt} [class*="bg-token-main-surface"]`].join(","),lp=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),cp="#thread-bottom-container,#thread-bottom",dp=`${Gt} #prompt-textarea,${Gt} [contenteditable="true"]`,up="var(--bg-primary,var(--main-surface-primary,#ffffff))",ta=x({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function mp(){return fe(Number(ta.store.opacity??100),0,100)}function fp(){return fe(Number(ta.store.blur??16),0,40)}function Sc(){let e=mp();if(e>=100){y(ea);return}let t=fp(),n=`color-mix(in srgb,${up} ${e}%,transparent)`,o=t>0?`-webkit-backdrop-filter:blur(${t}px)!important;backdrop-filter:blur(${t}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";w(ea,`${cp}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${lp}{display:none!important}${Gt}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${sp}{background-color:${n}!important;background-image:none!important;${o}}${dp}{background-color:transparent!important;background-image:none!important}`)}var Tc=p({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[h.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:ta,start:Sc,onSettingsChange:Sc,stop(){y(ea)}});var Lc=`#bloom-bn-host {
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
}
`;var gp=new v("BetterNavigator"),na="betterNavigator",Cc="bloom-bn-host",ra=60,bp=16,hp=1e3,yp=2.5,vp=.4,xp=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),wp=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='thinking']","[class*='reasoning']","[class*='footnote']",".sr-only"].join(", "),Ep=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),Hr=x({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),rt=new Map,we=!1,_e=null,Nr=null,$e=null,Cr=null,L=[],it="",Mr=0,Ar=-1,ca=0,lo="",Ut=0,Vt=0,ro,io=null,kr=null,oa=null,nt=null,ia=null,ao=null,ot=null,Wt=null,so=null;function Rr(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function Sp(e){try{return!!e.closest(xp)}catch{return!0}}function Tp(e){let t=(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||e.getAttribute("data-turn")||"").toLowerCase();if(t==="user"||t==="assistant")return t;let n=(e.getAttribute("aria-label")||"").toLowerCase();return n.includes("you said")?"user":n.includes("chatgpt said")||n.includes("assistant said")?"assistant":null}function Lp(e){let t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode(r){let i=r.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(i.closest(wp))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return(r.textContent||"").replace(/\s+/g," ").trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),o;for(;(o=n.nextNode())&&t.join(" ").length<ra+20;)t.push((o.textContent||"").replace(/\s+/g," ").trim());return t.join(" ").replace(/\s+/g," ").trim()}function kp(e,t){try{if(e.querySelector("img, picture, video, canvas"))return"Image";if(e.querySelector("a[download], [class*='attachment']"))return"File";if(e.querySelector("pre, code"))return"Code"}catch{}return`Message ${t+1}`}function Mc(e,t,n){let o=t==="user"?e.querySelector(".whitespace-pre-wrap")??e:e.querySelector(".markdown")??e,r=Lp(o);return r?r.length>ra?`${r.slice(0,ra).trimEnd()}\u2026`:r:kp(e,n)}function Cp(){let e=Rr();if(!e||e===document.body)return[];let t=Hr.store.showAssistant!==!1,n=[];try{for(let o of e.querySelectorAll("[data-message-id]")){if(Sp(o))continue;let r=o.getAttribute("data-message-id")||"";if(!r)continue;let i=Tp(o);if(i!=="user"&&i!=="assistant"||i==="assistant"&&!t)continue;let a=Mc(o,i,n.length);a&&a!==rt.get(r)&&rt.set(r,a),n.push({id:r,el:o,role:i,text:rt.get(r)||a})}}catch{}return n}function Mp(){let t=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(t,48),88)}function Ac(e){let t=e;for(;t&&t!==document.body&&t!==document.documentElement;){let o=getComputedStyle(t).overflowY;if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight+8)return t;t=t.parentElement}return window}function Ap(e){return e===window?window.innerHeight:e.clientHeight}function Hp(e){let t=e instanceof Element?e:e instanceof Node?e.parentElement:null;if(!t)return!1;try{return!!t.closest(Ep)}catch{return!1}}function Hc(){ro!==void 0&&(clearTimeout(ro),ro=void 0),io?.classList.remove("bloom-bn-flash"),io=null}function Np(e){Hc(),e.classList.add("bloom-bn-flash"),io=e,ro=setTimeout(()=>{e.classList.remove("bloom-bn-flash"),io===e&&(io=null),ro=void 0},800)}function aa(e){if(!L.length)return;let t=Math.max(0,Math.min(e,L.length-1));Mr=t,Nr?.querySelectorAll(".bloom-bn-tick").forEach((o,r)=>{o.classList.toggle("bloom-bn-current",r===t)}),$e?.querySelectorAll(".bloom-bn-item").forEach((o,r)=>{o.classList.toggle("bloom-bn-active",r===t)}),Cr&&(Cr.textContent=`${t+1} / ${L.length}`);let n=$e?.children[t];if(n instanceof HTMLElement){let o=$e;if(o){let r=n.offsetTop-o.clientHeight/2+n.offsetHeight/2;o.scrollTop=Math.max(0,r)}}}function sa(e){let t=L[e];if(!t?.el.isConnected)return;Ar=e,ca=Date.now()+hp,aa(e);let n=Wt??Ac(t.el),r=Math.abs(t.el.getBoundingClientRect().top-Mp())>yp*Ap(n);t.el.scrollIntoView({behavior:r?"auto":"smooth",block:"start"}),Hr.store.jumpEffect!=="none"&&Np(t.el)}function da(){if(!we||!L.length)return;if(Date.now()<ca&&Ar>=0){aa(Ar);return}let e=window.innerHeight*vp,t=0;for(let n=0;n<L.length;n++){let o=L[n].el;o.isConnected&&o.getBoundingClientRect().top<=e&&(t=n)}aa(t)}function Rp(e){let t=Ac(e);if(Wt===t&&so)return;so?.(),Wt=t;let n=t===window?document:t,o=()=>{da(),ua()};n.addEventListener("scroll",o,{passive:!0}),so=()=>n.removeEventListener("scroll",o)}function Pp(e){ot?.disconnect(),ot=null;let t=Wt instanceof HTMLElement?Wt:null;ot=new IntersectionObserver(()=>da(),{root:t,threshold:[0,.15,.4,.75,1]});for(let n of e)n.el.isConnected&&ot.observe(n.el)}function Ip(){if(!document.body)return null;let e=_e;if(e?.isConnected)return e;e=document.createElement("div"),e.id=Cc,e.className="bloom-bn-host",e.setAttribute("role","navigation"),e.setAttribute("aria-label","Conversation outline"),e.hidden=!0;let t=document.createElement("div");t.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let o=document.createElement("div");o.className="bloom-bn-card";let r=document.createElement("div");r.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",o.append(r,i),n.appendChild(o),e.append(t,n),document.body.appendChild(e),_e=e,Nr=t,$e=i,Cr=r,e}function Nc(){let e=_e,t=Rr();if(!e||!t||!t.isConnected||L.length<1){e&&(e.hidden=!0);return}let n=t.getBoundingClientRect(),o=document.getElementById("thread-bottom-container"),r=document.getElementById("page-header"),i=Math.max(n.top+8,r?.getBoundingClientRect().bottom??0,8),a=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),s=a-i;if(s<96||n.width<160){e.hidden=!0;return}let c=window.innerWidth-n.right,l=c>=22?Math.max(8,c-16):8;e.hidden=!1,e.style.top=`${Math.round((i+a)/2)}px`,e.style.height="auto",e.style.maxHeight=`${Math.round(s)}px`,e.style.right=`${Math.round(l)}px`,e.style.setProperty("--bloom-bn-cap",`${Math.round(s)}px`)}function ua(){!we||Vt||(Vt=requestAnimationFrame(()=>{Vt=0,we&&Nc()}))}function Op(e){let t=Nr,n=$e;!t||!n||(t.replaceChildren(),n.replaceChildren(),t.classList.toggle("bloom-bn-dense",e.length>bp),e.forEach((o,r)=>{let i=document.createElement("button");i.type="button",i.className=`bloom-bn-tick${o.role==="assistant"?" bloom-bn-tick-asst":""}`,i.setAttribute("aria-label",`Go to message ${r+1} of ${e.length}`),i.addEventListener("click",l=>{l.preventDefault(),sa(r)}),t.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${o.role}`;let s=document.createElement("span");s.className="bloom-bn-mark",s.textContent=o.role==="user"?"You":"GPT";let c=document.createElement("span");c.className="bloom-bn-label",c.textContent=o.text,c.title=o.text,a.append(s,c),a.addEventListener("click",l=>{l.preventDefault(),sa(r)}),n.appendChild(a)}))}function kc(){if(!L.length)return;let e=L[L.length-1];if(!e.el.isConnected)return;let t=Mc(e.el,e.role,L.length-1);if(t===e.text)return;e.text=t,rt.set(e.id,t);let o=$e?.children[L.length-1]?.querySelector(".bloom-bn-label");o&&(o.textContent=t,o instanceof HTMLElement&&(o.title=t))}function Bp(){let e=M();return e===lo?!1:(lo=e,rt.clear(),L=[],it="",Mr=0,Ar=-1,ca=0,!0)}function Dp(e){let t=Hr.store.showAssistant!==!1?"1":"0";return`${lo}|${t}|${e.map(n=>n.id).join(",")}`}function $p(){if(!we)return;Bp();let e=Cp(),t=Rr();if(!t||e.length<1){L=e,it="",_e&&(_e.hidden=!0),ot?.disconnect(),la();return}Ip();let n=Dp(e);n!==it?(L=e,it=n,Op(e),Rp(t),Pp(e)):(L=e,L.forEach((o,r)=>{let a=$e?.children[r]?.querySelector(".bloom-bn-label");a&&a.textContent!==o.text&&(a.textContent=o.text,a instanceof HTMLElement&&(a.title=o.text))})),Nc(),da(),la()}function Kt(){!we||Ut||(Ut=requestAnimationFrame(()=>{Ut=0,we&&$p()}))}function la(){let e=Rr();if(!(nt&&ia===e&&e?.isConnected)){if(nt?.disconnect(),ao?.disconnect(),ia=e,!e||e===document.body){nt=null;return}nt=new MutationObserver(()=>Kt()),nt.observe(e,{childList:!0,subtree:!0}),ao=new ResizeObserver(()=>ua()),ao.observe(e)}}function _p(e){if(!we||!L.length||_e?.hidden||e.altKey||e.ctrlKey||e.metaKey||Hp(e.target))return;let t=-1;if(e.key==="ArrowDown")t=Mr+1;else if(e.key==="ArrowUp")t=Mr-1;else if(e.key==="Home")t=0;else if(e.key==="End")t=L.length-1;else if(e.key==="Escape"){document.activeElement?.blur?.();return}else return;e.preventDefault(),sa(Math.max(0,Math.min(t,L.length-1)))}function qp(){Hc(),ot?.disconnect(),ot=null,nt?.disconnect(),nt=null,ia=null,ao?.disconnect(),ao=null,so?.(),so=null,Wt=null,_e?.remove(),_e=null,Nr=null,$e=null,Cr=null}var Rc=p({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:na,cleanupSelectors:[`#${Cc}`],settings:Hr,start(){we=!0,lo=M(),w(na,Lc),kr=new AbortController;let{signal:e}=kr;window.addEventListener("keydown",_p,{signal:e}),window.addEventListener("popstate",Kt,{signal:e}),window.visualViewport?.addEventListener("resize",ua,{signal:e}),oa=se({onTick(t){t.streaming&&kc()},onFall(){kc(),Kt()},onContext(){rt.clear(),lo=M(),it="",Kt()}}),la(),Kt(),gp.debug("navigator started")},stop(){we=!1,Ut&&cancelAnimationFrame(Ut),Ut=0,Vt&&cancelAnimationFrame(Vt),Vt=0,kr?.abort(),kr=null,oa?.(),oa=null,qp(),rt.clear(),L=[],it="",y(na)},onSettingsChange(){it="",Kt()}});var Pc=`.bloom-ts {
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
`;function Ic(e,t,n=Date.now()){let o=new Date(e);if(Number.isNaN(o.getTime()))return"";let r=new Date(n),i=o.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(o.toDateString()===r.toDateString()||!t)return i;let s=o.getFullYear()===r.getFullYear();return`${o.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Oc(e){try{return new Date(e).toISOString()}catch{return""}}var _c=new v("MessageTimestamps"),Bc="messageTimestamps",Pr="bloom-ts",Dc=1500,Fp="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",Jt=x({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),Zt=new Map,Qt=!1,Xt=0,Yt,qe=null,fa=null,ma=null,$c=!1;function qc(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function pa(){let e=Jt.plain.stamps;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function jc(){let e={...pa()};for(let[n,o]of Zt)e[n]=o;let t=Object.keys(e);if(t.length>Dc){let n=t.slice(t.length-Dc),o={};for(let r of n)o[r]=e[r];Jt.store.stamps=o;return}Jt.store.stamps=e}var zp=Oa(jc,500);function Fc(e,t){!e||!t||Zt.get(e)===t||(Zt.set(e,t),zp(),co())}function Gp(e){return e?Zt.get(e)??pa()[e]??rr(e)??null:null}function Kp(e){Qt&&e.type==="message-time"&&Fc(e.messageId,e.createTime)}function Up(e){return(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function Vp(){let e=qc();if(!e)return[];let t=[];try{for(let n of e.querySelectorAll("[data-message-id]"))n.closest(Fp)||t.push(n)}catch{}return t}function Wp(e){try{return!!e.querySelector("time:not(.bloom-ts)")}catch{return!1}}function Yp(){if(!Qt)return;let e=Jt.store.hideOwnMessages===!0,t=Jt.store.showDate!==!1,n=N(),o=Vp();qe?.disconnect();try{o.forEach((r,i)=>{let a=r.getAttribute("data-message-id")||"",s=Up(r),c=r.querySelector(`:scope > .${Pr}`);if(e&&s==="user"){c?.remove();return}if(Wp(r)){c?.remove();return}let l=Gp(a);if(!l&&a&&(n||$c)&&i>=o.length-2&&(l=Date.now(),Fc(a,l)),!l){c?.remove();return}let d=Ic(l,t);if(!d){c?.remove();return}let u=c;u||(u=document.createElement("time"),u.className=Pr,u.setAttribute("aria-hidden","true"),r.insertBefore(u,r.firstChild)),u.textContent!==d&&(u.textContent=d);let m=Oc(l);m&&u.getAttribute("datetime")!==m&&u.setAttribute("datetime",m)})}catch(r){_c.debug("paint failed",r)}$c=n,zc()}function co(){!Qt||Xt||(Xt=requestAnimationFrame(()=>{Xt=0,Qt&&Yp()}))}function zc(){let e=qc();if(!(qe&&fa===e&&e?.isConnected)){if(qe?.disconnect(),fa=e,!e||e===document.body){qe=null;return}qe=new MutationObserver(()=>co()),qe.observe(e,{childList:!0,subtree:!0})}}var Gc=p({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Pr}`],settings:Jt,start(){Qt=!0,w(Bc,Pc);let e=pa();for(let[t,n]of Object.entries(e))typeof n=="number"&&n>0&&Zt.set(t,n);ma=ie(Kp),zc(),Yt!==void 0&&clearInterval(Yt),Yt=setInterval(co,800),co(),_c.debug("timestamp watch started")},stop(){Qt=!1,Xt&&cancelAnimationFrame(Xt),Xt=0,Yt!==void 0&&(clearInterval(Yt),Yt=void 0),qe?.disconnect(),qe=null,fa=null,ma?.(),ma=null,jc(),Zt.clear(),document.querySelectorAll(`.${Pr}`).forEach(e=>e.remove()),y(Bc)},onSettingsChange:co});var ga="streamerMode",Xp="filter:blur(6px)!important;transition:filter .2s ease",Jp="filter:none!important",uo=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],en=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function J(e,t){return e.map(n=>`${n} ${t}`)}var at=x({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function tn(e,t=!0){let n=e.join(","),o=e.map(r=>`${r}:hover`).join(",");return`${n}{${Xp}}${t?`${o}{${Jp}}`:""}`}function Kc(){let e=[];if(at.store.conversations!==!1&&(e.push(tn([...J(en,'a[href^="/c/"]'),...J(en,'a[href*="/c/"]')])),e.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),at.store.projects!==!1&&(e.push(tn([...J(en,'a[href*="/project"]'),...J(en,'a[href*="/g/g-p-"]'),...J(en,'[data-testid="project-name"]'),...J(en,'[data-testid="project-link"]')])),e.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),at.store.headerTitle!==!1&&e.push(tn(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),at.store.accountAvatar!==!1&&e.push(tn([...J(uo,"img"),...J(uo,'[class*="avatar"]')],!1)),at.store.accountName!==!1&&e.push(tn([...J(uo,".min-w-0 > .truncate"),...J(uo,".min-w-0.flex-1 .truncate")],!1)),at.store.accountEmail!==!1&&e.push(tn([...J(uo,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),e.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),e.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!e.length){y(ga);return}w(ga,e.join(`
`))}var Uc=p({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[h.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:at,start:Kc,onSettingsChange:Kc,stop(){y(ga)}});var Vc=`.bloom-gc-panel {
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
}`;var Qp=new v("GreetingCustomizer"),nn="greetingCustomizer",Wc="greetingCustomizerUi",mo=100,ha=30,eg=120,tg=1e3,ng=50,og=40,rg=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),fo=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),$r=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function ig(e){return!!e?.closest(rg)}function Zc(e){return!!(ig(e)||e.closest('[data-testid="temporary-chat-label"]')||e.closest("[hidden]")||e.getAttribute("aria-hidden")==="true"||e.classList.contains("sr-only"))}function xo(e){try{for(let t of document.querySelectorAll(e))if(!Zc(t))return t}catch{}return null}function ba(e){for(let t of e.split(",").map(n=>n.trim()).filter(Boolean))if(xo(t))return t;return e}var Qc=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],B=x({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:wg},greetings:{type:0,description:"Greeting texts",hidden:!0,default:Qc},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),me=!1,an=!1,lt=null,Or,po,on,go,Br=0,Ir=null,rn=null,bo=null,ho=null,yo=null,Dr=null;function Se(){let e=location.pathname||"/";return e==="/"||e===""}function st(){let e=B.plain.greetings;return Array.isArray(e)?e.filter(t=>typeof t=="string"):Qc.slice()}function vo(e){return String(e??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function Yc(e){B.store.greetings=e.slice(0,ha)}function wo(){let e=String(B.store.mode??"refresh");return e==="interval"||e==="manual"?e:"refresh"}function ag(){return B.store.order==="random"?"random":"sequential"}function sg(){return fe(Number(B.store.intervalSec??10),1,3600)*1e3}function lg(e){return String(e??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function cg(){return!!xo($r)}function _r(){return!!(xo($r)||xo(fo))}function dg(e,t){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),o=[`content:"${e}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),r=cg()?ba($r):xo(fo)?ba(fo):ba($r),i=t?`${fo}{cursor:pointer!important;user-select:none!important}`:"";return[`${r}{${n}}`,`${r}::before{${o}}`,i,`@media (max-width:768px){${r}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function ug(e,t){if(e<=0)return 0;if(e===1)return Number(B.plain.index)!==0&&(B.store.index=0),Number(B.plain.lastRandom)!==0&&(B.store.lastRandom=0),0;let n=Number(B.plain.index),o=Number(B.plain.lastRandom);if(!t)return n>=0&&n<e?n:0;if(ag()==="random"){let a=n>=0&&n<e?n:o,s=Math.floor(Math.random()*e),c=0;for(;s===a&&c++<10;)s=Math.floor(Math.random()*e);return B.store.index=s,B.store.lastRandom=s,s}let i=((n>=-1&&n<e?n:-1)+1)%e;return B.store.index=i,i}function Ee(e){if(!me)return;if(!Se()){y(nn);return}let t=st().map(vo).filter(Boolean);if(!t.length){y(nn);return}let n=ug(t.length,e),o=t[n]??t[0],r=wo()==="manual"&&t.length>1;w(nn,dg(lg(o),r)),Dr?.()}function ya(){Or!==void 0&&(clearInterval(Or),Or=void 0)}function va(){ya(),!(!me||!Se())&&wo()==="interval"&&(st().filter(Boolean).length<=1||(Or=setInterval(()=>Ee(!0),sg())))}function xa(){go!==void 0&&(clearTimeout(go),go=void 0),Br=0}function Xc(){if(xa(),!me||!Se())return;Br=og;let e=()=>{if(go=void 0,!(!me||!Se())){if(_r()){wo()==="refresh"&&!an?(an=!0,Ee(!0)):Ee(!1),va();return}Br-=1,Br>0&&(go=setTimeout(e,ng))}};e()}function wa(){if(lt===!0){_r()?Ee(!1):Xc();return}lt=!0,an=!1,wo()==="refresh"?(an=!0,Ee(!0)):Ee(!1),va(),_r()||Xc()}function Ea(){lt=!1,an=!1,ya(),xa(),y(nn)}function qr(){on===void 0&&(on=window.setTimeout(()=>{on=void 0,me&&(Se()?wa():lt!==!1&&Ea())},eg))}function mg(){rn||(rn=history.pushState.bind(history),bo=history.replaceState.bind(history),ho=function(...t){let n=rn(...t);return qr(),n},yo=function(...t){let n=bo(...t);return qr(),n},history.pushState=ho,history.replaceState=yo)}function fg(){ho&&history.pushState===ho&&rn&&(history.pushState=rn),yo&&history.replaceState===yo&&bo&&(history.replaceState=bo),rn=null,bo=null,ho=null,yo=null}function pg(e){let t=e.target instanceof Element?e.target:null;t&&t.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(qr)}function gg(e){if(!me||!Se()||wo()!=="manual"||st().filter(Boolean).length<=1)return;let t=e.target instanceof Element?e.target:null;if(!t)return;let n=t.closest(fo);if(!n||Zc(n))return;let o=window.getSelection?.();o&&String(o).trim()||Ee(!0)}function bg(){po===void 0&&(po=setInterval(()=>{if(!me)return;let e=Se();if(e!==(lt===!0)){e?wa():Ea();return}e&&_r()&&Ee(!1)},tg))}function hg(){po!==void 0&&(clearInterval(po),po=void 0)}function Jc(e,t){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=e,n.setAttribute("aria-label",e);let o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.75"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),o.setAttribute("aria-hidden","true");for(let r of t.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",r),o.appendChild(i)}return n.appendChild(o),n}var yg="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",vg="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function xg(e,t){let n=vo(e);return n?n.length>mo?`Keep it to ${mo} characters.`:st().length+(t?1:0)>ha?`At most ${ha} greetings.`:null:"Enter a greeting."}function wg(e){e.className="bloom-gc-panel";let t="",n=-1,o="",r=-1,i=()=>{let a=st(),s=Number(B.plain.index);e.replaceChildren();let c=document.createElement("div");c.className="bloom-gc-composer";let l=document.createElement("textarea");l.className="bloom-gc-input",l.rows=3,l.maxLength=mo,l.placeholder="New greeting (line breaks ok)",l.value=t,l.addEventListener("input",()=>{t=l.value,o="";let f=c.querySelector(".bloom-gc-count");f&&(f.textContent=`${vo(t).length}/${mo}`);let T=c.querySelector(".bloom-gc-error");T&&(T.textContent="")}),c.appendChild(l);let d=document.createElement("div");d.className="bloom-gc-meta";let u=document.createElement("span");u.className="bloom-gc-count",u.textContent=`${vo(t).length}/${mo}`;let m=document.createElement("span");m.className="bloom-gc-error",m.textContent=o;let S=document.createElement("div");if(S.className="bloom-gc-actions",n>=0){let f=document.createElement("button");f.type="button",f.className="bloom-gc-btn",f.textContent="Cancel",f.addEventListener("click",()=>{n=-1,t="",o="",i()}),S.appendChild(f)}let E=document.createElement("button");if(E.type="button",E.className="bloom-gc-btn bloom-gc-btn-primary",E.textContent=n>=0?"Update":"Add",E.addEventListener("click",()=>{let f=n<0,T=xg(t,f);if(T){o=T,i();return}let $=vo(t),j=st().slice();n>=0&&n<j.length?j[n]=$:j.push($),Yc(j),n=-1,t="",o="",i()}),S.appendChild(E),d.append(u,m,S),c.appendChild(d),e.appendChild(c),!a.length){let f=document.createElement("p");f.className="bloom-gc-empty",f.textContent="No greetings. The official heading stays.",e.appendChild(f);return}let g=document.createElement("div");g.className="bloom-gc-list",a.forEach((f,T)=>{let $=document.createElement("div");$.className="bloom-gc-item",T===s&&($.dataset.active="true");let j=document.createElement("button");j.type="button",j.className=`bloom-gc-body${r===T?"":" bloom-gc-clamp"}`,j.textContent=f,j.addEventListener("click",()=>{r=r===T?-1:T,i()});let sn=document.createElement("div");sn.className="bloom-gc-item-actions";let ct=Jc("Edit",yg);ct.addEventListener("click",()=>{n=T,t=f,o="",i()});let Te=Jc("Delete",vg);Te.addEventListener("click",()=>{let ln=st().filter((dt,je)=>je!==T);Yc(ln),n===T?(n=-1,t=""):n>T&&(n-=1),i()}),sn.append(ct,Te),$.append(j,sn),g.appendChild($)}),e.appendChild(g)};return Dr=i,i(),()=>{Dr===i&&(Dr=null),e.replaceChildren()}}var ed=p({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[h.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Wc,settings:B,start(){me=!0,w(Wc,Vc),mg(),Ir=new AbortController;let{signal:e}=Ir;window.addEventListener("popstate",qr,{signal:e}),document.addEventListener("click",pg,{capture:!0,signal:e}),document.addEventListener("click",gg,{signal:e}),bg(),lt=null,Se()?wa():Ea(),Qp.debug("started")},stop(){me=!1,Ir?.abort(),Ir=null,on!==void 0&&(clearTimeout(on),on=void 0),ya(),xa(),hg(),fg(),y(nn),an=!1,lt=null},onSettingsChange(){me&&(Se()?(Ee(!1),va()):y(nn))}});var Eo=new v("Bloom"),td=!1,Eg=Date.now(),Sg=[Ms,ml,wl,Tl,Al,Il,Vl,Yl,Zl,lc,gc,Ec,Tc,Rc,Gc,Uc,ed];function jr(e){return new Promise(t=>setTimeout(t,e))}function Tg(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var od=8e3,nd=300,Lg=250;async function kg(){if(ze())return await jr(nd),!0;for(;Date.now()-Eg<od;)if(await jr(Lg),ze())return await jr(nd),!0;return ze()||Vr()}function Sa(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function Cg(){if(Sa())return!0;let e=Date.now()+od;for(;Date.now()<e;)if(await jr(100),Sa())return!0;return Sa()}function Mg(){try{GM_registerMenuCommand?.("Bloom++ settings",Cs)}catch{}}function Ag(){Ro(()=>{un("HostShell"),Eo.info("host shell",z)}),Po(()=>{Eo.info("idle ready",z)}),Io(()=>{Ca(),un("HostReady"),Eo.info("chrome ready",z)})}async function Ta(){await Ba()}async function La(){if(td)return;td=!0;for(let n of Sg)try{Ka(n)}catch(o){Eo.error("register failed",n.name,o)}Wa(),un("Init"),Mg(),Ag();let e=()=>un("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await Tg(),Cg().then(n=>{n&&Oo()}),!await kg()){Eo.warn("late islands not detected; starting default plugins",z),ft(),Bo();return}await es()}var rd=typeof unsafeWindow<"u"?unsafeWindow:window,Hg=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||Hg){let e=rd.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",z);try{Object.defineProperty(rd,"Bloom",{value:ka,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}Ta().then(()=>La()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
