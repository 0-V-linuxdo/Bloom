// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260902] v1.1.9
// @description  Void++-style plugin host for chatgpt.com. Tab favicon, input history, hide Share and Dictation.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @icon         https://cdn.jsdelivr.net/gh/0-V-linuxdo/Bloom@heads/main/assets/logos/bloom-icon.svg
// @match        https://chatgpt.com/*
// @match        https://*.chatgpt.com/*
// @match        https://chat.openai.com/*
// @match        https://free.share-ai.top/*
// @match        https://chatgpt.aicnm.cc/*
// @run-at       document-start
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_setClipboard
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// @connect      cdn.jsdelivr.net
// @compatible   chrome
// @compatible   firefox
// @compatible   edge
// @license      GPL-3.0-or-later
// @downloadURL  https://cdn.jsdelivr.net/gh/0-V-linuxdo/Bloom@heads/main/userscript/Bloom.user.js
// @updateURL    https://cdn.jsdelivr.net/gh/0-V-linuxdo/Bloom@heads/main/userscript/Bloom.user.js
// ==/UserScript==

/* Bloom++ [20260902] v1.1.9. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var to=Object.defineProperty;var no=(e,t)=>{for(var n in t)to(e,n,{get:t[n],enumerable:!0})};var Rt={};no(Rt,{REPO_URL:()=>tn,Settings:()=>u,VERSION:()=>V,hasLateIslands:()=>le,init:()=>At,initSettings:()=>Pt,isDocumentInteractive:()=>nn,plugins:()=>T,requestPageTouch:()=>De,whenPageTouched:()=>z});var O=new Map,ke=!1;function et(e,t){if(!ke)return;if(t.disabled){t.el&&(t.el.disabled=!0);return}if(t.el){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1;return}if(typeof GM_addStyle!="function")return;let n=GM_addStyle(t.css);n instanceof HTMLStyleElement&&(n.dataset.bloomStyle=e,t.el=n)}function j(e,t){let n=O.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},O.set(e,n)),ke&&et(e,n)}function It(){ke=!0;for(let[e,t]of O)et(e,t);return!0}function Ot(e){let t=O.get(e);t&&(t.disabled=!1,ke&&et(e,t))}function Nt(e){let t=O.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0))}function $(e){let t=O.get(e);t&&(t.el?.remove(),O.delete(e))}function Dt(){return Array.from(O.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var p=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function v(e){return e}var tt=new Map;function Ht(e,t){let n=tt.get(e);return n||(n=new Set,tt.set(e,n)),n.add(t),()=>n.delete(t)}function oe(e,t){let n=tt.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var oo="bloompp";function Bt(){return new Promise((e,t)=>{let n=indexedDB.open(oo,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function _t(e){try{let t=await Bt();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function $t(e,t){try{let n=await Bt();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function re(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ft(e,t,n){return Math.min(n,Math.max(t,e))}function qt(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function Kt(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}var Me=new p("SettingsStore"),N="BloomSettings",ro=100;function Ae(e){if(re(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(re(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return re(n)?n:null}return null}catch{return null}}var Pe=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,d]of this.defaultGetters)if(l.startsWith(c)){let w=l.slice(c.length+1);if(w&&!w.includes(".")){let m=d(w);m!==void 0&&(i[a]=m,s=m);break}}}return re(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Me.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},ro))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(N,this.plain)}catch{try{GM_setValue(N,t)}catch(n){Me.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(N,t)}catch{}$t(N,t).catch(n=>Me.warn("Failed to save settings to IndexedDB:",n))}catch(t){Me.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){qt(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var io=new p("Settings"),ao={plugins:{}},u=new Pe(structuredClone(ao)),so=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function lo(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function L(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(u.store.plugins[n]||(u.store.plugins[n]={}),u.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?u.plain.plugins[n]??{}:{}}};return t}function co(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function jt(){let e=null;if(e=Ae(co(N)),e||(e=Ae(await _t(N))),!e)try{e=Ae(localStorage.getItem(N))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(u.plain.plugins=t),io.debug("Loaded settings")}}function Gt(e,t){t&&(t.pluginName=e,u.plain.plugins[e]||(u.plain.plugins[e]={}),u.setDefaultGetter(so(e),n=>{if(n!=="enabled")return lo(t.def,n)}))}var Re=new p("PluginManager"),T={},ae=new Set;function Ut(e){if(T[e.name]){Re.warn("Duplicate plugin",e.name);return}T[e.name]=e,Gt(e.name,e.settings)}function se(e){let t=T[e];if(!t)return!1;if(t.required)return!0;let n=u.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function Yt(e){let t=T[e];if(!t||t.required)return;let n=!se(e);u.plain.plugins[e]||(u.store.plugins[e]={}),u.store.plugins[e].enabled=n,n?Wt(t):uo(t),oe("pluginToggle",{name:e,enabled:n})}function Wt(e,t=!1){if(!ae.has(e.name)&&se(e.name))try{e.managedStyle&&Ot(e.managedStyle),e.start?.(),ae.add(e.name),e.settings&&u.addPrefixChangeListener(`plugins.${e.name}.`,()=>{ae.has(e.name)&&e.onSettingsChange?.()}),t||Re.debug("Started",e.name)}catch(n){Re.error("Failed to start",e.name,n)}}function uo(e){if(ae.has(e.name)){try{e.stop?.()}catch(t){Re.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(Nt(e.managedStyle),$(e.managedStyle)),ae.delete(e.name)}}function Ie(e){for(let t of Object.values(T))(t.startAt??"DOMContentLoaded")===e&&Wt(t)}var zt=2,Vt="defaultsRev";function Xt(){for(let t of Object.values(T))u.plain.plugins[t.name]||(u.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=u.store.plugins.Settings??(u.store.plugins.Settings={});if(e[Vt]!==zt){for(let t of["NoShareLink","NoDictation"]){let n=u.store.plugins[t]??(u.store.plugins[t]={});n.enabled=!1}e[Vt]=zt}}var nt=!1,Oe=!1,Ne=!1,Jt=!1,Zt=[];function fo(e){if(!(e instanceof Node))return!1;let t=e.getRootNode();if(t instanceof ShadowRoot){let n=t.host;if(n instanceof Element&&n.id==="bloom-root")return!0}return e instanceof Element&&!!e.closest("#bloom-root")}function ot(){if(Oe)return;if(!nt){Ne=!0;return}Oe=!0;let e=Zt.splice(0);for(let t of e)t()}function Qt(){nt=!0,Ne&&(Ne=!1,ot())}function z(e){Oe?e():Zt.push(e)}function De(){Ne=!0,nt&&setTimeout(ot,0)}function en(){if(Jt||Oe)return;Jt=!0;let e=t=>{t.isTrusted&&(fo(t.target)||(window.removeEventListener("pointerdown",e,!0),setTimeout(ot,0)))};window.addEventListener("pointerdown",e,{capture:!0,passive:!0})}var C={p:"0-V-linuxdo"},V="[20260902] v1.1.9",tn="https://github.com/0-V-linuxdo/Bloom";function mo(){try{return!!document.querySelector('a[href^="/c/"]')}catch{return!1}}function po(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function go(){try{let t=(document.querySelector("h1")?.textContent??"").replace(/\s+/g," ").trim();return!t||/what's on the agenda/i.test(t)?!1:/^(hey|hello|good\s)/i.test(t)}catch{return!1}}function le(){return mo()||po()||go()}function nn(){return le()}var bo=["#page-header",'[data-testid="page-header"]',"header"];function ce(e){return!(e instanceof HTMLElement)||!e.isConnected||e.closest("#bloom-root")?!1:e.getClientRects().length>0}function on(){for(let e of bo){let t=document.querySelector(e);if(ce(t))return t}for(let e of document.querySelectorAll("nav"))if(ce(e)&&!e.closest("aside, [data-testid='sidebar']"))return e;return null}function ho(e){let t=e.getAttribute("href")||"";try{if(t){let o=new URL(t,location.origin).pathname;if(/\/download\/?$/.test(o))return!0}}catch{}let n=`${e.getAttribute("aria-label")||""} ${e.textContent||""}`.replace(/\s+/g," ").trim();return!!(/download.{0,24}(chatgpt\s*)?(app|desktop)/i.test(n)||/下载.{0,16}(chatgpt|应用|app)/i.test(n)||/get (the )?app/i.test(n))}function yo(){let e=on();if(e){for(let n of e.querySelectorAll("a[href], button"))if(ce(n)&&ho(n))return n}let t=document.querySelector('a[href="/download"], a[href="/download/"], a[href*="chatgpt.com/download"]');return ce(t)?t:null}function vo(){let e=on();if(!e)return null;let t=e.querySelector('[data-testid="profile-button"], [data-testid="accounts-profile-button"]');return ce(t)?t:null}function rn(e){let n=yo(),o=vo(),r,i,a=e;if(n){let s=n.getBoundingClientRect();if(a=Math.max(32,Math.min(40,Math.round(s.height))),r=s.right+8,i=s.top+(s.height-a)/2,o){let l=o.getBoundingClientRect();r+a+8>l.left&&(r=l.left-8-a)}}else if(o){let s=o.getBoundingClientRect();r=s.left-8-a,i=s.top+(s.height-a)/2}else r=window.innerWidth-a-16,i=12;return r=Math.max(8,Math.min(window.innerWidth-a-8,r)),i=Math.max(8,Math.min(window.innerHeight-a-8,i)),{x:r,y:i,size:a}}var it=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary"],xo={light:{"--main-surface-primary":"#ffffff","--main-surface-secondary":"#f4f4f4","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#f9f9f9","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#b4b4b4","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.1)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.2)","--link":"#0d0d0d","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#f4f4f4","--bg-primary":"#ffffff","--bg-secondary":"#f4f4f4"},dark:{"--main-surface-primary":"#212121","--main-surface-secondary":"#2f2f2f","--main-surface-tertiary":"#424242","--sidebar-surface-primary":"#171717","--text-primary":"#ececec","--text-secondary":"#b4b4b4","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ececec","--icon-secondary":"#b4b4b4","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.1)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.2)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.06)","--interactive-label-primary-default":"#ececec","--message-surface":"#2f2f2f","--bg-primary":"#212121","--bg-secondary":"#2f2f2f"}};function So(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Eo(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function rt(e){let t=So(e);return t?Eo(t)>.55?"light":"dark":null}function wo(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=rt(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=rt(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=rt(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function He(e){return e==="auto"?wo():e}function Lo(e){try{let t=getComputedStyle(document.documentElement);for(let n of it){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function an(e,t,n){let o=xo[t];if(n){Lo(e);for(let r of it)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of it)e.style.setProperty(r,o[r])}function sn(e){let t=new MutationObserver(e);return t.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","data-color-scheme","style"]}),document.body&&t.observe(document.body,{attributes:!0,attributeFilter:["class","style"]}),()=>t.disconnect()}var ln=`/* Void++ / Vencord-style plugin cards. Tokens from chatgpt.com via :host. */

:host {
  --bloom-bg: var(--main-surface-primary, #ffffff);
  --bloom-surface: var(--main-surface-primary, #ffffff);
  --bloom-elevated: var(--main-surface-secondary, #f4f4f4);
  --bloom-tertiary: var(--main-surface-tertiary, #ececec);
  --bloom-fg: var(--text-primary, #0d0d0d);
  --bloom-muted: var(--text-secondary, #5d5d5d);
  --bloom-faint: var(--text-tertiary, #8f8f8f);
  --bloom-border: var(--border-light, rgba(0, 0, 0, 0.1));
  --bloom-border-strong: var(--border-medium, rgba(0, 0, 0, 0.15));
  --bloom-hover: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
  --bloom-icon: var(--icon-primary, #0d0d0d);
  --bloom-accent: var(--text-accent, #10a37f);
  --bloom-shadow: 0 0 0 1px var(--bloom-border), 0 8px 24px rgba(0, 0, 0, 0.12);
  --bloom-fab-shadow: 0 0 0 1px var(--bloom-border), 0 2px 8px rgba(0, 0, 0, 0.08);
  --bloom-ease: cubic-bezier(0.32, 0.72, 0, 1);
  color-scheme: light;
  font: 14px/1.45 ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
  color: var(--bloom-fg);
  -webkit-font-smoothing: antialiased;
  pointer-events: none;
}

:host([data-bloom-scheme="dark"]) {
  color-scheme: dark;
  --bloom-bg: var(--main-surface-primary, #212121);
  --bloom-surface: var(--main-surface-primary, #212121);
  --bloom-elevated: var(--main-surface-secondary, #2f2f2f);
  --bloom-tertiary: var(--main-surface-tertiary, #424242);
  --bloom-fg: var(--text-primary, #ececec);
  --bloom-muted: var(--text-secondary, #b4b4b4);
  --bloom-faint: var(--text-tertiary, #8f8f8f);
  --bloom-border: var(--border-light, rgba(255, 255, 255, 0.1));
  --bloom-border-strong: var(--border-medium, rgba(255, 255, 255, 0.15));
  --bloom-hover: var(--interactive-bg-secondary-hover, rgba(255, 255, 255, 0.06));
  --bloom-icon: var(--icon-primary, #ececec);
  --bloom-shadow: 0 0 0 1px var(--bloom-border), 0 16px 40px rgba(0, 0, 0, 0.48);
  --bloom-fab-shadow: 0 0 0 1px var(--bloom-border), 0 2px 8px rgba(0, 0, 0, 0.4);
}

:host *,
:host *::before,
:host *::after {
  box-sizing: border-box;
}

:host button,
:host input,
:host select {
  font: inherit;
  color: inherit;
}

.bloom-settings-fab {
  position: fixed;
  z-index: 2147483645;
  right: 16px;
  top: 12px;
  width: 36px;
  height: 36px;
  margin: 0;
  padding: 3px;
  border: 0;
  border-radius: 999px;
  background: var(--bloom-surface);
  color: var(--bloom-icon);
  box-shadow: var(--bloom-fab-shadow);
  cursor: pointer;
  display: grid;
  place-items: center;
  pointer-events: auto;
  transition:
    transform 160ms var(--bloom-ease),
    background-color 160ms var(--bloom-ease),
    box-shadow 160ms var(--bloom-ease);
}

.bloom-settings-fab:hover {
  background: var(--bloom-elevated);
}

.bloom-settings-fab:active {
  transform: scale(0.96);
}

.bloom-settings-fab:focus-visible {
  outline: 2px solid var(--bloom-fg);
  outline-offset: 2px;
}

.bloom-settings-fab svg {
  width: 100%;
  height: 100%;
  display: block;
}

.bloom-settings-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2147483646;
  border: 0;
  padding: 0;
  margin: 0;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  pointer-events: auto;
}

.bloom-settings-modal {
  position: fixed;
  z-index: 2147483647;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: min(540px, calc(100vw - 32px));
  max-height: min(82vh, 760px);
  overflow: auto;
  padding: 16px 16px 20px;
  border: 0;
  border-radius: 12px;
  background: var(--bloom-bg);
  color: var(--bloom-fg);
  box-shadow: var(--bloom-shadow);
  pointer-events: auto;
}

.bloom-settings-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 0 4px 4px;
}

.bloom-settings-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.bloom-settings-mark {
  width: 22px;
  height: 22px;
  color: var(--bloom-icon);
  display: grid;
  place-items: center;
  flex: 0 0 auto;
}

.bloom-settings-mark svg {
  width: 22px;
  height: 22px;
}

.bloom-settings-head h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.bloom-settings-sub {
  margin: 0 4px 14px;
  font-size: 0.8125rem;
  color: var(--bloom-muted);
}

.bloom-icon-btn {
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--bloom-muted);
  display: grid;
  place-items: center;
  cursor: pointer;
  flex: 0 0 auto;
}

.bloom-icon-btn:hover {
  color: var(--bloom-fg);
  background: var(--bloom-hover);
}

.bloom-icon-btn svg {
  width: 16px;
  height: 16px;
}

.bloom-plugin-card {
  padding: 16px;
  border-radius: 8px;
  background: var(--bloom-elevated);
  border: 1px solid var(--bloom-border);
  margin-bottom: 10px;
}

.bloom-plugin-card:last-child {
  margin-bottom: 0;
}

.bloom-plugin-card header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.bloom-plugin-info {
  min-width: 0;
  flex: 1;
}

.bloom-plugin-title {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px;
}

.bloom-plugin-card h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.bloom-plugin-authors {
  font-size: 0.75rem;
  color: var(--bloom-faint);
  font-weight: 500;
}

.bloom-plugin-card header p {
  margin: 4px 0 0;
  color: var(--bloom-muted);
  font-size: 0.8125rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bloom-plugin-settings {
  margin-top: 12px;
  padding-top: 4px;
  border-top: 1px solid var(--bloom-border);
}

.bloom-toggle {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  flex: 0 0 auto;
}

.bloom-switch {
  position: relative;
  width: 40px;
  height: 24px;
  flex: 0 0 auto;
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
  width: 40px;
  height: 24px;
  border-radius: 999px;
  background: var(--bloom-tertiary);
  transition: background-color 150ms var(--bloom-ease);
}

.bloom-switch span::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
  transition: transform 150ms var(--bloom-ease);
}

.bloom-switch input:checked + span {
  background: var(--bloom-accent, #10a37f);
}

.bloom-switch input:checked + span::after {
  transform: translateX(16px);
}

.bloom-switch input:focus-visible + span {
  outline: 2px solid var(--bloom-fg);
  outline-offset: 2px;
}

.bloom-switch input:disabled + span {
  opacity: 0.45;
}

.bloom-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin: 0;
  padding: 10px 0;
  border-bottom: 1px solid var(--bloom-border);
}

.bloom-field:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.bloom-field > span:first-child,
.bloom-field > summary {
  font-size: 0.875rem;
  color: var(--bloom-fg);
  line-height: 1.35;
  min-width: 0;
  flex: 1;
}

.bloom-field-block {
  display: block;
  padding-top: 12px;
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
  color: var(--bloom-muted);
}

.bloom-field-block[open] > summary::before {
  content: "\u25BE ";
}

.bloom-field select {
  height: 32px;
  min-width: 148px;
  max-width: 52%;
  border-radius: 6px;
  border: 1px solid var(--bloom-border-strong);
  background: var(--bloom-surface);
  color: inherit;
  padding: 0 10px;
  font: inherit;
  font-size: 0.8125rem;
}

.bloom-field select:hover {
  border-color: var(--bloom-fg);
}

.bloom-field select:focus {
  outline: 2px solid var(--bloom-fg);
  outline-offset: 1px;
}

.bloom-field input[type="range"] {
  width: 140px;
  accent-color: var(--bloom-accent, #10a37f);
  height: 24px;
}

.bloom-field-slider {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
}

.bloom-field-slider > span {
  min-width: 2ch;
  font-size: 0.75rem;
  color: var(--bloom-muted);
  font-variant-numeric: tabular-nums;
}

@media (prefers-reduced-motion: reduce) {
  .bloom-settings-fab,
  .bloom-settings-modal,
  .bloom-switch span,
  .bloom-switch span::after {
    transition: none;
  }
}
`;var at="bloom-root",Co=L({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),g=null,b=null,$e=!1,st=[],Be=null,lt=!1,_e=null,F;function cn(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function ko(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Mo(){return"auto"}function ue(){if(!g)return;let e=Mo(),t=He(e);g.setAttribute("data-bloom-scheme",t),an(g,t,e==="auto"),oe("schemeChange",{scheme:t,pref:e})}function ct(){if(!b)return;let e=b.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",b.appendChild(e)),e.textContent=Dt()}function de(){if(b)return ue(),ct(),b;if(g=document.getElementById(at),g||(g=document.createElement("div"),g.id=at,g.style.pointerEvents="none"),document.body&&g.parentNode!==document.body&&document.body.appendChild(g),b=g.shadowRoot??g.attachShadow({mode:"open"}),!b.querySelector("style[data-bloom]")){let e=document.createElement("style");e.dataset.bloom="1",e.textContent=ln,b.appendChild(e)}return ue(),ct(),lt||(b.addEventListener("keydown",Io),lt=!0),b}function U(){$e=!1;for(let e of st)e();st=[],b?.querySelector(".bloom-settings-backdrop")?.remove(),b?.querySelector(".bloom-settings-modal")?.remove()}function un(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function Po(e,t,n){if(n.type===5&&n.render){let a=document.createElement("details");a.className="bloom-field bloom-field-block";let s=document.createElement("summary");s.textContent=n.description||t;let l=document.createElement("div");return st.push(n.render(l)),a.append(s,l),a}let o=document.createElement("div");o.className="bloom-field";let r=document.createElement("span");r.textContent=n.description||t,o.appendChild(r);let i=u.store.plugins[e]??(u.store.plugins[e]={});if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??n.options.find(s=>s.default)?.value??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=un(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),o.appendChild(a),o}return o}function ut(e){U(),ct(),$e=!0;let t=document.createElement("button");t.type="button",t.className="bloom-settings-backdrop",t.setAttribute("aria-label","Close settings"),t.addEventListener("click",U);let n=document.createElement("div");n.className="bloom-settings-modal",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.setAttribute("aria-labelledby","bloom-settings-title"),n.tabIndex=-1,n.addEventListener("click",c=>c.stopPropagation());let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=cn();let a=document.createElement("h2");a.id="bloom-settings-title",a.textContent="Bloom++",r.append(i,a);let s=document.createElement("button");s.type="button",s.className="bloom-icon-btn",s.setAttribute("aria-label","Close"),s.innerHTML=ko(),s.addEventListener("click",U),o.append(r,s),n.appendChild(o);let l=document.createElement("p");l.className="bloom-settings-sub",l.textContent="Plugins",n.appendChild(l);for(let c of Object.values(T)){if(c.hidden||c.name==="Settings")continue;let d=document.createElement("section");d.className="bloom-plugin-card";let w=document.createElement("header"),m=document.createElement("div");m.className="bloom-plugin-info";let _=document.createElement("div");_.className="bloom-plugin-title";let M=document.createElement("h3");if(M.textContent=c.name,_.appendChild(M),c.authors?.length){let y=document.createElement("span");y.className="bloom-plugin-authors",y.textContent=c.authors.join(", "),_.appendChild(y)}let I=document.createElement("p");I.textContent=c.description,m.append(_,I);let h=un(c.name,se(c.name),!!c.required);if(h.querySelector("input")?.addEventListener("change",()=>{Yt(c.name),ut(e)}),w.append(m,h),d.appendChild(w),se(c.name)&&c.settings){let y=document.createElement("div");y.className="bloom-plugin-settings";for(let[Je,Ze]of Object.entries(c.settings.def)){let K=Po(c.name,Je,Ze);K&&y.appendChild(K)}y.childElementCount&&d.appendChild(y)}n.appendChild(d)}e.append(t,n),n.focus(),oe("settingsOpen",void 0)}function Ao(e){let t=rn(36);e.style.width=`${t.size}px`,e.style.height=`${t.size}px`,e.style.left=`${Math.round(t.x)}px`,e.style.top=`${Math.round(t.y)}px`,e.style.right="auto",e.style.bottom="auto"}function Ro(){let e=de();e.querySelector(".bloom-settings-fab")?.remove(),_e?.abort(),F!==void 0&&(clearInterval(F),F=void 0);let t=document.createElement("button");t.type="button",t.className="bloom-settings-fab",t.setAttribute("aria-label","Bloom++ settings"),t.innerHTML=cn(),t.addEventListener("click",()=>{$e?U():ut(e)}),e.appendChild(t);let n=new AbortController;_e=n;let o=()=>Ao(t);window.addEventListener("resize",o,{signal:n.signal}),window.addEventListener("scroll",o,{capture:!0,passive:!0,signal:n.signal}),F=setInterval(o,1e3),o()}function Io(e){e.key==="Escape"&&$e&&(U(),e.stopPropagation())}function dn(){De(),z(()=>ut(de()))}var fn=v({name:"Settings",description:"Bloom++ settings, docked next to Download the ChatGPT app.",authors:[C.p],required:!0,hidden:!0,enabledByDefault:!0,settings:Co,startAt:"HostReady",cleanupSelectors:[`#${at}`],start(){Ro(),ue(),Be?.(),Be=sn(ue)},stop(){_e?.abort(),_e=null,F!==void 0&&(clearInterval(F),F=void 0),Be?.(),Be=null,U(),g?.remove(),g=null,b=null,lt=!1},onSettingsChange:ue});function Oo(e){return e instanceof HTMLLinkElement&&(e.relList.contains("icon")||/\bicon\b/i.test(e.rel))}function Fe(e){return!!e&&!e.startsWith("data:")&&e!=="undefined"}function mn(){let{head:e}=document;if(!e)return null;for(let t of e.querySelectorAll("link"))if(Oo(t))return t;return null}function pn(e,t){let n=mn();n&&n.getAttribute("href")!==t&&n.setAttribute("href",t)}function dt(e,t){if(!Fe(t))return;let n=mn();n&&n.href!==t&&(n.href=t)}var bn='form[data-type="unified-composer"], form.w-full[data-type]',D="#prompt-textarea",qe='button[data-testid="send-button"]',gn='button[data-testid="stop-button"]';function P(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function fe(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!P(r)))return r;return null}function H(){let t=Array.from(document.querySelectorAll(bn)).find(P);if(t instanceof HTMLElement)return t;let n=fe(document,D),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function q(){let e=Array.from(document.querySelectorAll(D));return e.find(P)??e[0]??null}function ft(){let e=q();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function No(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function me(){let e=H();return fe(e,qe)??fe(document,qe)}function mt(){let e=me();return!!e&&No(e)}function pt(){let e=H();return fe(e,gn,!0)??fe(document,gn,!0)}function Y(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}function Ke(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=c=>{let d=n.indexOf(c);return d>=0&&n[d+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,d)=>{try{return document.querySelector(c)?.getAttribute(d)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function je(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function Do(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(P(t)&&/\bStop\b/i.test(t.textContent||""))return t;return null}function Ho(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&P(e))}function Bo(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&P(e))}function gt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function Ge(){return pt()||Do()?!0:me()&&P(me())?!1:!!(Ho()||Bo())}var _o=["original","badge","dot","hole","bg"],hn=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge",default:!0},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],$o={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Fo={dark:{plate:"#212121",mark:"#ececec",ring:"#212121",glyph:"#ffffff"},light:{plate:"#ffffff",mark:"#0d0d0d",ring:"#ffffff",glyph:"#ffffff"}},qo="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Ko={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"};function yn(e){return typeof e=="string"&&_o.includes(e)}function vn(e){return e==="original"||e==="badge"||e==="dot"}function jo(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function pe(e,t="0 0 64 64"){let n=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${t}" width="64" height="64">${e}</svg>`;return`data:image/svg+xml;charset=utf-8,${encodeURIComponent(n)}`}function Go(e){return`<g transform="translate(8 8) scale(2)" fill="${e}" fill-rule="evenodd"><path d="${qo}"/></g>`}function ge(e,t){return`<rect width="64" height="64" rx="14" fill="${t}"/>${Go(e)}`}function zo(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function Vo(e){return`<image href="${zo(e)}" width="64" height="64" preserveAspectRatio="xMidYMid meet"/>`}function Uo(e,t){return e==="rotate"?['<g transform="translate(51.5 51.5)"><g>',`<path d="M0-6.1 A6.1 6.1 0 1 1 -5.3 3.05" fill="none" stroke="${t}" stroke-width="2.15" stroke-linecap="round"/>`,'<animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.85s" repeatCount="indefinite"/>',"</g></g>"].join(""):e==="done"?`<path d="M46.6 51.7 L50.1 55.3 L56.8 47.4" fill="none" stroke="${t}" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>`:e==="ready"?[`<path d="M51.5 56.4 V46.8" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round"/>`,`<path d="M46.6 51.2 L51.5 46.2 L56.4 51.2" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`].join(""):[`<path d="M47.2 47.2 L55.8 55.8" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round"/>`,`<path d="M55.8 47.2 L47.2 55.8" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round"/>`].join("")}function be(e,t,n,o="dark"){let r=Fo[o],i=n&&!n.startsWith("data:")?n:"";if(e==="original")return t==="wait"?i||pe(ge(r.mark,r.plate)):jo(Ko[t]);let a=t==="wait"?void 0:$o[t];if(e==="hole")return pe(ge(a??r.mark,r.plate));if(e==="bg")return pe(ge(r.mark,a??r.plate));if(!a||t==="wait")return i||pe(ge(r.mark,r.plate));let s=e==="dot"?[`<circle cx="52.2" cy="52.2" r="10.4" fill="${r.ring}"/>`,`<circle cx="52.2" cy="52.2" r="7.7" fill="${a}"/>`].join(""):[`<circle cx="51.5" cy="51.5" r="12.15" fill="${r.ring}"/>`,`<circle cx="51.5" cy="51.5" r="9.55" fill="${a}"/>`,Uo(t,r.glyph)].join(""),l=i?Vo(i):ge(r.mark,r.plate);return pe(l+s)}function bt(e,t,n="dark"){return{wait:be(e,"wait",t,n),rotate:be(e,"rotate",t,n),done:be(e,"done",t,n),ready:be(e,"ready",t,n),error:be(e,"error",t,n)}}var Yo=new p("ChatStateFavicons"),Se="bloom-chat-state-favicon",wn=L({style:{type:3,description:"Favicon overlay",options:hn}}),B="",ze="light",Ln=bt("badge","",ze),Tn="wait",ye=!1,A=!1,x=null,ve="",xe="",Ee=!0,R=null,he=null,ht=null,X=0,W,we=!1,xn=new WeakSet;function Cn(){let e=wn.store.style;return yn(e)?e:"badge"}function Wo(){return"auto"}function kn(){return He(Wo())}function Sn(){let t=document.querySelector(`link[rel~="icon"]:not(#${Se})`)?.href;return Fe(t)?t:Fe(B)?B:""}function S(e){Tn=e;let t=Cn();if(e==="wait"&&vn(t)){dt(Se,B);return}pn(Se,Ln[e])}function yt(){ze=kn(),Ln=bt(Cn(),B,ze),S(Tn)}function Xo(){let e=Ke(),t=e?je(e):je("");return Ge()?(!ve&&t&&(ve=t),ve||t):(ve="",t)}function Mn(){ye=!1,A=!1,x=null,ve=""}function Jo(e){xe=e,Mn(),Ee=!1,R?.disconnect(),R=null,S("wait")}function Pn(){if(!we)return;let e=Ke()||location.pathname;if(xe&&e&&xe!==e){Jo(e);return}e&&(xe=e);let t=Xo(),n=Ge(),o=ft(),r=mt();if(gt()&&!n){S("error"),ye=!1,A=!1,x=null;return}if(n){ye=!0,A=!1,x=t,S("rotate");return}if(ye){let i=!!x&&!!t&&x===t;if(ye=!1,i){A=!0,x=t,S("done");return}A=!1,x=null}if(A)if(!!(x&&t&&x!==t))A=!1,x=null;else if(o){S("done");return}else if(Ee){A=!1,S("ready");return}else{A=!1,S("wait");return}x=null,S(o?"wait":Ee?"ready":"wait")}function Ve(){!we||X||(X=requestAnimationFrame(()=>{if(X=0,!we)return;An();let e=H();e!==document.body&&(!R||!e.isConnected)&&Rn(),Pn()}))}function En(){Ee=!0,Ve()}function An(){let e=q();!e||xn.has(e)||(xn.add(e),e.addEventListener("input",En,{passive:!0}),e.addEventListener("compositionend",En,{passive:!0}))}function Rn(){R?.disconnect(),R=null;let e=H();!e||e===document.body||(R=new MutationObserver(()=>Ve()),R.observe(e,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid","class"]}))}var In=v({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[C.p],tags:["chat","ui"],enabledByDefault:!0,settings:wn,startAt:"HostReady",cleanupSelectors:[`#${Se}`],start(){we=!0,ze=kn(),B=Sn()||B,yt(),ht=Ht("schemeChange",()=>{let e=Sn();e&&(B=e),yt()}),he?.abort(),he=new AbortController,window.addEventListener("popstate",Ve,{signal:he.signal}),An(),Rn(),W!==void 0&&clearInterval(W),W=setInterval(Ve,1500),Pn(),Yo.debug("favicon watch started")},stop(){we=!1,X&&cancelAnimationFrame(X),X=0,W!==void 0&&(clearInterval(W),W=void 0),he?.abort(),he=null,ht?.(),ht=null,R?.disconnect(),R=null,Mn(),xe="",Ee=!0,dt(Se,B)},onSettingsChange:yt});var On=`.bloom-ih-hud {
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
`;var Dn=new p("InputHistory"),vt=/\u200B/g,Hn=10,Bn=500,_n=100,Qo=8,er=120,tr=2e3,Ue=10,Ye=L({maxEntries:{type:4,description:"Max stored prompts",min:Hn,max:Bn,default:_n},history:{type:5,description:"Stored prompts",render:pr}}),xt=new Map,f=0,St="",k=!1,Te=!1,Lt=0,Z=null,Et=null,J,wt,Tt=null,$n=!0;function E(){let e=Ye.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Fn(e){let t=Ft(Number(Ye.store.maxEntries??_n),Hn,Bn);return e.length>t?e.slice(e.length-t):e}function We(e){Ye.store.entries=Fn(e)}function nr(e){return e.replaceAll(vt,"").replace(/\n$/,"").trim()}function Le(e){let n=(e instanceof Element?e:null)?.closest?.(D);return n instanceof HTMLElement?n:q()}function or(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!Y(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(vt,"").trim().length===0,last:i.toString().replaceAll(vt,"").trim().length===0}}catch{return{first:!0,last:!0}}}function qn(e,t){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch(i){Dn.debug("pm caret failed:",i)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function Kn(e){clearTimeout(wt),wt=setTimeout(()=>{if(e!==Lt)return;Te=!1;let t=Tt;t&&qn(t,$n)},er)}function jn(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),Te=!0,Tt=e,$n=n;let i=++Lt;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(a){Dn.debug("insertText failed:",a),e.textContent=t,e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:"insertText"}))}qn(e,n),Kn(i)}function rr(){let e=de(),t=e.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",e.appendChild(t)),t}function Q(){document.getElementById("bloom-root")?.shadowRoot?.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function ir(e,t){let n=rr();n.textContent=e;let o=(t.closest("form")??H()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-Qo)}px`,n.classList.add("bloom-ih-hud-on")}function Ct(e){let t=nr(e);if(!t)return;let n=Date.now(),o=xt.get(t);if(o&&n-o<tr)return;xt.set(t,n);let r=E().filter(i=>i!==t);r.push(t),We(r),f=E().length,k=!1,Q()}function ar(e,t){let n=E();if(!n.length&&e)return;f>=n.length&&(St=Y(t),f=n.length);let o=e?f-1:f+1;o<0||o>n.length||(f=o,k=!0,jn(t,o===n.length?St:n[o],e),o<n.length?ir(`${o+1} / ${n.length}`,t):Q())}function sr(e){k=!1,Q(),jn(e,St,!1),f=E().length}function lr(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=Le(e.target);if((!t||!t.contains(e.target)&&e.target!==t)&&(!Le(document.activeElement)||e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"))return;let n=Le(e.target)??Le(document.activeElement);if(!n)return;if(e.key==="Escape"&&k&&!e.altKey&&!e.shiftKey){sr(n),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){Ct(Y(n));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let o=e.key==="ArrowUp",r=e.altKey,i=E();if(!r){let a=or(n);if(o&&!a.first||!o&&!a.last)return}o&&(!i.length||f<=0)||!o&&f>=i.length||(e.preventDefault(),e.stopImmediatePropagation(),ar(o,n))}function cr(e){if(Le(e.target)){if(Te){Kn(Lt);return}k&&(k=!1,Q(),f=E().length)}}function ur(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(D);n instanceof HTMLElement&&Ct(Y(n))}function dr(e){let t=e.target;if(!(t instanceof Element)||!t.closest(qe))return;let o=q();o&&Ct(Y(o))}function fr(){!k||Te||(k=!1,Q())}function Nn(){let e=document.querySelector('form[data-type="unified-composer"]');if(!(e instanceof HTMLElement))return!1;if(Et===e&&Z)return!0;Z?.abort(),Z=new AbortController,Et=e;let{signal:t}=Z;return e.addEventListener("keydown",lr,{capture:!0,signal:t}),e.addEventListener("input",cr,{capture:!0,signal:t}),e.addEventListener("submit",ur,{capture:!0,signal:t}),e.addEventListener("click",dr,{capture:!0,signal:t}),e.addEventListener("pointerdown",fr,{capture:!0,signal:t}),!0}function mr(e){let t=E().slice();t.splice(e,1),We(t),f>t.length&&(f=t.length)}function pr(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=E().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(h=>h.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/Ue));n>=l&&(n=l-1);let c=s.slice(n*Ue,n*Ue+Ue);e.replaceChildren();let d=document.createElement("input");if(d.className="bloom-ih-search",d.type="search",d.placeholder="Search history",d.autocomplete="off",d.value=t,d.addEventListener("input",()=>{t=d.value,n=0,r()}),e.appendChild(d),c.length){let h=document.createElement("div");h.className="bloom-ih-list",c.forEach((Ce,y)=>{let Je=i.indexOf(Ce),Ze=E().length-1-Je,K=document.createElement("div");K.className="bloom-ih-item";let ee=document.createElement("button");ee.type="button",ee.className=`bloom-ih-body${o===y?"":" bloom-ih-clamp"}`,ee.textContent=Ce,ee.addEventListener("click",()=>{o=o===y?-1:y,r()});let Qe=document.createElement("div");Qe.className="bloom-ih-actions";let te=document.createElement("button");te.type="button",te.title="Copy",te.textContent="C",te.addEventListener("click",()=>{Kt(Ce)});let ne=document.createElement("button");ne.type="button",ne.title="Delete",ne.textContent="\xD7",ne.addEventListener("click",()=>{mr(Ze),r()}),Qe.append(te,ne),K.append(ee,Qe),h.appendChild(K)}),e.appendChild(h)}else{let h=document.createElement("p");h.className="bloom-ih-empty",h.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(h)}let w=document.createElement("div");w.className="bloom-ih-pager";let m=document.createElement("button");m.type="button",m.className="bloom-ih-btn",m.textContent="Prev",m.disabled=n<=0,m.addEventListener("click",()=>{n-=1,r()});let _=document.createElement("span");_.textContent=`${n+1} / ${l}`;let M=document.createElement("button");M.type="button",M.className="bloom-ih-btn",M.textContent="Next",M.disabled=n+1>=l,M.addEventListener("click",()=>{n+=1,r()});let I=document.createElement("button");I.type="button",I.className="bloom-ih-clear",I.textContent="Clear all",I.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(We([]),f=0,r())}),w.append(m,_,M,I),e.appendChild(w)};return r(),()=>{e.replaceChildren()}}var Gn=v({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[C.p],tags:["chat"],enabledByDefault:!0,settings:Ye,startAt:"HostReady",managedStyle:"inputHistory",start(){j("inputHistory",On),de(),f=E().length,k=!1,Nn(),J!==void 0&&clearInterval(J),J=setInterval(Nn,1500)},stop(){Z?.abort(),Z=null,Et=null,J!==void 0&&(clearInterval(J),J=void 0),Q(),xt.clear(),clearTimeout(wt),Te=!1,Tt=null,k=!1},onSettingsChange(){let e=E(),t=Fn(e);t.length!==e.length&&We(t),f>t.length&&(f=t.length)}});var kt="noShareLink",gr=['button[data-testid="share-chat-button"]'],br=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],Mt=L({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function zn(e){return`${e.join(",")}{display:none!important}`}function Vn(){let e=[];if(Mt.store.hideShareChat!==!1&&e.push(zn(gr)),Mt.store.hideShareProject!==!1&&e.push(zn(br)),!e.length){$(kt);return}j(kt,e.join(`
`))}var Un=v({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[C.p],tags:["ui","privacy"],enabledByDefault:!1,startAt:"HostReady",settings:Mt,start:Vn,onSettingsChange:Vn,stop(){$(kt)}});var Xn="noDictation",hr=['button[data-testid="composer-speech-button"]'],yr=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]'],Jn=L({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Yn(e){return`${e.join(",")}{display:none!important}`}function Wn(){let e=[Yn(hr)];Jn.store.hideDictationSettings!==!1&&e.push(Yn(yr)),j(Xn,e.join(`
`))}var Zn=v({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[C.p],tags:["chat","ui"],enabledByDefault:!1,startAt:"HostReady",settings:Jn,start:Wn,onSettingsChange:Wn,stop(){$(Xn)}});var Xe=new p("Bloom"),Qn=!1,vr=Date.now(),xr=[fn,In,Gn,Un,Zn];function Sr(e){return new Promise(t=>setTimeout(t,e))}function Er(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var wr=8e3,Lr=2e4,Tr=300,Cr=100;function kr(){return new Promise(e=>{let t=!1,n=i=>{t||(t=!0,clearInterval(r),i?Sr(Tr).then(()=>e(!0)):e(!1))},o=()=>{let i=Date.now()-vr;if(!(i<wr)){if(le()){n(!0);return}i>=Lr&&n(!1)}},r=setInterval(o,Cr);o()})}function Mr(){try{GM_registerMenuCommand?.("Bloom++ settings",dn)}catch{}}function Pr(){z(()=>{It(),Ie("HostReady"),Xe.info("page touch",V)})}async function Pt(){await jt()}async function At(){if(Qn)return;Qn=!0;for(let n of xr)try{Ut(n)}catch(o){Xe.error("register failed",n.name,o)}Xt(),Ie("Init"),Mr();let e=()=>Ie("DOMContentLoaded");document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await Er();let t=await kr();if(Qt(),Pr(),!t){Xe.warn("late islands not detected; waiting for menu",V);return}en(),Xe.info("script ready",V)}var eo=typeof unsafeWindow<"u"?unsafeWindow:window;window===window.top&&!eo.Bloom&&(Object.defineProperty(eo,"Bloom",{value:Rt,writable:!1,configurable:!0}),Pt().then(()=>At()).catch(e=>console.error("[Bloom++] Fatal init error:",e)));})();
