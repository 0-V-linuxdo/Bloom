// ==UserScript==
// @name         Bloom++
// @namespace    https://github.com/0-V-linuxdo/Bloom
// @version      [20260919] v1.4.39
// @description  Void++-style plugin host for chatgpt.com. Tab favicon, input history, recent chats, reply notify, Recents status, wider thread, message times, streamer blur, custom home greeting, hide Share, Dictation, sidebar name, Download apps, upgrade CTAs, and ads.
// @author       0-V-linuxdo & Bloom contributors
// @homepageURL  https://github.com/0-V-linuxdo/Bloom
// @supportURL   https://github.com/0-V-linuxdo/Bloom/issues
// @icon         https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/assets/logos/app-icon/bloom-icon.svg
// @icon64       https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/assets/logos/app-icon/bloom-icon-64.png
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
// @grant        GM_notification
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// @connect      cdn.jsdelivr.net
// @compatible   chrome
// @compatible   firefox
// @compatible   edge
// @license      GPL-3.0-or-later
// @downloadURL  https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/userscript/Bloom.latest.user.js
// @updateURL    https://raw.githubusercontent.com/0-V-linuxdo/Bloom/refs/heads/main/userscript/Bloom.latest.user.js
// ==/UserScript==

/* Bloom++ [20260919] v1.4.39. SPDX-License-Identifier: GPL-3.0-or-later */

"use strict";(()=>{var sl=Object.defineProperty;var ll=(e,t)=>{for(var n in t)sl(e,n,{get:t[n],enumerable:!0})};var Qr={};ll(Qr,{REPO_URL:()=>Mi,Settings:()=>g,VERSION:()=>I,hasLateIslands:()=>ge,init:()=>Zr,initSettings:()=>Jr,isDocumentInteractive:()=>Ai,plugins:()=>F,requestChromeReady:()=>_n,requestIdleReady:()=>Be,requestShellReady:()=>Dn,whenChromeReady:()=>Bn,whenIdleReady:()=>On,whenShellReady:()=>In});var ee=new Map,Cn=!1;function cl(){return document.getElementById("bloom-root")?.shadowRoot??null}function dl(){return document.head??null}function He(){let e=cl();if(!e)return;let t=e.querySelector("style[data-bloom-plugins]");t||(t=document.createElement("style"),t.dataset.bloomPlugins="1",e.appendChild(t)),t.textContent=ul()}function Do(e,t){if(!Cn)return;let n=dl();if(!n)return;if(t.disabled){t.el&&(t.el.disabled=!0),He();return}if(t.el?.isConnected&&t.el.parentElement===n){t.el.textContent!==t.css&&(t.el.textContent=t.css),t.el.disabled=!1,He();return}t.el?.remove();let o=document.createElement("style");o.dataset.bloomStyle=e,o.textContent=t.css,n.appendChild(o),t.el=o,He()}function w(e,t){let n=ee.get(e);n?(n.css=t,n.disabled=!1):(n={css:t,disabled:!1,el:null},ee.set(e,n)),Cn&&Do(e,n)}function ei(){Cn=!0;for(let[e,t]of ee)Do(e,t);return He(),!0}function ti(e){let t=ee.get(e);t&&(t.disabled=!1,Cn&&Do(e,t))}function ni(e){let t=ee.get(e);t&&(t.disabled=!0,t.el&&(t.el.disabled=!0),He())}function b(e){let t=ee.get(e);t&&(t.el?.remove(),ee.delete(e),He())}function ul(){return Array.from(ee.values()).filter(e=>!e.disabled).map(e=>e.css).join(`
`)}var S=class{constructor(t){this.tag=t}prefix(){return`[Bloom++] [${this.tag}]`}info(...t){console.info(this.prefix(),...t)}warn(...t){console.warn(this.prefix(),...t)}error(...t){console.error(this.prefix(),...t)}debug(...t){console.debug(this.prefix(),...t)}};function h(e){return e}var _o=new Map;function Tn(e,t){let n=_o.get(e);return n||(n=new Set,_o.set(e,n)),n.add(t),()=>n.delete(t)}function pe(e,t){let n=_o.get(e);if(n)for(let o of Array.from(n))try{o(t)}catch{}}var ml="bloompp";function oi(){return new Promise((e,t)=>{let n=indexedDB.open(ml,1);n.onupgradeneeded=()=>{let o=n.result;o.objectStoreNames.contains("kv")||o.createObjectStore("kv")},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function ri(e){try{let t=await oi();return await new Promise((n,o)=>{let i=t.transaction("kv","readonly").objectStore("kv").get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})}catch{return}}async function ii(e,t){try{let n=await oi();await new Promise((o,r)=>{let a=n.transaction("kv","readwrite").objectStore("kv").put(t,e);a.onsuccess=()=>o(),a.onerror=()=>r(a.error)})}catch{}}function Lt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ie(e,t,n){return Math.min(n,Math.max(t,e))}function ai(e,t,n){let o=e.get(t);if(o!==void 0)return o;let r=n();return e.set(t,r),r}async function si(e){try{if(typeof GM_setClipboard=="function"){GM_setClipboard(e,"text");return}}catch{}try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}}function li(e,t){let n;return((...o)=>{n&&clearTimeout(n),n=setTimeout(()=>e(...o),t)})}var kn=new S("SettingsStore"),te="BloomSettings",fl=100;function An(e){if(Lt(e))return e;if(typeof e!="string"||!e)return null;try{let t=JSON.parse(e);if(Lt(t))return t;if(typeof t=="string"){let n=JSON.parse(t);return Lt(n)?n:null}return null}catch{return null}}var Mn=class{globalListeners=new Set;pathListeners=new Map;prefixListeners=new Map;defaultGetters=new Map;saveTimer=null;proxyCache=new WeakMap;constructor(t){this.plain=t,this.store=this.makeProxy(t),window.addEventListener("beforeunload",()=>this.flush(),{once:!0})}flush(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null),this.save()}setDefaultGetter(t,n){this.defaultGetters.set(t,n)}makeProxy(t,n=""){let o=this.proxyCache.get(t);if(o)return o;let r=new Proxy(t,{get:(i,a)=>{let s=i[a];if(s===void 0&&a!=="__proto__"){let l=n?`${n}.${a}`:a;for(let[d,c]of this.defaultGetters)if(l.startsWith(d)){let u=l.slice(d.length+1);if(u&&!u.includes(".")){let f=c(u);f!==void 0&&(i[a]=f,s=f);break}}}return Lt(s)?this.makeProxy(s,n?`${n}.${a}`:a):s},set:(i,a,s)=>{if(i[a]===s)return!0;i[a]=s;let l=n?`${n}.${a}`:a;return this.notifyListeners(l),!0},deleteProperty:(i,a)=>{if(!(a in i))return!0;delete i[a];let s=n?`${n}.${a}`:a;return this.notifyListeners(s),!0}});return this.proxyCache.set(t,r),r}invokeListeners(t,n){for(let o of Array.from(t))try{o(n)}catch(r){kn.error("Settings listener error:",r)}}notifyListeners(t){this.invokeListeners(this.globalListeners,t);let n=this.pathListeners.get(t);n&&this.invokeListeners(n,t);for(let[o,r]of Array.from(this.prefixListeners))t.startsWith(o)&&this.invokeListeners(r,t);this.scheduleSave()}scheduleSave(){this.saveTimer||(this.saveTimer=setTimeout(()=>{this.saveTimer=null,this.save()},fl))}save(){try{let t=JSON.stringify(this.plain);if(typeof GM_setValue=="function")try{GM_setValue(te,this.plain)}catch{try{GM_setValue(te,t)}catch(n){kn.warn("Failed to save settings to GM:",n)}}else try{localStorage.setItem(te,t)}catch{}ii(te,t).catch(n=>kn.warn("Failed to save settings to IndexedDB:",n))}catch(t){kn.error("Failed to save settings:",t)}}addGlobalChangeListener(t){this.globalListeners.add(t)}removeGlobalChangeListener(t){this.globalListeners.delete(t)}addChangeListener(t,n){this.addToMap(this.pathListeners,t,n)}removeChangeListener(t,n){this.removeFromMap(this.pathListeners,t,n)}addPrefixChangeListener(t,n){this.addToMap(this.prefixListeners,t,n)}removePrefixChangeListener(t,n){this.removeFromMap(this.prefixListeners,t,n)}addToMap(t,n,o){ai(t,n,()=>new Set).add(o)}removeFromMap(t,n,o){let r=t.get(n);r&&(r.delete(o),r.size||t.delete(n))}};var pl=new S("Settings"),gl={plugins:{}},g=new Mn(structuredClone(gl)),hl=(e,t)=>t?`plugins.${e}.${t}`:`plugins.${e}`;function bl(e,t){let n=e[t];if(n){if(n.default!==void 0)return n.default;if(n.type===3)return(n.options?.find(r=>r.default)??n.options?.[0])?.value;if(n.type===2)return!1;if(n.type===4)return n.min??0;if(n.type===0)return"";if(n.type===1)return 0}}function v(e){let t={def:e,pluginName:"",get store(){let n=t.pluginName;return n?(g.store.plugins[n]||(g.store.plugins[n]={}),g.store.plugins[n]):{}},get plain(){let n=t.pluginName;return n?g.plain.plugins[n]??{}:{}}};return t}function yl(e){try{if(typeof GM_getValue=="function")return GM_getValue(e)}catch{}}async function ci(){let e=null;if(e=An(yl(te)),e||(e=An(await ri(te))),!e)try{e=An(localStorage.getItem(te))}catch{e=null}if(e&&typeof e=="object"){let t=e.plugins;t&&typeof t=="object"&&(g.plain.plugins=t),pl.debug("Loaded settings")}}function di(e,t){t&&(t.pluginName=e,g.plain.plugins[e]||(g.plain.plugins[e]={}),g.setDefaultGetter(hl(e),n=>{if(n!=="enabled")return bl(t.def,n)}))}function ui(){return g.plain.plugins.Settings||(g.store.plugins.Settings={}),g.store.plugins.Settings}function Rn(){return ui().pinnedPlugins??[]}function mi(e){return Rn().includes(e)}function fi(e){let t=Rn(),n=t.includes(e);return g.store.plugins.Settings={...g.plain.plugins.Settings,pinnedPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}function Pn(){return ui().starredPlugins??[]}function pi(e){return Pn().includes(e)}function gi(e){let t=Pn(),n=t.includes(e);return g.store.plugins.Settings={...g.plain.plugins.Settings,starredPlugins:n?t.filter(o=>o!==e):[e,...t]},!n}var Nn=new S("PluginManager"),F={},Ct=new Set;function yi(e){if(F[e.name]){Nn.warn("Duplicate plugin",e.name);return}F[e.name]=e,di(e.name,e.settings)}function Oe(e){let t=F[e];if(!t)return!1;if(t.required)return!0;let n=g.plain.plugins[e]?.enabled;return typeof n=="boolean"?n:t.enabledByDefault!==!1}function vi(e){let t=F[e];if(!t||t.required)return;let n=!Oe(e);g.plain.plugins[e]||(g.store.plugins[e]={}),g.store.plugins[e].enabled=n,n?xi(t):vl(t),pe("pluginToggle",{name:e,enabled:n})}function xi(e,t=!1){if(!Ct.has(e.name)&&Oe(e.name))try{e.managedStyle&&ti(e.managedStyle),e.start?.(),Ct.add(e.name),e.settings&&g.addPrefixChangeListener(`plugins.${e.name}.`,()=>{Ct.has(e.name)&&e.onSettingsChange?.()}),t||Nn.debug("Started",e.name)}catch(n){Nn.error("Failed to start",e.name,n)}}function vl(e){if(Ct.has(e.name)){try{e.stop?.()}catch(t){Nn.error("Failed to stop",e.name,t)}for(let t of e.cleanupSelectors??[])try{document.querySelectorAll(t).forEach(n=>n.remove())}catch{}e.managedStyle&&(ni(e.managedStyle),b(e.managedStyle)),Ct.delete(e.name)}}function Tt(e){for(let t of Object.values(F))(t.startAt??"DOMContentLoaded")===e&&xi(t)}var hi=2,bi="defaultsRev";function wi(){for(let t of Object.values(F))g.plain.plugins[t.name]||(g.store.plugins[t.name]={enabled:t.enabledByDefault!==!1});let e=g.store.plugins.Settings??(g.store.plugins.Settings={});if(e[bi]!==hi){for(let t of["NoShareLink","NoDictation"]){let n=g.store.plugins[t]??(g.store.plugins[t]={});n.enabled=!1}e[bi]=hi}}var kt=!1,Hn=!1,$o=!1,Si=[],Li=[],Ci=[];function qo(e){let t=e.splice(0);for(let n of t)n()}function Mt(){kt||(kt=!0,qo(Si))}function jo(){Hn||(Hn=!0,kt||Mt(),qo(Li))}function Ti(){$o||($o=!0,kt||Mt(),Hn||jo(),qo(Ci))}function In(e){kt?e():Si.push(e)}function On(e){Hn?e():Li.push(e)}function Bn(e){$o?e():Ci.push(e)}function Dn(){Mt()}function Be(){Mt(),jo()}function _n(){Ti()}function Ei(e=4e3){return new Promise(t=>{let n=window;if(typeof n.requestIdleCallback=="function"){n.requestIdleCallback(()=>t(),{timeout:e});return}setTimeout(t,0)})}async function ki(){await Ei(4e3),Mt(),await Ei(4e3),jo(),Ti()}var y={p:"0-V-linuxdo"},I="[20260919] v1.4.39",Mi="https://github.com/0-V-linuxdo/Bloom";function xl(){try{return!!document.querySelector('a[href^="/c/"], a[href^="/g/"]')}catch{return!1}}function wl(){try{let e=document.querySelectorAll('[data-testid="profile-button"] img, [data-testid="accounts-profile-button"] img, nav img');for(let t of e)if(t instanceof HTMLImageElement&&t.isConnected&&t.naturalWidth>1)return!0;return!1}catch{return!1}}function Fo(){try{return!!document.querySelector('#prompt-textarea, [data-testid="prompt-textarea"], form[data-type="unified-composer"] [contenteditable="true"]')}catch{return!1}}function ge(){return Fo()?xl()||wl():!1}function Ai(){return ge()}var El=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'].join(","),Ri=['[role="menu"]','[role="dialog"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]",'[id^="headlessui-menu-items"]'].join(","),Sl=["[data-radix-popper-content-wrapper]","[data-radix-menu-content]","[data-floating-ui-portal] > div"].join(","),Ll="#bloom-root, #bloom-sidebar-panel, #bloom-rail-item, #bloom-account-item";function _e(e){return e.id==="bloom-root"||!!e.closest(Ll)}function Pi(e){let t=e.textContent||"";return/settings|设置|log\s?out|sign out|退出/.test(t)}function $n(e){if(e.querySelector('[role="tablist"], [role="tab"]'))return!0;let t=e.textContent||"";if(!/personalization|data controls|security|builder profile|\bgeneral\b|个性化|数据控制/.test(t))return!1;let n=e.getBoundingClientRect();return n.width>420&&n.height>360}function zo(e){if(!(e instanceof HTMLElement)||!e.isConnected||_e(e))return!1;let t=e.closest('[role="dialog"], [aria-modal="true"]');return t&&$n(t)?!1:e.getClientRects().length>0}function De(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function Cl(){let e=[];for(let t of document.querySelectorAll(El))!(t instanceof HTMLElement)||!t.isConnected||_e(t)||e.push(t);return e}function qn(e){if(!e.isConnected||_e(e))return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.left<window.innerWidth/3&&t.top<window.innerHeight&&t.bottom>0}function At(){return Cl().filter(qn)[0]??null}function Go(){let e=document.getElementById("stage-sidebar-tiny-bar");if(!(e instanceof HTMLElement)||!e.isConnected||_e(e))return null;let t=e.getBoundingClientRect();return t.width<8||t.height<40||t.left<0||t.left>=window.innerWidth/3?null:e}function Uo(e){let t=e,n=e.parentElement;n&&n.children.length===1&&!_e(n)&&!De(n)&&n.parentElement&&!De(n.parentElement)&&(t=n);let o=t.parentElement;if(o&&!De(o)&&!_e(o)&&o.children.length>1){let r=o.getAttribute("class")||"";if(/\bflex\b/.test(r)&&!/flex-col/.test(r)&&o.parentElement&&!De(o.parentElement))return o}return t}function Ni(){let e=document.querySelectorAll(Ri);for(let n of e)if(zo(n)&&!$n(n)&&Pi(n))return n;let t=document.querySelectorAll(Sl);for(let n of t){if(!zo(n)||!Pi(n)||$n(n))continue;let o=n.querySelector(Ri);return zo(o)&&!$n(o)?o:n}return null}function Hi(){let e=At();if(e){let t=Uo(e),n=t.parentElement;if(n&&!De(n))return n;if(!De(t))return t}return Go()}function Ii(e){let t=At();return t?e.composedPath().includes(t):!1}var Vo=["--main-surface-primary","--main-surface-secondary","--main-surface-tertiary","--sidebar-surface-primary","--text-primary","--text-secondary","--text-tertiary","--text-quaternary","--icon-primary","--icon-secondary","--border-xlight","--border-light","--border-medium","--border-heavy","--border-default","--link","--interactive-bg-secondary-hover","--interactive-label-primary-default","--message-surface","--bg-primary","--bg-secondary","--bg-tertiary","--bg-elevated-primary","--bg-elevated-secondary","--bg-secondary-surface","--bg-primary-inverted","--shadow-long"],Tl={light:{"--main-surface-primary":"#fcfcfc","--main-surface-secondary":"#f9f9f9","--main-surface-tertiary":"#ececec","--sidebar-surface-primary":"#fcfcfc","--text-primary":"#0d0d0d","--text-secondary":"#5d5d5d","--text-tertiary":"#8f8f8f","--text-quaternary":"#00000030","--icon-primary":"#0d0d0d","--icon-secondary":"#5d5d5d","--border-xlight":"rgba(0, 0, 0, 0.05)","--border-light":"rgba(0, 0, 0, 0.05)","--border-medium":"rgba(0, 0, 0, 0.15)","--border-heavy":"rgba(0, 0, 0, 0.15)","--border-default":"rgba(0, 0, 0, 0.1)","--link":"#2964aa","--interactive-bg-secondary-hover":"rgba(0, 0, 0, 0.05)","--interactive-label-primary-default":"#ffffff","--message-surface":"#e9e9e980","--bg-primary":"#ffffff","--bg-secondary":"#e8e8e8","--bg-tertiary":"#f3f3f3","--bg-elevated-primary":"#ffffff","--bg-elevated-secondary":"#f3f3f3","--bg-secondary-surface":"#f9f9f9","--bg-primary-inverted":"#000000","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62)"},dark:{"--main-surface-primary":"#000000","--main-surface-secondary":"#212121","--main-surface-tertiary":"#414141","--sidebar-surface-primary":"#171717","--text-primary":"#ffffff","--text-secondary":"#cdcdcd","--text-tertiary":"#8f8f8f","--text-quaternary":"#5d5d5d","--icon-primary":"#ffffff","--icon-secondary":"#cdcdcd","--border-xlight":"rgba(255, 255, 255, 0.05)","--border-light":"rgba(255, 255, 255, 0.05)","--border-medium":"rgba(255, 255, 255, 0.15)","--border-heavy":"rgba(255, 255, 255, 0.15)","--border-default":"rgba(255, 255, 255, 0.15)","--link":"#ececec","--interactive-bg-secondary-hover":"rgba(255, 255, 255, 0.1)","--interactive-label-primary-default":"#0d0d0d","--message-surface":"#303030","--bg-primary":"#353535","--bg-secondary":"#303030","--bg-tertiary":"#414141","--bg-elevated-primary":"#1b1b1b","--bg-elevated-secondary":"#000000","--bg-secondary-surface":"#000000","--bg-primary-inverted":"#ffffff","--shadow-long":"0 8px 12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.12)"}};function Wo(e){return e==="auto"||e==="light"||e==="dark"}function kl(e){let t=e.trim(),n=t.match(/^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i);if(n)return{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])};let o=t.match(/^#([0-9a-f]{3,8})$/i);if(!o)return null;let r=o[1];r.length===3||r.length===4?r=[...r].map(a=>a+a).join("").slice(0,6):r=r.slice(0,6);let i=Number.parseInt(r,16);return Number.isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}}function Ml(e){return(.2126*e.r+.7152*e.g+.0722*e.b)/255}function Ko(e){let t=kl(e);return t?Ml(t)>.55?"light":"dark":null}function Al(){let e=document.documentElement;if(e.classList.contains("dark"))return"dark";if(e.classList.contains("light"))return"light";let t=(e.getAttribute("data-theme")||e.getAttribute("data-color-scheme")||"").toLowerCase();if(t==="light"||t==="dark")return t;try{let n=getComputedStyle(e),o=Ko(n.getPropertyValue("--main-surface-primary"));if(o)return o;let r=Ko(n.backgroundColor);if(r)return r;let i=document.body?getComputedStyle(document.body).backgroundColor:"",a=Ko(i);if(a)return a;let s=n.colorScheme||"";if(/\blight\b/.test(s)&&!/\bdark\b/.test(s))return"light";if(/\bdark\b/.test(s)&&!/\blight\b/.test(s))return"dark"}catch{}return"light"}function Oi(e){return e==="auto"?Al():e}function Rl(e){try{let t=getComputedStyle(document.documentElement);for(let n of Vo){let o=t.getPropertyValue(n).trim();o?e.style.setProperty(n,o):e.style.removeProperty(n)}}catch{}}function Bi(e,t,n){let o=Tl[t];if(n){Rl(e);for(let r of Vo)e.style.getPropertyValue(r)||e.style.setProperty(r,o[r])}else for(let r of Vo)e.style.setProperty(r,o[r])}function Di(e){let t=window.matchMedia("(prefers-color-scheme: dark)"),n=()=>{document.visibilityState==="visible"&&e()};return t.addEventListener("change",e),document.addEventListener("visibilitychange",n),window.addEventListener("focus",e),()=>{t.removeEventListener("change",e),document.removeEventListener("visibilitychange",n),window.removeEventListener("focus",e)}}var Yo=`/* Sidebar rail chip + body-docked panel. No overlay, no FAB, no popover.
 * Rail rest is transparent like the native account row. Panel / plugin dialog
 * follow chatgpt.com Settings (\`bg-token-bg-primary\`, shadow-long, inverted switch). */

.bloom-rail-item,
.bloom-account-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin: 0;
  padding: 8px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--text-primary, inherit);
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.25;
  cursor: pointer;
  text-align: left;
  box-sizing: border-box;
  min-width: 0;
}

.bloom-rail-item {
  flex: 0 0 auto;
  z-index: 2;
  background: transparent;
}

.bloom-rail-item:hover,
.bloom-rail-item:focus-visible,
.bloom-account-item:hover,
.bloom-account-item:focus-visible {
  background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
  outline: none;
}

.bloom-rail-item svg,
.bloom-account-item svg {
  width: 20px;
  height: 20px;
  flex: 0 0 auto;
  color: var(--icon-primary, currentColor);
}

.bloom-rail-mark {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  flex: 0 0 auto;
  border-radius: 999px;
}

.bloom-rail-mark svg {
  width: 20px;
  height: 20px;
}

.bloom-rail-item > span,
.bloom-account-item > span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bloom-rail-item.bloom-rail-compact {
  width: auto;
  padding: 8px;
  justify-content: center;
}

.bloom-rail-item.bloom-rail-compact > span:not(.bloom-rail-mark) {
  display: none;
}

.bloom-rail-item.bloom-rail-compact .bloom-rail-mark {
  width: 24px;
  height: 24px;
}

#bloom-sidebar-panel {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: min(56rem, calc(100vw - 2rem));
  max-height: min(80vh, 40rem);
  overflow: auto;
  overscroll-behavior: contain;
  margin: 0;
  padding: 1.5rem;
  border-radius: 16px;
  color: var(--text-primary, inherit);
  font: 14px/1.4 ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
  background: var(--bg-primary, #fff);
  border: 1px solid var(--border-xlight, rgba(0, 0, 0, 0.05));
  box-shadow: var(--shadow-long, 0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62));
}

#bloom-sidebar-panel.bloom-rail-dock {
  position: fixed;
  left: 50%;
  top: 50%;
  right: auto;
  bottom: auto;
  transform: translate(-50%, -50%);
  width: min(56rem, calc(100vw - 2rem));
  max-height: min(80vh, 40rem);
  margin: 0;
  z-index: 10000;
  pointer-events: auto;
  box-shadow: var(--shadow-long, 0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62));
}

.bloom-settings-list[hidden],
#bloom-sidebar-panel[hidden] {
  display: none !important;
}

.bloom-settings-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 0;
}

.bloom-settings-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  margin: 0;
}

.bloom-settings-titles {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
  flex: 1;
}

.bloom-settings-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
}

.bloom-settings-mark {
  width: 20px;
  height: 20px;
  display: grid;
  place-items: center;
  color: var(--icon-primary, inherit);
  flex: 0 0 auto;
}

.bloom-settings-mark svg {
  width: 20px;
  height: 20px;
}

.bloom-settings-head h2 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.5rem;
  color: var(--text-primary, inherit);
}

.bloom-settings-sub {
  margin: 0;
  font-size: 0.75rem;
  line-height: 1rem;
  color: var(--text-secondary, #5d5d5d);
}

.bloom-section-head {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0;
}

.bloom-section-head h3 {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  color: var(--text-primary, inherit);
}

.bloom-section-head p {
  margin: 0;
  font-size: 0.75rem;
  line-height: 1rem;
  color: var(--text-secondary, #5d5d5d);
}

.bloom-icon-btn {
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--text-secondary, #5d5d5d);
  display: grid;
  place-items: center;
  cursor: pointer;
  flex: 0 0 auto;
}

.bloom-icon-btn:hover {
  color: var(--text-primary, inherit);
  background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
}

.bloom-icon-btn svg {
  width: 16px;
  height: 16px;
  pointer-events: none;
}

.bloom-plugin-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin: 0;
  border-bottom: 0;
}

.bloom-plugin-tab {
  position: relative;
  margin: 0;
  padding: 0.375rem 0.75rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--text-secondary, #5d5d5d);
  font: inherit;
  font-size: 0.8125rem;
  cursor: pointer;
}

.bloom-plugin-tab:hover {
  background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
}

.bloom-plugin-tab-active {
  color: var(--text-primary, inherit);
  background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
}

.bloom-search-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
}

.bloom-search-input {
  flex: 1;
  min-width: 0;
  height: 32px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid var(--border-default, var(--border-medium, rgba(0, 0, 0, 0.1)));
  background: var(--bg-primary, #fff);
  color: inherit;
  font: inherit;
  font-size: 0.8125rem;
}

.bloom-search-input:focus {
  outline: 2px solid color-mix(in srgb, var(--text-primary, #0d0d0d) 28%, transparent);
  outline-offset: 1px;
}

.bloom-search-filter {
  width: 7.5rem;
  height: 32px;
  flex: 0 0 auto;
  border-radius: 8px;
  border: 1px solid var(--border-default, var(--border-medium, rgba(0, 0, 0, 0.1)));
  background: var(--bg-primary, #fff);
  color: inherit;
  font: inherit;
  font-size: 0.75rem;
  padding: 0 8px;
}

.bloom-tab-empty {
  margin: 0;
  padding: 2rem 0;
  text-align: center;
  font-size: 0.8125rem;
  color: var(--text-secondary, #5d5d5d);
}

.bloom-plugin-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

@media (max-width: 720px) {
  .bloom-plugin-list {
    grid-template-columns: 1fr;
  }
}

.bloom-plugin-card {
  display: flex;
  flex-direction: column;
  padding: 0;
  min-width: 0;
  overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid var(--border-light, rgba(0, 0, 0, 0.05));
  background: var(--bg-primary, #fff);
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
  min-width: 0;
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
  width: 14px;
  height: 14px;
  padding: 0;
  margin: 0;
  border: 0;
  border-radius: 0;
  color: var(--text-primary, inherit);
  background: transparent;
  line-height: 0;
}

.bloom-card-icon svg {
  width: 14px;
  height: 14px;
  display: block;
}

.bloom-card-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.875rem;
  font-weight: 500;
  min-width: 0;
}

.bloom-card-controls {
  display: flex;
  align-items: center;
  gap: 0.125rem;
  flex-shrink: 0;
}

.bloom-card-star,
.bloom-card-pin,
.bloom-card-settings {
  color: var(--text-tertiary, var(--text-secondary, #8e8e8e));
}

.bloom-card-star-active,
.bloom-card-pin-active {
  color: var(--text-primary, inherit);
}

.bloom-card-controls .bloom-icon-btn {
  width: 22px;
  height: 22px;
}

.bloom-card-controls .bloom-icon-btn svg {
  width: 14px;
  height: 14px;
}

.bloom-icon-btn.bloom-card-star,
.bloom-icon-btn.bloom-card-pin,
.bloom-icon-btn.bloom-card-settings {
  width: 22px;
  height: 22px;
}

.bloom-icon-btn.bloom-card-star svg,
.bloom-icon-btn.bloom-card-pin svg,
.bloom-icon-btn.bloom-card-settings svg {
  width: 14px;
  height: 14px;
}

.bloom-card-desc {
  font-size: 0.8125rem;
  color: var(--text-secondary, #5d5d5d);
  line-height: 1.5;
  margin-top: 0.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bloom-card-separator {
  height: 1px;
  background: var(--border-light, rgba(0, 0, 0, 0.1));
}

.bloom-card-footer {
  display: flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  gap: 0.375rem;
}

.bloom-card-author {
  font-size: 0.7rem;
  color: var(--text-tertiary, var(--text-secondary, #8e8e8e));
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#bloom-plugin-layer {
  position: fixed;
  inset: 0;
  z-index: 10001;
  pointer-events: auto;
  background: transparent;
}

#bloom-plugin-dialog {
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: min(32rem, calc(100vw - 2rem));
  max-height: min(80vh, calc(100vh - 2rem));
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
  padding: 1.5rem;
  overflow: hidden;
  color: var(--text-primary, inherit);
  font: 14px/1.4 ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
  background: var(--bg-primary, #fff);
  border: 1px solid var(--border-xlight, rgba(0, 0, 0, 0.05));
  border-radius: 16px;
  box-shadow: var(--shadow-long, 0 8px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.62));
  pointer-events: auto;
}

.bloom-plugin-dialog-close {
  position: absolute;
  right: 1rem;
  top: 1rem;
  z-index: 1;
}

.bloom-plugin-dialog-header {
  text-align: left;
  padding-right: 2.5rem;
}

.bloom-plugin-dialog-header h2 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.bloom-plugin-dialog-sub {
  margin: 2px 0 0;
  font-size: 0.8125rem;
  line-height: 1.25rem;
  color: var(--text-secondary, #5d5d5d);
}

.bloom-plugin-dialog-rule {
  height: 1px;
  width: 100%;
  margin: 0;
  border: 0;
  background: var(--border-light, rgba(0, 0, 0, 0.1));
}

.bloom-plugin-dialog-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-height: 0;
}

.bloom-plugin-dialog-field-label {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-primary, inherit);
}

.bloom-plugin-dialog-authors {
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.25rem;
  color: var(--text-secondary, #5d5d5d);
}

.bloom-plugin-dialog-settings {
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
}

.bloom-plugin-dialog-settings-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
  overflow: auto;
  min-height: 0;
  overscroll-behavior: contain;
}

.bloom-plugin-dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
}

.bloom-plugin-dialog-reset {
  height: 28px;
  margin: 0;
  padding: 0 10px;
  border-radius: 6px;
  border: 1px solid var(--border-default, var(--border-medium, rgba(0, 0, 0, 0.1)));
  background: var(--bg-primary, #fff);
  color: inherit;
  font: inherit;
  font-size: 0.75rem;
  cursor: pointer;
}

.bloom-plugin-dialog-reset:hover {
  background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
}

.bloom-plugin-dialog-label {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 0;
  flex: 1;
}

.bloom-plugin-dialog-label-title {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-primary, inherit);
}

.bloom-plugin-dialog-label-desc {
  font-size: 0.75rem;
  line-height: 1.25rem;
  font-weight: 400;
  color: var(--text-secondary, #5d5d5d);
}

.bloom-plugin-dialog-component {
  min-width: 0;
}

.bloom-dialog-empty {
  margin: 0;
  color: var(--text-secondary, #5d5d5d);
  font-size: 0.8125rem;
}

.bloom-toggle {
  display: inline-flex;
  cursor: pointer;
  user-select: none;
  flex: 0 0 auto;
}

.bloom-switch {
  position: relative;
  width: 36px;
  height: 20px;
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
  background: var(--bg-tertiary, var(--main-surface-tertiary, #ececec));
}

.bloom-switch span::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 999px;
  background: var(--bg-primary, #fff);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
}

.bloom-switch input:checked + span {
  background: var(--bg-primary-inverted, #0d0d0d);
}

.bloom-switch input:checked + span::after {
  transform: translateX(16px);
}

.bloom-switch input:disabled + span {
  opacity: 0.45;
}

.bloom-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 0;
  padding: 0;
}

.bloom-field-stack {
  flex-direction: column;
  align-items: stretch;
  gap: 0.375rem;
}

.bloom-field-label,
.bloom-field > span:first-child,
.bloom-field > summary {
  font-size: 0.8125rem;
  font-weight: 500;
  min-width: 0;
  flex: 1;
}

.bloom-field-block {
  display: block;
  padding-top: 2px;
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
  color: var(--text-secondary, #5d5d5d);
}

.bloom-field-block[open] > summary::before {
  content: "\u25BE ";
}

.bloom-field select,
.bloom-field input[type="text"],
.bloom-field input[type="number"] {
  height: 28px;
  min-width: 7.5rem;
  max-width: 52%;
  border-radius: 6px;
  border: 1px solid var(--border-default, var(--border-medium, rgba(0, 0, 0, 0.1)));
  background: var(--bg-primary, #fff);
  color: inherit;
  padding: 0 8px;
  font: inherit;
  font-size: 0.75rem;
}

.bloom-field.bloom-field-stack input[type="text"],
.bloom-field.bloom-field-stack input[type="number"] {
  max-width: none;
  width: 100%;
}

.bloom-field-block button {
  height: 28px;
  border-radius: 6px;
  border: 1px solid var(--border-default, var(--border-medium, rgba(0, 0, 0, 0.1)));
  background: var(--bg-primary, #fff);
  color: inherit;
  padding: 0 10px;
  font: inherit;
  font-size: 0.75rem;
  cursor: pointer;
}

.bloom-field input[type="range"] {
  flex: 1;
  min-width: 0;
  width: 100%;
  accent-color: var(--bg-primary-inverted, #0d0d0d);
}

.bloom-field-slider {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.bloom-field-slider > span {
  min-width: 3ch;
  font-size: 0.75rem;
  color: var(--text-secondary, #5d5d5d);
  font-variant-numeric: tabular-nums;
  text-align: right;
  flex-shrink: 0;
}

.bloom-appearance-row {
  padding: 0 0 0.25rem;
}

.bloom-appearance-row select {
  max-width: 9rem;
}
`;var Nl="bloom-root",z="bloom-rail-item",Un="bloom-account-item",be="bloom-sidebar-panel",qt="bloom-plugin-dialog",Jn="bloom-plugin-layer",Kn="bloom-settings-css",Hl=2e3,Bt=v({appearance:{type:3,description:"Color scheme for the Bloom++ shell and composed favicons.",options:[{label:"Follow host",value:"auto",default:!0},{label:"Light",value:"light"},{label:"Dark",value:"dark"}]}}),qi=null,Il=null,ie=!1,Qo=[],jn=null,Vn=null,oe=null,zn=null,Y=null,Dt=null,Rt,$e=0,_t=0,Pt=0,Nt=null,Ht=null,Wn=null,ji=null,It=null,Xo=[],Yn=!1,Ol=[{value:"all",label:"All"},{value:"enabled",label:"Enabled"},{value:"disabled",label:"Disabled"}],Bl=[{id:"favorites",label:"Favorites"},{id:"all",label:"All"},{id:"chat",label:"Chat"},{id:"ui",label:"UI"},{id:"privacy",label:"Privacy"}],Zn="",$t="all",ae="all";function Qn(){return'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001z"/></svg>'}function Fi(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'}function Dl(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>'}function _l(e){let t='<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';return e?`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${t}</svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`}function $l(e){let t='<path d="M12 17v5"/>';return e?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path fill="currentColor" d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}<path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>`}var ql={ChatStateFavicons:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',InputHistory:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',NoShareLink:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',NoDictation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',NoSidebarIdentity:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',RecentTopics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',Cleaner:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>'};function jl(e){return e.icon||ql[e.name]||Qn()}function zi(){return Wo(Bt.store.appearance)?Bt.store.appearance:"auto"}function Fl(){let e=document.createElement("div");e.className="bloom-field bloom-appearance-row";let t=document.createElement("span");t.className="bloom-field-label",t.textContent="Appearance";let n=document.createElement("select");n.setAttribute("aria-label","Appearance");let o=Bt.def.appearance,r=o.type===3?o.options??[]:[];for(let i of r){let a=document.createElement("option");a.value=i.value,a.textContent=i.label,n.appendChild(a)}return n.value=zi(),n.addEventListener("change",()=>{Wo(n.value)&&(Bt.store.appearance=n.value)}),e.append(t,n),e}function Jo(e,t,n){e&&(e.setAttribute("data-bloom-scheme",t),Bi(e,t,n),e.style.removeProperty("--bloom-rail-surface"))}function Gi(e){e&&(e.style.removeProperty("--bloom-rail-surface"),e.style.removeProperty("--bg-primary"))}function Ot(){let e=zi(),t=Oi(e),n=e==="auto";Jo(qi,t,n);let o=document.getElementById(be);o instanceof HTMLElement&&Jo(o,t,n);let r=document.getElementById(qt);r instanceof HTMLElement&&Jo(r,t,n);let i=document.getElementById(z);i instanceof HTMLElement&&Gi(i),pe("schemeChange",{scheme:t,pref:e})}function Ui(){document.querySelectorAll(".bloom-settings-fab, .bloom-settings-panel, .bloom-settings-backdrop, [popover].bloom-settings-panel, #bloom-menu-panel, #bloom-plugin-layer, #bloom-plugin-dialog").forEach(e=>e.remove())}function Ki(){if(w("settings",Yo),document.getElementById(Kn)||!document.head||document.querySelector('style[data-bloom-style="settings"]'))return;let e=document.createElement("style");e.id=Kn,e.textContent=Yo,document.head.appendChild(e)}function zl(e){if(document.body){e();return}let t=!1,n=()=>{t||!document.body||(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0})}function Gl(){for(let e of Qo)e();Qo=[]}function Vi(e,t,n){let o=document.createElement("label");o.className="bloom-toggle";let r=document.createElement("span");r.className="bloom-switch";let i=document.createElement("input");i.type="checkbox",i.checked=t,i.disabled=n,i.setAttribute("aria-label",`${e} enabled`);let a=document.createElement("span");return r.append(i,a),o.append(r),o}function Ul(e){return e.replace(/[_-]+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2").replace(/\s+/g," ").trim().replace(/\b\w/g,t=>t.toUpperCase())}function nr(e){return e.settings?Object.entries(e.settings.def).filter(([,t])=>!t.hidden):[]}function Kl(e){return nr(e).length>0}function Gn(e){if(e.default!==void 0)return e.default;if(e.type===3)return(e.options?.find(n=>n.default)??e.options?.[0])?.value;if(e.type===2)return!1;if(e.type===4)return e.min??0;if(e.type===0)return"";if(e.type===1)return 0}function Vl(e,t){let n=document.createElement("div");n.className="bloom-plugin-dialog-label";let o=document.createElement("span");if(o.className="bloom-plugin-dialog-label-title",o.textContent=Ul(e),n.appendChild(o),t.description){let r=document.createElement("span");r.className="bloom-plugin-dialog-label-desc",r.textContent=t.description,n.appendChild(r)}return n}function Wl(e,t,n){if(n.hidden)return null;let o=n.type===4||n.type===0||n.type===1||n.type===5,r=document.createElement("div");r.className=o?"bloom-field bloom-field-stack":"bloom-field",r.appendChild(Vl(t,n));let i=g.store.plugins[e]??(g.store.plugins[e]={});if(n.type===5){if(!n.render)return null;let a=document.createElement("div");return a.className="bloom-plugin-dialog-component",Qo.push(n.render(a)),r.appendChild(a),r}if(n.type===3&&n.options){let a=document.createElement("select");for(let s of n.options){let l=document.createElement("option");l.value=s.value,l.textContent=s.label,a.appendChild(l)}return a.value=String(i[t]??Gn(n)??n.options[0].value),a.addEventListener("change",()=>{i[t]=a.value}),r.appendChild(a),r}if(n.type===4){let a=document.createElement("div");a.className="bloom-field-slider";let s=document.createElement("input");s.type="range",s.min=String(n.min??0),s.max=String(n.max??100),s.value=String(i[t]??Gn(n)??n.min??0);let l=document.createElement("span");return l.textContent=s.value,s.addEventListener("input",()=>{i[t]=Number(s.value),l.textContent=s.value}),a.append(s,l),r.appendChild(a),r}if(n.type===2){let a=Vi(t,!!i[t],!1),s=a.querySelector("input");return s?.addEventListener("change",()=>{s&&(i[t]=s.checked)}),r.appendChild(a),r}if(n.type===0||n.type===1){let a=document.createElement("input");return a.type=n.type===1?"number":"text",a.value=String(i[t]??Gn(n)??""),a.spellcheck=!1,a.addEventListener("change",()=>{i[t]=n.type===1?Number(a.value):a.value}),r.appendChild(a),r}return r}function _i(e,t){let n=document.createElement("div");n.className=t?`bloom-plugin-dialog-field ${t}`:"bloom-plugin-dialog-field";let o=document.createElement("div");return o.className="bloom-plugin-dialog-field-label",o.textContent=e,n.appendChild(o),n}function Yl(e){if(!window.confirm("Reset this plugin's settings to defaults? This cannot be undone."))return;let t=g.store.plugins[e.name]??(g.store.plugins[e.name]={});for(let[n,o]of nr(e)){if(n==="enabled"||o.type===5)continue;let r=Gn(o);r!==void 0&&(t[n]=r)}Yi(e)}function Wi(e){e.key==="Escape"&&(!document.getElementById(Jn)&&!document.getElementById(qt)||(e.stopPropagation(),qe()))}function Xl(){Yn||(document.addEventListener("keydown",Wi),Yn=!0)}function Jl(){Yn&&(document.removeEventListener("keydown",Wi),Yn=!1)}function qe(){Gl(),Jl(),document.getElementById(Jn)?.remove(),document.getElementById(qt)?.remove()}function Yi(e){if(qe(),!document.body)return;let t=document.createElement("div");t.id=Jn,t.className="bloom-plugin-layer",t.addEventListener("pointerdown",re),t.addEventListener("pointerup",re),t.addEventListener("click",c=>{c.stopPropagation(),c.target===t&&qe()});let n=document.createElement("div");n.id=qt,n.className="bloom-plugin-dialog",n.addEventListener("pointerdown",re),n.addEventListener("pointerup",re),n.addEventListener("click",re);let o=document.createElement("button");o.type="button",o.className="bloom-icon-btn bloom-plugin-dialog-close",o.setAttribute("aria-label","Close"),o.innerHTML=Fi(),o.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),qe()});let r=document.createElement("div");r.className="bloom-plugin-dialog-header";let i=document.createElement("h2");if(i.textContent=e.name,r.appendChild(i),e.description){let c=document.createElement("p");c.className="bloom-plugin-dialog-sub",c.textContent=e.description,r.appendChild(c)}let a=document.createElement("hr");if(a.className="bloom-plugin-dialog-rule",n.append(o,r,a),e.authors?.length){let c=_i("Authors"),u=document.createElement("p");u.className="bloom-plugin-dialog-authors",u.textContent=e.authors.join(", "),c.appendChild(u),n.appendChild(c)}let s=_i("Settings","bloom-plugin-dialog-settings"),l=document.createElement("div");l.className="bloom-plugin-dialog-settings-list";let d=nr(e);if(d.length)for(let[c,u]of d){let f=Wl(e.name,c,u);f&&l.appendChild(f)}if(!l.childElementCount){let c=document.createElement("p");c.className="bloom-dialog-empty",c.textContent="No configurable settings.",l.appendChild(c)}if(s.appendChild(l),n.appendChild(s),d.length){let c=document.createElement("div");c.className="bloom-plugin-dialog-footer";let u=document.createElement("button");u.type="button",u.className="bloom-plugin-dialog-reset",u.textContent="Reset",u.addEventListener("click",()=>Yl(e)),c.appendChild(u),n.appendChild(c)}t.appendChild(n),document.body.appendChild(t),Xl(),Ot()}function Zl(e){let t=document.createElement("div");t.className="bloom-plugin-card";let n=document.createElement("div");n.className="bloom-card-body";let o=document.createElement("div");o.className="bloom-card-top";let r=document.createElement("div");r.className="bloom-card-name";let i=document.createElement("span");i.className="bloom-card-icon",i.innerHTML=jl(e);let a=document.createElement("span");a.className="bloom-card-title",a.textContent=e.name,a.title=e.name,r.append(i,a);let s=document.createElement("div");s.className="bloom-card-controls";let l=pi(e.name),d=document.createElement("button");if(d.type="button",d.className=`bloom-icon-btn bloom-card-star${l?" bloom-card-star-active":""}`,d.setAttribute("aria-label",l?"Remove from favorites":"Add to favorites"),d.innerHTML=_l(l),d.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation();let m=gi(e.name);pe("pluginStar",{name:e.name,starred:m})}),s.appendChild(d),!e.required){let p=mi(e.name),m=document.createElement("button");m.type="button",m.className=`bloom-icon-btn bloom-card-pin${p?" bloom-card-pin-active":""}`,m.setAttribute("aria-label",p?"Unpin from top":"Pin to top"),m.innerHTML=$l(p),m.addEventListener("click",x=>{x.preventDefault(),x.stopPropagation();let A=fi(e.name);pe("pluginPin",{name:e.name,pinned:A})}),s.appendChild(m)}if(Kl(e)){let p=document.createElement("button");p.type="button",p.className="bloom-icon-btn bloom-card-settings",p.setAttribute("aria-label",`${e.name} settings`),p.innerHTML=Dl(),p.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation(),Yi(e)}),s.appendChild(p)}let c=Vi(e.name,Oe(e.name),!!e.required),u=c.querySelector("input");if(u?.addEventListener("click",p=>p.stopPropagation()),u?.addEventListener("change",()=>{vi(e.name)}),s.appendChild(c),o.append(r,s),n.appendChild(o),e.description){let p=document.createElement("div");p.className="bloom-card-desc",p.textContent=e.description,n.appendChild(p)}let f=document.createElement("div");f.className="bloom-card-separator";let L=document.createElement("div");L.className="bloom-card-footer";let E=document.createElement("div");return E.className="bloom-card-author",E.textContent=e.authors?.filter(Boolean).join(", ")||"\xA0",L.appendChild(E),t.append(n,f,L),t}function Xi(){return Object.values(F).filter(e=>!e.hidden&&e.name!=="Settings")}function Ji(e,t){return t==="all"||t==="favorites"?!0:(e.tags??[]).includes(t)}function Ql(e){return`${e.name} ${e.description??""} ${(e.tags??[]).join(" ")}`.toLowerCase()}function ec(){return Zn.trim()?"No plugins match your search.":ae==="favorites"?"No favorites yet. Star a plugin to see it here.":"No plugins available."}function tc(){let e=Xi();return Bl.filter(t=>t.id==="favorites"||t.id==="all"?!0:e.some(n=>Ji(n,t.id)))}function nc(){if(It){It.replaceChildren();for(let e of tc()){let t=document.createElement("button");t.type="button",t.className=`bloom-plugin-tab${ae===e.id?" bloom-plugin-tab-active":""}`,t.textContent=e.label,t.addEventListener("click",()=>{ae=e.id,he()}),It.appendChild(t)}}}function oc(){let e=Xi();if(ae==="favorites"){let t=new Set(Pn());e=e.filter(n=>t.has(n.name))}else ae!=="all"&&(e=e.filter(t=>Ji(t,ae)));return $t==="enabled"&&(e=e.filter(t=>Oe(t.name))),$t==="disabled"&&(e=e.filter(t=>!Oe(t.name))),e}function he(){if(!Nt)return;nc();let e=oc();Wn&&(Wn.placeholder=`Search ${e.length} plugins...`);let t=e,n=Zn.trim().toLowerCase();if(n&&(t=t.filter(o=>Ql(o).includes(n))),ae!=="favorites"){let o=Rn();if(o.length){let r=new Map(o.map((i,a)=>[i,a]));t=t.slice().sort((i,a)=>{let s=r.has(i.name),l=r.has(a.name);return s!==l?s?-1:1:s?(r.get(i.name)??0)-(r.get(a.name)??0):i.name.localeCompare(a.name)})}}Nt.replaceChildren();for(let o of t)Nt.appendChild(Zl(o));Ht&&(Ht.hidden=t.length>0,Ht.textContent=ec())}function re(e){e.stopPropagation()}function Zo(e){e.preventDefault(),e.stopPropagation(),typeof e.stopImmediatePropagation=="function"&&e.stopImmediatePropagation()}function or(){document.getElementById(z)?.setAttribute("aria-expanded",ie?"true":"false")}function rc(e){if(!e.isConnected)return!1;let t=e.getBoundingClientRect();return t.width>40&&t.height>16&&t.left>=0&&t.right<=window.innerWidth+16&&t.top<window.innerHeight&&t.bottom>0}function rr(){qe(),Zn="",$t="all",ae="all",document.getElementById(be)?.remove(),ie=!1,or()}function ic(e){let t=document.createElement("div");t.id=e,t.addEventListener("pointerdown",re),t.addEventListener("pointerup",re),t.addEventListener("click",re);let n=document.createElement("div");n.className="bloom-settings-list";let o=document.createElement("div");o.className="bloom-settings-head";let r=document.createElement("div");r.className="bloom-settings-titles";let i=document.createElement("div");i.className="bloom-settings-brand";let a=document.createElement("span");a.className="bloom-settings-mark",a.innerHTML=Qn();let s=document.createElement("h2");s.textContent="Bloom++",i.append(a,s);let l=document.createElement("p");l.className="bloom-settings-sub",l.textContent="Toggle features. Some need a reload. Click the sliders icon to configure.",r.append(i,l);let d=document.createElement("button");d.type="button",d.className="bloom-icon-btn",d.setAttribute("aria-label","Close"),d.innerHTML=Fi(),d.addEventListener("click",rr),o.append(r,d),n.appendChild(o),n.appendChild(Fl());let c=document.createElement("div");c.className="bloom-plugin-tabs",n.appendChild(c);let u=document.createElement("div");u.className="bloom-search-bar";let f=document.createElement("input");f.type="search",f.className="bloom-search-input",f.setAttribute("aria-label","Search plugins"),f.placeholder="Search plugins...",f.addEventListener("input",()=>{Zn=f.value,he()});let L=document.createElement("select");L.className="bloom-search-filter",L.setAttribute("aria-label","Filter plugins");for(let m of Ol){let x=document.createElement("option");x.value=m.value,x.textContent=m.label,L.appendChild(x)}L.value=$t,L.addEventListener("change",()=>{$t=L.value,he()}),u.append(f,L),n.appendChild(u);let E=document.createElement("div");E.className="bloom-plugin-list",n.appendChild(E);let p=document.createElement("p");return p.className="bloom-tab-empty",p.hidden=!0,n.appendChild(p),t.appendChild(n),Nt=E,Ht=p,Wn=f,ji=L,It=c,he(),t}function ac(e){e.classList.add("bloom-rail-dock")}function sc(){let e=document.getElementById(z);return e instanceof HTMLElement&&e.isConnected&&e.parentElement&&qn(e)?e:null}function lc(){if(document.getElementById(be)?.remove(),!document.body)return;let e=ic(be);ac(e),document.body.appendChild(e),ie=!0,qe(),Ot(),or(),pe("settingsOpen",void 0),console.info("[Bloom++] settings open",{version:I,dock:"center",rail:!!sc()})}function ir(){let e=document.getElementById(be);if(e instanceof HTMLElement&&e.isConnected&&rc(e)){rr();return}e?.remove(),lc()}function cc(){let e=document.createElement("button");return e.type="button",e.id=z,e.className="bloom-rail-item",e.setAttribute("aria-controls",be),e.setAttribute("aria-expanded",ie?"true":"false"),e.innerHTML=`<span class="bloom-rail-mark">${Qn()}</span><span>Bloom++</span>`,e.addEventListener("pointerdown",t=>t.stopPropagation()),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),ir()}),e}function $i(e,t){let o=e.parentElement?.getBoundingClientRect().width??e.getBoundingClientRect().width;e.classList.toggle("bloom-rail-compact",t===!0||o>0&&o<80)}function dc(e){let t=e.querySelector("img");if(t instanceof HTMLElement){let n=t.getBoundingClientRect();if(n.width>8&&n.height>8)return t}for(let n of e.querySelectorAll('[class*="rounded-full"]')){if(!(n instanceof HTMLElement))continue;let o=n.getBoundingClientRect();if(o.width>8&&o.height>8)return n}return null}function uc(e,t){for(let n of e.querySelectorAll("div, span, p")){if(!(n instanceof HTMLElement)||t&&(n===t||n.contains(t)||t.contains(n))||(n.textContent||"").trim().length<2)continue;let r=n.getBoundingClientRect();if(r.width>16&&r.height>8&&r.height<40)return n}return null}function ne(e,t,n){let o=`${n}px`;e.style.getPropertyValue(t)!==o&&e.style.setProperty(t,o)}function Zi(e,t){if(e.classList.contains("bloom-rail-compact"))return;let n=e.querySelector(".bloom-rail-mark");if(!(n instanceof HTMLElement)||!e.isConnected||!t.isConnected)return;let o=dc(t),r=getComputedStyle(t),i=Number.parseFloat(r.paddingTop),a=Number.parseFloat(r.paddingBottom);if(Number.isFinite(i)&&ne(e,"padding-top",Math.round(i)),Number.isFinite(a)&&ne(e,"padding-bottom",Math.round(a)),o){let s=o.getBoundingClientRect(),l=Math.max(20,Math.round(s.width));ne(n,"width",l),ne(n,"height",Math.max(20,Math.round(s.height)));let d=e.getBoundingClientRect(),c=Math.round(s.left-d.left);c>=0&&c<=40&&ne(e,"padding-left",c);let u=uc(t,o);if(u){let f=u.getBoundingClientRect(),L=n.getBoundingClientRect(),E=Math.round(f.left-L.right);E>=0&&E<=24&&ne(e,"gap",E)}}else{let s=Number.parseFloat(r.paddingLeft),l=Number.parseFloat(r.columnGap||r.gap);Number.isFinite(s)&&ne(e,"padding-left",Math.round(s)),Number.isFinite(l)&&l>0&&ne(e,"gap",Math.round(l))}Gi(e)}function er(e){return e.tagName==="NAV"||e.id==="stage-slideover-sidebar"||e.id==="stage-sidebar-tiny-bar"}function mc(){if(Dt?.isConnected&&Y){Y.observe(Dt,{childList:!0});return}tr()}function fc(e){if(er(e))return!1;try{if(e.getBoundingClientRect().height>240)return!1}catch{return!1}return!0}function pc(e,t){!t||!e||requestAnimationFrame(()=>{if(e.isConnected){Pt=0;return}Pt+=1,_t=Date.now()+Math.min(8e3,250*2**Math.min(Pt,5))})}function gc(){$e||Date.now()<_t||($e=requestAnimationFrame(()=>{$e=0,!(Date.now()<_t)&&(document.getElementById(z)?.isConnected||Xn())}))}function Xn(){if(!document.body)return;Y?.disconnect();let e=null,t=!1;try{let n=document.getElementById(z);e=n instanceof HTMLButtonElement?n:cc();let o=At(),r=Go();if(o){let i=Uo(o),a=i.parentElement;if(er(i)||a&&er(a))return;e.isConnected&&e.nextElementSibling===i||(i.before(e),t=!0),$i(e),Zi(e,o)}else r?(e.parentElement!==r&&(r.appendChild(e),t=!0),$i(e,!0)):e.isConnected&&!qn(e)&&(e.remove(),e=null)}finally{pc(e,t),mc(),or()}}function tr(){let e=Hi();!e||!fc(e)||Dt===e&&Y||(Y?.disconnect(),Dt=e,Y=new MutationObserver(()=>{document.getElementById(z)?.isConnected||gc()}),Y.observe(e,{childList:!0}))}function hc(){Xn(),tr(),Rt===void 0&&(Rt=window.setInterval(()=>{let e=document.getElementById(z);if(!(e instanceof HTMLElement)||!e.isConnected)Date.now()>=_t&&Xn();else{Pt=0;let t=At();t&&Zi(e,t)}tr()},Hl))}function bc(){Rt!==void 0&&(clearInterval(Rt),Rt=void 0),$e&&cancelAnimationFrame($e),$e=0,_t=0,Pt=0,Y?.disconnect(),Y=null,Dt=null}function yc(e){zn===e&&oe||(oe?.disconnect(),zn=e,oe=new MutationObserver(()=>{if(!e.isConnected){oe?.disconnect(),oe=null,zn=null;return}Qi(e)}),oe.observe(e,{childList:!0}))}function Qi(e){if(yc(e),e.querySelector(`#${Un}`))return;let t=document.createElement("button");t.type="button",t.id=Un,t.className="bloom-account-item",t.setAttribute("role","menuitem"),t.innerHTML=`${Qn()}<span>Bloom++</span>`,t.addEventListener("pointerdown",Zo),t.addEventListener("pointerup",Zo),t.addEventListener("click",n=>{Zo(n),ir()}),e.insertBefore(t,e.firstChild)}function Fn(){let e=Ni();return e?(Qi(e),!0):!1}function vc(e){Ii(e)&&(queueMicrotask(Fn),requestAnimationFrame(()=>{Fn()}),window.setTimeout(Fn,60),window.setTimeout(Fn,180))}function xc(){Vn?.abort();let e=new AbortController;Vn=e,document.addEventListener("click",vc,{signal:e.signal})}function wc(){Vn?.abort(),Vn=null,oe?.disconnect(),oe=null,zn=null}function ea(){Be(),zl(()=>{Ki(),Ui(),Xn(),ir()})}var ta=h({name:"Settings",description:"Bloom++ settings, pinned above the account row.",authors:[y.p],required:!0,hidden:!0,enabledByDefault:!0,settings:Bt,startAt:"HostReady",cleanupSelectors:[`#${Nl}`,`#${z}`,`#${Un}`,`#${be}`,`#${Jn}`,`#${qt}`,`#${Kn}`,"#bloom-menu-panel"],start(){Ki(),Ui(),hc(),xc(),jn?.(),jn=Di(Ot),Ot(),Xo=[Tn("pluginToggle",()=>{ie&&he()}),Tn("pluginPin",()=>{ie&&he()}),Tn("pluginStar",()=>{ie&&he()})]},stop(){bc(),wc(),jn?.(),jn=null;for(let e of Xo)e();Xo=[],rr(),document.getElementById(z)?.remove(),document.getElementById(Un)?.remove(),document.getElementById(Kn)?.remove(),qi=null,Il=null,Nt=null,Ht=null,Wn=null,ji=null,It=null,ie=!1},onSettingsChange:Ot});var ra='form[data-type="unified-composer"], form.w-full[data-type]',je=["#prompt-textarea",'[data-testid="prompt-textarea"]',"[data-mobile-composer-prompt]",'form[data-type="unified-composer"] [contenteditable="true"][role="textbox"]'].join(", "),eo=['button[data-testid="send-button"]',"#composer-submit-button","button[data-composer-submit]",'form[data-type="unified-composer"] button[aria-label^="Send" i]','form[data-type="unified-composer"] button[aria-label="Send prompt"]','form[data-type="unified-composer"] button[aria-label="\u53D1\u9001"]'].join(", "),na=['button[data-testid="stop-button"]','button[data-testid="composer-stop-button"]','form[data-type="unified-composer"] button[aria-label*="Stop streaming" i]','form[data-type="unified-composer"] button[aria-label*="Stop generating" i]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u751F\u6210"]','form[data-type="unified-composer"] button[aria-label*="\u505C\u6B62\u8F93\u51FA"]'].join(", "),oa=['[data-testid="composer-trailing-actions"]','[data-testid="composer-footer-actions"]','[grid-area="trailing"]','div[slot="trailing"]'].join(", "),Ec=/stop streaming|stop generating|停止生成|停止输出|停止响应/,Sc='[contenteditable="false"], button, [role="button"]';function O(e){if(!(e instanceof HTMLElement)||!e.isConnected||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.visibility!=="hidden"&&t.display!=="none"}function ye(e,t,n=!1){let o=Array.from(e.querySelectorAll(t));for(let r of o)if(r instanceof HTMLElement&&!(n&&!O(r)))return r;return null}function ia(e){return`${e.getAttribute("aria-label")||""} ${e.getAttribute("title")||""}`.replace(/\s+/g," ").trim()}function N(e){let t=e.getAttribute("data-testid")||"";if(t==="stop-button"||t==="composer-stop-button"||/\bstop\b/i.test(t)&&!/\bsend\b/i.test(t))return!0;let n=ia(e);return!!(Ec.test(n)||/^stop$/i.test(n))}function se(){let t=Array.from(document.querySelectorAll(ra)).find(O);if(t instanceof HTMLElement)return t;let n=ye(document,je),o=n?.closest("form")??n?.parentElement;return o instanceof HTMLElement?o:document.body}function ve(){let e=Array.from(document.querySelectorAll(je));return e.find(O)??e[0]??null}function Lc(e,t){if(!e||e===t||!t.contains(e))return!1;let n=e.closest(Sc);return!!n&&n!==t&&t.contains(n)}function ar(e,t){let n=[];try{let o=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),r=o.nextNode();for(;r;){let i=r.parentElement;i&&Lc(i,t)||n.push(r.textContent??""),r=o.nextNode()}}catch{return e.innerText??e.textContent??""}return n.join("")}function to(e){let t=e??ve();return t?ar(t,t).replaceAll("\u200B","").trim().length>0:!1}function sr(e){return!to(e)}function Cc(e){return e instanceof HTMLButtonElement&&e.disabled||e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true"?!0:e.classList.contains("opacity-50")||e.classList.contains("cursor-not-allowed")}function aa(e){let t=se();if(!t||t===document.body)return null;for(let n of t.querySelectorAll("button"))if(!(!(n instanceof HTMLElement)||!O(n))&&e(n))return n;return null}function no(){let e=se(),t=ye(e,eo)??ye(document,eo);return t&&!N(t)?t:aa(n=>{if((n.getAttribute("data-testid")||"")==="send-button"||n.id==="composer-submit-button"||n.hasAttribute("data-composer-submit"))return!N(n);let r=ia(n);return/^(send|send prompt|发送)$/i.test(r)&&!N(n)})}function lr(){let e=no();return!!e&&Cc(e)}function cr(){let e=se(),t=ye(e,na,!0)??ye(document,na,!0);if(t)return t;let n=ye(e,oa)??ye(document,oa);if(n){for(let o of n.querySelectorAll("button"))if(o instanceof HTMLElement&&O(o)&&N(o))return o}return aa(N)}function Fe(e){let t=e.querySelectorAll("p");return t.length?Array.from(t,n=>ar(n,e)).join(`
`):ar(e,e)}function dr(e,t=!1){let n=e.pmViewDesc?.view;if(n)try{let i=n.state.selection.constructor,a=t?i.atStart(n.state.doc):i.atEnd(n.state.doc);n.dispatch(n.state.tr.setSelection(a).scrollIntoView());return}catch{}let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),r.collapse(t),o.removeAllRanges(),o.addRange(r)}function sa(e,t,n=!1){e.focus();let o=window.getSelection();if(!o)return;let r=document.createRange();r.selectNodeContents(e),o.removeAllRanges(),o.addRange(r);try{t?document.execCommand("insertText",!1,t):document.execCommand("delete")}catch{e.textContent=t}e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:t?"insertText":"deleteContent"})),dr(e,n)}var la="bloom-host-icon",jt="data-bloom-host-rel",ur="not all",mr=0,ca=0,Tc=400;function da(e){mr+=1;try{e()}finally{mr-=1}}function oo(e){if(!(e instanceof HTMLLinkElement))return!1;if(e.relList.contains("icon"))return!0;let t=e.rel;return t?/(?:^|\s)shortcut\s+icon(?:\s|$)/i.test(t):!1}function ze(e){return!!e&&!e.startsWith("data:")&&!e.startsWith("blob:")&&e!=="undefined"}function ua(e){let t=document.getElementById(e);return t instanceof HTMLLinkElement?t:null}function kc(e){return e.startsWith("data:image/png")||e.endsWith(".png")?{type:"image/png",sizes:"32x32"}:e.startsWith("data:image/svg")||e.endsWith(".svg")?{type:"image/svg+xml",sizes:"any"}:{type:"",sizes:"any"}}function Mc(e,t){if(e.lastElementChild===t)return;let n=Date.now();n-ca<Tc||(ca=n,e.appendChild(t))}function Ac(e,t){for(let n of e.querySelectorAll("link"))!(n instanceof HTMLLinkElement)||n.id===t||oo(n)&&(n.getAttribute(jt)||n.setAttribute(jt,n.rel),n.media!==ur&&(n.media=ur),n.rel!==la&&(n.rel=la))}function Rc(e){for(let t of e.querySelectorAll(`link[${jt}]`)){if(!(t instanceof HTMLLinkElement))continue;let n=t.getAttribute(jt);n&&(t.rel=n),t.removeAttribute(jt),t.media===ur&&t.removeAttribute("media")}}function fr(e,t){let{head:n}=document;!n||!t||da(()=>{Ac(n,e);let o=ua(e),{type:r,sizes:i}=kc(t);o?Mc(n,o):(o=document.createElement("link"),o.id=e,o.rel="icon",n.appendChild(o)),o.rel!=="icon"&&(o.rel="icon"),o.type!==r&&(o.type=r),o.getAttribute("sizes")!==i&&o.setAttribute("sizes",i),o.getAttribute("href")!==t&&o.setAttribute("href",t)})}function ma(e,t){let{head:n}=document;n&&da(()=>{ua(e)?.remove(),Rc(n)})}function fa(e,t){let{head:n}=document;if(!n)return null;let o=0,r=new MutationObserver(i=>{if(mr)return;let a=!1,s;for(let l of i){l.type==="attributes"&&l.target instanceof HTMLLinkElement&&(l.target.id===e?a=!0:oo(l.target)&&(a=!0,ze(l.target.href)&&(s=l.target.href)));for(let d of l.removedNodes)oo(d)&&d.id===e&&(a=!0);for(let d of l.addedNodes)oo(d)&&d.id!==e&&(a=!0,ze(d.href)&&(s=d.href))}a&&(o||(o=requestAnimationFrame(()=>{o=0,t(s)})))});return r.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["href","rel","sizes"]}),r}var pa=/\/c\/([a-zA-Z0-9_-]{8,})/i;function B(){let e=new URLSearchParams(location.search||""),t=e.get("conversationId")||e.get("conversation_id")||e.get("threadId")||e.get("thread_id")||e.get("chatId")||e.get("chat_id")||e.get("id")||"",n=location.pathname.split("/").filter(Boolean),o=d=>{let c=n.indexOf(d);return c>=0&&n[c+1]||""},r=o("c")||o("chat")||o("conversation")||"",i=n.slice(-1)[0]||"",a=/^[a-z0-9_-]{8,}$/i.test(i)?i:"",s=(d,c)=>{try{return document.querySelector(d)?.getAttribute(c)||""}catch{return""}};return[s("[data-conversation-id]","data-conversation-id")||s("[data-thread-id]","data-thread-id")||s("[data-chat-id]","data-chat-id")||"",t,r||a].filter(Boolean).join("|")}function Ge(e){let t=`${location.origin}${location.pathname}`;return e?`${t}|${e}`:`${t}|draft`}function Ft(e){if(!e)return"";try{return(/^https?:/i.test(e)?new URL(e,location.origin).pathname:e).match(pa)?.[1]??""}catch{return e.match(pa)?.[1]??""}}function ro(){let e=Ft(location.pathname);if(e)return e;let n=B().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return""}function Pc(){let e=document.querySelector('div[slot="trailing"]');if(!e)return null;for(let t of e.querySelectorAll("button"))if(!(!(t instanceof HTMLElement)||!O(t))&&(N(t)||/\bStop\b|停止/.test(t.textContent||"")))return t;return null}function Nc(){let e=document.querySelector("div.bg-token-main-surface-tertiary div.bg-token-text-primary");return!!(e&&O(e))}function Hc(){let e=document.querySelector('button[data-testid="conversation-options-button"] + div svg.animate-spin');return!!(e&&O(e))}function Ic(){try{return!!document.querySelector('[data-message-author-role="assistant"][aria-busy="true"], .result-streaming[aria-busy="true"]')}catch{return!1}}function le(){return!!document.querySelector('[data-testid="toast-error"]')||!!document.querySelector('button[data-testid="regenerate-thread-error-button"]')}function D(){if(cr()||Pc()||Ic())return!0;let e=no();return e&&O(e)&&!N(e)?!1:!!(Nc()||Hc())}var Oc=["original","badge","dot","hole","bg"],ba=[{label:"Emoji",value:"original"},{label:"Badge",value:"badge"},{label:"Dot",value:"dot"},{label:"Tint",value:"hole"},{label:"Fill",value:"bg",default:!0}],ya={rotate:"#3B82F6",done:"#22C55E",ready:"#F59E0B",error:"#EF4444"},io="#FCFCFC",Bc="#111111",ga="#111111",Dc="#ffffff",_c="#212121",$c="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z",qc={rotate:"\u{1F504}",done:"\u2714\uFE0F",ready:"\u{1F44D}",error:"\u{1F6AB}"},ao=32,ha=64;function va(e){return typeof e=="string"&&Oc.includes(e)}function jc(e){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${e}</text></svg>`)}`}function so(e){let t=document.createElement("canvas");t.width=ao,t.height=ao;let n=t.getContext("2d");return n?(n.scale(ao/ha,ao/ha),e(n),t.toDataURL("image/png")):""}function Fc(e,t,n,o,r,i){e.beginPath(),e.moveTo(t+i,n),e.arcTo(t+o,n,t+o,n+r,i),e.arcTo(t+o,n+r,t,n+r,i),e.arcTo(t,n+r,t,n,i),e.arcTo(t,n,t+o,n,i),e.closePath()}function lo(e,t,n=!0){e.save(),e.translate(8,8),e.scale(2,2);let o=new Path2D($c);n&&(e.strokeStyle=Bc,e.lineWidth=1.35,e.lineJoin="round",e.lineCap="round",e.stroke(o)),e.fillStyle=t,e.fill(o,"evenodd"),e.restore()}function zc(e,t,n){let o=ya[t];if(n==="dot"){e.beginPath(),e.arc(52.2,52.2,10.4,0,Math.PI*2),e.fillStyle=ga,e.fill(),e.beginPath(),e.arc(52.2,52.2,7.7,0,Math.PI*2),e.fillStyle=o,e.fill();return}if(e.beginPath(),e.arc(51.5,51.5,12.15,0,Math.PI*2),e.fillStyle=ga,e.fill(),e.beginPath(),e.arc(51.5,51.5,9.55,0,Math.PI*2),e.fillStyle=o,e.fill(),e.strokeStyle=Dc,e.lineWidth=2.2,e.lineCap="round",e.lineJoin="round",t==="rotate"){e.beginPath(),e.arc(51.5,51.5,6.1,-Math.PI/2,Math.PI*.7),e.stroke();return}if(t==="done"){e.beginPath(),e.moveTo(46.6,51.7),e.lineTo(50.1,55.3),e.lineTo(56.8,47.4),e.stroke();return}if(t==="ready"){e.beginPath(),e.moveTo(51.5,56.4),e.lineTo(51.5,46.8),e.moveTo(46.6,51.2),e.lineTo(51.5,46.2),e.lineTo(56.4,51.2),e.stroke();return}e.beginPath(),e.moveTo(47.2,47.2),e.lineTo(55.8,55.8),e.moveTo(55.8,47.2),e.lineTo(47.2,55.8),e.stroke()}function zt(e,t){if(e==="original")return t==="wait"?so(o=>lo(o,io)):jc(qc[t]);let n=t==="wait"?void 0:ya[t];return so(e==="hole"?o=>lo(o,n??io):e==="bg"?o=>{o.fillStyle=n??_c,Fc(o,0,0,64,64,14),o.fill(),lo(o,io,!1)}:o=>{lo(o,io),t!=="wait"&&zc(o,t,e==="dot"?"dot":"badge")})}function xa(e){return{wait:zt(e,"wait"),rotate:zt(e,"rotate"),done:zt(e,"done"),ready:zt(e,"ready"),error:zt(e,"error")}}var Gc=new S("ChatStateFavicons"),we="bloom-chat-state-favicon",Ca=v({style:{type:3,description:"Favicon overlay",options:ba}}),Ve="",uo={wait:"",rotate:"",done:"",ready:"",error:""},mo="wait",Ke=!1,X=!1,_=null,Ut="",Kt="",Wt=!0,Gt=null,We=0,Ue,co=null,xe=null,pr=null,Vt=!1,wa=new WeakSet,Uc=400;function Kc(){let e=Ca.store.style;return va(e)?e:"bg"}function Vc(){let t=document.querySelector(`link[rel~="icon"]:not(#${we})`)?.href;return ze(t)?t:ze(Ve)?Ve:""}function $(e){if(mo===e){let t=document.getElementById(we);if(t instanceof HTMLLinkElement&&t.getAttribute("href")===uo[e])return}mo=e,fr(we,uo[e])}function Ea(){uo=xa(Kc()),$(mo)}function Wc(){let e=B(),t=e?Ge(e):Ge("");return D()?(!Ut&&t&&(Ut=t),Ut||t):(Ut="",t)}function Ta(){Ke=!1,X=!1,_=null,Ut=""}function Yc(e){Kt=e,Ta(),Wt=!1,$("wait")}function Sa(e,t){return!e&&Wt&&!t}function ka(){if(!Vt)return;let e=B()||location.pathname;if(Kt&&e&&Kt!==e){Yc(e);return}e&&(Kt=e);let t=Wc(),n=D(),o=sr(),r=lr();if(le()&&!n){$("error"),Ke=!1,X=!1,_=null;return}if(n){Ke||(Wt=!1),Ke=!0,X=!1,_=t,$("rotate");return}if(Ke){let i=!!_&&!!t&&_===t;if(Ke=!1,i){X=!0,_=t,$("done");return}X=!1,_=null}if(X)if(!!(_&&t&&_!==t))X=!1,_=null;else if(o){$("done");return}else if(Sa(o,r)){X=!1,$("ready");return}else{X=!1,$("wait");return}_=null,o?$("wait"):Sa(o,r)?$("ready"):$("wait")}function Ma(){let e=se();if(!(xe&&pr===e&&e.isConnected)){if(xe?.disconnect(),pr=e,!e||e===document.body){xe=null;return}xe=new MutationObserver(()=>fo()),xe.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-label","aria-disabled","disabled","data-testid"]})}}function fo(){!Vt||We||(We=requestAnimationFrame(()=>{We=0,Vt&&(Aa(),Ma(),ka())}))}function La(){to()&&(Wt=!0),fo()}function Aa(){let e=ve();!e||wa.has(e)||(wa.add(e),e.addEventListener("input",La,{passive:!0}),e.addEventListener("compositionend",La,{passive:!0}))}var Ra=h({name:"ChatStateFavicons",description:"Streaming, done, ready, and error on the tab favicon.",authors:[y.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="8" cy="9" r="1.25" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>',enabledByDefault:!0,settings:Ca,startAt:"DOMContentLoaded",cleanupSelectors:[`#${we}`],start(){Vt=!0,Ve=Vc()||Ve,Ea(),co?.disconnect(),co=fa(we,e=>{ze(e)&&(Ve=e),fr(we,uo[mo])}),Gt?.abort(),Gt=new AbortController,window.addEventListener("popstate",fo,{signal:Gt.signal}),Aa(),Ma(),Ue!==void 0&&clearInterval(Ue),Ue=setInterval(fo,Uc),ka(),Gc.debug("favicon watch started")},stop(){Vt=!1,We&&cancelAnimationFrame(We),We=0,Ue!==void 0&&(clearInterval(Ue),Ue=void 0),Gt?.abort(),Gt=null,xe?.disconnect(),xe=null,pr=null,co?.disconnect(),co=null,Ta(),Kt="",Wt=!0,ma(we,Ve)},onSettingsChange:Ea});var Pa=`.bloom-ih-hud {
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
`;var Yf=new S("InputHistory"),gr=/\u200B/g,Na=10,Ha=500,Ia=100,Jc=8,Zc=120,Qc=2e3,po=10,go=v({maxEntries:{type:4,description:"Max stored prompts",min:Na,max:Ha,default:Ia},history:{type:5,description:"Stored prompts",render:pd},entries:{type:0,description:"Stored prompts",hidden:!0,default:[]}}),hr=new Map,C=0,br="",G=!1,Xt=!1,xr=0,Yt=null,yr,wr=null,Oa=!0;function q(){let e=go.plain.entries;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ba(e){let t=Ie(Number(go.store.maxEntries??Ia),Na,Ha);return e.length>t?e.slice(e.length-t):e}function ho(e){go.store.entries=Ba(e)}function ed(e){return e.replaceAll(gr,"").replace(/\n$/,"").trim()}function vr(e){let n=(e instanceof Element?e:e instanceof Node?e.parentElement:null)?.closest?.(je);return n instanceof HTMLElement?n:ve()}function td(e){let t=window.getSelection();if(!t||t.rangeCount===0)return{first:!0,last:!0};if(!Fe(e))return{first:!0,last:!0};try{let o=t.getRangeAt(0),r=document.createRange();r.selectNodeContents(e),r.setEnd(o.startContainer,o.startOffset);let i=document.createRange();return i.selectNodeContents(e),i.setStart(o.endContainer,o.endOffset),{first:r.toString().replaceAll(gr,"").trim().length===0,last:i.toString().replaceAll(gr,"").trim().length===0}}catch{return{first:!0,last:!0}}}function Da(e){clearTimeout(yr),yr=setTimeout(()=>{if(e!==xr)return;Xt=!1;let t=wr;t&&dr(t,Oa)},Zc)}function _a(e,t,n){Xt=!0,wr=e,Oa=n;let o=++xr;sa(e,t,n),Da(o)}function nd(){let e=document.querySelector(".bloom-ih-hud");return e||(e=document.createElement("div"),e.className="bloom-ih-hud",document.body.appendChild(e)),e}function Ye(){document.querySelector(".bloom-ih-hud")?.classList.remove("bloom-ih-hud-on")}function od(){document.querySelector(".bloom-ih-hud")?.remove()}function rd(e,t){let n=nd();n.textContent=e;let o=(t.closest("form")??se()).getBoundingClientRect();n.style.left=`${o.left+o.width/2}px`,n.style.top=`${Math.max(8,o.top-Jc)}px`,n.classList.add("bloom-ih-hud-on")}function Er(e){let t=ed(e);if(!t)return;let n=Date.now(),o=hr.get(t);if(o&&n-o<Qc)return;hr.set(t,n);let r=q().filter(i=>i!==t);r.push(t),ho(r),C=q().length,G=!1,Ye()}function id(e,t){let n=q();if(!n.length&&e)return;C>=n.length&&(br=Fe(t),C=n.length);let o=e?C-1:C+1;o<0||o>n.length||(C=o,G=!0,_a(t,o===n.length?br:n[o],e),o<n.length?rd(`${o+1} / ${n.length}`,t):Ye())}function ad(e){G=!1,Ye(),_a(e,br,!1),C=q().length}function sd(e){if(e.isComposing||e.keyCode===229||e.ctrlKey||e.metaKey)return;let t=vr(e.target)??vr(document.activeElement);if(!t||e.target instanceof Node&&!t.contains(e.target)&&e.target!==t&&(e.key!=="ArrowUp"&&e.key!=="ArrowDown"&&e.key!=="Enter"&&e.key!=="Escape"||document.activeElement!==t&&!t.contains(document.activeElement)))return;if(e.key==="Escape"&&G&&!e.altKey&&!e.shiftKey){ad(t),e.preventDefault(),e.stopImmediatePropagation();return}if(e.key==="Enter"&&!e.shiftKey&&!e.altKey){Er(Fe(t));return}if(e.key!=="ArrowUp"&&e.key!=="ArrowDown"||e.shiftKey)return;let n=e.key==="ArrowUp",o=e.altKey,r=q();if(!o){let i=td(t);if(n&&!i.first||!n&&!i.last)return}n&&(!r.length||C<=0)||!n&&C>=r.length||(e.preventDefault(),e.stopImmediatePropagation(),id(n,t))}function ld(e){if(vr(e.target)){if(Xt){Da(xr);return}G&&(G=!1,Ye(),C=q().length)}}function cd(e){let t=e.target;if(!(t instanceof HTMLFormElement))return;let n=t.querySelector(je);n instanceof HTMLElement&&Er(Fe(n))}function dd(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest(eo);if(!n||!(n instanceof HTMLElement)||N(n))return;let o=ve();o&&Er(Fe(o))}function ud(e){if(!(!G||Xt)){if(e.target instanceof Node){let t=e.target.getRootNode();if(t instanceof ShadowRoot&&t.host.id==="bloom-root")return}G=!1,Ye()}}function md(){if(Yt)return;Yt=new AbortController;let{signal:e}=Yt,t={capture:!0,signal:e};window.addEventListener("keydown",sd,t),window.addEventListener("input",ld,t),window.addEventListener("submit",cd,t),window.addEventListener("click",dd,t),window.addEventListener("pointerdown",ud,t)}function fd(e){let t=q().slice();t.splice(e,1),ho(t),C>t.length&&(C=t.length)}function pd(e){e.className="bloom-ih-panel";let t="",n=0,o=-1,r=()=>{let i=q().slice().reverse(),a=t.trim().toLowerCase(),s=a?i.filter(m=>m.toLowerCase().includes(a)):i,l=Math.max(1,Math.ceil(s.length/po));n>=l&&(n=l-1);let d=s.slice(n*po,n*po+po);e.replaceChildren();let c=document.createElement("input");if(c.className="bloom-ih-search",c.type="search",c.placeholder="Search history",c.autocomplete="off",c.value=t,c.addEventListener("input",()=>{t=c.value,n=0,r()}),e.appendChild(c),d.length){let m=document.createElement("div");m.className="bloom-ih-list",d.forEach((x,A)=>{let P=i.indexOf(x),Et=q().length-1-P,Pe=document.createElement("div");Pe.className="bloom-ih-item";let Q=document.createElement("button");Q.type="button",Q.className=`bloom-ih-body${o===A?"":" bloom-ih-clamp"}`,Q.textContent=x,Q.addEventListener("click",()=>{o=o===A?-1:A,r()});let St=document.createElement("div");St.className="bloom-ih-actions";let Ne=document.createElement("button");Ne.type="button",Ne.title="Copy",Ne.textContent="C",Ne.addEventListener("click",()=>{si(x)});let fe=document.createElement("button");fe.type="button",fe.title="Delete",fe.textContent="\xD7",fe.addEventListener("click",()=>{fd(Et),r()}),St.append(Ne,fe),Pe.append(Q,St),m.appendChild(Pe)}),e.appendChild(m)}else{let m=document.createElement("p");m.className="bloom-ih-empty",m.textContent=s.length?"No matches.":"No stored prompts yet.",e.appendChild(m)}let u=document.createElement("div");u.className="bloom-ih-pager";let f=document.createElement("button");f.type="button",f.className="bloom-ih-btn",f.textContent="Prev",f.disabled=n<=0,f.addEventListener("click",()=>{n-=1,r()});let L=document.createElement("span");L.textContent=`${n+1} / ${l}`;let E=document.createElement("button");E.type="button",E.className="bloom-ih-btn",E.textContent="Next",E.disabled=n+1>=l,E.addEventListener("click",()=>{n+=1,r()});let p=document.createElement("button");p.type="button",p.className="bloom-ih-clear",p.textContent="Clear all",p.addEventListener("click",()=>{confirm("Clear all stored prompts?")&&(ho([]),C=0,r())}),u.append(f,L,E,p),e.appendChild(u)};return r(),()=>{e.replaceChildren()}}var $a=h({name:"InputHistory",description:"Recall prompts with Arrow Up / Arrow Down.",authors:[y.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11M8 12h11M8 17h7"/><path d="M5 7v.01M5 12v.01M5 17v.01"/></svg>',enabledByDefault:!0,settings:go,startAt:"HostReady",managedStyle:"inputHistory",start(){w("inputHistory",Pa),C=q().length,G=!1,md()},stop(){Yt?.abort(),Yt=null,Ye(),od(),hr.clear(),clearTimeout(yr),Xt=!1,wr=null,G=!1},onSettingsChange(){let e=q(),t=Ba(e);t.length!==e.length&&ho(t),C>t.length&&(C=t.length)}});var Sr="noShareLink",gd=['button[data-testid="share-chat-button"]'],hd=['button[data-testid="share-project-button"]','button[data-testid="project-share-button"]'],Lr=v({hideShareChat:{type:2,description:"Hide conversation Share",default:!0},hideShareProject:{type:2,description:"Hide project Share",default:!0}});function qa(e){return`${e.join(",")}{display:none!important}`}function ja(){let e=[];if(Lr.store.hideShareChat!==!1&&e.push(qa(gd)),Lr.store.hideShareProject!==!1&&e.push(qa(hd)),!e.length){b(Sr);return}w(Sr,e.join(`
`))}var Fa=h({name:"NoShareLink",description:"Hide Share on conversations and inside projects.",authors:[y.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Lr,start:ja,onSettingsChange:ja,stop(){b(Sr)}});var Ua="noDictation",bd=['form[data-type="unified-composer"] button.composer-btn[aria-label="Dictate button"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Start dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Stop dictation"]','form[data-type="unified-composer"] button.composer-btn[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label="Dictate button"]','form[data-type="unified-composer"] button[aria-label="Dictate"]','form[data-type="unified-composer"] button[aria-label="Start dictation"]','form[data-type="unified-composer"] button[aria-label="Stop dictation"]','form[data-type="unified-composer"] button[aria-label="Submit dictation"]','form[data-type="unified-composer"] button[aria-label^="Dictate" i]','form[data-type="unified-composer"] button[aria-label="\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u5F00\u59CB\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u505C\u6B62\u542C\u5199"]','form[data-type="unified-composer"] button[aria-label="\u8BED\u97F3\u8F93\u5165"]','form[data-type="unified-composer"] button[aria-label^="\u542C\u5199"]','form[data-type="unified-composer"] button[data-testid="composer-dictate-button"]','button[data-testid="composer-dictate-button"]'],yd=['[role="dialog"] [data-testid*="dictation"]','[role="dialog"] [data-testid*="speech-to-text"]','[role="dialog"] [aria-label="Dictation"]','[role="dialog"] [aria-label*="Dictation"]','[role="dialog"] [aria-label*="speech-to-text"]','[role="dialog"] [aria-label*="\u542C\u5199"]','[role="dialog"] [aria-label*="\u8BED\u97F3\u8F93\u5165"]'],Ka=v({hideDictationSettings:{type:2,description:"Hide dictation rows in Settings",default:!0}});function za(e){return`${e.join(",")}{display:none!important}`}function Ga(){let e=[za(bd)];Ka.store.hideDictationSettings!==!1&&e.push(za(yd)),w(Ua,e.join(`
`))}var Va=h({name:"NoDictation",description:"Hide the composer Dictation button. Optional: hide Settings rows.",authors:[y.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/><path d="M19 10a7 7 0 01-14 0M12 17v4M8 21h8"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:Ka,start:Ga,onSettingsChange:Ga,stop(){b(Ua)}});var Cr="noSidebarIdentity",Xe=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]','button[aria-label*="profile" i][aria-haspopup]','button[aria-label*="account" i][aria-haspopup]','[aria-haspopup="menu"][data-testid*="profile" i]'],Tr=Xe.flatMap(e=>[`${e} .min-w-0 > .truncate`,`${e} .min-w-0.flex-1 .truncate`]),Ja=Xe.flatMap(e=>[`${e} .min-w-0 > span:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0 > p:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`]),vd=[...Tr,...Ja],Wa=[...Tr,...Xe.flatMap(e=>[`${e} .min-w-0:not(.flex) > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary)`,`${e} .min-w-0.flex-col > :first-child:not(.text-xs):not(.text-token-text-secondary):not(.text-token-text-tertiary):not(img):not([class*="rounded-full"])`])],xd=Xe.map(e=>`${e} a[href^="mailto:"]`),wd=Xe.flatMap(e=>[`${e} .min-w-0 > :not(.truncate)`,`${e} .min-w-0 > :not(.truncate) *`,`${e} .min-w-0 .text-xs`,`${e} .min-w-0 .text-token-text-secondary:not(.truncate)`,`${e} .min-w-0 .text-token-text-tertiary:not(.truncate)`,`${e} .text-xs:not(.truncate)`,`${e} .text-token-text-secondary:not(.truncate)`,`${e} .text-token-text-tertiary:not(.truncate)`,`${e} .min-w-0 ~ *`,`${e} .min-w-0 ~ * *`,`${e} > .text-xs`,`${e} > .text-token-text-secondary`,`${e} > .text-token-text-tertiary`]),Ed=Xe.flatMap(e=>[`${e} .min-w-0.flex-col > :not(.truncate)`,`${e} .min-w-0.flex-col > .text-xs`,`${e} .min-w-0.flex-col > .text-token-text-secondary`,`${e} .min-w-0.flex-col > .text-token-text-tertiary`,`${e} .min-w-0:not(.flex) > :not(.truncate)`,`${e} .min-w-0:not(.flex) > .text-xs`,`${e} .min-w-0:not(.flex) > .text-token-text-secondary`,`${e} .min-w-0:not(.flex) > .text-token-text-tertiary`]),Jt=v({hideUsername:{type:2,description:"Hide the display name next to the sidebar avatar.",default:!0},hideEmail:{type:2,description:"Hide a mailto address next to the sidebar avatar, if shown.",default:!0},enlargePlan:{type:2,description:"When the name is hidden, enlarge the plan label (font size only).",default:!0},alignPlanWithAvatar:{type:2,description:"When the name is hidden, drop the empty name line so Plus/Pro/Free sits on the avatar midline.",default:!1}});function Ya(e){return`${e.join(",")}{visibility:hidden!important;color:transparent!important;user-select:none!important;pointer-events:none!important}`}function Sd(e){return`${e.join(",")}{display:none!important;flex:0 0 0!important;height:0!important;max-height:0!important;min-height:0!important;overflow:hidden!important}`}function Ld(){return`${Ed.join(",")}{margin-block:auto!important}`}function Cd(){return`${wd.join(",")}{font-size:14px!important;font-weight:500!important;line-height:1.25!important}`}function Xa(){let e=Jt.store.hideUsername!==!1,t=Jt.store.hideEmail!==!1,n=e&&Jt.store.enlargePlan!==!1,o=e&&Jt.store.alignPlanWithAvatar===!0,r=[];if(e&&(o?(r.push(Sd(n?Wa:[...Wa,...Ja])),r.push(Ld())):r.push(Ya(n?Tr:vd))),t&&r.push(Ya(xd)),n&&r.push(Cd()),!r.length){b(Cr);return}w(Cr,r.join(`
`))}var Za=h({name:"NoSidebarIdentity",description:"Hide the sidebar display name. Avatar stays clickable.",authors:[y.p],tags:["ui","privacy"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19.2c.7-3.1 3.3-5.2 6.5-5.2s5.8 2.1 6.5 5.2"/><path d="M4 4l16 16"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Jt,start:Xa,onSettingsChange:Xa,stop(){b(Cr)}});var Qa=`#bloom-rt-host {
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    overflow: visible;
    pointer-events: none;
    z-index: 10001;
}

.bloom-rt-panel {
    pointer-events: auto;
    position: fixed;
    left: 50%;
    top: 42%;
    transform: translate(-50%, -50%);
    width: min(440px, calc(100vw - 24px));
    max-height: min(70vh, 560px);
    overflow: auto;
    margin: 0;
    padding: 8px;
    border: 0;
    border-radius: 16px;
    background: var(--main-surface-primary, #ffffff);
    color: var(--text-primary, #0d0d0d);
    box-shadow:
        0 0 0 1px var(--border-light, rgba(0, 0, 0, 0.1)),
        0 18px 48px rgba(0, 0, 0, 0.22);
    font: 14px/1.35 ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
    z-index: 10001;
}

.bloom-rt-panel[data-visible="false"] {
    display: none;
}

.bloom-rt-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin: 0;
    padding: 0;
    list-style: none;
}

.bloom-rt-card {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    margin: 0;
    padding: 10px 12px;
    border: 0;
    border-radius: 12px;
    background: transparent;
    color: inherit;
    text-align: left;
    cursor: pointer;
    box-sizing: border-box;
}

.bloom-rt-card:hover,
.bloom-rt-card:focus-visible {
    background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
    outline: none;
}

.bloom-rt-card[data-active="true"] {
    background: var(--main-surface-secondary, #f4f4f4);
    box-shadow: inset 0 0 0 1px var(--border-medium, rgba(0, 0, 0, 0.15));
}

.bloom-rt-name {
    font-weight: 600;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.bloom-rt-project {
    font-size: 12px;
    color: var(--text-secondary, #5d5d5d);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.bloom-rt-preview {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 12px;
    color: var(--text-tertiary, #8f8f8f);
}

.bloom-rt-line {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.bloom-rt-line[data-role="user"] {
    color: var(--text-secondary, #5d5d5d);
}

.bloom-rt-empty {
    margin: 0;
    padding: 18px 12px;
    color: var(--text-tertiary, #8f8f8f);
    font-size: 13px;
    text-align: center;
}

@media (prefers-reduced-motion: reduce) {
    .bloom-rt-panel {
        transition: none;
    }
}
`;var ns=new S("RecentTopics"),Qe="bloom-rt-host",os="home",rs=/^\/c\/([a-z0-9_-]{8,})/i,kd=/\/c\/([a-z0-9_-]{8,})/i,is=/^(today|yesterday|previous|pinned|recents|chats|today|昨天|今天|最近|置顶|前\s*\d+)/i,Md=new Set(["Backquote","IntlBackslash"]),Ad=new Set(["`","~","\xB7","\uFF40","\uFF5E","Dead","Process"]),Rd=140,Pd=[3,4,5,6,7,8,9,10,11,12].map(e=>({label:String(e),value:String(e),default:e===5})),T=v({maxRecent:{type:3,description:"How many recently opened conversations to show.",options:Pd},includeHome:{type:2,description:"Include new-chat home in the switcher.",default:!0},visits:{type:0,description:"Visit order",hidden:!0,default:[]},titles:{type:0,description:"Cached titles",hidden:!0,default:{}},previews:{type:0,description:"Cached last-turn previews",hidden:!0,default:{}},projects:{type:0,description:"Cached project names",hidden:!0,default:{}}}),bo=null,kr=null,H=!1,on=!1,Zt=!1,U=0,Ee="",Je=null,Qt=null,Ze;function Nd(){let e=Number(T.store.maxRecent??5);return Number.isFinite(e)&&e>=3&&e<=12?e:5}function en(){let e=T.plain.visits;return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Mr(){let e=T.plain.titles;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function as(){let e=T.plain.previews;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Ar(){let e=T.plain.projects;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function vo(e){let t=Nd();return e.length>t?e.slice(0,t):e}function K(e){return e===os}function tn(e,t=Rd){let n=e.replace(/\s+/g," ").trim();return n.length<=t?n:`${n.slice(0,t-1)}\u2026`}function Rr(e){if(!e)return"";try{return new URL(e,location.origin).pathname.match(rs)?.[1]??""}catch{return e.match(kd)?.[1]??""}}function Se(){let e=(location.pathname||"/").match(rs);if(e?.[1])return e[1];let n=B().split("|").filter(Boolean);for(let o=n.length-1;o>=0;o--){let r=n[o];if(/^[a-z0-9_-]{8,}$/i.test(r))return r}return os}function Pr(e){if(K(e))return"New chat";try{let n=document.querySelectorAll(`a[href*="/c/${e}"]`);for(let o of n){if(Rr(o.getAttribute("href")||"")!==e)continue;let r=tn(o.textContent||"",80);if(r)return r}}catch{}let t=document.title.replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return Se()===e&&t&&!/^ChatGPT$/i.test(t)?tn(t,80):""}function Hd(e){return K(e)?"New chat":Mr()[e]||Pr(e)||"Chat"}function Id(e){return Ar()[e]||""}function Od(e){return as()[e]||{}}function ss(e,t){if(!e||K(e)||!t)return;let n=Mr();n[e]!==t&&(n[e]=t,T.store.titles=n)}function Bd(e,t){if(!e||K(e)||!t)return;let n=Ar();n[e]!==t&&(n[e]=t,T.store.projects=n)}function Dd(e,t){if(!e||K(e)||!t.user&&!t.assistant)return;let n=as(),o=n[e]||{},r={user:t.user||o.user,assistant:t.assistant||o.assistant};o.user===r.user&&o.assistant===r.assistant||(n[e]=r,T.store.previews=n)}function Nr(e){if(!e||K(e)&&T.store.includeHome===!1)return;let t=en().filter(n=>n!==e);t.unshift(e),T.store.visits=vo(t)}function xo(){let e=T.store.includeHome!==!1;return vo(en().filter(n=>e||!K(n))).map(n=>({id:n,title:Hd(n),project:Id(n),preview:Od(n)}))}function es(e){try{let t=document.querySelectorAll(`[data-message-author-role="${e}"]`),n=t[t.length-1];if(!(n instanceof HTMLElement))return"";let o=[];for(let i of n.querySelectorAll("p")){let a=(i.textContent||"").replace(/\s+/g," ").trim();!a||/^(you|assistant|chatgpt)$/i.test(a)||o.push(a)}let r=o.length?o.join(" "):n.textContent||"";return tn(r)}catch{return""}}function nn(e){if(!e||K(e)||e!==Se())return;let t=Pr(e);t&&ss(e,t);let n=es("user"),o=es("assistant");Dd(e,{user:n,assistant:o});let r=cs(e);if(r){let i=ls(r);i&&Bd(e,i)}}function Hr(){let e=Mr(),t=Ar(),n=[],o=new Set,r=!1,i=!1;try{for(let d of document.querySelectorAll('a[href*="/c/"]')){if(d.closest(`#${Qe}, #bloom-root, #bloom-sidebar-panel`))continue;let c=Rr(d.getAttribute("href")||"");if(!c||o.has(c))continue;o.add(c),n.push(c);let u=tn(d.textContent||"",80);u&&!is.test(u)&&e[c]!==u&&(e[c]=u,r=!0);let f=ls(d);f&&t[c]!==f&&(t[c]=f,i=!0)}}catch{}r&&(T.store.titles=e),i&&(T.store.projects=t);let a=en(),s=new Set(a),l=n.filter(d=>!s.has(d));l.length&&(T.store.visits=vo([...a,...l]))}function ls(e){let t=e.parentElement;for(let n=0;n<10&&t;n++){if(t.id==="bloom-rt-host"||t.id==="bloom-root"){t=t.parentElement;continue}let o=t.querySelector(":scope > button, :scope > [role='button'], :scope > h2, :scope > h3, :scope > .truncate"),r=tn((o instanceof HTMLElement?o.textContent:"")||"",60);if(r&&!is.test(r)&&!/^20\d{2}/.test(r)&&r!==e.textContent?.trim()&&t.querySelector('a[href^="/c/"]'))return r;t=t.parentElement}return""}function cs(e){if(K(e)){let t=document.querySelector('[data-testid="create-new-chat-button"]');return t instanceof HTMLAnchorElement?t:document.querySelector('a[href="/"]')}try{for(let t of document.querySelectorAll(`a[href*="/c/${e}"]`))if(Rr(t.getAttribute("href")||"")===e)return t}catch{}return null}function _d(e){let t=cs(e);if(t){t.click();return}if(K(e)){location.assign("/");return}location.assign(`/c/${e}`)}function $d(){let e=Se();Ee&&Ee!==e&&nn(Ee),Ee=e,Nr(e),Hr();let t=Pr(e);t&&ss(e,t),nn(e)}function yo(){Ze===void 0&&(Ze=window.setTimeout(()=>{Ze=void 0,$d()},120))}function qd(){Je||(Je=history.pushState.bind(history),Qt=history.replaceState.bind(history),history.pushState=function(...t){let n=Je(...t);return yo(),n},history.replaceState=function(...t){let n=Qt(...t);return yo(),n})}function jd(){Je&&(history.pushState=Je),Qt&&(history.replaceState=Qt),Je=null,Qt=null}function Fd(e){return Md.has(e.code)||e.keyCode===192?!0:Ad.has(e.key)}function ds(e){return e.key==="Control"||e.code==="ControlLeft"||e.code==="ControlRight"}function zd(e,t){on=t,Hr(),nn(Se()),H=!0,U=0;try{let n=Se();Nr(n);let o=xo();o.length>1&&(U=e?o.length-1:1)}catch(n){ns.error("Failed to open switcher:",n)}rn()}function ts(e){let{length:t}=xo();t&&(U=(U+(e?-1:1)+t)%t,rn())}function Ir(){if(!H)return;let e=xo()[U];H=!1,on=!1,rn(),e&&_d(e.id)}function us(){H&&(H=!1,on=!1,rn())}function Gd(e){if(ds(e)){Zt=!0;return}if((e.ctrlKey||Zt)&&!e.altKey&&!e.metaKey&&Fd(e)&&!e.repeat){e.preventDefault(),e.stopImmediatePropagation();try{H?ts(e.shiftKey):zd(e.shiftKey,!0)}catch(n){ns.error("Hotkey failed:",n)}return}if(H){if(e.key==="Escape"){e.preventDefault(),us();return}if(e.key==="Enter"&&!e.shiftKey){e.preventDefault(),Ir();return}e.key==="Tab"&&(e.ctrlKey||Zt)&&(e.preventDefault(),ts(e.shiftKey))}}function Ud(e){ds(e)&&(Zt=!1,H&&on&&Ir())}function Kd(e){let t=e.target instanceof Element?e.target:null;!t||!t.closest('a[href^="/c/"], a[href="/"], [data-testid="create-new-chat-button"]')||requestAnimationFrame(yo)}function Vd(e){!H||(e.target instanceof Element?e.target:null)?.closest(`#${Qe}`)||us()}function Wd(){document.visibilityState==="hidden"&&nn(Se())}function Yd(){if(!document.body)return null;let e=document.getElementById(Qe);if(e instanceof HTMLElement)return kr=e,e;e=document.createElement("div"),e.id=Qe;let t=document.createElement("div");return t.className="bloom-rt-panel",t.setAttribute("role","listbox"),t.setAttribute("aria-label","Recent conversations"),t.dataset.visible="false",t.addEventListener("click",n=>n.stopPropagation()),e.append(t),document.body.append(e),kr=e,e}function rn(){let e=Yd();if(!e)return;let t=e.querySelector(".bloom-rt-panel");if(!t)return;if(!H){t.dataset.visible="false",t.replaceChildren();return}let n=xo();if(!n.length){t.dataset.visible="true";let i=document.createElement("p");i.className="bloom-rt-empty",i.textContent="No recent chats yet.",t.replaceChildren(i);return}U>=n.length&&(U=0);let o=document.createElement("div");o.className="bloom-rt-list",o.setAttribute("role","none"),n.forEach((i,a)=>{let s=document.createElement("button");s.type="button",s.className="bloom-rt-card",s.setAttribute("role","option"),s.dataset.active=a===U?"true":"false",s.setAttribute("aria-selected",a===U?"true":"false");let l=document.createElement("div");if(l.className="bloom-rt-name",l.textContent=i.title,s.append(l),i.project){let d=document.createElement("div");d.className="bloom-rt-project",d.textContent=i.project,s.append(d)}if(i.preview.user||i.preview.assistant){let d=document.createElement("div");if(d.className="bloom-rt-preview",i.preview.user){let c=document.createElement("div");c.className="bloom-rt-line",c.dataset.role="user",c.textContent=i.preview.user,d.append(c)}if(i.preview.assistant){let c=document.createElement("div");c.className="bloom-rt-line",c.dataset.role="assistant",c.textContent=i.preview.assistant,d.append(c)}s.append(d)}s.addEventListener("click",()=>{U=a,Ir()}),o.append(s)}),t.replaceChildren(o),t.dataset.visible="true",t.querySelector('.bloom-rt-card[data-active="true"]')?.scrollIntoView({block:"nearest"})}function Xd(){document.getElementById(Qe)?.remove(),kr=null}var ms=h({name:"RecentTopics",description:"Switch recently opened chats with Ctrl+` like Arc's tab switcher.",authors:[y.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",managedStyle:"recentTopics",cleanupSelectors:[`#${Qe}`],settings:T,start(){w("recentTopics",Qa),Ee=Se(),Nr(Ee),Hr(),nn(Ee),qd(),bo=new AbortController;let{signal:e}=bo;window.addEventListener("keydown",Gd,{capture:!0,signal:e}),window.addEventListener("keyup",Ud,{capture:!0,signal:e}),window.addEventListener("popstate",yo,{signal:e}),document.addEventListener("click",Kd,{capture:!0,signal:e}),document.addEventListener("click",Vd,{signal:e}),document.addEventListener("visibilitychange",Wd,{signal:e})},stop(){bo?.abort(),bo=null,Ze!==void 0&&(clearTimeout(Ze),Ze=void 0),jd(),H=!1,on=!1,Zt=!1,Xd()},onSettingsChange(){let e=vo(en());e.length!==en().length&&(T.store.visits=e),H&&rn()}});var Or="cleaner",Jd=['a[href="https://chatgpt.com/download"]','a[href="https://chatgpt.com/download/"]','a[href="/download"]','a[href="/download/"]','a[href^="https://chatgpt.com/download"]','a[href^="https://openai.com/chatgpt/download"]','a[href^="https://openai.com/download"]','a[data-testid="download-app-button"]','a[data-testid="download-chatgpt-app"]','a[data-testid="mobile-app-cta"]','a[data-testid="download-mobile-app"]','button[data-testid="download-app-button"]','button[data-testid="download-chatgpt-app"]','a[aria-label="Download apps"]','a[aria-label="Download the ChatGPT app"]','a[aria-label="Download ChatGPT"]','a[aria-label="Download ChatGPT for desktop"]','button[aria-label="Download apps"]','button[aria-label="Download the ChatGPT app"]','button[aria-label="Download ChatGPT"]','a[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','a[aria-label="\u4E0B\u8F7D App"]','a[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D\u5E94\u7528"]','button[aria-label="\u4E0B\u8F7D App"]','button[aria-label="\u4E0B\u8F7D ChatGPT \u5E94\u7528"]'],Zd=['[data-testid="thread-disclaimer"]','[data-testid*="disclaimer"]','[class*="--vt-disclaimer"]','[class*="[view-transition-name:var(--vt-disclaimer)]"]','#thread-bottom-container [class*="vt-disclaimer"]',"#thread-bottom-container .text-token-text-secondary.text-center.text-xs","#thread-bottom-container .text-token-text-tertiary.text-center.text-xs"],Qd=['[data-testid="upgrade-button"]','[data-testid="upgrade-plan-button"]','[data-testid="upgrade-chat-button"]','[data-testid="accounts-upgrade-button"]','[data-testid="sidebar-upgrade-button"]','[data-testid="get-plus-button"]','[data-testid="get-pro-button"]','[data-testid="plus-upsell"]','[data-testid="pro-upsell"]','[data-testid="upsell-button"]','[data-testid="upsell-card"]','[data-testid="upgrade-cta"]','[data-testid="upgrade-banner"]','a[href*="/upgrade"]','a[href*="/checkout"]','a[href*="pay.openai.com"]','a[href*="/payments/"]','a[aria-label="Upgrade"]','a[aria-label="Upgrade plan"]','a[aria-label="Upgrade to Plus"]','a[aria-label="Get Plus"]','a[aria-label="Get Pro"]','a[aria-label="\u5347\u7EA7"]','a[aria-label="\u5347\u7EA7\u5957\u9910"]','a[aria-label="\u5347\u7EA7\u5230 Plus"]','button[aria-label="Upgrade"]','button[aria-label="Upgrade plan"]','button[aria-label="Upgrade to Plus"]','button[aria-label="Get Plus"]','button[aria-label="Get Pro"]','button[aria-label="\u5347\u7EA7"]','button[aria-label="\u5347\u7EA7\u5957\u9910"]','button[aria-label="\u5347\u7EA7\u5230 Plus"]'],eu=['[data-testid="model-lock-icon"]','[data-testid="locked-model"]','[data-testid="model-unavailable"]','[data-testid="upsell-model"]','[data-testid="model-switcher-item"][data-disabled="true"]','[data-testid="model-switcher-option"][aria-disabled="true"]','[data-testid="model-picker-item"][aria-disabled="true"]','[data-testid="model-item"][aria-disabled="true"]','[data-testid*="model-"][data-state="locked"]','[data-testid="model-switcher-dropdown"] [aria-disabled="true"]'],tu=['[data-testid="home-promo"]','[data-testid="homepage-promo"]','[data-testid="promo-banner"]','[data-testid="marketing-banner"]','[data-testid="gpt-promo"]','[data-testid="gpts-upsell"]','[data-testid="explore-gpts-promo"]','[data-testid="welcome-banner"]','[data-testid="app-download-banner"]','[data-testid="mobile-app-banner"]','[data-testid="home-gpts-promo"]'],nu=['[data-testid="ad"]','[data-testid="ad-unit"]','[data-testid="ad-slot"]','[data-testid="ad-banner"]','[data-testid="sponsored"]','[data-testid="sponsored-message"]','[data-testid="sponsored-card"]','[data-testid*="ad-slot"]','[data-testid*="sponsored"]','[aria-label="Sponsored"]','[aria-label="Advertisement"]','[aria-label="\u8D5E\u52A9"]','[aria-label="\u5E7F\u544A"]',"iframe[src*='doubleclick']","iframe[src*='/ads/']","[data-ad-slot]"],Le=v({hideDownloadApps:{type:2,description:"Hide the Download apps button.",default:!0},hideDisclaimer:{type:2,description:"Hide the composer \u201Ccan make mistakes\u201D notice.",default:!0},hideUpgrade:{type:2,description:"Hide Upgrade / Get Plus / Get Pro CTAs.",default:!0},hideLockedModels:{type:2,description:"Hide locked or inaccessible models in the picker.",default:!0},hideHomePromo:{type:2,description:"Hide home GPT / marketing promo banners.",default:!0},hideAds:{type:2,description:"Hide Free-plan ads and sponsored slots.",default:!0}});function et(e){return`${e.join(",")}{display:none!important}`}function fs(){let e=[];if(Le.store.hideDownloadApps!==!1&&e.push(et(Jd)),Le.store.hideDisclaimer!==!1&&e.push(et(Zd)),Le.store.hideUpgrade!==!1&&e.push(et(Qd)),Le.store.hideLockedModels!==!1&&e.push(et(eu)),Le.store.hideHomePromo!==!1&&e.push(et(tu)),Le.store.hideAds!==!1&&e.push(et(nu)),!e.length){b(Or);return}w(Or,e.join(`
`))}var ps=h({name:"Cleaner",description:"Hide Download apps, the mistake notice, upgrade CTAs, locked models, home promo, and ads.",authors:[y.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12H3l1.5-4.5A2 2 0 016.4 6h11.2"/><path d="M19.4 6l.7 2M6 12l1 8h8l1-8"/><path d="M9 16h4"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Le,start:fs,onSettingsChange:fs,stop(){b(Or)}});var wo=new S("ResponseNotification"),ou=400,ru=3,it=v({sound:{type:2,description:"Play a notification sound.",default:!0},soundUrl:{type:0,description:"Custom sound URL. Leave empty for the default chime.",default:""},preview:{type:5,description:"Preview sound",render:uu},browserNotification:{type:2,description:"Show a browser notification.",default:!0},onlyWhenHidden:{type:2,description:"Only notify when the tab is hidden.",default:!0}}),Br=!1,ke=!1,Ce=0,Te="",rt=!1,an="",tt,nt=null,ot=null;function gs(){return Ge(B())}function iu(){return document.visibilityState==="hidden"||document.hidden}function au(){return it.store.onlyWhenHidden===!1?!0:iu()}function su(){let e=(document.title||"").replace(/\s*[|–-]\s*ChatGPT\s*$/i,"").trim();return e&&!/^ChatGPT$/i.test(e)?e:"Chat"}function hs(){try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;(!ot||ot.state==="closed")&&(ot=new e);let t=ot,n=t.currentTime,o=[523.25,659.25];for(let r=0;r<o.length;r++){let i=t.createOscillator(),a=t.createGain();i.type="sine",i.frequency.value=o[r];let s=n+r*.12;a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(.08,s+.02),a.gain.exponentialRampToValueAtTime(1e-4,s+.22),i.connect(a),a.connect(t.destination),i.start(s),i.stop(s+.24)}t.resume?.()}catch(e){wo.debug("chime failed",e)}}function lu(e){try{let t=new Audio(e);t.volume=.7,t.play()}catch(t){wo.debug("custom sound failed",t),hs()}}function bs(){let e=String(it.store.soundUrl||"").trim();e?lu(e):hs()}function cu(){let e="Bloom++",t=`${su()} finished answering.`;try{let n=globalThis.GM_notification;if(typeof n=="function"){n({title:e,text:t,silent:!0});return}}catch{}try{if(typeof Notification>"u")return;if(Notification.permission==="default"&&Notification.requestPermission(),Notification.permission==="granted"){let n=new Notification(e,{body:t,silent:!0});n.onclick=()=>{try{window.focus()}catch{}n.close()}}}catch(n){wo.debug("notification failed",n)}}function du(){au()&&(it.store.sound!==!1&&bs(),it.store.browserNotification!==!1&&cu())}function uu(e){let t=document.createElement("button");return t.type="button",t.textContent="Play",t.addEventListener("click",()=>bs()),e.appendChild(t),()=>{t.remove()}}function mu(e){let t=e.target;if(!(t instanceof Element))return;let n=t.closest("button");n instanceof HTMLElement&&N(n)&&(rt=!0)}function fu(){if(!Br)return;let e=B()||location.pathname;if(an&&e&&an!==e){ke=!1,Ce=0,Te="",rt=!1,an=e;return}an=e;let t=D(),n=gs();if(t){ke=!0,Ce=0,Te=n;return}if(!ke||(Ce+=1,Ce<ru))return;let o=!!Te&&Te===n,r=rt,i=le();ke=!1,Ce=0,rt=!1,Te="",!(!o||r||i)&&du()}var ys=h({name:"ResponseNotification",description:"Notify when a reply finishes. Sound and browser notification; default only when the tab is hidden.",authors:[y.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 19a2 2 0 004 0"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:it,start(){Br=!0,ke=D(),Ce=0,Te=ke?gs():"",rt=!1,an=B()||location.pathname,nt?.abort(),nt=new AbortController,document.addEventListener("click",mu,{capture:!0,signal:nt.signal}),tt!==void 0&&clearInterval(tt),tt=setInterval(fu,ou),it.store.browserNotification!==!1&&typeof Notification<"u"&&Notification.permission==="default"&&document.addEventListener("click",()=>{Notification.permission==="default"&&Notification.requestPermission()},{once:!0,signal:nt.signal}),wo.debug("watch started")},stop(){Br=!1,tt!==void 0&&(clearInterval(tt),tt=void 0),nt?.abort(),nt=null,ke=!1,Ce=0,Te="",rt=!1;try{ot?.close()}catch{}ot=null}});var vs=`.bloom-cls {
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    margin-inline-start: auto;
    pointer-events: none;
    color: var(--text-accent, #10a37f);
}

.bloom-cls[data-kind="done"] {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #0ea5e9;
    color: transparent;
}

.bloom-cls[data-kind="error"] {
    color: var(--text-danger, #ef4444);
}

.bloom-cls-spin {
    width: 14px;
    height: 14px;
    animation: bloom-cls-spin 0.8s linear infinite;
}

@keyframes bloom-cls-spin {
    to { transform: rotate(360deg); }
}
`;var Ss=new S("ChatListStatus"),xs="chatListStatus",Lo="bloom-cls",gu="bloom-cls",hu=500,bu=1200*1e3,yu="#bloom-rt-host, #bloom-root, #bloom-sidebar-panel, #bloom-rail-item",de=new Map,ue=!1,st="",sn=!1,at,ct=0,ce=null,_r=null,lt=null,dt=null,Eo=null,ln=null,cn=!1;function So(){return Date.now()}function vu(){return typeof unsafeWindow<"u"?unsafeWindow:window}function Ls(){return(document.getElementById("stage-slideover-sidebar")||document.querySelector("nav"))??null}function xu(e,t){return!(t!=="POST"||!/\/backend-api\/(?:f\/)?conversation(?:\/|\?|$)/i.test(e)||/\/backend-api\/conversations(?:\/|\?|$)/i.test(e))}function wu(e){try{if(typeof e=="string")return e;if(e instanceof URL)return e.href;if(typeof Request<"u"&&e instanceof Request)return e.url}catch{}return String(e)}function Cs(e){return e?e.match(/"conversation_id"\s*:\s*"([a-zA-Z0-9_-]{8,})"/)?.[1]??"":""}function Eu(e){return typeof e=="string"?Cs(e):""}function V(e,t,n,o=!0){if(!(!e||!ue)){if(t==="idle")de.delete(e);else{let r=de.get(e);r&&r.kind===t&&n!=="net"?r.at=So():de.set(e,{kind:t,at:So(),source:n})}o&&Su({v:1,id:e,kind:t,at:So()}),Co()}}function Su(e){try{lt?.postMessage(e)}catch{}}function Lu(e){let t=e.data;!t||t.v!==1||!t.id||t.kind!=="streaming"&&t.kind!=="done"&&t.kind!=="error"&&t.kind!=="idle"||V(t.id,t.kind,"bc",!1)}function Cu(){let e=So();for(let[t,n]of de)n.kind==="streaming"&&e-n.at>bu&&de.delete(t)}function Tu(){let e=Ls();if(!e)return[];let t=[],n=new Set;try{for(let o of e.querySelectorAll('a[href^="/c/"], a[href*="/c/"]')){if(o.closest(yu))continue;let r=Ft(o.getAttribute("href")||"");!r||n.has(r)||(n.add(r),t.push(o))}}catch{}return t}function ws(e){let t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("aria-hidden","true");let n=document.createElementNS("http://www.w3.org/2000/svg","path");if(n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.4"),n.setAttribute("stroke-linecap","round"),e==="streaming")t.setAttribute("class","bloom-cls-spin"),n.setAttribute("d","M21 12a9 9 0 1 1-6.2-8.56");else{n.setAttribute("d","M15 9l-6 6M9 9l6 6");let o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("cx","12"),o.setAttribute("cy","12"),o.setAttribute("r","9"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","2"),t.appendChild(o)}return t.appendChild(n),t}function Dr(e){let t=e.querySelector(`:scope > .${Lo}`);return t||null}function ku(){if(!ue)return;Cu();let e=ro(),t=Tu();ce?.disconnect();try{for(let n of t){let o=Ft(n.getAttribute("href")||"");if(!o||!e||o!==e){Dr(n)?.remove();continue}let i=de.get(o)?.kind??"idle";if(i==="done"&&(i="idle"),i==="idle"){Dr(n)?.remove();continue}let a=Dr(n);a||(a=document.createElement("span"),a.className=Lo,a.setAttribute("aria-hidden","true"),n.appendChild(a)),a.dataset.kind!==i&&(a.dataset.kind=i,a.replaceChildren(),i==="streaming"?a.appendChild(ws("streaming")):i==="error"&&a.appendChild(ws("error")))}}catch(n){Ss.debug("paint failed",n)}Ts()}function Co(){!ue||ct||(ct=requestAnimationFrame(()=>{ct=0,ue&&ku()}))}function Ts(){let e=Ls();if(!(ce&&_r===e&&e?.isConnected)){if(ce?.disconnect(),_r=e,!e){ce=null;return}ce=new MutationObserver(()=>Co()),ce.observe(e,{childList:!0,subtree:!0})}}async function Mu(e,t){let n=t,o=!e.ok,r=e.body;if(!r){n&&V(n,o?"error":"done","net");return}let i=r.getReader(),a=new TextDecoder,s="";try{for(;ue;){let{done:l,value:d}=await i.read();if(l)break;if(s+=a.decode(d,{stream:!0}),!n){let c=Cs(s);c&&(n=c,cn=!1,V(n,"streaming","net"))}/\[DONE\]/.test(s)||/"error"\s*:\s*\{/.test(s)?(/"error"\s*:\s*\{/.test(s)&&(o=!0),s=s.slice(-64)):s.length>8192&&(s=s.slice(-2048))}}catch{o=!0}n&&V(n,o?"error":"done","net")}function Au(e,t,n){let o=wu(t),r=(n?.method||(typeof Request<"u"&&t instanceof Request?t.method:"GET")||"GET").toUpperCase(),i=xu(o,r),a="";return i&&(a=Eu(n?.body)||Ft(o)||ro(),a?V(a,"streaming","net"):cn=!0),e(t,n).then(s=>{if(!i)return s;try{let l=s.clone();Mu(l,a)}catch{a&&V(a,s.ok?"done":"error","net")}return s},s=>{throw i&&a&&V(a,"error","net"),s})}function Ru(){if(dt)return;let e=vu();ln=e,dt=e.fetch.bind(e);let t=(n,o)=>Au(dt,n,o);Eo=t,e.fetch=t}function Pu(){!dt||!ln||(Eo&&ln.fetch===Eo&&(ln.fetch=dt),dt=null,Eo=null,ln=null)}function Es(){if(!ue)return;let e=ro();if(st&&e&&st!==e){let n=de.get(st);n?.kind==="streaming"&&n.source==="local"&&V(st,le()?"error":"done","local"),sn=!1}if(st=e,D()){sn=!0,e&&V(e,"streaming","local"),Co();return}sn&&(sn=!1,e&&V(e,le()?"error":"done","local")),cn=!1,Co()}var ks=h({name:"ChatListStatus",description:"Show a spinner on the open Recents row while this chat is answering. Other rows keep ChatGPT\u2019s own status.",authors:[y.p],tags:["chat","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Lo}`],start(){ue=!0,w(xs,vs);try{lt=new BroadcastChannel(gu)}catch{lt=null}lt?.addEventListener("message",Lu),Ru(),Ts(),at!==void 0&&clearInterval(at),at=setInterval(Es,hu),Es(),Ss.debug("sidebar status watch started")},stop(){ue=!1,ct&&cancelAnimationFrame(ct),ct=0,at!==void 0&&(clearInterval(at),at=void 0),ce?.disconnect(),ce=null,_r=null,Pu();try{lt?.close()}catch{}lt=null,de.clear(),cn=!1,sn=!1,st="",document.querySelectorAll(`.${Lo}`).forEach(e=>e.remove()),b(xs)}});var As="widerChat",Rs=40,Ps=96,Ns=64,Hs=v({width:{type:4,description:"Maximum thread width (rem). ChatGPT\u2019s default is 40.",min:Rs,max:Ps,default:Ns}});function Nu(){return Ie(Number(Hs.store.width??Ns),Rs,Ps)}function Ms(){let e=Nu();w(As,`:root{--thread-content-max-width:${e}rem!important;--thread-content-width:${e}rem!important}[class*="--thread-content-max-width"]{--thread-content-max-width:${e}rem!important}[class*="thread-content-max-width"]{max-width:min(100%,${e}rem)!important}#thread [class*="thread-content-max-width"],#thread-bottom-container [class*="thread-content-max-width"]{max-width:min(100%,${e}rem)!important}[class*="max-w-(--thread-content-max-width)"],[class*="max-w-[var(--thread-content-max-width)]"]{max-width:min(100%,${e}rem)!important}`)}var Is=h({name:"WiderChat",description:"Widen the thread and composer. ChatGPT caps them at about 40rem.",authors:[y.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12H3M21 12h-5M5 9l-3 3 3 3M19 9l3 3-3 3"/><rect x="8" y="5" width="8" height="14" rx="1.5"/></svg>',enabledByDefault:!0,startAt:"HostReady",settings:Hs,start:Ms,onSettingsChange:Ms,stop(){b(As)}});var Os=`.bloom-ts {
    display: block;
    margin: 0 0 0.25rem;
    padding: 0;
    font-size: 12px;
    line-height: 1.25;
    font-weight: 400;
    color: var(--text-tertiary, #8f8f8f);
    user-select: none;
    pointer-events: none;
}

[data-message-author-role="user"] > .bloom-ts,
[data-message-author-role="user"] .bloom-ts:first-child {
    text-align: right;
}

@media print {
    .bloom-ts { display: none; }
}
`;function To(e){if(typeof e=="number"&&Number.isFinite(e)&&e>0)return e>1e12?e:Math.round(e*1e3);if(typeof e=="string"){let t=e.trim();if(!t)return null;if(/^\d+(\.\d+)?$/.test(t))return To(Number(t));let n=Date.parse(t);return Number.isFinite(n)?n:null}return null}function Bs(e,t,n=Date.now()){let o=new Date(e);if(Number.isNaN(o.getTime()))return"";let r=new Date(n),i=o.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});if(o.toDateString()===r.toDateString()||!t)return i;let s=o.getFullYear()===r.getFullYear();return`${o.toLocaleDateString(void 0,{month:"short",day:"numeric",...s?{}:{year:"numeric"}})}, ${i}`}function Ds(e){try{return new Date(e).toISOString()}catch{return""}}var Fs=new S("MessageTimestamps"),_s="messageTimestamps",Mo="bloom-ts",$s=1500,Iu="#thread-bottom-container, #prompt-textarea, #bloom-root, #bloom-sidebar-panel, form[data-type='unified-composer']",pt=v({showDate:{type:2,description:"Show the date when the message is not from today.",default:!0},hideOwnMessages:{type:2,description:"Hide timestamps on your own messages.",default:!1},stamps:{type:0,description:"Cached message times",hidden:!0,default:{}}}),gt=new Map,Me=!1,mt=0,ut,me=null,$r=null,ft=null,ko=null,dn=null,qs=!1;function Ou(){return typeof unsafeWindow<"u"?unsafeWindow:window}function zs(){return(document.getElementById("thread")||document.querySelector('[data-testid="conversation-panel"]')||document.querySelector("main"))??null}function jr(){let e=pt.plain.stamps;return e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{}}function Gs(){let e={...jr()};for(let[n,o]of gt)e[n]=o;let t=Object.keys(e);if(t.length>$s){let n=t.slice(t.length-$s),o={};for(let r of n)o[r]=e[r];pt.store.stamps=o;return}pt.store.stamps=e}var Bu=li(Gs,500);function qr(e,t){!e||!t||gt.get(e)===t||(gt.set(e,t),Bu(),mn())}function Du(e){return e?gt.get(e)??jr()[e]??null:null}function _u(e){try{if(typeof e=="string")return e;if(e instanceof URL)return e.href;if(typeof Request<"u"&&e instanceof Request)return e.url}catch{}return String(e)}function $u(e,t){return t!=="GET"||/\/backend-api\/conversations(?:\/|\?|$)/i.test(e)?!1:/\/backend-api\/(?:f\/)?conversation\/[a-zA-Z0-9_-]+/i.test(e)}function qu(e,t){return t!=="POST"||/\/backend-api\/conversations(?:\/|\?|$)/i.test(e)?!1:/\/backend-api\/(?:f\/)?conversation(?:\/|\?|$)/i.test(e)}function un(e,t=0){if(!Me||t>6||!e||typeof e!="object")return;if(Array.isArray(e)){for(let a of e)un(a,t+1);return}let n=e,o=n.message;if(o&&typeof o=="object"&&!Array.isArray(o)){let a=o,s=typeof a.id=="string"?a.id:"",l=To(a.create_time??a.createTime??a.created_at);s&&l&&qr(s,l)}let r=typeof n.id=="string"?n.id:"",i=To(n.create_time??n.createTime??n.created_at);if(r&&i&&(n.author||n.content||n.role||n.create_time||n.createTime)&&qr(r,i),n.mapping&&typeof n.mapping=="object")un(n.mapping,t+1);else if(t<3)for(let a of Object.values(n))a&&typeof a=="object"&&un(a,t+1)}function js(e){if(e)try{un(JSON.parse(e))}catch{}}async function ju(e){try{let t=await e.clone().json();un(t)}catch{}}async function Fu(e){let t=e.body;if(!t)return;let n=t.getReader(),o=new TextDecoder,r="";try{for(;Me;){let{done:i,value:a}=await n.read();if(i)break;r+=o.decode(a,{stream:!0});let s=r.split(`
`);r=s.pop()??"";for(let l of s){let d=l.replace(/^data:\s*/,"").trim();!d||d==="[DONE]"||js(d)}r.length>16384&&(r=r.slice(-4096))}r&&js(r.replace(/^data:\s*/,""))}catch{}}function zu(e,t,n){let o=_u(t),r=(n?.method||(typeof Request<"u"&&t instanceof Request?t.method:"GET")||"GET").toUpperCase(),i=$u(o,r),a=qu(o,r);return e(t,n).then(s=>{if(i)ju(s);else if(a)try{Fu(s.clone())}catch{}return s})}function Gu(){if(ft)return;let e=Ou();dn=e,ft=e.fetch.bind(e);let t=(n,o)=>zu(ft,n,o);ko=t,e.fetch=t}function Uu(){!ft||!dn||(ko&&dn.fetch===ko&&(dn.fetch=ft),ft=null,ko=null,dn=null)}function Ku(e){return(e.getAttribute("data-message-author-role")||e.closest("[data-message-author-role]")?.getAttribute("data-message-author-role")||"").toLowerCase()}function Vu(){let e=zs();if(!e)return[];let t=[];try{for(let n of e.querySelectorAll("[data-message-id]"))n.closest(Iu)||t.push(n)}catch{}return t}function Wu(e){try{return!!e.querySelector("time:not(.bloom-ts)")}catch{return!1}}function Yu(){if(!Me)return;let e=pt.store.hideOwnMessages===!0,t=pt.store.showDate!==!1,n=D(),o=Vu();me?.disconnect();try{o.forEach((r,i)=>{let a=r.getAttribute("data-message-id")||"",s=Ku(r),l=r.querySelector(`:scope > .${Mo}`);if(e&&s==="user"){l?.remove();return}if(Wu(r)){l?.remove();return}let d=Du(a);if(!d&&a&&(n||qs)&&i>=o.length-2&&(d=Date.now(),qr(a,d)),!d){l?.remove();return}let c=Bs(d,t);if(!c){l?.remove();return}let u=l;u||(u=document.createElement("time"),u.className=Mo,u.setAttribute("aria-hidden","true"),r.insertBefore(u,r.firstChild)),u.textContent!==c&&(u.textContent=c);let f=Ds(d);f&&u.getAttribute("datetime")!==f&&u.setAttribute("datetime",f)})}catch(r){Fs.debug("paint failed",r)}qs=n,Us()}function mn(){!Me||mt||(mt=requestAnimationFrame(()=>{mt=0,Me&&Yu()}))}function Us(){let e=zs();if(!(me&&$r===e&&e?.isConnected)){if(me?.disconnect(),$r=e,!e||e===document.body){me=null;return}me=new MutationObserver(()=>mn()),me.observe(e,{childList:!0,subtree:!0})}}var Ks=h({name:"MessageTimestamps",description:"Show when each turn was sent. Reads ChatGPT\u2019s conversation JSON, not a conversations poll.",authors:[y.p],tags:["chat"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',enabledByDefault:!0,startAt:"HostReady",cleanupSelectors:[`.${Mo}`],settings:pt,start(){Me=!0,w(_s,Os);let e=jr();for(let[t,n]of Object.entries(e))typeof n=="number"&&n>0&&gt.set(t,n);Gu(),Us(),ut!==void 0&&clearInterval(ut),ut=setInterval(mn,800),mn(),Fs.debug("timestamp watch started")},stop(){Me=!1,mt&&cancelAnimationFrame(mt),mt=0,ut!==void 0&&(clearInterval(ut),ut=void 0),me?.disconnect(),me=null,$r=null,Uu(),Gs(),gt.clear(),document.querySelectorAll(`.${Mo}`).forEach(e=>e.remove()),b(_s)},onSettingsChange:mn});var Fr="streamerMode",Xu="filter:blur(6px)!important;transition:filter .2s ease",Ju="filter:none!important",fn=['[data-testid="accounts-profile-button"]','[data-testid="profile-button"]','[data-testid="user-menu-button"]','[data-testid="account-menu-button"]'],ht=["#stage-slideover-sidebar","nav","#stage-sidebar-tiny-bar"];function j(e,t){return e.map(n=>`${n} ${t}`)}var bt=v({conversations:{type:2,description:"Blur conversation titles in Recents.",default:!0},projects:{type:2,description:"Blur project names in the sidebar.",default:!0},accountAvatar:{type:2,description:"Blur the account avatar.",default:!0},accountName:{type:2,description:"Blur the account display name.",default:!0},accountEmail:{type:2,description:"Blur a mailto address on the account chip or menu.",default:!0}});function pn(e,t=!0){let n=e.join(","),o=e.map(r=>`${r}:hover`).join(",");return`${n}{${Xu}}${t?`${o}{${Ju}}`:""}`}function Vs(){let e=[];if(bt.store.conversations!==!1&&e.push(pn([...j(ht,'a[href^="/c/"]'),...j(ht,'a[href*="/c/"]')])),bt.store.projects!==!1&&e.push(pn([...j(ht,'a[href*="/project"]'),...j(ht,'a[href*="/g/g-p-"]'),...j(ht,'[data-testid="project-name"]'),...j(ht,'[data-testid="project-link"]')])),bt.store.accountAvatar!==!1&&e.push(pn([...j(fn,"img"),...j(fn,'[class*="avatar"]')],!1)),bt.store.accountName!==!1&&e.push(pn([...j(fn,".min-w-0 > .truncate"),...j(fn,".min-w-0.flex-1 .truncate")],!1)),bt.store.accountEmail!==!1&&e.push(pn([...j(fn,'a[href^="mailto:"]'),'[role="menu"] a[href^="mailto:"]','[data-radix-menu-content] a[href^="mailto:"]'],!1)),e.push("#bloom-rail-item,#bloom-rail-item *,#bloom-sidebar-panel,#bloom-sidebar-panel *{filter:none!important}"),!e.length){b(Fr);return}w(Fr,e.join(`
`))}var Ws=h({name:"StreamerMode",description:"Blur Recents titles, project names, and the account chip while you stream.",authors:[y.p],tags:["privacy","ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20l16-16"/></svg>',enabledByDefault:!1,startAt:"HostReady",settings:bt,start:Vs,onSettingsChange:Vs,stop(){b(Fr)}});var Ys=`.bloom-gc-panel {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.bloom-gc-composer {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.bloom-gc-panel .bloom-gc-input {
    width: 100%;
    min-height: 4.5rem;
    box-sizing: border-box;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid var(--border-default, var(--border-medium, rgba(0, 0, 0, 0.15)));
    background: var(--bg-secondary, var(--main-surface-secondary, #f9f9f9));
    color: var(--text-primary, inherit);
    font: inherit;
    font-size: 0.8125rem;
    line-height: 1.45;
    resize: vertical;
}

.bloom-gc-panel .bloom-gc-input::placeholder {
    color: var(--text-tertiary, #8f8f8f);
}

.bloom-gc-panel .bloom-gc-input:focus {
    outline: 2px solid color-mix(in srgb, var(--text-primary, currentColor) 28%, transparent);
    outline-offset: 1px;
}

.bloom-gc-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.75rem;
    font-variant-numeric: tabular-nums;
    color: var(--text-secondary, #5d5d5d);
}

.bloom-gc-error {
    color: var(--text-error, #c4314b);
}

.bloom-gc-actions {
    display: flex;
    gap: 6px;
    margin-left: auto;
}

.bloom-gc-panel .bloom-gc-btn {
    height: 32px;
    padding: 0 12px;
    border: 1px solid var(--border-default, var(--border-medium, rgba(0, 0, 0, 0.1)));
    border-radius: 999px;
    background: var(--bg-secondary, var(--main-surface-tertiary, #e8e8e8));
    color: var(--text-primary, inherit);
    font: inherit;
    font-size: 0.8125rem;
    font-weight: 500;
    cursor: pointer;
}

.bloom-gc-panel .bloom-gc-btn:hover:not(:disabled) {
    background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
}

.bloom-gc-panel .bloom-gc-btn:disabled {
    opacity: 0.4;
    cursor: default;
}

.bloom-gc-panel .bloom-gc-btn-primary {
    border-color: transparent;
    background: var(--bg-primary-inverted, #0d0d0d);
    color: var(--interactive-label-primary-default, var(--bg-primary, #ffffff));
}

.bloom-gc-panel .bloom-gc-btn-primary:hover:not(:disabled) {
    filter: brightness(1.08);
}

.bloom-gc-empty {
    margin: 0;
    color: var(--text-secondary, #5d5d5d);
    font-size: 0.8125rem;
}

.bloom-gc-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    overflow: auto;
    max-height: min(22rem, 45vh);
}

.bloom-gc-panel .bloom-gc-item {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 8px;
    width: 100%;
    padding: 10px 12px;
    border: 0;
    border-radius: 12px;
    background: var(--bg-secondary, var(--main-surface-secondary, #f9f9f9));
    color: var(--text-primary, inherit);
    text-align: left;
}

.bloom-gc-panel .bloom-gc-item:hover {
    background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.04));
}

.bloom-gc-panel .bloom-gc-item[data-active="true"] {
    box-shadow: inset 0 0 0 1px var(--border-medium, rgba(0, 0, 0, 0.18));
}

.bloom-gc-body {
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

.bloom-gc-clamp {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

.bloom-gc-item-actions {
    display: flex;
    align-items: flex-start;
    gap: 2px;
}

.bloom-gc-panel .bloom-gc-icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: var(--icon-secondary, var(--text-secondary, inherit));
    cursor: pointer;
}

.bloom-gc-panel .bloom-gc-icon-btn svg {
    width: 16px;
    height: 16px;
    display: block;
}

.bloom-gc-panel .bloom-gc-icon-btn:hover {
    background: var(--interactive-bg-secondary-hover, rgba(0, 0, 0, 0.05));
    color: var(--icon-primary, var(--text-primary, inherit));
}`;var Qu=new S("GreetingCustomizer"),yt="greetingCustomizer",Xs="greetingCustomizerUi",gn=100,zr=30,em=120,tm=1e3,nm=50,om=40,rm=["#page-header","nav","#stage-slideover-sidebar","#stage-sidebar-tiny-bar","#bloom-root","#bloom-sidebar-panel","#bloom-plugin-layer","#bloom-plugin-dialog"].join(", "),hn=["h1.text-page-header",'h1[class*="text-page-header"]',"[data-splash-headline-option] h1",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"])'].join(", "),Gr=["h1.text-page-header .text-pretty",'h1[class*="text-page-header"] .text-pretty',"[data-splash-headline-option] h1 .text-pretty",'main h1:not(.sr-only):not([data-testid="temporary-chat-label"]) .text-pretty'].join(", ");function im(e){return!!e?.closest(rm)}function el(e){return!!(im(e)||e.closest('[data-testid="temporary-chat-label"]')||e.closest("[hidden]")||e.getAttribute("aria-hidden")==="true"||e.classList.contains("sr-only"))}function Ho(e){try{for(let t of document.querySelectorAll(e))if(!el(t))return t}catch{}return null}var tl=[`Ask not what your country can do for you
\u2014 ask what you can do for your country.`,"It always seems impossible until it is done.","The best way to predict the future is to create it."],k=v({mode:{type:3,description:"When to rotate the home greeting.",options:[{label:"Each visit to home",value:"refresh",default:!0},{label:"Timer while on home",value:"interval"},{label:"Click the title",value:"manual"}]},order:{type:3,description:"Order of the greeting list.",options:[{label:"Sequential",value:"sequential",default:!0},{label:"Random",value:"random"}]},intervalSec:{type:4,description:"Seconds between rotations (timer mode).",min:1,max:3600,default:10},greetingsPanel:{type:5,description:"Greeting list (max 30, 100 characters each).",render:wm},greetings:{type:0,description:"Greeting texts",hidden:!0,default:tl},index:{type:1,description:"Rotation index",hidden:!0,default:-1},lastRandom:{type:1,description:"Last random index",hidden:!0,default:-1}}),W=!1,wt=!1,Re=null,Ro,bn,vt,yn,Po=0,Ao=null,xt=null,vn=null,xn=null,wn=null,No=null;function Z(){let e=location.pathname||"/";return e==="/"||e===""}function Ae(){let e=k.plain.greetings;return Array.isArray(e)?e.filter(t=>typeof t=="string"):tl.slice()}function En(e){return String(e??"").replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim()}function Js(e){k.store.greetings=e.slice(0,zr)}function Sn(){let e=String(k.store.mode??"refresh");return e==="interval"||e==="manual"?e:"refresh"}function am(){return k.store.order==="random"?"random":"sequential"}function sm(){return Ie(Number(k.store.intervalSec??10),1,3600)*1e3}function lm(e){return String(e??"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\A ")}function cm(){return!!Ho(Gr)}function Io(){return!!(Ho(Gr)||Ho(hn))}function dm(e,t){let n=["font-size:0!important","line-height:0!important","visibility:hidden!important","display:block!important"].join(";"),o=[`content:"${e}"`,"display:block!important","visibility:visible!important","font-size:1.75rem!important","line-height:1.4!important","font-weight:600!important","color:currentColor!important","white-space:pre-wrap!important","text-align:center!important","width:100%!important","margin:0 auto!important","padding:0!important"].join(";"),r=cm()||!Ho(hn)?Gr:hn,i=t?`${hn}{cursor:pointer!important;user-select:none!important}`:"";return[`${r}{${n}}`,`${r}::before{${o}}`,i,`@media (max-width:768px){${r}::before{font-size:1.25rem!important;line-height:1.3!important}}`].filter(Boolean).join("")}function um(e,t){if(e<=0)return 0;if(e===1)return Number(k.plain.index)!==0&&(k.store.index=0),Number(k.plain.lastRandom)!==0&&(k.store.lastRandom=0),0;let n=Number(k.plain.index),o=Number(k.plain.lastRandom);if(!t)return n>=0&&n<e?n:0;if(am()==="random"){let a=n>=0&&n<e?n:o,s=Math.floor(Math.random()*e),l=0;for(;s===a&&l++<10;)s=Math.floor(Math.random()*e);return k.store.index=s,k.store.lastRandom=s,s}let i=((n>=-1&&n<e?n:-1)+1)%e;return k.store.index=i,i}function J(e){if(!W)return;if(!Z()){b(yt);return}let t=Ae().map(En).filter(Boolean);if(!t.length){b(yt);return}let n=um(t.length,e),o=t[n]??t[0],r=Sn()==="manual"&&t.length>1;w(yt,dm(lm(o),r)),No?.()}function Ur(){Ro!==void 0&&(clearInterval(Ro),Ro=void 0)}function Kr(){Ur(),!(!W||!Z())&&Sn()==="interval"&&(Ae().filter(Boolean).length<=1||(Ro=setInterval(()=>J(!0),sm())))}function Vr(){yn!==void 0&&(clearTimeout(yn),yn=void 0),Po=0}function Zs(){if(Vr(),!W||!Z())return;Po=om;let e=()=>{if(yn=void 0,!(!W||!Z())){if(Io()){Sn()==="refresh"&&!wt?(wt=!0,J(!0)):J(!1),Kr();return}Po-=1,Po>0&&(yn=setTimeout(e,nm))}};e()}function Wr(){if(Re===!0){Io()?J(!1):Zs();return}Re=!0,wt=!1,Sn()==="refresh"?(wt=!0,J(!0)):J(!1),Kr(),Io()||Zs()}function Yr(){Re=!1,wt=!1,Ur(),Vr(),b(yt)}function Oo(){vt===void 0&&(vt=window.setTimeout(()=>{vt=void 0,W&&(Z()?Wr():Re!==!1&&Yr())},em))}function mm(){xt||(xt=history.pushState.bind(history),vn=history.replaceState.bind(history),xn=function(...t){let n=xt(...t);return Oo(),n},wn=function(...t){let n=vn(...t);return Oo(),n},history.pushState=xn,history.replaceState=wn)}function fm(){xn&&history.pushState===xn&&xt&&(history.pushState=xt),wn&&history.replaceState===wn&&vn&&(history.replaceState=vn),xt=null,vn=null,xn=null,wn=null}function pm(e){let t=e.target instanceof Element?e.target:null;t&&t.closest('a[href="/"], a[href="https://chatgpt.com/"], [data-testid="create-new-chat-button"]')&&requestAnimationFrame(Oo)}function gm(e){if(!W||!Z()||Sn()!=="manual"||Ae().filter(Boolean).length<=1)return;let t=e.target instanceof Element?e.target:null;if(!t)return;let n=t.closest(hn);if(!n||el(n))return;let o=window.getSelection?.();o&&String(o).trim()||J(!0)}function hm(){bn===void 0&&(bn=setInterval(()=>{if(!W)return;let e=Z();if(e!==(Re===!0)){e?Wr():Yr();return}e&&Io()&&J(!1)},tm))}function bm(){bn!==void 0&&(clearInterval(bn),bn=void 0)}function Qs(e,t){let n=document.createElement("button");n.type="button",n.className="bloom-gc-icon-btn",n.title=e,n.setAttribute("aria-label",e);let o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.75"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),o.setAttribute("aria-hidden","true");for(let r of t.split("|")){let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",r),o.appendChild(i)}return n.appendChild(o),n}var ym="M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",vm="M3 6h18|M8 6V4h8v2|M19 6l-1 14H6L5 6|M10 11v6|M14 11v6";function xm(e,t){let n=En(e);return n?n.length>gn?`Keep it to ${gn} characters.`:Ae().length+(t?1:0)>zr?`At most ${zr} greetings.`:null:"Enter a greeting."}function wm(e){e.className="bloom-gc-panel";let t="",n=-1,o="",r=-1,i=()=>{let a=Ae(),s=Number(k.plain.index);e.replaceChildren();let l=document.createElement("div");l.className="bloom-gc-composer";let d=document.createElement("textarea");d.className="bloom-gc-input",d.rows=3,d.maxLength=gn,d.placeholder="New greeting (line breaks ok)",d.value=t,d.addEventListener("input",()=>{t=d.value,o="";let m=l.querySelector(".bloom-gc-count");m&&(m.textContent=`${En(t).length}/${gn}`);let x=l.querySelector(".bloom-gc-error");x&&(x.textContent="")}),l.appendChild(d);let c=document.createElement("div");c.className="bloom-gc-meta";let u=document.createElement("span");u.className="bloom-gc-count",u.textContent=`${En(t).length}/${gn}`;let f=document.createElement("span");f.className="bloom-gc-error",f.textContent=o;let L=document.createElement("div");if(L.className="bloom-gc-actions",n>=0){let m=document.createElement("button");m.type="button",m.className="bloom-gc-btn",m.textContent="Cancel",m.addEventListener("click",()=>{n=-1,t="",o="",i()}),L.appendChild(m)}let E=document.createElement("button");if(E.type="button",E.className="bloom-gc-btn bloom-gc-btn-primary",E.textContent=n>=0?"Update":"Add",E.addEventListener("click",()=>{let m=n<0,x=xm(t,m);if(x){o=x,i();return}let A=En(t),P=Ae().slice();n>=0&&n<P.length?P[n]=A:P.push(A),Js(P),n=-1,t="",o="",i()}),L.appendChild(E),c.append(u,f,L),l.appendChild(c),e.appendChild(l),!a.length){let m=document.createElement("p");m.className="bloom-gc-empty",m.textContent="No greetings. The official heading stays.",e.appendChild(m);return}let p=document.createElement("div");p.className="bloom-gc-list",a.forEach((m,x)=>{let A=document.createElement("div");A.className="bloom-gc-item",x===s&&(A.dataset.active="true");let P=document.createElement("button");P.type="button",P.className=`bloom-gc-body${r===x?"":" bloom-gc-clamp"}`,P.textContent=m,P.addEventListener("click",()=>{r=r===x?-1:x,i()});let Et=document.createElement("div");Et.className="bloom-gc-item-actions";let Pe=Qs("Edit",ym);Pe.addEventListener("click",()=>{n=x,t=m,o="",i()});let Q=Qs("Delete",vm);Q.addEventListener("click",()=>{let St=Ae().filter((Ne,fe)=>fe!==x);Js(St),n===x?(n=-1,t=""):n>x&&(n-=1),i()}),Et.append(Pe,Q),A.append(P,Et),p.appendChild(A)}),e.appendChild(p)};return No=i,i(),()=>{No===i&&(No=null),e.replaceChildren()}}var nl=h({name:"GreetingCustomizer",description:"Replace the home greeting with your own texts. Rotate on visit, a timer, or a click.",authors:[y.p],tags:["ui"],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V7.5A2.5 2.5 0 016.5 5H20"/><path d="M8 19h12V8.5A1.5 1.5 0 0018.5 7H8z"/><path d="M8 11h8M8 14h5"/></svg>',enabledByDefault:!1,startAt:"HostReady",managedStyle:Xs,settings:k,start(){W=!0,w(Xs,Ys),mm(),Ao=new AbortController;let{signal:e}=Ao;window.addEventListener("popstate",Oo,{signal:e}),document.addEventListener("click",pm,{capture:!0,signal:e}),document.addEventListener("click",gm,{signal:e}),hm(),Re=null,Z()?Wr():Yr(),Qu.debug("started")},stop(){W=!1,Ao?.abort(),Ao=null,vt!==void 0&&(clearTimeout(vt),vt=void 0),Ur(),Vr(),bm(),fm(),b(yt),wt=!1,Re=null},onSettingsChange(){W&&(Z()?(J(!1),Kr()):b(yt))}});var Ln=new S("Bloom"),ol=!1,Em=Date.now(),Sm=[ta,Ra,$a,Fa,Va,Za,ms,ps,ys,ks,Is,Ks,Ws,nl];function Bo(e){return new Promise(t=>setTimeout(t,e))}function Lm(){return document.body?Promise.resolve():new Promise(e=>{let t=!1,n=()=>{t||document.body&&(t=!0,clearInterval(o),e())},o=setInterval(n,20);document.addEventListener("DOMContentLoaded",n,{once:!0}),setTimeout(()=>{t||(t=!0,clearInterval(o),e())},15e3)})}var il=8e3,rl=300,Cm=250;async function Tm(){if(ge())return await Bo(rl),!0;for(;Date.now()-Em<il;)if(await Bo(Cm),ge())return await Bo(rl),!0;return ge()||Fo()}function Xr(){return!!(document.getElementById("stage-slideover-sidebar")||document.querySelector('[data-testid="accounts-profile-button"], [data-testid="profile-button"]'))}async function km(){if(Xr())return!0;let e=Date.now()+il;for(;Date.now()<e;)if(await Bo(100),Xr())return!0;return Xr()}function Mm(){try{GM_registerMenuCommand?.("Bloom++ settings",ea)}catch{}}function Am(){In(()=>{Tt("HostShell"),Ln.info("host shell",I)}),On(()=>{Ln.info("idle ready",I)}),Bn(()=>{ei(),Tt("HostReady"),Ln.info("chrome ready",I)})}async function Jr(){await ci()}async function Zr(){if(ol)return;ol=!0;for(let n of Sm)try{yi(n)}catch(o){Ln.error("register failed",n.name,o)}wi(),Tt("Init"),Mm(),Am();let e=()=>Tt("DOMContentLoaded");if(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),await Lm(),km().then(n=>{n&&Dn()}),!await Tm()){Ln.warn("late islands not detected; starting default plugins",I),Be(),_n();return}await ki()}var al=typeof unsafeWindow<"u"?unsafeWindow:window,Rm=document.documentElement?.hasAttribute("data-bloom-playground")===!0;if(window===window.top||Rm){let e=al.Bloom;e&&console.warn("[Bloom++] replacing previous instance",e.VERSION??"(unknown)","\u2192",I);try{Object.defineProperty(al,"Bloom",{value:Qr,writable:!1,configurable:!0})}catch(t){console.warn("[Bloom++] could not replace window.Bloom",t)}Jr().then(()=>Zr()).catch(t=>console.error("[Bloom++] Fatal init error:",t))}})();
