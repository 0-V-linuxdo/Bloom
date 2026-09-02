// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260902] v1.2.1
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

/* Bloom++ [20260902] v1.2.1. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var uo=Object.defineProperty;var fo=(e,t)=>{for(var n in t)uo(e,n,{get:t[n],enumerable:!0})};var It={};fo(It,{REPO_URL:()=>rn,Settings:()=>d,VERSION:()=>z,hasLateIslands:()=>ae,init:()=>Nt,initSettings:()=>Ht,isDocumentInteractive:()=>an,plugins:()=>T,requestPageTouch:()=>Ie,whenPageTouched:()=>G});var H=new Map,Te=!1;function nt(e,t){if(!Te)return;if(t.disabled){t.el&&(t.el.disabled=!0);return}if(t.el){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1;return}if(typeof GM_addStyle!="function")return;let n=GM_addStyle(t.css);n instanceof HTMLStyleElement&&(n.dataset.bloomStyle=e,t.el=n)}function j(e,t){let n=H.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},H.set(e,n)),Te&&nt(e,n)}function Ot(){Te=!0;for(let[e,t]of H)nt(e,t);return!0}function Dt(e){let t=H.get(e);t&&(t.disabled=!1,Te&&nt(e,t))}function Bt(e){let t=H.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0))}function _(e){let t=H.get(e);t&&(t.el?.remove(),H.delete(e))}function _t(){return Array.from(H.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var b=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function x(e){return e}var ot=new Map;function $t(e,t){let n=ot.get(e);return n||(n=new Set,ot.set(e,n)),n.add(t),()=>n.delete(t)}function ne(e,t){let n=ot.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var mo="bloompp";function qt(){return new Promise((e,t)=>{let n=indexedDB.open(mo,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function Ft(e){try{let t=await qt();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function jt(e,t){try{let n=await qt();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function oe(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Kt(e,t,n){return Math.min(n,Math.max(t,e))}function Gt(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function zt(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}var ke=new b("SettingsStore"),N="BloomSettings",po=100;function Me(e){if(oe(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(oe(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return oe(n)?n:null}return null}catch{return null}}var Ce=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[c,u]of this.defaultGetters)if(l.startsWith(c)){let f=l.slice(c.length+1);if(f&&!f.includes(".")){let v=u(f);v!==void 0&&(i[a]=v,s=v);break}}}return oe(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){ke.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},po))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(N,this.plain)}catch{try{GM_setValue(N,t)}catch(n){ke.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(N,t)}catch{}jt(N,t).catch(n=>ke.warn("Failed to save settings to IndexedDB:",n))}catch(t){ke.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){Gt(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var go=new b("Settings"),bo={plugins:{}},d=new Ce(structuredClone(bo)),ho=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function yo(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function L(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(d.store.plugins[n]||(d.store.plugins[n]={}),d.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?d.plain.plugins[n]??{}:{}}};return t}function vo(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function Vt(){let e=null;if(e=Me(vo(N)),e||(e=Me(await Ft(N))),!e)try{e=Me(localStorage.getItem(N))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(d.plain.plugins=t),go.debug("Loaded settings")}}function Ut(e,t){t&&(t.pluginName=e,d.plain.plugins[e]||(d.plain.plugins[e]={}),d.setDefaultGetter(ho(e),n=>{if(n!=="enabled")return yo(t.def,n)}))}var Pe=new b("PluginManager"),T={},ie=new Set;function Xt(e){if(T[e.name]){Pe.warn("Duplicate plugin",e.name);return}T[e.name]=e,Ut(e.name,e.settings)}function Ae(e){let t=T[e];if(!t)return!1;if(t.required)return!0;let n=d.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function Jt(e){let t=T[e];if(!t||t.required)return;let n=!Ae(e);d.plain.plugins[e]||(d.store.plugins[e]={}),d.store.plugins[e].enabled=n,n?Zt(t):xo(t),ne("pluginToggle",{name:e,enabled:n})}function Zt(e,t=!1){if(!ie.has(e.name)&&Ae(e.name))try{e.managedStyle&&Dt(e.managedStyle),e.start?.(),ie.add(e.name),e.settings&&d.addPrefixChangeListener(`plugins.${e.name}.`,()=>{ie.has(e.name)&&e.onSettingsChange?.()}),t||Pe.debug("Started",e.name)}catch(n){Pe.error("Failed to start",e.name,n)}}function xo(e){if(ie.has(e.name)){try{e.stop?.()}catch(t){Pe.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(Bt(e.managedStyle),_(e.managedStyle)),ie.delete(e.name)}}function Re(e){for(let t of Object.values(T))(t.startAt??"DOMContentLoaded")===e&&Zt(t)}var Yt=2,Wt="defaultsRev";function Qt(){for(let t of Object.values(T))d.plain.plugins[t.name]||(d.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=d.store.plugins.Settings??(d.store.plugins.Settings={});if(e[Wt]!==Yt){for(let t of["NoShareLink","NoDictation"]){let n=d.store.plugins[t]??(d.store.plugins[t]={});n.enabled=!1}e[Wt]=Yt}}var rt=!1,He=!1,Ne=!1,en=!1,tn=[];function So(e){if(!(e instanceof Node))return!1;let t=e.getRootNode();if(t instanceof ShadowRoot){let n=t.host;if(n instanceof Element&&n.id==="bloom-root")return!0}return e instanceof Element&&!!e.closest("#bloom-root")}function it(){if(He)return;if(!rt){Ne=!0;return}He=!0;let e=tn.splice(0);for(let t of e)t()}function nn(){rt=!0,Ne&&(Ne=!1,it())}function G(e){He?e():tn.push(e)}function Ie(){Ne=!0,rt&&setTimeout(it,0)}function on(){if(en||He)return;en=!0;let e=t=>{t.isTrusted&&(So(t.target)||(window.removeEventListener("pointerdown",e,!0),setTimeout(it,0)))};window.addEventListener("pointerdown",e,{capture:!0,passive:!0})}var k={p:"0-V-linuxdo"},z="[20260902] v1.2.1",rn="https://github.com/0-V-linuxdo/Bloom";function Eo(){try{return!!document.querySelector('a[href^="/c/"]')}catch{return!1}}function wo(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function Lo(){try{let t=(document.querySelector("h1")?.textContent??"").replace(/\s+/g," ").trim();return!t||/what's on the agenda/i.test(t)?!1:/^(hey|hello|good\s)/i.test(t)}catch{return!1}}function ae(){return Eo()||wo()||Lo()}function an(){return ae()}var To=["#page-header",'[data-testid="page-header"]',"header"],ko=["aside",'[data-testid="left-sidebar"]','[data-testid="sidebar"]'],sn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]'];function M(e){return!(e instanceof HTMLElement)||!e.isConnected||e.closest("#bloom-root")?!1:e.getClientRects().length>0}function Co(){for(let e of To){let t=document.querySelector(e);if(M(t))return t}for(let e of document.querySelectorAll("nav"))if(M(e)&&!e.closest("aside, [data-testid='sidebar']"))return e;return null}function cn(){for(let e of ko){let t=document.querySelector(e);if(M(t)&&t.getBoundingClientRect().left<window.innerWidth/2)return t}return null}function dn(e){return`${e.getAttribute("aria-label")||""} ${e.textContent||""}`.replace(/\s+/g," ").trim()}function Oe(e){let t=e.getAttribute("href")||"";try{if(t){let o=new URL(t,location.origin).pathname;if(/\/download\/?$/.test(o))return!0}}catch{}let n=dn(e);return!!(/download.{0,24}(chatgpt\s*)?(app|desktop)/i.test(n)||/下载.{0,16}(chatgpt|应用|app)/i.test(n)||/get (the )?app/i.test(n))}function ln(e){if(Oe(e))return!0;let t=e.getAttribute("href")||"";try{if(t){let o=new URL(t,location.origin).pathname;if(/^\/(gpts|store|apps)(\/|$)/i.test(o))return!0}}catch{}let n=dn(e);return!!(/gpt.?store|explore gpts|\bstore\b|\bshop\b/i.test(n)||/应用商店|插件商店|探索 GPTs/i.test(n))}function se(e,t){for(let n of e.querySelectorAll("a[href], button, [role='button']"))if(M(n)&&t(n))return n;return null}function Mo(){let e=Co();if(e){let n=se(e,Oe);if(n)return n}let t=document.querySelector('a[href="/download"], a[href="/download/"], a[href*="chatgpt.com/download"]');return M(t)?t:null}function le(e){let t=e.getBoundingClientRect();return t.left<window.innerWidth/2&&t.bottom>window.innerHeight-180}function Po(){for(let t of sn)for(let n of document.querySelectorAll(t))if(M(n)&&le(n))return n;let e=cn();if(!e)return null;for(let t of sn){let n=e.querySelector(t);if(M(n)&&le(n))return n}return null}function Ao(e){let t=e,n=e;for(let o=0;o<8&&t;o++){let r=t.getBoundingClientRect();r.width>=160&&r.left<96&&r.bottom>window.innerHeight-180&&(n=t),t=t.parentElement}return n}function Ro(e,t){let n=t.getBoundingClientRect(),o=null,r=-1;for(let i of e.querySelectorAll("a, button, [role='button']")){if(!M(i)||i===t||t.contains(i))continue;let a=i.getBoundingClientRect();a.left<n.right-8||a.width>64||a.height>64||a.right>r&&(o=i,r=a.right)}return o}function Ho(){let e=window.innerHeight-28,t=[200,240,268,292];for(let n of t){if(n>=window.innerWidth/2)continue;let o=document.elementsFromPoint(n,e);for(let r of o){if(!(r instanceof Element)||r.closest("#bloom-root"))continue;let i=r.closest("a, button, [role='button']");if(!M(i))continue;let a=i.getBoundingClientRect();if(a.width<=56&&a.height<=56&&a.left<window.innerWidth/2&&le(i))return i}}return null}function No(){let e=Po();if(e){let n=Ao(e),o=se(n,ln)??se(n,Oe);if(o)return o;let r=Ro(n,e);return r||e}let t=cn();if(t){let n=se(t,Oe);if(n&&le(n))return n;let o=se(t,ln);if(o&&le(o))return o}return Ho()}function un(e){let n=Mo(),o=No(),r=n??o,i=e,a,s;if(r){let l=r.getBoundingClientRect();i=Math.max(32,Math.min(36,Math.round(l.height)||e)),a=l.right+8,s=l.top+(l.height-i)/2}else a=window.innerWidth-i-16,s=12;return a=Math.max(8,Math.min(window.innerWidth-i-8,a)),s=Math.max(8,Math.min(window.innerHeight-i-8,s)),{x:a,y:s,size:i}}var st=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary"],Io={light:{"--main-surface-primary":"#ffffff","--main-surface-secondary":"#f4f4f4","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#f9f9f9","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#b4b4b4","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.1)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.2)","--link":"#0d0d0d","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#f4f4f4","--bg-primary":"#ffffff","--bg-secondary":"#f4f4f4"},dark:{"--main-surface-primary":"#212121","--main-surface-secondary":"#2f2f2f","--main-surface-tertiary":"#424242","--sidebar-surface-primary":"#171717","--text-primary":"#ececec","--text-secondary":"#b4b4b4","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ececec","--icon-secondary":"#b4b4b4","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.1)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.2)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.06)","--interactive-label-primary-default":"#ececec","--message-surface":"#2f2f2f","--bg-primary":"#212121","--bg-secondary":"#2f2f2f"}};function Oo(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Do(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function at(e){let t=Oo(e);return t?Do(t)>.55?"light":"dark":null}function Bo(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=at(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=at(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=at(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function De(e){return e==="auto"?Bo():e}function _o(e){try{let t=getComputedStyle(document.documentElement);for(let n of st){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function fn(e,t,n){let o=Io[t];if(n){_o(e);for(let r of st)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of st)e.style.setProperty(r,o[r])}function mn(e){let t=new MutationObserver(e);return t.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","data-color-scheme","style"]}),document.body&&t.observe(document.body,{attributes:!0,attributeFilter:["class","style"]}),()=>t.disconnect()}var pn=`/* Void++ BaseCard / PluginCard chrome. Tokens from chatgpt.com via :host. */

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
  pointer-events: auto;
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
  pointer-events: none;
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
  pointer-events: auto;
}

.bloom-icon-btn:hover {
  color: var(--bloom-fg);
  background: var(--bloom-hover);
}

.bloom-icon-btn svg {
  width: 16px;
  height: 16px;
  pointer-events: none;
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
  pointer-events: auto;
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

.bloom-plugin-pane {
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: auto;
  min-height: 0;
  flex: 1;
  pointer-events: auto;
}

.bloom-plugin-pane[hidden],
.bloom-plugin-grid[hidden],
.bloom-settings-sub[hidden] {
  display: none !important;
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
  pointer-events: auto;
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
`;var lt="bloom-root",qo=L({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),h=null,y=null,qe=!1,ft=!1,ct=[],Be=null,dt=!1,_e=null,$;function mt(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Fo(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function jo(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>'}function Ko(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>'}var Go={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>'};function zo(e){return Go[e]??mt()}function Vo(){return"auto"}function ce(){if(!h)return;let e=Vo(),t=De(e);h.setAttribute("data-bloom-scheme",t),fn(h,t,e==="auto"),ne("schemeChange",{scheme:t,pref:e})}function ut(){if(!y)return;let e=y.querySelector("style[data-bloom-plugins]");e||(e=document.createElement("style"),e.dataset.bloomPlugins="1",y.appendChild(e)),e.textContent=_t()}function de(){if(y)return ce(),ut(),y;if(h=document.getElementById(lt),h||(h=document.createElement("div"),h.id=lt,h.style.pointerEvents="none"),document.body&&h.parentNode!==document.body&&document.body.appendChild(h),y=h.shadowRoot??h.attachShadow({mode:"open"}),!y.querySelector("style[data-bloom]")){let e=document.createElement("style");e.dataset.bloom="1",e.textContent=pn,y.appendChild(e)}return ce(),ut(),dt||(y.addEventListener("keydown",er),dt=!0),y}function Uo(){for(let e of ct)e();ct=[]}function gn(e){let t=e??y?.querySelector(".bloom-settings-modal");return t instanceof HTMLElement?{modal:t,grid:t.querySelector(".bloom-plugin-grid"),sub:t.querySelector(".bloom-settings-sub"),pane:t.querySelector(".bloom-plugin-pane")}:null}function $e(){ft=!1,Uo();let e=gn();e&&(e.grid?.removeAttribute("hidden"),e.sub?.removeAttribute("hidden"),e.pane&&(e.pane.replaceChildren(),e.pane.hidden=!0))}function V(){qe=!1,$e(),y?.querySelector(".bloom-settings-backdrop")?.remove(),y?.querySelector(".bloom-settings-modal")?.remove()}function bn(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function Yo(e){return!!e.settings&&Object.keys(e.settings.def).length>0}function Wo(e,t,n){if(n.type===5&&n.render){let a=document.createElement("details");a.className="bloom-field bloom-field-block";let s=document.createElement("summary");s.textContent=n.description||t;let l=document.createElement("div");return ct.push(n.render(l)),a.append(s,l),a}let o=document.createElement("div");o.className="bloom-field";let r=document.createElement("span");r.textContent=n.description||t,o.appendChild(r);let i=d.store.plugins[e]??(d.store.plugins[e]={});if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??n.options.find(s=>s.default)?.value??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=bn(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),o.appendChild(a),o}return o}function Xo(e,t){$e();let n=gn(e);if(!n?.pane)return;ft=!0,n.grid?.setAttribute("hidden",""),n.sub?.setAttribute("hidden",""),n.pane.hidden=!1;let o=document.createElement("div");o.className="bloom-dialog-bar";let r=document.createElement("button");r.type="button",r.className="bloom-icon-btn",r.setAttribute("aria-label","Back to plugins"),r.innerHTML=jo(),r.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),$e()});let i=document.createElement("div");i.className="bloom-dialog-titles";let a=document.createElement("h3");a.textContent=t.name;let s=document.createElement("p");s.textContent=t.description,i.append(a,s),o.append(r,i);let l=document.createElement("div");if(l.className="bloom-plugin-settings",t.settings)for(let[c,u]of Object.entries(t.settings.def)){let f=Wo(t.name,c,u);f&&l.appendChild(f)}if(!l.childElementCount){let c=document.createElement("p");c.className="bloom-dialog-empty",c.textContent="No configurable settings.",l.appendChild(c)}n.pane.append(o,l)}function Jo(e,t){let n=document.createElement("section");n.className="bloom-plugin-card";let o=document.createElement("div");o.className="bloom-card-body";let r=document.createElement("div");r.className="bloom-card-top";let i=document.createElement("div");i.className="bloom-card-name";let a=document.createElement("span");a.className="bloom-card-icon",a.innerHTML=zo(t.name);let s=document.createElement("h3");s.textContent=t.name,i.append(a,s);let l=document.createElement("div");if(l.className="bloom-card-controls",Yo(t)){let p=document.createElement("button");p.type="button",p.className="bloom-icon-btn bloom-card-gear",p.setAttribute("aria-label",`${t.name} settings`),p.innerHTML=Ko();let B=g=>{g.preventDefault(),g.stopPropagation(),Xo(e,t)};p.addEventListener("click",B),p.addEventListener("pointerdown",g=>g.stopPropagation()),l.appendChild(p)}let c=bn(t.name,Ae(t.name),!!t.required);c.querySelector("input")?.addEventListener("change",()=>{Jt(t.name)}),l.appendChild(c),r.append(i,l);let f=document.createElement("p");f.className="bloom-card-desc",f.textContent=t.description,o.append(r,f);let v=document.createElement("div");v.className="bloom-card-sep";let F=document.createElement("div");return F.className="bloom-card-footer",F.textContent=t.authors?.join(", ")||"\xA0",n.append(o,v,F),n}function hn(e){V(),ut(),qe=!0;let t=document.createElement("button");t.type="button",t.className="bloom-settings-backdrop",t.setAttribute("aria-label","Close settings"),t.addEventListener("click",V);let n=document.createElement("div");n.className="bloom-settings-modal",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.setAttribute("aria-labelledby","bloom-settings-title"),n.tabIndex=-1,n.addEventListener("click",f=>f.stopPropagation());let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=mt();let a=document.createElement("h2");a.id="bloom-settings-title",a.textContent="Bloom++",r.append(i,a);let s=document.createElement("button");s.type="button",s.className="bloom-icon-btn",s.setAttribute("aria-label","Close"),s.innerHTML=Fo(),s.addEventListener("click",V),o.append(r,s),n.appendChild(o);let l=document.createElement("p");l.className="bloom-settings-sub",l.textContent="Plugins",n.appendChild(l);let c=document.createElement("div");c.className="bloom-plugin-grid";for(let f of Object.values(T))f.hidden||f.name==="Settings"||c.appendChild(Jo(n,f));n.appendChild(c);let u=document.createElement("div");u.className="bloom-plugin-pane",u.hidden=!0,n.appendChild(u),e.append(t,n),n.focus(),ne("settingsOpen",void 0)}function Zo(e){let t=un(36);e.style.width=`${t.size}px`,e.style.height=`${t.size}px`,e.style.left=`${Math.round(t.x)}px`,e.style.top=`${Math.round(t.y)}px`,e.style.right="auto",e.style.bottom="auto"}function Qo(){let e=de();e.querySelector(".bloom-settings-fab")?.remove(),_e?.abort(),$!==void 0&&(clearInterval($),$=void 0);let t=document.createElement("button");t.type="button",t.className="bloom-settings-fab",t.setAttribute("aria-label","Bloom++ settings"),t.innerHTML=mt(),t.addEventListener("click",()=>{qe?V():hn(e)}),e.appendChild(t);let n=new AbortController;_e=n;let o=()=>Zo(t);window.addEventListener("resize",o,{signal:n.signal}),window.addEventListener("scroll",o,{capture:!0,passive:!0,signal:n.signal}),$=setInterval(o,400),o()}function er(e){if(e.key==="Escape"){if(ft){$e(),e.stopPropagation();return}qe&&(V(),e.stopPropagation())}}function yn(){Ie(),G(()=>hn(de()))}var vn=x({name:"Settings",description:"Bloom++ settings, docked next to Download the ChatGPT app.",authors:[k.p],required:!0,hidden:!0,enabledByDefault:!0,settings:qo,startAt:"HostReady",cleanupSelectors:[`#${lt}`],start(){Qo(),ce(),Be?.(),Be=mn(ce)},stop(){_e?.abort(),_e=null,$!==void 0&&(clearInterval($),$=void 0),Be?.(),Be=null,V(),h?.remove(),h=null,y=null,dt=!1},onSettingsChange:ce});function tr(e){return e instanceof HTMLLinkElement&&(e.relList.contains("icon")||/\bicon\b/i.test(e.rel))}function Fe(e){return!!e&&!e.startsWith("data:")&&e!=="undefined"}function xn(){let{head:e}=document;if(!e)return null;for(let t of e.querySelectorAll("link"))if(tr(t))return t;return null}function Sn(e,t){let n=xn();n&&n.getAttribute("href")!==t&&n.setAttribute("href",t)}function pt(e,t){if(!Fe(t))return;let n=xn();n&&n.href!==t&&(n.href=t)}var wn='form[data-type="unified-composer"], form.w-full[data-type]',I="#prompt-textarea",je='button[data-testid="send-button"]',En='button[data-testid="stop-button"]';function P(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function ue(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!P(r)))return r;return null}function O(){let t=Array.from(document.querySelectorAll(wn)).find(P);if(t instanceof HTMLElement)return t;let n=ue(document,I),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function q(){let e=Array.from(document.querySelectorAll(I));return e.find(P)??e[0]??null}function gt(){let e=q();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function nr(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function fe(){let e=O();return ue(e,je)??ue(document,je)}function bt(){let e=fe();return!!e&&nr(e)}function ht(){let e=O();return ue(e,En,!0)??ue(document,En,!0)}function U(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}function Ke(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=c=>{let u=n.indexOf(c);return u>=0&&n[u+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(c,u)=>{try{return document.querySelector(c)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function Ge(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function or(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(P(t)&&/\bStop\b/i.test(t.textContent||""))return t;return null}function rr(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&P(e))}function ir(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&P(e))}function yt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function ze(){return ht()||or()?!0:fe()&&P(fe())?!1:!!(rr()||ir())}var ar=["original","badge","dot","hole","bg"],Ln=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge",default:!0},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],sr={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},lr={dark:{plate:"#212121",mark:"#ececec",ring:"#212121",glyph:"#ffffff"},light:{plate:"#ffffff",mark:"#0d0d0d",ring:"#ffffff",glyph:"#ffffff"}},cr="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",dr={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"};function Tn(e){return typeof e=="string"&&ar.includes(e)}function kn(e){return e==="original"||e==="badge"||e==="dot"}function ur(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function me(e,t="0 0 64 64"){let n=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${t}" width="64" height="64">${e}</svg>`;return`data:image/svg+xml;charset=utf-8,${encodeURIComponent(n)}`}function fr(e){return`<g transform="translate(8 8) scale(2)" fill="${e}" fill-rule="evenodd"><path d="${cr}"/></g>`}function pe(e,t){return`<rect width="64" height="64" rx="14" fill="${t}"/>${fr(e)}`}function mr(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function pr(e){return`<image href="${mr(e)}" width="64" height="64" preserveAspectRatio="xMidYMid meet"/>`}function gr(e,t){return e==="rotate"?['<g transform="translate(51.5 51.5)"><g>',`<path d="M0-6.1 A6.1 6.1 0 1 1 -5.3 3.05" fill="none" stroke="${t}" stroke-width="2.15" stroke-linecap="round"/>`,'<animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.85s" repeatCount="indefinite"/>',"</g></g>"].join(""):e==="done"?`<path d="M46.6 51.7 L50.1 55.3 L56.8 47.4" fill="none" stroke="${t}" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>`:e==="ready"?[`<path d="M51.5 56.4 V46.8" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round"/>`,`<path d="M46.6 51.2 L51.5 46.2 L56.4 51.2" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`].join(""):[`<path d="M47.2 47.2 L55.8 55.8" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round"/>`,`<path d="M55.8 47.2 L47.2 55.8" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round"/>`].join("")}function ge(e,t,n,o="dark"){let r=lr[o],i=n&&!n.startsWith("data:")?n:"";if(e==="original")return t==="wait"?i||me(pe(r.mark,r.plate)):ur(dr[t]);let a=t==="wait"?void 0:sr[t];if(e==="hole")return me(pe(a??r.mark,r.plate));if(e==="bg")return me(pe(r.mark,a??r.plate));if(!a||t==="wait")return i||me(pe(r.mark,r.plate));let s=e==="dot"?[`<circle cx="52.2" cy="52.2" r="10.4" fill="${r.ring}"/>`,`<circle cx="52.2" cy="52.2" r="7.7" fill="${a}"/>`].join(""):[`<circle cx="51.5" cy="51.5" r="12.15" fill="${r.ring}"/>`,`<circle cx="51.5" cy="51.5" r="9.55" fill="${a}"/>`,gr(t,r.glyph)].join(""),l=i?pr(i):pe(r.mark,r.plate);return me(l+s)}function vt(e,t,n="dark"){return{wait:ge(e,"wait",t,n),rotate:ge(e,"rotate",t,n),done:ge(e,"done",t,n),ready:ge(e,"ready",t,n),error:ge(e,"error",t,n)}}var br=new b("ChatStateFavicons"),xe="bloom-chat-state-favicon",An=L({style:{type:3,description:"Favicon overlay",options:Ln}}),D="",Ve="light",Rn=vt("badge","",Ve),Hn="wait",he=!1,A=!1,S=null,ye="",ve="",Se=!0,R=null,be=null,xt=null,W=0,Y,Ee=!1,Cn=new WeakSet;function Nn(){let e=An.store.style;return Tn(e)?e:"badge"}function hr(){return"auto"}function In(){return De(hr())}function Mn(){let t=document.querySelector(`link[rel~="icon"]:not(#${xe})`)?.href;return Fe(t)?t:Fe(D)?D:""}function E(e){Hn=e;let t=Nn();if(e==="wait"&&kn(t)){pt(xe,D);return}Sn(xe,Rn[e])}function St(){Ve=In(),Rn=vt(Nn(),D,Ve),E(Hn)}function yr(){let e=Ke(),t=e?Ge(e):Ge("");return ze()?(!ye&&t&&(ye=t),ye||t):(ye="",t)}function On(){he=!1,A=!1,S=null,ye=""}function vr(e){ve=e,On(),Se=!1,R?.disconnect(),R=null,E("wait")}function Dn(){if(!Ee)return;let e=Ke()||location.pathname;if(ve&&e&&ve!==e){vr(e);return}e&&(ve=e);let t=yr(),n=ze(),o=gt(),r=bt();if(yt()&&!n){E("error"),he=!1,A=!1,S=null;return}if(n){he=!0,A=!1,S=t,E("rotate");return}if(he){let i=!!S&&!!t&&S===t;if(he=!1,i){A=!0,S=t,E("done");return}A=!1,S=null}if(A)if(!!(S&&t&&S!==t))A=!1,S=null;else if(o){E("done");return}else if(Se){A=!1,E("ready");return}else{A=!1,E("wait");return}S=null,E(o?"wait":Se?"ready":"wait")}function Ue(){!Ee||W||(W=requestAnimationFrame(()=>{if(W=0,!Ee)return;Bn();let e=O();e!==document.body&&(!R||!e.isConnected)&&_n(),Dn()}))}function Pn(){Se=!0,Ue()}function Bn(){let e=q();!e||Cn.has(e)||(Cn.add(e),e.addEventListener("input",Pn,{passive:!0}),e.addEventListener("compositionend",Pn,{passive:!0}))}function _n(){R?.disconnect(),R=null;let e=O();!e||e===document.body||(R=new MutationObserver(()=>Ue()),R.observe(e,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid","class"]}))}var $n=x({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[k.p],tags:["chat","ui"],enabledByDefault:!0,settings:An,startAt:"HostReady",cleanupSelectors:[`#${xe}`],start(){Ee=!0,Ve=In(),D=Mn()||D,St(),xt=$t("schemeChange",()=>{let e=Mn();e&&(D=e),St()}),be?.abort(),be=new AbortController,window.addEventListener("popstate",Ue,{signal:be.signal}),Bn(),_n(),Y!==void 0&&clearInterval(Y),Y=setInterval(Ue,1500),Dn(),br.debug("favicon watch started")},stop(){Ee=!1,W&&cancelAnimationFrame(W),W=0,Y!==void 0&&(clearInterval(Y),Y=void 0),be?.abort(),be=null,xt?.(),xt=null,R?.disconnect(),R=null,On(),ve="",Se=!0,pt(xe,D)},onSettingsChange:St});var qn=`.bloom-ih-hud {
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
`;var jn=new b("InputHistory"),Et=/\u200B/g,Kn=10,Gn=500,zn=100,Sr=8,Er=120,wr=2e3,Ye=10,We=L({maxEntries:{type:4,description:"Max stored prompts",min:Kn,max:Gn,default:zn},history:{type:5,description:"Stored prompts",render:Dr}}),wt=new Map,m=0,Lt="",C=!1,Le=!1,Ct=0,J=null,Tt=null,X,kt,Mt=null,Vn=!0;function w(){let e=We.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Un(e){let t=Kt(Number(We.store.maxEntries??zn),Kn,Gn);return e.length>t?e.slice(e.length-t):e}function Xe(e){We.store.entries=Un(e)}function Lr(e){return e.replaceAll(Et,"").replace(/\n$/,"").trim()}function we(e){let n=(e instanceof Element?e:null)?.closest?.(I);return n instanceof HTMLElement?n:q()}function Tr(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!U(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(Et,"").trim().length===0,last:i.toString().replaceAll(Et,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Yn(e,t){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch(i){jn.debug("pm caret failed:",i)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function Wn(e){clearTimeout(kt),kt=setTimeout(()=>{if(e!==Ct)return;Le=!1;let t=Mt;t&&Yn(t,Vn)},Er)}function Xn(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),Le=!0,Mt=e,Vn=n;let i=++Ct;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(a){jn.debug("insertText failed:",a),e.textContent=t,e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:"insertText"}))}Yn(e,n),Wn(i)}function kr(){let e=de(),t=e.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",e.appendChild(t)),t}function Z(){document.getElementById("bloom-root")?.shadowRoot?.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Cr(e,t){let n=kr();n.textContent=e;let o=(t.closest("form")??O()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-Sr)}px`,n.classList.add("bloom-ih-hud-on")}function Pt(e){let t=Lr(e);if(!t)return;let n=Date.now(),o=wt.get(t);if(o&&n-o<wr)return;wt.set(t,n);let r=w().filter(i=>i!==t);r.push(t),Xe(r),m=w().length,C=!1,Z()}function Mr(e,t){let n=w();if(!n.length&&e)return;m>=n.length&&(Lt=U(t),m=n.length);let o=e?m-1:m+1;o<0||o>n.length||(m=o,C=!0,Xn(t,o===n.length?Lt:n[o],e),o<n.length?Cr(`${o+1} / ${n.length}`,t):Z())}function Pr(e){C=!1,Z(),Xn(e,Lt,!1),m=w().length}function Ar(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=we(e.target);if((!t||!t.contains(e.target)&&e.target!==t)&&(!we(document.activeElement)||e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"))return;let n=we(e.target)??we(document.activeElement);if(!n)return;if(e.key==="Escape"&&C&&!e.altKey&&!e.shiftKey){Pr(n),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){Pt(U(n));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let o=e.key==="ArrowUp",r=e.altKey,i=w();if(!r){let a=Tr(n);if(o&&!a.first||!o&&!a.last)return}o&&(!i.length||m<=0)||!o&&m>=i.length||(e.preventDefault(),e.stopImmediatePropagation(),Mr(o,n))}function Rr(e){if(we(e.target)){if(Le){Wn(Ct);return}C&&(C=!1,Z(),m=w().length)}}function Hr(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(I);n instanceof HTMLElement&&Pt(U(n))}function Nr(e){let t=e.target;if(!(t instanceof Element)||!t.closest(je))return;let o=q();o&&Pt(U(o))}function Ir(){!C||Le||(C=!1,Z())}function Fn(){let e=document.querySelector('form[data-type="unified-composer"]');if(!(e instanceof HTMLElement))return!1;if(Tt===e&&J)return!0;J?.abort(),J=new AbortController,Tt=e;let{signal:t}=J;return e.addEventListener("keydown",Ar,{capture:!0,signal:t}),e.addEventListener("input",Rr,{capture:!0,signal:t}),e.addEventListener("submit",Hr,{capture:!0,signal:t}),e.addEventListener("click",Nr,{capture:!0,signal:t}),e.addEventListener("pointerdown",Ir,{capture:!0,signal:t}),!0}function Or(e){let t=w().slice();t.splice(e,1),Xe(t),m>t.length&&(m=t.length)}function Dr(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=w().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(g=>g.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/Ye));n>=l&&(n=l-1);let c=s.slice(n*Ye,n*Ye+Ye);e.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=t,u.addEventListener("input",()=>{t=u.value,n=0,r()}),e.appendChild(u),c.length){let g=document.createElement("div");g.className="bloom-ih-list",c.forEach((Ze,Qe)=>{let lo=i.indexOf(Ze),co=w().length-1-lo,et=document.createElement("div");et.className="bloom-ih-item";let Q=document.createElement("button");Q.type="button",Q.className=`bloom-ih-body${o===Qe?"":" bloom-ih-clamp"}`,Q.textContent=Ze,Q.addEventListener("click",()=>{o=o===Qe?-1:Qe,r()});let tt=document.createElement("div");tt.className="bloom-ih-actions";let ee=document.createElement("button");ee.type="button",ee.title="Copy",ee.textContent="C",ee.addEventListener("click",()=>{zt(Ze)});let te=document.createElement("button");te.type="button",te.title="Delete",te.textContent="\xD7",te.addEventListener("click",()=>{Or(co),r()}),tt.append(ee,te),et.append(Q,tt),g.appendChild(et)}),e.appendChild(g)}else{let g=document.createElement("p");g.className="bloom-ih-empty",g.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(g)}let f=document.createElement("div");f.className="bloom-ih-pager";let v=document.createElement("button");v.type="button",v.className="bloom-ih-btn",v.textContent="Prev",v.disabled=n<=0,v.addEventListener("click",()=>{n-=1,r()});let F=document.createElement("span");F.textContent=`${n+1} / ${l}`;let p=document.createElement("button");p.type="button",p.className="bloom-ih-btn",p.textContent="Next",p.disabled=n+1>=l,p.addEventListener("click",()=>{n+=1,r()});let B=document.createElement("button");B.type="button",B.className="bloom-ih-clear",B.textContent="Clear all",B.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Xe([]),m=0,r())}),f.append(v,F,p,B),e.appendChild(f)};return r(),()=>{e.replaceChildren()}}var Jn=x({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[k.p],tags:["chat"],enabledByDefault:!0,settings:We,startAt:"HostReady",managedStyle:"inputHistory",start(){j("inputHistory",qn),de(),m=w().length,C=!1,Fn(),X!==void 0&&clearInterval(X),X=setInterval(Fn,1500)},stop(){J?.abort(),J=null,Tt=null,X!==void 0&&(clearInterval(X),X=void 0),Z(),wt.clear(),clearTimeout(kt),Le=!1,Mt=null,C=!1},onSettingsChange(){let e=w(),t=Un(e);t.length!==e.length&&Xe(t),m>t.length&&(m=t.length)}});var At="noShareLink",Br=['button[data-testid="share-chat-button"]'],_r=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],Rt=L({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Zn(e){return`${e.join(",")}{display:none!important}`}function Qn(){let e=[];if(Rt.store.hideShareChat!==!1&&e.push(Zn(Br)),Rt.store.hideShareProject!==!1&&e.push(Zn(_r)),!e.length){_(At);return}j(At,e.join(`
`))}var eo=x({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[k.p],tags:["ui","privacy"],enabledByDefault:!1,startAt:"HostReady",settings:Rt,start:Qn,onSettingsChange:Qn,stop(){_(At)}});var oo="noDictation",$r=['button[data-testid="composer-speech-button"]'],qr=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]'],ro=L({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function to(e){return`${e.join(",")}{display:none!important}`}function no(){let e=[to($r)];ro.store.hideDictationSettings!==!1&&e.push(to(qr)),j(oo,e.join(`
`))}var io=x({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[k.p],tags:["chat","ui"],enabledByDefault:!1,startAt:"HostReady",settings:ro,start:no,onSettingsChange:no,stop(){_(oo)}});var Je=new b("Bloom"),ao=!1,Fr=Date.now(),jr=[vn,$n,Jn,eo,io];function Kr(e){return new Promise(t=>setTimeout(t,e))}function Gr(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var zr=8e3,Vr=2e4,Ur=300,Yr=100;function Wr(){return new Promise(e=>{let t=!1,n=i=>{t||(t=!0,clearInterval(r),i?Kr(Ur).then(()=>e(!0)):e(!1))},o=()=>{let i=Date.now()-Fr;if(!(i<zr)){if(ae()){n(!0);return}i>=Vr&&n(!1)}},r=setInterval(o,Yr);o()})}function Xr(){try{GM_registerMenuCommand?.("Bloom++ settings",yn)}catch{}}function Jr(){G(()=>{Ot(),Re("HostReady"),Je.info("page touch",z)})}async function Ht(){await Vt()}async function Nt(){if(ao)return;ao=!0;for(let n of jr)try{Xt(n)}catch(o){Je.error("register failed",n.name,o)}Qt(),Re("Init"),Xr();let e=()=>Re("DOMContentLoaded");document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await Gr();let t=await Wr();if(nn(),Jr(),!t){Je.warn("late islands not detected; waiting for menu",z);return}on(),Je.info("script ready",z)}var so=typeof unsafeWindow<"u"?unsafeWindow:window;window===window.top&&!so.Bloom&&(Object.defineProperty(so,"Bloom",{value:It,writable:!1,configurable:!0}),Ht().then(()=>Nt()).catch(e=>console.error("[Bloom++] Fatal init error:",e)));})();
