// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260902] v1.3.8
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

/* Bloom++ [20260902] v1.3.8. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Mo=Object.defineProperty;var Po=(e,t)=>{for(var n in t)Mo(e,n,{get:t[n],enumerable:!0})};var Vt={};Po(Vt,{REPO_URL:()=>vn,Settings:()=>c,VERSION:()=>j,hasLateIslands:()=>K,init:()=>Gt,initSettings:()=>$t,isDocumentInteractive:()=>xn,plugins:()=>C,requestChromeReady:()=>hn,requestIdleReady:()=>J,whenChromeReady:()=>je,whenIdleReady:()=>qe,whenShellReady:()=>Y});var H=new Map,Ie=!1;function Ao(){return document.getElementById("bloom-root")?.shadowRoot??null}function Ro(){return document.head??null}function F(){let e=Ao();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=Io()}function dt(e,t){if(!Ie)return;let n=Ro();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),F();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,F();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,F()}function U(e,t){let n=H.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},H.set(e,n)),Ie&&dt(e,n)}function Ut(){Ie=!0;for(let[e,t]of H)dt(e,t);return F(),!0}function Wt(e){let t=H.get(e);t&&(t.disabled=!1,Ie&&dt(e,t))}function Yt(e){let t=H.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),F())}function q(e){let t=H.get(e);t&&(t.el?.remove(),H.delete(e),F())}function Io(){return Array.from(H.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}function Jt(){F()}var g=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function y(e){return e}var Ho=new Map;function me(e,t){let n=Ho.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var No="bloompp";function Xt(){return new Promise((e,t)=>{let n=indexedDB.open(No,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function Zt(e){try{let t=await Xt();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function Qt(e,t){try{let n=await Xt();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function fe(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function en(e,t,n){return Math.min(n,Math.max(t,e))}function tn(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function nn(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}var He=new g("SettingsStore"),N="BloomSettings",Oo=100;function Oe(e){if(fe(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(fe(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return fe(n)?n:null}return null}catch{return null}}var Ne=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[b,u]of this.defaultGetters)if(l.startsWith(b)){let h=l.slice(b.length+1);if(h&&!h.includes(".")){let d=u(h);d!==void 0&&(i[a]=d,s=d);break}}}return fe(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){He.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Oo))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(N,this.plain)}catch{try{GM_setValue(N,t)}catch(n){He.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(N,t)}catch{}Qt(N,t).catch(n=>He.warn("Failed to save settings to IndexedDB:",n))}catch(t){He.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){tn(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var Do=new g("Settings"),Bo={plugins:{}},c=new Ne(structuredClone(Bo)),_o=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function Fo(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function L(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(c.store.plugins[n]||(c.store.plugins[n]={}),c.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?c.plain.plugins[n]??{}:{}}};return t}function qo(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function on(){let e=null;if(e=Oe(qo(N)),e||(e=Oe(await Zt(N))),!e)try{e=Oe(localStorage.getItem(N))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(c.plain.plugins=t),Do.debug("Loaded settings")}}function rn(e,t){t&&(t.pluginName=e,c.plain.plugins[e]||(c.plain.plugins[e]={}),c.setDefaultGetter(_o(e),n=>{if(n!=="enabled")return Fo(t.def,n)}))}var De=new g("PluginManager"),C={},ge=new Set;function ln(e){if(C[e.name]){De.warn("Duplicate plugin",e.name);return}C[e.name]=e,rn(e.name,e.settings)}function Be(e){let t=C[e];if(!t)return!1;if(t.required)return!0;let n=c.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function cn(e){let t=C[e];if(!t||t.required)return;let n=!Be(e);c.plain.plugins[e]||(c.store.plugins[e]={}),c.store.plugins[e].enabled=n,n?un(t):jo(t),me("pluginToggle",{name:e,enabled:n})}function un(e,t=!1){if(!ge.has(e.name)&&Be(e.name))try{e.managedStyle&&Wt(e.managedStyle),e.start?.(),ge.add(e.name),e.settings&&c.addPrefixChangeListener(`plugins.${e.name}.`,()=>{ge.has(e.name)&&e.onSettingsChange?.()}),t||De.debug("Started",e.name)}catch(n){De.error("Failed to start",e.name,n)}}function jo(e){if(ge.has(e.name)){try{e.stop?.()}catch(t){De.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(Yt(e.managedStyle),q(e.managedStyle)),ge.delete(e.name)}}function be(e){for(let t of Object.values(C))(t.startAt??"DOMContentLoaded")===e&&un(t)}var an=2,sn="defaultsRev";function dn(){for(let t of Object.values(C))c.plain.plugins[t.name]||(c.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=c.store.plugins.Settings??(c.store.plugins.Settings={});if(e[sn]!==an){for(let t of["NoShareLink","NoDictation"]){let n=c.store.plugins[t]??(c.store.plugins[t]={});n.enabled=!1}e[sn]=an}}var he=!1,_e=!1,mt=!1,fn=[],pn=[],gn=[];function ft(e){let t=e.splice(0);for(let n of t)n()}function Fe(){he||(he=!0,ft(fn))}function pt(){_e||(_e=!0,he||Fe(),ft(pn))}function bn(){mt||(mt=!0,he||Fe(),_e||pt(),ft(gn))}function Y(e){he?e():fn.push(e)}function qe(e){_e?e():pn.push(e)}function je(e){mt?e():gn.push(e)}function J(){Fe(),pt()}function hn(){bn()}function mn(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function yn(){await mn(4e3),Fe(),await mn(4e3),pt(),bn()}var T={p:"0-V-linuxdo"},j="[20260902] v1.3.8",vn="https://github.com/0-V-linuxdo/Bloom";function Ko(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function zo(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function gt(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function K(){return gt()?Ko()||zo():!1}function xn(){return K()}var ht=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary"],$o={light:{"--main-surface-primary":"#ffffff","--main-surface-secondary":"#f4f4f4","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#f9f9f9","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#b4b4b4","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.1)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.2)","--link":"#0d0d0d","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#f4f4f4","--bg-primary":"#ffffff","--bg-secondary":"#f4f4f4"},dark:{"--main-surface-primary":"#212121","--main-surface-secondary":"#2f2f2f","--main-surface-tertiary":"#424242","--sidebar-surface-primary":"#171717","--text-primary":"#ececec","--text-secondary":"#b4b4b4","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ececec","--icon-secondary":"#b4b4b4","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.1)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.2)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.06)","--interactive-label-primary-default":"#ececec","--message-surface":"#2f2f2f","--bg-primary":"#212121","--bg-secondary":"#2f2f2f"}};function Go(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Vo(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function bt(e){let t=Go(e);return t?Vo(t)>.55?"light":"dark":null}function Uo(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=bt(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=bt(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=bt(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Sn(e){return e==="auto"?Uo():e}function Wo(e){try{let t=getComputedStyle(document.documentElement);for(let n of ht){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function En(e,t,n){let o=$o[t];if(n){Wo(e);for(let r of ht)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of ht)e.style.setProperty(r,o[r])}function wn(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var Ln=`/* Pass-through viewport overlay. FAB at the header. Panel is a popover
   in the top layer \u2014 never an absolute child overflowing a 36\xD736 box. */

:host {
  position: fixed;
  inset: 0;
  width: auto;
  height: auto;
  overflow: hidden;
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
}

.bloom-settings-fab {
  position: absolute;
  top: 10px;
  right: 12px;
  z-index: 1;
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
  anchor-name: --bloom-fab;
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
  /* Reset UA popover: inset:0; margin:auto; border:solid */
  position: fixed;
  inset: unset;
  margin: 0;
  top: 52px;
  right: 16px;
  bottom: auto;
  left: auto;
  z-index: 2;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 280px;
  max-width: calc(100vw - 24px);
  max-height: min(70vh, 360px);
  padding: 12px;
  border: 0;
  border-radius: 12px;
  background: var(--bloom-bg);
  color: var(--bloom-fg);
  box-shadow: var(--bloom-shadow);
  pointer-events: auto;
}

@supports (anchor-name: --bloom-fab) {
  .bloom-settings-panel {
    position-anchor: --bloom-fab;
    top: anchor(bottom);
    right: anchor(right);
    margin-top: 8px;
  }
}

.bloom-settings-panel::backdrop {
  pointer-events: none;
  background: transparent;
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
  gap: 8px;
  margin: 0 0 8px;
}

.bloom-settings-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.bloom-settings-mark {
  width: 18px;
  height: 18px;
  color: var(--bloom-icon);
  display: grid;
  place-items: center;
  flex: 0 0 auto;
}

.bloom-settings-mark svg {
  width: 18px;
  height: 18px;
}

.bloom-settings-head h2 {
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 650;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.bloom-settings-sub {
  margin: 0 0 8px;
  font-size: 0.75rem;
  color: var(--bloom-muted);
}

.bloom-icon-btn {
  width: 28px;
  height: 28px;
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

.bloom-plugin-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: auto;
  min-height: 0;
  flex: 1;
}

.bloom-plugin-row {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 0 4px 0 6px;
  border-radius: 8px;
  min-width: 0;
}

.bloom-plugin-row:hover {
  background: var(--bloom-hover);
}

.bloom-plugin-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 1.125rem;
  height: 1.125rem;
  color: var(--bloom-fg);
  line-height: 0;
}

.bloom-plugin-icon svg {
  width: 1.125rem;
  height: 1.125rem;
}

.bloom-plugin-label {
  margin: 0;
  flex: 1;
  min-width: 0;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bloom-plugin-row .bloom-icon-btn {
  width: 28px;
  height: 28px;
  color: var(--bloom-faint);
}

.bloom-dialog-titles {
  min-width: 0;
  flex: 1;
}

.bloom-dialog-titles h2,
.bloom-dialog-titles h3 {
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 600;
}

.bloom-dialog-titles p {
  margin: 2px 0 0;
  font-size: 0.75rem;
  color: var(--bloom-muted);
  line-height: 1.35;
}

.bloom-dialog-empty {
  margin: 0;
  color: var(--bloom-muted);
  font-size: 0.8125rem;
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
  width: 36px;
  height: 20px;
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
  width: 36px;
  height: 20px;
  border-radius: 999px;
  background: var(--bloom-tertiary);
  transition: background-color 150ms var(--bloom-ease);
}

.bloom-switch span::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
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
  gap: 12px;
  margin: 0;
  padding: 8px 0;
  border-bottom: 1px solid var(--bloom-border);
}

.bloom-field:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.bloom-field > span:first-child,
.bloom-field > summary {
  font-size: 0.8125rem;
  color: var(--bloom-fg);
  line-height: 1.35;
  min-width: 0;
  flex: 1;
}

.bloom-field-block {
  display: block;
  padding-top: 10px;
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

.bloom-field select,
.bloom-field input[type="range"] {
  pointer-events: auto;
}

.bloom-field select {
  height: 28px;
  min-width: 120px;
  max-width: 52%;
  border-radius: 6px;
  border: 1px solid var(--bloom-border-strong);
  background: var(--bloom-surface);
  color: inherit;
  padding: 0 8px;
  font: inherit;
  font-size: 0.75rem;
}

.bloom-field select:hover {
  border-color: var(--bloom-fg);
}

.bloom-field select:focus {
  outline: 2px solid var(--bloom-fg);
  outline-offset: 1px;
}

.bloom-field input[type="range"] {
  width: 120px;
  accent-color: var(--bloom-accent, #10a37f);
  height: 20px;
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
  .bloom-settings-panel,
  .bloom-switch span,
  .bloom-switch span::after {
    transition: none;
  }
}
`;var yt="bloom-root",Jo="10000",Xo=L({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),p=null,X=null,ee=!1,St=!1,vt=[],Ke=null,xt=null,Q=null,R=null,ye=null,ve=null,Z=null,$e=null,Ge=null,A=null;function Et(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Cn(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Zo(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>'}function Qo(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>'}var er={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>'};function tr(e){return er[e]??Et()}function nr(){return"auto"}function ze(){if(!p)return;let e=nr(),t=Sn(e);p.setAttribute("data-bloom-scheme",t),En(p,t,e==="auto"),me("schemeChange",{scheme:t,pref:e})}function or(){Jt()}function O(e,t){e&&(e.hidden=t,e.toggleAttribute("inert",t),t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden"),e.style.pointerEvents=t?"none":"auto")}function rr(e){e.style.position="fixed",e.style.inset="0",e.style.width="auto",e.style.height="auto",e.style.margin="0",e.style.padding="0",e.style.border="0",e.style.overflow="hidden",e.style.pointerEvents="none",e.style.zIndex=Jo}function wt(e){if(!e)return null;let t=e;return typeof t.showPopover=="function"?t:null}function ir(e){let t=wt(e);if(t){e.removeAttribute("hidden"),e.removeAttribute("inert"),e.removeAttribute("aria-hidden"),e.style.pointerEvents="auto";try{t.showPopover()}catch{}return}O(e,!1)}function ar(e){if(!e)return;let t=wt(e);if(t)try{e.matches(":popover-open")&&t.hidePopover()}catch{}O(e,!0)}function Tn(e){e.querySelectorAll(".bloom-settings-backdrop, .bloom-plugin-backdrop").forEach(t=>t.remove())}function Ve(){p=document.getElementById(yt),p||(p=document.createElement("div"),p.id=yt),rr(p);let e=document.body;if(e&&p.parentNode!==e&&e.appendChild(p),X=p.shadowRoot??p.attachShadow({mode:"open"}),Tn(p),Tn(X),!X.querySelector("style[data-bloom]")){let t=document.createElement("style");t.dataset.bloom="1",t.textContent=Ln,X.appendChild(t)}return ze(),or(),X}function kn(){for(let e of vt)e();vt=[]}function Mn(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function sr(e){return!!e.settings&&Object.keys(e.settings.def).length>0}function lr(e,t,n){if(n.hidden)return null;if(n.type===5&&n.render){let a=document.createElement("details");a.className="bloom-field bloom-field-block";let s=document.createElement("summary");s.textContent=n.description||t;let l=document.createElement("div");return vt.push(n.render(l)),a.append(s,l),a}let o=document.createElement("div");o.className="bloom-field";let r=document.createElement("span");r.textContent=n.description||t,o.appendChild(r);let i=c.store.plugins[e]??(c.store.plugins[e]={});if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??n.options.find(s=>s.default)?.value??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=Mn(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),o.appendChild(a),o}return o}function xe(){St=!1,kn(),A&&A.replaceChildren(),O(ve,!0),O(ye,!1)}function cr(e){if(kn(),St=!0,$e&&($e.textContent=e.name),Ge&&(Ge.textContent=e.description),A){if(A.replaceChildren(),e.settings)for(let[t,n]of Object.entries(e.settings.def)){let o=lr(e.name,t,n);o&&A.appendChild(o)}if(!A.childElementCount){let t=document.createElement("p");t.className="bloom-dialog-empty",t.textContent="No configurable settings.",A.appendChild(t)}}O(ye,!0),O(ve,!1)}function ur(e){let t=document.createElement("div");t.className="bloom-plugin-row",t.setAttribute("role","menuitem");let n=document.createElement("span");n.className="bloom-plugin-icon",n.innerHTML=tr(e.name);let o=document.createElement("span");if(o.className="bloom-plugin-label",o.textContent=e.name,t.append(n,o),sr(e)){let a=document.createElement("button");a.type="button",a.className="bloom-icon-btn",a.setAttribute("aria-label",`${e.name} settings`),a.innerHTML=Qo(),a.addEventListener("click",()=>cr(e)),t.appendChild(a)}let r=Mn(e.name,Be(e.name),!!e.required);return r.querySelector("input")?.addEventListener("change",()=>{cn(e.name)}),t.appendChild(r),t}function dr(){if(Z){Z.replaceChildren();for(let e of Object.values(C))e.hidden||e.name==="Settings"||Z.appendChild(ur(e))}}function mr(e){if(R&&ye&&ve&&Z&&R.isConnected)return;R?.remove();let t=document.createElement("div");t.className="bloom-settings-panel",t.setAttribute("role","menu"),t.setAttribute("aria-labelledby","bloom-settings-title"),t.setAttribute("popover","manual"),wt(t)||O(t,!0),t.addEventListener("toggle",()=>{let _=t.matches(":popover-open");ee=_,Q?.setAttribute("aria-expanded",_?"true":"false"),_||(xe(),Ue())});let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=Et();let a=document.createElement("h2");a.id="bloom-settings-title",a.textContent="Bloom++",r.append(i,a);let s=document.createElement("button");s.type="button",s.className="bloom-icon-btn",s.setAttribute("aria-label","Close"),s.innerHTML=Cn(),s.addEventListener("click",Se),o.append(r,s),n.appendChild(o);let l=document.createElement("p");l.className="bloom-settings-sub",l.textContent="Plugins",n.appendChild(l);let b=document.createElement("div");b.className="bloom-plugin-list",n.appendChild(b);let u=document.createElement("div");u.className="bloom-settings-plugin",O(u,!0);let h=document.createElement("div");h.className="bloom-settings-head";let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn",d.setAttribute("aria-label","Back"),d.innerHTML=Zo(),d.addEventListener("click",xe);let V=document.createElement("div");V.className="bloom-dialog-titles";let w=document.createElement("h2");w.textContent="";let P=document.createElement("p");P.className="bloom-settings-sub",V.append(w,P);let m=document.createElement("button");m.type="button",m.className="bloom-icon-btn",m.setAttribute("aria-label","Close"),m.innerHTML=Cn(),m.addEventListener("click",Se),h.append(d,V,m);let B=document.createElement("div");B.className="bloom-plugin-settings",u.append(h,B),t.append(n,u),e.append(t),R=t,ye=n,ve=u,Z=b,$e=w,Ge=P,A=B,dr()}function Se(){ee=!1,ar(R),Q?.setAttribute("aria-expanded","false"),xe(),Ue()}function Pn(){(!Q?.isConnected||!R?.isConnected)&&An(),R&&(xe(),ee=!0,Q?.setAttribute("aria-expanded","true"),ir(R),gr(),me("settingsOpen",void 0))}function fr(){ee?Se():Pn()}function pr(e){if(e.key==="Escape"&&ee){if(e.preventDefault(),St){xe();return}Se()}}function Ue(){xt?.abort(),xt=null}function gr(){if(Ue(),!ee)return;let e=new AbortController;xt=e,window.addEventListener("keydown",pr,{signal:e.signal})}function An(){let e=Ve();e.querySelector(".bloom-settings-fab")?.remove();let t=document.createElement("button");t.type="button",t.className="bloom-settings-fab",t.setAttribute("aria-label","Bloom++ settings"),t.setAttribute("aria-expanded","false"),t.setAttribute("aria-haspopup","menu"),t.innerHTML=Et(),t.addEventListener("click",fr),e.appendChild(t),Q=t,mr(e)}function Rn(){J(),Y(()=>Pn())}var In=y({name:"Settings",description:"Bloom++ settings, a header menu in the top layer.",authors:[T.p],required:!0,hidden:!0,enabledByDefault:!0,settings:Xo,startAt:"HostShell",cleanupSelectors:[`#${yt}`],start(){An(),ze(),Ke?.(),Ke=wn(ze)},stop(){Ue(),Ke?.(),Ke=null,Se(),p?.remove(),p=null,X=null,Q=null,R=null,ye=null,ve=null,Z=null,$e=null,Ge=null,A=null},onSettingsChange:ze});var On='form[data-type="unified-composer"], form.w-full[data-type]',te=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),We=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Hn=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),Nn=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),br=/stop streaming|stop generating|停止生成|停止输出|停止响应/;function v(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function z(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!v(r)))return r;return null}function Dn(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function k(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=Dn(e);return!!(br.test(n)||/^stop$/i.test(n))}function D(){let t=Array.from(document.querySelectorAll(On)).find(v);if(t instanceof HTMLElement)return t;let n=z(document,te),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function $(){let e=Array.from(document.querySelectorAll(te));return e.find(v)??e[0]??null}function Lt(){let e=$();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function hr(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function Bn(e){let t=D();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!v(n))&&e(n))return n;return null}function Ye(){let e=D(),t=z(e,We)??z(document,We);return t&&!k(t)?t:Bn(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!k(n);let r=Dn(n);return/^(send|send prompt|发送)$/i.test(r)&&!k(n)})}function Ct(){let e=Ye();return!!e&&hr(e)}function Tt(){let e=D(),t=z(e,Hn,!0)??z(document,Hn,!0);if(t)return t;let n=z(e,Nn)??z(document,Nn);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&v(o)&&k(o))return o}return Bn(k)}function ne(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}var kt=0;function _n(e){kt+=1;try{e()}finally{kt-=1}}function Je(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function oe(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function Fn(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function yr(e){let{head:t}=document;if(t)for(let n of Array.from(t.querySelectorAll("link")))n.id!==e&&Je(n)&&n.remove()}function vr(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Mt(e,t){let{head:n}=document;!n||!t||_n(()=>{yr(e);let o=Fn(e),{type:r,sizes:i}=vr(t);o?n.lastElementChild!==o&&n.appendChild(o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function qn(e,t){let{head:n}=document;n&&_n(()=>{Fn(e)?.remove();let o=Array.from(n.querySelectorAll("link")).filter(Je);if(o.length){oe(t)&&o[0].href!==t&&(o[0].href=t);return}if(!oe(t))return;let r=document.createElement("link");r.rel="icon",r.href=t,n.appendChild(r)})}function jn(e,t){let{head:n}=document;if(!n)return null;let o=new MutationObserver(r=>{if(!kt)for(let i of r){if(i.type==="attributes"&&Je(i.target)){t(i.target.id===e?void 0:i.target.href);return}for(let a of i.addedNodes)if(Je(a)&&a.id!==e){t(a.href);return}}});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}function Xe(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=b=>{let u=n.indexOf(b);return u>=0&&n[u+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(b,u)=>{try{return document.querySelector(b)?.getAttribute(u)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function Ze(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function xr(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!v(t))&&(k(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function Sr(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&v(e))}function Er(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&v(e))}function wr(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Pt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function Qe(){if(Tt()||xr())return!0;let e=Ye();return e&&v(e)&&!k(e)?!1:!!(Sr()||Er()||wr())}var Lr=["original","badge","dot","hole","bg"],$n=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge",default:!0},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],Gn={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},et="#FCFCFC",Cr="#111111",Kn="#111111",Tr="#ffffff",kr="#212121",Mr="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Pr={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},tt=32,zn=64;function Vn(e){return typeof e=="string"&&Lr.includes(e)}function Ar(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function nt(e){let t=document.createElement("canvas");t.width=tt,t.height=tt;let n=t.getContext("2d");return n?(n.scale(tt/zn,tt/zn),e(n),t.toDataURL("image/png")):""}function Rr(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function ot(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(Mr);n&&(e.strokeStyle=Cr,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function Ir(e,t,n){let o=Gn[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=Kn,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=Kn,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=Tr,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function Ee(e,t){if(e==="original")return t==="wait"?nt(o=>ot(o,et)):Ar(Pr[t]);let n=t==="wait"?void 0:Gn[t];return nt(e==="hole"?o=>ot(o,n??et):e==="bg"?o=>{o.fillStyle=n??kr,Rr(o,0,0,64,64,14),o.fill(),ot(o,et,!1)}:o=>{ot(o,et),t!=="wait"&&Ir(o,t,e==="dot"?"dot":"badge")})}function Un(e){return{wait:Ee(e,"wait"),rotate:Ee(e,"rotate"),done:Ee(e,"done"),ready:Ee(e,"ready"),error:Ee(e,"error")}}var Hr=new g("ChatStateFavicons"),ie="bloom-chat-state-favicon",Xn=L({style:{type:3,description:"Favicon overlay",options:$n}}),ae="",Rt={wait:"",rotate:"",done:"",ready:"",error:""},It="wait",Le=!1,I=!1,x=null,Ce="",Te="",ke=!0,we=null,se=0,re,rt=null,G=null,At=null,Me=!1,Wn=new WeakSet,Nr=400;function Or(){let e=Xn.store.style;return Vn(e)?e:"badge"}function Dr(){let t=document.querySelector(`link[rel~="icon"]:not(#${ie})`)?.href;return oe(t)?t:oe(ae)?ae:""}function S(e){It=e,Mt(ie,Rt[e])}function Yn(){Rt=Un(Or()),S(It)}function Br(){let e=Xe(),t=e?Ze(e):Ze("");return Qe()?(!Ce&&t&&(Ce=t),Ce||t):(Ce="",t)}function Zn(){Le=!1,I=!1,x=null,Ce=""}function _r(e){Te=e,Zn(),ke=!1,S("wait")}function Qn(){if(!Me)return;let e=Xe()||location.pathname;if(Te&&e&&Te!==e){_r(e);return}e&&(Te=e);let t=Br(),n=Qe(),o=Lt(),r=Ct();if(Pt()&&!n){S("error"),Le=!1,I=!1,x=null;return}if(n){Le=!0,I=!1,x=t,S("rotate");return}if(Le){let i=!!x&&!!t&&x===t;if(Le=!1,i){I=!0,x=t,S("done");return}I=!1,x=null}if(I)if(!!(x&&t&&x!==t))I=!1,x=null;else if(o){S("done");return}else if(ke){I=!1,S("ready");return}else{I=!1,S("wait");return}x=null,S(o?"wait":ke?"ready":"wait")}function eo(){let e=D();if(!(G&&At===e&&e.isConnected)){if(G?.disconnect(),At=e,!e||e===document.body){G=null;return}G=new MutationObserver(()=>it()),G.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid","class"]})}}function it(){!Me||se||(se=requestAnimationFrame(()=>{se=0,Me&&(to(),eo(),Qn())}))}function Jn(){ke=!0,it()}function to(){let e=$();!e||Wn.has(e)||(Wn.add(e),e.addEventListener("input",Jn,{passive:!0}),e.addEventListener("compositionend",Jn,{passive:!0}))}var no=y({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[T.p],tags:["chat","ui"],enabledByDefault:!0,settings:Xn,startAt:"DOMContentLoaded",cleanupSelectors:[`#${ie}`],start(){Me=!0,ae=Dr()||ae,Yn(),rt?.disconnect(),rt=jn(ie,e=>{oe(e)&&(ae=e),Mt(ie,Rt[It])}),we?.abort(),we=new AbortController,window.addEventListener("popstate",it,{signal:we.signal}),to(),eo(),re!==void 0&&clearInterval(re),re=setInterval(it,Nr),Qn(),Hr.debug("favicon watch started")},stop(){Me=!1,se&&cancelAnimationFrame(se),se=0,re!==void 0&&(clearInterval(re),re=void 0),we?.abort(),we=null,G?.disconnect(),G=null,At=null,rt?.disconnect(),rt=null,Zn(),Te="",ke=!0,qn(ie,ae)},onSettingsChange:Yn});var oo=`.bloom-ih-hud {
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
`;var ro=new g("InputHistory"),Ht=/\u200B/g,io=10,ao=500,so=100,qr=8,jr=120,Kr=2e3,at=10,st=L({maxEntries:{type:4,description:"Max stored prompts",min:io,max:ao,default:so},history:{type:5,description:"Stored prompts",render:ni},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Nt=new Map,f=0,Ot="",M=!1,Ae=!1,_t=0,Pe=null,Dt,Ft=null,lo=!0;function E(){let e=st.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function co(e){let t=en(Number(st.store.maxEntries??so),io,ao);return e.length>t?e.slice(e.length-t):e}function lt(e){st.store.entries=co(e)}function zr(e){return e.replaceAll(Ht,"").replace(/\n$/,"").trim()}function Bt(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(te);return n instanceof HTMLElement?n:$()}function $r(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!ne(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(Ht,"").trim().length===0,last:i.toString().replaceAll(Ht,"").trim().length===0}}catch{return{first:!0,last:!0}}}function uo(e,t){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch(i){ro.debug("pm caret failed:",i)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function mo(e){clearTimeout(Dt),Dt=setTimeout(()=>{if(e!==_t)return;Ae=!1;let t=Ft;t&&uo(t,lo)},jr)}function fo(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),Ae=!0,Ft=e,lo=n;let i=++_t;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(a){ro.debug("insertText failed:",a),e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),uo(e,n),mo(i)}function Gr(){let e=Ve(),t=e.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",e.appendChild(t)),t}function le(){document.getElementById("bloom-root")?.shadowRoot?.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Vr(e,t){let n=Gr();n.textContent=e;let o=(t.closest("form")??D()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-qr)}px`,n.classList.add("bloom-ih-hud-on")}function qt(e){let t=zr(e);if(!t)return;let n=Date.now(),o=Nt.get(t);if(o&&n-o<Kr)return;Nt.set(t,n);let r=E().filter(i=>i!==t);r.push(t),lt(r),f=E().length,M=!1,le()}function Ur(e,t){let n=E();if(!n.length&&e)return;f>=n.length&&(Ot=ne(t),f=n.length);let o=e?f-1:f+1;o<0||o>n.length||(f=o,M=!0,fo(t,o===n.length?Ot:n[o],e),o<n.length?Vr(`${o+1} / ${n.length}`,t):le())}function Wr(e){M=!1,le(),fo(e,Ot,!1),f=E().length}function Yr(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=Bt(e.target)??Bt(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&M&&!e.altKey&&!e.shiftKey){Wr(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){qt(ne(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=E();if(!o){let i=$r(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||f<=0)||!n&&f>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),Ur(n,t))}function Jr(e){if(Bt(e.target)){if(Ae){mo(_t);return}M&&(M=!1,le(),f=E().length)}}function Xr(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(te);n instanceof HTMLElement&&qt(ne(n))}function Zr(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(We);if(!n||!(n instanceof HTMLElement)||k(n))return;let o=$();o&&qt(ne(o))}function Qr(e){if(!(!M||Ae)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}M=!1,le()}}function ei(){if(Pe)return;Pe=new AbortController;let{signal:e}=Pe,t={capture:!0,signal:e};window.addEventListener("keydown",Yr,t),window.addEventListener("input",Jr,t),window.addEventListener("submit",Xr,t),window.addEventListener("click",Zr,t),window.addEventListener("pointerdown",Qr,t)}function ti(e){let t=E().slice();t.splice(e,1),lt(t),f>t.length&&(f=t.length)}function ni(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=E().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(m=>m.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/at));n>=l&&(n=l-1);let b=s.slice(n*at,n*at+at);e.replaceChildren();let u=document.createElement("input");if(u.className="bloom-ih-search",u.type="search",u.placeholder="Search history",u.autocomplete="off",u.value=t,u.addEventListener("input",()=>{t=u.value,n=0,r()}),e.appendChild(u),b.length){let m=document.createElement("div");m.className="bloom-ih-list",b.forEach((B,_)=>{let To=i.indexOf(B),ko=E().length-1-To,ct=document.createElement("div");ct.className="bloom-ih-item";let ce=document.createElement("button");ce.type="button",ce.className=`bloom-ih-body${o===_?"":" bloom-ih-clamp"}`,ce.textContent=B,ce.addEventListener("click",()=>{o=o===_?-1:_,r()});let ut=document.createElement("div");ut.className="bloom-ih-actions";let ue=document.createElement("button");ue.type="button",ue.title="Copy",ue.textContent="C",ue.addEventListener("click",()=>{nn(B)});let de=document.createElement("button");de.type="button",de.title="Delete",de.textContent="\xD7",de.addEventListener("click",()=>{ti(ko),r()}),ut.append(ue,de),ct.append(ce,ut),m.appendChild(ct)}),e.appendChild(m)}else{let m=document.createElement("p");m.className="bloom-ih-empty",m.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(m)}let h=document.createElement("div");h.className="bloom-ih-pager";let d=document.createElement("button");d.type="button",d.className="bloom-ih-btn",d.textContent="Prev",d.disabled=n<=0,d.addEventListener("click",()=>{n-=1,r()});let V=document.createElement("span");V.textContent=`${n+1} / ${l}`;let w=document.createElement("button");w.type="button",w.className="bloom-ih-btn",w.textContent="Next",w.disabled=n+1>=l,w.addEventListener("click",()=>{n+=1,r()});let P=document.createElement("button");P.type="button",P.className="bloom-ih-clear",P.textContent="Clear all",P.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(lt([]),f=0,r())}),h.append(d,V,w,P),e.appendChild(h)};return r(),()=>{e.replaceChildren()}}var po=y({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[T.p],tags:["chat"],enabledByDefault:!0,settings:st,startAt:"HostReady",managedStyle:"inputHistory",start(){U("inputHistory",oo),Ve(),f=E().length,M=!1,ei()},stop(){Pe?.abort(),Pe=null,le(),Nt.clear(),clearTimeout(Dt),Ae=!1,Ft=null,M=!1},onSettingsChange(){let e=E(),t=co(e);t.length!==e.length&&lt(t),f>t.length&&(f=t.length)}});var jt="noShareLink",oi=['button[data-testid="share-chat-button"]'],ri=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],Kt=L({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function go(e){return`${e.join(",")}{display:none!important}`}function bo(){let e=[];if(Kt.store.hideShareChat!==!1&&e.push(go(oi)),Kt.store.hideShareProject!==!1&&e.push(go(ri)),!e.length){q(jt);return}U(jt,e.join(`
`))}var ho=y({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[T.p],tags:["ui","privacy"],enabledByDefault:!1,startAt:"HostReady",settings:Kt,start:bo,onSettingsChange:bo,stop(){q(jt)}});var xo="noDictation",ii=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]'],ai=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],So=L({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function yo(e){return`${e.join(",")}{display:none!important}`}function vo(){let e=[yo(ii)];So.store.hideDictationSettings!==!1&&e.push(yo(ai)),U(xo,e.join(`
`))}var Eo=y({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[T.p],tags:["chat","ui"],enabledByDefault:!1,startAt:"HostReady",settings:So,start:vo,onSettingsChange:vo,stop(){q(xo)}});var Re=new g("Bloom"),wo=!1,si=Date.now(),li=[In,no,po,ho,Eo];function zt(e){return new Promise(t=>setTimeout(t,e))}function ci(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var ui=8e3,Lo=300,di=250;async function mi(){if(K())return await zt(Lo),!0;for(;Date.now()-si<ui;)if(await zt(di),K())return await zt(Lo),!0;return K()||gt()}function fi(){try{GM_registerMenuCommand?.("Bloom++ settings",Rn)}catch{}}function pi(){Y(()=>{be("HostShell"),Re.info("host shell",j)}),qe(()=>{Re.info("idle ready",j)}),je(()=>{Ut(),be("HostReady"),Re.info("chrome ready",j)})}async function $t(){await on()}async function Gt(){if(wo)return;wo=!0;for(let n of li)try{ln(n)}catch(o){Re.error("register failed",n.name,o)}dn(),be("Init"),fi(),pi();let e=()=>be("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await ci(),!await mi()){Re.warn("late islands not detected; shell only",j),J();return}await yn()}var Co=typeof unsafeWindow<"u"?unsafeWindow:window;window===window.top&&!Co.Bloom&&(Object.defineProperty(Co,"Bloom",{value:Vt,writable:!1,configurable:!0}),$t().then(()=>Gt()).catch(e=>console.error("[Bloom++] Fatal init error:",e)));})();
