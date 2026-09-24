// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260924] v1.4.83
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
// @downloadURL  https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/userscript/Bloom.update.user.js
// @updateURL    https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/userscript/Bloom.update.user.js
// ==/UserScript==

/* Bloom++ [20260924] v1.4.83. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Ym=Object.defineProperty;var Xm=(t,e)=>{for(var n in e)Ym(t,n,{get:e[n],enumerable:!0})};var Al={};Xm(Al,{REPO_URL:()=>lc,Settings:()=>k,VERSION:()=>st,contextKeyFromUrl:()=>Jt,conversationTitle:()=>Sn,conversationToken:()=>xt,currentConversationId:()=>M,hasDraftText:()=>Ht,hasErrorToast:()=>Pt,hasLateIslands:()=>Ie,init:()=>Ml,initSettings:()=>Cl,isDocumentInteractive:()=>uc,isStreaming:()=>Q,isUserDraftEmpty:()=>fe,messageCreateTime:()=>ri,plugins:()=>Yt,requestChromeReady:()=>Ho,requestIdleReady:()=>pn,requestShellReady:()=>Ao,setEditorText:()=>Zt,subscribeHarvest:()=>lt,watchStreamingEdge:()=>tt,whenChromeReady:()=>Mo,whenIdleReady:()=>Co,whenShellReady:()=>ko});var se=new Map,ho=!1;function Zm(){return document.getElementById("bloom-root")?.shadowRoot??null}function Pl(){return document.head??null}function un(){let t=Zm();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=Jm()}function wa(t,e){if(!ho)return;let n=Pl();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),un();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,un();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,un()}function w(t,e){let n=se.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},se.set(t,n)),ho&&wa(t,n)}function Sa(){if(!Pl())return!1;ho=!0;for(let[e,n]of se)wa(e,n);return un(),!0}function Ol(t){let e=se.get(t);e&&(e.disabled=!1,ho&&wa(t,e))}function Bl(t){let e=se.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),un())}function E(t){let e=se.get(t);e&&(e.el?.remove(),se.delete(t),un())}function Jm(){return Array.from(se.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var S=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function y(t){return t}var La=new Map;function dn(t,e){let n=La.get(t);return n||(n=new Set,La.set(t,n)),n.add(e),()=>n.delete(e)}function He(t,e){let n=La.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var Qm="bloompp";function Dl(){return new Promise((t,e)=>{let n=indexedDB.open(Qm,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function $l(t){try{let e=await Dl();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function _l(t,e){try{let n=await Dl();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function mn(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function V(t,e,n){return Math.min(n,Math.max(e,t))}function ql(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function Fl(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function zl(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var yo=new S("SettingsStore"),le="BloomSettings",tf=100;function vo(t){return t!=null&&typeof t.then=="function"}function ef(t){if(t==null||vo(t))return null;if(mn(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(mn(e)&&!vo(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return mn(n)&&!vo(n)?n:null}return null}catch{return null}}function Eo(t){let e=ef(t);if(!e)return null;let n=e.plugins;return!mn(n)||vo(n)||Object.keys(n).length===0?null:e}var xo=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let d=l.slice(c.length+1);if(d&&!d.includes(".")){let f=u(d);f!==void 0&&(i[a]=f,s=f);break}}}return mn(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){yo.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},tf))}save(){try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(le,this.plain)}catch{try{GM_setValue(le,e)}catch(n){yo.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(le,e)}catch{}_l(le,e).catch(n=>yo.warn("Failed to save settings to IndexedDB:",n))}catch(e){yo.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){ql(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var nf=new S("Settings"),rf={plugins:{}},k=new xo(structuredClone(rf)),of=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function af(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function L(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?(k.store.plugins[n]||(k.store.plugins[n]={}),k.store.plugins[n]):{}},get plain(){let n=e.pluginName;return n?k.plain.plugins[n]??{}:{}}};return e}async function sf(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function jl(){let t=Eo(await sf(le));if(t||(t=Eo(await $l(le))),!t)try{t=Eo(localStorage.getItem(le))}catch{t=null}if(!t)return;let e=t.plugins;e&&(k.plain.plugins=e,nf.debug("Loaded settings"))}function Gl(t,e){e&&(e.pluginName=t,k.plain.plugins[t]||(k.plain.plugins[t]={}),k.setDefaultGetter(of(t),n=>{if(n!=="enabled")return af(e.def,n)}))}function Ul(){return k.plain.plugins.Settings||(k.store.plugins.Settings={}),k.store.plugins.Settings}function wo(){return Ul().pinnedPlugins??[]}function Kl(t){return wo().includes(t)}function Wl(t){let e=wo(),n=e.includes(t);return k.store.plugins.Settings={...k.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function So(){return Ul().starredPlugins??[]}function Vl(t){return So().includes(t)}function Yl(t){let e=So(),n=e.includes(t);return k.store.plugins.Settings={...k.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var Lo=new S("PluginManager"),Yt={},sr=new Set;function Jl(t){if(Yt[t.name]){Lo.warn("Duplicate plugin",t.name);return}Yt[t.name]=t,Gl(t.name,t.settings)}function fn(t){let e=Yt[t];if(!e)return!1;if(e.required)return!0;let n=k.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function Ql(t){let e=Yt[t];if(!e||e.required)return;let n=!fn(t);k.plain.plugins[t]||(k.store.plugins[t]={}),k.store.plugins[t].enabled=n,n?tc(e):lf(e),He("pluginToggle",{name:t,enabled:n})}function tc(t,e=!1){if(!sr.has(t.name)&&fn(t.name))try{t.managedStyle&&Ol(t.managedStyle),t.start?.(),sr.add(t.name),t.settings&&k.addPrefixChangeListener(`plugins.${t.name}.`,()=>{sr.has(t.name)&&t.onSettingsChange?.()}),e||Lo.debug("Started",t.name)}catch(n){Lo.error("Failed to start",t.name,n)}}function lf(t){if(sr.has(t.name)){try{t.stop?.()}catch(e){Lo.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(Bl(t.managedStyle),E(t.managedStyle)),sr.delete(t.name)}}function lr(t){for(let e of Object.values(Yt))(e.startAt??"DOMContentLoaded")===t&&tc(e)}var Xl=2,Zl="defaultsRev";function ec(){let t=k.plain.plugins.Settings;if(!(!t||t[Zl]===Xl)){for(let e of["NoShareLink","NoDictation"]){let n=k.plain.plugins[e];!n||typeof n.enabled=="boolean"||(n.enabled=!1)}t[Zl]=Xl}}var cr=!1,To=!1,Ta=!1,rc=[],oc=[],ic=[];function ka(t){let e=t.splice(0);for(let n of e)n()}function ur(){cr||(cr=!0,ka(rc))}function Ca(){To||(To=!0,cr||ur(),ka(oc))}function ac(){Ta||(Ta=!0,cr||ur(),To||Ca(),ka(ic))}function ko(t){cr?t():rc.push(t)}function Co(t){To?t():oc.push(t)}function Mo(t){Ta?t():ic.push(t)}function Ao(){ur()}function pn(){ur(),Ca()}function Ho(){ac()}function nc(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function sc(){await nc(4e3),ur(),await nc(4e3),Ca(),ac()}var v={p:"0-V-linuxdo"},st="[20260924] v1.4.83",lc="https://github.com/0-V-linuxdo/Bloom";var cf={BetterNavigator:1790238717e3,ChatListStatus:1790233382e3,ChatStateFavicons:1790233382e3,Cleaner:1789910872e3,ComposerOpacity:1789910872e3,CustomSidebarIdentity:1789970413e3,GreetingCustomizer:1789861316e3,InputHistory:1789858186e3,MessageTimestamps:1790230458e3,NoDictation:1789910872e3,NoShareLink:1789910872e3,NoSidebarIdentity:1789910872e3,PromptQueue:1790239403e3,RecentTopics:1790181019e3,ResponseNotification:1790233382e3,Settings:1789973738e3,StreamerMode:1789924346e3,WiderChat:1789910872e3};function cc(t){let e=cf[t.name];typeof e=="number"&&e>0&&(t.updatedAt=e)}function uf(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function df(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function Ma(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function Ie(){return Ma()?uf()||df():!1}function uc(){return Ie()}var mf=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),dc=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),ff=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),pf="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function bn(t){return t.id==="bloom-root"||!!t.closest(pf)}function mc(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function Io(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function Aa(t){if(!(t instanceof HTMLElement)||!t.isConnected||bn(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&Io(e)?!1:t.getClientRects().length>0}function gn(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function gf(){let t=[];for(let e of document.querySelectorAll(mf))!(e instanceof HTMLElement)||!e.isConnected||bn(e)||t.push(e);return t}function No(t){if(!t.isConnected||bn(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function Ne(){return gf().filter(No)[0]??null}function hn(){let t=document.getElementById("stage-sidebar-tiny-bar");if(!(t instanceof HTMLElement)||!t.isConnected||bn(t))return null;let e=t.getBoundingClientRect();return e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3?null:t}function Ha(t){let e=t,n=t.parentElement;n&&n.children.length===1&&!bn(n)&&!gn(n)&&n.parentElement&&!gn(n.parentElement)&&(e=n);let r=e.parentElement;if(r&&!gn(r)&&!bn(r)&&r.children.length>1){let o=r.getAttribute("class")||"";if(/\bflex\b/.test(o)&&!/flex-col/.test(o)&&r.parentElement&&!gn(r.parentElement))return r}return e}function yn(){let t=document.querySelectorAll(dc);for(let n of t)if(Aa(n)&&!Io(n)&&mc(n))return n;let e=document.querySelectorAll(ff);for(let n of e){if(!Aa(n)||!mc(n)||Io(n))continue;let r=n.querySelector(dc);return Aa(r)&&!Io(r)?r:n}return null}function Ro(){let t=Ne();if(t){let e=Ha(t),n=e.parentElement;if(n&&!gn(n))return n;if(!gn(e))return e}return hn()}function Po(t){let e=Ne();return e?t.composedPath().includes(e):!1}var Na=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],bf={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function hf(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function yf(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function Ia(t){let e=hf(t);return e?yf(e)>.55?"light":"dark":null}function vf(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=Ia(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=Ia(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Ia(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Oo(t){return t==="auto"?vf():t}function xf(t){try{let e=getComputedStyle(document.documentElement);for(let n of Na){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function Bo(t,e,n){let r=bf[e];if(n){xf(t);for(let o of Na)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of Na)t.style.setProperty(o,r[o])}function fc(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var Ra=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
  align-items: center;
  text-align: left;
  margin: 0;
  padding-right: 2.5rem;
}

.bloom-settings-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
  flex: 1;
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

.bloom-settings-title-row {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  min-width: 0;
}

.bloom-settings-head h2 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  color: var(--text-primary, inherit);
}

.bloom-info-hint {
  position: relative;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--text-secondary, #5d5d5d);
  cursor: default;
}

.bloom-info-hint svg {
  width: 1rem;
  height: 1rem;
  pointer-events: none;
}

.bloom-info-hint:hover,
.bloom-info-hint:focus-visible {
  color: var(--text-primary, inherit);
}

.bloom-info-hint-tip {
  display: none;
  position: absolute;
  left: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  width: max-content;
  max-width: 16rem;
  padding: 0.375rem 0.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-light, rgba(0, 0, 0, 0.1));
  background: var(--bg-primary, #fff);
  color: var(--text-primary, inherit);
  font: inherit;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1rem;
  text-align: left;
  white-space: normal;
  pointer-events: none;
  box-shadow: var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.12));
}

.bloom-info-hint:hover .bloom-info-hint-tip,
.bloom-info-hint:focus-visible .bloom-info-hint-tip {
  display: block;
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

.bloom-settings-close {
  position: absolute;
  right: 1rem;
  top: 1rem;
  z-index: 10;
}

.bloom-plugin-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.125rem;
  margin: 0;
  border-bottom: 1px solid var(--border-light, rgba(0, 0, 0, 0.1));
}

.bloom-plugin-tab {
  position: relative;
  margin: 0;
  padding: 0.375rem 0.75rem;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: var(--text-secondary, #5d5d5d);
  font: inherit;
  font-size: 0.8125rem;
  cursor: pointer;
}

.bloom-plugin-tab:hover {
  color: var(--text-primary, inherit);
  background: transparent;
}

.bloom-plugin-tab-active {
  color: var(--text-primary, inherit);
  background: transparent;
}

.bloom-plugin-tab-active::after {
  content: "";
  position: absolute;
  inset-inline: 0.5rem;
  bottom: -1px;
  height: 2px;
  border-radius: 1px;
  background: var(--text-primary, currentColor);
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
`;var wf="bloom-root",Mt="bloom-rail-item",Fo="bloom-account-item",Pe="bloom-sidebar-panel",vr="bloom-plugin-dialog",Vo="bloom-plugin-layer",zo="bloom-settings-css",Sf=2e3,bc=null,Lf=null,me=!1,Da=[],Do=null,jo=null,ue=null,_o=null,Xt=null,br=null,dr,vn=0,hr=0,mr=0,fr=null,pr=null,Go=null,hc=null,gr=null,Pa=[],Uo=!1,Tf=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],kf=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Cf=new Set(["chat","ui","privacy"]),Mf=10080*60*1e3,Yo="",yr="all",Ct="all";function Xo(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function yc(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Af(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'}function Hf(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function If(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function Nf(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var Rf={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function Pf(t){return t.icon||Rf[t.name]||Xo()}function Oa(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),Bo(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function vc(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function Ko(){let t="auto",e=Oo(t);Oa(bc,e,!0);let n=document.getElementById(Pe);n instanceof HTMLElement&&Oa(n,e,!0);let r=document.getElementById(vr);r instanceof HTMLElement&&Oa(r,e,!0);let o=document.getElementById(Mt);o instanceof HTMLElement&&vc(o),He("schemeChange",{scheme:e,pref:t})}function xc(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function Ec(){if(w("settings",Ra),document.getElementById(zo)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=zo,t.textContent=Ra,document.head.appendChild(t)}function Of(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Bf(){for(let t of Da)t();Da=[]}function wc(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function Df(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function qa(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function $f(t){return qa(t).length>0}function qo(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function _f(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=Df(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function qf(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(_f(e,n));let i=k.store.plugins[t]??(k.store.plugins[t]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",Da.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??qo(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??qo(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=wc(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??qo(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function pc(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function Ff(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=k.store.plugins[t.name]??(k.store.plugins[t.name]={});for(let[n,r]of qa(t)){if(n==="enabled"||r.type===5)continue;let o=qo(r);o!==void 0&&(e[n]=o)}Lc(t)}function Sc(t){t.key==="Escape"&&(!document.getElementById(Vo)&&!document.getElementById(vr)||(t.stopPropagation(),xn()))}function zf(){Uo||(document.addEventListener("keydown",Sc),Uo=!0)}function jf(){Uo&&(document.removeEventListener("keydown",Sc),Uo=!1)}function xn(){Bf(),jf(),document.getElementById(Vo)?.remove(),document.getElementById(vr)?.remove()}function Lc(t){if(xn(),!document.body)return;let e=document.createElement("div");e.id=Vo,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",de),e.addEventListener("pointerup",de),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&xn()});let n=document.createElement("div");n.id=vr,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",de),n.addEventListener("pointerup",de),n.addEventListener("click",de);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=yc(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),xn()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=pc("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=pc("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=qa(t);if(c.length)for(let[u,d]of c){let f=qf(t.name,u,d);f&&l.appendChild(f)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>Ff(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),zf(),Ko()}function Gf(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Pf(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=Vl(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=If(l),c.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation();let m=Yl(t.name);He("pluginStar",{name:t.name,starred:m})}),s.appendChild(c),!t.required){let g=Kl(t.name),m=document.createElement("button");m.type="button",m.className=`bloom-icon-btn bloom-card-pin${g?" bloom-card-pin-active":""}`,m.setAttribute("aria-label",g?"Unpin from top":"Pin to top"),m.innerHTML=Nf(g),m.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();let A=Wl(t.name);He("pluginPin",{name:t.name,pinned:A})}),s.appendChild(m)}if($f(t)){let g=document.createElement("button");g.type="button",g.className="bloom-icon-btn bloom-card-settings",g.setAttribute("aria-label",`${t.name} settings`),g.innerHTML=Hf(),g.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation(),Lc(t)}),s.appendChild(g)}let u=wc(t.name,fn(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",g=>g.stopPropagation()),d?.addEventListener("change",()=>{Ql(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let g=document.createElement("div");g.className="bloom-card-desc",g.textContent=t.description,n.appendChild(g)}let f=document.createElement("div");f.className="bloom-card-separator";let h=document.createElement("div");h.className="bloom-card-footer";let p=document.createElement("div");return p.className="bloom-card-author",p.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",h.appendChild(p),e.append(n,f,h),e}function Tc(){return Object.values(Yt).filter(t=>!t.hidden&&t.name!=="Settings")}function Uf(t){return t.updatedAt!=null&&Date.now()-t.updatedAt<Mf}function kc(t,e){if(e==="all"||e==="favorites")return!0;if(e==="recent")return Uf(t);let n=(t.tags??[]).map(r=>r==="sidebar"?"ui":r);return e==="other"?!t.required&&!n.some(r=>Cf.has(r)):n.includes(e)}function Kf(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function Wf(){return Yo.trim()?"No plugins match your search.":Ct==="favorites"?"No favorites yet. Star a plugin to see it here.":Ct==="recent"?"No plugins updated in the last 7 days.":"No plugins available."}function Vf(){let t=Tc();return kf.filter(e=>e.id==="favorites"||e.id==="all"||e.id==="recent"?!0:t.some(n=>kc(n,e.id)))}function Yf(){if(gr){gr.replaceChildren();for(let t of Vf()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${Ct===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{Ct=t.id,Re()}),gr.appendChild(e)}}}function Xf(){let t=Tc();if(Ct==="favorites"){let e=new Set(So());t=t.filter(n=>e.has(n.name))}else Ct!=="all"&&(t=t.filter(e=>kc(e,Ct)));return yr==="enabled"&&(t=t.filter(e=>fn(e.name))),yr==="disabled"&&(t=t.filter(e=>!fn(e.name))),t}function Re(){if(!fr)return;Yf();let t=Xf();Go&&(Go.placeholder=`Search ${t.length} plugins...`);let e=t,n=Yo.trim().toLowerCase();if(n&&(e=e.filter(r=>Kf(r).includes(n))),Ct==="recent")e=e.slice().sort((r,o)=>(o.updatedAt??0)-(r.updatedAt??0)||r.name.localeCompare(o.name));else if(Ct!=="favorites"){let r=wo();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}fr.replaceChildren();for(let r of e)fr.appendChild(Gf(r));pr&&(pr.hidden=e.length>0,pr.textContent=Wf())}function de(t){t.stopPropagation()}function Ba(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function Fa(){document.getElementById(Mt)?.setAttribute("aria-expanded",me?"true":"false")}function Zf(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function za(){xn(),Yo="",yr="all",Ct="all",document.getElementById(Pe)?.remove(),me=!1,Fa()}function Jf(t){let e=document.createElement("div");e.id=t,e.setAttribute("aria-labelledby","bloom-settings-title"),e.addEventListener("pointerdown",de),e.addEventListener("pointerup",de),e.addEventListener("click",de);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=Xo();let a=document.createElement("span");a.className="bloom-settings-title-row";let s=document.createElement("h2");s.id="bloom-settings-title",s.textContent="Bloom++";let l="Toggle features. Some need a reload. Click the sliders icon to configure.",c=document.createElement("button");c.type="button",c.className="bloom-info-hint",c.setAttribute("aria-label",l),c.innerHTML=Af();let u=document.createElement("span");u.className="bloom-info-hint-tip",u.setAttribute("role","tooltip"),u.textContent=l,c.appendChild(u),a.append(s,c),o.append(i,a);let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn bloom-settings-close",d.setAttribute("aria-label","Close"),d.innerHTML=yc(),d.addEventListener("click",za),r.appendChild(o),n.appendChild(r);let f=document.createElement("div");f.className="bloom-plugin-tabs",n.appendChild(f);let h=document.createElement("div");h.className="bloom-search-bar";let p=document.createElement("input");p.type="search",p.className="bloom-search-input",p.setAttribute("aria-label","Search plugins"),p.placeholder="Search plugins...",p.addEventListener("input",()=>{Yo=p.value,Re()});let g=document.createElement("select");g.className="bloom-search-filter",g.setAttribute("aria-label","Filter plugins");for(let A of Tf){let I=document.createElement("option");I.value=A.value,I.textContent=A.label,g.appendChild(I)}g.value=yr,g.addEventListener("change",()=>{yr=g.value,Re()}),h.append(p,g),n.appendChild(h);let m=document.createElement("div");m.className="bloom-plugin-list",n.appendChild(m);let T=document.createElement("p");return T.className="bloom-tab-empty",T.hidden=!0,n.appendChild(T),e.append(d,n),fr=m,pr=T,Go=p,hc=g,gr=f,Re(),e}function Qf(t){t.classList.add("bloom-rail-dock")}function tp(){let t=document.getElementById(Mt);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&No(t)?t:null}function ep(){if(document.getElementById(Pe)?.remove(),!document.body)return;let t=Jf(Pe);Qf(t),document.body.appendChild(t),me=!0,xn(),Ko(),Fa(),He("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:st,dock:"center",rail:!!tp()})}function ja(){let t=document.getElementById(Pe);if(t instanceof HTMLElement&&t.isConnected&&Zf(t)){za();return}t?.remove(),ep()}function np(){let t=document.createElement("button");return t.type="button",t.id=Mt,t.className="bloom-rail-item",t.setAttribute("aria-controls",Pe),t.setAttribute("aria-expanded",me?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${Xo()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),ja()}),t}function gc(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function rp(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function op(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function ce(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function Cc(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=rp(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&ce(t,"padding-top",Math.round(i)),Number.isFinite(a)&&ce(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));ce(n,"width",l),ce(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&ce(t,"padding-left",u);let d=op(e,r);if(d){let f=d.getBoundingClientRect(),h=n.getBoundingClientRect(),p=Math.round(f.left-h.right);p>=0&&p<=24&&ce(t,"gap",p)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&ce(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&ce(t,"gap",Math.round(l))}vc(t)}function $a(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function ip(){if(br?.isConnected&&Xt){Xt.observe(br,{childList:!0});return}_a()}function ap(t){if($a(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function sp(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){mr=0;return}mr+=1,hr=Date.now()+Math.min(8e3,250*2**Math.min(mr,5))})}function lp(){vn||Date.now()<hr||(vn=requestAnimationFrame(()=>{vn=0,!(Date.now()<hr)&&(document.getElementById(Mt)?.isConnected||Wo())}))}function Wo(){if(!document.body)return;Xt?.disconnect();let t=null,e=!1;try{let n=document.getElementById(Mt);t=n instanceof HTMLButtonElement?n:np();let r=Ne(),o=hn();if(r){let i=Ha(r),a=i.parentElement;if($a(i)||a&&$a(a))return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),gc(t),Cc(t,r)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),gc(t,!0)):t.isConnected&&!No(t)&&(t.remove(),t=null)}finally{sp(t,e),ip(),Fa()}}function _a(){let t=Ro();!t||!ap(t)||br===t&&Xt||(Xt?.disconnect(),br=t,Xt=new MutationObserver(()=>{document.getElementById(Mt)?.isConnected||lp()}),Xt.observe(t,{childList:!0}))}function cp(){Wo(),_a(),dr===void 0&&(dr=window.setInterval(()=>{let t=document.getElementById(Mt);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=hr&&Wo();else{mr=0;let e=Ne();e&&Cc(t,e)}_a()},Sf))}function up(){dr!==void 0&&(clearInterval(dr),dr=void 0),vn&&cancelAnimationFrame(vn),vn=0,hr=0,mr=0,Xt?.disconnect(),Xt=null,br=null}function dp(t){_o===t&&ue||(ue?.disconnect(),_o=t,ue=new MutationObserver(()=>{if(!t.isConnected){ue?.disconnect(),ue=null,_o=null;return}Mc(t)}),ue.observe(t,{childList:!0}))}function Mc(t){if(dp(t),t.querySelector(`#${Fo}`))return;let e=document.createElement("button");e.type="button",e.id=Fo,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${Xo()}<span>Bloom++</span>`,e.addEventListener("pointerdown",Ba),e.addEventListener("pointerup",Ba),e.addEventListener("click",n=>{Ba(n),ja()}),t.insertBefore(e,t.firstChild)}function $o(){let t=yn();return t?(Mc(t),!0):!1}function mp(t){Po(t)&&(queueMicrotask($o),requestAnimationFrame(()=>{$o()}),window.setTimeout($o,60),window.setTimeout($o,180))}function fp(){jo?.abort();let t=new AbortController;jo=t,document.addEventListener("click",mp,{signal:t.signal})}function pp(){jo?.abort(),jo=null,ue?.disconnect(),ue=null,_o=null}function Ac(){pn(),Of(()=>{Ec(),xc(),Wo(),ja()})}var Hc=y({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[v.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${wf}`,`#${Mt}`,`#${Fo}`,`#${Pe}`,`#${Vo}`,`#${vr}`,`#${zo}`,"#bloom-menu-panel"],start(){Ec(),xc(),cp(),fp(),Do?.(),Do=fc(Ko),Ko(),Pa=[dn("pluginToggle",()=>{me&&Re()}),dn("pluginPin",()=>{me&&Re()}),dn("pluginStar",()=>{me&&Re()})]},stop(){up(),pp(),Do?.(),Do=null;for(let t of Pa)t();Pa=[],za(),document.getElementById(Mt)?.remove(),document.getElementById(Fo)?.remove(),document.getElementById(zo)?.remove(),bc=null,Lf=null,fr=null,pr=null,Go=null,hc=null,gr=null,me=!1}});var Zo='form[data-type="unified-composer"], form.w-full[data-type]',At=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),En=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Ic=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Nc=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),gp=/stop streaming|stop generating|停止生成|停止输出|停止响应/,bp='[contenteditable="false"], button, [role="button"]';function yt(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function Oe(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!yt(o)))return o;return null}function Rc(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function B(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=Rc(t);return!!(gp.test(n)||/^stop$/i.test(n))}function vt(){let e=Array.from(document.querySelectorAll(Zo)).find(yt);if(e instanceof HTMLElement)return e;let n=Oe(document,At),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function Y(){let t=Array.from(document.querySelectorAll(At));return t.find(yt)??t[0]??null}function hp(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(bp);return!!n&&n!==e&&e.contains(n)}function Ga(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&hp(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function Ht(t){let e=t??Y();return e?Ga(e,e).replaceAll("\u200B","").trim().length>0:!1}function fe(t){return!Ht(t)}function Jo(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function Pc(t){let e=vt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!yt(n))&&t(n))return n;return null}function pe(){let t=vt(),e=Oe(t,En)??Oe(document,En);return e&&!B(e)?e:Pc(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!B(n);let o=Rc(n);return/^(send|send prompt|发送)$/i.test(o)&&!B(n)})}function Be(){let t=vt(),e=Oe(t,Ic,!0)??Oe(document,Ic,!0);if(e)return e;let n=Oe(t,Nc)??Oe(document,Nc);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&yt(r)&&B(r))return r}return Pc(B)}function It(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>Ga(n,t)).join(`
`):Ga(t,t)}function Ua(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function Zt(t,e,n=!1){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),Ua(t,n)}var Oc=/\/c\/([a-zA-Z0-9_-]{8,})/i;function xt(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function Jt(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function Qt(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(Oc)?.[1]??""}catch{return t.match(Oc)?.[1]??""}}function M(){return Qt(location.pathname)}var _c=new S("Harvest"),yp=1500,vp=200,Qo=new Set,ti=new Map,ei=new Map,wn=null,ni=null,xr=null,Nt=0;function xp(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Ep(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function wp(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}function qc(t){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(t)}var Sp=/"action"\s*:\s*"(next|continue|variant)"/i;function Lp(t,e,n){return!(e!=="POST"||qc(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!Sp.test(n))}function Tp(t,e){return e!=="GET"||qc(t)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(t)}function Bc(t){return t.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function Fc(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function kp(t){return typeof t=="string"?Fc(t):""}function Ka(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return Ka(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function zc(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function Dc(t,e,n){!t||!e||ei.get(t)!==e&&(ei.set(t,e),zc(ei,yp),ge({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function Cp(t,e){let n=e.trim();!t||!n||ti.get(t)!==n&&(ti.set(t,n),zc(ti,vp),ge({type:"conversation-meta",conversationId:t,title:n}))}function Er(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)Er(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&Cp(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=Ka(l.create_time??l.createTime??l.created_at);c&&u&&Dc(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=Ka(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&Dc(a,s,o),r.mapping&&typeof r.mapping=="object")Er(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&Er(l,o,n+1)}function $c(t,e){if(t)try{Er(JSON.parse(t),e)}catch{}}function ge(t){for(let e of Array.from(Qo))try{e(t)}catch{}}async function Mp(t,e,n){if(n===Nt)try{let r=await t.json();if(n!==Nt)return;Er(r,e)}catch{}}async function Ap(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===Nt&&ge({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===Nt;){let{done:u,value:d}=await s.read();if(u)break;if(c+=l.decode(d,{stream:!0}),!o){let h=Fc(c);h&&(o=h,ge({type:"post-start",conversationId:o,url:""}))}let f=c.split(`
`);c=f.pop()??"";for(let h of f){let p=h.replace(/^data:\s*/,"").trim();!p||p==="[DONE]"||$c(p,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===Nt&&$c(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===Nt&&ge({type:"post-end",conversationId:o,error:i})}function Hp(t,e,n){let r=Ep(e),o=wp(e,n),i=Tp(r,o),a=Lp(r,o,n?.body),s=Nt,l="";return a&&(l=kp(n?.body)||Bc(r)||Qt(r)||M(),ge({type:"post-start",conversationId:l,url:r})),t(e,n).then(c=>{if(s!==Nt||!i&&!a)return c;try{let u=c.clone();i?Mp(u,Bc(r)||M(),s):Ap(u,l,!c.ok,s)}catch{a&&ge({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===Nt&&ge({type:"post-end",conversationId:l,error:!0}),c})}function Ip(){if(wn)return;let t=xp();xr=t,wn=t.fetch.bind(t);let e=(n,r)=>Hp(wn,n,r);ni=e,t.fetch=e,_c.debug("conversation fetch harvest hooked")}function Np(){Nt+=1,!(!wn||!xr)&&(ni&&xr.fetch===ni&&(xr.fetch=wn),wn=null,ni=null,xr=null,_c.debug("conversation fetch harvest unhooked"))}function lt(t){return Qo.add(t),Ip(),()=>{Qo.delete(t),Qo.size===0&&Np()}}function Sn(t){return t?ti.get(t)??"":""}function ri(t){return t?ei.get(t)??null:null}var Gc=new S("Streaming");function kr(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!yt(e))&&(B(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function Rp(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&yt(t))}function Pp(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&yt(t))}function Op(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Pt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function Q(){if(Be()||kr()||Op())return!0;let t=pe();return t&&yt(t)&&!B(t)?!1:!!(Rp()||Pp())}var Bp=400,jc=3,qe=new Set,wr,Sr=null,Wa=null,$e=!1,De=0,he="",ye="",ve=!1,Lr=!1,Tr=!1,Rt=!1,F=null,ct="",_e=!1;function X(){return Rt}function ai(){return ve}function Ln(){return ct}function Va(){return M()||ct}function Uc(){return Jt(xt())}function oi(t,e){return{streaming:t,contextKey:e,conversationId:Va()}}function Ya(t){try{let e=t.split("|")[0]||"";return new URL(e).pathname.replace(/\/$/,"")||"/"}catch{return""}}function Dp(t){return!t||t==="/"||t.startsWith("/g/")}function $(t,e){if(!t||t===e)return!1;let n=Qt(Ya(e)||e);return!n||!(t.endsWith("|draft")||Dp(Ya(t)))?!1:ct?n===ct:_e}function ii(){$e=!1,De=0,he="",ve=!1,Lr=!1,Tr=!1,ct="",_e=!1}function $p(t){for(let e of Array.from(qe))try{e.onFall?.(t)}catch{}}function _p(t){for(let e of Array.from(qe))try{e.onRise?.(t)}catch{}}function be(t){for(let e of Array.from(qe))try{e.onTick?.(t)}catch{}}function qp(t,e){for(let n of Array.from(qe))try{n.onContext?.(t,e)}catch{}}function Fp(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&B(n)&&(ve=!0)}function zp(t){if(t.type==="post-start"){let n=M();if(!t.conversationId){n||(_e=!0),(!n||n===ct)&&(Rt=!1,ve=!1);return}if(!(t.conversationId===n||t.conversationId===ct)&&!(!n&&_e))return;ct=t.conversationId,_e=!1,Rt=!1,ve=!1;return}if(t.type!=="post-end"||!$e&&!F)return;let e=M();t.conversationId&&!(e?t.conversationId===e:t.conversationId===ct)||(Tr=!0,t.error&&(Lr=!0,F&&(F.error=!0)))}function jp(){let t=Uc(),e=Q();if(ye&&t&&ye!==t){let o=ye;if(!$(o,t))F=null,ii(),Rt=e;else{let i=Qt(Ya(t));if(i&&!ct&&(ct=i,_e=!1),he===o&&(he=t),F&&F.contextKey===o){F.contextKey=t;let a=Va();a&&(F.conversationId=a)}Rt=!1}if(ye=t,qp(t,o),Rt){be(oi(!1,t));return}}else t&&(ye=t);if(Rt){if(e){be(oi(!1,t));return}Rt=!1}if(F)if(e||F.contextKey!==t)F=null;else{let o=F;F=null,ii(),$p(o),be(oi(!1,t));return}let n=oi(e,t);if(e){let o=!$e;o&&(ve=!1,Lr=!1,Tr=!1),$e=!0,De=0,he=t,o&&_p(n),be(n);return}if(!$e){be(n);return}if(De+=1,Tr&&(De=Math.max(De,jc)),De<jc){be(n);return}if(!(!!he&&he===t)){ii(),be(n);return}F={contextKey:he||t,conversationId:Va(),userStopped:ve,error:Lr||Pt()},be(n)}function Gp(){wr===void 0&&($e=Q(),ye=Uc(),he=$e?ye:"",De=0,ve=!1,Lr=!1,Tr=!1,Rt=!1,F=null,ct="",_e=!1,Sr?.abort(),Sr=new AbortController,document.addEventListener("click",Fp,{capture:!0,signal:Sr.signal}),Wa=lt(zp),wr=setInterval(jp,Bp),Gc.debug("watchStreamingEdge started"))}function Up(){qe.size||(wr!==void 0&&(clearInterval(wr),wr=void 0),Sr?.abort(),Sr=null,Wa?.(),Wa=null,ii(),ye="",Rt=!1,F=null,Gc.debug("watchStreamingEdge stopped"))}function tt(t){let e=typeof t=="function"?{onFall:t}:t;return qe.add(e),Gp(),()=>{qe.delete(e),Up()}}var Kc="bloom-host-icon",Cr="data-bloom-host-rel",Xa="not all",Za=0,Wc=0,Kp=400;function Vc(t){Za+=1;try{t()}finally{Za-=1}}function si(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function xe(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function Yc(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function Wp(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Vp(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-Wc<Kp||(Wc=n,t.appendChild(e))}function Yp(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||si(n)&&(n.getAttribute(Cr)||n.setAttribute(Cr,n.rel),n.media!==Xa&&(n.media=Xa),n.rel!==Kc&&(n.rel=Kc))}function Xp(t){for(let e of t.querySelectorAll(`link[${Cr}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(Cr);n&&(e.rel=n),e.removeAttribute(Cr),e.media===Xa&&e.removeAttribute("media")}}function Xc(t,e){let{head:n}=document;!n||!e||Vc(()=>{Yp(n,t);let r=Yc(t),{type:o,sizes:i}=Wp(e);r?Vp(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function Zc(t,e){let{head:n}=document;n&&Vc(()=>{Yc(t)?.remove(),Xp(n)})}function Jc(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(Za)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:si(c.target)&&(a=!0,xe(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)si(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)si(u)&&u.id!==t&&(a=!0,xe(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var Zp=["original","badge","dot","hole","bg"],eu=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],nu={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},li="#FCFCFC",Jp="#111111",Qc="#111111",Qp="#ffffff",tg="#212121",eg="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",ng={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},ci=32,tu=64;function ru(t){return typeof t=="string"&&Zp.includes(t)}function rg(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function ui(t){let e=document.createElement("canvas");e.width=ci,e.height=ci;let n=e.getContext("2d");return n?(n.scale(ci/tu,ci/tu),t(n),e.toDataURL("image/png")):""}function og(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function di(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(eg);n&&(t.strokeStyle=Jp,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function ig(t,e,n){let r=nu[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=Qc,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=Qc,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=Qp,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function Mr(t,e){if(t==="original")return e==="wait"?ui(r=>di(r,li)):rg(ng[e]);let n=e==="wait"?void 0:nu[e];return ui(t==="hole"?r=>di(r,n??li):t==="bg"?r=>{r.fillStyle=n??tg,og(r,0,0,64,64,14),r.fill(),di(r,li,!1)}:r=>{di(r,li),e!=="wait"&&ig(r,e,t==="dot"?"dot":"badge")})}function ou(t){return{wait:Mr(t,"wait"),rotate:Mr(t,"rotate"),done:Mr(t,"done"),ready:Mr(t,"ready"),error:Mr(t,"error")}}var ag=new S("ChatStateFavicons"),ze="bloom-chat-state-favicon",cu=["input","beforeinput","cut","paste","compositionend"],uu=L({style:{type:3,description:"Favicon overlay",options:eu}}),Ot="",ts={wait:"",rotate:"",done:"",ready:"",error:""},Ar="wait",et=!1,z=!1,N=null,rt="",ut="",Ge=!0,pi=!1,Tn=null,dt=0,mi=null,fi=null,Fe=null,Qa=null,kn=null,Et=!1,iu=new WeakSet;function sg(){let t=uu.store.style;return ru(t)?t:"bg"}function du(){let e=document.querySelector(`link[rel~="icon"]:not(#${ze}), link[data-bloom-host-rel]:not(#${ze})`)?.href;return xe(e)?e:xe(Ot)?Ot:""}function lg(){let t=document.getElementById(ze);return t instanceof HTMLLinkElement?t:null}function cg(){if(!xe(Ot)){let t=du();t&&(Ot=t)}return xe(Ot)?Ot:ts.wait}function mu(t){return t==="wait"?cg():ts[t]}function fu(){Xc(ze,mu(Ar))}function O(t){let e=mu(t);if(Ar===t){let n=lg();if(n&&n.getAttribute("href")===e)return}Ar=t,fu()}function au(){ts=ou(sg()),O(Ar)}function es(){return Jt(xt())}function ns(t,e){!t||!e||t===e||(N===t&&(N=e),rt===t&&(rt=e),ut===t&&(ut=e))}function ug(){let t=es();if(!(Q()||et||z))return rt="",t;if(rt&&t&&rt!==t)if($(rt,t))ns(rt,t),rt=t;else return rt="",t;else!rt&&t&&(rt=t);return rt||t}function su(t){return!N||!t?!1:N===t?!0:$(N,t)}function pu(){et=!1,z=!1,N=null,rt=""}function gu(t){ut=t,pu(),Ge=!1,pi=!0,O("wait")}function Ja(t){return!t&&Ge}function dg(){if(!Et)return;let t=es();if(ut&&t&&ut!==t&&!$(ut,t)){gu(t);return}ut&&t&&$(ut,t)&&ns(ut,t),t&&(ut=t);let e=Q(),n=e&&!X();if(pi){if(X()){O("wait");return}pi=!1}if(X()){O("wait");return}let r=ug(),o=fe();if(ai()&&!e){et=!1,z=!1,N=null,O(o?"wait":Ja(o)?"ready":"wait");return}if(Pt()&&!e&&et){O("error"),et=!1,z=!1,N=null;return}if(n){et||(Ge=!1),et=!0,z=!1,N=r,O("rotate");return}if(et)if(!su(t))et=!1,z=!1,N=null;else if(z){et=!1,z=!0,N=t||r,O("done");return}else{O("rotate");return}if(z)if(N&&t&&!su(t))z=!1,N=null;else if(o){N=r||N,O("done");return}else if(Ja(o)){z=!1,O("ready");return}else{z=!1,O("wait");return}N=null,o?O("wait"):Ja(o)?O("ready"):O("wait")}function je(){Et&&(xu(),hu(),yu(),dg())}function bu(){if(kn){for(let t of cu)kn.removeEventListener(t,vu,!0);kn=null}}function hu(){let t=vt(),e=t&&t!==document.body?t:null;if(!(kn===e&&e?.isConnected)&&(bu(),!!e)){kn=e;for(let n of cu)kn.addEventListener(n,vu,{capture:!0,passive:!0})}}function yu(){let t=vt();if(!(Fe&&Qa===t&&t.isConnected)){if(Fe?.disconnect(),Qa=t,!t||t===document.body){Fe=null;return}Fe=new MutationObserver(()=>gi()),Fe.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function gi(){if(Et){if(document.hidden){dt&&(cancelAnimationFrame(dt),dt=0),je();return}dt||(dt=requestAnimationFrame(()=>{dt=0,Et&&je()}))}}function vu(){Ht()&&(Ge=!0),gi()}function lu(){Ht()&&(Ge=!0),gi()}function mg(){Et&&(dt&&(cancelAnimationFrame(dt),dt=0),je())}function fg(){Et&&(Ge=!1,je())}function pg(t){if(!Et)return;if(t.userStopped){et=!1,z=!1,N=null,O("wait");return}if(t.error){et=!1,z=!1,N=null,O("error");return}let e=es();if(t.contextKey&&e&&t.contextKey!==e&&!$(t.contextKey,e)){et=!1,z=!1,N=null,O("wait");return}et=!1,z=!0,N=e||t.contextKey,O("done")}function gg(){Et&&je()}function bg(t,e){if(Et){if($(e,t)){ns(e,t),ut=t,je();return}gu(t)}}function xu(){let t=Y();!t||iu.has(t)||(iu.add(t),t.addEventListener("input",lu,{capture:!0,passive:!0}),t.addEventListener("compositionend",lu,{capture:!0,passive:!0}))}var Eu=y({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:uu,startAt:"DOMContentLoaded",cleanupSelectors:[`#${ze}`],start(){Et=!0,Ot=du()||Ot,au(),fi?.disconnect(),fi=Jc(ze,t=>{xe(t)&&(Ot=t),fu()}),Tn?.abort(),Tn=new AbortController,window.addEventListener("popstate",gi,{signal:Tn.signal}),document.addEventListener("visibilitychange",mg,{signal:Tn.signal}),xu(),hu(),yu(),mi?.(),mi=tt({onRise:fg,onFall:pg,onTick:gg,onContext:bg}),je(),ag.debug("favicon watch started")},stop(){Et=!1,dt&&cancelAnimationFrame(dt),dt=0,mi?.(),mi=null,Tn?.abort(),Tn=null,bu(),Fe?.disconnect(),Fe=null,Qa=null,fi?.disconnect(),fi=null,pu(),ut="",Ge=!0,pi=!1,Ar="wait",Zc(ze,Ot)},onSettingsChange:au});var wu=`.bloom-ih-hud {
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
`;var Ix=new S("InputHistory"),rs=/\u200B/g,Su=10,Lu=500,Tu=100,yg=8,vg=120,xg=2e3,bi=10,hi=L({maxEntries:{type:4,description:"Max stored prompts",min:Su,max:Lu,default:Tu},history:{type:5,description:"Stored prompts",render:Og},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),os=new Map,j=0,is="",Bt=!1,Ir=!1,ls=0,Hr=null,as,cs=null,ku=!0;function wt(){let t=hi.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Cu(t){let e=V(Number(hi.store.maxEntries??Tu),Su,Lu);return t.length>e?t.slice(t.length-e):t}function yi(t){hi.store.entries=Cu(t)}function Eg(t){return t.replaceAll(rs,"").replace(/\n$/,"").trim()}function ss(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(At);return n instanceof HTMLElement?n:Y()}function wg(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!It(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(rs,"").trim().length===0,last:i.toString().replaceAll(rs,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Mu(t){clearTimeout(as),as=setTimeout(()=>{if(t!==ls)return;Ir=!1;let e=cs;e&&Ua(e,ku)},vg)}function Au(t,e,n){Ir=!0,cs=t,ku=n;let r=++ls;Zt(t,e,n),Mu(r)}function Sg(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function Cn(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Lg(){document.querySelector(".bloom-ih-hud")?.remove()}function Tg(t,e){let n=Sg();n.textContent=t;let r=(e.closest("form")??vt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-yg)}px`,n.classList.add("bloom-ih-hud-on")}function us(t){let e=Eg(t);if(!e)return;let n=Date.now(),r=os.get(e);if(r&&n-r<xg)return;os.set(e,n);let o=wt().filter(i=>i!==e);o.push(e),yi(o),j=wt().length,Bt=!1,Cn()}function kg(t,e){let n=wt();if(!n.length&&t)return;j>=n.length&&(is=It(e),j=n.length);let r=t?j-1:j+1;r<0||r>n.length||(j=r,Bt=!0,Au(e,r===n.length?is:n[r],t),r<n.length?Tg(`${r+1} / ${n.length}`,e):Cn())}function Cg(t){Bt=!1,Cn(),Au(t,is,!1),j=wt().length}function Mg(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=ss(t.target)??ss(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&Bt&&!t.altKey&&!t.shiftKey){Cg(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){us(It(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=wt();if(!r){let i=wg(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||j<=0)||!n&&j>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),kg(n,e))}function Ag(t){if(ss(t.target)){if(Ir){Mu(ls);return}Bt&&(Bt=!1,Cn(),j=wt().length)}}function Hg(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(At);n instanceof HTMLElement&&us(It(n))}function Ig(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(En);if(!n||!(n instanceof HTMLElement)||B(n))return;let r=Y();r&&us(It(r))}function Ng(t){if(!(!Bt||Ir)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}Bt=!1,Cn()}}function Rg(){if(Hr)return;Hr=new AbortController;let{signal:t}=Hr,e={capture:!0,signal:t};window.addEventListener("keydown",Mg,e),window.addEventListener("input",Ag,e),window.addEventListener("submit",Hg,e),window.addEventListener("click",Ig,e),window.addEventListener("pointerdown",Ng,e)}function Pg(t){let e=wt().slice();e.splice(t,1),yi(e),j>e.length&&(j=e.length)}function Og(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=wt().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(m=>m.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/bi));n>=l&&(n=l-1);let c=s.slice(n*bi,n*bi+bi);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let m=document.createElement("div");m.className="bloom-ih-list",c.forEach((T,A)=>{let I=i.indexOf(T),Wt=wt().length-1-I,kt=document.createElement("div");kt.className="bloom-ih-item";let nt=document.createElement("button");nt.type="button",nt.className=`bloom-ih-body${r===A?"":" bloom-ih-clamp"}`,nt.textContent=T,nt.addEventListener("click",()=>{r=r===A?-1:A,o()});let R=document.createElement("div");R.className="bloom-ih-actions";let at=document.createElement("button");at.type="button",at.title="Copy",at.textContent="C",at.addEventListener("click",()=>{Fl(T)});let Vt=document.createElement("button");Vt.type="button",Vt.title="Delete",Vt.textContent="\xD7",Vt.addEventListener("click",()=>{Pg(Wt),o()}),R.append(at,Vt),kt.append(nt,R),m.appendChild(kt)}),t.appendChild(m)}else{let m=document.createElement("p");m.className="bloom-ih-empty",m.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(m)}let d=document.createElement("div");d.className="bloom-ih-pager";let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Prev",f.disabled=n<=0,f.addEventListener("click",()=>{n-=1,o()});let h=document.createElement("span");h.textContent=`${n+1} / ${l}`;let p=document.createElement("button");p.type="button",p.className="bloom-ih-btn",p.textContent="Next",p.disabled=n+1>=l,p.addEventListener("click",()=>{n+=1,o()});let g=document.createElement("button");g.type="button",g.className="bloom-ih-clear",g.textContent="Clear all",g.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(yi([]),j=0,o())}),d.append(f,h,p,g),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var Hu=y({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:hi,startAt:"HostReady",managedStyle:"inputHistory",start(){w("inputHistory",wu),j=wt().length,Bt=!1,Rg()},stop(){Hr?.abort(),Hr=null,Cn(),Lg(),os.clear(),clearTimeout(as),Ir=!1,cs=null,Bt=!1},onSettingsChange(){let t=wt(),e=Cu(t);e.length!==t.length&&yi(e),j>e.length&&(j=e.length)}});var ds="noShareLink",Bg=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],Dg=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],ms=L({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Iu(t){return`${t.join(",")}{display:none!important}`}function Nu(){let t=[];if(ms.store.hideShareChat!==!1&&t.push(Iu(Bg)),ms.store.hideShareProject!==!1&&t.push(Iu(Dg)),!t.length){E(ds);return}w(ds,t.join(`
`))}var Ru=y({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:ms,start:Nu,onSettingsChange:Nu,stop(){E(ds)}});var Bu="noDictation",$g=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],_g=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Du=L({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Pu(t){return`${t.join(",")}{display:none!important}`}function Ou(){let t=[Pu($g)];Du.store.hideDictationSettings!==!1&&t.push(Pu(_g)),w(Bu,t.join(`
`))}var $u=y({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Du,start:Ou,onSettingsChange:Ou,stop(){E(Bu)}});var fs="noSidebarIdentity",Mn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Fu=Mn.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),zu=Mn.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),qg=[...Fu,...zu],Fg=[...Fu,...Mn.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],zg=Mn.map(t=>`${t} a[href^="mailto:"]`),jg=Mn.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),Gg=Mn.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),Nr=L({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function _u(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Ug(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function Kg(){return`${Gg.join(",")}{margin-block:auto!important}`}function Wg(){return`${jg.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function qu(){let t=Nr.store.hideUsername!==!1,e=Nr.store.hideEmail!==!1,n=t&&Nr.store.enlargePlan!==!1,r=t&&Nr.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(Ug([...Fg,...zu])),o.push(Kg())):o.push(_u(qg))),e&&o.push(_u(zg)),n&&o.push(Wg()),!o.length){E(fs);return}w(fs,o.join(`
`))}var ju=y({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Nr,start:qu,onSettingsChange:qu,stop(){E(fs)}});var Gu=`#bloom-rt-host {
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
    box-sizing: border-box;
    margin: 0;
    padding: 8px;
    border-radius: 16px;
    color: var(--text-primary, #0d0d0d);
    /* Settings card (--bg-primary). Page --main-surface-primary is #000 in dark. */
    background: var(--bg-primary, #fff);
    border: 1px solid var(--border-xlight, rgba(0, 0, 0, 0.05));
    box-shadow: var(--shadow-long, 0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62));
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
    background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
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
`;var Wu=new S("RecentTopics"),In="bloom-rt-host",Vu="home",Yu=/^\/c\/([a-z0-9_-]{8,})/i,Yg=/\/c\/([a-z0-9_-]{8,})/i,Xu=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Xg=new Set(["Backquote","IntlBackslash"]),Zg=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Jg=140,Qg=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),G=L({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Qg},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),vi=null,xi=null,ot=!1,$r=!1,Rr=!1,Dt=0,Ue="",An=null,Pr=null,Hn,ps=null,gs=null;function tb(){let t=Number(G.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function Or(){let t=G.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function hs(){let t=G.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Zu(){let t=G.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function ys(){let t=G.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function wi(t){let e=tb();return t.length>e?t.slice(0,e):t}function $t(t){return t===Vu}function Br(t,e=Jg){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function vs(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(Yu)?.[1]??""}catch{return t.match(Yg)?.[1]??""}}function Ke(){let t=(location.pathname||"/").match(Yu);if(t?.[1])return t[1];let n=xt().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return Vu}function xs(t){if($t(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(vs(r.getAttribute("href")||"")!==t)continue;let o=Br(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return Ke()===t&&e&&!/^ChatGPT$/i.test(e)?Br(e,80):""}function eb(t){if($t(t))return"New chat";let e=hs()[t];if(e)return e;let n=Sn(t);return n||xs(t)||"Chat"}function nb(t){return ys()[t]||""}function rb(t){return Zu()[t]||{}}function Es(t,e){if(!t||$t(t)||!e||/^new chat$/i.test(e.trim()))return;let n=hs();n[t]!==e&&(n[t]=e,G.store.titles=n)}function ob(t){t.type==="conversation-meta"&&(Es(t.conversationId,t.title),ot&&Nn())}function ib(t,e){if(!t||$t(t)||!e)return;let n=ys();n[t]!==e&&(n[t]=e,G.store.projects=n)}function ab(t,e){if(!t||$t(t)||!e.user&&!e.assistant)return;let n=Zu(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,G.store.previews=n)}function ws(t){if(!t||$t(t)&&G.store.includeHome===!1)return;let e=Or().filter(n=>n!==t);e.unshift(t),G.store.visits=wi(e)}function Si(){let t=G.store.includeHome!==!1;return wi(Or().filter(n=>t||!$t(n))).map(n=>({id:n,title:eb(n),project:nb(n),preview:rb(n)}))}function Uu(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return Br(o)}catch{return""}}function Dr(t){if(!t||$t(t)||t!==Ke())return;let e=xs(t);e&&Es(t,e);let n=Uu("user"),r=Uu("assistant");ab(t,{user:n,assistant:r});let o=Qu(t);if(o){let i=Ju(o);i&&ib(t,i)}}function Ss(){let t=hs(),e=ys(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${In}, #bloom-root, #bloom-sidebar-panel`))continue;let u=vs(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=Br(c.textContent||"",80);d&&!Xu.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let f=Ju(c);f&&e[u]!==f&&(e[u]=f,i=!0)}}catch{}o&&(G.store.titles=t),i&&(G.store.projects=e);let a=Or(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(G.store.visits=wi([...a,...l]))}function Ju(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=Br((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!Xu.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function Qu(t){if($t(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(vs(e.getAttribute("href")||"")===t)return e}catch{}return null}function sb(t){let e=Qu(t);if(e){e.click();return}if($t(t)){location.assign("/");return}location.assign(`/c/${t}`)}function lb(){let t=Ke();Ue&&Ue!==t&&Dr(Ue),Ue=t,ws(t),Ss();let e=xs(t);e&&Es(t,e),Dr(t)}function Ei(){Hn===void 0&&(Hn=window.setTimeout(()=>{Hn=void 0,lb()},120))}function cb(){An||(An=history.pushState.bind(history),Pr=history.replaceState.bind(history),history.pushState=function(...e){let n=An(...e);return Ei(),n},history.replaceState=function(...e){let n=Pr(...e);return Ei(),n})}function ub(){An&&(history.pushState=An),Pr&&(history.replaceState=Pr),An=null,Pr=null}function db(t){return Xg.has(t.code)||t.keyCode===192?!0:Zg.has(t.key)}function td(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function mb(t,e){$r=e,Ss(),Dr(Ke()),ot=!0,Dt=0;try{let n=Ke();ws(n);let r=Si();r.length>1&&(Dt=t?r.length-1:1)}catch(n){Wu.error("Failed to open switcher:",n)}Nn()}function Ku(t){let{length:e}=Si();e&&(Dt=(Dt+(t?-1:1)+e)%e,Nn())}function Ls(){if(!ot)return;let t=Si()[Dt];ot=!1,$r=!1,Nn(),t&&sb(t.id)}function ed(){ot&&(ot=!1,$r=!1,Nn())}function fb(t){if(td(t)){Rr=!0;return}if((t.ctrlKey||Rr)&&!t.altKey&&!t.metaKey&&db(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{ot?Ku(t.shiftKey):mb(t.shiftKey,!0)}catch(n){Wu.error("Hotkey failed:",n)}return}if(ot){if(t.key==="Escape"){t.preventDefault(),ed();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),Ls();return}t.key==="Tab"&&(t.ctrlKey||Rr)&&(t.preventDefault(),Ku(t.shiftKey))}}function pb(t){td(t)&&(Rr=!1,ot&&$r&&Ls())}function gb(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(Ei)}function bb(t){!ot||(t.target instanceof Element?t.target:null)?.closest(`#${In}`)||ed()}function hb(){document.visibilityState==="hidden"&&Dr(Ke())}function bs(t=xi){t instanceof HTMLElement&&Bo(t,Oo("auto"),!0)}function yb(){if(!document.body)return null;let t=document.getElementById(In);if(t instanceof HTMLElement)return xi=t,bs(t),t;t=document.createElement("div"),t.id=In;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),xi=t,bs(t),t}function Nn(){let t=yb();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!ot){e.dataset.visible="false",e.replaceChildren();return}let n=Si();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}Dt>=n.length&&(Dt=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===Dt?"true":"false",s.setAttribute("aria-selected",a===Dt?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{Dt=a,Ls()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function vb(){document.getElementById(In)?.remove(),xi=null}var nd=y({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${In}`],settings:G,start(){w("recentTopics",Gu),Ue=Ke(),ws(Ue),Ss(),Dr(Ue),ps=lt(ob),cb(),vi=new AbortController;let{signal:t}=vi;window.addEventListener("keydown",fb,{capture:!0,signal:t}),window.addEventListener("keyup",pb,{capture:!0,signal:t}),window.addEventListener("popstate",Ei,{signal:t}),document.addEventListener("click",gb,{capture:!0,signal:t}),document.addEventListener("click",bb,{signal:t}),document.addEventListener("visibilitychange",hb,{signal:t}),gs=dn("schemeChange",()=>bs())},stop(){vi?.abort(),vi=null,Hn!==void 0&&(clearTimeout(Hn),Hn=void 0),ub(),ps?.(),ps=null,gs?.(),gs=null,ot=!1,$r=!1,Rr=!1,vb()},onSettingsChange(){let t=wi(Or());t.length!==Or().length&&(G.store.visits=t),ot&&Nn()}});var Ts="cleaner",xb=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],Eb=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],wb=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],Sb=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],Lb=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],Tb=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],We=L({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function Rn(t){return`${t.join(",")}{display:none!important}`}function rd(){let t=[];if(We.store.hideDownloadApps!==!1&&t.push(Rn(xb)),We.store.hideDisclaimer!==!1&&t.push(Rn(Eb)),We.store.hideUpgrade!==!1&&t.push(Rn(wb)),We.store.hideLockedModels!==!1&&t.push(Rn(Sb)),We.store.hideHomePromo!==!1&&t.push(Rn(Lb)),We.store.hideAds!==!1&&t.push(Rn(Tb)),!t.length){E(Ts);return}w(Ts,t.join(`
`))}var od=y({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:We,start:rd,onSettingsChange:rd,stop(){E(Ts)}});var Ti=new S("ResponseNotification"),On=L({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:Nb},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),ks=!1,Li=null,Pn=null,_r=null;function kb(){return document.visibilityState==="hidden"||document.hidden}function Cb(){return On.store.onlyWhenHidden===!1?!0:kb()}function Mb(){let t=Sn(M());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function id(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!Pn||Pn.state==="closed")&&(Pn=new t);let e=Pn,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){Ti.debug("chime failed",t)}}function Ab(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){Ti.debug("custom sound failed",e),id()}}function ad(){let t=String(On.store.soundUrl||"").trim();t?Ab(t):id()}function Hb(){let t="Bloom++",e=`${Mb()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){Ti.debug("notification failed",n)}}function Ib(){Cb()&&(On.store.sound!==!1&&ad(),On.store.browserNotification!==!1&&Hb())}function Nb(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>ad()),t.appendChild(e),()=>{e.remove()}}var sd=y({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:On,start(){ks=!0,Li?.(),Li=tt(t=>{if(!ks||t.userStopped||t.error)return;let e=M()||Ln();t.conversationId&&t.conversationId!==e||Ib()}),_r?.abort(),_r=new AbortController,On.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:_r.signal}),Ti.debug("watch started")},stop(){ks=!1,Li?.(),Li=null,_r?.abort(),_r=null;try{Pn?.close()}catch{}Pn=null}});var ld=`#bloom-pq-chip {
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
`;var jr=new S("PromptQueue"),Ms="bloom-pq-chip",cd="promptQueue",ud=80,Pb=50,Ob=2e3,Bb='#thread section[data-testid^="conversation-turn-"][data-turn="assistant"], #thread article[data-testid^="conversation-turn-"][data-turn="assistant"]',Db=/^(?:pro thinking|thinking(?:…|\.\.\.)?|正在思考|思考中)$/i,gd=L({replacePending:{type:2,description:"Replace the queued prompt if you Enter again while one is waiting.",default:!0}}),U=new Map,_t=!1,St="",q="",qt=!1,it=!1,Se=!1,_=null,qr=null,ki=null,Ee,Fr,Bn=null;function Dn(){return Jt(xt())}function zr(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function $b(t){let e=zr(It(t));if(e)return e;if(!Ht(t))return"";try{let n=t.cloneNode(!0);return n.querySelectorAll('[contenteditable="false"], button, [role="button"]').forEach(r=>r.remove()),zr(n.innerText||n.textContent||"")}catch{return""}}function _b(){try{let t=document.querySelectorAll(Bb),e=t[t.length-1];return e instanceof HTMLElement?e:null}catch{return null}}function qb(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function Fb(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=(e.textContent||"").replace(/\s+/g," ").trim();if(!(!n||n.length>32)&&Db.test(n))return!0}}catch{}return!1}function zb(){let t=Ln();if(!t)return!1;let e=M();return!e||e===t}function jb(){if(X()||ai())return!1;if(Q()||zb())return!0;let t=_b();return t?!!(qb(t)||Fb(t)):!1}function bd(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(At);return n instanceof HTMLElement?n:null}function dd(t){return bd(t)??Y()}function Ci(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function hd(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function Gb(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?zr(e.innerText||e.textContent||""):""}catch{return""}}function md(t){if(!St||St===t)return;let e=U.get(St);!e||U.has(t)||$(St,t)&&(U.delete(St),U.set(t,e),q===St&&(q=t),_?.key===St&&(_.key=t),jr.debug("migrated pending",St,"\u2192",t))}function Mi(t){let e=Dn();if(U.get(e)&&gd.store.replacePending===!1)return;U.set(e,{text:t,at:Date.now()}),_={key:e,text:t,turns:hd(),ticks:3};let r=Y();r&&Zt(r,""),we(),jr.debug("queued",e,t.length)}function Ub(t){U.delete(t),q===t&&(q=""),_?.key===t&&(_=null),we()}function Kb(){it=!0,clearTimeout(Fr),Fr=setTimeout(()=>{it=!1,Fr=void 0},Ob)}function Wb(){let t=Dn(),e=U.get(t);if(!e)return;let n=Y();if(!n)return;U.delete(t),q="",we(),Kb(),Zt(n,e.text);let r=pe();r&&!B(r)&&!Jo(r)&&(r.click(),it=!1)}function fd(t){if(!_t||qt||Q()||Dn()!==t)return;let e=U.get(t);if(!e){q="";return}if(Pt())return;let n=Y();if(!n)return;if(!fe(n)){let o=zr(It(n));if(o&&o!==e.text)return}let r=pe();!r||B(r)||Jo(r)||(qt=!0,Zt(n,e.text),clearTimeout(Ee),Ee=setTimeout(()=>Vb(t,e.text),Pb))}function Vb(t,e){Ee=void 0;try{if(!_t)return;let n=U.get(t);if(!n||n.text!==e||Q()||Dn()!==t)return;let r=Y();if(!r)return;let o=zr(It(r));if(o&&o!==e&&!fe(r))return;o!==e&&Zt(r,e);let i=pe();if(!i||B(i)||Jo(i))return;i.click(),U.delete(t),q="",we(),jr.debug("drained",t)}finally{qt=!1}}function yd(t){let e=vt();if(!e||e===document.body){t.style.left="50%",t.style.bottom="6.5rem";return}let n=e.getBoundingClientRect();t.style.left=`${Math.round(n.left+n.width/2)}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`;let r=Math.min(512,Math.max(160,n.width-24));t.style.maxWidth=`${Math.round(r)}px`}function Cs(){Bn?.remove(),Bn=null}function we(){if(!_t||!document.body){Cs();return}let t=Dn(),e=U.get(t);if(!e){Cs();return}let n=Bn;n?.isConnected||(n=document.createElement("div"),n.id=Ms,document.body.appendChild(n),Bn=n),n.replaceChildren();let r=document.createElement("span");r.className="bloom-pq-kicker",r.textContent="Next";let o=document.createElement("span");o.className="bloom-pq-text";let i=e.text.length>ud?`${e.text.slice(0,ud)}\u2026`:e.text;o.textContent=i,o.title=e.text;let a=document.createElement("div");a.className="bloom-pq-actions";let s=document.createElement("button");s.type="button",s.className="bloom-pq-btn bloom-pq-send",s.textContent="Send now",s.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),Wb()});let l=document.createElement("button");l.type="button",l.className="bloom-pq-btn bloom-pq-x",l.setAttribute("aria-label","Dismiss queued prompt"),l.textContent="\xD7",l.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),Ub(t)}),a.append(s,l),n.append(r,o,a),yd(n)}function Yb(){if(!_)return;if(_.ticks-=1,U.get(_.key)&&hd()>_.turns){let e=Gb();if(e&&e===_.text){jr.debug("native send leaked; dropping pending"),U.delete(_.key),q===_.key&&(q=""),_=null,we();return}}_.ticks<=0&&(_=null)}function Ai(t){return!jb()||!Ht(t)?"":$b(t)}function Xb(t){if(!_t||t.isComposing||t.keyCode===229||t.key!=="Enter"||t.shiftKey||t.ctrlKey||t.metaKey||qt)return;let e=dd(t.target)??dd(document.activeElement);if(!e)return;if(t.altKey||it){it=!1,Se=!0,queueMicrotask(()=>{Se=!1});return}let n=Ai(e);n&&(Ci(t),Mi(n))}function Zb(t){if(!_t||qt||!(t instanceof InputEvent)||t.inputType!=="insertParagraph")return;if(Se){Se=!1;return}if(it){it=!1;return}let e=bd(t.target);if(!e)return;let n=Ai(e);n&&(Ci(t),Mi(n))}function Jb(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||B(e))return null;let n=t.closest(En);if(n instanceof HTMLElement&&!B(n))return n;let r=pe();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function pd(t){if(!_t)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${Ms}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&B(n)||qt||!Jb(e))return;if(it){it=!1;return}let r=Y();if(!r)return;let o=Ai(r);o&&(Ci(t),Mi(o))}function Qb(t){if(!_t)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(Zo)&&!e.querySelector(At)||qt)return;if(Se){Se=!1;return}if(it){it=!1;return}let n=Y()??e.querySelector(At);if(!n)return;let r=Ai(n);r&&(Ci(t),Mi(r))}var vd=y({name:"PromptQueue",description:"Queue the next prompt while a reply is streaming. Enter/Send waits for this turn instead of interrupting.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:cd,cleanupSelectors:[`#${Ms}`],settings:gd,start(){_t=!0,St=Dn(),q="",qt=!1,it=!1,Se=!1,_=null,w(cd,ld),qr?.abort(),qr=new AbortController;let{signal:t}=qr,e={capture:!0,signal:t};window.addEventListener("keydown",Xb,e),document.addEventListener("beforeinput",Zb,e),document.addEventListener("pointerdown",pd,e),document.addEventListener("click",pd,e),document.addEventListener("submit",Qb,e),ki?.(),ki=tt({onFall(n){if(_t){if(n.userStopped||n.error){q="",we();return}q=n.contextKey,fd(n.contextKey)}},onContext(n,r){r&&n&&!$(r,n)&&(q="",qt=!1,Ee!==void 0&&(clearTimeout(Ee),Ee=void 0)),md(n),St=n,we()},onTick(n){md(n.contextKey),St=n.contextKey,Yb(),q&&q===n.contextKey&&fd(q),Bn&&yd(Bn)}}),we(),jr.debug("watch started")},stop(){_t=!1,ki?.(),ki=null,qr?.abort(),qr=null,clearTimeout(Ee),Ee=void 0,clearTimeout(Fr),Fr=void 0,U.clear(),_=null,q="",qt=!1,it=!1,Se=!1,Cs()}});var xd=`.bloom-cls {
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
`;var Sd=new S("ChatListStatus"),Ed="chatListStatus",Ni="bloom-cls",eh="bloom-cls",nh=1200*1e3,rh="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",Lt=new Map,Ft=!1,mt="",te=!1,qn=!1,ft=0,Le=null,Is=null,$n=null,As=null,Hi=null,Gr=null,_n=!1,Te=new Set;function Ii(){return Date.now()}function Ld(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function ee(t,e,n,r=!0){if(!(!t||!Ft)){if(e==="idle")Lt.delete(t);else{let o=Lt.get(t);o&&o.kind===e&&n!=="net"?o.at=Ii():Lt.set(t,{kind:e,at:Ii(),source:n})}r&&oh({v:1,id:t,kind:e,at:Ii()}),Ve()}}function oh(t){try{$n?.postMessage(t)}catch{}}function ih(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||ee(e.id,e.kind,"bc",!1)}function ah(){let t=Ii();for(let[e,n]of Lt)n.kind==="streaming"&&t-n.at>nh&&Lt.delete(e)}function sh(){let t=Ld();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(r.closest(rh))continue;let o=Qt(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function wd(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function Hs(t){let e=t.querySelector(`:scope > .${Ni}`);return e||null}function Ns(){if(!Ft)return;ah();let t=M(),e=sh();Le?.disconnect();try{for(let n of e){let r=Qt(n.getAttribute("href")||"");if(!r||!t||r!==t){Hs(n)?.remove();continue}let i=Lt.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){Hs(n)?.remove();continue}let a=Hs(n);a||(a=document.createElement("span"),a.className=Ni,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(wd("streaming")):i==="error"&&a.appendChild(wd("error")))}}catch(n){Sd.debug("paint failed",n)}Td()}function Ve(){if(Ft){if(document.hidden){ft&&(cancelAnimationFrame(ft),ft=0),Ns();return}ft||(ft=requestAnimationFrame(()=>{ft=0,Ft&&Ns()}))}}function Td(){let t=Ld();if(!(Le&&Is===t&&t?.isConnected)){if(Le?.disconnect(),Is=t,!t){Le=null;return}Le=new MutationObserver(()=>Ve()),Le.observe(t,{childList:!0,subtree:!0})}}function Ri(){return!!(Be()||kr())}function lh(t){return!!(_n||t&&Te.has(t)||!qn&&!X()&&Ri())}function ch(t){if(Ft){if(t.type==="post-start"){qn=!1,t.conversationId?(_n=!1,Te.add(t.conversationId),te=!0,ee(t.conversationId,"streaming","net")):(_n=!0,te=!0);return}if(t.type==="post-end"){if(_n=!1,t.conversationId){Te.delete(t.conversationId);let e=M(),n=Ln();(e?t.conversationId===e:t.conversationId===n)?ee(t.conversationId,t.error?"error":"done","net"):ee(t.conversationId,"idle","net")}Ri()||(te=!1)}}}function uh(t,e){if(!Ft)return;if($(e,t)){Ve();return}let n=M();if(mt&&mt!==n){Te.delete(mt);let r=Lt.get(mt);r&&r.kind!=="idle"&&ee(mt,"idle","local")}_n=!1,te=!1,qn=!0,n&&Lt.get(n)?.kind==="streaming"&&Lt.get(n)?.source==="local"&&!Te.has(n)&&ee(n,"idle","local"),Ve()}function dh(t){if(!Ft)return;let e=t.conversationId||M();if(mt&&e&&mt!==e){Te.delete(mt);let r=Lt.get(mt);r&&r.kind!=="idle"&&ee(mt,"idle","local"),te=!!(e&&Te.has(e))}if(e&&(mt=e),qn||X()){if(X()||Ri()||t.streaming){Ve();return}qn=!1}if(lh(e)&&(t.streaming||Ri())){te=!0,e&&ee(e,"streaming","local"),Ve();return}te&&(te=!1,e&&ee(e,Pt()?"error":"done","local")),Ve()}var kd=y({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Ni}`],start(){Ft=!0,w(Ed,xd);try{$n=new BroadcastChannel(eh)}catch{$n=null}$n?.addEventListener("message",ih),As=lt(ch),Hi?.(),Hi=tt({onTick:dh,onContext:uh}),Gr?.abort(),Gr=new AbortController,document.addEventListener("visibilitychange",()=>{Ft&&(ft&&(cancelAnimationFrame(ft),ft=0),Ns())},{signal:Gr.signal}),Td(),Sd.debug("sidebar status watch started")},stop(){Ft=!1,ft&&cancelAnimationFrame(ft),ft=0,Gr?.abort(),Gr=null,Le?.disconnect(),Le=null,Is=null,Hi?.(),Hi=null,As?.(),As=null;try{$n?.close()}catch{}$n=null,Lt.clear(),Te.clear(),_n=!1,te=!1,qn=!1,mt="",document.querySelectorAll(`.${Ni}`).forEach(t=>t.remove()),E(Ed)}});var Md="widerChat",Ad=40,Hd=96,Id=64,Nd=L({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:Ad,max:Hd,default:Id}});function mh(){return V(Number(Nd.store.width??Id),Ad,Hd)}function Cd(){let t=mh(),e=`min(100%,${t}rem)`;w(Md,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var Rd=y({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Nd,start:Cd,onSettingsChange:Cd,stop(){E(Md)}});var Rs="composerOpacity",Fn='form[data-type="unified-composer"],form.w-full[data-type]',fh=[`${Fn} [class*="corner-superellipse"]`,`${Fn} [class*="bg-token-bg-primary"]`,`${Fn} [class*="bg-token-main-surface"]`].join(","),ph=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),gh="#thread-bottom-container,#thread-bottom",bh=`${Fn} #prompt-textarea,${Fn} [contenteditable="true"]`,hh="var(--bg-primary,var(--main-surface-primary,#ffffff))",Ps=L({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function yh(){return V(Number(Ps.store.opacity??100),0,100)}function vh(){return V(Number(Ps.store.blur??16),0,40)}function Pd(){let t=yh();if(t>=100){E(Rs);return}let e=vh(),n=`color-mix(in srgb,${hh} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";w(Rs,`${gh}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${ph}{display:none!important}${Fn}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${fh}{background-color:${n}!important;background-image:none!important;${r}}${bh}{background-color:transparent!important;background-image:none!important}`)}var Od=y({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[v.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Ps,start:Pd,onSettingsChange:Pd,stop(){E(Rs)}});var Bd=`#bloom-bn-host {
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

.bloom-bn-emoji {
    flex: none;
    font-size: 1rem;
    line-height: 1;
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

#thread [data-message-id],
#thread [data-testid^="conversation-turn-"] {
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
`;var Eh=new S("BetterNavigator"),Os="betterNavigator",qd="bloom-bn-host",ke=60,wh=16,Sh=1e3,Lh=2.5,Th=.4,Bi="\u6B63\u5728\u8F93\u51FA\u2026",_s="Image",kh="\u2753",Ch="\u{1F916}",Dd=/file_[0-9a-f]+/gi,Mh="File",Ah="Code",Hh=".markdown, .whitespace-pre-wrap",ji=["a[download]","[class*='attachment']","[data-testid*='file' i]","[data-testid*='attachment' i]"].join(", "),Ih="img, picture, video, canvas",Nh=/\.(?:epub|pdf|docx?|xlsx?|pptx?|txt|md|csv|json|zip|rar|7z|png|jpe?g|gif|webp|svg|mp3|mp4|wav|m4a|html?|py|js|ts|tsx|css|c|cpp|java|go|rs|rb|xml|ya?ml)$/i,Rh=/\.[A-Za-z0-9]{1,8}(?:…|\.\.\.)$/,Gi=/^(?:file|image|pdf|epub|document|attachment|video|audio|code|zip|png|jpe?g|gif|webp|txt|markdown|文件|图片|附件|文档)$/i,Ph=/favicon|iconify|shields\.io|badgen\.net|google\.com\/s2\/favicons|gstatic\.com\/favicon/i,Oh=/^(?:pro[\s-]*thinking|thinking|working|正在思考|思考中|正在工作)(?:\s*\d+\s*[sm])?(?:…|\.{3})?$/i,Bh=/^(?:pro thinking|thinking(?:…|\.\.\.)?|reasoning|thoughts?|正在思考|思考中|已思考.*|thought for\b.*|worked for\b.*|思考了.*|思考用时.*)$/i,Dh=/^(?:inspected|analyzed|translated|validated|searched|reviewed|extracted|packaged|已检查|已分析|已翻译|已验证|搜索了|已搜索)\b/i,$h=/^(?:\d+\s+)?(?:sources?|websites?)$|^web search$|^zh-cn$|^zh$|^en(?:-[a-z]{2})?$/i,_h=/^(?:Image(?: x\d+)?|File|Code|Message \d+)$/,qh=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),Fh=2e3,zh=40,jh=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,Gh=['section[data-testid^="conversation-turn-"][data-turn="user"]','section[data-testid^="conversation-turn-"][data-turn="assistant"]','article[data-testid^="conversation-turn-"][data-turn="user"]','article[data-testid^="conversation-turn-"][data-turn="assistant"]'].join(", "),Uh=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),Kh=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='footnote']",".sr-only"].join(", "),Wh=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),Ui=L({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),jn=new Map,Yr=new Map,jt=new Set,Di=0,Tt=!1,re=!1,zn=!1,Ce=null,Zr=null,Ze=null,$i=null,K=[],Je="",_i=0,qi=-1,Us=0,Fi="",pt=0,ne=0,Ur,Kr=null,Pi=null,Bs=null,Ds=null,Ye=null,qs=null,Wr=null,Xe=null,Gn=null,Vr=null;function Ki(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function $s(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function Vh(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function Yh(t){let e=t.getBoundingClientRect(),n=null;try{let o=t.querySelector("[data-message-id], [data-testid^='conversation-turn-']"),a=o?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]')??o;for(;a&&a!==t;)jh.test(Vh(a))&&(n=a),a=a.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=$s(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||$s(getComputedStyle(t).getPropertyValue("--thread-content-width"))||$s(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function zi(t){try{return!!t.closest(Uh)}catch{return!0}}function $d(t){let e=(t.getAttribute("data-turn")||t.closest("[data-turn]")?.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("data-message-author-role")||t.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase();if(n==="user"||n==="assistant")return n;try{let o=(t.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent||"").toLowerCase();if(o.includes("you said"))return"user";if(o.includes("chatgpt said")||o.includes("assistant said"))return"assistant"}catch{}let r=(t.getAttribute("aria-label")||"").toLowerCase();return r.includes("you said")?"user":r.includes("chatgpt said")||r.includes("assistant said")?"assistant":null}function Wi(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||t.querySelector("[data-message-id]")?.getAttribute("data-message-id")||""}function Ks(t){try{if(t.querySelector("[class*='imagegen-image']")||t.querySelector('img[alt="Generated image"], img[alt^="Generated image"]'))return!0}catch{}return!1}function Xh(t){try{return!!t.closest("[class*='message-image']")}catch{return!0}}function Oi(t,e){if(t){Dd.lastIndex=0;for(let n of t.matchAll(Dd))e.add(n[0].toLowerCase())}}function Zh(t){try{let e=new Set,n=s=>{Xh(s)||(Oi(s.getAttribute("src")||"",e),Oi(s.getAttribute("srcset")||"",e),Oi(s.getAttribute("href")||"",e),s instanceof HTMLImageElement&&Oi(s.currentSrc||"",e))};for(let s of t.querySelectorAll("[class*='imagegen-image']")){n(s);for(let l of s.querySelectorAll("[src], [srcset], [href]"))n(l)}for(let s of t.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]'))n(s);if(e.size)return e.size;let o=t.querySelectorAll("[class*='group/imagegen-image']").length;if(!o)return 0;let i=Wi(t);return(i?t.querySelector(`#image-${CSS.escape(i)}`):t.querySelector("[id^='image-']:not([id^='image-gen-'])"))&&o>=2&&(o-=1),o}catch{return 0}}function Jh(t,e){let n=Zh(t),r=Yr.get(e)??0,o=Math.max(r,n);return o>0&&Yr.set(e,o),o>=2?`${_s} x${o}`:_s}function Z(t){return t.replace(/\s+/g," ").trim()}function Ws(t,e){let n=t;for(;n&&n!==e;){if(n.matches(Kh))return!0;n=n.parentElement}return!1}function Xr(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(Ws(i,t))return NodeFilter.FILTER_REJECT;let s=i.closest(ji);if(s&&(s===t||t.contains(s)))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return Z(o.textContent||"")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<ke+20;)e.push(Z(r.textContent||""));return Z(e.join(" "))}function Vi(t){let e=Z(t);return e.length<3||e.length>180||Gi.test(e)?!1:Nh.test(e)?!0:Rh.test(e)}function Vs(t){let e=Z(t);return e.length<8||e.length>120||/\s/.test(e)||Gi.test(e)||Vi(e)||/^https?:/i.test(e)||/^file_[0-9a-f]{6,}$/i.test(e)||!/[_\-.]/.test(e)&&!/\(\d+\)/.test(e)?!1:/^[\w.\-()[\]+@#]+$/.test(e)}function Qh(t){let e=[],n=i=>{let a=Z(i);if(!a)return;let s=a.match(/^(.*\S)\s+(file|image|pdf|epub|document|attachment|文件|图片|附件|文档)$/i);if(s){e.push(Z(s[1])),e.push(Z(s[2]));return}e.push(a)},r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o;for(;o=r.nextNode();)n(o.textContent||"");return e}function t0(t){try{return zi(t)?!0:!!t.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']")}catch{return!0}}function Ys(t){let e=Z(t);return!e||Xs(e)||Vs(e)?!0:Vi(e)?e.split(/\s+/).length<=8&&!/[。！？!?]/.test(e):!1}function e0(t){return!t.length||t.length>4||!t.every(e=>Ys(e))?!1:t.some(e=>Gi.test(Z(e))||Vi(e)||Vs(e))}function Fd(t){try{let e=t.querySelectorAll(ji),n=e[e.length-1];if(n)return n;let r=null;for(let o of t.querySelectorAll("button, a, [role='button'], div"))t0(o)||o.querySelector("p, li, blockquote")||e0(Qh(o))&&(r=o);return r}catch{return null}}function n0(t){return Fd(t)?Mh:""}function r0(t){try{if(t.closest("[class*='imagegen-image'], [class*='message-image']"))return!1;let e=t instanceof HTMLImageElement?t:t.querySelector("img");if(e instanceof HTMLImageElement){let i=e.getAttribute("alt")||"";if(/^Generated image/i.test(i))return!1;let a=`${e.getAttribute("src")||""} ${e.getAttribute("srcset")||""}`;if(Ph.test(a))return!0}if(t.closest("[data-testid*='citation'], [class*='citation'], [class*='tool-message'], [data-testid*='tool']"))return!0;let n=t.getBoundingClientRect(),r=n.width||Number(e?.getAttribute("width"))||0,o=n.height||Number(e?.getAttribute("height"))||0;if(r>0&&r<=48||o>0&&o<=48)return!0;if(r>48||o>48)return!1}catch{}return!0}function o0(t){try{for(let e of t.querySelectorAll(Ih))if(!r0(e))return!0}catch{}return!1}function Xs(t){let e=Z(t).replace(/^[^a-zA-Z\u4e00-\u9fff]+/,"");return!e||Dh.test(e)||Bh.test(e)?!0:e.length<=24&&($h.test(e)||Gi.test(e))}function i0(t){let e=[],n=new Set,r=o=>{try{if(Ws(o,t)||o.closest(ji))return}catch{return}let i=Xr(o);!i||n.has(i)||Xs(i)||(n.add(i),e.push(i))};try{for(let o of t.querySelectorAll("p, li, h1, h2, h3, blockquote"))if(r(o),e.join(" ").length>ke+20)break;if(!e.length){for(let o of t.querySelectorAll("div, span"))if(!o.querySelector("div, p, li")&&!(Xr(o).length<24)&&(r(o),e.join(" ").length>ke+20))break}}catch{}return Z(e.join(" "))}function a0(t){let e=Fd(t);if(!e)return"";let n=[],r=new Set,o=i=>{try{if(e.contains(i)||i.contains(e)||!(e.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_FOLLOWING)||Ws(i,t)||i.closest(ji))return}catch{return}let a=Xr(i);!a||r.has(a)||Ys(a)||(r.add(a),n.push(a))};try{for(let i of t.querySelectorAll("p, li, h1, h2, h3, blockquote, .whitespace-pre-wrap, .markdown"))if(o(i),n.join(" ").length>ke+20)break;if(!n.length){for(let i of t.querySelectorAll("div, span"))if(!i.querySelector("div, p, li")&&(o(i),n.join(" ").length>ke+20))break}}catch{}return Z(n.join(" "))}function s0(t,e){let n=[];try{for(let o of t.querySelectorAll(Hh)){if(zi(o))continue;let i=Xr(o);if(!(!i||Xs(i)||Ys(i))&&(n.push(i),n.join(" ").length>ke+20))break}}catch{}let r=Z(n.join(" "));if(e==="user"){let o=a0(t);if(o)return o}return r||(e==="assistant"?i0(t):"")}function l0(t){return t.length>ke?`${t.slice(0,ke).trimEnd()}\u2026`:t}function _d(t){return _h.test(t)}function c0(t,e,n,r){let o=s0(t,e);if(o)return l0(o);if(r)return Bi;let i=n0(t);if(i)return i;if(Ks(t))return Jh(t,Wi(t));try{if(o0(t))return _s;if(t.querySelector("pre, code"))return Ah}catch{}return`Message ${n+1}`}function u0(){if(re)return!0;let t=M();return!!(t&&jt.has(t)||!zn&&!X()&&Jr())}function Jr(){return!!(Be()||kr())}function d0(){Di=Date.now()}function zd(t){re=!1,t&&jt.delete(t);let e=M();e&&jt.delete(e)}function m0(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function f0(t){if(Ks(t)||!Jr())return!1;let e=t.querySelector(".markdown");if(!(!e||e instanceof HTMLElement&&!Xr(e)))return!1;let r=t.querySelector("[class*='thinking'], [class*='reasoning']");if(!r)return!1;if(r.getAttribute("aria-busy")==="true"||r.classList.contains("result-streaming"))return!0;try{if(r.querySelector("[aria-busy='true'], .result-streaming"))return!0}catch{}let o=r.closest("details")??r.querySelector("details");return o instanceof HTMLDetailsElement&&o.open}function Zs(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=Z(e.textContent||"");if(!(n.length>32)&&Oh.test(n))return!0}}catch{}return!1}function jd(t){try{for(let e of t.querySelectorAll("svg.animate-spin, .animate-spin"))if(!e.closest('button[data-testid="conversation-options-button"], #page-header, nav, [data-testid*="citation"]'))return!0}catch{}return!1}function p0(t,e){try{if(m0(t))return!0;if(!e)return!1;if(f0(t)||Zs(t))return!0}catch{}return!1}function Gd(t){if(!t||Jr())return!1;try{if(Zs(t)||jd(t))return!1;if(t.querySelector(qh)||Ks(t))return!0}catch{}return!1}function g0(t){if(Jr()||Di&&Date.now()-Di<Fh)return;let e=[...t].reverse().find(n=>n.role==="assistant");!e||!Gd(e.el)||zd()}function b0(t){let e=new Set,n=[];try{for(let r of t.querySelectorAll(Gh)){if(zi(r))continue;let i=Wi(r)||`anon:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}if(n.length)return n;try{for(let r of t.querySelectorAll("[data-message-id]")){if(zi(r))continue;let i=r.getAttribute("data-message-id")||""||`mid:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}return n}function h0(){let t=Ki();if(!t||t===document.body)return[];let e=Ui.store.showAssistant!==!1,n=e&&u0(),r=b0(t),o=null;if(e)for(let a of r)$d(a)==="assistant"&&(o=a);let i=[];try{for(let a of r){let s=Wi(a);if(!s)continue;let l=$d(a);if(l!=="user"&&l!=="assistant"||l==="assistant"&&!e)continue;let c=a===o,u=c&&Zs(a),d=c&&jd(a),f=l==="assistant"&&c&&!Gd(a)&&(u||d||n||p0(a,!0)),h=c0(a,l,i.length,f);if(h&&h!==Bi){let g=jn.get(s),m=!!g&&(Vi(g)||Vs(g));(!g||m||!_d(h)||_d(g))&&h!==g&&jn.set(s,h)}let p=f&&h===Bi?Bi:jn.get(s)||h;i.push({id:s,el:a,role:l,text:p,live:f})}}catch{}return g0(i),i}function y0(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function Ud(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function v0(t){return t===window?window.innerHeight:t.clientHeight}function x0(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(Wh)}catch{return!1}}function Kd(){Ur!==void 0&&(clearTimeout(Ur),Ur=void 0),Kr?.classList.remove("bloom-bn-flash"),Kr=null}function E0(t){Kd(),t.classList.add("bloom-bn-flash"),Kr=t,Ur=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),Kr===t&&(Kr=null),Ur=void 0},800)}function Fs(t){if(!K.length)return;let e=Math.max(0,Math.min(t,K.length-1));_i=e,Zr?.querySelectorAll(".bloom-bn-tick").forEach((r,o)=>{r.classList.toggle("bloom-bn-current",o===e)}),Ze?.querySelectorAll(".bloom-bn-item").forEach((r,o)=>{r.classList.toggle("bloom-bn-active",o===e)}),$i&&($i.textContent=`${e+1} / ${K.length}`);let n=Ze?.children[e];if(n instanceof HTMLElement){let r=Ze;if(r){let o=n.offsetTop-r.clientHeight/2+n.offsetHeight/2;r.scrollTop=Math.max(0,o)}}}function zs(t){let e=K[t];if(!e?.el.isConnected)return;qi=t,Us=Date.now()+Sh,Fs(t);let n=Gn??Ud(e.el),o=Math.abs(e.el.getBoundingClientRect().top-y0())>Lh*v0(n);e.el.scrollIntoView({behavior:o?"auto":"smooth",block:"start"}),Ui.store.jumpEffect!=="none"&&E0(e.el)}function Js(){if(!Tt||!K.length)return;if(Date.now()<Us&&qi>=0){Fs(qi);return}let t=window.innerHeight*Th,e=0;for(let n=0;n<K.length;n++){let r=K[n].el;r.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}Fs(e)}function w0(t){let e=Ud(t);if(Gn===e&&Vr)return;Vr?.(),Gn=e;let n=e===window?document:e,r=()=>{Js(),Qs()};n.addEventListener("scroll",r,{passive:!0}),Vr=()=>n.removeEventListener("scroll",r)}function S0(t){Xe?.disconnect(),Xe=null;let e=Gn instanceof HTMLElement?Gn:null;Xe=new IntersectionObserver(()=>Js(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el.isConnected&&Xe.observe(n.el)}function L0(){if(!document.body)return null;let t=Ce;if(t?.isConnected)return t;t=document.createElement("div"),t.id=qd,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),Ce=t,Zr=e,Ze=i,$i=o,t}function Wd(){let t=Ce,e=Ki();if(!t||!e||!e.isConnected||K.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=Yh(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||zh,d=n.right-r.right>=c+8?r.right+4:r.right-12-c;d=Math.min(d,n.right-c-8),d=Math.max(8,d);let f=Math.max(8,Math.round(window.innerWidth-d-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${f}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function Qs(){!Tt||ne||(ne=requestAnimationFrame(()=>{ne=0,Tt&&Wd()}))}function T0(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function k0(t){let e=Zr,n=Ze;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>wh),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=T0(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",c=>{c.preventDefault(),zs(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-emoji",s.textContent=r.role==="user"?kh:Ch;let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=r.text,l.title=r.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),zs(o)}),n.appendChild(a)}))}function C0(t){Zr?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=Ze?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function M0(){let t=M();return t===Fi?!1:(Fi=t,jn.clear(),Yr.clear(),K=[],Je="",_i=0,qi=-1,Us=0,re&&t&&(jt.add(t),re=!1),!0)}function A0(t){let e=Ui.store.showAssistant!==!1?"1":"0";return`${Fi}|${e}|${t.map(n=>n.id).join(",")}`}function js(){if(!Tt)return;M0();let t=h0(),e=Ki();if(!e||t.length<1){K=t,Je="",Ce&&(Ce.hidden=!0),Xe?.disconnect(),Gs();return}L0();let n=A0(t);n!==Je?(K=t,Je=n,k0(t),w0(e),S0(t)):(K=t,C0(t)),Wd(),Js(),Gs()}function zt(){if(Tt){if(document.hidden){pt&&(cancelAnimationFrame(pt),pt=0),js();return}pt||(pt=requestAnimationFrame(()=>{pt=0,Tt&&js()}))}}function Gs(){let t=Ki();if(!(Ye&&qs===t&&t?.isConnected)){if(Ye?.disconnect(),Wr?.disconnect(),qs=t,!t||t===document.body){Ye=null;return}Ye=new MutationObserver(()=>zt()),Ye.observe(t,{childList:!0,subtree:!0}),Wr=new ResizeObserver(()=>Qs()),Wr.observe(t)}}function H0(t){if(Tt){if(t.type==="post-start"){d0(),zn=!1,t.conversationId?(re=!1,jt.add(t.conversationId)):re=!0,zt();return}if(t.type==="post-end"){if(re=!1,t.conversationId)jt.delete(t.conversationId);else{let e=M();e&&jt.delete(e)}zt()}}}function I0(t){if(!Tt||!K.length||Ce?.hidden||t.altKey||t.ctrlKey||t.metaKey||x0(t.target))return;let e=-1;if(t.key==="ArrowDown")e=_i+1;else if(t.key==="ArrowUp")e=_i-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=K.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),zs(Math.max(0,Math.min(e,K.length-1)))}function N0(){Kd(),Xe?.disconnect(),Xe=null,Ye?.disconnect(),Ye=null,qs=null,Wr?.disconnect(),Wr=null,Vr?.(),Vr=null,Gn=null,Ce?.remove(),Ce=null,Zr=null,Ze=null,$i=null}var Vd=y({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:Os,cleanupSelectors:[`#${qd}`],settings:Ui,start(){Tt=!0,Fi=M(),w(Os,Bd),Pi=new AbortController;let{signal:t}=Pi;window.addEventListener("keydown",I0,{signal:t}),window.addEventListener("popstate",zt,{signal:t}),window.visualViewport?.addEventListener("resize",Qs,{signal:t}),document.addEventListener("visibilitychange",()=>{Tt&&(pt&&(cancelAnimationFrame(pt),pt=0),ne&&(cancelAnimationFrame(ne),ne=0),js())},{signal:t}),Ds=lt(H0),Bs=tt({onTick(){if(X()){zt();return}zn&&!Jr()&&(zn=!1),zt()},onFall(e){zd(e.conversationId),zt()},onContext(e,n){if(!$(n,e)){jn.clear(),Yr.clear(),Je="",re=!1;let r=M();for(let o of[...jt])o!==r&&jt.delete(o);zn=!0}zt()}}),Gs(),zt(),Eh.debug("navigator started")},stop(){Tt=!1,pt&&cancelAnimationFrame(pt),pt=0,ne&&cancelAnimationFrame(ne),ne=0,Pi?.abort(),Pi=null,Bs?.(),Bs=null,Ds?.(),Ds=null,jt.clear(),re=!1,zn=!1,Di=0,N0(),jn.clear(),Yr.clear(),K=[],Je="",E(Os)},onSettingsChange(){Je="",zt()}});var Yd=`.bloom-ts {
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
`;function Xd(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Zd(t){try{return new Date(t).toISOString()}catch{return""}}var tm=new S("MessageTimestamps"),Jd="messageTimestamps",Xi="bloom-ts",Qd=1500,P0="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",Un=L({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),Kn=new Map,en=!1,gt=0,Me=null,el=null,tl=null,Yi=null,Qr=null,to=!1,Qe=!1;function em(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function rl(){let t=Un.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function nm(){let t={...rl()};for(let[n,r]of Kn)t[n]=r;let e=Object.keys(t);if(e.length>Qd){let n=e.slice(e.length-Qd),r={};for(let o of n)r[o]=t[o];Un.store.stamps=r;return}Un.store.stamps=t}var O0=zl(nm,500);function rm(t,e){!t||!e||Kn.get(t)===e||(Kn.set(t,e),O0(),tn())}function B0(t){return t?Kn.get(t)??rl()[t]??ri(t)??null:null}function D0(t){en&&t.type==="message-time"&&rm(t.messageId,t.createTime)}function $0(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function _0(){let t=em();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll("[data-message-id]"))n.closest(P0)||e.push(n)}catch{}return e}function q0(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function nl(){if(!en)return;let t=Un.store.hideOwnMessages===!0,e=Un.store.showDate!==!1,n=Q();Qe&&!X()&&(Qe=!1),Qe&&(n?to=!1:Qe=!1);let r=Qe?!1:n,o=_0();Me?.disconnect();try{o.forEach((i,a)=>{let s=i.getAttribute("data-message-id")||"",l=$0(i),c=i.querySelector(`:scope > .${Xi}`);if(t&&l==="user"){c?.remove();return}if(q0(i)){c?.remove();return}let u=B0(s);if(!u&&s&&(r||to)&&a>=o.length-2&&(u=Date.now(),rm(s,u)),!u){c?.remove();return}let d=Xd(u,e);if(!d){c?.remove();return}let f=c;f||(f=document.createElement("time"),f.className=Xi,f.setAttribute("aria-hidden","true"),i.insertBefore(f,i.firstChild)),f.textContent!==d&&(f.textContent=d);let h=Zd(u);h&&f.getAttribute("datetime")!==h&&f.setAttribute("datetime",h)})}catch(i){tm.debug("paint failed",i)}to=r,om()}function tn(){if(en){if(document.hidden){gt&&(cancelAnimationFrame(gt),gt=0),nl();return}gt||(gt=requestAnimationFrame(()=>{gt=0,en&&nl()}))}}function om(){let t=em();if(!(Me&&el===t&&t?.isConnected)){if(Me?.disconnect(),el=t,!t||t===document.body){Me=null;return}Me=new MutationObserver(()=>tn()),Me.observe(t,{childList:!0,subtree:!0})}}var im=y({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Xi}`],settings:Un,start(){en=!0,w(Jd,Yd);let t=rl();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&Kn.set(e,n);tl=lt(D0),Yi?.(),Yi=tt({onTick:tn,onFall:tn,onContext(e,n){$(n,e)||(Qe=!0,to=!1),tn()}}),Qr?.abort(),Qr=new AbortController,document.addEventListener("visibilitychange",()=>{en&&(gt&&(cancelAnimationFrame(gt),gt=0),nl())},{signal:Qr.signal}),om(),tn(),tm.debug("timestamp watch started")},stop(){en=!1,gt&&cancelAnimationFrame(gt),gt=0,Qr?.abort(),Qr=null,Me?.disconnect(),Me=null,el=null,Yi?.(),Yi=null,tl?.(),tl=null,Qe=!1,to=!1,nm(),Kn.clear(),document.querySelectorAll(`.${Xi}`).forEach(t=>t.remove()),E(Jd)},onSettingsChange:tn});var ol="streamerMode",F0="filter:blur(6px)!important;transition:filter .2s ease",z0="filter:none!important",Wn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],Vn=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function bt(t,e){return t.map(n=>`${n} ${e}`)}var nn=L({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function Yn(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${F0}}${e?`${r}{${z0}}`:""}`}function am(){let t=[];if(nn.store.conversations!==!1&&(t.push(Yn([...bt(Vn,'a[href^="/c/"]'),...bt(Vn,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),nn.store.projects!==!1&&(t.push(Yn([...bt(Vn,'a[href*="/project"]'),...bt(Vn,'a[href*="/g/g-p-"]'),...bt(Vn,'[data-testid="project-name"]'),...bt(Vn,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),nn.store.headerTitle!==!1&&t.push(Yn(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),nn.store.accountAvatar!==!1&&t.push(Yn([...bt(Wn,"img"),...bt(Wn,'[class*="avatar"]'),...bt(Wn,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),nn.store.accountName!==!1&&t.push(Yn([...bt(Wn,".min-w-0 > .truncate"),...bt(Wn,".min-w-0.flex-1 .truncate")],!1)),nn.store.accountEmail!==!1&&t.push(Yn([...bt(Wn,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!t.length){E(ol);return}w(ol,t.join(`
`))}var sm=y({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[v.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:nn,start:am,onSettingsChange:am,stop(){E(ol)}});var lm=`.bloom-gc-panel {
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
}`;var G0=new S("GreetingCustomizer"),Xn="greetingCustomizer",cm="greetingCustomizerUi",eo=100,al=30,U0=120,K0=1e3,W0=50,V0=40,Y0=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),no=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),ea=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function X0(t){return!!t?.closest(Y0)}function fm(t){return!!(X0(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function co(t){try{for(let e of document.querySelectorAll(t))if(!fm(e))return e}catch{}return null}function il(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(co(e))return e;return t}var pm=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],W=L({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:my},greetings:{type:0,description:"Greeting texts",hidden:!0,default:pm},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),Gt=!1,Qn=!1,on=null,Ji,ro,Zn,oo,Qi=0,Zi=null,Jn=null,io=null,ao=null,so=null,ta=null;function ie(){let t=location.pathname||"/";return t==="/"||t===""}function rn(){let t=W.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):pm.slice()}function lo(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function um(t){W.store.greetings=t.slice(0,al)}function uo(){let t=String(W.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function Z0(){return W.store.order==="random"?"random":"sequential"}function J0(){return V(Number(W.store.intervalSec??10),1,3600)*1e3}function Q0(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function ty(){return!!co(ea)}function na(){return!!(co(ea)||co(no))}function ey(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=ty()?il(ea):co(no)?il(no):il(ea),i=e?`${no}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function ny(t,e){if(t<=0)return 0;if(t===1)return Number(W.plain.index)!==0&&(W.store.index=0),Number(W.plain.lastRandom)!==0&&(W.store.lastRandom=0),0;let n=Number(W.plain.index),r=Number(W.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(Z0()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return W.store.index=s,W.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return W.store.index=i,i}function oe(t){if(!Gt)return;if(!ie()){E(Xn);return}let e=rn().map(lo).filter(Boolean);if(!e.length){E(Xn);return}let n=ny(e.length,t),r=e[n]??e[0],o=uo()==="manual"&&e.length>1;w(Xn,ey(Q0(r),o)),ta?.()}function sl(){Ji!==void 0&&(clearInterval(Ji),Ji=void 0)}function ll(){sl(),!(!Gt||!ie())&&uo()==="interval"&&(rn().filter(Boolean).length<=1||(Ji=setInterval(()=>oe(!0),J0())))}function cl(){oo!==void 0&&(clearTimeout(oo),oo=void 0),Qi=0}function dm(){if(cl(),!Gt||!ie())return;Qi=V0;let t=()=>{if(oo=void 0,!(!Gt||!ie())){if(na()){uo()==="refresh"&&!Qn?(Qn=!0,oe(!0)):oe(!1),ll();return}Qi-=1,Qi>0&&(oo=setTimeout(t,W0))}};t()}function ul(){if(on===!0){na()?oe(!1):dm();return}on=!0,Qn=!1,uo()==="refresh"?(Qn=!0,oe(!0)):oe(!1),ll(),na()||dm()}function dl(){on=!1,Qn=!1,sl(),cl(),E(Xn)}function ra(){Zn===void 0&&(Zn=window.setTimeout(()=>{Zn=void 0,Gt&&(ie()?ul():on!==!1&&dl())},U0))}function ry(){Jn||(Jn=history.pushState.bind(history),io=history.replaceState.bind(history),ao=function(...e){let n=Jn(...e);return ra(),n},so=function(...e){let n=io(...e);return ra(),n},history.pushState=ao,history.replaceState=so)}function oy(){ao&&history.pushState===ao&&Jn&&(history.pushState=Jn),so&&history.replaceState===so&&io&&(history.replaceState=io),Jn=null,io=null,ao=null,so=null}function iy(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(ra)}function ay(t){if(!Gt||!ie()||uo()!=="manual"||rn().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(no);if(!n||fm(n))return;let r=window.getSelection?.();r&&String(r).trim()||oe(!0)}function sy(){ro===void 0&&(ro=setInterval(()=>{if(!Gt)return;let t=ie();if(t!==(on===!0)){t?ul():dl();return}t&&na()&&oe(!1)},K0))}function ly(){ro!==void 0&&(clearInterval(ro),ro=void 0)}function mm(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var cy="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",uy="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function dy(t,e){let n=lo(t);return n?n.length>eo?`Keep it to ${eo} characters.`:rn().length+(e?1:0)>al?`At most ${al} greetings.`:null:"Enter a greeting."}function my(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=rn(),s=Number(W.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=eo,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let m=l.querySelector(".bloom-gc-count");m&&(m.textContent=`${lo(e).length}/${eo}`);let T=l.querySelector(".bloom-gc-error");T&&(T.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${lo(e).length}/${eo}`;let f=document.createElement("span");f.className="bloom-gc-error",f.textContent=r;let h=document.createElement("div");if(h.className="bloom-gc-actions",n>=0){let m=document.createElement("button");m.type="button",m.className="bloom-gc-btn",m.textContent="Cancel",m.addEventListener("click",()=>{n=-1,e="",r="",i()}),h.appendChild(m)}let p=document.createElement("button");if(p.type="button",p.className="bloom-gc-btn bloom-gc-btn-primary",p.textContent=n>=0?"Update":"Add",p.addEventListener("click",()=>{let m=n<0,T=dy(e,m);if(T){r=T,i();return}let A=lo(e),I=rn().slice();n>=0&&n<I.length?I[n]=A:I.push(A),um(I),n=-1,e="",r="",i()}),h.appendChild(p),u.append(d,f,h),l.appendChild(u),t.appendChild(l),!a.length){let m=document.createElement("p");m.className="bloom-gc-empty",m.textContent="No greetings. The official heading stays.",t.appendChild(m);return}let g=document.createElement("div");g.className="bloom-gc-list",a.forEach((m,T)=>{let A=document.createElement("div");A.className="bloom-gc-item",T===s&&(A.dataset.active="true");let I=document.createElement("button");I.type="button",I.className=`bloom-gc-body${o===T?"":" bloom-gc-clamp"}`,I.textContent=m,I.addEventListener("click",()=>{o=o===T?-1:T,i()});let Wt=document.createElement("div");Wt.className="bloom-gc-item-actions";let kt=mm("Edit",cy);kt.addEventListener("click",()=>{n=T,e=m,r="",i()});let nt=mm("Delete",uy);nt.addEventListener("click",()=>{let R=rn().filter((at,Vt)=>Vt!==T);um(R),n===T?(n=-1,e=""):n>T&&(n-=1),i()}),Wt.append(kt,nt),A.append(I,Wt),g.appendChild(A)}),t.appendChild(g)};return ta=i,i(),()=>{ta===i&&(ta=null),t.replaceChildren()}}var gm=y({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:cm,settings:W,start(){Gt=!0,w(cm,lm),ry(),Zi=new AbortController;let{signal:t}=Zi;window.addEventListener("popstate",ra,{signal:t}),document.addEventListener("click",iy,{capture:!0,signal:t}),document.addEventListener("click",ay,{signal:t}),sy(),on=null,ie()?ul():dl(),G0.debug("started")},stop(){Gt=!1,Zi?.abort(),Zi=null,Zn!==void 0&&(clearTimeout(Zn),Zn=void 0),sl(),cl(),ly(),oy(),E(Xn),Qn=!1,on=null},onSettingsChange(){Gt&&(ie()?(oe(!1),ll()):E(Xn))}});function fy(t){let e=/^data:([^;,]+)?(;base64)?,(.*)$/s.exec(t);if(!e)return null;let n=e[1]||"application/octet-stream",r=!!e[2],o=e[3]||"";try{if(r){let i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return new Blob([a],{type:n})}return new Blob([decodeURIComponent(o)],{type:n})}catch{return null}}async function oa(t){try{return await createImageBitmap(t)}catch{return null}}async function py(t){try{let e=new Image;return e.decoding="async",await new Promise((n,r)=>{e.onload=()=>n(),e.onerror=()=>r(new Error("img")),e.src=t}),await createImageBitmap(e)}catch{return null}}async function ia(t){if(t.startsWith("data:")){let e=fy(t);if(e){let n=await oa(e);if(n)return n}return py(t)}try{let e=await fetch(t,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?oa(await e.blob()):null}catch{return null}}var sa="data-bloom-csi-slot",gy="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",by=/\bsize-(?:[6-9]|10)\b/,hy=/\b(?:h|w)-(?:[6-9]|10)\b/,yy=/^(plus|pro|free|team|go|business|enterprise)$/i,vy=['[class*="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-6"]','[class~="h-7"]','[class~="h-8"]','[class~="h-9"]','[class~="h-10"]','[class~="w-6"]','[class~="w-7"]','[class~="w-8"]','[class~="w-9"]','[class~="w-10"]'].join(",");function aa(t){return t.getAttribute("class")||""}function hm(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||by.test(t)?!0:hy.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function xy(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3&&!ym(e)}function ym(t){return yy.test(String(t??"").replace(/\s+/g,""))}function Ut(t){return!!t?.closest(gy)}function la(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function mo(t){let e=aa(t);return/\btext-xs\b/.test(e)||/text-token-text-secondary/.test(e)||/text-token-text-tertiary/.test(e)?!0:ym(t.textContent||"")}function ca(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function fo(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function Ey(t){return/\bflex\b/.test(t)&&!/\bflex-col\b/.test(t)}function vm(t){if(Ut(t)||ca(t)||fo(t)||mo(t)||la(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function xm(t){return Ut(t)||ca(t)||fo(t)||mo(t)||t.querySelector("img, svg, .min-w-0, .truncate")?!1:xy(t.textContent||"")}function Em(t){return Ut(t)||fo(t)||la(t)||mo(t)?!1:hm(aa(t))||xm(t)?!0:vm(t)}function bm(t){return!(Ut(t)||la(t)||fo(t)||mo(t)||ca(t))}function an(t,e){let n=ca(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(fo(n)||la(n)||mo(n));)Ut(n)||(r=n),n=n.parentElement;return r}function wy(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||Ut(e))continue;if(Ey(aa(e))){let r=[];for(let o of e.children)if(!(!(o instanceof HTMLElement)||!bm(o))){if(Em(o)||hm(aa(o)))return an(o,t)??o;r.push(o)}if(r.length===1)return an(r[0],t)??r[0]}let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&bm(r))return an(r,t)??r}}return null}function Sy(t){let e=t.querySelectorAll(vy);for(let n of e)if(Em(n))return an(n,t)??n;return null}function Ly(t){for(let e of t.querySelectorAll("span, div, p, i"))if(xm(e))return an(e,t)??e;return null}function Ty(t){for(let e of t.querySelectorAll("*"))if(vm(e))return an(e,t)??e;return null}function wm(t,e){if(Ut(t))return null;if(e&&!Ut(e)&&t.contains(e)){let n=an(e,t);if(n)return n}return wy(t)??Sy(t)??Ly(t)??Ty(t)}function Sm(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-8"]','[class~="w-8"]']}var tr="data-bloom-csi",ua="data-bloom-csi-orig",sn=new Set,Lm=null;function fl(t){Lm=t}function Tm(t){return`url(${JSON.stringify(t)})`}function da(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function pl(t,e,n){let r=Tm(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function km(t,e=sa){let n=Tm(t);return`[${e}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${e}] *,[${e}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${e}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`}function ky(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function er(t){t.removeEventListener("error",ml);let e=t.getAttribute(ua);t.removeAttribute(tr),t.removeAttribute(ua),e&&t.getAttribute("src")!==e&&(t.src=e)}function ml(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&sn.add(n),er(e),Lm?.()}function Cm(t,e){if(!e||sn.has(e)){er(t);return}ky(t);let n=t.getAttribute("src")??"";if(t.getAttribute(tr)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(ua)&&t.setAttribute(ua,n);t.setAttribute(tr,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",ml),t.addEventListener("error",ml),n!==e&&(t.src=e)}var Mm=`/*
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
`;var Am=new S("CustomSidebarIdentity"),Hm="customSidebarIdentityUi",Rm="customSidebarIdentity",My="bloom-csi-face",Ay="bloom-csi-name",nr=sa,Hy=1024,ma=256,Pm=24,Om=64,Bm=40,yl=1,vl=4,po=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],gl=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],x=L({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:Vy},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:Pm,max:Om,default:Bm},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function cn(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function Iy(){return String(x.store.displayName??"").trim()}function ga(t,e,n,r,o){let i=V(n,yl,vl),a=Math.min(t,e)/i,s=V(r,a/2,Math.max(a/2,t-a/2)),l=V(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}function Ny(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function xl(t){let e=Math.min(1,Hy/Math.max(t.width,t.height));return Ny(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function Ry(t,e,n,r){let{side:o,x:i,y:a}=ga(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=ma,s.height=ma;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,ma,ma);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function Py(t){let e=await oa(t);if(!e)return null;let n=xl(e);return e.close(),n}async function wl(t,e,n,r){let o=await ia(t);if(!o)return null;let i=Ry(o,e,n,r);return o.close(),i}function Sl(){x.store.cropX=.5,x.store.cropY=.5,x.store.cropZoom=1}function Im(){x.store.avatarUrl="",x.store.avatarSource="",Sl()}var Nm=0;async function El(t){let e=++Nm;Sl(),x.store.avatarSource=t;let n=await wl(t,.5,.5,1);return e!==Nm?!1:(n&&(x.store.avatarUrl=n),!!n)}function go(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function bl(t){let e=go(t);if(!e)return!1;let n=await Py(e);return n?El(n):!1}var ht=!1,rr=!1,or=0,ba=0,fa=null,Ae=new Map,ir=null,ae=null,ha=null,Kt=null,ya=null;function va(t){let e=String(t??"").trim();if(!e||sn.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:n}=new URL(e);if(n==="https:"||n==="http:")return e}catch{return null}return null}function Dm(){return va(x.store.avatarUrl)??va(x.store.avatarSource)}var pa=!1,hl=new Set;function $m(){let t=va(x.store.avatarSource);if(!t?.startsWith("data:image/")||va(x.store.avatarUrl)?.startsWith("data:image/")||pa||hl.has(t))return;pa=!0;let e=cn(x.store.cropX,.5),n=cn(x.store.cropY,.5),r=cn(x.store.cropZoom,1);wl(t,e,n,r).then(o=>{if(pa=!1,!o){hl.add(t);return}ht&&(x.store.avatarUrl=o,xa())}).catch(()=>{pa=!1,hl.add(t)})}function ln(t,e){return t.map(n=>`${n} ${e}`)}function Oy(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function By(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=Oy(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function _m(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||Ut(n)||n.closest(".min-w-0")||e.push(n);return e}function Dy(t){let e=_m(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function Ll(){let t=[],e=Ne();e&&t.push(e);let n=hn();if(n&&!t.some(r=>n.contains(r)||r.contains(n))){let r=n.querySelector(po.join(","))??n.querySelector("button, a, [role='button']")??n;r&&!t.includes(r)&&t.push(r)}return t}function qm(t,e){let n=Dy(t);if(n)Cm(n,e);else for(let o of _m(t))er(o);let r=wm(t,n);for(let o of t.querySelectorAll(`[${nr}]`))o!==r&&o.removeAttribute(nr);r&&r.setAttribute(nr,"")}function $y(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function _y(t,e){let n=$y(t);n&&qm(n,e)}function qy(){for(let t of document.querySelectorAll(`img[${tr}]`))er(t);for(let t of document.querySelectorAll(`[${nr}]`))t.removeAttribute(nr)}function Fy(){let t=V(Math.round(cn(x.store.avatarSize,Bm)),Pm,Om),e=Dm(),n=Iy(),r=x.store.applyToMenu!==!1,o=[],i=[...ln(po,"img"),"#stage-sidebar-tiny-bar img"];r&&i.push(...ln(gl,"> :first-child img"));let a=[...ln(po,".min-w-0 > .truncate"),...ln(po,".min-w-0.flex-1 .truncate")];r&&a.push(...ln(gl,"> :first-child .truncate"));let s=Sm(nr);o.push(da([...s.flatMap(l=>ln(po,l))].join(","),t)),o.push(da(s.map(l=>`#stage-sidebar-tiny-bar ${l}`).join(","),32)),r&&o.push(da(s.flatMap(l=>ln(gl,`> :first-child ${l}`)).join(","),t)),e&&(o.push(pl(i.join(","),e,t)),o.push(pl("#stage-sidebar-tiny-bar img",e,32)),o.push(km(e))),n&&o.push(By(a,n)),w(Rm,o.join(""))}function zy(){let t=Dm(),e=Ll();for(let n of e)qm(n,t);if(x.store.applyToMenu!==!1){let n=yn();n&&_y(n,t)}for(let n of document.querySelectorAll(`img[${tr}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||er(n)}function xa(){if(!(!ht||rr)){rr=!0;for(let t of Ae.values())t.disconnect();ae?.disconnect(),Kt?.disconnect();try{Fy(),zy()}finally{rr=!1,Tl(),Ky(),ir?.isConnected&&Fm(ir),$m()}}}function bo(){!ht||or||(or=requestAnimationFrame(()=>{or=0,xa()}))}function jy(){rr||!ht||bo()}function Gy(t){if(Ae.has(t))return;let e=new MutationObserver(jy);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),Ae.set(t,e)}function Uy(t){Ae.get(t)?.disconnect(),Ae.delete(t)}function Tl(){let t=new Set;for(let n of Ll())t.add(n),n.parentElement&&t.add(n.parentElement);let e=hn();e&&t.add(e);for(let n of[...Ae.keys()])(!t.has(n)||!n.isConnected)&&Uy(n);for(let n of t)n.isConnected&&Gy(n)}function Ky(){let t=Ro();if(!t){Kt?.disconnect(),Kt=null,ha=null;return}if(ha===t&&Kt){Kt.observe(t,{childList:!0});return}Kt?.disconnect(),ha=t,Kt=new MutationObserver(()=>{rr||!ht||(Tl(),bo())}),Kt.observe(t,{childList:!0})}function Fm(t){ir===t&&ae||(ae?.disconnect(),ir=t,ae=new MutationObserver(()=>{if(!t.isConnected){ae?.disconnect(),ae=null,ir=null;return}rr||!ht||bo()}),ae.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function zm(t){if(!ht||x.store.applyToMenu===!1)return;let e=yn();if(e){Fm(e),bo();return}t<=0||requestAnimationFrame(()=>zm(t-1))}function jm(t){ht&&(xa(),!(Ll().length||t<=0)&&(ba=requestAnimationFrame(()=>jm(t-1))))}function Wy(t){ht&&x.store.applyToMenu!==!1&&(!Po(t)&&!yn()||zm(10))}function Vy(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let d=document.createElement("p");d.className="bloom-csi-hint";let f=document.createElement("div");f.className="bloom-csi-crop";let h=document.createElement("div");h.className="bloom-csi-stage";let p=document.createElement("img");p.className="bloom-csi-stage-img",p.alt="",p.draggable=!1,h.appendChild(p);let g=document.createElement("div");g.className="bloom-csi-zoom-row";let m=document.createElement("input");m.type="range",m.className="bloom-csi-zoom",m.min=String(yl),m.max=String(vl),m.step="0.05",m.setAttribute("aria-label","Zoom");let T=document.createElement("span");T.className="bloom-csi-zoom-val";let A=document.createElement("button");A.type="button",A.className="bloom-csi-btn",A.textContent="Reset",g.append(m,T,A);let I=document.createElement("p");I.className="bloom-csi-hint",I.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",f.append(h,g,I),t.append(u,d,f);function Wt(){let b=String(x.store.avatarSource??""),C=String(x.store.avatarUrl??"");return b.startsWith("data:image/")?b:C.startsWith("data:image/")?C:""}function kt(b,C,H){if(!a)return i.x=b,i.y=C,i.zoom=V(H,yl,vl),i;let J=ga(a.w,a.h,H,b*a.w,C*a.h);return i.x=J.x/a.w,i.y=J.y/a.h,i.zoom=J.z,i}function nt(){m.value=String(i.zoom),T.textContent=`${Math.round(i.zoom*100)}%`;let b=a?ga(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;b&&a&&(p.style.width=`${a.w/b.side*100}%`,p.style.height=`${a.h/b.side*100}%`,p.style.left=`${(.5-b.x/b.side)*100}%`,p.style.top=`${(.5-b.y/b.side)*100}%`)}function R(b=!1){let C=Wt(),H=String(x.store.avatarUrl??"").trim(),J=!!C;s.hidden=!H&&!C,(C||H)&&(s.src=C||H),document.activeElement!==l&&(l.value=J?"":H),l.placeholder=J?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",f.hidden=!C,d.hidden=!(e&&/^https?:\/\//.test(H)&&!C),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",C&&(b&&(i.x=cn(x.store.cropX,.5),i.y=cn(x.store.cropY,.5),i.zoom=cn(x.store.cropZoom,1)),p.getAttribute("src")!==C&&(a=null,p.onload=()=>{a={w:p.naturalWidth,h:p.naturalHeight},kt(i.x,i.y,i.zoom),nt()},p.src=C),nt())}function at(b,C,H,J=!1){kt(b,C,H),nt();let Il=Wt(),Nl=()=>{x.store.cropX=i.x,x.store.cropY=i.y,x.store.cropZoom=i.zoom,Il&&wl(Il,i.x,i.y,i.zoom).then(Rl=>{Rl&&(x.store.avatarUrl=Rl)})};r&&clearTimeout(r),J?Nl():r=setTimeout(Nl,80)}function Vt(b){x.store.avatarUrl=b;let C=b.trim();if(n&&clearTimeout(n),!C){x.store.avatarSource="",Sl(),e=!1,R(!0);return}if(C.startsWith("data:image/")){e=!1,n=setTimeout(()=>{ia(C).then(H=>{if(!H)return;let J=xl(H);H.close(),J&&El(J).then(()=>R(!0))})},80);return}if(/^https?:\/\//.test(C)){e=!1,x.store.avatarSource="",n=setTimeout(()=>{ia(C).then(H=>{if(!H){e=!0,R(!0);return}let J=xl(H);H.close(),J?(e=!1,El(J).then(()=>R(!0))):(e=!0,R(!0))})},400);return}e=!1,x.store.avatarSource="",R(!0)}u.addEventListener("paste",b=>{go(b.clipboardData)&&(b.preventDefault(),e=!1,bl(b.clipboardData).then(()=>R(!0)))}),u.addEventListener("dragover",b=>{go(b.dataTransfer)&&b.preventDefault()}),u.addEventListener("drop",b=>{go(b.dataTransfer)&&(b.preventDefault(),e=!1,bl(b.dataTransfer).then(()=>R(!0)))}),l.addEventListener("change",()=>Vt(l.value)),l.addEventListener("paste",b=>{go(b.clipboardData)&&(b.preventDefault(),e=!1,bl(b.clipboardData).then(()=>R(!0)))}),l.addEventListener("keydown",b=>{Wt()&&!l.value&&(b.key==="Backspace"||b.key==="Delete")&&(Im(),e=!1,R(!0))}),c.addEventListener("click",()=>{Im(),e=!1,R(!0)}),h.addEventListener("pointerdown",b=>{b.button===0&&(h.setPointerCapture(b.pointerId),o.on=!0,o.px=b.clientX,o.py=b.clientY,o.x=i.x,o.y=i.y)}),h.addEventListener("pointermove",b=>{if(!o.on||!a)return;let C=h.clientWidth;if(!C)return;let{side:H}=ga(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);kt(o.x-(b.clientX-o.px)*(H/C)/a.w,o.y-(b.clientY-o.py)*(H/C)/a.h,i.zoom),nt()}),h.addEventListener("pointerup",()=>{o.on&&(o.on=!1,at(i.x,i.y,i.zoom,!0))}),h.addEventListener("pointercancel",()=>{o.on=!1}),h.addEventListener("wheel",b=>{b.preventDefault(),at(i.x,i.y,i.zoom*(b.deltaY<0?1.08:1/1.08))},{passive:!1}),m.addEventListener("input",()=>at(i.x,i.y,Number(m.value))),m.addEventListener("change",()=>at(i.x,i.y,Number(m.value),!0)),A.addEventListener("click",()=>at(.5,.5,1,!0));let Hl=()=>R(!1);return ya=Hl,R(!0),()=>{ya===Hl&&(ya=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var Gm=y({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Hm,cleanupSelectors:[`.${My}`,`.${Ay}`],settings:x,start(){ht=!0,sn.clear(),fl(bo),w(Hm,Mm),fa=new AbortController,document.addEventListener("click",Wy,{signal:fa.signal}),jm(40),$m(),Am.debug("started")},onSettingsChange(){sn.clear(),ya?.(),ht&&(Tl(),xa())},stop(){ht=!1,fa?.abort(),fa=null,or&&cancelAnimationFrame(or),or=0,ba&&cancelAnimationFrame(ba),ba=0;for(let t of Ae.values())t.disconnect();Ae.clear(),ae?.disconnect(),ae=null,ir=null,Kt?.disconnect(),Kt=null,ha=null,qy(),E(Rm),fl(null),sn.clear(),Am.debug("stopped")}});var ar=new S("Bloom"),Um=!1,Yy=Date.now(),Xy=[Hc,Eu,Hu,Ru,$u,ju,nd,od,sd,vd,kd,Rd,Od,Vd,im,sm,gm,Gm];function Ea(t){return new Promise(e=>setTimeout(e,t))}function Zy(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function Jy(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var Wm=8e3,Km=300,Qy=250;async function tv(){if(Ie())return await Ea(Km),!0;for(;Date.now()-Yy<Wm;)if(await Ea(Qy),Ie())return await Ea(Km),!0;return Ie()||Ma()}function kl(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function ev(){if(kl())return!0;let t=Date.now()+Wm;for(;Date.now()<t;)if(await Ea(100),kl())return!0;return kl()}function nv(){try{GM_registerMenuCommand?.("Bloom++ settings",Ac)}catch{}}function rv(){ko(()=>{lr("HostShell"),ar.info("host shell",st)}),Co(()=>{ar.info("idle ready",st)}),Mo(()=>{Sa(),lr("HostReady"),ar.info("chrome ready",st)})}async function Cl(){await jl()}async function Ml(){if(Um)return;Um=!0;for(let n of Xy)try{Jl(n),cc(n)}catch(r){ar.error("register failed",n.name,r)}ec(),lr("Init"),nv(),rv();let t=()=>lr("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await Zy(),Sa(),ar.info("styles ready",st),await Jy(),ev().then(n=>{n&&Ao()}),!await tv()){ar.warn("late islands not detected; starting default plugins",st),pn(),Ho();return}await sc()}var Vm=typeof unsafeWindow<"u"?unsafeWindow:window,ov=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||ov){let t=Vm.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",st);try{Object.defineProperty(Vm,"Bloom",{value:Al,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}Cl().then(()=>Ml()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
