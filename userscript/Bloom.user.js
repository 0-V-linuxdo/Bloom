// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260902] v1.3.2
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

/* Bloom++ [20260902] v1.3.2. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Io=Object.defineProperty;var No=(e,t)=>{for(var n in t)Io(e,n,{get:t[n],enumerable:!0})};var jt={};No(jt,{REPO_URL:()=>hn,Settings:()=>d,VERSION:()=>z,hasLateIslands:()=>$,init:()=>Kt,initSettings:()=>$t,isDocumentInteractive:()=>yn,plugins:()=>T,requestChromeReady:()=>gn,requestIdleReady:()=>J,whenChromeReady:()=>Be,whenIdleReady:()=>Y,whenShellReady:()=>W});var O=new Map,Ae=!1;function Do(){return document.getElementById("bloom-root")?.shadowRoot??null}function Oo(){return document.head??null}function q(){let e=Do();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=Bo()}function dt(e,t){if(!Ae)return;let n=Oo();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),q();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,q();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,q()}function V(e,t){let n=O.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},O.set(e,n)),Ae&&dt(e,n)}function Gt(){Ae=!0;for(let[e,t]of O)dt(e,t);return q(),!0}function Vt(e){let t=O.get(e);t&&(t.disabled=!1,Ae&&dt(e,t))}function Ut(e){let t=O.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),q())}function F(e){let t=O.get(e);t&&(t.el?.remove(),O.delete(e),q())}function Bo(){return Array.from(O.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}function Wt(){q()}var p=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function h(e){return e}var _o=new Map;function de(e,t){let n=_o.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var qo="bloompp";function Yt(){return new Promise((e,t)=>{let n=indexedDB.open(qo,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function Jt(e){try{let t=await Yt();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function Xt(e,t){try{let n=await Yt();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function ue(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Zt(e,t,n){return Math.min(n,Math.max(t,e))}function Qt(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function en(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}var Pe=new p("SettingsStore"),B="BloomSettings",Fo=100;function He(e){if(ue(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(ue(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return ue(n)?n:null}return null}catch{return null}}var Re=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[u,c]of this.defaultGetters)if(l.startsWith(u)){let b=l.slice(u.length+1);if(b&&!b.includes(".")){let m=c(b);m!==void 0&&(i[a]=m,s=m);break}}}return ue(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Pe.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Fo))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(B,this.plain)}catch{try{GM_setValue(B,t)}catch(n){Pe.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(B,t)}catch{}Xt(B,t).catch(n=>Pe.warn("Failed to save settings to IndexedDB:",n))}catch(t){Pe.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){Qt(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var zo=new p("Settings"),$o={plugins:{}},d=new Re(structuredClone($o)),Ko=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function jo(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function C(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(d.store.plugins[n]||(d.store.plugins[n]={}),d.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?d.plain.plugins[n]??{}:{}}};return t}function Go(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function tn(){let e=null;if(e=He(Go(B)),e||(e=He(await Jt(B))),!e)try{e=He(localStorage.getItem(B))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(d.plain.plugins=t),zo.debug("Loaded settings")}}function nn(e,t){t&&(t.pluginName=e,d.plain.plugins[e]||(d.plain.plugins[e]={}),d.setDefaultGetter(Ko(e),n=>{if(n!=="enabled")return jo(t.def,n)}))}var Ie=new p("PluginManager"),T={},fe=new Set;function an(e){if(T[e.name]){Ie.warn("Duplicate plugin",e.name);return}T[e.name]=e,nn(e.name,e.settings)}function Ne(e){let t=T[e];if(!t)return!1;if(t.required)return!0;let n=d.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function sn(e){let t=T[e];if(!t||t.required)return;let n=!Ne(e);d.plain.plugins[e]||(d.store.plugins[e]={}),d.store.plugins[e].enabled=n,n?ln(t):Vo(t),de("pluginToggle",{name:e,enabled:n})}function ln(e,t=!1){if(!fe.has(e.name)&&Ne(e.name))try{e.managedStyle&&Vt(e.managedStyle),e.start?.(),fe.add(e.name),e.settings&&d.addPrefixChangeListener(`plugins.${e.name}.`,()=>{fe.has(e.name)&&e.onSettingsChange?.()}),t||Ie.debug("Started",e.name)}catch(n){Ie.error("Failed to start",e.name,n)}}function Vo(e){if(fe.has(e.name)){try{e.stop?.()}catch(t){Ie.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(Ut(e.managedStyle),F(e.managedStyle)),fe.delete(e.name)}}function pe(e){for(let t of Object.values(T))(t.startAt??"DOMContentLoaded")===e&&ln(t)}var on=2,rn="defaultsRev";function cn(){for(let t of Object.values(T))d.plain.plugins[t.name]||(d.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=d.store.plugins.Settings??(d.store.plugins.Settings={});if(e[rn]!==on){for(let t of["NoShareLink","NoDictation"]){let n=d.store.plugins[t]??(d.store.plugins[t]={});n.enabled=!1}e[rn]=on}}var ge=!1,De=!1,ut=!1,un=[],mn=[],fn=[];function mt(e){let t=e.splice(0);for(let n of t)n()}function Oe(){ge||(ge=!0,mt(un))}function ft(){De||(De=!0,ge||Oe(),mt(mn))}function pn(){ut||(ut=!0,ge||Oe(),De||ft(),mt(fn))}function W(e){ge?e():un.push(e)}function Y(e){De?e():mn.push(e)}function Be(e){ut?e():fn.push(e)}function J(){Oe(),ft()}function gn(){pn()}function dn(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function bn(){await dn(4e3),Oe(),await dn(4e3),ft(),pn()}var k={p:"0-V-linuxdo"},z="[20260902] v1.3.2",hn="https://github.com/0-V-linuxdo/Bloom";function Uo(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Wo(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function pt(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function $(){return pt()?Uo()||Wo():!1}function yn(){return $()}var Yo=["#page-header",'[data-testid="page-header"]',"header"],Jo=["aside",'[data-testid="left-sidebar"]','[data-testid="sidebar"]'],vn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]'];function H(e){return!(e instanceof HTMLElement)||!e.isConnected||e.closest("#bloom-root")?!1:e.getClientRects().length>0}function Xo(){for(let e of Yo){let t=document.querySelector(e);if(H(t))return t}for(let e of document.querySelectorAll("nav"))if(H(e)&&!e.closest("aside, [data-testid='sidebar']"))return e;return null}function Sn(){for(let e of Jo){let t=document.querySelector(e);if(H(t)&&t.getBoundingClientRect().left<window.innerWidth/2)return t}return null}function En(e){return`${e.getAttribute("aria-label")||""} ${e.textContent||""}`.replace(/\s+/g," ").trim()}function _e(e){let t=e.getAttribute("href")||"";try{if(t){let o=new URL(t,location.origin).pathname;if(/\/download\/?$/.test(o))return!0}}catch{}let n=En(e);return!!(/download.{0,24}(chatgpt\s*)?(app|desktop)/i.test(n)||/下载.{0,16}(chatgpt|应用|app)/i.test(n)||/get (the )?app/i.test(n))}function xn(e){if(_e(e))return!0;let t=e.getAttribute("href")||"";try{if(t){let o=new URL(t,location.origin).pathname;if(/^\/(gpts|store|apps)(\/|$)/i.test(o))return!0}}catch{}let n=En(e);return!!(/gpt.?store|explore gpts|\bstore\b|\bshop\b/i.test(n)||/应用商店|插件商店|探索 GPTs/i.test(n))}function be(e,t){for(let n of e.querySelectorAll("a[href], button, [role='button']"))if(H(n)&&t(n))return n;return null}function Zo(){let e=Xo();if(e){let n=be(e,_e);if(n)return n}let t=document.querySelector('a[href="/download"], a[href="/download/"], a[href*="chatgpt.com/download"]');return H(t)?t:null}function qe(e){let t=e.getBoundingClientRect();return t.left<window.innerWidth/2&&t.bottom>window.innerHeight-180}function Qo(){for(let t of vn)for(let n of document.querySelectorAll(t))if(H(n)&&qe(n))return n;let e=Sn();if(!e)return null;for(let t of vn){let n=e.querySelector(t);if(H(n)&&qe(n))return n}return null}function er(e){let t=e,n=e;for(let o=0;o<8&&t;o++){let r=t.getBoundingClientRect();r.width>=160&&r.left<96&&r.bottom>window.innerHeight-180&&(n=t),t=t.parentElement}return n}function tr(e,t){let n=t.getBoundingClientRect(),o=null,r=-1;for(let i of e.querySelectorAll("a, button, [role='button']")){if(!H(i)||i===t||t.contains(i))continue;let a=i.getBoundingClientRect();a.left<n.right-8||a.width>64||a.height>64||a.right>r&&(o=i,r=a.right)}return o}function nr(){let e=Qo();if(e){let n=er(e),o=be(n,xn)??be(n,_e);if(o)return o;let r=tr(n,e);return r||e}let t=Sn();if(t){let n=be(t,_e);if(n&&qe(n))return n;let o=be(t,xn);if(o&&qe(o))return o}return null}var X=null;function wn(){X=null}function or(){return X&&H(X)||(X=Zo()??nr()),X}function Ln(e){let n=or(),o=e,r,i;if(n){let a=n.getBoundingClientRect();o=Math.max(32,Math.min(36,Math.round(a.height)||e)),r=a.right+8,i=a.top+(a.height-o)/2}else r=window.innerWidth-o-16,i=12;return r=Math.max(8,Math.min(window.innerWidth-o-8,r)),i=Math.max(8,Math.min(window.innerHeight-o-8,i)),{x:r,y:i,size:o}}var bt=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary"],rr={light:{"--main-surface-primary":"#ffffff","--main-surface-secondary":"#f4f4f4","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#f9f9f9","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#b4b4b4","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.1)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.2)","--link":"#0d0d0d","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#f4f4f4","--bg-primary":"#ffffff","--bg-secondary":"#f4f4f4"},dark:{"--main-surface-primary":"#212121","--main-surface-secondary":"#2f2f2f","--main-surface-tertiary":"#424242","--sidebar-surface-primary":"#171717","--text-primary":"#ececec","--text-secondary":"#b4b4b4","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ececec","--icon-secondary":"#b4b4b4","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.1)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.2)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.06)","--interactive-label-primary-default":"#ececec","--message-surface":"#2f2f2f","--bg-primary":"#212121","--bg-secondary":"#2f2f2f"}};function ir(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function ar(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function gt(e){let t=ir(e);return t?ar(t)>.55?"light":"dark":null}function sr(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=gt(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=gt(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=gt(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Cn(e){return e==="auto"?sr():e}function lr(e){try{let t=getComputedStyle(document.documentElement);for(let n of bt){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function Tn(e,t,n){let o=rr[t];if(n){lr(e);for(let r of bt)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of bt)e.style.setProperty(r,o[r])}function kn(e){let t=new MutationObserver(e);return t.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","data-color-scheme","style"]}),()=>t.disconnect()}var Mn=`/* Void++ BaseCard / PluginCard chrome. Tokens from chatgpt.com via :host. */

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

.bloom-settings-backdrop[hidden],
.bloom-settings-modal[hidden] {
  display: none !important;
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
`;var ht="bloom-root",dr=C({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),g=null,y=null,je=!1,xt=!1,yt=[],Fe=null,vt=!1,$e=null,I=null,M=null,Z=null;function St(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Pn(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function ur(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>'}var mr={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>'};function fr(e){return mr[e]??St()}function pr(){return"auto"}function ze(){if(!g)return;let e=pr(),t=Cn(e);g.setAttribute("data-bloom-scheme",t),Tn(g,t,e==="auto"),de("schemeChange",{scheme:t,pref:e})}function gr(){Wt()}function ye(){if(y)return y;g=document.getElementById(ht),g||(g=document.createElement("div"),g.id=ht,g.style.pointerEvents="none");let e=document.body;if(e&&g.parentNode!==e&&e.appendChild(g),y=g.shadowRoot??g.attachShadow({mode:"open"}),!y.querySelector("style[data-bloom]")){let t=document.createElement("style");t.dataset.bloom="1",t.textContent=Mn,y.appendChild(t)}return ze(),gr(),vt||(y.addEventListener("keydown",wr),vt=!0),y}function br(){for(let e of yt)e();yt=[]}function he(){xt=!1,br(),y?.querySelector(".bloom-plugin-backdrop")?.remove(),y?.querySelector(".bloom-plugin-dialog")?.remove()}function Rn(){Ke()}function Hn(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function hr(e){return!!e.settings&&Object.keys(e.settings.def).length>0}function yr(e,t,n){if(n.hidden)return null;if(n.type===5&&n.render){let a=document.createElement("details");a.className="bloom-field bloom-field-block";let s=document.createElement("summary");s.textContent=n.description||t;let l=document.createElement("div");return yt.push(n.render(l)),a.append(s,l),a}let o=document.createElement("div");o.className="bloom-field";let r=document.createElement("span");r.textContent=n.description||t,o.appendChild(r);let i=d.store.plugins[e]??(d.store.plugins[e]={});if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??n.options.find(s=>s.default)?.value??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),o.appendChild(a),o}if(n.type===2){let a=Hn(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),o.appendChild(a),o}return o}function vr(e){he();let t=y;if(!t)return;xt=!0;let n=document.createElement("button");n.type="button",n.className="bloom-plugin-backdrop",n.setAttribute("aria-label","Close plugin settings"),n.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),he()});let o=document.createElement("div");o.className="bloom-plugin-dialog",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.addEventListener("click",c=>c.stopPropagation());let r=document.createElement("div");r.className="bloom-dialog-bar";let i=document.createElement("div");i.className="bloom-dialog-titles";let a=document.createElement("h3");a.textContent=e.name;let s=document.createElement("p");s.textContent=e.description,i.append(a,s);let l=document.createElement("button");l.type="button",l.className="bloom-icon-btn",l.setAttribute("aria-label","Close plugin settings"),l.innerHTML=Pn(),l.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),he()}),r.append(i,l);let u=document.createElement("div");if(u.className="bloom-plugin-settings",e.settings)for(let[c,b]of Object.entries(e.settings.def)){let m=yr(e.name,c,b);m&&u.appendChild(m)}if(!u.childElementCount){let c=document.createElement("p");c.className="bloom-dialog-empty",c.textContent="No configurable settings.",u.appendChild(c)}o.append(r,u),t.append(n,o)}function xr(e){let t=document.createElement("section");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=fr(e.name);let a=document.createElement("h3");a.textContent=e.name,r.append(i,a);let s=document.createElement("div");if(s.className="bloom-card-controls",hr(e)){let w=document.createElement("button");w.type="button",w.className="bloom-icon-btn bloom-card-gear",w.setAttribute("aria-label",`${e.name} settings`),w.innerHTML=ur();let D=L=>{L.preventDefault(),L.stopPropagation(),vr(e)};w.addEventListener("click",D),w.addEventListener("pointerdown",L=>L.stopPropagation()),s.appendChild(w)}let l=Hn(e.name,Ne(e.name),!!e.required);l.querySelector("input")?.addEventListener("change",()=>{sn(e.name)}),s.appendChild(l),o.append(r,s);let c=document.createElement("p");c.className="bloom-card-desc",c.textContent=e.description,n.append(o,c);let b=document.createElement("div");b.className="bloom-card-sep";let m=document.createElement("div");return m.className="bloom-card-footer",m.textContent=e.authors?.join(", ")||"\xA0",t.append(n,b,m),t}function In(){if(Z){Z.replaceChildren();for(let e of Object.values(T))e.hidden||e.name==="Settings"||Z.appendChild(xr(e))}}function Nn(e){if(I&&M&&Z&&I.isConnected&&M.isConnected)return;I?.remove(),M?.remove();let t=document.createElement("button");t.type="button",t.className="bloom-settings-backdrop",t.setAttribute("aria-label","Close settings"),t.hidden=!0,t.addEventListener("click",Ke);let n=document.createElement("div");n.className="bloom-settings-modal",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.setAttribute("aria-labelledby","bloom-settings-title"),n.tabIndex=-1,n.hidden=!0,n.addEventListener("click",c=>c.stopPropagation());let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=St();let a=document.createElement("h2");a.id="bloom-settings-title",a.textContent="Bloom++",r.append(i,a);let s=document.createElement("button");s.type="button",s.className="bloom-icon-btn",s.setAttribute("aria-label","Close"),s.innerHTML=Pn(),s.addEventListener("click",Ke),o.append(r,s),n.appendChild(o);let l=document.createElement("p");l.className="bloom-settings-sub",l.textContent="Plugins",n.appendChild(l);let u=document.createElement("div");u.className="bloom-plugin-grid",n.appendChild(u),e.append(t,n),I=t,M=n,Z=u,In()}function Ke(){je=!1,he(),I&&(I.hidden=!0),M&&(M.hidden=!0)}function Dn(){let e=ye();Nn(e),In(),je=!0,I&&(I.hidden=!1),M&&(M.hidden=!1,M.focus()),de("settingsOpen",void 0)}function Sr(){je?Ke():Dn()}function An(e){let t=Ln(36);e.style.width=`${t.size}px`,e.style.height=`${t.size}px`,e.style.left=`${Math.round(t.x)}px`,e.style.top=`${Math.round(t.y)}px`,e.style.right="auto",e.style.bottom="auto"}function Er(){let e=ye();e.querySelector(".bloom-settings-fab")?.remove(),$e?.abort();let t=document.createElement("button");t.type="button",t.className="bloom-settings-fab",t.setAttribute("aria-label","Bloom++ settings"),t.innerHTML=St(),t.addEventListener("click",Sr),e.appendChild(t),Nn(e);let n=new AbortController;$e=n;let o=()=>{wn(),An(t)};window.addEventListener("resize",o,{signal:n.signal}),Y(()=>An(t))}function wr(e){if(e.key==="Escape"){if(xt){he(),e.stopPropagation();return}je&&(Rn(),e.stopPropagation())}}function On(){J(),W(()=>Dn())}var Bn=h({name:"Settings",description:"Bloom++ settings, docked next to Download the ChatGPT app.",authors:[k.p],required:!0,hidden:!0,enabledByDefault:!0,settings:dr,startAt:"HostShell",cleanupSelectors:[`#${ht}`],start(){Er(),ze(),Fe?.(),Fe=kn(ze)},stop(){$e?.abort(),$e=null,Fe?.(),Fe=null,Rn(),g?.remove(),g=null,y=null,vt=!1,I=null,M=null,Z=null},onSettingsChange:ze});var Fn='form[data-type="unified-composer"], form.w-full[data-type]',Q=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Ge=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),_n=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),qn=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Lr=/stop streaming|stop generating|停止生成|停止输出|停止响应/;function v(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function K(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!v(r)))return r;return null}function zn(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function A(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=zn(e);return!!(Lr.test(n)||/^stop$/i.test(n))}function _(){let t=Array.from(document.querySelectorAll(Fn)).find(v);if(t instanceof HTMLElement)return t;let n=K(document,Q),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function j(){let e=Array.from(document.querySelectorAll(Q));return e.find(v)??e[0]??null}function Et(){let e=j();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function Cr(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function $n(e){let t=_();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!v(n))&&e(n))return n;return null}function Ve(){let e=_(),t=K(e,Ge)??K(document,Ge);return t&&!A(t)?t:$n(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!A(n);let r=zn(n);return/^(send|send prompt|发送)$/i.test(r)&&!A(n)})}function wt(){let e=Ve();return!!e&&Cr(e)}function Lt(){let e=_(),t=K(e,_n,!0)??K(document,_n,!0);if(t)return t;let n=K(e,qn)??K(document,qn);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&v(o)&&A(o))return o}return $n(A)}function ee(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}var Ct=0;function Kn(e){Ct+=1;try{e()}finally{Ct-=1}}function Ue(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function te(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function jn(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function Tr(e){let{head:t}=document;if(t)for(let n of Array.from(t.querySelectorAll("link")))n.id!==e&&Ue(n)&&n.remove()}function kr(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Tt(e,t){let{head:n}=document;!n||!t||Kn(()=>{Tr(e);let o=jn(e),{type:r,sizes:i}=kr(t);o?n.lastElementChild!==o&&n.appendChild(o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function Gn(e,t){let{head:n}=document;n&&Kn(()=>{jn(e)?.remove();let o=Array.from(n.querySelectorAll("link")).filter(Ue);if(o.length){te(t)&&o[0].href!==t&&(o[0].href=t);return}if(!te(t))return;let r=document.createElement("link");r.rel="icon",r.href=t,n.appendChild(r)})}function Vn(e,t){let{head:n}=document;if(!n)return null;let o=new MutationObserver(r=>{if(!Ct)for(let i of r){if(i.type==="attributes"&&Ue(i.target)){t(i.target.id===e?void 0:i.target.href);return}for(let a of i.addedNodes)if(Ue(a)&&a.id!==e){t(a.href);return}}});return o.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),o}function We(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=u=>{let c=n.indexOf(u);return c>=0&&n[c+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(u,c)=>{try{return document.querySelector(u)?.getAttribute(c)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function Ye(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function Mr(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!v(t))&&(A(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function Ar(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&v(e))}function Pr(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&v(e))}function Rr(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function kt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function Je(){if(Lt()||Mr())return!0;let e=Ve();return e&&v(e)&&!A(e)?!1:!!(Ar()||Pr()||Rr())}var Hr=["original","badge","dot","hole","bg"],Yn=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge",default:!0},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],Jn={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},Xe="#FCFCFC",Ir="#111111",Un="#111111",Nr="#ffffff",Dr="#212121",Or="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Br={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},Ze=32,Wn=64;function Xn(e){return typeof e=="string"&&Hr.includes(e)}function _r(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function Qe(e){let t=document.createElement("canvas");t.width=Ze,t.height=Ze;let n=t.getContext("2d");return n?(n.scale(Ze/Wn,Ze/Wn),e(n),t.toDataURL("image/png")):""}function qr(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function et(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D(Or);n&&(e.strokeStyle=Ir,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function Fr(e,t,n){let o=Jn[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=Un,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=Un,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=Nr,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function ve(e,t){if(e==="original")return t==="wait"?Qe(o=>et(o,Xe)):_r(Br[t]);let n=t==="wait"?void 0:Jn[t];return Qe(e==="hole"?o=>et(o,n??Xe):e==="bg"?o=>{o.fillStyle=n??Dr,qr(o,0,0,64,64,14),o.fill(),et(o,Xe,!1)}:o=>{et(o,Xe),t!=="wait"&&Fr(o,t,e==="dot"?"dot":"badge")})}function Zn(e){return{wait:ve(e,"wait"),rotate:ve(e,"rotate"),done:ve(e,"done"),ready:ve(e,"ready"),error:ve(e,"error")}}var zr=new p("ChatStateFavicons"),oe="bloom-chat-state-favicon",no=C({style:{type:3,description:"Favicon overlay",options:Yn}}),re="",At={wait:"",rotate:"",done:"",ready:"",error:""},Pt="wait",Se=!1,N=!1,x=null,Ee="",we="",Le=!0,xe=null,ie=0,ne,tt=null,G=null,Mt=null,Ce=!1,Qn=new WeakSet,$r=400;function Kr(){let e=no.store.style;return Xn(e)?e:"badge"}function jr(){let t=document.querySelector(`link[rel~="icon"]:not(#${oe})`)?.href;return te(t)?t:te(re)?re:""}function S(e){Pt=e,Tt(oe,At[e])}function eo(){At=Zn(Kr()),S(Pt)}function Gr(){let e=We(),t=e?Ye(e):Ye("");return Je()?(!Ee&&t&&(Ee=t),Ee||t):(Ee="",t)}function oo(){Se=!1,N=!1,x=null,Ee=""}function Vr(e){we=e,oo(),Le=!1,S("wait")}function ro(){if(!Ce)return;let e=We()||location.pathname;if(we&&e&&we!==e){Vr(e);return}e&&(we=e);let t=Gr(),n=Je(),o=Et(),r=wt();if(kt()&&!n){S("error"),Se=!1,N=!1,x=null;return}if(n){Se=!0,N=!1,x=t,S("rotate");return}if(Se){let i=!!x&&!!t&&x===t;if(Se=!1,i){N=!0,x=t,S("done");return}N=!1,x=null}if(N)if(!!(x&&t&&x!==t))N=!1,x=null;else if(o){S("done");return}else if(Le){N=!1,S("ready");return}else{N=!1,S("wait");return}x=null,S(o?"wait":Le?"ready":"wait")}function io(){let e=_();if(!(G&&Mt===e&&e.isConnected)){if(G?.disconnect(),Mt=e,!e||e===document.body){G=null;return}G=new MutationObserver(()=>nt()),G.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid","class"]})}}function nt(){!Ce||ie||(ie=requestAnimationFrame(()=>{ie=0,Ce&&(ao(),io(),ro())}))}function to(){Le=!0,nt()}function ao(){let e=j();!e||Qn.has(e)||(Qn.add(e),e.addEventListener("input",to,{passive:!0}),e.addEventListener("compositionend",to,{passive:!0}))}var so=h({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[k.p],tags:["chat","ui"],enabledByDefault:!0,settings:no,startAt:"DOMContentLoaded",cleanupSelectors:[`#${oe}`],start(){Ce=!0,re=jr()||re,eo(),tt?.disconnect(),tt=Vn(oe,e=>{te(e)&&(re=e),Tt(oe,At[Pt])}),xe?.abort(),xe=new AbortController,window.addEventListener("popstate",nt,{signal:xe.signal}),ao(),io(),ne!==void 0&&clearInterval(ne),ne=setInterval(nt,$r),ro(),zr.debug("favicon watch started")},stop(){Ce=!1,ie&&cancelAnimationFrame(ie),ie=0,ne!==void 0&&(clearInterval(ne),ne=void 0),xe?.abort(),xe=null,G?.disconnect(),G=null,Mt=null,tt?.disconnect(),tt=null,oo(),we="",Le=!0,Gn(oe,re)},onSettingsChange:eo});var lo=`.bloom-ih-hud {
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
`;var co=new p("InputHistory"),Rt=/\u200B/g,uo=10,mo=500,fo=100,Wr=8,Yr=120,Jr=2e3,ot=10,rt=C({maxEntries:{type:4,description:"Max stored prompts",min:uo,max:mo,default:fo},history:{type:5,description:"Stored prompts",render:di},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Ht=new Map,f=0,It="",P=!1,ke=!1,Ot=0,Te=null,Nt,Bt=null,po=!0;function E(){let e=rt.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function go(e){let t=Zt(Number(rt.store.maxEntries??fo),uo,mo);return e.length>t?e.slice(e.length-t):e}function it(e){rt.store.entries=go(e)}function Xr(e){return e.replaceAll(Rt,"").replace(/\n$/,"").trim()}function Dt(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(Q);return n instanceof HTMLElement?n:j()}function Zr(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!ee(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(Rt,"").trim().length===0,last:i.toString().replaceAll(Rt,"").trim().length===0}}catch{return{first:!0,last:!0}}}function bo(e,t){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch(i){co.debug("pm caret failed:",i)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function ho(e){clearTimeout(Nt),Nt=setTimeout(()=>{if(e!==Ot)return;ke=!1;let t=Bt;t&&bo(t,po)},Yr)}function yo(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),ke=!0,Bt=e,po=n;let i=++Ot;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(a){co.debug("insertText failed:",a),e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),bo(e,n),ho(i)}function Qr(){let e=ye(),t=e.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",e.appendChild(t)),t}function ae(){document.getElementById("bloom-root")?.shadowRoot?.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function ei(e,t){let n=Qr();n.textContent=e;let o=(t.closest("form")??_()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-Wr)}px`,n.classList.add("bloom-ih-hud-on")}function _t(e){let t=Xr(e);if(!t)return;let n=Date.now(),o=Ht.get(t);if(o&&n-o<Jr)return;Ht.set(t,n);let r=E().filter(i=>i!==t);r.push(t),it(r),f=E().length,P=!1,ae()}function ti(e,t){let n=E();if(!n.length&&e)return;f>=n.length&&(It=ee(t),f=n.length);let o=e?f-1:f+1;o<0||o>n.length||(f=o,P=!0,yo(t,o===n.length?It:n[o],e),o<n.length?ei(`${o+1} / ${n.length}`,t):ae())}function ni(e){P=!1,ae(),yo(e,It,!1),f=E().length}function oi(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=Dt(e.target)??Dt(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&P&&!e.altKey&&!e.shiftKey){ni(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){_t(ee(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=E();if(!o){let i=Zr(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||f<=0)||!n&&f>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),ti(n,t))}function ri(e){if(Dt(e.target)){if(ke){ho(Ot);return}P&&(P=!1,ae(),f=E().length)}}function ii(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(Q);n instanceof HTMLElement&&_t(ee(n))}function ai(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(Ge);if(!n||!(n instanceof HTMLElement)||A(n))return;let o=j();o&&_t(ee(o))}function si(e){if(!(!P||ke)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}P=!1,ae()}}function li(){if(Te)return;Te=new AbortController;let{signal:e}=Te,t={capture:!0,signal:e};window.addEventListener("keydown",oi,t),window.addEventListener("input",ri,t),window.addEventListener("submit",ii,t),window.addEventListener("click",ai,t),window.addEventListener("pointerdown",si,t)}function ci(e){let t=E().slice();t.splice(e,1),it(t),f>t.length&&(f=t.length)}function di(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=E().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(R=>R.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/ot));n>=l&&(n=l-1);let u=s.slice(n*ot,n*ot+ot);e.replaceChildren();let c=document.createElement("input");if(c.className="bloom-ih-search",c.type="search",c.placeholder="Search history",c.autocomplete="off",c.value=t,c.addEventListener("input",()=>{t=c.value,n=0,r()}),e.appendChild(c),u.length){let R=document.createElement("div");R.className="bloom-ih-list",u.forEach((at,st)=>{let Ro=i.indexOf(at),Ho=E().length-1-Ro,lt=document.createElement("div");lt.className="bloom-ih-item";let se=document.createElement("button");se.type="button",se.className=`bloom-ih-body${o===st?"":" bloom-ih-clamp"}`,se.textContent=at,se.addEventListener("click",()=>{o=o===st?-1:st,r()});let ct=document.createElement("div");ct.className="bloom-ih-actions";let le=document.createElement("button");le.type="button",le.title="Copy",le.textContent="C",le.addEventListener("click",()=>{en(at)});let ce=document.createElement("button");ce.type="button",ce.title="Delete",ce.textContent="\xD7",ce.addEventListener("click",()=>{ci(Ho),r()}),ct.append(le,ce),lt.append(se,ct),R.appendChild(lt)}),e.appendChild(R)}else{let R=document.createElement("p");R.className="bloom-ih-empty",R.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(R)}let b=document.createElement("div");b.className="bloom-ih-pager";let m=document.createElement("button");m.type="button",m.className="bloom-ih-btn",m.textContent="Prev",m.disabled=n<=0,m.addEventListener("click",()=>{n-=1,r()});let w=document.createElement("span");w.textContent=`${n+1} / ${l}`;let D=document.createElement("button");D.type="button",D.className="bloom-ih-btn",D.textContent="Next",D.disabled=n+1>=l,D.addEventListener("click",()=>{n+=1,r()});let L=document.createElement("button");L.type="button",L.className="bloom-ih-clear",L.textContent="Clear all",L.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(it([]),f=0,r())}),b.append(m,w,D,L),e.appendChild(b)};return r(),()=>{e.replaceChildren()}}var vo=h({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[k.p],tags:["chat"],enabledByDefault:!0,settings:rt,startAt:"HostReady",managedStyle:"inputHistory",start(){V("inputHistory",lo),ye(),f=E().length,P=!1,li()},stop(){Te?.abort(),Te=null,ae(),Ht.clear(),clearTimeout(Nt),ke=!1,Bt=null,P=!1},onSettingsChange(){let e=E(),t=go(e);t.length!==e.length&&it(t),f>t.length&&(f=t.length)}});var qt="noShareLink",ui=['button[data-testid="share-chat-button"]'],mi=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],Ft=C({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function xo(e){return`${e.join(",")}{display:none!important}`}function So(){let e=[];if(Ft.store.hideShareChat!==!1&&e.push(xo(ui)),Ft.store.hideShareProject!==!1&&e.push(xo(mi)),!e.length){F(qt);return}V(qt,e.join(`
`))}var Eo=h({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[k.p],tags:["ui","privacy"],enabledByDefault:!1,startAt:"HostReady",settings:Ft,start:So,onSettingsChange:So,stop(){F(qt)}});var Co="noDictation",fi=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]'],pi=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],To=C({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function wo(e){return`${e.join(",")}{display:none!important}`}function Lo(){let e=[wo(fi)];To.store.hideDictationSettings!==!1&&e.push(wo(pi)),V(Co,e.join(`
`))}var ko=h({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[k.p],tags:["chat","ui"],enabledByDefault:!1,startAt:"HostReady",settings:To,start:Lo,onSettingsChange:Lo,stop(){F(Co)}});var Me=new p("Bloom"),Mo=!1,gi=Date.now(),bi=[Bn,so,vo,Eo,ko];function zt(e){return new Promise(t=>setTimeout(t,e))}function hi(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var yi=8e3,Ao=300,vi=250;async function xi(){if($())return await zt(Ao),!0;for(;Date.now()-gi<yi;)if(await zt(vi),$())return await zt(Ao),!0;return $()||pt()}function Si(){try{GM_registerMenuCommand?.("Bloom++ settings",On)}catch{}}function Ei(){W(()=>{pe("HostShell"),Me.info("host shell",z)}),Y(()=>{Me.info("idle ready",z)}),Be(()=>{Gt(),pe("HostReady"),Me.info("chrome ready",z)})}async function $t(){await tn()}async function Kt(){if(Mo)return;Mo=!0;for(let n of bi)try{an(n)}catch(o){Me.error("register failed",n.name,o)}cn(),pe("Init"),Si(),Ei();let e=()=>pe("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await hi(),!await xi()){Me.warn("late islands not detected; shell only",z),J();return}await bn()}var Po=typeof unsafeWindow<"u"?unsafeWindow:window;window===window.top&&!Po.Bloom&&(Object.defineProperty(Po,"Bloom",{value:jt,writable:!1,configurable:!0}),$t().then(()=>Kt()).catch(e=>console.error("[Bloom++] Fatal init error:",e)));})();
