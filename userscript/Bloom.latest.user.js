// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260920] v1.4.60
// @description  Void++-style plugin host for chatgpt.com. Tab favicon, input history, recent chats, reply notify, next-prompt queue, Recents status, wider thread, thread outline, message times, streamer blur, custom home greeting, custom sidebar identity, hide Share, Dictation, sidebar name, Download apps, upgrade CTAs, and ads.
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

/* Bloom++ [20260920] v1.4.60. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var zd=Object.defineProperty;var jd=(e,t)=>{for(var n in t)zd(e,n,{get:t[n],enumerable:!0})};var Ns={};jd(Ns,{REPO_URL:()=>cl,Settings:()=>T,VERSION:()=>J,contextKeyFromUrl:()=>ze,conversationTitle:()=>rn,conversationToken:()=>ee,currentConversationId:()=>P,hasDraftText:()=>me,hasErrorToast:()=>fe,hasLateIslands:()=>yt,init:()=>Hs,initSettings:()=>As,isDocumentInteractive:()=>ul,isStreaming:()=>$,isUserDraftEmpty:()=>at,messageCreateTime:()=>Dr,plugins:()=>_e,requestChromeReady:()=>pr,requestIdleReady:()=>Wt,requestShellReady:()=>fr,setEditorText:()=>Fe,subscribeHarvest:()=>te,watchStreamingEdge:()=>Y,whenChromeReady:()=>mr,whenIdleReady:()=>dr,whenShellReady:()=>ur});var Qe=new Map,er=!1;function Gd(){return document.getElementById("bloom-root")?.shadowRoot??null}function Os(){return document.head??null}function Kt(){let e=Gd();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=Kd()}function Pi(e,t){if(!er)return;let n=Os();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),Kt();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,Kt();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,Kt()}function w(e,t){let n=Qe.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},Qe.set(e,n)),er&&Pi(e,n)}function Ri(){if(!Os())return!1;er=!0;for(let[t,n]of Qe)Pi(t,n);return Kt(),!0}function Bs(e){let t=Qe.get(e);t&&(t.disabled=!1,er&&Pi(e,t))}function Ds(e){let t=Qe.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),Kt())}function x(e){let t=Qe.get(e);t&&(t.el?.remove(),Qe.delete(e),Kt())}function Kd(){return Array.from(Qe.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var E=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function y(e){return e}var Ii=new Map;function tr(e,t){let n=Ii.get(e);return n||(n=new Set,Ii.set(e,n)),n.add(t),()=>n.delete(t)}function ht(e,t){let n=Ii.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var Ud="bloompp";function $s(){return new Promise((e,t)=>{let n=indexedDB.open(Ud,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function _s(e){try{let t=await $s();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function qs(e,t){try{let n=await $s();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function Ut(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function K(e,t,n){return Math.min(n,Math.max(t,e))}function Fs(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function zs(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}function js(e,t){let n;return((...o)=>{n&&clearTimeout(n),n=setTimeout(()=>e(...o),t)})}var nr=new E("SettingsStore"),et="BloomSettings",Vd=100;function or(e){return e!=null&&typeof e.then=="function"}function Wd(e){if(e==null||or(e))return null;if(Ut(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(Ut(t)&&!or(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return Ut(n)&&!or(n)?n:null}return null}catch{return null}}function ir(e){let t=Wd(e);if(!t)return null;let n=t.plugins;return!Ut(n)||or(n)||Object.keys(n).length===0?null:t}var rr=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let d=l.slice(c.length+1);if(d&&!d.includes(".")){let f=u(d);f!==void 0&&(i[a]=f,s=f);break}}}return Ut(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){nr.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Vd))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(et,this.plain)}catch{try{GM_setValue(et,t)}catch(n){nr.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(et,t)}catch{}qs(et,t).catch(n=>nr.warn("Failed to save settings to IndexedDB:",n))}catch(t){nr.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){Fs(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var Yd=new E("Settings"),Xd={plugins:{}},T=new rr(structuredClone(Xd)),Zd=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function Jd(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function S(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(T.store.plugins[n]||(T.store.plugins[n]={}),T.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?T.plain.plugins[n]??{}:{}}};return t}async function Qd(e){if(typeof GM_getValue=="function")try{let t=GM_getValue(e);return t!=null&&typeof t.then=="function"?await t:t}catch{return}}async function Gs(){let e=ir(await Qd(et));if(e||(e=ir(await _s(et))),!e)try{e=ir(localStorage.getItem(et))}catch{e=null}if(!e)return;let t=e.plugins;t&&(T.plain.plugins=t,Yd.debug("Loaded settings"))}function Ks(e,t){t&&(t.pluginName=e,T.plain.plugins[e]||(T.plain.plugins[e]={}),T.setDefaultGetter(Zd(e),n=>{if(n!=="enabled")return Jd(t.def,n)}))}function Us(){return T.plain.plugins.Settings||(T.store.plugins.Settings={}),T.store.plugins.Settings}function ar(){return Us().pinnedPlugins??[]}function Vs(e){return ar().includes(e)}function Ws(e){let t=ar(),n=t.includes(e);return T.store.plugins.Settings={...T.plain.plugins.Settings,pinnedPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}function sr(){return Us().starredPlugins??[]}function Ys(e){return sr().includes(e)}function Xs(e){let t=sr(),n=t.includes(e);return T.store.plugins.Settings={...T.plain.plugins.Settings,starredPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}var lr=new E("PluginManager"),_e={},jn=new Set;function Qs(e){if(_e[e.name]){lr.warn("Duplicate plugin",e.name);return}_e[e.name]=e,Ks(e.name,e.settings)}function Vt(e){let t=_e[e];if(!t)return!1;if(t.required)return!0;let n=T.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function el(e){let t=_e[e];if(!t||t.required)return;let n=!Vt(e);T.plain.plugins[e]||(T.store.plugins[e]={}),T.store.plugins[e].enabled=n,n?tl(t):em(t),ht("pluginToggle",{name:e,enabled:n})}function tl(e,t=!1){if(!jn.has(e.name)&&Vt(e.name))try{e.managedStyle&&Bs(e.managedStyle),e.start?.(),jn.add(e.name),e.settings&&T.addPrefixChangeListener(`plugins.${e.name}.`,()=>{jn.has(e.name)&&e.onSettingsChange?.()}),t||lr.debug("Started",e.name)}catch(n){lr.error("Failed to start",e.name,n)}}function em(e){if(jn.has(e.name)){try{e.stop?.()}catch(t){lr.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(Ds(e.managedStyle),x(e.managedStyle)),jn.delete(e.name)}}function Gn(e){for(let t of Object.values(_e))(t.startAt??"DOMContentLoaded")===e&&tl(t)}var Zs=2,Js="defaultsRev";function nl(){let e=T.plain.plugins.Settings;if(!(!e||e[Js]===Zs)){for(let t of["NoShareLink","NoDictation"]){let n=T.plain.plugins[t];!n||typeof n.enabled=="boolean"||(n.enabled=!1)}e[Js]=Zs}}var Kn=!1,cr=!1,Oi=!1,rl=[],il=[],al=[];function Bi(e){let t=e.splice(0);for(let n of t)n()}function Un(){Kn||(Kn=!0,Bi(rl))}function Di(){cr||(cr=!0,Kn||Un(),Bi(il))}function sl(){Oi||(Oi=!0,Kn||Un(),cr||Di(),Bi(al))}function ur(e){Kn?e():rl.push(e)}function dr(e){cr?e():il.push(e)}function mr(e){Oi?e():al.push(e)}function fr(){Un()}function Wt(){Un(),Di()}function pr(){sl()}function ol(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function ll(){await ol(4e3),Un(),await ol(4e3),Di(),sl()}var v={p:"0-V-linuxdo"},J="[20260920] v1.4.60",cl="https://github.com/0-V-linuxdo/Bloom";function tm(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function nm(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function $i(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function yt(){return $i()?tm()||nm():!1}function ul(){return yt()}var qi=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),dl=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),om=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),rm="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function Xt(e){return e.id==="bloom-root"||!!e.closest(rm)}function ml(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function gr(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function _i(e){if(!(e instanceof HTMLElement)||!e.isConnected||Xt(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&gr(t)?!1:e.getClientRects().length>0}function Yt(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function im(){let e=[];for(let t of document.querySelectorAll(qi))!(t instanceof HTMLElement)||!t.isConnected||Xt(t)||e.push(t);return e}function br(e){if(!e.isConnected||Xt(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function vt(){return im().filter(br)[0]??null}function Zt(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||Xt(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function Fi(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!Xt(n)&&!Yt(n)&&n.parentElement&&!Yt(n.parentElement)&&(t=n);let o=t.parentElement;if(o&&!Yt(o)&&!Xt(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!Yt(o.parentElement))return o}return t}function Jt(){let e=document.querySelectorAll(dl);for(let n of e)if(_i(n)&&!gr(n)&&ml(n))return n;let t=document.querySelectorAll(om);for(let n of t){if(!_i(n)||!ml(n)||gr(n))continue;let o=n.querySelector(dl);return _i(o)&&!gr(o)?o:n}return null}function fl(){let e=vt();if(e){let t=Fi(e),n=t.parentElement;if(n&&!Yt(n))return n;if(!Yt(t))return t}return Zt()}function hr(e){let t=vt();return t?e.composedPath().includes(t):!1}var ji=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],am={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Gi(e){return e==="auto"||e==="light"||e==="dark"}function sm(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function lm(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function zi(e){let t=sm(e);return t?lm(t)>.55?"light":"dark":null}function cm(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=zi(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=zi(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=zi(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function pl(e){return e==="auto"?cm():e}function um(e){try{let t=getComputedStyle(document.documentElement);for(let n of ji){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function gl(e,t,n){let o=am[t];if(n){um(e);for(let r of ji)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of ji)e.style.setProperty(r,o[r])}function bl(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var Ki=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var mm="bloom-root",Se="bloom-rail-item",Er="bloom-account-item",wt="bloom-sidebar-panel",oo="bloom-plugin-dialog",Mr="bloom-plugin-layer",Sr="bloom-settings-css",fm=2e3,Qn=S({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),vl=null,pm=null,rt=!1,Yi=[],yr=null,Lr=null,nt=null,xr=null,qe=null,eo=null,Vn,Qt=0,to=0,Wn=0,Yn=null,Xn=null,Tr=null,xl=null,Zn=null,Ui=[],kr=!1,gm=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],bm=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],Ar="",no="all",it="all";function Hr(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function wl(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function hm(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function ym(e){let t='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return e?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${t}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`}function vm(e){let t='<path d="M12 17v5"/>';return e?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var xm={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function wm(e){return e.icon||xm[e.name]||Hr()}function El(){return Gi(Qn.store.appearance)?Qn.store.appearance:"auto"}function Em(){let e=document.createElement("div");e.className="bloom-field bloom-appearance-row";let t=document.createElement("span");t.className="bloom-field-label",t.textContent="Appearance";let n=document.createElement("select");n.setAttribute("aria-label","Appearance");let o=Qn.def.appearance,r=o.type===3?o.options??[]:[];for(let i of r){let a=document.createElement("option");a.value=i.value,a.textContent=i.label,n.appendChild(a)}return n.value=El(),n.addEventListener("change",()=>{Gi(n.value)&&(Qn.store.appearance=n.value)}),e.append(t,n),e}function Vi(e,t,n){e&&(e.setAttribute("data-bloom-scheme",t),gl(e,t,n),e.style.removeProperty("--bloom-rail-surface"))}function Sl(e){e&&(e.style.removeProperty("--bloom-rail-surface"),e.style.removeProperty("--bg-primary"))}function Jn(){let e=El(),t=pl(e),n=e==="auto";Vi(vl,t,n);let o=document.getElementById(wt);o instanceof HTMLElement&&Vi(o,t,n);let r=document.getElementById(oo);r instanceof HTMLElement&&Vi(r,t,n);let i=document.getElementById(Se);i instanceof HTMLElement&&Sl(i),ht("schemeChange",{scheme:t,pref:e})}function Ll(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(e=>e.remove())}function Tl(){if(w("settings",Ki),document.getElementById(Sr)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=Sr,e.textContent=Ki,document.head.appendChild(e)}function Sm(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Lm(){for(let e of Yi)e();Yi=[]}function kl(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function Tm(e){return e.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,t=>t.toUpperCase())}function Ji(e){return e.settings?Object.entries(e.settings.def).filter(([,t])=>!t.hidden):[]}function km(e){return Ji(e).length>0}function wr(e){if(e.default!==void 0)return e.default;if(e.type===3)return(e.options?.find(n=>n.default)??e.options?.[0])?.value;if(e.type===2)return!1;if(e.type===4)return e.min??0;if(e.type===0)return"";if(e.type===1)return 0}function Cm(e,t){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let o=document.createElement("span");if(o.className="bloom-plugin-dialog-label-title",o.textContent=Tm(e),n.appendChild(o),t.description){let r=document.createElement("span");r.className="bloom-plugin-dialog-label-desc",r.textContent=t.description,n.appendChild(r)}return n}function Mm(e,t,n){if(n.hidden)return null;let o=n.type===4||n.type===0||n.type===1||n.type===5,r=document.createElement("div");r.className=o?"bloom-field bloom-field-stack":"bloom-field",r.appendChild(Cm(t,n));let i=T.store.plugins[e]??(T.store.plugins[e]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",Yi.push(n.render(a)),r.appendChild(a),r}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??wr(n)??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),r.appendChild(a),r}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??wr(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),r.appendChild(a),r}if(n.type===2){let a=kl(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),r.appendChild(a),r}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[t]??wr(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[t]=n.type===1?Number(a.value):a.value}),r.appendChild(a),r}return r}function hl(e,t){let n=document.createElement("div");n.className=t?`bloom-plugin-dialog-field ${t}`:"bloom-plugin-dialog-field";let o=document.createElement("div");return o.className="bloom-plugin-dialog-field-label",o.textContent=e,n.appendChild(o),n}function Am(e){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let t=T.store.plugins[e.name]??(T.store.plugins[e.name]={});for(let[n,o]of Ji(e)){if(n==="enabled"||o.type===5)continue;let r=wr(o);r!==void 0&&(t[n]=r)}Ml(e)}function Cl(e){e.key==="Escape"&&(!document.getElementById(Mr)&&!document.getElementById(oo)||(e.stopPropagation(),en()))}function Hm(){kr||(document.addEventListener("keydown",Cl),kr=!0)}function Nm(){kr&&(document.removeEventListener("keydown",Cl),kr=!1)}function en(){Lm(),Nm(),document.getElementById(Mr)?.remove(),document.getElementById(oo)?.remove()}function Ml(e){if(en(),!document.body)return;let t=document.createElement("div");t.id=Mr,t.className="bloom-plugin-layer",t.addEventListener("pointerdown",ot),t.addEventListener("pointerup",ot),t.addEventListener("click",u=>{u.stopPropagation(),u.target===t&&en()});let n=document.createElement("div");n.id=oo,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",ot),n.addEventListener("pointerup",ot),n.addEventListener("click",ot);let o=document.createElement("button");o.type="button",o.className="bloom-icon-btn bloom-plugin-dialog-close",o.setAttribute("aria-label","Close"),o.innerHTML=wl(),o.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),en()});let r=document.createElement("div");r.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=e.name,r.appendChild(i),e.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=e.description,r.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(o,r,a),e.authors?.length){let u=hl("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=e.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=hl("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=Ji(e);if(c.length)for(let[u,d]of c){let f=Mm(e.name,u,d);f&&l.appendChild(f)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>Am(e)),u.appendChild(d),n.appendChild(u)}t.appendChild(n),document.body.appendChild(t),Hm(),Jn()}function Pm(e){let t=document.createElement("div");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=wm(e);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=e.name,a.title=e.name,r.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=Ys(e.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=ym(l),c.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation();let m=Xs(e.name);ht("pluginStar",{name:e.name,starred:m})}),s.appendChild(c),!e.required){let h=Vs(e.name),m=document.createElement("button");m.type="button",m.className=`bloom-icon-btn bloom-card-pin${h?" bloom-card-pin-active":""}`,m.setAttribute("aria-label",h?"Unpin from top":"Pin to top"),m.innerHTML=vm(h),m.addEventListener("click",L=>{L.preventDefault(),L.stopPropagation();let A=Ws(e.name);ht("pluginPin",{name:e.name,pinned:A})}),s.appendChild(m)}if(km(e)){let h=document.createElement("button");h.type="button",h.className="bloom-icon-btn bloom-card-settings",h.setAttribute("aria-label",`${e.name} settings`),h.innerHTML=hm(),h.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation(),Ml(e)}),s.appendChild(h)}let u=kl(e.name,Vt(e.name),!!e.required),d=u.querySelector("input");if(d?.addEventListener("click",h=>h.stopPropagation()),d?.addEventListener("change",()=>{el(e.name)}),s.appendChild(u),o.append(r,s),n.appendChild(o),e.description){let h=document.createElement("div");h.className="bloom-card-desc",h.textContent=e.description,n.appendChild(h)}let f=document.createElement("div");f.className="bloom-card-separator";let b=document.createElement("div");b.className="bloom-card-footer";let g=document.createElement("div");return g.className="bloom-card-author",g.textContent=e.authors?.filter(Boolean).join(", ")||"\xA0",b.appendChild(g),t.append(n,f,b),t}function Al(){return Object.values(_e).filter(e=>!e.hidden&&e.name!=="Settings")}function Hl(e,t){return t==="all"||t==="favorites"?!0:(e.tags??[]).includes(t)}function Rm(e){return`${e.name} ${e.description??""} ${(e.tags??[]).join(" ")}`.toLowerCase()}function Im(){return Ar.trim()?"No plugins match your search.":it==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function Om(){let e=Al();return bm.filter(t=>t.id==="favorites"||t.id==="all"?!0:e.some(n=>Hl(n,t.id)))}function Bm(){if(Zn){Zn.replaceChildren();for(let e of Om()){let t=document.createElement("button");t.type="button",t.className=`bloom-plugin-tab${it===e.id?" bloom-plugin-tab-active":""}`,t.textContent=e.label,t.addEventListener("click",()=>{it=e.id,xt()}),Zn.appendChild(t)}}}function Dm(){let e=Al();if(it==="favorites"){let t=new Set(sr());e=e.filter(n=>t.has(n.name))}else it!=="all"&&(e=e.filter(t=>Hl(t,it)));return no==="enabled"&&(e=e.filter(t=>Vt(t.name))),no==="disabled"&&(e=e.filter(t=>!Vt(t.name))),e}function xt(){if(!Yn)return;Bm();let e=Dm();Tr&&(Tr.placeholder=`Search ${e.length} plugins...`);let t=e,n=Ar.trim().toLowerCase();if(n&&(t=t.filter(o=>Rm(o).includes(n))),it!=="favorites"){let o=ar();if(o.length){let r=new Map(o.map((i,a)=>[i,a]));t=t.slice().sort((i,a)=>{let s=r.has(i.name),l=r.has(a.name);return s!==l?s?-1:1:s?(r.get(i.name)??0)-(r.get(a.name)??0):i.name.localeCompare(a.name)})}}Yn.replaceChildren();for(let o of t)Yn.appendChild(Pm(o));Xn&&(Xn.hidden=t.length>0,Xn.textContent=Im())}function ot(e){e.stopPropagation()}function Wi(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function Qi(){document.getElementById(Se)?.setAttribute("aria-expanded",rt?"true":"false")}function $m(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function ea(){en(),Ar="",no="all",it="all",document.getElementById(wt)?.remove(),rt=!1,Qi()}function _m(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",ot),t.addEventListener("pointerup",ot),t.addEventListener("click",ot);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-titles";let i=document.createElement("div");i.className="bloom-settings-brand";let a=document.createElement("span");a.className="bloom-settings-mark",a.innerHTML=Hr();let s=document.createElement("h2");s.textContent="Bloom++",i.append(a,s);let l=document.createElement("p");l.className="bloom-settings-sub",l.textContent="Toggle features. Some need a reload. Click the sliders icon to configure.",r.append(i,l);let c=document.createElement("button");c.type="button",c.className="bloom-icon-btn",c.setAttribute("aria-label","Close"),c.innerHTML=wl(),c.addEventListener("click",ea),o.append(r,c),n.appendChild(o),n.appendChild(Em());let u=document.createElement("div");u.className="bloom-plugin-tabs",n.appendChild(u);let d=document.createElement("div");d.className="bloom-search-bar";let f=document.createElement("input");f.type="search",f.className="bloom-search-input",f.setAttribute("aria-label","Search plugins"),f.placeholder="Search plugins...",f.addEventListener("input",()=>{Ar=f.value,xt()});let b=document.createElement("select");b.className="bloom-search-filter",b.setAttribute("aria-label","Filter plugins");for(let m of gm){let L=document.createElement("option");L.value=m.value,L.textContent=m.label,b.appendChild(L)}b.value=no,b.addEventListener("change",()=>{no=b.value,xt()}),d.append(f,b),n.appendChild(d);let g=document.createElement("div");g.className="bloom-plugin-list",n.appendChild(g);let h=document.createElement("p");return h.className="bloom-tab-empty",h.hidden=!0,n.appendChild(h),t.appendChild(n),Yn=g,Xn=h,Tr=f,xl=b,Zn=u,xt(),t}function qm(e){e.classList.add("bloom-rail-dock")}function Fm(){let e=document.getElementById(Se);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&br(e)?e:null}function zm(){if(document.getElementById(wt)?.remove(),!document.body)return;let e=_m(wt);qm(e),document.body.appendChild(e),rt=!0,en(),Jn(),Qi(),ht("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:J,dock:"center",rail:!!Fm()})}function ta(){let e=document.getElementById(wt);if(e instanceof HTMLElement&&e.isConnected&&$m(e)){ea();return}e?.remove(),zm()}function jm(){let e=document.createElement("button");return e.type="button",e.id=Se,e.className="bloom-rail-item",e.setAttribute("aria-controls",wt),e.setAttribute("aria-expanded",rt?"true":"false"),e.innerHTML=`<span class="bloom-rail-mark">${Hr()}</span><span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),ta()}),e}function yl(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function Gm(e){let t=e.querySelector("img");if(t instanceof HTMLElement){let n=t.getBoundingClientRect();if(n.width>8&&n.height>8)return t}for(let n of e.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}return null}function Km(e,t){for(let n of e.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||t&&(n===t||n.contains(t)||t.contains(n))||(n.textContent||"").trim().length<2)continue;let r=n.getBoundingClientRect();if(r.width>16&&r.height>8&&r.height<40)return n}return null}function tt(e,t,n){let o=`${n}px`;e.style.getPropertyValue(t)!==o&&e.style.setProperty(t,o)}function Nl(e,t){if(e.classList.contains("bloom-rail-compact"))return;let n=e.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!e.isConnected||!t.isConnected)return;let o=Gm(t),r=getComputedStyle(t),i=Number.parseFloat(r.paddingTop),a=Number.parseFloat(r.paddingBottom);if(Number.isFinite(i)&&tt(e,"padding-top",Math.round(i)),Number.isFinite(a)&&tt(e,"padding-bottom",Math.round(a)),o){let s=o.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));tt(n,"width",l),tt(n,"height",Math.max(20,Math.round(s.height)));let c=e.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&tt(e,"padding-left",u);let d=Km(t,o);if(d){let f=d.getBoundingClientRect(),b=n.getBoundingClientRect(),g=Math.round(f.left-b.right);g>=0&&g<=24&&tt(e,"gap",g)}}else{let s=Number.parseFloat(r.paddingLeft),l=Number.parseFloat(r.columnGap||r.gap);Number.isFinite(s)&&tt(e,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&tt(e,"gap",Math.round(l))}Sl(e)}function Xi(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Um(){if(eo?.isConnected&&qe){qe.observe(eo,{childList:!0});return}Zi()}function Vm(e){if(Xi(e))return!1;try{if(e.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function Wm(e,t){!t||!e||requestAnimationFrame(()=>{if(e.isConnected){Wn=0;return}Wn+=1,to=Date.now()+Math.min(8e3,250*2**Math.min(Wn,5))})}function Ym(){Qt||Date.now()<to||(Qt=requestAnimationFrame(()=>{Qt=0,!(Date.now()<to)&&(document.getElementById(Se)?.isConnected||Cr())}))}function Cr(){if(!document.body)return;qe?.disconnect();let e=null,t=!1;try{let n=document.getElementById(Se);e=n instanceof HTMLButtonElement?n:jm();let o=vt(),r=Zt();if(o){let i=Fi(o),a=i.parentElement;if(Xi(i)||a&&Xi(a))return;e.isConnected&&e.nextElementSibling===i||(i.before(e),t=!0),yl(e),Nl(e,o)}else r?(e.parentElement!==r&&(r.appendChild(e),t=!0),yl(e,!0)):e.isConnected&&!br(e)&&(e.remove(),e=null)}finally{Wm(e,t),Um(),Qi()}}function Zi(){let e=fl();!e||!Vm(e)||eo===e&&qe||(qe?.disconnect(),eo=e,qe=new MutationObserver(()=>{document.getElementById(Se)?.isConnected||Ym()}),qe.observe(e,{childList:!0}))}function Xm(){Cr(),Zi(),Vn===void 0&&(Vn=window.setInterval(()=>{let e=document.getElementById(Se);if(!(e instanceof HTMLElement)||!e.isConnected)Date.now()>=to&&Cr();else{Wn=0;let t=vt();t&&Nl(e,t)}Zi()},fm))}function Zm(){Vn!==void 0&&(clearInterval(Vn),Vn=void 0),Qt&&cancelAnimationFrame(Qt),Qt=0,to=0,Wn=0,qe?.disconnect(),qe=null,eo=null}function Jm(e){xr===e&&nt||(nt?.disconnect(),xr=e,nt=new MutationObserver(()=>{if(!e.isConnected){nt?.disconnect(),nt=null,xr=null;return}Pl(e)}),nt.observe(e,{childList:!0}))}function Pl(e){if(Jm(e),e.querySelector(`#${Er}`))return;let t=document.createElement("button");t.type="button",t.id=Er,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${Hr()}<span>Bloom++</span>`,t.addEventListener("pointerdown",Wi),t.addEventListener("pointerup",Wi),t.addEventListener("click",n=>{Wi(n),ta()}),e.insertBefore(t,e.firstChild)}function vr(){let e=Jt();return e?(Pl(e),!0):!1}function Qm(e){hr(e)&&(queueMicrotask(vr),requestAnimationFrame(()=>{vr()}),window.setTimeout(vr,60),window.setTimeout(vr,180))}function ef(){Lr?.abort();let e=new AbortController;Lr=e,document.addEventListener("click",Qm,{signal:e.signal})}function tf(){Lr?.abort(),Lr=null,nt?.disconnect(),nt=null,xr=null}function Rl(){Wt(),Sm(()=>{Tl(),Ll(),Cr(),ta()})}var Il=y({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[v.p],required:!0,hidden:!0,enabledByDefault:!0,settings:Qn,startAt:"HostReady",cleanupSelectors:[`#${mm}`,`#${Se}`,`#${Er}`,`#${wt}`,`#${Mr}`,`#${oo}`,`#${Sr}`,"#bloom-menu-panel"],start(){Tl(),Ll(),Xm(),ef(),yr?.(),yr=bl(Jn),Jn(),Ui=[tr("pluginToggle",()=>{rt&&xt()}),tr("pluginPin",()=>{rt&&xt()}),tr("pluginStar",()=>{rt&&xt()})]},stop(){Zm(),tf(),yr?.(),yr=null;for(let e of Ui)e();Ui=[],ea(),document.getElementById(Se)?.remove(),document.getElementById(Er)?.remove(),document.getElementById(Sr)?.remove(),vl=null,pm=null,Yn=null,Xn=null,Tr=null,xl=null,Zn=null,rt=!1},onSettingsChange:Jn});var Nr='form[data-type="unified-composer"], form.w-full[data-type]',Le=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),tn=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Ol=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Bl=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),nf=/stop streaming|stop generating|停止生成|停止输出|停止响应/,of='[contenteditable="false"], button, [role="button"]';function ue(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function Et(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!ue(r)))return r;return null}function Dl(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function I(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=Dl(e);return!!(nf.test(n)||/^stop$/i.test(n))}function de(){let t=Array.from(document.querySelectorAll(Nr)).find(ue);if(t instanceof HTMLElement)return t;let n=Et(document,Le),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function U(){let e=Array.from(document.querySelectorAll(Le));return e.find(ue)??e[0]??null}function rf(e,t){if(!e||e===t||!t.contains(e))return!1;let n=e.closest(of);return!!n&&n!==t&&t.contains(n)}function na(e,t){let n=[];try{let o=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),r=o.nextNode();for(;r;){let i=r.parentElement;i&&rf(i,t)||n.push(r.textContent??""),r=o.nextNode()}}catch{return e.innerText??e.textContent??""}return n.join("")}function me(e){let t=e??U();return t?na(t,t).replaceAll("\u200B","").trim().length>0:!1}function at(e){return!me(e)}function Pr(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function $l(e){let t=de();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!ue(n))&&e(n))return n;return null}function st(){let e=de(),t=Et(e,tn)??Et(document,tn);return t&&!I(t)?t:$l(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!I(n);let r=Dl(n);return/^(send|send prompt|发送)$/i.test(r)&&!I(n)})}function St(){let e=de(),t=Et(e,Ol,!0)??Et(document,Ol,!0);if(t)return t;let n=Et(e,Bl)??Et(document,Bl);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&ue(o)&&I(o))return o}return $l(I)}function Q(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>na(n,e)).join(`
`):na(e,e)}function oa(e,t=!1){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function Fe(e,t,n=!1){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r);try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch{e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),oa(e,n)}var _l=/\/c\/([a-zA-Z0-9_-]{8,})/i;function ee(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function ze(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function nn(e){if(!e)return"";try{return(/^https?:/i.test(e)?new URL(e,location.origin).pathname:e).match(_l)?.[1]??""}catch{return e.match(_l)?.[1]??""}}function P(){let e=nn(location.pathname);if(e)return e;let n=ee().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return""}var jl=new E("Harvest"),af=1500,sf=200,Rr=new Set,Ir=new Map,Or=new Map,on=null,Br=null,ro=null,Te=0;function lf(){return typeof unsafeWindow<"u"?unsafeWindow:window}function cf(e){try{if(typeof e=="string")return e;if(e instanceof URL)return e.href;if(typeof Request<"u"&&e instanceof Request)return e.url}catch{}return String(e)}function uf(e,t){let n=t?.method,o=typeof Request<"u"&&e instanceof Request?e.method:"";return(n||o||"GET").toUpperCase()}function Gl(e){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(e)}var df=/"action"\s*:\s*"(next|continue|variant)"/i;function mf(e,t,n){return!(t!=="POST"||Gl(e)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(e)||typeof n=="string"&&/"action"\s*:/.test(n)&&!df.test(n))}function ff(e,t){return t!=="GET"||Gl(e)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(e)}function ql(e){return e.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function Kl(e){return e?e.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function pf(e){return typeof e=="string"?Kl(e):""}function ra(e){if(typeof e=="number"&&Number.isFinite(e)&&e>0)return e>1e12?e:Math.round(e*1e3);if(typeof e=="string"){let t=e.trim();if(!t)return null;if(/^\d+(\.\d+)?$/.test(t))return ra(Number(t));let n=Date.parse(t);return Number.isFinite(n)?n:null}return null}function Ul(e,t){if(e.size<=t)return;let n=e.size-t,o=0;for(let r of e.keys())if(e.delete(r),++o>=n)break}function Fl(e,t,n){!e||!t||Or.get(e)!==t&&(Or.set(e,t),Ul(Or,af),lt({type:"message-time",messageId:e,createTime:t,conversationId:n}))}function gf(e,t){let n=t.trim();!e||!n||Ir.get(e)!==n&&(Ir.set(e,n),Ul(Ir,sf),lt({type:"conversation-meta",conversationId:e,title:n}))}function io(e,t,n=0){if(n>6||!e||typeof e!="object")return;if(Array.isArray(e)){for(let l of e)io(l,t,n+1);return}let o=e,r=typeof o.conversation_id=="string"&&o.conversation_id||typeof o.conversationId=="string"&&o.conversationId||t;typeof o.title=="string"&&r&&!o.author&&!o.content&&!o.role&&gf(r,o.title);let i=o.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=ra(l.create_time??l.createTime??l.created_at);c&&u&&Fl(c,u,r)}let a=typeof o.id=="string"?o.id:"",s=ra(o.create_time??o.createTime??o.created_at);if(a&&s&&(o.author||o.content||o.role||o.create_time||o.createTime)&&Fl(a,s,r),o.mapping&&typeof o.mapping=="object")io(o.mapping,r,n+1);else if(n<3)for(let l of Object.values(o))l&&typeof l=="object"&&io(l,r,n+1)}function zl(e,t){if(e)try{io(JSON.parse(e),t)}catch{}}function lt(e){for(let t of Array.from(Rr))try{t(e)}catch{}}async function bf(e,t,n){if(n===Te)try{let o=await e.json();if(n!==Te)return;io(o,t)}catch{}}async function hf(e,t,n,o){let r=t,i=n,a=e.body;if(!a){o===Te&&lt({type:"post-end",conversationId:r,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;o===Te;){let{done:u,value:d}=await s.read();if(u)break;if(c+=l.decode(d,{stream:!0}),!r){let b=Kl(c);b&&(r=b,lt({type:"post-start",conversationId:r,url:""}))}let f=c.split(`
`);c=f.pop()??"";for(let b of f){let g=b.replace(/^data:\s*/,"").trim();!g||g==="[DONE]"||zl(g,r)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&o===Te&&zl(c.replace(/^data:\s*/,""),r)}catch{i=!0}finally{try{s.cancel()}catch{}}o===Te&&lt({type:"post-end",conversationId:r,error:i})}function yf(e,t,n){let o=cf(t),r=uf(t,n),i=ff(o,r),a=mf(o,r,n?.body),s=Te,l="";return a&&(l=pf(n?.body)||ql(o)||nn(o)||P(),lt({type:"post-start",conversationId:l,url:o})),e(t,n).then(c=>{if(s!==Te||!i&&!a)return c;try{let u=c.clone();i?bf(u,ql(o)||P(),s):hf(u,l,!c.ok,s)}catch{a&&lt({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===Te&&lt({type:"post-end",conversationId:l,error:!0}),c})}function vf(){if(on)return;let e=lf();ro=e,on=e.fetch.bind(e);let t=(n,o)=>yf(on,n,o);Br=t,e.fetch=t,jl.debug("conversation fetch harvest hooked")}function xf(){Te+=1,!(!on||!ro)&&(Br&&ro.fetch===Br&&(ro.fetch=on),on=null,Br=null,ro=null,jl.debug("conversation fetch harvest unhooked"))}function te(e){return Rr.add(e),vf(),()=>{Rr.delete(e),Rr.size===0&&xf()}}function rn(e){return e?Ir.get(e)??"":""}function Dr(e){return e?Or.get(e)??null:null}var Yl=new E("Streaming");function fo(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!ue(t))&&(I(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function wf(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&ue(e))}function Ef(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&ue(e))}function Sf(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function fe(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function $(){if(St()||fo()||Sf())return!0;let e=st();return e&&ue(e)&&!I(e)?!1:!!(wf()||Ef())}var Lf=400,Vl=3,kt=new Set,so,lo=null,ia=null,Tt=!1,Lt=0,ct="",ke="",co=!1,uo=!1,mo=!1;function Xl(){return ze(ee())}function Wl(e,t){return{streaming:e,contextKey:t,conversationId:P()}}function X(e,t){if(!e||e===t)return!1;if(e.endsWith("|draft")&&!t.endsWith("|draft"))return!0;try{let n=e.split("|")[0],o=t.split("|")[0],r=new URL(n).pathname.replace(/\/$/,"")||"/",i=new URL(o).pathname.replace(/\/$/,"")||"/";if((r==="/"||r==="")&&i.startsWith("/c/"))return!0}catch{}return!1}function aa(){Tt=!1,Lt=0,ct="",co=!1,uo=!1,mo=!1}function Tf(e){for(let t of Array.from(kt))try{t.onFall?.(e)}catch{}}function kf(e){for(let t of Array.from(kt))try{t.onRise?.(e)}catch{}}function ao(e){for(let t of Array.from(kt))try{t.onTick?.(e)}catch{}}function Cf(e,t){for(let n of Array.from(kt))try{n.onContext?.(e,t)}catch{}}function Mf(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest("button");n instanceof HTMLElement&&I(n)&&(co=!0)}function Af(e){e.type==="post-end"&&Tt&&(mo=!0,e.error&&(uo=!0))}function Hf(){let e=Xl(),t=$();if(ke&&e&&ke!==e){if(Cf(e,ke),!X(ke,e)){aa(),ke=e,ao(Wl(t,e));return}ct===ke&&(ct=e)}ke=e;let n=Wl(t,e);if(t){let i=!Tt;i&&(co=!1,uo=!1,mo=!1),Tt=!0,Lt=0,ct=e,i&&kf(n),ao(n);return}if(!Tt){ao(n);return}if(Lt+=1,mo&&(Lt=Math.max(Lt,Vl)),Lt<Vl){ao(n);return}let o=!!ct&&ct===e,r={contextKey:ct||e,conversationId:P(),userStopped:co,error:uo||fe()};aa(),o&&Tf(r),ao(n)}function Nf(){so===void 0&&(Tt=$(),ke=Xl(),ct=Tt?ke:"",Lt=0,co=!1,uo=!1,mo=!1,lo?.abort(),lo=new AbortController,document.addEventListener("click",Mf,{capture:!0,signal:lo.signal}),ia=te(Af),so=setInterval(Hf,Lf),Yl.debug("watchStreamingEdge started"))}function Pf(){kt.size||(so!==void 0&&(clearInterval(so),so=void 0),lo?.abort(),lo=null,ia?.(),ia=null,aa(),ke="",Yl.debug("watchStreamingEdge stopped"))}function Y(e){let t=typeof e=="function"?{onFall:e}:e;return kt.add(t),Nf(),()=>{kt.delete(t),Pf()}}var Zl="bloom-host-icon",po="data-bloom-host-rel",sa="not all",la=0,Jl=0,Rf=400;function Ql(e){la+=1;try{e()}finally{la-=1}}function $r(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function ut(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function ec(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function If(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Of(e,t){if(e.lastElementChild===t)return;let n=Date.now();n-Jl<Rf||(Jl=n,e.appendChild(t))}function Bf(e,t){for(let n of e.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===t||$r(n)&&(n.getAttribute(po)||n.setAttribute(po,n.rel),n.media!==sa&&(n.media=sa),n.rel!==Zl&&(n.rel=Zl))}function Df(e){for(let t of e.querySelectorAll(`link[${po}]`)){if(!(t instanceof HTMLLinkElement))continue;let n=t.getAttribute(po);n&&(t.rel=n),t.removeAttribute(po),t.media===sa&&t.removeAttribute("media")}}function tc(e,t){let{head:n}=document;!n||!t||Ql(()=>{Bf(n,e);let o=ec(e),{type:r,sizes:i}=If(t);o?Of(n,o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function nc(e,t){let{head:n}=document;n&&Ql(()=>{ec(e)?.remove(),Df(n)})}function oc(e,t){let{head:n}=document;if(!n)return null;let o=0,r=new MutationObserver(i=>{if(la)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===e?a=!0:$r(c.target)&&(a=!0,ut(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)$r(u)&&u.id===e&&(a=!0);for(let u of c.addedNodes)$r(u)&&u.id!==e&&(a=!0,ut(u.href)&&(s=u.href))}if(!a)return;let l=()=>{o=0,t(s)};if(document.hidden){o&&(cancelAnimationFrame(o),o=0),l();return}o||(o=requestAnimationFrame(l))});return r.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),r}var $f=["original","badge","dot","hole","bg"],ac=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],sc={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},_r="#FCFCFC",_f="#111111",rc="#111111",qf="#ffffff",Ff="#212121",zf="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",jf={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},qr=32,ic=64;function lc(e){return typeof e=="string"&&$f.includes(e)}function Gf(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function Fr(e){let t=document.createElement("canvas");t.width=qr,t.height=qr;let n=t.getContext("2d");return n?(n.scale(qr/ic,qr/ic),e(n),t.toDataURL("image/png")):""}function Kf(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function zr(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(zf);n&&(e.strokeStyle=_f,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function Uf(e,t,n){let o=sc[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=rc,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=rc,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=qf,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function go(e,t){if(e==="original")return t==="wait"?Fr(o=>zr(o,_r)):Gf(jf[t]);let n=t==="wait"?void 0:sc[t];return Fr(e==="hole"?o=>zr(o,n??_r):e==="bg"?o=>{o.fillStyle=n??Ff,Kf(o,0,0,64,64,14),o.fill(),zr(o,_r,!1)}:o=>{zr(o,_r),t!=="wait"&&Uf(o,t,e==="dot"?"dot":"badge")})}function cc(e){return{wait:go(e,"wait"),rotate:go(e,"rotate"),done:go(e,"done"),ready:go(e,"ready"),error:go(e,"error")}}var Vf=new E("ChatStateFavicons"),At="bloom-chat-state-favicon",gc=["input","beforeinput","cut","paste","compositionend"],bc=S({style:{type:3,description:"Favicon overlay",options:ac}}),Me="",ua={wait:"",rotate:"",done:"",ready:"",error:""},bo="wait",Ct=!1,Ce=!1,V=null,ne="",oe="",Ht=!0,an=null,re=0,jr=null,Gr=null,Mt=null,ca=null,sn=null,ge=!1,uc=new WeakSet;function Wf(){let e=bc.store.style;return lc(e)?e:"bg"}function hc(){let t=document.querySelector(`link[rel~="icon"]:not(#${At}), link[data-bloom-host-rel]:not(#${At})`)?.href;return ut(t)?t:ut(Me)?Me:""}function Yf(){let e=document.getElementById(At);return e instanceof HTMLLinkElement?e:null}function Xf(){if(!ut(Me)){let e=hc();e&&(Me=e)}return ut(Me)?Me:ua.wait}function yc(e){return e==="wait"?Xf():ua[e]}function vc(){tc(At,yc(bo))}function pe(e){let t=yc(e);if(bo===e){let n=Yf();if(n&&n.getAttribute("href")===t)return}bo=e,vc()}function dc(){ua=cc(Wf()),pe(bo)}function xc(){return ze(ee())}function da(e,t){!e||!t||e===t||(V===e&&(V=t),ne===e&&(ne=t),oe===e&&(oe=t))}function Zf(){let e=xc();return $()||Ct||Ce?(ne&&e&&ne!==e&&X(ne,e)?(da(ne,e),ne=e):!ne&&e&&(ne=e),ne||e):(ne="",e)}function mc(e){return!V||!e||V===e?!0:X(V,e)}function wc(){Ct=!1,Ce=!1,V=null,ne=""}function Ec(e){oe=e,wc(),Ht=!1,pe("wait")}function fc(e){return!e&&Ht}function Jf(){if(!ge)return;let e=xc();if(oe&&e&&oe!==e&&!X(oe,e)){Ec(e);return}oe&&e&&X(oe,e)&&da(oe,e),e&&(oe=e);let t=Zf(),n=$(),o=at();if(fe()&&!n){pe("error"),Ct=!1,Ce=!1,V=null;return}if(n){Ct||(Ht=!1),Ct=!0,Ce=!1,V=t,pe("rotate");return}if(Ct){let r=mc(t);if(Ct=!1,r){Ce=!0,V=t,pe("done");return}Ce=!1,V=null}if(Ce)if(V&&t&&!mc(t))Ce=!1,V=null;else if(o){V=t||V,pe("done");return}else if(fc(o)){Ce=!1,pe("ready");return}else{Ce=!1,pe("wait");return}V=null,o?pe("wait"):fc(o)?pe("ready"):pe("wait")}function dt(){ge&&(Cc(),Lc(),Tc(),Jf())}function Sc(){if(sn){for(let e of gc)sn.removeEventListener(e,kc,!0);sn=null}}function Lc(){let e=de(),t=e&&e!==document.body?e:null;if(!(sn===t&&t?.isConnected)&&(Sc(),!!t)){sn=t;for(let n of gc)sn.addEventListener(n,kc,{capture:!0,passive:!0})}}function Tc(){let e=de();if(!(Mt&&ca===e&&e.isConnected)){if(Mt?.disconnect(),ca=e,!e||e===document.body){Mt=null;return}Mt=new MutationObserver(()=>Kr()),Mt.observe(e,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function Kr(){if(ge){if(document.hidden){re&&(cancelAnimationFrame(re),re=0),dt();return}re||(re=requestAnimationFrame(()=>{re=0,ge&&dt()}))}}function kc(){me()&&(Ht=!0),Kr()}function pc(){me()&&(Ht=!0),Kr()}function Qf(){ge&&(re&&(cancelAnimationFrame(re),re=0),dt())}function ep(){ge&&(Ht=!1,dt())}function tp(){ge&&dt()}function np(){ge&&dt()}function op(e,t){if(ge){if(X(t,e)){da(t,e),oe=e,dt();return}Ec(e)}}function Cc(){let e=U();!e||uc.has(e)||(uc.add(e),e.addEventListener("input",pc,{capture:!0,passive:!0}),e.addEventListener("compositionend",pc,{capture:!0,passive:!0}))}var Mc=y({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:bc,startAt:"DOMContentLoaded",cleanupSelectors:[`#${At}`],start(){ge=!0,Me=hc()||Me,dc(),Gr?.disconnect(),Gr=oc(At,e=>{ut(e)&&(Me=e),vc()}),an?.abort(),an=new AbortController,window.addEventListener("popstate",Kr,{signal:an.signal}),document.addEventListener("visibilitychange",Qf,{signal:an.signal}),Cc(),Lc(),Tc(),jr?.(),jr=Y({onRise:ep,onFall:tp,onTick:np,onContext:op}),dt(),Vf.debug("favicon watch started")},stop(){ge=!1,re&&cancelAnimationFrame(re),re=0,jr?.(),jr=null,an?.abort(),an=null,Sc(),Mt?.disconnect(),Mt=null,ca=null,Gr?.disconnect(),Gr=null,wc(),oe="",Ht=!0,bo="wait",nc(At,Me)},onSettingsChange:dc});var Ac=`.bloom-ih-hud {
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
`;var vy=new E("InputHistory"),ma=/\u200B/g,Hc=10,Nc=500,Pc=100,ip=8,ap=120,sp=2e3,Ur=10,Vr=S({maxEntries:{type:4,description:"Max stored prompts",min:Hc,max:Nc,default:Pc},history:{type:5,description:"Stored prompts",render:Ep},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),fa=new Map,_=0,pa="",Ae=!1,yo=!1,ha=0,ho=null,ga,ya=null,Rc=!0;function be(){let e=Vr.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ic(e){let t=K(Number(Vr.store.maxEntries??Pc),Hc,Nc);return e.length>t?e.slice(e.length-t):e}function Wr(e){Vr.store.entries=Ic(e)}function lp(e){return e.replaceAll(ma,"").replace(/\n$/,"").trim()}function ba(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(Le);return n instanceof HTMLElement?n:U()}function cp(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!Q(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(ma,"").trim().length===0,last:i.toString().replaceAll(ma,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Oc(e){clearTimeout(ga),ga=setTimeout(()=>{if(e!==ha)return;yo=!1;let t=ya;t&&oa(t,Rc)},ap)}function Bc(e,t,n){yo=!0,ya=e,Rc=n;let o=++ha;Fe(e,t,n),Oc(o)}function up(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function ln(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function dp(){document.querySelector(".bloom-ih-hud")?.remove()}function mp(e,t){let n=up();n.textContent=e;let o=(t.closest("form")??de()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-ip)}px`,n.classList.add("bloom-ih-hud-on")}function va(e){let t=lp(e);if(!t)return;let n=Date.now(),o=fa.get(t);if(o&&n-o<sp)return;fa.set(t,n);let r=be().filter(i=>i!==t);r.push(t),Wr(r),_=be().length,Ae=!1,ln()}function fp(e,t){let n=be();if(!n.length&&e)return;_>=n.length&&(pa=Q(t),_=n.length);let o=e?_-1:_+1;o<0||o>n.length||(_=o,Ae=!0,Bc(t,o===n.length?pa:n[o],e),o<n.length?mp(`${o+1} / ${n.length}`,t):ln())}function pp(e){Ae=!1,ln(),Bc(e,pa,!1),_=be().length}function gp(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=ba(e.target)??ba(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&Ae&&!e.altKey&&!e.shiftKey){pp(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){va(Q(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=be();if(!o){let i=cp(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||_<=0)||!n&&_>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),fp(n,t))}function bp(e){if(ba(e.target)){if(yo){Oc(ha);return}Ae&&(Ae=!1,ln(),_=be().length)}}function hp(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(Le);n instanceof HTMLElement&&va(Q(n))}function yp(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(tn);if(!n||!(n instanceof HTMLElement)||I(n))return;let o=U();o&&va(Q(o))}function vp(e){if(!(!Ae||yo)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}Ae=!1,ln()}}function xp(){if(ho)return;ho=new AbortController;let{signal:e}=ho,t={capture:!0,signal:e};window.addEventListener("keydown",gp,t),window.addEventListener("input",bp,t),window.addEventListener("submit",hp,t),window.addEventListener("click",yp,t),window.addEventListener("pointerdown",vp,t)}function wp(e){let t=be().slice();t.splice(e,1),Wr(t),_>t.length&&(_=t.length)}function Ep(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=be().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(m=>m.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/Ur));n>=l&&(n=l-1);let c=s.slice(n*Ur,n*Ur+Ur);e.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=t,u.addEventListener("input",()=>{t=u.value,n=0,r()}),e.appendChild(u),c.length){let m=document.createElement("div");m.className="bloom-ih-list",c.forEach((L,A)=>{let D=i.indexOf(L),De=be().length-1-D,$e=document.createElement("div");$e.className="bloom-ih-item";let C=document.createElement("button");C.type="button",C.className=`bloom-ih-body${o===A?"":" bloom-ih-clamp"}`,C.textContent=L,C.addEventListener("click",()=>{o=o===A?-1:A,r()});let we=document.createElement("div");we.className="bloom-ih-actions";let Ze=document.createElement("button");Ze.type="button",Ze.title="Copy",Ze.textContent="C",Ze.addEventListener("click",()=>{zs(L)});let Ee=document.createElement("button");Ee.type="button",Ee.title="Delete",Ee.textContent="\xD7",Ee.addEventListener("click",()=>{wp(De),r()}),we.append(Ze,Ee),$e.append(C,we),m.appendChild($e)}),e.appendChild(m)}else{let m=document.createElement("p");m.className="bloom-ih-empty",m.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(m)}let d=document.createElement("div");d.className="bloom-ih-pager";let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Prev",f.disabled=n<=0,f.addEventListener("click",()=>{n-=1,r()});let b=document.createElement("span");b.textContent=`${n+1} / ${l}`;let g=document.createElement("button");g.type="button",g.className="bloom-ih-btn",g.textContent="Next",g.disabled=n+1>=l,g.addEventListener("click",()=>{n+=1,r()});let h=document.createElement("button");h.type="button",h.className="bloom-ih-clear",h.textContent="Clear all",h.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Wr([]),_=0,r())}),d.append(f,b,g,h),e.appendChild(d)};return r(),()=>{e.replaceChildren()}}var Dc=y({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:Vr,startAt:"HostReady",managedStyle:"inputHistory",start(){w("inputHistory",Ac),_=be().length,Ae=!1,xp()},stop(){ho?.abort(),ho=null,ln(),dp(),fa.clear(),clearTimeout(ga),yo=!1,ya=null,Ae=!1},onSettingsChange(){let e=be(),t=Ic(e);t.length!==e.length&&Wr(t),_>t.length&&(_=t.length)}});var xa="noShareLink",Sp=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],Lp=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],wa=S({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function $c(e){return`${e.join(",")}{display:none!important}`}function _c(){let e=[];if(wa.store.hideShareChat!==!1&&e.push($c(Sp)),wa.store.hideShareProject!==!1&&e.push($c(Lp)),!e.length){x(xa);return}w(xa,e.join(`
`))}var qc=y({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:wa,start:_c,onSettingsChange:_c,stop(){x(xa)}});var jc="noDictation",Tp=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],kp=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Gc=S({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Fc(e){return`${e.join(",")}{display:none!important}`}function zc(){let e=[Fc(Tp)];Gc.store.hideDictationSettings!==!1&&e.push(Fc(kp)),w(jc,e.join(`
`))}var Kc=y({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Gc,start:zc,onSettingsChange:zc,stop(){x(jc)}});var Ea="noSidebarIdentity",cn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Wc=cn.flatMap(e=>[`${e} .min-w-0 > .truncate`,`${e} .min-w-0.flex-1 .truncate`]),Yc=cn.flatMap(e=>[`${e} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),Cp=[...Wc,...Yc],Mp=[...Wc,...cn.flatMap(e=>[`${e} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],Ap=cn.map(e=>`${e} a[href^="mailto:"]`),Hp=cn.flatMap(e=>[`${e} .min-w-0 > :not(.truncate)`,`${e} .min-w-0 > :not(.truncate) *`,`${e} .min-w-0 .text-xs`,`${e} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${e} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${e} .text-xs:not(.truncate)`,`${e} .text-token-text-secondary:not(.truncate)`,`${e} .text-token-text-tertiary:not(.truncate)`,`${e} .min-w-0 ~ *`,`${e} .min-w-0 ~ * *`,`${e} > .text-xs`,`${e} > .text-token-text-secondary`,`${e} > .text-token-text-tertiary`]),Np=cn.flatMap(e=>[`${e} .min-w-0.flex-col > :not(.truncate)`,`${e} .min-w-0.flex-col > .text-xs`,`${e} .min-w-0.flex-col > .text-token-text-secondary`,`${e} .min-w-0.flex-col > .text-token-text-tertiary`,`${e} .min-w-0:not(.flex) > :not(.truncate)`,`${e} .min-w-0:not(.flex) > .text-xs`,`${e} .min-w-0:not(.flex) > .text-token-text-secondary`,`${e} .min-w-0:not(.flex) > .text-token-text-tertiary`]),vo=S({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function Uc(e){return`${e.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Pp(e){return`${e.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function Rp(){return`${Np.join(",")}{margin-block:auto!important}`}function Ip(){return`${Hp.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function Vc(){let e=vo.store.hideUsername!==!1,t=vo.store.hideEmail!==!1,n=e&&vo.store.enlargePlan!==!1,o=e&&vo.store.alignPlanWithAvatar===!0,r=[];if(e&&(o?(r.push(Pp([...Mp,...Yc])),r.push(Rp())):r.push(Uc(Cp))),t&&r.push(Uc(Ap)),n&&r.push(Ip()),!r.length){x(Ea);return}w(Ea,r.join(`
`))}var Xc=y({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:vo,start:Vc,onSettingsChange:Vc,stop(){x(Ea)}});var Zc=`#bloom-rt-host {
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
`;var eu=new E("RecentTopics"),mn="bloom-rt-host",tu="home",nu=/^\/c\/([a-z0-9_-]{8,})/i,Bp=/\/c\/([a-z0-9_-]{8,})/i,ou=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Dp=new Set(["Backquote","IntlBackslash"]),$p=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),_p=140,qp=[3,4,5,6,7,8,9,10,11,12].map(e=>({label:String(e),value:String(e),default:e===5})),q=S({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:qp},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),Yr=null,La=null,Z=!1,To=!1,xo=!1,He=0,Nt="",un=null,wo=null,dn,Sa=null;function Fp(){let e=Number(q.store.maxRecent??5);return Number.isFinite(e)&&e>=3&&e<=12?e:5}function Eo(){let e=q.plain.visits;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ta(){let e=q.plain.titles;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function ru(){let e=q.plain.previews;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function ka(){let e=q.plain.projects;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Zr(e){let t=Fp();return e.length>t?e.slice(0,t):e}function Ne(e){return e===tu}function So(e,t=_p){let n=e.replace(/\s+/g," ").trim();return n.length<=t?n:`${n.slice(0,t-1)}\u2026`}function Ca(e){if(!e)return"";try{return new URL(e,location.origin).pathname.match(nu)?.[1]??""}catch{return e.match(Bp)?.[1]??""}}function Pt(){let e=(location.pathname||"/").match(nu);if(e?.[1])return e[1];let n=ee().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return tu}function Ma(e){if(Ne(e))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${e}"]`);for(let o of n){if(Ca(o.getAttribute("href")||"")!==e)continue;let r=So(o.textContent||"",80);if(r)return r}}catch{}let t=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return Pt()===e&&t&&!/^ChatGPT$/i.test(t)?So(t,80):""}function zp(e){if(Ne(e))return"New chat";let t=Ta()[e];if(t)return t;let n=rn(e);return n||Ma(e)||"Chat"}function jp(e){return ka()[e]||""}function Gp(e){return ru()[e]||{}}function Aa(e,t){if(!e||Ne(e)||!t||/^new chat$/i.test(t.trim()))return;let n=Ta();n[e]!==t&&(n[e]=t,q.store.titles=n)}function Kp(e){e.type==="conversation-meta"&&(Aa(e.conversationId,e.title),Z&&fn())}function Up(e,t){if(!e||Ne(e)||!t)return;let n=ka();n[e]!==t&&(n[e]=t,q.store.projects=n)}function Vp(e,t){if(!e||Ne(e)||!t.user&&!t.assistant)return;let n=ru(),o=n[e]||{},r={user:t.user||o.user,assistant:t.assistant||o.assistant};o.user===r.user&&o.assistant===r.assistant||(n[e]=r,q.store.previews=n)}function Ha(e){if(!e||Ne(e)&&q.store.includeHome===!1)return;let t=Eo().filter(n=>n!==e);t.unshift(e),q.store.visits=Zr(t)}function Jr(){let e=q.store.includeHome!==!1;return Zr(Eo().filter(n=>e||!Ne(n))).map(n=>({id:n,title:zp(n),project:jp(n),preview:Gp(n)}))}function Jc(e){try{let t=document.querySelectorAll(`[data-message-author-role="${e}"]`),n=t[t.length-1];if(!(n instanceof HTMLElement))return"";let o=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||o.push(a)}let r=o.length?o.join(" "):n.textContent||"";return So(r)}catch{return""}}function Lo(e){if(!e||Ne(e)||e!==Pt())return;let t=Ma(e);t&&Aa(e,t);let n=Jc("user"),o=Jc("assistant");Vp(e,{user:n,assistant:o});let r=au(e);if(r){let i=iu(r);i&&Up(e,i)}}function Na(){let e=Ta(),t=ka(),n=[],o=new Set,r=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${mn}, #bloom-root, #bloom-sidebar-panel`))continue;let u=Ca(c.getAttribute("href")||"");if(!u||o.has(u))continue;o.add(u),n.push(u);let d=So(c.textContent||"",80);d&&!ou.test(d)&&e[u]!==d&&(e[u]=d,r=!0);let f=iu(c);f&&t[u]!==f&&(t[u]=f,i=!0)}}catch{}r&&(q.store.titles=e),i&&(q.store.projects=t);let a=Eo(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(q.store.visits=Zr([...a,...l]))}function iu(e){let t=e.parentElement;for(let n=0;n<10&&t;n++){if(t.id==="bloom-rt-host"||t.id==="bloom-root"){t=t.parentElement;continue}let o=t.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),r=So((o instanceof HTMLElement?o.textContent:"")||"",60);if(r&&!ou.test(r)&&!/^20\d{2}/.test(r)&&r!==e.textContent?.trim()&&t.querySelector('a[href^="/c/"]'))return r;t=t.parentElement}return""}function au(e){if(Ne(e)){let t=document.querySelector('[data-testid="create-new-chat-button"]');return t instanceof HTMLAnchorElement?t:document.querySelector('a[href="/"]')}try{for(let t of document.querySelectorAll(`a[href*="/c/${e}"]`))if(Ca(t.getAttribute("href")||"")===e)return t}catch{}return null}function Wp(e){let t=au(e);if(t){t.click();return}if(Ne(e)){location.assign("/");return}location.assign(`/c/${e}`)}function Yp(){let e=Pt();Nt&&Nt!==e&&Lo(Nt),Nt=e,Ha(e),Na();let t=Ma(e);t&&Aa(e,t),Lo(e)}function Xr(){dn===void 0&&(dn=window.setTimeout(()=>{dn=void 0,Yp()},120))}function Xp(){un||(un=history.pushState.bind(history),wo=history.replaceState.bind(history),history.pushState=function(...t){let n=un(...t);return Xr(),n},history.replaceState=function(...t){let n=wo(...t);return Xr(),n})}function Zp(){un&&(history.pushState=un),wo&&(history.replaceState=wo),un=null,wo=null}function Jp(e){return Dp.has(e.code)||e.keyCode===192?!0:$p.has(e.key)}function su(e){return e.key==="Control"||e.code==="ControlLeft"||e.code==="ControlRight"}function Qp(e,t){To=t,Na(),Lo(Pt()),Z=!0,He=0;try{let n=Pt();Ha(n);let o=Jr();o.length>1&&(He=e?o.length-1:1)}catch(n){eu.error("Failed to open switcher:",n)}fn()}function Qc(e){let{length:t}=Jr();t&&(He=(He+(e?-1:1)+t)%t,fn())}function Pa(){if(!Z)return;let e=Jr()[He];Z=!1,To=!1,fn(),e&&Wp(e.id)}function lu(){Z&&(Z=!1,To=!1,fn())}function eg(e){if(su(e)){xo=!0;return}if((e.ctrlKey||xo)&&!e.altKey&&!e.metaKey&&Jp(e)&&!e.repeat){e.preventDefault(),e.stopImmediatePropagation();try{Z?Qc(e.shiftKey):Qp(e.shiftKey,!0)}catch(n){eu.error("Hotkey failed:",n)}return}if(Z){if(e.key==="Escape"){e.preventDefault(),lu();return}if(e.key==="Enter"&&!e.shiftKey){e.preventDefault(),Pa();return}e.key==="Tab"&&(e.ctrlKey||xo)&&(e.preventDefault(),Qc(e.shiftKey))}}function tg(e){su(e)&&(xo=!1,Z&&To&&Pa())}function ng(e){let t=e.target instanceof Element?e.target:null;!t||!t.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(Xr)}function og(e){!Z||(e.target instanceof Element?e.target:null)?.closest(`#${mn}`)||lu()}function rg(){document.visibilityState==="hidden"&&Lo(Pt())}function ig(){if(!document.body)return null;let e=document.getElementById(mn);if(e instanceof HTMLElement)return La=e,e;e=document.createElement("div"),e.id=mn;let t=document.createElement("div");return t.className="bloom-rt-panel",t.setAttribute("role","listbox"),t.setAttribute("aria-label","Recent conversations"),t.dataset.visible="false",t.addEventListener("click",n=>n.stopPropagation()),e.append(t),document.body.append(e),La=e,e}function fn(){let e=ig();if(!e)return;let t=e.querySelector(".bloom-rt-panel");if(!t)return;if(!Z){t.dataset.visible="false",t.replaceChildren();return}let n=Jr();if(!n.length){t.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",t.replaceChildren(i);return}He>=n.length&&(He=0);let o=document.createElement("div");o.className="bloom-rt-list",o.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===He?"true":"false",s.setAttribute("aria-selected",a===He?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{He=a,Pa()}),o.append(s)}),t.replaceChildren(o),t.dataset.visible="true",t.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function ag(){document.getElementById(mn)?.remove(),La=null}var cu=y({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${mn}`],settings:q,start(){w("recentTopics",Zc),Nt=Pt(),Ha(Nt),Na(),Lo(Nt),Sa=te(Kp),Xp(),Yr=new AbortController;let{signal:e}=Yr;window.addEventListener("keydown",eg,{capture:!0,signal:e}),window.addEventListener("keyup",tg,{capture:!0,signal:e}),window.addEventListener("popstate",Xr,{signal:e}),document.addEventListener("click",ng,{capture:!0,signal:e}),document.addEventListener("click",og,{signal:e}),document.addEventListener("visibilitychange",rg,{signal:e})},stop(){Yr?.abort(),Yr=null,dn!==void 0&&(clearTimeout(dn),dn=void 0),Zp(),Sa?.(),Sa=null,Z=!1,To=!1,xo=!1,ag()},onSettingsChange(){let e=Zr(Eo());e.length!==Eo().length&&(q.store.visits=e),Z&&fn()}});var Ra="cleaner",sg=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],lg=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],cg=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],ug=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],dg=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],mg=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],Rt=S({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function pn(e){return`${e.join(",")}{display:none!important}`}function uu(){let e=[];if(Rt.store.hideDownloadApps!==!1&&e.push(pn(sg)),Rt.store.hideDisclaimer!==!1&&e.push(pn(lg)),Rt.store.hideUpgrade!==!1&&e.push(pn(cg)),Rt.store.hideLockedModels!==!1&&e.push(pn(ug)),Rt.store.hideHomePromo!==!1&&e.push(pn(dg)),Rt.store.hideAds!==!1&&e.push(pn(mg)),!e.length){x(Ra);return}w(Ra,e.join(`
`))}var du=y({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Rt,start:uu,onSettingsChange:uu,stop(){x(Ra)}});var ei=new E("ResponseNotification"),bn=S({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:vg},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Ia=!1,Qr=null,gn=null,ko=null;function fg(){return document.visibilityState==="hidden"||document.hidden}function pg(){return bn.store.onlyWhenHidden===!1?!0:fg()}function gg(){let e=rn(P());if(e)return e;let t=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return t&&!/^ChatGPT$/i.test(t)?t:"Chat"}function mu(){try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!gn||gn.state==="closed")&&(gn=new e);let t=gn,n=t.currentTime,o=[523.25,659.25];for(let r=0;r<o.length;r++){let i=t.createOscillator(),a=t.createGain();i.type="sine",i.frequency.value=o[r];let s=n+r*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(t.destination),i.start(s),i.stop(s+.24)}t.resume?.()}catch(e){ei.debug("chime failed",e)}}function bg(e){try{let t=new Audio(e);t.volume=.7,t.play()}catch(t){ei.debug("custom sound failed",t),mu()}}function fu(){let e=String(bn.store.soundUrl||"").trim();e?bg(e):mu()}function hg(){let e="Bloom++",t=`${gg()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:e,text:t,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(e,{body:t,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){ei.debug("notification failed",n)}}function yg(){pg()&&(bn.store.sound!==!1&&fu(),bn.store.browserNotification!==!1&&hg())}function vg(e){let t=document.createElement("button");return t.type="button",t.textContent="Play",t.addEventListener("click",()=>fu()),e.appendChild(t),()=>{t.remove()}}var pu=y({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:bn,start(){Ia=!0,Qr?.(),Qr=Y(e=>{Ia&&(e.userStopped||e.error||yg())}),ko?.abort(),ko=new AbortController,bn.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:ko.signal}),ei.debug("watch started")},stop(){Ia=!1,Qr?.(),Qr=null,ko?.abort(),ko=null;try{gn?.close()}catch{}gn=null}});var gu=`#bloom-pq-chip {
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
`;var Ho=new E("PromptQueue"),Ba="bloom-pq-chip",bu="promptQueue",hu=80,wg=50,Eg=2e3,wu=S({replacePending:{type:2,description:"Replace the queued prompt if you Enter again while one is waiting.",default:!0}}),z=new Map,je=!1,he="",F="",ft=!1,ye=!1,B=null,Co=null,ti=null,Ao,Mo,hn=null;function yn(){return ze(ee())}function vn(e){return e.replaceAll("\u200B","").replace(/\n$/,"").trim()}function yu(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(Le);return n instanceof HTMLElement?n:U()}function Da(e){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation()}function Eu(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function Sg(){try{let e=document.querySelectorAll('[data-message-author-role="user"]'),t=e[e.length-1];return t instanceof HTMLElement?vn(t.innerText||t.textContent||""):""}catch{return""}}function vu(e){if(!he||he===e)return;let t=z.get(he);!t||z.has(e)||X(he,e)&&(z.delete(he),z.set(e,t),F===he&&(F=e),B?.key===he&&(B.key=e),Ho.debug("migrated pending",he,"\u2192",e))}function $a(e){let t=yn();if(z.get(t)&&wu.store.replacePending===!1)return;z.set(t,{text:e,at:Date.now()}),B={key:t,text:e,turns:Eu(),ticks:3};let o=U();o&&Fe(o,""),mt(),Ho.debug("queued",t,e.length)}function Lg(e){z.delete(e),F===e&&(F=""),B?.key===e&&(B=null),mt()}function Tg(){ye=!0,clearTimeout(Mo),Mo=setTimeout(()=>{ye=!1,Mo=void 0},Eg)}function kg(){let e=yn(),t=z.get(e);if(!t)return;let n=U();if(!n)return;z.delete(e),F="",mt(),Tg(),Fe(n,t.text);let o=st();o&&!I(o)&&!Pr(o)&&(o.click(),ye=!1)}function xu(e){if(!je||ft||$()||yn()!==e)return;let t=z.get(e);if(!t){F="";return}if(fe())return;let n=U();if(!n)return;if(!at(n)){let r=vn(Q(n));if(r&&r!==t.text)return}let o=st();!o||I(o)||Pr(o)||(ft=!0,Fe(n,t.text),clearTimeout(Ao),Ao=setTimeout(()=>Cg(e,t.text),wg))}function Cg(e,t){Ao=void 0;try{if(!je)return;let n=z.get(e);if(!n||n.text!==t||$()||yn()!==e)return;let o=U();if(!o)return;let r=vn(Q(o));if(r&&r!==t&&!at(o))return;r!==t&&Fe(o,t);let i=st();if(!i||I(i)||Pr(i))return;i.click(),z.delete(e),F="",mt(),Ho.debug("drained",e)}finally{ft=!1}}function Su(e){let t=de();if(!t||t===document.body){e.style.left="50%",e.style.bottom="6.5rem";return}let n=t.getBoundingClientRect();e.style.left=`${Math.round(n.left+n.width/2)}px`,e.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`;let o=Math.min(512,Math.max(160,n.width-24));e.style.maxWidth=`${Math.round(o)}px`}function Oa(){hn?.remove(),hn=null}function mt(){if(!je||!document.body){Oa();return}let e=yn(),t=z.get(e);if(!t){Oa();return}let n=hn;n?.isConnected||(n=document.createElement("div"),n.id=Ba,document.body.appendChild(n),hn=n),n.replaceChildren();let o=document.createElement("span");o.className="bloom-pq-kicker",o.textContent="Next";let r=document.createElement("span");r.className="bloom-pq-text";let i=t.text.length>hu?`${t.text.slice(0,hu)}\u2026`:t.text;r.textContent=i,r.title=t.text;let a=document.createElement("div");a.className="bloom-pq-actions";let s=document.createElement("button");s.type="button",s.className="bloom-pq-btn bloom-pq-send",s.textContent="Send now",s.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),kg()});let l=document.createElement("button");l.type="button",l.className="bloom-pq-btn bloom-pq-x",l.setAttribute("aria-label","Dismiss queued prompt"),l.textContent="\xD7",l.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),Lg(e)}),a.append(s,l),n.append(o,r,a),Su(n)}function Mg(){if(!B)return;if(B.ticks-=1,z.get(B.key)&&Eu()>B.turns){let t=Sg();if(t&&t===B.text){Ho.debug("native send leaked; dropping pending"),z.delete(B.key),F===B.key&&(F=""),B=null,mt();return}}B.ticks<=0&&(B=null)}function Ag(e){if(!je||e.isComposing||e.keyCode===229||e.key!=="Enter"||e.shiftKey||e.ctrlKey||e.metaKey||ft)return;let t=yu(e.target)??yu(document.activeElement);if(!t||!$())return;if(e.altKey||ye){ye=!1;return}if(!me(t))return;let n=vn(Q(t));n&&(Da(e),$a(n))}function Hg(e){let t=e.closest("button");if(!(t instanceof HTMLElement)||I(t))return null;let n=e.closest(tn);if(n instanceof HTMLElement&&!I(n))return n;let o=st();return o&&(t===o||o.contains(t)||t.contains(o))?o:null}function Ng(e){if(!je)return;let t=e.target;if(!(t instanceof Element)||t.closest(`#${Ba}`))return;let n=t.closest("button");if(n instanceof HTMLElement&&I(n)||ft||!$()||!Hg(t))return;if(ye){ye=!1;return}let o=U();if(!o||!me(o))return;let r=vn(Q(o));r&&(Da(e),$a(r))}function Pg(e){if(!je)return;let t=e.target;if(!(t instanceof HTMLFormElement)||!t.matches(Nr)&&!t.querySelector(Le)||ft||!$())return;if(ye){ye=!1;return}let n=U()??t.querySelector(Le);if(!n||!me(n))return;let o=vn(Q(n));o&&(Da(e),$a(o))}var Lu=y({name:"PromptQueue",description:"Queue the next prompt while a reply is streaming. Enter/Send waits for this turn instead of interrupting.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:bu,cleanupSelectors:[`#${Ba}`],settings:wu,start(){je=!0,he=yn(),F="",ft=!1,ye=!1,B=null,w(bu,gu),Co?.abort(),Co=new AbortController;let{signal:e}=Co;window.addEventListener("keydown",Ag,{capture:!0,signal:e}),document.addEventListener("click",Ng,{capture:!0,signal:e}),document.addEventListener("submit",Pg,{capture:!0,signal:e}),ti?.(),ti=Y({onFall(t){if(je){if(t.userStopped||t.error){F="",mt();return}F=t.contextKey,xu(t.contextKey)}},onContext(t){vu(t),he=t,mt()},onTick(t){vu(t.contextKey),he=t.contextKey,Mg(),F&&F===t.contextKey&&xu(F),hn&&Su(hn)}}),mt(),Ho.debug("watch started")},stop(){je=!1,ti?.(),ti=null,Co?.abort(),Co=null,clearTimeout(Ao),Ao=void 0,clearTimeout(Mo),Mo=void 0,z.clear(),B=null,F="",ft=!1,ye=!1,Oa()}});var Tu=`.bloom-cls {
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
`;var Mu=new E("ChatListStatus"),ku="chatListStatus",ri="bloom-cls",Ig="bloom-cls",Og=1200*1e3,Bg="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",Pe=new Map,Re=!1,xn="",Ge=!1,ie=0,pt=null,Fa=null,wn=null,_a=null,ni=null,No=null,En=!1,Sn=new Set;function oi(){return Date.now()}function Au(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function It(e,t,n,o=!0){if(!(!e||!Re)){if(t==="idle")Pe.delete(e);else{let r=Pe.get(e);r&&r.kind===t&&n!=="net"?r.at=oi():Pe.set(e,{kind:t,at:oi(),source:n})}o&&Dg({v:1,id:e,kind:t,at:oi()}),Ln()}}function Dg(e){try{wn?.postMessage(e)}catch{}}function $g(e){let t=e.data;!t||t.v!==1||!t.id||t.kind!=="streaming"&&t.kind!=="done"&&t.kind!=="error"&&t.kind!=="idle"||It(t.id,t.kind,"bc",!1)}function _g(){let e=oi();for(let[t,n]of Pe)n.kind==="streaming"&&e-n.at>Og&&Pe.delete(t)}function qg(){let e=Au();if(!e)return[];let t=[],n=new Set;try{for(let o of e.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(o.closest(Bg))continue;let r=nn(o.getAttribute("href")||"");!r||n.has(r)||(n.add(r),t.push(o))}}catch{}return t}function Cu(e){let t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),e==="streaming")t.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("cx","12"),o.setAttribute("cy","12"),o.setAttribute("r","9"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","2"),t.appendChild(o)}return t.appendChild(n),t}function qa(e){let t=e.querySelector(`:scope > .${ri}`);return t||null}function za(){if(!Re)return;_g();let e=P(),t=qg();pt?.disconnect();try{for(let n of t){let o=nn(n.getAttribute("href")||"");if(!o||!e||o!==e){qa(n)?.remove();continue}let i=Pe.get(o)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){qa(n)?.remove();continue}let a=qa(n);a||(a=document.createElement("span"),a.className=ri,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(Cu("streaming")):i==="error"&&a.appendChild(Cu("error")))}}catch(n){Mu.debug("paint failed",n)}Hu()}function Ln(){if(Re){if(document.hidden){ie&&(cancelAnimationFrame(ie),ie=0),za();return}ie||(ie=requestAnimationFrame(()=>{ie=0,Re&&za()}))}}function Hu(){let e=Au();if(!(pt&&Fa===e&&e?.isConnected)){if(pt?.disconnect(),Fa=e,!e){pt=null;return}pt=new MutationObserver(()=>Ln()),pt.observe(e,{childList:!0,subtree:!0})}}function ja(){return!!(St()||fo())}function Fg(e){return!!(En||e&&Sn.has(e)||ja())}function zg(e){if(Re){if(e.type==="post-start"){e.conversationId?(En=!1,Sn.add(e.conversationId),Ge=!0,It(e.conversationId,"streaming","net")):(En=!0,Ge=!0);return}e.type==="post-end"&&(En=!1,e.conversationId&&(Sn.delete(e.conversationId),It(e.conversationId,e.error?"error":"done","net")),ja()||(Ge=!1))}}function jg(e,t){if(!Re)return;if(X(t,e)){Ln();return}let n=P();if(!(En||n&&Sn.has(n))){if(Ge=!1,n&&Pe.get(n)?.kind==="streaming"&&Pe.get(n)?.source==="local"){It(n,"idle","local");return}Ln()}}function Gg(e){if(!Re)return;let t=e.conversationId||P();if(xn&&t&&xn!==t){let o=Pe.get(xn);o?.kind==="streaming"&&o.source==="local"&&It(xn,fe()?"error":"done","local"),Ge=!!(t&&Sn.has(t))}if(xn=t,Fg(t)&&(e.streaming||ja())){Ge=!0,t&&It(t,"streaming","local"),Ln();return}Ge&&(Ge=!1,t&&It(t,fe()?"error":"done","local")),Ln()}var Nu=y({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${ri}`],start(){Re=!0,w(ku,Tu);try{wn=new BroadcastChannel(Ig)}catch{wn=null}wn?.addEventListener("message",$g),_a=te(zg),ni?.(),ni=Y({onTick:Gg,onContext:jg}),No?.abort(),No=new AbortController,document.addEventListener("visibilitychange",()=>{Re&&(ie&&(cancelAnimationFrame(ie),ie=0),za())},{signal:No.signal}),Hu(),Mu.debug("sidebar status watch started")},stop(){Re=!1,ie&&cancelAnimationFrame(ie),ie=0,No?.abort(),No=null,pt?.disconnect(),pt=null,Fa=null,ni?.(),ni=null,_a?.(),_a=null;try{wn?.close()}catch{}wn=null,Pe.clear(),Sn.clear(),En=!1,Ge=!1,xn="",document.querySelectorAll(`.${ri}`).forEach(e=>e.remove()),x(ku)}});var Ru="widerChat",Iu=40,Ou=96,Bu=64,Du=S({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:Iu,max:Ou,default:Bu}});function Kg(){return K(Number(Du.store.width??Bu),Iu,Ou)}function Pu(){let e=Kg(),t=`min(100%,${e}rem)`;w(Ru,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important;--user-chat-width:${e}rem!important;--composer-container-max-width:${e}rem!important;--thread-xl-max-width:${e}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${t}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${t}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${t}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${t}!important}`)}var $u=y({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Du,start:Pu,onSettingsChange:Pu,stop(){x(Ru)}});var Ga="composerOpacity",Tn='form[data-type="unified-composer"],form.w-full[data-type]',Ug=[`${Tn} [class*="corner-superellipse"]`,`${Tn} [class*="bg-token-bg-primary"]`,`${Tn} [class*="bg-token-main-surface"]`].join(","),Vg=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),Wg="#thread-bottom-container,#thread-bottom",Yg=`${Tn} #prompt-textarea,${Tn} [contenteditable="true"]`,Xg="var(--bg-primary,var(--main-surface-primary,#ffffff))",Ka=S({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function Zg(){return K(Number(Ka.store.opacity??100),0,100)}function Jg(){return K(Number(Ka.store.blur??16),0,40)}function _u(){let e=Zg();if(e>=100){x(Ga);return}let t=Jg(),n=`color-mix(in srgb,${Xg} ${e}%,transparent)`,o=t>0?`-webkit-backdrop-filter:blur(${t}px)!important;backdrop-filter:blur(${t}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";w(Ga,`${Wg}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Vg}{display:none!important}${Tn}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Ug}{background-color:${n}!important;background-image:none!important;${o}}${Yg}{background-color:transparent!important;background-image:none!important}`)}var qu=y({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[v.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Ka,start:_u,onSettingsChange:_u,stop(){x(Ga)}});var Fu=`#bloom-bn-host {
    position: fixed;
    z-index: 4200;
    width: 2.5rem;
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
    gap: 0;
    width: 2.5rem;
    max-height: var(--bloom-bn-cap, min(70vh, 28rem));
    padding: 8px 0;
    box-sizing: border-box;
    overflow: hidden;
}

.bloom-bn-tick {
    appearance: none;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 2.5rem;
    height: calc(1rem + 2px);
    margin: 0;
    padding: 0 0.25rem;
    border: 0;
    background: transparent;
    cursor: pointer;
}

.bloom-bn-tick::after {
    content: "";
    display: block;
    width: 1.25rem;
    height: 2px;
    flex: none;
    border-radius: 0.125rem;
    background: color-mix(in srgb, var(--text-primary, #0d0d0d) 40%, transparent);
    box-shadow: none;
    opacity: 1;
    transition: width 0.2s ease, background 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.bloom-bn-tick.bloom-bn-current::after {
    width: 1.75rem;
    height: 2px;
    background: color-mix(in srgb, var(--text-primary, #0d0d0d) 83%, transparent);
    box-shadow: 0 0 3px color-mix(in srgb, var(--text-primary, #0d0d0d) 83%, transparent);
    opacity: 1;
}

.bloom-bn-dense .bloom-bn-tick {
    height: calc(0.375rem + 2px);
}

.bloom-bn-tick-live::after {
    width: 1.25rem;
    height: 0;
    background: none;
    border-radius: 0;
    box-shadow: none;
    border-top: 1px dashed color-mix(in srgb, var(--text-primary, #0d0d0d) 40%, transparent);
    opacity: 1;
}

.bloom-bn-tick-live.bloom-bn-current::after {
    width: 1.75rem;
    height: 0;
    background: none;
    border-top-color: color-mix(in srgb, var(--text-primary, #0d0d0d) 83%, transparent);
    box-shadow: none;
    opacity: 1;
}

.bloom-bn-dense .bloom-bn-tick-live::after {
    height: 0;
    background: none;
}

.bloom-bn-menu {
    position: absolute;
    top: 50%;
    right: calc(100% + 0.25rem);
    display: flex;
    flex-direction: column;
    width: min(18rem, 70vw);
    max-height: min(70vh, 28rem, var(--bloom-bn-cap, 28rem));
    padding: 0;
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
    padding: 0.375rem;
    border-radius: 1.25rem;
    border: 1px solid var(--border-light, rgba(0, 0, 0, 0.1));
    background: var(--bg-primary, var(--main-surface-primary, #fff));
    box-shadow: var(--shadow-long, 0 8px 24px rgba(0, 0, 0, 0.12));
}

.bloom-bn-meta {
    flex: none;
    margin: 0;
    padding: 0.25rem 0.625rem 0.375rem;
    font-size: 11px;
    letter-spacing: -0.1px;
    color: var(--text-secondary, #5d5d5d);
}

.bloom-bn-list {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    min-height: 0;
    overflow: auto;
    margin: 0;
    padding: 0;
    list-style: none;
}

.bloom-bn-item {
    appearance: none;
    display: flex;
    align-items: center;
    gap: 0.375rem;
    width: 100%;
    margin: 0;
    padding: 0.4rem 0.5rem;
    border: 0;
    border-radius: 0.75rem;
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
    width: auto;
    min-width: 1.75em;
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
`;var eb=new E("BetterNavigator"),Ua="betterNavigator",zu="bloom-bn-host",Xa=60,tb=16,nb=1e3,ob=2.5,rb=.4,ai="\u6B63\u5728\u8F93\u51FA\u2026",ib=40,ab=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,sb=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),lb=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='thinking']","[class*='reasoning']","[class*='footnote']",".sr-only"].join(", "),cb=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),di=S({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),kn=new Map,Cn=new Set,ve=!1,Dt=!1,gt=null,Bo=null,$t=null,si=null,j=[],_t="",li=0,ci=-1,ns=0,ui="",ae=0,Ke=0,Po,Ro=null,ii=null,Va=null,Wa=null,Ot=null,Za=null,Io=null,Bt=null,Mn=null,Oo=null;function mi(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function Ya(e){let t=e.trim();if(!t)return 0;let n=Number.parseFloat(t);return Number.isFinite(n)?t.endsWith("rem")?n*16:n:0}function ub(e){let t=e.className;return typeof t=="string"?t:e.getAttribute("class")||""}function db(e){let t=e.getBoundingClientRect(),n=null;try{let i=e.querySelector("[data-message-id]");for(;i&&i!==e;)ab.test(ub(i))&&(n=i),i=i.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let r=n.getBoundingClientRect();if(r.width>160&&r.width<=t.width+8)return r}let o=0;try{o=Ya(getComputedStyle(e).getPropertyValue("--thread-content-max-width"))||Ya(getComputedStyle(e).getPropertyValue("--thread-content-width"))||Ya(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(o>160){let r=Math.min(o,t.width),i=t.left+Math.max(0,(t.width-r)/2);return new DOMRect(i,t.top,r,t.height)}return t}function mb(e){try{return!!e.closest(sb)}catch{return!0}}function fb(e){let t=(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||e.getAttribute("data-turn")||"").toLowerCase();if(t==="user"||t==="assistant")return t;let n=(e.getAttribute("aria-label")||"").toLowerCase();return n.includes("you said")?"user":n.includes("chatgpt said")||n.includes("assistant said")?"assistant":null}function ju(e){let t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode(r){let i=r.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(i.closest(lb))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return(r.textContent||"").replace(/\s+/g," ").trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),o;for(;(o=n.nextNode())&&t.join(" ").length<Xa+20;)t.push((o.textContent||"").replace(/\s+/g," ").trim());return t.join(" ").replace(/\s+/g," ").trim()}function pb(e,t){try{if(e.querySelector("img, picture, video, canvas"))return"Image";if(e.querySelector("a[download], [class*='attachment']"))return"File";if(e.querySelector("pre, code"))return"Code"}catch{}return`Message ${t+1}`}function gb(e,t){let n=t==="user"?e.querySelector(".whitespace-pre-wrap")??e:e.querySelector(".markdown")??e;return ju(n)}function bb(e){return e.length>Xa?`${e.slice(0,Xa).trimEnd()}\u2026`:e}function hb(e,t,n,o){let r=gb(e,t);return r?bb(r):o?ai:pb(e,n)}function yb(){if(Dt)return!0;let e=P();return!!(e&&Cn.has(e)||St()||fo())}function vb(e){try{if(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")||e.querySelector("[aria-busy='true'], .result-streaming"))return!0;let t=e.querySelector(".markdown");if((!t||t instanceof HTMLElement&&!ju(t))&&e.querySelector("[class*='thinking'], [class*='reasoning'], details"))return!0}catch{}return!1}function xb(){let e=mi();if(!e||e===document.body)return[];let t=di.store.showAssistant!==!1,n=t&&yb(),o=[];try{for(let r of e.querySelectorAll("[data-message-id]")){if(mb(r))continue;let i=r.getAttribute("data-message-id")||"";if(!i)continue;let a=fb(r);if(a!=="user"&&a!=="assistant"||a==="assistant"&&!t)continue;let s=a==="assistant"&&n&&vb(r),l=hb(r,a,o.length,s);l&&l!==ai&&l!==kn.get(i)&&kn.set(i,l);let c=s&&l===ai?ai:kn.get(i)||l;o.push({id:i,el:r,role:a,text:c,live:s})}}catch{}return o}function wb(){let t=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(t,48),88)}function Gu(e){let t=e;for(;t&&t!==document.body&&t!==document.documentElement;){let o=getComputedStyle(t).overflowY;if((o==="auto"||o==="scroll")&&t.scrollHeight>t.clientHeight+8)return t;t=t.parentElement}return window}function Eb(e){return e===window?window.innerHeight:e.clientHeight}function Sb(e){let t=e instanceof Element?e:e instanceof Node?e.parentElement:null;if(!t)return!1;try{return!!t.closest(cb)}catch{return!1}}function Ku(){Po!==void 0&&(clearTimeout(Po),Po=void 0),Ro?.classList.remove("bloom-bn-flash"),Ro=null}function Lb(e){Ku(),e.classList.add("bloom-bn-flash"),Ro=e,Po=setTimeout(()=>{e.classList.remove("bloom-bn-flash"),Ro===e&&(Ro=null),Po=void 0},800)}function Ja(e){if(!j.length)return;let t=Math.max(0,Math.min(e,j.length-1));li=t,Bo?.querySelectorAll(".bloom-bn-tick").forEach((o,r)=>{o.classList.toggle("bloom-bn-current",r===t)}),$t?.querySelectorAll(".bloom-bn-item").forEach((o,r)=>{o.classList.toggle("bloom-bn-active",r===t)}),si&&(si.textContent=`${t+1} / ${j.length}`);let n=$t?.children[t];if(n instanceof HTMLElement){let o=$t;if(o){let r=n.offsetTop-o.clientHeight/2+n.offsetHeight/2;o.scrollTop=Math.max(0,r)}}}function Qa(e){let t=j[e];if(!t?.el.isConnected)return;ci=e,ns=Date.now()+nb,Ja(e);let n=Mn??Gu(t.el),r=Math.abs(t.el.getBoundingClientRect().top-wb())>ob*Eb(n);t.el.scrollIntoView({behavior:r?"auto":"smooth",block:"start"}),di.store.jumpEffect!=="none"&&Lb(t.el)}function os(){if(!ve||!j.length)return;if(Date.now()<ns&&ci>=0){Ja(ci);return}let e=window.innerHeight*rb,t=0;for(let n=0;n<j.length;n++){let o=j[n].el;o.isConnected&&o.getBoundingClientRect().top<=e&&(t=n)}Ja(t)}function Tb(e){let t=Gu(e);if(Mn===t&&Oo)return;Oo?.(),Mn=t;let n=t===window?document:t,o=()=>{os(),rs()};n.addEventListener("scroll",o,{passive:!0}),Oo=()=>n.removeEventListener("scroll",o)}function kb(e){Bt?.disconnect(),Bt=null;let t=Mn instanceof HTMLElement?Mn:null;Bt=new IntersectionObserver(()=>os(),{root:t,threshold:[0,.15,.4,.75,1]});for(let n of e)n.el.isConnected&&Bt.observe(n.el)}function Cb(){if(!document.body)return null;let e=gt;if(e?.isConnected)return e;e=document.createElement("div"),e.id=zu,e.className="bloom-bn-host",e.setAttribute("role","navigation"),e.setAttribute("aria-label","Conversation outline"),e.hidden=!0;let t=document.createElement("div");t.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let o=document.createElement("div");o.className="bloom-bn-card";let r=document.createElement("div");r.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",o.append(r,i),n.appendChild(o),e.append(t,n),document.body.appendChild(e),gt=e,Bo=t,$t=i,si=r,e}function Uu(){let e=gt,t=mi();if(!e||!t||!t.isConnected||j.length<1){e&&(e.hidden=!0);return}let n=t.getBoundingClientRect(),o=db(t),r=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,r?r.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){e.hidden=!0;return}let c=e.offsetWidth||ib,d=n.right-o.right>=c+8?o.right+4:o.right-12-c;d=Math.min(d,n.right-c-8),d=Math.max(8,d);let f=Math.max(8,Math.round(window.innerWidth-d-c));e.hidden=!1,e.style.top=`${Math.round((a+s)/2)}px`,e.style.height="auto",e.style.maxHeight=`${Math.round(l)}px`,e.style.right=`${f}px`,e.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function rs(){!ve||Ke||(Ke=requestAnimationFrame(()=>{Ke=0,ve&&Uu()}))}function Mb(e){let t=["bloom-bn-tick"];return e.role==="assistant"&&t.push("bloom-bn-tick-asst"),e.live&&t.push("bloom-bn-tick-live"),t.join(" ")}function Ab(e){let t=Bo,n=$t;!t||!n||(t.replaceChildren(),n.replaceChildren(),t.classList.toggle("bloom-bn-dense",e.length>tb),e.forEach((o,r)=>{let i=document.createElement("button");i.type="button",i.className=Mb(o),i.setAttribute("aria-label",`Go to message ${r+1} of ${e.length}`),i.addEventListener("click",c=>{c.preventDefault(),Qa(r)}),t.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${o.role}`;let s=document.createElement("span");s.className="bloom-bn-mark",s.textContent=o.role==="user"?"You":"GPT";let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=o.text,l.title=o.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),Qa(r)}),n.appendChild(a)}))}function Hb(e){Bo?.querySelectorAll(".bloom-bn-tick").forEach((t,n)=>{t.classList.toggle("bloom-bn-tick-live",!!e[n]?.live)}),e.forEach((t,n)=>{let r=$t?.children[n]?.querySelector(".bloom-bn-label");r&&r.textContent!==t.text&&(r.textContent=t.text,r instanceof HTMLElement&&(r.title=t.text))})}function Nb(){let e=P();return e===ui?!1:(ui=e,kn.clear(),j=[],_t="",li=0,ci=-1,ns=0,Dt&&e&&(Cn.add(e),Dt=!1),!0)}function Pb(e){let t=di.store.showAssistant!==!1?"1":"0";return`${ui}|${t}|${e.map(n=>n.id).join(",")}`}function es(){if(!ve)return;Nb();let e=xb(),t=mi();if(!t||e.length<1){j=e,_t="",gt&&(gt.hidden=!0),Bt?.disconnect(),ts();return}Cb();let n=Pb(e);n!==_t?(j=e,_t=n,Ab(e),Tb(t),kb(e)):(j=e,Hb(e)),Uu(),os(),ts()}function Ue(){if(ve){if(document.hidden){ae&&(cancelAnimationFrame(ae),ae=0),es();return}ae||(ae=requestAnimationFrame(()=>{ae=0,ve&&es()}))}}function ts(){let e=mi();if(!(Ot&&Za===e&&e?.isConnected)){if(Ot?.disconnect(),Io?.disconnect(),Za=e,!e||e===document.body){Ot=null;return}Ot=new MutationObserver(()=>Ue()),Ot.observe(e,{childList:!0,subtree:!0}),Io=new ResizeObserver(()=>rs()),Io.observe(e)}}function Rb(e){if(ve){if(e.type==="post-start"){e.conversationId?(Dt=!1,Cn.add(e.conversationId)):Dt=!0,Ue();return}if(e.type==="post-end"){if(Dt=!1,e.conversationId)Cn.delete(e.conversationId);else{let t=P();t&&Cn.delete(t)}Ue()}}}function Ib(e){if(!ve||!j.length||gt?.hidden||e.altKey||e.ctrlKey||e.metaKey||Sb(e.target))return;let t=-1;if(e.key==="ArrowDown")t=li+1;else if(e.key==="ArrowUp")t=li-1;else if(e.key==="Home")t=0;else if(e.key==="End")t=j.length-1;else if(e.key==="Escape"){document.activeElement?.blur?.();return}else return;e.preventDefault(),Qa(Math.max(0,Math.min(t,j.length-1)))}function Ob(){Ku(),Bt?.disconnect(),Bt=null,Ot?.disconnect(),Ot=null,Za=null,Io?.disconnect(),Io=null,Oo?.(),Oo=null,Mn=null,gt?.remove(),gt=null,Bo=null,$t=null,si=null}var Vu=y({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:Ua,cleanupSelectors:[`#${zu}`],settings:di,start(){ve=!0,ui=P(),w(Ua,Fu),ii=new AbortController;let{signal:e}=ii;window.addEventListener("keydown",Ib,{signal:e}),window.addEventListener("popstate",Ue,{signal:e}),window.visualViewport?.addEventListener("resize",rs,{signal:e}),document.addEventListener("visibilitychange",()=>{ve&&(ae&&(cancelAnimationFrame(ae),ae=0),Ke&&(cancelAnimationFrame(Ke),Ke=0),es())},{signal:e}),Wa=te(Rb),Va=Y({onTick(){Ue()},onFall(){Ue()},onContext(t,n){X(n,t)||(kn.clear(),_t=""),Ue()}}),ts(),Ue(),eb.debug("navigator started")},stop(){ve=!1,ae&&cancelAnimationFrame(ae),ae=0,Ke&&cancelAnimationFrame(Ke),Ke=0,ii?.abort(),ii=null,Va?.(),Va=null,Wa?.(),Wa=null,Cn.clear(),Dt=!1,Ob(),kn.clear(),j=[],_t="",x(Ua)},onSettingsChange(){_t="",Ue()}});var Wu=`.bloom-ts {
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
`;function Yu(e,t,n=Date.now()){let o=new Date(e);if(Number.isNaN(o.getTime()))return"";let r=new Date(n),i=o.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(o.toDateString()===r.toDateString()||!t)return i;let s=o.getFullYear()===r.getFullYear();return`${o.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Xu(e){try{return new Date(e).toISOString()}catch{return""}}var ed=new E("MessageTimestamps"),Zu="messageTimestamps",pi="bloom-ts",Ju=1500,Db="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",An=S({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),Hn=new Map,Ft=!1,se=0,bt=null,as=null,is=null,fi=null,Do=null,Qu=!1;function td(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function ls(){let e=An.plain.stamps;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function nd(){let e={...ls()};for(let[n,o]of Hn)e[n]=o;let t=Object.keys(e);if(t.length>Ju){let n=t.slice(t.length-Ju),o={};for(let r of n)o[r]=e[r];An.store.stamps=o;return}An.store.stamps=e}var $b=js(nd,500);function od(e,t){!e||!t||Hn.get(e)===t||(Hn.set(e,t),$b(),qt())}function _b(e){return e?Hn.get(e)??ls()[e]??Dr(e)??null:null}function qb(e){Ft&&e.type==="message-time"&&od(e.messageId,e.createTime)}function Fb(e){return(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function zb(){let e=td();if(!e)return[];let t=[];try{for(let n of e.querySelectorAll("[data-message-id]"))n.closest(Db)||t.push(n)}catch{}return t}function jb(e){try{return!!e.querySelector("time:not(.bloom-ts)")}catch{return!1}}function ss(){if(!Ft)return;let e=An.store.hideOwnMessages===!0,t=An.store.showDate!==!1,n=$(),o=zb();bt?.disconnect();try{o.forEach((r,i)=>{let a=r.getAttribute("data-message-id")||"",s=Fb(r),l=r.querySelector(`:scope > .${pi}`);if(e&&s==="user"){l?.remove();return}if(jb(r)){l?.remove();return}let c=_b(a);if(!c&&a&&(n||Qu)&&i>=o.length-2&&(c=Date.now(),od(a,c)),!c){l?.remove();return}let u=Yu(c,t);if(!u){l?.remove();return}let d=l;d||(d=document.createElement("time"),d.className=pi,d.setAttribute("aria-hidden","true"),r.insertBefore(d,r.firstChild)),d.textContent!==u&&(d.textContent=u);let f=Xu(c);f&&d.getAttribute("datetime")!==f&&d.setAttribute("datetime",f)})}catch(r){ed.debug("paint failed",r)}Qu=n,rd()}function qt(){if(Ft){if(document.hidden){se&&(cancelAnimationFrame(se),se=0),ss();return}se||(se=requestAnimationFrame(()=>{se=0,Ft&&ss()}))}}function rd(){let e=td();if(!(bt&&as===e&&e?.isConnected)){if(bt?.disconnect(),as=e,!e||e===document.body){bt=null;return}bt=new MutationObserver(()=>qt()),bt.observe(e,{childList:!0,subtree:!0})}}var id=y({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${pi}`],settings:An,start(){Ft=!0,w(Zu,Wu);let e=ls();for(let[t,n]of Object.entries(e))typeof n=="number"&&n>0&&Hn.set(t,n);is=te(qb),fi?.(),fi=Y({onTick:qt,onFall:qt,onContext:qt}),Do?.abort(),Do=new AbortController,document.addEventListener("visibilitychange",()=>{Ft&&(se&&(cancelAnimationFrame(se),se=0),ss())},{signal:Do.signal}),rd(),qt(),ed.debug("timestamp watch started")},stop(){Ft=!1,se&&cancelAnimationFrame(se),se=0,Do?.abort(),Do=null,bt?.disconnect(),bt=null,as=null,fi?.(),fi=null,is?.(),is=null,nd(),Hn.clear(),document.querySelectorAll(`.${pi}`).forEach(e=>e.remove()),x(Zu)},onSettingsChange:qt});var cs="streamerMode",Gb="filter:blur(6px)!important;transition:filter .2s ease",Kb="filter:none!important",Nn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],Pn=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function le(e,t){return e.map(n=>`${n} ${t}`)}var zt=S({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function Rn(e,t=!0){let n=e.join(","),o=e.map(r=>`${r}:hover`).join(",");return`${n}{${Gb}}${t?`${o}{${Kb}}`:""}`}function ad(){let e=[];if(zt.store.conversations!==!1&&(e.push(Rn([...le(Pn,'a[href^="/c/"]'),...le(Pn,'a[href*="/c/"]')])),e.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),zt.store.projects!==!1&&(e.push(Rn([...le(Pn,'a[href*="/project"]'),...le(Pn,'a[href*="/g/g-p-"]'),...le(Pn,'[data-testid="project-name"]'),...le(Pn,'[data-testid="project-link"]')])),e.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),zt.store.headerTitle!==!1&&e.push(Rn(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),zt.store.accountAvatar!==!1&&e.push(Rn([...le(Nn,"img"),...le(Nn,'[class*="avatar"]'),".bloom-csi-face"],!1)),zt.store.accountName!==!1&&e.push(Rn([...le(Nn,".min-w-0 > .truncate"),...le(Nn,".min-w-0.flex-1 .truncate"),...le(Nn,".bloom-csi-name"),".bloom-csi-name"],!1)),zt.store.accountEmail!==!1&&e.push(Rn([...le(Nn,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),e.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),e.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!e.length){x(cs);return}w(cs,e.join(`
`))}var sd=y({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[v.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:zt,start:ad,onSettingsChange:ad,stop(){x(cs)}});var ld=`.bloom-gc-panel {
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
}`;var Vb=new E("GreetingCustomizer"),In="greetingCustomizer",cd="greetingCustomizerUi",$o=100,ds=30,Wb=120,Yb=1e3,Xb=50,Zb=40,Jb=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),_o=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),vi=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function Qb(e){return!!e?.closest(Jb)}function fd(e){return!!(Qb(e)||e.closest('[data-testid="temporary-chat-label"]')||e.closest("[hidden]")||e.getAttribute("aria-hidden")==="true"||e.classList.contains("sr-only"))}function Uo(e){try{for(let t of document.querySelectorAll(e))if(!fd(t))return t}catch{}return null}function us(e){for(let t of e.split(",").map(n=>n.trim()).filter(Boolean))if(Uo(t))return t;return e}var pd=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],G=S({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:gh},greetings:{type:0,description:"Greeting texts",hidden:!0,default:pd},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),Ie=!1,Dn=!1,Gt=null,bi,qo,On,Fo,hi=0,gi=null,Bn=null,zo=null,jo=null,Go=null,yi=null;function We(){let e=location.pathname||"/";return e==="/"||e===""}function jt(){let e=G.plain.greetings;return Array.isArray(e)?e.filter(t=>typeof t=="string"):pd.slice()}function Ko(e){return String(e??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function ud(e){G.store.greetings=e.slice(0,ds)}function Vo(){let e=String(G.store.mode??"refresh");return e==="interval"||e==="manual"?e:"refresh"}function eh(){return G.store.order==="random"?"random":"sequential"}function th(){return K(Number(G.store.intervalSec??10),1,3600)*1e3}function nh(e){return String(e??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function oh(){return!!Uo(vi)}function xi(){return!!(Uo(vi)||Uo(_o))}function rh(e,t){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),o=[`content:"${e}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),r=oh()?us(vi):Uo(_o)?us(_o):us(vi),i=t?`${_o}{cursor:pointer!important;user-select:none!important}`:"";return[`${r}{${n}}`,`${r}::before{${o}}`,i,`@media (max-width:768px){${r}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function ih(e,t){if(e<=0)return 0;if(e===1)return Number(G.plain.index)!==0&&(G.store.index=0),Number(G.plain.lastRandom)!==0&&(G.store.lastRandom=0),0;let n=Number(G.plain.index),o=Number(G.plain.lastRandom);if(!t)return n>=0&&n<e?n:0;if(eh()==="random"){let a=n>=0&&n<e?n:o,s=Math.floor(Math.random()*e),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*e);return G.store.index=s,G.store.lastRandom=s,s}let i=((n>=-1&&n<e?n:-1)+1)%e;return G.store.index=i,i}function Ve(e){if(!Ie)return;if(!We()){x(In);return}let t=jt().map(Ko).filter(Boolean);if(!t.length){x(In);return}let n=ih(t.length,e),o=t[n]??t[0],r=Vo()==="manual"&&t.length>1;w(In,rh(nh(o),r)),yi?.()}function ms(){bi!==void 0&&(clearInterval(bi),bi=void 0)}function fs(){ms(),!(!Ie||!We())&&Vo()==="interval"&&(jt().filter(Boolean).length<=1||(bi=setInterval(()=>Ve(!0),th())))}function ps(){Fo!==void 0&&(clearTimeout(Fo),Fo=void 0),hi=0}function dd(){if(ps(),!Ie||!We())return;hi=Zb;let e=()=>{if(Fo=void 0,!(!Ie||!We())){if(xi()){Vo()==="refresh"&&!Dn?(Dn=!0,Ve(!0)):Ve(!1),fs();return}hi-=1,hi>0&&(Fo=setTimeout(e,Xb))}};e()}function gs(){if(Gt===!0){xi()?Ve(!1):dd();return}Gt=!0,Dn=!1,Vo()==="refresh"?(Dn=!0,Ve(!0)):Ve(!1),fs(),xi()||dd()}function bs(){Gt=!1,Dn=!1,ms(),ps(),x(In)}function wi(){On===void 0&&(On=window.setTimeout(()=>{On=void 0,Ie&&(We()?gs():Gt!==!1&&bs())},Wb))}function ah(){Bn||(Bn=history.pushState.bind(history),zo=history.replaceState.bind(history),jo=function(...t){let n=Bn(...t);return wi(),n},Go=function(...t){let n=zo(...t);return wi(),n},history.pushState=jo,history.replaceState=Go)}function sh(){jo&&history.pushState===jo&&Bn&&(history.pushState=Bn),Go&&history.replaceState===Go&&zo&&(history.replaceState=zo),Bn=null,zo=null,jo=null,Go=null}function lh(e){let t=e.target instanceof Element?e.target:null;t&&t.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(wi)}function ch(e){if(!Ie||!We()||Vo()!=="manual"||jt().filter(Boolean).length<=1)return;let t=e.target instanceof Element?e.target:null;if(!t)return;let n=t.closest(_o);if(!n||fd(n))return;let o=window.getSelection?.();o&&String(o).trim()||Ve(!0)}function uh(){qo===void 0&&(qo=setInterval(()=>{if(!Ie)return;let e=We();if(e!==(Gt===!0)){e?gs():bs();return}e&&xi()&&Ve(!1)},Yb))}function dh(){qo!==void 0&&(clearInterval(qo),qo=void 0)}function md(e,t){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=e,n.setAttribute("aria-label",e);let o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.75"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),o.setAttribute("aria-hidden","true");for(let r of t.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",r),o.appendChild(i)}return n.appendChild(o),n}var mh="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",fh="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function ph(e,t){let n=Ko(e);return n?n.length>$o?`Keep it to ${$o} characters.`:jt().length+(t?1:0)>ds?`At most ${ds} greetings.`:null:"Enter a greeting."}function gh(e){e.className="bloom-gc-panel";let t="",n=-1,o="",r=-1,i=()=>{let a=jt(),s=Number(G.plain.index);e.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=$o,c.placeholder="New greeting (line breaks ok)",c.value=t,c.addEventListener("input",()=>{t=c.value,o="";let m=l.querySelector(".bloom-gc-count");m&&(m.textContent=`${Ko(t).length}/${$o}`);let L=l.querySelector(".bloom-gc-error");L&&(L.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${Ko(t).length}/${$o}`;let f=document.createElement("span");f.className="bloom-gc-error",f.textContent=o;let b=document.createElement("div");if(b.className="bloom-gc-actions",n>=0){let m=document.createElement("button");m.type="button",m.className="bloom-gc-btn",m.textContent="Cancel",m.addEventListener("click",()=>{n=-1,t="",o="",i()}),b.appendChild(m)}let g=document.createElement("button");if(g.type="button",g.className="bloom-gc-btn bloom-gc-btn-primary",g.textContent=n>=0?"Update":"Add",g.addEventListener("click",()=>{let m=n<0,L=ph(t,m);if(L){o=L,i();return}let A=Ko(t),D=jt().slice();n>=0&&n<D.length?D[n]=A:D.push(A),ud(D),n=-1,t="",o="",i()}),b.appendChild(g),u.append(d,f,b),l.appendChild(u),e.appendChild(l),!a.length){let m=document.createElement("p");m.className="bloom-gc-empty",m.textContent="No greetings. The official heading stays.",e.appendChild(m);return}let h=document.createElement("div");h.className="bloom-gc-list",a.forEach((m,L)=>{let A=document.createElement("div");A.className="bloom-gc-item",L===s&&(A.dataset.active="true");let D=document.createElement("button");D.type="button",D.className=`bloom-gc-body${r===L?"":" bloom-gc-clamp"}`,D.textContent=m,D.addEventListener("click",()=>{r=r===L?-1:L,i()});let De=document.createElement("div");De.className="bloom-gc-item-actions";let $e=md("Edit",mh);$e.addEventListener("click",()=>{n=L,t=m,o="",i()});let C=md("Delete",fh);C.addEventListener("click",()=>{let we=jt().filter((Ze,Ee)=>Ee!==L);ud(we),n===L?(n=-1,t=""):n>L&&(n-=1),i()}),De.append($e,C),A.append(D,De),h.appendChild(A)}),e.appendChild(h)};return yi=i,i(),()=>{yi===i&&(yi=null),e.replaceChildren()}}var gd=y({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:cd,settings:G,start(){Ie=!0,w(cd,ld),ah(),gi=new AbortController;let{signal:e}=gi;window.addEventListener("popstate",wi,{signal:e}),document.addEventListener("click",lh,{capture:!0,signal:e}),document.addEventListener("click",ch,{signal:e}),uh(),Gt=null,We()?gs():bs(),Vb.debug("started")},stop(){Ie=!1,gi?.abort(),gi=null,On!==void 0&&(clearTimeout(On),On=void 0),ms(),ps(),dh(),sh(),x(In),Dn=!1,Gt=null},onSettingsChange(){Ie&&(We()?(Ve(!1),fs()):x(In))}});var bd=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

.bloom-csi-host {
    visibility: hidden !important;
}

.bloom-csi-face {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 999px;
    pointer-events: none;
    user-select: none;
    flex-shrink: 0;
}

.bloom-csi-slot {
    position: relative;
    flex-shrink: 0;
}

[data-bloom-csi] {
    --bloom-csi-avatar-size: 40px;
    position: relative;
}

#stage-sidebar-tiny-bar [data-bloom-csi] {
    --bloom-csi-avatar-size: 32px;
}

[data-bloom-csi] .bloom-csi-slot,
[data-bloom-csi] .bloom-csi-host,
[data-bloom-csi] .bloom-csi-face {
    width: var(--bloom-csi-avatar-size, 2rem) !important;
    height: var(--bloom-csi-avatar-size, 2rem) !important;
    min-width: var(--bloom-csi-avatar-size, 2rem) !important;
    min-height: var(--bloom-csi-avatar-size, 2rem) !important;
    max-width: var(--bloom-csi-avatar-size, 2rem) !important;
    max-height: var(--bloom-csi-avatar-size, 2rem) !important;
    border-radius: 999px !important;
    object-fit: cover !important;
    flex-shrink: 0 !important;
}

.bloom-csi-name {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25;
    color: var(--text-primary, inherit);
    user-select: none;
    pointer-events: none;
}

[data-bloom-csi-named] .min-w-0 > .truncate,
[data-bloom-csi-named] .min-w-0.flex-1 .truncate {
    visibility: hidden !important;
    position: absolute !important;
    width: 0 !important;
    height: 0 !important;
    max-width: 0 !important;
    max-height: 0 !important;
    overflow: hidden !important;
    pointer-events: none !important;
}

.bloom-csi-panel {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.bloom-csi-avatar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
}

.bloom-csi-preview {
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
    border-radius: 999px;
    object-fit: cover;
    background: var(--bg-secondary, var(--main-surface-secondary, #f9f9f9));
}

.bloom-csi-url {
    flex: 1;
    min-width: 0;
    width: 100%;
    box-sizing: border-box;
    height: 32px;
    padding: 0 12px;
    border-radius: 10px;
    border: 1px solid var(--border-default, var(--border-medium, rgba(0, 0, 0, 0.15)));
    background: var(--bg-secondary, var(--main-surface-secondary, #f9f9f9));
    color: var(--text-primary, inherit);
    font: inherit;
    font-size: 0.8125rem;
}

.bloom-csi-url::placeholder {
    color: var(--text-tertiary, #8f8f8f);
}

.bloom-csi-url:focus {
    outline: 2px solid color-mix(in srgb, var(--text-primary, currentColor) 28%, transparent);
    outline-offset: 1px;
}

.bloom-csi-panel .bloom-csi-btn {
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
    flex-shrink: 0;
}

.bloom-csi-panel .bloom-csi-btn:hover:not(:disabled) {
    background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
}

.bloom-csi-hint {
    margin: 0;
    font-size: 0.75rem;
    color: var(--text-secondary, #5d5d5d);
}

.bloom-csi-crop {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.bloom-csi-stage {
    position: relative;
    width: 10rem;
    height: 10rem;
    flex-shrink: 0;
    align-self: center;
    overflow: hidden;
    border-radius: 999px;
    cursor: grab;
    touch-action: none;
    background: var(--bg-secondary, var(--main-surface-secondary, #f9f9f9));
    user-select: none;
}

.bloom-csi-stage:active {
    cursor: grabbing;
}

.bloom-csi-stage::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--text-primary, currentColor) 18%, transparent);
    pointer-events: none;
}

.bloom-csi-stage-img {
    position: absolute;
    max-width: none;
    pointer-events: none;
    user-select: none;
}

.bloom-csi-zoom-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
}

.bloom-csi-zoom {
    flex: 1;
    min-width: 0;
    height: 0.375rem;
    accent-color: var(--text-primary, currentColor);
}

.bloom-csi-zoom-val {
    flex-shrink: 0;
    min-width: 2.75rem;
    text-align: right;
    font-size: 0.75rem;
    font-variant-numeric: tabular-nums;
    color: var(--text-secondary, #5d5d5d);
}
`;var hd=new E("CustomSidebarIdentity"),yd="customSidebarIdentityUi",Sd="customSidebarIdentitySize",ce="bloom-csi-face",W="bloom-csi-name",ys="bloom-csi-host",vs="bloom-csi-slot",Fn="data-bloom-csi",Oe="data-bloom-csi-named",hh="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",yh=1024,Ei=256,Ld=24,Td=64,kd=40,xs=1,ws=4,k=S({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty keeps the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:Dh},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:Ld,max:Td,default:kd},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function Li(e,t){return typeof e=="number"&&Number.isFinite(e)?e:t}function Cd(){return String(k.store.displayName??"").trim()}function Ti(e,t,n,o,r){let i=K(n,xs,ws),a=Math.min(e,t)/i,s=K(o,a/2,Math.max(a/2,e-a/2)),l=K(r,a/2,Math.max(a/2,t-a/2));return{z:i,side:a,x:s,y:l}}async function Md(e){try{return await createImageBitmap(e)}catch{return null}}async function Es(e){try{let t=await fetch(e,e.startsWith("data:")?void 0:{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return t.ok?Md(await t.blob()):null}catch{return null}}function vh(e,t,n){let o=document.createElement("canvas");o.width=t,o.height=n;let r=o.getContext("2d");if(!r)return null;r.imageSmoothingEnabled=!0,r.imageSmoothingQuality="high",r.drawImage(e,0,0,t,n);let i=o.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function Ss(e){let t=Math.min(1,yh/Math.max(e.width,e.height));return vh(e,Math.max(1,Math.round(e.width*t)),Math.max(1,Math.round(e.height*t)))}function xh(e,t,n,o){let{side:r,x:i,y:a}=Ti(e.width,e.height,o,t*e.width,n*e.height),s=document.createElement("canvas");s.width=Ei,s.height=Ei;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(e,i-r/2,a-r/2,r,r,0,0,Ei,Ei);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function wh(e){let t=await Md(e);if(!t)return null;let n=Ss(t);return t.close(),n}async function Ad(e,t,n,o){let r=await Es(e);if(!r)return null;let i=xh(r,t,n,o);return r.close(),i}function Ts(){k.store.cropX=.5,k.store.cropY=.5,k.store.cropZoom=1}function vd(){k.store.avatarUrl="",k.store.avatarSource="",Ts()}var xd=0;async function Ls(e){let t=++xd;Ts(),k.store.avatarSource=e;let n=await Ad(e,.5,.5,1);return t!==xd?!1:(n&&(k.store.avatarUrl=n),!!n)}function Wo(e){if(!e)return null;for(let t of e.files)if(t.type.startsWith("image/"))return t;for(let t of e.items)if(t.kind==="file"&&t.type.startsWith("image/"))return t.getAsFile();return null}async function hs(e){let t=Wo(e);if(!t)return!1;let n=await wh(t);return n?Ls(n):!1}var Yo=new Set,Be=!1,Xo=!1,$n=0,_n=0,ki=0,Zo=0,Si=null,Xe=new Map,qn=null,Ye=null,Ci=null;function ks(){let e=String(k.store.avatarUrl??"").trim();if(!e||Yo.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:t}=new URL(e);if(t==="https:"||t==="http:")return e}catch{return null}return null}function Jo(e){return!!e?.closest(hh)}function wd(e){return e.classList.contains(ce)}function Cs(e){let t=[];for(let n of e.querySelectorAll("img"))n instanceof HTMLImageElement&&(wd(n)||Jo(n)||t.push(n));if(t.length)return t.find(o=>/rounded-full|avatar/i.test(o.className)||!!o.getAttribute("alt"))??t[0];for(let n of e.querySelectorAll('[class*="avatar"], [class*="rounded-full"]'))if(!(wd(n)||Jo(n)||n.closest(`.${ce}`))&&n.tagName!=="IMG"&&!n.querySelector("img"))return n;return null}function Hd(e){let t=e.querySelectorAll(".min-w-0");for(let n of t)if(!Jo(n)&&n.querySelector(".truncate, .text-xs, [class*='text-token-text']"))return n;return null}function Nd(e){let t=e.querySelector(":scope > .truncate, :scope .truncate");if(t&&!t.classList.contains(W))return t;for(let n of e.children)if(n instanceof HTMLElement&&!n.classList.contains(W)&&!n.classList.contains("text-xs")&&!/text-token-text-secondary|text-token-text-tertiary/.test(n.className)&&n.tagName!=="IMG"&&n.textContent?.trim())return n;return null}function xe(e,t){for(let n of e.querySelectorAll(`.${t}`))n.remove()}function Qo(e){for(let t of e.querySelectorAll(`.${ys}`))t.classList.remove(ys);for(let t of e.querySelectorAll(`.${vs}`))t.classList.remove(vs)}function Mi(e){xe(e,ce),xe(e,W),Qo(e),e.removeAttribute(Fn),e.removeAttribute(Oe)}function Eh(e,t,n){if(e===n||e.querySelector(".min-w-0"))return!1;let o=[...e.children].filter(r=>!r.classList.contains(ce)&&!r.classList.contains(W));return o.length===1&&o[0]===t}function Pd(e,t,n){let o=t.parentElement;if(!o)return;let r=Eh(o,t,e)?o:null,i=r??e;r&&r.classList.add(vs),t.classList.add(ys);let a=i.querySelector(`:scope > .${ce}`);if(a||(a=document.createElement("img"),a.className=ce,a.alt="",a.draggable=!1,a.referrerPolicy="no-referrer",a.addEventListener("error",Sh),i.appendChild(a)),a.getAttribute("src")!==n&&(a.src=n),r)a.style.position="",a.style.left="",a.style.top="",a.style.width="",a.style.height="",a.style.inset="";else{let s=(a.offsetParent instanceof HTMLElement?a.offsetParent:e).getBoundingClientRect(),l=t.getBoundingClientRect();a.style.position="absolute",a.style.left=`${l.left-s.left}px`,a.style.top=`${l.top-s.top}px`,a.style.width=`${l.width}px`,a.style.height=`${l.height}px`,a.style.inset="auto"}}function Sh(e){let t=e.currentTarget;if(!(t instanceof HTMLImageElement))return;let n=t.getAttribute("src")??"";n&&Yo.add(n),t.remove(),Hi()}function Lh(e,t){let n=Hd(e);if(!t||!n){xe(e,W),e.removeAttribute(Oe);return}e.setAttribute(Oe,"");let o=n.querySelector(`:scope > .${W}`);if(!o){o=document.createElement("div"),o.className=W;let r=Nd(n);r?.nextSibling?n.insertBefore(o,r.nextSibling):r?n.appendChild(o):n.insertBefore(o,n.firstChild)}o.textContent!==t&&(o.textContent=t);for(let r of n.querySelectorAll(`.${W}`))r!==o&&r.remove()}function Th(e){return!!e.closest("#stage-sidebar-tiny-bar")}function kh(e){if(Jo(e))return;e.setAttribute(Fn,"");let t=ks(),n=Cs(e);t&&n?Pd(e,n,t):(xe(e,ce),Qo(e)),Th(e)?(xe(e,W),e.removeAttribute(Oe)):Lh(e,Cd())}function Rd(){let e=[],t=vt();t&&e.push(t);let n=Zt();if(n&&!e.some(o=>n.contains(o)||o.contains(n))){let o=n.querySelector(qi)??n.querySelector("button, a, [role='button']")??n;o&&!e.includes(o)&&e.push(o)}return e}function Ch(e){let t=Cs(e);if(!t||t.closest("[role='menuitem'], [role='menuitemcheckbox'], [role='menuitemradio']"))return null;let n=t.closest("div"),o=n?.parentElement&&e.contains(n.parentElement)?n.parentElement:n;return!o||o===e?null:{host:t,wrap:o instanceof HTMLElement?o:t.parentElement??e}}function Mh(e){if(!k.store.applyToMenu){Mi(e),xe(e,ce),xe(e,W),Qo(e),e.removeAttribute(Fn),e.removeAttribute(Oe);return}let t=Ch(e);if(!t)return;e.setAttribute(Fn,"");let n=ks();n?Pd(t.wrap,t.host,n):(xe(t.wrap,ce),Qo(t.wrap));let o=Cd();if(!o){xe(t.wrap,W),t.wrap.removeAttribute(Oe),e.removeAttribute(Oe);return}t.wrap.setAttribute(Oe,""),e.setAttribute(Oe,"");let r=Hd(t.wrap)??t.wrap,i=r.querySelector(`:scope > .${W}`);if(!i){i=document.createElement("div"),i.className=W;let a=Nd(r);a?.nextSibling?r.insertBefore(i,a.nextSibling):r.appendChild(i)}i.textContent!==o&&(i.textContent=o)}function Ah(){let e=K(Math.round(Li(k.store.avatarSize,kd)),Ld,Td);w(Sd,`[data-bloom-csi]{--bloom-csi-avatar-size:${e}px}`)}function Hh(){x(Sd)}function Nh(e){if(e){ki=0,Zo=0;return}ki+=1,Zo=Date.now()+Math.min(8e3,250*2**Math.min(ki,5))}function Ph(){let e=Rd(),t=new Set(e);for(let r of e)kh(r);for(let r of document.querySelectorAll(`[${Fn}]`))if(!t.has(r)&&!r.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")){if(r.id==="bloom-rail-item"||Jo(r)){Mi(r);continue}e.some(i=>i.contains(r)||r.contains(i))||Mi(r)}let n=Jt();n&&k.store.applyToMenu&&Mh(n);let o=e.flatMap(r=>[...r.querySelectorAll(`.${ce}`)]);Nh(!ks()||o.some(r=>r.isConnected)||!e.some(r=>Cs(r)))}function Ai(){if(!Be||Xo||Date.now()<Zo)return;Xo=!0;let e=[...Xe.keys()];for(let t of Xe.values())t.disconnect();Ye?.disconnect();try{Ah(),Ph()}finally{Xo=!1;for(let t of e)t.isConnected&&Id(t);qn?.isConnected&&Od(qn)}}function Hi(){!Be||$n||Date.now()<Zo||($n=requestAnimationFrame(()=>{$n=0,Ai(),_n||(_n=requestAnimationFrame(()=>{_n=0,Be&&Ai()}))}))}function Rh(){Xo||!Be||Hi()}function Id(e){if(Xe.has(e))return;let t=new MutationObserver(Rh);t.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset"]}),Xe.set(e,t)}function Ih(e){Xe.get(e)?.disconnect(),Xe.delete(e)}function Ed(){let e=new Set;for(let n of Rd())e.add(n),n.parentElement&&e.add(n.parentElement);let t=Zt();t&&e.add(t);for(let n of[...Xe.keys()])(!e.has(n)||!n.isConnected)&&Ih(n);for(let n of e)n.isConnected&&Id(n)}function Od(e){qn===e&&Ye||(Ye?.disconnect(),qn=e,Ye=new MutationObserver(()=>{if(!e.isConnected){Ye?.disconnect(),Ye=null,qn=null;return}Xo||!Be||Hi()}),Ye.observe(e,{childList:!0,subtree:!0}))}function Bd(e){if(!Be||k.store.applyToMenu===!1)return;let t=Jt();if(t){Od(t),Hi();return}e<=0||requestAnimationFrame(()=>Bd(e-1))}function Oh(e){Be&&k.store.applyToMenu!==!1&&(!hr(e)&&!Jt()||Bd(10))}function Bh(){for(let e of document.querySelectorAll(`[${Fn}], [${Oe}]`))Mi(e);xe(document,ce),xe(document,W),Qo(document)}function Dh(e){e.className="bloom-csi-panel";let t=!1,n=null,o=null,r={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let d=document.createElement("p");d.className="bloom-csi-hint";let f=document.createElement("div");f.className="bloom-csi-crop";let b=document.createElement("div");b.className="bloom-csi-stage";let g=document.createElement("img");g.className="bloom-csi-stage-img",g.alt="",g.draggable=!1,b.appendChild(g);let h=document.createElement("div");h.className="bloom-csi-zoom-row";let m=document.createElement("input");m.type="range",m.className="bloom-csi-zoom",m.min=String(xs),m.max=String(ws),m.step="0.05",m.setAttribute("aria-label","Zoom");let L=document.createElement("span");L.className="bloom-csi-zoom-val";let A=document.createElement("button");A.type="button",A.className="bloom-csi-btn",A.textContent="Reset",h.append(m,L,A);let D=document.createElement("p");D.className="bloom-csi-hint",D.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",f.append(b,h,D),e.append(u,d,f);function De(){let p=String(k.store.avatarSource??""),M=String(k.store.avatarUrl??"");return p.startsWith("data:image/")?p:M.startsWith("data:image/")?M:""}function $e(p,M,R){if(!a)return i.x=p,i.y=M,i.zoom=K(R,xs,ws),i;let H=Ti(a.w,a.h,R,p*a.w,M*a.h);return i.x=H.x/a.w,i.y=H.y/a.h,i.zoom=H.z,i}function C(){let p=De(),M=String(k.store.avatarUrl??"").trim(),R=!!p;if(s.hidden=!M&&!p,(p||M)&&(s.src=p||M),l.value=R?"":M,l.placeholder=R?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",f.hidden=!p,d.hidden=!(t&&/^https?:\/\//.test(M)&&!p),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",!p)return;i.x=Li(k.store.cropX,.5),i.y=Li(k.store.cropY,.5),i.zoom=Li(k.store.cropZoom,1),m.value=String(i.zoom),L.textContent=`${Math.round(i.zoom*100)}%`,g.getAttribute("src")!==p&&(a=null,g.onload=()=>{a={w:g.naturalWidth,h:g.naturalHeight},C()},g.src=p);let H=a?Ti(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;H&&a&&(g.style.width=`${a.w/H.side*100}%`,g.style.height=`${a.h/H.side*100}%`,g.style.left=`${(.5-H.x/H.side)*100}%`,g.style.top=`${(.5-H.y/H.side)*100}%`)}function we(p,M,R,H=!1){let Je=$e(p,M,R);m.value=String(Je.zoom),L.textContent=`${Math.round(Je.zoom*100)}%`;let Ps=De(),Rs=()=>{k.store.cropX=Je.x,k.store.cropY=Je.y,k.store.cropZoom=Je.zoom,Ps&&Ad(Ps,Je.x,Je.y,Je.zoom).then(Is=>{Is&&(k.store.avatarUrl=Is)})};o&&clearTimeout(o),H?Rs():o=setTimeout(Rs,80),C()}function Ze(p){k.store.avatarUrl=p;let M=p.trim();if(n&&clearTimeout(n),!M){k.store.avatarSource="",Ts(),t=!1,C();return}if(M.startsWith("data:image/")){t=!1,n=setTimeout(()=>{Es(M).then(R=>{if(!R)return;let H=Ss(R);R.close(),H&&Ls(H).then(()=>C())})},80);return}if(/^https?:\/\//.test(M)){t=!1,k.store.avatarSource="",n=setTimeout(()=>{Es(M).then(R=>{if(!R){t=!0,C();return}let H=Ss(R);R.close(),H?(t=!1,Ls(H).then(()=>C())):(t=!0,C())})},400);return}t=!1,k.store.avatarSource="",C()}u.addEventListener("paste",p=>{Wo(p.clipboardData)&&(p.preventDefault(),t=!1,hs(p.clipboardData).then(()=>C()))}),u.addEventListener("dragover",p=>{Wo(p.dataTransfer)&&p.preventDefault()}),u.addEventListener("drop",p=>{Wo(p.dataTransfer)&&(p.preventDefault(),t=!1,hs(p.dataTransfer).then(()=>C()))}),l.addEventListener("change",()=>Ze(l.value)),l.addEventListener("paste",p=>{Wo(p.clipboardData)&&(p.preventDefault(),t=!1,hs(p.clipboardData).then(()=>C()))}),l.addEventListener("keydown",p=>{De()&&!l.value&&(p.key==="Backspace"||p.key==="Delete")&&(vd(),t=!1,C())}),c.addEventListener("click",()=>{vd(),t=!1,C()}),b.addEventListener("pointerdown",p=>{p.button===0&&(b.setPointerCapture(p.pointerId),r.on=!0,r.px=p.clientX,r.py=p.clientY,r.x=i.x,r.y=i.y)}),b.addEventListener("pointermove",p=>{if(!r.on||!a)return;let M=b.clientWidth;if(!M)return;let{side:R}=Ti(a.w,a.h,i.zoom,r.x*a.w,r.y*a.h);$e(r.x-(p.clientX-r.px)*(R/M)/a.w,r.y-(p.clientY-r.py)*(R/M)/a.h,i.zoom),C()}),b.addEventListener("pointerup",()=>{r.on&&(r.on=!1,we(i.x,i.y,i.zoom,!0))}),b.addEventListener("pointercancel",()=>{r.on=!1}),b.addEventListener("wheel",p=>{p.preventDefault(),we(i.x,i.y,i.zoom*(p.deltaY<0?1.08:1/1.08))},{passive:!1}),m.addEventListener("input",()=>we(i.x,i.y,Number(m.value))),A.addEventListener("click",()=>we(.5,.5,1,!0));let Ee=()=>C();return Ci=Ee,C(),()=>{Ci===Ee&&(Ci=null),n&&clearTimeout(n),o&&clearTimeout(o),e.replaceChildren()}}var Dd=y({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:yd,cleanupSelectors:[`.${ce}`,`.${W}`],settings:k,start(){Be=!0,Yo.clear(),ki=0,Zo=0,w(yd,bd),Si=new AbortController,document.addEventListener("click",Oh,{signal:Si.signal}),Ed(),Ai(),hd.debug("started")},onSettingsChange(){Yo.clear(),Ci?.(),Be&&(Ed(),Ai())},stop(){Be=!1,Si?.abort(),Si=null,$n&&cancelAnimationFrame($n),$n=0,_n&&cancelAnimationFrame(_n),_n=0;for(let e of Xe.values())e.disconnect();Xe.clear(),Ye?.disconnect(),Ye=null,qn=null,Bh(),Hh(),Yo.clear(),hd.debug("stopped")}});var zn=new E("Bloom"),$d=!1,$h=Date.now(),_h=[Il,Mc,Dc,qc,Kc,Xc,cu,du,pu,Lu,Nu,$u,qu,Vu,id,sd,gd,Dd];function Ni(e){return new Promise(t=>setTimeout(t,e))}function qh(){return document.head?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.head&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}function Fh(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var qd=8e3,_d=300,zh=250;async function jh(){if(yt())return await Ni(_d),!0;for(;Date.now()-$h<qd;)if(await Ni(zh),yt())return await Ni(_d),!0;return yt()||$i()}function Ms(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function Gh(){if(Ms())return!0;let e=Date.now()+qd;for(;Date.now()<e;)if(await Ni(100),Ms())return!0;return Ms()}function Kh(){try{GM_registerMenuCommand?.("Bloom++ settings",Rl)}catch{}}function Uh(){ur(()=>{Gn("HostShell"),zn.info("host shell",J)}),dr(()=>{zn.info("idle ready",J)}),mr(()=>{Ri(),Gn("HostReady"),zn.info("chrome ready",J)})}async function As(){await Gs()}async function Hs(){if($d)return;$d=!0;for(let n of _h)try{Qs(n)}catch(o){zn.error("register failed",n.name,o)}nl(),Gn("Init"),Kh(),Uh();let e=()=>Gn("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await qh(),Ri(),zn.info("styles ready",J),await Fh(),Gh().then(n=>{n&&fr()}),!await jh()){zn.warn("late islands not detected; starting default plugins",J),Wt(),pr();return}await ll()}var Fd=typeof unsafeWindow<"u"?unsafeWindow:window,Vh=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||Vh){let e=Fd.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",J);try{Object.defineProperty(Fd,"Bloom",{value:Ns,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}As().then(()=>Hs()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
