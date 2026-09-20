// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260920] v1.4.64
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

/* Bloom++ [20260920] v1.4.64. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Dd=Object.defineProperty;var $d=(t,e)=>{for(var n in e)Dd(t,n,{get:e[n],enumerable:!0})};var ks={};$d(ks,{REPO_URL:()=>il,Settings:()=>T,VERSION:()=>Q,contextKeyFromUrl:()=>Ft,conversationTitle:()=>nn,conversationToken:()=>et,currentConversationId:()=>R,hasDraftText:()=>mt,hasErrorToast:()=>ft,hasLateIslands:()=>ge,init:()=>Ls,initSettings:()=>Ts,isDocumentInteractive:()=>al,isStreaming:()=>D,isUserDraftEmpty:()=>ne,messageCreateTime:()=>Io,plugins:()=>Dt,requestChromeReady:()=>lo,requestIdleReady:()=>Ke,requestShellReady:()=>so,setEditorText:()=>_t,subscribeHarvest:()=>nt,watchStreamingEdge:()=>V,whenChromeReady:()=>ao,whenIdleReady:()=>io,whenShellReady:()=>oo});var Yt=new Map,Vr=!1;function _d(){return document.getElementById("bloom-root")?.shadowRoot??null}function Ns(){return document.head??null}function je(){let t=_d();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=Fd()}function Mi(t,e){if(!Vr)return;let n=Ns();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),je();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,je();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,je()}function w(t,e){let n=Yt.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},Yt.set(t,n)),Vr&&Mi(t,n)}function Ai(){if(!Ns())return!1;Vr=!0;for(let[e,n]of Yt)Mi(e,n);return je(),!0}function Rs(t){let e=Yt.get(t);e&&(e.disabled=!1,Vr&&Mi(t,e))}function Ps(t){let e=Yt.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),je())}function x(t){let e=Yt.get(t);e&&(e.el?.remove(),Yt.delete(t),je())}function Fd(){return Array.from(Yt.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var E=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function y(t){return t}var Hi=new Map;function Yr(t,e){let n=Hi.get(t);return n||(n=new Set,Hi.set(t,n)),n.add(e),()=>n.delete(e)}function pe(t,e){let n=Hi.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var qd="bloompp";function Is(){return new Promise((t,e)=>{let n=indexedDB.open(qd,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function Os(t){try{let e=await Is();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function Bs(t,e){try{let n=await Is();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function Ge(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function G(t,e,n){return Math.min(n,Math.max(e,t))}function Ds(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function $s(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function _s(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var Xr=new E("SettingsStore"),Xt="BloomSettings",zd=100;function Zr(t){return t!=null&&typeof t.then=="function"}function jd(t){if(t==null||Zr(t))return null;if(Ge(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(Ge(e)&&!Zr(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return Ge(n)&&!Zr(n)?n:null}return null}catch{return null}}function Qr(t){let e=jd(t);if(!e)return null;let n=e.plugins;return!Ge(n)||Zr(n)||Object.keys(n).length===0?null:e}var Jr=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let d=l.slice(c.length+1);if(d&&!d.includes(".")){let f=u(d);f!==void 0&&(i[a]=f,s=f);break}}}return Ge(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){Xr.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},zd))}save(){try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(Xt,this.plain)}catch{try{GM_setValue(Xt,e)}catch(n){Xr.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(Xt,e)}catch{}Bs(Xt,e).catch(n=>Xr.warn("Failed to save settings to IndexedDB:",n))}catch(e){Xr.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){Ds(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var Gd=new E("Settings"),Ud={plugins:{}},T=new Jr(structuredClone(Ud)),Kd=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function Wd(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function S(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?(T.store.plugins[n]||(T.store.plugins[n]={}),T.store.plugins[n]):{}},get plain(){let n=e.pluginName;return n?T.plain.plugins[n]??{}:{}}};return e}async function Vd(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function Fs(){let t=Qr(await Vd(Xt));if(t||(t=Qr(await Os(Xt))),!t)try{t=Qr(localStorage.getItem(Xt))}catch{t=null}if(!t)return;let e=t.plugins;e&&(T.plain.plugins=e,Gd.debug("Loaded settings"))}function qs(t,e){e&&(e.pluginName=t,T.plain.plugins[t]||(T.plain.plugins[t]={}),T.setDefaultGetter(Kd(t),n=>{if(n!=="enabled")return Wd(e.def,n)}))}function zs(){return T.plain.plugins.Settings||(T.store.plugins.Settings={}),T.store.plugins.Settings}function to(){return zs().pinnedPlugins??[]}function js(t){return to().includes(t)}function Gs(t){let e=to(),n=e.includes(t);return T.store.plugins.Settings={...T.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function eo(){return zs().starredPlugins??[]}function Us(t){return eo().includes(t)}function Ks(t){let e=eo(),n=e.includes(t);return T.store.plugins.Settings={...T.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var no=new E("PluginManager"),Dt={},zn=new Set;function Ys(t){if(Dt[t.name]){no.warn("Duplicate plugin",t.name);return}Dt[t.name]=t,qs(t.name,t.settings)}function Ue(t){let e=Dt[t];if(!e)return!1;if(e.required)return!0;let n=T.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function Xs(t){let e=Dt[t];if(!e||e.required)return;let n=!Ue(t);T.plain.plugins[t]||(T.store.plugins[t]={}),T.store.plugins[t].enabled=n,n?Zs(e):Yd(e),pe("pluginToggle",{name:t,enabled:n})}function Zs(t,e=!1){if(!zn.has(t.name)&&Ue(t.name))try{t.managedStyle&&Rs(t.managedStyle),t.start?.(),zn.add(t.name),t.settings&&T.addPrefixChangeListener(`plugins.${t.name}.`,()=>{zn.has(t.name)&&t.onSettingsChange?.()}),e||no.debug("Started",t.name)}catch(n){no.error("Failed to start",t.name,n)}}function Yd(t){if(zn.has(t.name)){try{t.stop?.()}catch(e){no.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(Ps(t.managedStyle),x(t.managedStyle)),zn.delete(t.name)}}function jn(t){for(let e of Object.values(Dt))(e.startAt??"DOMContentLoaded")===t&&Zs(e)}var Ws=2,Vs="defaultsRev";function Js(){let t=T.plain.plugins.Settings;if(!(!t||t[Vs]===Ws)){for(let e of["NoShareLink","NoDictation"]){let n=T.plain.plugins[e];!n||typeof n.enabled=="boolean"||(n.enabled=!1)}t[Vs]=Ws}}var Gn=!1,ro=!1,Ni=!1,tl=[],el=[],nl=[];function Ri(t){let e=t.splice(0);for(let n of e)n()}function Un(){Gn||(Gn=!0,Ri(tl))}function Pi(){ro||(ro=!0,Gn||Un(),Ri(el))}function rl(){Ni||(Ni=!0,Gn||Un(),ro||Pi(),Ri(nl))}function oo(t){Gn?t():tl.push(t)}function io(t){ro?t():el.push(t)}function ao(t){Ni?t():nl.push(t)}function so(){Un()}function Ke(){Un(),Pi()}function lo(){rl()}function Qs(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function ol(){await Qs(4e3),Un(),await Qs(4e3),Pi(),rl()}var v={p:"0-V-linuxdo"},Q="[20260920] v1.4.64",il="https://github.com/0-V-linuxdo/Bloom";function Xd(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Zd(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function Ii(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function ge(){return Ii()?Xd()||Zd():!1}function al(){return ge()}var Jd=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),sl=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Qd=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),tm="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function Ve(t){return t.id==="bloom-root"||!!t.closest(tm)}function ll(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function co(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function Oi(t){if(!(t instanceof HTMLElement)||!t.isConnected||Ve(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&co(e)?!1:t.getClientRects().length>0}function We(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function em(){let t=[];for(let e of document.querySelectorAll(Jd))!(e instanceof HTMLElement)||!e.isConnected||Ve(e)||t.push(e);return t}function uo(t){if(!t.isConnected||Ve(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function be(){return em().filter(uo)[0]??null}function Ye(){let t=document.getElementById("stage-sidebar-tiny-bar");if(!(t instanceof HTMLElement)||!t.isConnected||Ve(t))return null;let e=t.getBoundingClientRect();return e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3?null:t}function Bi(t){let e=t,n=t.parentElement;n&&n.children.length===1&&!Ve(n)&&!We(n)&&n.parentElement&&!We(n.parentElement)&&(e=n);let r=e.parentElement;if(r&&!We(r)&&!Ve(r)&&r.children.length>1){let o=r.getAttribute("class")||"";if(/\bflex\b/.test(o)&&!/flex-col/.test(o)&&r.parentElement&&!We(r.parentElement))return r}return e}function Xe(){let t=document.querySelectorAll(sl);for(let n of t)if(Oi(n)&&!co(n)&&ll(n))return n;let e=document.querySelectorAll(Qd);for(let n of e){if(!Oi(n)||!ll(n)||co(n))continue;let r=n.querySelector(sl);return Oi(r)&&!co(r)?r:n}return null}function mo(){let t=be();if(t){let e=Bi(t),n=e.parentElement;if(n&&!We(n))return n;if(!We(e))return e}return Ye()}function fo(t){let e=be();return e?t.composedPath().includes(e):!1}var $i=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],nm={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function rm(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function om(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function Di(t){let e=rm(t);return e?om(e)>.55?"light":"dark":null}function im(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=Di(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=Di(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Di(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function cl(t){return t==="auto"?im():t}function am(t){try{let e=getComputedStyle(document.documentElement);for(let n of $i){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function ul(t,e,n){let r=nm[e];if(n){am(t);for(let o of $i)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of $i)t.style.setProperty(o,r[o])}function dl(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var _i=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var lm="bloom-root",Et="bloom-rail-item",yo="bloom-account-item",ye="bloom-sidebar-panel",tr="bloom-plugin-dialog",Lo="bloom-plugin-layer",vo="bloom-settings-css",cm=2e3,pl=null,um=null,te=!1,ji=[],po=null,xo=null,Jt=null,bo=null,$t=null,Zn=null,Kn,Ze=0,Jn=0,Wn=0,Vn=null,Yn=null,wo=null,gl=null,Xn=null,Fi=[],Eo=!1,dm=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],mm=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],ko="",Qn="all",ee="all";function Co(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function bl(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function fm(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function pm(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function gm(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var bm={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function hm(t){return t.icon||bm[t.name]||Co()}function qi(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),ul(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function hl(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function So(){let t="auto",e=cl(t);qi(pl,e,!0);let n=document.getElementById(ye);n instanceof HTMLElement&&qi(n,e,!0);let r=document.getElementById(tr);r instanceof HTMLElement&&qi(r,e,!0);let o=document.getElementById(Et);o instanceof HTMLElement&&hl(o),pe("schemeChange",{scheme:e,pref:t})}function yl(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function vl(){if(w("settings",_i),document.getElementById(vo)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=vo,t.textContent=_i,document.head.appendChild(t)}function ym(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function vm(){for(let t of ji)t();ji=[]}function xl(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function xm(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function Ki(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function wm(t){return Ki(t).length>0}function ho(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function Em(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=xm(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function Sm(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(Em(e,n));let i=T.store.plugins[t]??(T.store.plugins[t]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",ji.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??ho(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??ho(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=xl(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??ho(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function ml(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function Tm(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=T.store.plugins[t.name]??(T.store.plugins[t.name]={});for(let[n,r]of Ki(t)){if(n==="enabled"||r.type===5)continue;let o=ho(r);o!==void 0&&(e[n]=o)}El(t)}function wl(t){t.key==="Escape"&&(!document.getElementById(Lo)&&!document.getElementById(tr)||(t.stopPropagation(),Je()))}function Lm(){Eo||(document.addEventListener("keydown",wl),Eo=!0)}function km(){Eo&&(document.removeEventListener("keydown",wl),Eo=!1)}function Je(){vm(),km(),document.getElementById(Lo)?.remove(),document.getElementById(tr)?.remove()}function El(t){if(Je(),!document.body)return;let e=document.createElement("div");e.id=Lo,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",Qt),e.addEventListener("pointerup",Qt),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&Je()});let n=document.createElement("div");n.id=tr,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",Qt),n.addEventListener("pointerup",Qt),n.addEventListener("click",Qt);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=bl(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),Je()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=ml("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=ml("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=Ki(t);if(c.length)for(let[u,d]of c){let f=Sm(t.name,u,d);f&&l.appendChild(f)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>Tm(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),Lm(),So()}function Cm(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=hm(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=Us(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=pm(l),c.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation();let m=Ks(t.name);pe("pluginStar",{name:t.name,starred:m})}),s.appendChild(c),!t.required){let h=js(t.name),m=document.createElement("button");m.type="button",m.className=`bloom-icon-btn bloom-card-pin${h?" bloom-card-pin-active":""}`,m.setAttribute("aria-label",h?"Unpin from top":"Pin to top"),m.innerHTML=gm(h),m.addEventListener("click",L=>{L.preventDefault(),L.stopPropagation();let A=Gs(t.name);pe("pluginPin",{name:t.name,pinned:A})}),s.appendChild(m)}if(wm(t)){let h=document.createElement("button");h.type="button",h.className="bloom-icon-btn bloom-card-settings",h.setAttribute("aria-label",`${t.name} settings`),h.innerHTML=fm(),h.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation(),El(t)}),s.appendChild(h)}let u=xl(t.name,Ue(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",h=>h.stopPropagation()),d?.addEventListener("change",()=>{Xs(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let h=document.createElement("div");h.className="bloom-card-desc",h.textContent=t.description,n.appendChild(h)}let f=document.createElement("div");f.className="bloom-card-separator";let b=document.createElement("div");b.className="bloom-card-footer";let g=document.createElement("div");return g.className="bloom-card-author",g.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",b.appendChild(g),e.append(n,f,b),e}function Sl(){return Object.values(Dt).filter(t=>!t.hidden&&t.name!=="Settings")}function Tl(t,e){return e==="all"||e==="favorites"?!0:(t.tags??[]).includes(e)}function Mm(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function Am(){return ko.trim()?"No plugins match your search.":ee==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function Hm(){let t=Sl();return mm.filter(e=>e.id==="favorites"||e.id==="all"?!0:t.some(n=>Tl(n,e.id)))}function Nm(){if(Xn){Xn.replaceChildren();for(let t of Hm()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${ee===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{ee=t.id,he()}),Xn.appendChild(e)}}}function Rm(){let t=Sl();if(ee==="favorites"){let e=new Set(eo());t=t.filter(n=>e.has(n.name))}else ee!=="all"&&(t=t.filter(e=>Tl(e,ee)));return Qn==="enabled"&&(t=t.filter(e=>Ue(e.name))),Qn==="disabled"&&(t=t.filter(e=>!Ue(e.name))),t}function he(){if(!Vn)return;Nm();let t=Rm();wo&&(wo.placeholder=`Search ${t.length} plugins...`);let e=t,n=ko.trim().toLowerCase();if(n&&(e=e.filter(r=>Mm(r).includes(n))),ee!=="favorites"){let r=to();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}Vn.replaceChildren();for(let r of e)Vn.appendChild(Cm(r));Yn&&(Yn.hidden=e.length>0,Yn.textContent=Am())}function Qt(t){t.stopPropagation()}function zi(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function Wi(){document.getElementById(Et)?.setAttribute("aria-expanded",te?"true":"false")}function Pm(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function Vi(){Je(),ko="",Qn="all",ee="all",document.getElementById(ye)?.remove(),te=!1,Wi()}function Im(t){let e=document.createElement("div");e.id=t,e.addEventListener("pointerdown",Qt),e.addEventListener("pointerup",Qt),e.addEventListener("click",Qt);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-titles";let i=document.createElement("div");i.className="bloom-settings-brand";let a=document.createElement("span");a.className="bloom-settings-mark",a.innerHTML=Co();let s=document.createElement("h2");s.textContent="Bloom++",i.append(a,s);let l=document.createElement("p");l.className="bloom-settings-sub",l.textContent="Toggle features. Some need a reload. Click the sliders icon to configure.",o.append(i,l);let c=document.createElement("button");c.type="button",c.className="bloom-icon-btn",c.setAttribute("aria-label","Close"),c.innerHTML=bl(),c.addEventListener("click",Vi),r.append(o,c),n.appendChild(r);let u=document.createElement("div");u.className="bloom-plugin-tabs",n.appendChild(u);let d=document.createElement("div");d.className="bloom-search-bar";let f=document.createElement("input");f.type="search",f.className="bloom-search-input",f.setAttribute("aria-label","Search plugins"),f.placeholder="Search plugins...",f.addEventListener("input",()=>{ko=f.value,he()});let b=document.createElement("select");b.className="bloom-search-filter",b.setAttribute("aria-label","Filter plugins");for(let m of dm){let L=document.createElement("option");L.value=m.value,L.textContent=m.label,b.appendChild(L)}b.value=Qn,b.addEventListener("change",()=>{Qn=b.value,he()}),d.append(f,b),n.appendChild(d);let g=document.createElement("div");g.className="bloom-plugin-list",n.appendChild(g);let h=document.createElement("p");return h.className="bloom-tab-empty",h.hidden=!0,n.appendChild(h),e.appendChild(n),Vn=g,Yn=h,wo=f,gl=b,Xn=u,he(),e}function Om(t){t.classList.add("bloom-rail-dock")}function Bm(){let t=document.getElementById(Et);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&uo(t)?t:null}function Dm(){if(document.getElementById(ye)?.remove(),!document.body)return;let t=Im(ye);Om(t),document.body.appendChild(t),te=!0,Je(),So(),Wi(),pe("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:Q,dock:"center",rail:!!Bm()})}function Yi(){let t=document.getElementById(ye);if(t instanceof HTMLElement&&t.isConnected&&Pm(t)){Vi();return}t?.remove(),Dm()}function $m(){let t=document.createElement("button");return t.type="button",t.id=Et,t.className="bloom-rail-item",t.setAttribute("aria-controls",ye),t.setAttribute("aria-expanded",te?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${Co()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Yi()}),t}function fl(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function _m(t){let e=t.querySelector("img");if(e instanceof HTMLElement){let n=e.getBoundingClientRect();if(n.width>8&&n.height>8)return e}for(let n of t.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let r=n.getBoundingClientRect();if(r.width>8&&r.height>8)return n}return null}function Fm(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function Zt(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function Ll(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=_m(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&Zt(t,"padding-top",Math.round(i)),Number.isFinite(a)&&Zt(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));Zt(n,"width",l),Zt(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&Zt(t,"padding-left",u);let d=Fm(e,r);if(d){let f=d.getBoundingClientRect(),b=n.getBoundingClientRect(),g=Math.round(f.left-b.right);g>=0&&g<=24&&Zt(t,"gap",g)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&Zt(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&Zt(t,"gap",Math.round(l))}hl(t)}function Gi(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function qm(){if(Zn?.isConnected&&$t){$t.observe(Zn,{childList:!0});return}Ui()}function zm(t){if(Gi(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function jm(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){Wn=0;return}Wn+=1,Jn=Date.now()+Math.min(8e3,250*2**Math.min(Wn,5))})}function Gm(){Ze||Date.now()<Jn||(Ze=requestAnimationFrame(()=>{Ze=0,!(Date.now()<Jn)&&(document.getElementById(Et)?.isConnected||To())}))}function To(){if(!document.body)return;$t?.disconnect();let t=null,e=!1;try{let n=document.getElementById(Et);t=n instanceof HTMLButtonElement?n:$m();let r=be(),o=Ye();if(r){let i=Bi(r),a=i.parentElement;if(Gi(i)||a&&Gi(a))return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),fl(t),Ll(t,r)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),fl(t,!0)):t.isConnected&&!uo(t)&&(t.remove(),t=null)}finally{jm(t,e),qm(),Wi()}}function Ui(){let t=mo();!t||!zm(t)||Zn===t&&$t||($t?.disconnect(),Zn=t,$t=new MutationObserver(()=>{document.getElementById(Et)?.isConnected||Gm()}),$t.observe(t,{childList:!0}))}function Um(){To(),Ui(),Kn===void 0&&(Kn=window.setInterval(()=>{let t=document.getElementById(Et);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=Jn&&To();else{Wn=0;let e=be();e&&Ll(t,e)}Ui()},cm))}function Km(){Kn!==void 0&&(clearInterval(Kn),Kn=void 0),Ze&&cancelAnimationFrame(Ze),Ze=0,Jn=0,Wn=0,$t?.disconnect(),$t=null,Zn=null}function Wm(t){bo===t&&Jt||(Jt?.disconnect(),bo=t,Jt=new MutationObserver(()=>{if(!t.isConnected){Jt?.disconnect(),Jt=null,bo=null;return}kl(t)}),Jt.observe(t,{childList:!0}))}function kl(t){if(Wm(t),t.querySelector(`#${yo}`))return;let e=document.createElement("button");e.type="button",e.id=yo,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${Co()}<span>Bloom++</span>`,e.addEventListener("pointerdown",zi),e.addEventListener("pointerup",zi),e.addEventListener("click",n=>{zi(n),Yi()}),t.insertBefore(e,t.firstChild)}function go(){let t=Xe();return t?(kl(t),!0):!1}function Vm(t){fo(t)&&(queueMicrotask(go),requestAnimationFrame(()=>{go()}),window.setTimeout(go,60),window.setTimeout(go,180))}function Ym(){xo?.abort();let t=new AbortController;xo=t,document.addEventListener("click",Vm,{signal:t.signal})}function Xm(){xo?.abort(),xo=null,Jt?.disconnect(),Jt=null,bo=null}function Cl(){Ke(),ym(()=>{vl(),yl(),To(),Yi()})}var Ml=y({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[v.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${lm}`,`#${Et}`,`#${yo}`,`#${ye}`,`#${Lo}`,`#${tr}`,`#${vo}`,"#bloom-menu-panel"],start(){vl(),yl(),Um(),Ym(),po?.(),po=dl(So),So(),Fi=[Yr("pluginToggle",()=>{te&&he()}),Yr("pluginPin",()=>{te&&he()}),Yr("pluginStar",()=>{te&&he()})]},stop(){Km(),Xm(),po?.(),po=null;for(let t of Fi)t();Fi=[],Vi(),document.getElementById(Et)?.remove(),document.getElementById(yo)?.remove(),document.getElementById(vo)?.remove(),pl=null,um=null,Vn=null,Yn=null,wo=null,gl=null,Xn=null,te=!1}});var Mo='form[data-type="unified-composer"], form.w-full[data-type]',St=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Qe=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Al=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Hl=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Zm=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Jm='[contenteditable="false"], button, [role="button"]';function ut(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function ve(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!ut(o)))return o;return null}function Nl(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function P(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=Nl(t);return!!(Zm.test(n)||/^stop$/i.test(n))}function dt(){let e=Array.from(document.querySelectorAll(Mo)).find(ut);if(e instanceof HTMLElement)return e;let n=ve(document,St),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function U(){let t=Array.from(document.querySelectorAll(St));return t.find(ut)??t[0]??null}function Qm(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(Jm);return!!n&&n!==e&&e.contains(n)}function Xi(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&Qm(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function mt(t){let e=t??U();return e?Xi(e,e).replaceAll("\u200B","").trim().length>0:!1}function ne(t){return!mt(t)}function Ao(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function Rl(t){let e=dt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!ut(n))&&t(n))return n;return null}function re(){let t=dt(),e=ve(t,Qe)??ve(document,Qe);return e&&!P(e)?e:Rl(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!P(n);let o=Nl(n);return/^(send|send prompt|发送)$/i.test(o)&&!P(n)})}function xe(){let t=dt(),e=ve(t,Al,!0)??ve(document,Al,!0);if(e)return e;let n=ve(t,Hl)??ve(document,Hl);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&ut(r)&&P(r))return r}return Rl(P)}function tt(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>Xi(n,t)).join(`
`):Xi(t,t)}function Zi(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function _t(t,e,n=!1){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),Zi(t,n)}var Pl=/\/c\/([a-zA-Z0-9_-]{8,})/i;function et(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function Ft(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function tn(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(Pl)?.[1]??""}catch{return t.match(Pl)?.[1]??""}}function R(){let t=tn(location.pathname);if(t)return t;let n=et().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return""}var Dl=new E("Harvest"),tf=1500,ef=200,Ho=new Set,No=new Map,Ro=new Map,en=null,Po=null,er=null,Tt=0;function nf(){return typeof unsafeWindow<"u"?unsafeWindow:window}function rf(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function of(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}function $l(t){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(t)}var af=/"action"\s*:\s*"(next|continue|variant)"/i;function sf(t,e,n){return!(e!=="POST"||$l(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!af.test(n))}function lf(t,e){return e!=="GET"||$l(t)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(t)}function Il(t){return t.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function _l(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function cf(t){return typeof t=="string"?_l(t):""}function Ji(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return Ji(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function Fl(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function Ol(t,e,n){!t||!e||Ro.get(t)!==e&&(Ro.set(t,e),Fl(Ro,tf),oe({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function uf(t,e){let n=e.trim();!t||!n||No.get(t)!==n&&(No.set(t,n),Fl(No,ef),oe({type:"conversation-meta",conversationId:t,title:n}))}function nr(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)nr(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&uf(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=Ji(l.create_time??l.createTime??l.created_at);c&&u&&Ol(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=Ji(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&Ol(a,s,o),r.mapping&&typeof r.mapping=="object")nr(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&nr(l,o,n+1)}function Bl(t,e){if(t)try{nr(JSON.parse(t),e)}catch{}}function oe(t){for(let e of Array.from(Ho))try{e(t)}catch{}}async function df(t,e,n){if(n===Tt)try{let r=await t.json();if(n!==Tt)return;nr(r,e)}catch{}}async function mf(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===Tt&&oe({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===Tt;){let{done:u,value:d}=await s.read();if(u)break;if(c+=l.decode(d,{stream:!0}),!o){let b=_l(c);b&&(o=b,oe({type:"post-start",conversationId:o,url:""}))}let f=c.split(`
`);c=f.pop()??"";for(let b of f){let g=b.replace(/^data:\s*/,"").trim();!g||g==="[DONE]"||Bl(g,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===Tt&&Bl(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===Tt&&oe({type:"post-end",conversationId:o,error:i})}function ff(t,e,n){let r=rf(e),o=of(e,n),i=lf(r,o),a=sf(r,o,n?.body),s=Tt,l="";return a&&(l=cf(n?.body)||Il(r)||tn(r)||R(),oe({type:"post-start",conversationId:l,url:r})),t(e,n).then(c=>{if(s!==Tt||!i&&!a)return c;try{let u=c.clone();i?df(u,Il(r)||R(),s):mf(u,l,!c.ok,s)}catch{a&&oe({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===Tt&&oe({type:"post-end",conversationId:l,error:!0}),c})}function pf(){if(en)return;let t=nf();er=t,en=t.fetch.bind(t);let e=(n,r)=>ff(en,n,r);Po=e,t.fetch=e,Dl.debug("conversation fetch harvest hooked")}function gf(){Tt+=1,!(!en||!er)&&(Po&&er.fetch===Po&&(er.fetch=en),en=null,Po=null,er=null,Dl.debug("conversation fetch harvest unhooked"))}function nt(t){return Ho.add(t),pf(),()=>{Ho.delete(t),Ho.size===0&&gf()}}function nn(t){return t?No.get(t)??"":""}function Io(t){return t?Ro.get(t)??null:null}var jl=new E("Streaming");function cr(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!ut(e))&&(P(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function bf(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&ut(t))}function hf(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&ut(t))}function yf(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function ft(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function D(){if(xe()||cr()||yf())return!0;let t=re();return t&&ut(t)&&!P(t)?!1:!!(bf()||hf())}var vf=400,ql=3,Se=new Set,or,ir=null,Qi=null,Ee=!1,we=0,ie="",Lt="",ar=!1,sr=!1,lr=!1;function Gl(){return Ft(et())}function zl(t,e){return{streaming:t,contextKey:e,conversationId:R()}}function X(t,e){if(!t||t===e)return!1;if(t.endsWith("|draft")&&!e.endsWith("|draft"))return!0;try{let n=t.split("|")[0],r=e.split("|")[0],o=new URL(n).pathname.replace(/\/$/,"")||"/",i=new URL(r).pathname.replace(/\/$/,"")||"/";if((o==="/"||o==="")&&i.startsWith("/c/"))return!0}catch{}return!1}function ta(){Ee=!1,we=0,ie="",ar=!1,sr=!1,lr=!1}function xf(t){for(let e of Array.from(Se))try{e.onFall?.(t)}catch{}}function wf(t){for(let e of Array.from(Se))try{e.onRise?.(t)}catch{}}function rr(t){for(let e of Array.from(Se))try{e.onTick?.(t)}catch{}}function Ef(t,e){for(let n of Array.from(Se))try{n.onContext?.(t,e)}catch{}}function Sf(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&P(n)&&(ar=!0)}function Tf(t){t.type==="post-end"&&Ee&&(lr=!0,t.error&&(sr=!0))}function Lf(){let t=Gl(),e=D();if(Lt&&t&&Lt!==t){if(Ef(t,Lt),!X(Lt,t)){ta(),Lt=t,rr(zl(e,t));return}ie===Lt&&(ie=t)}Lt=t;let n=zl(e,t);if(e){let i=!Ee;i&&(ar=!1,sr=!1,lr=!1),Ee=!0,we=0,ie=t,i&&wf(n),rr(n);return}if(!Ee){rr(n);return}if(we+=1,lr&&(we=Math.max(we,ql)),we<ql){rr(n);return}let r=!!ie&&ie===t,o={contextKey:ie||t,conversationId:R(),userStopped:ar,error:sr||ft()};ta(),r&&xf(o),rr(n)}function kf(){or===void 0&&(Ee=D(),Lt=Gl(),ie=Ee?Lt:"",we=0,ar=!1,sr=!1,lr=!1,ir?.abort(),ir=new AbortController,document.addEventListener("click",Sf,{capture:!0,signal:ir.signal}),Qi=nt(Tf),or=setInterval(Lf,vf),jl.debug("watchStreamingEdge started"))}function Cf(){Se.size||(or!==void 0&&(clearInterval(or),or=void 0),ir?.abort(),ir=null,Qi?.(),Qi=null,ta(),Lt="",jl.debug("watchStreamingEdge stopped"))}function V(t){let e=typeof t=="function"?{onFall:t}:t;return Se.add(e),kf(),()=>{Se.delete(e),Cf()}}var Ul="bloom-host-icon",ur="data-bloom-host-rel",ea="not all",na=0,Kl=0,Mf=400;function Wl(t){na+=1;try{t()}finally{na-=1}}function Oo(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function ae(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function Vl(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function Af(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Hf(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-Kl<Mf||(Kl=n,t.appendChild(e))}function Nf(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||Oo(n)&&(n.getAttribute(ur)||n.setAttribute(ur,n.rel),n.media!==ea&&(n.media=ea),n.rel!==Ul&&(n.rel=Ul))}function Rf(t){for(let e of t.querySelectorAll(`link[${ur}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(ur);n&&(e.rel=n),e.removeAttribute(ur),e.media===ea&&e.removeAttribute("media")}}function Yl(t,e){let{head:n}=document;!n||!e||Wl(()=>{Nf(n,t);let r=Vl(t),{type:o,sizes:i}=Af(e);r?Hf(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function Xl(t,e){let{head:n}=document;n&&Wl(()=>{Vl(t)?.remove(),Rf(n)})}function Zl(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(na)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:Oo(c.target)&&(a=!0,ae(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)Oo(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)Oo(u)&&u.id!==t&&(a=!0,ae(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var Pf=["original","badge","dot","hole","bg"],tc=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],ec={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Bo="#FCFCFC",If="#111111",Jl="#111111",Of="#ffffff",Bf="#212121",Df="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",$f={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Do=32,Ql=64;function nc(t){return typeof t=="string"&&Pf.includes(t)}function _f(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function $o(t){let e=document.createElement("canvas");e.width=Do,e.height=Do;let n=e.getContext("2d");return n?(n.scale(Do/Ql,Do/Ql),t(n),e.toDataURL("image/png")):""}function Ff(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function _o(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(Df);n&&(t.strokeStyle=If,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function qf(t,e,n){let r=ec[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=Jl,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=Jl,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=Of,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function dr(t,e){if(t==="original")return e==="wait"?$o(r=>_o(r,Bo)):_f($f[e]);let n=e==="wait"?void 0:ec[e];return $o(t==="hole"?r=>_o(r,n??Bo):t==="bg"?r=>{r.fillStyle=n??Bf,Ff(r,0,0,64,64,14),r.fill(),_o(r,Bo,!1)}:r=>{_o(r,Bo),e!=="wait"&&qf(r,e,t==="dot"?"dot":"badge")})}function rc(t){return{wait:dr(t,"wait"),rotate:dr(t,"rotate"),done:dr(t,"done"),ready:dr(t,"ready"),error:dr(t,"error")}}var zf=new E("ChatStateFavicons"),ke="bloom-chat-state-favicon",cc=["input","beforeinput","cut","paste","compositionend"],uc=S({style:{type:3,description:"Favicon overlay",options:tc}}),Ct="",oa={wait:"",rotate:"",done:"",ready:"",error:""},mr="wait",Te=!1,kt=!1,K=null,rt="",ot="",Ce=!0,rn=null,it=0,Fo=null,qo=null,Le=null,ra=null,on=null,gt=!1,oc=new WeakSet;function jf(){let t=uc.store.style;return nc(t)?t:"bg"}function dc(){let e=document.querySelector(`link[rel~="icon"]:not(#${ke}), link[data-bloom-host-rel]:not(#${ke})`)?.href;return ae(e)?e:ae(Ct)?Ct:""}function Gf(){let t=document.getElementById(ke);return t instanceof HTMLLinkElement?t:null}function Uf(){if(!ae(Ct)){let t=dc();t&&(Ct=t)}return ae(Ct)?Ct:oa.wait}function mc(t){return t==="wait"?Uf():oa[t]}function fc(){Yl(ke,mc(mr))}function pt(t){let e=mc(t);if(mr===t){let n=Gf();if(n&&n.getAttribute("href")===e)return}mr=t,fc()}function ic(){oa=rc(jf()),pt(mr)}function pc(){return Ft(et())}function ia(t,e){!t||!e||t===e||(K===t&&(K=e),rt===t&&(rt=e),ot===t&&(ot=e))}function Kf(){let t=pc();return D()||Te||kt?(rt&&t&&rt!==t&&X(rt,t)?(ia(rt,t),rt=t):!rt&&t&&(rt=t),rt||t):(rt="",t)}function ac(t){return!K||!t||K===t?!0:X(K,t)}function gc(){Te=!1,kt=!1,K=null,rt=""}function bc(t){ot=t,gc(),Ce=!1,pt("wait")}function sc(t){return!t&&Ce}function Wf(){if(!gt)return;let t=pc();if(ot&&t&&ot!==t&&!X(ot,t)){bc(t);return}ot&&t&&X(ot,t)&&ia(ot,t),t&&(ot=t);let e=Kf(),n=D(),r=ne();if(ft()&&!n){pt("error"),Te=!1,kt=!1,K=null;return}if(n){Te||(Ce=!1),Te=!0,kt=!1,K=e,pt("rotate");return}if(Te){let o=ac(e);if(Te=!1,o){kt=!0,K=e,pt("done");return}kt=!1,K=null}if(kt)if(K&&e&&!ac(e))kt=!1,K=null;else if(r){K=e||K,pt("done");return}else if(sc(r)){kt=!1,pt("ready");return}else{kt=!1,pt("wait");return}K=null,r?pt("wait"):sc(r)?pt("ready"):pt("wait")}function se(){gt&&(wc(),yc(),vc(),Wf())}function hc(){if(on){for(let t of cc)on.removeEventListener(t,xc,!0);on=null}}function yc(){let t=dt(),e=t&&t!==document.body?t:null;if(!(on===e&&e?.isConnected)&&(hc(),!!e)){on=e;for(let n of cc)on.addEventListener(n,xc,{capture:!0,passive:!0})}}function vc(){let t=dt();if(!(Le&&ra===t&&t.isConnected)){if(Le?.disconnect(),ra=t,!t||t===document.body){Le=null;return}Le=new MutationObserver(()=>zo()),Le.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function zo(){if(gt){if(document.hidden){it&&(cancelAnimationFrame(it),it=0),se();return}it||(it=requestAnimationFrame(()=>{it=0,gt&&se()}))}}function xc(){mt()&&(Ce=!0),zo()}function lc(){mt()&&(Ce=!0),zo()}function Vf(){gt&&(it&&(cancelAnimationFrame(it),it=0),se())}function Yf(){gt&&(Ce=!1,se())}function Xf(){gt&&se()}function Zf(){gt&&se()}function Jf(t,e){if(gt){if(X(e,t)){ia(e,t),ot=t,se();return}bc(t)}}function wc(){let t=U();!t||oc.has(t)||(oc.add(t),t.addEventListener("input",lc,{capture:!0,passive:!0}),t.addEventListener("compositionend",lc,{capture:!0,passive:!0}))}var Ec=y({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:uc,startAt:"DOMContentLoaded",cleanupSelectors:[`#${ke}`],start(){gt=!0,Ct=dc()||Ct,ic(),qo?.disconnect(),qo=Zl(ke,t=>{ae(t)&&(Ct=t),fc()}),rn?.abort(),rn=new AbortController,window.addEventListener("popstate",zo,{signal:rn.signal}),document.addEventListener("visibilitychange",Vf,{signal:rn.signal}),wc(),yc(),vc(),Fo?.(),Fo=V({onRise:Yf,onFall:Xf,onTick:Zf,onContext:Jf}),se(),zf.debug("favicon watch started")},stop(){gt=!1,it&&cancelAnimationFrame(it),it=0,Fo?.(),Fo=null,rn?.abort(),rn=null,hc(),Le?.disconnect(),Le=null,ra=null,qo?.disconnect(),qo=null,gc(),ot="",Ce=!0,mr="wait",Xl(ke,Ct)},onSettingsChange:ic});var Sc=`.bloom-ih-hud {
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
`;var vy=new E("InputHistory"),aa=/\u200B/g,Tc=10,Lc=500,kc=100,tp=8,ep=120,np=2e3,jo=10,Go=S({maxEntries:{type:4,description:"Max stored prompts",min:Tc,max:Lc,default:kc},history:{type:5,description:"Stored prompts",render:hp},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),sa=new Map,$=0,la="",Mt=!1,pr=!1,da=0,fr=null,ca,ma=null,Cc=!0;function bt(){let t=Go.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Mc(t){let e=G(Number(Go.store.maxEntries??kc),Tc,Lc);return t.length>e?t.slice(t.length-e):t}function Uo(t){Go.store.entries=Mc(t)}function rp(t){return t.replaceAll(aa,"").replace(/\n$/,"").trim()}function ua(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(St);return n instanceof HTMLElement?n:U()}function op(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!tt(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(aa,"").trim().length===0,last:i.toString().replaceAll(aa,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Ac(t){clearTimeout(ca),ca=setTimeout(()=>{if(t!==da)return;pr=!1;let e=ma;e&&Zi(e,Cc)},ep)}function Hc(t,e,n){pr=!0,ma=t,Cc=n;let r=++da;_t(t,e,n),Ac(r)}function ip(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function an(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function ap(){document.querySelector(".bloom-ih-hud")?.remove()}function sp(t,e){let n=ip();n.textContent=t;let r=(e.closest("form")??dt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-tp)}px`,n.classList.add("bloom-ih-hud-on")}function fa(t){let e=rp(t);if(!e)return;let n=Date.now(),r=sa.get(e);if(r&&n-r<np)return;sa.set(e,n);let o=bt().filter(i=>i!==e);o.push(e),Uo(o),$=bt().length,Mt=!1,an()}function lp(t,e){let n=bt();if(!n.length&&t)return;$>=n.length&&(la=tt(e),$=n.length);let r=t?$-1:$+1;r<0||r>n.length||($=r,Mt=!0,Hc(e,r===n.length?la:n[r],t),r<n.length?sp(`${r+1} / ${n.length}`,e):an())}function cp(t){Mt=!1,an(),Hc(t,la,!1),$=bt().length}function up(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=ua(t.target)??ua(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&Mt&&!t.altKey&&!t.shiftKey){cp(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){fa(tt(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=bt();if(!r){let i=op(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||$<=0)||!n&&$>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),lp(n,e))}function dp(t){if(ua(t.target)){if(pr){Ac(da);return}Mt&&(Mt=!1,an(),$=bt().length)}}function mp(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(St);n instanceof HTMLElement&&fa(tt(n))}function fp(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(Qe);if(!n||!(n instanceof HTMLElement)||P(n))return;let r=U();r&&fa(tt(r))}function pp(t){if(!(!Mt||pr)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}Mt=!1,an()}}function gp(){if(fr)return;fr=new AbortController;let{signal:t}=fr,e={capture:!0,signal:t};window.addEventListener("keydown",up,e),window.addEventListener("input",dp,e),window.addEventListener("submit",mp,e),window.addEventListener("click",fp,e),window.addEventListener("pointerdown",pp,e)}function bp(t){let e=bt().slice();e.splice(t,1),Uo(e),$>e.length&&($=e.length)}function hp(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=bt().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(m=>m.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/jo));n>=l&&(n=l-1);let c=s.slice(n*jo,n*jo+jo);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let m=document.createElement("div");m.className="bloom-ih-list",c.forEach((L,A)=>{let B=i.indexOf(L),Ot=bt().length-1-B,wt=document.createElement("div");wt.className="bloom-ih-item";let Y=document.createElement("button");Y.type="button",Y.className=`bloom-ih-body${r===A?"":" bloom-ih-clamp"}`,Y.textContent=L,Y.addEventListener("click",()=>{r=r===A?-1:A,o()});let H=document.createElement("div");H.className="bloom-ih-actions";let J=document.createElement("button");J.type="button",J.title="Copy",J.textContent="C",J.addEventListener("click",()=>{$s(L)});let Bt=document.createElement("button");Bt.type="button",Bt.title="Delete",Bt.textContent="\xD7",Bt.addEventListener("click",()=>{bp(Ot),o()}),H.append(J,Bt),wt.append(Y,H),m.appendChild(wt)}),t.appendChild(m)}else{let m=document.createElement("p");m.className="bloom-ih-empty",m.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(m)}let d=document.createElement("div");d.className="bloom-ih-pager";let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Prev",f.disabled=n<=0,f.addEventListener("click",()=>{n-=1,o()});let b=document.createElement("span");b.textContent=`${n+1} / ${l}`;let g=document.createElement("button");g.type="button",g.className="bloom-ih-btn",g.textContent="Next",g.disabled=n+1>=l,g.addEventListener("click",()=>{n+=1,o()});let h=document.createElement("button");h.type="button",h.className="bloom-ih-clear",h.textContent="Clear all",h.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Uo([]),$=0,o())}),d.append(f,b,g,h),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var Nc=y({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:Go,startAt:"HostReady",managedStyle:"inputHistory",start(){w("inputHistory",Sc),$=bt().length,Mt=!1,gp()},stop(){fr?.abort(),fr=null,an(),ap(),sa.clear(),clearTimeout(ca),pr=!1,ma=null,Mt=!1},onSettingsChange(){let t=bt(),e=Mc(t);e.length!==t.length&&Uo(e),$>e.length&&($=e.length)}});var pa="noShareLink",yp=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],vp=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],ga=S({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Rc(t){return`${t.join(",")}{display:none!important}`}function Pc(){let t=[];if(ga.store.hideShareChat!==!1&&t.push(Rc(yp)),ga.store.hideShareProject!==!1&&t.push(Rc(vp)),!t.length){x(pa);return}w(pa,t.join(`
`))}var Ic=y({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:ga,start:Pc,onSettingsChange:Pc,stop(){x(pa)}});var Dc="noDictation",xp=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],wp=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],$c=S({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Oc(t){return`${t.join(",")}{display:none!important}`}function Bc(){let t=[Oc(xp)];$c.store.hideDictationSettings!==!1&&t.push(Oc(wp)),w(Dc,t.join(`
`))}var _c=y({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:$c,start:Bc,onSettingsChange:Bc,stop(){x(Dc)}});var ba="noSidebarIdentity",sn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],zc=sn.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),jc=sn.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),Ep=[...zc,...jc],Sp=[...zc,...sn.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],Tp=sn.map(t=>`${t} a[href^="mailto:"]`),Lp=sn.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),kp=sn.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),gr=S({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function Fc(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Cp(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function Mp(){return`${kp.join(",")}{margin-block:auto!important}`}function Ap(){return`${Lp.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function qc(){let t=gr.store.hideUsername!==!1,e=gr.store.hideEmail!==!1,n=t&&gr.store.enlargePlan!==!1,r=t&&gr.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(Cp([...Sp,...jc])),o.push(Mp())):o.push(Fc(Ep))),e&&o.push(Fc(Tp)),n&&o.push(Ap()),!o.length){x(ba);return}w(ba,o.join(`
`))}var Gc=y({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:gr,start:qc,onSettingsChange:qc,stop(){x(ba)}});var Uc=`#bloom-rt-host {
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
`;var Vc=new E("RecentTopics"),un="bloom-rt-host",Yc="home",Xc=/^\/c\/([a-z0-9_-]{8,})/i,Np=/\/c\/([a-z0-9_-]{8,})/i,Zc=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Rp=new Set(["Backquote","IntlBackslash"]),Pp=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Ip=140,Op=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),_=S({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Op},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),Ko=null,ya=null,Z=!1,wr=!1,br=!1,At=0,Me="",ln=null,hr=null,cn,ha=null;function Bp(){let t=Number(_.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function yr(){let t=_.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function va(){let t=_.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Jc(){let t=_.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function xa(){let t=_.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Vo(t){let e=Bp();return t.length>e?t.slice(0,e):t}function Ht(t){return t===Yc}function vr(t,e=Ip){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function wa(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(Xc)?.[1]??""}catch{return t.match(Np)?.[1]??""}}function Ae(){let t=(location.pathname||"/").match(Xc);if(t?.[1])return t[1];let n=et().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return Yc}function Ea(t){if(Ht(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(wa(r.getAttribute("href")||"")!==t)continue;let o=vr(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return Ae()===t&&e&&!/^ChatGPT$/i.test(e)?vr(e,80):""}function Dp(t){if(Ht(t))return"New chat";let e=va()[t];if(e)return e;let n=nn(t);return n||Ea(t)||"Chat"}function $p(t){return xa()[t]||""}function _p(t){return Jc()[t]||{}}function Sa(t,e){if(!t||Ht(t)||!e||/^new chat$/i.test(e.trim()))return;let n=va();n[t]!==e&&(n[t]=e,_.store.titles=n)}function Fp(t){t.type==="conversation-meta"&&(Sa(t.conversationId,t.title),Z&&dn())}function qp(t,e){if(!t||Ht(t)||!e)return;let n=xa();n[t]!==e&&(n[t]=e,_.store.projects=n)}function zp(t,e){if(!t||Ht(t)||!e.user&&!e.assistant)return;let n=Jc(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,_.store.previews=n)}function Ta(t){if(!t||Ht(t)&&_.store.includeHome===!1)return;let e=yr().filter(n=>n!==t);e.unshift(t),_.store.visits=Vo(e)}function Yo(){let t=_.store.includeHome!==!1;return Vo(yr().filter(n=>t||!Ht(n))).map(n=>({id:n,title:Dp(n),project:$p(n),preview:_p(n)}))}function Kc(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return vr(o)}catch{return""}}function xr(t){if(!t||Ht(t)||t!==Ae())return;let e=Ea(t);e&&Sa(t,e);let n=Kc("user"),r=Kc("assistant");zp(t,{user:n,assistant:r});let o=tu(t);if(o){let i=Qc(o);i&&qp(t,i)}}function La(){let t=va(),e=xa(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${un}, #bloom-root, #bloom-sidebar-panel`))continue;let u=wa(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=vr(c.textContent||"",80);d&&!Zc.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let f=Qc(c);f&&e[u]!==f&&(e[u]=f,i=!0)}}catch{}o&&(_.store.titles=t),i&&(_.store.projects=e);let a=yr(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(_.store.visits=Vo([...a,...l]))}function Qc(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=vr((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!Zc.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function tu(t){if(Ht(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(wa(e.getAttribute("href")||"")===t)return e}catch{}return null}function jp(t){let e=tu(t);if(e){e.click();return}if(Ht(t)){location.assign("/");return}location.assign(`/c/${t}`)}function Gp(){let t=Ae();Me&&Me!==t&&xr(Me),Me=t,Ta(t),La();let e=Ea(t);e&&Sa(t,e),xr(t)}function Wo(){cn===void 0&&(cn=window.setTimeout(()=>{cn=void 0,Gp()},120))}function Up(){ln||(ln=history.pushState.bind(history),hr=history.replaceState.bind(history),history.pushState=function(...e){let n=ln(...e);return Wo(),n},history.replaceState=function(...e){let n=hr(...e);return Wo(),n})}function Kp(){ln&&(history.pushState=ln),hr&&(history.replaceState=hr),ln=null,hr=null}function Wp(t){return Rp.has(t.code)||t.keyCode===192?!0:Pp.has(t.key)}function eu(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function Vp(t,e){wr=e,La(),xr(Ae()),Z=!0,At=0;try{let n=Ae();Ta(n);let r=Yo();r.length>1&&(At=t?r.length-1:1)}catch(n){Vc.error("Failed to open switcher:",n)}dn()}function Wc(t){let{length:e}=Yo();e&&(At=(At+(t?-1:1)+e)%e,dn())}function ka(){if(!Z)return;let t=Yo()[At];Z=!1,wr=!1,dn(),t&&jp(t.id)}function nu(){Z&&(Z=!1,wr=!1,dn())}function Yp(t){if(eu(t)){br=!0;return}if((t.ctrlKey||br)&&!t.altKey&&!t.metaKey&&Wp(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{Z?Wc(t.shiftKey):Vp(t.shiftKey,!0)}catch(n){Vc.error("Hotkey failed:",n)}return}if(Z){if(t.key==="Escape"){t.preventDefault(),nu();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),ka();return}t.key==="Tab"&&(t.ctrlKey||br)&&(t.preventDefault(),Wc(t.shiftKey))}}function Xp(t){eu(t)&&(br=!1,Z&&wr&&ka())}function Zp(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(Wo)}function Jp(t){!Z||(t.target instanceof Element?t.target:null)?.closest(`#${un}`)||nu()}function Qp(){document.visibilityState==="hidden"&&xr(Ae())}function tg(){if(!document.body)return null;let t=document.getElementById(un);if(t instanceof HTMLElement)return ya=t,t;t=document.createElement("div"),t.id=un;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),ya=t,t}function dn(){let t=tg();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!Z){e.dataset.visible="false",e.replaceChildren();return}let n=Yo();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}At>=n.length&&(At=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===At?"true":"false",s.setAttribute("aria-selected",a===At?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{At=a,ka()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function eg(){document.getElementById(un)?.remove(),ya=null}var ru=y({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${un}`],settings:_,start(){w("recentTopics",Uc),Me=Ae(),Ta(Me),La(),xr(Me),ha=nt(Fp),Up(),Ko=new AbortController;let{signal:t}=Ko;window.addEventListener("keydown",Yp,{capture:!0,signal:t}),window.addEventListener("keyup",Xp,{capture:!0,signal:t}),window.addEventListener("popstate",Wo,{signal:t}),document.addEventListener("click",Zp,{capture:!0,signal:t}),document.addEventListener("click",Jp,{signal:t}),document.addEventListener("visibilitychange",Qp,{signal:t})},stop(){Ko?.abort(),Ko=null,cn!==void 0&&(clearTimeout(cn),cn=void 0),Kp(),ha?.(),ha=null,Z=!1,wr=!1,br=!1,eg()},onSettingsChange(){let t=Vo(yr());t.length!==yr().length&&(_.store.visits=t),Z&&dn()}});var Ca="cleaner",ng=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],rg=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],og=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],ig=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],ag=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],sg=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],He=S({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function mn(t){return`${t.join(",")}{display:none!important}`}function ou(){let t=[];if(He.store.hideDownloadApps!==!1&&t.push(mn(ng)),He.store.hideDisclaimer!==!1&&t.push(mn(rg)),He.store.hideUpgrade!==!1&&t.push(mn(og)),He.store.hideLockedModels!==!1&&t.push(mn(ig)),He.store.hideHomePromo!==!1&&t.push(mn(ag)),He.store.hideAds!==!1&&t.push(mn(sg)),!t.length){x(Ca);return}w(Ca,t.join(`
`))}var iu=y({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:He,start:ou,onSettingsChange:ou,stop(){x(Ca)}});var Zo=new E("ResponseNotification"),pn=S({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:pg},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Ma=!1,Xo=null,fn=null,Er=null;function lg(){return document.visibilityState==="hidden"||document.hidden}function cg(){return pn.store.onlyWhenHidden===!1?!0:lg()}function ug(){let t=nn(R());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function au(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!fn||fn.state==="closed")&&(fn=new t);let e=fn,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){Zo.debug("chime failed",t)}}function dg(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){Zo.debug("custom sound failed",e),au()}}function su(){let t=String(pn.store.soundUrl||"").trim();t?dg(t):au()}function mg(){let t="Bloom++",e=`${ug()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){Zo.debug("notification failed",n)}}function fg(){cg()&&(pn.store.sound!==!1&&su(),pn.store.browserNotification!==!1&&mg())}function pg(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>su()),t.appendChild(e),()=>{e.remove()}}var lu=y({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:pn,start(){Ma=!0,Xo?.(),Xo=V(t=>{Ma&&(t.userStopped||t.error||fg())}),Er?.abort(),Er=new AbortController,pn.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:Er.signal}),Zo.debug("watch started")},stop(){Ma=!1,Xo?.(),Xo=null,Er?.abort(),Er=null;try{fn?.close()}catch{}fn=null}});var cu=`#bloom-pq-chip {
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
`;var kr=new E("PromptQueue"),Ha="bloom-pq-chip",uu="promptQueue",du=80,bg=50,hg=2e3,gu=S({replacePending:{type:2,description:"Replace the queued prompt if you Enter again while one is waiting.",default:!0}}),q=new Map,qt=!1,ht="",F="",ce=!1,yt=!1,O=null,Sr=null,Jo=null,Lr,Tr,gn=null;function bn(){return Ft(et())}function hn(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function mu(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(St);return n instanceof HTMLElement?n:U()}function Na(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function bu(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function yg(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?hn(e.innerText||e.textContent||""):""}catch{return""}}function fu(t){if(!ht||ht===t)return;let e=q.get(ht);!e||q.has(t)||X(ht,t)&&(q.delete(ht),q.set(t,e),F===ht&&(F=t),O?.key===ht&&(O.key=t),kr.debug("migrated pending",ht,"\u2192",t))}function Ra(t){let e=bn();if(q.get(e)&&gu.store.replacePending===!1)return;q.set(e,{text:t,at:Date.now()}),O={key:e,text:t,turns:bu(),ticks:3};let r=U();r&&_t(r,""),le(),kr.debug("queued",e,t.length)}function vg(t){q.delete(t),F===t&&(F=""),O?.key===t&&(O=null),le()}function xg(){yt=!0,clearTimeout(Tr),Tr=setTimeout(()=>{yt=!1,Tr=void 0},hg)}function wg(){let t=bn(),e=q.get(t);if(!e)return;let n=U();if(!n)return;q.delete(t),F="",le(),xg(),_t(n,e.text);let r=re();r&&!P(r)&&!Ao(r)&&(r.click(),yt=!1)}function pu(t){if(!qt||ce||D()||bn()!==t)return;let e=q.get(t);if(!e){F="";return}if(ft())return;let n=U();if(!n)return;if(!ne(n)){let o=hn(tt(n));if(o&&o!==e.text)return}let r=re();!r||P(r)||Ao(r)||(ce=!0,_t(n,e.text),clearTimeout(Lr),Lr=setTimeout(()=>Eg(t,e.text),bg))}function Eg(t,e){Lr=void 0;try{if(!qt)return;let n=q.get(t);if(!n||n.text!==e||D()||bn()!==t)return;let r=U();if(!r)return;let o=hn(tt(r));if(o&&o!==e&&!ne(r))return;o!==e&&_t(r,e);let i=re();if(!i||P(i)||Ao(i))return;i.click(),q.delete(t),F="",le(),kr.debug("drained",t)}finally{ce=!1}}function hu(t){let e=dt();if(!e||e===document.body){t.style.left="50%",t.style.bottom="6.5rem";return}let n=e.getBoundingClientRect();t.style.left=`${Math.round(n.left+n.width/2)}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`;let r=Math.min(512,Math.max(160,n.width-24));t.style.maxWidth=`${Math.round(r)}px`}function Aa(){gn?.remove(),gn=null}function le(){if(!qt||!document.body){Aa();return}let t=bn(),e=q.get(t);if(!e){Aa();return}let n=gn;n?.isConnected||(n=document.createElement("div"),n.id=Ha,document.body.appendChild(n),gn=n),n.replaceChildren();let r=document.createElement("span");r.className="bloom-pq-kicker",r.textContent="Next";let o=document.createElement("span");o.className="bloom-pq-text";let i=e.text.length>du?`${e.text.slice(0,du)}\u2026`:e.text;o.textContent=i,o.title=e.text;let a=document.createElement("div");a.className="bloom-pq-actions";let s=document.createElement("button");s.type="button",s.className="bloom-pq-btn bloom-pq-send",s.textContent="Send now",s.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),wg()});let l=document.createElement("button");l.type="button",l.className="bloom-pq-btn bloom-pq-x",l.setAttribute("aria-label","Dismiss queued prompt"),l.textContent="\xD7",l.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),vg(t)}),a.append(s,l),n.append(r,o,a),hu(n)}function Sg(){if(!O)return;if(O.ticks-=1,q.get(O.key)&&bu()>O.turns){let e=yg();if(e&&e===O.text){kr.debug("native send leaked; dropping pending"),q.delete(O.key),F===O.key&&(F=""),O=null,le();return}}O.ticks<=0&&(O=null)}function Tg(t){if(!qt||t.isComposing||t.keyCode===229||t.key!=="Enter"||t.shiftKey||t.ctrlKey||t.metaKey||ce)return;let e=mu(t.target)??mu(document.activeElement);if(!e||!D())return;if(t.altKey||yt){yt=!1;return}if(!mt(e))return;let n=hn(tt(e));n&&(Na(t),Ra(n))}function Lg(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||P(e))return null;let n=t.closest(Qe);if(n instanceof HTMLElement&&!P(n))return n;let r=re();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function kg(t){if(!qt)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${Ha}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&P(n)||ce||!D()||!Lg(e))return;if(yt){yt=!1;return}let r=U();if(!r||!mt(r))return;let o=hn(tt(r));o&&(Na(t),Ra(o))}function Cg(t){if(!qt)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(Mo)&&!e.querySelector(St)||ce||!D())return;if(yt){yt=!1;return}let n=U()??e.querySelector(St);if(!n||!mt(n))return;let r=hn(tt(n));r&&(Na(t),Ra(r))}var yu=y({name:"PromptQueue",description:"Queue the next prompt while a reply is streaming. Enter/Send waits for this turn instead of interrupting.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:uu,cleanupSelectors:[`#${Ha}`],settings:gu,start(){qt=!0,ht=bn(),F="",ce=!1,yt=!1,O=null,w(uu,cu),Sr?.abort(),Sr=new AbortController;let{signal:t}=Sr;window.addEventListener("keydown",Tg,{capture:!0,signal:t}),document.addEventListener("click",kg,{capture:!0,signal:t}),document.addEventListener("submit",Cg,{capture:!0,signal:t}),Jo?.(),Jo=V({onFall(e){if(qt){if(e.userStopped||e.error){F="",le();return}F=e.contextKey,pu(e.contextKey)}},onContext(e){fu(e),ht=e,le()},onTick(e){fu(e.contextKey),ht=e.contextKey,Sg(),F&&F===e.contextKey&&pu(F),gn&&hu(gn)}}),le(),kr.debug("watch started")},stop(){qt=!1,Jo?.(),Jo=null,Sr?.abort(),Sr=null,clearTimeout(Lr),Lr=void 0,clearTimeout(Tr),Tr=void 0,q.clear(),O=null,F="",ce=!1,yt=!1,Aa()}});var vu=`.bloom-cls {
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
`;var Eu=new E("ChatListStatus"),xu="chatListStatus",ei="bloom-cls",Ag="bloom-cls",Hg=1200*1e3,Ng="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",Nt=new Map,Rt=!1,yn="",zt=!1,at=0,ue=null,Oa=null,vn=null,Pa=null,Qo=null,Cr=null,xn=!1,wn=new Set;function ti(){return Date.now()}function Su(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function Ne(t,e,n,r=!0){if(!(!t||!Rt)){if(e==="idle")Nt.delete(t);else{let o=Nt.get(t);o&&o.kind===e&&n!=="net"?o.at=ti():Nt.set(t,{kind:e,at:ti(),source:n})}r&&Rg({v:1,id:t,kind:e,at:ti()}),En()}}function Rg(t){try{vn?.postMessage(t)}catch{}}function Pg(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||Ne(e.id,e.kind,"bc",!1)}function Ig(){let t=ti();for(let[e,n]of Nt)n.kind==="streaming"&&t-n.at>Hg&&Nt.delete(e)}function Og(){let t=Su();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(r.closest(Ng))continue;let o=tn(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function wu(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function Ia(t){let e=t.querySelector(`:scope > .${ei}`);return e||null}function Ba(){if(!Rt)return;Ig();let t=R(),e=Og();ue?.disconnect();try{for(let n of e){let r=tn(n.getAttribute("href")||"");if(!r||!t||r!==t){Ia(n)?.remove();continue}let i=Nt.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){Ia(n)?.remove();continue}let a=Ia(n);a||(a=document.createElement("span"),a.className=ei,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(wu("streaming")):i==="error"&&a.appendChild(wu("error")))}}catch(n){Eu.debug("paint failed",n)}Tu()}function En(){if(Rt){if(document.hidden){at&&(cancelAnimationFrame(at),at=0),Ba();return}at||(at=requestAnimationFrame(()=>{at=0,Rt&&Ba()}))}}function Tu(){let t=Su();if(!(ue&&Oa===t&&t?.isConnected)){if(ue?.disconnect(),Oa=t,!t){ue=null;return}ue=new MutationObserver(()=>En()),ue.observe(t,{childList:!0,subtree:!0})}}function Da(){return!!(xe()||cr())}function Bg(t){return!!(xn||t&&wn.has(t)||Da())}function Dg(t){if(Rt){if(t.type==="post-start"){t.conversationId?(xn=!1,wn.add(t.conversationId),zt=!0,Ne(t.conversationId,"streaming","net")):(xn=!0,zt=!0);return}t.type==="post-end"&&(xn=!1,t.conversationId&&(wn.delete(t.conversationId),Ne(t.conversationId,t.error?"error":"done","net")),Da()||(zt=!1))}}function $g(t,e){if(!Rt)return;if(X(e,t)){En();return}let n=R();if(!(xn||n&&wn.has(n))){if(zt=!1,n&&Nt.get(n)?.kind==="streaming"&&Nt.get(n)?.source==="local"){Ne(n,"idle","local");return}En()}}function _g(t){if(!Rt)return;let e=t.conversationId||R();if(yn&&e&&yn!==e){let r=Nt.get(yn);r?.kind==="streaming"&&r.source==="local"&&Ne(yn,ft()?"error":"done","local"),zt=!!(e&&wn.has(e))}if(yn=e,Bg(e)&&(t.streaming||Da())){zt=!0,e&&Ne(e,"streaming","local"),En();return}zt&&(zt=!1,e&&Ne(e,ft()?"error":"done","local")),En()}var Lu=y({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${ei}`],start(){Rt=!0,w(xu,vu);try{vn=new BroadcastChannel(Ag)}catch{vn=null}vn?.addEventListener("message",Pg),Pa=nt(Dg),Qo?.(),Qo=V({onTick:_g,onContext:$g}),Cr?.abort(),Cr=new AbortController,document.addEventListener("visibilitychange",()=>{Rt&&(at&&(cancelAnimationFrame(at),at=0),Ba())},{signal:Cr.signal}),Tu(),Eu.debug("sidebar status watch started")},stop(){Rt=!1,at&&cancelAnimationFrame(at),at=0,Cr?.abort(),Cr=null,ue?.disconnect(),ue=null,Oa=null,Qo?.(),Qo=null,Pa?.(),Pa=null;try{vn?.close()}catch{}vn=null,Nt.clear(),wn.clear(),xn=!1,zt=!1,yn="",document.querySelectorAll(`.${ei}`).forEach(t=>t.remove()),x(xu)}});var Cu="widerChat",Mu=40,Au=96,Hu=64,Nu=S({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:Mu,max:Au,default:Hu}});function Fg(){return G(Number(Nu.store.width??Hu),Mu,Au)}function ku(){let t=Fg(),e=`min(100%,${t}rem)`;w(Cu,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var Ru=y({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Nu,start:ku,onSettingsChange:ku,stop(){x(Cu)}});var $a="composerOpacity",Sn='form[data-type="unified-composer"],form.w-full[data-type]',qg=[`${Sn} [class*="corner-superellipse"]`,`${Sn} [class*="bg-token-bg-primary"]`,`${Sn} [class*="bg-token-main-surface"]`].join(","),zg=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),jg="#thread-bottom-container,#thread-bottom",Gg=`${Sn} #prompt-textarea,${Sn} [contenteditable="true"]`,Ug="var(--bg-primary,var(--main-surface-primary,#ffffff))",_a=S({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function Kg(){return G(Number(_a.store.opacity??100),0,100)}function Wg(){return G(Number(_a.store.blur??16),0,40)}function Pu(){let t=Kg();if(t>=100){x($a);return}let e=Wg(),n=`color-mix(in srgb,${Ug} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";w($a,`${jg}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${zg}{display:none!important}${Sn}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${qg}{background-color:${n}!important;background-image:none!important;${r}}${Gg}{background-color:transparent!important;background-image:none!important}`)}var Iu=y({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[v.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:_a,start:Pu,onSettingsChange:Pu,stop(){x($a)}});var Ou=`#bloom-bn-host {
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
`;var Yg=new E("BetterNavigator"),Fa="betterNavigator",Bu="bloom-bn-host",Ga=60,Xg=16,Zg=1e3,Jg=2.5,Qg=.4,ri="\u6B63\u5728\u8F93\u51FA\u2026",tb=40,eb=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,nb=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),rb=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='thinking']","[class*='reasoning']","[class*='footnote']",".sr-only"].join(", "),ob=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),li=S({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),Tn=new Map,Ln=new Set,vt=!1,Ie=!1,de=null,Rr=null,Oe=null,oi=null,z=[],Be="",ii=0,ai=-1,Xa=0,si="",st=0,jt=0,Mr,Ar=null,ni=null,qa=null,za=null,Re=null,Ua=null,Hr=null,Pe=null,kn=null,Nr=null;function ci(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function ja(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function ib(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function ab(t){let e=t.getBoundingClientRect(),n=null;try{let i=t.querySelector("[data-message-id]");for(;i&&i!==t;)eb.test(ib(i))&&(n=i),i=i.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=ja(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||ja(getComputedStyle(t).getPropertyValue("--thread-content-width"))||ja(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function sb(t){try{return!!t.closest(nb)}catch{return!0}}function lb(t){let e=(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("aria-label")||"").toLowerCase();return n.includes("you said")?"user":n.includes("chatgpt said")||n.includes("assistant said")?"assistant":null}function Du(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(i.closest(rb))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return(o.textContent||"").replace(/\s+/g," ").trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<Ga+20;)e.push((r.textContent||"").replace(/\s+/g," ").trim());return e.join(" ").replace(/\s+/g," ").trim()}function cb(t,e){try{if(t.querySelector("img, picture, video, canvas"))return"Image";if(t.querySelector("a[download], [class*='attachment']"))return"File";if(t.querySelector("pre, code"))return"Code"}catch{}return`Message ${e+1}`}function ub(t,e){let n=e==="user"?t.querySelector(".whitespace-pre-wrap")??t:t.querySelector(".markdown")??t;return Du(n)}function db(t){return t.length>Ga?`${t.slice(0,Ga).trimEnd()}\u2026`:t}function mb(t,e,n,r){let o=ub(t,e);return o?db(o):r?ri:cb(t,n)}function fb(){if(Ie)return!0;let t=R();return!!(t&&Ln.has(t)||xe()||cr())}function pb(t){try{if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming")||t.querySelector("[aria-busy='true'], .result-streaming"))return!0;let e=t.querySelector(".markdown");if((!e||e instanceof HTMLElement&&!Du(e))&&t.querySelector("[class*='thinking'], [class*='reasoning'], details"))return!0}catch{}return!1}function gb(){let t=ci();if(!t||t===document.body)return[];let e=li.store.showAssistant!==!1,n=e&&fb(),r=[];try{for(let o of t.querySelectorAll("[data-message-id]")){if(sb(o))continue;let i=o.getAttribute("data-message-id")||"";if(!i)continue;let a=lb(o);if(a!=="user"&&a!=="assistant"||a==="assistant"&&!e)continue;let s=a==="assistant"&&n&&pb(o),l=mb(o,a,r.length,s);l&&l!==ri&&l!==Tn.get(i)&&Tn.set(i,l);let c=s&&l===ri?ri:Tn.get(i)||l;r.push({id:i,el:o,role:a,text:c,live:s})}}catch{}return r}function bb(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function $u(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function hb(t){return t===window?window.innerHeight:t.clientHeight}function yb(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(ob)}catch{return!1}}function _u(){Mr!==void 0&&(clearTimeout(Mr),Mr=void 0),Ar?.classList.remove("bloom-bn-flash"),Ar=null}function vb(t){_u(),t.classList.add("bloom-bn-flash"),Ar=t,Mr=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),Ar===t&&(Ar=null),Mr=void 0},800)}function Ka(t){if(!z.length)return;let e=Math.max(0,Math.min(t,z.length-1));ii=e,Rr?.querySelectorAll(".bloom-bn-tick").forEach((r,o)=>{r.classList.toggle("bloom-bn-current",o===e)}),Oe?.querySelectorAll(".bloom-bn-item").forEach((r,o)=>{r.classList.toggle("bloom-bn-active",o===e)}),oi&&(oi.textContent=`${e+1} / ${z.length}`);let n=Oe?.children[e];if(n instanceof HTMLElement){let r=Oe;if(r){let o=n.offsetTop-r.clientHeight/2+n.offsetHeight/2;r.scrollTop=Math.max(0,o)}}}function Wa(t){let e=z[t];if(!e?.el.isConnected)return;ai=t,Xa=Date.now()+Zg,Ka(t);let n=kn??$u(e.el),o=Math.abs(e.el.getBoundingClientRect().top-bb())>Jg*hb(n);e.el.scrollIntoView({behavior:o?"auto":"smooth",block:"start"}),li.store.jumpEffect!=="none"&&vb(e.el)}function Za(){if(!vt||!z.length)return;if(Date.now()<Xa&&ai>=0){Ka(ai);return}let t=window.innerHeight*Qg,e=0;for(let n=0;n<z.length;n++){let r=z[n].el;r.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}Ka(e)}function xb(t){let e=$u(t);if(kn===e&&Nr)return;Nr?.(),kn=e;let n=e===window?document:e,r=()=>{Za(),Ja()};n.addEventListener("scroll",r,{passive:!0}),Nr=()=>n.removeEventListener("scroll",r)}function wb(t){Pe?.disconnect(),Pe=null;let e=kn instanceof HTMLElement?kn:null;Pe=new IntersectionObserver(()=>Za(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el.isConnected&&Pe.observe(n.el)}function Eb(){if(!document.body)return null;let t=de;if(t?.isConnected)return t;t=document.createElement("div"),t.id=Bu,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),de=t,Rr=e,Oe=i,oi=o,t}function Fu(){let t=de,e=ci();if(!t||!e||!e.isConnected||z.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=ab(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||tb,d=n.right-r.right>=c+8?r.right+4:r.right-12-c;d=Math.min(d,n.right-c-8),d=Math.max(8,d);let f=Math.max(8,Math.round(window.innerWidth-d-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${f}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function Ja(){!vt||jt||(jt=requestAnimationFrame(()=>{jt=0,vt&&Fu()}))}function Sb(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function Tb(t){let e=Rr,n=Oe;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>Xg),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=Sb(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",c=>{c.preventDefault(),Wa(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-mark",s.textContent=r.role==="user"?"You":"GPT";let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=r.text,l.title=r.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),Wa(o)}),n.appendChild(a)}))}function Lb(t){Rr?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=Oe?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function kb(){let t=R();return t===si?!1:(si=t,Tn.clear(),z=[],Be="",ii=0,ai=-1,Xa=0,Ie&&t&&(Ln.add(t),Ie=!1),!0)}function Cb(t){let e=li.store.showAssistant!==!1?"1":"0";return`${si}|${e}|${t.map(n=>n.id).join(",")}`}function Va(){if(!vt)return;kb();let t=gb(),e=ci();if(!e||t.length<1){z=t,Be="",de&&(de.hidden=!0),Pe?.disconnect(),Ya();return}Eb();let n=Cb(t);n!==Be?(z=t,Be=n,Tb(t),xb(e),wb(t)):(z=t,Lb(t)),Fu(),Za(),Ya()}function Gt(){if(vt){if(document.hidden){st&&(cancelAnimationFrame(st),st=0),Va();return}st||(st=requestAnimationFrame(()=>{st=0,vt&&Va()}))}}function Ya(){let t=ci();if(!(Re&&Ua===t&&t?.isConnected)){if(Re?.disconnect(),Hr?.disconnect(),Ua=t,!t||t===document.body){Re=null;return}Re=new MutationObserver(()=>Gt()),Re.observe(t,{childList:!0,subtree:!0}),Hr=new ResizeObserver(()=>Ja()),Hr.observe(t)}}function Mb(t){if(vt){if(t.type==="post-start"){t.conversationId?(Ie=!1,Ln.add(t.conversationId)):Ie=!0,Gt();return}if(t.type==="post-end"){if(Ie=!1,t.conversationId)Ln.delete(t.conversationId);else{let e=R();e&&Ln.delete(e)}Gt()}}}function Ab(t){if(!vt||!z.length||de?.hidden||t.altKey||t.ctrlKey||t.metaKey||yb(t.target))return;let e=-1;if(t.key==="ArrowDown")e=ii+1;else if(t.key==="ArrowUp")e=ii-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=z.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),Wa(Math.max(0,Math.min(e,z.length-1)))}function Hb(){_u(),Pe?.disconnect(),Pe=null,Re?.disconnect(),Re=null,Ua=null,Hr?.disconnect(),Hr=null,Nr?.(),Nr=null,kn=null,de?.remove(),de=null,Rr=null,Oe=null,oi=null}var qu=y({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:Fa,cleanupSelectors:[`#${Bu}`],settings:li,start(){vt=!0,si=R(),w(Fa,Ou),ni=new AbortController;let{signal:t}=ni;window.addEventListener("keydown",Ab,{signal:t}),window.addEventListener("popstate",Gt,{signal:t}),window.visualViewport?.addEventListener("resize",Ja,{signal:t}),document.addEventListener("visibilitychange",()=>{vt&&(st&&(cancelAnimationFrame(st),st=0),jt&&(cancelAnimationFrame(jt),jt=0),Va())},{signal:t}),za=nt(Mb),qa=V({onTick(){Gt()},onFall(){Gt()},onContext(e,n){X(n,e)||(Tn.clear(),Be=""),Gt()}}),Ya(),Gt(),Yg.debug("navigator started")},stop(){vt=!1,st&&cancelAnimationFrame(st),st=0,jt&&cancelAnimationFrame(jt),jt=0,ni?.abort(),ni=null,qa?.(),qa=null,za?.(),za=null,Ln.clear(),Ie=!1,Hb(),Tn.clear(),z=[],Be="",x(Fa)},onSettingsChange(){Be="",Gt()}});var zu=`.bloom-ts {
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
`;function ju(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Gu(t){try{return new Date(t).toISOString()}catch{return""}}var Vu=new E("MessageTimestamps"),Uu="messageTimestamps",di="bloom-ts",Ku=1500,Rb="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",Cn=S({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),Mn=new Map,$e=!1,lt=0,me=null,ts=null,Qa=null,ui=null,Pr=null,Wu=!1;function Yu(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function ns(){let t=Cn.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Xu(){let t={...ns()};for(let[n,r]of Mn)t[n]=r;let e=Object.keys(t);if(e.length>Ku){let n=e.slice(e.length-Ku),r={};for(let o of n)r[o]=t[o];Cn.store.stamps=r;return}Cn.store.stamps=t}var Pb=_s(Xu,500);function Zu(t,e){!t||!e||Mn.get(t)===e||(Mn.set(t,e),Pb(),De())}function Ib(t){return t?Mn.get(t)??ns()[t]??Io(t)??null:null}function Ob(t){$e&&t.type==="message-time"&&Zu(t.messageId,t.createTime)}function Bb(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function Db(){let t=Yu();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll("[data-message-id]"))n.closest(Rb)||e.push(n)}catch{}return e}function $b(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function es(){if(!$e)return;let t=Cn.store.hideOwnMessages===!0,e=Cn.store.showDate!==!1,n=D(),r=Db();me?.disconnect();try{r.forEach((o,i)=>{let a=o.getAttribute("data-message-id")||"",s=Bb(o),l=o.querySelector(`:scope > .${di}`);if(t&&s==="user"){l?.remove();return}if($b(o)){l?.remove();return}let c=Ib(a);if(!c&&a&&(n||Wu)&&i>=r.length-2&&(c=Date.now(),Zu(a,c)),!c){l?.remove();return}let u=ju(c,e);if(!u){l?.remove();return}let d=l;d||(d=document.createElement("time"),d.className=di,d.setAttribute("aria-hidden","true"),o.insertBefore(d,o.firstChild)),d.textContent!==u&&(d.textContent=u);let f=Gu(c);f&&d.getAttribute("datetime")!==f&&d.setAttribute("datetime",f)})}catch(o){Vu.debug("paint failed",o)}Wu=n,Ju()}function De(){if($e){if(document.hidden){lt&&(cancelAnimationFrame(lt),lt=0),es();return}lt||(lt=requestAnimationFrame(()=>{lt=0,$e&&es()}))}}function Ju(){let t=Yu();if(!(me&&ts===t&&t?.isConnected)){if(me?.disconnect(),ts=t,!t||t===document.body){me=null;return}me=new MutationObserver(()=>De()),me.observe(t,{childList:!0,subtree:!0})}}var Qu=y({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${di}`],settings:Cn,start(){$e=!0,w(Uu,zu);let t=ns();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&Mn.set(e,n);Qa=nt(Ob),ui?.(),ui=V({onTick:De,onFall:De,onContext:De}),Pr?.abort(),Pr=new AbortController,document.addEventListener("visibilitychange",()=>{$e&&(lt&&(cancelAnimationFrame(lt),lt=0),es())},{signal:Pr.signal}),Ju(),De(),Vu.debug("timestamp watch started")},stop(){$e=!1,lt&&cancelAnimationFrame(lt),lt=0,Pr?.abort(),Pr=null,me?.disconnect(),me=null,ts=null,ui?.(),ui=null,Qa?.(),Qa=null,Xu(),Mn.clear(),document.querySelectorAll(`.${di}`).forEach(t=>t.remove()),x(Uu)},onSettingsChange:De});var rs="streamerMode",_b="filter:blur(6px)!important;transition:filter .2s ease",Fb="filter:none!important",An=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],Hn=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function ct(t,e){return t.map(n=>`${n} ${e}`)}var _e=S({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function Nn(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${_b}}${e?`${r}{${Fb}}`:""}`}function td(){let t=[];if(_e.store.conversations!==!1&&(t.push(Nn([...ct(Hn,'a[href^="/c/"]'),...ct(Hn,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),_e.store.projects!==!1&&(t.push(Nn([...ct(Hn,'a[href*="/project"]'),...ct(Hn,'a[href*="/g/g-p-"]'),...ct(Hn,'[data-testid="project-name"]'),...ct(Hn,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),_e.store.headerTitle!==!1&&t.push(Nn(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),_e.store.accountAvatar!==!1&&t.push(Nn([...ct(An,"img"),...ct(An,'[class*="avatar"]'),...ct(An,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),_e.store.accountName!==!1&&t.push(Nn([...ct(An,".min-w-0 > .truncate"),...ct(An,".min-w-0.flex-1 .truncate")],!1)),_e.store.accountEmail!==!1&&t.push(Nn([...ct(An,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!t.length){x(rs);return}w(rs,t.join(`
`))}var ed=y({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[v.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:_e,start:td,onSettingsChange:td,stop(){x(rs)}});var nd=`.bloom-gc-panel {
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
}`;var zb=new E("GreetingCustomizer"),Rn="greetingCustomizer",rd="greetingCustomizerUi",Ir=100,is=30,jb=120,Gb=1e3,Ub=50,Kb=40,Wb=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),Or=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),bi=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function Vb(t){return!!t?.closest(Wb)}function sd(t){return!!(Vb(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function zr(t){try{for(let e of document.querySelectorAll(t))if(!sd(e))return e}catch{}return null}function os(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(zr(e))return e;return t}var ld=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],j=S({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:uh},greetings:{type:0,description:"Greeting texts",hidden:!0,default:ld},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),Pt=!1,On=!1,qe=null,fi,Br,Pn,Dr,pi=0,mi=null,In=null,$r=null,_r=null,Fr=null,gi=null;function Kt(){let t=location.pathname||"/";return t==="/"||t===""}function Fe(){let t=j.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):ld.slice()}function qr(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function od(t){j.store.greetings=t.slice(0,is)}function jr(){let t=String(j.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function Yb(){return j.store.order==="random"?"random":"sequential"}function Xb(){return G(Number(j.store.intervalSec??10),1,3600)*1e3}function Zb(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Jb(){return!!zr(bi)}function hi(){return!!(zr(bi)||zr(Or))}function Qb(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=Jb()?os(bi):zr(Or)?os(Or):os(bi),i=e?`${Or}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function th(t,e){if(t<=0)return 0;if(t===1)return Number(j.plain.index)!==0&&(j.store.index=0),Number(j.plain.lastRandom)!==0&&(j.store.lastRandom=0),0;let n=Number(j.plain.index),r=Number(j.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(Yb()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return j.store.index=s,j.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return j.store.index=i,i}function Ut(t){if(!Pt)return;if(!Kt()){x(Rn);return}let e=Fe().map(qr).filter(Boolean);if(!e.length){x(Rn);return}let n=th(e.length,t),r=e[n]??e[0],o=jr()==="manual"&&e.length>1;w(Rn,Qb(Zb(r),o)),gi?.()}function as(){fi!==void 0&&(clearInterval(fi),fi=void 0)}function ss(){as(),!(!Pt||!Kt())&&jr()==="interval"&&(Fe().filter(Boolean).length<=1||(fi=setInterval(()=>Ut(!0),Xb())))}function ls(){Dr!==void 0&&(clearTimeout(Dr),Dr=void 0),pi=0}function id(){if(ls(),!Pt||!Kt())return;pi=Kb;let t=()=>{if(Dr=void 0,!(!Pt||!Kt())){if(hi()){jr()==="refresh"&&!On?(On=!0,Ut(!0)):Ut(!1),ss();return}pi-=1,pi>0&&(Dr=setTimeout(t,Ub))}};t()}function cs(){if(qe===!0){hi()?Ut(!1):id();return}qe=!0,On=!1,jr()==="refresh"?(On=!0,Ut(!0)):Ut(!1),ss(),hi()||id()}function us(){qe=!1,On=!1,as(),ls(),x(Rn)}function yi(){Pn===void 0&&(Pn=window.setTimeout(()=>{Pn=void 0,Pt&&(Kt()?cs():qe!==!1&&us())},jb))}function eh(){In||(In=history.pushState.bind(history),$r=history.replaceState.bind(history),_r=function(...e){let n=In(...e);return yi(),n},Fr=function(...e){let n=$r(...e);return yi(),n},history.pushState=_r,history.replaceState=Fr)}function nh(){_r&&history.pushState===_r&&In&&(history.pushState=In),Fr&&history.replaceState===Fr&&$r&&(history.replaceState=$r),In=null,$r=null,_r=null,Fr=null}function rh(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(yi)}function oh(t){if(!Pt||!Kt()||jr()!=="manual"||Fe().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(Or);if(!n||sd(n))return;let r=window.getSelection?.();r&&String(r).trim()||Ut(!0)}function ih(){Br===void 0&&(Br=setInterval(()=>{if(!Pt)return;let t=Kt();if(t!==(qe===!0)){t?cs():us();return}t&&hi()&&Ut(!1)},Gb))}function ah(){Br!==void 0&&(clearInterval(Br),Br=void 0)}function ad(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var sh="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",lh="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function ch(t,e){let n=qr(t);return n?n.length>Ir?`Keep it to ${Ir} characters.`:Fe().length+(e?1:0)>is?`At most ${is} greetings.`:null:"Enter a greeting."}function uh(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=Fe(),s=Number(j.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=Ir,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let m=l.querySelector(".bloom-gc-count");m&&(m.textContent=`${qr(e).length}/${Ir}`);let L=l.querySelector(".bloom-gc-error");L&&(L.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${qr(e).length}/${Ir}`;let f=document.createElement("span");f.className="bloom-gc-error",f.textContent=r;let b=document.createElement("div");if(b.className="bloom-gc-actions",n>=0){let m=document.createElement("button");m.type="button",m.className="bloom-gc-btn",m.textContent="Cancel",m.addEventListener("click",()=>{n=-1,e="",r="",i()}),b.appendChild(m)}let g=document.createElement("button");if(g.type="button",g.className="bloom-gc-btn bloom-gc-btn-primary",g.textContent=n>=0?"Update":"Add",g.addEventListener("click",()=>{let m=n<0,L=ch(e,m);if(L){r=L,i();return}let A=qr(e),B=Fe().slice();n>=0&&n<B.length?B[n]=A:B.push(A),od(B),n=-1,e="",r="",i()}),b.appendChild(g),u.append(d,f,b),l.appendChild(u),t.appendChild(l),!a.length){let m=document.createElement("p");m.className="bloom-gc-empty",m.textContent="No greetings. The official heading stays.",t.appendChild(m);return}let h=document.createElement("div");h.className="bloom-gc-list",a.forEach((m,L)=>{let A=document.createElement("div");A.className="bloom-gc-item",L===s&&(A.dataset.active="true");let B=document.createElement("button");B.type="button",B.className=`bloom-gc-body${o===L?"":" bloom-gc-clamp"}`,B.textContent=m,B.addEventListener("click",()=>{o=o===L?-1:L,i()});let Ot=document.createElement("div");Ot.className="bloom-gc-item-actions";let wt=ad("Edit",sh);wt.addEventListener("click",()=>{n=L,e=m,r="",i()});let Y=ad("Delete",lh);Y.addEventListener("click",()=>{let H=Fe().filter((J,Bt)=>Bt!==L);od(H),n===L?(n=-1,e=""):n>L&&(n-=1),i()}),Ot.append(wt,Y),A.append(B,Ot),h.appendChild(A)}),t.appendChild(h)};return gi=i,i(),()=>{gi===i&&(gi=null),t.replaceChildren()}}var cd=y({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:rd,settings:j,start(){Pt=!0,w(rd,nd),eh(),mi=new AbortController;let{signal:t}=mi;window.addEventListener("popstate",yi,{signal:t}),document.addEventListener("click",rh,{capture:!0,signal:t}),document.addEventListener("click",oh,{signal:t}),ih(),qe=null,Kt()?cs():us(),zb.debug("started")},stop(){Pt=!1,mi?.abort(),mi=null,Pn!==void 0&&(clearTimeout(Pn),Pn=void 0),as(),ls(),ah(),nh(),x(Rn),On=!1,qe=null},onSettingsChange(){Pt&&(Kt()?(Ut(!1),ss()):x(Rn))}});var ud=`/*
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
`;var dd=new E("CustomSidebarIdentity"),md="customSidebarIdentityUi",yd="customSidebarIdentity",mh="bloom-csi-face",fh="bloom-csi-name",Ur="data-bloom-csi",ki="data-bloom-csi-orig",Vt="data-bloom-csi-slot",ph="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",gh=1024,vi=256,vd=24,xd=64,wd=40,fs=1,ps=4,Bn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],fd=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],k=S({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:Dh},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:vd,max:xd,default:wd},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function wi(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function bh(){return String(k.store.displayName??"").trim()}function Ei(t,e,n,r,o){let i=G(n,fs,ps),a=Math.min(t,e)/i,s=G(r,a/2,Math.max(a/2,t-a/2)),l=G(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}async function Ed(t){try{return await createImageBitmap(t)}catch{return null}}async function gs(t){try{let e=await fetch(t,t.startsWith("data:")?void 0:{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?Ed(await e.blob()):null}catch{return null}}function hh(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function bs(t){let e=Math.min(1,gh/Math.max(t.width,t.height));return hh(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function yh(t,e,n,r){let{side:o,x:i,y:a}=Ei(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=vi,s.height=vi;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,vi,vi);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function vh(t){let e=await Ed(t);if(!e)return null;let n=bs(e);return e.close(),n}async function Sd(t,e,n,r){let o=await gs(t);if(!o)return null;let i=yh(o,e,n,r);return o.close(),i}function vs(){k.store.cropX=.5,k.store.cropY=.5,k.store.cropZoom=1}function pd(){k.store.avatarUrl="",k.store.avatarSource="",vs()}var gd=0;async function hs(t){let e=++gd;vs(),k.store.avatarSource=t;let n=await Sd(t,.5,.5,1);return e!==gd?!1:(n&&(k.store.avatarUrl=n),!!n)}function Gr(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function ds(t){let e=Gr(t);if(!e)return!1;let n=await vh(e);return n?hs(n):!1}var Dn=new Set,xt=!1,$n=!1,_n=0,Si=0,xi=null,fe=new Map,Fn=null,Wt=null,Ti=null,It=null,Li=null;function Td(){let t=String(k.store.avatarUrl??"").trim();if(!t||Dn.has(t))return null;if(t.startsWith("data:image/"))return t;try{let{protocol:e}=new URL(t);if(e==="https:"||e==="http:")return t}catch{return null}return null}function Ld(t){return!!t?.closest(ph)}function ze(t,e){return t.map(n=>`${n} ${e}`)}function kd(t){return`url(${JSON.stringify(t)})`}function xh(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function bd(t,e){return`${t}{width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;border-radius:999px!important;flex-shrink:0!important}`}function hd(t,e,n){let r=kd(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function wh(t){let e=kd(t);return`[${Vt}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important}[${Vt}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${e}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important}`}function Eh(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=xh(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function Cd(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||Ld(n)||n.closest(".min-w-0")||e.push(n);return e}function Sh(t){let e=Cd(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function ms(t){if(Ld(t)||t.tagName==="IMG"||t.tagName==="BUTTON"||t.querySelector(".min-w-0, .truncate"))return!1;let e=t.getBoundingClientRect();return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function Th(t,e){if(e){let n=e.parentElement;for(;n&&n!==t;){if(ms(n))return n;n=n.parentElement}return null}for(let n of t.querySelectorAll('[class*="rounded-full"]'))if(ms(n))return n;for(let n of t.querySelectorAll(".relative"))if(ms(n))return n;return null}function ys(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&Dn.add(n),Kr(e),Wr()}function Lh(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function Kr(t){t.removeEventListener("error",ys);let e=t.getAttribute(ki);t.removeAttribute(Ur),t.removeAttribute(ki),e&&t.getAttribute("src")!==e&&(t.src=e)}function kh(t,e){if(!e||Dn.has(e)){Kr(t);return}Lh(t);let n=t.getAttribute("src")??"";if(t.getAttribute(Ur)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(ki)&&t.setAttribute(ki,n);t.setAttribute(Ur,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",ys),t.addEventListener("error",ys),n!==e&&(t.src=e)}function xs(){let t=[],e=be();e&&t.push(e);let n=Ye();if(n&&!t.some(r=>n.contains(r)||r.contains(n))){let r=n.querySelector(Bn.join(","))??n.querySelector("button, a, [role='button']")??n;r&&!t.includes(r)&&t.push(r)}return t}function Md(t,e){let n=Sh(t);if(n)kh(n,e);else for(let o of Cd(t))Kr(o);let r=e?Th(t,n):null;for(let o of t.querySelectorAll(`[${Vt}]`))o!==r&&o.removeAttribute(Vt);r&&r.setAttribute(Vt,"")}function Ch(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function Mh(t,e){let n=Ch(t);n&&Md(n,e)}function Ah(){for(let t of document.querySelectorAll(`img[${Ur}]`))Kr(t);for(let t of document.querySelectorAll(`[${Vt}]`))t.removeAttribute(Vt)}function Hh(){let t=G(Math.round(wi(k.store.avatarSize,wd)),vd,xd),e=Td(),n=bh(),r=k.store.applyToMenu!==!1,o=[],i=[...ze(Bn,"img"),"#stage-sidebar-tiny-bar img"];r&&i.push(...ze(fd,"> :first-child img"));let a=[...ze(Bn,".min-w-0 > .truncate"),...ze(Bn,".min-w-0.flex-1 .truncate")];r&&a.push(...ze(fd,"> :first-child .truncate")),o.push(bd([...ze(Bn,"img"),...ze(Bn,`[${Vt}]`)].join(","),t)),o.push(bd(`#stage-sidebar-tiny-bar img,#stage-sidebar-tiny-bar [${Vt}]`,32)),e&&(o.push(hd(i.join(","),e,t)),o.push(hd("#stage-sidebar-tiny-bar img",e,32)),o.push(wh(e))),n&&o.push(Eh(a,n)),w(yd,o.join(""))}function Nh(){let t=Td(),e=xs();for(let n of e)Md(n,t);if(k.store.applyToMenu!==!1){let n=Xe();n&&Mh(n,t)}for(let n of document.querySelectorAll(`img[${Ur}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||Kr(n)}function ws(){if(!(!xt||$n)){$n=!0;for(let t of fe.values())t.disconnect();Wt?.disconnect(),It?.disconnect();try{Hh(),Nh()}finally{$n=!1,Es(),Oh(),Fn?.isConnected&&Ad(Fn)}}}function Wr(){!xt||_n||(_n=requestAnimationFrame(()=>{_n=0,ws()}))}function Rh(){$n||!xt||Wr()}function Ph(t){if(fe.has(t))return;let e=new MutationObserver(Rh);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),fe.set(t,e)}function Ih(t){fe.get(t)?.disconnect(),fe.delete(t)}function Es(){let t=new Set;for(let n of xs())t.add(n),n.parentElement&&t.add(n.parentElement);let e=Ye();e&&t.add(e);for(let n of[...fe.keys()])(!t.has(n)||!n.isConnected)&&Ih(n);for(let n of t)n.isConnected&&Ph(n)}function Oh(){let t=mo();if(!t){It?.disconnect(),It=null,Ti=null;return}if(Ti===t&&It){It.observe(t,{childList:!0});return}It?.disconnect(),Ti=t,It=new MutationObserver(()=>{$n||!xt||(Es(),Wr())}),It.observe(t,{childList:!0})}function Ad(t){Fn===t&&Wt||(Wt?.disconnect(),Fn=t,Wt=new MutationObserver(()=>{if(!t.isConnected){Wt?.disconnect(),Wt=null,Fn=null;return}$n||!xt||Wr()}),Wt.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function Hd(t){if(!xt||k.store.applyToMenu===!1)return;let e=Xe();if(e){Ad(e),Wr();return}t<=0||requestAnimationFrame(()=>Hd(t-1))}function Nd(t){xt&&(ws(),!(xs().length||t<=0)&&(Si=requestAnimationFrame(()=>Nd(t-1))))}function Bh(t){xt&&k.store.applyToMenu!==!1&&(!fo(t)&&!Xe()||Hd(10))}function Dh(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let d=document.createElement("p");d.className="bloom-csi-hint";let f=document.createElement("div");f.className="bloom-csi-crop";let b=document.createElement("div");b.className="bloom-csi-stage";let g=document.createElement("img");g.className="bloom-csi-stage-img",g.alt="",g.draggable=!1,b.appendChild(g);let h=document.createElement("div");h.className="bloom-csi-zoom-row";let m=document.createElement("input");m.type="range",m.className="bloom-csi-zoom",m.min=String(fs),m.max=String(ps),m.step="0.05",m.setAttribute("aria-label","Zoom");let L=document.createElement("span");L.className="bloom-csi-zoom-val";let A=document.createElement("button");A.type="button",A.className="bloom-csi-btn",A.textContent="Reset",h.append(m,L,A);let B=document.createElement("p");B.className="bloom-csi-hint",B.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",f.append(b,h,B),t.append(u,d,f);function Ot(){let p=String(k.store.avatarSource??""),C=String(k.store.avatarUrl??"");return p.startsWith("data:image/")?p:C.startsWith("data:image/")?C:""}function wt(p,C,M){if(!a)return i.x=p,i.y=C,i.zoom=G(M,fs,ps),i;let W=Ei(a.w,a.h,M,p*a.w,C*a.h);return i.x=W.x/a.w,i.y=W.y/a.h,i.zoom=W.z,i}function Y(){m.value=String(i.zoom),L.textContent=`${Math.round(i.zoom*100)}%`;let p=a?Ei(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;p&&a&&(g.style.width=`${a.w/p.side*100}%`,g.style.height=`${a.h/p.side*100}%`,g.style.left=`${(.5-p.x/p.side)*100}%`,g.style.top=`${(.5-p.y/p.side)*100}%`)}function H(p=!1){let C=Ot(),M=String(k.store.avatarUrl??"").trim(),W=!!C;s.hidden=!M&&!C,(C||M)&&(s.src=C||M),document.activeElement!==l&&(l.value=W?"":M),l.placeholder=W?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",f.hidden=!C,d.hidden=!(e&&/^https?:\/\//.test(M)&&!C),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",C&&(p&&(i.x=wi(k.store.cropX,.5),i.y=wi(k.store.cropY,.5),i.zoom=wi(k.store.cropZoom,1)),g.getAttribute("src")!==C&&(a=null,g.onload=()=>{a={w:g.naturalWidth,h:g.naturalHeight},wt(i.x,i.y,i.zoom),Y()},g.src=C),Y())}function J(p,C,M,W=!1){wt(p,C,M),Y();let Ms=Ot(),As=()=>{k.store.cropX=i.x,k.store.cropY=i.y,k.store.cropZoom=i.zoom,Ms&&Sd(Ms,i.x,i.y,i.zoom).then(Hs=>{Hs&&(k.store.avatarUrl=Hs)})};r&&clearTimeout(r),W?As():r=setTimeout(As,80)}function Bt(p){k.store.avatarUrl=p;let C=p.trim();if(n&&clearTimeout(n),!C){k.store.avatarSource="",vs(),e=!1,H(!0);return}if(C.startsWith("data:image/")){e=!1,n=setTimeout(()=>{gs(C).then(M=>{if(!M)return;let W=bs(M);M.close(),W&&hs(W).then(()=>H(!0))})},80);return}if(/^https?:\/\//.test(C)){e=!1,k.store.avatarSource="",n=setTimeout(()=>{gs(C).then(M=>{if(!M){e=!0,H(!0);return}let W=bs(M);M.close(),W?(e=!1,hs(W).then(()=>H(!0))):(e=!0,H(!0))})},400);return}e=!1,k.store.avatarSource="",H(!0)}u.addEventListener("paste",p=>{Gr(p.clipboardData)&&(p.preventDefault(),e=!1,ds(p.clipboardData).then(()=>H(!0)))}),u.addEventListener("dragover",p=>{Gr(p.dataTransfer)&&p.preventDefault()}),u.addEventListener("drop",p=>{Gr(p.dataTransfer)&&(p.preventDefault(),e=!1,ds(p.dataTransfer).then(()=>H(!0)))}),l.addEventListener("change",()=>Bt(l.value)),l.addEventListener("paste",p=>{Gr(p.clipboardData)&&(p.preventDefault(),e=!1,ds(p.clipboardData).then(()=>H(!0)))}),l.addEventListener("keydown",p=>{Ot()&&!l.value&&(p.key==="Backspace"||p.key==="Delete")&&(pd(),e=!1,H(!0))}),c.addEventListener("click",()=>{pd(),e=!1,H(!0)}),b.addEventListener("pointerdown",p=>{p.button===0&&(b.setPointerCapture(p.pointerId),o.on=!0,o.px=p.clientX,o.py=p.clientY,o.x=i.x,o.y=i.y)}),b.addEventListener("pointermove",p=>{if(!o.on||!a)return;let C=b.clientWidth;if(!C)return;let{side:M}=Ei(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);wt(o.x-(p.clientX-o.px)*(M/C)/a.w,o.y-(p.clientY-o.py)*(M/C)/a.h,i.zoom),Y()}),b.addEventListener("pointerup",()=>{o.on&&(o.on=!1,J(i.x,i.y,i.zoom,!0))}),b.addEventListener("pointercancel",()=>{o.on=!1}),b.addEventListener("wheel",p=>{p.preventDefault(),J(i.x,i.y,i.zoom*(p.deltaY<0?1.08:1/1.08))},{passive:!1}),m.addEventListener("input",()=>J(i.x,i.y,Number(m.value))),m.addEventListener("change",()=>J(i.x,i.y,Number(m.value),!0)),A.addEventListener("click",()=>J(.5,.5,1,!0));let Cs=()=>H(!1);return Li=Cs,H(!0),()=>{Li===Cs&&(Li=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var Rd=y({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:md,cleanupSelectors:[`.${mh}`,`.${fh}`],settings:k,start(){xt=!0,Dn.clear(),w(md,ud),xi=new AbortController,document.addEventListener("click",Bh,{signal:xi.signal}),Nd(40),dd.debug("started")},onSettingsChange(){Dn.clear(),Li?.(),xt&&(Es(),ws())},stop(){xt=!1,xi?.abort(),xi=null,_n&&cancelAnimationFrame(_n),_n=0,Si&&cancelAnimationFrame(Si),Si=0;for(let t of fe.values())t.disconnect();fe.clear(),Wt?.disconnect(),Wt=null,Fn=null,It?.disconnect(),It=null,Ti=null,Ah(),x(yd),Dn.clear(),dd.debug("stopped")}});var qn=new E("Bloom"),Pd=!1,$h=Date.now(),_h=[Ml,Ec,Nc,Ic,_c,Gc,ru,iu,lu,yu,Lu,Ru,Iu,qu,Qu,ed,cd,Rd];function Ci(t){return new Promise(e=>setTimeout(e,t))}function Fh(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function qh(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var Od=8e3,Id=300,zh=250;async function jh(){if(ge())return await Ci(Id),!0;for(;Date.now()-$h<Od;)if(await Ci(zh),ge())return await Ci(Id),!0;return ge()||Ii()}function Ss(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function Gh(){if(Ss())return!0;let t=Date.now()+Od;for(;Date.now()<t;)if(await Ci(100),Ss())return!0;return Ss()}function Uh(){try{GM_registerMenuCommand?.("Bloom++ settings",Cl)}catch{}}function Kh(){oo(()=>{jn("HostShell"),qn.info("host shell",Q)}),io(()=>{qn.info("idle ready",Q)}),ao(()=>{Ai(),jn("HostReady"),qn.info("chrome ready",Q)})}async function Ts(){await Fs()}async function Ls(){if(Pd)return;Pd=!0;for(let n of _h)try{Ys(n)}catch(r){qn.error("register failed",n.name,r)}Js(),jn("Init"),Uh(),Kh();let t=()=>jn("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await Fh(),Ai(),qn.info("styles ready",Q),await qh(),Gh().then(n=>{n&&so()}),!await jh()){qn.warn("late islands not detected; starting default plugins",Q),Ke(),lo();return}await ol()}var Bd=typeof unsafeWindow<"u"?unsafeWindow:window,Wh=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||Wh){let t=Bd.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",Q);try{Object.defineProperty(Bd,"Bloom",{value:ks,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}Ts().then(()=>Ls()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
