// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260919] v1.4.41
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

/* Bloom++ [20260919] v1.4.41. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var vl=Object.defineProperty;var xl=(e,t)=>{for(var n in t)vl(e,n,{get:t[n],enumerable:!0})};var ii={};xl(ii,{REPO_URL:()=>Ii,Settings:()=>g,VERSION:()=>O,contextKeyFromUrl:()=>le,conversationTitle:()=>Rs,conversationToken:()=>R,currentConversationId:()=>ce,hasDraftText:()=>Ge,hasLateIslands:()=>ye,init:()=>ri,initSettings:()=>oi,isDocumentInteractive:()=>Oi,isUserDraftEmpty:()=>Vt,messageCreateTime:()=>Ao,plugins:()=>F,requestChromeReady:()=>Fn,requestIdleReady:()=>_e,requestShellReady:()=>qn,setEditorText:()=>ao,subscribeHarvest:()=>dt,whenChromeReady:()=>jn,whenIdleReady:()=>$n,whenShellReady:()=>_n});var ee=new Map,An=!1;function wl(){return document.getElementById("bloom-root")?.shadowRoot??null}function El(){return document.head??null}function Oe(){let e=wl();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=Sl()}function Fo(e,t){if(!An)return;let n=El();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),Oe();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,Oe();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,Oe()}function L(e,t){let n=ee.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},ee.set(e,n)),An&&Fo(e,n)}function ai(){An=!0;for(let[e,t]of ee)Fo(e,t);return Oe(),!0}function si(e){let t=ee.get(e);t&&(t.disabled=!1,An&&Fo(e,t))}function li(e){let t=ee.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),Oe())}function y(e){let t=ee.get(e);t&&(t.el?.remove(),ee.delete(e),Oe())}function Sl(){return Array.from(ee.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var w=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function h(e){return e}var zo=new Map;function Pn(e,t){let n=zo.get(e);return n||(n=new Set,zo.set(e,n)),n.add(t),()=>n.delete(t)}function be(e,t){let n=zo.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var Ll="bloompp";function ci(){return new Promise((e,t)=>{let n=indexedDB.open(Ll,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function di(e){try{let t=await ci();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function ui(e,t){try{let n=await ci();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function Pt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Be(e,t,n){return Math.min(n,Math.max(t,e))}function mi(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function fi(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}function pi(e,t){let n;return((...o)=>{n&&clearTimeout(n),n=setTimeout(()=>e(...o),t)})}var Rn=new w("SettingsStore"),te="BloomSettings",Tl=100;function Hn(e){if(Pt(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(Pt(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return Pt(n)?n:null}return null}catch{return null}}var Nn=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let c=n?`${n}.${a}`:a;for(let[l,d]of this.defaultGetters)if(c.startsWith(l)){let u=c.slice(l.length+1);if(u&&!u.includes(".")){let m=d(u);m!==void 0&&(i[a]=m,s=m);break}}}return Pt(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let c=n?`${n}.${a}`:a;return this.notifyListeners(c),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Rn.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Tl))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(te,this.plain)}catch{try{GM_setValue(te,t)}catch(n){Rn.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(te,t)}catch{}ui(te,t).catch(n=>Rn.warn("Failed to save settings to IndexedDB:",n))}catch(t){Rn.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){mi(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var Cl=new w("Settings"),kl={plugins:{}},g=new Nn(structuredClone(kl)),Ml=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function Al(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function E(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(g.store.plugins[n]||(g.store.plugins[n]={}),g.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?g.plain.plugins[n]??{}:{}}};return t}function Pl(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function gi(){let e=null;if(e=Hn(Pl(te)),e||(e=Hn(await di(te))),!e)try{e=Hn(localStorage.getItem(te))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(g.plain.plugins=t),Cl.debug("Loaded settings")}}function hi(e,t){t&&(t.pluginName=e,g.plain.plugins[e]||(g.plain.plugins[e]={}),g.setDefaultGetter(Ml(e),n=>{if(n!=="enabled")return Al(t.def,n)}))}function bi(){return g.plain.plugins.Settings||(g.store.plugins.Settings={}),g.store.plugins.Settings}function In(){return bi().pinnedPlugins??[]}function yi(e){return In().includes(e)}function vi(e){let t=In(),n=t.includes(e);return g.store.plugins.Settings={...g.plain.plugins.Settings,pinnedPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}function On(){return bi().starredPlugins??[]}function xi(e){return On().includes(e)}function wi(e){let t=On(),n=t.includes(e);return g.store.plugins.Settings={...g.plain.plugins.Settings,starredPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}var Bn=new w("PluginManager"),F={},Rt=new Set;function Li(e){if(F[e.name]){Bn.warn("Duplicate plugin",e.name);return}F[e.name]=e,hi(e.name,e.settings)}function De(e){let t=F[e];if(!t)return!1;if(t.required)return!0;let n=g.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function Ti(e){let t=F[e];if(!t||t.required)return;let n=!De(e);g.plain.plugins[e]||(g.store.plugins[e]={}),g.store.plugins[e].enabled=n,n?Ci(t):Rl(t),be("pluginToggle",{name:e,enabled:n})}function Ci(e,t=!1){if(!Rt.has(e.name)&&De(e.name))try{e.managedStyle&&si(e.managedStyle),e.start?.(),Rt.add(e.name),e.settings&&g.addPrefixChangeListener(`plugins.${e.name}.`,()=>{Rt.has(e.name)&&e.onSettingsChange?.()}),t||Bn.debug("Started",e.name)}catch(n){Bn.error("Failed to start",e.name,n)}}function Rl(e){if(Rt.has(e.name)){try{e.stop?.()}catch(t){Bn.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(li(e.managedStyle),y(e.managedStyle)),Rt.delete(e.name)}}function Nt(e){for(let t of Object.values(F))(t.startAt??"DOMContentLoaded")===e&&Ci(t)}var Ei=2,Si="defaultsRev";function ki(){for(let t of Object.values(F))g.plain.plugins[t.name]||(g.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=g.store.plugins.Settings??(g.store.plugins.Settings={});if(e[Si]!==Ei){for(let t of["NoShareLink","NoDictation"]){let n=g.store.plugins[t]??(g.store.plugins[t]={});n.enabled=!1}e[Si]=Ei}}var Ht=!1,Dn=!1,Go=!1,Ai=[],Pi=[],Ri=[];function Ko(e){let t=e.splice(0);for(let n of t)n()}function It(){Ht||(Ht=!0,Ko(Ai))}function Uo(){Dn||(Dn=!0,Ht||It(),Ko(Pi))}function Ni(){Go||(Go=!0,Ht||It(),Dn||Uo(),Ko(Ri))}function _n(e){Ht?e():Ai.push(e)}function $n(e){Dn?e():Pi.push(e)}function jn(e){Go?e():Ri.push(e)}function qn(){It()}function _e(){It(),Uo()}function Fn(){Ni()}function Mi(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function Hi(){await Mi(4e3),It(),await Mi(4e3),Uo(),Ni()}var v={p:"0-V-linuxdo"},O="[20260919] v1.4.41",Ii="https://github.com/0-V-linuxdo/Bloom";function Nl(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Hl(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function Vo(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function ye(){return Vo()?Nl()||Hl():!1}function Oi(){return ye()}var Il=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Bi=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Ol=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Bl="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function je(e){return e.id==="bloom-root"||!!e.closest(Bl)}function Di(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function zn(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function Wo(e){if(!(e instanceof HTMLElement)||!e.isConnected||je(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&zn(t)?!1:e.getClientRects().length>0}function $e(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Dl(){let e=[];for(let t of document.querySelectorAll(Il))!(t instanceof HTMLElement)||!t.isConnected||je(t)||e.push(t);return e}function Gn(e){if(!e.isConnected||je(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function Ot(){return Dl().filter(Gn)[0]??null}function Yo(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||je(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function Xo(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!je(n)&&!$e(n)&&n.parentElement&&!$e(n.parentElement)&&(t=n);let o=t.parentElement;if(o&&!$e(o)&&!je(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!$e(o.parentElement))return o}return t}function _i(){let e=document.querySelectorAll(Bi);for(let n of e)if(Wo(n)&&!zn(n)&&Di(n))return n;let t=document.querySelectorAll(Ol);for(let n of t){if(!Wo(n)||!Di(n)||zn(n))continue;let o=n.querySelector(Bi);return Wo(o)&&!zn(o)?o:n}return null}function $i(){let e=Ot();if(e){let t=Xo(e),n=t.parentElement;if(n&&!$e(n))return n;if(!$e(t))return t}return Yo()}function ji(e){let t=Ot();return t?e.composedPath().includes(t):!1}var Zo=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],_l={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Qo(e){return e==="auto"||e==="light"||e==="dark"}function $l(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function jl(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function Jo(e){let t=$l(e);return t?jl(t)>.55?"light":"dark":null}function ql(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=Jo(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=Jo(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Jo(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function qi(e){return e==="auto"?ql():e}function Fl(e){try{let t=getComputedStyle(document.documentElement);for(let n of Zo){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function Fi(e,t,n){let o=_l[t];if(n){Fl(e);for(let r of Zo)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of Zo)e.style.setProperty(r,o[r])}function zi(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var er=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var Gl="bloom-root",z="bloom-rail-item",Yn="bloom-account-item",xe="bloom-sidebar-panel",Ut="bloom-plugin-dialog",to="bloom-plugin-layer",Xn="bloom-settings-css",Kl=2e3,Ft=E({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),Ui=null,Ul=null,ie=!1,rr=[],Kn=null,Jn=null,oe=null,Vn=null,Y=null,zt=null,Bt,qe=0,Gt=0,Dt=0,_t=null,$t=null,Zn=null,Vi=null,jt=null,tr=[],Qn=!1,Vl=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Wl=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],no="",Kt="all",ae="all";function oo(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Wi(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Yl(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function Xl(e){let t='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return e?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${t}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`}function Jl(e){let t='<path d="M12 17v5"/>';return e?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var Zl={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function Ql(e){return e.icon||Zl[e.name]||oo()}function Yi(){return Qo(Ft.store.appearance)?Ft.store.appearance:"auto"}function ec(){let e=document.createElement("div");e.className="bloom-field bloom-appearance-row";let t=document.createElement("span");t.className="bloom-field-label",t.textContent="Appearance";let n=document.createElement("select");n.setAttribute("aria-label","Appearance");let o=Ft.def.appearance,r=o.type===3?o.options??[]:[];for(let i of r){let a=document.createElement("option");a.value=i.value,a.textContent=i.label,n.appendChild(a)}return n.value=Yi(),n.addEventListener("change",()=>{Qo(n.value)&&(Ft.store.appearance=n.value)}),e.append(t,n),e}function nr(e,t,n){e&&(e.setAttribute("data-bloom-scheme",t),Fi(e,t,n),e.style.removeProperty("--bloom-rail-surface"))}function Xi(e){e&&(e.style.removeProperty("--bloom-rail-surface"),e.style.removeProperty("--bg-primary"))}function qt(){let e=Yi(),t=qi(e),n=e==="auto";nr(Ui,t,n);let o=document.getElementById(xe);o instanceof HTMLElement&&nr(o,t,n);let r=document.getElementById(Ut);r instanceof HTMLElement&&nr(r,t,n);let i=document.getElementById(z);i instanceof HTMLElement&&Xi(i),be("schemeChange",{scheme:t,pref:e})}function Ji(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(e=>e.remove())}function Zi(){if(L("settings",er),document.getElementById(Xn)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=Xn,e.textContent=er,document.head.appendChild(e)}function tc(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function nc(){for(let e of rr)e();rr=[]}function Qi(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function oc(e){return e.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,t=>t.toUpperCase())}function sr(e){return e.settings?Object.entries(e.settings.def).filter(([,t])=>!t.hidden):[]}function rc(e){return sr(e).length>0}function Wn(e){if(e.default!==void 0)return e.default;if(e.type===3)return(e.options?.find(n=>n.default)??e.options?.[0])?.value;if(e.type===2)return!1;if(e.type===4)return e.min??0;if(e.type===0)return"";if(e.type===1)return 0}function ic(e,t){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let o=document.createElement("span");if(o.className="bloom-plugin-dialog-label-title",o.textContent=oc(e),n.appendChild(o),t.description){let r=document.createElement("span");r.className="bloom-plugin-dialog-label-desc",r.textContent=t.description,n.appendChild(r)}return n}function ac(e,t,n){if(n.hidden)return null;let o=n.type===4||n.type===0||n.type===1||n.type===5,r=document.createElement("div");r.className=o?"bloom-field bloom-field-stack":"bloom-field",r.appendChild(ic(t,n));let i=g.store.plugins[e]??(g.store.plugins[e]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",rr.push(n.render(a)),r.appendChild(a),r}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let c=document.createElement("option");c.value=s.value,c.textContent=s.label,a.appendChild(c)}return a.value=String(i[t]??Wn(n)??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),r.appendChild(a),r}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??Wn(n)??n.min??0);let c=document.createElement("span");return c.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),c.textContent=s.value}),a.append(s,c),r.appendChild(a),r}if(n.type===2){let a=Qi(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),r.appendChild(a),r}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[t]??Wn(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[t]=n.type===1?Number(a.value):a.value}),r.appendChild(a),r}return r}function Gi(e,t){let n=document.createElement("div");n.className=t?`bloom-plugin-dialog-field ${t}`:"bloom-plugin-dialog-field";let o=document.createElement("div");return o.className="bloom-plugin-dialog-field-label",o.textContent=e,n.appendChild(o),n}function sc(e){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let t=g.store.plugins[e.name]??(g.store.plugins[e.name]={});for(let[n,o]of sr(e)){if(n==="enabled"||o.type===5)continue;let r=Wn(o);r!==void 0&&(t[n]=r)}ta(e)}function ea(e){e.key==="Escape"&&(!document.getElementById(to)&&!document.getElementById(Ut)||(e.stopPropagation(),Fe()))}function lc(){Qn||(document.addEventListener("keydown",ea),Qn=!0)}function cc(){Qn&&(document.removeEventListener("keydown",ea),Qn=!1)}function Fe(){nc(),cc(),document.getElementById(to)?.remove(),document.getElementById(Ut)?.remove()}function ta(e){if(Fe(),!document.body)return;let t=document.createElement("div");t.id=to,t.className="bloom-plugin-layer",t.addEventListener("pointerdown",re),t.addEventListener("pointerup",re),t.addEventListener("click",d=>{d.stopPropagation(),d.target===t&&Fe()});let n=document.createElement("div");n.id=Ut,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",re),n.addEventListener("pointerup",re),n.addEventListener("click",re);let o=document.createElement("button");o.type="button",o.className="bloom-icon-btn bloom-plugin-dialog-close",o.setAttribute("aria-label","Close"),o.innerHTML=Wi(),o.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),Fe()});let r=document.createElement("div");r.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=e.name,r.appendChild(i),e.description){let d=document.createElement("p");d.className="bloom-plugin-dialog-sub",d.textContent=e.description,r.appendChild(d)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(o,r,a),e.authors?.length){let d=Gi("Authors"),u=document.createElement("p");u.className="bloom-plugin-dialog-authors",u.textContent=e.authors.join(", "),d.appendChild(u),n.appendChild(d)}let s=Gi("Settings","bloom-plugin-dialog-settings"),c=document.createElement("div");c.className="bloom-plugin-dialog-settings-list";let l=sr(e);if(l.length)for(let[d,u]of l){let m=ac(e.name,d,u);m&&c.appendChild(m)}if(!c.childElementCount){let d=document.createElement("p");d.className="bloom-dialog-empty",d.textContent="No configurable settings.",c.appendChild(d)}if(s.appendChild(c),n.appendChild(s),l.length){let d=document.createElement("div");d.className="bloom-plugin-dialog-footer";let u=document.createElement("button");u.type="button",u.className="bloom-plugin-dialog-reset",u.textContent="Reset",u.addEventListener("click",()=>sc(e)),d.appendChild(u),n.appendChild(d)}t.appendChild(n),document.body.appendChild(t),lc(),qt()}function dc(e){let t=document.createElement("div");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Ql(e);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=e.name,a.title=e.name,r.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let c=xi(e.name),l=document.createElement("button");if(l.type="button",l.className=`bloom-icon-btn bloom-card-star${c?" bloom-card-star-active":""}`,l.setAttribute("aria-label",c?"Remove from favorites":"Add to favorites"),l.innerHTML=Xl(c),l.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation();let f=wi(e.name);be("pluginStar",{name:e.name,starred:f})}),s.appendChild(l),!e.required){let p=yi(e.name),f=document.createElement("button");f.type="button",f.className=`bloom-icon-btn bloom-card-pin${p?" bloom-card-pin-active":""}`,f.setAttribute("aria-label",p?"Unpin from top":"Pin to top"),f.innerHTML=Jl(p),f.addEventListener("click",S=>{S.preventDefault(),S.stopPropagation();let A=vi(e.name);be("pluginPin",{name:e.name,pinned:A})}),s.appendChild(f)}if(rc(e)){let p=document.createElement("button");p.type="button",p.className="bloom-icon-btn bloom-card-settings",p.setAttribute("aria-label",`${e.name} settings`),p.innerHTML=Yl(),p.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),ta(e)}),s.appendChild(p)}let d=Qi(e.name,De(e.name),!!e.required),u=d.querySelector("input");if(u?.addEventListener("click",p=>p.stopPropagation()),u?.addEventListener("change",()=>{Ti(e.name)}),s.appendChild(d),o.append(r,s),n.appendChild(o),e.description){let p=document.createElement("div");p.className="bloom-card-desc",p.textContent=e.description,n.appendChild(p)}let m=document.createElement("div");m.className="bloom-card-separator";let x=document.createElement("div");x.className="bloom-card-footer";let b=document.createElement("div");return b.className="bloom-card-author",b.textContent=e.authors?.filter(Boolean).join(", ")||"\xA0",x.appendChild(b),t.append(n,m,x),t}function na(){return Object.values(F).filter(e=>!e.hidden&&e.name!=="Settings")}function oa(e,t){return t==="all"||t==="favorites"?!0:(e.tags??[]).includes(t)}function uc(e){return`${e.name} ${e.description??""} ${(e.tags??[]).join(" ")}`.toLowerCase()}function mc(){return no.trim()?"No plugins match your search.":ae==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function fc(){let e=na();return Wl.filter(t=>t.id==="favorites"||t.id==="all"?!0:e.some(n=>oa(n,t.id)))}function pc(){if(jt){jt.replaceChildren();for(let e of fc()){let t=document.createElement("button");t.type="button",t.className=`bloom-plugin-tab${ae===e.id?" bloom-plugin-tab-active":""}`,t.textContent=e.label,t.addEventListener("click",()=>{ae=e.id,ve()}),jt.appendChild(t)}}}function gc(){let e=na();if(ae==="favorites"){let t=new Set(On());e=e.filter(n=>t.has(n.name))}else ae!=="all"&&(e=e.filter(t=>oa(t,ae)));return Kt==="enabled"&&(e=e.filter(t=>De(t.name))),Kt==="disabled"&&(e=e.filter(t=>!De(t.name))),e}function ve(){if(!_t)return;pc();let e=gc();Zn&&(Zn.placeholder=`Search ${e.length} plugins...`);let t=e,n=no.trim().toLowerCase();if(n&&(t=t.filter(o=>uc(o).includes(n))),ae!=="favorites"){let o=In();if(o.length){let r=new Map(o.map((i,a)=>[i,a]));t=t.slice().sort((i,a)=>{let s=r.has(i.name),c=r.has(a.name);return s!==c?s?-1:1:s?(r.get(i.name)??0)-(r.get(a.name)??0):i.name.localeCompare(a.name)})}}_t.replaceChildren();for(let o of t)_t.appendChild(dc(o));$t&&($t.hidden=t.length>0,$t.textContent=mc())}function re(e){e.stopPropagation()}function or(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function lr(){document.getElementById(z)?.setAttribute("aria-expanded",ie?"true":"false")}function hc(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function cr(){Fe(),no="",Kt="all",ae="all",document.getElementById(xe)?.remove(),ie=!1,lr()}function bc(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",re),t.addEventListener("pointerup",re),t.addEventListener("click",re);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-titles";let i=document.createElement("div");i.className="bloom-settings-brand";let a=document.createElement("span");a.className="bloom-settings-mark",a.innerHTML=oo();let s=document.createElement("h2");s.textContent="Bloom++",i.append(a,s);let c=document.createElement("p");c.className="bloom-settings-sub",c.textContent="Toggle features. Some need a reload. Click the sliders icon to configure.",r.append(i,c);let l=document.createElement("button");l.type="button",l.className="bloom-icon-btn",l.setAttribute("aria-label","Close"),l.innerHTML=Wi(),l.addEventListener("click",cr),o.append(r,l),n.appendChild(o),n.appendChild(ec());let d=document.createElement("div");d.className="bloom-plugin-tabs",n.appendChild(d);let u=document.createElement("div");u.className="bloom-search-bar";let m=document.createElement("input");m.type="search",m.className="bloom-search-input",m.setAttribute("aria-label","Search plugins"),m.placeholder="Search plugins...",m.addEventListener("input",()=>{no=m.value,ve()});let x=document.createElement("select");x.className="bloom-search-filter",x.setAttribute("aria-label","Filter plugins");for(let f of Vl){let S=document.createElement("option");S.value=f.value,S.textContent=f.label,x.appendChild(S)}x.value=Kt,x.addEventListener("change",()=>{Kt=x.value,ve()}),u.append(m,x),n.appendChild(u);let b=document.createElement("div");b.className="bloom-plugin-list",n.appendChild(b);let p=document.createElement("p");return p.className="bloom-tab-empty",p.hidden=!0,n.appendChild(p),t.appendChild(n),_t=b,$t=p,Zn=m,Vi=x,jt=d,ve(),t}function yc(e){e.classList.add("bloom-rail-dock")}function vc(){let e=document.getElementById(z);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&Gn(e)?e:null}function xc(){if(document.getElementById(xe)?.remove(),!document.body)return;let e=bc(xe);yc(e),document.body.appendChild(e),ie=!0,Fe(),qt(),lr(),be("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:O,dock:"center",rail:!!vc()})}function dr(){let e=document.getElementById(xe);if(e instanceof HTMLElement&&e.isConnected&&hc(e)){cr();return}e?.remove(),xc()}function wc(){let e=document.createElement("button");return e.type="button",e.id=z,e.className="bloom-rail-item",e.setAttribute("aria-controls",xe),e.setAttribute("aria-expanded",ie?"true":"false"),e.innerHTML=`<span class="bloom-rail-mark">${oo()}</span><span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),dr()}),e}function Ki(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function Ec(e){let t=e.querySelector("img");if(t instanceof HTMLElement){let n=t.getBoundingClientRect();if(n.width>8&&n.height>8)return t}for(let n of e.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}return null}function Sc(e,t){for(let n of e.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||t&&(n===t||n.contains(t)||t.contains(n))||(n.textContent||"").trim().length<2)continue;let r=n.getBoundingClientRect();if(r.width>16&&r.height>8&&r.height<40)return n}return null}function ne(e,t,n){let o=`${n}px`;e.style.getPropertyValue(t)!==o&&e.style.setProperty(t,o)}function ra(e,t){if(e.classList.contains("bloom-rail-compact"))return;let n=e.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!e.isConnected||!t.isConnected)return;let o=Ec(t),r=getComputedStyle(t),i=Number.parseFloat(r.paddingTop),a=Number.parseFloat(r.paddingBottom);if(Number.isFinite(i)&&ne(e,"padding-top",Math.round(i)),Number.isFinite(a)&&ne(e,"padding-bottom",Math.round(a)),o){let s=o.getBoundingClientRect(),c=Math.max(20,Math.round(s.width));ne(n,"width",c),ne(n,"height",Math.max(20,Math.round(s.height)));let l=e.getBoundingClientRect(),d=Math.round(s.left-l.left);d>=0&&d<=40&&ne(e,"padding-left",d);let u=Sc(t,o);if(u){let m=u.getBoundingClientRect(),x=n.getBoundingClientRect(),b=Math.round(m.left-x.right);b>=0&&b<=24&&ne(e,"gap",b)}}else{let s=Number.parseFloat(r.paddingLeft),c=Number.parseFloat(r.columnGap||r.gap);Number.isFinite(s)&&ne(e,"padding-left",Math.round(s)),Number.isFinite(c)&&c>0&&ne(e,"gap",Math.round(c))}Xi(e)}function ir(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Lc(){if(zt?.isConnected&&Y){Y.observe(zt,{childList:!0});return}ar()}function Tc(e){if(ir(e))return!1;try{if(e.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function Cc(e,t){!t||!e||requestAnimationFrame(()=>{if(e.isConnected){Dt=0;return}Dt+=1,Gt=Date.now()+Math.min(8e3,250*2**Math.min(Dt,5))})}function kc(){qe||Date.now()<Gt||(qe=requestAnimationFrame(()=>{qe=0,!(Date.now()<Gt)&&(document.getElementById(z)?.isConnected||eo())}))}function eo(){if(!document.body)return;Y?.disconnect();let e=null,t=!1;try{let n=document.getElementById(z);e=n instanceof HTMLButtonElement?n:wc();let o=Ot(),r=Yo();if(o){let i=Xo(o),a=i.parentElement;if(ir(i)||a&&ir(a))return;e.isConnected&&e.nextElementSibling===i||(i.before(e),t=!0),Ki(e),ra(e,o)}else r?(e.parentElement!==r&&(r.appendChild(e),t=!0),Ki(e,!0)):e.isConnected&&!Gn(e)&&(e.remove(),e=null)}finally{Cc(e,t),Lc(),lr()}}function ar(){let e=$i();!e||!Tc(e)||zt===e&&Y||(Y?.disconnect(),zt=e,Y=new MutationObserver(()=>{document.getElementById(z)?.isConnected||kc()}),Y.observe(e,{childList:!0}))}function Mc(){eo(),ar(),Bt===void 0&&(Bt=window.setInterval(()=>{let e=document.getElementById(z);if(!(e instanceof HTMLElement)||!e.isConnected)Date.now()>=Gt&&eo();else{Dt=0;let t=Ot();t&&ra(e,t)}ar()},Kl))}function Ac(){Bt!==void 0&&(clearInterval(Bt),Bt=void 0),qe&&cancelAnimationFrame(qe),qe=0,Gt=0,Dt=0,Y?.disconnect(),Y=null,zt=null}function Pc(e){Vn===e&&oe||(oe?.disconnect(),Vn=e,oe=new MutationObserver(()=>{if(!e.isConnected){oe?.disconnect(),oe=null,Vn=null;return}ia(e)}),oe.observe(e,{childList:!0}))}function ia(e){if(Pc(e),e.querySelector(`#${Yn}`))return;let t=document.createElement("button");t.type="button",t.id=Yn,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${oo()}<span>Bloom++</span>`,t.addEventListener("pointerdown",or),t.addEventListener("pointerup",or),t.addEventListener("click",n=>{or(n),dr()}),e.insertBefore(t,e.firstChild)}function Un(){let e=_i();return e?(ia(e),!0):!1}function Rc(e){ji(e)&&(queueMicrotask(Un),requestAnimationFrame(()=>{Un()}),window.setTimeout(Un,60),window.setTimeout(Un,180))}function Nc(){Jn?.abort();let e=new AbortController;Jn=e,document.addEventListener("click",Rc,{signal:e.signal})}function Hc(){Jn?.abort(),Jn=null,oe?.disconnect(),oe=null,Vn=null}function aa(){_e(),tc(()=>{Zi(),Ji(),eo(),dr()})}var sa=h({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[v.p],required:!0,hidden:!0,enabledByDefault:!0,settings:Ft,startAt:"HostReady",cleanupSelectors:[`#${Gl}`,`#${z}`,`#${Yn}`,`#${xe}`,`#${to}`,`#${Ut}`,`#${Xn}`,"#bloom-menu-panel"],start(){Zi(),Ji(),Mc(),Nc(),Kn?.(),Kn=zi(qt),qt(),tr=[Pn("pluginToggle",()=>{ie&&ve()}),Pn("pluginPin",()=>{ie&&ve()}),Pn("pluginStar",()=>{ie&&ve()})]},stop(){Ac(),Hc(),Kn?.(),Kn=null;for(let e of tr)e();tr=[],cr(),document.getElementById(z)?.remove(),document.getElementById(Yn)?.remove(),document.getElementById(Xn)?.remove(),Ui=null,Ul=null,_t=null,$t=null,Zn=null,Vi=null,jt=null,ie=!1},onSettingsChange:qt});var da='form[data-type="unified-composer"], form.w-full[data-type]',ze=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),ro=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),la=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),ca=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Ic=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Oc='[contenteditable="false"], button, [role="button"]';function B(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function we(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!B(r)))return r;return null}function ua(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function H(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=ua(e);return!!(Ic.test(n)||/^stop$/i.test(n))}function se(){let t=Array.from(document.querySelectorAll(da)).find(B);if(t instanceof HTMLElement)return t;let n=we(document,ze),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function Ee(){let e=Array.from(document.querySelectorAll(ze));return e.find(B)??e[0]??null}function Bc(e,t){if(!e||e===t||!t.contains(e))return!1;let n=e.closest(Oc);return!!n&&n!==t&&t.contains(n)}function ur(e,t){let n=[];try{let o=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),r=o.nextNode();for(;r;){let i=r.parentElement;i&&Bc(i,t)||n.push(r.textContent??""),r=o.nextNode()}}catch{return e.innerText??e.textContent??""}return n.join("")}function Ge(e){let t=e??Ee();return t?ur(t,t).replaceAll("\u200B","").trim().length>0:!1}function Vt(e){return!Ge(e)}function Dc(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function ma(e){let t=se();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!B(n))&&e(n))return n;return null}function io(){let e=se(),t=we(e,ro)??we(document,ro);return t&&!H(t)?t:ma(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!H(n);let r=ua(n);return/^(send|send prompt|发送)$/i.test(r)&&!H(n)})}function mr(){let e=io();return!!e&&Dc(e)}function fr(){let e=se(),t=we(e,la,!0)??we(document,la,!0);if(t)return t;let n=we(e,ca)??we(document,ca);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&B(o)&&H(o))return o}return ma(H)}function Ke(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>ur(n,e)).join(`
`):ur(e,e)}function pr(e,t=!1){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function ao(e,t,n=!1){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r);try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch{e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),pr(e,n)}var fa="bloom-host-icon",Wt="data-bloom-host-rel",gr="not all",hr=0,pa=0,_c=400;function ga(e){hr+=1;try{e()}finally{hr-=1}}function so(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function Ue(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function ha(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function $c(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function jc(e,t){if(e.lastElementChild===t)return;let n=Date.now();n-pa<_c||(pa=n,e.appendChild(t))}function qc(e,t){for(let n of e.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===t||so(n)&&(n.getAttribute(Wt)||n.setAttribute(Wt,n.rel),n.media!==gr&&(n.media=gr),n.rel!==fa&&(n.rel=fa))}function Fc(e){for(let t of e.querySelectorAll(`link[${Wt}]`)){if(!(t instanceof HTMLLinkElement))continue;let n=t.getAttribute(Wt);n&&(t.rel=n),t.removeAttribute(Wt),t.media===gr&&t.removeAttribute("media")}}function br(e,t){let{head:n}=document;!n||!t||ga(()=>{qc(n,e);let o=ha(e),{type:r,sizes:i}=$c(t);o?jc(n,o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function ba(e,t){let{head:n}=document;n&&ga(()=>{ha(e)?.remove(),Fc(n)})}function ya(e,t){let{head:n}=document;if(!n)return null;let o=0,r=new MutationObserver(i=>{if(hr)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===e?a=!0:so(c.target)&&(a=!0,Ue(c.target.href)&&(s=c.target.href)));for(let l of c.removedNodes)so(l)&&l.id===e&&(a=!0);for(let l of c.addedNodes)so(l)&&l.id!==e&&(a=!0,Ue(l.href)&&(s=l.href))}a&&(o||(o=requestAnimationFrame(()=>{o=0,t(s)})))});return r.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),r}var va=/\/c\/([a-zA-Z0-9_-]{8,})/i;function R(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=l=>{let d=n.indexOf(l);return d>=0&&n[d+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(l,d)=>{try{return document.querySelector(l)?.getAttribute(d)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function le(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function Ve(e){if(!e)return"";try{return(/^https?:/i.test(e)?new URL(e,location.origin).pathname:e).match(va)?.[1]??""}catch{return e.match(va)?.[1]??""}}function ce(){let e=Ve(location.pathname);if(e)return e;let n=R().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return""}function zc(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!B(t))&&(H(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function Gc(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&B(e))}function Kc(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&B(e))}function Uc(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function de(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function D(){if(fr()||zc()||Uc())return!0;let e=io();return e&&B(e)&&!H(e)?!1:!!(Gc()||Kc())}var Vc=["original","badge","dot","hole","bg"],Ea=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],Sa={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},lo="#FCFCFC",Wc="#111111",xa="#111111",Yc="#ffffff",Xc="#212121",Jc="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Zc={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},co=32,wa=64;function La(e){return typeof e=="string"&&Vc.includes(e)}function Qc(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function uo(e){let t=document.createElement("canvas");t.width=co,t.height=co;let n=t.getContext("2d");return n?(n.scale(co/wa,co/wa),e(n),t.toDataURL("image/png")):""}function ed(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function mo(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(Jc);n&&(e.strokeStyle=Wc,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function td(e,t,n){let o=Sa[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=xa,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=xa,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=Yc,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function Yt(e,t){if(e==="original")return t==="wait"?uo(o=>mo(o,lo)):Qc(Zc[t]);let n=t==="wait"?void 0:Sa[t];return uo(e==="hole"?o=>mo(o,n??lo):e==="bg"?o=>{o.fillStyle=n??Xc,ed(o,0,0,64,64,14),o.fill(),mo(o,lo,!1)}:o=>{mo(o,lo),t!=="wait"&&td(o,t,e==="dot"?"dot":"badge")})}function Ta(e){return{wait:Yt(e,"wait"),rotate:Yt(e,"rotate"),done:Yt(e,"done"),ready:Yt(e,"ready"),error:Yt(e,"error")}}var nd=new w("ChatStateFavicons"),Le="bloom-chat-state-favicon",Pa=E({style:{type:3,description:"Favicon overlay",options:Ea}}),Xe="",po={wait:"",rotate:"",done:"",ready:"",error:""},go="wait",Ye=!1,X=!1,_=null,Jt="",Zt="",en=!0,Xt=null,Je=0,We,fo=null,Se=null,yr=null,Qt=!1,Ca=new WeakSet,od=400;function rd(){let e=Pa.store.style;return La(e)?e:"bg"}function id(){let t=document.querySelector(`link[rel~="icon"]:not(#${Le})`)?.href;return Ue(t)?t:Ue(Xe)?Xe:""}function $(e){if(go===e){let t=document.getElementById(Le);if(t instanceof HTMLLinkElement&&t.getAttribute("href")===po[e])return}go=e,br(Le,po[e])}function ka(){po=Ta(rd()),$(go)}function ad(){let e=R(),t=e?le(e):le("");return D()?(!Jt&&t&&(Jt=t),Jt||t):(Jt="",t)}function Ra(){Ye=!1,X=!1,_=null,Jt=""}function sd(e){Zt=e,Ra(),en=!1,$("wait")}function Ma(e,t){return!e&&en&&!t}function Na(){if(!Qt)return;let e=R()||location.pathname;if(Zt&&e&&Zt!==e){sd(e);return}e&&(Zt=e);let t=ad(),n=D(),o=Vt(),r=mr();if(de()&&!n){$("error"),Ye=!1,X=!1,_=null;return}if(n){Ye||(en=!1),Ye=!0,X=!1,_=t,$("rotate");return}if(Ye){let i=!!_&&!!t&&_===t;if(Ye=!1,i){X=!0,_=t,$("done");return}X=!1,_=null}if(X)if(!!(_&&t&&_!==t))X=!1,_=null;else if(o){$("done");return}else if(Ma(o,r)){X=!1,$("ready");return}else{X=!1,$("wait");return}_=null,o?$("wait"):Ma(o,r)?$("ready"):$("wait")}function Ha(){let e=se();if(!(Se&&yr===e&&e.isConnected)){if(Se?.disconnect(),yr=e,!e||e===document.body){Se=null;return}Se=new MutationObserver(()=>ho()),Se.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function ho(){!Qt||Je||(Je=requestAnimationFrame(()=>{Je=0,Qt&&(Ia(),Ha(),Na())}))}function Aa(){Ge()&&(en=!0),ho()}function Ia(){let e=Ee();!e||Ca.has(e)||(Ca.add(e),e.addEventListener("input",Aa,{passive:!0}),e.addEventListener("compositionend",Aa,{passive:!0}))}var Oa=h({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Pa,startAt:"DOMContentLoaded",cleanupSelectors:[`#${Le}`],start(){Qt=!0,Xe=id()||Xe,ka(),fo?.disconnect(),fo=ya(Le,e=>{Ue(e)&&(Xe=e),br(Le,po[go])}),Xt?.abort(),Xt=new AbortController,window.addEventListener("popstate",ho,{signal:Xt.signal}),Ia(),Ha(),We!==void 0&&clearInterval(We),We=setInterval(ho,od),Na(),nd.debug("favicon watch started")},stop(){Qt=!1,Je&&cancelAnimationFrame(Je),Je=0,We!==void 0&&(clearInterval(We),We=void 0),Xt?.abort(),Xt=null,Se?.disconnect(),Se=null,yr=null,fo?.disconnect(),fo=null,Ra(),Zt="",en=!0,ba(Le,Xe)},onSettingsChange:ka});var Ba=`.bloom-ih-hud {
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
`;var ap=new w("InputHistory"),vr=/\u200B/g,Da=10,_a=500,$a=100,cd=8,dd=120,ud=2e3,bo=10,yo=E({maxEntries:{type:4,description:"Max stored prompts",min:Da,max:_a,default:$a},history:{type:5,description:"Stored prompts",render:Cd},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),xr=new Map,T=0,wr="",G=!1,nn=!1,Lr=0,tn=null,Er,Tr=null,ja=!0;function j(){let e=yo.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function qa(e){let t=Be(Number(yo.store.maxEntries??$a),Da,_a);return e.length>t?e.slice(e.length-t):e}function vo(e){yo.store.entries=qa(e)}function md(e){return e.replaceAll(vr,"").replace(/\n$/,"").trim()}function Sr(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(ze);return n instanceof HTMLElement?n:Ee()}function fd(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!Ke(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(vr,"").trim().length===0,last:i.toString().replaceAll(vr,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Fa(e){clearTimeout(Er),Er=setTimeout(()=>{if(e!==Lr)return;nn=!1;let t=Tr;t&&pr(t,ja)},dd)}function za(e,t,n){nn=!0,Tr=e,ja=n;let o=++Lr;ao(e,t,n),Fa(o)}function pd(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function Ze(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function gd(){document.querySelector(".bloom-ih-hud")?.remove()}function hd(e,t){let n=pd();n.textContent=e;let o=(t.closest("form")??se()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-cd)}px`,n.classList.add("bloom-ih-hud-on")}function Cr(e){let t=md(e);if(!t)return;let n=Date.now(),o=xr.get(t);if(o&&n-o<ud)return;xr.set(t,n);let r=j().filter(i=>i!==t);r.push(t),vo(r),T=j().length,G=!1,Ze()}function bd(e,t){let n=j();if(!n.length&&e)return;T>=n.length&&(wr=Ke(t),T=n.length);let o=e?T-1:T+1;o<0||o>n.length||(T=o,G=!0,za(t,o===n.length?wr:n[o],e),o<n.length?hd(`${o+1} / ${n.length}`,t):Ze())}function yd(e){G=!1,Ze(),za(e,wr,!1),T=j().length}function vd(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=Sr(e.target)??Sr(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&G&&!e.altKey&&!e.shiftKey){yd(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){Cr(Ke(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=j();if(!o){let i=fd(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||T<=0)||!n&&T>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),bd(n,t))}function xd(e){if(Sr(e.target)){if(nn){Fa(Lr);return}G&&(G=!1,Ze(),T=j().length)}}function wd(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(ze);n instanceof HTMLElement&&Cr(Ke(n))}function Ed(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(ro);if(!n||!(n instanceof HTMLElement)||H(n))return;let o=Ee();o&&Cr(Ke(o))}function Sd(e){if(!(!G||nn)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}G=!1,Ze()}}function Ld(){if(tn)return;tn=new AbortController;let{signal:e}=tn,t={capture:!0,signal:e};window.addEventListener("keydown",vd,t),window.addEventListener("input",xd,t),window.addEventListener("submit",wd,t),window.addEventListener("click",Ed,t),window.addEventListener("pointerdown",Sd,t)}function Td(e){let t=j().slice();t.splice(e,1),vo(t),T>t.length&&(T=t.length)}function Cd(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=j().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(f=>f.toLowerCase().includes(a)):i,c=Math.max(1,Math.ceil(s.length/bo));n>=c&&(n=c-1);let l=s.slice(n*bo,n*bo+bo);e.replaceChildren();let d=document.createElement("input");if(d.className="bloom-ih-search",d.type="search",d.placeholder="Search history",d.autocomplete="off",d.value=t,d.addEventListener("input",()=>{t=d.value,n=0,r()}),e.appendChild(d),l.length){let f=document.createElement("div");f.className="bloom-ih-list",l.forEach((S,A)=>{let N=i.indexOf(S),Mt=j().length-1-N,He=document.createElement("div");He.className="bloom-ih-item";let Q=document.createElement("button");Q.type="button",Q.className=`bloom-ih-body${o===A?"":" bloom-ih-clamp"}`,Q.textContent=S,Q.addEventListener("click",()=>{o=o===A?-1:A,r()});let At=document.createElement("div");At.className="bloom-ih-actions";let Ie=document.createElement("button");Ie.type="button",Ie.title="Copy",Ie.textContent="C",Ie.addEventListener("click",()=>{fi(S)});let he=document.createElement("button");he.type="button",he.title="Delete",he.textContent="\xD7",he.addEventListener("click",()=>{Td(Mt),r()}),At.append(Ie,he),He.append(Q,At),f.appendChild(He)}),e.appendChild(f)}else{let f=document.createElement("p");f.className="bloom-ih-empty",f.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(f)}let u=document.createElement("div");u.className="bloom-ih-pager";let m=document.createElement("button");m.type="button",m.className="bloom-ih-btn",m.textContent="Prev",m.disabled=n<=0,m.addEventListener("click",()=>{n-=1,r()});let x=document.createElement("span");x.textContent=`${n+1} / ${c}`;let b=document.createElement("button");b.type="button",b.className="bloom-ih-btn",b.textContent="Next",b.disabled=n+1>=c,b.addEventListener("click",()=>{n+=1,r()});let p=document.createElement("button");p.type="button",p.className="bloom-ih-clear",p.textContent="Clear all",p.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(vo([]),T=0,r())}),u.append(m,x,b,p),e.appendChild(u)};return r(),()=>{e.replaceChildren()}}var Ga=h({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:yo,startAt:"HostReady",managedStyle:"inputHistory",start(){L("inputHistory",Ba),T=j().length,G=!1,Ld()},stop(){tn?.abort(),tn=null,Ze(),gd(),xr.clear(),clearTimeout(Er),nn=!1,Tr=null,G=!1},onSettingsChange(){let e=j(),t=qa(e);t.length!==e.length&&vo(t),T>t.length&&(T=t.length)}});var kr="noShareLink",kd=['button[data-testid="share-chat-button"]'],Md=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],Mr=E({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Ka(e){return`${e.join(",")}{display:none!important}`}function Ua(){let e=[];if(Mr.store.hideShareChat!==!1&&e.push(Ka(kd)),Mr.store.hideShareProject!==!1&&e.push(Ka(Md)),!e.length){y(kr);return}L(kr,e.join(`
`))}var Va=h({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Mr,start:Ua,onSettingsChange:Ua,stop(){y(kr)}});var Xa="noDictation",Ad=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]'],Pd=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Ja=E({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Wa(e){return`${e.join(",")}{display:none!important}`}function Ya(){let e=[Wa(Ad)];Ja.store.hideDictationSettings!==!1&&e.push(Wa(Pd)),L(Xa,e.join(`
`))}var Za=h({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Ja,start:Ya,onSettingsChange:Ya,stop(){y(Xa)}});var Ar="noSidebarIdentity",Qe=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Pr=Qe.flatMap(e=>[`${e} .min-w-0 > .truncate`,`${e} .min-w-0.flex-1 .truncate`]),ns=Qe.flatMap(e=>[`${e} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),Rd=[...Pr,...ns],Qa=[...Pr,...Qe.flatMap(e=>[`${e} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],Nd=Qe.map(e=>`${e} a[href^="mailto:"]`),Hd=Qe.flatMap(e=>[`${e} .min-w-0 > :not(.truncate)`,`${e} .min-w-0 > :not(.truncate) *`,`${e} .min-w-0 .text-xs`,`${e} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${e} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${e} .text-xs:not(.truncate)`,`${e} .text-token-text-secondary:not(.truncate)`,`${e} .text-token-text-tertiary:not(.truncate)`,`${e} .min-w-0 ~ *`,`${e} .min-w-0 ~ * *`,`${e} > .text-xs`,`${e} > .text-token-text-secondary`,`${e} > .text-token-text-tertiary`]),Id=Qe.flatMap(e=>[`${e} .min-w-0.flex-col > :not(.truncate)`,`${e} .min-w-0.flex-col > .text-xs`,`${e} .min-w-0.flex-col > .text-token-text-secondary`,`${e} .min-w-0.flex-col > .text-token-text-tertiary`,`${e} .min-w-0:not(.flex) > :not(.truncate)`,`${e} .min-w-0:not(.flex) > .text-xs`,`${e} .min-w-0:not(.flex) > .text-token-text-secondary`,`${e} .min-w-0:not(.flex) > .text-token-text-tertiary`]),on=E({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function es(e){return`${e.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Od(e){return`${e.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function Bd(){return`${Id.join(",")}{margin-block:auto!important}`}function Dd(){return`${Hd.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function ts(){let e=on.store.hideUsername!==!1,t=on.store.hideEmail!==!1,n=e&&on.store.enlargePlan!==!1,o=e&&on.store.alignPlanWithAvatar===!0,r=[];if(e&&(o?(r.push(Od(n?Qa:[...Qa,...ns])),r.push(Bd())):r.push(es(n?Pr:Rd))),t&&r.push(es(Nd)),n&&r.push(Dd()),!r.length){y(Ar);return}L(Ar,r.join(`
`))}var os=h({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:on,start:ts,onSettingsChange:ts,stop(){y(Ar)}});var rs=`#bloom-rt-host {
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
`;var ss=new w("RecentTopics"),nt="bloom-rt-host",ls="home",cs=/^\/c\/([a-z0-9_-]{8,})/i,$d=/\/c\/([a-z0-9_-]{8,})/i,ds=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,jd=new Set(["Backquote","IntlBackslash"]),qd=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Fd=140,zd=[3,4,5,6,7,8,9,10,11,12].map(e=>({label:String(e),value:String(e),default:e===5})),C=E({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:zd},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),xo=null,Rr=null,I=!1,dn=!1,rn=!1,K=0,Te="",et=null,an=null,tt;function Gd(){let e=Number(C.store.maxRecent??5);return Number.isFinite(e)&&e>=3&&e<=12?e:5}function sn(){let e=C.plain.visits;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Nr(){let e=C.plain.titles;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function us(){let e=C.plain.previews;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Hr(){let e=C.plain.projects;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Eo(e){let t=Gd();return e.length>t?e.slice(0,t):e}function U(e){return e===ls}function ln(e,t=Fd){let n=e.replace(/\s+/g," ").trim();return n.length<=t?n:`${n.slice(0,t-1)}\u2026`}function Ir(e){if(!e)return"";try{return new URL(e,location.origin).pathname.match(cs)?.[1]??""}catch{return e.match($d)?.[1]??""}}function Ce(){let e=(location.pathname||"/").match(cs);if(e?.[1])return e[1];let n=R().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return ls}function Or(e){if(U(e))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${e}"]`);for(let o of n){if(Ir(o.getAttribute("href")||"")!==e)continue;let r=ln(o.textContent||"",80);if(r)return r}}catch{}let t=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return Ce()===e&&t&&!/^ChatGPT$/i.test(t)?ln(t,80):""}function Kd(e){return U(e)?"New chat":Nr()[e]||Or(e)||"Chat"}function Ud(e){return Hr()[e]||""}function Vd(e){return us()[e]||{}}function ms(e,t){if(!e||U(e)||!t)return;let n=Nr();n[e]!==t&&(n[e]=t,C.store.titles=n)}function Wd(e,t){if(!e||U(e)||!t)return;let n=Hr();n[e]!==t&&(n[e]=t,C.store.projects=n)}function Yd(e,t){if(!e||U(e)||!t.user&&!t.assistant)return;let n=us(),o=n[e]||{},r={user:t.user||o.user,assistant:t.assistant||o.assistant};o.user===r.user&&o.assistant===r.assistant||(n[e]=r,C.store.previews=n)}function Br(e){if(!e||U(e)&&C.store.includeHome===!1)return;let t=sn().filter(n=>n!==e);t.unshift(e),C.store.visits=Eo(t)}function So(){let e=C.store.includeHome!==!1;return Eo(sn().filter(n=>e||!U(n))).map(n=>({id:n,title:Kd(n),project:Ud(n),preview:Vd(n)}))}function is(e){try{let t=document.querySelectorAll(`[data-message-author-role="${e}"]`),n=t[t.length-1];if(!(n instanceof HTMLElement))return"";let o=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||o.push(a)}let r=o.length?o.join(" "):n.textContent||"";return ln(r)}catch{return""}}function cn(e){if(!e||U(e)||e!==Ce())return;let t=Or(e);t&&ms(e,t);let n=is("user"),o=is("assistant");Yd(e,{user:n,assistant:o});let r=ps(e);if(r){let i=fs(r);i&&Wd(e,i)}}function Dr(){let e=Nr(),t=Hr(),n=[],o=new Set,r=!1,i=!1;try{for(let l of document.querySelectorAll('a[href*="/c/"]')){if(l.closest(`#${nt}, #bloom-root, #bloom-sidebar-panel`))continue;let d=Ir(l.getAttribute("href")||"");if(!d||o.has(d))continue;o.add(d),n.push(d);let u=ln(l.textContent||"",80);u&&!ds.test(u)&&e[d]!==u&&(e[d]=u,r=!0);let m=fs(l);m&&t[d]!==m&&(t[d]=m,i=!0)}}catch{}r&&(C.store.titles=e),i&&(C.store.projects=t);let a=sn(),s=new Set(a),c=n.filter(l=>!s.has(l));c.length&&(C.store.visits=Eo([...a,...c]))}function fs(e){let t=e.parentElement;for(let n=0;n<10&&t;n++){if(t.id==="bloom-rt-host"||t.id==="bloom-root"){t=t.parentElement;continue}let o=t.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),r=ln((o instanceof HTMLElement?o.textContent:"")||"",60);if(r&&!ds.test(r)&&!/^20\d{2}/.test(r)&&r!==e.textContent?.trim()&&t.querySelector('a[href^="/c/"]'))return r;t=t.parentElement}return""}function ps(e){if(U(e)){let t=document.querySelector('[data-testid="create-new-chat-button"]');return t instanceof HTMLAnchorElement?t:document.querySelector('a[href="/"]')}try{for(let t of document.querySelectorAll(`a[href*="/c/${e}"]`))if(Ir(t.getAttribute("href")||"")===e)return t}catch{}return null}function Xd(e){let t=ps(e);if(t){t.click();return}if(U(e)){location.assign("/");return}location.assign(`/c/${e}`)}function Jd(){let e=Ce();Te&&Te!==e&&cn(Te),Te=e,Br(e),Dr();let t=Or(e);t&&ms(e,t),cn(e)}function wo(){tt===void 0&&(tt=window.setTimeout(()=>{tt=void 0,Jd()},120))}function Zd(){et||(et=history.pushState.bind(history),an=history.replaceState.bind(history),history.pushState=function(...t){let n=et(...t);return wo(),n},history.replaceState=function(...t){let n=an(...t);return wo(),n})}function Qd(){et&&(history.pushState=et),an&&(history.replaceState=an),et=null,an=null}function eu(e){return jd.has(e.code)||e.keyCode===192?!0:qd.has(e.key)}function gs(e){return e.key==="Control"||e.code==="ControlLeft"||e.code==="ControlRight"}function tu(e,t){dn=t,Dr(),cn(Ce()),I=!0,K=0;try{let n=Ce();Br(n);let o=So();o.length>1&&(K=e?o.length-1:1)}catch(n){ss.error("Failed to open switcher:",n)}un()}function as(e){let{length:t}=So();t&&(K=(K+(e?-1:1)+t)%t,un())}function _r(){if(!I)return;let e=So()[K];I=!1,dn=!1,un(),e&&Xd(e.id)}function hs(){I&&(I=!1,dn=!1,un())}function nu(e){if(gs(e)){rn=!0;return}if((e.ctrlKey||rn)&&!e.altKey&&!e.metaKey&&eu(e)&&!e.repeat){e.preventDefault(),e.stopImmediatePropagation();try{I?as(e.shiftKey):tu(e.shiftKey,!0)}catch(n){ss.error("Hotkey failed:",n)}return}if(I){if(e.key==="Escape"){e.preventDefault(),hs();return}if(e.key==="Enter"&&!e.shiftKey){e.preventDefault(),_r();return}e.key==="Tab"&&(e.ctrlKey||rn)&&(e.preventDefault(),as(e.shiftKey))}}function ou(e){gs(e)&&(rn=!1,I&&dn&&_r())}function ru(e){let t=e.target instanceof Element?e.target:null;!t||!t.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(wo)}function iu(e){!I||(e.target instanceof Element?e.target:null)?.closest(`#${nt}`)||hs()}function au(){document.visibilityState==="hidden"&&cn(Ce())}function su(){if(!document.body)return null;let e=document.getElementById(nt);if(e instanceof HTMLElement)return Rr=e,e;e=document.createElement("div"),e.id=nt;let t=document.createElement("div");return t.className="bloom-rt-panel",t.setAttribute("role","listbox"),t.setAttribute("aria-label","Recent conversations"),t.dataset.visible="false",t.addEventListener("click",n=>n.stopPropagation()),e.append(t),document.body.append(e),Rr=e,e}function un(){let e=su();if(!e)return;let t=e.querySelector(".bloom-rt-panel");if(!t)return;if(!I){t.dataset.visible="false",t.replaceChildren();return}let n=So();if(!n.length){t.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",t.replaceChildren(i);return}K>=n.length&&(K=0);let o=document.createElement("div");o.className="bloom-rt-list",o.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===K?"true":"false",s.setAttribute("aria-selected",a===K?"true":"false");let c=document.createElement("div");if(c.className="bloom-rt-name",c.textContent=i.title,s.append(c),i.project){let l=document.createElement("div");l.className="bloom-rt-project",l.textContent=i.project,s.append(l)}if(i.preview.user||i.preview.assistant){let l=document.createElement("div");if(l.className="bloom-rt-preview",i.preview.user){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="user",d.textContent=i.preview.user,l.append(d)}if(i.preview.assistant){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="assistant",d.textContent=i.preview.assistant,l.append(d)}s.append(l)}s.addEventListener("click",()=>{K=a,_r()}),o.append(s)}),t.replaceChildren(o),t.dataset.visible="true",t.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function lu(){document.getElementById(nt)?.remove(),Rr=null}var bs=h({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${nt}`],settings:C,start(){L("recentTopics",rs),Te=Ce(),Br(Te),Dr(),cn(Te),Zd(),xo=new AbortController;let{signal:e}=xo;window.addEventListener("keydown",nu,{capture:!0,signal:e}),window.addEventListener("keyup",ou,{capture:!0,signal:e}),window.addEventListener("popstate",wo,{signal:e}),document.addEventListener("click",ru,{capture:!0,signal:e}),document.addEventListener("click",iu,{signal:e}),document.addEventListener("visibilitychange",au,{signal:e})},stop(){xo?.abort(),xo=null,tt!==void 0&&(clearTimeout(tt),tt=void 0),Qd(),I=!1,dn=!1,rn=!1,lu()},onSettingsChange(){let e=Eo(sn());e.length!==sn().length&&(C.store.visits=e),I&&un()}});var $r="cleaner",cu=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],du=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],uu=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],mu=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],fu=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]'],pu=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],ke=E({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function ot(e){return`${e.join(",")}{display:none!important}`}function ys(){let e=[];if(ke.store.hideDownloadApps!==!1&&e.push(ot(cu)),ke.store.hideDisclaimer!==!1&&e.push(ot(du)),ke.store.hideUpgrade!==!1&&e.push(ot(uu)),ke.store.hideLockedModels!==!1&&e.push(ot(mu)),ke.store.hideHomePromo!==!1&&e.push(ot(fu)),ke.store.hideAds!==!1&&e.push(ot(pu)),!e.length){y($r);return}L($r,e.join(`
`))}var vs=h({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:ke,start:ys,onSettingsChange:ys,stop(){y($r)}});var Lo=new w("ResponseNotification"),gu=400,hu=3,lt=E({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:Su},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),jr=!1,Pe=!1,Me=0,Ae="",st=!1,mn="",rt,it=null,at=null;function xs(){return le(R())}function bu(){return document.visibilityState==="hidden"||document.hidden}function yu(){return lt.store.onlyWhenHidden===!1?!0:bu()}function vu(){let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function ws(){try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!at||at.state==="closed")&&(at=new e);let t=at,n=t.currentTime,o=[523.25,659.25];for(let r=0;r<o.length;r++){let i=t.createOscillator(),a=t.createGain();i.type="sine",i.frequency.value=o[r];let s=n+r*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(t.destination),i.start(s),i.stop(s+.24)}t.resume?.()}catch(e){Lo.debug("chime failed",e)}}function xu(e){try{let t=new Audio(e);t.volume=.7,t.play()}catch(t){Lo.debug("custom sound failed",t),ws()}}function Es(){let e=String(lt.store.soundUrl||"").trim();e?xu(e):ws()}function wu(){let e="Bloom++",t=`${vu()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:e,text:t,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(e,{body:t,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){Lo.debug("notification failed",n)}}function Eu(){yu()&&(lt.store.sound!==!1&&Es(),lt.store.browserNotification!==!1&&wu())}function Su(e){let t=document.createElement("button");return t.type="button",t.textContent="Play",t.addEventListener("click",()=>Es()),e.appendChild(t),()=>{t.remove()}}function Lu(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest("button");n instanceof HTMLElement&&H(n)&&(st=!0)}function Tu(){if(!jr)return;let e=R()||location.pathname;if(mn&&e&&mn!==e){Pe=!1,Me=0,Ae="",st=!1,mn=e;return}mn=e;let t=D(),n=xs();if(t){Pe=!0,Me=0,Ae=n;return}if(!Pe||(Me+=1,Me<hu))return;let o=!!Ae&&Ae===n,r=st,i=de();Pe=!1,Me=0,st=!1,Ae="",!(!o||r||i)&&Eu()}var Ss=h({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:lt,start(){jr=!0,Pe=D(),Me=0,Ae=Pe?xs():"",st=!1,mn=R()||location.pathname,it?.abort(),it=new AbortController,document.addEventListener("click",Lu,{capture:!0,signal:it.signal}),rt!==void 0&&clearInterval(rt),rt=setInterval(Tu,gu),lt.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:it.signal}),Lo.debug("watch started")},stop(){jr=!1,rt!==void 0&&(clearInterval(rt),rt=void 0),it?.abort(),it=null,Pe=!1,Me=0,Ae="",st=!1;try{at?.close()}catch{}at=null}});var ks=new w("Harvest"),Cu=1500,ku=200,To=new Set,Co=new Map,ko=new Map,ct=null,Mo=null,fn=null,V=0;function Mu(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Au(e){try{if(typeof e=="string")return e;if(e instanceof URL)return e.href;if(typeof Request<"u"&&e instanceof Request)return e.url}catch{}return String(e)}function Pu(e,t){let n=t?.method,o=typeof Request<"u"&&e instanceof Request?e.method:"";return(n||o||"GET").toUpperCase()}function Ms(e){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(e)}function Ru(e,t){return t!=="POST"||Ms(e)?!1:/\/backend-api\/(?:f\/)?conversation(?:\/|\?|$)/i.test(e)}function Nu(e,t){return t!=="GET"||Ms(e)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(e)}function Ls(e){return e.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function As(e){return e?e.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function Hu(e){return typeof e=="string"?As(e):""}function qr(e){if(typeof e=="number"&&Number.isFinite(e)&&e>0)return e>1e12?e:Math.round(e*1e3);if(typeof e=="string"){let t=e.trim();if(!t)return null;if(/^\d+(\.\d+)?$/.test(t))return qr(Number(t));let n=Date.parse(t);return Number.isFinite(n)?n:null}return null}function Ps(e,t){if(e.size<=t)return;let n=e.size-t,o=0;for(let r of e.keys())if(e.delete(r),++o>=n)break}function Ts(e,t,n){!e||!t||ko.get(e)!==t&&(ko.set(e,t),Ps(ko,Cu),ue({type:"message-time",messageId:e,createTime:t,conversationId:n}))}function Iu(e,t){let n=t.trim();!e||!n||Co.get(e)!==n&&(Co.set(e,n),Ps(Co,ku),ue({type:"conversation-meta",conversationId:e,title:n}))}function pn(e,t,n=0){if(n>6||!e||typeof e!="object")return;if(Array.isArray(e)){for(let c of e)pn(c,t,n+1);return}let o=e,r=typeof o.conversation_id=="string"&&o.conversation_id||typeof o.conversationId=="string"&&o.conversationId||t;typeof o.title=="string"&&r&&!o.author&&!o.content&&!o.role&&Iu(r,o.title);let i=o.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let c=i,l=typeof c.id=="string"?c.id:"",d=qr(c.create_time??c.createTime??c.created_at);l&&d&&Ts(l,d,r)}let a=typeof o.id=="string"?o.id:"",s=qr(o.create_time??o.createTime??o.created_at);if(a&&s&&(o.author||o.content||o.role||o.create_time||o.createTime)&&Ts(a,s,r),o.mapping&&typeof o.mapping=="object")pn(o.mapping,r,n+1);else if(n<3)for(let c of Object.values(o))c&&typeof c=="object"&&pn(c,r,n+1)}function Cs(e,t){if(e)try{pn(JSON.parse(e),t)}catch{}}function ue(e){for(let t of Array.from(To))try{t(e)}catch{}}async function Ou(e,t,n){if(n===V)try{let o=await e.json();if(n!==V)return;pn(o,t)}catch{}}async function Bu(e,t,n,o){let r=t,i=n,a=e.body;if(!a){o===V&&ue({type:"post-end",conversationId:r,error:i});return}let s=a.getReader(),c=new TextDecoder,l="";try{for(;o===V;){let{done:d,value:u}=await s.read();if(d)break;if(l+=c.decode(u,{stream:!0}),!r){let x=As(l);x&&(r=x,ue({type:"post-start",conversationId:r,url:""}))}let m=l.split(`
`);l=m.pop()??"";for(let x of m){let b=x.replace(/^data:\s*/,"").trim();!b||b==="[DONE]"||Cs(b,r)}/\[DONE\]/.test(l)||/"error"\s*:\s*\{/.test(l)?(/"error"\s*:\s*\{/.test(l)&&(i=!0),l=l.slice(-64)):l.length>16384&&(l=l.slice(-4096))}l&&o===V&&Cs(l.replace(/^data:\s*/,""),r)}catch{i=!0}finally{try{s.cancel()}catch{}}o===V&&ue({type:"post-end",conversationId:r,error:i})}function Du(e,t,n){let o=Au(t),r=Pu(t,n),i=Nu(o,r),a=Ru(o,r),s=V,c="";return a&&(c=Hu(n?.body)||Ls(o)||Ve(o)||ce(),ue({type:"post-start",conversationId:c,url:o})),e(t,n).then(l=>{if(s!==V||!i&&!a)return l;try{let d=l.clone();i?Ou(d,Ls(o)||ce(),s):Bu(d,c,!l.ok,s)}catch{a&&ue({type:"post-end",conversationId:c,error:!l.ok})}return l},l=>{throw a&&s===V&&ue({type:"post-end",conversationId:c,error:!0}),l})}function _u(){if(ct)return;let e=Mu();fn=e,ct=e.fetch.bind(e);let t=(n,o)=>Du(ct,n,o);Mo=t,e.fetch=t,ks.debug("conversation fetch harvest hooked")}function $u(){V+=1,!(!ct||!fn)&&(Mo&&fn.fetch===Mo&&(fn.fetch=ct),ct=null,Mo=null,fn=null,ks.debug("conversation fetch harvest unhooked"))}function dt(e){return To.add(e),_u(),()=>{To.delete(e),To.size===0&&$u()}}function Rs(e){return e?Co.get(e)??"":""}function Ao(e){return e?ko.get(e)??null:null}var Ns=`.bloom-cls {
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
`;var Bs=new w("ChatListStatus"),Hs="chatListStatus",Ro="bloom-cls",qu="bloom-cls",Fu=500,zu=1200*1e3,Gu="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",fe=new Map,pe=!1,mt="",gn=!1,ut,pt=0,me=null,Gr=null,ft=null,Fr=null,gt=!1;function Po(){return Date.now()}function Ds(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function ht(e,t,n,o=!0){if(!(!e||!pe)){if(t==="idle")fe.delete(e);else{let r=fe.get(e);r&&r.kind===t&&n!=="net"?r.at=Po():fe.set(e,{kind:t,at:Po(),source:n})}o&&Ku({v:1,id:e,kind:t,at:Po()}),No()}}function Ku(e){try{ft?.postMessage(e)}catch{}}function Uu(e){let t=e.data;!t||t.v!==1||!t.id||t.kind!=="streaming"&&t.kind!=="done"&&t.kind!=="error"&&t.kind!=="idle"||ht(t.id,t.kind,"bc",!1)}function Vu(){let e=Po();for(let[t,n]of fe)n.kind==="streaming"&&e-n.at>zu&&fe.delete(t)}function Wu(){let e=Ds();if(!e)return[];let t=[],n=new Set;try{for(let o of e.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(o.closest(Gu))continue;let r=Ve(o.getAttribute("href")||"");!r||n.has(r)||(n.add(r),t.push(o))}}catch{}return t}function Is(e){let t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),e==="streaming")t.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("cx","12"),o.setAttribute("cy","12"),o.setAttribute("r","9"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","2"),t.appendChild(o)}return t.appendChild(n),t}function zr(e){let t=e.querySelector(`:scope > .${Ro}`);return t||null}function Yu(){if(!pe)return;Vu();let e=ce(),t=Wu();me?.disconnect();try{for(let n of t){let o=Ve(n.getAttribute("href")||"");if(!o||!e||o!==e){zr(n)?.remove();continue}let i=fe.get(o)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){zr(n)?.remove();continue}let a=zr(n);a||(a=document.createElement("span"),a.className=Ro,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(Is("streaming")):i==="error"&&a.appendChild(Is("error")))}}catch(n){Bs.debug("paint failed",n)}_s()}function No(){!pe||pt||(pt=requestAnimationFrame(()=>{pt=0,pe&&Yu()}))}function _s(){let e=Ds();if(!(me&&Gr===e&&e?.isConnected)){if(me?.disconnect(),Gr=e,!e){me=null;return}me=new MutationObserver(()=>No()),me.observe(e,{childList:!0,subtree:!0})}}function Xu(e){if(pe){if(e.type==="post-start"){e.conversationId?(gt=!1,ht(e.conversationId,"streaming","net")):gt=!0;return}e.type==="post-end"&&(gt=!1,e.conversationId&&ht(e.conversationId,e.error?"error":"done","net"))}}function Os(){if(!pe)return;let e=ce();if(mt&&e&&mt!==e){let n=fe.get(mt);n?.kind==="streaming"&&n.source==="local"&&ht(mt,de()?"error":"done","local"),gn=!1}if(mt=e,D()){gn=!0,e&&ht(e,"streaming","local"),No();return}gn&&(gn=!1,e&&ht(e,de()?"error":"done","local")),gt=!1,No()}var $s=h({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Ro}`],start(){pe=!0,L(Hs,Ns);try{ft=new BroadcastChannel(qu)}catch{ft=null}ft?.addEventListener("message",Uu),Fr=dt(Xu),_s(),ut!==void 0&&clearInterval(ut),ut=setInterval(Os,Fu),Os(),Bs.debug("sidebar status watch started")},stop(){pe=!1,pt&&cancelAnimationFrame(pt),pt=0,ut!==void 0&&(clearInterval(ut),ut=void 0),me?.disconnect(),me=null,Gr=null,Fr?.(),Fr=null;try{ft?.close()}catch{}ft=null,fe.clear(),gt=!1,gn=!1,mt="",document.querySelectorAll(`.${Ro}`).forEach(e=>e.remove()),y(Hs)}});var qs="widerChat",Fs=40,zs=96,Gs=64,Ks=E({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:Fs,max:zs,default:Gs}});function Ju(){return Be(Number(Ks.store.width??Gs),Fs,zs)}function js(){let e=Ju();L(qs,`:root{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important}[class*="--thread-content-max-width"]{--thread-content-max-width:${e}rem!important}[class*="thread-content-max-width"]{max-width:min(100%,${e}rem)!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"]{max-width:min(100%,${e}rem)!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:min(100%,${e}rem)!important}`)}var Us=h({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Ks,start:js,onSettingsChange:js,stop(){y(qs)}});var Vs=`.bloom-ts {
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
`;function Ws(e,t,n=Date.now()){let o=new Date(e);if(Number.isNaN(o.getTime()))return"";let r=new Date(n),i=o.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(o.toDateString()===r.toDateString()||!t)return i;let s=o.getFullYear()===r.getFullYear();return`${o.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Ys(e){try{return new Date(e).toISOString()}catch{return""}}var Qs=new w("MessageTimestamps"),Xs="messageTimestamps",Ho="bloom-ts",Js=1500,Qu="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",vt=E({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),xt=new Map,wt=!1,yt=0,bt,ge=null,Ur=null,Kr=null,Zs=!1;function el(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function Vr(){let e=vt.plain.stamps;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function tl(){let e={...Vr()};for(let[n,o]of xt)e[n]=o;let t=Object.keys(e);if(t.length>Js){let n=t.slice(t.length-Js),o={};for(let r of n)o[r]=e[r];vt.store.stamps=o;return}vt.store.stamps=e}var em=pi(tl,500);function nl(e,t){!e||!t||xt.get(e)===t||(xt.set(e,t),em(),hn())}function tm(e){return e?xt.get(e)??Vr()[e]??Ao(e)??null:null}function nm(e){wt&&e.type==="message-time"&&nl(e.messageId,e.createTime)}function om(e){return(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function rm(){let e=el();if(!e)return[];let t=[];try{for(let n of e.querySelectorAll("[data-message-id]"))n.closest(Qu)||t.push(n)}catch{}return t}function im(e){try{return!!e.querySelector("time:not(.bloom-ts)")}catch{return!1}}function am(){if(!wt)return;let e=vt.store.hideOwnMessages===!0,t=vt.store.showDate!==!1,n=D(),o=rm();ge?.disconnect();try{o.forEach((r,i)=>{let a=r.getAttribute("data-message-id")||"",s=om(r),c=r.querySelector(`:scope > .${Ho}`);if(e&&s==="user"){c?.remove();return}if(im(r)){c?.remove();return}let l=tm(a);if(!l&&a&&(n||Zs)&&i>=o.length-2&&(l=Date.now(),nl(a,l)),!l){c?.remove();return}let d=Ws(l,t);if(!d){c?.remove();return}let u=c;u||(u=document.createElement("time"),u.className=Ho,u.setAttribute("aria-hidden","true"),r.insertBefore(u,r.firstChild)),u.textContent!==d&&(u.textContent=d);let m=Ys(l);m&&u.getAttribute("datetime")!==m&&u.setAttribute("datetime",m)})}catch(r){Qs.debug("paint failed",r)}Zs=n,ol()}function hn(){!wt||yt||(yt=requestAnimationFrame(()=>{yt=0,wt&&am()}))}function ol(){let e=el();if(!(ge&&Ur===e&&e?.isConnected)){if(ge?.disconnect(),Ur=e,!e||e===document.body){ge=null;return}ge=new MutationObserver(()=>hn()),ge.observe(e,{childList:!0,subtree:!0})}}var rl=h({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Ho}`],settings:vt,start(){wt=!0,L(Xs,Vs);let e=Vr();for(let[t,n]of Object.entries(e))typeof n=="number"&&n>0&&xt.set(t,n);Kr=dt(nm),ol(),bt!==void 0&&clearInterval(bt),bt=setInterval(hn,800),hn(),Qs.debug("timestamp watch started")},stop(){wt=!1,yt&&cancelAnimationFrame(yt),yt=0,bt!==void 0&&(clearInterval(bt),bt=void 0),ge?.disconnect(),ge=null,Ur=null,Kr?.(),Kr=null,tl(),xt.clear(),document.querySelectorAll(`.${Ho}`).forEach(e=>e.remove()),y(Xs)},onSettingsChange:hn});var Wr="streamerMode",sm="filter:blur(6px)!important;transition:filter .2s ease",lm="filter:none!important",bn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],Et=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function q(e,t){return e.map(n=>`${n} ${t}`)}var St=E({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0}});function yn(e,t=!0){let n=e.join(","),o=e.map(r=>`${r}:hover`).join(",");return`${n}{${sm}}${t?`${o}{${lm}}`:""}`}function il(){let e=[];if(St.store.conversations!==!1&&e.push(yn([...q(Et,'a[href^="/c/"]'),...q(Et,'a[href*="/c/"]')])),St.store.projects!==!1&&e.push(yn([...q(Et,'a[href*="/project"]'),...q(Et,'a[href*="/g/g-p-"]'),...q(Et,'[data-testid="project-name"]'),...q(Et,'[data-testid="project-link"]')])),St.store.accountAvatar!==!1&&e.push(yn([...q(bn,"img"),...q(bn,'[class*="avatar"]')],!1)),St.store.accountName!==!1&&e.push(yn([...q(bn,".min-w-0 > .truncate"),...q(bn,".min-w-0.flex-1 .truncate")],!1)),St.store.accountEmail!==!1&&e.push(yn([...q(bn,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),e.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),!e.length){y(Wr);return}L(Wr,e.join(`
`))}var al=h({name:"StreamerMode",description:"Blur Recents titles, project names, and the account chip while you stream.",authors:[v.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:St,start:il,onSettingsChange:il,stop(){y(Wr)}});var sl=`.bloom-gc-panel {
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
}`;var dm=new w("GreetingCustomizer"),Lt="greetingCustomizer",ll="greetingCustomizerUi",vn=100,Yr=30,um=120,mm=1e3,fm=50,pm=40,gm=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog"].join(", "),xn=["h1.text-page-header",'h1[class*="text-page-header"]',"[data-splash-headline-option] h1",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),Xr=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function hm(e){return!!e?.closest(gm)}function ml(e){return!!(hm(e)||e.closest('[data-testid="temporary-chat-label"]')||e.closest("[hidden]")||e.getAttribute("aria-hidden")==="true"||e.classList.contains("sr-only"))}function _o(e){try{for(let t of document.querySelectorAll(e))if(!ml(t))return t}catch{}return null}var fl=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],k=E({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:Nm},greetings:{type:0,description:"Greeting texts",hidden:!0,default:fl},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),W=!1,kt=!1,Ne=null,Oo,wn,Tt,En,Bo=0,Io=null,Ct=null,Sn=null,Ln=null,Tn=null,Do=null;function Z(){let e=location.pathname||"/";return e==="/"||e===""}function Re(){let e=k.plain.greetings;return Array.isArray(e)?e.filter(t=>typeof t=="string"):fl.slice()}function Cn(e){return String(e??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function cl(e){k.store.greetings=e.slice(0,Yr)}function kn(){let e=String(k.store.mode??"refresh");return e==="interval"||e==="manual"?e:"refresh"}function bm(){return k.store.order==="random"?"random":"sequential"}function ym(){return Be(Number(k.store.intervalSec??10),1,3600)*1e3}function vm(e){return String(e??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function xm(){return!!_o(Xr)}function $o(){return!!(_o(Xr)||_o(xn))}function wm(e,t){let n=["font-size:0!important","line-height:0!important","visibility:hidden!important","display:block!important"].join(";"),o=[`content:"${e}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),r=xm()||!_o(xn)?Xr:xn,i=t?`${xn}{cursor:pointer!important;user-select:none!important}`:"";return[`${r}{${n}}`,`${r}::before{${o}}`,i,`@media (max-width:768px){${r}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function Em(e,t){if(e<=0)return 0;if(e===1)return Number(k.plain.index)!==0&&(k.store.index=0),Number(k.plain.lastRandom)!==0&&(k.store.lastRandom=0),0;let n=Number(k.plain.index),o=Number(k.plain.lastRandom);if(!t)return n>=0&&n<e?n:0;if(bm()==="random"){let a=n>=0&&n<e?n:o,s=Math.floor(Math.random()*e),c=0;for(;s===a&&c++<10;)s=Math.floor(Math.random()*e);return k.store.index=s,k.store.lastRandom=s,s}let i=((n>=-1&&n<e?n:-1)+1)%e;return k.store.index=i,i}function J(e){if(!W)return;if(!Z()){y(Lt);return}let t=Re().map(Cn).filter(Boolean);if(!t.length){y(Lt);return}let n=Em(t.length,e),o=t[n]??t[0],r=kn()==="manual"&&t.length>1;L(Lt,wm(vm(o),r)),Do?.()}function Jr(){Oo!==void 0&&(clearInterval(Oo),Oo=void 0)}function Zr(){Jr(),!(!W||!Z())&&kn()==="interval"&&(Re().filter(Boolean).length<=1||(Oo=setInterval(()=>J(!0),ym())))}function Qr(){En!==void 0&&(clearTimeout(En),En=void 0),Bo=0}function dl(){if(Qr(),!W||!Z())return;Bo=pm;let e=()=>{if(En=void 0,!(!W||!Z())){if($o()){kn()==="refresh"&&!kt?(kt=!0,J(!0)):J(!1),Zr();return}Bo-=1,Bo>0&&(En=setTimeout(e,fm))}};e()}function ei(){if(Ne===!0){$o()?J(!1):dl();return}Ne=!0,kt=!1,kn()==="refresh"?(kt=!0,J(!0)):J(!1),Zr(),$o()||dl()}function ti(){Ne=!1,kt=!1,Jr(),Qr(),y(Lt)}function jo(){Tt===void 0&&(Tt=window.setTimeout(()=>{Tt=void 0,W&&(Z()?ei():Ne!==!1&&ti())},um))}function Sm(){Ct||(Ct=history.pushState.bind(history),Sn=history.replaceState.bind(history),Ln=function(...t){let n=Ct(...t);return jo(),n},Tn=function(...t){let n=Sn(...t);return jo(),n},history.pushState=Ln,history.replaceState=Tn)}function Lm(){Ln&&history.pushState===Ln&&Ct&&(history.pushState=Ct),Tn&&history.replaceState===Tn&&Sn&&(history.replaceState=Sn),Ct=null,Sn=null,Ln=null,Tn=null}function Tm(e){let t=e.target instanceof Element?e.target:null;t&&t.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(jo)}function Cm(e){if(!W||!Z()||kn()!=="manual"||Re().filter(Boolean).length<=1)return;let t=e.target instanceof Element?e.target:null;if(!t)return;let n=t.closest(xn);if(!n||ml(n))return;let o=window.getSelection?.();o&&String(o).trim()||J(!0)}function km(){wn===void 0&&(wn=setInterval(()=>{if(!W)return;let e=Z();if(e!==(Ne===!0)){e?ei():ti();return}e&&$o()&&J(!1)},mm))}function Mm(){wn!==void 0&&(clearInterval(wn),wn=void 0)}function ul(e,t){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=e,n.setAttribute("aria-label",e);let o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.75"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),o.setAttribute("aria-hidden","true");for(let r of t.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",r),o.appendChild(i)}return n.appendChild(o),n}var Am="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",Pm="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function Rm(e,t){let n=Cn(e);return n?n.length>vn?`Keep it to ${vn} characters.`:Re().length+(t?1:0)>Yr?`At most ${Yr} greetings.`:null:"Enter a greeting."}function Nm(e){e.className="bloom-gc-panel";let t="",n=-1,o="",r=-1,i=()=>{let a=Re(),s=Number(k.plain.index);e.replaceChildren();let c=document.createElement("div");c.className="bloom-gc-composer";let l=document.createElement("textarea");l.className="bloom-gc-input",l.rows=3,l.maxLength=vn,l.placeholder="New greeting (line breaks ok)",l.value=t,l.addEventListener("input",()=>{t=l.value,o="";let f=c.querySelector(".bloom-gc-count");f&&(f.textContent=`${Cn(t).length}/${vn}`);let S=c.querySelector(".bloom-gc-error");S&&(S.textContent="")}),c.appendChild(l);let d=document.createElement("div");d.className="bloom-gc-meta";let u=document.createElement("span");u.className="bloom-gc-count",u.textContent=`${Cn(t).length}/${vn}`;let m=document.createElement("span");m.className="bloom-gc-error",m.textContent=o;let x=document.createElement("div");if(x.className="bloom-gc-actions",n>=0){let f=document.createElement("button");f.type="button",f.className="bloom-gc-btn",f.textContent="Cancel",f.addEventListener("click",()=>{n=-1,t="",o="",i()}),x.appendChild(f)}let b=document.createElement("button");if(b.type="button",b.className="bloom-gc-btn bloom-gc-btn-primary",b.textContent=n>=0?"Update":"Add",b.addEventListener("click",()=>{let f=n<0,S=Rm(t,f);if(S){o=S,i();return}let A=Cn(t),N=Re().slice();n>=0&&n<N.length?N[n]=A:N.push(A),cl(N),n=-1,t="",o="",i()}),x.appendChild(b),d.append(u,m,x),c.appendChild(d),e.appendChild(c),!a.length){let f=document.createElement("p");f.className="bloom-gc-empty",f.textContent="No greetings. The official heading stays.",e.appendChild(f);return}let p=document.createElement("div");p.className="bloom-gc-list",a.forEach((f,S)=>{let A=document.createElement("div");A.className="bloom-gc-item",S===s&&(A.dataset.active="true");let N=document.createElement("button");N.type="button",N.className=`bloom-gc-body${r===S?"":" bloom-gc-clamp"}`,N.textContent=f,N.addEventListener("click",()=>{r=r===S?-1:S,i()});let Mt=document.createElement("div");Mt.className="bloom-gc-item-actions";let He=ul("Edit",Am);He.addEventListener("click",()=>{n=S,t=f,o="",i()});let Q=ul("Delete",Pm);Q.addEventListener("click",()=>{let At=Re().filter((Ie,he)=>he!==S);cl(At),n===S?(n=-1,t=""):n>S&&(n-=1),i()}),Mt.append(He,Q),A.append(N,Mt),p.appendChild(A)}),e.appendChild(p)};return Do=i,i(),()=>{Do===i&&(Do=null),e.replaceChildren()}}var pl=h({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:ll,settings:k,start(){W=!0,L(ll,sl),Sm(),Io=new AbortController;let{signal:e}=Io;window.addEventListener("popstate",jo,{signal:e}),document.addEventListener("click",Tm,{capture:!0,signal:e}),document.addEventListener("click",Cm,{signal:e}),km(),Ne=null,Z()?ei():ti(),dm.debug("started")},stop(){W=!1,Io?.abort(),Io=null,Tt!==void 0&&(clearTimeout(Tt),Tt=void 0),Jr(),Qr(),Mm(),Lm(),y(Lt),kt=!1,Ne=null},onSettingsChange(){W&&(Z()?(J(!1),Zr()):y(Lt))}});var Mn=new w("Bloom"),gl=!1,Hm=Date.now(),Im=[sa,Oa,Ga,Va,Za,os,bs,vs,Ss,$s,Us,rl,al,pl];function qo(e){return new Promise(t=>setTimeout(t,e))}function Om(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var bl=8e3,hl=300,Bm=250;async function Dm(){if(ye())return await qo(hl),!0;for(;Date.now()-Hm<bl;)if(await qo(Bm),ye())return await qo(hl),!0;return ye()||Vo()}function ni(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function _m(){if(ni())return!0;let e=Date.now()+bl;for(;Date.now()<e;)if(await qo(100),ni())return!0;return ni()}function $m(){try{GM_registerMenuCommand?.("Bloom++ settings",aa)}catch{}}function jm(){_n(()=>{Nt("HostShell"),Mn.info("host shell",O)}),$n(()=>{Mn.info("idle ready",O)}),jn(()=>{ai(),Nt("HostReady"),Mn.info("chrome ready",O)})}async function oi(){await gi()}async function ri(){if(gl)return;gl=!0;for(let n of Im)try{Li(n)}catch(o){Mn.error("register failed",n.name,o)}ki(),Nt("Init"),$m(),jm();let e=()=>Nt("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await Om(),_m().then(n=>{n&&qn()}),!await Dm()){Mn.warn("late islands not detected; starting default plugins",O),_e(),Fn();return}await Hi()}var yl=typeof unsafeWindow<"u"?unsafeWindow:window,qm=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||qm){let e=yl.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",O);try{Object.defineProperty(yl,"Bloom",{value:ii,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}oi().then(()=>ri()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
