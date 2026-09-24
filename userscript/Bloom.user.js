// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260924] v1.4.77
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

/* Bloom++ [20260924] v1.4.77. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var km=Object.defineProperty;var Cm=(t,e)=>{for(var n in e)km(t,n,{get:e[n],enumerable:!0})};var ll={};Cm(ll,{REPO_URL:()=>Fl,Settings:()=>k,VERSION:()=>et,contextKeyFromUrl:()=>Ut,conversationTitle:()=>gn,conversationToken:()=>rt,currentConversationId:()=>M,hasDraftText:()=>ht,hasErrorToast:()=>At,hasLateIslands:()=>Se,init:()=>sl,initSettings:()=>al,isDocumentInteractive:()=>jl,isStreaming:()=>_,isUserDraftEmpty:()=>se,messageCreateTime:()=>Yo,plugins:()=>zt,requestChromeReady:()=>Eo,requestIdleReady:()=>on,requestShellReady:()=>wo,setEditorText:()=>Gt,subscribeHarvest:()=>ot,watchStreamingEdge:()=>X,whenChromeReady:()=>xo,whenIdleReady:()=>vo,whenShellReady:()=>yo});var ee=new Map,lo=!1;function Mm(){return document.getElementById("bloom-root")?.shadowRoot??null}function fl(){return document.head??null}function tn(){let t=Mm();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=Am()}function la(t,e){if(!lo)return;let n=fl();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),tn();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,tn();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,tn()}function E(t,e){let n=ee.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},ee.set(t,n)),lo&&la(t,n)}function ca(){if(!fl())return!1;lo=!0;for(let[e,n]of ee)la(e,n);return tn(),!0}function pl(t){let e=ee.get(t);e&&(e.disabled=!1,lo&&la(t,e))}function gl(t){let e=ee.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),tn())}function w(t){let e=ee.get(t);e&&(e.el?.remove(),ee.delete(t),tn())}function Am(){return Array.from(ee.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var S=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function y(t){return t}var ua=new Map;function en(t,e){let n=ua.get(t);return n||(n=new Set,ua.set(t,n)),n.add(e),()=>n.delete(e)}function Ee(t,e){let n=ua.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var Hm="bloompp";function bl(){return new Promise((t,e)=>{let n=indexedDB.open(Hm,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function hl(t){try{let e=await bl();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function yl(t,e){try{let n=await bl();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function nn(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function K(t,e,n){return Math.min(n,Math.max(e,t))}function vl(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function xl(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function wl(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var co=new S("SettingsStore"),ne="BloomSettings",Nm=100;function uo(t){return t!=null&&typeof t.then=="function"}function Rm(t){if(t==null||uo(t))return null;if(nn(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(nn(e)&&!uo(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return nn(n)&&!uo(n)?n:null}return null}catch{return null}}function fo(t){let e=Rm(t);if(!e)return null;let n=e.plugins;return!nn(n)||uo(n)||Object.keys(n).length===0?null:e}var mo=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let d=l.slice(c.length+1);if(d&&!d.includes(".")){let f=u(d);f!==void 0&&(i[a]=f,s=f);break}}}return nn(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){co.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Nm))}save(){try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(ne,this.plain)}catch{try{GM_setValue(ne,e)}catch(n){co.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(ne,e)}catch{}yl(ne,e).catch(n=>co.warn("Failed to save settings to IndexedDB:",n))}catch(e){co.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){vl(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var Im=new S("Settings"),Pm={plugins:{}},k=new mo(structuredClone(Pm)),Om=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function Bm(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function L(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?(k.store.plugins[n]||(k.store.plugins[n]={}),k.store.plugins[n]):{}},get plain(){let n=e.pluginName;return n?k.plain.plugins[n]??{}:{}}};return e}async function Dm(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function El(){let t=fo(await Dm(ne));if(t||(t=fo(await hl(ne))),!t)try{t=fo(localStorage.getItem(ne))}catch{t=null}if(!t)return;let e=t.plugins;e&&(k.plain.plugins=e,Im.debug("Loaded settings"))}function Sl(t,e){e&&(e.pluginName=t,k.plain.plugins[t]||(k.plain.plugins[t]={}),k.setDefaultGetter(Om(t),n=>{if(n!=="enabled")return Bm(e.def,n)}))}function Ll(){return k.plain.plugins.Settings||(k.store.plugins.Settings={}),k.store.plugins.Settings}function po(){return Ll().pinnedPlugins??[]}function Tl(t){return po().includes(t)}function kl(t){let e=po(),n=e.includes(t);return k.store.plugins.Settings={...k.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function go(){return Ll().starredPlugins??[]}function Cl(t){return go().includes(t)}function Ml(t){let e=go(),n=e.includes(t);return k.store.plugins.Settings={...k.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var bo=new S("PluginManager"),zt={},Qn=new Set;function Nl(t){if(zt[t.name]){bo.warn("Duplicate plugin",t.name);return}zt[t.name]=t,Sl(t.name,t.settings)}function rn(t){let e=zt[t];if(!e)return!1;if(e.required)return!0;let n=k.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function Rl(t){let e=zt[t];if(!e||e.required)return;let n=!rn(t);k.plain.plugins[t]||(k.store.plugins[t]={}),k.store.plugins[t].enabled=n,n?Il(e):$m(e),Ee("pluginToggle",{name:t,enabled:n})}function Il(t,e=!1){if(!Qn.has(t.name)&&rn(t.name))try{t.managedStyle&&pl(t.managedStyle),t.start?.(),Qn.add(t.name),t.settings&&k.addPrefixChangeListener(`plugins.${t.name}.`,()=>{Qn.has(t.name)&&t.onSettingsChange?.()}),e||bo.debug("Started",t.name)}catch(n){bo.error("Failed to start",t.name,n)}}function $m(t){if(Qn.has(t.name)){try{t.stop?.()}catch(e){bo.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(gl(t.managedStyle),w(t.managedStyle)),Qn.delete(t.name)}}function tr(t){for(let e of Object.values(zt))(e.startAt??"DOMContentLoaded")===t&&Il(e)}var Al=2,Hl="defaultsRev";function Pl(){let t=k.plain.plugins.Settings;if(!(!t||t[Hl]===Al)){for(let e of["NoShareLink","NoDictation"]){let n=k.plain.plugins[e];!n||typeof n.enabled=="boolean"||(n.enabled=!1)}t[Hl]=Al}}var er=!1,ho=!1,da=!1,Bl=[],Dl=[],$l=[];function ma(t){let e=t.splice(0);for(let n of e)n()}function nr(){er||(er=!0,ma(Bl))}function fa(){ho||(ho=!0,er||nr(),ma(Dl))}function _l(){da||(da=!0,er||nr(),ho||fa(),ma($l))}function yo(t){er?t():Bl.push(t)}function vo(t){ho?t():Dl.push(t)}function xo(t){da?t():$l.push(t)}function wo(){nr()}function on(){nr(),fa()}function Eo(){_l()}function Ol(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function ql(){await Ol(4e3),nr(),await Ol(4e3),fa(),_l()}var v={p:"0-V-linuxdo"},et="[20260924] v1.4.77",Fl="https://github.com/0-V-linuxdo/Bloom";var _m={BetterNavigator:1790228006e3,ChatListStatus:1789915545e3,ChatStateFavicons:1790228892e3,Cleaner:1789910872e3,ComposerOpacity:1789910872e3,CustomSidebarIdentity:1789970413e3,GreetingCustomizer:1789861316e3,InputHistory:1789858186e3,MessageTimestamps:1789915545e3,NoDictation:1789910872e3,NoShareLink:1789910872e3,NoSidebarIdentity:1789910872e3,PromptQueue:1789915545e3,RecentTopics:1790181019e3,ResponseNotification:1789885188e3,Settings:1789973738e3,StreamerMode:1789924346e3,WiderChat:1789910872e3};function zl(t){let e=_m[t.name];typeof e=="number"&&e>0&&(t.updatedAt=e)}function qm(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Fm(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function pa(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function Se(){return pa()?qm()||Fm():!1}function jl(){return Se()}var zm=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Gl=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),jm=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Gm="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function sn(t){return t.id==="bloom-root"||!!t.closest(Gm)}function Ul(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function So(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function ga(t){if(!(t instanceof HTMLElement)||!t.isConnected||sn(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&So(e)?!1:t.getClientRects().length>0}function an(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function Um(){let t=[];for(let e of document.querySelectorAll(zm))!(e instanceof HTMLElement)||!e.isConnected||sn(e)||t.push(e);return t}function Lo(t){if(!t.isConnected||sn(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function Le(){return Um().filter(Lo)[0]??null}function ln(){let t=document.getElementById("stage-sidebar-tiny-bar");if(!(t instanceof HTMLElement)||!t.isConnected||sn(t))return null;let e=t.getBoundingClientRect();return e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3?null:t}function ba(t){let e=t,n=t.parentElement;n&&n.children.length===1&&!sn(n)&&!an(n)&&n.parentElement&&!an(n.parentElement)&&(e=n);let r=e.parentElement;if(r&&!an(r)&&!sn(r)&&r.children.length>1){let o=r.getAttribute("class")||"";if(/\bflex\b/.test(o)&&!/flex-col/.test(o)&&r.parentElement&&!an(r.parentElement))return r}return e}function cn(){let t=document.querySelectorAll(Gl);for(let n of t)if(ga(n)&&!So(n)&&Ul(n))return n;let e=document.querySelectorAll(jm);for(let n of e){if(!ga(n)||!Ul(n)||So(n))continue;let r=n.querySelector(Gl);return ga(r)&&!So(r)?r:n}return null}function To(){let t=Le();if(t){let e=ba(t),n=e.parentElement;if(n&&!an(n))return n;if(!an(e))return e}return ln()}function ko(t){let e=Le();return e?t.composedPath().includes(e):!1}var ya=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Km={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Wm(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Vm(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function ha(t){let e=Wm(t);return e?Vm(e)>.55?"light":"dark":null}function Ym(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=ha(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=ha(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=ha(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Co(t){return t==="auto"?Ym():t}function Xm(t){try{let e=getComputedStyle(document.documentElement);for(let n of ya){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function Mo(t,e,n){let r=Km[e];if(n){Xm(t);for(let o of ya)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of ya)t.style.setProperty(o,r[o])}function Kl(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var va=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var Jm="bloom-root",kt="bloom-rail-item",Io="bloom-account-item",ke="bloom-sidebar-panel",dr="bloom-plugin-dialog",qo="bloom-plugin-layer",Po="bloom-settings-css",Qm=2e3,Yl=null,tf=null,ae=!1,Sa=[],Ao=null,Oo=null,oe=null,No=null,jt=null,lr=null,rr,un=0,cr=0,or=0,ir=null,ar=null,Bo=null,Xl=null,sr=null,xa=[],Do=!1,ef=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],nf=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],rf=new Set(["chat","ui","privacy"]),of=10080*60*1e3,Fo="",ur="all",Tt="all";function zo(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Zl(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function af(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'}function sf(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function lf(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function cf(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var uf={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function df(t){return t.icon||uf[t.name]||zo()}function wa(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),Mo(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function Jl(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function $o(){let t="auto",e=Co(t);wa(Yl,e,!0);let n=document.getElementById(ke);n instanceof HTMLElement&&wa(n,e,!0);let r=document.getElementById(dr);r instanceof HTMLElement&&wa(r,e,!0);let o=document.getElementById(kt);o instanceof HTMLElement&&Jl(o),Ee("schemeChange",{scheme:e,pref:t})}function Ql(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function tc(){if(E("settings",va),document.getElementById(Po)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=Po,t.textContent=va,document.head.appendChild(t)}function mf(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function ff(){for(let t of Sa)t();Sa=[]}function ec(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function pf(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function ka(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function gf(t){return ka(t).length>0}function Ro(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function bf(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=pf(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function hf(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(bf(e,n));let i=k.store.plugins[t]??(k.store.plugins[t]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",Sa.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??Ro(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??Ro(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=ec(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??Ro(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function Wl(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function yf(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=k.store.plugins[t.name]??(k.store.plugins[t.name]={});for(let[n,r]of ka(t)){if(n==="enabled"||r.type===5)continue;let o=Ro(r);o!==void 0&&(e[n]=o)}rc(t)}function nc(t){t.key==="Escape"&&(!document.getElementById(qo)&&!document.getElementById(dr)||(t.stopPropagation(),dn()))}function vf(){Do||(document.addEventListener("keydown",nc),Do=!0)}function xf(){Do&&(document.removeEventListener("keydown",nc),Do=!1)}function dn(){ff(),xf(),document.getElementById(qo)?.remove(),document.getElementById(dr)?.remove()}function rc(t){if(dn(),!document.body)return;let e=document.createElement("div");e.id=qo,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",ie),e.addEventListener("pointerup",ie),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&dn()});let n=document.createElement("div");n.id=dr,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",ie),n.addEventListener("pointerup",ie),n.addEventListener("click",ie);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=Zl(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),dn()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=Wl("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=Wl("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=ka(t);if(c.length)for(let[u,d]of c){let f=hf(t.name,u,d);f&&l.appendChild(f)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>yf(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),vf(),$o()}function wf(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=df(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=Cl(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=lf(l),c.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let m=Ml(t.name);Ee("pluginStar",{name:t.name,starred:m})}),s.appendChild(c),!t.required){let b=Tl(t.name),m=document.createElement("button");m.type="button",m.className=`bloom-icon-btn bloom-card-pin${b?" bloom-card-pin-active":""}`,m.setAttribute("aria-label",b?"Unpin from top":"Pin to top"),m.innerHTML=cf(b),m.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();let A=kl(t.name);Ee("pluginPin",{name:t.name,pinned:A})}),s.appendChild(m)}if(gf(t)){let b=document.createElement("button");b.type="button",b.className="bloom-icon-btn bloom-card-settings",b.setAttribute("aria-label",`${t.name} settings`),b.innerHTML=sf(),b.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation(),rc(t)}),s.appendChild(b)}let u=ec(t.name,rn(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",b=>b.stopPropagation()),d?.addEventListener("change",()=>{Rl(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let b=document.createElement("div");b.className="bloom-card-desc",b.textContent=t.description,n.appendChild(b)}let f=document.createElement("div");f.className="bloom-card-separator";let h=document.createElement("div");h.className="bloom-card-footer";let g=document.createElement("div");return g.className="bloom-card-author",g.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",h.appendChild(g),e.append(n,f,h),e}function oc(){return Object.values(zt).filter(t=>!t.hidden&&t.name!=="Settings")}function Ef(t){return t.updatedAt!=null&&Date.now()-t.updatedAt<of}function ic(t,e){if(e==="all"||e==="favorites")return!0;if(e==="recent")return Ef(t);let n=(t.tags??[]).map(r=>r==="sidebar"?"ui":r);return e==="other"?!t.required&&!n.some(r=>rf.has(r)):n.includes(e)}function Sf(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function Lf(){return Fo.trim()?"No plugins match your search.":Tt==="favorites"?"No favorites yet. Star a plugin to see it here.":Tt==="recent"?"No plugins updated in the last 7 days.":"No plugins available."}function Tf(){let t=oc();return nf.filter(e=>e.id==="favorites"||e.id==="all"||e.id==="recent"?!0:t.some(n=>ic(n,e.id)))}function kf(){if(sr){sr.replaceChildren();for(let t of Tf()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${Tt===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{Tt=t.id,Te()}),sr.appendChild(e)}}}function Cf(){let t=oc();if(Tt==="favorites"){let e=new Set(go());t=t.filter(n=>e.has(n.name))}else Tt!=="all"&&(t=t.filter(e=>ic(e,Tt)));return ur==="enabled"&&(t=t.filter(e=>rn(e.name))),ur==="disabled"&&(t=t.filter(e=>!rn(e.name))),t}function Te(){if(!ir)return;kf();let t=Cf();Bo&&(Bo.placeholder=`Search ${t.length} plugins...`);let e=t,n=Fo.trim().toLowerCase();if(n&&(e=e.filter(r=>Sf(r).includes(n))),Tt==="recent")e=e.slice().sort((r,o)=>(o.updatedAt??0)-(r.updatedAt??0)||r.name.localeCompare(o.name));else if(Tt!=="favorites"){let r=po();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}ir.replaceChildren();for(let r of e)ir.appendChild(wf(r));ar&&(ar.hidden=e.length>0,ar.textContent=Lf())}function ie(t){t.stopPropagation()}function Ea(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function Ca(){document.getElementById(kt)?.setAttribute("aria-expanded",ae?"true":"false")}function Mf(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function Ma(){dn(),Fo="",ur="all",Tt="all",document.getElementById(ke)?.remove(),ae=!1,Ca()}function Af(t){let e=document.createElement("div");e.id=t,e.setAttribute("aria-labelledby","bloom-settings-title"),e.addEventListener("pointerdown",ie),e.addEventListener("pointerup",ie),e.addEventListener("click",ie);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=zo();let a=document.createElement("span");a.className="bloom-settings-title-row";let s=document.createElement("h2");s.id="bloom-settings-title",s.textContent="Bloom++";let l="Toggle features. Some need a reload. Click the sliders icon to configure.",c=document.createElement("button");c.type="button",c.className="bloom-info-hint",c.setAttribute("aria-label",l),c.innerHTML=af();let u=document.createElement("span");u.className="bloom-info-hint-tip",u.setAttribute("role","tooltip"),u.textContent=l,c.appendChild(u),a.append(s,c),o.append(i,a);let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn bloom-settings-close",d.setAttribute("aria-label","Close"),d.innerHTML=Zl(),d.addEventListener("click",Ma),r.appendChild(o),n.appendChild(r);let f=document.createElement("div");f.className="bloom-plugin-tabs",n.appendChild(f);let h=document.createElement("div");h.className="bloom-search-bar";let g=document.createElement("input");g.type="search",g.className="bloom-search-input",g.setAttribute("aria-label","Search plugins"),g.placeholder="Search plugins...",g.addEventListener("input",()=>{Fo=g.value,Te()});let b=document.createElement("select");b.className="bloom-search-filter",b.setAttribute("aria-label","Filter plugins");for(let A of ef){let N=document.createElement("option");N.value=A.value,N.textContent=A.label,b.appendChild(N)}b.value=ur,b.addEventListener("change",()=>{ur=b.value,Te()}),h.append(g,b),n.appendChild(h);let m=document.createElement("div");m.className="bloom-plugin-list",n.appendChild(m);let T=document.createElement("p");return T.className="bloom-tab-empty",T.hidden=!0,n.appendChild(T),e.append(d,n),ir=m,ar=T,Bo=g,Xl=b,sr=f,Te(),e}function Hf(t){t.classList.add("bloom-rail-dock")}function Nf(){let t=document.getElementById(kt);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&Lo(t)?t:null}function Rf(){if(document.getElementById(ke)?.remove(),!document.body)return;let t=Af(ke);Hf(t),document.body.appendChild(t),ae=!0,dn(),$o(),Ca(),Ee("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:et,dock:"center",rail:!!Nf()})}function Aa(){let t=document.getElementById(ke);if(t instanceof HTMLElement&&t.isConnected&&Mf(t)){Ma();return}t?.remove(),Rf()}function If(){let t=document.createElement("button");return t.type="button",t.id=kt,t.className="bloom-rail-item",t.setAttribute("aria-controls",ke),t.setAttribute("aria-expanded",ae?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${zo()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Aa()}),t}function Vl(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function Pf(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function Of(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function re(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function ac(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=Pf(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&re(t,"padding-top",Math.round(i)),Number.isFinite(a)&&re(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));re(n,"width",l),re(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&re(t,"padding-left",u);let d=Of(e,r);if(d){let f=d.getBoundingClientRect(),h=n.getBoundingClientRect(),g=Math.round(f.left-h.right);g>=0&&g<=24&&re(t,"gap",g)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&re(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&re(t,"gap",Math.round(l))}Jl(t)}function La(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function Bf(){if(lr?.isConnected&&jt){jt.observe(lr,{childList:!0});return}Ta()}function Df(t){if(La(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function $f(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){or=0;return}or+=1,cr=Date.now()+Math.min(8e3,250*2**Math.min(or,5))})}function _f(){un||Date.now()<cr||(un=requestAnimationFrame(()=>{un=0,!(Date.now()<cr)&&(document.getElementById(kt)?.isConnected||_o())}))}function _o(){if(!document.body)return;jt?.disconnect();let t=null,e=!1;try{let n=document.getElementById(kt);t=n instanceof HTMLButtonElement?n:If();let r=Le(),o=ln();if(r){let i=ba(r),a=i.parentElement;if(La(i)||a&&La(a))return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),Vl(t),ac(t,r)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),Vl(t,!0)):t.isConnected&&!Lo(t)&&(t.remove(),t=null)}finally{$f(t,e),Bf(),Ca()}}function Ta(){let t=To();!t||!Df(t)||lr===t&&jt||(jt?.disconnect(),lr=t,jt=new MutationObserver(()=>{document.getElementById(kt)?.isConnected||_f()}),jt.observe(t,{childList:!0}))}function qf(){_o(),Ta(),rr===void 0&&(rr=window.setInterval(()=>{let t=document.getElementById(kt);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=cr&&_o();else{or=0;let e=Le();e&&ac(t,e)}Ta()},Qm))}function Ff(){rr!==void 0&&(clearInterval(rr),rr=void 0),un&&cancelAnimationFrame(un),un=0,cr=0,or=0,jt?.disconnect(),jt=null,lr=null}function zf(t){No===t&&oe||(oe?.disconnect(),No=t,oe=new MutationObserver(()=>{if(!t.isConnected){oe?.disconnect(),oe=null,No=null;return}sc(t)}),oe.observe(t,{childList:!0}))}function sc(t){if(zf(t),t.querySelector(`#${Io}`))return;let e=document.createElement("button");e.type="button",e.id=Io,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${zo()}<span>Bloom++</span>`,e.addEventListener("pointerdown",Ea),e.addEventListener("pointerup",Ea),e.addEventListener("click",n=>{Ea(n),Aa()}),t.insertBefore(e,t.firstChild)}function Ho(){let t=cn();return t?(sc(t),!0):!1}function jf(t){ko(t)&&(queueMicrotask(Ho),requestAnimationFrame(()=>{Ho()}),window.setTimeout(Ho,60),window.setTimeout(Ho,180))}function Gf(){Oo?.abort();let t=new AbortController;Oo=t,document.addEventListener("click",jf,{signal:t.signal})}function Uf(){Oo?.abort(),Oo=null,oe?.disconnect(),oe=null,No=null}function lc(){on(),mf(()=>{tc(),Ql(),_o(),Aa()})}var cc=y({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[v.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${Jm}`,`#${kt}`,`#${Io}`,`#${ke}`,`#${qo}`,`#${dr}`,`#${Po}`,"#bloom-menu-panel"],start(){tc(),Ql(),qf(),Gf(),Ao?.(),Ao=Kl($o),$o(),xa=[en("pluginToggle",()=>{ae&&Te()}),en("pluginPin",()=>{ae&&Te()}),en("pluginStar",()=>{ae&&Te()})]},stop(){Ff(),Uf(),Ao?.(),Ao=null;for(let t of xa)t();xa=[],Ma(),document.getElementById(kt)?.remove(),document.getElementById(Io)?.remove(),document.getElementById(Po)?.remove(),Yl=null,tf=null,ir=null,ar=null,Bo=null,Xl=null,sr=null,ae=!1}});var jo='form[data-type="unified-composer"], form.w-full[data-type]',Ct=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),mn=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),uc=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),dc=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Kf=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Wf='[contenteditable="false"], button, [role="button"]';function gt(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function Ce(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!gt(o)))return o;return null}function mc(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function P(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=mc(t);return!!(Kf.test(n)||/^stop$/i.test(n))}function bt(){let e=Array.from(document.querySelectorAll(jo)).find(gt);if(e instanceof HTMLElement)return e;let n=Ce(document,Ct),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function W(){let t=Array.from(document.querySelectorAll(Ct));return t.find(gt)??t[0]??null}function Vf(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(Wf);return!!n&&n!==e&&e.contains(n)}function Ha(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&Vf(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function ht(t){let e=t??W();return e?Ha(e,e).replaceAll("\u200B","").trim().length>0:!1}function se(t){return!ht(t)}function Go(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function fc(t){let e=bt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!gt(n))&&t(n))return n;return null}function le(){let t=bt(),e=Ce(t,mn)??Ce(document,mn);return e&&!P(e)?e:fc(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!P(n);let o=mc(n);return/^(send|send prompt|发送)$/i.test(o)&&!P(n)})}function Me(){let t=bt(),e=Ce(t,uc,!0)??Ce(document,uc,!0);if(e)return e;let n=Ce(t,dc)??Ce(document,dc);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&gt(r)&&P(r))return r}return fc(P)}function nt(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>Ha(n,t)).join(`
`):Ha(t,t)}function Na(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function Gt(t,e,n=!1){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),Na(t,n)}var pc=/\/c\/([a-zA-Z0-9_-]{8,})/i;function rt(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function Ut(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function fn(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(pc)?.[1]??""}catch{return t.match(pc)?.[1]??""}}function M(){let t=fn(location.pathname);if(t)return t;let n=rt().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return""}var yc=new S("Harvest"),Yf=1500,Xf=200,Uo=new Set,Ko=new Map,Wo=new Map,pn=null,Vo=null,mr=null,Mt=0;function Zf(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Jf(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function Qf(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}function vc(t){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(t)}var tp=/"action"\s*:\s*"(next|continue|variant)"/i;function ep(t,e,n){return!(e!=="POST"||vc(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!tp.test(n))}function np(t,e){return e!=="GET"||vc(t)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(t)}function gc(t){return t.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function xc(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function rp(t){return typeof t=="string"?xc(t):""}function Ra(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return Ra(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function wc(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function bc(t,e,n){!t||!e||Wo.get(t)!==e&&(Wo.set(t,e),wc(Wo,Yf),ce({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function op(t,e){let n=e.trim();!t||!n||Ko.get(t)!==n&&(Ko.set(t,n),wc(Ko,Xf),ce({type:"conversation-meta",conversationId:t,title:n}))}function fr(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)fr(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&op(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=Ra(l.create_time??l.createTime??l.created_at);c&&u&&bc(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=Ra(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&bc(a,s,o),r.mapping&&typeof r.mapping=="object")fr(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&fr(l,o,n+1)}function hc(t,e){if(t)try{fr(JSON.parse(t),e)}catch{}}function ce(t){for(let e of Array.from(Uo))try{e(t)}catch{}}async function ip(t,e,n){if(n===Mt)try{let r=await t.json();if(n!==Mt)return;fr(r,e)}catch{}}async function ap(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===Mt&&ce({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===Mt;){let{done:u,value:d}=await s.read();if(u)break;if(c+=l.decode(d,{stream:!0}),!o){let h=xc(c);h&&(o=h,ce({type:"post-start",conversationId:o,url:""}))}let f=c.split(`
`);c=f.pop()??"";for(let h of f){let g=h.replace(/^data:\s*/,"").trim();!g||g==="[DONE]"||hc(g,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===Mt&&hc(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===Mt&&ce({type:"post-end",conversationId:o,error:i})}function sp(t,e,n){let r=Jf(e),o=Qf(e,n),i=np(r,o),a=ep(r,o,n?.body),s=Mt,l="";return a&&(l=rp(n?.body)||gc(r)||fn(r)||M(),ce({type:"post-start",conversationId:l,url:r})),t(e,n).then(c=>{if(s!==Mt||!i&&!a)return c;try{let u=c.clone();i?ip(u,gc(r)||M(),s):ap(u,l,!c.ok,s)}catch{a&&ce({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===Mt&&ce({type:"post-end",conversationId:l,error:!0}),c})}function lp(){if(pn)return;let t=Zf();mr=t,pn=t.fetch.bind(t);let e=(n,r)=>sp(pn,n,r);Vo=e,t.fetch=e,yc.debug("conversation fetch harvest hooked")}function cp(){Mt+=1,!(!pn||!mr)&&(Vo&&mr.fetch===Vo&&(mr.fetch=pn),pn=null,Vo=null,mr=null,yc.debug("conversation fetch harvest unhooked"))}function ot(t){return Uo.add(t),lp(),()=>{Uo.delete(t),Uo.size===0&&cp()}}function gn(t){return t?Ko.get(t)??"":""}function Yo(t){return t?Wo.get(t)??null:null}var Sc=new S("Streaming");function vr(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!gt(e))&&(P(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function up(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&gt(t))}function dp(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&gt(t))}function mp(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function At(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function _(){if(Me()||vr()||mp())return!0;let t=le();return t&&gt(t)&&!P(t)?!1:!!(up()||dp())}var fp=400,Ec=3,Re=new Set,pr,gr=null,Ia=null,Ne=!1,Ae=0,de="",it="",br=!1,hr=!1,yr=!1,He=!1,$=null;function Lc(){return Ut(rt())}function Xo(t,e){return{streaming:t,contextKey:e,conversationId:M()}}function q(t,e){if(!t||t===e)return!1;if(t.endsWith("|draft")&&!e.endsWith("|draft"))return!0;try{let n=t.split("|")[0],r=e.split("|")[0],o=new URL(n).pathname.replace(/\/$/,"")||"/",i=new URL(r).pathname.replace(/\/$/,"")||"/";if((o==="/"||o==="")&&i.startsWith("/c/"))return!0}catch{}return!1}function Zo(){Ne=!1,Ae=0,de="",br=!1,hr=!1,yr=!1}function pp(t){for(let e of Array.from(Re))try{e.onFall?.(t)}catch{}}function gp(t){for(let e of Array.from(Re))try{e.onRise?.(t)}catch{}}function ue(t){for(let e of Array.from(Re))try{e.onTick?.(t)}catch{}}function bp(t,e){for(let n of Array.from(Re))try{n.onContext?.(t,e)}catch{}}function hp(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&P(n)&&(br=!0)}function yp(t){t.type==="post-end"&&(!Ne&&!$||(yr=!0,t.error&&(hr=!0,$&&($.error=!0))))}function vp(){let t=Lc(),e=_();if(it&&t&&it!==t){if(bp(t,it),q(it,t)){if(de===it&&(de=t),$&&$.contextKey===it){$.contextKey=t;let o=M();o&&($.conversationId=o)}He=!1,it=t}else if($=null,Zo(),He=e,it=t,He){ue(Xo(!1,t));return}}else t&&(it=t);if(He){if(e){ue(Xo(!1,t));return}He=!1}if($)if(e||$.contextKey!==t)$=null;else{let o=$;$=null,Zo(),pp(o),ue(Xo(!1,t));return}let n=Xo(e,t);if(e){let o=!Ne;o&&(br=!1,hr=!1,yr=!1),Ne=!0,Ae=0,de=t,o&&gp(n),ue(n);return}if(!Ne){ue(n);return}if(Ae+=1,yr&&(Ae=Math.max(Ae,Ec)),Ae<Ec){ue(n);return}if(!(!!de&&de===t)){Zo(),ue(n);return}$={contextKey:de||t,conversationId:M(),userStopped:br,error:hr||At()},ue(n)}function xp(){pr===void 0&&(Ne=_(),it=Lc(),de=Ne?it:"",Ae=0,br=!1,hr=!1,yr=!1,He=!1,$=null,gr?.abort(),gr=new AbortController,document.addEventListener("click",hp,{capture:!0,signal:gr.signal}),Ia=ot(yp),pr=setInterval(vp,fp),Sc.debug("watchStreamingEdge started"))}function wp(){Re.size||(pr!==void 0&&(clearInterval(pr),pr=void 0),gr?.abort(),gr=null,Ia?.(),Ia=null,Zo(),it="",He=!1,$=null,Sc.debug("watchStreamingEdge stopped"))}function X(t){let e=typeof t=="function"?{onFall:t}:t;return Re.add(e),xp(),()=>{Re.delete(e),wp()}}var Tc="bloom-host-icon",xr="data-bloom-host-rel",Pa="not all",Oa=0,kc=0,Ep=400;function Cc(t){Oa+=1;try{t()}finally{Oa-=1}}function Jo(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function me(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function Mc(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function Sp(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Lp(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-kc<Ep||(kc=n,t.appendChild(e))}function Tp(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||Jo(n)&&(n.getAttribute(xr)||n.setAttribute(xr,n.rel),n.media!==Pa&&(n.media=Pa),n.rel!==Tc&&(n.rel=Tc))}function kp(t){for(let e of t.querySelectorAll(`link[${xr}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(xr);n&&(e.rel=n),e.removeAttribute(xr),e.media===Pa&&e.removeAttribute("media")}}function Ac(t,e){let{head:n}=document;!n||!e||Cc(()=>{Tp(n,t);let r=Mc(t),{type:o,sizes:i}=Sp(e);r?Lp(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function Hc(t,e){let{head:n}=document;n&&Cc(()=>{Mc(t)?.remove(),kp(n)})}function Nc(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(Oa)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:Jo(c.target)&&(a=!0,me(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)Jo(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)Jo(u)&&u.id!==t&&(a=!0,me(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var Cp=["original","badge","dot","hole","bg"],Pc=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],Oc={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Qo="#FCFCFC",Mp="#111111",Rc="#111111",Ap="#ffffff",Hp="#212121",Np="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Rp={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},ti=32,Ic=64;function Bc(t){return typeof t=="string"&&Cp.includes(t)}function Ip(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function ei(t){let e=document.createElement("canvas");e.width=ti,e.height=ti;let n=e.getContext("2d");return n?(n.scale(ti/Ic,ti/Ic),t(n),e.toDataURL("image/png")):""}function Pp(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function ni(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(Np);n&&(t.strokeStyle=Mp,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function Op(t,e,n){let r=Oc[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=Rc,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=Rc,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=Ap,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function wr(t,e){if(t==="original")return e==="wait"?ei(r=>ni(r,Qo)):Ip(Rp[e]);let n=e==="wait"?void 0:Oc[e];return ei(t==="hole"?r=>ni(r,n??Qo):t==="bg"?r=>{r.fillStyle=n??Hp,Pp(r,0,0,64,64,14),r.fill(),ni(r,Qo,!1)}:r=>{ni(r,Qo),e!=="wait"&&Op(r,e,t==="dot"?"dot":"badge")})}function Dc(t){return{wait:wr(t,"wait"),rotate:wr(t,"rotate"),done:wr(t,"done"),ready:wr(t,"ready"),error:wr(t,"error")}}var Bp=new S("ChatStateFavicons"),Oe="bloom-chat-state-favicon",jc=["input","beforeinput","cut","paste","compositionend"],Gc=L({style:{type:3,description:"Favicon overlay",options:Pc}}),Nt="",Da={wait:"",rotate:"",done:"",ready:"",error:""},Er="wait",Ie=!1,Ht=!1,V=null,J="",st="",Be=!0,ii=!1,bn=null,lt=0,ri=null,oi=null,Pe=null,Ba=null,hn=null,yt=!1,$c=new WeakSet;function Dp(){let t=Gc.store.style;return Bc(t)?t:"bg"}function Uc(){let e=document.querySelector(`link[rel~="icon"]:not(#${Oe}), link[data-bloom-host-rel]:not(#${Oe})`)?.href;return me(e)?e:me(Nt)?Nt:""}function $p(){let t=document.getElementById(Oe);return t instanceof HTMLLinkElement?t:null}function _p(){if(!me(Nt)){let t=Uc();t&&(Nt=t)}return me(Nt)?Nt:Da.wait}function Kc(t){return t==="wait"?_p():Da[t]}function Wc(){Ac(Oe,Kc(Er))}function at(t){let e=Kc(t);if(Er===t){let n=$p();if(n&&n.getAttribute("href")===e)return}Er=t,Wc()}function _c(){Da=Dc(Dp()),at(Er)}function Vc(){return Ut(rt())}function $a(t,e){!t||!e||t===e||(V===t&&(V=e),J===t&&(J=e),st===t&&(st=e))}function qp(){let t=Vc();if(!(_()||Ie||Ht))return J="",t;if(J&&t&&J!==t)if(q(J,t))$a(J,t),J=t;else return J="",t;else!J&&t&&(J=t);return J||t}function qc(t){return!V||!t?!1:V===t?!0:q(V,t)}function Yc(){Ie=!1,Ht=!1,V=null,J=""}function Xc(t){st=t,Yc(),Be=!1,ii=!0,at("wait")}function Fc(t){return!t&&Be}function Fp(){if(!yt)return;let t=Vc();if(st&&t&&st!==t&&!q(st,t)){Xc(t);return}st&&t&&q(st,t)&&$a(st,t),t&&(st=t);let e=_();if(ii){if(e){at("wait");return}ii=!1}let n=qp(),r=se();if(At()&&!e){at("error"),Ie=!1,Ht=!1,V=null;return}if(e){Ie||(Be=!1),Ie=!0,Ht=!1,V=n,at("rotate");return}if(Ie){let o=qc(t);if(Ie=!1,o){Ht=!0,V=t||n,at("done");return}Ht=!1,V=null}if(Ht)if(V&&t&&!qc(t))Ht=!1,V=null;else if(r){V=n||V,at("done");return}else if(Fc(r)){Ht=!1,at("ready");return}else{Ht=!1,at("wait");return}V=null,r?at("wait"):Fc(r)?at("ready"):at("wait")}function fe(){yt&&(eu(),Jc(),Qc(),Fp())}function Zc(){if(hn){for(let t of jc)hn.removeEventListener(t,tu,!0);hn=null}}function Jc(){let t=bt(),e=t&&t!==document.body?t:null;if(!(hn===e&&e?.isConnected)&&(Zc(),!!e)){hn=e;for(let n of jc)hn.addEventListener(n,tu,{capture:!0,passive:!0})}}function Qc(){let t=bt();if(!(Pe&&Ba===t&&t.isConnected)){if(Pe?.disconnect(),Ba=t,!t||t===document.body){Pe=null;return}Pe=new MutationObserver(()=>ai()),Pe.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function ai(){if(yt){if(document.hidden){lt&&(cancelAnimationFrame(lt),lt=0),fe();return}lt||(lt=requestAnimationFrame(()=>{lt=0,yt&&fe()}))}}function tu(){ht()&&(Be=!0),ai()}function zc(){ht()&&(Be=!0),ai()}function zp(){yt&&(lt&&(cancelAnimationFrame(lt),lt=0),fe())}function jp(){yt&&(Be=!1,fe())}function Gp(){yt&&fe()}function Up(){yt&&fe()}function Kp(t,e){if(yt){if(q(e,t)){$a(e,t),st=t,fe();return}Xc(t)}}function eu(){let t=W();!t||$c.has(t)||($c.add(t),t.addEventListener("input",zc,{capture:!0,passive:!0}),t.addEventListener("compositionend",zc,{capture:!0,passive:!0}))}var nu=y({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Gc,startAt:"DOMContentLoaded",cleanupSelectors:[`#${Oe}`],start(){yt=!0,Nt=Uc()||Nt,_c(),oi?.disconnect(),oi=Nc(Oe,t=>{me(t)&&(Nt=t),Wc()}),bn?.abort(),bn=new AbortController,window.addEventListener("popstate",ai,{signal:bn.signal}),document.addEventListener("visibilitychange",zp,{signal:bn.signal}),eu(),Jc(),Qc(),ri?.(),ri=X({onRise:jp,onFall:Gp,onTick:Up,onContext:Kp}),fe(),Bp.debug("favicon watch started")},stop(){yt=!1,lt&&cancelAnimationFrame(lt),lt=0,ri?.(),ri=null,bn?.abort(),bn=null,Zc(),Pe?.disconnect(),Pe=null,Ba=null,oi?.disconnect(),oi=null,Yc(),st="",Be=!0,ii=!1,Er="wait",Hc(Oe,Nt)},onSettingsChange:_c});var ru=`.bloom-ih-hud {
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
`;var Pv=new S("InputHistory"),_a=/\u200B/g,ou=10,iu=500,au=100,Vp=8,Yp=120,Xp=2e3,si=10,li=L({maxEntries:{type:4,description:"Max stored prompts",min:ou,max:iu,default:au},history:{type:5,description:"Stored prompts",render:dg},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),qa=new Map,F=0,Fa="",Rt=!1,Lr=!1,Ga=0,Sr=null,za,Ua=null,su=!0;function vt(){let t=li.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function lu(t){let e=K(Number(li.store.maxEntries??au),ou,iu);return t.length>e?t.slice(t.length-e):t}function ci(t){li.store.entries=lu(t)}function Zp(t){return t.replaceAll(_a,"").replace(/\n$/,"").trim()}function ja(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Ct);return n instanceof HTMLElement?n:W()}function Jp(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!nt(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(_a,"").trim().length===0,last:i.toString().replaceAll(_a,"").trim().length===0}}catch{return{first:!0,last:!0}}}function cu(t){clearTimeout(za),za=setTimeout(()=>{if(t!==Ga)return;Lr=!1;let e=Ua;e&&Na(e,su)},Yp)}function uu(t,e,n){Lr=!0,Ua=t,su=n;let r=++Ga;Gt(t,e,n),cu(r)}function Qp(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function yn(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function tg(){document.querySelector(".bloom-ih-hud")?.remove()}function eg(t,e){let n=Qp();n.textContent=t;let r=(e.closest("form")??bt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-Vp)}px`,n.classList.add("bloom-ih-hud-on")}function Ka(t){let e=Zp(t);if(!e)return;let n=Date.now(),r=qa.get(e);if(r&&n-r<Xp)return;qa.set(e,n);let o=vt().filter(i=>i!==e);o.push(e),ci(o),F=vt().length,Rt=!1,yn()}function ng(t,e){let n=vt();if(!n.length&&t)return;F>=n.length&&(Fa=nt(e),F=n.length);let r=t?F-1:F+1;r<0||r>n.length||(F=r,Rt=!0,uu(e,r===n.length?Fa:n[r],t),r<n.length?eg(`${r+1} / ${n.length}`,e):yn())}function rg(t){Rt=!1,yn(),uu(t,Fa,!1),F=vt().length}function og(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=ja(t.target)??ja(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&Rt&&!t.altKey&&!t.shiftKey){rg(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){Ka(nt(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=vt();if(!r){let i=Jp(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||F<=0)||!n&&F>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),ng(n,e))}function ig(t){if(ja(t.target)){if(Lr){cu(Ga);return}Rt&&(Rt=!1,yn(),F=vt().length)}}function ag(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(Ct);n instanceof HTMLElement&&Ka(nt(n))}function sg(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(mn);if(!n||!(n instanceof HTMLElement)||P(n))return;let r=W();r&&Ka(nt(r))}function lg(t){if(!(!Rt||Lr)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}Rt=!1,yn()}}function cg(){if(Sr)return;Sr=new AbortController;let{signal:t}=Sr,e={capture:!0,signal:t};window.addEventListener("keydown",og,e),window.addEventListener("input",ig,e),window.addEventListener("submit",ag,e),window.addEventListener("click",sg,e),window.addEventListener("pointerdown",lg,e)}function ug(t){let e=vt().slice();e.splice(t,1),ci(e),F>e.length&&(F=e.length)}function dg(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=vt().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(m=>m.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/si));n>=l&&(n=l-1);let c=s.slice(n*si,n*si+si);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let m=document.createElement("div");m.className="bloom-ih-list",c.forEach((T,A)=>{let N=i.indexOf(T),qt=vt().length-1-N,Lt=document.createElement("div");Lt.className="bloom-ih-item";let Z=document.createElement("button");Z.type="button",Z.className=`bloom-ih-body${r===A?"":" bloom-ih-clamp"}`,Z.textContent=T,Z.addEventListener("click",()=>{r=r===A?-1:A,o()});let R=document.createElement("div");R.className="bloom-ih-actions";let tt=document.createElement("button");tt.type="button",tt.title="Copy",tt.textContent="C",tt.addEventListener("click",()=>{xl(T)});let Ft=document.createElement("button");Ft.type="button",Ft.title="Delete",Ft.textContent="\xD7",Ft.addEventListener("click",()=>{ug(qt),o()}),R.append(tt,Ft),Lt.append(Z,R),m.appendChild(Lt)}),t.appendChild(m)}else{let m=document.createElement("p");m.className="bloom-ih-empty",m.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(m)}let d=document.createElement("div");d.className="bloom-ih-pager";let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Prev",f.disabled=n<=0,f.addEventListener("click",()=>{n-=1,o()});let h=document.createElement("span");h.textContent=`${n+1} / ${l}`;let g=document.createElement("button");g.type="button",g.className="bloom-ih-btn",g.textContent="Next",g.disabled=n+1>=l,g.addEventListener("click",()=>{n+=1,o()});let b=document.createElement("button");b.type="button",b.className="bloom-ih-clear",b.textContent="Clear all",b.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(ci([]),F=0,o())}),d.append(f,h,g,b),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var du=y({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:li,startAt:"HostReady",managedStyle:"inputHistory",start(){E("inputHistory",ru),F=vt().length,Rt=!1,cg()},stop(){Sr?.abort(),Sr=null,yn(),tg(),qa.clear(),clearTimeout(za),Lr=!1,Ua=null,Rt=!1},onSettingsChange(){let t=vt(),e=lu(t);e.length!==t.length&&ci(e),F>e.length&&(F=e.length)}});var Wa="noShareLink",mg=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],fg=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],Va=L({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function mu(t){return`${t.join(",")}{display:none!important}`}function fu(){let t=[];if(Va.store.hideShareChat!==!1&&t.push(mu(mg)),Va.store.hideShareProject!==!1&&t.push(mu(fg)),!t.length){w(Wa);return}E(Wa,t.join(`
`))}var pu=y({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Va,start:fu,onSettingsChange:fu,stop(){w(Wa)}});var hu="noDictation",pg=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],gg=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],yu=L({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function gu(t){return`${t.join(",")}{display:none!important}`}function bu(){let t=[gu(pg)];yu.store.hideDictationSettings!==!1&&t.push(gu(gg)),E(hu,t.join(`
`))}var vu=y({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:yu,start:bu,onSettingsChange:bu,stop(){w(hu)}});var Ya="noSidebarIdentity",vn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Eu=vn.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),Su=vn.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),bg=[...Eu,...Su],hg=[...Eu,...vn.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],yg=vn.map(t=>`${t} a[href^="mailto:"]`),vg=vn.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),xg=vn.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),Tr=L({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function xu(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function wg(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function Eg(){return`${xg.join(",")}{margin-block:auto!important}`}function Sg(){return`${vg.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function wu(){let t=Tr.store.hideUsername!==!1,e=Tr.store.hideEmail!==!1,n=t&&Tr.store.enlargePlan!==!1,r=t&&Tr.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(wg([...hg,...Su])),o.push(Eg())):o.push(xu(bg))),e&&o.push(xu(yg)),n&&o.push(Sg()),!o.length){w(Ya);return}E(Ya,o.join(`
`))}var Lu=y({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Tr,start:wu,onSettingsChange:wu,stop(){w(Ya)}});var Tu=`#bloom-rt-host {
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
`;var Mu=new S("RecentTopics"),En="bloom-rt-host",Au="home",Hu=/^\/c\/([a-z0-9_-]{8,})/i,Tg=/\/c\/([a-z0-9_-]{8,})/i,Nu=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,kg=new Set(["Backquote","IntlBackslash"]),Cg=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Mg=140,Ag=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),z=L({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Ag},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),ui=null,di=null,Q=!1,Nr=!1,kr=!1,It=0,De="",xn=null,Cr=null,wn,Xa=null,Za=null;function Hg(){let t=Number(z.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function Mr(){let t=z.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Qa(){let t=z.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Ru(){let t=z.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function ts(){let t=z.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function fi(t){let e=Hg();return t.length>e?t.slice(0,e):t}function Pt(t){return t===Au}function Ar(t,e=Mg){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function es(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(Hu)?.[1]??""}catch{return t.match(Tg)?.[1]??""}}function $e(){let t=(location.pathname||"/").match(Hu);if(t?.[1])return t[1];let n=rt().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return Au}function ns(t){if(Pt(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(es(r.getAttribute("href")||"")!==t)continue;let o=Ar(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return $e()===t&&e&&!/^ChatGPT$/i.test(e)?Ar(e,80):""}function Ng(t){if(Pt(t))return"New chat";let e=Qa()[t];if(e)return e;let n=gn(t);return n||ns(t)||"Chat"}function Rg(t){return ts()[t]||""}function Ig(t){return Ru()[t]||{}}function rs(t,e){if(!t||Pt(t)||!e||/^new chat$/i.test(e.trim()))return;let n=Qa();n[t]!==e&&(n[t]=e,z.store.titles=n)}function Pg(t){t.type==="conversation-meta"&&(rs(t.conversationId,t.title),Q&&Sn())}function Og(t,e){if(!t||Pt(t)||!e)return;let n=ts();n[t]!==e&&(n[t]=e,z.store.projects=n)}function Bg(t,e){if(!t||Pt(t)||!e.user&&!e.assistant)return;let n=Ru(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,z.store.previews=n)}function os(t){if(!t||Pt(t)&&z.store.includeHome===!1)return;let e=Mr().filter(n=>n!==t);e.unshift(t),z.store.visits=fi(e)}function pi(){let t=z.store.includeHome!==!1;return fi(Mr().filter(n=>t||!Pt(n))).map(n=>({id:n,title:Ng(n),project:Rg(n),preview:Ig(n)}))}function ku(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return Ar(o)}catch{return""}}function Hr(t){if(!t||Pt(t)||t!==$e())return;let e=ns(t);e&&rs(t,e);let n=ku("user"),r=ku("assistant");Bg(t,{user:n,assistant:r});let o=Pu(t);if(o){let i=Iu(o);i&&Og(t,i)}}function is(){let t=Qa(),e=ts(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${En}, #bloom-root, #bloom-sidebar-panel`))continue;let u=es(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=Ar(c.textContent||"",80);d&&!Nu.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let f=Iu(c);f&&e[u]!==f&&(e[u]=f,i=!0)}}catch{}o&&(z.store.titles=t),i&&(z.store.projects=e);let a=Mr(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(z.store.visits=fi([...a,...l]))}function Iu(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=Ar((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!Nu.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function Pu(t){if(Pt(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(es(e.getAttribute("href")||"")===t)return e}catch{}return null}function Dg(t){let e=Pu(t);if(e){e.click();return}if(Pt(t)){location.assign("/");return}location.assign(`/c/${t}`)}function $g(){let t=$e();De&&De!==t&&Hr(De),De=t,os(t),is();let e=ns(t);e&&rs(t,e),Hr(t)}function mi(){wn===void 0&&(wn=window.setTimeout(()=>{wn=void 0,$g()},120))}function _g(){xn||(xn=history.pushState.bind(history),Cr=history.replaceState.bind(history),history.pushState=function(...e){let n=xn(...e);return mi(),n},history.replaceState=function(...e){let n=Cr(...e);return mi(),n})}function qg(){xn&&(history.pushState=xn),Cr&&(history.replaceState=Cr),xn=null,Cr=null}function Fg(t){return kg.has(t.code)||t.keyCode===192?!0:Cg.has(t.key)}function Ou(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function zg(t,e){Nr=e,is(),Hr($e()),Q=!0,It=0;try{let n=$e();os(n);let r=pi();r.length>1&&(It=t?r.length-1:1)}catch(n){Mu.error("Failed to open switcher:",n)}Sn()}function Cu(t){let{length:e}=pi();e&&(It=(It+(t?-1:1)+e)%e,Sn())}function as(){if(!Q)return;let t=pi()[It];Q=!1,Nr=!1,Sn(),t&&Dg(t.id)}function Bu(){Q&&(Q=!1,Nr=!1,Sn())}function jg(t){if(Ou(t)){kr=!0;return}if((t.ctrlKey||kr)&&!t.altKey&&!t.metaKey&&Fg(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{Q?Cu(t.shiftKey):zg(t.shiftKey,!0)}catch(n){Mu.error("Hotkey failed:",n)}return}if(Q){if(t.key==="Escape"){t.preventDefault(),Bu();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),as();return}t.key==="Tab"&&(t.ctrlKey||kr)&&(t.preventDefault(),Cu(t.shiftKey))}}function Gg(t){Ou(t)&&(kr=!1,Q&&Nr&&as())}function Ug(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(mi)}function Kg(t){!Q||(t.target instanceof Element?t.target:null)?.closest(`#${En}`)||Bu()}function Wg(){document.visibilityState==="hidden"&&Hr($e())}function Ja(t=di){t instanceof HTMLElement&&Mo(t,Co("auto"),!0)}function Vg(){if(!document.body)return null;let t=document.getElementById(En);if(t instanceof HTMLElement)return di=t,Ja(t),t;t=document.createElement("div"),t.id=En;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),di=t,Ja(t),t}function Sn(){let t=Vg();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!Q){e.dataset.visible="false",e.replaceChildren();return}let n=pi();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}It>=n.length&&(It=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===It?"true":"false",s.setAttribute("aria-selected",a===It?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{It=a,as()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function Yg(){document.getElementById(En)?.remove(),di=null}var Du=y({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${En}`],settings:z,start(){E("recentTopics",Tu),De=$e(),os(De),is(),Hr(De),Xa=ot(Pg),_g(),ui=new AbortController;let{signal:t}=ui;window.addEventListener("keydown",jg,{capture:!0,signal:t}),window.addEventListener("keyup",Gg,{capture:!0,signal:t}),window.addEventListener("popstate",mi,{signal:t}),document.addEventListener("click",Ug,{capture:!0,signal:t}),document.addEventListener("click",Kg,{signal:t}),document.addEventListener("visibilitychange",Wg,{signal:t}),Za=en("schemeChange",()=>Ja())},stop(){ui?.abort(),ui=null,wn!==void 0&&(clearTimeout(wn),wn=void 0),qg(),Xa?.(),Xa=null,Za?.(),Za=null,Q=!1,Nr=!1,kr=!1,Yg()},onSettingsChange(){let t=fi(Mr());t.length!==Mr().length&&(z.store.visits=t),Q&&Sn()}});var ss="cleaner",Xg=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],Zg=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],Jg=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],Qg=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],tb=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],eb=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],_e=L({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function Ln(t){return`${t.join(",")}{display:none!important}`}function $u(){let t=[];if(_e.store.hideDownloadApps!==!1&&t.push(Ln(Xg)),_e.store.hideDisclaimer!==!1&&t.push(Ln(Zg)),_e.store.hideUpgrade!==!1&&t.push(Ln(Jg)),_e.store.hideLockedModels!==!1&&t.push(Ln(Qg)),_e.store.hideHomePromo!==!1&&t.push(Ln(tb)),_e.store.hideAds!==!1&&t.push(Ln(eb)),!t.length){w(ss);return}E(ss,t.join(`
`))}var _u=y({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:_e,start:$u,onSettingsChange:$u,stop(){w(ss)}});var bi=new S("ResponseNotification"),kn=L({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:lb},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),ls=!1,gi=null,Tn=null,Rr=null;function nb(){return document.visibilityState==="hidden"||document.hidden}function rb(){return kn.store.onlyWhenHidden===!1?!0:nb()}function ob(){let t=gn(M());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function qu(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!Tn||Tn.state==="closed")&&(Tn=new t);let e=Tn,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){bi.debug("chime failed",t)}}function ib(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){bi.debug("custom sound failed",e),qu()}}function Fu(){let t=String(kn.store.soundUrl||"").trim();t?ib(t):qu()}function ab(){let t="Bloom++",e=`${ob()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){bi.debug("notification failed",n)}}function sb(){rb()&&(kn.store.sound!==!1&&Fu(),kn.store.browserNotification!==!1&&ab())}function lb(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>Fu()),t.appendChild(e),()=>{e.remove()}}var zu=y({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:kn,start(){ls=!0,gi?.(),gi=X(t=>{if(!ls||t.userStopped||t.error)return;let e=M();t.conversationId&&t.conversationId!==e||sb()}),Rr?.abort(),Rr=new AbortController,kn.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:Rr.signal}),bi.debug("watch started")},stop(){ls=!1,gi?.(),gi=null,Rr?.abort(),Rr=null;try{Tn?.close()}catch{}Tn=null}});var ju=`#bloom-pq-chip {
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
`;var Or=new S("PromptQueue"),us="bloom-pq-chip",Gu="promptQueue",Uu=80,ub=50,db=2e3,Yu=L({replacePending:{type:2,description:"Replace the queued prompt if you Enter again while one is waiting.",default:!0}}),j=new Map,Kt=!1,xt="",D="",Wt=!1,wt=!1,B=null,Ir=null,hi=null,pe,Pr,Cn=null;function Mn(){return Ut(rt())}function An(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function Ku(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Ct);return n instanceof HTMLElement?n:W()}function ds(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function Xu(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function mb(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?An(e.innerText||e.textContent||""):""}catch{return""}}function Wu(t){if(!xt||xt===t)return;let e=j.get(xt);!e||j.has(t)||q(xt,t)&&(j.delete(xt),j.set(t,e),D===xt&&(D=t),B?.key===xt&&(B.key=t),Or.debug("migrated pending",xt,"\u2192",t))}function ms(t){let e=Mn();if(j.get(e)&&Yu.store.replacePending===!1)return;j.set(e,{text:t,at:Date.now()}),B={key:e,text:t,turns:Xu(),ticks:3};let r=W();r&&Gt(r,""),ge(),Or.debug("queued",e,t.length)}function fb(t){j.delete(t),D===t&&(D=""),B?.key===t&&(B=null),ge()}function pb(){wt=!0,clearTimeout(Pr),Pr=setTimeout(()=>{wt=!1,Pr=void 0},db)}function gb(){let t=Mn(),e=j.get(t);if(!e)return;let n=W();if(!n)return;j.delete(t),D="",ge(),pb(),Gt(n,e.text);let r=le();r&&!P(r)&&!Go(r)&&(r.click(),wt=!1)}function Vu(t){if(!Kt||Wt||_()||Mn()!==t)return;let e=j.get(t);if(!e){D="";return}if(At())return;let n=W();if(!n)return;if(!se(n)){let o=An(nt(n));if(o&&o!==e.text)return}let r=le();!r||P(r)||Go(r)||(Wt=!0,Gt(n,e.text),clearTimeout(pe),pe=setTimeout(()=>bb(t,e.text),ub))}function bb(t,e){pe=void 0;try{if(!Kt)return;let n=j.get(t);if(!n||n.text!==e||_()||Mn()!==t)return;let r=W();if(!r)return;let o=An(nt(r));if(o&&o!==e&&!se(r))return;o!==e&&Gt(r,e);let i=le();if(!i||P(i)||Go(i))return;i.click(),j.delete(t),D="",ge(),Or.debug("drained",t)}finally{Wt=!1}}function Zu(t){let e=bt();if(!e||e===document.body){t.style.left="50%",t.style.bottom="6.5rem";return}let n=e.getBoundingClientRect();t.style.left=`${Math.round(n.left+n.width/2)}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`;let r=Math.min(512,Math.max(160,n.width-24));t.style.maxWidth=`${Math.round(r)}px`}function cs(){Cn?.remove(),Cn=null}function ge(){if(!Kt||!document.body){cs();return}let t=Mn(),e=j.get(t);if(!e){cs();return}let n=Cn;n?.isConnected||(n=document.createElement("div"),n.id=us,document.body.appendChild(n),Cn=n),n.replaceChildren();let r=document.createElement("span");r.className="bloom-pq-kicker",r.textContent="Next";let o=document.createElement("span");o.className="bloom-pq-text";let i=e.text.length>Uu?`${e.text.slice(0,Uu)}\u2026`:e.text;o.textContent=i,o.title=e.text;let a=document.createElement("div");a.className="bloom-pq-actions";let s=document.createElement("button");s.type="button",s.className="bloom-pq-btn bloom-pq-send",s.textContent="Send now",s.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),gb()});let l=document.createElement("button");l.type="button",l.className="bloom-pq-btn bloom-pq-x",l.setAttribute("aria-label","Dismiss queued prompt"),l.textContent="\xD7",l.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),fb(t)}),a.append(s,l),n.append(r,o,a),Zu(n)}function hb(){if(!B)return;if(B.ticks-=1,j.get(B.key)&&Xu()>B.turns){let e=mb();if(e&&e===B.text){Or.debug("native send leaked; dropping pending"),j.delete(B.key),D===B.key&&(D=""),B=null,ge();return}}B.ticks<=0&&(B=null)}function yb(t){if(!Kt||t.isComposing||t.keyCode===229||t.key!=="Enter"||t.shiftKey||t.ctrlKey||t.metaKey||Wt)return;let e=Ku(t.target)??Ku(document.activeElement);if(!e||!_())return;if(t.altKey||wt){wt=!1;return}if(!ht(e))return;let n=An(nt(e));n&&(ds(t),ms(n))}function vb(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||P(e))return null;let n=t.closest(mn);if(n instanceof HTMLElement&&!P(n))return n;let r=le();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function xb(t){if(!Kt)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${us}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&P(n)||Wt||!_()||!vb(e))return;if(wt){wt=!1;return}let r=W();if(!r||!ht(r))return;let o=An(nt(r));o&&(ds(t),ms(o))}function wb(t){if(!Kt)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(jo)&&!e.querySelector(Ct)||Wt||!_())return;if(wt){wt=!1;return}let n=W()??e.querySelector(Ct);if(!n||!ht(n))return;let r=An(nt(n));r&&(ds(t),ms(r))}var Ju=y({name:"PromptQueue",description:"Queue the next prompt while a reply is streaming. Enter/Send waits for this turn instead of interrupting.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Gu,cleanupSelectors:[`#${us}`],settings:Yu,start(){Kt=!0,xt=Mn(),D="",Wt=!1,wt=!1,B=null,E(Gu,ju),Ir?.abort(),Ir=new AbortController;let{signal:t}=Ir;window.addEventListener("keydown",yb,{capture:!0,signal:t}),document.addEventListener("click",xb,{capture:!0,signal:t}),document.addEventListener("submit",wb,{capture:!0,signal:t}),hi?.(),hi=X({onFall(e){if(Kt){if(e.userStopped||e.error){D="",ge();return}D=e.contextKey,Vu(e.contextKey)}},onContext(e,n){n&&e&&!q(n,e)&&(D="",Wt=!1,pe!==void 0&&(clearTimeout(pe),pe=void 0)),Wu(e),xt=e,ge()},onTick(e){Wu(e.contextKey),xt=e.contextKey,hb(),D&&D===e.contextKey&&Vu(D),Cn&&Zu(Cn)}}),ge(),Or.debug("watch started")},stop(){Kt=!1,hi?.(),hi=null,Ir?.abort(),Ir=null,clearTimeout(pe),pe=void 0,clearTimeout(Pr),Pr=void 0,j.clear(),B=null,D="",Wt=!1,wt=!1,cs()}});var Qu=`.bloom-cls {
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
`;var nd=new S("ChatListStatus"),td="chatListStatus",xi="bloom-cls",Sb="bloom-cls",Lb=1200*1e3,Tb="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",Et=new Map,Ot=!1,ct="",Vt=!1,Rn=!1,ut=0,be=null,gs=null,Hn=null,fs=null,yi=null,Br=null,Nn=!1,ye=new Set;function vi(){return Date.now()}function rd(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function he(t,e,n,r=!0){if(!(!t||!Ot)){if(e==="idle")Et.delete(t);else{let o=Et.get(t);o&&o.kind===e&&n!=="net"?o.at=vi():Et.set(t,{kind:e,at:vi(),source:n})}r&&kb({v:1,id:t,kind:e,at:vi()}),qe()}}function kb(t){try{Hn?.postMessage(t)}catch{}}function Cb(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||he(e.id,e.kind,"bc",!1)}function Mb(){let t=vi();for(let[e,n]of Et)n.kind==="streaming"&&t-n.at>Lb&&Et.delete(e)}function Ab(){let t=rd();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(r.closest(Tb))continue;let o=fn(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function ed(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function ps(t){let e=t.querySelector(`:scope > .${xi}`);return e||null}function bs(){if(!Ot)return;Mb();let t=M(),e=Ab();be?.disconnect();try{for(let n of e){let r=fn(n.getAttribute("href")||"");if(!r||!t||r!==t){ps(n)?.remove();continue}let i=Et.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){ps(n)?.remove();continue}let a=ps(n);a||(a=document.createElement("span"),a.className=xi,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(ed("streaming")):i==="error"&&a.appendChild(ed("error")))}}catch(n){nd.debug("paint failed",n)}od()}function qe(){if(Ot){if(document.hidden){ut&&(cancelAnimationFrame(ut),ut=0),bs();return}ut||(ut=requestAnimationFrame(()=>{ut=0,Ot&&bs()}))}}function od(){let t=rd();if(!(be&&gs===t&&t?.isConnected)){if(be?.disconnect(),gs=t,!t){be=null;return}be=new MutationObserver(()=>qe()),be.observe(t,{childList:!0,subtree:!0})}}function wi(){return!!(Me()||vr())}function Hb(t){return!!(Nn||t&&ye.has(t)||!Rn&&wi())}function Nb(t){if(Ot){if(t.type==="post-start"){Rn=!1,t.conversationId?(Nn=!1,ye.add(t.conversationId),Vt=!0,he(t.conversationId,"streaming","net")):(Nn=!0,Vt=!0);return}t.type==="post-end"&&(Nn=!1,t.conversationId&&(ye.delete(t.conversationId),he(t.conversationId,t.error?"error":"done","net")),wi()||(Vt=!1))}}function Rb(t,e){if(!Ot)return;if(q(e,t)){qe();return}let n=M();if(ct&&ct!==n){ye.delete(ct);let r=Et.get(ct);r?.kind==="streaming"&&r.source==="local"&&he(ct,"idle","local")}Nn=!1,Vt=!1,Rn=!0,n&&Et.get(n)?.kind==="streaming"&&Et.get(n)?.source==="local"&&!ye.has(n)&&he(n,"idle","local"),qe()}function Ib(t){if(!Ot)return;let e=t.conversationId||M();if(ct&&e&&ct!==e){ye.delete(ct);let r=Et.get(ct);r?.kind==="streaming"&&r.source==="local"&&he(ct,"idle","local"),Vt=!!(e&&ye.has(e))}if(e&&(ct=e),Rn){if(wi()||t.streaming){qe();return}Rn=!1}if(Hb(e)&&(t.streaming||wi())){Vt=!0,e&&he(e,"streaming","local"),qe();return}Vt&&(Vt=!1,e&&he(e,At()?"error":"done","local")),qe()}var id=y({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${xi}`],start(){Ot=!0,E(td,Qu);try{Hn=new BroadcastChannel(Sb)}catch{Hn=null}Hn?.addEventListener("message",Cb),fs=ot(Nb),yi?.(),yi=X({onTick:Ib,onContext:Rb}),Br?.abort(),Br=new AbortController,document.addEventListener("visibilitychange",()=>{Ot&&(ut&&(cancelAnimationFrame(ut),ut=0),bs())},{signal:Br.signal}),od(),nd.debug("sidebar status watch started")},stop(){Ot=!1,ut&&cancelAnimationFrame(ut),ut=0,Br?.abort(),Br=null,be?.disconnect(),be=null,gs=null,yi?.(),yi=null,fs?.(),fs=null;try{Hn?.close()}catch{}Hn=null,Et.clear(),ye.clear(),Nn=!1,Vt=!1,Rn=!1,ct="",document.querySelectorAll(`.${xi}`).forEach(t=>t.remove()),w(td)}});var sd="widerChat",ld=40,cd=96,ud=64,dd=L({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:ld,max:cd,default:ud}});function Pb(){return K(Number(dd.store.width??ud),ld,cd)}function ad(){let t=Pb(),e=`min(100%,${t}rem)`;E(sd,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var md=y({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:dd,start:ad,onSettingsChange:ad,stop(){w(sd)}});var hs="composerOpacity",In='form[data-type="unified-composer"],form.w-full[data-type]',Ob=[`${In} [class*="corner-superellipse"]`,`${In} [class*="bg-token-bg-primary"]`,`${In} [class*="bg-token-main-surface"]`].join(","),Bb=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),Db="#thread-bottom-container,#thread-bottom",$b=`${In} #prompt-textarea,${In} [contenteditable="true"]`,_b="var(--bg-primary,var(--main-surface-primary,#ffffff))",ys=L({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function qb(){return K(Number(ys.store.opacity??100),0,100)}function Fb(){return K(Number(ys.store.blur??16),0,40)}function fd(){let t=qb();if(t>=100){w(hs);return}let e=Fb(),n=`color-mix(in srgb,${_b} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";E(hs,`${Db}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Bb}{display:none!important}${In}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Ob}{background-color:${n}!important;background-image:none!important;${r}}${$b}{background-color:transparent!important;background-image:none!important}`)}var pd=y({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[v.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:ys,start:fd,onSettingsChange:fd,stop(){w(hs)}});var gd=`#bloom-bn-host {
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
`;var jb=new S("BetterNavigator"),vs="betterNavigator",vd="bloom-bn-host",Ss=60,Gb=16,Ub=1e3,Kb=2.5,Wb=.4,Li="\u6B63\u5728\u8F93\u51FA\u2026",Ls="Image",Vb="\u2753",Yb="\u{1F916}",bd=/file_[0-9a-f]+/gi,Xb=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),Zb=2e3,Jb=40,Qb=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,th=['section[data-testid^="conversation-turn-"][data-turn="user"]','section[data-testid^="conversation-turn-"][data-turn="assistant"]','article[data-testid^="conversation-turn-"][data-turn="user"]','article[data-testid^="conversation-turn-"][data-turn="assistant"]'].join(", "),eh=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),nh=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='thinking']","[class*='reasoning']","[class*='footnote']",".sr-only"].join(", "),rh=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),Ni=L({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),On=new Map,Fr=new Map,Bt=new Set,Ti=0,St=!1,Zt=!1,Pn=!1,ve=null,zr=null,je=null,ki=null,G=[],Ge="",Ci=0,Mi=-1,Hs=0,Ai="",dt=0,Yt=0,Dr,$r=null,Ei=null,xs=null,ws=null,Fe=null,Ts=null,_r=null,ze=null,Bn=null,qr=null;function Ri(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function Es(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function oh(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function ih(t){let e=t.getBoundingClientRect(),n=null;try{let o=t.querySelector("[data-message-id], [data-testid^='conversation-turn-']"),a=o?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]')??o;for(;a&&a!==t;)Qb.test(oh(a))&&(n=a),a=a.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=Es(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||Es(getComputedStyle(t).getPropertyValue("--thread-content-width"))||Es(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function hd(t){try{return!!t.closest(eh)}catch{return!0}}function yd(t){let e=(t.getAttribute("data-turn")||t.closest("[data-turn]")?.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("data-message-author-role")||t.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase();if(n==="user"||n==="assistant")return n;try{let o=(t.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent||"").toLowerCase();if(o.includes("you said"))return"user";if(o.includes("chatgpt said")||o.includes("assistant said"))return"assistant"}catch{}let r=(t.getAttribute("aria-label")||"").toLowerCase();return r.includes("you said")?"user":r.includes("chatgpt said")||r.includes("assistant said")?"assistant":null}function Ii(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||t.querySelector("[data-message-id]")?.getAttribute("data-message-id")||""}function Pi(t){try{if(t.querySelector("[class*='imagegen-image']")||t.querySelector('img[alt="Generated image"], img[alt^="Generated image"]'))return!0}catch{}return!1}function ah(t){try{return!!t.closest("[class*='message-image']")}catch{return!0}}function Si(t,e){if(t){bd.lastIndex=0;for(let n of t.matchAll(bd))e.add(n[0].toLowerCase())}}function sh(t){try{let e=new Set,n=s=>{ah(s)||(Si(s.getAttribute("src")||"",e),Si(s.getAttribute("srcset")||"",e),Si(s.getAttribute("href")||"",e),s instanceof HTMLImageElement&&Si(s.currentSrc||"",e))};for(let s of t.querySelectorAll("[class*='imagegen-image']")){n(s);for(let l of s.querySelectorAll("[src], [srcset], [href]"))n(l)}for(let s of t.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]'))n(s);if(e.size)return e.size;let o=t.querySelectorAll("[class*='group/imagegen-image']").length;if(!o)return 0;let i=Ii(t);return(i?t.querySelector(`#image-${CSS.escape(i)}`):t.querySelector("[id^='image-']:not([id^='image-gen-'])"))&&o>=2&&(o-=1),o}catch{return 0}}function lh(t,e){let n=sh(t),r=Fr.get(e)??0,o=Math.max(r,n);return o>0&&Fr.set(e,o),o>=2?`${Ls} x${o}`:Ls}function Hi(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(i.closest(nh))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return(o.textContent||"").replace(/\s+/g," ").trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<Ss+20;)e.push((r.textContent||"").replace(/\s+/g," ").trim());return e.join(" ").replace(/\s+/g," ").trim()}function ch(t,e){try{if(Pi(t)||t.querySelector("img, picture, video, canvas"))return Ls;if(t.querySelector("a[download], [class*='attachment']"))return"File";if(t.querySelector("pre, code"))return"Code"}catch{}return`Message ${e+1}`}function uh(t,e){if(e==="user"){let r=t.querySelector(".whitespace-pre-wrap")??t;return Hi(r)}let n=t.querySelector(".markdown");return n?Hi(n):""}function dh(t){return t.length>Ss?`${t.slice(0,Ss).trimEnd()}\u2026`:t}function mh(t,e,n,r){let o=uh(t,e);return o?dh(o):r?Li:Pi(t)?lh(t,Ii(t)):ch(t,n)}function fh(){if(Zt)return!0;let t=M();return!!(t&&Bt.has(t)||!Pn&&jr())}function jr(){return!!(Me()||vr())}function ph(){Ti=Date.now()}function xd(t){Zt=!1,t&&Bt.delete(t);let e=M();e&&Bt.delete(e)}function gh(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function bh(t){if(Pi(t)||!jr())return!1;let e=t.querySelector(".markdown");if(!(!e||e instanceof HTMLElement&&!Hi(e)))return!1;let r=t.querySelector("[class*='thinking'], [class*='reasoning']");if(!r)return!1;if(r.getAttribute("aria-busy")==="true"||r.classList.contains("result-streaming"))return!0;try{if(r.querySelector("[aria-busy='true'], .result-streaming"))return!0}catch{}let o=r.closest("details")??r.querySelector("details");return o instanceof HTMLDetailsElement&&o.open}function hh(t,e){try{if(gh(t)||e&&bh(t))return!0}catch{}return!1}function wd(t){if(!t||jr())return!1;try{if(t.querySelector(Xb)||Pi(t))return!0;let e=t.querySelector(".markdown");if(e instanceof HTMLElement&&Hi(e))return!0}catch{}return!1}function yh(t){if(jr()||Ti&&Date.now()-Ti<Zb)return;let e=[...t].reverse().find(n=>n.role==="assistant");!e||!wd(e.el)||xd()}function vh(t){let e=new Set,n=[];try{for(let r of t.querySelectorAll(th)){if(hd(r))continue;let i=Ii(r)||`anon:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}if(n.length)return n;try{for(let r of t.querySelectorAll("[data-message-id]")){if(hd(r))continue;let i=r.getAttribute("data-message-id")||""||`mid:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}return n}function xh(){let t=Ri();if(!t||t===document.body)return[];let e=Ni.store.showAssistant!==!1,n=e&&fh(),r=vh(t),o=null;if(e)for(let a of r)yd(a)==="assistant"&&(o=a);let i=[];try{for(let a of r){let s=Ii(a);if(!s)continue;let l=yd(a);if(l!=="user"&&l!=="assistant"||l==="assistant"&&!e)continue;let c=l==="assistant"&&n&&hh(a,a===o)&&!wd(a),u=mh(a,l,i.length,c);u&&u!==Li&&u!==On.get(s)&&On.set(s,u);let d=c&&u===Li?Li:On.get(s)||u;i.push({id:s,el:a,role:l,text:d,live:c})}}catch{}return yh(i),i}function wh(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function Ed(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function Eh(t){return t===window?window.innerHeight:t.clientHeight}function Sh(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(rh)}catch{return!1}}function Sd(){Dr!==void 0&&(clearTimeout(Dr),Dr=void 0),$r?.classList.remove("bloom-bn-flash"),$r=null}function Lh(t){Sd(),t.classList.add("bloom-bn-flash"),$r=t,Dr=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),$r===t&&($r=null),Dr=void 0},800)}function ks(t){if(!G.length)return;let e=Math.max(0,Math.min(t,G.length-1));Ci=e,zr?.querySelectorAll(".bloom-bn-tick").forEach((r,o)=>{r.classList.toggle("bloom-bn-current",o===e)}),je?.querySelectorAll(".bloom-bn-item").forEach((r,o)=>{r.classList.toggle("bloom-bn-active",o===e)}),ki&&(ki.textContent=`${e+1} / ${G.length}`);let n=je?.children[e];if(n instanceof HTMLElement){let r=je;if(r){let o=n.offsetTop-r.clientHeight/2+n.offsetHeight/2;r.scrollTop=Math.max(0,o)}}}function Cs(t){let e=G[t];if(!e?.el.isConnected)return;Mi=t,Hs=Date.now()+Ub,ks(t);let n=Bn??Ed(e.el),o=Math.abs(e.el.getBoundingClientRect().top-wh())>Kb*Eh(n);e.el.scrollIntoView({behavior:o?"auto":"smooth",block:"start"}),Ni.store.jumpEffect!=="none"&&Lh(e.el)}function Ns(){if(!St||!G.length)return;if(Date.now()<Hs&&Mi>=0){ks(Mi);return}let t=window.innerHeight*Wb,e=0;for(let n=0;n<G.length;n++){let r=G[n].el;r.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}ks(e)}function Th(t){let e=Ed(t);if(Bn===e&&qr)return;qr?.(),Bn=e;let n=e===window?document:e,r=()=>{Ns(),Rs()};n.addEventListener("scroll",r,{passive:!0}),qr=()=>n.removeEventListener("scroll",r)}function kh(t){ze?.disconnect(),ze=null;let e=Bn instanceof HTMLElement?Bn:null;ze=new IntersectionObserver(()=>Ns(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el.isConnected&&ze.observe(n.el)}function Ch(){if(!document.body)return null;let t=ve;if(t?.isConnected)return t;t=document.createElement("div"),t.id=vd,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),ve=t,zr=e,je=i,ki=o,t}function Ld(){let t=ve,e=Ri();if(!t||!e||!e.isConnected||G.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=ih(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||Jb,d=n.right-r.right>=c+8?r.right+4:r.right-12-c;d=Math.min(d,n.right-c-8),d=Math.max(8,d);let f=Math.max(8,Math.round(window.innerWidth-d-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${f}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function Rs(){!St||Yt||(Yt=requestAnimationFrame(()=>{Yt=0,St&&Ld()}))}function Mh(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function Ah(t){let e=zr,n=je;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>Gb),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=Mh(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",c=>{c.preventDefault(),Cs(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-emoji",s.textContent=r.role==="user"?Vb:Yb;let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=r.text,l.title=r.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),Cs(o)}),n.appendChild(a)}))}function Hh(t){zr?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=je?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function Nh(){let t=M();return t===Ai?!1:(Ai=t,On.clear(),Fr.clear(),G=[],Ge="",Ci=0,Mi=-1,Hs=0,Zt&&t&&(Bt.add(t),Zt=!1),!0)}function Rh(t){let e=Ni.store.showAssistant!==!1?"1":"0";return`${Ai}|${e}|${t.map(n=>n.id).join(",")}`}function Ms(){if(!St)return;Nh();let t=xh(),e=Ri();if(!e||t.length<1){G=t,Ge="",ve&&(ve.hidden=!0),ze?.disconnect(),As();return}Ch();let n=Rh(t);n!==Ge?(G=t,Ge=n,Ah(t),Th(e),kh(t)):(G=t,Hh(t)),Ld(),Ns(),As()}function Xt(){if(St){if(document.hidden){dt&&(cancelAnimationFrame(dt),dt=0),Ms();return}dt||(dt=requestAnimationFrame(()=>{dt=0,St&&Ms()}))}}function As(){let t=Ri();if(!(Fe&&Ts===t&&t?.isConnected)){if(Fe?.disconnect(),_r?.disconnect(),Ts=t,!t||t===document.body){Fe=null;return}Fe=new MutationObserver(()=>Xt()),Fe.observe(t,{childList:!0,subtree:!0}),_r=new ResizeObserver(()=>Rs()),_r.observe(t)}}function Ih(t){if(St){if(t.type==="post-start"){ph(),Pn=!1,t.conversationId?(Zt=!1,Bt.add(t.conversationId)):Zt=!0,Xt();return}if(t.type==="post-end"){if(Zt=!1,t.conversationId)Bt.delete(t.conversationId);else{let e=M();e&&Bt.delete(e)}Xt()}}}function Ph(t){if(!St||!G.length||ve?.hidden||t.altKey||t.ctrlKey||t.metaKey||Sh(t.target))return;let e=-1;if(t.key==="ArrowDown")e=Ci+1;else if(t.key==="ArrowUp")e=Ci-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=G.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),Cs(Math.max(0,Math.min(e,G.length-1)))}function Oh(){Sd(),ze?.disconnect(),ze=null,Fe?.disconnect(),Fe=null,Ts=null,_r?.disconnect(),_r=null,qr?.(),qr=null,Bn=null,ve?.remove(),ve=null,zr=null,je=null,ki=null}var Td=y({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:vs,cleanupSelectors:[`#${vd}`],settings:Ni,start(){St=!0,Ai=M(),E(vs,gd),Ei=new AbortController;let{signal:t}=Ei;window.addEventListener("keydown",Ph,{signal:t}),window.addEventListener("popstate",Xt,{signal:t}),window.visualViewport?.addEventListener("resize",Rs,{signal:t}),document.addEventListener("visibilitychange",()=>{St&&(dt&&(cancelAnimationFrame(dt),dt=0),Yt&&(cancelAnimationFrame(Yt),Yt=0),Ms())},{signal:t}),ws=ot(Ih),xs=X({onTick(){Pn&&!jr()&&(Pn=!1),Xt()},onFall(e){xd(e.conversationId),Xt()},onContext(e,n){if(!q(n,e)){On.clear(),Fr.clear(),Ge="",Zt=!1;let r=M();for(let o of[...Bt])o!==r&&Bt.delete(o);Pn=!0}Xt()}}),As(),Xt(),jb.debug("navigator started")},stop(){St=!1,dt&&cancelAnimationFrame(dt),dt=0,Yt&&cancelAnimationFrame(Yt),Yt=0,Ei?.abort(),Ei=null,xs?.(),xs=null,ws?.(),ws=null,Bt.clear(),Zt=!1,Pn=!1,Ti=0,Oh(),On.clear(),Fr.clear(),G=[],Ge="",w(vs)},onSettingsChange(){Ge="",Xt()}});var kd=`.bloom-ts {
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
`;function Cd(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Md(t){try{return new Date(t).toISOString()}catch{return""}}var Nd=new S("MessageTimestamps"),Ad="messageTimestamps",Bi="bloom-ts",Hd=1500,Dh="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",Dn=L({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),$n=new Map,Ke=!1,mt=0,xe=null,Ps=null,Is=null,Oi=null,Gr=null,Ur=!1,Kr=!1;function Rd(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function Bs(){let t=Dn.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Id(){let t={...Bs()};for(let[n,r]of $n)t[n]=r;let e=Object.keys(t);if(e.length>Hd){let n=e.slice(e.length-Hd),r={};for(let o of n)r[o]=t[o];Dn.store.stamps=r;return}Dn.store.stamps=t}var $h=wl(Id,500);function Pd(t,e){!t||!e||$n.get(t)===e||($n.set(t,e),$h(),Ue())}function _h(t){return t?$n.get(t)??Bs()[t]??Yo(t)??null:null}function qh(t){Ke&&t.type==="message-time"&&Pd(t.messageId,t.createTime)}function Fh(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function zh(){let t=Rd();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll("[data-message-id]"))n.closest(Dh)||e.push(n)}catch{}return e}function jh(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function Os(){if(!Ke)return;let t=Dn.store.hideOwnMessages===!0,e=Dn.store.showDate!==!1,n=_();Kr&&(n?Ur=!1:Kr=!1);let r=Kr?!1:n,o=zh();xe?.disconnect();try{o.forEach((i,a)=>{let s=i.getAttribute("data-message-id")||"",l=Fh(i),c=i.querySelector(`:scope > .${Bi}`);if(t&&l==="user"){c?.remove();return}if(jh(i)){c?.remove();return}let u=_h(s);if(!u&&s&&(r||Ur)&&a>=o.length-2&&(u=Date.now(),Pd(s,u)),!u){c?.remove();return}let d=Cd(u,e);if(!d){c?.remove();return}let f=c;f||(f=document.createElement("time"),f.className=Bi,f.setAttribute("aria-hidden","true"),i.insertBefore(f,i.firstChild)),f.textContent!==d&&(f.textContent=d);let h=Md(u);h&&f.getAttribute("datetime")!==h&&f.setAttribute("datetime",h)})}catch(i){Nd.debug("paint failed",i)}Ur=r,Od()}function Ue(){if(Ke){if(document.hidden){mt&&(cancelAnimationFrame(mt),mt=0),Os();return}mt||(mt=requestAnimationFrame(()=>{mt=0,Ke&&Os()}))}}function Od(){let t=Rd();if(!(xe&&Ps===t&&t?.isConnected)){if(xe?.disconnect(),Ps=t,!t||t===document.body){xe=null;return}xe=new MutationObserver(()=>Ue()),xe.observe(t,{childList:!0,subtree:!0})}}var Bd=y({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Bi}`],settings:Dn,start(){Ke=!0,E(Ad,kd);let t=Bs();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&$n.set(e,n);Is=ot(qh),Oi?.(),Oi=X({onTick:Ue,onFall:Ue,onContext(e,n){q(n,e)||(Kr=!0,Ur=!1),Ue()}}),Gr?.abort(),Gr=new AbortController,document.addEventListener("visibilitychange",()=>{Ke&&(mt&&(cancelAnimationFrame(mt),mt=0),Os())},{signal:Gr.signal}),Od(),Ue(),Nd.debug("timestamp watch started")},stop(){Ke=!1,mt&&cancelAnimationFrame(mt),mt=0,Gr?.abort(),Gr=null,xe?.disconnect(),xe=null,Ps=null,Oi?.(),Oi=null,Is?.(),Is=null,Kr=!1,Ur=!1,Id(),$n.clear(),document.querySelectorAll(`.${Bi}`).forEach(t=>t.remove()),w(Ad)},onSettingsChange:Ue});var Ds="streamerMode",Gh="filter:blur(6px)!important;transition:filter .2s ease",Uh="filter:none!important",_n=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],qn=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function ft(t,e){return t.map(n=>`${n} ${e}`)}var We=L({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function Fn(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${Gh}}${e?`${r}{${Uh}}`:""}`}function Dd(){let t=[];if(We.store.conversations!==!1&&(t.push(Fn([...ft(qn,'a[href^="/c/"]'),...ft(qn,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),We.store.projects!==!1&&(t.push(Fn([...ft(qn,'a[href*="/project"]'),...ft(qn,'a[href*="/g/g-p-"]'),...ft(qn,'[data-testid="project-name"]'),...ft(qn,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),We.store.headerTitle!==!1&&t.push(Fn(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),We.store.accountAvatar!==!1&&t.push(Fn([...ft(_n,"img"),...ft(_n,'[class*="avatar"]'),...ft(_n,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),We.store.accountName!==!1&&t.push(Fn([...ft(_n,".min-w-0 > .truncate"),...ft(_n,".min-w-0.flex-1 .truncate")],!1)),We.store.accountEmail!==!1&&t.push(Fn([...ft(_n,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!t.length){w(Ds);return}E(Ds,t.join(`
`))}var $d=y({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[v.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:We,start:Dd,onSettingsChange:Dd,stop(){w(Ds)}});var _d=`.bloom-gc-panel {
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
}`;var Wh=new S("GreetingCustomizer"),zn="greetingCustomizer",qd="greetingCustomizerUi",Wr=100,_s=30,Vh=120,Yh=1e3,Xh=50,Zh=40,Jh=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),Vr=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),Fi=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function Qh(t){return!!t?.closest(Jh)}function Gd(t){return!!(Qh(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function eo(t){try{for(let e of document.querySelectorAll(t))if(!Gd(e))return e}catch{}return null}function $s(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(eo(e))return e;return t}var Ud=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],U=L({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:g0},greetings:{type:0,description:"Greeting texts",hidden:!0,default:Ud},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),Dt=!1,Un=!1,Ye=null,$i,Yr,jn,Xr,_i=0,Di=null,Gn=null,Zr=null,Jr=null,Qr=null,qi=null;function Qt(){let t=location.pathname||"/";return t==="/"||t===""}function Ve(){let t=U.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):Ud.slice()}function to(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function Fd(t){U.store.greetings=t.slice(0,_s)}function no(){let t=String(U.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function t0(){return U.store.order==="random"?"random":"sequential"}function e0(){return K(Number(U.store.intervalSec??10),1,3600)*1e3}function n0(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function r0(){return!!eo(Fi)}function zi(){return!!(eo(Fi)||eo(Vr))}function o0(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=r0()?$s(Fi):eo(Vr)?$s(Vr):$s(Fi),i=e?`${Vr}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function i0(t,e){if(t<=0)return 0;if(t===1)return Number(U.plain.index)!==0&&(U.store.index=0),Number(U.plain.lastRandom)!==0&&(U.store.lastRandom=0),0;let n=Number(U.plain.index),r=Number(U.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(t0()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return U.store.index=s,U.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return U.store.index=i,i}function Jt(t){if(!Dt)return;if(!Qt()){w(zn);return}let e=Ve().map(to).filter(Boolean);if(!e.length){w(zn);return}let n=i0(e.length,t),r=e[n]??e[0],o=no()==="manual"&&e.length>1;E(zn,o0(n0(r),o)),qi?.()}function qs(){$i!==void 0&&(clearInterval($i),$i=void 0)}function Fs(){qs(),!(!Dt||!Qt())&&no()==="interval"&&(Ve().filter(Boolean).length<=1||($i=setInterval(()=>Jt(!0),e0())))}function zs(){Xr!==void 0&&(clearTimeout(Xr),Xr=void 0),_i=0}function zd(){if(zs(),!Dt||!Qt())return;_i=Zh;let t=()=>{if(Xr=void 0,!(!Dt||!Qt())){if(zi()){no()==="refresh"&&!Un?(Un=!0,Jt(!0)):Jt(!1),Fs();return}_i-=1,_i>0&&(Xr=setTimeout(t,Xh))}};t()}function js(){if(Ye===!0){zi()?Jt(!1):zd();return}Ye=!0,Un=!1,no()==="refresh"?(Un=!0,Jt(!0)):Jt(!1),Fs(),zi()||zd()}function Gs(){Ye=!1,Un=!1,qs(),zs(),w(zn)}function ji(){jn===void 0&&(jn=window.setTimeout(()=>{jn=void 0,Dt&&(Qt()?js():Ye!==!1&&Gs())},Vh))}function a0(){Gn||(Gn=history.pushState.bind(history),Zr=history.replaceState.bind(history),Jr=function(...e){let n=Gn(...e);return ji(),n},Qr=function(...e){let n=Zr(...e);return ji(),n},history.pushState=Jr,history.replaceState=Qr)}function s0(){Jr&&history.pushState===Jr&&Gn&&(history.pushState=Gn),Qr&&history.replaceState===Qr&&Zr&&(history.replaceState=Zr),Gn=null,Zr=null,Jr=null,Qr=null}function l0(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(ji)}function c0(t){if(!Dt||!Qt()||no()!=="manual"||Ve().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(Vr);if(!n||Gd(n))return;let r=window.getSelection?.();r&&String(r).trim()||Jt(!0)}function u0(){Yr===void 0&&(Yr=setInterval(()=>{if(!Dt)return;let t=Qt();if(t!==(Ye===!0)){t?js():Gs();return}t&&zi()&&Jt(!1)},Yh))}function d0(){Yr!==void 0&&(clearInterval(Yr),Yr=void 0)}function jd(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var m0="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",f0="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function p0(t,e){let n=to(t);return n?n.length>Wr?`Keep it to ${Wr} characters.`:Ve().length+(e?1:0)>_s?`At most ${_s} greetings.`:null:"Enter a greeting."}function g0(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=Ve(),s=Number(U.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=Wr,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let m=l.querySelector(".bloom-gc-count");m&&(m.textContent=`${to(e).length}/${Wr}`);let T=l.querySelector(".bloom-gc-error");T&&(T.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${to(e).length}/${Wr}`;let f=document.createElement("span");f.className="bloom-gc-error",f.textContent=r;let h=document.createElement("div");if(h.className="bloom-gc-actions",n>=0){let m=document.createElement("button");m.type="button",m.className="bloom-gc-btn",m.textContent="Cancel",m.addEventListener("click",()=>{n=-1,e="",r="",i()}),h.appendChild(m)}let g=document.createElement("button");if(g.type="button",g.className="bloom-gc-btn bloom-gc-btn-primary",g.textContent=n>=0?"Update":"Add",g.addEventListener("click",()=>{let m=n<0,T=p0(e,m);if(T){r=T,i();return}let A=to(e),N=Ve().slice();n>=0&&n<N.length?N[n]=A:N.push(A),Fd(N),n=-1,e="",r="",i()}),h.appendChild(g),u.append(d,f,h),l.appendChild(u),t.appendChild(l),!a.length){let m=document.createElement("p");m.className="bloom-gc-empty",m.textContent="No greetings. The official heading stays.",t.appendChild(m);return}let b=document.createElement("div");b.className="bloom-gc-list",a.forEach((m,T)=>{let A=document.createElement("div");A.className="bloom-gc-item",T===s&&(A.dataset.active="true");let N=document.createElement("button");N.type="button",N.className=`bloom-gc-body${o===T?"":" bloom-gc-clamp"}`,N.textContent=m,N.addEventListener("click",()=>{o=o===T?-1:T,i()});let qt=document.createElement("div");qt.className="bloom-gc-item-actions";let Lt=jd("Edit",m0);Lt.addEventListener("click",()=>{n=T,e=m,r="",i()});let Z=jd("Delete",f0);Z.addEventListener("click",()=>{let R=Ve().filter((tt,Ft)=>Ft!==T);Fd(R),n===T?(n=-1,e=""):n>T&&(n-=1),i()}),qt.append(Lt,Z),A.append(N,qt),b.appendChild(A)}),t.appendChild(b)};return qi=i,i(),()=>{qi===i&&(qi=null),t.replaceChildren()}}var Kd=y({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:qd,settings:U,start(){Dt=!0,E(qd,_d),a0(),Di=new AbortController;let{signal:t}=Di;window.addEventListener("popstate",ji,{signal:t}),document.addEventListener("click",l0,{capture:!0,signal:t}),document.addEventListener("click",c0,{signal:t}),u0(),Ye=null,Qt()?js():Gs(),Wh.debug("started")},stop(){Dt=!1,Di?.abort(),Di=null,jn!==void 0&&(clearTimeout(jn),jn=void 0),qs(),zs(),d0(),s0(),w(zn),Un=!1,Ye=null},onSettingsChange(){Dt&&(Qt()?(Jt(!1),Fs()):w(zn))}});function b0(t){let e=/^data:([^;,]+)?(;base64)?,(.*)$/s.exec(t);if(!e)return null;let n=e[1]||"application/octet-stream",r=!!e[2],o=e[3]||"";try{if(r){let i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return new Blob([a],{type:n})}return new Blob([decodeURIComponent(o)],{type:n})}catch{return null}}async function Gi(t){try{return await createImageBitmap(t)}catch{return null}}async function h0(t){try{let e=new Image;return e.decoding="async",await new Promise((n,r)=>{e.onload=()=>n(),e.onerror=()=>r(new Error("img")),e.src=t}),await createImageBitmap(e)}catch{return null}}async function Ui(t){if(t.startsWith("data:")){let e=b0(t);if(e){let n=await Gi(e);if(n)return n}return h0(t)}try{let e=await fetch(t,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?Gi(await e.blob()):null}catch{return null}}var Wi="data-bloom-csi-slot",y0="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",v0=/\bsize-(?:[6-9]|10)\b/,x0=/\b(?:h|w)-(?:[6-9]|10)\b/,w0=/^(plus|pro|free|team|go|business|enterprise)$/i,E0=['[class*="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-6"]','[class~="h-7"]','[class~="h-8"]','[class~="h-9"]','[class~="h-10"]','[class~="w-6"]','[class~="w-7"]','[class~="w-8"]','[class~="w-9"]','[class~="w-10"]'].join(",");function Ki(t){return t.getAttribute("class")||""}function Vd(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||v0.test(t)?!0:x0.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function S0(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3&&!Yd(e)}function Yd(t){return w0.test(String(t??"").replace(/\s+/g,""))}function $t(t){return!!t?.closest(y0)}function Vi(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function ro(t){let e=Ki(t);return/\btext-xs\b/.test(e)||/text-token-text-secondary/.test(e)||/text-token-text-tertiary/.test(e)?!0:Yd(t.textContent||"")}function Yi(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function oo(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function L0(t){return/\bflex\b/.test(t)&&!/\bflex-col\b/.test(t)}function Xd(t){if($t(t)||Yi(t)||oo(t)||ro(t)||Vi(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function Zd(t){return $t(t)||Yi(t)||oo(t)||ro(t)||t.querySelector("img, svg, .min-w-0, .truncate")?!1:S0(t.textContent||"")}function Jd(t){return $t(t)||oo(t)||Vi(t)||ro(t)?!1:Vd(Ki(t))||Zd(t)?!0:Xd(t)}function Wd(t){return!($t(t)||Vi(t)||oo(t)||ro(t)||Yi(t))}function Xe(t,e){let n=Yi(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(oo(n)||Vi(n)||ro(n));)$t(n)||(r=n),n=n.parentElement;return r}function T0(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||$t(e))continue;if(L0(Ki(e))){let r=[];for(let o of e.children)if(!(!(o instanceof HTMLElement)||!Wd(o))){if(Jd(o)||Vd(Ki(o)))return Xe(o,t)??o;r.push(o)}if(r.length===1)return Xe(r[0],t)??r[0]}let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&Wd(r))return Xe(r,t)??r}}return null}function k0(t){let e=t.querySelectorAll(E0);for(let n of e)if(Jd(n))return Xe(n,t)??n;return null}function C0(t){for(let e of t.querySelectorAll("span, div, p, i"))if(Zd(e))return Xe(e,t)??e;return null}function M0(t){for(let e of t.querySelectorAll("*"))if(Xd(e))return Xe(e,t)??e;return null}function Qd(t,e){if($t(t))return null;if(e&&!$t(e)&&t.contains(e)){let n=Xe(e,t);if(n)return n}return T0(t)??k0(t)??C0(t)??M0(t)}function tm(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-8"]','[class~="w-8"]']}var Kn="data-bloom-csi",Xi="data-bloom-csi-orig",Ze=new Set,em=null;function Ks(t){em=t}function nm(t){return`url(${JSON.stringify(t)})`}function Zi(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function Ws(t,e,n){let r=nm(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function rm(t,e=Wi){let n=nm(t);return`[${e}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${e}] *,[${e}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${e}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`}function A0(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function Wn(t){t.removeEventListener("error",Us);let e=t.getAttribute(Xi);t.removeAttribute(Kn),t.removeAttribute(Xi),e&&t.getAttribute("src")!==e&&(t.src=e)}function Us(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&Ze.add(n),Wn(e),em?.()}function om(t,e){if(!e||Ze.has(e)){Wn(t);return}A0(t);let n=t.getAttribute("src")??"";if(t.getAttribute(Kn)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(Xi)&&t.setAttribute(Xi,n);t.setAttribute(Kn,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",Us),t.addEventListener("error",Us),n!==e&&(t.src=e)}var im=`/*
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
`;var am=new S("CustomSidebarIdentity"),sm="customSidebarIdentityUi",um="customSidebarIdentity",N0="bloom-csi-face",R0="bloom-csi-name",Vn=Wi,I0=1024,Ji=256,dm=24,mm=64,fm=40,Zs=1,Js=4,io=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Vs=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],x=L({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:Z0},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:dm,max:mm,default:fm},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function Qe(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function P0(){return String(x.store.displayName??"").trim()}function ea(t,e,n,r,o){let i=K(n,Zs,Js),a=Math.min(t,e)/i,s=K(r,a/2,Math.max(a/2,t-a/2)),l=K(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}function O0(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function Qs(t){let e=Math.min(1,I0/Math.max(t.width,t.height));return O0(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function B0(t,e,n,r){let{side:o,x:i,y:a}=ea(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=Ji,s.height=Ji;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,Ji,Ji);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function D0(t){let e=await Gi(t);if(!e)return null;let n=Qs(e);return e.close(),n}async function el(t,e,n,r){let o=await Ui(t);if(!o)return null;let i=B0(o,e,n,r);return o.close(),i}function nl(){x.store.cropX=.5,x.store.cropY=.5,x.store.cropZoom=1}function lm(){x.store.avatarUrl="",x.store.avatarSource="",nl()}var cm=0;async function tl(t){let e=++cm;nl(),x.store.avatarSource=t;let n=await el(t,.5,.5,1);return e!==cm?!1:(n&&(x.store.avatarUrl=n),!!n)}function ao(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function Ys(t){let e=ao(t);if(!e)return!1;let n=await D0(e);return n?tl(n):!1}var pt=!1,Yn=!1,Xn=0,na=0,Qi=null,we=new Map,Zn=null,te=null,ra=null,_t=null,oa=null;function ia(t){let e=String(t??"").trim();if(!e||Ze.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:n}=new URL(e);if(n==="https:"||n==="http:")return e}catch{return null}return null}function pm(){return ia(x.store.avatarUrl)??ia(x.store.avatarSource)}var ta=!1,Xs=new Set;function gm(){let t=ia(x.store.avatarSource);if(!t?.startsWith("data:image/")||ia(x.store.avatarUrl)?.startsWith("data:image/")||ta||Xs.has(t))return;ta=!0;let e=Qe(x.store.cropX,.5),n=Qe(x.store.cropY,.5),r=Qe(x.store.cropZoom,1);el(t,e,n,r).then(o=>{if(ta=!1,!o){Xs.add(t);return}pt&&(x.store.avatarUrl=o,aa())}).catch(()=>{ta=!1,Xs.add(t)})}function Je(t,e){return t.map(n=>`${n} ${e}`)}function $0(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function _0(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=$0(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function bm(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||$t(n)||n.closest(".min-w-0")||e.push(n);return e}function q0(t){let e=bm(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function rl(){let t=[],e=Le();e&&t.push(e);let n=ln();if(n&&!t.some(r=>n.contains(r)||r.contains(n))){let r=n.querySelector(io.join(","))??n.querySelector("button, a, [role='button']")??n;r&&!t.includes(r)&&t.push(r)}return t}function hm(t,e){let n=q0(t);if(n)om(n,e);else for(let o of bm(t))Wn(o);let r=Qd(t,n);for(let o of t.querySelectorAll(`[${Vn}]`))o!==r&&o.removeAttribute(Vn);r&&r.setAttribute(Vn,"")}function F0(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function z0(t,e){let n=F0(t);n&&hm(n,e)}function j0(){for(let t of document.querySelectorAll(`img[${Kn}]`))Wn(t);for(let t of document.querySelectorAll(`[${Vn}]`))t.removeAttribute(Vn)}function G0(){let t=K(Math.round(Qe(x.store.avatarSize,fm)),dm,mm),e=pm(),n=P0(),r=x.store.applyToMenu!==!1,o=[],i=[...Je(io,"img"),"#stage-sidebar-tiny-bar img"];r&&i.push(...Je(Vs,"> :first-child img"));let a=[...Je(io,".min-w-0 > .truncate"),...Je(io,".min-w-0.flex-1 .truncate")];r&&a.push(...Je(Vs,"> :first-child .truncate"));let s=tm(Vn);o.push(Zi([...s.flatMap(l=>Je(io,l))].join(","),t)),o.push(Zi(s.map(l=>`#stage-sidebar-tiny-bar ${l}`).join(","),32)),r&&o.push(Zi(s.flatMap(l=>Je(Vs,`> :first-child ${l}`)).join(","),t)),e&&(o.push(Ws(i.join(","),e,t)),o.push(Ws("#stage-sidebar-tiny-bar img",e,32)),o.push(rm(e))),n&&o.push(_0(a,n)),E(um,o.join(""))}function U0(){let t=pm(),e=rl();for(let n of e)hm(n,t);if(x.store.applyToMenu!==!1){let n=cn();n&&z0(n,t)}for(let n of document.querySelectorAll(`img[${Kn}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||Wn(n)}function aa(){if(!(!pt||Yn)){Yn=!0;for(let t of we.values())t.disconnect();te?.disconnect(),_t?.disconnect();try{G0(),U0()}finally{Yn=!1,ol(),Y0(),Zn?.isConnected&&ym(Zn),gm()}}}function so(){!pt||Xn||(Xn=requestAnimationFrame(()=>{Xn=0,aa()}))}function K0(){Yn||!pt||so()}function W0(t){if(we.has(t))return;let e=new MutationObserver(K0);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),we.set(t,e)}function V0(t){we.get(t)?.disconnect(),we.delete(t)}function ol(){let t=new Set;for(let n of rl())t.add(n),n.parentElement&&t.add(n.parentElement);let e=ln();e&&t.add(e);for(let n of[...we.keys()])(!t.has(n)||!n.isConnected)&&V0(n);for(let n of t)n.isConnected&&W0(n)}function Y0(){let t=To();if(!t){_t?.disconnect(),_t=null,ra=null;return}if(ra===t&&_t){_t.observe(t,{childList:!0});return}_t?.disconnect(),ra=t,_t=new MutationObserver(()=>{Yn||!pt||(ol(),so())}),_t.observe(t,{childList:!0})}function ym(t){Zn===t&&te||(te?.disconnect(),Zn=t,te=new MutationObserver(()=>{if(!t.isConnected){te?.disconnect(),te=null,Zn=null;return}Yn||!pt||so()}),te.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function vm(t){if(!pt||x.store.applyToMenu===!1)return;let e=cn();if(e){ym(e),so();return}t<=0||requestAnimationFrame(()=>vm(t-1))}function xm(t){pt&&(aa(),!(rl().length||t<=0)&&(na=requestAnimationFrame(()=>xm(t-1))))}function X0(t){pt&&x.store.applyToMenu!==!1&&(!ko(t)&&!cn()||vm(10))}function Z0(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let d=document.createElement("p");d.className="bloom-csi-hint";let f=document.createElement("div");f.className="bloom-csi-crop";let h=document.createElement("div");h.className="bloom-csi-stage";let g=document.createElement("img");g.className="bloom-csi-stage-img",g.alt="",g.draggable=!1,h.appendChild(g);let b=document.createElement("div");b.className="bloom-csi-zoom-row";let m=document.createElement("input");m.type="range",m.className="bloom-csi-zoom",m.min=String(Zs),m.max=String(Js),m.step="0.05",m.setAttribute("aria-label","Zoom");let T=document.createElement("span");T.className="bloom-csi-zoom-val";let A=document.createElement("button");A.type="button",A.className="bloom-csi-btn",A.textContent="Reset",b.append(m,T,A);let N=document.createElement("p");N.className="bloom-csi-hint",N.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",f.append(h,b,N),t.append(u,d,f);function qt(){let p=String(x.store.avatarSource??""),C=String(x.store.avatarUrl??"");return p.startsWith("data:image/")?p:C.startsWith("data:image/")?C:""}function Lt(p,C,H){if(!a)return i.x=p,i.y=C,i.zoom=K(H,Zs,Js),i;let Y=ea(a.w,a.h,H,p*a.w,C*a.h);return i.x=Y.x/a.w,i.y=Y.y/a.h,i.zoom=Y.z,i}function Z(){m.value=String(i.zoom),T.textContent=`${Math.round(i.zoom*100)}%`;let p=a?ea(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;p&&a&&(g.style.width=`${a.w/p.side*100}%`,g.style.height=`${a.h/p.side*100}%`,g.style.left=`${(.5-p.x/p.side)*100}%`,g.style.top=`${(.5-p.y/p.side)*100}%`)}function R(p=!1){let C=qt(),H=String(x.store.avatarUrl??"").trim(),Y=!!C;s.hidden=!H&&!C,(C||H)&&(s.src=C||H),document.activeElement!==l&&(l.value=Y?"":H),l.placeholder=Y?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",f.hidden=!C,d.hidden=!(e&&/^https?:\/\//.test(H)&&!C),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",C&&(p&&(i.x=Qe(x.store.cropX,.5),i.y=Qe(x.store.cropY,.5),i.zoom=Qe(x.store.cropZoom,1)),g.getAttribute("src")!==C&&(a=null,g.onload=()=>{a={w:g.naturalWidth,h:g.naturalHeight},Lt(i.x,i.y,i.zoom),Z()},g.src=C),Z())}function tt(p,C,H,Y=!1){Lt(p,C,H),Z();let ul=qt(),dl=()=>{x.store.cropX=i.x,x.store.cropY=i.y,x.store.cropZoom=i.zoom,ul&&el(ul,i.x,i.y,i.zoom).then(ml=>{ml&&(x.store.avatarUrl=ml)})};r&&clearTimeout(r),Y?dl():r=setTimeout(dl,80)}function Ft(p){x.store.avatarUrl=p;let C=p.trim();if(n&&clearTimeout(n),!C){x.store.avatarSource="",nl(),e=!1,R(!0);return}if(C.startsWith("data:image/")){e=!1,n=setTimeout(()=>{Ui(C).then(H=>{if(!H)return;let Y=Qs(H);H.close(),Y&&tl(Y).then(()=>R(!0))})},80);return}if(/^https?:\/\//.test(C)){e=!1,x.store.avatarSource="",n=setTimeout(()=>{Ui(C).then(H=>{if(!H){e=!0,R(!0);return}let Y=Qs(H);H.close(),Y?(e=!1,tl(Y).then(()=>R(!0))):(e=!0,R(!0))})},400);return}e=!1,x.store.avatarSource="",R(!0)}u.addEventListener("paste",p=>{ao(p.clipboardData)&&(p.preventDefault(),e=!1,Ys(p.clipboardData).then(()=>R(!0)))}),u.addEventListener("dragover",p=>{ao(p.dataTransfer)&&p.preventDefault()}),u.addEventListener("drop",p=>{ao(p.dataTransfer)&&(p.preventDefault(),e=!1,Ys(p.dataTransfer).then(()=>R(!0)))}),l.addEventListener("change",()=>Ft(l.value)),l.addEventListener("paste",p=>{ao(p.clipboardData)&&(p.preventDefault(),e=!1,Ys(p.clipboardData).then(()=>R(!0)))}),l.addEventListener("keydown",p=>{qt()&&!l.value&&(p.key==="Backspace"||p.key==="Delete")&&(lm(),e=!1,R(!0))}),c.addEventListener("click",()=>{lm(),e=!1,R(!0)}),h.addEventListener("pointerdown",p=>{p.button===0&&(h.setPointerCapture(p.pointerId),o.on=!0,o.px=p.clientX,o.py=p.clientY,o.x=i.x,o.y=i.y)}),h.addEventListener("pointermove",p=>{if(!o.on||!a)return;let C=h.clientWidth;if(!C)return;let{side:H}=ea(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);Lt(o.x-(p.clientX-o.px)*(H/C)/a.w,o.y-(p.clientY-o.py)*(H/C)/a.h,i.zoom),Z()}),h.addEventListener("pointerup",()=>{o.on&&(o.on=!1,tt(i.x,i.y,i.zoom,!0))}),h.addEventListener("pointercancel",()=>{o.on=!1}),h.addEventListener("wheel",p=>{p.preventDefault(),tt(i.x,i.y,i.zoom*(p.deltaY<0?1.08:1/1.08))},{passive:!1}),m.addEventListener("input",()=>tt(i.x,i.y,Number(m.value))),m.addEventListener("change",()=>tt(i.x,i.y,Number(m.value),!0)),A.addEventListener("click",()=>tt(.5,.5,1,!0));let cl=()=>R(!1);return oa=cl,R(!0),()=>{oa===cl&&(oa=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var wm=y({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:sm,cleanupSelectors:[`.${N0}`,`.${R0}`],settings:x,start(){pt=!0,Ze.clear(),Ks(so),E(sm,im),Qi=new AbortController,document.addEventListener("click",X0,{signal:Qi.signal}),xm(40),gm(),am.debug("started")},onSettingsChange(){Ze.clear(),oa?.(),pt&&(ol(),aa())},stop(){pt=!1,Qi?.abort(),Qi=null,Xn&&cancelAnimationFrame(Xn),Xn=0,na&&cancelAnimationFrame(na),na=0;for(let t of we.values())t.disconnect();we.clear(),te?.disconnect(),te=null,Zn=null,_t?.disconnect(),_t=null,ra=null,j0(),w(um),Ks(null),Ze.clear(),am.debug("stopped")}});var Jn=new S("Bloom"),Em=!1,J0=Date.now(),Q0=[cc,nu,du,pu,vu,Lu,Du,_u,zu,Ju,id,md,pd,Td,Bd,$d,Kd,wm];function sa(t){return new Promise(e=>setTimeout(e,t))}function ty(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function ey(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var Lm=8e3,Sm=300,ny=250;async function ry(){if(Se())return await sa(Sm),!0;for(;Date.now()-J0<Lm;)if(await sa(ny),Se())return await sa(Sm),!0;return Se()||pa()}function il(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function oy(){if(il())return!0;let t=Date.now()+Lm;for(;Date.now()<t;)if(await sa(100),il())return!0;return il()}function iy(){try{GM_registerMenuCommand?.("Bloom++ settings",lc)}catch{}}function ay(){yo(()=>{tr("HostShell"),Jn.info("host shell",et)}),vo(()=>{Jn.info("idle ready",et)}),xo(()=>{ca(),tr("HostReady"),Jn.info("chrome ready",et)})}async function al(){await El()}async function sl(){if(Em)return;Em=!0;for(let n of Q0)try{Nl(n),zl(n)}catch(r){Jn.error("register failed",n.name,r)}Pl(),tr("Init"),iy(),ay();let t=()=>tr("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await ty(),ca(),Jn.info("styles ready",et),await ey(),oy().then(n=>{n&&wo()}),!await ry()){Jn.warn("late islands not detected; starting default plugins",et),on(),Eo();return}await ql()}var Tm=typeof unsafeWindow<"u"?unsafeWindow:window,sy=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||sy){let t=Tm.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",et);try{Object.defineProperty(Tm,"Bloom",{value:ll,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}al().then(()=>sl()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
