// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260902] v1.3.3
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

/* Bloom++ [20260902] v1.3.3. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var qo=Object.defineProperty;var $o=(e,t)=>{for(var n in t)qo(e,n,{get:t[n],enumerable:!0})};var Xt={};$o(Xt,{REPO_URL:()=>Ln,Settings:()=>u,VERSION:()=>j,hasLateIslands:()=>K,init:()=>Jt,initSettings:()=>Yt,isDocumentInteractive:()=>Cn,plugins:()=>M,requestChromeReady:()=>En,requestIdleReady:()=>ee,whenChromeReady:()=>Ke,whenIdleReady:()=>Q,whenShellReady:()=>Z});var D=new Map,Oe=!1;function zo(){return document.getElementById("bloom-root")?.shadowRoot??null}function jo(){return document.head??null}function $(){let e=zo();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=Ko()}function ht(e,t){if(!Oe)return;let n=jo();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),$();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,$();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,$()}function J(e,t){let n=D.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},D.set(e,n)),Oe&&ht(e,n)}function Zt(){Oe=!0;for(let[e,t]of D)ht(e,t);return $(),!0}function Qt(e){let t=D.get(e);t&&(t.disabled=!1,Oe&&ht(e,t))}function en(e){let t=D.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),$())}function z(e){let t=D.get(e);t&&(t.el?.remove(),D.delete(e),$())}function Ko(){return Array.from(D.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}function tn(){$()}var h=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function x(e){return e}var Go=new Map;function ge(e,t){let n=Go.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var Vo="bloompp";function nn(){return new Promise((e,t)=>{let n=indexedDB.open(Vo,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function on(e){try{let t=await nn();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function rn(e,t){try{let n=await nn();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function be(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function an(e,t,n){return Math.min(n,Math.max(t,e))}function sn(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function ln(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}var Be=new h("SettingsStore"),O="BloomSettings",Uo=100;function Fe(e){if(be(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(be(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return be(n)?n:null}return null}catch{return null}}var _e=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[g,c]of this.defaultGetters)if(l.startsWith(g)){let b=l.slice(g.length+1);if(b&&!b.includes(".")){let d=c(b);d!==void 0&&(i[a]=d,s=d);break}}}return be(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Be.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Uo))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(O,this.plain)}catch{try{GM_setValue(O,t)}catch(n){Be.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(O,t)}catch{}rn(O,t).catch(n=>Be.warn("Failed to save settings to IndexedDB:",n))}catch(t){Be.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){sn(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var Wo=new h("Settings"),Yo={plugins:{}},u=new _e(structuredClone(Yo)),Jo=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function Xo(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function T(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(u.store.plugins[n]||(u.store.plugins[n]={}),u.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?u.plain.plugins[n]??{}:{}}};return t}function Zo(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function cn(){let e=null;if(e=Fe(Zo(O)),e||(e=Fe(await on(O))),!e)try{e=Fe(localStorage.getItem(O))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(u.plain.plugins=t),Wo.debug("Loaded settings")}}function un(e,t){t&&(t.pluginName=e,u.plain.plugins[e]||(u.plain.plugins[e]={}),u.setDefaultGetter(Jo(e),n=>{if(n!=="enabled")return Xo(t.def,n)}))}var qe=new h("PluginManager"),M={},ye=new Set;function fn(e){if(M[e.name]){qe.warn("Duplicate plugin",e.name);return}M[e.name]=e,un(e.name,e.settings)}function $e(e){let t=M[e];if(!t)return!1;if(t.required)return!0;let n=u.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function pn(e){let t=M[e];if(!t||t.required)return;let n=!$e(e);u.plain.plugins[e]||(u.store.plugins[e]={}),u.store.plugins[e].enabled=n,n?gn(t):Qo(t),ge("pluginToggle",{name:e,enabled:n})}function gn(e,t=!1){if(!ye.has(e.name)&&$e(e.name))try{e.managedStyle&&Qt(e.managedStyle),e.start?.(),ye.add(e.name),e.settings&&u.addPrefixChangeListener(`plugins.${e.name}.`,()=>{ye.has(e.name)&&e.onSettingsChange?.()}),t||qe.debug("Started",e.name)}catch(n){qe.error("Failed to start",e.name,n)}}function Qo(e){if(ye.has(e.name)){try{e.stop?.()}catch(t){qe.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(en(e.managedStyle),z(e.managedStyle)),ye.delete(e.name)}}function ve(e){for(let t of Object.values(M))(t.startAt??"DOMContentLoaded")===e&&gn(t)}var dn=2,mn="defaultsRev";function bn(){for(let t of Object.values(M))u.plain.plugins[t.name]||(u.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=u.store.plugins.Settings??(u.store.plugins.Settings={});if(e[mn]!==dn){for(let t of["NoShareLink","NoDictation"]){let n=u.store.plugins[t]??(u.store.plugins[t]={});n.enabled=!1}e[mn]=dn}}var xe=!1,ze=!1,yt=!1,yn=[],vn=[],xn=[];function vt(e){let t=e.splice(0);for(let n of t)n()}function je(){xe||(xe=!0,vt(yn))}function xt(){ze||(ze=!0,xe||je(),vt(vn))}function Sn(){yt||(yt=!0,xe||je(),ze||xt(),vt(xn))}function Z(e){xe?e():yn.push(e)}function Q(e){ze?e():vn.push(e)}function Ke(e){yt?e():xn.push(e)}function ee(){je(),xt()}function En(){Sn()}function hn(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function wn(){await hn(4e3),je(),await hn(4e3),xt(),Sn()}var k={p:"0-V-linuxdo"},j="[20260902] v1.3.3",Ln="https://github.com/0-V-linuxdo/Bloom";function er(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function tr(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function St(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function K(){return St()?er()||tr():!1}function Cn(){return K()}var nr=["#page-header",'[data-testid="page-header"]',"header"],or=["aside",'[data-testid="left-sidebar"]','[data-testid="sidebar"]'],Tn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]'];function H(e){return!(e instanceof HTMLElement)||!e.isConnected||e.closest("#bloom-root")?!1:e.getClientRects().length>0}function rr(){for(let e of nr){let t=document.querySelector(e);if(H(t))return t}for(let e of document.querySelectorAll("nav"))if(H(e)&&!e.closest("aside, [data-testid='sidebar']"))return e;return null}function kn(){for(let e of or){let t=document.querySelector(e);if(H(t)&&t.getBoundingClientRect().left<window.innerWidth/2)return t}return null}function An(e){return`${e.getAttribute("aria-label")||""} ${e.textContent||""}`.replace(/\s+/g," ").trim()}function Ge(e){let t=e.getAttribute("href")||"";try{if(t){let o=new URL(t,location.origin).pathname;if(/\/download\/?$/.test(o))return!0}}catch{}let n=An(e);return!!(/download.{0,24}(chatgpt\s*)?(app|desktop)/i.test(n)||/下载.{0,16}(chatgpt|应用|app)/i.test(n)||/get (the )?app/i.test(n))}function Mn(e){if(Ge(e))return!0;let t=e.getAttribute("href")||"";try{if(t){let o=new URL(t,location.origin).pathname;if(/^\/(gpts|store|apps)(\/|$)/i.test(o))return!0}}catch{}let n=An(e);return!!(/gpt.?store|explore gpts|\bstore\b|\bshop\b/i.test(n)||/应用商店|插件商店|探索 GPTs/i.test(n))}function Se(e,t){for(let n of e.querySelectorAll("a[href], button, [role='button']"))if(H(n)&&t(n))return n;return null}function ir(){let e=rr();if(e){let n=Se(e,Ge);if(n)return n}let t=document.querySelector('a[href="/download"], a[href="/download/"], a[href*="chatgpt.com/download"]');return H(t)?t:null}function Ve(e){let t=e.getBoundingClientRect();return t.left<window.innerWidth/2&&t.bottom>window.innerHeight-180}function ar(){for(let t of Tn)for(let n of document.querySelectorAll(t))if(H(n)&&Ve(n))return n;let e=kn();if(!e)return null;for(let t of Tn){let n=e.querySelector(t);if(H(n)&&Ve(n))return n}return null}function sr(e){let t=e,n=e;for(let o=0;o<8&&t;o++){let r=t.getBoundingClientRect();r.width>=160&&r.left<96&&r.bottom>window.innerHeight-180&&(n=t),t=t.parentElement}return n}function lr(e,t){let n=t.getBoundingClientRect(),o=null,r=-1;for(let i of e.querySelectorAll("a, button, [role='button']")){if(!H(i)||i===t||t.contains(i))continue;let a=i.getBoundingClientRect();a.left<n.right-8||a.width>64||a.height>64||a.right>r&&(o=i,r=a.right)}return o}function cr(){let e=ar();if(e){let n=sr(e),o=Se(n,Mn)??Se(n,Ge);if(o)return o;let r=lr(n,e);return r||e}let t=kn();if(t){let n=Se(t,Ge);if(n&&Ve(n))return n;let o=Se(t,Mn);if(o&&Ve(o))return o}return null}var te=null;function Pn(){te=null}function ur(){return te&&H(te)||(te=ir()??cr()),te}function Rn(e){let n=ur(),o=e,r,i;if(n){let a=n.getBoundingClientRect();o=Math.max(32,Math.min(36,Math.round(a.height)||e)),r=a.right+8,i=a.top+(a.height-o)/2}else r=window.innerWidth-o-16,i=12;return r=Math.max(8,Math.min(window.innerWidth-o-8,r)),i=Math.max(8,Math.min(window.innerHeight-o-8,i)),{x:r,y:i,size:o}}var wt=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary"],dr={light:{"--main-surface-primary":"#ffffff","--main-surface-secondary":"#f4f4f4","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#f9f9f9","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#b4b4b4","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.1)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.2)","--link":"#0d0d0d","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#f4f4f4","--bg-primary":"#ffffff","--bg-secondary":"#f4f4f4"},dark:{"--main-surface-primary":"#212121","--main-surface-secondary":"#2f2f2f","--main-surface-tertiary":"#424242","--sidebar-surface-primary":"#171717","--text-primary":"#ececec","--text-secondary":"#b4b4b4","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ececec","--icon-secondary":"#b4b4b4","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.1)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.2)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.06)","--interactive-label-primary-default":"#ececec","--message-surface":"#2f2f2f","--bg-primary":"#212121","--bg-secondary":"#2f2f2f"}};function mr(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function fr(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function Et(e){let t=mr(e);return t?fr(t)>.55?"light":"dark":null}function pr(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=Et(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=Et(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Et(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Hn(e){return e==="auto"?pr():e}function gr(e){try{let t=getComputedStyle(document.documentElement);for(let n of wt){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function In(e,t,n){let o=dr[t];if(n){gr(e);for(let r of wt)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of wt)e.style.setProperty(r,o[r])}function Nn(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var Dn=`/* Void++ BaseCard / PluginCard chrome. Tokens from chatgpt.com via :host.
   Settings is a non-modal flyout. Never a full-viewport backdrop. */

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
  width: min(640px, calc(100vw - 24px));
  max-height: min(72vh, 640px);
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
`;var Lt="bloom-root",hr="10000",yr="10001",vr=T({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),y=null,G=null,V=!1,Mt=!1,Ct=[],Ue=null,We=null,Ye=null,B=null,m=null,we=null,Le=null,ne=null,Je=null,Xe=null,I=null;function kt(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function On(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function xr(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>'}function Sr(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>'}var Er={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>'};function wr(e){return Er[e]??kt()}function Lr(){return"auto"}function Ee(){if(!y)return;let e=Lr(),t=Hn(e);y.setAttribute("data-bloom-scheme",t),In(y,t,e==="auto"),ge("schemeChange",{scheme:t,pref:e})}function Cr(){tn()}function _(e,t){e&&(e.hidden=t,e.toggleAttribute("inert",t),t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden"),e.style.pointerEvents=t?"none":"auto")}function Tr(e){let t=e.composedPath();return!!(m&&t.includes(m)||B&&t.includes(B))}function Ce(){if(G)return G;y=document.getElementById(Lt),y||(y=document.createElement("div"),y.id=Lt,y.style.pointerEvents="none");let e=document.body;if(e&&y.parentNode!==e&&e.appendChild(y),G=y.shadowRoot??y.attachShadow({mode:"open"}),!G.querySelector("style[data-bloom]")){let t=document.createElement("style");t.dataset.bloom="1",t.textContent=Dn,G.appendChild(t)}return Ee(),Cr(),G}function _n(){for(let e of Ct)e();Ct=[]}function Fn(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function Mr(e){return!!e.settings&&Object.keys(e.settings.def).length>0}function kr(e,t,n){if(n.hidden)return null;if(n.type===5&&n.render){let a=document.createElement("details");a.className="bloom-field bloom-field-block";let s=document.createElement("summary");s.textContent=n.description||t;let l=document.createElement("div");return Ct.push(n.render(l)),a.append(s,l),a}let o=document.createElement("div");o.className="bloom-field";let r=document.createElement("span");r.textContent=n.description||t,o.appendChild(r);let i=u.store.plugins[e]??(u.store.plugins[e]={});if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??n.options.find(s=>s.default)?.value??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=Fn(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),o.appendChild(a),o}return o}function Ze(){Mt=!1,_n(),I&&I.replaceChildren(),_(Le,!0),_(we,!1)}function Ar(e){if(_n(),Mt=!0,Je&&(Je.textContent=e.name),Xe&&(Xe.textContent=e.description),I){if(I.replaceChildren(),e.settings)for(let[t,n]of Object.entries(e.settings.def)){let o=kr(e.name,t,n);o&&I.appendChild(o)}if(!I.childElementCount){let t=document.createElement("p");t.className="bloom-dialog-empty",t.textContent="No configurable settings.",I.appendChild(t)}}_(we,!0),_(Le,!1)}function Pr(e){let t=document.createElement("section");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=wr(e.name);let a=document.createElement("h3");a.textContent=e.name,r.append(i,a);let s=document.createElement("div");if(s.className="bloom-card-controls",Mr(e)){let v=document.createElement("button");v.type="button",v.className="bloom-icon-btn bloom-card-gear",v.setAttribute("aria-label",`${e.name} settings`),v.innerHTML=Sr(),v.addEventListener("click",()=>Ar(e)),s.appendChild(v)}let l=Fn(e.name,$e(e.name),!!e.required);l.querySelector("input")?.addEventListener("change",()=>{pn(e.name)}),s.appendChild(l),o.append(r,s);let c=document.createElement("p");c.className="bloom-card-desc",c.textContent=e.description,n.append(o,c);let b=document.createElement("div");b.className="bloom-card-sep";let d=document.createElement("div");return d.className="bloom-card-footer",d.textContent=e.authors?.join(", ")||"\xA0",t.append(n,b,d),t}function qn(){if(ne){ne.replaceChildren();for(let e of Object.values(M))e.hidden||e.name==="Settings"||ne.appendChild(Pr(e))}}function $n(e){if(m&&we&&Le&&ne&&m.isConnected)return;m?.remove();let t=document.createElement("div");t.className="bloom-settings-panel",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","false"),t.setAttribute("aria-labelledby","bloom-settings-title"),t.style.zIndex=yr,_(t,!0);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=kt();let a=document.createElement("h2");a.id="bloom-settings-title",a.textContent="Bloom++",r.append(i,a);let s=document.createElement("button");s.type="button",s.className="bloom-icon-btn",s.setAttribute("aria-label","Close"),s.innerHTML=On(),s.addEventListener("click",oe),o.append(r,s),n.appendChild(o);let l=document.createElement("p");l.className="bloom-settings-sub",l.textContent="Plugins",n.appendChild(l);let g=document.createElement("div");g.className="bloom-plugin-grid",n.appendChild(g);let c=document.createElement("div");c.className="bloom-settings-plugin",_(c,!0);let b=document.createElement("div");b.className="bloom-settings-head";let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn",d.setAttribute("aria-label","Back"),d.innerHTML=xr(),d.addEventListener("click",Ze);let v=document.createElement("div");v.className="bloom-dialog-titles";let C=document.createElement("h2");C.textContent="";let R=document.createElement("p");R.className="bloom-settings-sub",v.append(C,R);let f=document.createElement("button");f.type="button",f.className="bloom-icon-btn",f.setAttribute("aria-label","Close"),f.innerHTML=On(),f.addEventListener("click",oe),b.append(d,v,f);let q=document.createElement("div");q.className="bloom-plugin-settings",c.append(b,q),t.append(n,c),e.append(t),m=t,we=n,Le=c,ne=g,Je=C,Xe=R,I=q,qn()}function Tt(){if(!m||!B)return;let e=B.getBoundingClientRect(),t=window.innerWidth,n=window.innerHeight,o=Math.min(640,Math.max(280,t-24)),r=Math.min(n-24,640);m.style.width=`${Math.round(o)}px`,m.style.maxHeight=`${Math.round(r)}px`;let i=e.right-o;i<12&&(i=12),i+o>t-12&&(i=Math.max(12,t-12-o));let a=n-e.bottom-8,s=e.top-8;a>=240||a>=s?(m.style.top=`${Math.round(e.bottom+8)}px`,m.style.bottom="auto"):(m.style.top="auto",m.style.bottom=`${Math.round(n-e.top+8)}px`),m.style.left=`${Math.round(i)}px`,m.style.right="auto"}function oe(){V=!1,_(m,!0),B?.setAttribute("aria-expanded","false"),Ze()}function zn(){let e=Ce();$n(e),Ee(),qn(),Ze(),V=!0,B?.setAttribute("aria-expanded","true"),Tt(),_(m,!1),ge("settingsOpen",void 0)}function Rr(){V?oe():zn()}function Bn(e){let t=Rn(36);e.style.width=`${t.size}px`,e.style.height=`${t.size}px`,e.style.left=`${Math.round(t.x)}px`,e.style.top=`${Math.round(t.y)}px`,e.style.right="auto",e.style.bottom="auto",e.style.zIndex=hr}function Hr(e){V&&(Tr(e)||oe())}function Ir(e){if(e.key==="Escape"&&V){if(Mt){Ze();return}oe()}}function Nr(){Ye?.abort();let e=new AbortController;Ye=e,window.addEventListener("pointerdown",Hr,{capture:!0,signal:e.signal}),window.addEventListener("keydown",Ir,{capture:!0,signal:e.signal})}function Dr(){let e=Ce();e.querySelector(".bloom-settings-fab")?.remove(),We?.abort();let t=document.createElement("button");t.type="button",t.className="bloom-settings-fab",t.setAttribute("aria-label","Bloom++ settings"),t.setAttribute("aria-expanded","false"),t.setAttribute("aria-haspopup","dialog"),t.innerHTML=kt(),t.addEventListener("click",Rr),e.appendChild(t),B=t,$n(e);let n=new AbortController;We=n;let o=()=>{Pn(),Bn(t),V&&Tt()};window.addEventListener("resize",o,{signal:n.signal}),Q(()=>{Bn(t),V&&Tt()})}function jn(){ee(),Z(()=>zn())}var Kn=x({name:"Settings",description:"Bloom++ settings, docked next to Download the ChatGPT app.",authors:[k.p],required:!0,hidden:!0,enabledByDefault:!0,settings:vr,startAt:"HostShell",cleanupSelectors:[`#${Lt}`],start(){Dr(),Nr(),Ee(),Ue?.(),Ue=Nn(Ee)},stop(){We?.abort(),We=null,Ye?.abort(),Ye=null,Ue?.(),Ue=null,oe(),y?.remove(),y=null,G=null,B=null,m=null,we=null,Le=null,ne=null,Je=null,Xe=null,I=null},onSettingsChange:Ee});var Un='form[data-type="unified-composer"], form.w-full[data-type]',re=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Qe=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Gn=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Vn=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Or=/stop streaming|stop generating|停止生成|停止输出|停止响应/;function S(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function U(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!S(r)))return r;return null}function Wn(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function A(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=Wn(e);return!!(Or.test(n)||/^stop$/i.test(n))}function F(){let t=Array.from(document.querySelectorAll(Un)).find(S);if(t instanceof HTMLElement)return t;let n=U(document,re),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function W(){let e=Array.from(document.querySelectorAll(re));return e.find(S)??e[0]??null}function At(){let e=W();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function Br(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function Yn(e){let t=F();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!S(n))&&e(n))return n;return null}function et(){let e=F(),t=U(e,Qe)??U(document,Qe);return t&&!A(t)?t:Yn(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!A(n);let r=Wn(n);return/^(send|send prompt|发送)$/i.test(r)&&!A(n)})}function Pt(){let e=et();return!!e&&Br(e)}function Rt(){let e=F(),t=U(e,Gn,!0)??U(document,Gn,!0);if(t)return t;let n=U(e,Vn)??U(document,Vn);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&S(o)&&A(o))return o}return Yn(A)}function ie(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}var Ht=0;function Jn(e){Ht+=1;try{e()}finally{Ht-=1}}function tt(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function ae(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function Xn(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function _r(e){let{head:t}=document;if(t)for(let n of Array.from(t.querySelectorAll("link")))n.id!==e&&tt(n)&&n.remove()}function Fr(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function It(e,t){let{head:n}=document;!n||!t||Jn(()=>{_r(e);let o=Xn(e),{type:r,sizes:i}=Fr(t);o?n.lastElementChild!==o&&n.appendChild(o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function Zn(e,t){let{head:n}=document;n&&Jn(()=>{Xn(e)?.remove();let o=Array.from(n.querySelectorAll("link")).filter(tt);if(o.length){ae(t)&&o[0].href!==t&&(o[0].href=t);return}if(!ae(t))return;let r=document.createElement("link");r.rel="icon",r.href=t,n.appendChild(r)})}function Qn(e,t){let{head:n}=document;if(!n)return null;let o=new MutationObserver(r=>{if(!Ht)for(let i of r){if(i.type==="attributes"&&tt(i.target)){t(i.target.id===e?void 0:i.target.href);return}for(let a of i.addedNodes)if(tt(a)&&a.id!==e){t(a.href);return}}});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}function nt(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=g=>{let c=n.indexOf(g);return c>=0&&n[c+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(g,c)=>{try{return document.querySelector(g)?.getAttribute(c)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function ot(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function qr(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!S(t))&&(A(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function $r(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&S(e))}function zr(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&S(e))}function jr(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Nt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function rt(){if(Rt()||qr())return!0;let e=et();return e&&S(e)&&!A(e)?!1:!!($r()||zr()||jr())}var Kr=["original","badge","dot","hole","bg"],no=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge",default:!0},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],oo={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},it="#FCFCFC",Gr="#111111",eo="#111111",Vr="#ffffff",Ur="#212121",Wr="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Yr={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},at=32,to=64;function ro(e){return typeof e=="string"&&Kr.includes(e)}function Jr(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function st(e){let t=document.createElement("canvas");t.width=at,t.height=at;let n=t.getContext("2d");return n?(n.scale(at/to,at/to),e(n),t.toDataURL("image/png")):""}function Xr(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function lt(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(Wr);n&&(e.strokeStyle=Gr,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function Zr(e,t,n){let o=oo[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=eo,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=eo,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=Vr,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function Te(e,t){if(e==="original")return t==="wait"?st(o=>lt(o,it)):Jr(Yr[t]);let n=t==="wait"?void 0:oo[t];return st(e==="hole"?o=>lt(o,n??it):e==="bg"?o=>{o.fillStyle=n??Ur,Xr(o,0,0,64,64,14),o.fill(),lt(o,it,!1)}:o=>{lt(o,it),t!=="wait"&&Zr(o,t,e==="dot"?"dot":"badge")})}function io(e){return{wait:Te(e,"wait"),rotate:Te(e,"rotate"),done:Te(e,"done"),ready:Te(e,"ready"),error:Te(e,"error")}}var Qr=new h("ChatStateFavicons"),le="bloom-chat-state-favicon",co=T({style:{type:3,description:"Favicon overlay",options:no}}),ce="",Ot={wait:"",rotate:"",done:"",ready:"",error:""},Bt="wait",ke=!1,N=!1,E=null,Ae="",Pe="",Re=!0,Me=null,ue=0,se,ct=null,Y=null,Dt=null,He=!1,ao=new WeakSet,ei=400;function ti(){let e=co.store.style;return ro(e)?e:"badge"}function ni(){let t=document.querySelector(`link[rel~="icon"]:not(#${le})`)?.href;return ae(t)?t:ae(ce)?ce:""}function w(e){Bt=e,It(le,Ot[e])}function so(){Ot=io(ti()),w(Bt)}function oi(){let e=nt(),t=e?ot(e):ot("");return rt()?(!Ae&&t&&(Ae=t),Ae||t):(Ae="",t)}function uo(){ke=!1,N=!1,E=null,Ae=""}function ri(e){Pe=e,uo(),Re=!1,w("wait")}function mo(){if(!He)return;let e=nt()||location.pathname;if(Pe&&e&&Pe!==e){ri(e);return}e&&(Pe=e);let t=oi(),n=rt(),o=At(),r=Pt();if(Nt()&&!n){w("error"),ke=!1,N=!1,E=null;return}if(n){ke=!0,N=!1,E=t,w("rotate");return}if(ke){let i=!!E&&!!t&&E===t;if(ke=!1,i){N=!0,E=t,w("done");return}N=!1,E=null}if(N)if(!!(E&&t&&E!==t))N=!1,E=null;else if(o){w("done");return}else if(Re){N=!1,w("ready");return}else{N=!1,w("wait");return}E=null,w(o?"wait":Re?"ready":"wait")}function fo(){let e=F();if(!(Y&&Dt===e&&e.isConnected)){if(Y?.disconnect(),Dt=e,!e||e===document.body){Y=null;return}Y=new MutationObserver(()=>ut()),Y.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid","class"]})}}function ut(){!He||ue||(ue=requestAnimationFrame(()=>{ue=0,He&&(po(),fo(),mo())}))}function lo(){Re=!0,ut()}function po(){let e=W();!e||ao.has(e)||(ao.add(e),e.addEventListener("input",lo,{passive:!0}),e.addEventListener("compositionend",lo,{passive:!0}))}var go=x({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[k.p],tags:["chat","ui"],enabledByDefault:!0,settings:co,startAt:"DOMContentLoaded",cleanupSelectors:[`#${le}`],start(){He=!0,ce=ni()||ce,so(),ct?.disconnect(),ct=Qn(le,e=>{ae(e)&&(ce=e),It(le,Ot[Bt])}),Me?.abort(),Me=new AbortController,window.addEventListener("popstate",ut,{signal:Me.signal}),po(),fo(),se!==void 0&&clearInterval(se),se=setInterval(ut,ei),mo(),Qr.debug("favicon watch started")},stop(){He=!1,ue&&cancelAnimationFrame(ue),ue=0,se!==void 0&&(clearInterval(se),se=void 0),Me?.abort(),Me=null,Y?.disconnect(),Y=null,Dt=null,ct?.disconnect(),ct=null,uo(),Pe="",Re=!0,Zn(le,ce)},onSettingsChange:so});var bo=`.bloom-ih-hud {
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
`;var ho=new h("InputHistory"),_t=/\u200B/g,yo=10,vo=500,xo=100,ai=8,si=120,li=2e3,dt=10,mt=T({maxEntries:{type:4,description:"Max stored prompts",min:yo,max:vo,default:xo},history:{type:5,description:"Stored prompts",render:Ei},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Ft=new Map,p=0,qt="",P=!1,Ne=!1,jt=0,Ie=null,$t,Kt=null,So=!0;function L(){let e=mt.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Eo(e){let t=an(Number(mt.store.maxEntries??xo),yo,vo);return e.length>t?e.slice(e.length-t):e}function ft(e){mt.store.entries=Eo(e)}function ci(e){return e.replaceAll(_t,"").replace(/\n$/,"").trim()}function zt(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(re);return n instanceof HTMLElement?n:W()}function ui(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!ie(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(_t,"").trim().length===0,last:i.toString().replaceAll(_t,"").trim().length===0}}catch{return{first:!0,last:!0}}}function wo(e,t){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch(i){ho.debug("pm caret failed:",i)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function Lo(e){clearTimeout($t),$t=setTimeout(()=>{if(e!==jt)return;Ne=!1;let t=Kt;t&&wo(t,So)},si)}function Co(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),Ne=!0,Kt=e,So=n;let i=++jt;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(a){ho.debug("insertText failed:",a),e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),wo(e,n),Lo(i)}function di(){let e=Ce(),t=e.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",e.appendChild(t)),t}function de(){document.getElementById("bloom-root")?.shadowRoot?.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function mi(e,t){let n=di();n.textContent=e;let o=(t.closest("form")??F()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-ai)}px`,n.classList.add("bloom-ih-hud-on")}function Gt(e){let t=ci(e);if(!t)return;let n=Date.now(),o=Ft.get(t);if(o&&n-o<li)return;Ft.set(t,n);let r=L().filter(i=>i!==t);r.push(t),ft(r),p=L().length,P=!1,de()}function fi(e,t){let n=L();if(!n.length&&e)return;p>=n.length&&(qt=ie(t),p=n.length);let o=e?p-1:p+1;o<0||o>n.length||(p=o,P=!0,Co(t,o===n.length?qt:n[o],e),o<n.length?mi(`${o+1} / ${n.length}`,t):de())}function pi(e){P=!1,de(),Co(e,qt,!1),p=L().length}function gi(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=zt(e.target)??zt(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&P&&!e.altKey&&!e.shiftKey){pi(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){Gt(ie(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=L();if(!o){let i=ui(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||p<=0)||!n&&p>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),fi(n,t))}function bi(e){if(zt(e.target)){if(Ne){Lo(jt);return}P&&(P=!1,de(),p=L().length)}}function hi(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(re);n instanceof HTMLElement&&Gt(ie(n))}function yi(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(Qe);if(!n||!(n instanceof HTMLElement)||A(n))return;let o=W();o&&Gt(ie(o))}function vi(e){if(!(!P||Ne)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}P=!1,de()}}function xi(){if(Ie)return;Ie=new AbortController;let{signal:e}=Ie,t={capture:!0,signal:e};window.addEventListener("keydown",gi,t),window.addEventListener("input",bi,t),window.addEventListener("submit",hi,t),window.addEventListener("click",yi,t),window.addEventListener("pointerdown",vi,t)}function Si(e){let t=L().slice();t.splice(e,1),ft(t),p>t.length&&(p=t.length)}function Ei(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=L().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(f=>f.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/dt));n>=l&&(n=l-1);let g=s.slice(n*dt,n*dt+dt);e.replaceChildren();let c=document.createElement("input");if(c.className="bloom-ih-search",c.type="search",c.placeholder="Search history",c.autocomplete="off",c.value=t,c.addEventListener("input",()=>{t=c.value,n=0,r()}),e.appendChild(c),g.length){let f=document.createElement("div");f.className="bloom-ih-list",g.forEach((q,pt)=>{let _o=i.indexOf(q),Fo=L().length-1-_o,gt=document.createElement("div");gt.className="bloom-ih-item";let me=document.createElement("button");me.type="button",me.className=`bloom-ih-body${o===pt?"":" bloom-ih-clamp"}`,me.textContent=q,me.addEventListener("click",()=>{o=o===pt?-1:pt,r()});let bt=document.createElement("div");bt.className="bloom-ih-actions";let fe=document.createElement("button");fe.type="button",fe.title="Copy",fe.textContent="C",fe.addEventListener("click",()=>{ln(q)});let pe=document.createElement("button");pe.type="button",pe.title="Delete",pe.textContent="\xD7",pe.addEventListener("click",()=>{Si(Fo),r()}),bt.append(fe,pe),gt.append(me,bt),f.appendChild(gt)}),e.appendChild(f)}else{let f=document.createElement("p");f.className="bloom-ih-empty",f.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(f)}let b=document.createElement("div");b.className="bloom-ih-pager";let d=document.createElement("button");d.type="button",d.className="bloom-ih-btn",d.textContent="Prev",d.disabled=n<=0,d.addEventListener("click",()=>{n-=1,r()});let v=document.createElement("span");v.textContent=`${n+1} / ${l}`;let C=document.createElement("button");C.type="button",C.className="bloom-ih-btn",C.textContent="Next",C.disabled=n+1>=l,C.addEventListener("click",()=>{n+=1,r()});let R=document.createElement("button");R.type="button",R.className="bloom-ih-clear",R.textContent="Clear all",R.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(ft([]),p=0,r())}),b.append(d,v,C,R),e.appendChild(b)};return r(),()=>{e.replaceChildren()}}var To=x({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[k.p],tags:["chat"],enabledByDefault:!0,settings:mt,startAt:"HostReady",managedStyle:"inputHistory",start(){J("inputHistory",bo),Ce(),p=L().length,P=!1,xi()},stop(){Ie?.abort(),Ie=null,de(),Ft.clear(),clearTimeout($t),Ne=!1,Kt=null,P=!1},onSettingsChange(){let e=L(),t=Eo(e);t.length!==e.length&&ft(t),p>t.length&&(p=t.length)}});var Vt="noShareLink",wi=['button[data-testid="share-chat-button"]'],Li=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],Ut=T({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Mo(e){return`${e.join(",")}{display:none!important}`}function ko(){let e=[];if(Ut.store.hideShareChat!==!1&&e.push(Mo(wi)),Ut.store.hideShareProject!==!1&&e.push(Mo(Li)),!e.length){z(Vt);return}J(Vt,e.join(`
`))}var Ao=x({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[k.p],tags:["ui","privacy"],enabledByDefault:!1,startAt:"HostReady",settings:Ut,start:ko,onSettingsChange:ko,stop(){z(Vt)}});var Ho="noDictation",Ci=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]'],Ti=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Io=T({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Po(e){return`${e.join(",")}{display:none!important}`}function Ro(){let e=[Po(Ci)];Io.store.hideDictationSettings!==!1&&e.push(Po(Ti)),J(Ho,e.join(`
`))}var No=x({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[k.p],tags:["chat","ui"],enabledByDefault:!1,startAt:"HostReady",settings:Io,start:Ro,onSettingsChange:Ro,stop(){z(Ho)}});var De=new h("Bloom"),Do=!1,Mi=Date.now(),ki=[Kn,go,To,Ao,No];function Wt(e){return new Promise(t=>setTimeout(t,e))}function Ai(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var Pi=8e3,Oo=300,Ri=250;async function Hi(){if(K())return await Wt(Oo),!0;for(;Date.now()-Mi<Pi;)if(await Wt(Ri),K())return await Wt(Oo),!0;return K()||St()}function Ii(){try{GM_registerMenuCommand?.("Bloom++ settings",jn)}catch{}}function Ni(){Z(()=>{ve("HostShell"),De.info("host shell",j)}),Q(()=>{De.info("idle ready",j)}),Ke(()=>{Zt(),ve("HostReady"),De.info("chrome ready",j)})}async function Yt(){await cn()}async function Jt(){if(Do)return;Do=!0;for(let n of ki)try{fn(n)}catch(o){De.error("register failed",n.name,o)}bn(),ve("Init"),Ii(),Ni();let e=()=>ve("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await Ai(),!await Hi()){De.warn("late islands not detected; shell only",j),ee();return}await wn()}var Bo=typeof unsafeWindow<"u"?unsafeWindow:window;window===window.top&&!Bo.Bloom&&(Object.defineProperty(Bo,"Bloom",{value:Xt,writable:!1,configurable:!0}),Yt().then(()=>Jt()).catch(e=>console.error("[Bloom++] Fatal init error:",e)));})();
