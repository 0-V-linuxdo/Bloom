// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260920] v1.4.63
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

/* Bloom++ [20260920] v1.4.63. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Bd=Object.defineProperty;var Dd=(t,e)=>{for(var n in e)Bd(t,n,{get:e[n],enumerable:!0})};var Ss={};Dd(Ss,{REPO_URL:()=>nl,Settings:()=>T,VERSION:()=>Q,contextKeyFromUrl:()=>_t,conversationTitle:()=>en,conversationToken:()=>et,currentConversationId:()=>R,hasDraftText:()=>mt,hasErrorToast:()=>ft,hasLateIslands:()=>pe,init:()=>Es,initSettings:()=>ws,isDocumentInteractive:()=>rl,isStreaming:()=>D,isUserDraftEmpty:()=>ne,messageCreateTime:()=>No,plugins:()=>Bt,requestChromeReady:()=>ao,requestIdleReady:()=>Ue,requestShellReady:()=>io,setEditorText:()=>$t,subscribeHarvest:()=>nt,watchStreamingEdge:()=>W,whenChromeReady:()=>oo,whenIdleReady:()=>ro,whenShellReady:()=>no});var Yt=new Map,Kr=!1;function $d(){return document.getElementById("bloom-root")?.shadowRoot??null}function Ms(){return document.head??null}function ze(){let t=$d();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=_d()}function ki(t,e){if(!Kr)return;let n=Ms();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),ze();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,ze();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,ze()}function w(t,e){let n=Yt.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},Yt.set(t,n)),Kr&&ki(t,n)}function Ci(){if(!Ms())return!1;Kr=!0;for(let[e,n]of Yt)ki(e,n);return ze(),!0}function As(t){let e=Yt.get(t);e&&(e.disabled=!1,Kr&&ki(t,e))}function Hs(t){let e=Yt.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),ze())}function x(t){let e=Yt.get(t);e&&(e.el?.remove(),Yt.delete(t),ze())}function _d(){return Array.from(Yt.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var E=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function y(t){return t}var Mi=new Map;function Vr(t,e){let n=Mi.get(t);return n||(n=new Set,Mi.set(t,n)),n.add(e),()=>n.delete(e)}function fe(t,e){let n=Mi.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var Fd="bloompp";function Ns(){return new Promise((t,e)=>{let n=indexedDB.open(Fd,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function Rs(t){try{let e=await Ns();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function Ps(t,e){try{let n=await Ns();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function je(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function G(t,e,n){return Math.min(n,Math.max(e,t))}function Is(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function Os(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function Bs(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var Wr=new E("SettingsStore"),Xt="BloomSettings",qd=100;function Yr(t){return t!=null&&typeof t.then=="function"}function zd(t){if(t==null||Yr(t))return null;if(je(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(je(e)&&!Yr(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return je(n)&&!Yr(n)?n:null}return null}catch{return null}}function Zr(t){let e=zd(t);if(!e)return null;let n=e.plugins;return!je(n)||Yr(n)||Object.keys(n).length===0?null:e}var Xr=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let d=l.slice(c.length+1);if(d&&!d.includes(".")){let f=u(d);f!==void 0&&(i[a]=f,s=f);break}}}return je(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){Wr.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},qd))}save(){try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(Xt,this.plain)}catch{try{GM_setValue(Xt,e)}catch(n){Wr.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(Xt,e)}catch{}Ps(Xt,e).catch(n=>Wr.warn("Failed to save settings to IndexedDB:",n))}catch(e){Wr.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){Is(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var jd=new E("Settings"),Gd={plugins:{}},T=new Xr(structuredClone(Gd)),Ud=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function Kd(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function S(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?(T.store.plugins[n]||(T.store.plugins[n]={}),T.store.plugins[n]):{}},get plain(){let n=e.pluginName;return n?T.plain.plugins[n]??{}:{}}};return e}async function Vd(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function Ds(){let t=Zr(await Vd(Xt));if(t||(t=Zr(await Rs(Xt))),!t)try{t=Zr(localStorage.getItem(Xt))}catch{t=null}if(!t)return;let e=t.plugins;e&&(T.plain.plugins=e,jd.debug("Loaded settings"))}function $s(t,e){e&&(e.pluginName=t,T.plain.plugins[t]||(T.plain.plugins[t]={}),T.setDefaultGetter(Ud(t),n=>{if(n!=="enabled")return Kd(e.def,n)}))}function _s(){return T.plain.plugins.Settings||(T.store.plugins.Settings={}),T.store.plugins.Settings}function Jr(){return _s().pinnedPlugins??[]}function Fs(t){return Jr().includes(t)}function qs(t){let e=Jr(),n=e.includes(t);return T.store.plugins.Settings={...T.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function Qr(){return _s().starredPlugins??[]}function zs(t){return Qr().includes(t)}function js(t){let e=Qr(),n=e.includes(t);return T.store.plugins.Settings={...T.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var to=new E("PluginManager"),Bt={},Fn=new Set;function Ks(t){if(Bt[t.name]){to.warn("Duplicate plugin",t.name);return}Bt[t.name]=t,$s(t.name,t.settings)}function Ge(t){let e=Bt[t];if(!e)return!1;if(e.required)return!0;let n=T.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function Vs(t){let e=Bt[t];if(!e||e.required)return;let n=!Ge(t);T.plain.plugins[t]||(T.store.plugins[t]={}),T.store.plugins[t].enabled=n,n?Ws(e):Wd(e),fe("pluginToggle",{name:t,enabled:n})}function Ws(t,e=!1){if(!Fn.has(t.name)&&Ge(t.name))try{t.managedStyle&&As(t.managedStyle),t.start?.(),Fn.add(t.name),t.settings&&T.addPrefixChangeListener(`plugins.${t.name}.`,()=>{Fn.has(t.name)&&t.onSettingsChange?.()}),e||to.debug("Started",t.name)}catch(n){to.error("Failed to start",t.name,n)}}function Wd(t){if(Fn.has(t.name)){try{t.stop?.()}catch(e){to.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(Hs(t.managedStyle),x(t.managedStyle)),Fn.delete(t.name)}}function qn(t){for(let e of Object.values(Bt))(e.startAt??"DOMContentLoaded")===t&&Ws(e)}var Gs=2,Us="defaultsRev";function Ys(){let t=T.plain.plugins.Settings;if(!(!t||t[Us]===Gs)){for(let e of["NoShareLink","NoDictation"]){let n=T.plain.plugins[e];!n||typeof n.enabled=="boolean"||(n.enabled=!1)}t[Us]=Gs}}var zn=!1,eo=!1,Ai=!1,Zs=[],Js=[],Qs=[];function Hi(t){let e=t.splice(0);for(let n of e)n()}function jn(){zn||(zn=!0,Hi(Zs))}function Ni(){eo||(eo=!0,zn||jn(),Hi(Js))}function tl(){Ai||(Ai=!0,zn||jn(),eo||Ni(),Hi(Qs))}function no(t){zn?t():Zs.push(t)}function ro(t){eo?t():Js.push(t)}function oo(t){Ai?t():Qs.push(t)}function io(){jn()}function Ue(){jn(),Ni()}function ao(){tl()}function Xs(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function el(){await Xs(4e3),jn(),await Xs(4e3),Ni(),tl()}var v={p:"0-V-linuxdo"},Q="[20260920] v1.4.63",nl="https://github.com/0-V-linuxdo/Bloom";function Yd(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Xd(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function Ri(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function pe(){return Ri()?Yd()||Xd():!1}function rl(){return pe()}var Zd=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),ol=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Jd=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Qd="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function Ve(t){return t.id==="bloom-root"||!!t.closest(Qd)}function il(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function so(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function Pi(t){if(!(t instanceof HTMLElement)||!t.isConnected||Ve(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&so(e)?!1:t.getClientRects().length>0}function Ke(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function tm(){let t=[];for(let e of document.querySelectorAll(Zd))!(e instanceof HTMLElement)||!e.isConnected||Ve(e)||t.push(e);return t}function lo(t){if(!t.isConnected||Ve(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function ge(){return tm().filter(lo)[0]??null}function We(){let t=document.getElementById("stage-sidebar-tiny-bar");if(!(t instanceof HTMLElement)||!t.isConnected||Ve(t))return null;let e=t.getBoundingClientRect();return e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3?null:t}function Ii(t){let e=t,n=t.parentElement;n&&n.children.length===1&&!Ve(n)&&!Ke(n)&&n.parentElement&&!Ke(n.parentElement)&&(e=n);let r=e.parentElement;if(r&&!Ke(r)&&!Ve(r)&&r.children.length>1){let o=r.getAttribute("class")||"";if(/\bflex\b/.test(o)&&!/flex-col/.test(o)&&r.parentElement&&!Ke(r.parentElement))return r}return e}function Ye(){let t=document.querySelectorAll(ol);for(let n of t)if(Pi(n)&&!so(n)&&il(n))return n;let e=document.querySelectorAll(Jd);for(let n of e){if(!Pi(n)||!il(n)||so(n))continue;let r=n.querySelector(ol);return Pi(r)&&!so(r)?r:n}return null}function al(){let t=ge();if(t){let e=Ii(t),n=e.parentElement;if(n&&!Ke(n))return n;if(!Ke(e))return e}return We()}function co(t){let e=ge();return e?t.composedPath().includes(e):!1}var Bi=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],em={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function nm(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function rm(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function Oi(t){let e=nm(t);return e?rm(e)>.55?"light":"dark":null}function om(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=Oi(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=Oi(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Oi(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function sl(t){return t==="auto"?om():t}function im(t){try{let e=getComputedStyle(document.documentElement);for(let n of Bi){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function ll(t,e,n){let r=em[e];if(n){im(t);for(let o of Bi)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of Bi)t.style.setProperty(o,r[o])}function cl(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var Di=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var sm="bloom-root",wt="bloom-rail-item",go="bloom-account-item",he="bloom-sidebar-panel",Jn="bloom-plugin-dialog",Eo="bloom-plugin-layer",bo="bloom-settings-css",lm=2e3,ml=null,cm=null,te=!1,qi=[],uo=null,ho=null,Jt=null,fo=null,Dt=null,Yn=null,Gn,Xe=0,Xn=0,Un=0,Kn=null,Vn=null,yo=null,fl=null,Wn=null,$i=[],vo=!1,um=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],dm=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],So="",Zn="all",ee="all";function To(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function pl(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function mm(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function fm(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function pm(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var gm={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function bm(t){return t.icon||gm[t.name]||To()}function _i(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),ll(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function gl(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function xo(){let t="auto",e=sl(t);_i(ml,e,!0);let n=document.getElementById(he);n instanceof HTMLElement&&_i(n,e,!0);let r=document.getElementById(Jn);r instanceof HTMLElement&&_i(r,e,!0);let o=document.getElementById(wt);o instanceof HTMLElement&&gl(o),fe("schemeChange",{scheme:e,pref:t})}function bl(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function hl(){if(w("settings",Di),document.getElementById(bo)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=bo,t.textContent=Di,document.head.appendChild(t)}function hm(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function ym(){for(let t of qi)t();qi=[]}function yl(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function vm(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function Gi(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function xm(t){return Gi(t).length>0}function po(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function wm(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=vm(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function Em(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(wm(e,n));let i=T.store.plugins[t]??(T.store.plugins[t]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",qi.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??po(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??po(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=yl(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??po(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function ul(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function Sm(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=T.store.plugins[t.name]??(T.store.plugins[t.name]={});for(let[n,r]of Gi(t)){if(n==="enabled"||r.type===5)continue;let o=po(r);o!==void 0&&(e[n]=o)}xl(t)}function vl(t){t.key==="Escape"&&(!document.getElementById(Eo)&&!document.getElementById(Jn)||(t.stopPropagation(),Ze()))}function Tm(){vo||(document.addEventListener("keydown",vl),vo=!0)}function Lm(){vo&&(document.removeEventListener("keydown",vl),vo=!1)}function Ze(){ym(),Lm(),document.getElementById(Eo)?.remove(),document.getElementById(Jn)?.remove()}function xl(t){if(Ze(),!document.body)return;let e=document.createElement("div");e.id=Eo,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",Qt),e.addEventListener("pointerup",Qt),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&Ze()});let n=document.createElement("div");n.id=Jn,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",Qt),n.addEventListener("pointerup",Qt),n.addEventListener("click",Qt);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=pl(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),Ze()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=ul("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=ul("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=Gi(t);if(c.length)for(let[u,d]of c){let f=Em(t.name,u,d);f&&l.appendChild(f)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>Sm(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),Tm(),xo()}function km(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=bm(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=zs(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=fm(l),c.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation();let m=js(t.name);fe("pluginStar",{name:t.name,starred:m})}),s.appendChild(c),!t.required){let h=Fs(t.name),m=document.createElement("button");m.type="button",m.className=`bloom-icon-btn bloom-card-pin${h?" bloom-card-pin-active":""}`,m.setAttribute("aria-label",h?"Unpin from top":"Pin to top"),m.innerHTML=pm(h),m.addEventListener("click",L=>{L.preventDefault(),L.stopPropagation();let A=qs(t.name);fe("pluginPin",{name:t.name,pinned:A})}),s.appendChild(m)}if(xm(t)){let h=document.createElement("button");h.type="button",h.className="bloom-icon-btn bloom-card-settings",h.setAttribute("aria-label",`${t.name} settings`),h.innerHTML=mm(),h.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation(),xl(t)}),s.appendChild(h)}let u=yl(t.name,Ge(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",h=>h.stopPropagation()),d?.addEventListener("change",()=>{Vs(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let h=document.createElement("div");h.className="bloom-card-desc",h.textContent=t.description,n.appendChild(h)}let f=document.createElement("div");f.className="bloom-card-separator";let b=document.createElement("div");b.className="bloom-card-footer";let g=document.createElement("div");return g.className="bloom-card-author",g.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",b.appendChild(g),e.append(n,f,b),e}function wl(){return Object.values(Bt).filter(t=>!t.hidden&&t.name!=="Settings")}function El(t,e){return e==="all"||e==="favorites"?!0:(t.tags??[]).includes(e)}function Cm(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function Mm(){return So.trim()?"No plugins match your search.":ee==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function Am(){let t=wl();return dm.filter(e=>e.id==="favorites"||e.id==="all"?!0:t.some(n=>El(n,e.id)))}function Hm(){if(Wn){Wn.replaceChildren();for(let t of Am()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${ee===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{ee=t.id,be()}),Wn.appendChild(e)}}}function Nm(){let t=wl();if(ee==="favorites"){let e=new Set(Qr());t=t.filter(n=>e.has(n.name))}else ee!=="all"&&(t=t.filter(e=>El(e,ee)));return Zn==="enabled"&&(t=t.filter(e=>Ge(e.name))),Zn==="disabled"&&(t=t.filter(e=>!Ge(e.name))),t}function be(){if(!Kn)return;Hm();let t=Nm();yo&&(yo.placeholder=`Search ${t.length} plugins...`);let e=t,n=So.trim().toLowerCase();if(n&&(e=e.filter(r=>Cm(r).includes(n))),ee!=="favorites"){let r=Jr();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}Kn.replaceChildren();for(let r of e)Kn.appendChild(km(r));Vn&&(Vn.hidden=e.length>0,Vn.textContent=Mm())}function Qt(t){t.stopPropagation()}function Fi(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function Ui(){document.getElementById(wt)?.setAttribute("aria-expanded",te?"true":"false")}function Rm(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function Ki(){Ze(),So="",Zn="all",ee="all",document.getElementById(he)?.remove(),te=!1,Ui()}function Pm(t){let e=document.createElement("div");e.id=t,e.addEventListener("pointerdown",Qt),e.addEventListener("pointerup",Qt),e.addEventListener("click",Qt);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-titles";let i=document.createElement("div");i.className="bloom-settings-brand";let a=document.createElement("span");a.className="bloom-settings-mark",a.innerHTML=To();let s=document.createElement("h2");s.textContent="Bloom++",i.append(a,s);let l=document.createElement("p");l.className="bloom-settings-sub",l.textContent="Toggle features. Some need a reload. Click the sliders icon to configure.",o.append(i,l);let c=document.createElement("button");c.type="button",c.className="bloom-icon-btn",c.setAttribute("aria-label","Close"),c.innerHTML=pl(),c.addEventListener("click",Ki),r.append(o,c),n.appendChild(r);let u=document.createElement("div");u.className="bloom-plugin-tabs",n.appendChild(u);let d=document.createElement("div");d.className="bloom-search-bar";let f=document.createElement("input");f.type="search",f.className="bloom-search-input",f.setAttribute("aria-label","Search plugins"),f.placeholder="Search plugins...",f.addEventListener("input",()=>{So=f.value,be()});let b=document.createElement("select");b.className="bloom-search-filter",b.setAttribute("aria-label","Filter plugins");for(let m of um){let L=document.createElement("option");L.value=m.value,L.textContent=m.label,b.appendChild(L)}b.value=Zn,b.addEventListener("change",()=>{Zn=b.value,be()}),d.append(f,b),n.appendChild(d);let g=document.createElement("div");g.className="bloom-plugin-list",n.appendChild(g);let h=document.createElement("p");return h.className="bloom-tab-empty",h.hidden=!0,n.appendChild(h),e.appendChild(n),Kn=g,Vn=h,yo=f,fl=b,Wn=u,be(),e}function Im(t){t.classList.add("bloom-rail-dock")}function Om(){let t=document.getElementById(wt);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&lo(t)?t:null}function Bm(){if(document.getElementById(he)?.remove(),!document.body)return;let t=Pm(he);Im(t),document.body.appendChild(t),te=!0,Ze(),xo(),Ui(),fe("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:Q,dock:"center",rail:!!Om()})}function Vi(){let t=document.getElementById(he);if(t instanceof HTMLElement&&t.isConnected&&Rm(t)){Ki();return}t?.remove(),Bm()}function Dm(){let t=document.createElement("button");return t.type="button",t.id=wt,t.className="bloom-rail-item",t.setAttribute("aria-controls",he),t.setAttribute("aria-expanded",te?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${To()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Vi()}),t}function dl(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function $m(t){let e=t.querySelector("img");if(e instanceof HTMLElement){let n=e.getBoundingClientRect();if(n.width>8&&n.height>8)return e}for(let n of t.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let r=n.getBoundingClientRect();if(r.width>8&&r.height>8)return n}return null}function _m(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function Zt(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function Sl(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=$m(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&Zt(t,"padding-top",Math.round(i)),Number.isFinite(a)&&Zt(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));Zt(n,"width",l),Zt(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&Zt(t,"padding-left",u);let d=_m(e,r);if(d){let f=d.getBoundingClientRect(),b=n.getBoundingClientRect(),g=Math.round(f.left-b.right);g>=0&&g<=24&&Zt(t,"gap",g)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&Zt(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&Zt(t,"gap",Math.round(l))}gl(t)}function zi(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function Fm(){if(Yn?.isConnected&&Dt){Dt.observe(Yn,{childList:!0});return}ji()}function qm(t){if(zi(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function zm(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){Un=0;return}Un+=1,Xn=Date.now()+Math.min(8e3,250*2**Math.min(Un,5))})}function jm(){Xe||Date.now()<Xn||(Xe=requestAnimationFrame(()=>{Xe=0,!(Date.now()<Xn)&&(document.getElementById(wt)?.isConnected||wo())}))}function wo(){if(!document.body)return;Dt?.disconnect();let t=null,e=!1;try{let n=document.getElementById(wt);t=n instanceof HTMLButtonElement?n:Dm();let r=ge(),o=We();if(r){let i=Ii(r),a=i.parentElement;if(zi(i)||a&&zi(a))return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),dl(t),Sl(t,r)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),dl(t,!0)):t.isConnected&&!lo(t)&&(t.remove(),t=null)}finally{zm(t,e),Fm(),Ui()}}function ji(){let t=al();!t||!qm(t)||Yn===t&&Dt||(Dt?.disconnect(),Yn=t,Dt=new MutationObserver(()=>{document.getElementById(wt)?.isConnected||jm()}),Dt.observe(t,{childList:!0}))}function Gm(){wo(),ji(),Gn===void 0&&(Gn=window.setInterval(()=>{let t=document.getElementById(wt);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=Xn&&wo();else{Un=0;let e=ge();e&&Sl(t,e)}ji()},lm))}function Um(){Gn!==void 0&&(clearInterval(Gn),Gn=void 0),Xe&&cancelAnimationFrame(Xe),Xe=0,Xn=0,Un=0,Dt?.disconnect(),Dt=null,Yn=null}function Km(t){fo===t&&Jt||(Jt?.disconnect(),fo=t,Jt=new MutationObserver(()=>{if(!t.isConnected){Jt?.disconnect(),Jt=null,fo=null;return}Tl(t)}),Jt.observe(t,{childList:!0}))}function Tl(t){if(Km(t),t.querySelector(`#${go}`))return;let e=document.createElement("button");e.type="button",e.id=go,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${To()}<span>Bloom++</span>`,e.addEventListener("pointerdown",Fi),e.addEventListener("pointerup",Fi),e.addEventListener("click",n=>{Fi(n),Vi()}),t.insertBefore(e,t.firstChild)}function mo(){let t=Ye();return t?(Tl(t),!0):!1}function Vm(t){co(t)&&(queueMicrotask(mo),requestAnimationFrame(()=>{mo()}),window.setTimeout(mo,60),window.setTimeout(mo,180))}function Wm(){ho?.abort();let t=new AbortController;ho=t,document.addEventListener("click",Vm,{signal:t.signal})}function Ym(){ho?.abort(),ho=null,Jt?.disconnect(),Jt=null,fo=null}function Ll(){Ue(),hm(()=>{hl(),bl(),wo(),Vi()})}var kl=y({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[v.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${sm}`,`#${wt}`,`#${go}`,`#${he}`,`#${Eo}`,`#${Jn}`,`#${bo}`,"#bloom-menu-panel"],start(){hl(),bl(),Gm(),Wm(),uo?.(),uo=cl(xo),xo(),$i=[Vr("pluginToggle",()=>{te&&be()}),Vr("pluginPin",()=>{te&&be()}),Vr("pluginStar",()=>{te&&be()})]},stop(){Um(),Ym(),uo?.(),uo=null;for(let t of $i)t();$i=[],Ki(),document.getElementById(wt)?.remove(),document.getElementById(go)?.remove(),document.getElementById(bo)?.remove(),ml=null,cm=null,Kn=null,Vn=null,yo=null,fl=null,Wn=null,te=!1}});var Lo='form[data-type="unified-composer"], form.w-full[data-type]',Et=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Je=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Cl=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Ml=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Xm=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Zm='[contenteditable="false"], button, [role="button"]';function ut(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function ye(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!ut(o)))return o;return null}function Al(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function P(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=Al(t);return!!(Xm.test(n)||/^stop$/i.test(n))}function dt(){let e=Array.from(document.querySelectorAll(Lo)).find(ut);if(e instanceof HTMLElement)return e;let n=ye(document,Et),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function U(){let t=Array.from(document.querySelectorAll(Et));return t.find(ut)??t[0]??null}function Jm(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(Zm);return!!n&&n!==e&&e.contains(n)}function Wi(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&Jm(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function mt(t){let e=t??U();return e?Wi(e,e).replaceAll("\u200B","").trim().length>0:!1}function ne(t){return!mt(t)}function ko(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function Hl(t){let e=dt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!ut(n))&&t(n))return n;return null}function re(){let t=dt(),e=ye(t,Je)??ye(document,Je);return e&&!P(e)?e:Hl(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!P(n);let o=Al(n);return/^(send|send prompt|发送)$/i.test(o)&&!P(n)})}function ve(){let t=dt(),e=ye(t,Cl,!0)??ye(document,Cl,!0);if(e)return e;let n=ye(t,Ml)??ye(document,Ml);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&ut(r)&&P(r))return r}return Hl(P)}function tt(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>Wi(n,t)).join(`
`):Wi(t,t)}function Yi(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function $t(t,e,n=!1){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),Yi(t,n)}var Nl=/\/c\/([a-zA-Z0-9_-]{8,})/i;function et(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function _t(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function Qe(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(Nl)?.[1]??""}catch{return t.match(Nl)?.[1]??""}}function R(){let t=Qe(location.pathname);if(t)return t;let n=et().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return""}var Ol=new E("Harvest"),Qm=1500,tf=200,Co=new Set,Mo=new Map,Ao=new Map,tn=null,Ho=null,Qn=null,St=0;function ef(){return typeof unsafeWindow<"u"?unsafeWindow:window}function nf(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function rf(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}function Bl(t){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(t)}var of=/"action"\s*:\s*"(next|continue|variant)"/i;function af(t,e,n){return!(e!=="POST"||Bl(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!of.test(n))}function sf(t,e){return e!=="GET"||Bl(t)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(t)}function Rl(t){return t.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function Dl(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function lf(t){return typeof t=="string"?Dl(t):""}function Xi(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return Xi(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function $l(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function Pl(t,e,n){!t||!e||Ao.get(t)!==e&&(Ao.set(t,e),$l(Ao,Qm),oe({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function cf(t,e){let n=e.trim();!t||!n||Mo.get(t)!==n&&(Mo.set(t,n),$l(Mo,tf),oe({type:"conversation-meta",conversationId:t,title:n}))}function tr(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)tr(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&cf(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=Xi(l.create_time??l.createTime??l.created_at);c&&u&&Pl(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=Xi(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&Pl(a,s,o),r.mapping&&typeof r.mapping=="object")tr(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&tr(l,o,n+1)}function Il(t,e){if(t)try{tr(JSON.parse(t),e)}catch{}}function oe(t){for(let e of Array.from(Co))try{e(t)}catch{}}async function uf(t,e,n){if(n===St)try{let r=await t.json();if(n!==St)return;tr(r,e)}catch{}}async function df(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===St&&oe({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===St;){let{done:u,value:d}=await s.read();if(u)break;if(c+=l.decode(d,{stream:!0}),!o){let b=Dl(c);b&&(o=b,oe({type:"post-start",conversationId:o,url:""}))}let f=c.split(`
`);c=f.pop()??"";for(let b of f){let g=b.replace(/^data:\s*/,"").trim();!g||g==="[DONE]"||Il(g,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===St&&Il(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===St&&oe({type:"post-end",conversationId:o,error:i})}function mf(t,e,n){let r=nf(e),o=rf(e,n),i=sf(r,o),a=af(r,o,n?.body),s=St,l="";return a&&(l=lf(n?.body)||Rl(r)||Qe(r)||R(),oe({type:"post-start",conversationId:l,url:r})),t(e,n).then(c=>{if(s!==St||!i&&!a)return c;try{let u=c.clone();i?uf(u,Rl(r)||R(),s):df(u,l,!c.ok,s)}catch{a&&oe({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===St&&oe({type:"post-end",conversationId:l,error:!0}),c})}function ff(){if(tn)return;let t=ef();Qn=t,tn=t.fetch.bind(t);let e=(n,r)=>mf(tn,n,r);Ho=e,t.fetch=e,Ol.debug("conversation fetch harvest hooked")}function pf(){St+=1,!(!tn||!Qn)&&(Ho&&Qn.fetch===Ho&&(Qn.fetch=tn),tn=null,Ho=null,Qn=null,Ol.debug("conversation fetch harvest unhooked"))}function nt(t){return Co.add(t),ff(),()=>{Co.delete(t),Co.size===0&&pf()}}function en(t){return t?Mo.get(t)??"":""}function No(t){return t?Ao.get(t)??null:null}var ql=new E("Streaming");function sr(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!ut(e))&&(P(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function gf(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&ut(t))}function bf(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&ut(t))}function hf(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function ft(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function D(){if(ve()||sr()||hf())return!0;let t=re();return t&&ut(t)&&!P(t)?!1:!!(gf()||bf())}var yf=400,_l=3,Ee=new Set,nr,rr=null,Zi=null,we=!1,xe=0,ie="",Tt="",or=!1,ir=!1,ar=!1;function zl(){return _t(et())}function Fl(t,e){return{streaming:t,contextKey:e,conversationId:R()}}function X(t,e){if(!t||t===e)return!1;if(t.endsWith("|draft")&&!e.endsWith("|draft"))return!0;try{let n=t.split("|")[0],r=e.split("|")[0],o=new URL(n).pathname.replace(/\/$/,"")||"/",i=new URL(r).pathname.replace(/\/$/,"")||"/";if((o==="/"||o==="")&&i.startsWith("/c/"))return!0}catch{}return!1}function Ji(){we=!1,xe=0,ie="",or=!1,ir=!1,ar=!1}function vf(t){for(let e of Array.from(Ee))try{e.onFall?.(t)}catch{}}function xf(t){for(let e of Array.from(Ee))try{e.onRise?.(t)}catch{}}function er(t){for(let e of Array.from(Ee))try{e.onTick?.(t)}catch{}}function wf(t,e){for(let n of Array.from(Ee))try{n.onContext?.(t,e)}catch{}}function Ef(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&P(n)&&(or=!0)}function Sf(t){t.type==="post-end"&&we&&(ar=!0,t.error&&(ir=!0))}function Tf(){let t=zl(),e=D();if(Tt&&t&&Tt!==t){if(wf(t,Tt),!X(Tt,t)){Ji(),Tt=t,er(Fl(e,t));return}ie===Tt&&(ie=t)}Tt=t;let n=Fl(e,t);if(e){let i=!we;i&&(or=!1,ir=!1,ar=!1),we=!0,xe=0,ie=t,i&&xf(n),er(n);return}if(!we){er(n);return}if(xe+=1,ar&&(xe=Math.max(xe,_l)),xe<_l){er(n);return}let r=!!ie&&ie===t,o={contextKey:ie||t,conversationId:R(),userStopped:or,error:ir||ft()};Ji(),r&&vf(o),er(n)}function Lf(){nr===void 0&&(we=D(),Tt=zl(),ie=we?Tt:"",xe=0,or=!1,ir=!1,ar=!1,rr?.abort(),rr=new AbortController,document.addEventListener("click",Ef,{capture:!0,signal:rr.signal}),Zi=nt(Sf),nr=setInterval(Tf,yf),ql.debug("watchStreamingEdge started"))}function kf(){Ee.size||(nr!==void 0&&(clearInterval(nr),nr=void 0),rr?.abort(),rr=null,Zi?.(),Zi=null,Ji(),Tt="",ql.debug("watchStreamingEdge stopped"))}function W(t){let e=typeof t=="function"?{onFall:t}:t;return Ee.add(e),Lf(),()=>{Ee.delete(e),kf()}}var jl="bloom-host-icon",lr="data-bloom-host-rel",Qi="not all",ta=0,Gl=0,Cf=400;function Ul(t){ta+=1;try{t()}finally{ta-=1}}function Ro(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function ae(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function Kl(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function Mf(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Af(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-Gl<Cf||(Gl=n,t.appendChild(e))}function Hf(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||Ro(n)&&(n.getAttribute(lr)||n.setAttribute(lr,n.rel),n.media!==Qi&&(n.media=Qi),n.rel!==jl&&(n.rel=jl))}function Nf(t){for(let e of t.querySelectorAll(`link[${lr}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(lr);n&&(e.rel=n),e.removeAttribute(lr),e.media===Qi&&e.removeAttribute("media")}}function Vl(t,e){let{head:n}=document;!n||!e||Ul(()=>{Hf(n,t);let r=Kl(t),{type:o,sizes:i}=Mf(e);r?Af(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function Wl(t,e){let{head:n}=document;n&&Ul(()=>{Kl(t)?.remove(),Nf(n)})}function Yl(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(ta)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:Ro(c.target)&&(a=!0,ae(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)Ro(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)Ro(u)&&u.id!==t&&(a=!0,ae(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var Rf=["original","badge","dot","hole","bg"],Jl=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],Ql={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Po="#FCFCFC",Pf="#111111",Xl="#111111",If="#ffffff",Of="#212121",Bf="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Df={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Io=32,Zl=64;function tc(t){return typeof t=="string"&&Rf.includes(t)}function $f(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function Oo(t){let e=document.createElement("canvas");e.width=Io,e.height=Io;let n=e.getContext("2d");return n?(n.scale(Io/Zl,Io/Zl),t(n),e.toDataURL("image/png")):""}function _f(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function Bo(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(Bf);n&&(t.strokeStyle=Pf,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function Ff(t,e,n){let r=Ql[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=Xl,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=Xl,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=If,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function cr(t,e){if(t==="original")return e==="wait"?Oo(r=>Bo(r,Po)):$f(Df[e]);let n=e==="wait"?void 0:Ql[e];return Oo(t==="hole"?r=>Bo(r,n??Po):t==="bg"?r=>{r.fillStyle=n??Of,_f(r,0,0,64,64,14),r.fill(),Bo(r,Po,!1)}:r=>{Bo(r,Po),e!=="wait"&&Ff(r,e,t==="dot"?"dot":"badge")})}function ec(t){return{wait:cr(t,"wait"),rotate:cr(t,"rotate"),done:cr(t,"done"),ready:cr(t,"ready"),error:cr(t,"error")}}var qf=new E("ChatStateFavicons"),Le="bloom-chat-state-favicon",sc=["input","beforeinput","cut","paste","compositionend"],lc=S({style:{type:3,description:"Favicon overlay",options:Jl}}),kt="",na={wait:"",rotate:"",done:"",ready:"",error:""},ur="wait",Se=!1,Lt=!1,K=null,rt="",ot="",ke=!0,nn=null,it=0,Do=null,$o=null,Te=null,ea=null,rn=null,gt=!1,nc=new WeakSet;function zf(){let t=lc.store.style;return tc(t)?t:"bg"}function cc(){let e=document.querySelector(`link[rel~="icon"]:not(#${Le}), link[data-bloom-host-rel]:not(#${Le})`)?.href;return ae(e)?e:ae(kt)?kt:""}function jf(){let t=document.getElementById(Le);return t instanceof HTMLLinkElement?t:null}function Gf(){if(!ae(kt)){let t=cc();t&&(kt=t)}return ae(kt)?kt:na.wait}function uc(t){return t==="wait"?Gf():na[t]}function dc(){Vl(Le,uc(ur))}function pt(t){let e=uc(t);if(ur===t){let n=jf();if(n&&n.getAttribute("href")===e)return}ur=t,dc()}function rc(){na=ec(zf()),pt(ur)}function mc(){return _t(et())}function ra(t,e){!t||!e||t===e||(K===t&&(K=e),rt===t&&(rt=e),ot===t&&(ot=e))}function Uf(){let t=mc();return D()||Se||Lt?(rt&&t&&rt!==t&&X(rt,t)?(ra(rt,t),rt=t):!rt&&t&&(rt=t),rt||t):(rt="",t)}function oc(t){return!K||!t||K===t?!0:X(K,t)}function fc(){Se=!1,Lt=!1,K=null,rt=""}function pc(t){ot=t,fc(),ke=!1,pt("wait")}function ic(t){return!t&&ke}function Kf(){if(!gt)return;let t=mc();if(ot&&t&&ot!==t&&!X(ot,t)){pc(t);return}ot&&t&&X(ot,t)&&ra(ot,t),t&&(ot=t);let e=Uf(),n=D(),r=ne();if(ft()&&!n){pt("error"),Se=!1,Lt=!1,K=null;return}if(n){Se||(ke=!1),Se=!0,Lt=!1,K=e,pt("rotate");return}if(Se){let o=oc(e);if(Se=!1,o){Lt=!0,K=e,pt("done");return}Lt=!1,K=null}if(Lt)if(K&&e&&!oc(e))Lt=!1,K=null;else if(r){K=e||K,pt("done");return}else if(ic(r)){Lt=!1,pt("ready");return}else{Lt=!1,pt("wait");return}K=null,r?pt("wait"):ic(r)?pt("ready"):pt("wait")}function se(){gt&&(vc(),bc(),hc(),Kf())}function gc(){if(rn){for(let t of sc)rn.removeEventListener(t,yc,!0);rn=null}}function bc(){let t=dt(),e=t&&t!==document.body?t:null;if(!(rn===e&&e?.isConnected)&&(gc(),!!e)){rn=e;for(let n of sc)rn.addEventListener(n,yc,{capture:!0,passive:!0})}}function hc(){let t=dt();if(!(Te&&ea===t&&t.isConnected)){if(Te?.disconnect(),ea=t,!t||t===document.body){Te=null;return}Te=new MutationObserver(()=>_o()),Te.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function _o(){if(gt){if(document.hidden){it&&(cancelAnimationFrame(it),it=0),se();return}it||(it=requestAnimationFrame(()=>{it=0,gt&&se()}))}}function yc(){mt()&&(ke=!0),_o()}function ac(){mt()&&(ke=!0),_o()}function Vf(){gt&&(it&&(cancelAnimationFrame(it),it=0),se())}function Wf(){gt&&(ke=!1,se())}function Yf(){gt&&se()}function Xf(){gt&&se()}function Zf(t,e){if(gt){if(X(e,t)){ra(e,t),ot=t,se();return}pc(t)}}function vc(){let t=U();!t||nc.has(t)||(nc.add(t),t.addEventListener("input",ac,{capture:!0,passive:!0}),t.addEventListener("compositionend",ac,{capture:!0,passive:!0}))}var xc=y({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:lc,startAt:"DOMContentLoaded",cleanupSelectors:[`#${Le}`],start(){gt=!0,kt=cc()||kt,rc(),$o?.disconnect(),$o=Yl(Le,t=>{ae(t)&&(kt=t),dc()}),nn?.abort(),nn=new AbortController,window.addEventListener("popstate",_o,{signal:nn.signal}),document.addEventListener("visibilitychange",Vf,{signal:nn.signal}),vc(),bc(),hc(),Do?.(),Do=W({onRise:Wf,onFall:Yf,onTick:Xf,onContext:Zf}),se(),qf.debug("favicon watch started")},stop(){gt=!1,it&&cancelAnimationFrame(it),it=0,Do?.(),Do=null,nn?.abort(),nn=null,gc(),Te?.disconnect(),Te=null,ea=null,$o?.disconnect(),$o=null,fc(),ot="",ke=!0,ur="wait",Wl(Le,kt)},onSettingsChange:rc});var wc=`.bloom-ih-hud {
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
`;var gy=new E("InputHistory"),oa=/\u200B/g,Ec=10,Sc=500,Tc=100,Qf=8,tp=120,ep=2e3,Fo=10,qo=S({maxEntries:{type:4,description:"Max stored prompts",min:Ec,max:Sc,default:Tc},history:{type:5,description:"Stored prompts",render:bp},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),ia=new Map,$=0,aa="",Ct=!1,mr=!1,ca=0,dr=null,sa,ua=null,Lc=!0;function bt(){let t=qo.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function kc(t){let e=G(Number(qo.store.maxEntries??Tc),Ec,Sc);return t.length>e?t.slice(t.length-e):t}function zo(t){qo.store.entries=kc(t)}function np(t){return t.replaceAll(oa,"").replace(/\n$/,"").trim()}function la(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Et);return n instanceof HTMLElement?n:U()}function rp(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!tt(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(oa,"").trim().length===0,last:i.toString().replaceAll(oa,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Cc(t){clearTimeout(sa),sa=setTimeout(()=>{if(t!==ca)return;mr=!1;let e=ua;e&&Yi(e,Lc)},tp)}function Mc(t,e,n){mr=!0,ua=t,Lc=n;let r=++ca;$t(t,e,n),Cc(r)}function op(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function on(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function ip(){document.querySelector(".bloom-ih-hud")?.remove()}function ap(t,e){let n=op();n.textContent=t;let r=(e.closest("form")??dt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-Qf)}px`,n.classList.add("bloom-ih-hud-on")}function da(t){let e=np(t);if(!e)return;let n=Date.now(),r=ia.get(e);if(r&&n-r<ep)return;ia.set(e,n);let o=bt().filter(i=>i!==e);o.push(e),zo(o),$=bt().length,Ct=!1,on()}function sp(t,e){let n=bt();if(!n.length&&t)return;$>=n.length&&(aa=tt(e),$=n.length);let r=t?$-1:$+1;r<0||r>n.length||($=r,Ct=!0,Mc(e,r===n.length?aa:n[r],t),r<n.length?ap(`${r+1} / ${n.length}`,e):on())}function lp(t){Ct=!1,on(),Mc(t,aa,!1),$=bt().length}function cp(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=la(t.target)??la(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&Ct&&!t.altKey&&!t.shiftKey){lp(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){da(tt(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=bt();if(!r){let i=rp(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||$<=0)||!n&&$>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),sp(n,e))}function up(t){if(la(t.target)){if(mr){Cc(ca);return}Ct&&(Ct=!1,on(),$=bt().length)}}function dp(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(Et);n instanceof HTMLElement&&da(tt(n))}function mp(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(Je);if(!n||!(n instanceof HTMLElement)||P(n))return;let r=U();r&&da(tt(r))}function fp(t){if(!(!Ct||mr)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}Ct=!1,on()}}function pp(){if(dr)return;dr=new AbortController;let{signal:t}=dr,e={capture:!0,signal:t};window.addEventListener("keydown",cp,e),window.addEventListener("input",up,e),window.addEventListener("submit",dp,e),window.addEventListener("click",mp,e),window.addEventListener("pointerdown",fp,e)}function gp(t){let e=bt().slice();e.splice(t,1),zo(e),$>e.length&&($=e.length)}function bp(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=bt().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(m=>m.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/Fo));n>=l&&(n=l-1);let c=s.slice(n*Fo,n*Fo+Fo);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let m=document.createElement("div");m.className="bloom-ih-list",c.forEach((L,A)=>{let B=i.indexOf(L),It=bt().length-1-B,xt=document.createElement("div");xt.className="bloom-ih-item";let Y=document.createElement("button");Y.type="button",Y.className=`bloom-ih-body${r===A?"":" bloom-ih-clamp"}`,Y.textContent=L,Y.addEventListener("click",()=>{r=r===A?-1:A,o()});let H=document.createElement("div");H.className="bloom-ih-actions";let J=document.createElement("button");J.type="button",J.title="Copy",J.textContent="C",J.addEventListener("click",()=>{Os(L)});let Ot=document.createElement("button");Ot.type="button",Ot.title="Delete",Ot.textContent="\xD7",Ot.addEventListener("click",()=>{gp(It),o()}),H.append(J,Ot),xt.append(Y,H),m.appendChild(xt)}),t.appendChild(m)}else{let m=document.createElement("p");m.className="bloom-ih-empty",m.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(m)}let d=document.createElement("div");d.className="bloom-ih-pager";let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Prev",f.disabled=n<=0,f.addEventListener("click",()=>{n-=1,o()});let b=document.createElement("span");b.textContent=`${n+1} / ${l}`;let g=document.createElement("button");g.type="button",g.className="bloom-ih-btn",g.textContent="Next",g.disabled=n+1>=l,g.addEventListener("click",()=>{n+=1,o()});let h=document.createElement("button");h.type="button",h.className="bloom-ih-clear",h.textContent="Clear all",h.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(zo([]),$=0,o())}),d.append(f,b,g,h),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var Ac=y({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:qo,startAt:"HostReady",managedStyle:"inputHistory",start(){w("inputHistory",wc),$=bt().length,Ct=!1,pp()},stop(){dr?.abort(),dr=null,on(),ip(),ia.clear(),clearTimeout(sa),mr=!1,ua=null,Ct=!1},onSettingsChange(){let t=bt(),e=kc(t);e.length!==t.length&&zo(e),$>e.length&&($=e.length)}});var ma="noShareLink",hp=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],yp=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],fa=S({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Hc(t){return`${t.join(",")}{display:none!important}`}function Nc(){let t=[];if(fa.store.hideShareChat!==!1&&t.push(Hc(hp)),fa.store.hideShareProject!==!1&&t.push(Hc(yp)),!t.length){x(ma);return}w(ma,t.join(`
`))}var Rc=y({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:fa,start:Nc,onSettingsChange:Nc,stop(){x(ma)}});var Oc="noDictation",vp=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],xp=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Bc=S({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Pc(t){return`${t.join(",")}{display:none!important}`}function Ic(){let t=[Pc(vp)];Bc.store.hideDictationSettings!==!1&&t.push(Pc(xp)),w(Oc,t.join(`
`))}var Dc=y({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Bc,start:Ic,onSettingsChange:Ic,stop(){x(Oc)}});var pa="noSidebarIdentity",an=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Fc=an.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),qc=an.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),wp=[...Fc,...qc],Ep=[...Fc,...an.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],Sp=an.map(t=>`${t} a[href^="mailto:"]`),Tp=an.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),Lp=an.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),fr=S({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function $c(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function kp(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function Cp(){return`${Lp.join(",")}{margin-block:auto!important}`}function Mp(){return`${Tp.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function _c(){let t=fr.store.hideUsername!==!1,e=fr.store.hideEmail!==!1,n=t&&fr.store.enlargePlan!==!1,r=t&&fr.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(kp([...Ep,...qc])),o.push(Cp())):o.push($c(wp))),e&&o.push($c(Sp)),n&&o.push(Mp()),!o.length){x(pa);return}w(pa,o.join(`
`))}var zc=y({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:fr,start:_c,onSettingsChange:_c,stop(){x(pa)}});var jc=`#bloom-rt-host {
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
`;var Kc=new E("RecentTopics"),cn="bloom-rt-host",Vc="home",Wc=/^\/c\/([a-z0-9_-]{8,})/i,Hp=/\/c\/([a-z0-9_-]{8,})/i,Yc=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Np=new Set(["Backquote","IntlBackslash"]),Rp=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Pp=140,Ip=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),_=S({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Ip},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),jo=null,ba=null,Z=!1,vr=!1,pr=!1,Mt=0,Ce="",sn=null,gr=null,ln,ga=null;function Op(){let t=Number(_.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function br(){let t=_.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function ha(){let t=_.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Xc(){let t=_.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function ya(){let t=_.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Uo(t){let e=Op();return t.length>e?t.slice(0,e):t}function At(t){return t===Vc}function hr(t,e=Pp){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function va(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(Wc)?.[1]??""}catch{return t.match(Hp)?.[1]??""}}function Me(){let t=(location.pathname||"/").match(Wc);if(t?.[1])return t[1];let n=et().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return Vc}function xa(t){if(At(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(va(r.getAttribute("href")||"")!==t)continue;let o=hr(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return Me()===t&&e&&!/^ChatGPT$/i.test(e)?hr(e,80):""}function Bp(t){if(At(t))return"New chat";let e=ha()[t];if(e)return e;let n=en(t);return n||xa(t)||"Chat"}function Dp(t){return ya()[t]||""}function $p(t){return Xc()[t]||{}}function wa(t,e){if(!t||At(t)||!e||/^new chat$/i.test(e.trim()))return;let n=ha();n[t]!==e&&(n[t]=e,_.store.titles=n)}function _p(t){t.type==="conversation-meta"&&(wa(t.conversationId,t.title),Z&&un())}function Fp(t,e){if(!t||At(t)||!e)return;let n=ya();n[t]!==e&&(n[t]=e,_.store.projects=n)}function qp(t,e){if(!t||At(t)||!e.user&&!e.assistant)return;let n=Xc(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,_.store.previews=n)}function Ea(t){if(!t||At(t)&&_.store.includeHome===!1)return;let e=br().filter(n=>n!==t);e.unshift(t),_.store.visits=Uo(e)}function Ko(){let t=_.store.includeHome!==!1;return Uo(br().filter(n=>t||!At(n))).map(n=>({id:n,title:Bp(n),project:Dp(n),preview:$p(n)}))}function Gc(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return hr(o)}catch{return""}}function yr(t){if(!t||At(t)||t!==Me())return;let e=xa(t);e&&wa(t,e);let n=Gc("user"),r=Gc("assistant");qp(t,{user:n,assistant:r});let o=Jc(t);if(o){let i=Zc(o);i&&Fp(t,i)}}function Sa(){let t=ha(),e=ya(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${cn}, #bloom-root, #bloom-sidebar-panel`))continue;let u=va(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=hr(c.textContent||"",80);d&&!Yc.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let f=Zc(c);f&&e[u]!==f&&(e[u]=f,i=!0)}}catch{}o&&(_.store.titles=t),i&&(_.store.projects=e);let a=br(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(_.store.visits=Uo([...a,...l]))}function Zc(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=hr((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!Yc.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function Jc(t){if(At(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(va(e.getAttribute("href")||"")===t)return e}catch{}return null}function zp(t){let e=Jc(t);if(e){e.click();return}if(At(t)){location.assign("/");return}location.assign(`/c/${t}`)}function jp(){let t=Me();Ce&&Ce!==t&&yr(Ce),Ce=t,Ea(t),Sa();let e=xa(t);e&&wa(t,e),yr(t)}function Go(){ln===void 0&&(ln=window.setTimeout(()=>{ln=void 0,jp()},120))}function Gp(){sn||(sn=history.pushState.bind(history),gr=history.replaceState.bind(history),history.pushState=function(...e){let n=sn(...e);return Go(),n},history.replaceState=function(...e){let n=gr(...e);return Go(),n})}function Up(){sn&&(history.pushState=sn),gr&&(history.replaceState=gr),sn=null,gr=null}function Kp(t){return Np.has(t.code)||t.keyCode===192?!0:Rp.has(t.key)}function Qc(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function Vp(t,e){vr=e,Sa(),yr(Me()),Z=!0,Mt=0;try{let n=Me();Ea(n);let r=Ko();r.length>1&&(Mt=t?r.length-1:1)}catch(n){Kc.error("Failed to open switcher:",n)}un()}function Uc(t){let{length:e}=Ko();e&&(Mt=(Mt+(t?-1:1)+e)%e,un())}function Ta(){if(!Z)return;let t=Ko()[Mt];Z=!1,vr=!1,un(),t&&zp(t.id)}function tu(){Z&&(Z=!1,vr=!1,un())}function Wp(t){if(Qc(t)){pr=!0;return}if((t.ctrlKey||pr)&&!t.altKey&&!t.metaKey&&Kp(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{Z?Uc(t.shiftKey):Vp(t.shiftKey,!0)}catch(n){Kc.error("Hotkey failed:",n)}return}if(Z){if(t.key==="Escape"){t.preventDefault(),tu();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),Ta();return}t.key==="Tab"&&(t.ctrlKey||pr)&&(t.preventDefault(),Uc(t.shiftKey))}}function Yp(t){Qc(t)&&(pr=!1,Z&&vr&&Ta())}function Xp(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(Go)}function Zp(t){!Z||(t.target instanceof Element?t.target:null)?.closest(`#${cn}`)||tu()}function Jp(){document.visibilityState==="hidden"&&yr(Me())}function Qp(){if(!document.body)return null;let t=document.getElementById(cn);if(t instanceof HTMLElement)return ba=t,t;t=document.createElement("div"),t.id=cn;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),ba=t,t}function un(){let t=Qp();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!Z){e.dataset.visible="false",e.replaceChildren();return}let n=Ko();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}Mt>=n.length&&(Mt=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===Mt?"true":"false",s.setAttribute("aria-selected",a===Mt?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{Mt=a,Ta()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function tg(){document.getElementById(cn)?.remove(),ba=null}var eu=y({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${cn}`],settings:_,start(){w("recentTopics",jc),Ce=Me(),Ea(Ce),Sa(),yr(Ce),ga=nt(_p),Gp(),jo=new AbortController;let{signal:t}=jo;window.addEventListener("keydown",Wp,{capture:!0,signal:t}),window.addEventListener("keyup",Yp,{capture:!0,signal:t}),window.addEventListener("popstate",Go,{signal:t}),document.addEventListener("click",Xp,{capture:!0,signal:t}),document.addEventListener("click",Zp,{signal:t}),document.addEventListener("visibilitychange",Jp,{signal:t})},stop(){jo?.abort(),jo=null,ln!==void 0&&(clearTimeout(ln),ln=void 0),Up(),ga?.(),ga=null,Z=!1,vr=!1,pr=!1,tg()},onSettingsChange(){let t=Uo(br());t.length!==br().length&&(_.store.visits=t),Z&&un()}});var La="cleaner",eg=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],ng=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],rg=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],og=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],ig=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],ag=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],Ae=S({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function dn(t){return`${t.join(",")}{display:none!important}`}function nu(){let t=[];if(Ae.store.hideDownloadApps!==!1&&t.push(dn(eg)),Ae.store.hideDisclaimer!==!1&&t.push(dn(ng)),Ae.store.hideUpgrade!==!1&&t.push(dn(rg)),Ae.store.hideLockedModels!==!1&&t.push(dn(og)),Ae.store.hideHomePromo!==!1&&t.push(dn(ig)),Ae.store.hideAds!==!1&&t.push(dn(ag)),!t.length){x(La);return}w(La,t.join(`
`))}var ru=y({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Ae,start:nu,onSettingsChange:nu,stop(){x(La)}});var Wo=new E("ResponseNotification"),fn=S({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:fg},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),ka=!1,Vo=null,mn=null,xr=null;function sg(){return document.visibilityState==="hidden"||document.hidden}function lg(){return fn.store.onlyWhenHidden===!1?!0:sg()}function cg(){let t=en(R());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function ou(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!mn||mn.state==="closed")&&(mn=new t);let e=mn,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){Wo.debug("chime failed",t)}}function ug(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){Wo.debug("custom sound failed",e),ou()}}function iu(){let t=String(fn.store.soundUrl||"").trim();t?ug(t):ou()}function dg(){let t="Bloom++",e=`${cg()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){Wo.debug("notification failed",n)}}function mg(){lg()&&(fn.store.sound!==!1&&iu(),fn.store.browserNotification!==!1&&dg())}function fg(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>iu()),t.appendChild(e),()=>{e.remove()}}var au=y({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:fn,start(){ka=!0,Vo?.(),Vo=W(t=>{ka&&(t.userStopped||t.error||mg())}),xr?.abort(),xr=new AbortController,fn.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:xr.signal}),Wo.debug("watch started")},stop(){ka=!1,Vo?.(),Vo=null,xr?.abort(),xr=null;try{mn?.close()}catch{}mn=null}});var su=`#bloom-pq-chip {
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
`;var Tr=new E("PromptQueue"),Ma="bloom-pq-chip",lu="promptQueue",cu=80,gg=50,bg=2e3,fu=S({replacePending:{type:2,description:"Replace the queued prompt if you Enter again while one is waiting.",default:!0}}),q=new Map,Ft=!1,ht="",F="",ce=!1,yt=!1,O=null,wr=null,Yo=null,Sr,Er,pn=null;function gn(){return _t(et())}function bn(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function uu(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Et);return n instanceof HTMLElement?n:U()}function Aa(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function pu(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function hg(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?bn(e.innerText||e.textContent||""):""}catch{return""}}function du(t){if(!ht||ht===t)return;let e=q.get(ht);!e||q.has(t)||X(ht,t)&&(q.delete(ht),q.set(t,e),F===ht&&(F=t),O?.key===ht&&(O.key=t),Tr.debug("migrated pending",ht,"\u2192",t))}function Ha(t){let e=gn();if(q.get(e)&&fu.store.replacePending===!1)return;q.set(e,{text:t,at:Date.now()}),O={key:e,text:t,turns:pu(),ticks:3};let r=U();r&&$t(r,""),le(),Tr.debug("queued",e,t.length)}function yg(t){q.delete(t),F===t&&(F=""),O?.key===t&&(O=null),le()}function vg(){yt=!0,clearTimeout(Er),Er=setTimeout(()=>{yt=!1,Er=void 0},bg)}function xg(){let t=gn(),e=q.get(t);if(!e)return;let n=U();if(!n)return;q.delete(t),F="",le(),vg(),$t(n,e.text);let r=re();r&&!P(r)&&!ko(r)&&(r.click(),yt=!1)}function mu(t){if(!Ft||ce||D()||gn()!==t)return;let e=q.get(t);if(!e){F="";return}if(ft())return;let n=U();if(!n)return;if(!ne(n)){let o=bn(tt(n));if(o&&o!==e.text)return}let r=re();!r||P(r)||ko(r)||(ce=!0,$t(n,e.text),clearTimeout(Sr),Sr=setTimeout(()=>wg(t,e.text),gg))}function wg(t,e){Sr=void 0;try{if(!Ft)return;let n=q.get(t);if(!n||n.text!==e||D()||gn()!==t)return;let r=U();if(!r)return;let o=bn(tt(r));if(o&&o!==e&&!ne(r))return;o!==e&&$t(r,e);let i=re();if(!i||P(i)||ko(i))return;i.click(),q.delete(t),F="",le(),Tr.debug("drained",t)}finally{ce=!1}}function gu(t){let e=dt();if(!e||e===document.body){t.style.left="50%",t.style.bottom="6.5rem";return}let n=e.getBoundingClientRect();t.style.left=`${Math.round(n.left+n.width/2)}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`;let r=Math.min(512,Math.max(160,n.width-24));t.style.maxWidth=`${Math.round(r)}px`}function Ca(){pn?.remove(),pn=null}function le(){if(!Ft||!document.body){Ca();return}let t=gn(),e=q.get(t);if(!e){Ca();return}let n=pn;n?.isConnected||(n=document.createElement("div"),n.id=Ma,document.body.appendChild(n),pn=n),n.replaceChildren();let r=document.createElement("span");r.className="bloom-pq-kicker",r.textContent="Next";let o=document.createElement("span");o.className="bloom-pq-text";let i=e.text.length>cu?`${e.text.slice(0,cu)}\u2026`:e.text;o.textContent=i,o.title=e.text;let a=document.createElement("div");a.className="bloom-pq-actions";let s=document.createElement("button");s.type="button",s.className="bloom-pq-btn bloom-pq-send",s.textContent="Send now",s.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),xg()});let l=document.createElement("button");l.type="button",l.className="bloom-pq-btn bloom-pq-x",l.setAttribute("aria-label","Dismiss queued prompt"),l.textContent="\xD7",l.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),yg(t)}),a.append(s,l),n.append(r,o,a),gu(n)}function Eg(){if(!O)return;if(O.ticks-=1,q.get(O.key)&&pu()>O.turns){let e=hg();if(e&&e===O.text){Tr.debug("native send leaked; dropping pending"),q.delete(O.key),F===O.key&&(F=""),O=null,le();return}}O.ticks<=0&&(O=null)}function Sg(t){if(!Ft||t.isComposing||t.keyCode===229||t.key!=="Enter"||t.shiftKey||t.ctrlKey||t.metaKey||ce)return;let e=uu(t.target)??uu(document.activeElement);if(!e||!D())return;if(t.altKey||yt){yt=!1;return}if(!mt(e))return;let n=bn(tt(e));n&&(Aa(t),Ha(n))}function Tg(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||P(e))return null;let n=t.closest(Je);if(n instanceof HTMLElement&&!P(n))return n;let r=re();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function Lg(t){if(!Ft)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${Ma}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&P(n)||ce||!D()||!Tg(e))return;if(yt){yt=!1;return}let r=U();if(!r||!mt(r))return;let o=bn(tt(r));o&&(Aa(t),Ha(o))}function kg(t){if(!Ft)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(Lo)&&!e.querySelector(Et)||ce||!D())return;if(yt){yt=!1;return}let n=U()??e.querySelector(Et);if(!n||!mt(n))return;let r=bn(tt(n));r&&(Aa(t),Ha(r))}var bu=y({name:"PromptQueue",description:"Queue the next prompt while a reply is streaming. Enter/Send waits for this turn instead of interrupting.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:lu,cleanupSelectors:[`#${Ma}`],settings:fu,start(){Ft=!0,ht=gn(),F="",ce=!1,yt=!1,O=null,w(lu,su),wr?.abort(),wr=new AbortController;let{signal:t}=wr;window.addEventListener("keydown",Sg,{capture:!0,signal:t}),document.addEventListener("click",Lg,{capture:!0,signal:t}),document.addEventListener("submit",kg,{capture:!0,signal:t}),Yo?.(),Yo=W({onFall(e){if(Ft){if(e.userStopped||e.error){F="",le();return}F=e.contextKey,mu(e.contextKey)}},onContext(e){du(e),ht=e,le()},onTick(e){du(e.contextKey),ht=e.contextKey,Eg(),F&&F===e.contextKey&&mu(F),pn&&gu(pn)}}),le(),Tr.debug("watch started")},stop(){Ft=!1,Yo?.(),Yo=null,wr?.abort(),wr=null,clearTimeout(Sr),Sr=void 0,clearTimeout(Er),Er=void 0,q.clear(),O=null,F="",ce=!1,yt=!1,Ca()}});var hu=`.bloom-cls {
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
`;var xu=new E("ChatListStatus"),yu="chatListStatus",Jo="bloom-cls",Mg="bloom-cls",Ag=1200*1e3,Hg="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",Ht=new Map,Nt=!1,hn="",qt=!1,at=0,ue=null,Pa=null,yn=null,Na=null,Xo=null,Lr=null,vn=!1,xn=new Set;function Zo(){return Date.now()}function wu(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function He(t,e,n,r=!0){if(!(!t||!Nt)){if(e==="idle")Ht.delete(t);else{let o=Ht.get(t);o&&o.kind===e&&n!=="net"?o.at=Zo():Ht.set(t,{kind:e,at:Zo(),source:n})}r&&Ng({v:1,id:t,kind:e,at:Zo()}),wn()}}function Ng(t){try{yn?.postMessage(t)}catch{}}function Rg(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||He(e.id,e.kind,"bc",!1)}function Pg(){let t=Zo();for(let[e,n]of Ht)n.kind==="streaming"&&t-n.at>Ag&&Ht.delete(e)}function Ig(){let t=wu();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(r.closest(Hg))continue;let o=Qe(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function vu(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function Ra(t){let e=t.querySelector(`:scope > .${Jo}`);return e||null}function Ia(){if(!Nt)return;Pg();let t=R(),e=Ig();ue?.disconnect();try{for(let n of e){let r=Qe(n.getAttribute("href")||"");if(!r||!t||r!==t){Ra(n)?.remove();continue}let i=Ht.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){Ra(n)?.remove();continue}let a=Ra(n);a||(a=document.createElement("span"),a.className=Jo,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(vu("streaming")):i==="error"&&a.appendChild(vu("error")))}}catch(n){xu.debug("paint failed",n)}Eu()}function wn(){if(Nt){if(document.hidden){at&&(cancelAnimationFrame(at),at=0),Ia();return}at||(at=requestAnimationFrame(()=>{at=0,Nt&&Ia()}))}}function Eu(){let t=wu();if(!(ue&&Pa===t&&t?.isConnected)){if(ue?.disconnect(),Pa=t,!t){ue=null;return}ue=new MutationObserver(()=>wn()),ue.observe(t,{childList:!0,subtree:!0})}}function Oa(){return!!(ve()||sr())}function Og(t){return!!(vn||t&&xn.has(t)||Oa())}function Bg(t){if(Nt){if(t.type==="post-start"){t.conversationId?(vn=!1,xn.add(t.conversationId),qt=!0,He(t.conversationId,"streaming","net")):(vn=!0,qt=!0);return}t.type==="post-end"&&(vn=!1,t.conversationId&&(xn.delete(t.conversationId),He(t.conversationId,t.error?"error":"done","net")),Oa()||(qt=!1))}}function Dg(t,e){if(!Nt)return;if(X(e,t)){wn();return}let n=R();if(!(vn||n&&xn.has(n))){if(qt=!1,n&&Ht.get(n)?.kind==="streaming"&&Ht.get(n)?.source==="local"){He(n,"idle","local");return}wn()}}function $g(t){if(!Nt)return;let e=t.conversationId||R();if(hn&&e&&hn!==e){let r=Ht.get(hn);r?.kind==="streaming"&&r.source==="local"&&He(hn,ft()?"error":"done","local"),qt=!!(e&&xn.has(e))}if(hn=e,Og(e)&&(t.streaming||Oa())){qt=!0,e&&He(e,"streaming","local"),wn();return}qt&&(qt=!1,e&&He(e,ft()?"error":"done","local")),wn()}var Su=y({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Jo}`],start(){Nt=!0,w(yu,hu);try{yn=new BroadcastChannel(Mg)}catch{yn=null}yn?.addEventListener("message",Rg),Na=nt(Bg),Xo?.(),Xo=W({onTick:$g,onContext:Dg}),Lr?.abort(),Lr=new AbortController,document.addEventListener("visibilitychange",()=>{Nt&&(at&&(cancelAnimationFrame(at),at=0),Ia())},{signal:Lr.signal}),Eu(),xu.debug("sidebar status watch started")},stop(){Nt=!1,at&&cancelAnimationFrame(at),at=0,Lr?.abort(),Lr=null,ue?.disconnect(),ue=null,Pa=null,Xo?.(),Xo=null,Na?.(),Na=null;try{yn?.close()}catch{}yn=null,Ht.clear(),xn.clear(),vn=!1,qt=!1,hn="",document.querySelectorAll(`.${Jo}`).forEach(t=>t.remove()),x(yu)}});var Lu="widerChat",ku=40,Cu=96,Mu=64,Au=S({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:ku,max:Cu,default:Mu}});function _g(){return G(Number(Au.store.width??Mu),ku,Cu)}function Tu(){let t=_g(),e=`min(100%,${t}rem)`;w(Lu,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var Hu=y({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Au,start:Tu,onSettingsChange:Tu,stop(){x(Lu)}});var Ba="composerOpacity",En='form[data-type="unified-composer"],form.w-full[data-type]',Fg=[`${En} [class*="corner-superellipse"]`,`${En} [class*="bg-token-bg-primary"]`,`${En} [class*="bg-token-main-surface"]`].join(","),qg=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),zg="#thread-bottom-container,#thread-bottom",jg=`${En} #prompt-textarea,${En} [contenteditable="true"]`,Gg="var(--bg-primary,var(--main-surface-primary,#ffffff))",Da=S({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function Ug(){return G(Number(Da.store.opacity??100),0,100)}function Kg(){return G(Number(Da.store.blur??16),0,40)}function Nu(){let t=Ug();if(t>=100){x(Ba);return}let e=Kg(),n=`color-mix(in srgb,${Gg} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";w(Ba,`${zg}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${qg}{display:none!important}${En}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Fg}{background-color:${n}!important;background-image:none!important;${r}}${jg}{background-color:transparent!important;background-image:none!important}`)}var Ru=y({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[v.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Da,start:Nu,onSettingsChange:Nu,stop(){x(Ba)}});var Pu=`#bloom-bn-host {
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
`;var Wg=new E("BetterNavigator"),$a="betterNavigator",Iu="bloom-bn-host",za=60,Yg=16,Xg=1e3,Zg=2.5,Jg=.4,ti="\u6B63\u5728\u8F93\u51FA\u2026",Qg=40,tb=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,eb=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),nb=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='thinking']","[class*='reasoning']","[class*='footnote']",".sr-only"].join(", "),rb=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),ii=S({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),Sn=new Map,Tn=new Set,vt=!1,Pe=!1,de=null,Hr=null,Ie=null,ei=null,z=[],Oe="",ni=0,ri=-1,Wa=0,oi="",st=0,zt=0,kr,Cr=null,Qo=null,_a=null,Fa=null,Ne=null,ja=null,Mr=null,Re=null,Ln=null,Ar=null;function ai(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function qa(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function ob(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function ib(t){let e=t.getBoundingClientRect(),n=null;try{let i=t.querySelector("[data-message-id]");for(;i&&i!==t;)tb.test(ob(i))&&(n=i),i=i.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=qa(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||qa(getComputedStyle(t).getPropertyValue("--thread-content-width"))||qa(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function ab(t){try{return!!t.closest(eb)}catch{return!0}}function sb(t){let e=(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("aria-label")||"").toLowerCase();return n.includes("you said")?"user":n.includes("chatgpt said")||n.includes("assistant said")?"assistant":null}function Ou(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(i.closest(nb))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return(o.textContent||"").replace(/\s+/g," ").trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<za+20;)e.push((r.textContent||"").replace(/\s+/g," ").trim());return e.join(" ").replace(/\s+/g," ").trim()}function lb(t,e){try{if(t.querySelector("img, picture, video, canvas"))return"Image";if(t.querySelector("a[download], [class*='attachment']"))return"File";if(t.querySelector("pre, code"))return"Code"}catch{}return`Message ${e+1}`}function cb(t,e){let n=e==="user"?t.querySelector(".whitespace-pre-wrap")??t:t.querySelector(".markdown")??t;return Ou(n)}function ub(t){return t.length>za?`${t.slice(0,za).trimEnd()}\u2026`:t}function db(t,e,n,r){let o=cb(t,e);return o?ub(o):r?ti:lb(t,n)}function mb(){if(Pe)return!0;let t=R();return!!(t&&Tn.has(t)||ve()||sr())}function fb(t){try{if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming")||t.querySelector("[aria-busy='true'], .result-streaming"))return!0;let e=t.querySelector(".markdown");if((!e||e instanceof HTMLElement&&!Ou(e))&&t.querySelector("[class*='thinking'], [class*='reasoning'], details"))return!0}catch{}return!1}function pb(){let t=ai();if(!t||t===document.body)return[];let e=ii.store.showAssistant!==!1,n=e&&mb(),r=[];try{for(let o of t.querySelectorAll("[data-message-id]")){if(ab(o))continue;let i=o.getAttribute("data-message-id")||"";if(!i)continue;let a=sb(o);if(a!=="user"&&a!=="assistant"||a==="assistant"&&!e)continue;let s=a==="assistant"&&n&&fb(o),l=db(o,a,r.length,s);l&&l!==ti&&l!==Sn.get(i)&&Sn.set(i,l);let c=s&&l===ti?ti:Sn.get(i)||l;r.push({id:i,el:o,role:a,text:c,live:s})}}catch{}return r}function gb(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function Bu(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function bb(t){return t===window?window.innerHeight:t.clientHeight}function hb(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(rb)}catch{return!1}}function Du(){kr!==void 0&&(clearTimeout(kr),kr=void 0),Cr?.classList.remove("bloom-bn-flash"),Cr=null}function yb(t){Du(),t.classList.add("bloom-bn-flash"),Cr=t,kr=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),Cr===t&&(Cr=null),kr=void 0},800)}function Ga(t){if(!z.length)return;let e=Math.max(0,Math.min(t,z.length-1));ni=e,Hr?.querySelectorAll(".bloom-bn-tick").forEach((r,o)=>{r.classList.toggle("bloom-bn-current",o===e)}),Ie?.querySelectorAll(".bloom-bn-item").forEach((r,o)=>{r.classList.toggle("bloom-bn-active",o===e)}),ei&&(ei.textContent=`${e+1} / ${z.length}`);let n=Ie?.children[e];if(n instanceof HTMLElement){let r=Ie;if(r){let o=n.offsetTop-r.clientHeight/2+n.offsetHeight/2;r.scrollTop=Math.max(0,o)}}}function Ua(t){let e=z[t];if(!e?.el.isConnected)return;ri=t,Wa=Date.now()+Xg,Ga(t);let n=Ln??Bu(e.el),o=Math.abs(e.el.getBoundingClientRect().top-gb())>Zg*bb(n);e.el.scrollIntoView({behavior:o?"auto":"smooth",block:"start"}),ii.store.jumpEffect!=="none"&&yb(e.el)}function Ya(){if(!vt||!z.length)return;if(Date.now()<Wa&&ri>=0){Ga(ri);return}let t=window.innerHeight*Jg,e=0;for(let n=0;n<z.length;n++){let r=z[n].el;r.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}Ga(e)}function vb(t){let e=Bu(t);if(Ln===e&&Ar)return;Ar?.(),Ln=e;let n=e===window?document:e,r=()=>{Ya(),Xa()};n.addEventListener("scroll",r,{passive:!0}),Ar=()=>n.removeEventListener("scroll",r)}function xb(t){Re?.disconnect(),Re=null;let e=Ln instanceof HTMLElement?Ln:null;Re=new IntersectionObserver(()=>Ya(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el.isConnected&&Re.observe(n.el)}function wb(){if(!document.body)return null;let t=de;if(t?.isConnected)return t;t=document.createElement("div"),t.id=Iu,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),de=t,Hr=e,Ie=i,ei=o,t}function $u(){let t=de,e=ai();if(!t||!e||!e.isConnected||z.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=ib(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||Qg,d=n.right-r.right>=c+8?r.right+4:r.right-12-c;d=Math.min(d,n.right-c-8),d=Math.max(8,d);let f=Math.max(8,Math.round(window.innerWidth-d-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${f}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function Xa(){!vt||zt||(zt=requestAnimationFrame(()=>{zt=0,vt&&$u()}))}function Eb(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function Sb(t){let e=Hr,n=Ie;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>Yg),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=Eb(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",c=>{c.preventDefault(),Ua(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-mark",s.textContent=r.role==="user"?"You":"GPT";let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=r.text,l.title=r.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),Ua(o)}),n.appendChild(a)}))}function Tb(t){Hr?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=Ie?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function Lb(){let t=R();return t===oi?!1:(oi=t,Sn.clear(),z=[],Oe="",ni=0,ri=-1,Wa=0,Pe&&t&&(Tn.add(t),Pe=!1),!0)}function kb(t){let e=ii.store.showAssistant!==!1?"1":"0";return`${oi}|${e}|${t.map(n=>n.id).join(",")}`}function Ka(){if(!vt)return;Lb();let t=pb(),e=ai();if(!e||t.length<1){z=t,Oe="",de&&(de.hidden=!0),Re?.disconnect(),Va();return}wb();let n=kb(t);n!==Oe?(z=t,Oe=n,Sb(t),vb(e),xb(t)):(z=t,Tb(t)),$u(),Ya(),Va()}function jt(){if(vt){if(document.hidden){st&&(cancelAnimationFrame(st),st=0),Ka();return}st||(st=requestAnimationFrame(()=>{st=0,vt&&Ka()}))}}function Va(){let t=ai();if(!(Ne&&ja===t&&t?.isConnected)){if(Ne?.disconnect(),Mr?.disconnect(),ja=t,!t||t===document.body){Ne=null;return}Ne=new MutationObserver(()=>jt()),Ne.observe(t,{childList:!0,subtree:!0}),Mr=new ResizeObserver(()=>Xa()),Mr.observe(t)}}function Cb(t){if(vt){if(t.type==="post-start"){t.conversationId?(Pe=!1,Tn.add(t.conversationId)):Pe=!0,jt();return}if(t.type==="post-end"){if(Pe=!1,t.conversationId)Tn.delete(t.conversationId);else{let e=R();e&&Tn.delete(e)}jt()}}}function Mb(t){if(!vt||!z.length||de?.hidden||t.altKey||t.ctrlKey||t.metaKey||hb(t.target))return;let e=-1;if(t.key==="ArrowDown")e=ni+1;else if(t.key==="ArrowUp")e=ni-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=z.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),Ua(Math.max(0,Math.min(e,z.length-1)))}function Ab(){Du(),Re?.disconnect(),Re=null,Ne?.disconnect(),Ne=null,ja=null,Mr?.disconnect(),Mr=null,Ar?.(),Ar=null,Ln=null,de?.remove(),de=null,Hr=null,Ie=null,ei=null}var _u=y({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:$a,cleanupSelectors:[`#${Iu}`],settings:ii,start(){vt=!0,oi=R(),w($a,Pu),Qo=new AbortController;let{signal:t}=Qo;window.addEventListener("keydown",Mb,{signal:t}),window.addEventListener("popstate",jt,{signal:t}),window.visualViewport?.addEventListener("resize",Xa,{signal:t}),document.addEventListener("visibilitychange",()=>{vt&&(st&&(cancelAnimationFrame(st),st=0),zt&&(cancelAnimationFrame(zt),zt=0),Ka())},{signal:t}),Fa=nt(Cb),_a=W({onTick(){jt()},onFall(){jt()},onContext(e,n){X(n,e)||(Sn.clear(),Oe=""),jt()}}),Va(),jt(),Wg.debug("navigator started")},stop(){vt=!1,st&&cancelAnimationFrame(st),st=0,zt&&cancelAnimationFrame(zt),zt=0,Qo?.abort(),Qo=null,_a?.(),_a=null,Fa?.(),Fa=null,Tn.clear(),Pe=!1,Ab(),Sn.clear(),z=[],Oe="",x($a)},onSettingsChange(){Oe="",jt()}});var Fu=`.bloom-ts {
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
`;function qu(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function zu(t){try{return new Date(t).toISOString()}catch{return""}}var Ku=new E("MessageTimestamps"),ju="messageTimestamps",li="bloom-ts",Gu=1500,Nb="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",kn=S({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),Cn=new Map,De=!1,lt=0,me=null,Ja=null,Za=null,si=null,Nr=null,Uu=!1;function Vu(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function ts(){let t=kn.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Wu(){let t={...ts()};for(let[n,r]of Cn)t[n]=r;let e=Object.keys(t);if(e.length>Gu){let n=e.slice(e.length-Gu),r={};for(let o of n)r[o]=t[o];kn.store.stamps=r;return}kn.store.stamps=t}var Rb=Bs(Wu,500);function Yu(t,e){!t||!e||Cn.get(t)===e||(Cn.set(t,e),Rb(),Be())}function Pb(t){return t?Cn.get(t)??ts()[t]??No(t)??null:null}function Ib(t){De&&t.type==="message-time"&&Yu(t.messageId,t.createTime)}function Ob(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function Bb(){let t=Vu();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll("[data-message-id]"))n.closest(Nb)||e.push(n)}catch{}return e}function Db(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function Qa(){if(!De)return;let t=kn.store.hideOwnMessages===!0,e=kn.store.showDate!==!1,n=D(),r=Bb();me?.disconnect();try{r.forEach((o,i)=>{let a=o.getAttribute("data-message-id")||"",s=Ob(o),l=o.querySelector(`:scope > .${li}`);if(t&&s==="user"){l?.remove();return}if(Db(o)){l?.remove();return}let c=Pb(a);if(!c&&a&&(n||Uu)&&i>=r.length-2&&(c=Date.now(),Yu(a,c)),!c){l?.remove();return}let u=qu(c,e);if(!u){l?.remove();return}let d=l;d||(d=document.createElement("time"),d.className=li,d.setAttribute("aria-hidden","true"),o.insertBefore(d,o.firstChild)),d.textContent!==u&&(d.textContent=u);let f=zu(c);f&&d.getAttribute("datetime")!==f&&d.setAttribute("datetime",f)})}catch(o){Ku.debug("paint failed",o)}Uu=n,Xu()}function Be(){if(De){if(document.hidden){lt&&(cancelAnimationFrame(lt),lt=0),Qa();return}lt||(lt=requestAnimationFrame(()=>{lt=0,De&&Qa()}))}}function Xu(){let t=Vu();if(!(me&&Ja===t&&t?.isConnected)){if(me?.disconnect(),Ja=t,!t||t===document.body){me=null;return}me=new MutationObserver(()=>Be()),me.observe(t,{childList:!0,subtree:!0})}}var Zu=y({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${li}`],settings:kn,start(){De=!0,w(ju,Fu);let t=ts();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&Cn.set(e,n);Za=nt(Ib),si?.(),si=W({onTick:Be,onFall:Be,onContext:Be}),Nr?.abort(),Nr=new AbortController,document.addEventListener("visibilitychange",()=>{De&&(lt&&(cancelAnimationFrame(lt),lt=0),Qa())},{signal:Nr.signal}),Xu(),Be(),Ku.debug("timestamp watch started")},stop(){De=!1,lt&&cancelAnimationFrame(lt),lt=0,Nr?.abort(),Nr=null,me?.disconnect(),me=null,Ja=null,si?.(),si=null,Za?.(),Za=null,Wu(),Cn.clear(),document.querySelectorAll(`.${li}`).forEach(t=>t.remove()),x(ju)},onSettingsChange:Be});var es="streamerMode",$b="filter:blur(6px)!important;transition:filter .2s ease",_b="filter:none!important",Mn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],An=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function ct(t,e){return t.map(n=>`${n} ${e}`)}var $e=S({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function Hn(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${$b}}${e?`${r}{${_b}}`:""}`}function Ju(){let t=[];if($e.store.conversations!==!1&&(t.push(Hn([...ct(An,'a[href^="/c/"]'),...ct(An,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),$e.store.projects!==!1&&(t.push(Hn([...ct(An,'a[href*="/project"]'),...ct(An,'a[href*="/g/g-p-"]'),...ct(An,'[data-testid="project-name"]'),...ct(An,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),$e.store.headerTitle!==!1&&t.push(Hn(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),$e.store.accountAvatar!==!1&&t.push(Hn([...ct(Mn,"img"),...ct(Mn,'[class*="avatar"]'),...ct(Mn,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),$e.store.accountName!==!1&&t.push(Hn([...ct(Mn,".min-w-0 > .truncate"),...ct(Mn,".min-w-0.flex-1 .truncate")],!1)),$e.store.accountEmail!==!1&&t.push(Hn([...ct(Mn,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!t.length){x(es);return}w(es,t.join(`
`))}var Qu=y({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[v.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:$e,start:Ju,onSettingsChange:Ju,stop(){x(es)}});var td=`.bloom-gc-panel {
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
}`;var qb=new E("GreetingCustomizer"),Nn="greetingCustomizer",ed="greetingCustomizerUi",Rr=100,rs=30,zb=120,jb=1e3,Gb=50,Ub=40,Kb=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),Pr=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),fi=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function Vb(t){return!!t?.closest(Kb)}function id(t){return!!(Vb(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function Fr(t){try{for(let e of document.querySelectorAll(t))if(!id(e))return e}catch{}return null}function ns(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(Fr(e))return e;return t}var ad=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],j=S({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:ch},greetings:{type:0,description:"Greeting texts",hidden:!0,default:ad},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),Rt=!1,In=!1,Fe=null,ui,Ir,Rn,Or,di=0,ci=null,Pn=null,Br=null,Dr=null,$r=null,mi=null;function Ut(){let t=location.pathname||"/";return t==="/"||t===""}function _e(){let t=j.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):ad.slice()}function _r(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function nd(t){j.store.greetings=t.slice(0,rs)}function qr(){let t=String(j.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function Wb(){return j.store.order==="random"?"random":"sequential"}function Yb(){return G(Number(j.store.intervalSec??10),1,3600)*1e3}function Xb(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Zb(){return!!Fr(fi)}function pi(){return!!(Fr(fi)||Fr(Pr))}function Jb(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=Zb()?ns(fi):Fr(Pr)?ns(Pr):ns(fi),i=e?`${Pr}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function Qb(t,e){if(t<=0)return 0;if(t===1)return Number(j.plain.index)!==0&&(j.store.index=0),Number(j.plain.lastRandom)!==0&&(j.store.lastRandom=0),0;let n=Number(j.plain.index),r=Number(j.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(Wb()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return j.store.index=s,j.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return j.store.index=i,i}function Gt(t){if(!Rt)return;if(!Ut()){x(Nn);return}let e=_e().map(_r).filter(Boolean);if(!e.length){x(Nn);return}let n=Qb(e.length,t),r=e[n]??e[0],o=qr()==="manual"&&e.length>1;w(Nn,Jb(Xb(r),o)),mi?.()}function os(){ui!==void 0&&(clearInterval(ui),ui=void 0)}function is(){os(),!(!Rt||!Ut())&&qr()==="interval"&&(_e().filter(Boolean).length<=1||(ui=setInterval(()=>Gt(!0),Yb())))}function as(){Or!==void 0&&(clearTimeout(Or),Or=void 0),di=0}function rd(){if(as(),!Rt||!Ut())return;di=Ub;let t=()=>{if(Or=void 0,!(!Rt||!Ut())){if(pi()){qr()==="refresh"&&!In?(In=!0,Gt(!0)):Gt(!1),is();return}di-=1,di>0&&(Or=setTimeout(t,Gb))}};t()}function ss(){if(Fe===!0){pi()?Gt(!1):rd();return}Fe=!0,In=!1,qr()==="refresh"?(In=!0,Gt(!0)):Gt(!1),is(),pi()||rd()}function ls(){Fe=!1,In=!1,os(),as(),x(Nn)}function gi(){Rn===void 0&&(Rn=window.setTimeout(()=>{Rn=void 0,Rt&&(Ut()?ss():Fe!==!1&&ls())},zb))}function th(){Pn||(Pn=history.pushState.bind(history),Br=history.replaceState.bind(history),Dr=function(...e){let n=Pn(...e);return gi(),n},$r=function(...e){let n=Br(...e);return gi(),n},history.pushState=Dr,history.replaceState=$r)}function eh(){Dr&&history.pushState===Dr&&Pn&&(history.pushState=Pn),$r&&history.replaceState===$r&&Br&&(history.replaceState=Br),Pn=null,Br=null,Dr=null,$r=null}function nh(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(gi)}function rh(t){if(!Rt||!Ut()||qr()!=="manual"||_e().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(Pr);if(!n||id(n))return;let r=window.getSelection?.();r&&String(r).trim()||Gt(!0)}function oh(){Ir===void 0&&(Ir=setInterval(()=>{if(!Rt)return;let t=Ut();if(t!==(Fe===!0)){t?ss():ls();return}t&&pi()&&Gt(!1)},jb))}function ih(){Ir!==void 0&&(clearInterval(Ir),Ir=void 0)}function od(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var ah="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",sh="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function lh(t,e){let n=_r(t);return n?n.length>Rr?`Keep it to ${Rr} characters.`:_e().length+(e?1:0)>rs?`At most ${rs} greetings.`:null:"Enter a greeting."}function ch(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=_e(),s=Number(j.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=Rr,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let m=l.querySelector(".bloom-gc-count");m&&(m.textContent=`${_r(e).length}/${Rr}`);let L=l.querySelector(".bloom-gc-error");L&&(L.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${_r(e).length}/${Rr}`;let f=document.createElement("span");f.className="bloom-gc-error",f.textContent=r;let b=document.createElement("div");if(b.className="bloom-gc-actions",n>=0){let m=document.createElement("button");m.type="button",m.className="bloom-gc-btn",m.textContent="Cancel",m.addEventListener("click",()=>{n=-1,e="",r="",i()}),b.appendChild(m)}let g=document.createElement("button");if(g.type="button",g.className="bloom-gc-btn bloom-gc-btn-primary",g.textContent=n>=0?"Update":"Add",g.addEventListener("click",()=>{let m=n<0,L=lh(e,m);if(L){r=L,i();return}let A=_r(e),B=_e().slice();n>=0&&n<B.length?B[n]=A:B.push(A),nd(B),n=-1,e="",r="",i()}),b.appendChild(g),u.append(d,f,b),l.appendChild(u),t.appendChild(l),!a.length){let m=document.createElement("p");m.className="bloom-gc-empty",m.textContent="No greetings. The official heading stays.",t.appendChild(m);return}let h=document.createElement("div");h.className="bloom-gc-list",a.forEach((m,L)=>{let A=document.createElement("div");A.className="bloom-gc-item",L===s&&(A.dataset.active="true");let B=document.createElement("button");B.type="button",B.className=`bloom-gc-body${o===L?"":" bloom-gc-clamp"}`,B.textContent=m,B.addEventListener("click",()=>{o=o===L?-1:L,i()});let It=document.createElement("div");It.className="bloom-gc-item-actions";let xt=od("Edit",ah);xt.addEventListener("click",()=>{n=L,e=m,r="",i()});let Y=od("Delete",sh);Y.addEventListener("click",()=>{let H=_e().filter((J,Ot)=>Ot!==L);nd(H),n===L?(n=-1,e=""):n>L&&(n-=1),i()}),It.append(xt,Y),A.append(B,It),h.appendChild(A)}),t.appendChild(h)};return mi=i,i(),()=>{mi===i&&(mi=null),t.replaceChildren()}}var sd=y({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:ed,settings:j,start(){Rt=!0,w(ed,td),th(),ci=new AbortController;let{signal:t}=ci;window.addEventListener("popstate",gi,{signal:t}),document.addEventListener("click",nh,{capture:!0,signal:t}),document.addEventListener("click",rh,{signal:t}),oh(),Fe=null,Ut()?ss():ls(),qb.debug("started")},stop(){Rt=!1,ci?.abort(),ci=null,Rn!==void 0&&(clearTimeout(Rn),Rn=void 0),os(),as(),ih(),eh(),x(Nn),In=!1,Fe=null},onSettingsChange(){Rt&&(Ut()?(Gt(!1),is()):x(Nn))}});var ld=`/*
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
`;var cd=new E("CustomSidebarIdentity"),ud="customSidebarIdentityUi",hd="customSidebarIdentity",dh="bloom-csi-face",mh="bloom-csi-name",Gr="data-bloom-csi",Ei="data-bloom-csi-orig",Pt="data-bloom-csi-slot",fh="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",ph=1024,bi=256,yd=24,vd=64,xd=40,us=1,ds=4,On=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],dd=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],k=S({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:Ph},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:yd,max:vd,default:xd},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function yi(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function gh(){return String(k.store.displayName??"").trim()}function vi(t,e,n,r,o){let i=G(n,us,ds),a=Math.min(t,e)/i,s=G(r,a/2,Math.max(a/2,t-a/2)),l=G(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}async function wd(t){try{return await createImageBitmap(t)}catch{return null}}async function ms(t){try{let e=await fetch(t,t.startsWith("data:")?void 0:{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?wd(await e.blob()):null}catch{return null}}function bh(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function fs(t){let e=Math.min(1,ph/Math.max(t.width,t.height));return bh(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function hh(t,e,n,r){let{side:o,x:i,y:a}=vi(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=bi,s.height=bi;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,bi,bi);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function yh(t){let e=await wd(t);if(!e)return null;let n=fs(e);return e.close(),n}async function Ed(t,e,n,r){let o=await ms(t);if(!o)return null;let i=hh(o,e,n,r);return o.close(),i}function ys(){k.store.cropX=.5,k.store.cropY=.5,k.store.cropZoom=1}function md(){k.store.avatarUrl="",k.store.avatarSource="",ys()}var fd=0;async function ps(t){let e=++fd;ys(),k.store.avatarSource=t;let n=await Ed(t,.5,.5,1);return e!==fd?!1:(n&&(k.store.avatarUrl=n),!!n)}function zr(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function cs(t){let e=zr(t);if(!e)return!1;let n=await yh(e);return n?ps(n):!1}var Bn=new Set,Vt=!1,jr=!1,Dn=0,xi=0,Si=0,hi=null,Wt=new Map,$n=null,Kt=null,wi=null;function Sd(){let t=String(k.store.avatarUrl??"").trim();if(!t)return null;if(t.startsWith("data:image/"))return t;try{let{protocol:e}=new URL(t);if(e==="https:"||e==="http:")return t}catch{return null}return null}function gs(t){return!!t?.closest(fh)}function qe(t,e){return t.map(n=>`${n} ${e}`)}function Td(t){return`url(${JSON.stringify(t)})`}function vh(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function pd(t,e){return`${t}{width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;border-radius:999px!important;object-fit:cover!important;flex-shrink:0!important}`}function gd(t,e,n){let r=Td(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0 0 0 ${n}px!important;background-image:${r}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:padding-box!important;background-clip:padding-box!important;border-radius:999px!important;object-fit:none!important;overflow:hidden!important;flex-shrink:0!important}`}function xh(t){let e=Td(t);return`[${Pt}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important}[${Pt}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${e}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important}`}function wh(t,e){let n=t.join(","),r=vh(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function Ld(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||gs(n)||n.closest(".min-w-0")||e.push(n);return e}function vs(t){let e=Ld(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function Eh(t){if(vs(t))return null;for(let e of t.querySelectorAll('[class*="rounded-full"]')){if(gs(e)||e.tagName==="IMG"||e.querySelector(".min-w-0, .truncate"))continue;let n=e.getBoundingClientRect();if(n.width>=16&&n.width<=80&&n.height>=16&&n.height<=80)return e}for(let e of t.querySelectorAll(".relative")){if(gs(e)||e.tagName==="IMG"||e.querySelector(".min-w-0, .truncate"))continue;let n=e.getBoundingClientRect();if(n.width>=16&&n.width<=80&&Math.abs(n.width-n.height)<12)return e}return null}function bs(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&Bn.add(n),Ur(e),Ti()}function Ur(t){t.removeEventListener("error",bs);let e=t.getAttribute(Ei);t.removeAttribute(Gr),t.removeAttribute(Ei),e&&t.getAttribute("src")!==e&&(t.src=e)}function Sh(t,e){if(!e||Bn.has(e)){Ur(t);return}let n=t.getAttribute("src")??"";if(t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.getAttribute(Gr)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(Ei)&&t.setAttribute(Ei,n);t.setAttribute(Gr,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",bs),t.addEventListener("error",bs),n!==e&&(t.src=e)}function kd(){let t=[],e=ge();e&&t.push(e);let n=We();if(n&&!t.some(r=>n.contains(r)||r.contains(n))){let r=n.querySelector(On.join(","))??n.querySelector("button, a, [role='button']")??n;r&&!t.includes(r)&&t.push(r)}return t}function Cd(t,e){let n=vs(t);if(n)Sh(n,e);else for(let i of Ld(t))Ur(i);let o=!n&&!!e?Eh(t):null;for(let i of t.querySelectorAll(`[${Pt}]`))i!==o&&i.removeAttribute(Pt);o&&o.setAttribute(Pt,"")}function Th(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function Lh(t,e){let n=Th(t);n&&Cd(n,e)}function kh(){for(let t of document.querySelectorAll(`img[${Gr}]`))Ur(t);for(let t of document.querySelectorAll(`[${Pt}]`))t.removeAttribute(Pt)}function Ch(){let t=G(Math.round(yi(k.store.avatarSize,xd)),yd,vd),e=Sd(),n=gh(),r=k.store.applyToMenu!==!1,o=[],i=[...qe(On,"img"),"#stage-sidebar-tiny-bar img"];r&&i.push(...qe(dd,"> :first-child img"));let a=[...qe(On,".min-w-0 > .truncate"),...qe(On,".min-w-0.flex-1 .truncate")];r&&a.push(...qe(dd,"> :first-child .truncate")),o.push(pd([...qe(On,"img"),...qe(On,`[${Pt}]`)].join(","),t)),o.push(pd(`#stage-sidebar-tiny-bar img,#stage-sidebar-tiny-bar [${Pt}]`,32)),e&&(o.push(gd(i.join(","),e,t)),o.push(gd("#stage-sidebar-tiny-bar img",e,32)),o.push(xh(e))),n&&o.push(wh(a,n)),w(hd,o.join(""))}function Mh(){let t=Sd(),e=kd(),n=!0;for(let r of e){if(Cd(r,t),!t||Bn.has(t))continue;let o=vs(r);o&&o.getAttribute("src")!==t&&!r.querySelector(`[${Pt}]`)&&(n=!1)}if(k.store.applyToMenu!==!1){let r=Ye();r&&Lh(r,t)}for(let r of document.querySelectorAll(`img[${Gr}]`))e.some(o=>o.contains(r))||r.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||Ur(r);Ah(n||!e.length)}function Ah(t){if(t){xi=0,Si=0;return}xi+=1,Si=Date.now()+Math.min(8e3,250*2**Math.min(xi,5))}function hs(){if(!Vt||jr)return;jr=!0;let t=[...Wt.keys()];for(let e of Wt.values())e.disconnect();Kt?.disconnect();try{Ch(),Date.now()>=Si&&Mh()}finally{jr=!1;for(let e of t)e.isConnected&&Md(e);$n?.isConnected&&Ad($n)}}function Ti(){!Vt||Dn||(Dn=requestAnimationFrame(()=>{Dn=0,hs()}))}function Hh(){jr||!Vt||Ti()}function Md(t){if(Wt.has(t))return;let e=new MutationObserver(Hh);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset"]}),Wt.set(t,e)}function Nh(t){Wt.get(t)?.disconnect(),Wt.delete(t)}function bd(){let t=new Set;for(let n of kd())t.add(n),n.parentElement&&t.add(n.parentElement);let e=We();e&&t.add(e);for(let n of[...Wt.keys()])(!t.has(n)||!n.isConnected)&&Nh(n);for(let n of t)n.isConnected&&Md(n)}function Ad(t){$n===t&&Kt||(Kt?.disconnect(),$n=t,Kt=new MutationObserver(()=>{if(!t.isConnected){Kt?.disconnect(),Kt=null,$n=null;return}jr||!Vt||Ti()}),Kt.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset"]}))}function Hd(t){if(!Vt||k.store.applyToMenu===!1)return;let e=Ye();if(e){Ad(e),Ti();return}t<=0||requestAnimationFrame(()=>Hd(t-1))}function Rh(t){Vt&&k.store.applyToMenu!==!1&&(!co(t)&&!Ye()||Hd(10))}function Ph(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let d=document.createElement("p");d.className="bloom-csi-hint";let f=document.createElement("div");f.className="bloom-csi-crop";let b=document.createElement("div");b.className="bloom-csi-stage";let g=document.createElement("img");g.className="bloom-csi-stage-img",g.alt="",g.draggable=!1,b.appendChild(g);let h=document.createElement("div");h.className="bloom-csi-zoom-row";let m=document.createElement("input");m.type="range",m.className="bloom-csi-zoom",m.min=String(us),m.max=String(ds),m.step="0.05",m.setAttribute("aria-label","Zoom");let L=document.createElement("span");L.className="bloom-csi-zoom-val";let A=document.createElement("button");A.type="button",A.className="bloom-csi-btn",A.textContent="Reset",h.append(m,L,A);let B=document.createElement("p");B.className="bloom-csi-hint",B.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",f.append(b,h,B),t.append(u,d,f);function It(){let p=String(k.store.avatarSource??""),C=String(k.store.avatarUrl??"");return p.startsWith("data:image/")?p:C.startsWith("data:image/")?C:""}function xt(p,C,M){if(!a)return i.x=p,i.y=C,i.zoom=G(M,us,ds),i;let V=vi(a.w,a.h,M,p*a.w,C*a.h);return i.x=V.x/a.w,i.y=V.y/a.h,i.zoom=V.z,i}function Y(){m.value=String(i.zoom),L.textContent=`${Math.round(i.zoom*100)}%`;let p=a?vi(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;p&&a&&(g.style.width=`${a.w/p.side*100}%`,g.style.height=`${a.h/p.side*100}%`,g.style.left=`${(.5-p.x/p.side)*100}%`,g.style.top=`${(.5-p.y/p.side)*100}%`)}function H(p=!1){let C=It(),M=String(k.store.avatarUrl??"").trim(),V=!!C;s.hidden=!M&&!C,(C||M)&&(s.src=C||M),document.activeElement!==l&&(l.value=V?"":M),l.placeholder=V?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",f.hidden=!C,d.hidden=!(e&&/^https?:\/\//.test(M)&&!C),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",C&&(p&&(i.x=yi(k.store.cropX,.5),i.y=yi(k.store.cropY,.5),i.zoom=yi(k.store.cropZoom,1)),g.getAttribute("src")!==C&&(a=null,g.onload=()=>{a={w:g.naturalWidth,h:g.naturalHeight},xt(i.x,i.y,i.zoom),Y()},g.src=C),Y())}function J(p,C,M,V=!1){xt(p,C,M),Y();let Ls=It(),ks=()=>{k.store.cropX=i.x,k.store.cropY=i.y,k.store.cropZoom=i.zoom,Ls&&Ed(Ls,i.x,i.y,i.zoom).then(Cs=>{Cs&&(k.store.avatarUrl=Cs)})};r&&clearTimeout(r),V?ks():r=setTimeout(ks,80)}function Ot(p){k.store.avatarUrl=p;let C=p.trim();if(n&&clearTimeout(n),!C){k.store.avatarSource="",ys(),e=!1,H(!0);return}if(C.startsWith("data:image/")){e=!1,n=setTimeout(()=>{ms(C).then(M=>{if(!M)return;let V=fs(M);M.close(),V&&ps(V).then(()=>H(!0))})},80);return}if(/^https?:\/\//.test(C)){e=!1,k.store.avatarSource="",n=setTimeout(()=>{ms(C).then(M=>{if(!M){e=!0,H(!0);return}let V=fs(M);M.close(),V?(e=!1,ps(V).then(()=>H(!0))):(e=!0,H(!0))})},400);return}e=!1,k.store.avatarSource="",H(!0)}u.addEventListener("paste",p=>{zr(p.clipboardData)&&(p.preventDefault(),e=!1,cs(p.clipboardData).then(()=>H(!0)))}),u.addEventListener("dragover",p=>{zr(p.dataTransfer)&&p.preventDefault()}),u.addEventListener("drop",p=>{zr(p.dataTransfer)&&(p.preventDefault(),e=!1,cs(p.dataTransfer).then(()=>H(!0)))}),l.addEventListener("change",()=>Ot(l.value)),l.addEventListener("paste",p=>{zr(p.clipboardData)&&(p.preventDefault(),e=!1,cs(p.clipboardData).then(()=>H(!0)))}),l.addEventListener("keydown",p=>{It()&&!l.value&&(p.key==="Backspace"||p.key==="Delete")&&(md(),e=!1,H(!0))}),c.addEventListener("click",()=>{md(),e=!1,H(!0)}),b.addEventListener("pointerdown",p=>{p.button===0&&(b.setPointerCapture(p.pointerId),o.on=!0,o.px=p.clientX,o.py=p.clientY,o.x=i.x,o.y=i.y)}),b.addEventListener("pointermove",p=>{if(!o.on||!a)return;let C=b.clientWidth;if(!C)return;let{side:M}=vi(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);xt(o.x-(p.clientX-o.px)*(M/C)/a.w,o.y-(p.clientY-o.py)*(M/C)/a.h,i.zoom),Y()}),b.addEventListener("pointerup",()=>{o.on&&(o.on=!1,J(i.x,i.y,i.zoom,!0))}),b.addEventListener("pointercancel",()=>{o.on=!1}),b.addEventListener("wheel",p=>{p.preventDefault(),J(i.x,i.y,i.zoom*(p.deltaY<0?1.08:1/1.08))},{passive:!1}),m.addEventListener("input",()=>J(i.x,i.y,Number(m.value))),m.addEventListener("change",()=>J(i.x,i.y,Number(m.value),!0)),A.addEventListener("click",()=>J(.5,.5,1,!0));let Ts=()=>H(!1);return wi=Ts,H(!0),()=>{wi===Ts&&(wi=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var Nd=y({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:ud,cleanupSelectors:[`.${dh}`,`.${mh}`],settings:k,start(){Vt=!0,Bn.clear(),xi=0,Si=0,w(ud,ld),hi=new AbortController,document.addEventListener("click",Rh,{signal:hi.signal}),bd(),hs(),cd.debug("started")},onSettingsChange(){Bn.clear(),wi?.(),Vt&&(bd(),hs())},stop(){Vt=!1,hi?.abort(),hi=null,Dn&&cancelAnimationFrame(Dn),Dn=0;for(let t of Wt.values())t.disconnect();Wt.clear(),Kt?.disconnect(),Kt=null,$n=null,kh(),x(hd),Bn.clear(),cd.debug("stopped")}});var _n=new E("Bloom"),Rd=!1,Ih=Date.now(),Oh=[kl,xc,Ac,Rc,Dc,zc,eu,ru,au,bu,Su,Hu,Ru,_u,Zu,Qu,sd,Nd];function Li(t){return new Promise(e=>setTimeout(e,t))}function Bh(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function Dh(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var Id=8e3,Pd=300,$h=250;async function _h(){if(pe())return await Li(Pd),!0;for(;Date.now()-Ih<Id;)if(await Li($h),pe())return await Li(Pd),!0;return pe()||Ri()}function xs(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function Fh(){if(xs())return!0;let t=Date.now()+Id;for(;Date.now()<t;)if(await Li(100),xs())return!0;return xs()}function qh(){try{GM_registerMenuCommand?.("Bloom++ settings",Ll)}catch{}}function zh(){no(()=>{qn("HostShell"),_n.info("host shell",Q)}),ro(()=>{_n.info("idle ready",Q)}),oo(()=>{Ci(),qn("HostReady"),_n.info("chrome ready",Q)})}async function ws(){await Ds()}async function Es(){if(Rd)return;Rd=!0;for(let n of Oh)try{Ks(n)}catch(r){_n.error("register failed",n.name,r)}Ys(),qn("Init"),qh(),zh();let t=()=>qn("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await Bh(),Ci(),_n.info("styles ready",Q),await Dh(),Fh().then(n=>{n&&io()}),!await _h()){_n.warn("late islands not detected; starting default plugins",Q),Ue(),ao();return}await el()}var Od=typeof unsafeWindow<"u"?unsafeWindow:window,jh=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||jh){let t=Od.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",Q);try{Object.defineProperty(Od,"Bloom",{value:Ss,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}ws().then(()=>Es()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
