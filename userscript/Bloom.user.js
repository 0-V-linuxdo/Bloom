// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260920] v1.4.55
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

/* Bloom++ [20260920] v1.4.55. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var xd=Object.defineProperty;var Ed=(e,t)=>{for(var n in t)xd(e,n,{get:t[n],enumerable:!0})};var Pa={};Ed(Pa,{REPO_URL:()=>ss,Settings:()=>b,VERSION:()=>j,contextKeyFromUrl:()=>we,conversationTitle:()=>Rt,conversationToken:()=>G,currentConversationId:()=>L,hasDraftText:()=>Z,hasErrorToast:()=>Q,hasLateIslands:()=>Xe,init:()=>Na,initSettings:()=>Ha,isDocumentInteractive:()=>ls,isStreaming:()=>H,isUserDraftEmpty:()=>De,messageCreateTime:()=>cr,plugins:()=>ae,requestChromeReady:()=>Fo,requestIdleReady:()=>Lt,requestShellReady:()=>qo,setEditorText:()=>Ee,subscribeHarvest:()=>K,watchStreamingEdge:()=>U,whenChromeReady:()=>_o,whenIdleReady:()=>$o,whenShellReady:()=>Do});var He=new Map,Mo=!1;function wd(){return document.getElementById("bloom-root")?.shadowRoot??null}function Ra(){return document.head??null}function St(){let e=wd();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=Sd()}function Wr(e,t){if(!Mo)return;let n=Ra();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),St();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,St();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,St()}function E(e,t){let n=He.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},He.set(e,n)),Mo&&Wr(e,n)}function Yr(){if(!Ra())return!1;Mo=!0;for(let[t,n]of He)Wr(t,n);return St(),!0}function Ia(e){let t=He.get(e);t&&(t.disabled=!1,Mo&&Wr(e,t))}function Oa(e){let t=He.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),St())}function y(e){let t=He.get(e);t&&(t.el?.remove(),He.delete(e),St())}function Sd(){return Array.from(He.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var v=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function p(e){return e}var Xr=new Map;function Ao(e,t){let n=Xr.get(e);return n||(n=new Set,Xr.set(e,n)),n.add(t),()=>n.delete(t)}function Ye(e,t){let n=Xr.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var Td="bloompp";function Ba(){return new Promise((e,t)=>{let n=indexedDB.open(Td,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function Da(e){try{let t=await Ba();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function $a(e,t){try{let n=await Ba();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function xn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function ve(e,t,n){return Math.min(n,Math.max(t,e))}function _a(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function qa(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}function Fa(e,t){let n;return((...o)=>{n&&clearTimeout(n),n=setTimeout(()=>e(...o),t)})}var Ho=new v("SettingsStore"),Ne="BloomSettings",Ld=100;function Po(e){if(xn(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(xn(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return xn(n)?n:null}return null}catch{return null}}var No=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,d]of this.defaultGetters)if(l.startsWith(c)){let u=l.slice(c.length+1);if(u&&!u.includes(".")){let m=d(u);m!==void 0&&(i[a]=m,s=m);break}}}return xn(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Ho.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Ld))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(Ne,this.plain)}catch{try{GM_setValue(Ne,t)}catch(n){Ho.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(Ne,t)}catch{}$a(Ne,t).catch(n=>Ho.warn("Failed to save settings to IndexedDB:",n))}catch(t){Ho.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){_a(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var kd=new v("Settings"),Cd={plugins:{}},b=new No(structuredClone(Cd)),Md=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function Ad(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function x(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(b.store.plugins[n]||(b.store.plugins[n]={}),b.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?b.plain.plugins[n]??{}:{}}};return t}function Hd(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function ja(){let e=null;if(e=Po(Hd(Ne)),e||(e=Po(await Da(Ne))),!e)try{e=Po(localStorage.getItem(Ne))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(b.plain.plugins=t),kd.debug("Loaded settings")}}function za(e,t){t&&(t.pluginName=e,b.plain.plugins[e]||(b.plain.plugins[e]={}),b.setDefaultGetter(Md(e),n=>{if(n!=="enabled")return Ad(t.def,n)}))}function Ga(){return b.plain.plugins.Settings||(b.store.plugins.Settings={}),b.store.plugins.Settings}function Ro(){return Ga().pinnedPlugins??[]}function Ka(e){return Ro().includes(e)}function Ua(e){let t=Ro(),n=t.includes(e);return b.store.plugins.Settings={...b.plain.plugins.Settings,pinnedPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}function Io(){return Ga().starredPlugins??[]}function Va(e){return Io().includes(e)}function Wa(e){let t=Io(),n=t.includes(e);return b.store.plugins.Settings={...b.plain.plugins.Settings,starredPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}var Oo=new v("PluginManager"),ae={},En=new Set;function Ja(e){if(ae[e.name]){Oo.warn("Duplicate plugin",e.name);return}ae[e.name]=e,za(e.name,e.settings)}function Tt(e){let t=ae[e];if(!t)return!1;if(t.required)return!0;let n=b.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function Za(e){let t=ae[e];if(!t||t.required)return;let n=!Tt(e);b.plain.plugins[e]||(b.store.plugins[e]={}),b.store.plugins[e].enabled=n,n?Qa(t):Nd(t),Ye("pluginToggle",{name:e,enabled:n})}function Qa(e,t=!1){if(!En.has(e.name)&&Tt(e.name))try{e.managedStyle&&Ia(e.managedStyle),e.start?.(),En.add(e.name),e.settings&&b.addPrefixChangeListener(`plugins.${e.name}.`,()=>{En.has(e.name)&&e.onSettingsChange?.()}),t||Oo.debug("Started",e.name)}catch(n){Oo.error("Failed to start",e.name,n)}}function Nd(e){if(En.has(e.name)){try{e.stop?.()}catch(t){Oo.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(Oa(e.managedStyle),y(e.managedStyle)),En.delete(e.name)}}function wn(e){for(let t of Object.values(ae))(t.startAt??"DOMContentLoaded")===e&&Qa(t)}var Ya=2,Xa="defaultsRev";function es(){for(let t of Object.values(ae))b.plain.plugins[t.name]||(b.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=b.store.plugins.Settings??(b.store.plugins.Settings={});if(e[Xa]!==Ya){for(let t of["NoShareLink","NoDictation"]){let n=b.store.plugins[t]??(b.store.plugins[t]={});n.enabled=!1}e[Xa]=Ya}}var Sn=!1,Bo=!1,Jr=!1,ns=[],os=[],rs=[];function Zr(e){let t=e.splice(0);for(let n of t)n()}function Tn(){Sn||(Sn=!0,Zr(ns))}function Qr(){Bo||(Bo=!0,Sn||Tn(),Zr(os))}function is(){Jr||(Jr=!0,Sn||Tn(),Bo||Qr(),Zr(rs))}function Do(e){Sn?e():ns.push(e)}function $o(e){Bo?e():os.push(e)}function _o(e){Jr?e():rs.push(e)}function qo(){Tn()}function Lt(){Tn(),Qr()}function Fo(){is()}function ts(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function as(){await ts(4e3),Tn(),await ts(4e3),Qr(),is()}var h={p:"0-V-linuxdo"},j="[20260920] v1.4.55",ss="https://github.com/0-V-linuxdo/Bloom";function Pd(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Rd(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function ei(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function Xe(){return ei()?Pd()||Rd():!1}function ls(){return Xe()}var Id=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),cs=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Od=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Bd="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function Ct(e){return e.id==="bloom-root"||!!e.closest(Bd)}function ds(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function jo(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function ti(e){if(!(e instanceof HTMLElement)||!e.isConnected||Ct(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&jo(t)?!1:e.getClientRects().length>0}function kt(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Dd(){let e=[];for(let t of document.querySelectorAll(Id))!(t instanceof HTMLElement)||!t.isConnected||Ct(t)||e.push(t);return e}function zo(e){if(!e.isConnected||Ct(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function Ln(){return Dd().filter(zo)[0]??null}function ni(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||Ct(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function oi(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!Ct(n)&&!kt(n)&&n.parentElement&&!kt(n.parentElement)&&(t=n);let o=t.parentElement;if(o&&!kt(o)&&!Ct(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!kt(o.parentElement))return o}return t}function us(){let e=document.querySelectorAll(cs);for(let n of e)if(ti(n)&&!jo(n)&&ds(n))return n;let t=document.querySelectorAll(Od);for(let n of t){if(!ti(n)||!ds(n)||jo(n))continue;let o=n.querySelector(cs);return ti(o)&&!jo(o)?o:n}return null}function ms(){let e=Ln();if(e){let t=oi(e),n=t.parentElement;if(n&&!kt(n))return n;if(!kt(t))return t}return ni()}function fs(e){let t=Ln();return t?e.composedPath().includes(t):!1}var ii=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],$d={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function ai(e){return e==="auto"||e==="light"||e==="dark"}function _d(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function qd(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function ri(e){let t=_d(e);return t?qd(t)>.55?"light":"dark":null}function Fd(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=ri(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=ri(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=ri(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function ps(e){return e==="auto"?Fd():e}function jd(e){try{let t=getComputedStyle(document.documentElement);for(let n of ii){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function gs(e,t,n){let o=$d[t];if(n){jd(e);for(let r of ii)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of ii)e.style.setProperty(r,o[r])}function bs(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var si=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var Gd="bloom-root",se="bloom-rail-item",Wo="bloom-account-item",Ze="bloom-sidebar-panel",Bn="bloom-plugin-dialog",er="bloom-plugin-layer",Yo="bloom-settings-css",Kd=2e3,Pn=x({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),vs=null,Ud=null,Oe=!1,ui=[],Go=null,Xo=null,Re=null,Uo=null,xe=null,Rn=null,kn,Mt=0,In=0,Cn=0,Mn=null,An=null,Jo=null,xs=null,Hn=null,li=[],Zo=!1,Vd=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Wd=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],tr="",On="all",Be="all";function nr(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Es(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Yd(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function Xd(e){let t='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return e?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${t}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`}function Jd(e){let t='<path d="M12 17v5"/>';return e?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var Zd={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function Qd(e){return e.icon||Zd[e.name]||nr()}function ws(){return ai(Pn.store.appearance)?Pn.store.appearance:"auto"}function eu(){let e=document.createElement("div");e.className="bloom-field bloom-appearance-row";let t=document.createElement("span");t.className="bloom-field-label",t.textContent="Appearance";let n=document.createElement("select");n.setAttribute("aria-label","Appearance");let o=Pn.def.appearance,r=o.type===3?o.options??[]:[];for(let i of r){let a=document.createElement("option");a.value=i.value,a.textContent=i.label,n.appendChild(a)}return n.value=ws(),n.addEventListener("change",()=>{ai(n.value)&&(Pn.store.appearance=n.value)}),e.append(t,n),e}function ci(e,t,n){e&&(e.setAttribute("data-bloom-scheme",t),gs(e,t,n),e.style.removeProperty("--bloom-rail-surface"))}function Ss(e){e&&(e.style.removeProperty("--bloom-rail-surface"),e.style.removeProperty("--bg-primary"))}function Nn(){let e=ws(),t=ps(e),n=e==="auto";ci(vs,t,n);let o=document.getElementById(Ze);o instanceof HTMLElement&&ci(o,t,n);let r=document.getElementById(Bn);r instanceof HTMLElement&&ci(r,t,n);let i=document.getElementById(se);i instanceof HTMLElement&&Ss(i),Ye("schemeChange",{scheme:t,pref:e})}function Ts(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(e=>e.remove())}function Ls(){if(E("settings",si),document.getElementById(Yo)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=Yo,e.textContent=si,document.head.appendChild(e)}function tu(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function nu(){for(let e of ui)e();ui=[]}function ks(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function ou(e){return e.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,t=>t.toUpperCase())}function pi(e){return e.settings?Object.entries(e.settings.def).filter(([,t])=>!t.hidden):[]}function ru(e){return pi(e).length>0}function Vo(e){if(e.default!==void 0)return e.default;if(e.type===3)return(e.options?.find(n=>n.default)??e.options?.[0])?.value;if(e.type===2)return!1;if(e.type===4)return e.min??0;if(e.type===0)return"";if(e.type===1)return 0}function iu(e,t){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let o=document.createElement("span");if(o.className="bloom-plugin-dialog-label-title",o.textContent=ou(e),n.appendChild(o),t.description){let r=document.createElement("span");r.className="bloom-plugin-dialog-label-desc",r.textContent=t.description,n.appendChild(r)}return n}function au(e,t,n){if(n.hidden)return null;let o=n.type===4||n.type===0||n.type===1||n.type===5,r=document.createElement("div");r.className=o?"bloom-field bloom-field-stack":"bloom-field",r.appendChild(iu(t,n));let i=b.store.plugins[e]??(b.store.plugins[e]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",ui.push(n.render(a)),r.appendChild(a),r}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??Vo(n)??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),r.appendChild(a),r}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??Vo(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),r.appendChild(a),r}if(n.type===2){let a=ks(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),r.appendChild(a),r}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[t]??Vo(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[t]=n.type===1?Number(a.value):a.value}),r.appendChild(a),r}return r}function hs(e,t){let n=document.createElement("div");n.className=t?`bloom-plugin-dialog-field ${t}`:"bloom-plugin-dialog-field";let o=document.createElement("div");return o.className="bloom-plugin-dialog-field-label",o.textContent=e,n.appendChild(o),n}function su(e){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let t=b.store.plugins[e.name]??(b.store.plugins[e.name]={});for(let[n,o]of pi(e)){if(n==="enabled"||o.type===5)continue;let r=Vo(o);r!==void 0&&(t[n]=r)}Ms(e)}function Cs(e){e.key==="Escape"&&(!document.getElementById(er)&&!document.getElementById(Bn)||(e.stopPropagation(),At()))}function lu(){Zo||(document.addEventListener("keydown",Cs),Zo=!0)}function cu(){Zo&&(document.removeEventListener("keydown",Cs),Zo=!1)}function At(){nu(),cu(),document.getElementById(er)?.remove(),document.getElementById(Bn)?.remove()}function Ms(e){if(At(),!document.body)return;let t=document.createElement("div");t.id=er,t.className="bloom-plugin-layer",t.addEventListener("pointerdown",Ie),t.addEventListener("pointerup",Ie),t.addEventListener("click",d=>{d.stopPropagation(),d.target===t&&At()});let n=document.createElement("div");n.id=Bn,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",Ie),n.addEventListener("pointerup",Ie),n.addEventListener("click",Ie);let o=document.createElement("button");o.type="button",o.className="bloom-icon-btn bloom-plugin-dialog-close",o.setAttribute("aria-label","Close"),o.innerHTML=Es(),o.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),At()});let r=document.createElement("div");r.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=e.name,r.appendChild(i),e.description){let d=document.createElement("p");d.className="bloom-plugin-dialog-sub",d.textContent=e.description,r.appendChild(d)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(o,r,a),e.authors?.length){let d=hs("Authors"),u=document.createElement("p");u.className="bloom-plugin-dialog-authors",u.textContent=e.authors.join(", "),d.appendChild(u),n.appendChild(d)}let s=hs("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=pi(e);if(c.length)for(let[d,u]of c){let m=au(e.name,d,u);m&&l.appendChild(m)}if(!l.childElementCount){let d=document.createElement("p");d.className="bloom-dialog-empty",d.textContent="No configurable settings.",l.appendChild(d)}if(s.appendChild(l),n.appendChild(s),c.length){let d=document.createElement("div");d.className="bloom-plugin-dialog-footer";let u=document.createElement("button");u.type="button",u.className="bloom-plugin-dialog-reset",u.textContent="Reset",u.addEventListener("click",()=>su(e)),d.appendChild(u),n.appendChild(d)}t.appendChild(n),document.body.appendChild(t),lu(),Nn()}function du(e){let t=document.createElement("div");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Qd(e);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=e.name,a.title=e.name,r.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=Va(e.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=Xd(l),c.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation();let f=Wa(e.name);Ye("pluginStar",{name:e.name,starred:f})}),s.appendChild(c),!e.required){let g=Ka(e.name),f=document.createElement("button");f.type="button",f.className=`bloom-icon-btn bloom-card-pin${g?" bloom-card-pin-active":""}`,f.setAttribute("aria-label",g?"Unpin from top":"Pin to top"),f.innerHTML=Jd(g),f.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();let _=Ua(e.name);Ye("pluginPin",{name:e.name,pinned:_})}),s.appendChild(f)}if(ru(e)){let g=document.createElement("button");g.type="button",g.className="bloom-icon-btn bloom-card-settings",g.setAttribute("aria-label",`${e.name} settings`),g.innerHTML=Yd(),g.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),Ms(e)}),s.appendChild(g)}let d=ks(e.name,Tt(e.name),!!e.required),u=d.querySelector("input");if(u?.addEventListener("click",g=>g.stopPropagation()),u?.addEventListener("change",()=>{Za(e.name)}),s.appendChild(d),o.append(r,s),n.appendChild(o),e.description){let g=document.createElement("div");g.className="bloom-card-desc",g.textContent=e.description,n.appendChild(g)}let m=document.createElement("div");m.className="bloom-card-separator";let S=document.createElement("div");S.className="bloom-card-footer";let w=document.createElement("div");return w.className="bloom-card-author",w.textContent=e.authors?.filter(Boolean).join(", ")||"\xA0",S.appendChild(w),t.append(n,m,S),t}function As(){return Object.values(ae).filter(e=>!e.hidden&&e.name!=="Settings")}function Hs(e,t){return t==="all"||t==="favorites"?!0:(e.tags??[]).includes(t)}function uu(e){return`${e.name} ${e.description??""} ${(e.tags??[]).join(" ")}`.toLowerCase()}function mu(){return tr.trim()?"No plugins match your search.":Be==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function fu(){let e=As();return Wd.filter(t=>t.id==="favorites"||t.id==="all"?!0:e.some(n=>Hs(n,t.id)))}function pu(){if(Hn){Hn.replaceChildren();for(let e of fu()){let t=document.createElement("button");t.type="button",t.className=`bloom-plugin-tab${Be===e.id?" bloom-plugin-tab-active":""}`,t.textContent=e.label,t.addEventListener("click",()=>{Be=e.id,Je()}),Hn.appendChild(t)}}}function gu(){let e=As();if(Be==="favorites"){let t=new Set(Io());e=e.filter(n=>t.has(n.name))}else Be!=="all"&&(e=e.filter(t=>Hs(t,Be)));return On==="enabled"&&(e=e.filter(t=>Tt(t.name))),On==="disabled"&&(e=e.filter(t=>!Tt(t.name))),e}function Je(){if(!Mn)return;pu();let e=gu();Jo&&(Jo.placeholder=`Search ${e.length} plugins...`);let t=e,n=tr.trim().toLowerCase();if(n&&(t=t.filter(o=>uu(o).includes(n))),Be!=="favorites"){let o=Ro();if(o.length){let r=new Map(o.map((i,a)=>[i,a]));t=t.slice().sort((i,a)=>{let s=r.has(i.name),l=r.has(a.name);return s!==l?s?-1:1:s?(r.get(i.name)??0)-(r.get(a.name)??0):i.name.localeCompare(a.name)})}}Mn.replaceChildren();for(let o of t)Mn.appendChild(du(o));An&&(An.hidden=t.length>0,An.textContent=mu())}function Ie(e){e.stopPropagation()}function di(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function gi(){document.getElementById(se)?.setAttribute("aria-expanded",Oe?"true":"false")}function bu(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function bi(){At(),tr="",On="all",Be="all",document.getElementById(Ze)?.remove(),Oe=!1,gi()}function hu(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",Ie),t.addEventListener("pointerup",Ie),t.addEventListener("click",Ie);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-titles";let i=document.createElement("div");i.className="bloom-settings-brand";let a=document.createElement("span");a.className="bloom-settings-mark",a.innerHTML=nr();let s=document.createElement("h2");s.textContent="Bloom++",i.append(a,s);let l=document.createElement("p");l.className="bloom-settings-sub",l.textContent="Toggle features. Some need a reload. Click the sliders icon to configure.",r.append(i,l);let c=document.createElement("button");c.type="button",c.className="bloom-icon-btn",c.setAttribute("aria-label","Close"),c.innerHTML=Es(),c.addEventListener("click",bi),o.append(r,c),n.appendChild(o),n.appendChild(eu());let d=document.createElement("div");d.className="bloom-plugin-tabs",n.appendChild(d);let u=document.createElement("div");u.className="bloom-search-bar";let m=document.createElement("input");m.type="search",m.className="bloom-search-input",m.setAttribute("aria-label","Search plugins"),m.placeholder="Search plugins...",m.addEventListener("input",()=>{tr=m.value,Je()});let S=document.createElement("select");S.className="bloom-search-filter",S.setAttribute("aria-label","Filter plugins");for(let f of Vd){let T=document.createElement("option");T.value=f.value,T.textContent=f.label,S.appendChild(T)}S.value=On,S.addEventListener("change",()=>{On=S.value,Je()}),u.append(m,S),n.appendChild(u);let w=document.createElement("div");w.className="bloom-plugin-list",n.appendChild(w);let g=document.createElement("p");return g.className="bloom-tab-empty",g.hidden=!0,n.appendChild(g),t.appendChild(n),Mn=w,An=g,Jo=m,xs=S,Hn=d,Je(),t}function yu(e){e.classList.add("bloom-rail-dock")}function vu(){let e=document.getElementById(se);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&zo(e)?e:null}function xu(){if(document.getElementById(Ze)?.remove(),!document.body)return;let e=hu(Ze);yu(e),document.body.appendChild(e),Oe=!0,At(),Nn(),gi(),Ye("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:j,dock:"center",rail:!!vu()})}function hi(){let e=document.getElementById(Ze);if(e instanceof HTMLElement&&e.isConnected&&bu(e)){bi();return}e?.remove(),xu()}function Eu(){let e=document.createElement("button");return e.type="button",e.id=se,e.className="bloom-rail-item",e.setAttribute("aria-controls",Ze),e.setAttribute("aria-expanded",Oe?"true":"false"),e.innerHTML=`<span class="bloom-rail-mark">${nr()}</span><span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),hi()}),e}function ys(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function wu(e){let t=e.querySelector("img");if(t instanceof HTMLElement){let n=t.getBoundingClientRect();if(n.width>8&&n.height>8)return t}for(let n of e.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}return null}function Su(e,t){for(let n of e.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||t&&(n===t||n.contains(t)||t.contains(n))||(n.textContent||"").trim().length<2)continue;let r=n.getBoundingClientRect();if(r.width>16&&r.height>8&&r.height<40)return n}return null}function Pe(e,t,n){let o=`${n}px`;e.style.getPropertyValue(t)!==o&&e.style.setProperty(t,o)}function Ns(e,t){if(e.classList.contains("bloom-rail-compact"))return;let n=e.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!e.isConnected||!t.isConnected)return;let o=wu(t),r=getComputedStyle(t),i=Number.parseFloat(r.paddingTop),a=Number.parseFloat(r.paddingBottom);if(Number.isFinite(i)&&Pe(e,"padding-top",Math.round(i)),Number.isFinite(a)&&Pe(e,"padding-bottom",Math.round(a)),o){let s=o.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));Pe(n,"width",l),Pe(n,"height",Math.max(20,Math.round(s.height)));let c=e.getBoundingClientRect(),d=Math.round(s.left-c.left);d>=0&&d<=40&&Pe(e,"padding-left",d);let u=Su(t,o);if(u){let m=u.getBoundingClientRect(),S=n.getBoundingClientRect(),w=Math.round(m.left-S.right);w>=0&&w<=24&&Pe(e,"gap",w)}}else{let s=Number.parseFloat(r.paddingLeft),l=Number.parseFloat(r.columnGap||r.gap);Number.isFinite(s)&&Pe(e,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&Pe(e,"gap",Math.round(l))}Ss(e)}function mi(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Tu(){if(Rn?.isConnected&&xe){xe.observe(Rn,{childList:!0});return}fi()}function Lu(e){if(mi(e))return!1;try{if(e.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function ku(e,t){!t||!e||requestAnimationFrame(()=>{if(e.isConnected){Cn=0;return}Cn+=1,In=Date.now()+Math.min(8e3,250*2**Math.min(Cn,5))})}function Cu(){Mt||Date.now()<In||(Mt=requestAnimationFrame(()=>{Mt=0,!(Date.now()<In)&&(document.getElementById(se)?.isConnected||Qo())}))}function Qo(){if(!document.body)return;xe?.disconnect();let e=null,t=!1;try{let n=document.getElementById(se);e=n instanceof HTMLButtonElement?n:Eu();let o=Ln(),r=ni();if(o){let i=oi(o),a=i.parentElement;if(mi(i)||a&&mi(a))return;e.isConnected&&e.nextElementSibling===i||(i.before(e),t=!0),ys(e),Ns(e,o)}else r?(e.parentElement!==r&&(r.appendChild(e),t=!0),ys(e,!0)):e.isConnected&&!zo(e)&&(e.remove(),e=null)}finally{ku(e,t),Tu(),gi()}}function fi(){let e=ms();!e||!Lu(e)||Rn===e&&xe||(xe?.disconnect(),Rn=e,xe=new MutationObserver(()=>{document.getElementById(se)?.isConnected||Cu()}),xe.observe(e,{childList:!0}))}function Mu(){Qo(),fi(),kn===void 0&&(kn=window.setInterval(()=>{let e=document.getElementById(se);if(!(e instanceof HTMLElement)||!e.isConnected)Date.now()>=In&&Qo();else{Cn=0;let t=Ln();t&&Ns(e,t)}fi()},Kd))}function Au(){kn!==void 0&&(clearInterval(kn),kn=void 0),Mt&&cancelAnimationFrame(Mt),Mt=0,In=0,Cn=0,xe?.disconnect(),xe=null,Rn=null}function Hu(e){Uo===e&&Re||(Re?.disconnect(),Uo=e,Re=new MutationObserver(()=>{if(!e.isConnected){Re?.disconnect(),Re=null,Uo=null;return}Ps(e)}),Re.observe(e,{childList:!0}))}function Ps(e){if(Hu(e),e.querySelector(`#${Wo}`))return;let t=document.createElement("button");t.type="button",t.id=Wo,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${nr()}<span>Bloom++</span>`,t.addEventListener("pointerdown",di),t.addEventListener("pointerup",di),t.addEventListener("click",n=>{di(n),hi()}),e.insertBefore(t,e.firstChild)}function Ko(){let e=us();return e?(Ps(e),!0):!1}function Nu(e){fs(e)&&(queueMicrotask(Ko),requestAnimationFrame(()=>{Ko()}),window.setTimeout(Ko,60),window.setTimeout(Ko,180))}function Pu(){Xo?.abort();let e=new AbortController;Xo=e,document.addEventListener("click",Nu,{signal:e.signal})}function Ru(){Xo?.abort(),Xo=null,Re?.disconnect(),Re=null,Uo=null}function Rs(){Lt(),tu(()=>{Ls(),Ts(),Qo(),hi()})}var Is=p({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[h.p],required:!0,hidden:!0,enabledByDefault:!0,settings:Pn,startAt:"HostReady",cleanupSelectors:[`#${Gd}`,`#${se}`,`#${Wo}`,`#${Ze}`,`#${er}`,`#${Bn}`,`#${Yo}`,"#bloom-menu-panel"],start(){Ls(),Ts(),Mu(),Pu(),Go?.(),Go=bs(Nn),Nn(),li=[Ao("pluginToggle",()=>{Oe&&Je()}),Ao("pluginPin",()=>{Oe&&Je()}),Ao("pluginStar",()=>{Oe&&Je()})]},stop(){Au(),Ru(),Go?.(),Go=null;for(let e of li)e();li=[],bi(),document.getElementById(se)?.remove(),document.getElementById(Wo)?.remove(),document.getElementById(Yo)?.remove(),vs=null,Ud=null,Mn=null,An=null,Jo=null,xs=null,Hn=null,Oe=!1},onSettingsChange:Nn});var or='form[data-type="unified-composer"], form.w-full[data-type]',le=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Ht=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Os=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Bs=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Iu=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Ou='[contenteditable="false"], button, [role="button"]';function X(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function Qe(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!X(r)))return r;return null}function Ds(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function C(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=Ds(e);return!!(Iu.test(n)||/^stop$/i.test(n))}function J(){let t=Array.from(document.querySelectorAll(or)).find(X);if(t instanceof HTMLElement)return t;let n=Qe(document,le),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function D(){let e=Array.from(document.querySelectorAll(le));return e.find(X)??e[0]??null}function Bu(e,t){if(!e||e===t||!t.contains(e))return!1;let n=e.closest(Ou);return!!n&&n!==t&&t.contains(n)}function yi(e,t){let n=[];try{let o=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),r=o.nextNode();for(;r;){let i=r.parentElement;i&&Bu(i,t)||n.push(r.textContent??""),r=o.nextNode()}}catch{return e.innerText??e.textContent??""}return n.join("")}function Z(e){let t=e??D();return t?yi(t,t).replaceAll("\u200B","").trim().length>0:!1}function De(e){return!Z(e)}function rr(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function $s(e){let t=J();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!X(n))&&e(n))return n;return null}function $e(){let e=J(),t=Qe(e,Ht)??Qe(document,Ht);return t&&!C(t)?t:$s(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!C(n);let r=Ds(n);return/^(send|send prompt|发送)$/i.test(r)&&!C(n)})}function et(){let e=J(),t=Qe(e,Os,!0)??Qe(document,Os,!0);if(t)return t;let n=Qe(e,Bs)??Qe(document,Bs);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&X(o)&&C(o))return o}return $s(C)}function z(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>yi(n,e)).join(`
`):yi(e,e)}function vi(e,t=!1){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function Ee(e,t,n=!1){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r);try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch{e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),vi(e,n)}var _s=/\/c\/([a-zA-Z0-9_-]{8,})/i;function G(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=c=>{let d=n.indexOf(c);return d>=0&&n[d+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,d)=>{try{return document.querySelector(c)?.getAttribute(d)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function we(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function Nt(e){if(!e)return"";try{return(/^https?:/i.test(e)?new URL(e,location.origin).pathname:e).match(_s)?.[1]??""}catch{return e.match(_s)?.[1]??""}}function L(){let e=Nt(location.pathname);if(e)return e;let n=G().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return""}var zs=new v("Harvest"),Du=1500,$u=200,ir=new Set,ar=new Map,sr=new Map,Pt=null,lr=null,Dn=null,ce=0;function _u(){return typeof unsafeWindow<"u"?unsafeWindow:window}function qu(e){try{if(typeof e=="string")return e;if(e instanceof URL)return e.href;if(typeof Request<"u"&&e instanceof Request)return e.url}catch{}return String(e)}function Fu(e,t){let n=t?.method,o=typeof Request<"u"&&e instanceof Request?e.method:"";return(n||o||"GET").toUpperCase()}function Gs(e){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(e)}var ju=/"action"\s*:\s*"(next|continue|variant)"/i;function zu(e,t,n){return!(t!=="POST"||Gs(e)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(e)||typeof n=="string"&&/"action"\s*:/.test(n)&&!ju.test(n))}function Gu(e,t){return t!=="GET"||Gs(e)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(e)}function qs(e){return e.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function Ks(e){return e?e.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function Ku(e){return typeof e=="string"?Ks(e):""}function xi(e){if(typeof e=="number"&&Number.isFinite(e)&&e>0)return e>1e12?e:Math.round(e*1e3);if(typeof e=="string"){let t=e.trim();if(!t)return null;if(/^\d+(\.\d+)?$/.test(t))return xi(Number(t));let n=Date.parse(t);return Number.isFinite(n)?n:null}return null}function Us(e,t){if(e.size<=t)return;let n=e.size-t,o=0;for(let r of e.keys())if(e.delete(r),++o>=n)break}function Fs(e,t,n){!e||!t||sr.get(e)!==t&&(sr.set(e,t),Us(sr,Du),_e({type:"message-time",messageId:e,createTime:t,conversationId:n}))}function Uu(e,t){let n=t.trim();!e||!n||ar.get(e)!==n&&(ar.set(e,n),Us(ar,$u),_e({type:"conversation-meta",conversationId:e,title:n}))}function $n(e,t,n=0){if(n>6||!e||typeof e!="object")return;if(Array.isArray(e)){for(let l of e)$n(l,t,n+1);return}let o=e,r=typeof o.conversation_id=="string"&&o.conversation_id||typeof o.conversationId=="string"&&o.conversationId||t;typeof o.title=="string"&&r&&!o.author&&!o.content&&!o.role&&Uu(r,o.title);let i=o.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",d=xi(l.create_time??l.createTime??l.created_at);c&&d&&Fs(c,d,r)}let a=typeof o.id=="string"?o.id:"",s=xi(o.create_time??o.createTime??o.created_at);if(a&&s&&(o.author||o.content||o.role||o.create_time||o.createTime)&&Fs(a,s,r),o.mapping&&typeof o.mapping=="object")$n(o.mapping,r,n+1);else if(n<3)for(let l of Object.values(o))l&&typeof l=="object"&&$n(l,r,n+1)}function js(e,t){if(e)try{$n(JSON.parse(e),t)}catch{}}function _e(e){for(let t of Array.from(ir))try{t(e)}catch{}}async function Vu(e,t,n){if(n===ce)try{let o=await e.json();if(n!==ce)return;$n(o,t)}catch{}}async function Wu(e,t,n,o){let r=t,i=n,a=e.body;if(!a){o===ce&&_e({type:"post-end",conversationId:r,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;o===ce;){let{done:d,value:u}=await s.read();if(d)break;if(c+=l.decode(u,{stream:!0}),!r){let S=Ks(c);S&&(r=S,_e({type:"post-start",conversationId:r,url:""}))}let m=c.split(`
`);c=m.pop()??"";for(let S of m){let w=S.replace(/^data:\s*/,"").trim();!w||w==="[DONE]"||js(w,r)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&o===ce&&js(c.replace(/^data:\s*/,""),r)}catch{i=!0}finally{try{s.cancel()}catch{}}o===ce&&_e({type:"post-end",conversationId:r,error:i})}function Yu(e,t,n){let o=qu(t),r=Fu(t,n),i=Gu(o,r),a=zu(o,r,n?.body),s=ce,l="";return a&&(l=Ku(n?.body)||qs(o)||Nt(o)||L(),_e({type:"post-start",conversationId:l,url:o})),e(t,n).then(c=>{if(s!==ce||!i&&!a)return c;try{let d=c.clone();i?Vu(d,qs(o)||L(),s):Wu(d,l,!c.ok,s)}catch{a&&_e({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===ce&&_e({type:"post-end",conversationId:l,error:!0}),c})}function Xu(){if(Pt)return;let e=_u();Dn=e,Pt=e.fetch.bind(e);let t=(n,o)=>Yu(Pt,n,o);lr=t,e.fetch=t,zs.debug("conversation fetch harvest hooked")}function Ju(){ce+=1,!(!Pt||!Dn)&&(lr&&Dn.fetch===lr&&(Dn.fetch=Pt),Pt=null,lr=null,Dn=null,zs.debug("conversation fetch harvest unhooked"))}function K(e){return ir.add(e),Xu(),()=>{ir.delete(e),ir.size===0&&Ju()}}function Rt(e){return e?ar.get(e)??"":""}function cr(e){return e?sr.get(e)??null:null}var Ys=new v("Streaming");function Kn(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!X(t))&&(C(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function Zu(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&X(e))}function Qu(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&X(e))}function em(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Q(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function H(){if(et()||Kn()||em())return!0;let e=$e();return e&&X(e)&&!C(e)?!1:!!(Zu()||Qu())}var tm=400,Vs=3,ot=new Set,qn,Fn=null,Ei=null,nt=!1,tt=0,qe="",de="",jn=!1,zn=!1,Gn=!1;function Xs(){return we(G())}function Ws(e,t){return{streaming:e,contextKey:t,conversationId:L()}}function rt(e,t){if(!e||e===t)return!1;if(e.endsWith("|draft")&&!t.endsWith("|draft"))return!0;try{let n=e.split("|")[0],o=t.split("|")[0],r=new URL(n).pathname.replace(/\/$/,"")||"/",i=new URL(o).pathname.replace(/\/$/,"")||"/";if((r==="/"||r==="")&&i.startsWith("/c/"))return!0}catch{}return!1}function wi(){nt=!1,tt=0,qe="",jn=!1,zn=!1,Gn=!1}function nm(e){for(let t of Array.from(ot))try{t.onFall?.(e)}catch{}}function om(e){for(let t of Array.from(ot))try{t.onRise?.(e)}catch{}}function _n(e){for(let t of Array.from(ot))try{t.onTick?.(e)}catch{}}function rm(e,t){for(let n of Array.from(ot))try{n.onContext?.(e,t)}catch{}}function im(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest("button");n instanceof HTMLElement&&C(n)&&(jn=!0)}function am(e){e.type==="post-end"&&nt&&(Gn=!0,e.error&&(zn=!0))}function sm(){let e=Xs(),t=H();if(de&&e&&de!==e){if(rm(e,de),!rt(de,e)){wi(),de=e,_n(Ws(t,e));return}qe===de&&(qe=e)}de=e;let n=Ws(t,e);if(t){let i=!nt;i&&(jn=!1,zn=!1,Gn=!1),nt=!0,tt=0,qe=e,i&&om(n),_n(n);return}if(!nt){_n(n);return}if(tt+=1,Gn&&(tt=Math.max(tt,Vs)),tt<Vs){_n(n);return}let o=!!qe&&qe===e,r={contextKey:qe||e,conversationId:L(),userStopped:jn,error:zn||Q()};wi(),o&&nm(r),_n(n)}function lm(){qn===void 0&&(nt=H(),de=Xs(),qe=nt?de:"",tt=0,jn=!1,zn=!1,Gn=!1,Fn?.abort(),Fn=new AbortController,document.addEventListener("click",im,{capture:!0,signal:Fn.signal}),Ei=K(am),qn=setInterval(sm,tm),Ys.debug("watchStreamingEdge started"))}function cm(){ot.size||(qn!==void 0&&(clearInterval(qn),qn=void 0),Fn?.abort(),Fn=null,Ei?.(),Ei=null,wi(),de="",Ys.debug("watchStreamingEdge stopped"))}function U(e){let t=typeof e=="function"?{onFall:e}:e;return ot.add(t),lm(),()=>{ot.delete(t),cm()}}var Js="bloom-host-icon",Un="data-bloom-host-rel",Si="not all",Ti=0,Zs=0,dm=400;function Qs(e){Ti+=1;try{e()}finally{Ti-=1}}function dr(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function Fe(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function el(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function um(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function mm(e,t){if(e.lastElementChild===t)return;let n=Date.now();n-Zs<dm||(Zs=n,e.appendChild(t))}function fm(e,t){for(let n of e.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===t||dr(n)&&(n.getAttribute(Un)||n.setAttribute(Un,n.rel),n.media!==Si&&(n.media=Si),n.rel!==Js&&(n.rel=Js))}function pm(e){for(let t of e.querySelectorAll(`link[${Un}]`)){if(!(t instanceof HTMLLinkElement))continue;let n=t.getAttribute(Un);n&&(t.rel=n),t.removeAttribute(Un),t.media===Si&&t.removeAttribute("media")}}function tl(e,t){let{head:n}=document;!n||!t||Qs(()=>{fm(n,e);let o=el(e),{type:r,sizes:i}=um(t);o?mm(n,o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function nl(e,t){let{head:n}=document;n&&Qs(()=>{el(e)?.remove(),pm(n)})}function ol(e,t){let{head:n}=document;if(!n)return null;let o=0,r=new MutationObserver(i=>{if(Ti)return;let a=!1,s;for(let l of i){l.type==="attributes"&&l.target instanceof HTMLLinkElement&&(l.target.id===e?a=!0:dr(l.target)&&(a=!0,Fe(l.target.href)&&(s=l.target.href)));for(let c of l.removedNodes)dr(c)&&c.id===e&&(a=!0);for(let c of l.addedNodes)dr(c)&&c.id!==e&&(a=!0,Fe(c.href)&&(s=c.href))}a&&(o||(o=requestAnimationFrame(()=>{o=0,t(s)})))});return r.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),r}var gm=["original","badge","dot","hole","bg"],al=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],sl={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},ur="#FCFCFC",bm="#111111",rl="#111111",hm="#ffffff",ym="#212121",vm="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",xm={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},mr=32,il=64;function ll(e){return typeof e=="string"&&gm.includes(e)}function Em(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function fr(e){let t=document.createElement("canvas");t.width=mr,t.height=mr;let n=t.getContext("2d");return n?(n.scale(mr/il,mr/il),e(n),t.toDataURL("image/png")):""}function wm(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function pr(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(vm);n&&(e.strokeStyle=bm,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function Sm(e,t,n){let o=sl[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=rl,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=rl,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=hm,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function Vn(e,t){if(e==="original")return t==="wait"?fr(o=>pr(o,ur)):Em(xm[t]);let n=t==="wait"?void 0:sl[t];return fr(e==="hole"?o=>pr(o,n??ur):e==="bg"?o=>{o.fillStyle=n??ym,wm(o,0,0,64,64,14),o.fill(),pr(o,ur,!1)}:o=>{pr(o,ur),t!=="wait"&&Sm(o,t,e==="dot"?"dot":"badge")})}function cl(e){return{wait:Vn(e,"wait"),rotate:Vn(e,"rotate"),done:Vn(e,"done"),ready:Vn(e,"ready"),error:Vn(e,"error")}}var Tm=new v("ChatStateFavicons"),st="bloom-chat-state-favicon",gl=["input","beforeinput","cut","paste","compositionend"],bl=x({style:{type:3,description:"Favicon overlay",options:al}}),me="",ki={wait:"",rotate:"",done:"",ready:"",error:""},Wn="wait",it=!1,ue=!1,$=null,V="",W="",lt=!0,It=null,Y=0,gr=null,br=null,at=null,Li=null,Ot=null,te=!1,dl=new WeakSet;function Lm(){let e=bl.store.style;return ll(e)?e:"bg"}function hl(){let t=document.querySelector(`link[rel~="icon"]:not(#${st}), link[data-bloom-host-rel]:not(#${st})`)?.href;return Fe(t)?t:Fe(me)?me:""}function km(){let e=document.getElementById(st);return e instanceof HTMLLinkElement?e:null}function Cm(){if(!Fe(me)){let e=hl();e&&(me=e)}return Fe(me)?me:ki.wait}function yl(e){return e==="wait"?Cm():ki[e]}function vl(){tl(st,yl(Wn))}function ee(e){let t=yl(e);if(Wn===e){let n=km();if(n&&n.getAttribute("href")===t)return}Wn=e,vl()}function ul(){ki=cl(Lm()),ee(Wn)}function xl(){return we(G())}function Ci(e,t){!e||!t||e===t||($===e&&($=t),V===e&&(V=t),W===e&&(W=t))}function Mm(){let e=xl();return H()||it||ue?(V&&e&&V!==e&&rt(V,e)?(Ci(V,e),V=e):!V&&e&&(V=e),V||e):(V="",e)}function ml(e){return!$||!e||$===e?!0:rt($,e)}function El(){it=!1,ue=!1,$=null,V=""}function wl(e){W=e,El(),lt=!1,ee("wait")}function fl(e){return!e&&lt}function Am(){if(!te)return;let e=xl();if(W&&e&&W!==e&&!rt(W,e)){wl(e);return}W&&e&&rt(W,e)&&Ci(W,e),e&&(W=e);let t=Mm(),n=H(),o=De();if(Q()&&!n){ee("error"),it=!1,ue=!1,$=null;return}if(n){it||(lt=!1),it=!0,ue=!1,$=t,ee("rotate");return}if(it){let r=ml(t);if(it=!1,r){ue=!0,$=t,ee("done");return}ue=!1,$=null}if(ue)if($&&t&&!ml(t))ue=!1,$=null;else if(o){$=t||$,ee("done");return}else if(fl(o)){ue=!1,ee("ready");return}else{ue=!1,ee("wait");return}$=null,o?ee("wait"):fl(o)?ee("ready"):ee("wait")}function je(){te&&(Cl(),Tl(),Ll(),Am())}function Sl(){if(Ot){for(let e of gl)Ot.removeEventListener(e,kl,!0);Ot=null}}function Tl(){let e=J(),t=e&&e!==document.body?e:null;if(!(Ot===t&&t?.isConnected)&&(Sl(),!!t)){Ot=t;for(let n of gl)Ot.addEventListener(n,kl,{capture:!0,passive:!0})}}function Ll(){let e=J();if(!(at&&Li===e&&e.isConnected)){if(at?.disconnect(),Li=e,!e||e===document.body){at=null;return}at=new MutationObserver(()=>hr()),at.observe(e,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function hr(){if(te){if(document.hidden){Y&&(cancelAnimationFrame(Y),Y=0),je();return}Y||(Y=requestAnimationFrame(()=>{Y=0,te&&je()}))}}function kl(){Z()&&(lt=!0),hr()}function pl(){Z()&&(lt=!0),hr()}function Hm(){te&&(Y&&(cancelAnimationFrame(Y),Y=0),je())}function Nm(){te&&(lt=!1,je())}function Pm(){te&&je()}function Rm(){te&&je()}function Im(e,t){if(te){if(rt(t,e)){Ci(t,e),W=e,je();return}wl(e)}}function Cl(){let e=D();!e||dl.has(e)||(dl.add(e),e.addEventListener("input",pl,{capture:!0,passive:!0}),e.addEventListener("compositionend",pl,{capture:!0,passive:!0}))}var Ml=p({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:bl,startAt:"DOMContentLoaded",cleanupSelectors:[`#${st}`],start(){te=!0,me=hl()||me,ul(),br?.disconnect(),br=ol(st,e=>{Fe(e)&&(me=e),vl()}),It?.abort(),It=new AbortController,window.addEventListener("popstate",hr,{signal:It.signal}),document.addEventListener("visibilitychange",Hm,{signal:It.signal}),Cl(),Tl(),Ll(),gr?.(),gr=U({onRise:Nm,onFall:Pm,onTick:Rm,onContext:Im}),je(),Tm.debug("favicon watch started")},stop(){te=!1,Y&&cancelAnimationFrame(Y),Y=0,gr?.(),gr=null,It?.abort(),It=null,Sl(),at?.disconnect(),at=null,Li=null,br?.disconnect(),br=null,El(),W="",lt=!0,Wn="wait",nl(st,me)},onSettingsChange:ul});var Al=`.bloom-ih-hud {
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
`;var Ah=new v("InputHistory"),Mi=/\u200B/g,Hl=10,Nl=500,Pl=100,Bm=8,Dm=120,$m=2e3,yr=10,vr=x({maxEntries:{type:4,description:"Max stored prompts",min:Hl,max:Nl,default:Pl},history:{type:5,description:"Stored prompts",render:Qm},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Ai=new Map,N=0,Hi="",fe=!1,Xn=!1,Ri=0,Yn=null,Ni,Ii=null,Rl=!0;function ne(){let e=vr.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Il(e){let t=ve(Number(vr.store.maxEntries??Pl),Hl,Nl);return e.length>t?e.slice(e.length-t):e}function xr(e){vr.store.entries=Il(e)}function _m(e){return e.replaceAll(Mi,"").replace(/\n$/,"").trim()}function Pi(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(le);return n instanceof HTMLElement?n:D()}function qm(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!z(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(Mi,"").trim().length===0,last:i.toString().replaceAll(Mi,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Ol(e){clearTimeout(Ni),Ni=setTimeout(()=>{if(e!==Ri)return;Xn=!1;let t=Ii;t&&vi(t,Rl)},Dm)}function Bl(e,t,n){Xn=!0,Ii=e,Rl=n;let o=++Ri;Ee(e,t,n),Ol(o)}function Fm(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function Bt(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function jm(){document.querySelector(".bloom-ih-hud")?.remove()}function zm(e,t){let n=Fm();n.textContent=e;let o=(t.closest("form")??J()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-Bm)}px`,n.classList.add("bloom-ih-hud-on")}function Oi(e){let t=_m(e);if(!t)return;let n=Date.now(),o=Ai.get(t);if(o&&n-o<$m)return;Ai.set(t,n);let r=ne().filter(i=>i!==t);r.push(t),xr(r),N=ne().length,fe=!1,Bt()}function Gm(e,t){let n=ne();if(!n.length&&e)return;N>=n.length&&(Hi=z(t),N=n.length);let o=e?N-1:N+1;o<0||o>n.length||(N=o,fe=!0,Bl(t,o===n.length?Hi:n[o],e),o<n.length?zm(`${o+1} / ${n.length}`,t):Bt())}function Km(e){fe=!1,Bt(),Bl(e,Hi,!1),N=ne().length}function Um(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=Pi(e.target)??Pi(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&fe&&!e.altKey&&!e.shiftKey){Km(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){Oi(z(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=ne();if(!o){let i=qm(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||N<=0)||!n&&N>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),Gm(n,t))}function Vm(e){if(Pi(e.target)){if(Xn){Ol(Ri);return}fe&&(fe=!1,Bt(),N=ne().length)}}function Wm(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(le);n instanceof HTMLElement&&Oi(z(n))}function Ym(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(Ht);if(!n||!(n instanceof HTMLElement)||C(n))return;let o=D();o&&Oi(z(o))}function Xm(e){if(!(!fe||Xn)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}fe=!1,Bt()}}function Jm(){if(Yn)return;Yn=new AbortController;let{signal:e}=Yn,t={capture:!0,signal:e};window.addEventListener("keydown",Um,t),window.addEventListener("input",Vm,t),window.addEventListener("submit",Wm,t),window.addEventListener("click",Ym,t),window.addEventListener("pointerdown",Xm,t)}function Zm(e){let t=ne().slice();t.splice(e,1),xr(t),N>t.length&&(N=t.length)}function Qm(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=ne().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(f=>f.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/yr));n>=l&&(n=l-1);let c=s.slice(n*yr,n*yr+yr);e.replaceChildren();let d=document.createElement("input");if(d.className="bloom-ih-search",d.type="search",d.placeholder="Search history",d.autocomplete="off",d.value=t,d.addEventListener("input",()=>{t=d.value,n=0,r()}),e.appendChild(d),c.length){let f=document.createElement("div");f.className="bloom-ih-list",c.forEach((T,_)=>{let F=i.indexOf(T),yn=ne().length-1-F,Et=document.createElement("div");Et.className="bloom-ih-item";let Ae=document.createElement("button");Ae.type="button",Ae.className=`bloom-ih-body${o===_?"":" bloom-ih-clamp"}`,Ae.textContent=T,Ae.addEventListener("click",()=>{o=o===_?-1:_,r()});let vn=document.createElement("div");vn.className="bloom-ih-actions";let wt=document.createElement("button");wt.type="button",wt.title="Copy",wt.textContent="C",wt.addEventListener("click",()=>{qa(T)});let We=document.createElement("button");We.type="button",We.title="Delete",We.textContent="\xD7",We.addEventListener("click",()=>{Zm(yn),r()}),vn.append(wt,We),Et.append(Ae,vn),f.appendChild(Et)}),e.appendChild(f)}else{let f=document.createElement("p");f.className="bloom-ih-empty",f.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(f)}let u=document.createElement("div");u.className="bloom-ih-pager";let m=document.createElement("button");m.type="button",m.className="bloom-ih-btn",m.textContent="Prev",m.disabled=n<=0,m.addEventListener("click",()=>{n-=1,r()});let S=document.createElement("span");S.textContent=`${n+1} / ${l}`;let w=document.createElement("button");w.type="button",w.className="bloom-ih-btn",w.textContent="Next",w.disabled=n+1>=l,w.addEventListener("click",()=>{n+=1,r()});let g=document.createElement("button");g.type="button",g.className="bloom-ih-clear",g.textContent="Clear all",g.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(xr([]),N=0,r())}),u.append(m,S,w,g),e.appendChild(u)};return r(),()=>{e.replaceChildren()}}var Dl=p({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:vr,startAt:"HostReady",managedStyle:"inputHistory",start(){E("inputHistory",Al),N=ne().length,fe=!1,Jm()},stop(){Yn?.abort(),Yn=null,Bt(),jm(),Ai.clear(),clearTimeout(Ni),Xn=!1,Ii=null,fe=!1},onSettingsChange(){let e=ne(),t=Il(e);t.length!==e.length&&xr(t),N>t.length&&(N=t.length)}});var Bi="noShareLink",ef=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],tf=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],Di=x({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function $l(e){return`${e.join(",")}{display:none!important}`}function _l(){let e=[];if(Di.store.hideShareChat!==!1&&e.push($l(ef)),Di.store.hideShareProject!==!1&&e.push($l(tf)),!e.length){y(Bi);return}E(Bi,e.join(`
`))}var ql=p({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[h.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Di,start:_l,onSettingsChange:_l,stop(){y(Bi)}});var zl="noDictation",nf=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],of=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Gl=x({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Fl(e){return`${e.join(",")}{display:none!important}`}function jl(){let e=[Fl(nf)];Gl.store.hideDictationSettings!==!1&&e.push(Fl(of)),E(zl,e.join(`
`))}var Kl=p({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Gl,start:jl,onSettingsChange:jl,stop(){y(zl)}});var $i="noSidebarIdentity",Dt=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Wl=Dt.flatMap(e=>[`${e} .min-w-0 > .truncate`,`${e} .min-w-0.flex-1 .truncate`]),Yl=Dt.flatMap(e=>[`${e} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),rf=[...Wl,...Yl],af=[...Wl,...Dt.flatMap(e=>[`${e} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],sf=Dt.map(e=>`${e} a[href^="mailto:"]`),lf=Dt.flatMap(e=>[`${e} .min-w-0 > :not(.truncate)`,`${e} .min-w-0 > :not(.truncate) *`,`${e} .min-w-0 .text-xs`,`${e} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${e} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${e} .text-xs:not(.truncate)`,`${e} .text-token-text-secondary:not(.truncate)`,`${e} .text-token-text-tertiary:not(.truncate)`,`${e} .min-w-0 ~ *`,`${e} .min-w-0 ~ * *`,`${e} > .text-xs`,`${e} > .text-token-text-secondary`,`${e} > .text-token-text-tertiary`]),cf=Dt.flatMap(e=>[`${e} .min-w-0.flex-col > :not(.truncate)`,`${e} .min-w-0.flex-col > .text-xs`,`${e} .min-w-0.flex-col > .text-token-text-secondary`,`${e} .min-w-0.flex-col > .text-token-text-tertiary`,`${e} .min-w-0:not(.flex) > :not(.truncate)`,`${e} .min-w-0:not(.flex) > .text-xs`,`${e} .min-w-0:not(.flex) > .text-token-text-secondary`,`${e} .min-w-0:not(.flex) > .text-token-text-tertiary`]),Jn=x({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function Ul(e){return`${e.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function df(e){return`${e.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function uf(){return`${cf.join(",")}{margin-block:auto!important}`}function mf(){return`${lf.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function Vl(){let e=Jn.store.hideUsername!==!1,t=Jn.store.hideEmail!==!1,n=e&&Jn.store.enlargePlan!==!1,o=e&&Jn.store.alignPlanWithAvatar===!0,r=[];if(e&&(o?(r.push(df([...af,...Yl])),r.push(uf())):r.push(Ul(rf))),t&&r.push(Ul(sf)),n&&r.push(mf()),!r.length){y($i);return}E($i,r.join(`
`))}var Xl=p({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[h.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Jn,start:Vl,onSettingsChange:Vl,stop(){y($i)}});var Jl=`#bloom-rt-host {
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
`;var ec=new v("RecentTopics"),qt="bloom-rt-host",tc="home",nc=/^\/c\/([a-z0-9_-]{8,})/i,pf=/\/c\/([a-z0-9_-]{8,})/i,oc=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,gf=new Set(["Backquote","IntlBackslash"]),bf=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),hf=140,yf=[3,4,5,6,7,8,9,10,11,12].map(e=>({label:String(e),value:String(e),default:e===5})),P=x({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:yf},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),Er=null,qi=null,q=!1,oo=!1,Zn=!1,pe=0,ct="",$t=null,Qn=null,_t,_i=null;function vf(){let e=Number(P.store.maxRecent??5);return Number.isFinite(e)&&e>=3&&e<=12?e:5}function eo(){let e=P.plain.visits;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Fi(){let e=P.plain.titles;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function rc(){let e=P.plain.previews;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function ji(){let e=P.plain.projects;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Sr(e){let t=vf();return e.length>t?e.slice(0,t):e}function ge(e){return e===tc}function to(e,t=hf){let n=e.replace(/\s+/g," ").trim();return n.length<=t?n:`${n.slice(0,t-1)}\u2026`}function zi(e){if(!e)return"";try{return new URL(e,location.origin).pathname.match(nc)?.[1]??""}catch{return e.match(pf)?.[1]??""}}function dt(){let e=(location.pathname||"/").match(nc);if(e?.[1])return e[1];let n=G().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return tc}function Gi(e){if(ge(e))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${e}"]`);for(let o of n){if(zi(o.getAttribute("href")||"")!==e)continue;let r=to(o.textContent||"",80);if(r)return r}}catch{}let t=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return dt()===e&&t&&!/^ChatGPT$/i.test(t)?to(t,80):""}function xf(e){if(ge(e))return"New chat";let t=Fi()[e];if(t)return t;let n=Rt(e);return n||Gi(e)||"Chat"}function Ef(e){return ji()[e]||""}function wf(e){return rc()[e]||{}}function Ki(e,t){if(!e||ge(e)||!t||/^new chat$/i.test(t.trim()))return;let n=Fi();n[e]!==t&&(n[e]=t,P.store.titles=n)}function Sf(e){e.type==="conversation-meta"&&(Ki(e.conversationId,e.title),q&&Ft())}function Tf(e,t){if(!e||ge(e)||!t)return;let n=ji();n[e]!==t&&(n[e]=t,P.store.projects=n)}function Lf(e,t){if(!e||ge(e)||!t.user&&!t.assistant)return;let n=rc(),o=n[e]||{},r={user:t.user||o.user,assistant:t.assistant||o.assistant};o.user===r.user&&o.assistant===r.assistant||(n[e]=r,P.store.previews=n)}function Ui(e){if(!e||ge(e)&&P.store.includeHome===!1)return;let t=eo().filter(n=>n!==e);t.unshift(e),P.store.visits=Sr(t)}function Tr(){let e=P.store.includeHome!==!1;return Sr(eo().filter(n=>e||!ge(n))).map(n=>({id:n,title:xf(n),project:Ef(n),preview:wf(n)}))}function Zl(e){try{let t=document.querySelectorAll(`[data-message-author-role="${e}"]`),n=t[t.length-1];if(!(n instanceof HTMLElement))return"";let o=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||o.push(a)}let r=o.length?o.join(" "):n.textContent||"";return to(r)}catch{return""}}function no(e){if(!e||ge(e)||e!==dt())return;let t=Gi(e);t&&Ki(e,t);let n=Zl("user"),o=Zl("assistant");Lf(e,{user:n,assistant:o});let r=ac(e);if(r){let i=ic(r);i&&Tf(e,i)}}function Vi(){let e=Fi(),t=ji(),n=[],o=new Set,r=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${qt}, #bloom-root, #bloom-sidebar-panel`))continue;let d=zi(c.getAttribute("href")||"");if(!d||o.has(d))continue;o.add(d),n.push(d);let u=to(c.textContent||"",80);u&&!oc.test(u)&&e[d]!==u&&(e[d]=u,r=!0);let m=ic(c);m&&t[d]!==m&&(t[d]=m,i=!0)}}catch{}r&&(P.store.titles=e),i&&(P.store.projects=t);let a=eo(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(P.store.visits=Sr([...a,...l]))}function ic(e){let t=e.parentElement;for(let n=0;n<10&&t;n++){if(t.id==="bloom-rt-host"||t.id==="bloom-root"){t=t.parentElement;continue}let o=t.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),r=to((o instanceof HTMLElement?o.textContent:"")||"",60);if(r&&!oc.test(r)&&!/^20\d{2}/.test(r)&&r!==e.textContent?.trim()&&t.querySelector('a[href^="/c/"]'))return r;t=t.parentElement}return""}function ac(e){if(ge(e)){let t=document.querySelector('[data-testid="create-new-chat-button"]');return t instanceof HTMLAnchorElement?t:document.querySelector('a[href="/"]')}try{for(let t of document.querySelectorAll(`a[href*="/c/${e}"]`))if(zi(t.getAttribute("href")||"")===e)return t}catch{}return null}function kf(e){let t=ac(e);if(t){t.click();return}if(ge(e)){location.assign("/");return}location.assign(`/c/${e}`)}function Cf(){let e=dt();ct&&ct!==e&&no(ct),ct=e,Ui(e),Vi();let t=Gi(e);t&&Ki(e,t),no(e)}function wr(){_t===void 0&&(_t=window.setTimeout(()=>{_t=void 0,Cf()},120))}function Mf(){$t||($t=history.pushState.bind(history),Qn=history.replaceState.bind(history),history.pushState=function(...t){let n=$t(...t);return wr(),n},history.replaceState=function(...t){let n=Qn(...t);return wr(),n})}function Af(){$t&&(history.pushState=$t),Qn&&(history.replaceState=Qn),$t=null,Qn=null}function Hf(e){return gf.has(e.code)||e.keyCode===192?!0:bf.has(e.key)}function sc(e){return e.key==="Control"||e.code==="ControlLeft"||e.code==="ControlRight"}function Nf(e,t){oo=t,Vi(),no(dt()),q=!0,pe=0;try{let n=dt();Ui(n);let o=Tr();o.length>1&&(pe=e?o.length-1:1)}catch(n){ec.error("Failed to open switcher:",n)}Ft()}function Ql(e){let{length:t}=Tr();t&&(pe=(pe+(e?-1:1)+t)%t,Ft())}function Wi(){if(!q)return;let e=Tr()[pe];q=!1,oo=!1,Ft(),e&&kf(e.id)}function lc(){q&&(q=!1,oo=!1,Ft())}function Pf(e){if(sc(e)){Zn=!0;return}if((e.ctrlKey||Zn)&&!e.altKey&&!e.metaKey&&Hf(e)&&!e.repeat){e.preventDefault(),e.stopImmediatePropagation();try{q?Ql(e.shiftKey):Nf(e.shiftKey,!0)}catch(n){ec.error("Hotkey failed:",n)}return}if(q){if(e.key==="Escape"){e.preventDefault(),lc();return}if(e.key==="Enter"&&!e.shiftKey){e.preventDefault(),Wi();return}e.key==="Tab"&&(e.ctrlKey||Zn)&&(e.preventDefault(),Ql(e.shiftKey))}}function Rf(e){sc(e)&&(Zn=!1,q&&oo&&Wi())}function If(e){let t=e.target instanceof Element?e.target:null;!t||!t.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(wr)}function Of(e){!q||(e.target instanceof Element?e.target:null)?.closest(`#${qt}`)||lc()}function Bf(){document.visibilityState==="hidden"&&no(dt())}function Df(){if(!document.body)return null;let e=document.getElementById(qt);if(e instanceof HTMLElement)return qi=e,e;e=document.createElement("div"),e.id=qt;let t=document.createElement("div");return t.className="bloom-rt-panel",t.setAttribute("role","listbox"),t.setAttribute("aria-label","Recent conversations"),t.dataset.visible="false",t.addEventListener("click",n=>n.stopPropagation()),e.append(t),document.body.append(e),qi=e,e}function Ft(){let e=Df();if(!e)return;let t=e.querySelector(".bloom-rt-panel");if(!t)return;if(!q){t.dataset.visible="false",t.replaceChildren();return}let n=Tr();if(!n.length){t.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",t.replaceChildren(i);return}pe>=n.length&&(pe=0);let o=document.createElement("div");o.className="bloom-rt-list",o.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===pe?"true":"false",s.setAttribute("aria-selected",a===pe?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="user",d.textContent=i.preview.user,c.append(d)}if(i.preview.assistant){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="assistant",d.textContent=i.preview.assistant,c.append(d)}s.append(c)}s.addEventListener("click",()=>{pe=a,Wi()}),o.append(s)}),t.replaceChildren(o),t.dataset.visible="true",t.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function $f(){document.getElementById(qt)?.remove(),qi=null}var cc=p({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${qt}`],settings:P,start(){E("recentTopics",Jl),ct=dt(),Ui(ct),Vi(),no(ct),_i=K(Sf),Mf(),Er=new AbortController;let{signal:e}=Er;window.addEventListener("keydown",Pf,{capture:!0,signal:e}),window.addEventListener("keyup",Rf,{capture:!0,signal:e}),window.addEventListener("popstate",wr,{signal:e}),document.addEventListener("click",If,{capture:!0,signal:e}),document.addEventListener("click",Of,{signal:e}),document.addEventListener("visibilitychange",Bf,{signal:e})},stop(){Er?.abort(),Er=null,_t!==void 0&&(clearTimeout(_t),_t=void 0),Af(),_i?.(),_i=null,q=!1,oo=!1,Zn=!1,$f()},onSettingsChange(){let e=Sr(eo());e.length!==eo().length&&(P.store.visits=e),q&&Ft()}});var Yi="cleaner",_f=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],qf=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],Ff=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],jf=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],zf=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],Gf=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],ut=x({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function jt(e){return`${e.join(",")}{display:none!important}`}function dc(){let e=[];if(ut.store.hideDownloadApps!==!1&&e.push(jt(_f)),ut.store.hideDisclaimer!==!1&&e.push(jt(qf)),ut.store.hideUpgrade!==!1&&e.push(jt(Ff)),ut.store.hideLockedModels!==!1&&e.push(jt(jf)),ut.store.hideHomePromo!==!1&&e.push(jt(zf)),ut.store.hideAds!==!1&&e.push(jt(Gf)),!e.length){y(Yi);return}E(Yi,e.join(`
`))}var uc=p({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[h.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:ut,start:dc,onSettingsChange:dc,stop(){y(Yi)}});var kr=new v("ResponseNotification"),Gt=x({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:Jf},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Xi=!1,Lr=null,zt=null,ro=null;function Kf(){return document.visibilityState==="hidden"||document.hidden}function Uf(){return Gt.store.onlyWhenHidden===!1?!0:Kf()}function Vf(){let e=Rt(L());if(e)return e;let t=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return t&&!/^ChatGPT$/i.test(t)?t:"Chat"}function mc(){try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!zt||zt.state==="closed")&&(zt=new e);let t=zt,n=t.currentTime,o=[523.25,659.25];for(let r=0;r<o.length;r++){let i=t.createOscillator(),a=t.createGain();i.type="sine",i.frequency.value=o[r];let s=n+r*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(t.destination),i.start(s),i.stop(s+.24)}t.resume?.()}catch(e){kr.debug("chime failed",e)}}function Wf(e){try{let t=new Audio(e);t.volume=.7,t.play()}catch(t){kr.debug("custom sound failed",t),mc()}}function fc(){let e=String(Gt.store.soundUrl||"").trim();e?Wf(e):mc()}function Yf(){let e="Bloom++",t=`${Vf()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:e,text:t,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(e,{body:t,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){kr.debug("notification failed",n)}}function Xf(){Uf()&&(Gt.store.sound!==!1&&fc(),Gt.store.browserNotification!==!1&&Yf())}function Jf(e){let t=document.createElement("button");return t.type="button",t.textContent="Play",t.addEventListener("click",()=>fc()),e.appendChild(t),()=>{t.remove()}}var pc=p({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Gt,start(){Xi=!0,Lr?.(),Lr=U(e=>{Xi&&(e.userStopped||e.error||Xf())}),ro?.abort(),ro=new AbortController,Gt.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:ro.signal}),kr.debug("watch started")},stop(){Xi=!1,Lr?.(),Lr=null,ro?.abort(),ro=null;try{zt?.close()}catch{}zt=null}});var gc=`#bloom-pq-chip {
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
`;var lo=new v("PromptQueue"),Zi="bloom-pq-chip",bc="promptQueue",hc=80,Qf=50,ep=2e3,Ec=x({replacePending:{type:2,description:"Replace the queued prompt if you Enter again while one is waiting.",default:!0}}),I=new Map,Se=!1,oe="",R="",Ge=!1,re=!1,M=null,io=null,Cr=null,so,ao,Kt=null;function Ut(){return we(G())}function Vt(e){return e.replaceAll("\u200B","").replace(/\n$/,"").trim()}function yc(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(le);return n instanceof HTMLElement?n:D()}function Qi(e){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation()}function wc(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function tp(){try{let e=document.querySelectorAll('[data-message-author-role="user"]'),t=e[e.length-1];return t instanceof HTMLElement?Vt(t.innerText||t.textContent||""):""}catch{return""}}function np(e,t){if(!e||e===t)return!1;if(e.endsWith("|draft")&&!t.endsWith("|draft"))return!0;try{let n=e.split("|")[0],o=t.split("|")[0],r=new URL(n).pathname.replace(/\/$/,"")||"/",i=new URL(o).pathname.replace(/\/$/,"")||"/";if((r==="/"||r==="")&&i.startsWith("/c/"))return!0}catch{}return!1}function vc(e){if(!oe||oe===e)return;let t=I.get(oe);!t||I.has(e)||np(oe,e)&&(I.delete(oe),I.set(e,t),R===oe&&(R=e),M?.key===oe&&(M.key=e),lo.debug("migrated pending",oe,"\u2192",e))}function ea(e){let t=Ut();if(I.get(t)&&Ec.store.replacePending===!1)return;I.set(t,{text:e,at:Date.now()}),M={key:t,text:e,turns:wc(),ticks:3};let o=D();o&&Ee(o,""),ze(),lo.debug("queued",t,e.length)}function op(e){I.delete(e),R===e&&(R=""),M?.key===e&&(M=null),ze()}function rp(){re=!0,clearTimeout(ao),ao=setTimeout(()=>{re=!1,ao=void 0},ep)}function ip(){let e=Ut(),t=I.get(e);if(!t)return;let n=D();if(!n)return;I.delete(e),R="",ze(),rp(),Ee(n,t.text);let o=$e();o&&!C(o)&&!rr(o)&&(o.click(),re=!1)}function xc(e){if(!Se||Ge||H()||Ut()!==e)return;let t=I.get(e);if(!t){R="";return}if(Q())return;let n=D();if(!n)return;if(!De(n)){let r=Vt(z(n));if(r&&r!==t.text)return}let o=$e();!o||C(o)||rr(o)||(Ge=!0,Ee(n,t.text),clearTimeout(so),so=setTimeout(()=>ap(e,t.text),Qf))}function ap(e,t){so=void 0;try{if(!Se)return;let n=I.get(e);if(!n||n.text!==t||H()||Ut()!==e)return;let o=D();if(!o)return;let r=Vt(z(o));if(r&&r!==t&&!De(o))return;r!==t&&Ee(o,t);let i=$e();if(!i||C(i)||rr(i))return;i.click(),I.delete(e),R="",ze(),lo.debug("drained",e)}finally{Ge=!1}}function Sc(e){let t=J();if(!t||t===document.body){e.style.left="50%",e.style.bottom="6.5rem";return}let n=t.getBoundingClientRect();e.style.left=`${Math.round(n.left+n.width/2)}px`,e.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`;let o=Math.min(512,Math.max(160,n.width-24));e.style.maxWidth=`${Math.round(o)}px`}function Ji(){Kt?.remove(),Kt=null}function ze(){if(!Se||!document.body){Ji();return}let e=Ut(),t=I.get(e);if(!t){Ji();return}let n=Kt;n?.isConnected||(n=document.createElement("div"),n.id=Zi,document.body.appendChild(n),Kt=n),n.replaceChildren();let o=document.createElement("span");o.className="bloom-pq-kicker",o.textContent="Next";let r=document.createElement("span");r.className="bloom-pq-text";let i=t.text.length>hc?`${t.text.slice(0,hc)}\u2026`:t.text;r.textContent=i,r.title=t.text;let a=document.createElement("div");a.className="bloom-pq-actions";let s=document.createElement("button");s.type="button",s.className="bloom-pq-btn bloom-pq-send",s.textContent="Send now",s.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),ip()});let l=document.createElement("button");l.type="button",l.className="bloom-pq-btn bloom-pq-x",l.setAttribute("aria-label","Dismiss queued prompt"),l.textContent="\xD7",l.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),op(e)}),a.append(s,l),n.append(o,r,a),Sc(n)}function sp(){if(!M)return;if(M.ticks-=1,I.get(M.key)&&wc()>M.turns){let t=tp();if(t&&t===M.text){lo.debug("native send leaked; dropping pending"),I.delete(M.key),R===M.key&&(R=""),M=null,ze();return}}M.ticks<=0&&(M=null)}function lp(e){if(!Se||e.isComposing||e.keyCode===229||e.key!=="Enter"||e.shiftKey||e.ctrlKey||e.metaKey||Ge)return;let t=yc(e.target)??yc(document.activeElement);if(!t||!H())return;if(e.altKey||re){re=!1;return}if(!Z(t))return;let n=Vt(z(t));n&&(Qi(e),ea(n))}function cp(e){let t=e.closest("button");if(!(t instanceof HTMLElement)||C(t))return null;let n=e.closest(Ht);if(n instanceof HTMLElement&&!C(n))return n;let o=$e();return o&&(t===o||o.contains(t)||t.contains(o))?o:null}function dp(e){if(!Se)return;let t=e.target;if(!(t instanceof Element)||t.closest(`#${Zi}`))return;let n=t.closest("button");if(n instanceof HTMLElement&&C(n)||Ge||!H()||!cp(t))return;if(re){re=!1;return}let o=D();if(!o||!Z(o))return;let r=Vt(z(o));r&&(Qi(e),ea(r))}function up(e){if(!Se)return;let t=e.target;if(!(t instanceof HTMLFormElement)||!t.matches(or)&&!t.querySelector(le)||Ge||!H())return;if(re){re=!1;return}let n=D()??t.querySelector(le);if(!n||!Z(n))return;let o=Vt(z(n));o&&(Qi(e),ea(o))}var Tc=p({name:"PromptQueue",description:"Queue the next prompt while a reply is streaming. Enter/Send waits for this turn instead of interrupting.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:bc,cleanupSelectors:[`#${Zi}`],settings:Ec,start(){Se=!0,oe=Ut(),R="",Ge=!1,re=!1,M=null,E(bc,gc),io?.abort(),io=new AbortController;let{signal:e}=io;window.addEventListener("keydown",lp,{capture:!0,signal:e}),document.addEventListener("click",dp,{capture:!0,signal:e}),document.addEventListener("submit",up,{capture:!0,signal:e}),Cr?.(),Cr=U({onFall(t){if(Se){if(t.userStopped||t.error){R="",ze();return}R=t.contextKey,xc(t.contextKey)}},onContext(t){vc(t),oe=t,ze()},onTick(t){vc(t.contextKey),oe=t.contextKey,sp(),R&&R===t.contextKey&&xc(R),Kt&&Sc(Kt)}}),ze(),lo.debug("watch started")},stop(){Se=!1,Cr?.(),Cr=null,io?.abort(),io=null,clearTimeout(so),so=void 0,clearTimeout(ao),ao=void 0,I.clear(),M=null,R="",Ge=!1,re=!1,Ji()}});var Lc=`.bloom-cls {
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
`;var Mc=new v("ChatListStatus"),kc="chatListStatus",Hr="bloom-cls",fp="bloom-cls",pp=1200*1e3,gp="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",be=new Map,Le=!1,Wt="",Te=!1,Xt=0,Ke=null,oa=null,Yt=null,ta=null,Mr=null,Jt=!1,Zt=new Set;function Ar(){return Date.now()}function Ac(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function mt(e,t,n,o=!0){if(!(!e||!Le)){if(t==="idle")be.delete(e);else{let r=be.get(e);r&&r.kind===t&&n!=="net"?r.at=Ar():be.set(e,{kind:t,at:Ar(),source:n})}o&&bp({v:1,id:e,kind:t,at:Ar()}),co()}}function bp(e){try{Yt?.postMessage(e)}catch{}}function hp(e){let t=e.data;!t||t.v!==1||!t.id||t.kind!=="streaming"&&t.kind!=="done"&&t.kind!=="error"&&t.kind!=="idle"||mt(t.id,t.kind,"bc",!1)}function yp(){let e=Ar();for(let[t,n]of be)n.kind==="streaming"&&e-n.at>pp&&be.delete(t)}function vp(){let e=Ac();if(!e)return[];let t=[],n=new Set;try{for(let o of e.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(o.closest(gp))continue;let r=Nt(o.getAttribute("href")||"");!r||n.has(r)||(n.add(r),t.push(o))}}catch{}return t}function Cc(e){let t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),e==="streaming")t.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("cx","12"),o.setAttribute("cy","12"),o.setAttribute("r","9"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","2"),t.appendChild(o)}return t.appendChild(n),t}function na(e){let t=e.querySelector(`:scope > .${Hr}`);return t||null}function xp(){if(!Le)return;yp();let e=L(),t=vp();Ke?.disconnect();try{for(let n of t){let o=Nt(n.getAttribute("href")||"");if(!o||!e||o!==e){na(n)?.remove();continue}let i=be.get(o)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){na(n)?.remove();continue}let a=na(n);a||(a=document.createElement("span"),a.className=Hr,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(Cc("streaming")):i==="error"&&a.appendChild(Cc("error")))}}catch(n){Mc.debug("paint failed",n)}Hc()}function co(){!Le||Xt||(Xt=requestAnimationFrame(()=>{Xt=0,Le&&xp()}))}function Hc(){let e=Ac();if(!(Ke&&oa===e&&e?.isConnected)){if(Ke?.disconnect(),oa=e,!e){Ke=null;return}Ke=new MutationObserver(()=>co()),Ke.observe(e,{childList:!0,subtree:!0})}}function ra(){return!!(et()||Kn())}function Ep(e){return!!(Jt||e&&Zt.has(e)||ra())}function wp(e){if(Le){if(e.type==="post-start"){e.conversationId?(Jt=!1,Zt.add(e.conversationId),Te=!0,mt(e.conversationId,"streaming","net")):(Jt=!0,Te=!0);return}e.type==="post-end"&&(Jt=!1,e.conversationId&&(Zt.delete(e.conversationId),mt(e.conversationId,e.error?"error":"done","net")),ra()||(Te=!1))}}function Sp(){if(!Le)return;let e=L();if(!(Jt||e&&Zt.has(e))){if(Te=!1,e&&be.get(e)?.kind==="streaming"&&be.get(e)?.source==="local"){mt(e,"idle","local");return}co()}}function Tp(e){if(!Le)return;let t=e.conversationId||L();if(Wt&&t&&Wt!==t){let o=be.get(Wt);o?.kind==="streaming"&&o.source==="local"&&mt(Wt,Q()?"error":"done","local"),Te=!!(t&&Zt.has(t))}if(Wt=t,Ep(t)&&(e.streaming||ra())){Te=!0,t&&mt(t,"streaming","local"),co();return}Te&&(Te=!1,t&&mt(t,Q()?"error":"done","local")),co()}var Nc=p({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Hr}`],start(){Le=!0,E(kc,Lc);try{Yt=new BroadcastChannel(fp)}catch{Yt=null}Yt?.addEventListener("message",hp),ta=K(wp),Mr?.(),Mr=U({onTick:Tp,onContext:Sp}),Hc(),Mc.debug("sidebar status watch started")},stop(){Le=!1,Xt&&cancelAnimationFrame(Xt),Xt=0,Ke?.disconnect(),Ke=null,oa=null,Mr?.(),Mr=null,ta?.(),ta=null;try{Yt?.close()}catch{}Yt=null,be.clear(),Zt.clear(),Jt=!1,Te=!1,Wt="",document.querySelectorAll(`.${Hr}`).forEach(e=>e.remove()),y(kc)}});var Rc="widerChat",Ic=40,Oc=96,Bc=64,Dc=x({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:Ic,max:Oc,default:Bc}});function Lp(){return ve(Number(Dc.store.width??Bc),Ic,Oc)}function Pc(){let e=Lp(),t=`min(100%,${e}rem)`;E(Rc,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important;--user-chat-width:${e}rem!important;--composer-container-max-width:${e}rem!important;--thread-xl-max-width:${e}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${t}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${t}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${t}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${t}!important}`)}var $c=p({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[h.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Dc,start:Pc,onSettingsChange:Pc,stop(){y(Rc)}});var ia="composerOpacity",Qt='form[data-type="unified-composer"],form.w-full[data-type]',kp=[`${Qt} [class*="corner-superellipse"]`,`${Qt} [class*="bg-token-bg-primary"]`,`${Qt} [class*="bg-token-main-surface"]`].join(","),Cp=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),Mp="#thread-bottom-container,#thread-bottom",Ap=`${Qt} #prompt-textarea,${Qt} [contenteditable="true"]`,Hp="var(--bg-primary,var(--main-surface-primary,#ffffff))",aa=x({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function Np(){return ve(Number(aa.store.opacity??100),0,100)}function Pp(){return ve(Number(aa.store.blur??16),0,40)}function _c(){let e=Np();if(e>=100){y(ia);return}let t=Pp(),n=`color-mix(in srgb,${Hp} ${e}%,transparent)`,o=t>0?`-webkit-backdrop-filter:blur(${t}px)!important;backdrop-filter:blur(${t}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";E(ia,`${Mp}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Cp}{display:none!important}${Qt}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${kp}{background-color:${n}!important;background-image:none!important;${o}}${Ap}{background-color:transparent!important;background-image:none!important}`)}var qc=p({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[h.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:aa,start:_c,onSettingsChange:_c,stop(){y(ia)}});var Fc=`#bloom-bn-host {
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
`;var Ip=new v("BetterNavigator"),sa="betterNavigator",jc="bloom-bn-host",da=60,Op=16,Bp=1e3,Dp=2.5,$p=.4,Pr="\u6B63\u5728\u8F93\u51FA\u2026",_p=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),qp=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='thinking']","[class*='reasoning']","[class*='footnote']",".sr-only"].join(", "),Fp=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),Dr=x({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),en=new Map,tn=new Set,he=!1,gt=!1,Ue=null,go=null,bt=null,Rr=null,O=[],ht="",Ir=0,Or=-1,ga=0,Br="",nn=0,on=0,uo,mo=null,Nr=null,la=null,ca=null,ft=null,ua=null,fo=null,pt=null,rn=null,po=null;function $r(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function jp(e){try{return!!e.closest(_p)}catch{return!0}}function zp(e){let t=(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||e.getAttribute("data-turn")||"").toLowerCase();if(t==="user"||t==="assistant")return t;let n=(e.getAttribute("aria-label")||"").toLowerCase();return n.includes("you said")?"user":n.includes("chatgpt said")||n.includes("assistant said")?"assistant":null}function zc(e){let t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode(r){let i=r.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(i.closest(qp))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return(r.textContent||"").replace(/\s+/g," ").trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),o;for(;(o=n.nextNode())&&t.join(" ").length<da+20;)t.push((o.textContent||"").replace(/\s+/g," ").trim());return t.join(" ").replace(/\s+/g," ").trim()}function Gp(e,t){try{if(e.querySelector("img, picture, video, canvas"))return"Image";if(e.querySelector("a[download], [class*='attachment']"))return"File";if(e.querySelector("pre, code"))return"Code"}catch{}return`Message ${t+1}`}function Kp(e,t){let n=t==="user"?e.querySelector(".whitespace-pre-wrap")??e:e.querySelector(".markdown")??e;return zc(n)}function Up(e){return e.length>da?`${e.slice(0,da).trimEnd()}\u2026`:e}function Vp(e,t,n,o){let r=Kp(e,t);return r?Up(r):o?Pr:Gp(e,n)}function Wp(){if(gt)return!0;let e=L();return!!(e&&tn.has(e)||et()||Kn())}function Yp(e){try{if(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")||e.querySelector("[aria-busy='true'], .result-streaming"))return!0;let t=e.querySelector(".markdown");if((!t||t instanceof HTMLElement&&!zc(t))&&e.querySelector("[class*='thinking'], [class*='reasoning'], details"))return!0}catch{}return!1}function Xp(){let e=$r();if(!e||e===document.body)return[];let t=Dr.store.showAssistant!==!1,n=t&&Wp(),o=[];try{for(let r of e.querySelectorAll("[data-message-id]")){if(jp(r))continue;let i=r.getAttribute("data-message-id")||"";if(!i)continue;let a=zp(r);if(a!=="user"&&a!=="assistant"||a==="assistant"&&!t)continue;let s=a==="assistant"&&n&&Yp(r),l=Vp(r,a,o.length,s);l&&l!==Pr&&l!==en.get(i)&&en.set(i,l);let c=s&&l===Pr?Pr:en.get(i)||l;o.push({id:i,el:r,role:a,text:c,live:s})}}catch{}return o}function Jp(){let t=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(t,48),88)}function Gc(e){let t=e;for(;t&&t!==document.body&&t!==document.documentElement;){let o=getComputedStyle(t).overflowY;if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight+8)return t;t=t.parentElement}return window}function Zp(e){return e===window?window.innerHeight:e.clientHeight}function Qp(e){let t=e instanceof Element?e:e instanceof Node?e.parentElement:null;if(!t)return!1;try{return!!t.closest(Fp)}catch{return!1}}function Kc(){uo!==void 0&&(clearTimeout(uo),uo=void 0),mo?.classList.remove("bloom-bn-flash"),mo=null}function eg(e){Kc(),e.classList.add("bloom-bn-flash"),mo=e,uo=setTimeout(()=>{e.classList.remove("bloom-bn-flash"),mo===e&&(mo=null),uo=void 0},800)}function ma(e){if(!O.length)return;let t=Math.max(0,Math.min(e,O.length-1));Ir=t,go?.querySelectorAll(".bloom-bn-tick").forEach((o,r)=>{o.classList.toggle("bloom-bn-current",r===t)}),bt?.querySelectorAll(".bloom-bn-item").forEach((o,r)=>{o.classList.toggle("bloom-bn-active",r===t)}),Rr&&(Rr.textContent=`${t+1} / ${O.length}`);let n=bt?.children[t];if(n instanceof HTMLElement){let o=bt;if(o){let r=n.offsetTop-o.clientHeight/2+n.offsetHeight/2;o.scrollTop=Math.max(0,r)}}}function fa(e){let t=O[e];if(!t?.el.isConnected)return;Or=e,ga=Date.now()+Bp,ma(e);let n=rn??Gc(t.el),r=Math.abs(t.el.getBoundingClientRect().top-Jp())>Dp*Zp(n);t.el.scrollIntoView({behavior:r?"auto":"smooth",block:"start"}),Dr.store.jumpEffect!=="none"&&eg(t.el)}function ba(){if(!he||!O.length)return;if(Date.now()<ga&&Or>=0){ma(Or);return}let e=window.innerHeight*$p,t=0;for(let n=0;n<O.length;n++){let o=O[n].el;o.isConnected&&o.getBoundingClientRect().top<=e&&(t=n)}ma(t)}function tg(e){let t=Gc(e);if(rn===t&&po)return;po?.(),rn=t;let n=t===window?document:t,o=()=>{ba(),ha()};n.addEventListener("scroll",o,{passive:!0}),po=()=>n.removeEventListener("scroll",o)}function ng(e){pt?.disconnect(),pt=null;let t=rn instanceof HTMLElement?rn:null;pt=new IntersectionObserver(()=>ba(),{root:t,threshold:[0,.15,.4,.75,1]});for(let n of e)n.el.isConnected&&pt.observe(n.el)}function og(){if(!document.body)return null;let e=Ue;if(e?.isConnected)return e;e=document.createElement("div"),e.id=jc,e.className="bloom-bn-host",e.setAttribute("role","navigation"),e.setAttribute("aria-label","Conversation outline"),e.hidden=!0;let t=document.createElement("div");t.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let o=document.createElement("div");o.className="bloom-bn-card";let r=document.createElement("div");r.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",o.append(r,i),n.appendChild(o),e.append(t,n),document.body.appendChild(e),Ue=e,go=t,bt=i,Rr=r,e}function Uc(){let e=Ue,t=$r();if(!e||!t||!t.isConnected||O.length<1){e&&(e.hidden=!0);return}let n=t.getBoundingClientRect(),o=document.getElementById("thread-bottom-container"),r=document.getElementById("page-header"),i=Math.max(n.top+8,r?.getBoundingClientRect().bottom??0,8),a=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),s=a-i;if(s<96||n.width<160){e.hidden=!0;return}let l=window.innerWidth-n.right,c=l>=22?Math.max(8,l-16):8;e.hidden=!1,e.style.top=`${Math.round((i+a)/2)}px`,e.style.height="auto",e.style.maxHeight=`${Math.round(s)}px`,e.style.right=`${Math.round(c)}px`,e.style.setProperty("--bloom-bn-cap",`${Math.round(s)}px`)}function ha(){!he||on||(on=requestAnimationFrame(()=>{on=0,he&&Uc()}))}function rg(e){let t=["bloom-bn-tick"];return e.role==="assistant"&&t.push("bloom-bn-tick-asst"),e.live&&t.push("bloom-bn-tick-live"),t.join(" ")}function ig(e){let t=go,n=bt;!t||!n||(t.replaceChildren(),n.replaceChildren(),t.classList.toggle("bloom-bn-dense",e.length>Op),e.forEach((o,r)=>{let i=document.createElement("button");i.type="button",i.className=rg(o),i.setAttribute("aria-label",`Go to message ${r+1} of ${e.length}`),i.addEventListener("click",c=>{c.preventDefault(),fa(r)}),t.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${o.role}`;let s=document.createElement("span");s.className="bloom-bn-mark",s.textContent=o.role==="user"?"You":"GPT";let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=o.text,l.title=o.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),fa(r)}),n.appendChild(a)}))}function ag(e){go?.querySelectorAll(".bloom-bn-tick").forEach((t,n)=>{t.classList.toggle("bloom-bn-tick-live",!!e[n]?.live)}),e.forEach((t,n)=>{let r=bt?.children[n]?.querySelector(".bloom-bn-label");r&&r.textContent!==t.text&&(r.textContent=t.text,r instanceof HTMLElement&&(r.title=t.text))})}function sg(){let e=L();return e===Br?!1:(Br=e,en.clear(),O=[],ht="",Ir=0,Or=-1,ga=0,gt&&e&&(tn.add(e),gt=!1),!0)}function lg(e){let t=Dr.store.showAssistant!==!1?"1":"0";return`${Br}|${t}|${e.map(n=>n.id).join(",")}`}function cg(){if(!he)return;sg();let e=Xp(),t=$r();if(!t||e.length<1){O=e,ht="",Ue&&(Ue.hidden=!0),pt?.disconnect(),pa();return}og();let n=lg(e);n!==ht?(O=e,ht=n,ig(e),tg(t),ng(e)):(O=e,ag(e)),Uc(),ba(),pa()}function ke(){!he||nn||(nn=requestAnimationFrame(()=>{nn=0,he&&cg()}))}function pa(){let e=$r();if(!(ft&&ua===e&&e?.isConnected)){if(ft?.disconnect(),fo?.disconnect(),ua=e,!e||e===document.body){ft=null;return}ft=new MutationObserver(()=>ke()),ft.observe(e,{childList:!0,subtree:!0}),fo=new ResizeObserver(()=>ha()),fo.observe(e)}}function dg(e){if(he){if(e.type==="post-start"){e.conversationId?(gt=!1,tn.add(e.conversationId)):gt=!0,ke();return}if(e.type==="post-end"){if(gt=!1,e.conversationId)tn.delete(e.conversationId);else{let t=L();t&&tn.delete(t)}ke()}}}function ug(e){if(!he||!O.length||Ue?.hidden||e.altKey||e.ctrlKey||e.metaKey||Qp(e.target))return;let t=-1;if(e.key==="ArrowDown")t=Ir+1;else if(e.key==="ArrowUp")t=Ir-1;else if(e.key==="Home")t=0;else if(e.key==="End")t=O.length-1;else if(e.key==="Escape"){document.activeElement?.blur?.();return}else return;e.preventDefault(),fa(Math.max(0,Math.min(t,O.length-1)))}function mg(){Kc(),pt?.disconnect(),pt=null,ft?.disconnect(),ft=null,ua=null,fo?.disconnect(),fo=null,po?.(),po=null,rn=null,Ue?.remove(),Ue=null,go=null,bt=null,Rr=null}var Vc=p({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[h.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:sa,cleanupSelectors:[`#${jc}`],settings:Dr,start(){he=!0,Br=L(),E(sa,Fc),Nr=new AbortController;let{signal:e}=Nr;window.addEventListener("keydown",ug,{signal:e}),window.addEventListener("popstate",ke,{signal:e}),window.visualViewport?.addEventListener("resize",ha,{signal:e}),ca=K(dg),la=U({onTick(){ke()},onFall(){ke()},onContext(){en.clear(),ht="",ke()}}),pa(),ke(),Ip.debug("navigator started")},stop(){he=!1,nn&&cancelAnimationFrame(nn),nn=0,on&&cancelAnimationFrame(on),on=0,Nr?.abort(),Nr=null,la?.(),la=null,ca?.(),ca=null,tn.clear(),gt=!1,mg(),en.clear(),O=[],ht="",y(sa)},onSettingsChange(){ht="",ke()}});var Wc=`.bloom-ts {
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
`;function Yc(e,t,n=Date.now()){let o=new Date(e);if(Number.isNaN(o.getTime()))return"";let r=new Date(n),i=o.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(o.toDateString()===r.toDateString()||!t)return i;let s=o.getFullYear()===r.getFullYear();return`${o.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Xc(e){try{return new Date(e).toISOString()}catch{return""}}var ed=new v("MessageTimestamps"),Jc="messageTimestamps",_r="bloom-ts",Zc=1500,pg="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",ln=x({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),cn=new Map,dn=!1,sn=0,an,Ve=null,va=null,ya=null,Qc=!1;function td(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function xa(){let e=ln.plain.stamps;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function nd(){let e={...xa()};for(let[n,o]of cn)e[n]=o;let t=Object.keys(e);if(t.length>Zc){let n=t.slice(t.length-Zc),o={};for(let r of n)o[r]=e[r];ln.store.stamps=o;return}ln.store.stamps=e}var gg=Fa(nd,500);function od(e,t){!e||!t||cn.get(e)===t||(cn.set(e,t),gg(),bo())}function bg(e){return e?cn.get(e)??xa()[e]??cr(e)??null:null}function hg(e){dn&&e.type==="message-time"&&od(e.messageId,e.createTime)}function yg(e){return(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function vg(){let e=td();if(!e)return[];let t=[];try{for(let n of e.querySelectorAll("[data-message-id]"))n.closest(pg)||t.push(n)}catch{}return t}function xg(e){try{return!!e.querySelector("time:not(.bloom-ts)")}catch{return!1}}function Eg(){if(!dn)return;let e=ln.store.hideOwnMessages===!0,t=ln.store.showDate!==!1,n=H(),o=vg();Ve?.disconnect();try{o.forEach((r,i)=>{let a=r.getAttribute("data-message-id")||"",s=yg(r),l=r.querySelector(`:scope > .${_r}`);if(e&&s==="user"){l?.remove();return}if(xg(r)){l?.remove();return}let c=bg(a);if(!c&&a&&(n||Qc)&&i>=o.length-2&&(c=Date.now(),od(a,c)),!c){l?.remove();return}let d=Yc(c,t);if(!d){l?.remove();return}let u=l;u||(u=document.createElement("time"),u.className=_r,u.setAttribute("aria-hidden","true"),r.insertBefore(u,r.firstChild)),u.textContent!==d&&(u.textContent=d);let m=Xc(c);m&&u.getAttribute("datetime")!==m&&u.setAttribute("datetime",m)})}catch(r){ed.debug("paint failed",r)}Qc=n,rd()}function bo(){!dn||sn||(sn=requestAnimationFrame(()=>{sn=0,dn&&Eg()}))}function rd(){let e=td();if(!(Ve&&va===e&&e?.isConnected)){if(Ve?.disconnect(),va=e,!e||e===document.body){Ve=null;return}Ve=new MutationObserver(()=>bo()),Ve.observe(e,{childList:!0,subtree:!0})}}var id=p({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[h.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${_r}`],settings:ln,start(){dn=!0,E(Jc,Wc);let e=xa();for(let[t,n]of Object.entries(e))typeof n=="number"&&n>0&&cn.set(t,n);ya=K(hg),rd(),an!==void 0&&clearInterval(an),an=setInterval(bo,800),bo(),ed.debug("timestamp watch started")},stop(){dn=!1,sn&&cancelAnimationFrame(sn),sn=0,an!==void 0&&(clearInterval(an),an=void 0),Ve?.disconnect(),Ve=null,va=null,ya?.(),ya=null,nd(),cn.clear(),document.querySelectorAll(`.${_r}`).forEach(e=>e.remove()),y(Jc)},onSettingsChange:bo});var Ea="streamerMode",wg="filter:blur(6px)!important;transition:filter .2s ease",Sg="filter:none!important",ho=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],un=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function ie(e,t){return e.map(n=>`${n} ${t}`)}var yt=x({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function mn(e,t=!0){let n=e.join(","),o=e.map(r=>`${r}:hover`).join(",");return`${n}{${wg}}${t?`${o}{${Sg}}`:""}`}function ad(){let e=[];if(yt.store.conversations!==!1&&(e.push(mn([...ie(un,'a[href^="/c/"]'),...ie(un,'a[href*="/c/"]')])),e.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),yt.store.projects!==!1&&(e.push(mn([...ie(un,'a[href*="/project"]'),...ie(un,'a[href*="/g/g-p-"]'),...ie(un,'[data-testid="project-name"]'),...ie(un,'[data-testid="project-link"]')])),e.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),yt.store.headerTitle!==!1&&e.push(mn(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),yt.store.accountAvatar!==!1&&e.push(mn([...ie(ho,"img"),...ie(ho,'[class*="avatar"]')],!1)),yt.store.accountName!==!1&&e.push(mn([...ie(ho,".min-w-0 > .truncate"),...ie(ho,".min-w-0.flex-1 .truncate")],!1)),yt.store.accountEmail!==!1&&e.push(mn([...ie(ho,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),e.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),e.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!e.length){y(Ea);return}E(Ea,e.join(`
`))}var sd=p({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[h.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:yt,start:ad,onSettingsChange:ad,stop(){y(Ea)}});var ld=`.bloom-gc-panel {
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
}`;var Lg=new v("GreetingCustomizer"),fn="greetingCustomizer",cd="greetingCustomizerUi",yo=100,Sa=30,kg=120,Cg=1e3,Mg=50,Ag=40,Hg=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),vo=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),Gr=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function Ng(e){return!!e?.closest(Hg)}function fd(e){return!!(Ng(e)||e.closest('[data-testid="temporary-chat-label"]')||e.closest("[hidden]")||e.getAttribute("aria-hidden")==="true"||e.classList.contains("sr-only"))}function ko(e){try{for(let t of document.querySelectorAll(e))if(!fd(t))return t}catch{}return null}function wa(e){for(let t of e.split(",").map(n=>n.trim()).filter(Boolean))if(ko(t))return t;return e}var pd=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],B=x({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:Vg},greetings:{type:0,description:"Greeting texts",hidden:!0,default:pd},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),ye=!1,bn=!1,xt=null,Fr,xo,pn,Eo,jr=0,qr=null,gn=null,wo=null,So=null,To=null,zr=null;function Me(){let e=location.pathname||"/";return e==="/"||e===""}function vt(){let e=B.plain.greetings;return Array.isArray(e)?e.filter(t=>typeof t=="string"):pd.slice()}function Lo(e){return String(e??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function dd(e){B.store.greetings=e.slice(0,Sa)}function Co(){let e=String(B.store.mode??"refresh");return e==="interval"||e==="manual"?e:"refresh"}function Pg(){return B.store.order==="random"?"random":"sequential"}function Rg(){return ve(Number(B.store.intervalSec??10),1,3600)*1e3}function Ig(e){return String(e??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Og(){return!!ko(Gr)}function Kr(){return!!(ko(Gr)||ko(vo))}function Bg(e,t){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),o=[`content:"${e}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),r=Og()?wa(Gr):ko(vo)?wa(vo):wa(Gr),i=t?`${vo}{cursor:pointer!important;user-select:none!important}`:"";return[`${r}{${n}}`,`${r}::before{${o}}`,i,`@media (max-width:768px){${r}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function Dg(e,t){if(e<=0)return 0;if(e===1)return Number(B.plain.index)!==0&&(B.store.index=0),Number(B.plain.lastRandom)!==0&&(B.store.lastRandom=0),0;let n=Number(B.plain.index),o=Number(B.plain.lastRandom);if(!t)return n>=0&&n<e?n:0;if(Pg()==="random"){let a=n>=0&&n<e?n:o,s=Math.floor(Math.random()*e),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*e);return B.store.index=s,B.store.lastRandom=s,s}let i=((n>=-1&&n<e?n:-1)+1)%e;return B.store.index=i,i}function Ce(e){if(!ye)return;if(!Me()){y(fn);return}let t=vt().map(Lo).filter(Boolean);if(!t.length){y(fn);return}let n=Dg(t.length,e),o=t[n]??t[0],r=Co()==="manual"&&t.length>1;E(fn,Bg(Ig(o),r)),zr?.()}function Ta(){Fr!==void 0&&(clearInterval(Fr),Fr=void 0)}function La(){Ta(),!(!ye||!Me())&&Co()==="interval"&&(vt().filter(Boolean).length<=1||(Fr=setInterval(()=>Ce(!0),Rg())))}function ka(){Eo!==void 0&&(clearTimeout(Eo),Eo=void 0),jr=0}function ud(){if(ka(),!ye||!Me())return;jr=Ag;let e=()=>{if(Eo=void 0,!(!ye||!Me())){if(Kr()){Co()==="refresh"&&!bn?(bn=!0,Ce(!0)):Ce(!1),La();return}jr-=1,jr>0&&(Eo=setTimeout(e,Mg))}};e()}function Ca(){if(xt===!0){Kr()?Ce(!1):ud();return}xt=!0,bn=!1,Co()==="refresh"?(bn=!0,Ce(!0)):Ce(!1),La(),Kr()||ud()}function Ma(){xt=!1,bn=!1,Ta(),ka(),y(fn)}function Ur(){pn===void 0&&(pn=window.setTimeout(()=>{pn=void 0,ye&&(Me()?Ca():xt!==!1&&Ma())},kg))}function $g(){gn||(gn=history.pushState.bind(history),wo=history.replaceState.bind(history),So=function(...t){let n=gn(...t);return Ur(),n},To=function(...t){let n=wo(...t);return Ur(),n},history.pushState=So,history.replaceState=To)}function _g(){So&&history.pushState===So&&gn&&(history.pushState=gn),To&&history.replaceState===To&&wo&&(history.replaceState=wo),gn=null,wo=null,So=null,To=null}function qg(e){let t=e.target instanceof Element?e.target:null;t&&t.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(Ur)}function Fg(e){if(!ye||!Me()||Co()!=="manual"||vt().filter(Boolean).length<=1)return;let t=e.target instanceof Element?e.target:null;if(!t)return;let n=t.closest(vo);if(!n||fd(n))return;let o=window.getSelection?.();o&&String(o).trim()||Ce(!0)}function jg(){xo===void 0&&(xo=setInterval(()=>{if(!ye)return;let e=Me();if(e!==(xt===!0)){e?Ca():Ma();return}e&&Kr()&&Ce(!1)},Cg))}function zg(){xo!==void 0&&(clearInterval(xo),xo=void 0)}function md(e,t){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=e,n.setAttribute("aria-label",e);let o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.75"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),o.setAttribute("aria-hidden","true");for(let r of t.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",r),o.appendChild(i)}return n.appendChild(o),n}var Gg="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",Kg="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function Ug(e,t){let n=Lo(e);return n?n.length>yo?`Keep it to ${yo} characters.`:vt().length+(t?1:0)>Sa?`At most ${Sa} greetings.`:null:"Enter a greeting."}function Vg(e){e.className="bloom-gc-panel";let t="",n=-1,o="",r=-1,i=()=>{let a=vt(),s=Number(B.plain.index);e.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=yo,c.placeholder="New greeting (line breaks ok)",c.value=t,c.addEventListener("input",()=>{t=c.value,o="";let f=l.querySelector(".bloom-gc-count");f&&(f.textContent=`${Lo(t).length}/${yo}`);let T=l.querySelector(".bloom-gc-error");T&&(T.textContent="")}),l.appendChild(c);let d=document.createElement("div");d.className="bloom-gc-meta";let u=document.createElement("span");u.className="bloom-gc-count",u.textContent=`${Lo(t).length}/${yo}`;let m=document.createElement("span");m.className="bloom-gc-error",m.textContent=o;let S=document.createElement("div");if(S.className="bloom-gc-actions",n>=0){let f=document.createElement("button");f.type="button",f.className="bloom-gc-btn",f.textContent="Cancel",f.addEventListener("click",()=>{n=-1,t="",o="",i()}),S.appendChild(f)}let w=document.createElement("button");if(w.type="button",w.className="bloom-gc-btn bloom-gc-btn-primary",w.textContent=n>=0?"Update":"Add",w.addEventListener("click",()=>{let f=n<0,T=Ug(t,f);if(T){o=T,i();return}let _=Lo(t),F=vt().slice();n>=0&&n<F.length?F[n]=_:F.push(_),dd(F),n=-1,t="",o="",i()}),S.appendChild(w),d.append(u,m,S),l.appendChild(d),e.appendChild(l),!a.length){let f=document.createElement("p");f.className="bloom-gc-empty",f.textContent="No greetings. The official heading stays.",e.appendChild(f);return}let g=document.createElement("div");g.className="bloom-gc-list",a.forEach((f,T)=>{let _=document.createElement("div");_.className="bloom-gc-item",T===s&&(_.dataset.active="true");let F=document.createElement("button");F.type="button",F.className=`bloom-gc-body${r===T?"":" bloom-gc-clamp"}`,F.textContent=f,F.addEventListener("click",()=>{r=r===T?-1:T,i()});let yn=document.createElement("div");yn.className="bloom-gc-item-actions";let Et=md("Edit",Gg);Et.addEventListener("click",()=>{n=T,t=f,o="",i()});let Ae=md("Delete",Kg);Ae.addEventListener("click",()=>{let vn=vt().filter((wt,We)=>We!==T);dd(vn),n===T?(n=-1,t=""):n>T&&(n-=1),i()}),yn.append(Et,Ae),_.append(F,yn),g.appendChild(_)}),e.appendChild(g)};return zr=i,i(),()=>{zr===i&&(zr=null),e.replaceChildren()}}var gd=p({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[h.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:cd,settings:B,start(){ye=!0,E(cd,ld),$g(),qr=new AbortController;let{signal:e}=qr;window.addEventListener("popstate",Ur,{signal:e}),document.addEventListener("click",qg,{capture:!0,signal:e}),document.addEventListener("click",Fg,{signal:e}),jg(),xt=null,Me()?Ca():Ma(),Lg.debug("started")},stop(){ye=!1,qr?.abort(),qr=null,pn!==void 0&&(clearTimeout(pn),pn=void 0),Ta(),ka(),zg(),_g(),y(fn),bn=!1,xt=null},onSettingsChange(){ye&&(Me()?(Ce(!1),La()):y(fn))}});var hn=new v("Bloom"),bd=!1,Wg=Date.now(),Yg=[Is,Ml,Dl,ql,Kl,Xl,cc,uc,pc,Tc,Nc,$c,qc,Vc,id,sd,gd];function Vr(e){return new Promise(t=>setTimeout(t,e))}function Xg(){return document.head?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.head&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}function Jg(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var yd=8e3,hd=300,Zg=250;async function Qg(){if(Xe())return await Vr(hd),!0;for(;Date.now()-Wg<yd;)if(await Vr(Zg),Xe())return await Vr(hd),!0;return Xe()||ei()}function Aa(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function eb(){if(Aa())return!0;let e=Date.now()+yd;for(;Date.now()<e;)if(await Vr(100),Aa())return!0;return Aa()}function tb(){try{GM_registerMenuCommand?.("Bloom++ settings",Rs)}catch{}}function nb(){Do(()=>{wn("HostShell"),hn.info("host shell",j)}),$o(()=>{hn.info("idle ready",j)}),_o(()=>{Yr(),wn("HostReady"),hn.info("chrome ready",j)})}async function Ha(){await ja()}async function Na(){if(bd)return;bd=!0;for(let n of Yg)try{Ja(n)}catch(o){hn.error("register failed",n.name,o)}es(),wn("Init"),tb(),nb();let e=()=>wn("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await Xg(),Yr(),hn.info("styles ready",j),await Jg(),eb().then(n=>{n&&qo()}),!await Qg()){hn.warn("late islands not detected; starting default plugins",j),Lt(),Fo();return}await as()}var vd=typeof unsafeWindow<"u"?unsafeWindow:window,ob=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||ob){let e=vd.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",j);try{Object.defineProperty(vd,"Bloom",{value:Pa,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}Ha().then(()=>Na()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
