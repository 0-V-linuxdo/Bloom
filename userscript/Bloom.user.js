// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260902] v1.2.0
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

/* Bloom++ [20260902] v1.2.0. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var ao=Object.defineProperty;var so=(e,t)=>{for(var n in t)ao(e,n,{get:t[n],enumerable:!0})};var It={};so(It,{REPO_URL:()=>on,Settings:()=>c,VERSION:()=>G,hasLateIslands:()=>ae,init:()=>Rt,initSettings:()=>Nt,isDocumentInteractive:()=>rn,plugins:()=>L,requestPageTouch:()=>Re,whenPageTouched:()=>z});var N=new Map,we=!1;function Qe(e,t){if(!we)return;if(t.disabled){t.el&&(t.el.disabled=!0);return}if(t.el){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1;return}if(typeof GM_addStyle!="function")return;let n=GM_addStyle(t.css);n instanceof HTMLStyleElement&&(n.dataset.bloomStyle=e,t.el=n)}function j(e,t){let n=N.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},N.set(e,n)),we&&Qe(e,n)}function Ot(){we=!0;for(let[e,t]of N)Qe(e,t);return!0}function Ht(e){let t=N.get(e);t&&(t.disabled=!1,we&&Qe(e,t))}function Dt(e){let t=N.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0))}function _(e){let t=N.get(e);t&&(t.el?.remove(),N.delete(e))}function Bt(){return Array.from(N.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var p=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function v(e){return e}var et=new Map;function _t(e,t){let n=et.get(e);return n||(n=new Set,et.set(e,n)),n.add(t),()=>n.delete(t)}function ne(e,t){let n=et.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var lo="bloompp";function $t(){return new Promise((e,t)=>{let n=indexedDB.open(lo,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function qt(e){try{let t=await $t();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function Ft(e,t){try{let n=await $t();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function oe(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function jt(e,t,n){return Math.min(n,Math.max(t,e))}function Kt(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function zt(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}var Le=new p("SettingsStore"),R="BloomSettings",co=100;function Ce(e){if(oe(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(oe(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return oe(n)?n:null}return null}catch{return null}}var ke=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[u,d]of this.defaultGetters)if(l.startsWith(u)){let f=l.slice(u.length+1);if(f&&!f.includes(".")){let h=d(f);h!==void 0&&(i[a]=h,s=h);break}}}return oe(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Le.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},co))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(R,this.plain)}catch{try{GM_setValue(R,t)}catch(n){Le.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(R,t)}catch{}Ft(R,t).catch(n=>Le.warn("Failed to save settings to IndexedDB:",n))}catch(t){Le.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){Kt(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var uo=new p("Settings"),mo={plugins:{}},c=new ke(structuredClone(mo)),fo=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function po(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function w(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(c.store.plugins[n]||(c.store.plugins[n]={}),c.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?c.plain.plugins[n]??{}:{}}};return t}function go(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function Gt(){let e=null;if(e=Ce(go(R)),e||(e=Ce(await qt(R))),!e)try{e=Ce(localStorage.getItem(R))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(c.plain.plugins=t),uo.debug("Loaded settings")}}function Vt(e,t){t&&(t.pluginName=e,c.plain.plugins[e]||(c.plain.plugins[e]={}),c.setDefaultGetter(fo(e),n=>{if(n!=="enabled")return po(t.def,n)}))}var Te=new p("PluginManager"),L={},ie=new Set;function Wt(e){if(L[e.name]){Te.warn("Duplicate plugin",e.name);return}L[e.name]=e,Vt(e.name,e.settings)}function Me(e){let t=L[e];if(!t)return!1;if(t.required)return!0;let n=c.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function Xt(e){let t=L[e];if(!t||t.required)return;let n=!Me(e);c.plain.plugins[e]||(c.store.plugins[e]={}),c.store.plugins[e].enabled=n,n?Jt(t):bo(t),ne("pluginToggle",{name:e,enabled:n})}function Jt(e,t=!1){if(!ie.has(e.name)&&Me(e.name))try{e.managedStyle&&Ht(e.managedStyle),e.start?.(),ie.add(e.name),e.settings&&c.addPrefixChangeListener(`plugins.${e.name}.`,()=>{ie.has(e.name)&&e.onSettingsChange?.()}),t||Te.debug("Started",e.name)}catch(n){Te.error("Failed to start",e.name,n)}}function bo(e){if(ie.has(e.name)){try{e.stop?.()}catch(t){Te.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(Dt(e.managedStyle),_(e.managedStyle)),ie.delete(e.name)}}function Pe(e){for(let t of Object.values(L))(t.startAt??"DOMContentLoaded")===e&&Jt(t)}var Ut=2,Yt="defaultsRev";function Zt(){for(let t of Object.values(L))c.plain.plugins[t.name]||(c.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=c.store.plugins.Settings??(c.store.plugins.Settings={});if(e[Yt]!==Ut){for(let t of["NoShareLink","NoDictation"]){let n=c.store.plugins[t]??(c.store.plugins[t]={});n.enabled=!1}e[Yt]=Ut}}var tt=!1,Ae=!1,Ne=!1,Qt=!1,en=[];function ho(e){if(!(e instanceof Node))return!1;let t=e.getRootNode();if(t instanceof ShadowRoot){let n=t.host;if(n instanceof Element&&n.id==="bloom-root")return!0}return e instanceof Element&&!!e.closest("#bloom-root")}function nt(){if(Ae)return;if(!tt){Ne=!0;return}Ae=!0;let e=en.splice(0);for(let t of e)t()}function tn(){tt=!0,Ne&&(Ne=!1,nt())}function z(e){Ae?e():en.push(e)}function Re(){Ne=!0,tt&&setTimeout(nt,0)}function nn(){if(Qt||Ae)return;Qt=!0;let e=t=>{t.isTrusted&&(ho(t.target)||(window.removeEventListener("pointerdown",e,!0),setTimeout(nt,0)))};window.addEventListener("pointerdown",e,{capture:!0,passive:!0})}var k={p:"0-V-linuxdo"},G="[20260902] v1.2.0",on="https://github.com/0-V-linuxdo/Bloom";function yo(){try{return!!document.querySelector('a[href^="/c/"]')}catch{return!1}}function vo(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function xo(){try{let t=(document.querySelector("h1")?.textContent??"").replace(/\s+/g," ").trim();return!t||/what's on the agenda/i.test(t)?!1:/^(hey|hello|good\s)/i.test(t)}catch{return!1}}function ae(){return yo()||vo()||xo()}function rn(){return ae()}var So=["#page-header",'[data-testid="page-header"]',"header"],Eo=["aside",'[data-testid="left-sidebar"]','[data-testid="sidebar"]'];function I(e){return!(e instanceof HTMLElement)||!e.isConnected||e.closest("#bloom-root")?!1:e.getClientRects().length>0}function an(){for(let e of So){let t=document.querySelector(e);if(I(t))return t}for(let e of document.querySelectorAll("nav"))if(I(e)&&!e.closest("aside, [data-testid='sidebar']"))return e;return null}function wo(){for(let e of Eo){let t=document.querySelector(e);if(I(t)&&t.getBoundingClientRect().left<window.innerWidth/2)return t}return null}function sn(e){return`${e.getAttribute("aria-label")||""} ${e.textContent||""}`.replace(/\s+/g," ").trim()}function rt(e){let t=e.getAttribute("href")||"";try{if(t){let o=new URL(t,location.origin).pathname;if(/\/download\/?$/.test(o))return!0}}catch{}let n=sn(e);return!!(/download.{0,24}(chatgpt\s*)?(app|desktop)/i.test(n)||/下载.{0,16}(chatgpt|应用|app)/i.test(n)||/get (the )?app/i.test(n))}function Lo(e){if(rt(e))return!0;let t=e.getAttribute("href")||"";try{if(t){let o=new URL(t,location.origin).pathname;if(/^\/(gpts|store|apps)(\/|$)/i.test(o))return!0}}catch{}let n=sn(e);return!!(/gpt.?store|explore gpts|\bstore\b|\bshop\b/i.test(n)||/应用商店|插件商店|探索 GPTs/i.test(n))}function ot(e,t){for(let n of e.querySelectorAll("a[href], button"))if(I(n)&&t(n))return n;return null}function ko(){let e=an();if(e){let n=ot(e,rt);if(n)return n}let t=document.querySelector('a[href="/download"], a[href="/download/"], a[href*="chatgpt.com/download"]');return I(t)?t:null}function Co(){let e=wo();if(!e)return null;let t=ot(e,rt);if(t)return t;let n=ot(e,Lo);if(n)return n;let o=e.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]');if(!(o instanceof HTMLElement)||!I(o))return null;let r=o.parentElement;if(!r)return null;for(let i of r.querySelectorAll("a, button"))if(I(i)&&i!==o)return i;return null}function To(){let e=an();if(!e)return null;let t=e.querySelector('[data-testid="profile-button"], [data-testid="accounts-profile-button"]');return I(t)?t:null}function ln(e){let n=ko()??Co(),o=To(),r=e,i,a;if(n){let s=n.getBoundingClientRect();r=Math.max(32,Math.min(36,Math.round(s.height)||e)),i=s.right+8,a=s.top+(s.height-r)/2}else if(o){let s=o.getBoundingClientRect();i=s.left-8-r,a=s.top+(s.height-r)/2}else i=window.innerWidth-r-16,a=12;return i=Math.max(8,Math.min(window.innerWidth-r-8,i)),a=Math.max(8,Math.min(window.innerHeight-r-8,a)),{x:i,y:a,size:r}}var at=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary"],Mo={light:{"--main-surface-primary":"#ffffff","--main-surface-secondary":"#f4f4f4","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#f9f9f9","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#b4b4b4","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.1)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.2)","--link":"#0d0d0d","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#f4f4f4","--bg-primary":"#ffffff","--bg-secondary":"#f4f4f4"},dark:{"--main-surface-primary":"#212121","--main-surface-secondary":"#2f2f2f","--main-surface-tertiary":"#424242","--sidebar-surface-primary":"#171717","--text-primary":"#ececec","--text-secondary":"#b4b4b4","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ececec","--icon-secondary":"#b4b4b4","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.1)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.2)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.06)","--interactive-label-primary-default":"#ececec","--message-surface":"#2f2f2f","--bg-primary":"#212121","--bg-secondary":"#2f2f2f"}};function Po(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Ao(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function it(e){let t=Po(e);return t?Ao(t)>.55?"light":"dark":null}function No(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=it(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=it(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=it(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Ie(e){return e==="auto"?No():e}function Ro(e){try{let t=getComputedStyle(document.documentElement);for(let n of at){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function cn(e,t,n){let o=Mo[t];if(n){Ro(e);for(let r of at)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of at)e.style.setProperty(r,o[r])}function dn(e){let t=new MutationObserver(e);return t.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","data-color-scheme","style"]}),document.body&&t.observe(document.body,{attributes:!0,attributeFilter:["class","style"]}),()=>t.disconnect()}var un=`/* Void++ BaseCard / PluginCard chrome. Tokens from chatgpt.com via :host. */

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
  padding: 0;
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
  width: 22px;
  height: 22px;
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
  width: min(720px, calc(100vw - 32px));
  max-height: min(82vh, 760px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 24px;
  border: 0;
  border-radius: 16px;
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
  margin: 0 0 4px;
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
  margin: 0 0 14px;
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

.bloom-plugin-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  overflow: auto;
  min-height: 0;
  flex: 1;
}

.bloom-plugin-card {
  padding: 0;
  border-radius: 8px;
  background: var(--bloom-elevated);
  border: 1px solid var(--bloom-border);
  min-height: 7.5rem;
  min-width: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.375rem;
  color: var(--bloom-fg);
  background: color-mix(in srgb, var(--bloom-fg) 10%, transparent);
  line-height: 0;
}

.bloom-card-icon svg {
  width: 0.875rem;
  height: 0.875rem;
}

.bloom-plugin-card h3 {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bloom-card-controls {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-shrink: 0;
}

.bloom-card-gear {
  width: 28px;
  height: 28px;
  color: var(--bloom-faint);
}

.bloom-card-desc {
  margin: 0.25rem 0 0;
  color: var(--bloom-muted);
  font-size: 0.8125rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bloom-card-sep {
  height: 1px;
  background: var(--bloom-border);
}

.bloom-card-footer {
  display: flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  font-size: 0.7rem;
  color: var(--bloom-faint);
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bloom-plugin-dialog {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: var(--bloom-bg);
  padding: 24px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 16px;
}

.bloom-dialog-bar {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.bloom-dialog-titles {
  min-width: 0;
  flex: 1;
}

.bloom-dialog-titles h3 {
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 600;
}

.bloom-dialog-titles p {
  margin: 4px 0 0;
  font-size: 0.8125rem;
  color: var(--bloom-muted);
  line-height: 1.4;
}

.bloom-dialog-empty {
  margin: 0;
  color: var(--bloom-muted);
  font-size: 0.875rem;
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

.bloom-plugin-settings {
  display: flex;
  flex-direction: column;
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

@media (max-width: 680px) {
  .bloom-plugin-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bloom-settings-fab,
  .bloom-settings-modal,
  .bloom-switch span,
  .bloom-switch span::after {
    transition: none;
  }
}
`;var st="bloom-root",Oo=w({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),g=null,b=null,Be=!1,ut=!1,lt=[],Oe=null,ct=!1,He=null,$;function mt(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Ho(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Do(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>'}function Bo(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>'}var _o={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>'};function $o(e){return _o[e]??mt()}function qo(){return"auto"}function se(){if(!g)return;let e=qo(),t=Ie(e);g.setAttribute("data-bloom-scheme",t),cn(g,t,e==="auto"),ne("schemeChange",{scheme:t,pref:e})}function dt(){if(!b)return;let e=b.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",b.appendChild(e)),e.textContent=Bt()}function le(){if(b)return se(),dt(),b;if(g=document.getElementById(st),g||(g=document.createElement("div"),g.id=st,g.style.pointerEvents="none"),document.body&&g.parentNode!==document.body&&document.body.appendChild(g),b=g.shadowRoot??g.attachShadow({mode:"open"}),!b.querySelector("style[data-bloom]")){let e=document.createElement("style");e.dataset.bloom="1",e.textContent=un,b.appendChild(e)}return se(),dt(),ct||(b.addEventListener("keydown",Yo),ct=!0),b}function Fo(){for(let e of lt)e();lt=[]}function De(){ut=!1,Fo(),b?.querySelector(".bloom-plugin-dialog")?.remove()}function V(){Be=!1,De(),b?.querySelector(".bloom-settings-backdrop")?.remove(),b?.querySelector(".bloom-settings-modal")?.remove()}function mn(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function jo(e){return!!e.settings&&Object.keys(e.settings.def).length>0}function Ko(e,t,n){if(n.type===5&&n.render){let a=document.createElement("details");a.className="bloom-field bloom-field-block";let s=document.createElement("summary");s.textContent=n.description||t;let l=document.createElement("div");return lt.push(n.render(l)),a.append(s,l),a}let o=document.createElement("div");o.className="bloom-field";let r=document.createElement("span");r.textContent=n.description||t,o.appendChild(r);let i=c.store.plugins[e]??(c.store.plugins[e]={});if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??n.options.find(s=>s.default)?.value??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=mn(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),o.appendChild(a),o}return o}function zo(e,t){De(),ut=!0;let n=document.createElement("div");n.className="bloom-plugin-dialog";let o=document.createElement("div");o.className="bloom-dialog-bar";let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn",r.setAttribute("aria-label","Back to plugins"),r.innerHTML=Do(),r.addEventListener("click",De);let i=document.createElement("div");i.className="bloom-dialog-titles";let a=document.createElement("h3");a.textContent=t.name;let s=document.createElement("p");s.textContent=t.description,i.append(a,s),o.append(r,i),n.appendChild(o);let l=document.createElement("div");if(l.className="bloom-plugin-settings",t.settings)for(let[u,d]of Object.entries(t.settings.def)){let f=Ko(t.name,u,d);f&&l.appendChild(f)}if(!l.childElementCount){let u=document.createElement("p");u.className="bloom-dialog-empty",u.textContent="No configurable settings.",l.appendChild(u)}n.appendChild(l),e.appendChild(n)}function Go(e,t){let n=document.createElement("section");n.className="bloom-plugin-card";let o=document.createElement("div");o.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let i=document.createElement("div");i.className="bloom-card-name";let a=document.createElement("span");a.className="bloom-card-icon",a.innerHTML=$o(t.name);let s=document.createElement("h3");s.textContent=t.name,i.append(a,s);let l=document.createElement("div");if(l.className="bloom-card-controls",jo(t)){let y=document.createElement("button");y.type="button",y.className="bloom-icon-btn bloom-card-gear",y.setAttribute("aria-label",`${t.name} settings`),y.innerHTML=Bo(),y.addEventListener("click",B=>{B.stopPropagation(),zo(e,t)}),l.appendChild(y)}let u=mn(t.name,Me(t.name),!!t.required);u.querySelector("input")?.addEventListener("change",()=>{Xt(t.name)}),l.appendChild(u),r.append(i,l);let f=document.createElement("p");f.className="bloom-card-desc",f.textContent=t.description,o.append(r,f);let h=document.createElement("div");h.className="bloom-card-sep";let F=document.createElement("div");return F.className="bloom-card-footer",F.textContent=t.authors?.join(", ")||"\xA0",n.append(o,h,F),n}function fn(e){V(),dt(),Be=!0;let t=document.createElement("button");t.type="button",t.className="bloom-settings-backdrop",t.setAttribute("aria-label","Close settings"),t.addEventListener("click",V);let n=document.createElement("div");n.className="bloom-settings-modal",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.setAttribute("aria-labelledby","bloom-settings-title"),n.tabIndex=-1,n.addEventListener("click",d=>d.stopPropagation());let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=mt();let a=document.createElement("h2");a.id="bloom-settings-title",a.textContent="Bloom++",r.append(i,a);let s=document.createElement("button");s.type="button",s.className="bloom-icon-btn",s.setAttribute("aria-label","Close"),s.innerHTML=Ho(),s.addEventListener("click",V),o.append(r,s),n.appendChild(o);let l=document.createElement("p");l.className="bloom-settings-sub",l.textContent="Plugins",n.appendChild(l);let u=document.createElement("div");u.className="bloom-plugin-grid";for(let d of Object.values(L))d.hidden||d.name==="Settings"||u.appendChild(Go(n,d));n.appendChild(u),e.append(t,n),n.focus(),ne("settingsOpen",void 0)}function Vo(e){let t=ln(36);e.style.width=`${t.size}px`,e.style.height=`${t.size}px`,e.style.left=`${Math.round(t.x)}px`,e.style.top=`${Math.round(t.y)}px`,e.style.right="auto",e.style.bottom="auto"}function Uo(){let e=le();e.querySelector(".bloom-settings-fab")?.remove(),He?.abort(),$!==void 0&&(clearInterval($),$=void 0);let t=document.createElement("button");t.type="button",t.className="bloom-settings-fab",t.setAttribute("aria-label","Bloom++ settings"),t.innerHTML=mt(),t.addEventListener("click",()=>{Be?V():fn(e)}),e.appendChild(t);let n=new AbortController;He=n;let o=()=>Vo(t);window.addEventListener("resize",o,{signal:n.signal}),window.addEventListener("scroll",o,{capture:!0,passive:!0,signal:n.signal}),$=setInterval(o,400),o()}function Yo(e){if(e.key==="Escape"){if(ut){De(),e.stopPropagation();return}Be&&(V(),e.stopPropagation())}}function pn(){Re(),z(()=>fn(le()))}var gn=v({name:"Settings",description:"Bloom++ settings, docked next to Download the ChatGPT app.",authors:[k.p],required:!0,hidden:!0,enabledByDefault:!0,settings:Oo,startAt:"HostReady",cleanupSelectors:[`#${st}`],start(){Uo(),se(),Oe?.(),Oe=dn(se)},stop(){He?.abort(),He=null,$!==void 0&&(clearInterval($),$=void 0),Oe?.(),Oe=null,V(),g?.remove(),g=null,b=null,ct=!1},onSettingsChange:se});function Wo(e){return e instanceof HTMLLinkElement&&(e.relList.contains("icon")||/\bicon\b/i.test(e.rel))}function _e(e){return!!e&&!e.startsWith("data:")&&e!=="undefined"}function bn(){let{head:e}=document;if(!e)return null;for(let t of e.querySelectorAll("link"))if(Wo(t))return t;return null}function hn(e,t){let n=bn();n&&n.getAttribute("href")!==t&&n.setAttribute("href",t)}function ft(e,t){if(!_e(t))return;let n=bn();n&&n.href!==t&&(n.href=t)}var vn='form[data-type="unified-composer"], form.w-full[data-type]',O="#prompt-textarea",$e='button[data-testid="send-button"]',yn='button[data-testid="stop-button"]';function M(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function ce(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!M(r)))return r;return null}function H(){let t=Array.from(document.querySelectorAll(vn)).find(M);if(t instanceof HTMLElement)return t;let n=ce(document,O),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function q(){let e=Array.from(document.querySelectorAll(O));return e.find(M)??e[0]??null}function pt(){let e=q();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function Xo(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function de(){let e=H();return ce(e,$e)??ce(document,$e)}function gt(){let e=de();return!!e&&Xo(e)}function bt(){let e=H();return ce(e,yn,!0)??ce(document,yn,!0)}function U(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}function qe(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=u=>{let d=n.indexOf(u);return d>=0&&n[d+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(u,d)=>{try{return document.querySelector(u)?.getAttribute(d)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function Fe(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function Jo(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(M(t)&&/\bStop\b/i.test(t.textContent||""))return t;return null}function Zo(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&M(e))}function Qo(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&M(e))}function ht(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function je(){return bt()||Jo()?!0:de()&&M(de())?!1:!!(Zo()||Qo())}var er=["original","badge","dot","hole","bg"],xn=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge",default:!0},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],tr={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},nr={dark:{plate:"#212121",mark:"#ececec",ring:"#212121",glyph:"#ffffff"},light:{plate:"#ffffff",mark:"#0d0d0d",ring:"#ffffff",glyph:"#ffffff"}},or="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",rr={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"};function Sn(e){return typeof e=="string"&&er.includes(e)}function En(e){return e==="original"||e==="badge"||e==="dot"}function ir(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function ue(e,t="0 0 64 64"){let n=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${t}" width="64" height="64">${e}</svg>`;return`data:image/svg+xml;charset=utf-8,${encodeURIComponent(n)}`}function ar(e){return`<g transform="translate(8 8) scale(2)" fill="${e}" fill-rule="evenodd"><path d="${or}"/></g>`}function me(e,t){return`<rect width="64" height="64" rx="14" fill="${t}"/>${ar(e)}`}function sr(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function lr(e){return`<image href="${sr(e)}" width="64" height="64" preserveAspectRatio="xMidYMid meet"/>`}function cr(e,t){return e==="rotate"?['<g transform="translate(51.5 51.5)"><g>',`<path d="M0-6.1 A6.1 6.1 0 1 1 -5.3 3.05" fill="none" stroke="${t}" stroke-width="2.15" stroke-linecap="round"/>`,'<animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.85s" repeatCount="indefinite"/>',"</g></g>"].join(""):e==="done"?`<path d="M46.6 51.7 L50.1 55.3 L56.8 47.4" fill="none" stroke="${t}" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>`:e==="ready"?[`<path d="M51.5 56.4 V46.8" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round"/>`,`<path d="M46.6 51.2 L51.5 46.2 L56.4 51.2" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`].join(""):[`<path d="M47.2 47.2 L55.8 55.8" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round"/>`,`<path d="M55.8 47.2 L47.2 55.8" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round"/>`].join("")}function fe(e,t,n,o="dark"){let r=nr[o],i=n&&!n.startsWith("data:")?n:"";if(e==="original")return t==="wait"?i||ue(me(r.mark,r.plate)):ir(rr[t]);let a=t==="wait"?void 0:tr[t];if(e==="hole")return ue(me(a??r.mark,r.plate));if(e==="bg")return ue(me(r.mark,a??r.plate));if(!a||t==="wait")return i||ue(me(r.mark,r.plate));let s=e==="dot"?[`<circle cx="52.2" cy="52.2" r="10.4" fill="${r.ring}"/>`,`<circle cx="52.2" cy="52.2" r="7.7" fill="${a}"/>`].join(""):[`<circle cx="51.5" cy="51.5" r="12.15" fill="${r.ring}"/>`,`<circle cx="51.5" cy="51.5" r="9.55" fill="${a}"/>`,cr(t,r.glyph)].join(""),l=i?lr(i):me(r.mark,r.plate);return ue(l+s)}function yt(e,t,n="dark"){return{wait:fe(e,"wait",t,n),rotate:fe(e,"rotate",t,n),done:fe(e,"done",t,n),ready:fe(e,"ready",t,n),error:fe(e,"error",t,n)}}var dr=new p("ChatStateFavicons"),ye="bloom-chat-state-favicon",Cn=w({style:{type:3,description:"Favicon overlay",options:xn}}),D="",Ke="light",Tn=yt("badge","",Ke),Mn="wait",ge=!1,P=!1,x=null,be="",he="",ve=!0,A=null,pe=null,vt=null,W=0,Y,xe=!1,wn=new WeakSet;function Pn(){let e=Cn.store.style;return Sn(e)?e:"badge"}function ur(){return"auto"}function An(){return Ie(ur())}function Ln(){let t=document.querySelector(`link[rel~="icon"]:not(#${ye})`)?.href;return _e(t)?t:_e(D)?D:""}function S(e){Mn=e;let t=Pn();if(e==="wait"&&En(t)){ft(ye,D);return}hn(ye,Tn[e])}function xt(){Ke=An(),Tn=yt(Pn(),D,Ke),S(Mn)}function mr(){let e=qe(),t=e?Fe(e):Fe("");return je()?(!be&&t&&(be=t),be||t):(be="",t)}function Nn(){ge=!1,P=!1,x=null,be=""}function fr(e){he=e,Nn(),ve=!1,A?.disconnect(),A=null,S("wait")}function Rn(){if(!xe)return;let e=qe()||location.pathname;if(he&&e&&he!==e){fr(e);return}e&&(he=e);let t=mr(),n=je(),o=pt(),r=gt();if(ht()&&!n){S("error"),ge=!1,P=!1,x=null;return}if(n){ge=!0,P=!1,x=t,S("rotate");return}if(ge){let i=!!x&&!!t&&x===t;if(ge=!1,i){P=!0,x=t,S("done");return}P=!1,x=null}if(P)if(!!(x&&t&&x!==t))P=!1,x=null;else if(o){S("done");return}else if(ve){P=!1,S("ready");return}else{P=!1,S("wait");return}x=null,S(o?"wait":ve?"ready":"wait")}function ze(){!xe||W||(W=requestAnimationFrame(()=>{if(W=0,!xe)return;In();let e=H();e!==document.body&&(!A||!e.isConnected)&&On(),Rn()}))}function kn(){ve=!0,ze()}function In(){let e=q();!e||wn.has(e)||(wn.add(e),e.addEventListener("input",kn,{passive:!0}),e.addEventListener("compositionend",kn,{passive:!0}))}function On(){A?.disconnect(),A=null;let e=H();!e||e===document.body||(A=new MutationObserver(()=>ze()),A.observe(e,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid","class"]}))}var Hn=v({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[k.p],tags:["chat","ui"],enabledByDefault:!0,settings:Cn,startAt:"HostReady",cleanupSelectors:[`#${ye}`],start(){xe=!0,Ke=An(),D=Ln()||D,xt(),vt=_t("schemeChange",()=>{let e=Ln();e&&(D=e),xt()}),pe?.abort(),pe=new AbortController,window.addEventListener("popstate",ze,{signal:pe.signal}),In(),On(),Y!==void 0&&clearInterval(Y),Y=setInterval(ze,1500),Rn(),dr.debug("favicon watch started")},stop(){xe=!1,W&&cancelAnimationFrame(W),W=0,Y!==void 0&&(clearInterval(Y),Y=void 0),pe?.abort(),pe=null,vt?.(),vt=null,A?.disconnect(),A=null,Nn(),he="",ve=!0,ft(ye,D)},onSettingsChange:xt});var Dn=`.bloom-ih-hud {
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
`;var _n=new p("InputHistory"),St=/\u200B/g,$n=10,qn=500,Fn=100,gr=8,br=120,hr=2e3,Ge=10,Ve=w({maxEntries:{type:4,description:"Max stored prompts",min:$n,max:qn,default:Fn},history:{type:5,description:"Stored prompts",render:Ar}}),Et=new Map,m=0,wt="",C=!1,Ee=!1,Ct=0,J=null,Lt=null,X,kt,Tt=null,jn=!0;function E(){let e=Ve.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Kn(e){let t=jt(Number(Ve.store.maxEntries??Fn),$n,qn);return e.length>t?e.slice(e.length-t):e}function Ue(e){Ve.store.entries=Kn(e)}function yr(e){return e.replaceAll(St,"").replace(/\n$/,"").trim()}function Se(e){let n=(e instanceof Element?e:null)?.closest?.(O);return n instanceof HTMLElement?n:q()}function vr(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!U(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(St,"").trim().length===0,last:i.toString().replaceAll(St,"").trim().length===0}}catch{return{first:!0,last:!0}}}function zn(e,t){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch(i){_n.debug("pm caret failed:",i)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function Gn(e){clearTimeout(kt),kt=setTimeout(()=>{if(e!==Ct)return;Ee=!1;let t=Tt;t&&zn(t,jn)},br)}function Vn(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),Ee=!0,Tt=e,jn=n;let i=++Ct;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(a){_n.debug("insertText failed:",a),e.textContent=t,e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:"insertText"}))}zn(e,n),Gn(i)}function xr(){let e=le(),t=e.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",e.appendChild(t)),t}function Z(){document.getElementById("bloom-root")?.shadowRoot?.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Sr(e,t){let n=xr();n.textContent=e;let o=(t.closest("form")??H()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-gr)}px`,n.classList.add("bloom-ih-hud-on")}function Mt(e){let t=yr(e);if(!t)return;let n=Date.now(),o=Et.get(t);if(o&&n-o<hr)return;Et.set(t,n);let r=E().filter(i=>i!==t);r.push(t),Ue(r),m=E().length,C=!1,Z()}function Er(e,t){let n=E();if(!n.length&&e)return;m>=n.length&&(wt=U(t),m=n.length);let o=e?m-1:m+1;o<0||o>n.length||(m=o,C=!0,Vn(t,o===n.length?wt:n[o],e),o<n.length?Sr(`${o+1} / ${n.length}`,t):Z())}function wr(e){C=!1,Z(),Vn(e,wt,!1),m=E().length}function Lr(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=Se(e.target);if((!t||!t.contains(e.target)&&e.target!==t)&&(!Se(document.activeElement)||e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"))return;let n=Se(e.target)??Se(document.activeElement);if(!n)return;if(e.key==="Escape"&&C&&!e.altKey&&!e.shiftKey){wr(n),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){Mt(U(n));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let o=e.key==="ArrowUp",r=e.altKey,i=E();if(!r){let a=vr(n);if(o&&!a.first||!o&&!a.last)return}o&&(!i.length||m<=0)||!o&&m>=i.length||(e.preventDefault(),e.stopImmediatePropagation(),Er(o,n))}function kr(e){if(Se(e.target)){if(Ee){Gn(Ct);return}C&&(C=!1,Z(),m=E().length)}}function Cr(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(O);n instanceof HTMLElement&&Mt(U(n))}function Tr(e){let t=e.target;if(!(t instanceof Element)||!t.closest($e))return;let o=q();o&&Mt(U(o))}function Mr(){!C||Ee||(C=!1,Z())}function Bn(){let e=document.querySelector('form[data-type="unified-composer"]');if(!(e instanceof HTMLElement))return!1;if(Lt===e&&J)return!0;J?.abort(),J=new AbortController,Lt=e;let{signal:t}=J;return e.addEventListener("keydown",Lr,{capture:!0,signal:t}),e.addEventListener("input",kr,{capture:!0,signal:t}),e.addEventListener("submit",Cr,{capture:!0,signal:t}),e.addEventListener("click",Tr,{capture:!0,signal:t}),e.addEventListener("pointerdown",Mr,{capture:!0,signal:t}),!0}function Pr(e){let t=E().slice();t.splice(e,1),Ue(t),m>t.length&&(m=t.length)}function Ar(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=E().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(T=>T.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/Ge));n>=l&&(n=l-1);let u=s.slice(n*Ge,n*Ge+Ge);e.replaceChildren();let d=document.createElement("input");if(d.className="bloom-ih-search",d.type="search",d.placeholder="Search history",d.autocomplete="off",d.value=t,d.addEventListener("input",()=>{t=d.value,n=0,r()}),e.appendChild(d),u.length){let T=document.createElement("div");T.className="bloom-ih-list",u.forEach((We,Xe)=>{let ro=i.indexOf(We),io=E().length-1-ro,Je=document.createElement("div");Je.className="bloom-ih-item";let Q=document.createElement("button");Q.type="button",Q.className=`bloom-ih-body${o===Xe?"":" bloom-ih-clamp"}`,Q.textContent=We,Q.addEventListener("click",()=>{o=o===Xe?-1:Xe,r()});let Ze=document.createElement("div");Ze.className="bloom-ih-actions";let ee=document.createElement("button");ee.type="button",ee.title="Copy",ee.textContent="C",ee.addEventListener("click",()=>{zt(We)});let te=document.createElement("button");te.type="button",te.title="Delete",te.textContent="\xD7",te.addEventListener("click",()=>{Pr(io),r()}),Ze.append(ee,te),Je.append(Q,Ze),T.appendChild(Je)}),e.appendChild(T)}else{let T=document.createElement("p");T.className="bloom-ih-empty",T.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(T)}let f=document.createElement("div");f.className="bloom-ih-pager";let h=document.createElement("button");h.type="button",h.className="bloom-ih-btn",h.textContent="Prev",h.disabled=n<=0,h.addEventListener("click",()=>{n-=1,r()});let F=document.createElement("span");F.textContent=`${n+1} / ${l}`;let y=document.createElement("button");y.type="button",y.className="bloom-ih-btn",y.textContent="Next",y.disabled=n+1>=l,y.addEventListener("click",()=>{n+=1,r()});let B=document.createElement("button");B.type="button",B.className="bloom-ih-clear",B.textContent="Clear all",B.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Ue([]),m=0,r())}),f.append(h,F,y,B),e.appendChild(f)};return r(),()=>{e.replaceChildren()}}var Un=v({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[k.p],tags:["chat"],enabledByDefault:!0,settings:Ve,startAt:"HostReady",managedStyle:"inputHistory",start(){j("inputHistory",Dn),le(),m=E().length,C=!1,Bn(),X!==void 0&&clearInterval(X),X=setInterval(Bn,1500)},stop(){J?.abort(),J=null,Lt=null,X!==void 0&&(clearInterval(X),X=void 0),Z(),Et.clear(),clearTimeout(kt),Ee=!1,Tt=null,C=!1},onSettingsChange(){let e=E(),t=Kn(e);t.length!==e.length&&Ue(t),m>t.length&&(m=t.length)}});var Pt="noShareLink",Nr=['button[data-testid="share-chat-button"]'],Rr=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],At=w({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Yn(e){return`${e.join(",")}{display:none!important}`}function Wn(){let e=[];if(At.store.hideShareChat!==!1&&e.push(Yn(Nr)),At.store.hideShareProject!==!1&&e.push(Yn(Rr)),!e.length){_(Pt);return}j(Pt,e.join(`
`))}var Xn=v({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[k.p],tags:["ui","privacy"],enabledByDefault:!1,startAt:"HostReady",settings:At,start:Wn,onSettingsChange:Wn,stop(){_(Pt)}});var Qn="noDictation",Ir=['button[data-testid="composer-speech-button"]'],Or=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]'],eo=w({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Jn(e){return`${e.join(",")}{display:none!important}`}function Zn(){let e=[Jn(Ir)];eo.store.hideDictationSettings!==!1&&e.push(Jn(Or)),j(Qn,e.join(`
`))}var to=v({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[k.p],tags:["chat","ui"],enabledByDefault:!1,startAt:"HostReady",settings:eo,start:Zn,onSettingsChange:Zn,stop(){_(Qn)}});var Ye=new p("Bloom"),no=!1,Hr=Date.now(),Dr=[gn,Hn,Un,Xn,to];function Br(e){return new Promise(t=>setTimeout(t,e))}function _r(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var $r=8e3,qr=2e4,Fr=300,jr=100;function Kr(){return new Promise(e=>{let t=!1,n=i=>{t||(t=!0,clearInterval(r),i?Br(Fr).then(()=>e(!0)):e(!1))},o=()=>{let i=Date.now()-Hr;if(!(i<$r)){if(ae()){n(!0);return}i>=qr&&n(!1)}},r=setInterval(o,jr);o()})}function zr(){try{GM_registerMenuCommand?.("Bloom++ settings",pn)}catch{}}function Gr(){z(()=>{Ot(),Pe("HostReady"),Ye.info("page touch",G)})}async function Nt(){await Gt()}async function Rt(){if(no)return;no=!0;for(let n of Dr)try{Wt(n)}catch(o){Ye.error("register failed",n.name,o)}Zt(),Pe("Init"),zr();let e=()=>Pe("DOMContentLoaded");document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await _r();let t=await Kr();if(tn(),Gr(),!t){Ye.warn("late islands not detected; waiting for menu",G);return}nn(),Ye.info("script ready",G)}var oo=typeof unsafeWindow<"u"?unsafeWindow:window;window===window.top&&!oo.Bloom&&(Object.defineProperty(oo,"Bloom",{value:It,writable:!1,configurable:!0}),Nt().then(()=>Rt()).catch(e=>console.error("[Bloom++] Fatal init error:",e)));})();
