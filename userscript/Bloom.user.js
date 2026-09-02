// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260902] v1.3.5
// @description  Void++-style plugin host for chatgpt.com. Tab favicon, input history, hide Share and Dictation.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @icon         https://raw.githubusercontent.com/0-V-linuxdo/Bloom/main/assets/logos/bloom-icon.svg
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
// @downloadURL  https://raw.githubusercontent.com/0-V-linuxdo/Bloom/main/userscript/Bloom.user.js
// @updateURL    https://raw.githubusercontent.com/0-V-linuxdo/Bloom/main/userscript/Bloom.user.js
// ==/UserScript==

/* Bloom++ [20260902] v1.3.5. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Ko=Object.defineProperty;var Go=(e,t)=>{for(var n in t)Ko(e,n,{get:t[n],enumerable:!0})};var Zt={};Go(Zt,{REPO_URL:()=>Cn,Settings:()=>u,VERSION:()=>K,hasLateIslands:()=>G,init:()=>Xt,initSettings:()=>Jt,isDocumentInteractive:()=>Tn,plugins:()=>M,requestChromeReady:()=>wn,requestIdleReady:()=>Q,whenChromeReady:()=>Ke,whenIdleReady:()=>Z,whenShellReady:()=>X});var D=new Map,Oe=!1;function Vo(){return document.getElementById("bloom-root")?.shadowRoot??null}function Wo(){return document.head??null}function z(){let e=Vo();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=Uo()}function bt(e,t){if(!Oe)return;let n=Wo();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),z();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,z();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,z()}function Y(e,t){let n=D.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},D.set(e,n)),Oe&&bt(e,n)}function Qt(){Oe=!0;for(let[e,t]of D)bt(e,t);return z(),!0}function en(e){let t=D.get(e);t&&(t.disabled=!1,Oe&&bt(e,t))}function tn(e){let t=D.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),z())}function j(e){let t=D.get(e);t&&(t.el?.remove(),D.delete(e),z())}function Uo(){return Array.from(D.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}function nn(){z()}var y=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function x(e){return e}var Yo=new Map;function ge(e,t){let n=Yo.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var Jo="bloompp";function on(){return new Promise((e,t)=>{let n=indexedDB.open(Jo,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function rn(e){try{let t=await on();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function an(e,t){try{let n=await on();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function be(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function sn(e,t,n){return Math.min(n,Math.max(t,e))}function ln(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function cn(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}var Be=new y("SettingsStore"),O="BloomSettings",Xo=100;function Fe(e){if(be(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(be(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return be(n)?n:null}return null}catch{return null}}var _e=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[b,c]of this.defaultGetters)if(l.startsWith(b)){let h=l.slice(b.length+1);if(h&&!h.includes(".")){let d=c(h);d!==void 0&&(i[a]=d,s=d);break}}}return be(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Be.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Xo))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(O,this.plain)}catch{try{GM_setValue(O,t)}catch(n){Be.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(O,t)}catch{}an(O,t).catch(n=>Be.warn("Failed to save settings to IndexedDB:",n))}catch(t){Be.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){ln(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var Zo=new y("Settings"),Qo={plugins:{}},u=new _e(structuredClone(Qo)),er=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function tr(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function T(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(u.store.plugins[n]||(u.store.plugins[n]={}),u.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?u.plain.plugins[n]??{}:{}}};return t}function nr(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function un(){let e=null;if(e=Fe(nr(O)),e||(e=Fe(await rn(O))),!e)try{e=Fe(localStorage.getItem(O))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(u.plain.plugins=t),Zo.debug("Loaded settings")}}function dn(e,t){t&&(t.pluginName=e,u.plain.plugins[e]||(u.plain.plugins[e]={}),u.setDefaultGetter(er(e),n=>{if(n!=="enabled")return tr(t.def,n)}))}var qe=new y("PluginManager"),M={},ye=new Set;function pn(e){if(M[e.name]){qe.warn("Duplicate plugin",e.name);return}M[e.name]=e,dn(e.name,e.settings)}function $e(e){let t=M[e];if(!t)return!1;if(t.required)return!0;let n=u.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function gn(e){let t=M[e];if(!t||t.required)return;let n=!$e(e);u.plain.plugins[e]||(u.store.plugins[e]={}),u.store.plugins[e].enabled=n,n?bn(t):or(t),ge("pluginToggle",{name:e,enabled:n})}function bn(e,t=!1){if(!ye.has(e.name)&&$e(e.name))try{e.managedStyle&&en(e.managedStyle),e.start?.(),ye.add(e.name),e.settings&&u.addPrefixChangeListener(`plugins.${e.name}.`,()=>{ye.has(e.name)&&e.onSettingsChange?.()}),t||qe.debug("Started",e.name)}catch(n){qe.error("Failed to start",e.name,n)}}function or(e){if(ye.has(e.name)){try{e.stop?.()}catch(t){qe.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(tn(e.managedStyle),j(e.managedStyle)),ye.delete(e.name)}}function ve(e){for(let t of Object.values(M))(t.startAt??"DOMContentLoaded")===e&&bn(t)}var mn=2,fn="defaultsRev";function hn(){for(let t of Object.values(M))u.plain.plugins[t.name]||(u.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=u.store.plugins.Settings??(u.store.plugins.Settings={});if(e[fn]!==mn){for(let t of["NoShareLink","NoDictation"]){let n=u.store.plugins[t]??(u.store.plugins[t]={});n.enabled=!1}e[fn]=mn}}var xe=!1,ze=!1,ht=!1,vn=[],xn=[],En=[];function yt(e){let t=e.splice(0);for(let n of t)n()}function je(){xe||(xe=!0,yt(vn))}function vt(){ze||(ze=!0,xe||je(),yt(xn))}function Sn(){ht||(ht=!0,xe||je(),ze||vt(),yt(En))}function X(e){xe?e():vn.push(e)}function Z(e){ze?e():xn.push(e)}function Ke(e){ht?e():En.push(e)}function Q(){je(),vt()}function wn(){Sn()}function yn(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function Ln(){await yn(4e3),je(),await yn(4e3),vt(),Sn()}var k={p:"0-V-linuxdo"},K="[20260902] v1.3.5",Cn="https://github.com/0-V-linuxdo/Bloom";function rr(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function ir(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function xt(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function G(){return xt()?rr()||ir():!1}function Tn(){return G()}var ar=["#page-header",'[data-testid="page-header"]',"header"],sr=["aside",'[data-testid="left-sidebar"]','[data-testid="sidebar"]'],Mn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]'];function H(e){return!(e instanceof HTMLElement)||!e.isConnected||e.closest("#bloom-root")?!1:e.getClientRects().length>0}function lr(){for(let e of ar){let t=document.querySelector(e);if(H(t))return t}for(let e of document.querySelectorAll("nav"))if(H(e)&&!e.closest("aside, [data-testid='sidebar']"))return e;return null}function An(){for(let e of sr){let t=document.querySelector(e);if(H(t)&&t.getBoundingClientRect().left<window.innerWidth/2)return t}return null}function Pn(e){return`${e.getAttribute("aria-label")||""} ${e.textContent||""}`.replace(/\s+/g," ").trim()}function Ge(e){let t=e.getAttribute("href")||"";try{if(t){let o=new URL(t,location.origin).pathname;if(/\/download\/?$/.test(o))return!0}}catch{}let n=Pn(e);return!!(/download.{0,24}(chatgpt\s*)?(app|desktop)/i.test(n)||/下载.{0,16}(chatgpt|应用|app)/i.test(n)||/get (the )?app/i.test(n))}function kn(e){if(Ge(e))return!0;let t=e.getAttribute("href")||"";try{if(t){let o=new URL(t,location.origin).pathname;if(/^\/(gpts|store|apps)(\/|$)/i.test(o))return!0}}catch{}let n=Pn(e);return!!(/gpt.?store|explore gpts|\bstore\b|\bshop\b/i.test(n)||/应用商店|插件商店|探索 GPTs/i.test(n))}function Ee(e,t){for(let n of e.querySelectorAll("a[href], button, [role='button']"))if(H(n)&&t(n))return n;return null}function cr(){let e=lr();if(e){let n=Ee(e,Ge);if(n)return n}let t=document.querySelector('a[href="/download"], a[href="/download/"], a[href*="chatgpt.com/download"]');return H(t)?t:null}function Ve(e){let t=e.getBoundingClientRect();return t.left<window.innerWidth/2&&t.bottom>window.innerHeight-180}function ur(){for(let t of Mn)for(let n of document.querySelectorAll(t))if(H(n)&&Ve(n))return n;let e=An();if(!e)return null;for(let t of Mn){let n=e.querySelector(t);if(H(n)&&Ve(n))return n}return null}function dr(e){let t=e,n=e;for(let o=0;o<8&&t;o++){let r=t.getBoundingClientRect();r.width>=160&&r.left<96&&r.bottom>window.innerHeight-180&&(n=t),t=t.parentElement}return n}function mr(e,t){let n=t.getBoundingClientRect(),o=null,r=-1;for(let i of e.querySelectorAll("a, button, [role='button']")){if(!H(i)||i===t||t.contains(i))continue;let a=i.getBoundingClientRect();a.left<n.right-8||a.width>64||a.height>64||a.right>r&&(o=i,r=a.right)}return o}function fr(){let e=ur();if(e){let n=dr(e),o=Ee(n,kn)??Ee(n,Ge);if(o)return o;let r=mr(n,e);return r||e}let t=An();if(t){let n=Ee(t,Ge);if(n&&Ve(n))return n;let o=Ee(t,kn);if(o&&Ve(o))return o}return null}var ee=null;function Rn(){ee=null}function pr(){return ee&&H(ee)||(ee=cr()??fr()),ee}function Hn(e){let n=pr(),o=e,r,i;if(n){let a=n.getBoundingClientRect();o=Math.max(32,Math.min(36,Math.round(a.height)||e)),r=a.right+8,i=a.top+(a.height-o)/2}else r=window.innerWidth-o-16,i=12;return r=Math.max(8,Math.min(window.innerWidth-o-8,r)),i=Math.max(8,Math.min(window.innerHeight-o-8,i)),{x:r,y:i,size:o}}var St=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary"],gr={light:{"--main-surface-primary":"#ffffff","--main-surface-secondary":"#f4f4f4","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#f9f9f9","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#b4b4b4","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.1)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.2)","--link":"#0d0d0d","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#f4f4f4","--bg-primary":"#ffffff","--bg-secondary":"#f4f4f4"},dark:{"--main-surface-primary":"#212121","--main-surface-secondary":"#2f2f2f","--main-surface-tertiary":"#424242","--sidebar-surface-primary":"#171717","--text-primary":"#ececec","--text-secondary":"#b4b4b4","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ececec","--icon-secondary":"#b4b4b4","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.1)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.2)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.06)","--interactive-label-primary-default":"#ececec","--message-surface":"#2f2f2f","--bg-primary":"#212121","--bg-secondary":"#2f2f2f"}};function br(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function hr(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function Et(e){let t=br(e);return t?hr(t)>.55?"light":"dark":null}function yr(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=Et(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=Et(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Et(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function In(e){return e==="auto"?yr():e}function vr(e){try{let t=getComputedStyle(document.documentElement);for(let n of St){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function Nn(e,t,n){let o=gr[t];if(n){vr(e);for(let r of St)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of St)e.style.setProperty(r,o[r])}function Dn(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var On=`/* Void++ BaseCard / PluginCard chrome. Tokens from chatgpt.com via :host.
   Zero-size host. Narrow non-modal flyout. Never a full-viewport backdrop. */

:host {
  position: fixed;
  width: 0;
  height: 0;
  inset: auto;
  overflow: visible;
  pointer-events: none;
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
  z-index: 10000;
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

.bloom-settings-panel {
  position: fixed;
  z-index: 10001;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 360px;
  max-width: min(420px, calc(100vw - 24px));
  max-height: min(70vh, 560px);
  padding: 20px;
  border: 0;
  border-radius: 16px;
  background: var(--bloom-bg);
  color: var(--bloom-fg);
  box-shadow: var(--bloom-shadow);
  pointer-events: auto;
}

.bloom-settings-list,
.bloom-settings-plugin {
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1;
  pointer-events: auto;
}

.bloom-settings-panel[hidden],
.bloom-settings-list[hidden],
.bloom-settings-plugin[hidden] {
  display: none !important;
  pointer-events: none !important;
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
  width: 1.25rem;
  height: 1.25rem;
  color: var(--bloom-fg);
  line-height: 0;
}

.bloom-card-icon svg {
  width: 1.125rem;
  height: 1.125rem;
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

.bloom-dialog-titles {
  min-width: 0;
  flex: 1;
}

.bloom-dialog-titles h2,
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
  overflow: auto;
  min-height: 0;
  flex: 1;
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
  .bloom-settings-panel,
  .bloom-switch span,
  .bloom-switch span::after {
    transition: none;
  }
}
`;var wt="bloom-root",$n="10000",Er="10001",Sr=360,Bn=420,wr=T({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),g=null,te=null,B=!1,Mt=!1,Lt=[],We=null,Ue=null,Ct=null,_=null,m=null,we=null,Le=null,ne=null,Ye=null,Je=null,I=null;function kt(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function _n(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Lr(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>'}function Cr(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>'}var Tr={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>'};function Mr(e){return Tr[e]??kt()}function kr(){return"auto"}function Se(){if(!g)return;let e=kr(),t=In(e);g.setAttribute("data-bloom-scheme",t),Nn(g,t,e==="auto"),ge("schemeChange",{scheme:t,pref:e})}function Ar(){nn()}function F(e,t){e&&(e.hidden=t,e.toggleAttribute("inert",t),t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden"),e.style.pointerEvents=t?"none":"auto")}function Pr(e){let t=e.composedPath();return!!(m&&t.includes(m)||_&&t.includes(_))}function Rr(e){e.style.position="fixed",e.style.width="0px",e.style.height="0px",e.style.inset="auto",e.style.margin="0",e.style.padding="0",e.style.border="0",e.style.overflow="visible",e.style.pointerEvents="none",e.style.zIndex=$n}function Fn(e){e.querySelectorAll(".bloom-settings-backdrop, .bloom-plugin-backdrop").forEach(t=>t.remove())}function Ce(){g=document.getElementById(wt),g||(g=document.createElement("div"),g.id=wt),Rr(g);let e=document.body;if(e&&g.parentNode!==e&&e.appendChild(g),te=g.shadowRoot??g.attachShadow({mode:"open"}),Fn(g),Fn(te),!te.querySelector("style[data-bloom]")){let t=document.createElement("style");t.dataset.bloom="1",t.textContent=On,te.appendChild(t)}return Se(),Ar(),te}function zn(){for(let e of Lt)e();Lt=[]}function jn(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function Hr(e){return!!e.settings&&Object.keys(e.settings.def).length>0}function Ir(e,t,n){if(n.hidden)return null;if(n.type===5&&n.render){let a=document.createElement("details");a.className="bloom-field bloom-field-block";let s=document.createElement("summary");s.textContent=n.description||t;let l=document.createElement("div");return Lt.push(n.render(l)),a.append(s,l),a}let o=document.createElement("div");o.className="bloom-field";let r=document.createElement("span");r.textContent=n.description||t,o.appendChild(r);let i=u.store.plugins[e]??(u.store.plugins[e]={});if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??n.options.find(s=>s.default)?.value??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=jn(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),o.appendChild(a),o}return o}function Xe(){Mt=!1,zn(),I&&I.replaceChildren(),F(Le,!0),F(we,!1)}function Nr(e){if(zn(),Mt=!0,Ye&&(Ye.textContent=e.name),Je&&(Je.textContent=e.description),I){if(I.replaceChildren(),e.settings)for(let[t,n]of Object.entries(e.settings.def)){let o=Ir(e.name,t,n);o&&I.appendChild(o)}if(!I.childElementCount){let t=document.createElement("p");t.className="bloom-dialog-empty",t.textContent="No configurable settings.",I.appendChild(t)}}F(we,!0),F(Le,!1)}function Dr(e){let t=document.createElement("section");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=Mr(e.name);let a=document.createElement("h3");a.textContent=e.name,r.append(i,a);let s=document.createElement("div");if(s.className="bloom-card-controls",Hr(e)){let v=document.createElement("button");v.type="button",v.className="bloom-icon-btn bloom-card-gear",v.setAttribute("aria-label",`${e.name} settings`),v.innerHTML=Cr(),v.addEventListener("click",()=>Nr(e)),s.appendChild(v)}let l=jn(e.name,$e(e.name),!!e.required);l.querySelector("input")?.addEventListener("change",()=>{gn(e.name)}),s.appendChild(l),o.append(r,s);let c=document.createElement("p");c.className="bloom-card-desc",c.textContent=e.description,n.append(o,c);let h=document.createElement("div");h.className="bloom-card-sep";let d=document.createElement("div");return d.className="bloom-card-footer",d.textContent=e.authors?.join(", ")||"\xA0",t.append(n,h,d),t}function Kn(){if(ne){ne.replaceChildren();for(let e of Object.values(M))e.hidden||e.name==="Settings"||ne.appendChild(Dr(e))}}function Gn(e){if(m&&we&&Le&&ne&&m.isConnected)return;m?.remove();let t=document.createElement("div");t.className="bloom-settings-panel",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","false"),t.setAttribute("aria-labelledby","bloom-settings-title"),t.style.zIndex=Er,F(t,!0);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=kt();let a=document.createElement("h2");a.id="bloom-settings-title",a.textContent="Bloom++",r.append(i,a);let s=document.createElement("button");s.type="button",s.className="bloom-icon-btn",s.setAttribute("aria-label","Close"),s.innerHTML=_n(),s.addEventListener("click",oe),o.append(r,s),n.appendChild(o);let l=document.createElement("p");l.className="bloom-settings-sub",l.textContent="Plugins",n.appendChild(l);let b=document.createElement("div");b.className="bloom-plugin-grid",n.appendChild(b);let c=document.createElement("div");c.className="bloom-settings-plugin",F(c,!0);let h=document.createElement("div");h.className="bloom-settings-head";let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn",d.setAttribute("aria-label","Back"),d.innerHTML=Lr(),d.addEventListener("click",Xe);let v=document.createElement("div");v.className="bloom-dialog-titles";let C=document.createElement("h2");C.textContent="";let R=document.createElement("p");R.className="bloom-settings-sub",v.append(C,R);let f=document.createElement("button");f.type="button",f.className="bloom-icon-btn",f.setAttribute("aria-label","Close"),f.innerHTML=_n(),f.addEventListener("click",oe),h.append(d,v,f);let $=document.createElement("div");$.className="bloom-plugin-settings",c.append(h,$),t.append(n,c),e.append(t),m=t,we=n,Le=c,ne=b,Ye=C,Je=R,I=$,Kn()}function Tt(){if(!m||!_)return;let e=_.getBoundingClientRect(),t=window.innerWidth,n=window.innerHeight,o=Math.min(Bn,Math.max(280,Math.min(Sr,t-24))),r=Math.min(Math.round(n*.7),560);m.style.width=`${Math.round(o)}px`,m.style.maxWidth=`${Bn}px`,m.style.maxHeight=`${Math.round(r)}px`,m.style.right="auto",m.style.inset="";let i=e.right-o;i<12&&(i=12),i+o>t-12&&(i=Math.max(12,t-12-o));let a=n-e.bottom-8,s=e.top-8;a>=240||a>=s?(m.style.top=`${Math.round(e.bottom+8)}px`,m.style.bottom="auto"):(m.style.top="auto",m.style.bottom=`${Math.round(n-e.top+8)}px`),m.style.left=`${Math.round(i)}px`}function oe(){B=!1,F(m,!0),_?.setAttribute("aria-expanded","false"),Xe(),At()}function Vn(){let e=Ce();Gn(e),Se(),Kn(),Xe(),B=!0,_?.setAttribute("aria-expanded","true"),Tt(),F(m,!1),Fr(),ge("settingsOpen",void 0)}function Or(){B?oe():Vn()}function qn(e){let t=Hn(36);e.style.width=`${t.size}px`,e.style.height=`${t.size}px`,e.style.left=`${Math.round(t.x)}px`,e.style.top=`${Math.round(t.y)}px`,e.style.right="auto",e.style.bottom="auto",e.style.zIndex=$n}function Br(e){B&&(Pr(e)||oe())}function _r(e){if(e.key==="Escape"&&B){if(Mt){Xe();return}oe()}}function At(){Ct?.abort(),Ct=null}function Fr(){if(At(),!B)return;let e=new AbortController;Ct=e,window.addEventListener("pointerdown",Br,{capture:!0,signal:e.signal}),window.addEventListener("keydown",_r,{capture:!0,signal:e.signal})}function qr(){let e=Ce();e.querySelector(".bloom-settings-fab")?.remove(),Ue?.abort();let t=document.createElement("button");t.type="button",t.className="bloom-settings-fab",t.setAttribute("aria-label","Bloom++ settings"),t.setAttribute("aria-expanded","false"),t.setAttribute("aria-haspopup","dialog"),t.innerHTML=kt(),t.addEventListener("click",Or),e.appendChild(t),_=t,Gn(e);let n=new AbortController;Ue=n;let o=()=>{Rn(),qn(t),B&&Tt()};window.addEventListener("resize",o,{signal:n.signal}),Z(()=>{qn(t),B&&Tt()})}function Wn(){Q(),X(()=>Vn())}var Un=x({name:"Settings",description:"Bloom++ settings, docked next to Download the ChatGPT app.",authors:[k.p],required:!0,hidden:!0,enabledByDefault:!0,settings:wr,startAt:"HostShell",cleanupSelectors:[`#${wt}`],start(){qr(),Se(),We?.(),We=Dn(Se)},stop(){Ue?.abort(),Ue=null,At(),We?.(),We=null,oe(),g?.remove(),g=null,te=null,_=null,m=null,we=null,Le=null,ne=null,Ye=null,Je=null,I=null},onSettingsChange:Se});var Xn='form[data-type="unified-composer"], form.w-full[data-type]',re=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Ze=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Yn=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Jn=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),$r=/stop streaming|stop generating|停止生成|停止输出|停止响应/;function E(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function V(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!E(r)))return r;return null}function Zn(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function A(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=Zn(e);return!!($r.test(n)||/^stop$/i.test(n))}function q(){let t=Array.from(document.querySelectorAll(Xn)).find(E);if(t instanceof HTMLElement)return t;let n=V(document,re),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function W(){let e=Array.from(document.querySelectorAll(re));return e.find(E)??e[0]??null}function Pt(){let e=W();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function zr(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function Qn(e){let t=q();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!E(n))&&e(n))return n;return null}function Qe(){let e=q(),t=V(e,Ze)??V(document,Ze);return t&&!A(t)?t:Qn(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!A(n);let r=Zn(n);return/^(send|send prompt|发送)$/i.test(r)&&!A(n)})}function Rt(){let e=Qe();return!!e&&zr(e)}function Ht(){let e=q(),t=V(e,Yn,!0)??V(document,Yn,!0);if(t)return t;let n=V(e,Jn)??V(document,Jn);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&E(o)&&A(o))return o}return Qn(A)}function ie(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}var It=0;function eo(e){It+=1;try{e()}finally{It-=1}}function et(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function ae(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function to(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function jr(e){let{head:t}=document;if(t)for(let n of Array.from(t.querySelectorAll("link")))n.id!==e&&et(n)&&n.remove()}function Kr(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Nt(e,t){let{head:n}=document;!n||!t||eo(()=>{jr(e);let o=to(e),{type:r,sizes:i}=Kr(t);o?n.lastElementChild!==o&&n.appendChild(o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function no(e,t){let{head:n}=document;n&&eo(()=>{to(e)?.remove();let o=Array.from(n.querySelectorAll("link")).filter(et);if(o.length){ae(t)&&o[0].href!==t&&(o[0].href=t);return}if(!ae(t))return;let r=document.createElement("link");r.rel="icon",r.href=t,n.appendChild(r)})}function oo(e,t){let{head:n}=document;if(!n)return null;let o=new MutationObserver(r=>{if(!It)for(let i of r){if(i.type==="attributes"&&et(i.target)){t(i.target.id===e?void 0:i.target.href);return}for(let a of i.addedNodes)if(et(a)&&a.id!==e){t(a.href);return}}});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}function tt(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=b=>{let c=n.indexOf(b);return c>=0&&n[c+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(b,c)=>{try{return document.querySelector(b)?.getAttribute(c)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function nt(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function Gr(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!E(t))&&(A(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function Vr(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&E(e))}function Wr(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&E(e))}function Ur(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Dt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function ot(){if(Ht()||Gr())return!0;let e=Qe();return e&&E(e)&&!A(e)?!1:!!(Vr()||Wr()||Ur())}var Yr=["original","badge","dot","hole","bg"],ao=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge",default:!0},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],so={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},rt="#FCFCFC",Jr="#111111",ro="#111111",Xr="#ffffff",Zr="#212121",Qr="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",ei={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},it=32,io=64;function lo(e){return typeof e=="string"&&Yr.includes(e)}function ti(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function at(e){let t=document.createElement("canvas");t.width=it,t.height=it;let n=t.getContext("2d");return n?(n.scale(it/io,it/io),e(n),t.toDataURL("image/png")):""}function ni(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function st(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(Qr);n&&(e.strokeStyle=Jr,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function oi(e,t,n){let o=so[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=ro,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=ro,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=Xr,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function Te(e,t){if(e==="original")return t==="wait"?at(o=>st(o,rt)):ti(ei[t]);let n=t==="wait"?void 0:so[t];return at(e==="hole"?o=>st(o,n??rt):e==="bg"?o=>{o.fillStyle=n??Zr,ni(o,0,0,64,64,14),o.fill(),st(o,rt,!1)}:o=>{st(o,rt),t!=="wait"&&oi(o,t,e==="dot"?"dot":"badge")})}function co(e){return{wait:Te(e,"wait"),rotate:Te(e,"rotate"),done:Te(e,"done"),ready:Te(e,"ready"),error:Te(e,"error")}}var ri=new y("ChatStateFavicons"),le="bloom-chat-state-favicon",po=T({style:{type:3,description:"Favicon overlay",options:ao}}),ce="",Bt={wait:"",rotate:"",done:"",ready:"",error:""},_t="wait",ke=!1,N=!1,S=null,Ae="",Pe="",Re=!0,Me=null,ue=0,se,lt=null,U=null,Ot=null,He=!1,uo=new WeakSet,ii=400;function ai(){let e=po.store.style;return lo(e)?e:"badge"}function si(){let t=document.querySelector(`link[rel~="icon"]:not(#${le})`)?.href;return ae(t)?t:ae(ce)?ce:""}function w(e){_t=e,Nt(le,Bt[e])}function mo(){Bt=co(ai()),w(_t)}function li(){let e=tt(),t=e?nt(e):nt("");return ot()?(!Ae&&t&&(Ae=t),Ae||t):(Ae="",t)}function go(){ke=!1,N=!1,S=null,Ae=""}function ci(e){Pe=e,go(),Re=!1,w("wait")}function bo(){if(!He)return;let e=tt()||location.pathname;if(Pe&&e&&Pe!==e){ci(e);return}e&&(Pe=e);let t=li(),n=ot(),o=Pt(),r=Rt();if(Dt()&&!n){w("error"),ke=!1,N=!1,S=null;return}if(n){ke=!0,N=!1,S=t,w("rotate");return}if(ke){let i=!!S&&!!t&&S===t;if(ke=!1,i){N=!0,S=t,w("done");return}N=!1,S=null}if(N)if(!!(S&&t&&S!==t))N=!1,S=null;else if(o){w("done");return}else if(Re){N=!1,w("ready");return}else{N=!1,w("wait");return}S=null,w(o?"wait":Re?"ready":"wait")}function ho(){let e=q();if(!(U&&Ot===e&&e.isConnected)){if(U?.disconnect(),Ot=e,!e||e===document.body){U=null;return}U=new MutationObserver(()=>ct()),U.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid","class"]})}}function ct(){!He||ue||(ue=requestAnimationFrame(()=>{ue=0,He&&(yo(),ho(),bo())}))}function fo(){Re=!0,ct()}function yo(){let e=W();!e||uo.has(e)||(uo.add(e),e.addEventListener("input",fo,{passive:!0}),e.addEventListener("compositionend",fo,{passive:!0}))}var vo=x({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[k.p],tags:["chat","ui"],enabledByDefault:!0,settings:po,startAt:"DOMContentLoaded",cleanupSelectors:[`#${le}`],start(){He=!0,ce=si()||ce,mo(),lt?.disconnect(),lt=oo(le,e=>{ae(e)&&(ce=e),Nt(le,Bt[_t])}),Me?.abort(),Me=new AbortController,window.addEventListener("popstate",ct,{signal:Me.signal}),yo(),ho(),se!==void 0&&clearInterval(se),se=setInterval(ct,ii),bo(),ri.debug("favicon watch started")},stop(){He=!1,ue&&cancelAnimationFrame(ue),ue=0,se!==void 0&&(clearInterval(se),se=void 0),Me?.abort(),Me=null,U?.disconnect(),U=null,Ot=null,lt?.disconnect(),lt=null,go(),Pe="",Re=!0,no(le,ce)},onSettingsChange:mo});var xo=`.bloom-ih-hud {
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
`;var Eo=new y("InputHistory"),Ft=/\u200B/g,So=10,wo=500,Lo=100,di=8,mi=120,fi=2e3,ut=10,dt=T({maxEntries:{type:4,description:"Max stored prompts",min:So,max:wo,default:Lo},history:{type:5,description:"Stored prompts",render:Mi},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),qt=new Map,p=0,$t="",P=!1,Ne=!1,Kt=0,Ie=null,zt,Gt=null,Co=!0;function L(){let e=dt.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function To(e){let t=sn(Number(dt.store.maxEntries??Lo),So,wo);return e.length>t?e.slice(e.length-t):e}function mt(e){dt.store.entries=To(e)}function pi(e){return e.replaceAll(Ft,"").replace(/\n$/,"").trim()}function jt(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(re);return n instanceof HTMLElement?n:W()}function gi(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!ie(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(Ft,"").trim().length===0,last:i.toString().replaceAll(Ft,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Mo(e,t){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch(i){Eo.debug("pm caret failed:",i)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function ko(e){clearTimeout(zt),zt=setTimeout(()=>{if(e!==Kt)return;Ne=!1;let t=Gt;t&&Mo(t,Co)},mi)}function Ao(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),Ne=!0,Gt=e,Co=n;let i=++Kt;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(a){Eo.debug("insertText failed:",a),e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),Mo(e,n),ko(i)}function bi(){let e=Ce(),t=e.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",e.appendChild(t)),t}function de(){document.getElementById("bloom-root")?.shadowRoot?.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function hi(e,t){let n=bi();n.textContent=e;let o=(t.closest("form")??q()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-di)}px`,n.classList.add("bloom-ih-hud-on")}function Vt(e){let t=pi(e);if(!t)return;let n=Date.now(),o=qt.get(t);if(o&&n-o<fi)return;qt.set(t,n);let r=L().filter(i=>i!==t);r.push(t),mt(r),p=L().length,P=!1,de()}function yi(e,t){let n=L();if(!n.length&&e)return;p>=n.length&&($t=ie(t),p=n.length);let o=e?p-1:p+1;o<0||o>n.length||(p=o,P=!0,Ao(t,o===n.length?$t:n[o],e),o<n.length?hi(`${o+1} / ${n.length}`,t):de())}function vi(e){P=!1,de(),Ao(e,$t,!1),p=L().length}function xi(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=jt(e.target)??jt(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&P&&!e.altKey&&!e.shiftKey){vi(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){Vt(ie(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=L();if(!o){let i=gi(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||p<=0)||!n&&p>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),yi(n,t))}function Ei(e){if(jt(e.target)){if(Ne){ko(Kt);return}P&&(P=!1,de(),p=L().length)}}function Si(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(re);n instanceof HTMLElement&&Vt(ie(n))}function wi(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(Ze);if(!n||!(n instanceof HTMLElement)||A(n))return;let o=W();o&&Vt(ie(o))}function Li(e){if(!(!P||Ne)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}P=!1,de()}}function Ci(){if(Ie)return;Ie=new AbortController;let{signal:e}=Ie,t={capture:!0,signal:e};window.addEventListener("keydown",xi,t),window.addEventListener("input",Ei,t),window.addEventListener("submit",Si,t),window.addEventListener("click",wi,t),window.addEventListener("pointerdown",Li,t)}function Ti(e){let t=L().slice();t.splice(e,1),mt(t),p>t.length&&(p=t.length)}function Mi(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=L().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(f=>f.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/ut));n>=l&&(n=l-1);let b=s.slice(n*ut,n*ut+ut);e.replaceChildren();let c=document.createElement("input");if(c.className="bloom-ih-search",c.type="search",c.placeholder="Search history",c.autocomplete="off",c.value=t,c.addEventListener("input",()=>{t=c.value,n=0,r()}),e.appendChild(c),b.length){let f=document.createElement("div");f.className="bloom-ih-list",b.forEach(($,ft)=>{let zo=i.indexOf($),jo=L().length-1-zo,pt=document.createElement("div");pt.className="bloom-ih-item";let me=document.createElement("button");me.type="button",me.className=`bloom-ih-body${o===ft?"":" bloom-ih-clamp"}`,me.textContent=$,me.addEventListener("click",()=>{o=o===ft?-1:ft,r()});let gt=document.createElement("div");gt.className="bloom-ih-actions";let fe=document.createElement("button");fe.type="button",fe.title="Copy",fe.textContent="C",fe.addEventListener("click",()=>{cn($)});let pe=document.createElement("button");pe.type="button",pe.title="Delete",pe.textContent="\xD7",pe.addEventListener("click",()=>{Ti(jo),r()}),gt.append(fe,pe),pt.append(me,gt),f.appendChild(pt)}),e.appendChild(f)}else{let f=document.createElement("p");f.className="bloom-ih-empty",f.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(f)}let h=document.createElement("div");h.className="bloom-ih-pager";let d=document.createElement("button");d.type="button",d.className="bloom-ih-btn",d.textContent="Prev",d.disabled=n<=0,d.addEventListener("click",()=>{n-=1,r()});let v=document.createElement("span");v.textContent=`${n+1} / ${l}`;let C=document.createElement("button");C.type="button",C.className="bloom-ih-btn",C.textContent="Next",C.disabled=n+1>=l,C.addEventListener("click",()=>{n+=1,r()});let R=document.createElement("button");R.type="button",R.className="bloom-ih-clear",R.textContent="Clear all",R.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(mt([]),p=0,r())}),h.append(d,v,C,R),e.appendChild(h)};return r(),()=>{e.replaceChildren()}}var Po=x({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[k.p],tags:["chat"],enabledByDefault:!0,settings:dt,startAt:"HostReady",managedStyle:"inputHistory",start(){Y("inputHistory",xo),Ce(),p=L().length,P=!1,Ci()},stop(){Ie?.abort(),Ie=null,de(),qt.clear(),clearTimeout(zt),Ne=!1,Gt=null,P=!1},onSettingsChange(){let e=L(),t=To(e);t.length!==e.length&&mt(t),p>t.length&&(p=t.length)}});var Wt="noShareLink",ki=['button[data-testid="share-chat-button"]'],Ai=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],Ut=T({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Ro(e){return`${e.join(",")}{display:none!important}`}function Ho(){let e=[];if(Ut.store.hideShareChat!==!1&&e.push(Ro(ki)),Ut.store.hideShareProject!==!1&&e.push(Ro(Ai)),!e.length){j(Wt);return}Y(Wt,e.join(`
`))}var Io=x({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[k.p],tags:["ui","privacy"],enabledByDefault:!1,startAt:"HostReady",settings:Ut,start:Ho,onSettingsChange:Ho,stop(){j(Wt)}});var Oo="noDictation",Pi=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]'],Ri=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Bo=T({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function No(e){return`${e.join(",")}{display:none!important}`}function Do(){let e=[No(Pi)];Bo.store.hideDictationSettings!==!1&&e.push(No(Ri)),Y(Oo,e.join(`
`))}var _o=x({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[k.p],tags:["chat","ui"],enabledByDefault:!1,startAt:"HostReady",settings:Bo,start:Do,onSettingsChange:Do,stop(){j(Oo)}});var De=new y("Bloom"),Fo=!1,Hi=Date.now(),Ii=[Un,vo,Po,Io,_o];function Yt(e){return new Promise(t=>setTimeout(t,e))}function Ni(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var Di=8e3,qo=300,Oi=250;async function Bi(){if(G())return await Yt(qo),!0;for(;Date.now()-Hi<Di;)if(await Yt(Oi),G())return await Yt(qo),!0;return G()||xt()}function _i(){try{GM_registerMenuCommand?.("Bloom++ settings",Wn)}catch{}}function Fi(){X(()=>{ve("HostShell"),De.info("host shell",K)}),Z(()=>{De.info("idle ready",K)}),Ke(()=>{Qt(),ve("HostReady"),De.info("chrome ready",K)})}async function Jt(){await un()}async function Xt(){if(Fo)return;Fo=!0;for(let n of Ii)try{pn(n)}catch(o){De.error("register failed",n.name,o)}hn(),ve("Init"),_i(),Fi();let e=()=>ve("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await Ni(),!await Bi()){De.warn("late islands not detected; shell only",K),Q();return}await Ln()}var $o=typeof unsafeWindow<"u"?unsafeWindow:window;window===window.top&&!$o.Bloom&&(Object.defineProperty($o,"Bloom",{value:Zt,writable:!1,configurable:!0}),Jt().then(()=>Xt()).catch(e=>console.error("[Bloom++] Fatal init error:",e)));})();
