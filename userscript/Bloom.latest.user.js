// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260920] v1.4.45
// @description  Void++-style plugin host for chatgpt.com. Tab favicon, input history, recent chats, reply notify, next-prompt queue, Recents status, wider thread, message times, streamer blur, custom home greeting, hide Share, Dictation, sidebar name, Download apps, upgrade CTAs, and ads.
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

/* Bloom++ [20260920] v1.4.45. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var pc=Object.defineProperty;var gc=(e,t)=>{for(var n in t)pc(e,n,{get:t[n],enumerable:!0})};var Gi={};gc(Gi,{REPO_URL:()=>ya,Settings:()=>g,VERSION:()=>F,contextKeyFromUrl:()=>ne,conversationTitle:()=>mt,conversationToken:()=>D,currentConversationId:()=>$,hasDraftText:()=>te,hasErrorToast:()=>z,hasLateIslands:()=>$e,init:()=>Fi,initSettings:()=>ji,isDocumentInteractive:()=>va,isStreaming:()=>M,isUserDraftEmpty:()=>ke,messageCreateTime:()=>$o,plugins:()=>J,requestChromeReady:()=>ho,requestIdleReady:()=>ot,requestShellReady:()=>go,setEditorText:()=>fe,subscribeHarvest:()=>re,watchStreamingEdge:()=>Ae,whenChromeReady:()=>po,whenIdleReady:()=>fo,whenShellReady:()=>mo});var ve=new Map,no=!1;function hc(){return document.getElementById("bloom-root")?.shadowRoot??null}function bc(){return document.head??null}function tt(){let e=hc();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=yc()}function hr(e,t){if(!no)return;let n=bc();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),tt();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,tt();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,tt()}function w(e,t){let n=ve.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},ve.set(e,n)),no&&hr(e,n)}function zi(){no=!0;for(let[e,t]of ve)hr(e,t);return tt(),!0}function Ki(e){let t=ve.get(e);t&&(t.disabled=!1,no&&hr(e,t))}function Ui(e){let t=ve.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),tt())}function y(e){let t=ve.get(e);t&&(t.el?.remove(),ve.delete(e),tt())}function yc(){return Array.from(ve.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var v=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function h(e){return e}var br=new Map;function oo(e,t){let n=br.get(e);return n||(n=new Set,br.set(e,n)),n.add(t),()=>n.delete(t)}function De(e,t){let n=br.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var vc="bloompp";function Vi(){return new Promise((e,t)=>{let n=indexedDB.open(vc,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function Wi(e){try{let t=await Vi();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function Yi(e,t){try{let n=await Vi();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function Wt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function de(e,t,n){return Math.min(n,Math.max(t,e))}function Xi(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function Ji(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}function Zi(e,t){let n;return((...o)=>{n&&clearTimeout(n),n=setTimeout(()=>e(...o),t)})}var ro=new v("SettingsStore"),xe="BloomSettings",xc=100;function ao(e){if(Wt(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(Wt(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return Wt(n)?n:null}return null}catch{return null}}var io=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let c=n?`${n}.${a}`:a;for(let[l,d]of this.defaultGetters)if(c.startsWith(l)){let u=c.slice(l.length+1);if(u&&!u.includes(".")){let m=d(u);m!==void 0&&(i[a]=m,s=m);break}}}return Wt(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let c=n?`${n}.${a}`:a;return this.notifyListeners(c),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){ro.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},xc))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(xe,this.plain)}catch{try{GM_setValue(xe,t)}catch(n){ro.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(xe,t)}catch{}Yi(xe,t).catch(n=>ro.warn("Failed to save settings to IndexedDB:",n))}catch(t){ro.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){Xi(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var wc=new v("Settings"),Ec={plugins:{}},g=new io(structuredClone(Ec)),Sc=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function Tc(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function x(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(g.store.plugins[n]||(g.store.plugins[n]={}),g.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?g.plain.plugins[n]??{}:{}}};return t}function Lc(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function Qi(){let e=null;if(e=ao(Lc(xe)),e||(e=ao(await Wi(xe))),!e)try{e=ao(localStorage.getItem(xe))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(g.plain.plugins=t),wc.debug("Loaded settings")}}function ea(e,t){t&&(t.pluginName=e,g.plain.plugins[e]||(g.plain.plugins[e]={}),g.setDefaultGetter(Sc(e),n=>{if(n!=="enabled")return Tc(t.def,n)}))}function ta(){return g.plain.plugins.Settings||(g.store.plugins.Settings={}),g.store.plugins.Settings}function so(){return ta().pinnedPlugins??[]}function na(e){return so().includes(e)}function oa(e){let t=so(),n=t.includes(e);return g.store.plugins.Settings={...g.plain.plugins.Settings,pinnedPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}function lo(){return ta().starredPlugins??[]}function ra(e){return lo().includes(e)}function ia(e){let t=lo(),n=t.includes(e);return g.store.plugins.Settings={...g.plain.plugins.Settings,starredPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}var co=new v("PluginManager"),J={},Yt=new Set;function la(e){if(J[e.name]){co.warn("Duplicate plugin",e.name);return}J[e.name]=e,ea(e.name,e.settings)}function nt(e){let t=J[e];if(!t)return!1;if(t.required)return!0;let n=g.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function ca(e){let t=J[e];if(!t||t.required)return;let n=!nt(e);g.plain.plugins[e]||(g.store.plugins[e]={}),g.store.plugins[e].enabled=n,n?da(t):kc(t),De("pluginToggle",{name:e,enabled:n})}function da(e,t=!1){if(!Yt.has(e.name)&&nt(e.name))try{e.managedStyle&&Ki(e.managedStyle),e.start?.(),Yt.add(e.name),e.settings&&g.addPrefixChangeListener(`plugins.${e.name}.`,()=>{Yt.has(e.name)&&e.onSettingsChange?.()}),t||co.debug("Started",e.name)}catch(n){co.error("Failed to start",e.name,n)}}function kc(e){if(Yt.has(e.name)){try{e.stop?.()}catch(t){co.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(Ui(e.managedStyle),y(e.managedStyle)),Yt.delete(e.name)}}function Xt(e){for(let t of Object.values(J))(t.startAt??"DOMContentLoaded")===e&&da(t)}var aa=2,sa="defaultsRev";function ua(){for(let t of Object.values(J))g.plain.plugins[t.name]||(g.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=g.store.plugins.Settings??(g.store.plugins.Settings={});if(e[sa]!==aa){for(let t of["NoShareLink","NoDictation"]){let n=g.store.plugins[t]??(g.store.plugins[t]={});n.enabled=!1}e[sa]=aa}}var Jt=!1,uo=!1,yr=!1,fa=[],pa=[],ga=[];function vr(e){let t=e.splice(0);for(let n of t)n()}function Zt(){Jt||(Jt=!0,vr(fa))}function xr(){uo||(uo=!0,Jt||Zt(),vr(pa))}function ha(){yr||(yr=!0,Jt||Zt(),uo||xr(),vr(ga))}function mo(e){Jt?e():fa.push(e)}function fo(e){uo?e():pa.push(e)}function po(e){yr?e():ga.push(e)}function go(){Zt()}function ot(){Zt(),xr()}function ho(){ha()}function ma(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function ba(){await ma(4e3),Zt(),await ma(4e3),xr(),ha()}var b={p:"0-V-linuxdo"},F="[20260920] v1.4.45",ya="https://github.com/0-V-linuxdo/Bloom";function Cc(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Mc(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function wr(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function $e(){return wr()?Cc()||Mc():!1}function va(){return $e()}var Ac=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),xa=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Pc=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Hc="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function it(e){return e.id==="bloom-root"||!!e.closest(Hc)}function wa(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function bo(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function Er(e){if(!(e instanceof HTMLElement)||!e.isConnected||it(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&bo(t)?!1:e.getClientRects().length>0}function rt(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Rc(){let e=[];for(let t of document.querySelectorAll(Ac))!(t instanceof HTMLElement)||!t.isConnected||it(t)||e.push(t);return e}function yo(e){if(!e.isConnected||it(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function Qt(){return Rc().filter(yo)[0]??null}function Sr(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||it(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function Tr(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!it(n)&&!rt(n)&&n.parentElement&&!rt(n.parentElement)&&(t=n);let o=t.parentElement;if(o&&!rt(o)&&!it(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!rt(o.parentElement))return o}return t}function Ea(){let e=document.querySelectorAll(xa);for(let n of e)if(Er(n)&&!bo(n)&&wa(n))return n;let t=document.querySelectorAll(Pc);for(let n of t){if(!Er(n)||!wa(n)||bo(n))continue;let o=n.querySelector(xa);return Er(o)&&!bo(o)?o:n}return null}function Sa(){let e=Qt();if(e){let t=Tr(e),n=t.parentElement;if(n&&!rt(n))return n;if(!rt(t))return t}return Sr()}function Ta(e){let t=Qt();return t?e.composedPath().includes(t):!1}var kr=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Nc={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Cr(e){return e==="auto"||e==="light"||e==="dark"}function Ic(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Oc(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function Lr(e){let t=Ic(e);return t?Oc(t)>.55?"light":"dark":null}function Bc(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=Lr(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=Lr(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Lr(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function La(e){return e==="auto"?Bc():e}function Dc(e){try{let t=getComputedStyle(document.documentElement);for(let n of kr){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function ka(e,t,n){let o=Nc[t];if(n){Dc(e);for(let r of kr)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of kr)e.style.setProperty(r,o[r])}function Ca(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var Mr=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
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

.bloom-appearance-row {
  padding: 0 0 0.25rem;
}

.bloom-appearance-row select {
  max-width: 9rem;
}
`;var _c="bloom-root",Z="bloom-rail-item",So="bloom-account-item",qe="bloom-sidebar-panel",un="bloom-plugin-dialog",Ao="bloom-plugin-layer",To="bloom-settings-css",qc=2e3,sn=x({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),Pa=null,jc=null,Te=!1,Rr=[],vo=null,Lo=null,Ee=null,wo=null,ue=null,ln=null,en,at=0,cn=0,tn=0,nn=null,on=null,ko=null,Ha=null,rn=null,Ar=[],Co=!1,Fc=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Gc=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],Po="",dn="all",Le="all";function Ho(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Ra(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function zc(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function Kc(e){let t='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return e?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${t}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`}function Uc(e){let t='<path d="M12 17v5"/>';return e?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var Vc={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',ResponseNotification:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',PromptQueue:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function Wc(e){return e.icon||Vc[e.name]||Ho()}function Na(){return Cr(sn.store.appearance)?sn.store.appearance:"auto"}function Yc(){let e=document.createElement("div");e.className="bloom-field bloom-appearance-row";let t=document.createElement("span");t.className="bloom-field-label",t.textContent="Appearance";let n=document.createElement("select");n.setAttribute("aria-label","Appearance");let o=sn.def.appearance,r=o.type===3?o.options??[]:[];for(let i of r){let a=document.createElement("option");a.value=i.value,a.textContent=i.label,n.appendChild(a)}return n.value=Na(),n.addEventListener("change",()=>{Cr(n.value)&&(sn.store.appearance=n.value)}),e.append(t,n),e}function Pr(e,t,n){e&&(e.setAttribute("data-bloom-scheme",t),ka(e,t,n),e.style.removeProperty("--bloom-rail-surface"))}function Ia(e){e&&(e.style.removeProperty("--bloom-rail-surface"),e.style.removeProperty("--bg-primary"))}function an(){let e=Na(),t=La(e),n=e==="auto";Pr(Pa,t,n);let o=document.getElementById(qe);o instanceof HTMLElement&&Pr(o,t,n);let r=document.getElementById(un);r instanceof HTMLElement&&Pr(r,t,n);let i=document.getElementById(Z);i instanceof HTMLElement&&Ia(i),De("schemeChange",{scheme:t,pref:e})}function Oa(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(e=>e.remove())}function Ba(){if(w("settings",Mr),document.getElementById(To)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=To,e.textContent=Mr,document.head.appendChild(e)}function Xc(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Jc(){for(let e of Rr)e();Rr=[]}function Da(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function Zc(e){return e.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,t=>t.toUpperCase())}function Or(e){return e.settings?Object.entries(e.settings.def).filter(([,t])=>!t.hidden):[]}function Qc(e){return Or(e).length>0}function Eo(e){if(e.default!==void 0)return e.default;if(e.type===3)return(e.options?.find(n=>n.default)??e.options?.[0])?.value;if(e.type===2)return!1;if(e.type===4)return e.min??0;if(e.type===0)return"";if(e.type===1)return 0}function ed(e,t){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let o=document.createElement("span");if(o.className="bloom-plugin-dialog-label-title",o.textContent=Zc(e),n.appendChild(o),t.description){let r=document.createElement("span");r.className="bloom-plugin-dialog-label-desc",r.textContent=t.description,n.appendChild(r)}return n}function td(e,t,n){if(n.hidden)return null;let o=n.type===4||n.type===0||n.type===1||n.type===5,r=document.createElement("div");r.className=o?"bloom-field bloom-field-stack":"bloom-field",r.appendChild(ed(t,n));let i=g.store.plugins[e]??(g.store.plugins[e]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",Rr.push(n.render(a)),r.appendChild(a),r}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let c=document.createElement("option");c.value=s.value,c.textContent=s.label,a.appendChild(c)}return a.value=String(i[t]??Eo(n)??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),r.appendChild(a),r}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??Eo(n)??n.min??0);let c=document.createElement("span");return c.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),c.textContent=s.value}),a.append(s,c),r.appendChild(a),r}if(n.type===2){let a=Da(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),r.appendChild(a),r}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[t]??Eo(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[t]=n.type===1?Number(a.value):a.value}),r.appendChild(a),r}return r}function Ma(e,t){let n=document.createElement("div");n.className=t?`bloom-plugin-dialog-field ${t}`:"bloom-plugin-dialog-field";let o=document.createElement("div");return o.className="bloom-plugin-dialog-field-label",o.textContent=e,n.appendChild(o),n}function nd(e){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let t=g.store.plugins[e.name]??(g.store.plugins[e.name]={});for(let[n,o]of Or(e)){if(n==="enabled"||o.type===5)continue;let r=Eo(o);r!==void 0&&(t[n]=r)}_a(e)}function $a(e){e.key==="Escape"&&(!document.getElementById(Ao)&&!document.getElementById(un)||(e.stopPropagation(),st()))}function od(){Co||(document.addEventListener("keydown",$a),Co=!0)}function rd(){Co&&(document.removeEventListener("keydown",$a),Co=!1)}function st(){Jc(),rd(),document.getElementById(Ao)?.remove(),document.getElementById(un)?.remove()}function _a(e){if(st(),!document.body)return;let t=document.createElement("div");t.id=Ao,t.className="bloom-plugin-layer",t.addEventListener("pointerdown",Se),t.addEventListener("pointerup",Se),t.addEventListener("click",d=>{d.stopPropagation(),d.target===t&&st()});let n=document.createElement("div");n.id=un,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",Se),n.addEventListener("pointerup",Se),n.addEventListener("click",Se);let o=document.createElement("button");o.type="button",o.className="bloom-icon-btn bloom-plugin-dialog-close",o.setAttribute("aria-label","Close"),o.innerHTML=Ra(),o.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),st()});let r=document.createElement("div");r.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=e.name,r.appendChild(i),e.description){let d=document.createElement("p");d.className="bloom-plugin-dialog-sub",d.textContent=e.description,r.appendChild(d)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(o,r,a),e.authors?.length){let d=Ma("Authors"),u=document.createElement("p");u.className="bloom-plugin-dialog-authors",u.textContent=e.authors.join(", "),d.appendChild(u),n.appendChild(d)}let s=Ma("Settings","bloom-plugin-dialog-settings"),c=document.createElement("div");c.className="bloom-plugin-dialog-settings-list";let l=Or(e);if(l.length)for(let[d,u]of l){let m=td(e.name,d,u);m&&c.appendChild(m)}if(!c.childElementCount){let d=document.createElement("p");d.className="bloom-dialog-empty",d.textContent="No configurable settings.",c.appendChild(d)}if(s.appendChild(c),n.appendChild(s),l.length){let d=document.createElement("div");d.className="bloom-plugin-dialog-footer";let u=document.createElement("button");u.type="button",u.className="bloom-plugin-dialog-reset",u.textContent="Reset",u.addEventListener("click",()=>nd(e)),d.appendChild(u),n.appendChild(d)}t.appendChild(n),document.body.appendChild(t),od(),an()}function id(e){let t=document.createElement("div");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Wc(e);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=e.name,a.title=e.name,r.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let c=ra(e.name),l=document.createElement("button");if(l.type="button",l.className=`bloom-icon-btn bloom-card-star${c?" bloom-card-star-active":""}`,l.setAttribute("aria-label",c?"Remove from favorites":"Add to favorites"),l.innerHTML=Kc(c),l.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation();let f=ia(e.name);De("pluginStar",{name:e.name,starred:f})}),s.appendChild(l),!e.required){let p=na(e.name),f=document.createElement("button");f.type="button",f.className=`bloom-icon-btn bloom-card-pin${p?" bloom-card-pin-active":""}`,f.setAttribute("aria-label",p?"Unpin from top":"Pin to top"),f.innerHTML=Uc(p),f.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();let B=oa(e.name);De("pluginPin",{name:e.name,pinned:B})}),s.appendChild(f)}if(Qc(e)){let p=document.createElement("button");p.type="button",p.className="bloom-icon-btn bloom-card-settings",p.setAttribute("aria-label",`${e.name} settings`),p.innerHTML=zc(),p.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),_a(e)}),s.appendChild(p)}let d=Da(e.name,nt(e.name),!!e.required),u=d.querySelector("input");if(u?.addEventListener("click",p=>p.stopPropagation()),u?.addEventListener("change",()=>{ca(e.name)}),s.appendChild(d),o.append(r,s),n.appendChild(o),e.description){let p=document.createElement("div");p.className="bloom-card-desc",p.textContent=e.description,n.appendChild(p)}let m=document.createElement("div");m.className="bloom-card-separator";let S=document.createElement("div");S.className="bloom-card-footer";let E=document.createElement("div");return E.className="bloom-card-author",E.textContent=e.authors?.filter(Boolean).join(", ")||"\xA0",S.appendChild(E),t.append(n,m,S),t}function qa(){return Object.values(J).filter(e=>!e.hidden&&e.name!=="Settings")}function ja(e,t){return t==="all"||t==="favorites"?!0:(e.tags??[]).includes(t)}function ad(e){return`${e.name} ${e.description??""} ${(e.tags??[]).join(" ")}`.toLowerCase()}function sd(){return Po.trim()?"No plugins match your search.":Le==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function ld(){let e=qa();return Gc.filter(t=>t.id==="favorites"||t.id==="all"?!0:e.some(n=>ja(n,t.id)))}function cd(){if(rn){rn.replaceChildren();for(let e of ld()){let t=document.createElement("button");t.type="button",t.className=`bloom-plugin-tab${Le===e.id?" bloom-plugin-tab-active":""}`,t.textContent=e.label,t.addEventListener("click",()=>{Le=e.id,_e()}),rn.appendChild(t)}}}function dd(){let e=qa();if(Le==="favorites"){let t=new Set(lo());e=e.filter(n=>t.has(n.name))}else Le!=="all"&&(e=e.filter(t=>ja(t,Le)));return dn==="enabled"&&(e=e.filter(t=>nt(t.name))),dn==="disabled"&&(e=e.filter(t=>!nt(t.name))),e}function _e(){if(!nn)return;cd();let e=dd();ko&&(ko.placeholder=`Search ${e.length} plugins...`);let t=e,n=Po.trim().toLowerCase();if(n&&(t=t.filter(o=>ad(o).includes(n))),Le!=="favorites"){let o=so();if(o.length){let r=new Map(o.map((i,a)=>[i,a]));t=t.slice().sort((i,a)=>{let s=r.has(i.name),c=r.has(a.name);return s!==c?s?-1:1:s?(r.get(i.name)??0)-(r.get(a.name)??0):i.name.localeCompare(a.name)})}}nn.replaceChildren();for(let o of t)nn.appendChild(id(o));on&&(on.hidden=t.length>0,on.textContent=sd())}function Se(e){e.stopPropagation()}function Hr(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function Br(){document.getElementById(Z)?.setAttribute("aria-expanded",Te?"true":"false")}function ud(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function Dr(){st(),Po="",dn="all",Le="all",document.getElementById(qe)?.remove(),Te=!1,Br()}function md(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",Se),t.addEventListener("pointerup",Se),t.addEventListener("click",Se);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-titles";let i=document.createElement("div");i.className="bloom-settings-brand";let a=document.createElement("span");a.className="bloom-settings-mark",a.innerHTML=Ho();let s=document.createElement("h2");s.textContent="Bloom++",i.append(a,s);let c=document.createElement("p");c.className="bloom-settings-sub",c.textContent="Toggle features. Some need a reload. Click the sliders icon to configure.",r.append(i,c);let l=document.createElement("button");l.type="button",l.className="bloom-icon-btn",l.setAttribute("aria-label","Close"),l.innerHTML=Ra(),l.addEventListener("click",Dr),o.append(r,l),n.appendChild(o),n.appendChild(Yc());let d=document.createElement("div");d.className="bloom-plugin-tabs",n.appendChild(d);let u=document.createElement("div");u.className="bloom-search-bar";let m=document.createElement("input");m.type="search",m.className="bloom-search-input",m.setAttribute("aria-label","Search plugins"),m.placeholder="Search plugins...",m.addEventListener("input",()=>{Po=m.value,_e()});let S=document.createElement("select");S.className="bloom-search-filter",S.setAttribute("aria-label","Filter plugins");for(let f of Fc){let T=document.createElement("option");T.value=f.value,T.textContent=f.label,S.appendChild(T)}S.value=dn,S.addEventListener("change",()=>{dn=S.value,_e()}),u.append(m,S),n.appendChild(u);let E=document.createElement("div");E.className="bloom-plugin-list",n.appendChild(E);let p=document.createElement("p");return p.className="bloom-tab-empty",p.hidden=!0,n.appendChild(p),t.appendChild(n),nn=E,on=p,ko=m,Ha=S,rn=d,_e(),t}function fd(e){e.classList.add("bloom-rail-dock")}function pd(){let e=document.getElementById(Z);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&yo(e)?e:null}function gd(){if(document.getElementById(qe)?.remove(),!document.body)return;let e=md(qe);fd(e),document.body.appendChild(e),Te=!0,st(),an(),Br(),De("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:F,dock:"center",rail:!!pd()})}function $r(){let e=document.getElementById(qe);if(e instanceof HTMLElement&&e.isConnected&&ud(e)){Dr();return}e?.remove(),gd()}function hd(){let e=document.createElement("button");return e.type="button",e.id=Z,e.className="bloom-rail-item",e.setAttribute("aria-controls",qe),e.setAttribute("aria-expanded",Te?"true":"false"),e.innerHTML=`<span class="bloom-rail-mark">${Ho()}</span><span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),$r()}),e}function Aa(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function bd(e){let t=e.querySelector("img");if(t instanceof HTMLElement){let n=t.getBoundingClientRect();if(n.width>8&&n.height>8)return t}for(let n of e.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}return null}function yd(e,t){for(let n of e.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||t&&(n===t||n.contains(t)||t.contains(n))||(n.textContent||"").trim().length<2)continue;let r=n.getBoundingClientRect();if(r.width>16&&r.height>8&&r.height<40)return n}return null}function we(e,t,n){let o=`${n}px`;e.style.getPropertyValue(t)!==o&&e.style.setProperty(t,o)}function Fa(e,t){if(e.classList.contains("bloom-rail-compact"))return;let n=e.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!e.isConnected||!t.isConnected)return;let o=bd(t),r=getComputedStyle(t),i=Number.parseFloat(r.paddingTop),a=Number.parseFloat(r.paddingBottom);if(Number.isFinite(i)&&we(e,"padding-top",Math.round(i)),Number.isFinite(a)&&we(e,"padding-bottom",Math.round(a)),o){let s=o.getBoundingClientRect(),c=Math.max(20,Math.round(s.width));we(n,"width",c),we(n,"height",Math.max(20,Math.round(s.height)));let l=e.getBoundingClientRect(),d=Math.round(s.left-l.left);d>=0&&d<=40&&we(e,"padding-left",d);let u=yd(t,o);if(u){let m=u.getBoundingClientRect(),S=n.getBoundingClientRect(),E=Math.round(m.left-S.right);E>=0&&E<=24&&we(e,"gap",E)}}else{let s=Number.parseFloat(r.paddingLeft),c=Number.parseFloat(r.columnGap||r.gap);Number.isFinite(s)&&we(e,"padding-left",Math.round(s)),Number.isFinite(c)&&c>0&&we(e,"gap",Math.round(c))}Ia(e)}function Nr(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function vd(){if(ln?.isConnected&&ue){ue.observe(ln,{childList:!0});return}Ir()}function xd(e){if(Nr(e))return!1;try{if(e.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function wd(e,t){!t||!e||requestAnimationFrame(()=>{if(e.isConnected){tn=0;return}tn+=1,cn=Date.now()+Math.min(8e3,250*2**Math.min(tn,5))})}function Ed(){at||Date.now()<cn||(at=requestAnimationFrame(()=>{at=0,!(Date.now()<cn)&&(document.getElementById(Z)?.isConnected||Mo())}))}function Mo(){if(!document.body)return;ue?.disconnect();let e=null,t=!1;try{let n=document.getElementById(Z);e=n instanceof HTMLButtonElement?n:hd();let o=Qt(),r=Sr();if(o){let i=Tr(o),a=i.parentElement;if(Nr(i)||a&&Nr(a))return;e.isConnected&&e.nextElementSibling===i||(i.before(e),t=!0),Aa(e),Fa(e,o)}else r?(e.parentElement!==r&&(r.appendChild(e),t=!0),Aa(e,!0)):e.isConnected&&!yo(e)&&(e.remove(),e=null)}finally{wd(e,t),vd(),Br()}}function Ir(){let e=Sa();!e||!xd(e)||ln===e&&ue||(ue?.disconnect(),ln=e,ue=new MutationObserver(()=>{document.getElementById(Z)?.isConnected||Ed()}),ue.observe(e,{childList:!0}))}function Sd(){Mo(),Ir(),en===void 0&&(en=window.setInterval(()=>{let e=document.getElementById(Z);if(!(e instanceof HTMLElement)||!e.isConnected)Date.now()>=cn&&Mo();else{tn=0;let t=Qt();t&&Fa(e,t)}Ir()},qc))}function Td(){en!==void 0&&(clearInterval(en),en=void 0),at&&cancelAnimationFrame(at),at=0,cn=0,tn=0,ue?.disconnect(),ue=null,ln=null}function Ld(e){wo===e&&Ee||(Ee?.disconnect(),wo=e,Ee=new MutationObserver(()=>{if(!e.isConnected){Ee?.disconnect(),Ee=null,wo=null;return}Ga(e)}),Ee.observe(e,{childList:!0}))}function Ga(e){if(Ld(e),e.querySelector(`#${So}`))return;let t=document.createElement("button");t.type="button",t.id=So,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${Ho()}<span>Bloom++</span>`,t.addEventListener("pointerdown",Hr),t.addEventListener("pointerup",Hr),t.addEventListener("click",n=>{Hr(n),$r()}),e.insertBefore(t,e.firstChild)}function xo(){let e=Ea();return e?(Ga(e),!0):!1}function kd(e){Ta(e)&&(queueMicrotask(xo),requestAnimationFrame(()=>{xo()}),window.setTimeout(xo,60),window.setTimeout(xo,180))}function Cd(){Lo?.abort();let e=new AbortController;Lo=e,document.addEventListener("click",kd,{signal:e.signal})}function Md(){Lo?.abort(),Lo=null,Ee?.disconnect(),Ee=null,wo=null}function za(){ot(),Xc(()=>{Ba(),Oa(),Mo(),$r()})}var Ka=h({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[b.p],required:!0,hidden:!0,enabledByDefault:!0,settings:sn,startAt:"HostReady",cleanupSelectors:[`#${_c}`,`#${Z}`,`#${So}`,`#${qe}`,`#${Ao}`,`#${un}`,`#${To}`,"#bloom-menu-panel"],start(){Ba(),Oa(),Sd(),Cd(),vo?.(),vo=Ca(an),an(),Ar=[oo("pluginToggle",()=>{Te&&_e()}),oo("pluginPin",()=>{Te&&_e()}),oo("pluginStar",()=>{Te&&_e()})]},stop(){Td(),Md(),vo?.(),vo=null;for(let e of Ar)e();Ar=[],Dr(),document.getElementById(Z)?.remove(),document.getElementById(So)?.remove(),document.getElementById(To)?.remove(),Pa=null,jc=null,nn=null,on=null,ko=null,Ha=null,rn=null,Te=!1},onSettingsChange:an});var Ro='form[data-type="unified-composer"], form.w-full[data-type]',Q=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),lt=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Ua=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Va=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Ad=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Pd='[contenteditable="false"], button, [role="button"]';function G(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function je(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!G(r)))return r;return null}function Wa(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function L(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=Wa(e);return!!(Ad.test(n)||/^stop$/i.test(n))}function ee(){let t=Array.from(document.querySelectorAll(Ro)).find(G);if(t instanceof HTMLElement)return t;let n=je(document,Q),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function O(){let e=Array.from(document.querySelectorAll(Q));return e.find(G)??e[0]??null}function Hd(e,t){if(!e||e===t||!t.contains(e))return!1;let n=e.closest(Pd);return!!n&&n!==t&&t.contains(n)}function _r(e,t){let n=[];try{let o=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),r=o.nextNode();for(;r;){let i=r.parentElement;i&&Hd(i,t)||n.push(r.textContent??""),r=o.nextNode()}}catch{return e.innerText??e.textContent??""}return n.join("")}function te(e){let t=e??O();return t?_r(t,t).replaceAll("\u200B","").trim().length>0:!1}function ke(e){return!te(e)}function mn(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function Ya(e){let t=ee();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!G(n))&&e(n))return n;return null}function me(){let e=ee(),t=je(e,lt)??je(document,lt);return t&&!L(t)?t:Ya(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!L(n);let r=Wa(n);return/^(send|send prompt|发送)$/i.test(r)&&!L(n)})}function qr(){let e=me();return!!e&&mn(e)}function jr(){let e=ee(),t=je(e,Ua,!0)??je(document,Ua,!0);if(t)return t;let n=je(e,Va)??je(document,Va);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&G(o)&&L(o))return o}return Ya(L)}function j(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>_r(n,e)).join(`
`):_r(e,e)}function Fr(e,t=!1){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function fe(e,t,n=!1){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r);try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch{e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),Fr(e,n)}var Xa="bloom-host-icon",fn="data-bloom-host-rel",Gr="not all",zr=0,Ja=0,Rd=400;function Za(e){zr+=1;try{e()}finally{zr-=1}}function No(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function ct(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function Qa(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function Nd(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Id(e,t){if(e.lastElementChild===t)return;let n=Date.now();n-Ja<Rd||(Ja=n,e.appendChild(t))}function Od(e,t){for(let n of e.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===t||No(n)&&(n.getAttribute(fn)||n.setAttribute(fn,n.rel),n.media!==Gr&&(n.media=Gr),n.rel!==Xa&&(n.rel=Xa))}function Bd(e){for(let t of e.querySelectorAll(`link[${fn}]`)){if(!(t instanceof HTMLLinkElement))continue;let n=t.getAttribute(fn);n&&(t.rel=n),t.removeAttribute(fn),t.media===Gr&&t.removeAttribute("media")}}function Kr(e,t){let{head:n}=document;!n||!t||Za(()=>{Od(n,e);let o=Qa(e),{type:r,sizes:i}=Nd(t);o?Id(n,o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function es(e,t){let{head:n}=document;n&&Za(()=>{Qa(e)?.remove(),Bd(n)})}function ts(e,t){let{head:n}=document;if(!n)return null;let o=0,r=new MutationObserver(i=>{if(zr)return;let a=!1,s;for(let c of i){c.type==="attributes"&&c.target instanceof HTMLLinkElement&&(c.target.id===e?a=!0:No(c.target)&&(a=!0,ct(c.target.href)&&(s=c.target.href)));for(let l of c.removedNodes)No(l)&&l.id===e&&(a=!0);for(let l of c.addedNodes)No(l)&&l.id!==e&&(a=!0,ct(l.href)&&(s=l.href))}a&&(o||(o=requestAnimationFrame(()=>{o=0,t(s)})))});return r.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),r}var ns=/\/c\/([a-zA-Z0-9_-]{8,})/i;function D(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=l=>{let d=n.indexOf(l);return d>=0&&n[d+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(l,d)=>{try{return document.querySelector(l)?.getAttribute(d)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function ne(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function dt(e){if(!e)return"";try{return(/^https?:/i.test(e)?new URL(e,location.origin).pathname:e).match(ns)?.[1]??""}catch{return e.match(ns)?.[1]??""}}function $(){let e=dt(location.pathname);if(e)return e;let n=D().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return""}var as=new v("Harvest"),Dd=1500,$d=200,Io=new Set,Oo=new Map,Bo=new Map,ut=null,Do=null,pn=null,oe=0;function _d(){return typeof unsafeWindow<"u"?unsafeWindow:window}function qd(e){try{if(typeof e=="string")return e;if(e instanceof URL)return e.href;if(typeof Request<"u"&&e instanceof Request)return e.url}catch{}return String(e)}function jd(e,t){let n=t?.method,o=typeof Request<"u"&&e instanceof Request?e.method:"";return(n||o||"GET").toUpperCase()}function ss(e){return/\/backend-api\/conversations(?:\/|\?|$)/i.test(e)}function Fd(e,t){return t!=="POST"||ss(e)?!1:/\/backend-api\/(?:f\/)?conversation(?:\/|\?|$)/i.test(e)}function Gd(e,t){return t!=="GET"||ss(e)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(e)}function os(e){return e.match(/\/backend-api\/(?:f\/)?conversation\/([a-zA-Z0-9_-]{8,})/i)?.[1]??""}function ls(e){return e?e.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function zd(e){return typeof e=="string"?ls(e):""}function Ur(e){if(typeof e=="number"&&Number.isFinite(e)&&e>0)return e>1e12?e:Math.round(e*1e3);if(typeof e=="string"){let t=e.trim();if(!t)return null;if(/^\d+(\.\d+)?$/.test(t))return Ur(Number(t));let n=Date.parse(t);return Number.isFinite(n)?n:null}return null}function cs(e,t){if(e.size<=t)return;let n=e.size-t,o=0;for(let r of e.keys())if(e.delete(r),++o>=n)break}function rs(e,t,n){!e||!t||Bo.get(e)!==t&&(Bo.set(e,t),cs(Bo,Dd),Ce({type:"message-time",messageId:e,createTime:t,conversationId:n}))}function Kd(e,t){let n=t.trim();!e||!n||Oo.get(e)!==n&&(Oo.set(e,n),cs(Oo,$d),Ce({type:"conversation-meta",conversationId:e,title:n}))}function gn(e,t,n=0){if(n>6||!e||typeof e!="object")return;if(Array.isArray(e)){for(let c of e)gn(c,t,n+1);return}let o=e,r=typeof o.conversation_id=="string"&&o.conversation_id||typeof o.conversationId=="string"&&o.conversationId||t;typeof o.title=="string"&&r&&!o.author&&!o.content&&!o.role&&Kd(r,o.title);let i=o.message;if(i&&typeof i=="object"&&!Array.isArray(i)){let c=i,l=typeof c.id=="string"?c.id:"",d=Ur(c.create_time??c.createTime??c.created_at);l&&d&&rs(l,d,r)}let a=typeof o.id=="string"?o.id:"",s=Ur(o.create_time??o.createTime??o.created_at);if(a&&s&&(o.author||o.content||o.role||o.create_time||o.createTime)&&rs(a,s,r),o.mapping&&typeof o.mapping=="object")gn(o.mapping,r,n+1);else if(n<3)for(let c of Object.values(o))c&&typeof c=="object"&&gn(c,r,n+1)}function is(e,t){if(e)try{gn(JSON.parse(e),t)}catch{}}function Ce(e){for(let t of Array.from(Io))try{t(e)}catch{}}async function Ud(e,t,n){if(n===oe)try{let o=await e.json();if(n!==oe)return;gn(o,t)}catch{}}async function Vd(e,t,n,o){let r=t,i=n,a=e.body;if(!a){o===oe&&Ce({type:"post-end",conversationId:r,error:i});return}let s=a.getReader(),c=new TextDecoder,l="";try{for(;o===oe;){let{done:d,value:u}=await s.read();if(d)break;if(l+=c.decode(u,{stream:!0}),!r){let S=ls(l);S&&(r=S,Ce({type:"post-start",conversationId:r,url:""}))}let m=l.split(`
`);l=m.pop()??"";for(let S of m){let E=S.replace(/^data:\s*/,"").trim();!E||E==="[DONE]"||is(E,r)}/\[DONE\]/.test(l)||/"error"\s*:\s*\{/.test(l)?(/"error"\s*:\s*\{/.test(l)&&(i=!0),l=l.slice(-64)):l.length>16384&&(l=l.slice(-4096))}l&&o===oe&&is(l.replace(/^data:\s*/,""),r)}catch{i=!0}finally{try{s.cancel()}catch{}}o===oe&&Ce({type:"post-end",conversationId:r,error:i})}function Wd(e,t,n){let o=qd(t),r=jd(t,n),i=Gd(o,r),a=Fd(o,r),s=oe,c="";return a&&(c=zd(n?.body)||os(o)||dt(o)||$(),Ce({type:"post-start",conversationId:c,url:o})),e(t,n).then(l=>{if(s!==oe||!i&&!a)return l;try{let d=l.clone();i?Ud(d,os(o)||$(),s):Vd(d,c,!l.ok,s)}catch{a&&Ce({type:"post-end",conversationId:c,error:!l.ok})}return l},l=>{throw a&&s===oe&&Ce({type:"post-end",conversationId:c,error:!0}),l})}function Yd(){if(ut)return;let e=_d();pn=e,ut=e.fetch.bind(e);let t=(n,o)=>Wd(ut,n,o);Do=t,e.fetch=t,as.debug("conversation fetch harvest hooked")}function Xd(){oe+=1,!(!ut||!pn)&&(Do&&pn.fetch===Do&&(pn.fetch=ut),ut=null,Do=null,pn=null,as.debug("conversation fetch harvest unhooked"))}function re(e){return Io.add(e),Yd(),()=>{Io.delete(e),Io.size===0&&Xd()}}function mt(e){return e?Oo.get(e)??"":""}function $o(e){return e?Bo.get(e)??null:null}var ms=new v("Streaming");function Jd(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!G(t))&&(L(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function Zd(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&G(e))}function Qd(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&G(e))}function eu(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function z(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function M(){if(jr()||Jd()||eu())return!0;let e=me();return e&&G(e)&&!L(e)?!1:!!(Zd()||Qd())}var tu=400,ds=3,ze=new Set,bn,yn=null,Vr=null,Ge=!1,Fe=0,Me="",ie="",vn=!1,xn=!1,wn=!1;function fs(){return ne(D())}function us(e,t){return{streaming:e,contextKey:t,conversationId:$()}}function nu(e,t){if(!e||e===t)return!1;if(e.endsWith("|draft")&&!t.endsWith("|draft"))return!0;try{let n=e.split("|")[0],o=t.split("|")[0],r=new URL(n).pathname.replace(/\/$/,"")||"/",i=new URL(o).pathname.replace(/\/$/,"")||"/";if((r==="/"||r==="")&&i.startsWith("/c/"))return!0}catch{}return!1}function Wr(){Ge=!1,Fe=0,Me="",vn=!1,xn=!1,wn=!1}function ou(e){for(let t of Array.from(ze))try{t.onFall?.(e)}catch{}}function ru(e){for(let t of Array.from(ze))try{t.onRise?.(e)}catch{}}function hn(e){for(let t of Array.from(ze))try{t.onTick?.(e)}catch{}}function iu(e,t){for(let n of Array.from(ze))try{n.onContext?.(e,t)}catch{}}function au(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest("button");n instanceof HTMLElement&&L(n)&&(vn=!0)}function su(e){e.type==="post-end"&&Ge&&(wn=!0,e.error&&(xn=!0))}function lu(){let e=fs(),t=M();if(ie&&e&&ie!==e){if(iu(e,ie),!nu(ie,e)){Wr(),ie=e,hn(us(t,e));return}Me===ie&&(Me=e)}ie=e;let n=us(t,e);if(t){let i=!Ge;i&&(vn=!1,xn=!1,wn=!1),Ge=!0,Fe=0,Me=e,i&&ru(n),hn(n);return}if(!Ge){hn(n);return}if(Fe+=1,wn&&(Fe=Math.max(Fe,ds)),Fe<ds){hn(n);return}let o=!!Me&&Me===e,r={contextKey:Me||e,conversationId:$(),userStopped:vn,error:xn||z()};Wr(),o&&ou(r),hn(n)}function cu(){bn===void 0&&(Ge=M(),ie=fs(),Me=Ge?ie:"",Fe=0,vn=!1,xn=!1,wn=!1,yn?.abort(),yn=new AbortController,document.addEventListener("click",au,{capture:!0,signal:yn.signal}),Vr=re(su),bn=setInterval(lu,tu),ms.debug("watchStreamingEdge started"))}function du(){ze.size||(bn!==void 0&&(clearInterval(bn),bn=void 0),yn?.abort(),yn=null,Vr?.(),Vr=null,Wr(),ie="",ms.debug("watchStreamingEdge stopped"))}function Ae(e){let t=typeof e=="function"?{onFall:e}:e;return ze.add(t),cu(),()=>{ze.delete(t),du()}}var uu=["original","badge","dot","hole","bg"],hs=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],bs={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},_o="#FCFCFC",mu="#111111",ps="#111111",fu="#ffffff",pu="#212121",gu="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",hu={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},qo=32,gs=64;function ys(e){return typeof e=="string"&&uu.includes(e)}function bu(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function jo(e){let t=document.createElement("canvas");t.width=qo,t.height=qo;let n=t.getContext("2d");return n?(n.scale(qo/gs,qo/gs),e(n),t.toDataURL("image/png")):""}function yu(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function Fo(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(gu);n&&(e.strokeStyle=mu,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function vu(e,t,n){let o=bs[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=ps,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=ps,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=fu,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function En(e,t){if(e==="original")return t==="wait"?jo(o=>Fo(o,_o)):bu(hu[t]);let n=t==="wait"?void 0:bs[t];return jo(e==="hole"?o=>Fo(o,n??_o):e==="bg"?o=>{o.fillStyle=n??pu,yu(o,0,0,64,64,14),o.fill(),Fo(o,_o,!1)}:o=>{Fo(o,_o),t!=="wait"&&vu(o,t,e==="dot"?"dot":"badge")})}function vs(e){return{wait:En(e,"wait"),rotate:En(e,"rotate"),done:En(e,"done"),ready:En(e,"ready"),error:En(e,"error")}}var xu=new v("ChatStateFavicons"),Ue="bloom-chat-state-favicon",Ts=x({style:{type:3,description:"Favicon overlay",options:hs}}),gt="",zo={wait:"",rotate:"",done:"",ready:"",error:""},Ko="wait",pt=!1,pe=!1,K=null,Tn="",Ln="",Cn=!0,Sn=null,ht=0,ft,Go=null,Ke=null,Yr=null,kn=!1,xs=new WeakSet,wu=400;function Eu(){let e=Ts.store.style;return ys(e)?e:"bg"}function Su(){let t=document.querySelector(`link[rel~="icon"]:not(#${Ue})`)?.href;return ct(t)?t:ct(gt)?gt:""}function U(e){if(Ko===e){let t=document.getElementById(Ue);if(t instanceof HTMLLinkElement&&t.getAttribute("href")===zo[e])return}Ko=e,Kr(Ue,zo[e])}function ws(){zo=vs(Eu()),U(Ko)}function Tu(){let e=D(),t=e?ne(e):ne("");return M()?(!Tn&&t&&(Tn=t),Tn||t):(Tn="",t)}function Ls(){pt=!1,pe=!1,K=null,Tn=""}function Lu(e){Ln=e,Ls(),Cn=!1,U("wait")}function Es(e,t){return!e&&Cn&&!t}function ks(){if(!kn)return;let e=D()||location.pathname;if(Ln&&e&&Ln!==e){Lu(e);return}e&&(Ln=e);let t=Tu(),n=M(),o=ke(),r=qr();if(z()&&!n){U("error"),pt=!1,pe=!1,K=null;return}if(n){pt||(Cn=!1),pt=!0,pe=!1,K=t,U("rotate");return}if(pt){let i=!!K&&!!t&&K===t;if(pt=!1,i){pe=!0,K=t,U("done");return}pe=!1,K=null}if(pe)if(!!(K&&t&&K!==t))pe=!1,K=null;else if(o){U("done");return}else if(Es(o,r)){pe=!1,U("ready");return}else{pe=!1,U("wait");return}K=null,o?U("wait"):Es(o,r)?U("ready"):U("wait")}function Cs(){let e=ee();if(!(Ke&&Yr===e&&e.isConnected)){if(Ke?.disconnect(),Yr=e,!e||e===document.body){Ke=null;return}Ke=new MutationObserver(()=>Uo()),Ke.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function Uo(){!kn||ht||(ht=requestAnimationFrame(()=>{ht=0,kn&&(Ms(),Cs(),ks())}))}function Ss(){te()&&(Cn=!0),Uo()}function Ms(){let e=O();!e||xs.has(e)||(xs.add(e),e.addEventListener("input",Ss,{passive:!0}),e.addEventListener("compositionend",Ss,{passive:!0}))}var As=h({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[b.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Ts,startAt:"DOMContentLoaded",cleanupSelectors:[`#${Ue}`],start(){kn=!0,gt=Su()||gt,ws(),Go?.disconnect(),Go=ts(Ue,e=>{ct(e)&&(gt=e),Kr(Ue,zo[Ko])}),Sn?.abort(),Sn=new AbortController,window.addEventListener("popstate",Uo,{signal:Sn.signal}),Ms(),Cs(),ft!==void 0&&clearInterval(ft),ft=setInterval(Uo,wu),ks(),xu.debug("favicon watch started")},stop(){kn=!1,ht&&cancelAnimationFrame(ht),ht=0,ft!==void 0&&(clearInterval(ft),ft=void 0),Sn?.abort(),Sn=null,Ke?.disconnect(),Ke=null,Yr=null,Go?.disconnect(),Go=null,Ls(),Ln="",Cn=!0,es(Ue,gt)},onSettingsChange:ws});var Ps=`.bloom-ih-hud {
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
`;var Ig=new v("InputHistory"),Xr=/\u200B/g,Hs=10,Rs=500,Ns=100,Cu=8,Mu=120,Au=2e3,Vo=10,Wo=x({maxEntries:{type:4,description:"Max stored prompts",min:Hs,max:Rs,default:Ns},history:{type:5,description:"Stored prompts",render:zu},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Jr=new Map,A=0,Zr="",ae=!1,An=!1,ti=0,Mn=null,Qr,ni=null,Is=!0;function V(){let e=Wo.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Os(e){let t=de(Number(Wo.store.maxEntries??Ns),Hs,Rs);return e.length>t?e.slice(e.length-t):e}function Yo(e){Wo.store.entries=Os(e)}function Pu(e){return e.replaceAll(Xr,"").replace(/\n$/,"").trim()}function ei(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(Q);return n instanceof HTMLElement?n:O()}function Hu(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!j(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(Xr,"").trim().length===0,last:i.toString().replaceAll(Xr,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Bs(e){clearTimeout(Qr),Qr=setTimeout(()=>{if(e!==ti)return;An=!1;let t=ni;t&&Fr(t,Is)},Mu)}function Ds(e,t,n){An=!0,ni=e,Is=n;let o=++ti;fe(e,t,n),Bs(o)}function Ru(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function bt(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Nu(){document.querySelector(".bloom-ih-hud")?.remove()}function Iu(e,t){let n=Ru();n.textContent=e;let o=(t.closest("form")??ee()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-Cu)}px`,n.classList.add("bloom-ih-hud-on")}function oi(e){let t=Pu(e);if(!t)return;let n=Date.now(),o=Jr.get(t);if(o&&n-o<Au)return;Jr.set(t,n);let r=V().filter(i=>i!==t);r.push(t),Yo(r),A=V().length,ae=!1,bt()}function Ou(e,t){let n=V();if(!n.length&&e)return;A>=n.length&&(Zr=j(t),A=n.length);let o=e?A-1:A+1;o<0||o>n.length||(A=o,ae=!0,Ds(t,o===n.length?Zr:n[o],e),o<n.length?Iu(`${o+1} / ${n.length}`,t):bt())}function Bu(e){ae=!1,bt(),Ds(e,Zr,!1),A=V().length}function Du(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=ei(e.target)??ei(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&ae&&!e.altKey&&!e.shiftKey){Bu(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){oi(j(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=V();if(!o){let i=Hu(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||A<=0)||!n&&A>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),Ou(n,t))}function $u(e){if(ei(e.target)){if(An){Bs(ti);return}ae&&(ae=!1,bt(),A=V().length)}}function _u(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(Q);n instanceof HTMLElement&&oi(j(n))}function qu(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(lt);if(!n||!(n instanceof HTMLElement)||L(n))return;let o=O();o&&oi(j(o))}function ju(e){if(!(!ae||An)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}ae=!1,bt()}}function Fu(){if(Mn)return;Mn=new AbortController;let{signal:e}=Mn,t={capture:!0,signal:e};window.addEventListener("keydown",Du,t),window.addEventListener("input",$u,t),window.addEventListener("submit",_u,t),window.addEventListener("click",qu,t),window.addEventListener("pointerdown",ju,t)}function Gu(e){let t=V().slice();t.splice(e,1),Yo(t),A>t.length&&(A=t.length)}function zu(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=V().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(f=>f.toLowerCase().includes(a)):i,c=Math.max(1,Math.ceil(s.length/Vo));n>=c&&(n=c-1);let l=s.slice(n*Vo,n*Vo+Vo);e.replaceChildren();let d=document.createElement("input");if(d.className="bloom-ih-search",d.type="search",d.placeholder="Search history",d.autocomplete="off",d.value=t,d.addEventListener("input",()=>{t=d.value,n=0,r()}),e.appendChild(d),l.length){let f=document.createElement("div");f.className="bloom-ih-list",l.forEach((T,B)=>{let q=i.indexOf(T),Ut=V().length-1-q,Qe=document.createElement("div");Qe.className="bloom-ih-item";let ye=document.createElement("button");ye.type="button",ye.className=`bloom-ih-body${o===B?"":" bloom-ih-clamp"}`,ye.textContent=T,ye.addEventListener("click",()=>{o=o===B?-1:B,r()});let Vt=document.createElement("div");Vt.className="bloom-ih-actions";let et=document.createElement("button");et.type="button",et.title="Copy",et.textContent="C",et.addEventListener("click",()=>{Ji(T)});let Be=document.createElement("button");Be.type="button",Be.title="Delete",Be.textContent="\xD7",Be.addEventListener("click",()=>{Gu(Ut),r()}),Vt.append(et,Be),Qe.append(ye,Vt),f.appendChild(Qe)}),e.appendChild(f)}else{let f=document.createElement("p");f.className="bloom-ih-empty",f.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(f)}let u=document.createElement("div");u.className="bloom-ih-pager";let m=document.createElement("button");m.type="button",m.className="bloom-ih-btn",m.textContent="Prev",m.disabled=n<=0,m.addEventListener("click",()=>{n-=1,r()});let S=document.createElement("span");S.textContent=`${n+1} / ${c}`;let E=document.createElement("button");E.type="button",E.className="bloom-ih-btn",E.textContent="Next",E.disabled=n+1>=c,E.addEventListener("click",()=>{n+=1,r()});let p=document.createElement("button");p.type="button",p.className="bloom-ih-clear",p.textContent="Clear all",p.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Yo([]),A=0,r())}),u.append(m,S,E,p),e.appendChild(u)};return r(),()=>{e.replaceChildren()}}var $s=h({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[b.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:Wo,startAt:"HostReady",managedStyle:"inputHistory",start(){w("inputHistory",Ps),A=V().length,ae=!1,Fu()},stop(){Mn?.abort(),Mn=null,bt(),Nu(),Jr.clear(),clearTimeout(Qr),An=!1,ni=null,ae=!1},onSettingsChange(){let e=V(),t=Os(e);t.length!==e.length&&Yo(t),A>t.length&&(A=t.length)}});var ri="noShareLink",Ku=['button[data-testid="share-chat-button"]','button[data-testid="share-button"]','button[data-testid="conversation-share-button"]','button[data-testid="share-conversation-button"]','#page-header button[aria-label="Share"]','#page-header button[aria-label="Share chat"]','#page-header button[aria-label="Share conversation"]','#page-header button[aria-label="\u5206\u4EAB"]','#page-header button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]','button[aria-label="Share conversation"]','button[aria-label="\u5206\u4EAB\u5BF9\u8BDD"]'],Uu=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]','button[aria-label="Share project"]','button[aria-label="\u5206\u4EAB\u9879\u76EE"]'],ii=x({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function _s(e){return`${e.join(",")}{display:none!important}`}function qs(){let e=[];if(ii.store.hideShareChat!==!1&&e.push(_s(Ku)),ii.store.hideShareProject!==!1&&e.push(_s(Uu)),!e.length){y(ri);return}w(ri,e.join(`
`))}var js=h({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[b.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:ii,start:qs,onSettingsChange:qs,stop(){y(ri)}});var zs="noDictation",Vu=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictation-button"]','button[data-testid="composer-speech-to-text-button"]','form[data-type="unified-composer"] button[data-testid="dictation-button"]','form[data-type="unified-composer"] button[aria-label="Dictate message"]'],Wu=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Ks=x({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Fs(e){return`${e.join(",")}{display:none!important}`}function Gs(){let e=[Fs(Vu)];Ks.store.hideDictationSettings!==!1&&e.push(Fs(Wu)),w(zs,e.join(`
`))}var Us=h({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[b.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Ks,start:Gs,onSettingsChange:Gs,stop(){y(zs)}});var ai="noSidebarIdentity",yt=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],si=yt.flatMap(e=>[`${e} .min-w-0 > .truncate`,`${e} .min-w-0.flex-1 .truncate`]),Xs=yt.flatMap(e=>[`${e} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),Yu=[...si,...Xs],Vs=[...si,...yt.flatMap(e=>[`${e} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],Xu=yt.map(e=>`${e} a[href^="mailto:"]`),Ju=yt.flatMap(e=>[`${e} .min-w-0 > :not(.truncate)`,`${e} .min-w-0 > :not(.truncate) *`,`${e} .min-w-0 .text-xs`,`${e} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${e} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${e} .text-xs:not(.truncate)`,`${e} .text-token-text-secondary:not(.truncate)`,`${e} .text-token-text-tertiary:not(.truncate)`,`${e} .min-w-0 ~ *`,`${e} .min-w-0 ~ * *`,`${e} > .text-xs`,`${e} > .text-token-text-secondary`,`${e} > .text-token-text-tertiary`]),Zu=yt.flatMap(e=>[`${e} .min-w-0.flex-col > :not(.truncate)`,`${e} .min-w-0.flex-col > .text-xs`,`${e} .min-w-0.flex-col > .text-token-text-secondary`,`${e} .min-w-0.flex-col > .text-token-text-tertiary`,`${e} .min-w-0:not(.flex) > :not(.truncate)`,`${e} .min-w-0:not(.flex) > .text-xs`,`${e} .min-w-0:not(.flex) > .text-token-text-secondary`,`${e} .min-w-0:not(.flex) > .text-token-text-tertiary`]),Pn=x({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function Ws(e){return`${e.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Qu(e){return`${e.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function em(){return`${Zu.join(",")}{margin-block:auto!important}`}function tm(){return`${Ju.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function Ys(){let e=Pn.store.hideUsername!==!1,t=Pn.store.hideEmail!==!1,n=e&&Pn.store.enlargePlan!==!1,o=e&&Pn.store.alignPlanWithAvatar===!0,r=[];if(e&&(o?(r.push(Qu(n?Vs:[...Vs,...Xs])),r.push(em())):r.push(Ws(n?si:Yu))),t&&r.push(Ws(Xu)),n&&r.push(tm()),!r.length){y(ai);return}w(ai,r.join(`
`))}var Js=h({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[b.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Pn,start:Ys,onSettingsChange:Ys,stop(){y(ai)}});var Zs=`#bloom-rt-host {
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
`;var tl=new v("RecentTopics"),wt="bloom-rt-host",nl="home",ol=/^\/c\/([a-z0-9_-]{8,})/i,om=/\/c\/([a-z0-9_-]{8,})/i,rl=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,rm=new Set(["Backquote","IntlBackslash"]),im=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),am=140,sm=[3,4,5,6,7,8,9,10,11,12].map(e=>({label:String(e),value:String(e),default:e===5})),P=x({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:sm},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),Xo=null,ci=null,_=!1,Bn=!1,Hn=!1,se=0,Ve="",vt=null,Rn=null,xt,li=null;function lm(){let e=Number(P.store.maxRecent??5);return Number.isFinite(e)&&e>=3&&e<=12?e:5}function Nn(){let e=P.plain.visits;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function di(){let e=P.plain.titles;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function il(){let e=P.plain.previews;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function ui(){let e=P.plain.projects;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Zo(e){let t=lm();return e.length>t?e.slice(0,t):e}function le(e){return e===nl}function In(e,t=am){let n=e.replace(/\s+/g," ").trim();return n.length<=t?n:`${n.slice(0,t-1)}\u2026`}function mi(e){if(!e)return"";try{return new URL(e,location.origin).pathname.match(ol)?.[1]??""}catch{return e.match(om)?.[1]??""}}function We(){let e=(location.pathname||"/").match(ol);if(e?.[1])return e[1];let n=D().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return nl}function fi(e){if(le(e))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${e}"]`);for(let o of n){if(mi(o.getAttribute("href")||"")!==e)continue;let r=In(o.textContent||"",80);if(r)return r}}catch{}let t=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return We()===e&&t&&!/^ChatGPT$/i.test(t)?In(t,80):""}function cm(e){if(le(e))return"New chat";let t=di()[e];if(t)return t;let n=mt(e);return n||fi(e)||"Chat"}function dm(e){return ui()[e]||""}function um(e){return il()[e]||{}}function pi(e,t){if(!e||le(e)||!t||/^new chat$/i.test(t.trim()))return;let n=di();n[e]!==t&&(n[e]=t,P.store.titles=n)}function mm(e){e.type==="conversation-meta"&&(pi(e.conversationId,e.title),_&&Et())}function fm(e,t){if(!e||le(e)||!t)return;let n=ui();n[e]!==t&&(n[e]=t,P.store.projects=n)}function pm(e,t){if(!e||le(e)||!t.user&&!t.assistant)return;let n=il(),o=n[e]||{},r={user:t.user||o.user,assistant:t.assistant||o.assistant};o.user===r.user&&o.assistant===r.assistant||(n[e]=r,P.store.previews=n)}function gi(e){if(!e||le(e)&&P.store.includeHome===!1)return;let t=Nn().filter(n=>n!==e);t.unshift(e),P.store.visits=Zo(t)}function Qo(){let e=P.store.includeHome!==!1;return Zo(Nn().filter(n=>e||!le(n))).map(n=>({id:n,title:cm(n),project:dm(n),preview:um(n)}))}function Qs(e){try{let t=document.querySelectorAll(`[data-message-author-role="${e}"]`),n=t[t.length-1];if(!(n instanceof HTMLElement))return"";let o=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||o.push(a)}let r=o.length?o.join(" "):n.textContent||"";return In(r)}catch{return""}}function On(e){if(!e||le(e)||e!==We())return;let t=fi(e);t&&pi(e,t);let n=Qs("user"),o=Qs("assistant");pm(e,{user:n,assistant:o});let r=sl(e);if(r){let i=al(r);i&&fm(e,i)}}function hi(){let e=di(),t=ui(),n=[],o=new Set,r=!1,i=!1;try{for(let l of document.querySelectorAll('a[href*="/c/"]')){if(l.closest(`#${wt}, #bloom-root, #bloom-sidebar-panel`))continue;let d=mi(l.getAttribute("href")||"");if(!d||o.has(d))continue;o.add(d),n.push(d);let u=In(l.textContent||"",80);u&&!rl.test(u)&&e[d]!==u&&(e[d]=u,r=!0);let m=al(l);m&&t[d]!==m&&(t[d]=m,i=!0)}}catch{}r&&(P.store.titles=e),i&&(P.store.projects=t);let a=Nn(),s=new Set(a),c=n.filter(l=>!s.has(l));c.length&&(P.store.visits=Zo([...a,...c]))}function al(e){let t=e.parentElement;for(let n=0;n<10&&t;n++){if(t.id==="bloom-rt-host"||t.id==="bloom-root"){t=t.parentElement;continue}let o=t.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),r=In((o instanceof HTMLElement?o.textContent:"")||"",60);if(r&&!rl.test(r)&&!/^20\d{2}/.test(r)&&r!==e.textContent?.trim()&&t.querySelector('a[href^="/c/"]'))return r;t=t.parentElement}return""}function sl(e){if(le(e)){let t=document.querySelector('[data-testid="create-new-chat-button"]');return t instanceof HTMLAnchorElement?t:document.querySelector('a[href="/"]')}try{for(let t of document.querySelectorAll(`a[href*="/c/${e}"]`))if(mi(t.getAttribute("href")||"")===e)return t}catch{}return null}function gm(e){let t=sl(e);if(t){t.click();return}if(le(e)){location.assign("/");return}location.assign(`/c/${e}`)}function hm(){let e=We();Ve&&Ve!==e&&On(Ve),Ve=e,gi(e),hi();let t=fi(e);t&&pi(e,t),On(e)}function Jo(){xt===void 0&&(xt=window.setTimeout(()=>{xt=void 0,hm()},120))}function bm(){vt||(vt=history.pushState.bind(history),Rn=history.replaceState.bind(history),history.pushState=function(...t){let n=vt(...t);return Jo(),n},history.replaceState=function(...t){let n=Rn(...t);return Jo(),n})}function ym(){vt&&(history.pushState=vt),Rn&&(history.replaceState=Rn),vt=null,Rn=null}function vm(e){return rm.has(e.code)||e.keyCode===192?!0:im.has(e.key)}function ll(e){return e.key==="Control"||e.code==="ControlLeft"||e.code==="ControlRight"}function xm(e,t){Bn=t,hi(),On(We()),_=!0,se=0;try{let n=We();gi(n);let o=Qo();o.length>1&&(se=e?o.length-1:1)}catch(n){tl.error("Failed to open switcher:",n)}Et()}function el(e){let{length:t}=Qo();t&&(se=(se+(e?-1:1)+t)%t,Et())}function bi(){if(!_)return;let e=Qo()[se];_=!1,Bn=!1,Et(),e&&gm(e.id)}function cl(){_&&(_=!1,Bn=!1,Et())}function wm(e){if(ll(e)){Hn=!0;return}if((e.ctrlKey||Hn)&&!e.altKey&&!e.metaKey&&vm(e)&&!e.repeat){e.preventDefault(),e.stopImmediatePropagation();try{_?el(e.shiftKey):xm(e.shiftKey,!0)}catch(n){tl.error("Hotkey failed:",n)}return}if(_){if(e.key==="Escape"){e.preventDefault(),cl();return}if(e.key==="Enter"&&!e.shiftKey){e.preventDefault(),bi();return}e.key==="Tab"&&(e.ctrlKey||Hn)&&(e.preventDefault(),el(e.shiftKey))}}function Em(e){ll(e)&&(Hn=!1,_&&Bn&&bi())}function Sm(e){let t=e.target instanceof Element?e.target:null;!t||!t.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(Jo)}function Tm(e){!_||(e.target instanceof Element?e.target:null)?.closest(`#${wt}`)||cl()}function Lm(){document.visibilityState==="hidden"&&On(We())}function km(){if(!document.body)return null;let e=document.getElementById(wt);if(e instanceof HTMLElement)return ci=e,e;e=document.createElement("div"),e.id=wt;let t=document.createElement("div");return t.className="bloom-rt-panel",t.setAttribute("role","listbox"),t.setAttribute("aria-label","Recent conversations"),t.dataset.visible="false",t.addEventListener("click",n=>n.stopPropagation()),e.append(t),document.body.append(e),ci=e,e}function Et(){let e=km();if(!e)return;let t=e.querySelector(".bloom-rt-panel");if(!t)return;if(!_){t.dataset.visible="false",t.replaceChildren();return}let n=Qo();if(!n.length){t.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",t.replaceChildren(i);return}se>=n.length&&(se=0);let o=document.createElement("div");o.className="bloom-rt-list",o.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===se?"true":"false",s.setAttribute("aria-selected",a===se?"true":"false");let c=document.createElement("div");if(c.className="bloom-rt-name",c.textContent=i.title,s.append(c),i.project){let l=document.createElement("div");l.className="bloom-rt-project",l.textContent=i.project,s.append(l)}if(i.preview.user||i.preview.assistant){let l=document.createElement("div");if(l.className="bloom-rt-preview",i.preview.user){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="user",d.textContent=i.preview.user,l.append(d)}if(i.preview.assistant){let d=document.createElement("div");d.className="bloom-rt-line",d.dataset.role="assistant",d.textContent=i.preview.assistant,l.append(d)}s.append(l)}s.addEventListener("click",()=>{se=a,bi()}),o.append(s)}),t.replaceChildren(o),t.dataset.visible="true",t.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function Cm(){document.getElementById(wt)?.remove(),ci=null}var dl=h({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[b.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${wt}`],settings:P,start(){w("recentTopics",Zs),Ve=We(),gi(Ve),hi(),On(Ve),li=re(mm),bm(),Xo=new AbortController;let{signal:e}=Xo;window.addEventListener("keydown",wm,{capture:!0,signal:e}),window.addEventListener("keyup",Em,{capture:!0,signal:e}),window.addEventListener("popstate",Jo,{signal:e}),document.addEventListener("click",Sm,{capture:!0,signal:e}),document.addEventListener("click",Tm,{signal:e}),document.addEventListener("visibilitychange",Lm,{signal:e})},stop(){Xo?.abort(),Xo=null,xt!==void 0&&(clearTimeout(xt),xt=void 0),ym(),li?.(),li=null,_=!1,Bn=!1,Hn=!1,Cm()},onSettingsChange(){let e=Zo(Nn());e.length!==Nn().length&&(P.store.visits=e),_&&Et()}});var yi="cleaner",Mm=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[data-testid="sidebar-download-app"]','button[data-testid="sidebar-download-app"]','a[data-testid="get-app-button"]','button[data-testid="get-app-button"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="Get the app"]','a[aria-label="Get the ChatGPT app"]','button[aria-label="Get the app"]','button[aria-label="Get the ChatGPT app"]','a[aria-label="Download for Windows"]','a[aria-label="Download for macOS"]','button[aria-label="Download for Windows"]','button[aria-label="Download for macOS"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],Am=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],Pm=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="get-go-button"]','[data-testid="get-business-button"]','[data-testid="get-team-button"]','[data-testid="chatgpt-go-upsell"]','[data-testid="sidebar-upgrade"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="/pricing"]','a[href*="chatgpt.com/plus"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="Get Go"]','a[aria-label="Get Business"]','a[aria-label="Try Plus"]','a[aria-label="Try ChatGPT Go"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="Get Go"]','button[aria-label="Get Business"]','button[aria-label="Try Plus"]','button[aria-label="Try ChatGPT Go"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],Hm=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],Rm=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]','[data-testid="codex-promo"]','[data-testid="try-codex"]','[data-testid="apps-promo"]','[data-testid="home-apps-promo"]'],Nm=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],Ye=x({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function St(e){return`${e.join(",")}{display:none!important}`}function ul(){let e=[];if(Ye.store.hideDownloadApps!==!1&&e.push(St(Mm)),Ye.store.hideDisclaimer!==!1&&e.push(St(Am)),Ye.store.hideUpgrade!==!1&&e.push(St(Pm)),Ye.store.hideLockedModels!==!1&&e.push(St(Hm)),Ye.store.hideHomePromo!==!1&&e.push(St(Rm)),Ye.store.hideAds!==!1&&e.push(St(Nm)),!e.length){y(yi);return}w(yi,e.join(`
`))}var ml=h({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[b.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Ye,start:ul,onSettingsChange:ul,stop(){y(yi)}});var tr=new v("ResponseNotification"),Lt=x({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:qm},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),vi=!1,er=null,Tt=null,Dn=null;function Im(){return document.visibilityState==="hidden"||document.hidden}function Om(){return Lt.store.onlyWhenHidden===!1?!0:Im()}function Bm(){let e=mt($());if(e)return e;let t=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return t&&!/^ChatGPT$/i.test(t)?t:"Chat"}function fl(){try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!Tt||Tt.state==="closed")&&(Tt=new e);let t=Tt,n=t.currentTime,o=[523.25,659.25];for(let r=0;r<o.length;r++){let i=t.createOscillator(),a=t.createGain();i.type="sine",i.frequency.value=o[r];let s=n+r*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(t.destination),i.start(s),i.stop(s+.24)}t.resume?.()}catch(e){tr.debug("chime failed",e)}}function Dm(e){try{let t=new Audio(e);t.volume=.7,t.play()}catch(t){tr.debug("custom sound failed",t),fl()}}function pl(){let e=String(Lt.store.soundUrl||"").trim();e?Dm(e):fl()}function $m(){let e="Bloom++",t=`${Bm()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:e,text:t,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(e,{body:t,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){tr.debug("notification failed",n)}}function _m(){Om()&&(Lt.store.sound!==!1&&pl(),Lt.store.browserNotification!==!1&&$m())}function qm(e){let t=document.createElement("button");return t.type="button",t.textContent="Play",t.addEventListener("click",()=>pl()),e.appendChild(t),()=>{t.remove()}}var gl=h({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[b.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Lt,start(){vi=!0,er?.(),er=Ae(e=>{vi&&(e.userStopped||e.error||_m())}),Dn?.abort(),Dn=new AbortController,Lt.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:Dn.signal}),tr.debug("watch started")},stop(){vi=!1,er?.(),er=null,Dn?.abort(),Dn=null;try{Tt?.close()}catch{}Tt=null}});var hl=`#bloom-pq-chip {
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
`;var jn=new v("PromptQueue"),wi="bloom-pq-chip",bl="promptQueue",yl=80,Fm=50,Gm=2e3,El=x({replacePending:{type:2,description:"Replace the queued prompt if you Enter again while one is waiting.",default:!0}}),R=new Map,ge=!1,W="",H="",He=!1,Y=!1,C=null,$n=null,nr=null,qn,_n,kt=null;function Ct(){return ne(D())}function Mt(e){return e.replaceAll("\u200B","").replace(/\n$/,"").trim()}function vl(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(Q);return n instanceof HTMLElement?n:O()}function Ei(e){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation()}function Sl(){try{return document.querySelectorAll('[data-message-author-role="user"]').length}catch{return 0}}function zm(){try{let e=document.querySelectorAll('[data-message-author-role="user"]'),t=e[e.length-1];return t instanceof HTMLElement?Mt(t.innerText||t.textContent||""):""}catch{return""}}function Km(e,t){if(!e||e===t)return!1;if(e.endsWith("|draft")&&!t.endsWith("|draft"))return!0;try{let n=e.split("|")[0],o=t.split("|")[0],r=new URL(n).pathname.replace(/\/$/,"")||"/",i=new URL(o).pathname.replace(/\/$/,"")||"/";if((r==="/"||r==="")&&i.startsWith("/c/"))return!0}catch{}return!1}function xl(e){if(!W||W===e)return;let t=R.get(W);!t||R.has(e)||Km(W,e)&&(R.delete(W),R.set(e,t),H===W&&(H=e),C?.key===W&&(C.key=e),jn.debug("migrated pending",W,"\u2192",e))}function Si(e){let t=Ct();if(R.get(t)&&El.store.replacePending===!1)return;R.set(t,{text:e,at:Date.now()}),C={key:t,text:e,turns:Sl(),ticks:3};let o=O();o&&fe(o,""),Pe(),jn.debug("queued",t,e.length)}function Um(e){R.delete(e),H===e&&(H=""),C?.key===e&&(C=null),Pe()}function Vm(){Y=!0,clearTimeout(_n),_n=setTimeout(()=>{Y=!1,_n=void 0},Gm)}function Wm(){let e=Ct(),t=R.get(e);if(!t)return;let n=O();if(!n)return;R.delete(e),H="",Pe(),Vm(),fe(n,t.text);let o=me();o&&!L(o)&&!mn(o)&&(o.click(),Y=!1)}function wl(e){if(!ge||He||M()||Ct()!==e)return;let t=R.get(e);if(!t){H="";return}if(z())return;let n=O();if(!n)return;if(!ke(n)){let r=Mt(j(n));if(r&&r!==t.text)return}let o=me();!o||L(o)||mn(o)||(He=!0,fe(n,t.text),clearTimeout(qn),qn=setTimeout(()=>Ym(e,t.text),Fm))}function Ym(e,t){qn=void 0;try{if(!ge)return;let n=R.get(e);if(!n||n.text!==t||M()||Ct()!==e)return;let o=O();if(!o)return;let r=Mt(j(o));if(r&&r!==t&&!ke(o))return;r!==t&&fe(o,t);let i=me();if(!i||L(i)||mn(i))return;i.click(),R.delete(e),H="",Pe(),jn.debug("drained",e)}finally{He=!1}}function Tl(e){let t=ee();if(!t||t===document.body){e.style.left="50%",e.style.bottom="6.5rem";return}let n=t.getBoundingClientRect();e.style.left=`${Math.round(n.left+n.width/2)}px`,e.style.bottom=`${Math.round(Math.max(12,window.innerHeight-n.top+8))}px`;let o=Math.min(512,Math.max(160,n.width-24));e.style.maxWidth=`${Math.round(o)}px`}function xi(){kt?.remove(),kt=null}function Pe(){if(!ge||!document.body){xi();return}let e=Ct(),t=R.get(e);if(!t){xi();return}let n=kt;n?.isConnected||(n=document.createElement("div"),n.id=wi,document.body.appendChild(n),kt=n),n.replaceChildren();let o=document.createElement("span");o.className="bloom-pq-kicker",o.textContent="Next";let r=document.createElement("span");r.className="bloom-pq-text";let i=t.text.length>yl?`${t.text.slice(0,yl)}\u2026`:t.text;r.textContent=i,r.title=t.text;let a=document.createElement("div");a.className="bloom-pq-actions";let s=document.createElement("button");s.type="button",s.className="bloom-pq-btn bloom-pq-send",s.textContent="Send now",s.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),Wm()});let c=document.createElement("button");c.type="button",c.className="bloom-pq-btn bloom-pq-x",c.setAttribute("aria-label","Dismiss queued prompt"),c.textContent="\xD7",c.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),Um(e)}),a.append(s,c),n.append(o,r,a),Tl(n)}function Xm(){if(!C)return;if(C.ticks-=1,R.get(C.key)&&Sl()>C.turns){let t=zm();if(t&&t===C.text){jn.debug("native send leaked; dropping pending"),R.delete(C.key),H===C.key&&(H=""),C=null,Pe();return}}C.ticks<=0&&(C=null)}function Jm(e){if(!ge||e.isComposing||e.keyCode===229||e.key!=="Enter"||e.shiftKey||e.ctrlKey||e.metaKey||He)return;let t=vl(e.target)??vl(document.activeElement);if(!t||!M())return;if(e.altKey||Y){Y=!1;return}if(!te(t))return;let n=Mt(j(t));n&&(Ei(e),Si(n))}function Zm(e){let t=e.closest("button");if(!(t instanceof HTMLElement)||L(t))return null;let n=e.closest(lt);if(n instanceof HTMLElement&&!L(n))return n;let o=me();return o&&(t===o||o.contains(t)||t.contains(o))?o:null}function Qm(e){if(!ge)return;let t=e.target;if(!(t instanceof Element)||t.closest(`#${wi}`))return;let n=t.closest("button");if(n instanceof HTMLElement&&L(n)||He||!M()||!Zm(t))return;if(Y){Y=!1;return}let o=O();if(!o||!te(o))return;let r=Mt(j(o));r&&(Ei(e),Si(r))}function ef(e){if(!ge)return;let t=e.target;if(!(t instanceof HTMLFormElement)||!t.matches(Ro)&&!t.querySelector(Q)||He||!M())return;if(Y){Y=!1;return}let n=O()??t.querySelector(Q);if(!n||!te(n))return;let o=Mt(j(n));o&&(Ei(e),Si(o))}var Ll=h({name:"PromptQueue",description:"Queue the next prompt while a reply is streaming. Enter/Send waits for this turn instead of interrupting.",authors:[b.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:bl,cleanupSelectors:[`#${wi}`],settings:El,start(){ge=!0,W=Ct(),H="",He=!1,Y=!1,C=null,w(bl,hl),$n?.abort(),$n=new AbortController;let{signal:e}=$n;window.addEventListener("keydown",Jm,{capture:!0,signal:e}),document.addEventListener("click",Qm,{capture:!0,signal:e}),document.addEventListener("submit",ef,{capture:!0,signal:e}),nr?.(),nr=Ae({onFall(t){if(ge){if(t.userStopped||t.error){H="",Pe();return}H=t.contextKey,wl(t.contextKey)}},onContext(t){xl(t),W=t,Pe()},onTick(t){xl(t.contextKey),W=t.contextKey,Xm(),H&&H===t.contextKey&&wl(H),kt&&Tl(kt)}}),Pe(),jn.debug("watch started")},stop(){ge=!1,nr?.(),nr=null,$n?.abort(),$n=null,clearTimeout(qn),qn=void 0,clearTimeout(_n),_n=void 0,R.clear(),C=null,H="",He=!1,Y=!1,xi()}});var kl=`.bloom-cls {
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
`;var Al=new v("ChatListStatus"),Cl="chatListStatus",ir="bloom-cls",nf="bloom-cls",of=1200*1e3,rf="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",Ne=new Map,Ie=!1,At="",Fn=!1,Ht=0,Re=null,ki=null,Pt=null,Ti=null,or=null,Rt=!1;function rr(){return Date.now()}function Pl(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function Nt(e,t,n,o=!0){if(!(!e||!Ie)){if(t==="idle")Ne.delete(e);else{let r=Ne.get(e);r&&r.kind===t&&n!=="net"?r.at=rr():Ne.set(e,{kind:t,at:rr(),source:n})}o&&af({v:1,id:e,kind:t,at:rr()}),ar()}}function af(e){try{Pt?.postMessage(e)}catch{}}function sf(e){let t=e.data;!t||t.v!==1||!t.id||t.kind!=="streaming"&&t.kind!=="done"&&t.kind!=="error"&&t.kind!=="idle"||Nt(t.id,t.kind,"bc",!1)}function lf(){let e=rr();for(let[t,n]of Ne)n.kind==="streaming"&&e-n.at>of&&Ne.delete(t)}function cf(){let e=Pl();if(!e)return[];let t=[],n=new Set;try{for(let o of e.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(o.closest(rf))continue;let r=dt(o.getAttribute("href")||"");!r||n.has(r)||(n.add(r),t.push(o))}}catch{}return t}function Ml(e){let t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),e==="streaming")t.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("cx","12"),o.setAttribute("cy","12"),o.setAttribute("r","9"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","2"),t.appendChild(o)}return t.appendChild(n),t}function Li(e){let t=e.querySelector(`:scope > .${ir}`);return t||null}function df(){if(!Ie)return;lf();let e=$(),t=cf();Re?.disconnect();try{for(let n of t){let o=dt(n.getAttribute("href")||"");if(!o||!e||o!==e){Li(n)?.remove();continue}let i=Ne.get(o)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){Li(n)?.remove();continue}let a=Li(n);a||(a=document.createElement("span"),a.className=ir,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(Ml("streaming")):i==="error"&&a.appendChild(Ml("error")))}}catch(n){Al.debug("paint failed",n)}Hl()}function ar(){!Ie||Ht||(Ht=requestAnimationFrame(()=>{Ht=0,Ie&&df()}))}function Hl(){let e=Pl();if(!(Re&&ki===e&&e?.isConnected)){if(Re?.disconnect(),ki=e,!e){Re=null;return}Re=new MutationObserver(()=>ar()),Re.observe(e,{childList:!0,subtree:!0})}}function uf(e){if(Ie){if(e.type==="post-start"){e.conversationId?(Rt=!1,Nt(e.conversationId,"streaming","net")):Rt=!0;return}e.type==="post-end"&&(Rt=!1,e.conversationId&&Nt(e.conversationId,e.error?"error":"done","net"))}}function mf(e){if(!Ie)return;let t=e.conversationId||$();if(At&&t&&At!==t){let n=Ne.get(At);n?.kind==="streaming"&&n.source==="local"&&Nt(At,z()?"error":"done","local"),Fn=!1}if(At=t,e.streaming){Fn=!0,t&&Nt(t,"streaming","local"),ar();return}Fn&&(Fn=!1,t&&Nt(t,z()?"error":"done","local")),Rt=!1,ar()}var Rl=h({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[b.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${ir}`],start(){Ie=!0,w(Cl,kl);try{Pt=new BroadcastChannel(nf)}catch{Pt=null}Pt?.addEventListener("message",sf),Ti=re(uf),or?.(),or=Ae({onTick:mf}),Hl(),Al.debug("sidebar status watch started")},stop(){Ie=!1,Ht&&cancelAnimationFrame(Ht),Ht=0,Re?.disconnect(),Re=null,ki=null,or?.(),or=null,Ti?.(),Ti=null;try{Pt?.close()}catch{}Pt=null,Ne.clear(),Rt=!1,Fn=!1,At="",document.querySelectorAll(`.${ir}`).forEach(e=>e.remove()),y(Cl)}});var Il="widerChat",Ol=40,Bl=96,Dl=64,$l=x({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:Ol,max:Bl,default:Dl}});function ff(){return de(Number($l.store.width??Dl),Ol,Bl)}function Nl(){let e=ff(),t=`min(100%,${e}rem)`;w(Il,`:root,#thread,#thread-bottom-container,#thread-bottom{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important;--user-chat-width:${e}rem!important;--composer-container-max-width:${e}rem!important;--thread-xl-max-width:${e}rem!important}[class*="--thread-content-max-width"],[class*="--thread-content-width"]{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important}[class*="thread-content-max-width"],[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${t}!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"],#thread-bottom [class*="thread-content-max-width"]{max-width:${t}!important}#thread [class*="max-w-[40rem]"],#thread [class*="max-w-[48rem]"],#thread-bottom-container [class*="max-w-[40rem]"],#thread-bottom-container [class*="max-w-[48rem]"],#thread-bottom [class*="max-w-[40rem]"],#thread-bottom [class*="max-w-[48rem]"]{max-width:${t}!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:${t}!important}`)}var _l=h({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[b.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:$l,start:Nl,onSettingsChange:Nl,stop(){y(Il)}});var Ci="composerOpacity",It='form[data-type="unified-composer"],form.w-full[data-type]',pf=[`${It} [class*="corner-superellipse"]`,`${It} [class*="bg-token-bg-primary"]`,`${It} [class*="bg-token-main-surface"]`].join(","),gf=["#thread-bottom-container::after","#thread-bottom::after",'#thread-bottom-container [class*="content-fade"]','#thread-bottom [class*="content-fade"]'].join(","),hf="#thread-bottom-container,#thread-bottom",bf=`${It} #prompt-textarea,${It} [contenteditable="true"]`,yf="var(--bg-primary,var(--main-surface-primary,#ffffff))",Mi=x({opacity:{type:4,description:"Composer background opacity. 100 is ChatGPT\u2019s native fill.",min:0,max:100,default:100},blur:{type:4,description:"Backdrop blur in pixels. Applies when opacity is below 100.",min:0,max:40,default:16}});function vf(){return de(Number(Mi.store.opacity??100),0,100)}function xf(){return de(Number(Mi.store.blur??16),0,40)}function ql(){let e=vf();if(e>=100){y(Ci);return}let t=xf(),n=`color-mix(in srgb,${yf} ${e}%,transparent)`,o=t>0?`-webkit-backdrop-filter:blur(${t}px)!important;backdrop-filter:blur(${t}px)!important;`:"-webkit-backdrop-filter:none!important;backdrop-filter:none!important;";w(Ci,`${hf}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${gf}{display:none!important}${It}{background-color:transparent!important;background-image:none!important;box-shadow:none!important}${pf}{background-color:${n}!important;background-image:none!important;${o}}${bf}{background-color:transparent!important;background-image:none!important}`)}var jl=h({name:"ComposerOpacity",description:"Composer background opacity and blur, so the thread can show through the input bar.",authors:[b.p],tags:["ui","chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><path d="M15 9a6 6 0 106 6"/><path d="M9 9h.01"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Mi,start:ql,onSettingsChange:ql,stop(){y(Ci)}});var Fl=`.bloom-ts {
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
`;function Gl(e,t,n=Date.now()){let o=new Date(e);if(Number.isNaN(o.getTime()))return"";let r=new Date(n),i=o.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(o.toDateString()===r.toDateString()||!t)return i;let s=o.getFullYear()===r.getFullYear();return`${o.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function zl(e){try{return new Date(e).toISOString()}catch{return""}}var Wl=new v("MessageTimestamps"),Kl="messageTimestamps",sr="bloom-ts",Ul=1500,Ef="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",Dt=x({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),$t=new Map,_t=!1,Bt=0,Ot,Oe=null,Pi=null,Ai=null,Vl=!1;function Yl(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function Hi(){let e=Dt.plain.stamps;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Xl(){let e={...Hi()};for(let[n,o]of $t)e[n]=o;let t=Object.keys(e);if(t.length>Ul){let n=t.slice(t.length-Ul),o={};for(let r of n)o[r]=e[r];Dt.store.stamps=o;return}Dt.store.stamps=e}var Sf=Zi(Xl,500);function Jl(e,t){!e||!t||$t.get(e)===t||($t.set(e,t),Sf(),Gn())}function Tf(e){return e?$t.get(e)??Hi()[e]??$o(e)??null:null}function Lf(e){_t&&e.type==="message-time"&&Jl(e.messageId,e.createTime)}function kf(e){return(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function Cf(){let e=Yl();if(!e)return[];let t=[];try{for(let n of e.querySelectorAll("[data-message-id]"))n.closest(Ef)||t.push(n)}catch{}return t}function Mf(e){try{return!!e.querySelector("time:not(.bloom-ts)")}catch{return!1}}function Af(){if(!_t)return;let e=Dt.store.hideOwnMessages===!0,t=Dt.store.showDate!==!1,n=M(),o=Cf();Oe?.disconnect();try{o.forEach((r,i)=>{let a=r.getAttribute("data-message-id")||"",s=kf(r),c=r.querySelector(`:scope > .${sr}`);if(e&&s==="user"){c?.remove();return}if(Mf(r)){c?.remove();return}let l=Tf(a);if(!l&&a&&(n||Vl)&&i>=o.length-2&&(l=Date.now(),Jl(a,l)),!l){c?.remove();return}let d=Gl(l,t);if(!d){c?.remove();return}let u=c;u||(u=document.createElement("time"),u.className=sr,u.setAttribute("aria-hidden","true"),r.insertBefore(u,r.firstChild)),u.textContent!==d&&(u.textContent=d);let m=zl(l);m&&u.getAttribute("datetime")!==m&&u.setAttribute("datetime",m)})}catch(r){Wl.debug("paint failed",r)}Vl=n,Zl()}function Gn(){!_t||Bt||(Bt=requestAnimationFrame(()=>{Bt=0,_t&&Af()}))}function Zl(){let e=Yl();if(!(Oe&&Pi===e&&e?.isConnected)){if(Oe?.disconnect(),Pi=e,!e||e===document.body){Oe=null;return}Oe=new MutationObserver(()=>Gn()),Oe.observe(e,{childList:!0,subtree:!0})}}var Ql=h({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[b.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${sr}`],settings:Dt,start(){_t=!0,w(Kl,Fl);let e=Hi();for(let[t,n]of Object.entries(e))typeof n=="number"&&n>0&&$t.set(t,n);Ai=re(Lf),Zl(),Ot!==void 0&&clearInterval(Ot),Ot=setInterval(Gn,800),Gn(),Wl.debug("timestamp watch started")},stop(){_t=!1,Bt&&cancelAnimationFrame(Bt),Bt=0,Ot!==void 0&&(clearInterval(Ot),Ot=void 0),Oe?.disconnect(),Oe=null,Pi=null,Ai?.(),Ai=null,Xl(),$t.clear(),document.querySelectorAll(`.${sr}`).forEach(e=>e.remove()),y(Kl)},onSettingsChange:Gn});var Ri="streamerMode",Pf="filter:blur(6px)!important;transition:filter .2s ease",Hf="filter:none!important",zn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],qt=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function X(e,t){return e.map(n=>`${n} ${t}`)}var Xe=x({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0},headerTitle:{type:2,description:"Blur the open conversation title in the page header.",default:!0}});function jt(e,t=!0){let n=e.join(","),o=e.map(r=>`${r}:hover`).join(",");return`${n}{${Pf}}${t?`${o}{${Hf}}`:""}`}function ec(){let e=[];if(Xe.store.conversations!==!1&&(e.push(jt([...X(qt,'a[href^="/c/"]'),...X(qt,'a[href*="/c/"]')])),e.push("#bloom-rt-host .bloom-rt-name,#bloom-rt-host .bloom-rt-preview{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-name,#bloom-rt-host .bloom-rt-card:hover .bloom-rt-preview{filter:none!important}")),Xe.store.projects!==!1&&(e.push(jt([...X(qt,'a[href*="/project"]'),...X(qt,'a[href*="/g/g-p-"]'),...X(qt,'[data-testid="project-name"]'),...X(qt,'[data-testid="project-link"]')])),e.push("#bloom-rt-host .bloom-rt-project{filter:blur(6px)!important;transition:filter .2s ease}#bloom-rt-host .bloom-rt-card:hover .bloom-rt-project{filter:none!important}")),Xe.store.headerTitle!==!1&&e.push(jt(["#page-header h1","#page-header h2",'#page-header [data-testid="conversation-title"]','#page-header [data-testid="thread-title"]','[data-testid="temporary-chat-label"]'],!1)),Xe.store.accountAvatar!==!1&&e.push(jt([...X(zn,"img"),...X(zn,'[class*="avatar"]')],!1)),Xe.store.accountName!==!1&&e.push(jt([...X(zn,".min-w-0 > .truncate"),...X(zn,".min-w-0.flex-1 .truncate")],!1)),Xe.store.accountEmail!==!1&&e.push(jt([...X(zn,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),e.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),e.push('#page-header [data-testid="share-chat-button"],#page-header [data-testid="share-chat-button"] *,#page-header [data-testid="share-button"],#page-header [data-testid="share-button"] *,#page-header [data-testid="composer-speech-button"],#page-header [data-testid="composer-speech-button"] *,#page-header [data-testid="model-switcher-dropdown-button"],#page-header [data-testid="model-switcher-dropdown-button"] *,form[data-type="unified-composer"],form[data-type="unified-composer"] *{filter:none!important}'),!e.length){y(Ri);return}w(Ri,e.join(`
`))}var tc=h({name:"StreamerMode",description:"Blur Recents titles, the header chat name, project names, and the account chip while you stream.",authors:[b.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Xe,start:ec,onSettingsChange:ec,stop(){y(Ri)}});var nc=`.bloom-gc-panel {
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
}`;var Nf=new v("GreetingCustomizer"),Ft="greetingCustomizer",oc="greetingCustomizerUi",Kn=100,Ii=30,If=120,Of=1e3,Bf=50,Df=40,$f=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog","#thread-bottom-container",'form[data-type="unified-composer"]'].join(", "),Un=["h1.text-page-header",'h1[class*="text-page-header"]',".text-page-header",'[class*="text-page-header"]',"[data-splash-headline-option] h1","[data-splash-headline-option]",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),mr=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',".text-page-header .text-pretty",'[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty","[data-splash-headline-option] .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function _f(e){return!!e?.closest($f)}function sc(e){return!!(_f(e)||e.closest('[data-testid="temporary-chat-label"]')||e.closest("[hidden]")||e.getAttribute("aria-hidden")==="true"||e.classList.contains("sr-only"))}function Qn(e){try{for(let t of document.querySelectorAll(e))if(!sc(t))return t}catch{}return null}function Ni(e){for(let t of e.split(",").map(n=>n.trim()).filter(Boolean))if(Qn(t))return t;return e}var lc=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],N=x({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:tp},greetings:{type:0,description:"Greeting texts",hidden:!0,default:lc},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),ce=!1,Kt=!1,Ze=null,cr,Vn,Gt,Wn,dr=0,lr=null,zt=null,Yn=null,Xn=null,Jn=null,ur=null;function be(){let e=location.pathname||"/";return e==="/"||e===""}function Je(){let e=N.plain.greetings;return Array.isArray(e)?e.filter(t=>typeof t=="string"):lc.slice()}function Zn(e){return String(e??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function rc(e){N.store.greetings=e.slice(0,Ii)}function eo(){let e=String(N.store.mode??"refresh");return e==="interval"||e==="manual"?e:"refresh"}function qf(){return N.store.order==="random"?"random":"sequential"}function jf(){return de(Number(N.store.intervalSec??10),1,3600)*1e3}function Ff(e){return String(e??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function Gf(){return!!Qn(mr)}function fr(){return!!(Qn(mr)||Qn(Un))}function zf(e,t){let n=["font-size:0!important","color:transparent!important","visibility:hidden!important","display:block!important"].join(";"),o=[`content:"${e}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),r=Gf()?Ni(mr):Qn(Un)?Ni(Un):Ni(mr),i=t?`${Un}{cursor:pointer!important;user-select:none!important}`:"";return[`${r}{${n}}`,`${r}::before{${o}}`,i,`@media (max-width:768px){${r}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function Kf(e,t){if(e<=0)return 0;if(e===1)return Number(N.plain.index)!==0&&(N.store.index=0),Number(N.plain.lastRandom)!==0&&(N.store.lastRandom=0),0;let n=Number(N.plain.index),o=Number(N.plain.lastRandom);if(!t)return n>=0&&n<e?n:0;if(qf()==="random"){let a=n>=0&&n<e?n:o,s=Math.floor(Math.random()*e),c=0;for(;s===a&&c++<10;)s=Math.floor(Math.random()*e);return N.store.index=s,N.store.lastRandom=s,s}let i=((n>=-1&&n<e?n:-1)+1)%e;return N.store.index=i,i}function he(e){if(!ce)return;if(!be()){y(Ft);return}let t=Je().map(Zn).filter(Boolean);if(!t.length){y(Ft);return}let n=Kf(t.length,e),o=t[n]??t[0],r=eo()==="manual"&&t.length>1;w(Ft,zf(Ff(o),r)),ur?.()}function Oi(){cr!==void 0&&(clearInterval(cr),cr=void 0)}function Bi(){Oi(),!(!ce||!be())&&eo()==="interval"&&(Je().filter(Boolean).length<=1||(cr=setInterval(()=>he(!0),jf())))}function Di(){Wn!==void 0&&(clearTimeout(Wn),Wn=void 0),dr=0}function ic(){if(Di(),!ce||!be())return;dr=Df;let e=()=>{if(Wn=void 0,!(!ce||!be())){if(fr()){eo()==="refresh"&&!Kt?(Kt=!0,he(!0)):he(!1),Bi();return}dr-=1,dr>0&&(Wn=setTimeout(e,Bf))}};e()}function $i(){if(Ze===!0){fr()?he(!1):ic();return}Ze=!0,Kt=!1,eo()==="refresh"?(Kt=!0,he(!0)):he(!1),Bi(),fr()||ic()}function _i(){Ze=!1,Kt=!1,Oi(),Di(),y(Ft)}function pr(){Gt===void 0&&(Gt=window.setTimeout(()=>{Gt=void 0,ce&&(be()?$i():Ze!==!1&&_i())},If))}function Uf(){zt||(zt=history.pushState.bind(history),Yn=history.replaceState.bind(history),Xn=function(...t){let n=zt(...t);return pr(),n},Jn=function(...t){let n=Yn(...t);return pr(),n},history.pushState=Xn,history.replaceState=Jn)}function Vf(){Xn&&history.pushState===Xn&&zt&&(history.pushState=zt),Jn&&history.replaceState===Jn&&Yn&&(history.replaceState=Yn),zt=null,Yn=null,Xn=null,Jn=null}function Wf(e){let t=e.target instanceof Element?e.target:null;t&&t.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(pr)}function Yf(e){if(!ce||!be()||eo()!=="manual"||Je().filter(Boolean).length<=1)return;let t=e.target instanceof Element?e.target:null;if(!t)return;let n=t.closest(Un);if(!n||sc(n))return;let o=window.getSelection?.();o&&String(o).trim()||he(!0)}function Xf(){Vn===void 0&&(Vn=setInterval(()=>{if(!ce)return;let e=be();if(e!==(Ze===!0)){e?$i():_i();return}e&&fr()&&he(!1)},Of))}function Jf(){Vn!==void 0&&(clearInterval(Vn),Vn=void 0)}function ac(e,t){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=e,n.setAttribute("aria-label",e);let o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.75"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),o.setAttribute("aria-hidden","true");for(let r of t.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",r),o.appendChild(i)}return n.appendChild(o),n}var Zf="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",Qf="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function ep(e,t){let n=Zn(e);return n?n.length>Kn?`Keep it to ${Kn} characters.`:Je().length+(t?1:0)>Ii?`At most ${Ii} greetings.`:null:"Enter a greeting."}function tp(e){e.className="bloom-gc-panel";let t="",n=-1,o="",r=-1,i=()=>{let a=Je(),s=Number(N.plain.index);e.replaceChildren();let c=document.createElement("div");c.className="bloom-gc-composer";let l=document.createElement("textarea");l.className="bloom-gc-input",l.rows=3,l.maxLength=Kn,l.placeholder="New greeting (line breaks ok)",l.value=t,l.addEventListener("input",()=>{t=l.value,o="";let f=c.querySelector(".bloom-gc-count");f&&(f.textContent=`${Zn(t).length}/${Kn}`);let T=c.querySelector(".bloom-gc-error");T&&(T.textContent="")}),c.appendChild(l);let d=document.createElement("div");d.className="bloom-gc-meta";let u=document.createElement("span");u.className="bloom-gc-count",u.textContent=`${Zn(t).length}/${Kn}`;let m=document.createElement("span");m.className="bloom-gc-error",m.textContent=o;let S=document.createElement("div");if(S.className="bloom-gc-actions",n>=0){let f=document.createElement("button");f.type="button",f.className="bloom-gc-btn",f.textContent="Cancel",f.addEventListener("click",()=>{n=-1,t="",o="",i()}),S.appendChild(f)}let E=document.createElement("button");if(E.type="button",E.className="bloom-gc-btn bloom-gc-btn-primary",E.textContent=n>=0?"Update":"Add",E.addEventListener("click",()=>{let f=n<0,T=ep(t,f);if(T){o=T,i();return}let B=Zn(t),q=Je().slice();n>=0&&n<q.length?q[n]=B:q.push(B),rc(q),n=-1,t="",o="",i()}),S.appendChild(E),d.append(u,m,S),c.appendChild(d),e.appendChild(c),!a.length){let f=document.createElement("p");f.className="bloom-gc-empty",f.textContent="No greetings. The official heading stays.",e.appendChild(f);return}let p=document.createElement("div");p.className="bloom-gc-list",a.forEach((f,T)=>{let B=document.createElement("div");B.className="bloom-gc-item",T===s&&(B.dataset.active="true");let q=document.createElement("button");q.type="button",q.className=`bloom-gc-body${r===T?"":" bloom-gc-clamp"}`,q.textContent=f,q.addEventListener("click",()=>{r=r===T?-1:T,i()});let Ut=document.createElement("div");Ut.className="bloom-gc-item-actions";let Qe=ac("Edit",Zf);Qe.addEventListener("click",()=>{n=T,t=f,o="",i()});let ye=ac("Delete",Qf);ye.addEventListener("click",()=>{let Vt=Je().filter((et,Be)=>Be!==T);rc(Vt),n===T?(n=-1,t=""):n>T&&(n-=1),i()}),Ut.append(Qe,ye),B.append(q,Ut),p.appendChild(B)}),e.appendChild(p)};return ur=i,i(),()=>{ur===i&&(ur=null),e.replaceChildren()}}var cc=h({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[b.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:oc,settings:N,start(){ce=!0,w(oc,nc),Uf(),lr=new AbortController;let{signal:e}=lr;window.addEventListener("popstate",pr,{signal:e}),document.addEventListener("click",Wf,{capture:!0,signal:e}),document.addEventListener("click",Yf,{signal:e}),Xf(),Ze=null,be()?$i():_i(),Nf.debug("started")},stop(){ce=!1,lr?.abort(),lr=null,Gt!==void 0&&(clearTimeout(Gt),Gt=void 0),Oi(),Di(),Jf(),Vf(),y(Ft),Kt=!1,Ze=null},onSettingsChange(){ce&&(be()?(he(!1),Bi()):y(Ft))}});var to=new v("Bloom"),dc=!1,np=Date.now(),op=[Ka,As,$s,js,Us,Js,dl,ml,gl,Ll,Rl,_l,jl,Ql,tc,cc];function gr(e){return new Promise(t=>setTimeout(t,e))}function rp(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var mc=8e3,uc=300,ip=250;async function ap(){if($e())return await gr(uc),!0;for(;Date.now()-np<mc;)if(await gr(ip),$e())return await gr(uc),!0;return $e()||wr()}function qi(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function sp(){if(qi())return!0;let e=Date.now()+mc;for(;Date.now()<e;)if(await gr(100),qi())return!0;return qi()}function lp(){try{GM_registerMenuCommand?.("Bloom++ settings",za)}catch{}}function cp(){mo(()=>{Xt("HostShell"),to.info("host shell",F)}),fo(()=>{to.info("idle ready",F)}),po(()=>{zi(),Xt("HostReady"),to.info("chrome ready",F)})}async function ji(){await Qi()}async function Fi(){if(dc)return;dc=!0;for(let n of op)try{la(n)}catch(o){to.error("register failed",n.name,o)}ua(),Xt("Init"),lp(),cp();let e=()=>Xt("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await rp(),sp().then(n=>{n&&go()}),!await ap()){to.warn("late islands not detected; starting default plugins",F),ot(),ho();return}await ba()}var fc=typeof unsafeWindow<"u"?unsafeWindow:window,dp=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||dp){let e=fc.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",F);try{Object.defineProperty(fc,"Bloom",{value:Gi,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}ji().then(()=>Fi()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
