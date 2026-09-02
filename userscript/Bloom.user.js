// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260902] v1.3.0
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

/* Bloom++ [20260902] v1.3.0. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var Ao=Object.defineProperty;var Po=(e,t)=>{for(var n in t)Ao(e,n,{get:t[n],enumerable:!0})};var Ut={};Po(Ut,{REPO_URL:()=>xn,Settings:()=>d,VERSION:()=>$,hasLateIslands:()=>F,init:()=>Vt,initSettings:()=>Gt,isDocumentInteractive:()=>Sn,plugins:()=>k,requestChromeReady:()=>fe,requestIdleReady:()=>qe,whenChromeReady:()=>_e,whenIdleReady:()=>Y,whenShellReady:()=>W});var O=new Map,Pe=!1;function Ro(){return document.getElementById("bloom-root")?.shadowRoot??null}function Io(){return document.head??null}function _(){let e=Ro();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=Ho()}function dt(e,t){if(!Pe)return;let n=Io();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),_();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,_();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,_()}function V(e,t){let n=O.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},O.set(e,n)),Pe&&dt(e,n)}function Wt(){Pe=!0;for(let[e,t]of O)dt(e,t);return _(),!0}function Yt(e){let t=O.get(e);t&&(t.disabled=!1,Pe&&dt(e,t))}function Xt(e){let t=O.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),_())}function q(e){let t=O.get(e);t&&(t.el?.remove(),O.delete(e),_())}function Ho(){return Array.from(O.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}function Jt(){_()}var p=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function y(e){return e}var ut=new Map;function Zt(e,t){let n=ut.get(e);return n||(n=new Set,ut.set(e,n)),n.add(t),()=>n.delete(t)}function se(e,t){let n=ut.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var No="bloompp";function Qt(){return new Promise((e,t)=>{let n=indexedDB.open(No,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function en(e){try{let t=await Qt();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function tn(e,t){try{let n=await Qt();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function le(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function nn(e,t,n){return Math.min(n,Math.max(t,e))}function on(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function rn(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}var Re=new p("SettingsStore"),D="BloomSettings",Oo=100;function He(e){if(le(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(le(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return le(n)?n:null}return null}catch{return null}}var Ie=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let c=n?`${n}.${a}`:a;for(let[u,l]of this.defaultGetters)if(c.startsWith(u)){let h=c.slice(u.length+1);if(h&&!h.includes(".")){let m=l(h);m!==void 0&&(i[a]=m,s=m);break}}}return le(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let c=n?`${n}.${a}`:a;return this.notifyListeners(c),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){Re.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},Oo))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(D,this.plain)}catch{try{GM_setValue(D,t)}catch(n){Re.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(D,t)}catch{}tn(D,t).catch(n=>Re.warn("Failed to save settings to IndexedDB:",n))}catch(t){Re.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){on(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var Do=new p("Settings"),Bo={plugins:{}},d=new Ie(structuredClone(Bo)),_o=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function qo(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function C(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(d.store.plugins[n]||(d.store.plugins[n]={}),d.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?d.plain.plugins[n]??{}:{}}};return t}function $o(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function an(){let e=null;if(e=He($o(D)),e||(e=He(await en(D))),!e)try{e=He(localStorage.getItem(D))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(d.plain.plugins=t),Do.debug("Loaded settings")}}function sn(e,t){t&&(t.pluginName=e,d.plain.plugins[e]||(d.plain.plugins[e]={}),d.setDefaultGetter(_o(e),n=>{if(n!=="enabled")return qo(t.def,n)}))}var Ne=new p("PluginManager"),k={},de=new Set;function dn(e){if(k[e.name]){Ne.warn("Duplicate plugin",e.name);return}k[e.name]=e,sn(e.name,e.settings)}function Oe(e){let t=k[e];if(!t)return!1;if(t.required)return!0;let n=d.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function un(e){let t=k[e];if(!t||t.required)return;let n=!Oe(e);d.plain.plugins[e]||(d.store.plugins[e]={}),d.store.plugins[e].enabled=n,n?mn(t):Fo(t),se("pluginToggle",{name:e,enabled:n})}function mn(e,t=!1){if(!de.has(e.name)&&Oe(e.name))try{e.managedStyle&&Yt(e.managedStyle),e.start?.(),de.add(e.name),e.settings&&d.addPrefixChangeListener(`plugins.${e.name}.`,()=>{de.has(e.name)&&e.onSettingsChange?.()}),t||Ne.debug("Started",e.name)}catch(n){Ne.error("Failed to start",e.name,n)}}function Fo(e){if(de.has(e.name)){try{e.stop?.()}catch(t){Ne.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(Xt(e.managedStyle),q(e.managedStyle)),de.delete(e.name)}}function ue(e){for(let t of Object.values(k))(t.startAt??"DOMContentLoaded")===e&&mn(t)}var ln=2,cn="defaultsRev";function fn(){for(let t of Object.values(k))d.plain.plugins[t.name]||(d.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=d.store.plugins.Settings??(d.store.plugins.Settings={});if(e[cn]!==ln){for(let t of["NoShareLink","NoDictation"]){let n=d.store.plugins[t]??(d.store.plugins[t]={});n.enabled=!1}e[cn]=ln}}var me=!1,De=!1,mt=!1,gn=[],bn=[],hn=[];function ft(e){let t=e.splice(0);for(let n of t)n()}function Be(){me||(me=!0,ft(gn))}function pt(){De||(De=!0,me||Be(),ft(bn))}function yn(){mt||(mt=!0,me||Be(),De||pt(),ft(hn))}function W(e){me?e():gn.push(e)}function Y(e){De?e():bn.push(e)}function _e(e){mt?e():hn.push(e)}function qe(){Be(),pt()}function fe(){yn()}function pn(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function vn(){await pn(4e3),Be(),await pn(4e3),pt(),yn()}var T={p:"0-V-linuxdo"},$="[20260902] v1.3.0",xn="https://github.com/0-V-linuxdo/Bloom";function jo(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function Ko(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function gt(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function F(){return gt()?jo()||Ko():!1}function Sn(){return F()}var zo=["#page-header",'[data-testid="page-header"]',"header"],Go=["aside",'[data-testid="left-sidebar"]','[data-testid="sidebar"]'],En=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]'];function I(e){return!(e instanceof HTMLElement)||!e.isConnected||e.closest("#bloom-root")?!1:e.getClientRects().length>0}function Vo(){for(let e of zo){let t=document.querySelector(e);if(I(t))return t}for(let e of document.querySelectorAll("nav"))if(I(e)&&!e.closest("aside, [data-testid='sidebar']"))return e;return null}function Ln(){for(let e of Go){let t=document.querySelector(e);if(I(t)&&t.getBoundingClientRect().left<window.innerWidth/2)return t}return null}function Cn(e){return`${e.getAttribute("aria-label")||""} ${e.textContent||""}`.replace(/\s+/g," ").trim()}function $e(e){let t=e.getAttribute("href")||"";try{if(t){let o=new URL(t,location.origin).pathname;if(/\/download\/?$/.test(o))return!0}}catch{}let n=Cn(e);return!!(/download.{0,24}(chatgpt\s*)?(app|desktop)/i.test(n)||/下载.{0,16}(chatgpt|应用|app)/i.test(n)||/get (the )?app/i.test(n))}function wn(e){if($e(e))return!0;let t=e.getAttribute("href")||"";try{if(t){let o=new URL(t,location.origin).pathname;if(/^\/(gpts|store|apps)(\/|$)/i.test(o))return!0}}catch{}let n=Cn(e);return!!(/gpt.?store|explore gpts|\bstore\b|\bshop\b/i.test(n)||/应用商店|插件商店|探索 GPTs/i.test(n))}function pe(e,t){for(let n of e.querySelectorAll("a[href], button, [role='button']"))if(I(n)&&t(n))return n;return null}function Uo(){let e=Vo();if(e){let n=pe(e,$e);if(n)return n}let t=document.querySelector('a[href="/download"], a[href="/download/"], a[href*="chatgpt.com/download"]');return I(t)?t:null}function Fe(e){let t=e.getBoundingClientRect();return t.left<window.innerWidth/2&&t.bottom>window.innerHeight-180}function Wo(){for(let t of En)for(let n of document.querySelectorAll(t))if(I(n)&&Fe(n))return n;let e=Ln();if(!e)return null;for(let t of En){let n=e.querySelector(t);if(I(n)&&Fe(n))return n}return null}function Yo(e){let t=e,n=e;for(let o=0;o<8&&t;o++){let r=t.getBoundingClientRect();r.width>=160&&r.left<96&&r.bottom>window.innerHeight-180&&(n=t),t=t.parentElement}return n}function Xo(e,t){let n=t.getBoundingClientRect(),o=null,r=-1;for(let i of e.querySelectorAll("a, button, [role='button']")){if(!I(i)||i===t||t.contains(i))continue;let a=i.getBoundingClientRect();a.left<n.right-8||a.width>64||a.height>64||a.right>r&&(o=i,r=a.right)}return o}function Jo(){let e=Wo();if(e){let n=Yo(e),o=pe(n,wn)??pe(n,$e);if(o)return o;let r=Xo(n,e);return r||e}let t=Ln();if(t){let n=pe(t,$e);if(n&&Fe(n))return n;let o=pe(t,wn);if(o&&Fe(o))return o}return null}var X=null;function kn(){X=null}function Zo(){return X&&I(X)||(X=Uo()??Jo()),X}function Tn(e){let n=Zo(),o=e,r,i;if(n){let a=n.getBoundingClientRect();o=Math.max(32,Math.min(36,Math.round(a.height)||e)),r=a.right+8,i=a.top+(a.height-o)/2}else r=window.innerWidth-o-16,i=12;return r=Math.max(8,Math.min(window.innerWidth-o-8,r)),i=Math.max(8,Math.min(window.innerHeight-o-8,i)),{x:r,y:i,size:o}}var ht=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary"],Qo={light:{"--main-surface-primary":"#ffffff","--main-surface-secondary":"#f4f4f4","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#f9f9f9","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#b4b4b4","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.1)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.2)","--link":"#0d0d0d","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#f4f4f4","--bg-primary":"#ffffff","--bg-secondary":"#f4f4f4"},dark:{"--main-surface-primary":"#212121","--main-surface-secondary":"#2f2f2f","--main-surface-tertiary":"#424242","--sidebar-surface-primary":"#171717","--text-primary":"#ececec","--text-secondary":"#b4b4b4","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ececec","--icon-secondary":"#b4b4b4","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.1)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.2)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.06)","--interactive-label-primary-default":"#ececec","--message-surface":"#2f2f2f","--bg-primary":"#212121","--bg-secondary":"#2f2f2f"}};function er(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function tr(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function bt(e){let t=er(e);return t?tr(t)>.55?"light":"dark":null}function nr(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=bt(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=bt(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=bt(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function je(e){return e==="auto"?nr():e}function or(e){try{let t=getComputedStyle(document.documentElement);for(let n of ht){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function Mn(e,t,n){let o=Qo[t];if(n){or(e);for(let r of ht)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of ht)e.style.setProperty(r,o[r])}function An(e){let t=new MutationObserver(e);return t.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","data-color-scheme","style"]}),()=>t.disconnect()}var Pn=`/* Void++ BaseCard / PluginCard chrome. Tokens from chatgpt.com via :host. */

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
`;var yt="bloom-root",ir=C({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),g=null,b=null,Ge=!1,Et=!1,vt=[],Ke=null,xt=!1,ze=null;function wt(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function In(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function ar(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>'}var sr={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>'};function lr(e){return sr[e]??wt()}function cr(){return"auto"}function ge(){if(!g)return;let e=cr(),t=je(e);g.setAttribute("data-bloom-scheme",t),Mn(g,t,e==="auto"),se("schemeChange",{scheme:t,pref:e})}function St(){Jt()}function he(){if(b)return ge(),St(),b;g=document.getElementById(yt),g||(g=document.createElement("div"),g.id=yt,g.style.pointerEvents="none");let e=document.body;if(e&&g.parentNode!==e&&e.appendChild(g),b=g.shadowRoot??g.attachShadow({mode:"open"}),!b.querySelector("style[data-bloom]")){let t=document.createElement("style");t.dataset.bloom="1",t.textContent=Pn,b.appendChild(t)}return ge(),St(),xt||(b.addEventListener("keydown",br),xt=!0),b}function dr(){for(let e of vt)e();vt=[]}function be(){Et=!1,dr(),b?.querySelector(".bloom-plugin-backdrop")?.remove(),b?.querySelector(".bloom-plugin-dialog")?.remove()}function J(){Ge=!1,be(),b?.querySelector(".bloom-settings-backdrop")?.remove(),b?.querySelector(".bloom-settings-modal")?.remove()}function Hn(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function ur(e){return!!e.settings&&Object.keys(e.settings.def).length>0}function mr(e,t,n){if(n.hidden)return null;if(n.type===5&&n.render){let a=document.createElement("details");a.className="bloom-field bloom-field-block";let s=document.createElement("summary");s.textContent=n.description||t;let c=document.createElement("div");return vt.push(n.render(c)),a.append(s,c),a}let o=document.createElement("div");o.className="bloom-field";let r=document.createElement("span");r.textContent=n.description||t,o.appendChild(r);let i=d.store.plugins[e]??(d.store.plugins[e]={});if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let c=document.createElement("option");c.value=s.value,c.textContent=s.label,a.appendChild(c)}return a.value=String(i[t]??n.options.find(s=>s.default)?.value??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),o.appendChild(a),o}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??n.min??0);let c=document.createElement("span");return c.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),c.textContent=s.value}),a.append(s,c),o.appendChild(a),o}if(n.type===2){let a=Hn(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),o.appendChild(a),o}return o}function fr(e){be();let t=b;if(!t)return;Et=!0;let n=document.createElement("button");n.type="button",n.className="bloom-plugin-backdrop",n.setAttribute("aria-label","Close plugin settings"),n.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),be()});let o=document.createElement("div");o.className="bloom-plugin-dialog",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.addEventListener("click",l=>l.stopPropagation());let r=document.createElement("div");r.className="bloom-dialog-bar";let i=document.createElement("div");i.className="bloom-dialog-titles";let a=document.createElement("h3");a.textContent=e.name;let s=document.createElement("p");s.textContent=e.description,i.append(a,s);let c=document.createElement("button");c.type="button",c.className="bloom-icon-btn",c.setAttribute("aria-label","Close plugin settings"),c.innerHTML=In(),c.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),be()}),r.append(i,c);let u=document.createElement("div");if(u.className="bloom-plugin-settings",e.settings)for(let[l,h]of Object.entries(e.settings.def)){let m=mr(e.name,l,h);m&&u.appendChild(m)}if(!u.childElementCount){let l=document.createElement("p");l.className="bloom-dialog-empty",l.textContent="No configurable settings.",u.appendChild(l)}o.append(r,u),t.append(n,o)}function pr(e){let t=document.createElement("section");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=lr(e.name);let a=document.createElement("h3");a.textContent=e.name,r.append(i,a);let s=document.createElement("div");if(s.className="bloom-card-controls",ur(e)){let w=document.createElement("button");w.type="button",w.className="bloom-icon-btn bloom-card-gear",w.setAttribute("aria-label",`${e.name} settings`),w.innerHTML=ar();let N=L=>{L.preventDefault(),L.stopPropagation(),fr(e)};w.addEventListener("click",N),w.addEventListener("pointerdown",L=>L.stopPropagation()),s.appendChild(w)}let c=Hn(e.name,Oe(e.name),!!e.required);c.querySelector("input")?.addEventListener("change",()=>{un(e.name)}),s.appendChild(c),o.append(r,s);let l=document.createElement("p");l.className="bloom-card-desc",l.textContent=e.description,n.append(o,l);let h=document.createElement("div");h.className="bloom-card-sep";let m=document.createElement("div");return m.className="bloom-card-footer",m.textContent=e.authors?.join(", ")||"\xA0",t.append(n,h,m),t}function Nn(e){J(),St(),Ge=!0;let t=document.createElement("button");t.type="button",t.className="bloom-settings-backdrop",t.setAttribute("aria-label","Close settings"),t.addEventListener("click",J);let n=document.createElement("div");n.className="bloom-settings-modal",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.setAttribute("aria-labelledby","bloom-settings-title"),n.tabIndex=-1,n.addEventListener("click",l=>l.stopPropagation());let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-brand";let i=document.createElement("span");i.className="bloom-settings-mark",i.innerHTML=wt();let a=document.createElement("h2");a.id="bloom-settings-title",a.textContent="Bloom++",r.append(i,a);let s=document.createElement("button");s.type="button",s.className="bloom-icon-btn",s.setAttribute("aria-label","Close"),s.innerHTML=In(),s.addEventListener("click",J),o.append(r,s),n.appendChild(o);let c=document.createElement("p");c.className="bloom-settings-sub",c.textContent="Plugins",n.appendChild(c);let u=document.createElement("div");u.className="bloom-plugin-grid";for(let l of Object.values(k))l.hidden||l.name==="Settings"||u.appendChild(pr(l));n.appendChild(u),e.append(t,n),n.focus(),se("settingsOpen",void 0)}function Rn(e){let t=Tn(36);e.style.width=`${t.size}px`,e.style.height=`${t.size}px`,e.style.left=`${Math.round(t.x)}px`,e.style.top=`${Math.round(t.y)}px`,e.style.right="auto",e.style.bottom="auto"}function gr(){let e=he();e.querySelector(".bloom-settings-fab")?.remove(),ze?.abort();let t=document.createElement("button");t.type="button",t.className="bloom-settings-fab",t.setAttribute("aria-label","Bloom++ settings"),t.innerHTML=wt(),t.addEventListener("click",()=>{fe(),Ge?J():Nn(e)}),e.appendChild(t);let n=new AbortController;ze=n;let o=()=>{kn(),Rn(t)};window.addEventListener("resize",o,{signal:n.signal}),Y(()=>Rn(t))}function br(e){if(e.key==="Escape"){if(Et){be(),e.stopPropagation();return}Ge&&(J(),e.stopPropagation())}}function On(){qe(),fe(),W(()=>Nn(he()))}var Dn=y({name:"Settings",description:"Bloom++ settings, docked next to Download the ChatGPT app.",authors:[T.p],required:!0,hidden:!0,enabledByDefault:!0,settings:ir,startAt:"HostShell",cleanupSelectors:[`#${yt}`],start(){gr(),ge(),Ke?.(),Ke=An(ge)},stop(){ze?.abort(),ze=null,Ke?.(),Ke=null,J(),g?.remove(),g=null,b=null,xt=!1},onSettingsChange:ge});var qn='form[data-type="unified-composer"], form.w-full[data-type]',Z=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),Ve=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),Bn=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),_n=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),hr=/stop streaming|stop generating|停止生成|停止输出|停止响应/;function v(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function j(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!v(r)))return r;return null}function $n(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function M(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=$n(e);return!!(hr.test(n)||/^stop$/i.test(n))}function B(){let t=Array.from(document.querySelectorAll(qn)).find(v);if(t instanceof HTMLElement)return t;let n=j(document,Z),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function K(){let e=Array.from(document.querySelectorAll(Z));return e.find(v)??e[0]??null}function Lt(){let e=K();return e?(e.innerText??e.textContent??"").replaceAll("\u200B","").trim().length===0:!0}function yr(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function Fn(e){let t=B();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!v(n))&&e(n))return n;return null}function Ue(){let e=B(),t=j(e,Ve)??j(document,Ve);return t&&!M(t)?t:Fn(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!M(n);let r=$n(n);return/^(send|send prompt|发送)$/i.test(r)&&!M(n)})}function Ct(){let e=Ue();return!!e&&yr(e)}function kt(){let e=B(),t=j(e,Bn,!0)??j(document,Bn,!0);if(t)return t;let n=j(e,_n)??j(document,_n);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&v(o)&&M(o))return o}return Fn(M)}function Q(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>n.textContent??"").join(`
`):e.innerText??e.textContent??""}function We(e){return e instanceof HTMLLinkElement&&(e.relList.contains("icon")||/\bicon\b/i.test(e.rel))}function ee(e){return!!e&&!e.startsWith("data:")&&e!=="undefined"}function jn(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function vr(e){let{head:t}=document;if(t)for(let n of Array.from(t.querySelectorAll("link")))n.id!==e&&We(n)&&n.remove()}function Kn(e,t,n="image/svg+xml"){let{head:o}=document;if(!o)return;vr(e);let r=jn(e);r?o.firstChild!==r&&o.prepend(r):(r=document.createElement("link"),r.id=e,r.rel="icon",r.type=t.startsWith("data:image/svg")||t.endsWith(".svg")?n:"",r.setAttribute("sizes","any"),o.prepend(r)),r.getAttribute("href")!==t&&r.setAttribute("href",t)}function Ye(e,t){let{head:n}=document;if(!n)return;jn(e)?.remove();let o=Array.from(n.querySelectorAll("link")).filter(We);if(o.length){ee(t)&&o[0].href!==t&&(o[0].href=t);return}if(!ee(t))return;let r=document.createElement("link");r.rel="icon",r.href=t,n.prepend(r)}function zn(e,t){let{head:n}=document;if(!n)return null;let o=new MutationObserver(r=>{for(let i of r){if(i.type==="attributes"&&We(i.target)&&i.target.id!==e){t(i.target.href);return}for(let a of i.addedNodes)if(We(a)&&a.id!==e){t(a.href);return}}});return o.observe(n,{childList:!0,subtree:!1,attributes:!0,attributeFilter:["href","rel"]}),o}function Xe(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=u=>{let l=n.indexOf(u);return l>=0&&n[l+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(u,l)=>{try{return document.querySelector(u)?.getAttribute(l)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function Je(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function xr(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!v(t))&&(M(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function Sr(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&v(e))}function Er(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&v(e))}function wr(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function Tt(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function Ze(){if(kt()||xr())return!0;let e=Ue();return e&&v(e)&&!M(e)?!1:!!(Sr()||Er()||wr())}var Lr=["original","badge","dot","hole","bg"],Gn=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge",default:!0},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg"}],Cr={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},kr={dark:{plate:"#212121",mark:"#ececec",ring:"#212121",glyph:"#ffffff"},light:{plate:"#ffffff",mark:"#0d0d0d",ring:"#ffffff",glyph:"#ffffff"}},Tr="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",Mr={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"};function Vn(e){return typeof e=="string"&&Lr.includes(e)}function Mt(e){return e==="original"||e==="badge"||e==="dot"}function Ar(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function ye(e,t="0 0 64 64"){let n=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${t}" width="64" height="64">${e}</svg>`;return`data:image/svg+xml;charset=utf-8,${encodeURIComponent(n)}`}function Pr(e){return`<g transform="translate(8 8) scale(2)" fill="${e}" fill-rule="evenodd"><path d="${Tr}"/></g>`}function ve(e,t){return`<rect width="64" height="64" rx="14" fill="${t}"/>${Pr(e)}`}function Rr(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function Ir(e){return`<image href="${Rr(e)}" width="64" height="64" preserveAspectRatio="xMidYMid meet"/>`}function Hr(e,t){return e==="rotate"?['<g transform="translate(51.5 51.5)"><g>',`<path d="M0-6.1 A6.1 6.1 0 1 1 -5.3 3.05" fill="none" stroke="${t}" stroke-width="2.15" stroke-linecap="round"/>`,'<animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.85s" repeatCount="indefinite"/>',"</g></g>"].join(""):e==="done"?`<path d="M46.6 51.7 L50.1 55.3 L56.8 47.4" fill="none" stroke="${t}" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>`:e==="ready"?[`<path d="M51.5 56.4 V46.8" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round"/>`,`<path d="M46.6 51.2 L51.5 46.2 L56.4 51.2" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`].join(""):[`<path d="M47.2 47.2 L55.8 55.8" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round"/>`,`<path d="M55.8 47.2 L47.2 55.8" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round"/>`].join("")}function xe(e,t,n,o="dark"){let r=kr[o],i=n&&!n.startsWith("data:")?n:"";if(e==="original")return t==="wait"?i||ye(ve(r.mark,r.plate)):Ar(Mr[t]);let a=t==="wait"?void 0:Cr[t];if(e==="hole")return ye(ve(a??r.mark,r.plate));if(e==="bg")return ye(ve(r.mark,a??r.plate));if(!a||t==="wait")return i||ye(ve(r.mark,r.plate));let s=e==="dot"?[`<circle cx="52.2" cy="52.2" r="10.4" fill="${r.ring}"/>`,`<circle cx="52.2" cy="52.2" r="7.7" fill="${a}"/>`].join(""):[`<circle cx="51.5" cy="51.5" r="12.15" fill="${r.ring}"/>`,`<circle cx="51.5" cy="51.5" r="9.55" fill="${a}"/>`,Hr(t,r.glyph)].join(""),c=i?Ir(i):ve(r.mark,r.plate);return ye(c+s)}function At(e,t,n="dark"){return{wait:xe(e,"wait",t,n),rotate:xe(e,"rotate",t,n),done:xe(e,"done",t,n),ready:xe(e,"ready",t,n),error:xe(e,"error",t,n)}}var Nr=new p("ChatStateFavicons"),G="bloom-chat-state-favicon",Xn=C({style:{type:3,description:"Favicon overlay",options:Gn}}),A="",tt="light",Jn=At("badge","",tt),It="wait",Ee=!1,H=!1,x=null,we="",Le="",Ce=!0,Se=null,Pt=null,ne=0,te,Qe=null,z=null,Rt=null,ke=!1,Un=new WeakSet,Or=400;function Ht(){let e=Xn.store.style;return Vn(e)?e:"badge"}function Dr(){return"auto"}function Zn(){return je(Dr())}function Wn(){let t=document.querySelector(`link[rel~="icon"]:not(#${G})`)?.href;return ee(t)?t:ee(A)?A:""}function S(e){It=e;let t=Ht();if(e==="wait"&&Mt(t)){Ye(G,A);return}Kn(G,Jn[e])}function et(){tt=Zn(),Jn=At(Ht(),A,tt),S(It)}function Br(){let e=Xe(),t=e?Je(e):Je("");return Ze()?(!we&&t&&(we=t),we||t):(we="",t)}function Qn(){Ee=!1,H=!1,x=null,we=""}function _r(e){Le=e,Qn(),Ce=!1,S("wait")}function eo(){if(!ke)return;let e=Xe()||location.pathname;if(Le&&e&&Le!==e){_r(e);return}e&&(Le=e);let t=Br(),n=Ze(),o=Lt(),r=Ct();if(Tt()&&!n){S("error"),Ee=!1,H=!1,x=null;return}if(n){Ee=!0,H=!1,x=t,S("rotate");return}if(Ee){let i=!!x&&!!t&&x===t;if(Ee=!1,i){H=!0,x=t,S("done");return}H=!1,x=null}if(H)if(!!(x&&t&&x!==t))H=!1,x=null;else if(o){S("done");return}else if(Ce){H=!1,S("ready");return}else{H=!1,S("wait");return}x=null,S(o?"wait":Ce?"ready":"wait")}function to(){let e=B();if(!(z&&Rt===e&&e.isConnected)){if(z?.disconnect(),Rt=e,!e||e===document.body){z=null;return}z=new MutationObserver(()=>nt()),z.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid","class"]})}}function nt(){!ke||ne||(ne=requestAnimationFrame(()=>{ne=0,ke&&(no(),to(),eo())}))}function Yn(){Ce=!0,nt()}function no(){let e=K();!e||Un.has(e)||(Un.add(e),e.addEventListener("input",Yn,{passive:!0}),e.addEventListener("compositionend",Yn,{passive:!0}))}var oo=y({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[T.p],tags:["chat","ui"],enabledByDefault:!0,settings:Xn,startAt:"HostReady",cleanupSelectors:[`#${G}`],start(){ke=!0,tt=Zn(),A=Wn()||A,et(),Qe?.disconnect(),Qe=zn(G,e=>{if(ee(e)&&(A=e),It==="wait"&&Mt(Ht())){Ye(G,A);return}et()}),Pt=Zt("schemeChange",()=>{let e=Wn();e&&(A=e),et()}),Se?.abort(),Se=new AbortController,window.addEventListener("popstate",nt,{signal:Se.signal}),no(),to(),te!==void 0&&clearInterval(te),te=setInterval(nt,Or),eo(),Nr.debug("favicon watch started")},stop(){ke=!1,ne&&cancelAnimationFrame(ne),ne=0,te!==void 0&&(clearInterval(te),te=void 0),Se?.abort(),Se=null,Pt?.(),Pt=null,z?.disconnect(),z=null,Rt=null,Qe?.disconnect(),Qe=null,Qn(),Le="",Ce=!0,Ye(G,A)},onSettingsChange:et});var ro=`.bloom-ih-hud {
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
`;var io=new p("InputHistory"),Nt=/\u200B/g,ao=10,so=500,lo=100,$r=8,Fr=120,jr=2e3,ot=10,rt=C({maxEntries:{type:4,description:"Max stored prompts",min:ao,max:so,default:lo},history:{type:5,description:"Stored prompts",render:ni},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),Ot=new Map,f=0,Dt="",P=!1,Me=!1,qt=0,Te=null,Bt,$t=null,co=!0;function E(){let e=rt.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function uo(e){let t=nn(Number(rt.store.maxEntries??lo),ao,so);return e.length>t?e.slice(e.length-t):e}function it(e){rt.store.entries=uo(e)}function Kr(e){return e.replaceAll(Nt,"").replace(/\n$/,"").trim()}function _t(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(Z);return n instanceof HTMLElement?n:K()}function zr(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!Q(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(Nt,"").trim().length===0,last:i.toString().replaceAll(Nt,"").trim().length===0}}catch{return{first:!0,last:!0}}}function mo(e,t){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch(i){io.debug("pm caret failed:",i)}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function fo(e){clearTimeout(Bt),Bt=setTimeout(()=>{if(e!==qt)return;Me=!1;let t=$t;t&&mo(t,co)},Fr)}function po(e,t,n){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r),Me=!0,$t=e,co=n;let i=++qt;try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch(a){io.debug("insertText failed:",a),e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),mo(e,n),fo(i)}function Gr(){let e=he(),t=e.querySelector(".bloom-ih-hud");return t||(t=document.createElement("div"),t.className="bloom-ih-hud",e.appendChild(t)),t}function oe(){document.getElementById("bloom-root")?.shadowRoot?.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function Vr(e,t){let n=Gr();n.textContent=e;let o=(t.closest("form")??B()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-$r)}px`,n.classList.add("bloom-ih-hud-on")}function Ft(e){let t=Kr(e);if(!t)return;let n=Date.now(),o=Ot.get(t);if(o&&n-o<jr)return;Ot.set(t,n);let r=E().filter(i=>i!==t);r.push(t),it(r),f=E().length,P=!1,oe()}function Ur(e,t){let n=E();if(!n.length&&e)return;f>=n.length&&(Dt=Q(t),f=n.length);let o=e?f-1:f+1;o<0||o>n.length||(f=o,P=!0,po(t,o===n.length?Dt:n[o],e),o<n.length?Vr(`${o+1} / ${n.length}`,t):oe())}function Wr(e){P=!1,oe(),po(e,Dt,!1),f=E().length}function Yr(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=_t(e.target)??_t(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&P&&!e.altKey&&!e.shiftKey){Wr(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){Ft(Q(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=E();if(!o){let i=zr(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||f<=0)||!n&&f>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),Ur(n,t))}function Xr(e){if(_t(e.target)){if(Me){fo(qt);return}P&&(P=!1,oe(),f=E().length)}}function Jr(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(Z);n instanceof HTMLElement&&Ft(Q(n))}function Zr(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(Ve);if(!n||!(n instanceof HTMLElement)||M(n))return;let o=K();o&&Ft(Q(o))}function Qr(e){if(!(!P||Me)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}P=!1,oe()}}function ei(){if(Te)return;Te=new AbortController;let{signal:e}=Te,t={capture:!0,signal:e};window.addEventListener("keydown",Yr,t),window.addEventListener("input",Xr,t),window.addEventListener("submit",Jr,t),window.addEventListener("click",Zr,t),window.addEventListener("pointerdown",Qr,t)}function ti(e){let t=E().slice();t.splice(e,1),it(t),f>t.length&&(f=t.length)}function ni(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=E().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(R=>R.toLowerCase().includes(a)):i,c=Math.max(1,Math.ceil(s.length/ot));n>=c&&(n=c-1);let u=s.slice(n*ot,n*ot+ot);e.replaceChildren();let l=document.createElement("input");if(l.className="bloom-ih-search",l.type="search",l.placeholder="Search history",l.autocomplete="off",l.value=t,l.addEventListener("input",()=>{t=l.value,n=0,r()}),e.appendChild(l),u.length){let R=document.createElement("div");R.className="bloom-ih-list",u.forEach((at,st)=>{let To=i.indexOf(at),Mo=E().length-1-To,lt=document.createElement("div");lt.className="bloom-ih-item";let re=document.createElement("button");re.type="button",re.className=`bloom-ih-body${o===st?"":" bloom-ih-clamp"}`,re.textContent=at,re.addEventListener("click",()=>{o=o===st?-1:st,r()});let ct=document.createElement("div");ct.className="bloom-ih-actions";let ie=document.createElement("button");ie.type="button",ie.title="Copy",ie.textContent="C",ie.addEventListener("click",()=>{rn(at)});let ae=document.createElement("button");ae.type="button",ae.title="Delete",ae.textContent="\xD7",ae.addEventListener("click",()=>{ti(Mo),r()}),ct.append(ie,ae),lt.append(re,ct),R.appendChild(lt)}),e.appendChild(R)}else{let R=document.createElement("p");R.className="bloom-ih-empty",R.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(R)}let h=document.createElement("div");h.className="bloom-ih-pager";let m=document.createElement("button");m.type="button",m.className="bloom-ih-btn",m.textContent="Prev",m.disabled=n<=0,m.addEventListener("click",()=>{n-=1,r()});let w=document.createElement("span");w.textContent=`${n+1} / ${c}`;let N=document.createElement("button");N.type="button",N.className="bloom-ih-btn",N.textContent="Next",N.disabled=n+1>=c,N.addEventListener("click",()=>{n+=1,r()});let L=document.createElement("button");L.type="button",L.className="bloom-ih-clear",L.textContent="Clear all",L.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(it([]),f=0,r())}),h.append(m,w,N,L),e.appendChild(h)};return r(),()=>{e.replaceChildren()}}var go=y({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[T.p],tags:["chat"],enabledByDefault:!0,settings:rt,startAt:"HostReady",managedStyle:"inputHistory",start(){V("inputHistory",ro),he(),f=E().length,P=!1,ei()},stop(){Te?.abort(),Te=null,oe(),Ot.clear(),clearTimeout(Bt),Me=!1,$t=null,P=!1},onSettingsChange(){let e=E(),t=uo(e);t.length!==e.length&&it(t),f>t.length&&(f=t.length)}});var jt="noShareLink",oi=['button[data-testid="share-chat-button"]'],ri=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],Kt=C({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function bo(e){return`${e.join(",")}{display:none!important}`}function ho(){let e=[];if(Kt.store.hideShareChat!==!1&&e.push(bo(oi)),Kt.store.hideShareProject!==!1&&e.push(bo(ri)),!e.length){q(jt);return}V(jt,e.join(`
`))}var yo=y({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[T.p],tags:["ui","privacy"],enabledByDefault:!1,startAt:"HostReady",settings:Kt,start:ho,onSettingsChange:ho,stop(){q(jt)}});var So="noDictation",ii=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]'],ai=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Eo=C({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function vo(e){return`${e.join(",")}{display:none!important}`}function xo(){let e=[vo(ii)];Eo.store.hideDictationSettings!==!1&&e.push(vo(ai)),V(So,e.join(`
`))}var wo=y({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[T.p],tags:["chat","ui"],enabledByDefault:!1,startAt:"HostReady",settings:Eo,start:xo,onSettingsChange:xo,stop(){q(So)}});var Ae=new p("Bloom"),Lo=!1,si=Date.now(),li=[Dn,oo,go,yo,wo];function zt(e){return new Promise(t=>setTimeout(t,e))}function ci(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var di=8e3,Co=300,ui=250;async function mi(){if(F())return await zt(Co),!0;for(;Date.now()-si<di;)if(await zt(ui),F())return await zt(Co),!0;return F()||gt()}function fi(){try{GM_registerMenuCommand?.("Bloom++ settings",On)}catch{}}function pi(){W(()=>{ue("HostShell"),Ae.info("host shell",$)}),Y(()=>{Ae.info("idle ready",$)}),_e(()=>{Wt(),ue("HostReady"),Ae.info("chrome ready",$)})}async function Gt(){await an()}async function Vt(){if(Lo)return;Lo=!0;for(let n of li)try{dn(n)}catch(o){Ae.error("register failed",n.name,o)}fn(),ue("Init"),fi(),pi();let e=()=>ue("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await ci(),!await mi()){Ae.warn("late islands not detected; waiting for menu",$);return}await vn()}var ko=typeof unsafeWindow<"u"?unsafeWindow:window;window===window.top&&!ko.Bloom&&(Object.defineProperty(ko,"Bloom",{value:Ut,writable:!1,configurable:!0}),Gt().then(()=>Vt()).catch(e=>console.error("[Bloom++] Fatal init error:",e)));})();
