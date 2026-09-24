// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260924] v1.4.75
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

/* Bloom++ [20260924] v1.4.75. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var xm=Object.defineProperty;var Em=(t,e)=>{for(var n in e)xm(t,n,{get:e[n],enumerable:!0})};var tl={};Em(tl,{REPO_URL:()=>Il,Settings:()=>k,VERSION:()=>Q,contextKeyFromUrl:()=>Ft,conversationTitle:()=>ln,conversationToken:()=>et,currentConversationId:()=>N,hasDraftText:()=>ft,hasErrorToast:()=>pt,hasLateIslands:()=>he,init:()=>Qs,initSettings:()=>Js,isDocumentInteractive:()=>Ol,isStreaming:()=>D,isUserDraftEmpty:()=>re,messageCreateTime:()=>Fo,plugins:()=>_t,requestChromeReady:()=>go,requestIdleReady:()=>Ze,requestShellReady:()=>po,setEditorText:()=>zt,subscribeHarvest:()=>nt,watchStreamingEdge:()=>V,whenChromeReady:()=>fo,whenIdleReady:()=>mo,whenShellReady:()=>uo});var Zt=new Map,eo=!1;function wm(){return document.getElementById("bloom-root")?.shadowRoot??null}function il(){return document.head??null}function We(){let t=wm();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=Sm()}function Ji(t,e){if(!eo)return;let n=il();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),We();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,We();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,We()}function E(t,e){let n=Zt.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},Zt.set(t,n)),eo&&Ji(t,n)}function Qi(){if(!il())return!1;eo=!0;for(let[e,n]of Zt)Ji(e,n);return We(),!0}function al(t){let e=Zt.get(t);e&&(e.disabled=!1,eo&&Ji(t,e))}function sl(t){let e=Zt.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),We())}function x(t){let e=Zt.get(t);e&&(e.el?.remove(),Zt.delete(t),We())}function Sm(){return Array.from(Zt.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var w=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function h(t){return t}var ta=new Map;function Ve(t,e){let n=ta.get(t);return n||(n=new Set,ta.set(t,n)),n.add(e),()=>n.delete(e)}function be(t,e){let n=ta.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var Lm="bloompp";function ll(){return new Promise((t,e)=>{let n=indexedDB.open(Lm,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function cl(t){try{let e=await ll();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function ul(t,e){try{let n=await ll();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function Ye(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function G(t,e,n){return Math.min(n,Math.max(e,t))}function dl(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function ml(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function fl(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var no=new w("SettingsStore"),Jt="BloomSettings",Tm=100;function ro(t){return t!=null&&typeof t.then=="function"}function km(t){if(t==null||ro(t))return null;if(Ye(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(Ye(e)&&!ro(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return Ye(n)&&!ro(n)?n:null}return null}catch{return null}}function io(t){let e=km(t);if(!e)return null;let n=e.plugins;return!Ye(n)||ro(n)||Object.keys(n).length===0?null:e}var oo=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let d=l.slice(c.length+1);if(d&&!d.includes(".")){let g=u(d);g!==void 0&&(i[a]=g,s=g);break}}}return Ye(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){no.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Tm))}save(){try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(Jt,this.plain)}catch{try{GM_setValue(Jt,e)}catch(n){no.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(Jt,e)}catch{}ul(Jt,e).catch(n=>no.warn("Failed to save settings to IndexedDB:",n))}catch(e){no.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){dl(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var Cm=new w("Settings"),Mm={plugins:{}},k=new oo(structuredClone(Mm)),Am=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function Hm(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function L(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?(k.store.plugins[n]||(k.store.plugins[n]={}),k.store.plugins[n]):{}},get plain(){let n=e.pluginName;return n?k.plain.plugins[n]??{}:{}}};return e}async function Nm(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function pl(){let t=io(await Nm(Jt));if(t||(t=io(await cl(Jt))),!t)try{t=io(localStorage.getItem(Jt))}catch{t=null}if(!t)return;let e=t.plugins;e&&(k.plain.plugins=e,Cm.debug("Loaded settings"))}function gl(t,e){e&&(e.pluginName=t,k.plain.plugins[t]||(k.plain.plugins[t]={}),k.setDefaultGetter(Am(t),n=>{if(n!=="enabled")return Hm(e.def,n)}))}function bl(){return k.plain.plugins.Settings||(k.store.plugins.Settings={}),k.store.plugins.Settings}function ao(){return bl().pinnedPlugins??[]}function hl(t){return ao().includes(t)}function yl(t){let e=ao(),n=e.includes(t);return k.store.plugins.Settings={...k.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function so(){return bl().starredPlugins??[]}function vl(t){return so().includes(t)}function xl(t){let e=so(),n=e.includes(t);return k.store.plugins.Settings={...k.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var lo=new w("PluginManager"),_t={},Wn=new Set;function Sl(t){if(_t[t.name]){lo.warn("Duplicate plugin",t.name);return}_t[t.name]=t,gl(t.name,t.settings)}function Xe(t){let e=_t[t];if(!e)return!1;if(e.required)return!0;let n=k.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function Ll(t){let e=_t[t];if(!e||e.required)return;let n=!Xe(t);k.plain.plugins[t]||(k.store.plugins[t]={}),k.store.plugins[t].enabled=n,n?Tl(e):Rm(e),be("pluginToggle",{name:t,enabled:n})}function Tl(t,e=!1){if(!Wn.has(t.name)&&Xe(t.name))try{t.managedStyle&&al(t.managedStyle),t.start?.(),Wn.add(t.name),t.settings&&k.addPrefixChangeListener(`plugins.${t.name}.`,()=>{Wn.has(t.name)&&t.onSettingsChange?.()}),e||lo.debug("Started",t.name)}catch(n){lo.error("Failed to start",t.name,n)}}function Rm(t){if(Wn.has(t.name)){try{t.stop?.()}catch(e){lo.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(sl(t.managedStyle),x(t.managedStyle)),Wn.delete(t.name)}}function Vn(t){for(let e of Object.values(_t))(e.startAt??"DOMContentLoaded")===t&&Tl(e)}var El=2,wl="defaultsRev";function kl(){let t=k.plain.plugins.Settings;if(!(!t||t[wl]===El)){for(let e of["NoShareLink","NoDictation"]){let n=k.plain.plugins[e];!n||typeof n.enabled=="boolean"||(n.enabled=!1)}t[wl]=El}}var Yn=!1,co=!1,ea=!1,Ml=[],Al=[],Hl=[];function na(t){let e=t.splice(0);for(let n of e)n()}function Xn(){Yn||(Yn=!0,na(Ml))}function ra(){co||(co=!0,Yn||Xn(),na(Al))}function Nl(){ea||(ea=!0,Yn||Xn(),co||ra(),na(Hl))}function uo(t){Yn?t():Ml.push(t)}function mo(t){co?t():Al.push(t)}function fo(t){ea?t():Hl.push(t)}function po(){Xn()}function Ze(){Xn(),ra()}function go(){Nl()}function Cl(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function Rl(){await Cl(4e3),Xn(),await Cl(4e3),ra(),Nl()}var y={p:"0-V-linuxdo"},Q="[20260924] v1.4.75",Il="https://github.com/0-V-linuxdo/Bloom";var Im={BetterNavigator:1789989042e3,ChatListStatus:1789915545e3,ChatStateFavicons:1789914627e3,Cleaner:1789910872e3,ComposerOpacity:1789910872e3,CustomSidebarIdentity:1789970413e3,GreetingCustomizer:1789861316e3,InputHistory:1789858186e3,MessageTimestamps:1789915545e3,NoDictation:1789910872e3,NoShareLink:1789910872e3,NoSidebarIdentity:1789910872e3,PromptQueue:1789915545e3,RecentTopics:1790181019e3,ResponseNotification:1789885188e3,Settings:1789973738e3,StreamerMode:1789924346e3,WiderChat:1789910872e3};function Pl(t){let e=Im[t.name];typeof e=="number"&&e>0&&(t.updatedAt=e)}function Pm(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Om(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function oa(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function he(){return oa()?Pm()||Om():!1}function Ol(){return he()}var Bm=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Bl=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Dm=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),$m="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function Qe(t){return t.id==="bloom-root"||!!t.closest($m)}function Dl(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function bo(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function ia(t){if(!(t instanceof HTMLElement)||!t.isConnected||Qe(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&bo(e)?!1:t.getClientRects().length>0}function Je(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function _m(){let t=[];for(let e of document.querySelectorAll(Bm))!(e instanceof HTMLElement)||!e.isConnected||Qe(e)||t.push(e);return t}function ho(t){if(!t.isConnected||Qe(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function ye(){return _m().filter(ho)[0]??null}function tn(){let t=document.getElementById("stage-sidebar-tiny-bar");if(!(t instanceof HTMLElement)||!t.isConnected||Qe(t))return null;let e=t.getBoundingClientRect();return e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3?null:t}function aa(t){let e=t,n=t.parentElement;n&&n.children.length===1&&!Qe(n)&&!Je(n)&&n.parentElement&&!Je(n.parentElement)&&(e=n);let r=e.parentElement;if(r&&!Je(r)&&!Qe(r)&&r.children.length>1){let o=r.getAttribute("class")||"";if(/\bflex\b/.test(o)&&!/flex-col/.test(o)&&r.parentElement&&!Je(r.parentElement))return r}return e}function en(){let t=document.querySelectorAll(Bl);for(let n of t)if(ia(n)&&!bo(n)&&Dl(n))return n;let e=document.querySelectorAll(Dm);for(let n of e){if(!ia(n)||!Dl(n)||bo(n))continue;let r=n.querySelector(Bl);return ia(r)&&!bo(r)?r:n}return null}function yo(){let t=ye();if(t){let e=aa(t),n=e.parentElement;if(n&&!Je(n))return n;if(!Je(e))return e}return tn()}function vo(t){let e=ye();return e?t.composedPath().includes(e):!1}var la=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],qm={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function zm(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Fm(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function sa(t){let e=zm(t);return e?Fm(e)>.55?"light":"dark":null}function jm(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=sa(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=sa(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=sa(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function xo(t){return t==="auto"?jm():t}function Gm(t){try{let e=getComputedStyle(document.documentElement);for(let n of la){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function Eo(t,e,n){let r=qm[e];if(n){Gm(t);for(let o of la)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of la)t.style.setProperty(o,r[o])}function $l(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var ca=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var Km="bloom-root",St="bloom-rail-item",ko="bloom-account-item",xe="bloom-sidebar-panel",ir="bloom-plugin-dialog",Io="bloom-plugin-layer",Co="bloom-settings-css",Wm=2e3,zl=null,Vm=null,ne=!1,fa=[],wo=null,Mo=null,te=null,Lo=null,qt=null,nr=null,Zn,nn=0,rr=0,Jn=0,Qn=null,tr=null,Ao=null,Fl=null,er=null,ua=[],Ho=!1,Ym=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Xm=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Zm=new Set(["chat","ui","privacy"]),Jm=10080*60*1e3,Po="",or="all",wt="all";function Oo(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function jl(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Qm(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'}function tf(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function ef(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function nf(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var rf={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function of(t){return t.icon||rf[t.name]||Oo()}function da(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),Eo(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function Gl(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function No(){let t="auto",e=xo(t);da(zl,e,!0);let n=document.getElementById(xe);n instanceof HTMLElement&&da(n,e,!0);let r=document.getElementById(ir);r instanceof HTMLElement&&da(r,e,!0);let o=document.getElementById(St);o instanceof HTMLElement&&Gl(o),be("schemeChange",{scheme:e,pref:t})}function Ul(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function Kl(){if(E("settings",ca),document.getElementById(Co)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=Co,t.textContent=ca,document.head.appendChild(t)}function af(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function sf(){for(let t of fa)t();fa=[]}function Wl(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function lf(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function ba(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function cf(t){return ba(t).length>0}function To(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function uf(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=lf(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function df(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(uf(e,n));let i=k.store.plugins[t]??(k.store.plugins[t]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",fa.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??To(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??To(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=Wl(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??To(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function _l(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function mf(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=k.store.plugins[t.name]??(k.store.plugins[t.name]={});for(let[n,r]of ba(t)){if(n==="enabled"||r.type===5)continue;let o=To(r);o!==void 0&&(e[n]=o)}Yl(t)}function Vl(t){t.key==="Escape"&&(!document.getElementById(Io)&&!document.getElementById(ir)||(t.stopPropagation(),rn()))}function ff(){Ho||(document.addEventListener("keydown",Vl),Ho=!0)}function pf(){Ho&&(document.removeEventListener("keydown",Vl),Ho=!1)}function rn(){sf(),pf(),document.getElementById(Io)?.remove(),document.getElementById(ir)?.remove()}function Yl(t){if(rn(),!document.body)return;let e=document.createElement("div");e.id=Io,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",ee),e.addEventListener("pointerup",ee),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&rn()});let n=document.createElement("div");n.id=ir,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",ee),n.addEventListener("pointerup",ee),n.addEventListener("click",ee);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=jl(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),rn()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=_l("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=_l("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=ba(t);if(c.length)for(let[u,d]of c){let g=df(t.name,u,d);g&&l.appendChild(g)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>mf(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),ff(),No()}function gf(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=of(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=vl(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=ef(l),c.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let m=xl(t.name);be("pluginStar",{name:t.name,starred:m})}),s.appendChild(c),!t.required){let b=hl(t.name),m=document.createElement("button");m.type="button",m.className=`bloom-icon-btn bloom-card-pin${b?" bloom-card-pin-active":""}`,m.setAttribute("aria-label",b?"Unpin from top":"Pin to top"),m.innerHTML=nf(b),m.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();let M=yl(t.name);be("pluginPin",{name:t.name,pinned:M})}),s.appendChild(m)}if(cf(t)){let b=document.createElement("button");b.type="button",b.className="bloom-icon-btn bloom-card-settings",b.setAttribute("aria-label",`${t.name} settings`),b.innerHTML=tf(),b.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation(),Yl(t)}),s.appendChild(b)}let u=Wl(t.name,Xe(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",b=>b.stopPropagation()),d?.addEventListener("change",()=>{Ll(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let b=document.createElement("div");b.className="bloom-card-desc",b.textContent=t.description,n.appendChild(b)}let g=document.createElement("div");g.className="bloom-card-separator";let S=document.createElement("div");S.className="bloom-card-footer";let p=document.createElement("div");return p.className="bloom-card-author",p.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",S.appendChild(p),e.append(n,g,S),e}function Xl(){return Object.values(_t).filter(t=>!t.hidden&&t.name!=="Settings")}function bf(t){return t.updatedAt!=null&&Date.now()-t.updatedAt<Jm}function Zl(t,e){if(e==="all"||e==="favorites")return!0;if(e==="recent")return bf(t);let n=(t.tags??[]).map(r=>r==="sidebar"?"ui":r);return e==="other"?!t.required&&!n.some(r=>Zm.has(r)):n.includes(e)}function hf(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function yf(){return Po.trim()?"No plugins match your search.":wt==="favorites"?"No favorites yet. Star a plugin to see it here.":wt==="recent"?"No plugins updated in the last 7 days.":"No plugins available."}function vf(){let t=Xl();return Xm.filter(e=>e.id==="favorites"||e.id==="all"||e.id==="recent"?!0:t.some(n=>Zl(n,e.id)))}function xf(){if(er){er.replaceChildren();for(let t of vf()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${wt===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{wt=t.id,ve()}),er.appendChild(e)}}}function Ef(){let t=Xl();if(wt==="favorites"){let e=new Set(so());t=t.filter(n=>e.has(n.name))}else wt!=="all"&&(t=t.filter(e=>Zl(e,wt)));return or==="enabled"&&(t=t.filter(e=>Xe(e.name))),or==="disabled"&&(t=t.filter(e=>!Xe(e.name))),t}function ve(){if(!Qn)return;xf();let t=Ef();Ao&&(Ao.placeholder=`Search ${t.length} plugins...`);let e=t,n=Po.trim().toLowerCase();if(n&&(e=e.filter(r=>hf(r).includes(n))),wt==="recent")e=e.slice().sort((r,o)=>(o.updatedAt??0)-(r.updatedAt??0)||r.name.localeCompare(o.name));else if(wt!=="favorites"){let r=ao();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}Qn.replaceChildren();for(let r of e)Qn.appendChild(gf(r));tr&&(tr.hidden=e.length>0,tr.textContent=yf())}function ee(t){t.stopPropagation()}function ma(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function ha(){document.getElementById(St)?.setAttribute("aria-expanded",ne?"true":"false")}function wf(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function ya(){rn(),Po="",or="all",wt="all",document.getElementById(xe)?.remove(),ne=!1,ha()}function Sf(t){let e=document.createElement("div");e.id=t,e.setAttribute("aria-labelledby","bloom-settings-title"),e.addEventListener("pointerdown",ee),e.addEventListener("pointerup",ee),e.addEventListener("click",ee);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=Oo();let a=document.createElement("span");a.className="bloom-settings-title-row";let s=document.createElement("h2");s.id="bloom-settings-title",s.textContent="Bloom++";let l="Toggle features. Some need a reload. Click the sliders icon to configure.",c=document.createElement("button");c.type="button",c.className="bloom-info-hint",c.setAttribute("aria-label",l),c.innerHTML=Qm();let u=document.createElement("span");u.className="bloom-info-hint-tip",u.setAttribute("role","tooltip"),u.textContent=l,c.appendChild(u),a.append(s,c),o.append(i,a);let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn bloom-settings-close",d.setAttribute("aria-label","Close"),d.innerHTML=jl(),d.addEventListener("click",ya),r.appendChild(o),n.appendChild(r);let g=document.createElement("div");g.className="bloom-plugin-tabs",n.appendChild(g);let S=document.createElement("div");S.className="bloom-search-bar";let p=document.createElement("input");p.type="search",p.className="bloom-search-input",p.setAttribute("aria-label","Search plugins"),p.placeholder="Search plugins...",p.addEventListener("input",()=>{Po=p.value,ve()});let b=document.createElement("select");b.className="bloom-search-filter",b.setAttribute("aria-label","Filter plugins");for(let M of Ym){let H=document.createElement("option");H.value=M.value,H.textContent=M.label,b.appendChild(H)}b.value=or,b.addEventListener("change",()=>{or=b.value,ve()}),S.append(p,b),n.appendChild(S);let m=document.createElement("div");m.className="bloom-plugin-list",n.appendChild(m);let T=document.createElement("p");return T.className="bloom-tab-empty",T.hidden=!0,n.appendChild(T),e.append(d,n),Qn=m,tr=T,Ao=p,Fl=b,er=g,ve(),e}function Lf(t){t.classList.add("bloom-rail-dock")}function Tf(){let t=document.getElementById(St);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&ho(t)?t:null}function kf(){if(document.getElementById(xe)?.remove(),!document.body)return;let t=Sf(xe);Lf(t),document.body.appendChild(t),ne=!0,rn(),No(),ha(),be("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:Q,dock:"center",rail:!!Tf()})}function va(){let t=document.getElementById(xe);if(t instanceof HTMLElement&&t.isConnected&&wf(t)){ya();return}t?.remove(),kf()}function Cf(){let t=document.createElement("button");return t.type="button",t.id=St,t.className="bloom-rail-item",t.setAttribute("aria-controls",xe),t.setAttribute("aria-expanded",ne?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${Oo()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),va()}),t}function ql(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function Mf(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function Af(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function Qt(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function Jl(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=Mf(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&Qt(t,"padding-top",Math.round(i)),Number.isFinite(a)&&Qt(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));Qt(n,"width",l),Qt(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&Qt(t,"padding-left",u);let d=Af(e,r);if(d){let g=d.getBoundingClientRect(),S=n.getBoundingClientRect(),p=Math.round(g.left-S.right);p>=0&&p<=24&&Qt(t,"gap",p)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&Qt(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&Qt(t,"gap",Math.round(l))}Gl(t)}function pa(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function Hf(){if(nr?.isConnected&&qt){qt.observe(nr,{childList:!0});return}ga()}function Nf(t){if(pa(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function Rf(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){Jn=0;return}Jn+=1,rr=Date.now()+Math.min(8e3,250*2**Math.min(Jn,5))})}function If(){nn||Date.now()<rr||(nn=requestAnimationFrame(()=>{nn=0,!(Date.now()<rr)&&(document.getElementById(St)?.isConnected||Ro())}))}function Ro(){if(!document.body)return;qt?.disconnect();let t=null,e=!1;try{let n=document.getElementById(St);t=n instanceof HTMLButtonElement?n:Cf();let r=ye(),o=tn();if(r){let i=aa(r),a=i.parentElement;if(pa(i)||a&&pa(a))return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),ql(t),Jl(t,r)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),ql(t,!0)):t.isConnected&&!ho(t)&&(t.remove(),t=null)}finally{Rf(t,e),Hf(),ha()}}function ga(){let t=yo();!t||!Nf(t)||nr===t&&qt||(qt?.disconnect(),nr=t,qt=new MutationObserver(()=>{document.getElementById(St)?.isConnected||If()}),qt.observe(t,{childList:!0}))}function Pf(){Ro(),ga(),Zn===void 0&&(Zn=window.setInterval(()=>{let t=document.getElementById(St);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=rr&&Ro();else{Jn=0;let e=ye();e&&Jl(t,e)}ga()},Wm))}function Of(){Zn!==void 0&&(clearInterval(Zn),Zn=void 0),nn&&cancelAnimationFrame(nn),nn=0,rr=0,Jn=0,qt?.disconnect(),qt=null,nr=null}function Bf(t){Lo===t&&te||(te?.disconnect(),Lo=t,te=new MutationObserver(()=>{if(!t.isConnected){te?.disconnect(),te=null,Lo=null;return}Ql(t)}),te.observe(t,{childList:!0}))}function Ql(t){if(Bf(t),t.querySelector(`#${ko}`))return;let e=document.createElement("button");e.type="button",e.id=ko,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${Oo()}<span>Bloom++</span>`,e.addEventListener("pointerdown",ma),e.addEventListener("pointerup",ma),e.addEventListener("click",n=>{ma(n),va()}),t.insertBefore(e,t.firstChild)}function So(){let t=en();return t?(Ql(t),!0):!1}function Df(t){vo(t)&&(queueMicrotask(So),requestAnimationFrame(()=>{So()}),window.setTimeout(So,60),window.setTimeout(So,180))}function $f(){Mo?.abort();let t=new AbortController;Mo=t,document.addEventListener("click",Df,{signal:t.signal})}function _f(){Mo?.abort(),Mo=null,te?.disconnect(),te=null,Lo=null}function tc(){Ze(),af(()=>{Kl(),Ul(),Ro(),va()})}var ec=h({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[y.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${Km}`,`#${St}`,`#${ko}`,`#${xe}`,`#${Io}`,`#${ir}`,`#${Co}`,"#bloom-menu-panel"],start(){Kl(),Ul(),Pf(),$f(),wo?.(),wo=$l(No),No(),ua=[Ve("pluginToggle",()=>{ne&&ve()}),Ve("pluginPin",()=>{ne&&ve()}),Ve("pluginStar",()=>{ne&&ve()})]},stop(){Of(),_f(),wo?.(),wo=null;for(let t of ua)t();ua=[],ya(),document.getElementById(St)?.remove(),document.getElementById(ko)?.remove(),document.getElementById(Co)?.remove(),zl=null,Vm=null,Qn=null,tr=null,Ao=null,Fl=null,er=null,ne=!1}});var Bo='form[data-type="unified-composer"], form.w-full[data-type]',Lt=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),on=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),nc=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),rc=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),qf=/stop streaming|stop generating|停止生成|停止输出|停止响应/,zf='[contenteditable="false"], button, [role="button"]';function dt(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function Ee(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!dt(o)))return o;return null}function oc(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function P(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=oc(t);return!!(qf.test(n)||/^stop$/i.test(n))}function mt(){let e=Array.from(document.querySelectorAll(Bo)).find(dt);if(e instanceof HTMLElement)return e;let n=Ee(document,Lt),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function U(){let t=Array.from(document.querySelectorAll(Lt));return t.find(dt)??t[0]??null}function Ff(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(zf);return!!n&&n!==e&&e.contains(n)}function xa(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&Ff(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function ft(t){let e=t??U();return e?xa(e,e).replaceAll("\u200B","").trim().length>0:!1}function re(t){return!ft(t)}function Do(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function ic(t){let e=mt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!dt(n))&&t(n))return n;return null}function oe(){let t=mt(),e=Ee(t,on)??Ee(document,on);return e&&!P(e)?e:ic(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!P(n);let o=oc(n);return/^(send|send prompt|发送)$/i.test(o)&&!P(n)})}function we(){let t=mt(),e=Ee(t,nc,!0)??Ee(document,nc,!0);if(e)return e;let n=Ee(t,rc)??Ee(document,rc);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&dt(r)&&P(r))return r}return ic(P)}function tt(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>xa(n,t)).join(`
`):xa(t,t)}function Ea(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function zt(t,e,n=!1){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),Ea(t,n)}var ac=/\/c\/([a-zA-Z0-9_-]{8,})/i;function et(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function Ft(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function an(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(ac)?.[1]??""}catch{return t.match(ac)?.[1]??""}}function N(){let t=an(location.pathname);if(t)return t;let n=et().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return""}var uc=new w("Harvest"),jf=1500,Gf=200,$o=new Set,_o=new Map,qo=new Map,sn=null,zo=null,ar=null,Tt=0;function Uf(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Kf(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function Wf(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}function dc(t){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(t)}var Vf=/"action"\s*:\s*"(next|continue|variant)"/i;function Yf(t,e,n){return!(e!=="POST"||dc(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!Vf.test(n))}function Xf(t,e){return e!=="GET"||dc(t)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(t)}function sc(t){return t.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function mc(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function Zf(t){return typeof t=="string"?mc(t):""}function wa(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return wa(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function fc(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function lc(t,e,n){!t||!e||qo.get(t)!==e&&(qo.set(t,e),fc(qo,jf),ie({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function Jf(t,e){let n=e.trim();!t||!n||_o.get(t)!==n&&(_o.set(t,n),fc(_o,Gf),ie({type:"conversation-meta",conversationId:t,title:n}))}function sr(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)sr(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&Jf(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=wa(l.create_time??l.createTime??l.created_at);c&&u&&lc(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=wa(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&lc(a,s,o),r.mapping&&typeof r.mapping=="object")sr(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&sr(l,o,n+1)}function cc(t,e){if(t)try{sr(JSON.parse(t),e)}catch{}}function ie(t){for(let e of Array.from($o))try{e(t)}catch{}}async function Qf(t,e,n){if(n===Tt)try{let r=await t.json();if(n!==Tt)return;sr(r,e)}catch{}}async function tp(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===Tt&&ie({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===Tt;){let{done:u,value:d}=await s.read();if(u)break;if(c+=l.decode(d,{stream:!0}),!o){let S=mc(c);S&&(o=S,ie({type:"post-start",conversationId:o,url:""}))}let g=c.split(`
`);c=g.pop()??"";for(let S of g){let p=S.replace(/^data:\s*/,"").trim();!p||p==="[DONE]"||cc(p,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===Tt&&cc(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===Tt&&ie({type:"post-end",conversationId:o,error:i})}function ep(t,e,n){let r=Kf(e),o=Wf(e,n),i=Xf(r,o),a=Yf(r,o,n?.body),s=Tt,l="";return a&&(l=Zf(n?.body)||sc(r)||an(r)||N(),ie({type:"post-start",conversationId:l,url:r})),t(e,n).then(c=>{if(s!==Tt||!i&&!a)return c;try{let u=c.clone();i?Qf(u,sc(r)||N(),s):tp(u,l,!c.ok,s)}catch{a&&ie({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===Tt&&ie({type:"post-end",conversationId:l,error:!0}),c})}function np(){if(sn)return;let t=Uf();ar=t,sn=t.fetch.bind(t);let e=(n,r)=>ep(sn,n,r);zo=e,t.fetch=e,uc.debug("conversation fetch harvest hooked")}function rp(){Tt+=1,!(!sn||!ar)&&(zo&&ar.fetch===zo&&(ar.fetch=sn),sn=null,zo=null,ar=null,uc.debug("conversation fetch harvest unhooked"))}function nt(t){return $o.add(t),np(),()=>{$o.delete(t),$o.size===0&&rp()}}function ln(t){return t?_o.get(t)??"":""}function Fo(t){return t?qo.get(t)??null:null}var bc=new w("Streaming");function pr(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!dt(e))&&(P(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function op(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&dt(t))}function ip(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&dt(t))}function ap(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function pt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function D(){if(we()||pr()||ap())return!0;let t=oe();return t&&dt(t)&&!P(t)?!1:!!(op()||ip())}var sp=400,pc=3,Te=new Set,cr,ur=null,Sa=null,Le=!1,Se=0,ae="",kt="",dr=!1,mr=!1,fr=!1;function hc(){return Ft(et())}function gc(t,e){return{streaming:t,contextKey:e,conversationId:N()}}function X(t,e){if(!t||t===e)return!1;if(t.endsWith("|draft")&&!e.endsWith("|draft"))return!0;try{let n=t.split("|")[0],r=e.split("|")[0],o=new URL(n).pathname.replace(/\/$/,"")||"/",i=new URL(r).pathname.replace(/\/$/,"")||"/";if((o==="/"||o==="")&&i.startsWith("/c/"))return!0}catch{}return!1}function La(){Le=!1,Se=0,ae="",dr=!1,mr=!1,fr=!1}function lp(t){for(let e of Array.from(Te))try{e.onFall?.(t)}catch{}}function cp(t){for(let e of Array.from(Te))try{e.onRise?.(t)}catch{}}function lr(t){for(let e of Array.from(Te))try{e.onTick?.(t)}catch{}}function up(t,e){for(let n of Array.from(Te))try{n.onContext?.(t,e)}catch{}}function dp(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&P(n)&&(dr=!0)}function mp(t){t.type==="post-end"&&Le&&(fr=!0,t.error&&(mr=!0))}function fp(){let t=hc(),e=D();if(kt&&t&&kt!==t){if(up(t,kt),!X(kt,t)){La(),kt=t,lr(gc(e,t));return}ae===kt&&(ae=t)}kt=t;let n=gc(e,t);if(e){let i=!Le;i&&(dr=!1,mr=!1,fr=!1),Le=!0,Se=0,ae=t,i&&cp(n),lr(n);return}if(!Le){lr(n);return}if(Se+=1,fr&&(Se=Math.max(Se,pc)),Se<pc){lr(n);return}let r=!!ae&&ae===t,o={contextKey:ae||t,conversationId:N(),userStopped:dr,error:mr||pt()};La(),r&&lp(o),lr(n)}function pp(){cr===void 0&&(Le=D(),kt=hc(),ae=Le?kt:"",Se=0,dr=!1,mr=!1,fr=!1,ur?.abort(),ur=new AbortController,document.addEventListener("click",dp,{capture:!0,signal:ur.signal}),Sa=nt(mp),cr=setInterval(fp,sp),bc.debug("watchStreamingEdge started"))}function gp(){Te.size||(cr!==void 0&&(clearInterval(cr),cr=void 0),ur?.abort(),ur=null,Sa?.(),Sa=null,La(),kt="",bc.debug("watchStreamingEdge stopped"))}function V(t){let e=typeof t=="function"?{onFall:t}:t;return Te.add(e),pp(),()=>{Te.delete(e),gp()}}var yc="bloom-host-icon",gr="data-bloom-host-rel",Ta="not all",ka=0,vc=0,bp=400;function xc(t){ka+=1;try{t()}finally{ka-=1}}function jo(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function se(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function Ec(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function hp(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function yp(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-vc<bp||(vc=n,t.appendChild(e))}function vp(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||jo(n)&&(n.getAttribute(gr)||n.setAttribute(gr,n.rel),n.media!==Ta&&(n.media=Ta),n.rel!==yc&&(n.rel=yc))}function xp(t){for(let e of t.querySelectorAll(`link[${gr}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(gr);n&&(e.rel=n),e.removeAttribute(gr),e.media===Ta&&e.removeAttribute("media")}}function wc(t,e){let{head:n}=document;!n||!e||xc(()=>{vp(n,t);let r=Ec(t),{type:o,sizes:i}=hp(e);r?yp(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function Sc(t,e){let{head:n}=document;n&&xc(()=>{Ec(t)?.remove(),xp(n)})}function Lc(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(ka)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:jo(c.target)&&(a=!0,se(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)jo(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)jo(u)&&u.id!==t&&(a=!0,se(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var Ep=["original","badge","dot","hole","bg"],Cc=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],Mc={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Go="#FCFCFC",wp="#111111",Tc="#111111",Sp="#ffffff",Lp="#212121",Tp="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",kp={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Uo=32,kc=64;function Ac(t){return typeof t=="string"&&Ep.includes(t)}function Cp(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function Ko(t){let e=document.createElement("canvas");e.width=Uo,e.height=Uo;let n=e.getContext("2d");return n?(n.scale(Uo/kc,Uo/kc),t(n),e.toDataURL("image/png")):""}function Mp(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function Wo(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(Tp);n&&(t.strokeStyle=wp,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function Ap(t,e,n){let r=Mc[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=Tc,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=Tc,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=Sp,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function br(t,e){if(t==="original")return e==="wait"?Ko(r=>Wo(r,Go)):Cp(kp[e]);let n=e==="wait"?void 0:Mc[e];return Ko(t==="hole"?r=>Wo(r,n??Go):t==="bg"?r=>{r.fillStyle=n??Lp,Mp(r,0,0,64,64,14),r.fill(),Wo(r,Go,!1)}:r=>{Wo(r,Go),e!=="wait"&&Ap(r,e,t==="dot"?"dot":"badge")})}function Hc(t){return{wait:br(t,"wait"),rotate:br(t,"rotate"),done:br(t,"done"),ready:br(t,"ready"),error:br(t,"error")}}var Hp=new w("ChatStateFavicons"),Me="bloom-chat-state-favicon",Bc=["input","beforeinput","cut","paste","compositionend"],Dc=L({style:{type:3,description:"Favicon overlay",options:Cc}}),Mt="",Ma={wait:"",rotate:"",done:"",ready:"",error:""},hr="wait",ke=!1,Ct=!1,K=null,rt="",ot="",Ae=!0,cn=null,it=0,Vo=null,Yo=null,Ce=null,Ca=null,un=null,bt=!1,Nc=new WeakSet;function Np(){let t=Dc.store.style;return Ac(t)?t:"bg"}function $c(){let e=document.querySelector(`link[rel~="icon"]:not(#${Me}), link[data-bloom-host-rel]:not(#${Me})`)?.href;return se(e)?e:se(Mt)?Mt:""}function Rp(){let t=document.getElementById(Me);return t instanceof HTMLLinkElement?t:null}function Ip(){if(!se(Mt)){let t=$c();t&&(Mt=t)}return se(Mt)?Mt:Ma.wait}function _c(t){return t==="wait"?Ip():Ma[t]}function qc(){wc(Me,_c(hr))}function gt(t){let e=_c(t);if(hr===t){let n=Rp();if(n&&n.getAttribute("href")===e)return}hr=t,qc()}function Rc(){Ma=Hc(Np()),gt(hr)}function zc(){return Ft(et())}function Aa(t,e){!t||!e||t===e||(K===t&&(K=e),rt===t&&(rt=e),ot===t&&(ot=e))}function Pp(){let t=zc();return D()||ke||Ct?(rt&&t&&rt!==t&&X(rt,t)?(Aa(rt,t),rt=t):!rt&&t&&(rt=t),rt||t):(rt="",t)}function Ic(t){return!K||!t||K===t?!0:X(K,t)}function Fc(){ke=!1,Ct=!1,K=null,rt=""}function jc(t){ot=t,Fc(),Ae=!1,gt("wait")}function Pc(t){return!t&&Ae}function Op(){if(!bt)return;let t=zc();if(ot&&t&&ot!==t&&!X(ot,t)){jc(t);return}ot&&t&&X(ot,t)&&Aa(ot,t),t&&(ot=t);let e=Pp(),n=D(),r=re();if(pt()&&!n){gt("error"),ke=!1,Ct=!1,K=null;return}if(n){ke||(Ae=!1),ke=!0,Ct=!1,K=e,gt("rotate");return}if(ke){let o=Ic(e);if(ke=!1,o){Ct=!0,K=e,gt("done");return}Ct=!1,K=null}if(Ct)if(K&&e&&!Ic(e))Ct=!1,K=null;else if(r){K=e||K,gt("done");return}else if(Pc(r)){Ct=!1,gt("ready");return}else{Ct=!1,gt("wait");return}K=null,r?gt("wait"):Pc(r)?gt("ready"):gt("wait")}function le(){bt&&(Vc(),Uc(),Kc(),Op())}function Gc(){if(un){for(let t of Bc)un.removeEventListener(t,Wc,!0);un=null}}function Uc(){let t=mt(),e=t&&t!==document.body?t:null;if(!(un===e&&e?.isConnected)&&(Gc(),!!e)){un=e;for(let n of Bc)un.addEventListener(n,Wc,{capture:!0,passive:!0})}}function Kc(){let t=mt();if(!(Ce&&Ca===t&&t.isConnected)){if(Ce?.disconnect(),Ca=t,!t||t===document.body){Ce=null;return}Ce=new MutationObserver(()=>Xo()),Ce.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function Xo(){if(bt){if(document.hidden){it&&(cancelAnimationFrame(it),it=0),le();return}it||(it=requestAnimationFrame(()=>{it=0,bt&&le()}))}}function Wc(){ft()&&(Ae=!0),Xo()}function Oc(){ft()&&(Ae=!0),Xo()}function Bp(){bt&&(it&&(cancelAnimationFrame(it),it=0),le())}function Dp(){bt&&(Ae=!1,le())}function $p(){bt&&le()}function _p(){bt&&le()}function qp(t,e){if(bt){if(X(e,t)){Aa(e,t),ot=t,le();return}jc(t)}}function Vc(){let t=U();!t||Nc.has(t)||(Nc.add(t),t.addEventListener("input",Oc,{capture:!0,passive:!0}),t.addEventListener("compositionend",Oc,{capture:!0,passive:!0}))}var Yc=h({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[y.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Dc,startAt:"DOMContentLoaded",cleanupSelectors:[`#${Me}`],start(){bt=!0,Mt=$c()||Mt,Rc(),Yo?.disconnect(),Yo=Lc(Me,t=>{se(t)&&(Mt=t),qc()}),cn?.abort(),cn=new AbortController,window.addEventListener("popstate",Xo,{signal:cn.signal}),document.addEventListener("visibilitychange",Bp,{signal:cn.signal}),Vc(),Uc(),Kc(),Vo?.(),Vo=V({onRise:Dp,onFall:$p,onTick:_p,onContext:qp}),le(),Hp.debug("favicon watch started")},stop(){bt=!1,it&&cancelAnimationFrame(it),it=0,Vo?.(),Vo=null,cn?.abort(),cn=null,Gc(),Ce?.disconnect(),Ce=null,Ca=null,Yo?.disconnect(),Yo=null,Fc(),ot="",Ae=!0,hr="wait",Sc(Me,Mt)},onSettingsChange:Rc});var Xc=`.bloom-ih-hud {
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
`;var Mv=new w("InputHistory"),Ha=/\u200B/g,Zc=10,Jc=500,Qc=100,Fp=8,jp=120,Gp=2e3,Zo=10,Jo=L({maxEntries:{type:4,description:"Max stored prompts",min:Zc,max:Jc,default:Qc},history:{type:5,description:"Stored prompts",render:ig},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Na=new Map,$=0,Ra="",At=!1,vr=!1,Oa=0,yr=null,Ia,Ba=null,tu=!0;function ht(){let t=Jo.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function eu(t){let e=G(Number(Jo.store.maxEntries??Qc),Zc,Jc);return t.length>e?t.slice(t.length-e):t}function Qo(t){Jo.store.entries=eu(t)}function Up(t){return t.replaceAll(Ha,"").replace(/\n$/,"").trim()}function Pa(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Lt);return n instanceof HTMLElement?n:U()}function Kp(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!tt(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(Ha,"").trim().length===0,last:i.toString().replaceAll(Ha,"").trim().length===0}}catch{return{first:!0,last:!0}}}function nu(t){clearTimeout(Ia),Ia=setTimeout(()=>{if(t!==Oa)return;vr=!1;let e=Ba;e&&Ea(e,tu)},jp)}function ru(t,e,n){vr=!0,Ba=t,tu=n;let r=++Oa;zt(t,e,n),nu(r)}function Wp(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function dn(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Vp(){document.querySelector(".bloom-ih-hud")?.remove()}function Yp(t,e){let n=Wp();n.textContent=t;let r=(e.closest("form")??mt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-Fp)}px`,n.classList.add("bloom-ih-hud-on")}function Da(t){let e=Up(t);if(!e)return;let n=Date.now(),r=Na.get(e);if(r&&n-r<Gp)return;Na.set(e,n);let o=ht().filter(i=>i!==e);o.push(e),Qo(o),$=ht().length,At=!1,dn()}function Xp(t,e){let n=ht();if(!n.length&&t)return;$>=n.length&&(Ra=tt(e),$=n.length);let r=t?$-1:$+1;r<0||r>n.length||($=r,At=!0,ru(e,r===n.length?Ra:n[r],t),r<n.length?Yp(`${r+1} / ${n.length}`,e):dn())}function Zp(t){At=!1,dn(),ru(t,Ra,!1),$=ht().length}function Jp(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=Pa(t.target)??Pa(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&At&&!t.altKey&&!t.shiftKey){Zp(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){Da(tt(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=ht();if(!r){let i=Kp(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||$<=0)||!n&&$>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),Xp(n,e))}function Qp(t){if(Pa(t.target)){if(vr){nu(Oa);return}At&&(At=!1,dn(),$=ht().length)}}function tg(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(Lt);n instanceof HTMLElement&&Da(tt(n))}function eg(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(on);if(!n||!(n instanceof HTMLElement)||P(n))return;let r=U();r&&Da(tt(r))}function ng(t){if(!(!At||vr)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}At=!1,dn()}}function rg(){if(yr)return;yr=new AbortController;let{signal:t}=yr,e={capture:!0,signal:t};window.addEventListener("keydown",Jp,e),window.addEventListener("input",Qp,e),window.addEventListener("submit",tg,e),window.addEventListener("click",eg,e),window.addEventListener("pointerdown",ng,e)}function og(t){let e=ht().slice();e.splice(t,1),Qo(e),$>e.length&&($=e.length)}function ig(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=ht().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(m=>m.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/Zo));n>=l&&(n=l-1);let c=s.slice(n*Zo,n*Zo+Zo);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let m=document.createElement("div");m.className="bloom-ih-list",c.forEach((T,M)=>{let H=i.indexOf(T),Dt=ht().length-1-H,Et=document.createElement("div");Et.className="bloom-ih-item";let Y=document.createElement("button");Y.type="button",Y.className=`bloom-ih-body${r===M?"":" bloom-ih-clamp"}`,Y.textContent=T,Y.addEventListener("click",()=>{r=r===M?-1:M,o()});let R=document.createElement("div");R.className="bloom-ih-actions";let J=document.createElement("button");J.type="button",J.title="Copy",J.textContent="C",J.addEventListener("click",()=>{ml(T)});let $t=document.createElement("button");$t.type="button",$t.title="Delete",$t.textContent="\xD7",$t.addEventListener("click",()=>{og(Dt),o()}),R.append(J,$t),Et.append(Y,R),m.appendChild(Et)}),t.appendChild(m)}else{let m=document.createElement("p");m.className="bloom-ih-empty",m.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(m)}let d=document.createElement("div");d.className="bloom-ih-pager";let g=document.createElement("button");g.type="button",g.className="bloom-ih-btn",g.textContent="Prev",g.disabled=n<=0,g.addEventListener("click",()=>{n-=1,o()});let S=document.createElement("span");S.textContent=`${n+1} / ${l}`;let p=document.createElement("button");p.type="button",p.className="bloom-ih-btn",p.textContent="Next",p.disabled=n+1>=l,p.addEventListener("click",()=>{n+=1,o()});let b=document.createElement("button");b.type="button",b.className="bloom-ih-clear",b.textContent="Clear all",b.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Qo([]),$=0,o())}),d.append(g,S,p,b),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var ou=h({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[y.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:Jo,startAt:"HostReady",managedStyle:"inputHistory",start(){E("inputHistory",Xc),$=ht().length,At=!1,rg()},stop(){yr?.abort(),yr=null,dn(),Vp(),Na.clear(),clearTimeout(Ia),vr=!1,Ba=null,At=!1},onSettingsChange(){let t=ht(),e=eu(t);e.length!==t.length&&Qo(e),$>e.length&&($=e.length)}});var $a="noShareLink",ag=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],sg=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],_a=L({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function iu(t){return`${t.join(",")}{display:none!important}`}function au(){let t=[];if(_a.store.hideShareChat!==!1&&t.push(iu(ag)),_a.store.hideShareProject!==!1&&t.push(iu(sg)),!t.length){x($a);return}E($a,t.join(`
`))}var su=h({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[y.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:_a,start:au,onSettingsChange:au,stop(){x($a)}});var uu="noDictation",lg=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],cg=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],du=L({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function lu(t){return`${t.join(",")}{display:none!important}`}function cu(){let t=[lu(lg)];du.store.hideDictationSettings!==!1&&t.push(lu(cg)),E(uu,t.join(`
`))}var mu=h({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[y.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:du,start:cu,onSettingsChange:cu,stop(){x(uu)}});var qa="noSidebarIdentity",mn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],gu=mn.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),bu=mn.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),ug=[...gu,...bu],dg=[...gu,...mn.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],mg=mn.map(t=>`${t} a[href^="mailto:"]`),fg=mn.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),pg=mn.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),xr=L({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function fu(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function gg(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function bg(){return`${pg.join(",")}{margin-block:auto!important}`}function hg(){return`${fg.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function pu(){let t=xr.store.hideUsername!==!1,e=xr.store.hideEmail!==!1,n=t&&xr.store.enlargePlan!==!1,r=t&&xr.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(gg([...dg,...bu])),o.push(bg())):o.push(fu(ug))),e&&o.push(fu(mg)),n&&o.push(hg()),!o.length){x(qa);return}E(qa,o.join(`
`))}var hu=h({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[y.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:xr,start:pu,onSettingsChange:pu,stop(){x(qa)}});var yu=`#bloom-rt-host {
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
`;var Eu=new w("RecentTopics"),gn="bloom-rt-host",wu="home",Su=/^\/c\/([a-z0-9_-]{8,})/i,vg=/\/c\/([a-z0-9_-]{8,})/i,Lu=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,xg=new Set(["Backquote","IntlBackslash"]),Eg=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),wg=140,Sg=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),_=L({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Sg},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),ti=null,ei=null,Z=!1,kr=!1,Er=!1,Ht=0,He="",fn=null,wr=null,pn,za=null,Fa=null;function Lg(){let t=Number(_.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function Sr(){let t=_.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Ga(){let t=_.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Tu(){let t=_.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Ua(){let t=_.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function ri(t){let e=Lg();return t.length>e?t.slice(0,e):t}function Nt(t){return t===wu}function Lr(t,e=wg){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function Ka(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(Su)?.[1]??""}catch{return t.match(vg)?.[1]??""}}function Ne(){let t=(location.pathname||"/").match(Su);if(t?.[1])return t[1];let n=et().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return wu}function Wa(t){if(Nt(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(Ka(r.getAttribute("href")||"")!==t)continue;let o=Lr(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return Ne()===t&&e&&!/^ChatGPT$/i.test(e)?Lr(e,80):""}function Tg(t){if(Nt(t))return"New chat";let e=Ga()[t];if(e)return e;let n=ln(t);return n||Wa(t)||"Chat"}function kg(t){return Ua()[t]||""}function Cg(t){return Tu()[t]||{}}function Va(t,e){if(!t||Nt(t)||!e||/^new chat$/i.test(e.trim()))return;let n=Ga();n[t]!==e&&(n[t]=e,_.store.titles=n)}function Mg(t){t.type==="conversation-meta"&&(Va(t.conversationId,t.title),Z&&bn())}function Ag(t,e){if(!t||Nt(t)||!e)return;let n=Ua();n[t]!==e&&(n[t]=e,_.store.projects=n)}function Hg(t,e){if(!t||Nt(t)||!e.user&&!e.assistant)return;let n=Tu(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,_.store.previews=n)}function Ya(t){if(!t||Nt(t)&&_.store.includeHome===!1)return;let e=Sr().filter(n=>n!==t);e.unshift(t),_.store.visits=ri(e)}function oi(){let t=_.store.includeHome!==!1;return ri(Sr().filter(n=>t||!Nt(n))).map(n=>({id:n,title:Tg(n),project:kg(n),preview:Cg(n)}))}function vu(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return Lr(o)}catch{return""}}function Tr(t){if(!t||Nt(t)||t!==Ne())return;let e=Wa(t);e&&Va(t,e);let n=vu("user"),r=vu("assistant");Hg(t,{user:n,assistant:r});let o=Cu(t);if(o){let i=ku(o);i&&Ag(t,i)}}function Xa(){let t=Ga(),e=Ua(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${gn}, #bloom-root, #bloom-sidebar-panel`))continue;let u=Ka(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=Lr(c.textContent||"",80);d&&!Lu.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let g=ku(c);g&&e[u]!==g&&(e[u]=g,i=!0)}}catch{}o&&(_.store.titles=t),i&&(_.store.projects=e);let a=Sr(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(_.store.visits=ri([...a,...l]))}function ku(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=Lr((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!Lu.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function Cu(t){if(Nt(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(Ka(e.getAttribute("href")||"")===t)return e}catch{}return null}function Ng(t){let e=Cu(t);if(e){e.click();return}if(Nt(t)){location.assign("/");return}location.assign(`/c/${t}`)}function Rg(){let t=Ne();He&&He!==t&&Tr(He),He=t,Ya(t),Xa();let e=Wa(t);e&&Va(t,e),Tr(t)}function ni(){pn===void 0&&(pn=window.setTimeout(()=>{pn=void 0,Rg()},120))}function Ig(){fn||(fn=history.pushState.bind(history),wr=history.replaceState.bind(history),history.pushState=function(...e){let n=fn(...e);return ni(),n},history.replaceState=function(...e){let n=wr(...e);return ni(),n})}function Pg(){fn&&(history.pushState=fn),wr&&(history.replaceState=wr),fn=null,wr=null}function Og(t){return xg.has(t.code)||t.keyCode===192?!0:Eg.has(t.key)}function Mu(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function Bg(t,e){kr=e,Xa(),Tr(Ne()),Z=!0,Ht=0;try{let n=Ne();Ya(n);let r=oi();r.length>1&&(Ht=t?r.length-1:1)}catch(n){Eu.error("Failed to open switcher:",n)}bn()}function xu(t){let{length:e}=oi();e&&(Ht=(Ht+(t?-1:1)+e)%e,bn())}function Za(){if(!Z)return;let t=oi()[Ht];Z=!1,kr=!1,bn(),t&&Ng(t.id)}function Au(){Z&&(Z=!1,kr=!1,bn())}function Dg(t){if(Mu(t)){Er=!0;return}if((t.ctrlKey||Er)&&!t.altKey&&!t.metaKey&&Og(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{Z?xu(t.shiftKey):Bg(t.shiftKey,!0)}catch(n){Eu.error("Hotkey failed:",n)}return}if(Z){if(t.key==="Escape"){t.preventDefault(),Au();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),Za();return}t.key==="Tab"&&(t.ctrlKey||Er)&&(t.preventDefault(),xu(t.shiftKey))}}function $g(t){Mu(t)&&(Er=!1,Z&&kr&&Za())}function _g(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(ni)}function qg(t){!Z||(t.target instanceof Element?t.target:null)?.closest(`#${gn}`)||Au()}function zg(){document.visibilityState==="hidden"&&Tr(Ne())}function ja(t=ei){t instanceof HTMLElement&&Eo(t,xo("auto"),!0)}function Fg(){if(!document.body)return null;let t=document.getElementById(gn);if(t instanceof HTMLElement)return ei=t,ja(t),t;t=document.createElement("div"),t.id=gn;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),ei=t,ja(t),t}function bn(){let t=Fg();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!Z){e.dataset.visible="false",e.replaceChildren();return}let n=oi();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}Ht>=n.length&&(Ht=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===Ht?"true":"false",s.setAttribute("aria-selected",a===Ht?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{Ht=a,Za()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function jg(){document.getElementById(gn)?.remove(),ei=null}var Hu=h({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[y.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${gn}`],settings:_,start(){E("recentTopics",yu),He=Ne(),Ya(He),Xa(),Tr(He),za=nt(Mg),Ig(),ti=new AbortController;let{signal:t}=ti;window.addEventListener("keydown",Dg,{capture:!0,signal:t}),window.addEventListener("keyup",$g,{capture:!0,signal:t}),window.addEventListener("popstate",ni,{signal:t}),document.addEventListener("click",_g,{capture:!0,signal:t}),document.addEventListener("click",qg,{signal:t}),document.addEventListener("visibilitychange",zg,{signal:t}),Fa=Ve("schemeChange",()=>ja())},stop(){ti?.abort(),ti=null,pn!==void 0&&(clearTimeout(pn),pn=void 0),Pg(),za?.(),za=null,Fa?.(),Fa=null,Z=!1,kr=!1,Er=!1,jg()},onSettingsChange(){let t=ri(Sr());t.length!==Sr().length&&(_.store.visits=t),Z&&bn()}});var Ja="cleaner",Gg=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],Ug=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],Kg=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],Wg=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],Vg=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],Yg=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],Re=L({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function hn(t){return`${t.join(",")}{display:none!important}`}function Nu(){let t=[];if(Re.store.hideDownloadApps!==!1&&t.push(hn(Gg)),Re.store.hideDisclaimer!==!1&&t.push(hn(Ug)),Re.store.hideUpgrade!==!1&&t.push(hn(Kg)),Re.store.hideLockedModels!==!1&&t.push(hn(Wg)),Re.store.hideHomePromo!==!1&&t.push(hn(Vg)),Re.store.hideAds!==!1&&t.push(hn(Yg)),!t.length){x(Ja);return}E(Ja,t.join(`
`))}var Ru=h({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[y.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Re,start:Nu,onSettingsChange:Nu,stop(){x(Ja)}});var ai=new w("ResponseNotification"),vn=L({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:nb},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Qa=!1,ii=null,yn=null,Cr=null;function Xg(){return document.visibilityState==="hidden"||document.hidden}function Zg(){return vn.store.onlyWhenHidden===!1?!0:Xg()}function Jg(){let t=ln(N());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function Iu(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!yn||yn.state==="closed")&&(yn=new t);let e=yn,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){ai.debug("chime failed",t)}}function Qg(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){ai.debug("custom sound failed",e),Iu()}}function Pu(){let t=String(vn.store.soundUrl||"").trim();t?Qg(t):Iu()}function tb(){let t="Bloom++",e=`${Jg()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){ai.debug("notification failed",n)}}function eb(){Zg()&&(vn.store.sound!==!1&&Pu(),vn.store.browserNotification!==!1&&tb())}function nb(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>Pu()),t.appendChild(e),()=>{e.remove()}}var Ou=h({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[y.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:vn,start(){Qa=!0,ii?.(),ii=V(t=>{Qa&&(t.userStopped||t.error||eb())}),Cr?.abort(),Cr=new AbortController,vn.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:Cr.signal}),ai.debug("watch started")},stop(){Qa=!1,ii?.(),ii=null,Cr?.abort(),Cr=null;try{yn?.close()}catch{}yn=null}});var Bu=`#bloom-pq-chip {
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
`;var Nr=new w("PromptQueue"),es="bloom-pq-chip",Du="promptQueue",$u=80,ob=50,ib=2e3,Fu=L({replacePending:{type:2,description:"Replace the queued prompt if you Enter again while one is waiting.",default:!0}}),z=new Map,jt=!1,yt="",q="",ue=!1,vt=!1,B=null,Mr=null,si=null,Hr,Ar,xn=null;function En(){return Ft(et())}function wn(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function _u(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Lt);return n instanceof HTMLElement?n:U()}function ns(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function ju(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function ab(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?wn(e.innerText||e.textContent||""):""}catch{return""}}function qu(t){if(!yt||yt===t)return;let e=z.get(yt);!e||z.has(t)||X(yt,t)&&(z.delete(yt),z.set(t,e),q===yt&&(q=t),B?.key===yt&&(B.key=t),Nr.debug("migrated pending",yt,"\u2192",t))}function rs(t){let e=En();if(z.get(e)&&Fu.store.replacePending===!1)return;z.set(e,{text:t,at:Date.now()}),B={key:e,text:t,turns:ju(),ticks:3};let r=U();r&&zt(r,""),ce(),Nr.debug("queued",e,t.length)}function sb(t){z.delete(t),q===t&&(q=""),B?.key===t&&(B=null),ce()}function lb(){vt=!0,clearTimeout(Ar),Ar=setTimeout(()=>{vt=!1,Ar=void 0},ib)}function cb(){let t=En(),e=z.get(t);if(!e)return;let n=U();if(!n)return;z.delete(t),q="",ce(),lb(),zt(n,e.text);let r=oe();r&&!P(r)&&!Do(r)&&(r.click(),vt=!1)}function zu(t){if(!jt||ue||D()||En()!==t)return;let e=z.get(t);if(!e){q="";return}if(pt())return;let n=U();if(!n)return;if(!re(n)){let o=wn(tt(n));if(o&&o!==e.text)return}let r=oe();!r||P(r)||Do(r)||(ue=!0,zt(n,e.text),clearTimeout(Hr),Hr=setTimeout(()=>ub(t,e.text),ob))}function ub(t,e){Hr=void 0;try{if(!jt)return;let n=z.get(t);if(!n||n.text!==e||D()||En()!==t)return;let r=U();if(!r)return;let o=wn(tt(r));if(o&&o!==e&&!re(r))return;o!==e&&zt(r,e);let i=oe();if(!i||P(i)||Do(i))return;i.click(),z.delete(t),q="",ce(),Nr.debug("drained",t)}finally{ue=!1}}function Gu(t){let e=mt();if(!e||e===document.body){t.style.left="50%",t.style.bottom="6.5rem";return}let n=e.getBoundingClientRect();t.style.left=`${Math.round(n.left+n.width/2)}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`;let r=Math.min(512,Math.max(160,n.width-24));t.style.maxWidth=`${Math.round(r)}px`}function ts(){xn?.remove(),xn=null}function ce(){if(!jt||!document.body){ts();return}let t=En(),e=z.get(t);if(!e){ts();return}let n=xn;n?.isConnected||(n=document.createElement("div"),n.id=es,document.body.appendChild(n),xn=n),n.replaceChildren();let r=document.createElement("span");r.className="bloom-pq-kicker",r.textContent="Next";let o=document.createElement("span");o.className="bloom-pq-text";let i=e.text.length>$u?`${e.text.slice(0,$u)}\u2026`:e.text;o.textContent=i,o.title=e.text;let a=document.createElement("div");a.className="bloom-pq-actions";let s=document.createElement("button");s.type="button",s.className="bloom-pq-btn bloom-pq-send",s.textContent="Send now",s.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),cb()});let l=document.createElement("button");l.type="button",l.className="bloom-pq-btn bloom-pq-x",l.setAttribute("aria-label","Dismiss queued prompt"),l.textContent="\xD7",l.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),sb(t)}),a.append(s,l),n.append(r,o,a),Gu(n)}function db(){if(!B)return;if(B.ticks-=1,z.get(B.key)&&ju()>B.turns){let e=ab();if(e&&e===B.text){Nr.debug("native send leaked; dropping pending"),z.delete(B.key),q===B.key&&(q=""),B=null,ce();return}}B.ticks<=0&&(B=null)}function mb(t){if(!jt||t.isComposing||t.keyCode===229||t.key!=="Enter"||t.shiftKey||t.ctrlKey||t.metaKey||ue)return;let e=_u(t.target)??_u(document.activeElement);if(!e||!D())return;if(t.altKey||vt){vt=!1;return}if(!ft(e))return;let n=wn(tt(e));n&&(ns(t),rs(n))}function fb(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||P(e))return null;let n=t.closest(on);if(n instanceof HTMLElement&&!P(n))return n;let r=oe();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function pb(t){if(!jt)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${es}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&P(n)||ue||!D()||!fb(e))return;if(vt){vt=!1;return}let r=U();if(!r||!ft(r))return;let o=wn(tt(r));o&&(ns(t),rs(o))}function gb(t){if(!jt)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(Bo)&&!e.querySelector(Lt)||ue||!D())return;if(vt){vt=!1;return}let n=U()??e.querySelector(Lt);if(!n||!ft(n))return;let r=wn(tt(n));r&&(ns(t),rs(r))}var Uu=h({name:"PromptQueue",description:"Queue the next prompt while a reply is streaming. Enter/Send waits for this turn instead of interrupting.",authors:[y.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Du,cleanupSelectors:[`#${es}`],settings:Fu,start(){jt=!0,yt=En(),q="",ue=!1,vt=!1,B=null,E(Du,Bu),Mr?.abort(),Mr=new AbortController;let{signal:t}=Mr;window.addEventListener("keydown",mb,{capture:!0,signal:t}),document.addEventListener("click",pb,{capture:!0,signal:t}),document.addEventListener("submit",gb,{capture:!0,signal:t}),si?.(),si=V({onFall(e){if(jt){if(e.userStopped||e.error){q="",ce();return}q=e.contextKey,zu(e.contextKey)}},onContext(e){qu(e),yt=e,ce()},onTick(e){qu(e.contextKey),yt=e.contextKey,db(),q&&q===e.contextKey&&zu(q),xn&&Gu(xn)}}),ce(),Nr.debug("watch started")},stop(){jt=!1,si?.(),si=null,Mr?.abort(),Mr=null,clearTimeout(Hr),Hr=void 0,clearTimeout(Ar),Ar=void 0,z.clear(),B=null,q="",ue=!1,vt=!1,ts()}});var Ku=`.bloom-cls {
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
`;var Yu=new w("ChatListStatus"),Wu="chatListStatus",ui="bloom-cls",hb="bloom-cls",yb=1200*1e3,vb="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",Rt=new Map,It=!1,Sn="",Gt=!1,at=0,de=null,as=null,Ln=null,os=null,li=null,Rr=null,Tn=!1,kn=new Set;function ci(){return Date.now()}function Xu(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function Ie(t,e,n,r=!0){if(!(!t||!It)){if(e==="idle")Rt.delete(t);else{let o=Rt.get(t);o&&o.kind===e&&n!=="net"?o.at=ci():Rt.set(t,{kind:e,at:ci(),source:n})}r&&xb({v:1,id:t,kind:e,at:ci()}),Cn()}}function xb(t){try{Ln?.postMessage(t)}catch{}}function Eb(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||Ie(e.id,e.kind,"bc",!1)}function wb(){let t=ci();for(let[e,n]of Rt)n.kind==="streaming"&&t-n.at>yb&&Rt.delete(e)}function Sb(){let t=Xu();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(r.closest(vb))continue;let o=an(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function Vu(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function is(t){let e=t.querySelector(`:scope > .${ui}`);return e||null}function ss(){if(!It)return;wb();let t=N(),e=Sb();de?.disconnect();try{for(let n of e){let r=an(n.getAttribute("href")||"");if(!r||!t||r!==t){is(n)?.remove();continue}let i=Rt.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){is(n)?.remove();continue}let a=is(n);a||(a=document.createElement("span"),a.className=ui,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(Vu("streaming")):i==="error"&&a.appendChild(Vu("error")))}}catch(n){Yu.debug("paint failed",n)}Zu()}function Cn(){if(It){if(document.hidden){at&&(cancelAnimationFrame(at),at=0),ss();return}at||(at=requestAnimationFrame(()=>{at=0,It&&ss()}))}}function Zu(){let t=Xu();if(!(de&&as===t&&t?.isConnected)){if(de?.disconnect(),as=t,!t){de=null;return}de=new MutationObserver(()=>Cn()),de.observe(t,{childList:!0,subtree:!0})}}function ls(){return!!(we()||pr())}function Lb(t){return!!(Tn||t&&kn.has(t)||ls())}function Tb(t){if(It){if(t.type==="post-start"){t.conversationId?(Tn=!1,kn.add(t.conversationId),Gt=!0,Ie(t.conversationId,"streaming","net")):(Tn=!0,Gt=!0);return}t.type==="post-end"&&(Tn=!1,t.conversationId&&(kn.delete(t.conversationId),Ie(t.conversationId,t.error?"error":"done","net")),ls()||(Gt=!1))}}function kb(t,e){if(!It)return;if(X(e,t)){Cn();return}let n=N();if(!(Tn||n&&kn.has(n))){if(Gt=!1,n&&Rt.get(n)?.kind==="streaming"&&Rt.get(n)?.source==="local"){Ie(n,"idle","local");return}Cn()}}function Cb(t){if(!It)return;let e=t.conversationId||N();if(Sn&&e&&Sn!==e){let r=Rt.get(Sn);r?.kind==="streaming"&&r.source==="local"&&Ie(Sn,pt()?"error":"done","local"),Gt=!!(e&&kn.has(e))}if(Sn=e,Lb(e)&&(t.streaming||ls())){Gt=!0,e&&Ie(e,"streaming","local"),Cn();return}Gt&&(Gt=!1,e&&Ie(e,pt()?"error":"done","local")),Cn()}var Ju=h({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[y.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${ui}`],start(){It=!0,E(Wu,Ku);try{Ln=new BroadcastChannel(hb)}catch{Ln=null}Ln?.addEventListener("message",Eb),os=nt(Tb),li?.(),li=V({onTick:Cb,onContext:kb}),Rr?.abort(),Rr=new AbortController,document.addEventListener("visibilitychange",()=>{It&&(at&&(cancelAnimationFrame(at),at=0),ss())},{signal:Rr.signal}),Zu(),Yu.debug("sidebar status watch started")},stop(){It=!1,at&&cancelAnimationFrame(at),at=0,Rr?.abort(),Rr=null,de?.disconnect(),de=null,as=null,li?.(),li=null,os?.(),os=null;try{Ln?.close()}catch{}Ln=null,Rt.clear(),kn.clear(),Tn=!1,Gt=!1,Sn="",document.querySelectorAll(`.${ui}`).forEach(t=>t.remove()),x(Wu)}});var td="widerChat",ed=40,nd=96,rd=64,od=L({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:ed,max:nd,default:rd}});function Mb(){return G(Number(od.store.width??rd),ed,nd)}function Qu(){let t=Mb(),e=`min(100%,${t}rem)`;E(td,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var id=h({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[y.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:od,start:Qu,onSettingsChange:Qu,stop(){x(td)}});var cs="composerOpacity",Mn='form[data-type="unified-composer"],form.w-full[data-type]',Ab=[`${Mn} [class*="corner-superellipse"]`,`${Mn} [class*="bg-token-bg-primary"]`,`${Mn} [class*="bg-token-main-surface"]`].join(","),Hb=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),Nb="#thread-bottom-container,#thread-bottom",Rb=`${Mn} #prompt-textarea,${Mn} [contenteditable="true"]`,Ib="var(--bg-primary,var(--main-surface-primary,#ffffff))",us=L({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function Pb(){return G(Number(us.store.opacity??100),0,100)}function Ob(){return G(Number(us.store.blur??16),0,40)}function ad(){let t=Pb();if(t>=100){x(cs);return}let e=Ob(),n=`color-mix(in srgb,${Ib} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";E(cs,`${Nb}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Hb}{display:none!important}${Mn}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Ab}{background-color:${n}!important;background-image:none!important;${r}}${Rb}{background-color:transparent!important;background-image:none!important}`)}var sd=h({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[y.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:us,start:ad,onSettingsChange:ad,stop(){x(cs)}});var ld=`#bloom-bn-host {
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
`;var Db=new w("BetterNavigator"),ds="betterNavigator",md="bloom-bn-host",gs=60,$b=16,_b=1e3,qb=2.5,zb=.4,fi="\u6B63\u5728\u8F93\u51FA\u2026",bs="Image",Fb="\u2753",jb="\u{1F916}",cd=/file_[0-9a-f]+/gi,Gb=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),Ub=2e3,Kb=40,Wb=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,Vb=['section[data-testid^="conversation-turn-"][data-turn="user"]','section[data-testid^="conversation-turn-"][data-turn="assistant"]','article[data-testid^="conversation-turn-"][data-turn="user"]','article[data-testid^="conversation-turn-"][data-turn="assistant"]'].join(", "),Yb=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),Xb=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='thinking']","[class*='reasoning']","[class*='footnote']",".sr-only"].join(", "),Zb=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),xi=L({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),An=new Map,Dr=new Map,me=new Set,pi=0,xt=!1,Wt=!1,fe=null,$r=null,Be=null,gi=null,F=[],De="",bi=0,hi=-1,ws=0,yi="",st=0,Ut=0,Ir,Pr=null,di=null,ms=null,fs=null,Pe=null,hs=null,Or=null,Oe=null,Hn=null,Br=null;function Ei(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function ps(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function Jb(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function Qb(t){let e=t.getBoundingClientRect(),n=null;try{let o=t.querySelector("[data-message-id], [data-testid^='conversation-turn-']"),a=o?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]')??o;for(;a&&a!==t;)Wb.test(Jb(a))&&(n=a),a=a.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=ps(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||ps(getComputedStyle(t).getPropertyValue("--thread-content-width"))||ps(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function ud(t){try{return!!t.closest(Yb)}catch{return!0}}function dd(t){let e=(t.getAttribute("data-turn")||t.closest("[data-turn]")?.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("data-message-author-role")||t.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase();if(n==="user"||n==="assistant")return n;try{let o=(t.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent||"").toLowerCase();if(o.includes("you said"))return"user";if(o.includes("chatgpt said")||o.includes("assistant said"))return"assistant"}catch{}let r=(t.getAttribute("aria-label")||"").toLowerCase();return r.includes("you said")?"user":r.includes("chatgpt said")||r.includes("assistant said")?"assistant":null}function wi(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||t.querySelector("[data-message-id]")?.getAttribute("data-message-id")||""}function Si(t){try{if(t.querySelector("[class*='imagegen-image']")||t.querySelector('img[alt="Generated image"], img[alt^="Generated image"]'))return!0}catch{}return!1}function th(t){try{return!!t.closest("[class*='message-image']")}catch{return!0}}function mi(t,e){if(t){cd.lastIndex=0;for(let n of t.matchAll(cd))e.add(n[0].toLowerCase())}}function eh(t){try{let e=new Set,n=s=>{th(s)||(mi(s.getAttribute("src")||"",e),mi(s.getAttribute("srcset")||"",e),mi(s.getAttribute("href")||"",e),s instanceof HTMLImageElement&&mi(s.currentSrc||"",e))};for(let s of t.querySelectorAll("[class*='imagegen-image']")){n(s);for(let l of s.querySelectorAll("[src], [srcset], [href]"))n(l)}for(let s of t.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]'))n(s);if(e.size)return e.size;let o=t.querySelectorAll("[class*='group/imagegen-image']").length;if(!o)return 0;let i=wi(t);return(i?t.querySelector(`#image-${CSS.escape(i)}`):t.querySelector("[id^='image-']:not([id^='image-gen-'])"))&&o>=2&&(o-=1),o}catch{return 0}}function nh(t,e){let n=eh(t),r=Dr.get(e)??0,o=Math.max(r,n);return o>0&&Dr.set(e,o),o>=2?`${bs} x${o}`:bs}function vi(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(i.closest(Xb))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return(o.textContent||"").replace(/\s+/g," ").trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<gs+20;)e.push((r.textContent||"").replace(/\s+/g," ").trim());return e.join(" ").replace(/\s+/g," ").trim()}function rh(t,e){try{if(Si(t)||t.querySelector("img, picture, video, canvas"))return bs;if(t.querySelector("a[download], [class*='attachment']"))return"File";if(t.querySelector("pre, code"))return"Code"}catch{}return`Message ${e+1}`}function oh(t,e){if(e==="user"){let r=t.querySelector(".whitespace-pre-wrap")??t;return vi(r)}let n=t.querySelector(".markdown");return n?vi(n):""}function ih(t){return t.length>gs?`${t.slice(0,gs).trimEnd()}\u2026`:t}function ah(t,e,n,r){let o=oh(t,e);return o?ih(o):r?fi:Si(t)?nh(t,wi(t)):rh(t,n)}function sh(){if(Wt)return!0;let t=N();return!!(t&&me.has(t)||Li())}function Li(){return!!(we()||pr())}function lh(){pi=Date.now()}function fd(t){Wt=!1,t&&me.delete(t);let e=N();e&&me.delete(e)}function ch(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function uh(t){if(Si(t)||!Li())return!1;let e=t.querySelector(".markdown");if(!(!e||e instanceof HTMLElement&&!vi(e)))return!1;let r=t.querySelector("[class*='thinking'], [class*='reasoning']");if(!r)return!1;if(r.getAttribute("aria-busy")==="true"||r.classList.contains("result-streaming"))return!0;try{if(r.querySelector("[aria-busy='true'], .result-streaming"))return!0}catch{}let o=r.closest("details")??r.querySelector("details");return o instanceof HTMLDetailsElement&&o.open}function dh(t,e){try{if(ch(t)||e&&uh(t))return!0}catch{}return!1}function pd(t){if(!t||Li())return!1;try{if(t.querySelector(Gb)||Si(t))return!0;let e=t.querySelector(".markdown");if(e instanceof HTMLElement&&vi(e))return!0}catch{}return!1}function mh(t){if(Li()||pi&&Date.now()-pi<Ub)return;let e=[...t].reverse().find(n=>n.role==="assistant");!e||!pd(e.el)||fd()}function fh(t){let e=new Set,n=[];try{for(let r of t.querySelectorAll(Vb)){if(ud(r))continue;let i=wi(r)||`anon:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}if(n.length)return n;try{for(let r of t.querySelectorAll("[data-message-id]")){if(ud(r))continue;let i=r.getAttribute("data-message-id")||""||`mid:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}return n}function ph(){let t=Ei();if(!t||t===document.body)return[];let e=xi.store.showAssistant!==!1,n=e&&sh(),r=fh(t),o=null;if(e)for(let a of r)dd(a)==="assistant"&&(o=a);let i=[];try{for(let a of r){let s=wi(a);if(!s)continue;let l=dd(a);if(l!=="user"&&l!=="assistant"||l==="assistant"&&!e)continue;let c=l==="assistant"&&n&&dh(a,a===o)&&!pd(a),u=ah(a,l,i.length,c);u&&u!==fi&&u!==An.get(s)&&An.set(s,u);let d=c&&u===fi?fi:An.get(s)||u;i.push({id:s,el:a,role:l,text:d,live:c})}}catch{}return mh(i),i}function gh(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function gd(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function bh(t){return t===window?window.innerHeight:t.clientHeight}function hh(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(Zb)}catch{return!1}}function bd(){Ir!==void 0&&(clearTimeout(Ir),Ir=void 0),Pr?.classList.remove("bloom-bn-flash"),Pr=null}function yh(t){bd(),t.classList.add("bloom-bn-flash"),Pr=t,Ir=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),Pr===t&&(Pr=null),Ir=void 0},800)}function ys(t){if(!F.length)return;let e=Math.max(0,Math.min(t,F.length-1));bi=e,$r?.querySelectorAll(".bloom-bn-tick").forEach((r,o)=>{r.classList.toggle("bloom-bn-current",o===e)}),Be?.querySelectorAll(".bloom-bn-item").forEach((r,o)=>{r.classList.toggle("bloom-bn-active",o===e)}),gi&&(gi.textContent=`${e+1} / ${F.length}`);let n=Be?.children[e];if(n instanceof HTMLElement){let r=Be;if(r){let o=n.offsetTop-r.clientHeight/2+n.offsetHeight/2;r.scrollTop=Math.max(0,o)}}}function vs(t){let e=F[t];if(!e?.el.isConnected)return;hi=t,ws=Date.now()+_b,ys(t);let n=Hn??gd(e.el),o=Math.abs(e.el.getBoundingClientRect().top-gh())>qb*bh(n);e.el.scrollIntoView({behavior:o?"auto":"smooth",block:"start"}),xi.store.jumpEffect!=="none"&&yh(e.el)}function Ss(){if(!xt||!F.length)return;if(Date.now()<ws&&hi>=0){ys(hi);return}let t=window.innerHeight*zb,e=0;for(let n=0;n<F.length;n++){let r=F[n].el;r.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}ys(e)}function vh(t){let e=gd(t);if(Hn===e&&Br)return;Br?.(),Hn=e;let n=e===window?document:e,r=()=>{Ss(),Ls()};n.addEventListener("scroll",r,{passive:!0}),Br=()=>n.removeEventListener("scroll",r)}function xh(t){Oe?.disconnect(),Oe=null;let e=Hn instanceof HTMLElement?Hn:null;Oe=new IntersectionObserver(()=>Ss(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el.isConnected&&Oe.observe(n.el)}function Eh(){if(!document.body)return null;let t=fe;if(t?.isConnected)return t;t=document.createElement("div"),t.id=md,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),fe=t,$r=e,Be=i,gi=o,t}function hd(){let t=fe,e=Ei();if(!t||!e||!e.isConnected||F.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=Qb(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||Kb,d=n.right-r.right>=c+8?r.right+4:r.right-12-c;d=Math.min(d,n.right-c-8),d=Math.max(8,d);let g=Math.max(8,Math.round(window.innerWidth-d-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${g}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function Ls(){!xt||Ut||(Ut=requestAnimationFrame(()=>{Ut=0,xt&&hd()}))}function wh(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function Sh(t){let e=$r,n=Be;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>$b),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=wh(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",c=>{c.preventDefault(),vs(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-emoji",s.textContent=r.role==="user"?Fb:jb;let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=r.text,l.title=r.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),vs(o)}),n.appendChild(a)}))}function Lh(t){$r?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=Be?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function Th(){let t=N();return t===yi?!1:(yi=t,An.clear(),Dr.clear(),F=[],De="",bi=0,hi=-1,ws=0,Wt&&t&&(me.add(t),Wt=!1),!0)}function kh(t){let e=xi.store.showAssistant!==!1?"1":"0";return`${yi}|${e}|${t.map(n=>n.id).join(",")}`}function xs(){if(!xt)return;Th();let t=ph(),e=Ei();if(!e||t.length<1){F=t,De="",fe&&(fe.hidden=!0),Oe?.disconnect(),Es();return}Eh();let n=kh(t);n!==De?(F=t,De=n,Sh(t),vh(e),xh(t)):(F=t,Lh(t)),hd(),Ss(),Es()}function Kt(){if(xt){if(document.hidden){st&&(cancelAnimationFrame(st),st=0),xs();return}st||(st=requestAnimationFrame(()=>{st=0,xt&&xs()}))}}function Es(){let t=Ei();if(!(Pe&&hs===t&&t?.isConnected)){if(Pe?.disconnect(),Or?.disconnect(),hs=t,!t||t===document.body){Pe=null;return}Pe=new MutationObserver(()=>Kt()),Pe.observe(t,{childList:!0,subtree:!0}),Or=new ResizeObserver(()=>Ls()),Or.observe(t)}}function Ch(t){if(xt){if(t.type==="post-start"){lh(),t.conversationId?(Wt=!1,me.add(t.conversationId)):Wt=!0,Kt();return}if(t.type==="post-end"){if(Wt=!1,t.conversationId)me.delete(t.conversationId);else{let e=N();e&&me.delete(e)}Kt()}}}function Mh(t){if(!xt||!F.length||fe?.hidden||t.altKey||t.ctrlKey||t.metaKey||hh(t.target))return;let e=-1;if(t.key==="ArrowDown")e=bi+1;else if(t.key==="ArrowUp")e=bi-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=F.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),vs(Math.max(0,Math.min(e,F.length-1)))}function Ah(){bd(),Oe?.disconnect(),Oe=null,Pe?.disconnect(),Pe=null,hs=null,Or?.disconnect(),Or=null,Br?.(),Br=null,Hn=null,fe?.remove(),fe=null,$r=null,Be=null,gi=null}var yd=h({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[y.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:ds,cleanupSelectors:[`#${md}`],settings:xi,start(){xt=!0,yi=N(),E(ds,ld),di=new AbortController;let{signal:t}=di;window.addEventListener("keydown",Mh,{signal:t}),window.addEventListener("popstate",Kt,{signal:t}),window.visualViewport?.addEventListener("resize",Ls,{signal:t}),document.addEventListener("visibilitychange",()=>{xt&&(st&&(cancelAnimationFrame(st),st=0),Ut&&(cancelAnimationFrame(Ut),Ut=0),xs())},{signal:t}),fs=nt(Ch),ms=V({onTick(){Kt()},onFall(e){fd(e.conversationId),Kt()},onContext(e,n){X(n,e)||(An.clear(),Dr.clear(),De="",Wt=!1),Kt()}}),Es(),Kt(),Db.debug("navigator started")},stop(){xt=!1,st&&cancelAnimationFrame(st),st=0,Ut&&cancelAnimationFrame(Ut),Ut=0,di?.abort(),di=null,ms?.(),ms=null,fs?.(),fs=null,me.clear(),Wt=!1,pi=0,Ah(),An.clear(),Dr.clear(),F=[],De="",x(ds)},onSettingsChange(){De="",Kt()}});var vd=`.bloom-ts {
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
`;function xd(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Ed(t){try{return new Date(t).toISOString()}catch{return""}}var Td=new w("MessageTimestamps"),wd="messageTimestamps",ki="bloom-ts",Sd=1500,Nh="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",Nn=L({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),Rn=new Map,_e=!1,lt=0,pe=null,ks=null,Ts=null,Ti=null,_r=null,Ld=!1;function kd(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function Ms(){let t=Nn.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Cd(){let t={...Ms()};for(let[n,r]of Rn)t[n]=r;let e=Object.keys(t);if(e.length>Sd){let n=e.slice(e.length-Sd),r={};for(let o of n)r[o]=t[o];Nn.store.stamps=r;return}Nn.store.stamps=t}var Rh=fl(Cd,500);function Md(t,e){!t||!e||Rn.get(t)===e||(Rn.set(t,e),Rh(),$e())}function Ih(t){return t?Rn.get(t)??Ms()[t]??Fo(t)??null:null}function Ph(t){_e&&t.type==="message-time"&&Md(t.messageId,t.createTime)}function Oh(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function Bh(){let t=kd();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll("[data-message-id]"))n.closest(Nh)||e.push(n)}catch{}return e}function Dh(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function Cs(){if(!_e)return;let t=Nn.store.hideOwnMessages===!0,e=Nn.store.showDate!==!1,n=D(),r=Bh();pe?.disconnect();try{r.forEach((o,i)=>{let a=o.getAttribute("data-message-id")||"",s=Oh(o),l=o.querySelector(`:scope > .${ki}`);if(t&&s==="user"){l?.remove();return}if(Dh(o)){l?.remove();return}let c=Ih(a);if(!c&&a&&(n||Ld)&&i>=r.length-2&&(c=Date.now(),Md(a,c)),!c){l?.remove();return}let u=xd(c,e);if(!u){l?.remove();return}let d=l;d||(d=document.createElement("time"),d.className=ki,d.setAttribute("aria-hidden","true"),o.insertBefore(d,o.firstChild)),d.textContent!==u&&(d.textContent=u);let g=Ed(c);g&&d.getAttribute("datetime")!==g&&d.setAttribute("datetime",g)})}catch(o){Td.debug("paint failed",o)}Ld=n,Ad()}function $e(){if(_e){if(document.hidden){lt&&(cancelAnimationFrame(lt),lt=0),Cs();return}lt||(lt=requestAnimationFrame(()=>{lt=0,_e&&Cs()}))}}function Ad(){let t=kd();if(!(pe&&ks===t&&t?.isConnected)){if(pe?.disconnect(),ks=t,!t||t===document.body){pe=null;return}pe=new MutationObserver(()=>$e()),pe.observe(t,{childList:!0,subtree:!0})}}var Hd=h({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[y.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${ki}`],settings:Nn,start(){_e=!0,E(wd,vd);let t=Ms();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&Rn.set(e,n);Ts=nt(Ph),Ti?.(),Ti=V({onTick:$e,onFall:$e,onContext:$e}),_r?.abort(),_r=new AbortController,document.addEventListener("visibilitychange",()=>{_e&&(lt&&(cancelAnimationFrame(lt),lt=0),Cs())},{signal:_r.signal}),Ad(),$e(),Td.debug("timestamp watch started")},stop(){_e=!1,lt&&cancelAnimationFrame(lt),lt=0,_r?.abort(),_r=null,pe?.disconnect(),pe=null,ks=null,Ti?.(),Ti=null,Ts?.(),Ts=null,Cd(),Rn.clear(),document.querySelectorAll(`.${ki}`).forEach(t=>t.remove()),x(wd)},onSettingsChange:$e});var As="streamerMode",$h="filter:blur(6px)!important;transition:filter .2s ease",_h="filter:none!important",In=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],Pn=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function ct(t,e){return t.map(n=>`${n} ${e}`)}var qe=L({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function On(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${$h}}${e?`${r}{${_h}}`:""}`}function Nd(){let t=[];if(qe.store.conversations!==!1&&(t.push(On([...ct(Pn,'a[href^="/c/"]'),...ct(Pn,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),qe.store.projects!==!1&&(t.push(On([...ct(Pn,'a[href*="/project"]'),...ct(Pn,'a[href*="/g/g-p-"]'),...ct(Pn,'[data-testid="project-name"]'),...ct(Pn,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),qe.store.headerTitle!==!1&&t.push(On(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),qe.store.accountAvatar!==!1&&t.push(On([...ct(In,"img"),...ct(In,'[class*="avatar"]'),...ct(In,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),qe.store.accountName!==!1&&t.push(On([...ct(In,".min-w-0 > .truncate"),...ct(In,".min-w-0.flex-1 .truncate")],!1)),qe.store.accountEmail!==!1&&t.push(On([...ct(In,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!t.length){x(As);return}E(As,t.join(`
`))}var Rd=h({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[y.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:qe,start:Nd,onSettingsChange:Nd,stop(){x(As)}});var Id=`.bloom-gc-panel {
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
}`;var zh=new w("GreetingCustomizer"),Bn="greetingCustomizer",Pd="greetingCustomizerUi",qr=100,Ns=30,Fh=120,jh=1e3,Gh=50,Uh=40,Kh=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),zr=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),Ni=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function Wh(t){return!!t?.closest(Kh)}function $d(t){return!!(Wh(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function Vr(t){try{for(let e of document.querySelectorAll(t))if(!$d(e))return e}catch{}return null}function Hs(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(Vr(e))return e;return t}var _d=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],j=L({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:c0},greetings:{type:0,description:"Greeting texts",hidden:!0,default:_d},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),Pt=!1,_n=!1,Fe=null,Mi,Fr,Dn,jr,Ai=0,Ci=null,$n=null,Gr=null,Ur=null,Kr=null,Hi=null;function Yt(){let t=location.pathname||"/";return t==="/"||t===""}function ze(){let t=j.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):_d.slice()}function Wr(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function Od(t){j.store.greetings=t.slice(0,Ns)}function Yr(){let t=String(j.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function Vh(){return j.store.order==="random"?"random":"sequential"}function Yh(){return G(Number(j.store.intervalSec??10),1,3600)*1e3}function Xh(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Zh(){return!!Vr(Ni)}function Ri(){return!!(Vr(Ni)||Vr(zr))}function Jh(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=Zh()?Hs(Ni):Vr(zr)?Hs(zr):Hs(Ni),i=e?`${zr}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function Qh(t,e){if(t<=0)return 0;if(t===1)return Number(j.plain.index)!==0&&(j.store.index=0),Number(j.plain.lastRandom)!==0&&(j.store.lastRandom=0),0;let n=Number(j.plain.index),r=Number(j.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(Vh()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return j.store.index=s,j.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return j.store.index=i,i}function Vt(t){if(!Pt)return;if(!Yt()){x(Bn);return}let e=ze().map(Wr).filter(Boolean);if(!e.length){x(Bn);return}let n=Qh(e.length,t),r=e[n]??e[0],o=Yr()==="manual"&&e.length>1;E(Bn,Jh(Xh(r),o)),Hi?.()}function Rs(){Mi!==void 0&&(clearInterval(Mi),Mi=void 0)}function Is(){Rs(),!(!Pt||!Yt())&&Yr()==="interval"&&(ze().filter(Boolean).length<=1||(Mi=setInterval(()=>Vt(!0),Yh())))}function Ps(){jr!==void 0&&(clearTimeout(jr),jr=void 0),Ai=0}function Bd(){if(Ps(),!Pt||!Yt())return;Ai=Uh;let t=()=>{if(jr=void 0,!(!Pt||!Yt())){if(Ri()){Yr()==="refresh"&&!_n?(_n=!0,Vt(!0)):Vt(!1),Is();return}Ai-=1,Ai>0&&(jr=setTimeout(t,Gh))}};t()}function Os(){if(Fe===!0){Ri()?Vt(!1):Bd();return}Fe=!0,_n=!1,Yr()==="refresh"?(_n=!0,Vt(!0)):Vt(!1),Is(),Ri()||Bd()}function Bs(){Fe=!1,_n=!1,Rs(),Ps(),x(Bn)}function Ii(){Dn===void 0&&(Dn=window.setTimeout(()=>{Dn=void 0,Pt&&(Yt()?Os():Fe!==!1&&Bs())},Fh))}function t0(){$n||($n=history.pushState.bind(history),Gr=history.replaceState.bind(history),Ur=function(...e){let n=$n(...e);return Ii(),n},Kr=function(...e){let n=Gr(...e);return Ii(),n},history.pushState=Ur,history.replaceState=Kr)}function e0(){Ur&&history.pushState===Ur&&$n&&(history.pushState=$n),Kr&&history.replaceState===Kr&&Gr&&(history.replaceState=Gr),$n=null,Gr=null,Ur=null,Kr=null}function n0(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(Ii)}function r0(t){if(!Pt||!Yt()||Yr()!=="manual"||ze().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(zr);if(!n||$d(n))return;let r=window.getSelection?.();r&&String(r).trim()||Vt(!0)}function o0(){Fr===void 0&&(Fr=setInterval(()=>{if(!Pt)return;let t=Yt();if(t!==(Fe===!0)){t?Os():Bs();return}t&&Ri()&&Vt(!1)},jh))}function i0(){Fr!==void 0&&(clearInterval(Fr),Fr=void 0)}function Dd(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var a0="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",s0="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function l0(t,e){let n=Wr(t);return n?n.length>qr?`Keep it to ${qr} characters.`:ze().length+(e?1:0)>Ns?`At most ${Ns} greetings.`:null:"Enter a greeting."}function c0(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=ze(),s=Number(j.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=qr,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let m=l.querySelector(".bloom-gc-count");m&&(m.textContent=`${Wr(e).length}/${qr}`);let T=l.querySelector(".bloom-gc-error");T&&(T.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${Wr(e).length}/${qr}`;let g=document.createElement("span");g.className="bloom-gc-error",g.textContent=r;let S=document.createElement("div");if(S.className="bloom-gc-actions",n>=0){let m=document.createElement("button");m.type="button",m.className="bloom-gc-btn",m.textContent="Cancel",m.addEventListener("click",()=>{n=-1,e="",r="",i()}),S.appendChild(m)}let p=document.createElement("button");if(p.type="button",p.className="bloom-gc-btn bloom-gc-btn-primary",p.textContent=n>=0?"Update":"Add",p.addEventListener("click",()=>{let m=n<0,T=l0(e,m);if(T){r=T,i();return}let M=Wr(e),H=ze().slice();n>=0&&n<H.length?H[n]=M:H.push(M),Od(H),n=-1,e="",r="",i()}),S.appendChild(p),u.append(d,g,S),l.appendChild(u),t.appendChild(l),!a.length){let m=document.createElement("p");m.className="bloom-gc-empty",m.textContent="No greetings. The official heading stays.",t.appendChild(m);return}let b=document.createElement("div");b.className="bloom-gc-list",a.forEach((m,T)=>{let M=document.createElement("div");M.className="bloom-gc-item",T===s&&(M.dataset.active="true");let H=document.createElement("button");H.type="button",H.className=`bloom-gc-body${o===T?"":" bloom-gc-clamp"}`,H.textContent=m,H.addEventListener("click",()=>{o=o===T?-1:T,i()});let Dt=document.createElement("div");Dt.className="bloom-gc-item-actions";let Et=Dd("Edit",a0);Et.addEventListener("click",()=>{n=T,e=m,r="",i()});let Y=Dd("Delete",s0);Y.addEventListener("click",()=>{let R=ze().filter((J,$t)=>$t!==T);Od(R),n===T?(n=-1,e=""):n>T&&(n-=1),i()}),Dt.append(Et,Y),M.append(H,Dt),b.appendChild(M)}),t.appendChild(b)};return Hi=i,i(),()=>{Hi===i&&(Hi=null),t.replaceChildren()}}var qd=h({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[y.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Pd,settings:j,start(){Pt=!0,E(Pd,Id),t0(),Ci=new AbortController;let{signal:t}=Ci;window.addEventListener("popstate",Ii,{signal:t}),document.addEventListener("click",n0,{capture:!0,signal:t}),document.addEventListener("click",r0,{signal:t}),o0(),Fe=null,Yt()?Os():Bs(),zh.debug("started")},stop(){Pt=!1,Ci?.abort(),Ci=null,Dn!==void 0&&(clearTimeout(Dn),Dn=void 0),Rs(),Ps(),i0(),e0(),x(Bn),_n=!1,Fe=null},onSettingsChange(){Pt&&(Yt()?(Vt(!1),Is()):x(Bn))}});function u0(t){let e=/^data:([^;,]+)?(;base64)?,(.*)$/s.exec(t);if(!e)return null;let n=e[1]||"application/octet-stream",r=!!e[2],o=e[3]||"";try{if(r){let i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return new Blob([a],{type:n})}return new Blob([decodeURIComponent(o)],{type:n})}catch{return null}}async function Pi(t){try{return await createImageBitmap(t)}catch{return null}}async function d0(t){try{let e=new Image;return e.decoding="async",await new Promise((n,r)=>{e.onload=()=>n(),e.onerror=()=>r(new Error("img")),e.src=t}),await createImageBitmap(e)}catch{return null}}async function Oi(t){if(t.startsWith("data:")){let e=u0(t);if(e){let n=await Pi(e);if(n)return n}return d0(t)}try{let e=await fetch(t,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?Pi(await e.blob()):null}catch{return null}}var Di="data-bloom-csi-slot",m0="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",f0=/\bsize-(?:[6-9]|10)\b/,p0=/\b(?:h|w)-(?:[6-9]|10)\b/,g0=/^(plus|pro|free|team|go|business|enterprise)$/i,b0=['[class*="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-6"]','[class~="h-7"]','[class~="h-8"]','[class~="h-9"]','[class~="h-10"]','[class~="w-6"]','[class~="w-7"]','[class~="w-8"]','[class~="w-9"]','[class~="w-10"]'].join(",");function Bi(t){return t.getAttribute("class")||""}function Fd(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||f0.test(t)?!0:p0.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function h0(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3&&!jd(e)}function jd(t){return g0.test(String(t??"").replace(/\s+/g,""))}function Ot(t){return!!t?.closest(m0)}function $i(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function Xr(t){let e=Bi(t);return/\btext-xs\b/.test(e)||/text-token-text-secondary/.test(e)||/text-token-text-tertiary/.test(e)?!0:jd(t.textContent||"")}function _i(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function Zr(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function y0(t){return/\bflex\b/.test(t)&&!/\bflex-col\b/.test(t)}function Gd(t){if(Ot(t)||_i(t)||Zr(t)||Xr(t)||$i(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function Ud(t){return Ot(t)||_i(t)||Zr(t)||Xr(t)||t.querySelector("img, svg, .min-w-0, .truncate")?!1:h0(t.textContent||"")}function Kd(t){return Ot(t)||Zr(t)||$i(t)||Xr(t)?!1:Fd(Bi(t))||Ud(t)?!0:Gd(t)}function zd(t){return!(Ot(t)||$i(t)||Zr(t)||Xr(t)||_i(t))}function je(t,e){let n=_i(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(Zr(n)||$i(n)||Xr(n));)Ot(n)||(r=n),n=n.parentElement;return r}function v0(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||Ot(e))continue;if(y0(Bi(e))){let r=[];for(let o of e.children)if(!(!(o instanceof HTMLElement)||!zd(o))){if(Kd(o)||Fd(Bi(o)))return je(o,t)??o;r.push(o)}if(r.length===1)return je(r[0],t)??r[0]}let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&zd(r))return je(r,t)??r}}return null}function x0(t){let e=t.querySelectorAll(b0);for(let n of e)if(Kd(n))return je(n,t)??n;return null}function E0(t){for(let e of t.querySelectorAll("span, div, p, i"))if(Ud(e))return je(e,t)??e;return null}function w0(t){for(let e of t.querySelectorAll("*"))if(Gd(e))return je(e,t)??e;return null}function Wd(t,e){if(Ot(t))return null;if(e&&!Ot(e)&&t.contains(e)){let n=je(e,t);if(n)return n}return v0(t)??x0(t)??E0(t)??w0(t)}function Vd(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-8"]','[class~="w-8"]']}var qn="data-bloom-csi",qi="data-bloom-csi-orig",Ge=new Set,Yd=null;function $s(t){Yd=t}function Xd(t){return`url(${JSON.stringify(t)})`}function zi(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function _s(t,e,n){let r=Xd(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function Zd(t,e=Di){let n=Xd(t);return`[${e}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${e}] *,[${e}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${e}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`}function S0(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function zn(t){t.removeEventListener("error",Ds);let e=t.getAttribute(qi);t.removeAttribute(qn),t.removeAttribute(qi),e&&t.getAttribute("src")!==e&&(t.src=e)}function Ds(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&Ge.add(n),zn(e),Yd?.()}function Jd(t,e){if(!e||Ge.has(e)){zn(t);return}S0(t);let n=t.getAttribute("src")??"";if(t.getAttribute(qn)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(qi)&&t.setAttribute(qi,n);t.setAttribute(qn,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",Ds),t.addEventListener("error",Ds),n!==e&&(t.src=e)}var Qd=`/*
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
`;var tm=new w("CustomSidebarIdentity"),em="customSidebarIdentityUi",om="customSidebarIdentity",T0="bloom-csi-face",k0="bloom-csi-name",Fn=Di,C0=1024,Fi=256,im=24,am=64,sm=40,js=1,Gs=4,Jr=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],qs=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],v=L({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:U0},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:im,max:am,default:sm},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function Ke(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function M0(){return String(v.store.displayName??"").trim()}function Ui(t,e,n,r,o){let i=G(n,js,Gs),a=Math.min(t,e)/i,s=G(r,a/2,Math.max(a/2,t-a/2)),l=G(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}function A0(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function Us(t){let e=Math.min(1,C0/Math.max(t.width,t.height));return A0(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function H0(t,e,n,r){let{side:o,x:i,y:a}=Ui(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=Fi,s.height=Fi;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,Fi,Fi);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function N0(t){let e=await Pi(t);if(!e)return null;let n=Us(e);return e.close(),n}async function Ws(t,e,n,r){let o=await Oi(t);if(!o)return null;let i=H0(o,e,n,r);return o.close(),i}function Vs(){v.store.cropX=.5,v.store.cropY=.5,v.store.cropZoom=1}function nm(){v.store.avatarUrl="",v.store.avatarSource="",Vs()}var rm=0;async function Ks(t){let e=++rm;Vs(),v.store.avatarSource=t;let n=await Ws(t,.5,.5,1);return e!==rm?!1:(n&&(v.store.avatarUrl=n),!!n)}function Qr(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function zs(t){let e=Qr(t);if(!e)return!1;let n=await N0(e);return n?Ks(n):!1}var ut=!1,jn=!1,Gn=0,Ki=0,ji=null,ge=new Map,Un=null,Xt=null,Wi=null,Bt=null,Vi=null;function Yi(t){let e=String(t??"").trim();if(!e||Ge.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:n}=new URL(e);if(n==="https:"||n==="http:")return e}catch{return null}return null}function lm(){return Yi(v.store.avatarUrl)??Yi(v.store.avatarSource)}var Gi=!1,Fs=new Set;function cm(){let t=Yi(v.store.avatarSource);if(!t?.startsWith("data:image/")||Yi(v.store.avatarUrl)?.startsWith("data:image/")||Gi||Fs.has(t))return;Gi=!0;let e=Ke(v.store.cropX,.5),n=Ke(v.store.cropY,.5),r=Ke(v.store.cropZoom,1);Ws(t,e,n,r).then(o=>{if(Gi=!1,!o){Fs.add(t);return}ut&&(v.store.avatarUrl=o,Xi())}).catch(()=>{Gi=!1,Fs.add(t)})}function Ue(t,e){return t.map(n=>`${n} ${e}`)}function R0(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function I0(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=R0(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function um(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||Ot(n)||n.closest(".min-w-0")||e.push(n);return e}function P0(t){let e=um(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function Ys(){let t=[],e=ye();e&&t.push(e);let n=tn();if(n&&!t.some(r=>n.contains(r)||r.contains(n))){let r=n.querySelector(Jr.join(","))??n.querySelector("button, a, [role='button']")??n;r&&!t.includes(r)&&t.push(r)}return t}function dm(t,e){let n=P0(t);if(n)Jd(n,e);else for(let o of um(t))zn(o);let r=Wd(t,n);for(let o of t.querySelectorAll(`[${Fn}]`))o!==r&&o.removeAttribute(Fn);r&&r.setAttribute(Fn,"")}function O0(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function B0(t,e){let n=O0(t);n&&dm(n,e)}function D0(){for(let t of document.querySelectorAll(`img[${qn}]`))zn(t);for(let t of document.querySelectorAll(`[${Fn}]`))t.removeAttribute(Fn)}function $0(){let t=G(Math.round(Ke(v.store.avatarSize,sm)),im,am),e=lm(),n=M0(),r=v.store.applyToMenu!==!1,o=[],i=[...Ue(Jr,"img"),"#stage-sidebar-tiny-bar img"];r&&i.push(...Ue(qs,"> :first-child img"));let a=[...Ue(Jr,".min-w-0 > .truncate"),...Ue(Jr,".min-w-0.flex-1 .truncate")];r&&a.push(...Ue(qs,"> :first-child .truncate"));let s=Vd(Fn);o.push(zi([...s.flatMap(l=>Ue(Jr,l))].join(","),t)),o.push(zi(s.map(l=>`#stage-sidebar-tiny-bar ${l}`).join(","),32)),r&&o.push(zi(s.flatMap(l=>Ue(qs,`> :first-child ${l}`)).join(","),t)),e&&(o.push(_s(i.join(","),e,t)),o.push(_s("#stage-sidebar-tiny-bar img",e,32)),o.push(Zd(e))),n&&o.push(I0(a,n)),E(om,o.join(""))}function _0(){let t=lm(),e=Ys();for(let n of e)dm(n,t);if(v.store.applyToMenu!==!1){let n=en();n&&B0(n,t)}for(let n of document.querySelectorAll(`img[${qn}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||zn(n)}function Xi(){if(!(!ut||jn)){jn=!0;for(let t of ge.values())t.disconnect();Xt?.disconnect(),Bt?.disconnect();try{$0(),_0()}finally{jn=!1,Xs(),j0(),Un?.isConnected&&mm(Un),cm()}}}function to(){!ut||Gn||(Gn=requestAnimationFrame(()=>{Gn=0,Xi()}))}function q0(){jn||!ut||to()}function z0(t){if(ge.has(t))return;let e=new MutationObserver(q0);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),ge.set(t,e)}function F0(t){ge.get(t)?.disconnect(),ge.delete(t)}function Xs(){let t=new Set;for(let n of Ys())t.add(n),n.parentElement&&t.add(n.parentElement);let e=tn();e&&t.add(e);for(let n of[...ge.keys()])(!t.has(n)||!n.isConnected)&&F0(n);for(let n of t)n.isConnected&&z0(n)}function j0(){let t=yo();if(!t){Bt?.disconnect(),Bt=null,Wi=null;return}if(Wi===t&&Bt){Bt.observe(t,{childList:!0});return}Bt?.disconnect(),Wi=t,Bt=new MutationObserver(()=>{jn||!ut||(Xs(),to())}),Bt.observe(t,{childList:!0})}function mm(t){Un===t&&Xt||(Xt?.disconnect(),Un=t,Xt=new MutationObserver(()=>{if(!t.isConnected){Xt?.disconnect(),Xt=null,Un=null;return}jn||!ut||to()}),Xt.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function fm(t){if(!ut||v.store.applyToMenu===!1)return;let e=en();if(e){mm(e),to();return}t<=0||requestAnimationFrame(()=>fm(t-1))}function pm(t){ut&&(Xi(),!(Ys().length||t<=0)&&(Ki=requestAnimationFrame(()=>pm(t-1))))}function G0(t){ut&&v.store.applyToMenu!==!1&&(!vo(t)&&!en()||fm(10))}function U0(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let d=document.createElement("p");d.className="bloom-csi-hint";let g=document.createElement("div");g.className="bloom-csi-crop";let S=document.createElement("div");S.className="bloom-csi-stage";let p=document.createElement("img");p.className="bloom-csi-stage-img",p.alt="",p.draggable=!1,S.appendChild(p);let b=document.createElement("div");b.className="bloom-csi-zoom-row";let m=document.createElement("input");m.type="range",m.className="bloom-csi-zoom",m.min=String(js),m.max=String(Gs),m.step="0.05",m.setAttribute("aria-label","Zoom");let T=document.createElement("span");T.className="bloom-csi-zoom-val";let M=document.createElement("button");M.type="button",M.className="bloom-csi-btn",M.textContent="Reset",b.append(m,T,M);let H=document.createElement("p");H.className="bloom-csi-hint",H.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",g.append(S,b,H),t.append(u,d,g);function Dt(){let f=String(v.store.avatarSource??""),C=String(v.store.avatarUrl??"");return f.startsWith("data:image/")?f:C.startsWith("data:image/")?C:""}function Et(f,C,A){if(!a)return i.x=f,i.y=C,i.zoom=G(A,js,Gs),i;let W=Ui(a.w,a.h,A,f*a.w,C*a.h);return i.x=W.x/a.w,i.y=W.y/a.h,i.zoom=W.z,i}function Y(){m.value=String(i.zoom),T.textContent=`${Math.round(i.zoom*100)}%`;let f=a?Ui(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;f&&a&&(p.style.width=`${a.w/f.side*100}%`,p.style.height=`${a.h/f.side*100}%`,p.style.left=`${(.5-f.x/f.side)*100}%`,p.style.top=`${(.5-f.y/f.side)*100}%`)}function R(f=!1){let C=Dt(),A=String(v.store.avatarUrl??"").trim(),W=!!C;s.hidden=!A&&!C,(C||A)&&(s.src=C||A),document.activeElement!==l&&(l.value=W?"":A),l.placeholder=W?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",g.hidden=!C,d.hidden=!(e&&/^https?:\/\//.test(A)&&!C),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",C&&(f&&(i.x=Ke(v.store.cropX,.5),i.y=Ke(v.store.cropY,.5),i.zoom=Ke(v.store.cropZoom,1)),p.getAttribute("src")!==C&&(a=null,p.onload=()=>{a={w:p.naturalWidth,h:p.naturalHeight},Et(i.x,i.y,i.zoom),Y()},p.src=C),Y())}function J(f,C,A,W=!1){Et(f,C,A),Y();let nl=Dt(),rl=()=>{v.store.cropX=i.x,v.store.cropY=i.y,v.store.cropZoom=i.zoom,nl&&Ws(nl,i.x,i.y,i.zoom).then(ol=>{ol&&(v.store.avatarUrl=ol)})};r&&clearTimeout(r),W?rl():r=setTimeout(rl,80)}function $t(f){v.store.avatarUrl=f;let C=f.trim();if(n&&clearTimeout(n),!C){v.store.avatarSource="",Vs(),e=!1,R(!0);return}if(C.startsWith("data:image/")){e=!1,n=setTimeout(()=>{Oi(C).then(A=>{if(!A)return;let W=Us(A);A.close(),W&&Ks(W).then(()=>R(!0))})},80);return}if(/^https?:\/\//.test(C)){e=!1,v.store.avatarSource="",n=setTimeout(()=>{Oi(C).then(A=>{if(!A){e=!0,R(!0);return}let W=Us(A);A.close(),W?(e=!1,Ks(W).then(()=>R(!0))):(e=!0,R(!0))})},400);return}e=!1,v.store.avatarSource="",R(!0)}u.addEventListener("paste",f=>{Qr(f.clipboardData)&&(f.preventDefault(),e=!1,zs(f.clipboardData).then(()=>R(!0)))}),u.addEventListener("dragover",f=>{Qr(f.dataTransfer)&&f.preventDefault()}),u.addEventListener("drop",f=>{Qr(f.dataTransfer)&&(f.preventDefault(),e=!1,zs(f.dataTransfer).then(()=>R(!0)))}),l.addEventListener("change",()=>$t(l.value)),l.addEventListener("paste",f=>{Qr(f.clipboardData)&&(f.preventDefault(),e=!1,zs(f.clipboardData).then(()=>R(!0)))}),l.addEventListener("keydown",f=>{Dt()&&!l.value&&(f.key==="Backspace"||f.key==="Delete")&&(nm(),e=!1,R(!0))}),c.addEventListener("click",()=>{nm(),e=!1,R(!0)}),S.addEventListener("pointerdown",f=>{f.button===0&&(S.setPointerCapture(f.pointerId),o.on=!0,o.px=f.clientX,o.py=f.clientY,o.x=i.x,o.y=i.y)}),S.addEventListener("pointermove",f=>{if(!o.on||!a)return;let C=S.clientWidth;if(!C)return;let{side:A}=Ui(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);Et(o.x-(f.clientX-o.px)*(A/C)/a.w,o.y-(f.clientY-o.py)*(A/C)/a.h,i.zoom),Y()}),S.addEventListener("pointerup",()=>{o.on&&(o.on=!1,J(i.x,i.y,i.zoom,!0))}),S.addEventListener("pointercancel",()=>{o.on=!1}),S.addEventListener("wheel",f=>{f.preventDefault(),J(i.x,i.y,i.zoom*(f.deltaY<0?1.08:1/1.08))},{passive:!1}),m.addEventListener("input",()=>J(i.x,i.y,Number(m.value))),m.addEventListener("change",()=>J(i.x,i.y,Number(m.value),!0)),M.addEventListener("click",()=>J(.5,.5,1,!0));let el=()=>R(!1);return Vi=el,R(!0),()=>{Vi===el&&(Vi=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var gm=h({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[y.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:em,cleanupSelectors:[`.${T0}`,`.${k0}`],settings:v,start(){ut=!0,Ge.clear(),$s(to),E(em,Qd),ji=new AbortController,document.addEventListener("click",G0,{signal:ji.signal}),pm(40),cm(),tm.debug("started")},onSettingsChange(){Ge.clear(),Vi?.(),ut&&(Xs(),Xi())},stop(){ut=!1,ji?.abort(),ji=null,Gn&&cancelAnimationFrame(Gn),Gn=0,Ki&&cancelAnimationFrame(Ki),Ki=0;for(let t of ge.values())t.disconnect();ge.clear(),Xt?.disconnect(),Xt=null,Un=null,Bt?.disconnect(),Bt=null,Wi=null,D0(),x(om),$s(null),Ge.clear(),tm.debug("stopped")}});var Kn=new w("Bloom"),bm=!1,K0=Date.now(),W0=[ec,Yc,ou,su,mu,hu,Hu,Ru,Ou,Uu,Ju,id,sd,yd,Hd,Rd,qd,gm];function Zi(t){return new Promise(e=>setTimeout(e,t))}function V0(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function Y0(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var ym=8e3,hm=300,X0=250;async function Z0(){if(he())return await Zi(hm),!0;for(;Date.now()-K0<ym;)if(await Zi(X0),he())return await Zi(hm),!0;return he()||oa()}function Zs(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function J0(){if(Zs())return!0;let t=Date.now()+ym;for(;Date.now()<t;)if(await Zi(100),Zs())return!0;return Zs()}function Q0(){try{GM_registerMenuCommand?.("Bloom++ settings",tc)}catch{}}function ty(){uo(()=>{Vn("HostShell"),Kn.info("host shell",Q)}),mo(()=>{Kn.info("idle ready",Q)}),fo(()=>{Qi(),Vn("HostReady"),Kn.info("chrome ready",Q)})}async function Js(){await pl()}async function Qs(){if(bm)return;bm=!0;for(let n of W0)try{Sl(n),Pl(n)}catch(r){Kn.error("register failed",n.name,r)}kl(),Vn("Init"),Q0(),ty();let t=()=>Vn("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await V0(),Qi(),Kn.info("styles ready",Q),await Y0(),J0().then(n=>{n&&po()}),!await Z0()){Kn.warn("late islands not detected; starting default plugins",Q),Ze(),go();return}await Rl()}var vm=typeof unsafeWindow<"u"?unsafeWindow:window,ey=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||ey){let t=vm.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",Q);try{Object.defineProperty(vm,"Bloom",{value:tl,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}Js().then(()=>Qs()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
