// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260924] v1.4.79
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

/* Bloom++ [20260924] v1.4.79. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Pm=Object.defineProperty;var Om=(t,e)=>{for(var n in e)Pm(t,n,{get:e[n],enumerable:!0})};var hl={};Om(hl,{REPO_URL:()=>Xl,Settings:()=>k,VERSION:()=>it,contextKeyFromUrl:()=>Yt,conversationTitle:()=>xn,conversationToken:()=>xt,currentConversationId:()=>M,hasDraftText:()=>vt,hasErrorToast:()=>Rt,hasLateIslands:()=>Me,init:()=>bl,initSettings:()=>gl,isDocumentInteractive:()=>Jl,isStreaming:()=>J,isUserDraftEmpty:()=>me,messageCreateTime:()=>Jo,plugins:()=>Kt,requestChromeReady:()=>To,requestIdleReady:()=>dn,requestShellReady:()=>Lo,setEditorText:()=>Wt,subscribeHarvest:()=>st,watchStreamingEdge:()=>Q,whenChromeReady:()=>So,whenIdleReady:()=>Eo,whenShellReady:()=>wo});var ae=new Map,mo=!1;function Bm(){return document.getElementById("bloom-root")?.shadowRoot??null}function El(){return document.head??null}function sn(){let t=Bm();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=Dm()}function ma(t,e){if(!mo)return;let n=El();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),sn();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,sn();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,sn()}function E(t,e){let n=ae.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},ae.set(t,n)),mo&&ma(t,n)}function fa(){if(!El())return!1;mo=!0;for(let[e,n]of ae)ma(e,n);return sn(),!0}function Sl(t){let e=ae.get(t);e&&(e.disabled=!1,mo&&ma(t,e))}function Ll(t){let e=ae.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),sn())}function w(t){let e=ae.get(t);e&&(e.el?.remove(),ae.delete(t),sn())}function Dm(){return Array.from(ae.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var S=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function y(t){return t}var pa=new Map;function ln(t,e){let n=pa.get(t);return n||(n=new Set,pa.set(t,n)),n.add(e),()=>n.delete(e)}function Ce(t,e){let n=pa.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var $m="bloompp";function Tl(){return new Promise((t,e)=>{let n=indexedDB.open($m,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function kl(t){try{let e=await Tl();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function Cl(t,e){try{let n=await Tl();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function cn(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function W(t,e,n){return Math.min(n,Math.max(e,t))}function Ml(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function Al(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function Hl(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var fo=new S("SettingsStore"),se="BloomSettings",_m=100;function po(t){return t!=null&&typeof t.then=="function"}function Fm(t){if(t==null||po(t))return null;if(cn(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(cn(e)&&!po(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return cn(n)&&!po(n)?n:null}return null}catch{return null}}function bo(t){let e=Fm(t);if(!e)return null;let n=e.plugins;return!cn(n)||po(n)||Object.keys(n).length===0?null:e}var go=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let d=l.slice(c.length+1);if(d&&!d.includes(".")){let f=u(d);f!==void 0&&(i[a]=f,s=f);break}}}return cn(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){fo.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},_m))}save(){try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(se,this.plain)}catch{try{GM_setValue(se,e)}catch(n){fo.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(se,e)}catch{}Cl(se,e).catch(n=>fo.warn("Failed to save settings to IndexedDB:",n))}catch(e){fo.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){Ml(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var qm=new S("Settings"),zm={plugins:{}},k=new go(structuredClone(zm)),jm=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function Gm(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function L(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?(k.store.plugins[n]||(k.store.plugins[n]={}),k.store.plugins[n]):{}},get plain(){let n=e.pluginName;return n?k.plain.plugins[n]??{}:{}}};return e}async function Um(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function Nl(){let t=bo(await Um(se));if(t||(t=bo(await kl(se))),!t)try{t=bo(localStorage.getItem(se))}catch{t=null}if(!t)return;let e=t.plugins;e&&(k.plain.plugins=e,qm.debug("Loaded settings"))}function Il(t,e){e&&(e.pluginName=t,k.plain.plugins[t]||(k.plain.plugins[t]={}),k.setDefaultGetter(jm(t),n=>{if(n!=="enabled")return Gm(e.def,n)}))}function Rl(){return k.plain.plugins.Settings||(k.store.plugins.Settings={}),k.store.plugins.Settings}function ho(){return Rl().pinnedPlugins??[]}function Pl(t){return ho().includes(t)}function Ol(t){let e=ho(),n=e.includes(t);return k.store.plugins.Settings={...k.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function yo(){return Rl().starredPlugins??[]}function Bl(t){return yo().includes(t)}function Dl(t){let e=yo(),n=e.includes(t);return k.store.plugins.Settings={...k.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var vo=new S("PluginManager"),Kt={},or=new Set;function Fl(t){if(Kt[t.name]){vo.warn("Duplicate plugin",t.name);return}Kt[t.name]=t,Il(t.name,t.settings)}function un(t){let e=Kt[t];if(!e)return!1;if(e.required)return!0;let n=k.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function ql(t){let e=Kt[t];if(!e||e.required)return;let n=!un(t);k.plain.plugins[t]||(k.store.plugins[t]={}),k.store.plugins[t].enabled=n,n?zl(e):Km(e),Ce("pluginToggle",{name:t,enabled:n})}function zl(t,e=!1){if(!or.has(t.name)&&un(t.name))try{t.managedStyle&&Sl(t.managedStyle),t.start?.(),or.add(t.name),t.settings&&k.addPrefixChangeListener(`plugins.${t.name}.`,()=>{or.has(t.name)&&t.onSettingsChange?.()}),e||vo.debug("Started",t.name)}catch(n){vo.error("Failed to start",t.name,n)}}function Km(t){if(or.has(t.name)){try{t.stop?.()}catch(e){vo.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(Ll(t.managedStyle),w(t.managedStyle)),or.delete(t.name)}}function ir(t){for(let e of Object.values(Kt))(e.startAt??"DOMContentLoaded")===t&&zl(e)}var $l=2,_l="defaultsRev";function jl(){let t=k.plain.plugins.Settings;if(!(!t||t[_l]===$l)){for(let e of["NoShareLink","NoDictation"]){let n=k.plain.plugins[e];!n||typeof n.enabled=="boolean"||(n.enabled=!1)}t[_l]=$l}}var ar=!1,xo=!1,ga=!1,Ul=[],Kl=[],Vl=[];function ba(t){let e=t.splice(0);for(let n of e)n()}function sr(){ar||(ar=!0,ba(Ul))}function ha(){xo||(xo=!0,ar||sr(),ba(Kl))}function Wl(){ga||(ga=!0,ar||sr(),xo||ha(),ba(Vl))}function wo(t){ar?t():Ul.push(t)}function Eo(t){xo?t():Kl.push(t)}function So(t){ga?t():Vl.push(t)}function Lo(){sr()}function dn(){sr(),ha()}function To(){Wl()}function Gl(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function Yl(){await Gl(4e3),sr(),await Gl(4e3),ha(),Wl()}var v={p:"0-V-linuxdo"},it="[20260924] v1.4.79",Xl="https://github.com/0-V-linuxdo/Bloom";var Vm={BetterNavigator:1790230458e3,ChatListStatus:1790230458e3,ChatStateFavicons:1790230458e3,Cleaner:1790230458e3,ComposerOpacity:1790230458e3,CustomSidebarIdentity:1790230458e3,GreetingCustomizer:1790230458e3,InputHistory:1790230458e3,MessageTimestamps:1790230458e3,NoDictation:1790230458e3,NoShareLink:1790230458e3,NoSidebarIdentity:1790230458e3,PromptQueue:1790230458e3,RecentTopics:1790230458e3,ResponseNotification:1790230458e3,Settings:1790230458e3,StreamerMode:1790230458e3,WiderChat:1790230458e3};function Zl(t){let e=Vm[t.name];typeof e=="number"&&e>0&&(t.updatedAt=e)}function Wm(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Ym(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function ya(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function Me(){return ya()?Wm()||Ym():!1}function Jl(){return Me()}var Xm=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Ql=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Zm=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Jm="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function fn(t){return t.id==="bloom-root"||!!t.closest(Jm)}function tc(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function ko(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function va(t){if(!(t instanceof HTMLElement)||!t.isConnected||fn(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&ko(e)?!1:t.getClientRects().length>0}function mn(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function Qm(){let t=[];for(let e of document.querySelectorAll(Xm))!(e instanceof HTMLElement)||!e.isConnected||fn(e)||t.push(e);return t}function Co(t){if(!t.isConnected||fn(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function Ae(){return Qm().filter(Co)[0]??null}function pn(){let t=document.getElementById("stage-sidebar-tiny-bar");if(!(t instanceof HTMLElement)||!t.isConnected||fn(t))return null;let e=t.getBoundingClientRect();return e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3?null:t}function xa(t){let e=t,n=t.parentElement;n&&n.children.length===1&&!fn(n)&&!mn(n)&&n.parentElement&&!mn(n.parentElement)&&(e=n);let r=e.parentElement;if(r&&!mn(r)&&!fn(r)&&r.children.length>1){let o=r.getAttribute("class")||"";if(/\bflex\b/.test(o)&&!/flex-col/.test(o)&&r.parentElement&&!mn(r.parentElement))return r}return e}function gn(){let t=document.querySelectorAll(Ql);for(let n of t)if(va(n)&&!ko(n)&&tc(n))return n;let e=document.querySelectorAll(Zm);for(let n of e){if(!va(n)||!tc(n)||ko(n))continue;let r=n.querySelector(Ql);return va(r)&&!ko(r)?r:n}return null}function Mo(){let t=Ae();if(t){let e=xa(t),n=e.parentElement;if(n&&!mn(n))return n;if(!mn(e))return e}return pn()}function Ao(t){let e=Ae();return e?t.composedPath().includes(e):!1}var Ea=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],tf={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function ef(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function nf(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function wa(t){let e=ef(t);return e?nf(e)>.55?"light":"dark":null}function rf(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=wa(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=wa(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=wa(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Ho(t){return t==="auto"?rf():t}function of(t){try{let e=getComputedStyle(document.documentElement);for(let n of Ea){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function No(t,e,n){let r=tf[e];if(n){of(t);for(let o of Ea)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of Ea)t.style.setProperty(o,r[o])}function ec(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var Sa=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var sf="bloom-root",At="bloom-rail-item",Bo="bloom-account-item",Ne="bloom-sidebar-panel",br="bloom-plugin-dialog",jo="bloom-plugin-layer",Do="bloom-settings-css",lf=2e3,oc=null,cf=null,de=!1,Ca=[],Io=null,$o=null,ce=null,Po=null,Vt=null,fr=null,lr,bn=0,pr=0,cr=0,ur=null,dr=null,_o=null,ic=null,mr=null,La=[],Fo=!1,uf=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],df=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],mf=new Set(["chat","ui","privacy"]),ff=10080*60*1e3,Go="",gr="all",Mt="all";function Uo(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function ac(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function pf(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'}function gf(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function bf(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function hf(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var yf={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function vf(t){return t.icon||yf[t.name]||Uo()}function Ta(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),No(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function sc(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function qo(){let t="auto",e=Ho(t);Ta(oc,e,!0);let n=document.getElementById(Ne);n instanceof HTMLElement&&Ta(n,e,!0);let r=document.getElementById(br);r instanceof HTMLElement&&Ta(r,e,!0);let o=document.getElementById(At);o instanceof HTMLElement&&sc(o),Ce("schemeChange",{scheme:e,pref:t})}function lc(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function cc(){if(E("settings",Sa),document.getElementById(Do)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=Do,t.textContent=Sa,document.head.appendChild(t)}function xf(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function wf(){for(let t of Ca)t();Ca=[]}function uc(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function Ef(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function Ha(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function Sf(t){return Ha(t).length>0}function Oo(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function Lf(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=Ef(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function Tf(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(Lf(e,n));let i=k.store.plugins[t]??(k.store.plugins[t]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",Ca.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??Oo(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??Oo(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=uc(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??Oo(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function nc(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function kf(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=k.store.plugins[t.name]??(k.store.plugins[t.name]={});for(let[n,r]of Ha(t)){if(n==="enabled"||r.type===5)continue;let o=Oo(r);o!==void 0&&(e[n]=o)}mc(t)}function dc(t){t.key==="Escape"&&(!document.getElementById(jo)&&!document.getElementById(br)||(t.stopPropagation(),hn()))}function Cf(){Fo||(document.addEventListener("keydown",dc),Fo=!0)}function Mf(){Fo&&(document.removeEventListener("keydown",dc),Fo=!1)}function hn(){wf(),Mf(),document.getElementById(jo)?.remove(),document.getElementById(br)?.remove()}function mc(t){if(hn(),!document.body)return;let e=document.createElement("div");e.id=jo,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",ue),e.addEventListener("pointerup",ue),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&hn()});let n=document.createElement("div");n.id=br,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",ue),n.addEventListener("pointerup",ue),n.addEventListener("click",ue);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=ac(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),hn()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=nc("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=nc("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=Ha(t);if(c.length)for(let[u,d]of c){let f=Tf(t.name,u,d);f&&l.appendChild(f)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>kf(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),Cf(),qo()}function Af(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=vf(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=Bl(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=bf(l),c.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let m=Dl(t.name);Ce("pluginStar",{name:t.name,starred:m})}),s.appendChild(c),!t.required){let b=Pl(t.name),m=document.createElement("button");m.type="button",m.className=`bloom-icon-btn bloom-card-pin${b?" bloom-card-pin-active":""}`,m.setAttribute("aria-label",b?"Unpin from top":"Pin to top"),m.innerHTML=hf(b),m.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();let A=Ol(t.name);Ce("pluginPin",{name:t.name,pinned:A})}),s.appendChild(m)}if(Sf(t)){let b=document.createElement("button");b.type="button",b.className="bloom-icon-btn bloom-card-settings",b.setAttribute("aria-label",`${t.name} settings`),b.innerHTML=gf(),b.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation(),mc(t)}),s.appendChild(b)}let u=uc(t.name,un(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",b=>b.stopPropagation()),d?.addEventListener("change",()=>{ql(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let b=document.createElement("div");b.className="bloom-card-desc",b.textContent=t.description,n.appendChild(b)}let f=document.createElement("div");f.className="bloom-card-separator";let h=document.createElement("div");h.className="bloom-card-footer";let g=document.createElement("div");return g.className="bloom-card-author",g.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",h.appendChild(g),e.append(n,f,h),e}function fc(){return Object.values(Kt).filter(t=>!t.hidden&&t.name!=="Settings")}function Hf(t){return t.updatedAt!=null&&Date.now()-t.updatedAt<ff}function pc(t,e){if(e==="all"||e==="favorites")return!0;if(e==="recent")return Hf(t);let n=(t.tags??[]).map(r=>r==="sidebar"?"ui":r);return e==="other"?!t.required&&!n.some(r=>mf.has(r)):n.includes(e)}function Nf(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function If(){return Go.trim()?"No plugins match your search.":Mt==="favorites"?"No favorites yet. Star a plugin to see it here.":Mt==="recent"?"No plugins updated in the last 7 days.":"No plugins available."}function Rf(){let t=fc();return df.filter(e=>e.id==="favorites"||e.id==="all"||e.id==="recent"?!0:t.some(n=>pc(n,e.id)))}function Pf(){if(mr){mr.replaceChildren();for(let t of Rf()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${Mt===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{Mt=t.id,He()}),mr.appendChild(e)}}}function Of(){let t=fc();if(Mt==="favorites"){let e=new Set(yo());t=t.filter(n=>e.has(n.name))}else Mt!=="all"&&(t=t.filter(e=>pc(e,Mt)));return gr==="enabled"&&(t=t.filter(e=>un(e.name))),gr==="disabled"&&(t=t.filter(e=>!un(e.name))),t}function He(){if(!ur)return;Pf();let t=Of();_o&&(_o.placeholder=`Search ${t.length} plugins...`);let e=t,n=Go.trim().toLowerCase();if(n&&(e=e.filter(r=>Nf(r).includes(n))),Mt==="recent")e=e.slice().sort((r,o)=>(o.updatedAt??0)-(r.updatedAt??0)||r.name.localeCompare(o.name));else if(Mt!=="favorites"){let r=ho();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}ur.replaceChildren();for(let r of e)ur.appendChild(Af(r));dr&&(dr.hidden=e.length>0,dr.textContent=If())}function ue(t){t.stopPropagation()}function ka(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function Na(){document.getElementById(At)?.setAttribute("aria-expanded",de?"true":"false")}function Bf(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function Ia(){hn(),Go="",gr="all",Mt="all",document.getElementById(Ne)?.remove(),de=!1,Na()}function Df(t){let e=document.createElement("div");e.id=t,e.setAttribute("aria-labelledby","bloom-settings-title"),e.addEventListener("pointerdown",ue),e.addEventListener("pointerup",ue),e.addEventListener("click",ue);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=Uo();let a=document.createElement("span");a.className="bloom-settings-title-row";let s=document.createElement("h2");s.id="bloom-settings-title",s.textContent="Bloom++";let l="Toggle features. Some need a reload. Click the sliders icon to configure.",c=document.createElement("button");c.type="button",c.className="bloom-info-hint",c.setAttribute("aria-label",l),c.innerHTML=pf();let u=document.createElement("span");u.className="bloom-info-hint-tip",u.setAttribute("role","tooltip"),u.textContent=l,c.appendChild(u),a.append(s,c),o.append(i,a);let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn bloom-settings-close",d.setAttribute("aria-label","Close"),d.innerHTML=ac(),d.addEventListener("click",Ia),r.appendChild(o),n.appendChild(r);let f=document.createElement("div");f.className="bloom-plugin-tabs",n.appendChild(f);let h=document.createElement("div");h.className="bloom-search-bar";let g=document.createElement("input");g.type="search",g.className="bloom-search-input",g.setAttribute("aria-label","Search plugins"),g.placeholder="Search plugins...",g.addEventListener("input",()=>{Go=g.value,He()});let b=document.createElement("select");b.className="bloom-search-filter",b.setAttribute("aria-label","Filter plugins");for(let A of uf){let N=document.createElement("option");N.value=A.value,N.textContent=A.label,b.appendChild(N)}b.value=gr,b.addEventListener("change",()=>{gr=b.value,He()}),h.append(g,b),n.appendChild(h);let m=document.createElement("div");m.className="bloom-plugin-list",n.appendChild(m);let T=document.createElement("p");return T.className="bloom-tab-empty",T.hidden=!0,n.appendChild(T),e.append(d,n),ur=m,dr=T,_o=g,ic=b,mr=f,He(),e}function $f(t){t.classList.add("bloom-rail-dock")}function _f(){let t=document.getElementById(At);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&Co(t)?t:null}function Ff(){if(document.getElementById(Ne)?.remove(),!document.body)return;let t=Df(Ne);$f(t),document.body.appendChild(t),de=!0,hn(),qo(),Na(),Ce("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:it,dock:"center",rail:!!_f()})}function Ra(){let t=document.getElementById(Ne);if(t instanceof HTMLElement&&t.isConnected&&Bf(t)){Ia();return}t?.remove(),Ff()}function qf(){let t=document.createElement("button");return t.type="button",t.id=At,t.className="bloom-rail-item",t.setAttribute("aria-controls",Ne),t.setAttribute("aria-expanded",de?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${Uo()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Ra()}),t}function rc(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function zf(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function jf(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function le(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function gc(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=zf(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&le(t,"padding-top",Math.round(i)),Number.isFinite(a)&&le(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));le(n,"width",l),le(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&le(t,"padding-left",u);let d=jf(e,r);if(d){let f=d.getBoundingClientRect(),h=n.getBoundingClientRect(),g=Math.round(f.left-h.right);g>=0&&g<=24&&le(t,"gap",g)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&le(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&le(t,"gap",Math.round(l))}sc(t)}function Ma(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function Gf(){if(fr?.isConnected&&Vt){Vt.observe(fr,{childList:!0});return}Aa()}function Uf(t){if(Ma(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function Kf(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){cr=0;return}cr+=1,pr=Date.now()+Math.min(8e3,250*2**Math.min(cr,5))})}function Vf(){bn||Date.now()<pr||(bn=requestAnimationFrame(()=>{bn=0,!(Date.now()<pr)&&(document.getElementById(At)?.isConnected||zo())}))}function zo(){if(!document.body)return;Vt?.disconnect();let t=null,e=!1;try{let n=document.getElementById(At);t=n instanceof HTMLButtonElement?n:qf();let r=Ae(),o=pn();if(r){let i=xa(r),a=i.parentElement;if(Ma(i)||a&&Ma(a))return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),rc(t),gc(t,r)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),rc(t,!0)):t.isConnected&&!Co(t)&&(t.remove(),t=null)}finally{Kf(t,e),Gf(),Na()}}function Aa(){let t=Mo();!t||!Uf(t)||fr===t&&Vt||(Vt?.disconnect(),fr=t,Vt=new MutationObserver(()=>{document.getElementById(At)?.isConnected||Vf()}),Vt.observe(t,{childList:!0}))}function Wf(){zo(),Aa(),lr===void 0&&(lr=window.setInterval(()=>{let t=document.getElementById(At);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=pr&&zo();else{cr=0;let e=Ae();e&&gc(t,e)}Aa()},lf))}function Yf(){lr!==void 0&&(clearInterval(lr),lr=void 0),bn&&cancelAnimationFrame(bn),bn=0,pr=0,cr=0,Vt?.disconnect(),Vt=null,fr=null}function Xf(t){Po===t&&ce||(ce?.disconnect(),Po=t,ce=new MutationObserver(()=>{if(!t.isConnected){ce?.disconnect(),ce=null,Po=null;return}bc(t)}),ce.observe(t,{childList:!0}))}function bc(t){if(Xf(t),t.querySelector(`#${Bo}`))return;let e=document.createElement("button");e.type="button",e.id=Bo,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${Uo()}<span>Bloom++</span>`,e.addEventListener("pointerdown",ka),e.addEventListener("pointerup",ka),e.addEventListener("click",n=>{ka(n),Ra()}),t.insertBefore(e,t.firstChild)}function Ro(){let t=gn();return t?(bc(t),!0):!1}function Zf(t){Ao(t)&&(queueMicrotask(Ro),requestAnimationFrame(()=>{Ro()}),window.setTimeout(Ro,60),window.setTimeout(Ro,180))}function Jf(){$o?.abort();let t=new AbortController;$o=t,document.addEventListener("click",Zf,{signal:t.signal})}function Qf(){$o?.abort(),$o=null,ce?.disconnect(),ce=null,Po=null}function hc(){dn(),xf(()=>{cc(),lc(),zo(),Ra()})}var yc=y({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[v.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${sf}`,`#${At}`,`#${Bo}`,`#${Ne}`,`#${jo}`,`#${br}`,`#${Do}`,"#bloom-menu-panel"],start(){cc(),lc(),Wf(),Jf(),Io?.(),Io=ec(qo),qo(),La=[ln("pluginToggle",()=>{de&&He()}),ln("pluginPin",()=>{de&&He()}),ln("pluginStar",()=>{de&&He()})]},stop(){Yf(),Qf(),Io?.(),Io=null;for(let t of La)t();La=[],Ia(),document.getElementById(At)?.remove(),document.getElementById(Bo)?.remove(),document.getElementById(Do)?.remove(),oc=null,cf=null,ur=null,dr=null,_o=null,ic=null,mr=null,de=!1}});var Ko='form[data-type="unified-composer"], form.w-full[data-type]',Ht=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),yn=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),vc=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),xc=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),tp=/stop streaming|stop generating|停止生成|停止输出|停止响应/,ep='[contenteditable="false"], button, [role="button"]';function ht(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function Ie(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!ht(o)))return o;return null}function wc(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function B(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=wc(t);return!!(tp.test(n)||/^stop$/i.test(n))}function yt(){let e=Array.from(document.querySelectorAll(Ko)).find(ht);if(e instanceof HTMLElement)return e;let n=Ie(document,Ht),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function Y(){let t=Array.from(document.querySelectorAll(Ht));return t.find(ht)??t[0]??null}function np(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(ep);return!!n&&n!==e&&e.contains(n)}function Pa(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&np(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function vt(t){let e=t??Y();return e?Pa(e,e).replaceAll("\u200B","").trim().length>0:!1}function me(t){return!vt(t)}function Vo(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function Ec(t){let e=yt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!ht(n))&&t(n))return n;return null}function fe(){let t=yt(),e=Ie(t,yn)??Ie(document,yn);return e&&!B(e)?e:Ec(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!B(n);let o=wc(n);return/^(send|send prompt|发送)$/i.test(o)&&!B(n)})}function Re(){let t=yt(),e=Ie(t,vc,!0)??Ie(document,vc,!0);if(e)return e;let n=Ie(t,xc)??Ie(document,xc);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&ht(r)&&B(r))return r}return Ec(B)}function at(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>Pa(n,t)).join(`
`):Pa(t,t)}function Oa(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function Wt(t,e,n=!1){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),Oa(t,n)}var Sc=/\/c\/([a-zA-Z0-9_-]{8,})/i;function xt(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function Yt(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function Xt(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(Sc)?.[1]??""}catch{return t.match(Sc)?.[1]??""}}function M(){return Xt(location.pathname)}var Cc=new S("Harvest"),rp=1500,op=200,Wo=new Set,Yo=new Map,Xo=new Map,vn=null,Zo=null,hr=null,Nt=0;function ip(){return typeof unsafeWindow<"u"?unsafeWindow:window}function ap(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function sp(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}function Mc(t){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(t)}var lp=/"action"\s*:\s*"(next|continue|variant)"/i;function cp(t,e,n){return!(e!=="POST"||Mc(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!lp.test(n))}function up(t,e){return e!=="GET"||Mc(t)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(t)}function Lc(t){return t.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function Ac(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function dp(t){return typeof t=="string"?Ac(t):""}function Ba(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return Ba(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function Hc(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function Tc(t,e,n){!t||!e||Xo.get(t)!==e&&(Xo.set(t,e),Hc(Xo,rp),pe({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function mp(t,e){let n=e.trim();!t||!n||Yo.get(t)!==n&&(Yo.set(t,n),Hc(Yo,op),pe({type:"conversation-meta",conversationId:t,title:n}))}function yr(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)yr(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&mp(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=Ba(l.create_time??l.createTime??l.created_at);c&&u&&Tc(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=Ba(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&Tc(a,s,o),r.mapping&&typeof r.mapping=="object")yr(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&yr(l,o,n+1)}function kc(t,e){if(t)try{yr(JSON.parse(t),e)}catch{}}function pe(t){for(let e of Array.from(Wo))try{e(t)}catch{}}async function fp(t,e,n){if(n===Nt)try{let r=await t.json();if(n!==Nt)return;yr(r,e)}catch{}}async function pp(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===Nt&&pe({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===Nt;){let{done:u,value:d}=await s.read();if(u)break;if(c+=l.decode(d,{stream:!0}),!o){let h=Ac(c);h&&(o=h,pe({type:"post-start",conversationId:o,url:""}))}let f=c.split(`
`);c=f.pop()??"";for(let h of f){let g=h.replace(/^data:\s*/,"").trim();!g||g==="[DONE]"||kc(g,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===Nt&&kc(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===Nt&&pe({type:"post-end",conversationId:o,error:i})}function gp(t,e,n){let r=ap(e),o=sp(e,n),i=up(r,o),a=cp(r,o,n?.body),s=Nt,l="";return a&&(l=dp(n?.body)||Lc(r)||Xt(r)||M(),pe({type:"post-start",conversationId:l,url:r})),t(e,n).then(c=>{if(s!==Nt||!i&&!a)return c;try{let u=c.clone();i?fp(u,Lc(r)||M(),s):pp(u,l,!c.ok,s)}catch{a&&pe({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===Nt&&pe({type:"post-end",conversationId:l,error:!0}),c})}function bp(){if(vn)return;let t=ip();hr=t,vn=t.fetch.bind(t);let e=(n,r)=>gp(vn,n,r);Zo=e,t.fetch=e,Cc.debug("conversation fetch harvest hooked")}function hp(){Nt+=1,!(!vn||!hr)&&(Zo&&hr.fetch===Zo&&(hr.fetch=vn),vn=null,Zo=null,hr=null,Cc.debug("conversation fetch harvest unhooked"))}function st(t){return Wo.add(t),bp(),()=>{Wo.delete(t),Wo.size===0&&hp()}}function xn(t){return t?Yo.get(t)??"":""}function Jo(t){return t?Xo.get(t)??null:null}var Ic=new S("Streaming");function Sr(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!ht(e))&&(B(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function yp(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&ht(t))}function vp(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&ht(t))}function xp(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Rt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function J(){if(Re()||Sr()||xp())return!0;let t=fe();return t&&ht(t)&&!B(t)?!1:!!(yp()||vp())}var wp=400,Nc=3,De=new Set,vr,xr=null,Da=null,Oe=!1,Pe=0,be="",he="",ye=!1,wr=!1,Er=!1,It=!1,q=null,lt="",Be=!1;function X(){return It}function Rc(){return ye}function ei(){return lt}function $a(){return M()||lt}function Pc(){return Yt(xt())}function Qo(t,e){return{streaming:t,contextKey:e,conversationId:$a()}}function _a(t){try{let e=t.split("|")[0]||"";return new URL(e).pathname.replace(/\/$/,"")||"/"}catch{return""}}function Ep(t){return!t||t==="/"||t.startsWith("/g/")}function $(t,e){if(!t||t===e)return!1;let n=Xt(_a(e)||e);return!n||!(t.endsWith("|draft")||Ep(_a(t)))?!1:lt?n===lt:Be}function ti(){Oe=!1,Pe=0,be="",ye=!1,wr=!1,Er=!1,lt="",Be=!1}function Sp(t){for(let e of Array.from(De))try{e.onFall?.(t)}catch{}}function Lp(t){for(let e of Array.from(De))try{e.onRise?.(t)}catch{}}function ge(t){for(let e of Array.from(De))try{e.onTick?.(t)}catch{}}function Tp(t,e){for(let n of Array.from(De))try{n.onContext?.(t,e)}catch{}}function kp(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&B(n)&&(ye=!0)}function Cp(t){if(t.type==="post-start"){let n=M();if(!t.conversationId){n||(Be=!0),(!n||n===lt)&&(It=!1,ye=!1);return}if(!(t.conversationId===n||t.conversationId===lt)&&!(!n&&Be))return;lt=t.conversationId,Be=!1,It=!1,ye=!1;return}if(t.type!=="post-end"||!Oe&&!q)return;let e=M();t.conversationId&&!(e?t.conversationId===e:t.conversationId===lt)||(Er=!0,t.error&&(wr=!0,q&&(q.error=!0)))}function Mp(){let t=Pc(),e=J();if(he&&t&&he!==t){let o=he;if(!$(o,t))q=null,ti(),It=e;else{let i=Xt(_a(t));if(i&&!lt&&(lt=i,Be=!1),be===o&&(be=t),q&&q.contextKey===o){q.contextKey=t;let a=$a();a&&(q.conversationId=a)}It=!1}if(he=t,Tp(t,o),It){ge(Qo(!1,t));return}}else t&&(he=t);if(It){if(e){ge(Qo(!1,t));return}It=!1}if(q)if(e||q.contextKey!==t)q=null;else{let o=q;q=null,ti(),Sp(o),ge(Qo(!1,t));return}let n=Qo(e,t);if(e){let o=!Oe;o&&(ye=!1,wr=!1,Er=!1),Oe=!0,Pe=0,be=t,o&&Lp(n),ge(n);return}if(!Oe){ge(n);return}if(Pe+=1,Er&&(Pe=Math.max(Pe,Nc)),Pe<Nc){ge(n);return}if(!(!!be&&be===t)){ti(),ge(n);return}q={contextKey:be||t,conversationId:$a(),userStopped:ye,error:wr||Rt()},ge(n)}function Ap(){vr===void 0&&(Oe=J(),he=Pc(),be=Oe?he:"",Pe=0,ye=!1,wr=!1,Er=!1,It=!1,q=null,lt="",Be=!1,xr?.abort(),xr=new AbortController,document.addEventListener("click",kp,{capture:!0,signal:xr.signal}),Da=st(Cp),vr=setInterval(Mp,wp),Ic.debug("watchStreamingEdge started"))}function Hp(){De.size||(vr!==void 0&&(clearInterval(vr),vr=void 0),xr?.abort(),xr=null,Da?.(),Da=null,ti(),he="",It=!1,q=null,Ic.debug("watchStreamingEdge stopped"))}function Q(t){let e=typeof t=="function"?{onFall:t}:t;return De.add(e),Ap(),()=>{De.delete(e),Hp()}}var Oc="bloom-host-icon",Lr="data-bloom-host-rel",Fa="not all",qa=0,Bc=0,Np=400;function Dc(t){qa+=1;try{t()}finally{qa-=1}}function ni(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function ve(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function $c(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function Ip(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Rp(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-Bc<Np||(Bc=n,t.appendChild(e))}function Pp(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||ni(n)&&(n.getAttribute(Lr)||n.setAttribute(Lr,n.rel),n.media!==Fa&&(n.media=Fa),n.rel!==Oc&&(n.rel=Oc))}function Op(t){for(let e of t.querySelectorAll(`link[${Lr}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(Lr);n&&(e.rel=n),e.removeAttribute(Lr),e.media===Fa&&e.removeAttribute("media")}}function _c(t,e){let{head:n}=document;!n||!e||Dc(()=>{Pp(n,t);let r=$c(t),{type:o,sizes:i}=Ip(e);r?Rp(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function Fc(t,e){let{head:n}=document;n&&Dc(()=>{$c(t)?.remove(),Op(n)})}function qc(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(qa)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:ni(c.target)&&(a=!0,ve(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)ni(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)ni(u)&&u.id!==t&&(a=!0,ve(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var Bp=["original","badge","dot","hole","bg"],Gc=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],Uc={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},ri="#FCFCFC",Dp="#111111",zc="#111111",$p="#ffffff",_p="#212121",Fp="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",qp={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},oi=32,jc=64;function Kc(t){return typeof t=="string"&&Bp.includes(t)}function zp(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function ii(t){let e=document.createElement("canvas");e.width=oi,e.height=oi;let n=e.getContext("2d");return n?(n.scale(oi/jc,oi/jc),t(n),e.toDataURL("image/png")):""}function jp(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function ai(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(Fp);n&&(t.strokeStyle=Dp,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function Gp(t,e,n){let r=Uc[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=zc,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=zc,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=$p,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function Tr(t,e){if(t==="original")return e==="wait"?ii(r=>ai(r,ri)):zp(qp[e]);let n=e==="wait"?void 0:Uc[e];return ii(t==="hole"?r=>ai(r,n??ri):t==="bg"?r=>{r.fillStyle=n??_p,jp(r,0,0,64,64,14),r.fill(),ai(r,ri,!1)}:r=>{ai(r,ri),e!=="wait"&&Gp(r,e,t==="dot"?"dot":"badge")})}function Vc(t){return{wait:Tr(t,"wait"),rotate:Tr(t,"rotate"),done:Tr(t,"done"),ready:Tr(t,"ready"),error:Tr(t,"error")}}var Up=new S("ChatStateFavicons"),_e="bloom-chat-state-favicon",Jc=["input","beforeinput","cut","paste","compositionend"],Qc=L({style:{type:3,description:"Favicon overlay",options:Gc}}),Pt="",Ga={wait:"",rotate:"",done:"",ready:"",error:""},kr="wait",tt=!1,z=!1,I=null,nt="",ct="",qe=!0,ci=!1,wn=null,ut=0,si=null,li=null,$e=null,ja=null,En=null,wt=!1,Wc=new WeakSet;function Kp(){let t=Qc.store.style;return Kc(t)?t:"bg"}function tu(){let e=document.querySelector(`link[rel~="icon"]:not(#${_e}), link[data-bloom-host-rel]:not(#${_e})`)?.href;return ve(e)?e:ve(Pt)?Pt:""}function Vp(){let t=document.getElementById(_e);return t instanceof HTMLLinkElement?t:null}function Wp(){if(!ve(Pt)){let t=tu();t&&(Pt=t)}return ve(Pt)?Pt:Ga.wait}function eu(t){return t==="wait"?Wp():Ga[t]}function nu(){_c(_e,eu(kr))}function O(t){let e=eu(t);if(kr===t){let n=Vp();if(n&&n.getAttribute("href")===e)return}kr=t,nu()}function Yc(){Ga=Vc(Kp()),O(kr)}function Ua(){return Yt(xt())}function Ka(t,e){!t||!e||t===e||(I===t&&(I=e),nt===t&&(nt=e),ct===t&&(ct=e))}function Yp(){let t=Ua();if(!(J()||tt||z))return nt="",t;if(nt&&t&&nt!==t)if($(nt,t))Ka(nt,t),nt=t;else return nt="",t;else!nt&&t&&(nt=t);return nt||t}function Xc(t){return!I||!t?!1:I===t?!0:$(I,t)}function ru(){tt=!1,z=!1,I=null,nt=""}function ou(t){ct=t,ru(),qe=!1,ci=!0,O("wait")}function za(t){return!t&&qe}function Xp(){if(!wt)return;let t=Ua();if(ct&&t&&ct!==t&&!$(ct,t)){ou(t);return}ct&&t&&$(ct,t)&&Ka(ct,t),t&&(ct=t);let e=J(),n=e&&!X();if(ci){if(X()){O("wait");return}ci=!1}if(X()){O("wait");return}let r=Yp(),o=me();if(Rc()&&!e){tt=!1,z=!1,I=null,O(o?"wait":za(o)?"ready":"wait");return}if(Rt()&&!e&&tt){O("error"),tt=!1,z=!1,I=null;return}if(n){tt||(qe=!1),tt=!0,z=!1,I=r,O("rotate");return}if(tt)if(!Xc(t))tt=!1,z=!1,I=null;else if(z){tt=!1,z=!0,I=t||r,O("done");return}else{O("rotate");return}if(z)if(I&&t&&!Xc(t))z=!1,I=null;else if(o){I=r||I,O("done");return}else if(za(o)){z=!1,O("ready");return}else{z=!1,O("wait");return}I=null,o?O("wait"):za(o)?O("ready"):O("wait")}function Fe(){wt&&(cu(),au(),su(),Xp())}function iu(){if(En){for(let t of Jc)En.removeEventListener(t,lu,!0);En=null}}function au(){let t=yt(),e=t&&t!==document.body?t:null;if(!(En===e&&e?.isConnected)&&(iu(),!!e)){En=e;for(let n of Jc)En.addEventListener(n,lu,{capture:!0,passive:!0})}}function su(){let t=yt();if(!($e&&ja===t&&t.isConnected)){if($e?.disconnect(),ja=t,!t||t===document.body){$e=null;return}$e=new MutationObserver(()=>ui()),$e.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function ui(){if(wt){if(document.hidden){ut&&(cancelAnimationFrame(ut),ut=0),Fe();return}ut||(ut=requestAnimationFrame(()=>{ut=0,wt&&Fe()}))}}function lu(){vt()&&(qe=!0),ui()}function Zc(){vt()&&(qe=!0),ui()}function Zp(){wt&&(ut&&(cancelAnimationFrame(ut),ut=0),Fe())}function Jp(){wt&&(qe=!1,Fe())}function Qp(t){if(!wt)return;if(t.userStopped){tt=!1,z=!1,I=null,O("wait");return}if(t.error){tt=!1,z=!1,I=null,O("error");return}let e=Ua();if(t.contextKey&&e&&t.contextKey!==e&&!$(t.contextKey,e)){tt=!1,z=!1,I=null,O("wait");return}tt=!1,z=!0,I=e||t.contextKey,O("done")}function tg(){wt&&Fe()}function eg(t,e){if(wt){if($(e,t)){Ka(e,t),ct=t,Fe();return}ou(t)}}function cu(){let t=Y();!t||Wc.has(t)||(Wc.add(t),t.addEventListener("input",Zc,{capture:!0,passive:!0}),t.addEventListener("compositionend",Zc,{capture:!0,passive:!0}))}var uu=y({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Qc,startAt:"DOMContentLoaded",cleanupSelectors:[`#${_e}`],start(){wt=!0,Pt=tu()||Pt,Yc(),li?.disconnect(),li=qc(_e,t=>{ve(t)&&(Pt=t),nu()}),wn?.abort(),wn=new AbortController,window.addEventListener("popstate",ui,{signal:wn.signal}),document.addEventListener("visibilitychange",Zp,{signal:wn.signal}),cu(),au(),su(),si?.(),si=Q({onRise:Jp,onFall:Qp,onTick:tg,onContext:eg}),Fe(),Up.debug("favicon watch started")},stop(){wt=!1,ut&&cancelAnimationFrame(ut),ut=0,si?.(),si=null,wn?.abort(),wn=null,iu(),$e?.disconnect(),$e=null,ja=null,li?.disconnect(),li=null,ru(),ct="",qe=!0,ci=!1,kr="wait",Fc(_e,Pt)},onSettingsChange:Yc});var du=`.bloom-ih-hud {
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
`;var jv=new S("InputHistory"),Va=/\u200B/g,mu=10,fu=500,pu=100,rg=8,og=120,ig=2e3,di=10,mi=L({maxEntries:{type:4,description:"Max stored prompts",min:mu,max:fu,default:pu},history:{type:5,description:"Stored prompts",render:xg},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Wa=new Map,j=0,Ya="",Ot=!1,Mr=!1,Ja=0,Cr=null,Xa,Qa=null,gu=!0;function Et(){let t=mi.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function bu(t){let e=W(Number(mi.store.maxEntries??pu),mu,fu);return t.length>e?t.slice(t.length-e):t}function fi(t){mi.store.entries=bu(t)}function ag(t){return t.replaceAll(Va,"").replace(/\n$/,"").trim()}function Za(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Ht);return n instanceof HTMLElement?n:Y()}function sg(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!at(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(Va,"").trim().length===0,last:i.toString().replaceAll(Va,"").trim().length===0}}catch{return{first:!0,last:!0}}}function hu(t){clearTimeout(Xa),Xa=setTimeout(()=>{if(t!==Ja)return;Mr=!1;let e=Qa;e&&Oa(e,gu)},og)}function yu(t,e,n){Mr=!0,Qa=t,gu=n;let r=++Ja;Wt(t,e,n),hu(r)}function lg(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function Sn(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function cg(){document.querySelector(".bloom-ih-hud")?.remove()}function ug(t,e){let n=lg();n.textContent=t;let r=(e.closest("form")??yt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-rg)}px`,n.classList.add("bloom-ih-hud-on")}function ts(t){let e=ag(t);if(!e)return;let n=Date.now(),r=Wa.get(e);if(r&&n-r<ig)return;Wa.set(e,n);let o=Et().filter(i=>i!==e);o.push(e),fi(o),j=Et().length,Ot=!1,Sn()}function dg(t,e){let n=Et();if(!n.length&&t)return;j>=n.length&&(Ya=at(e),j=n.length);let r=t?j-1:j+1;r<0||r>n.length||(j=r,Ot=!0,yu(e,r===n.length?Ya:n[r],t),r<n.length?ug(`${r+1} / ${n.length}`,e):Sn())}function mg(t){Ot=!1,Sn(),yu(t,Ya,!1),j=Et().length}function fg(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=Za(t.target)??Za(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&Ot&&!t.altKey&&!t.shiftKey){mg(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){ts(at(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=Et();if(!r){let i=sg(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||j<=0)||!n&&j>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),dg(n,e))}function pg(t){if(Za(t.target)){if(Mr){hu(Ja);return}Ot&&(Ot=!1,Sn(),j=Et().length)}}function gg(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(Ht);n instanceof HTMLElement&&ts(at(n))}function bg(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(yn);if(!n||!(n instanceof HTMLElement)||B(n))return;let r=Y();r&&ts(at(r))}function hg(t){if(!(!Ot||Mr)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}Ot=!1,Sn()}}function yg(){if(Cr)return;Cr=new AbortController;let{signal:t}=Cr,e={capture:!0,signal:t};window.addEventListener("keydown",fg,e),window.addEventListener("input",pg,e),window.addEventListener("submit",gg,e),window.addEventListener("click",bg,e),window.addEventListener("pointerdown",hg,e)}function vg(t){let e=Et().slice();e.splice(t,1),fi(e),j>e.length&&(j=e.length)}function xg(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=Et().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(m=>m.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/di));n>=l&&(n=l-1);let c=s.slice(n*di,n*di+di);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let m=document.createElement("div");m.className="bloom-ih-list",c.forEach((T,A)=>{let N=i.indexOf(T),Gt=Et().length-1-N,Ct=document.createElement("div");Ct.className="bloom-ih-item";let et=document.createElement("button");et.type="button",et.className=`bloom-ih-body${r===A?"":" bloom-ih-clamp"}`,et.textContent=T,et.addEventListener("click",()=>{r=r===A?-1:A,o()});let R=document.createElement("div");R.className="bloom-ih-actions";let ot=document.createElement("button");ot.type="button",ot.title="Copy",ot.textContent="C",ot.addEventListener("click",()=>{Al(T)});let Ut=document.createElement("button");Ut.type="button",Ut.title="Delete",Ut.textContent="\xD7",Ut.addEventListener("click",()=>{vg(Gt),o()}),R.append(ot,Ut),Ct.append(et,R),m.appendChild(Ct)}),t.appendChild(m)}else{let m=document.createElement("p");m.className="bloom-ih-empty",m.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(m)}let d=document.createElement("div");d.className="bloom-ih-pager";let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Prev",f.disabled=n<=0,f.addEventListener("click",()=>{n-=1,o()});let h=document.createElement("span");h.textContent=`${n+1} / ${l}`;let g=document.createElement("button");g.type="button",g.className="bloom-ih-btn",g.textContent="Next",g.disabled=n+1>=l,g.addEventListener("click",()=>{n+=1,o()});let b=document.createElement("button");b.type="button",b.className="bloom-ih-clear",b.textContent="Clear all",b.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(fi([]),j=0,o())}),d.append(f,h,g,b),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var vu=y({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:mi,startAt:"HostReady",managedStyle:"inputHistory",start(){E("inputHistory",du),j=Et().length,Ot=!1,yg()},stop(){Cr?.abort(),Cr=null,Sn(),cg(),Wa.clear(),clearTimeout(Xa),Mr=!1,Qa=null,Ot=!1},onSettingsChange(){let t=Et(),e=bu(t);e.length!==t.length&&fi(e),j>e.length&&(j=e.length)}});var es="noShareLink",wg=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],Eg=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],ns=L({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function xu(t){return`${t.join(",")}{display:none!important}`}function wu(){let t=[];if(ns.store.hideShareChat!==!1&&t.push(xu(wg)),ns.store.hideShareProject!==!1&&t.push(xu(Eg)),!t.length){w(es);return}E(es,t.join(`
`))}var Eu=y({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:ns,start:wu,onSettingsChange:wu,stop(){w(es)}});var Tu="noDictation",Sg=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],Lg=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],ku=L({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Su(t){return`${t.join(",")}{display:none!important}`}function Lu(){let t=[Su(Sg)];ku.store.hideDictationSettings!==!1&&t.push(Su(Lg)),E(Tu,t.join(`
`))}var Cu=y({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:ku,start:Lu,onSettingsChange:Lu,stop(){w(Tu)}});var rs="noSidebarIdentity",Ln=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Hu=Ln.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),Nu=Ln.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),Tg=[...Hu,...Nu],kg=[...Hu,...Ln.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],Cg=Ln.map(t=>`${t} a[href^="mailto:"]`),Mg=Ln.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),Ag=Ln.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),Ar=L({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function Mu(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Hg(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function Ng(){return`${Ag.join(",")}{margin-block:auto!important}`}function Ig(){return`${Mg.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function Au(){let t=Ar.store.hideUsername!==!1,e=Ar.store.hideEmail!==!1,n=t&&Ar.store.enlargePlan!==!1,r=t&&Ar.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(Hg([...kg,...Nu])),o.push(Ng())):o.push(Mu(Tg))),e&&o.push(Mu(Cg)),n&&o.push(Ig()),!o.length){w(rs);return}E(rs,o.join(`
`))}var Iu=y({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Ar,start:Au,onSettingsChange:Au,stop(){w(rs)}});var Ru=`#bloom-rt-host {
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
`;var Bu=new S("RecentTopics"),Cn="bloom-rt-host",Du="home",$u=/^\/c\/([a-z0-9_-]{8,})/i,Pg=/\/c\/([a-z0-9_-]{8,})/i,_u=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Og=new Set(["Backquote","IntlBackslash"]),Bg=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Dg=140,$g=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),G=L({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:$g},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),pi=null,gi=null,rt=!1,Or=!1,Hr=!1,Bt=0,ze="",Tn=null,Nr=null,kn,os=null,is=null;function _g(){let t=Number(G.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function Ir(){let t=G.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function ss(){let t=G.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Fu(){let t=G.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function ls(){let t=G.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function hi(t){let e=_g();return t.length>e?t.slice(0,e):t}function Dt(t){return t===Du}function Rr(t,e=Dg){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function cs(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match($u)?.[1]??""}catch{return t.match(Pg)?.[1]??""}}function je(){let t=(location.pathname||"/").match($u);if(t?.[1])return t[1];let n=xt().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return Du}function us(t){if(Dt(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(cs(r.getAttribute("href")||"")!==t)continue;let o=Rr(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return je()===t&&e&&!/^ChatGPT$/i.test(e)?Rr(e,80):""}function Fg(t){if(Dt(t))return"New chat";let e=ss()[t];if(e)return e;let n=xn(t);return n||us(t)||"Chat"}function qg(t){return ls()[t]||""}function zg(t){return Fu()[t]||{}}function ds(t,e){if(!t||Dt(t)||!e||/^new chat$/i.test(e.trim()))return;let n=ss();n[t]!==e&&(n[t]=e,G.store.titles=n)}function jg(t){t.type==="conversation-meta"&&(ds(t.conversationId,t.title),rt&&Mn())}function Gg(t,e){if(!t||Dt(t)||!e)return;let n=ls();n[t]!==e&&(n[t]=e,G.store.projects=n)}function Ug(t,e){if(!t||Dt(t)||!e.user&&!e.assistant)return;let n=Fu(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,G.store.previews=n)}function ms(t){if(!t||Dt(t)&&G.store.includeHome===!1)return;let e=Ir().filter(n=>n!==t);e.unshift(t),G.store.visits=hi(e)}function yi(){let t=G.store.includeHome!==!1;return hi(Ir().filter(n=>t||!Dt(n))).map(n=>({id:n,title:Fg(n),project:qg(n),preview:zg(n)}))}function Pu(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return Rr(o)}catch{return""}}function Pr(t){if(!t||Dt(t)||t!==je())return;let e=us(t);e&&ds(t,e);let n=Pu("user"),r=Pu("assistant");Ug(t,{user:n,assistant:r});let o=zu(t);if(o){let i=qu(o);i&&Gg(t,i)}}function fs(){let t=ss(),e=ls(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${Cn}, #bloom-root, #bloom-sidebar-panel`))continue;let u=cs(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=Rr(c.textContent||"",80);d&&!_u.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let f=qu(c);f&&e[u]!==f&&(e[u]=f,i=!0)}}catch{}o&&(G.store.titles=t),i&&(G.store.projects=e);let a=Ir(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(G.store.visits=hi([...a,...l]))}function qu(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=Rr((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!_u.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function zu(t){if(Dt(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(cs(e.getAttribute("href")||"")===t)return e}catch{}return null}function Kg(t){let e=zu(t);if(e){e.click();return}if(Dt(t)){location.assign("/");return}location.assign(`/c/${t}`)}function Vg(){let t=je();ze&&ze!==t&&Pr(ze),ze=t,ms(t),fs();let e=us(t);e&&ds(t,e),Pr(t)}function bi(){kn===void 0&&(kn=window.setTimeout(()=>{kn=void 0,Vg()},120))}function Wg(){Tn||(Tn=history.pushState.bind(history),Nr=history.replaceState.bind(history),history.pushState=function(...e){let n=Tn(...e);return bi(),n},history.replaceState=function(...e){let n=Nr(...e);return bi(),n})}function Yg(){Tn&&(history.pushState=Tn),Nr&&(history.replaceState=Nr),Tn=null,Nr=null}function Xg(t){return Og.has(t.code)||t.keyCode===192?!0:Bg.has(t.key)}function ju(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function Zg(t,e){Or=e,fs(),Pr(je()),rt=!0,Bt=0;try{let n=je();ms(n);let r=yi();r.length>1&&(Bt=t?r.length-1:1)}catch(n){Bu.error("Failed to open switcher:",n)}Mn()}function Ou(t){let{length:e}=yi();e&&(Bt=(Bt+(t?-1:1)+e)%e,Mn())}function ps(){if(!rt)return;let t=yi()[Bt];rt=!1,Or=!1,Mn(),t&&Kg(t.id)}function Gu(){rt&&(rt=!1,Or=!1,Mn())}function Jg(t){if(ju(t)){Hr=!0;return}if((t.ctrlKey||Hr)&&!t.altKey&&!t.metaKey&&Xg(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{rt?Ou(t.shiftKey):Zg(t.shiftKey,!0)}catch(n){Bu.error("Hotkey failed:",n)}return}if(rt){if(t.key==="Escape"){t.preventDefault(),Gu();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),ps();return}t.key==="Tab"&&(t.ctrlKey||Hr)&&(t.preventDefault(),Ou(t.shiftKey))}}function Qg(t){ju(t)&&(Hr=!1,rt&&Or&&ps())}function tb(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(bi)}function eb(t){!rt||(t.target instanceof Element?t.target:null)?.closest(`#${Cn}`)||Gu()}function nb(){document.visibilityState==="hidden"&&Pr(je())}function as(t=gi){t instanceof HTMLElement&&No(t,Ho("auto"),!0)}function rb(){if(!document.body)return null;let t=document.getElementById(Cn);if(t instanceof HTMLElement)return gi=t,as(t),t;t=document.createElement("div"),t.id=Cn;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),gi=t,as(t),t}function Mn(){let t=rb();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!rt){e.dataset.visible="false",e.replaceChildren();return}let n=yi();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}Bt>=n.length&&(Bt=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===Bt?"true":"false",s.setAttribute("aria-selected",a===Bt?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{Bt=a,ps()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function ob(){document.getElementById(Cn)?.remove(),gi=null}var Uu=y({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${Cn}`],settings:G,start(){E("recentTopics",Ru),ze=je(),ms(ze),fs(),Pr(ze),os=st(jg),Wg(),pi=new AbortController;let{signal:t}=pi;window.addEventListener("keydown",Jg,{capture:!0,signal:t}),window.addEventListener("keyup",Qg,{capture:!0,signal:t}),window.addEventListener("popstate",bi,{signal:t}),document.addEventListener("click",tb,{capture:!0,signal:t}),document.addEventListener("click",eb,{signal:t}),document.addEventListener("visibilitychange",nb,{signal:t}),is=ln("schemeChange",()=>as())},stop(){pi?.abort(),pi=null,kn!==void 0&&(clearTimeout(kn),kn=void 0),Yg(),os?.(),os=null,is?.(),is=null,rt=!1,Or=!1,Hr=!1,ob()},onSettingsChange(){let t=hi(Ir());t.length!==Ir().length&&(G.store.visits=t),rt&&Mn()}});var gs="cleaner",ib=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],ab=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],sb=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],lb=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],cb=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],ub=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],Ge=L({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function An(t){return`${t.join(",")}{display:none!important}`}function Ku(){let t=[];if(Ge.store.hideDownloadApps!==!1&&t.push(An(ib)),Ge.store.hideDisclaimer!==!1&&t.push(An(ab)),Ge.store.hideUpgrade!==!1&&t.push(An(sb)),Ge.store.hideLockedModels!==!1&&t.push(An(lb)),Ge.store.hideHomePromo!==!1&&t.push(An(cb)),Ge.store.hideAds!==!1&&t.push(An(ub)),!t.length){w(gs);return}E(gs,t.join(`
`))}var Vu=y({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Ge,start:Ku,onSettingsChange:Ku,stop(){w(gs)}});var xi=new S("ResponseNotification"),Nn=L({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:hb},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),bs=!1,vi=null,Hn=null,Br=null;function db(){return document.visibilityState==="hidden"||document.hidden}function mb(){return Nn.store.onlyWhenHidden===!1?!0:db()}function fb(){let t=xn(M());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function Wu(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!Hn||Hn.state==="closed")&&(Hn=new t);let e=Hn,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){xi.debug("chime failed",t)}}function pb(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){xi.debug("custom sound failed",e),Wu()}}function Yu(){let t=String(Nn.store.soundUrl||"").trim();t?pb(t):Wu()}function gb(){let t="Bloom++",e=`${fb()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){xi.debug("notification failed",n)}}function bb(){mb()&&(Nn.store.sound!==!1&&Yu(),Nn.store.browserNotification!==!1&&gb())}function hb(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>Yu()),t.appendChild(e),()=>{e.remove()}}var Xu=y({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Nn,start(){bs=!0,vi?.(),vi=Q(t=>{if(!bs||t.userStopped||t.error)return;let e=M()||ei();t.conversationId&&t.conversationId!==e||bb()}),Br?.abort(),Br=new AbortController,Nn.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:Br.signal}),xi.debug("watch started")},stop(){bs=!1,vi?.(),vi=null,Br?.abort(),Br=null;try{Hn?.close()}catch{}Hn=null}});var Zu=`#bloom-pq-chip {
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
`;var _r=new S("PromptQueue"),ys="bloom-pq-chip",Ju="promptQueue",Qu=80,vb=50,xb=2e3,rd=L({replacePending:{type:2,description:"Replace the queued prompt if you Enter again while one is waiting.",default:!0}}),U=new Map,Zt=!1,St="",F="",Jt=!1,Lt=!1,_=null,Dr=null,wi=null,xe,$r,In=null;function Rn(){return Yt(xt())}function Pn(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function td(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Ht);return n instanceof HTMLElement?n:Y()}function vs(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function od(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function wb(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?Pn(e.innerText||e.textContent||""):""}catch{return""}}function ed(t){if(!St||St===t)return;let e=U.get(St);!e||U.has(t)||$(St,t)&&(U.delete(St),U.set(t,e),F===St&&(F=t),_?.key===St&&(_.key=t),_r.debug("migrated pending",St,"\u2192",t))}function xs(t){let e=Rn();if(U.get(e)&&rd.store.replacePending===!1)return;U.set(e,{text:t,at:Date.now()}),_={key:e,text:t,turns:od(),ticks:3};let r=Y();r&&Wt(r,""),we(),_r.debug("queued",e,t.length)}function Eb(t){U.delete(t),F===t&&(F=""),_?.key===t&&(_=null),we()}function Sb(){Lt=!0,clearTimeout($r),$r=setTimeout(()=>{Lt=!1,$r=void 0},xb)}function Lb(){let t=Rn(),e=U.get(t);if(!e)return;let n=Y();if(!n)return;U.delete(t),F="",we(),Sb(),Wt(n,e.text);let r=fe();r&&!B(r)&&!Vo(r)&&(r.click(),Lt=!1)}function nd(t){if(!Zt||Jt||J()||Rn()!==t)return;let e=U.get(t);if(!e){F="";return}if(Rt())return;let n=Y();if(!n)return;if(!me(n)){let o=Pn(at(n));if(o&&o!==e.text)return}let r=fe();!r||B(r)||Vo(r)||(Jt=!0,Wt(n,e.text),clearTimeout(xe),xe=setTimeout(()=>Tb(t,e.text),vb))}function Tb(t,e){xe=void 0;try{if(!Zt)return;let n=U.get(t);if(!n||n.text!==e||J()||Rn()!==t)return;let r=Y();if(!r)return;let o=Pn(at(r));if(o&&o!==e&&!me(r))return;o!==e&&Wt(r,e);let i=fe();if(!i||B(i)||Vo(i))return;i.click(),U.delete(t),F="",we(),_r.debug("drained",t)}finally{Jt=!1}}function id(t){let e=yt();if(!e||e===document.body){t.style.left="50%",t.style.bottom="6.5rem";return}let n=e.getBoundingClientRect();t.style.left=`${Math.round(n.left+n.width/2)}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`;let r=Math.min(512,Math.max(160,n.width-24));t.style.maxWidth=`${Math.round(r)}px`}function hs(){In?.remove(),In=null}function we(){if(!Zt||!document.body){hs();return}let t=Rn(),e=U.get(t);if(!e){hs();return}let n=In;n?.isConnected||(n=document.createElement("div"),n.id=ys,document.body.appendChild(n),In=n),n.replaceChildren();let r=document.createElement("span");r.className="bloom-pq-kicker",r.textContent="Next";let o=document.createElement("span");o.className="bloom-pq-text";let i=e.text.length>Qu?`${e.text.slice(0,Qu)}\u2026`:e.text;o.textContent=i,o.title=e.text;let a=document.createElement("div");a.className="bloom-pq-actions";let s=document.createElement("button");s.type="button",s.className="bloom-pq-btn bloom-pq-send",s.textContent="Send now",s.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),Lb()});let l=document.createElement("button");l.type="button",l.className="bloom-pq-btn bloom-pq-x",l.setAttribute("aria-label","Dismiss queued prompt"),l.textContent="\xD7",l.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),Eb(t)}),a.append(s,l),n.append(r,o,a),id(n)}function kb(){if(!_)return;if(_.ticks-=1,U.get(_.key)&&od()>_.turns){let e=wb();if(e&&e===_.text){_r.debug("native send leaked; dropping pending"),U.delete(_.key),F===_.key&&(F=""),_=null,we();return}}_.ticks<=0&&(_=null)}function ws(){return X()?!1:J()}function Cb(t){if(!Zt||t.isComposing||t.keyCode===229||t.key!=="Enter"||t.shiftKey||t.ctrlKey||t.metaKey||Jt)return;let e=td(t.target)??td(document.activeElement);if(!e||!ws())return;if(t.altKey||Lt){Lt=!1;return}if(!vt(e))return;let n=Pn(at(e));n&&(vs(t),xs(n))}function Mb(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||B(e))return null;let n=t.closest(yn);if(n instanceof HTMLElement&&!B(n))return n;let r=fe();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function Ab(t){if(!Zt)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${ys}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&B(n)||Jt||!ws()||!Mb(e))return;if(Lt){Lt=!1;return}let r=Y();if(!r||!vt(r))return;let o=Pn(at(r));o&&(vs(t),xs(o))}function Hb(t){if(!Zt)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(Ko)&&!e.querySelector(Ht)||Jt||!ws())return;if(Lt){Lt=!1;return}let n=Y()??e.querySelector(Ht);if(!n||!vt(n))return;let r=Pn(at(n));r&&(vs(t),xs(r))}var ad=y({name:"PromptQueue",description:"Queue the next prompt while a reply is streaming. Enter/Send waits for this turn instead of interrupting.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Ju,cleanupSelectors:[`#${ys}`],settings:rd,start(){Zt=!0,St=Rn(),F="",Jt=!1,Lt=!1,_=null,E(Ju,Zu),Dr?.abort(),Dr=new AbortController;let{signal:t}=Dr;window.addEventListener("keydown",Cb,{capture:!0,signal:t}),document.addEventListener("click",Ab,{capture:!0,signal:t}),document.addEventListener("submit",Hb,{capture:!0,signal:t}),wi?.(),wi=Q({onFall(e){if(Zt){if(e.userStopped||e.error){F="",we();return}F=e.contextKey,nd(e.contextKey)}},onContext(e,n){n&&e&&!$(n,e)&&(F="",Jt=!1,xe!==void 0&&(clearTimeout(xe),xe=void 0)),ed(e),St=e,we()},onTick(e){ed(e.contextKey),St=e.contextKey,kb(),F&&F===e.contextKey&&nd(F),In&&id(In)}}),we(),_r.debug("watch started")},stop(){Zt=!1,wi?.(),wi=null,Dr?.abort(),Dr=null,clearTimeout(xe),xe=void 0,clearTimeout($r),$r=void 0,U.clear(),_=null,F="",Jt=!1,Lt=!1,hs()}});var sd=`.bloom-cls {
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
`;var ud=new S("ChatListStatus"),ld="chatListStatus",Li="bloom-cls",Ib="bloom-cls",Rb=1200*1e3,Pb="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",Tt=new Map,$t=!1,dt="",Qt=!1,Dn=!1,mt=0,Ee=null,Ls=null,On=null,Es=null,Ei=null,Fr=null,Bn=!1,Se=new Set;function Si(){return Date.now()}function dd(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function te(t,e,n,r=!0){if(!(!t||!$t)){if(e==="idle")Tt.delete(t);else{let o=Tt.get(t);o&&o.kind===e&&n!=="net"?o.at=Si():Tt.set(t,{kind:e,at:Si(),source:n})}r&&Ob({v:1,id:t,kind:e,at:Si()}),Ue()}}function Ob(t){try{On?.postMessage(t)}catch{}}function Bb(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||te(e.id,e.kind,"bc",!1)}function Db(){let t=Si();for(let[e,n]of Tt)n.kind==="streaming"&&t-n.at>Rb&&Tt.delete(e)}function $b(){let t=dd();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(r.closest(Pb))continue;let o=Xt(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function cd(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function Ss(t){let e=t.querySelector(`:scope > .${Li}`);return e||null}function Ts(){if(!$t)return;Db();let t=M(),e=$b();Ee?.disconnect();try{for(let n of e){let r=Xt(n.getAttribute("href")||"");if(!r||!t||r!==t){Ss(n)?.remove();continue}let i=Tt.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){Ss(n)?.remove();continue}let a=Ss(n);a||(a=document.createElement("span"),a.className=Li,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(cd("streaming")):i==="error"&&a.appendChild(cd("error")))}}catch(n){ud.debug("paint failed",n)}md()}function Ue(){if($t){if(document.hidden){mt&&(cancelAnimationFrame(mt),mt=0),Ts();return}mt||(mt=requestAnimationFrame(()=>{mt=0,$t&&Ts()}))}}function md(){let t=dd();if(!(Ee&&Ls===t&&t?.isConnected)){if(Ee?.disconnect(),Ls=t,!t){Ee=null;return}Ee=new MutationObserver(()=>Ue()),Ee.observe(t,{childList:!0,subtree:!0})}}function Ti(){return!!(Re()||Sr())}function _b(t){return!!(Bn||t&&Se.has(t)||!Dn&&!X()&&Ti())}function Fb(t){if($t){if(t.type==="post-start"){Dn=!1,t.conversationId?(Bn=!1,Se.add(t.conversationId),Qt=!0,te(t.conversationId,"streaming","net")):(Bn=!0,Qt=!0);return}if(t.type==="post-end"){if(Bn=!1,t.conversationId){Se.delete(t.conversationId);let e=M(),n=ei();(e?t.conversationId===e:t.conversationId===n)?te(t.conversationId,t.error?"error":"done","net"):te(t.conversationId,"idle","net")}Ti()||(Qt=!1)}}}function qb(t,e){if(!$t)return;if($(e,t)){Ue();return}let n=M();if(dt&&dt!==n){Se.delete(dt);let r=Tt.get(dt);r&&r.kind!=="idle"&&te(dt,"idle","local")}Bn=!1,Qt=!1,Dn=!0,n&&Tt.get(n)?.kind==="streaming"&&Tt.get(n)?.source==="local"&&!Se.has(n)&&te(n,"idle","local"),Ue()}function zb(t){if(!$t)return;let e=t.conversationId||M();if(dt&&e&&dt!==e){Se.delete(dt);let r=Tt.get(dt);r&&r.kind!=="idle"&&te(dt,"idle","local"),Qt=!!(e&&Se.has(e))}if(e&&(dt=e),Dn||X()){if(X()||Ti()||t.streaming){Ue();return}Dn=!1}if(_b(e)&&(t.streaming||Ti())){Qt=!0,e&&te(e,"streaming","local"),Ue();return}Qt&&(Qt=!1,e&&te(e,Rt()?"error":"done","local")),Ue()}var fd=y({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Li}`],start(){$t=!0,E(ld,sd);try{On=new BroadcastChannel(Ib)}catch{On=null}On?.addEventListener("message",Bb),Es=st(Fb),Ei?.(),Ei=Q({onTick:zb,onContext:qb}),Fr?.abort(),Fr=new AbortController,document.addEventListener("visibilitychange",()=>{$t&&(mt&&(cancelAnimationFrame(mt),mt=0),Ts())},{signal:Fr.signal}),md(),ud.debug("sidebar status watch started")},stop(){$t=!1,mt&&cancelAnimationFrame(mt),mt=0,Fr?.abort(),Fr=null,Ee?.disconnect(),Ee=null,Ls=null,Ei?.(),Ei=null,Es?.(),Es=null;try{On?.close()}catch{}On=null,Tt.clear(),Se.clear(),Bn=!1,Qt=!1,Dn=!1,dt="",document.querySelectorAll(`.${Li}`).forEach(t=>t.remove()),w(ld)}});var gd="widerChat",bd=40,hd=96,yd=64,vd=L({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:bd,max:hd,default:yd}});function jb(){return W(Number(vd.store.width??yd),bd,hd)}function pd(){let t=jb(),e=`min(100%,${t}rem)`;E(gd,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var xd=y({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:vd,start:pd,onSettingsChange:pd,stop(){w(gd)}});var ks="composerOpacity",$n='form[data-type="unified-composer"],form.w-full[data-type]',Gb=[`${$n} [class*="corner-superellipse"]`,`${$n} [class*="bg-token-bg-primary"]`,`${$n} [class*="bg-token-main-surface"]`].join(","),Ub=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),Kb="#thread-bottom-container,#thread-bottom",Vb=`${$n} #prompt-textarea,${$n} [contenteditable="true"]`,Wb="var(--bg-primary,var(--main-surface-primary,#ffffff))",Cs=L({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function Yb(){return W(Number(Cs.store.opacity??100),0,100)}function Xb(){return W(Number(Cs.store.blur??16),0,40)}function wd(){let t=Yb();if(t>=100){w(ks);return}let e=Xb(),n=`color-mix(in srgb,${Wb} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";E(ks,`${Kb}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Ub}{display:none!important}${$n}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${Gb}{background-color:${n}!important;background-image:none!important;${r}}${Vb}{background-color:transparent!important;background-image:none!important}`)}var Ed=y({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[v.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Cs,start:wd,onSettingsChange:wd,stop(){w(ks)}});var Sd=`#bloom-bn-host {
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
`;var Jb=new S("BetterNavigator"),Ms="betterNavigator",Cd="bloom-bn-host",Is=60,Qb=16,th=1e3,eh=2.5,nh=.4,Mi="\u6B63\u5728\u8F93\u51FA\u2026",Rs="Image",rh="\u2753",oh="\u{1F916}",Ld=/file_[0-9a-f]+/gi,ih=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),ah=2e3,sh=40,lh=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,ch=['section[data-testid^="conversation-turn-"][data-turn="user"]','section[data-testid^="conversation-turn-"][data-turn="assistant"]','article[data-testid^="conversation-turn-"][data-turn="user"]','article[data-testid^="conversation-turn-"][data-turn="assistant"]'].join(", "),uh=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),dh=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='thinking']","[class*='reasoning']","[class*='footnote']",".sr-only"].join(", "),mh=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),Oi=L({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),Fn=new Map,Ur=new Map,Ft=new Set,Ai=0,kt=!1,ne=!1,_n=!1,Le=null,Kr=null,We=null,Hi=null,K=[],Ye="",Ni=0,Ii=-1,_s=0,Ri="",ft=0,ee=0,qr,zr=null,ki=null,As=null,Hs=null,Ke=null,Ps=null,jr=null,Ve=null,qn=null,Gr=null;function Bi(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function Ns(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function fh(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function ph(t){let e=t.getBoundingClientRect(),n=null;try{let o=t.querySelector("[data-message-id], [data-testid^='conversation-turn-']"),a=o?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]')??o;for(;a&&a!==t;)lh.test(fh(a))&&(n=a),a=a.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=Ns(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||Ns(getComputedStyle(t).getPropertyValue("--thread-content-width"))||Ns(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function Td(t){try{return!!t.closest(uh)}catch{return!0}}function kd(t){let e=(t.getAttribute("data-turn")||t.closest("[data-turn]")?.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("data-message-author-role")||t.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase();if(n==="user"||n==="assistant")return n;try{let o=(t.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent||"").toLowerCase();if(o.includes("you said"))return"user";if(o.includes("chatgpt said")||o.includes("assistant said"))return"assistant"}catch{}let r=(t.getAttribute("aria-label")||"").toLowerCase();return r.includes("you said")?"user":r.includes("chatgpt said")||r.includes("assistant said")?"assistant":null}function Di(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||t.querySelector("[data-message-id]")?.getAttribute("data-message-id")||""}function $i(t){try{if(t.querySelector("[class*='imagegen-image']")||t.querySelector('img[alt="Generated image"], img[alt^="Generated image"]'))return!0}catch{}return!1}function gh(t){try{return!!t.closest("[class*='message-image']")}catch{return!0}}function Ci(t,e){if(t){Ld.lastIndex=0;for(let n of t.matchAll(Ld))e.add(n[0].toLowerCase())}}function bh(t){try{let e=new Set,n=s=>{gh(s)||(Ci(s.getAttribute("src")||"",e),Ci(s.getAttribute("srcset")||"",e),Ci(s.getAttribute("href")||"",e),s instanceof HTMLImageElement&&Ci(s.currentSrc||"",e))};for(let s of t.querySelectorAll("[class*='imagegen-image']")){n(s);for(let l of s.querySelectorAll("[src], [srcset], [href]"))n(l)}for(let s of t.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]'))n(s);if(e.size)return e.size;let o=t.querySelectorAll("[class*='group/imagegen-image']").length;if(!o)return 0;let i=Di(t);return(i?t.querySelector(`#image-${CSS.escape(i)}`):t.querySelector("[id^='image-']:not([id^='image-gen-'])"))&&o>=2&&(o-=1),o}catch{return 0}}function hh(t,e){let n=bh(t),r=Ur.get(e)??0,o=Math.max(r,n);return o>0&&Ur.set(e,o),o>=2?`${Rs} x${o}`:Rs}function Pi(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(i.closest(dh))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return(o.textContent||"").replace(/\s+/g," ").trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<Is+20;)e.push((r.textContent||"").replace(/\s+/g," ").trim());return e.join(" ").replace(/\s+/g," ").trim()}function yh(t,e){try{if($i(t)||t.querySelector("img, picture, video, canvas"))return Rs;if(t.querySelector("a[download], [class*='attachment']"))return"File";if(t.querySelector("pre, code"))return"Code"}catch{}return`Message ${e+1}`}function vh(t,e){if(e==="user"){let r=t.querySelector(".whitespace-pre-wrap")??t;return Pi(r)}let n=t.querySelector(".markdown");return n?Pi(n):""}function xh(t){return t.length>Is?`${t.slice(0,Is).trimEnd()}\u2026`:t}function wh(t,e,n,r){let o=vh(t,e);return o?xh(o):r?Mi:$i(t)?hh(t,Di(t)):yh(t,n)}function Eh(){if(ne)return!0;let t=M();return!!(t&&Ft.has(t)||!_n&&!X()&&Vr())}function Vr(){return!!(Re()||Sr())}function Sh(){Ai=Date.now()}function Md(t){ne=!1,t&&Ft.delete(t);let e=M();e&&Ft.delete(e)}function Lh(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function Th(t){if($i(t)||!Vr())return!1;let e=t.querySelector(".markdown");if(!(!e||e instanceof HTMLElement&&!Pi(e)))return!1;let r=t.querySelector("[class*='thinking'], [class*='reasoning']");if(!r)return!1;if(r.getAttribute("aria-busy")==="true"||r.classList.contains("result-streaming"))return!0;try{if(r.querySelector("[aria-busy='true'], .result-streaming"))return!0}catch{}let o=r.closest("details")??r.querySelector("details");return o instanceof HTMLDetailsElement&&o.open}function kh(t,e){try{if(Lh(t)||e&&Th(t))return!0}catch{}return!1}function Ad(t){if(!t||Vr())return!1;try{if(t.querySelector(ih)||$i(t))return!0;let e=t.querySelector(".markdown");if(e instanceof HTMLElement&&Pi(e))return!0}catch{}return!1}function Ch(t){if(Vr()||Ai&&Date.now()-Ai<ah)return;let e=[...t].reverse().find(n=>n.role==="assistant");!e||!Ad(e.el)||Md()}function Mh(t){let e=new Set,n=[];try{for(let r of t.querySelectorAll(ch)){if(Td(r))continue;let i=Di(r)||`anon:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}if(n.length)return n;try{for(let r of t.querySelectorAll("[data-message-id]")){if(Td(r))continue;let i=r.getAttribute("data-message-id")||""||`mid:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}return n}function Ah(){let t=Bi();if(!t||t===document.body)return[];let e=Oi.store.showAssistant!==!1,n=e&&Eh(),r=Mh(t),o=null;if(e)for(let a of r)kd(a)==="assistant"&&(o=a);let i=[];try{for(let a of r){let s=Di(a);if(!s)continue;let l=kd(a);if(l!=="user"&&l!=="assistant"||l==="assistant"&&!e)continue;let c=l==="assistant"&&n&&kh(a,a===o)&&!Ad(a),u=wh(a,l,i.length,c);u&&u!==Mi&&u!==Fn.get(s)&&Fn.set(s,u);let d=c&&u===Mi?Mi:Fn.get(s)||u;i.push({id:s,el:a,role:l,text:d,live:c})}}catch{}return Ch(i),i}function Hh(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function Hd(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function Nh(t){return t===window?window.innerHeight:t.clientHeight}function Ih(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(mh)}catch{return!1}}function Nd(){qr!==void 0&&(clearTimeout(qr),qr=void 0),zr?.classList.remove("bloom-bn-flash"),zr=null}function Rh(t){Nd(),t.classList.add("bloom-bn-flash"),zr=t,qr=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),zr===t&&(zr=null),qr=void 0},800)}function Os(t){if(!K.length)return;let e=Math.max(0,Math.min(t,K.length-1));Ni=e,Kr?.querySelectorAll(".bloom-bn-tick").forEach((r,o)=>{r.classList.toggle("bloom-bn-current",o===e)}),We?.querySelectorAll(".bloom-bn-item").forEach((r,o)=>{r.classList.toggle("bloom-bn-active",o===e)}),Hi&&(Hi.textContent=`${e+1} / ${K.length}`);let n=We?.children[e];if(n instanceof HTMLElement){let r=We;if(r){let o=n.offsetTop-r.clientHeight/2+n.offsetHeight/2;r.scrollTop=Math.max(0,o)}}}function Bs(t){let e=K[t];if(!e?.el.isConnected)return;Ii=t,_s=Date.now()+th,Os(t);let n=qn??Hd(e.el),o=Math.abs(e.el.getBoundingClientRect().top-Hh())>eh*Nh(n);e.el.scrollIntoView({behavior:o?"auto":"smooth",block:"start"}),Oi.store.jumpEffect!=="none"&&Rh(e.el)}function Fs(){if(!kt||!K.length)return;if(Date.now()<_s&&Ii>=0){Os(Ii);return}let t=window.innerHeight*nh,e=0;for(let n=0;n<K.length;n++){let r=K[n].el;r.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}Os(e)}function Ph(t){let e=Hd(t);if(qn===e&&Gr)return;Gr?.(),qn=e;let n=e===window?document:e,r=()=>{Fs(),qs()};n.addEventListener("scroll",r,{passive:!0}),Gr=()=>n.removeEventListener("scroll",r)}function Oh(t){Ve?.disconnect(),Ve=null;let e=qn instanceof HTMLElement?qn:null;Ve=new IntersectionObserver(()=>Fs(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el.isConnected&&Ve.observe(n.el)}function Bh(){if(!document.body)return null;let t=Le;if(t?.isConnected)return t;t=document.createElement("div"),t.id=Cd,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),Le=t,Kr=e,We=i,Hi=o,t}function Id(){let t=Le,e=Bi();if(!t||!e||!e.isConnected||K.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=ph(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||sh,d=n.right-r.right>=c+8?r.right+4:r.right-12-c;d=Math.min(d,n.right-c-8),d=Math.max(8,d);let f=Math.max(8,Math.round(window.innerWidth-d-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${f}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function qs(){!kt||ee||(ee=requestAnimationFrame(()=>{ee=0,kt&&Id()}))}function Dh(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function $h(t){let e=Kr,n=We;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>Qb),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=Dh(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",c=>{c.preventDefault(),Bs(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-emoji",s.textContent=r.role==="user"?rh:oh;let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=r.text,l.title=r.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),Bs(o)}),n.appendChild(a)}))}function _h(t){Kr?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=We?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function Fh(){let t=M();return t===Ri?!1:(Ri=t,Fn.clear(),Ur.clear(),K=[],Ye="",Ni=0,Ii=-1,_s=0,ne&&t&&(Ft.add(t),ne=!1),!0)}function qh(t){let e=Oi.store.showAssistant!==!1?"1":"0";return`${Ri}|${e}|${t.map(n=>n.id).join(",")}`}function Ds(){if(!kt)return;Fh();let t=Ah(),e=Bi();if(!e||t.length<1){K=t,Ye="",Le&&(Le.hidden=!0),Ve?.disconnect(),$s();return}Bh();let n=qh(t);n!==Ye?(K=t,Ye=n,$h(t),Ph(e),Oh(t)):(K=t,_h(t)),Id(),Fs(),$s()}function _t(){if(kt){if(document.hidden){ft&&(cancelAnimationFrame(ft),ft=0),Ds();return}ft||(ft=requestAnimationFrame(()=>{ft=0,kt&&Ds()}))}}function $s(){let t=Bi();if(!(Ke&&Ps===t&&t?.isConnected)){if(Ke?.disconnect(),jr?.disconnect(),Ps=t,!t||t===document.body){Ke=null;return}Ke=new MutationObserver(()=>_t()),Ke.observe(t,{childList:!0,subtree:!0}),jr=new ResizeObserver(()=>qs()),jr.observe(t)}}function zh(t){if(kt){if(t.type==="post-start"){Sh(),_n=!1,t.conversationId?(ne=!1,Ft.add(t.conversationId)):ne=!0,_t();return}if(t.type==="post-end"){if(ne=!1,t.conversationId)Ft.delete(t.conversationId);else{let e=M();e&&Ft.delete(e)}_t()}}}function jh(t){if(!kt||!K.length||Le?.hidden||t.altKey||t.ctrlKey||t.metaKey||Ih(t.target))return;let e=-1;if(t.key==="ArrowDown")e=Ni+1;else if(t.key==="ArrowUp")e=Ni-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=K.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),Bs(Math.max(0,Math.min(e,K.length-1)))}function Gh(){Nd(),Ve?.disconnect(),Ve=null,Ke?.disconnect(),Ke=null,Ps=null,jr?.disconnect(),jr=null,Gr?.(),Gr=null,qn=null,Le?.remove(),Le=null,Kr=null,We=null,Hi=null}var Rd=y({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:Ms,cleanupSelectors:[`#${Cd}`],settings:Oi,start(){kt=!0,Ri=M(),E(Ms,Sd),ki=new AbortController;let{signal:t}=ki;window.addEventListener("keydown",jh,{signal:t}),window.addEventListener("popstate",_t,{signal:t}),window.visualViewport?.addEventListener("resize",qs,{signal:t}),document.addEventListener("visibilitychange",()=>{kt&&(ft&&(cancelAnimationFrame(ft),ft=0),ee&&(cancelAnimationFrame(ee),ee=0),Ds())},{signal:t}),Hs=st(zh),As=Q({onTick(){if(X()){_t();return}_n&&!Vr()&&(_n=!1),_t()},onFall(e){Md(e.conversationId),_t()},onContext(e,n){if(!$(n,e)){Fn.clear(),Ur.clear(),Ye="",ne=!1;let r=M();for(let o of[...Ft])o!==r&&Ft.delete(o);_n=!0}_t()}}),$s(),_t(),Jb.debug("navigator started")},stop(){kt=!1,ft&&cancelAnimationFrame(ft),ft=0,ee&&cancelAnimationFrame(ee),ee=0,ki?.abort(),ki=null,As?.(),As=null,Hs?.(),Hs=null,Ft.clear(),ne=!1,_n=!1,Ai=0,Gh(),Fn.clear(),Ur.clear(),K=[],Ye="",w(Ms)},onSettingsChange(){Ye="",_t()}});var Pd=`.bloom-ts {
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
`;function Od(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Bd(t){try{return new Date(t).toISOString()}catch{return""}}var _d=new S("MessageTimestamps"),Dd="messageTimestamps",Fi="bloom-ts",$d=1500,Kh="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",zn=L({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),jn=new Map,Je=!1,pt=0,Te=null,js=null,zs=null,_i=null,Wr=null,Yr=!1,Xe=!1;function Fd(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function Us(){let t=zn.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function qd(){let t={...Us()};for(let[n,r]of jn)t[n]=r;let e=Object.keys(t);if(e.length>$d){let n=e.slice(e.length-$d),r={};for(let o of n)r[o]=t[o];zn.store.stamps=r;return}zn.store.stamps=t}var Vh=Hl(qd,500);function zd(t,e){!t||!e||jn.get(t)===e||(jn.set(t,e),Vh(),Ze())}function Wh(t){return t?jn.get(t)??Us()[t]??Jo(t)??null:null}function Yh(t){Je&&t.type==="message-time"&&zd(t.messageId,t.createTime)}function Xh(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function Zh(){let t=Fd();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll("[data-message-id]"))n.closest(Kh)||e.push(n)}catch{}return e}function Jh(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function Gs(){if(!Je)return;let t=zn.store.hideOwnMessages===!0,e=zn.store.showDate!==!1,n=J();Xe&&!X()&&(Xe=!1),Xe&&(n?Yr=!1:Xe=!1);let r=Xe?!1:n,o=Zh();Te?.disconnect();try{o.forEach((i,a)=>{let s=i.getAttribute("data-message-id")||"",l=Xh(i),c=i.querySelector(`:scope > .${Fi}`);if(t&&l==="user"){c?.remove();return}if(Jh(i)){c?.remove();return}let u=Wh(s);if(!u&&s&&(r||Yr)&&a>=o.length-2&&(u=Date.now(),zd(s,u)),!u){c?.remove();return}let d=Od(u,e);if(!d){c?.remove();return}let f=c;f||(f=document.createElement("time"),f.className=Fi,f.setAttribute("aria-hidden","true"),i.insertBefore(f,i.firstChild)),f.textContent!==d&&(f.textContent=d);let h=Bd(u);h&&f.getAttribute("datetime")!==h&&f.setAttribute("datetime",h)})}catch(i){_d.debug("paint failed",i)}Yr=r,jd()}function Ze(){if(Je){if(document.hidden){pt&&(cancelAnimationFrame(pt),pt=0),Gs();return}pt||(pt=requestAnimationFrame(()=>{pt=0,Je&&Gs()}))}}function jd(){let t=Fd();if(!(Te&&js===t&&t?.isConnected)){if(Te?.disconnect(),js=t,!t||t===document.body){Te=null;return}Te=new MutationObserver(()=>Ze()),Te.observe(t,{childList:!0,subtree:!0})}}var Gd=y({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Fi}`],settings:zn,start(){Je=!0,E(Dd,Pd);let t=Us();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&jn.set(e,n);zs=st(Yh),_i?.(),_i=Q({onTick:Ze,onFall:Ze,onContext(e,n){$(n,e)||(Xe=!0,Yr=!1),Ze()}}),Wr?.abort(),Wr=new AbortController,document.addEventListener("visibilitychange",()=>{Je&&(pt&&(cancelAnimationFrame(pt),pt=0),Gs())},{signal:Wr.signal}),jd(),Ze(),_d.debug("timestamp watch started")},stop(){Je=!1,pt&&cancelAnimationFrame(pt),pt=0,Wr?.abort(),Wr=null,Te?.disconnect(),Te=null,js=null,_i?.(),_i=null,zs?.(),zs=null,Xe=!1,Yr=!1,qd(),jn.clear(),document.querySelectorAll(`.${Fi}`).forEach(t=>t.remove()),w(Dd)},onSettingsChange:Ze});var Ks="streamerMode",Qh="filter:blur(6px)!important;transition:filter .2s ease",t0="filter:none!important",Gn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],Un=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function gt(t,e){return t.map(n=>`${n} ${e}`)}var Qe=L({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function Kn(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${Qh}}${e?`${r}{${t0}}`:""}`}function Ud(){let t=[];if(Qe.store.conversations!==!1&&(t.push(Kn([...gt(Un,'a[href^="/c/"]'),...gt(Un,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),Qe.store.projects!==!1&&(t.push(Kn([...gt(Un,'a[href*="/project"]'),...gt(Un,'a[href*="/g/g-p-"]'),...gt(Un,'[data-testid="project-name"]'),...gt(Un,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),Qe.store.headerTitle!==!1&&t.push(Kn(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),Qe.store.accountAvatar!==!1&&t.push(Kn([...gt(Gn,"img"),...gt(Gn,'[class*="avatar"]'),...gt(Gn,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),Qe.store.accountName!==!1&&t.push(Kn([...gt(Gn,".min-w-0 > .truncate"),...gt(Gn,".min-w-0.flex-1 .truncate")],!1)),Qe.store.accountEmail!==!1&&t.push(Kn([...gt(Gn,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!t.length){w(Ks);return}E(Ks,t.join(`
`))}var Kd=y({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[v.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Qe,start:Ud,onSettingsChange:Ud,stop(){w(Ks)}});var Vd=`.bloom-gc-panel {
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
}`;var n0=new S("GreetingCustomizer"),Vn="greetingCustomizer",Wd="greetingCustomizerUi",Xr=100,Ws=30,r0=120,o0=1e3,i0=50,a0=40,s0=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),Zr=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),Ui=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function l0(t){return!!t?.closest(s0)}function Jd(t){return!!(l0(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function oo(t){try{for(let e of document.querySelectorAll(t))if(!Jd(e))return e}catch{}return null}function Vs(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(oo(e))return e;return t}var Qd=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],V=L({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:L0},greetings:{type:0,description:"Greeting texts",hidden:!0,default:Qd},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),qt=!1,Xn=!1,en=null,zi,Jr,Wn,Qr,ji=0,qi=null,Yn=null,to=null,eo=null,no=null,Gi=null;function oe(){let t=location.pathname||"/";return t==="/"||t===""}function tn(){let t=V.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):Qd.slice()}function ro(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function Yd(t){V.store.greetings=t.slice(0,Ws)}function io(){let t=String(V.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function c0(){return V.store.order==="random"?"random":"sequential"}function u0(){return W(Number(V.store.intervalSec??10),1,3600)*1e3}function d0(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function m0(){return!!oo(Ui)}function Ki(){return!!(oo(Ui)||oo(Zr))}function f0(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=m0()?Vs(Ui):oo(Zr)?Vs(Zr):Vs(Ui),i=e?`${Zr}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function p0(t,e){if(t<=0)return 0;if(t===1)return Number(V.plain.index)!==0&&(V.store.index=0),Number(V.plain.lastRandom)!==0&&(V.store.lastRandom=0),0;let n=Number(V.plain.index),r=Number(V.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(c0()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return V.store.index=s,V.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return V.store.index=i,i}function re(t){if(!qt)return;if(!oe()){w(Vn);return}let e=tn().map(ro).filter(Boolean);if(!e.length){w(Vn);return}let n=p0(e.length,t),r=e[n]??e[0],o=io()==="manual"&&e.length>1;E(Vn,f0(d0(r),o)),Gi?.()}function Ys(){zi!==void 0&&(clearInterval(zi),zi=void 0)}function Xs(){Ys(),!(!qt||!oe())&&io()==="interval"&&(tn().filter(Boolean).length<=1||(zi=setInterval(()=>re(!0),u0())))}function Zs(){Qr!==void 0&&(clearTimeout(Qr),Qr=void 0),ji=0}function Xd(){if(Zs(),!qt||!oe())return;ji=a0;let t=()=>{if(Qr=void 0,!(!qt||!oe())){if(Ki()){io()==="refresh"&&!Xn?(Xn=!0,re(!0)):re(!1),Xs();return}ji-=1,ji>0&&(Qr=setTimeout(t,i0))}};t()}function Js(){if(en===!0){Ki()?re(!1):Xd();return}en=!0,Xn=!1,io()==="refresh"?(Xn=!0,re(!0)):re(!1),Xs(),Ki()||Xd()}function Qs(){en=!1,Xn=!1,Ys(),Zs(),w(Vn)}function Vi(){Wn===void 0&&(Wn=window.setTimeout(()=>{Wn=void 0,qt&&(oe()?Js():en!==!1&&Qs())},r0))}function g0(){Yn||(Yn=history.pushState.bind(history),to=history.replaceState.bind(history),eo=function(...e){let n=Yn(...e);return Vi(),n},no=function(...e){let n=to(...e);return Vi(),n},history.pushState=eo,history.replaceState=no)}function b0(){eo&&history.pushState===eo&&Yn&&(history.pushState=Yn),no&&history.replaceState===no&&to&&(history.replaceState=to),Yn=null,to=null,eo=null,no=null}function h0(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(Vi)}function y0(t){if(!qt||!oe()||io()!=="manual"||tn().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(Zr);if(!n||Jd(n))return;let r=window.getSelection?.();r&&String(r).trim()||re(!0)}function v0(){Jr===void 0&&(Jr=setInterval(()=>{if(!qt)return;let t=oe();if(t!==(en===!0)){t?Js():Qs();return}t&&Ki()&&re(!1)},o0))}function x0(){Jr!==void 0&&(clearInterval(Jr),Jr=void 0)}function Zd(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var w0="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",E0="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function S0(t,e){let n=ro(t);return n?n.length>Xr?`Keep it to ${Xr} characters.`:tn().length+(e?1:0)>Ws?`At most ${Ws} greetings.`:null:"Enter a greeting."}function L0(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=tn(),s=Number(V.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=Xr,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let m=l.querySelector(".bloom-gc-count");m&&(m.textContent=`${ro(e).length}/${Xr}`);let T=l.querySelector(".bloom-gc-error");T&&(T.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${ro(e).length}/${Xr}`;let f=document.createElement("span");f.className="bloom-gc-error",f.textContent=r;let h=document.createElement("div");if(h.className="bloom-gc-actions",n>=0){let m=document.createElement("button");m.type="button",m.className="bloom-gc-btn",m.textContent="Cancel",m.addEventListener("click",()=>{n=-1,e="",r="",i()}),h.appendChild(m)}let g=document.createElement("button");if(g.type="button",g.className="bloom-gc-btn bloom-gc-btn-primary",g.textContent=n>=0?"Update":"Add",g.addEventListener("click",()=>{let m=n<0,T=S0(e,m);if(T){r=T,i();return}let A=ro(e),N=tn().slice();n>=0&&n<N.length?N[n]=A:N.push(A),Yd(N),n=-1,e="",r="",i()}),h.appendChild(g),u.append(d,f,h),l.appendChild(u),t.appendChild(l),!a.length){let m=document.createElement("p");m.className="bloom-gc-empty",m.textContent="No greetings. The official heading stays.",t.appendChild(m);return}let b=document.createElement("div");b.className="bloom-gc-list",a.forEach((m,T)=>{let A=document.createElement("div");A.className="bloom-gc-item",T===s&&(A.dataset.active="true");let N=document.createElement("button");N.type="button",N.className=`bloom-gc-body${o===T?"":" bloom-gc-clamp"}`,N.textContent=m,N.addEventListener("click",()=>{o=o===T?-1:T,i()});let Gt=document.createElement("div");Gt.className="bloom-gc-item-actions";let Ct=Zd("Edit",w0);Ct.addEventListener("click",()=>{n=T,e=m,r="",i()});let et=Zd("Delete",E0);et.addEventListener("click",()=>{let R=tn().filter((ot,Ut)=>Ut!==T);Yd(R),n===T?(n=-1,e=""):n>T&&(n-=1),i()}),Gt.append(Ct,et),A.append(N,Gt),b.appendChild(A)}),t.appendChild(b)};return Gi=i,i(),()=>{Gi===i&&(Gi=null),t.replaceChildren()}}var tm=y({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Wd,settings:V,start(){qt=!0,E(Wd,Vd),g0(),qi=new AbortController;let{signal:t}=qi;window.addEventListener("popstate",Vi,{signal:t}),document.addEventListener("click",h0,{capture:!0,signal:t}),document.addEventListener("click",y0,{signal:t}),v0(),en=null,oe()?Js():Qs(),n0.debug("started")},stop(){qt=!1,qi?.abort(),qi=null,Wn!==void 0&&(clearTimeout(Wn),Wn=void 0),Ys(),Zs(),x0(),b0(),w(Vn),Xn=!1,en=null},onSettingsChange(){qt&&(oe()?(re(!1),Xs()):w(Vn))}});function T0(t){let e=/^data:([^;,]+)?(;base64)?,(.*)$/s.exec(t);if(!e)return null;let n=e[1]||"application/octet-stream",r=!!e[2],o=e[3]||"";try{if(r){let i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return new Blob([a],{type:n})}return new Blob([decodeURIComponent(o)],{type:n})}catch{return null}}async function Wi(t){try{return await createImageBitmap(t)}catch{return null}}async function k0(t){try{let e=new Image;return e.decoding="async",await new Promise((n,r)=>{e.onload=()=>n(),e.onerror=()=>r(new Error("img")),e.src=t}),await createImageBitmap(e)}catch{return null}}async function Yi(t){if(t.startsWith("data:")){let e=T0(t);if(e){let n=await Wi(e);if(n)return n}return k0(t)}try{let e=await fetch(t,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?Wi(await e.blob()):null}catch{return null}}var Zi="data-bloom-csi-slot",C0="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",M0=/\bsize-(?:[6-9]|10)\b/,A0=/\b(?:h|w)-(?:[6-9]|10)\b/,H0=/^(plus|pro|free|team|go|business|enterprise)$/i,N0=['[class*="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-6"]','[class~="h-7"]','[class~="h-8"]','[class~="h-9"]','[class~="h-10"]','[class~="w-6"]','[class~="w-7"]','[class~="w-8"]','[class~="w-9"]','[class~="w-10"]'].join(",");function Xi(t){return t.getAttribute("class")||""}function nm(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||M0.test(t)?!0:A0.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function I0(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3&&!rm(e)}function rm(t){return H0.test(String(t??"").replace(/\s+/g,""))}function zt(t){return!!t?.closest(C0)}function Ji(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function ao(t){let e=Xi(t);return/\btext-xs\b/.test(e)||/text-token-text-secondary/.test(e)||/text-token-text-tertiary/.test(e)?!0:rm(t.textContent||"")}function Qi(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function so(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function R0(t){return/\bflex\b/.test(t)&&!/\bflex-col\b/.test(t)}function om(t){if(zt(t)||Qi(t)||so(t)||ao(t)||Ji(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function im(t){return zt(t)||Qi(t)||so(t)||ao(t)||t.querySelector("img, svg, .min-w-0, .truncate")?!1:I0(t.textContent||"")}function am(t){return zt(t)||so(t)||Ji(t)||ao(t)?!1:nm(Xi(t))||im(t)?!0:om(t)}function em(t){return!(zt(t)||Ji(t)||so(t)||ao(t)||Qi(t))}function nn(t,e){let n=Qi(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(so(n)||Ji(n)||ao(n));)zt(n)||(r=n),n=n.parentElement;return r}function P0(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||zt(e))continue;if(R0(Xi(e))){let r=[];for(let o of e.children)if(!(!(o instanceof HTMLElement)||!em(o))){if(am(o)||nm(Xi(o)))return nn(o,t)??o;r.push(o)}if(r.length===1)return nn(r[0],t)??r[0]}let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&em(r))return nn(r,t)??r}}return null}function O0(t){let e=t.querySelectorAll(N0);for(let n of e)if(am(n))return nn(n,t)??n;return null}function B0(t){for(let e of t.querySelectorAll("span, div, p, i"))if(im(e))return nn(e,t)??e;return null}function D0(t){for(let e of t.querySelectorAll("*"))if(om(e))return nn(e,t)??e;return null}function sm(t,e){if(zt(t))return null;if(e&&!zt(e)&&t.contains(e)){let n=nn(e,t);if(n)return n}return P0(t)??O0(t)??B0(t)??D0(t)}function lm(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-8"]','[class~="w-8"]']}var Zn="data-bloom-csi",ta="data-bloom-csi-orig",rn=new Set,cm=null;function el(t){cm=t}function um(t){return`url(${JSON.stringify(t)})`}function ea(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function nl(t,e,n){let r=um(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function dm(t,e=Zi){let n=um(t);return`[${e}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${e}] *,[${e}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${e}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`}function $0(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function Jn(t){t.removeEventListener("error",tl);let e=t.getAttribute(ta);t.removeAttribute(Zn),t.removeAttribute(ta),e&&t.getAttribute("src")!==e&&(t.src=e)}function tl(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&rn.add(n),Jn(e),cm?.()}function mm(t,e){if(!e||rn.has(e)){Jn(t);return}$0(t);let n=t.getAttribute("src")??"";if(t.getAttribute(Zn)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(ta)&&t.setAttribute(ta,n);t.setAttribute(Zn,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",tl),t.addEventListener("error",tl),n!==e&&(t.src=e)}var fm=`/*
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
`;var pm=new S("CustomSidebarIdentity"),gm="customSidebarIdentityUi",ym="customSidebarIdentity",F0="bloom-csi-face",q0="bloom-csi-name",Qn=Zi,z0=1024,na=256,vm=24,xm=64,wm=40,al=1,sl=4,lo=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],rl=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],x=L({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:ay},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:vm,max:xm,default:wm},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function an(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function j0(){return String(x.store.displayName??"").trim()}function ia(t,e,n,r,o){let i=W(n,al,sl),a=Math.min(t,e)/i,s=W(r,a/2,Math.max(a/2,t-a/2)),l=W(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}function G0(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function ll(t){let e=Math.min(1,z0/Math.max(t.width,t.height));return G0(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function U0(t,e,n,r){let{side:o,x:i,y:a}=ia(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=na,s.height=na;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,na,na);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function K0(t){let e=await Wi(t);if(!e)return null;let n=ll(e);return e.close(),n}async function ul(t,e,n,r){let o=await Yi(t);if(!o)return null;let i=U0(o,e,n,r);return o.close(),i}function dl(){x.store.cropX=.5,x.store.cropY=.5,x.store.cropZoom=1}function bm(){x.store.avatarUrl="",x.store.avatarSource="",dl()}var hm=0;async function cl(t){let e=++hm;dl(),x.store.avatarSource=t;let n=await ul(t,.5,.5,1);return e!==hm?!1:(n&&(x.store.avatarUrl=n),!!n)}function co(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function ol(t){let e=co(t);if(!e)return!1;let n=await K0(e);return n?cl(n):!1}var bt=!1,tr=!1,er=0,aa=0,ra=null,ke=new Map,nr=null,ie=null,sa=null,jt=null,la=null;function ca(t){let e=String(t??"").trim();if(!e||rn.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:n}=new URL(e);if(n==="https:"||n==="http:")return e}catch{return null}return null}function Em(){return ca(x.store.avatarUrl)??ca(x.store.avatarSource)}var oa=!1,il=new Set;function Sm(){let t=ca(x.store.avatarSource);if(!t?.startsWith("data:image/")||ca(x.store.avatarUrl)?.startsWith("data:image/")||oa||il.has(t))return;oa=!0;let e=an(x.store.cropX,.5),n=an(x.store.cropY,.5),r=an(x.store.cropZoom,1);ul(t,e,n,r).then(o=>{if(oa=!1,!o){il.add(t);return}bt&&(x.store.avatarUrl=o,ua())}).catch(()=>{oa=!1,il.add(t)})}function on(t,e){return t.map(n=>`${n} ${e}`)}function V0(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function W0(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=V0(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function Lm(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||zt(n)||n.closest(".min-w-0")||e.push(n);return e}function Y0(t){let e=Lm(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function ml(){let t=[],e=Ae();e&&t.push(e);let n=pn();if(n&&!t.some(r=>n.contains(r)||r.contains(n))){let r=n.querySelector(lo.join(","))??n.querySelector("button, a, [role='button']")??n;r&&!t.includes(r)&&t.push(r)}return t}function Tm(t,e){let n=Y0(t);if(n)mm(n,e);else for(let o of Lm(t))Jn(o);let r=sm(t,n);for(let o of t.querySelectorAll(`[${Qn}]`))o!==r&&o.removeAttribute(Qn);r&&r.setAttribute(Qn,"")}function X0(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function Z0(t,e){let n=X0(t);n&&Tm(n,e)}function J0(){for(let t of document.querySelectorAll(`img[${Zn}]`))Jn(t);for(let t of document.querySelectorAll(`[${Qn}]`))t.removeAttribute(Qn)}function Q0(){let t=W(Math.round(an(x.store.avatarSize,wm)),vm,xm),e=Em(),n=j0(),r=x.store.applyToMenu!==!1,o=[],i=[...on(lo,"img"),"#stage-sidebar-tiny-bar img"];r&&i.push(...on(rl,"> :first-child img"));let a=[...on(lo,".min-w-0 > .truncate"),...on(lo,".min-w-0.flex-1 .truncate")];r&&a.push(...on(rl,"> :first-child .truncate"));let s=lm(Qn);o.push(ea([...s.flatMap(l=>on(lo,l))].join(","),t)),o.push(ea(s.map(l=>`#stage-sidebar-tiny-bar ${l}`).join(","),32)),r&&o.push(ea(s.flatMap(l=>on(rl,`> :first-child ${l}`)).join(","),t)),e&&(o.push(nl(i.join(","),e,t)),o.push(nl("#stage-sidebar-tiny-bar img",e,32)),o.push(dm(e))),n&&o.push(W0(a,n)),E(ym,o.join(""))}function ty(){let t=Em(),e=ml();for(let n of e)Tm(n,t);if(x.store.applyToMenu!==!1){let n=gn();n&&Z0(n,t)}for(let n of document.querySelectorAll(`img[${Zn}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||Jn(n)}function ua(){if(!(!bt||tr)){tr=!0;for(let t of ke.values())t.disconnect();ie?.disconnect(),jt?.disconnect();try{Q0(),ty()}finally{tr=!1,fl(),oy(),nr?.isConnected&&km(nr),Sm()}}}function uo(){!bt||er||(er=requestAnimationFrame(()=>{er=0,ua()}))}function ey(){tr||!bt||uo()}function ny(t){if(ke.has(t))return;let e=new MutationObserver(ey);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),ke.set(t,e)}function ry(t){ke.get(t)?.disconnect(),ke.delete(t)}function fl(){let t=new Set;for(let n of ml())t.add(n),n.parentElement&&t.add(n.parentElement);let e=pn();e&&t.add(e);for(let n of[...ke.keys()])(!t.has(n)||!n.isConnected)&&ry(n);for(let n of t)n.isConnected&&ny(n)}function oy(){let t=Mo();if(!t){jt?.disconnect(),jt=null,sa=null;return}if(sa===t&&jt){jt.observe(t,{childList:!0});return}jt?.disconnect(),sa=t,jt=new MutationObserver(()=>{tr||!bt||(fl(),uo())}),jt.observe(t,{childList:!0})}function km(t){nr===t&&ie||(ie?.disconnect(),nr=t,ie=new MutationObserver(()=>{if(!t.isConnected){ie?.disconnect(),ie=null,nr=null;return}tr||!bt||uo()}),ie.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function Cm(t){if(!bt||x.store.applyToMenu===!1)return;let e=gn();if(e){km(e),uo();return}t<=0||requestAnimationFrame(()=>Cm(t-1))}function Mm(t){bt&&(ua(),!(ml().length||t<=0)&&(aa=requestAnimationFrame(()=>Mm(t-1))))}function iy(t){bt&&x.store.applyToMenu!==!1&&(!Ao(t)&&!gn()||Cm(10))}function ay(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let d=document.createElement("p");d.className="bloom-csi-hint";let f=document.createElement("div");f.className="bloom-csi-crop";let h=document.createElement("div");h.className="bloom-csi-stage";let g=document.createElement("img");g.className="bloom-csi-stage-img",g.alt="",g.draggable=!1,h.appendChild(g);let b=document.createElement("div");b.className="bloom-csi-zoom-row";let m=document.createElement("input");m.type="range",m.className="bloom-csi-zoom",m.min=String(al),m.max=String(sl),m.step="0.05",m.setAttribute("aria-label","Zoom");let T=document.createElement("span");T.className="bloom-csi-zoom-val";let A=document.createElement("button");A.type="button",A.className="bloom-csi-btn",A.textContent="Reset",b.append(m,T,A);let N=document.createElement("p");N.className="bloom-csi-hint",N.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",f.append(h,b,N),t.append(u,d,f);function Gt(){let p=String(x.store.avatarSource??""),C=String(x.store.avatarUrl??"");return p.startsWith("data:image/")?p:C.startsWith("data:image/")?C:""}function Ct(p,C,H){if(!a)return i.x=p,i.y=C,i.zoom=W(H,al,sl),i;let Z=ia(a.w,a.h,H,p*a.w,C*a.h);return i.x=Z.x/a.w,i.y=Z.y/a.h,i.zoom=Z.z,i}function et(){m.value=String(i.zoom),T.textContent=`${Math.round(i.zoom*100)}%`;let p=a?ia(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;p&&a&&(g.style.width=`${a.w/p.side*100}%`,g.style.height=`${a.h/p.side*100}%`,g.style.left=`${(.5-p.x/p.side)*100}%`,g.style.top=`${(.5-p.y/p.side)*100}%`)}function R(p=!1){let C=Gt(),H=String(x.store.avatarUrl??"").trim(),Z=!!C;s.hidden=!H&&!C,(C||H)&&(s.src=C||H),document.activeElement!==l&&(l.value=Z?"":H),l.placeholder=Z?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",f.hidden=!C,d.hidden=!(e&&/^https?:\/\//.test(H)&&!C),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",C&&(p&&(i.x=an(x.store.cropX,.5),i.y=an(x.store.cropY,.5),i.zoom=an(x.store.cropZoom,1)),g.getAttribute("src")!==C&&(a=null,g.onload=()=>{a={w:g.naturalWidth,h:g.naturalHeight},Ct(i.x,i.y,i.zoom),et()},g.src=C),et())}function ot(p,C,H,Z=!1){Ct(p,C,H),et();let vl=Gt(),xl=()=>{x.store.cropX=i.x,x.store.cropY=i.y,x.store.cropZoom=i.zoom,vl&&ul(vl,i.x,i.y,i.zoom).then(wl=>{wl&&(x.store.avatarUrl=wl)})};r&&clearTimeout(r),Z?xl():r=setTimeout(xl,80)}function Ut(p){x.store.avatarUrl=p;let C=p.trim();if(n&&clearTimeout(n),!C){x.store.avatarSource="",dl(),e=!1,R(!0);return}if(C.startsWith("data:image/")){e=!1,n=setTimeout(()=>{Yi(C).then(H=>{if(!H)return;let Z=ll(H);H.close(),Z&&cl(Z).then(()=>R(!0))})},80);return}if(/^https?:\/\//.test(C)){e=!1,x.store.avatarSource="",n=setTimeout(()=>{Yi(C).then(H=>{if(!H){e=!0,R(!0);return}let Z=ll(H);H.close(),Z?(e=!1,cl(Z).then(()=>R(!0))):(e=!0,R(!0))})},400);return}e=!1,x.store.avatarSource="",R(!0)}u.addEventListener("paste",p=>{co(p.clipboardData)&&(p.preventDefault(),e=!1,ol(p.clipboardData).then(()=>R(!0)))}),u.addEventListener("dragover",p=>{co(p.dataTransfer)&&p.preventDefault()}),u.addEventListener("drop",p=>{co(p.dataTransfer)&&(p.preventDefault(),e=!1,ol(p.dataTransfer).then(()=>R(!0)))}),l.addEventListener("change",()=>Ut(l.value)),l.addEventListener("paste",p=>{co(p.clipboardData)&&(p.preventDefault(),e=!1,ol(p.clipboardData).then(()=>R(!0)))}),l.addEventListener("keydown",p=>{Gt()&&!l.value&&(p.key==="Backspace"||p.key==="Delete")&&(bm(),e=!1,R(!0))}),c.addEventListener("click",()=>{bm(),e=!1,R(!0)}),h.addEventListener("pointerdown",p=>{p.button===0&&(h.setPointerCapture(p.pointerId),o.on=!0,o.px=p.clientX,o.py=p.clientY,o.x=i.x,o.y=i.y)}),h.addEventListener("pointermove",p=>{if(!o.on||!a)return;let C=h.clientWidth;if(!C)return;let{side:H}=ia(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);Ct(o.x-(p.clientX-o.px)*(H/C)/a.w,o.y-(p.clientY-o.py)*(H/C)/a.h,i.zoom),et()}),h.addEventListener("pointerup",()=>{o.on&&(o.on=!1,ot(i.x,i.y,i.zoom,!0))}),h.addEventListener("pointercancel",()=>{o.on=!1}),h.addEventListener("wheel",p=>{p.preventDefault(),ot(i.x,i.y,i.zoom*(p.deltaY<0?1.08:1/1.08))},{passive:!1}),m.addEventListener("input",()=>ot(i.x,i.y,Number(m.value))),m.addEventListener("change",()=>ot(i.x,i.y,Number(m.value),!0)),A.addEventListener("click",()=>ot(.5,.5,1,!0));let yl=()=>R(!1);return la=yl,R(!0),()=>{la===yl&&(la=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var Am=y({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:gm,cleanupSelectors:[`.${F0}`,`.${q0}`],settings:x,start(){bt=!0,rn.clear(),el(uo),E(gm,fm),ra=new AbortController,document.addEventListener("click",iy,{signal:ra.signal}),Mm(40),Sm(),pm.debug("started")},onSettingsChange(){rn.clear(),la?.(),bt&&(fl(),ua())},stop(){bt=!1,ra?.abort(),ra=null,er&&cancelAnimationFrame(er),er=0,aa&&cancelAnimationFrame(aa),aa=0;for(let t of ke.values())t.disconnect();ke.clear(),ie?.disconnect(),ie=null,nr=null,jt?.disconnect(),jt=null,sa=null,J0(),w(ym),el(null),rn.clear(),pm.debug("stopped")}});var rr=new S("Bloom"),Hm=!1,sy=Date.now(),ly=[yc,uu,vu,Eu,Cu,Iu,Uu,Vu,Xu,ad,fd,xd,Ed,Rd,Gd,Kd,tm,Am];function da(t){return new Promise(e=>setTimeout(e,t))}function cy(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function uy(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var Im=8e3,Nm=300,dy=250;async function my(){if(Me())return await da(Nm),!0;for(;Date.now()-sy<Im;)if(await da(dy),Me())return await da(Nm),!0;return Me()||ya()}function pl(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function fy(){if(pl())return!0;let t=Date.now()+Im;for(;Date.now()<t;)if(await da(100),pl())return!0;return pl()}function py(){try{GM_registerMenuCommand?.("Bloom++ settings",hc)}catch{}}function gy(){wo(()=>{ir("HostShell"),rr.info("host shell",it)}),Eo(()=>{rr.info("idle ready",it)}),So(()=>{fa(),ir("HostReady"),rr.info("chrome ready",it)})}async function gl(){await Nl()}async function bl(){if(Hm)return;Hm=!0;for(let n of ly)try{Fl(n),Zl(n)}catch(r){rr.error("register failed",n.name,r)}jl(),ir("Init"),py(),gy();let t=()=>ir("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await cy(),fa(),rr.info("styles ready",it),await uy(),fy().then(n=>{n&&Lo()}),!await my()){rr.warn("late islands not detected; starting default plugins",it),dn(),To();return}await Yl()}var Rm=typeof unsafeWindow<"u"?unsafeWindow:window,by=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||by){let t=Rm.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",it);try{Object.defineProperty(Rm,"Bloom",{value:hl,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}gl().then(()=>bl()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
