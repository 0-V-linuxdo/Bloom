// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260902] v1.3.6
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

/* Bloom++ [20260902] v1.3.6. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var _o=Object.defineProperty;var Fo=(e,t)=>{for(var n in t)_o(e,n,{get:t[n],enumerable:!0})};var Yt={};Fo(Yt,{REPO_URL:()=>En,Settings:()=>d,VERSION:()=>j,hasLateIslands:()=>K,init:()=>Ut,initSettings:()=>Wt,isDocumentInteractive:()=>wn,plugins:()=>k,requestChromeReady:()=>xn,requestIdleReady:()=>Z,whenChromeReady:()=>je,whenIdleReady:()=>X,whenShellReady:()=>J});var N=new Map,De=!1;function qo(){return document.getElementById("bloom-root")?.shadowRoot??null}function $o(){return document.head??null}function $(){let e=qo();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=zo()}function ft(e,t){if(!De)return;let n=$o();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),$();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,$();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,$()}function U(e,t){let n=N.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},N.set(e,n)),De&&ft(e,n)}function Jt(){De=!0;for(let[e,t]of N)ft(e,t);return $(),!0}function Xt(e){let t=N.get(e);t&&(t.disabled=!1,De&&ft(e,t))}function Zt(e){let t=N.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),$())}function z(e){let t=N.get(e);t&&(t.el?.remove(),N.delete(e),$())}function zo(){return Array.from(N.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}function Qt(){$()}var y=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function x(e){return e}var jo=new Map;function ge(e,t){let n=jo.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var Ko="bloompp";function en(){return new Promise((e,t)=>{let n=indexedDB.open(Ko,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function tn(e){try{let t=await en();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function nn(e,t){try{let n=await en();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function be(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function on(e,t,n){return Math.min(n,Math.max(t,e))}function rn(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function an(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}var Oe=new y("SettingsStore"),D="BloomSettings",Go=100;function _e(e){if(be(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(be(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return be(n)?n:null}return null}catch{return null}}var Be=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[f,c]of this.defaultGetters)if(l.startsWith(f)){let h=l.slice(f.length+1);if(h&&!h.includes(".")){let u=c(h);u!==void 0&&(i[a]=u,s=u);break}}}return be(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Oe.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Go))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(D,this.plain)}catch{try{GM_setValue(D,t)}catch(n){Oe.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(D,t)}catch{}nn(D,t).catch(n=>Oe.warn("Failed to save settings to IndexedDB:",n))}catch(t){Oe.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){rn(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var Vo=new y("Settings"),Wo={plugins:{}},d=new Be(structuredClone(Wo)),Uo=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function Yo(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function T(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(d.store.plugins[n]||(d.store.plugins[n]={}),d.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?d.plain.plugins[n]??{}:{}}};return t}function Jo(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function sn(){let e=null;if(e=_e(Jo(D)),e||(e=_e(await tn(D))),!e)try{e=_e(localStorage.getItem(D))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(d.plain.plugins=t),Vo.debug("Loaded settings")}}function ln(e,t){t&&(t.pluginName=e,d.plain.plugins[e]||(d.plain.plugins[e]={}),d.setDefaultGetter(Uo(e),n=>{if(n!=="enabled")return Yo(t.def,n)}))}var Fe=new y("PluginManager"),k={},ye=new Set;function un(e){if(k[e.name]){Fe.warn("Duplicate plugin",e.name);return}k[e.name]=e,ln(e.name,e.settings)}function qe(e){let t=k[e];if(!t)return!1;if(t.required)return!0;let n=d.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function mn(e){let t=k[e];if(!t||t.required)return;let n=!qe(e);d.plain.plugins[e]||(d.store.plugins[e]={}),d.store.plugins[e].enabled=n,n?fn(t):Xo(t),ge("pluginToggle",{name:e,enabled:n})}function fn(e,t=!1){if(!ye.has(e.name)&&qe(e.name))try{e.managedStyle&&Xt(e.managedStyle),e.start?.(),ye.add(e.name),e.settings&&d.addPrefixChangeListener(`plugins.${e.name}.`,()=>{ye.has(e.name)&&e.onSettingsChange?.()}),t||Fe.debug("Started",e.name)}catch(n){Fe.error("Failed to start",e.name,n)}}function Xo(e){if(ye.has(e.name)){try{e.stop?.()}catch(t){Fe.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(Zt(e.managedStyle),z(e.managedStyle)),ye.delete(e.name)}}function ve(e){for(let t of Object.values(k))(t.startAt??"DOMContentLoaded")===e&&fn(t)}var cn=2,dn="defaultsRev";function pn(){for(let t of Object.values(k))d.plain.plugins[t.name]||(d.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=d.store.plugins.Settings??(d.store.plugins.Settings={});if(e[dn]!==cn){for(let t of["NoShareLink","NoDictation"]){let n=d.store.plugins[t]??(d.store.plugins[t]={});n.enabled=!1}e[dn]=cn}}var xe=!1,$e=!1,pt=!1,bn=[],hn=[],yn=[];function gt(e){let t=e.splice(0);for(let n of t)n()}function ze(){xe||(xe=!0,gt(bn))}function bt(){$e||($e=!0,xe||ze(),gt(hn))}function vn(){pt||(pt=!0,xe||ze(),$e||bt(),gt(yn))}function J(e){xe?e():bn.push(e)}function X(e){$e?e():hn.push(e)}function je(e){pt?e():yn.push(e)}function Z(){ze(),bt()}function xn(){vn()}function gn(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function Sn(){await gn(4e3),ze(),await gn(4e3),bt(),vn()}var M={p:"0-V-linuxdo"},j="[20260902] v1.3.6",En="https://github.com/0-V-linuxdo/Bloom";function Zo(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Qo(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function ht(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function K(){return ht()?Zo()||Qo():!1}function wn(){return K()}var er=["#page-header",'[data-testid="page-header"]',"header"];function ee(e){return!(e instanceof HTMLElement)||!e.isConnected||e.closest("#bloom-root")?!1:e.getClientRects().length>0}function Ln(){for(let e of er){let t=document.querySelector(e);if(ee(t))return t}for(let e of document.querySelectorAll("nav"))if(ee(e)&&!e.closest("aside, [data-testid='sidebar']"))return e;return null}function tr(e){return`${e.getAttribute("aria-label")||""} ${e.textContent||""}`.replace(/\s+/g," ").trim()}function nr(e){let t=e.getAttribute("href")||"";try{if(t){let o=new URL(t,location.origin).pathname;if(/\/download\/?$/.test(o))return!0}}catch{}let n=tr(e);return!!(/download.{0,24}(chatgpt\s*)?(app|desktop)/i.test(n)||/下载.{0,16}(chatgpt|应用|app)/i.test(n)||/get (the )?app/i.test(n))}function or(e,t){for(let n of e.querySelectorAll("a[href], button, [role='button']"))if(ee(n)&&t(n))return n;return null}function rr(){let e=Ln();if(e){let n=or(e,nr);if(n)return n}let t=document.querySelector('a[href="/download"], a[href="/download/"], a[href*="chatgpt.com/download"]');return ee(t)?t:null}function ir(){let e=Ln();if(!e)return null;let t=e.querySelector('[data-testid="profile-button"], [data-testid="accounts-profile-button"], [data-testid="user-menu-button"]');return ee(t)?t:null}var Q=null;function Cn(){Q=null}function ar(){return Q&&ee(Q)||(Q=rr()??ir()),Q}function Tn(e){let n=ar(),o=e,r,i;if(n){let a=n.getBoundingClientRect();o=Math.max(32,Math.min(36,Math.round(a.height)||e)),i=a.top+(a.height-o)/2,r=a.right+8+o<=window.innerWidth-8?a.right+8:a.left-8-o}else r=window.innerWidth-o-16,i=12;return r=Math.max(8,Math.min(window.innerWidth-o-8,r)),i=Math.max(8,Math.min(window.innerHeight-o-8,i)),{x:r,y:i,size:o}}var vt=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary"],sr={light:{"--main-surface-primary":"#ffffff","--main-surface-secondary":"#f4f4f4","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#f9f9f9","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#b4b4b4","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.1)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.2)","--link":"#0d0d0d","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#f4f4f4","--bg-primary":"#ffffff","--bg-secondary":"#f4f4f4"},dark:{"--main-surface-primary":"#212121","--main-surface-secondary":"#2f2f2f","--main-surface-tertiary":"#424242","--sidebar-surface-primary":"#171717","--text-primary":"#ececec","--text-secondary":"#b4b4b4","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ececec","--icon-secondary":"#b4b4b4","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.1)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.2)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.06)","--interactive-label-primary-default":"#ececec","--message-surface":"#2f2f2f","--bg-primary":"#212121","--bg-secondary":"#2f2f2f"}};function lr(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function cr(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function yt(e){let t=lr(e);return t?cr(t)>.55?"light":"dark":null}function dr(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=yt(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=yt(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=yt(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function kn(e){return e==="auto"?dr():e}function ur(e){try{let t=getComputedStyle(document.documentElement);for(let n of vt){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function Mn(e,t,n){let o=sr[t];if(n){ur(e);for(let r of vt)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of vt)e.style.setProperty(r,o[r])}function An(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var Pn=`/* Void++ BaseCard / PluginCard chrome. Tokens from chatgpt.com via :host.
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
  width: 520px;
  max-width: min(560px, calc(100vw - 24px));
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

@media (max-width: 560px) {
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
`;var xt="bloom-root",Dn="10000",fr="10001",pr=520,Rn=560,gr=T({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),b=null,te=null,O=!1,Lt=!1,St=[],Ke=null,Ge=null,Et=null,B=null,m=null,Ee=null,we=null,ne=null,Ve=null,We=null,H=null;function Ct(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Hn(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function br(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>'}function hr(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>'}var yr={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>'};function vr(e){return yr[e]??Ct()}function xr(){return"auto"}function Se(){if(!b)return;let e=xr(),t=kn(e);b.setAttribute("data-bloom-scheme",t),Mn(b,t,e==="auto"),ge("schemeChange",{scheme:t,pref:e})}function Sr(){Qt()}function _(e,t){e&&(e.hidden=t,e.toggleAttribute("inert",t),t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden"),e.style.pointerEvents=t?"none":"auto")}function Er(e){let t=e.composedPath();return!!(m&&t.includes(m)||B&&t.includes(B))}function wr(e){e.style.position="fixed",e.style.width="0px",e.style.height="0px",e.style.inset="auto",e.style.margin="0",e.style.padding="0",e.style.border="0",e.style.overflow="visible",e.style.pointerEvents="none",e.style.zIndex=Dn}function In(e){e.querySelectorAll(".bloom-settings-backdrop, .bloom-plugin-backdrop").forEach(t=>t.remove())}function Le(){b=document.getElementById(xt),b||(b=document.createElement("div"),b.id=xt),wr(b);let e=document.body;if(e&&b.parentNode!==e&&e.appendChild(b),te=b.shadowRoot??b.attachShadow({mode:"open"}),In(b),In(te),!te.querySelector("style[data-bloom]")){let t=document.createElement("style");t.dataset.bloom="1",t.textContent=Pn,te.appendChild(t)}return Se(),Sr(),te}function On(){for(let e of St)e();St=[]}function Bn(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function Lr(e){return!!e.settings&&Object.keys(e.settings.def).length>0}function Cr(e,t,n){if(n.hidden)return null;if(n.type===5&&n.render){let a=document.createElement("details");a.className="bloom-field bloom-field-block";let s=document.createElement("summary");s.textContent=n.description||t;let l=document.createElement("div");return St.push(n.render(l)),a.append(s,l),a}let o=document.createElement("div");o.className="bloom-field";let r=document.createElement("span");r.textContent=n.description||t,o.appendChild(r);let i=d.store.plugins[e]??(d.store.plugins[e]={});if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??n.options.find(s=>s.default)?.value??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=Bn(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),o.appendChild(a),o}return o}function Ue(){Lt=!1,On(),H&&H.replaceChildren(),_(we,!0),_(Ee,!1)}function Tr(e){if(On(),Lt=!0,Ve&&(Ve.textContent=e.name),We&&(We.textContent=e.description),H){if(H.replaceChildren(),e.settings)for(let[t,n]of Object.entries(e.settings.def)){let o=Cr(e.name,t,n);o&&H.appendChild(o)}if(!H.childElementCount){let t=document.createElement("p");t.className="bloom-dialog-empty",t.textContent="No configurable settings.",H.appendChild(t)}}_(Ee,!0),_(we,!1)}function kr(e){let t=document.createElement("section");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=vr(e.name);let a=document.createElement("h3");a.textContent=e.name,r.append(i,a);let s=document.createElement("div");if(s.className="bloom-card-controls",Lr(e)){let v=document.createElement("button");v.type="button",v.className="bloom-icon-btn bloom-card-gear",v.setAttribute("aria-label",`${e.name} settings`),v.innerHTML=hr(),v.addEventListener("click",()=>Tr(e)),s.appendChild(v)}let l=Bn(e.name,qe(e.name),!!e.required);l.querySelector("input")?.addEventListener("change",()=>{mn(e.name)}),s.appendChild(l),o.append(r,s);let c=document.createElement("p");c.className="bloom-card-desc",c.textContent=e.description,n.append(o,c);let h=document.createElement("div");h.className="bloom-card-sep";let u=document.createElement("div");return u.className="bloom-card-footer",u.textContent=e.authors?.join(", ")||"\xA0",t.append(n,h,u),t}function _n(){if(ne){ne.replaceChildren();for(let e of Object.values(k))e.hidden||e.name==="Settings"||ne.appendChild(kr(e))}}function Fn(e){if(m&&Ee&&we&&ne&&m.isConnected)return;m?.remove();let t=document.createElement("div");t.className="bloom-settings-panel",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","false"),t.setAttribute("aria-labelledby","bloom-settings-title"),t.style.zIndex=fr,_(t,!0);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=Ct();let a=document.createElement("h2");a.id="bloom-settings-title",a.textContent="Bloom++",r.append(i,a);let s=document.createElement("button");s.type="button",s.className="bloom-icon-btn",s.setAttribute("aria-label","Close"),s.innerHTML=Hn(),s.addEventListener("click",oe),o.append(r,s),n.appendChild(o);let l=document.createElement("p");l.className="bloom-settings-sub",l.textContent="Plugins",n.appendChild(l);let f=document.createElement("div");f.className="bloom-plugin-grid",n.appendChild(f);let c=document.createElement("div");c.className="bloom-settings-plugin",_(c,!0);let h=document.createElement("div");h.className="bloom-settings-head";let u=document.createElement("button");u.type="button",u.className="bloom-icon-btn",u.setAttribute("aria-label","Back"),u.innerHTML=br(),u.addEventListener("click",Ue);let v=document.createElement("div");v.className="bloom-dialog-titles";let C=document.createElement("h2");C.textContent="";let R=document.createElement("p");R.className="bloom-settings-sub",v.append(C,R);let p=document.createElement("button");p.type="button",p.className="bloom-icon-btn",p.setAttribute("aria-label","Close"),p.innerHTML=Hn(),p.addEventListener("click",oe),h.append(u,v,p);let q=document.createElement("div");q.className="bloom-plugin-settings",c.append(h,q),t.append(n,c),e.append(t),m=t,Ee=n,we=c,ne=f,Ve=C,We=R,H=q,_n()}function wt(){if(!m||!B)return;let e=B.getBoundingClientRect(),t=window.innerWidth,n=window.innerHeight,o=Math.min(Rn,Math.max(320,Math.min(pr,t-24))),r=Math.min(Math.round(n*.7),560);m.style.width=`${Math.round(o)}px`,m.style.maxWidth=`${Rn}px`,m.style.maxHeight=`${Math.round(r)}px`,m.style.right="auto",m.style.inset="";let i=12,a=8,s;e.left<t/2?(s=e.right+a,s+o>t-i&&(s=Math.max(i,t-i-o))):(s=e.right-o,s<i&&(s=i));let l=n-e.bottom-a,f=e.top-a;l>=240||l>=f?(m.style.top=`${Math.round(e.bottom+a)}px`,m.style.bottom="auto"):(m.style.top="auto",m.style.bottom=`${Math.round(n-e.top+a)}px`),m.style.left=`${Math.round(s)}px`}function oe(){O=!1,_(m,!0),B?.setAttribute("aria-expanded","false"),Ue(),Tt()}function qn(){let e=Le();Fn(e),Se(),_n(),Ue(),O=!0,B?.setAttribute("aria-expanded","true"),wt(),_(m,!1),Rr(),ge("settingsOpen",void 0)}function Mr(){O?oe():qn()}function Nn(e){let t=Tn(36);e.style.width=`${t.size}px`,e.style.height=`${t.size}px`,e.style.left=`${Math.round(t.x)}px`,e.style.top=`${Math.round(t.y)}px`,e.style.right="auto",e.style.bottom="auto",e.style.zIndex=Dn}function Ar(e){O&&(Er(e)||oe())}function Pr(e){if(e.key==="Escape"&&O){if(Lt){Ue();return}oe()}}function Tt(){Et?.abort(),Et=null}function Rr(){if(Tt(),!O)return;let e=new AbortController;Et=e,window.addEventListener("pointerdown",Ar,{capture:!0,signal:e.signal}),window.addEventListener("keydown",Pr,{capture:!0,signal:e.signal})}function Hr(){let e=Le();e.querySelector(".bloom-settings-fab")?.remove(),Ge?.abort();let t=document.createElement("button");t.type="button",t.className="bloom-settings-fab",t.setAttribute("aria-label","Bloom++ settings"),t.setAttribute("aria-expanded","false"),t.setAttribute("aria-haspopup","dialog"),t.innerHTML=Ct(),t.addEventListener("click",Mr),e.appendChild(t),B=t,Fn(e);let n=new AbortController;Ge=n;let o=()=>{Cn(),Nn(t),O&&wt()};window.addEventListener("resize",o,{signal:n.signal}),X(()=>{Nn(t),O&&wt()})}function $n(){Z(),J(()=>qn())}var zn=x({name:"Settings",description:"Bloom++ settings, docked next to Download the ChatGPT app.",authors:[M.p],required:!0,hidden:!0,enabledByDefault:!0,settings:gr,startAt:"HostShell",cleanupSelectors:[`#${xt}`],start(){Hr(),Se(),Ke?.(),Ke=An(Se)},stop(){Ge?.abort(),Ge=null,Tt(),Ke?.(),Ke=null,oe(),b?.remove(),b=null,te=null,B=null,m=null,Ee=null,we=null,ne=null,Ve=null,We=null,H=null},onSettingsChange:Se});var Gn='form[data-type="unified-composer"], form.w-full[data-type]',re=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Ye=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),jn=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Kn=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Ir=/stop streaming|stop generating|停止生成|停止输出|停止响应/;function S(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function G(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!S(r)))return r;return null}function Vn(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function A(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=Vn(e);return!!(Ir.test(n)||/^stop$/i.test(n))}function F(){let t=Array.from(document.querySelectorAll(Gn)).find(S);if(t instanceof HTMLElement)return t;let n=G(document,re),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function V(){let e=Array.from(document.querySelectorAll(re));return e.find(S)??e[0]??null}function kt(){let e=V();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function Nr(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function Wn(e){let t=F();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!S(n))&&e(n))return n;return null}function Je(){let e=F(),t=G(e,Ye)??G(document,Ye);return t&&!A(t)?t:Wn(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!A(n);let r=Vn(n);return/^(send|send prompt|发送)$/i.test(r)&&!A(n)})}function Mt(){let e=Je();return!!e&&Nr(e)}function At(){let e=F(),t=G(e,jn,!0)??G(document,jn,!0);if(t)return t;let n=G(e,Kn)??G(document,Kn);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&S(o)&&A(o))return o}return Wn(A)}function ie(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}var Pt=0;function Un(e){Pt+=1;try{e()}finally{Pt-=1}}function Xe(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function ae(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function Yn(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function Dr(e){let{head:t}=document;if(t)for(let n of Array.from(t.querySelectorAll("link")))n.id!==e&&Xe(n)&&n.remove()}function Or(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Rt(e,t){let{head:n}=document;!n||!t||Un(()=>{Dr(e);let o=Yn(e),{type:r,sizes:i}=Or(t);o?n.lastElementChild!==o&&n.appendChild(o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function Jn(e,t){let{head:n}=document;n&&Un(()=>{Yn(e)?.remove();let o=Array.from(n.querySelectorAll("link")).filter(Xe);if(o.length){ae(t)&&o[0].href!==t&&(o[0].href=t);return}if(!ae(t))return;let r=document.createElement("link");r.rel="icon",r.href=t,n.appendChild(r)})}function Xn(e,t){let{head:n}=document;if(!n)return null;let o=new MutationObserver(r=>{if(!Pt)for(let i of r){if(i.type==="attributes"&&Xe(i.target)){t(i.target.id===e?void 0:i.target.href);return}for(let a of i.addedNodes)if(Xe(a)&&a.id!==e){t(a.href);return}}});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}function Ze(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=f=>{let c=n.indexOf(f);return c>=0&&n[c+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(f,c)=>{try{return document.querySelector(f)?.getAttribute(c)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function Qe(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function Br(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!S(t))&&(A(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function _r(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&S(e))}function Fr(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&S(e))}function qr(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Ht(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function et(){if(At()||Br())return!0;let e=Je();return e&&S(e)&&!A(e)?!1:!!(_r()||Fr()||qr())}var $r=["original","badge","dot","hole","bg"],eo=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge",default:!0},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],to={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},tt="#FCFCFC",zr="#111111",Zn="#111111",jr="#ffffff",Kr="#212121",Gr="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Vr={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},nt=32,Qn=64;function no(e){return typeof e=="string"&&$r.includes(e)}function Wr(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function ot(e){let t=document.createElement("canvas");t.width=nt,t.height=nt;let n=t.getContext("2d");return n?(n.scale(nt/Qn,nt/Qn),e(n),t.toDataURL("image/png")):""}function Ur(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function rt(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(Gr);n&&(e.strokeStyle=zr,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function Yr(e,t,n){let o=to[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=Zn,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=Zn,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=jr,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function Ce(e,t){if(e==="original")return t==="wait"?ot(o=>rt(o,tt)):Wr(Vr[t]);let n=t==="wait"?void 0:to[t];return ot(e==="hole"?o=>rt(o,n??tt):e==="bg"?o=>{o.fillStyle=n??Kr,Ur(o,0,0,64,64,14),o.fill(),rt(o,tt,!1)}:o=>{rt(o,tt),t!=="wait"&&Yr(o,t,e==="dot"?"dot":"badge")})}function oo(e){return{wait:Ce(e,"wait"),rotate:Ce(e,"rotate"),done:Ce(e,"done"),ready:Ce(e,"ready"),error:Ce(e,"error")}}var Jr=new y("ChatStateFavicons"),le="bloom-chat-state-favicon",so=T({style:{type:3,description:"Favicon overlay",options:eo}}),ce="",Nt={wait:"",rotate:"",done:"",ready:"",error:""},Dt="wait",ke=!1,I=!1,E=null,Me="",Ae="",Pe=!0,Te=null,de=0,se,it=null,W=null,It=null,Re=!1,ro=new WeakSet,Xr=400;function Zr(){let e=so.store.style;return no(e)?e:"badge"}function Qr(){let t=document.querySelector(`link[rel~="icon"]:not(#${le})`)?.href;return ae(t)?t:ae(ce)?ce:""}function w(e){Dt=e,Rt(le,Nt[e])}function io(){Nt=oo(Zr()),w(Dt)}function ei(){let e=Ze(),t=e?Qe(e):Qe("");return et()?(!Me&&t&&(Me=t),Me||t):(Me="",t)}function lo(){ke=!1,I=!1,E=null,Me=""}function ti(e){Ae=e,lo(),Pe=!1,w("wait")}function co(){if(!Re)return;let e=Ze()||location.pathname;if(Ae&&e&&Ae!==e){ti(e);return}e&&(Ae=e);let t=ei(),n=et(),o=kt(),r=Mt();if(Ht()&&!n){w("error"),ke=!1,I=!1,E=null;return}if(n){ke=!0,I=!1,E=t,w("rotate");return}if(ke){let i=!!E&&!!t&&E===t;if(ke=!1,i){I=!0,E=t,w("done");return}I=!1,E=null}if(I)if(!!(E&&t&&E!==t))I=!1,E=null;else if(o){w("done");return}else if(Pe){I=!1,w("ready");return}else{I=!1,w("wait");return}E=null,w(o?"wait":Pe?"ready":"wait")}function uo(){let e=F();if(!(W&&It===e&&e.isConnected)){if(W?.disconnect(),It=e,!e||e===document.body){W=null;return}W=new MutationObserver(()=>at()),W.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid","class"]})}}function at(){!Re||de||(de=requestAnimationFrame(()=>{de=0,Re&&(mo(),uo(),co())}))}function ao(){Pe=!0,at()}function mo(){let e=V();!e||ro.has(e)||(ro.add(e),e.addEventListener("input",ao,{passive:!0}),e.addEventListener("compositionend",ao,{passive:!0}))}var fo=x({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[M.p],tags:["chat","ui"],enabledByDefault:!0,settings:so,startAt:"DOMContentLoaded",cleanupSelectors:[`#${le}`],start(){Re=!0,ce=Qr()||ce,io(),it?.disconnect(),it=Xn(le,e=>{ae(e)&&(ce=e),Rt(le,Nt[Dt])}),Te?.abort(),Te=new AbortController,window.addEventListener("popstate",at,{signal:Te.signal}),mo(),uo(),se!==void 0&&clearInterval(se),se=setInterval(at,Xr),co(),Jr.debug("favicon watch started")},stop(){Re=!1,de&&cancelAnimationFrame(de),de=0,se!==void 0&&(clearInterval(se),se=void 0),Te?.abort(),Te=null,W?.disconnect(),W=null,It=null,it?.disconnect(),it=null,lo(),Ae="",Pe=!0,Jn(le,ce)},onSettingsChange:io});var po=`.bloom-ih-hud {
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
`;var go=new y("InputHistory"),Ot=/\u200B/g,bo=10,ho=500,yo=100,oi=8,ri=120,ii=2e3,st=10,lt=T({maxEntries:{type:4,description:"Max stored prompts",min:bo,max:ho,default:yo},history:{type:5,description:"Stored prompts",render:vi},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Bt=new Map,g=0,_t="",P=!1,Ie=!1,$t=0,He=null,Ft,zt=null,vo=!0;function L(){let e=lt.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function xo(e){let t=on(Number(lt.store.maxEntries??yo),bo,ho);return e.length>t?e.slice(e.length-t):e}function ct(e){lt.store.entries=xo(e)}function ai(e){return e.replaceAll(Ot,"").replace(/\n$/,"").trim()}function qt(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(re);return n instanceof HTMLElement?n:V()}function si(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!ie(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(Ot,"").trim().length===0,last:i.toString().replaceAll(Ot,"").trim().length===0}}catch{return{first:!0,last:!0}}}function So(e,t){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch(i){go.debug("pm caret failed:",i)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function Eo(e){clearTimeout(Ft),Ft=setTimeout(()=>{if(e!==$t)return;Ie=!1;let t=zt;t&&So(t,vo)},ri)}function wo(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),Ie=!0,zt=e,vo=n;let i=++$t;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(a){go.debug("insertText failed:",a),e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),So(e,n),Eo(i)}function li(){let e=Le(),t=e.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",e.appendChild(t)),t}function ue(){document.getElementById("bloom-root")?.shadowRoot?.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function ci(e,t){let n=li();n.textContent=e;let o=(t.closest("form")??F()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-oi)}px`,n.classList.add("bloom-ih-hud-on")}function jt(e){let t=ai(e);if(!t)return;let n=Date.now(),o=Bt.get(t);if(o&&n-o<ii)return;Bt.set(t,n);let r=L().filter(i=>i!==t);r.push(t),ct(r),g=L().length,P=!1,ue()}function di(e,t){let n=L();if(!n.length&&e)return;g>=n.length&&(_t=ie(t),g=n.length);let o=e?g-1:g+1;o<0||o>n.length||(g=o,P=!0,wo(t,o===n.length?_t:n[o],e),o<n.length?ci(`${o+1} / ${n.length}`,t):ue())}function ui(e){P=!1,ue(),wo(e,_t,!1),g=L().length}function mi(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=qt(e.target)??qt(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&P&&!e.altKey&&!e.shiftKey){ui(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){jt(ie(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=L();if(!o){let i=si(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||g<=0)||!n&&g>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),di(n,t))}function fi(e){if(qt(e.target)){if(Ie){Eo($t);return}P&&(P=!1,ue(),g=L().length)}}function pi(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(re);n instanceof HTMLElement&&jt(ie(n))}function gi(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(Ye);if(!n||!(n instanceof HTMLElement)||A(n))return;let o=V();o&&jt(ie(o))}function bi(e){if(!(!P||Ie)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}P=!1,ue()}}function hi(){if(He)return;He=new AbortController;let{signal:e}=He,t={capture:!0,signal:e};window.addEventListener("keydown",mi,t),window.addEventListener("input",fi,t),window.addEventListener("submit",pi,t),window.addEventListener("click",gi,t),window.addEventListener("pointerdown",bi,t)}function yi(e){let t=L().slice();t.splice(e,1),ct(t),g>t.length&&(g=t.length)}function vi(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=L().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(p=>p.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/st));n>=l&&(n=l-1);let f=s.slice(n*st,n*st+st);e.replaceChildren();let c=document.createElement("input");if(c.className="bloom-ih-search",c.type="search",c.placeholder="Search history",c.autocomplete="off",c.value=t,c.addEventListener("input",()=>{t=c.value,n=0,r()}),e.appendChild(c),f.length){let p=document.createElement("div");p.className="bloom-ih-list",f.forEach((q,dt)=>{let Oo=i.indexOf(q),Bo=L().length-1-Oo,ut=document.createElement("div");ut.className="bloom-ih-item";let me=document.createElement("button");me.type="button",me.className=`bloom-ih-body${o===dt?"":" bloom-ih-clamp"}`,me.textContent=q,me.addEventListener("click",()=>{o=o===dt?-1:dt,r()});let mt=document.createElement("div");mt.className="bloom-ih-actions";let fe=document.createElement("button");fe.type="button",fe.title="Copy",fe.textContent="C",fe.addEventListener("click",()=>{an(q)});let pe=document.createElement("button");pe.type="button",pe.title="Delete",pe.textContent="\xD7",pe.addEventListener("click",()=>{yi(Bo),r()}),mt.append(fe,pe),ut.append(me,mt),p.appendChild(ut)}),e.appendChild(p)}else{let p=document.createElement("p");p.className="bloom-ih-empty",p.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(p)}let h=document.createElement("div");h.className="bloom-ih-pager";let u=document.createElement("button");u.type="button",u.className="bloom-ih-btn",u.textContent="Prev",u.disabled=n<=0,u.addEventListener("click",()=>{n-=1,r()});let v=document.createElement("span");v.textContent=`${n+1} / ${l}`;let C=document.createElement("button");C.type="button",C.className="bloom-ih-btn",C.textContent="Next",C.disabled=n+1>=l,C.addEventListener("click",()=>{n+=1,r()});let R=document.createElement("button");R.type="button",R.className="bloom-ih-clear",R.textContent="Clear all",R.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(ct([]),g=0,r())}),h.append(u,v,C,R),e.appendChild(h)};return r(),()=>{e.replaceChildren()}}var Lo=x({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[M.p],tags:["chat"],enabledByDefault:!0,settings:lt,startAt:"HostReady",managedStyle:"inputHistory",start(){U("inputHistory",po),Le(),g=L().length,P=!1,hi()},stop(){He?.abort(),He=null,ue(),Bt.clear(),clearTimeout(Ft),Ie=!1,zt=null,P=!1},onSettingsChange(){let e=L(),t=xo(e);t.length!==e.length&&ct(t),g>t.length&&(g=t.length)}});var Kt="noShareLink",xi=['button[data-testid="share-chat-button"]'],Si=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],Gt=T({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function Co(e){return`${e.join(",")}{display:none!important}`}function To(){let e=[];if(Gt.store.hideShareChat!==!1&&e.push(Co(xi)),Gt.store.hideShareProject!==!1&&e.push(Co(Si)),!e.length){z(Kt);return}U(Kt,e.join(`
`))}var ko=x({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[M.p],tags:["ui","privacy"],enabledByDefault:!1,startAt:"HostReady",settings:Gt,start:To,onSettingsChange:To,stop(){z(Kt)}});var Po="noDictation",Ei=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]'],wi=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Ro=T({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function Mo(e){return`${e.join(",")}{display:none!important}`}function Ao(){let e=[Mo(Ei)];Ro.store.hideDictationSettings!==!1&&e.push(Mo(wi)),U(Po,e.join(`
`))}var Ho=x({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[M.p],tags:["chat","ui"],enabledByDefault:!1,startAt:"HostReady",settings:Ro,start:Ao,onSettingsChange:Ao,stop(){z(Po)}});var Ne=new y("Bloom"),Io=!1,Li=Date.now(),Ci=[zn,fo,Lo,ko,Ho];function Vt(e){return new Promise(t=>setTimeout(t,e))}function Ti(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var ki=8e3,No=300,Mi=250;async function Ai(){if(K())return await Vt(No),!0;for(;Date.now()-Li<ki;)if(await Vt(Mi),K())return await Vt(No),!0;return K()||ht()}function Pi(){try{GM_registerMenuCommand?.("Bloom++ settings",$n)}catch{}}function Ri(){J(()=>{ve("HostShell"),Ne.info("host shell",j)}),X(()=>{Ne.info("idle ready",j)}),je(()=>{Jt(),ve("HostReady"),Ne.info("chrome ready",j)})}async function Wt(){await sn()}async function Ut(){if(Io)return;Io=!0;for(let n of Ci)try{un(n)}catch(o){Ne.error("register failed",n.name,o)}pn(),ve("Init"),Pi(),Ri();let e=()=>ve("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await Ti(),!await Ai()){Ne.warn("late islands not detected; shell only",j),Z();return}await Sn()}var Do=typeof unsafeWindow<"u"?unsafeWindow:window;window===window.top&&!Do.Bloom&&(Object.defineProperty(Do,"Bloom",{value:Yt,writable:!1,configurable:!0}),Wt().then(()=>Ut()).catch(e=>console.error("[Bloom++] Fatal init error:",e)));})();
