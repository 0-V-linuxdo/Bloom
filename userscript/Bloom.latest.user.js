// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260924] v1.4.78
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

/* Bloom++ [20260924] v1.4.78. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Am=Object.defineProperty;var Hm=(t,e)=>{for(var n in e)Am(t,n,{get:e[n],enumerable:!0})};var ml={};Hm(ml,{REPO_URL:()=>Ul,Settings:()=>k,VERSION:()=>ot,contextKeyFromUrl:()=>Ut,conversationTitle:()=>yn,conversationToken:()=>at,currentConversationId:()=>M,hasDraftText:()=>yt,hasErrorToast:()=>Ht,hasLateIslands:()=>Te,init:()=>dl,initSettings:()=>ul,isDocumentInteractive:()=>Wl,isStreaming:()=>Z,isUserDraftEmpty:()=>ce,messageCreateTime:()=>Xo,plugins:()=>zt,requestChromeReady:()=>So,requestIdleReady:()=>ln,requestShellReady:()=>Eo,setEditorText:()=>Gt,subscribeHarvest:()=>st,watchStreamingEdge:()=>J,whenChromeReady:()=>wo,whenIdleReady:()=>xo,whenShellReady:()=>vo});var re=new Map,co=!1;function Nm(){return document.getElementById("bloom-root")?.shadowRoot??null}function hl(){return document.head??null}function rn(){let t=Nm();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=Im()}function ca(t,e){if(!co)return;let n=hl();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),rn();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,rn();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,rn()}function E(t,e){let n=re.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},re.set(t,n)),co&&ca(t,n)}function ua(){if(!hl())return!1;co=!0;for(let[e,n]of re)ca(e,n);return rn(),!0}function yl(t){let e=re.get(t);e&&(e.disabled=!1,co&&ca(t,e))}function vl(t){let e=re.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),rn())}function w(t){let e=re.get(t);e&&(e.el?.remove(),re.delete(t),rn())}function Im(){return Array.from(re.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var S=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function y(t){return t}var da=new Map;function on(t,e){let n=da.get(t);return n||(n=new Set,da.set(t,n)),n.add(e),()=>n.delete(e)}function Le(t,e){let n=da.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var Rm="bloompp";function xl(){return new Promise((t,e)=>{let n=indexedDB.open(Rm,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function wl(t){try{let e=await xl();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function El(t,e){try{let n=await xl();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function an(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function V(t,e,n){return Math.min(n,Math.max(e,t))}function Sl(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function Ll(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function Tl(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var uo=new S("SettingsStore"),oe="BloomSettings",Pm=100;function mo(t){return t!=null&&typeof t.then=="function"}function Om(t){if(t==null||mo(t))return null;if(an(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(an(e)&&!mo(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return an(n)&&!mo(n)?n:null}return null}catch{return null}}function po(t){let e=Om(t);if(!e)return null;let n=e.plugins;return!an(n)||mo(n)||Object.keys(n).length===0?null:e}var fo=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let d=l.slice(c.length+1);if(d&&!d.includes(".")){let f=u(d);f!==void 0&&(i[a]=f,s=f);break}}}return an(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){uo.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Pm))}save(){try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(oe,this.plain)}catch{try{GM_setValue(oe,e)}catch(n){uo.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(oe,e)}catch{}El(oe,e).catch(n=>uo.warn("Failed to save settings to IndexedDB:",n))}catch(e){uo.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){Sl(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var Bm=new S("Settings"),Dm={plugins:{}},k=new fo(structuredClone(Dm)),$m=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function _m(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function L(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?(k.store.plugins[n]||(k.store.plugins[n]={}),k.store.plugins[n]):{}},get plain(){let n=e.pluginName;return n?k.plain.plugins[n]??{}:{}}};return e}async function qm(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function kl(){let t=po(await qm(oe));if(t||(t=po(await wl(oe))),!t)try{t=po(localStorage.getItem(oe))}catch{t=null}if(!t)return;let e=t.plugins;e&&(k.plain.plugins=e,Bm.debug("Loaded settings"))}function Cl(t,e){e&&(e.pluginName=t,k.plain.plugins[t]||(k.plain.plugins[t]={}),k.setDefaultGetter($m(t),n=>{if(n!=="enabled")return _m(e.def,n)}))}function Ml(){return k.plain.plugins.Settings||(k.store.plugins.Settings={}),k.store.plugins.Settings}function go(){return Ml().pinnedPlugins??[]}function Al(t){return go().includes(t)}function Hl(t){let e=go(),n=e.includes(t);return k.store.plugins.Settings={...k.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function bo(){return Ml().starredPlugins??[]}function Nl(t){return bo().includes(t)}function Il(t){let e=bo(),n=e.includes(t);return k.store.plugins.Settings={...k.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var ho=new S("PluginManager"),zt={},nr=new Set;function Ol(t){if(zt[t.name]){ho.warn("Duplicate plugin",t.name);return}zt[t.name]=t,Cl(t.name,t.settings)}function sn(t){let e=zt[t];if(!e)return!1;if(e.required)return!0;let n=k.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function Bl(t){let e=zt[t];if(!e||e.required)return;let n=!sn(t);k.plain.plugins[t]||(k.store.plugins[t]={}),k.store.plugins[t].enabled=n,n?Dl(e):Fm(e),Le("pluginToggle",{name:t,enabled:n})}function Dl(t,e=!1){if(!nr.has(t.name)&&sn(t.name))try{t.managedStyle&&yl(t.managedStyle),t.start?.(),nr.add(t.name),t.settings&&k.addPrefixChangeListener(`plugins.${t.name}.`,()=>{nr.has(t.name)&&t.onSettingsChange?.()}),e||ho.debug("Started",t.name)}catch(n){ho.error("Failed to start",t.name,n)}}function Fm(t){if(nr.has(t.name)){try{t.stop?.()}catch(e){ho.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(vl(t.managedStyle),w(t.managedStyle)),nr.delete(t.name)}}function rr(t){for(let e of Object.values(zt))(e.startAt??"DOMContentLoaded")===t&&Dl(e)}var Rl=2,Pl="defaultsRev";function $l(){let t=k.plain.plugins.Settings;if(!(!t||t[Pl]===Rl)){for(let e of["NoShareLink","NoDictation"]){let n=k.plain.plugins[e];!n||typeof n.enabled=="boolean"||(n.enabled=!1)}t[Pl]=Rl}}var or=!1,yo=!1,ma=!1,ql=[],Fl=[],zl=[];function fa(t){let e=t.splice(0);for(let n of e)n()}function ir(){or||(or=!0,fa(ql))}function pa(){yo||(yo=!0,or||ir(),fa(Fl))}function jl(){ma||(ma=!0,or||ir(),yo||pa(),fa(zl))}function vo(t){or?t():ql.push(t)}function xo(t){yo?t():Fl.push(t)}function wo(t){ma?t():zl.push(t)}function Eo(){ir()}function ln(){ir(),pa()}function So(){jl()}function _l(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function Gl(){await _l(4e3),ir(),await _l(4e3),pa(),jl()}var v={p:"0-V-linuxdo"},ot="[20260924] v1.4.78",Ul="https://github.com/0-V-linuxdo/Bloom";var zm={BetterNavigator:1790229993e3,ChatListStatus:1790229993e3,ChatStateFavicons:1790228892e3,Cleaner:1789910872e3,ComposerOpacity:1789910872e3,CustomSidebarIdentity:1789970413e3,GreetingCustomizer:1789861316e3,InputHistory:1789858186e3,MessageTimestamps:1790229993e3,NoDictation:1789910872e3,NoShareLink:1789910872e3,NoSidebarIdentity:1789910872e3,PromptQueue:1790229993e3,RecentTopics:1790181019e3,ResponseNotification:1790229993e3,Settings:1789973738e3,StreamerMode:1789924346e3,WiderChat:1789910872e3};function Kl(t){let e=zm[t.name];typeof e=="number"&&e>0&&(t.updatedAt=e)}function jm(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Gm(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function ga(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function Te(){return ga()?jm()||Gm():!1}function Wl(){return Te()}var Um=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Vl=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Km=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Wm="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function un(t){return t.id==="bloom-root"||!!t.closest(Wm)}function Yl(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function Lo(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function ba(t){if(!(t instanceof HTMLElement)||!t.isConnected||un(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&Lo(e)?!1:t.getClientRects().length>0}function cn(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function Vm(){let t=[];for(let e of document.querySelectorAll(Um))!(e instanceof HTMLElement)||!e.isConnected||un(e)||t.push(e);return t}function To(t){if(!t.isConnected||un(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function ke(){return Vm().filter(To)[0]??null}function dn(){let t=document.getElementById("stage-sidebar-tiny-bar");if(!(t instanceof HTMLElement)||!t.isConnected||un(t))return null;let e=t.getBoundingClientRect();return e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3?null:t}function ha(t){let e=t,n=t.parentElement;n&&n.children.length===1&&!un(n)&&!cn(n)&&n.parentElement&&!cn(n.parentElement)&&(e=n);let r=e.parentElement;if(r&&!cn(r)&&!un(r)&&r.children.length>1){let o=r.getAttribute("class")||"";if(/\bflex\b/.test(o)&&!/flex-col/.test(o)&&r.parentElement&&!cn(r.parentElement))return r}return e}function mn(){let t=document.querySelectorAll(Vl);for(let n of t)if(ba(n)&&!Lo(n)&&Yl(n))return n;let e=document.querySelectorAll(Km);for(let n of e){if(!ba(n)||!Yl(n)||Lo(n))continue;let r=n.querySelector(Vl);return ba(r)&&!Lo(r)?r:n}return null}function ko(){let t=ke();if(t){let e=ha(t),n=e.parentElement;if(n&&!cn(n))return n;if(!cn(e))return e}return dn()}function Co(t){let e=ke();return e?t.composedPath().includes(e):!1}var va=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Ym={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Xm(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Zm(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function ya(t){let e=Xm(t);return e?Zm(e)>.55?"light":"dark":null}function Jm(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=ya(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=ya(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=ya(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Mo(t){return t==="auto"?Jm():t}function Qm(t){try{let e=getComputedStyle(document.documentElement);for(let n of va){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function Ao(t,e,n){let r=Ym[e];if(n){Qm(t);for(let o of va)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of va)t.style.setProperty(o,r[o])}function Xl(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var xa=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var ef="bloom-root",Ct="bloom-rail-item",Po="bloom-account-item",Me="bloom-sidebar-panel",pr="bloom-plugin-dialog",Fo="bloom-plugin-layer",Oo="bloom-settings-css",nf=2e3,Ql=null,rf=null,le=!1,La=[],Ho=null,Bo=null,ae=null,Io=null,jt=null,dr=null,ar,fn=0,mr=0,sr=0,lr=null,cr=null,Do=null,tc=null,ur=null,wa=[],$o=!1,of=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],af=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],sf=new Set(["chat","ui","privacy"]),lf=10080*60*1e3,zo="",fr="all",kt="all";function jo(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function ec(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function cf(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'}function uf(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function df(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function mf(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var ff={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function pf(t){return t.icon||ff[t.name]||jo()}function Ea(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),Ao(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function nc(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function _o(){let t="auto",e=Mo(t);Ea(Ql,e,!0);let n=document.getElementById(Me);n instanceof HTMLElement&&Ea(n,e,!0);let r=document.getElementById(pr);r instanceof HTMLElement&&Ea(r,e,!0);let o=document.getElementById(Ct);o instanceof HTMLElement&&nc(o),Le("schemeChange",{scheme:e,pref:t})}function rc(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function oc(){if(E("settings",xa),document.getElementById(Oo)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=Oo,t.textContent=xa,document.head.appendChild(t)}function gf(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function bf(){for(let t of La)t();La=[]}function ic(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function hf(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function Ca(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function yf(t){return Ca(t).length>0}function Ro(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function vf(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=hf(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function xf(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(vf(e,n));let i=k.store.plugins[t]??(k.store.plugins[t]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",La.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??Ro(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??Ro(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=ic(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??Ro(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function Zl(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function wf(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=k.store.plugins[t.name]??(k.store.plugins[t.name]={});for(let[n,r]of Ca(t)){if(n==="enabled"||r.type===5)continue;let o=Ro(r);o!==void 0&&(e[n]=o)}sc(t)}function ac(t){t.key==="Escape"&&(!document.getElementById(Fo)&&!document.getElementById(pr)||(t.stopPropagation(),pn()))}function Ef(){$o||(document.addEventListener("keydown",ac),$o=!0)}function Sf(){$o&&(document.removeEventListener("keydown",ac),$o=!1)}function pn(){bf(),Sf(),document.getElementById(Fo)?.remove(),document.getElementById(pr)?.remove()}function sc(t){if(pn(),!document.body)return;let e=document.createElement("div");e.id=Fo,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",se),e.addEventListener("pointerup",se),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&pn()});let n=document.createElement("div");n.id=pr,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",se),n.addEventListener("pointerup",se),n.addEventListener("click",se);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=ec(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),pn()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=Zl("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=Zl("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=Ca(t);if(c.length)for(let[u,d]of c){let f=xf(t.name,u,d);f&&l.appendChild(f)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>wf(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),Ef(),_o()}function Lf(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=pf(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=Nl(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=df(l),c.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let m=Il(t.name);Le("pluginStar",{name:t.name,starred:m})}),s.appendChild(c),!t.required){let b=Al(t.name),m=document.createElement("button");m.type="button",m.className=`bloom-icon-btn bloom-card-pin${b?" bloom-card-pin-active":""}`,m.setAttribute("aria-label",b?"Unpin from top":"Pin to top"),m.innerHTML=mf(b),m.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();let A=Hl(t.name);Le("pluginPin",{name:t.name,pinned:A})}),s.appendChild(m)}if(yf(t)){let b=document.createElement("button");b.type="button",b.className="bloom-icon-btn bloom-card-settings",b.setAttribute("aria-label",`${t.name} settings`),b.innerHTML=uf(),b.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation(),sc(t)}),s.appendChild(b)}let u=ic(t.name,sn(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",b=>b.stopPropagation()),d?.addEventListener("change",()=>{Bl(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let b=document.createElement("div");b.className="bloom-card-desc",b.textContent=t.description,n.appendChild(b)}let f=document.createElement("div");f.className="bloom-card-separator";let h=document.createElement("div");h.className="bloom-card-footer";let g=document.createElement("div");return g.className="bloom-card-author",g.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",h.appendChild(g),e.append(n,f,h),e}function lc(){return Object.values(zt).filter(t=>!t.hidden&&t.name!=="Settings")}function Tf(t){return t.updatedAt!=null&&Date.now()-t.updatedAt<lf}function cc(t,e){if(e==="all"||e==="favorites")return!0;if(e==="recent")return Tf(t);let n=(t.tags??[]).map(r=>r==="sidebar"?"ui":r);return e==="other"?!t.required&&!n.some(r=>sf.has(r)):n.includes(e)}function kf(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function Cf(){return zo.trim()?"No plugins match your search.":kt==="favorites"?"No favorites yet. Star a plugin to see it here.":kt==="recent"?"No plugins updated in the last 7 days.":"No plugins available."}function Mf(){let t=lc();return af.filter(e=>e.id==="favorites"||e.id==="all"||e.id==="recent"?!0:t.some(n=>cc(n,e.id)))}function Af(){if(ur){ur.replaceChildren();for(let t of Mf()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${kt===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{kt=t.id,Ce()}),ur.appendChild(e)}}}function Hf(){let t=lc();if(kt==="favorites"){let e=new Set(bo());t=t.filter(n=>e.has(n.name))}else kt!=="all"&&(t=t.filter(e=>cc(e,kt)));return fr==="enabled"&&(t=t.filter(e=>sn(e.name))),fr==="disabled"&&(t=t.filter(e=>!sn(e.name))),t}function Ce(){if(!lr)return;Af();let t=Hf();Do&&(Do.placeholder=`Search ${t.length} plugins...`);let e=t,n=zo.trim().toLowerCase();if(n&&(e=e.filter(r=>kf(r).includes(n))),kt==="recent")e=e.slice().sort((r,o)=>(o.updatedAt??0)-(r.updatedAt??0)||r.name.localeCompare(o.name));else if(kt!=="favorites"){let r=go();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}lr.replaceChildren();for(let r of e)lr.appendChild(Lf(r));cr&&(cr.hidden=e.length>0,cr.textContent=Cf())}function se(t){t.stopPropagation()}function Sa(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function Ma(){document.getElementById(Ct)?.setAttribute("aria-expanded",le?"true":"false")}function Nf(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function Aa(){pn(),zo="",fr="all",kt="all",document.getElementById(Me)?.remove(),le=!1,Ma()}function If(t){let e=document.createElement("div");e.id=t,e.setAttribute("aria-labelledby","bloom-settings-title"),e.addEventListener("pointerdown",se),e.addEventListener("pointerup",se),e.addEventListener("click",se);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=jo();let a=document.createElement("span");a.className="bloom-settings-title-row";let s=document.createElement("h2");s.id="bloom-settings-title",s.textContent="Bloom++";let l="Toggle features. Some need a reload. Click the sliders icon to configure.",c=document.createElement("button");c.type="button",c.className="bloom-info-hint",c.setAttribute("aria-label",l),c.innerHTML=cf();let u=document.createElement("span");u.className="bloom-info-hint-tip",u.setAttribute("role","tooltip"),u.textContent=l,c.appendChild(u),a.append(s,c),o.append(i,a);let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn bloom-settings-close",d.setAttribute("aria-label","Close"),d.innerHTML=ec(),d.addEventListener("click",Aa),r.appendChild(o),n.appendChild(r);let f=document.createElement("div");f.className="bloom-plugin-tabs",n.appendChild(f);let h=document.createElement("div");h.className="bloom-search-bar";let g=document.createElement("input");g.type="search",g.className="bloom-search-input",g.setAttribute("aria-label","Search plugins"),g.placeholder="Search plugins...",g.addEventListener("input",()=>{zo=g.value,Ce()});let b=document.createElement("select");b.className="bloom-search-filter",b.setAttribute("aria-label","Filter plugins");for(let A of of){let N=document.createElement("option");N.value=A.value,N.textContent=A.label,b.appendChild(N)}b.value=fr,b.addEventListener("change",()=>{fr=b.value,Ce()}),h.append(g,b),n.appendChild(h);let m=document.createElement("div");m.className="bloom-plugin-list",n.appendChild(m);let T=document.createElement("p");return T.className="bloom-tab-empty",T.hidden=!0,n.appendChild(T),e.append(d,n),lr=m,cr=T,Do=g,tc=b,ur=f,Ce(),e}function Rf(t){t.classList.add("bloom-rail-dock")}function Pf(){let t=document.getElementById(Ct);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&To(t)?t:null}function Of(){if(document.getElementById(Me)?.remove(),!document.body)return;let t=If(Me);Rf(t),document.body.appendChild(t),le=!0,pn(),_o(),Ma(),Le("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:ot,dock:"center",rail:!!Pf()})}function Ha(){let t=document.getElementById(Me);if(t instanceof HTMLElement&&t.isConnected&&Nf(t)){Aa();return}t?.remove(),Of()}function Bf(){let t=document.createElement("button");return t.type="button",t.id=Ct,t.className="bloom-rail-item",t.setAttribute("aria-controls",Me),t.setAttribute("aria-expanded",le?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${jo()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Ha()}),t}function Jl(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function Df(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function $f(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function ie(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function uc(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=Df(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&ie(t,"padding-top",Math.round(i)),Number.isFinite(a)&&ie(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));ie(n,"width",l),ie(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&ie(t,"padding-left",u);let d=$f(e,r);if(d){let f=d.getBoundingClientRect(),h=n.getBoundingClientRect(),g=Math.round(f.left-h.right);g>=0&&g<=24&&ie(t,"gap",g)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&ie(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&ie(t,"gap",Math.round(l))}nc(t)}function Ta(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function _f(){if(dr?.isConnected&&jt){jt.observe(dr,{childList:!0});return}ka()}function qf(t){if(Ta(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function Ff(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){sr=0;return}sr+=1,mr=Date.now()+Math.min(8e3,250*2**Math.min(sr,5))})}function zf(){fn||Date.now()<mr||(fn=requestAnimationFrame(()=>{fn=0,!(Date.now()<mr)&&(document.getElementById(Ct)?.isConnected||qo())}))}function qo(){if(!document.body)return;jt?.disconnect();let t=null,e=!1;try{let n=document.getElementById(Ct);t=n instanceof HTMLButtonElement?n:Bf();let r=ke(),o=dn();if(r){let i=ha(r),a=i.parentElement;if(Ta(i)||a&&Ta(a))return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),Jl(t),uc(t,r)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),Jl(t,!0)):t.isConnected&&!To(t)&&(t.remove(),t=null)}finally{Ff(t,e),_f(),Ma()}}function ka(){let t=ko();!t||!qf(t)||dr===t&&jt||(jt?.disconnect(),dr=t,jt=new MutationObserver(()=>{document.getElementById(Ct)?.isConnected||zf()}),jt.observe(t,{childList:!0}))}function jf(){qo(),ka(),ar===void 0&&(ar=window.setInterval(()=>{let t=document.getElementById(Ct);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=mr&&qo();else{sr=0;let e=ke();e&&uc(t,e)}ka()},nf))}function Gf(){ar!==void 0&&(clearInterval(ar),ar=void 0),fn&&cancelAnimationFrame(fn),fn=0,mr=0,sr=0,jt?.disconnect(),jt=null,dr=null}function Uf(t){Io===t&&ae||(ae?.disconnect(),Io=t,ae=new MutationObserver(()=>{if(!t.isConnected){ae?.disconnect(),ae=null,Io=null;return}dc(t)}),ae.observe(t,{childList:!0}))}function dc(t){if(Uf(t),t.querySelector(`#${Po}`))return;let e=document.createElement("button");e.type="button",e.id=Po,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${jo()}<span>Bloom++</span>`,e.addEventListener("pointerdown",Sa),e.addEventListener("pointerup",Sa),e.addEventListener("click",n=>{Sa(n),Ha()}),t.insertBefore(e,t.firstChild)}function No(){let t=mn();return t?(dc(t),!0):!1}function Kf(t){Co(t)&&(queueMicrotask(No),requestAnimationFrame(()=>{No()}),window.setTimeout(No,60),window.setTimeout(No,180))}function Wf(){Bo?.abort();let t=new AbortController;Bo=t,document.addEventListener("click",Kf,{signal:t.signal})}function Vf(){Bo?.abort(),Bo=null,ae?.disconnect(),ae=null,Io=null}function mc(){ln(),gf(()=>{oc(),rc(),qo(),Ha()})}var fc=y({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[v.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${ef}`,`#${Ct}`,`#${Po}`,`#${Me}`,`#${Fo}`,`#${pr}`,`#${Oo}`,"#bloom-menu-panel"],start(){oc(),rc(),jf(),Wf(),Ho?.(),Ho=Xl(_o),_o(),wa=[on("pluginToggle",()=>{le&&Ce()}),on("pluginPin",()=>{le&&Ce()}),on("pluginStar",()=>{le&&Ce()})]},stop(){Gf(),Vf(),Ho?.(),Ho=null;for(let t of wa)t();wa=[],Aa(),document.getElementById(Ct)?.remove(),document.getElementById(Po)?.remove(),document.getElementById(Oo)?.remove(),Ql=null,rf=null,lr=null,cr=null,Do=null,tc=null,ur=null,le=!1}});var Go='form[data-type="unified-composer"], form.w-full[data-type]',Mt=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),gn=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),pc=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),gc=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Yf=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Xf='[contenteditable="false"], button, [role="button"]';function bt(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function Ae(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!bt(o)))return o;return null}function bc(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function B(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=bc(t);return!!(Yf.test(n)||/^stop$/i.test(n))}function ht(){let e=Array.from(document.querySelectorAll(Go)).find(bt);if(e instanceof HTMLElement)return e;let n=Ae(document,Mt),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function Y(){let t=Array.from(document.querySelectorAll(Mt));return t.find(bt)??t[0]??null}function Zf(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(Xf);return!!n&&n!==e&&e.contains(n)}function Na(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&Zf(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function yt(t){let e=t??Y();return e?Na(e,e).replaceAll("\u200B","").trim().length>0:!1}function ce(t){return!yt(t)}function Uo(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function hc(t){let e=ht();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!bt(n))&&t(n))return n;return null}function ue(){let t=ht(),e=Ae(t,gn)??Ae(document,gn);return e&&!B(e)?e:hc(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!B(n);let o=bc(n);return/^(send|send prompt|发送)$/i.test(o)&&!B(n)})}function He(){let t=ht(),e=Ae(t,pc,!0)??Ae(document,pc,!0);if(e)return e;let n=Ae(t,gc)??Ae(document,gc);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&bt(r)&&B(r))return r}return hc(B)}function it(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>Na(n,t)).join(`
`):Na(t,t)}function Ia(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function Gt(t,e,n=!1){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),Ia(t,n)}var yc=/\/c\/([a-zA-Z0-9_-]{8,})/i;function at(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function Ut(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function bn(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(yc)?.[1]??""}catch{return t.match(yc)?.[1]??""}}function M(){let t=bn(location.pathname);if(t)return t;let n=at().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return""}var Ec=new S("Harvest"),Jf=1500,Qf=200,Ko=new Set,Wo=new Map,Vo=new Map,hn=null,Yo=null,gr=null,At=0;function tp(){return typeof unsafeWindow<"u"?unsafeWindow:window}function ep(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function np(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}function Sc(t){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(t)}var rp=/"action"\s*:\s*"(next|continue|variant)"/i;function op(t,e,n){return!(e!=="POST"||Sc(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!rp.test(n))}function ip(t,e){return e!=="GET"||Sc(t)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(t)}function vc(t){return t.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function Lc(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function ap(t){return typeof t=="string"?Lc(t):""}function Ra(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return Ra(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function Tc(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function xc(t,e,n){!t||!e||Vo.get(t)!==e&&(Vo.set(t,e),Tc(Vo,Jf),de({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function sp(t,e){let n=e.trim();!t||!n||Wo.get(t)!==n&&(Wo.set(t,n),Tc(Wo,Qf),de({type:"conversation-meta",conversationId:t,title:n}))}function br(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)br(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&sp(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=Ra(l.create_time??l.createTime??l.created_at);c&&u&&xc(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=Ra(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&xc(a,s,o),r.mapping&&typeof r.mapping=="object")br(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&br(l,o,n+1)}function wc(t,e){if(t)try{br(JSON.parse(t),e)}catch{}}function de(t){for(let e of Array.from(Ko))try{e(t)}catch{}}async function lp(t,e,n){if(n===At)try{let r=await t.json();if(n!==At)return;br(r,e)}catch{}}async function cp(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===At&&de({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===At;){let{done:u,value:d}=await s.read();if(u)break;if(c+=l.decode(d,{stream:!0}),!o){let h=Lc(c);h&&(o=h,de({type:"post-start",conversationId:o,url:""}))}let f=c.split(`
`);c=f.pop()??"";for(let h of f){let g=h.replace(/^data:\s*/,"").trim();!g||g==="[DONE]"||wc(g,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===At&&wc(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===At&&de({type:"post-end",conversationId:o,error:i})}function up(t,e,n){let r=ep(e),o=np(e,n),i=ip(r,o),a=op(r,o,n?.body),s=At,l="";return a&&(l=ap(n?.body)||vc(r)||bn(r)||M(),de({type:"post-start",conversationId:l,url:r})),t(e,n).then(c=>{if(s!==At||!i&&!a)return c;try{let u=c.clone();i?lp(u,vc(r)||M(),s):cp(u,l,!c.ok,s)}catch{a&&de({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===At&&de({type:"post-end",conversationId:l,error:!0}),c})}function dp(){if(hn)return;let t=tp();gr=t,hn=t.fetch.bind(t);let e=(n,r)=>up(hn,n,r);Yo=e,t.fetch=e,Ec.debug("conversation fetch harvest hooked")}function mp(){At+=1,!(!hn||!gr)&&(Yo&&gr.fetch===Yo&&(gr.fetch=hn),hn=null,Yo=null,gr=null,Ec.debug("conversation fetch harvest unhooked"))}function st(t){return Ko.add(t),dp(),()=>{Ko.delete(t),Ko.size===0&&mp()}}function yn(t){return t?Wo.get(t)??"":""}function Xo(t){return t?Vo.get(t)??null:null}var Cc=new S("Streaming");function wr(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!bt(e))&&(B(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function fp(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&bt(t))}function pp(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&bt(t))}function gp(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Ht(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function Z(){if(He()||wr()||gp())return!0;let t=ue();return t&&bt(t)&&!B(t)?!1:!!(fp()||pp())}var bp=400,kc=3,Re=new Set,hr,yr=null,Pa=null,Ie=!1,Ne=0,fe="",pe="",Pe=!1,vr=!1,xr=!1,Kt=!1,F=null;function ge(){return Kt}function Mc(){return Pe}function Ac(){return Ut(at())}function Zo(t,e){return{streaming:t,contextKey:e,conversationId:M()}}function $(t,e){if(!t||t===e)return!1;if(t.endsWith("|draft")&&!e.endsWith("|draft"))return!0;try{let n=t.split("|")[0],r=e.split("|")[0],o=new URL(n).pathname.replace(/\/$/,"")||"/",i=new URL(r).pathname.replace(/\/$/,"")||"/";if((o==="/"||o==="")&&i.startsWith("/c/"))return!0}catch{}return!1}function Jo(){Ie=!1,Ne=0,fe="",Pe=!1,vr=!1,xr=!1}function hp(t){for(let e of Array.from(Re))try{e.onFall?.(t)}catch{}}function yp(t){for(let e of Array.from(Re))try{e.onRise?.(t)}catch{}}function me(t){for(let e of Array.from(Re))try{e.onTick?.(t)}catch{}}function vp(t,e){for(let n of Array.from(Re))try{n.onContext?.(t,e)}catch{}}function xp(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&B(n)&&(Pe=!0)}function wp(t){if(t.type==="post-start"){let n=M();(!t.conversationId||!n||t.conversationId===n)&&(Kt=!1,Pe=!1);return}if(t.type!=="post-end"||!Ie&&!F)return;let e=M();t.conversationId&&t.conversationId!==e||(xr=!0,t.error&&(vr=!0,F&&(F.error=!0)))}function Ep(){let t=Ac(),e=Z();if(pe&&t&&pe!==t){let o=pe;if(!$(o,t))F=null,Jo(),Kt=e;else{if(fe===o&&(fe=t),F&&F.contextKey===o){F.contextKey=t;let i=M();i&&(F.conversationId=i)}Kt=!1}if(pe=t,vp(t,o),Kt){me(Zo(!1,t));return}}else t&&(pe=t);if(Kt){if(e){me(Zo(!1,t));return}Kt=!1}if(F)if(e||F.contextKey!==t)F=null;else{let o=F;F=null,Jo(),hp(o),me(Zo(!1,t));return}let n=Zo(e,t);if(e){let o=!Ie;o&&(Pe=!1,vr=!1,xr=!1),Ie=!0,Ne=0,fe=t,o&&yp(n),me(n);return}if(!Ie){me(n);return}if(Ne+=1,xr&&(Ne=Math.max(Ne,kc)),Ne<kc){me(n);return}if(!(!!fe&&fe===t)){Jo(),me(n);return}F={contextKey:fe||t,conversationId:M(),userStopped:Pe,error:vr||Ht()},me(n)}function Sp(){hr===void 0&&(Ie=Z(),pe=Ac(),fe=Ie?pe:"",Ne=0,Pe=!1,vr=!1,xr=!1,Kt=!1,F=null,yr?.abort(),yr=new AbortController,document.addEventListener("click",xp,{capture:!0,signal:yr.signal}),Pa=st(wp),hr=setInterval(Ep,bp),Cc.debug("watchStreamingEdge started"))}function Lp(){Re.size||(hr!==void 0&&(clearInterval(hr),hr=void 0),yr?.abort(),yr=null,Pa?.(),Pa=null,Jo(),pe="",Kt=!1,F=null,Cc.debug("watchStreamingEdge stopped"))}function J(t){let e=typeof t=="function"?{onFall:t}:t;return Re.add(e),Sp(),()=>{Re.delete(e),Lp()}}var Hc="bloom-host-icon",Er="data-bloom-host-rel",Oa="not all",Ba=0,Nc=0,Tp=400;function Ic(t){Ba+=1;try{t()}finally{Ba-=1}}function Qo(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function be(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function Rc(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function kp(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Cp(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-Nc<Tp||(Nc=n,t.appendChild(e))}function Mp(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||Qo(n)&&(n.getAttribute(Er)||n.setAttribute(Er,n.rel),n.media!==Oa&&(n.media=Oa),n.rel!==Hc&&(n.rel=Hc))}function Ap(t){for(let e of t.querySelectorAll(`link[${Er}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(Er);n&&(e.rel=n),e.removeAttribute(Er),e.media===Oa&&e.removeAttribute("media")}}function Pc(t,e){let{head:n}=document;!n||!e||Ic(()=>{Mp(n,t);let r=Rc(t),{type:o,sizes:i}=kp(e);r?Cp(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function Oc(t,e){let{head:n}=document;n&&Ic(()=>{Rc(t)?.remove(),Ap(n)})}function Bc(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(Ba)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:Qo(c.target)&&(a=!0,be(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)Qo(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)Qo(u)&&u.id!==t&&(a=!0,be(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var Hp=["original","badge","dot","hole","bg"],_c=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],qc={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},ti="#FCFCFC",Np="#111111",Dc="#111111",Ip="#ffffff",Rp="#212121",Pp="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Op={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},ei=32,$c=64;function Fc(t){return typeof t=="string"&&Hp.includes(t)}function Bp(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function ni(t){let e=document.createElement("canvas");e.width=ei,e.height=ei;let n=e.getContext("2d");return n?(n.scale(ei/$c,ei/$c),t(n),e.toDataURL("image/png")):""}function Dp(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function ri(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(Pp);n&&(t.strokeStyle=Np,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function $p(t,e,n){let r=qc[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=Dc,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=Dc,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=Ip,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function Sr(t,e){if(t==="original")return e==="wait"?ni(r=>ri(r,ti)):Bp(Op[e]);let n=e==="wait"?void 0:qc[e];return ni(t==="hole"?r=>ri(r,n??ti):t==="bg"?r=>{r.fillStyle=n??Rp,Dp(r,0,0,64,64,14),r.fill(),ri(r,ti,!1)}:r=>{ri(r,ti),e!=="wait"&&$p(r,e,t==="dot"?"dot":"badge")})}function zc(t){return{wait:Sr(t,"wait"),rotate:Sr(t,"rotate"),done:Sr(t,"done"),ready:Sr(t,"ready"),error:Sr(t,"error")}}var _p=new S("ChatStateFavicons"),Be="bloom-chat-state-favicon",Wc=["input","beforeinput","cut","paste","compositionend"],Vc=L({style:{type:3,description:"Favicon overlay",options:_c}}),Nt="",_a={wait:"",rotate:"",done:"",ready:"",error:""},Lr="wait",Q=!1,z=!1,I=null,et="",lt="",$e=!0,ai=!1,vn=null,ct=0,oi=null,ii=null,Oe=null,$a=null,xn=null,vt=!1,jc=new WeakSet;function qp(){let t=Vc.store.style;return Fc(t)?t:"bg"}function Yc(){let e=document.querySelector(`link[rel~="icon"]:not(#${Be}), link[data-bloom-host-rel]:not(#${Be})`)?.href;return be(e)?e:be(Nt)?Nt:""}function Fp(){let t=document.getElementById(Be);return t instanceof HTMLLinkElement?t:null}function zp(){if(!be(Nt)){let t=Yc();t&&(Nt=t)}return be(Nt)?Nt:_a.wait}function Xc(t){return t==="wait"?zp():_a[t]}function Zc(){Pc(Be,Xc(Lr))}function O(t){let e=Xc(t);if(Lr===t){let n=Fp();if(n&&n.getAttribute("href")===e)return}Lr=t,Zc()}function Gc(){_a=zc(qp()),O(Lr)}function qa(){return Ut(at())}function Fa(t,e){!t||!e||t===e||(I===t&&(I=e),et===t&&(et=e),lt===t&&(lt=e))}function jp(){let t=qa();if(!(Z()||Q||z))return et="",t;if(et&&t&&et!==t)if($(et,t))Fa(et,t),et=t;else return et="",t;else!et&&t&&(et=t);return et||t}function Uc(t){return!I||!t?!1:I===t?!0:$(I,t)}function Jc(){Q=!1,z=!1,I=null,et=""}function Qc(t){lt=t,Jc(),$e=!1,ai=!0,O("wait")}function Da(t){return!t&&$e}function Gp(){if(!vt)return;let t=qa();if(lt&&t&&lt!==t&&!$(lt,t)){Qc(t);return}lt&&t&&$(lt,t)&&Fa(lt,t),t&&(lt=t);let e=Z(),n=e&&!ge();if(ai){if(ge()){O("wait");return}ai=!1}if(ge()){O("wait");return}let r=jp(),o=ce();if(Mc()&&!e){Q=!1,z=!1,I=null,O(o?"wait":Da(o)?"ready":"wait");return}if(Ht()&&!e&&Q){O("error"),Q=!1,z=!1,I=null;return}if(n){Q||($e=!1),Q=!0,z=!1,I=r,O("rotate");return}if(Q)if(!Uc(t))Q=!1,z=!1,I=null;else if(z){Q=!1,z=!0,I=t||r,O("done");return}else{O("wait");return}if(z)if(I&&t&&!Uc(t))z=!1,I=null;else if(o){I=r||I,O("done");return}else if(Da(o)){z=!1,O("ready");return}else{z=!1,O("wait");return}I=null,o?O("wait"):Da(o)?O("ready"):O("wait")}function De(){vt&&(ou(),eu(),nu(),Gp())}function tu(){if(xn){for(let t of Wc)xn.removeEventListener(t,ru,!0);xn=null}}function eu(){let t=ht(),e=t&&t!==document.body?t:null;if(!(xn===e&&e?.isConnected)&&(tu(),!!e)){xn=e;for(let n of Wc)xn.addEventListener(n,ru,{capture:!0,passive:!0})}}function nu(){let t=ht();if(!(Oe&&$a===t&&t.isConnected)){if(Oe?.disconnect(),$a=t,!t||t===document.body){Oe=null;return}Oe=new MutationObserver(()=>si()),Oe.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function si(){if(vt){if(document.hidden){ct&&(cancelAnimationFrame(ct),ct=0),De();return}ct||(ct=requestAnimationFrame(()=>{ct=0,vt&&De()}))}}function ru(){yt()&&($e=!0),si()}function Kc(){yt()&&($e=!0),si()}function Up(){vt&&(ct&&(cancelAnimationFrame(ct),ct=0),De())}function Kp(){vt&&($e=!1,De())}function Wp(t){if(!vt)return;if(t.userStopped){Q=!1,z=!1,I=null,O("wait");return}if(t.error){Q=!1,z=!1,I=null,O("error");return}let e=qa();if(t.contextKey&&e&&t.contextKey!==e&&!$(t.contextKey,e)){Q=!1,z=!1,I=null,O("wait");return}Q=!1,z=!0,I=e||t.contextKey,O("done")}function Vp(){vt&&De()}function Yp(t,e){if(vt){if($(e,t)){Fa(e,t),lt=t,De();return}Qc(t)}}function ou(){let t=Y();!t||jc.has(t)||(jc.add(t),t.addEventListener("input",Kc,{capture:!0,passive:!0}),t.addEventListener("compositionend",Kc,{capture:!0,passive:!0}))}var iu=y({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Vc,startAt:"DOMContentLoaded",cleanupSelectors:[`#${Be}`],start(){vt=!0,Nt=Yc()||Nt,Gc(),ii?.disconnect(),ii=Bc(Be,t=>{be(t)&&(Nt=t),Zc()}),vn?.abort(),vn=new AbortController,window.addEventListener("popstate",si,{signal:vn.signal}),document.addEventListener("visibilitychange",Up,{signal:vn.signal}),ou(),eu(),nu(),oi?.(),oi=J({onRise:Kp,onFall:Wp,onTick:Vp,onContext:Yp}),De(),_p.debug("favicon watch started")},stop(){vt=!1,ct&&cancelAnimationFrame(ct),ct=0,oi?.(),oi=null,vn?.abort(),vn=null,tu(),Oe?.disconnect(),Oe=null,$a=null,ii?.disconnect(),ii=null,Jc(),lt="",$e=!0,ai=!1,Lr="wait",Oc(Be,Nt)},onSettingsChange:Gc});var au=`.bloom-ih-hud {
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
`;var Dv=new S("InputHistory"),za=/\u200B/g,su=10,lu=500,cu=100,Zp=8,Jp=120,Qp=2e3,li=10,ci=L({maxEntries:{type:4,description:"Max stored prompts",min:su,max:lu,default:cu},history:{type:5,description:"Stored prompts",render:pg},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),ja=new Map,j=0,Ga="",It=!1,kr=!1,Wa=0,Tr=null,Ua,Va=null,uu=!0;function xt(){let t=ci.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function du(t){let e=V(Number(ci.store.maxEntries??cu),su,lu);return t.length>e?t.slice(t.length-e):t}function ui(t){ci.store.entries=du(t)}function tg(t){return t.replaceAll(za,"").replace(/\n$/,"").trim()}function Ka(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Mt);return n instanceof HTMLElement?n:Y()}function eg(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!it(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(za,"").trim().length===0,last:i.toString().replaceAll(za,"").trim().length===0}}catch{return{first:!0,last:!0}}}function mu(t){clearTimeout(Ua),Ua=setTimeout(()=>{if(t!==Wa)return;kr=!1;let e=Va;e&&Ia(e,uu)},Jp)}function fu(t,e,n){kr=!0,Va=t,uu=n;let r=++Wa;Gt(t,e,n),mu(r)}function ng(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function wn(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function rg(){document.querySelector(".bloom-ih-hud")?.remove()}function og(t,e){let n=ng();n.textContent=t;let r=(e.closest("form")??ht()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-Zp)}px`,n.classList.add("bloom-ih-hud-on")}function Ya(t){let e=tg(t);if(!e)return;let n=Date.now(),r=ja.get(e);if(r&&n-r<Qp)return;ja.set(e,n);let o=xt().filter(i=>i!==e);o.push(e),ui(o),j=xt().length,It=!1,wn()}function ig(t,e){let n=xt();if(!n.length&&t)return;j>=n.length&&(Ga=it(e),j=n.length);let r=t?j-1:j+1;r<0||r>n.length||(j=r,It=!0,fu(e,r===n.length?Ga:n[r],t),r<n.length?og(`${r+1} / ${n.length}`,e):wn())}function ag(t){It=!1,wn(),fu(t,Ga,!1),j=xt().length}function sg(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=Ka(t.target)??Ka(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&It&&!t.altKey&&!t.shiftKey){ag(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){Ya(it(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=xt();if(!r){let i=eg(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||j<=0)||!n&&j>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),ig(n,e))}function lg(t){if(Ka(t.target)){if(kr){mu(Wa);return}It&&(It=!1,wn(),j=xt().length)}}function cg(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(Mt);n instanceof HTMLElement&&Ya(it(n))}function ug(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(gn);if(!n||!(n instanceof HTMLElement)||B(n))return;let r=Y();r&&Ya(it(r))}function dg(t){if(!(!It||kr)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}It=!1,wn()}}function mg(){if(Tr)return;Tr=new AbortController;let{signal:t}=Tr,e={capture:!0,signal:t};window.addEventListener("keydown",sg,e),window.addEventListener("input",lg,e),window.addEventListener("submit",cg,e),window.addEventListener("click",ug,e),window.addEventListener("pointerdown",dg,e)}function fg(t){let e=xt().slice();e.splice(t,1),ui(e),j>e.length&&(j=e.length)}function pg(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=xt().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(m=>m.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/li));n>=l&&(n=l-1);let c=s.slice(n*li,n*li+li);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let m=document.createElement("div");m.className="bloom-ih-list",c.forEach((T,A)=>{let N=i.indexOf(T),qt=xt().length-1-N,Tt=document.createElement("div");Tt.className="bloom-ih-item";let tt=document.createElement("button");tt.type="button",tt.className=`bloom-ih-body${r===A?"":" bloom-ih-clamp"}`,tt.textContent=T,tt.addEventListener("click",()=>{r=r===A?-1:A,o()});let R=document.createElement("div");R.className="bloom-ih-actions";let rt=document.createElement("button");rt.type="button",rt.title="Copy",rt.textContent="C",rt.addEventListener("click",()=>{Ll(T)});let Ft=document.createElement("button");Ft.type="button",Ft.title="Delete",Ft.textContent="\xD7",Ft.addEventListener("click",()=>{fg(qt),o()}),R.append(rt,Ft),Tt.append(tt,R),m.appendChild(Tt)}),t.appendChild(m)}else{let m=document.createElement("p");m.className="bloom-ih-empty",m.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(m)}let d=document.createElement("div");d.className="bloom-ih-pager";let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Prev",f.disabled=n<=0,f.addEventListener("click",()=>{n-=1,o()});let h=document.createElement("span");h.textContent=`${n+1} / ${l}`;let g=document.createElement("button");g.type="button",g.className="bloom-ih-btn",g.textContent="Next",g.disabled=n+1>=l,g.addEventListener("click",()=>{n+=1,o()});let b=document.createElement("button");b.type="button",b.className="bloom-ih-clear",b.textContent="Clear all",b.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(ui([]),j=0,o())}),d.append(f,h,g,b),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var pu=y({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:ci,startAt:"HostReady",managedStyle:"inputHistory",start(){E("inputHistory",au),j=xt().length,It=!1,mg()},stop(){Tr?.abort(),Tr=null,wn(),rg(),ja.clear(),clearTimeout(Ua),kr=!1,Va=null,It=!1},onSettingsChange(){let t=xt(),e=du(t);e.length!==t.length&&ui(e),j>e.length&&(j=e.length)}});var Xa="noShareLink",gg=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],bg=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],Za=L({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function gu(t){return`${t.join(",")}{display:none!important}`}function bu(){let t=[];if(Za.store.hideShareChat!==!1&&t.push(gu(gg)),Za.store.hideShareProject!==!1&&t.push(gu(bg)),!t.length){w(Xa);return}E(Xa,t.join(`
`))}var hu=y({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Za,start:bu,onSettingsChange:bu,stop(){w(Xa)}});var xu="noDictation",hg=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],yg=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],wu=L({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function yu(t){return`${t.join(",")}{display:none!important}`}function vu(){let t=[yu(hg)];wu.store.hideDictationSettings!==!1&&t.push(yu(yg)),E(xu,t.join(`
`))}var Eu=y({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:wu,start:vu,onSettingsChange:vu,stop(){w(xu)}});var Ja="noSidebarIdentity",En=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Tu=En.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),ku=En.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),vg=[...Tu,...ku],xg=[...Tu,...En.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],wg=En.map(t=>`${t} a[href^="mailto:"]`),Eg=En.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),Sg=En.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),Cr=L({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function Su(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Lg(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function Tg(){return`${Sg.join(",")}{margin-block:auto!important}`}function kg(){return`${Eg.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function Lu(){let t=Cr.store.hideUsername!==!1,e=Cr.store.hideEmail!==!1,n=t&&Cr.store.enlargePlan!==!1,r=t&&Cr.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(Lg([...xg,...ku])),o.push(Tg())):o.push(Su(vg))),e&&o.push(Su(wg)),n&&o.push(kg()),!o.length){w(Ja);return}E(Ja,o.join(`
`))}var Cu=y({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Cr,start:Lu,onSettingsChange:Lu,stop(){w(Ja)}});var Mu=`#bloom-rt-host {
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
`;var Nu=new S("RecentTopics"),Tn="bloom-rt-host",Iu="home",Ru=/^\/c\/([a-z0-9_-]{8,})/i,Mg=/\/c\/([a-z0-9_-]{8,})/i,Pu=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Ag=new Set(["Backquote","IntlBackslash"]),Hg=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Ng=140,Ig=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),G=L({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Ig},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),di=null,mi=null,nt=!1,Rr=!1,Mr=!1,Rt=0,_e="",Sn=null,Ar=null,Ln,Qa=null,ts=null;function Rg(){let t=Number(G.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function Hr(){let t=G.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function ns(){let t=G.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Ou(){let t=G.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function rs(){let t=G.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function pi(t){let e=Rg();return t.length>e?t.slice(0,e):t}function Pt(t){return t===Iu}function Nr(t,e=Ng){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function os(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(Ru)?.[1]??""}catch{return t.match(Mg)?.[1]??""}}function qe(){let t=(location.pathname||"/").match(Ru);if(t?.[1])return t[1];let n=at().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return Iu}function is(t){if(Pt(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(os(r.getAttribute("href")||"")!==t)continue;let o=Nr(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return qe()===t&&e&&!/^ChatGPT$/i.test(e)?Nr(e,80):""}function Pg(t){if(Pt(t))return"New chat";let e=ns()[t];if(e)return e;let n=yn(t);return n||is(t)||"Chat"}function Og(t){return rs()[t]||""}function Bg(t){return Ou()[t]||{}}function as(t,e){if(!t||Pt(t)||!e||/^new chat$/i.test(e.trim()))return;let n=ns();n[t]!==e&&(n[t]=e,G.store.titles=n)}function Dg(t){t.type==="conversation-meta"&&(as(t.conversationId,t.title),nt&&kn())}function $g(t,e){if(!t||Pt(t)||!e)return;let n=rs();n[t]!==e&&(n[t]=e,G.store.projects=n)}function _g(t,e){if(!t||Pt(t)||!e.user&&!e.assistant)return;let n=Ou(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,G.store.previews=n)}function ss(t){if(!t||Pt(t)&&G.store.includeHome===!1)return;let e=Hr().filter(n=>n!==t);e.unshift(t),G.store.visits=pi(e)}function gi(){let t=G.store.includeHome!==!1;return pi(Hr().filter(n=>t||!Pt(n))).map(n=>({id:n,title:Pg(n),project:Og(n),preview:Bg(n)}))}function Au(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return Nr(o)}catch{return""}}function Ir(t){if(!t||Pt(t)||t!==qe())return;let e=is(t);e&&as(t,e);let n=Au("user"),r=Au("assistant");_g(t,{user:n,assistant:r});let o=Du(t);if(o){let i=Bu(o);i&&$g(t,i)}}function ls(){let t=ns(),e=rs(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${Tn}, #bloom-root, #bloom-sidebar-panel`))continue;let u=os(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=Nr(c.textContent||"",80);d&&!Pu.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let f=Bu(c);f&&e[u]!==f&&(e[u]=f,i=!0)}}catch{}o&&(G.store.titles=t),i&&(G.store.projects=e);let a=Hr(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(G.store.visits=pi([...a,...l]))}function Bu(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=Nr((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!Pu.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function Du(t){if(Pt(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(os(e.getAttribute("href")||"")===t)return e}catch{}return null}function qg(t){let e=Du(t);if(e){e.click();return}if(Pt(t)){location.assign("/");return}location.assign(`/c/${t}`)}function Fg(){let t=qe();_e&&_e!==t&&Ir(_e),_e=t,ss(t),ls();let e=is(t);e&&as(t,e),Ir(t)}function fi(){Ln===void 0&&(Ln=window.setTimeout(()=>{Ln=void 0,Fg()},120))}function zg(){Sn||(Sn=history.pushState.bind(history),Ar=history.replaceState.bind(history),history.pushState=function(...e){let n=Sn(...e);return fi(),n},history.replaceState=function(...e){let n=Ar(...e);return fi(),n})}function jg(){Sn&&(history.pushState=Sn),Ar&&(history.replaceState=Ar),Sn=null,Ar=null}function Gg(t){return Ag.has(t.code)||t.keyCode===192?!0:Hg.has(t.key)}function $u(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function Ug(t,e){Rr=e,ls(),Ir(qe()),nt=!0,Rt=0;try{let n=qe();ss(n);let r=gi();r.length>1&&(Rt=t?r.length-1:1)}catch(n){Nu.error("Failed to open switcher:",n)}kn()}function Hu(t){let{length:e}=gi();e&&(Rt=(Rt+(t?-1:1)+e)%e,kn())}function cs(){if(!nt)return;let t=gi()[Rt];nt=!1,Rr=!1,kn(),t&&qg(t.id)}function _u(){nt&&(nt=!1,Rr=!1,kn())}function Kg(t){if($u(t)){Mr=!0;return}if((t.ctrlKey||Mr)&&!t.altKey&&!t.metaKey&&Gg(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{nt?Hu(t.shiftKey):Ug(t.shiftKey,!0)}catch(n){Nu.error("Hotkey failed:",n)}return}if(nt){if(t.key==="Escape"){t.preventDefault(),_u();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),cs();return}t.key==="Tab"&&(t.ctrlKey||Mr)&&(t.preventDefault(),Hu(t.shiftKey))}}function Wg(t){$u(t)&&(Mr=!1,nt&&Rr&&cs())}function Vg(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(fi)}function Yg(t){!nt||(t.target instanceof Element?t.target:null)?.closest(`#${Tn}`)||_u()}function Xg(){document.visibilityState==="hidden"&&Ir(qe())}function es(t=mi){t instanceof HTMLElement&&Ao(t,Mo("auto"),!0)}function Zg(){if(!document.body)return null;let t=document.getElementById(Tn);if(t instanceof HTMLElement)return mi=t,es(t),t;t=document.createElement("div"),t.id=Tn;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),mi=t,es(t),t}function kn(){let t=Zg();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!nt){e.dataset.visible="false",e.replaceChildren();return}let n=gi();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}Rt>=n.length&&(Rt=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===Rt?"true":"false",s.setAttribute("aria-selected",a===Rt?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{Rt=a,cs()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function Jg(){document.getElementById(Tn)?.remove(),mi=null}var qu=y({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${Tn}`],settings:G,start(){E("recentTopics",Mu),_e=qe(),ss(_e),ls(),Ir(_e),Qa=st(Dg),zg(),di=new AbortController;let{signal:t}=di;window.addEventListener("keydown",Kg,{capture:!0,signal:t}),window.addEventListener("keyup",Wg,{capture:!0,signal:t}),window.addEventListener("popstate",fi,{signal:t}),document.addEventListener("click",Vg,{capture:!0,signal:t}),document.addEventListener("click",Yg,{signal:t}),document.addEventListener("visibilitychange",Xg,{signal:t}),ts=on("schemeChange",()=>es())},stop(){di?.abort(),di=null,Ln!==void 0&&(clearTimeout(Ln),Ln=void 0),jg(),Qa?.(),Qa=null,ts?.(),ts=null,nt=!1,Rr=!1,Mr=!1,Jg()},onSettingsChange(){let t=pi(Hr());t.length!==Hr().length&&(G.store.visits=t),nt&&kn()}});var us="cleaner",Qg=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],tb=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],eb=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],nb=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],rb=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],ob=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],Fe=L({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function Cn(t){return`${t.join(",")}{display:none!important}`}function Fu(){let t=[];if(Fe.store.hideDownloadApps!==!1&&t.push(Cn(Qg)),Fe.store.hideDisclaimer!==!1&&t.push(Cn(tb)),Fe.store.hideUpgrade!==!1&&t.push(Cn(eb)),Fe.store.hideLockedModels!==!1&&t.push(Cn(nb)),Fe.store.hideHomePromo!==!1&&t.push(Cn(rb)),Fe.store.hideAds!==!1&&t.push(Cn(ob)),!t.length){w(us);return}E(us,t.join(`
`))}var zu=y({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Fe,start:Fu,onSettingsChange:Fu,stop(){w(us)}});var hi=new S("ResponseNotification"),An=L({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:db},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),ds=!1,bi=null,Mn=null,Pr=null;function ib(){return document.visibilityState==="hidden"||document.hidden}function ab(){return An.store.onlyWhenHidden===!1?!0:ib()}function sb(){let t=yn(M());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function ju(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!Mn||Mn.state==="closed")&&(Mn=new t);let e=Mn,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){hi.debug("chime failed",t)}}function lb(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){hi.debug("custom sound failed",e),ju()}}function Gu(){let t=String(An.store.soundUrl||"").trim();t?lb(t):ju()}function cb(){let t="Bloom++",e=`${sb()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){hi.debug("notification failed",n)}}function ub(){ab()&&(An.store.sound!==!1&&Gu(),An.store.browserNotification!==!1&&cb())}function db(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>Gu()),t.appendChild(e),()=>{e.remove()}}var Uu=y({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:An,start(){ds=!0,bi?.(),bi=J(t=>{if(!ds||t.userStopped||t.error)return;let e=M();t.conversationId&&t.conversationId!==e||ub()}),Pr?.abort(),Pr=new AbortController,An.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:Pr.signal}),hi.debug("watch started")},stop(){ds=!1,bi?.(),bi=null,Pr?.abort(),Pr=null;try{Mn?.close()}catch{}Mn=null}});var Ku=`#bloom-pq-chip {
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
`;var Dr=new S("PromptQueue"),fs="bloom-pq-chip",Wu="promptQueue",Vu=80,fb=50,pb=2e3,Ju=L({replacePending:{type:2,description:"Replace the queued prompt if you Enter again while one is waiting.",default:!0}}),U=new Map,Wt=!1,wt="",q="",Vt=!1,Et=!1,_=null,Or=null,yi=null,he,Br,Hn=null;function Nn(){return Ut(at())}function In(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function Yu(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Mt);return n instanceof HTMLElement?n:Y()}function ps(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function Qu(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function gb(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?In(e.innerText||e.textContent||""):""}catch{return""}}function Xu(t){if(!wt||wt===t)return;let e=U.get(wt);!e||U.has(t)||$(wt,t)&&(U.delete(wt),U.set(t,e),q===wt&&(q=t),_?.key===wt&&(_.key=t),Dr.debug("migrated pending",wt,"\u2192",t))}function gs(t){let e=Nn();if(U.get(e)&&Ju.store.replacePending===!1)return;U.set(e,{text:t,at:Date.now()}),_={key:e,text:t,turns:Qu(),ticks:3};let r=Y();r&&Gt(r,""),ye(),Dr.debug("queued",e,t.length)}function bb(t){U.delete(t),q===t&&(q=""),_?.key===t&&(_=null),ye()}function hb(){Et=!0,clearTimeout(Br),Br=setTimeout(()=>{Et=!1,Br=void 0},pb)}function yb(){let t=Nn(),e=U.get(t);if(!e)return;let n=Y();if(!n)return;U.delete(t),q="",ye(),hb(),Gt(n,e.text);let r=ue();r&&!B(r)&&!Uo(r)&&(r.click(),Et=!1)}function Zu(t){if(!Wt||Vt||Z()||Nn()!==t)return;let e=U.get(t);if(!e){q="";return}if(Ht())return;let n=Y();if(!n)return;if(!ce(n)){let o=In(it(n));if(o&&o!==e.text)return}let r=ue();!r||B(r)||Uo(r)||(Vt=!0,Gt(n,e.text),clearTimeout(he),he=setTimeout(()=>vb(t,e.text),fb))}function vb(t,e){he=void 0;try{if(!Wt)return;let n=U.get(t);if(!n||n.text!==e||Z()||Nn()!==t)return;let r=Y();if(!r)return;let o=In(it(r));if(o&&o!==e&&!ce(r))return;o!==e&&Gt(r,e);let i=ue();if(!i||B(i)||Uo(i))return;i.click(),U.delete(t),q="",ye(),Dr.debug("drained",t)}finally{Vt=!1}}function td(t){let e=ht();if(!e||e===document.body){t.style.left="50%",t.style.bottom="6.5rem";return}let n=e.getBoundingClientRect();t.style.left=`${Math.round(n.left+n.width/2)}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`;let r=Math.min(512,Math.max(160,n.width-24));t.style.maxWidth=`${Math.round(r)}px`}function ms(){Hn?.remove(),Hn=null}function ye(){if(!Wt||!document.body){ms();return}let t=Nn(),e=U.get(t);if(!e){ms();return}let n=Hn;n?.isConnected||(n=document.createElement("div"),n.id=fs,document.body.appendChild(n),Hn=n),n.replaceChildren();let r=document.createElement("span");r.className="bloom-pq-kicker",r.textContent="Next";let o=document.createElement("span");o.className="bloom-pq-text";let i=e.text.length>Vu?`${e.text.slice(0,Vu)}\u2026`:e.text;o.textContent=i,o.title=e.text;let a=document.createElement("div");a.className="bloom-pq-actions";let s=document.createElement("button");s.type="button",s.className="bloom-pq-btn bloom-pq-send",s.textContent="Send now",s.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),yb()});let l=document.createElement("button");l.type="button",l.className="bloom-pq-btn bloom-pq-x",l.setAttribute("aria-label","Dismiss queued prompt"),l.textContent="\xD7",l.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),bb(t)}),a.append(s,l),n.append(r,o,a),td(n)}function xb(){if(!_)return;if(_.ticks-=1,U.get(_.key)&&Qu()>_.turns){let e=gb();if(e&&e===_.text){Dr.debug("native send leaked; dropping pending"),U.delete(_.key),q===_.key&&(q=""),_=null,ye();return}}_.ticks<=0&&(_=null)}function bs(){return ge()?!1:Z()}function wb(t){if(!Wt||t.isComposing||t.keyCode===229||t.key!=="Enter"||t.shiftKey||t.ctrlKey||t.metaKey||Vt)return;let e=Yu(t.target)??Yu(document.activeElement);if(!e||!bs())return;if(t.altKey||Et){Et=!1;return}if(!yt(e))return;let n=In(it(e));n&&(ps(t),gs(n))}function Eb(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||B(e))return null;let n=t.closest(gn);if(n instanceof HTMLElement&&!B(n))return n;let r=ue();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function Sb(t){if(!Wt)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${fs}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&B(n)||Vt||!bs()||!Eb(e))return;if(Et){Et=!1;return}let r=Y();if(!r||!yt(r))return;let o=In(it(r));o&&(ps(t),gs(o))}function Lb(t){if(!Wt)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(Go)&&!e.querySelector(Mt)||Vt||!bs())return;if(Et){Et=!1;return}let n=Y()??e.querySelector(Mt);if(!n||!yt(n))return;let r=In(it(n));r&&(ps(t),gs(r))}var ed=y({name:"PromptQueue",description:"Queue the next prompt while a reply is streaming. Enter/Send waits for this turn instead of interrupting.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Wu,cleanupSelectors:[`#${fs}`],settings:Ju,start(){Wt=!0,wt=Nn(),q="",Vt=!1,Et=!1,_=null,E(Wu,Ku),Or?.abort(),Or=new AbortController;let{signal:t}=Or;window.addEventListener("keydown",wb,{capture:!0,signal:t}),document.addEventListener("click",Sb,{capture:!0,signal:t}),document.addEventListener("submit",Lb,{capture:!0,signal:t}),yi?.(),yi=J({onFall(e){if(Wt){if(e.userStopped||e.error){q="",ye();return}q=e.contextKey,Zu(e.contextKey)}},onContext(e,n){n&&e&&!$(n,e)&&(q="",Vt=!1,he!==void 0&&(clearTimeout(he),he=void 0)),Xu(e),wt=e,ye()},onTick(e){Xu(e.contextKey),wt=e.contextKey,xb(),q&&q===e.contextKey&&Zu(q),Hn&&td(Hn)}}),ye(),Dr.debug("watch started")},stop(){Wt=!1,yi?.(),yi=null,Or?.abort(),Or=null,clearTimeout(he),he=void 0,clearTimeout(Br),Br=void 0,U.clear(),_=null,q="",Vt=!1,Et=!1,ms()}});var nd=`.bloom-cls {
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
`;var id=new S("ChatListStatus"),rd="chatListStatus",wi="bloom-cls",kb="bloom-cls",Cb=1200*1e3,Mb="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",St=new Map,Ot=!1,ut="",Yt=!1,On=!1,dt=0,ve=null,vs=null,Rn=null,hs=null,vi=null,$r=null,Pn=!1,xe=new Set;function xi(){return Date.now()}function ad(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function Xt(t,e,n,r=!0){if(!(!t||!Ot)){if(e==="idle")St.delete(t);else{let o=St.get(t);o&&o.kind===e&&n!=="net"?o.at=xi():St.set(t,{kind:e,at:xi(),source:n})}r&&Ab({v:1,id:t,kind:e,at:xi()}),ze()}}function Ab(t){try{Rn?.postMessage(t)}catch{}}function Hb(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||Xt(e.id,e.kind,"bc",!1)}function Nb(){let t=xi();for(let[e,n]of St)n.kind==="streaming"&&t-n.at>Cb&&St.delete(e)}function Ib(){let t=ad();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(r.closest(Mb))continue;let o=bn(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function od(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function ys(t){let e=t.querySelector(`:scope > .${wi}`);return e||null}function xs(){if(!Ot)return;Nb();let t=M(),e=Ib();ve?.disconnect();try{for(let n of e){let r=bn(n.getAttribute("href")||"");if(!r||!t||r!==t){ys(n)?.remove();continue}let i=St.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){ys(n)?.remove();continue}let a=ys(n);a||(a=document.createElement("span"),a.className=wi,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(od("streaming")):i==="error"&&a.appendChild(od("error")))}}catch(n){id.debug("paint failed",n)}sd()}function ze(){if(Ot){if(document.hidden){dt&&(cancelAnimationFrame(dt),dt=0),xs();return}dt||(dt=requestAnimationFrame(()=>{dt=0,Ot&&xs()}))}}function sd(){let t=ad();if(!(ve&&vs===t&&t?.isConnected)){if(ve?.disconnect(),vs=t,!t){ve=null;return}ve=new MutationObserver(()=>ze()),ve.observe(t,{childList:!0,subtree:!0})}}function Ei(){return!!(He()||wr())}function Rb(t){return!!(Pn||t&&xe.has(t)||!On&&Ei())}function Pb(t){if(Ot){if(t.type==="post-start"){On=!1,t.conversationId?(Pn=!1,xe.add(t.conversationId),Yt=!0,Xt(t.conversationId,"streaming","net")):(Pn=!0,Yt=!0);return}if(t.type==="post-end"){if(Pn=!1,t.conversationId){xe.delete(t.conversationId);let e=M();t.conversationId!==e?Xt(t.conversationId,"idle","net"):Xt(t.conversationId,t.error?"error":"done","net")}Ei()||(Yt=!1)}}}function Ob(t,e){if(!Ot)return;if($(e,t)){ze();return}let n=M();if(ut&&ut!==n){xe.delete(ut);let r=St.get(ut);r&&r.kind!=="idle"&&Xt(ut,"idle","local")}Pn=!1,Yt=!1,On=!0,n&&St.get(n)?.kind==="streaming"&&St.get(n)?.source==="local"&&!xe.has(n)&&Xt(n,"idle","local"),ze()}function Bb(t){if(!Ot)return;let e=t.conversationId||M();if(ut&&e&&ut!==e){xe.delete(ut);let r=St.get(ut);r&&r.kind!=="idle"&&Xt(ut,"idle","local"),Yt=!!(e&&xe.has(e))}if(e&&(ut=e),On){if(Ei()||t.streaming){ze();return}On=!1}if(Rb(e)&&(t.streaming||Ei())){Yt=!0,e&&Xt(e,"streaming","local"),ze();return}Yt&&(Yt=!1,e&&Xt(e,Ht()?"error":"done","local")),ze()}var ld=y({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${wi}`],start(){Ot=!0,E(rd,nd);try{Rn=new BroadcastChannel(kb)}catch{Rn=null}Rn?.addEventListener("message",Hb),hs=st(Pb),vi?.(),vi=J({onTick:Bb,onContext:Ob}),$r?.abort(),$r=new AbortController,document.addEventListener("visibilitychange",()=>{Ot&&(dt&&(cancelAnimationFrame(dt),dt=0),xs())},{signal:$r.signal}),sd(),id.debug("sidebar status watch started")},stop(){Ot=!1,dt&&cancelAnimationFrame(dt),dt=0,$r?.abort(),$r=null,ve?.disconnect(),ve=null,vs=null,vi?.(),vi=null,hs?.(),hs=null;try{Rn?.close()}catch{}Rn=null,St.clear(),xe.clear(),Pn=!1,Yt=!1,On=!1,ut="",document.querySelectorAll(`.${wi}`).forEach(t=>t.remove()),w(rd)}});var ud="widerChat",dd=40,md=96,fd=64,pd=L({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:dd,max:md,default:fd}});function Db(){return V(Number(pd.store.width??fd),dd,md)}function cd(){let t=Db(),e=`min(100%,${t}rem)`;E(ud,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var gd=y({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:pd,start:cd,onSettingsChange:cd,stop(){w(ud)}});var ws="composerOpacity",Bn='form[data-type="unified-composer"],form.w-full[data-type]',$b=[`${Bn} [class*="corner-superellipse"]`,`${Bn} [class*="bg-token-bg-primary"]`,`${Bn} [class*="bg-token-main-surface"]`].join(","),_b=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),qb="#thread-bottom-container,#thread-bottom",Fb=`${Bn} #prompt-textarea,${Bn} [contenteditable="true"]`,zb="var(--bg-primary,var(--main-surface-primary,#ffffff))",Es=L({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function jb(){return V(Number(Es.store.opacity??100),0,100)}function Gb(){return V(Number(Es.store.blur??16),0,40)}function bd(){let t=jb();if(t>=100){w(ws);return}let e=Gb(),n=`color-mix(in srgb,${zb} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";E(ws,`${qb}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${_b}{display:none!important}${Bn}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${$b}{background-color:${n}!important;background-image:none!important;${r}}${Fb}{background-color:transparent!important;background-image:none!important}`)}var hd=y({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[v.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Es,start:bd,onSettingsChange:bd,stop(){w(ws)}});var yd=`#bloom-bn-host {
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
`;var Kb=new S("BetterNavigator"),Ss="betterNavigator",Ed="bloom-bn-host",Cs=60,Wb=16,Vb=1e3,Yb=2.5,Xb=.4,Ti="\u6B63\u5728\u8F93\u51FA\u2026",Ms="Image",Zb="\u2753",Jb="\u{1F916}",vd=/file_[0-9a-f]+/gi,Qb=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),th=2e3,eh=40,nh=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,rh=['section[data-testid^="conversation-turn-"][data-turn="user"]','section[data-testid^="conversation-turn-"][data-turn="assistant"]','article[data-testid^="conversation-turn-"][data-turn="user"]','article[data-testid^="conversation-turn-"][data-turn="assistant"]'].join(", "),oh=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),ih=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='thinking']","[class*='reasoning']","[class*='footnote']",".sr-only"].join(", "),ah=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),Ii=L({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),$n=new Map,jr=new Map,Bt=new Set,ki=0,Lt=!1,Qt=!1,Dn=!1,we=null,Gr=null,Ue=null,Ci=null,K=[],Ke="",Mi=0,Ai=-1,Ps=0,Hi="",mt=0,Zt=0,_r,qr=null,Si=null,Ls=null,Ts=null,je=null,As=null,Fr=null,Ge=null,_n=null,zr=null;function Ri(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function ks(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function sh(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function lh(t){let e=t.getBoundingClientRect(),n=null;try{let o=t.querySelector("[data-message-id], [data-testid^='conversation-turn-']"),a=o?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]')??o;for(;a&&a!==t;)nh.test(sh(a))&&(n=a),a=a.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=ks(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||ks(getComputedStyle(t).getPropertyValue("--thread-content-width"))||ks(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function xd(t){try{return!!t.closest(oh)}catch{return!0}}function wd(t){let e=(t.getAttribute("data-turn")||t.closest("[data-turn]")?.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("data-message-author-role")||t.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase();if(n==="user"||n==="assistant")return n;try{let o=(t.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent||"").toLowerCase();if(o.includes("you said"))return"user";if(o.includes("chatgpt said")||o.includes("assistant said"))return"assistant"}catch{}let r=(t.getAttribute("aria-label")||"").toLowerCase();return r.includes("you said")?"user":r.includes("chatgpt said")||r.includes("assistant said")?"assistant":null}function Pi(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||t.querySelector("[data-message-id]")?.getAttribute("data-message-id")||""}function Oi(t){try{if(t.querySelector("[class*='imagegen-image']")||t.querySelector('img[alt="Generated image"], img[alt^="Generated image"]'))return!0}catch{}return!1}function ch(t){try{return!!t.closest("[class*='message-image']")}catch{return!0}}function Li(t,e){if(t){vd.lastIndex=0;for(let n of t.matchAll(vd))e.add(n[0].toLowerCase())}}function uh(t){try{let e=new Set,n=s=>{ch(s)||(Li(s.getAttribute("src")||"",e),Li(s.getAttribute("srcset")||"",e),Li(s.getAttribute("href")||"",e),s instanceof HTMLImageElement&&Li(s.currentSrc||"",e))};for(let s of t.querySelectorAll("[class*='imagegen-image']")){n(s);for(let l of s.querySelectorAll("[src], [srcset], [href]"))n(l)}for(let s of t.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]'))n(s);if(e.size)return e.size;let o=t.querySelectorAll("[class*='group/imagegen-image']").length;if(!o)return 0;let i=Pi(t);return(i?t.querySelector(`#image-${CSS.escape(i)}`):t.querySelector("[id^='image-']:not([id^='image-gen-'])"))&&o>=2&&(o-=1),o}catch{return 0}}function dh(t,e){let n=uh(t),r=jr.get(e)??0,o=Math.max(r,n);return o>0&&jr.set(e,o),o>=2?`${Ms} x${o}`:Ms}function Ni(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(i.closest(ih))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return(o.textContent||"").replace(/\s+/g," ").trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<Cs+20;)e.push((r.textContent||"").replace(/\s+/g," ").trim());return e.join(" ").replace(/\s+/g," ").trim()}function mh(t,e){try{if(Oi(t)||t.querySelector("img, picture, video, canvas"))return Ms;if(t.querySelector("a[download], [class*='attachment']"))return"File";if(t.querySelector("pre, code"))return"Code"}catch{}return`Message ${e+1}`}function fh(t,e){if(e==="user"){let r=t.querySelector(".whitespace-pre-wrap")??t;return Ni(r)}let n=t.querySelector(".markdown");return n?Ni(n):""}function ph(t){return t.length>Cs?`${t.slice(0,Cs).trimEnd()}\u2026`:t}function gh(t,e,n,r){let o=fh(t,e);return o?ph(o):r?Ti:Oi(t)?dh(t,Pi(t)):mh(t,n)}function bh(){if(Qt)return!0;let t=M();return!!(t&&Bt.has(t)||!Dn&&Ur())}function Ur(){return!!(He()||wr())}function hh(){ki=Date.now()}function Sd(t){Qt=!1,t&&Bt.delete(t);let e=M();e&&Bt.delete(e)}function yh(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function vh(t){if(Oi(t)||!Ur())return!1;let e=t.querySelector(".markdown");if(!(!e||e instanceof HTMLElement&&!Ni(e)))return!1;let r=t.querySelector("[class*='thinking'], [class*='reasoning']");if(!r)return!1;if(r.getAttribute("aria-busy")==="true"||r.classList.contains("result-streaming"))return!0;try{if(r.querySelector("[aria-busy='true'], .result-streaming"))return!0}catch{}let o=r.closest("details")??r.querySelector("details");return o instanceof HTMLDetailsElement&&o.open}function xh(t,e){try{if(yh(t)||e&&vh(t))return!0}catch{}return!1}function Ld(t){if(!t||Ur())return!1;try{if(t.querySelector(Qb)||Oi(t))return!0;let e=t.querySelector(".markdown");if(e instanceof HTMLElement&&Ni(e))return!0}catch{}return!1}function wh(t){if(Ur()||ki&&Date.now()-ki<th)return;let e=[...t].reverse().find(n=>n.role==="assistant");!e||!Ld(e.el)||Sd()}function Eh(t){let e=new Set,n=[];try{for(let r of t.querySelectorAll(rh)){if(xd(r))continue;let i=Pi(r)||`anon:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}if(n.length)return n;try{for(let r of t.querySelectorAll("[data-message-id]")){if(xd(r))continue;let i=r.getAttribute("data-message-id")||""||`mid:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}return n}function Sh(){let t=Ri();if(!t||t===document.body)return[];let e=Ii.store.showAssistant!==!1,n=e&&bh(),r=Eh(t),o=null;if(e)for(let a of r)wd(a)==="assistant"&&(o=a);let i=[];try{for(let a of r){let s=Pi(a);if(!s)continue;let l=wd(a);if(l!=="user"&&l!=="assistant"||l==="assistant"&&!e)continue;let c=l==="assistant"&&n&&xh(a,a===o)&&!Ld(a),u=gh(a,l,i.length,c);u&&u!==Ti&&u!==$n.get(s)&&$n.set(s,u);let d=c&&u===Ti?Ti:$n.get(s)||u;i.push({id:s,el:a,role:l,text:d,live:c})}}catch{}return wh(i),i}function Lh(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function Td(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function Th(t){return t===window?window.innerHeight:t.clientHeight}function kh(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(ah)}catch{return!1}}function kd(){_r!==void 0&&(clearTimeout(_r),_r=void 0),qr?.classList.remove("bloom-bn-flash"),qr=null}function Ch(t){kd(),t.classList.add("bloom-bn-flash"),qr=t,_r=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),qr===t&&(qr=null),_r=void 0},800)}function Hs(t){if(!K.length)return;let e=Math.max(0,Math.min(t,K.length-1));Mi=e,Gr?.querySelectorAll(".bloom-bn-tick").forEach((r,o)=>{r.classList.toggle("bloom-bn-current",o===e)}),Ue?.querySelectorAll(".bloom-bn-item").forEach((r,o)=>{r.classList.toggle("bloom-bn-active",o===e)}),Ci&&(Ci.textContent=`${e+1} / ${K.length}`);let n=Ue?.children[e];if(n instanceof HTMLElement){let r=Ue;if(r){let o=n.offsetTop-r.clientHeight/2+n.offsetHeight/2;r.scrollTop=Math.max(0,o)}}}function Ns(t){let e=K[t];if(!e?.el.isConnected)return;Ai=t,Ps=Date.now()+Vb,Hs(t);let n=_n??Td(e.el),o=Math.abs(e.el.getBoundingClientRect().top-Lh())>Yb*Th(n);e.el.scrollIntoView({behavior:o?"auto":"smooth",block:"start"}),Ii.store.jumpEffect!=="none"&&Ch(e.el)}function Os(){if(!Lt||!K.length)return;if(Date.now()<Ps&&Ai>=0){Hs(Ai);return}let t=window.innerHeight*Xb,e=0;for(let n=0;n<K.length;n++){let r=K[n].el;r.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}Hs(e)}function Mh(t){let e=Td(t);if(_n===e&&zr)return;zr?.(),_n=e;let n=e===window?document:e,r=()=>{Os(),Bs()};n.addEventListener("scroll",r,{passive:!0}),zr=()=>n.removeEventListener("scroll",r)}function Ah(t){Ge?.disconnect(),Ge=null;let e=_n instanceof HTMLElement?_n:null;Ge=new IntersectionObserver(()=>Os(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el.isConnected&&Ge.observe(n.el)}function Hh(){if(!document.body)return null;let t=we;if(t?.isConnected)return t;t=document.createElement("div"),t.id=Ed,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),we=t,Gr=e,Ue=i,Ci=o,t}function Cd(){let t=we,e=Ri();if(!t||!e||!e.isConnected||K.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=lh(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||eh,d=n.right-r.right>=c+8?r.right+4:r.right-12-c;d=Math.min(d,n.right-c-8),d=Math.max(8,d);let f=Math.max(8,Math.round(window.innerWidth-d-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${f}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function Bs(){!Lt||Zt||(Zt=requestAnimationFrame(()=>{Zt=0,Lt&&Cd()}))}function Nh(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function Ih(t){let e=Gr,n=Ue;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>Wb),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=Nh(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",c=>{c.preventDefault(),Ns(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-emoji",s.textContent=r.role==="user"?Zb:Jb;let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=r.text,l.title=r.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),Ns(o)}),n.appendChild(a)}))}function Rh(t){Gr?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=Ue?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function Ph(){let t=M();return t===Hi?!1:(Hi=t,$n.clear(),jr.clear(),K=[],Ke="",Mi=0,Ai=-1,Ps=0,Qt&&t&&(Bt.add(t),Qt=!1),!0)}function Oh(t){let e=Ii.store.showAssistant!==!1?"1":"0";return`${Hi}|${e}|${t.map(n=>n.id).join(",")}`}function Is(){if(!Lt)return;Ph();let t=Sh(),e=Ri();if(!e||t.length<1){K=t,Ke="",we&&(we.hidden=!0),Ge?.disconnect(),Rs();return}Hh();let n=Oh(t);n!==Ke?(K=t,Ke=n,Ih(t),Mh(e),Ah(t)):(K=t,Rh(t)),Cd(),Os(),Rs()}function Jt(){if(Lt){if(document.hidden){mt&&(cancelAnimationFrame(mt),mt=0),Is();return}mt||(mt=requestAnimationFrame(()=>{mt=0,Lt&&Is()}))}}function Rs(){let t=Ri();if(!(je&&As===t&&t?.isConnected)){if(je?.disconnect(),Fr?.disconnect(),As=t,!t||t===document.body){je=null;return}je=new MutationObserver(()=>Jt()),je.observe(t,{childList:!0,subtree:!0}),Fr=new ResizeObserver(()=>Bs()),Fr.observe(t)}}function Bh(t){if(Lt){if(t.type==="post-start"){hh(),Dn=!1,t.conversationId?(Qt=!1,Bt.add(t.conversationId)):Qt=!0,Jt();return}if(t.type==="post-end"){if(Qt=!1,t.conversationId)Bt.delete(t.conversationId);else{let e=M();e&&Bt.delete(e)}Jt()}}}function Dh(t){if(!Lt||!K.length||we?.hidden||t.altKey||t.ctrlKey||t.metaKey||kh(t.target))return;let e=-1;if(t.key==="ArrowDown")e=Mi+1;else if(t.key==="ArrowUp")e=Mi-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=K.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),Ns(Math.max(0,Math.min(e,K.length-1)))}function $h(){kd(),Ge?.disconnect(),Ge=null,je?.disconnect(),je=null,As=null,Fr?.disconnect(),Fr=null,zr?.(),zr=null,_n=null,we?.remove(),we=null,Gr=null,Ue=null,Ci=null}var Md=y({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:Ss,cleanupSelectors:[`#${Ed}`],settings:Ii,start(){Lt=!0,Hi=M(),E(Ss,yd),Si=new AbortController;let{signal:t}=Si;window.addEventListener("keydown",Dh,{signal:t}),window.addEventListener("popstate",Jt,{signal:t}),window.visualViewport?.addEventListener("resize",Bs,{signal:t}),document.addEventListener("visibilitychange",()=>{Lt&&(mt&&(cancelAnimationFrame(mt),mt=0),Zt&&(cancelAnimationFrame(Zt),Zt=0),Is())},{signal:t}),Ts=st(Bh),Ls=J({onTick(){Dn&&!Ur()&&(Dn=!1),Jt()},onFall(e){Sd(e.conversationId),Jt()},onContext(e,n){if(!$(n,e)){$n.clear(),jr.clear(),Ke="",Qt=!1;let r=M();for(let o of[...Bt])o!==r&&Bt.delete(o);Dn=!0}Jt()}}),Rs(),Jt(),Kb.debug("navigator started")},stop(){Lt=!1,mt&&cancelAnimationFrame(mt),mt=0,Zt&&cancelAnimationFrame(Zt),Zt=0,Si?.abort(),Si=null,Ls?.(),Ls=null,Ts?.(),Ts=null,Bt.clear(),Qt=!1,Dn=!1,ki=0,$h(),$n.clear(),jr.clear(),K=[],Ke="",w(Ss)},onSettingsChange(){Ke="",Jt()}});var Ad=`.bloom-ts {
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
`;function Hd(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Nd(t){try{return new Date(t).toISOString()}catch{return""}}var Pd=new S("MessageTimestamps"),Id="messageTimestamps",Di="bloom-ts",Rd=1500,qh="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",qn=L({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),Fn=new Map,Ye=!1,ft=0,Ee=null,$s=null,Ds=null,Bi=null,Kr=null,Wr=!1,We=!1;function Od(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function qs(){let t=qn.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Bd(){let t={...qs()};for(let[n,r]of Fn)t[n]=r;let e=Object.keys(t);if(e.length>Rd){let n=e.slice(e.length-Rd),r={};for(let o of n)r[o]=t[o];qn.store.stamps=r;return}qn.store.stamps=t}var Fh=Tl(Bd,500);function Dd(t,e){!t||!e||Fn.get(t)===e||(Fn.set(t,e),Fh(),Ve())}function zh(t){return t?Fn.get(t)??qs()[t]??Xo(t)??null:null}function jh(t){Ye&&t.type==="message-time"&&Dd(t.messageId,t.createTime)}function Gh(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function Uh(){let t=Od();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll("[data-message-id]"))n.closest(qh)||e.push(n)}catch{}return e}function Kh(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function _s(){if(!Ye)return;let t=qn.store.hideOwnMessages===!0,e=qn.store.showDate!==!1,n=Z();We&&!ge()&&(We=!1),We&&(n?Wr=!1:We=!1);let r=We?!1:n,o=Uh();Ee?.disconnect();try{o.forEach((i,a)=>{let s=i.getAttribute("data-message-id")||"",l=Gh(i),c=i.querySelector(`:scope > .${Di}`);if(t&&l==="user"){c?.remove();return}if(Kh(i)){c?.remove();return}let u=zh(s);if(!u&&s&&(r||Wr)&&a>=o.length-2&&(u=Date.now(),Dd(s,u)),!u){c?.remove();return}let d=Hd(u,e);if(!d){c?.remove();return}let f=c;f||(f=document.createElement("time"),f.className=Di,f.setAttribute("aria-hidden","true"),i.insertBefore(f,i.firstChild)),f.textContent!==d&&(f.textContent=d);let h=Nd(u);h&&f.getAttribute("datetime")!==h&&f.setAttribute("datetime",h)})}catch(i){Pd.debug("paint failed",i)}Wr=r,$d()}function Ve(){if(Ye){if(document.hidden){ft&&(cancelAnimationFrame(ft),ft=0),_s();return}ft||(ft=requestAnimationFrame(()=>{ft=0,Ye&&_s()}))}}function $d(){let t=Od();if(!(Ee&&$s===t&&t?.isConnected)){if(Ee?.disconnect(),$s=t,!t||t===document.body){Ee=null;return}Ee=new MutationObserver(()=>Ve()),Ee.observe(t,{childList:!0,subtree:!0})}}var _d=y({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Di}`],settings:qn,start(){Ye=!0,E(Id,Ad);let t=qs();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&Fn.set(e,n);Ds=st(jh),Bi?.(),Bi=J({onTick:Ve,onFall:Ve,onContext(e,n){$(n,e)||(We=!0,Wr=!1),Ve()}}),Kr?.abort(),Kr=new AbortController,document.addEventListener("visibilitychange",()=>{Ye&&(ft&&(cancelAnimationFrame(ft),ft=0),_s())},{signal:Kr.signal}),$d(),Ve(),Pd.debug("timestamp watch started")},stop(){Ye=!1,ft&&cancelAnimationFrame(ft),ft=0,Kr?.abort(),Kr=null,Ee?.disconnect(),Ee=null,$s=null,Bi?.(),Bi=null,Ds?.(),Ds=null,We=!1,Wr=!1,Bd(),Fn.clear(),document.querySelectorAll(`.${Di}`).forEach(t=>t.remove()),w(Id)},onSettingsChange:Ve});var Fs="streamerMode",Wh="filter:blur(6px)!important;transition:filter .2s ease",Vh="filter:none!important",zn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],jn=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function pt(t,e){return t.map(n=>`${n} ${e}`)}var Xe=L({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function Gn(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${Wh}}${e?`${r}{${Vh}}`:""}`}function qd(){let t=[];if(Xe.store.conversations!==!1&&(t.push(Gn([...pt(jn,'a[href^="/c/"]'),...pt(jn,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),Xe.store.projects!==!1&&(t.push(Gn([...pt(jn,'a[href*="/project"]'),...pt(jn,'a[href*="/g/g-p-"]'),...pt(jn,'[data-testid="project-name"]'),...pt(jn,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),Xe.store.headerTitle!==!1&&t.push(Gn(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),Xe.store.accountAvatar!==!1&&t.push(Gn([...pt(zn,"img"),...pt(zn,'[class*="avatar"]'),...pt(zn,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),Xe.store.accountName!==!1&&t.push(Gn([...pt(zn,".min-w-0 > .truncate"),...pt(zn,".min-w-0.flex-1 .truncate")],!1)),Xe.store.accountEmail!==!1&&t.push(Gn([...pt(zn,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!t.length){w(Fs);return}E(Fs,t.join(`
`))}var Fd=y({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[v.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Xe,start:qd,onSettingsChange:qd,stop(){w(Fs)}});var zd=`.bloom-gc-panel {
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
}`;var Xh=new S("GreetingCustomizer"),Un="greetingCustomizer",jd="greetingCustomizerUi",Vr=100,js=30,Zh=120,Jh=1e3,Qh=50,t0=40,e0=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),Yr=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),zi=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function n0(t){return!!t?.closest(e0)}function Wd(t){return!!(n0(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function no(t){try{for(let e of document.querySelectorAll(t))if(!Wd(e))return e}catch{}return null}function zs(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(no(e))return e;return t}var Vd=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],W=L({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:y0},greetings:{type:0,description:"Greeting texts",hidden:!0,default:Vd},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),Dt=!1,Vn=!1,Je=null,_i,Xr,Kn,Zr,qi=0,$i=null,Wn=null,Jr=null,Qr=null,to=null,Fi=null;function ee(){let t=location.pathname||"/";return t==="/"||t===""}function Ze(){let t=W.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):Vd.slice()}function eo(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function Gd(t){W.store.greetings=t.slice(0,js)}function ro(){let t=String(W.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function r0(){return W.store.order==="random"?"random":"sequential"}function o0(){return V(Number(W.store.intervalSec??10),1,3600)*1e3}function i0(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function a0(){return!!no(zi)}function ji(){return!!(no(zi)||no(Yr))}function s0(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=a0()?zs(zi):no(Yr)?zs(Yr):zs(zi),i=e?`${Yr}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function l0(t,e){if(t<=0)return 0;if(t===1)return Number(W.plain.index)!==0&&(W.store.index=0),Number(W.plain.lastRandom)!==0&&(W.store.lastRandom=0),0;let n=Number(W.plain.index),r=Number(W.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(r0()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return W.store.index=s,W.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return W.store.index=i,i}function te(t){if(!Dt)return;if(!ee()){w(Un);return}let e=Ze().map(eo).filter(Boolean);if(!e.length){w(Un);return}let n=l0(e.length,t),r=e[n]??e[0],o=ro()==="manual"&&e.length>1;E(Un,s0(i0(r),o)),Fi?.()}function Gs(){_i!==void 0&&(clearInterval(_i),_i=void 0)}function Us(){Gs(),!(!Dt||!ee())&&ro()==="interval"&&(Ze().filter(Boolean).length<=1||(_i=setInterval(()=>te(!0),o0())))}function Ks(){Zr!==void 0&&(clearTimeout(Zr),Zr=void 0),qi=0}function Ud(){if(Ks(),!Dt||!ee())return;qi=t0;let t=()=>{if(Zr=void 0,!(!Dt||!ee())){if(ji()){ro()==="refresh"&&!Vn?(Vn=!0,te(!0)):te(!1),Us();return}qi-=1,qi>0&&(Zr=setTimeout(t,Qh))}};t()}function Ws(){if(Je===!0){ji()?te(!1):Ud();return}Je=!0,Vn=!1,ro()==="refresh"?(Vn=!0,te(!0)):te(!1),Us(),ji()||Ud()}function Vs(){Je=!1,Vn=!1,Gs(),Ks(),w(Un)}function Gi(){Kn===void 0&&(Kn=window.setTimeout(()=>{Kn=void 0,Dt&&(ee()?Ws():Je!==!1&&Vs())},Zh))}function c0(){Wn||(Wn=history.pushState.bind(history),Jr=history.replaceState.bind(history),Qr=function(...e){let n=Wn(...e);return Gi(),n},to=function(...e){let n=Jr(...e);return Gi(),n},history.pushState=Qr,history.replaceState=to)}function u0(){Qr&&history.pushState===Qr&&Wn&&(history.pushState=Wn),to&&history.replaceState===to&&Jr&&(history.replaceState=Jr),Wn=null,Jr=null,Qr=null,to=null}function d0(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(Gi)}function m0(t){if(!Dt||!ee()||ro()!=="manual"||Ze().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(Yr);if(!n||Wd(n))return;let r=window.getSelection?.();r&&String(r).trim()||te(!0)}function f0(){Xr===void 0&&(Xr=setInterval(()=>{if(!Dt)return;let t=ee();if(t!==(Je===!0)){t?Ws():Vs();return}t&&ji()&&te(!1)},Jh))}function p0(){Xr!==void 0&&(clearInterval(Xr),Xr=void 0)}function Kd(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var g0="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",b0="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function h0(t,e){let n=eo(t);return n?n.length>Vr?`Keep it to ${Vr} characters.`:Ze().length+(e?1:0)>js?`At most ${js} greetings.`:null:"Enter a greeting."}function y0(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=Ze(),s=Number(W.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=Vr,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let m=l.querySelector(".bloom-gc-count");m&&(m.textContent=`${eo(e).length}/${Vr}`);let T=l.querySelector(".bloom-gc-error");T&&(T.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${eo(e).length}/${Vr}`;let f=document.createElement("span");f.className="bloom-gc-error",f.textContent=r;let h=document.createElement("div");if(h.className="bloom-gc-actions",n>=0){let m=document.createElement("button");m.type="button",m.className="bloom-gc-btn",m.textContent="Cancel",m.addEventListener("click",()=>{n=-1,e="",r="",i()}),h.appendChild(m)}let g=document.createElement("button");if(g.type="button",g.className="bloom-gc-btn bloom-gc-btn-primary",g.textContent=n>=0?"Update":"Add",g.addEventListener("click",()=>{let m=n<0,T=h0(e,m);if(T){r=T,i();return}let A=eo(e),N=Ze().slice();n>=0&&n<N.length?N[n]=A:N.push(A),Gd(N),n=-1,e="",r="",i()}),h.appendChild(g),u.append(d,f,h),l.appendChild(u),t.appendChild(l),!a.length){let m=document.createElement("p");m.className="bloom-gc-empty",m.textContent="No greetings. The official heading stays.",t.appendChild(m);return}let b=document.createElement("div");b.className="bloom-gc-list",a.forEach((m,T)=>{let A=document.createElement("div");A.className="bloom-gc-item",T===s&&(A.dataset.active="true");let N=document.createElement("button");N.type="button",N.className=`bloom-gc-body${o===T?"":" bloom-gc-clamp"}`,N.textContent=m,N.addEventListener("click",()=>{o=o===T?-1:T,i()});let qt=document.createElement("div");qt.className="bloom-gc-item-actions";let Tt=Kd("Edit",g0);Tt.addEventListener("click",()=>{n=T,e=m,r="",i()});let tt=Kd("Delete",b0);tt.addEventListener("click",()=>{let R=Ze().filter((rt,Ft)=>Ft!==T);Gd(R),n===T?(n=-1,e=""):n>T&&(n-=1),i()}),qt.append(Tt,tt),A.append(N,qt),b.appendChild(A)}),t.appendChild(b)};return Fi=i,i(),()=>{Fi===i&&(Fi=null),t.replaceChildren()}}var Yd=y({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:jd,settings:W,start(){Dt=!0,E(jd,zd),c0(),$i=new AbortController;let{signal:t}=$i;window.addEventListener("popstate",Gi,{signal:t}),document.addEventListener("click",d0,{capture:!0,signal:t}),document.addEventListener("click",m0,{signal:t}),f0(),Je=null,ee()?Ws():Vs(),Xh.debug("started")},stop(){Dt=!1,$i?.abort(),$i=null,Kn!==void 0&&(clearTimeout(Kn),Kn=void 0),Gs(),Ks(),p0(),u0(),w(Un),Vn=!1,Je=null},onSettingsChange(){Dt&&(ee()?(te(!1),Us()):w(Un))}});function v0(t){let e=/^data:([^;,]+)?(;base64)?,(.*)$/s.exec(t);if(!e)return null;let n=e[1]||"application/octet-stream",r=!!e[2],o=e[3]||"";try{if(r){let i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return new Blob([a],{type:n})}return new Blob([decodeURIComponent(o)],{type:n})}catch{return null}}async function Ui(t){try{return await createImageBitmap(t)}catch{return null}}async function x0(t){try{let e=new Image;return e.decoding="async",await new Promise((n,r)=>{e.onload=()=>n(),e.onerror=()=>r(new Error("img")),e.src=t}),await createImageBitmap(e)}catch{return null}}async function Ki(t){if(t.startsWith("data:")){let e=v0(t);if(e){let n=await Ui(e);if(n)return n}return x0(t)}try{let e=await fetch(t,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?Ui(await e.blob()):null}catch{return null}}var Vi="data-bloom-csi-slot",w0="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",E0=/\bsize-(?:[6-9]|10)\b/,S0=/\b(?:h|w)-(?:[6-9]|10)\b/,L0=/^(plus|pro|free|team|go|business|enterprise)$/i,T0=['[class*="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-6"]','[class~="h-7"]','[class~="h-8"]','[class~="h-9"]','[class~="h-10"]','[class~="w-6"]','[class~="w-7"]','[class~="w-8"]','[class~="w-9"]','[class~="w-10"]'].join(",");function Wi(t){return t.getAttribute("class")||""}function Zd(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||E0.test(t)?!0:S0.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function k0(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3&&!Jd(e)}function Jd(t){return L0.test(String(t??"").replace(/\s+/g,""))}function $t(t){return!!t?.closest(w0)}function Yi(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function oo(t){let e=Wi(t);return/\btext-xs\b/.test(e)||/text-token-text-secondary/.test(e)||/text-token-text-tertiary/.test(e)?!0:Jd(t.textContent||"")}function Xi(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function io(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function C0(t){return/\bflex\b/.test(t)&&!/\bflex-col\b/.test(t)}function Qd(t){if($t(t)||Xi(t)||io(t)||oo(t)||Yi(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function tm(t){return $t(t)||Xi(t)||io(t)||oo(t)||t.querySelector("img, svg, .min-w-0, .truncate")?!1:k0(t.textContent||"")}function em(t){return $t(t)||io(t)||Yi(t)||oo(t)?!1:Zd(Wi(t))||tm(t)?!0:Qd(t)}function Xd(t){return!($t(t)||Yi(t)||io(t)||oo(t)||Xi(t))}function Qe(t,e){let n=Xi(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(io(n)||Yi(n)||oo(n));)$t(n)||(r=n),n=n.parentElement;return r}function M0(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||$t(e))continue;if(C0(Wi(e))){let r=[];for(let o of e.children)if(!(!(o instanceof HTMLElement)||!Xd(o))){if(em(o)||Zd(Wi(o)))return Qe(o,t)??o;r.push(o)}if(r.length===1)return Qe(r[0],t)??r[0]}let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&Xd(r))return Qe(r,t)??r}}return null}function A0(t){let e=t.querySelectorAll(T0);for(let n of e)if(em(n))return Qe(n,t)??n;return null}function H0(t){for(let e of t.querySelectorAll("span, div, p, i"))if(tm(e))return Qe(e,t)??e;return null}function N0(t){for(let e of t.querySelectorAll("*"))if(Qd(e))return Qe(e,t)??e;return null}function nm(t,e){if($t(t))return null;if(e&&!$t(e)&&t.contains(e)){let n=Qe(e,t);if(n)return n}return M0(t)??A0(t)??H0(t)??N0(t)}function rm(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-8"]','[class~="w-8"]']}var Yn="data-bloom-csi",Zi="data-bloom-csi-orig",tn=new Set,om=null;function Xs(t){om=t}function im(t){return`url(${JSON.stringify(t)})`}function Ji(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function Zs(t,e,n){let r=im(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function am(t,e=Vi){let n=im(t);return`[${e}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${e}] *,[${e}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${e}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`}function I0(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function Xn(t){t.removeEventListener("error",Ys);let e=t.getAttribute(Zi);t.removeAttribute(Yn),t.removeAttribute(Zi),e&&t.getAttribute("src")!==e&&(t.src=e)}function Ys(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&tn.add(n),Xn(e),om?.()}function sm(t,e){if(!e||tn.has(e)){Xn(t);return}I0(t);let n=t.getAttribute("src")??"";if(t.getAttribute(Yn)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(Zi)&&t.setAttribute(Zi,n);t.setAttribute(Yn,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",Ys),t.addEventListener("error",Ys),n!==e&&(t.src=e)}var lm=`/*
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
`;var cm=new S("CustomSidebarIdentity"),um="customSidebarIdentityUi",fm="customSidebarIdentity",P0="bloom-csi-face",O0="bloom-csi-name",Zn=Vi,B0=1024,Qi=256,pm=24,gm=64,bm=40,el=1,nl=4,ao=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Js=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],x=L({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:ty},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:pm,max:gm,default:bm},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function nn(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function D0(){return String(x.store.displayName??"").trim()}function na(t,e,n,r,o){let i=V(n,el,nl),a=Math.min(t,e)/i,s=V(r,a/2,Math.max(a/2,t-a/2)),l=V(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}function $0(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function rl(t){let e=Math.min(1,B0/Math.max(t.width,t.height));return $0(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function _0(t,e,n,r){let{side:o,x:i,y:a}=na(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=Qi,s.height=Qi;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,Qi,Qi);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function q0(t){let e=await Ui(t);if(!e)return null;let n=rl(e);return e.close(),n}async function il(t,e,n,r){let o=await Ki(t);if(!o)return null;let i=_0(o,e,n,r);return o.close(),i}function al(){x.store.cropX=.5,x.store.cropY=.5,x.store.cropZoom=1}function dm(){x.store.avatarUrl="",x.store.avatarSource="",al()}var mm=0;async function ol(t){let e=++mm;al(),x.store.avatarSource=t;let n=await il(t,.5,.5,1);return e!==mm?!1:(n&&(x.store.avatarUrl=n),!!n)}function so(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function Qs(t){let e=so(t);if(!e)return!1;let n=await q0(e);return n?ol(n):!1}var gt=!1,Jn=!1,Qn=0,ra=0,ta=null,Se=new Map,tr=null,ne=null,oa=null,_t=null,ia=null;function aa(t){let e=String(t??"").trim();if(!e||tn.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:n}=new URL(e);if(n==="https:"||n==="http:")return e}catch{return null}return null}function hm(){return aa(x.store.avatarUrl)??aa(x.store.avatarSource)}var ea=!1,tl=new Set;function ym(){let t=aa(x.store.avatarSource);if(!t?.startsWith("data:image/")||aa(x.store.avatarUrl)?.startsWith("data:image/")||ea||tl.has(t))return;ea=!0;let e=nn(x.store.cropX,.5),n=nn(x.store.cropY,.5),r=nn(x.store.cropZoom,1);il(t,e,n,r).then(o=>{if(ea=!1,!o){tl.add(t);return}gt&&(x.store.avatarUrl=o,sa())}).catch(()=>{ea=!1,tl.add(t)})}function en(t,e){return t.map(n=>`${n} ${e}`)}function F0(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function z0(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=F0(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function vm(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||$t(n)||n.closest(".min-w-0")||e.push(n);return e}function j0(t){let e=vm(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function sl(){let t=[],e=ke();e&&t.push(e);let n=dn();if(n&&!t.some(r=>n.contains(r)||r.contains(n))){let r=n.querySelector(ao.join(","))??n.querySelector("button, a, [role='button']")??n;r&&!t.includes(r)&&t.push(r)}return t}function xm(t,e){let n=j0(t);if(n)sm(n,e);else for(let o of vm(t))Xn(o);let r=nm(t,n);for(let o of t.querySelectorAll(`[${Zn}]`))o!==r&&o.removeAttribute(Zn);r&&r.setAttribute(Zn,"")}function G0(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function U0(t,e){let n=G0(t);n&&xm(n,e)}function K0(){for(let t of document.querySelectorAll(`img[${Yn}]`))Xn(t);for(let t of document.querySelectorAll(`[${Zn}]`))t.removeAttribute(Zn)}function W0(){let t=V(Math.round(nn(x.store.avatarSize,bm)),pm,gm),e=hm(),n=D0(),r=x.store.applyToMenu!==!1,o=[],i=[...en(ao,"img"),"#stage-sidebar-tiny-bar img"];r&&i.push(...en(Js,"> :first-child img"));let a=[...en(ao,".min-w-0 > .truncate"),...en(ao,".min-w-0.flex-1 .truncate")];r&&a.push(...en(Js,"> :first-child .truncate"));let s=rm(Zn);o.push(Ji([...s.flatMap(l=>en(ao,l))].join(","),t)),o.push(Ji(s.map(l=>`#stage-sidebar-tiny-bar ${l}`).join(","),32)),r&&o.push(Ji(s.flatMap(l=>en(Js,`> :first-child ${l}`)).join(","),t)),e&&(o.push(Zs(i.join(","),e,t)),o.push(Zs("#stage-sidebar-tiny-bar img",e,32)),o.push(am(e))),n&&o.push(z0(a,n)),E(fm,o.join(""))}function V0(){let t=hm(),e=sl();for(let n of e)xm(n,t);if(x.store.applyToMenu!==!1){let n=mn();n&&U0(n,t)}for(let n of document.querySelectorAll(`img[${Yn}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||Xn(n)}function sa(){if(!(!gt||Jn)){Jn=!0;for(let t of Se.values())t.disconnect();ne?.disconnect(),_t?.disconnect();try{W0(),V0()}finally{Jn=!1,ll(),J0(),tr?.isConnected&&wm(tr),ym()}}}function lo(){!gt||Qn||(Qn=requestAnimationFrame(()=>{Qn=0,sa()}))}function Y0(){Jn||!gt||lo()}function X0(t){if(Se.has(t))return;let e=new MutationObserver(Y0);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),Se.set(t,e)}function Z0(t){Se.get(t)?.disconnect(),Se.delete(t)}function ll(){let t=new Set;for(let n of sl())t.add(n),n.parentElement&&t.add(n.parentElement);let e=dn();e&&t.add(e);for(let n of[...Se.keys()])(!t.has(n)||!n.isConnected)&&Z0(n);for(let n of t)n.isConnected&&X0(n)}function J0(){let t=ko();if(!t){_t?.disconnect(),_t=null,oa=null;return}if(oa===t&&_t){_t.observe(t,{childList:!0});return}_t?.disconnect(),oa=t,_t=new MutationObserver(()=>{Jn||!gt||(ll(),lo())}),_t.observe(t,{childList:!0})}function wm(t){tr===t&&ne||(ne?.disconnect(),tr=t,ne=new MutationObserver(()=>{if(!t.isConnected){ne?.disconnect(),ne=null,tr=null;return}Jn||!gt||lo()}),ne.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function Em(t){if(!gt||x.store.applyToMenu===!1)return;let e=mn();if(e){wm(e),lo();return}t<=0||requestAnimationFrame(()=>Em(t-1))}function Sm(t){gt&&(sa(),!(sl().length||t<=0)&&(ra=requestAnimationFrame(()=>Sm(t-1))))}function Q0(t){gt&&x.store.applyToMenu!==!1&&(!Co(t)&&!mn()||Em(10))}function ty(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let d=document.createElement("p");d.className="bloom-csi-hint";let f=document.createElement("div");f.className="bloom-csi-crop";let h=document.createElement("div");h.className="bloom-csi-stage";let g=document.createElement("img");g.className="bloom-csi-stage-img",g.alt="",g.draggable=!1,h.appendChild(g);let b=document.createElement("div");b.className="bloom-csi-zoom-row";let m=document.createElement("input");m.type="range",m.className="bloom-csi-zoom",m.min=String(el),m.max=String(nl),m.step="0.05",m.setAttribute("aria-label","Zoom");let T=document.createElement("span");T.className="bloom-csi-zoom-val";let A=document.createElement("button");A.type="button",A.className="bloom-csi-btn",A.textContent="Reset",b.append(m,T,A);let N=document.createElement("p");N.className="bloom-csi-hint",N.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",f.append(h,b,N),t.append(u,d,f);function qt(){let p=String(x.store.avatarSource??""),C=String(x.store.avatarUrl??"");return p.startsWith("data:image/")?p:C.startsWith("data:image/")?C:""}function Tt(p,C,H){if(!a)return i.x=p,i.y=C,i.zoom=V(H,el,nl),i;let X=na(a.w,a.h,H,p*a.w,C*a.h);return i.x=X.x/a.w,i.y=X.y/a.h,i.zoom=X.z,i}function tt(){m.value=String(i.zoom),T.textContent=`${Math.round(i.zoom*100)}%`;let p=a?na(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;p&&a&&(g.style.width=`${a.w/p.side*100}%`,g.style.height=`${a.h/p.side*100}%`,g.style.left=`${(.5-p.x/p.side)*100}%`,g.style.top=`${(.5-p.y/p.side)*100}%`)}function R(p=!1){let C=qt(),H=String(x.store.avatarUrl??"").trim(),X=!!C;s.hidden=!H&&!C,(C||H)&&(s.src=C||H),document.activeElement!==l&&(l.value=X?"":H),l.placeholder=X?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",f.hidden=!C,d.hidden=!(e&&/^https?:\/\//.test(H)&&!C),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",C&&(p&&(i.x=nn(x.store.cropX,.5),i.y=nn(x.store.cropY,.5),i.zoom=nn(x.store.cropZoom,1)),g.getAttribute("src")!==C&&(a=null,g.onload=()=>{a={w:g.naturalWidth,h:g.naturalHeight},Tt(i.x,i.y,i.zoom),tt()},g.src=C),tt())}function rt(p,C,H,X=!1){Tt(p,C,H),tt();let pl=qt(),gl=()=>{x.store.cropX=i.x,x.store.cropY=i.y,x.store.cropZoom=i.zoom,pl&&il(pl,i.x,i.y,i.zoom).then(bl=>{bl&&(x.store.avatarUrl=bl)})};r&&clearTimeout(r),X?gl():r=setTimeout(gl,80)}function Ft(p){x.store.avatarUrl=p;let C=p.trim();if(n&&clearTimeout(n),!C){x.store.avatarSource="",al(),e=!1,R(!0);return}if(C.startsWith("data:image/")){e=!1,n=setTimeout(()=>{Ki(C).then(H=>{if(!H)return;let X=rl(H);H.close(),X&&ol(X).then(()=>R(!0))})},80);return}if(/^https?:\/\//.test(C)){e=!1,x.store.avatarSource="",n=setTimeout(()=>{Ki(C).then(H=>{if(!H){e=!0,R(!0);return}let X=rl(H);H.close(),X?(e=!1,ol(X).then(()=>R(!0))):(e=!0,R(!0))})},400);return}e=!1,x.store.avatarSource="",R(!0)}u.addEventListener("paste",p=>{so(p.clipboardData)&&(p.preventDefault(),e=!1,Qs(p.clipboardData).then(()=>R(!0)))}),u.addEventListener("dragover",p=>{so(p.dataTransfer)&&p.preventDefault()}),u.addEventListener("drop",p=>{so(p.dataTransfer)&&(p.preventDefault(),e=!1,Qs(p.dataTransfer).then(()=>R(!0)))}),l.addEventListener("change",()=>Ft(l.value)),l.addEventListener("paste",p=>{so(p.clipboardData)&&(p.preventDefault(),e=!1,Qs(p.clipboardData).then(()=>R(!0)))}),l.addEventListener("keydown",p=>{qt()&&!l.value&&(p.key==="Backspace"||p.key==="Delete")&&(dm(),e=!1,R(!0))}),c.addEventListener("click",()=>{dm(),e=!1,R(!0)}),h.addEventListener("pointerdown",p=>{p.button===0&&(h.setPointerCapture(p.pointerId),o.on=!0,o.px=p.clientX,o.py=p.clientY,o.x=i.x,o.y=i.y)}),h.addEventListener("pointermove",p=>{if(!o.on||!a)return;let C=h.clientWidth;if(!C)return;let{side:H}=na(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);Tt(o.x-(p.clientX-o.px)*(H/C)/a.w,o.y-(p.clientY-o.py)*(H/C)/a.h,i.zoom),tt()}),h.addEventListener("pointerup",()=>{o.on&&(o.on=!1,rt(i.x,i.y,i.zoom,!0))}),h.addEventListener("pointercancel",()=>{o.on=!1}),h.addEventListener("wheel",p=>{p.preventDefault(),rt(i.x,i.y,i.zoom*(p.deltaY<0?1.08:1/1.08))},{passive:!1}),m.addEventListener("input",()=>rt(i.x,i.y,Number(m.value))),m.addEventListener("change",()=>rt(i.x,i.y,Number(m.value),!0)),A.addEventListener("click",()=>rt(.5,.5,1,!0));let fl=()=>R(!1);return ia=fl,R(!0),()=>{ia===fl&&(ia=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var Lm=y({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:um,cleanupSelectors:[`.${P0}`,`.${O0}`],settings:x,start(){gt=!0,tn.clear(),Xs(lo),E(um,lm),ta=new AbortController,document.addEventListener("click",Q0,{signal:ta.signal}),Sm(40),ym(),cm.debug("started")},onSettingsChange(){tn.clear(),ia?.(),gt&&(ll(),sa())},stop(){gt=!1,ta?.abort(),ta=null,Qn&&cancelAnimationFrame(Qn),Qn=0,ra&&cancelAnimationFrame(ra),ra=0;for(let t of Se.values())t.disconnect();Se.clear(),ne?.disconnect(),ne=null,tr=null,_t?.disconnect(),_t=null,oa=null,K0(),w(fm),Xs(null),tn.clear(),cm.debug("stopped")}});var er=new S("Bloom"),Tm=!1,ey=Date.now(),ny=[fc,iu,pu,hu,Eu,Cu,qu,zu,Uu,ed,ld,gd,hd,Md,_d,Fd,Yd,Lm];function la(t){return new Promise(e=>setTimeout(e,t))}function ry(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function oy(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var Cm=8e3,km=300,iy=250;async function ay(){if(Te())return await la(km),!0;for(;Date.now()-ey<Cm;)if(await la(iy),Te())return await la(km),!0;return Te()||ga()}function cl(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function sy(){if(cl())return!0;let t=Date.now()+Cm;for(;Date.now()<t;)if(await la(100),cl())return!0;return cl()}function ly(){try{GM_registerMenuCommand?.("Bloom++ settings",mc)}catch{}}function cy(){vo(()=>{rr("HostShell"),er.info("host shell",ot)}),xo(()=>{er.info("idle ready",ot)}),wo(()=>{ua(),rr("HostReady"),er.info("chrome ready",ot)})}async function ul(){await kl()}async function dl(){if(Tm)return;Tm=!0;for(let n of ny)try{Ol(n),Kl(n)}catch(r){er.error("register failed",n.name,r)}$l(),rr("Init"),ly(),cy();let t=()=>rr("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await ry(),ua(),er.info("styles ready",ot),await oy(),sy().then(n=>{n&&Eo()}),!await ay()){er.warn("late islands not detected; starting default plugins",ot),ln(),So();return}await Gl()}var Mm=typeof unsafeWindow<"u"?unsafeWindow:window,uy=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||uy){let t=Mm.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",ot);try{Object.defineProperty(Mm,"Bloom",{value:ml,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}ul().then(()=>dl()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
