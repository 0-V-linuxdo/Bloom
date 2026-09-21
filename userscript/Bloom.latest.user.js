// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260921] v1.4.65
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

/* Bloom++ [20260921] v1.4.65. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Ud=Object.defineProperty;var Kd=(t,e)=>{for(var n in e)Ud(t,n,{get:e[n],enumerable:!0})};var Rs={};Kd(Rs,{REPO_URL:()=>dl,Settings:()=>L,VERSION:()=>Q,contextKeyFromUrl:()=>zt,conversationTitle:()=>rn,conversationToken:()=>et,currentConversationId:()=>R,hasDraftText:()=>mt,hasErrorToast:()=>ft,hasLateIslands:()=>be,init:()=>Ns,initSettings:()=>Hs,isDocumentInteractive:()=>ml,isStreaming:()=>D,isUserDraftEmpty:()=>re,messageCreateTime:()=>Do,plugins:()=>_t,requestChromeReady:()=>mo,requestIdleReady:()=>Ve,requestShellReady:()=>uo,setEditorText:()=>qt,subscribeHarvest:()=>nt,watchStreamingEdge:()=>W,whenChromeReady:()=>co,whenIdleReady:()=>lo,whenShellReady:()=>so});var Xt=new Map,Zr=!1;function Vd(){return document.getElementById("bloom-root")?.shadowRoot??null}function Ds(){return document.head??null}function Ge(){let t=Vd();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=Wd()}function Ii(t,e){if(!Zr)return;let n=Ds();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),Ge();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,Ge();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,Ge()}function w(t,e){let n=Xt.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},Xt.set(t,n)),Zr&&Ii(t,n)}function Pi(){if(!Ds())return!1;Zr=!0;for(let[e,n]of Xt)Ii(e,n);return Ge(),!0}function $s(t){let e=Xt.get(t);e&&(e.disabled=!1,Zr&&Ii(t,e))}function _s(t){let e=Xt.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),Ge())}function x(t){let e=Xt.get(t);e&&(e.el?.remove(),Xt.delete(t),Ge())}function Wd(){return Array.from(Xt.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var E=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function y(t){return t}var Oi=new Map;function Jr(t,e){let n=Oi.get(t);return n||(n=new Set,Oi.set(t,n)),n.add(e),()=>n.delete(e)}function ge(t,e){let n=Oi.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var Yd="bloompp";function Fs(){return new Promise((t,e)=>{let n=indexedDB.open(Yd,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function qs(t){try{let e=await Fs();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function zs(t,e){try{let n=await Fs();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function Ue(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function G(t,e,n){return Math.min(n,Math.max(e,t))}function js(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function Gs(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function Us(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var Qr=new E("SettingsStore"),Zt="BloomSettings",Xd=100;function to(t){return t!=null&&typeof t.then=="function"}function Zd(t){if(t==null||to(t))return null;if(Ue(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(Ue(e)&&!to(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return Ue(n)&&!to(n)?n:null}return null}catch{return null}}function no(t){let e=Zd(t);if(!e)return null;let n=e.plugins;return!Ue(n)||to(n)||Object.keys(n).length===0?null:e}var eo=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let d=l.slice(c.length+1);if(d&&!d.includes(".")){let f=u(d);f!==void 0&&(i[a]=f,s=f);break}}}return Ue(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){Qr.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Xd))}save(){try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(Zt,this.plain)}catch{try{GM_setValue(Zt,e)}catch(n){Qr.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(Zt,e)}catch{}zs(Zt,e).catch(n=>Qr.warn("Failed to save settings to IndexedDB:",n))}catch(e){Qr.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){js(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var Jd=new E("Settings"),Qd={plugins:{}},L=new eo(structuredClone(Qd)),tm=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function em(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function S(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?(L.store.plugins[n]||(L.store.plugins[n]={}),L.store.plugins[n]):{}},get plain(){let n=e.pluginName;return n?L.plain.plugins[n]??{}:{}}};return e}async function nm(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function Ks(){let t=no(await nm(Zt));if(t||(t=no(await qs(Zt))),!t)try{t=no(localStorage.getItem(Zt))}catch{t=null}if(!t)return;let e=t.plugins;e&&(L.plain.plugins=e,Jd.debug("Loaded settings"))}function Vs(t,e){e&&(e.pluginName=t,L.plain.plugins[t]||(L.plain.plugins[t]={}),L.setDefaultGetter(tm(t),n=>{if(n!=="enabled")return em(e.def,n)}))}function Ws(){return L.plain.plugins.Settings||(L.store.plugins.Settings={}),L.store.plugins.Settings}function ro(){return Ws().pinnedPlugins??[]}function Ys(t){return ro().includes(t)}function Xs(t){let e=ro(),n=e.includes(t);return L.store.plugins.Settings={...L.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function oo(){return Ws().starredPlugins??[]}function Zs(t){return oo().includes(t)}function Js(t){let e=oo(),n=e.includes(t);return L.store.plugins.Settings={...L.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var io=new E("PluginManager"),_t={},zn=new Set;function el(t){if(_t[t.name]){io.warn("Duplicate plugin",t.name);return}_t[t.name]=t,Vs(t.name,t.settings)}function Ke(t){let e=_t[t];if(!e)return!1;if(e.required)return!0;let n=L.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function nl(t){let e=_t[t];if(!e||e.required)return;let n=!Ke(t);L.plain.plugins[t]||(L.store.plugins[t]={}),L.store.plugins[t].enabled=n,n?rl(e):rm(e),ge("pluginToggle",{name:t,enabled:n})}function rl(t,e=!1){if(!zn.has(t.name)&&Ke(t.name))try{t.managedStyle&&$s(t.managedStyle),t.start?.(),zn.add(t.name),t.settings&&L.addPrefixChangeListener(`plugins.${t.name}.`,()=>{zn.has(t.name)&&t.onSettingsChange?.()}),e||io.debug("Started",t.name)}catch(n){io.error("Failed to start",t.name,n)}}function rm(t){if(zn.has(t.name)){try{t.stop?.()}catch(e){io.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(_s(t.managedStyle),x(t.managedStyle)),zn.delete(t.name)}}function jn(t){for(let e of Object.values(_t))(e.startAt??"DOMContentLoaded")===t&&rl(e)}var Qs=2,tl="defaultsRev";function ol(){let t=L.plain.plugins.Settings;if(!(!t||t[tl]===Qs)){for(let e of["NoShareLink","NoDictation"]){let n=L.plain.plugins[e];!n||typeof n.enabled=="boolean"||(n.enabled=!1)}t[tl]=Qs}}var Gn=!1,ao=!1,Bi=!1,al=[],sl=[],ll=[];function Di(t){let e=t.splice(0);for(let n of e)n()}function Un(){Gn||(Gn=!0,Di(al))}function $i(){ao||(ao=!0,Gn||Un(),Di(sl))}function cl(){Bi||(Bi=!0,Gn||Un(),ao||$i(),Di(ll))}function so(t){Gn?t():al.push(t)}function lo(t){ao?t():sl.push(t)}function co(t){Bi?t():ll.push(t)}function uo(){Un()}function Ve(){Un(),$i()}function mo(){cl()}function il(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function ul(){await il(4e3),Un(),await il(4e3),$i(),cl()}var v={p:"0-V-linuxdo"},Q="[20260921] v1.4.65",dl="https://github.com/0-V-linuxdo/Bloom";function om(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function im(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function _i(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function be(){return _i()?om()||im():!1}function ml(){return be()}var am=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),fl=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),sm=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),lm="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function Ye(t){return t.id==="bloom-root"||!!t.closest(lm)}function pl(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function fo(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function Fi(t){if(!(t instanceof HTMLElement)||!t.isConnected||Ye(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&fo(e)?!1:t.getClientRects().length>0}function We(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function cm(){let t=[];for(let e of document.querySelectorAll(am))!(e instanceof HTMLElement)||!e.isConnected||Ye(e)||t.push(e);return t}function po(t){if(!t.isConnected||Ye(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function he(){return cm().filter(po)[0]??null}function Xe(){let t=document.getElementById("stage-sidebar-tiny-bar");if(!(t instanceof HTMLElement)||!t.isConnected||Ye(t))return null;let e=t.getBoundingClientRect();return e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3?null:t}function qi(t){let e=t,n=t.parentElement;n&&n.children.length===1&&!Ye(n)&&!We(n)&&n.parentElement&&!We(n.parentElement)&&(e=n);let r=e.parentElement;if(r&&!We(r)&&!Ye(r)&&r.children.length>1){let o=r.getAttribute("class")||"";if(/\bflex\b/.test(o)&&!/flex-col/.test(o)&&r.parentElement&&!We(r.parentElement))return r}return e}function Ze(){let t=document.querySelectorAll(fl);for(let n of t)if(Fi(n)&&!fo(n)&&pl(n))return n;let e=document.querySelectorAll(sm);for(let n of e){if(!Fi(n)||!pl(n)||fo(n))continue;let r=n.querySelector(fl);return Fi(r)&&!fo(r)?r:n}return null}function go(){let t=he();if(t){let e=qi(t),n=e.parentElement;if(n&&!We(n))return n;if(!We(e))return e}return Xe()}function bo(t){let e=he();return e?t.composedPath().includes(e):!1}var ji=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],um={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function dm(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function mm(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function zi(t){let e=dm(t);return e?mm(e)>.55?"light":"dark":null}function fm(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=zi(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=zi(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=zi(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function gl(t){return t==="auto"?fm():t}function pm(t){try{let e=getComputedStyle(document.documentElement);for(let n of ji){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function bl(t,e,n){let r=um[e];if(n){pm(t);for(let o of ji)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of ji)t.style.setProperty(o,r[o])}function hl(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var Gi=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var bm="bloom-root",Et="bloom-rail-item",wo="bloom-account-item",ve="bloom-sidebar-panel",tr="bloom-plugin-dialog",Mo="bloom-plugin-layer",Eo="bloom-settings-css",hm=2e3,xl=null,ym=null,ee=!1,Wi=[],ho=null,So=null,Qt=null,vo=null,Ft=null,Zn=null,Kn,Je=0,Jn=0,Vn=0,Wn=null,Yn=null,Lo=null,wl=null,Xn=null,Ui=[],To=!1,vm=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],xm=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],Ao="",Qn="all",ne="all";function Ho(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function El(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function wm(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function Em(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function Sm(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var Lm={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function Tm(t){return t.icon||Lm[t.name]||Ho()}function Ki(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),bl(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function Sl(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function ko(){let t="auto",e=gl(t);Ki(xl,e,!0);let n=document.getElementById(ve);n instanceof HTMLElement&&Ki(n,e,!0);let r=document.getElementById(tr);r instanceof HTMLElement&&Ki(r,e,!0);let o=document.getElementById(Et);o instanceof HTMLElement&&Sl(o),ge("schemeChange",{scheme:e,pref:t})}function Ll(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function Tl(){if(w("settings",Gi),document.getElementById(Eo)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=Eo,t.textContent=Gi,document.head.appendChild(t)}function km(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Cm(){for(let t of Wi)t();Wi=[]}function kl(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function Mm(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function Zi(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function Am(t){return Zi(t).length>0}function xo(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function Hm(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=Mm(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function Nm(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(Hm(e,n));let i=L.store.plugins[t]??(L.store.plugins[t]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",Wi.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??xo(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??xo(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=kl(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??xo(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function yl(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function Rm(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=L.store.plugins[t.name]??(L.store.plugins[t.name]={});for(let[n,r]of Zi(t)){if(n==="enabled"||r.type===5)continue;let o=xo(r);o!==void 0&&(e[n]=o)}Ml(t)}function Cl(t){t.key==="Escape"&&(!document.getElementById(Mo)&&!document.getElementById(tr)||(t.stopPropagation(),Qe()))}function Im(){To||(document.addEventListener("keydown",Cl),To=!0)}function Pm(){To&&(document.removeEventListener("keydown",Cl),To=!1)}function Qe(){Cm(),Pm(),document.getElementById(Mo)?.remove(),document.getElementById(tr)?.remove()}function Ml(t){if(Qe(),!document.body)return;let e=document.createElement("div");e.id=Mo,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",te),e.addEventListener("pointerup",te),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&Qe()});let n=document.createElement("div");n.id=tr,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",te),n.addEventListener("pointerup",te),n.addEventListener("click",te);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=El(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),Qe()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=yl("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=yl("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=Zi(t);if(c.length)for(let[u,d]of c){let f=Nm(t.name,u,d);f&&l.appendChild(f)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>Rm(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),Im(),ko()}function Om(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Tm(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=Zs(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=Em(l),c.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation();let m=Js(t.name);ge("pluginStar",{name:t.name,starred:m})}),s.appendChild(c),!t.required){let h=Ys(t.name),m=document.createElement("button");m.type="button",m.className=`bloom-icon-btn bloom-card-pin${h?" bloom-card-pin-active":""}`,m.setAttribute("aria-label",h?"Unpin from top":"Pin to top"),m.innerHTML=Sm(h),m.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();let A=Xs(t.name);ge("pluginPin",{name:t.name,pinned:A})}),s.appendChild(m)}if(Am(t)){let h=document.createElement("button");h.type="button",h.className="bloom-icon-btn bloom-card-settings",h.setAttribute("aria-label",`${t.name} settings`),h.innerHTML=wm(),h.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation(),Ml(t)}),s.appendChild(h)}let u=kl(t.name,Ke(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",h=>h.stopPropagation()),d?.addEventListener("change",()=>{nl(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let h=document.createElement("div");h.className="bloom-card-desc",h.textContent=t.description,n.appendChild(h)}let f=document.createElement("div");f.className="bloom-card-separator";let b=document.createElement("div");b.className="bloom-card-footer";let g=document.createElement("div");return g.className="bloom-card-author",g.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",b.appendChild(g),e.append(n,f,b),e}function Al(){return Object.values(_t).filter(t=>!t.hidden&&t.name!=="Settings")}function Hl(t,e){return e==="all"||e==="favorites"?!0:(t.tags??[]).includes(e)}function Bm(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function Dm(){return Ao.trim()?"No plugins match your search.":ne==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function $m(){let t=Al();return xm.filter(e=>e.id==="favorites"||e.id==="all"?!0:t.some(n=>Hl(n,e.id)))}function _m(){if(Xn){Xn.replaceChildren();for(let t of $m()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${ne===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{ne=t.id,ye()}),Xn.appendChild(e)}}}function Fm(){let t=Al();if(ne==="favorites"){let e=new Set(oo());t=t.filter(n=>e.has(n.name))}else ne!=="all"&&(t=t.filter(e=>Hl(e,ne)));return Qn==="enabled"&&(t=t.filter(e=>Ke(e.name))),Qn==="disabled"&&(t=t.filter(e=>!Ke(e.name))),t}function ye(){if(!Wn)return;_m();let t=Fm();Lo&&(Lo.placeholder=`Search ${t.length} plugins...`);let e=t,n=Ao.trim().toLowerCase();if(n&&(e=e.filter(r=>Bm(r).includes(n))),ne!=="favorites"){let r=ro();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}Wn.replaceChildren();for(let r of e)Wn.appendChild(Om(r));Yn&&(Yn.hidden=e.length>0,Yn.textContent=Dm())}function te(t){t.stopPropagation()}function Vi(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function Ji(){document.getElementById(Et)?.setAttribute("aria-expanded",ee?"true":"false")}function qm(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function Qi(){Qe(),Ao="",Qn="all",ne="all",document.getElementById(ve)?.remove(),ee=!1,Ji()}function zm(t){let e=document.createElement("div");e.id=t,e.addEventListener("pointerdown",te),e.addEventListener("pointerup",te),e.addEventListener("click",te);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-titles";let i=document.createElement("div");i.className="bloom-settings-brand";let a=document.createElement("span");a.className="bloom-settings-mark",a.innerHTML=Ho();let s=document.createElement("h2");s.textContent="Bloom++",i.append(a,s);let l=document.createElement("p");l.className="bloom-settings-sub",l.textContent="Toggle features. Some need a reload. Click the sliders icon to configure.",o.append(i,l);let c=document.createElement("button");c.type="button",c.className="bloom-icon-btn",c.setAttribute("aria-label","Close"),c.innerHTML=El(),c.addEventListener("click",Qi),r.append(o,c),n.appendChild(r);let u=document.createElement("div");u.className="bloom-plugin-tabs",n.appendChild(u);let d=document.createElement("div");d.className="bloom-search-bar";let f=document.createElement("input");f.type="search",f.className="bloom-search-input",f.setAttribute("aria-label","Search plugins"),f.placeholder="Search plugins...",f.addEventListener("input",()=>{Ao=f.value,ye()});let b=document.createElement("select");b.className="bloom-search-filter",b.setAttribute("aria-label","Filter plugins");for(let m of vm){let T=document.createElement("option");T.value=m.value,T.textContent=m.label,b.appendChild(T)}b.value=Qn,b.addEventListener("change",()=>{Qn=b.value,ye()}),d.append(f,b),n.appendChild(d);let g=document.createElement("div");g.className="bloom-plugin-list",n.appendChild(g);let h=document.createElement("p");return h.className="bloom-tab-empty",h.hidden=!0,n.appendChild(h),e.appendChild(n),Wn=g,Yn=h,Lo=f,wl=b,Xn=u,ye(),e}function jm(t){t.classList.add("bloom-rail-dock")}function Gm(){let t=document.getElementById(Et);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&po(t)?t:null}function Um(){if(document.getElementById(ve)?.remove(),!document.body)return;let t=zm(ve);jm(t),document.body.appendChild(t),ee=!0,Qe(),ko(),Ji(),ge("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:Q,dock:"center",rail:!!Gm()})}function ta(){let t=document.getElementById(ve);if(t instanceof HTMLElement&&t.isConnected&&qm(t)){Qi();return}t?.remove(),Um()}function Km(){let t=document.createElement("button");return t.type="button",t.id=Et,t.className="bloom-rail-item",t.setAttribute("aria-controls",ve),t.setAttribute("aria-expanded",ee?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${Ho()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),ta()}),t}function vl(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function Vm(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function Wm(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function Jt(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function Nl(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=Vm(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&Jt(t,"padding-top",Math.round(i)),Number.isFinite(a)&&Jt(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));Jt(n,"width",l),Jt(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&Jt(t,"padding-left",u);let d=Wm(e,r);if(d){let f=d.getBoundingClientRect(),b=n.getBoundingClientRect(),g=Math.round(f.left-b.right);g>=0&&g<=24&&Jt(t,"gap",g)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&Jt(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&Jt(t,"gap",Math.round(l))}Sl(t)}function Yi(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function Ym(){if(Zn?.isConnected&&Ft){Ft.observe(Zn,{childList:!0});return}Xi()}function Xm(t){if(Yi(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function Zm(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){Vn=0;return}Vn+=1,Jn=Date.now()+Math.min(8e3,250*2**Math.min(Vn,5))})}function Jm(){Je||Date.now()<Jn||(Je=requestAnimationFrame(()=>{Je=0,!(Date.now()<Jn)&&(document.getElementById(Et)?.isConnected||Co())}))}function Co(){if(!document.body)return;Ft?.disconnect();let t=null,e=!1;try{let n=document.getElementById(Et);t=n instanceof HTMLButtonElement?n:Km();let r=he(),o=Xe();if(r){let i=qi(r),a=i.parentElement;if(Yi(i)||a&&Yi(a))return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),vl(t),Nl(t,r)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),vl(t,!0)):t.isConnected&&!po(t)&&(t.remove(),t=null)}finally{Zm(t,e),Ym(),Ji()}}function Xi(){let t=go();!t||!Xm(t)||Zn===t&&Ft||(Ft?.disconnect(),Zn=t,Ft=new MutationObserver(()=>{document.getElementById(Et)?.isConnected||Jm()}),Ft.observe(t,{childList:!0}))}function Qm(){Co(),Xi(),Kn===void 0&&(Kn=window.setInterval(()=>{let t=document.getElementById(Et);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=Jn&&Co();else{Vn=0;let e=he();e&&Nl(t,e)}Xi()},hm))}function tf(){Kn!==void 0&&(clearInterval(Kn),Kn=void 0),Je&&cancelAnimationFrame(Je),Je=0,Jn=0,Vn=0,Ft?.disconnect(),Ft=null,Zn=null}function ef(t){vo===t&&Qt||(Qt?.disconnect(),vo=t,Qt=new MutationObserver(()=>{if(!t.isConnected){Qt?.disconnect(),Qt=null,vo=null;return}Rl(t)}),Qt.observe(t,{childList:!0}))}function Rl(t){if(ef(t),t.querySelector(`#${wo}`))return;let e=document.createElement("button");e.type="button",e.id=wo,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${Ho()}<span>Bloom++</span>`,e.addEventListener("pointerdown",Vi),e.addEventListener("pointerup",Vi),e.addEventListener("click",n=>{Vi(n),ta()}),t.insertBefore(e,t.firstChild)}function yo(){let t=Ze();return t?(Rl(t),!0):!1}function nf(t){bo(t)&&(queueMicrotask(yo),requestAnimationFrame(()=>{yo()}),window.setTimeout(yo,60),window.setTimeout(yo,180))}function rf(){So?.abort();let t=new AbortController;So=t,document.addEventListener("click",nf,{signal:t.signal})}function of(){So?.abort(),So=null,Qt?.disconnect(),Qt=null,vo=null}function Il(){Ve(),km(()=>{Tl(),Ll(),Co(),ta()})}var Pl=y({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[v.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${bm}`,`#${Et}`,`#${wo}`,`#${ve}`,`#${Mo}`,`#${tr}`,`#${Eo}`,"#bloom-menu-panel"],start(){Tl(),Ll(),Qm(),rf(),ho?.(),ho=hl(ko),ko(),Ui=[Jr("pluginToggle",()=>{ee&&ye()}),Jr("pluginPin",()=>{ee&&ye()}),Jr("pluginStar",()=>{ee&&ye()})]},stop(){tf(),of(),ho?.(),ho=null;for(let t of Ui)t();Ui=[],Qi(),document.getElementById(Et)?.remove(),document.getElementById(wo)?.remove(),document.getElementById(Eo)?.remove(),xl=null,ym=null,Wn=null,Yn=null,Lo=null,wl=null,Xn=null,ee=!1}});var No='form[data-type="unified-composer"], form.w-full[data-type]',St=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),tn=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Ol=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Bl=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),af=/stop streaming|stop generating|停止生成|停止输出|停止响应/,sf='[contenteditable="false"], button, [role="button"]';function ut(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function xe(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!ut(o)))return o;return null}function Dl(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function I(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=Dl(t);return!!(af.test(n)||/^stop$/i.test(n))}function dt(){let e=Array.from(document.querySelectorAll(No)).find(ut);if(e instanceof HTMLElement)return e;let n=xe(document,St),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function U(){let t=Array.from(document.querySelectorAll(St));return t.find(ut)??t[0]??null}function lf(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(sf);return!!n&&n!==e&&e.contains(n)}function ea(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&lf(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function mt(t){let e=t??U();return e?ea(e,e).replaceAll("\u200B","").trim().length>0:!1}function re(t){return!mt(t)}function Ro(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function $l(t){let e=dt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!ut(n))&&t(n))return n;return null}function oe(){let t=dt(),e=xe(t,tn)??xe(document,tn);return e&&!I(e)?e:$l(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!I(n);let o=Dl(n);return/^(send|send prompt|发送)$/i.test(o)&&!I(n)})}function we(){let t=dt(),e=xe(t,Ol,!0)??xe(document,Ol,!0);if(e)return e;let n=xe(t,Bl)??xe(document,Bl);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&ut(r)&&I(r))return r}return $l(I)}function tt(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>ea(n,t)).join(`
`):ea(t,t)}function na(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function qt(t,e,n=!1){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),na(t,n)}var _l=/\/c\/([a-zA-Z0-9_-]{8,})/i;function et(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function zt(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function en(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(_l)?.[1]??""}catch{return t.match(_l)?.[1]??""}}function R(){let t=en(location.pathname);if(t)return t;let n=et().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return""}var jl=new E("Harvest"),cf=1500,uf=200,Io=new Set,Po=new Map,Oo=new Map,nn=null,Bo=null,er=null,Lt=0;function df(){return typeof unsafeWindow<"u"?unsafeWindow:window}function mf(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function ff(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}function Gl(t){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(t)}var pf=/"action"\s*:\s*"(next|continue|variant)"/i;function gf(t,e,n){return!(e!=="POST"||Gl(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!pf.test(n))}function bf(t,e){return e!=="GET"||Gl(t)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(t)}function Fl(t){return t.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function Ul(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function hf(t){return typeof t=="string"?Ul(t):""}function ra(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return ra(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function Kl(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function ql(t,e,n){!t||!e||Oo.get(t)!==e&&(Oo.set(t,e),Kl(Oo,cf),ie({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function yf(t,e){let n=e.trim();!t||!n||Po.get(t)!==n&&(Po.set(t,n),Kl(Po,uf),ie({type:"conversation-meta",conversationId:t,title:n}))}function nr(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)nr(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&yf(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=ra(l.create_time??l.createTime??l.created_at);c&&u&&ql(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=ra(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&ql(a,s,o),r.mapping&&typeof r.mapping=="object")nr(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&nr(l,o,n+1)}function zl(t,e){if(t)try{nr(JSON.parse(t),e)}catch{}}function ie(t){for(let e of Array.from(Io))try{e(t)}catch{}}async function vf(t,e,n){if(n===Lt)try{let r=await t.json();if(n!==Lt)return;nr(r,e)}catch{}}async function xf(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===Lt&&ie({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===Lt;){let{done:u,value:d}=await s.read();if(u)break;if(c+=l.decode(d,{stream:!0}),!o){let b=Ul(c);b&&(o=b,ie({type:"post-start",conversationId:o,url:""}))}let f=c.split(`
`);c=f.pop()??"";for(let b of f){let g=b.replace(/^data:\s*/,"").trim();!g||g==="[DONE]"||zl(g,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===Lt&&zl(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===Lt&&ie({type:"post-end",conversationId:o,error:i})}function wf(t,e,n){let r=mf(e),o=ff(e,n),i=bf(r,o),a=gf(r,o,n?.body),s=Lt,l="";return a&&(l=hf(n?.body)||Fl(r)||en(r)||R(),ie({type:"post-start",conversationId:l,url:r})),t(e,n).then(c=>{if(s!==Lt||!i&&!a)return c;try{let u=c.clone();i?vf(u,Fl(r)||R(),s):xf(u,l,!c.ok,s)}catch{a&&ie({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===Lt&&ie({type:"post-end",conversationId:l,error:!0}),c})}function Ef(){if(nn)return;let t=df();er=t,nn=t.fetch.bind(t);let e=(n,r)=>wf(nn,n,r);Bo=e,t.fetch=e,jl.debug("conversation fetch harvest hooked")}function Sf(){Lt+=1,!(!nn||!er)&&(Bo&&er.fetch===Bo&&(er.fetch=nn),nn=null,Bo=null,er=null,jl.debug("conversation fetch harvest unhooked"))}function nt(t){return Io.add(t),Ef(),()=>{Io.delete(t),Io.size===0&&Sf()}}function rn(t){return t?Po.get(t)??"":""}function Do(t){return t?Oo.get(t)??null:null}var Yl=new E("Streaming");function cr(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!ut(e))&&(I(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function Lf(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&ut(t))}function Tf(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&ut(t))}function kf(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function ft(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function D(){if(we()||cr()||kf())return!0;let t=oe();return t&&ut(t)&&!I(t)?!1:!!(Lf()||Tf())}var Cf=400,Vl=3,Le=new Set,or,ir=null,oa=null,Se=!1,Ee=0,ae="",Tt="",ar=!1,sr=!1,lr=!1;function Xl(){return zt(et())}function Wl(t,e){return{streaming:t,contextKey:e,conversationId:R()}}function X(t,e){if(!t||t===e)return!1;if(t.endsWith("|draft")&&!e.endsWith("|draft"))return!0;try{let n=t.split("|")[0],r=e.split("|")[0],o=new URL(n).pathname.replace(/\/$/,"")||"/",i=new URL(r).pathname.replace(/\/$/,"")||"/";if((o==="/"||o==="")&&i.startsWith("/c/"))return!0}catch{}return!1}function ia(){Se=!1,Ee=0,ae="",ar=!1,sr=!1,lr=!1}function Mf(t){for(let e of Array.from(Le))try{e.onFall?.(t)}catch{}}function Af(t){for(let e of Array.from(Le))try{e.onRise?.(t)}catch{}}function rr(t){for(let e of Array.from(Le))try{e.onTick?.(t)}catch{}}function Hf(t,e){for(let n of Array.from(Le))try{n.onContext?.(t,e)}catch{}}function Nf(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&I(n)&&(ar=!0)}function Rf(t){t.type==="post-end"&&Se&&(lr=!0,t.error&&(sr=!0))}function If(){let t=Xl(),e=D();if(Tt&&t&&Tt!==t){if(Hf(t,Tt),!X(Tt,t)){ia(),Tt=t,rr(Wl(e,t));return}ae===Tt&&(ae=t)}Tt=t;let n=Wl(e,t);if(e){let i=!Se;i&&(ar=!1,sr=!1,lr=!1),Se=!0,Ee=0,ae=t,i&&Af(n),rr(n);return}if(!Se){rr(n);return}if(Ee+=1,lr&&(Ee=Math.max(Ee,Vl)),Ee<Vl){rr(n);return}let r=!!ae&&ae===t,o={contextKey:ae||t,conversationId:R(),userStopped:ar,error:sr||ft()};ia(),r&&Mf(o),rr(n)}function Pf(){or===void 0&&(Se=D(),Tt=Xl(),ae=Se?Tt:"",Ee=0,ar=!1,sr=!1,lr=!1,ir?.abort(),ir=new AbortController,document.addEventListener("click",Nf,{capture:!0,signal:ir.signal}),oa=nt(Rf),or=setInterval(If,Cf),Yl.debug("watchStreamingEdge started"))}function Of(){Le.size||(or!==void 0&&(clearInterval(or),or=void 0),ir?.abort(),ir=null,oa?.(),oa=null,ia(),Tt="",Yl.debug("watchStreamingEdge stopped"))}function W(t){let e=typeof t=="function"?{onFall:t}:t;return Le.add(e),Pf(),()=>{Le.delete(e),Of()}}var Zl="bloom-host-icon",ur="data-bloom-host-rel",aa="not all",sa=0,Jl=0,Bf=400;function Ql(t){sa+=1;try{t()}finally{sa-=1}}function $o(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function se(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function tc(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function Df(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function $f(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-Jl<Bf||(Jl=n,t.appendChild(e))}function _f(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||$o(n)&&(n.getAttribute(ur)||n.setAttribute(ur,n.rel),n.media!==aa&&(n.media=aa),n.rel!==Zl&&(n.rel=Zl))}function Ff(t){for(let e of t.querySelectorAll(`link[${ur}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(ur);n&&(e.rel=n),e.removeAttribute(ur),e.media===aa&&e.removeAttribute("media")}}function ec(t,e){let{head:n}=document;!n||!e||Ql(()=>{_f(n,t);let r=tc(t),{type:o,sizes:i}=Df(e);r?$f(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function nc(t,e){let{head:n}=document;n&&Ql(()=>{tc(t)?.remove(),Ff(n)})}function rc(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(sa)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:$o(c.target)&&(a=!0,se(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)$o(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)$o(u)&&u.id!==t&&(a=!0,se(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var qf=["original","badge","dot","hole","bg"],ac=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],sc={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},_o="#FCFCFC",zf="#111111",oc="#111111",jf="#ffffff",Gf="#212121",Uf="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Kf={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Fo=32,ic=64;function lc(t){return typeof t=="string"&&qf.includes(t)}function Vf(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function qo(t){let e=document.createElement("canvas");e.width=Fo,e.height=Fo;let n=e.getContext("2d");return n?(n.scale(Fo/ic,Fo/ic),t(n),e.toDataURL("image/png")):""}function Wf(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function zo(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(Uf);n&&(t.strokeStyle=zf,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function Yf(t,e,n){let r=sc[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=oc,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=oc,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=jf,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function dr(t,e){if(t==="original")return e==="wait"?qo(r=>zo(r,_o)):Vf(Kf[e]);let n=e==="wait"?void 0:sc[e];return qo(t==="hole"?r=>zo(r,n??_o):t==="bg"?r=>{r.fillStyle=n??Gf,Wf(r,0,0,64,64,14),r.fill(),zo(r,_o,!1)}:r=>{zo(r,_o),e!=="wait"&&Yf(r,e,t==="dot"?"dot":"badge")})}function cc(t){return{wait:dr(t,"wait"),rotate:dr(t,"rotate"),done:dr(t,"done"),ready:dr(t,"ready"),error:dr(t,"error")}}var Xf=new E("ChatStateFavicons"),Ce="bloom-chat-state-favicon",gc=["input","beforeinput","cut","paste","compositionend"],bc=S({style:{type:3,description:"Favicon overlay",options:ac}}),Ct="",ca={wait:"",rotate:"",done:"",ready:"",error:""},mr="wait",Te=!1,kt=!1,K=null,rt="",ot="",Me=!0,on=null,it=0,jo=null,Go=null,ke=null,la=null,an=null,gt=!1,uc=new WeakSet;function Zf(){let t=bc.store.style;return lc(t)?t:"bg"}function hc(){let e=document.querySelector(`link[rel~="icon"]:not(#${Ce}), link[data-bloom-host-rel]:not(#${Ce})`)?.href;return se(e)?e:se(Ct)?Ct:""}function Jf(){let t=document.getElementById(Ce);return t instanceof HTMLLinkElement?t:null}function Qf(){if(!se(Ct)){let t=hc();t&&(Ct=t)}return se(Ct)?Ct:ca.wait}function yc(t){return t==="wait"?Qf():ca[t]}function vc(){ec(Ce,yc(mr))}function pt(t){let e=yc(t);if(mr===t){let n=Jf();if(n&&n.getAttribute("href")===e)return}mr=t,vc()}function dc(){ca=cc(Zf()),pt(mr)}function xc(){return zt(et())}function ua(t,e){!t||!e||t===e||(K===t&&(K=e),rt===t&&(rt=e),ot===t&&(ot=e))}function tp(){let t=xc();return D()||Te||kt?(rt&&t&&rt!==t&&X(rt,t)?(ua(rt,t),rt=t):!rt&&t&&(rt=t),rt||t):(rt="",t)}function mc(t){return!K||!t||K===t?!0:X(K,t)}function wc(){Te=!1,kt=!1,K=null,rt=""}function Ec(t){ot=t,wc(),Me=!1,pt("wait")}function fc(t){return!t&&Me}function ep(){if(!gt)return;let t=xc();if(ot&&t&&ot!==t&&!X(ot,t)){Ec(t);return}ot&&t&&X(ot,t)&&ua(ot,t),t&&(ot=t);let e=tp(),n=D(),r=re();if(ft()&&!n){pt("error"),Te=!1,kt=!1,K=null;return}if(n){Te||(Me=!1),Te=!0,kt=!1,K=e,pt("rotate");return}if(Te){let o=mc(e);if(Te=!1,o){kt=!0,K=e,pt("done");return}kt=!1,K=null}if(kt)if(K&&e&&!mc(e))kt=!1,K=null;else if(r){K=e||K,pt("done");return}else if(fc(r)){kt=!1,pt("ready");return}else{kt=!1,pt("wait");return}K=null,r?pt("wait"):fc(r)?pt("ready"):pt("wait")}function le(){gt&&(Cc(),Lc(),Tc(),ep())}function Sc(){if(an){for(let t of gc)an.removeEventListener(t,kc,!0);an=null}}function Lc(){let t=dt(),e=t&&t!==document.body?t:null;if(!(an===e&&e?.isConnected)&&(Sc(),!!e)){an=e;for(let n of gc)an.addEventListener(n,kc,{capture:!0,passive:!0})}}function Tc(){let t=dt();if(!(ke&&la===t&&t.isConnected)){if(ke?.disconnect(),la=t,!t||t===document.body){ke=null;return}ke=new MutationObserver(()=>Uo()),ke.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function Uo(){if(gt){if(document.hidden){it&&(cancelAnimationFrame(it),it=0),le();return}it||(it=requestAnimationFrame(()=>{it=0,gt&&le()}))}}function kc(){mt()&&(Me=!0),Uo()}function pc(){mt()&&(Me=!0),Uo()}function np(){gt&&(it&&(cancelAnimationFrame(it),it=0),le())}function rp(){gt&&(Me=!1,le())}function op(){gt&&le()}function ip(){gt&&le()}function ap(t,e){if(gt){if(X(e,t)){ua(e,t),ot=t,le();return}Ec(t)}}function Cc(){let t=U();!t||uc.has(t)||(uc.add(t),t.addEventListener("input",pc,{capture:!0,passive:!0}),t.addEventListener("compositionend",pc,{capture:!0,passive:!0}))}var Mc=y({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:bc,startAt:"DOMContentLoaded",cleanupSelectors:[`#${Ce}`],start(){gt=!0,Ct=hc()||Ct,dc(),Go?.disconnect(),Go=rc(Ce,t=>{se(t)&&(Ct=t),vc()}),on?.abort(),on=new AbortController,window.addEventListener("popstate",Uo,{signal:on.signal}),document.addEventListener("visibilitychange",np,{signal:on.signal}),Cc(),Lc(),Tc(),jo?.(),jo=W({onRise:rp,onFall:op,onTick:ip,onContext:ap}),le(),Xf.debug("favicon watch started")},stop(){gt=!1,it&&cancelAnimationFrame(it),it=0,jo?.(),jo=null,on?.abort(),on=null,Sc(),ke?.disconnect(),ke=null,la=null,Go?.disconnect(),Go=null,wc(),ot="",Me=!0,mr="wait",nc(Ce,Ct)},onSettingsChange:dc});var Ac=`.bloom-ih-hud {
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
`;var By=new E("InputHistory"),da=/\u200B/g,Hc=10,Nc=500,Rc=100,lp=8,cp=120,up=2e3,Ko=10,Vo=S({maxEntries:{type:4,description:"Max stored prompts",min:Hc,max:Nc,default:Rc},history:{type:5,description:"Stored prompts",render:Tp},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),ma=new Map,$=0,fa="",Mt=!1,pr=!1,ba=0,fr=null,pa,ha=null,Ic=!0;function bt(){let t=Vo.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Pc(t){let e=G(Number(Vo.store.maxEntries??Rc),Hc,Nc);return t.length>e?t.slice(t.length-e):t}function Wo(t){Vo.store.entries=Pc(t)}function dp(t){return t.replaceAll(da,"").replace(/\n$/,"").trim()}function ga(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(St);return n instanceof HTMLElement?n:U()}function mp(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!tt(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(da,"").trim().length===0,last:i.toString().replaceAll(da,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Oc(t){clearTimeout(pa),pa=setTimeout(()=>{if(t!==ba)return;pr=!1;let e=ha;e&&na(e,Ic)},cp)}function Bc(t,e,n){pr=!0,ha=t,Ic=n;let r=++ba;qt(t,e,n),Oc(r)}function fp(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function sn(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function pp(){document.querySelector(".bloom-ih-hud")?.remove()}function gp(t,e){let n=fp();n.textContent=t;let r=(e.closest("form")??dt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-lp)}px`,n.classList.add("bloom-ih-hud-on")}function ya(t){let e=dp(t);if(!e)return;let n=Date.now(),r=ma.get(e);if(r&&n-r<up)return;ma.set(e,n);let o=bt().filter(i=>i!==e);o.push(e),Wo(o),$=bt().length,Mt=!1,sn()}function bp(t,e){let n=bt();if(!n.length&&t)return;$>=n.length&&(fa=tt(e),$=n.length);let r=t?$-1:$+1;r<0||r>n.length||($=r,Mt=!0,Bc(e,r===n.length?fa:n[r],t),r<n.length?gp(`${r+1} / ${n.length}`,e):sn())}function hp(t){Mt=!1,sn(),Bc(t,fa,!1),$=bt().length}function yp(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=ga(t.target)??ga(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&Mt&&!t.altKey&&!t.shiftKey){hp(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){ya(tt(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=bt();if(!r){let i=mp(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||$<=0)||!n&&$>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),bp(n,e))}function vp(t){if(ga(t.target)){if(pr){Oc(ba);return}Mt&&(Mt=!1,sn(),$=bt().length)}}function xp(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(St);n instanceof HTMLElement&&ya(tt(n))}function wp(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(tn);if(!n||!(n instanceof HTMLElement)||I(n))return;let r=U();r&&ya(tt(r))}function Ep(t){if(!(!Mt||pr)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}Mt=!1,sn()}}function Sp(){if(fr)return;fr=new AbortController;let{signal:t}=fr,e={capture:!0,signal:t};window.addEventListener("keydown",yp,e),window.addEventListener("input",vp,e),window.addEventListener("submit",xp,e),window.addEventListener("click",wp,e),window.addEventListener("pointerdown",Ep,e)}function Lp(t){let e=bt().slice();e.splice(t,1),Wo(e),$>e.length&&($=e.length)}function Tp(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=bt().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(m=>m.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/Ko));n>=l&&(n=l-1);let c=s.slice(n*Ko,n*Ko+Ko);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let m=document.createElement("div");m.className="bloom-ih-list",c.forEach((T,A)=>{let B=i.indexOf(T),Dt=bt().length-1-B,wt=document.createElement("div");wt.className="bloom-ih-item";let Y=document.createElement("button");Y.type="button",Y.className=`bloom-ih-body${r===A?"":" bloom-ih-clamp"}`,Y.textContent=T,Y.addEventListener("click",()=>{r=r===A?-1:A,o()});let H=document.createElement("div");H.className="bloom-ih-actions";let J=document.createElement("button");J.type="button",J.title="Copy",J.textContent="C",J.addEventListener("click",()=>{Gs(T)});let $t=document.createElement("button");$t.type="button",$t.title="Delete",$t.textContent="\xD7",$t.addEventListener("click",()=>{Lp(Dt),o()}),H.append(J,$t),wt.append(Y,H),m.appendChild(wt)}),t.appendChild(m)}else{let m=document.createElement("p");m.className="bloom-ih-empty",m.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(m)}let d=document.createElement("div");d.className="bloom-ih-pager";let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Prev",f.disabled=n<=0,f.addEventListener("click",()=>{n-=1,o()});let b=document.createElement("span");b.textContent=`${n+1} / ${l}`;let g=document.createElement("button");g.type="button",g.className="bloom-ih-btn",g.textContent="Next",g.disabled=n+1>=l,g.addEventListener("click",()=>{n+=1,o()});let h=document.createElement("button");h.type="button",h.className="bloom-ih-clear",h.textContent="Clear all",h.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Wo([]),$=0,o())}),d.append(f,b,g,h),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var Dc=y({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:Vo,startAt:"HostReady",managedStyle:"inputHistory",start(){w("inputHistory",Ac),$=bt().length,Mt=!1,Sp()},stop(){fr?.abort(),fr=null,sn(),pp(),ma.clear(),clearTimeout(pa),pr=!1,ha=null,Mt=!1},onSettingsChange(){let t=bt(),e=Pc(t);e.length!==t.length&&Wo(e),$>e.length&&($=e.length)}});var va="noShareLink",kp=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],Cp=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],xa=S({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function $c(t){return`${t.join(",")}{display:none!important}`}function _c(){let t=[];if(xa.store.hideShareChat!==!1&&t.push($c(kp)),xa.store.hideShareProject!==!1&&t.push($c(Cp)),!t.length){x(va);return}w(va,t.join(`
`))}var Fc=y({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:xa,start:_c,onSettingsChange:_c,stop(){x(va)}});var jc="noDictation",Mp=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],Ap=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Gc=S({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function qc(t){return`${t.join(",")}{display:none!important}`}function zc(){let t=[qc(Mp)];Gc.store.hideDictationSettings!==!1&&t.push(qc(Ap)),w(jc,t.join(`
`))}var Uc=y({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Gc,start:zc,onSettingsChange:zc,stop(){x(jc)}});var wa="noSidebarIdentity",ln=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Wc=ln.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),Yc=ln.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),Hp=[...Wc,...Yc],Np=[...Wc,...ln.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],Rp=ln.map(t=>`${t} a[href^="mailto:"]`),Ip=ln.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),Pp=ln.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),gr=S({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function Kc(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Op(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function Bp(){return`${Pp.join(",")}{margin-block:auto!important}`}function Dp(){return`${Ip.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function Vc(){let t=gr.store.hideUsername!==!1,e=gr.store.hideEmail!==!1,n=t&&gr.store.enlargePlan!==!1,r=t&&gr.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(Op([...Np,...Yc])),o.push(Bp())):o.push(Kc(Hp))),e&&o.push(Kc(Rp)),n&&o.push(Dp()),!o.length){x(wa);return}w(wa,o.join(`
`))}var Xc=y({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:gr,start:Vc,onSettingsChange:Vc,stop(){x(wa)}});var Zc=`#bloom-rt-host {
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
`;var tu=new E("RecentTopics"),dn="bloom-rt-host",eu="home",nu=/^\/c\/([a-z0-9_-]{8,})/i,_p=/\/c\/([a-z0-9_-]{8,})/i,ru=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Fp=new Set(["Backquote","IntlBackslash"]),qp=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),zp=140,jp=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),_=S({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:jp},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),Yo=null,Sa=null,Z=!1,wr=!1,br=!1,At=0,Ae="",cn=null,hr=null,un,Ea=null;function Gp(){let t=Number(_.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function yr(){let t=_.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function La(){let t=_.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function ou(){let t=_.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Ta(){let t=_.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Zo(t){let e=Gp();return t.length>e?t.slice(0,e):t}function Ht(t){return t===eu}function vr(t,e=zp){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function ka(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(nu)?.[1]??""}catch{return t.match(_p)?.[1]??""}}function He(){let t=(location.pathname||"/").match(nu);if(t?.[1])return t[1];let n=et().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return eu}function Ca(t){if(Ht(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(ka(r.getAttribute("href")||"")!==t)continue;let o=vr(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return He()===t&&e&&!/^ChatGPT$/i.test(e)?vr(e,80):""}function Up(t){if(Ht(t))return"New chat";let e=La()[t];if(e)return e;let n=rn(t);return n||Ca(t)||"Chat"}function Kp(t){return Ta()[t]||""}function Vp(t){return ou()[t]||{}}function Ma(t,e){if(!t||Ht(t)||!e||/^new chat$/i.test(e.trim()))return;let n=La();n[t]!==e&&(n[t]=e,_.store.titles=n)}function Wp(t){t.type==="conversation-meta"&&(Ma(t.conversationId,t.title),Z&&mn())}function Yp(t,e){if(!t||Ht(t)||!e)return;let n=Ta();n[t]!==e&&(n[t]=e,_.store.projects=n)}function Xp(t,e){if(!t||Ht(t)||!e.user&&!e.assistant)return;let n=ou(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,_.store.previews=n)}function Aa(t){if(!t||Ht(t)&&_.store.includeHome===!1)return;let e=yr().filter(n=>n!==t);e.unshift(t),_.store.visits=Zo(e)}function Jo(){let t=_.store.includeHome!==!1;return Zo(yr().filter(n=>t||!Ht(n))).map(n=>({id:n,title:Up(n),project:Kp(n),preview:Vp(n)}))}function Jc(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return vr(o)}catch{return""}}function xr(t){if(!t||Ht(t)||t!==He())return;let e=Ca(t);e&&Ma(t,e);let n=Jc("user"),r=Jc("assistant");Xp(t,{user:n,assistant:r});let o=au(t);if(o){let i=iu(o);i&&Yp(t,i)}}function Ha(){let t=La(),e=Ta(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${dn}, #bloom-root, #bloom-sidebar-panel`))continue;let u=ka(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=vr(c.textContent||"",80);d&&!ru.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let f=iu(c);f&&e[u]!==f&&(e[u]=f,i=!0)}}catch{}o&&(_.store.titles=t),i&&(_.store.projects=e);let a=yr(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(_.store.visits=Zo([...a,...l]))}function iu(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=vr((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!ru.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function au(t){if(Ht(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(ka(e.getAttribute("href")||"")===t)return e}catch{}return null}function Zp(t){let e=au(t);if(e){e.click();return}if(Ht(t)){location.assign("/");return}location.assign(`/c/${t}`)}function Jp(){let t=He();Ae&&Ae!==t&&xr(Ae),Ae=t,Aa(t),Ha();let e=Ca(t);e&&Ma(t,e),xr(t)}function Xo(){un===void 0&&(un=window.setTimeout(()=>{un=void 0,Jp()},120))}function Qp(){cn||(cn=history.pushState.bind(history),hr=history.replaceState.bind(history),history.pushState=function(...e){let n=cn(...e);return Xo(),n},history.replaceState=function(...e){let n=hr(...e);return Xo(),n})}function tg(){cn&&(history.pushState=cn),hr&&(history.replaceState=hr),cn=null,hr=null}function eg(t){return Fp.has(t.code)||t.keyCode===192?!0:qp.has(t.key)}function su(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function ng(t,e){wr=e,Ha(),xr(He()),Z=!0,At=0;try{let n=He();Aa(n);let r=Jo();r.length>1&&(At=t?r.length-1:1)}catch(n){tu.error("Failed to open switcher:",n)}mn()}function Qc(t){let{length:e}=Jo();e&&(At=(At+(t?-1:1)+e)%e,mn())}function Na(){if(!Z)return;let t=Jo()[At];Z=!1,wr=!1,mn(),t&&Zp(t.id)}function lu(){Z&&(Z=!1,wr=!1,mn())}function rg(t){if(su(t)){br=!0;return}if((t.ctrlKey||br)&&!t.altKey&&!t.metaKey&&eg(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{Z?Qc(t.shiftKey):ng(t.shiftKey,!0)}catch(n){tu.error("Hotkey failed:",n)}return}if(Z){if(t.key==="Escape"){t.preventDefault(),lu();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),Na();return}t.key==="Tab"&&(t.ctrlKey||br)&&(t.preventDefault(),Qc(t.shiftKey))}}function og(t){su(t)&&(br=!1,Z&&wr&&Na())}function ig(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(Xo)}function ag(t){!Z||(t.target instanceof Element?t.target:null)?.closest(`#${dn}`)||lu()}function sg(){document.visibilityState==="hidden"&&xr(He())}function lg(){if(!document.body)return null;let t=document.getElementById(dn);if(t instanceof HTMLElement)return Sa=t,t;t=document.createElement("div"),t.id=dn;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),Sa=t,t}function mn(){let t=lg();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!Z){e.dataset.visible="false",e.replaceChildren();return}let n=Jo();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}At>=n.length&&(At=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===At?"true":"false",s.setAttribute("aria-selected",a===At?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{At=a,Na()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function cg(){document.getElementById(dn)?.remove(),Sa=null}var cu=y({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${dn}`],settings:_,start(){w("recentTopics",Zc),Ae=He(),Aa(Ae),Ha(),xr(Ae),Ea=nt(Wp),Qp(),Yo=new AbortController;let{signal:t}=Yo;window.addEventListener("keydown",rg,{capture:!0,signal:t}),window.addEventListener("keyup",og,{capture:!0,signal:t}),window.addEventListener("popstate",Xo,{signal:t}),document.addEventListener("click",ig,{capture:!0,signal:t}),document.addEventListener("click",ag,{signal:t}),document.addEventListener("visibilitychange",sg,{signal:t})},stop(){Yo?.abort(),Yo=null,un!==void 0&&(clearTimeout(un),un=void 0),tg(),Ea?.(),Ea=null,Z=!1,wr=!1,br=!1,cg()},onSettingsChange(){let t=Zo(yr());t.length!==yr().length&&(_.store.visits=t),Z&&mn()}});var Ra="cleaner",ug=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],dg=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],mg=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],fg=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],pg=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],gg=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],Ne=S({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function fn(t){return`${t.join(",")}{display:none!important}`}function uu(){let t=[];if(Ne.store.hideDownloadApps!==!1&&t.push(fn(ug)),Ne.store.hideDisclaimer!==!1&&t.push(fn(dg)),Ne.store.hideUpgrade!==!1&&t.push(fn(mg)),Ne.store.hideLockedModels!==!1&&t.push(fn(fg)),Ne.store.hideHomePromo!==!1&&t.push(fn(pg)),Ne.store.hideAds!==!1&&t.push(fn(gg)),!t.length){x(Ra);return}w(Ra,t.join(`
`))}var du=y({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Ne,start:uu,onSettingsChange:uu,stop(){x(Ra)}});var ti=new E("ResponseNotification"),gn=S({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:Eg},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Ia=!1,Qo=null,pn=null,Er=null;function bg(){return document.visibilityState==="hidden"||document.hidden}function hg(){return gn.store.onlyWhenHidden===!1?!0:bg()}function yg(){let t=rn(R());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function mu(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!pn||pn.state==="closed")&&(pn=new t);let e=pn,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){ti.debug("chime failed",t)}}function vg(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){ti.debug("custom sound failed",e),mu()}}function fu(){let t=String(gn.store.soundUrl||"").trim();t?vg(t):mu()}function xg(){let t="Bloom++",e=`${yg()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){ti.debug("notification failed",n)}}function wg(){hg()&&(gn.store.sound!==!1&&fu(),gn.store.browserNotification!==!1&&xg())}function Eg(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>fu()),t.appendChild(e),()=>{e.remove()}}var pu=y({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:gn,start(){Ia=!0,Qo?.(),Qo=W(t=>{Ia&&(t.userStopped||t.error||wg())}),Er?.abort(),Er=new AbortController,gn.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:Er.signal}),ti.debug("watch started")},stop(){Ia=!1,Qo?.(),Qo=null,Er?.abort(),Er=null;try{pn?.close()}catch{}pn=null}});var gu=`#bloom-pq-chip {
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
`;var kr=new E("PromptQueue"),Oa="bloom-pq-chip",bu="promptQueue",hu=80,Lg=50,Tg=2e3,wu=S({replacePending:{type:2,description:"Replace the queued prompt if you Enter again while one is waiting.",default:!0}}),q=new Map,jt=!1,ht="",F="",ue=!1,yt=!1,O=null,Sr=null,ei=null,Tr,Lr,bn=null;function hn(){return zt(et())}function yn(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function yu(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(St);return n instanceof HTMLElement?n:U()}function Ba(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function Eu(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function kg(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?yn(e.innerText||e.textContent||""):""}catch{return""}}function vu(t){if(!ht||ht===t)return;let e=q.get(ht);!e||q.has(t)||X(ht,t)&&(q.delete(ht),q.set(t,e),F===ht&&(F=t),O?.key===ht&&(O.key=t),kr.debug("migrated pending",ht,"\u2192",t))}function Da(t){let e=hn();if(q.get(e)&&wu.store.replacePending===!1)return;q.set(e,{text:t,at:Date.now()}),O={key:e,text:t,turns:Eu(),ticks:3};let r=U();r&&qt(r,""),ce(),kr.debug("queued",e,t.length)}function Cg(t){q.delete(t),F===t&&(F=""),O?.key===t&&(O=null),ce()}function Mg(){yt=!0,clearTimeout(Lr),Lr=setTimeout(()=>{yt=!1,Lr=void 0},Tg)}function Ag(){let t=hn(),e=q.get(t);if(!e)return;let n=U();if(!n)return;q.delete(t),F="",ce(),Mg(),qt(n,e.text);let r=oe();r&&!I(r)&&!Ro(r)&&(r.click(),yt=!1)}function xu(t){if(!jt||ue||D()||hn()!==t)return;let e=q.get(t);if(!e){F="";return}if(ft())return;let n=U();if(!n)return;if(!re(n)){let o=yn(tt(n));if(o&&o!==e.text)return}let r=oe();!r||I(r)||Ro(r)||(ue=!0,qt(n,e.text),clearTimeout(Tr),Tr=setTimeout(()=>Hg(t,e.text),Lg))}function Hg(t,e){Tr=void 0;try{if(!jt)return;let n=q.get(t);if(!n||n.text!==e||D()||hn()!==t)return;let r=U();if(!r)return;let o=yn(tt(r));if(o&&o!==e&&!re(r))return;o!==e&&qt(r,e);let i=oe();if(!i||I(i)||Ro(i))return;i.click(),q.delete(t),F="",ce(),kr.debug("drained",t)}finally{ue=!1}}function Su(t){let e=dt();if(!e||e===document.body){t.style.left="50%",t.style.bottom="6.5rem";return}let n=e.getBoundingClientRect();t.style.left=`${Math.round(n.left+n.width/2)}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`;let r=Math.min(512,Math.max(160,n.width-24));t.style.maxWidth=`${Math.round(r)}px`}function Pa(){bn?.remove(),bn=null}function ce(){if(!jt||!document.body){Pa();return}let t=hn(),e=q.get(t);if(!e){Pa();return}let n=bn;n?.isConnected||(n=document.createElement("div"),n.id=Oa,document.body.appendChild(n),bn=n),n.replaceChildren();let r=document.createElement("span");r.className="bloom-pq-kicker",r.textContent="Next";let o=document.createElement("span");o.className="bloom-pq-text";let i=e.text.length>hu?`${e.text.slice(0,hu)}\u2026`:e.text;o.textContent=i,o.title=e.text;let a=document.createElement("div");a.className="bloom-pq-actions";let s=document.createElement("button");s.type="button",s.className="bloom-pq-btn bloom-pq-send",s.textContent="Send now",s.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),Ag()});let l=document.createElement("button");l.type="button",l.className="bloom-pq-btn bloom-pq-x",l.setAttribute("aria-label","Dismiss queued prompt"),l.textContent="\xD7",l.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),Cg(t)}),a.append(s,l),n.append(r,o,a),Su(n)}function Ng(){if(!O)return;if(O.ticks-=1,q.get(O.key)&&Eu()>O.turns){let e=kg();if(e&&e===O.text){kr.debug("native send leaked; dropping pending"),q.delete(O.key),F===O.key&&(F=""),O=null,ce();return}}O.ticks<=0&&(O=null)}function Rg(t){if(!jt||t.isComposing||t.keyCode===229||t.key!=="Enter"||t.shiftKey||t.ctrlKey||t.metaKey||ue)return;let e=yu(t.target)??yu(document.activeElement);if(!e||!D())return;if(t.altKey||yt){yt=!1;return}if(!mt(e))return;let n=yn(tt(e));n&&(Ba(t),Da(n))}function Ig(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||I(e))return null;let n=t.closest(tn);if(n instanceof HTMLElement&&!I(n))return n;let r=oe();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function Pg(t){if(!jt)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${Oa}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&I(n)||ue||!D()||!Ig(e))return;if(yt){yt=!1;return}let r=U();if(!r||!mt(r))return;let o=yn(tt(r));o&&(Ba(t),Da(o))}function Og(t){if(!jt)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(No)&&!e.querySelector(St)||ue||!D())return;if(yt){yt=!1;return}let n=U()??e.querySelector(St);if(!n||!mt(n))return;let r=yn(tt(n));r&&(Ba(t),Da(r))}var Lu=y({name:"PromptQueue",description:"Queue the next prompt while a reply is streaming. Enter/Send waits for this turn instead of interrupting.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:bu,cleanupSelectors:[`#${Oa}`],settings:wu,start(){jt=!0,ht=hn(),F="",ue=!1,yt=!1,O=null,w(bu,gu),Sr?.abort(),Sr=new AbortController;let{signal:t}=Sr;window.addEventListener("keydown",Rg,{capture:!0,signal:t}),document.addEventListener("click",Pg,{capture:!0,signal:t}),document.addEventListener("submit",Og,{capture:!0,signal:t}),ei?.(),ei=W({onFall(e){if(jt){if(e.userStopped||e.error){F="",ce();return}F=e.contextKey,xu(e.contextKey)}},onContext(e){vu(e),ht=e,ce()},onTick(e){vu(e.contextKey),ht=e.contextKey,Ng(),F&&F===e.contextKey&&xu(F),bn&&Su(bn)}}),ce(),kr.debug("watch started")},stop(){jt=!1,ei?.(),ei=null,Sr?.abort(),Sr=null,clearTimeout(Tr),Tr=void 0,clearTimeout(Lr),Lr=void 0,q.clear(),O=null,F="",ue=!1,yt=!1,Pa()}});var Tu=`.bloom-cls {
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
`;var Mu=new E("ChatListStatus"),ku="chatListStatus",oi="bloom-cls",Dg="bloom-cls",$g=1200*1e3,_g="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",Nt=new Map,Rt=!1,vn="",Gt=!1,at=0,de=null,Fa=null,xn=null,$a=null,ni=null,Cr=null,wn=!1,En=new Set;function ri(){return Date.now()}function Au(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function Re(t,e,n,r=!0){if(!(!t||!Rt)){if(e==="idle")Nt.delete(t);else{let o=Nt.get(t);o&&o.kind===e&&n!=="net"?o.at=ri():Nt.set(t,{kind:e,at:ri(),source:n})}r&&Fg({v:1,id:t,kind:e,at:ri()}),Sn()}}function Fg(t){try{xn?.postMessage(t)}catch{}}function qg(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||Re(e.id,e.kind,"bc",!1)}function zg(){let t=ri();for(let[e,n]of Nt)n.kind==="streaming"&&t-n.at>$g&&Nt.delete(e)}function jg(){let t=Au();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(r.closest(_g))continue;let o=en(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function Cu(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function _a(t){let e=t.querySelector(`:scope > .${oi}`);return e||null}function qa(){if(!Rt)return;zg();let t=R(),e=jg();de?.disconnect();try{for(let n of e){let r=en(n.getAttribute("href")||"");if(!r||!t||r!==t){_a(n)?.remove();continue}let i=Nt.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){_a(n)?.remove();continue}let a=_a(n);a||(a=document.createElement("span"),a.className=oi,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(Cu("streaming")):i==="error"&&a.appendChild(Cu("error")))}}catch(n){Mu.debug("paint failed",n)}Hu()}function Sn(){if(Rt){if(document.hidden){at&&(cancelAnimationFrame(at),at=0),qa();return}at||(at=requestAnimationFrame(()=>{at=0,Rt&&qa()}))}}function Hu(){let t=Au();if(!(de&&Fa===t&&t?.isConnected)){if(de?.disconnect(),Fa=t,!t){de=null;return}de=new MutationObserver(()=>Sn()),de.observe(t,{childList:!0,subtree:!0})}}function za(){return!!(we()||cr())}function Gg(t){return!!(wn||t&&En.has(t)||za())}function Ug(t){if(Rt){if(t.type==="post-start"){t.conversationId?(wn=!1,En.add(t.conversationId),Gt=!0,Re(t.conversationId,"streaming","net")):(wn=!0,Gt=!0);return}t.type==="post-end"&&(wn=!1,t.conversationId&&(En.delete(t.conversationId),Re(t.conversationId,t.error?"error":"done","net")),za()||(Gt=!1))}}function Kg(t,e){if(!Rt)return;if(X(e,t)){Sn();return}let n=R();if(!(wn||n&&En.has(n))){if(Gt=!1,n&&Nt.get(n)?.kind==="streaming"&&Nt.get(n)?.source==="local"){Re(n,"idle","local");return}Sn()}}function Vg(t){if(!Rt)return;let e=t.conversationId||R();if(vn&&e&&vn!==e){let r=Nt.get(vn);r?.kind==="streaming"&&r.source==="local"&&Re(vn,ft()?"error":"done","local"),Gt=!!(e&&En.has(e))}if(vn=e,Gg(e)&&(t.streaming||za())){Gt=!0,e&&Re(e,"streaming","local"),Sn();return}Gt&&(Gt=!1,e&&Re(e,ft()?"error":"done","local")),Sn()}var Nu=y({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${oi}`],start(){Rt=!0,w(ku,Tu);try{xn=new BroadcastChannel(Dg)}catch{xn=null}xn?.addEventListener("message",qg),$a=nt(Ug),ni?.(),ni=W({onTick:Vg,onContext:Kg}),Cr?.abort(),Cr=new AbortController,document.addEventListener("visibilitychange",()=>{Rt&&(at&&(cancelAnimationFrame(at),at=0),qa())},{signal:Cr.signal}),Hu(),Mu.debug("sidebar status watch started")},stop(){Rt=!1,at&&cancelAnimationFrame(at),at=0,Cr?.abort(),Cr=null,de?.disconnect(),de=null,Fa=null,ni?.(),ni=null,$a?.(),$a=null;try{xn?.close()}catch{}xn=null,Nt.clear(),En.clear(),wn=!1,Gt=!1,vn="",document.querySelectorAll(`.${oi}`).forEach(t=>t.remove()),x(ku)}});var Iu="widerChat",Pu=40,Ou=96,Bu=64,Du=S({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:Pu,max:Ou,default:Bu}});function Wg(){return G(Number(Du.store.width??Bu),Pu,Ou)}function Ru(){let t=Wg(),e=`min(100%,${t}rem)`;w(Iu,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var $u=y({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Du,start:Ru,onSettingsChange:Ru,stop(){x(Iu)}});var ja="composerOpacity",Ln='form[data-type="unified-composer"],form.w-full[data-type]',Yg=[`${Ln} [class*="corner-superellipse"]`,`${Ln} [class*="bg-token-bg-primary"]`,`${Ln} [class*="bg-token-main-surface"]`].join(","),Xg=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),Zg="#thread-bottom-container,#thread-bottom",Jg=`${Ln} #prompt-textarea,${Ln} [contenteditable="true"]`,Qg="var(--bg-primary,var(--main-surface-primary,#ffffff))",Ga=S({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function tb(){return G(Number(Ga.store.opacity??100),0,100)}function eb(){return G(Number(Ga.store.blur??16),0,40)}function _u(){let t=tb();if(t>=100){x(ja);return}let e=eb(),n=`color-mix(in srgb,${Qg} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";w(ja,`${Zg}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Xg}{display:none!important}${Ln}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Yg}{background-color:${n}!important;background-image:none!important;${r}}${Jg}{background-color:transparent!important;background-image:none!important}`)}var Fu=y({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[v.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Ga,start:_u,onSettingsChange:_u,stop(){x(ja)}});var qu=`#bloom-bn-host {
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
`;var rb=new E("BetterNavigator"),Ua="betterNavigator",zu="bloom-bn-host",Ya=60,ob=16,ib=1e3,ab=2.5,sb=.4,ai="\u6B63\u5728\u8F93\u51FA\u2026",lb=40,cb=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,ub=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),db=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='thinking']","[class*='reasoning']","[class*='footnote']",".sr-only"].join(", "),mb=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),di=S({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),Tn=new Map,kn=new Set,vt=!1,Oe=!1,me=null,Rr=null,Be=null,si=null,z=[],De="",li=0,ci=-1,es=0,ui="",st=0,Ut=0,Mr,Ar=null,ii=null,Ka=null,Va=null,Ie=null,Xa=null,Hr=null,Pe=null,Cn=null,Nr=null;function mi(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function Wa(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function fb(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function pb(t){let e=t.getBoundingClientRect(),n=null;try{let i=t.querySelector("[data-message-id]");for(;i&&i!==t;)cb.test(fb(i))&&(n=i),i=i.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=Wa(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||Wa(getComputedStyle(t).getPropertyValue("--thread-content-width"))||Wa(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function gb(t){try{return!!t.closest(ub)}catch{return!0}}function bb(t){let e=(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("aria-label")||"").toLowerCase();return n.includes("you said")?"user":n.includes("chatgpt said")||n.includes("assistant said")?"assistant":null}function ju(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(i.closest(db))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return(o.textContent||"").replace(/\s+/g," ").trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<Ya+20;)e.push((r.textContent||"").replace(/\s+/g," ").trim());return e.join(" ").replace(/\s+/g," ").trim()}function hb(t,e){try{if(t.querySelector("img, picture, video, canvas"))return"Image";if(t.querySelector("a[download], [class*='attachment']"))return"File";if(t.querySelector("pre, code"))return"Code"}catch{}return`Message ${e+1}`}function yb(t,e){let n=e==="user"?t.querySelector(".whitespace-pre-wrap")??t:t.querySelector(".markdown")??t;return ju(n)}function vb(t){return t.length>Ya?`${t.slice(0,Ya).trimEnd()}\u2026`:t}function xb(t,e,n,r){let o=yb(t,e);return o?vb(o):r?ai:hb(t,n)}function wb(){if(Oe)return!0;let t=R();return!!(t&&kn.has(t)||we()||cr())}function Eb(t){try{if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming")||t.querySelector("[aria-busy='true'], .result-streaming"))return!0;let e=t.querySelector(".markdown");if((!e||e instanceof HTMLElement&&!ju(e))&&t.querySelector("[class*='thinking'], [class*='reasoning'], details"))return!0}catch{}return!1}function Sb(){let t=mi();if(!t||t===document.body)return[];let e=di.store.showAssistant!==!1,n=e&&wb(),r=[];try{for(let o of t.querySelectorAll("[data-message-id]")){if(gb(o))continue;let i=o.getAttribute("data-message-id")||"";if(!i)continue;let a=bb(o);if(a!=="user"&&a!=="assistant"||a==="assistant"&&!e)continue;let s=a==="assistant"&&n&&Eb(o),l=xb(o,a,r.length,s);l&&l!==ai&&l!==Tn.get(i)&&Tn.set(i,l);let c=s&&l===ai?ai:Tn.get(i)||l;r.push({id:i,el:o,role:a,text:c,live:s})}}catch{}return r}function Lb(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function Gu(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function Tb(t){return t===window?window.innerHeight:t.clientHeight}function kb(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(mb)}catch{return!1}}function Uu(){Mr!==void 0&&(clearTimeout(Mr),Mr=void 0),Ar?.classList.remove("bloom-bn-flash"),Ar=null}function Cb(t){Uu(),t.classList.add("bloom-bn-flash"),Ar=t,Mr=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),Ar===t&&(Ar=null),Mr=void 0},800)}function Za(t){if(!z.length)return;let e=Math.max(0,Math.min(t,z.length-1));li=e,Rr?.querySelectorAll(".bloom-bn-tick").forEach((r,o)=>{r.classList.toggle("bloom-bn-current",o===e)}),Be?.querySelectorAll(".bloom-bn-item").forEach((r,o)=>{r.classList.toggle("bloom-bn-active",o===e)}),si&&(si.textContent=`${e+1} / ${z.length}`);let n=Be?.children[e];if(n instanceof HTMLElement){let r=Be;if(r){let o=n.offsetTop-r.clientHeight/2+n.offsetHeight/2;r.scrollTop=Math.max(0,o)}}}function Ja(t){let e=z[t];if(!e?.el.isConnected)return;ci=t,es=Date.now()+ib,Za(t);let n=Cn??Gu(e.el),o=Math.abs(e.el.getBoundingClientRect().top-Lb())>ab*Tb(n);e.el.scrollIntoView({behavior:o?"auto":"smooth",block:"start"}),di.store.jumpEffect!=="none"&&Cb(e.el)}function ns(){if(!vt||!z.length)return;if(Date.now()<es&&ci>=0){Za(ci);return}let t=window.innerHeight*sb,e=0;for(let n=0;n<z.length;n++){let r=z[n].el;r.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}Za(e)}function Mb(t){let e=Gu(t);if(Cn===e&&Nr)return;Nr?.(),Cn=e;let n=e===window?document:e,r=()=>{ns(),rs()};n.addEventListener("scroll",r,{passive:!0}),Nr=()=>n.removeEventListener("scroll",r)}function Ab(t){Pe?.disconnect(),Pe=null;let e=Cn instanceof HTMLElement?Cn:null;Pe=new IntersectionObserver(()=>ns(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el.isConnected&&Pe.observe(n.el)}function Hb(){if(!document.body)return null;let t=me;if(t?.isConnected)return t;t=document.createElement("div"),t.id=zu,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),me=t,Rr=e,Be=i,si=o,t}function Ku(){let t=me,e=mi();if(!t||!e||!e.isConnected||z.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=pb(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||lb,d=n.right-r.right>=c+8?r.right+4:r.right-12-c;d=Math.min(d,n.right-c-8),d=Math.max(8,d);let f=Math.max(8,Math.round(window.innerWidth-d-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${f}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function rs(){!vt||Ut||(Ut=requestAnimationFrame(()=>{Ut=0,vt&&Ku()}))}function Nb(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function Rb(t){let e=Rr,n=Be;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>ob),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=Nb(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",c=>{c.preventDefault(),Ja(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-mark",s.textContent=r.role==="user"?"You":"GPT";let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=r.text,l.title=r.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),Ja(o)}),n.appendChild(a)}))}function Ib(t){Rr?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=Be?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function Pb(){let t=R();return t===ui?!1:(ui=t,Tn.clear(),z=[],De="",li=0,ci=-1,es=0,Oe&&t&&(kn.add(t),Oe=!1),!0)}function Ob(t){let e=di.store.showAssistant!==!1?"1":"0";return`${ui}|${e}|${t.map(n=>n.id).join(",")}`}function Qa(){if(!vt)return;Pb();let t=Sb(),e=mi();if(!e||t.length<1){z=t,De="",me&&(me.hidden=!0),Pe?.disconnect(),ts();return}Hb();let n=Ob(t);n!==De?(z=t,De=n,Rb(t),Mb(e),Ab(t)):(z=t,Ib(t)),Ku(),ns(),ts()}function Kt(){if(vt){if(document.hidden){st&&(cancelAnimationFrame(st),st=0),Qa();return}st||(st=requestAnimationFrame(()=>{st=0,vt&&Qa()}))}}function ts(){let t=mi();if(!(Ie&&Xa===t&&t?.isConnected)){if(Ie?.disconnect(),Hr?.disconnect(),Xa=t,!t||t===document.body){Ie=null;return}Ie=new MutationObserver(()=>Kt()),Ie.observe(t,{childList:!0,subtree:!0}),Hr=new ResizeObserver(()=>rs()),Hr.observe(t)}}function Bb(t){if(vt){if(t.type==="post-start"){t.conversationId?(Oe=!1,kn.add(t.conversationId)):Oe=!0,Kt();return}if(t.type==="post-end"){if(Oe=!1,t.conversationId)kn.delete(t.conversationId);else{let e=R();e&&kn.delete(e)}Kt()}}}function Db(t){if(!vt||!z.length||me?.hidden||t.altKey||t.ctrlKey||t.metaKey||kb(t.target))return;let e=-1;if(t.key==="ArrowDown")e=li+1;else if(t.key==="ArrowUp")e=li-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=z.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),Ja(Math.max(0,Math.min(e,z.length-1)))}function $b(){Uu(),Pe?.disconnect(),Pe=null,Ie?.disconnect(),Ie=null,Xa=null,Hr?.disconnect(),Hr=null,Nr?.(),Nr=null,Cn=null,me?.remove(),me=null,Rr=null,Be=null,si=null}var Vu=y({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:Ua,cleanupSelectors:[`#${zu}`],settings:di,start(){vt=!0,ui=R(),w(Ua,qu),ii=new AbortController;let{signal:t}=ii;window.addEventListener("keydown",Db,{signal:t}),window.addEventListener("popstate",Kt,{signal:t}),window.visualViewport?.addEventListener("resize",rs,{signal:t}),document.addEventListener("visibilitychange",()=>{vt&&(st&&(cancelAnimationFrame(st),st=0),Ut&&(cancelAnimationFrame(Ut),Ut=0),Qa())},{signal:t}),Va=nt(Bb),Ka=W({onTick(){Kt()},onFall(){Kt()},onContext(e,n){X(n,e)||(Tn.clear(),De=""),Kt()}}),ts(),Kt(),rb.debug("navigator started")},stop(){vt=!1,st&&cancelAnimationFrame(st),st=0,Ut&&cancelAnimationFrame(Ut),Ut=0,ii?.abort(),ii=null,Ka?.(),Ka=null,Va?.(),Va=null,kn.clear(),Oe=!1,$b(),Tn.clear(),z=[],De="",x(Ua)},onSettingsChange(){De="",Kt()}});var Wu=`.bloom-ts {
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
`;function Yu(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Xu(t){try{return new Date(t).toISOString()}catch{return""}}var td=new E("MessageTimestamps"),Zu="messageTimestamps",pi="bloom-ts",Ju=1500,Fb="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",Mn=S({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),An=new Map,_e=!1,lt=0,fe=null,is=null,os=null,fi=null,Ir=null,Qu=!1;function ed(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function ss(){let t=Mn.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function nd(){let t={...ss()};for(let[n,r]of An)t[n]=r;let e=Object.keys(t);if(e.length>Ju){let n=e.slice(e.length-Ju),r={};for(let o of n)r[o]=t[o];Mn.store.stamps=r;return}Mn.store.stamps=t}var qb=Us(nd,500);function rd(t,e){!t||!e||An.get(t)===e||(An.set(t,e),qb(),$e())}function zb(t){return t?An.get(t)??ss()[t]??Do(t)??null:null}function jb(t){_e&&t.type==="message-time"&&rd(t.messageId,t.createTime)}function Gb(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function Ub(){let t=ed();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll("[data-message-id]"))n.closest(Fb)||e.push(n)}catch{}return e}function Kb(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function as(){if(!_e)return;let t=Mn.store.hideOwnMessages===!0,e=Mn.store.showDate!==!1,n=D(),r=Ub();fe?.disconnect();try{r.forEach((o,i)=>{let a=o.getAttribute("data-message-id")||"",s=Gb(o),l=o.querySelector(`:scope > .${pi}`);if(t&&s==="user"){l?.remove();return}if(Kb(o)){l?.remove();return}let c=zb(a);if(!c&&a&&(n||Qu)&&i>=r.length-2&&(c=Date.now(),rd(a,c)),!c){l?.remove();return}let u=Yu(c,e);if(!u){l?.remove();return}let d=l;d||(d=document.createElement("time"),d.className=pi,d.setAttribute("aria-hidden","true"),o.insertBefore(d,o.firstChild)),d.textContent!==u&&(d.textContent=u);let f=Xu(c);f&&d.getAttribute("datetime")!==f&&d.setAttribute("datetime",f)})}catch(o){td.debug("paint failed",o)}Qu=n,od()}function $e(){if(_e){if(document.hidden){lt&&(cancelAnimationFrame(lt),lt=0),as();return}lt||(lt=requestAnimationFrame(()=>{lt=0,_e&&as()}))}}function od(){let t=ed();if(!(fe&&is===t&&t?.isConnected)){if(fe?.disconnect(),is=t,!t||t===document.body){fe=null;return}fe=new MutationObserver(()=>$e()),fe.observe(t,{childList:!0,subtree:!0})}}var id=y({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${pi}`],settings:Mn,start(){_e=!0,w(Zu,Wu);let t=ss();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&An.set(e,n);os=nt(jb),fi?.(),fi=W({onTick:$e,onFall:$e,onContext:$e}),Ir?.abort(),Ir=new AbortController,document.addEventListener("visibilitychange",()=>{_e&&(lt&&(cancelAnimationFrame(lt),lt=0),as())},{signal:Ir.signal}),od(),$e(),td.debug("timestamp watch started")},stop(){_e=!1,lt&&cancelAnimationFrame(lt),lt=0,Ir?.abort(),Ir=null,fe?.disconnect(),fe=null,is=null,fi?.(),fi=null,os?.(),os=null,nd(),An.clear(),document.querySelectorAll(`.${pi}`).forEach(t=>t.remove()),x(Zu)},onSettingsChange:$e});var ls="streamerMode",Vb="filter:blur(6px)!important;transition:filter .2s ease",Wb="filter:none!important",Hn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],Nn=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function ct(t,e){return t.map(n=>`${n} ${e}`)}var Fe=S({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function Rn(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${Vb}}${e?`${r}{${Wb}}`:""}`}function ad(){let t=[];if(Fe.store.conversations!==!1&&(t.push(Rn([...ct(Nn,'a[href^="/c/"]'),...ct(Nn,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),Fe.store.projects!==!1&&(t.push(Rn([...ct(Nn,'a[href*="/project"]'),...ct(Nn,'a[href*="/g/g-p-"]'),...ct(Nn,'[data-testid="project-name"]'),...ct(Nn,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),Fe.store.headerTitle!==!1&&t.push(Rn(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),Fe.store.accountAvatar!==!1&&t.push(Rn([...ct(Hn,"img"),...ct(Hn,'[class*="avatar"]'),...ct(Hn,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),Fe.store.accountName!==!1&&t.push(Rn([...ct(Hn,".min-w-0 > .truncate"),...ct(Hn,".min-w-0.flex-1 .truncate")],!1)),Fe.store.accountEmail!==!1&&t.push(Rn([...ct(Hn,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!t.length){x(ls);return}w(ls,t.join(`
`))}var sd=y({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[v.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Fe,start:ad,onSettingsChange:ad,stop(){x(ls)}});var ld=`.bloom-gc-panel {
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
}`;var Xb=new E("GreetingCustomizer"),In="greetingCustomizer",cd="greetingCustomizerUi",Pr=100,us=30,Zb=120,Jb=1e3,Qb=50,th=40,eh=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),Or=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),vi=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function nh(t){return!!t?.closest(eh)}function fd(t){return!!(nh(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function zr(t){try{for(let e of document.querySelectorAll(t))if(!fd(e))return e}catch{}return null}function cs(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(zr(e))return e;return t}var pd=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],j=S({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:yh},greetings:{type:0,description:"Greeting texts",hidden:!0,default:pd},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),It=!1,Bn=!1,ze=null,bi,Br,Pn,Dr,hi=0,gi=null,On=null,$r=null,_r=null,Fr=null,yi=null;function Wt(){let t=location.pathname||"/";return t==="/"||t===""}function qe(){let t=j.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):pd.slice()}function qr(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function ud(t){j.store.greetings=t.slice(0,us)}function jr(){let t=String(j.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function rh(){return j.store.order==="random"?"random":"sequential"}function oh(){return G(Number(j.store.intervalSec??10),1,3600)*1e3}function ih(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function ah(){return!!zr(vi)}function xi(){return!!(zr(vi)||zr(Or))}function sh(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=ah()?cs(vi):zr(Or)?cs(Or):cs(vi),i=e?`${Or}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function lh(t,e){if(t<=0)return 0;if(t===1)return Number(j.plain.index)!==0&&(j.store.index=0),Number(j.plain.lastRandom)!==0&&(j.store.lastRandom=0),0;let n=Number(j.plain.index),r=Number(j.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(rh()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return j.store.index=s,j.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return j.store.index=i,i}function Vt(t){if(!It)return;if(!Wt()){x(In);return}let e=qe().map(qr).filter(Boolean);if(!e.length){x(In);return}let n=lh(e.length,t),r=e[n]??e[0],o=jr()==="manual"&&e.length>1;w(In,sh(ih(r),o)),yi?.()}function ds(){bi!==void 0&&(clearInterval(bi),bi=void 0)}function ms(){ds(),!(!It||!Wt())&&jr()==="interval"&&(qe().filter(Boolean).length<=1||(bi=setInterval(()=>Vt(!0),oh())))}function fs(){Dr!==void 0&&(clearTimeout(Dr),Dr=void 0),hi=0}function dd(){if(fs(),!It||!Wt())return;hi=th;let t=()=>{if(Dr=void 0,!(!It||!Wt())){if(xi()){jr()==="refresh"&&!Bn?(Bn=!0,Vt(!0)):Vt(!1),ms();return}hi-=1,hi>0&&(Dr=setTimeout(t,Qb))}};t()}function ps(){if(ze===!0){xi()?Vt(!1):dd();return}ze=!0,Bn=!1,jr()==="refresh"?(Bn=!0,Vt(!0)):Vt(!1),ms(),xi()||dd()}function gs(){ze=!1,Bn=!1,ds(),fs(),x(In)}function wi(){Pn===void 0&&(Pn=window.setTimeout(()=>{Pn=void 0,It&&(Wt()?ps():ze!==!1&&gs())},Zb))}function ch(){On||(On=history.pushState.bind(history),$r=history.replaceState.bind(history),_r=function(...e){let n=On(...e);return wi(),n},Fr=function(...e){let n=$r(...e);return wi(),n},history.pushState=_r,history.replaceState=Fr)}function uh(){_r&&history.pushState===_r&&On&&(history.pushState=On),Fr&&history.replaceState===Fr&&$r&&(history.replaceState=$r),On=null,$r=null,_r=null,Fr=null}function dh(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(wi)}function mh(t){if(!It||!Wt()||jr()!=="manual"||qe().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(Or);if(!n||fd(n))return;let r=window.getSelection?.();r&&String(r).trim()||Vt(!0)}function fh(){Br===void 0&&(Br=setInterval(()=>{if(!It)return;let t=Wt();if(t!==(ze===!0)){t?ps():gs();return}t&&xi()&&Vt(!1)},Jb))}function ph(){Br!==void 0&&(clearInterval(Br),Br=void 0)}function md(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var gh="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",bh="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function hh(t,e){let n=qr(t);return n?n.length>Pr?`Keep it to ${Pr} characters.`:qe().length+(e?1:0)>us?`At most ${us} greetings.`:null:"Enter a greeting."}function yh(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=qe(),s=Number(j.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=Pr,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let m=l.querySelector(".bloom-gc-count");m&&(m.textContent=`${qr(e).length}/${Pr}`);let T=l.querySelector(".bloom-gc-error");T&&(T.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${qr(e).length}/${Pr}`;let f=document.createElement("span");f.className="bloom-gc-error",f.textContent=r;let b=document.createElement("div");if(b.className="bloom-gc-actions",n>=0){let m=document.createElement("button");m.type="button",m.className="bloom-gc-btn",m.textContent="Cancel",m.addEventListener("click",()=>{n=-1,e="",r="",i()}),b.appendChild(m)}let g=document.createElement("button");if(g.type="button",g.className="bloom-gc-btn bloom-gc-btn-primary",g.textContent=n>=0?"Update":"Add",g.addEventListener("click",()=>{let m=n<0,T=hh(e,m);if(T){r=T,i();return}let A=qr(e),B=qe().slice();n>=0&&n<B.length?B[n]=A:B.push(A),ud(B),n=-1,e="",r="",i()}),b.appendChild(g),u.append(d,f,b),l.appendChild(u),t.appendChild(l),!a.length){let m=document.createElement("p");m.className="bloom-gc-empty",m.textContent="No greetings. The official heading stays.",t.appendChild(m);return}let h=document.createElement("div");h.className="bloom-gc-list",a.forEach((m,T)=>{let A=document.createElement("div");A.className="bloom-gc-item",T===s&&(A.dataset.active="true");let B=document.createElement("button");B.type="button",B.className=`bloom-gc-body${o===T?"":" bloom-gc-clamp"}`,B.textContent=m,B.addEventListener("click",()=>{o=o===T?-1:T,i()});let Dt=document.createElement("div");Dt.className="bloom-gc-item-actions";let wt=md("Edit",gh);wt.addEventListener("click",()=>{n=T,e=m,r="",i()});let Y=md("Delete",bh);Y.addEventListener("click",()=>{let H=qe().filter((J,$t)=>$t!==T);ud(H),n===T?(n=-1,e=""):n>T&&(n-=1),i()}),Dt.append(wt,Y),A.append(B,Dt),h.appendChild(A)}),t.appendChild(h)};return yi=i,i(),()=>{yi===i&&(yi=null),t.replaceChildren()}}var gd=y({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:cd,settings:j,start(){It=!0,w(cd,ld),ch(),gi=new AbortController;let{signal:t}=gi;window.addEventListener("popstate",wi,{signal:t}),document.addEventListener("click",dh,{capture:!0,signal:t}),document.addEventListener("click",mh,{signal:t}),fh(),ze=null,Wt()?ps():gs(),Xb.debug("started")},stop(){It=!1,gi?.abort(),gi=null,Pn!==void 0&&(clearTimeout(Pn),Pn=void 0),ds(),fs(),ph(),uh(),x(In),Bn=!1,ze=null},onSettingsChange(){It&&(Wt()?(Vt(!1),ms()):x(In))}});var bd="data-bloom-csi-slot",vh="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",xh=/\bsize-(?:[6-9]|10)\b/,wh=/\b(?:h|w)-(?:[6-9]|10)\b/;function Eh(t){return t.getAttribute("class")||""}function Sh(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||xh.test(t)?!0:wh.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function Lh(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3}function Pt(t){return!!t?.closest(vh)}function Ei(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function Si(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function Gr(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function hd(t){if(Pt(t)||Si(t)||Gr(t)||Ei(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function yd(t){return Pt(t)||Si(t)||Gr(t)||t.querySelector("img, svg, .min-w-0, .truncate")?!1:Lh(t.textContent||"")}function Th(t){return Pt(t)||Gr(t)||Ei(t)?!1:Sh(Eh(t))||yd(t)?!0:hd(t)}function Ur(t,e){let n=Si(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(Gr(n)||Ei(n));)Pt(n)||(r=n),n=n.parentElement;return r}function kh(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||Pt(e))continue;let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&!(Pt(r)||Ei(r)||Gr(r))&&!Si(r))return Ur(r,t)??r}}return null}function Ch(t){let e=t.querySelectorAll('[class*="rounded-full"], [class*="avatar"], [class*="size-6"], [class*="size-7"], [class*="size-8"]');for(let n of e)if(Th(n))return Ur(n,t)??n;return null}function Mh(t){for(let e of t.querySelectorAll("span, div, p, i"))if(yd(e))return Ur(e,t)??e;return null}function Ah(t){for(let e of t.querySelectorAll("*"))if(hd(e))return Ur(e,t)??e;return null}function vd(t,e){if(Pt(t))return null;if(e&&!Pt(e)&&t.contains(e)){let n=Ur(e,t);if(n)return n}return kh(t)??Ch(t)??Mh(t)??Ah(t)}function xd(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]']}var wd=`/*
 * Bloom++, a modification for chatgpt.com
 * Copyright (c) 2026 Bloom contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Gear-pane crop UI only. Page paint lives in registerStyle(PAGE_STYLE).
 */

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
    -webkit-appearance: none;
    appearance: none;
    flex: 1;
    min-width: 0;
    width: 100%;
    height: 16px;
    margin: 0;
    padding: 0;
    background: transparent;
    accent-color: var(--bg-primary-inverted, #fff);
    cursor: pointer;
    pointer-events: auto;
    touch-action: pan-x;
}

.bloom-csi-zoom::-webkit-slider-runnable-track {
    height: 4px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--text-primary, currentColor) 22%, transparent);
}

.bloom-csi-zoom::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    margin-top: -6px;
    border: 0;
    border-radius: 999px;
    background: var(--bg-primary-inverted, #fff);
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--text-primary, currentColor) 18%, transparent);
    cursor: grab;
}

.bloom-csi-zoom:active::-webkit-slider-thumb {
    cursor: grabbing;
}

.bloom-csi-zoom::-moz-range-track {
    height: 4px;
    border: 0;
    border-radius: 999px;
    background: color-mix(in srgb, var(--text-primary, currentColor) 22%, transparent);
}

.bloom-csi-zoom::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border: 0;
    border-radius: 999px;
    background: var(--bg-primary-inverted, #fff);
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--text-primary, currentColor) 18%, transparent);
    cursor: grab;
}

.bloom-csi-zoom-val {
    flex-shrink: 0;
    min-width: 2.75rem;
    text-align: right;
    font-size: 0.75rem;
    font-variant-numeric: tabular-nums;
    color: var(--text-secondary, #5d5d5d);
}
`;var Ed=new E("CustomSidebarIdentity"),Sd="customSidebarIdentityUi",Cd="customSidebarIdentity",Nh="bloom-csi-face",Rh="bloom-csi-name",Wr="data-bloom-csi",Ni="data-bloom-csi-orig",Bt=bd,Ih=1024,Li=256,Md=24,Ad=64,Hd=40,vs=1,xs=4,Kr=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],bs=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],k=S({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:t0},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:Md,max:Ad,default:Hd},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function ki(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function Ph(){return String(k.store.displayName??"").trim()}function Ci(t,e,n,r,o){let i=G(n,vs,xs),a=Math.min(t,e)/i,s=G(r,a/2,Math.max(a/2,t-a/2)),l=G(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}async function Nd(t){try{return await createImageBitmap(t)}catch{return null}}async function ws(t){try{let e=await fetch(t,t.startsWith("data:")?void 0:{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?Nd(await e.blob()):null}catch{return null}}function Oh(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function Es(t){let e=Math.min(1,Ih/Math.max(t.width,t.height));return Oh(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function Bh(t,e,n,r){let{side:o,x:i,y:a}=Ci(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=Li,s.height=Li;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,Li,Li);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function Dh(t){let e=await Nd(t);if(!e)return null;let n=Es(e);return e.close(),n}async function Rd(t,e,n,r){let o=await ws(t);if(!o)return null;let i=Bh(o,e,n,r);return o.close(),i}function Ts(){k.store.cropX=.5,k.store.cropY=.5,k.store.cropZoom=1}function Ld(){k.store.avatarUrl="",k.store.avatarSource="",Ts()}var Td=0;async function Ss(t){let e=++Td;Ts(),k.store.avatarSource=t;let n=await Rd(t,.5,.5,1);return e!==Td?!1:(n&&(k.store.avatarUrl=n),!!n)}function Vr(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function hs(t){let e=Vr(t);if(!e)return!1;let n=await Dh(e);return n?Ss(n):!1}var Dn=new Set,xt=!1,$n=!1,_n=0,Mi=0,Ti=null,pe=new Map,Fn=null,Yt=null,Ai=null,Ot=null,Hi=null;function Id(){let t=String(k.store.avatarUrl??"").trim();if(!t||Dn.has(t))return null;if(t.startsWith("data:image/"))return t;try{let{protocol:e}=new URL(t);if(e==="https:"||e==="http:")return t}catch{return null}return null}function je(t,e){return t.map(n=>`${n} ${e}`)}function Pd(t){return`url(${JSON.stringify(t)})`}function $h(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function ys(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function kd(t,e,n){let r=Pd(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function _h(t){let e=Pd(t);return`[${Bt}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important}[${Bt}] *,[${Bt}]::before{color:transparent!important;font-size:0!important}[${Bt}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${e}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important}`}function Fh(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=$h(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function Od(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||Pt(n)||n.closest(".min-w-0")||e.push(n);return e}function qh(t){let e=Od(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function Ls(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&Dn.add(n),Yr(e),Xr()}function zh(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function Yr(t){t.removeEventListener("error",Ls);let e=t.getAttribute(Ni);t.removeAttribute(Wr),t.removeAttribute(Ni),e&&t.getAttribute("src")!==e&&(t.src=e)}function jh(t,e){if(!e||Dn.has(e)){Yr(t);return}zh(t);let n=t.getAttribute("src")??"";if(t.getAttribute(Wr)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(Ni)&&t.setAttribute(Ni,n);t.setAttribute(Wr,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",Ls),t.addEventListener("error",Ls),n!==e&&(t.src=e)}function ks(){let t=[],e=he();e&&t.push(e);let n=Xe();if(n&&!t.some(r=>n.contains(r)||r.contains(n))){let r=n.querySelector(Kr.join(","))??n.querySelector("button, a, [role='button']")??n;r&&!t.includes(r)&&t.push(r)}return t}function Bd(t,e){let n=qh(t);if(n)jh(n,e);else for(let o of Od(t))Yr(o);let r=vd(t,n);for(let o of t.querySelectorAll(`[${Bt}]`))o!==r&&o.removeAttribute(Bt);r&&r.setAttribute(Bt,"")}function Gh(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function Uh(t,e){let n=Gh(t);n&&Bd(n,e)}function Kh(){for(let t of document.querySelectorAll(`img[${Wr}]`))Yr(t);for(let t of document.querySelectorAll(`[${Bt}]`))t.removeAttribute(Bt)}function Vh(){let t=G(Math.round(ki(k.store.avatarSize,Hd)),Md,Ad),e=Id(),n=Ph(),r=k.store.applyToMenu!==!1,o=[],i=[...je(Kr,"img"),"#stage-sidebar-tiny-bar img"];r&&i.push(...je(bs,"> :first-child img"));let a=[...je(Kr,".min-w-0 > .truncate"),...je(Kr,".min-w-0.flex-1 .truncate")];r&&a.push(...je(bs,"> :first-child .truncate"));let s=xd(Bt);o.push(ys([...s.flatMap(l=>je(Kr,l))].join(","),t)),o.push(ys(s.map(l=>`#stage-sidebar-tiny-bar ${l}`).join(","),32)),r&&o.push(ys(s.flatMap(l=>je(bs,`> :first-child ${l}`)).join(","),t)),e&&(o.push(kd(i.join(","),e,t)),o.push(kd("#stage-sidebar-tiny-bar img",e,32)),o.push(_h(e))),n&&o.push(Fh(a,n)),w(Cd,o.join(""))}function Wh(){let t=Id(),e=ks();for(let n of e)Bd(n,t);if(k.store.applyToMenu!==!1){let n=Ze();n&&Uh(n,t)}for(let n of document.querySelectorAll(`img[${Wr}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||Yr(n)}function Cs(){if(!(!xt||$n)){$n=!0;for(let t of pe.values())t.disconnect();Yt?.disconnect(),Ot?.disconnect();try{Vh(),Wh()}finally{$n=!1,Ms(),Jh(),Fn?.isConnected&&Dd(Fn)}}}function Xr(){!xt||_n||(_n=requestAnimationFrame(()=>{_n=0,Cs()}))}function Yh(){$n||!xt||Xr()}function Xh(t){if(pe.has(t))return;let e=new MutationObserver(Yh);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),pe.set(t,e)}function Zh(t){pe.get(t)?.disconnect(),pe.delete(t)}function Ms(){let t=new Set;for(let n of ks())t.add(n),n.parentElement&&t.add(n.parentElement);let e=Xe();e&&t.add(e);for(let n of[...pe.keys()])(!t.has(n)||!n.isConnected)&&Zh(n);for(let n of t)n.isConnected&&Xh(n)}function Jh(){let t=go();if(!t){Ot?.disconnect(),Ot=null,Ai=null;return}if(Ai===t&&Ot){Ot.observe(t,{childList:!0});return}Ot?.disconnect(),Ai=t,Ot=new MutationObserver(()=>{$n||!xt||(Ms(),Xr())}),Ot.observe(t,{childList:!0})}function Dd(t){Fn===t&&Yt||(Yt?.disconnect(),Fn=t,Yt=new MutationObserver(()=>{if(!t.isConnected){Yt?.disconnect(),Yt=null,Fn=null;return}$n||!xt||Xr()}),Yt.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function $d(t){if(!xt||k.store.applyToMenu===!1)return;let e=Ze();if(e){Dd(e),Xr();return}t<=0||requestAnimationFrame(()=>$d(t-1))}function _d(t){xt&&(Cs(),!(ks().length||t<=0)&&(Mi=requestAnimationFrame(()=>_d(t-1))))}function Qh(t){xt&&k.store.applyToMenu!==!1&&(!bo(t)&&!Ze()||$d(10))}function t0(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let d=document.createElement("p");d.className="bloom-csi-hint";let f=document.createElement("div");f.className="bloom-csi-crop";let b=document.createElement("div");b.className="bloom-csi-stage";let g=document.createElement("img");g.className="bloom-csi-stage-img",g.alt="",g.draggable=!1,b.appendChild(g);let h=document.createElement("div");h.className="bloom-csi-zoom-row";let m=document.createElement("input");m.type="range",m.className="bloom-csi-zoom",m.min=String(vs),m.max=String(xs),m.step="0.05",m.setAttribute("aria-label","Zoom");let T=document.createElement("span");T.className="bloom-csi-zoom-val";let A=document.createElement("button");A.type="button",A.className="bloom-csi-btn",A.textContent="Reset",h.append(m,T,A);let B=document.createElement("p");B.className="bloom-csi-hint",B.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",f.append(b,h,B),t.append(u,d,f);function Dt(){let p=String(k.store.avatarSource??""),C=String(k.store.avatarUrl??"");return p.startsWith("data:image/")?p:C.startsWith("data:image/")?C:""}function wt(p,C,M){if(!a)return i.x=p,i.y=C,i.zoom=G(M,vs,xs),i;let V=Ci(a.w,a.h,M,p*a.w,C*a.h);return i.x=V.x/a.w,i.y=V.y/a.h,i.zoom=V.z,i}function Y(){m.value=String(i.zoom),T.textContent=`${Math.round(i.zoom*100)}%`;let p=a?Ci(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;p&&a&&(g.style.width=`${a.w/p.side*100}%`,g.style.height=`${a.h/p.side*100}%`,g.style.left=`${(.5-p.x/p.side)*100}%`,g.style.top=`${(.5-p.y/p.side)*100}%`)}function H(p=!1){let C=Dt(),M=String(k.store.avatarUrl??"").trim(),V=!!C;s.hidden=!M&&!C,(C||M)&&(s.src=C||M),document.activeElement!==l&&(l.value=V?"":M),l.placeholder=V?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",f.hidden=!C,d.hidden=!(e&&/^https?:\/\//.test(M)&&!C),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",C&&(p&&(i.x=ki(k.store.cropX,.5),i.y=ki(k.store.cropY,.5),i.zoom=ki(k.store.cropZoom,1)),g.getAttribute("src")!==C&&(a=null,g.onload=()=>{a={w:g.naturalWidth,h:g.naturalHeight},wt(i.x,i.y,i.zoom),Y()},g.src=C),Y())}function J(p,C,M,V=!1){wt(p,C,M),Y();let Ps=Dt(),Os=()=>{k.store.cropX=i.x,k.store.cropY=i.y,k.store.cropZoom=i.zoom,Ps&&Rd(Ps,i.x,i.y,i.zoom).then(Bs=>{Bs&&(k.store.avatarUrl=Bs)})};r&&clearTimeout(r),V?Os():r=setTimeout(Os,80)}function $t(p){k.store.avatarUrl=p;let C=p.trim();if(n&&clearTimeout(n),!C){k.store.avatarSource="",Ts(),e=!1,H(!0);return}if(C.startsWith("data:image/")){e=!1,n=setTimeout(()=>{ws(C).then(M=>{if(!M)return;let V=Es(M);M.close(),V&&Ss(V).then(()=>H(!0))})},80);return}if(/^https?:\/\//.test(C)){e=!1,k.store.avatarSource="",n=setTimeout(()=>{ws(C).then(M=>{if(!M){e=!0,H(!0);return}let V=Es(M);M.close(),V?(e=!1,Ss(V).then(()=>H(!0))):(e=!0,H(!0))})},400);return}e=!1,k.store.avatarSource="",H(!0)}u.addEventListener("paste",p=>{Vr(p.clipboardData)&&(p.preventDefault(),e=!1,hs(p.clipboardData).then(()=>H(!0)))}),u.addEventListener("dragover",p=>{Vr(p.dataTransfer)&&p.preventDefault()}),u.addEventListener("drop",p=>{Vr(p.dataTransfer)&&(p.preventDefault(),e=!1,hs(p.dataTransfer).then(()=>H(!0)))}),l.addEventListener("change",()=>$t(l.value)),l.addEventListener("paste",p=>{Vr(p.clipboardData)&&(p.preventDefault(),e=!1,hs(p.clipboardData).then(()=>H(!0)))}),l.addEventListener("keydown",p=>{Dt()&&!l.value&&(p.key==="Backspace"||p.key==="Delete")&&(Ld(),e=!1,H(!0))}),c.addEventListener("click",()=>{Ld(),e=!1,H(!0)}),b.addEventListener("pointerdown",p=>{p.button===0&&(b.setPointerCapture(p.pointerId),o.on=!0,o.px=p.clientX,o.py=p.clientY,o.x=i.x,o.y=i.y)}),b.addEventListener("pointermove",p=>{if(!o.on||!a)return;let C=b.clientWidth;if(!C)return;let{side:M}=Ci(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);wt(o.x-(p.clientX-o.px)*(M/C)/a.w,o.y-(p.clientY-o.py)*(M/C)/a.h,i.zoom),Y()}),b.addEventListener("pointerup",()=>{o.on&&(o.on=!1,J(i.x,i.y,i.zoom,!0))}),b.addEventListener("pointercancel",()=>{o.on=!1}),b.addEventListener("wheel",p=>{p.preventDefault(),J(i.x,i.y,i.zoom*(p.deltaY<0?1.08:1/1.08))},{passive:!1}),m.addEventListener("input",()=>J(i.x,i.y,Number(m.value))),m.addEventListener("change",()=>J(i.x,i.y,Number(m.value),!0)),A.addEventListener("click",()=>J(.5,.5,1,!0));let Is=()=>H(!1);return Hi=Is,H(!0),()=>{Hi===Is&&(Hi=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var Fd=y({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Sd,cleanupSelectors:[`.${Nh}`,`.${Rh}`],settings:k,start(){xt=!0,Dn.clear(),w(Sd,wd),Ti=new AbortController,document.addEventListener("click",Qh,{signal:Ti.signal}),_d(40),Ed.debug("started")},onSettingsChange(){Dn.clear(),Hi?.(),xt&&(Ms(),Cs())},stop(){xt=!1,Ti?.abort(),Ti=null,_n&&cancelAnimationFrame(_n),_n=0,Mi&&cancelAnimationFrame(Mi),Mi=0;for(let t of pe.values())t.disconnect();pe.clear(),Yt?.disconnect(),Yt=null,Fn=null,Ot?.disconnect(),Ot=null,Ai=null,Kh(),x(Cd),Dn.clear(),Ed.debug("stopped")}});var qn=new E("Bloom"),qd=!1,e0=Date.now(),n0=[Pl,Mc,Dc,Fc,Uc,Xc,cu,du,pu,Lu,Nu,$u,Fu,Vu,id,sd,gd,Fd];function Ri(t){return new Promise(e=>setTimeout(e,t))}function r0(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function o0(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var jd=8e3,zd=300,i0=250;async function a0(){if(be())return await Ri(zd),!0;for(;Date.now()-e0<jd;)if(await Ri(i0),be())return await Ri(zd),!0;return be()||_i()}function As(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function s0(){if(As())return!0;let t=Date.now()+jd;for(;Date.now()<t;)if(await Ri(100),As())return!0;return As()}function l0(){try{GM_registerMenuCommand?.("Bloom++ settings",Il)}catch{}}function c0(){so(()=>{jn("HostShell"),qn.info("host shell",Q)}),lo(()=>{qn.info("idle ready",Q)}),co(()=>{Pi(),jn("HostReady"),qn.info("chrome ready",Q)})}async function Hs(){await Ks()}async function Ns(){if(qd)return;qd=!0;for(let n of n0)try{el(n)}catch(r){qn.error("register failed",n.name,r)}ol(),jn("Init"),l0(),c0();let t=()=>jn("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await r0(),Pi(),qn.info("styles ready",Q),await o0(),s0().then(n=>{n&&uo()}),!await a0()){qn.warn("late islands not detected; starting default plugins",Q),Ve(),mo();return}await ul()}var Gd=typeof unsafeWindow<"u"?unsafeWindow:window,u0=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||u0){let t=Gd.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",Q);try{Object.defineProperty(Gd,"Bloom",{value:Rs,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}Hs().then(()=>Ns()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
