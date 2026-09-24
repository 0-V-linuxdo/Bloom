// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260924] v1.4.81
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

/* Bloom++ [20260924] v1.4.81. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Qm=Object.defineProperty;var tf=(t,e)=>{for(var n in e)Qm(t,n,{get:e[n],enumerable:!0})};var Cl={};tf(Cl,{REPO_URL:()=>ac,Settings:()=>k,VERSION:()=>at,contextKeyFromUrl:()=>Xt,conversationTitle:()=>En,conversationToken:()=>Et,currentConversationId:()=>M,hasDraftText:()=>xt,hasErrorToast:()=>Pt,hasLateIslands:()=>Ae,init:()=>kl,initSettings:()=>Tl,isDocumentInteractive:()=>lc,isStreaming:()=>Q,isUserDraftEmpty:()=>fe,messageCreateTime:()=>ni,plugins:()=>Wt,requestChromeReady:()=>Ao,requestIdleReady:()=>mn,requestShellReady:()=>Mo,setEditorText:()=>Yt,subscribeHarvest:()=>lt,watchStreamingEdge:()=>tt,whenChromeReady:()=>Co,whenIdleReady:()=>ko,whenShellReady:()=>To});var se=new Map,bo=!1;function ef(){return document.getElementById("bloom-root")?.shadowRoot??null}function Il(){return document.head??null}function ln(){let t=ef();if(!t)return;let e=t.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",t.appendChild(e)),e.textContent=nf()}function va(t,e){if(!bo)return;let n=Il();if(!n)return;if(e.disabled){e.el&&(e.el.disabled=!0),ln();return}if(e.el?.isConnected&&e.el.parentElement===n){e.el.textContent!==e.css&&(e.el.textContent=e.css),e.el.disabled=!1,ln();return}e.el?.remove();let r=document.createElement("style");r.dataset.bloomStyle=t,r.textContent=e.css,n.appendChild(r),e.el=r,ln()}function w(t,e){let n=se.get(t);n?(n.css=e,n.disabled=!1):(n={css:e,disabled:!1,el:null},se.set(t,n)),bo&&va(t,n)}function xa(){if(!Il())return!1;bo=!0;for(let[e,n]of se)va(e,n);return ln(),!0}function Rl(t){let e=se.get(t);e&&(e.disabled=!1,bo&&va(t,e))}function Pl(t){let e=se.get(t);e&&(e.disabled=!0,e.el&&(e.el.disabled=!0),ln())}function E(t){let e=se.get(t);e&&(e.el?.remove(),se.delete(t),ln())}function nf(){return Array.from(se.values()).filter(t=>!t.disabled).map(t=>t.css).join(`
`)}var S=class{constructor(e){this.tag=e}prefix(){return`[Bloom++] [${this.tag}]`}info(...e){console.info(this.prefix(),...e)}warn(...e){console.warn(this.prefix(),...e)}error(...e){console.error(this.prefix(),...e)}debug(...e){console.debug(this.prefix(),...e)}};function y(t){return t}var Ea=new Map;function cn(t,e){let n=Ea.get(t);return n||(n=new Set,Ea.set(t,n)),n.add(e),()=>n.delete(e)}function Me(t,e){let n=Ea.get(t);if(n)for(let r of Array.from(n))try{r(e)}catch{}}var rf="bloompp";function Ol(){return new Promise((t,e)=>{let n=indexedDB.open(rf,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains("kv")||r.createObjectStore("kv")},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function Bl(t){try{let e=await Ol();return await new Promise((n,r)=>{let i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch{return}}async function Dl(t,e){try{let n=await Ol();await new Promise((r,o)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(e,t);a.onsuccess=()=>r(),a.onerror=()=>o(a.error)})}catch{}}function un(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function Y(t,e,n){return Math.min(n,Math.max(e,t))}function $l(t,e,n){let r=t.get(e);if(r!==void 0)return r;let o=n();return t.set(e,o),o}async function _l(t){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(t,"text");return}}catch{}try{await navigator.clipboard.writeText(t)}catch{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}function Fl(t,e){let n;return((...r)=>{n&&clearTimeout(n),n=setTimeout(()=>t(...r),e)})}var ho=new S("SettingsStore"),le="BloomSettings",of=100;function yo(t){return t!=null&&typeof t.then=="function"}function af(t){if(t==null||yo(t))return null;if(un(t))return t;if(typeof t!="string"||!t)return null;try{let e=JSON.parse(t);if(un(e)&&!yo(e))return e;if(typeof e=="string"){let n=JSON.parse(e);return un(n)&&!yo(n)?n:null}return null}catch{return null}}function xo(t){let e=af(t);if(!e)return null;let n=e.plugins;return!un(n)||yo(n)||Object.keys(n).length===0?null:e}var vo=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(e){this.plain=e,this.store=this.makeProxy(e),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(e,n){this.defaultGetters.set(e,n)}makeProxy(e,n=""){let r=this.proxyCache.get(e);if(r)return r;let o=new Proxy(e,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let d=l.slice(c.length+1);if(d&&!d.includes(".")){let f=u(d);f!==void 0&&(i[a]=f,s=f);break}}}return un(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(e,o),o}invokeListeners(e,n){for(let r of Array.from(e))try{r(n)}catch(o){ho.error("Settings listener error:",o)}}notifyListeners(e){this.invokeListeners(this.globalListeners,e);let n=this.pathListeners.get(e);n&&this.invokeListeners(n,e);for(let[r,o]of Array.from(this.prefixListeners))e.startsWith(r)&&this.invokeListeners(o,e);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},of))}save(){try{let e=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(le,this.plain)}catch{try{GM_setValue(le,e)}catch(n){ho.warn("Failed to save settings to GM:",n)}}try{localStorage.setItem(le,e)}catch{}Dl(le,e).catch(n=>ho.warn("Failed to save settings to IndexedDB:",n))}catch(e){ho.error("Failed to save settings:",e)}}addGlobalChangeListener(e){this.globalListeners.add(e)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}addChangeListener(e,n){this.addToMap(this.pathListeners,e,n)}removeChangeListener(e,n){this.removeFromMap(this.pathListeners,e,n)}addPrefixChangeListener(e,n){this.addToMap(this.prefixListeners,e,n)}removePrefixChangeListener(e,n){this.removeFromMap(this.prefixListeners,e,n)}addToMap(e,n,r){$l(e,n,()=>new Set).add(r)}removeFromMap(e,n,r){let o=e.get(n);o&&(o.delete(r),o.size||e.delete(n))}};var sf=new S("Settings"),lf={plugins:{}},k=new vo(structuredClone(lf)),cf=(t,e)=>e?`plugins.${t}.${e}`:`plugins.${t}`;function uf(t,e){let n=t[e];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(o=>o.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function L(t){let e={def:t,pluginName:"",get store(){let n=e.pluginName;return n?(k.store.plugins[n]||(k.store.plugins[n]={}),k.store.plugins[n]):{}},get plain(){let n=e.pluginName;return n?k.plain.plugins[n]??{}:{}}};return e}async function df(t){if(typeof GM_getValue=="function")try{let e=GM_getValue(t);return e!=null&&typeof e.then=="function"?await e:e}catch{return}}async function ql(){let t=xo(await df(le));if(t||(t=xo(await Bl(le))),!t)try{t=xo(localStorage.getItem(le))}catch{t=null}if(!t)return;let e=t.plugins;e&&(k.plain.plugins=e,sf.debug("Loaded settings"))}function zl(t,e){e&&(e.pluginName=t,k.plain.plugins[t]||(k.plain.plugins[t]={}),k.setDefaultGetter(cf(t),n=>{if(n!=="enabled")return uf(e.def,n)}))}function jl(){return k.plain.plugins.Settings||(k.store.plugins.Settings={}),k.store.plugins.Settings}function Eo(){return jl().pinnedPlugins??[]}function Gl(t){return Eo().includes(t)}function Ul(t){let e=Eo(),n=e.includes(t);return k.store.plugins.Settings={...k.plain.plugins.Settings,pinnedPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}function wo(){return jl().starredPlugins??[]}function Kl(t){return wo().includes(t)}function Wl(t){let e=wo(),n=e.includes(t);return k.store.plugins.Settings={...k.plain.plugins.Settings,starredPlugins:n?e.filter(r=>r!==t):[t,...e]},!n}var So=new S("PluginManager"),Wt={},sr=new Set;function Xl(t){if(Wt[t.name]){So.warn("Duplicate plugin",t.name);return}Wt[t.name]=t,zl(t.name,t.settings)}function dn(t){let e=Wt[t];if(!e)return!1;if(e.required)return!0;let n=k.plain.plugins[t]?.enabled;return typeof n=="boolean"?n:e.enabledByDefault!==!1}function Zl(t){let e=Wt[t];if(!e||e.required)return;let n=!dn(t);k.plain.plugins[t]||(k.store.plugins[t]={}),k.store.plugins[t].enabled=n,n?Jl(e):mf(e),Me("pluginToggle",{name:t,enabled:n})}function Jl(t,e=!1){if(!sr.has(t.name)&&dn(t.name))try{t.managedStyle&&Rl(t.managedStyle),t.start?.(),sr.add(t.name),t.settings&&k.addPrefixChangeListener(`plugins.${t.name}.`,()=>{sr.has(t.name)&&t.onSettingsChange?.()}),e||So.debug("Started",t.name)}catch(n){So.error("Failed to start",t.name,n)}}function mf(t){if(sr.has(t.name)){try{t.stop?.()}catch(e){So.error("Failed to stop",t.name,e)}for(let e of t.cleanupSelectors??[])try{document.querySelectorAll(e).forEach(n=>n.remove())}catch{}t.managedStyle&&(Pl(t.managedStyle),E(t.managedStyle)),sr.delete(t.name)}}function lr(t){for(let e of Object.values(Wt))(e.startAt??"DOMContentLoaded")===t&&Jl(e)}var Vl=2,Yl="defaultsRev";function Ql(){let t=k.plain.plugins.Settings;if(!(!t||t[Yl]===Vl)){for(let e of["NoShareLink","NoDictation"]){let n=k.plain.plugins[e];!n||typeof n.enabled=="boolean"||(n.enabled=!1)}t[Yl]=Vl}}var cr=!1,Lo=!1,wa=!1,ec=[],nc=[],rc=[];function Sa(t){let e=t.splice(0);for(let n of e)n()}function ur(){cr||(cr=!0,Sa(ec))}function La(){Lo||(Lo=!0,cr||ur(),Sa(nc))}function oc(){wa||(wa=!0,cr||ur(),Lo||La(),Sa(rc))}function To(t){cr?t():ec.push(t)}function ko(t){Lo?t():nc.push(t)}function Co(t){wa?t():rc.push(t)}function Mo(){ur()}function mn(){ur(),La()}function Ao(){oc()}function tc(t=4e3){return new Promise(e=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>e(),{timeout:t});return}setTimeout(e,0)})}async function ic(){await tc(4e3),ur(),await tc(4e3),La(),oc()}var v={p:"0-V-linuxdo"},at="[20260924] v1.4.81",ac="https://github.com/0-V-linuxdo/Bloom";var ff={BetterNavigator:179023761e4,ChatListStatus:1790233382e3,ChatStateFavicons:1790233382e3,Cleaner:1789910872e3,ComposerOpacity:1789910872e3,CustomSidebarIdentity:1789970413e3,GreetingCustomizer:1789861316e3,InputHistory:1789858186e3,MessageTimestamps:1790230458e3,NoDictation:1789910872e3,NoShareLink:1789910872e3,NoSidebarIdentity:1789910872e3,PromptQueue:1790230458e3,RecentTopics:1790181019e3,ResponseNotification:1790233382e3,Settings:1789973738e3,StreamerMode:1789924346e3,WiderChat:1789910872e3};function sc(t){let e=ff[t.name];typeof e=="number"&&e>0&&(t.updatedAt=e)}function pf(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function gf(){try{let t=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let e of t)if(e instanceof HTMLImageElement&&e.isConnected&&e.naturalWidth>1)return!0;return!1}catch{return!1}}function Ta(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function Ae(){return Ta()?pf()||gf():!1}function lc(){return Ae()}var bf=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),cc=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),hf=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),yf="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function pn(t){return t.id==="bloom-root"||!!t.closest(yf)}function uc(t){let e=t.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(e)}function Ho(t){if(t.querySelector('[role="tablist"], [role="tab"]'))return!0;let e=t.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(e))return!1;let n=t.getBoundingClientRect();return n.width>420&&n.height>360}function ka(t){if(!(t instanceof HTMLElement)||!t.isConnected||pn(t))return!1;let e=t.closest('[role="dialog"], [aria-modal="true"]');return e&&Ho(e)?!1:t.getClientRects().length>0}function fn(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function vf(){let t=[];for(let e of document.querySelectorAll(bf))!(e instanceof HTMLElement)||!e.isConnected||pn(e)||t.push(e);return t}function No(t){if(!t.isConnected||pn(t))return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.left<window.innerWidth/3&&e.top<window.innerHeight&&e.bottom>0}function He(){return vf().filter(No)[0]??null}function gn(){let t=document.getElementById("stage-sidebar-tiny-bar");if(!(t instanceof HTMLElement)||!t.isConnected||pn(t))return null;let e=t.getBoundingClientRect();return e.width<8||e.height<40||e.left<0||e.left>=window.innerWidth/3?null:t}function Ca(t){let e=t,n=t.parentElement;n&&n.children.length===1&&!pn(n)&&!fn(n)&&n.parentElement&&!fn(n.parentElement)&&(e=n);let r=e.parentElement;if(r&&!fn(r)&&!pn(r)&&r.children.length>1){let o=r.getAttribute("class")||"";if(/\bflex\b/.test(o)&&!/flex-col/.test(o)&&r.parentElement&&!fn(r.parentElement))return r}return e}function bn(){let t=document.querySelectorAll(cc);for(let n of t)if(ka(n)&&!Ho(n)&&uc(n))return n;let e=document.querySelectorAll(hf);for(let n of e){if(!ka(n)||!uc(n)||Ho(n))continue;let r=n.querySelector(cc);return ka(r)&&!Ho(r)?r:n}return null}function Io(){let t=He();if(t){let e=Ca(t),n=e.parentElement;if(n&&!fn(n))return n;if(!fn(e))return e}return gn()}function Ro(t){let e=He();return e?t.composedPath().includes(e):!1}var Aa=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],xf={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Ef(t){let e=t.trim(),n=e.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let r=e.match(/^#([0-9a-f]{3,8})$/i);if(!r)return null;let o=r[1];o.length===3||o.length===4?o=[...o].map(a=>a+a).join("").slice(0,6):o=o.slice(0,6);let i=Number.parseInt(o,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function wf(t){return(.2126*t.r+.7152*t.g+.0722*t.b)/255}function Ma(t){let e=Ef(t);return e?wf(e)>.55?"light":"dark":null}function Sf(){let t=document.documentElement;if(t.classList.contains("dark"))return"dark";if(t.classList.contains("light"))return"light";let e=(t.getAttribute("data-theme")||t.getAttribute("data-color-scheme")||"").toLowerCase();if(e==="light"||e==="dark")return e;try{let n=getComputedStyle(t),r=Ma(n.getPropertyValue("--main-surface-primary"));if(r)return r;let o=Ma(n.backgroundColor);if(o)return o;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Ma(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Po(t){return t==="auto"?Sf():t}function Lf(t){try{let e=getComputedStyle(document.documentElement);for(let n of Aa){let r=e.getPropertyValue(n).trim();r?t.style.setProperty(n,r):t.style.removeProperty(n)}}catch{}}function Oo(t,e,n){let r=xf[e];if(n){Lf(t);for(let o of Aa)t.style.getPropertyValue(o)||t.style.setProperty(o,r[o])}else for(let o of Aa)t.style.setProperty(o,r[o])}function dc(t){let e=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&t()};return e.addEventListener("change",t),document.addEventListener("visibilitychange",n),window.addEventListener("focus",t),()=>{e.removeEventListener("change",t),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",t)}}var Ha=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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
`;var kf="bloom-root",Ht="bloom-rail-item",Fo="bloom-account-item",Ie="bloom-sidebar-panel",vr="bloom-plugin-dialog",Wo="bloom-plugin-layer",qo="bloom-settings-css",Cf=2e3,pc=null,Mf=null,me=!1,Pa=[],Bo=null,zo=null,ue=null,$o=null,Vt=null,br=null,dr,hn=0,hr=0,mr=0,fr=null,pr=null,jo=null,gc=null,gr=null,Na=[],Go=!1,Af=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Hf=[{id:"favorites",label:"Favorites"},{id:"recent",label:"Recent"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"},{id:"other",label:"Other"}],Nf=new Set(["chat","ui","privacy"]),If=10080*60*1e3,Vo="",yr="all",At="all";function Yo(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function bc(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Rf(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'}function Pf(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function Of(t){let e='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return t?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${e}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}function Bf(t){let e='<path d="M12 17v5"/>';return t?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var Df={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function $f(t){return t.icon||Df[t.name]||Yo()}function Ia(t,e,n){t&&(t.setAttribute("data-bloom-scheme",e),Oo(t,e,n),t.style.removeProperty("--bloom-rail-surface"))}function hc(t){t&&(t.style.removeProperty("--bloom-rail-surface"),t.style.removeProperty("--bg-primary"))}function Uo(){let t="auto",e=Po(t);Ia(pc,e,!0);let n=document.getElementById(Ie);n instanceof HTMLElement&&Ia(n,e,!0);let r=document.getElementById(vr);r instanceof HTMLElement&&Ia(r,e,!0);let o=document.getElementById(Ht);o instanceof HTMLElement&&hc(o),Me("schemeChange",{scheme:e,pref:t})}function yc(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(t=>t.remove())}function vc(){if(w("settings",Ha),document.getElementById(qo)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let t=document.createElement("style");t.id=qo,t.textContent=Ha,document.head.appendChild(t)}function _f(t){if(document.body){t();return}let e=!1,n=()=>{e||!document.body||(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Ff(){for(let t of Pa)t();Pa=[]}function xc(t,e,n){let r=document.createElement("label");r.className="bloom-toggle";let o=document.createElement("span");o.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=e,i.disabled=n,i.setAttribute("aria-label",`${t} enabled`);let a=document.createElement("span");return o.append(i,a),r.append(o),r}function qf(t){return t.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,e=>e.toUpperCase())}function Da(t){return t.settings?Object.entries(t.settings.def).filter(([,e])=>!e.hidden):[]}function zf(t){return Da(t).length>0}function _o(t){if(t.default!==void 0)return t.default;if(t.type===3)return(t.options?.find(n=>n.default)??t.options?.[0])?.value;if(t.type===2)return!1;if(t.type===4)return t.min??0;if(t.type===0)return"";if(t.type===1)return 0}function jf(t,e){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let r=document.createElement("span");if(r.className="bloom-plugin-dialog-label-title",r.textContent=qf(t),n.appendChild(r),e.description){let o=document.createElement("span");o.className="bloom-plugin-dialog-label-desc",o.textContent=e.description,n.appendChild(o)}return n}function Gf(t,e,n){if(n.hidden)return null;let r=n.type===4||n.type===0||n.type===1||n.type===5,o=document.createElement("div");o.className=r?"bloom-field bloom-field-stack":"bloom-field",o.appendChild(jf(e,n));let i=k.store.plugins[t]??(k.store.plugins[t]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",Pa.push(n.render(a)),o.appendChild(a),o}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[e]??_o(n)??n.options[0].value),a.addEventListener("change",()=>{i[e]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[e]??_o(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[e]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=xc(e,!!i[e],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[e]=s.checked)}),o.appendChild(a),o}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[e]??_o(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[e]=n.type===1?Number(a.value):a.value}),o.appendChild(a),o}return o}function mc(t,e){let n=document.createElement("div");n.className=e?`bloom-plugin-dialog-field ${e}`:"bloom-plugin-dialog-field";let r=document.createElement("div");return r.className="bloom-plugin-dialog-field-label",r.textContent=t,n.appendChild(r),n}function Uf(t){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let e=k.store.plugins[t.name]??(k.store.plugins[t.name]={});for(let[n,r]of Da(t)){if(n==="enabled"||r.type===5)continue;let o=_o(r);o!==void 0&&(e[n]=o)}wc(t)}function Ec(t){t.key==="Escape"&&(!document.getElementById(Wo)&&!document.getElementById(vr)||(t.stopPropagation(),yn()))}function Kf(){Go||(document.addEventListener("keydown",Ec),Go=!0)}function Wf(){Go&&(document.removeEventListener("keydown",Ec),Go=!1)}function yn(){Ff(),Wf(),document.getElementById(Wo)?.remove(),document.getElementById(vr)?.remove()}function wc(t){if(yn(),!document.body)return;let e=document.createElement("div");e.id=Wo,e.className="bloom-plugin-layer",e.addEventListener("pointerdown",de),e.addEventListener("pointerup",de),e.addEventListener("click",u=>{u.stopPropagation(),u.target===e&&yn()});let n=document.createElement("div");n.id=vr,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",de),n.addEventListener("pointerup",de),n.addEventListener("click",de);let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn bloom-plugin-dialog-close",r.setAttribute("aria-label","Close"),r.innerHTML=bc(),r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),yn()});let o=document.createElement("div");o.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=t.name,o.appendChild(i),t.description){let u=document.createElement("p");u.className="bloom-plugin-dialog-sub",u.textContent=t.description,o.appendChild(u)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(r,o,a),t.authors?.length){let u=mc("Authors"),d=document.createElement("p");d.className="bloom-plugin-dialog-authors",d.textContent=t.authors.join(", "),u.appendChild(d),n.appendChild(u)}let s=mc("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let c=Da(t);if(c.length)for(let[u,d]of c){let f=Gf(t.name,u,d);f&&l.appendChild(f)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}if(s.appendChild(l),n.appendChild(s),c.length){let u=document.createElement("div");u.className="bloom-plugin-dialog-footer";let d=document.createElement("button");d.type="button",d.className="bloom-plugin-dialog-reset",d.textContent="Reset",d.addEventListener("click",()=>Uf(t)),u.appendChild(d),n.appendChild(u)}e.appendChild(n),document.body.appendChild(e),Kf(),Uo()}function Vf(t){let e=document.createElement("div");e.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let o=document.createElement("div");o.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=$f(t);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=t.name,a.title=t.name,o.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=Kl(t.name),c=document.createElement("button");if(c.type="button",c.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,c.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),c.innerHTML=Of(l),c.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let m=Wl(t.name);Me("pluginStar",{name:t.name,starred:m})}),s.appendChild(c),!t.required){let b=Gl(t.name),m=document.createElement("button");m.type="button",m.className=`bloom-icon-btn bloom-card-pin${b?" bloom-card-pin-active":""}`,m.setAttribute("aria-label",b?"Unpin from top":"Pin to top"),m.innerHTML=Bf(b),m.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();let A=Ul(t.name);Me("pluginPin",{name:t.name,pinned:A})}),s.appendChild(m)}if(zf(t)){let b=document.createElement("button");b.type="button",b.className="bloom-icon-btn bloom-card-settings",b.setAttribute("aria-label",`${t.name} settings`),b.innerHTML=Pf(),b.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation(),wc(t)}),s.appendChild(b)}let u=xc(t.name,dn(t.name),!!t.required),d=u.querySelector("input");if(d?.addEventListener("click",b=>b.stopPropagation()),d?.addEventListener("change",()=>{Zl(t.name)}),s.appendChild(u),r.append(o,s),n.appendChild(r),t.description){let b=document.createElement("div");b.className="bloom-card-desc",b.textContent=t.description,n.appendChild(b)}let f=document.createElement("div");f.className="bloom-card-separator";let h=document.createElement("div");h.className="bloom-card-footer";let p=document.createElement("div");return p.className="bloom-card-author",p.textContent=t.authors?.filter(Boolean).join(", ")||"\xA0",h.appendChild(p),e.append(n,f,h),e}function Sc(){return Object.values(Wt).filter(t=>!t.hidden&&t.name!=="Settings")}function Yf(t){return t.updatedAt!=null&&Date.now()-t.updatedAt<If}function Lc(t,e){if(e==="all"||e==="favorites")return!0;if(e==="recent")return Yf(t);let n=(t.tags??[]).map(r=>r==="sidebar"?"ui":r);return e==="other"?!t.required&&!n.some(r=>Nf.has(r)):n.includes(e)}function Xf(t){return`${t.name} ${t.description??""} ${(t.tags??[]).join(" ")}`.toLowerCase()}function Zf(){return Vo.trim()?"No plugins match your search.":At==="favorites"?"No favorites yet. Star a plugin to see it here.":At==="recent"?"No plugins updated in the last 7 days.":"No plugins available."}function Jf(){let t=Sc();return Hf.filter(e=>e.id==="favorites"||e.id==="all"||e.id==="recent"?!0:t.some(n=>Lc(n,e.id)))}function Qf(){if(gr){gr.replaceChildren();for(let t of Jf()){let e=document.createElement("button");e.type="button",e.className=`bloom-plugin-tab${At===t.id?" bloom-plugin-tab-active":""}`,e.textContent=t.label,e.addEventListener("click",()=>{At=t.id,Ne()}),gr.appendChild(e)}}}function tp(){let t=Sc();if(At==="favorites"){let e=new Set(wo());t=t.filter(n=>e.has(n.name))}else At!=="all"&&(t=t.filter(e=>Lc(e,At)));return yr==="enabled"&&(t=t.filter(e=>dn(e.name))),yr==="disabled"&&(t=t.filter(e=>!dn(e.name))),t}function Ne(){if(!fr)return;Qf();let t=tp();jo&&(jo.placeholder=`Search ${t.length} plugins...`);let e=t,n=Vo.trim().toLowerCase();if(n&&(e=e.filter(r=>Xf(r).includes(n))),At==="recent")e=e.slice().sort((r,o)=>(o.updatedAt??0)-(r.updatedAt??0)||r.name.localeCompare(o.name));else if(At!=="favorites"){let r=Eo();if(r.length){let o=new Map(r.map((i,a)=>[i,a]));e=e.slice().sort((i,a)=>{let s=o.has(i.name),l=o.has(a.name);return s!==l?s?-1:1:s?(o.get(i.name)??0)-(o.get(a.name)??0):i.name.localeCompare(a.name)})}}fr.replaceChildren();for(let r of e)fr.appendChild(Vf(r));pr&&(pr.hidden=e.length>0,pr.textContent=Zf())}function de(t){t.stopPropagation()}function Ra(t){t.preventDefault(),t.stopPropagation(),typeof t.stopImmediatePropagation=="function"&&t.stopImmediatePropagation()}function $a(){document.getElementById(Ht)?.setAttribute("aria-expanded",me?"true":"false")}function ep(t){if(!t.isConnected)return!1;let e=t.getBoundingClientRect();return e.width>40&&e.height>16&&e.left>=0&&e.right<=window.innerWidth+16&&e.top<window.innerHeight&&e.bottom>0}function _a(){yn(),Vo="",yr="all",At="all",document.getElementById(Ie)?.remove(),me=!1,$a()}function np(t){let e=document.createElement("div");e.id=t,e.setAttribute("aria-labelledby","bloom-settings-title"),e.addEventListener("pointerdown",de),e.addEventListener("pointerup",de),e.addEventListener("click",de);let n=document.createElement("div");n.className="bloom-settings-list";let r=document.createElement("div");r.className="bloom-settings-head";let o=document.createElement("div");o.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=Yo();let a=document.createElement("span");a.className="bloom-settings-title-row";let s=document.createElement("h2");s.id="bloom-settings-title",s.textContent="Bloom++";let l="Toggle features. Some need a reload. Click the sliders icon to configure.",c=document.createElement("button");c.type="button",c.className="bloom-info-hint",c.setAttribute("aria-label",l),c.innerHTML=Rf();let u=document.createElement("span");u.className="bloom-info-hint-tip",u.setAttribute("role","tooltip"),u.textContent=l,c.appendChild(u),a.append(s,c),o.append(i,a);let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn bloom-settings-close",d.setAttribute("aria-label","Close"),d.innerHTML=bc(),d.addEventListener("click",_a),r.appendChild(o),n.appendChild(r);let f=document.createElement("div");f.className="bloom-plugin-tabs",n.appendChild(f);let h=document.createElement("div");h.className="bloom-search-bar";let p=document.createElement("input");p.type="search",p.className="bloom-search-input",p.setAttribute("aria-label","Search plugins"),p.placeholder="Search plugins...",p.addEventListener("input",()=>{Vo=p.value,Ne()});let b=document.createElement("select");b.className="bloom-search-filter",b.setAttribute("aria-label","Filter plugins");for(let A of Af){let N=document.createElement("option");N.value=A.value,N.textContent=A.label,b.appendChild(N)}b.value=yr,b.addEventListener("change",()=>{yr=b.value,Ne()}),h.append(p,b),n.appendChild(h);let m=document.createElement("div");m.className="bloom-plugin-list",n.appendChild(m);let T=document.createElement("p");return T.className="bloom-tab-empty",T.hidden=!0,n.appendChild(T),e.append(d,n),fr=m,pr=T,jo=p,gc=b,gr=f,Ne(),e}function rp(t){t.classList.add("bloom-rail-dock")}function op(){let t=document.getElementById(Ht);return t instanceof HTMLElement&&t.isConnected&&t.parentElement&&No(t)?t:null}function ip(){if(document.getElementById(Ie)?.remove(),!document.body)return;let t=np(Ie);rp(t),document.body.appendChild(t),me=!0,yn(),Uo(),$a(),Me("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:at,dock:"center",rail:!!op()})}function Fa(){let t=document.getElementById(Ie);if(t instanceof HTMLElement&&t.isConnected&&ep(t)){_a();return}t?.remove(),ip()}function ap(){let t=document.createElement("button");return t.type="button",t.id=Ht,t.className="bloom-rail-item",t.setAttribute("aria-controls",Ie),t.setAttribute("aria-expanded",me?"true":"false"),t.innerHTML=`<span class="bloom-rail-mark">${Yo()}</span><span>Bloom++</span>`,t.addEventListener("pointerdown",e=>e.stopPropagation()),t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Fa()}),t}function fc(t,e){let r=t.parentElement?.getBoundingClientRect().width??t.getBoundingClientRect().width;t.classList.toggle("bloom-rail-compact",e===!0||r>0&&r<80)}function sp(t){let e=t.querySelector("[data-bloom-csi-slot]");if(e instanceof HTMLElement){let o=e.getBoundingClientRect();if(o.width>8&&o.height>8)return e}let n=t.querySelector("img");if(n instanceof HTMLElement){let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}let r=['[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]'];for(let o of r)for(let i of t.querySelectorAll(o)){if(!(i instanceof HTMLElement)||i.querySelector(".min-w-0, .truncate"))continue;let a=i.getBoundingClientRect();if(a.width>8&&a.height>8)return i}return null}function lp(t,e){for(let n of t.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||e&&(n===e||n.contains(e)||e.contains(n))||(n.textContent||"").trim().length<2)continue;let o=n.getBoundingClientRect();if(o.width>16&&o.height>8&&o.height<40)return n}return null}function ce(t,e,n){let r=`${n}px`;t.style.getPropertyValue(e)!==r&&t.style.setProperty(e,r)}function Tc(t,e){if(t.classList.contains("bloom-rail-compact"))return;let n=t.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!t.isConnected||!e.isConnected)return;let r=sp(e),o=getComputedStyle(e),i=Number.parseFloat(o.paddingTop),a=Number.parseFloat(o.paddingBottom);if(Number.isFinite(i)&&ce(t,"padding-top",Math.round(i)),Number.isFinite(a)&&ce(t,"padding-bottom",Math.round(a)),r){let s=r.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));ce(n,"width",l),ce(n,"height",Math.max(20,Math.round(s.height)));let c=t.getBoundingClientRect(),u=Math.round(s.left-c.left);u>=0&&u<=40&&ce(t,"padding-left",u);let d=lp(e,r);if(d){let f=d.getBoundingClientRect(),h=n.getBoundingClientRect(),p=Math.round(f.left-h.right);p>=0&&p<=24&&ce(t,"gap",p)}}else{let s=Number.parseFloat(o.paddingLeft),l=Number.parseFloat(o.columnGap||o.gap);Number.isFinite(s)&&ce(t,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&ce(t,"gap",Math.round(l))}hc(t)}function Oa(t){return t.tagName==="NAV"||t.id==="stage-slideover-sidebar"||t.id==="stage-sidebar-tiny-bar"}function cp(){if(br?.isConnected&&Vt){Vt.observe(br,{childList:!0});return}Ba()}function up(t){if(Oa(t))return!1;try{if(t.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function dp(t,e){!e||!t||requestAnimationFrame(()=>{if(t.isConnected){mr=0;return}mr+=1,hr=Date.now()+Math.min(8e3,250*2**Math.min(mr,5))})}function mp(){hn||Date.now()<hr||(hn=requestAnimationFrame(()=>{hn=0,!(Date.now()<hr)&&(document.getElementById(Ht)?.isConnected||Ko())}))}function Ko(){if(!document.body)return;Vt?.disconnect();let t=null,e=!1;try{let n=document.getElementById(Ht);t=n instanceof HTMLButtonElement?n:ap();let r=He(),o=gn();if(r){let i=Ca(r),a=i.parentElement;if(Oa(i)||a&&Oa(a))return;t.isConnected&&t.nextElementSibling===i||(i.before(t),e=!0),fc(t),Tc(t,r)}else o?(t.parentElement!==o&&(o.appendChild(t),e=!0),fc(t,!0)):t.isConnected&&!No(t)&&(t.remove(),t=null)}finally{dp(t,e),cp(),$a()}}function Ba(){let t=Io();!t||!up(t)||br===t&&Vt||(Vt?.disconnect(),br=t,Vt=new MutationObserver(()=>{document.getElementById(Ht)?.isConnected||mp()}),Vt.observe(t,{childList:!0}))}function fp(){Ko(),Ba(),dr===void 0&&(dr=window.setInterval(()=>{let t=document.getElementById(Ht);if(!(t instanceof HTMLElement)||!t.isConnected)Date.now()>=hr&&Ko();else{mr=0;let e=He();e&&Tc(t,e)}Ba()},Cf))}function pp(){dr!==void 0&&(clearInterval(dr),dr=void 0),hn&&cancelAnimationFrame(hn),hn=0,hr=0,mr=0,Vt?.disconnect(),Vt=null,br=null}function gp(t){$o===t&&ue||(ue?.disconnect(),$o=t,ue=new MutationObserver(()=>{if(!t.isConnected){ue?.disconnect(),ue=null,$o=null;return}kc(t)}),ue.observe(t,{childList:!0}))}function kc(t){if(gp(t),t.querySelector(`#${Fo}`))return;let e=document.createElement("button");e.type="button",e.id=Fo,e.className="bloom-account-item",e.setAttribute("role","menuitem"),e.innerHTML=`${Yo()}<span>Bloom++</span>`,e.addEventListener("pointerdown",Ra),e.addEventListener("pointerup",Ra),e.addEventListener("click",n=>{Ra(n),Fa()}),t.insertBefore(e,t.firstChild)}function Do(){let t=bn();return t?(kc(t),!0):!1}function bp(t){Ro(t)&&(queueMicrotask(Do),requestAnimationFrame(()=>{Do()}),window.setTimeout(Do,60),window.setTimeout(Do,180))}function hp(){zo?.abort();let t=new AbortController;zo=t,document.addEventListener("click",bp,{signal:t.signal})}function yp(){zo?.abort(),zo=null,ue?.disconnect(),ue=null,$o=null}function Cc(){mn(),_f(()=>{vc(),yc(),Ko(),Fa()})}var Mc=y({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[v.p],required:!0,hidden:!0,enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`#${kf}`,`#${Ht}`,`#${Fo}`,`#${Ie}`,`#${Wo}`,`#${vr}`,`#${qo}`,"#bloom-menu-panel"],start(){vc(),yc(),fp(),hp(),Bo?.(),Bo=dc(Uo),Uo(),Na=[cn("pluginToggle",()=>{me&&Ne()}),cn("pluginPin",()=>{me&&Ne()}),cn("pluginStar",()=>{me&&Ne()})]},stop(){pp(),yp(),Bo?.(),Bo=null;for(let t of Na)t();Na=[],_a(),document.getElementById(Ht)?.remove(),document.getElementById(Fo)?.remove(),document.getElementById(qo)?.remove(),pc=null,Mf=null,fr=null,pr=null,jo=null,gc=null,gr=null,me=!1}});var Xo='form[data-type="unified-composer"], form.w-full[data-type]',Nt=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),vn=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Ac=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Hc=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),vp=/stop streaming|stop generating|停止生成|停止输出|停止响应/,xp='[contenteditable="false"], button, [role="button"]';function yt(t){if(!(t instanceof HTMLElement)||!t.isConnected||!t.getClientRects().length)return!1;let e=getComputedStyle(t);return e.visibility!=="hidden"&&e.display!=="none"}function Re(t,e,n=!1){let r=Array.from(t.querySelectorAll(e));for(let o of r)if(o instanceof HTMLElement&&!(n&&!yt(o)))return o;return null}function Nc(t){return`${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function B(t){let e=t.getAttribute("data-testid")||"";if(e==="stop-button"||e==="composer-stop-button"||/\bstop\b/i.test(e)&&!/\bsend\b/i.test(e))return!0;let n=Nc(t);return!!(vp.test(n)||/^stop$/i.test(n))}function vt(){let e=Array.from(document.querySelectorAll(Xo)).find(yt);if(e instanceof HTMLElement)return e;let n=Re(document,Nt),r=n?.closest("form")??n?.parentElement;return r instanceof HTMLElement?r:document.body}function X(){let t=Array.from(document.querySelectorAll(Nt));return t.find(yt)??t[0]??null}function Ep(t,e){if(!t||t===e||!e.contains(t))return!1;let n=t.closest(xp);return!!n&&n!==e&&e.contains(n)}function qa(t,e){let n=[];try{let r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o=r.nextNode();for(;o;){let i=o.parentElement;i&&Ep(i,e)||n.push(o.textContent??""),o=r.nextNode()}}catch{return t.innerText??t.textContent??""}return n.join("")}function xt(t){let e=t??X();return e?qa(e,e).replaceAll("\u200B","").trim().length>0:!1}function fe(t){return!xt(t)}function Zo(t){return t instanceof HTMLButtonElement&&t.disabled||t.hasAttribute("disabled")||t.getAttribute("aria-disabled")==="true"?!0:t.classList.contains("opacity-50")||t.classList.contains("cursor-not-allowed")}function Ic(t){let e=vt();if(!e||e===document.body)return null;for(let n of e.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!yt(n))&&t(n))return n;return null}function pe(){let t=vt(),e=Re(t,vn)??Re(document,vn);return e&&!B(e)?e:Ic(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!B(n);let o=Nc(n);return/^(send|send prompt|发送)$/i.test(o)&&!B(n)})}function Pe(){let t=vt(),e=Re(t,Ac,!0)??Re(document,Ac,!0);if(e)return e;let n=Re(t,Hc)??Re(document,Hc);if(n){for(let r of n.querySelectorAll("button"))if(r instanceof HTMLElement&&yt(r)&&B(r))return r}return Ic(B)}function st(t){let e=t.querySelectorAll("p");return e.length?Array.from(e,n=>qa(n,t)).join(`
`):qa(t,t)}function za(t,e=!1){let n=t.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=e?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),o.collapse(e),r.removeAllRanges(),r.addRange(o)}function Yt(t,e,n=!1){t.focus();let r=window.getSelection();if(!r)return;let o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o);try{e?document.execCommand("insertText",!1,e):document.execCommand("delete")}catch{t.textContent=e}t.dispatchEvent(new InputEvent("input",{bubbles:!0,data:e,inputType:e?"insertText":"deleteContent"})),za(t,n)}var Rc=/\/c\/([a-zA-Z0-9_-]{8,})/i;function Et(){let t=new URLSearchParams(location.search||""),e=t.get("conversationId")||t.get("conversation_id")||t.get("threadId")||t.get("thread_id")||t.get("chatId")||t.get("chat_id")||t.get("id")||"",n=location.pathname.split("/").filter(Boolean),r=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},o=r("c")||r("chat")||r("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",e,o||a].filter(Boolean).join("|")}function Xt(t){let e=`${location.origin}${location.pathname}`;return t?`${e}|${t}`:`${e}|draft`}function Zt(t){if(!t)return"";try{return(/^https?:/i.test(t)?new URL(t,location.origin).pathname:t).match(Rc)?.[1]??""}catch{return t.match(Rc)?.[1]??""}}function M(){return Zt(location.pathname)}var Dc=new S("Harvest"),wp=1500,Sp=200,Jo=new Set,Qo=new Map,ti=new Map,xn=null,ei=null,xr=null,It=0;function Lp(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Tp(t){try{if(typeof t=="string")return t;if(t instanceof URL)return t.href;if(typeof Request<"u"&&t instanceof Request)return t.url}catch{}return String(t)}function kp(t,e){let n=e?.method,r=typeof Request<"u"&&t instanceof Request?t.method:"";return(n||r||"GET").toUpperCase()}function $c(t){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(t)}var Cp=/"action"\s*:\s*"(next|continue|variant)"/i;function Mp(t,e,n){return!(e!=="POST"||$c(t)||!/\/backend-api\/(?:f\/)?conversation\/?(?:[?#]|$)/i.test(t)||typeof n=="string"&&/"action"\s*:/.test(n)&&!Cp.test(n))}function Ap(t,e){return e!=="GET"||$c(t)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(t)}function Pc(t){return t.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function _c(t){return t?t.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function Hp(t){return typeof t=="string"?_c(t):""}function ja(t){if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t>1e12?t:Math.round(t*1e3);if(typeof t=="string"){let e=t.trim();if(!e)return null;if(/^\d+(\.\d+)?$/.test(e))return ja(Number(e));let n=Date.parse(e);return Number.isFinite(n)?n:null}return null}function Fc(t,e){if(t.size<=e)return;let n=t.size-e,r=0;for(let o of t.keys())if(t.delete(o),++r>=n)break}function Oc(t,e,n){!t||!e||ti.get(t)!==e&&(ti.set(t,e),Fc(ti,wp),ge({type:"message-time",messageId:t,createTime:e,conversationId:n}))}function Np(t,e){let n=e.trim();!t||!n||Qo.get(t)!==n&&(Qo.set(t,n),Fc(Qo,Sp),ge({type:"conversation-meta",conversationId:t,title:n}))}function Er(t,e,n=0){if(n>6||!t||typeof t!="object")return;if(Array.isArray(t)){for(let l of t)Er(l,e,n+1);return}let r=t,o=typeof r.conversation_id=="string"&&r.conversation_id||typeof r.conversationId=="string"&&r.conversationId||e;typeof r.title=="string"&&o&&!r.author&&!r.content&&!r.role&&Np(o,r.title);let i=r.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let l=i,c=typeof l.id=="string"?l.id:"",u=ja(l.create_time??l.createTime??l.created_at);c&&u&&Oc(c,u,o)}let a=typeof r.id=="string"?r.id:"",s=ja(r.create_time??r.createTime??r.created_at);if(a&&s&&(r.author||r.content||r.role||r.create_time||r.createTime)&&Oc(a,s,o),r.mapping&&typeof r.mapping=="object")Er(r.mapping,o,n+1);else if(n<3)for(let l of Object.values(r))l&&typeof l=="object"&&Er(l,o,n+1)}function Bc(t,e){if(t)try{Er(JSON.parse(t),e)}catch{}}function ge(t){for(let e of Array.from(Jo))try{e(t)}catch{}}async function Ip(t,e,n){if(n===It)try{let r=await t.json();if(n!==It)return;Er(r,e)}catch{}}async function Rp(t,e,n,r){let o=e,i=n,a=t.body;if(!a){r===It&&ge({type:"post-end",conversationId:o,error:i});return}let s=a.getReader(),l=new TextDecoder,c="";try{for(;r===It;){let{done:u,value:d}=await s.read();if(u)break;if(c+=l.decode(d,{stream:!0}),!o){let h=_c(c);h&&(o=h,ge({type:"post-start",conversationId:o,url:""}))}let f=c.split(`
`);c=f.pop()??"";for(let h of f){let p=h.replace(/^data:\s*/,"").trim();!p||p==="[DONE]"||Bc(p,o)}/\[DONE\]/.test(c)||/"error"\s*:\s*\{/.test(c)?(/"error"\s*:\s*\{/.test(c)&&(i=!0),c=c.slice(-64)):c.length>16384&&(c=c.slice(-4096))}c&&r===It&&Bc(c.replace(/^data:\s*/,""),o)}catch{i=!0}finally{try{s.cancel()}catch{}}r===It&&ge({type:"post-end",conversationId:o,error:i})}function Pp(t,e,n){let r=Tp(e),o=kp(e,n),i=Ap(r,o),a=Mp(r,o,n?.body),s=It,l="";return a&&(l=Hp(n?.body)||Pc(r)||Zt(r)||M(),ge({type:"post-start",conversationId:l,url:r})),t(e,n).then(c=>{if(s!==It||!i&&!a)return c;try{let u=c.clone();i?Ip(u,Pc(r)||M(),s):Rp(u,l,!c.ok,s)}catch{a&&ge({type:"post-end",conversationId:l,error:!c.ok})}return c},c=>{throw a&&s===It&&ge({type:"post-end",conversationId:l,error:!0}),c})}function Op(){if(xn)return;let t=Lp();xr=t,xn=t.fetch.bind(t);let e=(n,r)=>Pp(xn,n,r);ei=e,t.fetch=e,Dc.debug("conversation fetch harvest hooked")}function Bp(){It+=1,!(!xn||!xr)&&(ei&&xr.fetch===ei&&(xr.fetch=xn),xn=null,ei=null,xr=null,Dc.debug("conversation fetch harvest unhooked"))}function lt(t){return Jo.add(t),Op(),()=>{Jo.delete(t),Jo.size===0&&Bp()}}function En(t){return t?Qo.get(t)??"":""}function ni(t){return t?ti.get(t)??null:null}var zc=new S("Streaming");function kr(){let t=document.querySelector('div[slot="trailing"]');if(!t)return null;for(let e of t.querySelectorAll("button"))if(!(!(e instanceof HTMLElement)||!yt(e))&&(B(e)||/\bStop\b|停止/.test(e.textContent||"")))return e;return null}function Dp(){let t=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(t&&yt(t))}function $p(){let t=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(t&&yt(t))}function _p(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Pt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function Q(){if(Pe()||kr()||_p())return!0;let t=pe();return t&&yt(t)&&!B(t)?!1:!!(Dp()||$p())}var Fp=400,qc=3,$e=new Set,wr,Sr=null,Ga=null,Be=!1,Oe=0,he="",ye="",ve=!1,Lr=!1,Tr=!1,Rt=!1,q=null,ct="",De=!1;function Z(){return Rt}function jc(){return ve}function ii(){return ct}function Ua(){return M()||ct}function Gc(){return Xt(Et())}function ri(t,e){return{streaming:t,contextKey:e,conversationId:Ua()}}function Ka(t){try{let e=t.split("|")[0]||"";return new URL(e).pathname.replace(/\/$/,"")||"/"}catch{return""}}function qp(t){return!t||t==="/"||t.startsWith("/g/")}function $(t,e){if(!t||t===e)return!1;let n=Zt(Ka(e)||e);return!n||!(t.endsWith("|draft")||qp(Ka(t)))?!1:ct?n===ct:De}function oi(){Be=!1,Oe=0,he="",ve=!1,Lr=!1,Tr=!1,ct="",De=!1}function zp(t){for(let e of Array.from($e))try{e.onFall?.(t)}catch{}}function jp(t){for(let e of Array.from($e))try{e.onRise?.(t)}catch{}}function be(t){for(let e of Array.from($e))try{e.onTick?.(t)}catch{}}function Gp(t,e){for(let n of Array.from($e))try{n.onContext?.(t,e)}catch{}}function Up(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest("button");n instanceof HTMLElement&&B(n)&&(ve=!0)}function Kp(t){if(t.type==="post-start"){let n=M();if(!t.conversationId){n||(De=!0),(!n||n===ct)&&(Rt=!1,ve=!1);return}if(!(t.conversationId===n||t.conversationId===ct)&&!(!n&&De))return;ct=t.conversationId,De=!1,Rt=!1,ve=!1;return}if(t.type!=="post-end"||!Be&&!q)return;let e=M();t.conversationId&&!(e?t.conversationId===e:t.conversationId===ct)||(Tr=!0,t.error&&(Lr=!0,q&&(q.error=!0)))}function Wp(){let t=Gc(),e=Q();if(ye&&t&&ye!==t){let o=ye;if(!$(o,t))q=null,oi(),Rt=e;else{let i=Zt(Ka(t));if(i&&!ct&&(ct=i,De=!1),he===o&&(he=t),q&&q.contextKey===o){q.contextKey=t;let a=Ua();a&&(q.conversationId=a)}Rt=!1}if(ye=t,Gp(t,o),Rt){be(ri(!1,t));return}}else t&&(ye=t);if(Rt){if(e){be(ri(!1,t));return}Rt=!1}if(q)if(e||q.contextKey!==t)q=null;else{let o=q;q=null,oi(),zp(o),be(ri(!1,t));return}let n=ri(e,t);if(e){let o=!Be;o&&(ve=!1,Lr=!1,Tr=!1),Be=!0,Oe=0,he=t,o&&jp(n),be(n);return}if(!Be){be(n);return}if(Oe+=1,Tr&&(Oe=Math.max(Oe,qc)),Oe<qc){be(n);return}if(!(!!he&&he===t)){oi(),be(n);return}q={contextKey:he||t,conversationId:Ua(),userStopped:ve,error:Lr||Pt()},be(n)}function Vp(){wr===void 0&&(Be=Q(),ye=Gc(),he=Be?ye:"",Oe=0,ve=!1,Lr=!1,Tr=!1,Rt=!1,q=null,ct="",De=!1,Sr?.abort(),Sr=new AbortController,document.addEventListener("click",Up,{capture:!0,signal:Sr.signal}),Ga=lt(Kp),wr=setInterval(Wp,Fp),zc.debug("watchStreamingEdge started"))}function Yp(){$e.size||(wr!==void 0&&(clearInterval(wr),wr=void 0),Sr?.abort(),Sr=null,Ga?.(),Ga=null,oi(),ye="",Rt=!1,q=null,zc.debug("watchStreamingEdge stopped"))}function tt(t){let e=typeof t=="function"?{onFall:t}:t;return $e.add(e),Vp(),()=>{$e.delete(e),Yp()}}var Uc="bloom-host-icon",Cr="data-bloom-host-rel",Wa="not all",Va=0,Kc=0,Xp=400;function Wc(t){Va+=1;try{t()}finally{Va-=1}}function ai(t){if(!(t instanceof HTMLLinkElement))return!1;if(t.relList.contains("icon"))return!0;let e=t.rel;return e?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(e):!1}function xe(t){return!!t&&!t.startsWith("data:")&&!t.startsWith("blob:")&&t!=="undefined"}function Vc(t){let e=document.getElementById(t);return e instanceof HTMLLinkElement?e:null}function Zp(t){return t.startsWith("data:image/png")||t.endsWith(".png")?{type:"image/png",sizes:"32x32"}:t.startsWith("data:image/svg")||t.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Jp(t,e){if(t.lastElementChild===e)return;let n=Date.now();n-Kc<Xp||(Kc=n,t.appendChild(e))}function Qp(t,e){for(let n of t.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===e||ai(n)&&(n.getAttribute(Cr)||n.setAttribute(Cr,n.rel),n.media!==Wa&&(n.media=Wa),n.rel!==Uc&&(n.rel=Uc))}function tg(t){for(let e of t.querySelectorAll(`link[${Cr}]`)){if(!(e instanceof HTMLLinkElement))continue;let n=e.getAttribute(Cr);n&&(e.rel=n),e.removeAttribute(Cr),e.media===Wa&&e.removeAttribute("media")}}function Yc(t,e){let{head:n}=document;!n||!e||Wc(()=>{Qp(n,t);let r=Vc(t),{type:o,sizes:i}=Zp(e);r?Jp(n,r):(r=document.createElement("link"),r.id=t,r.rel="icon",n.appendChild(r)),r.rel!=="icon"&&(r.rel="icon"),r.type!==o&&(r.type=o),r.getAttribute("sizes")!==i&&r.setAttribute("sizes",i),r.getAttribute("href")!==e&&r.setAttribute("href",e)})}function Xc(t,e){let{head:n}=document;n&&Wc(()=>{Vc(t)?.remove(),tg(n)})}function Zc(t,e){let{head:n}=document;if(!n)return null;let r=0,o=new MutationObserver(i=>{if(Va)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===t?a=!0:ai(c.target)&&(a=!0,xe(c.target.href)&&(s=c.target.href)));for(let u of c.removedNodes)ai(u)&&u.id===t&&(a=!0);for(let u of c.addedNodes)ai(u)&&u.id!==t&&(a=!0,xe(u.href)&&(s=u.href))}if(!a)return;let l=()=>{r=0,e(s)};if(document.hidden){r&&(cancelAnimationFrame(r),r=0),l();return}r||(r=requestAnimationFrame(l))});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}var eg=["original","badge","dot","hole","bg"],tu=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],eu={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},si="#FCFCFC",ng="#111111",Jc="#111111",rg="#ffffff",og="#212121",ig="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",ag={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},li=32,Qc=64;function nu(t){return typeof t=="string"&&eg.includes(t)}function sg(t){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${t}</text></svg>`)}`}function ci(t){let e=document.createElement("canvas");e.width=li,e.height=li;let n=e.getContext("2d");return n?(n.scale(li/Qc,li/Qc),t(n),e.toDataURL("image/png")):""}function lg(t,e,n,r,o,i){t.beginPath(),t.moveTo(e+i,n),t.arcTo(e+r,n,e+r,n+o,i),t.arcTo(e+r,n+o,e,n+o,i),t.arcTo(e,n+o,e,n,i),t.arcTo(e,n,e+r,n,i),t.closePath()}function ui(t,e,n=!0){t.save(),t.translate(8,8),t.scale(2,2);let r=new Path2D(ig);n&&(t.strokeStyle=ng,t.lineWidth=1.35,t.lineJoin="round",t.lineCap="round",t.stroke(r)),t.fillStyle=e,t.fill(r,"evenodd"),t.restore()}function cg(t,e,n){let r=eu[e];if(n==="dot"){t.beginPath(),t.arc(52.2,52.2,10.4,0,Math.PI*2),t.fillStyle=Jc,t.fill(),t.beginPath(),t.arc(52.2,52.2,7.7,0,Math.PI*2),t.fillStyle=r,t.fill();return}if(t.beginPath(),t.arc(51.5,51.5,12.15,0,Math.PI*2),t.fillStyle=Jc,t.fill(),t.beginPath(),t.arc(51.5,51.5,9.55,0,Math.PI*2),t.fillStyle=r,t.fill(),t.strokeStyle=rg,t.lineWidth=2.2,t.lineCap="round",t.lineJoin="round",e==="rotate"){t.beginPath(),t.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),t.stroke();return}if(e==="done"){t.beginPath(),t.moveTo(46.6,51.7),t.lineTo(50.1,55.3),t.lineTo(56.8,47.4),t.stroke();return}if(e==="ready"){t.beginPath(),t.moveTo(51.5,56.4),t.lineTo(51.5,46.8),t.moveTo(46.6,51.2),t.lineTo(51.5,46.2),t.lineTo(56.4,51.2),t.stroke();return}t.beginPath(),t.moveTo(47.2,47.2),t.lineTo(55.8,55.8),t.moveTo(55.8,47.2),t.lineTo(47.2,55.8),t.stroke()}function Mr(t,e){if(t==="original")return e==="wait"?ci(r=>ui(r,si)):sg(ag[e]);let n=e==="wait"?void 0:eu[e];return ci(t==="hole"?r=>ui(r,n??si):t==="bg"?r=>{r.fillStyle=n??og,lg(r,0,0,64,64,14),r.fill(),ui(r,si,!1)}:r=>{ui(r,si),e!=="wait"&&cg(r,e,t==="dot"?"dot":"badge")})}function ru(t){return{wait:Mr(t,"wait"),rotate:Mr(t,"rotate"),done:Mr(t,"done"),ready:Mr(t,"ready"),error:Mr(t,"error")}}var ug=new S("ChatStateFavicons"),Fe="bloom-chat-state-favicon",lu=["input","beforeinput","cut","paste","compositionend"],cu=L({style:{type:3,description:"Favicon overlay",options:tu}}),Ot="",Za={wait:"",rotate:"",done:"",ready:"",error:""},Ar="wait",et=!1,z=!1,I=null,rt="",ut="",ze=!0,fi=!1,wn=null,dt=0,di=null,mi=null,_e=null,Xa=null,Sn=null,wt=!1,ou=new WeakSet;function dg(){let t=cu.store.style;return nu(t)?t:"bg"}function uu(){let e=document.querySelector(`link[rel~="icon"]:not(#${Fe}), link[data-bloom-host-rel]:not(#${Fe})`)?.href;return xe(e)?e:xe(Ot)?Ot:""}function mg(){let t=document.getElementById(Fe);return t instanceof HTMLLinkElement?t:null}function fg(){if(!xe(Ot)){let t=uu();t&&(Ot=t)}return xe(Ot)?Ot:Za.wait}function du(t){return t==="wait"?fg():Za[t]}function mu(){Yc(Fe,du(Ar))}function O(t){let e=du(t);if(Ar===t){let n=mg();if(n&&n.getAttribute("href")===e)return}Ar=t,mu()}function iu(){Za=ru(dg()),O(Ar)}function Ja(){return Xt(Et())}function Qa(t,e){!t||!e||t===e||(I===t&&(I=e),rt===t&&(rt=e),ut===t&&(ut=e))}function pg(){let t=Ja();if(!(Q()||et||z))return rt="",t;if(rt&&t&&rt!==t)if($(rt,t))Qa(rt,t),rt=t;else return rt="",t;else!rt&&t&&(rt=t);return rt||t}function au(t){return!I||!t?!1:I===t?!0:$(I,t)}function fu(){et=!1,z=!1,I=null,rt=""}function pu(t){ut=t,fu(),ze=!1,fi=!0,O("wait")}function Ya(t){return!t&&ze}function gg(){if(!wt)return;let t=Ja();if(ut&&t&&ut!==t&&!$(ut,t)){pu(t);return}ut&&t&&$(ut,t)&&Qa(ut,t),t&&(ut=t);let e=Q(),n=e&&!Z();if(fi){if(Z()){O("wait");return}fi=!1}if(Z()){O("wait");return}let r=pg(),o=fe();if(jc()&&!e){et=!1,z=!1,I=null,O(o?"wait":Ya(o)?"ready":"wait");return}if(Pt()&&!e&&et){O("error"),et=!1,z=!1,I=null;return}if(n){et||(ze=!1),et=!0,z=!1,I=r,O("rotate");return}if(et)if(!au(t))et=!1,z=!1,I=null;else if(z){et=!1,z=!0,I=t||r,O("done");return}else{O("rotate");return}if(z)if(I&&t&&!au(t))z=!1,I=null;else if(o){I=r||I,O("done");return}else if(Ya(o)){z=!1,O("ready");return}else{z=!1,O("wait");return}I=null,o?O("wait"):Ya(o)?O("ready"):O("wait")}function qe(){wt&&(vu(),bu(),hu(),gg())}function gu(){if(Sn){for(let t of lu)Sn.removeEventListener(t,yu,!0);Sn=null}}function bu(){let t=vt(),e=t&&t!==document.body?t:null;if(!(Sn===e&&e?.isConnected)&&(gu(),!!e)){Sn=e;for(let n of lu)Sn.addEventListener(n,yu,{capture:!0,passive:!0})}}function hu(){let t=vt();if(!(_e&&Xa===t&&t.isConnected)){if(_e?.disconnect(),Xa=t,!t||t===document.body){_e=null;return}_e=new MutationObserver(()=>pi()),_e.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function pi(){if(wt){if(document.hidden){dt&&(cancelAnimationFrame(dt),dt=0),qe();return}dt||(dt=requestAnimationFrame(()=>{dt=0,wt&&qe()}))}}function yu(){xt()&&(ze=!0),pi()}function su(){xt()&&(ze=!0),pi()}function bg(){wt&&(dt&&(cancelAnimationFrame(dt),dt=0),qe())}function hg(){wt&&(ze=!1,qe())}function yg(t){if(!wt)return;if(t.userStopped){et=!1,z=!1,I=null,O("wait");return}if(t.error){et=!1,z=!1,I=null,O("error");return}let e=Ja();if(t.contextKey&&e&&t.contextKey!==e&&!$(t.contextKey,e)){et=!1,z=!1,I=null,O("wait");return}et=!1,z=!0,I=e||t.contextKey,O("done")}function vg(){wt&&qe()}function xg(t,e){if(wt){if($(e,t)){Qa(e,t),ut=t,qe();return}pu(t)}}function vu(){let t=X();!t||ou.has(t)||(ou.add(t),t.addEventListener("input",su,{capture:!0,passive:!0}),t.addEventListener("compositionend",su,{capture:!0,passive:!0}))}var xu=y({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon. Idle keeps the official ChatGPT icon.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:cu,startAt:"DOMContentLoaded",cleanupSelectors:[`#${Fe}`],start(){wt=!0,Ot=uu()||Ot,iu(),mi?.disconnect(),mi=Zc(Fe,t=>{xe(t)&&(Ot=t),mu()}),wn?.abort(),wn=new AbortController,window.addEventListener("popstate",pi,{signal:wn.signal}),document.addEventListener("visibilitychange",bg,{signal:wn.signal}),vu(),bu(),hu(),di?.(),di=tt({onRise:hg,onFall:yg,onTick:vg,onContext:xg}),qe(),ug.debug("favicon watch started")},stop(){wt=!1,dt&&cancelAnimationFrame(dt),dt=0,di?.(),di=null,wn?.abort(),wn=null,gu(),_e?.disconnect(),_e=null,Xa=null,mi?.disconnect(),mi=null,fu(),ut="",ze=!0,fi=!1,Ar="wait",Xc(Fe,Ot)},onSettingsChange:iu});var Eu=`.bloom-ih-hud {
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
`;var Lx=new S("InputHistory"),ts=/\u200B/g,wu=10,Su=500,Lu=100,wg=8,Sg=120,Lg=2e3,gi=10,bi=L({maxEntries:{type:4,description:"Max stored prompts",min:wu,max:Su,default:Lu},history:{type:5,description:"Stored prompts",render:_g},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),es=new Map,j=0,ns="",Bt=!1,Nr=!1,is=0,Hr=null,rs,as=null,Tu=!0;function St(){let t=bi.plain.entries;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function ku(t){let e=Y(Number(bi.store.maxEntries??Lu),wu,Su);return t.length>e?t.slice(t.length-e):t}function hi(t){bi.store.entries=ku(t)}function Tg(t){return t.replaceAll(ts,"").replace(/\n$/,"").trim()}function os(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Nt);return n instanceof HTMLElement?n:X()}function kg(t){let e=window.getSelection();if(!e||e.rangeCount===0)return{first:!0,last:!0};if(!st(t))return{first:!0,last:!0};try{let r=e.getRangeAt(0),o=document.createRange();o.selectNodeContents(t),o.setEnd(r.startContainer,r.startOffset);let i=document.createRange();return i.selectNodeContents(t),i.setStart(r.endContainer,r.endOffset),{first:o.toString().replaceAll(ts,"").trim().length===0,last:i.toString().replaceAll(ts,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Cu(t){clearTimeout(rs),rs=setTimeout(()=>{if(t!==is)return;Nr=!1;let e=as;e&&za(e,Tu)},Sg)}function Mu(t,e,n){Nr=!0,as=t,Tu=n;let r=++is;Yt(t,e,n),Cu(r)}function Cg(){let t=document.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",document.body.appendChild(t)),t}function Ln(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Mg(){document.querySelector(".bloom-ih-hud")?.remove()}function Ag(t,e){let n=Cg();n.textContent=t;let r=(e.closest("form")??vt()).getBoundingClientRect();n.style.left=`${r.left+r.width/2}px`,n.style.top=`${Math.max(8,r.top-wg)}px`,n.classList.add("bloom-ih-hud-on")}function ss(t){let e=Tg(t);if(!e)return;let n=Date.now(),r=es.get(e);if(r&&n-r<Lg)return;es.set(e,n);let o=St().filter(i=>i!==e);o.push(e),hi(o),j=St().length,Bt=!1,Ln()}function Hg(t,e){let n=St();if(!n.length&&t)return;j>=n.length&&(ns=st(e),j=n.length);let r=t?j-1:j+1;r<0||r>n.length||(j=r,Bt=!0,Mu(e,r===n.length?ns:n[r],t),r<n.length?Ag(`${r+1} / ${n.length}`,e):Ln())}function Ng(t){Bt=!1,Ln(),Mu(t,ns,!1),j=St().length}function Ig(t){if(t.isComposing||t.keyCode===229||t.ctrlKey||t.metaKey)return;let e=os(t.target)??os(document.activeElement);if(!e||t.target instanceof Node&&!e.contains(t.target)&&t.target!==e&&(t.key!=="ArrowUp"&&t.key!=="ArrowDown"&&t.key!=="Enter"&&t.key!=="Escape"||document.activeElement!==e&&!e.contains(document.activeElement)))return;if(t.key==="Escape"&&Bt&&!t.altKey&&!t.shiftKey){Ng(e),t.preventDefault(),t.stopImmediatePropagation();return}if(t.key==="Enter"&&!t.shiftKey&&!t.altKey){ss(st(e));return}if(t.key!=="ArrowUp"&&t.key!=="ArrowDown"||t.shiftKey)return;let n=t.key==="ArrowUp",r=t.altKey,o=St();if(!r){let i=kg(e);if(n&&!i.first||!n&&!i.last)return}n&&(!o.length||j<=0)||!n&&j>=o.length||(t.preventDefault(),t.stopImmediatePropagation(),Hg(n,e))}function Rg(t){if(os(t.target)){if(Nr){Cu(is);return}Bt&&(Bt=!1,Ln(),j=St().length)}}function Pg(t){let e=t.target;if(!(e instanceof HTMLFormElement))return;let n=e.querySelector(Nt);n instanceof HTMLElement&&ss(st(n))}function Og(t){let e=t.target;if(!(e instanceof Element))return;let n=e.closest(vn);if(!n||!(n instanceof HTMLElement)||B(n))return;let r=X();r&&ss(st(r))}function Bg(t){if(!(!Bt||Nr)){if(t.target instanceof Node){let e=t.target.getRootNode();if(e instanceof ShadowRoot&&e.host.id==="bloom-root")return}Bt=!1,Ln()}}function Dg(){if(Hr)return;Hr=new AbortController;let{signal:t}=Hr,e={capture:!0,signal:t};window.addEventListener("keydown",Ig,e),window.addEventListener("input",Rg,e),window.addEventListener("submit",Pg,e),window.addEventListener("click",Og,e),window.addEventListener("pointerdown",Bg,e)}function $g(t){let e=St().slice();e.splice(t,1),hi(e),j>e.length&&(j=e.length)}function _g(t){t.className="bloom-ih-panel";let e="",n=0,r=-1,o=()=>{let i=St().slice().reverse(),a=e.trim().toLowerCase(),s=a?i.filter(m=>m.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/gi));n>=l&&(n=l-1);let c=s.slice(n*gi,n*gi+gi);t.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=e,u.addEventListener("input",()=>{e=u.value,n=0,o()}),t.appendChild(u),c.length){let m=document.createElement("div");m.className="bloom-ih-list",c.forEach((T,A)=>{let N=i.indexOf(T),Ut=St().length-1-N,Mt=document.createElement("div");Mt.className="bloom-ih-item";let nt=document.createElement("button");nt.type="button",nt.className=`bloom-ih-body${r===A?"":" bloom-ih-clamp"}`,nt.textContent=T,nt.addEventListener("click",()=>{r=r===A?-1:A,o()});let R=document.createElement("div");R.className="bloom-ih-actions";let it=document.createElement("button");it.type="button",it.title="Copy",it.textContent="C",it.addEventListener("click",()=>{_l(T)});let Kt=document.createElement("button");Kt.type="button",Kt.title="Delete",Kt.textContent="\xD7",Kt.addEventListener("click",()=>{$g(Ut),o()}),R.append(it,Kt),Mt.append(nt,R),m.appendChild(Mt)}),t.appendChild(m)}else{let m=document.createElement("p");m.className="bloom-ih-empty",m.textContent=s.length?"No matches.":"No stored prompts yet.",t.appendChild(m)}let d=document.createElement("div");d.className="bloom-ih-pager";let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Prev",f.disabled=n<=0,f.addEventListener("click",()=>{n-=1,o()});let h=document.createElement("span");h.textContent=`${n+1} / ${l}`;let p=document.createElement("button");p.type="button",p.className="bloom-ih-btn",p.textContent="Next",p.disabled=n+1>=l,p.addEventListener("click",()=>{n+=1,o()});let b=document.createElement("button");b.type="button",b.className="bloom-ih-clear",b.textContent="Clear all",b.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(hi([]),j=0,o())}),d.append(f,h,p,b),t.appendChild(d)};return o(),()=>{t.replaceChildren()}}var Au=y({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:bi,startAt:"HostReady",managedStyle:"inputHistory",start(){w("inputHistory",Eu),j=St().length,Bt=!1,Dg()},stop(){Hr?.abort(),Hr=null,Ln(),Mg(),es.clear(),clearTimeout(rs),Nr=!1,as=null,Bt=!1},onSettingsChange(){let t=St(),e=ku(t);e.length!==t.length&&hi(e),j>e.length&&(j=e.length)}});var ls="noShareLink",Fg=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],qg=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],cs=L({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Hu(t){return`${t.join(",")}{display:none!important}`}function Nu(){let t=[];if(cs.store.hideShareChat!==!1&&t.push(Hu(Fg)),cs.store.hideShareProject!==!1&&t.push(Hu(qg)),!t.length){E(ls);return}w(ls,t.join(`
`))}var Iu=y({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"Init",settings:cs,start:Nu,onSettingsChange:Nu,stop(){E(ls)}});var Ou="noDictation",zg=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],jg=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Bu=L({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Ru(t){return`${t.join(",")}{display:none!important}`}function Pu(){let t=[Ru(zg)];Bu.store.hideDictationSettings!==!1&&t.push(Ru(jg)),w(Ou,t.join(`
`))}var Du=y({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"Init",settings:Bu,start:Pu,onSettingsChange:Pu,stop(){E(Ou)}});var us="noSidebarIdentity",Tn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Fu=Tn.flatMap(t=>[`${t} .min-w-0 > .truncate`,`${t} .min-w-0.flex-1 .truncate`]),qu=Tn.flatMap(t=>[`${t} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),Gg=[...Fu,...qu],Ug=[...Fu,...Tn.flatMap(t=>[`${t} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${t} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],Kg=Tn.map(t=>`${t} a[href^="mailto:"]`),Wg=Tn.flatMap(t=>[`${t} .min-w-0 > :not(.truncate)`,`${t} .min-w-0 > :not(.truncate) *`,`${t} .min-w-0 .text-xs`,`${t} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${t} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${t} .text-xs:not(.truncate)`,`${t} .text-token-text-secondary:not(.truncate)`,`${t} .text-token-text-tertiary:not(.truncate)`,`${t} .min-w-0 ~ *`,`${t} .min-w-0 ~ * *`,`${t} > .text-xs`,`${t} > .text-token-text-secondary`,`${t} > .text-token-text-tertiary`]),Vg=Tn.flatMap(t=>[`${t} .min-w-0.flex-col > :not(.truncate)`,`${t} .min-w-0.flex-col > .text-xs`,`${t} .min-w-0.flex-col > .text-token-text-secondary`,`${t} .min-w-0.flex-col > .text-token-text-tertiary`,`${t} .min-w-0:not(.flex) > :not(.truncate)`,`${t} .min-w-0:not(.flex) > .text-xs`,`${t} .min-w-0:not(.flex) > .text-token-text-secondary`,`${t} .min-w-0:not(.flex) > .text-token-text-tertiary`]),Ir=L({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function $u(t){return`${t.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Yg(t){return`${t.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function Xg(){return`${Vg.join(",")}{margin-block:auto!important}`}function Zg(){return`${Wg.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function _u(){let t=Ir.store.hideUsername!==!1,e=Ir.store.hideEmail!==!1,n=t&&Ir.store.enlargePlan!==!1,r=t&&Ir.store.alignPlanWithAvatar===!0,o=[];if(t&&(r?(o.push(Yg([...Ug,...qu])),o.push(Xg())):o.push($u(Gg))),e&&o.push($u(Kg)),n&&o.push(Zg()),!o.length){E(us);return}w(us,o.join(`
`))}var zu=y({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[v.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Ir,start:_u,onSettingsChange:_u,stop(){E(us)}});var ju=`#bloom-rt-host {
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
`;var Ku=new S("RecentTopics"),Mn="bloom-rt-host",Wu="home",Vu=/^\/c\/([a-z0-9_-]{8,})/i,Qg=/\/c\/([a-z0-9_-]{8,})/i,Yu=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,tb=new Set(["Backquote","IntlBackslash"]),eb=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),nb=140,rb=[3,4,5,6,7,8,9,10,11,12].map(t=>({label:String(t),value:String(t),default:t===5})),G=L({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:rb},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),yi=null,vi=null,ot=!1,$r=!1,Rr=!1,Dt=0,je="",kn=null,Pr=null,Cn,ds=null,ms=null;function ob(){let t=Number(G.store.maxRecent??5);return Number.isFinite(t)&&t>=3&&t<=12?t:5}function Or(){let t=G.plain.visits;return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function ps(){let t=G.plain.titles;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Xu(){let t=G.plain.previews;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function gs(){let t=G.plain.projects;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function Ei(t){let e=ob();return t.length>e?t.slice(0,e):t}function $t(t){return t===Wu}function Br(t,e=nb){let n=t.replace(/\s+/g," ").trim();return n.length<=e?n:`${n.slice(0,e-1)}\u2026`}function bs(t){if(!t)return"";try{return new URL(t,location.origin).pathname.match(Vu)?.[1]??""}catch{return t.match(Qg)?.[1]??""}}function Ge(){let t=(location.pathname||"/").match(Vu);if(t?.[1])return t[1];let n=Et().split("|").filter(Boolean);for(let r=n.length-1;r>=0;r--){let o=n[r];if(/^[a-z0-9_-]{8,}$/i.test(o))return o}return Wu}function hs(t){if($t(t))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${t}"]`);for(let r of n){if(bs(r.getAttribute("href")||"")!==t)continue;let o=Br(r.textContent||"",80);if(o)return o}}catch{}let e=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return Ge()===t&&e&&!/^ChatGPT$/i.test(e)?Br(e,80):""}function ib(t){if($t(t))return"New chat";let e=ps()[t];if(e)return e;let n=En(t);return n||hs(t)||"Chat"}function ab(t){return gs()[t]||""}function sb(t){return Xu()[t]||{}}function ys(t,e){if(!t||$t(t)||!e||/^new chat$/i.test(e.trim()))return;let n=ps();n[t]!==e&&(n[t]=e,G.store.titles=n)}function lb(t){t.type==="conversation-meta"&&(ys(t.conversationId,t.title),ot&&An())}function cb(t,e){if(!t||$t(t)||!e)return;let n=gs();n[t]!==e&&(n[t]=e,G.store.projects=n)}function ub(t,e){if(!t||$t(t)||!e.user&&!e.assistant)return;let n=Xu(),r=n[t]||{},o={user:e.user||r.user,assistant:e.assistant||r.assistant};r.user===o.user&&r.assistant===o.assistant||(n[t]=o,G.store.previews=n)}function vs(t){if(!t||$t(t)&&G.store.includeHome===!1)return;let e=Or().filter(n=>n!==t);e.unshift(t),G.store.visits=Ei(e)}function wi(){let t=G.store.includeHome!==!1;return Ei(Or().filter(n=>t||!$t(n))).map(n=>({id:n,title:ib(n),project:ab(n),preview:sb(n)}))}function Gu(t){try{let e=document.querySelectorAll(`[data-message-author-role="${t}"]`),n=e[e.length-1];if(!(n instanceof HTMLElement))return"";let r=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||r.push(a)}let o=r.length?r.join(" "):n.textContent||"";return Br(o)}catch{return""}}function Dr(t){if(!t||$t(t)||t!==Ge())return;let e=hs(t);e&&ys(t,e);let n=Gu("user"),r=Gu("assistant");ub(t,{user:n,assistant:r});let o=Ju(t);if(o){let i=Zu(o);i&&cb(t,i)}}function xs(){let t=ps(),e=gs(),n=[],r=new Set,o=!1,i=!1;try{for(let c of document.querySelectorAll('a[href*="/c/"]')){if(c.closest(`#${Mn}, #bloom-root, #bloom-sidebar-panel`))continue;let u=bs(c.getAttribute("href")||"");if(!u||r.has(u))continue;r.add(u),n.push(u);let d=Br(c.textContent||"",80);d&&!Yu.test(d)&&t[u]!==d&&(t[u]=d,o=!0);let f=Zu(c);f&&e[u]!==f&&(e[u]=f,i=!0)}}catch{}o&&(G.store.titles=t),i&&(G.store.projects=e);let a=Or(),s=new Set(a),l=n.filter(c=>!s.has(c));l.length&&(G.store.visits=Ei([...a,...l]))}function Zu(t){let e=t.parentElement;for(let n=0;n<10&&e;n++){if(e.id==="bloom-rt-host"||e.id==="bloom-root"){e=e.parentElement;continue}let r=e.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),o=Br((r instanceof HTMLElement?r.textContent:"")||"",60);if(o&&!Yu.test(o)&&!/^20\d{2}/.test(o)&&o!==t.textContent?.trim()&&e.querySelector('a[href^="/c/"]'))return o;e=e.parentElement}return""}function Ju(t){if($t(t)){let e=document.querySelector('[data-testid="create-new-chat-button"]');return e instanceof HTMLAnchorElement?e:document.querySelector('a[href="/"]')}try{for(let e of document.querySelectorAll(`a[href*="/c/${t}"]`))if(bs(e.getAttribute("href")||"")===t)return e}catch{}return null}function db(t){let e=Ju(t);if(e){e.click();return}if($t(t)){location.assign("/");return}location.assign(`/c/${t}`)}function mb(){let t=Ge();je&&je!==t&&Dr(je),je=t,vs(t),xs();let e=hs(t);e&&ys(t,e),Dr(t)}function xi(){Cn===void 0&&(Cn=window.setTimeout(()=>{Cn=void 0,mb()},120))}function fb(){kn||(kn=history.pushState.bind(history),Pr=history.replaceState.bind(history),history.pushState=function(...e){let n=kn(...e);return xi(),n},history.replaceState=function(...e){let n=Pr(...e);return xi(),n})}function pb(){kn&&(history.pushState=kn),Pr&&(history.replaceState=Pr),kn=null,Pr=null}function gb(t){return tb.has(t.code)||t.keyCode===192?!0:eb.has(t.key)}function Qu(t){return t.key==="Control"||t.code==="ControlLeft"||t.code==="ControlRight"}function bb(t,e){$r=e,xs(),Dr(Ge()),ot=!0,Dt=0;try{let n=Ge();vs(n);let r=wi();r.length>1&&(Dt=t?r.length-1:1)}catch(n){Ku.error("Failed to open switcher:",n)}An()}function Uu(t){let{length:e}=wi();e&&(Dt=(Dt+(t?-1:1)+e)%e,An())}function Es(){if(!ot)return;let t=wi()[Dt];ot=!1,$r=!1,An(),t&&db(t.id)}function td(){ot&&(ot=!1,$r=!1,An())}function hb(t){if(Qu(t)){Rr=!0;return}if((t.ctrlKey||Rr)&&!t.altKey&&!t.metaKey&&gb(t)&&!t.repeat){t.preventDefault(),t.stopImmediatePropagation();try{ot?Uu(t.shiftKey):bb(t.shiftKey,!0)}catch(n){Ku.error("Hotkey failed:",n)}return}if(ot){if(t.key==="Escape"){t.preventDefault(),td();return}if(t.key==="Enter"&&!t.shiftKey){t.preventDefault(),Es();return}t.key==="Tab"&&(t.ctrlKey||Rr)&&(t.preventDefault(),Uu(t.shiftKey))}}function yb(t){Qu(t)&&(Rr=!1,ot&&$r&&Es())}function vb(t){let e=t.target instanceof Element?t.target:null;!e||!e.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(xi)}function xb(t){!ot||(t.target instanceof Element?t.target:null)?.closest(`#${Mn}`)||td()}function Eb(){document.visibilityState==="hidden"&&Dr(Ge())}function fs(t=vi){t instanceof HTMLElement&&Oo(t,Po("auto"),!0)}function wb(){if(!document.body)return null;let t=document.getElementById(Mn);if(t instanceof HTMLElement)return vi=t,fs(t),t;t=document.createElement("div"),t.id=Mn;let e=document.createElement("div");return e.className="bloom-rt-panel",e.setAttribute("role","listbox"),e.setAttribute("aria-label","Recent conversations"),e.dataset.visible="false",e.addEventListener("click",n=>n.stopPropagation()),t.append(e),document.body.append(t),vi=t,fs(t),t}function An(){let t=wb();if(!t)return;let e=t.querySelector(".bloom-rt-panel");if(!e)return;if(!ot){e.dataset.visible="false",e.replaceChildren();return}let n=wi();if(!n.length){e.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",e.replaceChildren(i);return}Dt>=n.length&&(Dt=0);let r=document.createElement("div");r.className="bloom-rt-list",r.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===Dt?"true":"false",s.setAttribute("aria-selected",a===Dt?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let c=document.createElement("div");c.className="bloom-rt-project",c.textContent=i.project,s.append(c)}if(i.preview.user||i.preview.assistant){let c=document.createElement("div");if(c.className="bloom-rt-preview",i.preview.user){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="user",u.textContent=i.preview.user,c.append(u)}if(i.preview.assistant){let u=document.createElement("div");u.className="bloom-rt-line",u.dataset.role="assistant",u.textContent=i.preview.assistant,c.append(u)}s.append(c)}s.addEventListener("click",()=>{Dt=a,Es()}),r.append(s)}),e.replaceChildren(r),e.dataset.visible="true",e.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function Sb(){document.getElementById(Mn)?.remove(),vi=null}var ed=y({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${Mn}`],settings:G,start(){w("recentTopics",ju),je=Ge(),vs(je),xs(),Dr(je),ds=lt(lb),fb(),yi=new AbortController;let{signal:t}=yi;window.addEventListener("keydown",hb,{capture:!0,signal:t}),window.addEventListener("keyup",yb,{capture:!0,signal:t}),window.addEventListener("popstate",xi,{signal:t}),document.addEventListener("click",vb,{capture:!0,signal:t}),document.addEventListener("click",xb,{signal:t}),document.addEventListener("visibilitychange",Eb,{signal:t}),ms=cn("schemeChange",()=>fs())},stop(){yi?.abort(),yi=null,Cn!==void 0&&(clearTimeout(Cn),Cn=void 0),pb(),ds?.(),ds=null,ms?.(),ms=null,ot=!1,$r=!1,Rr=!1,Sb()},onSettingsChange(){let t=Ei(Or());t.length!==Or().length&&(G.store.visits=t),ot&&An()}});var ws="cleaner",Lb=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],Tb=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],kb=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],Cb=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],Mb=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],Ab=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],Ue=L({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function Hn(t){return`${t.join(",")}{display:none!important}`}function nd(){let t=[];if(Ue.store.hideDownloadApps!==!1&&t.push(Hn(Lb)),Ue.store.hideDisclaimer!==!1&&t.push(Hn(Tb)),Ue.store.hideUpgrade!==!1&&t.push(Hn(kb)),Ue.store.hideLockedModels!==!1&&t.push(Hn(Cb)),Ue.store.hideHomePromo!==!1&&t.push(Hn(Mb)),Ue.store.hideAds!==!1&&t.push(Hn(Ab)),!t.length){E(ws);return}w(ws,t.join(`
`))}var rd=y({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Ue,start:nd,onSettingsChange:nd,stop(){E(ws)}});var Li=new S("ResponseNotification"),In=L({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:Bb},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Ss=!1,Si=null,Nn=null,_r=null;function Hb(){return document.visibilityState==="hidden"||document.hidden}function Nb(){return In.store.onlyWhenHidden===!1?!0:Hb()}function Ib(){let t=En(M());if(t)return t;let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function od(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;(!Nn||Nn.state==="closed")&&(Nn=new t);let e=Nn,n=e.currentTime,r=[523.25,659.25];for(let o=0;o<r.length;o++){let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=r[o];let s=n+o*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(e.destination),i.start(s),i.stop(s+.24)}e.resume?.()}catch(t){Li.debug("chime failed",t)}}function Rb(t){try{let e=new Audio(t);e.volume=.7,e.play()}catch(e){Li.debug("custom sound failed",e),od()}}function id(){let t=String(In.store.soundUrl||"").trim();t?Rb(t):od()}function Pb(){let t="Bloom++",e=`${Ib()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:t,text:e,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(t,{body:e,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){Li.debug("notification failed",n)}}function Ob(){Nb()&&(In.store.sound!==!1&&id(),In.store.browserNotification!==!1&&Pb())}function Bb(t){let e=document.createElement("button");return e.type="button",e.textContent="Play",e.addEventListener("click",()=>id()),t.appendChild(e),()=>{e.remove()}}var ad=y({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:In,start(){Ss=!0,Si?.(),Si=tt(t=>{if(!Ss||t.userStopped||t.error)return;let e=M()||ii();t.conversationId&&t.conversationId!==e||Ob()}),_r?.abort(),_r=new AbortController,In.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:_r.signal}),Li.debug("watch started")},stop(){Ss=!1,Si?.(),Si=null,_r?.abort(),_r=null;try{Nn?.close()}catch{}Nn=null}});var sd=`#bloom-pq-chip {
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
`;var zr=new S("PromptQueue"),Ts="bloom-pq-chip",ld="promptQueue",cd=80,$b=50,_b=2e3,fd=L({replacePending:{type:2,description:"Replace the queued prompt if you Enter again while one is waiting.",default:!0}}),U=new Map,Jt=!1,Lt="",F="",Qt=!1,Tt=!1,_=null,Fr=null,Ti=null,Ee,qr,Rn=null;function Pn(){return Xt(Et())}function On(t){return t.replaceAll("\u200B","").replace(/\n$/,"").trim()}function ud(t){let n=(t instanceof Element?t:t instanceof Node?t.parentElement:null)?.closest?.(Nt);return n instanceof HTMLElement?n:X()}function ks(t){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()}function pd(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function Fb(){try{let t=document.querySelectorAll('[data-message-author-role="user"]'),e=t[t.length-1];return e instanceof HTMLElement?On(e.innerText||e.textContent||""):""}catch{return""}}function dd(t){if(!Lt||Lt===t)return;let e=U.get(Lt);!e||U.has(t)||$(Lt,t)&&(U.delete(Lt),U.set(t,e),F===Lt&&(F=t),_?.key===Lt&&(_.key=t),zr.debug("migrated pending",Lt,"\u2192",t))}function Cs(t){let e=Pn();if(U.get(e)&&fd.store.replacePending===!1)return;U.set(e,{text:t,at:Date.now()}),_={key:e,text:t,turns:pd(),ticks:3};let r=X();r&&Yt(r,""),we(),zr.debug("queued",e,t.length)}function qb(t){U.delete(t),F===t&&(F=""),_?.key===t&&(_=null),we()}function zb(){Tt=!0,clearTimeout(qr),qr=setTimeout(()=>{Tt=!1,qr=void 0},_b)}function jb(){let t=Pn(),e=U.get(t);if(!e)return;let n=X();if(!n)return;U.delete(t),F="",we(),zb(),Yt(n,e.text);let r=pe();r&&!B(r)&&!Zo(r)&&(r.click(),Tt=!1)}function md(t){if(!Jt||Qt||Q()||Pn()!==t)return;let e=U.get(t);if(!e){F="";return}if(Pt())return;let n=X();if(!n)return;if(!fe(n)){let o=On(st(n));if(o&&o!==e.text)return}let r=pe();!r||B(r)||Zo(r)||(Qt=!0,Yt(n,e.text),clearTimeout(Ee),Ee=setTimeout(()=>Gb(t,e.text),$b))}function Gb(t,e){Ee=void 0;try{if(!Jt)return;let n=U.get(t);if(!n||n.text!==e||Q()||Pn()!==t)return;let r=X();if(!r)return;let o=On(st(r));if(o&&o!==e&&!fe(r))return;o!==e&&Yt(r,e);let i=pe();if(!i||B(i)||Zo(i))return;i.click(),U.delete(t),F="",we(),zr.debug("drained",t)}finally{Qt=!1}}function gd(t){let e=vt();if(!e||e===document.body){t.style.left="50%",t.style.bottom="6.5rem";return}let n=e.getBoundingClientRect();t.style.left=`${Math.round(n.left+n.width/2)}px`,t.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`;let r=Math.min(512,Math.max(160,n.width-24));t.style.maxWidth=`${Math.round(r)}px`}function Ls(){Rn?.remove(),Rn=null}function we(){if(!Jt||!document.body){Ls();return}let t=Pn(),e=U.get(t);if(!e){Ls();return}let n=Rn;n?.isConnected||(n=document.createElement("div"),n.id=Ts,document.body.appendChild(n),Rn=n),n.replaceChildren();let r=document.createElement("span");r.className="bloom-pq-kicker",r.textContent="Next";let o=document.createElement("span");o.className="bloom-pq-text";let i=e.text.length>cd?`${e.text.slice(0,cd)}\u2026`:e.text;o.textContent=i,o.title=e.text;let a=document.createElement("div");a.className="bloom-pq-actions";let s=document.createElement("button");s.type="button",s.className="bloom-pq-btn bloom-pq-send",s.textContent="Send now",s.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),jb()});let l=document.createElement("button");l.type="button",l.className="bloom-pq-btn bloom-pq-x",l.setAttribute("aria-label","Dismiss queued prompt"),l.textContent="\xD7",l.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),qb(t)}),a.append(s,l),n.append(r,o,a),gd(n)}function Ub(){if(!_)return;if(_.ticks-=1,U.get(_.key)&&pd()>_.turns){let e=Fb();if(e&&e===_.text){zr.debug("native send leaked; dropping pending"),U.delete(_.key),F===_.key&&(F=""),_=null,we();return}}_.ticks<=0&&(_=null)}function Ms(){return Z()?!1:Q()}function Kb(t){if(!Jt||t.isComposing||t.keyCode===229||t.key!=="Enter"||t.shiftKey||t.ctrlKey||t.metaKey||Qt)return;let e=ud(t.target)??ud(document.activeElement);if(!e||!Ms())return;if(t.altKey||Tt){Tt=!1;return}if(!xt(e))return;let n=On(st(e));n&&(ks(t),Cs(n))}function Wb(t){let e=t.closest("button");if(!(e instanceof HTMLElement)||B(e))return null;let n=t.closest(vn);if(n instanceof HTMLElement&&!B(n))return n;let r=pe();return r&&(e===r||r.contains(e)||e.contains(r))?r:null}function Vb(t){if(!Jt)return;let e=t.target;if(!(e instanceof Element)||e.closest(`#${Ts}`))return;let n=e.closest("button");if(n instanceof HTMLElement&&B(n)||Qt||!Ms()||!Wb(e))return;if(Tt){Tt=!1;return}let r=X();if(!r||!xt(r))return;let o=On(st(r));o&&(ks(t),Cs(o))}function Yb(t){if(!Jt)return;let e=t.target;if(!(e instanceof HTMLFormElement)||!e.matches(Xo)&&!e.querySelector(Nt)||Qt||!Ms())return;if(Tt){Tt=!1;return}let n=X()??e.querySelector(Nt);if(!n||!xt(n))return;let r=On(st(n));r&&(ks(t),Cs(r))}var bd=y({name:"PromptQueue",description:"Queue the next prompt while a reply is streaming. Enter/Send waits for this turn instead of interrupting.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:ld,cleanupSelectors:[`#${Ts}`],settings:fd,start(){Jt=!0,Lt=Pn(),F="",Qt=!1,Tt=!1,_=null,w(ld,sd),Fr?.abort(),Fr=new AbortController;let{signal:t}=Fr;window.addEventListener("keydown",Kb,{capture:!0,signal:t}),document.addEventListener("click",Vb,{capture:!0,signal:t}),document.addEventListener("submit",Yb,{capture:!0,signal:t}),Ti?.(),Ti=tt({onFall(e){if(Jt){if(e.userStopped||e.error){F="",we();return}F=e.contextKey,md(e.contextKey)}},onContext(e,n){n&&e&&!$(n,e)&&(F="",Qt=!1,Ee!==void 0&&(clearTimeout(Ee),Ee=void 0)),dd(e),Lt=e,we()},onTick(e){dd(e.contextKey),Lt=e.contextKey,Ub(),F&&F===e.contextKey&&md(F),Rn&&gd(Rn)}}),we(),zr.debug("watch started")},stop(){Jt=!1,Ti?.(),Ti=null,Fr?.abort(),Fr=null,clearTimeout(Ee),Ee=void 0,clearTimeout(qr),qr=void 0,U.clear(),_=null,F="",Qt=!1,Tt=!1,Ls()}});var hd=`.bloom-cls {
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
`;var xd=new S("ChatListStatus"),yd="chatListStatus",Mi="bloom-cls",Zb="bloom-cls",Jb=1200*1e3,Qb="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",kt=new Map,_t=!1,mt="",te=!1,$n=!1,ft=0,Se=null,Ns=null,Bn=null,As=null,ki=null,jr=null,Dn=!1,Le=new Set;function Ci(){return Date.now()}function Ed(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function ee(t,e,n,r=!0){if(!(!t||!_t)){if(e==="idle")kt.delete(t);else{let o=kt.get(t);o&&o.kind===e&&n!=="net"?o.at=Ci():kt.set(t,{kind:e,at:Ci(),source:n})}r&&th({v:1,id:t,kind:e,at:Ci()}),Ke()}}function th(t){try{Bn?.postMessage(t)}catch{}}function eh(t){let e=t.data;!e||e.v!==1||!e.id||e.kind!=="streaming"&&e.kind!=="done"&&e.kind!=="error"&&e.kind!=="idle"||ee(e.id,e.kind,"bc",!1)}function nh(){let t=Ci();for(let[e,n]of kt)n.kind==="streaming"&&t-n.at>Jb&&kt.delete(e)}function rh(){let t=Ed();if(!t)return[];let e=[],n=new Set;try{for(let r of t.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(r.closest(Qb))continue;let o=Zt(r.getAttribute("href")||"");!o||n.has(o)||(n.add(o),e.push(r))}}catch{}return e}function vd(t){let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),t==="streaming")e.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let r=document.createElementNS("http://www.w3.org/2000/svg","circle");r.setAttribute("cx","12"),r.setAttribute("cy","12"),r.setAttribute("r","9"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2"),e.appendChild(r)}return e.appendChild(n),e}function Hs(t){let e=t.querySelector(`:scope > .${Mi}`);return e||null}function Is(){if(!_t)return;nh();let t=M(),e=rh();Se?.disconnect();try{for(let n of e){let r=Zt(n.getAttribute("href")||"");if(!r||!t||r!==t){Hs(n)?.remove();continue}let i=kt.get(r)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){Hs(n)?.remove();continue}let a=Hs(n);a||(a=document.createElement("span"),a.className=Mi,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(vd("streaming")):i==="error"&&a.appendChild(vd("error")))}}catch(n){xd.debug("paint failed",n)}wd()}function Ke(){if(_t){if(document.hidden){ft&&(cancelAnimationFrame(ft),ft=0),Is();return}ft||(ft=requestAnimationFrame(()=>{ft=0,_t&&Is()}))}}function wd(){let t=Ed();if(!(Se&&Ns===t&&t?.isConnected)){if(Se?.disconnect(),Ns=t,!t){Se=null;return}Se=new MutationObserver(()=>Ke()),Se.observe(t,{childList:!0,subtree:!0})}}function Ai(){return!!(Pe()||kr())}function oh(t){return!!(Dn||t&&Le.has(t)||!$n&&!Z()&&Ai())}function ih(t){if(_t){if(t.type==="post-start"){$n=!1,t.conversationId?(Dn=!1,Le.add(t.conversationId),te=!0,ee(t.conversationId,"streaming","net")):(Dn=!0,te=!0);return}if(t.type==="post-end"){if(Dn=!1,t.conversationId){Le.delete(t.conversationId);let e=M(),n=ii();(e?t.conversationId===e:t.conversationId===n)?ee(t.conversationId,t.error?"error":"done","net"):ee(t.conversationId,"idle","net")}Ai()||(te=!1)}}}function ah(t,e){if(!_t)return;if($(e,t)){Ke();return}let n=M();if(mt&&mt!==n){Le.delete(mt);let r=kt.get(mt);r&&r.kind!=="idle"&&ee(mt,"idle","local")}Dn=!1,te=!1,$n=!0,n&&kt.get(n)?.kind==="streaming"&&kt.get(n)?.source==="local"&&!Le.has(n)&&ee(n,"idle","local"),Ke()}function sh(t){if(!_t)return;let e=t.conversationId||M();if(mt&&e&&mt!==e){Le.delete(mt);let r=kt.get(mt);r&&r.kind!=="idle"&&ee(mt,"idle","local"),te=!!(e&&Le.has(e))}if(e&&(mt=e),$n||Z()){if(Z()||Ai()||t.streaming){Ke();return}$n=!1}if(oh(e)&&(t.streaming||Ai())){te=!0,e&&ee(e,"streaming","local"),Ke();return}te&&(te=!1,e&&ee(e,Pt()?"error":"done","local")),Ke()}var Sd=y({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Mi}`],start(){_t=!0,w(yd,hd);try{Bn=new BroadcastChannel(Zb)}catch{Bn=null}Bn?.addEventListener("message",eh),As=lt(ih),ki?.(),ki=tt({onTick:sh,onContext:ah}),jr?.abort(),jr=new AbortController,document.addEventListener("visibilitychange",()=>{_t&&(ft&&(cancelAnimationFrame(ft),ft=0),Is())},{signal:jr.signal}),wd(),xd.debug("sidebar status watch started")},stop(){_t=!1,ft&&cancelAnimationFrame(ft),ft=0,jr?.abort(),jr=null,Se?.disconnect(),Se=null,Ns=null,ki?.(),ki=null,As?.(),As=null;try{Bn?.close()}catch{}Bn=null,kt.clear(),Le.clear(),Dn=!1,te=!1,$n=!1,mt="",document.querySelectorAll(`.${Mi}`).forEach(t=>t.remove()),E(yd)}});var Td="widerChat",kd=40,Cd=96,Md=64,Ad=L({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:kd,max:Cd,default:Md}});function lh(){return Y(Number(Ad.store.width??Md),kd,Cd)}function Ld(){let t=lh(),e=`min(100%,${t}rem)`;w(Td,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important;--user-chat-width:${t}rem!important;--composer-container-max-width:${t}rem!important;--thread-xl-max-width:${t}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${t}rem!important;--thread-content-width:${t}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${e}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${e}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${e}!important}`)}var Hd=y({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Ad,start:Ld,onSettingsChange:Ld,stop(){E(Td)}});var Rs="composerOpacity",_n='form[data-type="unified-composer"],form.w-full[data-type]',ch=[`${_n} [class*="corner-superellipse"]`,`${_n} [class*="bg-token-bg-primary"]`,`${_n} [class*="bg-token-main-surface"]`].join(","),uh=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),dh="#thread-bottom-container,#thread-bottom",mh=`${_n} #prompt-textarea,${_n} [contenteditable="true"]`,fh="var(--bg-primary,var(--main-surface-primary,#ffffff))",Ps=L({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function ph(){return Y(Number(Ps.store.opacity??100),0,100)}function gh(){return Y(Number(Ps.store.blur??16),0,40)}function Nd(){let t=ph();if(t>=100){E(Rs);return}let e=gh(),n=`color-mix(in srgb,${fh} ${t}%,transparent)`,r=e>0?`-webkit-backdrop-filter:blur(${e}px)!important;backdrop-filter:blur(${e}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";w(Rs,`${dh}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${uh}{display:none!important}${_n}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${ch}{background-color:${n}!important;background-image:none!important;${r}}${mh}{background-color:transparent!important;background-image:none!important}`)}var Id=y({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[v.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"Init",settings:Ps,start:Nd,onSettingsChange:Nd,stop(){E(Rs)}});var Rd=`#bloom-bn-host {
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
`;var hh=new S("BetterNavigator"),Os="betterNavigator",$d="bloom-bn-host",zn=60,yh=16,vh=1e3,xh=2.5,Eh=.4,Ri="\u6B63\u5728\u8F93\u51FA\u2026",qs="Image",wh="\u2753",Sh="\u{1F916}",Pd=/file_[0-9a-f]+/gi,Lh="File",Th="Code",kh=".markdown, .whitespace-pre-wrap",_d=["a[download]","[class*='attachment']","[data-testid*='file' i]","[data-testid*='attachment' i]"].join(", "),Ch="img, picture, video, canvas",Fd=/\.(?:epub|pdf|docx?|xlsx?|pptx?|txt|md|csv|json|zip|rar|7z|png|jpe?g|gif|webp|svg|mp3|mp4|wav|m4a|html?|py|js|ts|tsx|css|c|cpp|java|go|rs|rb|xml|ya?ml)$/i,qd=/\.[A-Za-z0-9]{1,8}(?:…|\.\.\.)$/,jn=/^(?:file|image|pdf|epub|document|attachment|video|audio|code|zip|png|jpe?g|gif|webp|txt|markdown|文件|图片|附件|文档)$/i,Mh=/favicon|iconify|shields\.io|badgen\.net|google\.com\/s2\/favicons|gstatic\.com\/favicon/i,Ah=/^(?:pro thinking|thinking(?:…|\.\.\.)?|正在思考|思考中)$/i,Hh=/^(?:pro thinking|thinking(?:…|\.\.\.)?|reasoning|thoughts?|正在思考|思考中|已思考.*|thought for\b.*|worked for\b.*|思考了.*|思考用时.*)$/i,Nh=/^(?:inspected|analyzed|translated|validated|searched|reviewed|extracted|packaged|已检查|已分析|已翻译|已验证|搜索了|已搜索)\b/i,Ih=/^(?:\d+\s+)?(?:sources?|websites?)$|^web search$|^zh-cn$|^zh$|^en(?:-[a-z]{2})?$/i,Rh=/^(?:Image(?: x\d+)?|File|Code|Message \d+)$/,Ph=['button[data-testid="copy-turn-action-button"]','button[data-testid="good-response-turn-action-button"]','button[data-testid="bad-response-turn-action-button"]','button[aria-label="Good response"]','button[aria-label="Bad response"]','button[aria-label="\u597D\u8BC4"]','button[aria-label="\u5DEE\u8BC4"]'].join(", "),Oh=2e3,Bh=40,Dh=/thread-content-max-width|thread-content-width|max-w-\(--thread-content|max-w-\[var\(--thread-content|max-w-\[40rem\]|max-w-\[48rem\]/,$h=['section[data-testid^="conversation-turn-"][data-turn="user"]','section[data-testid^="conversation-turn-"][data-turn="assistant"]','article[data-testid^="conversation-turn-"][data-turn="user"]','article[data-testid^="conversation-turn-"][data-turn="assistant"]'].join(", "),_h=["#thread-bottom-container","#prompt-textarea","#bloom-root","#bloom-sidebar-panel","#bloom-bn-host","form[data-type='unified-composer']"].join(", "),Fh=["button","svg","nav","time",".bloom-ts","details","summary","[role='toolbar']","[role='menu']","[data-testid*='action-button']","[data-testid*='citation']","[data-testid*='copy']","[class*='footnote']",".sr-only"].join(", "),qh=["input","textarea","select","[contenteditable='true']","#prompt-textarea","[role='textbox']","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#bloom-rt-host","#bloom-pq-chip","#bloom-gc-composer"].join(", "),zi=L({showAssistant:{type:2,description:"List assistant replies in the outline, not only your messages.",default:!0},jumpEffect:{type:3,description:"Highlight the message after jumping to it.",options:[{label:"Border",value:"border",default:!0},{label:"None",value:"none"}]}}),qn=new Map,Yr=new Map,qt=new Set,Oi=0,Ct=!1,re=!1,Fn=!1,Te=null,Xr=null,Ye=null,Bi=null,K=[],Xe="",Di=0,$i=-1,Ws=0,_i="",pt=0,ne=0,Ur,Kr=null,Hi=null,Bs=null,Ds=null,We=null,zs=null,Wr=null,Ve=null,Gn=null,Vr=null;function ji(){return document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main")}function $s(t){let e=t.trim();if(!e)return 0;let n=Number.parseFloat(e);return Number.isFinite(n)?e.endsWith("rem")?n*16:n:0}function zh(t){let e=t.className;return typeof e=="string"?e:t.getAttribute("class")||""}function jh(t){let e=t.getBoundingClientRect(),n=null;try{let o=t.querySelector("[data-message-id], [data-testid^='conversation-turn-']"),a=o?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"]')??o;for(;a&&a!==t;)Dh.test(zh(a))&&(n=a),a=a.parentElement}catch{}if(!n)try{let i=document.getElementById("thread-bottom-container")?.querySelector('[class*="thread-content-max-width"], [class*="max-w-(--thread-content"], form[data-type="unified-composer"]');i&&i.getBoundingClientRect().width>160&&(n=i)}catch{}if(n){let o=n.getBoundingClientRect();if(o.width>160&&o.width<=e.width+8)return o}let r=0;try{r=$s(getComputedStyle(t).getPropertyValue("--thread-content-max-width"))||$s(getComputedStyle(t).getPropertyValue("--thread-content-width"))||$s(getComputedStyle(document.documentElement).getPropertyValue("--thread-content-max-width"))}catch{}if(r>160){let o=Math.min(r,e.width),i=e.left+Math.max(0,(e.width-o)/2);return new DOMRect(i,e.top,o,e.height)}return e}function Fi(t){try{return!!t.closest(_h)}catch{return!0}}function Od(t){let e=(t.getAttribute("data-turn")||t.closest("[data-turn]")?.getAttribute("data-turn")||"").toLowerCase();if(e==="user"||e==="assistant")return e;let n=(t.getAttribute("data-message-author-role")||t.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase();if(n==="user"||n==="assistant")return n;try{let o=(t.querySelector("h4.sr-only, h5.sr-only, h6.sr-only")?.textContent||"").toLowerCase();if(o.includes("you said"))return"user";if(o.includes("chatgpt said")||o.includes("assistant said"))return"assistant"}catch{}let r=(t.getAttribute("aria-label")||"").toLowerCase();return r.includes("you said")?"user":r.includes("chatgpt said")||r.includes("assistant said")?"assistant":null}function Gi(t){return t.getAttribute("data-turn-id")||t.getAttribute("data-message-id")||t.querySelector("[data-message-id]")?.getAttribute("data-message-id")||""}function Vs(t){try{if(t.querySelector("[class*='imagegen-image']")||t.querySelector('img[alt="Generated image"], img[alt^="Generated image"]'))return!0}catch{}return!1}function Gh(t){try{return!!t.closest("[class*='message-image']")}catch{return!0}}function Ni(t,e){if(t){Pd.lastIndex=0;for(let n of t.matchAll(Pd))e.add(n[0].toLowerCase())}}function Uh(t){try{let e=new Set,n=s=>{Gh(s)||(Ni(s.getAttribute("src")||"",e),Ni(s.getAttribute("srcset")||"",e),Ni(s.getAttribute("href")||"",e),s instanceof HTMLImageElement&&Ni(s.currentSrc||"",e))};for(let s of t.querySelectorAll("[class*='imagegen-image']")){n(s);for(let l of s.querySelectorAll("[src], [srcset], [href]"))n(l)}for(let s of t.querySelectorAll('img[alt="Generated image"], img[alt^="Generated image"]'))n(s);if(e.size)return e.size;let o=t.querySelectorAll("[class*='group/imagegen-image']").length;if(!o)return 0;let i=Gi(t);return(i?t.querySelector(`#image-${CSS.escape(i)}`):t.querySelector("[id^='image-']:not([id^='image-gen-'])"))&&o>=2&&(o-=1),o}catch{return 0}}function Kh(t,e){let n=Uh(t),r=Yr.get(e)??0,o=Math.max(r,n);return o>0&&Yr.set(e,o),o>=2?`${qs} x${o}`:qs}function W(t){return t.replace(/\s+/g," ").trim()}function zd(t,e){let n=t;for(;n&&n!==e;){if(n.matches(Fh))return!0;n=n.parentElement}return!1}function qi(t){let e=[],n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement;if(!i)return NodeFilter.FILTER_REJECT;try{if(zd(i,t))return NodeFilter.FILTER_REJECT}catch{return NodeFilter.FILTER_REJECT}return W(o.textContent||"")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r;for(;(r=n.nextNode())&&e.join(" ").length<zn+20;)e.push(W(r.textContent||""));return W(e.join(" "))}function jd(t){let e=W(t).replace(/^(?:download|open|view|save|attachment|附件|下载|打开|查看)\s+/i,"");return(e.split(/[/\\]/).pop()||e).trim()}function Ui(t){let e=W(t);return e.length<3||e.length>180||jn.test(e)?!1:Fd.test(e)?!0:qd.test(e)}function Wh(t){let e=W(t);return e.length<8||e.length>120||/\s/.test(e)||jn.test(e)||Ui(e)||/^https?:/i.test(e)||/^file_[0-9a-f]{6,}$/i.test(e)||!/[_\-.]/.test(e)&&!/\(\d+\)/.test(e)?!1:/^[\w.\-()[\]+@#]+$/.test(e)}function Vh(t){return Fd.test(t)?3:qd.test(t)?2:1}function Gr(t,e){let n=jd(t);if(!Ui(n))return;let r=Vh(n),o=e.find(i=>i.name===n);if(o){r>o.rank&&(o.rank=r);return}e.push({name:n,rank:r})}function Yh(t,e){let n=jd(t);!Wh(n)||e.some(r=>r.name===n)||e.push({name:n,rank:1})}function Xh(t){let e=null;for(let n of t)(!e||n.rank>e.rank||n.rank===e.rank&&n.name.length>e.name.length)&&(e=n);return e?.name??""}function Pi(t){let e=[],n=i=>{let a=W(i);if(!a)return;let s=a.match(/^(.*\S)\s+(file|image|pdf|epub|document|attachment|文件|图片|附件|文档)$/i);if(s){e.push(W(s[1])),e.push(W(s[2]));return}e.push(a)},r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),o;for(;o=r.nextNode();)n(o.textContent||"");return e}function _s(t,e){Gr(t.getAttribute("download")||"",e),Gr(t.getAttribute("title")||"",e),Gr(t.getAttribute("aria-label")||"",e),Gr(t.getAttribute("alt")||"",e)}function Ii(t){try{return Fi(t)?!0:!!t.closest("[data-testid*='action-button'], [role='toolbar'], [role='menu']")}catch{return!0}}function Bd(t){let e=[t.parentElement,t.parentElement?.parentElement];for(let n of e){if(!n)continue;let r=Pi(n),o=r.join(" ");if(!(!r.length||r.length>8||o.length>240)&&r.some(i=>jn.test(W(i))))return!0}return!1}function Fs(t,e,n){for(let r of t)Ui(r)?Gr(r,e):n&&Yh(r,e)}function Zh(t){let e=[],n=!1;try{let o=t.querySelectorAll(_d);o.length&&(n=!0);for(let i of o)Ii(i)||(_s(i,e),Fs(Pi(i),e,!0));for(let i of t.querySelectorAll("button, a, [role='button']")){if(Ii(i))continue;_s(i,e);let a=Pi(i),s=a.some(l=>jn.test(W(l)));s&&(n=!0),(s||a.length<=4)&&Fs(a,e,s||a.length<=3)}for(let i of t.querySelectorAll("[title], [aria-label], [download], img[alt], [alt]"))Ii(i)||_s(i,e);for(let i of t.querySelectorAll("div, span, p")){if(Ii(i))continue;let a=Pi(i);if(!a.length||a.length>6||a.join(" ").length>240)continue;let s=a.some(c=>jn.test(W(c))),l=a.some(c=>Ui(c));s&&(n=!0),!(!s&&!l&&!Bd(i))&&Fs(a,e,s||Bd(i))}}catch{}let r=Xh(e);return r?Kd(r):n?Lh:""}function Jh(t){try{if(t.closest("[class*='imagegen-image'], [class*='message-image']"))return!1;let e=t instanceof HTMLImageElement?t:t.querySelector("img");if(e instanceof HTMLImageElement){let i=e.getAttribute("alt")||"";if(/^Generated image/i.test(i))return!1;let a=`${e.getAttribute("src")||""} ${e.getAttribute("srcset")||""}`;if(Mh.test(a))return!0}if(t.closest("[data-testid*='citation'], [class*='citation'], [class*='tool-message'], [data-testid*='tool']"))return!0;let n=t.getBoundingClientRect(),r=n.width||Number(e?.getAttribute("width"))||0,o=n.height||Number(e?.getAttribute("height"))||0;if(r>0&&r<=48||o>0&&o<=48)return!0;if(r>48||o>48)return!1}catch{}return!0}function Qh(t){try{for(let e of t.querySelectorAll(Ch))if(!Jh(e))return!0}catch{}return!1}function Gd(t){let e=W(t).replace(/^[^a-zA-Z\u4e00-\u9fff]+/,"");return!e||Nh.test(e)||Hh.test(e)?!0:e.length<=24&&(Ih.test(e)||jn.test(e))}function t0(t){let e=[],n=new Set,r=o=>{try{if(zd(o,t)||o.closest(_d))return}catch{return}let i=qi(o);!i||n.has(i)||Gd(i)||(n.add(i),e.push(i))};try{for(let o of t.querySelectorAll("p, li, h1, h2, h3, blockquote"))if(r(o),e.join(" ").length>zn+20)break;if(!e.length){for(let o of t.querySelectorAll("div, span"))if(!o.querySelector("div, p, li")&&!(qi(o).length<24)&&(r(o),e.join(" ").length>zn+20))break}}catch{}return W(e.join(" "))}function Ud(t,e){let n=[];try{for(let o of t.querySelectorAll(kh)){if(Fi(o))continue;let i=qi(o);if(!(!i||Gd(i))&&(n.push(i),n.join(" ").length>zn+20))break}}catch{}let r=W(n.join(" "));return r||(e==="assistant"?t0(t):"")}function Kd(t){return t.length>zn?`${t.slice(0,zn).trimEnd()}\u2026`:t}function Dd(t){return Rh.test(t)}function e0(t,e,n,r){let o=Ud(t,e);if(o)return Kd(o);if(r)return Ri;let i=Zh(t);if(i)return i;if(Vs(t))return Kh(t,Gi(t));try{if(Qh(t))return qs;if(t.querySelector("pre, code"))return Th}catch{}return`Message ${n+1}`}function n0(){if(re)return!0;let t=M();return!!(t&&qt.has(t)||!Fn&&!Z()&&Zr())}function Zr(){return!!(Pe()||kr())}function r0(){Oi=Date.now()}function Wd(t){re=!1,t&&qt.delete(t);let e=M();e&&qt.delete(e)}function o0(t){if(t.getAttribute("aria-busy")==="true"||t.classList.contains("result-streaming"))return!0;let e=t.querySelector('[data-message-author-role="assistant"]');return!!(e&&e!==t&&(e.getAttribute("aria-busy")==="true"||e.classList.contains("result-streaming")))}function i0(t){if(Vs(t)||!Zr())return!1;let e=t.querySelector(".markdown");if(!(!e||e instanceof HTMLElement&&!qi(e)))return!1;let r=t.querySelector("[class*='thinking'], [class*='reasoning']");if(!r)return!1;if(r.getAttribute("aria-busy")==="true"||r.classList.contains("result-streaming"))return!0;try{if(r.querySelector("[aria-busy='true'], .result-streaming"))return!0}catch{}let o=r.closest("details")??r.querySelector("details");return o instanceof HTMLDetailsElement&&o.open}function Ys(t){try{for(let e of t.querySelectorAll("span, div, p, button")){if(e.childElementCount>2)continue;let n=W(e.textContent||"");if(!(n.length>32)&&Ah.test(n))return!0}}catch{}return!1}function a0(t){try{for(let e of t.querySelectorAll("svg.animate-spin, .animate-spin"))if(!e.closest('button[data-testid="conversation-options-button"], #page-header, nav, [data-testid*="citation"]'))return!0}catch{}return!1}function s0(t,e){try{if(o0(t))return!0;if(!e)return!1;if(i0(t)||Ys(t))return!0}catch{}return!1}function Vd(t){if(!t||Zr())return!1;try{if(Ys(t))return!1;if(t.querySelector(Ph)||Vs(t)||Ud(t,"assistant"))return!0}catch{}return!1}function l0(t){if(Zr()||Oi&&Date.now()-Oi<Oh)return;let e=[...t].reverse().find(n=>n.role==="assistant");!e||!Vd(e.el)||Wd()}function c0(t){let e=new Set,n=[];try{for(let r of t.querySelectorAll($h)){if(Fi(r))continue;let i=Gi(r)||`anon:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}if(n.length)return n;try{for(let r of t.querySelectorAll("[data-message-id]")){if(Fi(r))continue;let i=r.getAttribute("data-message-id")||""||`mid:${n.length}`;e.has(i)||(e.add(i),n.push(r))}}catch{}return n}function u0(){let t=ji();if(!t||t===document.body)return[];let e=zi.store.showAssistant!==!1,n=e&&n0(),r=c0(t),o=null;if(e)for(let a of r)Od(a)==="assistant"&&(o=a);let i=[];try{for(let a of r){let s=Gi(a);if(!s)continue;let l=Od(a);if(l!=="user"&&l!=="assistant"||l==="assistant"&&!e)continue;let c=a===o,u=c&&Ys(a),d=c&&n&&a0(a),f=l==="assistant"&&(s0(a,c)||d)&&!Vd(a)&&(n||u),h=e0(a,l,i.length,f);if(h&&h!==Ri){let b=qn.get(s);(!b||!Dd(h)||Dd(b))&&h!==b&&qn.set(s,h)}let p=f&&h===Ri?Ri:qn.get(s)||h;i.push({id:s,el:a,role:l,text:p,live:f})}}catch{}return l0(i),i}function d0(){let e=document.getElementById("page-header")?.getBoundingClientRect().height??0;return Math.min(Math.max(e,48),88)}function Yd(t){let e=t;for(;e&&e!==document.body&&e!==document.documentElement;){let r=getComputedStyle(e).overflowY;if((r==="auto"||r==="scroll")&&e.scrollHeight>e.clientHeight+8)return e;e=e.parentElement}return window}function m0(t){return t===window?window.innerHeight:t.clientHeight}function f0(t){let e=t instanceof Element?t:t instanceof Node?t.parentElement:null;if(!e)return!1;try{return!!e.closest(qh)}catch{return!1}}function Xd(){Ur!==void 0&&(clearTimeout(Ur),Ur=void 0),Kr?.classList.remove("bloom-bn-flash"),Kr=null}function p0(t){Xd(),t.classList.add("bloom-bn-flash"),Kr=t,Ur=setTimeout(()=>{t.classList.remove("bloom-bn-flash"),Kr===t&&(Kr=null),Ur=void 0},800)}function js(t){if(!K.length)return;let e=Math.max(0,Math.min(t,K.length-1));Di=e,Xr?.querySelectorAll(".bloom-bn-tick").forEach((r,o)=>{r.classList.toggle("bloom-bn-current",o===e)}),Ye?.querySelectorAll(".bloom-bn-item").forEach((r,o)=>{r.classList.toggle("bloom-bn-active",o===e)}),Bi&&(Bi.textContent=`${e+1} / ${K.length}`);let n=Ye?.children[e];if(n instanceof HTMLElement){let r=Ye;if(r){let o=n.offsetTop-r.clientHeight/2+n.offsetHeight/2;r.scrollTop=Math.max(0,o)}}}function Gs(t){let e=K[t];if(!e?.el.isConnected)return;$i=t,Ws=Date.now()+vh,js(t);let n=Gn??Yd(e.el),o=Math.abs(e.el.getBoundingClientRect().top-d0())>xh*m0(n);e.el.scrollIntoView({behavior:o?"auto":"smooth",block:"start"}),zi.store.jumpEffect!=="none"&&p0(e.el)}function Xs(){if(!Ct||!K.length)return;if(Date.now()<Ws&&$i>=0){js($i);return}let t=window.innerHeight*Eh,e=0;for(let n=0;n<K.length;n++){let r=K[n].el;r.isConnected&&r.getBoundingClientRect().top<=t&&(e=n)}js(e)}function g0(t){let e=Yd(t);if(Gn===e&&Vr)return;Vr?.(),Gn=e;let n=e===window?document:e,r=()=>{Xs(),Zs()};n.addEventListener("scroll",r,{passive:!0}),Vr=()=>n.removeEventListener("scroll",r)}function b0(t){Ve?.disconnect(),Ve=null;let e=Gn instanceof HTMLElement?Gn:null;Ve=new IntersectionObserver(()=>Xs(),{root:e,threshold:[0,.15,.4,.75,1]});for(let n of t)n.el.isConnected&&Ve.observe(n.el)}function h0(){if(!document.body)return null;let t=Te;if(t?.isConnected)return t;t=document.createElement("div"),t.id=$d,t.className="bloom-bn-host",t.setAttribute("role","navigation"),t.setAttribute("aria-label","Conversation outline"),t.hidden=!0;let e=document.createElement("div");e.className="bloom-bn-ticks";let n=document.createElement("div");n.className="bloom-bn-menu";let r=document.createElement("div");r.className="bloom-bn-card";let o=document.createElement("div");o.className="bloom-bn-meta";let i=document.createElement("div");return i.className="bloom-bn-list",r.append(o,i),n.appendChild(r),t.append(e,n),document.body.appendChild(t),Te=t,Xr=e,Ye=i,Bi=o,t}function Zd(){let t=Te,e=ji();if(!t||!e||!e.isConnected||K.length<1){t&&(t.hidden=!0);return}let n=e.getBoundingClientRect(),r=jh(e),o=document.getElementById("thread-bottom-container"),i=document.getElementById("page-header"),a=Math.max(n.top+8,i?.getBoundingClientRect().bottom??0,8),s=Math.min(n.bottom-8,o?o.getBoundingClientRect().top-12:window.innerHeight-8),l=s-a;if(l<96||n.width<160){t.hidden=!0;return}let c=t.offsetWidth||Bh,d=n.right-r.right>=c+8?r.right+4:r.right-12-c;d=Math.min(d,n.right-c-8),d=Math.max(8,d);let f=Math.max(8,Math.round(window.innerWidth-d-c));t.hidden=!1,t.style.top=`${Math.round((a+s)/2)}px`,t.style.height="auto",t.style.maxHeight=`${Math.round(l)}px`,t.style.right=`${f}px`,t.style.setProperty("--bloom-bn-cap",`${Math.round(l)}px`)}function Zs(){!Ct||ne||(ne=requestAnimationFrame(()=>{ne=0,Ct&&Zd()}))}function y0(t){let e=["bloom-bn-tick"];return t.role==="assistant"&&e.push("bloom-bn-tick-asst"),t.live&&e.push("bloom-bn-tick-live"),e.join(" ")}function v0(t){let e=Xr,n=Ye;!e||!n||(e.replaceChildren(),n.replaceChildren(),e.classList.toggle("bloom-bn-dense",t.length>yh),t.forEach((r,o)=>{let i=document.createElement("button");i.type="button",i.className=y0(r),i.setAttribute("aria-label",`Go to message ${o+1} of ${t.length}`),i.addEventListener("click",c=>{c.preventDefault(),Gs(o)}),e.appendChild(i);let a=document.createElement("button");a.type="button",a.className=`bloom-bn-item bloom-bn-${r.role}`;let s=document.createElement("span");s.className="bloom-bn-emoji",s.textContent=r.role==="user"?wh:Sh;let l=document.createElement("span");l.className="bloom-bn-label",l.textContent=r.text,l.title=r.text,a.append(s,l),a.addEventListener("click",c=>{c.preventDefault(),Gs(o)}),n.appendChild(a)}))}function x0(t){Xr?.querySelectorAll(".bloom-bn-tick").forEach((e,n)=>{e.classList.toggle("bloom-bn-tick-live",!!t[n]?.live)}),t.forEach((e,n)=>{let o=Ye?.children[n]?.querySelector(".bloom-bn-label");o&&o.textContent!==e.text&&(o.textContent=e.text,o instanceof HTMLElement&&(o.title=e.text))})}function E0(){let t=M();return t===_i?!1:(_i=t,qn.clear(),Yr.clear(),K=[],Xe="",Di=0,$i=-1,Ws=0,re&&t&&(qt.add(t),re=!1),!0)}function w0(t){let e=zi.store.showAssistant!==!1?"1":"0";return`${_i}|${e}|${t.map(n=>n.id).join(",")}`}function Us(){if(!Ct)return;E0();let t=u0(),e=ji();if(!e||t.length<1){K=t,Xe="",Te&&(Te.hidden=!0),Ve?.disconnect(),Ks();return}h0();let n=w0(t);n!==Xe?(K=t,Xe=n,v0(t),g0(e),b0(t)):(K=t,x0(t)),Zd(),Xs(),Ks()}function Ft(){if(Ct){if(document.hidden){pt&&(cancelAnimationFrame(pt),pt=0),Us();return}pt||(pt=requestAnimationFrame(()=>{pt=0,Ct&&Us()}))}}function Ks(){let t=ji();if(!(We&&zs===t&&t?.isConnected)){if(We?.disconnect(),Wr?.disconnect(),zs=t,!t||t===document.body){We=null;return}We=new MutationObserver(()=>Ft()),We.observe(t,{childList:!0,subtree:!0}),Wr=new ResizeObserver(()=>Zs()),Wr.observe(t)}}function S0(t){if(Ct){if(t.type==="post-start"){r0(),Fn=!1,t.conversationId?(re=!1,qt.add(t.conversationId)):re=!0,Ft();return}if(t.type==="post-end"){if(re=!1,t.conversationId)qt.delete(t.conversationId);else{let e=M();e&&qt.delete(e)}Ft()}}}function L0(t){if(!Ct||!K.length||Te?.hidden||t.altKey||t.ctrlKey||t.metaKey||f0(t.target))return;let e=-1;if(t.key==="ArrowDown")e=Di+1;else if(t.key==="ArrowUp")e=Di-1;else if(t.key==="Home")e=0;else if(t.key==="End")e=K.length-1;else if(t.key==="Escape"){document.activeElement?.blur?.();return}else return;t.preventDefault(),Gs(Math.max(0,Math.min(e,K.length-1)))}function T0(){Xd(),Ve?.disconnect(),Ve=null,We?.disconnect(),We=null,zs=null,Wr?.disconnect(),Wr=null,Vr?.(),Vr=null,Gn=null,Te?.remove(),Te=null,Xr=null,Ye=null,Bi=null}var Jd=y({name:"BetterNavigator",description:"Notion-style outline for the open chat. Hover the ticks, click or use \u2191/\u2193 to jump. A dashed tick marks the reply still streaming.",authors:[v.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14"/><path d="M14 7h5M12 12h7M14 17h5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:Os,cleanupSelectors:[`#${$d}`],settings:zi,start(){Ct=!0,_i=M(),w(Os,Rd),Hi=new AbortController;let{signal:t}=Hi;window.addEventListener("keydown",L0,{signal:t}),window.addEventListener("popstate",Ft,{signal:t}),window.visualViewport?.addEventListener("resize",Zs,{signal:t}),document.addEventListener("visibilitychange",()=>{Ct&&(pt&&(cancelAnimationFrame(pt),pt=0),ne&&(cancelAnimationFrame(ne),ne=0),Us())},{signal:t}),Ds=lt(S0),Bs=tt({onTick(){if(Z()){Ft();return}Fn&&!Zr()&&(Fn=!1),Ft()},onFall(e){Wd(e.conversationId),Ft()},onContext(e,n){if(!$(n,e)){qn.clear(),Yr.clear(),Xe="",re=!1;let r=M();for(let o of[...qt])o!==r&&qt.delete(o);Fn=!0}Ft()}}),Ks(),Ft(),hh.debug("navigator started")},stop(){Ct=!1,pt&&cancelAnimationFrame(pt),pt=0,ne&&cancelAnimationFrame(ne),ne=0,Hi?.abort(),Hi=null,Bs?.(),Bs=null,Ds?.(),Ds=null,qt.clear(),re=!1,Fn=!1,Oi=0,T0(),qn.clear(),Yr.clear(),K=[],Xe="",E(Os)},onSettingsChange(){Xe="",Ft()}});var Qd=`.bloom-ts {
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
`;function tm(t,e,n=Date.now()){let r=new Date(t);if(Number.isNaN(r.getTime()))return"";let o=new Date(n),i=r.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(r.toDateString()===o.toDateString()||!e)return i;let s=r.getFullYear()===o.getFullYear();return`${r.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function em(t){try{return new Date(t).toISOString()}catch{return""}}var om=new S("MessageTimestamps"),nm="messageTimestamps",Wi="bloom-ts",rm=1500,C0="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",Un=L({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),Kn=new Map,Qe=!1,gt=0,ke=null,Qs=null,Js=null,Ki=null,Jr=null,Qr=!1,Ze=!1;function im(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function el(){let t=Un.plain.stamps;return t&&typeof t=="object"&&!Array.isArray(t)?{...t}:{}}function am(){let t={...el()};for(let[n,r]of Kn)t[n]=r;let e=Object.keys(t);if(e.length>rm){let n=e.slice(e.length-rm),r={};for(let o of n)r[o]=t[o];Un.store.stamps=r;return}Un.store.stamps=t}var M0=Fl(am,500);function sm(t,e){!t||!e||Kn.get(t)===e||(Kn.set(t,e),M0(),Je())}function A0(t){return t?Kn.get(t)??el()[t]??ni(t)??null:null}function H0(t){Qe&&t.type==="message-time"&&sm(t.messageId,t.createTime)}function N0(t){return(t.getAttribute("data-message-author-role")||t.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function I0(){let t=im();if(!t)return[];let e=[];try{for(let n of t.querySelectorAll("[data-message-id]"))n.closest(C0)||e.push(n)}catch{}return e}function R0(t){try{return!!t.querySelector("time:not(.bloom-ts)")}catch{return!1}}function tl(){if(!Qe)return;let t=Un.store.hideOwnMessages===!0,e=Un.store.showDate!==!1,n=Q();Ze&&!Z()&&(Ze=!1),Ze&&(n?Qr=!1:Ze=!1);let r=Ze?!1:n,o=I0();ke?.disconnect();try{o.forEach((i,a)=>{let s=i.getAttribute("data-message-id")||"",l=N0(i),c=i.querySelector(`:scope > .${Wi}`);if(t&&l==="user"){c?.remove();return}if(R0(i)){c?.remove();return}let u=A0(s);if(!u&&s&&(r||Qr)&&a>=o.length-2&&(u=Date.now(),sm(s,u)),!u){c?.remove();return}let d=tm(u,e);if(!d){c?.remove();return}let f=c;f||(f=document.createElement("time"),f.className=Wi,f.setAttribute("aria-hidden","true"),i.insertBefore(f,i.firstChild)),f.textContent!==d&&(f.textContent=d);let h=em(u);h&&f.getAttribute("datetime")!==h&&f.setAttribute("datetime",h)})}catch(i){om.debug("paint failed",i)}Qr=r,lm()}function Je(){if(Qe){if(document.hidden){gt&&(cancelAnimationFrame(gt),gt=0),tl();return}gt||(gt=requestAnimationFrame(()=>{gt=0,Qe&&tl()}))}}function lm(){let t=im();if(!(ke&&Qs===t&&t?.isConnected)){if(ke?.disconnect(),Qs=t,!t||t===document.body){ke=null;return}ke=new MutationObserver(()=>Je()),ke.observe(t,{childList:!0,subtree:!0})}}var cm=y({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[v.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Wi}`],settings:Un,start(){Qe=!0,w(nm,Qd);let t=el();for(let[e,n]of Object.entries(t))typeof n=="number"&&n>0&&Kn.set(e,n);Js=lt(H0),Ki?.(),Ki=tt({onTick:Je,onFall:Je,onContext(e,n){$(n,e)||(Ze=!0,Qr=!1),Je()}}),Jr?.abort(),Jr=new AbortController,document.addEventListener("visibilitychange",()=>{Qe&&(gt&&(cancelAnimationFrame(gt),gt=0),tl())},{signal:Jr.signal}),lm(),Je(),om.debug("timestamp watch started")},stop(){Qe=!1,gt&&cancelAnimationFrame(gt),gt=0,Jr?.abort(),Jr=null,ke?.disconnect(),ke=null,Qs=null,Ki?.(),Ki=null,Js?.(),Js=null,Ze=!1,Qr=!1,am(),Kn.clear(),document.querySelectorAll(`.${Wi}`).forEach(t=>t.remove()),E(nm)},onSettingsChange:Je});var nl="streamerMode",P0="filter:blur(6px)!important;transition:filter .2s ease",O0="filter:none!important",Wn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],Vn=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function bt(t,e){return t.map(n=>`${n} ${e}`)}var tn=L({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function Yn(t,e=!0){let n=t.join(","),r=t.map(o=>`${o}:hover`).join(",");return`${n}{${P0}}${e?`${r}{${O0}}`:""}`}function um(){let t=[];if(tn.store.conversations!==!1&&(t.push(Yn([...bt(Vn,'a[href^="/c/"]'),...bt(Vn,'a[href*="/c/"]')])),t.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),tn.store.projects!==!1&&(t.push(Yn([...bt(Vn,'a[href*="/project"]'),...bt(Vn,'a[href*="/g/g-p-"]'),...bt(Vn,'[data-testid="project-name"]'),...bt(Vn,'[data-testid="project-link"]')])),t.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),tn.store.headerTitle!==!1&&t.push(Yn(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),tn.store.accountAvatar!==!1&&t.push(Yn([...bt(Wn,"img"),...bt(Wn,'[class*="avatar"]'),...bt(Wn,"[data-bloom-csi-slot]"),"[data-bloom-csi-slot]::after"],!1)),tn.store.accountName!==!1&&t.push(Yn([...bt(Wn,".min-w-0 > .truncate"),...bt(Wn,".min-w-0.flex-1 .truncate")],!1)),tn.store.accountEmail!==!1&&t.push(Yn([...bt(Wn,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),t.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),t.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!t.length){E(nl);return}w(nl,t.join(`
`))}var dm=y({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[v.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"Init",settings:tn,start:um,onSettingsChange:um,stop(){E(nl)}});var mm=`.bloom-gc-panel {
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
}`;var D0=new S("GreetingCustomizer"),Xn="greetingCustomizer",fm="greetingCustomizerUi",to=100,ol=30,$0=120,_0=1e3,F0=50,q0=40,z0=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),eo=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),Ji=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function j0(t){return!!t?.closest(z0)}function hm(t){return!!(j0(t)||t.closest('[data-testid="temporary-chat-label"]')||t.closest("[hidden]")||t.getAttribute("aria-hidden")==="true"||t.classList.contains("sr-only"))}function lo(t){try{for(let e of document.querySelectorAll(t))if(!hm(e))return e}catch{}return null}function rl(t){for(let e of t.split(",").map(n=>n.trim()).filter(Boolean))if(lo(e))return e;return t}var ym=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],V=L({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:iy},greetings:{type:0,description:"Greeting texts",hidden:!0,default:ym},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),zt=!1,Qn=!1,nn=null,Yi,no,Zn,ro,Xi=0,Vi=null,Jn=null,oo=null,io=null,ao=null,Zi=null;function ie(){let t=location.pathname||"/";return t==="/"||t===""}function en(){let t=V.plain.greetings;return Array.isArray(t)?t.filter(e=>typeof e=="string"):ym.slice()}function so(t){return String(t??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function pm(t){V.store.greetings=t.slice(0,ol)}function co(){let t=String(V.store.mode??"refresh");return t==="interval"||t==="manual"?t:"refresh"}function G0(){return V.store.order==="random"?"random":"sequential"}function U0(){return Y(Number(V.store.intervalSec??10),1,3600)*1e3}function K0(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function W0(){return!!lo(Ji)}function Qi(){return!!(lo(Ji)||lo(eo))}function V0(t,e){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),r=[`content:"${t}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),o=W0()?rl(Ji):lo(eo)?rl(eo):rl(Ji),i=e?`${eo}{cursor:pointer!important;user-select:none!important}`:"";return[`${o}{${n}}`,`${o}::before{${r}}`,i,`@media (max-width:768px){${o}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function Y0(t,e){if(t<=0)return 0;if(t===1)return Number(V.plain.index)!==0&&(V.store.index=0),Number(V.plain.lastRandom)!==0&&(V.store.lastRandom=0),0;let n=Number(V.plain.index),r=Number(V.plain.lastRandom);if(!e)return n>=0&&n<t?n:0;if(G0()==="random"){let a=n>=0&&n<t?n:r,s=Math.floor(Math.random()*t),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*t);return V.store.index=s,V.store.lastRandom=s,s}let i=((n>=-1&&n<t?n:-1)+1)%t;return V.store.index=i,i}function oe(t){if(!zt)return;if(!ie()){E(Xn);return}let e=en().map(so).filter(Boolean);if(!e.length){E(Xn);return}let n=Y0(e.length,t),r=e[n]??e[0],o=co()==="manual"&&e.length>1;w(Xn,V0(K0(r),o)),Zi?.()}function il(){Yi!==void 0&&(clearInterval(Yi),Yi=void 0)}function al(){il(),!(!zt||!ie())&&co()==="interval"&&(en().filter(Boolean).length<=1||(Yi=setInterval(()=>oe(!0),U0())))}function sl(){ro!==void 0&&(clearTimeout(ro),ro=void 0),Xi=0}function gm(){if(sl(),!zt||!ie())return;Xi=q0;let t=()=>{if(ro=void 0,!(!zt||!ie())){if(Qi()){co()==="refresh"&&!Qn?(Qn=!0,oe(!0)):oe(!1),al();return}Xi-=1,Xi>0&&(ro=setTimeout(t,F0))}};t()}function ll(){if(nn===!0){Qi()?oe(!1):gm();return}nn=!0,Qn=!1,co()==="refresh"?(Qn=!0,oe(!0)):oe(!1),al(),Qi()||gm()}function cl(){nn=!1,Qn=!1,il(),sl(),E(Xn)}function ta(){Zn===void 0&&(Zn=window.setTimeout(()=>{Zn=void 0,zt&&(ie()?ll():nn!==!1&&cl())},$0))}function X0(){Jn||(Jn=history.pushState.bind(history),oo=history.replaceState.bind(history),io=function(...e){let n=Jn(...e);return ta(),n},ao=function(...e){let n=oo(...e);return ta(),n},history.pushState=io,history.replaceState=ao)}function Z0(){io&&history.pushState===io&&Jn&&(history.pushState=Jn),ao&&history.replaceState===ao&&oo&&(history.replaceState=oo),Jn=null,oo=null,io=null,ao=null}function J0(t){let e=t.target instanceof Element?t.target:null;e&&e.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(ta)}function Q0(t){if(!zt||!ie()||co()!=="manual"||en().filter(Boolean).length<=1)return;let e=t.target instanceof Element?t.target:null;if(!e)return;let n=e.closest(eo);if(!n||hm(n))return;let r=window.getSelection?.();r&&String(r).trim()||oe(!0)}function ty(){no===void 0&&(no=setInterval(()=>{if(!zt)return;let t=ie();if(t!==(nn===!0)){t?ll():cl();return}t&&Qi()&&oe(!1)},_0))}function ey(){no!==void 0&&(clearInterval(no),no=void 0)}function bm(t,e){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=t,n.setAttribute("aria-label",t);let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.75"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("aria-hidden","true");for(let o of e.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),r.appendChild(i)}return n.appendChild(r),n}var ny="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",ry="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function oy(t,e){let n=so(t);return n?n.length>to?`Keep it to ${to} characters.`:en().length+(e?1:0)>ol?`At most ${ol} greetings.`:null:"Enter a greeting."}function iy(t){t.className="bloom-gc-panel";let e="",n=-1,r="",o=-1,i=()=>{let a=en(),s=Number(V.plain.index);t.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let c=document.createElement("textarea");c.className="bloom-gc-input",c.rows=3,c.maxLength=to,c.placeholder="New greeting (line breaks ok)",c.value=e,c.addEventListener("input",()=>{e=c.value,r="";let m=l.querySelector(".bloom-gc-count");m&&(m.textContent=`${so(e).length}/${to}`);let T=l.querySelector(".bloom-gc-error");T&&(T.textContent="")}),l.appendChild(c);let u=document.createElement("div");u.className="bloom-gc-meta";let d=document.createElement("span");d.className="bloom-gc-count",d.textContent=`${so(e).length}/${to}`;let f=document.createElement("span");f.className="bloom-gc-error",f.textContent=r;let h=document.createElement("div");if(h.className="bloom-gc-actions",n>=0){let m=document.createElement("button");m.type="button",m.className="bloom-gc-btn",m.textContent="Cancel",m.addEventListener("click",()=>{n=-1,e="",r="",i()}),h.appendChild(m)}let p=document.createElement("button");if(p.type="button",p.className="bloom-gc-btn bloom-gc-btn-primary",p.textContent=n>=0?"Update":"Add",p.addEventListener("click",()=>{let m=n<0,T=oy(e,m);if(T){r=T,i();return}let A=so(e),N=en().slice();n>=0&&n<N.length?N[n]=A:N.push(A),pm(N),n=-1,e="",r="",i()}),h.appendChild(p),u.append(d,f,h),l.appendChild(u),t.appendChild(l),!a.length){let m=document.createElement("p");m.className="bloom-gc-empty",m.textContent="No greetings. The official heading stays.",t.appendChild(m);return}let b=document.createElement("div");b.className="bloom-gc-list",a.forEach((m,T)=>{let A=document.createElement("div");A.className="bloom-gc-item",T===s&&(A.dataset.active="true");let N=document.createElement("button");N.type="button",N.className=`bloom-gc-body${o===T?"":" bloom-gc-clamp"}`,N.textContent=m,N.addEventListener("click",()=>{o=o===T?-1:T,i()});let Ut=document.createElement("div");Ut.className="bloom-gc-item-actions";let Mt=bm("Edit",ny);Mt.addEventListener("click",()=>{n=T,e=m,r="",i()});let nt=bm("Delete",ry);nt.addEventListener("click",()=>{let R=en().filter((it,Kt)=>Kt!==T);pm(R),n===T?(n=-1,e=""):n>T&&(n-=1),i()}),Ut.append(Mt,nt),A.append(N,Ut),b.appendChild(A)}),t.appendChild(b)};return Zi=i,i(),()=>{Zi===i&&(Zi=null),t.replaceChildren()}}var vm=y({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:fm,settings:V,start(){zt=!0,w(fm,mm),X0(),Vi=new AbortController;let{signal:t}=Vi;window.addEventListener("popstate",ta,{signal:t}),document.addEventListener("click",J0,{capture:!0,signal:t}),document.addEventListener("click",Q0,{signal:t}),ty(),nn=null,ie()?ll():cl(),D0.debug("started")},stop(){zt=!1,Vi?.abort(),Vi=null,Zn!==void 0&&(clearTimeout(Zn),Zn=void 0),il(),sl(),ey(),Z0(),E(Xn),Qn=!1,nn=null},onSettingsChange(){zt&&(ie()?(oe(!1),al()):E(Xn))}});function ay(t){let e=/^data:([^;,]+)?(;base64)?,(.*)$/s.exec(t);if(!e)return null;let n=e[1]||"application/octet-stream",r=!!e[2],o=e[3]||"";try{if(r){let i=atob(o),a=new Uint8Array(i.length);for(let s=0;s<i.length;s++)a[s]=i.charCodeAt(s);return new Blob([a],{type:n})}return new Blob([decodeURIComponent(o)],{type:n})}catch{return null}}async function ea(t){try{return await createImageBitmap(t)}catch{return null}}async function sy(t){try{let e=new Image;return e.decoding="async",await new Promise((n,r)=>{e.onload=()=>n(),e.onerror=()=>r(new Error("img")),e.src=t}),await createImageBitmap(e)}catch{return null}}async function na(t){if(t.startsWith("data:")){let e=ay(t);if(e){let n=await ea(e);if(n)return n}return sy(t)}try{let e=await fetch(t,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});return e.ok?ea(await e.blob()):null}catch{return null}}var oa="data-bloom-csi-slot",ly="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-plugin-layer, #bloom-plugin-dialog",cy=/\bsize-(?:[6-9]|10)\b/,uy=/\b(?:h|w)-(?:[6-9]|10)\b/,dy=/^(plus|pro|free|team|go|business|enterprise)$/i,my=['[class*="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-6"]','[class~="h-7"]','[class~="h-8"]','[class~="h-9"]','[class~="h-10"]','[class~="w-6"]','[class~="w-7"]','[class~="w-8"]','[class~="w-9"]','[class~="w-10"]'].join(",");function ra(t){return t.getAttribute("class")||""}function Em(t){return/(?:^|\s)(?:rounded-full|avatar)(?:\s|$)/i.test(t)||/avatar/i.test(t)||cy.test(t)?!0:uy.test(t)&&/\bh-(?:[6-9]|10)\b/.test(t)&&/\bw-(?:[6-9]|10)\b/.test(t)}function fy(t){let e=String(t??"").replace(/\s+/g,"");return e.length>=1&&e.length<=3&&!wm(e)}function wm(t){return dy.test(String(t??"").replace(/\s+/g,""))}function jt(t){return!!t?.closest(ly)}function ia(t){return t.classList.contains("min-w-0")||t.classList.contains("truncate")?!0:!!t.querySelector(".min-w-0, .truncate")}function uo(t){let e=ra(t);return/\btext-xs\b/.test(e)||/text-token-text-secondary/.test(e)||/text-token-text-tertiary/.test(e)?!0:wm(t.textContent||"")}function aa(t){let e=t.tagName;return e==="IMG"||e==="VIDEO"||e==="CANVAS"||e==="IFRAME"}function mo(t){return t.tagName==="BUTTON"||t.getAttribute("role")==="button"}function py(t){return/\bflex\b/.test(t)&&!/\bflex-col\b/.test(t)}function Sm(t){if(jt(t)||aa(t)||mo(t)||uo(t)||ia(t))return!1;let e;try{e=t.getBoundingClientRect()}catch{return!1}return e.width<16||e.width>80||e.height<16||e.height>80?!1:Math.abs(e.width-e.height)<12}function Lm(t){return jt(t)||aa(t)||mo(t)||uo(t)||t.querySelector("img, svg, .min-w-0, .truncate")?!1:fy(t.textContent||"")}function Tm(t){return jt(t)||mo(t)||ia(t)||uo(t)?!1:Em(ra(t))||Lm(t)?!0:Sm(t)}function xm(t){return!(jt(t)||ia(t)||mo(t)||uo(t)||aa(t))}function rn(t,e){let n=aa(t)||t.tagName==="SVG"?t.parentElement:t,r=null;for(;n&&e.contains(n)&&n!==e&&!(mo(n)||ia(n)||uo(n));)jt(n)||(r=n),n=n.parentElement;return r}function gy(t){for(let e of t.querySelectorAll(".min-w-0")){if(!(e instanceof HTMLElement)||jt(e))continue;if(py(ra(e))){let r=[];for(let o of e.children)if(!(!(o instanceof HTMLElement)||!xm(o))){if(Tm(o)||Em(ra(o)))return rn(o,t)??o;r.push(o)}if(r.length===1)return rn(r[0],t)??r[0]}let n=e.parentElement;if(!(!n||!t.contains(n))){for(let r of n.children)if(!(!(r instanceof HTMLElement)||r===e)&&xm(r))return rn(r,t)??r}}return null}function by(t){let e=t.querySelectorAll(my);for(let n of e)if(Tm(n))return rn(n,t)??n;return null}function hy(t){for(let e of t.querySelectorAll("span, div, p, i"))if(Lm(e))return rn(e,t)??e;return null}function yy(t){for(let e of t.querySelectorAll("*"))if(Sm(e))return rn(e,t)??e;return null}function km(t,e){if(jt(t))return null;if(e&&!jt(e)&&t.contains(e)){let n=rn(e,t);if(n)return n}return gy(t)??by(t)??hy(t)??yy(t)}function Cm(t){return["img",`[${t}]`,`[${t}] > *`,'[class~="rounded-full"]','[class*="avatar"]','[class~="size-6"]','[class~="size-7"]','[class~="size-8"]','[class~="size-9"]','[class~="size-10"]','[class~="h-8"]','[class~="w-8"]']}var tr="data-bloom-csi",sa="data-bloom-csi-orig",on=new Set,Mm=null;function dl(t){Mm=t}function Am(t){return`url(${JSON.stringify(t)})`}function la(t,e){return`${t}{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:${e}px!important;height:${e}px!important;min-width:${e}px!important;min-height:${e}px!important;max-width:${e}px!important;max-height:${e}px!important;padding:0!important;border-radius:999px!important;overflow:hidden!important;flex-shrink:0!important}`}function ml(t,e,n){let r=Am(e);return`${t}{box-sizing:border-box!important;width:${n}px!important;height:${n}px!important;min-width:${n}px!important;min-height:${n}px!important;max-width:${n}px!important;max-height:${n}px!important;padding:0!important;border-radius:999px!important;object-fit:none!important;object-position:-99999px -99999px!important;background-image:${r}!important;background-size:${n}px ${n}px!important;background-position:center!important;background-repeat:no-repeat!important;background-origin:border-box!important;background-clip:border-box!important;overflow:hidden!important;flex-shrink:0!important}`}function Hm(t,e=oa){let n=Am(t);return`[${e}]{position:relative!important;overflow:hidden!important;border-radius:999px!important;color:transparent!important;font-size:0!important;line-height:0!important;background-color:transparent!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important}[${e}] *,[${e}]::before{color:transparent!important;font-size:0!important;visibility:hidden!important}[${e}]::after{content:""!important;position:absolute!important;inset:0!important;border-radius:inherit!important;background-image:${n}!important;background-size:cover!important;background-position:center!important;pointer-events:none!important;z-index:1!important;visibility:visible!important}`}function vy(t){t.hasAttribute("srcset")&&t.removeAttribute("srcset"),t.hasAttribute("sizes")&&t.removeAttribute("sizes"),t.srcset="",t.sizes="",t.removeAttribute("crossorigin");let e=t.parentElement;if(e?.tagName==="PICTURE")for(let n of e.querySelectorAll("source"))n.removeAttribute("srcset"),n.removeAttribute("src")}function er(t){t.removeEventListener("error",ul);let e=t.getAttribute(sa);t.removeAttribute(tr),t.removeAttribute(sa),e&&t.getAttribute("src")!==e&&(t.src=e)}function ul(t){let e=t.currentTarget;if(!(e instanceof HTMLImageElement))return;let n=e.getAttribute("src")??"";n&&on.add(n),er(e),Mm?.()}function Nm(t,e){if(!e||on.has(e)){er(t);return}vy(t);let n=t.getAttribute("src")??"";if(t.getAttribute(tr)==="1"){if(n===e)return}else n&&n!==e&&!t.hasAttribute(sa)&&t.setAttribute(sa,n);t.setAttribute(tr,"1"),t.referrerPolicy="no-referrer",t.removeEventListener("error",ul),t.addEventListener("error",ul),n!==e&&(t.src=e)}var Im=`/*
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
`;var Rm=new S("CustomSidebarIdentity"),Pm="customSidebarIdentityUi",Dm="customSidebarIdentity",Ey="bloom-csi-face",wy="bloom-csi-name",nr=oa,Sy=1024,ca=256,$m=24,_m=64,Fm=40,bl=1,hl=4,fo=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],fl=['[role="menu"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'],x=L({displayName:{type:0,description:"Display name next to the sidebar avatar. Empty fields keep the official name.",default:""},avatarPanel:{type:5,description:"Image URL, data:image\u2026, or paste a picture. Drag the circle to crop.",render:qy},avatarUrl:{type:0,description:"Baked avatar",hidden:!0,default:""},avatarSource:{type:0,description:"Crop source",hidden:!0,default:""},cropX:{type:1,description:"Crop center X",hidden:!0,default:.5},cropY:{type:1,description:"Crop center Y",hidden:!0,default:.5},cropZoom:{type:1,description:"Crop zoom",hidden:!0,default:1},avatarSize:{type:4,description:"Sidebar avatar diameter in pixels when the sidebar is expanded. Official size is 32. Collapsed rail stays 32.",min:$m,max:_m,default:Fm},applyToMenu:{type:2,description:"Also replace the avatar and name at the top of the account dropdown.",default:!0}});function sn(t,e){return typeof t=="number"&&Number.isFinite(t)?t:e}function Ly(){return String(x.store.displayName??"").trim()}function ma(t,e,n,r,o){let i=Y(n,bl,hl),a=Math.min(t,e)/i,s=Y(r,a/2,Math.max(a/2,t-a/2)),l=Y(o,a/2,Math.max(a/2,e-a/2));return{z:i,side:a,x:s,y:l}}function Ty(t,e,n){let r=document.createElement("canvas");r.width=e,r.height=n;let o=r.getContext("2d");if(!o)return null;o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(t,0,0,e,n);let i=r.toDataURL("image/png");return i.startsWith("data:image/")?i:null}function yl(t){let e=Math.min(1,Sy/Math.max(t.width,t.height));return Ty(t,Math.max(1,Math.round(t.width*e)),Math.max(1,Math.round(t.height*e)))}function ky(t,e,n,r){let{side:o,x:i,y:a}=ma(t.width,t.height,r,e*t.width,n*t.height),s=document.createElement("canvas");s.width=ca,s.height=ca;let l=s.getContext("2d");if(!l)return null;l.imageSmoothingEnabled=!0,l.imageSmoothingQuality="high",l.drawImage(t,i-o/2,a-o/2,o,o,0,0,ca,ca);let c=s.toDataURL("image/png");return c.startsWith("data:image/")?c:null}async function Cy(t){let e=await ea(t);if(!e)return null;let n=yl(e);return e.close(),n}async function xl(t,e,n,r){let o=await na(t);if(!o)return null;let i=ky(o,e,n,r);return o.close(),i}function El(){x.store.cropX=.5,x.store.cropY=.5,x.store.cropZoom=1}function Om(){x.store.avatarUrl="",x.store.avatarSource="",El()}var Bm=0;async function vl(t){let e=++Bm;El(),x.store.avatarSource=t;let n=await xl(t,.5,.5,1);return e!==Bm?!1:(n&&(x.store.avatarUrl=n),!!n)}function po(t){if(!t)return null;for(let e of t.files)if(e.type.startsWith("image/"))return e;for(let e of t.items)if(e.kind==="file"&&e.type.startsWith("image/"))return e.getAsFile();return null}async function pl(t){let e=po(t);if(!e)return!1;let n=await Cy(e);return n?vl(n):!1}var ht=!1,rr=!1,or=0,fa=0,ua=null,Ce=new Map,ir=null,ae=null,pa=null,Gt=null,ga=null;function ba(t){let e=String(t??"").trim();if(!e||on.has(e))return null;if(e.startsWith("data:image/"))return e;try{let{protocol:n}=new URL(e);if(n==="https:"||n==="http:")return e}catch{return null}return null}function qm(){return ba(x.store.avatarUrl)??ba(x.store.avatarSource)}var da=!1,gl=new Set;function zm(){let t=ba(x.store.avatarSource);if(!t?.startsWith("data:image/")||ba(x.store.avatarUrl)?.startsWith("data:image/")||da||gl.has(t))return;da=!0;let e=sn(x.store.cropX,.5),n=sn(x.store.cropY,.5),r=sn(x.store.cropZoom,1);xl(t,e,n,r).then(o=>{if(da=!1,!o){gl.add(t);return}ht&&(x.store.avatarUrl=o,ha())}).catch(()=>{da=!1,gl.add(t)})}function an(t,e){return t.map(n=>`${n} ${e}`)}function My(t){return String(t??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Ay(t,e){let n=t.map(o=>`html body ${o}`).join(","),r=My(e);return[`${n}{font-size:0!important;line-height:0!important;color:transparent!important;visibility:visible!important;display:block!important;position:static!important;width:auto!important;height:auto!important;max-width:100%!important;overflow:hidden!important}`,`${n}::before{content:"${r}"!important;font-size:.875rem!important;font-weight:500!important;line-height:1.25!important;color:var(--text-primary,inherit)!important;visibility:visible!important;display:block!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}`].join("")}function jm(t){let e=[];for(let n of t.querySelectorAll("img"))!(n instanceof HTMLImageElement)||jt(n)||n.closest(".min-w-0")||e.push(n);return e}function Hy(t){let e=jm(t);return e.length?e.find(r=>/rounded-full|avatar/i.test(r.className)||!!r.getAttribute("alt"))??e[0]:null}function wl(){let t=[],e=He();e&&t.push(e);let n=gn();if(n&&!t.some(r=>n.contains(r)||r.contains(n))){let r=n.querySelector(fo.join(","))??n.querySelector("button, a, [role='button']")??n;r&&!t.includes(r)&&t.push(r)}return t}function Gm(t,e){let n=Hy(t);if(n)Nm(n,e);else for(let o of jm(t))er(o);let r=km(t,n);for(let o of t.querySelectorAll(`[${nr}]`))o!==r&&o.removeAttribute(nr);r&&r.setAttribute(nr,"")}function Ny(t){let e=t.firstElementChild;return!(e instanceof HTMLElement)||e.getAttribute("role")?.startsWith("menuitem")?null:e}function Iy(t,e){let n=Ny(t);n&&Gm(n,e)}function Ry(){for(let t of document.querySelectorAll(`img[${tr}]`))er(t);for(let t of document.querySelectorAll(`[${nr}]`))t.removeAttribute(nr)}function Py(){let t=Y(Math.round(sn(x.store.avatarSize,Fm)),$m,_m),e=qm(),n=Ly(),r=x.store.applyToMenu!==!1,o=[],i=[...an(fo,"img"),"#stage-sidebar-tiny-bar img"];r&&i.push(...an(fl,"> :first-child img"));let a=[...an(fo,".min-w-0 > .truncate"),...an(fo,".min-w-0.flex-1 .truncate")];r&&a.push(...an(fl,"> :first-child .truncate"));let s=Cm(nr);o.push(la([...s.flatMap(l=>an(fo,l))].join(","),t)),o.push(la(s.map(l=>`#stage-sidebar-tiny-bar ${l}`).join(","),32)),r&&o.push(la(s.flatMap(l=>an(fl,`> :first-child ${l}`)).join(","),t)),e&&(o.push(ml(i.join(","),e,t)),o.push(ml("#stage-sidebar-tiny-bar img",e,32)),o.push(Hm(e))),n&&o.push(Ay(a,n)),w(Dm,o.join(""))}function Oy(){let t=qm(),e=wl();for(let n of e)Gm(n,t);if(x.store.applyToMenu!==!1){let n=bn();n&&Iy(n,t)}for(let n of document.querySelectorAll(`img[${tr}]`))e.some(r=>r.contains(n))||n.closest("[role='menu'], [data-radix-menu-content], [data-radix-dropdown-menu-content]")||er(n)}function ha(){if(!(!ht||rr)){rr=!0;for(let t of Ce.values())t.disconnect();ae?.disconnect(),Gt?.disconnect();try{Py(),Oy()}finally{rr=!1,Sl(),_y(),ir?.isConnected&&Um(ir),zm()}}}function go(){!ht||or||(or=requestAnimationFrame(()=>{or=0,ha()}))}function By(){rr||!ht||go()}function Dy(t){if(Ce.has(t))return;let e=new MutationObserver(By);e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}),Ce.set(t,e)}function $y(t){Ce.get(t)?.disconnect(),Ce.delete(t)}function Sl(){let t=new Set;for(let n of wl())t.add(n),n.parentElement&&t.add(n.parentElement);let e=gn();e&&t.add(e);for(let n of[...Ce.keys()])(!t.has(n)||!n.isConnected)&&$y(n);for(let n of t)n.isConnected&&Dy(n)}function _y(){let t=Io();if(!t){Gt?.disconnect(),Gt=null,pa=null;return}if(pa===t&&Gt){Gt.observe(t,{childList:!0});return}Gt?.disconnect(),pa=t,Gt=new MutationObserver(()=>{rr||!ht||(Sl(),go())}),Gt.observe(t,{childList:!0})}function Um(t){ir===t&&ae||(ae?.disconnect(),ir=t,ae=new MutationObserver(()=>{if(!t.isConnected){ae?.disconnect(),ae=null,ir=null;return}rr||!ht||go()}),ae.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset","sizes"]}))}function Km(t){if(!ht||x.store.applyToMenu===!1)return;let e=bn();if(e){Um(e),go();return}t<=0||requestAnimationFrame(()=>Km(t-1))}function Wm(t){ht&&(ha(),!(wl().length||t<=0)&&(fa=requestAnimationFrame(()=>Wm(t-1))))}function Fy(t){ht&&x.store.applyToMenu!==!1&&(!Ro(t)&&!bn()||Km(10))}function qy(t){t.className="bloom-csi-panel";let e=!1,n=null,r=null,o={px:0,py:0,x:0,y:0,on:!1},i={x:.5,y:.5,zoom:1},a=null,s=document.createElement("img");s.className="bloom-csi-preview",s.alt="",s.referrerPolicy="no-referrer";let l=document.createElement("input");l.type="text",l.className="bloom-csi-url",l.spellcheck=!1;let c=document.createElement("button");c.type="button",c.className="bloom-csi-btn",c.textContent="Clear";let u=document.createElement("div");u.className="bloom-csi-avatar",u.append(s,l,c);let d=document.createElement("p");d.className="bloom-csi-hint";let f=document.createElement("div");f.className="bloom-csi-crop";let h=document.createElement("div");h.className="bloom-csi-stage";let p=document.createElement("img");p.className="bloom-csi-stage-img",p.alt="",p.draggable=!1,h.appendChild(p);let b=document.createElement("div");b.className="bloom-csi-zoom-row";let m=document.createElement("input");m.type="range",m.className="bloom-csi-zoom",m.min=String(bl),m.max=String(hl),m.step="0.05",m.setAttribute("aria-label","Zoom");let T=document.createElement("span");T.className="bloom-csi-zoom-val";let A=document.createElement("button");A.type="button",A.className="bloom-csi-btn",A.textContent="Reset",b.append(m,T,A);let N=document.createElement("p");N.className="bloom-csi-hint",N.textContent="Drag to pan \xB7 scroll to zoom. Circle matches the sidebar crop.",f.append(h,b,N),t.append(u,d,f);function Ut(){let g=String(x.store.avatarSource??""),C=String(x.store.avatarUrl??"");return g.startsWith("data:image/")?g:C.startsWith("data:image/")?C:""}function Mt(g,C,H){if(!a)return i.x=g,i.y=C,i.zoom=Y(H,bl,hl),i;let J=ma(a.w,a.h,H,g*a.w,C*a.h);return i.x=J.x/a.w,i.y=J.y/a.h,i.zoom=J.z,i}function nt(){m.value=String(i.zoom),T.textContent=`${Math.round(i.zoom*100)}%`;let g=a?ma(a.w,a.h,i.zoom,i.x*a.w,i.y*a.h):null;g&&a&&(p.style.width=`${a.w/g.side*100}%`,p.style.height=`${a.h/g.side*100}%`,p.style.left=`${(.5-g.x/g.side)*100}%`,p.style.top=`${(.5-g.y/g.side)*100}%`)}function R(g=!1){let C=Ut(),H=String(x.store.avatarUrl??"").trim(),J=!!C;s.hidden=!H&&!C,(C||H)&&(s.src=C||H),document.activeElement!==l&&(l.value=J?"":H),l.placeholder=J?"Pasted image. Drag the circle to crop, or type a URL to replace.":"Paste a picture, or https://\u2026",f.hidden=!C,d.hidden=!(e&&/^https?:\/\//.test(H)&&!C),d.textContent=d.hidden?"":"Remote image cannot be cropped (CORS). Paste or drop it instead.",C&&(g&&(i.x=sn(x.store.cropX,.5),i.y=sn(x.store.cropY,.5),i.zoom=sn(x.store.cropZoom,1)),p.getAttribute("src")!==C&&(a=null,p.onload=()=>{a={w:p.naturalWidth,h:p.naturalHeight},Mt(i.x,i.y,i.zoom),nt()},p.src=C),nt())}function it(g,C,H,J=!1){Mt(g,C,H),nt();let Al=Ut(),Hl=()=>{x.store.cropX=i.x,x.store.cropY=i.y,x.store.cropZoom=i.zoom,Al&&xl(Al,i.x,i.y,i.zoom).then(Nl=>{Nl&&(x.store.avatarUrl=Nl)})};r&&clearTimeout(r),J?Hl():r=setTimeout(Hl,80)}function Kt(g){x.store.avatarUrl=g;let C=g.trim();if(n&&clearTimeout(n),!C){x.store.avatarSource="",El(),e=!1,R(!0);return}if(C.startsWith("data:image/")){e=!1,n=setTimeout(()=>{na(C).then(H=>{if(!H)return;let J=yl(H);H.close(),J&&vl(J).then(()=>R(!0))})},80);return}if(/^https?:\/\//.test(C)){e=!1,x.store.avatarSource="",n=setTimeout(()=>{na(C).then(H=>{if(!H){e=!0,R(!0);return}let J=yl(H);H.close(),J?(e=!1,vl(J).then(()=>R(!0))):(e=!0,R(!0))})},400);return}e=!1,x.store.avatarSource="",R(!0)}u.addEventListener("paste",g=>{po(g.clipboardData)&&(g.preventDefault(),e=!1,pl(g.clipboardData).then(()=>R(!0)))}),u.addEventListener("dragover",g=>{po(g.dataTransfer)&&g.preventDefault()}),u.addEventListener("drop",g=>{po(g.dataTransfer)&&(g.preventDefault(),e=!1,pl(g.dataTransfer).then(()=>R(!0)))}),l.addEventListener("change",()=>Kt(l.value)),l.addEventListener("paste",g=>{po(g.clipboardData)&&(g.preventDefault(),e=!1,pl(g.clipboardData).then(()=>R(!0)))}),l.addEventListener("keydown",g=>{Ut()&&!l.value&&(g.key==="Backspace"||g.key==="Delete")&&(Om(),e=!1,R(!0))}),c.addEventListener("click",()=>{Om(),e=!1,R(!0)}),h.addEventListener("pointerdown",g=>{g.button===0&&(h.setPointerCapture(g.pointerId),o.on=!0,o.px=g.clientX,o.py=g.clientY,o.x=i.x,o.y=i.y)}),h.addEventListener("pointermove",g=>{if(!o.on||!a)return;let C=h.clientWidth;if(!C)return;let{side:H}=ma(a.w,a.h,i.zoom,o.x*a.w,o.y*a.h);Mt(o.x-(g.clientX-o.px)*(H/C)/a.w,o.y-(g.clientY-o.py)*(H/C)/a.h,i.zoom),nt()}),h.addEventListener("pointerup",()=>{o.on&&(o.on=!1,it(i.x,i.y,i.zoom,!0))}),h.addEventListener("pointercancel",()=>{o.on=!1}),h.addEventListener("wheel",g=>{g.preventDefault(),it(i.x,i.y,i.zoom*(g.deltaY<0?1.08:1/1.08))},{passive:!1}),m.addEventListener("input",()=>it(i.x,i.y,Number(m.value))),m.addEventListener("change",()=>it(i.x,i.y,Number(m.value),!0)),A.addEventListener("click",()=>it(.5,.5,1,!0));let Ml=()=>R(!1);return ga=Ml,R(!0),()=>{ga===Ml&&(ga=null),n&&clearTimeout(n),r&&clearTimeout(r),t.replaceChildren()}}var Vm=y({name:"CustomSidebarIdentity",description:"Replace the sidebar avatar and display name. Empty fields keep the official values.",authors:[v.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"/><path d="M2.5 20.2C3.4 16.4 6.4 14 10 14c.9 0 1.8.2 2.6.5"/><path d="M16.8 13.9 21 18.1l-4.6 4.6-2.9.8.8-2.9z"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Pm,cleanupSelectors:[`.${Ey}`,`.${wy}`],settings:x,start(){ht=!0,on.clear(),dl(go),w(Pm,Im),ua=new AbortController,document.addEventListener("click",Fy,{signal:ua.signal}),Wm(40),zm(),Rm.debug("started")},onSettingsChange(){on.clear(),ga?.(),ht&&(Sl(),ha())},stop(){ht=!1,ua?.abort(),ua=null,or&&cancelAnimationFrame(or),or=0,fa&&cancelAnimationFrame(fa),fa=0;for(let t of Ce.values())t.disconnect();Ce.clear(),ae?.disconnect(),ae=null,ir=null,Gt?.disconnect(),Gt=null,pa=null,Ry(),E(Dm),dl(null),on.clear(),Rm.debug("stopped")}});var ar=new S("Bloom"),Ym=!1,zy=Date.now(),jy=[Mc,xu,Au,Iu,Du,zu,ed,rd,ad,bd,Sd,Hd,Id,Jd,cm,dm,vm,Vm];function ya(t){return new Promise(e=>setTimeout(e,t))}function Gy(){return document.head?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.head&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}function Uy(){return document.body?Promise.resolve():new Promise(t=>{let e=!1,n=()=>{e||document.body&&(e=!0,clearInterval(r),t())},r=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{e||(e=!0,clearInterval(r),t())},15e3)})}var Zm=8e3,Xm=300,Ky=250;async function Wy(){if(Ae())return await ya(Xm),!0;for(;Date.now()-zy<Zm;)if(await ya(Ky),Ae())return await ya(Xm),!0;return Ae()||Ta()}function Ll(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function Vy(){if(Ll())return!0;let t=Date.now()+Zm;for(;Date.now()<t;)if(await ya(100),Ll())return!0;return Ll()}function Yy(){try{GM_registerMenuCommand?.("Bloom++ settings",Cc)}catch{}}function Xy(){To(()=>{lr("HostShell"),ar.info("host shell",at)}),ko(()=>{ar.info("idle ready",at)}),Co(()=>{xa(),lr("HostReady"),ar.info("chrome ready",at)})}async function Tl(){await ql()}async function kl(){if(Ym)return;Ym=!0;for(let n of jy)try{Xl(n),sc(n)}catch(r){ar.error("register failed",n.name,r)}Ql(),lr("Init"),Yy(),Xy();let t=()=>lr("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):t(),await Gy(),xa(),ar.info("styles ready",at),await Uy(),Vy().then(n=>{n&&Mo()}),!await Wy()){ar.warn("late islands not detected; starting default plugins",at),mn(),Ao();return}await ic()}var Jm=typeof unsafeWindow<"u"?unsafeWindow:window,Zy=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||Zy){let t=Jm.Bloom;t&&console.warn("[Bloom++] replacing previous instance",t.VERSION??"(unknown)","\u2192",at);try{Object.defineProperty(Jm,"Bloom",{value:Cl,writable:!1,configurable:!0})}catch(e){console.warn("[Bloom++] could not replace window.Bloom",e)}Tl().then(()=>kl()).catch(e=>console.error("[Bloom++] Fatal init error:",e))}})();
