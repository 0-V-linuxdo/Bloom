// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260924] v1.4.80
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

/* Bloom++ [20260924] v1.4.80. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Km=Object.defineProperty;var Wm=(t,e)=>{for(var n in e)Km(t,n,{get:e[n],enumerable:!0})};var Sl={};Wm(Sl,{REPO_URL:()=>nc,Settings:()=>k,VERSION:()=>it,contextKeyFromUrl:()=>Xt,conversationTitle:()=>En,conversationToken:()=>Et,currentConversationId:()=>M,hasDraftText:()=>xt,hasErrorToast:()=>Pt,hasLateIslands:()=>Ae,init:()=>wl,initSettings:()=>El,isDocumentInteractive:()=>oc,isStreaming:()=>J,isUserDraftEmpty:()=>fe,messageCreateTime:()=>ti,plugins:()=>Wt,requestChromeReady:()=>Co,requestIdleReady:()=>mn,requestShellReady:()=>ko,setEditorText:()=>Yt,subscribeHarvest:()=>st,watchStreamingEdge:()=>Q,whenChromeReady:()=>To,whenIdleReady:()=>Lo,whenShellReady:()=>So});var se=new Map,po=!1;function Vm(){return document.getElementById("bloom-root")?.shadowRoot??null}function Ml(){return document.head??null}function ln(){let t=Vm();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=Ym()}function pa(t,e){if(!po)return;let n=Ml();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),ln();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,ln();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,ln()}function w(t,e){let n=se.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},se.set(t,n)),po&&pa(t,n)}function ga(){if(!Ml())return!1;po=!0;for(let[e,n]of se)pa(e,n);return ln(),!0}function Al(t){let e=se.get(t);e&&(e.disabled=!1,po&&pa(t,e))}function Hl(t){let e=se.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),ln())}function E(t){let e=se.get(t);e&&(e.el?.remove(),se.delete(t),ln())}function Ym(){return Array.from(se.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var S=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function y(t){return t}var ba=new Map;function cn(t,e){let n=ba.get(t);return n||(n=new Set,ba.set(t,n)),n.add(e),()=>n.delete(e)}function Me(t,e){let n=ba.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var Xm="bloompp";function Il(){return new Promise((t,e)=>{let n=indexedDB.open(Xm,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function Nl(t){try{let e=await Il();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function Rl(t,e){try{let n=await Il();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function un(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function V(t,e,n){return Math.min(n,Math.max(e,t))}function Pl(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function Ol(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function Bl(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var go=new S("SettingsStore"),le="BloomSettings",Zm=100;function bo(t){return t!=null&&typeof t.then=="function"}function Jm(t){if(t==null||bo(t))return null;if(un(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(un(e)&&!bo(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return un(n)&&!bo(n)?n:null}return null}catch{return null}}function yo(t){let e=Jm(t);if(!e)return null;let n=e.plugins;return!un(n)||bo(n)||Object.keys(n).length===0?null:e}var ho=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let d=l.slice(c.length+1);if(d&&!d.includes(".")){let f=u(d);f!==void 0&&(i[a]=f,s=f);break}}}return un(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){go.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Zm))}save(){try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(le,this.plain)}catch{try{GM_setValue(le,e)}catch(n){go.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(le,e)}catch{}Rl(le,e).catch(n=>go.warn("Failed to save settings to IndexedDB:",n))}catch(e){go.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){Pl(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var Qm=new S("Settings"),tf={plugins:{}},k=new ho(structuredClone(tf)),ef=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function nf(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function L(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?(k.store.plugins[n]||(k.store.plugins[n]={}),k.store.plugins[n]):{}},get plain(){let n=e.pluginName;return n?k.plain.plugins[n]??{}:{}}};return e}async function rf(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function Dl(){let t=yo(await rf(le));if(t||(t=yo(await Nl(le))),!t)try{t=yo(localStorage.getItem(le))}catch{t=null}if(!t)return;let e=t.plugins;e&&(k.plain.plugins=e,Qm.debug("Loaded settings"))}function $l(t,e){e&&(e.pluginName=t,k.plain.plugins[t]||(k.plain.plugins[t]={}),k.setDefaultGetter(ef(t),n=>{if(n!=="enabled")return nf(e.def,n)}))}function _l(){return k.plain.plugins.Settings||(k.store.plugins.Settings={}),k.store.plugins.Settings}function vo(){return _l().pinnedPlugins??[]}function Fl(t){return vo().includes(t)}function ql(t){let e=vo(),n=e.includes(t);return k.store.plugins.Settings={...k.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function xo(){return _l().starredPlugins??[]}function zl(t){return xo().includes(t)}function jl(t){let e=xo(),n=e.includes(t);return k.store.plugins.Settings={...k.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var Eo=new S("PluginManager"),Wt={},ar=new Set;function Kl(t){if(Wt[t.name]){Eo.warn("Duplicate plugin",t.name);return}Wt[t.name]=t,$l(t.name,t.settings)}function dn(t){let e=Wt[t];if(!e)return!1;if(e.required)return!0;let n=k.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function Wl(t){let e=Wt[t];if(!e||e.required)return;let n=!dn(t);k.plain.plugins[t]||(k.store.plugins[t]={}),k.store.plugins[t].enabled=n,n?Vl(e):of(e),Me("pluginToggle",{name:t,enabled:n})}function Vl(t,e=!1){if(!ar.has(t.name)&&dn(t.name))try{t.managedStyle&&Al(t.managedStyle),t.start?.(),ar.add(t.name),t.settings&&k.addPrefixChangeListener(`plugins.${t.name}.`,()=>{ar.has(t.name)&&t.onSettingsChange?.()}),e||Eo.debug("Started",t.name)}catch(n){Eo.error("Failed to start",t.name,n)}}function of(t){if(ar.has(t.name)){try{t.stop?.()}catch(e){Eo.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(Hl(t.managedStyle),E(t.managedStyle)),ar.delete(t.name)}}function sr(t){for(let e of Object.values(Wt))(e.startAt??"DOMContentLoaded")===t&&Vl(e)}var Gl=2,Ul="defaultsRev";function Yl(){let t=k.plain.plugins.Settings;if(!(!t||t[Ul]===Gl)){for(let e of["NoShareLink","NoDictation"]){let n=k.plain.plugins[e];!n||typeof n.enabled=="boolean"||(n.enabled=!1)}t[Ul]=Gl}}var lr=!1,wo=!1,ha=!1,Zl=[],Jl=[],Ql=[];function ya(t){let e=t.splice(0);for(let n of e)n()}function cr(){lr||(lr=!0,ya(Zl))}function va(){wo||(wo=!0,lr||cr(),ya(Jl))}function tc(){ha||(ha=!0,lr||cr(),wo||va(),ya(Ql))}function So(t){lr?t():Zl.push(t)}function Lo(t){wo?t():Jl.push(t)}function To(t){ha?t():Ql.push(t)}function ko(){cr()}function mn(){cr(),va()}function Co(){tc()}function Xl(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function ec(){await Xl(4e3),cr(),await Xl(4e3),va(),tc()}var v={p:"0-V-linuxdo"},it="[20260924] v1.4.80",nc="https://github.com/0-V-linuxdo/Bloom";var af={BetterNavigator:1790233382e3,ChatListStatus:1790233382e3,ChatStateFavicons:1790233382e3,Cleaner:1789910872e3,ComposerOpacity:1789910872e3,CustomSidebarIdentity:1789970413e3,GreetingCustomizer:1789861316e3,InputHistory:1789858186e3,MessageTimestamps:1790230458e3,NoDictation:1789910872e3,NoShareLink:1789910872e3,NoSidebarIdentity:1789910872e3,PromptQueue:1790230458e3,RecentTopics:1790181019e3,ResponseNotification:1790233382e3,Settings:1789973738e3,StreamerMode:1789924346e3,WiderChat:1789910872e3};function rc(t){let e=af[t.name];typeof e=="number"&&e>0&&(t.updatedAt=e)}function sf(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function lf(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function xa(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function Ae(){return xa()?sf()||lf():!1}function oc(){return Ae()}var cf=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),ic=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),uf=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),df="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function pn(t){return t.id==="bloom-root"||!!t.closest(df)}function ac(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function Mo(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function Ea(t){if(!(t instanceof HTMLElement)||!t.isConnected||pn(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&Mo(e)?!1:t.getClientRects().length>0}function fn(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function mf(){let t=[];for(let e of document.querySelectorAll(cf))!(e instanceof HTMLElement)||!e.isConnected||pn(e)||t.push(e);return t}function Ao(t){if(!t.isConnected||pn(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function He(){return mf().filter(Ao)[0]??null}function gn(){let t=document.getElementById("stage-sidebar-tiny-bar");if(!(t instanceof HTMLElement)||!t.isConnected||pn(t))return null;let e=t.getBoundingClientRect();return e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3?null:t}function wa(t){let e=t,n=t.parentElement;n&&n.children.length===1&&!pn(n)&&!fn(n)&&n.parentElement&&!fn(n.parentElement)&&(e=n);let r=e.parentElement;if(r&&!fn(r)&&!pn(r)&&r.children.length>1){let o=r.getAttribute("class")||"";if(/\bflex\b/.test(o)&&!/flex-col/.test(o)&&r.parentElement&&!fn(r.parentElement))return r}return e}function bn(){let t=document.querySelectorAll(ic);for(let n of t)if(Ea(n)&&!Mo(n)&&ac(n))return n;let e=document.querySelectorAll(uf);for(let n of e){if(!Ea(n)||!ac(n)||Mo(n))continue;let r=n.querySelector(ic);return Ea(r)&&!Mo(r)?r:n}return null}function Ho(){let t=He();if(t){let e=wa(t),n=e.parentElement;if(n&&!fn(n))return n;if(!fn(e))return e}return gn()}function Io(t){let e=He();return e?t.composedPath().includes(e):!1}var La=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],ff={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function pf(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function gf(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function Sa(t){let e=pf(t);return e?gf(e)>.55?"light":"dark":null}function bf(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=Sa(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=Sa(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Sa(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function No(t){return t==="auto"?bf():t}function hf(t){try{let e=getComputedStyle(document.documentElement);for(let n of La){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function Ro(t,e,n){let r=ff[e];if(n){hf(t);for(let o of La)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of La)t.style.setProperty(o,r[o])}function sc(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var Ta=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var vf="bloom-root",Ht="bloom-rail-item",$o="bloom-account-item",Ne="bloom-sidebar-panel",yr="bloom-plugin-dialog",Uo="bloom-plugin-layer",_o="bloom-settings-css",xf=2e3,uc=null,Ef=null,me=!1,Aa=[],Po=null,Fo=null,ue=null,Bo=null,Vt=null,gr=null,ur,hn=0,br=0,dr=0,mr=null,fr=null,qo=null,dc=null,pr=null,ka=[],zo=!1,wf=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Sf=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Lf=new Set(["chat","ui","privacy"]),Tf=10080*60*1e3,Ko="",hr="all",At="all";function Wo(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function mc(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function kf(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'}function Cf(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function Mf(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function Af(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var Hf={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function If(t){return t.icon||Hf[t.name]||Wo()}function Ca(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),Ro(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function fc(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function jo(){let t="auto",e=No(t);Ca(uc,e,!0);let n=document.getElementById(Ne);n instanceof HTMLElement&&Ca(n,e,!0);let r=document.getElementById(yr);r instanceof HTMLElement&&Ca(r,e,!0);let o=document.getElementById(Ht);o instanceof HTMLElement&&fc(o),Me("schemeChange",{scheme:e,pref:t})}function pc(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function gc(){if(w("settings",Ta),document.getElementById(_o)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=_o,t.textContent=Ta,document.head.appendChild(t)}function Nf(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Rf(){for(let t of Aa)t();Aa=[]}function bc(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function Pf(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function Na(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function Of(t){return Na(t).length>0}function Do(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function Bf(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=Pf(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function Df(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(Bf(e,n));let i=k.store.plugins[t]??(k.store.plugins[t]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",Aa.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??Do(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??Do(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=bc(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??Do(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function lc(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function $f(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=k.store.plugins[t.name]??(k.store.plugins[t.name]={});for(let[n,r]of Na(t)){if(n==="enabled"||r.type===5)continue;let o=Do(r);o!==void 0&&(e[n]=o)}yc(t)}function hc(t){t.key==="Escape"&&(!document.getElementById(Uo)&&!document.getElementById(yr)||(t.stopPropagation(),yn()))}function _f(){zo||(document.addEventListener("keydown",hc),zo=!0)}function Ff(){zo&&(document.removeEventListener("keydown",hc),zo=!1)}function yn(){Rf(),Ff(),document.getElementById(Uo)?.remove(),document.getElementById(yr)?.remove()}function yc(t){if(yn(),!document.body)return;let e=document.createElement("div");e.id=Uo,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",de),e.addEventListener("pointerup",de),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&yn()});let n=document.createElement("div");n.id=yr,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",de),n.addEventListener("pointerup",de),n.addEventListener("click",de);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=mc(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),yn()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=lc("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=lc("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=Na(t);if(c.length)for(let[u,d]of c){let f=Df(t.name,u,d);f&&l.appendChild(f)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>$f(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),_f(),jo()}function qf(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=If(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=zl(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=Mf(l),c.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let m=jl(t.name);Me("pluginStar",{name:t.name,starred:m})}),s.appendChild(c),!t.required){let b=Fl(t.name),m=document.createElement("button");m.type="button",m.className=`bloom-icon-btn bloom-card-pin${b?" bloom-card-pin-active":""}`,m.setAttribute("aria-label",b?"Unpin from top":"Pin to top"),m.innerHTML=Af(b),m.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();let A=ql(t.name);Me("pluginPin",{name:t.name,pinned:A})}),s.appendChild(m)}if(Of(t)){let b=document.createElement("button");b.type="button",b.className="bloom-icon-btn bloom-card-settings",b.setAttribute("aria-label",`${t.name} settings`),b.innerHTML=Cf(),b.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation(),yc(t)}),s.appendChild(b)}let u=bc(t.name,dn(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",b=>b.stopPropagation()),d?.addEventListener("change",()=>{Wl(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let b=document.createElement("div");b.className="bloom-card-desc",b.textContent=t.description,n.appendChild(b)}let f=document.createElement("div");f.className="bloom-card-separator";let h=document.createElement("div");h.className="bloom-card-footer";let p=document.createElement("div");return p.className="bloom-card-author",p.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",h.appendChild(p),e.append(n,f,h),e}function vc(){return Object.values(Wt).filter(t=>!t.hidden&&t.name!=="Settings")}function zf(t){return t.updatedAt!=null&&Date.now()-t.updatedAt<Tf}function xc(t,e){if(e==="all"||e==="favorites")return!0;if(e==="recent")return zf(t);let n=(t.tags??[]).map(r=>r==="sidebar"?"ui":r);return e==="other"?!t.required&&!n.some(r=>Lf.has(r)):n.includes(e)}function jf(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function Gf(){return Ko.trim()?"No plugins match your search.":At==="favorites"?"No favorites yet. Star a plugin to see it here.":At==="recent"?"No plugins updated in the last 7 days.":"No plugins available."}function Uf(){let t=vc();return Sf.filter(e=>e.id==="favorites"||e.id==="all"||e.id==="recent"?!0:t.some(n=>xc(n,e.id)))}function Kf(){if(pr){pr.replaceChildren();for(let t of Uf()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${At===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{At=t.id,Ie()}),pr.appendChild(e)}}}function Wf(){let t=vc();if(At==="favorites"){let e=new Set(xo());t=t.filter(n=>e.has(n.name))}else At!=="all"&&(t=t.filter(e=>xc(e,At)));return hr==="enabled"&&(t=t.filter(e=>dn(e.name))),hr==="disabled"&&(t=t.filter(e=>!dn(e.name))),t}function Ie(){if(!mr)return;Kf();let t=Wf();qo&&(qo.placeholder=`Search ${t.length} plugins...`);let e=t,n=Ko.trim().toLowerCase();if(n&&(e=e.filter(r=>jf(r).includes(n))),At==="recent")e=e.slice().sort((r,o)=>(o.updatedAt??0)-(r.updatedAt??0)||r.name.localeCompare(o.name));else if(At!=="favorites"){let r=vo();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}mr.replaceChildren();for(let r of e)mr.appendChild(qf(r));fr&&(fr.hidden=e.length>0,fr.textContent=Gf())}function de(t){t.stopPropagation()}function Ma(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function Ra(){document.getElementById(Ht)?.setAttribute("aria-expanded",me?"true":"false")}function Vf(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function Pa(){yn(),Ko="",hr="all",At="all",document.getElementById(Ne)?.remove(),me=!1,Ra()}function Yf(t){let e=document.createElement("div");e.id=t,e.setAttribute("aria-labelledby","bloom-settings-title"),e.addEventListener("pointerdown",de),e.addEventListener("pointerup",de),e.addEventListener("click",de);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=Wo();let a=document.createElement("span");a.className="bloom-settings-title-row";let s=document.createElement("h2");s.id="bloom-settings-title",s.textContent="Bloom++";let l="Toggle features. Some need a reload. Click the sliders icon to configure.",c=document.createElement("button");c.type="button",c.className="bloom-info-hint",c.setAttribute("aria-label",l),c.innerHTML=kf();let u=document.createElement("span");u.className="bloom-info-hint-tip",u.setAttribute("role","tooltip"),u.textContent=l,c.appendChild(u),a.append(s,c),o.append(i,a);let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn bloom-settings-close",d.setAttribute("aria-label","Close"),d.innerHTML=mc(),d.addEventListener("click",Pa),r.appendChild(o),n.appendChild(r);let f=document.createElement("div");f.className="bloom-plugin-tabs",n.appendChild(f);let h=document.createElement("div");h.className="bloom-search-bar";let p=document.createElement("input");p.type="search",p.className="bloom-search-input",p.setAttribute("aria-label","Search plugins"),p.placeholder="Search plugins...",p.addEventListener("input",()=>{Ko=p.value,Ie()});let b=document.createElement("select");b.className="bloom-search-filter",b.setAttribute("aria-label","Filter plugins");for(let A of wf){let I=document.createElement("option");I.value=A.value,I.textContent=A.label,b.appendChild(I)}b.value=hr,b.addEventListener("change",()=>{hr=b.value,Ie()}),h.append(p,b),n.appendChild(h);let m=document.createElement("div");m.className="bloom-plugin-list",n.appendChild(m);let T=document.createElement("p");return T.className="bloom-tab-empty",T.hidden=!0,n.appendChild(T),e.append(d,n),mr=m,fr=T,qo=p,dc=b,pr=f,Ie(),e}function Xf(t){t.classList.add("bloom-rail-dock")}function Zf(){let t=document.getElementById(Ht);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&Ao(t)?t:null}function Jf(){if(document.getElementById(Ne)?.remove(),!document.body)return;let t=Yf(Ne);Xf(t),document.body.appendChild(t),me=!0,yn(),jo(),Ra(),Me("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:it,dock:"center",rail:!!Zf()})}function Oa(){let t=document.getElementById(Ne);if(t instanceof HTMLElement&&t.isConnected&&Vf(t)){Pa();return}t?.remove(),Jf()}function Qf(){let t=document.createElement("button");return t.type="button",t.id=Ht,t.className="bloom-rail-item",t.setAttribute("aria-controls",Ne),t.setAttribute("aria-expanded",me?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${Wo()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Oa()}),t}function cc(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function tp(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function ep(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function ce(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function Ec(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=tp(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&ce(t,"padding-top",Math.round(i)),Number.isFinite(a)&&ce(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));ce(n,"width",l),ce(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&ce(t,"padding-left",u);let d=ep(e,r);if(d){let f=d.getBoundingClientRect(),h=n.getBoundingClientRect(),p=Math.round(f.left-h.right);p>=0&&p<=24&&ce(t,"gap",p)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&ce(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&ce(t,"gap",Math.round(l))}fc(t)}function Ha(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function np(){if(gr?.isConnected&&Vt){Vt.observe(gr,{childList:!0});return}Ia()}function rp(t){if(Ha(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function op(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){dr=0;return}dr+=1,br=Date.now()+Math.min(8e3,250*2**Math.min(dr,5))})}function ip(){hn||Date.now()<br||(hn=requestAnimationFrame(()=>{hn=0,!(Date.now()<br)&&(document.getElementById(Ht)?.isConnected||Go())}))}function Go(){if(!document.body)return;Vt?.disconnect();let t=null,e=!1;try{let n=document.getElementById(Ht);t=n instanceof HTMLButtonElement?n:Qf();let r=He(),o=gn();if(r){let i=wa(r),a=i.parentElement;if(Ha(i)||a&&Ha(a))return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),cc(t),Ec(t,r)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),cc(t,!0)):t.isConnected&&!Ao(t)&&(t.remove(),t=null)}finally{op(t,e),np(),Ra()}}function Ia(){let t=Ho();!t||!rp(t)||gr===t&&Vt||(Vt?.disconnect(),gr=t,Vt=new MutationObserver(()=>{document.getElementById(Ht)?.isConnected||ip()}),Vt.observe(t,{childList:!0}))}function ap(){Go(),Ia(),ur===void 0&&(ur=window.setInterval(()=>{let t=document.getElementById(Ht);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=br&&Go();else{dr=0;let e=He();e&&Ec(t,e)}Ia()},xf))}function sp(){ur!==void 0&&(clearInterval(ur),ur=void 0),hn&&cancelAnimationFrame(hn),hn=0,br=0,dr=0,Vt?.disconnect(),Vt=null,gr=null}function lp(t){Bo===t&&ue||(ue?.disconnect(),Bo=t,ue=new MutationObserver(()=>{if(!t.isConnected){ue?.disconnect(),ue=null,Bo=null;return}wc(t)}),ue.observe(t,{childList:!0}))}function wc(t){if(lp(t),t.querySelector(`#${$o}`))return;let e=document.createElement("button");e.type="button",e.id=$o,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${Wo()}<span>Bloom++</span>`,e.addEventListener("pointerdown",Ma),e.addEventListener("pointerup",Ma),e.addEventListener("click",n=>{Ma(n),Oa()}),t.insertBefore(e,t.firstChild)}function Oo(){let t=bn();return t?(wc(t),!0):!1}function cp(t){Io(t)&&(queueMicrotask(Oo),requestAnimationFrame(()=>{Oo()}),window.setTimeout(Oo,60),window.setTimeout(Oo,180))}function up(){Fo?.abort();let t=new AbortController;Fo=t,document.addEventListener("click",cp,{signal:t.signal})}function dp(){Fo?.abort(),Fo=null,ue?.disconnect(),ue=null,Bo=null}function Sc(){mn(),Nf(()=>{gc(),pc(),Go(),Oa()})}var Lc=y({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[v.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${vf}`,`#${Ht}`,`#${$o}`,`#${Ne}`,`#${Uo}`,`#${yr}`,`#${_o}`,"#bloom-menu-panel"],start(){gc(),pc(),ap(),up(),Po?.(),Po=sc(jo),jo(),ka=[cn("pluginToggle",()=>{me&&Ie()}),cn("pluginPin",()=>{me&&Ie()}),cn("pluginStar",()=>{me&&Ie()})]},stop(){sp(),dp(),Po?.(),Po=null;for(let t of ka)t();ka=[],Pa(),document.getElementById(Ht)?.remove(),document.getElementById($o)?.remove(),document.getElementById(_o)?.remove(),uc=null,Ef=null,mr=null,fr=null,qo=null,dc=null,pr=null,me=!1}});var Vo='form[data-type="unified-composer"], form.w-full[data-type]',It=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),vn=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Tc=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),kc=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),mp=/stop streaming|stop generating|停止生成|停止输出|停止响应/,fp='[contenteditable="false"], button, [role="button"]';function yt(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function Re(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!yt(o)))return o;return null}function Cc(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function B(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=Cc(t);return!!(mp.test(n)||/^stop$/i.test(n))}function vt(){let e=Array.from(document.querySelectorAll(Vo)).find(yt);if(e instanceof HTMLElement)return e;let n=Re(document,It),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function Y(){let t=Array.from(document.querySelectorAll(It));return t.find(yt)??t[0]??null}function pp(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(fp);return!!n&&n!==e&&e.contains(n)}function Ba(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&pp(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function xt(t){let e=t??Y();return e?Ba(e,e).replaceAll("\u200B","").trim().length>0:!1}function fe(t){return!xt(t)}function Yo(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function Mc(t){let e=vt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!yt(n))&&t(n))return n;return null}function pe(){let t=vt(),e=Re(t,vn)??Re(document,vn);return e&&!B(e)?e:Mc(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!B(n);let o=Cc(n);return/^(send|send prompt|发送)$/i.test(o)&&!B(n)})}function Pe(){let t=vt(),e=Re(t,Tc,!0)??Re(document,Tc,!0);if(e)return e;let n=Re(t,kc)??Re(document,kc);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&yt(r)&&B(r))return r}return Mc(B)}function at(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>Ba(n,t)).join(`
`):Ba(t,t)}function Da(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function Yt(t,e,n=!1){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),Da(t,n)}var Ac=/\/c\/([a-zA-Z0-9_-]{8,})/i;function Et(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function Xt(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function Zt(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(Ac)?.[1]??""}catch{return t.match(Ac)?.[1]??""}}function M(){return Zt(location.pathname)}var Rc=new S("Harvest"),gp=1500,bp=200,Xo=new Set,Zo=new Map,Jo=new Map,xn=null,Qo=null,vr=null,Nt=0;function hp(){return typeof unsafeWindow<"u"?unsafeWindow:window}function yp(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function vp(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}function Pc(t){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(t)}var xp=/"action"\s*:\s*"(next|continue|variant)"/i;function Ep(t,e,n){return!(e!=="POST"||Pc(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!xp.test(n))}function wp(t,e){return e!=="GET"||Pc(t)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(t)}function Hc(t){return t.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function Oc(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function Sp(t){return typeof t=="string"?Oc(t):""}function $a(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return $a(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function Bc(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function Ic(t,e,n){!t||!e||Jo.get(t)!==e&&(Jo.set(t,e),Bc(Jo,gp),ge({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function Lp(t,e){let n=e.trim();!t||!n||Zo.get(t)!==n&&(Zo.set(t,n),Bc(Zo,bp),ge({type:"conversation-meta",conversationId:t,title:n}))}function xr(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)xr(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&Lp(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=$a(l.create_time??l.createTime??l.created_at);c&&u&&Ic(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=$a(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&Ic(a,s,o),r.mapping&&typeof r.mapping=="object")xr(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&xr(l,o,n+1)}function Nc(t,e){if(t)try{xr(JSON.parse(t),e)}catch{}}function ge(t){for(let e of Array.from(Xo))try{e(t)}catch{}}async function Tp(t,e,n){if(n===Nt)try{let r=await t.json();if(n!==Nt)return;xr(r,e)}catch{}}async function kp(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===Nt&&ge({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===Nt;){let{done:u,value:d}=await s.read();if(u)break;if(c+=l.decode(d,{stream:!0}),!o){let h=Oc(c);h&&(o=h,ge({type:"post-start",conversationId:o,url:""}))}let f=c.split(`
`);c=f.pop()??"";for(let h of f){let p=h.replace(/^data:\s*/,"").trim();!p||p==="[DONE]"||Nc(p,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===Nt&&Nc(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===Nt&&ge({type:"post-end",conversationId:o,error:i})}function Cp(t,e,n){let r=yp(e),o=vp(e,n),i=wp(r,o),a=Ep(r,o,n?.body),s=Nt,l="";return a&&(l=Sp(n?.body)||Hc(r)||Zt(r)||M(),ge({type:"post-start",conversationId:l,url:r})),t(e,n).then(c=>{if(s!==Nt||!i&&!a)return c;try{let u=c.clone();i?Tp(u,Hc(r)||M(),s):kp(u,l,!c.ok,s)}catch{a&&ge({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===Nt&&ge({type:"post-end",conversationId:l,error:!0}),c})}function Mp(){if(xn)return;let t=hp();vr=t,xn=t.fetch.bind(t);let e=(n,r)=>Cp(xn,n,r);Qo=e,t.fetch=e,Rc.debug("conversation fetch harvest hooked")}function Ap(){Nt+=1,!(!xn||!vr)&&(Qo&&vr.fetch===Qo&&(vr.fetch=xn),xn=null,Qo=null,vr=null,Rc.debug("conversation fetch harvest unhooked"))}function st(t){return Xo.add(t),Mp(),()=>{Xo.delete(t),Xo.size===0&&Ap()}}function En(t){return t?Zo.get(t)??"":""}function ti(t){return t?Jo.get(t)??null:null}var $c=new S("Streaming");function Tr(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!yt(e))&&(B(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function Hp(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&yt(t))}function Ip(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&yt(t))}function Np(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Pt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function J(){if(Pe()||Tr()||Np())return!0;let t=pe();return t&&yt(t)&&!B(t)?!1:!!(Hp()||Ip())}var Rp=400,Dc=3,$e=new Set,Er,wr=null,_a=null,Be=!1,Oe=0,he="",ye="",ve=!1,Sr=!1,Lr=!1,Rt=!1,q=null,lt="",De=!1;function X(){return Rt}function _c(){return ve}function ri(){return lt}function Fa(){return M()||lt}function Fc(){return Xt(Et())}function ei(t,e){return{streaming:t,contextKey:e,conversationId:Fa()}}function qa(t){try{let e=t.split("|")[0]||"";return new URL(e).pathname.replace(/\/$/,"")||"/"}catch{return""}}function Pp(t){return!t||t==="/"||t.startsWith("/g/")}function $(t,e){if(!t||t===e)return!1;let n=Zt(qa(e)||e);return!n||!(t.endsWith("|draft")||Pp(qa(t)))?!1:lt?n===lt:De}function ni(){Be=!1,Oe=0,he="",ve=!1,Sr=!1,Lr=!1,lt="",De=!1}function Op(t){for(let e of Array.from($e))try{e.onFall?.(t)}catch{}}function Bp(t){for(let e of Array.from($e))try{e.onRise?.(t)}catch{}}function be(t){for(let e of Array.from($e))try{e.onTick?.(t)}catch{}}function Dp(t,e){for(let n of Array.from($e))try{n.onContext?.(t,e)}catch{}}function $p(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&B(n)&&(ve=!0)}function _p(t){if(t.type==="post-start"){let n=M();if(!t.conversationId){n||(De=!0),(!n||n===lt)&&(Rt=!1,ve=!1);return}if(!(t.conversationId===n||t.conversationId===lt)&&!(!n&&De))return;lt=t.conversationId,De=!1,Rt=!1,ve=!1;return}if(t.type!=="post-end"||!Be&&!q)return;let e=M();t.conversationId&&!(e?t.conversationId===e:t.conversationId===lt)||(Lr=!0,t.error&&(Sr=!0,q&&(q.error=!0)))}function Fp(){let t=Fc(),e=J();if(ye&&t&&ye!==t){let o=ye;if(!$(o,t))q=null,ni(),Rt=e;else{let i=Zt(qa(t));if(i&&!lt&&(lt=i,De=!1),he===o&&(he=t),q&&q.contextKey===o){q.contextKey=t;let a=Fa();a&&(q.conversationId=a)}Rt=!1}if(ye=t,Dp(t,o),Rt){be(ei(!1,t));return}}else t&&(ye=t);if(Rt){if(e){be(ei(!1,t));return}Rt=!1}if(q)if(e||q.contextKey!==t)q=null;else{let o=q;q=null,ni(),Op(o),be(ei(!1,t));return}let n=ei(e,t);if(e){let o=!Be;o&&(ve=!1,Sr=!1,Lr=!1),Be=!0,Oe=0,he=t,o&&Bp(n),be(n);return}if(!Be){be(n);return}if(Oe+=1,Lr&&(Oe=Math.max(Oe,Dc)),Oe<Dc){be(n);return}if(!(!!he&&he===t)){ni(),be(n);return}q={contextKey:he||t,conversationId:Fa(),userStopped:ve,error:Sr||Pt()},be(n)}function qp(){Er===void 0&&(Be=J(),ye=Fc(),he=Be?ye:"",Oe=0,ve=!1,Sr=!1,Lr=!1,Rt=!1,q=null,lt="",De=!1,wr?.abort(),wr=new AbortController,document.addEventListener("click",$p,{capture:!0,signal:wr.signal}),_a=st(_p),Er=setInterval(Fp,Rp),$c.debug("watchStreamingEdge started"))}function zp(){$e.size||(Er!==void 0&&(clearInterval(Er),Er=void 0),wr?.abort(),wr=null,_a?.(),_a=null,ni(),ye="",Rt=!1,q=null,$c.debug("watchStreamingEdge stopped"))}function Q(t){let e=typeof t=="function"?{onFall:t}:t;return $e.add(e),qp(),()=>{$e.delete(e),zp()}}var qc="bloom-host-icon",kr="data-bloom-host-rel",za="not all",ja=0,zc=0,jp=400;function jc(t){ja+=1;try{t()}finally{ja-=1}}function oi(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function xe(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function Gc(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function Gp(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Up(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-zc<jp||(zc=n,t.appendChild(e))}function Kp(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||oi(n)&&(n.getAttribute(kr)||n.setAttribute(kr,n.rel),n.media!==za&&(n.media=za),n.rel!==qc&&(n.rel=qc))}function Wp(t){for(let e of t.querySelectorAll(`link[${kr}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(kr);n&&(e.rel=n),e.removeAttribute(kr),e.media===za&&e.removeAttribute("media")}}function Uc(t,e){let{head:n}=document;!n||!e||jc(()=>{Kp(n,t);let r=Gc(t),{type:o,sizes:i}=Gp(e);r?Up(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function Kc(t,e){let{head:n}=document;n&&jc(()=>{Gc(t)?.remove(),Wp(n)})}function Wc(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(ja)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:oi(c.target)&&(a=!0,xe(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)oi(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)oi(u)&&u.id!==t&&(a=!0,xe(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var Vp=["original","badge","dot","hole","bg"],Xc=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],Zc={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},ii="#FCFCFC",Yp="#111111",Vc="#111111",Xp="#ffffff",Zp="#212121",Jp="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Qp={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},ai=32,Yc=64;function Jc(t){return typeof t=="string"&&Vp.includes(t)}function tg(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function si(t){let e=document.createElement("canvas");e.width=ai,e.height=ai;let n=e.getContext("2d");return n?(n.scale(ai/Yc,ai/Yc),t(n),e.toDataURL("image/png")):""}function eg(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function li(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(Jp);n&&(t.strokeStyle=Yp,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function ng(t,e,n){let r=Zc[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=Vc,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=Vc,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=Xp,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function Cr(t,e){if(t==="original")return e==="wait"?si(r=>li(r,ii)):tg(Qp[e]);let n=e==="wait"?void 0:Zc[e];return si(t==="hole"?r=>li(r,n??ii):t==="bg"?r=>{r.fillStyle=n??Zp,eg(r,0,0,64,64,14),r.fill(),li(r,ii,!1)}:r=>{li(r,ii),e!=="wait"&&ng(r,e,t==="dot"?"dot":"badge")})}function Qc(t){return{wait:Cr(t,"wait"),rotate:Cr(t,"rotate"),done:Cr(t,"done"),ready:Cr(t,"ready"),error:Cr(t,"error")}}var rg=new S("ChatStateFavicons"),Fe="bloom-chat-state-favicon",ou=["input","beforeinput","cut","paste","compositionend"],iu=L({style:{type:3,description:"Favicon overlay",options:Xc}}),Ot="",Ka={wait:"",rotate:"",done:"",ready:"",error:""},Mr="wait",tt=!1,z=!1,N=null,nt="",ct="",ze=!0,di=!1,wn=null,ut=0,ci=null,ui=null,_e=null,Ua=null,Sn=null,wt=!1,tu=new WeakSet;function og(){let t=iu.store.style;return Jc(t)?t:"bg"}function au(){let e=document.querySelector(`link[rel~="icon"]:not(#${Fe}), link[data-bloom-host-rel]:not(#${Fe})`)?.href;return xe(e)?e:xe(Ot)?Ot:""}function ig(){let t=document.getElementById(Fe);return t instanceof HTMLLinkElement?t:null}function ag(){if(!xe(Ot)){let t=au();t&&(Ot=t)}return xe(Ot)?Ot:Ka.wait}function su(t){return t==="wait"?ag():Ka[t]}function lu(){Uc(Fe,su(Mr))}function O(t){let e=su(t);if(Mr===t){let n=ig();if(n&&n.getAttribute("href")===e)return}Mr=t,lu()}function eu(){Ka=Qc(og()),O(Mr)}function Wa(){return Xt(Et())}function Va(t,e){!t||!e||t===e||(N===t&&(N=e),nt===t&&(nt=e),ct===t&&(ct=e))}function sg(){let t=Wa();if(!(J()||tt||z))return nt="",t;if(nt&&t&&nt!==t)if($(nt,t))Va(nt,t),nt=t;else return nt="",t;else!nt&&t&&(nt=t);return nt||t}function nu(t){return!N||!t?!1:N===t?!0:$(N,t)}function cu(){tt=!1,z=!1,N=null,nt=""}function uu(t){ct=t,cu(),ze=!1,di=!0,O("wait")}function Ga(t){return!t&&ze}function lg(){if(!wt)return;let t=Wa();if(ct&&t&&ct!==t&&!$(ct,t)){uu(t);return}ct&&t&&$(ct,t)&&Va(ct,t),t&&(ct=t);let e=J(),n=e&&!X();if(di){if(X()){O("wait");return}di=!1}if(X()){O("wait");return}let r=sg(),o=fe();if(_c()&&!e){tt=!1,z=!1,N=null,O(o?"wait":Ga(o)?"ready":"wait");return}if(Pt()&&!e&&tt){O("error"),tt=!1,z=!1,N=null;return}if(n){tt||(ze=!1),tt=!0,z=!1,N=r,O("rotate");return}if(tt)if(!nu(t))tt=!1,z=!1,N=null;else if(z){tt=!1,z=!0,N=t||r,O("done");return}else{O("rotate");return}if(z)if(N&&t&&!nu(t))z=!1,N=null;else if(o){N=r||N,O("done");return}else if(Ga(o)){z=!1,O("ready");return}else{z=!1,O("wait");return}N=null,o?O("wait"):Ga(o)?O("ready"):O("wait")}function qe(){wt&&(gu(),mu(),fu(),lg())}function du(){if(Sn){for(let t of ou)Sn.removeEventListener(t,pu,!0);Sn=null}}function mu(){let t=vt(),e=t&&t!==document.body?t:null;if(!(Sn===e&&e?.isConnected)&&(du(),!!e)){Sn=e;for(let n of ou)Sn.addEventListener(n,pu,{capture:!0,passive:!0})}}function fu(){let t=vt();if(!(_e&&Ua===t&&t.isConnected)){if(_e?.disconnect(),Ua=t,!t||t===document.body){_e=null;return}_e=new MutationObserver(()=>mi()),_e.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function mi(){if(wt){if(document.hidden){ut&&(cancelAnimationFrame(ut),ut=0),qe();return}ut||(ut=requestAnimationFrame(()=>{ut=0,wt&&qe()}))}}function pu(){xt()&&(ze=!0),mi()}function ru(){xt()&&(ze=!0),mi()}function cg(){wt&&(ut&&(cancelAnimationFrame(ut),ut=0),qe())}function ug(){wt&&(ze=!1,qe())}function dg(t){if(!wt)return;if(t.userStopped){tt=!1,z=!1,N=null,O("wait");return}if(t.error){tt=!1,z=!1,N=null,O("error");return}let e=Wa();if(t.contextKey&&e&&t.contextKey!==e&&!$(t.contextKey,e)){tt=!1,z=!1,N=null,O("wait");return}tt=!1,z=!0,N=e||t.contextKey,O("done")}function mg(){wt&&qe()}function fg(t,e){if(wt){if($(e,t)){Va(e,t),ct=t,qe();return}uu(t)}}function gu(){let t=Y();!t||tu.has(t)||(tu.add(t),t.addEventListener("input",ru,{capture:!0,passive:!0}),t.addEventListener("compositionend",ru,{capture:!0,passive:!0}))}var bu=y({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:iu,startAt:"DOMContentLoaded",cleanupSelectors:[`#${Fe}`],start(){wt=!0,Ot=au()||Ot,eu(),ui?.disconnect(),ui=Wc(Fe,t=>{xe(t)&&(Ot=t),lu()}),wn?.abort(),wn=new AbortController,window.addEventListener("popstate",mi,{signal:wn.signal}),document.addEventListener("visibilitychange",cg,{signal:wn.signal}),gu(),mu(),fu(),ci?.(),ci=Q({onRise:ug,onFall:dg,onTick:mg,onContext:fg}),qe(),rg.debug("favicon watch started")},stop(){wt=!1,ut&&cancelAnimationFrame(ut),ut=0,ci?.(),ci=null,wn?.abort(),wn=null,du(),_e?.disconnect(),_e=null,Ua=null,ui?.disconnect(),ui=null,cu(),ct="",ze=!0,di=!1,Mr="wait",Kc(Fe,Ot)},onSettingsChange:eu});var hu=`.bloom-ih-hud {
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
`;var gx=new S("InputHistory"),Ya=/\u200B/g,yu=10,vu=500,xu=100,gg=8,bg=120,hg=2e3,fi=10,pi=L({maxEntries:{type:4,description:"Max stored prompts",min:yu,max:vu,default:xu},history:{type:5,description:"Stored prompts",render:Ng},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Xa=new Map,j=0,Za="",Bt=!1,Hr=!1,ts=0,Ar=null,Ja,es=null,Eu=!0;function St(){let t=pi.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function wu(t){let e=V(Number(pi.store.maxEntries??xu),yu,vu);return t.length>e?t.slice(t.length-e):t}function gi(t){pi.store.entries=wu(t)}function yg(t){return t.replaceAll(Ya,"").replace(/\n$/,"").trim()}function Qa(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(It);return n instanceof HTMLElement?n:Y()}function vg(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!at(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(Ya,"").trim().length===0,last:i.toString().replaceAll(Ya,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Su(t){clearTimeout(Ja),Ja=setTimeout(()=>{if(t!==ts)return;Hr=!1;let e=es;e&&Da(e,Eu)},bg)}function Lu(t,e,n){Hr=!0,es=t,Eu=n;let r=++ts;Yt(t,e,n),Su(r)}function xg(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function Ln(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Eg(){document.querySelector(".bloom-ih-hud")?.remove()}function wg(t,e){let n=xg();n.textContent=t;let r=(e.closest("form")??vt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-gg)}px`,n.classList.add("bloom-ih-hud-on")}function ns(t){let e=yg(t);if(!e)return;let n=Date.now(),r=Xa.get(e);if(r&&n-r<hg)return;Xa.set(e,n);let o=St().filter(i=>i!==e);o.push(e),gi(o),j=St().length,Bt=!1,Ln()}function Sg(t,e){let n=St();if(!n.length&&t)return;j>=n.length&&(Za=at(e),j=n.length);let r=t?j-1:j+1;r<0||r>n.length||(j=r,Bt=!0,Lu(e,r===n.length?Za:n[r],t),r<n.length?wg(`${r+1} / ${n.length}`,e):Ln())}function Lg(t){Bt=!1,Ln(),Lu(t,Za,!1),j=St().length}function Tg(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=Qa(t.target)??Qa(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&Bt&&!t.altKey&&!t.shiftKey){Lg(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){ns(at(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=St();if(!r){let i=vg(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||j<=0)||!n&&j>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),Sg(n,e))}function kg(t){if(Qa(t.target)){if(Hr){Su(ts);return}Bt&&(Bt=!1,Ln(),j=St().length)}}function Cg(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(It);n instanceof HTMLElement&&ns(at(n))}function Mg(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(vn);if(!n||!(n instanceof HTMLElement)||B(n))return;let r=Y();r&&ns(at(r))}function Ag(t){if(!(!Bt||Hr)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}Bt=!1,Ln()}}function Hg(){if(Ar)return;Ar=new AbortController;let{signal:t}=Ar,e={capture:!0,signal:t};window.addEventListener("keydown",Tg,e),window.addEventListener("input",kg,e),window.addEventListener("submit",Cg,e),window.addEventListener("click",Mg,e),window.addEventListener("pointerdown",Ag,e)}function Ig(t){let e=St().slice();e.splice(t,1),gi(e),j>e.length&&(j=e.length)}function Ng(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=St().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(m=>m.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/fi));n>=l&&(n=l-1);let c=s.slice(n*fi,n*fi+fi);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let m=document.createElement("div");m.className="bloom-ih-list",c.forEach((T,A)=>{let I=i.indexOf(T),Ut=St().length-1-I,Mt=document.createElement("div");Mt.className="bloom-ih-item";let et=document.createElement("button");et.type="button",et.className=`bloom-ih-body${r===A?"":" bloom-ih-clamp"}`,et.textContent=T,et.addEventListener("click",()=>{r=r===A?-1:A,o()});let R=document.createElement("div");R.className="bloom-ih-actions";let ot=document.createElement("button");ot.type="button",ot.title="Copy",ot.textContent="C",ot.addEventListener("click",()=>{Ol(T)});let Kt=document.createElement("button");Kt.type="button",Kt.title="Delete",Kt.textContent="\xD7",Kt.addEventListener("click",()=>{Ig(Ut),o()}),R.append(ot,Kt),Mt.append(et,R),m.appendChild(Mt)}),t.appendChild(m)}else{let m=document.createElement("p");m.className="bloom-ih-empty",m.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(m)}let d=document.createElement("div");d.className="bloom-ih-pager";let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Prev",f.disabled=n<=0,f.addEventListener("click",()=>{n-=1,o()});let h=document.createElement("span");h.textContent=`${n+1} / ${l}`;let p=document.createElement("button");p.type="button",p.className="bloom-ih-btn",p.textContent="Next",p.disabled=n+1>=l,p.addEventListener("click",()=>{n+=1,o()});let b=document.createElement("button");b.type="button",b.className="bloom-ih-clear",b.textContent="Clear all",b.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(gi([]),j=0,o())}),d.append(f,h,p,b),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var Tu=y({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:pi,startAt:"HostReady",managedStyle:"inputHistory",start(){w("inputHistory",hu),j=St().length,Bt=!1,Hg()},stop(){Ar?.abort(),Ar=null,Ln(),Eg(),Xa.clear(),clearTimeout(Ja),Hr=!1,es=null,Bt=!1},onSettingsChange(){let t=St(),e=wu(t);e.length!==t.length&&gi(e),j>e.length&&(j=e.length)}});var rs="noShareLink",Rg=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],Pg=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],os=L({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function ku(t){return`${t.join(",")}{display:none!important}`}function Cu(){let t=[];if(os.store.hideShareChat!==!1&&t.push(ku(Rg)),os.store.hideShareProject!==!1&&t.push(ku(Pg)),!t.length){E(rs);return}w(rs,t.join(`
`))}var Mu=y({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:os,start:Cu,onSettingsChange:Cu,stop(){E(rs)}});var Iu="noDictation",Og=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],Bg=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Nu=L({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Au(t){return`${t.join(",")}{display:none!important}`}function Hu(){let t=[Au(Og)];Nu.store.hideDictationSettings!==!1&&t.push(Au(Bg)),w(Iu,t.join(`
`))}var Ru=y({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Nu,start:Hu,onSettingsChange:Hu,stop(){E(Iu)}});var is="noSidebarIdentity",Tn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Bu=Tn.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),Du=Tn.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),Dg=[...Bu,...Du],$g=[...Bu,...Tn.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],_g=Tn.map(t=>`${t} a[href^="mailto:"]`),Fg=Tn.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),qg=Tn.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),Ir=L({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function Pu(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function zg(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function jg(){return`${qg.join(",")}{margin-block:auto!important}`}function Gg(){return`${Fg.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function Ou(){let t=Ir.store.hideUsername!==!1,e=Ir.store.hideEmail!==!1,n=t&&Ir.store.enlargePlan!==!1,r=t&&Ir.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(zg([...$g,...Du])),o.push(jg())):o.push(Pu(Dg))),e&&o.push(Pu(_g)),n&&o.push(Gg()),!o.length){E(is);return}w(is,o.join(`
`))}var $u=y({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Ir,start:Ou,onSettingsChange:Ou,stop(){E(is)}});var _u=`#bloom-rt-host {
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
`;var zu=new S("RecentTopics"),Mn="bloom-rt-host",ju="home",Gu=/^\/c\/([a-z0-9_-]{8,})/i,Kg=/\/c\/([a-z0-9_-]{8,})/i,Uu=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Wg=new Set(["Backquote","IntlBackslash"]),Vg=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Yg=140,Xg=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),G=L({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Xg},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),bi=null,hi=null,rt=!1,Dr=!1,Nr=!1,Dt=0,je="",kn=null,Rr=null,Cn,as=null,ss=null;function Zg(){let t=Number(G.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function Pr(){let t=G.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function cs(){let t=G.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Ku(){let t=G.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function us(){let t=G.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function vi(t){let e=Zg();return t.length>e?t.slice(0,e):t}function $t(t){return t===ju}function Or(t,e=Yg){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function ds(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(Gu)?.[1]??""}catch{return t.match(Kg)?.[1]??""}}function Ge(){let t=(location.pathname||"/").match(Gu);if(t?.[1])return t[1];let n=Et().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return ju}function ms(t){if($t(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(ds(r.getAttribute("href")||"")!==t)continue;let o=Or(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return Ge()===t&&e&&!/^ChatGPT$/i.test(e)?Or(e,80):""}function Jg(t){if($t(t))return"New chat";let e=cs()[t];if(e)return e;let n=En(t);return n||ms(t)||"Chat"}function Qg(t){return us()[t]||""}function tb(t){return Ku()[t]||{}}function fs(t,e){if(!t||$t(t)||!e||/^new chat$/i.test(e.trim()))return;let n=cs();n[t]!==e&&(n[t]=e,G.store.titles=n)}function eb(t){t.type==="conversation-meta"&&(fs(t.conversationId,t.title),rt&&An())}function nb(t,e){if(!t||$t(t)||!e)return;let n=us();n[t]!==e&&(n[t]=e,G.store.projects=n)}function rb(t,e){if(!t||$t(t)||!e.user&&!e.assistant)return;let n=Ku(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,G.store.previews=n)}function ps(t){if(!t||$t(t)&&G.store.includeHome===!1)return;let e=Pr().filter(n=>n!==t);e.unshift(t),G.store.visits=vi(e)}function xi(){let t=G.store.includeHome!==!1;return vi(Pr().filter(n=>t||!$t(n))).map(n=>({id:n,title:Jg(n),project:Qg(n),preview:tb(n)}))}function Fu(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return Or(o)}catch{return""}}function Br(t){if(!t||$t(t)||t!==Ge())return;let e=ms(t);e&&fs(t,e);let n=Fu("user"),r=Fu("assistant");rb(t,{user:n,assistant:r});let o=Vu(t);if(o){let i=Wu(o);i&&nb(t,i)}}function gs(){let t=cs(),e=us(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${Mn}, #bloom-root, #bloom-sidebar-panel`))continue;let u=ds(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=Or(c.textContent||"",80);d&&!Uu.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let f=Wu(c);f&&e[u]!==f&&(e[u]=f,i=!0)}}catch{}o&&(G.store.titles=t),i&&(G.store.projects=e);let a=Pr(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(G.store.visits=vi([...a,...l]))}function Wu(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=Or((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!Uu.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function Vu(t){if($t(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(ds(e.getAttribute("href")||"")===t)return e}catch{}return null}function ob(t){let e=Vu(t);if(e){e.click();return}if($t(t)){location.assign("/");return}location.assign(`/c/${t}`)}function ib(){let t=Ge();je&&je!==t&&Br(je),je=t,ps(t),gs();let e=ms(t);e&&fs(t,e),Br(t)}function yi(){Cn===void 0&&(Cn=window.setTimeout(()=>{Cn=void 0,ib()},120))}function ab(){kn||(kn=history.pushState.bind(history),Rr=history.replaceState.bind(history),history.pushState=function(...e){let n=kn(...e);return yi(),n},history.replaceState=function(...e){let n=Rr(...e);return yi(),n})}function sb(){kn&&(history.pushState=kn),Rr&&(history.replaceState=Rr),kn=null,Rr=null}function lb(t){return Wg.has(t.code)||t.keyCode===192?!0:Vg.has(t.key)}function Yu(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function cb(t,e){Dr=e,gs(),Br(Ge()),rt=!0,Dt=0;try{let n=Ge();ps(n);let r=xi();r.length>1&&(Dt=t?r.length-1:1)}catch(n){zu.error("Failed to open switcher:",n)}An()}function qu(t){let{length:e}=xi();e&&(Dt=(Dt+(t?-1:1)+e)%e,An())}function bs(){if(!rt)return;let t=xi()[Dt];rt=!1,Dr=!1,An(),t&&ob(t.id)}function Xu(){rt&&(rt=!1,Dr=!1,An())}function ub(t){if(Yu(t)){Nr=!0;return}if((t.ctrlKey||Nr)&&!t.altKey&&!t.metaKey&&lb(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{rt?qu(t.shiftKey):cb(t.shiftKey,!0)}catch(n){zu.error("Hotkey failed:",n)}return}if(rt){if(t.key==="Escape"){t.preventDefault(),Xu();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),bs();return}t.key==="Tab"&&(t.ctrlKey||Nr)&&(t.preventDefault(),qu(t.shiftKey))}}function db(t){Yu(t)&&(Nr=!1,rt&&Dr&&bs())}function mb(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(yi)}function fb(t){!rt||(t.target instanceof Element?t.target:null)?.closest(`#${Mn}`)||Xu()}function pb(){document.visibilityState==="hidden"&&Br(Ge())}function ls(t=hi){t instanceof HTMLElement&&Ro(t,No("auto"),!0)}function gb(){if(!document.body)return null;let t=document.getElementById(Mn);if(t instanceof HTMLElement)return hi=t,ls(t),t;t=document.createElement("div"),t.id=Mn;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),hi=t,ls(t),t}function An(){let t=gb();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!rt){e.dataset.visible="false",e.replaceChildren();return}let n=xi();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}Dt>=n.length&&(Dt=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===Dt?"true":"false",s.setAttribute("aria-selected",a===Dt?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{Dt=a,bs()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function bb(){document.getElementById(Mn)?.remove(),hi=null}var Zu=y({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${Mn}`],settings:G,start(){w("recentTopics",_u),je=Ge(),ps(je),gs(),Br(je),as=st(eb),ab(),bi=new AbortController;let{signal:t}=bi;window.addEventListener("keydown",ub,{capture:!0,signal:t}),window.addEventListener("keyup",db,{capture:!0,signal:t}),window.addEventListener("popstate",yi,{signal:t}),document.addEventListener("click",mb,{capture:!0,signal:t}),document.addEventListener("click",fb,{signal:t}),document.addEventListener("visibilitychange",pb,{signal:t}),ss=cn("schemeChange",()=>ls())},stop(){bi?.abort(),bi=null,Cn!==void 0&&(clearTimeout(Cn),Cn=void 0),sb(),as?.(),as=null,ss?.(),ss=null,rt=!1,Dr=!1,Nr=!1,bb()},onSettingsChange(){let t=vi(Pr());t.length!==Pr().length&&(G.store.visits=t),rt&&An()}});var hs="cleaner",hb=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],yb=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],vb=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],xb=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],Eb=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],wb=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],Ue=L({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function Hn(t){return`${t.join(",")}{display:none!important}`}function Ju(){let t=[];if(Ue.store.hideDownloadApps!==!1&&t.push(Hn(hb)),Ue.store.hideDisclaimer!==!1&&t.push(Hn(yb)),Ue.store.hideUpgrade!==!1&&t.push(Hn(vb)),Ue.store.hideLockedModels!==!1&&t.push(Hn(xb)),Ue.store.hideHomePromo!==!1&&t.push(Hn(Eb)),Ue.store.hideAds!==!1&&t.push(Hn(wb)),!t.length){E(hs);return}w(hs,t.join(`
`))}var Qu=y({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Ue,start:Ju,onSettingsChange:Ju,stop(){E(hs)}});var wi=new S("ResponseNotification"),Nn=L({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:Ab},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),ys=!1,Ei=null,In=null,$r=null;function Sb(){return document.visibilityState==="hidden"||document.hidden}function Lb(){return Nn.store.onlyWhenHidden===!1?!0:Sb()}function Tb(){let t=En(M());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function td(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!In||In.state==="closed")&&(In=new t);let e=In,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){wi.debug("chime failed",t)}}function kb(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){wi.debug("custom sound failed",e),td()}}function ed(){let t=String(Nn.store.soundUrl||"").trim();t?kb(t):td()}function Cb(){let t="Bloom++",e=`${Tb()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){wi.debug("notification failed",n)}}function Mb(){Lb()&&(Nn.store.sound!==!1&&ed(),Nn.store.browserNotification!==!1&&Cb())}function Ab(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>ed()),t.appendChild(e),()=>{e.remove()}}var nd=y({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Nn,start(){ys=!0,Ei?.(),Ei=Q(t=>{if(!ys||t.userStopped||t.error)return;let e=M()||ri();t.conversationId&&t.conversationId!==e||Mb()}),$r?.abort(),$r=new AbortController,Nn.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:$r.signal}),wi.debug("watch started")},stop(){ys=!1,Ei?.(),Ei=null,$r?.abort(),$r=null;try{In?.close()}catch{}In=null}});var rd=`#bloom-pq-chip {
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
`;var qr=new S("PromptQueue"),xs="bloom-pq-chip",od="promptQueue",id=80,Ib=50,Nb=2e3,cd=L({replacePending:{type:2,description:"Replace the queued prompt if you Enter again while one is waiting.",default:!0}}),U=new Map,Jt=!1,Lt="",F="",Qt=!1,Tt=!1,_=null,_r=null,Si=null,Ee,Fr,Rn=null;function Pn(){return Xt(Et())}function On(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function ad(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(It);return n instanceof HTMLElement?n:Y()}function Es(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function ud(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function Rb(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?On(e.innerText||e.textContent||""):""}catch{return""}}function sd(t){if(!Lt||Lt===t)return;let e=U.get(Lt);!e||U.has(t)||$(Lt,t)&&(U.delete(Lt),U.set(t,e),F===Lt&&(F=t),_?.key===Lt&&(_.key=t),qr.debug("migrated pending",Lt,"\u2192",t))}function ws(t){let e=Pn();if(U.get(e)&&cd.store.replacePending===!1)return;U.set(e,{text:t,at:Date.now()}),_={key:e,text:t,turns:ud(),ticks:3};let r=Y();r&&Yt(r,""),we(),qr.debug("queued",e,t.length)}function Pb(t){U.delete(t),F===t&&(F=""),_?.key===t&&(_=null),we()}function Ob(){Tt=!0,clearTimeout(Fr),Fr=setTimeout(()=>{Tt=!1,Fr=void 0},Nb)}function Bb(){let t=Pn(),e=U.get(t);if(!e)return;let n=Y();if(!n)return;U.delete(t),F="",we(),Ob(),Yt(n,e.text);let r=pe();r&&!B(r)&&!Yo(r)&&(r.click(),Tt=!1)}function ld(t){if(!Jt||Qt||J()||Pn()!==t)return;let e=U.get(t);if(!e){F="";return}if(Pt())return;let n=Y();if(!n)return;if(!fe(n)){let o=On(at(n));if(o&&o!==e.text)return}let r=pe();!r||B(r)||Yo(r)||(Qt=!0,Yt(n,e.text),clearTimeout(Ee),Ee=setTimeout(()=>Db(t,e.text),Ib))}function Db(t,e){Ee=void 0;try{if(!Jt)return;let n=U.get(t);if(!n||n.text!==e||J()||Pn()!==t)return;let r=Y();if(!r)return;let o=On(at(r));if(o&&o!==e&&!fe(r))return;o!==e&&Yt(r,e);let i=pe();if(!i||B(i)||Yo(i))return;i.click(),U.delete(t),F="",we(),qr.debug("drained",t)}finally{Qt=!1}}function dd(t){let e=vt();if(!e||e===document.body){t.style.left="50%",t.style.bottom="6.5rem";return}let n=e.getBoundingClientRect();t.style.left=`${Math.round(n.left+n.width/2)}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`;let r=Math.min(512,Math.max(160,n.width-24));t.style.maxWidth=`${Math.round(r)}px`}function vs(){Rn?.remove(),Rn=null}function we(){if(!Jt||!document.body){vs();return}let t=Pn(),e=U.get(t);if(!e){vs();return}let n=Rn;n?.isConnected||(n=document.createElement("div"),n.id=xs,document.body.appendChild(n),Rn=n),n.replaceChildren();let r=document.createElement("span");r.className="bloom-pq-kicker",r.textContent="Next";let o=document.createElement("span");o.className="bloom-pq-text";let i=e.text.length>id?`${e.text.slice(0,id)}\u2026`:e.text;o.textContent=i,o.title=e.text;let a=document.createElement("div");a.className="bloom-pq-actions";let s=document.createElement("button");s.type="button",s.className="bloom-pq-btn bloom-pq-send",s.textContent="Send now",s.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),Bb()});let l=document.createElement("button");l.type="button",l.className="bloom-pq-btn bloom-pq-x",l.setAttribute("aria-label","Dismiss queued prompt"),l.textContent="\xD7",l.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),Pb(t)}),a.append(s,l),n.append(r,o,a),dd(n)}function $b(){if(!_)return;if(_.ticks-=1,U.get(_.key)&&ud()>_.turns){let e=Rb();if(e&&e===_.text){qr.debug("native send leaked; dropping pending"),U.delete(_.key),F===_.key&&(F=""),_=null,we();return}}_.ticks<=0&&(_=null)}function Ss(){return X()?!1:J()}function _b(t){if(!Jt||t.isComposing||t.keyCode===229||t.key!=="Enter"||t.shiftKey||t.ctrlKey||t.metaKey||Qt)return;let e=ad(t.target)??ad(document.activeElement);if(!e||!Ss())return;if(t.altKey||Tt){Tt=!1;return}if(!xt(e))return;let n=On(at(e));n&&(Es(t),ws(n))}function Fb(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||B(e))return null;let n=t.closest(vn);if(n instanceof HTMLElement&&!B(n))return n;let r=pe();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function qb(t){if(!Jt)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${xs}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&B(n)||Qt||!Ss()||!Fb(e))return;if(Tt){Tt=!1;return}let r=Y();if(!r||!xt(r))return;let o=On(at(r));o&&(Es(t),ws(o))}function zb(t){if(!Jt)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(Vo)&&!e.querySelector(It)||Qt||!Ss())return;if(Tt){Tt=!1;return}let n=Y()??e.querySelector(It);if(!n||!xt(n))return;let r=On(at(n));r&&(Es(t),ws(r))}var md=y({name:"PromptQueue",description:"Queue the next prompt while a reply is streaming. Enter/Send waits for this turn instead of interrupting.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:od,cleanupSelectors:[`#${xs}`],settings:cd,start(){Jt=!0,Lt=Pn(),F="",Qt=!1,Tt=!1,_=null,w(od,rd),_r?.abort(),_r=new AbortController;let{signal:t}=_r;window.addEventListener("keydown",_b,{capture:!0,signal:t}),document.addEventListener("click",qb,{capture:!0,signal:t}),document.addEventListener("submit",zb,{capture:!0,signal:t}),Si?.(),Si=Q({onFall(e){if(Jt){if(e.userStopped||e.error){F="",we();return}F=e.contextKey,ld(e.contextKey)}},onContext(e,n){n&&e&&!$(n,e)&&(F="",Qt=!1,Ee!==void 0&&(clearTimeout(Ee),Ee=void 0)),sd(e),Lt=e,we()},onTick(e){sd(e.contextKey),Lt=e.contextKey,$b(),F&&F===e.contextKey&&ld(F),Rn&&dd(Rn)}}),we(),qr.debug("watch started")},stop(){Jt=!1,Si?.(),Si=null,_r?.abort(),_r=null,clearTimeout(Ee),Ee=void 0,clearTimeout(Fr),Fr=void 0,U.clear(),_=null,F="",Qt=!1,Tt=!1,vs()}});var fd=`.bloom-cls {
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
`;var bd=new S("ChatListStatus"),pd="chatListStatus",ki="bloom-cls",Gb="bloom-cls",Ub=1200*1e3,Kb="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",kt=new Map,_t=!1,dt="",te=!1,$n=!1,mt=0,Se=null,ks=null,Bn=null,Ls=null,Li=null,zr=null,Dn=!1,Le=new Set;function Ti(){return Date.now()}function hd(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function ee(t,e,n,r=!0){if(!(!t||!_t)){if(e==="idle")kt.delete(t);else{let o=kt.get(t);o&&o.kind===e&&n!=="net"?o.at=Ti():kt.set(t,{kind:e,at:Ti(),source:n})}r&&Wb({v:1,id:t,kind:e,at:Ti()}),Ke()}}function Wb(t){try{Bn?.postMessage(t)}catch{}}function Vb(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||ee(e.id,e.kind,"bc",!1)}function Yb(){let t=Ti();for(let[e,n]of kt)n.kind==="streaming"&&t-n.at>Ub&&kt.delete(e)}function Xb(){let t=hd();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(r.closest(Kb))continue;let o=Zt(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function gd(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function Ts(t){let e=t.querySelector(`:scope > .${ki}`);return e||null}function Cs(){if(!_t)return;Yb();let t=M(),e=Xb();Se?.disconnect();try{for(let n of e){let r=Zt(n.getAttribute("href")||"");if(!r||!t||r!==t){Ts(n)?.remove();continue}let i=kt.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){Ts(n)?.remove();continue}let a=Ts(n);a||(a=document.createElement("span"),a.className=ki,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(gd("streaming")):i==="error"&&a.appendChild(gd("error")))}}catch(n){bd.debug("paint failed",n)}yd()}function Ke(){if(_t){if(document.hidden){mt&&(cancelAnimationFrame(mt),mt=0),Cs();return}mt||(mt=requestAnimationFrame(()=>{mt=0,_t&&Cs()}))}}function yd(){let t=hd();if(!(Se&&ks===t&&t?.isConnected)){if(Se?.disconnect(),ks=t,!t){Se=null;return}Se=new MutationObserver(()=>Ke()),Se.observe(t,{childList:!0,subtree:!0})}}function Ci(){return!!(Pe()||Tr())}function Zb(t){return!!(Dn||t&&Le.has(t)||!$n&&!X()&&Ci())}function Jb(t){if(_t){if(t.type==="post-start"){$n=!1,t.conversationId?(Dn=!1,Le.add(t.conversationId),te=!0,ee(t.conversationId,"streaming","net")):(Dn=!0,te=!0);return}if(t.type==="post-end"){if(Dn=!1,t.conversationId){Le.delete(t.conversationId);let e=M(),n=ri();(e?t.conversationId===e:t.conversationId===n)?ee(t.conversationId,t.error?"error":"done","net"):ee(t.conversationId,"idle","net")}Ci()||(te=!1)}}}function Qb(t,e){if(!_t)return;if($(e,t)){Ke();return}let n=M();if(dt&&dt!==n){Le.delete(dt);let r=kt.get(dt);r&&r.kind!=="idle"&&ee(dt,"idle","local")}Dn=!1,te=!1,$n=!0,n&&kt.get(n)?.kind==="streaming"&&kt.get(n)?.source==="local"&&!Le.has(n)&&ee(n,"idle","local"),Ke()}function th(t){if(!_t)return;let e=t.conversationId||M();if(dt&&e&&dt!==e){Le.delete(dt);let r=kt.get(dt);r&&r.kind!=="idle"&&ee(dt,"idle","local"),te=!!(e&&Le.has(e))}if(e&&(dt=e),$n||X()){if(X()||Ci()||t.streaming){Ke();return}$n=!1}if(Zb(e)&&(t.streaming||Ci())){te=!0,e&&ee(e,"streaming","local"),Ke();return}te&&(te=!1,e&&ee(e,Pt()?"error":"done","local")),Ke()}var vd=y({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${ki}`],start(){_t=!0,w(pd,fd);try{Bn=new BroadcastChannel(Gb)}catch{Bn=null}Bn?.addEventListener("message",Vb),Ls=st(Jb),Li?.(),Li=Q({onTick:th,onContext:Qb}),zr?.abort(),zr=new AbortController,document.addEventListener("visibilitychange",()=>{_t&&(mt&&(cancelAnimationFrame(mt),mt=0),Cs())},{signal:zr.signal}),yd(),bd.debug("sidebar status watch started")},stop(){_t=!1,mt&&cancelAnimationFrame(mt),mt=0,zr?.abort(),zr=null,Se?.disconnect(),Se=null,ks=null,Li?.(),Li=null,Ls?.(),Ls=null;try{Bn?.close()}catch{}Bn=null,kt.clear(),Le.clear(),Dn=!1,te=!1,$n=!1,dt="",document.querySelectorAll(`.${ki}`).forEach(t=>t.remove()),E(pd)}});var Ed="widerChat",wd=40,Sd=96,Ld=64,Td=L({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:wd,max:Sd,default:Ld}});function eh(){return V(Number(Td.store.width??Ld),wd,Sd)}function xd(){let t=eh(),e=`min(100%,${t}rem)`;w(Ed,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var kd=y({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Td,start:xd,onSettingsChange:xd,stop(){E(Ed)}});var Ms="composerOpacity",_n='form[data-type="unified-composer"],form.w-full[data-type]',nh=[`${_n} [class*="corner-superellipse"]`,`${_n} [class*="bg-token-bg-primary"]`,`${_n} [class*="bg-token-main-surface"]`].join(","),rh=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),oh="#thread-bottom-container,#thread-bottom",ih=`${_n} #prompt-textarea,${_n} [contenteditable="true"]`,ah="var(--bg-primary,var(--main-surface-primary,#ffffff))",As=L({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function sh(){return V(Number(As.store.opacity??100),0,100)}function lh(){return V(Number(As.store.blur??16),0,40)}function Cd(){let t=sh();if(t>=100){E(Ms);return}let e=lh(),n=`color-mix(in srgb,${ah} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";w(Ms,`${oh}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${rh}{display:none!important}${_n}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${nh}{background-color:${n}!important;background-image:none!important;${r}}${ih}{background-color:transparent!important;background-image:none!important}`)}var Md=y({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[v.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:As,start:Cd,onSettingsChange:Cd,stop(){E(Ms)}});var Ad=`#bloom-bn-host {
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
`;var uh=new S("BetterNavigator"),Hs="betterNavigator",Pd="bloom-bn-host",zn=60,dh=16,mh=1e3,fh=2.5,ph=.4,Ii="\u6B63\u5728\u8F93\u51FA\u2026",Ps="Image",gh="\u2753",bh="\u{1F916}",Hd=/file_[0-9a-f]+/gi,hh="File",yh="Code",vh=".markdown, .whitespace-pre-wrap",Os=["a[download]","[class*='attachment']","[data-testid*='file' i]","[data-testid*='attachment' i]"].join(", "),xh="img, picture, video, canvas",Eh=/\.(?:epub|pdf|docx?|xlsx?|pptx?|txt|md|csv|json|zip|rar|7z|png|jpe?g|gif|webp|svg|mp3|mp4|wav|m4a|html?|py|js|ts|tsx|css|c|cpp|java|go|rs|rb|xml|ya?ml)$/i,wh=/\.[A-Za-z0-9]{1,8}(?:…|\.\.\.)?$/,zs=/^(?:file|image|pdf|epub|document|attachment|video|audio|code|zip|png|jpe?g|gif|webp|txt|markdown|文件|图片|附件|文档)$/i,Sh=/favicon|iconify|shields\.io|badgen\.net|google\.com\/s2\/favicons|gstatic\.com\/favicon/i,Lh=/^(?:pro thinking|thinking(?:…|\.\.\.)?|正在思考|思考中)$/i,Th=/^(?:pro thinking|thinking(?:…|\.\.\.)?|reasoning|thoughts?|正在思考|思考中|已思考.*|thought for\b.*|worked for\b.*|思考了.*|思考用时.*)$/i,kh=/^(?:inspected|analyzed|translated|validated|searched|reviewed|extracted|packaged|已检查|已分析|已翻译|已验证|搜索了|已搜索)\b/i,Ch=/^(?:\d+\s+)?(?:sources?|websites?)$|^web search$|^zh-cn$|^zh$|^en(?:-[a-z]{2})?$/i,Mh=/^(?:Image(?: x\d+)?|File|Code|Message \d+)$/,Ah=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),Hh=2e3,Ih=40,Nh=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,Rh=['section[data-testid^="conversation-turn-"][data-turn="user"]','section[data-testid^="conversation-turn-"][data-turn="assistant"]','article[data-testid^="conversation-turn-"][data-turn="user"]','article[data-testid^="conversation-turn-"][data-turn="assistant"]'].join(", "),Ph=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),Oh=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='footnote']",".sr-only"].join(", "),Bh=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),$i=L({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),qn=new Map,Wr=new Map,qt=new Set,Ni=0,Ct=!1,re=!1,Fn=!1,Te=null,Vr=null,Ye=null,Ri=null,K=[],Xe="",Pi=0,Oi=-1,js=0,Bi="",ft=0,ne=0,jr,Gr=null,Mi=null,Is=null,Ns=null,We=null,Bs=null,Ur=null,Ve=null,jn=null,Kr=null;function _i(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function Rs(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function Dh(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function $h(t){let e=t.getBoundingClientRect(),n=null;try{let o=t.querySelector("[data-message-id], [data-testid^='conversation-turn-']"),a=o?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]')??o;for(;a&&a!==t;)Nh.test(Dh(a))&&(n=a),a=a.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=Rs(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||Rs(getComputedStyle(t).getPropertyValue("--thread-content-width"))||Rs(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function Ds(t){try{return!!t.closest(Ph)}catch{return!0}}function Id(t){let e=(t.getAttribute("data-turn")||t.closest("[data-turn]")?.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("data-message-author-role")||t.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase();if(n==="user"||n==="assistant")return n;try{let o=(t.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent||"").toLowerCase();if(o.includes("you said"))return"user";if(o.includes("chatgpt said")||o.includes("assistant said"))return"assistant"}catch{}let r=(t.getAttribute("aria-label")||"").toLowerCase();return r.includes("you said")?"user":r.includes("chatgpt said")||r.includes("assistant said")?"assistant":null}function Fi(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||t.querySelector("[data-message-id]")?.getAttribute("data-message-id")||""}function Gs(t){try{if(t.querySelector("[class*='imagegen-image']")||t.querySelector('img[alt="Generated image"], img[alt^="Generated image"]'))return!0}catch{}return!1}function _h(t){try{return!!t.closest("[class*='message-image']")}catch{return!0}}function Ai(t,e){if(t){Hd.lastIndex=0;for(let n of t.matchAll(Hd))e.add(n[0].toLowerCase())}}function Fh(t){try{let e=new Set,n=s=>{_h(s)||(Ai(s.getAttribute("src")||"",e),Ai(s.getAttribute("srcset")||"",e),Ai(s.getAttribute("href")||"",e),s instanceof HTMLImageElement&&Ai(s.currentSrc||"",e))};for(let s of t.querySelectorAll("[class*='imagegen-image']")){n(s);for(let l of s.querySelectorAll("[src], [srcset], [href]"))n(l)}for(let s of t.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]'))n(s);if(e.size)return e.size;let o=t.querySelectorAll("[class*='group/imagegen-image']").length;if(!o)return 0;let i=Fi(t);return(i?t.querySelector(`#image-${CSS.escape(i)}`):t.querySelector("[id^='image-']:not([id^='image-gen-'])"))&&o>=2&&(o-=1),o}catch{return 0}}function qh(t,e){let n=Fh(t),r=Wr.get(e)??0,o=Math.max(r,n);return o>0&&Wr.set(e,o),o>=2?`${Ps} x${o}`:Ps}function pt(t){return t.replace(/\s+/g," ").trim()}function Od(t,e){let n=t;for(;n&&n!==e;){if(n.matches(Oh))return!0;n=n.parentElement}return!1}function Di(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(Od(i,t))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return pt(o.textContent||"")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<zn+20;)e.push(pt(r.textContent||""));return pt(e.join(" "))}function Bd(t){let e=pt(t);return e.length<3||e.length>180||/\s/.test(e)||zs.test(e)?!1:Eh.test(e)?!0:wh.test(e)&&/[_\-.]/.test(e)}function Hi(t,e){let n=pt(t);if(!n)return;let r=n.split(/[/\\]/).pop()||n;Bd(r)&&!e.includes(r)&&e.push(r)}function Nd(t){let e=[],n=i=>{let a=pt(i);if(!a)return;let s=a.match(/^(.*\S)\s+(file|image|pdf|epub|document|attachment|文件|图片|附件|文档)$/i);if(s){e.push(pt(s[1])),e.push(pt(s[2]));return}e.push(a)},r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o;for(;o=r.nextNode();)n(o.textContent||"");return e}function zh(t){let e=[];try{for(let n of t.querySelectorAll(Os)){let r=n.getAttribute("download");r&&Hi(r,e),Hi(n.getAttribute("title")||"",e),Hi(n.getAttribute("aria-label")||"",e);for(let o of Nd(n))Hi(o,e)}if(!e.length)for(let n of t.querySelectorAll("button, a, [role='button']")){if(n.closest("[data-testid*='action-button'], [role='toolbar']"))continue;let r=Nd(n),o=r.find(Bd);o&&(r.some(i=>zs.test(i))||r.length<=3)&&e.push(o)}}catch{}if(e.length)return _d(e[0]);try{if(t.querySelector(Os))return hh}catch{}return""}function jh(t){try{if(t.closest("[class*='imagegen-image'], [class*='message-image']"))return!1;let e=t instanceof HTMLImageElement?t:t.querySelector("img");if(e instanceof HTMLImageElement){let i=e.getAttribute("alt")||"";if(/^Generated image/i.test(i))return!1;let a=`${e.getAttribute("src")||""} ${e.getAttribute("srcset")||""}`;if(Sh.test(a))return!0}if(t.closest("[data-testid*='citation'], [class*='citation'], [class*='tool-message'], [data-testid*='tool']"))return!0;let n=t.getBoundingClientRect(),r=n.width||Number(e?.getAttribute("width"))||0,o=n.height||Number(e?.getAttribute("height"))||0;if(r>0&&r<=48||o>0&&o<=48)return!0;if(r>48||o>48)return!1}catch{}return!0}function Gh(t){try{for(let e of t.querySelectorAll(xh))if(!jh(e))return!0}catch{}return!1}function Dd(t){let e=pt(t).replace(/^[^a-zA-Z\u4e00-\u9fff]+/,"");return!e||kh.test(e)||Th.test(e)?!0:e.length<=24&&(Ch.test(e)||zs.test(e))}function Uh(t){let e=[],n=new Set,r=o=>{try{if(Od(o,t)||o.closest(Os))return}catch{return}let i=Di(o);!i||n.has(i)||Dd(i)||(n.add(i),e.push(i))};try{for(let o of t.querySelectorAll("p, li, h1, h2, h3, blockquote"))if(r(o),e.join(" ").length>zn+20)break;if(!e.length){for(let o of t.querySelectorAll("div, span"))if(!o.querySelector("div, p, li")&&!(Di(o).length<24)&&(r(o),e.join(" ").length>zn+20))break}}catch{}return pt(e.join(" "))}function $d(t,e){let n=[];try{for(let o of t.querySelectorAll(vh)){if(Ds(o))continue;let i=Di(o);if(!(!i||Dd(i))&&(n.push(i),n.join(" ").length>zn+20))break}}catch{}let r=pt(n.join(" "));return r||(e==="assistant"?Uh(t):"")}function _d(t){return t.length>zn?`${t.slice(0,zn).trimEnd()}\u2026`:t}function Rd(t){return Mh.test(t)}function Kh(t,e,n,r){let o=$d(t,e);if(o)return _d(o);if(r)return Ii;let i=zh(t);if(i)return i;if(Gs(t))return qh(t,Fi(t));try{if(Gh(t))return Ps;if(t.querySelector("pre, code"))return yh}catch{}return`Message ${n+1}`}function Wh(){if(re)return!0;let t=M();return!!(t&&qt.has(t)||!Fn&&!X()&&Yr())}function Yr(){return!!(Pe()||Tr())}function Vh(){Ni=Date.now()}function Fd(t){re=!1,t&&qt.delete(t);let e=M();e&&qt.delete(e)}function Yh(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function Xh(t){if(Gs(t)||!Yr())return!1;let e=t.querySelector(".markdown");if(!(!e||e instanceof HTMLElement&&!Di(e)))return!1;let r=t.querySelector("[class*='thinking'], [class*='reasoning']");if(!r)return!1;if(r.getAttribute("aria-busy")==="true"||r.classList.contains("result-streaming"))return!0;try{if(r.querySelector("[aria-busy='true'], .result-streaming"))return!0}catch{}let o=r.closest("details")??r.querySelector("details");return o instanceof HTMLDetailsElement&&o.open}function Us(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=pt(e.textContent||"");if(!(n.length>32)&&Lh.test(n))return!0}}catch{}return!1}function Zh(t){try{for(let e of t.querySelectorAll("svg.animate-spin, .animate-spin"))if(!e.closest('button[data-testid="conversation-options-button"], #page-header, nav, [data-testid*="citation"]'))return!0}catch{}return!1}function Jh(t,e){try{if(Yh(t))return!0;if(!e)return!1;if(Xh(t)||Us(t))return!0}catch{}return!1}function qd(t){if(!t||Yr())return!1;try{if(Us(t))return!1;if(t.querySelector(Ah)||Gs(t)||$d(t,"assistant"))return!0}catch{}return!1}function Qh(t){if(Yr()||Ni&&Date.now()-Ni<Hh)return;let e=[...t].reverse().find(n=>n.role==="assistant");!e||!qd(e.el)||Fd()}function t0(t){let e=new Set,n=[];try{for(let r of t.querySelectorAll(Rh)){if(Ds(r))continue;let i=Fi(r)||`anon:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}if(n.length)return n;try{for(let r of t.querySelectorAll("[data-message-id]")){if(Ds(r))continue;let i=r.getAttribute("data-message-id")||""||`mid:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}return n}function e0(){let t=_i();if(!t||t===document.body)return[];let e=$i.store.showAssistant!==!1,n=e&&Wh(),r=t0(t),o=null;if(e)for(let a of r)Id(a)==="assistant"&&(o=a);let i=[];try{for(let a of r){let s=Fi(a);if(!s)continue;let l=Id(a);if(l!=="user"&&l!=="assistant"||l==="assistant"&&!e)continue;let c=a===o,u=c&&Us(a),d=c&&n&&Zh(a),f=l==="assistant"&&(Jh(a,c)||d)&&!qd(a)&&(n||u),h=Kh(a,l,i.length,f);if(h&&h!==Ii){let b=qn.get(s);(!b||!Rd(h)||Rd(b))&&h!==b&&qn.set(s,h)}let p=f&&h===Ii?Ii:qn.get(s)||h;i.push({id:s,el:a,role:l,text:p,live:f})}}catch{}return Qh(i),i}function n0(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function zd(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function r0(t){return t===window?window.innerHeight:t.clientHeight}function o0(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(Bh)}catch{return!1}}function jd(){jr!==void 0&&(clearTimeout(jr),jr=void 0),Gr?.classList.remove("bloom-bn-flash"),Gr=null}function i0(t){jd(),t.classList.add("bloom-bn-flash"),Gr=t,jr=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),Gr===t&&(Gr=null),jr=void 0},800)}function $s(t){if(!K.length)return;let e=Math.max(0,Math.min(t,K.length-1));Pi=e,Vr?.querySelectorAll(".bloom-bn-tick").forEach((r,o)=>{r.classList.toggle("bloom-bn-current",o===e)}),Ye?.querySelectorAll(".bloom-bn-item").forEach((r,o)=>{r.classList.toggle("bloom-bn-active",o===e)}),Ri&&(Ri.textContent=`${e+1} / ${K.length}`);let n=Ye?.children[e];if(n instanceof HTMLElement){let r=Ye;if(r){let o=n.offsetTop-r.clientHeight/2+n.offsetHeight/2;r.scrollTop=Math.max(0,o)}}}function _s(t){let e=K[t];if(!e?.el.isConnected)return;Oi=t,js=Date.now()+mh,$s(t);let n=jn??zd(e.el),o=Math.abs(e.el.getBoundingClientRect().top-n0())>fh*r0(n);e.el.scrollIntoView({behavior:o?"auto":"smooth",block:"start"}),$i.store.jumpEffect!=="none"&&i0(e.el)}function Ks(){if(!Ct||!K.length)return;if(Date.now()<js&&Oi>=0){$s(Oi);return}let t=window.innerHeight*ph,e=0;for(let n=0;n<K.length;n++){let r=K[n].el;r.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}$s(e)}function a0(t){let e=zd(t);if(jn===e&&Kr)return;Kr?.(),jn=e;let n=e===window?document:e,r=()=>{Ks(),Ws()};n.addEventListener("scroll",r,{passive:!0}),Kr=()=>n.removeEventListener("scroll",r)}function s0(t){Ve?.disconnect(),Ve=null;let e=jn instanceof HTMLElement?jn:null;Ve=new IntersectionObserver(()=>Ks(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el.isConnected&&Ve.observe(n.el)}function l0(){if(!document.body)return null;let t=Te;if(t?.isConnected)return t;t=document.createElement("div"),t.id=Pd,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),Te=t,Vr=e,Ye=i,Ri=o,t}function Gd(){let t=Te,e=_i();if(!t||!e||!e.isConnected||K.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=$h(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||Ih,d=n.right-r.right>=c+8?r.right+4:r.right-12-c;d=Math.min(d,n.right-c-8),d=Math.max(8,d);let f=Math.max(8,Math.round(window.innerWidth-d-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${f}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function Ws(){!Ct||ne||(ne=requestAnimationFrame(()=>{ne=0,Ct&&Gd()}))}function c0(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function u0(t){let e=Vr,n=Ye;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>dh),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=c0(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",c=>{c.preventDefault(),_s(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-emoji",s.textContent=r.role==="user"?gh:bh;let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=r.text,l.title=r.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),_s(o)}),n.appendChild(a)}))}function d0(t){Vr?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=Ye?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function m0(){let t=M();return t===Bi?!1:(Bi=t,qn.clear(),Wr.clear(),K=[],Xe="",Pi=0,Oi=-1,js=0,re&&t&&(qt.add(t),re=!1),!0)}function f0(t){let e=$i.store.showAssistant!==!1?"1":"0";return`${Bi}|${e}|${t.map(n=>n.id).join(",")}`}function Fs(){if(!Ct)return;m0();let t=e0(),e=_i();if(!e||t.length<1){K=t,Xe="",Te&&(Te.hidden=!0),Ve?.disconnect(),qs();return}l0();let n=f0(t);n!==Xe?(K=t,Xe=n,u0(t),a0(e),s0(t)):(K=t,d0(t)),Gd(),Ks(),qs()}function Ft(){if(Ct){if(document.hidden){ft&&(cancelAnimationFrame(ft),ft=0),Fs();return}ft||(ft=requestAnimationFrame(()=>{ft=0,Ct&&Fs()}))}}function qs(){let t=_i();if(!(We&&Bs===t&&t?.isConnected)){if(We?.disconnect(),Ur?.disconnect(),Bs=t,!t||t===document.body){We=null;return}We=new MutationObserver(()=>Ft()),We.observe(t,{childList:!0,subtree:!0}),Ur=new ResizeObserver(()=>Ws()),Ur.observe(t)}}function p0(t){if(Ct){if(t.type==="post-start"){Vh(),Fn=!1,t.conversationId?(re=!1,qt.add(t.conversationId)):re=!0,Ft();return}if(t.type==="post-end"){if(re=!1,t.conversationId)qt.delete(t.conversationId);else{let e=M();e&&qt.delete(e)}Ft()}}}function g0(t){if(!Ct||!K.length||Te?.hidden||t.altKey||t.ctrlKey||t.metaKey||o0(t.target))return;let e=-1;if(t.key==="ArrowDown")e=Pi+1;else if(t.key==="ArrowUp")e=Pi-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=K.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),_s(Math.max(0,Math.min(e,K.length-1)))}function b0(){jd(),Ve?.disconnect(),Ve=null,We?.disconnect(),We=null,Bs=null,Ur?.disconnect(),Ur=null,Kr?.(),Kr=null,jn=null,Te?.remove(),Te=null,Vr=null,Ye=null,Ri=null}var Ud=y({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:Hs,cleanupSelectors:[`#${Pd}`],settings:$i,start(){Ct=!0,Bi=M(),w(Hs,Ad),Mi=new AbortController;let{signal:t}=Mi;window.addEventListener("keydown",g0,{signal:t}),window.addEventListener("popstate",Ft,{signal:t}),window.visualViewport?.addEventListener("resize",Ws,{signal:t}),document.addEventListener("visibilitychange",()=>{Ct&&(ft&&(cancelAnimationFrame(ft),ft=0),ne&&(cancelAnimationFrame(ne),ne=0),Fs())},{signal:t}),Ns=st(p0),Is=Q({onTick(){if(X()){Ft();return}Fn&&!Yr()&&(Fn=!1),Ft()},onFall(e){Fd(e.conversationId),Ft()},onContext(e,n){if(!$(n,e)){qn.clear(),Wr.clear(),Xe="",re=!1;let r=M();for(let o of[...qt])o!==r&&qt.delete(o);Fn=!0}Ft()}}),qs(),Ft(),uh.debug("navigator started")},stop(){Ct=!1,ft&&cancelAnimationFrame(ft),ft=0,ne&&cancelAnimationFrame(ne),ne=0,Mi?.abort(),Mi=null,Is?.(),Is=null,Ns?.(),Ns=null,qt.clear(),re=!1,Fn=!1,Ni=0,b0(),qn.clear(),Wr.clear(),K=[],Xe="",E(Hs)},onSettingsChange(){Xe="",Ft()}});var Kd=`.bloom-ts {
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
`;function Wd(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Vd(t){try{return new Date(t).toISOString()}catch{return""}}var Zd=new S("MessageTimestamps"),Yd="messageTimestamps",zi="bloom-ts",Xd=1500,y0="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",Gn=L({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),Un=new Map,Qe=!1,gt=0,ke=null,Ys=null,Vs=null,qi=null,Xr=null,Zr=!1,Ze=!1;function Jd(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function Zs(){let t=Gn.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Qd(){let t={...Zs()};for(let[n,r]of Un)t[n]=r;let e=Object.keys(t);if(e.length>Xd){let n=e.slice(e.length-Xd),r={};for(let o of n)r[o]=t[o];Gn.store.stamps=r;return}Gn.store.stamps=t}var v0=Bl(Qd,500);function tm(t,e){!t||!e||Un.get(t)===e||(Un.set(t,e),v0(),Je())}function x0(t){return t?Un.get(t)??Zs()[t]??ti(t)??null:null}function E0(t){Qe&&t.type==="message-time"&&tm(t.messageId,t.createTime)}function w0(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function S0(){let t=Jd();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll("[data-message-id]"))n.closest(y0)||e.push(n)}catch{}return e}function L0(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function Xs(){if(!Qe)return;let t=Gn.store.hideOwnMessages===!0,e=Gn.store.showDate!==!1,n=J();Ze&&!X()&&(Ze=!1),Ze&&(n?Zr=!1:Ze=!1);let r=Ze?!1:n,o=S0();ke?.disconnect();try{o.forEach((i,a)=>{let s=i.getAttribute("data-message-id")||"",l=w0(i),c=i.querySelector(`:scope > .${zi}`);if(t&&l==="user"){c?.remove();return}if(L0(i)){c?.remove();return}let u=x0(s);if(!u&&s&&(r||Zr)&&a>=o.length-2&&(u=Date.now(),tm(s,u)),!u){c?.remove();return}let d=Wd(u,e);if(!d){c?.remove();return}let f=c;f||(f=document.createElement("time"),f.className=zi,f.setAttribute("aria-hidden","true"),i.insertBefore(f,i.firstChild)),f.textContent!==d&&(f.textContent=d);let h=Vd(u);h&&f.getAttribute("datetime")!==h&&f.setAttribute("datetime",h)})}catch(i){Zd.debug("paint failed",i)}Zr=r,em()}function Je(){if(Qe){if(document.hidden){gt&&(cancelAnimationFrame(gt),gt=0),Xs();return}gt||(gt=requestAnimationFrame(()=>{gt=0,Qe&&Xs()}))}}function em(){let t=Jd();if(!(ke&&Ys===t&&t?.isConnected)){if(ke?.disconnect(),Ys=t,!t||t===document.body){ke=null;return}ke=new MutationObserver(()=>Je()),ke.observe(t,{childList:!0,subtree:!0})}}var nm=y({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${zi}`],settings:Gn,start(){Qe=!0,w(Yd,Kd);let t=Zs();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&Un.set(e,n);Vs=st(E0),qi?.(),qi=Q({onTick:Je,onFall:Je,onContext(e,n){$(n,e)||(Ze=!0,Zr=!1),Je()}}),Xr?.abort(),Xr=new AbortController,document.addEventListener("visibilitychange",()=>{Qe&&(gt&&(cancelAnimationFrame(gt),gt=0),Xs())},{signal:Xr.signal}),em(),Je(),Zd.debug("timestamp watch started")},stop(){Qe=!1,gt&&cancelAnimationFrame(gt),gt=0,Xr?.abort(),Xr=null,ke?.disconnect(),ke=null,Ys=null,qi?.(),qi=null,Vs?.(),Vs=null,Ze=!1,Zr=!1,Qd(),Un.clear(),document.querySelectorAll(`.${zi}`).forEach(t=>t.remove()),E(Yd)},onSettingsChange:Je});var Js="streamerMode",T0="filter:blur(6px)!important;transition:filter .2s ease",k0="filter:none!important",Kn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],Wn=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function bt(t,e){return t.map(n=>`${n} ${e}`)}var tn=L({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function Vn(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${T0}}${e?`${r}{${k0}}`:""}`}function rm(){let t=[];if(tn.store.conversations!==!1&&(t.push(Vn([...bt(Wn,'a[href^="/c/"]'),...bt(Wn,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),tn.store.projects!==!1&&(t.push(Vn([...bt(Wn,'a[href*="/project"]'),...bt(Wn,'a[href*="/g/g-p-"]'),...bt(Wn,'[data-testid="project-name"]'),...bt(Wn,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),tn.store.headerTitle!==!1&&t.push(Vn(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),tn.store.accountAvatar!==!1&&t.push(Vn([...bt(Kn,"img"),...bt(Kn,'[class*="avatar"]'),...bt(Kn,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),tn.store.accountName!==!1&&t.push(Vn([...bt(Kn,".min-w-0 > .truncate"),...bt(Kn,".min-w-0.flex-1 .truncate")],!1)),tn.store.accountEmail!==!1&&t.push(Vn([...bt(Kn,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!t.length){E(Js);return}w(Js,t.join(`
`))}var om=y({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[v.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:tn,start:rm,onSettingsChange:rm,stop(){E(Js)}});var im=`.bloom-gc-panel {
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
}`;var M0=new S("GreetingCustomizer"),Yn="greetingCustomizer",am="greetingCustomizerUi",Jr=100,tl=30,A0=120,H0=1e3,I0=50,N0=40,R0=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),Qr=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),Wi=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function P0(t){return!!t?.closest(R0)}function um(t){return!!(P0(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function ao(t){try{for(let e of document.querySelectorAll(t))if(!um(e))return e}catch{}return null}function Qs(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(ao(e))return e;return t}var dm=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],W=L({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:X0},greetings:{type:0,description:"Greeting texts",hidden:!0,default:dm},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),zt=!1,Jn=!1,nn=null,Gi,to,Xn,eo,Ui=0,ji=null,Zn=null,no=null,ro=null,oo=null,Ki=null;function ie(){let t=location.pathname||"/";return t==="/"||t===""}function en(){let t=W.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):dm.slice()}function io(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function sm(t){W.store.greetings=t.slice(0,tl)}function so(){let t=String(W.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function O0(){return W.store.order==="random"?"random":"sequential"}function B0(){return V(Number(W.store.intervalSec??10),1,3600)*1e3}function D0(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function $0(){return!!ao(Wi)}function Vi(){return!!(ao(Wi)||ao(Qr))}function _0(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=$0()?Qs(Wi):ao(Qr)?Qs(Qr):Qs(Wi),i=e?`${Qr}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function F0(t,e){if(t<=0)return 0;if(t===1)return Number(W.plain.index)!==0&&(W.store.index=0),Number(W.plain.lastRandom)!==0&&(W.store.lastRandom=0),0;let n=Number(W.plain.index),r=Number(W.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(O0()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return W.store.index=s,W.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return W.store.index=i,i}function oe(t){if(!zt)return;if(!ie()){E(Yn);return}let e=en().map(io).filter(Boolean);if(!e.length){E(Yn);return}let n=F0(e.length,t),r=e[n]??e[0],o=so()==="manual"&&e.length>1;w(Yn,_0(D0(r),o)),Ki?.()}function el(){Gi!==void 0&&(clearInterval(Gi),Gi=void 0)}function nl(){el(),!(!zt||!ie())&&so()==="interval"&&(en().filter(Boolean).length<=1||(Gi=setInterval(()=>oe(!0),B0())))}function rl(){eo!==void 0&&(clearTimeout(eo),eo=void 0),Ui=0}function lm(){if(rl(),!zt||!ie())return;Ui=N0;let t=()=>{if(eo=void 0,!(!zt||!ie())){if(Vi()){so()==="refresh"&&!Jn?(Jn=!0,oe(!0)):oe(!1),nl();return}Ui-=1,Ui>0&&(eo=setTimeout(t,I0))}};t()}function ol(){if(nn===!0){Vi()?oe(!1):lm();return}nn=!0,Jn=!1,so()==="refresh"?(Jn=!0,oe(!0)):oe(!1),nl(),Vi()||lm()}function il(){nn=!1,Jn=!1,el(),rl(),E(Yn)}function Yi(){Xn===void 0&&(Xn=window.setTimeout(()=>{Xn=void 0,zt&&(ie()?ol():nn!==!1&&il())},A0))}function q0(){Zn||(Zn=history.pushState.bind(history),no=history.replaceState.bind(history),ro=function(...e){let n=Zn(...e);return Yi(),n},oo=function(...e){let n=no(...e);return Yi(),n},history.pushState=ro,history.replaceState=oo)}function z0(){ro&&history.pushState===ro&&Zn&&(history.pushState=Zn),oo&&history.replaceState===oo&&no&&(history.replaceState=no),Zn=null,no=null,ro=null,oo=null}function j0(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(Yi)}function G0(t){if(!zt||!ie()||so()!=="manual"||en().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(Qr);if(!n||um(n))return;let r=window.getSelection?.();r&&String(r).trim()||oe(!0)}function U0(){to===void 0&&(to=setInterval(()=>{if(!zt)return;let t=ie();if(t!==(nn===!0)){t?ol():il();return}t&&Vi()&&oe(!1)},H0))}function K0(){to!==void 0&&(clearInterval(to),to=void 0)}function cm(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var W0="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",V0="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function Y0(t,e){let n=io(t);return n?n.length>Jr?`Keep it to ${Jr} characters.`:en().length+(e?1:0)>tl?`At most ${tl} greetings.`:null:"Enter a greeting."}function X0(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=en(),s=Number(W.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=Jr,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let m=l.querySelector(".bloom-gc-count");m&&(m.textContent=`${io(e).length}/${Jr}`);let T=l.querySelector(".bloom-gc-error");T&&(T.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${io(e).length}/${Jr}`;let f=document.createElement("span");f.className="bloom-gc-error",f.textContent=r;let h=document.createElement("div");if(h.className="bloom-gc-actions",n>=0){let m=document.createElement("button");m.type="button",m.className="bloom-gc-btn",m.textContent="Cancel",m.addEventListener("click",()=>{n=-1,e="",r="",i()}),h.appendChild(m)}let p=document.createElement("button");if(p.type="button",p.className="bloom-gc-btn bloom-gc-btn-primary",p.textContent=n>=0?"Update":"Add",p.addEventListener("click",()=>{let m=n<0,T=Y0(e,m);if(T){r=T,i();return}let A=io(e),I=en().slice();n>=0&&n<I.length?I[n]=A:I.push(A),sm(I),n=-1,e="",r="",i()}),h.appendChild(p),u.append(d,f,h),l.appendChild(u),t.appendChild(l),!a.length){let m=document.createElement("p");m.className="bloom-gc-empty",m.textContent="No greetings. The official heading stays.",t.appendChild(m);return}let b=document.createElement("div");b.className="bloom-gc-list",a.forEach((m,T)=>{let A=document.createElement("div");A.className="bloom-gc-item",T===s&&(A.dataset.active="true");let I=document.createElement("button");I.type="button",I.className=`bloom-gc-body${o===T?"":" bloom-gc-clamp"}`,I.textContent=m,I.addEventListener("click",()=>{o=o===T?-1:T,i()});let Ut=document.createElement("div");Ut.className="bloom-gc-item-actions";let Mt=cm("Edit",W0);Mt.addEventListener("click",()=>{n=T,e=m,r="",i()});let et=cm("Delete",V0);et.addEventListener("click",()=>{let R=en().filter((ot,Kt)=>Kt!==T);sm(R),n===T?(n=-1,e=""):n>T&&(n-=1),i()}),Ut.append(Mt,et),A.append(I,Ut),b.appendChild(A)}),t.appendChild(b)};return Ki=i,i(),()=>{Ki===i&&(Ki=null),t.replaceChildren()}}var mm=y({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:am,settings:W,start(){zt=!0,w(am,im),q0(),ji=new AbortController;let{signal:t}=ji;window.addEventListener("popstate",Yi,{signal:t}),document.addEventListener("click",j0,{capture:!0,signal:t}),document.addEventListener("click",G0,{signal:t}),U0(),nn=null,ie()?ol():il(),M0.debug("started")},stop(){zt=!1,ji?.abort(),ji=null,Xn!==void 0&&(clearTimeout(Xn),Xn=void 0),el(),rl(),K0(),z0(),E(Yn),Jn=!1,nn=null},onSettingsChange(){zt&&(ie()?(oe(!1),nl()):E(Yn))}});function Z0(t){let e=/^data:([^;,]+)?(;base64)?,(.*)$/s.exec(t);if(!e)return null;let n=e[1]||"application/octet-stream",r=!!e[2],o=e[3]||"";try{if(r){let i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return new Blob([a],{type:n})}return new Blob([decodeURIComponent(o)],{type:n})}catch{return null}}async function Xi(t){try{return await createImageBitmap(t)}catch{return null}}async function J0(t){try{let e=new Image;return e.decoding="async",await new Promise((n,r)=>{e.onload=()=>n(),e.onerror=()=>r(new Error("img")),e.src=t}),await createImageBitmap(e)}catch{return null}}async function Zi(t){if(t.startsWith("data:")){let e=Z0(t);if(e){let n=await Xi(e);if(n)return n}return J0(t)}try{let e=await fetch(t,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?Xi(await e.blob()):null}catch{return null}}var Qi="data-bloom-csi-slot",Q0="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",ty=/\bsize-(?:[6-9]|10)\b/,ey=/\b(?:h|w)-(?:[6-9]|10)\b/,ny=/^(plus|pro|free|team|go|business|enterprise)$/i,ry=['[class*="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-6"]','[class~="h-7"]','[class~="h-8"]','[class~="h-9"]','[class~="h-10"]','[class~="w-6"]','[class~="w-7"]','[class~="w-8"]','[class~="w-9"]','[class~="w-10"]'].join(",");function Ji(t){return t.getAttribute("class")||""}function pm(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||ty.test(t)?!0:ey.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function oy(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3&&!gm(e)}function gm(t){return ny.test(String(t??"").replace(/\s+/g,""))}function jt(t){return!!t?.closest(Q0)}function ta(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function lo(t){let e=Ji(t);return/\btext-xs\b/.test(e)||/text-token-text-secondary/.test(e)||/text-token-text-tertiary/.test(e)?!0:gm(t.textContent||"")}function ea(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function co(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function iy(t){return/\bflex\b/.test(t)&&!/\bflex-col\b/.test(t)}function bm(t){if(jt(t)||ea(t)||co(t)||lo(t)||ta(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function hm(t){return jt(t)||ea(t)||co(t)||lo(t)||t.querySelector("img, svg, .min-w-0, .truncate")?!1:oy(t.textContent||"")}function ym(t){return jt(t)||co(t)||ta(t)||lo(t)?!1:pm(Ji(t))||hm(t)?!0:bm(t)}function fm(t){return!(jt(t)||ta(t)||co(t)||lo(t)||ea(t))}function rn(t,e){let n=ea(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(co(n)||ta(n)||lo(n));)jt(n)||(r=n),n=n.parentElement;return r}function ay(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||jt(e))continue;if(iy(Ji(e))){let r=[];for(let o of e.children)if(!(!(o instanceof HTMLElement)||!fm(o))){if(ym(o)||pm(Ji(o)))return rn(o,t)??o;r.push(o)}if(r.length===1)return rn(r[0],t)??r[0]}let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&fm(r))return rn(r,t)??r}}return null}function sy(t){let e=t.querySelectorAll(ry);for(let n of e)if(ym(n))return rn(n,t)??n;return null}function ly(t){for(let e of t.querySelectorAll("span, div, p, i"))if(hm(e))return rn(e,t)??e;return null}function cy(t){for(let e of t.querySelectorAll("*"))if(bm(e))return rn(e,t)??e;return null}function vm(t,e){if(jt(t))return null;if(e&&!jt(e)&&t.contains(e)){let n=rn(e,t);if(n)return n}return ay(t)??sy(t)??ly(t)??cy(t)}function xm(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-8"]','[class~="w-8"]']}var Qn="data-bloom-csi",na="data-bloom-csi-orig",on=new Set,Em=null;function sl(t){Em=t}function wm(t){return`url(${JSON.stringify(t)})`}function ra(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function ll(t,e,n){let r=wm(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function Sm(t,e=Qi){let n=wm(t);return`[${e}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${e}] *,[${e}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${e}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`}function uy(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function tr(t){t.removeEventListener("error",al);let e=t.getAttribute(na);t.removeAttribute(Qn),t.removeAttribute(na),e&&t.getAttribute("src")!==e&&(t.src=e)}function al(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&on.add(n),tr(e),Em?.()}function Lm(t,e){if(!e||on.has(e)){tr(t);return}uy(t);let n=t.getAttribute("src")??"";if(t.getAttribute(Qn)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(na)&&t.setAttribute(na,n);t.setAttribute(Qn,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",al),t.addEventListener("error",al),n!==e&&(t.src=e)}var Tm=`/*
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
`;var km=new S("CustomSidebarIdentity"),Cm="customSidebarIdentityUi",Hm="customSidebarIdentity",my="bloom-csi-face",fy="bloom-csi-name",er=Qi,py=1024,oa=256,Im=24,Nm=64,Rm=40,ml=1,fl=4,uo=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],cl=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],x=L({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:Ny},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:Im,max:Nm,default:Rm},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function sn(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function gy(){return String(x.store.displayName??"").trim()}function sa(t,e,n,r,o){let i=V(n,ml,fl),a=Math.min(t,e)/i,s=V(r,a/2,Math.max(a/2,t-a/2)),l=V(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}function by(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function pl(t){let e=Math.min(1,py/Math.max(t.width,t.height));return by(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function hy(t,e,n,r){let{side:o,x:i,y:a}=sa(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=oa,s.height=oa;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,oa,oa);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function yy(t){let e=await Xi(t);if(!e)return null;let n=pl(e);return e.close(),n}async function bl(t,e,n,r){let o=await Zi(t);if(!o)return null;let i=hy(o,e,n,r);return o.close(),i}function hl(){x.store.cropX=.5,x.store.cropY=.5,x.store.cropZoom=1}function Mm(){x.store.avatarUrl="",x.store.avatarSource="",hl()}var Am=0;async function gl(t){let e=++Am;hl(),x.store.avatarSource=t;let n=await bl(t,.5,.5,1);return e!==Am?!1:(n&&(x.store.avatarUrl=n),!!n)}function mo(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function ul(t){let e=mo(t);if(!e)return!1;let n=await yy(e);return n?gl(n):!1}var ht=!1,nr=!1,rr=0,la=0,ia=null,Ce=new Map,or=null,ae=null,ca=null,Gt=null,ua=null;function da(t){let e=String(t??"").trim();if(!e||on.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:n}=new URL(e);if(n==="https:"||n==="http:")return e}catch{return null}return null}function Pm(){return da(x.store.avatarUrl)??da(x.store.avatarSource)}var aa=!1,dl=new Set;function Om(){let t=da(x.store.avatarSource);if(!t?.startsWith("data:image/")||da(x.store.avatarUrl)?.startsWith("data:image/")||aa||dl.has(t))return;aa=!0;let e=sn(x.store.cropX,.5),n=sn(x.store.cropY,.5),r=sn(x.store.cropZoom,1);bl(t,e,n,r).then(o=>{if(aa=!1,!o){dl.add(t);return}ht&&(x.store.avatarUrl=o,ma())}).catch(()=>{aa=!1,dl.add(t)})}function an(t,e){return t.map(n=>`${n} ${e}`)}function vy(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function xy(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=vy(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function Bm(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||jt(n)||n.closest(".min-w-0")||e.push(n);return e}function Ey(t){let e=Bm(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function yl(){let t=[],e=He();e&&t.push(e);let n=gn();if(n&&!t.some(r=>n.contains(r)||r.contains(n))){let r=n.querySelector(uo.join(","))??n.querySelector("button, a, [role='button']")??n;r&&!t.includes(r)&&t.push(r)}return t}function Dm(t,e){let n=Ey(t);if(n)Lm(n,e);else for(let o of Bm(t))tr(o);let r=vm(t,n);for(let o of t.querySelectorAll(`[${er}]`))o!==r&&o.removeAttribute(er);r&&r.setAttribute(er,"")}function wy(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function Sy(t,e){let n=wy(t);n&&Dm(n,e)}function Ly(){for(let t of document.querySelectorAll(`img[${Qn}]`))tr(t);for(let t of document.querySelectorAll(`[${er}]`))t.removeAttribute(er)}function Ty(){let t=V(Math.round(sn(x.store.avatarSize,Rm)),Im,Nm),e=Pm(),n=gy(),r=x.store.applyToMenu!==!1,o=[],i=[...an(uo,"img"),"#stage-sidebar-tiny-bar img"];r&&i.push(...an(cl,"> :first-child img"));let a=[...an(uo,".min-w-0 > .truncate"),...an(uo,".min-w-0.flex-1 .truncate")];r&&a.push(...an(cl,"> :first-child .truncate"));let s=xm(er);o.push(ra([...s.flatMap(l=>an(uo,l))].join(","),t)),o.push(ra(s.map(l=>`#stage-sidebar-tiny-bar ${l}`).join(","),32)),r&&o.push(ra(s.flatMap(l=>an(cl,`> :first-child ${l}`)).join(","),t)),e&&(o.push(ll(i.join(","),e,t)),o.push(ll("#stage-sidebar-tiny-bar img",e,32)),o.push(Sm(e))),n&&o.push(xy(a,n)),w(Hm,o.join(""))}function ky(){let t=Pm(),e=yl();for(let n of e)Dm(n,t);if(x.store.applyToMenu!==!1){let n=bn();n&&Sy(n,t)}for(let n of document.querySelectorAll(`img[${Qn}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||tr(n)}function ma(){if(!(!ht||nr)){nr=!0;for(let t of Ce.values())t.disconnect();ae?.disconnect(),Gt?.disconnect();try{Ty(),ky()}finally{nr=!1,vl(),Hy(),or?.isConnected&&$m(or),Om()}}}function fo(){!ht||rr||(rr=requestAnimationFrame(()=>{rr=0,ma()}))}function Cy(){nr||!ht||fo()}function My(t){if(Ce.has(t))return;let e=new MutationObserver(Cy);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),Ce.set(t,e)}function Ay(t){Ce.get(t)?.disconnect(),Ce.delete(t)}function vl(){let t=new Set;for(let n of yl())t.add(n),n.parentElement&&t.add(n.parentElement);let e=gn();e&&t.add(e);for(let n of[...Ce.keys()])(!t.has(n)||!n.isConnected)&&Ay(n);for(let n of t)n.isConnected&&My(n)}function Hy(){let t=Ho();if(!t){Gt?.disconnect(),Gt=null,ca=null;return}if(ca===t&&Gt){Gt.observe(t,{childList:!0});return}Gt?.disconnect(),ca=t,Gt=new MutationObserver(()=>{nr||!ht||(vl(),fo())}),Gt.observe(t,{childList:!0})}function $m(t){or===t&&ae||(ae?.disconnect(),or=t,ae=new MutationObserver(()=>{if(!t.isConnected){ae?.disconnect(),ae=null,or=null;return}nr||!ht||fo()}),ae.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function _m(t){if(!ht||x.store.applyToMenu===!1)return;let e=bn();if(e){$m(e),fo();return}t<=0||requestAnimationFrame(()=>_m(t-1))}function Fm(t){ht&&(ma(),!(yl().length||t<=0)&&(la=requestAnimationFrame(()=>Fm(t-1))))}function Iy(t){ht&&x.store.applyToMenu!==!1&&(!Io(t)&&!bn()||_m(10))}function Ny(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let d=document.createElement("p");d.className="bloom-csi-hint";let f=document.createElement("div");f.className="bloom-csi-crop";let h=document.createElement("div");h.className="bloom-csi-stage";let p=document.createElement("img");p.className="bloom-csi-stage-img",p.alt="",p.draggable=!1,h.appendChild(p);let b=document.createElement("div");b.className="bloom-csi-zoom-row";let m=document.createElement("input");m.type="range",m.className="bloom-csi-zoom",m.min=String(ml),m.max=String(fl),m.step="0.05",m.setAttribute("aria-label","Zoom");let T=document.createElement("span");T.className="bloom-csi-zoom-val";let A=document.createElement("button");A.type="button",A.className="bloom-csi-btn",A.textContent="Reset",b.append(m,T,A);let I=document.createElement("p");I.className="bloom-csi-hint",I.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",f.append(h,b,I),t.append(u,d,f);function Ut(){let g=String(x.store.avatarSource??""),C=String(x.store.avatarUrl??"");return g.startsWith("data:image/")?g:C.startsWith("data:image/")?C:""}function Mt(g,C,H){if(!a)return i.x=g,i.y=C,i.zoom=V(H,ml,fl),i;let Z=sa(a.w,a.h,H,g*a.w,C*a.h);return i.x=Z.x/a.w,i.y=Z.y/a.h,i.zoom=Z.z,i}function et(){m.value=String(i.zoom),T.textContent=`${Math.round(i.zoom*100)}%`;let g=a?sa(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;g&&a&&(p.style.width=`${a.w/g.side*100}%`,p.style.height=`${a.h/g.side*100}%`,p.style.left=`${(.5-g.x/g.side)*100}%`,p.style.top=`${(.5-g.y/g.side)*100}%`)}function R(g=!1){let C=Ut(),H=String(x.store.avatarUrl??"").trim(),Z=!!C;s.hidden=!H&&!C,(C||H)&&(s.src=C||H),document.activeElement!==l&&(l.value=Z?"":H),l.placeholder=Z?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",f.hidden=!C,d.hidden=!(e&&/^https?:\/\//.test(H)&&!C),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",C&&(g&&(i.x=sn(x.store.cropX,.5),i.y=sn(x.store.cropY,.5),i.zoom=sn(x.store.cropZoom,1)),p.getAttribute("src")!==C&&(a=null,p.onload=()=>{a={w:p.naturalWidth,h:p.naturalHeight},Mt(i.x,i.y,i.zoom),et()},p.src=C),et())}function ot(g,C,H,Z=!1){Mt(g,C,H),et();let Tl=Ut(),kl=()=>{x.store.cropX=i.x,x.store.cropY=i.y,x.store.cropZoom=i.zoom,Tl&&bl(Tl,i.x,i.y,i.zoom).then(Cl=>{Cl&&(x.store.avatarUrl=Cl)})};r&&clearTimeout(r),Z?kl():r=setTimeout(kl,80)}function Kt(g){x.store.avatarUrl=g;let C=g.trim();if(n&&clearTimeout(n),!C){x.store.avatarSource="",hl(),e=!1,R(!0);return}if(C.startsWith("data:image/")){e=!1,n=setTimeout(()=>{Zi(C).then(H=>{if(!H)return;let Z=pl(H);H.close(),Z&&gl(Z).then(()=>R(!0))})},80);return}if(/^https?:\/\//.test(C)){e=!1,x.store.avatarSource="",n=setTimeout(()=>{Zi(C).then(H=>{if(!H){e=!0,R(!0);return}let Z=pl(H);H.close(),Z?(e=!1,gl(Z).then(()=>R(!0))):(e=!0,R(!0))})},400);return}e=!1,x.store.avatarSource="",R(!0)}u.addEventListener("paste",g=>{mo(g.clipboardData)&&(g.preventDefault(),e=!1,ul(g.clipboardData).then(()=>R(!0)))}),u.addEventListener("dragover",g=>{mo(g.dataTransfer)&&g.preventDefault()}),u.addEventListener("drop",g=>{mo(g.dataTransfer)&&(g.preventDefault(),e=!1,ul(g.dataTransfer).then(()=>R(!0)))}),l.addEventListener("change",()=>Kt(l.value)),l.addEventListener("paste",g=>{mo(g.clipboardData)&&(g.preventDefault(),e=!1,ul(g.clipboardData).then(()=>R(!0)))}),l.addEventListener("keydown",g=>{Ut()&&!l.value&&(g.key==="Backspace"||g.key==="Delete")&&(Mm(),e=!1,R(!0))}),c.addEventListener("click",()=>{Mm(),e=!1,R(!0)}),h.addEventListener("pointerdown",g=>{g.button===0&&(h.setPointerCapture(g.pointerId),o.on=!0,o.px=g.clientX,o.py=g.clientY,o.x=i.x,o.y=i.y)}),h.addEventListener("pointermove",g=>{if(!o.on||!a)return;let C=h.clientWidth;if(!C)return;let{side:H}=sa(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);Mt(o.x-(g.clientX-o.px)*(H/C)/a.w,o.y-(g.clientY-o.py)*(H/C)/a.h,i.zoom),et()}),h.addEventListener("pointerup",()=>{o.on&&(o.on=!1,ot(i.x,i.y,i.zoom,!0))}),h.addEventListener("pointercancel",()=>{o.on=!1}),h.addEventListener("wheel",g=>{g.preventDefault(),ot(i.x,i.y,i.zoom*(g.deltaY<0?1.08:1/1.08))},{passive:!1}),m.addEventListener("input",()=>ot(i.x,i.y,Number(m.value))),m.addEventListener("change",()=>ot(i.x,i.y,Number(m.value),!0)),A.addEventListener("click",()=>ot(.5,.5,1,!0));let Ll=()=>R(!1);return ua=Ll,R(!0),()=>{ua===Ll&&(ua=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var qm=y({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Cm,cleanupSelectors:[`.${my}`,`.${fy}`],settings:x,start(){ht=!0,on.clear(),sl(fo),w(Cm,Tm),ia=new AbortController,document.addEventListener("click",Iy,{signal:ia.signal}),Fm(40),Om(),km.debug("started")},onSettingsChange(){on.clear(),ua?.(),ht&&(vl(),ma())},stop(){ht=!1,ia?.abort(),ia=null,rr&&cancelAnimationFrame(rr),rr=0,la&&cancelAnimationFrame(la),la=0;for(let t of Ce.values())t.disconnect();Ce.clear(),ae?.disconnect(),ae=null,or=null,Gt?.disconnect(),Gt=null,ca=null,Ly(),E(Hm),sl(null),on.clear(),km.debug("stopped")}});var ir=new S("Bloom"),zm=!1,Ry=Date.now(),Py=[Lc,bu,Tu,Mu,Ru,$u,Zu,Qu,nd,md,vd,kd,Md,Ud,nm,om,mm,qm];function fa(t){return new Promise(e=>setTimeout(e,t))}function Oy(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function By(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var Gm=8e3,jm=300,Dy=250;async function $y(){if(Ae())return await fa(jm),!0;for(;Date.now()-Ry<Gm;)if(await fa(Dy),Ae())return await fa(jm),!0;return Ae()||xa()}function xl(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function _y(){if(xl())return!0;let t=Date.now()+Gm;for(;Date.now()<t;)if(await fa(100),xl())return!0;return xl()}function Fy(){try{GM_registerMenuCommand?.("Bloom++ settings",Sc)}catch{}}function qy(){So(()=>{sr("HostShell"),ir.info("host shell",it)}),Lo(()=>{ir.info("idle ready",it)}),To(()=>{ga(),sr("HostReady"),ir.info("chrome ready",it)})}async function El(){await Dl()}async function wl(){if(zm)return;zm=!0;for(let n of Py)try{Kl(n),rc(n)}catch(r){ir.error("register failed",n.name,r)}Yl(),sr("Init"),Fy(),qy();let t=()=>sr("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await Oy(),ga(),ir.info("styles ready",it),await By(),_y().then(n=>{n&&ko()}),!await $y()){ir.warn("late islands not detected; starting default plugins",it),mn(),Co();return}await ec()}var Um=typeof unsafeWindow<"u"?unsafeWindow:window,zy=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||zy){let t=Um.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",it);try{Object.defineProperty(Um,"Bloom",{value:Sl,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}El().then(()=>wl()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
