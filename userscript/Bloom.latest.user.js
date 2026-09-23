// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260923] v1.4.74
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

/* Bloom++ [20260923] v1.4.74. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var gm=Object.defineProperty;var bm=(t,e)=>{for(var n in e)gm(t,n,{get:e[n],enumerable:!0})};var Zs={};bm(Zs,{REPO_URL:()=>Hl,Settings:()=>k,VERSION:()=>Q,contextKeyFromUrl:()=>Ft,conversationTitle:()=>sn,conversationToken:()=>et,currentConversationId:()=>I,hasDraftText:()=>ft,hasErrorToast:()=>pt,hasLateIslands:()=>ge,init:()=>Xs,initSettings:()=>Ys,isDocumentInteractive:()=>Rl,isStreaming:()=>D,isUserDraftEmpty:()=>ne,messageCreateTime:()=>Fo,plugins:()=>_t,requestChromeReady:()=>go,requestIdleReady:()=>Xe,requestShellReady:()=>po,setEditorText:()=>zt,subscribeHarvest:()=>nt,watchStreamingEdge:()=>V,whenChromeReady:()=>fo,whenIdleReady:()=>mo,whenShellReady:()=>uo});var Xt=new Map,eo=!1;function hm(){return document.getElementById("bloom-root")?.shadowRoot??null}function nl(){return document.head??null}function Ke(){let t=hm();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=ym()}function Vi(t,e){if(!eo)return;let n=nl();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),Ke();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,Ke();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,Ke()}function w(t,e){let n=Xt.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},Xt.set(t,n)),eo&&Vi(t,n)}function Yi(){if(!nl())return!1;eo=!0;for(let[e,n]of Xt)Vi(e,n);return Ke(),!0}function rl(t){let e=Xt.get(t);e&&(e.disabled=!1,eo&&Vi(t,e))}function ol(t){let e=Xt.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),Ke())}function x(t){let e=Xt.get(t);e&&(e.el?.remove(),Xt.delete(t),Ke())}function ym(){return Array.from(Xt.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var E=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function h(t){return t}var Xi=new Map;function We(t,e){let n=Xi.get(t);return n||(n=new Set,Xi.set(t,n)),n.add(e),()=>n.delete(e)}function pe(t,e){let n=Xi.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var vm="bloompp";function il(){return new Promise((t,e)=>{let n=indexedDB.open(vm,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function al(t){try{let e=await il();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function sl(t,e){try{let n=await il();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function Ve(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function G(t,e,n){return Math.min(n,Math.max(e,t))}function ll(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function cl(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function ul(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var no=new E("SettingsStore"),Zt="BloomSettings",xm=100;function ro(t){return t!=null&&typeof t.then=="function"}function wm(t){if(t==null||ro(t))return null;if(Ve(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(Ve(e)&&!ro(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return Ve(n)&&!ro(n)?n:null}return null}catch{return null}}function io(t){let e=wm(t);if(!e)return null;let n=e.plugins;return!Ve(n)||ro(n)||Object.keys(n).length===0?null:e}var oo=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let d=l.slice(c.length+1);if(d&&!d.includes(".")){let g=u(d);g!==void 0&&(i[a]=g,s=g);break}}}return Ve(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){no.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},xm))}save(){try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(Zt,this.plain)}catch{try{GM_setValue(Zt,e)}catch(n){no.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(Zt,e)}catch{}sl(Zt,e).catch(n=>no.warn("Failed to save settings to IndexedDB:",n))}catch(e){no.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){ll(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var Em=new E("Settings"),Sm={plugins:{}},k=new oo(structuredClone(Sm)),Tm=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function Lm(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function T(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?(k.store.plugins[n]||(k.store.plugins[n]={}),k.store.plugins[n]):{}},get plain(){let n=e.pluginName;return n?k.plain.plugins[n]??{}:{}}};return e}async function km(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function dl(){let t=io(await km(Zt));if(t||(t=io(await al(Zt))),!t)try{t=io(localStorage.getItem(Zt))}catch{t=null}if(!t)return;let e=t.plugins;e&&(k.plain.plugins=e,Em.debug("Loaded settings"))}function ml(t,e){e&&(e.pluginName=t,k.plain.plugins[t]||(k.plain.plugins[t]={}),k.setDefaultGetter(Tm(t),n=>{if(n!=="enabled")return Lm(e.def,n)}))}function fl(){return k.plain.plugins.Settings||(k.store.plugins.Settings={}),k.store.plugins.Settings}function ao(){return fl().pinnedPlugins??[]}function pl(t){return ao().includes(t)}function gl(t){let e=ao(),n=e.includes(t);return k.store.plugins.Settings={...k.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function so(){return fl().starredPlugins??[]}function bl(t){return so().includes(t)}function hl(t){let e=so(),n=e.includes(t);return k.store.plugins.Settings={...k.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var lo=new E("PluginManager"),_t={},Wn=new Set;function xl(t){if(_t[t.name]){lo.warn("Duplicate plugin",t.name);return}_t[t.name]=t,ml(t.name,t.settings)}function Ye(t){let e=_t[t];if(!e)return!1;if(e.required)return!0;let n=k.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function wl(t){let e=_t[t];if(!e||e.required)return;let n=!Ye(t);k.plain.plugins[t]||(k.store.plugins[t]={}),k.store.plugins[t].enabled=n,n?El(e):Cm(e),pe("pluginToggle",{name:t,enabled:n})}function El(t,e=!1){if(!Wn.has(t.name)&&Ye(t.name))try{t.managedStyle&&rl(t.managedStyle),t.start?.(),Wn.add(t.name),t.settings&&k.addPrefixChangeListener(`plugins.${t.name}.`,()=>{Wn.has(t.name)&&t.onSettingsChange?.()}),e||lo.debug("Started",t.name)}catch(n){lo.error("Failed to start",t.name,n)}}function Cm(t){if(Wn.has(t.name)){try{t.stop?.()}catch(e){lo.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(ol(t.managedStyle),x(t.managedStyle)),Wn.delete(t.name)}}function Vn(t){for(let e of Object.values(_t))(e.startAt??"DOMContentLoaded")===t&&El(e)}var yl=2,vl="defaultsRev";function Sl(){let t=k.plain.plugins.Settings;if(!(!t||t[vl]===yl)){for(let e of["NoShareLink","NoDictation"]){let n=k.plain.plugins[e];!n||typeof n.enabled=="boolean"||(n.enabled=!1)}t[vl]=yl}}var Yn=!1,co=!1,Zi=!1,Ll=[],kl=[],Cl=[];function Ji(t){let e=t.splice(0);for(let n of e)n()}function Xn(){Yn||(Yn=!0,Ji(Ll))}function Qi(){co||(co=!0,Yn||Xn(),Ji(kl))}function Ml(){Zi||(Zi=!0,Yn||Xn(),co||Qi(),Ji(Cl))}function uo(t){Yn?t():Ll.push(t)}function mo(t){co?t():kl.push(t)}function fo(t){Zi?t():Cl.push(t)}function po(){Xn()}function Xe(){Xn(),Qi()}function go(){Ml()}function Tl(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function Al(){await Tl(4e3),Xn(),await Tl(4e3),Qi(),Ml()}var y={p:"0-V-linuxdo"},Q="[20260923] v1.4.74",Hl="https://github.com/0-V-linuxdo/Bloom";var Mm={BetterNavigator:1789989042e3,ChatListStatus:1789915545e3,ChatStateFavicons:1789914627e3,Cleaner:1789910872e3,ComposerOpacity:1789910872e3,CustomSidebarIdentity:1789970413e3,GreetingCustomizer:1789861316e3,InputHistory:1789858186e3,MessageTimestamps:1789915545e3,NoDictation:1789910872e3,NoShareLink:1789910872e3,NoSidebarIdentity:1789910872e3,PromptQueue:1789915545e3,RecentTopics:1789861316e3,ResponseNotification:1789885188e3,Settings:1789973738e3,StreamerMode:1789924346e3,WiderChat:1789910872e3};function Nl(t){let e=Mm[t.name];typeof e=="number"&&e>0&&(t.updatedAt=e)}function Am(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Hm(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function ta(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function ge(){return ta()?Am()||Hm():!1}function Rl(){return ge()}var Nm=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Il=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Rm=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Im="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function Je(t){return t.id==="bloom-root"||!!t.closest(Im)}function Pl(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function bo(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function ea(t){if(!(t instanceof HTMLElement)||!t.isConnected||Je(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&bo(e)?!1:t.getClientRects().length>0}function Ze(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function Pm(){let t=[];for(let e of document.querySelectorAll(Nm))!(e instanceof HTMLElement)||!e.isConnected||Je(e)||t.push(e);return t}function ho(t){if(!t.isConnected||Je(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function be(){return Pm().filter(ho)[0]??null}function Qe(){let t=document.getElementById("stage-sidebar-tiny-bar");if(!(t instanceof HTMLElement)||!t.isConnected||Je(t))return null;let e=t.getBoundingClientRect();return e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3?null:t}function na(t){let e=t,n=t.parentElement;n&&n.children.length===1&&!Je(n)&&!Ze(n)&&n.parentElement&&!Ze(n.parentElement)&&(e=n);let r=e.parentElement;if(r&&!Ze(r)&&!Je(r)&&r.children.length>1){let o=r.getAttribute("class")||"";if(/\bflex\b/.test(o)&&!/flex-col/.test(o)&&r.parentElement&&!Ze(r.parentElement))return r}return e}function tn(){let t=document.querySelectorAll(Il);for(let n of t)if(ea(n)&&!bo(n)&&Pl(n))return n;let e=document.querySelectorAll(Rm);for(let n of e){if(!ea(n)||!Pl(n)||bo(n))continue;let r=n.querySelector(Il);return ea(r)&&!bo(r)?r:n}return null}function yo(){let t=be();if(t){let e=na(t),n=e.parentElement;if(n&&!Ze(n))return n;if(!Ze(e))return e}return Qe()}function vo(t){let e=be();return e?t.composedPath().includes(e):!1}var oa=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Om={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Bm(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Dm(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function ra(t){let e=Bm(t);return e?Dm(e)>.55?"light":"dark":null}function $m(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=ra(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=ra(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=ra(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function xo(t){return t==="auto"?$m():t}function _m(t){try{let e=getComputedStyle(document.documentElement);for(let n of oa){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function wo(t,e,n){let r=Om[e];if(n){_m(t);for(let o of oa)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of oa)t.style.setProperty(o,r[o])}function Ol(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var ia=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var zm="bloom-root",St="bloom-rail-item",ko="bloom-account-item",ye="bloom-sidebar-panel",ir="bloom-plugin-dialog",Io="bloom-plugin-layer",Co="bloom-settings-css",Fm=2e3,$l=null,jm=null,ee=!1,ca=[],Eo=null,Mo=null,Qt=null,To=null,qt=null,nr=null,Zn,en=0,rr=0,Jn=0,Qn=null,tr=null,Ao=null,_l=null,er=null,aa=[],Ho=!1,Gm=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Um=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Km=new Set(["chat","ui","privacy"]),Wm=10080*60*1e3,Po="",or="all",Et="all";function Oo(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function ql(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Vm(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'}function Ym(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function Xm(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function Zm(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var Jm={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function Qm(t){return t.icon||Jm[t.name]||Oo()}function sa(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),wo(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function zl(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function No(){let t="auto",e=xo(t);sa($l,e,!0);let n=document.getElementById(ye);n instanceof HTMLElement&&sa(n,e,!0);let r=document.getElementById(ir);r instanceof HTMLElement&&sa(r,e,!0);let o=document.getElementById(St);o instanceof HTMLElement&&zl(o),pe("schemeChange",{scheme:e,pref:t})}function Fl(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function jl(){if(w("settings",ia),document.getElementById(Co)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=Co,t.textContent=ia,document.head.appendChild(t)}function tf(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function ef(){for(let t of ca)t();ca=[]}function Gl(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function nf(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function ma(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function rf(t){return ma(t).length>0}function Lo(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function of(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=nf(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function af(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(of(e,n));let i=k.store.plugins[t]??(k.store.plugins[t]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",ca.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??Lo(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??Lo(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=Gl(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??Lo(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function Bl(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function sf(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=k.store.plugins[t.name]??(k.store.plugins[t.name]={});for(let[n,r]of ma(t)){if(n==="enabled"||r.type===5)continue;let o=Lo(r);o!==void 0&&(e[n]=o)}Kl(t)}function Ul(t){t.key==="Escape"&&(!document.getElementById(Io)&&!document.getElementById(ir)||(t.stopPropagation(),nn()))}function lf(){Ho||(document.addEventListener("keydown",Ul),Ho=!0)}function cf(){Ho&&(document.removeEventListener("keydown",Ul),Ho=!1)}function nn(){ef(),cf(),document.getElementById(Io)?.remove(),document.getElementById(ir)?.remove()}function Kl(t){if(nn(),!document.body)return;let e=document.createElement("div");e.id=Io,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",te),e.addEventListener("pointerup",te),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&nn()});let n=document.createElement("div");n.id=ir,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",te),n.addEventListener("pointerup",te),n.addEventListener("click",te);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=ql(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),nn()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=Bl("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=Bl("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=ma(t);if(c.length)for(let[u,d]of c){let g=af(t.name,u,d);g&&l.appendChild(g)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>sf(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),lf(),No()}function uf(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Qm(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=bl(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=Xm(l),c.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let m=hl(t.name);pe("pluginStar",{name:t.name,starred:m})}),s.appendChild(c),!t.required){let b=pl(t.name),m=document.createElement("button");m.type="button",m.className=`bloom-icon-btn bloom-card-pin${b?" bloom-card-pin-active":""}`,m.setAttribute("aria-label",b?"Unpin from top":"Pin to top"),m.innerHTML=Zm(b),m.addEventListener("click",L=>{L.preventDefault(),L.stopPropagation();let M=gl(t.name);pe("pluginPin",{name:t.name,pinned:M})}),s.appendChild(m)}if(rf(t)){let b=document.createElement("button");b.type="button",b.className="bloom-icon-btn bloom-card-settings",b.setAttribute("aria-label",`${t.name} settings`),b.innerHTML=Ym(),b.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation(),Kl(t)}),s.appendChild(b)}let u=Gl(t.name,Ye(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",b=>b.stopPropagation()),d?.addEventListener("change",()=>{wl(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let b=document.createElement("div");b.className="bloom-card-desc",b.textContent=t.description,n.appendChild(b)}let g=document.createElement("div");g.className="bloom-card-separator";let S=document.createElement("div");S.className="bloom-card-footer";let p=document.createElement("div");return p.className="bloom-card-author",p.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",S.appendChild(p),e.append(n,g,S),e}function Wl(){return Object.values(_t).filter(t=>!t.hidden&&t.name!=="Settings")}function df(t){return t.updatedAt!=null&&Date.now()-t.updatedAt<Wm}function Vl(t,e){if(e==="all"||e==="favorites")return!0;if(e==="recent")return df(t);let n=(t.tags??[]).map(r=>r==="sidebar"?"ui":r);return e==="other"?!t.required&&!n.some(r=>Km.has(r)):n.includes(e)}function mf(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function ff(){return Po.trim()?"No plugins match your search.":Et==="favorites"?"No favorites yet. Star a plugin to see it here.":Et==="recent"?"No plugins updated in the last 7 days.":"No plugins available."}function pf(){let t=Wl();return Um.filter(e=>e.id==="favorites"||e.id==="all"||e.id==="recent"?!0:t.some(n=>Vl(n,e.id)))}function gf(){if(er){er.replaceChildren();for(let t of pf()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${Et===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{Et=t.id,he()}),er.appendChild(e)}}}function bf(){let t=Wl();if(Et==="favorites"){let e=new Set(so());t=t.filter(n=>e.has(n.name))}else Et!=="all"&&(t=t.filter(e=>Vl(e,Et)));return or==="enabled"&&(t=t.filter(e=>Ye(e.name))),or==="disabled"&&(t=t.filter(e=>!Ye(e.name))),t}function he(){if(!Qn)return;gf();let t=bf();Ao&&(Ao.placeholder=`Search ${t.length} plugins...`);let e=t,n=Po.trim().toLowerCase();if(n&&(e=e.filter(r=>mf(r).includes(n))),Et==="recent")e=e.slice().sort((r,o)=>(o.updatedAt??0)-(r.updatedAt??0)||r.name.localeCompare(o.name));else if(Et!=="favorites"){let r=ao();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}Qn.replaceChildren();for(let r of e)Qn.appendChild(uf(r));tr&&(tr.hidden=e.length>0,tr.textContent=ff())}function te(t){t.stopPropagation()}function la(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function fa(){document.getElementById(St)?.setAttribute("aria-expanded",ee?"true":"false")}function hf(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function pa(){nn(),Po="",or="all",Et="all",document.getElementById(ye)?.remove(),ee=!1,fa()}function yf(t){let e=document.createElement("div");e.id=t,e.setAttribute("aria-labelledby","bloom-settings-title"),e.addEventListener("pointerdown",te),e.addEventListener("pointerup",te),e.addEventListener("click",te);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=Oo();let a=document.createElement("span");a.className="bloom-settings-title-row";let s=document.createElement("h2");s.id="bloom-settings-title",s.textContent="Bloom++";let l="Toggle features. Some need a reload. Click the sliders icon to configure.",c=document.createElement("button");c.type="button",c.className="bloom-info-hint",c.setAttribute("aria-label",l),c.innerHTML=Vm();let u=document.createElement("span");u.className="bloom-info-hint-tip",u.setAttribute("role","tooltip"),u.textContent=l,c.appendChild(u),a.append(s,c),o.append(i,a);let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn bloom-settings-close",d.setAttribute("aria-label","Close"),d.innerHTML=ql(),d.addEventListener("click",pa),r.appendChild(o),n.appendChild(r);let g=document.createElement("div");g.className="bloom-plugin-tabs",n.appendChild(g);let S=document.createElement("div");S.className="bloom-search-bar";let p=document.createElement("input");p.type="search",p.className="bloom-search-input",p.setAttribute("aria-label","Search plugins"),p.placeholder="Search plugins...",p.addEventListener("input",()=>{Po=p.value,he()});let b=document.createElement("select");b.className="bloom-search-filter",b.setAttribute("aria-label","Filter plugins");for(let M of Gm){let H=document.createElement("option");H.value=M.value,H.textContent=M.label,b.appendChild(H)}b.value=or,b.addEventListener("change",()=>{or=b.value,he()}),S.append(p,b),n.appendChild(S);let m=document.createElement("div");m.className="bloom-plugin-list",n.appendChild(m);let L=document.createElement("p");return L.className="bloom-tab-empty",L.hidden=!0,n.appendChild(L),e.append(d,n),Qn=m,tr=L,Ao=p,_l=b,er=g,he(),e}function vf(t){t.classList.add("bloom-rail-dock")}function xf(){let t=document.getElementById(St);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&ho(t)?t:null}function wf(){if(document.getElementById(ye)?.remove(),!document.body)return;let t=yf(ye);vf(t),document.body.appendChild(t),ee=!0,nn(),No(),fa(),pe("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:Q,dock:"center",rail:!!xf()})}function ga(){let t=document.getElementById(ye);if(t instanceof HTMLElement&&t.isConnected&&hf(t)){pa();return}t?.remove(),wf()}function Ef(){let t=document.createElement("button");return t.type="button",t.id=St,t.className="bloom-rail-item",t.setAttribute("aria-controls",ye),t.setAttribute("aria-expanded",ee?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${Oo()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),ga()}),t}function Dl(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function Sf(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function Tf(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function Jt(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function Yl(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=Sf(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&Jt(t,"padding-top",Math.round(i)),Number.isFinite(a)&&Jt(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));Jt(n,"width",l),Jt(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&Jt(t,"padding-left",u);let d=Tf(e,r);if(d){let g=d.getBoundingClientRect(),S=n.getBoundingClientRect(),p=Math.round(g.left-S.right);p>=0&&p<=24&&Jt(t,"gap",p)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&Jt(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&Jt(t,"gap",Math.round(l))}zl(t)}function ua(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function Lf(){if(nr?.isConnected&&qt){qt.observe(nr,{childList:!0});return}da()}function kf(t){if(ua(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function Cf(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){Jn=0;return}Jn+=1,rr=Date.now()+Math.min(8e3,250*2**Math.min(Jn,5))})}function Mf(){en||Date.now()<rr||(en=requestAnimationFrame(()=>{en=0,!(Date.now()<rr)&&(document.getElementById(St)?.isConnected||Ro())}))}function Ro(){if(!document.body)return;qt?.disconnect();let t=null,e=!1;try{let n=document.getElementById(St);t=n instanceof HTMLButtonElement?n:Ef();let r=be(),o=Qe();if(r){let i=na(r),a=i.parentElement;if(ua(i)||a&&ua(a))return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),Dl(t),Yl(t,r)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),Dl(t,!0)):t.isConnected&&!ho(t)&&(t.remove(),t=null)}finally{Cf(t,e),Lf(),fa()}}function da(){let t=yo();!t||!kf(t)||nr===t&&qt||(qt?.disconnect(),nr=t,qt=new MutationObserver(()=>{document.getElementById(St)?.isConnected||Mf()}),qt.observe(t,{childList:!0}))}function Af(){Ro(),da(),Zn===void 0&&(Zn=window.setInterval(()=>{let t=document.getElementById(St);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=rr&&Ro();else{Jn=0;let e=be();e&&Yl(t,e)}da()},Fm))}function Hf(){Zn!==void 0&&(clearInterval(Zn),Zn=void 0),en&&cancelAnimationFrame(en),en=0,rr=0,Jn=0,qt?.disconnect(),qt=null,nr=null}function Nf(t){To===t&&Qt||(Qt?.disconnect(),To=t,Qt=new MutationObserver(()=>{if(!t.isConnected){Qt?.disconnect(),Qt=null,To=null;return}Xl(t)}),Qt.observe(t,{childList:!0}))}function Xl(t){if(Nf(t),t.querySelector(`#${ko}`))return;let e=document.createElement("button");e.type="button",e.id=ko,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${Oo()}<span>Bloom++</span>`,e.addEventListener("pointerdown",la),e.addEventListener("pointerup",la),e.addEventListener("click",n=>{la(n),ga()}),t.insertBefore(e,t.firstChild)}function So(){let t=tn();return t?(Xl(t),!0):!1}function Rf(t){vo(t)&&(queueMicrotask(So),requestAnimationFrame(()=>{So()}),window.setTimeout(So,60),window.setTimeout(So,180))}function If(){Mo?.abort();let t=new AbortController;Mo=t,document.addEventListener("click",Rf,{signal:t.signal})}function Pf(){Mo?.abort(),Mo=null,Qt?.disconnect(),Qt=null,To=null}function Zl(){Xe(),tf(()=>{jl(),Fl(),Ro(),ga()})}var Jl=h({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[y.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${zm}`,`#${St}`,`#${ko}`,`#${ye}`,`#${Io}`,`#${ir}`,`#${Co}`,"#bloom-menu-panel"],start(){jl(),Fl(),Af(),If(),Eo?.(),Eo=Ol(No),No(),aa=[We("pluginToggle",()=>{ee&&he()}),We("pluginPin",()=>{ee&&he()}),We("pluginStar",()=>{ee&&he()})]},stop(){Hf(),Pf(),Eo?.(),Eo=null;for(let t of aa)t();aa=[],pa(),document.getElementById(St)?.remove(),document.getElementById(ko)?.remove(),document.getElementById(Co)?.remove(),$l=null,jm=null,Qn=null,tr=null,Ao=null,_l=null,er=null,ee=!1}});var Bo='form[data-type="unified-composer"], form.w-full[data-type]',Tt=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),rn=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Ql=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),tc=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Of=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Bf='[contenteditable="false"], button, [role="button"]';function dt(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function ve(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!dt(o)))return o;return null}function ec(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function P(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=ec(t);return!!(Of.test(n)||/^stop$/i.test(n))}function mt(){let e=Array.from(document.querySelectorAll(Bo)).find(dt);if(e instanceof HTMLElement)return e;let n=ve(document,Tt),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function U(){let t=Array.from(document.querySelectorAll(Tt));return t.find(dt)??t[0]??null}function Df(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(Bf);return!!n&&n!==e&&e.contains(n)}function ba(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&Df(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function ft(t){let e=t??U();return e?ba(e,e).replaceAll("\u200B","").trim().length>0:!1}function ne(t){return!ft(t)}function Do(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function nc(t){let e=mt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!dt(n))&&t(n))return n;return null}function re(){let t=mt(),e=ve(t,rn)??ve(document,rn);return e&&!P(e)?e:nc(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!P(n);let o=ec(n);return/^(send|send prompt|发送)$/i.test(o)&&!P(n)})}function xe(){let t=mt(),e=ve(t,Ql,!0)??ve(document,Ql,!0);if(e)return e;let n=ve(t,tc)??ve(document,tc);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&dt(r)&&P(r))return r}return nc(P)}function tt(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>ba(n,t)).join(`
`):ba(t,t)}function ha(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function zt(t,e,n=!1){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),ha(t,n)}var rc=/\/c\/([a-zA-Z0-9_-]{8,})/i;function et(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function Ft(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function on(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(rc)?.[1]??""}catch{return t.match(rc)?.[1]??""}}function I(){let t=on(location.pathname);if(t)return t;let n=et().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return""}var sc=new E("Harvest"),$f=1500,_f=200,$o=new Set,_o=new Map,qo=new Map,an=null,zo=null,ar=null,Lt=0;function qf(){return typeof unsafeWindow<"u"?unsafeWindow:window}function zf(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function Ff(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}function lc(t){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(t)}var jf=/"action"\s*:\s*"(next|continue|variant)"/i;function Gf(t,e,n){return!(e!=="POST"||lc(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!jf.test(n))}function Uf(t,e){return e!=="GET"||lc(t)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(t)}function oc(t){return t.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function cc(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function Kf(t){return typeof t=="string"?cc(t):""}function ya(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return ya(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function uc(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function ic(t,e,n){!t||!e||qo.get(t)!==e&&(qo.set(t,e),uc(qo,$f),oe({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function Wf(t,e){let n=e.trim();!t||!n||_o.get(t)!==n&&(_o.set(t,n),uc(_o,_f),oe({type:"conversation-meta",conversationId:t,title:n}))}function sr(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)sr(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&Wf(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=ya(l.create_time??l.createTime??l.created_at);c&&u&&ic(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=ya(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&ic(a,s,o),r.mapping&&typeof r.mapping=="object")sr(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&sr(l,o,n+1)}function ac(t,e){if(t)try{sr(JSON.parse(t),e)}catch{}}function oe(t){for(let e of Array.from($o))try{e(t)}catch{}}async function Vf(t,e,n){if(n===Lt)try{let r=await t.json();if(n!==Lt)return;sr(r,e)}catch{}}async function Yf(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===Lt&&oe({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===Lt;){let{done:u,value:d}=await s.read();if(u)break;if(c+=l.decode(d,{stream:!0}),!o){let S=cc(c);S&&(o=S,oe({type:"post-start",conversationId:o,url:""}))}let g=c.split(`
`);c=g.pop()??"";for(let S of g){let p=S.replace(/^data:\s*/,"").trim();!p||p==="[DONE]"||ac(p,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===Lt&&ac(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===Lt&&oe({type:"post-end",conversationId:o,error:i})}function Xf(t,e,n){let r=zf(e),o=Ff(e,n),i=Uf(r,o),a=Gf(r,o,n?.body),s=Lt,l="";return a&&(l=Kf(n?.body)||oc(r)||on(r)||I(),oe({type:"post-start",conversationId:l,url:r})),t(e,n).then(c=>{if(s!==Lt||!i&&!a)return c;try{let u=c.clone();i?Vf(u,oc(r)||I(),s):Yf(u,l,!c.ok,s)}catch{a&&oe({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===Lt&&oe({type:"post-end",conversationId:l,error:!0}),c})}function Zf(){if(an)return;let t=qf();ar=t,an=t.fetch.bind(t);let e=(n,r)=>Xf(an,n,r);zo=e,t.fetch=e,sc.debug("conversation fetch harvest hooked")}function Jf(){Lt+=1,!(!an||!ar)&&(zo&&ar.fetch===zo&&(ar.fetch=an),an=null,zo=null,ar=null,sc.debug("conversation fetch harvest unhooked"))}function nt(t){return $o.add(t),Zf(),()=>{$o.delete(t),$o.size===0&&Jf()}}function sn(t){return t?_o.get(t)??"":""}function Fo(t){return t?qo.get(t)??null:null}var fc=new E("Streaming");function pr(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!dt(e))&&(P(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function Qf(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&dt(t))}function tp(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&dt(t))}function ep(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function pt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function D(){if(xe()||pr()||ep())return!0;let t=re();return t&&dt(t)&&!P(t)?!1:!!(Qf()||tp())}var np=400,dc=3,Se=new Set,cr,ur=null,va=null,Ee=!1,we=0,ie="",kt="",dr=!1,mr=!1,fr=!1;function pc(){return Ft(et())}function mc(t,e){return{streaming:t,contextKey:e,conversationId:I()}}function X(t,e){if(!t||t===e)return!1;if(t.endsWith("|draft")&&!e.endsWith("|draft"))return!0;try{let n=t.split("|")[0],r=e.split("|")[0],o=new URL(n).pathname.replace(/\/$/,"")||"/",i=new URL(r).pathname.replace(/\/$/,"")||"/";if((o==="/"||o==="")&&i.startsWith("/c/"))return!0}catch{}return!1}function xa(){Ee=!1,we=0,ie="",dr=!1,mr=!1,fr=!1}function rp(t){for(let e of Array.from(Se))try{e.onFall?.(t)}catch{}}function op(t){for(let e of Array.from(Se))try{e.onRise?.(t)}catch{}}function lr(t){for(let e of Array.from(Se))try{e.onTick?.(t)}catch{}}function ip(t,e){for(let n of Array.from(Se))try{n.onContext?.(t,e)}catch{}}function ap(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&P(n)&&(dr=!0)}function sp(t){t.type==="post-end"&&Ee&&(fr=!0,t.error&&(mr=!0))}function lp(){let t=pc(),e=D();if(kt&&t&&kt!==t){if(ip(t,kt),!X(kt,t)){xa(),kt=t,lr(mc(e,t));return}ie===kt&&(ie=t)}kt=t;let n=mc(e,t);if(e){let i=!Ee;i&&(dr=!1,mr=!1,fr=!1),Ee=!0,we=0,ie=t,i&&op(n),lr(n);return}if(!Ee){lr(n);return}if(we+=1,fr&&(we=Math.max(we,dc)),we<dc){lr(n);return}let r=!!ie&&ie===t,o={contextKey:ie||t,conversationId:I(),userStopped:dr,error:mr||pt()};xa(),r&&rp(o),lr(n)}function cp(){cr===void 0&&(Ee=D(),kt=pc(),ie=Ee?kt:"",we=0,dr=!1,mr=!1,fr=!1,ur?.abort(),ur=new AbortController,document.addEventListener("click",ap,{capture:!0,signal:ur.signal}),va=nt(sp),cr=setInterval(lp,np),fc.debug("watchStreamingEdge started"))}function up(){Se.size||(cr!==void 0&&(clearInterval(cr),cr=void 0),ur?.abort(),ur=null,va?.(),va=null,xa(),kt="",fc.debug("watchStreamingEdge stopped"))}function V(t){let e=typeof t=="function"?{onFall:t}:t;return Se.add(e),cp(),()=>{Se.delete(e),up()}}var gc="bloom-host-icon",gr="data-bloom-host-rel",wa="not all",Ea=0,bc=0,dp=400;function hc(t){Ea+=1;try{t()}finally{Ea-=1}}function jo(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function ae(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function yc(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function mp(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function fp(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-bc<dp||(bc=n,t.appendChild(e))}function pp(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||jo(n)&&(n.getAttribute(gr)||n.setAttribute(gr,n.rel),n.media!==wa&&(n.media=wa),n.rel!==gc&&(n.rel=gc))}function gp(t){for(let e of t.querySelectorAll(`link[${gr}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(gr);n&&(e.rel=n),e.removeAttribute(gr),e.media===wa&&e.removeAttribute("media")}}function vc(t,e){let{head:n}=document;!n||!e||hc(()=>{pp(n,t);let r=yc(t),{type:o,sizes:i}=mp(e);r?fp(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function xc(t,e){let{head:n}=document;n&&hc(()=>{yc(t)?.remove(),gp(n)})}function wc(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(Ea)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:jo(c.target)&&(a=!0,ae(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)jo(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)jo(u)&&u.id!==t&&(a=!0,ae(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var bp=["original","badge","dot","hole","bg"],Tc=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],Lc={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Go="#FCFCFC",hp="#111111",Ec="#111111",yp="#ffffff",vp="#212121",xp="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",wp={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Uo=32,Sc=64;function kc(t){return typeof t=="string"&&bp.includes(t)}function Ep(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function Ko(t){let e=document.createElement("canvas");e.width=Uo,e.height=Uo;let n=e.getContext("2d");return n?(n.scale(Uo/Sc,Uo/Sc),t(n),e.toDataURL("image/png")):""}function Sp(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function Wo(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(xp);n&&(t.strokeStyle=hp,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function Tp(t,e,n){let r=Lc[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=Ec,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=Ec,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=yp,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function br(t,e){if(t==="original")return e==="wait"?Ko(r=>Wo(r,Go)):Ep(wp[e]);let n=e==="wait"?void 0:Lc[e];return Ko(t==="hole"?r=>Wo(r,n??Go):t==="bg"?r=>{r.fillStyle=n??vp,Sp(r,0,0,64,64,14),r.fill(),Wo(r,Go,!1)}:r=>{Wo(r,Go),e!=="wait"&&Tp(r,e,t==="dot"?"dot":"badge")})}function Cc(t){return{wait:br(t,"wait"),rotate:br(t,"rotate"),done:br(t,"done"),ready:br(t,"ready"),error:br(t,"error")}}var Lp=new E("ChatStateFavicons"),ke="bloom-chat-state-favicon",Ic=["input","beforeinput","cut","paste","compositionend"],Pc=T({style:{type:3,description:"Favicon overlay",options:Tc}}),Mt="",Ta={wait:"",rotate:"",done:"",ready:"",error:""},hr="wait",Te=!1,Ct=!1,K=null,rt="",ot="",Ce=!0,ln=null,it=0,Vo=null,Yo=null,Le=null,Sa=null,cn=null,bt=!1,Mc=new WeakSet;function kp(){let t=Pc.store.style;return kc(t)?t:"bg"}function Oc(){let e=document.querySelector(`link[rel~="icon"]:not(#${ke}), link[data-bloom-host-rel]:not(#${ke})`)?.href;return ae(e)?e:ae(Mt)?Mt:""}function Cp(){let t=document.getElementById(ke);return t instanceof HTMLLinkElement?t:null}function Mp(){if(!ae(Mt)){let t=Oc();t&&(Mt=t)}return ae(Mt)?Mt:Ta.wait}function Bc(t){return t==="wait"?Mp():Ta[t]}function Dc(){vc(ke,Bc(hr))}function gt(t){let e=Bc(t);if(hr===t){let n=Cp();if(n&&n.getAttribute("href")===e)return}hr=t,Dc()}function Ac(){Ta=Cc(kp()),gt(hr)}function $c(){return Ft(et())}function La(t,e){!t||!e||t===e||(K===t&&(K=e),rt===t&&(rt=e),ot===t&&(ot=e))}function Ap(){let t=$c();return D()||Te||Ct?(rt&&t&&rt!==t&&X(rt,t)?(La(rt,t),rt=t):!rt&&t&&(rt=t),rt||t):(rt="",t)}function Hc(t){return!K||!t||K===t?!0:X(K,t)}function _c(){Te=!1,Ct=!1,K=null,rt=""}function qc(t){ot=t,_c(),Ce=!1,gt("wait")}function Nc(t){return!t&&Ce}function Hp(){if(!bt)return;let t=$c();if(ot&&t&&ot!==t&&!X(ot,t)){qc(t);return}ot&&t&&X(ot,t)&&La(ot,t),t&&(ot=t);let e=Ap(),n=D(),r=ne();if(pt()&&!n){gt("error"),Te=!1,Ct=!1,K=null;return}if(n){Te||(Ce=!1),Te=!0,Ct=!1,K=e,gt("rotate");return}if(Te){let o=Hc(e);if(Te=!1,o){Ct=!0,K=e,gt("done");return}Ct=!1,K=null}if(Ct)if(K&&e&&!Hc(e))Ct=!1,K=null;else if(r){K=e||K,gt("done");return}else if(Nc(r)){Ct=!1,gt("ready");return}else{Ct=!1,gt("wait");return}K=null,r?gt("wait"):Nc(r)?gt("ready"):gt("wait")}function se(){bt&&(Uc(),Fc(),jc(),Hp())}function zc(){if(cn){for(let t of Ic)cn.removeEventListener(t,Gc,!0);cn=null}}function Fc(){let t=mt(),e=t&&t!==document.body?t:null;if(!(cn===e&&e?.isConnected)&&(zc(),!!e)){cn=e;for(let n of Ic)cn.addEventListener(n,Gc,{capture:!0,passive:!0})}}function jc(){let t=mt();if(!(Le&&Sa===t&&t.isConnected)){if(Le?.disconnect(),Sa=t,!t||t===document.body){Le=null;return}Le=new MutationObserver(()=>Xo()),Le.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function Xo(){if(bt){if(document.hidden){it&&(cancelAnimationFrame(it),it=0),se();return}it||(it=requestAnimationFrame(()=>{it=0,bt&&se()}))}}function Gc(){ft()&&(Ce=!0),Xo()}function Rc(){ft()&&(Ce=!0),Xo()}function Np(){bt&&(it&&(cancelAnimationFrame(it),it=0),se())}function Rp(){bt&&(Ce=!1,se())}function Ip(){bt&&se()}function Pp(){bt&&se()}function Op(t,e){if(bt){if(X(e,t)){La(e,t),ot=t,se();return}qc(t)}}function Uc(){let t=U();!t||Mc.has(t)||(Mc.add(t),t.addEventListener("input",Rc,{capture:!0,passive:!0}),t.addEventListener("compositionend",Rc,{capture:!0,passive:!0}))}var Kc=h({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[y.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Pc,startAt:"DOMContentLoaded",cleanupSelectors:[`#${ke}`],start(){bt=!0,Mt=Oc()||Mt,Ac(),Yo?.disconnect(),Yo=wc(ke,t=>{ae(t)&&(Mt=t),Dc()}),ln?.abort(),ln=new AbortController,window.addEventListener("popstate",Xo,{signal:ln.signal}),document.addEventListener("visibilitychange",Np,{signal:ln.signal}),Uc(),Fc(),jc(),Vo?.(),Vo=V({onRise:Rp,onFall:Ip,onTick:Pp,onContext:Op}),se(),Lp.debug("favicon watch started")},stop(){bt=!1,it&&cancelAnimationFrame(it),it=0,Vo?.(),Vo=null,ln?.abort(),ln=null,zc(),Le?.disconnect(),Le=null,Sa=null,Yo?.disconnect(),Yo=null,_c(),ot="",Ce=!0,hr="wait",xc(ke,Mt)},onSettingsChange:Ac});var Wc=`.bloom-ih-hud {
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
`;var yv=new E("InputHistory"),ka=/\u200B/g,Vc=10,Yc=500,Xc=100,Dp=8,$p=120,_p=2e3,Zo=10,Jo=T({maxEntries:{type:4,description:"Max stored prompts",min:Vc,max:Yc,default:Xc},history:{type:5,description:"Stored prompts",render:tg},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Ca=new Map,$=0,Ma="",At=!1,vr=!1,Na=0,yr=null,Aa,Ra=null,Zc=!0;function ht(){let t=Jo.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Jc(t){let e=G(Number(Jo.store.maxEntries??Xc),Vc,Yc);return t.length>e?t.slice(t.length-e):t}function Qo(t){Jo.store.entries=Jc(t)}function qp(t){return t.replaceAll(ka,"").replace(/\n$/,"").trim()}function Ha(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Tt);return n instanceof HTMLElement?n:U()}function zp(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!tt(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(ka,"").trim().length===0,last:i.toString().replaceAll(ka,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Qc(t){clearTimeout(Aa),Aa=setTimeout(()=>{if(t!==Na)return;vr=!1;let e=Ra;e&&ha(e,Zc)},$p)}function tu(t,e,n){vr=!0,Ra=t,Zc=n;let r=++Na;zt(t,e,n),Qc(r)}function Fp(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function un(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function jp(){document.querySelector(".bloom-ih-hud")?.remove()}function Gp(t,e){let n=Fp();n.textContent=t;let r=(e.closest("form")??mt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-Dp)}px`,n.classList.add("bloom-ih-hud-on")}function Ia(t){let e=qp(t);if(!e)return;let n=Date.now(),r=Ca.get(e);if(r&&n-r<_p)return;Ca.set(e,n);let o=ht().filter(i=>i!==e);o.push(e),Qo(o),$=ht().length,At=!1,un()}function Up(t,e){let n=ht();if(!n.length&&t)return;$>=n.length&&(Ma=tt(e),$=n.length);let r=t?$-1:$+1;r<0||r>n.length||($=r,At=!0,tu(e,r===n.length?Ma:n[r],t),r<n.length?Gp(`${r+1} / ${n.length}`,e):un())}function Kp(t){At=!1,un(),tu(t,Ma,!1),$=ht().length}function Wp(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=Ha(t.target)??Ha(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&At&&!t.altKey&&!t.shiftKey){Kp(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){Ia(tt(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=ht();if(!r){let i=zp(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||$<=0)||!n&&$>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),Up(n,e))}function Vp(t){if(Ha(t.target)){if(vr){Qc(Na);return}At&&(At=!1,un(),$=ht().length)}}function Yp(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(Tt);n instanceof HTMLElement&&Ia(tt(n))}function Xp(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(rn);if(!n||!(n instanceof HTMLElement)||P(n))return;let r=U();r&&Ia(tt(r))}function Zp(t){if(!(!At||vr)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}At=!1,un()}}function Jp(){if(yr)return;yr=new AbortController;let{signal:t}=yr,e={capture:!0,signal:t};window.addEventListener("keydown",Wp,e),window.addEventListener("input",Vp,e),window.addEventListener("submit",Yp,e),window.addEventListener("click",Xp,e),window.addEventListener("pointerdown",Zp,e)}function Qp(t){let e=ht().slice();e.splice(t,1),Qo(e),$>e.length&&($=e.length)}function tg(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=ht().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(m=>m.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/Zo));n>=l&&(n=l-1);let c=s.slice(n*Zo,n*Zo+Zo);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let m=document.createElement("div");m.className="bloom-ih-list",c.forEach((L,M)=>{let H=i.indexOf(L),Dt=ht().length-1-H,wt=document.createElement("div");wt.className="bloom-ih-item";let Y=document.createElement("button");Y.type="button",Y.className=`bloom-ih-body${r===M?"":" bloom-ih-clamp"}`,Y.textContent=L,Y.addEventListener("click",()=>{r=r===M?-1:M,o()});let N=document.createElement("div");N.className="bloom-ih-actions";let J=document.createElement("button");J.type="button",J.title="Copy",J.textContent="C",J.addEventListener("click",()=>{cl(L)});let $t=document.createElement("button");$t.type="button",$t.title="Delete",$t.textContent="\xD7",$t.addEventListener("click",()=>{Qp(Dt),o()}),N.append(J,$t),wt.append(Y,N),m.appendChild(wt)}),t.appendChild(m)}else{let m=document.createElement("p");m.className="bloom-ih-empty",m.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(m)}let d=document.createElement("div");d.className="bloom-ih-pager";let g=document.createElement("button");g.type="button",g.className="bloom-ih-btn",g.textContent="Prev",g.disabled=n<=0,g.addEventListener("click",()=>{n-=1,o()});let S=document.createElement("span");S.textContent=`${n+1} / ${l}`;let p=document.createElement("button");p.type="button",p.className="bloom-ih-btn",p.textContent="Next",p.disabled=n+1>=l,p.addEventListener("click",()=>{n+=1,o()});let b=document.createElement("button");b.type="button",b.className="bloom-ih-clear",b.textContent="Clear all",b.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Qo([]),$=0,o())}),d.append(g,S,p,b),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var eu=h({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[y.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:Jo,startAt:"HostReady",managedStyle:"inputHistory",start(){w("inputHistory",Wc),$=ht().length,At=!1,Jp()},stop(){yr?.abort(),yr=null,un(),jp(),Ca.clear(),clearTimeout(Aa),vr=!1,Ra=null,At=!1},onSettingsChange(){let t=ht(),e=Jc(t);e.length!==t.length&&Qo(e),$>e.length&&($=e.length)}});var Pa="noShareLink",eg=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],ng=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],Oa=T({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function nu(t){return`${t.join(",")}{display:none!important}`}function ru(){let t=[];if(Oa.store.hideShareChat!==!1&&t.push(nu(eg)),Oa.store.hideShareProject!==!1&&t.push(nu(ng)),!t.length){x(Pa);return}w(Pa,t.join(`
`))}var ou=h({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[y.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Oa,start:ru,onSettingsChange:ru,stop(){x(Pa)}});var su="noDictation",rg=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],og=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],lu=T({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function iu(t){return`${t.join(",")}{display:none!important}`}function au(){let t=[iu(rg)];lu.store.hideDictationSettings!==!1&&t.push(iu(og)),w(su,t.join(`
`))}var cu=h({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[y.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:lu,start:au,onSettingsChange:au,stop(){x(su)}});var Ba="noSidebarIdentity",dn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],mu=dn.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),fu=dn.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),ig=[...mu,...fu],ag=[...mu,...dn.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],sg=dn.map(t=>`${t} a[href^="mailto:"]`),lg=dn.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),cg=dn.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),xr=T({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function uu(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function ug(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function dg(){return`${cg.join(",")}{margin-block:auto!important}`}function mg(){return`${lg.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function du(){let t=xr.store.hideUsername!==!1,e=xr.store.hideEmail!==!1,n=t&&xr.store.enlargePlan!==!1,r=t&&xr.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(ug([...ag,...fu])),o.push(dg())):o.push(uu(ig))),e&&o.push(uu(sg)),n&&o.push(mg()),!o.length){x(Ba);return}w(Ba,o.join(`
`))}var pu=h({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[y.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:xr,start:du,onSettingsChange:du,stop(){x(Ba)}});var gu=`#bloom-rt-host {
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
`;var yu=new E("RecentTopics"),pn="bloom-rt-host",vu="home",xu=/^\/c\/([a-z0-9_-]{8,})/i,pg=/\/c\/([a-z0-9_-]{8,})/i,wu=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,gg=new Set(["Backquote","IntlBackslash"]),bg=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),hg=140,yg=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),_=T({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:yg},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),ti=null,ei=null,Z=!1,kr=!1,wr=!1,Ht=0,Me="",mn=null,Er=null,fn,Da=null,$a=null;function vg(){let t=Number(_.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function Sr(){let t=_.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function qa(){let t=_.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Eu(){let t=_.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function za(){let t=_.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function ri(t){let e=vg();return t.length>e?t.slice(0,e):t}function Nt(t){return t===vu}function Tr(t,e=hg){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function Fa(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(xu)?.[1]??""}catch{return t.match(pg)?.[1]??""}}function Ae(){let t=(location.pathname||"/").match(xu);if(t?.[1])return t[1];let n=et().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return vu}function ja(t){if(Nt(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(Fa(r.getAttribute("href")||"")!==t)continue;let o=Tr(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return Ae()===t&&e&&!/^ChatGPT$/i.test(e)?Tr(e,80):""}function xg(t){if(Nt(t))return"New chat";let e=qa()[t];if(e)return e;let n=sn(t);return n||ja(t)||"Chat"}function wg(t){return za()[t]||""}function Eg(t){return Eu()[t]||{}}function Ga(t,e){if(!t||Nt(t)||!e||/^new chat$/i.test(e.trim()))return;let n=qa();n[t]!==e&&(n[t]=e,_.store.titles=n)}function Sg(t){t.type==="conversation-meta"&&(Ga(t.conversationId,t.title),Z&&gn())}function Tg(t,e){if(!t||Nt(t)||!e)return;let n=za();n[t]!==e&&(n[t]=e,_.store.projects=n)}function Lg(t,e){if(!t||Nt(t)||!e.user&&!e.assistant)return;let n=Eu(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,_.store.previews=n)}function Ua(t){if(!t||Nt(t)&&_.store.includeHome===!1)return;let e=Sr().filter(n=>n!==t);e.unshift(t),_.store.visits=ri(e)}function oi(){let t=_.store.includeHome!==!1;return ri(Sr().filter(n=>t||!Nt(n))).map(n=>({id:n,title:xg(n),project:wg(n),preview:Eg(n)}))}function bu(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return Tr(o)}catch{return""}}function Lr(t){if(!t||Nt(t)||t!==Ae())return;let e=ja(t);e&&Ga(t,e);let n=bu("user"),r=bu("assistant");Lg(t,{user:n,assistant:r});let o=Tu(t);if(o){let i=Su(o);i&&Tg(t,i)}}function Ka(){let t=qa(),e=za(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${pn}, #bloom-root, #bloom-sidebar-panel`))continue;let u=Fa(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=Tr(c.textContent||"",80);d&&!wu.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let g=Su(c);g&&e[u]!==g&&(e[u]=g,i=!0)}}catch{}o&&(_.store.titles=t),i&&(_.store.projects=e);let a=Sr(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(_.store.visits=ri([...a,...l]))}function Su(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=Tr((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!wu.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function Tu(t){if(Nt(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(Fa(e.getAttribute("href")||"")===t)return e}catch{}return null}function kg(t){let e=Tu(t);if(e){e.click();return}if(Nt(t)){location.assign("/");return}location.assign(`/c/${t}`)}function Cg(){let t=Ae();Me&&Me!==t&&Lr(Me),Me=t,Ua(t),Ka();let e=ja(t);e&&Ga(t,e),Lr(t)}function ni(){fn===void 0&&(fn=window.setTimeout(()=>{fn=void 0,Cg()},120))}function Mg(){mn||(mn=history.pushState.bind(history),Er=history.replaceState.bind(history),history.pushState=function(...e){let n=mn(...e);return ni(),n},history.replaceState=function(...e){let n=Er(...e);return ni(),n})}function Ag(){mn&&(history.pushState=mn),Er&&(history.replaceState=Er),mn=null,Er=null}function Hg(t){return gg.has(t.code)||t.keyCode===192?!0:bg.has(t.key)}function Lu(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function Ng(t,e){kr=e,Ka(),Lr(Ae()),Z=!0,Ht=0;try{let n=Ae();Ua(n);let r=oi();r.length>1&&(Ht=t?r.length-1:1)}catch(n){yu.error("Failed to open switcher:",n)}gn()}function hu(t){let{length:e}=oi();e&&(Ht=(Ht+(t?-1:1)+e)%e,gn())}function Wa(){if(!Z)return;let t=oi()[Ht];Z=!1,kr=!1,gn(),t&&kg(t.id)}function ku(){Z&&(Z=!1,kr=!1,gn())}function Rg(t){if(Lu(t)){wr=!0;return}if((t.ctrlKey||wr)&&!t.altKey&&!t.metaKey&&Hg(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{Z?hu(t.shiftKey):Ng(t.shiftKey,!0)}catch(n){yu.error("Hotkey failed:",n)}return}if(Z){if(t.key==="Escape"){t.preventDefault(),ku();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),Wa();return}t.key==="Tab"&&(t.ctrlKey||wr)&&(t.preventDefault(),hu(t.shiftKey))}}function Ig(t){Lu(t)&&(wr=!1,Z&&kr&&Wa())}function Pg(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(ni)}function Og(t){!Z||(t.target instanceof Element?t.target:null)?.closest(`#${pn}`)||ku()}function Bg(){document.visibilityState==="hidden"&&Lr(Ae())}function _a(t=ei){t instanceof HTMLElement&&wo(t,xo("auto"),!0)}function Dg(){if(!document.body)return null;let t=document.getElementById(pn);if(t instanceof HTMLElement)return ei=t,_a(t),t;t=document.createElement("div"),t.id=pn;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),ei=t,_a(t),t}function gn(){let t=Dg();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!Z){e.dataset.visible="false",e.replaceChildren();return}let n=oi();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}Ht>=n.length&&(Ht=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===Ht?"true":"false",s.setAttribute("aria-selected",a===Ht?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{Ht=a,Wa()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function $g(){document.getElementById(pn)?.remove(),ei=null}var Cu=h({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[y.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${pn}`],settings:_,start(){w("recentTopics",gu),Me=Ae(),Ua(Me),Ka(),Lr(Me),Da=nt(Sg),Mg(),ti=new AbortController;let{signal:t}=ti;window.addEventListener("keydown",Rg,{capture:!0,signal:t}),window.addEventListener("keyup",Ig,{capture:!0,signal:t}),window.addEventListener("popstate",ni,{signal:t}),document.addEventListener("click",Pg,{capture:!0,signal:t}),document.addEventListener("click",Og,{signal:t}),document.addEventListener("visibilitychange",Bg,{signal:t}),$a=We("schemeChange",()=>_a())},stop(){ti?.abort(),ti=null,fn!==void 0&&(clearTimeout(fn),fn=void 0),Ag(),Da?.(),Da=null,$a?.(),$a=null,Z=!1,kr=!1,wr=!1,$g()},onSettingsChange(){let t=ri(Sr());t.length!==Sr().length&&(_.store.visits=t),Z&&gn()}});var Va="cleaner",_g=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],qg=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],zg=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],Fg=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],jg=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],Gg=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],He=T({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function bn(t){return`${t.join(",")}{display:none!important}`}function Mu(){let t=[];if(He.store.hideDownloadApps!==!1&&t.push(bn(_g)),He.store.hideDisclaimer!==!1&&t.push(bn(qg)),He.store.hideUpgrade!==!1&&t.push(bn(zg)),He.store.hideLockedModels!==!1&&t.push(bn(Fg)),He.store.hideHomePromo!==!1&&t.push(bn(jg)),He.store.hideAds!==!1&&t.push(bn(Gg)),!t.length){x(Va);return}w(Va,t.join(`
`))}var Au=h({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[y.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:He,start:Mu,onSettingsChange:Mu,stop(){x(Va)}});var ai=new E("ResponseNotification"),yn=T({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:Zg},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Ya=!1,ii=null,hn=null,Cr=null;function Ug(){return document.visibilityState==="hidden"||document.hidden}function Kg(){return yn.store.onlyWhenHidden===!1?!0:Ug()}function Wg(){let t=sn(I());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function Hu(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!hn||hn.state==="closed")&&(hn=new t);let e=hn,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){ai.debug("chime failed",t)}}function Vg(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){ai.debug("custom sound failed",e),Hu()}}function Nu(){let t=String(yn.store.soundUrl||"").trim();t?Vg(t):Hu()}function Yg(){let t="Bloom++",e=`${Wg()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){ai.debug("notification failed",n)}}function Xg(){Kg()&&(yn.store.sound!==!1&&Nu(),yn.store.browserNotification!==!1&&Yg())}function Zg(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>Nu()),t.appendChild(e),()=>{e.remove()}}var Ru=h({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[y.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:yn,start(){Ya=!0,ii?.(),ii=V(t=>{Ya&&(t.userStopped||t.error||Xg())}),Cr?.abort(),Cr=new AbortController,yn.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:Cr.signal}),ai.debug("watch started")},stop(){Ya=!1,ii?.(),ii=null,Cr?.abort(),Cr=null;try{hn?.close()}catch{}hn=null}});var Iu=`#bloom-pq-chip {
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
`;var Nr=new E("PromptQueue"),Za="bloom-pq-chip",Pu="promptQueue",Ou=80,Qg=50,tb=2e3,_u=T({replacePending:{type:2,description:"Replace the queued prompt if you Enter again while one is waiting.",default:!0}}),z=new Map,jt=!1,yt="",q="",ce=!1,vt=!1,B=null,Mr=null,si=null,Hr,Ar,vn=null;function xn(){return Ft(et())}function wn(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function Bu(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Tt);return n instanceof HTMLElement?n:U()}function Ja(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function qu(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function eb(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?wn(e.innerText||e.textContent||""):""}catch{return""}}function Du(t){if(!yt||yt===t)return;let e=z.get(yt);!e||z.has(t)||X(yt,t)&&(z.delete(yt),z.set(t,e),q===yt&&(q=t),B?.key===yt&&(B.key=t),Nr.debug("migrated pending",yt,"\u2192",t))}function Qa(t){let e=xn();if(z.get(e)&&_u.store.replacePending===!1)return;z.set(e,{text:t,at:Date.now()}),B={key:e,text:t,turns:qu(),ticks:3};let r=U();r&&zt(r,""),le(),Nr.debug("queued",e,t.length)}function nb(t){z.delete(t),q===t&&(q=""),B?.key===t&&(B=null),le()}function rb(){vt=!0,clearTimeout(Ar),Ar=setTimeout(()=>{vt=!1,Ar=void 0},tb)}function ob(){let t=xn(),e=z.get(t);if(!e)return;let n=U();if(!n)return;z.delete(t),q="",le(),rb(),zt(n,e.text);let r=re();r&&!P(r)&&!Do(r)&&(r.click(),vt=!1)}function $u(t){if(!jt||ce||D()||xn()!==t)return;let e=z.get(t);if(!e){q="";return}if(pt())return;let n=U();if(!n)return;if(!ne(n)){let o=wn(tt(n));if(o&&o!==e.text)return}let r=re();!r||P(r)||Do(r)||(ce=!0,zt(n,e.text),clearTimeout(Hr),Hr=setTimeout(()=>ib(t,e.text),Qg))}function ib(t,e){Hr=void 0;try{if(!jt)return;let n=z.get(t);if(!n||n.text!==e||D()||xn()!==t)return;let r=U();if(!r)return;let o=wn(tt(r));if(o&&o!==e&&!ne(r))return;o!==e&&zt(r,e);let i=re();if(!i||P(i)||Do(i))return;i.click(),z.delete(t),q="",le(),Nr.debug("drained",t)}finally{ce=!1}}function zu(t){let e=mt();if(!e||e===document.body){t.style.left="50%",t.style.bottom="6.5rem";return}let n=e.getBoundingClientRect();t.style.left=`${Math.round(n.left+n.width/2)}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`;let r=Math.min(512,Math.max(160,n.width-24));t.style.maxWidth=`${Math.round(r)}px`}function Xa(){vn?.remove(),vn=null}function le(){if(!jt||!document.body){Xa();return}let t=xn(),e=z.get(t);if(!e){Xa();return}let n=vn;n?.isConnected||(n=document.createElement("div"),n.id=Za,document.body.appendChild(n),vn=n),n.replaceChildren();let r=document.createElement("span");r.className="bloom-pq-kicker",r.textContent="Next";let o=document.createElement("span");o.className="bloom-pq-text";let i=e.text.length>Ou?`${e.text.slice(0,Ou)}\u2026`:e.text;o.textContent=i,o.title=e.text;let a=document.createElement("div");a.className="bloom-pq-actions";let s=document.createElement("button");s.type="button",s.className="bloom-pq-btn bloom-pq-send",s.textContent="Send now",s.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),ob()});let l=document.createElement("button");l.type="button",l.className="bloom-pq-btn bloom-pq-x",l.setAttribute("aria-label","Dismiss queued prompt"),l.textContent="\xD7",l.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),nb(t)}),a.append(s,l),n.append(r,o,a),zu(n)}function ab(){if(!B)return;if(B.ticks-=1,z.get(B.key)&&qu()>B.turns){let e=eb();if(e&&e===B.text){Nr.debug("native send leaked; dropping pending"),z.delete(B.key),q===B.key&&(q=""),B=null,le();return}}B.ticks<=0&&(B=null)}function sb(t){if(!jt||t.isComposing||t.keyCode===229||t.key!=="Enter"||t.shiftKey||t.ctrlKey||t.metaKey||ce)return;let e=Bu(t.target)??Bu(document.activeElement);if(!e||!D())return;if(t.altKey||vt){vt=!1;return}if(!ft(e))return;let n=wn(tt(e));n&&(Ja(t),Qa(n))}function lb(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||P(e))return null;let n=t.closest(rn);if(n instanceof HTMLElement&&!P(n))return n;let r=re();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function cb(t){if(!jt)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${Za}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&P(n)||ce||!D()||!lb(e))return;if(vt){vt=!1;return}let r=U();if(!r||!ft(r))return;let o=wn(tt(r));o&&(Ja(t),Qa(o))}function ub(t){if(!jt)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(Bo)&&!e.querySelector(Tt)||ce||!D())return;if(vt){vt=!1;return}let n=U()??e.querySelector(Tt);if(!n||!ft(n))return;let r=wn(tt(n));r&&(Ja(t),Qa(r))}var Fu=h({name:"PromptQueue",description:"Queue the next prompt while a reply is streaming. Enter/Send waits for this turn instead of interrupting.",authors:[y.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Pu,cleanupSelectors:[`#${Za}`],settings:_u,start(){jt=!0,yt=xn(),q="",ce=!1,vt=!1,B=null,w(Pu,Iu),Mr?.abort(),Mr=new AbortController;let{signal:t}=Mr;window.addEventListener("keydown",sb,{capture:!0,signal:t}),document.addEventListener("click",cb,{capture:!0,signal:t}),document.addEventListener("submit",ub,{capture:!0,signal:t}),si?.(),si=V({onFall(e){if(jt){if(e.userStopped||e.error){q="",le();return}q=e.contextKey,$u(e.contextKey)}},onContext(e){Du(e),yt=e,le()},onTick(e){Du(e.contextKey),yt=e.contextKey,ab(),q&&q===e.contextKey&&$u(q),vn&&zu(vn)}}),le(),Nr.debug("watch started")},stop(){jt=!1,si?.(),si=null,Mr?.abort(),Mr=null,clearTimeout(Hr),Hr=void 0,clearTimeout(Ar),Ar=void 0,z.clear(),B=null,q="",ce=!1,vt=!1,Xa()}});var ju=`.bloom-cls {
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
`;var Ku=new E("ChatListStatus"),Gu="chatListStatus",ui="bloom-cls",mb="bloom-cls",fb=1200*1e3,pb="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",Rt=new Map,It=!1,En="",Gt=!1,at=0,ue=null,ns=null,Sn=null,ts=null,li=null,Rr=null,Tn=!1,Ln=new Set;function ci(){return Date.now()}function Wu(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function Ne(t,e,n,r=!0){if(!(!t||!It)){if(e==="idle")Rt.delete(t);else{let o=Rt.get(t);o&&o.kind===e&&n!=="net"?o.at=ci():Rt.set(t,{kind:e,at:ci(),source:n})}r&&gb({v:1,id:t,kind:e,at:ci()}),kn()}}function gb(t){try{Sn?.postMessage(t)}catch{}}function bb(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||Ne(e.id,e.kind,"bc",!1)}function hb(){let t=ci();for(let[e,n]of Rt)n.kind==="streaming"&&t-n.at>fb&&Rt.delete(e)}function yb(){let t=Wu();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(r.closest(pb))continue;let o=on(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function Uu(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function es(t){let e=t.querySelector(`:scope > .${ui}`);return e||null}function rs(){if(!It)return;hb();let t=I(),e=yb();ue?.disconnect();try{for(let n of e){let r=on(n.getAttribute("href")||"");if(!r||!t||r!==t){es(n)?.remove();continue}let i=Rt.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){es(n)?.remove();continue}let a=es(n);a||(a=document.createElement("span"),a.className=ui,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(Uu("streaming")):i==="error"&&a.appendChild(Uu("error")))}}catch(n){Ku.debug("paint failed",n)}Vu()}function kn(){if(It){if(document.hidden){at&&(cancelAnimationFrame(at),at=0),rs();return}at||(at=requestAnimationFrame(()=>{at=0,It&&rs()}))}}function Vu(){let t=Wu();if(!(ue&&ns===t&&t?.isConnected)){if(ue?.disconnect(),ns=t,!t){ue=null;return}ue=new MutationObserver(()=>kn()),ue.observe(t,{childList:!0,subtree:!0})}}function os(){return!!(xe()||pr())}function vb(t){return!!(Tn||t&&Ln.has(t)||os())}function xb(t){if(It){if(t.type==="post-start"){t.conversationId?(Tn=!1,Ln.add(t.conversationId),Gt=!0,Ne(t.conversationId,"streaming","net")):(Tn=!0,Gt=!0);return}t.type==="post-end"&&(Tn=!1,t.conversationId&&(Ln.delete(t.conversationId),Ne(t.conversationId,t.error?"error":"done","net")),os()||(Gt=!1))}}function wb(t,e){if(!It)return;if(X(e,t)){kn();return}let n=I();if(!(Tn||n&&Ln.has(n))){if(Gt=!1,n&&Rt.get(n)?.kind==="streaming"&&Rt.get(n)?.source==="local"){Ne(n,"idle","local");return}kn()}}function Eb(t){if(!It)return;let e=t.conversationId||I();if(En&&e&&En!==e){let r=Rt.get(En);r?.kind==="streaming"&&r.source==="local"&&Ne(En,pt()?"error":"done","local"),Gt=!!(e&&Ln.has(e))}if(En=e,vb(e)&&(t.streaming||os())){Gt=!0,e&&Ne(e,"streaming","local"),kn();return}Gt&&(Gt=!1,e&&Ne(e,pt()?"error":"done","local")),kn()}var Yu=h({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[y.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${ui}`],start(){It=!0,w(Gu,ju);try{Sn=new BroadcastChannel(mb)}catch{Sn=null}Sn?.addEventListener("message",bb),ts=nt(xb),li?.(),li=V({onTick:Eb,onContext:wb}),Rr?.abort(),Rr=new AbortController,document.addEventListener("visibilitychange",()=>{It&&(at&&(cancelAnimationFrame(at),at=0),rs())},{signal:Rr.signal}),Vu(),Ku.debug("sidebar status watch started")},stop(){It=!1,at&&cancelAnimationFrame(at),at=0,Rr?.abort(),Rr=null,ue?.disconnect(),ue=null,ns=null,li?.(),li=null,ts?.(),ts=null;try{Sn?.close()}catch{}Sn=null,Rt.clear(),Ln.clear(),Tn=!1,Gt=!1,En="",document.querySelectorAll(`.${ui}`).forEach(t=>t.remove()),x(Gu)}});var Zu="widerChat",Ju=40,Qu=96,td=64,ed=T({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:Ju,max:Qu,default:td}});function Sb(){return G(Number(ed.store.width??td),Ju,Qu)}function Xu(){let t=Sb(),e=`min(100%,${t}rem)`;w(Zu,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var nd=h({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[y.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:ed,start:Xu,onSettingsChange:Xu,stop(){x(Zu)}});var is="composerOpacity",Cn='form[data-type="unified-composer"],form.w-full[data-type]',Tb=[`${Cn} [class*="corner-superellipse"]`,`${Cn} [class*="bg-token-bg-primary"]`,`${Cn} [class*="bg-token-main-surface"]`].join(","),Lb=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),kb="#thread-bottom-container,#thread-bottom",Cb=`${Cn} #prompt-textarea,${Cn} [contenteditable="true"]`,Mb="var(--bg-primary,var(--main-surface-primary,#ffffff))",as=T({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function Ab(){return G(Number(as.store.opacity??100),0,100)}function Hb(){return G(Number(as.store.blur??16),0,40)}function rd(){let t=Ab();if(t>=100){x(is);return}let e=Hb(),n=`color-mix(in srgb,${Mb} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";w(is,`${kb}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Lb}{display:none!important}${Cn}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Tb}{background-color:${n}!important;background-image:none!important;${r}}${Cb}{background-color:transparent!important;background-image:none!important}`)}var od=h({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[y.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:as,start:rd,onSettingsChange:rd,stop(){x(is)}});var id=`#bloom-bn-host {
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
`;var Rb=new E("BetterNavigator"),ss="betterNavigator",ld="bloom-bn-host",ds=60,Ib=16,Pb=1e3,Ob=2.5,Bb=.4,fi="\u6B63\u5728\u8F93\u51FA\u2026",ms="Image",Db="\u2753",$b="\u{1F916}",ad=/file_[0-9a-f]+/gi,_b=40,qb=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,zb=['section[data-testid^="conversation-turn-"][data-turn="user"]','section[data-testid^="conversation-turn-"][data-turn="assistant"]','article[data-testid^="conversation-turn-"][data-turn="user"]','article[data-testid^="conversation-turn-"][data-turn="assistant"]'].join(", "),Fb=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),jb=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='thinking']","[class*='reasoning']","[class*='footnote']",".sr-only"].join(", "),Gb=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),yi=T({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),Mn=new Map,Dr=new Map,An=new Set,xt=!1,Pe=!1,de=null,$r=null,Oe=null,pi=null,F=[],Be="",gi=0,bi=-1,vs=0,hi="",st=0,Ut=0,Ir,Pr=null,di=null,ls=null,cs=null,Re=null,fs=null,Or=null,Ie=null,Hn=null,Br=null;function vi(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function us(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function Ub(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function Kb(t){let e=t.getBoundingClientRect(),n=null;try{let o=t.querySelector("[data-message-id], [data-testid^='conversation-turn-']"),a=o?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]')??o;for(;a&&a!==t;)qb.test(Ub(a))&&(n=a),a=a.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=us(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||us(getComputedStyle(t).getPropertyValue("--thread-content-width"))||us(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function sd(t){try{return!!t.closest(Fb)}catch{return!0}}function Wb(t){let e=(t.getAttribute("data-turn")||t.closest("[data-turn]")?.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("data-message-author-role")||t.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase();if(n==="user"||n==="assistant")return n;try{let o=(t.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent||"").toLowerCase();if(o.includes("you said"))return"user";if(o.includes("chatgpt said")||o.includes("assistant said"))return"assistant"}catch{}let r=(t.getAttribute("aria-label")||"").toLowerCase();return r.includes("you said")?"user":r.includes("chatgpt said")||r.includes("assistant said")?"assistant":null}function xi(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||t.querySelector("[data-message-id]")?.getAttribute("data-message-id")||""}function cd(t){try{if(t.querySelector("[class*='imagegen-image']")||t.querySelector('img[alt="Generated image"], img[alt^="Generated image"]'))return!0}catch{}return!1}function Vb(t){try{return!!t.closest("[class*='message-image']")}catch{return!0}}function mi(t,e){if(t){ad.lastIndex=0;for(let n of t.matchAll(ad))e.add(n[0].toLowerCase())}}function Yb(t){try{let e=new Set,n=s=>{Vb(s)||(mi(s.getAttribute("src")||"",e),mi(s.getAttribute("srcset")||"",e),mi(s.getAttribute("href")||"",e),s instanceof HTMLImageElement&&mi(s.currentSrc||"",e))};for(let s of t.querySelectorAll("[class*='imagegen-image']")){n(s);for(let l of s.querySelectorAll("[src], [srcset], [href]"))n(l)}for(let s of t.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]'))n(s);if(e.size)return e.size;let o=t.querySelectorAll("[class*='group/imagegen-image']").length;if(!o)return 0;let i=xi(t);return(i?t.querySelector(`#image-${CSS.escape(i)}`):t.querySelector("[id^='image-']:not([id^='image-gen-'])"))&&o>=2&&(o-=1),o}catch{return 0}}function Xb(t,e){let n=Yb(t),r=Dr.get(e)??0,o=Math.max(r,n);return o>0&&Dr.set(e,o),o>=2?`${ms} x${o}`:ms}function ps(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(i.closest(jb))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return(o.textContent||"").replace(/\s+/g," ").trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<ds+20;)e.push((r.textContent||"").replace(/\s+/g," ").trim());return e.join(" ").replace(/\s+/g," ").trim()}function Zb(t,e){try{if(cd(t)||t.querySelector("img, picture, video, canvas"))return ms;if(t.querySelector("a[download], [class*='attachment']"))return"File";if(t.querySelector("pre, code"))return"Code"}catch{}return`Message ${e+1}`}function Jb(t,e){if(e==="user"){let r=t.querySelector(".whitespace-pre-wrap")??t;return ps(r)}let n=t.querySelector(".markdown");return n?ps(n):""}function Qb(t){return t.length>ds?`${t.slice(0,ds).trimEnd()}\u2026`:t}function th(t,e,n,r){let o=Jb(t,e);return o?Qb(o):r?fi:cd(t)?Xb(t,xi(t)):Zb(t,n)}function eh(){if(Pe)return!0;let t=I();return!!(t&&An.has(t)||xe()||pr())}function nh(t){try{if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming")||t.querySelector("[aria-busy='true'], .result-streaming"))return!0;let e=t.querySelector(".markdown");if((!e||e instanceof HTMLElement&&!ps(e))&&t.querySelector("[class*='thinking'], [class*='reasoning'], details"))return!0}catch{}return!1}function rh(t){let e=new Set,n=[];try{for(let r of t.querySelectorAll(zb)){if(sd(r))continue;let i=xi(r)||`anon:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}if(n.length)return n;try{for(let r of t.querySelectorAll("[data-message-id]")){if(sd(r))continue;let i=r.getAttribute("data-message-id")||""||`mid:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}return n}function oh(){let t=vi();if(!t||t===document.body)return[];let e=yi.store.showAssistant!==!1,n=e&&eh(),r=[];try{for(let o of rh(t)){let i=xi(o);if(!i)continue;let a=Wb(o);if(a!=="user"&&a!=="assistant"||a==="assistant"&&!e)continue;let s=a==="assistant"&&n&&nh(o),l=th(o,a,r.length,s);l&&l!==fi&&l!==Mn.get(i)&&Mn.set(i,l);let c=s&&l===fi?fi:Mn.get(i)||l;r.push({id:i,el:o,role:a,text:c,live:s})}}catch{}return r}function ih(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function ud(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function ah(t){return t===window?window.innerHeight:t.clientHeight}function sh(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(Gb)}catch{return!1}}function dd(){Ir!==void 0&&(clearTimeout(Ir),Ir=void 0),Pr?.classList.remove("bloom-bn-flash"),Pr=null}function lh(t){dd(),t.classList.add("bloom-bn-flash"),Pr=t,Ir=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),Pr===t&&(Pr=null),Ir=void 0},800)}function gs(t){if(!F.length)return;let e=Math.max(0,Math.min(t,F.length-1));gi=e,$r?.querySelectorAll(".bloom-bn-tick").forEach((r,o)=>{r.classList.toggle("bloom-bn-current",o===e)}),Oe?.querySelectorAll(".bloom-bn-item").forEach((r,o)=>{r.classList.toggle("bloom-bn-active",o===e)}),pi&&(pi.textContent=`${e+1} / ${F.length}`);let n=Oe?.children[e];if(n instanceof HTMLElement){let r=Oe;if(r){let o=n.offsetTop-r.clientHeight/2+n.offsetHeight/2;r.scrollTop=Math.max(0,o)}}}function bs(t){let e=F[t];if(!e?.el.isConnected)return;bi=t,vs=Date.now()+Pb,gs(t);let n=Hn??ud(e.el),o=Math.abs(e.el.getBoundingClientRect().top-ih())>Ob*ah(n);e.el.scrollIntoView({behavior:o?"auto":"smooth",block:"start"}),yi.store.jumpEffect!=="none"&&lh(e.el)}function xs(){if(!xt||!F.length)return;if(Date.now()<vs&&bi>=0){gs(bi);return}let t=window.innerHeight*Bb,e=0;for(let n=0;n<F.length;n++){let r=F[n].el;r.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}gs(e)}function ch(t){let e=ud(t);if(Hn===e&&Br)return;Br?.(),Hn=e;let n=e===window?document:e,r=()=>{xs(),ws()};n.addEventListener("scroll",r,{passive:!0}),Br=()=>n.removeEventListener("scroll",r)}function uh(t){Ie?.disconnect(),Ie=null;let e=Hn instanceof HTMLElement?Hn:null;Ie=new IntersectionObserver(()=>xs(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el.isConnected&&Ie.observe(n.el)}function dh(){if(!document.body)return null;let t=de;if(t?.isConnected)return t;t=document.createElement("div"),t.id=ld,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),de=t,$r=e,Oe=i,pi=o,t}function md(){let t=de,e=vi();if(!t||!e||!e.isConnected||F.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=Kb(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||_b,d=n.right-r.right>=c+8?r.right+4:r.right-12-c;d=Math.min(d,n.right-c-8),d=Math.max(8,d);let g=Math.max(8,Math.round(window.innerWidth-d-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${g}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function ws(){!xt||Ut||(Ut=requestAnimationFrame(()=>{Ut=0,xt&&md()}))}function mh(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function fh(t){let e=$r,n=Oe;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>Ib),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=mh(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",c=>{c.preventDefault(),bs(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-emoji",s.textContent=r.role==="user"?Db:$b;let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=r.text,l.title=r.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),bs(o)}),n.appendChild(a)}))}function ph(t){$r?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=Oe?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function gh(){let t=I();return t===hi?!1:(hi=t,Mn.clear(),Dr.clear(),F=[],Be="",gi=0,bi=-1,vs=0,Pe&&t&&(An.add(t),Pe=!1),!0)}function bh(t){let e=yi.store.showAssistant!==!1?"1":"0";return`${hi}|${e}|${t.map(n=>n.id).join(",")}`}function hs(){if(!xt)return;gh();let t=oh(),e=vi();if(!e||t.length<1){F=t,Be="",de&&(de.hidden=!0),Ie?.disconnect(),ys();return}dh();let n=bh(t);n!==Be?(F=t,Be=n,fh(t),ch(e),uh(t)):(F=t,ph(t)),md(),xs(),ys()}function Kt(){if(xt){if(document.hidden){st&&(cancelAnimationFrame(st),st=0),hs();return}st||(st=requestAnimationFrame(()=>{st=0,xt&&hs()}))}}function ys(){let t=vi();if(!(Re&&fs===t&&t?.isConnected)){if(Re?.disconnect(),Or?.disconnect(),fs=t,!t||t===document.body){Re=null;return}Re=new MutationObserver(()=>Kt()),Re.observe(t,{childList:!0,subtree:!0}),Or=new ResizeObserver(()=>ws()),Or.observe(t)}}function hh(t){if(xt){if(t.type==="post-start"){t.conversationId?(Pe=!1,An.add(t.conversationId)):Pe=!0,Kt();return}if(t.type==="post-end"){if(Pe=!1,t.conversationId)An.delete(t.conversationId);else{let e=I();e&&An.delete(e)}Kt()}}}function yh(t){if(!xt||!F.length||de?.hidden||t.altKey||t.ctrlKey||t.metaKey||sh(t.target))return;let e=-1;if(t.key==="ArrowDown")e=gi+1;else if(t.key==="ArrowUp")e=gi-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=F.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),bs(Math.max(0,Math.min(e,F.length-1)))}function vh(){dd(),Ie?.disconnect(),Ie=null,Re?.disconnect(),Re=null,fs=null,Or?.disconnect(),Or=null,Br?.(),Br=null,Hn=null,de?.remove(),de=null,$r=null,Oe=null,pi=null}var fd=h({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[y.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:ss,cleanupSelectors:[`#${ld}`],settings:yi,start(){xt=!0,hi=I(),w(ss,id),di=new AbortController;let{signal:t}=di;window.addEventListener("keydown",yh,{signal:t}),window.addEventListener("popstate",Kt,{signal:t}),window.visualViewport?.addEventListener("resize",ws,{signal:t}),document.addEventListener("visibilitychange",()=>{xt&&(st&&(cancelAnimationFrame(st),st=0),Ut&&(cancelAnimationFrame(Ut),Ut=0),hs())},{signal:t}),cs=nt(hh),ls=V({onTick(){Kt()},onFall(){Kt()},onContext(e,n){X(n,e)||(Mn.clear(),Dr.clear(),Be=""),Kt()}}),ys(),Kt(),Rb.debug("navigator started")},stop(){xt=!1,st&&cancelAnimationFrame(st),st=0,Ut&&cancelAnimationFrame(Ut),Ut=0,di?.abort(),di=null,ls?.(),ls=null,cs?.(),cs=null,An.clear(),Pe=!1,vh(),Mn.clear(),Dr.clear(),F=[],Be="",x(ss)},onSettingsChange(){Be="",Kt()}});var pd=`.bloom-ts {
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
`;function gd(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function bd(t){try{return new Date(t).toISOString()}catch{return""}}var xd=new E("MessageTimestamps"),hd="messageTimestamps",Ei="bloom-ts",yd=1500,wh="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",Nn=T({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),Rn=new Map,$e=!1,lt=0,me=null,Ss=null,Es=null,wi=null,_r=null,vd=!1;function wd(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function Ls(){let t=Nn.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Ed(){let t={...Ls()};for(let[n,r]of Rn)t[n]=r;let e=Object.keys(t);if(e.length>yd){let n=e.slice(e.length-yd),r={};for(let o of n)r[o]=t[o];Nn.store.stamps=r;return}Nn.store.stamps=t}var Eh=ul(Ed,500);function Sd(t,e){!t||!e||Rn.get(t)===e||(Rn.set(t,e),Eh(),De())}function Sh(t){return t?Rn.get(t)??Ls()[t]??Fo(t)??null:null}function Th(t){$e&&t.type==="message-time"&&Sd(t.messageId,t.createTime)}function Lh(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function kh(){let t=wd();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll("[data-message-id]"))n.closest(wh)||e.push(n)}catch{}return e}function Ch(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function Ts(){if(!$e)return;let t=Nn.store.hideOwnMessages===!0,e=Nn.store.showDate!==!1,n=D(),r=kh();me?.disconnect();try{r.forEach((o,i)=>{let a=o.getAttribute("data-message-id")||"",s=Lh(o),l=o.querySelector(`:scope > .${Ei}`);if(t&&s==="user"){l?.remove();return}if(Ch(o)){l?.remove();return}let c=Sh(a);if(!c&&a&&(n||vd)&&i>=r.length-2&&(c=Date.now(),Sd(a,c)),!c){l?.remove();return}let u=gd(c,e);if(!u){l?.remove();return}let d=l;d||(d=document.createElement("time"),d.className=Ei,d.setAttribute("aria-hidden","true"),o.insertBefore(d,o.firstChild)),d.textContent!==u&&(d.textContent=u);let g=bd(c);g&&d.getAttribute("datetime")!==g&&d.setAttribute("datetime",g)})}catch(o){xd.debug("paint failed",o)}vd=n,Td()}function De(){if($e){if(document.hidden){lt&&(cancelAnimationFrame(lt),lt=0),Ts();return}lt||(lt=requestAnimationFrame(()=>{lt=0,$e&&Ts()}))}}function Td(){let t=wd();if(!(me&&Ss===t&&t?.isConnected)){if(me?.disconnect(),Ss=t,!t||t===document.body){me=null;return}me=new MutationObserver(()=>De()),me.observe(t,{childList:!0,subtree:!0})}}var Ld=h({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[y.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Ei}`],settings:Nn,start(){$e=!0,w(hd,pd);let t=Ls();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&Rn.set(e,n);Es=nt(Th),wi?.(),wi=V({onTick:De,onFall:De,onContext:De}),_r?.abort(),_r=new AbortController,document.addEventListener("visibilitychange",()=>{$e&&(lt&&(cancelAnimationFrame(lt),lt=0),Ts())},{signal:_r.signal}),Td(),De(),xd.debug("timestamp watch started")},stop(){$e=!1,lt&&cancelAnimationFrame(lt),lt=0,_r?.abort(),_r=null,me?.disconnect(),me=null,Ss=null,wi?.(),wi=null,Es?.(),Es=null,Ed(),Rn.clear(),document.querySelectorAll(`.${Ei}`).forEach(t=>t.remove()),x(hd)},onSettingsChange:De});var ks="streamerMode",Mh="filter:blur(6px)!important;transition:filter .2s ease",Ah="filter:none!important",In=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],Pn=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function ct(t,e){return t.map(n=>`${n} ${e}`)}var _e=T({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function On(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${Mh}}${e?`${r}{${Ah}}`:""}`}function kd(){let t=[];if(_e.store.conversations!==!1&&(t.push(On([...ct(Pn,'a[href^="/c/"]'),...ct(Pn,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),_e.store.projects!==!1&&(t.push(On([...ct(Pn,'a[href*="/project"]'),...ct(Pn,'a[href*="/g/g-p-"]'),...ct(Pn,'[data-testid="project-name"]'),...ct(Pn,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),_e.store.headerTitle!==!1&&t.push(On(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),_e.store.accountAvatar!==!1&&t.push(On([...ct(In,"img"),...ct(In,'[class*="avatar"]'),...ct(In,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),_e.store.accountName!==!1&&t.push(On([...ct(In,".min-w-0 > .truncate"),...ct(In,".min-w-0.flex-1 .truncate")],!1)),_e.store.accountEmail!==!1&&t.push(On([...ct(In,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!t.length){x(ks);return}w(ks,t.join(`
`))}var Cd=h({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[y.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:_e,start:kd,onSettingsChange:kd,stop(){x(ks)}});var Md=`.bloom-gc-panel {
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
}`;var Nh=new E("GreetingCustomizer"),Bn="greetingCustomizer",Ad="greetingCustomizerUi",qr=100,Ms=30,Rh=120,Ih=1e3,Ph=50,Oh=40,Bh=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),zr=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),Ci=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function Dh(t){return!!t?.closest(Bh)}function Id(t){return!!(Dh(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function Vr(t){try{for(let e of document.querySelectorAll(t))if(!Id(e))return e}catch{}return null}function Cs(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(Vr(e))return e;return t}var Pd=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],j=T({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:Qh},greetings:{type:0,description:"Greeting texts",hidden:!0,default:Pd},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),Pt=!1,_n=!1,ze=null,Ti,Fr,Dn,jr,Li=0,Si=null,$n=null,Gr=null,Ur=null,Kr=null,ki=null;function Vt(){let t=location.pathname||"/";return t==="/"||t===""}function qe(){let t=j.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):Pd.slice()}function Wr(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function Hd(t){j.store.greetings=t.slice(0,Ms)}function Yr(){let t=String(j.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function $h(){return j.store.order==="random"?"random":"sequential"}function _h(){return G(Number(j.store.intervalSec??10),1,3600)*1e3}function qh(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function zh(){return!!Vr(Ci)}function Mi(){return!!(Vr(Ci)||Vr(zr))}function Fh(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=zh()?Cs(Ci):Vr(zr)?Cs(zr):Cs(Ci),i=e?`${zr}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function jh(t,e){if(t<=0)return 0;if(t===1)return Number(j.plain.index)!==0&&(j.store.index=0),Number(j.plain.lastRandom)!==0&&(j.store.lastRandom=0),0;let n=Number(j.plain.index),r=Number(j.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if($h()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return j.store.index=s,j.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return j.store.index=i,i}function Wt(t){if(!Pt)return;if(!Vt()){x(Bn);return}let e=qe().map(Wr).filter(Boolean);if(!e.length){x(Bn);return}let n=jh(e.length,t),r=e[n]??e[0],o=Yr()==="manual"&&e.length>1;w(Bn,Fh(qh(r),o)),ki?.()}function As(){Ti!==void 0&&(clearInterval(Ti),Ti=void 0)}function Hs(){As(),!(!Pt||!Vt())&&Yr()==="interval"&&(qe().filter(Boolean).length<=1||(Ti=setInterval(()=>Wt(!0),_h())))}function Ns(){jr!==void 0&&(clearTimeout(jr),jr=void 0),Li=0}function Nd(){if(Ns(),!Pt||!Vt())return;Li=Oh;let t=()=>{if(jr=void 0,!(!Pt||!Vt())){if(Mi()){Yr()==="refresh"&&!_n?(_n=!0,Wt(!0)):Wt(!1),Hs();return}Li-=1,Li>0&&(jr=setTimeout(t,Ph))}};t()}function Rs(){if(ze===!0){Mi()?Wt(!1):Nd();return}ze=!0,_n=!1,Yr()==="refresh"?(_n=!0,Wt(!0)):Wt(!1),Hs(),Mi()||Nd()}function Is(){ze=!1,_n=!1,As(),Ns(),x(Bn)}function Ai(){Dn===void 0&&(Dn=window.setTimeout(()=>{Dn=void 0,Pt&&(Vt()?Rs():ze!==!1&&Is())},Rh))}function Gh(){$n||($n=history.pushState.bind(history),Gr=history.replaceState.bind(history),Ur=function(...e){let n=$n(...e);return Ai(),n},Kr=function(...e){let n=Gr(...e);return Ai(),n},history.pushState=Ur,history.replaceState=Kr)}function Uh(){Ur&&history.pushState===Ur&&$n&&(history.pushState=$n),Kr&&history.replaceState===Kr&&Gr&&(history.replaceState=Gr),$n=null,Gr=null,Ur=null,Kr=null}function Kh(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(Ai)}function Wh(t){if(!Pt||!Vt()||Yr()!=="manual"||qe().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(zr);if(!n||Id(n))return;let r=window.getSelection?.();r&&String(r).trim()||Wt(!0)}function Vh(){Fr===void 0&&(Fr=setInterval(()=>{if(!Pt)return;let t=Vt();if(t!==(ze===!0)){t?Rs():Is();return}t&&Mi()&&Wt(!1)},Ih))}function Yh(){Fr!==void 0&&(clearInterval(Fr),Fr=void 0)}function Rd(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var Xh="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",Zh="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function Jh(t,e){let n=Wr(t);return n?n.length>qr?`Keep it to ${qr} characters.`:qe().length+(e?1:0)>Ms?`At most ${Ms} greetings.`:null:"Enter a greeting."}function Qh(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=qe(),s=Number(j.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=qr,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let m=l.querySelector(".bloom-gc-count");m&&(m.textContent=`${Wr(e).length}/${qr}`);let L=l.querySelector(".bloom-gc-error");L&&(L.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${Wr(e).length}/${qr}`;let g=document.createElement("span");g.className="bloom-gc-error",g.textContent=r;let S=document.createElement("div");if(S.className="bloom-gc-actions",n>=0){let m=document.createElement("button");m.type="button",m.className="bloom-gc-btn",m.textContent="Cancel",m.addEventListener("click",()=>{n=-1,e="",r="",i()}),S.appendChild(m)}let p=document.createElement("button");if(p.type="button",p.className="bloom-gc-btn bloom-gc-btn-primary",p.textContent=n>=0?"Update":"Add",p.addEventListener("click",()=>{let m=n<0,L=Jh(e,m);if(L){r=L,i();return}let M=Wr(e),H=qe().slice();n>=0&&n<H.length?H[n]=M:H.push(M),Hd(H),n=-1,e="",r="",i()}),S.appendChild(p),u.append(d,g,S),l.appendChild(u),t.appendChild(l),!a.length){let m=document.createElement("p");m.className="bloom-gc-empty",m.textContent="No greetings. The official heading stays.",t.appendChild(m);return}let b=document.createElement("div");b.className="bloom-gc-list",a.forEach((m,L)=>{let M=document.createElement("div");M.className="bloom-gc-item",L===s&&(M.dataset.active="true");let H=document.createElement("button");H.type="button",H.className=`bloom-gc-body${o===L?"":" bloom-gc-clamp"}`,H.textContent=m,H.addEventListener("click",()=>{o=o===L?-1:L,i()});let Dt=document.createElement("div");Dt.className="bloom-gc-item-actions";let wt=Rd("Edit",Xh);wt.addEventListener("click",()=>{n=L,e=m,r="",i()});let Y=Rd("Delete",Zh);Y.addEventListener("click",()=>{let N=qe().filter((J,$t)=>$t!==L);Hd(N),n===L?(n=-1,e=""):n>L&&(n-=1),i()}),Dt.append(wt,Y),M.append(H,Dt),b.appendChild(M)}),t.appendChild(b)};return ki=i,i(),()=>{ki===i&&(ki=null),t.replaceChildren()}}var Od=h({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[y.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Ad,settings:j,start(){Pt=!0,w(Ad,Md),Gh(),Si=new AbortController;let{signal:t}=Si;window.addEventListener("popstate",Ai,{signal:t}),document.addEventListener("click",Kh,{capture:!0,signal:t}),document.addEventListener("click",Wh,{signal:t}),Vh(),ze=null,Vt()?Rs():Is(),Nh.debug("started")},stop(){Pt=!1,Si?.abort(),Si=null,Dn!==void 0&&(clearTimeout(Dn),Dn=void 0),As(),Ns(),Yh(),Uh(),x(Bn),_n=!1,ze=null},onSettingsChange(){Pt&&(Vt()?(Wt(!1),Hs()):x(Bn))}});function t0(t){let e=/^data:([^;,]+)?(;base64)?,(.*)$/s.exec(t);if(!e)return null;let n=e[1]||"application/octet-stream",r=!!e[2],o=e[3]||"";try{if(r){let i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return new Blob([a],{type:n})}return new Blob([decodeURIComponent(o)],{type:n})}catch{return null}}async function Hi(t){try{return await createImageBitmap(t)}catch{return null}}async function e0(t){try{let e=new Image;return e.decoding="async",await new Promise((n,r)=>{e.onload=()=>n(),e.onerror=()=>r(new Error("img")),e.src=t}),await createImageBitmap(e)}catch{return null}}async function Ni(t){if(t.startsWith("data:")){let e=t0(t);if(e){let n=await Hi(e);if(n)return n}return e0(t)}try{let e=await fetch(t,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?Hi(await e.blob()):null}catch{return null}}var Ii="data-bloom-csi-slot",n0="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",r0=/\bsize-(?:[6-9]|10)\b/,o0=/\b(?:h|w)-(?:[6-9]|10)\b/,i0=/^(plus|pro|free|team|go|business|enterprise)$/i,a0=['[class*="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-6"]','[class~="h-7"]','[class~="h-8"]','[class~="h-9"]','[class~="h-10"]','[class~="w-6"]','[class~="w-7"]','[class~="w-8"]','[class~="w-9"]','[class~="w-10"]'].join(",");function Ri(t){return t.getAttribute("class")||""}function Dd(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||r0.test(t)?!0:o0.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function s0(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3&&!$d(e)}function $d(t){return i0.test(String(t??"").replace(/\s+/g,""))}function Ot(t){return!!t?.closest(n0)}function Pi(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function Xr(t){let e=Ri(t);return/\btext-xs\b/.test(e)||/text-token-text-secondary/.test(e)||/text-token-text-tertiary/.test(e)?!0:$d(t.textContent||"")}function Oi(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function Zr(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function l0(t){return/\bflex\b/.test(t)&&!/\bflex-col\b/.test(t)}function _d(t){if(Ot(t)||Oi(t)||Zr(t)||Xr(t)||Pi(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function qd(t){return Ot(t)||Oi(t)||Zr(t)||Xr(t)||t.querySelector("img, svg, .min-w-0, .truncate")?!1:s0(t.textContent||"")}function zd(t){return Ot(t)||Zr(t)||Pi(t)||Xr(t)?!1:Dd(Ri(t))||qd(t)?!0:_d(t)}function Bd(t){return!(Ot(t)||Pi(t)||Zr(t)||Xr(t)||Oi(t))}function Fe(t,e){let n=Oi(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(Zr(n)||Pi(n)||Xr(n));)Ot(n)||(r=n),n=n.parentElement;return r}function c0(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||Ot(e))continue;if(l0(Ri(e))){let r=[];for(let o of e.children)if(!(!(o instanceof HTMLElement)||!Bd(o))){if(zd(o)||Dd(Ri(o)))return Fe(o,t)??o;r.push(o)}if(r.length===1)return Fe(r[0],t)??r[0]}let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&Bd(r))return Fe(r,t)??r}}return null}function u0(t){let e=t.querySelectorAll(a0);for(let n of e)if(zd(n))return Fe(n,t)??n;return null}function d0(t){for(let e of t.querySelectorAll("span, div, p, i"))if(qd(e))return Fe(e,t)??e;return null}function m0(t){for(let e of t.querySelectorAll("*"))if(_d(e))return Fe(e,t)??e;return null}function Fd(t,e){if(Ot(t))return null;if(e&&!Ot(e)&&t.contains(e)){let n=Fe(e,t);if(n)return n}return c0(t)??u0(t)??d0(t)??m0(t)}function jd(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-8"]','[class~="w-8"]']}var qn="data-bloom-csi",Bi="data-bloom-csi-orig",je=new Set,Gd=null;function Os(t){Gd=t}function Ud(t){return`url(${JSON.stringify(t)})`}function Di(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function Bs(t,e,n){let r=Ud(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function Kd(t,e=Ii){let n=Ud(t);return`[${e}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${e}] *,[${e}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${e}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`}function f0(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function zn(t){t.removeEventListener("error",Ps);let e=t.getAttribute(Bi);t.removeAttribute(qn),t.removeAttribute(Bi),e&&t.getAttribute("src")!==e&&(t.src=e)}function Ps(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&je.add(n),zn(e),Gd?.()}function Wd(t,e){if(!e||je.has(e)){zn(t);return}f0(t);let n=t.getAttribute("src")??"";if(t.getAttribute(qn)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(Bi)&&t.setAttribute(Bi,n);t.setAttribute(qn,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",Ps),t.addEventListener("error",Ps),n!==e&&(t.src=e)}var Vd=`/*
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
`;var Yd=new E("CustomSidebarIdentity"),Xd="customSidebarIdentityUi",Qd="customSidebarIdentity",g0="bloom-csi-face",b0="bloom-csi-name",Fn=Ii,h0=1024,$i=256,tm=24,em=64,nm=40,qs=1,zs=4,Jr=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Ds=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],v=T({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:O0},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:tm,max:em,default:nm},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function Ue(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function y0(){return String(v.store.displayName??"").trim()}function zi(t,e,n,r,o){let i=G(n,qs,zs),a=Math.min(t,e)/i,s=G(r,a/2,Math.max(a/2,t-a/2)),l=G(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}function v0(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function Fs(t){let e=Math.min(1,h0/Math.max(t.width,t.height));return v0(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function x0(t,e,n,r){let{side:o,x:i,y:a}=zi(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=$i,s.height=$i;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,$i,$i);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function w0(t){let e=await Hi(t);if(!e)return null;let n=Fs(e);return e.close(),n}async function Gs(t,e,n,r){let o=await Ni(t);if(!o)return null;let i=x0(o,e,n,r);return o.close(),i}function Us(){v.store.cropX=.5,v.store.cropY=.5,v.store.cropZoom=1}function Zd(){v.store.avatarUrl="",v.store.avatarSource="",Us()}var Jd=0;async function js(t){let e=++Jd;Us(),v.store.avatarSource=t;let n=await Gs(t,.5,.5,1);return e!==Jd?!1:(n&&(v.store.avatarUrl=n),!!n)}function Qr(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function $s(t){let e=Qr(t);if(!e)return!1;let n=await w0(e);return n?js(n):!1}var ut=!1,jn=!1,Gn=0,Fi=0,_i=null,fe=new Map,Un=null,Yt=null,ji=null,Bt=null,Gi=null;function Ui(t){let e=String(t??"").trim();if(!e||je.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:n}=new URL(e);if(n==="https:"||n==="http:")return e}catch{return null}return null}function rm(){return Ui(v.store.avatarUrl)??Ui(v.store.avatarSource)}var qi=!1,_s=new Set;function om(){let t=Ui(v.store.avatarSource);if(!t?.startsWith("data:image/")||Ui(v.store.avatarUrl)?.startsWith("data:image/")||qi||_s.has(t))return;qi=!0;let e=Ue(v.store.cropX,.5),n=Ue(v.store.cropY,.5),r=Ue(v.store.cropZoom,1);Gs(t,e,n,r).then(o=>{if(qi=!1,!o){_s.add(t);return}ut&&(v.store.avatarUrl=o,Ki())}).catch(()=>{qi=!1,_s.add(t)})}function Ge(t,e){return t.map(n=>`${n} ${e}`)}function E0(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function S0(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=E0(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function im(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||Ot(n)||n.closest(".min-w-0")||e.push(n);return e}function T0(t){let e=im(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function Ks(){let t=[],e=be();e&&t.push(e);let n=Qe();if(n&&!t.some(r=>n.contains(r)||r.contains(n))){let r=n.querySelector(Jr.join(","))??n.querySelector("button, a, [role='button']")??n;r&&!t.includes(r)&&t.push(r)}return t}function am(t,e){let n=T0(t);if(n)Wd(n,e);else for(let o of im(t))zn(o);let r=Fd(t,n);for(let o of t.querySelectorAll(`[${Fn}]`))o!==r&&o.removeAttribute(Fn);r&&r.setAttribute(Fn,"")}function L0(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function k0(t,e){let n=L0(t);n&&am(n,e)}function C0(){for(let t of document.querySelectorAll(`img[${qn}]`))zn(t);for(let t of document.querySelectorAll(`[${Fn}]`))t.removeAttribute(Fn)}function M0(){let t=G(Math.round(Ue(v.store.avatarSize,nm)),tm,em),e=rm(),n=y0(),r=v.store.applyToMenu!==!1,o=[],i=[...Ge(Jr,"img"),"#stage-sidebar-tiny-bar img"];r&&i.push(...Ge(Ds,"> :first-child img"));let a=[...Ge(Jr,".min-w-0 > .truncate"),...Ge(Jr,".min-w-0.flex-1 .truncate")];r&&a.push(...Ge(Ds,"> :first-child .truncate"));let s=jd(Fn);o.push(Di([...s.flatMap(l=>Ge(Jr,l))].join(","),t)),o.push(Di(s.map(l=>`#stage-sidebar-tiny-bar ${l}`).join(","),32)),r&&o.push(Di(s.flatMap(l=>Ge(Ds,`> :first-child ${l}`)).join(","),t)),e&&(o.push(Bs(i.join(","),e,t)),o.push(Bs("#stage-sidebar-tiny-bar img",e,32)),o.push(Kd(e))),n&&o.push(S0(a,n)),w(Qd,o.join(""))}function A0(){let t=rm(),e=Ks();for(let n of e)am(n,t);if(v.store.applyToMenu!==!1){let n=tn();n&&k0(n,t)}for(let n of document.querySelectorAll(`img[${qn}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||zn(n)}function Ki(){if(!(!ut||jn)){jn=!0;for(let t of fe.values())t.disconnect();Yt?.disconnect(),Bt?.disconnect();try{M0(),A0()}finally{jn=!1,Ws(),I0(),Un?.isConnected&&sm(Un),om()}}}function to(){!ut||Gn||(Gn=requestAnimationFrame(()=>{Gn=0,Ki()}))}function H0(){jn||!ut||to()}function N0(t){if(fe.has(t))return;let e=new MutationObserver(H0);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),fe.set(t,e)}function R0(t){fe.get(t)?.disconnect(),fe.delete(t)}function Ws(){let t=new Set;for(let n of Ks())t.add(n),n.parentElement&&t.add(n.parentElement);let e=Qe();e&&t.add(e);for(let n of[...fe.keys()])(!t.has(n)||!n.isConnected)&&R0(n);for(let n of t)n.isConnected&&N0(n)}function I0(){let t=yo();if(!t){Bt?.disconnect(),Bt=null,ji=null;return}if(ji===t&&Bt){Bt.observe(t,{childList:!0});return}Bt?.disconnect(),ji=t,Bt=new MutationObserver(()=>{jn||!ut||(Ws(),to())}),Bt.observe(t,{childList:!0})}function sm(t){Un===t&&Yt||(Yt?.disconnect(),Un=t,Yt=new MutationObserver(()=>{if(!t.isConnected){Yt?.disconnect(),Yt=null,Un=null;return}jn||!ut||to()}),Yt.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function lm(t){if(!ut||v.store.applyToMenu===!1)return;let e=tn();if(e){sm(e),to();return}t<=0||requestAnimationFrame(()=>lm(t-1))}function cm(t){ut&&(Ki(),!(Ks().length||t<=0)&&(Fi=requestAnimationFrame(()=>cm(t-1))))}function P0(t){ut&&v.store.applyToMenu!==!1&&(!vo(t)&&!tn()||lm(10))}function O0(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let d=document.createElement("p");d.className="bloom-csi-hint";let g=document.createElement("div");g.className="bloom-csi-crop";let S=document.createElement("div");S.className="bloom-csi-stage";let p=document.createElement("img");p.className="bloom-csi-stage-img",p.alt="",p.draggable=!1,S.appendChild(p);let b=document.createElement("div");b.className="bloom-csi-zoom-row";let m=document.createElement("input");m.type="range",m.className="bloom-csi-zoom",m.min=String(qs),m.max=String(zs),m.step="0.05",m.setAttribute("aria-label","Zoom");let L=document.createElement("span");L.className="bloom-csi-zoom-val";let M=document.createElement("button");M.type="button",M.className="bloom-csi-btn",M.textContent="Reset",b.append(m,L,M);let H=document.createElement("p");H.className="bloom-csi-hint",H.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",g.append(S,b,H),t.append(u,d,g);function Dt(){let f=String(v.store.avatarSource??""),C=String(v.store.avatarUrl??"");return f.startsWith("data:image/")?f:C.startsWith("data:image/")?C:""}function wt(f,C,A){if(!a)return i.x=f,i.y=C,i.zoom=G(A,qs,zs),i;let W=zi(a.w,a.h,A,f*a.w,C*a.h);return i.x=W.x/a.w,i.y=W.y/a.h,i.zoom=W.z,i}function Y(){m.value=String(i.zoom),L.textContent=`${Math.round(i.zoom*100)}%`;let f=a?zi(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;f&&a&&(p.style.width=`${a.w/f.side*100}%`,p.style.height=`${a.h/f.side*100}%`,p.style.left=`${(.5-f.x/f.side)*100}%`,p.style.top=`${(.5-f.y/f.side)*100}%`)}function N(f=!1){let C=Dt(),A=String(v.store.avatarUrl??"").trim(),W=!!C;s.hidden=!A&&!C,(C||A)&&(s.src=C||A),document.activeElement!==l&&(l.value=W?"":A),l.placeholder=W?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",g.hidden=!C,d.hidden=!(e&&/^https?:\/\//.test(A)&&!C),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",C&&(f&&(i.x=Ue(v.store.cropX,.5),i.y=Ue(v.store.cropY,.5),i.zoom=Ue(v.store.cropZoom,1)),p.getAttribute("src")!==C&&(a=null,p.onload=()=>{a={w:p.naturalWidth,h:p.naturalHeight},wt(i.x,i.y,i.zoom),Y()},p.src=C),Y())}function J(f,C,A,W=!1){wt(f,C,A),Y();let Qs=Dt(),tl=()=>{v.store.cropX=i.x,v.store.cropY=i.y,v.store.cropZoom=i.zoom,Qs&&Gs(Qs,i.x,i.y,i.zoom).then(el=>{el&&(v.store.avatarUrl=el)})};r&&clearTimeout(r),W?tl():r=setTimeout(tl,80)}function $t(f){v.store.avatarUrl=f;let C=f.trim();if(n&&clearTimeout(n),!C){v.store.avatarSource="",Us(),e=!1,N(!0);return}if(C.startsWith("data:image/")){e=!1,n=setTimeout(()=>{Ni(C).then(A=>{if(!A)return;let W=Fs(A);A.close(),W&&js(W).then(()=>N(!0))})},80);return}if(/^https?:\/\//.test(C)){e=!1,v.store.avatarSource="",n=setTimeout(()=>{Ni(C).then(A=>{if(!A){e=!0,N(!0);return}let W=Fs(A);A.close(),W?(e=!1,js(W).then(()=>N(!0))):(e=!0,N(!0))})},400);return}e=!1,v.store.avatarSource="",N(!0)}u.addEventListener("paste",f=>{Qr(f.clipboardData)&&(f.preventDefault(),e=!1,$s(f.clipboardData).then(()=>N(!0)))}),u.addEventListener("dragover",f=>{Qr(f.dataTransfer)&&f.preventDefault()}),u.addEventListener("drop",f=>{Qr(f.dataTransfer)&&(f.preventDefault(),e=!1,$s(f.dataTransfer).then(()=>N(!0)))}),l.addEventListener("change",()=>$t(l.value)),l.addEventListener("paste",f=>{Qr(f.clipboardData)&&(f.preventDefault(),e=!1,$s(f.clipboardData).then(()=>N(!0)))}),l.addEventListener("keydown",f=>{Dt()&&!l.value&&(f.key==="Backspace"||f.key==="Delete")&&(Zd(),e=!1,N(!0))}),c.addEventListener("click",()=>{Zd(),e=!1,N(!0)}),S.addEventListener("pointerdown",f=>{f.button===0&&(S.setPointerCapture(f.pointerId),o.on=!0,o.px=f.clientX,o.py=f.clientY,o.x=i.x,o.y=i.y)}),S.addEventListener("pointermove",f=>{if(!o.on||!a)return;let C=S.clientWidth;if(!C)return;let{side:A}=zi(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);wt(o.x-(f.clientX-o.px)*(A/C)/a.w,o.y-(f.clientY-o.py)*(A/C)/a.h,i.zoom),Y()}),S.addEventListener("pointerup",()=>{o.on&&(o.on=!1,J(i.x,i.y,i.zoom,!0))}),S.addEventListener("pointercancel",()=>{o.on=!1}),S.addEventListener("wheel",f=>{f.preventDefault(),J(i.x,i.y,i.zoom*(f.deltaY<0?1.08:1/1.08))},{passive:!1}),m.addEventListener("input",()=>J(i.x,i.y,Number(m.value))),m.addEventListener("change",()=>J(i.x,i.y,Number(m.value),!0)),M.addEventListener("click",()=>J(.5,.5,1,!0));let Js=()=>N(!1);return Gi=Js,N(!0),()=>{Gi===Js&&(Gi=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var um=h({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[y.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Xd,cleanupSelectors:[`.${g0}`,`.${b0}`],settings:v,start(){ut=!0,je.clear(),Os(to),w(Xd,Vd),_i=new AbortController,document.addEventListener("click",P0,{signal:_i.signal}),cm(40),om(),Yd.debug("started")},onSettingsChange(){je.clear(),Gi?.(),ut&&(Ws(),Ki())},stop(){ut=!1,_i?.abort(),_i=null,Gn&&cancelAnimationFrame(Gn),Gn=0,Fi&&cancelAnimationFrame(Fi),Fi=0;for(let t of fe.values())t.disconnect();fe.clear(),Yt?.disconnect(),Yt=null,Un=null,Bt?.disconnect(),Bt=null,ji=null,C0(),x(Qd),Os(null),je.clear(),Yd.debug("stopped")}});var Kn=new E("Bloom"),dm=!1,B0=Date.now(),D0=[Jl,Kc,eu,ou,cu,pu,Cu,Au,Ru,Fu,Yu,nd,od,fd,Ld,Cd,Od,um];function Wi(t){return new Promise(e=>setTimeout(e,t))}function $0(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function _0(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var fm=8e3,mm=300,q0=250;async function z0(){if(ge())return await Wi(mm),!0;for(;Date.now()-B0<fm;)if(await Wi(q0),ge())return await Wi(mm),!0;return ge()||ta()}function Vs(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function F0(){if(Vs())return!0;let t=Date.now()+fm;for(;Date.now()<t;)if(await Wi(100),Vs())return!0;return Vs()}function j0(){try{GM_registerMenuCommand?.("Bloom++ settings",Zl)}catch{}}function G0(){uo(()=>{Vn("HostShell"),Kn.info("host shell",Q)}),mo(()=>{Kn.info("idle ready",Q)}),fo(()=>{Yi(),Vn("HostReady"),Kn.info("chrome ready",Q)})}async function Ys(){await dl()}async function Xs(){if(dm)return;dm=!0;for(let n of D0)try{xl(n),Nl(n)}catch(r){Kn.error("register failed",n.name,r)}Sl(),Vn("Init"),j0(),G0();let t=()=>Vn("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await $0(),Yi(),Kn.info("styles ready",Q),await _0(),F0().then(n=>{n&&po()}),!await z0()){Kn.warn("late islands not detected; starting default plugins",Q),Xe(),go();return}await Al()}var pm=typeof unsafeWindow<"u"?unsafeWindow:window,U0=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||U0){let t=pm.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",Q);try{Object.defineProperty(pm,"Bloom",{value:Zs,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}Ys().then(()=>Xs()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
