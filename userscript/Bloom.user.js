// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260920] v1.4.50
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

/* Bloom++ [20260920] v1.4.50. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var ld=Object.defineProperty;var cd=(e,t)=>{for(var n in t)ld(e,n,{get:t[n],enumerable:!0})};var Ha={};cd(Ha,{REPO_URL:()=>is,Settings:()=>b,VERSION:()=>G,contextKeyFromUrl:()=>re,conversationTitle:()=>Tt,conversationToken:()=>_,currentConversationId:()=>L,hasDraftText:()=>oe,hasErrorToast:()=>U,hasLateIslands:()=>ze,init:()=>Aa,initSettings:()=>Ma,isDocumentInteractive:()=>as,isStreaming:()=>H,isUserDraftEmpty:()=>Pe,messageCreateTime:()=>sr,plugins:()=>Q,requestChromeReady:()=>_o,requestIdleReady:()=>gt,requestShellReady:()=>$o,setEditorText:()=>he,subscribeHarvest:()=>z,watchStreamingEdge:()=>se,whenChromeReady:()=>Do,whenIdleReady:()=>Bo,whenShellReady:()=>Oo});var ke=new Map,ko=!1;function dd(){return document.getElementById("bloom-root")?.shadowRoot??null}function ud(){return document.head??null}function ft(){let e=dd();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=md()}function Ur(e,t){if(!ko)return;let n=ud();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),ft();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,ft();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,ft()}function E(e,t){let n=ke.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},ke.set(e,n)),ko&&Ur(e,n)}function Na(){ko=!0;for(let[e,t]of ke)Ur(e,t);return ft(),!0}function Ra(e){let t=ke.get(e);t&&(t.disabled=!1,ko&&Ur(e,t))}function Pa(e){let t=ke.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),ft())}function y(e){let t=ke.get(e);t&&(t.el?.remove(),ke.delete(e),ft())}function md(){return Array.from(ke.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var v=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function p(e){return e}var Vr=new Map;function Co(e,t){let n=Vr.get(e);return n||(n=new Set,Vr.set(e,n)),n.add(t),()=>n.delete(t)}function Fe(e,t){let n=Vr.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var fd="bloompp";function Ia(){return new Promise((e,t)=>{let n=indexedDB.open(fd,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function Oa(e){try{let t=await Ia();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function Ba(e,t){try{let n=await Ia();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function mn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function pe(e,t,n){return Math.min(n,Math.max(t,e))}function Da(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function $a(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}function _a(e,t){let n;return((...o)=>{n&&clearTimeout(n),n=setTimeout(()=>e(...o),t)})}var Mo=new v("SettingsStore"),Ce="BloomSettings",pd=100;function Ho(e){if(mn(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(mn(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return mn(n)?n:null}return null}catch{return null}}var Ao=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,d]of this.defaultGetters)if(l.startsWith(c)){let u=l.slice(c.length+1);if(u&&!u.includes(".")){let m=d(u);m!==void 0&&(i[a]=m,s=m);break}}}return mn(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Mo.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},pd))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(Ce,this.plain)}catch{try{GM_setValue(Ce,t)}catch(n){Mo.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(Ce,t)}catch{}Ba(Ce,t).catch(n=>Mo.warn("Failed to save settings to IndexedDB:",n))}catch(t){Mo.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){Da(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var gd=new v("Settings"),bd={plugins:{}},b=new Ao(structuredClone(bd)),hd=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function yd(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function x(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(b.store.plugins[n]||(b.store.plugins[n]={}),b.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?b.plain.plugins[n]??{}:{}}};return t}function vd(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function qa(){let e=null;if(e=Ho(vd(Ce)),e||(e=Ho(await Oa(Ce))),!e)try{e=Ho(localStorage.getItem(Ce))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(b.plain.plugins=t),gd.debug("Loaded settings")}}function ja(e,t){t&&(t.pluginName=e,b.plain.plugins[e]||(b.plain.plugins[e]={}),b.setDefaultGetter(hd(e),n=>{if(n!=="enabled")return yd(t.def,n)}))}function Fa(){return b.plain.plugins.Settings||(b.store.plugins.Settings={}),b.store.plugins.Settings}function No(){return Fa().pinnedPlugins??[]}function za(e){return No().includes(e)}function Ga(e){let t=No(),n=t.includes(e);return b.store.plugins.Settings={...b.plain.plugins.Settings,pinnedPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}function Ro(){return Fa().starredPlugins??[]}function Ka(e){return Ro().includes(e)}function Ua(e){let t=Ro(),n=t.includes(e);return b.store.plugins.Settings={...b.plain.plugins.Settings,starredPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}var Po=new v("PluginManager"),Q={},fn=new Set;function Ya(e){if(Q[e.name]){Po.warn("Duplicate plugin",e.name);return}Q[e.name]=e,ja(e.name,e.settings)}function pt(e){let t=Q[e];if(!t)return!1;if(t.required)return!0;let n=b.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function Xa(e){let t=Q[e];if(!t||t.required)return;let n=!pt(e);b.plain.plugins[e]||(b.store.plugins[e]={}),b.store.plugins[e].enabled=n,n?Ja(t):xd(t),Fe("pluginToggle",{name:e,enabled:n})}function Ja(e,t=!1){if(!fn.has(e.name)&&pt(e.name))try{e.managedStyle&&Ra(e.managedStyle),e.start?.(),fn.add(e.name),e.settings&&b.addPrefixChangeListener(`plugins.${e.name}.`,()=>{fn.has(e.name)&&e.onSettingsChange?.()}),t||Po.debug("Started",e.name)}catch(n){Po.error("Failed to start",e.name,n)}}function xd(e){if(fn.has(e.name)){try{e.stop?.()}catch(t){Po.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(Pa(e.managedStyle),y(e.managedStyle)),fn.delete(e.name)}}function pn(e){for(let t of Object.values(Q))(t.startAt??"DOMContentLoaded")===e&&Ja(t)}var Va=2,Wa="defaultsRev";function Za(){for(let t of Object.values(Q))b.plain.plugins[t.name]||(b.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=b.store.plugins.Settings??(b.store.plugins.Settings={});if(e[Wa]!==Va){for(let t of["NoShareLink","NoDictation"]){let n=b.store.plugins[t]??(b.store.plugins[t]={});n.enabled=!1}e[Wa]=Va}}var gn=!1,Io=!1,Wr=!1,es=[],ts=[],ns=[];function Yr(e){let t=e.splice(0);for(let n of t)n()}function bn(){gn||(gn=!0,Yr(es))}function Xr(){Io||(Io=!0,gn||bn(),Yr(ts))}function os(){Wr||(Wr=!0,gn||bn(),Io||Xr(),Yr(ns))}function Oo(e){gn?e():es.push(e)}function Bo(e){Io?e():ts.push(e)}function Do(e){Wr?e():ns.push(e)}function $o(){bn()}function gt(){bn(),Xr()}function _o(){os()}function Qa(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function rs(){await Qa(4e3),bn(),await Qa(4e3),Xr(),os()}var h={p:"0-V-linuxdo"},G="[20260920] v1.4.50",is="https://github.com/0-V-linuxdo/Bloom";function Ed(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function wd(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function Jr(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function ze(){return Jr()?Ed()||wd():!1}function as(){return ze()}var Sd=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),ss=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Td=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Ld="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function ht(e){return e.id==="bloom-root"||!!e.closest(Ld)}function ls(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function qo(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function Zr(e){if(!(e instanceof HTMLElement)||!e.isConnected||ht(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&qo(t)?!1:e.getClientRects().length>0}function bt(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function kd(){let e=[];for(let t of document.querySelectorAll(Sd))!(t instanceof HTMLElement)||!t.isConnected||ht(t)||e.push(t);return e}function jo(e){if(!e.isConnected||ht(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function hn(){return kd().filter(jo)[0]??null}function Qr(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||ht(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function ei(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!ht(n)&&!bt(n)&&n.parentElement&&!bt(n.parentElement)&&(t=n);let o=t.parentElement;if(o&&!bt(o)&&!ht(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!bt(o.parentElement))return o}return t}function cs(){let e=document.querySelectorAll(ss);for(let n of e)if(Zr(n)&&!qo(n)&&ls(n))return n;let t=document.querySelectorAll(Td);for(let n of t){if(!Zr(n)||!ls(n)||qo(n))continue;let o=n.querySelector(ss);return Zr(o)&&!qo(o)?o:n}return null}function ds(){let e=hn();if(e){let t=ei(e),n=t.parentElement;if(n&&!bt(n))return n;if(!bt(t))return t}return Qr()}function us(e){let t=hn();return t?e.composedPath().includes(t):!1}var ni=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Cd={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function oi(e){return e==="auto"||e==="light"||e==="dark"}function Md(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Ad(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function ti(e){let t=Md(e);return t?Ad(t)>.55?"light":"dark":null}function Hd(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=ti(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=ti(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=ti(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function ms(e){return e==="auto"?Hd():e}function Nd(e){try{let t=getComputedStyle(document.documentElement);for(let n of ni){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function fs(e,t,n){let o=Cd[t];if(n){Nd(e);for(let r of ni)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of ni)e.style.setProperty(r,o[r])}function ps(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var ri=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var Pd="bloom-root",ee="bloom-rail-item",Uo="bloom-account-item",Ke="bloom-sidebar-panel",Mn="bloom-plugin-dialog",Zo="bloom-plugin-layer",Vo="bloom-settings-css",Id=2e3,Tn=x({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),hs=null,Od=null,Ne=!1,li=[],Fo=null,Wo=null,Ae=null,Go=null,ge=null,Ln=null,yn,yt=0,kn=0,vn=0,xn=null,En=null,Yo=null,ys=null,wn=null,ii=[],Xo=!1,Bd=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Dd=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],Qo="",Cn="all",Re="all";function er(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function vs(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function $d(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function _d(e){let t='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return e?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${t}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`}function qd(e){let t='<path d="M12 17v5"/>';return e?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var jd={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function Fd(e){return e.icon||jd[e.name]||er()}function xs(){return oi(Tn.store.appearance)?Tn.store.appearance:"auto"}function zd(){let e=document.createElement("div");e.className="bloom-field bloom-appearance-row";let t=document.createElement("span");t.className="bloom-field-label",t.textContent="Appearance";let n=document.createElement("select");n.setAttribute("aria-label","Appearance");let o=Tn.def.appearance,r=o.type===3?o.options??[]:[];for(let i of r){let a=document.createElement("option");a.value=i.value,a.textContent=i.label,n.appendChild(a)}return n.value=xs(),n.addEventListener("change",()=>{oi(n.value)&&(Tn.store.appearance=n.value)}),e.append(t,n),e}function ai(e,t,n){e&&(e.setAttribute("data-bloom-scheme",t),fs(e,t,n),e.style.removeProperty("--bloom-rail-surface"))}function Es(e){e&&(e.style.removeProperty("--bloom-rail-surface"),e.style.removeProperty("--bg-primary"))}function Sn(){let e=xs(),t=ms(e),n=e==="auto";ai(hs,t,n);let o=document.getElementById(Ke);o instanceof HTMLElement&&ai(o,t,n);let r=document.getElementById(Mn);r instanceof HTMLElement&&ai(r,t,n);let i=document.getElementById(ee);i instanceof HTMLElement&&Es(i),Fe("schemeChange",{scheme:t,pref:e})}function ws(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(e=>e.remove())}function Ss(){if(E("settings",ri),document.getElementById(Vo)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=Vo,e.textContent=ri,document.head.appendChild(e)}function Gd(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Kd(){for(let e of li)e();li=[]}function Ts(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function Ud(e){return e.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,t=>t.toUpperCase())}function ui(e){return e.settings?Object.entries(e.settings.def).filter(([,t])=>!t.hidden):[]}function Vd(e){return ui(e).length>0}function Ko(e){if(e.default!==void 0)return e.default;if(e.type===3)return(e.options?.find(n=>n.default)??e.options?.[0])?.value;if(e.type===2)return!1;if(e.type===4)return e.min??0;if(e.type===0)return"";if(e.type===1)return 0}function Wd(e,t){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let o=document.createElement("span");if(o.className="bloom-plugin-dialog-label-title",o.textContent=Ud(e),n.appendChild(o),t.description){let r=document.createElement("span");r.className="bloom-plugin-dialog-label-desc",r.textContent=t.description,n.appendChild(r)}return n}function Yd(e,t,n){if(n.hidden)return null;let o=n.type===4||n.type===0||n.type===1||n.type===5,r=document.createElement("div");r.className=o?"bloom-field bloom-field-stack":"bloom-field",r.appendChild(Wd(t,n));let i=b.store.plugins[e]??(b.store.plugins[e]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",li.push(n.render(a)),r.appendChild(a),r}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??Ko(n)??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),r.appendChild(a),r}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??Ko(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),r.appendChild(a),r}if(n.type===2){let a=Ts(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),r.appendChild(a),r}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[t]??Ko(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[t]=n.type===1?Number(a.value):a.value}),r.appendChild(a),r}return r}function gs(e,t){let n=document.createElement("div");n.className=t?`bloom-plugin-dialog-field ${t}`:"bloom-plugin-dialog-field";let o=document.createElement("div");return o.className="bloom-plugin-dialog-field-label",o.textContent=e,n.appendChild(o),n}function Xd(e){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let t=b.store.plugins[e.name]??(b.store.plugins[e.name]={});for(let[n,o]of ui(e)){if(n==="enabled"||o.type===5)continue;let r=Ko(o);r!==void 0&&(t[n]=r)}ks(e)}function Ls(e){e.key==="Escape"&&(!document.getElementById(Zo)&&!document.getElementById(Mn)||(e.stopPropagation(),vt()))}function Jd(){Xo||(document.addEventListener("keydown",Ls),Xo=!0)}function Zd(){Xo&&(document.removeEventListener("keydown",Ls),Xo=!1)}function vt(){Kd(),Zd(),document.getElementById(Zo)?.remove(),document.getElementById(Mn)?.remove()}function ks(e){if(vt(),!document.body)return;let t=document.createElement("div");t.id=Zo,t.className="bloom-plugin-layer",t.addEventListener("pointerdown",He),t.addEventListener("pointerup",He),t.addEventListener("click",d=>{d.stopPropagation(),d.target===t&&vt()});let n=document.createElement("div");n.id=Mn,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",He),n.addEventListener("pointerup",He),n.addEventListener("click",He);let o=document.createElement("button");o.type="button",o.className="bloom-icon-btn bloom-plugin-dialog-close",o.setAttribute("aria-label","Close"),o.innerHTML=vs(),o.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),vt()});let r=document.createElement("div");r.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=e.name,r.appendChild(i),e.description){let d=document.createElement("p");d.className="bloom-plugin-dialog-sub",d.textContent=e.description,r.appendChild(d)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(o,r,a),e.authors?.length){let d=gs("Authors"),u=document.createElement("p");u.className="bloom-plugin-dialog-authors",u.textContent=e.authors.join(", "),d.appendChild(u),n.appendChild(d)}let s=gs("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=ui(e);if(c.length)for(let[d,u]of c){let m=Yd(e.name,d,u);m&&l.appendChild(m)}if(!l.childElementCount){let d=document.createElement("p");d.className="bloom-dialog-empty",d.textContent="No configurable settings.",l.appendChild(d)}if(s.appendChild(l),n.appendChild(s),c.length){let d=document.createElement("div");d.className="bloom-plugin-dialog-footer";let u=document.createElement("button");u.type="button",u.className="bloom-plugin-dialog-reset",u.textContent="Reset",u.addEventListener("click",()=>Xd(e)),d.appendChild(u),n.appendChild(d)}t.appendChild(n),document.body.appendChild(t),Jd(),Sn()}function Qd(e){let t=document.createElement("div");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Fd(e);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=e.name,a.title=e.name,r.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=Ka(e.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=_d(l),c.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation();let f=Ua(e.name);Fe("pluginStar",{name:e.name,starred:f})}),s.appendChild(c),!e.required){let g=za(e.name),f=document.createElement("button");f.type="button",f.className=`bloom-icon-btn bloom-card-pin${g?" bloom-card-pin-active":""}`,f.setAttribute("aria-label",g?"Unpin from top":"Pin to top"),f.innerHTML=qd(g),f.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();let $=Ga(e.name);Fe("pluginPin",{name:e.name,pinned:$})}),s.appendChild(f)}if(Vd(e)){let g=document.createElement("button");g.type="button",g.className="bloom-icon-btn bloom-card-settings",g.setAttribute("aria-label",`${e.name} settings`),g.innerHTML=$d(),g.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),ks(e)}),s.appendChild(g)}let d=Ts(e.name,pt(e.name),!!e.required),u=d.querySelector("input");if(u?.addEventListener("click",g=>g.stopPropagation()),u?.addEventListener("change",()=>{Xa(e.name)}),s.appendChild(d),o.append(r,s),n.appendChild(o),e.description){let g=document.createElement("div");g.className="bloom-card-desc",g.textContent=e.description,n.appendChild(g)}let m=document.createElement("div");m.className="bloom-card-separator";let S=document.createElement("div");S.className="bloom-card-footer";let w=document.createElement("div");return w.className="bloom-card-author",w.textContent=e.authors?.filter(Boolean).join(", ")||"\xA0",S.appendChild(w),t.append(n,m,S),t}function Cs(){return Object.values(Q).filter(e=>!e.hidden&&e.name!=="Settings")}function Ms(e,t){return t==="all"||t==="favorites"?!0:(e.tags??[]).includes(t)}function eu(e){return`${e.name} ${e.description??""} ${(e.tags??[]).join(" ")}`.toLowerCase()}function tu(){return Qo.trim()?"No plugins match your search.":Re==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function nu(){let e=Cs();return Dd.filter(t=>t.id==="favorites"||t.id==="all"?!0:e.some(n=>Ms(n,t.id)))}function ou(){if(wn){wn.replaceChildren();for(let e of nu()){let t=document.createElement("button");t.type="button",t.className=`bloom-plugin-tab${Re===e.id?" bloom-plugin-tab-active":""}`,t.textContent=e.label,t.addEventListener("click",()=>{Re=e.id,Ge()}),wn.appendChild(t)}}}function ru(){let e=Cs();if(Re==="favorites"){let t=new Set(Ro());e=e.filter(n=>t.has(n.name))}else Re!=="all"&&(e=e.filter(t=>Ms(t,Re)));return Cn==="enabled"&&(e=e.filter(t=>pt(t.name))),Cn==="disabled"&&(e=e.filter(t=>!pt(t.name))),e}function Ge(){if(!xn)return;ou();let e=ru();Yo&&(Yo.placeholder=`Search ${e.length} plugins...`);let t=e,n=Qo.trim().toLowerCase();if(n&&(t=t.filter(o=>eu(o).includes(n))),Re!=="favorites"){let o=No();if(o.length){let r=new Map(o.map((i,a)=>[i,a]));t=t.slice().sort((i,a)=>{let s=r.has(i.name),l=r.has(a.name);return s!==l?s?-1:1:s?(r.get(i.name)??0)-(r.get(a.name)??0):i.name.localeCompare(a.name)})}}xn.replaceChildren();for(let o of t)xn.appendChild(Qd(o));En&&(En.hidden=t.length>0,En.textContent=tu())}function He(e){e.stopPropagation()}function si(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function mi(){document.getElementById(ee)?.setAttribute("aria-expanded",Ne?"true":"false")}function iu(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function fi(){vt(),Qo="",Cn="all",Re="all",document.getElementById(Ke)?.remove(),Ne=!1,mi()}function au(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",He),t.addEventListener("pointerup",He),t.addEventListener("click",He);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-titles";let i=document.createElement("div");i.className="bloom-settings-brand";let a=document.createElement("span");a.className="bloom-settings-mark",a.innerHTML=er();let s=document.createElement("h2");s.textContent="Bloom++",i.append(a,s);let l=document.createElement("p");l.className="bloom-settings-sub",l.textContent="Toggle features. Some need a reload. Click the sliders icon to configure.",r.append(i,l);let c=document.createElement("button");c.type="button",c.className="bloom-icon-btn",c.setAttribute("aria-label","Close"),c.innerHTML=vs(),c.addEventListener("click",fi),o.append(r,c),n.appendChild(o),n.appendChild(zd());let d=document.createElement("div");d.className="bloom-plugin-tabs",n.appendChild(d);let u=document.createElement("div");u.className="bloom-search-bar";let m=document.createElement("input");m.type="search",m.className="bloom-search-input",m.setAttribute("aria-label","Search plugins"),m.placeholder="Search plugins...",m.addEventListener("input",()=>{Qo=m.value,Ge()});let S=document.createElement("select");S.className="bloom-search-filter",S.setAttribute("aria-label","Filter plugins");for(let f of Bd){let T=document.createElement("option");T.value=f.value,T.textContent=f.label,S.appendChild(T)}S.value=Cn,S.addEventListener("change",()=>{Cn=S.value,Ge()}),u.append(m,S),n.appendChild(u);let w=document.createElement("div");w.className="bloom-plugin-list",n.appendChild(w);let g=document.createElement("p");return g.className="bloom-tab-empty",g.hidden=!0,n.appendChild(g),t.appendChild(n),xn=w,En=g,Yo=m,ys=S,wn=d,Ge(),t}function su(e){e.classList.add("bloom-rail-dock")}function lu(){let e=document.getElementById(ee);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&jo(e)?e:null}function cu(){if(document.getElementById(Ke)?.remove(),!document.body)return;let e=au(Ke);su(e),document.body.appendChild(e),Ne=!0,vt(),Sn(),mi(),Fe("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:G,dock:"center",rail:!!lu()})}function pi(){let e=document.getElementById(Ke);if(e instanceof HTMLElement&&e.isConnected&&iu(e)){fi();return}e?.remove(),cu()}function du(){let e=document.createElement("button");return e.type="button",e.id=ee,e.className="bloom-rail-item",e.setAttribute("aria-controls",Ke),e.setAttribute("aria-expanded",Ne?"true":"false"),e.innerHTML=`<span class="bloom-rail-mark">${er()}</span><span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),pi()}),e}function bs(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function uu(e){let t=e.querySelector("img");if(t instanceof HTMLElement){let n=t.getBoundingClientRect();if(n.width>8&&n.height>8)return t}for(let n of e.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}return null}function mu(e,t){for(let n of e.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||t&&(n===t||n.contains(t)||t.contains(n))||(n.textContent||"").trim().length<2)continue;let r=n.getBoundingClientRect();if(r.width>16&&r.height>8&&r.height<40)return n}return null}function Me(e,t,n){let o=`${n}px`;e.style.getPropertyValue(t)!==o&&e.style.setProperty(t,o)}function As(e,t){if(e.classList.contains("bloom-rail-compact"))return;let n=e.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!e.isConnected||!t.isConnected)return;let o=uu(t),r=getComputedStyle(t),i=Number.parseFloat(r.paddingTop),a=Number.parseFloat(r.paddingBottom);if(Number.isFinite(i)&&Me(e,"padding-top",Math.round(i)),Number.isFinite(a)&&Me(e,"padding-bottom",Math.round(a)),o){let s=o.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));Me(n,"width",l),Me(n,"height",Math.max(20,Math.round(s.height)));let c=e.getBoundingClientRect(),d=Math.round(s.left-c.left);d>=0&&d<=40&&Me(e,"padding-left",d);let u=mu(t,o);if(u){let m=u.getBoundingClientRect(),S=n.getBoundingClientRect(),w=Math.round(m.left-S.right);w>=0&&w<=24&&Me(e,"gap",w)}}else{let s=Number.parseFloat(r.paddingLeft),l=Number.parseFloat(r.columnGap||r.gap);Number.isFinite(s)&&Me(e,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&Me(e,"gap",Math.round(l))}Es(e)}function ci(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function fu(){if(Ln?.isConnected&&ge){ge.observe(Ln,{childList:!0});return}di()}function pu(e){if(ci(e))return!1;try{if(e.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function gu(e,t){!t||!e||requestAnimationFrame(()=>{if(e.isConnected){vn=0;return}vn+=1,kn=Date.now()+Math.min(8e3,250*2**Math.min(vn,5))})}function bu(){yt||Date.now()<kn||(yt=requestAnimationFrame(()=>{yt=0,!(Date.now()<kn)&&(document.getElementById(ee)?.isConnected||Jo())}))}function Jo(){if(!document.body)return;ge?.disconnect();let e=null,t=!1;try{let n=document.getElementById(ee);e=n instanceof HTMLButtonElement?n:du();let o=hn(),r=Qr();if(o){let i=ei(o),a=i.parentElement;if(ci(i)||a&&ci(a))return;e.isConnected&&e.nextElementSibling===i||(i.before(e),t=!0),bs(e),As(e,o)}else r?(e.parentElement!==r&&(r.appendChild(e),t=!0),bs(e,!0)):e.isConnected&&!jo(e)&&(e.remove(),e=null)}finally{gu(e,t),fu(),mi()}}function di(){let e=ds();!e||!pu(e)||Ln===e&&ge||(ge?.disconnect(),Ln=e,ge=new MutationObserver(()=>{document.getElementById(ee)?.isConnected||bu()}),ge.observe(e,{childList:!0}))}function hu(){Jo(),di(),yn===void 0&&(yn=window.setInterval(()=>{let e=document.getElementById(ee);if(!(e instanceof HTMLElement)||!e.isConnected)Date.now()>=kn&&Jo();else{vn=0;let t=hn();t&&As(e,t)}di()},Id))}function yu(){yn!==void 0&&(clearInterval(yn),yn=void 0),yt&&cancelAnimationFrame(yt),yt=0,kn=0,vn=0,ge?.disconnect(),ge=null,Ln=null}function vu(e){Go===e&&Ae||(Ae?.disconnect(),Go=e,Ae=new MutationObserver(()=>{if(!e.isConnected){Ae?.disconnect(),Ae=null,Go=null;return}Hs(e)}),Ae.observe(e,{childList:!0}))}function Hs(e){if(vu(e),e.querySelector(`#${Uo}`))return;let t=document.createElement("button");t.type="button",t.id=Uo,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${er()}<span>Bloom++</span>`,t.addEventListener("pointerdown",si),t.addEventListener("pointerup",si),t.addEventListener("click",n=>{si(n),pi()}),e.insertBefore(t,e.firstChild)}function zo(){let e=cs();return e?(Hs(e),!0):!1}function xu(e){us(e)&&(queueMicrotask(zo),requestAnimationFrame(()=>{zo()}),window.setTimeout(zo,60),window.setTimeout(zo,180))}function Eu(){Wo?.abort();let e=new AbortController;Wo=e,document.addEventListener("click",xu,{signal:e.signal})}function wu(){Wo?.abort(),Wo=null,Ae?.disconnect(),Ae=null,Go=null}function Ns(){gt(),Gd(()=>{Ss(),ws(),Jo(),pi()})}var Rs=p({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[h.p],required:!0,hidden:!0,enabledByDefault:!0,settings:Tn,startAt:"HostReady",cleanupSelectors:[`#${Pd}`,`#${ee}`,`#${Uo}`,`#${Ke}`,`#${Zo}`,`#${Mn}`,`#${Vo}`,"#bloom-menu-panel"],start(){Ss(),ws(),hu(),Eu(),Fo?.(),Fo=ps(Sn),Sn(),ii=[Co("pluginToggle",()=>{Ne&&Ge()}),Co("pluginPin",()=>{Ne&&Ge()}),Co("pluginStar",()=>{Ne&&Ge()})]},stop(){yu(),wu(),Fo?.(),Fo=null;for(let e of ii)e();ii=[],fi(),document.getElementById(ee)?.remove(),document.getElementById(Uo)?.remove(),document.getElementById(Vo)?.remove(),hs=null,Od=null,xn=null,En=null,Yo=null,ys=null,wn=null,Ne=!1},onSettingsChange:Sn});var tr='form[data-type="unified-composer"], form.w-full[data-type]',te=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),xt=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Ps=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Is=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Su=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Tu='[contenteditable="false"], button, [role="button"]';function K(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function Ue(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!K(r)))return r;return null}function Os(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function C(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=Os(e);return!!(Su.test(n)||/^stop$/i.test(n))}function ne(){let t=Array.from(document.querySelectorAll(tr)).find(K);if(t instanceof HTMLElement)return t;let n=Ue(document,te),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function D(){let e=Array.from(document.querySelectorAll(te));return e.find(K)??e[0]??null}function Lu(e,t){if(!e||e===t||!t.contains(e))return!1;let n=e.closest(Tu);return!!n&&n!==t&&t.contains(n)}function gi(e,t){let n=[];try{let o=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),r=o.nextNode();for(;r;){let i=r.parentElement;i&&Lu(i,t)||n.push(r.textContent??""),r=o.nextNode()}}catch{return e.innerText??e.textContent??""}return n.join("")}function oe(e){let t=e??D();return t?gi(t,t).replaceAll("\u200B","").trim().length>0:!1}function Pe(e){return!oe(e)}function An(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function Bs(e){let t=ne();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!K(n))&&e(n))return n;return null}function be(){let e=ne(),t=Ue(e,xt)??Ue(document,xt);return t&&!C(t)?t:Bs(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!C(n);let r=Os(n);return/^(send|send prompt|发送)$/i.test(r)&&!C(n)})}function bi(){let e=be();return!!e&&An(e)}function Ve(){let e=ne(),t=Ue(e,Ps,!0)??Ue(document,Ps,!0);if(t)return t;let n=Ue(e,Is)??Ue(document,Is);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&K(o)&&C(o))return o}return Bs(C)}function F(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>gi(n,e)).join(`
`):gi(e,e)}function hi(e,t=!1){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function he(e,t,n=!1){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r);try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch{e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),hi(e,n)}var Ds="bloom-host-icon",Hn="data-bloom-host-rel",yi="not all",vi=0,$s=0,ku=400;function _s(e){vi+=1;try{e()}finally{vi-=1}}function nr(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function Et(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function qs(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function Cu(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Mu(e,t){if(e.lastElementChild===t)return;let n=Date.now();n-$s<ku||($s=n,e.appendChild(t))}function Au(e,t){for(let n of e.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===t||nr(n)&&(n.getAttribute(Hn)||n.setAttribute(Hn,n.rel),n.media!==yi&&(n.media=yi),n.rel!==Ds&&(n.rel=Ds))}function Hu(e){for(let t of e.querySelectorAll(`link[${Hn}]`)){if(!(t instanceof HTMLLinkElement))continue;let n=t.getAttribute(Hn);n&&(t.rel=n),t.removeAttribute(Hn),t.media===yi&&t.removeAttribute("media")}}function xi(e,t){let{head:n}=document;!n||!t||_s(()=>{Au(n,e);let o=qs(e),{type:r,sizes:i}=Cu(t);o?Mu(n,o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function js(e,t){let{head:n}=document;n&&_s(()=>{qs(e)?.remove(),Hu(n)})}function Fs(e,t){let{head:n}=document;if(!n)return null;let o=0,r=new MutationObserver(i=>{if(vi)return;let a=!1,s;for(let l of i){l.type==="attributes"&&l.target instanceof HTMLLinkElement&&(l.target.id===e?a=!0:nr(l.target)&&(a=!0,Et(l.target.href)&&(s=l.target.href)));for(let c of l.removedNodes)nr(c)&&c.id===e&&(a=!0);for(let c of l.addedNodes)nr(c)&&c.id!==e&&(a=!0,Et(c.href)&&(s=c.href))}a&&(o||(o=requestAnimationFrame(()=>{o=0,t(s)})))});return r.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),r}var zs=/\/c\/([a-zA-Z0-9_-]{8,})/i;function _(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=c=>{let d=n.indexOf(c);return d>=0&&n[d+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,d)=>{try{return document.querySelector(c)?.getAttribute(d)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function re(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function wt(e){if(!e)return"";try{return(/^https?:/i.test(e)?new URL(e,location.origin).pathname:e).match(zs)?.[1]??""}catch{return e.match(zs)?.[1]??""}}function L(){let e=wt(location.pathname);if(e)return e;let n=_().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return""}var Vs=new v("Harvest"),Nu=1500,Ru=200,or=new Set,rr=new Map,ir=new Map,St=null,ar=null,Nn=null,ie=0;function Pu(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Iu(e){try{if(typeof e=="string")return e;if(e instanceof URL)return e.href;if(typeof Request<"u"&&e instanceof Request)return e.url}catch{}return String(e)}function Ou(e,t){let n=t?.method,o=typeof Request<"u"&&e instanceof Request?e.method:"";return(n||o||"GET").toUpperCase()}function Ws(e){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(e)}var Bu=/"action"\s*:\s*"(next|continue|variant)"/i;function Du(e,t,n){return!(t!=="POST"||Ws(e)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(e)||typeof n=="string"&&/"action"\s*:/.test(n)&&!Bu.test(n))}function $u(e,t){return t!=="GET"||Ws(e)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(e)}function Gs(e){return e.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function Ys(e){return e?e.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function _u(e){return typeof e=="string"?Ys(e):""}function Ei(e){if(typeof e=="number"&&Number.isFinite(e)&&e>0)return e>1e12?e:Math.round(e*1e3);if(typeof e=="string"){let t=e.trim();if(!t)return null;if(/^\d+(\.\d+)?$/.test(t))return Ei(Number(t));let n=Date.parse(t);return Number.isFinite(n)?n:null}return null}function Xs(e,t){if(e.size<=t)return;let n=e.size-t,o=0;for(let r of e.keys())if(e.delete(r),++o>=n)break}function Ks(e,t,n){!e||!t||ir.get(e)!==t&&(ir.set(e,t),Xs(ir,Nu),Ie({type:"message-time",messageId:e,createTime:t,conversationId:n}))}function qu(e,t){let n=t.trim();!e||!n||rr.get(e)!==n&&(rr.set(e,n),Xs(rr,Ru),Ie({type:"conversation-meta",conversationId:e,title:n}))}function Rn(e,t,n=0){if(n>6||!e||typeof e!="object")return;if(Array.isArray(e)){for(let l of e)Rn(l,t,n+1);return}let o=e,r=typeof o.conversation_id=="string"&&o.conversation_id||typeof o.conversationId=="string"&&o.conversationId||t;typeof o.title=="string"&&r&&!o.author&&!o.content&&!o.role&&qu(r,o.title);let i=o.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",d=Ei(l.create_time??l.createTime??l.created_at);c&&d&&Ks(c,d,r)}let a=typeof o.id=="string"?o.id:"",s=Ei(o.create_time??o.createTime??o.created_at);if(a&&s&&(o.author||o.content||o.role||o.create_time||o.createTime)&&Ks(a,s,r),o.mapping&&typeof o.mapping=="object")Rn(o.mapping,r,n+1);else if(n<3)for(let l of Object.values(o))l&&typeof l=="object"&&Rn(l,r,n+1)}function Us(e,t){if(e)try{Rn(JSON.parse(e),t)}catch{}}function Ie(e){for(let t of Array.from(or))try{t(e)}catch{}}async function ju(e,t,n){if(n===ie)try{let o=await e.json();if(n!==ie)return;Rn(o,t)}catch{}}async function Fu(e,t,n,o){let r=t,i=n,a=e.body;if(!a){o===ie&&Ie({type:"post-end",conversationId:r,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;o===ie;){let{done:d,value:u}=await s.read();if(d)break;if(c+=l.decode(u,{stream:!0}),!r){let S=Ys(c);S&&(r=S,Ie({type:"post-start",conversationId:r,url:""}))}let m=c.split(`
`);c=m.pop()??"";for(let S of m){let w=S.replace(/^data:\s*/,"").trim();!w||w==="[DONE]"||Us(w,r)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&o===ie&&Us(c.replace(/^data:\s*/,""),r)}catch{i=!0}finally{try{s.cancel()}catch{}}o===ie&&Ie({type:"post-end",conversationId:r,error:i})}function zu(e,t,n){let o=Iu(t),r=Ou(t,n),i=$u(o,r),a=Du(o,r,n?.body),s=ie,l="";return a&&(l=_u(n?.body)||Gs(o)||wt(o)||L(),Ie({type:"post-start",conversationId:l,url:o})),e(t,n).then(c=>{if(s!==ie||!i&&!a)return c;try{let d=c.clone();i?ju(d,Gs(o)||L(),s):Fu(d,l,!c.ok,s)}catch{a&&Ie({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===ie&&Ie({type:"post-end",conversationId:l,error:!0}),c})}function Gu(){if(St)return;let e=Pu();Nn=e,St=e.fetch.bind(e);let t=(n,o)=>zu(St,n,o);ar=t,e.fetch=t,Vs.debug("conversation fetch harvest hooked")}function Ku(){ie+=1,!(!St||!Nn)&&(ar&&Nn.fetch===ar&&(Nn.fetch=St),St=null,ar=null,Nn=null,Vs.debug("conversation fetch harvest unhooked"))}function z(e){return or.add(e),Gu(),()=>{or.delete(e),or.size===0&&Ku()}}function Tt(e){return e?rr.get(e)??"":""}function sr(e){return e?ir.get(e)??null:null}var Qs=new v("Streaming");function _n(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!K(t))&&(C(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function Uu(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&K(e))}function Vu(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&K(e))}function Wu(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function U(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function H(){if(Ve()||_n()||Wu())return!0;let e=be();return e&&K(e)&&!C(e)?!1:!!(Uu()||Vu())}var Yu=400,Js=3,Xe=new Set,In,On=null,wi=null,Ye=!1,We=0,Oe="",ae="",Bn=!1,Dn=!1,$n=!1;function el(){return re(_())}function Zs(e,t){return{streaming:e,contextKey:t,conversationId:L()}}function Xu(e,t){if(!e||e===t)return!1;if(e.endsWith("|draft")&&!t.endsWith("|draft"))return!0;try{let n=e.split("|")[0],o=t.split("|")[0],r=new URL(n).pathname.replace(/\/$/,"")||"/",i=new URL(o).pathname.replace(/\/$/,"")||"/";if((r==="/"||r==="")&&i.startsWith("/c/"))return!0}catch{}return!1}function Si(){Ye=!1,We=0,Oe="",Bn=!1,Dn=!1,$n=!1}function Ju(e){for(let t of Array.from(Xe))try{t.onFall?.(e)}catch{}}function Zu(e){for(let t of Array.from(Xe))try{t.onRise?.(e)}catch{}}function Pn(e){for(let t of Array.from(Xe))try{t.onTick?.(e)}catch{}}function Qu(e,t){for(let n of Array.from(Xe))try{n.onContext?.(e,t)}catch{}}function em(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest("button");n instanceof HTMLElement&&C(n)&&(Bn=!0)}function tm(e){e.type==="post-end"&&Ye&&($n=!0,e.error&&(Dn=!0))}function nm(){let e=el(),t=H();if(ae&&e&&ae!==e){if(Qu(e,ae),!Xu(ae,e)){Si(),ae=e,Pn(Zs(t,e));return}Oe===ae&&(Oe=e)}ae=e;let n=Zs(t,e);if(t){let i=!Ye;i&&(Bn=!1,Dn=!1,$n=!1),Ye=!0,We=0,Oe=e,i&&Zu(n),Pn(n);return}if(!Ye){Pn(n);return}if(We+=1,$n&&(We=Math.max(We,Js)),We<Js){Pn(n);return}let o=!!Oe&&Oe===e,r={contextKey:Oe||e,conversationId:L(),userStopped:Bn,error:Dn||U()};Si(),o&&Ju(r),Pn(n)}function om(){In===void 0&&(Ye=H(),ae=el(),Oe=Ye?ae:"",We=0,Bn=!1,Dn=!1,$n=!1,On?.abort(),On=new AbortController,document.addEventListener("click",em,{capture:!0,signal:On.signal}),wi=z(tm),In=setInterval(nm,Yu),Qs.debug("watchStreamingEdge started"))}function rm(){Xe.size||(In!==void 0&&(clearInterval(In),In=void 0),On?.abort(),On=null,wi?.(),wi=null,Si(),ae="",Qs.debug("watchStreamingEdge stopped"))}function se(e){let t=typeof e=="function"?{onFall:e}:e;return Xe.add(t),om(),()=>{Xe.delete(t),rm()}}var im=["original","badge","dot","hole","bg"],ol=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],rl={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},lr="#FCFCFC",am="#111111",tl="#111111",sm="#ffffff",lm="#212121",cm="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",dm={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},cr=32,nl=64;function il(e){return typeof e=="string"&&im.includes(e)}function um(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function dr(e){let t=document.createElement("canvas");t.width=cr,t.height=cr;let n=t.getContext("2d");return n?(n.scale(cr/nl,cr/nl),e(n),t.toDataURL("image/png")):""}function mm(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function ur(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(cm);n&&(e.strokeStyle=am,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function fm(e,t,n){let o=rl[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=tl,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=tl,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=sm,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function qn(e,t){if(e==="original")return t==="wait"?dr(o=>ur(o,lr)):um(dm[t]);let n=t==="wait"?void 0:rl[t];return dr(e==="hole"?o=>ur(o,n??lr):e==="bg"?o=>{o.fillStyle=n??lm,mm(o,0,0,64,64,14),o.fill(),ur(o,lr,!1)}:o=>{ur(o,lr),t!=="wait"&&fm(o,t,e==="dot"?"dot":"badge")})}function al(e){return{wait:qn(e,"wait"),rotate:qn(e,"rotate"),done:qn(e,"done"),ready:qn(e,"ready"),error:qn(e,"error")}}var pm=new v("ChatStateFavicons"),Ze="bloom-chat-state-favicon",ul=x({style:{type:3,description:"Favicon overlay",options:ol}}),Ct="",fr={wait:"",rotate:"",done:"",ready:"",error:""},pr="wait",kt=!1,ye=!1,V=null,Fn="",zn="",Kn=!0,jn=null,Mt=0,Lt,mr=null,Je=null,Ti=null,Gn=!1,sl=new WeakSet,gm=400;function bm(){let e=ul.store.style;return il(e)?e:"bg"}function hm(){let t=document.querySelector(`link[rel~="icon"]:not(#${Ze})`)?.href;return Et(t)?t:Et(Ct)?Ct:""}function W(e){if(pr===e){let t=document.getElementById(Ze);if(t instanceof HTMLLinkElement&&t.getAttribute("href")===fr[e])return}pr=e,xi(Ze,fr[e])}function ll(){fr=al(bm()),W(pr)}function ym(){let e=_(),t=e?re(e):re("");return H()?(!Fn&&t&&(Fn=t),Fn||t):(Fn="",t)}function ml(){kt=!1,ye=!1,V=null,Fn=""}function vm(e){zn=e,ml(),Kn=!1,W("wait")}function cl(e,t){return!e&&Kn&&!t}function fl(){if(!Gn)return;let e=_()||location.pathname;if(zn&&e&&zn!==e){vm(e);return}e&&(zn=e);let t=ym(),n=H(),o=Pe(),r=bi();if(U()&&!n){W("error"),kt=!1,ye=!1,V=null;return}if(n){kt||(Kn=!1),kt=!0,ye=!1,V=t,W("rotate");return}if(kt){let i=!!V&&!!t&&V===t;if(kt=!1,i){ye=!0,V=t,W("done");return}ye=!1,V=null}if(ye)if(!!(V&&t&&V!==t))ye=!1,V=null;else if(o){W("done");return}else if(cl(o,r)){ye=!1,W("ready");return}else{ye=!1,W("wait");return}V=null,o?W("wait"):cl(o,r)?W("ready"):W("wait")}function pl(){let e=ne();if(!(Je&&Ti===e&&e.isConnected)){if(Je?.disconnect(),Ti=e,!e||e===document.body){Je=null;return}Je=new MutationObserver(()=>gr()),Je.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function gr(){!Gn||Mt||(Mt=requestAnimationFrame(()=>{Mt=0,Gn&&(gl(),pl(),fl())}))}function dl(){oe()&&(Kn=!0),gr()}function gl(){let e=D();!e||sl.has(e)||(sl.add(e),e.addEventListener("input",dl,{passive:!0}),e.addEventListener("compositionend",dl,{passive:!0}))}var bl=p({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:ul,startAt:"DOMContentLoaded",cleanupSelectors:[`#${Ze}`],start(){Gn=!0,Ct=hm()||Ct,ll(),mr?.disconnect(),mr=Fs(Ze,e=>{Et(e)&&(Ct=e),xi(Ze,fr[pr])}),jn?.abort(),jn=new AbortController,window.addEventListener("popstate",gr,{signal:jn.signal}),gl(),pl(),Lt!==void 0&&clearInterval(Lt),Lt=setInterval(gr,gm),fl(),pm.debug("favicon watch started")},stop(){Gn=!1,Mt&&cancelAnimationFrame(Mt),Mt=0,Lt!==void 0&&(clearInterval(Lt),Lt=void 0),jn?.abort(),jn=null,Je?.disconnect(),Je=null,Ti=null,mr?.disconnect(),mr=null,ml(),zn="",Kn=!0,js(Ze,Ct)},onSettingsChange:ll});var hl=`.bloom-ih-hud {
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
`;var dh=new v("InputHistory"),Li=/\u200B/g,yl=10,vl=500,xl=100,Em=8,wm=120,Sm=2e3,br=10,hr=x({maxEntries:{type:4,description:"Max stored prompts",min:yl,max:vl,default:xl},history:{type:5,description:"Stored prompts",render:$m},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),ki=new Map,N=0,Ci="",le=!1,Vn=!1,Hi=0,Un=null,Mi,Ni=null,El=!0;function Y(){let e=hr.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function wl(e){let t=pe(Number(hr.store.maxEntries??xl),yl,vl);return e.length>t?e.slice(e.length-t):e}function yr(e){hr.store.entries=wl(e)}function Tm(e){return e.replaceAll(Li,"").replace(/\n$/,"").trim()}function Ai(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(te);return n instanceof HTMLElement?n:D()}function Lm(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!F(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(Li,"").trim().length===0,last:i.toString().replaceAll(Li,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Sl(e){clearTimeout(Mi),Mi=setTimeout(()=>{if(e!==Hi)return;Vn=!1;let t=Ni;t&&hi(t,El)},wm)}function Tl(e,t,n){Vn=!0,Ni=e,El=n;let o=++Hi;he(e,t,n),Sl(o)}function km(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function At(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Cm(){document.querySelector(".bloom-ih-hud")?.remove()}function Mm(e,t){let n=km();n.textContent=e;let o=(t.closest("form")??ne()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-Em)}px`,n.classList.add("bloom-ih-hud-on")}function Ri(e){let t=Tm(e);if(!t)return;let n=Date.now(),o=ki.get(t);if(o&&n-o<Sm)return;ki.set(t,n);let r=Y().filter(i=>i!==t);r.push(t),yr(r),N=Y().length,le=!1,At()}function Am(e,t){let n=Y();if(!n.length&&e)return;N>=n.length&&(Ci=F(t),N=n.length);let o=e?N-1:N+1;o<0||o>n.length||(N=o,le=!0,Tl(t,o===n.length?Ci:n[o],e),o<n.length?Mm(`${o+1} / ${n.length}`,t):At())}function Hm(e){le=!1,At(),Tl(e,Ci,!1),N=Y().length}function Nm(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=Ai(e.target)??Ai(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&le&&!e.altKey&&!e.shiftKey){Hm(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){Ri(F(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=Y();if(!o){let i=Lm(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||N<=0)||!n&&N>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),Am(n,t))}function Rm(e){if(Ai(e.target)){if(Vn){Sl(Hi);return}le&&(le=!1,At(),N=Y().length)}}function Pm(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(te);n instanceof HTMLElement&&Ri(F(n))}function Im(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(xt);if(!n||!(n instanceof HTMLElement)||C(n))return;let o=D();o&&Ri(F(o))}function Om(e){if(!(!le||Vn)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}le=!1,At()}}function Bm(){if(Un)return;Un=new AbortController;let{signal:e}=Un,t={capture:!0,signal:e};window.addEventListener("keydown",Nm,t),window.addEventListener("input",Rm,t),window.addEventListener("submit",Pm,t),window.addEventListener("click",Im,t),window.addEventListener("pointerdown",Om,t)}function Dm(e){let t=Y().slice();t.splice(e,1),yr(t),N>t.length&&(N=t.length)}function $m(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=Y().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(f=>f.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/br));n>=l&&(n=l-1);let c=s.slice(n*br,n*br+br);e.replaceChildren();let d=document.createElement("input");if(d.className="bloom-ih-search",d.type="search",d.placeholder="Search history",d.autocomplete="off",d.value=t,d.addEventListener("input",()=>{t=d.value,n=0,r()}),e.appendChild(d),c.length){let f=document.createElement("div");f.className="bloom-ih-list",c.forEach((T,$)=>{let j=i.indexOf(T),dn=Y().length-1-j,ut=document.createElement("div");ut.className="bloom-ih-item";let Le=document.createElement("button");Le.type="button",Le.className=`bloom-ih-body${o===$?"":" bloom-ih-clamp"}`,Le.textContent=T,Le.addEventListener("click",()=>{o=o===$?-1:$,r()});let un=document.createElement("div");un.className="bloom-ih-actions";let mt=document.createElement("button");mt.type="button",mt.title="Copy",mt.textContent="C",mt.addEventListener("click",()=>{$a(T)});let je=document.createElement("button");je.type="button",je.title="Delete",je.textContent="\xD7",je.addEventListener("click",()=>{Dm(dn),r()}),un.append(mt,je),ut.append(Le,un),f.appendChild(ut)}),e.appendChild(f)}else{let f=document.createElement("p");f.className="bloom-ih-empty",f.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(f)}let u=document.createElement("div");u.className="bloom-ih-pager";let m=document.createElement("button");m.type="button",m.className="bloom-ih-btn",m.textContent="Prev",m.disabled=n<=0,m.addEventListener("click",()=>{n-=1,r()});let S=document.createElement("span");S.textContent=`${n+1} / ${l}`;let w=document.createElement("button");w.type="button",w.className="bloom-ih-btn",w.textContent="Next",w.disabled=n+1>=l,w.addEventListener("click",()=>{n+=1,r()});let g=document.createElement("button");g.type="button",g.className="bloom-ih-clear",g.textContent="Clear all",g.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(yr([]),N=0,r())}),u.append(m,S,w,g),e.appendChild(u)};return r(),()=>{e.replaceChildren()}}var Ll=p({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:hr,startAt:"HostReady",managedStyle:"inputHistory",start(){E("inputHistory",hl),N=Y().length,le=!1,Bm()},stop(){Un?.abort(),Un=null,At(),Cm(),ki.clear(),clearTimeout(Mi),Vn=!1,Ni=null,le=!1},onSettingsChange(){let e=Y(),t=wl(e);t.length!==e.length&&yr(t),N>t.length&&(N=t.length)}});var Pi="noShareLink",_m=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],qm=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],Ii=x({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function kl(e){return`${e.join(",")}{display:none!important}`}function Cl(){let e=[];if(Ii.store.hideShareChat!==!1&&e.push(kl(_m)),Ii.store.hideShareProject!==!1&&e.push(kl(qm)),!e.length){y(Pi);return}E(Pi,e.join(`
`))}var Ml=p({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[h.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Ii,start:Cl,onSettingsChange:Cl,stop(){y(Pi)}});var Nl="noDictation",jm=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],Fm=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Rl=x({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Al(e){return`${e.join(",")}{display:none!important}`}function Hl(){let e=[Al(jm)];Rl.store.hideDictationSettings!==!1&&e.push(Al(Fm)),E(Nl,e.join(`
`))}var Pl=p({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Rl,start:Hl,onSettingsChange:Hl,stop(){y(Nl)}});var Oi="noSidebarIdentity",Ht=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Bi=Ht.flatMap(e=>[`${e} .min-w-0 > .truncate`,`${e} .min-w-0.flex-1 .truncate`]),Dl=Ht.flatMap(e=>[`${e} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),zm=[...Bi,...Dl],Il=[...Bi,...Ht.flatMap(e=>[`${e} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],Gm=Ht.map(e=>`${e} a[href^="mailto:"]`),Km=Ht.flatMap(e=>[`${e} .min-w-0 > :not(.truncate)`,`${e} .min-w-0 > :not(.truncate) *`,`${e} .min-w-0 .text-xs`,`${e} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${e} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${e} .text-xs:not(.truncate)`,`${e} .text-token-text-secondary:not(.truncate)`,`${e} .text-token-text-tertiary:not(.truncate)`,`${e} .min-w-0 ~ *`,`${e} .min-w-0 ~ * *`,`${e} > .text-xs`,`${e} > .text-token-text-secondary`,`${e} > .text-token-text-tertiary`]),Um=Ht.flatMap(e=>[`${e} .min-w-0.flex-col > :not(.truncate)`,`${e} .min-w-0.flex-col > .text-xs`,`${e} .min-w-0.flex-col > .text-token-text-secondary`,`${e} .min-w-0.flex-col > .text-token-text-tertiary`,`${e} .min-w-0:not(.flex) > :not(.truncate)`,`${e} .min-w-0:not(.flex) > .text-xs`,`${e} .min-w-0:not(.flex) > .text-token-text-secondary`,`${e} .min-w-0:not(.flex) > .text-token-text-tertiary`]),Wn=x({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function Ol(e){return`${e.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Vm(e){return`${e.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function Wm(){return`${Um.join(",")}{margin-block:auto!important}`}function Ym(){return`${Km.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function Bl(){let e=Wn.store.hideUsername!==!1,t=Wn.store.hideEmail!==!1,n=e&&Wn.store.enlargePlan!==!1,o=e&&Wn.store.alignPlanWithAvatar===!0,r=[];if(e&&(o?(r.push(Vm(n?Il:[...Il,...Dl])),r.push(Wm())):r.push(Ol(n?Bi:zm))),t&&r.push(Ol(Gm)),n&&r.push(Ym()),!r.length){y(Oi);return}E(Oi,r.join(`
`))}var $l=p({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[h.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Wn,start:Bl,onSettingsChange:Bl,stop(){y(Oi)}});var _l=`#bloom-rt-host {
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
`;var Fl=new v("RecentTopics"),Pt="bloom-rt-host",zl="home",Gl=/^\/c\/([a-z0-9_-]{8,})/i,Jm=/\/c\/([a-z0-9_-]{8,})/i,Kl=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Zm=new Set(["Backquote","IntlBackslash"]),Qm=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),ef=140,tf=[3,4,5,6,7,8,9,10,11,12].map(e=>({label:String(e),value:String(e),default:e===5})),R=x({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:tf},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),vr=null,$i=null,q=!1,eo=!1,Yn=!1,ce=0,Qe="",Nt=null,Xn=null,Rt,Di=null;function nf(){let e=Number(R.store.maxRecent??5);return Number.isFinite(e)&&e>=3&&e<=12?e:5}function Jn(){let e=R.plain.visits;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function _i(){let e=R.plain.titles;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Ul(){let e=R.plain.previews;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function qi(){let e=R.plain.projects;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Er(e){let t=nf();return e.length>t?e.slice(0,t):e}function de(e){return e===zl}function Zn(e,t=ef){let n=e.replace(/\s+/g," ").trim();return n.length<=t?n:`${n.slice(0,t-1)}\u2026`}function ji(e){if(!e)return"";try{return new URL(e,location.origin).pathname.match(Gl)?.[1]??""}catch{return e.match(Jm)?.[1]??""}}function et(){let e=(location.pathname||"/").match(Gl);if(e?.[1])return e[1];let n=_().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return zl}function Fi(e){if(de(e))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${e}"]`);for(let o of n){if(ji(o.getAttribute("href")||"")!==e)continue;let r=Zn(o.textContent||"",80);if(r)return r}}catch{}let t=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return et()===e&&t&&!/^ChatGPT$/i.test(t)?Zn(t,80):""}function of(e){if(de(e))return"New chat";let t=_i()[e];if(t)return t;let n=Tt(e);return n||Fi(e)||"Chat"}function rf(e){return qi()[e]||""}function af(e){return Ul()[e]||{}}function zi(e,t){if(!e||de(e)||!t||/^new chat$/i.test(t.trim()))return;let n=_i();n[e]!==t&&(n[e]=t,R.store.titles=n)}function sf(e){e.type==="conversation-meta"&&(zi(e.conversationId,e.title),q&&It())}function lf(e,t){if(!e||de(e)||!t)return;let n=qi();n[e]!==t&&(n[e]=t,R.store.projects=n)}function cf(e,t){if(!e||de(e)||!t.user&&!t.assistant)return;let n=Ul(),o=n[e]||{},r={user:t.user||o.user,assistant:t.assistant||o.assistant};o.user===r.user&&o.assistant===r.assistant||(n[e]=r,R.store.previews=n)}function Gi(e){if(!e||de(e)&&R.store.includeHome===!1)return;let t=Jn().filter(n=>n!==e);t.unshift(e),R.store.visits=Er(t)}function wr(){let e=R.store.includeHome!==!1;return Er(Jn().filter(n=>e||!de(n))).map(n=>({id:n,title:of(n),project:rf(n),preview:af(n)}))}function ql(e){try{let t=document.querySelectorAll(`[data-message-author-role="${e}"]`),n=t[t.length-1];if(!(n instanceof HTMLElement))return"";let o=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||o.push(a)}let r=o.length?o.join(" "):n.textContent||"";return Zn(r)}catch{return""}}function Qn(e){if(!e||de(e)||e!==et())return;let t=Fi(e);t&&zi(e,t);let n=ql("user"),o=ql("assistant");cf(e,{user:n,assistant:o});let r=Wl(e);if(r){let i=Vl(r);i&&lf(e,i)}}function Ki(){let e=_i(),t=qi(),n=[],o=new Set,r=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${Pt}, #bloom-root, #bloom-sidebar-panel`))continue;let d=ji(c.getAttribute("href")||"");if(!d||o.has(d))continue;o.add(d),n.push(d);let u=Zn(c.textContent||"",80);u&&!Kl.test(u)&&e[d]!==u&&(e[d]=u,r=!0);let m=Vl(c);m&&t[d]!==m&&(t[d]=m,i=!0)}}catch{}r&&(R.store.titles=e),i&&(R.store.projects=t);let a=Jn(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(R.store.visits=Er([...a,...l]))}function Vl(e){let t=e.parentElement;for(let n=0;n<10&&t;n++){if(t.id==="bloom-rt-host"||t.id==="bloom-root"){t=t.parentElement;continue}let o=t.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),r=Zn((o instanceof HTMLElement?o.textContent:"")||"",60);if(r&&!Kl.test(r)&&!/^20\d{2}/.test(r)&&r!==e.textContent?.trim()&&t.querySelector('a[href^="/c/"]'))return r;t=t.parentElement}return""}function Wl(e){if(de(e)){let t=document.querySelector('[data-testid="create-new-chat-button"]');return t instanceof HTMLAnchorElement?t:document.querySelector('a[href="/"]')}try{for(let t of document.querySelectorAll(`a[href*="/c/${e}"]`))if(ji(t.getAttribute("href")||"")===e)return t}catch{}return null}function df(e){let t=Wl(e);if(t){t.click();return}if(de(e)){location.assign("/");return}location.assign(`/c/${e}`)}function uf(){let e=et();Qe&&Qe!==e&&Qn(Qe),Qe=e,Gi(e),Ki();let t=Fi(e);t&&zi(e,t),Qn(e)}function xr(){Rt===void 0&&(Rt=window.setTimeout(()=>{Rt=void 0,uf()},120))}function mf(){Nt||(Nt=history.pushState.bind(history),Xn=history.replaceState.bind(history),history.pushState=function(...t){let n=Nt(...t);return xr(),n},history.replaceState=function(...t){let n=Xn(...t);return xr(),n})}function ff(){Nt&&(history.pushState=Nt),Xn&&(history.replaceState=Xn),Nt=null,Xn=null}function pf(e){return Zm.has(e.code)||e.keyCode===192?!0:Qm.has(e.key)}function Yl(e){return e.key==="Control"||e.code==="ControlLeft"||e.code==="ControlRight"}function gf(e,t){eo=t,Ki(),Qn(et()),q=!0,ce=0;try{let n=et();Gi(n);let o=wr();o.length>1&&(ce=e?o.length-1:1)}catch(n){Fl.error("Failed to open switcher:",n)}It()}function jl(e){let{length:t}=wr();t&&(ce=(ce+(e?-1:1)+t)%t,It())}function Ui(){if(!q)return;let e=wr()[ce];q=!1,eo=!1,It(),e&&df(e.id)}function Xl(){q&&(q=!1,eo=!1,It())}function bf(e){if(Yl(e)){Yn=!0;return}if((e.ctrlKey||Yn)&&!e.altKey&&!e.metaKey&&pf(e)&&!e.repeat){e.preventDefault(),e.stopImmediatePropagation();try{q?jl(e.shiftKey):gf(e.shiftKey,!0)}catch(n){Fl.error("Hotkey failed:",n)}return}if(q){if(e.key==="Escape"){e.preventDefault(),Xl();return}if(e.key==="Enter"&&!e.shiftKey){e.preventDefault(),Ui();return}e.key==="Tab"&&(e.ctrlKey||Yn)&&(e.preventDefault(),jl(e.shiftKey))}}function hf(e){Yl(e)&&(Yn=!1,q&&eo&&Ui())}function yf(e){let t=e.target instanceof Element?e.target:null;!t||!t.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(xr)}function vf(e){!q||(e.target instanceof Element?e.target:null)?.closest(`#${Pt}`)||Xl()}function xf(){document.visibilityState==="hidden"&&Qn(et())}function Ef(){if(!document.body)return null;let e=document.getElementById(Pt);if(e instanceof HTMLElement)return $i=e,e;e=document.createElement("div"),e.id=Pt;let t=document.createElement("div");return t.className="bloom-rt-panel",t.setAttribute("role","listbox"),t.setAttribute("aria-label","Recent conversations"),t.dataset.visible="false",t.addEventListener("click",n=>n.stopPropagation()),e.append(t),document.body.append(e),$i=e,e}function It(){let e=Ef();if(!e)return;let t=e.querySelector(".bloom-rt-panel");if(!t)return;if(!q){t.dataset.visible="false",t.replaceChildren();return}let n=wr();if(!n.length){t.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",t.replaceChildren(i);return}ce>=n.length&&(ce=0);let o=document.createElement("div");o.className="bloom-rt-list",o.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===ce?"true":"false",s.setAttribute("aria-selected",a===ce?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="user",d.textContent=i.preview.user,c.append(d)}if(i.preview.assistant){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="assistant",d.textContent=i.preview.assistant,c.append(d)}s.append(c)}s.addEventListener("click",()=>{ce=a,Ui()}),o.append(s)}),t.replaceChildren(o),t.dataset.visible="true",t.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function wf(){document.getElementById(Pt)?.remove(),$i=null}var Jl=p({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${Pt}`],settings:R,start(){E("recentTopics",_l),Qe=et(),Gi(Qe),Ki(),Qn(Qe),Di=z(sf),mf(),vr=new AbortController;let{signal:e}=vr;window.addEventListener("keydown",bf,{capture:!0,signal:e}),window.addEventListener("keyup",hf,{capture:!0,signal:e}),window.addEventListener("popstate",xr,{signal:e}),document.addEventListener("click",yf,{capture:!0,signal:e}),document.addEventListener("click",vf,{signal:e}),document.addEventListener("visibilitychange",xf,{signal:e})},stop(){vr?.abort(),vr=null,Rt!==void 0&&(clearTimeout(Rt),Rt=void 0),ff(),Di?.(),Di=null,q=!1,eo=!1,Yn=!1,wf()},onSettingsChange(){let e=Er(Jn());e.length!==Jn().length&&(R.store.visits=e),q&&It()}});var Vi="cleaner",Sf=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],Tf=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],Lf=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],kf=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],Cf=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],Mf=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],tt=x({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function Ot(e){return`${e.join(",")}{display:none!important}`}function Zl(){let e=[];if(tt.store.hideDownloadApps!==!1&&e.push(Ot(Sf)),tt.store.hideDisclaimer!==!1&&e.push(Ot(Tf)),tt.store.hideUpgrade!==!1&&e.push(Ot(Lf)),tt.store.hideLockedModels!==!1&&e.push(Ot(kf)),tt.store.hideHomePromo!==!1&&e.push(Ot(Cf)),tt.store.hideAds!==!1&&e.push(Ot(Mf)),!e.length){y(Vi);return}E(Vi,e.join(`
`))}var Ql=p({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[h.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:tt,start:Zl,onSettingsChange:Zl,stop(){y(Vi)}});var Tr=new v("ResponseNotification"),Dt=x({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:Of},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Wi=!1,Sr=null,Bt=null,to=null;function Af(){return document.visibilityState==="hidden"||document.hidden}function Hf(){return Dt.store.onlyWhenHidden===!1?!0:Af()}function Nf(){let e=Tt(L());if(e)return e;let t=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return t&&!/^ChatGPT$/i.test(t)?t:"Chat"}function ec(){try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!Bt||Bt.state==="closed")&&(Bt=new e);let t=Bt,n=t.currentTime,o=[523.25,659.25];for(let r=0;r<o.length;r++){let i=t.createOscillator(),a=t.createGain();i.type="sine",i.frequency.value=o[r];let s=n+r*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(t.destination),i.start(s),i.stop(s+.24)}t.resume?.()}catch(e){Tr.debug("chime failed",e)}}function Rf(e){try{let t=new Audio(e);t.volume=.7,t.play()}catch(t){Tr.debug("custom sound failed",t),ec()}}function tc(){let e=String(Dt.store.soundUrl||"").trim();e?Rf(e):ec()}function Pf(){let e="Bloom++",t=`${Nf()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:e,text:t,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(e,{body:t,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){Tr.debug("notification failed",n)}}function If(){Hf()&&(Dt.store.sound!==!1&&tc(),Dt.store.browserNotification!==!1&&Pf())}function Of(e){let t=document.createElement("button");return t.type="button",t.textContent="Play",t.addEventListener("click",()=>tc()),e.appendChild(t),()=>{t.remove()}}var nc=p({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Dt,start(){Wi=!0,Sr?.(),Sr=se(e=>{Wi&&(e.userStopped||e.error||If())}),to?.abort(),to=new AbortController,Dt.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:to.signal}),Tr.debug("watch started")},stop(){Wi=!1,Sr?.(),Sr=null,to?.abort(),to=null;try{Bt?.close()}catch{}Bt=null}});var oc=`#bloom-pq-chip {
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
`;var io=new v("PromptQueue"),Xi="bloom-pq-chip",rc="promptQueue",ic=80,Df=50,$f=2e3,cc=x({replacePending:{type:2,description:"Replace the queued prompt if you Enter again while one is waiting.",default:!0}}),I=new Map,ve=!1,X="",P="",De=!1,J=!1,M=null,no=null,Lr=null,ro,oo,$t=null;function _t(){return re(_())}function qt(e){return e.replaceAll("\u200B","").replace(/\n$/,"").trim()}function ac(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(te);return n instanceof HTMLElement?n:D()}function Ji(e){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation()}function dc(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function _f(){try{let e=document.querySelectorAll('[data-message-author-role="user"]'),t=e[e.length-1];return t instanceof HTMLElement?qt(t.innerText||t.textContent||""):""}catch{return""}}function qf(e,t){if(!e||e===t)return!1;if(e.endsWith("|draft")&&!t.endsWith("|draft"))return!0;try{let n=e.split("|")[0],o=t.split("|")[0],r=new URL(n).pathname.replace(/\/$/,"")||"/",i=new URL(o).pathname.replace(/\/$/,"")||"/";if((r==="/"||r==="")&&i.startsWith("/c/"))return!0}catch{}return!1}function sc(e){if(!X||X===e)return;let t=I.get(X);!t||I.has(e)||qf(X,e)&&(I.delete(X),I.set(e,t),P===X&&(P=e),M?.key===X&&(M.key=e),io.debug("migrated pending",X,"\u2192",e))}function Zi(e){let t=_t();if(I.get(t)&&cc.store.replacePending===!1)return;I.set(t,{text:e,at:Date.now()}),M={key:t,text:e,turns:dc(),ticks:3};let o=D();o&&he(o,""),Be(),io.debug("queued",t,e.length)}function jf(e){I.delete(e),P===e&&(P=""),M?.key===e&&(M=null),Be()}function Ff(){J=!0,clearTimeout(oo),oo=setTimeout(()=>{J=!1,oo=void 0},$f)}function zf(){let e=_t(),t=I.get(e);if(!t)return;let n=D();if(!n)return;I.delete(e),P="",Be(),Ff(),he(n,t.text);let o=be();o&&!C(o)&&!An(o)&&(o.click(),J=!1)}function lc(e){if(!ve||De||H()||_t()!==e)return;let t=I.get(e);if(!t){P="";return}if(U())return;let n=D();if(!n)return;if(!Pe(n)){let r=qt(F(n));if(r&&r!==t.text)return}let o=be();!o||C(o)||An(o)||(De=!0,he(n,t.text),clearTimeout(ro),ro=setTimeout(()=>Gf(e,t.text),Df))}function Gf(e,t){ro=void 0;try{if(!ve)return;let n=I.get(e);if(!n||n.text!==t||H()||_t()!==e)return;let o=D();if(!o)return;let r=qt(F(o));if(r&&r!==t&&!Pe(o))return;r!==t&&he(o,t);let i=be();if(!i||C(i)||An(i))return;i.click(),I.delete(e),P="",Be(),io.debug("drained",e)}finally{De=!1}}function uc(e){let t=ne();if(!t||t===document.body){e.style.left="50%",e.style.bottom="6.5rem";return}let n=t.getBoundingClientRect();e.style.left=`${Math.round(n.left+n.width/2)}px`,e.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`;let o=Math.min(512,Math.max(160,n.width-24));e.style.maxWidth=`${Math.round(o)}px`}function Yi(){$t?.remove(),$t=null}function Be(){if(!ve||!document.body){Yi();return}let e=_t(),t=I.get(e);if(!t){Yi();return}let n=$t;n?.isConnected||(n=document.createElement("div"),n.id=Xi,document.body.appendChild(n),$t=n),n.replaceChildren();let o=document.createElement("span");o.className="bloom-pq-kicker",o.textContent="Next";let r=document.createElement("span");r.className="bloom-pq-text";let i=t.text.length>ic?`${t.text.slice(0,ic)}\u2026`:t.text;r.textContent=i,r.title=t.text;let a=document.createElement("div");a.className="bloom-pq-actions";let s=document.createElement("button");s.type="button",s.className="bloom-pq-btn bloom-pq-send",s.textContent="Send now",s.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),zf()});let l=document.createElement("button");l.type="button",l.className="bloom-pq-btn bloom-pq-x",l.setAttribute("aria-label","Dismiss queued prompt"),l.textContent="\xD7",l.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),jf(e)}),a.append(s,l),n.append(o,r,a),uc(n)}function Kf(){if(!M)return;if(M.ticks-=1,I.get(M.key)&&dc()>M.turns){let t=_f();if(t&&t===M.text){io.debug("native send leaked; dropping pending"),I.delete(M.key),P===M.key&&(P=""),M=null,Be();return}}M.ticks<=0&&(M=null)}function Uf(e){if(!ve||e.isComposing||e.keyCode===229||e.key!=="Enter"||e.shiftKey||e.ctrlKey||e.metaKey||De)return;let t=ac(e.target)??ac(document.activeElement);if(!t||!H())return;if(e.altKey||J){J=!1;return}if(!oe(t))return;let n=qt(F(t));n&&(Ji(e),Zi(n))}function Vf(e){let t=e.closest("button");if(!(t instanceof HTMLElement)||C(t))return null;let n=e.closest(xt);if(n instanceof HTMLElement&&!C(n))return n;let o=be();return o&&(t===o||o.contains(t)||t.contains(o))?o:null}function Wf(e){if(!ve)return;let t=e.target;if(!(t instanceof Element)||t.closest(`#${Xi}`))return;let n=t.closest("button");if(n instanceof HTMLElement&&C(n)||De||!H()||!Vf(t))return;if(J){J=!1;return}let o=D();if(!o||!oe(o))return;let r=qt(F(o));r&&(Ji(e),Zi(r))}function Yf(e){if(!ve)return;let t=e.target;if(!(t instanceof HTMLFormElement)||!t.matches(tr)&&!t.querySelector(te)||De||!H())return;if(J){J=!1;return}let n=D()??t.querySelector(te);if(!n||!oe(n))return;let o=qt(F(n));o&&(Ji(e),Zi(o))}var mc=p({name:"PromptQueue",description:"Queue the next prompt while a reply is streaming. Enter/Send waits for this turn instead of interrupting.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:rc,cleanupSelectors:[`#${Xi}`],settings:cc,start(){ve=!0,X=_t(),P="",De=!1,J=!1,M=null,E(rc,oc),no?.abort(),no=new AbortController;let{signal:e}=no;window.addEventListener("keydown",Uf,{capture:!0,signal:e}),document.addEventListener("click",Wf,{capture:!0,signal:e}),document.addEventListener("submit",Yf,{capture:!0,signal:e}),Lr?.(),Lr=se({onFall(t){if(ve){if(t.userStopped||t.error){P="",Be();return}P=t.contextKey,lc(t.contextKey)}},onContext(t){sc(t),X=t,Be()},onTick(t){sc(t.contextKey),X=t.contextKey,Kf(),P&&P===t.contextKey&&lc(P),$t&&uc($t)}}),Be(),io.debug("watch started")},stop(){ve=!1,Lr?.(),Lr=null,no?.abort(),no=null,clearTimeout(ro),ro=void 0,clearTimeout(oo),oo=void 0,I.clear(),M=null,P="",De=!1,J=!1,Yi()}});var fc=`.bloom-cls {
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
`;var bc=new v("ChatListStatus"),pc="chatListStatus",Mr="bloom-cls",Jf="bloom-cls",Zf=1200*1e3,Qf="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",ue=new Map,Ee=!1,jt="",xe=!1,zt=0,$e=null,ta=null,Ft=null,Qi=null,kr=null,Gt=!1,Kt=new Set;function Cr(){return Date.now()}function hc(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function nt(e,t,n,o=!0){if(!(!e||!Ee)){if(t==="idle")ue.delete(e);else{let r=ue.get(e);r&&r.kind===t&&n!=="net"?r.at=Cr():ue.set(e,{kind:t,at:Cr(),source:n})}o&&ep({v:1,id:e,kind:t,at:Cr()}),ao()}}function ep(e){try{Ft?.postMessage(e)}catch{}}function tp(e){let t=e.data;!t||t.v!==1||!t.id||t.kind!=="streaming"&&t.kind!=="done"&&t.kind!=="error"&&t.kind!=="idle"||nt(t.id,t.kind,"bc",!1)}function np(){let e=Cr();for(let[t,n]of ue)n.kind==="streaming"&&e-n.at>Zf&&ue.delete(t)}function op(){let e=hc();if(!e)return[];let t=[],n=new Set;try{for(let o of e.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(o.closest(Qf))continue;let r=wt(o.getAttribute("href")||"");!r||n.has(r)||(n.add(r),t.push(o))}}catch{}return t}function gc(e){let t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),e==="streaming")t.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("cx","12"),o.setAttribute("cy","12"),o.setAttribute("r","9"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","2"),t.appendChild(o)}return t.appendChild(n),t}function ea(e){let t=e.querySelector(`:scope > .${Mr}`);return t||null}function rp(){if(!Ee)return;np();let e=L(),t=op();$e?.disconnect();try{for(let n of t){let o=wt(n.getAttribute("href")||"");if(!o||!e||o!==e){ea(n)?.remove();continue}let i=ue.get(o)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){ea(n)?.remove();continue}let a=ea(n);a||(a=document.createElement("span"),a.className=Mr,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(gc("streaming")):i==="error"&&a.appendChild(gc("error")))}}catch(n){bc.debug("paint failed",n)}yc()}function ao(){!Ee||zt||(zt=requestAnimationFrame(()=>{zt=0,Ee&&rp()}))}function yc(){let e=hc();if(!($e&&ta===e&&e?.isConnected)){if($e?.disconnect(),ta=e,!e){$e=null;return}$e=new MutationObserver(()=>ao()),$e.observe(e,{childList:!0,subtree:!0})}}function na(){return!!(Ve()||_n())}function ip(e){return!!(Gt||e&&Kt.has(e)||na())}function ap(e){if(Ee){if(e.type==="post-start"){e.conversationId?(Gt=!1,Kt.add(e.conversationId),xe=!0,nt(e.conversationId,"streaming","net")):(Gt=!0,xe=!0);return}e.type==="post-end"&&(Gt=!1,e.conversationId&&(Kt.delete(e.conversationId),nt(e.conversationId,e.error?"error":"done","net")),na()||(xe=!1))}}function sp(){if(!Ee)return;let e=L();if(!(Gt||e&&Kt.has(e))){if(xe=!1,e&&ue.get(e)?.kind==="streaming"&&ue.get(e)?.source==="local"){nt(e,"idle","local");return}ao()}}function lp(e){if(!Ee)return;let t=e.conversationId||L();if(jt&&t&&jt!==t){let o=ue.get(jt);o?.kind==="streaming"&&o.source==="local"&&nt(jt,U()?"error":"done","local"),xe=!!(t&&Kt.has(t))}if(jt=t,ip(t)&&(e.streaming||na())){xe=!0,t&&nt(t,"streaming","local"),ao();return}xe&&(xe=!1,t&&nt(t,U()?"error":"done","local")),ao()}var vc=p({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Mr}`],start(){Ee=!0,E(pc,fc);try{Ft=new BroadcastChannel(Jf)}catch{Ft=null}Ft?.addEventListener("message",tp),Qi=z(ap),kr?.(),kr=se({onTick:lp,onContext:sp}),yc(),bc.debug("sidebar status watch started")},stop(){Ee=!1,zt&&cancelAnimationFrame(zt),zt=0,$e?.disconnect(),$e=null,ta=null,kr?.(),kr=null,Qi?.(),Qi=null;try{Ft?.close()}catch{}Ft=null,ue.clear(),Kt.clear(),Gt=!1,xe=!1,jt="",document.querySelectorAll(`.${Mr}`).forEach(e=>e.remove()),y(pc)}});var Ec="widerChat",wc=40,Sc=96,Tc=64,Lc=x({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:wc,max:Sc,default:Tc}});function cp(){return pe(Number(Lc.store.width??Tc),wc,Sc)}function xc(){let e=cp(),t=`min(100%,${e}rem)`;E(Ec,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important;--user-chat-width:${e}rem!important;--composer-container-max-width:${e}rem!important;--thread-xl-max-width:${e}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${t}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${t}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${t}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${t}!important}`)}var kc=p({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[h.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Lc,start:xc,onSettingsChange:xc,stop(){y(Ec)}});var oa="composerOpacity",Ut='form[data-type="unified-composer"],form.w-full[data-type]',dp=[`${Ut} [class*="corner-superellipse"]`,`${Ut} [class*="bg-token-bg-primary"]`,`${Ut} [class*="bg-token-main-surface"]`].join(","),up=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),mp="#thread-bottom-container,#thread-bottom",fp=`${Ut} #prompt-textarea,${Ut} [contenteditable="true"]`,pp="var(--bg-primary,var(--main-surface-primary,#ffffff))",ra=x({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function gp(){return pe(Number(ra.store.opacity??100),0,100)}function bp(){return pe(Number(ra.store.blur??16),0,40)}function Cc(){let e=gp();if(e>=100){y(oa);return}let t=bp(),n=`color-mix(in srgb,${pp} ${e}%,transparent)`,o=t>0?`-webkit-backdrop-filter:blur(${t}px)!important;backdrop-filter:blur(${t}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";E(oa,`${mp}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${up}{display:none!important}${Ut}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${dp}{background-color:${n}!important;background-image:none!important;${o}}${fp}{background-color:transparent!important;background-image:none!important}`)}var Mc=p({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[h.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:ra,start:Cc,onSettingsChange:Cc,stop(){y(oa)}});var Ac=`#bloom-bn-host {
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
`;var yp=new v("BetterNavigator"),ia="betterNavigator",Hc="bloom-bn-host",la=60,vp=16,xp=1e3,Ep=2.5,wp=.4,Hr="\u6B63\u5728\u8F93\u51FA\u2026",Sp=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),Tp=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='thinking']","[class*='reasoning']","[class*='footnote']",".sr-only"].join(", "),Lp=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),Or=x({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),Vt=new Map,Wt=new Set,me=!1,it=!1,_e=null,mo=null,at=null,Nr=null,O=[],st="",Rr=0,Pr=-1,fa=0,Ir="",Yt=0,Xt=0,so,lo=null,Ar=null,aa=null,sa=null,ot=null,ca=null,co=null,rt=null,Jt=null,uo=null;function Br(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function kp(e){try{return!!e.closest(Sp)}catch{return!0}}function Cp(e){let t=(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||e.getAttribute("data-turn")||"").toLowerCase();if(t==="user"||t==="assistant")return t;let n=(e.getAttribute("aria-label")||"").toLowerCase();return n.includes("you said")?"user":n.includes("chatgpt said")||n.includes("assistant said")?"assistant":null}function Nc(e){let t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode(r){let i=r.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(i.closest(Tp))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return(r.textContent||"").replace(/\s+/g," ").trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),o;for(;(o=n.nextNode())&&t.join(" ").length<la+20;)t.push((o.textContent||"").replace(/\s+/g," ").trim());return t.join(" ").replace(/\s+/g," ").trim()}function Mp(e,t){try{if(e.querySelector("img, picture, video, canvas"))return"Image";if(e.querySelector("a[download], [class*='attachment']"))return"File";if(e.querySelector("pre, code"))return"Code"}catch{}return`Message ${t+1}`}function Ap(e,t){let n=t==="user"?e.querySelector(".whitespace-pre-wrap")??e:e.querySelector(".markdown")??e;return Nc(n)}function Hp(e){return e.length>la?`${e.slice(0,la).trimEnd()}\u2026`:e}function Np(e,t,n,o){let r=Ap(e,t);return r?Hp(r):o?Hr:Mp(e,n)}function Rp(){if(it)return!0;let e=L();return!!(e&&Wt.has(e)||Ve()||_n())}function Pp(e){try{if(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")||e.querySelector("[aria-busy='true'], .result-streaming"))return!0;let t=e.querySelector(".markdown");if((!t||t instanceof HTMLElement&&!Nc(t))&&e.querySelector("[class*='thinking'], [class*='reasoning'], details"))return!0}catch{}return!1}function Ip(){let e=Br();if(!e||e===document.body)return[];let t=Or.store.showAssistant!==!1,n=t&&Rp(),o=[];try{for(let r of e.querySelectorAll("[data-message-id]")){if(kp(r))continue;let i=r.getAttribute("data-message-id")||"";if(!i)continue;let a=Cp(r);if(a!=="user"&&a!=="assistant"||a==="assistant"&&!t)continue;let s=a==="assistant"&&n&&Pp(r),l=Np(r,a,o.length,s);l&&l!==Hr&&l!==Vt.get(i)&&Vt.set(i,l);let c=s&&l===Hr?Hr:Vt.get(i)||l;o.push({id:i,el:r,role:a,text:c,live:s})}}catch{}return o}function Op(){let t=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(t,48),88)}function Rc(e){let t=e;for(;t&&t!==document.body&&t!==document.documentElement;){let o=getComputedStyle(t).overflowY;if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight+8)return t;t=t.parentElement}return window}function Bp(e){return e===window?window.innerHeight:e.clientHeight}function Dp(e){let t=e instanceof Element?e:e instanceof Node?e.parentElement:null;if(!t)return!1;try{return!!t.closest(Lp)}catch{return!1}}function Pc(){so!==void 0&&(clearTimeout(so),so=void 0),lo?.classList.remove("bloom-bn-flash"),lo=null}function $p(e){Pc(),e.classList.add("bloom-bn-flash"),lo=e,so=setTimeout(()=>{e.classList.remove("bloom-bn-flash"),lo===e&&(lo=null),so=void 0},800)}function da(e){if(!O.length)return;let t=Math.max(0,Math.min(e,O.length-1));Rr=t,mo?.querySelectorAll(".bloom-bn-tick").forEach((o,r)=>{o.classList.toggle("bloom-bn-current",r===t)}),at?.querySelectorAll(".bloom-bn-item").forEach((o,r)=>{o.classList.toggle("bloom-bn-active",r===t)}),Nr&&(Nr.textContent=`${t+1} / ${O.length}`);let n=at?.children[t];if(n instanceof HTMLElement){let o=at;if(o){let r=n.offsetTop-o.clientHeight/2+n.offsetHeight/2;o.scrollTop=Math.max(0,r)}}}function ua(e){let t=O[e];if(!t?.el.isConnected)return;Pr=e,fa=Date.now()+xp,da(e);let n=Jt??Rc(t.el),r=Math.abs(t.el.getBoundingClientRect().top-Op())>Ep*Bp(n);t.el.scrollIntoView({behavior:r?"auto":"smooth",block:"start"}),Or.store.jumpEffect!=="none"&&$p(t.el)}function pa(){if(!me||!O.length)return;if(Date.now()<fa&&Pr>=0){da(Pr);return}let e=window.innerHeight*wp,t=0;for(let n=0;n<O.length;n++){let o=O[n].el;o.isConnected&&o.getBoundingClientRect().top<=e&&(t=n)}da(t)}function _p(e){let t=Rc(e);if(Jt===t&&uo)return;uo?.(),Jt=t;let n=t===window?document:t,o=()=>{pa(),ga()};n.addEventListener("scroll",o,{passive:!0}),uo=()=>n.removeEventListener("scroll",o)}function qp(e){rt?.disconnect(),rt=null;let t=Jt instanceof HTMLElement?Jt:null;rt=new IntersectionObserver(()=>pa(),{root:t,threshold:[0,.15,.4,.75,1]});for(let n of e)n.el.isConnected&&rt.observe(n.el)}function jp(){if(!document.body)return null;let e=_e;if(e?.isConnected)return e;e=document.createElement("div"),e.id=Hc,e.className="bloom-bn-host",e.setAttribute("role","navigation"),e.setAttribute("aria-label","Conversation outline"),e.hidden=!0;let t=document.createElement("div");t.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let o=document.createElement("div");o.className="bloom-bn-card";let r=document.createElement("div");r.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",o.append(r,i),n.appendChild(o),e.append(t,n),document.body.appendChild(e),_e=e,mo=t,at=i,Nr=r,e}function Ic(){let e=_e,t=Br();if(!e||!t||!t.isConnected||O.length<1){e&&(e.hidden=!0);return}let n=t.getBoundingClientRect(),o=document.getElementById("thread-bottom-container"),r=document.getElementById("page-header"),i=Math.max(n.top+8,r?.getBoundingClientRect().bottom??0,8),a=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),s=a-i;if(s<96||n.width<160){e.hidden=!0;return}let l=window.innerWidth-n.right,c=l>=22?Math.max(8,l-16):8;e.hidden=!1,e.style.top=`${Math.round((i+a)/2)}px`,e.style.height="auto",e.style.maxHeight=`${Math.round(s)}px`,e.style.right=`${Math.round(c)}px`,e.style.setProperty("--bloom-bn-cap",`${Math.round(s)}px`)}function ga(){!me||Xt||(Xt=requestAnimationFrame(()=>{Xt=0,me&&Ic()}))}function Fp(e){let t=["bloom-bn-tick"];return e.role==="assistant"&&t.push("bloom-bn-tick-asst"),e.live&&t.push("bloom-bn-tick-live"),t.join(" ")}function zp(e){let t=mo,n=at;!t||!n||(t.replaceChildren(),n.replaceChildren(),t.classList.toggle("bloom-bn-dense",e.length>vp),e.forEach((o,r)=>{let i=document.createElement("button");i.type="button",i.className=Fp(o),i.setAttribute("aria-label",`Go to message ${r+1} of ${e.length}`),i.addEventListener("click",c=>{c.preventDefault(),ua(r)}),t.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${o.role}`;let s=document.createElement("span");s.className="bloom-bn-mark",s.textContent=o.role==="user"?"You":"GPT";let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=o.text,l.title=o.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),ua(r)}),n.appendChild(a)}))}function Gp(e){mo?.querySelectorAll(".bloom-bn-tick").forEach((t,n)=>{t.classList.toggle("bloom-bn-tick-live",!!e[n]?.live)}),e.forEach((t,n)=>{let r=at?.children[n]?.querySelector(".bloom-bn-label");r&&r.textContent!==t.text&&(r.textContent=t.text,r instanceof HTMLElement&&(r.title=t.text))})}function Kp(){let e=L();return e===Ir?!1:(Ir=e,Vt.clear(),O=[],st="",Rr=0,Pr=-1,fa=0,it&&e&&(Wt.add(e),it=!1),!0)}function Up(e){let t=Or.store.showAssistant!==!1?"1":"0";return`${Ir}|${t}|${e.map(n=>n.id).join(",")}`}function Vp(){if(!me)return;Kp();let e=Ip(),t=Br();if(!t||e.length<1){O=e,st="",_e&&(_e.hidden=!0),rt?.disconnect(),ma();return}jp();let n=Up(e);n!==st?(O=e,st=n,zp(e),_p(t),qp(e)):(O=e,Gp(e)),Ic(),pa(),ma()}function we(){!me||Yt||(Yt=requestAnimationFrame(()=>{Yt=0,me&&Vp()}))}function ma(){let e=Br();if(!(ot&&ca===e&&e?.isConnected)){if(ot?.disconnect(),co?.disconnect(),ca=e,!e||e===document.body){ot=null;return}ot=new MutationObserver(()=>we()),ot.observe(e,{childList:!0,subtree:!0}),co=new ResizeObserver(()=>ga()),co.observe(e)}}function Wp(e){if(me){if(e.type==="post-start"){e.conversationId?(it=!1,Wt.add(e.conversationId)):it=!0,we();return}if(e.type==="post-end"){if(it=!1,e.conversationId)Wt.delete(e.conversationId);else{let t=L();t&&Wt.delete(t)}we()}}}function Yp(e){if(!me||!O.length||_e?.hidden||e.altKey||e.ctrlKey||e.metaKey||Dp(e.target))return;let t=-1;if(e.key==="ArrowDown")t=Rr+1;else if(e.key==="ArrowUp")t=Rr-1;else if(e.key==="Home")t=0;else if(e.key==="End")t=O.length-1;else if(e.key==="Escape"){document.activeElement?.blur?.();return}else return;e.preventDefault(),ua(Math.max(0,Math.min(t,O.length-1)))}function Xp(){Pc(),rt?.disconnect(),rt=null,ot?.disconnect(),ot=null,ca=null,co?.disconnect(),co=null,uo?.(),uo=null,Jt=null,_e?.remove(),_e=null,mo=null,at=null,Nr=null}var Oc=p({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:ia,cleanupSelectors:[`#${Hc}`],settings:Or,start(){me=!0,Ir=L(),E(ia,Ac),Ar=new AbortController;let{signal:e}=Ar;window.addEventListener("keydown",Yp,{signal:e}),window.addEventListener("popstate",we,{signal:e}),window.visualViewport?.addEventListener("resize",ga,{signal:e}),sa=z(Wp),aa=se({onTick(){we()},onFall(){we()},onContext(){Vt.clear(),st="",we()}}),ma(),we(),yp.debug("navigator started")},stop(){me=!1,Yt&&cancelAnimationFrame(Yt),Yt=0,Xt&&cancelAnimationFrame(Xt),Xt=0,Ar?.abort(),Ar=null,aa?.(),aa=null,sa?.(),sa=null,Wt.clear(),it=!1,Xp(),Vt.clear(),O=[],st="",y(ia)},onSettingsChange(){st="",we()}});var Bc=`.bloom-ts {
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
`;function Dc(e,t,n=Date.now()){let o=new Date(e);if(Number.isNaN(o.getTime()))return"";let r=new Date(n),i=o.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(o.toDateString()===r.toDateString()||!t)return i;let s=o.getFullYear()===r.getFullYear();return`${o.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function $c(e){try{return new Date(e).toISOString()}catch{return""}}var Fc=new v("MessageTimestamps"),_c="messageTimestamps",Dr="bloom-ts",qc=1500,Zp="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",en=x({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),tn=new Map,nn=!1,Qt=0,Zt,qe=null,ha=null,ba=null,jc=!1;function zc(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function ya(){let e=en.plain.stamps;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Gc(){let e={...ya()};for(let[n,o]of tn)e[n]=o;let t=Object.keys(e);if(t.length>qc){let n=t.slice(t.length-qc),o={};for(let r of n)o[r]=e[r];en.store.stamps=o;return}en.store.stamps=e}var Qp=_a(Gc,500);function Kc(e,t){!e||!t||tn.get(e)===t||(tn.set(e,t),Qp(),fo())}function eg(e){return e?tn.get(e)??ya()[e]??sr(e)??null:null}function tg(e){nn&&e.type==="message-time"&&Kc(e.messageId,e.createTime)}function ng(e){return(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function og(){let e=zc();if(!e)return[];let t=[];try{for(let n of e.querySelectorAll("[data-message-id]"))n.closest(Zp)||t.push(n)}catch{}return t}function rg(e){try{return!!e.querySelector("time:not(.bloom-ts)")}catch{return!1}}function ig(){if(!nn)return;let e=en.store.hideOwnMessages===!0,t=en.store.showDate!==!1,n=H(),o=og();qe?.disconnect();try{o.forEach((r,i)=>{let a=r.getAttribute("data-message-id")||"",s=ng(r),l=r.querySelector(`:scope > .${Dr}`);if(e&&s==="user"){l?.remove();return}if(rg(r)){l?.remove();return}let c=eg(a);if(!c&&a&&(n||jc)&&i>=o.length-2&&(c=Date.now(),Kc(a,c)),!c){l?.remove();return}let d=Dc(c,t);if(!d){l?.remove();return}let u=l;u||(u=document.createElement("time"),u.className=Dr,u.setAttribute("aria-hidden","true"),r.insertBefore(u,r.firstChild)),u.textContent!==d&&(u.textContent=d);let m=$c(c);m&&u.getAttribute("datetime")!==m&&u.setAttribute("datetime",m)})}catch(r){Fc.debug("paint failed",r)}jc=n,Uc()}function fo(){!nn||Qt||(Qt=requestAnimationFrame(()=>{Qt=0,nn&&ig()}))}function Uc(){let e=zc();if(!(qe&&ha===e&&e?.isConnected)){if(qe?.disconnect(),ha=e,!e||e===document.body){qe=null;return}qe=new MutationObserver(()=>fo()),qe.observe(e,{childList:!0,subtree:!0})}}var Vc=p({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Dr}`],settings:en,start(){nn=!0,E(_c,Bc);let e=ya();for(let[t,n]of Object.entries(e))typeof n=="number"&&n>0&&tn.set(t,n);ba=z(tg),Uc(),Zt!==void 0&&clearInterval(Zt),Zt=setInterval(fo,800),fo(),Fc.debug("timestamp watch started")},stop(){nn=!1,Qt&&cancelAnimationFrame(Qt),Qt=0,Zt!==void 0&&(clearInterval(Zt),Zt=void 0),qe?.disconnect(),qe=null,ha=null,ba?.(),ba=null,Gc(),tn.clear(),document.querySelectorAll(`.${Dr}`).forEach(e=>e.remove()),y(_c)},onSettingsChange:fo});var va="streamerMode",ag="filter:blur(6px)!important;transition:filter .2s ease",sg="filter:none!important",po=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],on=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function Z(e,t){return e.map(n=>`${n} ${t}`)}var lt=x({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function rn(e,t=!0){let n=e.join(","),o=e.map(r=>`${r}:hover`).join(",");return`${n}{${ag}}${t?`${o}{${sg}}`:""}`}function Wc(){let e=[];if(lt.store.conversations!==!1&&(e.push(rn([...Z(on,'a[href^="/c/"]'),...Z(on,'a[href*="/c/"]')])),e.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),lt.store.projects!==!1&&(e.push(rn([...Z(on,'a[href*="/project"]'),...Z(on,'a[href*="/g/g-p-"]'),...Z(on,'[data-testid="project-name"]'),...Z(on,'[data-testid="project-link"]')])),e.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),lt.store.headerTitle!==!1&&e.push(rn(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),lt.store.accountAvatar!==!1&&e.push(rn([...Z(po,"img"),...Z(po,'[class*="avatar"]')],!1)),lt.store.accountName!==!1&&e.push(rn([...Z(po,".min-w-0 > .truncate"),...Z(po,".min-w-0.flex-1 .truncate")],!1)),lt.store.accountEmail!==!1&&e.push(rn([...Z(po,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),e.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),e.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!e.length){y(va);return}E(va,e.join(`
`))}var Yc=p({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[h.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:lt,start:Wc,onSettingsChange:Wc,stop(){y(va)}});var Xc=`.bloom-gc-panel {
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
}`;var cg=new v("GreetingCustomizer"),an="greetingCustomizer",Jc="greetingCustomizerUi",go=100,Ea=30,dg=120,ug=1e3,mg=50,fg=40,pg=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),bo=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),Fr=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function gg(e){return!!e?.closest(pg)}function td(e){return!!(gg(e)||e.closest('[data-testid="temporary-chat-label"]')||e.closest("[hidden]")||e.getAttribute("aria-hidden")==="true"||e.classList.contains("sr-only"))}function So(e){try{for(let t of document.querySelectorAll(e))if(!td(t))return t}catch{}return null}function xa(e){for(let t of e.split(",").map(n=>n.trim()).filter(Boolean))if(So(t))return t;return e}var nd=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],B=x({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:Ng},greetings:{type:0,description:"Greeting texts",hidden:!0,default:nd},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),fe=!1,cn=!1,dt=null,_r,ho,sn,yo,qr=0,$r=null,ln=null,vo=null,xo=null,Eo=null,jr=null;function Te(){let e=location.pathname||"/";return e==="/"||e===""}function ct(){let e=B.plain.greetings;return Array.isArray(e)?e.filter(t=>typeof t=="string"):nd.slice()}function wo(e){return String(e??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function Zc(e){B.store.greetings=e.slice(0,Ea)}function To(){let e=String(B.store.mode??"refresh");return e==="interval"||e==="manual"?e:"refresh"}function bg(){return B.store.order==="random"?"random":"sequential"}function hg(){return pe(Number(B.store.intervalSec??10),1,3600)*1e3}function yg(e){return String(e??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function vg(){return!!So(Fr)}function zr(){return!!(So(Fr)||So(bo))}function xg(e,t){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),o=[`content:"${e}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),r=vg()?xa(Fr):So(bo)?xa(bo):xa(Fr),i=t?`${bo}{cursor:pointer!important;user-select:none!important}`:"";return[`${r}{${n}}`,`${r}::before{${o}}`,i,`@media (max-width:768px){${r}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function Eg(e,t){if(e<=0)return 0;if(e===1)return Number(B.plain.index)!==0&&(B.store.index=0),Number(B.plain.lastRandom)!==0&&(B.store.lastRandom=0),0;let n=Number(B.plain.index),o=Number(B.plain.lastRandom);if(!t)return n>=0&&n<e?n:0;if(bg()==="random"){let a=n>=0&&n<e?n:o,s=Math.floor(Math.random()*e),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*e);return B.store.index=s,B.store.lastRandom=s,s}let i=((n>=-1&&n<e?n:-1)+1)%e;return B.store.index=i,i}function Se(e){if(!fe)return;if(!Te()){y(an);return}let t=ct().map(wo).filter(Boolean);if(!t.length){y(an);return}let n=Eg(t.length,e),o=t[n]??t[0],r=To()==="manual"&&t.length>1;E(an,xg(yg(o),r)),jr?.()}function wa(){_r!==void 0&&(clearInterval(_r),_r=void 0)}function Sa(){wa(),!(!fe||!Te())&&To()==="interval"&&(ct().filter(Boolean).length<=1||(_r=setInterval(()=>Se(!0),hg())))}function Ta(){yo!==void 0&&(clearTimeout(yo),yo=void 0),qr=0}function Qc(){if(Ta(),!fe||!Te())return;qr=fg;let e=()=>{if(yo=void 0,!(!fe||!Te())){if(zr()){To()==="refresh"&&!cn?(cn=!0,Se(!0)):Se(!1),Sa();return}qr-=1,qr>0&&(yo=setTimeout(e,mg))}};e()}function La(){if(dt===!0){zr()?Se(!1):Qc();return}dt=!0,cn=!1,To()==="refresh"?(cn=!0,Se(!0)):Se(!1),Sa(),zr()||Qc()}function ka(){dt=!1,cn=!1,wa(),Ta(),y(an)}function Gr(){sn===void 0&&(sn=window.setTimeout(()=>{sn=void 0,fe&&(Te()?La():dt!==!1&&ka())},dg))}function wg(){ln||(ln=history.pushState.bind(history),vo=history.replaceState.bind(history),xo=function(...t){let n=ln(...t);return Gr(),n},Eo=function(...t){let n=vo(...t);return Gr(),n},history.pushState=xo,history.replaceState=Eo)}function Sg(){xo&&history.pushState===xo&&ln&&(history.pushState=ln),Eo&&history.replaceState===Eo&&vo&&(history.replaceState=vo),ln=null,vo=null,xo=null,Eo=null}function Tg(e){let t=e.target instanceof Element?e.target:null;t&&t.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(Gr)}function Lg(e){if(!fe||!Te()||To()!=="manual"||ct().filter(Boolean).length<=1)return;let t=e.target instanceof Element?e.target:null;if(!t)return;let n=t.closest(bo);if(!n||td(n))return;let o=window.getSelection?.();o&&String(o).trim()||Se(!0)}function kg(){ho===void 0&&(ho=setInterval(()=>{if(!fe)return;let e=Te();if(e!==(dt===!0)){e?La():ka();return}e&&zr()&&Se(!1)},ug))}function Cg(){ho!==void 0&&(clearInterval(ho),ho=void 0)}function ed(e,t){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=e,n.setAttribute("aria-label",e);let o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.75"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),o.setAttribute("aria-hidden","true");for(let r of t.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",r),o.appendChild(i)}return n.appendChild(o),n}var Mg="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",Ag="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function Hg(e,t){let n=wo(e);return n?n.length>go?`Keep it to ${go} characters.`:ct().length+(t?1:0)>Ea?`At most ${Ea} greetings.`:null:"Enter a greeting."}function Ng(e){e.className="bloom-gc-panel";let t="",n=-1,o="",r=-1,i=()=>{let a=ct(),s=Number(B.plain.index);e.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=go,c.placeholder="New greeting (line breaks ok)",c.value=t,c.addEventListener("input",()=>{t=c.value,o="";let f=l.querySelector(".bloom-gc-count");f&&(f.textContent=`${wo(t).length}/${go}`);let T=l.querySelector(".bloom-gc-error");T&&(T.textContent="")}),l.appendChild(c);let d=document.createElement("div");d.className="bloom-gc-meta";let u=document.createElement("span");u.className="bloom-gc-count",u.textContent=`${wo(t).length}/${go}`;let m=document.createElement("span");m.className="bloom-gc-error",m.textContent=o;let S=document.createElement("div");if(S.className="bloom-gc-actions",n>=0){let f=document.createElement("button");f.type="button",f.className="bloom-gc-btn",f.textContent="Cancel",f.addEventListener("click",()=>{n=-1,t="",o="",i()}),S.appendChild(f)}let w=document.createElement("button");if(w.type="button",w.className="bloom-gc-btn bloom-gc-btn-primary",w.textContent=n>=0?"Update":"Add",w.addEventListener("click",()=>{let f=n<0,T=Hg(t,f);if(T){o=T,i();return}let $=wo(t),j=ct().slice();n>=0&&n<j.length?j[n]=$:j.push($),Zc(j),n=-1,t="",o="",i()}),S.appendChild(w),d.append(u,m,S),l.appendChild(d),e.appendChild(l),!a.length){let f=document.createElement("p");f.className="bloom-gc-empty",f.textContent="No greetings. The official heading stays.",e.appendChild(f);return}let g=document.createElement("div");g.className="bloom-gc-list",a.forEach((f,T)=>{let $=document.createElement("div");$.className="bloom-gc-item",T===s&&($.dataset.active="true");let j=document.createElement("button");j.type="button",j.className=`bloom-gc-body${r===T?"":" bloom-gc-clamp"}`,j.textContent=f,j.addEventListener("click",()=>{r=r===T?-1:T,i()});let dn=document.createElement("div");dn.className="bloom-gc-item-actions";let ut=ed("Edit",Mg);ut.addEventListener("click",()=>{n=T,t=f,o="",i()});let Le=ed("Delete",Ag);Le.addEventListener("click",()=>{let un=ct().filter((mt,je)=>je!==T);Zc(un),n===T?(n=-1,t=""):n>T&&(n-=1),i()}),dn.append(ut,Le),$.append(j,dn),g.appendChild($)}),e.appendChild(g)};return jr=i,i(),()=>{jr===i&&(jr=null),e.replaceChildren()}}var od=p({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[h.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Jc,settings:B,start(){fe=!0,E(Jc,Xc),wg(),$r=new AbortController;let{signal:e}=$r;window.addEventListener("popstate",Gr,{signal:e}),document.addEventListener("click",Tg,{capture:!0,signal:e}),document.addEventListener("click",Lg,{signal:e}),kg(),dt=null,Te()?La():ka(),cg.debug("started")},stop(){fe=!1,$r?.abort(),$r=null,sn!==void 0&&(clearTimeout(sn),sn=void 0),wa(),Ta(),Cg(),Sg(),y(an),cn=!1,dt=null},onSettingsChange(){fe&&(Te()?(Se(!1),Sa()):y(an))}});var Lo=new v("Bloom"),rd=!1,Rg=Date.now(),Pg=[Rs,bl,Ll,Ml,Pl,$l,Jl,Ql,nc,mc,vc,kc,Mc,Oc,Vc,Yc,od];function Kr(e){return new Promise(t=>setTimeout(t,e))}function Ig(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var ad=8e3,id=300,Og=250;async function Bg(){if(ze())return await Kr(id),!0;for(;Date.now()-Rg<ad;)if(await Kr(Og),ze())return await Kr(id),!0;return ze()||Jr()}function Ca(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function Dg(){if(Ca())return!0;let e=Date.now()+ad;for(;Date.now()<e;)if(await Kr(100),Ca())return!0;return Ca()}function $g(){try{GM_registerMenuCommand?.("Bloom++ settings",Ns)}catch{}}function _g(){Oo(()=>{pn("HostShell"),Lo.info("host shell",G)}),Bo(()=>{Lo.info("idle ready",G)}),Do(()=>{Na(),pn("HostReady"),Lo.info("chrome ready",G)})}async function Ma(){await qa()}async function Aa(){if(rd)return;rd=!0;for(let n of Pg)try{Ya(n)}catch(o){Lo.error("register failed",n.name,o)}Za(),pn("Init"),$g(),_g();let e=()=>pn("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await Ig(),Dg().then(n=>{n&&$o()}),!await Bg()){Lo.warn("late islands not detected; starting default plugins",G),gt(),_o();return}await rs()}var sd=typeof unsafeWindow<"u"?unsafeWindow:window,qg=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||qg){let e=sd.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",G);try{Object.defineProperty(sd,"Bloom",{value:Ha,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}Ma().then(()=>Aa()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
