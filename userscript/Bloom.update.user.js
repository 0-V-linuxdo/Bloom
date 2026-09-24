// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260924] v1.4.85
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

/* Bloom++ [20260924] v1.4.85. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var rf=Object.defineProperty;var of=(t,e)=>{for(var n in e)rf(t,n,{get:e[n],enumerable:!0})};var Pl={};of(Pl,{REPO_URL:()=>fc,Settings:()=>k,VERSION:()=>st,contextKeyFromUrl:()=>Qt,conversationTitle:()=>kn,conversationToken:()=>xt,currentConversationId:()=>C,hasDraftText:()=>It,hasErrorToast:()=>Ot,hasLateIslands:()=>Ie,init:()=>Rl,initSettings:()=>Nl,isDocumentInteractive:()=>gc,isStreaming:()=>Q,isUserDraftEmpty:()=>pe,messageCreateTime:()=>ii,plugins:()=>Xt,requestChromeReady:()=>No,requestIdleReady:()=>hn,requestShellReady:()=>Io,setEditorText:()=>Jt,subscribeHarvest:()=>lt,watchStreamingEdge:()=>tt,whenChromeReady:()=>Ho,whenIdleReady:()=>Ao,whenShellReady:()=>Co});var le=new Map,vo=!1;function af(){return document.getElementById("bloom-root")?.shadowRoot??null}function $l(){return document.head??null}function fn(){let t=af();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=sf()}function La(t,e){if(!vo)return;let n=$l();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),fn();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,fn();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,fn()}function w(t,e){let n=le.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},le.set(t,n)),vo&&La(t,n)}function Ta(){if(!$l())return!1;vo=!0;for(let[e,n]of le)La(e,n);return fn(),!0}function ql(t){let e=le.get(t);e&&(e.disabled=!1,vo&&La(t,e))}function Fl(t){let e=le.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),fn())}function E(t){let e=le.get(t);e&&(e.el?.remove(),le.delete(t),fn())}function sf(){return Array.from(le.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var S=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function y(t){return t}var ka=new Map;function pn(t,e){let n=ka.get(t);return n||(n=new Set,ka.set(t,n)),n.add(e),()=>n.delete(e)}function He(t,e){let n=ka.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var lf="bloompp";function zl(){return new Promise((t,e)=>{let n=indexedDB.open(lf,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function jl(t){try{let e=await zl();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function Gl(t,e){try{let n=await zl();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function gn(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function Y(t,e,n){return Math.min(n,Math.max(e,t))}function Ul(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function Kl(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function Vl(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var xo=new S("SettingsStore"),ce="BloomSettings",cf=100;function Eo(t){return t!=null&&typeof t.then=="function"}function uf(t){if(t==null||Eo(t))return null;if(gn(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(gn(e)&&!Eo(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return gn(n)&&!Eo(n)?n:null}return null}catch{return null}}function So(t){let e=uf(t);if(!e)return null;let n=e.plugins;return!gn(n)||Eo(n)||Object.keys(n).length===0?null:e}var wo=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let m=l.slice(c.length+1);if(m&&!m.includes(".")){let d=u(m);d!==void 0&&(i[a]=d,s=d);break}}}return gn(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){xo.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},cf))}save(){try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(ce,this.plain)}catch{try{GM_setValue(ce,e)}catch(n){xo.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(ce,e)}catch{}Gl(ce,e).catch(n=>xo.warn("Failed to save settings to IndexedDB:",n))}catch(e){xo.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){Ul(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var df=new S("Settings"),mf={plugins:{}},k=new wo(structuredClone(mf)),ff=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function pf(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function L(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?(k.store.plugins[n]||(k.store.plugins[n]={}),k.store.plugins[n]):{}},get plain(){let n=e.pluginName;return n?k.plain.plugins[n]??{}:{}}};return e}async function gf(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function Wl(){let t=So(await gf(ce));if(t||(t=So(await jl(ce))),!t)try{t=So(localStorage.getItem(ce))}catch{t=null}if(!t)return;let e=t.plugins;e&&(k.plain.plugins=e,df.debug("Loaded settings"))}function Yl(t,e){e&&(e.pluginName=t,k.plain.plugins[t]||(k.plain.plugins[t]={}),k.setDefaultGetter(ff(t),n=>{if(n!=="enabled")return pf(e.def,n)}))}function Xl(){return k.plain.plugins.Settings||(k.store.plugins.Settings={}),k.store.plugins.Settings}function Lo(){return Xl().pinnedPlugins??[]}function Zl(t){return Lo().includes(t)}function Jl(t){let e=Lo(),n=e.includes(t);return k.store.plugins.Settings={...k.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function To(){return Xl().starredPlugins??[]}function Ql(t){return To().includes(t)}function tc(t){let e=To(),n=e.includes(t);return k.store.plugins.Settings={...k.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var ko=new S("PluginManager"),Xt={},cr=new Set;function rc(t){if(Xt[t.name]){ko.warn("Duplicate plugin",t.name);return}Xt[t.name]=t,Yl(t.name,t.settings)}function bn(t){let e=Xt[t];if(!e)return!1;if(e.required)return!0;let n=k.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function oc(t){let e=Xt[t];if(!e||e.required)return;let n=!bn(t);k.plain.plugins[t]||(k.store.plugins[t]={}),k.store.plugins[t].enabled=n,n?ic(e):bf(e),He("pluginToggle",{name:t,enabled:n})}function ic(t,e=!1){if(!cr.has(t.name)&&bn(t.name))try{t.managedStyle&&ql(t.managedStyle),t.start?.(),cr.add(t.name),t.settings&&k.addPrefixChangeListener(`plugins.${t.name}.`,()=>{cr.has(t.name)&&t.onSettingsChange?.()}),e||ko.debug("Started",t.name)}catch(n){ko.error("Failed to start",t.name,n)}}function bf(t){if(cr.has(t.name)){try{t.stop?.()}catch(e){ko.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(Fl(t.managedStyle),E(t.managedStyle)),cr.delete(t.name)}}function ur(t){for(let e of Object.values(Xt))(e.startAt??"DOMContentLoaded")===t&&ic(e)}var ec=2,nc="defaultsRev";function ac(){let t=k.plain.plugins.Settings;if(!(!t||t[nc]===ec)){for(let e of["NoShareLink","NoDictation"]){let n=k.plain.plugins[e];!n||typeof n.enabled=="boolean"||(n.enabled=!1)}t[nc]=ec}}var dr=!1,Mo=!1,Ma=!1,lc=[],cc=[],uc=[];function Ca(t){let e=t.splice(0);for(let n of e)n()}function mr(){dr||(dr=!0,Ca(lc))}function Aa(){Mo||(Mo=!0,dr||mr(),Ca(cc))}function dc(){Ma||(Ma=!0,dr||mr(),Mo||Aa(),Ca(uc))}function Co(t){dr?t():lc.push(t)}function Ao(t){Mo?t():cc.push(t)}function Ho(t){Ma?t():uc.push(t)}function Io(){mr()}function hn(){mr(),Aa()}function No(){dc()}function sc(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function mc(){await sc(4e3),mr(),await sc(4e3),Aa(),dc()}var v={p:"0-V-linuxdo"},st="[20260924] v1.4.85",fc="https://github.com/0-V-linuxdo/Bloom";var hf={BetterNavigator:1790240385e3,ChatListStatus:1790233382e3,ChatStateFavicons:1790233382e3,Cleaner:1789910872e3,ComposerOpacity:1789910872e3,CustomSidebarIdentity:1789970413e3,GreetingCustomizer:1789861316e3,InputHistory:1789858186e3,MessageTimestamps:1790230458e3,NoDictation:1789910872e3,NoShareLink:1789910872e3,NoSidebarIdentity:1789910872e3,PromptQueue:1790239403e3,RecentTopics:1790181019e3,ResponseNotification:1790233382e3,Settings:1789973738e3,StreamerMode:1789924346e3,WiderChat:1789910872e3};function pc(t){let e=hf[t.name];typeof e=="number"&&e>0&&(t.updatedAt=e)}function yf(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function vf(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function Ha(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function Ie(){return Ha()?yf()||vf():!1}function gc(){return Ie()}var xf=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),bc=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Ef=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),wf="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function vn(t){return t.id==="bloom-root"||!!t.closest(wf)}function hc(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function Ro(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function Ia(t){if(!(t instanceof HTMLElement)||!t.isConnected||vn(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&Ro(e)?!1:t.getClientRects().length>0}function yn(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function Sf(){let t=[];for(let e of document.querySelectorAll(xf))!(e instanceof HTMLElement)||!e.isConnected||vn(e)||t.push(e);return t}function Po(t){if(!t.isConnected||vn(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function Ne(){return Sf().filter(Po)[0]??null}function xn(){let t=document.getElementById("stage-sidebar-tiny-bar");if(!(t instanceof HTMLElement)||!t.isConnected||vn(t))return null;let e=t.getBoundingClientRect();return e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3?null:t}function Na(t){let e=t,n=t.parentElement;n&&n.children.length===1&&!vn(n)&&!yn(n)&&n.parentElement&&!yn(n.parentElement)&&(e=n);let r=e.parentElement;if(r&&!yn(r)&&!vn(r)&&r.children.length>1){let o=r.getAttribute("class")||"";if(/\bflex\b/.test(o)&&!/flex-col/.test(o)&&r.parentElement&&!yn(r.parentElement))return r}return e}function En(){let t=document.querySelectorAll(bc);for(let n of t)if(Ia(n)&&!Ro(n)&&hc(n))return n;let e=document.querySelectorAll(Ef);for(let n of e){if(!Ia(n)||!hc(n)||Ro(n))continue;let r=n.querySelector(bc);return Ia(r)&&!Ro(r)?r:n}return null}function Oo(){let t=Ne();if(t){let e=Na(t),n=e.parentElement;if(n&&!yn(n))return n;if(!yn(e))return e}return xn()}function Bo(t){let e=Ne();return e?t.composedPath().includes(e):!1}var Pa=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Lf={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Tf(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function kf(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function Ra(t){let e=Tf(t);return e?kf(e)>.55?"light":"dark":null}function Mf(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=Ra(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=Ra(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Ra(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Do(t){return t==="auto"?Mf():t}function Cf(t){try{let e=getComputedStyle(document.documentElement);for(let n of Pa){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function _o(t,e,n){let r=Lf[e];if(n){Cf(t);for(let o of Pa)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of Pa)t.style.setProperty(o,r[o])}function yc(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var Oa=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var Hf="bloom-root",At="bloom-rail-item",jo="bloom-account-item",Pe="bloom-sidebar-panel",Er="bloom-plugin-dialog",Xo="bloom-plugin-layer",Go="bloom-settings-css",If=2e3,Ec=null,Nf=null,fe=!1,$a=[],$o=null,Uo=null,de=null,Fo=null,Zt=null,yr=null,fr,wn=0,vr=0,pr=0,gr=null,br=null,Ko=null,wc=null,hr=null,Ba=[],Vo=!1,Rf=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Pf=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Of=new Set(["chat","ui","privacy"]),Bf=10080*60*1e3,Zo="",xr="all",Ct="all";function Jo(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Sc(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Df(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'}function _f(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function $f(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function qf(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var Ff={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function zf(t){return t.icon||Ff[t.name]||Jo()}function Da(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),_o(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function Lc(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function Wo(){let t="auto",e=Do(t);Da(Ec,e,!0);let n=document.getElementById(Pe);n instanceof HTMLElement&&Da(n,e,!0);let r=document.getElementById(Er);r instanceof HTMLElement&&Da(r,e,!0);let o=document.getElementById(At);o instanceof HTMLElement&&Lc(o),He("schemeChange",{scheme:e,pref:t})}function Tc(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function kc(){if(w("settings",Oa),document.getElementById(Go)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=Go,t.textContent=Oa,document.head.appendChild(t)}function jf(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Gf(){for(let t of $a)t();$a=[]}function Mc(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function Uf(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function za(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function Kf(t){return za(t).length>0}function zo(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function Vf(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=Uf(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function Wf(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(Vf(e,n));let i=k.store.plugins[t]??(k.store.plugins[t]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",$a.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??zo(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??zo(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=Mc(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??zo(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function vc(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function Yf(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=k.store.plugins[t.name]??(k.store.plugins[t.name]={});for(let[n,r]of za(t)){if(n==="enabled"||r.type===5)continue;let o=zo(r);o!==void 0&&(e[n]=o)}Ac(t)}function Cc(t){t.key==="Escape"&&(!document.getElementById(Xo)&&!document.getElementById(Er)||(t.stopPropagation(),Sn()))}function Xf(){Vo||(document.addEventListener("keydown",Cc),Vo=!0)}function Zf(){Vo&&(document.removeEventListener("keydown",Cc),Vo=!1)}function Sn(){Gf(),Zf(),document.getElementById(Xo)?.remove(),document.getElementById(Er)?.remove()}function Ac(t){if(Sn(),!document.body)return;let e=document.createElement("div");e.id=Xo,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",me),e.addEventListener("pointerup",me),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&Sn()});let n=document.createElement("div");n.id=Er,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",me),n.addEventListener("pointerup",me),n.addEventListener("click",me);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=Sc(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),Sn()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=vc("Authors"),m=document.createElement("p");m.className="bloom-plugin-dialog-authors",m.textContent=t.authors.join(", "),u.appendChild(m),n.appendChild(u)}let s=vc("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=za(t);if(c.length)for(let[u,m]of c){let d=Wf(t.name,u,m);d&&l.appendChild(d)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let m=document.createElement("button");m.type="button",m.className="bloom-plugin-dialog-reset",m.textContent="Reset",m.addEventListener("click",()=>Yf(t)),u.appendChild(m),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),Xf(),Wo()}function Jf(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=zf(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=Ql(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=$f(l),c.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let f=tc(t.name);He("pluginStar",{name:t.name,starred:f})}),s.appendChild(c),!t.required){let b=Zl(t.name),f=document.createElement("button");f.type="button",f.className=`bloom-icon-btn bloom-card-pin${b?" bloom-card-pin-active":""}`,f.setAttribute("aria-label",b?"Unpin from top":"Pin to top"),f.innerHTML=qf(b),f.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();let A=Jl(t.name);He("pluginPin",{name:t.name,pinned:A})}),s.appendChild(f)}if(Kf(t)){let b=document.createElement("button");b.type="button",b.className="bloom-icon-btn bloom-card-settings",b.setAttribute("aria-label",`${t.name} settings`),b.innerHTML=_f(),b.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),Ac(t)}),s.appendChild(b)}let u=Mc(t.name,bn(t.name),!!t.required),m=u.querySelector("input");if(m?.addEventListener("click",b=>b.stopPropagation()),m?.addEventListener("change",()=>{oc(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let b=document.createElement("div");b.className="bloom-card-desc",b.textContent=t.description,n.appendChild(b)}let d=document.createElement("div");d.className="bloom-card-separator";let p=document.createElement("div");p.className="bloom-card-footer";let g=document.createElement("div");return g.className="bloom-card-author",g.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",p.appendChild(g),e.append(n,d,p),e}function Hc(){return Object.values(Xt).filter(t=>!t.hidden&&t.name!=="Settings")}function Qf(t){return t.updatedAt!=null&&Date.now()-t.updatedAt<Bf}function Ic(t,e){if(e==="all"||e==="favorites")return!0;if(e==="recent")return Qf(t);let n=(t.tags??[]).map(r=>r==="sidebar"?"ui":r);return e==="other"?!t.required&&!n.some(r=>Of.has(r)):n.includes(e)}function tp(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function ep(){return Zo.trim()?"No plugins match your search.":Ct==="favorites"?"No favorites yet. Star a plugin to see it here.":Ct==="recent"?"No plugins updated in the last 7 days.":"No plugins available."}function np(){let t=Hc();return Pf.filter(e=>e.id==="favorites"||e.id==="all"||e.id==="recent"?!0:t.some(n=>Ic(n,e.id)))}function rp(){if(hr){hr.replaceChildren();for(let t of np()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${Ct===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{Ct=t.id,Re()}),hr.appendChild(e)}}}function op(){let t=Hc();if(Ct==="favorites"){let e=new Set(To());t=t.filter(n=>e.has(n.name))}else Ct!=="all"&&(t=t.filter(e=>Ic(e,Ct)));return xr==="enabled"&&(t=t.filter(e=>bn(e.name))),xr==="disabled"&&(t=t.filter(e=>!bn(e.name))),t}function Re(){if(!gr)return;rp();let t=op();Ko&&(Ko.placeholder=`Search ${t.length} plugins...`);let e=t,n=Zo.trim().toLowerCase();if(n&&(e=e.filter(r=>tp(r).includes(n))),Ct==="recent")e=e.slice().sort((r,o)=>(o.updatedAt??0)-(r.updatedAt??0)||r.name.localeCompare(o.name));else if(Ct!=="favorites"){let r=Lo();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}gr.replaceChildren();for(let r of e)gr.appendChild(Jf(r));br&&(br.hidden=e.length>0,br.textContent=ep())}function me(t){t.stopPropagation()}function _a(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function ja(){document.getElementById(At)?.setAttribute("aria-expanded",fe?"true":"false")}function ip(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function Ga(){Sn(),Zo="",xr="all",Ct="all",document.getElementById(Pe)?.remove(),fe=!1,ja()}function ap(t){let e=document.createElement("div");e.id=t,e.setAttribute("aria-labelledby","bloom-settings-title"),e.addEventListener("pointerdown",me),e.addEventListener("pointerup",me),e.addEventListener("click",me);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=Jo();let a=document.createElement("span");a.className="bloom-settings-title-row";let s=document.createElement("h2");s.id="bloom-settings-title",s.textContent="Bloom++";let l="Toggle features. Some need a reload. Click the sliders icon to configure.",c=document.createElement("button");c.type="button",c.className="bloom-info-hint",c.setAttribute("aria-label",l),c.innerHTML=Df();let u=document.createElement("span");u.className="bloom-info-hint-tip",u.setAttribute("role","tooltip"),u.textContent=l,c.appendChild(u),a.append(s,c),o.append(i,a);let m=document.createElement("button");m.type="button",m.className="bloom-icon-btn bloom-settings-close",m.setAttribute("aria-label","Close"),m.innerHTML=Sc(),m.addEventListener("click",Ga),r.appendChild(o),n.appendChild(r);let d=document.createElement("div");d.className="bloom-plugin-tabs",n.appendChild(d);let p=document.createElement("div");p.className="bloom-search-bar";let g=document.createElement("input");g.type="search",g.className="bloom-search-input",g.setAttribute("aria-label","Search plugins"),g.placeholder="Search plugins...",g.addEventListener("input",()=>{Zo=g.value,Re()});let b=document.createElement("select");b.className="bloom-search-filter",b.setAttribute("aria-label","Filter plugins");for(let A of Rf){let I=document.createElement("option");I.value=A.value,I.textContent=A.label,b.appendChild(I)}b.value=xr,b.addEventListener("change",()=>{xr=b.value,Re()}),p.append(g,b),n.appendChild(p);let f=document.createElement("div");f.className="bloom-plugin-list",n.appendChild(f);let T=document.createElement("p");return T.className="bloom-tab-empty",T.hidden=!0,n.appendChild(T),e.append(m,n),gr=f,br=T,Ko=g,wc=b,hr=d,Re(),e}function sp(t){t.classList.add("bloom-rail-dock")}function lp(){let t=document.getElementById(At);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&Po(t)?t:null}function cp(){if(document.getElementById(Pe)?.remove(),!document.body)return;let t=ap(Pe);sp(t),document.body.appendChild(t),fe=!0,Sn(),Wo(),ja(),He("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:st,dock:"center",rail:!!lp()})}function Ua(){let t=document.getElementById(Pe);if(t instanceof HTMLElement&&t.isConnected&&ip(t)){Ga();return}t?.remove(),cp()}function up(){let t=document.createElement("button");return t.type="button",t.id=At,t.className="bloom-rail-item",t.setAttribute("aria-controls",Pe),t.setAttribute("aria-expanded",fe?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${Jo()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Ua()}),t}function xc(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function dp(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function mp(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function ue(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function Nc(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=dp(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&ue(t,"padding-top",Math.round(i)),Number.isFinite(a)&&ue(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));ue(n,"width",l),ue(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&ue(t,"padding-left",u);let m=mp(e,r);if(m){let d=m.getBoundingClientRect(),p=n.getBoundingClientRect(),g=Math.round(d.left-p.right);g>=0&&g<=24&&ue(t,"gap",g)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&ue(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&ue(t,"gap",Math.round(l))}Lc(t)}function qa(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function fp(){if(yr?.isConnected&&Zt){Zt.observe(yr,{childList:!0});return}Fa()}function pp(t){if(qa(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function gp(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){pr=0;return}pr+=1,vr=Date.now()+Math.min(8e3,250*2**Math.min(pr,5))})}function bp(){wn||Date.now()<vr||(wn=requestAnimationFrame(()=>{wn=0,!(Date.now()<vr)&&(document.getElementById(At)?.isConnected||Yo())}))}function Yo(){if(!document.body)return;Zt?.disconnect();let t=null,e=!1;try{let n=document.getElementById(At);t=n instanceof HTMLButtonElement?n:up();let r=Ne(),o=xn();if(r){let i=Na(r),a=i.parentElement;if(qa(i)||a&&qa(a))return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),xc(t),Nc(t,r)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),xc(t,!0)):t.isConnected&&!Po(t)&&(t.remove(),t=null)}finally{gp(t,e),fp(),ja()}}function Fa(){let t=Oo();!t||!pp(t)||yr===t&&Zt||(Zt?.disconnect(),yr=t,Zt=new MutationObserver(()=>{document.getElementById(At)?.isConnected||bp()}),Zt.observe(t,{childList:!0}))}function hp(){Yo(),Fa(),fr===void 0&&(fr=window.setInterval(()=>{let t=document.getElementById(At);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=vr&&Yo();else{pr=0;let e=Ne();e&&Nc(t,e)}Fa()},If))}function yp(){fr!==void 0&&(clearInterval(fr),fr=void 0),wn&&cancelAnimationFrame(wn),wn=0,vr=0,pr=0,Zt?.disconnect(),Zt=null,yr=null}function vp(t){Fo===t&&de||(de?.disconnect(),Fo=t,de=new MutationObserver(()=>{if(!t.isConnected){de?.disconnect(),de=null,Fo=null;return}Rc(t)}),de.observe(t,{childList:!0}))}function Rc(t){if(vp(t),t.querySelector(`#${jo}`))return;let e=document.createElement("button");e.type="button",e.id=jo,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${Jo()}<span>Bloom++</span>`,e.addEventListener("pointerdown",_a),e.addEventListener("pointerup",_a),e.addEventListener("click",n=>{_a(n),Ua()}),t.insertBefore(e,t.firstChild)}function qo(){let t=En();return t?(Rc(t),!0):!1}function xp(t){Bo(t)&&(queueMicrotask(qo),requestAnimationFrame(()=>{qo()}),window.setTimeout(qo,60),window.setTimeout(qo,180))}function Ep(){Uo?.abort();let t=new AbortController;Uo=t,document.addEventListener("click",xp,{signal:t.signal})}function wp(){Uo?.abort(),Uo=null,de?.disconnect(),de=null,Fo=null}function Pc(){hn(),jf(()=>{kc(),Tc(),Yo(),Ua()})}var Oc=y({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[v.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${Hf}`,`#${At}`,`#${jo}`,`#${Pe}`,`#${Xo}`,`#${Er}`,`#${Go}`,"#bloom-menu-panel"],start(){kc(),Tc(),hp(),Ep(),$o?.(),$o=yc(Wo),Wo(),Ba=[pn("pluginToggle",()=>{fe&&Re()}),pn("pluginPin",()=>{fe&&Re()}),pn("pluginStar",()=>{fe&&Re()})]},stop(){yp(),wp(),$o?.(),$o=null;for(let t of Ba)t();Ba=[],Ga(),document.getElementById(At)?.remove(),document.getElementById(jo)?.remove(),document.getElementById(Go)?.remove(),Ec=null,Nf=null,gr=null,br=null,Ko=null,wc=null,hr=null,fe=!1}});var Qo='form[data-type="unified-composer"], form.w-full[data-type]',Ht=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Ln=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Bc=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Dc=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Sp=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Lp='[contenteditable="false"], button, [role="button"]';function yt(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function Oe(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!yt(o)))return o;return null}function _c(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function D(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=_c(t);return!!(Sp.test(n)||/^stop$/i.test(n))}function vt(){let e=Array.from(document.querySelectorAll(Qo)).find(yt);if(e instanceof HTMLElement)return e;let n=Oe(document,Ht),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function X(){let t=Array.from(document.querySelectorAll(Ht));return t.find(yt)??t[0]??null}function Tp(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(Lp);return!!n&&n!==e&&e.contains(n)}function Ka(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&Tp(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function It(t){let e=t??X();return e?Ka(e,e).replaceAll("\u200B","").trim().length>0:!1}function pe(t){return!It(t)}function ti(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function $c(t){let e=vt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!yt(n))&&t(n))return n;return null}function ge(){let t=vt(),e=Oe(t,Ln)??Oe(document,Ln);return e&&!D(e)?e:$c(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!D(n);let o=_c(n);return/^(send|send prompt|发送)$/i.test(o)&&!D(n)})}function Be(){let t=vt(),e=Oe(t,Bc,!0)??Oe(document,Bc,!0);if(e)return e;let n=Oe(t,Dc)??Oe(document,Dc);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&yt(r)&&D(r))return r}return $c(D)}function Nt(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>Ka(n,t)).join(`
`):Ka(t,t)}function Va(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function Jt(t,e,n=!1){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),Va(t,n)}var qc=/\/c\/([a-zA-Z0-9_-]{8,})/i;function xt(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function Qt(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function te(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(qc)?.[1]??""}catch{return t.match(qc)?.[1]??""}}function C(){return te(location.pathname)}var Gc=new S("Harvest"),kp=1500,Mp=200,ei=new Set,ni=new Map,ri=new Map,Tn=null,oi=null,wr=null,Rt=0;function Cp(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Ap(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function Hp(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}function Uc(t){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(t)}var Ip=/"action"\s*:\s*"(next|continue|variant)"/i;function Np(t,e,n){return!(e!=="POST"||Uc(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!Ip.test(n))}function Rp(t,e){return e!=="GET"||Uc(t)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(t)}function Fc(t){return t.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function Kc(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function Pp(t){return typeof t=="string"?Kc(t):""}function Wa(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return Wa(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function Vc(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function zc(t,e,n){!t||!e||ri.get(t)!==e&&(ri.set(t,e),Vc(ri,kp),be({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function Op(t,e){let n=e.trim();!t||!n||ni.get(t)!==n&&(ni.set(t,n),Vc(ni,Mp),be({type:"conversation-meta",conversationId:t,title:n}))}function Sr(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)Sr(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&Op(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=Wa(l.create_time??l.createTime??l.created_at);c&&u&&zc(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=Wa(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&zc(a,s,o),r.mapping&&typeof r.mapping=="object")Sr(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&Sr(l,o,n+1)}function jc(t,e){if(t)try{Sr(JSON.parse(t),e)}catch{}}function be(t){for(let e of Array.from(ei))try{e(t)}catch{}}async function Bp(t,e,n){if(n===Rt)try{let r=await t.json();if(n!==Rt)return;Sr(r,e)}catch{}}async function Dp(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===Rt&&be({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===Rt;){let{done:u,value:m}=await s.read();if(u)break;if(c+=l.decode(m,{stream:!0}),!o){let p=Kc(c);p&&(o=p,be({type:"post-start",conversationId:o,url:""}))}let d=c.split(`
`);c=d.pop()??"";for(let p of d){let g=p.replace(/^data:\s*/,"").trim();!g||g==="[DONE]"||jc(g,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===Rt&&jc(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===Rt&&be({type:"post-end",conversationId:o,error:i})}function _p(t,e,n){let r=Ap(e),o=Hp(e,n),i=Rp(r,o),a=Np(r,o,n?.body),s=Rt,l="";return a&&(l=Pp(n?.body)||Fc(r)||te(r)||C(),be({type:"post-start",conversationId:l,url:r})),t(e,n).then(c=>{if(s!==Rt||!i&&!a)return c;try{let u=c.clone();i?Bp(u,Fc(r)||C(),s):Dp(u,l,!c.ok,s)}catch{a&&be({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===Rt&&be({type:"post-end",conversationId:l,error:!0}),c})}function $p(){if(Tn)return;let t=Cp();wr=t,Tn=t.fetch.bind(t);let e=(n,r)=>_p(Tn,n,r);oi=e,t.fetch=e,Gc.debug("conversation fetch harvest hooked")}function qp(){Rt+=1,!(!Tn||!wr)&&(oi&&wr.fetch===oi&&(wr.fetch=Tn),Tn=null,oi=null,wr=null,Gc.debug("conversation fetch harvest unhooked"))}function lt(t){return ei.add(t),$p(),()=>{ei.delete(t),ei.size===0&&qp()}}function kn(t){return t?ni.get(t)??"":""}function ii(t){return t?ri.get(t)??null:null}var Yc=new S("Streaming");function Cr(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!yt(e))&&(D(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function Fp(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&yt(t))}function zp(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&yt(t))}function jp(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Ot(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function Q(){if(Be()||Cr()||jp())return!0;let t=ge();return t&&yt(t)&&!D(t)?!1:!!(Fp()||zp())}var Gp=400,Wc=3,qe=new Set,Lr,Tr=null,Ya=null,_e=!1,De=0,ye="",ve="",xe=!1,kr=!1,Mr=!1,Pt=!1,j=null,ct="",$e=!1;function Z(){return Pt}function li(){return xe}function Mn(){return ct}function Xa(){return C()||ct}function Xc(){return Qt(xt())}function ai(t,e){return{streaming:t,contextKey:e,conversationId:Xa()}}function Za(t){try{let e=t.split("|")[0]||"";return new URL(e).pathname.replace(/\/$/,"")||"/"}catch{return""}}function Up(t){return!t||t==="/"||t.startsWith("/g/")}function $(t,e){if(!t||t===e)return!1;let n=te(Za(e)||e);return!n||!(t.endsWith("|draft")||Up(Za(t)))?!1:ct?n===ct:$e}function si(){_e=!1,De=0,ye="",xe=!1,kr=!1,Mr=!1,ct="",$e=!1}function Kp(t){for(let e of Array.from(qe))try{e.onFall?.(t)}catch{}}function Vp(t){for(let e of Array.from(qe))try{e.onRise?.(t)}catch{}}function he(t){for(let e of Array.from(qe))try{e.onTick?.(t)}catch{}}function Wp(t,e){for(let n of Array.from(qe))try{n.onContext?.(t,e)}catch{}}function Yp(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&D(n)&&(xe=!0)}function Xp(t){if(t.type==="post-start"){let n=C();if(!t.conversationId){n||($e=!0),(!n||n===ct)&&(Pt=!1,xe=!1);return}if(!(t.conversationId===n||t.conversationId===ct)&&!(!n&&$e))return;ct=t.conversationId,$e=!1,Pt=!1,xe=!1;return}if(t.type!=="post-end"||!_e&&!j)return;let e=C();t.conversationId&&!(e?t.conversationId===e:t.conversationId===ct)||(Mr=!0,t.error&&(kr=!0,j&&(j.error=!0)))}function Zp(){let t=Xc(),e=Q();if(ve&&t&&ve!==t){let o=ve;if(!$(o,t))j=null,si(),Pt=e;else{let i=te(Za(t));if(i&&!ct&&(ct=i,$e=!1),ye===o&&(ye=t),j&&j.contextKey===o){j.contextKey=t;let a=Xa();a&&(j.conversationId=a)}Pt=!1}if(ve=t,Wp(t,o),Pt){he(ai(!1,t));return}}else t&&(ve=t);if(Pt){if(e){he(ai(!1,t));return}Pt=!1}if(j)if(e||j.contextKey!==t)j=null;else{let o=j;j=null,si(),Kp(o),he(ai(!1,t));return}let n=ai(e,t);if(e){let o=!_e;o&&(xe=!1,kr=!1,Mr=!1),_e=!0,De=0,ye=t,o&&Vp(n),he(n);return}if(!_e){he(n);return}if(De+=1,Mr&&(De=Math.max(De,Wc)),De<Wc){he(n);return}if(!(!!ye&&ye===t)){si(),he(n);return}j={contextKey:ye||t,conversationId:Xa(),userStopped:xe,error:kr||Ot()},he(n)}function Jp(){Lr===void 0&&(_e=Q(),ve=Xc(),ye=_e?ve:"",De=0,xe=!1,kr=!1,Mr=!1,Pt=!1,j=null,ct="",$e=!1,Tr?.abort(),Tr=new AbortController,document.addEventListener("click",Yp,{capture:!0,signal:Tr.signal}),Ya=lt(Xp),Lr=setInterval(Zp,Gp),Yc.debug("watchStreamingEdge started"))}function Qp(){qe.size||(Lr!==void 0&&(clearInterval(Lr),Lr=void 0),Tr?.abort(),Tr=null,Ya?.(),Ya=null,si(),ve="",Pt=!1,j=null,Yc.debug("watchStreamingEdge stopped"))}function tt(t){let e=typeof t=="function"?{onFall:t}:t;return qe.add(e),Jp(),()=>{qe.delete(e),Qp()}}var Zc="bloom-host-icon",Ar="data-bloom-host-rel",Ja="not all",Qa=0,Jc=0,tg=400;function Qc(t){Qa+=1;try{t()}finally{Qa-=1}}function ci(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function Ee(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function tu(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function eg(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function ng(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-Jc<tg||(Jc=n,t.appendChild(e))}function rg(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||ci(n)&&(n.getAttribute(Ar)||n.setAttribute(Ar,n.rel),n.media!==Ja&&(n.media=Ja),n.rel!==Zc&&(n.rel=Zc))}function og(t){for(let e of t.querySelectorAll(`link[${Ar}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(Ar);n&&(e.rel=n),e.removeAttribute(Ar),e.media===Ja&&e.removeAttribute("media")}}function eu(t,e){let{head:n}=document;!n||!e||Qc(()=>{rg(n,t);let r=tu(t),{type:o,sizes:i}=eg(e);r?ng(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function nu(t,e){let{head:n}=document;n&&Qc(()=>{tu(t)?.remove(),og(n)})}function ru(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(Qa)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:ci(c.target)&&(a=!0,Ee(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)ci(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)ci(u)&&u.id!==t&&(a=!0,Ee(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var ig=["original","badge","dot","hole","bg"],au=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],su={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},ui="#FCFCFC",ag="#111111",ou="#111111",sg="#ffffff",lg="#212121",cg="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",ug={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},di=32,iu=64;function lu(t){return typeof t=="string"&&ig.includes(t)}function dg(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function mi(t){let e=document.createElement("canvas");e.width=di,e.height=di;let n=e.getContext("2d");return n?(n.scale(di/iu,di/iu),t(n),e.toDataURL("image/png")):""}function mg(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function fi(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(cg);n&&(t.strokeStyle=ag,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function fg(t,e,n){let r=su[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=ou,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=ou,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=sg,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function Hr(t,e){if(t==="original")return e==="wait"?mi(r=>fi(r,ui)):dg(ug[e]);let n=e==="wait"?void 0:su[e];return mi(t==="hole"?r=>fi(r,n??ui):t==="bg"?r=>{r.fillStyle=n??lg,mg(r,0,0,64,64,14),r.fill(),fi(r,ui,!1)}:r=>{fi(r,ui),e!=="wait"&&fg(r,e,t==="dot"?"dot":"badge")})}function cu(t){return{wait:Hr(t,"wait"),rotate:Hr(t,"rotate"),done:Hr(t,"done"),ready:Hr(t,"ready"),error:Hr(t,"error")}}var pg=new S("ChatStateFavicons"),ze="bloom-chat-state-favicon",pu=["input","beforeinput","cut","paste","compositionend"],gu=L({style:{type:3,description:"Favicon overlay",options:au}}),Bt="",ns={wait:"",rotate:"",done:"",ready:"",error:""},Ir="wait",et=!1,G=!1,N=null,rt="",ut="",Ge=!0,bi=!1,Cn=null,dt=0,pi=null,gi=null,Fe=null,es=null,An=null,Et=!1,uu=new WeakSet;function gg(){let t=gu.store.style;return lu(t)?t:"bg"}function bu(){let e=document.querySelector(`link[rel~="icon"]:not(#${ze}), link[data-bloom-host-rel]:not(#${ze})`)?.href;return Ee(e)?e:Ee(Bt)?Bt:""}function bg(){let t=document.getElementById(ze);return t instanceof HTMLLinkElement?t:null}function hg(){if(!Ee(Bt)){let t=bu();t&&(Bt=t)}return Ee(Bt)?Bt:ns.wait}function hu(t){return t==="wait"?hg():ns[t]}function yu(){eu(ze,hu(Ir))}function O(t){let e=hu(t);if(Ir===t){let n=bg();if(n&&n.getAttribute("href")===e)return}Ir=t,yu()}function du(){ns=cu(gg()),O(Ir)}function rs(){return Qt(xt())}function os(t,e){!t||!e||t===e||(N===t&&(N=e),rt===t&&(rt=e),ut===t&&(ut=e))}function yg(){let t=rs();if(!(Q()||et||G))return rt="",t;if(rt&&t&&rt!==t)if($(rt,t))os(rt,t),rt=t;else return rt="",t;else!rt&&t&&(rt=t);return rt||t}function mu(t){return!N||!t?!1:N===t?!0:$(N,t)}function vu(){et=!1,G=!1,N=null,rt=""}function xu(t){ut=t,vu(),Ge=!1,bi=!0,O("wait")}function ts(t){return!t&&Ge}function vg(){if(!Et)return;let t=rs();if(ut&&t&&ut!==t&&!$(ut,t)){xu(t);return}ut&&t&&$(ut,t)&&os(ut,t),t&&(ut=t);let e=Q(),n=e&&!Z();if(bi){if(Z()){O("wait");return}bi=!1}if(Z()){O("wait");return}let r=yg(),o=pe();if(li()&&!e){et=!1,G=!1,N=null,O(o?"wait":ts(o)?"ready":"wait");return}if(Ot()&&!e&&et){O("error"),et=!1,G=!1,N=null;return}if(n){et||(Ge=!1),et=!0,G=!1,N=r,O("rotate");return}if(et)if(!mu(t))et=!1,G=!1,N=null;else if(G){et=!1,G=!0,N=t||r,O("done");return}else{O("rotate");return}if(G)if(N&&t&&!mu(t))G=!1,N=null;else if(o){N=r||N,O("done");return}else if(ts(o)){G=!1,O("ready");return}else{G=!1,O("wait");return}N=null,o?O("wait"):ts(o)?O("ready"):O("wait")}function je(){Et&&(Tu(),wu(),Su(),vg())}function Eu(){if(An){for(let t of pu)An.removeEventListener(t,Lu,!0);An=null}}function wu(){let t=vt(),e=t&&t!==document.body?t:null;if(!(An===e&&e?.isConnected)&&(Eu(),!!e)){An=e;for(let n of pu)An.addEventListener(n,Lu,{capture:!0,passive:!0})}}function Su(){let t=vt();if(!(Fe&&es===t&&t.isConnected)){if(Fe?.disconnect(),es=t,!t||t===document.body){Fe=null;return}Fe=new MutationObserver(()=>hi()),Fe.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function hi(){if(Et){if(document.hidden){dt&&(cancelAnimationFrame(dt),dt=0),je();return}dt||(dt=requestAnimationFrame(()=>{dt=0,Et&&je()}))}}function Lu(){It()&&(Ge=!0),hi()}function fu(){It()&&(Ge=!0),hi()}function xg(){Et&&(dt&&(cancelAnimationFrame(dt),dt=0),je())}function Eg(){Et&&(Ge=!1,je())}function wg(t){if(!Et)return;if(t.userStopped){et=!1,G=!1,N=null,O("wait");return}if(t.error){et=!1,G=!1,N=null,O("error");return}let e=rs();if(t.contextKey&&e&&t.contextKey!==e&&!$(t.contextKey,e)){et=!1,G=!1,N=null,O("wait");return}et=!1,G=!0,N=e||t.contextKey,O("done")}function Sg(){Et&&je()}function Lg(t,e){if(Et){if($(e,t)){os(e,t),ut=t,je();return}xu(t)}}function Tu(){let t=X();!t||uu.has(t)||(uu.add(t),t.addEventListener("input",fu,{capture:!0,passive:!0}),t.addEventListener("compositionend",fu,{capture:!0,passive:!0}))}var ku=y({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:gu,startAt:"DOMContentLoaded",cleanupSelectors:[`#${ze}`],start(){Et=!0,Bt=bu()||Bt,du(),gi?.disconnect(),gi=ru(ze,t=>{Ee(t)&&(Bt=t),yu()}),Cn?.abort(),Cn=new AbortController,window.addEventListener("popstate",hi,{signal:Cn.signal}),document.addEventListener("visibilitychange",xg,{signal:Cn.signal}),Tu(),wu(),Su(),pi?.(),pi=tt({onRise:Eg,onFall:wg,onTick:Sg,onContext:Lg}),je(),pg.debug("favicon watch started")},stop(){Et=!1,dt&&cancelAnimationFrame(dt),dt=0,pi?.(),pi=null,Cn?.abort(),Cn=null,Eu(),Fe?.disconnect(),Fe=null,es=null,gi?.disconnect(),gi=null,vu(),ut="",Ge=!0,bi=!1,Ir="wait",nu(ze,Bt)},onSettingsChange:du});var Mu=`.bloom-ih-hud {
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
`;var qx=new S("InputHistory"),is=/\u200B/g,Cu=10,Au=500,Hu=100,kg=8,Mg=120,Cg=2e3,yi=10,vi=L({maxEntries:{type:4,description:"Max stored prompts",min:Cu,max:Au,default:Hu},history:{type:5,description:"Stored prompts",render:jg},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),as=new Map,U=0,ss="",Dt=!1,Rr=!1,us=0,Nr=null,ls,ds=null,Iu=!0;function wt(){let t=vi.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Nu(t){let e=Y(Number(vi.store.maxEntries??Hu),Cu,Au);return t.length>e?t.slice(t.length-e):t}function xi(t){vi.store.entries=Nu(t)}function Ag(t){return t.replaceAll(is,"").replace(/\n$/,"").trim()}function cs(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Ht);return n instanceof HTMLElement?n:X()}function Hg(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!Nt(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(is,"").trim().length===0,last:i.toString().replaceAll(is,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Ru(t){clearTimeout(ls),ls=setTimeout(()=>{if(t!==us)return;Rr=!1;let e=ds;e&&Va(e,Iu)},Mg)}function Pu(t,e,n){Rr=!0,ds=t,Iu=n;let r=++us;Jt(t,e,n),Ru(r)}function Ig(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function Hn(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Ng(){document.querySelector(".bloom-ih-hud")?.remove()}function Rg(t,e){let n=Ig();n.textContent=t;let r=(e.closest("form")??vt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-kg)}px`,n.classList.add("bloom-ih-hud-on")}function ms(t){let e=Ag(t);if(!e)return;let n=Date.now(),r=as.get(e);if(r&&n-r<Cg)return;as.set(e,n);let o=wt().filter(i=>i!==e);o.push(e),xi(o),U=wt().length,Dt=!1,Hn()}function Pg(t,e){let n=wt();if(!n.length&&t)return;U>=n.length&&(ss=Nt(e),U=n.length);let r=t?U-1:U+1;r<0||r>n.length||(U=r,Dt=!0,Pu(e,r===n.length?ss:n[r],t),r<n.length?Rg(`${r+1} / ${n.length}`,e):Hn())}function Og(t){Dt=!1,Hn(),Pu(t,ss,!1),U=wt().length}function Bg(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=cs(t.target)??cs(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&Dt&&!t.altKey&&!t.shiftKey){Og(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){ms(Nt(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=wt();if(!r){let i=Hg(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||U<=0)||!n&&U>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),Pg(n,e))}function Dg(t){if(cs(t.target)){if(Rr){Ru(us);return}Dt&&(Dt=!1,Hn(),U=wt().length)}}function _g(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(Ht);n instanceof HTMLElement&&ms(Nt(n))}function $g(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(Ln);if(!n||!(n instanceof HTMLElement)||D(n))return;let r=X();r&&ms(Nt(r))}function qg(t){if(!(!Dt||Rr)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}Dt=!1,Hn()}}function Fg(){if(Nr)return;Nr=new AbortController;let{signal:t}=Nr,e={capture:!0,signal:t};window.addEventListener("keydown",Bg,e),window.addEventListener("input",Dg,e),window.addEventListener("submit",_g,e),window.addEventListener("click",$g,e),window.addEventListener("pointerdown",qg,e)}function zg(t){let e=wt().slice();e.splice(t,1),xi(e),U>e.length&&(U=e.length)}function jg(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=wt().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(f=>f.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/yi));n>=l&&(n=l-1);let c=s.slice(n*yi,n*yi+yi);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let f=document.createElement("div");f.className="bloom-ih-list",c.forEach((T,A)=>{let I=i.indexOf(T),Wt=wt().length-1-I,Mt=document.createElement("div");Mt.className="bloom-ih-item";let nt=document.createElement("button");nt.type="button",nt.className=`bloom-ih-body${r===A?"":" bloom-ih-clamp"}`,nt.textContent=T,nt.addEventListener("click",()=>{r=r===A?-1:A,o()});let R=document.createElement("div");R.className="bloom-ih-actions";let at=document.createElement("button");at.type="button",at.title="Copy",at.textContent="C",at.addEventListener("click",()=>{Kl(T)});let Yt=document.createElement("button");Yt.type="button",Yt.title="Delete",Yt.textContent="\xD7",Yt.addEventListener("click",()=>{zg(Wt),o()}),R.append(at,Yt),Mt.append(nt,R),f.appendChild(Mt)}),t.appendChild(f)}else{let f=document.createElement("p");f.className="bloom-ih-empty",f.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(f)}let m=document.createElement("div");m.className="bloom-ih-pager";let d=document.createElement("button");d.type="button",d.className="bloom-ih-btn",d.textContent="Prev",d.disabled=n<=0,d.addEventListener("click",()=>{n-=1,o()});let p=document.createElement("span");p.textContent=`${n+1} / ${l}`;let g=document.createElement("button");g.type="button",g.className="bloom-ih-btn",g.textContent="Next",g.disabled=n+1>=l,g.addEventListener("click",()=>{n+=1,o()});let b=document.createElement("button");b.type="button",b.className="bloom-ih-clear",b.textContent="Clear all",b.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(xi([]),U=0,o())}),m.append(d,p,g,b),t.appendChild(m)};return o(),()=>{t.replaceChildren()}}var Ou=y({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:vi,startAt:"HostReady",managedStyle:"inputHistory",start(){w("inputHistory",Mu),U=wt().length,Dt=!1,Fg()},stop(){Nr?.abort(),Nr=null,Hn(),Ng(),as.clear(),clearTimeout(ls),Rr=!1,ds=null,Dt=!1},onSettingsChange(){let t=wt(),e=Nu(t);e.length!==t.length&&xi(e),U>e.length&&(U=e.length)}});var fs="noShareLink",Gg=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],Ug=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],ps=L({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Bu(t){return`${t.join(",")}{display:none!important}`}function Du(){let t=[];if(ps.store.hideShareChat!==!1&&t.push(Bu(Gg)),ps.store.hideShareProject!==!1&&t.push(Bu(Ug)),!t.length){E(fs);return}w(fs,t.join(`
`))}var _u=y({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:ps,start:Du,onSettingsChange:Du,stop(){E(fs)}});var Fu="noDictation",Kg=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],Vg=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],zu=L({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function $u(t){return`${t.join(",")}{display:none!important}`}function qu(){let t=[$u(Kg)];zu.store.hideDictationSettings!==!1&&t.push($u(Vg)),w(Fu,t.join(`
`))}var ju=y({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:zu,start:qu,onSettingsChange:qu,stop(){E(Fu)}});var gs="noSidebarIdentity",In=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Ku=In.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),Vu=In.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),Wg=[...Ku,...Vu],Yg=[...Ku,...In.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],Xg=In.map(t=>`${t} a[href^="mailto:"]`),Zg=In.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),Jg=In.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),Pr=L({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function Gu(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Qg(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function tb(){return`${Jg.join(",")}{margin-block:auto!important}`}function eb(){return`${Zg.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function Uu(){let t=Pr.store.hideUsername!==!1,e=Pr.store.hideEmail!==!1,n=t&&Pr.store.enlargePlan!==!1,r=t&&Pr.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(Qg([...Yg,...Vu])),o.push(tb())):o.push(Gu(Wg))),e&&o.push(Gu(Xg)),n&&o.push(eb()),!o.length){E(gs);return}w(gs,o.join(`
`))}var Wu=y({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Pr,start:Uu,onSettingsChange:Uu,stop(){E(gs)}});var Yu=`#bloom-rt-host {
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
`;var Ju=new S("RecentTopics"),Pn="bloom-rt-host",Qu="home",td=/^\/c\/([a-z0-9_-]{8,})/i,rb=/\/c\/([a-z0-9_-]{8,})/i,ed=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,ob=new Set(["Backquote","IntlBackslash"]),ib=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),ab=140,sb=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),K=L({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:sb},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),Ei=null,wi=null,ot=!1,qr=!1,Or=!1,_t=0,Ue="",Nn=null,Br=null,Rn,bs=null,hs=null;function lb(){let t=Number(K.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function Dr(){let t=K.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function vs(){let t=K.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function nd(){let t=K.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function xs(){let t=K.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Li(t){let e=lb();return t.length>e?t.slice(0,e):t}function $t(t){return t===Qu}function _r(t,e=ab){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function Es(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(td)?.[1]??""}catch{return t.match(rb)?.[1]??""}}function Ke(){let t=(location.pathname||"/").match(td);if(t?.[1])return t[1];let n=xt().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return Qu}function ws(t){if($t(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(Es(r.getAttribute("href")||"")!==t)continue;let o=_r(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return Ke()===t&&e&&!/^ChatGPT$/i.test(e)?_r(e,80):""}function cb(t){if($t(t))return"New chat";let e=vs()[t];if(e)return e;let n=kn(t);return n||ws(t)||"Chat"}function ub(t){return xs()[t]||""}function db(t){return nd()[t]||{}}function Ss(t,e){if(!t||$t(t)||!e||/^new chat$/i.test(e.trim()))return;let n=vs();n[t]!==e&&(n[t]=e,K.store.titles=n)}function mb(t){t.type==="conversation-meta"&&(Ss(t.conversationId,t.title),ot&&On())}function fb(t,e){if(!t||$t(t)||!e)return;let n=xs();n[t]!==e&&(n[t]=e,K.store.projects=n)}function pb(t,e){if(!t||$t(t)||!e.user&&!e.assistant)return;let n=nd(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,K.store.previews=n)}function Ls(t){if(!t||$t(t)&&K.store.includeHome===!1)return;let e=Dr().filter(n=>n!==t);e.unshift(t),K.store.visits=Li(e)}function Ti(){let t=K.store.includeHome!==!1;return Li(Dr().filter(n=>t||!$t(n))).map(n=>({id:n,title:cb(n),project:ub(n),preview:db(n)}))}function Xu(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return _r(o)}catch{return""}}function $r(t){if(!t||$t(t)||t!==Ke())return;let e=ws(t);e&&Ss(t,e);let n=Xu("user"),r=Xu("assistant");pb(t,{user:n,assistant:r});let o=od(t);if(o){let i=rd(o);i&&fb(t,i)}}function Ts(){let t=vs(),e=xs(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${Pn}, #bloom-root, #bloom-sidebar-panel`))continue;let u=Es(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let m=_r(c.textContent||"",80);m&&!ed.test(m)&&t[u]!==m&&(t[u]=m,o=!0);let d=rd(c);d&&e[u]!==d&&(e[u]=d,i=!0)}}catch{}o&&(K.store.titles=t),i&&(K.store.projects=e);let a=Dr(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(K.store.visits=Li([...a,...l]))}function rd(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=_r((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!ed.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function od(t){if($t(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(Es(e.getAttribute("href")||"")===t)return e}catch{}return null}function gb(t){let e=od(t);if(e){e.click();return}if($t(t)){location.assign("/");return}location.assign(`/c/${t}`)}function bb(){let t=Ke();Ue&&Ue!==t&&$r(Ue),Ue=t,Ls(t),Ts();let e=ws(t);e&&Ss(t,e),$r(t)}function Si(){Rn===void 0&&(Rn=window.setTimeout(()=>{Rn=void 0,bb()},120))}function hb(){Nn||(Nn=history.pushState.bind(history),Br=history.replaceState.bind(history),history.pushState=function(...e){let n=Nn(...e);return Si(),n},history.replaceState=function(...e){let n=Br(...e);return Si(),n})}function yb(){Nn&&(history.pushState=Nn),Br&&(history.replaceState=Br),Nn=null,Br=null}function vb(t){return ob.has(t.code)||t.keyCode===192?!0:ib.has(t.key)}function id(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function xb(t,e){qr=e,Ts(),$r(Ke()),ot=!0,_t=0;try{let n=Ke();Ls(n);let r=Ti();r.length>1&&(_t=t?r.length-1:1)}catch(n){Ju.error("Failed to open switcher:",n)}On()}function Zu(t){let{length:e}=Ti();e&&(_t=(_t+(t?-1:1)+e)%e,On())}function ks(){if(!ot)return;let t=Ti()[_t];ot=!1,qr=!1,On(),t&&gb(t.id)}function ad(){ot&&(ot=!1,qr=!1,On())}function Eb(t){if(id(t)){Or=!0;return}if((t.ctrlKey||Or)&&!t.altKey&&!t.metaKey&&vb(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{ot?Zu(t.shiftKey):xb(t.shiftKey,!0)}catch(n){Ju.error("Hotkey failed:",n)}return}if(ot){if(t.key==="Escape"){t.preventDefault(),ad();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),ks();return}t.key==="Tab"&&(t.ctrlKey||Or)&&(t.preventDefault(),Zu(t.shiftKey))}}function wb(t){id(t)&&(Or=!1,ot&&qr&&ks())}function Sb(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(Si)}function Lb(t){!ot||(t.target instanceof Element?t.target:null)?.closest(`#${Pn}`)||ad()}function Tb(){document.visibilityState==="hidden"&&$r(Ke())}function ys(t=wi){t instanceof HTMLElement&&_o(t,Do("auto"),!0)}function kb(){if(!document.body)return null;let t=document.getElementById(Pn);if(t instanceof HTMLElement)return wi=t,ys(t),t;t=document.createElement("div"),t.id=Pn;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),wi=t,ys(t),t}function On(){let t=kb();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!ot){e.dataset.visible="false",e.replaceChildren();return}let n=Ti();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}_t>=n.length&&(_t=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===_t?"true":"false",s.setAttribute("aria-selected",a===_t?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{_t=a,ks()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function Mb(){document.getElementById(Pn)?.remove(),wi=null}var sd=y({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${Pn}`],settings:K,start(){w("recentTopics",Yu),Ue=Ke(),Ls(Ue),Ts(),$r(Ue),bs=lt(mb),hb(),Ei=new AbortController;let{signal:t}=Ei;window.addEventListener("keydown",Eb,{capture:!0,signal:t}),window.addEventListener("keyup",wb,{capture:!0,signal:t}),window.addEventListener("popstate",Si,{signal:t}),document.addEventListener("click",Sb,{capture:!0,signal:t}),document.addEventListener("click",Lb,{signal:t}),document.addEventListener("visibilitychange",Tb,{signal:t}),hs=pn("schemeChange",()=>ys())},stop(){Ei?.abort(),Ei=null,Rn!==void 0&&(clearTimeout(Rn),Rn=void 0),yb(),bs?.(),bs=null,hs?.(),hs=null,ot=!1,qr=!1,Or=!1,Mb()},onSettingsChange(){let t=Li(Dr());t.length!==Dr().length&&(K.store.visits=t),ot&&On()}});var Ms="cleaner",Cb=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],Ab=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],Hb=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],Ib=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],Nb=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],Rb=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],Ve=L({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function Bn(t){return`${t.join(",")}{display:none!important}`}function ld(){let t=[];if(Ve.store.hideDownloadApps!==!1&&t.push(Bn(Cb)),Ve.store.hideDisclaimer!==!1&&t.push(Bn(Ab)),Ve.store.hideUpgrade!==!1&&t.push(Bn(Hb)),Ve.store.hideLockedModels!==!1&&t.push(Bn(Ib)),Ve.store.hideHomePromo!==!1&&t.push(Bn(Nb)),Ve.store.hideAds!==!1&&t.push(Bn(Rb)),!t.length){E(Ms);return}w(Ms,t.join(`
`))}var cd=y({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Ve,start:ld,onSettingsChange:ld,stop(){E(Ms)}});var Mi=new S("ResponseNotification"),_n=L({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:qb},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Cs=!1,ki=null,Dn=null,Fr=null;function Pb(){return document.visibilityState==="hidden"||document.hidden}function Ob(){return _n.store.onlyWhenHidden===!1?!0:Pb()}function Bb(){let t=kn(C());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function ud(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!Dn||Dn.state==="closed")&&(Dn=new t);let e=Dn,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){Mi.debug("chime failed",t)}}function Db(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){Mi.debug("custom sound failed",e),ud()}}function dd(){let t=String(_n.store.soundUrl||"").trim();t?Db(t):ud()}function _b(){let t="Bloom++",e=`${Bb()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){Mi.debug("notification failed",n)}}function $b(){Ob()&&(_n.store.sound!==!1&&dd(),_n.store.browserNotification!==!1&&_b())}function qb(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>dd()),t.appendChild(e),()=>{e.remove()}}var md=y({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:_n,start(){Cs=!0,ki?.(),ki=tt(t=>{if(!Cs||t.userStopped||t.error)return;let e=C()||Mn();t.conversationId&&t.conversationId!==e||$b()}),Fr?.abort(),Fr=new AbortController,_n.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:Fr.signal}),Mi.debug("watch started")},stop(){Cs=!1,ki?.(),ki=null,Fr?.abort(),Fr=null;try{Dn?.close()}catch{}Dn=null}});var fd=`#bloom-pq-chip {
    position: fixed;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 12px 12px 10px;
    border-radius: 18px;
    border: 1px solid var(--border-light, rgba(0, 0, 0, 0.08));
    background: #f4f4f4;
    color: var(--text-primary, #0d0d0d);
    font: 14px/1.35 ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
    transform: translateX(-50%);
    pointer-events: auto;
}

html.dark #bloom-pq-chip {
    background: #252525;
    border-color: rgba(255, 255, 255, 0.08);
    color: #ececec;
}

.bloom-pq-head {
    padding: 2px 6px 8px;
    font-size: 14px;
    font-weight: 500;
}

.bloom-pq-row {
    display: flex;
    align-items: center;
    gap: 4px;
    min-height: 40px;
    padding: 0 6px 0 12px;
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.05);
}

html.dark .bloom-pq-row {
    background: #3a3a3a;
}

.bloom-pq-text,
.bloom-pq-edit {
    min-width: 0;
    flex: 1 1 auto;
    color: inherit;
    font: inherit;
}

.bloom-pq-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.bloom-pq-edit {
    height: 28px;
    padding: 0;
    border: 0;
    background: transparent;
    outline: none;
}

.bloom-pq-actions {
    display: flex;
    flex: none;
    align-items: center;
}

.bloom-pq-ico {
    appearance: none;
    width: 32px;
    height: 32px;
    padding: 0;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: var(--text-secondary, #5d5d5d);
    display: grid;
    place-items: center;
    cursor: pointer;
}

.bloom-pq-ico svg {
    width: 15px;
    height: 15px;
    display: block;
}

html.dark .bloom-pq-ico {
    color: #c8c8c8;
}

button.bloom-pq-ico:hover {
    background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.06));
}

html.dark button.bloom-pq-ico:hover {
    background: rgba(255, 255, 255, 0.08);
}

.bloom-pq-grip {
    cursor: default;
    opacity: 0.72;
}

@media (prefers-reduced-motion: reduce) {
    #bloom-pq-chip { transition: none; }
}
`;var Gr=new S("PromptQueue"),Rs="bloom-pq-chip",pd="promptQueue",gd=80,zb=50,jb=2e3,Gb='#thread section[data-testid^="conversation-turn-"][data-turn="assistant"], #thread article[data-testid^="conversation-turn-"][data-turn="assistant"]',Ub=/^(?:pro thinking|thinking(?:…|\.\.\.)?|正在思考|思考中)$/i,Ed=L({replacePending:{type:2,description:"Replace the queued prompt if you Enter again while one is waiting.",default:!0}}),B=new Map,qt=!1,St="",F="",Ft=!1,it=!1,Le=!1,q=null,zr=null,Ci=null,we,jr,We=null,Se=null;function $n(){return Qt(xt())}function Ye(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function Kb(t){let e=Ye(Nt(t));if(e)return e;if(!It(t))return"";try{let n=t.cloneNode(!0);return n.querySelectorAll('[contenteditable="false"], button, [role="button"]').forEach(r=>r.remove()),Ye(n.innerText||n.textContent||"")}catch{return""}}function Vb(){try{let t=document.querySelectorAll(Gb),e=t[t.length-1];return e instanceof HTMLElement?e:null}catch{return null}}function Wb(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function Yb(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=(e.textContent||"").replace(/\s+/g," ").trim();if(!(!n||n.length>32)&&Ub.test(n))return!0}}catch{}return!1}function Xb(){let t=Mn();if(!t)return!1;let e=C();return!e||e===t}function Zb(){if(Z()||li())return!1;if(Q()||Xb())return!0;let t=Vb();return t?!!(Wb(t)||Yb(t)):!1}function wd(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Ht);return n instanceof HTMLElement?n:null}function bd(t){return wd(t)??X()}function Hi(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function Sd(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function Jb(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?Ye(e.innerText||e.textContent||""):""}catch{return""}}function hd(t){if(!St||St===t)return;let e=B.get(St);!e||B.has(t)||$(St,t)&&(B.delete(St),B.set(t,e),F===St&&(F=t),q?.key===St&&(q.key=t),Gr.debug("migrated pending",St,"\u2192",t))}function Ii(t){let e=$n();if(B.get(e)&&Ed.store.replacePending===!1)return;B.set(e,{text:t,at:Date.now()}),q={key:e,text:t,turns:Sd(),ticks:3};let r=X();r&&Jt(r,""),Lt(),Gr.debug("queued",e,t.length)}function Is(t){B.delete(t),F===t&&(F=""),q?.key===t&&(q=null),Lt()}function Qb(){it=!0,clearTimeout(jr),jr=setTimeout(()=>{it=!1,jr=void 0},jb)}function th(){let t=$n(),e=B.get(t);if(!e)return;let n=X();if(!n)return;B.delete(t),F="",Lt(),Qb(),Jt(n,e.text);let r=ge();r&&!D(r)&&!ti(r)&&(r.click(),it=!1)}function yd(t){if(!qt||Ft||Q()||$n()!==t)return;let e=B.get(t);if(!e){F="";return}if(Ot())return;let n=X();if(!n)return;if(!pe(n)){let o=Ye(Nt(n));if(o&&o!==e.text)return}let r=ge();!r||D(r)||ti(r)||(Ft=!0,Jt(n,e.text),clearTimeout(we),we=setTimeout(()=>eh(t,e.text),zb))}function eh(t,e){we=void 0;try{if(!qt)return;let n=B.get(t);if(!n||n.text!==e||Q()||$n()!==t)return;let r=X();if(!r)return;let o=Ye(Nt(r));if(o&&o!==e&&!pe(r))return;o!==e&&Jt(r,e);let i=ge();if(!i||D(i)||ti(i))return;i.click(),B.delete(t),F="",Lt(),Gr.debug("drained",t)}finally{Ft=!1}}function nh(){let t=vt();if(!t||t===document.body)return null;let n=(t.querySelector('[class*="corner-superellipse"]')??t).getBoundingClientRect();return n.width<160||n.height<16?null:n}function Ld(t){let e=nh();if(!e){t.style.left="50%",t.style.width="min(48rem, calc(100vw - 1rem))",t.style.bottom="6.5rem";return}let n=Math.min(e.width,window.innerWidth-16);t.style.left=`${Math.round(e.left+e.width/2)}px`,t.style.width=`${Math.round(n)}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-e.top+8))}px`}function Ns(){We?.remove(),We=null,Se=null}var Ps="http://www.w3.org/2000/svg";function Td(){let t=document.createElementNS(Ps,"svg");return t.setAttribute("viewBox","0 0 16 16"),t.setAttribute("aria-hidden","true"),t}function As(t){let e=Td(),n=document.createElementNS(Ps,"path");return n.setAttribute("d",t),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","1.35"),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round"),e.append(n),e}function rh(){let t=Td(),e=[[5.5,4],[10.5,4],[5.5,8],[10.5,8],[5.5,12],[10.5,12]];for(let[n,r]of e){let o=document.createElementNS(Ps,"circle");o.setAttribute("cx",String(n)),o.setAttribute("cy",String(r)),o.setAttribute("r","1.05"),o.setAttribute("fill","currentColor"),t.append(o)}return t}function Hs(t,e,n){let r=document.createElement("button");return r.type="button",r.className="bloom-pq-ico",r.setAttribute("aria-label",t),r.append(e),r.addEventListener("mousedown",o=>o.preventDefault()),r.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),n()}),r}function vd(){let t=We?.querySelector("input.bloom-pq-edit");return t instanceof HTMLInputElement?t.value:null}function Ai(t,e){if(Se!==t)return;if(Se=null,e===null){Lt();return}let n=Ye(e);if(!n){Is(t);return}let r=B.get(t);r&&(r.text=n),Lt()}function Lt(){if(!qt||!document.body){Ns();return}let t=$n(),e=B.get(t);if(!e){Ns();return}let n=We;n?.isConnected||(n=document.createElement("div"),n.id=Rs,document.body.appendChild(n),We=n),n.replaceChildren();let r=document.createElement("div");r.className="bloom-pq-head",r.textContent="1 Queued messages";let o=document.createElement("div");o.className="bloom-pq-row";let i=Se===t,a=null;if(i){let d=document.createElement("input");d.type="text",d.className="bloom-pq-edit",d.value=e.text,d.setAttribute("aria-label","Edit queued prompt"),d.addEventListener("keydown",p=>{p.stopPropagation(),p.key==="Enter"?(p.preventDefault(),Ai(t,d.value)):p.key==="Escape"&&(p.preventDefault(),Ai(t,null))}),d.addEventListener("blur",()=>Ai(t,d.value)),o.append(d),a=d}else{let d=document.createElement("span");d.className="bloom-pq-text";let p=e.text.length>gd?`${e.text.slice(0,gd)}\u2026`:e.text;d.textContent=p,d.title=e.text,o.append(d)}let s=document.createElement("div");s.className="bloom-pq-actions";let l=document.createElement("span");l.className="bloom-pq-ico bloom-pq-grip",l.title="Only one prompt can wait",l.append(rh());let c=Hs("Dismiss queued prompt",As("M3.2 4.2h9.6M6.2 4.2V3.2h3.6v1M4.6 4.2l.6 8.4h5.6l.6-8.4"),()=>{Se=null,Is(t)}),u=Hs("Edit queued prompt",As("M9.4 3.2l3.4 3.4M3.2 12.8l.7-3.2L10.6 3l3.4 3.4-6.7 6.6z"),()=>{if(Se===t){Ai(t,vd());return}B.has(t)&&(Se=t,Lt())}),m=Hs("Send now",As("M8 12.4V3.8M4.6 7.1 8 3.7l3.4 3.4"),()=>{let d=vd();if(d!==null){let p=Ye(d);if(Se=null,!p){Is(t);return}let g=B.get(t);g&&(g.text=p)}th()});s.append(l,c,u,m),o.append(s),n.append(r,o),Ld(n),a&&a.focus()}function oh(){if(!q)return;if(q.ticks-=1,B.get(q.key)&&Sd()>q.turns){let e=Jb();if(e&&e===q.text){Gr.debug("native send leaked; dropping pending"),B.delete(q.key),F===q.key&&(F=""),q=null,Lt();return}}q.ticks<=0&&(q=null)}function Ni(t){return!Zb()||!It(t)?"":Kb(t)}function ih(t){if(!qt||t.isComposing||t.keyCode===229||t.key!=="Enter"||t.shiftKey||t.ctrlKey||t.metaKey||Ft)return;let e=bd(t.target)??bd(document.activeElement);if(!e)return;if(t.altKey||it){it=!1,Le=!0,queueMicrotask(()=>{Le=!1});return}let n=Ni(e);n&&(Hi(t),Ii(n))}function ah(t){if(!qt||Ft||!(t instanceof InputEvent)||t.inputType!=="insertParagraph")return;if(Le){Le=!1;return}if(it){it=!1;return}let e=wd(t.target);if(!e)return;let n=Ni(e);n&&(Hi(t),Ii(n))}function sh(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||D(e))return null;let n=t.closest(Ln);if(n instanceof HTMLElement&&!D(n))return n;let r=ge();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function xd(t){if(!qt)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${Rs}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&D(n)||Ft||!sh(e))return;if(it){it=!1;return}let r=X();if(!r)return;let o=Ni(r);o&&(Hi(t),Ii(o))}function lh(t){if(!qt)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(Qo)&&!e.querySelector(Ht)||Ft)return;if(Le){Le=!1;return}if(it){it=!1;return}let n=X()??e.querySelector(Ht);if(!n)return;let r=Ni(n);r&&(Hi(t),Ii(r))}var kd=y({name:"PromptQueue",description:"Queue the next prompt while a reply is streaming. Enter/Send waits for this turn instead of interrupting.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:pd,cleanupSelectors:[`#${Rs}`],settings:Ed,start(){qt=!0,St=$n(),F="",Ft=!1,it=!1,Le=!1,q=null,w(pd,fd),zr?.abort(),zr=new AbortController;let{signal:t}=zr,e={capture:!0,signal:t};window.addEventListener("keydown",ih,e),document.addEventListener("beforeinput",ah,e),document.addEventListener("pointerdown",xd,e),document.addEventListener("click",xd,e),document.addEventListener("submit",lh,e),Ci?.(),Ci=tt({onFall(n){if(qt){if(n.userStopped||n.error){F="",Lt();return}F=n.contextKey,yd(n.contextKey)}},onContext(n,r){r&&n&&!$(r,n)&&(F="",Ft=!1,we!==void 0&&(clearTimeout(we),we=void 0)),hd(n),St=n,Lt()},onTick(n){hd(n.contextKey),St=n.contextKey,oh(),F&&F===n.contextKey&&yd(F),We&&Ld(We)}}),Lt(),Gr.debug("watch started")},stop(){qt=!1,Ci?.(),Ci=null,zr?.abort(),zr=null,clearTimeout(we),we=void 0,clearTimeout(jr),jr=void 0,B.clear(),q=null,F="",Ft=!1,it=!1,Le=!1,Ns()}});var Md=`.bloom-cls {
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
`;var Hd=new S("ChatListStatus"),Cd="chatListStatus",Oi="bloom-cls",uh="bloom-cls",dh=1200*1e3,mh="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",Tt=new Map,zt=!1,mt="",ee=!1,zn=!1,ft=0,Te=null,Ds=null,qn=null,Os=null,Ri=null,Ur=null,Fn=!1,ke=new Set;function Pi(){return Date.now()}function Id(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function ne(t,e,n,r=!0){if(!(!t||!zt)){if(e==="idle")Tt.delete(t);else{let o=Tt.get(t);o&&o.kind===e&&n!=="net"?o.at=Pi():Tt.set(t,{kind:e,at:Pi(),source:n})}r&&fh({v:1,id:t,kind:e,at:Pi()}),Xe()}}function fh(t){try{qn?.postMessage(t)}catch{}}function ph(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||ne(e.id,e.kind,"bc",!1)}function gh(){let t=Pi();for(let[e,n]of Tt)n.kind==="streaming"&&t-n.at>dh&&Tt.delete(e)}function bh(){let t=Id();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(r.closest(mh))continue;let o=te(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function Ad(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function Bs(t){let e=t.querySelector(`:scope > .${Oi}`);return e||null}function _s(){if(!zt)return;gh();let t=C(),e=bh();Te?.disconnect();try{for(let n of e){let r=te(n.getAttribute("href")||"");if(!r||!t||r!==t){Bs(n)?.remove();continue}let i=Tt.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){Bs(n)?.remove();continue}let a=Bs(n);a||(a=document.createElement("span"),a.className=Oi,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(Ad("streaming")):i==="error"&&a.appendChild(Ad("error")))}}catch(n){Hd.debug("paint failed",n)}Nd()}function Xe(){if(zt){if(document.hidden){ft&&(cancelAnimationFrame(ft),ft=0),_s();return}ft||(ft=requestAnimationFrame(()=>{ft=0,zt&&_s()}))}}function Nd(){let t=Id();if(!(Te&&Ds===t&&t?.isConnected)){if(Te?.disconnect(),Ds=t,!t){Te=null;return}Te=new MutationObserver(()=>Xe()),Te.observe(t,{childList:!0,subtree:!0})}}function Bi(){return!!(Be()||Cr())}function hh(t){return!!(Fn||t&&ke.has(t)||!zn&&!Z()&&Bi())}function yh(t){if(zt){if(t.type==="post-start"){zn=!1,t.conversationId?(Fn=!1,ke.add(t.conversationId),ee=!0,ne(t.conversationId,"streaming","net")):(Fn=!0,ee=!0);return}if(t.type==="post-end"){if(Fn=!1,t.conversationId){ke.delete(t.conversationId);let e=C(),n=Mn();(e?t.conversationId===e:t.conversationId===n)?ne(t.conversationId,t.error?"error":"done","net"):ne(t.conversationId,"idle","net")}Bi()||(ee=!1)}}}function vh(t,e){if(!zt)return;if($(e,t)){Xe();return}let n=C();if(mt&&mt!==n){ke.delete(mt);let r=Tt.get(mt);r&&r.kind!=="idle"&&ne(mt,"idle","local")}Fn=!1,ee=!1,zn=!0,n&&Tt.get(n)?.kind==="streaming"&&Tt.get(n)?.source==="local"&&!ke.has(n)&&ne(n,"idle","local"),Xe()}function xh(t){if(!zt)return;let e=t.conversationId||C();if(mt&&e&&mt!==e){ke.delete(mt);let r=Tt.get(mt);r&&r.kind!=="idle"&&ne(mt,"idle","local"),ee=!!(e&&ke.has(e))}if(e&&(mt=e),zn||Z()){if(Z()||Bi()||t.streaming){Xe();return}zn=!1}if(hh(e)&&(t.streaming||Bi())){ee=!0,e&&ne(e,"streaming","local"),Xe();return}ee&&(ee=!1,e&&ne(e,Ot()?"error":"done","local")),Xe()}var Rd=y({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Oi}`],start(){zt=!0,w(Cd,Md);try{qn=new BroadcastChannel(uh)}catch{qn=null}qn?.addEventListener("message",ph),Os=lt(yh),Ri?.(),Ri=tt({onTick:xh,onContext:vh}),Ur?.abort(),Ur=new AbortController,document.addEventListener("visibilitychange",()=>{zt&&(ft&&(cancelAnimationFrame(ft),ft=0),_s())},{signal:Ur.signal}),Nd(),Hd.debug("sidebar status watch started")},stop(){zt=!1,ft&&cancelAnimationFrame(ft),ft=0,Ur?.abort(),Ur=null,Te?.disconnect(),Te=null,Ds=null,Ri?.(),Ri=null,Os?.(),Os=null;try{qn?.close()}catch{}qn=null,Tt.clear(),ke.clear(),Fn=!1,ee=!1,zn=!1,mt="",document.querySelectorAll(`.${Oi}`).forEach(t=>t.remove()),E(Cd)}});var Od="widerChat",Bd=40,Dd=96,_d=64,$d=L({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:Bd,max:Dd,default:_d}});function Eh(){return Y(Number($d.store.width??_d),Bd,Dd)}function Pd(){let t=Eh(),e=`min(100%,${t}rem)`;w(Od,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var qd=y({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:$d,start:Pd,onSettingsChange:Pd,stop(){E(Od)}});var $s="composerOpacity",jn='form[data-type="unified-composer"],form.w-full[data-type]',wh=[`${jn} [class*="corner-superellipse"]`,`${jn} [class*="bg-token-bg-primary"]`,`${jn} [class*="bg-token-main-surface"]`].join(","),Sh=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),Lh="#thread-bottom-container,#thread-bottom",Th=`${jn} #prompt-textarea,${jn} [contenteditable="true"]`,kh="var(--bg-primary,var(--main-surface-primary,#ffffff))",qs=L({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function Mh(){return Y(Number(qs.store.opacity??100),0,100)}function Ch(){return Y(Number(qs.store.blur??16),0,40)}function Fd(){let t=Mh();if(t>=100){E($s);return}let e=Ch(),n=`color-mix(in srgb,${kh} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";w($s,`${Lh}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Sh}{display:none!important}${jn}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${wh}{background-color:${n}!important;background-image:none!important;${r}}${Th}{background-color:transparent!important;background-image:none!important}`)}var zd=y({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[v.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:qs,start:Fd,onSettingsChange:Fd,stop(){E($s)}});var jd=`#bloom-bn-host {
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
`;var Hh=new S("BetterNavigator"),Fs="betterNavigator",Vd="bloom-bn-host",en=60,Ih=16,Nh=1e3,Rh=2.5,Ph=.4,$i="\u6B63\u5728\u8F93\u51FA\u2026",Us="Image",Oh="\u2753",Bh="\u{1F916}",Gd=/file_[0-9a-f]+/gi,Dh="File",_h="Code",$h=".markdown, .whitespace-pre-wrap",Zs=["a[download]","[class*='attachment']","[data-testid*='file' i]","[data-testid*='attachment' i]"].join(", "),qh="img, picture, video, canvas",Fh=/\.(?:epub|pdf|docx?|xlsx?|pptx?|txt|md|csv|json|zip|rar|7z|png|jpe?g|gif|webp|svg|mp3|mp4|wav|m4a|html?|py|js|ts|tsx|css|c|cpp|java|go|rs|rb|xml|ya?ml)$/i,zh=/\.[A-Za-z0-9]{1,8}(?:…|\.\.\.)$/,Zr=/^(?:file|image|pdf|epub|document|attachment|video|audio|code|zip|png|jpe?g|gif|webp|txt|markdown|文件|图片|附件|文档)$/i,jh=/favicon|iconify|shields\.io|badgen\.net|google\.com\/s2\/favicons|gstatic\.com\/favicon/i,Gh=/^(?:pro[\s-]*thinking|thinking|working|正在思考|思考中|正在工作)(?:\s*\d+\s*[sm])?(?:…|\.{3})?$/i,Uh=/^(?:pro thinking|thinking(?:…|\.\.\.)?|reasoning|thoughts?|正在思考|思考中|已思考.*|thought for\b.*|worked for\b.*|思考了.*|思考用时.*)$/i,Kh=/^(?:inspected|analyzed|translated|validated|searched|reviewed|extracted|packaged|已检查|已分析|已翻译|已验证|搜索了|已搜索)\b/i,Vh=/^(?:\d+\s+)?(?:sources?|websites?)$|^web search$/i,Wh=/^(?:Image(?: x\d+)?|File|Code|Message \d+)$/,Yh=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),Xh=2e3,Zh=40,Jh=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,Qh=['section[data-testid^="conversation-turn-"][data-turn="user"]','section[data-testid^="conversation-turn-"][data-turn="assistant"]','article[data-testid^="conversation-turn-"][data-turn="user"]','article[data-testid^="conversation-turn-"][data-turn="assistant"]'].join(", "),t0=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),e0=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='footnote']",".sr-only"].join(", "),n0=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),Vi=L({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),Un=new Map,Xr=new Map,Gt=new Set,qi=0,kt=!1,oe=!1,Gn=!1,Me=null,Jr=null,Qe=null,Fi=null,V=[],tn="",zi=0,ji=-1,Js=0,Gi="",pt=0,re=0,Kr,Vr=null,Di=null,zs=null,js=null,Ze=null,Ks=null,Wr=null,Je=null,Kn=null,Yr=null;function Wi(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function Gs(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function r0(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function o0(t){let e=t.getBoundingClientRect(),n=null;try{let o=t.querySelector("[data-message-id], [data-testid^='conversation-turn-']"),a=o?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]')??o;for(;a&&a!==t;)Jh.test(r0(a))&&(n=a),a=a.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=Gs(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||Gs(getComputedStyle(t).getPropertyValue("--thread-content-width"))||Gs(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function Ui(t){try{return!!t.closest(t0)}catch{return!0}}function Ud(t){let e=(t.getAttribute("data-turn")||t.closest("[data-turn]")?.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("data-message-author-role")||t.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase();if(n==="user"||n==="assistant")return n;try{let o=(t.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent||"").toLowerCase();if(o.includes("you said"))return"user";if(o.includes("chatgpt said")||o.includes("assistant said"))return"assistant"}catch{}let r=(t.getAttribute("aria-label")||"").toLowerCase();return r.includes("you said")?"user":r.includes("chatgpt said")||r.includes("assistant said")?"assistant":null}function Yi(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||t.querySelector("[data-message-id]")?.getAttribute("data-message-id")||""}function Qs(t){try{if(t.querySelector("[class*='imagegen-image']")||t.querySelector('img[alt="Generated image"], img[alt^="Generated image"]'))return!0}catch{}return!1}function i0(t){try{return!!t.closest("[class*='message-image']")}catch{return!0}}function _i(t,e){if(t){Gd.lastIndex=0;for(let n of t.matchAll(Gd))e.add(n[0].toLowerCase())}}function a0(t){try{let e=new Set,n=s=>{i0(s)||(_i(s.getAttribute("src")||"",e),_i(s.getAttribute("srcset")||"",e),_i(s.getAttribute("href")||"",e),s instanceof HTMLImageElement&&_i(s.currentSrc||"",e))};for(let s of t.querySelectorAll("[class*='imagegen-image']")){n(s);for(let l of s.querySelectorAll("[src], [srcset], [href]"))n(l)}for(let s of t.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]'))n(s);if(e.size)return e.size;let o=t.querySelectorAll("[class*='group/imagegen-image']").length;if(!o)return 0;let i=Yi(t);return(i?t.querySelector(`#image-${CSS.escape(i)}`):t.querySelector("[id^='image-']:not([id^='image-gen-'])"))&&o>=2&&(o-=1),o}catch{return 0}}function s0(t,e){let n=a0(t),r=Xr.get(e)??0,o=Math.max(r,n);return o>0&&Xr.set(e,o),o>=2?`${Us} x${o}`:Us}function z(t){return t.replace(/\s+/g," ").trim()}function Wd(t,e){let n=t;for(;n&&n!==e;){if(n.matches(e0))return!0;n=n.parentElement}return!1}function Ki(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(Wd(i,t))return NodeFilter.FILTER_REJECT;let s=i.closest(Zs);if(s&&(s===t||t.contains(s)))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return z(o.textContent||"")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<en+20;)e.push(z(r.textContent||""));return z(e.join(" "))}function Qr(t){let e=z(t);return e.length<3||e.length>180||Zr.test(e)?!1:Fh.test(e)?!0:zh.test(e)}function Xi(t){let e=z(t);return e.length<8||e.length>120||/\s/.test(e)||Zr.test(e)||Qr(e)||/^https?:/i.test(e)||/^file_[0-9a-f]{6,}$/i.test(e)||!/[_\-.]/.test(e)&&!/\(\d+\)/.test(e)?!1:/^[\w.\-()[\]+@#]+$/.test(e)}function l0(t){let e=[],n=i=>{let a=z(i);if(!a)return;let s=a.match(/^(.*\S)\s+(file|image|pdf|epub|document|attachment|文件|图片|附件|文档)$/i);if(s){e.push(z(s[1])),e.push(z(s[2]));return}e.push(a)},r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o;for(;o=r.nextNode();)n(o.textContent||"");return e}function c0(t){try{return Ui(t)?!0:!!t.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']")}catch{return!0}}function tl(t){let e=z(t);return!e||el(e)||Xi(e)?!0:Qr(e)?e.split(/\s+/).length<=8&&!/[。！？!?]/.test(e):!1}function u0(t){return!t.length||t.length>4||!t.every(e=>tl(e))?!1:t.some(e=>Zr.test(z(e))||Qr(e)||Xi(e))}function Yd(t){try{let e=null,n=0,r=`${Zs}, button, a, [role='button'], div`;for(let o of t.querySelectorAll(r)){if(c0(o)||o.querySelector("p, li, blockquote, .whitespace-pre-wrap, .markdown"))continue;let i=l0(o);if(!i.length||i.length>4||i.join(" ").length>240||!u0(i))continue;let a=i.some(c=>Zr.test(z(c))),s=i.some(c=>Qr(c)||Xi(c)),l=a&&s?3:s?2:1;l>=n&&(e=o,n=l)}return e}catch{return null}}function d0(t){return Yd(t)?Dh:""}function m0(t){try{if(t.closest("[class*='imagegen-image'], [class*='message-image']"))return!1;let e=t instanceof HTMLImageElement?t:t.querySelector("img");if(e instanceof HTMLImageElement){let i=e.getAttribute("alt")||"";if(/^Generated image/i.test(i))return!1;let a=`${e.getAttribute("src")||""} ${e.getAttribute("srcset")||""}`;if(jh.test(a))return!0}if(t.closest("[data-testid*='citation'], [class*='citation'], [class*='tool-message'], [data-testid*='tool']"))return!0;let n=t.getBoundingClientRect(),r=n.width||Number(e?.getAttribute("width"))||0,o=n.height||Number(e?.getAttribute("height"))||0;if(r>0&&r<=48||o>0&&o<=48)return!0;if(r>48||o>48)return!1}catch{}return!0}function f0(t){try{for(let e of t.querySelectorAll(qh))if(!m0(e))return!0}catch{}return!1}function el(t){let e=z(t).replace(/^[^a-zA-Z\u4e00-\u9fff]+/,"");return!e||Kh.test(e)||Uh.test(e)?!0:e.length<=24&&(Vh.test(e)||Zr.test(e))}function p0(t){let e=[],n=new Set,r=o=>{try{if(Wd(o,t)||o.closest(Zs))return}catch{return}let i=Ki(o);!i||n.has(i)||el(i)||(n.add(i),e.push(i))};try{for(let o of t.querySelectorAll("p, li, h1, h2, h3, blockquote"))if(r(o),e.join(" ").length>en+20)break;if(!e.length){for(let o of t.querySelectorAll("div, span"))if(!o.querySelector("div, p, li")&&!(Ki(o).length<24)&&(r(o),e.join(" ").length>en+20))break}}catch{}return z(e.join(" "))}function g0(t){let e=Yd(t);if(!e)return"";let n=[],r=new Set,o=i=>{try{if(e.contains(i)||i.contains(e)||!(e.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_FOLLOWING)||i.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']"))return}catch{return}let a=z(i.innerText||i.textContent||"");!a||a.length>en+20||r.has(a)||tl(a)||(r.add(a),n.push(a))};try{let i="button, [role='button'], p, li, h1, h2, h3, blockquote, .whitespace-pre-wrap, .markdown, div, span";for(let a of t.querySelectorAll(i))if(!(a.matches("div, span")&&a.querySelector("div, p, li, button"))&&(o(a),n.length))break}catch{}return z(n.join(" "))}function b0(t,e){let n=[];try{for(let o of t.querySelectorAll($h)){if(Ui(o))continue;let i=Ki(o);if(!(!i||e==="assistant"&&el(i)||tl(i))&&(n.push(i),n.join(" ").length>en+20))break}}catch{}let r=z(n.join(" "));if(e==="user"){let o=g0(t);if(o)return o}return r||(e==="assistant"?p0(t):"")}function h0(t){return t.length>en?`${t.slice(0,en).trimEnd()}\u2026`:t}function Kd(t){return Wh.test(t)}function y0(t,e,n,r){let o=b0(t,e);if(o)return h0(o);if(r)return $i;let i=d0(t);if(i)return i;if(Qs(t))return s0(t,Yi(t));try{if(f0(t))return Us;if(t.querySelector("pre, code"))return _h}catch{}return`Message ${n+1}`}function v0(){if(oe)return!0;let t=C();return!!(t&&Gt.has(t)||!Gn&&!Z()&&to())}function to(){return!!(Be()||Cr())}function x0(){qi=Date.now()}function Xd(t){oe=!1,t&&Gt.delete(t);let e=C();e&&Gt.delete(e)}function E0(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function w0(t){if(Qs(t)||!to())return!1;let e=t.querySelector(".markdown");if(!(!e||e instanceof HTMLElement&&!Ki(e)))return!1;let r=t.querySelector("[class*='thinking'], [class*='reasoning']");if(!r)return!1;if(r.getAttribute("aria-busy")==="true"||r.classList.contains("result-streaming"))return!0;try{if(r.querySelector("[aria-busy='true'], .result-streaming"))return!0}catch{}let o=r.closest("details")??r.querySelector("details");return o instanceof HTMLDetailsElement&&o.open}function nl(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=z(e.textContent||"");if(!(n.length>32)&&Gh.test(n))return!0}}catch{}return!1}function Zd(t){try{for(let e of t.querySelectorAll("svg.animate-spin, .animate-spin"))if(!e.closest('button[data-testid="conversation-options-button"], #page-header, nav, [data-testid*="citation"]'))return!0}catch{}return!1}function S0(t,e){try{if(E0(t))return!0;if(!e)return!1;if(w0(t)||nl(t))return!0}catch{}return!1}function Jd(t){if(!t||to())return!1;try{if(nl(t)||Zd(t))return!1;if(t.querySelector(Yh)||Qs(t))return!0}catch{}return!1}function L0(t){if(to()||qi&&Date.now()-qi<Xh)return;let e=[...t].reverse().find(n=>n.role==="assistant");!e||!Jd(e.el)||Xd()}function T0(t){let e=new Set,n=[];try{for(let r of t.querySelectorAll(Qh)){if(Ui(r))continue;let i=Yi(r)||`anon:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}if(n.length)return n;try{for(let r of t.querySelectorAll("[data-message-id]")){if(Ui(r))continue;let i=r.getAttribute("data-message-id")||""||`mid:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}return n}function k0(){let t=Wi();if(!t||t===document.body)return[];let e=Vi.store.showAssistant!==!1,n=e&&v0(),r=T0(t),o=null;if(e)for(let a of r)Ud(a)==="assistant"&&(o=a);let i=[];try{for(let a of r){let s=Yi(a);if(!s)continue;let l=Ud(a);if(l!=="user"&&l!=="assistant"||l==="assistant"&&!e)continue;let c=a===o,u=c&&nl(a),m=c&&Zd(a),d=l==="assistant"&&c&&!Jd(a)&&(u||m||n||S0(a,!0)),p=y0(a,l,i.length,d);if(p&&p!==$i){let b=Un.get(s),f=!!b&&(Qr(b)||Xi(b));(!b||f||!Kd(p)||Kd(b))&&p!==b&&Un.set(s,p)}let g=d&&p===$i?$i:Un.get(s)||p;i.push({id:s,el:a,role:l,text:g,live:d})}}catch{}return L0(i),i}function M0(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function Qd(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function C0(t){return t===window?window.innerHeight:t.clientHeight}function A0(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(n0)}catch{return!1}}function tm(){Kr!==void 0&&(clearTimeout(Kr),Kr=void 0),Vr?.classList.remove("bloom-bn-flash"),Vr=null}function H0(t){tm(),t.classList.add("bloom-bn-flash"),Vr=t,Kr=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),Vr===t&&(Vr=null),Kr=void 0},800)}function Vs(t){if(!V.length)return;let e=Math.max(0,Math.min(t,V.length-1));zi=e,Jr?.querySelectorAll(".bloom-bn-tick").forEach((r,o)=>{r.classList.toggle("bloom-bn-current",o===e)}),Qe?.querySelectorAll(".bloom-bn-item").forEach((r,o)=>{r.classList.toggle("bloom-bn-active",o===e)}),Fi&&(Fi.textContent=`${e+1} / ${V.length}`);let n=Qe?.children[e];if(n instanceof HTMLElement){let r=Qe;if(r){let o=n.offsetTop-r.clientHeight/2+n.offsetHeight/2;r.scrollTop=Math.max(0,o)}}}function Ws(t){let e=V[t];if(!e?.el.isConnected)return;ji=t,Js=Date.now()+Nh,Vs(t);let n=Kn??Qd(e.el),o=Math.abs(e.el.getBoundingClientRect().top-M0())>Rh*C0(n);e.el.scrollIntoView({behavior:o?"auto":"smooth",block:"start"}),Vi.store.jumpEffect!=="none"&&H0(e.el)}function rl(){if(!kt||!V.length)return;if(Date.now()<Js&&ji>=0){Vs(ji);return}let t=window.innerHeight*Ph,e=0;for(let n=0;n<V.length;n++){let r=V[n].el;r.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}Vs(e)}function I0(t){let e=Qd(t);if(Kn===e&&Yr)return;Yr?.(),Kn=e;let n=e===window?document:e,r=()=>{rl(),ol()};n.addEventListener("scroll",r,{passive:!0}),Yr=()=>n.removeEventListener("scroll",r)}function N0(t){Je?.disconnect(),Je=null;let e=Kn instanceof HTMLElement?Kn:null;Je=new IntersectionObserver(()=>rl(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el.isConnected&&Je.observe(n.el)}function R0(){if(!document.body)return null;let t=Me;if(t?.isConnected)return t;t=document.createElement("div"),t.id=Vd,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),Me=t,Jr=e,Qe=i,Fi=o,t}function em(){let t=Me,e=Wi();if(!t||!e||!e.isConnected||V.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=o0(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||Zh,m=n.right-r.right>=c+8?r.right+4:r.right-12-c;m=Math.min(m,n.right-c-8),m=Math.max(8,m);let d=Math.max(8,Math.round(window.innerWidth-m-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${d}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function ol(){!kt||re||(re=requestAnimationFrame(()=>{re=0,kt&&em()}))}function P0(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function O0(t){let e=Jr,n=Qe;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>Ih),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=P0(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",c=>{c.preventDefault(),Ws(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-emoji",s.textContent=r.role==="user"?Oh:Bh;let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=r.text,l.title=r.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),Ws(o)}),n.appendChild(a)}))}function B0(t){Jr?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=Qe?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function D0(){let t=C();return t===Gi?!1:(Gi=t,Un.clear(),Xr.clear(),V=[],tn="",zi=0,ji=-1,Js=0,oe&&t&&(Gt.add(t),oe=!1),!0)}function _0(t){let e=Vi.store.showAssistant!==!1?"1":"0";return`${Gi}|${e}|${t.map(n=>n.id).join(",")}`}function Ys(){if(!kt)return;D0();let t=k0(),e=Wi();if(!e||t.length<1){V=t,tn="",Me&&(Me.hidden=!0),Je?.disconnect(),Xs();return}R0();let n=_0(t);n!==tn?(V=t,tn=n,O0(t),I0(e),N0(t)):(V=t,B0(t)),em(),rl(),Xs()}function jt(){if(kt){if(document.hidden){pt&&(cancelAnimationFrame(pt),pt=0),Ys();return}pt||(pt=requestAnimationFrame(()=>{pt=0,kt&&Ys()}))}}function Xs(){let t=Wi();if(!(Ze&&Ks===t&&t?.isConnected)){if(Ze?.disconnect(),Wr?.disconnect(),Ks=t,!t||t===document.body){Ze=null;return}Ze=new MutationObserver(()=>jt()),Ze.observe(t,{childList:!0,subtree:!0}),Wr=new ResizeObserver(()=>ol()),Wr.observe(t)}}function $0(t){if(kt){if(t.type==="post-start"){x0(),Gn=!1,t.conversationId?(oe=!1,Gt.add(t.conversationId)):oe=!0,jt();return}if(t.type==="post-end"){if(oe=!1,t.conversationId)Gt.delete(t.conversationId);else{let e=C();e&&Gt.delete(e)}jt()}}}function q0(t){if(!kt||!V.length||Me?.hidden||t.altKey||t.ctrlKey||t.metaKey||A0(t.target))return;let e=-1;if(t.key==="ArrowDown")e=zi+1;else if(t.key==="ArrowUp")e=zi-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=V.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),Ws(Math.max(0,Math.min(e,V.length-1)))}function F0(){tm(),Je?.disconnect(),Je=null,Ze?.disconnect(),Ze=null,Ks=null,Wr?.disconnect(),Wr=null,Yr?.(),Yr=null,Kn=null,Me?.remove(),Me=null,Jr=null,Qe=null,Fi=null}var nm=y({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:Fs,cleanupSelectors:[`#${Vd}`],settings:Vi,start(){kt=!0,Gi=C(),w(Fs,jd),Di=new AbortController;let{signal:t}=Di;window.addEventListener("keydown",q0,{signal:t}),window.addEventListener("popstate",jt,{signal:t}),window.visualViewport?.addEventListener("resize",ol,{signal:t}),document.addEventListener("visibilitychange",()=>{kt&&(pt&&(cancelAnimationFrame(pt),pt=0),re&&(cancelAnimationFrame(re),re=0),Ys())},{signal:t}),js=lt($0),zs=tt({onTick(){if(Z()){jt();return}Gn&&!to()&&(Gn=!1),jt()},onFall(e){Xd(e.conversationId),jt()},onContext(e,n){if(!$(n,e)){Un.clear(),Xr.clear(),tn="",oe=!1;let r=C();for(let o of[...Gt])o!==r&&Gt.delete(o);Gn=!0}jt()}}),Xs(),jt(),Hh.debug("navigator started")},stop(){kt=!1,pt&&cancelAnimationFrame(pt),pt=0,re&&cancelAnimationFrame(re),re=0,Di?.abort(),Di=null,zs?.(),zs=null,js?.(),js=null,Gt.clear(),oe=!1,Gn=!1,qi=0,F0(),Un.clear(),Xr.clear(),V=[],tn="",E(Fs)},onSettingsChange(){tn="",jt()}});var rm=`.bloom-ts {
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
`;function om(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function im(t){try{return new Date(t).toISOString()}catch{return""}}var lm=new S("MessageTimestamps"),am="messageTimestamps",Ji="bloom-ts",sm=1500,j0="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",Vn=L({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),Wn=new Map,on=!1,gt=0,Ce=null,al=null,il=null,Zi=null,eo=null,no=!1,nn=!1;function cm(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function ll(){let t=Vn.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function um(){let t={...ll()};for(let[n,r]of Wn)t[n]=r;let e=Object.keys(t);if(e.length>sm){let n=e.slice(e.length-sm),r={};for(let o of n)r[o]=t[o];Vn.store.stamps=r;return}Vn.store.stamps=t}var G0=Vl(um,500);function dm(t,e){!t||!e||Wn.get(t)===e||(Wn.set(t,e),G0(),rn())}function U0(t){return t?Wn.get(t)??ll()[t]??ii(t)??null:null}function K0(t){on&&t.type==="message-time"&&dm(t.messageId,t.createTime)}function V0(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function W0(){let t=cm();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll("[data-message-id]"))n.closest(j0)||e.push(n)}catch{}return e}function Y0(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function sl(){if(!on)return;let t=Vn.store.hideOwnMessages===!0,e=Vn.store.showDate!==!1,n=Q();nn&&!Z()&&(nn=!1),nn&&(n?no=!1:nn=!1);let r=nn?!1:n,o=W0();Ce?.disconnect();try{o.forEach((i,a)=>{let s=i.getAttribute("data-message-id")||"",l=V0(i),c=i.querySelector(`:scope > .${Ji}`);if(t&&l==="user"){c?.remove();return}if(Y0(i)){c?.remove();return}let u=U0(s);if(!u&&s&&(r||no)&&a>=o.length-2&&(u=Date.now(),dm(s,u)),!u){c?.remove();return}let m=om(u,e);if(!m){c?.remove();return}let d=c;d||(d=document.createElement("time"),d.className=Ji,d.setAttribute("aria-hidden","true"),i.insertBefore(d,i.firstChild)),d.textContent!==m&&(d.textContent=m);let p=im(u);p&&d.getAttribute("datetime")!==p&&d.setAttribute("datetime",p)})}catch(i){lm.debug("paint failed",i)}no=r,mm()}function rn(){if(on){if(document.hidden){gt&&(cancelAnimationFrame(gt),gt=0),sl();return}gt||(gt=requestAnimationFrame(()=>{gt=0,on&&sl()}))}}function mm(){let t=cm();if(!(Ce&&al===t&&t?.isConnected)){if(Ce?.disconnect(),al=t,!t||t===document.body){Ce=null;return}Ce=new MutationObserver(()=>rn()),Ce.observe(t,{childList:!0,subtree:!0})}}var fm=y({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Ji}`],settings:Vn,start(){on=!0,w(am,rm);let t=ll();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&Wn.set(e,n);il=lt(K0),Zi?.(),Zi=tt({onTick:rn,onFall:rn,onContext(e,n){$(n,e)||(nn=!0,no=!1),rn()}}),eo?.abort(),eo=new AbortController,document.addEventListener("visibilitychange",()=>{on&&(gt&&(cancelAnimationFrame(gt),gt=0),sl())},{signal:eo.signal}),mm(),rn(),lm.debug("timestamp watch started")},stop(){on=!1,gt&&cancelAnimationFrame(gt),gt=0,eo?.abort(),eo=null,Ce?.disconnect(),Ce=null,al=null,Zi?.(),Zi=null,il?.(),il=null,nn=!1,no=!1,um(),Wn.clear(),document.querySelectorAll(`.${Ji}`).forEach(t=>t.remove()),E(am)},onSettingsChange:rn});var cl="streamerMode",X0="filter:blur(6px)!important;transition:filter .2s ease",Z0="filter:none!important",Yn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],Xn=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function bt(t,e){return t.map(n=>`${n} ${e}`)}var an=L({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function Zn(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${X0}}${e?`${r}{${Z0}}`:""}`}function pm(){let t=[];if(an.store.conversations!==!1&&(t.push(Zn([...bt(Xn,'a[href^="/c/"]'),...bt(Xn,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),an.store.projects!==!1&&(t.push(Zn([...bt(Xn,'a[href*="/project"]'),...bt(Xn,'a[href*="/g/g-p-"]'),...bt(Xn,'[data-testid="project-name"]'),...bt(Xn,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),an.store.headerTitle!==!1&&t.push(Zn(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),an.store.accountAvatar!==!1&&t.push(Zn([...bt(Yn,"img"),...bt(Yn,'[class*="avatar"]'),...bt(Yn,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),an.store.accountName!==!1&&t.push(Zn([...bt(Yn,".min-w-0 > .truncate"),...bt(Yn,".min-w-0.flex-1 .truncate")],!1)),an.store.accountEmail!==!1&&t.push(Zn([...bt(Yn,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!t.length){E(cl);return}w(cl,t.join(`
`))}var gm=y({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[v.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:an,start:pm,onSettingsChange:pm,stop(){E(cl)}});var bm=`.bloom-gc-panel {
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
}`;var Q0=new S("GreetingCustomizer"),Jn="greetingCustomizer",hm="greetingCustomizerUi",ro=100,dl=30,ty=120,ey=1e3,ny=50,ry=40,oy=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),oo=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),ra=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function iy(t){return!!t?.closest(oy)}function Em(t){return!!(iy(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function mo(t){try{for(let e of document.querySelectorAll(t))if(!Em(e))return e}catch{}return null}function ul(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(mo(e))return e;return t}var wm=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],W=L({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:Ey},greetings:{type:0,description:"Greeting texts",hidden:!0,default:wm},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),Ut=!1,er=!1,ln=null,ta,io,Qn,ao,ea=0,Qi=null,tr=null,so=null,lo=null,co=null,na=null;function ae(){let t=location.pathname||"/";return t==="/"||t===""}function sn(){let t=W.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):wm.slice()}function uo(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function ym(t){W.store.greetings=t.slice(0,dl)}function fo(){let t=String(W.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function ay(){return W.store.order==="random"?"random":"sequential"}function sy(){return Y(Number(W.store.intervalSec??10),1,3600)*1e3}function ly(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function cy(){return!!mo(ra)}function oa(){return!!(mo(ra)||mo(oo))}function uy(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=cy()?ul(ra):mo(oo)?ul(oo):ul(ra),i=e?`${oo}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function dy(t,e){if(t<=0)return 0;if(t===1)return Number(W.plain.index)!==0&&(W.store.index=0),Number(W.plain.lastRandom)!==0&&(W.store.lastRandom=0),0;let n=Number(W.plain.index),r=Number(W.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(ay()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return W.store.index=s,W.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return W.store.index=i,i}function ie(t){if(!Ut)return;if(!ae()){E(Jn);return}let e=sn().map(uo).filter(Boolean);if(!e.length){E(Jn);return}let n=dy(e.length,t),r=e[n]??e[0],o=fo()==="manual"&&e.length>1;w(Jn,uy(ly(r),o)),na?.()}function ml(){ta!==void 0&&(clearInterval(ta),ta=void 0)}function fl(){ml(),!(!Ut||!ae())&&fo()==="interval"&&(sn().filter(Boolean).length<=1||(ta=setInterval(()=>ie(!0),sy())))}function pl(){ao!==void 0&&(clearTimeout(ao),ao=void 0),ea=0}function vm(){if(pl(),!Ut||!ae())return;ea=ry;let t=()=>{if(ao=void 0,!(!Ut||!ae())){if(oa()){fo()==="refresh"&&!er?(er=!0,ie(!0)):ie(!1),fl();return}ea-=1,ea>0&&(ao=setTimeout(t,ny))}};t()}function gl(){if(ln===!0){oa()?ie(!1):vm();return}ln=!0,er=!1,fo()==="refresh"?(er=!0,ie(!0)):ie(!1),fl(),oa()||vm()}function bl(){ln=!1,er=!1,ml(),pl(),E(Jn)}function ia(){Qn===void 0&&(Qn=window.setTimeout(()=>{Qn=void 0,Ut&&(ae()?gl():ln!==!1&&bl())},ty))}function my(){tr||(tr=history.pushState.bind(history),so=history.replaceState.bind(history),lo=function(...e){let n=tr(...e);return ia(),n},co=function(...e){let n=so(...e);return ia(),n},history.pushState=lo,history.replaceState=co)}function fy(){lo&&history.pushState===lo&&tr&&(history.pushState=tr),co&&history.replaceState===co&&so&&(history.replaceState=so),tr=null,so=null,lo=null,co=null}function py(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(ia)}function gy(t){if(!Ut||!ae()||fo()!=="manual"||sn().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(oo);if(!n||Em(n))return;let r=window.getSelection?.();r&&String(r).trim()||ie(!0)}function by(){io===void 0&&(io=setInterval(()=>{if(!Ut)return;let t=ae();if(t!==(ln===!0)){t?gl():bl();return}t&&oa()&&ie(!1)},ey))}function hy(){io!==void 0&&(clearInterval(io),io=void 0)}function xm(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var yy="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",vy="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function xy(t,e){let n=uo(t);return n?n.length>ro?`Keep it to ${ro} characters.`:sn().length+(e?1:0)>dl?`At most ${dl} greetings.`:null:"Enter a greeting."}function Ey(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=sn(),s=Number(W.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=ro,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let f=l.querySelector(".bloom-gc-count");f&&(f.textContent=`${uo(e).length}/${ro}`);let T=l.querySelector(".bloom-gc-error");T&&(T.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let m=document.createElement("span");m.className="bloom-gc-count",m.textContent=`${uo(e).length}/${ro}`;let d=document.createElement("span");d.className="bloom-gc-error",d.textContent=r;let p=document.createElement("div");if(p.className="bloom-gc-actions",n>=0){let f=document.createElement("button");f.type="button",f.className="bloom-gc-btn",f.textContent="Cancel",f.addEventListener("click",()=>{n=-1,e="",r="",i()}),p.appendChild(f)}let g=document.createElement("button");if(g.type="button",g.className="bloom-gc-btn bloom-gc-btn-primary",g.textContent=n>=0?"Update":"Add",g.addEventListener("click",()=>{let f=n<0,T=xy(e,f);if(T){r=T,i();return}let A=uo(e),I=sn().slice();n>=0&&n<I.length?I[n]=A:I.push(A),ym(I),n=-1,e="",r="",i()}),p.appendChild(g),u.append(m,d,p),l.appendChild(u),t.appendChild(l),!a.length){let f=document.createElement("p");f.className="bloom-gc-empty",f.textContent="No greetings. The official heading stays.",t.appendChild(f);return}let b=document.createElement("div");b.className="bloom-gc-list",a.forEach((f,T)=>{let A=document.createElement("div");A.className="bloom-gc-item",T===s&&(A.dataset.active="true");let I=document.createElement("button");I.type="button",I.className=`bloom-gc-body${o===T?"":" bloom-gc-clamp"}`,I.textContent=f,I.addEventListener("click",()=>{o=o===T?-1:T,i()});let Wt=document.createElement("div");Wt.className="bloom-gc-item-actions";let Mt=xm("Edit",yy);Mt.addEventListener("click",()=>{n=T,e=f,r="",i()});let nt=xm("Delete",vy);nt.addEventListener("click",()=>{let R=sn().filter((at,Yt)=>Yt!==T);ym(R),n===T?(n=-1,e=""):n>T&&(n-=1),i()}),Wt.append(Mt,nt),A.append(I,Wt),b.appendChild(A)}),t.appendChild(b)};return na=i,i(),()=>{na===i&&(na=null),t.replaceChildren()}}var Sm=y({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:hm,settings:W,start(){Ut=!0,w(hm,bm),my(),Qi=new AbortController;let{signal:t}=Qi;window.addEventListener("popstate",ia,{signal:t}),document.addEventListener("click",py,{capture:!0,signal:t}),document.addEventListener("click",gy,{signal:t}),by(),ln=null,ae()?gl():bl(),Q0.debug("started")},stop(){Ut=!1,Qi?.abort(),Qi=null,Qn!==void 0&&(clearTimeout(Qn),Qn=void 0),ml(),pl(),hy(),fy(),E(Jn),er=!1,ln=null},onSettingsChange(){Ut&&(ae()?(ie(!1),fl()):E(Jn))}});function wy(t){let e=/^data:([^;,]+)?(;base64)?,(.*)$/s.exec(t);if(!e)return null;let n=e[1]||"application/octet-stream",r=!!e[2],o=e[3]||"";try{if(r){let i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return new Blob([a],{type:n})}return new Blob([decodeURIComponent(o)],{type:n})}catch{return null}}async function aa(t){try{return await createImageBitmap(t)}catch{return null}}async function Sy(t){try{let e=new Image;return e.decoding="async",await new Promise((n,r)=>{e.onload=()=>n(),e.onerror=()=>r(new Error("img")),e.src=t}),await createImageBitmap(e)}catch{return null}}async function sa(t){if(t.startsWith("data:")){let e=wy(t);if(e){let n=await aa(e);if(n)return n}return Sy(t)}try{let e=await fetch(t,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?aa(await e.blob()):null}catch{return null}}var ca="data-bloom-csi-slot",Ly="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",Ty=/\bsize-(?:[6-9]|10)\b/,ky=/\b(?:h|w)-(?:[6-9]|10)\b/,My=/^(plus|pro|free|team|go|business|enterprise)$/i,Cy=['[class*="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-6"]','[class~="h-7"]','[class~="h-8"]','[class~="h-9"]','[class~="h-10"]','[class~="w-6"]','[class~="w-7"]','[class~="w-8"]','[class~="w-9"]','[class~="w-10"]'].join(",");function la(t){return t.getAttribute("class")||""}function Tm(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||Ty.test(t)?!0:ky.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function Ay(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3&&!km(e)}function km(t){return My.test(String(t??"").replace(/\s+/g,""))}function Kt(t){return!!t?.closest(Ly)}function ua(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function po(t){let e=la(t);return/\btext-xs\b/.test(e)||/text-token-text-secondary/.test(e)||/text-token-text-tertiary/.test(e)?!0:km(t.textContent||"")}function da(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function go(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function Hy(t){return/\bflex\b/.test(t)&&!/\bflex-col\b/.test(t)}function Mm(t){if(Kt(t)||da(t)||go(t)||po(t)||ua(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function Cm(t){return Kt(t)||da(t)||go(t)||po(t)||t.querySelector("img, svg, .min-w-0, .truncate")?!1:Ay(t.textContent||"")}function Am(t){return Kt(t)||go(t)||ua(t)||po(t)?!1:Tm(la(t))||Cm(t)?!0:Mm(t)}function Lm(t){return!(Kt(t)||ua(t)||go(t)||po(t)||da(t))}function cn(t,e){let n=da(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(go(n)||ua(n)||po(n));)Kt(n)||(r=n),n=n.parentElement;return r}function Iy(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||Kt(e))continue;if(Hy(la(e))){let r=[];for(let o of e.children)if(!(!(o instanceof HTMLElement)||!Lm(o))){if(Am(o)||Tm(la(o)))return cn(o,t)??o;r.push(o)}if(r.length===1)return cn(r[0],t)??r[0]}let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&Lm(r))return cn(r,t)??r}}return null}function Ny(t){let e=t.querySelectorAll(Cy);for(let n of e)if(Am(n))return cn(n,t)??n;return null}function Ry(t){for(let e of t.querySelectorAll("span, div, p, i"))if(Cm(e))return cn(e,t)??e;return null}function Py(t){for(let e of t.querySelectorAll("*"))if(Mm(e))return cn(e,t)??e;return null}function Hm(t,e){if(Kt(t))return null;if(e&&!Kt(e)&&t.contains(e)){let n=cn(e,t);if(n)return n}return Iy(t)??Ny(t)??Ry(t)??Py(t)}function Im(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-8"]','[class~="w-8"]']}var nr="data-bloom-csi",ma="data-bloom-csi-orig",un=new Set,Nm=null;function yl(t){Nm=t}function Rm(t){return`url(${JSON.stringify(t)})`}function fa(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function vl(t,e,n){let r=Rm(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function Pm(t,e=ca){let n=Rm(t);return`[${e}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${e}] *,[${e}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${e}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`}function Oy(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function rr(t){t.removeEventListener("error",hl);let e=t.getAttribute(ma);t.removeAttribute(nr),t.removeAttribute(ma),e&&t.getAttribute("src")!==e&&(t.src=e)}function hl(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&un.add(n),rr(e),Nm?.()}function Om(t,e){if(!e||un.has(e)){rr(t);return}Oy(t);let n=t.getAttribute("src")??"";if(t.getAttribute(nr)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(ma)&&t.setAttribute(ma,n);t.setAttribute(nr,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",hl),t.addEventListener("error",hl),n!==e&&(t.src=e)}var Bm=`/*
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
`;var Dm=new S("CustomSidebarIdentity"),_m="customSidebarIdentityUi",Fm="customSidebarIdentity",Dy="bloom-csi-face",_y="bloom-csi-name",or=ca,$y=1024,pa=256,zm=24,jm=64,Gm=40,Sl=1,Ll=4,bo=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],xl=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],x=L({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:rv},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:zm,max:jm,default:Gm},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function mn(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function qy(){return String(x.store.displayName??"").trim()}function ha(t,e,n,r,o){let i=Y(n,Sl,Ll),a=Math.min(t,e)/i,s=Y(r,a/2,Math.max(a/2,t-a/2)),l=Y(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}function Fy(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function Tl(t){let e=Math.min(1,$y/Math.max(t.width,t.height));return Fy(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function zy(t,e,n,r){let{side:o,x:i,y:a}=ha(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=pa,s.height=pa;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,pa,pa);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function jy(t){let e=await aa(t);if(!e)return null;let n=Tl(e);return e.close(),n}async function Ml(t,e,n,r){let o=await sa(t);if(!o)return null;let i=zy(o,e,n,r);return o.close(),i}function Cl(){x.store.cropX=.5,x.store.cropY=.5,x.store.cropZoom=1}function $m(){x.store.avatarUrl="",x.store.avatarSource="",Cl()}var qm=0;async function kl(t){let e=++qm;Cl(),x.store.avatarSource=t;let n=await Ml(t,.5,.5,1);return e!==qm?!1:(n&&(x.store.avatarUrl=n),!!n)}function ho(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function El(t){let e=ho(t);if(!e)return!1;let n=await jy(e);return n?kl(n):!1}var ht=!1,ir=!1,ar=0,ya=0,ga=null,Ae=new Map,sr=null,se=null,va=null,Vt=null,xa=null;function Ea(t){let e=String(t??"").trim();if(!e||un.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:n}=new URL(e);if(n==="https:"||n==="http:")return e}catch{return null}return null}function Um(){return Ea(x.store.avatarUrl)??Ea(x.store.avatarSource)}var ba=!1,wl=new Set;function Km(){let t=Ea(x.store.avatarSource);if(!t?.startsWith("data:image/")||Ea(x.store.avatarUrl)?.startsWith("data:image/")||ba||wl.has(t))return;ba=!0;let e=mn(x.store.cropX,.5),n=mn(x.store.cropY,.5),r=mn(x.store.cropZoom,1);Ml(t,e,n,r).then(o=>{if(ba=!1,!o){wl.add(t);return}ht&&(x.store.avatarUrl=o,wa())}).catch(()=>{ba=!1,wl.add(t)})}function dn(t,e){return t.map(n=>`${n} ${e}`)}function Gy(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Uy(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=Gy(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function Vm(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||Kt(n)||n.closest(".min-w-0")||e.push(n);return e}function Ky(t){let e=Vm(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function Al(){let t=[],e=Ne();e&&t.push(e);let n=xn();if(n&&!t.some(r=>n.contains(r)||r.contains(n))){let r=n.querySelector(bo.join(","))??n.querySelector("button, a, [role='button']")??n;r&&!t.includes(r)&&t.push(r)}return t}function Wm(t,e){let n=Ky(t);if(n)Om(n,e);else for(let o of Vm(t))rr(o);let r=Hm(t,n);for(let o of t.querySelectorAll(`[${or}]`))o!==r&&o.removeAttribute(or);r&&r.setAttribute(or,"")}function Vy(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function Wy(t,e){let n=Vy(t);n&&Wm(n,e)}function Yy(){for(let t of document.querySelectorAll(`img[${nr}]`))rr(t);for(let t of document.querySelectorAll(`[${or}]`))t.removeAttribute(or)}function Xy(){let t=Y(Math.round(mn(x.store.avatarSize,Gm)),zm,jm),e=Um(),n=qy(),r=x.store.applyToMenu!==!1,o=[],i=[...dn(bo,"img"),"#stage-sidebar-tiny-bar img"];r&&i.push(...dn(xl,"> :first-child img"));let a=[...dn(bo,".min-w-0 > .truncate"),...dn(bo,".min-w-0.flex-1 .truncate")];r&&a.push(...dn(xl,"> :first-child .truncate"));let s=Im(or);o.push(fa([...s.flatMap(l=>dn(bo,l))].join(","),t)),o.push(fa(s.map(l=>`#stage-sidebar-tiny-bar ${l}`).join(","),32)),r&&o.push(fa(s.flatMap(l=>dn(xl,`> :first-child ${l}`)).join(","),t)),e&&(o.push(vl(i.join(","),e,t)),o.push(vl("#stage-sidebar-tiny-bar img",e,32)),o.push(Pm(e))),n&&o.push(Uy(a,n)),w(Fm,o.join(""))}function Zy(){let t=Um(),e=Al();for(let n of e)Wm(n,t);if(x.store.applyToMenu!==!1){let n=En();n&&Wy(n,t)}for(let n of document.querySelectorAll(`img[${nr}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||rr(n)}function wa(){if(!(!ht||ir)){ir=!0;for(let t of Ae.values())t.disconnect();se?.disconnect(),Vt?.disconnect();try{Xy(),Zy()}finally{ir=!1,Hl(),ev(),sr?.isConnected&&Ym(sr),Km()}}}function yo(){!ht||ar||(ar=requestAnimationFrame(()=>{ar=0,wa()}))}function Jy(){ir||!ht||yo()}function Qy(t){if(Ae.has(t))return;let e=new MutationObserver(Jy);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),Ae.set(t,e)}function tv(t){Ae.get(t)?.disconnect(),Ae.delete(t)}function Hl(){let t=new Set;for(let n of Al())t.add(n),n.parentElement&&t.add(n.parentElement);let e=xn();e&&t.add(e);for(let n of[...Ae.keys()])(!t.has(n)||!n.isConnected)&&tv(n);for(let n of t)n.isConnected&&Qy(n)}function ev(){let t=Oo();if(!t){Vt?.disconnect(),Vt=null,va=null;return}if(va===t&&Vt){Vt.observe(t,{childList:!0});return}Vt?.disconnect(),va=t,Vt=new MutationObserver(()=>{ir||!ht||(Hl(),yo())}),Vt.observe(t,{childList:!0})}function Ym(t){sr===t&&se||(se?.disconnect(),sr=t,se=new MutationObserver(()=>{if(!t.isConnected){se?.disconnect(),se=null,sr=null;return}ir||!ht||yo()}),se.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function Xm(t){if(!ht||x.store.applyToMenu===!1)return;let e=En();if(e){Ym(e),yo();return}t<=0||requestAnimationFrame(()=>Xm(t-1))}function Zm(t){ht&&(wa(),!(Al().length||t<=0)&&(ya=requestAnimationFrame(()=>Zm(t-1))))}function nv(t){ht&&x.store.applyToMenu!==!1&&(!Bo(t)&&!En()||Xm(10))}function rv(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let m=document.createElement("p");m.className="bloom-csi-hint";let d=document.createElement("div");d.className="bloom-csi-crop";let p=document.createElement("div");p.className="bloom-csi-stage";let g=document.createElement("img");g.className="bloom-csi-stage-img",g.alt="",g.draggable=!1,p.appendChild(g);let b=document.createElement("div");b.className="bloom-csi-zoom-row";let f=document.createElement("input");f.type="range",f.className="bloom-csi-zoom",f.min=String(Sl),f.max=String(Ll),f.step="0.05",f.setAttribute("aria-label","Zoom");let T=document.createElement("span");T.className="bloom-csi-zoom-val";let A=document.createElement("button");A.type="button",A.className="bloom-csi-btn",A.textContent="Reset",b.append(f,T,A);let I=document.createElement("p");I.className="bloom-csi-hint",I.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",d.append(p,b,I),t.append(u,m,d);function Wt(){let h=String(x.store.avatarSource??""),M=String(x.store.avatarUrl??"");return h.startsWith("data:image/")?h:M.startsWith("data:image/")?M:""}function Mt(h,M,H){if(!a)return i.x=h,i.y=M,i.zoom=Y(H,Sl,Ll),i;let J=ha(a.w,a.h,H,h*a.w,M*a.h);return i.x=J.x/a.w,i.y=J.y/a.h,i.zoom=J.z,i}function nt(){f.value=String(i.zoom),T.textContent=`${Math.round(i.zoom*100)}%`;let h=a?ha(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;h&&a&&(g.style.width=`${a.w/h.side*100}%`,g.style.height=`${a.h/h.side*100}%`,g.style.left=`${(.5-h.x/h.side)*100}%`,g.style.top=`${(.5-h.y/h.side)*100}%`)}function R(h=!1){let M=Wt(),H=String(x.store.avatarUrl??"").trim(),J=!!M;s.hidden=!H&&!M,(M||H)&&(s.src=M||H),document.activeElement!==l&&(l.value=J?"":H),l.placeholder=J?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",d.hidden=!M,m.hidden=!(e&&/^https?:\/\//.test(H)&&!M),m.textContent=m.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",M&&(h&&(i.x=mn(x.store.cropX,.5),i.y=mn(x.store.cropY,.5),i.zoom=mn(x.store.cropZoom,1)),g.getAttribute("src")!==M&&(a=null,g.onload=()=>{a={w:g.naturalWidth,h:g.naturalHeight},Mt(i.x,i.y,i.zoom),nt()},g.src=M),nt())}function at(h,M,H,J=!1){Mt(h,M,H),nt();let Bl=Wt(),Dl=()=>{x.store.cropX=i.x,x.store.cropY=i.y,x.store.cropZoom=i.zoom,Bl&&Ml(Bl,i.x,i.y,i.zoom).then(_l=>{_l&&(x.store.avatarUrl=_l)})};r&&clearTimeout(r),J?Dl():r=setTimeout(Dl,80)}function Yt(h){x.store.avatarUrl=h;let M=h.trim();if(n&&clearTimeout(n),!M){x.store.avatarSource="",Cl(),e=!1,R(!0);return}if(M.startsWith("data:image/")){e=!1,n=setTimeout(()=>{sa(M).then(H=>{if(!H)return;let J=Tl(H);H.close(),J&&kl(J).then(()=>R(!0))})},80);return}if(/^https?:\/\//.test(M)){e=!1,x.store.avatarSource="",n=setTimeout(()=>{sa(M).then(H=>{if(!H){e=!0,R(!0);return}let J=Tl(H);H.close(),J?(e=!1,kl(J).then(()=>R(!0))):(e=!0,R(!0))})},400);return}e=!1,x.store.avatarSource="",R(!0)}u.addEventListener("paste",h=>{ho(h.clipboardData)&&(h.preventDefault(),e=!1,El(h.clipboardData).then(()=>R(!0)))}),u.addEventListener("dragover",h=>{ho(h.dataTransfer)&&h.preventDefault()}),u.addEventListener("drop",h=>{ho(h.dataTransfer)&&(h.preventDefault(),e=!1,El(h.dataTransfer).then(()=>R(!0)))}),l.addEventListener("change",()=>Yt(l.value)),l.addEventListener("paste",h=>{ho(h.clipboardData)&&(h.preventDefault(),e=!1,El(h.clipboardData).then(()=>R(!0)))}),l.addEventListener("keydown",h=>{Wt()&&!l.value&&(h.key==="Backspace"||h.key==="Delete")&&($m(),e=!1,R(!0))}),c.addEventListener("click",()=>{$m(),e=!1,R(!0)}),p.addEventListener("pointerdown",h=>{h.button===0&&(p.setPointerCapture(h.pointerId),o.on=!0,o.px=h.clientX,o.py=h.clientY,o.x=i.x,o.y=i.y)}),p.addEventListener("pointermove",h=>{if(!o.on||!a)return;let M=p.clientWidth;if(!M)return;let{side:H}=ha(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);Mt(o.x-(h.clientX-o.px)*(H/M)/a.w,o.y-(h.clientY-o.py)*(H/M)/a.h,i.zoom),nt()}),p.addEventListener("pointerup",()=>{o.on&&(o.on=!1,at(i.x,i.y,i.zoom,!0))}),p.addEventListener("pointercancel",()=>{o.on=!1}),p.addEventListener("wheel",h=>{h.preventDefault(),at(i.x,i.y,i.zoom*(h.deltaY<0?1.08:1/1.08))},{passive:!1}),f.addEventListener("input",()=>at(i.x,i.y,Number(f.value))),f.addEventListener("change",()=>at(i.x,i.y,Number(f.value),!0)),A.addEventListener("click",()=>at(.5,.5,1,!0));let Ol=()=>R(!1);return xa=Ol,R(!0),()=>{xa===Ol&&(xa=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var Jm=y({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:_m,cleanupSelectors:[`.${Dy}`,`.${_y}`],settings:x,start(){ht=!0,un.clear(),yl(yo),w(_m,Bm),ga=new AbortController,document.addEventListener("click",nv,{signal:ga.signal}),Zm(40),Km(),Dm.debug("started")},onSettingsChange(){un.clear(),xa?.(),ht&&(Hl(),wa())},stop(){ht=!1,ga?.abort(),ga=null,ar&&cancelAnimationFrame(ar),ar=0,ya&&cancelAnimationFrame(ya),ya=0;for(let t of Ae.values())t.disconnect();Ae.clear(),se?.disconnect(),se=null,sr=null,Vt?.disconnect(),Vt=null,va=null,Yy(),E(Fm),yl(null),un.clear(),Dm.debug("stopped")}});var lr=new S("Bloom"),Qm=!1,ov=Date.now(),iv=[Oc,ku,Ou,_u,ju,Wu,sd,cd,md,kd,Rd,qd,zd,nm,fm,gm,Sm,Jm];function Sa(t){return new Promise(e=>setTimeout(e,t))}function av(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function sv(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var ef=8e3,tf=300,lv=250;async function cv(){if(Ie())return await Sa(tf),!0;for(;Date.now()-ov<ef;)if(await Sa(lv),Ie())return await Sa(tf),!0;return Ie()||Ha()}function Il(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function uv(){if(Il())return!0;let t=Date.now()+ef;for(;Date.now()<t;)if(await Sa(100),Il())return!0;return Il()}function dv(){try{GM_registerMenuCommand?.("Bloom++ settings",Pc)}catch{}}function mv(){Co(()=>{ur("HostShell"),lr.info("host shell",st)}),Ao(()=>{lr.info("idle ready",st)}),Ho(()=>{Ta(),ur("HostReady"),lr.info("chrome ready",st)})}async function Nl(){await Wl()}async function Rl(){if(Qm)return;Qm=!0;for(let n of iv)try{rc(n),pc(n)}catch(r){lr.error("register failed",n.name,r)}ac(),ur("Init"),dv(),mv();let t=()=>ur("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await av(),Ta(),lr.info("styles ready",st),await sv(),uv().then(n=>{n&&Io()}),!await cv()){lr.warn("late islands not detected; starting default plugins",st),hn(),No();return}await mc()}var nf=typeof unsafeWindow<"u"?unsafeWindow:window,fv=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||fv){let t=nf.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",st);try{Object.defineProperty(nf,"Bloom",{value:Pl,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}Nl().then(()=>Rl()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
