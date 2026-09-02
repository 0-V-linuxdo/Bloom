// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260902] v1.2.4
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
// @run-at       document-idle
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

/* Bloom++ [20260902] v1.2.4. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var yo=Object.defineProperty;var vo=(e,t)=>{for(var n in t)yo(e,n,{get:t[n],enumerable:!0})};var Bt={};vo(Bt,{REPO_URL:()=>dn,Settings:()=>d,VERSION:()=>_,hasLateIslands:()=>K,init:()=>Dt,initSettings:()=>Ot,isDocumentInteractive:()=>un,plugins:()=>k,requestChromeReady:()=>se,requestIdleReady:()=>De,whenChromeReady:()=>Oe,whenIdleReady:()=>j,whenShellReady:()=>F});var H=new Map,Me=!1;function xo(){return document.getElementById("bloom-root")?.shadowRoot??null}function D(){let e=xo();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=So()}function nt(e,t){if(!Me)return;if(t.disabled){t.el&&(t.el.disabled=!0),D();return}if(t.el?.isConnected){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,D();return}let n=document.createElement("style");n.dataset.bloomStyle=e,n.textContent=t.css,document.documentElement.appendChild(n),t.el=n,D()}function q(e,t){let n=H.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},H.set(e,n)),Me&&nt(e,n)}function _t(){Me=!0;for(let[e,t]of H)nt(e,t);return D(),!0}function qt(e){let t=H.get(e);t&&(t.disabled=!1,Me&&nt(e,t))}function $t(e){let t=H.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),D())}function B(e){let t=H.get(e);t&&(t.el?.remove(),H.delete(e),D())}function So(){return Array.from(H.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}function Ft(){D()}var p=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function y(e){return e}var ot=new Map;function jt(e,t){let n=ot.get(e);return n||(n=new Set,ot.set(e,n)),n.add(t),()=>n.delete(t)}function te(e,t){let n=ot.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var wo="bloompp";function Kt(){return new Promise((e,t)=>{let n=indexedDB.open(wo,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function zt(e){try{let t=await Kt();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function Gt(e,t){try{let n=await Kt();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function ne(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Vt(e,t,n){return Math.min(n,Math.max(t,e))}function Ut(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function Wt(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}var Ae=new p("SettingsStore"),N="BloomSettings",Eo=100;function Re(e){if(ne(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(ne(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return ne(n)?n:null}return null}catch{return null}}var Pe=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let c=n?`${n}.${a}`:a;for(let[u,l]of this.defaultGetters)if(c.startsWith(u)){let h=c.slice(u.length+1);if(h&&!h.includes(".")){let m=l(h);m!==void 0&&(i[a]=m,s=m);break}}}return ne(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let c=n?`${n}.${a}`:a;return this.notifyListeners(c),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Ae.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Eo))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(N,this.plain)}catch{try{GM_setValue(N,t)}catch(n){Ae.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(N,t)}catch{}Gt(N,t).catch(n=>Ae.warn("Failed to save settings to IndexedDB:",n))}catch(t){Ae.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){Ut(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var Lo=new p("Settings"),ko={plugins:{}},d=new Pe(structuredClone(ko)),Co=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function To(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function L(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(d.store.plugins[n]||(d.store.plugins[n]={}),d.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?d.plain.plugins[n]??{}:{}}};return t}function Mo(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function Yt(){let e=null;if(e=Re(Mo(N)),e||(e=Re(await zt(N))),!e)try{e=Re(localStorage.getItem(N))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(d.plain.plugins=t),Lo.debug("Loaded settings")}}function Xt(e,t){t&&(t.pluginName=e,d.plain.plugins[e]||(d.plain.plugins[e]={}),d.setDefaultGetter(Co(e),n=>{if(n!=="enabled")return To(t.def,n)}))}var Ie=new p("PluginManager"),k={},re=new Set;function Qt(e){if(k[e.name]){Ie.warn("Duplicate plugin",e.name);return}k[e.name]=e,Xt(e.name,e.settings)}function He(e){let t=k[e];if(!t)return!1;if(t.required)return!0;let n=d.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function en(e){let t=k[e];if(!t||t.required)return;let n=!He(e);d.plain.plugins[e]||(d.store.plugins[e]={}),d.store.plugins[e].enabled=n,n?tn(t):Ao(t),te("pluginToggle",{name:e,enabled:n})}function tn(e,t=!1){if(!re.has(e.name)&&He(e.name))try{e.managedStyle&&qt(e.managedStyle),e.start?.(),re.add(e.name),e.settings&&d.addPrefixChangeListener(`plugins.${e.name}.`,()=>{re.has(e.name)&&e.onSettingsChange?.()}),t||Ie.debug("Started",e.name)}catch(n){Ie.error("Failed to start",e.name,n)}}function Ao(e){if(re.has(e.name)){try{e.stop?.()}catch(t){Ie.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&($t(e.managedStyle),B(e.managedStyle)),re.delete(e.name)}}function ie(e){for(let t of Object.values(k))(t.startAt??"DOMContentLoaded")===e&&tn(t)}var Jt=2,Zt="defaultsRev";function nn(){for(let t of Object.values(k))d.plain.plugins[t.name]||(d.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=d.store.plugins.Settings??(d.store.plugins.Settings={});if(e[Zt]!==Jt){for(let t of["NoShareLink","NoDictation"]){let n=d.store.plugins[t]??(d.store.plugins[t]={});n.enabled=!1}e[Zt]=Jt}}var ae=!1,rt=!1,it=!1,rn=[],an=[],sn=[];function at(e){let t=e.splice(0);for(let n of t)n()}function Ne(){ae||(ae=!0,at(rn))}function ln(){rt||(rt=!0,ae||Ne(),at(an))}function Po(){it||(it=!0,ae||Ne(),at(sn))}function F(e){ae?e():rn.push(e)}function j(e){rt?e():an.push(e)}function Oe(e){it?e():sn.push(e)}function De(){Ne(),ln()}function se(){Po()}function on(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function cn(){await on(4e3),Ne(),await on(4e3),ln()}var C={p:"0-V-linuxdo"},_="[20260902] v1.2.4",dn="https://github.com/0-V-linuxdo/Bloom";function Ro(){try{return!!document.querySelector('a[href^="/c/"]')}catch{return!1}}function Io(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function Ho(){try{return!!document.querySelector("#prompt-textarea")}catch{return!1}}function K(){return Ho()?Ro()||Io():!1}function un(){return K()}var No=["#page-header",'[data-testid="page-header"]',"header"],Oo=["aside",'[data-testid="left-sidebar"]','[data-testid="sidebar"]'],mn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]'];function A(e){return!(e instanceof HTMLElement)||!e.isConnected||e.closest("#bloom-root")?!1:e.getClientRects().length>0}function Do(){for(let e of No){let t=document.querySelector(e);if(A(t))return t}for(let e of document.querySelectorAll("nav"))if(A(e)&&!e.closest("aside, [data-testid='sidebar']"))return e;return null}function pn(){for(let e of Oo){let t=document.querySelector(e);if(A(t)&&t.getBoundingClientRect().left<window.innerWidth/2)return t}return null}function gn(e){return`${e.getAttribute("aria-label")||""} ${e.textContent||""}`.replace(/\s+/g," ").trim()}function Be(e){let t=e.getAttribute("href")||"";try{if(t){let o=new URL(t,location.origin).pathname;if(/\/download\/?$/.test(o))return!0}}catch{}let n=gn(e);return!!(/download.{0,24}(chatgpt\s*)?(app|desktop)/i.test(n)||/下载.{0,16}(chatgpt|应用|app)/i.test(n)||/get (the )?app/i.test(n))}function fn(e){if(Be(e))return!0;let t=e.getAttribute("href")||"";try{if(t){let o=new URL(t,location.origin).pathname;if(/^\/(gpts|store|apps)(\/|$)/i.test(o))return!0}}catch{}let n=gn(e);return!!(/gpt.?store|explore gpts|\bstore\b|\bshop\b/i.test(n)||/应用商店|插件商店|探索 GPTs/i.test(n))}function le(e,t){for(let n of e.querySelectorAll("a[href], button, [role='button']"))if(A(n)&&t(n))return n;return null}function Bo(){let e=Do();if(e){let n=le(e,Be);if(n)return n}let t=document.querySelector('a[href="/download"], a[href="/download/"], a[href*="chatgpt.com/download"]');return A(t)?t:null}function _e(e){let t=e.getBoundingClientRect();return t.left<window.innerWidth/2&&t.bottom>window.innerHeight-180}function _o(){for(let t of mn)for(let n of document.querySelectorAll(t))if(A(n)&&_e(n))return n;let e=pn();if(!e)return null;for(let t of mn){let n=e.querySelector(t);if(A(n)&&_e(n))return n}return null}function qo(e){let t=e,n=e;for(let o=0;o<8&&t;o++){let r=t.getBoundingClientRect();r.width>=160&&r.left<96&&r.bottom>window.innerHeight-180&&(n=t),t=t.parentElement}return n}function $o(e,t){let n=t.getBoundingClientRect(),o=null,r=-1;for(let i of e.querySelectorAll("a, button, [role='button']")){if(!A(i)||i===t||t.contains(i))continue;let a=i.getBoundingClientRect();a.left<n.right-8||a.width>64||a.height>64||a.right>r&&(o=i,r=a.right)}return o}function Fo(){let e=_o();if(e){let n=qo(e),o=le(n,fn)??le(n,Be);if(o)return o;let r=$o(n,e);return r||e}let t=pn();if(t){let n=le(t,Be);if(n&&_e(n))return n;let o=le(t,fn);if(o&&_e(o))return o}return null}var z=null;function bn(){z=null}function jo(){return z&&A(z)||(z=Bo()??Fo()),z}function hn(e){let n=jo(),o=e,r,i;if(n){let a=n.getBoundingClientRect();o=Math.max(32,Math.min(36,Math.round(a.height)||e)),r=a.right+8,i=a.top+(a.height-o)/2}else r=window.innerWidth-o-16,i=12;return r=Math.max(8,Math.min(window.innerWidth-o-8,r)),i=Math.max(8,Math.min(window.innerHeight-o-8,i)),{x:r,y:i,size:o}}var lt=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary"],Ko={light:{"--main-surface-primary":"#ffffff","--main-surface-secondary":"#f4f4f4","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#f9f9f9","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#b4b4b4","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.1)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.2)","--link":"#0d0d0d","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#f4f4f4","--bg-primary":"#ffffff","--bg-secondary":"#f4f4f4"},dark:{"--main-surface-primary":"#212121","--main-surface-secondary":"#2f2f2f","--main-surface-tertiary":"#424242","--sidebar-surface-primary":"#171717","--text-primary":"#ececec","--text-secondary":"#b4b4b4","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ececec","--icon-secondary":"#b4b4b4","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.1)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.2)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.06)","--interactive-label-primary-default":"#ececec","--message-surface":"#2f2f2f","--bg-primary":"#212121","--bg-secondary":"#2f2f2f"}};function zo(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Go(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function st(e){let t=zo(e);return t?Go(t)>.55?"light":"dark":null}function Vo(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=st(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=st(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=st(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function qe(e){return e==="auto"?Vo():e}function Uo(e){try{let t=getComputedStyle(document.documentElement);for(let n of lt){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function yn(e,t,n){let o=Ko[t];if(n){Uo(e);for(let r of lt)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of lt)e.style.setProperty(r,o[r])}function vn(e){let t=new MutationObserver(e);return t.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","data-color-scheme","style"]}),()=>t.disconnect()}var xn=`/* Void++ BaseCard / PluginCard chrome. Tokens from chatgpt.com via :host. */

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

.bloom-plugin-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2147483647;
  border: 0;
  padding: 0;
  margin: 0;
  background: rgba(0, 0, 0, 0.35);
  cursor: pointer;
  pointer-events: auto;
}

.bloom-plugin-dialog {
  position: fixed;
  z-index: 2147483647;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: min(480px, calc(100vw - 48px));
  max-height: min(72vh, 640px);
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 24px 24px;
  border: 0;
  border-radius: 16px;
  background: var(--bloom-bg);
  color: var(--bloom-fg);
  box-shadow: var(--bloom-shadow);
  pointer-events: auto;
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
`;var ct="bloom-root",Yo=L({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),g=null,b=null,je=!1,ft=!1,dt=[],$e=null,ut=!1,Fe=null;function pt(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function wn(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Xo(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>'}var Jo={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>'};function Zo(e){return Jo[e]??pt()}function Qo(){return"auto"}function ce(){if(!g)return;let e=Qo(),t=qe(e);g.setAttribute("data-bloom-scheme",t),yn(g,t,e==="auto"),te("schemeChange",{scheme:t,pref:e})}function mt(){Ft()}function ue(){if(b)return ce(),mt(),b;g=document.getElementById(ct),g||(g=document.createElement("div"),g.id=ct,g.style.pointerEvents="none");let e=document.documentElement;if(g.parentNode!==e&&e.appendChild(g),b=g.shadowRoot??g.attachShadow({mode:"open"}),!b.querySelector("style[data-bloom]")){let t=document.createElement("style");t.dataset.bloom="1",t.textContent=xn,b.appendChild(t)}return ce(),mt(),ut||(b.addEventListener("keydown",ar),ut=!0),b}function er(){for(let e of dt)e();dt=[]}function de(){ft=!1,er(),b?.querySelector(".bloom-plugin-backdrop")?.remove(),b?.querySelector(".bloom-plugin-dialog")?.remove()}function G(){je=!1,de(),b?.querySelector(".bloom-settings-backdrop")?.remove(),b?.querySelector(".bloom-settings-modal")?.remove()}function En(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function tr(e){return!!e.settings&&Object.keys(e.settings.def).length>0}function nr(e,t,n){if(n.type===5&&n.render){let a=document.createElement("details");a.className="bloom-field bloom-field-block";let s=document.createElement("summary");s.textContent=n.description||t;let c=document.createElement("div");return dt.push(n.render(c)),a.append(s,c),a}let o=document.createElement("div");o.className="bloom-field";let r=document.createElement("span");r.textContent=n.description||t,o.appendChild(r);let i=d.store.plugins[e]??(d.store.plugins[e]={});if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let c=document.createElement("option");c.value=s.value,c.textContent=s.label,a.appendChild(c)}return a.value=String(i[t]??n.options.find(s=>s.default)?.value??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??n.min??0);let c=document.createElement("span");return c.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),c.textContent=s.value}),a.append(s,c),o.appendChild(a),o}if(n.type===2){let a=En(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),o.appendChild(a),o}return o}function or(e){de();let t=b;if(!t)return;ft=!0;let n=document.createElement("button");n.type="button",n.className="bloom-plugin-backdrop",n.setAttribute("aria-label","Close plugin settings"),n.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),de()});let o=document.createElement("div");o.className="bloom-plugin-dialog",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.addEventListener("click",l=>l.stopPropagation());let r=document.createElement("div");r.className="bloom-dialog-bar";let i=document.createElement("div");i.className="bloom-dialog-titles";let a=document.createElement("h3");a.textContent=e.name;let s=document.createElement("p");s.textContent=e.description,i.append(a,s);let c=document.createElement("button");c.type="button",c.className="bloom-icon-btn",c.setAttribute("aria-label","Close plugin settings"),c.innerHTML=wn(),c.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),de()}),r.append(i,c);let u=document.createElement("div");if(u.className="bloom-plugin-settings",e.settings)for(let[l,h]of Object.entries(e.settings.def)){let m=nr(e.name,l,h);m&&u.appendChild(m)}if(!u.childElementCount){let l=document.createElement("p");l.className="bloom-dialog-empty",l.textContent="No configurable settings.",u.appendChild(l)}o.append(r,u),t.append(n,o)}function rr(e){let t=document.createElement("section");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Zo(e.name);let a=document.createElement("h3");a.textContent=e.name,r.append(i,a);let s=document.createElement("div");if(s.className="bloom-card-controls",tr(e)){let w=document.createElement("button");w.type="button",w.className="bloom-icon-btn bloom-card-gear",w.setAttribute("aria-label",`${e.name} settings`),w.innerHTML=Xo();let I=E=>{E.preventDefault(),E.stopPropagation(),or(e)};w.addEventListener("click",I),w.addEventListener("pointerdown",E=>E.stopPropagation()),s.appendChild(w)}let c=En(e.name,He(e.name),!!e.required);c.querySelector("input")?.addEventListener("change",()=>{en(e.name)}),s.appendChild(c),o.append(r,s);let l=document.createElement("p");l.className="bloom-card-desc",l.textContent=e.description,n.append(o,l);let h=document.createElement("div");h.className="bloom-card-sep";let m=document.createElement("div");return m.className="bloom-card-footer",m.textContent=e.authors?.join(", ")||"\xA0",t.append(n,h,m),t}function Ln(e){G(),mt(),je=!0;let t=document.createElement("button");t.type="button",t.className="bloom-settings-backdrop",t.setAttribute("aria-label","Close settings"),t.addEventListener("click",G);let n=document.createElement("div");n.className="bloom-settings-modal",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.setAttribute("aria-labelledby","bloom-settings-title"),n.tabIndex=-1,n.addEventListener("click",l=>l.stopPropagation());let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=pt();let a=document.createElement("h2");a.id="bloom-settings-title",a.textContent="Bloom++",r.append(i,a);let s=document.createElement("button");s.type="button",s.className="bloom-icon-btn",s.setAttribute("aria-label","Close"),s.innerHTML=wn(),s.addEventListener("click",G),o.append(r,s),n.appendChild(o);let c=document.createElement("p");c.className="bloom-settings-sub",c.textContent="Plugins",n.appendChild(c);let u=document.createElement("div");u.className="bloom-plugin-grid";for(let l of Object.values(k))l.hidden||l.name==="Settings"||u.appendChild(rr(l));n.appendChild(u),e.append(t,n),n.focus(),te("settingsOpen",void 0)}function Sn(e){let t=hn(36);e.style.width=`${t.size}px`,e.style.height=`${t.size}px`,e.style.left=`${Math.round(t.x)}px`,e.style.top=`${Math.round(t.y)}px`,e.style.right="auto",e.style.bottom="auto"}function ir(){let e=ue();e.querySelector(".bloom-settings-fab")?.remove(),Fe?.abort();let t=document.createElement("button");t.type="button",t.className="bloom-settings-fab",t.setAttribute("aria-label","Bloom++ settings"),t.innerHTML=pt(),t.addEventListener("click",()=>{se(),je?G():Ln(e)}),e.appendChild(t);let n=new AbortController;Fe=n;let o=()=>{bn(),Sn(t)};window.addEventListener("resize",o,{signal:n.signal}),j(()=>Sn(t))}function ar(e){if(e.key==="Escape"){if(ft){de(),e.stopPropagation();return}je&&(G(),e.stopPropagation())}}function kn(){De(),se(),F(()=>Ln(ue()))}var Cn=y({name:"Settings",description:"Bloom++ settings, docked next to Download the ChatGPT app.",authors:[C.p],required:!0,hidden:!0,enabledByDefault:!0,settings:Yo,startAt:"HostShell",cleanupSelectors:[`#${ct}`],start(){ir(),ce(),$e?.(),$e=vn(ce)},stop(){Fe?.abort(),Fe=null,$e?.(),$e=null,G(),g?.remove(),g=null,b=null,ut=!1},onSettingsChange:ce});function gt(e){return!!e&&!e.startsWith("data:")&&e!=="undefined"}function Tn(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function Mn(e,t){let n=Tn(e);n||(n=document.createElement("link"),n.id=e,n.rel="icon",document.documentElement.appendChild(n)),n.getAttribute("href")!==t&&n.setAttribute("href",t)}function bt(e,t){Tn(e)?.remove()}var Pn='form[data-type="unified-composer"], form.w-full[data-type]',V="#prompt-textarea",Ke='button[data-testid="send-button"]',An='button[data-testid="stop-button"]';function P(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function me(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!P(r)))return r;return null}function fe(){let t=Array.from(document.querySelectorAll(Pn)).find(P);if(t instanceof HTMLElement)return t;let n=me(document,V),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function U(){let e=Array.from(document.querySelectorAll(V));return e.find(P)??e[0]??null}function ht(){let e=U();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function sr(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function pe(){let e=fe();return me(e,Ke)??me(document,Ke)}function yt(){let e=pe();return!!e&&sr(e)}function vt(){let e=fe();return me(e,An,!0)??me(document,An,!0)}function W(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}function ze(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=u=>{let l=n.indexOf(u);return l>=0&&n[l+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(u,l)=>{try{return document.querySelector(u)?.getAttribute(l)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function Ge(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function lr(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(P(t)&&/\bStop\b/i.test(t.textContent||""))return t;return null}function cr(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&P(e))}function dr(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&P(e))}function xt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function Ve(){return vt()||lr()?!0:pe()&&P(pe())?!1:!!(cr()||dr())}var ur=["original","badge","dot","hole","bg"],Rn=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge",default:!0},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],mr={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},fr={dark:{plate:"#212121",mark:"#ececec",ring:"#212121",glyph:"#ffffff"},light:{plate:"#ffffff",mark:"#0d0d0d",ring:"#ffffff",glyph:"#ffffff"}},pr="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",gr={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"};function In(e){return typeof e=="string"&&ur.includes(e)}function Hn(e){return e==="original"||e==="badge"||e==="dot"}function br(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function ge(e,t="0 0 64 64"){let n=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${t}" width="64" height="64">${e}</svg>`;return`data:image/svg+xml;charset=utf-8,${encodeURIComponent(n)}`}function hr(e){return`<g transform="translate(8 8) scale(2)" fill="${e}" fill-rule="evenodd"><path d="${pr}"/></g>`}function be(e,t){return`<rect width="64" height="64" rx="14" fill="${t}"/>${hr(e)}`}function yr(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function vr(e){return`<image href="${yr(e)}" width="64" height="64" preserveAspectRatio="xMidYMid meet"/>`}function xr(e,t){return e==="rotate"?['<g transform="translate(51.5 51.5)"><g>',`<path d="M0-6.1 A6.1 6.1 0 1 1 -5.3 3.05" fill="none" stroke="${t}" stroke-width="2.15" stroke-linecap="round"/>`,'<animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.85s" repeatCount="indefinite"/>',"</g></g>"].join(""):e==="done"?`<path d="M46.6 51.7 L50.1 55.3 L56.8 47.4" fill="none" stroke="${t}" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>`:e==="ready"?[`<path d="M51.5 56.4 V46.8" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round"/>`,`<path d="M46.6 51.2 L51.5 46.2 L56.4 51.2" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`].join(""):[`<path d="M47.2 47.2 L55.8 55.8" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round"/>`,`<path d="M55.8 47.2 L47.2 55.8" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round"/>`].join("")}function he(e,t,n,o="dark"){let r=fr[o],i=n&&!n.startsWith("data:")?n:"";if(e==="original")return t==="wait"?i||ge(be(r.mark,r.plate)):br(gr[t]);let a=t==="wait"?void 0:mr[t];if(e==="hole")return ge(be(a??r.mark,r.plate));if(e==="bg")return ge(be(r.mark,a??r.plate));if(!a||t==="wait")return i||ge(be(r.mark,r.plate));let s=e==="dot"?[`<circle cx="52.2" cy="52.2" r="10.4" fill="${r.ring}"/>`,`<circle cx="52.2" cy="52.2" r="7.7" fill="${a}"/>`].join(""):[`<circle cx="51.5" cy="51.5" r="12.15" fill="${r.ring}"/>`,`<circle cx="51.5" cy="51.5" r="9.55" fill="${a}"/>`,xr(t,r.glyph)].join(""),c=i?vr(i):be(r.mark,r.plate);return ge(c+s)}function St(e,t,n="dark"){return{wait:he(e,"wait",t,n),rotate:he(e,"rotate",t,n),done:he(e,"done",t,n),ready:he(e,"ready",t,n),error:he(e,"error",t,n)}}var Sr=new p("ChatStateFavicons"),we="bloom-chat-state-favicon",Bn=L({style:{type:3,description:"Favicon overlay",options:Rn}}),O="",Ue="light",_n=St("badge","",Ue),qn="wait",ve=!1,R=!1,v=null,xe="",Se="",Ee=!0,ye=null,wt=null,X=0,Y,Le=!1,Nn=new WeakSet,wr=2e3;function $n(){let e=Bn.store.style;return In(e)?e:"badge"}function Er(){return"auto"}function Fn(){return qe(Er())}function On(){let t=document.querySelector(`link[rel~="icon"]:not(#${we})`)?.href;return gt(t)?t:gt(O)?O:""}function x(e){qn=e;let t=$n();if(e==="wait"&&Hn(t)){bt(we,O);return}Mn(we,_n[e])}function Et(){Ue=Fn(),_n=St($n(),O,Ue),x(qn)}function Lr(){let e=ze(),t=e?Ge(e):Ge("");return Ve()?(!xe&&t&&(xe=t),xe||t):(xe="",t)}function jn(){ve=!1,R=!1,v=null,xe=""}function kr(e){Se=e,jn(),Ee=!1,x("wait")}function Kn(){if(!Le)return;let e=ze()||location.pathname;if(Se&&e&&Se!==e){kr(e);return}e&&(Se=e);let t=Lr(),n=Ve(),o=ht(),r=yt();if(xt()&&!n){x("error"),ve=!1,R=!1,v=null;return}if(n){ve=!0,R=!1,v=t,x("rotate");return}if(ve){let i=!!v&&!!t&&v===t;if(ve=!1,i){R=!0,v=t,x("done");return}R=!1,v=null}if(R)if(!!(v&&t&&v!==t))R=!1,v=null;else if(o){x("done");return}else if(Ee){R=!1,x("ready");return}else{R=!1,x("wait");return}v=null,x(o?"wait":Ee?"ready":"wait")}function Lt(){!Le||X||(X=requestAnimationFrame(()=>{X=0,Le&&(zn(),Kn())}))}function Dn(){Ee=!0,Lt()}function zn(){let e=U();!e||Nn.has(e)||(Nn.add(e),e.addEventListener("input",Dn,{passive:!0}),e.addEventListener("compositionend",Dn,{passive:!0}))}var Gn=y({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[C.p],tags:["chat","ui"],enabledByDefault:!0,settings:Bn,startAt:"HostReady",cleanupSelectors:[`#${we}`],start(){Le=!0,Ue=Fn(),O=On()||O,Et(),wt=jt("schemeChange",()=>{let e=On();e&&(O=e),Et()}),ye?.abort(),ye=new AbortController,window.addEventListener("popstate",Lt,{signal:ye.signal}),zn(),Y!==void 0&&clearInterval(Y),Y=setInterval(Lt,wr),Kn(),Sr.debug("favicon watch started")},stop(){Le=!1,X&&cancelAnimationFrame(X),X=0,Y!==void 0&&(clearInterval(Y),Y=void 0),ye?.abort(),ye=null,wt?.(),wt=null,jn(),Se="",Ee=!0,bt(we,O)},onSettingsChange:Et});var Vn=`.bloom-ih-hud {
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
`;var Un=new p("InputHistory"),kt=/\u200B/g,Wn=10,Yn=500,Xn=100,Tr=8,Mr=120,Ar=2e3,We=10,Ye=L({maxEntries:{type:4,description:"Max stored prompts",min:Wn,max:Yn,default:Xn},history:{type:5,description:"Stored prompts",render:Kr}}),Ct=new Map,f=0,Tt="",T=!1,Ce=!1,Pt=0,ke=null,Mt,Rt=null,Jn=!0;function S(){let e=Ye.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Zn(e){let t=Vt(Number(Ye.store.maxEntries??Xn),Wn,Yn);return e.length>t?e.slice(e.length-t):e}function Xe(e){Ye.store.entries=Zn(e)}function Pr(e){return e.replaceAll(kt,"").replace(/\n$/,"").trim()}function At(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(V);return n instanceof HTMLElement?n:null}function Rr(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!W(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(kt,"").trim().length===0,last:i.toString().replaceAll(kt,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Qn(e,t){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch(i){Un.debug("pm caret failed:",i)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function eo(e){clearTimeout(Mt),Mt=setTimeout(()=>{if(e!==Pt)return;Ce=!1;let t=Rt;t&&Qn(t,Jn)},Mr)}function to(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),Ce=!0,Rt=e,Jn=n;let i=++Pt;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(a){Un.debug("insertText failed:",a),e.textContent=t,e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:"insertText"}))}Qn(e,n),eo(i)}function Ir(){let e=ue(),t=e.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",e.appendChild(t)),t}function J(){document.getElementById("bloom-root")?.shadowRoot?.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Hr(e,t){let n=Ir();n.textContent=e;let o=(t.closest("form")??fe()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-Tr)}px`,n.classList.add("bloom-ih-hud-on")}function It(e){let t=Pr(e);if(!t)return;let n=Date.now(),o=Ct.get(t);if(o&&n-o<Ar)return;Ct.set(t,n);let r=S().filter(i=>i!==t);r.push(t),Xe(r),f=S().length,T=!1,J()}function Nr(e,t){let n=S();if(!n.length&&e)return;f>=n.length&&(Tt=W(t),f=n.length);let o=e?f-1:f+1;o<0||o>n.length||(f=o,T=!0,to(t,o===n.length?Tt:n[o],e),o<n.length?Hr(`${o+1} / ${n.length}`,t):J())}function Or(e){T=!1,J(),to(e,Tt,!1),f=S().length}function Dr(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=At(e.target)??At(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&T&&!e.altKey&&!e.shiftKey){Or(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){It(W(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=S();if(!o){let i=Rr(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||f<=0)||!n&&f>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),Nr(n,t))}function Br(e){if(At(e.target)){if(Ce){eo(Pt);return}T&&(T=!1,J(),f=S().length)}}function _r(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(V);n instanceof HTMLElement&&It(W(n))}function qr(e){let t=e.target;if(!(t instanceof Element)||!t.closest(Ke))return;let o=U();o&&It(W(o))}function $r(e){if(!(!T||Ce)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}T=!1,J()}}function Fr(){if(ke)return;ke=new AbortController;let{signal:e}=ke;window.addEventListener("keydown",Dr,{signal:e}),window.addEventListener("input",Br,{signal:e}),window.addEventListener("submit",_r,{signal:e}),window.addEventListener("click",qr,{signal:e}),window.addEventListener("pointerdown",$r,{signal:e})}function jr(e){let t=S().slice();t.splice(e,1),Xe(t),f>t.length&&(f=t.length)}function Kr(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=S().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(M=>M.toLowerCase().includes(a)):i,c=Math.max(1,Math.ceil(s.length/We));n>=c&&(n=c-1);let u=s.slice(n*We,n*We+We);e.replaceChildren();let l=document.createElement("input");if(l.className="bloom-ih-search",l.type="search",l.placeholder="Search history",l.autocomplete="off",l.value=t,l.addEventListener("input",()=>{t=l.value,n=0,r()}),e.appendChild(l),u.length){let M=document.createElement("div");M.className="bloom-ih-list",u.forEach((Ze,Qe)=>{let bo=i.indexOf(Ze),ho=S().length-1-bo,et=document.createElement("div");et.className="bloom-ih-item";let Z=document.createElement("button");Z.type="button",Z.className=`bloom-ih-body${o===Qe?"":" bloom-ih-clamp"}`,Z.textContent=Ze,Z.addEventListener("click",()=>{o=o===Qe?-1:Qe,r()});let tt=document.createElement("div");tt.className="bloom-ih-actions";let Q=document.createElement("button");Q.type="button",Q.title="Copy",Q.textContent="C",Q.addEventListener("click",()=>{Wt(Ze)});let ee=document.createElement("button");ee.type="button",ee.title="Delete",ee.textContent="\xD7",ee.addEventListener("click",()=>{jr(ho),r()}),tt.append(Q,ee),et.append(Z,tt),M.appendChild(et)}),e.appendChild(M)}else{let M=document.createElement("p");M.className="bloom-ih-empty",M.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(M)}let h=document.createElement("div");h.className="bloom-ih-pager";let m=document.createElement("button");m.type="button",m.className="bloom-ih-btn",m.textContent="Prev",m.disabled=n<=0,m.addEventListener("click",()=>{n-=1,r()});let w=document.createElement("span");w.textContent=`${n+1} / ${c}`;let I=document.createElement("button");I.type="button",I.className="bloom-ih-btn",I.textContent="Next",I.disabled=n+1>=c,I.addEventListener("click",()=>{n+=1,r()});let E=document.createElement("button");E.type="button",E.className="bloom-ih-clear",E.textContent="Clear all",E.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(Xe([]),f=0,r())}),h.append(m,w,I,E),e.appendChild(h)};return r(),()=>{e.replaceChildren()}}var no=y({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[C.p],tags:["chat"],enabledByDefault:!0,settings:Ye,startAt:"HostReady",managedStyle:"inputHistory",start(){q("inputHistory",Vn),ue(),f=S().length,T=!1,Fr()},stop(){ke?.abort(),ke=null,J(),Ct.clear(),clearTimeout(Mt),Ce=!1,Rt=null,T=!1},onSettingsChange(){let e=S(),t=Zn(e);t.length!==e.length&&Xe(t),f>t.length&&(f=t.length)}});var Ht="noShareLink",zr=['button[data-testid="share-chat-button"]'],Gr=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],Nt=L({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function oo(e){return`${e.join(",")}{display:none!important}`}function ro(){let e=[];if(Nt.store.hideShareChat!==!1&&e.push(oo(zr)),Nt.store.hideShareProject!==!1&&e.push(oo(Gr)),!e.length){B(Ht);return}q(Ht,e.join(`
`))}var io=y({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[C.p],tags:["ui","privacy"],enabledByDefault:!1,startAt:"HostReady",settings:Nt,start:ro,onSettingsChange:ro,stop(){B(Ht)}});var lo="noDictation",Vr=['button[data-testid="composer-speech-button"]'],Ur=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]'],co=L({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function ao(e){return`${e.join(",")}{display:none!important}`}function so(){let e=[ao(Vr)];co.store.hideDictationSettings!==!1&&e.push(ao(Ur)),q(lo,e.join(`
`))}var uo=y({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[C.p],tags:["chat","ui"],enabledByDefault:!1,startAt:"HostReady",settings:co,start:so,onSettingsChange:so,stop(){B(lo)}});var Te=new p("Bloom"),mo=!1,fo=Date.now(),Wr=[Cn,Gn,no,io,uo];function Je(e){return new Promise(t=>setTimeout(t,e))}function Yr(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var Xr=8e3,Jr=2e4,po=300,Zr=2e3;async function Qr(){let e=Xr-(Date.now()-fo);if(e>0&&await Je(e),K())return await Je(po),!0;for(;Date.now()-fo<Jr;)if(await Je(Zr),K())return await Je(po),!0;return!1}function ei(){try{GM_registerMenuCommand?.("Bloom++ settings",kn)}catch{}}function ti(){F(()=>{ie("HostShell"),Te.info("host shell",_)}),j(()=>{Te.info("idle ready",_)}),Oe(()=>{_t(),ie("HostReady"),Te.info("chrome ready",_)})}async function Ot(){await Yt()}async function Dt(){if(mo)return;mo=!0;for(let n of Wr)try{Qt(n)}catch(o){Te.error("register failed",n.name,o)}nn(),ie("Init"),ei(),ti();let e=()=>ie("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await Yr(),!await Qr()){Te.warn("late islands not detected; waiting for menu",_);return}await cn()}var go=typeof unsafeWindow<"u"?unsafeWindow:window;window===window.top&&!go.Bloom&&(Object.defineProperty(go,"Bloom",{value:Bt,writable:!1,configurable:!0}),Ot().then(()=>Dt()).catch(e=>console.error("[Bloom++] Fatal init error:",e)));})();
